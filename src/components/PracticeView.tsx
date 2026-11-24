import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Eye,
  EyeOff,
  Layers,
  Lock,
  PlayCircle,
  RotateCcw,
  Shuffle,
  XCircle,
} from 'lucide-react';
import { DigitalTimer } from './DigitalTimer';
import { GlassTiltCard } from './GlassTiltCard';
import { CHAPTERS, SUBJECTS, getChapterById, getSubjectById } from '../data/curriculum';
import { QUESTION_BANK, shuffleArray } from '../data/questions';
import { BookmarkRecord, HscLevel, McqQuestion, ResolvedUserAccess, SubjectId } from '../types/learning';

interface PracticeViewProps {
  initialSubjectId?: SubjectId | 'all';
  initialChapterId?: string | 'all';
  extraQuestions?: McqQuestion[];
  bookmarks: Record<string, BookmarkRecord>;
  resolvedAccess?: ResolvedUserAccess;
  onOpenEnrollModal?: () => void;
  onRecordAnswer: (
    question: McqQuestion,
    isCorrect: boolean,
    timeSec: number,
    selectedOptionIndex?: number
  ) => void;
  onToggleBookmark: (question: McqQuestion) => void;
  onOpenVisualLesson: (visualLessonId: string) => void;
}

const OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ'] as const;

const BN_DIGITS_PRAC = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnNum(val: number | string): string {
  return String(val).replace(/\d/g, (d) => BN_DIGITS_PRAC[Number(d)] ?? d);
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  initialSubjectId = 'all',
  initialChapterId = 'all',
  extraQuestions = [],
  bookmarks,
  resolvedAccess,
  onOpenEnrollModal,
  onRecordAnswer,
  onToggleBookmark,
  onOpenVisualLesson,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>(initialSubjectId);
  const [selectedLevel, setSelectedLevel] = useState<HscLevel | 'all'>('all');
  const [selectedChapter, setSelectedChapter] = useState<string>(initialChapterId);
  const [sourceFilter, setSourceFilter] = useState<'all' | 'past_year' | 'high_yield'>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [isRandomOrder, setIsRandomOrder] = useState(true);
  const [batchLimit, setBatchLimit] = useState<15 | 25 | 40 | 100 | 'all'>(25);
  const [shuffleSeed, setShuffleSeed] = useState(1);

  const [practiceMode, setPracticeMode] = useState<'mcq' | 'flashcard'>('mcq');
  const [limitReachedNotice, setLimitReachedNotice] = useState(false);
  const [hideQuestionsByDefault, setHideQuestionsByDefault] = useState(false);
  const [questionVisibleMap, setQuestionVisibleMap] = useState<Record<string, boolean>>({});
  const [answerVisibleMap, setAnswerVisibleMap] = useState<Record<string, boolean>>({});
  const [showFlashcardOptions, setShowFlashcardOptions] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [questionStartTs, setQuestionStartTs] = useState<number>(Date.now());
  const [timerMode, setTimerMode] = useState<'stopwatch' | 'countdown'>('stopwatch');
  const [timerPaused, setTimerPaused] = useState(false);
  const [sessionElapsedSec, setSessionElapsedSec] = useState(0);
  const [questionElapsedSec, setQuestionElapsedSec] = useState(0);
  const [countdownLeftSec, setCountdownLeftSec] = useState(25 * 45);

  useEffect(() => {
    setSelectedSubject(initialSubjectId);
  }, [initialSubjectId]);

  useEffect(() => {
    if (resolvedAccess && !resolvedAccess.canUseFlashcards && practiceMode === 'flashcard') {
      setPracticeMode('mcq');
    }
  }, [resolvedAccess, practiceMode]);

  useEffect(() => {
    if (!resolvedAccess?.dailyLimitReached) {
      setLimitReachedNotice(false);
    }
  }, [resolvedAccess?.dailyLimitReached]);

  useEffect(() => {
    setSelectedChapter(initialChapterId);
  }, [initialChapterId]);

  const availableChapters = useMemo(() => {
    return CHAPTERS.filter((ch) => {
      if (selectedSubject !== 'all' && ch.subjectId !== selectedSubject) return false;
      if (selectedLevel !== 'all' && ch.hscLevel !== selectedLevel) return false;
      return true;
    });
  }, [selectedSubject, selectedLevel]);

  const allQuestions = useMemo(
    () => (extraQuestions.length > 0 ? [...extraQuestions, ...QUESTION_BANK] : QUESTION_BANK),
    [extraQuestions]
  );

  const matchingPool = useMemo(() => {
    return allQuestions.filter((q) => {
      if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
      if (selectedLevel !== 'all' && q.hscLevel !== selectedLevel) return false;
      if (selectedChapter !== 'all' && q.chapterId !== selectedChapter) return false;
      if (sourceFilter === 'past_year' && !q.pastExam) return false;
      if (sourceFilter === 'high_yield' && Boolean(q.pastExam)) return false;
      if (onlyBookmarked && !bookmarks[q.id]) return false;
      return true;
    });
  }, [allQuestions, selectedSubject, selectedLevel, selectedChapter, sourceFilter, onlyBookmarked, bookmarks]);

  const filteredQuestions = useMemo(() => {
    // shuffleSeed intentionally triggers fresh Fisher-Yates randomization
    const base = isRandomOrder && shuffleSeed > 0 ? shuffleArray(matchingPool) : matchingPool;
    if (batchLimit === 'all') return base;
    return base.slice(0, Math.min(batchLimit, base.length));
  }, [matchingPool, isRandomOrder, shuffleSeed, batchLimit]);

  const totalTimedSec = Math.max(45, filteredQuestions.length * 45);

  useEffect(() => {
    setCurrentIndex(0);
    setQuestionStartTs(Date.now());
    setSessionElapsedSec(0);
    setQuestionElapsedSec(0);
    setCountdownLeftSec(Math.max(45, filteredQuestions.length * 45));
    setTimerPaused(false);
  }, [selectedSubject, selectedLevel, selectedChapter, sourceFilter, onlyBookmarked, shuffleSeed, batchLimit, isRandomOrder, filteredQuestions.length]);

  useEffect(() => {
    setQuestionElapsedSec(0);
  }, [currentIndex]);

  useEffect(() => {
    if (timerPaused || filteredQuestions.length === 0) return;
    const interval = window.setInterval(() => {
      setSessionElapsedSec((s) => s + 1);
      setQuestionElapsedSec((q) => q + 1);
      if (timerMode === 'countdown') {
        setCountdownLeftSec((left) => (left <= 1 ? 0 : left - 1));
      }
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerPaused, timerMode, filteredQuestions.length]);

  const activeQuestion = filteredQuestions[currentIndex];
  const selectedOption = activeQuestion ? answers[activeQuestion.id] : undefined;
  const isAnswered = selectedOption !== undefined;

  const sessionStats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    filteredQuestions.forEach((q) => {
      if (answers[q.id] !== undefined) {
        answered += 1;
        if (answers[q.id] === q.correctIndex) correct += 1;
      }
    });
    return { answered, correct };
  }, [filteredQuestions, answers]);

  const handleSelectOption = (optionIdx: number) => {
    if (!activeQuestion || isAnswered) return;
    if (resolvedAccess && !resolvedAccess.hasFullAccess && resolvedAccess.dailyLimitReached) {
      setLimitReachedNotice(true);
      return;
    }
    const elapsedSec = Math.max(2, Math.round((Date.now() - questionStartTs) / 1000));
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: optionIdx }));
    onRecordAnswer(activeQuestion, optionIdx === activeQuestion.correctIndex, elapsedSec, optionIdx);
  };

  const handleFlashcardJudge = (knewAnswer: boolean) => {
    if (!activeQuestion || isAnswered) return;
    if (resolvedAccess && !resolvedAccess.hasFullAccess && resolvedAccess.dailyLimitReached) {
      setLimitReachedNotice(true);
      return;
    }
    const elapsedSec = Math.max(2, Math.round((Date.now() - questionStartTs) / 1000));
    const fallbackWrongIdx = ((activeQuestion.correctIndex + 1) % 4) as 0 | 1 | 2 | 3;
    const pickedIdx = knewAnswer ? activeQuestion.correctIndex : fallbackWrongIdx;
    setAnswers((prev) => ({ ...prev, [activeQuestion.id]: pickedIdx }));
    onRecordAnswer(activeQuestion, knewAnswer, elapsedSec, pickedIdx);
  };

  const handleMove = (nextIdx: number) => {
    if (nextIdx < 0 || nextIdx >= filteredQuestions.length) return;
    setCurrentIndex(nextIdx);
    setQuestionStartTs(Date.now());
  };

  const handleResetSession = () => {
    setAnswers({});
    setQuestionVisibleMap({});
    setAnswerVisibleMap({});
    setCurrentIndex(0);
    setQuestionStartTs(Date.now());
    setSessionElapsedSec(0);
    setQuestionElapsedSec(0);
    setCountdownLeftSec(totalTimedSec);
    setTimerPaused(false);
  };

  const isQuestionShown = activeQuestion
    ? questionVisibleMap[activeQuestion.id] ?? !hideQuestionsByDefault
    : true;
  const isAnswerShown = activeQuestion ? Boolean(answerVisibleMap[activeQuestion.id]) : false;

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bio-card rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="space-y-2">
            <div>
              <h1 className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">বিষয় ও অধ্যায়ভিত্তিক র‍্যান্ডম প্র্যাকটিস</h1>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-0.5">
                প্রতি বিষয়ে বিপুল প্রশ্ন ব্যাংক থেকে র‍্যান্ডম প্র্যাকটিস, ফ্ল্যাশকার্ড রিভিশন ও তাৎক্ষণিক ইনফোগ্রাফ-ভিডিও লেকচার
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="glass-segment-track inline-flex items-center gap-1 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPracticeMode('mcq')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    practiceMode === 'mcq'
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                  MCQ অনুশীলন
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (resolvedAccess && !resolvedAccess.canUseFlashcards) {
                      onOpenEnrollModal?.();
                      return;
                    }
                    setPracticeMode('flashcard');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    practiceMode === 'flashcard'
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {resolvedAccess && !resolvedAccess.canUseFlashcards ? (
                    <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-300" />
                  ) : (
                    <Layers className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                  )}
                  ফ্ল্যাশকার্ড মোড
                </button>
              </div>

              {resolvedAccess && !resolvedAccess.hasFullAccess && resolvedAccess.dailyQuestionLimit !== null && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50/85 dark:bg-amber-950/55 border border-amber-200 dark:border-amber-400/35 text-xs">
                  <span className="font-mono-tabular font-semibold text-amber-900 dark:text-amber-200">
                    আজকের ফ্রি অনুশীলন: {toBnNum(resolvedAccess.dailyQuestionsUsed)} / {toBnNum(resolvedAccess.dailyQuestionLimit)} প্রশ্ন
                  </span>
                  {onOpenEnrollModal && (
                    <button
                      type="button"
                      onClick={onOpenEnrollModal}
                      className="inline-flex items-center gap-1 font-bold text-[#6D4ACF] dark:text-[#C4B5FD] hover:underline"
                    >
                      <Crown className="w-3.5 h-3.5" />
                      আনলিমিটেড প্রো
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono-tabular text-[#554578] dark:text-[#B6ABD6]">
            <DigitalTimer
              mode={timerMode}
              seconds={timerMode === 'countdown' ? countdownLeftSec : sessionElapsedSec}
              totalSeconds={timerMode === 'countdown' ? totalTimedSec : undefined}
              questionSeconds={questionElapsedSec}
              label={timerMode === 'countdown' ? 'টাইমড প্র্যাকটিস' : 'ডিজিটাল টাইমার'}
              isPaused={timerPaused}
              onTogglePause={() => setTimerPaused((p) => !p)}
              onReset={() => {
                setSessionElapsedSec(0);
                setQuestionElapsedSec(0);
                setCountdownLeftSec(totalTimedSec);
                setTimerPaused(false);
              }}
              compact
            />

            <button
              type="button"
              onClick={() => {
                const nextMode = timerMode === 'stopwatch' ? 'countdown' : 'stopwatch';
                setTimerMode(nextMode);
                setCountdownLeftSec(totalTimedSec);
                setSessionElapsedSec(0);
                setQuestionElapsedSec(0);
                setTimerPaused(false);
              }}
              className={`px-3 py-2 rounded-xl border font-sans font-medium transition-all whitespace-nowrap ${
                timerMode === 'countdown'
                  ? 'bg-amber-50/90 dark:bg-amber-950/60 border-amber-400 dark:border-amber-400/50 text-amber-900 dark:text-amber-200 shadow-[0_3px_0_rgba(217,119,6,0.3)]'
                  : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
              }`}
              title="প্রতি প্রশ্নে ৪৫ সেকেন্ড ধরে কাউন্টডাউন টাইমার চালু/বন্ধ করুন"
            >
              {timerMode === 'countdown' ? 'ফ্রি টাইমার' : '৪৫সে/প্রশ্ন টাইমার'}
            </button>

            <span>
              সমাধান: <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{sessionStats.answered}/{filteredQuestions.length}</strong>
              {matchingPool.length > filteredQuestions.length && (
                <span className="text-[#554578] dark:text-[#B6ABD6]"> (মোট {matchingPool.length})</span>
              )}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
              সঠিক: {sessionStats.correct}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsRandomOrder(true);
                setAnswers({});
                setQuestionVisibleMap({});
                setAnswerVisibleMap({});
                setShuffleSeed((s) => s + 1);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-sans font-semibold glass-btn-primary"
            >
              <Shuffle className="w-3.5 h-3.5" />
              নতুন র‍্যান্ডম সেট
            </button>
            {sessionStats.answered > 0 && (
              <button
                type="button"
                onClick={handleResetSession}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF] font-sans font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                রিসেট
              </button>
            )}
          </div>
        </div>

        {/* Subject Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedSubject('all');
              setSelectedChapter('all');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
              selectedSubject === 'all'
                ? 'glass-btn-primary font-semibold'
                : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
            }`}
          >
            সকল বিষয় ({allQuestions.length})
          </button>
          {SUBJECTS.map((sub) => {
            const count = allQuestions.filter((q) => q.subjectId === sub.id).length;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => {
                  setSelectedSubject(sub.id);
                  setSelectedChapter('all');
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all whitespace-nowrap ${
                  selectedSubject === sub.id
                    ? 'glass-btn-primary font-semibold'
                    : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                }`}
              >
                {sub.nameBn} ({count})
              </button>
            );
          })}
        </div>

        {/* Secondary Filters: HSC Level + Chapter Dropdown + Source + Random Batch + Bookmarks */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="flex items-center gap-1 p-1 glass-segment-track rounded-xl">
            {[
              { id: 'all' as const, label: 'সব স্তর' },
              { id: '11' as const, label: 'একাদশ' },
              { id: '12' as const, label: 'দ্বাদশ' },
              { id: 'admission' as const, label: 'অ্যাডমিশন' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => {
                  setSelectedLevel(lvl.id);
                  setSelectedChapter('all');
                }}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedLevel === lvl.id
                    ? 'glass-segment-active'
                    : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
            aria-label="অধ্যায় নির্বাচন"
          >
            <option value="all">সকল অধ্যায় ({availableChapters.length}টি)</option>
            {availableChapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.chapterNumberBn}: {ch.nameBn}
              </option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value as 'all' | 'past_year' | 'high_yield')}
            className="px-3 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
            aria-label="প্রশ্নের উৎস"
          >
            <option value="all">সকল প্রশ্ন (বোর্ড + বিগত + হাই-ইল্ড)</option>
            <option value="past_year">শুধু বিগত MBBS ও BDS প্রশ্ন</option>
            <option value="high_yield">এক্সক্লুসিভ প্র্যাকটিস ও হাই-ইল্ড</option>
          </select>

          <div className="flex items-center gap-2">
            <select
              value={String(batchLimit)}
              onChange={(e) => {
                const v = e.target.value;
                setBatchLimit(v === 'all' ? 'all' : (parseInt(v, 10) as 15 | 25 | 40 | 100));
              }}
              className="px-2.5 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
              aria-label="সেট পরিমাণ"
            >
              <option value="15">১৫টি</option>
              <option value="25">২৫টি</option>
              <option value="40">৪০টি</option>
              <option value="100">১০০টি</option>
              <option value="all">সব ({matchingPool.length})</option>
            </select>

            <button
              type="button"
              onClick={() => setOnlyBookmarked((b) => !b)}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border transition-all whitespace-nowrap ${
                onlyBookmarked
                  ? 'bg-amber-50/90 dark:bg-amber-950/60 border-amber-400 dark:border-amber-400/50 text-amber-900 dark:text-amber-200 shadow-[0_3px_0_rgba(217,119,6,0.28)]'
                  : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              বুকমার্ক ({Object.keys(bookmarks).length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Question Stage */}
      {!activeQuestion ? (
        <div className="bio-card rounded-2xl p-10 text-center space-y-3">
          <div className="text-base font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
            নির্বাচিত ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি
          </div>
          <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
            ফিল্টার পরিবর্তন করুন অথবা বুকমার্ক ফিল্টার বন্ধ করে সকল প্রশ্ন দেখুন।
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedSubject('all');
              setSelectedLevel('all');
              setSelectedChapter('all');
              setOnlyBookmarked(false);
            }}
            className="px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
          >
            সকল প্রশ্ন দেখুন
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Question Card */}
          <div className="lg:col-span-8 bio-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#554578] dark:text-[#B6ABD6] flex flex-wrap items-center gap-2">
                <span className="font-mono-tabular font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                  প্রশ্ন {currentIndex + 1} / {filteredQuestions.length}
                </span>
                <span aria-hidden="true">·</span>
                <span>{getSubjectById(activeQuestion.subjectId)?.nameBn}</span>
                <span aria-hidden="true">·</span>
                <span>{getChapterById(activeQuestion.chapterId)?.nameBn}</span>
                <span aria-hidden="true">·</span>
                <span className={activeQuestion.pastExam ? 'font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]' : ''}>
                  {activeQuestion.pastExam
                    ? `${activeQuestion.pastExam.exam} ${activeQuestion.pastExam.session}`
                    : activeQuestion.difficulty === 'medical'
                      ? 'মেডিকেল স্ট্যান্ডার্ড'
                      : activeQuestion.difficulty === 'dental'
                        ? 'ডেন্টাল স্ট্যান্ডার্ড'
                        : 'HSC বোর্ড স্ট্যান্ডার্ড'}
                </span>
              </div>

              <button
                type="button"
                onClick={() => onToggleBookmark(activeQuestion)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                  bookmarks[activeQuestion.id]
                    ? 'bg-amber-50/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-400/40 text-amber-900 dark:text-amber-200 shadow-[0_2px_0_rgba(217,119,6,0.25)]'
                    : 'glass-btn-secondary text-[#554578] dark:text-[#B6ABD6]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                {bookmarks[activeQuestion.id] ? 'বুকমার্ক করা' : 'বুকমার্ক'}
              </button>
            </div>

            {(limitReachedNotice || (resolvedAccess && !resolvedAccess.hasFullAccess && resolvedAccess.dailyLimitReached)) && !isAnswered && (
              <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-400/35 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200">
                  আজকের ফ্রি প্রশ্নের দৈনিক সীমা পূর্ণ হয়েছে — আনলিমিটেড অনুশীলন চালিয়ে যেতে ১ বছরের প্রো এনরোল করুন।
                </div>
                {onOpenEnrollModal && (
                  <button
                    type="button"
                    onClick={onOpenEnrollModal}
                    className="glass-btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl shrink-0"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    প্রো এনরোল করুন
                  </button>
                )}
              </div>
            )}

            {practiceMode === 'flashcard' ? (
              <div className="space-y-5">
                {/* Flashcard Visibility Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 bio-subpanel rounded-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setQuestionVisibleMap((prev) => ({
                          ...prev,
                          [activeQuestion.id]: !isQuestionShown,
                        }))
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                        !isQuestionShown
                          ? 'glass-btn-primary'
                          : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                      }`}
                    >
                      {isQuestionShown ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                          প্রশ্ন হাইড করুন
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          প্রশ্ন দেখান
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setAnswerVisibleMap((prev) => ({
                          ...prev,
                          [activeQuestion.id]: !isAnswerShown,
                        }))
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                        isAnswerShown
                          ? 'glass-btn-primary'
                          : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                      }`}
                    >
                      {isAnswerShown ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          উত্তর হাইড করুন
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                          উত্তর দেখান
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowFlashcardOptions((v) => !v)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl glass-btn-secondary text-[#554578] dark:text-[#B6ABD6]"
                    >
                      {showFlashcardOptions ? 'অপশন লুকান' : 'অপশন দেখান'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const nextDefault = !hideQuestionsByDefault;
                      setHideQuestionsByDefault(nextDefault);
                      setQuestionVisibleMap({});
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                      hideQuestionsByDefault
                        ? 'bg-[#F3EEFF]/90 dark:bg-violet-950/70 border-[#6D4ACF]/50 dark:border-violet-400/50 text-[#5733BF] dark:text-violet-200'
                        : 'glass-btn-secondary text-[#554578] dark:text-[#B6ABD6]'
                    }`}
                  >
                    {hideQuestionsByDefault
                      ? 'সব কার্ডে প্রশ্ন হাইড চালু'
                      : 'সব কার্ডে প্রশ্ন হাইড রাখুন'}
                  </button>
                </div>

                {/* 3D Glassmorphic Interactive Flashcard */}
                <GlassTiltCard maxTiltDeg={1.8} className="rounded-2xl">
                  <div className="bio-subpanel glass-card-3d rounded-2xl p-5 sm:p-6 space-y-5 relative z-10">
                    {/* Question Front Area (Clickable to Toggle Hide/Reveal) */}
                    {isQuestionShown ? (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <span className="text-[11px] font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                            ফ্ল্যাশকার্ড প্রশ্ন · অ্যাক্টিভ রিকল
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuestionVisibleMap((prev) => ({
                                ...prev,
                                [activeQuestion.id]: false,
                              }))
                            }
                            className="text-[11px] font-medium text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white inline-flex items-center gap-1"
                          >
                            <EyeOff className="w-3 h-3" />
                            প্রশ্ন লুকান
                          </button>
                        </div>

                        <h2 className="text-lg sm:text-xl font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                          {activeQuestion.question}
                        </h2>

                        {showFlashcardOptions && (
                          <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                            {activeQuestion.options.map((opt, idx) => (
                              <div
                                key={`${activeQuestion.id}_fc_opt_${idx}`}
                                className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 ${
                                  isAnswerShown && idx === activeQuestion.correctIndex
                                    ? 'glass-option-correct font-semibold'
                                    : 'bg-white/60 dark:bg-white/5 border border-white/85 dark:border-white/12 text-[#1D1336] dark:text-[#F4F0FF]'
                                }`}
                              >
                                <span className="font-semibold shrink-0">
                                  {OPTION_LABELS[idx]}.
                                </span>
                                <span>{opt}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setQuestionVisibleMap((prev) => ({
                            ...prev,
                            [activeQuestion.id]: true,
                          }))
                        }
                        className="w-full py-9 px-5 rounded-2xl border border-dashed border-[#A692DC] dark:border-violet-400/40 bg-white/45 dark:bg-white/5 hover:bg-white/75 dark:hover:bg-white/10 transition-all text-center space-y-2 cursor-pointer"
                      >
                        <EyeOff className="w-6 h-6 text-[#6D4ACF] dark:text-[#C4B5FD] mx-auto" />
                        <div className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                          প্রশ্নটি হাইড করা আছে
                        </div>
                        <div className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                          প্রশ্নটি দেখতে এখানে ক্লিক করুন
                        </div>
                      </button>
                    )}

                    {/* Answer Reveal Card (Starts Hidden, Click to Reveal / Hide) */}
                    {!isAnswerShown ? (
                      <button
                        type="button"
                        onClick={() =>
                          setAnswerVisibleMap((prev) => ({
                            ...prev,
                            [activeQuestion.id]: true,
                          }))
                        }
                        className="w-full py-10 px-5 rounded-2xl bg-gradient-to-br from-[#F3EEFF]/90 via-white/80 to-[#E9E0FF]/85 dark:from-[#261B4A]/90 dark:via-[#1C1438]/90 dark:to-[#171130]/95 border border-[#C6B4F0] dark:border-violet-400/35 hover:border-[#6D4ACF] dark:hover:border-violet-400/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_24px_-12px_rgba(109,74,207,0.3)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_-12px_rgba(0,0,0,0.65)] transition-all text-center space-y-2 cursor-pointer"
                      >
                        <Eye className="w-7 h-7 text-[#6D4ACF] dark:text-[#C4B5FD] mx-auto" />
                        <div className="text-base font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                          উত্তরটি হাইড করা আছে — ক্লিক করে উত্তর দেখুন
                        </div>
                        <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                          প্রথমে নিজে মনে করার চেষ্টা করুন, তারপর সঠিক উত্তর ও ব্যাখ্যা দেখতে কার্ডে ক্লিক করুন
                        </p>
                      </button>
                    ) : (
                      <div
                        onClick={() =>
                          setAnswerVisibleMap((prev) => ({
                            ...prev,
                            [activeQuestion.id]: false,
                          }))
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setAnswerVisibleMap((prev) => ({
                              ...prev,
                              [activeQuestion.id]: false,
                            }));
                          }
                        }}
                        className="rounded-2xl p-5 bg-emerald-50/85 dark:bg-emerald-950/65 border border-emerald-300/90 dark:border-emerald-400/35 shadow-sm space-y-3.5 cursor-pointer transition-all hover:bg-emerald-50 dark:hover:bg-emerald-950/80"
                        title="আবার হাইড করতে ক্লিক করুন"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-200">
                            <CheckCircle2 className="w-4 h-4" />
                            সঠিক উত্তর (আবার হাইড করতে ক্লিক করুন)
                          </span>
                          <EyeOff className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                        </div>

                        <div className="p-3.5 rounded-xl bg-white/90 dark:bg-[#132622]/90 border border-emerald-200 dark:border-emerald-400/30 text-sm sm:text-base font-bold text-[#1D1336] dark:text-[#F4F0FF] flex items-start gap-2.5">
                          <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center shrink-0">
                            {OPTION_LABELS[activeQuestion.correctIndex]}
                          </span>
                          <span className="leading-relaxed">
                            {activeQuestion.options[activeQuestion.correctIndex]}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                            ব্যাখ্যা ও পাঠ্যবই রেফারেন্স
                          </div>
                          <p className="text-xs sm:text-sm text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                            {activeQuestion.explanation}
                          </p>
                          <div className="text-xs text-[#554578] dark:text-[#B6ABD6] pt-0.5">
                            {activeQuestion.reference}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Self-Evaluation & Topic Lesson Bar */}
                    {isAnswerShown && (
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/75 dark:border-white/10">
                        {!isAnswered ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mr-1">
                              আপনার মূল্যায়ন:
                            </span>
                            <button
                              type="button"
                              onClick={() => handleFlashcardJudge(true)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl glass-btn-emerald"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              মনে ছিল (সঠিক)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleFlashcardJudge(false)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-rose-50/90 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/70 border border-rose-300 dark:border-rose-400/40 text-rose-800 dark:text-rose-200 transition-all"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              ভুলে গেছি (ভুলের ভান্ডারে রাখুন)
                            </button>
                          </div>
                        ) : (
                          <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                            মূল্যায়ন সংরক্ষিত হয়েছে (
                            {selectedOption === activeQuestion.correctIndex
                              ? 'মনে ছিল'
                              : 'ভুলের ভান্ডারে যোগ করা হয়েছে'}
                            )
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => onOpenVisualLesson(activeQuestion.visualLessonId)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold glass-btn-secondary text-[#6D4ACF] dark:text-[#C4B5FD] rounded-xl"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          ইনফোগ্রাফ ও ভিডিও দেখুন
                        </button>
                      </div>
                    )}
                  </div>
                </GlassTiltCard>
              </div>
            ) : (
              <>
                <h2 className="text-lg sm:text-xl font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                  {activeQuestion.question}
                </h2>

                <div className="space-y-3">
                  {activeQuestion.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrectOpt = idx === activeQuestion.correctIndex;

                    let optionClasses = 'glass-option text-[#1D1336] dark:text-[#F4F0FF]';
                    if (isAnswered) {
                      if (isCorrectOpt) {
                        optionClasses = 'glass-option-correct font-medium';
                      } else if (isSelected && !isCorrectOpt) {
                        optionClasses = 'glass-option-wrong';
                      } else {
                        optionClasses = 'glass-option-muted';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left px-4 py-3.5 rounded-2xl flex items-center justify-between gap-3 ${optionClasses}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-full border border-current flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 bg-white/55 dark:bg-white/10">
                            {OPTION_LABELS[idx]}
                          </span>
                          <span className="text-sm sm:text-base leading-relaxed">{opt}</span>
                        </div>

                        {isAnswered && isCorrectOpt && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shrink-0">
                            <CheckCircle2 className="w-4 h-4" />
                            সঠিক
                          </span>
                        )}
                        {isAnswered && isSelected && !isCorrectOpt && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-300 shrink-0">
                            <XCircle className="w-4 h-4" />
                            ভুল
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="bio-subpanel rounded-2xl p-5 space-y-4">
                    <div className="space-y-1.5">
                      <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                        ব্যাখ্যা ও পাঠ্যবই রেফারেন্স
                      </div>
                      <p className="text-sm text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                        {activeQuestion.explanation}
                      </p>
                      <div className="text-xs text-[#554578] dark:text-[#B6ABD6] pt-1">{activeQuestion.reference}</div>
                    </div>

                    <div className="pt-3 border-t border-white/75 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF]">
                        টপিকটি আরও পরিষ্কারভাবে বুঝতে চান?
                      </span>
                      <button
                        type="button"
                        onClick={() => onOpenVisualLesson(activeQuestion.visualLessonId)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
                      >
                        <PlayCircle className="w-4 h-4" />
                        ইনফোগ্রাফ ও ভিডিও লেকচার দেখুন
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-white/70 dark:border-white/10">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => handleMove(currentIndex - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary disabled:opacity-40 rounded-xl"
              >
                <ChevronLeft className="w-4 h-4" />
                পূর্ববর্তী
              </button>

              <button
                type="button"
                onClick={() => onOpenVisualLesson(activeQuestion.visualLessonId)}
                className="text-xs font-medium text-[#6D4ACF] dark:text-[#C4B5FD] hover:underline hidden sm:inline-flex items-center gap-1"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                টপিক ভিডিও দেখুন
              </button>

              <button
                type="button"
                disabled={currentIndex >= filteredQuestions.length - 1}
                onClick={() => handleMove(currentIndex + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold glass-btn-dark disabled:opacity-40 rounded-xl"
              >
                পরবর্তী প্রশ্ন
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Question Palette */}
          <aside className="lg:col-span-4 bio-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">প্রশ্ন ন্যাভিগেটর</h3>
              <span className="text-xs font-mono-tabular text-[#554578] dark:text-[#B6ABD6]">
                {filteredQuestions.length}টি প্রশ্ন
              </span>
            </div>

            <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
              {filteredQuestions.map((q, idx) => {
                const ans = answers[q.id];
                const isCurrent = idx === currentIndex;
                let cls = 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]';
                if (ans !== undefined) {
                  cls =
                    ans === q.correctIndex
                      ? 'bg-emerald-50/90 dark:bg-emerald-950/65 border border-emerald-500 dark:border-emerald-400/60 text-emerald-800 dark:text-emerald-200 font-semibold shadow-[0_2px_0_rgba(5,150,105,0.28)]'
                      : 'bg-rose-50/90 dark:bg-rose-950/65 border border-rose-400 dark:border-rose-400/60 text-rose-800 dark:text-rose-200 font-semibold shadow-[0_2px_0_rgba(225,29,72,0.25)]';
                }
                if (isCurrent) {
                  cls += ' ring-2 ring-[#6D4ACF] dark:ring-[#A78BFA] ring-offset-1 dark:ring-offset-[#150F2B]';
                }
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => handleMove(idx)}
                    className={`h-9 rounded-xl text-xs font-mono-tabular transition-all ${cls}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/70 dark:border-white/10 flex flex-wrap gap-4 text-xs text-[#554578] dark:text-[#B6ABD6]">
              <span>সবুজ: সঠিক</span>
              <span>লাল: ভুল</span>
              <span>বাকি: উত্তরহীন</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
