import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Archive,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Crown,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  PlayCircle,
  Search,
  Shuffle,
  Stethoscope,
  XCircle,
} from 'lucide-react';
import { DigitalTimer } from './DigitalTimer';
import { CHAPTERS, SUBJECTS, getChapterById, getSubjectById } from '../data/curriculum';
import {
  BOARD_EXAM_YEARS,
  BOARD_LABELS,
  BOARD_NAMES,
  BOARD_YEAR_LABELS,
  PAST_EXAM_SESSIONS,
  QUESTION_BANK,
  shuffleArray,
} from '../data/questions';
import { BoardId, BookmarkRecord, McqQuestion, ResolvedUserAccess, SubjectId } from '../types/learning';
import { GlassTiltCard } from './GlassTiltCard';

export type QuestionBankSection = 'board' | 'admission';

interface QuestionBankViewProps {
  initialSection?: QuestionBankSection;
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
  onStartPastYearModelTest: () => void;
}

const OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ'] as const;
const PAGE_SIZE = 25;

const SESSION_LABELS: Record<string, string> = {
  '2023-24': '২০২৩-২৪',
  '2022-23': '২০২২-২৩',
  '2021-22': '২০২১-২২',
  '2020-21': '২০২০-২১',
  '2019-20': '২০১৯-২০',
  '2018-19': '২০১৮-১৯',
  '2017-18': '২০১৭-১৮',
};

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  initialSection = 'board',
  extraQuestions = [],
  bookmarks,
  resolvedAccess,
  onOpenEnrollModal,
  onRecordAnswer,
  onToggleBookmark,
  onOpenVisualLesson,
  onStartPastYearModelTest,
}) => {
  const [bankSection, setBankSection] = useState<QuestionBankSection>(initialSection);

  // Board section filters
  const [boardFilter, setBoardFilter] = useState<BoardId | 'all'>('all');
  const [boardYearFilter, setBoardYearFilter] = useState<string>('all');

  // Admission section filters
  const [admissionCategory, setAdmissionCategory] = useState<
    'all' | 'past_year' | 'MBBS' | 'BDS'
  >('all');
  const [sessionFilter, setSessionFilter] = useState<string>('all');

  // Shared filters & study state
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | 'all'>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [studyModeRevealAll, setStudyModeRevealAll] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Timer state
  const [elapsedSec, setElapsedSec] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);

  const listTopRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBankSection(initialSection);
  }, [initialSection]);

  useEffect(() => {
    if (timerPaused) return;
    const t = window.setInterval(() => {
      setElapsedSec((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(t);
  }, [timerPaused]);

  const allQuestions = useMemo(
    () => (extraQuestions.length > 0 ? [...extraQuestions, ...QUESTION_BANK] : QUESTION_BANK),
    [extraQuestions]
  );

  // Partition allQuestions cleanly into the 2 sections
  const allBoardQuestions = useMemo(
    () => allQuestions.filter((q) => q.difficulty === 'board' && !q.pastExam),
    [allQuestions]
  );

  const allAdmissionQuestions = useMemo(
    () => allQuestions.filter((q) => q.difficulty !== 'board' || Boolean(q.pastExam)),
    [allQuestions]
  );

  const pastYearAdmissionCount = useMemo(
    () => allAdmissionQuestions.filter((q) => Boolean(q.pastExam)).length,
    [allAdmissionQuestions]
  );

  const mbbsAdmissionCount = useMemo(
    () =>
      allAdmissionQuestions.filter(
        (q) => q.pastExam?.exam === 'MBBS' || q.difficulty === 'medical'
      ).length,
    [allAdmissionQuestions]
  );

  const bdsAdmissionCount = useMemo(
    () =>
      allAdmissionQuestions.filter(
        (q) => q.pastExam?.exam === 'BDS' || q.difficulty === 'dental'
      ).length,
    [allAdmissionQuestions]
  );

  const sectionPool = bankSection === 'board' ? allBoardQuestions : allAdmissionQuestions;

  const availableChapters = useMemo(() => {
    if (subjectFilter === 'all') return CHAPTERS;
    return CHAPTERS.filter((c) => c.subjectId === subjectFilter);
  }, [subjectFilter]);

  // Reset chapter filter if it doesn't belong to the newly chosen subject
  useEffect(() => {
    if (
      chapterFilter !== 'all' &&
      !availableChapters.some((ch) => ch.id === chapterFilter)
    ) {
      setChapterFilter('all');
    }
  }, [availableChapters, chapterFilter]);

  const filteredQuestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = sectionPool.filter((q) => {
      if (bankSection === 'board') {
        if (boardFilter !== 'all' && q.boardExam?.board !== boardFilter) return false;
        if (boardYearFilter !== 'all' && q.boardExam?.year !== boardYearFilter) return false;
      } else {
        if (admissionCategory === 'past_year' && !q.pastExam) return false;
        if (
          admissionCategory === 'MBBS' &&
          q.pastExam?.exam !== 'MBBS' &&
          q.difficulty !== 'medical'
        ) {
          return false;
        }
        if (
          admissionCategory === 'BDS' &&
          q.pastExam?.exam !== 'BDS' &&
          q.difficulty !== 'dental'
        ) {
          return false;
        }
        if (sessionFilter !== 'all' && q.pastExam?.session !== sessionFilter) {
          return false;
        }
      }

      if (subjectFilter !== 'all' && q.subjectId !== subjectFilter) return false;
      if (chapterFilter !== 'all' && q.chapterId !== chapterFilter) return false;

      if (query) {
        const chName = CHAPTERS.find((c) => c.id === q.chapterId)?.nameBn || '';
        const boardLabel = q.boardExam ? BOARD_LABELS[q.boardExam.board] : '';
        const boardYear = q.boardExam ? `${q.boardExam.year} ${BOARD_YEAR_LABELS[q.boardExam.year] || ''}` : '';
        const pastLabel = q.pastExam
          ? `${q.pastExam.exam} ${q.pastExam.session} ${SESSION_LABELS[q.pastExam.session] || ''}`
          : '';
        const haystack =
          `${q.question} ${q.explanation} ${q.reference} ${chName} ${boardLabel} ${boardYear} ${pastLabel}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    if (shuffleSeed > 0) {
      return shuffleArray(list);
    }
    return list;
  }, [
    sectionPool,
    bankSection,
    boardFilter,
    boardYearFilter,
    admissionCategory,
    sessionFilter,
    subjectFilter,
    chapterFilter,
    searchQuery,
    shuffleSeed,
  ]);

  // Reset pagination whenever filters or section change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    bankSection,
    boardFilter,
    boardYearFilter,
    admissionCategory,
    sessionFilter,
    subjectFilter,
    chapterFilter,
    searchQuery,
    shuffleSeed,
  ]);

  const isPreviewCapped = Boolean(
    resolvedAccess &&
      !resolvedAccess.hasFullAccess &&
      resolvedAccess.questionBankLimit !== null &&
      filteredQuestions.length > resolvedAccess.questionBankLimit
  );

  const visibleQuestions = useMemo(() => {
    if (
      resolvedAccess &&
      !resolvedAccess.hasFullAccess &&
      resolvedAccess.questionBankLimit !== null
    ) {
      return filteredQuestions.slice(0, resolvedAccess.questionBankLimit);
    }
    return filteredQuestions;
  }, [filteredQuestions, resolvedAccess]);

  const totalPages = Math.max(1, Math.ceil(visibleQuestions.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const pagedQuestions = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return visibleQuestions.slice(start, start + PAGE_SIZE);
  }, [visibleQuestions, safePage]);

  const handlePageChange = (nextPage: number) => {
    const clamped = Math.max(1, Math.min(totalPages, nextPage));
    setCurrentPage(clamped);
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectOption = (q: McqQuestion, optIdx: number) => {
    if (studyModeRevealAll || userAnswers[q.id] !== undefined) return;
    if (resolvedAccess && !resolvedAccess.hasFullAccess && resolvedAccess.dailyLimitReached) {
      onOpenEnrollModal?.();
      return;
    }
    setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
    onRecordAnswer(q, optIdx === q.correctIndex, 20, optIdx);
  };

  const handleResetFilters = () => {
    setBoardFilter('all');
    setBoardYearFilter('all');
    setAdmissionCategory('all');
    setSessionFilter('all');
    setSubjectFilter('all');
    setChapterFilter('all');
    setSearchQuery('');
    setShuffleSeed(0);
    setCurrentPage(1);
  };

  const solvedCount = useMemo(
    () => filteredQuestions.filter((q) => userAnswers[q.id] !== undefined).length,
    [filteredQuestions, userAnswers]
  );

  const correctCount = useMemo(
    () =>
      filteredQuestions.filter((q) => userAnswers[q.id] === q.correctIndex).length,
    [filteredQuestions, userAnswers]
  );

  // Build visible page numbers with ellipsis
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | 'ellipsis')[] = [1];
    if (safePage > 3) pages.push('ellipsis');
    for (
      let p = Math.max(2, safePage - 1);
      p <= Math.min(totalPages - 1, safePage + 1);
      p += 1
    ) {
      pages.push(p);
    }
    if (safePage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  }, [safePage, totalPages]);

  const startItemNum = visibleQuestions.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const endItemNum = Math.min(safePage * PAGE_SIZE, visibleQuestions.length);

  return (
    <div className="space-y-6">
      {/* 2-Part Primary Switcher: Board Questions vs Admission Test Questions */}
      <section aria-label="প্রশ্ন ব্যাংকের ২টি বিভাগ" className="grid sm:grid-cols-2 gap-4">
        <GlassTiltCard className="rounded-2xl" maxTiltDeg={2.2}>
          <button
            type="button"
            onClick={() => {
              setBankSection('board');
              setSubjectFilter('all');
              setChapterFilter('all');
              setSearchQuery('');
              setShuffleSeed(0);
            }}
            className={`relative z-10 w-full h-full text-left rounded-2xl p-5 flex items-start justify-between gap-4 transition-all ${
              bankSection === 'board'
                ? 'glass-btn-primary'
                : 'bio-card glass-card-3d text-[#1D1336] dark:text-[#F4F0FF]'
            }`}
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold opacity-90">
                <GraduationCap className="w-4 h-4" />
                বিভাগ ১ · HSC বোর্ড আর্কাইভ (২০১৭–২০২৪)
              </div>
              <h2 className="text-lg sm:text-xl font-bold">
                বিভিন্ন সালের বোর্ড প্রশ্ন
              </h2>
              <p
                className={`text-xs leading-relaxed ${
                  bankSection === 'board' ? 'text-white/85' : 'text-[#554578] dark:text-[#B6ABD6]'
                }`}
              >
                ঢাকা, রাজশাহী, চট্টগ্রাম, কুমিল্লা, যশোর, সিলেট, বরিশাল, দিনাজপুর ও ময়মনসিংহ বোর্ডের সালভিত্তিক প্রশ্ন
              </p>
            </div>
            <div
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono-tabular font-bold ${
                bankSection === 'board'
                  ? 'bg-white/22 text-white border border-white/30'
                  : 'bio-subpanel text-[#6D4ACF] dark:text-[#C4B5FD]'
              }`}
            >
              {toBnDigits(allBoardQuestions.length)}টি
            </div>
          </button>
        </GlassTiltCard>

        <GlassTiltCard className="rounded-2xl" maxTiltDeg={2.2}>
          <button
            type="button"
            onClick={() => {
              setBankSection('admission');
              setSubjectFilter('all');
              setChapterFilter('all');
              setSearchQuery('');
              setShuffleSeed(0);
            }}
            className={`relative z-10 w-full h-full text-left rounded-2xl p-5 flex items-start justify-between gap-4 transition-all ${
              bankSection === 'admission'
                ? 'glass-btn-primary'
                : 'bio-card glass-card-3d text-[#1D1336] dark:text-[#F4F0FF]'
            }`}
          >
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold opacity-90">
                <Stethoscope className="w-4 h-4" />
                বিভাগ ২ · মেডিকেল (MBBS) ও ডেন্টাল (BDS)
              </div>
              <h2 className="text-lg sm:text-xl font-bold">
                এডমিশন টেস্টের প্রশ্ন
              </h2>
              <p
                className={`text-xs leading-relaxed ${
                  bankSection === 'admission' ? 'text-white/85' : 'text-[#554578] dark:text-[#B6ABD6]'
                }`}
              >
                বিগত ২০১৭–২০২৪ MBBS ও BDS ভর্তি পরীক্ষার প্রশ্ন এবং অধ্যায়ভিত্তিক অ্যাডমিশন স্ট্যান্ডার্ড MCQ
              </p>
            </div>
            <div
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-mono-tabular font-bold ${
                bankSection === 'admission'
                  ? 'bg-white/22 text-white border border-white/30'
                  : 'bio-subpanel text-[#6D4ACF] dark:text-[#C4B5FD]'
              }`}
            >
              {toBnDigits(allAdmissionQuestions.length)}টি
            </div>
          </button>
        </GlassTiltCard>
      </section>

      {/* Contextual Header Banner */}
      <section className="relative overflow-hidden glass-hero-card rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {bankSection === 'board' ? (
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                <Archive className="w-4 h-4" />
                বাংলাদেশ শিক্ষা বোর্ডসমূহের HSC বোর্ড প্রশ্ন ব্যাংক (২০১৭–২০২৪)
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                বিভিন্ন সালের বোর্ড প্রশ্ন ব্যাংক
              </h1>
              <p className="text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                মোট{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                  {toBnDigits(allBoardQuestions.length)}
                </strong>
                টি HSC বোর্ড স্ট্যান্ডার্ড প্রশ্ন ৯টি শিক্ষা বোর্ড ও ৭টি পরীক্ষার সাল অনুযায়ী
                সাজানো হয়েছে — প্রতিটি প্রশ্নে রয়েছে সঠিক উত্তর, ব্যাখ্যা ও অধ্যায় রেফারেন্স।
              </p>
            </div>
          ) : (
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                <Archive className="w-4 h-4" />
                DGME মেডিকেল (MBBS) ও ডেন্টাল (BDS) এডমিশন প্রশ্ন ব্যাংক
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                এডমিশন টেস্টের প্রশ্ন ব্যাংক (MBBS ও BDS)
              </h1>
              <p className="text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                মোট{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                  {toBnDigits(allAdmissionQuestions.length)}
                </strong>
                টি এডমিশন প্রশ্ন — এর মধ্যে বিগত ২০১৭–২০২৪ সেশনের{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                  {toBnDigits(pastYearAdmissionCount)}
                </strong>
                টি অফিশিয়াল প্রশ্ন এবং{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                  {toBnDigits(mbbsAdmissionCount)}
                </strong>
                টি MBBS ও{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                  {toBnDigits(bdsAdmissionCount)}
                </strong>
                টি BDS অনুশীলন প্রশ্ন রয়েছে।
              </p>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onStartPastYearModelTest}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold glass-btn-primary rounded-xl whitespace-nowrap"
            >
              <Stethoscope className="w-4 h-4" />
              {bankSection === 'board'
                ? '১০০ নম্বরের মেডিকেল মডেল টেস্ট দিন'
                : 'বিগত বছরের স্পেশাল ১০০ নম্বরের মডেল টেস্ট'}
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="bio-card rounded-2xl p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {bankSection === 'board' ? (
            /* Board Year Quick Switcher */
            <div className="flex flex-wrap items-center gap-1 p-1 glass-segment-track rounded-xl">
              <button
                type="button"
                onClick={() => setBoardYearFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  boardYearFilter === 'all'
                    ? 'glass-segment-active'
                    : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                সকল সাল ({toBnDigits(allBoardQuestions.length)})
              </button>
              {BOARD_EXAM_YEARS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setBoardYearFilter(yr)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    boardYearFilter === yr
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {BOARD_YEAR_LABELS[yr] || yr}
                </button>
              ))}
            </div>
          ) : (
            /* Admission Category Quick Switcher */
            <div className="flex flex-wrap items-center gap-1 p-1 glass-segment-track rounded-xl">
              {[
                {
                  id: 'all' as const,
                  label: `সকল এডমিশন (${toBnDigits(allAdmissionQuestions.length)})`,
                },
                {
                  id: 'past_year' as const,
                  label: `বিগত সালের প্রশ্ন (${toBnDigits(pastYearAdmissionCount)})`,
                },
                {
                  id: 'MBBS' as const,
                  label: `মেডিকেল MBBS (${toBnDigits(mbbsAdmissionCount)})`,
                },
                {
                  id: 'BDS' as const,
                  label: `ডেন্টাল BDS (${toBnDigits(bdsAdmissionCount)})`,
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setAdmissionCategory(item.id);
                    if (item.id === 'MBBS' || item.id === 'BDS' || item.id === 'all') {
                      // Keep sessionFilter as-is or clear if user wants full pool
                    }
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    admissionCategory === item.id
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {/* Study Mode Toggle + Digital Timer + Shuffle */}
          <div className="flex flex-wrap items-center gap-2.5">
            <DigitalTimer
              mode="stopwatch"
              seconds={elapsedSec}
              label="অনুশীলন ডিজিটাল টাইমার"
              isPaused={timerPaused}
              onTogglePause={() => setTimerPaused((p) => !p)}
              onReset={() => {
                setElapsedSec(0);
                setTimerPaused(false);
              }}
              compact
            />
            {solvedCount > 0 && (
              <span className="text-xs font-mono-tabular text-[#554578] dark:text-[#B6ABD6] mr-1">
                সমাধান: <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{toBnDigits(solvedCount)}</strong> · সঠিক:{' '}
                <strong className="text-emerald-700 dark:text-emerald-300">{toBnDigits(correctCount)}</strong>
              </span>
            )}
            <button
              type="button"
              onClick={() => setShuffleSeed((s) => s + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              র‍্যান্ডম অর্ডার
            </button>
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
          </div>
        </div>

        {/* Secondary Filter Row: Board/Session + Subject + Chapter + Search */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {bankSection === 'board' ? (
            <select
              value={boardFilter}
              onChange={(e) => setBoardFilter(e.target.value as BoardId | 'all')}
              className="px-3 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
              aria-label="শিক্ষা বোর্ড ফিল্টার"
            >
              <option value="all">
                সকল শিক্ষা বোর্ড ({toBnDigits(allBoardQuestions.length)})
              </option>
              {BOARD_NAMES.map((b) => {
                const cnt = allBoardQuestions.filter((q) => q.boardExam?.board === b).length;
                return (
                  <option key={b} value={b}>
                    {BOARD_LABELS[b]} ({toBnDigits(cnt)})
                  </option>
                );
              })}
            </select>
          ) : (
            <select
              value={sessionFilter}
              onChange={(e) => setSessionFilter(e.target.value)}
              className="px-3 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
              aria-label="ভর্তি পরীক্ষার শিক্ষাবর্ষ ফিল্টার"
            >
              <option value="all">সকল এডমিশন প্রশ্ন ও শিক্ষাবর্ষ</option>
              {PAST_EXAM_SESSIONS.map((sess) => {
                const cnt = allAdmissionQuestions.filter(
                  (q) => q.pastExam?.session === sess
                ).length;
                return (
                  <option key={sess} value={sess}>
                    ভর্তি পরীক্ষা {SESSION_LABELS[sess] || sess} ({toBnDigits(cnt)})
                  </option>
                );
              })}
            </select>
          )}

          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value as SubjectId | 'all')}
            className="px-3 py-2 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
            aria-label="বিষয় ফিল্টার"
          >
            <option value="all">সকল বিষয় ({toBnDigits(sectionPool.length)})</option>
            {SUBJECTS.map((sub) => {
              const cnt = sectionPool.filter((q) => q.subjectId === sub.id).length;
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
              placeholder={
                bankSection === 'board'
                  ? 'টপিক, বোর্ড বা প্রশ্ন খুঁজুন...'
                  : 'টপিক, সেশন বা প্রশ্ন খুঁজুন...'
              }
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF] placeholder:text-[#7F6DA8] dark:placeholder:text-[#8E82B5]"
            />
          </div>
        </div>
      </section>

      {/* Question Bank List */}
      <div ref={listTopRef} />
      {visibleQuestions.length === 0 ? (
        <div className="bio-card rounded-2xl p-10 text-center space-y-3">
          <div className="text-base font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
            নির্বাচিত ফিল্টারে কোনো প্রশ্ন পাওয়া যায়নি
          </div>
          <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
            বোর্ড, সাল, বিষয় বা সার্চ শব্দ পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
          >
            সব ফিল্টার রিসেট করুন
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {isPreviewCapped && (
            <div className="bio-card rounded-2xl p-4 sm:p-5 border border-[#8B5CF6]/35 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-[#1D1336] dark:text-[#F4F0FF]">
                  ফ্রি ট্রায়াল প্ল্যানে প্রথম{' '}
                  <strong className="font-mono-tabular">
                    {toBnDigits(visibleQuestions.length)}
                  </strong>
                  টি প্রশ্ন প্রিভিউ চলছে — এই সেকশনের সব{' '}
                  <strong className="font-mono-tabular">
                    {toBnDigits(filteredQuestions.length)}
                  </strong>
                  টি প্রশ্ন আনলক করতে প্রো এনরোল করুন।
                </div>
              </div>
              {onOpenEnrollModal && (
                <button
                  type="button"
                  onClick={onOpenEnrollModal}
                  className="glass-btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl shrink-0"
                >
                  <Crown className="w-3.5 h-3.5" />
                  সব প্রশ্ন আনলক করুন
                </button>
              )}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#554578] dark:text-[#B6ABD6] font-mono-tabular">
            <span>
              মোট <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{toBnDigits(visibleQuestions.length)}</strong>টি প্রশ্নের মধ্যে{' '}
              <strong className="text-[#1D1336] dark:text-[#F4F0FF]">
                {toBnDigits(startItemNum)}–{toBnDigits(endItemNum)}
              </strong>{' '}
              প্রদর্শিত হচ্ছে
            </span>
            <span>
              পৃষ্ঠা <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{toBnDigits(safePage)}</strong> /{' '}
              {toBnDigits(totalPages)}
            </span>
          </div>

          {pagedQuestions.map((q, idx) => {
            const globalNumber = (safePage - 1) * PAGE_SIZE + idx + 1;
            const userPick = userAnswers[q.id];
            const showSolution = studyModeRevealAll || userPick !== undefined;

            const originLabel = q.pastExam
              ? `${q.pastExam.exam} ${SESSION_LABELS[q.pastExam.session] || q.pastExam.session}`
              : q.boardExam
              ? `${BOARD_LABELS[q.boardExam.board]} ${BOARD_YEAR_LABELS[q.boardExam.year] || q.boardExam.year}`
              : q.difficulty === 'medical'
              ? 'মেডিকেল (MBBS) এডমিশন'
              : q.difficulty === 'dental'
              ? 'ডেন্টাল (BDS) এডমিশন'
              : 'HSC বোর্ড স্ট্যান্ডার্ড';

            return (
              <article
                key={q.id}
                className="bio-card glass-card-3d rounded-2xl p-5 sm:p-6 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs text-[#554578] dark:text-[#B6ABD6] flex flex-wrap items-center gap-2">
                    <span className="font-mono-tabular font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                      #{toBnDigits(globalNumber)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                      {originLabel}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{getSubjectById(q.subjectId)?.nameBn}</span>
                    <span aria-hidden="true">·</span>
                    <span>{getChapterById(q.chapterId)?.nameBn}</span>
                  </div>

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
                </div>

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
                        key={`${q.id}_opt_${optIdx}`}
                        type="button"
                        disabled={showSolution}
                        onClick={() => handleSelectOption(q, optIdx)}
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

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <nav
              aria-label="প্রশ্ন ব্যাংকের পৃষ্ঠা নেভিগেশন"
              className="bio-card rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3"
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

              <div className="flex flex-wrap items-center gap-1.5">
                {pageNumbers.map((item, idx) =>
                  item === 'ellipsis' ? (
                    <span
                      key={`el_${idx}`}
                      className="px-2 text-xs text-[#6B5B8E] dark:text-[#A598C9] select-none"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePageChange(item)}
                      className={`min-w-[34px] h-8 px-2 text-xs font-mono-tabular font-semibold rounded-xl transition-all ${
                        safePage === item
                          ? 'glass-btn-primary'
                          : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                      }`}
                    >
                      {toBnDigits(item)}
                    </button>
                  )
                )}
              </div>

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
    </div>
  );
};
