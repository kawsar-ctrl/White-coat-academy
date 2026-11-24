import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  Crown,
  ExternalLink,
  Layers,
  Lock,
  PlayCircle,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { SUBJECTS, getChapterById, getSubjectById } from '../data/curriculum';
import { VISUAL_LESSONS } from '../data/visualLessons';
import { parseSafeVideoEmbed } from '../services/adminContentStore';
import {
  ChapterInfo,
  CustomInfographic,
  CustomVideo,
  ResolvedUserAccess,
  SubjectId,
} from '../types/learning';
import {
  AnimatedVideoLecturePlayer,
  InteractiveDiagramStage,
} from './InteractiveDiagrams';

interface VisualLearningViewProps {
  initialLessonId?: string;
  customInfographics?: CustomInfographic[];
  customVideos?: CustomVideo[];
  resolvedAccess?: ResolvedUserAccess;
  onOpenEnrollModal?: () => void;
  onPracticeChapter: (chapter: ChapterInfo) => void;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

export const VisualLearningView: React.FC<VisualLearningViewProps> = ({
  initialLessonId,
  customInfographics = [],
  customVideos = [],
  resolvedAccess,
  onOpenEnrollModal,
  onPracticeChapter,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [stageTab, setStageTab] = useState<'infographic' | 'video'>('infographic');

  const [activeLessonId, setActiveLessonId] = useState<string>(
    initialLessonId || VISUAL_LESSONS[0].id
  );
  const [activeCustomInfographicId, setActiveCustomInfographicId] = useState<string | null>(null);
  const [activeCustomVideoId, setActiveCustomVideoId] = useState<string | null>(null);

  // Custom Infographic interactive node state
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(0);
  const [imageErrorId, setImageErrorId] = useState<string | null>(null);

  // Custom Video Smartboard + TTS state
  const [activeBoardPointIdx, setActiveBoardPointIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (initialLessonId) {
      setActiveLessonId(initialLessonId);
      setActiveCustomInfographicId(null);
      setActiveCustomVideoId(null);
    }
  }, [initialLessonId]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeCustomVideoId, stageTab]);

  const filteredLessons = useMemo(() => {
    if (selectedSubject === 'all') return VISUAL_LESSONS;
    return VISUAL_LESSONS.filter((l) => l.subjectId === selectedSubject);
  }, [selectedSubject]);

  const filteredCustomInfographics = useMemo(() => {
    if (selectedSubject === 'all') return customInfographics;
    return customInfographics.filter((item) => item.subjectId === selectedSubject);
  }, [customInfographics, selectedSubject]);

  const filteredCustomVideos = useMemo(() => {
    if (selectedSubject === 'all') return customVideos;
    return customVideos.filter((item) => item.subjectId === selectedSubject);
  }, [customVideos, selectedSubject]);

  useEffect(() => {
    if (
      activeCustomInfographicId &&
      !filteredCustomInfographics.some((i) => i.id === activeCustomInfographicId)
    ) {
      setActiveCustomInfographicId(null);
    }
  }, [filteredCustomInfographics, activeCustomInfographicId]);

  useEffect(() => {
    if (activeCustomVideoId && !filteredCustomVideos.some((v) => v.id === activeCustomVideoId)) {
      setActiveCustomVideoId(null);
    }
  }, [filteredCustomVideos, activeCustomVideoId]);

  const activeLesson = useMemo(
    () => VISUAL_LESSONS.find((l) => l.id === activeLessonId) || VISUAL_LESSONS[0],
    [activeLessonId]
  );

  const activeCustomInfographic = useMemo(
    () => filteredCustomInfographics.find((i) => i.id === activeCustomInfographicId) || null,
    [filteredCustomInfographics, activeCustomInfographicId]
  );

  const activeCustomVideo = useMemo(
    () => filteredCustomVideos.find((v) => v.id === activeCustomVideoId) || null,
    [filteredCustomVideos, activeCustomVideoId]
  );

  const handleToggleSpeech = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'bn-BD';
    utter.rate = 0.96;
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utter);
  };

  const currentChapter = useMemo(() => {
    if (stageTab === 'infographic' && activeCustomInfographic) {
      return getChapterById(activeCustomInfographic.chapterId);
    }
    if (stageTab === 'video' && activeCustomVideo) {
      return getChapterById(activeCustomVideo.chapterId);
    }
    return getChapterById(activeLesson.chapterId);
  }, [stageTab, activeCustomInfographic, activeCustomVideo, activeLesson]);

  const totalVisualCount =
    VISUAL_LESSONS.length + customInfographics.length + customVideos.length;

  const isCustomViewActive =
    (stageTab === 'infographic' && Boolean(activeCustomInfographic)) ||
    (stageTab === 'video' && Boolean(activeCustomVideo));

  const freeLessonQuota =
    resolvedAccess && !resolvedAccess.hasFullAccess
      ? resolvedAccess.visualLessonLimit
      : null;

  const freeBuiltInIds = useMemo(() => {
    if (freeLessonQuota === null) return null;
    return new Set(VISUAL_LESSONS.slice(0, freeLessonQuota).map((l) => l.id));
  }, [freeLessonQuota]);

  const isActiveBuiltInLocked = Boolean(
    !isCustomViewActive && freeBuiltInIds && !freeBuiltInIds.has(activeLesson.id)
  );

  return (
    <div className="space-y-6">
      {/* Header, Mode Switcher & Subject Filter */}
      <div className="bio-card rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
              ইন্টারঅ্যাক্টিভ ইনফোগ্রাফ ও ভিডিও লেকচার হাব
            </h1>
            <p className="text-xs sm:text-sm text-[#5A4B7A] dark:text-[#B6ABD6] mt-1">
              যে টপিকগুলো বুঝতে কঠিন মনে হয় সেগুলোর ভিজ্যুয়াল ডায়াগ্রাম, সিমুলেশন ও অ্যানিমেটেড স্মার্টবোর্ড লেকচার দেখুন।
            </p>
          </div>

          <div className="glass-segment-track flex flex-wrap items-center gap-1 p-1 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => setStageTab('infographic')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                stageTab === 'infographic'
                  ? 'glass-segment-active'
                  : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              ইন্টারঅ্যাক্টিভ ইনফোগ্রাফ ({toBnDigits(VISUAL_LESSONS.length + customInfographics.length)})
            </button>
            <button
              type="button"
              onClick={() => setStageTab('video')}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                stageTab === 'video'
                  ? 'glass-segment-active'
                  : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5 text-[#6D4ACF] dark:text-[#C4B5FD]" />
              ভিডিও লেকচার ({toBnDigits(VISUAL_LESSONS.length + customVideos.length)})
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedSubject('all')}
            className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap ${
              selectedSubject === 'all'
                ? 'glass-btn-primary'
                : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
            }`}
          >
            সকল টপিক ({toBnDigits(totalVisualCount)})
          </button>
          {SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              type="button"
              onClick={() => setSelectedSubject(sub.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap ${
                selectedSubject === sub.id
                  ? 'glass-btn-primary'
                  : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
              }`}
            >
              {sub.nameBn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Zone Workspace */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <aside className="lg:col-span-4 bio-card rounded-2xl p-4 space-y-3 max-h-[740px] overflow-y-auto">
          {stageTab === 'infographic' && filteredCustomInfographics.length > 0 && (
            <div className="space-y-2 pb-2 border-b border-white/75 dark:border-white/10">
              <div className="px-2 py-1 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                সংযোজিত টপিক ইনফোগ্রাফ ({toBnDigits(filteredCustomInfographics.length)}টি)
              </div>
              {filteredCustomInfographics.map((inf) => {
                const isSelected = activeCustomInfographic?.id === inf.id;
                const sub = getSubjectById(inf.subjectId);
                return (
                  <button
                    key={inf.id}
                    type="button"
                    onClick={() => {
                      setActiveCustomInfographicId(inf.id);
                      setSelectedNodeIdx(0);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-[#1D1336] dark:text-[#F4F0FF] ${
                      isSelected ? 'glass-option-selected' : 'glass-option'
                    }`}
                  >
                    <div className="text-[11px] font-medium text-[#6D4ACF] dark:text-[#C4B5FD] truncate">
                      {sub?.nameBn} · {inf.topicName}
                    </div>
                    <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] mt-0.5 leading-snug">
                      {inf.titleBn}
                    </div>
                    {inf.subtitleBn && (
                      <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] mt-1 truncate">{inf.subtitleBn}</div>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {stageTab === 'video' && filteredCustomVideos.length > 0 && (
            <div className="space-y-2 pb-2 border-b border-white/75 dark:border-white/10">
              <div className="px-2 py-1 text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                সংযোজিত ভিডিও লেকচার ({toBnDigits(filteredCustomVideos.length)}টি)
              </div>
              {filteredCustomVideos.map((vid) => {
                const isSelected = activeCustomVideo?.id === vid.id;
                const sub = getSubjectById(vid.subjectId);
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => {
                      setActiveCustomVideoId(vid.id);
                      setActiveBoardPointIdx(0);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-[#1D1336] dark:text-[#F4F0FF] ${
                      isSelected ? 'glass-option-selected' : 'glass-option'
                    }`}
                  >
                    <div className="text-[11px] font-medium text-[#6D4ACF] dark:text-[#C4B5FD] truncate">
                      {sub?.nameBn} · {toBnDigits(vid.durationMin)} মিনিট · {vid.topicName}
                    </div>
                    <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] mt-0.5 leading-snug">
                      {vid.titleBn}
                    </div>
                    <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] mt-1 truncate">{vid.instructorBn}</div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="px-2 py-1 text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6]">
            মূল সিলেবাস {stageTab === 'infographic' ? 'ইনফোগ্রাফ' : 'ভিডিও লেকচার'} (
            {toBnDigits(filteredLessons.length)}টি)
          </div>
          {filteredLessons.map((lesson) => {
            const isSelected = !isCustomViewActive && lesson.id === activeLesson.id;
            const isLocked = Boolean(freeBuiltInIds && !freeBuiltInIds.has(lesson.id));
            const sub = getSubjectById(lesson.subjectId);
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  setActiveCustomInfographicId(null);
                  setActiveCustomVideoId(null);
                }}
                className={`w-full text-left p-3.5 rounded-xl text-[#1D1336] dark:text-[#F4F0FF] ${
                  isSelected ? 'glass-option-selected' : 'glass-option'
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-[#6D4ACF] dark:text-[#C4B5FD]">
                  <span>
                    {sub?.nameBn} · {toBnDigits(lesson.durationMin)} মিনিট
                  </span>
                  {isLocked && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-300">
                      <Lock className="w-3 h-3" />
                      প্রো
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] mt-0.5 leading-snug">
                  {lesson.titleBn}
                </div>
                <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] mt-1 truncate">{lesson.subtitleBn}</div>
              </button>
            );
          })}
        </aside>

        {/* Right Interactive Stage */}
        <div className="lg:col-span-8 space-y-5">
          {/* CUSTOM INFOGRAPHIC VIEWER */}
          {stageTab === 'infographic' && activeCustomInfographic && (
            <div className="space-y-5">
              <div className="bio-card rounded-2xl p-5 sm:p-6 space-y-5">
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                    {getSubjectById(activeCustomInfographic.subjectId)?.nameBn} ·{' '}
                    {getChapterById(activeCustomInfographic.chapterId)?.nameBn || ''} · টপিক:{' '}
                    {activeCustomInfographic.topicName}
                  </div>
                  <h2 className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                    {activeCustomInfographic.titleBn}
                  </h2>
                  {activeCustomInfographic.subtitleBn && (
                    <p className="text-xs font-medium text-[#5A4B7A] dark:text-[#B6ABD6]">
                      {activeCustomInfographic.subtitleBn}
                    </p>
                  )}
                  <p className="text-sm text-[#5A4B7A] dark:text-[#B6ABD6] leading-relaxed">
                    {activeCustomInfographic.summaryBn}
                  </p>
                </div>

                {activeCustomInfographic.imageUrl &&
                  /^https?:\/\//i.test(activeCustomInfographic.imageUrl) &&
                  imageErrorId !== activeCustomInfographic.id && (
                    <div className="rounded-2xl overflow-hidden border border-white/85 dark:border-white/15 bg-white/60 dark:bg-[#191230]/80 shadow-sm">
                      <img
                        src={activeCustomInfographic.imageUrl}
                        alt={activeCustomInfographic.titleBn}
                        referrerPolicy="no-referrer"
                        onError={() => setImageErrorId(activeCustomInfographic.id)}
                        className="w-full max-h-[380px] object-contain mx-auto"
                      />
                    </div>
                  )}

                {activeCustomInfographic.nodes.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-[#5A4B7A] dark:text-[#B6ABD6]">
                      {activeCustomInfographic.layoutStyle === 'process_flow'
                        ? 'ধাপভিত্তিক প্রবাহ ডায়াগ্রাম (যেকোনো ধাপে ক্লিক করুন)'
                        : activeCustomInfographic.layoutStyle === 'comparison_table'
                          ? 'তুলনামূলক ইনফোগ্রাফ কার্ড (বিস্তারিত দেখতে ক্লিক করুন)'
                          : 'ইন্টারঅ্যাক্টিভ কনসেপ্ট ম্যাপ (যেকোনো নোডে ক্লিক করুন)'}
                    </div>

                    <div
                      className={`grid gap-3 ${
                        activeCustomInfographic.layoutStyle === 'comparison_table'
                          ? 'sm:grid-cols-2'
                          : 'sm:grid-cols-2 lg:grid-cols-3'
                      }`}
                    >
                      {activeCustomInfographic.nodes.map((node, idx) => {
                        const isSelected = idx === selectedNodeIdx;
                        return (
                          <button
                            key={`${activeCustomInfographic.id}_node_${idx}`}
                            type="button"
                            onClick={() => setSelectedNodeIdx(idx)}
                            className={`text-left p-4 rounded-2xl transition-all ${
                              isSelected ? 'glass-option-selected' : 'glass-option'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                                {node.labelBn || `ধাপ ${toBnDigits(idx + 1)}`}
                              </span>
                              <span className="font-mono-tabular text-[11px] text-[#7D6BA5] dark:text-[#9E92C4]">
                                ০{toBnDigits(idx + 1)}
                              </span>
                            </div>
                            <div className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF] mt-1 leading-snug">
                              {node.titleBn}
                            </div>
                            <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] mt-1 line-clamp-2">
                              {node.detailBn}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {activeCustomInfographic.nodes[selectedNodeIdx] && (
                      <div className="bio-subpanel rounded-2xl p-5 space-y-2.5">
                        <div className="text-xs font-bold text-[#6D4ACF] dark:text-[#C4B5FD]">
                          {activeCustomInfographic.nodes[selectedNodeIdx].labelBn} · বিস্তারিত বিশ্লেষণ
                        </div>
                        <h3 className="text-base font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                          {activeCustomInfographic.nodes[selectedNodeIdx].titleBn}
                        </h3>
                        <p className="text-sm text-[#1D1336] dark:text-[#E2DAFA] leading-relaxed">
                          {activeCustomInfographic.nodes[selectedNodeIdx].detailBn}
                        </p>
                        {activeCustomInfographic.nodes[selectedNodeIdx].medicalPearlBn && (
                          <div className="p-3 rounded-xl bg-white/80 dark:bg-[#211740]/85 border border-[#D4C5F5] dark:border-violet-400/30 text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF]">
                            <strong className="text-[#6D4ACF] dark:text-[#C4B5FD]">মেডিকেল/বোর্ড টিপস: </strong>
                            {activeCustomInfographic.nodes[selectedNodeIdx].medicalPearlBn}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bio-card glass-card-3d rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <h3 className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                    পরীক্ষার জন্য গুরুত্বপূর্ণ সারসংক্ষেপ
                  </h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#1D1336] dark:text-[#E2DAFA]">
                    {activeCustomInfographic.keyTakeawaysBn.map((tk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono-tabular font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0">
                          ০{toBnDigits(idx + 1)}.
                        </span>
                        <span>{tk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {currentChapter && (
                  <button
                    type="button"
                    onClick={() => onPracticeChapter(currentChapter)}
                    className="glass-btn-primary shrink-0 inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl"
                  >
                    <BookOpen className="w-4 h-4" />
                    অধ্যায় প্র্যাকটিস ({currentChapter.nameBn})
                  </button>
                )}
              </div>
            </div>
          )}

          {/* CUSTOM VIDEO PLAYER VIEWER */}
          {stageTab === 'video' && activeCustomVideo && (() => {
            const embed = parseSafeVideoEmbed(activeCustomVideo.videoUrl);
            return (
              <div className="space-y-5">
                <div className="bio-card rounded-2xl p-5 sm:p-6 space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                        {getSubjectById(activeCustomVideo.subjectId)?.nameBn} ·{' '}
                        {getChapterById(activeCustomVideo.chapterId)?.nameBn || ''} ·{' '}
                        {activeCustomVideo.instructorBn} · {toBnDigits(activeCustomVideo.durationMin)} মিনিট
                      </div>
                      <h2 className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                        {activeCustomVideo.titleBn}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#5A4B7A] dark:text-[#B6ABD6]">
                        টপিক: {activeCustomVideo.topicName}
                      </p>
                    </div>

                    {activeCustomVideo.narrationBn && (
                      <button
                        type="button"
                        onClick={() => handleToggleSpeech(activeCustomVideo.narrationBn)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl shrink-0 ${
                          isSpeaking ? 'glass-btn-primary' : 'glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF]'
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-4 h-4" />
                            ভয়েস থামান
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD]" />
                            বাংলা অডিও শুনুন
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {embed.type === 'youtube' && embed.embedUrl && (
                    <div className="rounded-2xl overflow-hidden border border-white/80 dark:border-white/15 bg-[#0F0B1E] aspect-video shadow-lg">
                      <iframe
                        src={embed.embedUrl}
                        title={activeCustomVideo.titleBn}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {embed.type === 'mp4' && embed.embedUrl && (
                    <div className="rounded-2xl overflow-hidden border border-white/80 dark:border-white/15 bg-[#0F0B1E] aspect-video shadow-lg">
                      <video src={embed.embedUrl} controls className="w-full h-full" />
                    </div>
                  )}

                  {embed.type === 'external' && embed.embedUrl && (
                    <div className="bio-subpanel rounded-xl p-4 flex items-center justify-between gap-3">
                      <div className="text-xs sm:text-sm text-[#1D1336] dark:text-[#F4F0FF]">
                        ভিডিওটি বাহ্যিক সোর্সে সংরক্ষিত রয়েছে — নতুন ট্যাবে চালু করুন।
                      </div>
                      <a
                        href={embed.embedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold glass-btn-primary rounded-xl shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        ভিডিও দেখুন
                      </a>
                    </div>
                  )}

                  <div className="rounded-2xl bg-gradient-to-br from-[#17112B] via-[#1F173B] to-[#120D22] text-white p-5 sm:p-6 space-y-4 border border-white/15 shadow-xl">
                    <div className="flex items-center justify-between gap-2 text-xs text-violet-200">
                      <span className="font-semibold">স্মার্টবোর্ড লেকচার নোট</span>
                      <span className="font-mono-tabular">টপিক: {activeCustomVideo.topicName}</span>
                    </div>

                    {activeCustomVideo.boardSummaryBn && (
                      <p className="text-sm text-white/90 leading-relaxed">
                        {activeCustomVideo.boardSummaryBn}
                      </p>
                    )}

                    {activeCustomVideo.boardPoints.length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                        {activeCustomVideo.boardPoints.map((pt, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveBoardPointIdx(idx)}
                            className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all ${
                              activeBoardPointIdx === idx
                                ? 'bg-violet-500/30 border-violet-300/70 text-white font-semibold'
                                : 'bg-white/6 border-white/12 text-white/80 hover:bg-white/12'
                            }`}
                          >
                            <span className="font-mono-tabular text-violet-300 mr-1.5">
                              ০{toBnDigits(idx + 1)}.
                            </span>
                            {pt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {currentChapter && (
                    <button
                      type="button"
                      onClick={() => onPracticeChapter(currentChapter)}
                      className="glass-btn-primary inline-flex items-center justify-center gap-2 py-2.5 px-5 text-xs font-semibold rounded-xl"
                    >
                      <BookOpen className="w-4 h-4" />
                      এই অধ্যায়ের প্রশ্ন প্র্যাকটিস করুন ({currentChapter.nameBn})
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          {/* BUILT-IN VISUAL LESSONS (INFOGRAPHIC OR VIDEO) */}
          {!isCustomViewActive && (
            <>
              <div className="bio-card rounded-2xl p-5 sm:p-6 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">
                      {getSubjectById(activeLesson.subjectId)?.nameBn} ·{' '}
                      {getChapterById(activeLesson.chapterId)?.nameBn || ''} ·{' '}
                      {activeLesson.instructorBn}
                    </div>
                    <h2 className="text-xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">{activeLesson.titleBn}</h2>
                    <p className="text-sm text-[#5A4B7A] dark:text-[#B6ABD6] leading-relaxed">
                      {activeLesson.overviewBn}
                    </p>
                  </div>
                </div>

                {isActiveBuiltInLocked ? (
                  <div className="bio-subpanel rounded-2xl p-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50/90 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-400/35 flex items-center justify-center mx-auto">
                      <Lock className="w-6 h-6 text-amber-600 dark:text-amber-300" />
                    </div>
                    <div className="space-y-1.5 max-w-md mx-auto">
                      <h3 className="text-base sm:text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                        এই ভিজ্যুয়াল লেকচারটি প্রো সদস্যদের জন্য সংরক্ষিত
                      </h3>
                      <p className="text-xs sm:text-sm text-[#5A4B7A] dark:text-[#B6ABD6]">
                        ফ্রি ট্রায়াল প্ল্যানে প্রথম {toBnDigits(freeLessonQuota ?? 3)}টি ভিজ্যুয়াল লেকচার সম্পূর্ণ উন্মুক্ত। সব অধ্যায়ের ইনফোগ্রাফ ও ভিডিও লেকচার আনলক করতে প্রো এনরোল করুন।
                      </p>
                    </div>
                    {onOpenEnrollModal && (
                      <button
                        type="button"
                        onClick={onOpenEnrollModal}
                        className="glass-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
                      >
                        <Crown className="w-4 h-4" />
                        ১ বছরের প্রো ফুল এক্সেস নিন
                      </button>
                    )}
                  </div>
                ) : stageTab === 'infographic' ? (
                  <InteractiveDiagramStage lesson={activeLesson} />
                ) : (
                  <AnimatedVideoLecturePlayer lesson={activeLesson} />
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bio-card glass-card-3d rounded-2xl p-5 space-y-3">
                  <h3 className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                    মেডিকেল ও HSC পরীক্ষার হাই-ইল্ড তথ্য
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#1D1336] dark:text-[#E2DAFA] leading-relaxed">
                    {activeLesson.examPearlsBn.map((pearl, i) => (
                      <li key={pearl} className="flex items-start gap-2">
                        <span className="font-mono-tabular font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0">
                          ০{toBnDigits(i + 1)}.
                        </span>
                        <span>{pearl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bio-card glass-card-3d rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF]">মনে রাখার শর্টকাট ও নেমোনিক</h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#1D1336] dark:text-[#E2DAFA] leading-relaxed">
                      {activeLesson.mnemonicsBn.map((mn) => (
                        <li key={mn} className="p-3 bio-subpanel rounded-xl">
                          {mn}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {currentChapter && (
                    <button
                      type="button"
                      onClick={() => onPracticeChapter(currentChapter)}
                      className="glass-btn-primary w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl"
                    >
                      <BookOpen className="w-4 h-4" />
                      এই অধ্যায়ের প্রশ্ন প্র্যাকটিস করুন ({currentChapter.nameBn})
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
