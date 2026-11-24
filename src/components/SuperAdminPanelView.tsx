import React, { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ClipboardList,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  Layers,
  Lock,
  Plus,
  ShieldCheck,
  Sliders,
  Sparkles,
  Trash2,
  Users,
  Video,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { CHAPTERS, SUBJECTS, getChapterById, getSubjectById } from '../data/curriculum';
import { BOARD_EXAM_YEARS, BOARD_LABELS, BOARD_NAMES, PAST_EXAM_SESSIONS } from '../data/questions';
import {
  isBootstrappedSuperAdmin,
  subjectToMedicalGroup,
} from '../services/adminContentStore';
import {
  AccessPolicyConfig,
  AccessTier,
  AccountStatus,
  AdminContentBundle,
  AdminRoleEntry,
  AdminUserActivitySummary,
  AdminUserRecord,
  AppTab,
  BoardId,
  ContentPublishStatus,
  CustomInfographic,
  CustomQuestionRecord,
  CustomVideo,
  CustomWorksheet,
  EnrollmentRequestRecord,
  HscLevel,
  InfographicLayoutStyle,
  InfographicNodeItem,
  ManualUserCreateInput,
  SubjectId,
  TargetExam,
  WorksheetDifficulty,
  WorksheetTaskItem,
  WorksheetType,
} from '../types/learning';
import { GlassTiltCard } from './GlassTiltCard';
import { AdminUserManagementTab } from './AdminUserManagementTab';
import { AdminAccessManagementTab } from './AdminAccessManagementTab';

type AdminContentTab = 'infographic' | 'video' | 'question' | 'worksheet' | 'users' | 'access';

interface SuperAdminPanelViewProps {
  user: User | null;
  isCloudSuperAdmin: boolean;
  content: AdminContentBundle;
  cloudUsers: AdminUserRecord[];
  cloudAdmins: AdminRoleEntry[];
  accessPolicy: AccessPolicyConfig;
  enrollmentRequests: EnrollmentRequestRecord[];
  onSignIn: () => void;
  onNavigateTab: (tab: AppTab) => void;
  onSaveInfographic: (
    item: Omit<CustomInfographic, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => Promise<void>;
  onDeleteInfographic: (id: string) => Promise<void>;
  onSaveVideo: (
    item: Omit<CustomVideo, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => Promise<void>;
  onDeleteVideo: (id: string) => Promise<void>;
  onSaveQuestion: (
    item: Omit<CustomQuestionRecord, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => Promise<void>;
  onDeleteQuestion: (id: string) => Promise<void>;
  onSaveWorksheet: (
    item: Omit<CustomWorksheet, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => Promise<void>;
  onDeleteWorksheet: (id: string) => Promise<void>;
  onCreateCloudUser: (input: ManualUserCreateInput) => Promise<AdminUserRecord>;
  onUpdateCloudUser: (
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
  ) => Promise<void>;
  onGrantSuperAdmin: (uid: string, email: string) => Promise<void>;
  onRevokeSuperAdmin: (uid: string) => Promise<void>;
  onDeleteCloudUser: (uid: string) => Promise<void>;
  onLookupUserByUid: (
    uid: string
  ) => Promise<{ user: AdminUserRecord | null; isAdmin: boolean }>;
  onFetchUserActivity: (uid: string) => Promise<AdminUserActivitySummary>;
  onSaveAccessPolicy: (
    policy: Omit<AccessPolicyConfig, 'id' | 'updatedByUid' | 'updatedAtMs'>
  ) => Promise<void>;
  onReviewEnrollmentRequest: (
    req: EnrollmentRequestRecord,
    decision: 'approved' | 'rejected',
    options?: { adminNote?: string; durationDays?: number }
  ) => Promise<void>;
  onSetUserAccessTier: (uid: string, tier: AccessTier, durationDays?: number) => Promise<void>;
}

const OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ'] as const;

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

const EMPTY_NODE = (): InfographicNodeItem => ({
  labelBn: '',
  titleBn: '',
  detailBn: '',
  medicalPearlBn: '',
});

const EMPTY_TASK = (): WorksheetTaskItem => ({
  promptBn: '',
  hintBn: '',
  answerBn: '',
  marks: 2,
});

export const SuperAdminPanelView: React.FC<SuperAdminPanelViewProps> = ({
  user,
  isCloudSuperAdmin,
  content,
  cloudUsers,
  cloudAdmins,
  accessPolicy,
  enrollmentRequests,
  onSignIn,
  onNavigateTab,
  onSaveInfographic,
  onDeleteInfographic,
  onSaveVideo,
  onDeleteVideo,
  onSaveQuestion,
  onDeleteQuestion,
  onSaveWorksheet,
  onDeleteWorksheet,
  onCreateCloudUser,
  onUpdateCloudUser,
  onGrantSuperAdmin,
  onRevokeSuperAdmin,
  onDeleteCloudUser,
  onLookupUserByUid,
  onFetchUserActivity,
  onSaveAccessPolicy,
  onReviewEnrollmentRequest,
  onSetUserAccessTier,
}) => {
  const [activeTab, setActiveTab] = useState<AdminContentTab>('infographic');
  const pendingEnrollmentCount = useMemo(
    () => enrollmentRequests.filter((r) => r.status === 'pending').length,
    [enrollmentRequests]
  );
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Shared Topic Selector State
  const [subjectId, setSubjectId] = useState<SubjectId>('bio_2');
  const [chapterId, setChapterId] = useState<string>('bio2_ch4_blood');
  const [topicName, setTopicName] = useState<string>('রক্তকণিকা ও রক্ত তঞ্চন ফ্যাক্টর');
  const [publishStatus, setPublishStatus] = useState<ContentPublishStatus>('published');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Infographic Form State
  const [infTitle, setInfTitle] = useState('');
  const [infSubtitle, setInfSubtitle] = useState('');
  const [infSummary, setInfSummary] = useState('');
  const [infLayout, setInfLayout] = useState<InfographicLayoutStyle>('concept_map');
  const [infImageUrl, setInfImageUrl] = useState('');
  const [infTakeawaysText, setInfTakeawaysText] = useState('');
  const [infNodes, setInfNodes] = useState<InfographicNodeItem[]>([EMPTY_NODE(), EMPTY_NODE()]);

  // Video Form State
  const [vidTitle, setVidTitle] = useState('');
  const [vidInstructor, setVidInstructor] = useState('ডা. রাফিউল ইসলাম (ঢাকা মেডিকেল)');
  const [vidDuration, setVidDuration] = useState(12);
  const [vidUrl, setVidUrl] = useState('');
  const [vidSummary, setVidSummary] = useState('');
  const [vidPointsText, setVidPointsText] = useState('');
  const [vidNarration, setVidNarration] = useState('');

  // Question Form State
  const [qDifficulty, setQDifficulty] = useState<'board' | 'medical' | 'dental'>('medical');
  const [qHscLevel, setQHscLevel] = useState<HscLevel>('12');
  const [qBoardName, setQBoardName] = useState<BoardId>('dhaka');
  const [qBoardYear, setQBoardYear] = useState<string>('2024');
  const [qPastExamType, setQPastExamType] = useState<'' | 'MBBS' | 'BDS'>('');
  const [qPastExamSession, setQPastExamSession] = useState<string>('2023-24');
  const [qStem, setQStem] = useState('');
  const [qOpt0, setQOpt0] = useState('');
  const [qOpt1, setQOpt1] = useState('');
  const [qOpt2, setQOpt2] = useState('');
  const [qOpt3, setQOpt3] = useState('');
  const [qCorrectIdx, setQCorrectIdx] = useState<0 | 1 | 2 | 3>(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qReference, setQReference] = useState('');

  // Worksheet Form State
  const [wsTitle, setWsTitle] = useState('');
  const [wsType, setWsType] = useState<WorksheetType>('practice_sheet');
  const [wsDifficulty, setWsDifficulty] = useState<WorksheetDifficulty>('medical');
  const [wsMinutes, setWsMinutes] = useState(30);
  const [wsInstructions, setWsInstructions] = useState('');
  const [wsAttachmentUrl, setWsAttachmentUrl] = useState('');
  const [wsTasks, setWsTasks] = useState<WorksheetTaskItem[]>([EMPTY_TASK()]);

  // Right Library Filters
  const [libSubject, setLibSubject] = useState<SubjectId | 'all'>('all');
  const [libSearch, setLibSearch] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const availableChapters = useMemo(
    () => CHAPTERS.filter((c) => c.subjectId === subjectId),
    [subjectId]
  );

  const selectedChapterObj = useMemo(() => getChapterById(chapterId), [chapterId]);

  useEffect(() => {
    const chList = CHAPTERS.filter((c) => c.subjectId === subjectId);
    if (!chList.some((c) => c.id === chapterId) && chList[0]) {
      setChapterId(chList[0].id);
      if (chList[0].keyTopicsBn[0]) {
        setTopicName(chList[0].keyTopicsBn[0]);
      }
      setQHscLevel(chList[0].hscLevel);
    }
  }, [subjectId, chapterId]);

  const resetForms = () => {
    setEditingId(null);
    setPublishStatus('published');
    // Infographic
    setInfTitle('');
    setInfSubtitle('');
    setInfSummary('');
    setInfLayout('concept_map');
    setInfImageUrl('');
    setInfTakeawaysText('');
    setInfNodes([EMPTY_NODE(), EMPTY_NODE()]);
    // Video
    setVidTitle('');
    setVidInstructor('ডা. রাফিউল ইসলাম (ঢাকা মেডিকেল)');
    setVidDuration(12);
    setVidUrl('');
    setVidSummary('');
    setVidPointsText('');
    setVidNarration('');
    // Question
    setQDifficulty('medical');
    setQStem('');
    setQOpt0('');
    setQOpt1('');
    setQOpt2('');
    setQOpt3('');
    setQCorrectIdx(0);
    setQExplanation('');
    setQReference('');
    // Worksheet
    setWsTitle('');
    setWsType('practice_sheet');
    setWsDifficulty('medical');
    setWsMinutes(30);
    setWsInstructions('');
    setWsAttachmentUrl('');
    setWsTasks([EMPTY_TASK()]);
  };

  const handleFillSample = () => {
    setFeedback(null);
    const sub = getSubjectById(subjectId);
    const ch = getChapterById(chapterId);
    const activeTopic = topicName.trim() || ch?.keyTopicsBn[0] || 'মূল টপিক';

    if (activeTab === 'infographic') {
      setInfTitle(`${activeTopic} — ভিজ্যুয়াল চার্ট ও ফ্লো`);
      setInfSubtitle(`${sub?.nameBn || ''} · ${ch?.chapterNumberBn || ''} (${ch?.nameBn || ''})`);
      setInfSummary(
        `${activeTopic} টপিকের প্রধান ধাপ, শ্রেণিবিভাগ এবং মেডিকেল ভর্তি পরীক্ষায় আসা গুরুত্বপূর্ণ তথ্যগুলোর সংক্ষিপ্ত ভিজ্যুয়াল সারসংক্ষেপ।`
      );
      setInfLayout('process_flow');
      setInfTakeawaysText(
        `${activeTopic}-এর মূল সূত্র ও উদাহরণগুলো ছকের মাধ্যমে মনে রাখা সহজ।\nবিগত MBBS ও বোর্ড পরীক্ষায় এই অংশ থেকে নিয়মিত প্রশ্ন আসে।`
      );
      setInfNodes([
        {
          labelBn: 'ধাপ ০১',
          titleBn: `${activeTopic}-এর মৌলিক ধারণা`,
          detailBn: 'সংজ্ঞা, মূল উপাদান ও প্রাথমিক কার্যপদ্ধতি সংক্ষেপে চিহ্নিত করুন।',
          medicalPearlBn: 'মেডিকেল তথ্য: মূল একক ও সংখ্যাগুলো মনে রাখুন।',
        },
        {
          labelBn: 'ধাপ ০২',
          titleBn: 'প্রধান প্রক্রিয়া ও নিয়ন্ত্রণ',
          detailBn: 'প্রভাবকসমূহ, ব্যতিক্রম এবং বাস্তব প্রয়োগগুলো তুলনামূলকভাবে সাজান।',
          medicalPearlBn: 'হাই-ইল্ড: ব্যতিক্রমধর্মী উদাহরণ ভর্তি পরীক্ষায় বেশি আসে।',
        },
      ]);
      return;
    }

    if (activeTab === 'video') {
      setVidTitle(`${activeTopic} — স্মার্টবোর্ড ওয়ান-শট ক্লাস`);
      setVidInstructor('ডা. রাফিউল ইসলাম (ঢাকা মেডিকেল)');
      setVidDuration(15);
      setVidSummary(
        `${activeTopic} বিষয়টি সহজ উদাহরণ, সমীকরণ ও ভর্তি পরীক্ষার শর্টকাট ট্রিকসসহ বিস্তারিত আলোচনা।`
      );
      setVidPointsText(
        `${activeTopic}-এর মূল নীতি ও ব্যতিক্রমসমূহ\nবোর্ড সৃজনশীল (গ ও ঘ) ও MCQ সমাধানের কৌশল\nমেডিকেল অ্যাডমিশন র‍্যাপিড রিভিশন পয়েন্ট`
      );
      setVidNarration(
        `আজকের লেকচারে আমরা ${ch?.nameBn || ''} অধ্যায়ের গুরুত্বপূর্ণ টপিক ${activeTopic} নিয়ে আলোচনা করব। পরীক্ষার হলে দ্রুত উত্তর করার জন্য প্রতিটি মূল পয়েন্ট মনোযোগ দিয়ে নোট করে নাও।`
      );
      return;
    }

    if (activeTab === 'question') {
      setQDifficulty('medical');
      setQStem(`${activeTopic} সম্পর্কিত নিচের কোন তথ্যটি সর্বাধিক সঠিক?`);
      setQOpt0('প্রথম সঠিক বৈশিষ্ট্য বা মান');
      setQOpt1('দ্বিতীয় বিভ্রান্তিকর বিকল্প');
      setQOpt2('তৃতীয় অসংশ্লিষ্ট বিকল্প');
      setQOpt3('চতুর্থ বিকল্প');
      setQCorrectIdx(0);
      setQExplanation(`${activeTopic} টপিকের মূল পাঠ্যবই বিশ্লেষণ অনুসারে প্রথম বিকল্পটিই সঠিক।`);
      setQReference(`${sub?.nameBn || ''} · ${ch?.nameBn || ''}`);
      return;
    }

    setWsTitle(`${activeTopic} — অনুশীলন ওয়ার্কশীট`);
    setWsType('practice_sheet');
    setWsDifficulty('medical');
    setWsMinutes(25);
    setWsInstructions(
      `নির্ধারিত ২৫ মিনিটের মধ্যে বই না দেখে নিচের প্রশ্ন ও সমস্যাগুলো সমাধান করুন এবং শেষে উত্তরপত্রের সাথে মিলিয়ে নিন।`
    );
    setWsTasks([
      {
        promptBn: `${activeTopic}-এর মূল প্রক্রিয়াটি প্রবাহচিত্রের (Flowchart) মাধ্যমে ৩টি ধাপে ব্যাখ্যা করো।`,
        hintBn: 'শুরুর উপাদান, মাধ্যম ও চূড়ান্ত উৎপাদগুলো আলাদাভাবে চিহ্নিত করো।',
        answerBn: 'ধাপ ১: সূচনা -> ধাপ ২: রূপান্তর -> ধাপ ৩: চূড়ান্ত ফলাফল ও নিয়ন্ত্রণ।',
        marks: 3,
      },
      {
        promptBn: `${activeTopic} থেকে বোর্ড ও মেডিকেল পরীক্ষায় আসা ২টি গুরুত্বপূর্ণ পার্থক্য লেখো।`,
        hintBn: 'কার্যকারিতা ও অবস্থানগত পার্থক্য উল্লেখ করো।',
        answerBn: '১. অবস্থানগত পার্থক্য; ২. এনজাইম/ভৌত ধর্মগত বৈশিষ্ট্য।',
        marks: 2,
      },
    ]);
  };

  const handleSubmitInfographic = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const validNodes = infNodes.filter((n) => n.titleBn.trim() && n.detailBn.trim());
    if (!infTitle.trim() || !infSummary.trim() || validNodes.length === 0) {
      setFeedback({
        type: 'error',
        text: 'ইনফোগ্রাফের শিরোনাম, সারসংক্ষেপ এবং অন্তত ১টি সম্পূর্ণ ধাপ/নোড পূরণ করুন।',
      });
      return;
    }

    const takeaways = infTakeawaysText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 8);

    const id = editingId || `inf_${Date.now()}`;
    setSaving(true);
    try {
      await onSaveInfographic(
        {
          id,
          subjectId,
          chapterId,
          topicName: topicName.trim() || selectedChapterObj?.nameBn || 'সাধারণ টপিক',
          titleBn: infTitle.trim(),
          subtitleBn: infSubtitle.trim(),
          summaryBn: infSummary.trim(),
          layoutStyle: infLayout,
          imageUrl: infImageUrl.trim(),
          nodes: validNodes.slice(0, 10).map((n, i) => ({
            labelBn: n.labelBn.trim() || `অংশ ${toBnDigits(i + 1)}`,
            titleBn: n.titleBn.trim(),
            detailBn: n.detailBn.trim(),
            medicalPearlBn: n.medicalPearlBn.trim(),
          })),
          keyTakeawaysBn: takeaways,
          status: publishStatus,
        },
        !editingId
      );
      setFeedback({
        type: 'success',
        text: editingId ? 'ইনফোগ্রাফ সফলভাবে আপডেট হয়েছে।' : 'নতুন ইনফোগ্রাফ সফলভাবে সংরক্ষিত হয়েছে!',
      });
      resetForms();
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!vidTitle.trim() || (!vidUrl.trim() && !vidSummary.trim())) {
      setFeedback({
        type: 'error',
        text: 'ভিডিওর শিরোনাম এবং ভিডিও লিংক অথবা স্মার্টবোর্ড সারসংক্ষেপ প্রদান করুন।',
      });
      return;
    }

    const points = vidPointsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 10);

    const id = editingId || `vid_${Date.now()}`;
    setSaving(true);
    try {
      await onSaveVideo(
        {
          id,
          subjectId,
          chapterId,
          topicName: topicName.trim() || selectedChapterObj?.nameBn || 'সাধারণ টপিক',
          titleBn: vidTitle.trim(),
          instructorBn: vidInstructor.trim() || 'সুপার এডমিন',
          durationMin: Math.min(240, Math.max(1, Number(vidDuration) || 10)),
          videoUrl: vidUrl.trim(),
          boardSummaryBn: vidSummary.trim(),
          boardPoints: points,
          narrationBn: vidNarration.trim(),
          status: publishStatus,
        },
        !editingId
      );
      setFeedback({
        type: 'success',
        text: editingId ? 'ভিডিও লেকচার আপডেট হয়েছে।' : 'নতুন ভিডিও লেকচার সফলভাবে যোগ হয়েছে!',
      });
      resetForms();
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'ভিডিও সংরক্ষণ করা যায়নি।',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    if (!qStem.trim() || !qOpt0.trim() || !qOpt1.trim() || !qOpt2.trim() || !qOpt3.trim()) {
      setFeedback({
        type: 'error',
        text: 'প্রশ্ন এবং চারটি বিকল্প (ক, খ, গ, ঘ) সম্পূর্ণ পূরণ করুন।',
      });
      return;
    }

    const id = editingId || `cq_${Date.now()}`;
    setSaving(true);
    try {
      await onSaveQuestion(
        {
          id,
          subjectId,
          medicalGroup: subjectToMedicalGroup(subjectId),
          chapterId,
          topicName: topicName.trim() || selectedChapterObj?.nameBn || 'সাধারণ টপিক',
          hscLevel: qHscLevel,
          difficulty: qDifficulty,
          boardName: qDifficulty === 'board' ? qBoardName : undefined,
          boardYear: qDifficulty === 'board' ? qBoardYear : undefined,
          pastExamType: qDifficulty !== 'board' && qPastExamType ? qPastExamType : undefined,
          pastExamSession:
            qDifficulty !== 'board' && qPastExamType ? qPastExamSession : undefined,
          question: qStem.trim(),
          options: [qOpt0.trim(), qOpt1.trim(), qOpt2.trim(), qOpt3.trim()],
          correctIndex: qCorrectIdx,
          explanation: qExplanation.trim() || 'পাঠ্যবইয়ের মূল অংশ থেকে সংকলিত সঠিক উত্তর।',
          reference:
            qReference.trim() ||
            `${getSubjectById(subjectId)?.nameBn || ''} · ${selectedChapterObj?.nameBn || ''}`,
          status: publishStatus,
        },
        !editingId
      );
      setFeedback({
        type: 'success',
        text: editingId
          ? 'প্রশ্নটি সফলভাবে আপডেট হয়েছে।'
          : 'নতুন প্রশ্নটি সফলভাবে প্রশ্ন ব্যাংক ও প্র্যাকটিসে যুক্ত হয়েছে!',
      });
      resetForms();
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'প্রশ্ন সংরক্ষণ করা যায়নি।',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitWorksheet = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    const validTasks = wsTasks.filter((t) => t.promptBn.trim());
    if (!wsTitle.trim() || validTasks.length === 0) {
      setFeedback({
        type: 'error',
        text: 'ওয়ার্কশীটের শিরোনাম এবং অন্তত ১টি কাজ/প্রশ্ন যোগ করুন।',
      });
      return;
    }

    const id = editingId || `ws_${Date.now()}`;
    setSaving(true);
    try {
      await onSaveWorksheet(
        {
          id,
          subjectId,
          chapterId,
          topicName: topicName.trim() || selectedChapterObj?.nameBn || 'সাধারণ টপিক',
          titleBn: wsTitle.trim(),
          worksheetType: wsType,
          difficulty: wsDifficulty,
          estimatedMinutes: Math.min(180, Math.max(5, Number(wsMinutes) || 30)),
          instructionsBn: wsInstructions.trim(),
          attachmentUrl: wsAttachmentUrl.trim(),
          tasks: validTasks.slice(0, 20).map((t) => ({
            promptBn: t.promptBn.trim(),
            hintBn: t.hintBn.trim(),
            answerBn: t.answerBn.trim(),
            marks: Math.min(20, Math.max(1, Number(t.marks) || 1)),
          })),
          status: publishStatus,
        },
        !editingId
      );
      setFeedback({
        type: 'success',
        text: editingId ? 'ওয়ার্কশীট আপডেট হয়েছে।' : 'নতুন ওয়ার্কশীট সফলভাবে প্রকাশিত হয়েছে!',
      });
      resetForms();
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'ওয়ার্কশীট সংরক্ষণ করা যায়নি।',
      });
    } finally {
      setSaving(false);
    }
  };

  const loadInfographicForEdit = (item: CustomInfographic) => {
    setActiveTab('infographic');
    setEditingId(item.id);
    setSubjectId(item.subjectId);
    setChapterId(item.chapterId);
    setTopicName(item.topicName);
    setPublishStatus(item.status);
    setInfTitle(item.titleBn);
    setInfSubtitle(item.subtitleBn);
    setInfSummary(item.summaryBn);
    setInfLayout(item.layoutStyle);
    setInfImageUrl(item.imageUrl);
    setInfTakeawaysText(item.keyTakeawaysBn.join('\n'));
    setInfNodes(item.nodes.length > 0 ? item.nodes : [EMPTY_NODE()]);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadVideoForEdit = (item: CustomVideo) => {
    setActiveTab('video');
    setEditingId(item.id);
    setSubjectId(item.subjectId);
    setChapterId(item.chapterId);
    setTopicName(item.topicName);
    setPublishStatus(item.status);
    setVidTitle(item.titleBn);
    setVidInstructor(item.instructorBn);
    setVidDuration(item.durationMin);
    setVidUrl(item.videoUrl);
    setVidSummary(item.boardSummaryBn);
    setVidPointsText(item.boardPoints.join('\n'));
    setVidNarration(item.narrationBn);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadQuestionForEdit = (item: CustomQuestionRecord) => {
    setActiveTab('question');
    setEditingId(item.id);
    setSubjectId(item.subjectId);
    setChapterId(item.chapterId);
    setTopicName(item.topicName);
    setPublishStatus(item.status);
    setQDifficulty(item.difficulty);
    setQHscLevel(item.hscLevel);
    setQBoardName(item.boardName || 'dhaka');
    setQBoardYear(item.boardYear || '2024');
    setQPastExamType(item.pastExamType || '');
    setQPastExamSession(item.pastExamSession || '2023-24');
    setQStem(item.question);
    setQOpt0(item.options[0]);
    setQOpt1(item.options[1]);
    setQOpt2(item.options[2]);
    setQOpt3(item.options[3]);
    setQCorrectIdx(item.correctIndex);
    setQExplanation(item.explanation);
    setQReference(item.reference);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadWorksheetForEdit = (item: CustomWorksheet) => {
    setActiveTab('worksheet');
    setEditingId(item.id);
    setSubjectId(item.subjectId);
    setChapterId(item.chapterId);
    setTopicName(item.topicName);
    setPublishStatus(item.status);
    setWsTitle(item.titleBn);
    setWsType(item.worksheetType);
    setWsDifficulty(item.difficulty);
    setWsMinutes(item.estimatedMinutes);
    setWsInstructions(item.instructionsBn);
    setWsAttachmentUrl(item.attachmentUrl);
    setWsTasks(item.tasks.length > 0 ? item.tasks : [EMPTY_TASK()]);
    setFeedback(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const matchesFilter = (subId: SubjectId, textParts: string[]) => {
    if (libSubject !== 'all' && subId !== libSubject) return false;
    const q = libSearch.trim().toLowerCase();
    if (!q) return true;
    return textParts.some((t) => t.toLowerCase().includes(q));
  };

  const filteredInfographics = content.infographics.filter((item) =>
    matchesFilter(item.subjectId, [item.titleBn, item.topicName, item.summaryBn])
  );
  const filteredVideos = content.videos.filter((item) =>
    matchesFilter(item.subjectId, [item.titleBn, item.topicName, item.instructorBn])
  );
  const filteredQuestions = content.questions.filter((item) =>
    matchesFilter(item.subjectId, [item.question, item.topicName, item.reference])
  );
  const filteredWorksheets = content.worksheets.filter((item) =>
    matchesFilter(item.subjectId, [item.titleBn, item.topicName, item.instructionsBn])
  );

  const countPublished = <T extends { status: ContentPublishStatus }>(arr: T[]) =>
    arr.filter((x) => x.status === 'published').length;

  return (
    <div className="space-y-6">
      {/* Super Admin Hero Banner */}
      <section className="glass-hero-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 w-56 h-56 rounded-full bg-gradient-to-br from-[#8B5CF6]/25 to-sky-400/20 blur-2xl"
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
              <ShieldCheck className="w-4 h-4" />
              সুপার এডমিন কন্টেন্ট ম্যানেজমেন্ট কনসোল
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              টপিকভিত্তিক ইনফোগ্রাফ, ভিডিও, প্রশ্ন ও ওয়ার্কশীট ম্যানেজার
            </h1>
            <p className="text-xs sm:text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
              যেকোনো বিষয়, অধ্যায় ও টপিক নির্বাচন করে সরাসরি ইন্টারেক্টিভ ইনফোগ্রাফ, স্মার্টবোর্ড ও ভিডিও লেকচার, MCQ প্রশ্ন এবং অনুশীলন ওয়ার্কশীট যুক্ত ও প্রকাশ করুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateTab('visual')}
              className="glass-btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl whitespace-nowrap"
            >
              <Eye className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              ভিজ্যুয়াল হাব দেখুন
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('worksheets')}
              className="glass-btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl whitespace-nowrap"
            >
              <FileText className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              ওয়ার্কশীট দেখুন
            </button>
          </div>
        </div>

        {/* Cloud vs Local Sync Status Strip */}
        <div className="relative mt-5 p-3.5 bio-subpanel rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {isCloudSuperAdmin ? (
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                ক্লাউড সুপার এডমিন সক্রিয় ({user?.email}) · এখানে প্রকাশিত সব কন্টেন্ট সব শিক্ষার্থীর জন্য Firestore-এ সংরক্ষিত হচ্ছে।
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 text-[#554578] dark:text-[#B6ABD6]">
                <Lock className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0" />
                {user && (
                  <span>
                    বর্তমান অ্যাকাউন্ট ({user.email}) সুপার এডমিন হিসেবে অনুমোদিত নয়।
                  </span>
                )}
              </div>
              {!user && (
                <button
                  type="button"
                  onClick={onSignIn}
                  className="glass-btn-primary px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap"
                >
                  সাইন-ইন
                </button>
              )}
            </>
          )}
        </div>

        {/* 6 Summary KPI Tiles (Only visible after Super Admin sign-in) */}
        {isCloudSuperAdmin && (
        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-5">
          {[
            {
              tab: 'infographic' as const,
              label: 'ইনফোগ্রাফ',
              total: content.infographics.length,
              subLabel: `প্রকাশিত: ${toBnDigits(countPublished(content.infographics))}টি`,
              icon: ImageIcon,
            },
            {
              tab: 'video' as const,
              label: 'ভিডিও লেকচার',
              total: content.videos.length,
              subLabel: `প্রকাশিত: ${toBnDigits(countPublished(content.videos))}টি`,
              icon: Video,
            },
            {
              tab: 'question' as const,
              label: 'প্রশ্ন (MCQ)',
              total: content.questions.length,
              subLabel: `প্রকাশিত: ${toBnDigits(countPublished(content.questions))}টি`,
              icon: HelpCircle,
            },
            {
              tab: 'worksheet' as const,
              label: 'ওয়ার্কশীট',
              total: content.worksheets.length,
              subLabel: `প্রকাশিত: ${toBnDigits(countPublished(content.worksheets))}টি`,
              icon: FileText,
            },
            {
              tab: 'users' as const,
              label: 'ইউজার নিয়ন্ত্রণ',
              total: cloudUsers.length,
              subLabel: `সক্রিয়: ${toBnDigits(
                cloudUsers.filter((u) => u.accountStatus !== 'suspended').length
              )} জন`,
              icon: Users,
            },
            {
              tab: 'access' as const,
              label: 'অ্যাক্সেস ও প্ল্যান',
              total: pendingEnrollmentCount,
              subLabel: `${toBnDigits(accessPolicy.trialDurationDays)} দিন ফ্রি · ${toBnDigits(accessPolicy.proPriceBdt)}৳ প্রো`,
              icon: Sliders,
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <GlassTiltCard key={stat.tab} maxTiltDeg={2.2} className="rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(stat.tab);
                    resetForms();
                  }}
                  className={`w-full text-left p-4 rounded-xl transition-all glass-card-3d ${
                    activeTab === stat.tab ? 'glass-option-selected' : 'bio-subpanel'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
                    <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">{stat.label}</span>
                    <Icon className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                  </div>
                  <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF] mt-1.5">
                    {toBnDigits(stat.total)}
                  </div>
                  <div className="text-[11px] text-[#554578] dark:text-[#A598C9] mt-0.5 font-mono-tabular">
                    {stat.subLabel}
                  </div>
                </button>
              </GlassTiltCard>
            );
          })}
        </div>
        )}
      </section>

      {isCloudSuperAdmin && (
      <>
      {/* Primary Admin Segmented Tabs */}
      <div className="glass-segment-track grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-1.5 rounded-2xl">
        {(
          [
            { id: 'infographic', label: 'ইনফোগ্রাফ যোগ করুন', icon: Layers },
            { id: 'video', label: 'ভিডিও যোগ করুন', icon: Video },
            { id: 'question', label: 'প্রশ্ন (MCQ) যোগ করুন', icon: HelpCircle },
            { id: 'worksheet', label: 'ওয়ার্কশীট যোগ করুন', icon: ClipboardList },
            { id: 'users', label: 'ইউজার ম্যানেজমেন্ট', icon: Users },
            {
              id: 'access',
              label:
                pendingEnrollmentCount > 0
                  ? `অ্যাক্সেস ও প্ল্যান (${toBnDigits(pendingEnrollmentCount)})`
                  : 'অ্যাক্সেস ও প্ল্যান',
              icon: Sliders,
            },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setFeedback(null);
                setEditingId(null);
              }}
              className={`inline-flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                isActive ? 'glass-segment-active' : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'access' ? (
        <AdminAccessManagementTab
          currentUser={user}
          isBootstrappedAdmin={isBootstrappedSuperAdmin(user)}
          policy={accessPolicy}
          enrollmentRequests={enrollmentRequests}
          users={cloudUsers}
          onSavePolicy={onSaveAccessPolicy}
          onReviewRequest={onReviewEnrollmentRequest}
          onSetUserAccessTier={onSetUserAccessTier}
        />
      ) : activeTab === 'users' ? (
        <AdminUserManagementTab
          currentUser={user}
          isCloudSuperAdmin={isCloudSuperAdmin}
          isBootstrappedAdmin={isBootstrappedSuperAdmin(user)}
          users={cloudUsers}
          admins={cloudAdmins}
          defaultTrialDays={accessPolicy.trialDurationDays}
          defaultProDays={accessPolicy.proDurationDays}
          onSignIn={onSignIn}
          onCreateUser={onCreateCloudUser}
          onUpdateUser={onUpdateCloudUser}
          onGrantSuperAdmin={onGrantSuperAdmin}
          onRevokeSuperAdmin={onRevokeSuperAdmin}
          onDeleteUser={onDeleteCloudUser}
          onLookupUserByUid={onLookupUserByUid}
          onFetchUserActivity={onFetchUserActivity}
        />
      ) : (
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Form Builder */}
        <div className="lg:col-span-7 bio-card rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                {editingId ? 'সংরক্ষিত কন্টেন্ট সম্পাদনা করুন' : 'নতুন টপিক কন্টেন্ট তৈরি করুন'}
              </h2>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                প্রথমে বিষয়, অধ্যায় ও টপিক নির্বাচন করে নিচের ফরমটি পূরণ করুন।
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFillSample}
                className="glass-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6D4ACF] dark:text-[#C4B5FD] rounded-xl"
              >
                <Sparkles className="w-3.5 h-3.5" />
                নমুনা ডেটা বসান
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForms}
                  className="glass-btn-secondary px-3 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-300 rounded-xl"
                >
                  বাতিল
                </button>
              )}
            </div>
          </div>

          {feedback && (
            <div
              className={`px-4 py-3 rounded-xl text-xs font-medium border ${
                feedback.type === 'success'
                  ? 'bg-emerald-50/85 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-400/35 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50/85 dark:bg-rose-950/60 border-rose-300 dark:border-rose-400/35 text-rose-900 dark:text-rose-200'
              }`}
            >
              {feedback.text}
            </div>
          )}

          {/* Shared Topic Targeting Block */}
          <div className="bio-subpanel rounded-xl p-4 space-y-3.5">
            <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
              ১. বিষয়, অধ্যায় ও টপিক নির্ধারণ
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">বিষয়</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value as SubjectId)}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nameBn}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">অধ্যায়</label>
                <select
                  value={chapterId}
                  onChange={(e) => {
                    const nextCh = e.target.value;
                    setChapterId(nextCh);
                    const chObj = getChapterById(nextCh);
                    if (chObj?.keyTopicsBn[0]) {
                      setTopicName(chObj.keyTopicsBn[0]);
                    }
                    if (chObj) setQHscLevel(chObj.hscLevel);
                  }}
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                >
                  {availableChapters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.chapterNumberBn}: {c.nameBn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                টপিক নির্বাচন করুন বা নতুন টপিক লিখুন
              </label>
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                maxLength={160}
                placeholder="যেমন: হৃৎপিণ্ডের কপাটিকা ও কার্ডিয়াক চক্র"
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
              {selectedChapterObj && selectedChapterObj.keyTopicsBn.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedChapterObj.keyTopicsBn.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopicName(t)}
                      className={`px-2.5 py-1 text-[11px] rounded-lg transition-all ${
                        topicName === t
                          ? 'glass-btn-primary font-semibold'
                          : 'glass-btn-secondary text-[#554578] dark:text-[#B6ABD6]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <span className="text-xs font-medium text-[#554578] dark:text-[#B6ABD6]">প্রকাশ অবস্থা:</span>
              <div className="glass-segment-track flex items-center gap-1 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPublishStatus('published')}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    publishStatus === 'published'
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6]'
                  }`}
                >
                  প্রকাশিত (লাইভ)
                </button>
                <button
                  type="button"
                  onClick={() => setPublishStatus('draft')}
                  className={`px-3 py-1 text-xs rounded-lg transition-all ${
                    publishStatus === 'draft'
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6]'
                  }`}
                >
                  খসড়া (ড্রাফট)
                </button>
              </div>
            </div>
          </div>

          {/* FORM 1: INFOGRAPHIC */}
          {activeTab === 'infographic' && (
            <form onSubmit={(e) => void handleSubmitInfographic(e)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ইনফোগ্রাফের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={180}
                    value={infTitle}
                    onChange={(e) => setInfTitle(e.target.value)}
                    placeholder="যেমন: কার্ডিয়াক চক্র ও ECG তরঙ্গ"
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ডায়াগ্রাম লেআউট ধরন
                  </label>
                  <select
                    value={infLayout}
                    onChange={(e) => setInfLayout(e.target.value as InfographicLayoutStyle)}
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  >
                    <option value="concept_map">কনসেপ্ট ম্যাপ (Concept Map)</option>
                    <option value="process_flow">ধাপভিত্তিক প্রবাহ (Process Flow)</option>
                    <option value="comparison_table">তুলনামূলক ছক (Comparison Matrix)</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">উপশিরোনাম</label>
                  <input
                    type="text"
                    maxLength={260}
                    value={infSubtitle}
                    onChange={(e) => setInfSubtitle(e.target.value)}
                    placeholder="সংক্ষিপ্ত পরিচিতি"
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ছবির লিংক (ঐচ্ছিক HTTPS URL)
                  </label>
                  <input
                    type="url"
                    maxLength={1000}
                    value={infImageUrl}
                    onChange={(e) => setInfImageUrl(e.target.value)}
                    placeholder="https://example.com/diagram.png"
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  মূল সারসংক্ষেপ *
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={2000}
                  value={infSummary}
                  onChange={(e) => setInfSummary(e.target.value)}
                  placeholder="ইনফোগ্রাফটির মূল বিষয়বস্তু সংক্ষেপে লিখুন..."
                  className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                    ইন্টারঅ্যাক্টিভ ইনফোগ্রাফ ব্লক / নোড ({toBnDigits(infNodes.length)}/১০)
                  </span>
                  {infNodes.length < 10 && (
                    <button
                      type="button"
                      onClick={() => setInfNodes((prev) => [...prev, EMPTY_NODE()])}
                      className="glass-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      ব্লক যোগ করুন
                    </button>
                  )}
                </div>

                {infNodes.map((node, idx) => (
                  <div key={idx} className="bio-subpanel rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] font-mono-tabular">
                        ব্লক #{toBnDigits(idx + 1)}
                      </span>
                      {infNodes.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            setInfNodes((prev) => prev.filter((_, i) => i !== idx))
                          }
                          className="text-xs text-rose-700 dark:text-rose-300 hover:underline"
                        >
                          মুছুন
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="লেবেল (যেমন: ধাপ ০১)"
                        value={node.labelBn}
                        onChange={(e) =>
                          setInfNodes((prev) =>
                            prev.map((n, i) => (i === idx ? { ...n, labelBn: e.target.value } : n))
                          )
                        }
                        className="glass-input px-2.5 py-1.5 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                      />
                      <input
                        type="text"
                        placeholder="শিরোনাম *"
                        value={node.titleBn}
                        onChange={(e) =>
                          setInfNodes((prev) =>
                            prev.map((n, i) => (i === idx ? { ...n, titleBn: e.target.value } : n))
                          )
                        }
                        className="glass-input sm:col-span-2 px-2.5 py-1.5 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="বিস্তারিত ব্যাখ্যা *"
                      value={node.detailBn}
                      onChange={(e) =>
                        setInfNodes((prev) =>
                          prev.map((n, i) => (i === idx ? { ...n, detailBn: e.target.value } : n))
                        )
                      }
                      className="glass-input w-full px-2.5 py-1.5 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                    />
                    <input
                      type="text"
                      placeholder="মেডিকেল হাই-ইল্ড নোট (ঐচ্ছিক)"
                      value={node.medicalPearlBn}
                      onChange={(e) =>
                        setInfNodes((prev) =>
                          prev.map((n, i) =>
                            i === idx ? { ...n, medicalPearlBn: e.target.value } : n
                          )
                        )
                      }
                      className="glass-input w-full px-2.5 py-1.5 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  গুরুত্বপূর্ণ সারমর্ম / শর্টকাট (প্রতি লাইনে একটি করে)
                </label>
                <textarea
                  rows={2}
                  value={infTakeawaysText}
                  onChange={(e) => setInfTakeawaysText(e.target.value)}
                  placeholder="প্রতি লাইনে একটি গুরুত্বপূর্ণ তথ্য লিখুন..."
                  className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="glass-btn-primary w-full py-2.5 px-5 text-sm font-semibold rounded-xl disabled:opacity-60"
              >
                {saving
                  ? 'সংরক্ষণ হচ্ছে...'
                  : editingId
                    ? 'ইনফোগ্রাফ আপডেট করুন'
                    : 'ইনফোগ্রাফ সংরক্ষণ ও প্রকাশ করুন'}
              </button>
            </form>
          )}

          {/* FORM 2: VIDEO */}
          {activeTab === 'video' && (
            <form onSubmit={(e) => void handleSubmitVideo(e)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ভিডিও লেকচারের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={180}
                    value={vidTitle}
                    onChange={(e) => setVidTitle(e.target.value)}
                    placeholder="যেমন: বোর প্রভাব ও গ্যাস পরিবহন"
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    শিক্ষক / ইন্সট্রাক্টর *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={vidInstructor}
                    onChange={(e) => setVidInstructor(e.target.value)}
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ভিডিও URL (YouTube / MP4 লিংক — ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    maxLength={500}
                    value={vidUrl}
                    onChange={(e) => setVidUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    সময়কাল (মিনিট)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={240}
                    value={vidDuration}
                    onChange={(e) => setVidDuration(Number(e.target.value))}
                    className="glass-input w-full px-3 py-2 text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  স্মার্টবোর্ড সারসংক্ষেপ / সূত্র
                </label>
                <textarea
                  rows={2}
                  maxLength={2000}
                  value={vidSummary}
                  onChange={(e) => setVidSummary(e.target.value)}
                  placeholder="লেকচারের মূল সূত্র, সমীকরণ বা সারসংক্ষেপ লিখুন..."
                  className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  স্মার্টবোর্ড বুলেট পয়েন্ট (প্রতি লাইনে একটি করে, সর্বোচ্চ ১০টি)
                </label>
                <textarea
                  rows={3}
                  value={vidPointsText}
                  onChange={(e) => setVidPointsText(e.target.value)}
                  placeholder="পয়েন্ট ১&#10;পয়েন্ট ২&#10;পয়েন্ট ৩"
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  বাংলা ন্যারেশন / লেকচার স্ক্রিপ্ট (ভয়েস প্লেব্যাকের জন্য)
                </label>
                <textarea
                  rows={2}
                  maxLength={2000}
                  value={vidNarration}
                  onChange={(e) => setVidNarration(e.target.value)}
                  placeholder="শিক্ষার্থীরা 'ভয়েস চালু' করলে যে অডিও/ব্যাখ্যা শুনবে..."
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="glass-btn-primary w-full py-2.5 px-5 text-sm font-semibold rounded-xl disabled:opacity-60"
              >
                {saving
                  ? 'সংরক্ষণ হচ্ছে...'
                  : editingId
                    ? 'ভিডিও আপডেট করুন'
                    : 'ভিডিও সংরক্ষণ ও প্রকাশ করুন'}
              </button>
            </form>
          )}

          {/* FORM 3: QUESTION (MCQ) */}
          {activeTab === 'question' && (
            <form onSubmit={(e) => void handleSubmitQuestion(e)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    প্রশ্নের ধরন
                  </label>
                  <select
                    value={qDifficulty}
                    onChange={(e) =>
                      setQDifficulty(e.target.value as 'board' | 'medical' | 'dental')
                    }
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  >
                    <option value="medical">মেডিকেল অ্যাডমিশন (MBBS)</option>
                    <option value="dental">ডেন্টাল অ্যাডমিশন (BDS)</option>
                    <option value="board">বোর্ড পরীক্ষা (HSC বোর্ড)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    শ্রেণি স্তর
                  </label>
                  <select
                    value={qHscLevel}
                    onChange={(e) => setQHscLevel(e.target.value as HscLevel)}
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  >
                    <option value="11">একাদশ শ্রেণি</option>
                    <option value="12">দ্বাদশ শ্রেণি</option>
                    <option value="admission">অ্যাডমিশন স্পেশাল</option>
                  </select>
                </div>
              </div>

              {qDifficulty === 'board' ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">বোর্ড</label>
                    <select
                      value={qBoardName}
                      onChange={(e) => setQBoardName(e.target.value as BoardId)}
                      className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    >
                      {BOARD_NAMES.map((b) => (
                        <option key={b} value={b}>
                          {BOARD_LABELS[b]}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">সাল</label>
                    <select
                      value={qBoardYear}
                      onChange={(e) => setQBoardYear(e.target.value)}
                      className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    >
                      {BOARD_EXAM_YEARS.map((y) => (
                        <option key={y} value={y}>
                          {toBnDigits(y)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      বিগত ভর্তি পরীক্ষা ট্যাগ (ঐচ্ছিক)
                    </label>
                    <select
                      value={qPastExamType}
                      onChange={(e) => setQPastExamType(e.target.value as '' | 'MBBS' | 'BDS')}
                      className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    >
                      <option value="">নতুন/হাই-ইল্ড প্রশ্ন (বিগত নয়)</option>
                      <option value="MBBS">বিগত MBBS ভর্তি পরীক্ষা</option>
                      <option value="BDS">বিগত BDS ভর্তি পরীক্ষা</option>
                    </select>
                  </div>
                  {qPastExamType && (
                    <div>
                      <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">সেশন</label>
                      <select
                        value={qPastExamSession}
                        onChange={(e) => setQPastExamSession(e.target.value)}
                        className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                      >
                        {PAST_EXAM_SESSIONS.map((s) => (
                          <option key={s} value={s}>
                            {toBnDigits(s)}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  প্রশ্ন *
                </label>
                <textarea
                  required
                  rows={2}
                  maxLength={600}
                  value={qStem}
                  onChange={(e) => setQStem(e.target.value)}
                  placeholder="MCQ প্রশ্নটি লিখুন..."
                  className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-[#554578] dark:text-[#B6ABD6]">
                  ৪টি বিকল্প লিখুন এবং সঠিক উত্তরে টিক দিন *
                </div>
                {(
                  [
                    [qOpt0, setQOpt0],
                    [qOpt1, setQOpt1],
                    [qOpt2, setQOpt2],
                    [qOpt3, setQOpt3],
                  ] as const
                ).map(([val, setter], idx) => {
                  const optIndex = idx as 0 | 1 | 2 | 3;
                  const isRight = qCorrectIdx === optIndex;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setQCorrectIdx(optIndex)}
                        title="সঠিক উত্তর হিসেবে চিহ্নিত করুন"
                        className={`w-9 h-9 rounded-xl text-xs font-bold shrink-0 transition-all ${
                          isRight
                            ? 'glass-btn-emerald'
                            : 'glass-btn-secondary text-[#554578] dark:text-[#B6ABD6]'
                        }`}
                      >
                        {OPTION_LABELS[idx]}
                      </button>
                      <input
                        type="text"
                        required
                        maxLength={250}
                        value={val}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={`বিকল্প ${OPTION_LABELS[idx]}`}
                        className="glass-input flex-1 px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ব্যাখ্যা *
                  </label>
                  <textarea
                    rows={2}
                    maxLength={1200}
                    value={qExplanation}
                    onChange={(e) => setQExplanation(e.target.value)}
                    placeholder="উত্তরটি কেন সঠিক তার সংক্ষিপ্ত ব্যাখ্যা..."
                    className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    রেফারেন্স (পাঠ্যবই / উৎস)
                  </label>
                  <textarea
                    rows={2}
                    maxLength={240}
                    value={qReference}
                    onChange={(e) => setQReference(e.target.value)}
                    placeholder="যেমন: গাজী আজমল · অধ্যায় ৪"
                    className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="glass-btn-primary w-full py-2.5 px-5 text-sm font-semibold rounded-xl disabled:opacity-60"
              >
                {saving
                  ? 'সংরক্ষণ হচ্ছে...'
                  : editingId
                    ? 'প্রশ্ন আপডেট করুন'
                    : 'প্রশ্ন সংরক্ষণ ও প্রশ্ন ব্যাংকে যোগ করুন'}
              </button>
            </form>
          )}

          {/* FORM 4: WORKSHEET */}
          {activeTab === 'worksheet' && (
            <form onSubmit={(e) => void handleSubmitWorksheet(e)} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ওয়ার্কশীটের শিরোনাম *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={180}
                    value={wsTitle}
                    onChange={(e) => setWsTitle(e.target.value)}
                    placeholder="যেমন: নেফ্রনের গঠন ও মূত্র তৈরি ওয়ার্কশীট"
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    ওয়ার্কশীটের ধরন
                  </label>
                  <select
                    value={wsType}
                    onChange={(e) => setWsType(e.target.value as WorksheetType)}
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  >
                    <option value="practice_sheet">অনুশীলন শীট (Practice Sheet)</option>
                    <option value="cq_srijonshil">সৃজনশীল (CQ) ওয়ার্কশীট</option>
                    <option value="formula_sheet">সূত্র ও শর্টকাট শীট</option>
                    <option value="assignment">হোম অ্যাসাইনমেন্ট</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">স্তর</label>
                  <select
                    value={wsDifficulty}
                    onChange={(e) => setWsDifficulty(e.target.value as WorksheetDifficulty)}
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  >
                    <option value="hsc">HSC একাডেমিক</option>
                    <option value="medical">মেডিকেল অ্যাডমিশন</option>
                    <option value="dental">ডেন্টাল অ্যাডমিশন</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    আনুমানিক সময় (মিনিট)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={wsMinutes}
                    onChange={(e) => setWsMinutes(Number(e.target.value))}
                    className="glass-input w-full px-3 py-2 text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    PDF/ফাইল লিংক (ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    maxLength={500}
                    value={wsAttachmentUrl}
                    onChange={(e) => setWsAttachmentUrl(e.target.value)}
                    placeholder="https://..."
                    className="glass-input w-full px-3 py-2 text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  শিক্ষার্থীদের জন্য নির্দেশনা
                </label>
                <textarea
                  rows={2}
                  maxLength={1500}
                  value={wsInstructions}
                  onChange={(e) => setWsInstructions(e.target.value)}
                  placeholder="ওয়ার্কশীটটি কীভাবে অনুশীলন করতে হবে তা লিখুন..."
                  className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                    ওয়ার্কশীটের প্রশ্ন / কাজ ({toBnDigits(wsTasks.length)}/২০)
                  </span>
                  {wsTasks.length < 20 && (
                    <button
                      type="button"
                      onClick={() => setWsTasks((prev) => [...prev, EMPTY_TASK()])}
                      className="glass-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      কাজ যোগ করুন
                    </button>
                  )}
                </div>

                {wsTasks.map((task, idx) => (
                  <div key={idx} className="bio-subpanel rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] font-mono-tabular">
                        প্রশ্ন #{toBnDigits(idx + 1)}
                      </span>
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-[#554578] dark:text-[#B6ABD6] flex items-center gap-1">
                          নম্বর:
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={task.marks}
                            onChange={(e) =>
                              setWsTasks((prev) =>
                                prev.map((t, i) =>
                                  i === idx ? { ...t, marks: Number(e.target.value) || 1 } : t
                                )
                              )
                            }
                            className="glass-input w-14 px-2 py-1 text-xs font-mono-tabular rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                          />
                        </label>
                        {wsTasks.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setWsTasks((prev) => prev.filter((_, i) => i !== idx))
                            }
                            className="text-xs text-rose-700 dark:text-rose-300 hover:underline"
                          >
                            মুছুন
                          </button>
                        )}
                      </div>
                    </div>

                    <textarea
                      rows={2}
                      placeholder="মূল প্রশ্ন বা সমস্যা লিখুন *"
                      value={task.promptBn}
                      onChange={(e) =>
                        setWsTasks((prev) =>
                          prev.map((t, i) => (i === idx ? { ...t, promptBn: e.target.value } : t))
                        )
                      }
                      className="glass-input w-full px-2.5 py-1.5 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                    />
                    <div className="grid sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="ইঙ্গিত / Hint (ঐচ্ছিক)"
                        value={task.hintBn}
                        onChange={(e) =>
                          setWsTasks((prev) =>
                            prev.map((t, i) => (i === idx ? { ...t, hintBn: e.target.value } : t))
                          )
                        }
                        className="glass-input px-2.5 py-1.5 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                      />
                      <input
                        type="text"
                        placeholder="নমুনা উত্তর / সমাধান"
                        value={task.answerBn}
                        onChange={(e) =>
                          setWsTasks((prev) =>
                            prev.map((t, i) => (i === idx ? { ...t, answerBn: e.target.value } : t))
                          )
                        }
                        className="glass-input px-2.5 py-1.5 text-xs rounded-lg text-[#1D1336] dark:text-[#F4F0FF]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="glass-btn-primary w-full py-2.5 px-5 text-sm font-semibold rounded-xl disabled:opacity-60"
              >
                {saving
                  ? 'সংরক্ষণ হচ্ছে...'
                  : editingId
                    ? 'ওয়ার্কশীট আপডেট করুন'
                    : 'ওয়ার্কশীট সংরক্ষণ ও প্রকাশ করুন'}
              </button>
            </form>
          )}
        </div>

        {/* Right: Managed Content Library */}
        <aside className="lg:col-span-5 bio-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              সংরক্ষিত তালিকা (
              {activeTab === 'infographic'
                ? `ইনফোগ্রাফ: ${toBnDigits(filteredInfographics.length)}`
                : activeTab === 'video'
                  ? `ভিডিও: ${toBnDigits(filteredVideos.length)}`
                  : activeTab === 'question'
                    ? `প্রশ্ন: ${toBnDigits(filteredQuestions.length)}`
                    : `ওয়ার্কশীট: ${toBnDigits(filteredWorksheets.length)}`}
              )
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <select
              value={libSubject}
              onChange={(e) => setLibSubject(e.target.value as SubjectId | 'all')}
              className="glass-input px-2.5 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
            >
              <option value="all">সকল বিষয়</option>
              {SUBJECTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nameBn}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={libSearch}
              onChange={(e) => setLibSearch(e.target.value)}
              placeholder="শিরোনাম বা টপিক খুঁজুন..."
              className="glass-input px-2.5 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
            />
          </div>

          <div className="space-y-3 max-h-[720px] overflow-y-auto pr-1">
            {activeTab === 'infographic' &&
              (filteredInfographics.length === 0 ? (
                <EmptyLibraryMessage label="ইনফোগ্রাফ" />
              ) : (
                filteredInfographics.map((item) => (
                  <LibraryItemCard
                    key={item.id}
                    id={item.id}
                    subjectId={item.subjectId}
                    chapterId={item.chapterId}
                    topicName={item.topicName}
                    title={item.titleBn}
                    meta={`${toBnDigits(item.nodes.length)}টি ব্লক`}
                    status={item.status}
                    confirmDeleteId={confirmDeleteId}
                    onAskDelete={() => setConfirmDeleteId(item.id)}
                    onCancelDelete={() => setConfirmDeleteId(null)}
                    onEdit={() => loadInfographicForEdit(item)}
                    onTogglePublish={() =>
                      void onSaveInfographic(
                        { ...item, status: item.status === 'published' ? 'draft' : 'published' },
                        false
                      )
                    }
                    onDelete={() => {
                      void onDeleteInfographic(item.id);
                      setConfirmDeleteId(null);
                    }}
                  />
                ))
              ))}

            {activeTab === 'video' &&
              (filteredVideos.length === 0 ? (
                <EmptyLibraryMessage label="ভিডিও লেকচার" />
              ) : (
                filteredVideos.map((item) => (
                  <LibraryItemCard
                    key={item.id}
                    id={item.id}
                    subjectId={item.subjectId}
                    chapterId={item.chapterId}
                    topicName={item.topicName}
                    title={item.titleBn}
                    meta={`${item.instructorBn} · ${toBnDigits(item.durationMin)} মিনিট`}
                    status={item.status}
                    confirmDeleteId={confirmDeleteId}
                    onAskDelete={() => setConfirmDeleteId(item.id)}
                    onCancelDelete={() => setConfirmDeleteId(null)}
                    onEdit={() => loadVideoForEdit(item)}
                    onTogglePublish={() =>
                      void onSaveVideo(
                        { ...item, status: item.status === 'published' ? 'draft' : 'published' },
                        false
                      )
                    }
                    onDelete={() => {
                      void onDeleteVideo(item.id);
                      setConfirmDeleteId(null);
                    }}
                  />
                ))
              ))}

            {activeTab === 'question' &&
              (filteredQuestions.length === 0 ? (
                <EmptyLibraryMessage label="প্রশ্ন (MCQ)" />
              ) : (
                filteredQuestions.map((item) => (
                  <LibraryItemCard
                    key={item.id}
                    id={item.id}
                    subjectId={item.subjectId}
                    chapterId={item.chapterId}
                    topicName={item.topicName}
                    title={item.question}
                    meta={`${item.difficulty === 'board' ? 'বোর্ড' : item.difficulty === 'dental' ? 'ডেন্টাল' : 'মেডিকেল'} · সঠিক: ${OPTION_LABELS[item.correctIndex]}`}
                    status={item.status}
                    confirmDeleteId={confirmDeleteId}
                    onAskDelete={() => setConfirmDeleteId(item.id)}
                    onCancelDelete={() => setConfirmDeleteId(null)}
                    onEdit={() => loadQuestionForEdit(item)}
                    onTogglePublish={() =>
                      void onSaveQuestion(
                        { ...item, status: item.status === 'published' ? 'draft' : 'published' },
                        false
                      )
                    }
                    onDelete={() => {
                      void onDeleteQuestion(item.id);
                      setConfirmDeleteId(null);
                    }}
                  />
                ))
              ))}

            {activeTab === 'worksheet' &&
              (filteredWorksheets.length === 0 ? (
                <EmptyLibraryMessage label="ওয়ার্কশীট" />
              ) : (
                filteredWorksheets.map((item) => (
                  <LibraryItemCard
                    key={item.id}
                    id={item.id}
                    subjectId={item.subjectId}
                    chapterId={item.chapterId}
                    topicName={item.topicName}
                    title={item.titleBn}
                    meta={`${toBnDigits(item.tasks.length)}টি কাজ · ${toBnDigits(item.estimatedMinutes)} মিনিট`}
                    status={item.status}
                    confirmDeleteId={confirmDeleteId}
                    onAskDelete={() => setConfirmDeleteId(item.id)}
                    onCancelDelete={() => setConfirmDeleteId(null)}
                    onEdit={() => loadWorksheetForEdit(item)}
                    onTogglePublish={() =>
                      void onSaveWorksheet(
                        { ...item, status: item.status === 'published' ? 'draft' : 'published' },
                        false
                      )
                    }
                    onDelete={() => {
                      void onDeleteWorksheet(item.id);
                      setConfirmDeleteId(null);
                    }}
                  />
                ))
              ))}
          </div>
        </aside>
      </div>
      )}
      </>
      )}
    </div>
  );
};

const EmptyLibraryMessage: React.FC<{ label: string }> = ({ label }) => (
  <div className="bio-subpanel rounded-xl p-6 text-center space-y-1.5">
    <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">এখনো কোনো কাস্টম {label} যোগ করা হয়নি</div>
    <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
      বাম পাশের ফরম থেকে টপিক নির্বাচন করে নতুন {label} যোগ করুন অথবা &quot;নমুনা ডেটা বসান&quot; ক্লিক করে পরীক্ষা করুন।
    </p>
  </div>
);

interface LibraryItemCardProps {
  id: string;
  subjectId: SubjectId;
  chapterId: string;
  topicName: string;
  title: string;
  meta: string;
  status: ContentPublishStatus;
  confirmDeleteId: string | null;
  onAskDelete: () => void;
  onCancelDelete: () => void;
  onEdit: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
}

const LibraryItemCard: React.FC<LibraryItemCardProps> = ({
  id,
  subjectId,
  chapterId,
  topicName,
  title,
  meta,
  status,
  confirmDeleteId,
  onAskDelete,
  onCancelDelete,
  onEdit,
  onTogglePublish,
  onDelete,
}) => {
  const sub = getSubjectById(subjectId);
  const ch = getChapterById(chapterId);
  const isDeleting = confirmDeleteId === id;

  return (
    <div className="bio-subpanel glass-card-3d rounded-xl p-4 space-y-2.5">
      <div className="flex items-start justify-between gap-2 text-[11px] text-[#554578] dark:text-[#B6ABD6]">
        <span className="leading-snug">
          {sub?.nameBn} · {ch?.chapterNumberBn} · {topicName}
        </span>
        <span
          className={`shrink-0 font-semibold ${
            status === 'published' ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'
          }`}
        >
          {status === 'published' ? 'প্রকাশিত' : 'খসড়া'}
        </span>
      </div>

      <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] leading-snug line-clamp-2">{title}</div>
      <div className="text-xs text-[#554578] dark:text-[#A598C9] font-mono-tabular">{meta}</div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onEdit}
          className="glass-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] rounded-lg"
        >
          <Edit3 className="w-3 h-3 text-[#6D4ACF] dark:text-[#C4B5FD]" />
          সম্পাদনা
        </button>
        <button
          type="button"
          onClick={onTogglePublish}
          className="glass-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#554578] dark:text-[#B6ABD6] rounded-lg"
        >
          {status === 'published' ? (
            <>
              <EyeOff className="w-3 h-3" />
              খসড়ায় নিন
            </>
          ) : (
            <>
              <Eye className="w-3 h-3 text-emerald-700 dark:text-emerald-300" />
              প্রকাশ করুন
            </>
          )}
        </button>

        {isDeleting ? (
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              type="button"
              onClick={onDelete}
              className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg"
            >
              নিশ্চিত মুছুন
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              className="px-2 py-1 text-xs text-[#554578] dark:text-[#B6ABD6] hover:underline"
            >
              না
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAskDelete}
            className="ml-auto inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-50/70 dark:hover:bg-rose-950/50 rounded-lg"
          >
            <Trash2 className="w-3.5 h-3.5" />
            মুছুন
          </button>
        )}
      </div>
    </div>
  );
};
