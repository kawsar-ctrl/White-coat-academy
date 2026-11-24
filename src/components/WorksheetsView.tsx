import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Lightbulb,
  PlayCircle,
  Printer,
  Search,
} from 'lucide-react';
import { SUBJECTS, getChapterById, getSubjectById } from '../data/curriculum';
import {
  AppTab,
  ChapterInfo,
  CustomWorksheet,
  SubjectId,
  WorksheetType,
} from '../types/learning';
import { GlassTiltCard } from './GlassTiltCard';

interface WorksheetsViewProps {
  worksheets: CustomWorksheet[];
  onPracticeChapter: (chapter: ChapterInfo) => void;
  onOpenVisualLesson: (visualLessonId: string) => void;
  onNavigateTab: (tab: AppTab) => void;
}

const WORKSHEET_PROGRESS_KEY = 'medexcel_bd_worksheet_progress_v1';

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

const WORKSHEET_TYPE_LABELS: Record<WorksheetType, string> = {
  practice_sheet: 'টপিক প্র্যাকটিস শীট',
  cq_srijonshil: 'সৃজনশীল (CQ) ওয়ার্কশীট',
  formula_sheet: 'সূত্র ও শর্টকাট শীট',
  assignment: 'অ্যাসাইনমেন্ট ও হোমওয়ার্ক',
};

const DIFFICULTY_LABELS: Record<CustomWorksheet['difficulty'], string> = {
  hsc: 'HSC বোর্ড',
  medical: 'মেডিকেল (MBBS)',
  dental: 'ডেন্টাল (BDS)',
};

function loadCompletedTasks(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(WORKSHEET_PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, boolean>;
    }
    return {};
  } catch {
    return {};
  }
}

export const WorksheetsView: React.FC<WorksheetsViewProps> = ({
  worksheets,
  onPracticeChapter,
  onOpenVisualLesson,
  onNavigateTab,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<WorksheetType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeWorksheetId, setActiveWorksheetId] = useState<string | null>(
    worksheets[0]?.id || null
  );

  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() =>
    loadCompletedTasks()
  );
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [revealAllAnswers, setRevealAllAnswers] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(WORKSHEET_PROGRESS_KEY, JSON.stringify(completedTasks));
    } catch {
      // Ignore storage quota errors
    }
  }, [completedTasks]);

  const filteredWorksheets = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return worksheets.filter((ws) => {
      if (selectedSubject !== 'all' && ws.subjectId !== selectedSubject) return false;
      if (typeFilter !== 'all' && ws.worksheetType !== typeFilter) return false;
      if (q) {
        const chName = getChapterById(ws.chapterId)?.nameBn || '';
        const haystack = `${ws.titleBn} ${ws.topicName} ${chName} ${ws.instructionsBn}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [worksheets, selectedSubject, typeFilter, searchQuery]);

  useEffect(() => {
    if (filteredWorksheets.length > 0) {
      if (!activeWorksheetId || !filteredWorksheets.some((w) => w.id === activeWorksheetId)) {
        setActiveWorksheetId(filteredWorksheets[0].id);
      }
    } else {
      setActiveWorksheetId(null);
    }
  }, [filteredWorksheets, activeWorksheetId]);

  const activeWorksheet = useMemo(
    () =>
      filteredWorksheets.find((w) => w.id === activeWorksheetId) ||
      filteredWorksheets[0] ||
      null,
    [filteredWorksheets, activeWorksheetId]
  );

  const activeChapter = activeWorksheet ? getChapterById(activeWorksheet.chapterId) : undefined;

  const activeProgress = useMemo(() => {
    if (!activeWorksheet) return { done: 0, total: 0, totalMarks: 0, percent: 0 };
    const total = activeWorksheet.tasks.length;
    let done = 0;
    let totalMarks = 0;
    activeWorksheet.tasks.forEach((t, idx) => {
      totalMarks += t.marks || 1;
      if (completedTasks[`${activeWorksheet.id}_task_${idx}`]) {
        done += 1;
      }
    });
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done, total, totalMarks, percent };
  }, [activeWorksheet, completedTasks]);

  const toggleTaskDone = (key: string) => {
    setCompletedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <section className="glass-hero-card rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
              <FileText className="w-4 h-4" />
              টপিকভিত্তিক অনুশীলন ও সৃজনশীল (CQ) শীট
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              টপিক ওয়ার্কশীট লাইব্রেরি
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B7A] dark:text-[#B6ABD6]">
              প্রতিটি অধ্যায় ও টপিকের জন্য নির্ধারিত প্র্যাকটিস ওয়ার্কশীট, সৃজনশীল প্রশ্ন, সূত্র শীট ও সমাধান অনুশীলন করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab('visual')}
              className="glass-btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl whitespace-nowrap"
            >
              <PlayCircle className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              ইনফোগ্রাফ ও ভিডিও দেখুন
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('practice')}
              className="glass-btn-primary inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              MCQ প্র্যাকটিস করুন
            </button>
          </div>
        </div>

        {/* Subject Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedSubject('all')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap ${
              selectedSubject === 'all'
                ? 'glass-btn-primary'
                : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
            }`}
          >
            সকল বিষয় ({toBnDigits(worksheets.length)})
          </button>
          {SUBJECTS.map((sub) => {
            const count = worksheets.filter((w) => w.subjectId === sub.id).length;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => setSelectedSubject(sub.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap ${
                  selectedSubject === sub.id
                    ? 'glass-btn-primary'
                    : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                }`}
              >
                {sub.nameBn} ({toBnDigits(count)})
              </button>
            );
          })}
        </div>

        {/* Type Filter & Search Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          <div className="glass-segment-track flex flex-wrap items-center gap-1 p-1 rounded-xl">
            {(
              [
                { id: 'all', label: 'সব ধরন' },
                { id: 'practice_sheet', label: 'প্র্যাকটিস শীট' },
                { id: 'cq_srijonshil', label: 'সৃজনশীল (CQ)' },
                { id: 'formula_sheet', label: 'সূত্র শীট' },
                { id: 'assignment', label: 'অ্যাসাইনমেন্ট' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTypeFilter(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  typeFilter === item.id
                    ? 'glass-segment-active'
                    : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative md:w-72">
            <Search className="w-3.5 h-3.5 text-[#5A4B7A] dark:text-[#A598C9] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="টপিক, অধ্যায় বা ওয়ার্কশীট খুঁজুন..."
              className="glass-input w-full pl-8 pr-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF] placeholder:text-[#7F6DA8] dark:placeholder:text-[#8E82B5]"
            />
          </div>
        </div>
      </section>

      {/* Main Two-Zone Workspace */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <aside className="lg:col-span-4 bio-card rounded-2xl p-4 space-y-2.5 max-h-[740px] overflow-y-auto">
          <div className="px-2 py-1 text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6]">
            ওয়ার্কশীট তালিকা ({toBnDigits(filteredWorksheets.length)}টি)
          </div>

          {filteredWorksheets.length === 0 ? (
            <div className="p-4 bio-subpanel rounded-xl text-xs text-[#5A4B7A] dark:text-[#B6ABD6] leading-relaxed">
              এই ফিল্টারে এখনো কোনো প্রকাশিত ওয়ার্কশীট পাওয়া যায়নি।
            </div>
          ) : (
            filteredWorksheets.map((ws) => {
              const isSelected = activeWorksheet?.id === ws.id;
              const sub = getSubjectById(ws.subjectId);
              const doneCount = ws.tasks.filter(
                (_, i) => completedTasks[`${ws.id}_task_${i}`]
              ).length;

              return (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => setActiveWorksheetId(ws.id)}
                  className={`w-full text-left p-3.5 rounded-xl text-[#1D1336] dark:text-[#F4F0FF] ${
                    isSelected ? 'glass-option-selected' : 'glass-option'
                  }`}
                >
                  <div className="text-[11px] font-medium text-[#6D4ACF] dark:text-[#C4B5FD] flex items-center justify-between gap-2">
                    <span className="truncate">
                      {sub?.nameBn} · {ws.topicName}
                    </span>
                    <span className="shrink-0 font-mono-tabular">
                      {toBnDigits(doneCount)}/{toBnDigits(ws.tasks.length)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] mt-0.5 leading-snug">
                    {ws.titleBn}
                  </div>
                  <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] mt-1">
                    {WORKSHEET_TYPE_LABELS[ws.worksheetType]} · {DIFFICULTY_LABELS[ws.difficulty]}
                  </div>
                </button>
              );
            })
          )}
        </aside>

        {/* Right Interactive Worksheet Stage */}
        <div className="lg:col-span-8 space-y-5">
          {activeWorksheet ? (
            <GlassTiltCard maxTiltDeg={1.2} className="rounded-2xl">
              <div className="bio-card glass-card-3d rounded-2xl p-5 sm:p-6 space-y-5 relative z-10">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="text-xs text-[#6D4ACF] dark:text-[#C4B5FD] font-semibold">
                      {getSubjectById(activeWorksheet.subjectId)?.nameBn} ·{' '}
                      {activeChapter?.nameBn || ''} · টপিক: {activeWorksheet.topicName}
                    </div>
                    <h2 className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                      {activeWorksheet.titleBn}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#5A4B7A] dark:text-[#B6ABD6] font-mono-tabular">
                      <span>{WORKSHEET_TYPE_LABELS[activeWorksheet.worksheetType]}</span>
                      <span>·</span>
                      <span>{DIFFICULTY_LABELS[activeWorksheet.difficulty]}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                        {toBnDigits(activeWorksheet.estimatedMinutes)} মিনিট
                      </span>
                      <span>·</span>
                      <span>মোট নম্বর: {toBnDigits(activeProgress.totalMarks)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setRevealAllAnswers((v) => !v)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl ${
                        revealAllAnswers
                          ? 'glass-btn-primary'
                          : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                      }`}
                    >
                      {revealAllAnswers ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          সমাধান লুকান
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                          সব সমাধান দেখুন
                        </>
                      )}
                    </button>

                    {activeWorksheet.attachmentUrl &&
                      /^https?:\/\//i.test(activeWorksheet.attachmentUrl) && (
                        <a
                          href={activeWorksheet.attachmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold glass-btn-secondary text-[#6D4ACF] dark:text-[#C4B5FD] rounded-xl"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          PDF / শিট লিংক
                        </a>
                      )}

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF] rounded-xl"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                      প্রিন্ট করুন
                    </button>
                  </div>
                </div>

                {/* Progress Strip */}
                <div className="bio-subpanel rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                      আপনার ওয়ার্কশীট অগ্রগতি
                    </span>
                    <span className="font-mono-tabular font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                      {toBnDigits(activeProgress.done)} / {toBnDigits(activeProgress.total)} সম্পন্ন (
                      {toBnDigits(activeProgress.percent)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#E3D9F4]/80 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#6D4ACF] to-[#8B5CF6] transition-all"
                      style={{ width: `${activeProgress.percent}%` }}
                    />
                  </div>
                </div>

                {activeWorksheet.instructionsBn && (
                  <div className="bio-subpanel rounded-xl p-4 text-xs sm:text-sm text-[#1D1336] dark:text-[#E2DAFA] leading-relaxed">
                    <span className="font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] block mb-1">
                      শিক্ষার্থীর নির্দেশনা:
                    </span>
                    {activeWorksheet.instructionsBn}
                  </div>
                )}

                {/* Interactive Tasks */}
                <div className="space-y-3.5">
                  {activeWorksheet.tasks.map((task, idx) => {
                    const key = `${activeWorksheet.id}_task_${idx}`;
                    const isDone = Boolean(completedTasks[key]);
                    const showHint = Boolean(revealedHints[key]);
                    const showAnswer = revealAllAnswers || Boolean(revealedAnswers[key]);

                    return (
                      <div
                        key={key}
                        className={`rounded-2xl p-4 sm:p-5 border transition-all space-y-3 ${
                          isDone
                            ? 'bg-emerald-50/75 dark:bg-emerald-950/60 border-emerald-300/80 dark:border-emerald-400/35 shadow-sm'
                            : 'bio-subpanel border-white/85 dark:border-white/12'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => toggleTaskDone(key)}
                            className="flex items-start gap-3 text-left flex-1"
                          >
                            <span
                              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                                isDone
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : 'bg-white/80 dark:bg-white/10 border-[#C6B6E8] dark:border-violet-400/40'
                              }`}
                            >
                              {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                            </span>
                            <span className="text-sm sm:text-base font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                              <span className="font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD] mr-1.5">
                                {toBnDigits(idx + 1)}.
                              </span>
                              {task.promptBn}
                            </span>
                          </button>

                          <span className="shrink-0 text-xs font-mono-tabular font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                            {toBnDigits(task.marks)} নম্বর
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pl-8">
                          {task.hintBn && (
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedHints((prev) => ({ ...prev, [key]: !prev[key] }))
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg glass-btn-secondary text-[#5A4B7A] dark:text-[#B6ABD6]"
                            >
                              <Lightbulb className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              {showHint ? 'হিন্ট লুকান' : 'হিন্ট দেখুন'}
                              {showHint ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          )}
                          {task.answerBn && !revealAllAnswers && (
                            <button
                              type="button"
                              onClick={() =>
                                setRevealedAnswers((prev) => ({ ...prev, [key]: !prev[key] }))
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg glass-btn-secondary text-[#6D4ACF] dark:text-[#C4B5FD]"
                            >
                              {revealedAnswers[key] ? 'সমাধান লুকান' : 'সমাধান ও উত্তর দেখুন'}
                              {revealedAnswers[key] ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </div>

                        {showHint && task.hintBn && (
                          <div className="ml-8 p-3 rounded-xl bg-amber-50/85 dark:bg-amber-950/55 border border-amber-200/80 dark:border-amber-400/35 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                            <strong>হিন্ট:</strong> {task.hintBn}
                          </div>
                        )}

                        {showAnswer && task.answerBn && (
                          <div className="ml-8 p-3.5 rounded-xl bg-white/85 dark:bg-[#191230]/85 border border-[#D4C5F5] dark:border-violet-400/30 text-xs sm:text-sm text-[#1D1336] dark:text-[#F4F0FF] leading-relaxed">
                            <strong className="text-[#6D4ACF] dark:text-[#C4B5FD]">সমাধান:</strong> {task.answerBn}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Chapter Shortcuts */}
                {activeChapter && (
                  <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/70 dark:border-white/10">
                    <button
                      type="button"
                      onClick={() => onPracticeChapter(activeChapter)}
                      className="glass-btn-primary inline-flex items-center justify-center gap-2 py-2.5 px-5 text-xs font-semibold rounded-xl"
                    >
                      <BookOpen className="w-4 h-4" />
                      এই অধ্যায়ের MCQ প্র্যাকটিস করুন ({activeChapter.nameBn})
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenVisualLesson(activeChapter.visualLessonId)}
                      className="glass-btn-secondary inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl"
                    >
                      <PlayCircle className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                      টপিকের ভিজ্যুয়াল ইনফোগ্রাফ ও ভিডিও
                    </button>
                  </div>
                )}
              </div>
            </GlassTiltCard>
          ) : (
            <div className="bio-card rounded-2xl p-10 text-center space-y-4">
              <FileText className="w-10 h-10 text-[#6D4ACF] dark:text-[#C4B5FD] mx-auto" />
              <div className="space-y-1.5">
                <h2 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  {worksheets.length === 0
                    ? 'এখনো কোনো টপিক ওয়ার্কশীট যুক্ত করা হয়নি'
                    : 'এই ফিল্টারে কোনো ওয়ার্কশীট পাওয়া যায়নি'}
                </h2>
                <p className="text-xs sm:text-sm text-[#5A4B7A] dark:text-[#B6ABD6] max-w-md mx-auto leading-relaxed">
                  {worksheets.length === 0
                    ? 'সুপার এডমিন প্যানেল থেকে বিষয়, অধ্যায় ও টপিক অনুসারে সৃজনশীল, সূত্র শীট বা প্র্যাকটিস ওয়ার্কশীট যুক্ত করলে শিক্ষার্থীরা এখানে সমাধান করতে পারবে।'
                    : 'অন্য বিষয় বা ধরন নির্বাচন করে দেখুন অথবা সার্চ বক্স খালি করুন।'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {worksheets.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSubject('all');
                      setTypeFilter('all');
                      setSearchQuery('');
                    }}
                    className="glass-btn-primary px-4 py-2 text-xs font-semibold rounded-xl"
                  >
                    সব ওয়ার্কশীট দেখুন
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onNavigateTab('admin')}
                  className="glass-btn-secondary px-4 py-2 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl"
                >
                  সুপার এডমিন প্যানেলে যান
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
