import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import {
  AccessTier,
  BookmarkRecord,
  DailyPerformerEntry,
  HscLevel,
  SubjectId,
  TargetExam,
  TestAttemptRecord,
  TopicStat,
  UserProfile,
  WrongAnswerRecord,
} from '../types/learning';

const LOCAL_STORAGE_KEY = 'medexcel_bd_local_progress_v1';

export interface LocalDailyProgress {
  dateKey: string;
  questionsAttempted: number;
  correctCount: number;
  testsCompleted: number;
  bestNetScore: number;
  score: number;
}

export interface LocalProgressState {
  profile: Omit<UserProfile, 'uid' | 'email'>;
  topicStats: Record<string, TopicStat>;
  testAttempts: TestAttemptRecord[];
  bookmarks: Record<string, BookmarkRecord>;
  wrongAnswers: Record<string, WrongAnswerRecord>;
  dailyProgress?: LocalDailyProgress;
}

const DEFAULT_LOCAL_STATE: LocalProgressState = {
  profile: {
    displayName: 'শিক্ষার্থী',
    targetExam: 'medical',
    hscClass: '12',
    college: '',
    photoUrl: '',
    dailyGoal: 30,
  },
  topicStats: {},
  testAttempts: [],
  bookmarks: {},
  wrongAnswers: {},
};

function normalizeLearningSubjectId(rawSubjectId: unknown, chapterId?: unknown): SubjectId {
  const s = typeof rawSubjectId === 'string' ? rawSubjectId : '';
  if (s === 'eng_gk') {
    const ch = typeof chapterId === 'string' ? chapterId : '';
    return ch.startsWith('gk_') ? 'gk' : 'eng';
  }
  if (
    s === 'bio_1' ||
    s === 'bio_2' ||
    s === 'chem_1' ||
    s === 'chem_2' ||
    s === 'phys_1' ||
    s === 'phys_2' ||
    s === 'eng' ||
    s === 'gk'
  ) {
    return s;
  }
  return 'bio_1';
}

export function loadLocalProgress(): LocalProgressState {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return DEFAULT_LOCAL_STATE;
    const parsed = JSON.parse(raw) as Partial<LocalProgressState>;

    const topicStats: Record<string, TopicStat> = {};
    if (parsed.topicStats) {
      for (const [k, v] of Object.entries(parsed.topicStats)) {
        topicStats[k] = {
          ...v,
          subjectId: normalizeLearningSubjectId(v.subjectId, v.chapterId),
        };
      }
    }

    const bookmarks: Record<string, BookmarkRecord> = {};
    if (parsed.bookmarks) {
      for (const [k, v] of Object.entries(parsed.bookmarks)) {
        bookmarks[k] = {
          ...v,
          subjectId: normalizeLearningSubjectId(v.subjectId, v.chapterId),
        };
      }
    }

    const wrongAnswers: Record<string, WrongAnswerRecord> = {};
    if (parsed.wrongAnswers) {
      for (const [k, v] of Object.entries(parsed.wrongAnswers)) {
        wrongAnswers[k] = {
          ...v,
          subjectId: normalizeLearningSubjectId(v.subjectId, v.chapterId),
        };
      }
    }

    const testAttempts = Array.isArray(parsed.testAttempts)
      ? parsed.testAttempts.map((a) => ({
          ...a,
          subjectId: a.subjectId === 'eng_gk' ? 'eng' : a.subjectId,
        }))
      : [];

    return {
      profile: { ...DEFAULT_LOCAL_STATE.profile, ...(parsed.profile || {}) },
      topicStats,
      testAttempts,
      bookmarks,
      wrongAnswers,
      dailyProgress:
        parsed.dailyProgress && parsed.dailyProgress.dateKey === getTodayDateKey()
          ? parsed.dailyProgress
          : undefined,
    };
  } catch {
    return DEFAULT_LOCAL_STATE;
  }
}

export function saveLocalProgress(state: LocalProgressState): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

function sanitizeId(raw: string, maxLen = 80): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, maxLen);
  return cleaned || 'item_default';
}

export function getTodayDateKey(): string {
  try {
    const formatted = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Dhaka',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date());
    if (/^\d{4}-\d{2}-\d{2}$/.test(formatted)) {
      return formatted;
    }
  } catch {
    // Fallback below if Intl timezone is unavailable
  }
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDateKeyBn(dateKey: string): string {
  const parts = dateKey.split('-').map((n) => parseInt(n, 10));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return dateKey;
  const dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 6, 0, 0));
  return dt.toLocaleDateString('bn-BD', {
    timeZone: 'Asia/Dhaka',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function calculateDailyPerformanceScore(input: {
  questionsAttempted: number;
  correctCount: number;
  testsCompleted: number;
  bestNetScore: number;
}): number {
  const qAtt = Math.max(0, Math.round(input.questionsAttempted));
  const corr = Math.min(qAtt, Math.max(0, Math.round(input.correctCount)));
  const tests = Math.max(0, Math.round(input.testsCompleted));
  const bestNet = Math.max(0, Math.min(200, Math.round(input.bestNetScore)));
  return Math.min(200000, qAtt * 2 + corr * 10 + tests * 40 + (tests > 0 ? bestNet : 0));
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

function mapUserProfileDoc(d: Record<string, unknown>, fallbackUid: string): UserProfile {
  const accessTier: AccessTier =
    d.accessTier === 'enrolled_pro' ||
    d.accessTier === 'lifetime_vip' ||
    d.accessTier === 'restricted'
      ? d.accessTier
      : 'free_trial';
  return {
    uid: String(d.uid || fallbackUid),
    displayName: String(d.displayName || 'শিক্ষার্থী'),
    email: String(d.email || ''),
    targetExam:
      d.targetExam === 'dental' || d.targetExam === 'hsc_science' ? d.targetExam : 'medical',
    hscClass: d.hscClass === '11' || d.hscClass === 'admission' ? d.hscClass : '12',
    college: d.college ? String(d.college) : undefined,
    photoUrl: d.photoUrl ? String(d.photoUrl) : undefined,
    dailyGoal: typeof d.dailyGoal === 'number' ? d.dailyGoal : 30,
    accountStatus: d.accountStatus === 'suspended' ? 'suspended' : 'active',
    adminNote: d.adminNote ? String(d.adminNote) : undefined,
    accessTier,
    accessStartsAt: d.accessStartsAt,
    accessExpiresAt: d.accessExpiresAt,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
    createdAtMs: toOptionalMs(d.createdAt),
    accessStartsAtMs: toOptionalMs(d.accessStartsAt),
    accessExpiresAtMs: toOptionalMs(d.accessExpiresAt),
  };
}

export async function ensureUserProfile(user: User): Promise<UserProfile> {
  const uid = sanitizeId(user.uid, 128);
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const existing = mapUserProfileDoc(snap.data(), uid);
      if (!existing.photoUrl && user.photoURL) {
        try {
          await updateDoc(userRef, {
            photoUrl: user.photoURL.slice(0, 1000),
            updatedAt: serverTimestamp(),
          });
        } catch {
          // Non-fatal photo backfill
        }
      }
      return existing;
    }
    const local = loadLocalProgress();
    const nowMs = Date.now();
    const newProfile: UserProfile = {
      uid,
      displayName: (user.displayName || local.profile.displayName || 'শিক্ষার্থী').slice(0, 120),
      email: (user.email || 'student@medexcel.bd').slice(0, 200),
      targetExam: local.profile.targetExam || 'medical',
      hscClass: local.profile.hscClass || '12',
      college: (local.profile.college || '').slice(0, 150),
      photoUrl: (user.photoURL || local.profile.photoUrl || '').slice(0, 1000),
      dailyGoal: Math.min(200, Math.max(5, Math.round(local.profile.dailyGoal || 30))),
      accessTier: 'free_trial',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(userRef, newProfile);
    return {
      ...newProfile,
      createdAtMs: nowMs,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${uid}`);
  }
}

export async function updateCloudUserProfile(
  uid: string,
  updates: {
    displayName: string;
    email: string;
    targetExam: TargetExam;
    hscClass: HscLevel;
    college: string;
    photoUrl?: string;
    dailyGoal: number;
  }
): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const userRef = doc(db, 'users', cleanUid);
  try {
    await updateDoc(userRef, {
      displayName: updates.displayName.trim().slice(0, 120) || 'শিক্ষার্থী',
      email: updates.email.trim().slice(0, 200),
      targetExam: updates.targetExam,
      hscClass: updates.hscClass,
      college: updates.college.trim().slice(0, 150),
      photoUrl: (updates.photoUrl || '').trim().slice(0, 1000),
      dailyGoal: Math.min(200, Math.max(5, Math.round(updates.dailyGoal))),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${cleanUid}`);
  }
}

export async function upsertCloudTopicStat(
  uid: string,
  stat: {
    subjectId: SubjectId;
    chapterId: string;
    attempted: number;
    correct: number;
    wrong: number;
    totalTimeSec: number;
  }
): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const topicKey = sanitizeId(stat.chapterId, 80);
  const statRef = doc(db, 'users', cleanUid, 'topicStats', topicKey);
  const attempted = Math.min(100000, Math.max(0, Math.round(stat.attempted)));
  const correct = Math.min(attempted, Math.max(0, Math.round(stat.correct)));
  const wrong = Math.min(attempted - correct, Math.max(0, Math.round(stat.wrong)));
  const totalTimeSec = Math.min(10000000, Math.max(0, Math.round(stat.totalTimeSec)));

  try {
    await setDoc(statRef, {
      userId: cleanUid,
      topicKey,
      subjectId: sanitizeId(stat.subjectId, 40),
      chapterId: topicKey,
      attempted,
      correct,
      wrong,
      totalTimeSec,
      lastPracticedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${cleanUid}/topicStats/${topicKey}`);
  }
}

export async function createCloudTestAttempt(
  uid: string,
  attempt: Omit<TestAttemptRecord, 'userId' | 'createdAtMs'>
): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const cleanAttemptId = sanitizeId(attempt.id, 128);
  const attemptRef = doc(db, 'users', cleanUid, 'testAttempts', cleanAttemptId);

  const totalQuestions = Math.min(200, Math.max(1, Math.round(attempt.totalQuestions)));
  const answeredCount = Math.min(totalQuestions, Math.max(0, Math.round(attempt.answeredCount)));
  const correctCount = Math.min(answeredCount, Math.max(0, Math.round(attempt.correctCount)));
  const wrongCount = Math.min(answeredCount - correctCount, Math.max(0, Math.round(attempt.wrongCount)));
  const skippedCount = Math.min(totalQuestions, Math.max(0, Math.round(attempt.skippedCount)));

  const weakTopics = attempt.weakTopics
    .slice(0, 15)
    .map((t) => String(t).slice(0, 80));

  try {
    await setDoc(attemptRef, {
      userId: cleanUid,
      testId: sanitizeId(attempt.testId, 80),
      testTitle: attempt.testTitle.slice(0, 160),
      testType: attempt.testType,
      subjectId: attempt.subjectId.slice(0, 40),
      totalQuestions,
      answeredCount,
      correctCount,
      wrongCount,
      skippedCount,
      negativeMarks: Number(Math.max(0, attempt.negativeMarks).toFixed(2)),
      netScore: Number(attempt.netScore.toFixed(2)),
      maxScore: Number(Math.max(1, attempt.maxScore).toFixed(2)),
      durationSec: Math.min(18000, Math.max(0, Math.round(attempt.durationSec))),
      weakTopics,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `users/${cleanUid}/testAttempts/${cleanAttemptId}`);
  }
}

export async function deleteCloudTestAttempt(uid: string, attemptId: string): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const cleanAttemptId = sanitizeId(attemptId, 128);
  try {
    await deleteDoc(doc(db, 'users', cleanUid, 'testAttempts', cleanAttemptId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${cleanUid}/testAttempts/${cleanAttemptId}`);
  }
}

export async function toggleCloudBookmark(
  uid: string,
  bookmark: Omit<BookmarkRecord, 'userId' | 'createdAtMs'>,
  shouldAdd: boolean
): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const cleanQid = sanitizeId(bookmark.questionId, 80);
  const ref = doc(db, 'users', cleanUid, 'bookmarks', cleanQid);
  try {
    if (shouldAdd) {
      await setDoc(ref, {
        userId: cleanUid,
        questionId: cleanQid,
        subjectId: sanitizeId(bookmark.subjectId, 40),
        chapterId: sanitizeId(bookmark.chapterId, 80),
        createdAt: serverTimestamp(),
      });
    } else {
      await deleteDoc(ref);
    }
  } catch (error) {
    handleFirestoreError(
      error,
      shouldAdd ? OperationType.CREATE : OperationType.DELETE,
      `users/${cleanUid}/bookmarks/${cleanQid}`
    );
  }
}

export async function upsertCloudWrongAnswer(
  uid: string,
  payload: {
    questionId: string;
    subjectId: SubjectId;
    chapterId: string;
    selectedOptionIndex: number;
    wrongCount: number;
  }
): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const cleanQid = sanitizeId(payload.questionId, 80);
  const ref = doc(db, 'users', cleanUid, 'wrongAnswers', cleanQid);
  const selectedOptionIndex = Math.min(3, Math.max(0, Math.round(payload.selectedOptionIndex)));
  const wrongCount = Math.min(1000, Math.max(1, Math.round(payload.wrongCount)));

  try {
    await setDoc(ref, {
      userId: cleanUid,
      questionId: cleanQid,
      subjectId: sanitizeId(payload.subjectId, 40),
      chapterId: sanitizeId(payload.chapterId, 80),
      selectedOptionIndex,
      wrongCount,
      lastWrongAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${cleanUid}/wrongAnswers/${cleanQid}`);
  }
}

export async function deleteCloudWrongAnswer(uid: string, questionId: string): Promise<void> {
  const cleanUid = sanitizeId(uid, 128);
  const cleanQid = sanitizeId(questionId, 80);
  try {
    await deleteDoc(doc(db, 'users', cleanUid, 'wrongAnswers', cleanQid));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${cleanUid}/wrongAnswers/${cleanQid}`);
  }
}

export async function clearAllCloudWrongAnswers(
  uid: string,
  questionIds: string[]
): Promise<void> {
  await Promise.all(questionIds.map((qid) => deleteCloudWrongAnswer(uid, qid)));
}

export function subscribeUserLearningData(
  uid: string,
  callbacks: {
    onProfile: (profile: UserProfile | null) => void;
    onTopicStats: (stats: Record<string, TopicStat>) => void;
    onTestAttempts: (attempts: TestAttemptRecord[]) => void;
    onBookmarks: (bookmarks: Record<string, BookmarkRecord>) => void;
    onWrongAnswers: (wrongAnswers: Record<string, WrongAnswerRecord>) => void;
    onError: (err: Error) => void;
  }
): () => void {
  const cleanUid = sanitizeId(uid, 128);

  const unsubProfile = onSnapshot(
    doc(db, 'users', cleanUid),
    (snap) => {
      callbacks.onProfile(snap.exists() ? mapUserProfileDoc(snap.data(), cleanUid) : null);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, `users/${cleanUid}`);
      } catch (e) {
        callbacks.onError(e as Error);
      }
    }
  );

  const unsubTopics = onSnapshot(
    query(collection(db, 'users', cleanUid, 'topicStats'), where('userId', '==', cleanUid)),
    (snap) => {
      const map: Record<string, TopicStat> = {};
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        const ts = d.lastPracticedAt instanceof Timestamp ? d.lastPracticedAt.toMillis() : Date.now();
        map[docSnap.id] = {
          userId: d.userId,
          topicKey: d.topicKey,
          subjectId: normalizeLearningSubjectId(d.subjectId, d.chapterId),
          chapterId: d.chapterId,
          attempted: d.attempted,
          correct: d.correct,
          wrong: d.wrong,
          totalTimeSec: d.totalTimeSec,
          lastPracticedAt: ts,
        };
      });
      callbacks.onTopicStats(map);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, `users/${cleanUid}/topicStats`);
      } catch (e) {
        callbacks.onError(e as Error);
      }
    }
  );

  const unsubAttempts = onSnapshot(
    query(collection(db, 'users', cleanUid, 'testAttempts'), where('userId', '==', cleanUid)),
    (snap) => {
      const list: TestAttemptRecord[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        const ts = d.createdAt instanceof Timestamp ? d.createdAt.toMillis() : Date.now();
        list.push({
          id: docSnap.id,
          userId: d.userId,
          testId: d.testId,
          testTitle: d.testTitle,
          testType: d.testType,
          subjectId: d.subjectId === 'eng_gk' ? 'eng' : d.subjectId,
          totalQuestions: d.totalQuestions,
          answeredCount: d.answeredCount,
          correctCount: d.correctCount,
          wrongCount: d.wrongCount,
          skippedCount: d.skippedCount,
          negativeMarks: d.negativeMarks,
          netScore: d.netScore,
          maxScore: d.maxScore,
          durationSec: d.durationSec,
          weakTopics: Array.isArray(d.weakTopics) ? d.weakTopics : [],
          createdAtMs: ts,
        });
      });
      list.sort((a, b) => b.createdAtMs - a.createdAtMs);
      callbacks.onTestAttempts(list);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, `users/${cleanUid}/testAttempts`);
      } catch (e) {
        callbacks.onError(e as Error);
      }
    }
  );

  const unsubBookmarks = onSnapshot(
    query(collection(db, 'users', cleanUid, 'bookmarks'), where('userId', '==', cleanUid)),
    (snap) => {
      const map: Record<string, BookmarkRecord> = {};
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        const ts = d.createdAt instanceof Timestamp ? d.createdAt.toMillis() : Date.now();
        map[docSnap.id] = {
          userId: d.userId,
          questionId: d.questionId,
          subjectId: normalizeLearningSubjectId(d.subjectId, d.chapterId),
          chapterId: d.chapterId,
          createdAtMs: ts,
        };
      });
      callbacks.onBookmarks(map);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, `users/${cleanUid}/bookmarks`);
      } catch (e) {
        callbacks.onError(e as Error);
      }
    }
  );

  const unsubWrongAnswers = onSnapshot(
    query(collection(db, 'users', cleanUid, 'wrongAnswers'), where('userId', '==', cleanUid)),
    (snap) => {
      const map: Record<string, WrongAnswerRecord> = {};
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        const ts = d.lastWrongAt instanceof Timestamp ? d.lastWrongAt.toMillis() : Date.now();
        map[docSnap.id] = {
          userId: d.userId,
          questionId: d.questionId,
          subjectId: normalizeLearningSubjectId(d.subjectId, d.chapterId),
          chapterId: d.chapterId,
          selectedOptionIndex:
            typeof d.selectedOptionIndex === 'number' ? d.selectedOptionIndex : 0,
          wrongCount: typeof d.wrongCount === 'number' ? d.wrongCount : 1,
          lastWrongAtMs: ts,
        };
      });
      callbacks.onWrongAnswers(map);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, `users/${cleanUid}/wrongAnswers`);
      } catch (e) {
        callbacks.onError(e as Error);
      }
    }
  );

  return () => {
    unsubProfile();
    unsubTopics();
    unsubAttempts();
    unsubBookmarks();
    unsubWrongAnswers();
  };
}

export async function upsertDailyPerformerProgress(
  user: User,
  profileMeta: {
    displayName: string;
    photoUrl?: string;
    college?: string;
    targetExam: TargetExam;
  },
  delta: {
    questionsAttemptedDelta: number;
    correctDelta: number;
    testsDelta: number;
    netScore?: number;
  }
): Promise<void> {
  const cleanUid = sanitizeId(user.uid, 128);
  const dateKey = getTodayDateKey();
  const boardRef = doc(db, 'dailyLeaderboards', dateKey);
  const entryRef = doc(db, 'dailyLeaderboards', dateKey, 'entries', cleanUid);

  try {
    const boardSnap = await getDoc(boardRef);
    if (!boardSnap.exists()) {
      try {
        await setDoc(boardRef, {
          dateKey,
          createdAt: serverTimestamp(),
        });
      } catch {
        // Another concurrent client may have created the parent day doc
      }
    }

    const entrySnap = await getDoc(entryRef);
    const prev = entrySnap.exists() ? entrySnap.data() : null;

    const prevAttempted = typeof prev?.questionsAttempted === 'number' ? prev.questionsAttempted : 0;
    const prevCorrect = typeof prev?.correctCount === 'number' ? prev.correctCount : 0;
    const prevTests = typeof prev?.testsCompleted === 'number' ? prev.testsCompleted : 0;
    const prevBestNet = typeof prev?.bestNetScore === 'number' ? prev.bestNetScore : 0;

    const questionsAttempted = Math.min(
      5000,
      Math.max(0, prevAttempted + Math.round(delta.questionsAttemptedDelta))
    );
    const correctCount = Math.min(
      questionsAttempted,
      Math.max(0, prevCorrect + Math.round(delta.correctDelta))
    );
    const testsCompleted = Math.min(
      200,
      Math.max(0, prevTests + Math.round(delta.testsDelta))
    );
    const candidateNet =
      typeof delta.netScore === 'number'
        ? Math.min(200, Math.max(-50, Number(delta.netScore.toFixed(2))))
        : prevBestNet;
    const bestNetScore = testsCompleted > 0 ? Math.max(prevBestNet, candidateNet) : 0;

    const score = calculateDailyPerformanceScore({
      questionsAttempted,
      correctCount,
      testsCompleted,
      bestNetScore,
    });

    const displayName =
      (profileMeta.displayName || user.displayName || 'শিক্ষার্থী').trim().slice(0, 120) ||
      'শিক্ষার্থী';
    const photoUrl = (profileMeta.photoUrl || user.photoURL || '').trim().slice(0, 1000);
    const college = (profileMeta.college || '').trim().slice(0, 150);

    if (!entrySnap.exists()) {
      await setDoc(entryRef, {
        userId: cleanUid,
        dateKey,
        displayName,
        photoUrl,
        college,
        targetExam: profileMeta.targetExam,
        questionsAttempted,
        correctCount,
        testsCompleted,
        bestNetScore,
        score,
        visibility: 'public',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      await updateDoc(entryRef, {
        displayName,
        photoUrl,
        college,
        targetExam: profileMeta.targetExam,
        questionsAttempted,
        correctCount,
        testsCompleted,
        bestNetScore,
        score,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `dailyLeaderboards/${dateKey}/entries/${cleanUid}`);
  }
}

export async function syncDailyPerformerProfile(
  user: User,
  profileMeta: {
    displayName: string;
    photoUrl?: string;
    college?: string;
    targetExam: TargetExam;
  }
): Promise<void> {
  const cleanUid = sanitizeId(user.uid, 128);
  const dateKey = getTodayDateKey();
  const entryRef = doc(db, 'dailyLeaderboards', dateKey, 'entries', cleanUid);
  try {
    const snap = await getDoc(entryRef);
    if (!snap.exists()) return;
    await updateDoc(entryRef, {
      displayName:
        (profileMeta.displayName || user.displayName || 'শিক্ষার্থী').trim().slice(0, 120) ||
        'শিক্ষার্থী',
      photoUrl: (profileMeta.photoUrl || user.photoURL || '').trim().slice(0, 1000),
      college: (profileMeta.college || '').trim().slice(0, 150),
      targetExam: profileMeta.targetExam,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `dailyLeaderboards/${dateKey}/entries/${cleanUid}`);
  }
}

export function subscribeDailyTopPerformers(
  dateKey: string,
  callbacks: {
    onChange: (entries: DailyPerformerEntry[]) => void;
    onError?: (err: Error) => void;
  }
): () => void {
  const path = `dailyLeaderboards/${dateKey}/entries`;
  const q = query(collection(db, 'dailyLeaderboards', dateKey, 'entries'), where('visibility', '==', 'public'));

  return onSnapshot(
    q,
    (snap) => {
      const list: DailyPerformerEntry[] = [];
      snap.forEach((docSnap) => {
        const d = docSnap.data();
        const createdAtMs = d.createdAt instanceof Timestamp ? d.createdAt.toMillis() : Date.now();
        const updatedAtMs = d.updatedAt instanceof Timestamp ? d.updatedAt.toMillis() : Date.now();
        list.push({
          userId: String(d.userId || docSnap.id),
          dateKey: String(d.dateKey || dateKey),
          displayName: String(d.displayName || 'শিক্ষার্থী'),
          photoUrl: String(d.photoUrl || ''),
          college: d.college ? String(d.college) : undefined,
          targetExam:
            d.targetExam === 'dental' || d.targetExam === 'hsc_science'
              ? d.targetExam
              : 'medical',
          questionsAttempted: typeof d.questionsAttempted === 'number' ? d.questionsAttempted : 0,
          correctCount: typeof d.correctCount === 'number' ? d.correctCount : 0,
          testsCompleted: typeof d.testsCompleted === 'number' ? d.testsCompleted : 0,
          bestNetScore: typeof d.bestNetScore === 'number' ? d.bestNetScore : 0,
          score: typeof d.score === 'number' ? d.score : 0,
          visibility: 'public',
          createdAtMs,
          updatedAtMs,
        });
      });

      list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.correctCount !== a.correctCount) return b.correctCount - a.correctCount;
        const accA = a.questionsAttempted > 0 ? a.correctCount / a.questionsAttempted : 0;
        const accB = b.questionsAttempted > 0 ? b.correctCount / b.questionsAttempted : 0;
        if (accB !== accA) return accB - accA;
        return a.updatedAtMs - b.updatedAtMs;
      });

      callbacks.onChange(list);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );
}
