import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  PlayCircle,
  RotateCcw,
  Stethoscope,
  XCircle,
} from 'lucide-react';
import { DigitalTimer, formatDigitalClock } from './DigitalTimer';
import { GlassTiltCard } from './GlassTiltCard';
import { SUBJECTS, getChapterById } from '../data/curriculum';
import {
  QUESTION_BANK,
  buildMedicalModelQuestions,
  buildSprintModelQuestions,
  shuffleArray,
} from '../data/questions';
import {
  ChapterInfo,
  McqQuestion,
  MedicalSubjectGroup,
  SubjectId,
  TestAttemptRecord,
  TestType,
} from '../types/learning';

interface ExamSimulatorViewProps {
  mode: 'mock' | 'medical_model';
  autoStartPastYearKey?: number;
  extraQuestions?: McqQuestion[];
  onSaveAttempt: (
    attempt: Omit<TestAttemptRecord, 'userId' | 'createdAtMs'>,
    perQuestionResults: {
      question: McqQuestion;
      isCorrect: boolean;
      selectedOptionIndex?: number;
    }[]
  ) => Promise<void>;
  onOpenVisualLesson: (visualLessonId: string) => void;
  onPracticeChapter: (chapter: ChapterInfo) => void;
}

interface ActiveExamSession {
  testId: string;
  testTitle: string;
  testType: TestType;
  subjectId: string;
  questions: McqQuestion[];
  durationSec: number;
  negativeMarkPerWrong: number;
}

const OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ'] as const;

const GROUP_NAMES: Record<MedicalSubjectGroup, string> = {
  bio: 'জীববিজ্ঞান (৩০)',
  chem: 'রসায়ন (২৫)',
  phys: 'পদার্থবিজ্ঞান (২০)',
  eng: 'ইংরেজি (১৫)',
  gk: 'সাধারণ জ্ঞান (১০)',
};

export const ExamSimulatorView: React.FC<ExamSimulatorViewProps> = ({
  mode,
  autoStartPastYearKey = 0,
  extraQuestions = [],
  onSaveAttempt,
  onOpenVisualLesson,
  onPracticeChapter,
}) => {
  const allQuestions = useMemo(
    () => (extraQuestions.length > 0 ? [...extraQuestions, ...QUESTION_BANK] : QUESTION_BANK),
    [extraQuestions]
  );
  // Lobby Configs for Mock Test
  const [mockSubject, setMockSubject] = useState<SubjectId | 'all'>('bio_2');
  const [mockCount, setMockCount] = useState<10 | 15 | 25 | 35>(25);
  const [mockNegMarking, setMockNegMarking] = useState<boolean>(true);
  const [mockSource, setMockSource] = useState<'all' | 'past_year'>('all');

  // Active Exam State
  const [session, setSession] = useState<ActiveExamSession | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [questionElapsedSec, setQuestionElapsedSec] = useState(0);
  const [timerPaused, setTimerPaused] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  const answersRef = useRef<Record<string, number>>({});
  answersRef.current = answers;
  const sessionRef = useRef<ActiveExamSession | null>(null);
  sessionRef.current = session;

  // Post-Exam Result State
  const [submittedResult, setSubmittedResult] = useState<{
    attempt: Omit<TestAttemptRecord, 'userId' | 'createdAtMs'>;
    questions: McqQuestion[];
    answers: Record<string, number>;
    groupBreakdown: {
      group: MedicalSubjectGroup;
      label: string;
      total: number;
      correct: number;
      wrong: number;
      skipped: number;
    }[];
  } | null>(null);

  useEffect(() => {
    if (autoStartPastYearKey > 0 && mode === 'medical_model') {
      const qs = buildMedicalModelQuestions({
        onlyPastYear: true,
        randomize: true,
        extraQuestions,
      });
      startExam({
        testId: 'past_year_special_100',
        testTitle: 'বিগত বছরের (MBBS ও BDS) প্রশ্ন স্পেশাল মডেল টেস্ট (১০০ নম্বর)',
        testType: 'medical_model',
        subjectId: 'all',
        questions: qs,
        durationSec: 60 * 60,
        negativeMarkPerWrong: 0.25,
      });
      return;
    }
    setSession(null);
    setSubmittedResult(null);
    setConfirmSubmitOpen(false);
  }, [mode, autoStartPastYearKey]);

  const finishAndGradeExam = async (
    activeSession: ActiveExamSession,
    currentAnswers: Record<string, number>,
    remainingSec: number
  ) => {
    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;
    const chapterMistakes: Record<string, number> = {};
    const perQuestionResults: {
      question: McqQuestion;
      isCorrect: boolean;
      selectedOptionIndex?: number;
    }[] = [];

    const groups: Record<
      MedicalSubjectGroup,
      { total: number; correct: number; wrong: number; skipped: number }
    > = {
      bio: { total: 0, correct: 0, wrong: 0, skipped: 0 },
      chem: { total: 0, correct: 0, wrong: 0, skipped: 0 },
      phys: { total: 0, correct: 0, wrong: 0, skipped: 0 },
      eng: { total: 0, correct: 0, wrong: 0, skipped: 0 },
      gk: { total: 0, correct: 0, wrong: 0, skipped: 0 },
    };

    activeSession.questions.forEach((q) => {
      groups[q.medicalGroup].total += 1;
      const picked = currentAnswers[q.id];
      if (picked === undefined) {
        skippedCount += 1;
        groups[q.medicalGroup].skipped += 1;
      } else if (picked === q.correctIndex) {
        correctCount += 1;
        groups[q.medicalGroup].correct += 1;
        perQuestionResults.push({ question: q, isCorrect: true, selectedOptionIndex: picked });
      } else {
        wrongCount += 1;
        groups[q.medicalGroup].wrong += 1;
        chapterMistakes[q.chapterId] = (chapterMistakes[q.chapterId] || 0) + 1;
        perQuestionResults.push({ question: q, isCorrect: false, selectedOptionIndex: picked });
      }
    });

    const answeredCount = correctCount + wrongCount;
    const negativeMarks = Number((wrongCount * activeSession.negativeMarkPerWrong).toFixed(2));
    const netScore = Number((correctCount - negativeMarks).toFixed(2));
    const usedSec = Math.max(10, activeSession.durationSec - remainingSec);
    const weakTopics = Object.entries(chapterMistakes)
      .sort((a, b) => b[1] - a[1])
      .map(([chId]) => chId)
      .slice(0, 8);

    const attemptPayload: Omit<TestAttemptRecord, 'userId' | 'createdAtMs'> = {
      id: `att_${Date.now()}`,
      testId: activeSession.testId,
      testTitle: activeSession.testTitle,
      testType: activeSession.testType,
      subjectId: activeSession.subjectId,
      totalQuestions: activeSession.questions.length,
      answeredCount,
      correctCount,
      wrongCount,
      skippedCount,
      negativeMarks,
      netScore,
      maxScore: activeSession.questions.length,
      durationSec: usedSec,
      weakTopics,
    };

    const groupBreakdown = (Object.keys(groups) as MedicalSubjectGroup[])
      .filter((g) => groups[g].total > 0)
      .map((g) => ({
        group: g,
        label: GROUP_NAMES[g],
        ...groups[g],
      }));

    setSession(null);
    setConfirmSubmitOpen(false);
    setSubmittedResult({
      attempt: attemptPayload,
      questions: activeSession.questions,
      answers: currentAnswers,
      groupBreakdown,
    });

    await onSaveAttempt(attemptPayload, perQuestionResults);
  };

  // Reset per-question timer when moving between questions
  useEffect(() => {
    setQuestionElapsedSec(0);
  }, [currentIdx, session?.testId]);

  // Drift-free 1-second digital countdown clock
  useEffect(() => {
    if (!session || timerPaused) return;
    const timer = window.setInterval(() => {
      setQuestionElapsedSec((qSec) => qSec + 1);
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          if (sessionRef.current) {
            void finishAndGradeExam(sessionRef.current, answersRef.current, 0);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session, timerPaused]);

  const startExam = (config: ActiveExamSession) => {
    setSession(config);
    setCurrentIdx(0);
    setAnswers({});
    setFlagged({});
    setSecondsLeft(config.durationSec);
    setQuestionElapsedSec(0);
    setTimerPaused(false);
    setSubmittedResult(null);
    setConfirmSubmitOpen(false);
  };

  const handleStartMockTest = () => {
    const filteredPool = allQuestions.filter((q) => {
      if (mockSubject !== 'all' && q.subjectId !== mockSubject) return false;
      if (mockSource === 'past_year' && !q.pastExam) return false;
      return true;
    });

    const pool = shuffleArray(filteredPool);
    const selected = pool.slice(0, Math.min(mockCount, pool.length));
    const subName =
      mockSubject === 'all'
        ? 'সমন্বিত বিজ্ঞান'
        : SUBJECTS.find((s) => s.id === mockSubject)?.nameBn || 'বিষয়ভিত্তিক';

    startExam({
      testId: `mock_${mockSubject}_${selected.length}`,
      testTitle: `${subName} র‍্যান্ডম মক টেস্ট (${selected.length} প্রশ্ন)`,
      testType: 'mock_test',
      subjectId: mockSubject,
      questions: selected,
      durationSec: selected.length * 45,
      negativeMarkPerWrong: mockNegMarking ? 0.25 : 0,
    });
  };

  const handleStartMedicalModel = (
    variant: 'mbbs_full_1' | 'mbbs_past_year' | 'bds_full' | 'sprint'
  ) => {
    if (variant === 'sprint') {
      const qs = buildSprintModelQuestions(extraQuestions);
      startExam({
        testId: 'med_sprint_50',
        testTitle: 'মেডিকেল র‍্যাপিড স্প্রিন্ট র‍্যান্ডম টেস্ট (৫০ প্রশ্ন)',
        testType: 'medical_model',
        subjectId: 'all',
        questions: qs,
        durationSec: 30 * 60,
        negativeMarkPerWrong: 0.25,
      });
      return;
    }

    const qs = buildMedicalModelQuestions({
      onlyPastYear: variant === 'mbbs_past_year',
      randomize: true,
      extraQuestions,
    });
    const title =
      variant === 'mbbs_full_1'
        ? 'মেডিকেল (MBBS) পূর্ণাঙ্গ র‍্যান্ডম মডেল টেস্ট (১০০ নম্বর)'
        : variant === 'mbbs_past_year'
          ? 'বিগত বছরের (MBBS ও BDS) প্রশ্ন স্পেশাল মডেল টেস্ট (১০০ নম্বর)'
          : 'ডেন্টাল (BDS) অ্যাডমিশন পূর্ণাঙ্গ র‍্যান্ডম মডেল টেস্ট (১০০ নম্বর)';

    startExam({
      testId: variant,
      testTitle: title,
      testType: variant === 'bds_full' ? 'dental_model' : 'medical_model',
      subjectId: 'all',
      questions: qs,
      durationSec: 60 * 60,
      negativeMarkPerWrong: 0.25,
    });
  };

  // ==========================================================
  // VIEW 1: POST-EXAM SCORECARD & SCRIPT REVIEW
  // ==========================================================
  if (submittedResult) {
    const { attempt, questions, answers: finalAnswers, groupBreakdown } = submittedResult;
    const percentage = Math.round((attempt.netScore / attempt.maxScore) * 100);
    const meritTier =
      percentage >= 80
        ? 'ঢাকা মেডিকেল / শীর্ষ সরকারি মেডিকেল প্রতিযোগিতামূলক স্কোর'
        : percentage >= 68
          ? 'সরকারি মেডিকেল / ডেন্টাল মেরিট সম্ভাবনা শক্তিশালী'
          : percentage >= 50
            ? 'মাঝারি প্রস্তুতি — দুর্বল অধ্যায়গুলোতে ফোকাস বাড়াতে হবে'
            : 'প্রাথমিক স্তর — ইনফোগ্রাফ ও ভিডিও দেখে অধ্যায়ভিত্তিক প্র্যাকটিস জরুরি';

    return (
      <div className="space-y-6">
        {/* Scorecard Summary */}
        <section className="bio-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">পরীক্ষার ফলাফল ও বিশ্লেষণ</div>
              <h1 className="text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF] mt-1">{attempt.testTitle}</h1>
              <p className="text-sm text-[#5A4B7A] dark:text-[#B6ABD6] mt-1">{meritTier}</p>
            </div>
            <button
              type="button"
              onClick={() => setSubmittedResult(null)}
              className="glass-btn-primary inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl"
            >
              <RotateCcw className="w-4 h-4" />
              আরেকটি পরীক্ষা দিন
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            <div className="p-4 bg-gradient-to-br from-[#F3EEFF]/90 to-[#E3D7FE]/75 dark:from-[#2C1F54]/90 dark:to-[#1F1540]/90 backdrop-blur-md border border-white/90 dark:border-violet-400/35 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.98),0_10px_22px_-10px_rgba(109,74,207,0.28)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_22px_-10px_rgba(0,0,0,0.65)] glass-card-3d rounded-xl">
              <div className="text-xs font-medium text-[#6D4ACF] dark:text-[#C4B5FD]">নিট স্কোর</div>
              <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] mt-1">
                {attempt.netScore.toFixed(2)} / {attempt.maxScore}
              </div>
            </div>
            <div className="p-4 bio-subpanel glass-card-3d rounded-xl">
              <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">সঠিক উত্তর</div>
              <div className="text-2xl font-bold font-mono-tabular text-emerald-700 dark:text-emerald-300 mt-1">
                {attempt.correctCount}
              </div>
            </div>
            <div className="p-4 bio-subpanel glass-card-3d rounded-xl">
              <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">ভুল উত্তর</div>
              <div className="text-2xl font-bold font-mono-tabular text-rose-700 dark:text-rose-300 mt-1">
                {attempt.wrongCount}
              </div>
            </div>
            <div className="p-4 bio-subpanel glass-card-3d rounded-xl">
              <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">নেগেটিভ মার্কস</div>
              <div className="text-2xl font-bold font-mono-tabular text-rose-700 dark:text-rose-300 mt-1">
                -{attempt.negativeMarks.toFixed(2)}
              </div>
            </div>
            <div className="p-4 bio-subpanel glass-card-3d rounded-xl">
              <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">ব্যয়িত সময়</div>
              <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] mt-1">
                {formatDigitalClock(attempt.durationSec)}
              </div>
            </div>
          </div>

          {groupBreakdown.length > 1 && (
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#DBD0F0]/70 dark:border-white/15 text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">
                    <th className="py-2.5 pr-4">বিষয় গ্রুপ</th>
                    <th className="py-2.5 px-3 text-right">মোট প্রশ্ন</th>
                    <th className="py-2.5 px-3 text-right">সঠিক</th>
                    <th className="py-2.5 px-3 text-right">ভুল</th>
                    <th className="py-2.5 pl-3 text-right">নির্ভুলতা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE3F8]/60 dark:divide-white/10 font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                  {groupBreakdown.map((g) => {
                    const acc = g.total > 0 ? Math.round((g.correct / g.total) * 100) : 0;
                    return (
                      <tr key={g.group} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                        <td className="py-2.5 pr-4 font-sans font-medium text-[#1D1336] dark:text-[#F4F0FF]">{g.label}</td>
                        <td className="py-2.5 px-3 text-right">{g.total}</td>
                        <td className="py-2.5 px-3 text-right text-emerald-700 dark:text-emerald-300 font-semibold">{g.correct}</td>
                        <td className="py-2.5 px-3 text-right text-rose-700 dark:text-rose-300 font-semibold">{g.wrong}</td>
                        <td className="py-2.5 pl-3 text-right font-bold">{acc}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {attempt.weakTopics.length > 0 && (
            <div className="p-4 bg-amber-50/65 dark:bg-amber-950/45 backdrop-blur-md border border-amber-300/70 dark:border-amber-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_8px_20px_-8px_rgba(217,119,6,0.16)] dark:shadow-none rounded-xl space-y-3">
              <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                এই পরীক্ষায় চিহ্নিত দুর্বল অধ্যায়সমূহ (তাৎক্ষণিক সংশোধন)
              </div>
              <div className="flex flex-wrap gap-2">
                {attempt.weakTopics.map((chId) => {
                  const ch = getChapterById(chId);
                  if (!ch) return null;
                  return (
                    <div
                      key={chId}
                      className="flex items-center gap-2 bg-white/75 dark:bg-[#1E1639]/85 backdrop-blur-sm border border-amber-200/80 dark:border-amber-400/30 shadow-sm rounded-lg px-3 py-2 text-xs"
                    >
                      <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">{ch.nameBn}</span>
                      <button
                        type="button"
                        onClick={() => onOpenVisualLesson(ch.visualLessonId)}
                        className="text-[#6D4ACF] dark:text-[#C4B5FD] font-semibold hover:underline"
                      >
                        ভিডিও
                      </button>
                      <span aria-hidden="true" className="text-[#5A4B7A] dark:text-[#B6ABD6]">·</span>
                      <button
                        type="button"
                        onClick={() => onPracticeChapter(ch)}
                        className="text-[#5A4B7A] dark:text-[#B6ABD6] font-medium hover:underline"
                      >
                        প্র্যাকটিস
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* Complete Question-by-Question Review */}
        <section className="bio-card rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
            উত্তরপত্র পর্যালোচনা ও ব্যাখ্যা ({questions.length}টি প্রশ্ন)
          </h2>

          <div className="divide-y divide-[#DDD1F4]/60 dark:divide-white/10">
            {questions.map((q, idx) => {
              const userPick = finalAnswers[q.id];
              const isCorrect = userPick === q.correctIndex;
              const isSkipped = userPick === undefined;
              return (
                <div key={q.id} className="py-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono-tabular font-semibold text-[#5A4B7A] dark:text-[#B6ABD6]">
                      প্রশ্ন #{idx + 1} · {getChapterById(q.chapterId)?.nameBn}
                      {q.pastExam ? ` · ${q.pastExam.exam} ${q.pastExam.session}` : ''}
                    </span>
                    {isSkipped ? (
                      <span className="text-xs font-semibold text-[#716194] dark:text-[#A598C9]">উত্তর দেওয়া হয়নি</span>
                    ) : isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4" />
                        সঠিক (+১)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
                        <XCircle className="w-4 h-4" />
                        ভুল ({attempt.negativeMarks > 0 ? '-০.২৫' : '০'})
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-[#1D1336] dark:text-[#F4F0FF]">{q.question}</p>

                  <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isRight = optIdx === q.correctIndex;
                      const isUserWrong = userPick === optIdx && !isRight;
                      return (
                        <div
                          key={opt}
                          className={`px-3.5 py-2.5 rounded-xl ${
                            isRight
                              ? 'glass-option-correct font-semibold'
                              : isUserWrong
                                ? 'glass-option-wrong'
                                : 'glass-option-muted'
                          }`}
                        >
                          {OPTION_LABELS[optIdx]}. {opt}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#1D1336] dark:text-[#F4F0FF] bio-subpanel rounded-xl p-3.5">
                    <span>{q.explanation}</span>
                    <button
                      type="button"
                      onClick={() => onOpenVisualLesson(q.visualLessonId)}
                      className="shrink-0 inline-flex items-center gap-1 text-[#6D4ACF] dark:text-[#C4B5FD] font-semibold hover:underline"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      ইনফোগ্রাফ ও ভিডিও
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  // ==========================================================
  // VIEW 2: ACTIVE TIMED EXAM INTERFACE
  // ==========================================================
  if (session) {
    const q = session.questions[currentIdx];
    const answeredTotal = Object.keys(answers).length;

    return (
      <div className="space-y-5">
        <div className="bio-card rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">চলমান পরীক্ষা</div>
            <h1 className="text-base sm:text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">{session.testTitle}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="text-xs font-mono-tabular text-[#5A4B7A] dark:text-[#B6ABD6]">
              উত্তর: <strong className="text-[#1D1336] dark:text-[#F4F0FF]">{answeredTotal}</strong> /{' '}
              {session.questions.length}
            </div>

            <DigitalTimer
              mode="countdown"
              seconds={secondsLeft}
              totalSeconds={session.durationSec}
              questionSeconds={questionElapsedSec}
              label={timerPaused ? 'ডিজিটাল টাইমার (বিরতি)' : 'অবশিষ্ট সময় · ডিজিটাল টাইমার'}
              isPaused={timerPaused}
              onTogglePause={() => setTimerPaused((p) => !p)}
              compact
            />

            <button
              type="button"
              onClick={() => setConfirmSubmitOpen(true)}
              className="glass-btn-primary px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap"
            >
              পরীক্ষা জমা দিন
            </button>
          </div>
        </div>

        {confirmSubmitOpen && (
          <div className="fixed inset-0 z-50 bg-[#1D1336]/45 dark:bg-black/65 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bio-card rounded-2xl max-w-md w-full p-6 space-y-4">
              <h3 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">পরীক্ষা চূড়ান্তভাবে জমা দেবেন?</h3>
              <p className="text-sm text-[#5A4B7A] dark:text-[#B6ABD6] leading-relaxed">
                আপনি মোট{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">{session.questions.length}</strong>টি প্রশ্নের মধ্যে{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">{answeredTotal}</strong>টি প্রশ্নের উত্তর দিয়েছেন
                এবং{' '}
                <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                  {session.questions.length - answeredTotal}
                </strong>
                টি বাকি রয়েছে।
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmSubmitOpen(false)}
                  className="glass-btn-secondary px-4 py-2 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] rounded-xl"
                >
                  ফিরে যান
                </button>
                <button
                  type="button"
                  onClick={() => void finishAndGradeExam(session, answers, secondsLeft)}
                  className="glass-btn-primary px-4 py-2 text-xs font-semibold rounded-xl"
                >
                  হ্যাঁ, ফলাফল দেখুন
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bio-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono-tabular font-semibold text-[#5A4B7A] dark:text-[#B6ABD6]">
                প্রশ্ন {currentIdx + 1} / {session.questions.length} ·{' '}
                {getChapterById(q.chapterId)?.nameBn}
                {q.pastExam ? ` · ${q.pastExam.exam} ${q.pastExam.session}` : ''}
              </span>
              <button
                type="button"
                onClick={() =>
                  setFlagged((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                  flagged[q.id]
                    ? 'bg-amber-100/85 dark:bg-amber-950/70 border border-amber-400 dark:border-amber-400/50 text-amber-900 dark:text-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_12px_-4px_rgba(217,119,6,0.3)]'
                    : 'glass-btn-secondary text-[#5A4B7A] dark:text-[#B6ABD6]'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                {flagged[q.id] ? 'রিভিউ মার্ক করা' : 'রিভিউ মার্ক'}
              </button>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
              {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[q.id] === optIdx;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                    }
                    className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 ${
                      isSelected
                        ? 'glass-option-selected text-[#1D1336] dark:text-[#F4F0FF] font-semibold'
                        : 'glass-option text-[#1D1336] dark:text-[#F4F0FF]'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#8362ED] to-[#5733BF] border-white/40 text-white shadow-[0_4px_10px_-2px_rgba(109,74,207,0.5)]'
                          : 'bg-white/75 dark:bg-white/10 border-white/90 dark:border-white/15 text-[#5A4B7A] dark:text-[#B6ABD6] shadow-sm'
                      }`}
                    >
                      {OPTION_LABELS[optIdx]}
                    </span>
                    <span className="text-sm sm:text-base">{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/60 dark:border-white/10">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                className="glass-btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] disabled:opacity-40 rounded-xl"
              >
                <ChevronLeft className="w-4 h-4" />
                পূর্ববর্তী
              </button>

              {answers[q.id] !== undefined && (
                <button
                  type="button"
                  onClick={() => {
                    const copy = { ...answers };
                    delete copy[q.id];
                    setAnswers(copy);
                  }}
                  className="text-xs font-medium text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-rose-700 dark:hover:text-rose-300"
                >
                  উত্তর মুছুন
                </button>
              )}

              <button
                type="button"
                disabled={currentIdx >= session.questions.length - 1}
                onClick={() =>
                  setCurrentIdx((i) => Math.min(session.questions.length - 1, i + 1))
                }
                className="glass-btn-dark inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold disabled:opacity-40 rounded-xl"
              >
                পরবর্তী
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <aside className="lg:col-span-4 bio-card rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">OMR উত্তরপত্র প্যালেট</h3>
            <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-5 gap-2 max-h-96 overflow-y-auto pr-1">
              {session.questions.map((item, idx) => {
                const isAns = answers[item.id] !== undefined;
                const isFlag = flagged[item.id];
                const isCur = idx === currentIdx;
                let cls =
                  'bg-white/65 dark:bg-white/8 border-white/85 dark:border-white/12 text-[#1D1336] dark:text-[#F4F0FF] hover:bg-white/90 dark:hover:bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_6px_-2px_rgba(34,18,74,0.12)] dark:shadow-none';
                if (isFlag)
                  cls =
                    'bg-amber-100/80 dark:bg-amber-950/75 border-amber-400 dark:border-amber-400/55 text-amber-950 dark:text-amber-200 font-semibold shadow-sm';
                else if (isAns)
                  cls =
                    'bg-gradient-to-b from-[#8362ED] to-[#5733BF] border-white/35 text-white font-semibold shadow-[0_3px_0_#3E1F94,0_6px_14px_-4px_rgba(93,56,201,0.45)]';
                if (isCur) cls += ' ring-2 ring-[#1D1336] dark:ring-[#C4B5FD] ring-offset-2 ring-offset-white/60 dark:ring-offset-[#150F2B]';
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`h-9 rounded-xl border text-xs font-mono-tabular transition-all ${cls}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] flex flex-wrap gap-3 pt-2 border-t border-white/60 dark:border-white/10">
              <span>ল্যাভেন্ডার: উত্তরিত</span>
              <span>হলুদ: রিভিউ মার্ক</span>
              <span>বাকি: উত্তরহীন</span>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW 3: LOBBY (MOCK TEST OR MEDICAL MODEL TEST)
  // ==========================================================
  if (mode === 'medical_model') {
    return (
      <div className="space-y-6">
        <div className="relative overflow-hidden glass-hero-card rounded-2xl p-6 sm:p-8 space-y-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full bg-gradient-to-br from-[#A78BFA]/25 to-[#FB7185]/20 blur-2xl"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 220 120"
            className="pointer-events-none hidden md:block absolute right-6 top-4 w-48 h-28 opacity-25 dark:opacity-45"
          >
            <path
              d="M10 70 L50 70 L62 55 L74 82 L88 22 L102 102 L114 70 L145 70 L158 58 L170 70 L210 70"
              fill="none"
              stroke="#BE123C"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="170" cy="30" r="18" fill="none" stroke="#8B5CF6" strokeWidth="2" />
            <circle cx="170" cy="30" r="6" fill="#8B5CF6" />
          </svg>

          <div className="relative flex items-center gap-2 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
            <Stethoscope className="w-4 h-4" />
            DGME মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষা স্ট্যান্ডার্ড
          </div>
          <h1 className="relative text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
            মেডিকেল ও ডেন্টাল অ্যাডমিশন মডেল টেস্ট
          </h1>
          <p className="relative text-sm sm:text-base text-[#5A4B7A] dark:text-[#B6ABD6] max-w-3xl leading-relaxed">
            মূল ভর্তি পরীক্ষার হুবহু মানবণ্টন (জীববিজ্ঞান ৩০, রসায়ন ২৫, পদার্থবিজ্ঞান ২০, ইংরেজি ১৫, সাধারণ জ্ঞান ১০),
            ৬০ মিনিট সময় এবং প্রতিটি ভুল উত্তরে ০.২৫ নেগেটিভ মার্কিংসহ পূর্ণাঙ্গ OMR মডেল টেস্ট দিন।
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              id: 'mbbs_full_1' as const,
              title: 'মেডিকেল (MBBS) পূর্ণাঙ্গ র‍্যান্ডম মডেল টেস্ট',
              meta: '১০০টি র‍্যান্ডম MCQ · ৬০ মিনিট · -০.২৫ নেগেটিভ মার্ক',
              desc: 'প্রতিবার নতুন র‍্যান্ডম প্রশ্ন সেটে (জীববিজ্ঞান ৩০, রসায়ন ২৫, পদার্থ ২০, ইংরেজি ১৫, জিকে ১০) সরকারি মেডিকেল ভর্তি প্রস্তুতির পূর্ণাঙ্গ পরীক্ষা।',
              primary: true,
            },
            {
              id: 'mbbs_past_year' as const,
              title: 'বিগত বছরের (MBBS ও BDS) প্রশ্ন স্পেশাল মডেল টেস্ট',
              meta: '১০০টি MCQ (২০১৭–২০২৪ ব্যাংক অগ্রাধিকার) · ৬০ মিনিট · -০.২৫',
              desc: 'বিগত বছরগুলোর মেডিকেল ও ডেন্টাল ভর্তি পরীক্ষার প্রকৃত প্রশ্নগুলো অগ্রাধিকার দিয়ে পূর্ণাঙ্গ ১০০ নম্বরের OMR পরীক্ষা।',
              primary: false,
            },
            {
              id: 'bds_full' as const,
              title: 'ডেন্টাল (BDS) অ্যাডমিশন র‍্যান্ডম মডেল টেস্ট',
              meta: '১০০টি র‍্যান্ডম MCQ · ৬০ মিনিট · -০.২৫ নেগেটিভ মার্ক',
              desc: 'ঢাকা ডেন্টাল কলেজ ও সরকারি ডেন্টাল ইউনিট লক্ষ্য করে প্রস্তুতকৃত পূর্ণাঙ্গ র‍্যান্ডম সেট।',
              primary: false,
            },
            {
              id: 'sprint' as const,
              title: 'র‍্যাপিড স্প্রিন্ট র‍্যান্ডম মডেল টেস্ট (৫০ নম্বর)',
              meta: '৫০টি র‍্যান্ডম MCQ · ৩০ মিনিট · -০.২৫ নেগেটিভ মার্ক',
              desc: 'অল্প সময়ে সব ৫টি বিষয়ের ওপর দ্রুত অ্যাডমিশন প্রস্তুতি যাচাইয়ের জন্য র‍্যান্ডম সেট।',
              primary: false,
            },
          ].map((card) => (
            <GlassTiltCard key={card.id} maxTiltDeg={2.4} className="rounded-2xl">
              <div className="bio-card glass-card-3d rounded-2xl p-6 flex flex-col justify-between space-y-5 h-full">
                <div className="space-y-2">
                  <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] font-mono-tabular">{card.meta}</div>
                  <h2 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">{card.title}</h2>
                  <p className="text-sm text-[#5A4B7A] dark:text-[#B6ABD6] leading-relaxed">{card.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleStartMedicalModel(card.id)}
                  className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold ${
                    card.primary ? 'glass-btn-primary' : 'glass-btn-dark'
                  }`}
                >
                  মডেল টেস্ট শুরু করুন
                </button>
              </div>
            </GlassTiltCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bio-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">কাস্টম ও বিষয়ভিত্তিক মক টেস্ট</h1>
          <p className="text-sm text-[#5A4B7A] dark:text-[#B6ABD6] mt-1">
            একাদশ-দ্বাদশ শ্রেণির একাডেমিক পরীক্ষা অথবা মেডিকেল অ্যাডমিশনের জন্য নিজের পছন্দমতো বিষয় ও সময় নিয়ে মক টেস্ট তৈরি করুন।
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6] mb-2">
              বিষয় নির্বাচন করুন
            </label>
            <select
              value={mockSubject}
              onChange={(e) => setMockSubject(e.target.value as SubjectId | 'all')}
              className="glass-input w-full px-3 py-2.5 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
            >
              <option value="all">সমন্বিত সকল বিজ্ঞান বিষয় ({allQuestions.length})</option>
              {SUBJECTS.map((s) => {
                const cnt = allQuestions.filter((q) => q.subjectId === s.id).length;
                return (
                  <option key={s.id} value={s.id}>
                    {s.nameBn} ({cnt})
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6] mb-2">
              র‍্যান্ডম প্রশ্নের সংখ্যা
            </label>
            <div className="glass-segment-track grid grid-cols-4 gap-1 p-1 rounded-xl">
              {([10, 15, 25, 35] as const).map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setMockCount(cnt)}
                  className={`py-2 text-xs font-mono-tabular font-semibold rounded-lg transition-all ${
                    mockCount === cnt
                      ? 'glass-segment-active'
                      : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6] mb-2">
              প্রশ্ন ব্যাংক উৎস
            </label>
            <div className="glass-segment-track grid grid-cols-2 gap-1 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMockSource('all')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  mockSource === 'all'
                    ? 'glass-segment-active'
                    : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                সকল র‍্যান্ডম
              </button>
              <button
                type="button"
                onClick={() => setMockSource('past_year')}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  mockSource === 'past_year'
                    ? 'glass-segment-active'
                    : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                বিগত MBBS/BDS
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6] mb-2">
              মার্কিং ধরন (HSC বনাম অ্যাডমিশন)
            </label>
            <div className="glass-segment-track grid grid-cols-2 gap-1 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMockNegMarking(true)}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  mockNegMarking
                    ? 'glass-segment-active'
                    : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                অ্যাডমিশন (-০.২৫)
              </button>
              <button
                type="button"
                onClick={() => setMockNegMarking(false)}
                className={`py-2 text-xs font-medium rounded-lg transition-all ${
                  !mockNegMarking
                    ? 'glass-segment-active'
                    : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                HSC (নেগেটিভ নেই)
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/60 dark:border-white/10">
          <div className="flex items-center gap-2 text-xs text-[#5A4B7A] dark:text-[#B6ABD6] font-mono-tabular">
            <Clock className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
            নির্ধারিত সময়: {Math.round((mockCount * 45) / 60)} মিনিট · র‍্যান্ডম প্রশ্ন:{' '}
            {mockCount}টি
          </div>
          <button
            type="button"
            onClick={handleStartMockTest}
            className="glass-btn-primary px-6 py-2.5 text-sm font-semibold rounded-xl"
          >
            র‍্যান্ডম মক টেস্ট শুরু করুন
          </button>
        </div>
      </div>
    </div>
  );
};
