import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  CreditCard,
  Crown,
  KeyRound,
  Lock,
  Save,
  ShieldCheck,
  Sliders,
  Sparkles,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { DAY_MS } from '../services/accessStore';
import {
  AccessPolicyConfig,
  AccessTier,
  AdminUserRecord,
  EnrollmentRequestRecord,
  EnrollmentRequestStatus,
} from '../types/learning';

interface AdminAccessManagementTabProps {
  currentUser: User | null;
  isBootstrappedAdmin: boolean;
  policy: AccessPolicyConfig;
  enrollmentRequests: EnrollmentRequestRecord[];
  users: AdminUserRecord[];
  onSavePolicy: (
    policy: Omit<AccessPolicyConfig, 'id' | 'updatedByUid' | 'updatedAtMs'>
  ) => Promise<void>;
  onReviewRequest: (
    req: EnrollmentRequestRecord,
    decision: 'approved' | 'rejected',
    options?: { adminNote?: string; durationDays?: number }
  ) => Promise<void>;
  onSetUserAccessTier: (
    uid: string,
    tier: AccessTier,
    durationDays?: number
  ) => Promise<void>;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

const ACCESS_TIER_LABELS: Record<AccessTier, string> = {
  free_trial: 'ফ্রি ট্রায়াল',
  enrolled_pro: '১ বছর প্রো (৫০০৳)',
  lifetime_vip: 'লাইফটাইম VIP',
  restricted: 'সীমিত (রেস্ট্রিক্টেড)',
};

function formatDateBn(ms: number | undefined): string {
  if (!ms) return '—';
  try {
    return new Date(ms).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '—';
  }
}

export const AdminAccessManagementTab: React.FC<AdminAccessManagementTabProps> = ({
  isBootstrappedAdmin,
  policy,
  enrollmentRequests,
  users,
  onSavePolicy,
  onReviewRequest,
  onSetUserAccessTier,
}) => {
  // Editable policy draft state
  const [trialDurationDays, setTrialDurationDays] = useState(policy.trialDurationDays);
  const [proPriceBdt, setProPriceBdt] = useState(policy.proPriceBdt);
  const [proDurationDays, setProDurationDays] = useState(policy.proDurationDays);
  const [requireSignInForAccess, setRequireSignInForAccess] = useState(
    policy.requireSignInForAccess
  );
  const [freeDailyQuestionLimit, setFreeDailyQuestionLimit] = useState(
    policy.freeDailyQuestionLimit
  );
  const [freeQuestionBankLimit, setFreeQuestionBankLimit] = useState(
    policy.freeQuestionBankLimit
  );
  const [freeVisualLessonLimit, setFreeVisualLessonLimit] = useState(
    policy.freeVisualLessonLimit
  );

  const [allowFreePractice, setAllowFreePractice] = useState(policy.allowFreePractice);
  const [allowFreeFlashcards, setAllowFreeFlashcards] = useState(policy.allowFreeFlashcards);
  const [allowFreeQuestionBank, setAllowFreeQuestionBank] = useState(
    policy.allowFreeQuestionBank
  );
  const [allowFreeWrongBank, setAllowFreeWrongBank] = useState(policy.allowFreeWrongBank);
  const [allowFreeMockTest, setAllowFreeMockTest] = useState(policy.allowFreeMockTest);
  const [allowFreeMedicalModel, setAllowFreeMedicalModel] = useState(
    policy.allowFreeMedicalModel
  );
  const [allowFreeVisualHub, setAllowFreeVisualHub] = useState(policy.allowFreeVisualHub);
  const [allowFreeWorksheets, setAllowFreeWorksheets] = useState(policy.allowFreeWorksheets);

  const [bkashNumber, setBkashNumber] = useState(policy.bkashNumber);
  const [nagadNumber, setNagadNumber] = useState(policy.nagadNumber);
  const [rocketNumber, setRocketNumber] = useState(policy.rocketNumber);
  const [paymentInstructionsBn, setPaymentInstructionsBn] = useState(
    policy.paymentInstructionsBn
  );

  const [savingPolicy, setSavingPolicy] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Enrollment queue state
  const [reqFilter, setReqFilter] = useState<'all' | EnrollmentRequestStatus>('pending');
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewNoteById, setReviewNoteById] = useState<Record<string, string>>({});
  const [reviewDaysById, setReviewDaysById] = useState<Record<string, number>>({});

  // Direct per-user access override state
  const [targetUidInput, setTargetUidInput] = useState('');
  const [targetTier, setTargetTier] = useState<AccessTier>('enrolled_pro');
  const [targetDays, setTargetDays] = useState<number>(365);
  const [applyingTier, setApplyingTier] = useState(false);

  // Sync draft state when Firestore policy changes
  useEffect(() => {
    setTrialDurationDays(policy.trialDurationDays);
    setProPriceBdt(policy.proPriceBdt);
    setProDurationDays(policy.proDurationDays);
    setRequireSignInForAccess(policy.requireSignInForAccess);
    setFreeDailyQuestionLimit(policy.freeDailyQuestionLimit);
    setFreeQuestionBankLimit(policy.freeQuestionBankLimit);
    setFreeVisualLessonLimit(policy.freeVisualLessonLimit);
    setAllowFreePractice(policy.allowFreePractice);
    setAllowFreeFlashcards(policy.allowFreeFlashcards);
    setAllowFreeQuestionBank(policy.allowFreeQuestionBank);
    setAllowFreeWrongBank(policy.allowFreeWrongBank);
    setAllowFreeMockTest(policy.allowFreeMockTest);
    setAllowFreeMedicalModel(policy.allowFreeMedicalModel);
    setAllowFreeVisualHub(policy.allowFreeVisualHub);
    setAllowFreeWorksheets(policy.allowFreeWorksheets);
    setBkashNumber(policy.bkashNumber);
    setNagadNumber(policy.nagadNumber);
    setRocketNumber(policy.rocketNumber);
    setPaymentInstructionsBn(policy.paymentInstructionsBn);
  }, [policy]);

  const kpiStats = useMemo(() => {
    const now = Date.now();
    const pendingCount = enrollmentRequests.filter((r) => r.status === 'pending').length;
    const proCount = users.filter((u) => {
      if (u.accessTier === 'lifetime_vip') return true;
      if (u.accessTier === 'enrolled_pro') {
        return !u.accessExpiresAtMs || u.accessExpiresAtMs > now;
      }
      return false;
    }).length;
    const trialCount = users.filter((u) => {
      const tier = u.accessTier || 'free_trial';
      if (tier !== 'free_trial') return false;
      const exp =
        u.accessExpiresAtMs ??
        (u.accessStartsAtMs ?? u.createdAtMs) + policy.trialDurationDays * DAY_MS;
      return exp > now;
    }).length;
    return { pendingCount, proCount, trialCount };
  }, [enrollmentRequests, users, policy.trialDurationDays]);

  const filteredRequests = useMemo(() => {
    if (reqFilter === 'all') return enrollmentRequests;
    return enrollmentRequests.filter((r) => r.status === reqFilter);
  }, [enrollmentRequests, reqFilter]);

  const applyPreset = (preset: 'standard' | 'open_campaign' | 'strict_pro') => {
    setFeedback(null);
    if (preset === 'standard') {
      setTrialDurationDays(7);
      setProPriceBdt(500);
      setProDurationDays(365);
      setRequireSignInForAccess(true);
      setFreeDailyQuestionLimit(15);
      setFreeQuestionBankLimit(40);
      setFreeVisualLessonLimit(3);
      setAllowFreePractice(true);
      setAllowFreeFlashcards(true);
      setAllowFreeQuestionBank(true);
      setAllowFreeWrongBank(true);
      setAllowFreeMockTest(true);
      setAllowFreeMedicalModel(false);
      setAllowFreeVisualHub(true);
      setAllowFreeWorksheets(false);
      return;
    }
    if (preset === 'open_campaign') {
      setTrialDurationDays(14);
      setProPriceBdt(500);
      setProDurationDays(365);
      setRequireSignInForAccess(false);
      setFreeDailyQuestionLimit(40);
      setFreeQuestionBankLimit(150);
      setFreeVisualLessonLimit(8);
      setAllowFreePractice(true);
      setAllowFreeFlashcards(true);
      setAllowFreeQuestionBank(true);
      setAllowFreeWrongBank(true);
      setAllowFreeMockTest(true);
      setAllowFreeMedicalModel(true);
      setAllowFreeVisualHub(true);
      setAllowFreeWorksheets(true);
      return;
    }
    setTrialDurationDays(3);
    setProPriceBdt(500);
    setProDurationDays(365);
    setRequireSignInForAccess(true);
    setFreeDailyQuestionLimit(10);
    setFreeQuestionBankLimit(20);
    setFreeVisualLessonLimit(2);
    setAllowFreePractice(true);
    setAllowFreeFlashcards(false);
    setAllowFreeQuestionBank(true);
    setAllowFreeWrongBank(false);
    setAllowFreeMockTest(false);
    setAllowFreeMedicalModel(false);
    setAllowFreeVisualHub(true);
    setAllowFreeWorksheets(false);
  };

  const handleSavePolicySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPolicy(true);
    setFeedback(null);
    try {
      await onSavePolicy({
        trialDurationDays,
        proPriceBdt,
        proDurationDays,
        requireSignInForAccess,
        freeDailyQuestionLimit,
        freeQuestionBankLimit,
        freeVisualLessonLimit,
        allowFreePractice,
        allowFreeFlashcards,
        allowFreeQuestionBank,
        allowFreeWrongBank,
        allowFreeMockTest,
        allowFreeMedicalModel,
        allowFreeVisualHub,
        allowFreeWorksheets,
        bkashNumber,
        nagadNumber,
        rocketNumber,
        paymentInstructionsBn,
      });
      setFeedback({
        type: 'success',
        text: 'ডায়নামিক অ্যাক্সেস পলিসি ও প্ল্যান সেটিংস সফলভাবে ক্লাউডে সংরক্ষণ ও সক্রিয় হয়েছে!',
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'অ্যাক্সেস পলিসি সংরক্ষণ করা যায়নি।',
      });
    } finally {
      setSavingPolicy(false);
    }
  };

  const handleReviewDecision = async (
    req: EnrollmentRequestRecord,
    decision: 'approved' | 'rejected'
  ) => {
    setReviewingId(req.id);
    setFeedback(null);
    try {
      const note = reviewNoteById[req.id] ?? '';
      const days = reviewDaysById[req.id] ?? req.durationDays ?? policy.proDurationDays;
      await onReviewRequest(req, decision, {
        adminNote: note,
        durationDays: days,
      });
      setFeedback({
        type: 'success',
        text:
          decision === 'approved'
            ? `${req.userName}-এর জন্য ${toBnDigits(days)} দিনের ফুল প্রো এক্সেস অনুমোদিত ও সক্রিয় হয়েছে!`
            : `${req.userName}-এর এনরোলমেন্ট অনুরোধ বাতিল করা হয়েছে।`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'অনুরোধ পর্যালোচনা সম্পন্ন করা যায়নি।',
      });
    } finally {
      setReviewingId(null);
    }
  };

  const handleApplyDirectTier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUidInput.trim()) {
      setFeedback({ type: 'error', text: 'প্রথমে একজন শিক্ষার্থী নির্বাচন করুন অথবা UID লিখুন।' });
      return;
    }
    setApplyingTier(true);
    setFeedback(null);
    try {
      const customDays =
        targetTier === 'enrolled_pro' || targetTier === 'free_trial' ? targetDays : undefined;
      await onSetUserAccessTier(targetUidInput.trim(), targetTier, customDays);
      setFeedback({
        type: 'success',
        text: `ইউজার (${targetUidInput.trim()}) এর অ্যাক্সেস স্তর "${ACCESS_TIER_LABELS[targetTier]}" হিসেবে আপডেট হয়েছে!`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'অ্যাক্সেস স্তর আপডেট করা যায়নি।',
      });
    } finally {
      setApplyingTier(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">অপেক্ষমাণ অনুরোধ</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-300" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-amber-700 dark:text-amber-300">
            {toBnDigits(kpiStats.pendingCount)}
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">এনরোলমেন্ট যাচাই বাকি</div>
        </div>

        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">সক্রিয় প্রো / VIP</span>
            <Crown className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-emerald-700 dark:text-emerald-300">
            {toBnDigits(kpiStats.proCount)}
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">১ বছর আনলিমিটেড এক্সেস</div>
        </div>

        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">সক্রিয় ফ্রি ট্রায়াল</span>
            <UserCheck className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD]">
            {toBnDigits(kpiStats.trialCount)}
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">
            {toBnDigits(policy.trialDurationDays)} দিনের ট্রায়ালে সচল
          </div>
        </div>

        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">বর্তমান প্ল্যান রেট</span>
            <CreditCard className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
            {toBnDigits(policy.proPriceBdt)}৳
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">
            {toBnDigits(policy.trialDurationDays)} দিন ফ্রি · {toBnDigits(policy.proDurationDays)} দিন প্রো
          </div>
        </div>
      </div>

      {feedback && (
        <div
          className={`px-4 py-3 rounded-xl text-xs font-medium border flex items-center justify-between gap-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-50/85 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-400/35 text-emerald-900 dark:text-emerald-200'
              : 'bg-rose-50/85 dark:bg-rose-950/60 border-rose-300 dark:border-rose-400/35 text-rose-900 dark:text-rose-200'
          }`}
        >
          <span>{feedback.text}</span>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[11px] font-semibold underline shrink-0"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* Smart 1-Click Presets */}
      <div className="bio-card rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
            <Sparkles className="w-4 h-4" />
            স্মার্ট ১-ক্লিক অ্যাক্সেস প্রিসেট (Instant Rule Templates)
          </div>
          <span className="text-[11px] text-[#554578] dark:text-[#A598C9]">
            প্রিসেট বেছে নিয়ে নিচে সংরক্ষণ করুন বা প্রয়োজনমতো কাস্টমাইজ করুন
          </span>
        </div>
        <div className="grid sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => applyPreset('standard')}
            className="glass-btn-secondary text-left p-3.5 rounded-xl space-y-1 hover:border-[#6D4ACF]/50"
          >
            <div className="text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              স্ট্যান্ডার্ড: ৭ দিন ফ্রি + ৫০০৳/বছর
            </div>
            <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">
              দৈনিক ১৫ প্রশ্ন ফ্রি, মডেল টেস্ট ও ওয়ার্কশীট প্রো-লকড
            </div>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('open_campaign')}
            className="glass-btn-secondary text-left p-3.5 rounded-xl space-y-1 hover:border-emerald-500/50"
          >
            <div className="text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              ওপেন ক্যাম্পেইন মোড (১৪ দিন)
            </div>
            <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">
              গেস্ট প্রিভিউ খোলা, দৈনিক ৪০ প্রশ্ন ও সব মডিউল স্যাম্পল চালু
            </div>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('strict_pro')}
            className="glass-btn-secondary text-left p-3.5 rounded-xl space-y-1 hover:border-amber-500/50"
          >
            <div className="text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              স্ট্রিক্ট এডমিশন প্রো মোড
            </div>
            <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">
              ৩ দিন ট্রায়াল, দৈনিক ১০ প্রশ্ন, প্রিমিয়াম টেস্ট শুধুমাত্র প্রো-তে
            </div>
          </button>
        </div>
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Dynamic Access Policy Builder */}
        <form
          onSubmit={(e) => void handleSavePolicySubmit(e)}
          className="lg:col-span-7 bio-card rounded-2xl p-5 sm:p-6 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF] inline-flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                অ্যাক্সেস পলিসি ও সীমাবদ্ধতা কনফিগারেশন
              </h2>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                এখানে করা যেকোনো পরিবর্তন সাথে সাথেই সব শিক্ষার্থীর অ্যাপে লাইভ কার্যকর হবে।
              </p>
            </div>
          </div>

          {/* Core Duration & Price */}
          <div className="bio-subpanel rounded-xl p-4 space-y-3.5">
            <div className="text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
              ১. ফ্রি ট্রায়াল ও বার্ষিক প্রো এনরোলমেন্ট মূল্য
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  ফ্রি ট্রায়াল মেয়াদ (দিন)
                </label>
                <input
                  type="number"
                  min={1}
                  max={90}
                  value={trialDurationDays}
                  onChange={(e) => setTrialDurationDays(Number(e.target.value))}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  প্রো এনরোলমেন্ট ফি (টাকা)
                </label>
                <input
                  type="number"
                  min={0}
                  max={50000}
                  value={proPriceBdt}
                  onChange={(e) => setProPriceBdt(Number(e.target.value))}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  প্রো ফুল এক্সেস মেয়াদ (দিন)
                </label>
                <input
                  type="number"
                  min={1}
                  max={1825}
                  value={proDurationDays}
                  onChange={(e) => setProDurationDays(Number(e.target.value))}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
            </div>

            <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-white/60 dark:bg-white/6 border border-white/85 dark:border-white/12 cursor-pointer">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                  গুগল সাইন-ইন বাধ্যতামূলক করুন
                </div>
                <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">
                  চালু থাকলে শিক্ষার্থীরা সাইন-ইন না করে প্র্যাকটিস/পরীক্ষা ট্যাবে প্রবেশ করতে পারবে না (ড্যাশবোর্ড বাদে)।
                </div>
              </div>
              <input
                type="checkbox"
                checked={requireSignInForAccess}
                onChange={(e) => setRequireSignInForAccess(e.target.checked)}
                className="w-4 h-4 accent-[#6D4ACF] shrink-0"
              />
            </label>
          </div>

          {/* Numeric Quotas for Free Tier */}
          <div className="bio-subpanel rounded-xl p-4 space-y-3.5">
            <div className="text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
              ২. ফ্রি ট্রায়াল লিমিট ও কোটা নিয়ন্ত্রণ
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  দৈনিক প্রশ্ন সীমা
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={freeDailyQuestionLimit}
                  onChange={(e) => setFreeDailyQuestionLimit(Number(e.target.value))}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  প্রশ্ন ব্যাংক প্রিভিউ (টি)
                </label>
                <input
                  type="number"
                  min={1}
                  max={2000}
                  value={freeQuestionBankLimit}
                  onChange={(e) => setFreeQuestionBankLimit(Number(e.target.value))}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  ভিজ্যুয়াল লেকচার (টি)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={freeVisualLessonLimit}
                  onChange={(e) => setFreeVisualLessonLimit(Number(e.target.value))}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
            </div>
          </div>

          {/* Module Toggles on Free Trial */}
          <div className="bio-subpanel rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
              ৩. ফ্রি ট্রায়ালে কোন মডিউলগুলো খোলা থাকবে
            </div>
            <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
              {[
                {
                  label: 'র‍্যান্ডম MCQ প্র্যাকটিস',
                  checked: allowFreePractice,
                  onChange: setAllowFreePractice,
                },
                {
                  label: 'ফ্ল্যাশকার্ড রিভিশন মোড',
                  checked: allowFreeFlashcards,
                  onChange: setAllowFreeFlashcards,
                },
                {
                  label: 'বোর্ড ও এডমিশন প্রশ্ন ব্যাংক',
                  checked: allowFreeQuestionBank,
                  onChange: setAllowFreeQuestionBank,
                },
                {
                  label: 'ভুলের ভান্ডার (Wrong Bank)',
                  checked: allowFreeWrongBank,
                  onChange: setAllowFreeWrongBank,
                },
                {
                  label: 'বিষয়ভিত্তিক মক টেস্ট',
                  checked: allowFreeMockTest,
                  onChange: setAllowFreeMockTest,
                },
                {
                  label: '১০০ নম্বরের মেডিকেল মডেল টেস্ট',
                  checked: allowFreeMedicalModel,
                  onChange: setAllowFreeMedicalModel,
                },
                {
                  label: 'ভিজ্যুয়াল ইনফোগ্রাফ ও ভিডিও',
                  checked: allowFreeVisualHub,
                  onChange: setAllowFreeVisualHub,
                },
                {
                  label: 'টপিক ওয়ার্কশীট লাইব্রেরি',
                  checked: allowFreeWorksheets,
                  onChange: setAllowFreeWorksheets,
                },
              ].map((toggle) => (
                <label
                  key={toggle.label}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/60 dark:bg-white/6 border border-white/85 dark:border-white/12 cursor-pointer"
                >
                  <span className="font-medium text-[#1D1336] dark:text-[#F4F0FF]">
                    {toggle.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={toggle.checked}
                    onChange={(e) => toggle.onChange(e.target.checked)}
                    className="w-4 h-4 accent-[#6D4ACF] shrink-0"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="bio-subpanel rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
              ৪. এনরোলমেন্ট পেমেন্ট নম্বর ও নির্দেশনা
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  বিকাশ নম্বর
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={bkashNumber}
                  onChange={(e) => setBkashNumber(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="glass-input w-full px-3 py-2 text-xs font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  নগদ নম্বর
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={nagadNumber}
                  onChange={(e) => setNagadNumber(e.target.value)}
                  placeholder="018XXXXXXXX"
                  className="glass-input w-full px-3 py-2 text-xs font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  রকেট নম্বর (ঐচ্ছিক)
                </label>
                <input
                  type="text"
                  maxLength={30}
                  value={rocketNumber}
                  onChange={(e) => setRocketNumber(e.target.value)}
                  placeholder="019XXXXXXXX"
                  className="glass-input w-full px-3 py-2 text-xs font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                শিক্ষার্থীদের জন্য পেমেন্ট নির্দেশনা
              </label>
              <textarea
                rows={2}
                maxLength={600}
                value={paymentInstructionsBn}
                onChange={(e) => setPaymentInstructionsBn(e.target.value)}
                className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={savingPolicy}
            className="glass-btn-primary w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 text-xs sm:text-sm font-semibold rounded-xl disabled:opacity-55"
          >
            <Save className="w-4 h-4" />
            {savingPolicy
              ? 'সংরক্ষণ হচ্ছে...'
              : 'অ্যাক্সেস পলিসি ক্লাউডে সংরক্ষণ ও প্রয়োগ করুন'}
          </button>
        </form>

        {/* Right Column: Enrollment Review Queue + Direct User Tier Override */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card A: Enrollment Review Queue */}
          <div className="bio-card rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  ৫০০৳ প্রো এনরোলমেন্ট আবেদন কিউ
                </h3>
                <p className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">
                  {isBootstrappedAdmin
                    ? 'শিক্ষার্থীদের TrxID যাচাই করে ১ ক্লিকে ১ বছরের ফুল এক্সেস চালু করুন।'
                    : 'পূর্ণাঙ্গ আবেদন তালিকা শুধুমাত্র প্রধান সুপার এডমিনের জন্য দৃশ্যমান।'}
                </p>
              </div>
            </div>

            <div className="glass-segment-track grid grid-cols-4 gap-1 p-1 rounded-xl">
              {[
                { id: 'pending' as const, label: 'অপেক্ষমাণ' },
                { id: 'approved' as const, label: 'অনুমোদিত' },
                { id: 'rejected' as const, label: 'বাতিল' },
                { id: 'all' as const, label: 'সব' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setReqFilter(t.id)}
                  className={`py-1.5 text-[11px] font-semibold rounded-lg transition-all ${
                    reqFilter === t.id
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
              {filteredRequests.length === 0 ? (
                <div className="bio-subpanel rounded-xl p-6 text-center text-xs text-[#554578] dark:text-[#B6ABD6]">
                  এই ক্যাটাগরিতে কোনো এনরোলমেন্ট আবেদন নেই।
                </div>
              ) : (
                filteredRequests.map((req) => {
                  const isBusy = reviewingId === req.id;
                  const daysValue = reviewDaysById[req.id] ?? req.durationDays;
                  const noteValue = reviewNoteById[req.id] ?? req.adminNote ?? '';
                  return (
                    <div key={req.id} className="bio-subpanel rounded-xl p-3.5 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF] truncate">
                            {req.userName}
                          </div>
                          <div className="text-[11px] text-[#554578] dark:text-[#B6ABD6] truncate">
                            {req.userEmail}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-lg border ${
                            req.status === 'approved'
                              ? 'bg-emerald-50/90 dark:bg-emerald-950/65 border-emerald-200 dark:border-emerald-400/35 text-emerald-700 dark:text-emerald-300'
                              : req.status === 'rejected'
                                ? 'bg-rose-50/90 dark:bg-rose-950/65 border-rose-200 dark:border-rose-400/35 text-rose-700 dark:text-rose-300'
                                : 'bg-amber-50/90 dark:bg-amber-950/65 border-amber-200 dark:border-amber-400/35 text-amber-800 dark:text-amber-200'
                          }`}
                        >
                          {req.status === 'approved'
                            ? 'অনুমোদিত'
                            : req.status === 'rejected'
                              ? 'বাতিল'
                              : 'অপেক্ষমাণ'}
                        </span>
                      </div>

                      <div className="text-[11px] text-[#1D1336] dark:text-[#E2DAFA] bg-white/60 dark:bg-white/6 rounded-lg p-2.5 space-y-1 font-mono-tabular">
                        <div>
                          মাধ্যম: <strong>{req.paymentMethod.toUpperCase()}</strong> · পরিমাণ:{' '}
                          <strong>{toBnDigits(req.amountBdt)}৳</strong> · মেয়াদ:{' '}
                          <strong>{toBnDigits(req.durationDays)} দিন</strong>
                        </div>
                        <div>
                          TrxID: <strong className="text-[#6D4ACF] dark:text-[#C4B5FD]">{req.transactionId}</strong> · প্রেরক: {req.senderNumber}
                        </div>
                        {req.studentNote && (
                          <div className="font-sans text-[#554578] dark:text-[#B6ABD6]">
                            নোট: {req.studentNote}
                          </div>
                        )}
                        <div className="font-sans text-[10px] text-[#554578] dark:text-[#A598C9]">
                          তারিখ: {formatDateBn(req.createdAtMs)}
                        </div>
                      </div>

                      {req.status === 'pending' && (
                        <div className="space-y-2 pt-1">
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-[10px] text-[#554578] dark:text-[#A598C9] mb-0.5">
                                মেয়াদ (দিন)
                              </label>
                              <input
                                type="number"
                                min={1}
                                max={1825}
                                value={daysValue}
                                onChange={(e) =>
                                  setReviewDaysById((prev) => ({
                                    ...prev,
                                    [req.id]: Number(e.target.value),
                                  }))
                                }
                                className="glass-input w-full px-2 py-1 text-xs font-mono-tabular rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                              />
                            </div>
                            <div className="col-span-2">
                              <label className="block text-[10px] text-[#554578] dark:text-[#A598C9] mb-0.5">
                                অ্যাডমিন মন্তব্য (ঐচ্ছিক)
                              </label>
                              <input
                                type="text"
                                maxLength={300}
                                value={noteValue}
                                onChange={(e) =>
                                  setReviewNoteById((prev) => ({
                                    ...prev,
                                    [req.id]: e.target.value,
                                  }))
                                }
                                placeholder="যাচাই নোট..."
                                className="glass-input w-full px-2 py-1 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleReviewDecision(req, 'approved')}
                              className="flex-1 glass-btn-primary inline-flex items-center justify-center gap-1 py-1.5 px-3 text-xs font-semibold rounded-lg disabled:opacity-50"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {isBusy ? 'হচ্ছে...' : 'অনুমোদন ও প্রো চালু'}
                            </button>
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() => void handleReviewDecision(req, 'rejected')}
                              className="glass-btn-secondary inline-flex items-center justify-center gap-1 py-1.5 px-3 text-xs font-semibold text-rose-700 dark:text-rose-300 rounded-lg disabled:opacity-50"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              বাতিল
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Card B: Direct Per-User Access Tier Control */}
          <form onSubmit={(e) => void handleApplyDirectTier(e)} className="bio-card rounded-2xl p-5 space-y-3.5">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-[#1D1336] dark:text-[#F4F0FF] inline-flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                সরাসরি ইউজারের অ্যাক্সেস স্তর পরিবর্তন
              </h3>
              <p className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">
                যেকোনো শিক্ষার্থীর জন্য তাৎক্ষণিক ফ্রি ট্রায়াল, ১ বছর প্রো, VIP বা সীমিত এক্সেস সেট করুন।
              </p>
            </div>

            {users.length > 0 && (
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  নিবন্ধিত শিক্ষার্থী নির্বাচন করুন
                </label>
                <select
                  value={users.some((u) => u.uid === targetUidInput) ? targetUidInput : ''}
                  onChange={(e) => setTargetUidInput(e.target.value)}
                  className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                >
                  <option value="">তালিকা থেকে বাছুন অথবা নিচে UID দিন...</option>
                  {users.map((u) => (
                    <option key={u.uid} value={u.uid}>
                      {u.displayName} ({u.email}) — {ACCESS_TIER_LABELS[u.accessTier || 'free_trial']}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                ইউজার UID *
              </label>
              <input
                type="text"
                required
                value={targetUidInput}
                onChange={(e) => setTargetUidInput(e.target.value)}
                placeholder="Firebase User UID..."
                className="glass-input w-full px-3 py-2 text-xs font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  অ্যাক্সেস স্তর
                </label>
                <select
                  value={targetTier}
                  onChange={(e) => {
                    const nextTier = e.target.value as AccessTier;
                    setTargetTier(nextTier);
                    if (nextTier === 'enrolled_pro') setTargetDays(policy.proDurationDays);
                    else if (nextTier === 'free_trial') setTargetDays(policy.trialDurationDays);
                  }}
                  className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                >
                  <option value="free_trial">ফ্রি ট্রায়াল</option>
                  <option value="enrolled_pro">১ বছর প্রো (Enrolled)</option>
                  <option value="lifetime_vip">লাইফটাইম VIP</option>
                  <option value="restricted">সীমিত (Restricted)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  মেয়াদ (দিন)
                </label>
                <input
                  type="number"
                  min={1}
                  max={1825}
                  disabled={targetTier === 'lifetime_vip' || targetTier === 'restricted'}
                  value={targetDays}
                  onChange={(e) => setTargetDays(Number(e.target.value))}
                  className="glass-input w-full px-3 py-2 text-xs font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF] disabled:opacity-45"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setTargetTier('free_trial');
                  setTargetDays(7);
                }}
                className="glass-btn-secondary px-2.5 py-1 text-[11px] font-medium rounded-lg"
              >
                ৭ দিন ফ্রি
              </button>
              <button
                type="button"
                onClick={() => {
                  setTargetTier('enrolled_pro');
                  setTargetDays(365);
                }}
                className="glass-btn-secondary px-2.5 py-1 text-[11px] font-medium rounded-lg text-emerald-700 dark:text-emerald-300"
              >
                ৩৬৫ দিন প্রো (৫০০৳)
              </button>
              <button
                type="button"
                onClick={() => setTargetTier('lifetime_vip')}
                className="glass-btn-secondary px-2.5 py-1 text-[11px] font-medium rounded-lg text-[#6D4ACF] dark:text-[#C4B5FD]"
              >
                লাইফটাইম VIP
              </button>
              <button
                type="button"
                onClick={() => setTargetTier('restricted')}
                className="glass-btn-secondary px-2.5 py-1 text-[11px] font-medium rounded-lg text-rose-700 dark:text-rose-300 inline-flex items-center gap-1"
              >
                <Lock className="w-3 h-3" />
                সীমিত
              </button>
            </div>

            <button
              type="submit"
              disabled={applyingTier}
              className="glass-btn-primary w-full inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-semibold rounded-xl disabled:opacity-55"
            >
              <ShieldCheck className="w-4 h-4" />
              {applyingTier ? 'আপডেট হচ্ছে...' : 'অ্যাক্সেস স্তর প্রয়োগ করুন'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
