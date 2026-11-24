import React, { useState } from 'react';
import { Award, Crown, Medal, Sparkles, Trophy, UserCheck } from 'lucide-react';
import { toBnDigits } from '../data/bioQuestionHelpers';
import { formatDateKeyBn, LocalDailyProgress } from '../services/learningStore';
import { AppTab, DailyPerformerEntry, TargetExam } from '../types/learning';
import { GlassTiltCard } from './GlassTiltCard';

interface DailyTopPerformersCardProps {
  dateKey: string;
  entries: DailyPerformerEntry[];
  isSignedIn: boolean;
  currentUserId?: string;
  currentDisplayName: string;
  currentPhotoUrl?: string;
  currentTargetExam: TargetExam;
  localDailyProgress?: LocalDailyProgress;
  onNavigateTab: (tab: AppTab) => void;
  onSignIn: () => void;
}

interface PerformerAvatarProps {
  name: string;
  photoUrl?: string;
  sizeClass: string;
  ringClass: string;
  textSizeClass?: string;
}

const PerformerAvatar: React.FC<PerformerAvatarProps> = ({
  name,
  photoUrl,
  sizeClass,
  ringClass,
  textSizeClass = 'text-xl',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const trimmedUrl = (photoUrl || '').trim();
  const showImage = Boolean(trimmedUrl) && !imgFailed;
  const initial = (name.trim().charAt(0) || 'শ').toUpperCase();

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-gradient-to-br from-[#8B5CF6] via-[#6D4ACF] to-[#4338CA] text-white font-bold select-none shadow-[0_10px_24px_-6px_rgba(109,74,207,0.45)] ${sizeClass} ${ringClass}`}
    >
      {showImage ? (
        <img
          src={trimmedUrl}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={textSizeClass}>{initial}</span>
      )}
    </div>
  );
};

function targetExamShortBn(target: TargetExam): string {
  if (target === 'dental') return 'ডেন্টাল (BDS)';
  if (target === 'hsc_science') return 'HSC বিজ্ঞান';
  return 'মেডিকেল (MBBS)';
}

const PODIUM_SLOTS: {
  rank: 1 | 2 | 3;
  orderClass: string;
  rankLabelBn: string;
  medalTitleBn: string;
  badgeBgClass: string;
  cardStyleClass: string;
  ringClass: string;
  avatarSizeClass: string;
  elevationClass: string;
}[] = [
  {
    rank: 1,
    orderClass: 'order-1 md:order-2',
    rankLabelBn: '১ম',
    medalTitleBn: 'আজকের সেরা চ্যাম্পিয়ন',
    badgeBgClass:
      'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white shadow-[0_6px_16px_-4px_rgba(217,119,6,0.55)]',
    cardStyleClass:
      'bg-gradient-to-br from-white/90 via-amber-50/65 to-violet-50/75 dark:from-[#292044]/92 dark:via-[#2B2030]/85 dark:to-[#18122E]/90 border border-amber-200/90 dark:border-amber-400/35 shadow-[inset_0_2px_2px_rgba(255,255,255,0.98),0_22px_46px_-16px_rgba(109,74,207,0.24)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_22px_46px_-16px_rgba(0,0,0,0.65)]',
    ringClass: 'ring-4 ring-amber-400/85 border-2 border-white dark:border-white/25',
    avatarSizeClass: 'w-20 h-20 sm:w-24 sm:h-24',
    elevationClass: 'md:-translate-y-2',
  },
  {
    rank: 2,
    orderClass: 'order-2 md:order-1',
    rankLabelBn: '২য়',
    medalTitleBn: 'দ্বিতীয় সেরা পারফর্মার',
    badgeBgClass:
      'bg-gradient-to-r from-slate-600 to-indigo-600 text-white shadow-[0_6px_14px_-4px_rgba(71,85,105,0.45)]',
    cardStyleClass:
      'bg-gradient-to-br from-white/82 via-slate-50/65 to-violet-50/65 dark:from-[#1D1838]/90 dark:via-[#1B1D36]/84 dark:to-[#15112B]/90 border border-white/90 dark:border-indigo-400/25 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.96),0_16px_34px_-14px_rgba(31,18,68,0.16)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_16px_34px_-14px_rgba(0,0,0,0.6)]',
    ringClass: 'ring-3 ring-indigo-300/90 dark:ring-indigo-400/70 border-2 border-white dark:border-white/25',
    avatarSizeClass: 'w-16 h-16 sm:w-[72px] sm:h-[72px]',
    elevationClass: 'md:mt-3',
  },
  {
    rank: 3,
    orderClass: 'order-3 md:order-3',
    rankLabelBn: '৩য়',
    medalTitleBn: 'তৃতীয় সেরা পারফর্মার',
    badgeBgClass:
      'bg-gradient-to-r from-orange-600 to-rose-600 text-white shadow-[0_6px_14px_-4px_rgba(194,65,12,0.45)]',
    cardStyleClass:
      'bg-gradient-to-br from-white/82 via-orange-50/55 to-violet-50/65 dark:from-[#261834]/90 dark:via-[#261628]/84 dark:to-[#16112B]/90 border border-white/90 dark:border-orange-400/25 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.96),0_16px_34px_-14px_rgba(31,18,68,0.16)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_16px_34px_-14px_rgba(0,0,0,0.6)]',
    ringClass: 'ring-3 ring-orange-300/90 dark:ring-orange-400/70 border-2 border-white dark:border-white/25',
    avatarSizeClass: 'w-16 h-16 sm:w-[72px] sm:h-[72px]',
    elevationClass: 'md:mt-3',
  },
];

export const DailyTopPerformersCard: React.FC<DailyTopPerformersCardProps> = ({
  dateKey,
  entries,
  isSignedIn,
  currentUserId,
  currentDisplayName,
  currentPhotoUrl,
  currentTargetExam,
  localDailyProgress,
  onNavigateTab,
  onSignIn,
}) => {
  const topThree = entries.slice(0, 3);
  const myCloudIndex = currentUserId
    ? entries.findIndex((e) => e.userId === currentUserId)
    : -1;
  const myCloudEntry = myCloudIndex >= 0 ? entries[myCloudIndex] : null;

  return (
    <section
      aria-label="প্রতিদিনের সেরা ৩ পারফর্মার"
      className="bio-card rounded-2xl p-6 space-y-6 relative overflow-hidden"
    >
      {/* Ambient Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-8 w-56 h-56 rounded-full bg-gradient-to-br from-amber-300/20 via-[#8B5CF6]/15 to-transparent blur-2xl"
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>আজকের লিডারবোর্ড · {formatDateKeyBn(dateKey)}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
            প্রতিদিনের সেরা ৩ পারফর্মার
          </h2>
          <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
            প্রতিদিন রাত ১২টায় নতুন র‍্যাংকিং শুরু হয় · আজ অনুশীলন ও মডেল টেস্টে শীর্ষ ৩ শিক্ষার্থীর ছবি ও নাম
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#554578] dark:text-[#B6ABD6] bio-subpanel px-3.5 py-2 rounded-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0" />
          <span>
            পয়েন্ট হিসাব: <strong className="text-[#1D1336] dark:text-white">সঠিক +১০</strong> ·{' '}
            <strong className="text-[#1D1336] dark:text-white">অনুশীলন +২</strong> ·{' '}
            <strong className="text-[#1D1336] dark:text-white">মডেল/মক টেস্ট +৪০ ও স্কোর</strong>
          </span>
        </div>
      </div>

      {/* 3-Column Podium Cards */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {PODIUM_SLOTS.map((slot) => {
          const performer = topThree[slot.rank - 1];
          const isMe = Boolean(performer && currentUserId && performer.userId === currentUserId);
          const accuracy =
            performer && performer.questionsAttempted > 0
              ? Math.round((performer.correctCount / performer.questionsAttempted) * 100)
              : 0;

          if (!performer) {
            return (
              <div
                key={slot.rank}
                className={`${slot.orderClass} ${slot.elevationClass} bio-subpanel rounded-2xl p-5 flex flex-col items-center justify-between text-center gap-4 border border-dashed border-[#C7B8EA] dark:border-violet-400/25`}
              >
                <div className="w-full flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold ${slot.badgeBgClass}`}
                  >
                    {slot.rank === 1 ? (
                      <Crown className="w-3.5 h-3.5" />
                    ) : slot.rank === 2 ? (
                      <Medal className="w-3.5 h-3.5" />
                    ) : (
                      <Award className="w-3.5 h-3.5" />
                    )}
                    {slot.rankLabelBn} স্থান
                  </span>
                  <span className="text-[11px] font-medium text-[#6B5B8E] dark:text-[#B6ABD6]">অপেক্ষমাণ</span>
                </div>

                <div className="flex flex-col items-center gap-2.5 py-2">
                  <div
                    className={`${slot.avatarSizeClass} rounded-full border-2 border-dashed border-[#B7A4E4] dark:border-violet-400/35 bg-white/50 dark:bg-white/5 flex items-center justify-center text-[#8776AE] dark:text-[#C4B5FD]`}
                  >
                    {slot.rank === 1 ? (
                      <Crown className="w-7 h-7 text-amber-500/75 dark:text-amber-400/80" />
                    ) : (
                      <Trophy className="w-6 h-6 text-[#6D4ACF]/65 dark:text-[#C4B5FD]/75" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                    আজকের {slot.rankLabelBn} স্থানের জন্য উন্মুক্ত
                  </div>
                  <p className="text-xs text-[#554578] dark:text-[#B6ABD6] max-w-[210px] leading-relaxed">
                    {isSignedIn
                      ? 'প্র্যাকটিস বা মডেল টেস্ট সম্পন্ন করলেই আপনার ছবি ও নাম এখানে প্রদর্শিত হবে।'
                      : 'গুগল সাইন-ইন করে অনুশীলন শুরু করলেই আপনার ছবি ও নাম শীর্ষ ৩-এ যুক্ত হবে।'}
                  </p>
                </div>

                {isSignedIn ? (
                  <button
                    type="button"
                    onClick={() => onNavigateTab('practice')}
                    className="w-full py-2 px-3 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-xl whitespace-nowrap"
                  >
                    প্র্যাকটিস শুরু করুন
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={onSignIn}
                    className="w-full py-2 px-3 text-xs font-semibold glass-btn-primary rounded-xl whitespace-nowrap"
                  >
                    সাইন-ইন করে যুক্ত হোন
                  </button>
                )}
              </div>
            );
          }

          return (
            <GlassTiltCard
              key={performer.userId}
              className={`${slot.orderClass} ${slot.elevationClass} rounded-2xl`}
              maxTiltDeg={2.4}
            >
              <div
                className={`h-full rounded-2xl p-5 flex flex-col items-center text-center justify-between gap-4 relative z-10 ${slot.cardStyleClass}`}
              >
                {/* Top Rank Ribbon */}
                <div className="w-full flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${slot.badgeBgClass}`}
                  >
                    {slot.rank === 1 ? (
                      <Crown className="w-3.5 h-3.5" />
                    ) : slot.rank === 2 ? (
                      <Medal className="w-3.5 h-3.5" />
                    ) : (
                      <Award className="w-3.5 h-3.5" />
                    )}
                    {slot.rankLabelBn} স্থান
                  </span>

                  {isMe ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] bg-white/85 dark:bg-[#231A44]/90 px-2 py-0.5 rounded-md border border-[#DDD2F4] dark:border-violet-400/30">
                      <UserCheck className="w-3 h-3" />
                      আপনি
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-[#554578] dark:text-[#B6ABD6]">
                      {targetExamShortBn(performer.targetExam)}
                    </span>
                  )}
                </div>

                {/* Performer Photo & Name */}
                <div className="flex flex-col items-center gap-2.5">
                  <PerformerAvatar
                    name={performer.displayName}
                    photoUrl={performer.photoUrl}
                    sizeClass={slot.avatarSizeClass}
                    ringClass={slot.ringClass}
                    textSizeClass={slot.rank === 1 ? 'text-2xl' : 'text-xl'}
                  />
                  <div className="space-y-0.5 max-w-full">
                    <h3 className="text-base font-bold text-[#1D1336] dark:text-[#F4F0FF] truncate max-w-[220px]">
                      {performer.displayName}
                    </h3>
                    <div className="text-xs text-[#554578] dark:text-[#B6ABD6] truncate max-w-[220px]">
                      {performer.college?.trim() || slot.medalTitleBn}
                    </div>
                  </div>
                </div>

                {/* Daily Score & Stats */}
                <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-[#E4DAF6]/80 dark:border-white/10 text-center">
                  <div className="bio-subpanel rounded-xl py-2 px-1">
                    <div className="text-[10px] text-[#554578] dark:text-[#B6ABD6]">আজকের স্কোর</div>
                    <div className="text-sm font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD]">
                      {toBnDigits(performer.score)}
                    </div>
                  </div>
                  <div className="bio-subpanel rounded-xl py-2 px-1">
                    <div className="text-[10px] text-[#554578] dark:text-[#B6ABD6]">সঠিক উত্তর</div>
                    <div className="text-sm font-bold font-mono-tabular text-emerald-700 dark:text-emerald-300">
                      {toBnDigits(performer.correctCount)}/{toBnDigits(performer.questionsAttempted)}
                    </div>
                  </div>
                  <div className="bio-subpanel rounded-xl py-2 px-1">
                    <div className="text-[10px] text-[#554578] dark:text-[#B6ABD6]">নির্ভুলতা</div>
                    <div className="text-sm font-bold font-mono-tabular text-[#1D1336] dark:text-white">
                      {toBnDigits(accuracy)}%
                    </div>
                  </div>
                </div>
              </div>
            </GlassTiltCard>
          );
        })}
      </div>

      {/* Current User's Daily Position Strip */}
      <div className="relative z-10 p-4 bio-subpanel rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <PerformerAvatar
            name={currentDisplayName}
            photoUrl={currentPhotoUrl}
            sizeClass="w-11 h-11"
            ringClass="ring-2 ring-white dark:ring-white/25 border border-[#D4C6F2] dark:border-violet-400/30"
            textSizeClass="text-sm"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF] truncate">
              {currentDisplayName} · {targetExamShortBn(currentTargetExam)}
            </div>
            {isSignedIn ? (
              myCloudEntry ? (
                <div className="text-xs text-[#554578] dark:text-[#B6ABD6] font-mono-tabular mt-0.5">
                  আজ আপনার অবস্থান:{' '}
                  <strong className="text-[#6D4ACF] dark:text-[#C4B5FD]">#{toBnDigits(myCloudIndex + 1)}</strong> · স্কোর{' '}
                  <strong className="text-[#1D1336] dark:text-white">{toBnDigits(myCloudEntry.score)}</strong> ·
                  সঠিক {toBnDigits(myCloudEntry.correctCount)}/{toBnDigits(myCloudEntry.questionsAttempted)}
                  {myCloudEntry.testsCompleted > 0
                    ? ` · টেস্ট ${toBnDigits(myCloudEntry.testsCompleted)}টি`
                    : ''}
                </div>
              ) : (
                <div className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-0.5">
                  আজ এখনো কোনো প্রশ্ন সমাধান করেননি — ১টি প্রশ্ন অনুশীলন করলেই আপনার ছবি ও নাম লিডারবোর্ডে যুক্ত হবে!
                </div>
              )
            ) : (
              <div className="text-xs text-[#554578] dark:text-[#B6ABD6] mt-0.5">
                {localDailyProgress && localDailyProgress.questionsAttempted > 0
                  ? `অফলাইন আজকের স্কোর: ${toBnDigits(localDailyProgress.score)} (${toBnDigits(localDailyProgress.correctCount)}/${toBnDigits(localDailyProgress.questionsAttempted)}) — শীর্ষ ৩-এ নাম ও ছবি দেখাতে গুগল সাইন-ইন করুন`
                  : 'দৈনিক সেরা ৩ লিডারবোর্ডে আপনার ছবি ও নাম যুক্ত করতে গুগল সাইন-ইন করুন'}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigateTab('practice')}
            className="px-3.5 py-2 text-xs font-semibold text-[#1D1336] dark:text-[#EDE8FF] glass-btn-secondary rounded-xl whitespace-nowrap"
          >
            প্র্যাকটিস করুন
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('medical_model')}
            className="px-3.5 py-2 text-xs font-semibold glass-btn-primary rounded-xl whitespace-nowrap"
          >
            মডেল টেস্ট দিন
          </button>
          {!isSignedIn && (
            <button
              type="button"
              onClick={onSignIn}
              className="px-3.5 py-2 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] glass-btn-secondary rounded-xl whitespace-nowrap"
            >
              গুগল সাইন-ইন
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
