/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from './lib/firebase';
import {
  calculateDailyPerformanceScore,
  clearAllCloudWrongAnswers,
  createCloudTestAttempt,
  deleteCloudTestAttempt,
  deleteCloudWrongAnswer,
  ensureUserProfile,
  getTodayDateKey,
  loadLocalProgress,
  LocalProgressState,
  saveLocalProgress,
  subscribeDailyTopPerformers,
  subscribeUserLearningData,
  syncDailyPerformerProfile,
  toggleCloudBookmark,
  updateCloudUserProfile,
  upsertCloudTopicStat,
  upsertCloudWrongAnswer,
  upsertDailyPerformerProgress,
} from './services/learningStore';
import {
  adminCreateCloudUser,
  adminDeleteCloudUser,
  adminFetchUserActivity,
  adminGrantSuperAdmin,
  adminLookupUserByUid,
  adminRevokeSuperAdmin,
  adminUpdateCloudUser,
  checkIsCloudSuperAdmin,
  customQuestionToMcq,
  deleteCloudInfographic,
  deleteCloudQuestion,
  deleteCloudVideo,
  deleteCloudWorksheet,
  isBootstrappedSuperAdmin,
  loadLocalAdminContent,
  saveCloudInfographic,
  saveCloudQuestion,
  saveCloudVideo,
  saveCloudWorksheet,
  saveLocalAdminContent,
  subscribeAdminContent,
  subscribeCloudUserDirectory,
} from './services/adminContentStore';
import {
  adminReviewEnrollmentRequest,
  adminSetUserAccessTier,
  DEFAULT_ACCESS_POLICY,
  resolveUserAccess,
  saveAccessPolicy,
  subscribeAccessPolicy,
  subscribeAllEnrollmentRequests,
  subscribeMyEnrollmentRequests,
  submitEnrollmentRequest,
} from './services/accessStore';
import {
  AccessPolicyConfig,
  AdminContentBundle,
  AdminRoleEntry,
  AdminUserRecord,
  AppTab,
  BookmarkRecord,
  ChapterInfo,
  CustomInfographic,
  CustomQuestionRecord,
  CustomVideo,
  CustomWorksheet,
  DailyPerformerEntry,
  EnrollmentRequestRecord,
  HscLevel,
  McqQuestion,
  PaymentMethod,
  SubjectId,
  TargetExam,
  TestAttemptRecord,
  TopicStat,
  UserProfile,
  WrongAnswerRecord,
} from './types/learning';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TopBar } from './components/TopBar';
import { DashboardView } from './components/DashboardView';
import { PracticeView } from './components/PracticeView';
import { QuestionBankView } from './components/QuestionBankView';
import { WrongAnswerBankView } from './components/WrongAnswerBankView';
import { ExamSimulatorView } from './components/ExamSimulatorView';
import { VisualLearningView } from './components/VisualLearningView';
import { WorksheetsView } from './components/WorksheetsView';
import { SuperAdminPanelView } from './components/SuperAdminPanelView';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AccessGateCard } from './components/AccessGateCard';
import { BRAND_NAME, BrandLogo } from './components/BrandLogo';
import { useTheme } from './hooks/useTheme';

function MedExcelApp() {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [runtimeError, setRuntimeError] = useState<Error | null>(null);

  // Cloud state
  const [cloudProfile, setCloudProfile] = useState<UserProfile | null>(null);
  const [cloudTopicStats, setCloudTopicStats] = useState<Record<string, TopicStat>>({});
  const [cloudTestAttempts, setCloudTestAttempts] = useState<TestAttemptRecord[]>([]);
  const [cloudBookmarks, setCloudBookmarks] = useState<Record<string, BookmarkRecord>>({});
  const [cloudWrongAnswers, setCloudWrongAnswers] = useState<Record<string, WrongAnswerRecord>>({});

  // Super Admin & Dynamic Curriculum Content State
  const [isCloudSuperAdmin, setIsCloudSuperAdmin] = useState(false);
  const [cloudAdminContent, setCloudAdminContent] = useState<AdminContentBundle>({
    infographics: [],
    videos: [],
    questions: [],
    worksheets: [],
  });
  const [localAdminContent, setLocalAdminContent] = useState<AdminContentBundle>(() =>
    loadLocalAdminContent()
  );
  const [cloudUsers, setCloudUsers] = useState<AdminUserRecord[]>([]);
  const [cloudAdmins, setCloudAdmins] = useState<AdminRoleEntry[]>([]);

  // Dynamic Access Policy & Enrollment Requests
  const [accessPolicy, setAccessPolicy] = useState<AccessPolicyConfig>(DEFAULT_ACCESS_POLICY);
  const [myEnrollmentRequests, setMyEnrollmentRequests] = useState<EnrollmentRequestRecord[]>([]);
  const [allEnrollmentRequests, setAllEnrollmentRequests] = useState<EnrollmentRequestRecord[]>([]);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  // Local guest fallback state
  const [localState, setLocalState] = useState<LocalProgressState>(() => loadLocalProgress());

  // Daily Top 3 Performers live state (resets automatically at midnight BST)
  const [todayDateKey, setTodayDateKey] = useState<string>(() => getTodayDateKey());
  const [dailyPerformers, setDailyPerformers] = useState<DailyPerformerEntry[]>([]);
  const [optimisticCloudDaily, setOptimisticCloudDaily] = useState<
    Record<string, { dateKey: string; attempted: number; correct: number }>
  >({});

  // Cross-tab navigation context
  const [practiceSubject, setPracticeSubject] = useState<SubjectId | 'all'>('all');
  const [practiceChapter, setPracticeChapter] = useState<string>('all');
  const [activeVisualLessonId, setActiveVisualLessonId] = useState<string | undefined>(undefined);
  const [autoStartPastYearKey, setAutoStartPastYearKey] = useState(0);

  const [profileReady, setProfileReady] = useState(false);

  // Throw async Firestore subscription error to ErrorBoundary if triggered
  if (runtimeError) {
    throw runtimeError;
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
      setProfileReady(false);
      if (firebaseUser) {
        try {
          const [, adminFlag] = await Promise.all([
            ensureUserProfile(firebaseUser),
            checkIsCloudSuperAdmin(firebaseUser),
          ]);
          setIsCloudSuperAdmin(adminFlag);
          setProfileReady(true);
        } catch (err) {
          setIsCloudSuperAdmin(false);
          const errorObj = err instanceof Error ? err : new Error(String(err));
          const msg = errorObj.message.toLowerCase();
          if (msg.includes('the client is offline') || msg.includes('unavailable')) {
            setAuthError('ইন্টারনেট বা ক্লাউড সংযোগে সাময়িক সমস্যা রয়েছে; অফলাইন মোডে অনুশীলন চালিয়ে যেতে পারেন।');
          } else {
            setRuntimeError(errorObj);
          }
        }
      } else {
        setIsCloudSuperAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!authReady || !user || !profileReady) return;
    const unsub = subscribeUserLearningData(user.uid, {
      onProfile: (p) => setCloudProfile(p),
      onTopicStats: (stats) => setCloudTopicStats(stats),
      onTestAttempts: (attempts) => setCloudTestAttempts(attempts),
      onBookmarks: (bms) => setCloudBookmarks(bms),
      onWrongAnswers: (was) => setCloudWrongAnswers(was),
      onError: (err) => setRuntimeError(err),
    });
    return () => unsub();
  }, [authReady, user, profileReady]);

  // Live subscription to Super Admin dynamic curriculum (published for all, all statuses for Super Admin)
  useEffect(() => {
    if (!authReady) return;
    const unsub = subscribeAdminContent(isCloudSuperAdmin, {
      onInfographics: (items) =>
        setCloudAdminContent((prev) => ({ ...prev, infographics: items })),
      onVideos: (items) =>
        setCloudAdminContent((prev) => ({ ...prev, videos: items })),
      onQuestions: (items) =>
        setCloudAdminContent((prev) => ({ ...prev, questions: items })),
      onWorksheets: (items) =>
        setCloudAdminContent((prev) => ({ ...prev, worksheets: items })),
      onError: (err) => {
        const msg = err.message.toLowerCase();
        if (
          msg.includes('offline') ||
          msg.includes('unavailable') ||
          !isCloudSuperAdmin
        ) {
          console.warn('Dynamic admin catalog fallback active:', err.message);
        } else {
          setAuthError('সুপার এডমিন ক্লাউড ডেটা লোড করতে সাময়িক সমস্যা হয়েছে।');
        }
      },
    });
    return () => unsub();
  }, [authReady, isCloudSuperAdmin]);

  // Live subscription to Cloud User Directory (bootstrapped primary Super Admin)
  useEffect(() => {
    if (!authReady) return;
    const canList = isBootstrappedSuperAdmin(user);
    const unsub = subscribeCloudUserDirectory(canList, {
      onUsers: (list) => setCloudUsers(list),
      onAdmins: (list) => setCloudAdmins(list),
      onError: (err) => {
        console.warn('Cloud user directory warning:', err.message);
      },
    });
    return () => unsub();
  }, [authReady, user]);

  // Roll over todayDateKey at midnight BST and subscribe to today's top performers
  useEffect(() => {
    const timer = window.setInterval(() => {
      const nextKey = getTodayDateKey();
      setTodayDateKey((prev) => (prev === nextKey ? prev : nextKey));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!authReady) return;
    const unsub = subscribeDailyTopPerformers(todayDateKey, {
      onChange: (entries) => setDailyPerformers(entries),
      onError: (err) => {
        console.warn('Daily leaderboard fallback active:', err.message);
      },
    });
    return () => unsub();
  }, [authReady, todayDateKey]);

  // Live subscription to Dynamic Access Policy (publicly readable)
  useEffect(() => {
    if (!authReady) return;
    const unsub = subscribeAccessPolicy({
      onChange: (p) => setAccessPolicy(p),
      onError: (err) => {
        console.warn('Access policy fallback active:', err.message);
      },
    });
    return () => unsub();
  }, [authReady]);

  // Live subscription to current user's enrollment requests
  useEffect(() => {
    if (!authReady || !user) {
      setMyEnrollmentRequests([]);
      return;
    }
    const unsub = subscribeMyEnrollmentRequests(user.uid, {
      onChange: (list) => setMyEnrollmentRequests(list),
      onError: (err) => {
        console.warn('My enrollment requests warning:', err.message);
      },
    });
    return () => unsub();
  }, [authReady, user]);

  // Live subscription to all enrollment requests (bootstrapped Super Admin only)
  useEffect(() => {
    if (!authReady || !user) {
      setAllEnrollmentRequests([]);
      return;
    }
    const canListAll = isBootstrappedSuperAdmin(user);
    const unsub = subscribeAllEnrollmentRequests(canListAll, {
      onChange: (list) => setAllEnrollmentRequests(list),
      onError: (err) => {
        console.warn('All enrollment requests warning:', err.message);
      },
    });
    return () => unsub();
  }, [authReady, user]);

  const handleSignIn = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'সাইন-ইন করা যায়নি';
      if (!msg.includes('popup-closed-by-user')) {
        setAuthError('গুগল সাইন-ইন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setIsCloudSuperAdmin(false);
    setCloudProfile(null);
    setCloudTopicStats({});
    setCloudTestAttempts([]);
    setCloudBookmarks({});
    setCloudWrongAnswers({});
    setCloudUsers([]);
    setCloudAdmins([]);
    setMyEnrollmentRequests([]);
    setAllEnrollmentRequests([]);
  };

  // Super Admin CRUD handlers (Cloud Firestore for Super Admin, localStorage sandbox otherwise)
  const handleSaveInfographic = async (
    item: Omit<CustomInfographic, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => {
    if (isCloudSuperAdmin && user) {
      await saveCloudInfographic(user, item, isNew);
    } else {
      const now = Date.now();
      const existing = localAdminContent.infographics.find((x) => x.id === item.id);
      const record: CustomInfographic = {
        ...item,
        createdByUid: existing?.createdByUid || 'local_admin',
        createdByEmail: existing?.createdByEmail || 'local@preview',
        createdAtMs: existing?.createdAtMs || now,
        updatedAtMs: now,
      };
      const next: AdminContentBundle = {
        ...localAdminContent,
        infographics: [record, ...localAdminContent.infographics.filter((x) => x.id !== item.id)],
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  const handleDeleteInfographic = async (id: string) => {
    if (isCloudSuperAdmin && user) {
      await deleteCloudInfographic(id);
    } else {
      const next: AdminContentBundle = {
        ...localAdminContent,
        infographics: localAdminContent.infographics.filter((x) => x.id !== id),
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  const handleSaveVideo = async (
    item: Omit<CustomVideo, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => {
    if (isCloudSuperAdmin && user) {
      await saveCloudVideo(user, item, isNew);
    } else {
      const now = Date.now();
      const existing = localAdminContent.videos.find((x) => x.id === item.id);
      const record: CustomVideo = {
        ...item,
        createdByUid: existing?.createdByUid || 'local_admin',
        createdByEmail: existing?.createdByEmail || 'local@preview',
        createdAtMs: existing?.createdAtMs || now,
        updatedAtMs: now,
      };
      const next: AdminContentBundle = {
        ...localAdminContent,
        videos: [record, ...localAdminContent.videos.filter((x) => x.id !== item.id)],
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (isCloudSuperAdmin && user) {
      await deleteCloudVideo(id);
    } else {
      const next: AdminContentBundle = {
        ...localAdminContent,
        videos: localAdminContent.videos.filter((x) => x.id !== id),
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  const handleSaveQuestion = async (
    item: Omit<CustomQuestionRecord, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => {
    if (isCloudSuperAdmin && user) {
      await saveCloudQuestion(user, item, isNew);
    } else {
      const now = Date.now();
      const existing = localAdminContent.questions.find((x) => x.id === item.id);
      const record: CustomQuestionRecord = {
        ...item,
        createdByUid: existing?.createdByUid || 'local_admin',
        createdByEmail: existing?.createdByEmail || 'local@preview',
        createdAtMs: existing?.createdAtMs || now,
        updatedAtMs: now,
      };
      const next: AdminContentBundle = {
        ...localAdminContent,
        questions: [record, ...localAdminContent.questions.filter((x) => x.id !== item.id)],
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (isCloudSuperAdmin && user) {
      await deleteCloudQuestion(id);
    } else {
      const next: AdminContentBundle = {
        ...localAdminContent,
        questions: localAdminContent.questions.filter((x) => x.id !== id),
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  const handleSaveWorksheet = async (
    item: Omit<CustomWorksheet, 'createdByUid' | 'createdByEmail' | 'createdAtMs' | 'updatedAtMs'>,
    isNew: boolean
  ) => {
    if (isCloudSuperAdmin && user) {
      await saveCloudWorksheet(user, item, isNew);
    } else {
      const now = Date.now();
      const existing = localAdminContent.worksheets.find((x) => x.id === item.id);
      const record: CustomWorksheet = {
        ...item,
        createdByUid: existing?.createdByUid || 'local_admin',
        createdByEmail: existing?.createdByEmail || 'local@preview',
        createdAtMs: existing?.createdAtMs || now,
        updatedAtMs: now,
      };
      const next: AdminContentBundle = {
        ...localAdminContent,
        worksheets: [record, ...localAdminContent.worksheets.filter((x) => x.id !== item.id)],
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  const handleDeleteWorksheet = async (id: string) => {
    if (isCloudSuperAdmin && user) {
      await deleteCloudWorksheet(id);
    } else {
      const next: AdminContentBundle = {
        ...localAdminContent,
        worksheets: localAdminContent.worksheets.filter((x) => x.id !== id),
      };
      setLocalAdminContent(next);
      saveLocalAdminContent(next);
    }
  };

  // Student-facing merged published content (Cloud published + local preview sandbox)
  const publishedInfographics = useMemo(() => {
    const combined = isCloudSuperAdmin
      ? cloudAdminContent.infographics
      : [...localAdminContent.infographics, ...cloudAdminContent.infographics];
    const seen = new Set<string>();
    return combined.filter((item) => {
      if (item.status !== 'published' || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [isCloudSuperAdmin, cloudAdminContent.infographics, localAdminContent.infographics]);

  const publishedVideos = useMemo(() => {
    const combined = isCloudSuperAdmin
      ? cloudAdminContent.videos
      : [...localAdminContent.videos, ...cloudAdminContent.videos];
    const seen = new Set<string>();
    return combined.filter((item) => {
      if (item.status !== 'published' || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [isCloudSuperAdmin, cloudAdminContent.videos, localAdminContent.videos]);

  const publishedWorksheets = useMemo(() => {
    const combined = isCloudSuperAdmin
      ? cloudAdminContent.worksheets
      : [...localAdminContent.worksheets, ...cloudAdminContent.worksheets];
    const seen = new Set<string>();
    return combined.filter((item) => {
      if (item.status !== 'published' || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  }, [isCloudSuperAdmin, cloudAdminContent.worksheets, localAdminContent.worksheets]);

  const customMcqQuestions = useMemo<McqQuestion[]>(() => {
    const combined = isCloudSuperAdmin
      ? cloudAdminContent.questions
      : [...localAdminContent.questions, ...cloudAdminContent.questions];
    const seen = new Set<string>();
    return combined
      .filter((item) => {
        if (item.status !== 'published' || seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .map(customQuestionToMcq);
  }, [isCloudSuperAdmin, cloudAdminContent.questions, localAdminContent.questions]);

  // Effective unified state (Firestore when signed in, localStorage when guest)
  const effectiveTopicStats = user ? cloudTopicStats : localState.topicStats;
  const effectiveTestAttempts = user ? cloudTestAttempts : localState.testAttempts;
  const effectiveBookmarks = user ? cloudBookmarks : localState.bookmarks;
  const effectiveWrongAnswers = user ? cloudWrongAnswers : localState.wrongAnswers;

  const displayName = user
    ? cloudProfile?.displayName || user.displayName || 'শিক্ষার্থী'
    : localState.profile.displayName;
  const photoUrl = user
    ? cloudProfile?.photoUrl || user.photoURL || ''
    : localState.profile.photoUrl || '';
  const targetExam: TargetExam = user
    ? cloudProfile?.targetExam || 'medical'
    : localState.profile.targetExam;
  const hscClass: HscLevel = user
    ? cloudProfile?.hscClass || '12'
    : localState.profile.hscClass;
  const college = user ? cloudProfile?.college || '' : localState.profile.college || '';
  const dailyGoal = user
    ? cloudProfile?.dailyGoal || 30
    : localState.profile.dailyGoal;

  const myCloudDailyEntry = user
    ? dailyPerformers.find((entry) => entry.userId === user.uid)
    : undefined;
  const myOptimisticDaily =
    user && optimisticCloudDaily[user.uid]?.dateKey === todayDateKey
      ? optimisticCloudDaily[user.uid]
      : undefined;
  const todayAttempted = user
    ? Math.max(myCloudDailyEntry?.questionsAttempted || 0, myOptimisticDaily?.attempted || 0)
    : localState.dailyProgress?.dateKey === todayDateKey
      ? localState.dailyProgress.questionsAttempted
      : 0;
  const todayCorrect = user
    ? Math.max(myCloudDailyEntry?.correctCount || 0, myOptimisticDaily?.correct || 0)
    : localState.dailyProgress?.dateKey === todayDateKey
      ? localState.dailyProgress.correctCount
      : 0;

  const resolvedAccess = useMemo(
    () =>
      resolveUserAccess({
        user,
        cloudProfile,
        isCloudSuperAdmin,
        policy: accessPolicy,
        todayAttempted,
      }),
    [user, cloudProfile, isCloudSuperAdmin, accessPolicy, todayAttempted]
  );

  const tabAccess = resolvedAccess.canAccessTab(activeTab);

  const handleSubmitEnrollment = async (input: {
    userName: string;
    paymentMethod: PaymentMethod;
    senderNumber: string;
    transactionId: string;
    studentNote: string;
  }) => {
    if (!user) {
      throw new Error('এনরোলমেন্ট জমা দিতে গুগল দিয়ে সাইন-ইন করুন।');
    }
    await submitEnrollmentRequest(user, {
      ...input,
      amountBdt: accessPolicy.proPriceBdt,
      durationDays: accessPolicy.proDurationDays,
    });
  };

  const handleUpdateProfile = async (updates: {
    displayName: string;
    targetExam: TargetExam;
    hscClass: HscLevel;
    college: string;
    photoUrl?: string;
    dailyGoal: number;
  }) => {
    if (user) {
      await updateCloudUserProfile(user.uid, {
        ...updates,
        email: user.email || cloudProfile?.email || 'student@medexcel.bd',
      });
      try {
        await syncDailyPerformerProfile(user, {
          displayName: updates.displayName,
          photoUrl: updates.photoUrl || user.photoURL || '',
          college: updates.college,
          targetExam: updates.targetExam,
        });
      } catch {
        // Non-fatal if today's entry does not exist yet
      }
    } else {
      const next: LocalProgressState = {
        ...localState,
        profile: updates,
      };
      setLocalState(next);
      saveLocalProgress(next);
    }
  };

  const handleRecordAnswer = async (
    question: McqQuestion,
    isCorrect: boolean,
    timeSec: number,
    selectedOptionIndex?: number
  ) => {
    const existing = effectiveTopicStats[question.chapterId];
    const nextAttempted = (existing?.attempted || 0) + 1;
    const nextCorrect = (existing?.correct || 0) + (isCorrect ? 1 : 0);
    const nextWrong = (existing?.wrong || 0) + (isCorrect ? 0 : 1);
    const nextTime = (existing?.totalTimeSec || 0) + timeSec;

    if (user) {
      setOptimisticCloudDaily((prev) => {
        const cur = prev[user.uid]?.dateKey === todayDateKey ? prev[user.uid] : undefined;
        const baseAttempted = Math.max(
          myCloudDailyEntry?.questionsAttempted || 0,
          cur?.attempted || 0
        );
        const baseCorrect = Math.max(myCloudDailyEntry?.correctCount || 0, cur?.correct || 0);
        return {
          ...prev,
          [user.uid]: {
            dateKey: todayDateKey,
            attempted: baseAttempted + 1,
            correct: baseCorrect + (isCorrect ? 1 : 0),
          },
        };
      });
      await Promise.all([
        upsertCloudTopicStat(user.uid, {
          subjectId: question.subjectId,
          chapterId: question.chapterId,
          attempted: nextAttempted,
          correct: nextCorrect,
          wrong: nextWrong,
          totalTimeSec: nextTime,
        }),
        upsertDailyPerformerProgress(
          user,
          {
            displayName,
            photoUrl,
            college,
            targetExam,
          },
          {
            questionsAttemptedDelta: 1,
            correctDelta: isCorrect ? 1 : 0,
            testsDelta: 0,
          }
        ).catch(() => undefined),
      ]);
      if (!isCorrect) {
        const prevWrong = effectiveWrongAnswers[question.id];
        await upsertCloudWrongAnswer(user.uid, {
          questionId: question.id,
          subjectId: question.subjectId,
          chapterId: question.chapterId,
          selectedOptionIndex: selectedOptionIndex ?? 0,
          wrongCount: (prevWrong?.wrongCount || 0) + 1,
        });
      }
    } else {
      const nextStats: Record<string, TopicStat> = {
        ...localState.topicStats,
        [question.chapterId]: {
          userId: 'guest',
          topicKey: question.chapterId,
          subjectId: question.subjectId,
          chapterId: question.chapterId,
          attempted: nextAttempted,
          correct: nextCorrect,
          wrong: nextWrong,
          totalTimeSec: nextTime,
          lastPracticedAt: Date.now(),
        },
      };
      const nextWrongAnswers = { ...localState.wrongAnswers };
      if (!isCorrect) {
        const prevWrong = nextWrongAnswers[question.id];
        nextWrongAnswers[question.id] = {
          userId: 'guest',
          questionId: question.id,
          subjectId: question.subjectId,
          chapterId: question.chapterId,
          selectedOptionIndex: selectedOptionIndex ?? 0,
          wrongCount: (prevWrong?.wrongCount || 0) + 1,
          lastWrongAtMs: Date.now(),
        };
      }
      const prevDaily =
        localState.dailyProgress && localState.dailyProgress.dateKey === todayDateKey
          ? localState.dailyProgress
          : {
              dateKey: todayDateKey,
              questionsAttempted: 0,
              correctCount: 0,
              testsCompleted: 0,
              bestNetScore: 0,
              score: 0,
            };
      const nextDailyQ = prevDaily.questionsAttempted + 1;
      const nextDailyCorr = prevDaily.correctCount + (isCorrect ? 1 : 0);
      const nextDaily = {
        ...prevDaily,
        questionsAttempted: nextDailyQ,
        correctCount: nextDailyCorr,
        score: calculateDailyPerformanceScore({
          questionsAttempted: nextDailyQ,
          correctCount: nextDailyCorr,
          testsCompleted: prevDaily.testsCompleted,
          bestNetScore: prevDaily.bestNetScore,
        }),
      };
      const next = {
        ...localState,
        topicStats: nextStats,
        wrongAnswers: nextWrongAnswers,
        dailyProgress: nextDaily,
      };
      setLocalState(next);
      saveLocalProgress(next);
    }
  };

  const handleSaveTestAttempt = async (
    attempt: Omit<TestAttemptRecord, 'userId' | 'createdAtMs'>,
    perQuestionResults: {
      question: McqQuestion;
      isCorrect: boolean;
      selectedOptionIndex?: number;
    }[]
  ) => {
    // Aggregate chapter updates from the completed test
    const chapterAgg: Record<
      string,
      { subjectId: SubjectId; attempted: number; correct: number; wrong: number }
    > = {};
    const wrongResults: { question: McqQuestion; selectedOptionIndex: number }[] = [];

    perQuestionResults.forEach(({ question, isCorrect, selectedOptionIndex }) => {
      if (!chapterAgg[question.chapterId]) {
        chapterAgg[question.chapterId] = {
          subjectId: question.subjectId,
          attempted: 0,
          correct: 0,
          wrong: 0,
        };
      }
      chapterAgg[question.chapterId].attempted += 1;
      if (isCorrect) chapterAgg[question.chapterId].correct += 1;
      else {
        chapterAgg[question.chapterId].wrong += 1;
        wrongResults.push({
          question,
          selectedOptionIndex: selectedOptionIndex ?? 0,
        });
      }
    });

    if (user) {
      setOptimisticCloudDaily((prev) => {
        const cur = prev[user.uid]?.dateKey === todayDateKey ? prev[user.uid] : undefined;
        const baseAttempted = Math.max(
          myCloudDailyEntry?.questionsAttempted || 0,
          cur?.attempted || 0
        );
        const baseCorrect = Math.max(myCloudDailyEntry?.correctCount || 0, cur?.correct || 0);
        return {
          ...prev,
          [user.uid]: {
            dateKey: todayDateKey,
            attempted: baseAttempted + attempt.answeredCount,
            correct: baseCorrect + attempt.correctCount,
          },
        };
      });
      await createCloudTestAttempt(user.uid, attempt);
      await Promise.all([
        ...Object.entries(chapterAgg).map(([chapterId, delta]) => {
          const prev = effectiveTopicStats[chapterId];
          return upsertCloudTopicStat(user.uid, {
            subjectId: delta.subjectId,
            chapterId,
            attempted: (prev?.attempted || 0) + delta.attempted,
            correct: (prev?.correct || 0) + delta.correct,
            wrong: (prev?.wrong || 0) + delta.wrong,
            totalTimeSec: (prev?.totalTimeSec || 0) + delta.attempted * 30,
          });
        }),
        ...wrongResults.map(({ question, selectedOptionIndex }) => {
          const prevWrong = effectiveWrongAnswers[question.id];
          return upsertCloudWrongAnswer(user.uid, {
            questionId: question.id,
            subjectId: question.subjectId,
            chapterId: question.chapterId,
            selectedOptionIndex,
            wrongCount: (prevWrong?.wrongCount || 0) + 1,
          });
        }),
        upsertDailyPerformerProgress(
          user,
          {
            displayName,
            photoUrl,
            college,
            targetExam,
          },
          {
            questionsAttemptedDelta: attempt.answeredCount,
            correctDelta: attempt.correctCount,
            testsDelta: 1,
            netScore: attempt.netScore,
          }
        ).catch(() => undefined),
      ]);
    } else {
      const nextStats = { ...localState.topicStats };
      Object.entries(chapterAgg).forEach(([chapterId, delta]) => {
        const prev = nextStats[chapterId];
        nextStats[chapterId] = {
          userId: 'guest',
          topicKey: chapterId,
          subjectId: delta.subjectId,
          chapterId,
          attempted: (prev?.attempted || 0) + delta.attempted,
          correct: (prev?.correct || 0) + delta.correct,
          wrong: (prev?.wrong || 0) + delta.wrong,
          totalTimeSec: (prev?.totalTimeSec || 0) + delta.attempted * 30,
          lastPracticedAt: Date.now(),
        };
      });
      const nextWrongAnswers = { ...localState.wrongAnswers };
      wrongResults.forEach(({ question, selectedOptionIndex }) => {
        const prevWrong = nextWrongAnswers[question.id];
        nextWrongAnswers[question.id] = {
          userId: 'guest',
          questionId: question.id,
          subjectId: question.subjectId,
          chapterId: question.chapterId,
          selectedOptionIndex,
          wrongCount: (prevWrong?.wrongCount || 0) + 1,
          lastWrongAtMs: Date.now(),
        };
      });
      const newAttempt: TestAttemptRecord = {
        ...attempt,
        userId: 'guest',
        createdAtMs: Date.now(),
      };
      const prevDaily =
        localState.dailyProgress && localState.dailyProgress.dateKey === todayDateKey
          ? localState.dailyProgress
          : {
              dateKey: todayDateKey,
              questionsAttempted: 0,
              correctCount: 0,
              testsCompleted: 0,
              bestNetScore: 0,
              score: 0,
            };
      const nextDailyQ = prevDaily.questionsAttempted + attempt.answeredCount;
      const nextDailyCorr = prevDaily.correctCount + attempt.correctCount;
      const nextDailyTests = prevDaily.testsCompleted + 1;
      const nextBestNet = Math.max(prevDaily.bestNetScore, attempt.netScore);
      const nextDaily = {
        dateKey: todayDateKey,
        questionsAttempted: nextDailyQ,
        correctCount: nextDailyCorr,
        testsCompleted: nextDailyTests,
        bestNetScore: nextBestNet,
        score: calculateDailyPerformanceScore({
          questionsAttempted: nextDailyQ,
          correctCount: nextDailyCorr,
          testsCompleted: nextDailyTests,
          bestNetScore: nextBestNet,
        }),
      };
      const next: LocalProgressState = {
        ...localState,
        topicStats: nextStats,
        testAttempts: [newAttempt, ...localState.testAttempts],
        wrongAnswers: nextWrongAnswers,
        dailyProgress: nextDaily,
      };
      setLocalState(next);
      saveLocalProgress(next);
    }
  };

  const handleDeleteAttempt = async (attemptId: string) => {
    if (user) {
      await deleteCloudTestAttempt(user.uid, attemptId);
    } else {
      const next: LocalProgressState = {
        ...localState,
        testAttempts: localState.testAttempts.filter((a) => a.id !== attemptId),
      };
      setLocalState(next);
      saveLocalProgress(next);
    }
  };

  const handleToggleBookmark = async (question: McqQuestion) => {
    const currentlySaved = Boolean(effectiveBookmarks[question.id]);
    if (user) {
      await toggleCloudBookmark(
        user.uid,
        {
          questionId: question.id,
          subjectId: question.subjectId,
          chapterId: question.chapterId,
        },
        !currentlySaved
      );
    } else {
      const nextBookmarks = { ...localState.bookmarks };
      if (currentlySaved) {
        delete nextBookmarks[question.id];
      } else {
        nextBookmarks[question.id] = {
          userId: 'guest',
          questionId: question.id,
          subjectId: question.subjectId,
          chapterId: question.chapterId,
          createdAtMs: Date.now(),
        };
      }
      const next = { ...localState, bookmarks: nextBookmarks };
      setLocalState(next);
      saveLocalProgress(next);
    }
  };

  const handleRemoveWrongAnswer = async (questionId: string) => {
    if (user) {
      await deleteCloudWrongAnswer(user.uid, questionId);
    } else {
      const nextWrongAnswers = { ...localState.wrongAnswers };
      delete nextWrongAnswers[questionId];
      const next = { ...localState, wrongAnswers: nextWrongAnswers };
      setLocalState(next);
      saveLocalProgress(next);
    }
  };

  const handleClearAllWrongAnswers = async () => {
    if (user) {
      await clearAllCloudWrongAnswers(user.uid, Object.keys(cloudWrongAnswers));
    } else {
      const next = { ...localState, wrongAnswers: {} };
      setLocalState(next);
      saveLocalProgress(next);
    }
  };

  const handlePracticeChapter = (chapter: ChapterInfo) => {
    setPracticeSubject(chapter.subjectId);
    setPracticeChapter(chapter.id);
    setActiveTab('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenVisualLesson = (lessonId: string) => {
    setActiveVisualLessonId(lessonId);
    setActiveTab('visual');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bio-canvas-bg text-[#1D1336] dark:text-[#F2EDFF] overflow-x-clip transition-colors duration-200">
      {/* Ambient 3D Volumetric Spheres for Real Frosted-Glass Refraction */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="glass-orb-slow absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-[#8B5CF6]/28 via-[#6D4ACF]/18 to-transparent dark:from-[#8B5CF6]/22 dark:via-[#6D4ACF]/14 blur-3xl" />
        <div className="glass-orb-slow-reverse absolute top-16 -right-28 w-[440px] h-[440px] rounded-full bg-gradient-to-bl from-sky-400/22 via-indigo-400/16 to-transparent dark:from-sky-500/16 dark:via-indigo-500/12 blur-3xl" />
        <div className="glass-orb-slow absolute top-[45%] left-[22%] w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#A78BFA]/20 via-fuchsia-300/12 to-transparent dark:from-[#7C3AED]/16 dark:via-fuchsia-500/10 blur-3xl" />
        <div className="glass-orb-slow-reverse absolute -bottom-28 right-[14%] w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-rose-300/20 via-violet-400/16 to-transparent dark:from-rose-500/14 dark:via-violet-600/12 blur-3xl" />
      </div>

      <TopBar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'practice') {
            setPracticeSubject('all');
            setPracticeChapter('all');
          }
          if (tab === 'medical_model') {
            setAutoStartPastYearKey(0);
          }
          setActiveTab(tab);
        }}
        user={user}
        profilePhotoUrl={photoUrl}
        authLoading={authLoading}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        theme={theme}
        onToggleTheme={toggleTheme}
        resolvedAccess={resolvedAccess}
        onOpenEnrollModal={() => setEnrollModalOpen(true)}
      />

      {authError && (
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
          <div className="bg-rose-50/80 dark:bg-rose-950/80 backdrop-blur-xl border border-rose-200/90 dark:border-rose-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_-8px_rgba(190,18,60,0.18)] text-rose-900 dark:text-rose-200 text-xs font-medium px-4 py-3 rounded-2xl flex items-center justify-between">
            <span>{authError}</span>
            <button
              type="button"
              onClick={() => setAuthError(null)}
              className="text-rose-700 dark:text-rose-300 font-semibold underline ml-4"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {user && !isCloudSuperAdmin && cloudProfile?.accountStatus === 'suspended' ? (
          <section className="max-w-xl mx-auto bio-card rounded-3xl p-8 text-center space-y-4 mt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-rose-50/90 dark:bg-rose-950/75 border border-rose-200 dark:border-rose-400/30 text-rose-700 dark:text-rose-300 text-xs font-bold">
              অ্যাকাউন্ট সাময়িকভাবে স্থগিত
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              আপনার অ্যাকাউন্টটি সাময়িকভাবে স্থগিত করা হয়েছে
            </h1>
            <p className="text-xs sm:text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
              {cloudProfile.adminNote
                ? `অ্যাডমিন নোট: ${cloudProfile.adminNote}`
                : 'অ্যাডমিনিস্ট্রেটিভ পর্যালোচনার কারণে এই অ্যাকাউন্টের অ্যাক্সেস সাময়িকভাবে সীমিত রাখা হয়েছে।'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="glass-btn-primary px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
              >
                সাইন-আউট করুন
              </button>
            </div>
          </section>
        ) : !tabAccess.allowed ? (
          <AccessGateCard
            reasonBn={tabAccess.reasonBn}
            isSignedIn={Boolean(user)}
            isExpired={resolvedAccess.isExpired}
            policy={accessPolicy}
            onSignIn={handleSignIn}
            onOpenEnroll={() => setEnrollModalOpen(true)}
            onGoDashboard={() => setActiveTab('dashboard')}
          />
        ) : (
          <>
        {activeTab === 'dashboard' && (
          <DashboardView
            isDark={theme === 'dark'}
            isSignedIn={Boolean(user)}
            currentUserId={user?.uid}
            displayName={displayName}
            photoUrl={photoUrl}
            targetExam={targetExam}
            hscClass={hscClass}
            college={college}
            dailyGoal={dailyGoal}
            todayAttempted={todayAttempted}
            todayCorrect={todayCorrect}
            todayDateKey={todayDateKey}
            dailyPerformers={dailyPerformers}
            localDailyProgress={localState.dailyProgress}
            topicStats={effectiveTopicStats}
            testAttempts={effectiveTestAttempts}
            bookmarkCount={Object.keys(effectiveBookmarks).length}
            wrongAnswers={effectiveWrongAnswers}
            extraQuestions={customMcqQuestions}
            accessPolicy={accessPolicy}
            resolvedAccess={resolvedAccess}
            onUpdateProfile={handleUpdateProfile}
            onNavigateTab={setActiveTab}
            onPracticeChapter={handlePracticeChapter}
            onOpenVisualLesson={handleOpenVisualLesson}
            onDeleteAttempt={handleDeleteAttempt}
            onSignIn={handleSignIn}
            onOpenEnrollModal={() => setEnrollModalOpen(true)}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            initialSubjectId={practiceSubject}
            initialChapterId={practiceChapter}
            extraQuestions={customMcqQuestions}
            bookmarks={effectiveBookmarks}
            resolvedAccess={resolvedAccess}
            onOpenEnrollModal={() => setEnrollModalOpen(true)}
            onRecordAnswer={(q, ok, sec, optIdx) => void handleRecordAnswer(q, ok, sec, optIdx)}
            onToggleBookmark={(q) => void handleToggleBookmark(q)}
            onOpenVisualLesson={handleOpenVisualLesson}
          />
        )}

        {activeTab === 'question_bank' && (
          <QuestionBankView
            extraQuestions={customMcqQuestions}
            bookmarks={effectiveBookmarks}
            resolvedAccess={resolvedAccess}
            onOpenEnrollModal={() => setEnrollModalOpen(true)}
            onRecordAnswer={(q, ok, sec, optIdx) => void handleRecordAnswer(q, ok, sec, optIdx)}
            onToggleBookmark={(q) => void handleToggleBookmark(q)}
            onOpenVisualLesson={handleOpenVisualLesson}
            onStartPastYearModelTest={() => {
              setAutoStartPastYearKey((k) => k + 1);
              setActiveTab('medical_model');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'wrong_bank' && (
          <WrongAnswerBankView
            wrongAnswers={effectiveWrongAnswers}
            bookmarks={effectiveBookmarks}
            extraQuestions={customMcqQuestions}
            onRecordAnswer={(q, ok, sec, optIdx) => void handleRecordAnswer(q, ok, sec, optIdx)}
            onRemoveWrongAnswer={(qid) => void handleRemoveWrongAnswer(qid)}
            onClearAllWrongAnswers={() => void handleClearAllWrongAnswers()}
            onToggleBookmark={(q) => void handleToggleBookmark(q)}
            onOpenVisualLesson={handleOpenVisualLesson}
            onNavigateTab={setActiveTab}
          />
        )}

        {(activeTab === 'mock' || activeTab === 'medical_model') && (
          <ExamSimulatorView
            mode={activeTab}
            autoStartPastYearKey={autoStartPastYearKey}
            extraQuestions={customMcqQuestions}
            onSaveAttempt={handleSaveTestAttempt}
            onOpenVisualLesson={handleOpenVisualLesson}
            onPracticeChapter={handlePracticeChapter}
          />
        )}

        {activeTab === 'visual' && (
          <VisualLearningView
            initialLessonId={activeVisualLessonId}
            customInfographics={publishedInfographics}
            customVideos={publishedVideos}
            resolvedAccess={resolvedAccess}
            onOpenEnrollModal={() => setEnrollModalOpen(true)}
            onPracticeChapter={handlePracticeChapter}
          />
        )}

        {activeTab === 'worksheets' && (
          <WorksheetsView
            worksheets={publishedWorksheets}
            onPracticeChapter={handlePracticeChapter}
            onOpenVisualLesson={handleOpenVisualLesson}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'admin' && (
          <SuperAdminPanelView
            user={user}
            isCloudSuperAdmin={isCloudSuperAdmin}
            content={isCloudSuperAdmin ? cloudAdminContent : localAdminContent}
            cloudUsers={cloudUsers}
            cloudAdmins={cloudAdmins}
            accessPolicy={accessPolicy}
            enrollmentRequests={allEnrollmentRequests}
            onSignIn={handleSignIn}
            onNavigateTab={setActiveTab}
            onSaveInfographic={handleSaveInfographic}
            onDeleteInfographic={handleDeleteInfographic}
            onSaveVideo={handleSaveVideo}
            onDeleteVideo={handleDeleteVideo}
            onSaveQuestion={handleSaveQuestion}
            onDeleteQuestion={handleDeleteQuestion}
            onSaveWorksheet={handleSaveWorksheet}
            onDeleteWorksheet={handleDeleteWorksheet}
            onCreateCloudUser={adminCreateCloudUser}
            onUpdateCloudUser={adminUpdateCloudUser}
            onGrantSuperAdmin={adminGrantSuperAdmin}
            onRevokeSuperAdmin={(uid) => adminRevokeSuperAdmin(uid, user?.uid)}
            onDeleteCloudUser={(uid) => adminDeleteCloudUser(uid, user?.uid)}
            onLookupUserByUid={adminLookupUserByUid}
            onFetchUserActivity={adminFetchUserActivity}
            onSaveAccessPolicy={(policyDraft) =>
              user
                ? saveAccessPolicy(user, policyDraft)
                : Promise.reject(new Error('সুপার এডমিন সাইন-ইন প্রয়োজন'))
            }
            onReviewEnrollmentRequest={(req, decision, options) =>
              user
                ? adminReviewEnrollmentRequest(user, req, decision, options)
                : Promise.reject(new Error('সুপার এডমিন সাইন-ইন প্রয়োজন'))
            }
            onSetUserAccessTier={adminSetUserAccessTier}
          />
        )}
          </>
        )}
      </main>

      <EnrollmentModal
        open={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        user={user}
        displayName={displayName}
        policy={accessPolicy}
        resolvedAccess={resolvedAccess}
        myRequests={myEnrollmentRequests}
        onSignIn={handleSignIn}
        onSubmitEnrollment={handleSubmitEnrollment}
      />

      <footer className="relative z-10 border-t border-white/80 dark:border-white/10 bg-white/55 dark:bg-[#100B20]/75 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] mt-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#554578] dark:text-[#B6ABD6]">
          <span className="inline-flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <span>
              <strong className="font-bold text-[#1D1336] dark:text-[#F4F0FF]">{BRAND_NAME}</strong> · একাদশ-দ্বাদশ বিজ্ঞান ও মেডিকেল-ডেন্টাল অ্যাডমিশন প্রস্তুতি প্ল্যাটফর্ম
            </span>
          </span>
          <span>NCTB ও DGME অ্যাডমিশন সিলেবাস অনুসারে প্রস্তুতকৃত</span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MedExcelApp />
    </ErrorBoundary>
  );
}
