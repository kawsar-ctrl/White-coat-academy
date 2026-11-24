import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { InfographicHotspot, VisualLesson } from '../types/learning';

interface InteractiveDiagramStageProps {
  lesson: VisualLesson;
}

export const InteractiveDiagramStage: React.FC<InteractiveDiagramStageProps> = ({ lesson }) => {
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(
    lesson.hotspots[0]?.id || ''
  );

  // Specialized simulation states
  const [cardiacPhase, setCardiacPhase] = useState<0 | 1 | 2>(0);
  const [bloodPh, setBloodPh] = useState<number>(7.4);
  const [bloodPco2, setBloodPco2] = useState<number>(40);
  const [mitosisStep, setMitosisStep] = useState<0 | 1 | 2 | 3 | 4>(1);
  const [hybridMode, setHybridMode] = useState<'sp3' | 'sp2' | 'sp'>('sp3');
  const [nephronStage, setNephronStage] = useState<'filtration' | 'reabsorption' | 'secretion'>(
    'filtration'
  );
  const [carnotT1, setCarnotT1] = useState<number>(400);
  const [carnotT2, setCarnotT2] = useState<number>(300);

  useEffect(() => {
    setSelectedHotspotId(lesson.hotspots[0]?.id || '');
  }, [lesson.id, lesson.hotspots]);

  const activeHotspot: InfographicHotspot | undefined = useMemo(
    () => lesson.hotspots.find((h) => h.id === selectedHotspotId) || lesson.hotspots[0],
    [lesson.hotspots, selectedHotspotId]
  );

  // Bohr Effect calculation
  const bohrMetrics = useMemo(() => {
    const p50 = Math.max(18, Math.min(42, 26.8 + (7.4 - bloodPh) * 28 + (bloodPco2 - 40) * 0.16));
    const shiftStatus =
      p50 > 28.5
        ? 'ডানদিকে সরেছে (টিস্যুতে বেশি O₂ মুক্ত হচ্ছে)'
        : p50 < 25.0
          ? 'বামদিকে সরেছে (হিমোগ্লোবিনের O₂ আসক্তি বেশি)'
          : 'স্বাভাবিক শারীরবৃত্তীয় অবস্থা';
    const points: string[] = [];
    for (let po2 = 0; po2 <= 100; po2 += 5) {
      const n = 2.7;
      const sat = (Math.pow(po2, n) / (Math.pow(po2, n) + Math.pow(p50, n))) * 100;
      const x = 56 + (po2 / 100) * 320;
      const y = 216 - (sat / 100) * 176;
      points.push(`${po2 === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    const basePoints: string[] = [];
    for (let po2 = 0; po2 <= 100; po2 += 5) {
      const n = 2.7;
      const sat = (Math.pow(po2, n) / (Math.pow(po2, n) + Math.pow(26.8, n))) * 100;
      const x = 56 + (po2 / 100) * 320;
      const y = 216 - (sat / 100) * 176;
      basePoints.push(`${po2 === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return {
      p50: p50.toFixed(1),
      shiftStatus,
      pathD: points.join(' '),
      basePathD: basePoints.join(' '),
    };
  }, [bloodPh, bloodPco2]);

  const carnotEfficiency = useMemo(() => {
    if (carnotT1 <= carnotT2) return '0.0';
    return (((carnotT1 - carnotT2) / carnotT1) * 100).toFixed(1);
  }, [carnotT1, carnotT2]);

  return (
    <div className="space-y-4">
      {/* Interactive Stage Canvas */}
      <div className="bio-subpanel rounded-2xl p-4 sm:p-5">
        {lesson.diagramType === 'heart_cardiac' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-medium text-[#5A4B7A] dark:text-[#B6ABD6]">
                কার্ডিয়াক চক্রের ধাপ নির্বাচন করুন (মোট ০.৮ সেকেন্ড)
              </span>
              <div className="glass-segment-track flex items-center gap-1 p-1 rounded-xl">
                {[
                  { idx: 0 as const, label: 'অলিন্দ সিস্টোল (০.১ সে.)' },
                  { idx: 1 as const, label: 'নিলয় সিস্টোল (০.৩ সে.)' },
                  { idx: 2 as const, label: 'যুগপৎ ডায়াস্টোল (০.৪ সে.)' },
                ].map((phase) => (
                  <button
                    key={phase.idx}
                    type="button"
                    onClick={() => setCardiacPhase(phase.idx)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                      cardiacPhase === phase.idx
                        ? 'glass-segment-active'
                        : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                    }`}
                  >
                    {phase.label}
                  </button>
                ))}
              </div>
            </div>

            <svg viewBox="0 0 460 280" className="w-full h-64 sm:h-72 bg-white/85 dark:bg-[#16102A]/95 backdrop-blur-md border border-white/90 dark:border-white/15 rounded-xl shadow-[inset_0_1px_4px_rgba(29,19,54,0.06),0_8px_20px_-10px_rgba(34,18,74,0.12)]">
              {/* Vena Cava & Aorta trunks */}
              <path d="M135 20 L135 88" stroke="#1D4ED8" strokeWidth="18" strokeLinecap="round" opacity="0.2" />
              <path d="M275 20 L275 95" stroke="#DC2626" strokeWidth="18" strokeLinecap="round" opacity="0.2" />

              {/* Right Atrium */}
              <g
                onClick={() => setSelectedHotspotId('ra')}
                className="cursor-pointer"
              >
                <rect
                  x="95"
                  y="70"
                  width="115"
                  height="72"
                  rx="20"
                  fill={cardiacPhase === 0 ? '#DBEAFE' : '#EFF6FF'}
                  stroke={selectedHotspotId === 'ra' ? '#5A39B8' : '#3B82F6'}
                  strokeWidth={selectedHotspotId === 'ra' ? '3' : '2'}
                />
                <text x="152" y="102" textAnchor="middle" className="text-[12px] font-semibold fill-slate-900">
                  ডান অলিন্দ
                </text>
                <text x="152" y="120" textAnchor="middle" className="text-[10px] fill-blue-700">
                  CO₂ সমৃদ্ধ রক্ত · SA নোড
                </text>
              </g>

              {/* Left Atrium */}
              <g
                onClick={() => setSelectedHotspotId('la')}
                className="cursor-pointer"
              >
                <rect
                  x="250"
                  y="70"
                  width="115"
                  height="72"
                  rx="20"
                  fill={cardiacPhase === 0 ? '#FEE2E2' : '#FEF2F2'}
                  stroke={selectedHotspotId === 'la' ? '#5A39B8' : '#EF4444'}
                  strokeWidth={selectedHotspotId === 'la' ? '3' : '2'}
                />
                <text x="307" y="102" textAnchor="middle" className="text-[12px] font-semibold fill-slate-900">
                  বাম অলিন্দ
                </text>
                <text x="307" y="120" textAnchor="middle" className="text-[10px] fill-red-700">
                  O₂ সমৃদ্ধ রক্ত (ফুসফুস)
                </text>
              </g>

              {/* Valves */}
              <rect x="132" y="140" width="42" height="10" rx="4" className="fill-[#0F172A] dark:fill-[#C4B5FD]" />
              <text x="82" y="150" className="text-[9px] fill-slate-600 dark:fill-[#B6ABD6]">ট্রাইকাসপিড</text>
              <rect x="286" y="140" width="42" height="10" rx="4" className="fill-[#0F172A] dark:fill-[#C4B5FD]" />
              <text x="335" y="150" className="text-[9px] fill-slate-600 dark:fill-[#B6ABD6]">বাইকাসপিড</text>

              {/* Right Ventricle */}
              <g
                onClick={() => setSelectedHotspotId('rv')}
                className="cursor-pointer"
              >
                <path
                  d="M98 156 L210 156 L210 245 Q150 255 112 225 Z"
                  fill={cardiacPhase === 1 ? '#BFDBFE' : '#EFF6FF'}
                  stroke={selectedHotspotId === 'rv' ? '#5A39B8' : '#2563EB'}
                  strokeWidth={selectedHotspotId === 'rv' ? '3' : '2'}
                />
                <text x="155" y="198" textAnchor="middle" className="text-[12px] font-semibold fill-slate-900">
                  ডান নিলয়
                </text>
                <text x="155" y="216" textAnchor="middle" className="text-[10px] fill-blue-800">
                  পালমোনারি ধমনিতে পাম্প
                </text>
              </g>

              {/* Left Ventricle */}
              <g
                onClick={() => setSelectedHotspotId('lv')}
                className="cursor-pointer"
              >
                <path
                  d="M250 156 L362 156 L348 228 Q305 260 250 245 Z"
                  fill={cardiacPhase === 1 ? '#FECACA' : '#FEF2F2'}
                  stroke={selectedHotspotId === 'lv' ? '#5A39B8' : '#DC2626'}
                  strokeWidth={selectedHotspotId === 'lv' ? '4' : '3'}
                />
                <text x="305" y="198" textAnchor="middle" className="text-[12px] font-semibold fill-slate-900">
                  বাম নিলয়
                </text>
                <text x="305" y="216" textAnchor="middle" className="text-[10px] fill-red-800">
                  মহাধমনিতে (সর্বোচ্চ পুরু)
                </text>
              </g>

              {/* Flow Arrows */}
              {cardiacPhase === 0 && (
                <>
                  <path d="M153 128 L153 170" stroke="#1D4ED8" strokeWidth="3" strokeDasharray="4 3" />
                  <path d="M307 128 L307 170" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 3" />
                </>
              )}
              {cardiacPhase === 1 && (
                <>
                  <path d="M180 185 L180 38" stroke="#1D4ED8" strokeWidth="3" strokeDasharray="4 3" />
                  <path d="M275 185 L275 30" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 3" />
                </>
              )}

              <text x="230" y="272" textAnchor="middle" className="text-[11px] font-medium fill-slate-600 dark:fill-[#B6ABD6]">
                {cardiacPhase === 0
                  ? 'অলিন্দ সিস্টোল (০.১ সে.): উভয় অলিন্দ সংকুচিত হয়ে নিলয়ে রক্ত পাঠায়'
                  : cardiacPhase === 1
                    ? 'নিলয় সিস্টোল (০.৩ সে.): কপাটিকা বন্ধ ("লাব" শব্দ), রক্ত ধমনিতে প্রবেশ করে'
                    : 'যুগপৎ ডায়াস্টোল (০.৪ সে.): চার প্রকোষ্ঠ শিথিল, শিরার রক্তে অলিন্দ পূর্ণ হয়'}
              </text>
            </svg>
          </div>
        )}

        {lesson.diagramType === 'bohr_curve' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 bg-white/75 dark:bg-[#191230]/85 backdrop-blur-md border border-white/88 dark:border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_6px_16px_-6px_rgba(34,18,74,0.1)] dark:shadow-none rounded-xl p-3.5">
              <div>
                <div className="flex justify-between text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] mb-1.5">
                  <span>রক্তের pH মাত্রা</span>
                  <span className="font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD] font-semibold">{bloodPh.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={7.0}
                  max={7.6}
                  step={0.05}
                  value={bloodPh}
                  onChange={(e) => setBloodPh(parseFloat(e.target.value))}
                  className="w-full accent-[#6D4ACF]"
                />
                <div className="flex justify-between text-[11px] text-[#5A4B7A] dark:text-[#B6ABD6] mt-0.5">
                  <span>৭.০ (অম্লীয়/সক্রিয় পেশি)</span>
                  <span>৭.৬ (ক্ষারীয়/ফুসফুস)</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] mb-1.5">
                  <span>রক্তে pCO₂ চাপ</span>
                  <span className="font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD] font-semibold">{bloodPco2} mmHg</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={75}
                  step={5}
                  value={bloodPco2}
                  onChange={(e) => setBloodPco2(parseInt(e.target.value, 10))}
                  className="w-full accent-[#6D4ACF]"
                />
                <div className="flex justify-between text-[11px] text-[#5A4B7A] dark:text-[#B6ABD6] mt-0.5">
                  <span>২০ mmHg</span>
                  <span>৭৫ mmHg</span>
                </div>
              </div>
            </div>

            <svg viewBox="0 0 420 250" className="w-full h-64 bg-white/85 dark:bg-[#16102A]/95 backdrop-blur-md border border-white/90 dark:border-white/15 rounded-xl shadow-[inset_0_1px_4px_rgba(29,19,54,0.06),0_8px_20px_-10px_rgba(34,18,74,0.12)]">
              {/* Grid lines */}
              <line x1="56" y1="40" x2="56" y2="216" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="56" y1="216" x2="386" y2="216" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="56" y1="128" x2="386" y2="128" className="stroke-[#E2E8F0] dark:stroke-white/15" strokeDasharray="4 4" />
              <text x="16" y="132" className="text-[10px] fill-slate-500 dark:fill-[#A598C9] font-mono-tabular">৫০%</text>
              <text x="14" y="46" className="text-[10px] fill-slate-500 dark:fill-[#A598C9] font-mono-tabular">১০০%</text>
              <text x="220" y="238" textAnchor="middle" className="text-[11px] fill-slate-600 dark:fill-[#B6ABD6]">
                অক্সিজেনের আংশিক চাপ pO₂ (mmHg) ➔
              </text>

              {/* Baseline Normal Curve */}
              <path d={bohrMetrics.basePathD} fill="none" className="stroke-[#CBD5E1] dark:stroke-slate-500" strokeWidth="2" strokeDasharray="5 4" />
              {/* Shifted Live Curve */}
              <path d={bohrMetrics.pathD} fill="none" className="stroke-[#5A39B8] dark:stroke-[#A78BFA]" strokeWidth="3" />

              {/* P50 Marker */}
              <circle
                cx={56 + (parseFloat(bohrMetrics.p50) / 100) * 320}
                cy={128}
                r="5"
                fill="#DC2626"
              />
              <text
                x={56 + (parseFloat(bohrMetrics.p50) / 100) * 320 + 8}
                y={124}
                className="text-[11px] font-semibold fill-red-700 dark:fill-rose-300 font-mono-tabular"
              >
                P₅₀ = {bohrMetrics.p50} mmHg
              </text>
            </svg>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs px-3.5 py-2.5 bg-white/75 dark:bg-[#191230]/85 backdrop-blur-md border border-white/88 dark:border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-none rounded-xl">
              <span className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">অবস্থা: {bohrMetrics.shiftStatus}</span>
              <span className="text-[#5A4B7A] dark:text-[#B6ABD6]">ড্যাশ রেখা: স্বাভাবিক (pH 7.4, pCO₂ 40)</span>
            </div>
          </div>
        )}

        {lesson.diagramType === 'nephron' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-[#5A4B7A] dark:text-[#B6ABD6]">ধাপ অনুযায়ী নেফ্রন বিশ্লেষণ</span>
              <div className="glass-segment-track flex items-center gap-1 p-1 rounded-xl">
                {[
                  { id: 'filtration' as const, label: '১. অতিপরিস্রাবণ' },
                  { id: 'reabsorption' as const, label: '২. পুনঃশোষণ' },
                  { id: 'secretion' as const, label: '৩. নালিকাময় ক্ষরণ' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setNephronStage(s.id)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                      nephronStage === s.id
                        ? 'glass-segment-active'
                        : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <svg viewBox="0 0 460 250" className="w-full h-64 bg-white/85 dark:bg-[#16102A]/95 backdrop-blur-md border border-white/90 dark:border-white/15 rounded-xl shadow-[inset_0_1px_4px_rgba(29,19,54,0.06),0_8px_20px_-10px_rgba(34,18,74,0.12)]">
              {/* Bowman's capsule + Glomerulus */}
              <g onClick={() => setSelectedHotspotId('bowman')} className="cursor-pointer">
                <circle
                  cx="90"
                  cy="82"
                  r="34"
                  fill={nephronStage === 'filtration' ? '#FEF3C7' : '#F8FAFC'}
                  stroke={selectedHotspotId === 'bowman' ? '#5A39B8' : '#D97706'}
                  strokeWidth="2.5"
                />
                <circle cx="90" cy="82" r="18" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
                <text x="90" y="132" textAnchor="middle" className="text-[11px] font-semibold fill-slate-800 dark:fill-[#E9E2FF]">
                  গ্লোমেরুলাস ও বোম্যান্স
                </text>
              </g>

              {/* PCT */}
              <g onClick={() => setSelectedHotspotId('pct')} className="cursor-pointer">
                <path
                  d="M124 82 Q155 48 185 82 T235 82"
                  fill="none"
                  stroke={selectedHotspotId === 'pct' || nephronStage === 'reabsorption' ? '#7C3AED' : '#64748B'}
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <text x="180" y="50" textAnchor="middle" className="text-[11px] font-semibold fill-slate-800 dark:fill-[#E9E2FF]">
                  PCT (১০০% গ্লুকোজ পুনঃশোষণ)
                </text>
              </g>

              {/* Loop of Henle */}
              <g onClick={() => setSelectedHotspotId('henle')} className="cursor-pointer">
                <path
                  d="M235 82 L235 202 Q255 224 275 202 L275 82"
                  fill="none"
                  stroke={selectedHotspotId === 'henle' ? '#7C3AED' : '#0284C7'}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <text x="255" y="236" textAnchor="middle" className="text-[11px] font-semibold fill-slate-800 dark:fill-[#E9E2FF]">
                  হেনলির লুপ
                </text>
              </g>

              {/* DCT & Collecting Duct */}
              <g onClick={() => setSelectedHotspotId('cd')} className="cursor-pointer">
                <path
                  d="M275 82 Q310 55 345 82 L365 82"
                  fill="none"
                  stroke={nephronStage === 'secretion' ? '#D97706' : '#64748B'}
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <line
                  x1="370"
                  y1="45"
                  x2="370"
                  y2="220"
                  stroke={selectedHotspotId === 'cd' ? '#7C3AED' : '#64748B'}
                  strokeWidth="18"
                  strokeLinecap="round"
                />
                <text x="370" y="34" textAnchor="middle" className="text-[11px] font-semibold fill-slate-800 dark:fill-[#E9E2FF]">
                  সংগ্রাহী নালিকা (ADH)
                </text>
              </g>
            </svg>
          </div>
        )}

        {lesson.diagramType === 'mitosis_cell' && (
          <div className="space-y-3">
            <div className="glass-segment-track flex flex-wrap items-center gap-1 p-1 rounded-xl w-fit">
              {[
                { idx: 0 as const, label: 'প্রোফেজ' },
                { idx: 1 as const, label: 'মেটাফেজ' },
                { idx: 2 as const, label: 'অ্যানাফেজ' },
                { idx: 3 as const, label: 'টেলোফেজ' },
                { idx: 4 as const, label: 'প্যাকাইটিন ক্রসিং ওভার' },
              ].map((st) => (
                <button
                  key={st.idx}
                  type="button"
                  onClick={() => setMitosisStep(st.idx)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                    mitosisStep === st.idx
                      ? 'glass-segment-active'
                      : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>

            <svg viewBox="0 0 460 240" className="w-full h-60 bg-white/85 dark:bg-[#16102A]/95 backdrop-blur-md border border-white/90 dark:border-white/15 rounded-xl shadow-[inset_0_1px_4px_rgba(29,19,54,0.06),0_8px_20px_-10px_rgba(34,18,74,0.12)]">
              <ellipse cx="230" cy="115" rx="165" ry="92" className="fill-[#F7F5FC] dark:fill-[#221942]" stroke="#6D4ACF" strokeWidth="2.5" />
              {mitosisStep === 0 && (
                <>
                  <circle cx="230" cy="115" r="55" fill="#EFF6FF" stroke="#3B82F6" strokeDasharray="5 4" strokeWidth="2" />
                  <path d="M210 95 Q230 115 215 135 M245 92 Q225 118 248 135" stroke="#0F172A" strokeWidth="3.5" fill="none" />
                  <text x="230" y="226" textAnchor="middle" className="text-[11px] font-medium fill-slate-700 dark:fill-[#D6CEF0]">
                    প্রোফেজ: জলবিয়োজনের ফলে ক্রোমোজোম স্পষ্ট ও মোটা হতে শুরু করে
                  </text>
                </>
              )}
              {mitosisStep === 1 && (
                <>
                  <line x1="95" y1="115" x2="230" y2="85" className="stroke-[#CBD5E1] dark:stroke-white/25" strokeWidth="1.5" />
                  <line x1="95" y1="115" x2="230" y2="145" className="stroke-[#CBD5E1] dark:stroke-white/25" strokeWidth="1.5" />
                  <line x1="365" y1="115" x2="230" y2="85" className="stroke-[#CBD5E1] dark:stroke-white/25" strokeWidth="1.5" />
                  <line x1="365" y1="115" x2="230" y2="145" className="stroke-[#CBD5E1] dark:stroke-white/25" strokeWidth="1.5" />
                  <line x1="230" y1="40" x2="230" y2="190" stroke="#8B5CF6" strokeDasharray="4 4" />
                  <path d="M222 76 L238 94 M238 76 L222 94" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
                  <path d="M222 136 L238 154 M238 136 L222 154" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
                  <text x="230" y="226" textAnchor="middle" className="text-[11px] font-medium fill-slate-700 dark:fill-[#D6CEF0]">
                    মেটাফেজ: বিষুবীয় তলে অবস্থান (মেটাকাইনেসিস) · ক্রোমোজোম সবচেয়ে খাটো ও মোটা
                  </text>
                </>
              )}
              {mitosisStep === 2 && (
                <>
                  <path d="M140 85 L155 95 L140 105" stroke="#DC2626" strokeWidth="4" fill="none" />
                  <path d="M140 125 L155 135 L140 145" stroke="#2563EB" strokeWidth="4" fill="none" />
                  <path d="M320 85 L305 95 L320 105" stroke="#DC2626" strokeWidth="4" fill="none" />
                  <path d="M320 125 L305 135 L320 145" stroke="#2563EB" strokeWidth="4" fill="none" />
                  <text x="230" y="226" textAnchor="middle" className="text-[11px] font-medium fill-slate-700 dark:fill-[#D6CEF0]">
                    অ্যানাফেজ: সেন্ট্রোমিয়ার বিভক্ত · মেরুমুখী চলনে V, L, J, I আকৃতি ধারণ
                  </text>
                </>
              )}
              {mitosisStep === 3 && (
                <>
                  <circle cx="150" cy="115" r="42" fill="#EFF6FF" stroke="#5A39B8" strokeWidth="2" />
                  <circle cx="310" cy="115" r="42" fill="#EFF6FF" stroke="#5A39B8" strokeWidth="2" />
                  <text x="230" y="226" textAnchor="middle" className="text-[11px] font-medium fill-slate-700 dark:fill-[#D6CEF0]">
                    টেলোফেজ: দুটি অপত্য নিউক্লিয়াস ও নিউক্লিয়ার এনভেলপ পুনর্গঠন
                  </text>
                </>
              )}
              {mitosisStep === 4 && (
                <>
                  <path d="M165 65 L230 115 L165 165" stroke="#DC2626" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M295 65 L230 115 L295 165" stroke="#2563EB" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <circle cx="230" cy="115" r="9" fill="#F59E0B" />
                  <text x="230" y="226" textAnchor="middle" className="text-[11px] font-medium fill-slate-700 dark:fill-[#D6CEF0]">
                    প্যাকাইটিন: নন-সিস্টার ক্রোমাটিডের কায়াজমা স্থানে অংশ বিনিময় (ক্রসিং ওভার)
                  </text>
                </>
              )}
            </svg>
          </div>
        )}

        {lesson.diagramType === 'hybridization' && (
          <div className="space-y-3">
            <div className="glass-segment-track flex items-center gap-1 p-1 rounded-xl w-fit">
              {(['sp3', 'sp2', 'sp'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setHybridMode(m)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    hybridMode === m ? 'glass-segment-active' : 'text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {m === 'sp3' ? 'sp³ (CH₄)' : m === 'sp2' ? 'sp² (C₂H₄)' : 'sp (C₂H₂)'}
                </button>
              ))}
            </div>
            <div className="bg-white/85 dark:bg-[#16102A]/95 backdrop-blur-md border border-white/90 dark:border-white/15 rounded-xl shadow-[inset_0_1px_4px_rgba(29,19,54,0.06),0_8px_20px_-10px_rgba(34,18,74,0.12)] dark:shadow-none p-5 grid sm:grid-cols-2 gap-4 items-center">
              <svg viewBox="0 0 240 180" className="w-full h-44">
                <circle cx="120" cy="90" r="18" fill="#6D4ACF" />
                <text x="120" y="95" textAnchor="middle" className="text-[12px] font-bold fill-white">C</text>
                {hybridMode === 'sp3' && (
                  <>
                    <line x1="120" y1="72" x2="120" y2="25" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="2.5" />
                    <line x1="105" y1="102" x2="62" y2="142" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="2.5" />
                    <line x1="135" y1="102" x2="178" y2="142" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="2.5" />
                    <line x1="132" y1="95" x2="185" y2="95" className="stroke-[#5A4B7A] dark:stroke-[#B6ABD6]" strokeWidth="2" strokeDasharray="4 3" />
                    <text x="120" y="170" textAnchor="middle" className="text-[11px] font-semibold fill-[#6D4ACF] dark:fill-[#C4B5FD]">
                      চতুস্তলকীয় · বন্ধন কোণ ১০৯.৫°
                    </text>
                  </>
                )}
                {hybridMode === 'sp2' && (
                  <>
                    <line x1="120" y1="72" x2="120" y2="24" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="2.5" />
                    <line x1="104" y1="98" x2="62" y2="132" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="2.5" />
                    <line x1="136" y1="98" x2="178" y2="132" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="2.5" />
                    <text x="120" y="170" textAnchor="middle" className="text-[11px] font-semibold fill-[#6D4ACF] dark:fill-[#C4B5FD]">
                      ত্রিকোণীয় সমতলীয় · বন্ধন কোণ ১২০°
                    </text>
                  </>
                )}
                {hybridMode === 'sp' && (
                  <>
                    <line x1="40" y1="90" x2="102" y2="90" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="3" />
                    <line x1="138" y1="90" x2="200" y2="90" className="stroke-[#1D1336] dark:stroke-[#E9E2FF]" strokeWidth="3" />
                    <text x="120" y="170" textAnchor="middle" className="text-[11px] font-semibold fill-[#6D4ACF] dark:fill-[#C4B5FD]">
                      সরলরৈখিক · বন্ধন কোণ ১৮০°
                    </text>
                  </>
                )}
              </svg>
              <div className="space-y-2 text-sm text-[#1D1336] dark:text-[#F4F0FF]">
                <div className="font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                  {hybridMode === 'sp3'
                    ? 'sp³ সংকরায়ন (২৫% s, ৭৫% p চরিত্র)'
                    : hybridMode === 'sp2'
                      ? 'sp² সংকরায়ন (৩৩.৩% s, ৬৬.৭% p)'
                      : 'sp সংকরায়ন (৫০% s, ৫০% p)'}
                </div>
                <p className="text-xs leading-relaxed text-[#5A4B7A] dark:text-[#B6ABD6]">
                  {hybridMode === 'sp3'
                    ? 'উদাহরণ: CH₄ (১০৯.৫°), NH₃ (১০৭° - ১টি লোন পেয়ার), H₂O (১০৪.৫° - ২টি লোন পেয়ার)।'
                    : hybridMode === 'sp2'
                      ? 'উদাহরণ: ইথিন (C₂H₄), BF₃, গ্রাফাইট এবং বেনজিন বলয়ের প্রতিটি কার্বন।'
                      : 'উদাহরণ: ইথাইন (C₂H₂), BeCl₂, CO₂। ৫০% s-চরিত্র থাকায় তড়িৎ ঋণাত্মকতা সর্বাধিক।'}
                </p>
              </div>
            </div>
          </div>
        )}

        {lesson.diagramType === 'thermodynamics' && (
          <div className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-4 bg-white/75 dark:bg-[#191230]/85 backdrop-blur-md border border-white/88 dark:border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_6px_16px_-6px_rgba(34,18,74,0.1)] dark:shadow-none rounded-xl p-3.5">
              <div>
                <div className="flex justify-between text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] mb-1">
                  <span>তাপ উৎসের তাপমাত্রা (T₁)</span>
                  <span className="font-mono-tabular font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">{carnotT1} K</span>
                </div>
                <input
                  type="range"
                  min={320}
                  max={800}
                  step={20}
                  value={carnotT1}
                  onChange={(e) => setCarnotT1(parseInt(e.target.value, 10))}
                  className="w-full accent-[#6D4ACF]"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs font-medium text-[#1D1336] dark:text-[#F4F0FF] mb-1">
                  <span>তাপ গ্রাহকের তাপমাত্রা (T₂)</span>
                  <span className="font-mono-tabular font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">{carnotT2} K</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={500}
                  step={20}
                  value={carnotT2}
                  onChange={(e) => setCarnotT2(parseInt(e.target.value, 10))}
                  className="w-full accent-[#6D4ACF]"
                />
              </div>
            </div>
            <div className="bg-white/80 dark:bg-[#191230]/85 backdrop-blur-md border border-white/90 dark:border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_8px_20px_-8px_rgba(34,18,74,0.12)] dark:shadow-none rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">কার্নো ইঞ্জিনের কর্মদক্ষতা সূত্র: η = (1 − T₂/T₁) × 100%</div>
                <div className="text-2xl font-bold font-mono-tabular text-[#6D4ACF] dark:text-[#C4B5FD]">
                  η = {carnotEfficiency}%
                </div>
              </div>
              <div className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6] max-w-sm">
                T₁ যত বেশি ও T₂ যত কম হবে, ইঞ্জিনের কর্মদক্ষতা তত বাড়বে। সমোষ্ণ অপেক্ষা রুদ্ধতাপীয় লেখ γ গুণ বেশি খাড়া।
              </div>
            </div>
          </div>
        )}

        {['photosynthesis', 'benzene_aromatic', 'ph_buffer', 'circuits_optics', 'english_grammar', 'gk_timeline'].includes(
          lesson.diagramType
        ) && (
          <div className="grid sm:grid-cols-2 gap-3">
            {lesson.hotspots.map((spot) => {
              const isSelected = spot.id === activeHotspot?.id;
              return (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setSelectedHotspotId(spot.id)}
                  className={`text-left p-3.5 rounded-xl ${
                    isSelected
                      ? 'glass-option-selected text-[#1D1336] dark:text-[#F4F0FF]'
                      : 'glass-option text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD] mb-1">{spot.labelBn}</div>
                  <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">{spot.titleBn}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Hotspot Detail Strip */}
        {activeHotspot && (
          <div className="mt-3 bg-white/80 dark:bg-[#191230]/85 backdrop-blur-md border border-white/90 dark:border-white/12 rounded-xl p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_8px_20px_-8px_rgba(34,18,74,0.12)] dark:shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <h4 className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">{activeHotspot.titleBn}</h4>
              <span className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">{activeHotspot.labelBn}</span>
            </div>
            <p className="text-sm text-[#2D214C] dark:text-[#E2DAFA] leading-relaxed">{activeHotspot.summaryBn}</p>
            <p className="text-xs font-medium text-[#5A4B7A] dark:text-[#B6ABD6] mt-2">{activeHotspot.medicalNoteBn}</p>
          </div>
        )}
      </div>

      {/* Clickable Hotspot Quick Buttons */}
      {lesson.hotspots.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#5A4B7A] dark:text-[#B6ABD6]">ইনফোগ্রাফিক অংশ নির্বাচন:</span>
          {lesson.hotspots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              onClick={() => setSelectedHotspotId(spot.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl ${
                activeHotspot?.id === spot.id
                  ? 'glass-btn-primary'
                  : 'glass-btn-secondary text-[#5A4B7A] dark:text-[#B6ABD6]'
              }`}
            >
              {spot.labelBn}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface AnimatedVideoLecturePlayerProps {
  lesson: VisualLesson;
}

export const AnimatedVideoLecturePlayer: React.FC<AnimatedVideoLecturePlayerProps> = ({
  lesson,
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedInScene, setElapsedInScene] = useState(0);
  const [speed, setSpeed] = useState<1 | 1.25 | 1.5>(1);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const scenes = lesson.videoScenes;
  const currentScene = scenes[sceneIndex] || scenes[0];

  useEffect(() => {
    setSceneIndex(0);
    setElapsedInScene(0);
    setIsPlaying(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [lesson.id]);

  // Timer progression during playback
  useEffect(() => {
    if (!isPlaying || !currentScene) return;
    const intervalMs = Math.round(1000 / speed);
    const timer = window.setInterval(() => {
      setElapsedInScene((prev) => {
        if (prev + 1 >= currentScene.durationSec) {
          if (sceneIndex + 1 < scenes.length) {
            setSceneIndex((s) => s + 1);
            return 0;
          }
          setIsPlaying(false);
          return currentScene.durationSec;
        }
        return prev + 1;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, speed, currentScene, sceneIndex, scenes.length]);

  // Optional Bengali TTS narration per scene
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isPlaying && voiceEnabled && currentScene) {
      const utter = new SpeechSynthesisUtterance(currentScene.narrationBn);
      utter.lang = 'bn-BD';
      utter.rate = speed;
      window.speechSynthesis.speak(utter);
    }
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [isPlaying, voiceEnabled, sceneIndex, currentScene, speed]);

  if (!currentScene) return null;

  const progressPercent = Math.min(
    100,
    Math.round((elapsedInScene / currentScene.durationSec) * 100)
  );
  const visiblePointsCount = Math.max(
    1,
    Math.ceil(((elapsedInScene + 2) / currentScene.durationSec) * currentScene.boardPoints.length)
  );

  return (
    <div className="space-y-3.5">
      {/* Smartboard Lecture Viewport (3D Obsidian-Violet Frosted Glass) */}
      <div className="glass-obsidian-3d text-[#F1ECFA] rounded-2xl overflow-hidden relative">
        <div className="px-5 py-3 border-b border-white/12 bg-white/5 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-xs text-[#C8BAF0]">
          <span>{lesson.instructorBn}</span>
          <span className="font-mono-tabular">
            দৃশ্য {sceneIndex + 1}/{scenes.length} · {currentScene.titleBn}
          </span>
        </div>

        {/* Chalkboard Canvas */}
        <div className="p-6 sm:p-8 min-h-[260px] flex flex-col justify-between space-y-5 relative">
          <div className="space-y-4">
            <h4 className="text-lg sm:text-xl font-semibold text-white tracking-wide">
              {currentScene.boardTitle}
            </h4>

            <div className="bg-[#2A1D4D]/75 backdrop-blur-md border border-[#A78BFA]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] rounded-xl px-4 py-3 font-mono-tabular text-sm sm:text-base text-[#DDD6FE]">
              {currentScene.boardFormula}
            </div>

            <ul className="space-y-2.5 text-sm text-[#E6DFF7] leading-relaxed">
              {currentScene.boardPoints.map((pt, idx) => {
                const shown = isPlaying ? idx < visiblePointsCount : true;
                return (
                  <li
                    key={pt}
                    className={`flex items-start gap-2.5 transition-opacity duration-300 ${
                      shown ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <span className="font-mono-tabular text-[#C4B5FD] font-semibold shrink-0">
                      ০{idx + 1}.
                    </span>
                    <span>{pt}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Synchronized Bengali Subtitle */}
          <div className="bg-[#100920]/75 backdrop-blur-md border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#E5DCF8] leading-relaxed">
            {currentScene.narrationBn}
          </div>
        </div>

        {/* Video Controls Bar */}
        <div className="bg-[#0D071B]/80 backdrop-blur-xl px-4 py-3 border-t border-white/12 space-y-2.5">
          <input
            type="range"
            min={0}
            max={currentScene.durationSec}
            value={elapsedInScene}
            onChange={(e) => setElapsedInScene(parseInt(e.target.value, 10))}
            className="w-full accent-[#8B5CF6] h-1.5"
            aria-label="ভিডিও টাইমলাইন"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="glass-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying ? 'বিরতি' : 'প্লে করুন'}
              </button>

              <button
                type="button"
                disabled={sceneIndex === 0}
                onClick={() => {
                  setSceneIndex((s) => Math.max(0, s - 1));
                  setElapsedInScene(0);
                }}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 disabled:opacity-40 text-[#F1ECFA] transition-colors"
                aria-label="পূর্ববর্তী অংশ"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={sceneIndex >= scenes.length - 1}
                onClick={() => {
                  setSceneIndex((s) => Math.min(scenes.length - 1, s + 1));
                  setElapsedInScene(0);
                }}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 disabled:opacity-40 text-[#F1ECFA] transition-colors"
                aria-label="পরবর্তী অংশ"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setElapsedInScene(0);
                  setIsPlaying(true);
                }}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-[#F1ECFA] transition-colors"
                aria-label="পুনরায় শুরু"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs font-mono-tabular text-[#C8BAF0] ml-1">
                {elapsedInScene}s / {currentScene.durationSec}s ({progressPercent}%)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVoiceEnabled((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  voiceEnabled
                    ? 'bg-[#6D4ACF]/45 border-[#A78BFA] text-[#EDE9FE]'
                    : 'bg-white/10 border-white/15 text-[#DBD0F0] hover:text-white'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                {voiceEnabled ? 'ভয়েস চালু' : 'ভয়েস বন্ধ'}
              </button>

              <button
                type="button"
                onClick={() => setSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono-tabular text-[#F1ECFA] transition-colors"
              >
                {speed}x
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scene Playlist */}
      <div className="grid sm:grid-cols-3 gap-2.5">
        {scenes.map((scene, idx) => (
          <button
            key={scene.id}
            type="button"
            onClick={() => {
              setSceneIndex(idx);
              setElapsedInScene(0);
              setIsPlaying(true);
            }}
            className={`text-left p-3 rounded-xl text-xs ${
              idx === sceneIndex
                ? 'glass-option-selected text-[#1D1336] dark:text-[#F4F0FF] font-semibold'
                : 'glass-option text-[#5A4B7A] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
            }`}
          >
            <div className="truncate">{scene.titleBn}</div>
            <div className="text-[11px] text-[#5A4B7A] dark:text-[#A598C9] mt-0.5 font-mono-tabular">
              {scene.durationSec} সেকেন্ড
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
