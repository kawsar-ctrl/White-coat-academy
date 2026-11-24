import {
  collection,
  deleteField,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  AccessPolicyConfig,
  AccessTier,
  AppTab,
  EnrollmentRequestRecord,
  EnrollmentRequestStatus,
  PaymentMethod,
  ResolvedUserAccess,
  UserProfile,
} from '../types/learning';

export const DAY_MS = 24 * 60 * 60 * 1000;

export const DEFAULT_ACCESS_POLICY: AccessPolicyConfig = {
  id: 'accessPolicy',
  trialDurationDays: 7,
  proPriceBdt: 500,
  proDurationDays: 365,
  requireSignInForAccess: true,
  freeDailyQuestionLimit: 15,
  freeQuestionBankLimit: 40,
  freeVisualLessonLimit: 3,
  allowFreePractice: true,
  allowFreeFlashcards: true,
  allowFreeQuestionBank: true,
  allowFreeWrongBank: true,
  allowFreeMockTest: true,
  allowFreeMedicalModel: false,
  allowFreeVisualHub: true,
  allowFreeWorksheets: false,
  bkashNumber: '01700-000000',
  nagadNumber: '01800-000000',
  rocketNumber: '',
  paymentInstructionsBn:
    'Send Money (Personal) করে আপনার প্রাপক মোবাইল নম্বর ও ট্রানজেকশন আইডি (TrxID) নিচে জমা দিন। সুপার এডমিন যাচাই করার সাথে সাথেই ১ বছরের ফুল এক্সেস চালু হবে।',
  updatedByUid: 'system',
  updatedAtMs: 0,
};

function sanitizeId(raw: string, maxLen = 80): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, maxLen);
  return cleaned || `item_${Date.now()}`;
}

function toOptionalMs(val: unknown): number | undefined {
  if (val instanceof Timestamp) return val.toMillis();
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (
    val &&
    typeof val === 'object' &&
    'toMillis' in val &&
    typeof (val as { toMillis: unknown }).toMillis === 'function'
  ) {
    return (val as { toMillis: () => number }).toMillis();
  }
  return undefined;
}

function clampInt(value: number, min: number, max: number, fallback: number): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function mapAccessPolicyDoc(d: Record<string, unknown>): AccessPolicyConfig {
  return {
    id: 'accessPolicy',
    trialDurationDays: clampInt(Number(d.trialDurationDays), 1, 90, DEFAULT_ACCESS_POLICY.trialDurationDays),
    proPriceBdt: clampInt(Number(d.proPriceBdt), 0, 50000, DEFAULT_ACCESS_POLICY.proPriceBdt),
    proDurationDays: clampInt(Number(d.proDurationDays), 1, 1825, DEFAULT_ACCESS_POLICY.proDurationDays),
    requireSignInForAccess:
      typeof d.requireSignInForAccess === 'boolean'
        ? d.requireSignInForAccess
        : DEFAULT_ACCESS_POLICY.requireSignInForAccess,
    freeDailyQuestionLimit: clampInt(
      Number(d.freeDailyQuestionLimit),
      1,
      500,
      DEFAULT_ACCESS_POLICY.freeDailyQuestionLimit
    ),
    freeQuestionBankLimit: clampInt(
      Number(d.freeQuestionBankLimit),
      1,
      2000,
      DEFAULT_ACCESS_POLICY.freeQuestionBankLimit
    ),
    freeVisualLessonLimit: clampInt(
      Number(d.freeVisualLessonLimit),
      1,
      100,
      DEFAULT_ACCESS_POLICY.freeVisualLessonLimit
    ),
    allowFreePractice:
      typeof d.allowFreePractice === 'boolean'
        ? d.allowFreePractice
        : DEFAULT_ACCESS_POLICY.allowFreePractice,
    allowFreeFlashcards:
      typeof d.allowFreeFlashcards === 'boolean'
        ? d.allowFreeFlashcards
        : DEFAULT_ACCESS_POLICY.allowFreeFlashcards,
    allowFreeQuestionBank:
      typeof d.allowFreeQuestionBank === 'boolean'
        ? d.allowFreeQuestionBank
        : DEFAULT_ACCESS_POLICY.allowFreeQuestionBank,
    allowFreeWrongBank:
      typeof d.allowFreeWrongBank === 'boolean'
        ? d.allowFreeWrongBank
        : DEFAULT_ACCESS_POLICY.allowFreeWrongBank,
    allowFreeMockTest:
      typeof d.allowFreeMockTest === 'boolean'
        ? d.allowFreeMockTest
        : DEFAULT_ACCESS_POLICY.allowFreeMockTest,
    allowFreeMedicalModel:
      typeof d.allowFreeMedicalModel === 'boolean'
        ? d.allowFreeMedicalModel
        : DEFAULT_ACCESS_POLICY.allowFreeMedicalModel,
    allowFreeVisualHub:
      typeof d.allowFreeVisualHub === 'boolean'
        ? d.allowFreeVisualHub
        : DEFAULT_ACCESS_POLICY.allowFreeVisualHub,
    allowFreeWorksheets:
      typeof d.allowFreeWorksheets === 'boolean'
        ? d.allowFreeWorksheets
        : DEFAULT_ACCESS_POLICY.allowFreeWorksheets,
    bkashNumber: String(d.bkashNumber ?? DEFAULT_ACCESS_POLICY.bkashNumber).slice(0, 30),
    nagadNumber: String(d.nagadNumber ?? DEFAULT_ACCESS_POLICY.nagadNumber).slice(0, 30),
    rocketNumber: String(d.rocketNumber ?? DEFAULT_ACCESS_POLICY.rocketNumber).slice(0, 30),
    paymentInstructionsBn: String(
      d.paymentInstructionsBn ?? DEFAULT_ACCESS_POLICY.paymentInstructionsBn
    ).slice(0, 600),
    updatedByUid: String(d.updatedByUid || 'system'),
    updatedAtMs: toOptionalMs(d.updatedAt),
  };
}

function mapEnrollmentRequestDoc(id: string, d: Record<string, unknown>): EnrollmentRequestRecord {
  const paymentMethod: PaymentMethod =
    d.paymentMethod === 'nagad' || d.paymentMethod === 'rocket' || d.paymentMethod === 'bank'
      ? d.paymentMethod
      : 'bkash';
  const status: EnrollmentRequestStatus =
    d.status === 'approved' || d.status === 'rejected' ? d.status : 'pending';
  return {
    id,
    userId: String(d.userId || ''),
    userName: String(d.userName || 'শিক্ষার্থী'),
    userEmail: String(d.userEmail || ''),
    planTier: 'enrolled_pro',
    durationDays: typeof d.durationDays === 'number' ? d.durationDays : 365,
    amountBdt: typeof d.amountBdt === 'number' ? d.amountBdt : 500,
    paymentMethod,
    senderNumber: String(d.senderNumber || ''),
    transactionId: String(d.transactionId || ''),
    studentNote: String(d.studentNote || ''),
    status,
    adminNote: d.adminNote ? String(d.adminNote) : undefined,
    reviewedByUid: d.reviewedByUid ? String(d.reviewedByUid) : undefined,
    createdAtMs: toOptionalMs(d.createdAt) ?? Date.now(),
    updatedAtMs: toOptionalMs(d.updatedAt) ?? Date.now(),
  };
}

export function subscribeAccessPolicy(callbacks: {
  onChange: (policy: AccessPolicyConfig) => void;
  onError?: (err: Error) => void;
}): () => void {
  const ref = doc(db, 'appConfig', 'accessPolicy');
  return onSnapshot(
    ref,
    (snap) => {
      if (!snap.exists()) {
        callbacks.onChange(DEFAULT_ACCESS_POLICY);
      } else {
        callbacks.onChange(mapAccessPolicyDoc(snap.data()));
      }
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, 'appConfig/accessPolicy');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );
}

export async function saveAccessPolicy(
  adminUser: User,
  policy: Omit<AccessPolicyConfig, 'id' | 'updatedByUid' | 'updatedAtMs'>
): Promise<void> {
  const cleanUid = sanitizeId(adminUser.uid, 128);
  const ref = doc(db, 'appConfig', 'accessPolicy');

  const payload = {
    id: 'accessPolicy',
    trialDurationDays: clampInt(policy.trialDurationDays, 1, 90, 7),
    proPriceBdt: clampInt(policy.proPriceBdt, 0, 50000, 500),
    proDurationDays: clampInt(policy.proDurationDays, 1, 1825, 365),
    requireSignInForAccess: Boolean(policy.requireSignInForAccess),
    freeDailyQuestionLimit: clampInt(policy.freeDailyQuestionLimit, 1, 500, 15),
    freeQuestionBankLimit: clampInt(policy.freeQuestionBankLimit, 1, 2000, 40),
    freeVisualLessonLimit: clampInt(policy.freeVisualLessonLimit, 1, 100, 3),
    allowFreePractice: Boolean(policy.allowFreePractice),
    allowFreeFlashcards: Boolean(policy.allowFreeFlashcards),
    allowFreeQuestionBank: Boolean(policy.allowFreeQuestionBank),
    allowFreeWrongBank: Boolean(policy.allowFreeWrongBank),
    allowFreeMockTest: Boolean(policy.allowFreeMockTest),
    allowFreeMedicalModel: Boolean(policy.allowFreeMedicalModel),
    allowFreeVisualHub: Boolean(policy.allowFreeVisualHub),
    allowFreeWorksheets: Boolean(policy.allowFreeWorksheets),
    bkashNumber: policy.bkashNumber.trim().slice(0, 30),
    nagadNumber: policy.nagadNumber.trim().slice(0, 30),
    rocketNumber: policy.rocketNumber.trim().slice(0, 30),
    paymentInstructionsBn: policy.paymentInstructionsBn.trim().slice(0, 600),
    updatedByUid: cleanUid,
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(ref, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'appConfig/accessPolicy');
  }
}

export function subscribeMyEnrollmentRequests(
  uid: string,
  callbacks: {
    onChange: (requests: EnrollmentRequestRecord[]) => void;
    onError?: (err: Error) => void;
  }
): () => void {
  const cleanUid = sanitizeId(uid, 128);
  const q = query(collection(db, 'enrollmentRequests'), where('userId', '==', cleanUid));
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs
        .map((d) => mapEnrollmentRequestDoc(d.id, d.data()))
        .sort((a, b) => b.createdAtMs - a.createdAtMs);
      callbacks.onChange(list);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, `enrollmentRequests(user=${cleanUid})`);
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );
}

export function subscribeAllEnrollmentRequests(
  canListAll: boolean,
  callbacks: {
    onChange: (requests: EnrollmentRequestRecord[]) => void;
    onError?: (err: Error) => void;
  }
): () => void {
  if (!canListAll) {
    callbacks.onChange([]);
    return () => {};
  }
  return onSnapshot(
    collection(db, 'enrollmentRequests'),
    (snap) => {
      const list = snap.docs
        .map((d) => mapEnrollmentRequestDoc(d.id, d.data()))
        .sort((a, b) => b.createdAtMs - a.createdAtMs);
      callbacks.onChange(list);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'enrollmentRequests');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );
}

export async function submitEnrollmentRequest(
  user: User,
  input: {
    userName: string;
    paymentMethod: PaymentMethod;
    senderNumber: string;
    transactionId: string;
    studentNote: string;
    amountBdt: number;
    durationDays: number;
  }
): Promise<EnrollmentRequestRecord> {
  const cleanUid = sanitizeId(user.uid, 128);
  const requestId = sanitizeId(
    `req_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    80
  );

  const cleanName = (input.userName || user.displayName || 'শিক্ষার্থী').trim().slice(0, 120) || 'শিক্ষার্থী';
  const cleanEmail = (user.email || 'student@medexcel.bd').trim().slice(0, 200);
  const cleanSender = input.senderNumber.trim().slice(0, 30);
  const cleanTrxId = input.transactionId.trim().slice(0, 80);
  const cleanNote = input.studentNote.trim().slice(0, 300);

  if (cleanSender.length < 4) {
    throw new Error('সঠিক প্রেরকের মোবাইল নম্বর বা অ্যাকাউন্ট নম্বর লিখুন।');
  }
  if (cleanTrxId.length < 3) {
    throw new Error('সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন।');
  }

  const amountBdt = clampInt(input.amountBdt, 0, 50000, 500);
  const durationDays = clampInt(input.durationDays, 1, 1825, 365);

  const payload = {
    id: requestId,
    userId: cleanUid,
    userName: cleanName,
    userEmail: cleanEmail,
    planTier: 'enrolled_pro' as const,
    durationDays,
    amountBdt,
    paymentMethod: input.paymentMethod,
    senderNumber: cleanSender,
    transactionId: cleanTrxId,
    studentNote: cleanNote,
    status: 'pending' as const,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'enrollmentRequests', requestId), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `enrollmentRequests/${requestId}`);
  }

  const now = Date.now();
  return {
    id: requestId,
    userId: cleanUid,
    userName: cleanName,
    userEmail: cleanEmail,
    planTier: 'enrolled_pro',
    durationDays,
    amountBdt,
    paymentMethod: input.paymentMethod,
    senderNumber: cleanSender,
    transactionId: cleanTrxId,
    studentNote: cleanNote,
    status: 'pending',
    createdAtMs: now,
    updatedAtMs: now,
  };
}

export async function adminReviewEnrollmentRequest(
  adminUser: User,
  req: EnrollmentRequestRecord,
  decision: 'approved' | 'rejected',
  options?: { adminNote?: string; durationDays?: number }
): Promise<void> {
  const cleanAdminUid = sanitizeId(adminUser.uid, 128);
  const cleanReqId = sanitizeId(req.id, 80);
  const cleanTargetUid = sanitizeId(req.userId, 128);
  const cleanNote = (options?.adminNote || '').trim().slice(0, 300);
  const days = clampInt(options?.durationDays ?? req.durationDays, 1, 1825, 365);

  const batch = writeBatch(db);
  const reqRef = doc(db, 'enrollmentRequests', cleanReqId);
  batch.update(reqRef, {
    status: decision,
    adminNote: cleanNote,
    reviewedByUid: cleanAdminUid,
    updatedAt: serverTimestamp(),
  });

  if (decision === 'approved') {
    const userRef = doc(db, 'users', cleanTargetUid);
    batch.update(userRef, {
      accessTier: 'enrolled_pro',
      accessStartsAt: serverTimestamp(),
      accessExpiresAt: Timestamp.fromMillis(Date.now() + days * DAY_MS),
      updatedAt: serverTimestamp(),
    });
  }

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `enrollmentRequests/${cleanReqId}`);
  }
}

export async function adminSetUserAccessTier(
  uid: string,
  tier: AccessTier,
  durationDays?: number
): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const userRef = doc(db, 'users', cleanUid);

  const payload: Record<string, unknown> = {
    accessTier: tier,
    accessStartsAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (tier === 'enrolled_pro') {
    const days = clampInt(durationDays ?? 365, 1, 1825, 365);
    payload.accessExpiresAt = Timestamp.fromMillis(Date.now() + days * DAY_MS);
  } else if (tier === 'free_trial') {
    if (typeof durationDays === 'number' && Number.isFinite(durationDays) && durationDays > 0) {
      const days = clampInt(durationDays, 1, 365, 7);
      payload.accessExpiresAt = Timestamp.fromMillis(Date.now() + days * DAY_MS);
    } else {
      payload.accessExpiresAt = deleteField();
    }
  } else {
    payload.accessExpiresAt = deleteField();
  }

  try {
    await updateDoc(userRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${cleanUid}`);
  }
}

export function resolveUserAccess(input: {
  user: User | null;
  cloudProfile: UserProfile | null;
  isCloudSuperAdmin: boolean;
  policy: AccessPolicyConfig;
  todayAttempted: number;
  nowMs?: number;
}): ResolvedUserAccess {
  const { user, cloudProfile, isCloudSuperAdmin, policy, todayAttempted } = input;
  const now = input.nowMs ?? Date.now();

  if (isCloudSuperAdmin) {
    return {
      tier: 'admin',
      hasFullAccess: true,
      isTrialActive: false,
      isExpired: false,
      needsSignIn: false,
      daysLeft: 9999,
      expiresAtMs: null,
      dailyQuestionLimit: null,
      dailyQuestionsUsed: todayAttempted,
      dailyLimitReached: false,
      canUseFlashcards: true,
      questionBankLimit: null,
      visualLessonLimit: null,
      labelBn: 'সুপার এডমিন (আনলিমিটেড)',
      canAccessTab: () => ({ allowed: true }),
    };
  }

  if (!user) {
    if (policy.requireSignInForAccess) {
      return {
        tier: 'guest',
        hasFullAccess: false,
        isTrialActive: false,
        isExpired: false,
        needsSignIn: true,
        daysLeft: 0,
        expiresAtMs: null,
        dailyQuestionLimit: policy.freeDailyQuestionLimit,
        dailyQuestionsUsed: todayAttempted,
        dailyLimitReached: true,
        canUseFlashcards: false,
        questionBankLimit: 0,
        visualLessonLimit: 0,
        labelBn: `সাইন-ইন করুন (${policy.trialDurationDays} দিন ফ্রি)`,
        canAccessTab: (tab: AppTab) => {
          if (tab === 'dashboard' || tab === 'admin') {
            return { allowed: true };
          }
          return {
            allowed: false,
            reasonBn: `অনুশীলন শুরু করতে ও ${policy.trialDurationDays} দিনের ফ্রি ট্রায়াল চালু করতে অনুগ্রহ করে গুগল দিয়ে সাইন-ইন করুন।`,
          };
        },
      };
    }

    return {
      tier: 'free_trial',
      hasFullAccess: false,
      isTrialActive: true,
      isExpired: false,
      needsSignIn: false,
      daysLeft: policy.trialDurationDays,
      expiresAtMs: null,
      dailyQuestionLimit: policy.freeDailyQuestionLimit,
      dailyQuestionsUsed: todayAttempted,
      dailyLimitReached: todayAttempted >= policy.freeDailyQuestionLimit,
      canUseFlashcards: policy.allowFreeFlashcards,
      questionBankLimit: policy.freeQuestionBankLimit,
      visualLessonLimit: policy.freeVisualLessonLimit,
      labelBn: `ওপেন ফ্রি প্রিভিউ (দৈনিক ${policy.freeDailyQuestionLimit} প্রশ্ন)`,
      canAccessTab: (tab: AppTab) => checkPolicyModuleAccess(tab, policy),
    };
  }

  const rawTier: AccessTier = cloudProfile?.accessTier || 'free_trial';

  if (rawTier === 'lifetime_vip') {
    return {
      tier: 'lifetime_vip',
      hasFullAccess: true,
      isTrialActive: false,
      isExpired: false,
      needsSignIn: false,
      daysLeft: 9999,
      expiresAtMs: null,
      dailyQuestionLimit: null,
      dailyQuestionsUsed: todayAttempted,
      dailyLimitReached: false,
      canUseFlashcards: true,
      questionBankLimit: null,
      visualLessonLimit: null,
      labelBn: 'লাইফটাইম VIP প্রো',
      canAccessTab: () => ({ allowed: true }),
    };
  }

  if (rawTier === 'enrolled_pro') {
    const startAnchor =
      cloudProfile?.accessStartsAtMs ?? cloudProfile?.createdAtMs ?? now;
    const expiresAtMs =
      cloudProfile?.accessExpiresAtMs ?? startAnchor + policy.proDurationDays * DAY_MS;

    if (expiresAtMs > now) {
      const daysLeft = Math.max(1, Math.ceil((expiresAtMs - now) / DAY_MS));
      return {
        tier: 'enrolled_pro',
        hasFullAccess: true,
        isTrialActive: false,
        isExpired: false,
        needsSignIn: false,
        daysLeft,
        expiresAtMs,
        dailyQuestionLimit: null,
        dailyQuestionsUsed: todayAttempted,
        dailyLimitReached: false,
        canUseFlashcards: true,
        questionBankLimit: null,
        visualLessonLimit: null,
        labelBn: `অ্যানুয়াল প্রো (${daysLeft} দিন বাকি)`,
        canAccessTab: () => ({ allowed: true }),
      };
    }

    return {
      tier: 'trial_expired',
      hasFullAccess: false,
      isTrialActive: false,
      isExpired: true,
      needsSignIn: false,
      daysLeft: 0,
      expiresAtMs,
      dailyQuestionLimit: 0,
      dailyQuestionsUsed: todayAttempted,
      dailyLimitReached: true,
      canUseFlashcards: false,
      questionBankLimit: 0,
      visualLessonLimit: 0,
      labelBn: 'প্রো মেয়াদ শেষ — রিনিউ করুন',
      canAccessTab: (tab: AppTab) => {
        if (tab === 'dashboard' || tab === 'admin') return { allowed: true };
        return {
          allowed: false,
          reasonBn: `আপনার ১ বছরের প্রো এনরোলমেন্টের মেয়াদ শেষ হয়েছে। পুনরায় ফুল এক্সেস পেতে ${policy.proPriceBdt} টাকায় এনরোল করুন।`,
        };
      },
    };
  }

  if (rawTier === 'restricted') {
    return {
      tier: 'trial_expired',
      hasFullAccess: false,
      isTrialActive: false,
      isExpired: true,
      needsSignIn: false,
      daysLeft: 0,
      expiresAtMs: null,
      dailyQuestionLimit: 0,
      dailyQuestionsUsed: todayAttempted,
      dailyLimitReached: true,
      canUseFlashcards: false,
      questionBankLimit: 0,
      visualLessonLimit: 0,
      labelBn: 'ফ্রি এক্সেস সীমিত — প্রো নিন',
      canAccessTab: (tab: AppTab) => {
        if (tab === 'dashboard' || tab === 'admin') return { allowed: true };
        return {
          allowed: false,
          reasonBn: `আপনার অ্যাকাউন্টটি সীমিত স্তরে রয়েছে। ফুল এক্সেস আনলক করতে ${policy.proPriceBdt} টাকায় ১ বছরের জন্য এনরোল করুন।`,
        };
      },
    };
  }

  // free_trial tier
  const authCreationMs = user.metadata?.creationTime
    ? Date.parse(user.metadata.creationTime)
    : NaN;
  const startAnchor =
    cloudProfile?.accessStartsAtMs ??
    cloudProfile?.createdAtMs ??
    (Number.isFinite(authCreationMs) ? authCreationMs : now);
  const expiresAtMs =
    cloudProfile?.accessExpiresAtMs ?? startAnchor + policy.trialDurationDays * DAY_MS;

  if (expiresAtMs > now) {
    const daysLeft = Math.max(1, Math.ceil((expiresAtMs - now) / DAY_MS));
    return {
      tier: 'free_trial',
      hasFullAccess: false,
      isTrialActive: true,
      isExpired: false,
      needsSignIn: false,
      daysLeft,
      expiresAtMs,
      dailyQuestionLimit: policy.freeDailyQuestionLimit,
      dailyQuestionsUsed: todayAttempted,
      dailyLimitReached: todayAttempted >= policy.freeDailyQuestionLimit,
      canUseFlashcards: policy.allowFreeFlashcards,
      questionBankLimit: policy.freeQuestionBankLimit,
      visualLessonLimit: policy.freeVisualLessonLimit,
      labelBn: `ফ্রি ট্রায়াল · ${daysLeft} দিন বাকি`,
      canAccessTab: (tab: AppTab) => checkPolicyModuleAccess(tab, policy),
    };
  }

  return {
    tier: 'trial_expired',
    hasFullAccess: false,
    isTrialActive: false,
    isExpired: true,
    needsSignIn: false,
    daysLeft: 0,
    expiresAtMs,
    dailyQuestionLimit: 0,
    dailyQuestionsUsed: todayAttempted,
    dailyLimitReached: true,
    canUseFlashcards: false,
    questionBankLimit: 0,
    visualLessonLimit: 0,
    labelBn: '৭ দিনের ফ্রি ট্রায়াল শেষ',
    canAccessTab: (tab: AppTab) => {
      if (tab === 'dashboard' || tab === 'admin') return { allowed: true };
      return {
        allowed: false,
        reasonBn: `আপনার ${policy.trialDurationDays} দিনের ফ্রি ট্রায়ালের মেয়াদ শেষ হয়েছে। সব ফিচার আনলিমিটেড ব্যবহার করতে ${policy.proPriceBdt} টাকায় ১ বছরের জন্য এনরোল করুন।`,
      };
    },
  };
}

function checkPolicyModuleAccess(
  tab: AppTab,
  policy: AccessPolicyConfig
): { allowed: boolean; reasonBn?: string } {
  if (tab === 'dashboard' || tab === 'admin') return { allowed: true };
  if (tab === 'practice' && !policy.allowFreePractice) {
    return {
      allowed: false,
      reasonBn: 'ফ্রি ট্রায়াল প্ল্যানে র‍্যান্ডম প্র্যাকটিস মডিউলটি বর্তমানে প্রো সদস্যদের জন্য সংরক্ষিত।',
    };
  }
  if (tab === 'question_bank' && !policy.allowFreeQuestionBank) {
    return {
      allowed: false,
      reasonBn: 'ফ্রি ট্রায়াল প্ল্যানে সম্পূর্ণ বোর্ড ও এডমিশন প্রশ্ন ব্যাংক প্রো সদস্যদের জন্য সংরক্ষিত।',
    };
  }
  if (tab === 'wrong_bank' && !policy.allowFreeWrongBank) {
    return {
      allowed: false,
      reasonBn: 'ভুলের ভান্ডার (Wrong Answer Bank) রিভিশন ফিচারটি প্রো সদস্যদের জন্য সংরক্ষিত।',
    };
  }
  if (tab === 'mock' && !policy.allowFreeMockTest) {
    return {
      allowed: false,
      reasonBn: 'বিষয়ভিত্তিক মক টেস্ট সিমুলেটর প্রো সদস্যদের জন্য সংরক্ষিত।',
    };
  }
  if (tab === 'medical_model' && !policy.allowFreeMedicalModel) {
    return {
      allowed: false,
      reasonBn: '১০০ নম্বরের পূর্ণাঙ্গ মেডিকেল ও ডেন্টাল মডেল টেস্ট শুধুমাত্র ১ বছরের প্রো সদস্যদের জন্য উন্মুক্ত।',
    };
  }
  if (tab === 'visual' && !policy.allowFreeVisualHub) {
    return {
      allowed: false,
      reasonBn: 'ভিজ্যুয়াল ইনফোগ্রাফ ও স্মার্টবোর্ড ভিডিও হাব প্রো সদস্যদের জন্য সংরক্ষিত।',
    };
  }
  if (tab === 'worksheets' && !policy.allowFreeWorksheets) {
    return {
      allowed: false,
      reasonBn: 'টপিক ওয়ার্কশীট ও সৃজনশীল (CQ) লাইব্রেরি শুধুমাত্র প্রো সদস্যদের জন্য উন্মুক্ত।',
    };
  }
  return { allowed: true };
}
