import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ListChecks,
  PlayCircle,
  RotateCcw,
  Search,
  Shuffle,
  Sparkles,
  Trash2,
  XCircle,
} from 'lucide-react';
import { DigitalTimer } from './DigitalTimer';
import { CHAPTERS, SUBJECTS, getChapterById, getSubjectById } from '../data/curriculum';
import { QUESTION_BANK, shuffleArray } from '../data/questions';
import {
  AppTab,
  BookmarkRecord,
  McqQuestion,
  SubjectId,
  WrongAnswerRecord,
} from '../types/learning';

interface WrongAnswerBankViewProps {
  wrongAnswers: Record<string, WrongAnswerRecord>;
  bookmarks: Record<string, BookmarkRecord>;
  extraQuestions?: McqQuestion[];
  onRecordAnswer: (
    question: McqQuestion,
    isCorrect: boolean,
    timeSec: number,
    selectedOptionIndex?: number
  ) => void;
  onRemoveWrongAnswer: (questionId: string) => void;
  onClearAllWrongAnswers: () => void;
  onToggleBookmark: (question: McqQuestion) => void;
  onOpenVisualLesson: (visualLessonId: string) => void;
  onNavigateTab: (tab: AppTab) => void;
}

interface WrongQuestionItem {
  question: McqQuestion;
  record: WrongAnswerRecord;
}

const OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ'] as const;
const PAGE_SIZE = 25;
const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export const WrongAnswerBankView: React.FC<WrongAnswerBankViewProps> = ({
  wrongAnswers,
  bookmarks,
  extraQuestions = [],
  onRecordAnswer,
  onRemoveWrongAnswer,
  onClearAllWrongAnswers,
  onToggleBookmark,
  onOpenVisualLesson,
  onNavigateTab,
}) => {
  const [viewMode, setViewMode] = useState<'list' | 'quiz'>('list');
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'board' | 'admission'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [studyModeRevealAll, setStudyModeRevealAll] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  // List-mode re-attempt state
  const [listAnswers, setListAnswers] = useState<Record<string, number>>({});

  // Quiz-mode state
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Timer state
  const [elapsedSec, setElapsedSec] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);

  const listTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (timerPaused) return;
    const t = window.setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [timerPaused]);

  const questionMap = useMemo(
    () =>
      new Map<string, McqQuestion>(
        [...extraQuestions, ...QUESTION_BANK].map((q) => [q.id, q])
      ),
    [extraQuestions]
  );

  const allWrongItems = useMemo<WrongQuestionItem[]>(() => {
    const items: WrongQuestionItem[] = [];
    Object.values(wrongAnswers).forEach((rec) => {
      const q = questionMap.get(rec.questionId);
      if (q) {
        items.push({ question: q, record: rec });
      }
    });
    // Sort most recent wrong answer first, then highest wrongCount
    items.sort((a, b) => {
      if (b.record.lastWrongAtMs !== a.record.lastWrongAtMs) {
        return b.record.lastWrongAtMs - a.record.lastWrongAtMs;
      }
      return b.record.wrongCount - a.record.wrongCount;
    });
    return items;
  }, [wrongAnswers, questionMap]);

  const totalMistakeOccurrences = useMemo(
    () => allWrongItems.reduce((sum, item) => sum + item.record.wrongCount, 0),
    [allWrongItems]
  );

  const affectedSubjectCount = useMemo(
    () => new Set(allWrongItems.map((item) => item.question.subjectId)).size,
    [allWrongItems]
  );

  const availableChapters = useMemo(() => {
    const wrongChapterIds = new Set(allWrongItems.map((i) => i.question.chapterId));
    return CHAPTERS.filter((ch) => {
      if (subjectFilter !== 'all' && ch.subjectId !== subjectFilter) return false;
      return wrongChapterIds.has(ch.id);
    });
  }, [allWrongItems, subjectFilter]);

  useEffect(() => {
    if (
      chapterFilter !== 'all' &&
      !availableChapters.some((ch) => ch.id === chapterFilter)
    ) {
      setChapterFilter('all');
    }
  }, [availableChapters, chapterFilter]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = allWrongItems.filter(({ question }) => {
      if (subjectFilter !== 'all' && question.subjectId !== subjectFilter) return false;
      if (chapterFilter !== 'all' && question.chapterId !== chapterFilter) return false;
      if (categoryFilter === 'board' && (question.difficulty !== 'board' || question.pastExam)) {
        return false;
      }
      if (
        categoryFilter === 'admission' &&
        question.difficulty === 'board' &&
        !question.pastExam
      ) {
        return false;
      }
      if (query) {
        const chName = CHAPTERS.find((c) => c.id === question.chapterId)?.nameBn || '';
        const haystack =
          `${question.question} ${question.explanation} ${question.reference} ${chName}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    if (shuffleSeed > 0) {
      return shuffleArray(list);
    }
    return list;
  }, [allWrongItems, subjectFilter, chapterFilter, categoryFilter, searchQuery, shuffleSeed]);

  useEffect(() => {
    setCurrentPage(1);
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizCompleted(false);
  }, [subjectFilter, chapterFilter, categoryFilter, searchQuery, shuffleSeed]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const pagedItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, safePage]);

  const handleListPick = (q: McqQuestion, optIdx: number) => {
    if (studyModeRevealAll || listAnswers[q.id] !== undefined) return;
    setListAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
    onRecordAnswer(q, optIdx === q.correctIndex, 20, optIdx);
  };

  const handleQuizPick = (q: McqQuestion, optIdx: number) => {
    if (quizAnswers[q.id] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
    onRecordAnswer(q, optIdx === q.correctIndex, 20, optIdx);
  };

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages, nextPage));
    setCurrentPage(clamped);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeQuizItem = filteredItems[quizIndex];
  const quizMasteredIds = useMemo(() => {
    return filteredItems
      .filter(({ question }) => quizAnswers[question.id] === question.correctIndex)
      .map(({ question }) => question.id);
  }, [filteredItems, quizAnswers]);

  const quizCorrectCount = quizMasteredIds.length;
  const quizAnsweredCount = useMemo(
    () => filteredItems.filter(({ question }) => quizAnswers[question.id] !== undefined).length,
    [filteredItems, quizAnswers]
  );

  const startRevisionQuiz = () => {
    setViewMode('quiz');
    setQuizIndex(0);
    setQuizAnswers({});
    setQuizCompleted(false);
    setElapsedSec(0);
    setTimerPaused(false);
  };

  const handleRemoveMasteredFromQuiz = () => {
    quizMasteredIds.forEach((qid) => onRemoveWrongAnswer(qid));
    setQuizAnswers({});
    setQuizIndex(0);
    setQuizCompleted(false);
    setViewMode('list');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <section className="relative overflow-hidden glass-rose-card rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigateTab('dashboard')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] hover:text-[#5A39B8] dark:hover:text-[#DDD6FE]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                ড্যাশবোর্ডে ফিরুন
              </button>
              <span className="text-[#C5B4E8] dark:text-white/25">·</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5" />
                স্বয়ংক্রিয় ভুল উত্তর সংরক্ষণ ও রিভিশন সিস্টেম
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              ভুল উত্তরের ভান্ডার (Wrong Answer Bank)
            </h1>
            <p className="text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
              প্র্যাকটিস, প্রশ্ন ব্যাংক, মক টেস্ট ও মডেল টেস্টে আপনি যে প্রশ্নগুলোর ভুল উত্তর
              দিয়েছেন সেগুলো এখানে সংরক্ষিত রয়েছে। ভুল প্রশ্নগুলো পুনরায় অনুশীলন করে সংশোধন
              হলে ভান্ডার থেকে সরিয়ে নিতে পারবেন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {allWrongItems.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    viewMode === 'list' ? startRevisionQuiz() : setViewMode('list')
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold glass-btn-primary rounded-xl whitespace-nowrap"
                >
                  {viewMode === 'list' ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      রিভিশন কুইজ শুরু করুন ({toBnDigits(filteredItems.length)})
                    </>
                  ) : (
                    <>
                      <ListChecks className="w-4 h-4" />
                      তালিকা মোডে ফিরুন
                    </>
                  )}
                </button>
                {!confirmClearAll ? (
                  <button
                    type="button"
                    onClick={() => setConfirmClearAll(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-rose-700 dark:text-rose-200 bg-rose-50/85 dark:bg-rose-950/65 hover:bg-rose-100/90 dark:hover:bg-rose-900/75 border border-rose-200/90 dark:border-rose-400/35 shadow-[0_2.5px_0_rgba(225,29,72,0.2)] rounded-xl transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    সব মুছুন
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50/90 dark:bg-rose-950/80 backdrop-blur-md border border-rose-300 dark:border-rose-400/40 rounded-xl">
                    <span className="text-xs font-semibold text-rose-900 dark:text-rose-200">
                      সবগুলো মুছে ফেলবেন?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClearAllWrongAnswers();
                        setConfirmClearAll(false);
                        setListAnswers({});
                        setQuizAnswers({});
                      }}
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
                    >
                      হ্যাঁ, মুছুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClearAll(false)}
                      className="px-2 py-1 text-xs font-medium text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white"
                    >
                      না
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Summary KPI Strip inside Wrong Answer Bank */}
        <div className="grid grid-cols-3 gap-3 pt-1">
          <div className="bio-subpanel glass-card-3d rounded-xl px-4 py-3">
            <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">সংরক্ষিত ভুল প্রশ্ন</div>
            <div className="text-xl font-bold font-mono-tabular text-rose-700 dark:text-rose-300 mt-0.5">
              {toBnDigits(allWrongItems.length)}টি
            </div>
          </div>
          <div className="bio-subpanel glass-card-3d rounded-xl px-4 py-3">
            <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">মোট ভুলের সংখ্যা</div>
            <div className="text-xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] mt-0.5">
              {toBnDigits(totalMistakeOccurrences)} বার
            </div>
          </div>
          <div className="bio-subpanel glass-card-3d rounded-xl px-4 py-3">
            <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">সংশ্লিষ্ট বিষয়</div>
            <div className="text-xl font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD] mt-0.5">
              {toBnDigits(affectedSubjectCount)}টি
            </div>
          </div>
        </div>
      </section>

      {allWrongItems.length === 0 ? (
        <section className="bio-card rounded-2xl p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-white/90 dark:border-emerald-400/30 shadow-[0_8px_18px_-6px_rgba(5,150,105,0.22)] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              আপনার ভুল উত্তরের ভান্ডার এখন সম্পূর্ণ খালি!
            </h2>
            <p className="text-xs sm:text-sm text-[#554578] dark:text-[#B6ABD6] max-w-lg mx-auto leading-relaxed">
              আপনি প্র্যাকটিস, প্রশ্ন ব্যাংক বা মডেল টেস্টে কোনো প্রশ্নের ভুল উত্তর দিলে সেটি
              স্বয়ংক্রিয়ভাবে এখানে জমা হবে, যাতে পরবর্তীতে আলাদাভাবে রিভিশন দিতে পারেন।
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onNavigateTab('practice')}
              className="px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
            >
              বিষয়ভিত্তিক প্র্যাকটিস করুন
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('question_bank')}
              className="px-4 py-2 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-xl"
            >
              প্রশ্ন ব্যাংকে যান
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('medical_model')}
              className="px-4 py-2 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
            >
              মডেল টেস্ট দিন
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* Filter & Controls */}
          <section className="bio-card rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Category Segmented Track */}
              <div className="flex items-center gap-1 p-1 glass-segment-track rounded-xl">
                {[
                  { id: 'all' as const, label: `সকল (${toBnDigits(allWrongItems.length)})` },
                  { id: 'board' as const, label: 'বোর্ড প্রশ্ন' },
                  { id: 'admission' as const, label: 'এডমিশন প্রশ্ন' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategoryFilter(tab.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                      categoryFilter === tab.id
                        ? 'glass-segment-active'
                        : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <DigitalTimer
                  mode="stopwatch"
                  seconds={elapsedSec}
                  label="রিভিশন ডিজিটাল টাইমার"
                  isPaused={timerPaused}
                  onTogglePause={() => setTimerPaused((p) => !p)}
                  onReset={() => {
                    setElapsedSec(0);
                    setTimerPaused(false);
                  }}
                  compact
                />
                <button
                  type="button"
                  onClick={() => setShuffleSeed((s) => s + 1)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
                >
                  <Shuffle className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                  র‍্যান্ডম অর্ডার
                </button>
                {viewMode === 'list' && (
                  <button
                    type="button"
                    onClick={() => setStudyModeRevealAll((v) => !v)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                      studyModeRevealAll
                        ? 'glass-btn-primary'
                        : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                    }`}
                  >
                    {studyModeRevealAll ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        উত্তর লুকিয়ে অনুশীলন করুন
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                        সব উত্তর ও ব্যাখ্যা দেখুন
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value as SubjectId | 'all')}
                className="px-3 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
                aria-label="বিষয় ফিল্টার"
              >
                <option value="all">
                  সকল বিষয় ({toBnDigits(allWrongItems.length)})
                </option>
                {SUBJECTS.map((sub) => {
                  const cnt = allWrongItems.filter(
                    (i) => i.question.subjectId === sub.id
                  ).length;
                  if (cnt === 0) return null;
                  return (
                    <option key={sub.id} value={sub.id}>
                      {sub.nameBn} ({toBnDigits(cnt)})
                    </option>
                  );
                })}
              </select>

              <select
                value={chapterFilter}
                onChange={(e) => setChapterFilter(e.target.value)}
                className="px-3 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
                aria-label="অধ্যায় ফিল্টার"
              >
                <option value="all">সকল অধ্যায় ({toBnDigits(availableChapters.length)})</option>
                {availableChapters.map((ch) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.chapterNumberBn}: {ch.nameBn}
                  </option>
                ))}
              </select>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-[#554578] dark:text-[#B6ABD6] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="টপিক বা প্রশ্ন খুঁজুন..."
                  className="w-full pl-8 pr-3 py-2 text-xs rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF] placeholder:text-[#7F6DA8] dark:placeholder:text-[#8E82B5]"
                />
              </div>
            </div>
          </section>

          <div ref={listTopRef} />

          {filteredItems.length === 0 ? (
            <div className="bio-card rounded-2xl p-10 text-center space-y-3">
              <div className="text-base font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                নির্বাচিত ফিল্টারে কোনো ভুল প্রশ্ন নেই
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubjectFilter('all');
                  setChapterFilter('all');
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
              >
                সব ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : viewMode === 'quiz' ? (
            /* Interactive Wrong-Answer Revision Quiz Mode */
            quizCompleted || !activeQuizItem ? (
              <section className="bio-card rounded-2xl p-8 text-center space-y-5">
                <div className="w-12 h-12 rounded-2xl bio-subpanel flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                    রিভিশন কুইজ সম্পন্ন হয়েছে!
                  </h2>
                  <p className="text-sm text-[#554578] dark:text-[#B6ABD6] font-mono-tabular">
                    মোট উত্তর দিয়েছেন: <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{toBnDigits(quizAnsweredCount)}</strong>টি · সঠিক হয়েছে:{' '}
                    <strong className="text-emerald-700 dark:text-emerald-300">{toBnDigits(quizCorrectCount)}</strong>টি
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {quizMasteredIds.length > 0 && (
                    <button
                      type="button"
                      onClick={handleRemoveMasteredFromQuiz}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold glass-btn-emerald rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      সঠিক হওয়া {toBnDigits(quizMasteredIds.length)}টি প্রশ্ন ভান্ডার থেকে সরান
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={startRevisionQuiz}
                    className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-xl"
                  >
                    আবার কুইজ দিন
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
                  >
                    তালিকা মোডে ফিরুন
                  </button>
                </div>
              </section>
            ) : (
              <section className="bio-card rounded-2xl p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#554578] dark:text-[#B6ABD6]">
                  <span className="font-mono-tabular font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                    প্রশ্ন {toBnDigits(quizIndex + 1)} / {toBnDigits(filteredItems.length)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-rose-700 dark:text-rose-300 font-semibold">
                      ভুল হয়েছে {toBnDigits(activeQuizItem.record.wrongCount)} বার
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{getSubjectById(activeQuizItem.question.subjectId)?.nameBn}</span>
                  </div>
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                  {activeQuizItem.question.question}
                </h2>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activeQuizItem.question.options.map((opt, optIdx) => {
                    const userPick = quizAnswers[activeQuizItem.question.id];
                    const showSol = userPick !== undefined;
                    const isRight = optIdx === activeQuizItem.question.correctIndex;
                    const isPicked = userPick === optIdx;

                    let cls = 'glass-option text-[#1D1336] dark:text-[#F4F0FF]';
                    if (showSol) {
                      if (isRight) {
                        cls = 'glass-option-correct font-semibold';
                      } else if (isPicked && !isRight) {
                        cls = 'glass-option-wrong';
                      } else {
                        cls = 'glass-option-muted';
                      }
                    }

                    return (
                      <button
                        key={`${activeQuizItem.question.id}_qopt_${optIdx}`}
                        type="button"
                        disabled={showSol}
                        onClick={() => handleQuizPick(activeQuizItem.question, optIdx)}
                        className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between gap-2 ${cls}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-semibold shrink-0">
                            {OPTION_LABELS[optIdx]}.
                          </span>
                          <span>{opt}</span>
                        </div>
                        {showSol && isRight && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300 shrink-0" />
                        )}
                        {showSol && isPicked && !isRight && (
                          <XCircle className="w-4 h-4 text-rose-700 dark:text-rose-300 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizAnswers[activeQuizItem.question.id] !== undefined && (
                  <div className="bio-subpanel rounded-xl p-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                        ব্যাখ্যা · {activeQuizItem.question.reference}
                      </div>
                      {quizAnswers[activeQuizItem.question.id] ===
                        activeQuizItem.question.correctIndex && (
                        <button
                          type="button"
                          onClick={() => onRemoveWrongAnswer(activeQuizItem.question.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50/90 dark:bg-emerald-950/65 hover:bg-emerald-100 dark:hover:bg-emerald-900/75 border border-emerald-300 dark:border-emerald-400/40 rounded-lg"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          সংশোধিত — ভান্ডার থেকে সরান
                        </button>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                      {activeQuizItem.question.explanation}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    disabled={quizIndex <= 0}
                    onClick={() => setQuizIndex((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary disabled:opacity-45 rounded-xl"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    আগের প্রশ্ন
                  </button>
                  {quizIndex < filteredItems.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setQuizIndex((i) => i + 1)}
                      className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
                    >
                      পরবর্তী প্রশ্ন
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setQuizCompleted(true)}
                      className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold glass-btn-emerald rounded-xl"
                    >
                      রিভিশন কুইজ শেষ করুন
                    </button>
                  )}
                </div>
              </section>
            )
          ) : (
            /* List Revision Mode */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#554578] dark:text-[#B6ABD6] font-mono-tabular">
                <span>
                  মোট <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{toBnDigits(filteredItems.length)}</strong>টি ভুল প্রশ্ন
                </span>
                <span>
                  পৃষ্ঠা <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{toBnDigits(safePage)}</strong> /{' '}
                  {toBnDigits(totalPages)}
                </span>
              </div>

              {pagedItems.map(({ question: q, record }, idx) => {
                const globalNum = (safePage - 1) * PAGE_SIZE + idx + 1;
                const userPick = listAnswers[q.id];
                const showSolution = studyModeRevealAll || userPick !== undefined;
                const answeredRightNow = userPick === q.correctIndex;
                const prevWrongOpt = q.options[record.selectedOptionIndex];

                return (
                  <article key={q.id} className="bio-card glass-card-3d rounded-2xl p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs text-[#554578] dark:text-[#B6ABD6] flex flex-wrap items-center gap-2">
                        <span className="font-mono-tabular font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                          #{toBnDigits(globalNum)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-rose-700 dark:text-rose-300 font-semibold">
                          ভুল হয়েছে {toBnDigits(record.wrongCount)} বার
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{getSubjectById(q.subjectId)?.nameBn}</span>
                        <span aria-hidden="true">·</span>
                        <span>{getChapterById(q.chapterId)?.nameBn}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onToggleBookmark(q)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-xl border transition-all ${
                            bookmarks[q.id]
                              ? 'bg-amber-50/90 dark:bg-amber-950/60 border-amber-300 dark:border-amber-400/40 text-amber-900 dark:text-amber-200 shadow-[0_2px_0_rgba(217,119,6,0.22)]'
                              : 'glass-btn-secondary text-[#554578] dark:text-[#B6ABD6]'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          {bookmarks[q.id] ? 'সংরক্ষিত' : 'বুকমার্ক'}
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveWrongAnswer(q.id)}
                          title="ভুল উত্তরের ভান্ডার থেকে সরিয়ে ফেলুন"
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-xl border transition-all ${
                            answeredRightNow
                              ? 'bg-emerald-50/90 dark:bg-emerald-950/65 border-emerald-400 dark:border-emerald-400/45 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/75'
                              : 'glass-btn-secondary text-[#554578] dark:text-[#B6ABD6] hover:text-rose-700 dark:hover:text-rose-300'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {answeredRightNow ? 'সংশোধিত · সরান' : 'ভান্ডার থেকে সরান'}
                        </button>
                      </div>
                    </div>

                    {prevWrongOpt && (
                      <div className="text-xs text-rose-800 dark:text-rose-200 bg-rose-50/75 dark:bg-rose-950/55 backdrop-blur-sm border border-rose-200/85 dark:border-rose-400/30 rounded-xl px-3 py-1.5 inline-block">
                        আপনার পূর্বের ভুল উত্তর:{' '}
                        <strong>
                          {OPTION_LABELS[record.selectedOptionIndex] || '—'}. {prevWrongOpt}
                        </strong>
                      </div>
                    )}

                    <h2 className="text-base sm:text-lg font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                      {q.question}
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isRight = optIdx === q.correctIndex;
                        const isPicked = userPick === optIdx;
                        let cls = 'glass-option text-[#1D1336] dark:text-[#F4F0FF]';

                        if (showSolution) {
                          if (isRight) {
                            cls = 'glass-option-correct font-semibold';
                          } else if (isPicked && !isRight) {
                            cls = 'glass-option-wrong';
                          } else {
                            cls = 'glass-option-muted';
                          }
                        }

                        return (
                          <button
                            key={`${q.id}_wopt_${optIdx}`}
                            type="button"
                            disabled={showSolution}
                            onClick={() => handleListPick(q, optIdx)}
                            className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between gap-2 ${cls}`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="font-semibold shrink-0">
                                {OPTION_LABELS[optIdx]}.
                              </span>
                              <span>{opt}</span>
                            </div>
                            {showSolution && isRight && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300 shrink-0" />
                            )}
                            {showSolution && isPicked && !isRight && (
                              <XCircle className="w-4 h-4 text-rose-700 dark:text-rose-300 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showSolution && (
                      <div className="bio-subpanel rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                            ব্যাখ্যা · {q.reference}
                          </div>
                          <p className="text-xs sm:text-sm text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onOpenVisualLesson(q.visualLessonId)}
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-xl"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          ভিডিও ও ইনফোগ্রাফ
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}

              {totalPages > 1 && (
                <nav
                  aria-label="ভুল উত্তরের ভান্ডার পৃষ্ঠা নেভিগেশন"
                  className="bio-card rounded-2xl p-4 flex items-center justify-between gap-3"
                >
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => handlePageChange(safePage - 1)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary disabled:opacity-45 rounded-xl"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    পূর্ববর্তী
                  </button>
                  <span className="text-xs font-mono-tabular text-[#554578] dark:text-[#B6ABD6]">
                    পৃষ্ঠা {toBnDigits(safePage)} / {toBnDigits(totalPages)}
                  </span>
                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => handlePageChange(safePage + 1)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary disabled:opacity-45 rounded-xl"
                  >
                    পরবর্তী
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
