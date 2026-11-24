import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Crown,
  LineChart as LineChartIcon,
  PlayCircle,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CHAPTERS, SUBJECTS, getChapterById, getSubjectById } from '../data/curriculum';
import { toBnDigits } from '../data/bioQuestionHelpers';
import { QUESTION_BANK } from '../data/questions';
import {
  AccessPolicyConfig,
  AppTab,
  ChapterInfo,
  DailyPerformerEntry,
  HscLevel,
  McqQuestion,
  ResolvedUserAccess,
  TargetExam,
  TestAttemptRecord,
  TopicStat,
  WrongAnswerRecord,
} from '../types/learning';
import { LocalDailyProgress } from '../services/learningStore';
import { BRAND_NAME, BrandLogo } from './BrandLogo';
import { DailyGoalProgress } from './DailyGoalProgress';
import { DailyTopPerformersCard } from './DailyTopPerformersCard';
import { GlassTiltCard } from './GlassTiltCard';

interface DashboardViewProps {
  isDark?: boolean;
  isSignedIn: boolean;
  currentUserId?: string;
  displayName: string;
  photoUrl?: string;
  targetExam: TargetExam;
  hscClass: HscLevel;
  college: string;
  dailyGoal: number;
  todayAttempted: number;
  todayCorrect: number;
  todayDateKey: string;
  dailyPerformers: DailyPerformerEntry[];
  localDailyProgress?: LocalDailyProgress;
  topicStats: Record<string, TopicStat>;
  testAttempts: TestAttemptRecord[];
  bookmarkCount: number;
  wrongAnswers: Record<string, WrongAnswerRecord>;
  extraQuestions?: McqQuestion[];
  accessPolicy?: AccessPolicyConfig;
  resolvedAccess?: ResolvedUserAccess;
  onUpdateProfile: (updates: {
    displayName: string;
    targetExam: TargetExam;
    hscClass: HscLevel;
    college: string;
    photoUrl?: string;
    dailyGoal: number;
  }) => Promise<void>;
  onNavigateTab: (tab: AppTab) => void;
  onPracticeChapter: (chapter: ChapterInfo) => void;
  onOpenVisualLesson: (visualLessonId: string) => void;
  onDeleteAttempt: (attemptId: string) => Promise<void>;
  onSignIn: () => void;
  onOpenEnrollModal?: () => void;
}

type MasteryFilter = 'all' | 'weak' | 'moderate' | 'strong' | 'unstarted';
type TrendScope = 'all' | 'mock' | 'model';

interface AccuracyTrendPoint {
  index: number;
  label: string;
  shortDate: string;
  fullDate: string;
  testTitle: string;
  testTypeLabel: string;
  accuracy: number;
  netScorePct: number;
  correctCount: number;
  answeredCount: number;
  totalQuestions: number;
  netScore: number;
  maxScore: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  isDark = false,
  isSignedIn,
  currentUserId,
  displayName,
  photoUrl = '',
  targetExam,
  hscClass,
  college,
  dailyGoal,
  todayAttempted,
  todayCorrect,
  todayDateKey,
  dailyPerformers,
  localDailyProgress,
  topicStats,
  testAttempts,
  bookmarkCount,
  wrongAnswers,
  extraQuestions = [],
  accessPolicy,
  resolvedAccess,
  onUpdateProfile,
  onNavigateTab,
  onPracticeChapter,
  onOpenVisualLesson,
  onDeleteAttempt,
  onSignIn,
  onOpenEnrollModal,
}) => {
  const [masteryFilter, setMasteryFilter] = useState<MasteryFilter>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [trendScope, setTrendScope] = useState<TrendScope>('all');

  const [editingGoal, setEditingGoal] = useState(false);
  const [formName, setFormName] = useState(displayName);
  const [formTarget, setFormTarget] = useState<TargetExam>(targetExam);
  const [formClass, setFormClass] = useState<HscLevel>(hscClass);
  const [formCollege, setFormCollege] = useState(college);
  const [formPhotoUrl, setFormPhotoUrl] = useState(photoUrl);
  const [formDailyGoal, setFormDailyGoal] = useState(dailyGoal);
  const [savingProfile, setSavingProfile] = useState(false);
  const [heroAvatarFailed, setHeroAvatarFailed] = useState(false);

  useEffect(() => {
    setHeroAvatarFailed(false);
  }, [photoUrl]);

  const allQuestions = useMemo(
    () => (extraQuestions.length > 0 ? [...extraQuestions, ...QUESTION_BANK] : QUESTION_BANK),
    [extraQuestions]
  );

  const chapterQuestionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of allQuestions) {
      counts[q.chapterId] = (counts[q.chapterId] || 0) + 1;
    }
    return counts;
  }, [allQuestions]);

  const wrongBankSummary = useMemo(() => {
    const qMap = new Map(allQuestions.map((q) => [q.id, q]));
    const records = Object.values(wrongAnswers)
      .filter((r) => qMap.has(r.questionId))
      .sort((a, b) => b.lastWrongAtMs - a.lastWrongAtMs);
    const bySub: Record<string, number> = {};
    let totalMistakes = 0;
    records.forEach((r) => {
      bySub[r.subjectId] = (bySub[r.subjectId] || 0) + 1;
      totalMistakes += r.wrongCount;
    });
    const topSubjects = Object.entries(bySub)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([subId, count]) => ({
        subjectName: getSubjectById(subId)?.shortNameBn || subId,
        count,
      }));
    const recentItems = records.slice(0, 3).map((rec) => ({
      record: rec,
      question: qMap.get(rec.questionId)!,
      chapterName: getChapterById(rec.chapterId)?.nameBn || '',
      subjectName: getSubjectById(rec.subjectId)?.shortNameBn || '',
    }));
    return {
      totalUnique: records.length,
      totalMistakes,
      topSubjects,
      recentItems,
    };
  }, [wrongAnswers, allQuestions]);

  const chapterRows = useMemo(() => {
    return CHAPTERS.map((chapter) => {
      const stat = topicStats[chapter.id];
      const attempted = stat?.attempted || 0;
      const correct = stat?.correct || 0;
      const wrong = stat?.wrong || 0;
      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      const avgSec = attempted > 0 ? Math.round((stat?.totalTimeSec || 0) / attempted) : 0;
      const questionCount = chapterQuestionCounts[chapter.id] || 0;

      let status: 'strong' | 'moderate' | 'weak' | 'unstarted' = 'unstarted';
      if (attempted > 0) {
        if (accuracy >= 75) status = 'strong';
        else if (accuracy >= 50) status = 'moderate';
        else status = 'weak';
      }

      return {
        chapter,
        subject: getSubjectById(chapter.subjectId),
        attempted,
        correct,
        wrong,
        accuracy,
        avgSec,
        questionCount,
        status,
      };
    });
  }, [topicStats, chapterQuestionCounts]);

  const summaryMetrics = useMemo(() => {
    let totalAttempted = 0;
    let totalCorrect = 0;
    let strongCount = 0;
    let weakCount = 0;

    chapterRows.forEach((row) => {
      totalAttempted += row.attempted;
      totalCorrect += row.correct;
      if (row.status === 'strong') strongCount += 1;
      if (row.status === 'weak') weakCount += 1;
    });

    const overallAccuracy =
      totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    const modelTests = testAttempts.filter(
      (t) => t.testType === 'medical_model' || t.testType === 'dental_model'
    );
    const avgModelPercent =
      modelTests.length > 0
        ? Math.round(
            modelTests.reduce((acc, t) => acc + (t.netScore / t.maxScore) * 100, 0) /
              modelTests.length
          )
        : null;

    return {
      totalAttempted,
      totalCorrect,
      overallAccuracy,
      strongCount,
      weakCount,
      avgModelPercent,
      modelTestCount: modelTests.length,
    };
  }, [chapterRows, testAttempts]);

  const subjectSummary = useMemo(() => {
    return SUBJECTS.map((sub) => {
      const rows = chapterRows.filter((r) => r.chapter.subjectId === sub.id);
      const attempted = rows.reduce((a, r) => a + r.attempted, 0);
      const correct = rows.reduce((a, r) => a + r.correct, 0);
      const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
      return {
        subject: sub,
        attempted,
        correct,
        accuracy,
      };
    });
  }, [chapterRows]);

  const filteredChapters = useMemo(() => {
    return chapterRows.filter((row) => {
      if (subjectFilter !== 'all' && row.chapter.subjectId !== subjectFilter) return false;
      if (masteryFilter !== 'all' && row.status !== masteryFilter) return false;
      return true;
    });
  }, [chapterRows, masteryFilter, subjectFilter]);

  const priorityWeakChapters = useMemo(() => {
    return chapterRows
      .filter((r) => r.status === 'weak' || r.status === 'moderate')
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 3);
  }, [chapterRows]);

  const accuracyTrend = useMemo(() => {
    const filtered = testAttempts.filter((att) => {
      if (trendScope === 'mock') return att.testType === 'mock_test' || att.testType === 'practice_drill';
      if (trendScope === 'model') return att.testType === 'medical_model' || att.testType === 'dental_model';
      return true;
    });

    const chronological = [...filtered].sort((a, b) => a.createdAtMs - b.createdAtMs);

    const points: AccuracyTrendPoint[] = chronological.map((att, idx) => {
      const denominator = att.answeredCount > 0 ? att.answeredCount : Math.max(1, att.totalQuestions);
      const accuracy = Math.min(100, Math.max(0, Math.round((att.correctCount / denominator) * 100)));
      const netScorePct = Math.min(
        100,
        Math.max(0, Math.round((att.netScore / Math.max(1, att.maxScore)) * 100))
      );
      const dateObj = new Date(att.createdAtMs);
      const shortDate = dateObj.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short' });
      const fullDate = dateObj.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const testTypeLabel =
        att.testType === 'medical_model'
          ? 'মেডিকেল মডেল টেস্ট'
          : att.testType === 'dental_model'
            ? 'ডেন্টাল মডেল টেস্ট'
            : att.testType === 'practice_drill'
              ? 'প্র্যাকটিস ড্রিল'
              : 'বিষয়ভিত্তিক মক টেস্ট';

      return {
        index: idx + 1,
        label: `#${idx + 1} (${shortDate})`,
        shortDate,
        fullDate,
        testTitle: att.testTitle,
        testTypeLabel,
        accuracy,
        netScorePct,
        correctCount: att.correctCount,
        answeredCount: att.answeredCount,
        totalQuestions: att.totalQuestions,
        netScore: att.netScore,
        maxScore: att.maxScore,
      };
    });

    const latestAccuracy = points.length > 0 ? points[points.length - 1].accuracy : null;
    const firstAccuracy = points.length > 0 ? points[0].accuracy : null;
    const delta =
      points.length >= 2 && latestAccuracy !== null && firstAccuracy !== null
        ? latestAccuracy - firstAccuracy
        : null;
    const bestAccuracy =
      points.length > 0 ? Math.max(...points.map((p) => p.accuracy)) : null;

    return {
      points,
      latestAccuracy,
      delta,
      bestAccuracy,
    };
  }, [testAttempts, trendScope]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await onUpdateProfile({
        displayName: formName,
        targetExam: formTarget,
        hscClass: formClass,
        college: formCollege,
        photoUrl: formPhotoUrl,
        dailyGoal: formDailyGoal,
      });
      setEditingGoal(false);
    } finally {
      setSavingProfile(false);
    }
  };

  const targetExamLabel =
    targetExam === 'medical'
      ? 'মেডিকেল (MBBS) অ্যাডমিশন'
      : targetExam === 'dental'
        ? 'ডেন্টাল (BDS) অ্যাডমিশন'
        : 'HSC বিজ্ঞান একাডেমিক এক্সেলেন্স';

  return (
    <div className="space-y-8">
      {/* Hero Split Banner with 3D Frosted Glass & Medical Biology Vector Illustration */}
      <section className="grid lg:grid-cols-12 gap-6 items-stretch">
        <GlassTiltCard className="lg:col-span-8 rounded-2xl" maxTiltDeg={1.6}>
          <div className="relative h-full overflow-hidden glass-hero-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            {/* Subtle 3D Ambient Glass Depth Orbs Inside Hero */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full bg-gradient-to-br from-[#8B5CF6]/20 via-indigo-400/10 to-transparent blur-xl"
            />
            {/* Subtle Medical Biology DNA, User Avatar Ring & ECG Graphic Accent */}
            <div className="hidden sm:block absolute right-3 top-3 w-56 h-44 pointer-events-none">
              <svg
                aria-hidden="true"
                viewBox="0 0 280 220"
                className="w-full h-full opacity-25 dark:opacity-45"
              >
                {/* DNA Double Helix */}
                <path
                  d="M40 20 C90 50, 90 90, 40 120 C-10 150, -10 190, 40 210"
                  fill="none"
                  stroke={isDark ? '#A78BFA' : '#6D4ACF'}
                  strokeWidth="3"
                />
                <path
                  d="M100 20 C50 50, 50 90, 100 120 C150 150, 150 190, 100 210"
                  fill="none"
                  stroke={isDark ? '#818CF8' : '#4338CA'}
                  strokeWidth="3"
                />
                <line x1="55" y1="35" x2="85" y2="35" stroke={isDark ? '#A78BFA' : '#6D4ACF'} strokeWidth="2" />
                <line x1="65" y1="70" x2="75" y2="70" stroke={isDark ? '#A78BFA' : '#6D4ACF'} strokeWidth="2" />
                <line x1="55" y1="105" x2="85" y2="105" stroke={isDark ? '#A78BFA' : '#6D4ACF'} strokeWidth="2" />
                <line x1="25" y1="145" x2="115" y2="145" stroke={isDark ? '#818CF8' : '#4338CA'} strokeWidth="2" />
                <line x1="25" y1="180" x2="115" y2="180" stroke={isDark ? '#818CF8' : '#4338CA'} strokeWidth="2" />
                {/* Stylized Cellular Membrane Orbit Ring framing the User Profile Picture */}
                <circle cx="210" cy="70" r="44" fill="none" stroke={isDark ? '#A78BFA' : '#6D4ACF'} strokeWidth="2.5" strokeDasharray="5 4" />
                {/* ECG Waveform */}
                <path
                  d="M140 175 L168 175 L176 162 L184 185 L195 135 L206 198 L214 175 L235 175 L244 166 L252 175 L275 175"
                  fill="none"
                  stroke={isDark ? '#FB7185' : '#BE123C'}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* User Profile Picture Centered Inside the Orbital Circle */}
              <div
                className="pointer-events-auto absolute left-[136px] top-[24px] w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-white via-[#EDE6FC] to-[#C4B5FD] dark:from-[#3B2A72] dark:via-[#261B4D] dark:to-[#191236] ring-2 ring-white/95 dark:ring-violet-300/40 shadow-[0_10px_24px_-6px_rgba(109,74,207,0.42)] dark:shadow-[0_10px_24px_-6px_rgba(0,0,0,0.65)] overflow-hidden flex items-center justify-center"
              >
                {photoUrl.trim() && !heroAvatarFailed ? (
                  <img
                    src={photoUrl.trim()}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    onError={() => setHeroAvatarFailed(true)}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8B5CF6] via-[#6D4ACF] to-[#4338CA] text-white font-bold text-xl flex items-center justify-center select-none">
                    {(displayName.trim().charAt(0) || 'শ').toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10 space-y-3 sm:pr-28">
              <div className="flex items-center gap-3.5">
                <BrandLogo size="lg" />
                <div className="space-y-0.5">
                  <div className="text-sm font-bold tracking-wide text-[#1D1336] dark:text-[#F4F0FF]">
                    {BRAND_NAME}
                  </div>
                  <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                    {targetExamLabel} · {hscClass === '11' ? 'একাদশ শ্রেণি' : hscClass === '12' ? 'দ্বাদশ শ্রেণি' : 'অ্যাডমিশন ব্যাচ'}
                    {college ? ` · ${college}` : ''}
                  </div>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF] leading-snug max-w-2xl">
                স্বাগতম, {displayName} — আপনার সবলতা ও দুর্বলতা অনুযায়ী প্রস্তুতি নিন
              </h1>
              <p className="text-sm sm:text-base text-[#554578] dark:text-[#B6ABD6] max-w-2xl leading-relaxed">
                বাংলাদেশের একাদশ-দ্বাদশ শ্রেণির বিজ্ঞান এবং মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষার পূর্ণাঙ্গ
                সিলেবাসে {toBnDigits(allQuestions.length)}+ প্রশ্নের র‍্যান্ডম অনুশীলন, বিভিন্ন সালের বোর্ড ও এডমিশন প্রশ্ন ব্যাংক,
                ১০০ নম্বরের মডেল টেস্ট এবং ইনফোগ্রাফ-ভিডিও লেকচার একই ড্যাশবোর্ডে।
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigateTab('medical_model')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold glass-btn-primary rounded-xl"
              >
                ১০০ নম্বরের মেডিকেল মডেল টেস্ট দিন
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('question_bank')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-xl"
              >
                বোর্ড ও এডমিশন প্রশ্ন ব্যাংক
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('practice')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
              >
                বিষয়ভিত্তিক র‍্যান্ডম প্র্যাকটিস
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormName(displayName);
                  setFormTarget(targetExam);
                  setFormClass(hscClass);
                  setFormCollege(college);
                  setFormPhotoUrl(photoUrl);
                  setFormDailyGoal(dailyGoal);
                  setEditingGoal((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white underline underline-offset-4"
              >
                লক্ষ্য পরিবর্তন করুন
              </button>
            </div>
          </div>
        </GlassTiltCard>

        {/* Right Companion Card: Daily Goal Glossy Progress & Remediation Focus */}
        <div className="lg:col-span-4 bio-card glass-card-3d rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <DailyGoalProgress
            todayAttempted={todayAttempted}
            todayCorrect={todayCorrect}
            dailyGoal={dailyGoal}
            todayDateKey={todayDateKey}
            storageScopeKey={currentUserId || 'guest'}
            onPracticeClick={() => onNavigateTab('practice')}
            onEditGoalClick={() => {
              setFormName(displayName);
              setFormTarget(targetExam);
              setFormClass(hscClass);
              setFormCollege(college);
              setFormPhotoUrl(photoUrl);
              setFormDailyGoal(dailyGoal);
              setEditingGoal(true);
            }}
          />

          <div className="flex items-center justify-between gap-2 pt-1">
            <h2 className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">আজকের ফোকাস ও দুর্বল টপিক</h2>
            <span className="text-[11px] text-[#554578] dark:text-[#B6ABD6] font-mono-tabular">
              বুকমার্ক: <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{toBnDigits(bookmarkCount)}</strong>টি
            </span>
          </div>

          {priorityWeakChapters.length > 0 ? (
            <div className="space-y-2.5">
              {priorityWeakChapters.map((item) => (
                <div
                  key={item.chapter.id}
                  className="p-3 bio-subpanel rounded-xl flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] truncate">
                      {item.chapter.nameBn}
                    </div>
                    <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6] mt-0.5 font-mono-tabular">
                      সঠিকতা {item.accuracy}% · {item.attempted}টি প্রশ্ন
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenVisualLesson(item.chapter.visualLessonId)}
                    className="shrink-0 px-2.5 py-1.5 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-lg"
                  >
                    ভিডিও দেখুন
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bio-subpanel rounded-xl space-y-2">
              <div className="text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                প্রস্তুতি বিশ্লেষণ শুরু করতে প্রস্তুত
              </div>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                যেকোনো একটি অধ্যায় প্র্যাকটিস বা মক টেস্ট দিলে আপনার দুর্বল টপিকগুলো স্বয়ংক্রিয়ভাবে এখানে চিহ্নিত হবে।
              </p>
            </div>
          )}

          {!isSignedIn && (
            <button
              type="button"
              onClick={onSignIn}
              className="w-full py-2.5 px-3 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-xl"
            >
              সব ডিভাইসে প্রোগ্রেস সেভ করতে গুগল সাইন-ইন করুন
            </button>
          )}
        </div>
      </section>

      {/* Dynamic Access Plan & Subscription Status Banner */}
      {resolvedAccess && accessPolicy && (
        <section className="bio-card rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                resolvedAccess.hasFullAccess
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-400/35 text-emerald-700 dark:text-emerald-300'
                  : resolvedAccess.isExpired
                    ? 'bg-rose-50/90 dark:bg-rose-950/60 border-rose-200 dark:border-rose-400/35 text-rose-700 dark:text-rose-300'
                    : 'bg-[#6D4ACF]/10 dark:bg-violet-500/20 border-[#6D4ACF]/25 dark:border-violet-400/35 text-[#6D4ACF] dark:text-[#C4B5FD]'
              }`}
            >
              {resolvedAccess.hasFullAccess ? (
                <Crown className="w-5 h-5" />
              ) : resolvedAccess.isExpired ? (
                <Clock className="w-5 h-5" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>

            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  {resolvedAccess.labelBn}
                </span>
                {resolvedAccess.hasFullAccess && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-50/90 dark:bg-emerald-950/65 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-400/35">
                    সব মডিউল আনলকড
                  </span>
                )}
              </div>

              {resolvedAccess.hasFullAccess ? (
                <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                  {resolvedAccess.tier === 'admin'
                    ? 'সুপার এডমিন অ্যাকাউন্ট হিসেবে আপনার জন্য প্ল্যাটফর্মের সকল ফিচার ও প্রশ্ন ব্যাংক আনলিমিটেড খোলা রয়েছে।'
                    : resolvedAccess.tier === 'lifetime_vip'
                      ? 'লাইফটাইম VIP প্রো এক্সেস সক্রিয় — সকল প্রশ্ন, মডেল টেস্ট ও ওয়ার্কশীট আনলিমিটেড।'
                      : `আপনার বার্ষিক প্রো এনরোলমেন্ট সক্রিয় আছে (আরও ${toBnDigits(resolvedAccess.daysLeft)} দিন বাকি)।`}
                </p>
              ) : resolvedAccess.needsSignIn ? (
                <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                  গুগল দিয়ে সাইন-ইন করলেই পাচ্ছেন{' '}
                  <strong className="text-[#1D1336] dark:text-[#F4F0FF]">
                    {toBnDigits(accessPolicy.trialDurationDays)} দিনের ফ্রি ট্রায়াল এক্সেস
                  </strong>{' '}
                  এবং {toBnDigits(accessPolicy.proPriceBdt)} টাকায় এনরোল করলে{' '}
                  {toBnDigits(accessPolicy.proDurationDays)} দিনের আনলিমিটেড ফুল এক্সেস।
                </p>
              ) : resolvedAccess.isExpired ? (
                <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                  আপনার ফ্রি ট্রায়াল বা সাবস্ক্রিপশন মেয়াদ শেষ হয়েছে। মাত্র {toBnDigits(accessPolicy.proPriceBdt)} টাকায়{' '}
                  {toBnDigits(accessPolicy.proDurationDays)} দিনের সম্পূর্ণ এক্সেস চালু করুন।
                </p>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                    আজকের ফ্রি প্রশ্ন কোটা:{' '}
                    <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                      {toBnDigits(resolvedAccess.dailyQuestionsUsed)} / {toBnDigits(resolvedAccess.dailyQuestionLimit ?? accessPolicy.freeDailyQuestionLimit)}
                    </strong>{' '}
                    · প্রশ্ন ব্যাংক প্রিভিউ: {toBnDigits(resolvedAccess.questionBankLimit ?? accessPolicy.freeQuestionBankLimit)}টি · ভিজ্যুয়াল:{' '}
                    {toBnDigits(resolvedAccess.visualLessonLimit ?? accessPolicy.freeVisualLessonLimit)}টি
                  </p>
                  {resolvedAccess.dailyQuestionLimit && (
                    <div className="max-w-sm h-1.5 rounded-full bg-white/60 dark:bg-white/10 overflow-hidden border border-white/75 dark:border-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#6D4ACF] to-[#8B5CF6] transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round(
                              (resolvedAccess.dailyQuestionsUsed /
                                Math.max(1, resolvedAccess.dailyQuestionLimit)) *
                                100
                            )
                          )}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {!isSignedIn && (
              <button
                type="button"
                onClick={onSignIn}
                className="glass-btn-secondary px-4 py-2 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl"
              >
                গুগল সাইন-ইন ({toBnDigits(accessPolicy.trialDurationDays)} দিন ফ্রি)
              </button>
            )}
            {onOpenEnrollModal && (
              <button
                type="button"
                onClick={onOpenEnrollModal}
                className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl ${
                  resolvedAccess.hasFullAccess
                    ? 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                    : 'glass-btn-primary'
                }`}
              >
                <Crown className="w-3.5 h-3.5" />
                {resolvedAccess.hasFullAccess
                  ? 'প্ল্যান বিস্তারিত'
                  : `${toBnDigits(accessPolicy.proPriceBdt)} টাকায় ১ বছরের ফুল এক্সেস নিন`}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Inline Profile & Study Goal Editor */}
      {editingGoal && (
        <form
          onSubmit={handleSaveProfile}
          className="bio-card rounded-2xl p-6 grid sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
        >
          <div>
            <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">শিক্ষার্থীর নাম</label>
            <input
              type="text"
              required
              maxLength={120}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">কলেজ / প্রতিষ্ঠান</label>
            <input
              type="text"
              maxLength={150}
              placeholder="যেমন: নটর ডেম / ভিকারুননিসা"
              value={formCollege}
              onChange={(e) => setFormCollege(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">ছবির URL (ঐচ্ছিক)</label>
            <input
              type="url"
              maxLength={1000}
              placeholder="https://..."
              value={formPhotoUrl}
              onChange={(e) => setFormPhotoUrl(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">মূল লক্ষ্য</label>
            <select
              value={formTarget}
              onChange={(e) => setFormTarget(e.target.value as TargetExam)}
              className="w-full px-3 py-2 text-sm rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
            >
              <option value="medical">মেডিকেল (MBBS) অ্যাডমিশন</option>
              <option value="dental">ডেন্টাল (BDS) অ্যাডমিশন</option>
              <option value="hsc_science">HSC বিজ্ঞান একাডেমিক</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">শ্রেণি ও দৈনিক লক্ষ্য</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={formClass}
                onChange={(e) => setFormClass(e.target.value as HscLevel)}
                className="w-full px-2.5 py-2 text-xs rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
              >
                <option value="11">একাদশ</option>
                <option value="12">দ্বাদশ</option>
                <option value="admission">অ্যাডমিশন</option>
              </select>
              <input
                type="number"
                min={5}
                max={200}
                value={formDailyGoal}
                onChange={(e) => setFormDailyGoal(parseInt(e.target.value || '30', 10))}
                className="w-full px-2.5 py-2 text-xs font-mono-tabular rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={savingProfile}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold glass-btn-primary rounded-xl"
            >
              <Save className="w-4 h-4" />
              {savingProfile ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ'}
            </button>
            <button
              type="button"
              onClick={() => setEditingGoal(false)}
              className="px-3 py-2 text-sm text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white"
            >
              বাতিল
            </button>
          </div>
        </form>
      )}

      {/* 4-Column KPI Strip with 3D Glass Tilt */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassTiltCard className="rounded-2xl" maxTiltDeg={3}>
          <div className="bio-card glass-card-3d rounded-2xl p-5 h-full relative z-10">
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6]">মোট অনুশীলিত প্রশ্ন</div>
            <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] mt-1">
              {summaryMetrics.totalAttempted}
            </div>
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-1 font-mono-tabular">
              সঠিক উত্তর: {summaryMetrics.totalCorrect}টি
            </div>
          </div>
        </GlassTiltCard>

        <GlassTiltCard className="rounded-2xl" maxTiltDeg={3}>
          <div className="bio-card glass-card-3d rounded-2xl p-5 h-full relative z-10">
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6]">সামগ্রিক নির্ভুলতা</div>
            <div className="text-2xl font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD] mt-1">
              {summaryMetrics.overallAccuracy}%
            </div>
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-1">৭৫%+ হলো মেডিকেল স্ট্যান্ডার্ড</div>
          </div>
        </GlassTiltCard>

        <GlassTiltCard className="rounded-2xl" maxTiltDeg={3}>
          <div className="bio-card glass-card-3d rounded-2xl p-5 h-full relative z-10">
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6]">সবল বনাম দুর্বল অধ্যায়</div>
            <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] mt-1">
              {summaryMetrics.strongCount} / {summaryMetrics.weakCount}
            </div>
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-1">
              মোট {CHAPTERS.length}টি মূল অধ্যায়
            </div>
          </div>
        </GlassTiltCard>

        <GlassTiltCard className="rounded-2xl" maxTiltDeg={3}>
          <div className="bio-card glass-card-3d rounded-2xl p-5 h-full relative z-10">
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6]">মডেল টেস্ট গড় স্কোর</div>
            <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] mt-1">
              {summaryMetrics.avgModelPercent !== null ? `${summaryMetrics.avgModelPercent}%` : '—'}
            </div>
            <div className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-1 font-mono-tabular">
              সম্পন্ন মডেল টেস্ট: {summaryMetrics.modelTestCount}টি
            </div>
          </div>
        </GlassTiltCard>
      </section>

      {/* Daily Top 3 Performers Podium Showcase */}
      <DailyTopPerformersCard
        dateKey={todayDateKey}
        entries={dailyPerformers}
        isSignedIn={isSignedIn}
        currentUserId={currentUserId}
        currentDisplayName={displayName}
        currentPhotoUrl={photoUrl}
        currentTargetExam={targetExam}
        localDailyProgress={localDailyProgress}
        onNavigateTab={onNavigateTab}
        onSignIn={onSignIn}
      />

      {/* Dedicated Wrong Answer Bank Card */}
      <GlassTiltCard className="rounded-2xl" maxTiltDeg={1.4}>
        <section
          aria-label="ভুল উত্তরের ভান্ডার কার্ড"
          className="glass-rose-card rounded-2xl p-6 space-y-5 relative z-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4" />
                টার্গেটেড রিভিশন কর্নার · Wrong Answer Bank
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                ভুল উত্তরের ভান্ডার
              </h2>
              <p className="text-xs sm:text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                প্র্যাকটিস, প্রশ্ন ব্যাংক ও মডেল টেস্টে যে প্রশ্নগুলো ভুল হয়েছে সেগুলো এখানে জমা থাকে —
                পরবর্তীতে আলাদাভাবে রিভিশন দিয়ে ভুলগুলো শূন্যে নামিয়ে আনুন।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-4 py-2 bio-subpanel rounded-xl text-center">
                <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">সংরক্ষিত ভুল প্রশ্ন</div>
                <div className="text-lg font-bold font-mono-tabular text-rose-700 dark:text-rose-300">
                  {toBnDigits(wrongBankSummary.totalUnique)}টি
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('wrong_bank')}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold glass-btn-primary rounded-xl whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />
                {wrongBankSummary.totalUnique > 0
                  ? `ভুল প্রশ্ন রিভিশন দিন (${toBnDigits(wrongBankSummary.totalUnique)}টি)`
                  : 'ভুল উত্তরের ভান্ডার খুলুন'}
              </button>
            </div>
          </div>

          {wrongBankSummary.totalUnique > 0 ? (
            <div className="space-y-3">
              {wrongBankSummary.topSubjects.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#554578] dark:text-[#B6ABD6]">
                  <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">বিষয়ভিত্তিক ভুল:</span>
                  {wrongBankSummary.topSubjects.map((s) => (
                    <span
                      key={s.subjectName}
                      className="px-2.5 py-1 rounded-lg bio-subpanel text-[#1D1336] dark:text-[#F4F0FF] font-medium"
                    >
                      {s.subjectName}: <strong className="text-rose-700 dark:text-rose-300 font-mono-tabular">{toBnDigits(s.count)}টি</strong>
                    </span>
                  ))}
                  <span className="text-[11px] text-[#6B5B8E] dark:text-[#A598C9] font-mono-tabular ml-auto">
                    মোট ভুলের পুনরাবৃত্তি: {toBnDigits(wrongBankSummary.totalMistakes)} বার
                  </span>
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-3">
                {wrongBankSummary.recentItems.map(({ record, question, chapterName, subjectName }) => (
                  <div
                    key={record.questionId}
                    className="p-3.5 bio-subpanel glass-card-3d rounded-xl space-y-2 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-[11px]">
                        <span className="font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] truncate">
                          {subjectName} · {chapterName}
                        </span>
                        <span className="shrink-0 text-rose-700 dark:text-rose-300 font-semibold font-mono-tabular">
                          {toBnDigits(record.wrongCount)} বার ভুল
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] line-clamp-2 leading-relaxed">
                        {question.question}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateTab('wrong_bank')}
                      className="text-left text-[11px] font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] hover:text-[#5A39B8] dark:hover:text-[#DDD6FE] inline-flex items-center gap-1 pt-1"
                    >
                      রিভিশন ও ব্যাখ্যা দেখুন
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 bio-subpanel rounded-xl flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                এখনো কোনো ভুল প্রশ্ন জমা হয়নি। প্র্যাকটিস, প্রশ্ন ব্যাংক বা মডেল টেস্টে ভুল করলে সেগুলো স্বয়ংক্রিয়ভাবে এই ভান্ডারে সংরক্ষিত হবে।
              </p>
              <button
                type="button"
                onClick={() => onNavigateTab('practice')}
                className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] hover:underline shrink-0"
              >
                প্র্যাকটিস শুরু করুন →
              </button>
            </div>
          )}
        </section>
      </GlassTiltCard>

      {/* Quiz Accuracy Improvement Trend Over Time (Recharts) */}
      <section className="bio-card rounded-2xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <LineChartIcon className="w-5 h-5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              <h2 className="text-lg font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                সময়ের সাথে কুইজ নির্ভুলতার অগ্রগতি (Accuracy Trend)
              </h2>
            </div>
            <p className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] mt-1">
              প্রতিটি সম্পন্ন মক ও মডেল টেস্টে আপনার সঠিক উত্তরের হার (%) এবং নেগেটিভ মার্কসহ নিট স্কোরের ধারাবাহিক পরিবর্তন
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {accuracyTrend.latestAccuracy !== null && (
              <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#5A4B7A] dark:text-[#B6ABD6] pr-1">
                <span>
                  সর্বশেষ:{' '}
                  <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{accuracyTrend.latestAccuracy}%</strong>
                </span>
                {accuracyTrend.bestAccuracy !== null && (
                  <span>
                    সর্বোচ্চ:{' '}
                    <strong className="text-[#6D4ACF] dark:text-[#C4B5FD]">{accuracyTrend.bestAccuracy}%</strong>
                  </span>
                )}
                {accuracyTrend.delta !== null && (
                  <span
                    className={`inline-flex items-center gap-1 font-semibold ${
                      accuracyTrend.delta >= 0
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-rose-700 dark:text-rose-300'
                    }`}
                  >
                    {accuracyTrend.delta >= 0 ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {accuracyTrend.delta >= 0 ? `+${accuracyTrend.delta}%` : `${accuracyTrend.delta}%`}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center gap-1 p-1 glass-segment-track rounded-xl">
              {[
                { id: 'all' as const, label: 'সকল পরীক্ষা' },
                { id: 'mock' as const, label: 'মক টেস্ট' },
                { id: 'model' as const, label: 'মডেল টেস্ট' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTrendScope(tab.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    trendScope === tab.id
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {accuracyTrend.points.length === 0 ? (
          <div className="py-10 px-4 text-center bio-subpanel rounded-2xl space-y-3">
            <TrendingUp className="w-8 h-8 text-[#6D4ACF] dark:text-[#C4B5FD] mx-auto" />
            <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
              {testAttempts.length === 0
                ? 'অগ্রগতি গ্রাফ দেখতে প্রথম পরীক্ষাটি সম্পন্ন করুন'
                : 'এই ক্যাটাগরিতে এখনো কোনো সম্পন্ন পরীক্ষা নেই'}
            </div>
            <p className="text-xs text-[#554578] dark:text-[#B6ABD6] max-w-md mx-auto">
              মক টেস্ট বা ১০০ নম্বরের মেডিকেল মডেল টেস্ট সাবমিট করলেই প্রতিটি পরীক্ষার নির্ভুলতা ও উন্নতির ধারা এখানে গ্রাফে যুক্ত হবে।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigateTab('mock')}
                className="px-4 py-2 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
              >
                মক টেস্ট দিন
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('medical_model')}
                className="px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
              >
                মেডিকেল মডেল টেস্ট
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-full h-72 bio-subpanel rounded-2xl pt-4 pr-4 pb-2 pl-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={accuracyTrend.points}
                  margin={{ top: 10, right: 16, left: 0, bottom: 4 }}
                >
                  <defs>
                    <linearGradient id="bioAccuracyFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isDark ? '#A78BFA' : '#6D4ACF'} stopOpacity={0.32} />
                      <stop offset="95%" stopColor={isDark ? '#A78BFA' : '#6D4ACF'} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={isDark ? '#2E2452' : '#E5DCF5'} strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: isDark ? '#B6ABD6' : '#5A4B7A', fontSize: 11 }}
                    axisLine={{ stroke: isDark ? '#3A2E66' : '#DBD0F0' }}
                    tickLine={false}
                    minTickGap={18}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: isDark ? '#B6ABD6' : '#5A4B7A', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    width={46}
                  />
                  <ReferenceLine
                    y={75}
                    stroke={isDark ? '#F59E0B' : '#D97706'}
                    strokeDasharray="4 4"
                    label={{
                      value: 'মেডিকেল স্ট্যান্ডার্ড ৭৫%',
                      position: 'insideTopRight',
                      fill: isDark ? '#FCD34D' : '#B45309',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                  <Tooltip
                    cursor={{ stroke: isDark ? '#A78BFA' : '#6D4ACF', strokeWidth: 1, strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (!active || !payload || payload.length === 0) return null;
                      const pt = payload[0].payload as AccuracyTrendPoint;
                      return (
                        <div className="bg-white/85 dark:bg-[#19122F]/95 backdrop-blur-xl border border-white/95 dark:border-violet-400/25 rounded-2xl p-3.5 shadow-[0_18px_36px_-12px_rgba(29,19,54,0.28)] dark:shadow-[0_18px_36px_-12px_rgba(0,0,0,0.7)] text-xs space-y-1.5 max-w-xs">
                          <div className="font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-snug">
                            {pt.testTitle}
                          </div>
                          <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">
                            {pt.testTypeLabel} · {pt.fullDate}
                          </div>
                          <div className="pt-1 border-t border-[#EBE3F8] dark:border-white/10 space-y-1 font-mono-tabular">
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[#5A4B7A] dark:text-[#B6ABD6]">নির্ভুলতা (Accuracy):</span>
                              <span className="font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">{pt.accuracy}%</span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[#5A4B7A] dark:text-[#B6ABD6]">নিট স্কোর (%):</span>
                              <span className="font-semibold text-[#4338CA] dark:text-[#A5B4FC]">
                                {pt.netScorePct}% ({pt.netScore.toFixed(2)}/{pt.maxScore})
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[#5A4B7A] dark:text-[#B6ABD6]">সঠিক / উত্তরিত:</span>
                              <span className="text-[#1D1336] dark:text-[#F4F0FF]">
                                {pt.correctCount}/{pt.answeredCount > 0 ? pt.answeredCount : pt.totalQuestions}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    name="নির্ভুলতা (%)"
                    stroke={isDark ? '#A78BFA' : '#6D4ACF'}
                    strokeWidth={2.5}
                    fill="url(#bioAccuracyFill)"
                    dot={{ r: 4, fill: isDark ? '#1A1332' : '#FFFFFF', stroke: isDark ? '#A78BFA' : '#6D4ACF', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: isDark ? '#A78BFA' : '#6D4ACF', stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="netScorePct"
                    name="নিট স্কোর (%)"
                    stroke={isDark ? '#818CF8' : '#4338CA'}
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    dot={{ r: 3, fill: isDark ? '#818CF8' : '#4338CA' }}
                    activeDot={{ r: 5, fill: isDark ? '#818CF8' : '#4338CA', stroke: '#FFFFFF', strokeWidth: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">
              <div className="flex flex-wrap items-center gap-5">
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-0.5 bg-[#6D4ACF] dark:bg-[#A78BFA] inline-block" />
                  নির্ভুলতা (সঠিক / উত্তরিত প্রশ্ন %)
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#4338CA] dark:border-[#818CF8] inline-block" />
                  নিট স্কোর (-০.২৫ নেগেটিভ মার্কসহ %)
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-3.5 h-0.5 border-t-2 border-dashed border-[#D97706] dark:border-[#F59E0B] inline-block" />
                  ৭৫% মেডিকেল লক্ষ্যমাত্রা
                </span>
              </div>
              {accuracyTrend.points.length === 1 && (
                <span className="text-[#6D4ACF] dark:text-[#C4B5FD] font-medium">
                  আরও ১টি পরীক্ষা সম্পন্ন করলে উন্নতির তুলনামূলক রেখা তৈরি হবে
                </span>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Subject Proficiency Overview */}
      <section className="bio-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-[#1D1336] dark:text-[#F4F0FF]">বিষয়ভিত্তিক দক্ষতা ও প্রস্তুতি</h2>
            <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
              মেডিকেল অ্যাডমিশন মানবণ্টন অনুযায়ী প্রতিটি বিষয়ে আপনার বর্তমান অবস্থান
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('mock')}
            className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] hover:text-[#5A39B8] dark:hover:text-[#DDD6FE] underline underline-offset-4"
          >
            বিষয়ভিত্তিক মক টেস্ট দিন
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {subjectSummary.map(({ subject, attempted, correct, accuracy }) => (
            <div
              key={subject.id}
              className="p-4 bio-subpanel glass-card-3d rounded-xl space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">{subject.nameBn}</h3>
                  <div className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                    {subject.paperLabelBn} · মেডিকেল নম্বর {subject.medicalMarks}
                  </div>
                </div>
                <span className="text-sm font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD]">
                  {attempted > 0 ? `${accuracy}%` : '—'}
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#E3D9F4]/80 dark:bg-white/10 rounded-full overflow-hidden shadow-[inset_0_1px_2px_rgba(29,19,54,0.12)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.45)]">
                <div
                  className={`h-full rounded-full transition-all ${
                    accuracy >= 75
                      ? 'bg-gradient-to-r from-[#6D4ACF] to-[#8B5CF6]'
                      : accuracy >= 50
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                        : attempted > 0
                          ? 'bg-gradient-to-r from-rose-600 to-rose-400'
                          : 'bg-violet-200 dark:bg-white/15'
                  }`}
                  style={{ width: `${attempted > 0 ? accuracy : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6] font-mono-tabular">
                <span>অনুশীলন: {attempted}টি</span>
                <span>সঠিক: {correct}টি</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapter-Level Strengths & Weaknesses Diagnostic Table */}
      <section className="bio-card rounded-2xl p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
              অধ্যায়ভিত্তিক সবলতা ও দুর্বলতা ডায়াগনস্টিক ম্যাট্রিক্স
            </h2>
            <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
              দুর্বল অধ্যায়গুলোতে সরাসরি ইনফোগ্রাফ-ভিডিও দেখে বা টার্গেটেড প্র্যাকটিস করে দক্ষতা বাড়ান
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-1.5 text-xs font-medium rounded-xl glass-input text-[#1D1336] dark:text-[#F4F0FF]"
              aria-label="বিষয় ফিল্টার"
            >
              <option value="all">সকল বিষয়</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameBn}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 p-1 glass-segment-track rounded-xl">
              {[
                { id: 'all' as const, label: 'সব' },
                { id: 'weak' as const, label: 'দুর্বল' },
                { id: 'moderate' as const, label: 'মাঝারি' },
                { id: 'strong' as const, label: 'সবল' },
                { id: 'unstarted' as const, label: 'শুরু হয়নি' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setMasteryFilter(tab.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    masteryFilter === tab.id
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DBD0F0] dark:border-white/15 text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6]">
                <th className="py-3 pr-4">অধ্যায় ও বিষয়</th>
                <th className="py-3 px-3">দক্ষতার অবস্থা</th>
                <th className="py-3 px-3 text-right">অনুশীলন</th>
                <th className="py-3 px-3 text-right">নির্ভুলতা</th>
                <th className="py-3 pl-4 text-right">প্রস্তুতি পদক্ষেপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE3F8] dark:divide-white/10 text-sm">
              {filteredChapters.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-[#5A4B7A] dark:text-[#B6ABD6]">
                    এই ফিল্টারে এখনো কোনো অধ্যায় নেই।
                  </td>
                </tr>
              ) : (
                filteredChapters.map((row) => (
                  <tr key={row.chapter.id} className="hover:bg-white/55 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">{row.chapter.nameBn}</div>
                      <div className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-0.5">
                        {row.subject?.nameBn} · {row.chapter.chapterNumberBn} · {row.questionCount}টি প্রশ্ন
                      </div>
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      {row.status === 'strong' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 className="w-4 h-4" />
                          সবল (প্রস্তুত)
                        </span>
                      )}
                      {row.status === 'moderate' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                          <TrendingUp className="w-4 h-4" />
                          মাঝারি (আরও অনুশীলন)
                        </span>
                      )}
                      {row.status === 'weak' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300">
                          <AlertCircle className="w-4 h-4" />
                          দুর্বল (মনোযোগ প্রয়োজন)
                        </span>
                      )}
                      {row.status === 'unstarted' && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6B5B8E] dark:text-[#A598C9]">
                          শুরু হয়নি
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                      {row.attempted > 0 ? `${row.correct}/${row.attempted}` : '০'}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono-tabular font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                      {row.attempted > 0 ? `${row.accuracy}%` : '—'}
                    </td>
                    <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onOpenVisualLesson(row.chapter.visualLessonId)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-lg"
                        >
                          <PlayCircle className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                          ইনফোগ্রাফ ও ভিডিও
                        </button>
                        <button
                          type="button"
                          onClick={() => onPracticeChapter(row.chapter)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold glass-btn-primary rounded-lg"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          প্র্যাকটিস
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Mock & Model Test History */}
      <section className="bio-card rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
              সম্পন্ন মক টেস্ট ও মেডিকেল মডেল টেস্টের ইতিহাস
            </h2>
            <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
              মেডিকেল অ্যাডমিশন নিয়ম অনুযায়ী প্রতিটি ভুল উত্তরে ০.২৫ নম্বর কাটা সহ নিট স্কোর
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab('mock')}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
            >
              নতুন মক টেস্ট
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('medical_model')}
              className="px-3.5 py-1.5 text-xs font-semibold glass-btn-primary rounded-xl"
            >
              মডেল টেস্ট দিন
            </button>
          </div>
        </div>

        {testAttempts.length === 0 ? (
          <div className="py-10 px-4 text-center bio-subpanel rounded-2xl space-y-3">
            <ClipboardCheck className="w-8 h-8 text-[#6D4ACF] dark:text-[#C4B5FD] mx-auto" />
            <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
              এখনো কোনো মক টেস্ট বা মডেল টেস্ট সম্পন্ন হয়নি
            </div>
            <p className="text-xs text-[#554578] dark:text-[#B6ABD6] max-w-md mx-auto">
              একটি ২৫ প্রশ্নের বিষয়ভিত্তিক মক টেস্ট অথবা ১০০ নম্বরের পূর্ণাঙ্গ মেডিকেল মডেল টেস্ট দিয়ে আপনার প্রস্তুতির বেসলাইন তৈরি করুন।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigateTab('mock')}
                className="px-4 py-2 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-xl"
              >
                ডায়াগনস্টিক মক টেস্ট দিন
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('medical_model')}
                className="px-4 py-2 text-xs font-semibold glass-btn-primary rounded-xl"
              >
                মেডিকেল মডেল টেস্ট শুরু করুন
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#DBD0F0] dark:border-white/15 text-xs font-semibold text-[#554578] dark:text-[#B6ABD6]">
                  <th className="py-3 pr-4">পরীক্ষার নাম</th>
                  <th className="py-3 px-3">সঠিক / ভুল</th>
                  <th className="py-3 px-3 text-right">নেগেটিভ (-০.২৫)</th>
                  <th className="py-3 px-3 text-right">নিট স্কোর</th>
                  <th className="py-3 px-3">দুর্বল অধ্যায়</th>
                  <th className="py-3 pl-3 text-right">মুছুন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE3F8] dark:divide-white/10 text-sm">
                {testAttempts.map((att) => {
                  const pct = Math.round((att.netScore / att.maxScore) * 100);
                  return (
                    <tr key={att.id} className="hover:bg-white/55 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="font-semibold text-[#1D1336] dark:text-[#F4F0FF] flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0" />
                          <span>{att.testTitle}</span>
                        </div>
                        <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] mt-0.5 font-mono-tabular">
                          {new Date(att.createdAtMs).toLocaleDateString('bn-BD')} · সময়:{' '}
                          {Math.max(1, Math.round(att.durationSec / 60))} মিনিট
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono-tabular text-xs">
                        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">{att.correctCount} সঠিক</span>
                        <span className="text-[#9B8CC0] dark:text-[#7E70A8] mx-1">·</span>
                        <span className="text-rose-700 dark:text-rose-300 font-semibold">{att.wrongCount} ভুল</span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono-tabular text-rose-700 dark:text-rose-300">
                        -{att.negativeMarks.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono-tabular font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                        {att.netScore.toFixed(2)} / {att.maxScore} ({pct}%)
                      </td>
                      <td className="py-3.5 px-3 text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">
                        {att.weakTopics.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {att.weakTopics.slice(0, 2).map((chId) => {
                              const ch = getChapterById(chId);
                              if (!ch) return null;
                              return (
                                <button
                                  key={chId}
                                  type="button"
                                  onClick={() => onOpenVisualLesson(ch.visualLessonId)}
                                  className="text-[#6D4ACF] dark:text-[#C4B5FD] hover:underline font-medium"
                                >
                                  {ch.nameBn}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <span className="text-emerald-700 dark:text-emerald-300 font-medium">সব টপিক শক্তিশালী</span>
                        )}
                      </td>
                      <td className="py-3.5 pl-3 text-right">
                        <button
                          type="button"
                          onClick={() => onDeleteAttempt(att.id)}
                          className="p-1.5 text-[#8776AE] dark:text-[#A094C4] hover:text-rose-700 dark:hover:text-rose-400 rounded-md transition-colors"
                          aria-label="ইতিহাস মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};
