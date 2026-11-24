import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Award,
  Ban,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Lock,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Trash2,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  X,
} from 'lucide-react';
import { User } from 'firebase/auth';
import { getChapterById } from '../data/curriculum';
import { DAY_MS } from '../services/accessStore';
import { SUPER_ADMIN_EMAIL } from '../services/adminContentStore';
import {
  AccessTier,
  AccountStatus,
  AdminRoleEntry,
  AdminUserActivitySummary,
  AdminUserRecord,
  HscLevel,
  ManualUserCreateInput,
  TargetExam,
} from '../types/learning';

interface AdminUserManagementTabProps {
  currentUser: User | null;
  isCloudSuperAdmin: boolean;
  isBootstrappedAdmin: boolean;
  users: AdminUserRecord[];
  admins: AdminRoleEntry[];
  defaultTrialDays?: number;
  defaultProDays?: number;
  onSignIn: () => void;
  onCreateUser: (input: ManualUserCreateInput) => Promise<AdminUserRecord>;
  onUpdateUser: (
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
  onDeleteUser: (uid: string) => Promise<void>;
  onLookupUserByUid: (
    uid: string
  ) => Promise<{ user: AdminUserRecord | null; isAdmin: boolean }>;
  onFetchUserActivity: (uid: string) => Promise<AdminUserActivitySummary>;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

const EXAM_LABELS: Record<TargetExam, string> = {
  medical: 'মেডিকেল (MBBS)',
  dental: 'ডেন্টাল (BDS)',
  hsc_science: 'HSC বিজ্ঞান',
};

const HSC_CLASS_LABELS: Record<HscLevel, string> = {
  '11': 'একাদশ',
  '12': 'দ্বাদশ',
  admission: 'অ্যাডমিশন',
};

function formatDateBn(ms: number): string {
  if (!ms) return 'অজানা';
  try {
    return new Date(ms).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'অজানা';
  }
}

function getAccessBadgeInfo(
  u: AdminUserRecord,
  defaultTrialDays: number,
  defaultProDays: number
): { label: string; className: string; remainingDays: number } {
  const now = Date.now();
  const tier: AccessTier = u.accessTier || 'free_trial';

  if (tier === 'lifetime_vip') {
    return {
      label: 'লাইফটাইম VIP',
      className:
        'bg-[#6D4ACF]/12 dark:bg-violet-500/25 border-[#6D4ACF]/30 dark:border-violet-400/40 text-[#6D4ACF] dark:text-[#C4B5FD]',
      remainingDays: 9999,
    };
  }
  if (tier === 'restricted') {
    return {
      label: 'সীমিত এক্সেস',
      className:
        'bg-rose-50/90 dark:bg-rose-950/65 border-rose-200 dark:border-rose-400/35 text-rose-700 dark:text-rose-300',
      remainingDays: 0,
    };
  }
  if (tier === 'enrolled_pro') {
    const startMs = u.accessStartsAtMs ?? u.createdAtMs ?? now;
    const expMs = u.accessExpiresAtMs ?? startMs + defaultProDays * DAY_MS;
    if (expMs > now) {
      const days = Math.max(1, Math.ceil((expMs - now) / DAY_MS));
      return {
        label: `প্রো · ${toBnDigits(days)} দিন`,
        className:
          'bg-emerald-50/90 dark:bg-emerald-950/65 border-emerald-200 dark:border-emerald-400/35 text-emerald-700 dark:text-emerald-300',
        remainingDays: days,
      };
    }
    return {
      label: 'প্রো মেয়াদ শেষ',
      className:
        'bg-amber-50/90 dark:bg-amber-950/65 border-amber-200 dark:border-amber-400/35 text-amber-800 dark:text-amber-200',
      remainingDays: 0,
    };
  }

  const startMs = u.accessStartsAtMs ?? u.createdAtMs ?? now;
  const expMs = u.accessExpiresAtMs ?? startMs + defaultTrialDays * DAY_MS;
  if (expMs > now) {
    const days = Math.max(1, Math.ceil((expMs - now) / DAY_MS));
    return {
      label: `ট্রায়াল · ${toBnDigits(days)} দিন`,
      className:
        'bg-sky-50/90 dark:bg-sky-950/65 border-sky-200 dark:border-sky-400/35 text-sky-700 dark:text-sky-300',
      remainingDays: days,
    };
  }
  return {
    label: 'ট্রায়াল শেষ',
    className:
      'bg-amber-50/90 dark:bg-amber-950/65 border-amber-200 dark:border-amber-400/35 text-amber-800 dark:text-amber-200',
    remainingDays: 0,
  };
}

export const AdminUserManagementTab: React.FC<AdminUserManagementTabProps> = ({
  currentUser,
  isCloudSuperAdmin,
  isBootstrappedAdmin,
  users,
  admins,
  defaultTrialDays = 7,
  defaultProDays = 365,
  onSignIn,
  onCreateUser,
  onUpdateUser,
  onGrantSuperAdmin,
  onRevokeSuperAdmin,
  onDeleteUser,
  onLookupUserByUid,
  onFetchUserActivity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AccountStatus>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'super_admin' | 'student'>('all');
  const [examFilter, setExamFilter] = useState<'all' | TargetExam>('all');

  // Direct UID lookup & quick admin grant
  const [lookupUidInput, setLookupUidInput] = useState('');
  const [lookupBusy, setLookupBusy] = useState(false);
  const [lookedUpUser, setLookedUpUser] = useState<AdminUserRecord | null>(null);
  const [lookedUpIsAdmin, setLookedUpIsAdmin] = useState(false);

  const [grantUid, setGrantUid] = useState('');
  const [grantEmail, setGrantEmail] = useState('');
  const [grantBusy, setGrantBusy] = useState(false);

  // Selected user inspector & inline editor state
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editExam, setEditExam] = useState<TargetExam>('medical');
  const [editClass, setEditClass] = useState<HscLevel>('12');
  const [editCollege, setEditCollege] = useState('');
  const [editDailyGoal, setEditDailyGoal] = useState(30);
  const [editStatus, setEditStatus] = useState<AccountStatus>('active');
  const [editAccessTier, setEditAccessTier] = useState<AccessTier>('free_trial');
  const [editAccessDays, setEditAccessDays] = useState<number>(defaultTrialDays);
  const [editNote, setEditNote] = useState('');

  const [savingUid, setSavingUid] = useState<string | null>(null);
  const [confirmDeleteUid, setConfirmDeleteUid] = useState<string | null>(null);
  const [copiedUid, setCopiedUid] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Manual user creation state
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [manualUsers, setManualUsers] = useState<AdminUserRecord[]>([]);
  const [manualAdminUids, setManualAdminUids] = useState<string[]>([]);
  const [newUid, setNewUid] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newExam, setNewExam] = useState<TargetExam>('medical');
  const [newClass, setNewClass] = useState<HscLevel>('12');
  const [newCollege, setNewCollege] = useState('');
  const [newDailyGoal, setNewDailyGoal] = useState(30);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newStatus, setNewStatus] = useState<AccountStatus>('active');
  const [newAccessTier, setNewAccessTier] = useState<AccessTier>('free_trial');
  const [newAccessDays, setNewAccessDays] = useState<number>(defaultTrialDays);
  const [newNote, setNewNote] = useState('');
  const [newGrantAdmin, setNewGrantAdmin] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

  // Live activity summary for selected user
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState<string | null>(null);
  const [activitySummary, setActivitySummary] = useState<AdminUserActivitySummary | null>(null);

  const adminUidSet = useMemo(() => {
    const set = new Set(admins.map((a) => a.uid));
    manualAdminUids.forEach((uid) => set.add(uid));
    return set;
  }, [admins, manualAdminUids]);

  // Merge directory list with lookedUpUser & manually added users (useful for delegated admins)
  const mergedUsers = useMemo(() => {
    const map = new Map<string, AdminUserRecord>();
    users.forEach((u) => map.set(u.uid, u));
    manualUsers.forEach((u) => {
      if (!map.has(u.uid)) map.set(u.uid, u);
    });
    if (lookedUpUser && !map.has(lookedUpUser.uid)) {
      map.set(lookedUpUser.uid, lookedUpUser);
    }
    return Array.from(map.values());
  }, [users, manualUsers, lookedUpUser]);

  const isUserAdmin = (u: AdminUserRecord): boolean => {
    if (u.email.toLowerCase() === SUPER_ADMIN_EMAIL) return true;
    if (adminUidSet.has(u.uid)) return true;
    if (lookedUpUser?.uid === u.uid && lookedUpIsAdmin) return true;
    return false;
  };

  const isPrimarySuperAdminUser = (u: AdminUserRecord): boolean =>
    u.email.toLowerCase() === SUPER_ADMIN_EMAIL;

  const isSelfUser = (u: AdminUserRecord): boolean =>
    Boolean(currentUser && currentUser.uid === u.uid);

  const stats = useMemo(() => {
    const total = mergedUsers.length;
    const suspended = mergedUsers.filter((u) => u.accountStatus === 'suspended').length;
    const active = total - suspended;
    const adminCount = mergedUsers.filter((u) => isUserAdmin(u)).length;
    return {
      total,
      active,
      suspended,
      adminCount: Math.max(adminCount, admins.length),
    };
  }, [mergedUsers, admins.length, adminUidSet, lookedUpUser, lookedUpIsAdmin]);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mergedUsers.filter((u) => {
      if (statusFilter !== 'all' && u.accountStatus !== statusFilter) return false;
      const uIsAdmin = isUserAdmin(u);
      if (roleFilter === 'super_admin' && !uIsAdmin) return false;
      if (roleFilter === 'student' && uIsAdmin) return false;
      if (examFilter !== 'all' && u.targetExam !== examFilter) return false;
      if (!q) return true;
      return (
        u.displayName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.college.toLowerCase().includes(q) ||
        u.uid.toLowerCase().includes(q)
      );
    });
  }, [mergedUsers, searchQuery, statusFilter, roleFilter, examFilter, adminUidSet, lookedUpUser, lookedUpIsAdmin]);

  const selectedUser = useMemo(
    () => mergedUsers.find((u) => u.uid === selectedUid) || null,
    [mergedUsers, selectedUid]
  );

  // Sync editor fields when selectedUser changes
  useEffect(() => {
    if (!selectedUser) return;
    setEditName(selectedUser.displayName);
    setEditExam(selectedUser.targetExam);
    setEditClass(selectedUser.hscClass);
    setEditCollege(selectedUser.college);
    setEditDailyGoal(selectedUser.dailyGoal);
    setEditStatus(selectedUser.accountStatus);
    const tier: AccessTier = selectedUser.accessTier || 'free_trial';
    setEditAccessTier(tier);
    const badge = getAccessBadgeInfo(selectedUser, defaultTrialDays, defaultProDays);
    if (tier === 'enrolled_pro') {
      setEditAccessDays(badge.remainingDays > 0 ? badge.remainingDays : defaultProDays);
    } else if (tier === 'free_trial') {
      setEditAccessDays(badge.remainingDays > 0 ? badge.remainingDays : defaultTrialDays);
    } else {
      setEditAccessDays(defaultProDays);
    }
    setEditNote(selectedUser.adminNote);
    setConfirmDeleteUid(null);
  }, [selectedUser, defaultTrialDays, defaultProDays]);

  // Fetch user's practice & test activity when selectedUid changes
  useEffect(() => {
    if (!selectedUid || !isCloudSuperAdmin) {
      setActivitySummary(null);
      setActivityError(null);
      return;
    }
    let cancelled = false;
    setActivityLoading(true);
    setActivityError(null);
    onFetchUserActivity(selectedUid)
      .then((res) => {
        if (!cancelled) setActivitySummary(res);
      })
      .catch(() => {
        if (!cancelled) {
          setActivitySummary(null);
          setActivityError('এই ইউজারের বিস্তারিত অনুশীলন ডেটা লোড করা যায়নি।');
        }
      })
      .finally(() => {
        if (!cancelled) setActivityLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selectedUid, isCloudSuperAdmin, onFetchUserActivity]);

  const handleCopyUid = async (uid: string) => {
    try {
      await navigator.clipboard.writeText(uid);
      setCopiedUid(uid);
      window.setTimeout(() => setCopiedUid((prev) => (prev === uid ? null : prev)), 1800);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleLookupByUid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupUidInput.trim()) return;
    setLookupBusy(true);
    setFeedback(null);
    try {
      const res = await onLookupUserByUid(lookupUidInput.trim());
      if (!res.user) {
        setFeedback({
          type: 'error',
          text: 'এই UID-তে কোনো নিবন্ধিত ইউজার প্রোফাইল পাওয়া যায়নি।',
        });
      } else {
        setLookedUpUser(res.user);
        setLookedUpIsAdmin(res.isAdmin);
        setSelectedUid(res.user.uid);
        setFeedback({
          type: 'success',
          text: `ইউজার "${res.user.displayName}" সফলভাবে লোড করা হয়েছে।`,
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'UID দিয়ে ইউজার খোঁজা যায়নি।',
      });
    } finally {
      setLookupBusy(false);
    }
  };

  const handleQuickGrantAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grantUid.trim() || !grantEmail.trim()) {
      setFeedback({ type: 'error', text: 'সুপার এডমিন দিতে UID এবং ইমেইল উভয়ই লিখুন।' });
      return;
    }
    setGrantBusy(true);
    setFeedback(null);
    try {
      await onGrantSuperAdmin(grantUid.trim(), grantEmail.trim());
      setGrantUid('');
      setGrantEmail('');
      setFeedback({ type: 'success', text: 'নতুন সুপার এডমিন ভূমিকা সফলভাবে যুক্ত হয়েছে।' });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'সুপার এডমিন যুক্ত করা যায়নি।',
      });
    } finally {
      setGrantBusy(false);
    }
  };

  const resetManualUserForm = () => {
    setNewUid('');
    setNewName('');
    setNewEmail('');
    setNewExam('medical');
    setNewClass('12');
    setNewCollege('');
    setNewDailyGoal(30);
    setNewPhotoUrl('');
    setNewStatus('active');
    setNewAccessTier('free_trial');
    setNewAccessDays(defaultTrialDays);
    setNewNote('');
    setNewGrantAdmin(false);
  };

  const handleCreateManualUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedName = newName.trim();
    const trimmedEmail = newEmail.trim().toLowerCase();
    const trimmedUid = newUid.trim();

    if (!trimmedName) {
      setFeedback({ type: 'error', text: 'ইউজারের নাম লিখুন।' });
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFeedback({ type: 'error', text: 'সঠিক ইমেইল ঠিকানা লিখুন।' });
      return;
    }
    if (trimmedUid && !/^[a-zA-Z0-9_-]{1,128}$/.test(trimmedUid)) {
      setFeedback({
        type: 'error',
        text: 'UID-তে শুধুমাত্র ইংরেজি অক্ষর, সংখ্যা, _ এবং - ব্যবহার করা যাবে।',
      });
      return;
    }
    if (mergedUsers.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      setFeedback({
        type: 'error',
        text: 'এই ইমেইল ঠিকানায় ইতিমধ্যে একজন ইউজার নিবন্ধিত আছেন।',
      });
      return;
    }

    setCreatingUser(true);
    try {
      const created = await onCreateUser({
        uid: trimmedUid || undefined,
        displayName: trimmedName,
        email: trimmedEmail,
        targetExam: newExam,
        hscClass: newClass,
        college: newCollege.trim(),
        photoUrl: newPhotoUrl.trim(),
        dailyGoal: Math.min(200, Math.max(5, Math.round(newDailyGoal || 30))),
        accountStatus: newStatus,
        adminNote: newNote.trim(),
        accessTier: newAccessTier,
        accessDays:
          newAccessTier === 'enrolled_pro' || newAccessTier === 'free_trial'
            ? newAccessDays
            : undefined,
        grantSuperAdmin: isBootstrappedAdmin && newGrantAdmin,
      });
      setManualUsers((prev) => [created, ...prev.filter((u) => u.uid !== created.uid)]);
      if (isBootstrappedAdmin && newGrantAdmin) {
        setManualAdminUids((prev) => (prev.includes(created.uid) ? prev : [...prev, created.uid]));
      }
      setSelectedUid(created.uid);
      resetManualUserForm();
      setShowAddUserForm(false);
      setFeedback({
        type: 'success',
        text: `নতুন ইউজার "${created.displayName}" সফলভাবে যুক্ত করা হয়েছে!`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'নতুন ইউজার যুক্ত করা যায়নি।',
      });
    } finally {
      setCreatingUser(false);
    }
  };

  const handleToggleSuspend = async (u: AdminUserRecord) => {
    if (isPrimarySuperAdminUser(u) || isSelfUser(u)) {
      setFeedback({
        type: 'error',
        text: 'প্রধান সুপার এডমিন বা নিজের অ্যাকাউন্ট স্থগিত করা যাবে না।',
      });
      return;
    }
    const nextStatus: AccountStatus = u.accountStatus === 'suspended' ? 'active' : 'suspended';
    setSavingUid(u.uid);
    setFeedback(null);
    try {
      await onUpdateUser(u.uid, {
        displayName: u.displayName,
        targetExam: u.targetExam,
        hscClass: u.hscClass,
        college: u.college,
        dailyGoal: u.dailyGoal,
        accountStatus: nextStatus,
        adminNote:
          nextStatus === 'suspended' && !u.adminNote
            ? 'অ্যাডমিনিস্ট্রেটিভ পর্যালোচনার কারণে সাময়িকভাবে স্থগিত করা হয়েছে।'
            : u.adminNote,
      });
      if (lookedUpUser?.uid === u.uid) {
        setLookedUpUser({ ...u, accountStatus: nextStatus });
      }
      setFeedback({
        type: 'success',
        text:
          nextStatus === 'suspended'
            ? `${u.displayName}-এর অ্যাকাউন্ট সাময়িকভাবে স্থগিত করা হয়েছে।`
            : `${u.displayName}-এর অ্যাকাউন্ট পুনরায় সক্রিয় করা হয়েছে।`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'অ্যাকাউন্ট স্ট্যাটাস পরিবর্তন করা যায়নি।',
      });
    } finally {
      setSavingUid(null);
    }
  };

  const handleToggleAdminRole = async (u: AdminUserRecord) => {
    if (isPrimarySuperAdminUser(u) || isSelfUser(u)) {
      setFeedback({
        type: 'error',
        text: 'প্রধান সুপার এডমিন বা নিজের ভূমিকা পরিবর্তন করা যাবে না।',
      });
      return;
    }
    const currentlyAdmin = isUserAdmin(u);
    setSavingUid(u.uid);
    setFeedback(null);
    try {
      if (currentlyAdmin) {
        await onRevokeSuperAdmin(u.uid);
        if (lookedUpUser?.uid === u.uid) setLookedUpIsAdmin(false);
        setFeedback({
          type: 'success',
          text: `${u.displayName}-এর সুপার এডমিন ভূমিকা প্রত্যাহার করা হয়েছে।`,
        });
      } else {
        await onGrantSuperAdmin(u.uid, u.email);
        if (lookedUpUser?.uid === u.uid) setLookedUpIsAdmin(true);
        setFeedback({
          type: 'success',
          text: `${u.displayName}-কে সুপার এডমিন ভূমিকা প্রদান করা হয়েছে।`,
        });
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'ভূমিকা পরিবর্তন সম্পন্ন হয়নি।',
      });
    } finally {
      setSavingUid(null);
    }
  };

  const handleSaveSelectedUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    if (!editName.trim()) {
      setFeedback({ type: 'error', text: 'ইউজারের নাম খালি রাখা যাবে না।' });
      return;
    }
    if ((isPrimarySuperAdminUser(selectedUser) || isSelfUser(selectedUser)) && editStatus === 'suspended') {
      setFeedback({
        type: 'error',
        text: 'প্রধান সুপার এডমিন বা নিজের অ্যাকাউন্ট স্থগিত করা যাবে না।',
      });
      return;
    }

    setSavingUid(selectedUser.uid);
    setFeedback(null);
    try {
      const daysVal =
        editAccessTier === 'enrolled_pro' || editAccessTier === 'free_trial'
          ? editAccessDays
          : undefined;
      await onUpdateUser(selectedUser.uid, {
        displayName: editName.trim(),
        targetExam: editExam,
        hscClass: editClass,
        college: editCollege.trim(),
        dailyGoal: Math.min(200, Math.max(5, Math.round(editDailyGoal || 30))),
        accountStatus: editStatus,
        adminNote: editNote.trim(),
        accessTier: editAccessTier,
        accessDays: daysVal,
      });
      if (lookedUpUser?.uid === selectedUser.uid) {
        const nowMs = Date.now();
        setLookedUpUser({
          ...selectedUser,
          displayName: editName.trim(),
          targetExam: editExam,
          hscClass: editClass,
          college: editCollege.trim(),
          dailyGoal: Math.min(200, Math.max(5, Math.round(editDailyGoal || 30))),
          accountStatus: editStatus,
          adminNote: editNote.trim(),
          accessTier: editAccessTier,
          accessStartsAtMs: nowMs,
          accessExpiresAtMs: daysVal ? nowMs + daysVal * DAY_MS : undefined,
        });
      }
      setFeedback({
        type: 'success',
        text: `${editName.trim()}-এর প্রোফাইল ও অ্যাক্সেস নিয়ন্ত্রণ ক্লাউডে সংরক্ষণ করা হয়েছে।`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'তথ্য সংরক্ষণ করা যায়নি।',
      });
    } finally {
      setSavingUid(null);
    }
  };

  const handleDeleteSelectedUser = async () => {
    if (!selectedUser) return;
    if (isPrimarySuperAdminUser(selectedUser) || isSelfUser(selectedUser)) {
      setFeedback({
        type: 'error',
        text: 'প্রধান সুপার এডমিন বা নিজের প্রোফাইল মুছে ফেলা যাবে না।',
      });
      return;
    }
    setSavingUid(selectedUser.uid);
    setFeedback(null);
    try {
      await onDeleteUser(selectedUser.uid);
      setManualUsers((prev) => prev.filter((u) => u.uid !== selectedUser.uid));
      if (lookedUpUser?.uid === selectedUser.uid) {
        setLookedUpUser(null);
      }
      setSelectedUid(null);
      setConfirmDeleteUid(null);
      setFeedback({
        type: 'success',
        text: `${selectedUser.displayName}-এর ক্লাউড প্রোফাইল মুছে ফেলা হয়েছে।`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'প্রোফাইল মুছে ফেলা যায়নি।',
      });
    } finally {
      setSavingUid(null);
    }
  };

  const handleExportCsv = () => {
    if (filteredUsers.length === 0) return;
    const headers = [
      'UID',
      'নাম',
      'ইমেইল',
      'কলেজ',
      'শ্রেণি',
      'লক্ষ্য',
      'দৈনিক লক্ষ্য',
      'ভূমিকা',
      'অবস্থা',
      'অ্যাডমিন নোট',
    ];
    const escapeCell = (val: string | number) => {
      const str = String(val ?? '').replace(/"/g, '""');
      return `"${str}"`;
    };
    const rows = filteredUsers.map((u) => [
      escapeCell(u.uid),
      escapeCell(u.displayName),
      escapeCell(u.email),
      escapeCell(u.college),
      escapeCell(HSC_CLASS_LABELS[u.hscClass]),
      escapeCell(EXAM_LABELS[u.targetExam]),
      escapeCell(u.dailyGoal),
      escapeCell(isUserAdmin(u) ? 'সুপার এডমিন' : 'শিক্ষার্থী'),
      escapeCell(u.accountStatus === 'suspended' ? 'স্থগিত' : 'সক্রিয়'),
      escapeCell(u.adminNote),
    ]);
    const csvContent = '\uFEFF' + [headers.map(escapeCell).join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medexcel_users_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const activityTotals = useMemo(() => {
    if (!activitySummary) {
      return { attempted: 0, correct: 0, accuracy: 0, totalMinutes: 0, testCount: 0 };
    }
    const attempted = activitySummary.topicStats.reduce((sum, s) => sum + s.attempted, 0);
    const correct = activitySummary.topicStats.reduce((sum, s) => sum + s.correct, 0);
    const totalSec = activitySummary.topicStats.reduce((sum, s) => sum + s.totalTimeSec, 0);
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    return {
      attempted,
      correct,
      accuracy,
      totalMinutes: Math.round(totalSec / 60),
      testCount: activitySummary.testAttempts.length,
    };
  }, [activitySummary]);

  if (!isCloudSuperAdmin) {
    return (
      <div className="bio-card rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-200 bg-amber-50/85 dark:bg-amber-950/55 border border-amber-200 dark:border-amber-400/35 px-3 py-1 rounded-lg">
              <Lock className="w-3.5 h-3.5" />
              স্মার্ট ইউজার ম্যানেজমেন্ট সুরক্ষিত মোডে আছে
            </div>
            <h2 className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              ক্লাউড ইউজার ডিরেক্টরি দেখতে সুপার এডমিন সাইন-ইন প্রয়োজন
            </h2>
            <p className="text-xs sm:text-sm text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
              শিক্ষার্থীদের ব্যক্তিগত ইমেইল, প্রোফাইল তথ্য ও অ্যাকাউন্ট নিয়ন্ত্রণ Firestore Security Rules দ্বারা সম্পূর্ণ সুরক্ষিত।
              বাস্তব নিবন্ধিত ইউজারদের তালিকা, স্ট্যাটাস স্থগিত/সক্রিয় করা এবং সুপার এডমিন রোল পরিচালনা করতে অনুমোদিত সুপার এডমিন অ্যাকাউন্ট ({SUPER_ADMIN_EMAIL}) দিয়ে সাইন-ইন করুন।
            </p>
          </div>
          {!currentUser && (
            <button
              type="button"
              onClick={onSignIn}
              className="glass-btn-primary px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl shrink-0"
            >
              গুগল দিয়ে সাইন-ইন করুন
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 4 Governance KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">মোট নিবন্ধিত ইউজার</span>
            <Users className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
            {toBnDigits(stats.total)}
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">লাইভ ক্লাউড ডিরেক্টরি</div>
        </div>

        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">সক্রিয় অ্যাকাউন্ট</span>
            <UserCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-emerald-700 dark:text-emerald-300">
            {toBnDigits(stats.active)}
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">অনুশীলন ও পরীক্ষায় সচল</div>
        </div>

        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">সুপার এডমিন</span>
            <ShieldCheck className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD]">
            {toBnDigits(stats.adminCount)}
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">কন্টেন্ট ও ইউজার মডারেটর</div>
        </div>

        <div className="bio-card rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#554578] dark:text-[#B6ABD6]">
            <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">স্থগিত অ্যাকাউন্ট</span>
            <ShieldAlert className="w-4 h-4 text-rose-700 dark:text-rose-300" />
          </div>
          <div className="text-2xl font-bold font-mono-tabular text-rose-700 dark:text-rose-300">
            {toBnDigits(stats.suspended)}
          </div>
          <div className="text-[11px] text-[#554578] dark:text-[#A598C9]">সাময়িক অ্যাক্সেস সীমিত</div>
        </div>
      </div>

      {/* Feedback Banner */}
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

      {/* UID Lookup & Quick Super Admin Promotion Bar */}
      <div className="grid lg:grid-cols-2 gap-4">
        <form onSubmit={handleLookupByUid} className="bio-card rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              <Search className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              সরাসরি UID দিয়ে ইউজার অনুসন্ধান ও ইন্সপেক্ট
            </div>
            <span className="text-[11px] text-[#554578] dark:text-[#A598C9]">তাৎক্ষণিক ভেরিফিকেশন</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={lookupUidInput}
              onChange={(e) => setLookupUidInput(e.target.value)}
              placeholder="ফায়ারবেস ইউজার UID লিখুন..."
              className="glass-input flex-1 px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
            />
            <button
              type="submit"
              disabled={lookupBusy || !lookupUidInput.trim()}
              className="glass-btn-secondary px-3.5 py-2 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl disabled:opacity-50"
            >
              {lookupBusy ? 'খোঁজা হচ্ছে...' : 'খুঁজুন'}
            </button>
          </div>
        </form>

        {isBootstrappedAdmin && (
          <form onSubmit={handleQuickGrantAdmin} className="bio-card rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                <UserPlus className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                নতুন সুপার এডমিন নিয়োগ (UID + ইমেইল)
              </div>
              <span className="text-[11px] text-[#6D4ACF] dark:text-[#C4B5FD] font-medium">প্রধান এডমিন কন্ট্রোল</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={grantUid}
                onChange={(e) => setGrantUid(e.target.value)}
                placeholder="UID"
                className="glass-input flex-1 px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
              <input
                type="email"
                value={grantEmail}
                onChange={(e) => setGrantEmail(e.target.value)}
                placeholder="ইমেইল (verified Google)"
                className="glass-input flex-1 px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
              <button
                type="submit"
                disabled={grantBusy}
                className="glass-btn-primary px-3.5 py-2 text-xs font-semibold rounded-xl shrink-0 disabled:opacity-50"
              >
                {grantBusy ? 'যুক্ত হচ্ছে...' : 'এডমিন দিন'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Expandable Manual Add User Card */}
      {showAddUserForm && (
        <form onSubmit={handleCreateManualUser} className="bio-card rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                <UserPlus className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                ম্যানুয়ালভাবে নতুন ইউজার যুক্ত করুন
              </div>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                শিক্ষার্থী বা সুপার এডমিন প্রোফাইল সরাসরি ক্লাউড ডিরেক্টরিতে যোগ করুন।
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddUserForm(false)}
              className="glass-btn-secondary inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#554578] dark:text-[#B6ABD6] rounded-xl"
            >
              <X className="w-3.5 h-3.5" />
              বন্ধ করুন
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                ইউজারের নাম *
              </label>
              <input
                type="text"
                required
                maxLength={120}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="যেমন: তানভীর আহমেদ"
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                ইমেইল ঠিকানা *
              </label>
              <input
                type="email"
                required
                maxLength={200}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="student@example.com"
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                Firebase UID (ঐচ্ছিক)
              </label>
              <input
                type="text"
                maxLength={128}
                value={newUid}
                onChange={(e) => setNewUid(e.target.value)}
                placeholder="ফাঁকা রাখলে স্বয়ংক্রিয় তৈরি হবে"
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                লক্ষ্য পরীক্ষা
              </label>
              <select
                value={newExam}
                onChange={(e) => setNewExam(e.target.value as TargetExam)}
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              >
                <option value="medical">মেডিকেল (MBBS)</option>
                <option value="dental">ডেন্টাল (BDS)</option>
                <option value="hsc_science">HSC বিজ্ঞান</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                শ্রেণি/স্তর
              </label>
              <select
                value={newClass}
                onChange={(e) => setNewClass(e.target.value as HscLevel)}
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              >
                <option value="11">একাদশ</option>
                <option value="12">দ্বাদশ</option>
                <option value="admission">অ্যাডমিশন</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                দৈনিক লক্ষ্য (প্রশ্ন)
              </label>
              <input
                type="number"
                min={5}
                max={200}
                value={newDailyGoal}
                onChange={(e) => setNewDailyGoal(Number(e.target.value))}
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                কলেজ / প্রতিষ্ঠান (ঐচ্ছিক)
              </label>
              <input
                type="text"
                maxLength={150}
                value={newCollege}
                onChange={(e) => setNewCollege(e.target.value)}
                placeholder="যেমন: নটর ডেম কলেজ"
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                প্রোফাইল ছবির লিংক (ঐচ্ছিক)
              </label>
              <input
                type="url"
                maxLength={1000}
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                অ্যাকাউন্ট স্ট্যাটাস
              </label>
              <div className="glass-segment-track grid grid-cols-2 gap-1 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setNewStatus('active')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    newStatus === 'active'
                      ? 'glass-segment-active text-emerald-700 dark:text-emerald-300'
                      : 'text-[#554578] dark:text-[#B6ABD6]'
                  }`}
                >
                  সক্রিয়
                </button>
                <button
                  type="button"
                  onClick={() => setNewStatus('suspended')}
                  className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    newStatus === 'suspended'
                      ? 'glass-segment-active text-rose-700 dark:text-rose-300'
                      : 'text-[#554578] dark:text-[#B6ABD6]'
                  }`}
                >
                  স্থগিত
                </button>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 items-start">
            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                অ্যাক্সেস প্ল্যান স্তর
              </label>
              <select
                value={newAccessTier}
                onChange={(e) => {
                  const nextTier = e.target.value as AccessTier;
                  setNewAccessTier(nextTier);
                  if (nextTier === 'enrolled_pro') setNewAccessDays(defaultProDays);
                  else if (nextTier === 'free_trial') setNewAccessDays(defaultTrialDays);
                }}
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              >
                <option value="free_trial">ফ্রি ট্রায়াল</option>
                <option value="enrolled_pro">১ বছর প্রো (৫০০৳)</option>
                <option value="lifetime_vip">লাইফটাইম VIP</option>
                <option value="restricted">সীমিত (Restricted)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                প্ল্যান মেয়াদ (দিন)
              </label>
              <input
                type="number"
                min={1}
                max={1825}
                disabled={newAccessTier === 'lifetime_vip' || newAccessTier === 'restricted'}
                value={newAccessDays}
                onChange={(e) => setNewAccessDays(Number(e.target.value))}
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF] disabled:opacity-45"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                অ্যাডমিন নোট (ঐচ্ছিক)
              </label>
              <input
                type="text"
                maxLength={300}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="যেমন: ব্যাচ-২৫ ভর্তিকৃত শিক্ষার্থী..."
                className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            {isBootstrappedAdmin && (
              <div>
                <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                  ইউজার ভূমিকা
                </label>
                <div className="glass-segment-track grid grid-cols-2 gap-1 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setNewGrantAdmin(false)}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      !newGrantAdmin
                        ? 'glass-segment-active text-[#1D1336] dark:text-[#F4F0FF]'
                        : 'text-[#554578] dark:text-[#B6ABD6]'
                    }`}
                  >
                    শিক্ষার্থী
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewGrantAdmin(true)}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      newGrantAdmin
                        ? 'glass-segment-active text-[#6D4ACF] dark:text-[#C4B5FD]'
                        : 'text-[#554578] dark:text-[#B6ABD6]'
                    }`}
                  >
                    সুপার এডমিন
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-[11px] text-[#554578] dark:text-[#A598C9]">
              গুগল লগইন-ভিত্তিক পূর্ব-অনুমোদিত অ্যাকাউন্টের জন্য শিক্ষার্থীর Firebase UID দিন; না দিলে স্বয়ংক্রিয় প্রোফাইল ID তৈরি হবে।
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetManualUserForm}
                className="glass-btn-secondary px-3.5 py-2 text-xs font-semibold text-[#554578] dark:text-[#B6ABD6] rounded-xl"
              >
                রিসেট
              </button>
              <button
                type="submit"
                disabled={creatingUser}
                className="glass-btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl disabled:opacity-50"
              >
                <UserPlus className="w-3.5 h-3.5" />
                {creatingUser ? 'যুক্ত হচ্ছে...' : 'ইউজার তৈরি করুন'}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Main Two-Column Directory + Smart User Inspector */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left: Search, Filters & User List */}
        <div className="lg:col-span-7 bio-card rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                নিবন্ধিত ইউজার ও ভূমিকা নিয়ন্ত্রণ ({toBnDigits(filteredUsers.length)})
              </h2>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                নাম, ইমেইল, কলেজ বা UID অনুযায়ী ফিল্টার করে ১ ক্লিকে স্ট্যাটাস ও প্রোফাইল নিয়ন্ত্রণ করুন।
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddUserForm((prev) => !prev);
                  setFeedback(null);
                }}
                className="glass-btn-primary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl"
              >
                <UserPlus className="w-3.5 h-3.5" />
                {showAddUserForm ? 'ফরম বন্ধ করুন' : 'নতুন ইউজার যোগ করুন'}
              </button>
              <button
                type="button"
                onClick={handleExportCsv}
                disabled={filteredUsers.length === 0}
                className="glass-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1D1336] dark:text-[#F4F0FF] rounded-xl disabled:opacity-45"
              >
                <Download className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                CSV এক্সপোর্ট
              </button>
            </div>
          </div>

          {/* Search & Multi-Facet Filter Bar */}
          <div className="bio-subpanel rounded-xl p-3 space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-[#554578] dark:text-[#A598C9] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="নাম, ইমেইল, কলেজ অথবা UID দিয়ে খুঁজুন..."
                className="glass-input w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | AccountStatus)}
                className="glass-input px-2.5 py-1.5 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              >
                <option value="all">সব স্ট্যাটাস</option>
                <option value="active">সক্রিয় অ্যাকাউন্ট</option>
                <option value="suspended">স্থগিত অ্যাকাউন্ট</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) =>
                  setRoleFilter(e.target.value as 'all' | 'super_admin' | 'student')
                }
                className="glass-input px-2.5 py-1.5 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              >
                <option value="all">সব ভূমিকা</option>
                <option value="super_admin">সুপার এডমিন</option>
                <option value="student">শিক্ষার্থী</option>
              </select>

              <select
                value={examFilter}
                onChange={(e) => setExamFilter(e.target.value as 'all' | TargetExam)}
                className="glass-input px-2.5 py-1.5 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
              >
                <option value="all">সব লক্ষ্য পরীক্ষা</option>
                <option value="medical">মেডিকেল (MBBS)</option>
                <option value="dental">ডেন্টাল (BDS)</option>
                <option value="hsc_science">HSC বিজ্ঞান</option>
              </select>
            </div>
          </div>

          {/* User Rows */}
          <div className="space-y-3 max-h-[760px] overflow-y-auto pr-1">
            {filteredUsers.length === 0 ? (
              <div className="bio-subpanel rounded-xl p-8 text-center space-y-1.5">
                <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                  {mergedUsers.length === 0
                    ? 'এখনো কোনো ইউজার লোড হয়নি'
                    : 'ফিল্টার অনুযায়ী কোনো ইউজার পাওয়া যায়নি'}
                </div>
                <p className="text-xs text-[#554578] dark:text-[#B6ABD6]">
                  {!isBootstrappedAdmin
                    ? 'ডেলিগেটেড এডমিন হিসেবে ওপরের UID সার্চ বক্স ব্যবহার করে নির্দিষ্ট ইউজার লোড করুন।'
                    : 'সার্চ বা ফিল্টার পরিবর্তন করে পুনরায় দেখুন।'}
                </p>
              </div>
            ) : (
              filteredUsers.map((u) => {
                const uIsAdmin = isUserAdmin(u);
                const uIsPrimary = isPrimarySuperAdminUser(u);
                const uIsSelf = isSelfUser(u);
                const isSelected = selectedUid === u.uid;
                const isBusy = savingUid === u.uid;

                return (
                  <div
                    key={u.uid}
                    className={`rounded-xl p-4 space-y-3 transition-all glass-card-3d ${
                      isSelected ? 'glass-option-selected' : 'bio-subpanel'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        {u.photoUrl ? (
                          <img
                            src={u.photoUrl}
                            alt={u.displayName}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border border-white/80 dark:border-white/20 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6D4ACF] to-[#8B5CF6] text-white font-bold text-sm flex items-center justify-center shrink-0">
                            {u.displayName.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF] truncate">
                              {u.displayName}
                            </span>
                            {uIsSelf && (
                              <span className="text-[10px] font-semibold bg-[#6D4ACF]/12 dark:bg-violet-500/25 text-[#6D4ACF] dark:text-[#C4B5FD] px-1.5 py-0.5 rounded-md">
                                আপনি
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#554578] dark:text-[#B6ABD6] truncate">{u.email}</div>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-[#554578] dark:text-[#A598C9]">
                            <span>{EXAM_LABELS[u.targetExam]}</span>
                            <span>·</span>
                            <span>{HSC_CLASS_LABELS[u.hscClass]}</span>
                            {u.college && (
                              <>
                                <span>·</span>
                                <span className="truncate max-w-[180px]">{u.college}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${
                            u.accountStatus === 'suspended'
                              ? 'bg-rose-50/90 dark:bg-rose-950/65 border-rose-200 dark:border-rose-400/35 text-rose-700 dark:text-rose-300'
                              : 'bg-emerald-50/90 dark:bg-emerald-950/65 border-emerald-200 dark:border-emerald-400/35 text-emerald-700 dark:text-emerald-300'
                          }`}
                        >
                          {u.accountStatus === 'suspended' ? 'স্থগিত' : 'সক্রিয়'}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${
                            uIsAdmin
                              ? 'bg-[#6D4ACF]/10 dark:bg-violet-500/20 border-[#6D4ACF]/25 dark:border-violet-400/35 text-[#6D4ACF] dark:text-[#C4B5FD]'
                              : 'bg-white/75 dark:bg-white/10 border-white/90 dark:border-white/15 text-[#554578] dark:text-[#B6ABD6]'
                          }`}
                        >
                          {uIsPrimary ? 'প্রধান সুপার এডমিন' : uIsAdmin ? 'সুপার এডমিন' : 'শিক্ষার্থী'}
                        </span>
                        {!uIsAdmin && (() => {
                          const badge = getAccessBadgeInfo(u, defaultTrialDays, defaultProDays);
                          return (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border font-mono-tabular ${badge.className}`}>
                              {badge.label}
                            </span>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#6D4ACF]/10 dark:border-white/10">
                      <button
                        type="button"
                        onClick={() => void handleCopyUid(u.uid)}
                        className="inline-flex items-center gap-1 text-[11px] text-[#554578] dark:text-[#A598C9] hover:text-[#1D1336] dark:hover:text-white font-mono-tabular"
                        title="UID কপি করুন"
                      >
                        {copiedUid === u.uid ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-700 dark:text-emerald-300">UID কপি হয়েছে</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>UID: {u.uid.slice(0, 12)}...</span>
                          </>
                        )}
                      </button>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {!uIsPrimary && !uIsSelf && (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => void handleToggleSuspend(u)}
                            className={`glass-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg disabled:opacity-50 ${
                              u.accountStatus === 'suspended'
                                ? 'text-emerald-700 dark:text-emerald-300'
                                : 'text-rose-700 dark:text-rose-300'
                            }`}
                          >
                            {u.accountStatus === 'suspended' ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                সক্রিয় করুন
                              </>
                            ) : (
                              <>
                                <Ban className="w-3 h-3" />
                                স্থগিত করুন
                              </>
                            )}
                          </button>
                        )}

                        {isBootstrappedAdmin && !uIsPrimary && !uIsSelf && (
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => void handleToggleAdminRole(u)}
                            className="glass-btn-secondary inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] rounded-lg disabled:opacity-50"
                          >
                            {uIsAdmin ? (
                              <>
                                <ShieldOff className="w-3 h-3" />
                                এডমিন সরান
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="w-3 h-3" />
                                এডমিন করুন
                              </>
                            )}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedUid(u.uid)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg ${
                            isSelected
                              ? 'glass-btn-primary'
                              : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                          }`}
                        >
                          <UserCog className="w-3 h-3" />
                          বিস্তারিত
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Smart User Inspector, Live Activity & Profile Editor */}
        <aside className="lg:col-span-5 bio-card rounded-2xl p-5 space-y-5 lg:sticky lg:top-20">
          {!selectedUser ? (
            <div className="bio-subpanel rounded-xl p-8 text-center space-y-2">
              <UserCog className="w-8 h-8 text-[#6D4ACF] dark:text-[#C4B5FD] mx-auto" />
              <div className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                স্মার্ট ইউজার ইন্সপেক্টর
              </div>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                বাম পাশের তালিকা থেকে যেকোনো শিক্ষার্থীর &quot;বিস্তারিত&quot; বাটনে ক্লিক করে তার লাইভ অনুশীলন পরিসংখ্যান,
                দৈনিক লক্ষ্য, অ্যাডমিন নোট ও অ্যাকাউন্ট স্ট্যাটাস নিয়ন্ত্রণ করুন।
              </p>
            </div>
          ) : (
            <>
              {/* Inspector Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {selectedUser.photoUrl ? (
                    <img
                      src={selectedUser.photoUrl}
                      alt={selectedUser.displayName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-white/90 dark:border-white/20 shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6D4ACF] to-[#8B5CF6] text-white font-bold text-base flex items-center justify-center shrink-0">
                      {selectedUser.displayName.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-[#1D1336] dark:text-[#F4F0FF] truncate">
                      {selectedUser.displayName}
                    </h3>
                    <div className="text-xs text-[#554578] dark:text-[#B6ABD6] truncate">{selectedUser.email}</div>
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-[#554578] dark:text-[#A598C9]">
                        যোগদান: {formatDateBn(selectedUser.createdAtMs)} · আপডেট: {formatDateBn(selectedUser.updatedAtMs)}
                      </span>
                      {(() => {
                        const badge = getAccessBadgeInfo(selectedUser, defaultTrialDays, defaultProDays);
                        return (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border font-mono-tabular ${badge.className}`}>
                            {badge.label}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Student Activity Card */}
              <div className="bio-subpanel rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                    <Activity className="w-3.5 h-3.5" />
                    লাইভ অনুশীলন ও পরীক্ষার পরিসংখ্যান
                  </span>
                  {activityLoading && (
                    <span className="text-[11px] text-[#554578] dark:text-[#B6ABD6]">লোড হচ্ছে...</span>
                  )}
                </div>

                {activityError ? (
                  <p className="text-xs text-amber-800 dark:text-amber-300">{activityError}</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="bg-white/65 dark:bg-white/8 rounded-lg p-2.5 border border-white/80 dark:border-white/12">
                        <div className="text-[10px] text-[#554578] dark:text-[#A598C9]">মোট প্রশ্ন</div>
                        <div className="text-base font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                          {toBnDigits(activityTotals.attempted)}
                        </div>
                      </div>
                      <div className="bg-white/65 dark:bg-white/8 rounded-lg p-2.5 border border-white/80 dark:border-white/12">
                        <div className="text-[10px] text-[#554578] dark:text-[#A598C9]">সঠিকতা</div>
                        <div className="text-base font-bold font-mono-tabular text-emerald-700 dark:text-emerald-300">
                          {toBnDigits(activityTotals.accuracy)}%
                        </div>
                      </div>
                      <div className="bg-white/65 dark:bg-white/8 rounded-lg p-2.5 border border-white/80 dark:border-white/12">
                        <div className="text-[10px] text-[#554578] dark:text-[#A598C9]">সম্পন্ন টেস্ট</div>
                        <div className="text-base font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD]">
                          {toBnDigits(activityTotals.testCount)}
                        </div>
                      </div>
                      <div className="bg-white/65 dark:bg-white/8 rounded-lg p-2.5 border border-white/80 dark:border-white/12">
                        <div className="text-[10px] text-[#554578] dark:text-[#A598C9]">অধ্যয়ন সময়</div>
                        <div className="text-base font-bold font-mono-tabular text-[#1D1336] dark:text-[#F4F0FF]">
                          {toBnDigits(activityTotals.totalMinutes)} মি.
                        </div>
                      </div>
                    </div>

                    {activitySummary && activitySummary.topicStats.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-semibold text-[#554578] dark:text-[#B6ABD6] inline-flex items-center gap-1">
                          <BookOpen className="w-3 h-3 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                          সাম্প্রতিক অনুশীলনকৃত অধ্যায়
                        </div>
                        <div className="space-y-1">
                          {[...activitySummary.topicStats]
                            .sort((a, b) => b.attempted - a.attempted)
                            .slice(0, 3)
                            .map((st) => {
                              const ch = getChapterById(st.chapterId);
                              const acc =
                                st.attempted > 0
                                  ? Math.round((st.correct / st.attempted) * 100)
                                  : 0;
                              return (
                                <div
                                  key={st.topicKey}
                                  className="flex items-center justify-between text-[11px] bg-white/55 dark:bg-white/8 px-2.5 py-1.5 rounded-lg"
                                >
                                  <span className="truncate text-[#1D1336] dark:text-[#F4F0FF] font-medium pr-2">
                                    {ch ? `${ch.chapterNumberBn}: ${ch.nameBn}` : st.chapterId}
                                  </span>
                                  <span className="font-mono-tabular text-[#554578] dark:text-[#B6ABD6] shrink-0">
                                    {toBnDigits(st.attempted)} প্রশ্ন ({toBnDigits(acc)}%)
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    )}

                    {activitySummary && activitySummary.testAttempts.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <div className="text-[11px] font-semibold text-[#554578] dark:text-[#B6ABD6] inline-flex items-center gap-1">
                          <Award className="w-3 h-3 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                          সর্বশেষ মডেল টেস্ট ফলাফল
                        </div>
                        <div className="space-y-1">
                          {activitySummary.testAttempts.slice(0, 2).map((t) => (
                            <div
                              key={t.id}
                              className="flex items-center justify-between text-[11px] bg-white/55 dark:bg-white/8 px-2.5 py-1.5 rounded-lg"
                            >
                              <span className="truncate text-[#1D1336] dark:text-[#F4F0FF] font-medium pr-2">
                                {t.testTitle}
                              </span>
                              <span className="font-mono-tabular font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0">
                                {toBnDigits(t.netScore)} / {toBnDigits(t.maxScore)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Inline Governance & Study Profile Form */}
              <form onSubmit={handleSaveSelectedUser} className="space-y-3.5">
                <div className="text-xs font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  প্রোফাইল ও অ্যাকাউন্ট নিয়ন্ত্রণ সম্পাদনা
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    প্রদর্শিত নাম
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    maxLength={120}
                    required
                    className="glass-input w-full px-3 py-2 text-xs sm:text-sm rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      লক্ষ্য পরীক্ষা
                    </label>
                    <select
                      value={editExam}
                      onChange={(e) => setEditExam(e.target.value as TargetExam)}
                      className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    >
                      <option value="medical">মেডিকেল (MBBS)</option>
                      <option value="dental">ডেন্টাল (BDS)</option>
                      <option value="hsc_science">HSC বিজ্ঞান</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      শ্রেণি/স্তর
                    </label>
                    <select
                      value={editClass}
                      onChange={(e) => setEditClass(e.target.value as HscLevel)}
                      className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    >
                      <option value="11">একাদশ</option>
                      <option value="12">দ্বাদশ</option>
                      <option value="admission">অ্যাডমিশন</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      কলেজ / প্রতিষ্ঠান
                    </label>
                    <input
                      type="text"
                      value={editCollege}
                      onChange={(e) => setEditCollege(e.target.value)}
                      maxLength={150}
                      placeholder="যেমন: ঢাকা কলেজ"
                      className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      দৈনিক লক্ষ্য
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={200}
                      value={editDailyGoal}
                      onChange={(e) => setEditDailyGoal(Number(e.target.value))}
                      className="glass-input w-full px-3 py-2 text-xs font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    অ্যাকাউন্ট স্ট্যাটাস
                  </label>
                  <div className="glass-segment-track grid grid-cols-2 gap-1 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setEditStatus('active')}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        editStatus === 'active' ? 'glass-segment-active text-emerald-700 dark:text-emerald-300' : 'text-[#554578] dark:text-[#B6ABD6]'
                      }`}
                    >
                      সক্রিয় (Active)
                    </button>
                    <button
                      type="button"
                      disabled={isPrimarySuperAdminUser(selectedUser) || isSelfUser(selectedUser)}
                      onClick={() => setEditStatus('suspended')}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-all disabled:opacity-40 ${
                        editStatus === 'suspended' ? 'glass-segment-active text-rose-700 dark:text-rose-300' : 'text-[#554578] dark:text-[#B6ABD6]'
                      }`}
                    >
                      স্থগিত (Suspended)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                      অ্যাক্সেস প্ল্যান স্তর
                    </label>
                    <select
                      value={editAccessTier}
                      onChange={(e) => {
                        const nextTier = e.target.value as AccessTier;
                        setEditAccessTier(nextTier);
                        if (nextTier === 'enrolled_pro') setEditAccessDays(defaultProDays);
                        else if (nextTier === 'free_trial') setEditAccessDays(defaultTrialDays);
                      }}
                      className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF]"
                    >
                      <option value="free_trial">ফ্রি ট্রায়াল</option>
                      <option value="enrolled_pro">১ বছর প্রো (৫০০৳)</option>
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
                      disabled={editAccessTier === 'lifetime_vip' || editAccessTier === 'restricted'}
                      value={editAccessDays}
                      onChange={(e) => setEditAccessDays(Number(e.target.value))}
                      className="glass-input w-full px-3 py-2 text-xs font-mono-tabular rounded-xl text-[#1D1336] dark:text-[#F4F0FF] disabled:opacity-45"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#554578] dark:text-[#B6ABD6] mb-1">
                    সুপার এডমিন নোট / কারণ (সর্বোচ্চ ৩০০ অক্ষর)
                  </label>
                  <textarea
                    rows={2}
                    maxLength={300}
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="অ্যাকাউন্ট স্থগিত বা পর্যালোচনার কারণ লিখুন (স্থগিত ইউজারকে এটি দেখানো হবে)..."
                    className="glass-input w-full px-3 py-2 text-xs rounded-xl text-[#1D1336] dark:text-[#F4F0FF] resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={savingUid === selectedUser.uid}
                    className="glass-btn-primary px-4 py-2 text-xs font-semibold rounded-xl disabled:opacity-50"
                  >
                    {savingUid === selectedUser.uid ? 'সংরক্ষণ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
                  </button>

                  {isBootstrappedAdmin &&
                    !isPrimarySuperAdminUser(selectedUser) &&
                    !isSelfUser(selectedUser) && (
                      confirmDeleteUid === selectedUser.uid ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={savingUid === selectedUser.uid}
                            onClick={() => void handleDeleteSelectedUser()}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
                          >
                            নিশ্চিত মুছুন
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteUid(null)}
                            className="px-2.5 py-1.5 text-xs text-[#554578] dark:text-[#B6ABD6] hover:underline"
                          >
                            না
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteUid(selectedUser.uid)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-50/75 dark:hover:bg-rose-950/50 rounded-xl"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          প্রোফাইল মুছুন
                        </button>
                      )
                    )}
                </div>
              </form>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};
