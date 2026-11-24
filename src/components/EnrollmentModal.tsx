import React, { useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Crown,
  Lock,
  ShieldCheck,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  AccessPolicyConfig,
  EnrollmentRequestRecord,
  PaymentMethod,
  ResolvedUserAccess,
} from '../types/learning';

interface EnrollmentModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  displayName: string;
  policy: AccessPolicyConfig;
  resolvedAccess: ResolvedUserAccess;
  myRequests: EnrollmentRequestRecord[];
  onSignIn: () => void;
  onSubmitEnrollment: (input: {
    userName: string;
    paymentMethod: PaymentMethod;
    senderNumber: string;
    transactionId: string;
    studentNote: string;
  }) => Promise<void>;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  bkash: 'বিকাশ (bKash)',
  nagad: 'নগদ (Nagad)',
  rocket: 'রকেট (Rocket)',
  bank: 'ব্যাংক ট্রান্সফার',
};

function formatDateBn(ms: number | null | undefined): string {
  if (!ms) return '';
  try {
    return new Date(ms).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  open,
  onClose,
  user,
  displayName,
  policy,
  resolvedAccess,
  myRequests,
  onSignIn,
  onSubmitEnrollment,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [studentNote, setStudentNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const hasPendingRequest = myRequests.some((r) => r.status === 'pending');

  const handleCopyNumber = async (key: string, val: string) => {
    if (!val.trim()) return;
    try {
      await navigator.clipboard.writeText(val.trim());
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey((prev) => (prev === key ? null : prev)), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!user) {
      onSignIn();
      return;
    }
    if (senderNumber.trim().length < 4) {
      setFeedback({ type: 'error', text: 'আপনার পাঠানো মোবাইল/অ্যাকাউন্ট নম্বরটি সঠিকভাবে লিখুন।' });
      return;
    }
    if (transactionId.trim().length < 3) {
      setFeedback({ type: 'error', text: 'সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন।' });
      return;
    }

    setSubmitting(true);
    try {
      await onSubmitEnrollment({
        userName: displayName || user.displayName || 'শিক্ষার্থী',
        paymentMethod,
        senderNumber: senderNumber.trim(),
        transactionId: transactionId.trim(),
        studentNote: studentNote.trim(),
      });
      setSenderNumber('');
      setTransactionId('');
      setStudentNote('');
      setFeedback({
        type: 'success',
        text: 'আপনার এনরোলমেন্ট অনুরোধ জমা হয়েছে! সুপার এডমিন যাচাই করার সাথে সাথেই ১ বছরের ফুল এক্সেস সক্রিয় হবে।',
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'অনুরোধ জমা দেওয়া যায়নি। আবার চেষ্টা করুন।',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F0920]/65 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrollment-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bio-card w-full max-w-4xl rounded-3xl p-5 sm:p-7 space-y-6 my-auto max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
              <Crown className="w-4 h-4" />
              অ্যাক্সেস প্ল্যান ও বার্ষিক এনরোলমেন্ট
            </div>
            <h2
              id="enrollment-modal-title"
              className="text-xl sm:text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]"
            >
              আপনার প্রস্তুতির সঠিক প্ল্যান বেছে নিন
            </h2>
            <p className="text-xs sm:text-sm text-[#554578] dark:text-[#B6ABD6]">
              বর্তমান অবস্থা:{' '}
              <strong className="text-[#1D1336] dark:text-[#F4F0FF]">
                {resolvedAccess.labelBn}
              </strong>
              {resolvedAccess.expiresAtMs && !resolvedAccess.isExpired
                ? ` · মেয়াদ শেষ: ${formatDateBn(resolvedAccess.expiresAtMs)}`
                : ''}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="glass-btn-secondary w-9 h-9 rounded-xl inline-flex items-center justify-center text-[#554578] dark:text-[#B6ABD6] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Plan Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Free Trial Card */}
          <div
            className={`rounded-2xl p-5 space-y-4 ${
              resolvedAccess.tier === 'free_trial' ? 'glass-option-selected' : 'bio-subpanel'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                  সাইন-ইন ফ্রি ট্রায়াল
                </div>
                <h3 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF] mt-0.5">
                  {toBnDigits(policy.trialDurationDays)} দিনের লিমিটেড এক্সেস
                </h3>
              </div>
              <div className="text-right font-mono-tabular">
                <div className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">ফ্রি</div>
                <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">
                  {toBnDigits(policy.trialDurationDays)} দিন
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#1D1336] dark:text-[#E2DAFA]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  দৈনিক সর্বোচ্চ{' '}
                  <strong className="font-mono-tabular">
                    {toBnDigits(policy.freeDailyQuestionLimit)}
                  </strong>
                  টি MCQ অনুশীলন
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  বোর্ড ও এডমিশন প্রশ্ন ব্যাংকের{' '}
                  <strong className="font-mono-tabular">
                    {toBnDigits(policy.freeQuestionBankLimit)}
                  </strong>
                  টি প্রশ্ন প্রিভিউ
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  ভিজ্যুয়াল হাবের{' '}
                  <strong className="font-mono-tabular">
                    {toBnDigits(policy.freeVisualLessonLimit)}
                  </strong>
                  টি ইনফোগ্রাফ ও ভিডিও লেকচার
                </span>
              </li>
              <li className="flex items-start gap-2">
                {policy.allowFreeMedicalModel ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <span>
                  ১০০ নম্বরের মেডিকেল ও ডেন্টাল মডেল টেস্ট{' '}
                  {policy.allowFreeMedicalModel ? 'উন্মুক্ত' : '(প্রো-তে আনলক)'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                {policy.allowFreeWorksheets ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <span>
                  টপিক ওয়ার্কশীট লাইব্রেরি{' '}
                  {policy.allowFreeWorksheets ? 'উন্মুক্ত' : '(প্রো-তে আনলক)'}
                </span>
              </li>
            </ul>

            {!user && (
              <button
                type="button"
                onClick={onSignIn}
                className="glass-btn-secondary w-full py-2.5 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] rounded-xl"
              >
                গুগল দিয়ে সাইন-ইন করে ফ্রি শুরু করুন
              </button>
            )}
          </div>

          {/* Annual Pro Plan Card */}
          <div className="glass-hero-card rounded-2xl p-5 space-y-4 border border-[#8B5CF6]/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                  <Sparkles className="w-3.5 h-3.5" />
                  অ্যানুয়াল প্রো ফুল এক্সেস
                </div>
                <h3 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF] mt-0.5">
                  ১ বছরের সম্পূর্ণ আনলিমিটেড এক্সেস
                </h3>
              </div>
              <div className="text-right font-mono-tabular">
                <div className="text-2xl font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                  {toBnDigits(policy.proPriceBdt)}৳
                </div>
                <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">
                  {toBnDigits(policy.proDurationDays)} দিন মেয়াদ
                </div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#1D1336] dark:text-[#E2DAFA]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>দৈনিক কোনো সীমা ছাড়াই আনলিমিটেড MCQ প্র্যাকটিস ও ফ্ল্যাশকার্ড</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>সকল সালের বোর্ড ও বিগত MBBS/BDS প্রশ্ন ব্যাংক সম্পূর্ণ আনলক</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>১০০ নম্বরের মেডিকেল ও ডেন্টাল পূর্ণাঙ্গ মডেল টেস্ট + নেগেটিভ মার্কিং</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>সব ইনফোগ্রাফ, স্মার্টবোর্ড ভিডিও লেকচার ও সৃজনশীল ওয়ার্কশীট লাইব্রেরি</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>ভুলের ভান্ডার, অধ্যায়ভিত্তিক দুর্বলতা বিশ্লেষণ ও ডেইলি টপ পারফর্মার্স</span>
              </li>
            </ul>

            {resolvedAccess.hasFullAccess && (
              <div className="p-3 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-400/35 text-xs font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>আপনার ফুল এক্সেস ইতিমধ্যেই সক্রিয় রয়েছে!</span>
              </div>
            )}
          </div>
        </div>

        {/* Enrollment Payment Form */}
        {!resolvedAccess.hasFullAccess && (
          <div className="bio-subpanel rounded-2xl p-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                {toBnDigits(policy.proPriceBdt)} টাকা পরিশোধ করে {toBnDigits(policy.proDurationDays)} দিনের ফুল এক্সেস এনরোল করুন
              </h3>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                {policy.paymentInstructionsBn}
              </p>
            </div>

            {/* Active Merchant/Personal Numbers */}
            <div className="grid sm:grid-cols-3 gap-2.5">
              {[
                { key: 'bkash', label: 'বিকাশ (bKash)', number: policy.bkashNumber },
                { key: 'nagad', label: 'নগদ (Nagad)', number: policy.nagadNumber },
                { key: 'rocket', label: 'রকেট (Rocket)', number: policy.rocketNumber },
              ]
                .filter((item) => item.number.trim().length > 0)
                .map((item) => (
                  <div
                    key={item.key}
                    className="p-3 rounded-xl bg-white/75 dark:bg-white/8 border border-white/85 dark:border-white/15 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                        {item.label}
                      </div>
                      <div className="text-sm font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] truncate">
                        {item.number}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleCopyNumber(item.key, item.number)}
                      className="glass-btn-secondary px-2.5 py-1.5 text-[11px] font-semibold rounded-lg inline-flex items-center gap-1 shrink-0"
                    >
                      {copiedKey === item.key ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          কপি হয়েছে
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          কপি
                        </>
                      )}
                    </button>
                  </div>
                ))}
            </div>

            {feedback && (
              <div
                className={`px-4 py-3 rounded-xl text-xs font-medium border ${
                  feedback.type === 'success'
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/65 border-emerald-300 dark:border-emerald-400/35 text-emerald-900 dark:text-emerald-200'
                    : 'bg-rose-50/90 dark:bg-rose-950/65 border-rose-300 dark:border-rose-400/35 text-rose-900 dark:text-rose-200'
                }`}
              >
                {feedback.text}
              </div>
            )}

            {!user ? (
              <div className="p-4 rounded-xl bg-white/70 dark:bg-white/8 border border-white/85 dark:border-white/12 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                  এনরোলমেন্ট অনুরোধ জমা দিতে প্রথমে আপনার গুগল অ্যাকাউন্ট দিয়ে সাইন-ইন করুন।
                </div>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="glass-btn-primary px-4 py-2 text-xs font-semibold rounded-xl shrink-0"
                >
                  গুগল দিয়ে সাইন-ইন করুন
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => void handleSubmit(e)} className="space-y-3.5">
                {hasPendingRequest && (
                  <div className="px-3.5 py-2.5 rounded-xl bg-amber-50/85 dark:bg-amber-950/55 border border-amber-300 dark:border-amber-400/35 text-xs text-amber-900 dark:text-amber-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>
                      আপনার একটি এনরোলমেন্ট অনুরোধ বর্তমানে সুপার এডমিনের অনুমোদনের অপেক্ষায় রয়েছে।
                    </span>
                  </div>
                )}

                <div className="grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      পেমেন্ট মাধ্যম
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    >
                      <option value="bkash">বিকাশ (bKash)</option>
                      <option value="nagad">নগদ (Nagad)</option>
                      <option value="rocket">রকেট (Rocket)</option>
                      <option value="bank">ব্যাংক ট্রান্সফার</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      আপনার প্রেরক নম্বর *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={30}
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="যেমন: 017XXXXXXXX"
                      className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      ট্রানজেকশন আইডি (TrxID) *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={80}
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="যেমন: BJK829X12A"
                      className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    অতিরিক্ত নোট (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    maxLength={300}
                    value={studentNote}
                    onChange={(e) => setStudentNote(e.target.value)}
                    placeholder="যেমন: রেফারেন্স নাম বা পেমেন্টের সময়..."
                    className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] text-[#554578] dark:text-[#A598C9]">
                    পরিশোধযোগ্য পরিমাণ:{' '}
                    <strong className="font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                      {toBnDigits(policy.proPriceBdt)} টাকা
                    </strong>{' '}
                    ({toBnDigits(policy.proDurationDays)} দিন ফুল এক্সেস)
                  </span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="glass-btn-primary px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl disabled:opacity-55"
                  >
                    {submitting ? 'জমা হচ্ছে...' : 'এনরোলমেন্ট অনুরোধ জমা দিন'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* User's Recent Enrollment Requests History */}
        {user && myRequests.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              আপনার এনরোলমেন্ট অনুরোধের ইতিহাস ({toBnDigits(myRequests.length)})
            </h4>
            <div className="space-y-2">
              {myRequests.slice(0, 5).map((req) => (
                <div
                  key={req.id}
                  className="bio-subpanel rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                      {PAYMENT_METHOD_LABELS[req.paymentMethod]} ·{' '}
                      <span className="font-mono-tabular">{toBnDigits(req.amountBdt)}৳</span> · TrxID:{' '}
                      <span className="font-mono-tabular">{req.transactionId}</span>
                    </div>
                    <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">
                      প্রেরক: {req.senderNumber} · তারিখ: {formatDateBn(req.createdAtMs)}
                      {req.adminNote ? ` · অ্যাডমিন নোট: ${req.adminNote}` : ''}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                      req.status === 'approved'
                        ? 'bg-emerald-50/90 dark:bg-emerald-950/65 border-emerald-200 dark:border-emerald-400/35 text-emerald-700 dark:text-emerald-300'
                        : req.status === 'rejected'
                          ? 'bg-rose-50/90 dark:bg-rose-950/65 border-rose-200 dark:border-rose-400/35 text-rose-700 dark:text-rose-300'
                          : 'bg-amber-50/90 dark:bg-amber-950/65 border-amber-200 dark:border-amber-400/35 text-amber-800 dark:text-amber-200'
                    }`}
                  >
                    {req.status === 'approved' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        অনুমোদিত
                      </>
                    ) : req.status === 'rejected' ? (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        বাতিল
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        যাচাই অপেক্ষমাণ
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
