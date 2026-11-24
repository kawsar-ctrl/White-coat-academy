import React from 'react';
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';

interface DigitalTimerProps {
  /** Time value in seconds (remaining for countdown, elapsed for stopwatch) */
  seconds: number;
  /** Total duration in seconds (used for countdown progress bar & urgency colors) */
  totalSeconds?: number;
  mode: 'countdown' | 'stopwatch';
  label?: string;
  /** Optional secondary per-question elapsed seconds */
  questionSeconds?: number;
  /** Optional pause/resume controls for practice & question bank modes */
  isPaused?: boolean;
  onTogglePause?: () => void;
  onReset?: () => void;
  compact?: boolean;
}

export function formatDigitalClock(totalSec: number, forceHours = false): string {
  const safe = Math.max(0, Math.floor(totalSec));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0 || forceHours) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export const DigitalTimer: React.FC<DigitalTimerProps> = ({
  seconds,
  totalSeconds,
  mode,
  label,
  questionSeconds,
  isPaused = false,
  onTogglePause,
  onReset,
  compact = false,
}) => {
  const isCritical = mode === 'countdown' && seconds <= 120;
  const isWarning =
    mode === 'countdown' &&
    !isCritical &&
    (seconds <= 300 || (totalSeconds ? seconds / totalSeconds <= 0.2 : false));

  const pctRemaining =
    mode === 'countdown' && totalSeconds && totalSeconds > 0
      ? Math.max(0, Math.min(100, (seconds / totalSeconds) * 100))
      : 100;

  const shellTone = isCritical
    ? 'bg-gradient-to-br from-[#3B0A19]/90 to-[#22040D]/95 backdrop-blur-xl border-rose-400/55 text-rose-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_26px_-10px_rgba(190,18,60,0.45)]'
    : isWarning
      ? 'bg-gradient-to-br from-[#362407]/90 to-[#1F1403]/95 backdrop-blur-xl border-amber-400/55 text-amber-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_12px_26px_-10px_rgba(217,119,6,0.4)]'
      : 'glass-obsidian-3d text-[#DDD6FE]';

  const barTone = isCritical
    ? 'bg-gradient-to-r from-rose-500 to-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.7)]'
    : isWarning
      ? 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.6)]'
      : 'bg-gradient-to-r from-[#8B5CF6] to-[#C4B5FD] shadow-[0_0_8px_rgba(167,139,250,0.65)]';

  return (
    <div
      className={`rounded-2xl border transition-colors ${shellTone} ${
        compact ? 'px-3.5 py-2' : 'px-4 py-3'
      }`}
      aria-live="off"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Timer className={`shrink-0 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
          <div className="flex flex-col">
            {label && (
              <span className="text-[10px] font-medium opacity-80 leading-none mb-0.5">
                {label}
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <span
                className={`font-mono-tabular font-bold tracking-[0.12em] leading-none ${
                  compact ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
                }`}
              >
                {formatDigitalClock(seconds, (totalSeconds || 0) >= 3600)}
              </span>
              {questionSeconds !== undefined && (
                <span className="text-[11px] font-mono-tabular opacity-80 whitespace-nowrap">
                  · প্রশ্ন {formatDigitalClock(questionSeconds)}
                </span>
              )}
            </div>
          </div>
        </div>

        {(onTogglePause || onReset) && (
          <div className="flex items-center gap-1 shrink-0">
            {onTogglePause && (
              <button
                type="button"
                onClick={onTogglePause}
                className="p-1.5 rounded-lg bg-white/12 hover:bg-white/22 border border-white/15 text-current transition-colors"
                aria-label={isPaused ? 'টাইমার চালু করুন' : 'টাইমার বিরতি'}
                title={isPaused ? 'চালু করুন' : 'বিরতি'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            )}
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="p-1.5 rounded-lg bg-white/12 hover:bg-white/22 border border-white/15 text-current transition-colors"
                aria-label="টাইমার রিসেট"
                title="রিসেট"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {mode === 'countdown' && totalSeconds && totalSeconds > 0 && (
        <div className="mt-2 h-1.5 w-full bg-white/12 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-700 rounded-full ${barTone}`}
            style={{ width: `${pctRemaining}%` }}
          />
        </div>
      )}
    </div>
  );
};
