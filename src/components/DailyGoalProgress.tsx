import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Flame, Sparkles, Target } from 'lucide-react';
import { toBnDigits } from '../data/bioQuestionHelpers';

const SEEN_PROGRESS_STORAGE_KEY = 'medexcel_daily_goal_seen_v1';

interface DailyGoalProgressProps {
  todayAttempted: number;
  todayCorrect: number;
  dailyGoal: number;
  todayDateKey: string;
  storageScopeKey: string;
  onPracticeClick: () => void;
  onEditGoalClick: () => void;
}

interface SeenRecord {
  dateKey: string;
  scopeKey: string;
  count: number;
  goal: number;
}

function readLastSeen(dateKey: string, scopeKey: string): SeenRecord | null {
  try {
    const raw = sessionStorage.getItem(SEEN_PROGRESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SeenRecord>;
    if (
      parsed.dateKey === dateKey &&
      parsed.scopeKey === scopeKey &&
      typeof parsed.count === 'number' &&
      typeof parsed.goal === 'number'
    ) {
      return {
        dateKey,
        scopeKey,
        count: Math.max(0, parsed.count),
        goal: Math.max(1, parsed.goal),
      };
    }
    return null;
  } catch {
    return null;
  }
}

function writeLastSeen(record: SeenRecord): void {
  try {
    sessionStorage.setItem(SEEN_PROGRESS_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Ignore storage errors in restricted environments
  }
}

export const DailyGoalProgress: React.FC<DailyGoalProgressProps> = ({
  todayAttempted,
  todayCorrect,
  dailyGoal,
  todayDateKey,
  storageScopeKey,
  onPracticeClick,
  onEditGoalClick,
}) => {
  const safeGoal = Math.max(1, dailyGoal);
  const targetPctFloat = Math.min(100, (Math.max(0, todayAttempted) / safeGoal) * 100);
  const targetPctRounded = Math.min(100, Math.round(targetPctFloat));

  const initialBaseline = useRef<{
    startWidth: number;
    startCount: number;
    startPct: number;
    delta: number;
    shouldAnimate: boolean;
  } | null>(null);

  if (initialBaseline.current === null) {
    const prev = readLastSeen(todayDateKey, storageScopeKey);
    if (!prev) {
      // First dashboard visit in this session: animate smoothly from 0% up to current progress
      initialBaseline.current = {
        startWidth: 0,
        startCount: 0,
        startPct: 0,
        delta: todayAttempted > 0 ? todayAttempted : 0,
        shouldAnimate: todayAttempted > 0,
      };
    } else if (todayAttempted > prev.count || safeGoal !== prev.goal) {
      const prevWidth = Math.min(100, (prev.count / Math.max(1, prev.goal)) * 100);
      initialBaseline.current = {
        startWidth: prevWidth,
        startCount: prev.count,
        startPct: Math.round(prevWidth),
        delta: Math.max(0, todayAttempted - prev.count),
        shouldAnimate: true,
      };
    } else {
      initialBaseline.current = {
        startWidth: targetPctFloat,
        startCount: todayAttempted,
        startPct: targetPctRounded,
        delta: 0,
        shouldAnimate: false,
      };
    }
  }

  const [barWidthPct, setBarWidthPct] = useState<number>(initialBaseline.current.startWidth);
  const [displayCount, setDisplayCount] = useState<number>(initialBaseline.current.startCount);
  const [displayPct, setDisplayPct] = useState<number>(initialBaseline.current.startPct);
  const [isFilling, setIsFilling] = useState<boolean>(false);
  const [recentDelta, setRecentDelta] = useState<number>(initialBaseline.current.delta);

  const prevCommittedRef = useRef<{
    count: number;
    pctFloat: number;
    pctRounded: number;
  }>({
    count: initialBaseline.current.startCount,
    pctFloat: initialBaseline.current.startWidth,
    pctRounded: initialBaseline.current.startPct,
  });

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const fromCount = prevCommittedRef.current.count;
    const fromPct = prevCommittedRef.current.pctRounded;
    const fromWidth = prevCommittedRef.current.pctFloat;

    const hasChange =
      fromCount !== todayAttempted || Math.abs(fromWidth - targetPctFloat) > 0.05;

    writeLastSeen({
      dateKey: todayDateKey,
      scopeKey: storageScopeKey,
      count: todayAttempted,
      goal: safeGoal,
    });

    if (!hasChange || prefersReducedMotion) {
      setBarWidthPct(targetPctFloat);
      setDisplayCount(todayAttempted);
      setDisplayPct(targetPctRounded);
      prevCommittedRef.current = {
        count: todayAttempted,
        pctFloat: targetPctFloat,
        pctRounded: targetPctRounded,
      };
      return;
    }

    if (todayAttempted > fromCount) {
      setRecentDelta(todayAttempted - fromCount);
    }

    setIsFilling(true);

    let rafId = 0;
    const startDelay = window.setTimeout(() => {
      // Trigger smooth CSS width transition
      setBarWidthPct(targetPctFloat);

      // Sync eased numeric counter over 1200ms
      const durationMs = 1200;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / durationMs);
        // Cubic ease-out matching cubic-bezier(0.22, 1, 0.36, 1)
        const eased = 1 - Math.pow(1 - t, 3);

        setDisplayCount(Math.round(fromCount + (todayAttempted - fromCount) * eased));
        setDisplayPct(Math.round(fromPct + (targetPctRounded - fromPct) * eased));

        if (t < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplayCount(todayAttempted);
          setDisplayPct(targetPctRounded);
          prevCommittedRef.current = {
            count: todayAttempted,
            pctFloat: targetPctFloat,
            pctRounded: targetPctRounded,
          };
        }
      };

      rafId = requestAnimationFrame(step);
    }, 65);

    const settleTimer = window.setTimeout(() => {
      setIsFilling(false);
    }, 1550);

    const deltaFadeTimer = window.setTimeout(() => {
      setRecentDelta(0);
    }, 4500);

    return () => {
      window.clearTimeout(startDelay);
      window.clearTimeout(settleTimer);
      window.clearTimeout(deltaFadeTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [todayAttempted, targetPctFloat, targetPctRounded, safeGoal, todayDateKey, storageScopeKey]);

  const isCompleted = todayAttempted >= safeGoal;
  const remaining = Math.max(0, safeGoal - todayAttempted);
  const accuracy =
    todayAttempted > 0 ? Math.min(100, Math.round((todayCorrect / todayAttempted) * 100)) : 0;

  return (
    <div
      aria-label="আজকের ডেইলি গোল প্রোগ্রেস"
      className={`p-4 rounded-2xl border transition-colors duration-500 space-y-3 ${
        isCompleted
          ? 'bg-gradient-to-br from-emerald-50/85 via-white/75 to-teal-50/75 dark:from-emerald-950/70 dark:via-[#141E2B]/85 dark:to-teal-950/70 border-emerald-200/90 dark:border-emerald-400/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.96),0_10px_24px_-12px_rgba(5,150,105,0.26)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_10px_24px_-12px_rgba(16,185,129,0.28)]'
          : 'bio-subpanel border-white/85 dark:border-white/12'
      }`}
    >
      {/* Top Row: Label & Status Badge */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
              isCompleted
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                : 'bg-gradient-to-br from-[#7C5CE6] to-[#5B35C9] text-white'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <Target className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#1D1336] dark:text-[#F2EDFF] flex items-center gap-1.5">
              <span>আজকের ডেইলি গোল</span>
              {recentDelta > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-500/30 px-1.5 py-0.5 rounded-md animate-pulse">
                  <Sparkles className="w-2.5 h-2.5" />+{toBnDigits(recentDelta)}
                </span>
              )}
            </div>
            <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6] font-mono-tabular">
              সম্পন্ন:{' '}
              <strong className="text-[#1D1336] dark:text-white">{toBnDigits(displayCount)}</strong> /{' '}
              {toBnDigits(safeGoal)}টি প্রশ্ন
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div
            className={`text-lg sm:text-xl font-extrabold font-mono-tabular leading-none ${
              isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-[#6D4ACF] dark:text-[#C4B5FD]'
            }`}
          >
            {toBnDigits(displayPct)}%
          </div>
          <div className="text-[10px] font-semibold mt-0.5 text-[#5A4B7A] dark:text-[#B6ABD6]">
            {isCompleted ? 'লক্ষ্য অর্জিত ✓' : `বাকি ${toBnDigits(remaining)}টি`}
          </div>
        </div>
      </div>

      {/* Glossy 3D Progress Bar */}
      <div
        role="progressbar"
        aria-valuenow={displayPct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`ডেইলি গোল ${toBnDigits(displayPct)} শতাংশ সম্পন্ন`}
        className="glass-progress-track w-full h-4 sm:h-[18px] rounded-full p-[2px]"
      >
        {/* Subtle Milestone Dividers (25%, 50%, 75%) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-1/4 w-px bg-white/55 dark:bg-white/15 z-[1]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-1/2 w-px bg-white/55 dark:bg-white/15 z-[1]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-3/4 w-px bg-white/55 dark:bg-white/15 z-[1]"
        />

        {/* Animated Glossy Fill */}
        <div
          className={`glass-progress-fill h-full relative ${
            isCompleted ? 'glass-progress-fill--complete' : ''
          } ${isFilling ? 'glass-progress-fill--filling' : ''}`}
          style={{
            width: `${barWidthPct > 0 ? Math.max(barWidthPct, 4) : 0}%`,
          }}
        >
          {/* Luminous Tip Highlight */}
          {barWidthPct > 3 && barWidthPct < 100 && (
            <span
              aria-hidden="true"
              className="glass-progress-tip absolute right-0.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white/95 shadow-[0_0_10px_2px_rgba(255,255,255,0.95)] z-[3]"
            />
          )}
        </div>
      </div>

      {/* Bottom Summary & Action Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
        {todayAttempted > 0 ? (
          <span className="inline-flex items-center gap-1 font-medium text-[#554578] dark:text-[#B6ABD6] font-mono-tabular">
            <Flame
              className={`w-3.5 h-3.5 shrink-0 ${
                isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'
              }`}
            />
            {isCompleted ? (
              <span className="text-emerald-800 dark:text-emerald-300 font-semibold">
                দারুণ! লক্ষ্য পূরণ ({toBnDigits(todayCorrect)}টি সঠিক · {toBnDigits(accuracy)}%)
              </span>
            ) : (
              <span>
                আজ সঠিক: <strong className="text-[#1D1336] dark:text-white">{toBnDigits(todayCorrect)}টি</strong> (
                {toBnDigits(accuracy)}%)
              </span>
            )}
          </span>
        ) : (
          <span className="text-[#554578] dark:text-[#B6ABD6]">
            প্র্যাকটিস শুরু করলেই গ্লসি প্রোগ্রেস বার পূর্ণ হতে থাকবে
          </span>
        )}

        <div className="flex items-center gap-3 shrink-0 ml-auto">
          <button
            type="button"
            onClick={onEditGoalClick}
            className="text-[11px] font-medium text-[#6B5B8E] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white underline underline-offset-2"
          >
            লক্ষ্য বদলান
          </button>
          <button
            type="button"
            onClick={onPracticeClick}
            className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
              isCompleted
                ? 'text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200'
                : 'text-[#6D4ACF] dark:text-[#C4B5FD] hover:text-[#5832C4] dark:hover:text-white'
            }`}
          >
            {isCompleted ? 'আরও অনুশীলন' : 'প্র্যাকটিস করুন'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
