import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
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
import { getChapterById } from '../data/curriculum';
import {
  AccessTier,
  AccountStatus,
  AdminContentBundle,
  AdminRoleEntry,
  AdminUserActivitySummary,
  AdminUserRecord,
  BoardId,
  CustomInfographic,
  CustomQuestionRecord,
  CustomVideo,
  CustomWorksheet,
  HscLevel,
  ManualUserCreateInput,
  McqQuestion,
  MedicalSubjectGroup,
  SubjectId,
  TargetExam,
  TestAttemptRecord,
  TestType,
  TopicStat,
} from '../types/learning';

export const SUPER_ADMIN_EMAIL = 'aayat6666@gmail.com';
const LOCAL_ADMIN_CONTENT_KEY = 'medexcel_bd_admin_content_v1';

const EMPTY_ADMIN_BUNDLE: AdminContentBundle = {
  infographics: [],
  videos: [],
  questions: [],
  worksheets: [],
};

export function sanitizeContentId(raw: string, maxLen = 80): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, maxLen);
  return cleaned || `item_${Date.now()}`;
}

export function isBootstrappedSuperAdmin(user: User | null): boolean {
  if (!user) return false;
  return Boolean(user.emailVerified && user.email?.toLowerCase() === SUPER_ADMIN_EMAIL);
}

export async function checkIsCloudSuperAdmin(user: User | null): Promise<boolean> {
  if (!user || !user.emailVerified) return false;
  if (isBootstrappedSuperAdmin(user)) return true;
  const uid = sanitizeContentId(user.uid, 128);
  try {
    const snap = await getDoc(doc(db, 'admins', uid));
    return snap.exists() && snap.data()?.role === 'super_admin';
  } catch {
    return false;
  }
}

export function normalizeLegacySubjectId(
  rawSubjectId: unknown,
  chapterId?: unknown,
  medicalGroup?: unknown
): SubjectId {
  const s = typeof rawSubjectId === 'string' ? rawSubjectId : '';
  if (s === 'eng_gk') {
    const ch = typeof chapterId === 'string' ? chapterId : '';
    const mg = typeof medicalGroup === 'string' ? medicalGroup : '';
    return ch.startsWith('gk_') || mg === 'gk' ? 'gk' : 'eng';
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

export function loadLocalAdminContent(): AdminContentBundle {
  try {
    const raw = localStorage.getItem(LOCAL_ADMIN_CONTENT_KEY);
    if (!raw) return EMPTY_ADMIN_BUNDLE;
    const parsed = JSON.parse(raw) as Partial<AdminContentBundle>;
    return {
      infographics: Array.isArray(parsed.infographics)
        ? parsed.infographics.map((x) => ({
            ...x,
            subjectId: normalizeLegacySubjectId(x.subjectId, x.chapterId),
          }))
        : [],
      videos: Array.isArray(parsed.videos)
        ? parsed.videos.map((x) => ({
            ...x,
            subjectId: normalizeLegacySubjectId(x.subjectId, x.chapterId),
          }))
        : [],
      questions: Array.isArray(parsed.questions)
        ? parsed.questions.map((x) => ({
            ...x,
            subjectId: normalizeLegacySubjectId(x.subjectId, x.chapterId, x.medicalGroup),
          }))
        : [],
      worksheets: Array.isArray(parsed.worksheets)
        ? parsed.worksheets.map((x) => ({
            ...x,
            subjectId: normalizeLegacySubjectId(x.subjectId, x.chapterId),
          }))
        : [],
    };
  } catch {
    return EMPTY_ADMIN_BUNDLE;
  }
}

export function saveLocalAdminContent(bundle: AdminContentBundle): void {
  try {
    localStorage.setItem(LOCAL_ADMIN_CONTENT_KEY, JSON.stringify(bundle));
  } catch {
    // Ignore storage quota errors
  }
}

export function subjectToMedicalGroup(subjectId: SubjectId): MedicalSubjectGroup {
  if (subjectId === 'bio_1' || subjectId === 'bio_2') return 'bio';
  if (subjectId === 'chem_1' || subjectId === 'chem_2') return 'chem';
  if (subjectId === 'phys_1' || subjectId === 'phys_2') return 'phys';
  if (subjectId === 'gk') return 'gk';
  return 'eng';
}

export function customQuestionToMcq(cq: CustomQuestionRecord): McqQuestion {
  const ch = getChapterById(cq.chapterId);
  return {
    id: cq.id,
    subjectId: cq.subjectId,
    medicalGroup: cq.medicalGroup,
    chapterId: cq.chapterId,
    visualLessonId: ch?.visualLessonId || 'mitosis_cell',
    hscLevel: cq.hscLevel,
    difficulty: cq.difficulty,
    boardExam:
      cq.difficulty === 'board' && cq.boardName
        ? { board: cq.boardName, year: cq.boardYear || '২০২৪' }
        : undefined,
    pastExam:
      cq.pastExamType && cq.pastExamSession
        ? { exam: cq.pastExamType, session: cq.pastExamSession }
        : undefined,
    question: cq.question,
    options: cq.options,
    correctIndex: cq.correctIndex,
    explanation: cq.explanation,
    reference: `${cq.reference}${cq.topicName ? ` · টপিক: ${cq.topicName}` : ''}`,
  };
}

export function parseSafeVideoEmbed(url: string): {
  type: 'youtube' | 'mp4' | 'external' | 'none';
  embedUrl?: string;
} {
  const trimmed = url.trim();
  if (!trimmed) return { type: 'none' };

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { type: 'none' };
    }
    const host = parsed.hostname.toLowerCase();
    if (host.includes('youtube.com') || host === 'youtu.be') {
      let videoId = '';
      if (host === 'youtu.be') {
        videoId = parsed.pathname.replace(/^\//, '').split('/')[0];
      } else if (parsed.pathname.startsWith('/shorts/')) {
        videoId = parsed.pathname.replace('/shorts/', '').split('/')[0];
      } else if (parsed.pathname.startsWith('/embed/')) {
        videoId = parsed.pathname.replace('/embed/', '').split('/')[0];
      } else {
        videoId = parsed.searchParams.get('v') || '';
      }
      if (/^[a-zA-Z0-9_-]{6,20}$/.test(videoId)) {
        return {
          type: 'youtube',
          embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
        };
      }
    }
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(parsed.pathname)) {
      return { type: 'mp4', embedUrl: trimmed };
    }
    return { type: 'external', embedUrl: trimmed };
  } catch {
    return { type: 'none' };
  }
}

function toMs(val: unknown): number {
  if (val instanceof Timestamp) return val.toMillis();
  if (typeof val === 'number') return val;
  return Date.now();
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

function mapInfographicDoc(id: string, d: Record<string, unknown>): CustomInfographic {
  const rawNodes = Array.isArray(d.nodes) ? d.nodes : [];
  const rawTakeaways = Array.isArray(d.keyTakeawaysBn) ? d.keyTakeawaysBn : [];
  const chapterId = String(d.chapterId || 'bio1_ch1_cell');
  return {
    id,
    subjectId: normalizeLegacySubjectId(d.subjectId, chapterId),
    chapterId,
    topicName: String(d.topicName || ''),
    titleBn: String(d.titleBn || ''),
    subtitleBn: String(d.subtitleBn || ''),
    summaryBn: String(d.summaryBn || ''),
    layoutStyle:
      d.layoutStyle === 'process_flow' || d.layoutStyle === 'comparison_table'
        ? d.layoutStyle
        : 'concept_map',
    imageUrl: String(d.imageUrl || ''),
    nodes: rawNodes.map((n: Record<string, unknown>) => ({
      labelBn: String(n?.labelBn || ''),
      titleBn: String(n?.titleBn || ''),
      detailBn: String(n?.detailBn || ''),
      medicalPearlBn: String(n?.medicalPearlBn || ''),
    })),
    keyTakeawaysBn: rawTakeaways.map((t) => String(t || '')),
    status: d.status === 'draft' ? 'draft' : 'published',
    createdByUid: String(d.createdByUid || ''),
    createdByEmail: String(d.createdByEmail || ''),
    createdAtMs: toMs(d.createdAt),
    updatedAtMs: toMs(d.updatedAt),
  };
}

function mapVideoDoc(id: string, d: Record<string, unknown>): CustomVideo {
  const rawPoints = Array.isArray(d.boardPoints) ? d.boardPoints : [];
  const chapterId = String(d.chapterId || 'bio1_ch1_cell');
  return {
    id,
    subjectId: normalizeLegacySubjectId(d.subjectId, chapterId),
    chapterId,
    topicName: String(d.topicName || ''),
    titleBn: String(d.titleBn || ''),
    instructorBn: String(d.instructorBn || 'সুপার এডমিন'),
    durationMin: typeof d.durationMin === 'number' ? d.durationMin : 10,
    videoUrl: String(d.videoUrl || ''),
    boardSummaryBn: String(d.boardSummaryBn || ''),
    boardPoints: rawPoints.map((p) => String(p || '')),
    narrationBn: String(d.narrationBn || ''),
    status: d.status === 'draft' ? 'draft' : 'published',
    createdByUid: String(d.createdByUid || ''),
    createdByEmail: String(d.createdByEmail || ''),
    createdAtMs: toMs(d.createdAt),
    updatedAtMs: toMs(d.updatedAt),
  };
}

function mapQuestionDoc(id: string, d: Record<string, unknown>): CustomQuestionRecord {
  const rawOpts = Array.isArray(d.options) ? d.options : ['', '', '', ''];
  const options: [string, string, string, string] = [
    String(rawOpts[0] || ''),
    String(rawOpts[1] || ''),
    String(rawOpts[2] || ''),
    String(rawOpts[3] || ''),
  ];
  const rawIdx = typeof d.correctIndex === 'number' ? d.correctIndex : 0;
  const correctIndex: 0 | 1 | 2 | 3 =
    rawIdx === 1 || rawIdx === 2 || rawIdx === 3 ? rawIdx : 0;
  const chapterId = String(d.chapterId || 'bio1_ch1_cell');
  const subjectId = normalizeLegacySubjectId(d.subjectId, chapterId, d.medicalGroup);
  return {
    id,
    subjectId,
    medicalGroup: (d.medicalGroup as MedicalSubjectGroup) || subjectToMedicalGroup(subjectId),
    chapterId,
    topicName: String(d.topicName || ''),
    hscLevel: d.hscLevel === '11' || d.hscLevel === 'admission' ? d.hscLevel : '12',
    difficulty:
      d.difficulty === 'board' || d.difficulty === 'dental' ? d.difficulty : 'medical',
    boardName: d.boardName ? (String(d.boardName) as BoardId) : undefined,
    boardYear: d.boardYear ? String(d.boardYear) : undefined,
    pastExamType:
      d.pastExamType === 'MBBS' || d.pastExamType === 'BDS' ? d.pastExamType : undefined,
    pastExamSession: d.pastExamSession ? String(d.pastExamSession) : undefined,
    question: String(d.question || ''),
    options,
    correctIndex,
    explanation: String(d.explanation || ''),
    reference: String(d.reference || ''),
    status: d.status === 'draft' ? 'draft' : 'published',
    createdByUid: String(d.createdByUid || ''),
    createdByEmail: String(d.createdByEmail || ''),
    createdAtMs: toMs(d.createdAt),
    updatedAtMs: toMs(d.updatedAt),
  };
}

function mapWorksheetDoc(id: string, d: Record<string, unknown>): CustomWorksheet {
  const rawTasks = Array.isArray(d.tasks) ? d.tasks : [];
  const chapterId = String(d.chapterId || 'bio1_ch1_cell');
  return {
    id,
    subjectId: normalizeLegacySubjectId(d.subjectId, chapterId),
    chapterId,
    topicName: String(d.topicName || ''),
    titleBn: String(d.titleBn || ''),
    worksheetType:
      d.worksheetType === 'cq_srijonshil' ||
      d.worksheetType === 'formula_sheet' ||
      d.worksheetType === 'assignment'
        ? d.worksheetType
        : 'practice_sheet',
    difficulty:
      d.difficulty === 'medical' || d.difficulty === 'dental' ? d.difficulty : 'hsc',
    estimatedMinutes: typeof d.estimatedMinutes === 'number' ? d.estimatedMinutes : 30,
    instructionsBn: String(d.instructionsBn || ''),
    attachmentUrl: String(d.attachmentUrl || ''),
    tasks: rawTasks.map((t: Record<string, unknown>) => ({
      promptBn: String(t?.promptBn || ''),
      hintBn: String(t?.hintBn || ''),
      answerBn: String(t?.answerBn || ''),
      marks: typeof t?.marks === 'number' ? t.marks : 1,
    })),
    status: d.status === 'draft' ? 'draft' : 'published',
    createdByUid: String(d.createdByUid || ''),
    createdByEmail: String(d.createdByEmail || ''),
    createdAtMs: toMs(d.createdAt),
    updatedAtMs: toMs(d.updatedAt),
  };
}

export function subscribeAdminContent(
  includeDraftsForAdmin: boolean,
  callbacks: {
    onInfographics: (items: CustomInfographic[]) => void;
    onVideos: (items: CustomVideo[]) => void;
    onQuestions: (items: CustomQuestionRecord[]) => void;
    onWorksheets: (items: CustomWorksheet[]) => void;
    onError?: (err: Error) => void;
  }
): () => void {
  const makeQuery = (colName: string) =>
    includeDraftsForAdmin
      ? collection(db, colName)
      : query(collection(db, colName), where('status', '==', 'published'));

  const unsubInf = onSnapshot(
    makeQuery('customInfographics'),
    (snap) => {
      const items = snap.docs
        .map((docSnap) => mapInfographicDoc(docSnap.id, docSnap.data()))
        .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
      callbacks.onInfographics(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'customInfographics');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );

  const unsubVid = onSnapshot(
    makeQuery('customVideos'),
    (snap) => {
      const items = snap.docs
        .map((docSnap) => mapVideoDoc(docSnap.id, docSnap.data()))
        .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
      callbacks.onVideos(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'customVideos');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );

  const unsubQ = onSnapshot(
    makeQuery('customQuestions'),
    (snap) => {
      const items = snap.docs
        .map((docSnap) => mapQuestionDoc(docSnap.id, docSnap.data()))
        .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
      callbacks.onQuestions(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'customQuestions');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );

  const unsubWs = onSnapshot(
    makeQuery('customWorksheets'),
    (snap) => {
      const items = snap.docs
        .map((docSnap) => mapWorksheetDoc(docSnap.id, docSnap.data()))
        .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
      callbacks.onWorksheets(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'customWorksheets');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );

  return () => {
    unsubInf();
    unsubVid();
    unsubQ();
    unsubWs();
  };
}

export async function saveCloudInfographic(
  user: User,
  item: Omit<CustomInfographic, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
  isNew: boolean
): Promise<void> {
  const cleanId = sanitizeContentId(item.id, 80);
  const cleanUid = sanitizeContentId(user.uid, 128);
  const ref = doc(db, 'customInfographics', cleanId);

  const nodes = item.nodes
    .slice(0, 10)
    .map((n) => ({
      labelBn: n.labelBn.trim().slice(0, 80) || 'ধাপ',
      titleBn: n.titleBn.trim().slice(0, 160) || 'শিরোনাম',
      detailBn: n.detailBn.trim().slice(0, 600) || '',
      medicalPearlBn: n.medicalPearlBn.trim().slice(0, 300) || '',
    }));

  const keyTakeawaysBn = item.keyTakeawaysBn
    .map((k) => k.trim().slice(0, 300))
    .filter(Boolean)
    .slice(0, 8);

  const mutableFields = {
    subjectId: item.subjectId,
    chapterId: sanitizeContentId(item.chapterId, 80),
    topicName: item.topicName.trim().slice(0, 160) || 'সাধারণ টপিক',
    titleBn: item.titleBn.trim().slice(0, 180),
    subtitleBn: item.subtitleBn.trim().slice(0, 260),
    summaryBn: item.summaryBn.trim().slice(0, 2000),
    layoutStyle: item.layoutStyle,
    imageUrl: item.imageUrl.trim().slice(0, 1000),
    nodes,
    keyTakeawaysBn,
    status: item.status,
    updatedAt: serverTimestamp(),
  };

  try {
    if (isNew) {
      await setDoc(ref, {
        id: cleanId,
        ...mutableFields,
        createdByUid: cleanUid,
        createdByEmail: (user.email || SUPER_ADMIN_EMAIL).slice(0, 200),
        createdAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, mutableFields);
    }
  } catch (error) {
    handleFirestoreError(
      error,
      isNew ? OperationType.CREATE : OperationType.UPDATE,
      `customInfographics/${cleanId}`
    );
  }
}

export async function deleteCloudInfographic(id: string): Promise<void> {
  const cleanId = sanitizeContentId(id, 80);
  try {
    await deleteDoc(doc(db, 'customInfographics', cleanId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `customInfographics/${cleanId}`);
  }
}

export async function saveCloudVideo(
  user: User,
  item: Omit<CustomVideo, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
  isNew: boolean
): Promise<void> {
  const cleanId = sanitizeContentId(item.id, 80);
  const cleanUid = sanitizeContentId(user.uid, 128);
  const ref = doc(db, 'customVideos', cleanId);

  const boardPoints = item.boardPoints
    .map((p) => p.trim().slice(0, 300))
    .filter(Boolean)
    .slice(0, 10);

  const mutableFields = {
    subjectId: item.subjectId,
    chapterId: sanitizeContentId(item.chapterId, 80),
    topicName: item.topicName.trim().slice(0, 160) || 'সাধারণ টপিক',
    titleBn: item.titleBn.trim().slice(0, 180),
    instructorBn: item.instructorBn.trim().slice(0, 120) || 'ডা. রাফিউল ইসলাম',
    durationMin: Math.min(240, Math.max(1, Math.round(item.durationMin || 10))),
    videoUrl: item.videoUrl.trim().slice(0, 500),
    boardSummaryBn: item.boardSummaryBn.trim().slice(0, 2000),
    boardPoints,
    narrationBn: item.narrationBn.trim().slice(0, 2000),
    status: item.status,
    updatedAt: serverTimestamp(),
  };

  try {
    if (isNew) {
      await setDoc(ref, {
        id: cleanId,
        ...mutableFields,
        createdByUid: cleanUid,
        createdByEmail: (user.email || SUPER_ADMIN_EMAIL).slice(0, 200),
        createdAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, mutableFields);
    }
  } catch (error) {
    handleFirestoreError(
      error,
      isNew ? OperationType.CREATE : OperationType.UPDATE,
      `customVideos/${cleanId}`
    );
  }
}

export async function deleteCloudVideo(id: string): Promise<void> {
  const cleanId = sanitizeContentId(id, 80);
  try {
    await deleteDoc(doc(db, 'customVideos', cleanId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `customVideos/${cleanId}`);
  }
}

export async function saveCloudQuestion(
  user: User,
  item: Omit<CustomQuestionRecord, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
  isNew: boolean
): Promise<void> {
  const cleanId = sanitizeContentId(item.id, 80);
  const cleanUid = sanitizeContentId(user.uid, 128);
  const ref = doc(db, 'customQuestions', cleanId);

  const sanitizedOptions: [string, string, string, string] = [
    item.options[0].trim().slice(0, 250) || 'বিকল্প ক',
    item.options[1].trim().slice(0, 250) || 'বিকল্প খ',
    item.options[2].trim().slice(0, 250) || 'বিকল্প গ',
    item.options[3].trim().slice(0, 250) || 'বিকল্প ঘ',
  ];

  const basePayload: Record<string, unknown> = {
    subjectId: item.subjectId,
    medicalGroup: item.medicalGroup,
    chapterId: sanitizeContentId(item.chapterId, 80),
    topicName: item.topicName.trim().slice(0, 160) || 'সাধারণ টপিক',
    hscLevel: item.hscLevel,
    difficulty: item.difficulty,
    question: item.question.trim().slice(0, 600),
    options: sanitizedOptions,
    correctIndex: item.correctIndex,
    explanation: item.explanation.trim().slice(0, 1200) || 'ব্যাখ্যা সংযুক্ত।',
    reference: item.reference.trim().slice(0, 240) || 'NCTB পাঠ্যবই',
    status: item.status,
    updatedAt: serverTimestamp(),
  };

  if (item.difficulty === 'board' && item.boardName) {
    basePayload.boardName = item.boardName.slice(0, 30);
    if (item.boardYear?.trim()) {
      basePayload.boardYear = item.boardYear.trim().slice(0, 10);
    } else if (!isNew) {
      basePayload.boardYear = deleteField();
    }
    if (!isNew) {
      basePayload.pastExamType = deleteField();
      basePayload.pastExamSession = deleteField();
    }
  } else {
    if (!isNew) {
      basePayload.boardName = deleteField();
      basePayload.boardYear = deleteField();
    }
    if (item.pastExamType) {
      basePayload.pastExamType = item.pastExamType;
      if (item.pastExamSession?.trim()) {
        basePayload.pastExamSession = item.pastExamSession.trim().slice(0, 20);
      } else if (!isNew) {
        basePayload.pastExamSession = deleteField();
      }
    } else if (!isNew) {
      basePayload.pastExamType = deleteField();
      basePayload.pastExamSession = deleteField();
    }
  }

  try {
    if (isNew) {
      await setDoc(ref, {
        id: cleanId,
        ...basePayload,
        createdByUid: cleanUid,
        createdByEmail: (user.email || SUPER_ADMIN_EMAIL).slice(0, 200),
        createdAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, basePayload);
    }
  } catch (error) {
    handleFirestoreError(
      error,
      isNew ? OperationType.CREATE : OperationType.UPDATE,
      `customQuestions/${cleanId}`
    );
  }
}

export async function deleteCloudQuestion(id: string): Promise<void> {
  const cleanId = sanitizeContentId(id, 80);
  try {
    await deleteDoc(doc(db, 'customQuestions', cleanId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `customQuestions/${cleanId}`);
  }
}

export async function saveCloudWorksheet(
  user: User,
  item: Omit<CustomWorksheet, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
  isNew: boolean
): Promise<void> {
  const cleanId = sanitizeContentId(item.id, 80);
  const cleanUid = sanitizeContentId(user.uid, 128);
  const ref = doc(db, 'customWorksheets', cleanId);

  const tasks = item.tasks.slice(0, 20).map((t) => ({
    promptBn: t.promptBn.trim().slice(0, 600) || 'কাজ',
    hintBn: t.hintBn.trim().slice(0, 400) || '',
    answerBn: t.answerBn.trim().slice(0, 1000) || '',
    marks: Math.min(20, Math.max(1, Math.round(t.marks || 1))),
  }));

  const mutableFields = {
    subjectId: item.subjectId,
    chapterId: sanitizeContentId(item.chapterId, 80),
    topicName: item.topicName.trim().slice(0, 160) || 'সাধারণ টপিক',
    titleBn: item.titleBn.trim().slice(0, 180),
    worksheetType: item.worksheetType,
    difficulty: item.difficulty,
    estimatedMinutes: Math.min(180, Math.max(5, Math.round(item.estimatedMinutes || 30))),
    instructionsBn: item.instructionsBn.trim().slice(0, 1500),
    attachmentUrl: item.attachmentUrl.trim().slice(0, 500),
    tasks,
    status: item.status,
    updatedAt: serverTimestamp(),
  };

  try {
    if (isNew) {
      await setDoc(ref, {
        id: cleanId,
        ...mutableFields,
        createdByUid: cleanUid,
        createdByEmail: (user.email || SUPER_ADMIN_EMAIL).slice(0, 200),
        createdAt: serverTimestamp(),
      });
    } else {
      await updateDoc(ref, mutableFields);
    }
  } catch (error) {
    handleFirestoreError(
      error,
      isNew ? OperationType.CREATE : OperationType.UPDATE,
      `customWorksheets/${cleanId}`
    );
  }
}

export async function deleteCloudWorksheet(id: string): Promise<void> {
  const cleanId = sanitizeContentId(id, 80);
  try {
    await deleteDoc(doc(db, 'customWorksheets', cleanId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `customWorksheets/${cleanId}`);
  }
}

// --- Super Admin User Directory & Governance Helpers ---

function mapAdminUserDoc(id: string, d: Record<string, unknown>): AdminUserRecord {
  const targetExam: TargetExam =
    d.targetExam === 'dental' || d.targetExam === 'hsc_science' ? d.targetExam : 'medical';
  const hscClass: HscLevel =
    d.hscClass === '11' || d.hscClass === 'admission' ? d.hscClass : '12';
  const accountStatus: AccountStatus =
    d.accountStatus === 'suspended' ? 'suspended' : 'active';
  const accessTier: AccessTier =
    d.accessTier === 'enrolled_pro' ||
    d.accessTier === 'lifetime_vip' ||
    d.accessTier === 'restricted'
      ? d.accessTier
      : 'free_trial';
  return {
    uid: String(d.uid || id),
    displayName: String(d.displayName || 'শিক্ষার্থী'),
    email: String(d.email || ''),
    targetExam,
    hscClass,
    college: String(d.college || ''),
    photoUrl: String(d.photoUrl || ''),
    dailyGoal: typeof d.dailyGoal === 'number' ? d.dailyGoal : 30,
    accountStatus,
    adminNote: String(d.adminNote || ''),
    accessTier,
    accessStartsAtMs: toOptionalMs(d.accessStartsAt),
    accessExpiresAtMs: toOptionalMs(d.accessExpiresAt),
    createdAtMs: toMs(d.createdAt),
    updatedAtMs: toMs(d.updatedAt),
  };
}

function mapAdminRoleDoc(id: string, d: Record<string, unknown>): AdminRoleEntry {
  return {
    uid: String(d.uid || id),
    email: String(d.email || ''),
    role: 'super_admin',
    createdAtMs: toMs(d.createdAt),
  };
}

export function subscribeCloudUserDirectory(
  canListDirectory: boolean,
  callbacks: {
    onUsers: (users: AdminUserRecord[]) => void;
    onAdmins: (admins: AdminRoleEntry[]) => void;
    onError?: (err: Error) => void;
  }
): () => void {
  if (!canListDirectory) {
    callbacks.onUsers([]);
    callbacks.onAdmins([]);
    return () => {};
  }

  const unsubUsers = onSnapshot(
    collection(db, 'users'),
    (snap) => {
      const users = snap.docs
        .map((docSnap) => mapAdminUserDoc(docSnap.id, docSnap.data()))
        .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
      callbacks.onUsers(users);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'users');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );

  const unsubAdmins = onSnapshot(
    collection(db, 'admins'),
    (snap) => {
      const admins = snap.docs
        .map((docSnap) => mapAdminRoleDoc(docSnap.id, docSnap.data()))
        .sort((a, b) => b.createdAtMs - a.createdAtMs);
      callbacks.onAdmins(admins);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'admins');
      } catch (e) {
        callbacks.onError?.(e as Error);
      }
    }
  );

  return () => {
    unsubUsers();
    unsubAdmins();
  };
}

export async function adminLookupUserByUid(
  rawUid: string
): Promise<{ user: AdminUserRecord | null; isAdmin: boolean }> {
  const cleanUid = sanitizeContentId(rawUid.trim(), 128);
  if (!cleanUid || cleanUid.startsWith('item_')) {
    throw new Error('সঠিক ইউজার UID দিন।');
  }
  try {
    const [userSnap, adminSnap] = await Promise.all([
      getDoc(doc(db, 'users', cleanUid)),
      getDoc(doc(db, 'admins', cleanUid)).catch(() => null),
    ]);
    return {
      user: userSnap.exists() ? mapAdminUserDoc(userSnap.id, userSnap.data()) : null,
      isAdmin: Boolean(adminSnap && adminSnap.exists() && adminSnap.data()?.role === 'super_admin'),
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${cleanUid}`);
  }
}

export async function adminUpdateCloudUser(
  uid: string,
  updates: {
    displayName: string;
    targetExam: TargetExam;
    hscClass: HscLevel;
    college: string;
    dailyGoal: number;
    accountStatus: AccountStatus;
    adminNote: string;
    accessTier?: AccessTier;
    accessDays?: number;
  }
): Promise<void> {
  const cleanUid = sanitizeContentId(uid, 128);
  const trimmedNote = updates.adminNote.trim().slice(0, 300);
  const payload: Record<string, unknown> = {
    displayName: updates.displayName.trim().slice(0, 120) || 'শিক্ষার্থী',
    targetExam: updates.targetExam,
    hscClass: updates.hscClass,
    college: updates.college.trim().slice(0, 150),
    dailyGoal: Math.min(200, Math.max(5, Math.round(updates.dailyGoal || 30))),
    accountStatus: updates.accountStatus,
    adminNote: trimmedNote ? trimmedNote : deleteField(),
    updatedAt: serverTimestamp(),
  };

  if (updates.accessTier) {
    payload.accessTier = updates.accessTier;
    payload.accessStartsAt = serverTimestamp();
    if (updates.accessTier === 'enrolled_pro') {
      const days = Math.min(1825, Math.max(1, Math.round(updates.accessDays ?? 365)));
      payload.accessExpiresAt = Timestamp.fromMillis(Date.now() + days * 86_400_000);
    } else if (
      updates.accessTier === 'free_trial' &&
      typeof updates.accessDays === 'number' &&
      Number.isFinite(updates.accessDays) &&
      updates.accessDays > 0
    ) {
      const days = Math.min(365, Math.max(1, Math.round(updates.accessDays)));
      payload.accessExpiresAt = Timestamp.fromMillis(Date.now() + days * 86_400_000);
    } else {
      payload.accessExpiresAt = deleteField();
    }
  }

  try {
    await updateDoc(doc(db, 'users', cleanUid), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${cleanUid}`);
  }
}

export async function adminCreateCloudUser(
  input: ManualUserCreateInput
): Promise<AdminUserRecord> {
  const rawUid = (input.uid || '').trim();
  let cleanUid = '';
  if (rawUid) {
    if (!/^[a-zA-Z0-9_-]{1,128}$/.test(rawUid)) {
      throw new Error(
        'UID-তে শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা, _ এবং - ব্যবহার করা যাবে (সর্বোচ্চ ১২৮ অক্ষর)।'
      );
    }
    cleanUid = rawUid;
  } else {
    const rand = Math.random().toString(36).slice(2, 7);
    cleanUid = `user_${Date.now()}_${rand}`;
  }

  const cleanName = input.displayName.trim().slice(0, 120);
  if (!cleanName) {
    throw new Error('ইউজারের নাম লিখুন।');
  }

  const cleanEmail = input.email.trim().toLowerCase().slice(0, 200);
  if (cleanEmail.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    throw new Error('সঠিক ইমেইল ঠিকানা লিখুন।');
  }

  const cleanCollege = input.college.trim().slice(0, 150);
  const cleanPhoto = (input.photoUrl || '').trim().slice(0, 1000);
  const cleanGoal = Math.min(200, Math.max(5, Math.round(input.dailyGoal || 30)));
  const cleanNote = input.adminNote.trim().slice(0, 300);
  const accessTier: AccessTier = input.accessTier || 'free_trial';

  let existingSnap;
  try {
    existingSnap = await getDoc(doc(db, 'users', cleanUid));
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${cleanUid}`);
  }

  if (existingSnap.exists()) {
    throw new Error(
      'এই UID-তে ইতিমধ্যে একটি ইউজার প্রোফাইল রয়েছে। ভিন্ন UID দিন অথবা সার্চ করে সম্পাদনা করুন।'
    );
  }

  const nowMs = Date.now();
  let accessExpiresAtMs: number | undefined;
  if (accessTier === 'enrolled_pro') {
    const days = Math.min(1825, Math.max(1, Math.round(input.accessDays ?? 365)));
    accessExpiresAtMs = nowMs + days * 86_400_000;
  } else if (
    accessTier === 'free_trial' &&
    typeof input.accessDays === 'number' &&
    Number.isFinite(input.accessDays) &&
    input.accessDays > 0
  ) {
    const days = Math.min(365, Math.max(1, Math.round(input.accessDays)));
    accessExpiresAtMs = nowMs + days * 86_400_000;
  }

  const payload: Record<string, unknown> = {
    uid: cleanUid,
    displayName: cleanName,
    email: cleanEmail,
    targetExam: input.targetExam,
    hscClass: input.hscClass,
    college: cleanCollege,
    photoUrl: cleanPhoto,
    dailyGoal: cleanGoal,
    accountStatus: input.accountStatus,
    accessTier,
    accessStartsAt: serverTimestamp(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  if (cleanNote) {
    payload.adminNote = cleanNote;
  }
  if (accessExpiresAtMs) {
    payload.accessExpiresAt = Timestamp.fromMillis(accessExpiresAtMs);
  }

  try {
    await setDoc(doc(db, 'users', cleanUid), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `users/${cleanUid}`);
  }

  if (input.grantSuperAdmin) {
    await adminGrantSuperAdmin(cleanUid, cleanEmail);
  }

  return {
    uid: cleanUid,
    displayName: cleanName,
    email: cleanEmail,
    targetExam: input.targetExam,
    hscClass: input.hscClass,
    college: cleanCollege,
    photoUrl: cleanPhoto,
    dailyGoal: cleanGoal,
    accountStatus: input.accountStatus,
    adminNote: cleanNote,
    accessTier,
    accessStartsAtMs: nowMs,
    accessExpiresAtMs,
    createdAtMs: nowMs,
    updatedAtMs: nowMs,
  };
}

export async function adminGrantSuperAdmin(uid: string, email: string): Promise<void> {
  const cleanUid = sanitizeContentId(uid.trim(), 128);
  const cleanEmail = email.trim().slice(0, 200);
  if (!cleanUid || cleanEmail.length < 3) {
    throw new Error('সুপার এডমিন দিতে সঠিক UID ও ইমেইল প্রয়োজন।');
  }
  try {
    await setDoc(doc(db, 'admins', cleanUid), {
      uid: cleanUid,
      email: cleanEmail,
      role: 'super_admin',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `admins/${cleanUid}`);
  }
}

export async function adminRevokeSuperAdmin(
  uid: string,
  currentUserUid?: string
): Promise<void> {
  const cleanUid = sanitizeContentId(uid.trim(), 128);
  if (currentUserUid && cleanUid === sanitizeContentId(currentUserUid, 128)) {
    throw new Error('নিজের সুপার এডমিন ভূমিকা বাতিল করা যাবে না।');
  }
  try {
    await deleteDoc(doc(db, 'admins', cleanUid));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `admins/${cleanUid}`);
  }
}

export async function adminDeleteCloudUser(
  uid: string,
  currentUserUid?: string
): Promise<void> {
  const cleanUid = sanitizeContentId(uid.trim(), 128);
  if (currentUserUid && cleanUid === sanitizeContentId(currentUserUid, 128)) {
    throw new Error('নিজের অ্যাকাউন্ট প্রোফাইল এখানে থেকে মুছে ফেলা যাবে না।');
  }
  try {
    await deleteDoc(doc(db, 'users', cleanUid));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `users/${cleanUid}`);
  }
}

export async function adminFetchUserActivity(
  uid: string
): Promise<AdminUserActivitySummary> {
  const cleanUid = sanitizeContentId(uid.trim(), 128);
  try {
    const [statsSnap, attemptsSnap] = await Promise.all([
      getDocs(collection(db, 'users', cleanUid, 'topicStats')),
      getDocs(collection(db, 'users', cleanUid, 'testAttempts')),
    ]);

    const topicStats: TopicStat[] = statsSnap.docs.map((d) => {
      const data = d.data();
      const chapterId = String(data.chapterId || d.id);
      return {
        userId: String(data.userId || cleanUid),
        topicKey: String(data.topicKey || d.id),
        subjectId: normalizeLegacySubjectId(data.subjectId, chapterId),
        chapterId,
        attempted: typeof data.attempted === 'number' ? data.attempted : 0,
        correct: typeof data.correct === 'number' ? data.correct : 0,
        wrong: typeof data.wrong === 'number' ? data.wrong : 0,
        totalTimeSec: typeof data.totalTimeSec === 'number' ? data.totalTimeSec : 0,
        lastPracticedAt: data.lastPracticedAt ? toMs(data.lastPracticedAt) : undefined,
      };
    });

    const testAttempts: TestAttemptRecord[] = attemptsSnap.docs
      .map((d) => {
        const data = d.data();
        const testType: TestType =
          data.testType === 'medical_model' ||
          data.testType === 'dental_model' ||
          data.testType === 'practice_drill'
            ? data.testType
            : 'mock_test';
        const rawSub = String(data.subjectId || 'all');
        return {
          id: d.id,
          userId: String(data.userId || cleanUid),
          testId: String(data.testId || d.id),
          testTitle: String(data.testTitle || 'পরীক্ষা'),
          testType,
          subjectId: rawSub === 'eng_gk' ? 'eng' : rawSub,
          totalQuestions: typeof data.totalQuestions === 'number' ? data.totalQuestions : 0,
          answeredCount: typeof data.answeredCount === 'number' ? data.answeredCount : 0,
          correctCount: typeof data.correctCount === 'number' ? data.correctCount : 0,
          wrongCount: typeof data.wrongCount === 'number' ? data.wrongCount : 0,
          skippedCount: typeof data.skippedCount === 'number' ? data.skippedCount : 0,
          negativeMarks: typeof data.negativeMarks === 'number' ? data.negativeMarks : 0,
          netScore: typeof data.netScore === 'number' ? data.netScore : 0,
          maxScore: typeof data.maxScore === 'number' ? data.maxScore : 100,
          durationSec: typeof data.durationSec === 'number' ? data.durationSec : 0,
          weakTopics: Array.isArray(data.weakTopics) ? data.weakTopics.map(String) : [],
          createdAtMs: toMs(data.createdAt),
        };
      })
      .sort((a, b) => b.createdAtMs - a.createdAtMs);

    return { topicStats, testAttempts };
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, `users/${cleanUid}/activity`);
  }
}
