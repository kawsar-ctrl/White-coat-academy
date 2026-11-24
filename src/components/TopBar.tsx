import React, { useState } from 'react';
import { Crown, LogOut, Menu, Moon, Sun, User as UserIcon, X } from 'lucide-react';
import { User } from 'firebase/auth';
import { AppTab, ResolvedUserAccess } from '../types/learning';
import { ThemeMode } from '../hooks/useTheme';
import { BRAND_NAME, BrandLogo } from './BrandLogo';

interface TopBarProps {
  activeTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
  user: User | null;
  profilePhotoUrl?: string;
  authLoading: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  resolvedAccess?: ResolvedUserAccess;
  onOpenEnrollModal?: () => void;
}

const NAV_ITEMS: { id: AppTab; label: string }[] = [
  { id: 'dashboard', label: 'ড্যাশবোর্ড' },
  { id: 'practice', label: 'প্র্যাকটিস' },
  { id: 'question_bank', label: 'প্রশ্ন ব্যাংক' },
  { id: 'wrong_bank', label: 'ভুলের ভান্ডার' },
  { id: 'mock', label: 'মক টেস্ট' },
  { id: 'medical_model', label: 'মডেল টেস্ট' },
  { id: 'visual', label: 'ভিজ্যুয়াল' },
  { id: 'worksheets', label: 'ওয়ার্কশীট' },
  { id: 'admin', label: 'সুপার এডমিন' },
];

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  user,
  profilePhotoUrl,
  authLoading,
  onSignIn,
  onSignOut,
  theme,
  onToggleTheme,
  resolvedAccess,
  onOpenEnrollModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const resolvedAvatar = (profilePhotoUrl || user?.photoURL || '').trim();
  const isDark = theme === 'dark';

  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  const toBn = (n: number) => String(n).replace(/\d/g, (d) => bnDigits[Number(d)] ?? d);
  const compactPlanLabel = !resolvedAccess
    ? 'প্রো প্ল্যান'
    : resolvedAccess.tier === 'admin'
      ? 'এডমিন'
      : resolvedAccess.tier === 'lifetime_vip'
        ? 'VIP প্রো'
        : resolvedAccess.tier === 'enrolled_pro'
          ? `প্রো · ${toBn(resolvedAccess.daysLeft)} দিন`
          : resolvedAccess.isTrialActive
            ? `ফ্রি · ${toBn(resolvedAccess.daysLeft)} দিন`
            : resolvedAccess.isExpired
              ? 'রিনিউ প্রো'
              : '৫০০৳ প্রো';

  const handleNavClick = (tab: AppTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/68 dark:bg-[#100B20]/80 backdrop-blur-2xl border-b border-white/85 dark:border-white/10 shadow-[inset_0_-1px_0_rgba(109,74,207,0.12),0_12px_32px_-14px_rgba(31,18,68,0.18)] dark:shadow-[inset_0_-1px_0_rgba(167,139,250,0.14),0_12px_32px_-14px_rgba(0,0,0,0.65)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 lg:gap-5">
        {/* Zone 1: Single-line Brand Logo & Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('dashboard')}
          className="inline-flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-[#1D1336] dark:text-[#F4F0FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#6D4ACF] dark:focus-visible:outline-[#A78BFA] rounded-lg"
        >
          <BrandLogo size="md" />
          <span>{BRAND_NAME}</span>
        </button>

        {/* Zone 2: Concise single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4" aria-label="প্রধান নেভিগেশন">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-xs xl:text-[13px] font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#6D4ACF] dark:focus-visible:outline-[#A78BFA] ${
                  isActive
                    ? 'text-[#6D4ACF] dark:text-[#C4B5FD] font-semibold'
                    : 'text-[#554578] dark:text-[#B5A9D6] hover:text-[#1D1336] dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-[#6D4ACF] via-[#8B5CF6] to-[#6D4ACF] dark:from-[#8B5CF6] dark:via-[#C4B5FD] dark:to-[#8B5CF6] rounded-full shadow-[0_2px_8px_rgba(109,74,207,0.5)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Plan Status + Theme Toggle + Primary Action */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenEnrollModal && resolvedAccess && (
            <button
              type="button"
              onClick={onOpenEnrollModal}
              title={resolvedAccess.labelBn}
              className={`hidden md:inline-flex items-center gap-1.5 h-9 px-2.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all ${
                resolvedAccess.hasFullAccess
                  ? 'glass-btn-secondary text-emerald-700 dark:text-emerald-300'
                  : 'glass-btn-secondary text-[#6D4ACF] dark:text-[#C4B5FD]'
              }`}
            >
              <Crown className="w-3.5 h-3.5 shrink-0" />
              <span className="font-mono-tabular">{compactPlanLabel}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
            title={isDark ? 'লাইট মোড' : 'ডার্ক মোড'}
            className="inline-flex items-center justify-center gap-1.5 h-9 px-2.5 sm:px-3 text-xs font-medium text-[#1D1336] dark:text-[#EDE8FF] glass-btn-secondary rounded-xl whitespace-nowrap shrink-0"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="hidden xl:inline">লাইট</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#6D4ACF] shrink-0" />
                <span className="hidden xl:inline">ডার্ক</span>
              </>
            )}
          </button>

          {user ? (
            <button
              type="button"
              onClick={onSignOut}
              title="সাইন আউট করুন"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#1D1336] dark:text-[#EDE8FF] glass-btn-secondary rounded-xl whitespace-nowrap shrink-0"
            >
              {resolvedAvatar && !avatarFailed ? (
                <img
                  src={resolvedAvatar}
                  alt={user.displayName || 'শিক্ষার্থী'}
                  referrerPolicy="no-referrer"
                  onError={() => setAvatarFailed(true)}
                  className="w-6 h-6 rounded-full object-cover border border-white dark:border-white/25 shadow-sm shrink-0"
                />
              ) : (
                <UserIcon className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              )}
              <span className="max-w-[130px] truncate">{user.displayName || 'শিক্ষার্থী'}</span>
              <LogOut className="w-3.5 h-3.5 text-[#554578] dark:text-[#B5A9D6]" />
            </button>
          ) : (
            <button
              type="button"
              disabled={authLoading}
              onClick={onSignIn}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold glass-btn-primary disabled:opacity-60 rounded-xl whitespace-nowrap shrink-0"
            >
              {authLoading ? 'যুক্ত হচ্ছে...' : 'গুগল সাইন-ইন'}
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl glass-btn-secondary text-[#1D1336] dark:text-[#EDE8FF]"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/80 dark:border-white/10 bg-white/85 dark:bg-[#120D24]/95 backdrop-blur-2xl px-4 py-3 space-y-1 shadow-xl">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'glass-segment-active text-[#6D4ACF] dark:text-white'
                    : 'text-[#554578] dark:text-[#B5A9D6] hover:bg-white/70 dark:hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          {onOpenEnrollModal && resolvedAccess && (
            <button
              type="button"
              onClick={() => {
                onOpenEnrollModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] bg-[#6D4ACF]/8 dark:bg-violet-500/15 flex items-center justify-between"
            >
              <span className="inline-flex items-center gap-2">
                <Crown className="w-4 h-4" />
                {resolvedAccess.labelBn}
              </span>
              <span className="text-xs underline">প্ল্যান</span>
            </button>
          )}
          {user && (
            <button
              type="button"
              onClick={() => {
                onSignOut();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-700 dark:text-rose-300 hover:bg-rose-50/80 dark:hover:bg-rose-950/50 flex items-center justify-between"
            >
              <span>সাইন আউট ({user.displayName || 'শিক্ষার্থী'})</span>
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </header>
  );
};
