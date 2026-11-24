import React from 'react';
import { ArrowRight, CheckCircle2, Crown, Lock, Sparkles } from 'lucide-react';
import { AccessPolicyConfig } from '../types/learning';

interface AccessGateCardProps {
  titleBn?: string;
  reasonBn?: string;
  isSignedIn: boolean;
  isExpired: boolean;
  policy: AccessPolicyConfig;
  onSignIn: () => void;
  onOpenEnroll: () => void;
  onGoDashboard?: () => void;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export const AccessGateCard: React.FC<AccessGateCardProps> = ({
  titleBn,
  reasonBn,
  isSignedIn,
  isExpired,
  policy,
  onSignIn,
  onOpenEnroll,
  onGoDashboard,
}) => {
  const defaultTitle = !isSignedIn
    ? `${toBnDigits(policy.trialDurationDays)} দিনের ফ্রি ট্রায়াল শুরু করতে সাইন-ইন করুন`
    : isExpired
      ? 'আপনার ফ্রি ট্রায়াল / অ্যাক্সেসের মেয়াদ শেষ হয়েছে'
      : 'এই মডিউলটি প্রো সদস্যদের জন্য সংরক্ষিত';

  return (
    <section className="max-w-2xl mx-auto glass-hero-card rounded-3xl p-6 sm:p-8 space-y-6 my-4">
      <div className="space-y-2.5 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#6D4ACF]/12 dark:bg-violet-500/20 border border-[#6D4ACF]/25 dark:border-violet-400/35 flex items-center justify-center mx-auto">
          {!isSignedIn ? (
            <Sparkles className="w-6 h-6 text-[#6D4ACF] dark:text-[#C4B5FD]" />
          ) : isExpired ? (
            <Lock className="w-6 h-6 text-amber-600 dark:text-amber-300" />
          ) : (
            <Crown className="w-6 h-6 text-[#6D4ACF] dark:text-[#C4B5FD]" />
          )}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
          {titleBn || defaultTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed max-w-xl mx-auto">
          {reasonBn ||
            `সাইন-ইন করলে ${toBnDigits(policy.trialDurationDays)} দিনের লিমিটেড ফ্রি এক্সেস এবং ${toBnDigits(policy.proPriceBdt)} টাকায় এনরোল করলে ${toBnDigits(policy.proDurationDays)} দিনের ফুল এক্সেস পাবেন।`}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-xs">
        <div className="bio-subpanel rounded-2xl p-4 space-y-2">
          <div className="font-bold text-[#1D1336] dark:text-[#F4F0FF]">
            {toBnDigits(policy.trialDurationDays)} দিনের ফ্রি ট্রায়াল
          </div>
          <ul className="space-y-1.5 text-[#554578] dark:text-[#B6ABD6]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              দৈনিক {toBnDigits(policy.freeDailyQuestionLimit)}টি প্রশ্ন অনুশীলন
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              {toBnDigits(policy.freeQuestionBankLimit)}টি প্রশ্ন ব্যাংক প্রিভিউ
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              {toBnDigits(policy.freeVisualLessonLimit)}টি ভিজ্যুয়াল লেকচার
            </li>
          </ul>
        </div>

        <div className="bio-subpanel rounded-2xl p-4 space-y-2 border border-[#8B5CF6]/35">
          <div className="font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
            ১ বছরের প্রো ফুল এক্সেস — {toBnDigits(policy.proPriceBdt)}৳
          </div>
          <ul className="space-y-1.5 text-[#1D1336] dark:text-[#E2DAFA]">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              আনলিমিটেড প্র্যাকটিস ও প্রশ্ন ব্যাংক
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ১০০ নম্বরের মেডিকেল ও ডেন্টাল মডেল টেস্ট
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              সব ইনফোগ্রাফ, ভিডিও ও ওয়ার্কশীট
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {!isSignedIn ? (
          <>
            <button
              type="button"
              onClick={onSignIn}
              className="glass-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
            >
              গুগল দিয়ে সাইন-ইন করে {toBnDigits(policy.trialDurationDays)} দিন ফ্রি শুরু করুন
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onOpenEnroll}
              className="glass-btn-secondary px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] rounded-xl"
            >
              {toBnDigits(policy.proPriceBdt)}৳ প্রো প্ল্যান দেখুন
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onOpenEnroll}
              className="glass-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
            >
              <Crown className="w-4 h-4" />
              {toBnDigits(policy.proPriceBdt)} টাকায় ১ বছরের ফুল এক্সেস নিন
            </button>
            {onGoDashboard && (
              <button
                type="button"
                onClick={onGoDashboard}
                className="glass-btn-secondary px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl"
              >
                ড্যাশবোর্ডে ফিরে যান
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
};
