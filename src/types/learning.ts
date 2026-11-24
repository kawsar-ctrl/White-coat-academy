export type SubjectId =
  | 'bio_1'
  | 'bio_2'
  | 'chem_1'
  | 'chem_2'
  | 'phys_1'
  | 'phys_2'
  | 'eng'
  | 'gk';

export type MedicalSubjectGroup = 'bio' | 'chem' | 'phys' | 'eng' | 'gk';

export type HscLevel = '11' | '12' | 'admission';

export type TargetExam = 'medical' | 'dental' | 'hsc_science';

export type AccountStatus = 'active' | 'suspended';

export type AccessTier = 'free_trial' | 'enrolled_pro' | 'lifetime_vip' | 'restricted';

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'bank';

export type EnrollmentRequestStatus = 'pending' | 'approved' | 'rejected';

export interface SubjectInfo {
  id: SubjectId;
  nameBn: string;
  shortNameBn: string;
  paperLabelBn: string;
  medicalGroup: MedicalSubjectGroup;
  medicalMarks: number;
  descriptionBn: string;
}

export interface ChapterInfo {
  id: string;
  subjectId: SubjectId;
  hscLevel: HscLevel;
  chapterNumberBn: string;
  nameBn: string;
  keyTopicsBn: string[];
  visualLessonId: string;
  highYieldForMedical: boolean;
}

export type BoardId =
  | 'dhaka'
  | 'rajshahi'
  | 'chittagong'
  | 'comilla'
  | 'jessore'
  | 'sylhet'
  | 'barisal'
  | 'dinajpur'
  | 'mymensingh';

export interface McqQuestion {
  id: string;
  subjectId: SubjectId;
  medicalGroup: MedicalSubjectGroup;
  chapterId: string;
  visualLessonId: string;
  hscLevel: HscLevel;
  difficulty: 'board' | 'medical' | 'dental';
  boardExam?: {
    board: BoardId;
    year: string;
  };
  pastExam?: {
    exam: 'MBBS' | 'BDS';
    session: string;
  };
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  reference: string;
}

export interface VideoScene {
  id: string;
  titleBn: string;
  durationSec: number;
  boardTitle: string;
  boardFormula: string;
  boardPoints: string[];
  narrationBn: string;
  diagramHighlight: string;
}

export interface InfographicHotspot {
  id: string;
  labelBn: string;
  titleBn: string;
  summaryBn: string;
  medicalNoteBn: string;
  xPercent: number;
  yPercent: number;
}

export interface VisualLesson {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  titleBn: string;
  subtitleBn: string;
  durationMin: number;
  instructorBn: string;
  diagramType:
    | 'heart_cardiac'
    | 'bohr_curve'
    | 'nephron'
    | 'mitosis_cell'
    | 'photosynthesis'
    | 'hybridization'
    | 'benzene_aromatic'
    | 'ph_buffer'
    | 'thermodynamics'
    | 'circuits_optics'
    | 'english_grammar'
    | 'gk_timeline';
  overviewBn: string;
  examPearlsBn: string[];
  mnemonicsBn: string[];
  hotspots: InfographicHotspot[];
  videoScenes: VideoScene[];
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  targetExam: TargetExam;
  hscClass: HscLevel;
  college?: string;
  photoUrl?: string;
  dailyGoal: number;
  accountStatus?: AccountStatus;
  adminNote?: string;
  accessTier?: AccessTier;
  accessStartsAt?: unknown;
  accessExpiresAt?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
  createdAtMs?: number;
  accessStartsAtMs?: number;
  accessExpiresAtMs?: number;
}

export interface AdminUserRecord {
  uid: string;
  displayName: string;
  email: string;
  targetExam: TargetExam;
  hscClass: HscLevel;
  college: string;
  photoUrl: string;
  dailyGoal: number;
  accountStatus: AccountStatus;
  adminNote: string;
  accessTier: AccessTier;
  accessStartsAtMs?: number;
  accessExpiresAtMs?: number;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface AdminRoleEntry {
  uid: string;
  email: string;
  role: 'super_admin';
  createdAtMs: number;
}

export interface AdminUserActivitySummary {
  topicStats: TopicStat[];
  testAttempts: TestAttemptRecord[];
}

export interface ManualUserCreateInput {
  uid?: string;
  displayName: string;
  email: string;
  targetExam: TargetExam;
  hscClass: HscLevel;
  college: string;
  photoUrl?: string;
  dailyGoal: number;
  accountStatus: AccountStatus;
  adminNote: string;
  accessTier?: AccessTier;
  accessDays?: number;
  grantSuperAdmin?: boolean;
}

export interface AccessPolicyConfig {
  id: 'accessPolicy';
  trialDurationDays: number;
  proPriceBdt: number;
  proDurationDays: number;
  requireSignInForAccess: boolean;
  freeDailyQuestionLimit: number;
  freeQuestionBankLimit: number;
  freeVisualLessonLimit: number;
  allowFreePractice: boolean;
  allowFreeFlashcards: boolean;
  allowFreeQuestionBank: boolean;
  allowFreeWrongBank: boolean;
  allowFreeMockTest: boolean;
  allowFreeMedicalModel: boolean;
  allowFreeVisualHub: boolean;
  allowFreeWorksheets: boolean;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  paymentInstructionsBn: string;
  updatedByUid: string;
  updatedAtMs?: number;
}

export interface EnrollmentRequestRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  planTier: 'enrolled_pro';
  durationDays: number;
  amountBdt: number;
  paymentMethod: PaymentMethod;
  senderNumber: string;
  transactionId: string;
  studentNote: string;
  status: EnrollmentRequestStatus;
  adminNote?: string;
  reviewedByUid?: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface ResolvedUserAccess {
  tier: 'admin' | 'lifetime_vip' | 'enrolled_pro' | 'free_trial' | 'trial_expired' | 'guest';
  hasFullAccess: boolean;
  isTrialActive: boolean;
  isExpired: boolean;
  needsSignIn: boolean;
  daysLeft: number;
  expiresAtMs: number | null;
  dailyQuestionLimit: number | null;
  dailyQuestionsUsed: number;
  dailyLimitReached: boolean;
  canUseFlashcards: boolean;
  questionBankLimit: number | null;
  visualLessonLimit: number | null;
  labelBn: string;
  canAccessTab: (tab: AppTab) => { allowed: boolean; reasonBn?: string };
}

export interface DailyPerformerEntry {
  userId: string;
  dateKey: string;
  displayName: string;
  photoUrl: string;
  college?: string;
  targetExam: TargetExam;
  questionsAttempted: number;
  correctCount: number;
  testsCompleted: number;
  bestNetScore: number;
  score: number;
  visibility: 'public';
  createdAtMs: number;
  updatedAtMs: number;
}

export interface TopicStat {
  userId: string;
  topicKey: string;
  subjectId: SubjectId;
  chapterId: string;
  attempted: number;
  correct: number;
  wrong: number;
  totalTimeSec: number;
  lastPracticedAt?: number;
}

export type TestType = 'mock_test' | 'medical_model' | 'dental_model' | 'practice_drill';

export interface TestAttemptRecord {
  id: string;
  userId: string;
  testId: string;
  testTitle: string;
  testType: TestType;
  subjectId: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  negativeMarks: number;
  netScore: number;
  maxScore: number;
  durationSec: number;
  weakTopics: string[];
  createdAtMs: number;
}

export interface BookmarkRecord {
  userId: string;
  questionId: string;
  subjectId: SubjectId;
  chapterId: string;
  createdAtMs: number;
}

export interface WrongAnswerRecord {
  userId: string;
  questionId: string;
  subjectId: SubjectId;
  chapterId: string;
  selectedOptionIndex: number;
  wrongCount: number;
  lastWrongAtMs: number;
}

export type AppTab =
  | 'dashboard'
  | 'practice'
  | 'question_bank'
  | 'wrong_bank'
  | 'mock'
  | 'medical_model'
  | 'visual'
  | 'worksheets'
  | 'admin';

export type ContentPublishStatus = 'published' | 'draft';

export type InfographicLayoutStyle = 'concept_map' | 'process_flow' | 'comparison_table';

export interface InfographicNodeItem {
  labelBn: string;
  titleBn: string;
  detailBn: string;
  medicalPearlBn: string;
}

export interface CustomInfographic {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  topicName: string;
  titleBn: string;
  subtitleBn: string;
  summaryBn: string;
  layoutStyle: InfographicLayoutStyle;
  imageUrl: string;
  nodes: InfographicNodeItem[];
  keyTakeawaysBn: string[];
  status: ContentPublishStatus;
  createdByUid: string;
  createdByEmail: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface CustomVideo {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  topicName: string;
  titleBn: string;
  instructorBn: string;
  durationMin: number;
  videoUrl: string;
  boardSummaryBn: string;
  boardPoints: string[];
  narrationBn: string;
  status: ContentPublishStatus;
  createdByUid: string;
  createdByEmail: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface CustomQuestionRecord {
  id: string;
  subjectId: SubjectId;
  medicalGroup: MedicalSubjectGroup;
  chapterId: string;
  topicName: string;
  hscLevel: HscLevel;
  difficulty: 'board' | 'medical' | 'dental';
  boardName?: BoardId;
  boardYear?: string;
  pastExamType?: 'MBBS' | 'BDS';
  pastExamSession?: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  reference: string;
  status: ContentPublishStatus;
  createdByUid: string;
  createdByEmail: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export type WorksheetType = 'practice_sheet' | 'cq_srijonshil' | 'formula_sheet' | 'assignment';
export type WorksheetDifficulty = 'hsc' | 'medical' | 'dental';

export interface WorksheetTaskItem {
  promptBn: string;
  hintBn: string;
  answerBn: string;
  marks: number;
}

export interface CustomWorksheet {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  topicName: string;
  titleBn: string;
  worksheetType: WorksheetType;
  difficulty: WorksheetDifficulty;
  estimatedMinutes: number;
  instructionsBn: string;
  attachmentUrl: string;
  tasks: WorksheetTaskItem[];
  status: ContentPublishStatus;
  createdByUid: string;
  createdByEmail: string;
  createdAtMs: number;
  updatedAtMs: number;
}

export interface AdminContentBundle {
  infographics: CustomInfographic[];
  videos: CustomVideo[];
  questions: CustomQuestionRecord[];
  worksheets: CustomWorksheet[];
}

