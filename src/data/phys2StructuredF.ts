import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredF(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sf_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 1: Temperature Scales & Conversions (~60 MCQs)
  // =========================================================================
  [-40, 0, 10, 15, 20, 25, 30, 35, 37, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300].forEach((c, idx) => {
    const f = Number(((c * 9) / 5 + 32).toFixed(1));
    const k = c + 273;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `সেলসিয়াস স্কেলে কোনো বস্তুর তাপমাত্রা ${toBnDigits(c)}°C হলে ফারেনহাইট স্কেলে এর মান কত °F?`,
        correct: `${toBnDigits(f)}°F`,
        distractors: [f + 18, f - 18, f + 32, c + 32, f * 2 + 5]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x !== f)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}°F`),
        explanation: `C/৫ = (F - ৩২)/৯ => F = (${toBnDigits(c)} × ১.৮) + ৩২ = ${toBnDigits(f)}°F।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপমাত্রার স্কেল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `কত কেলভিন (K) তাপমাত্রা ফারেনহাইট স্কেলের ${toBnDigits(f)}°F তাপমাত্রার সমতুল্য?`,
        correct: `${toBnDigits(k)} K`,
        distractors: [k + 20, k - 20, k + 100, k - 50, c + 32]
          .filter((x) => x >= 0 && x !== k)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} K`),
        explanation: `${toBnDigits(f)}°F = ${toBnDigits(c)}°C; কেলভিন স্কেলে K = ${toBnDigits(c)} + ২৭৩ = ${toBnDigits(k)} K।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কেলভিন ও ফারেনহাইট স্কেল',
      })
    );
  });

  // Temperature difference conversions ΔC <-> ΔF (12 MCQs)
  [5, 10, 15, 20, 25, 30, 40, 45, 50, 60, 80, 100].forEach((dC, idx) => {
    const dF = (dC * 9) / 5;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো সিস্টেমের তাপমাত্রার পরিবর্তন সেলসিয়াস স্কেলে ΔC = ${toBnDigits(dC)}°C হলে ফারেনহাইট স্কেলে তাপমাত্রার পরিবর্তন (ΔF) কত?`,
        correct: `${toBnDigits(dF)}°F`,
        distractors: [dC, dF + 32, dF / 2, dF + 18]
          .filter((x) => x !== dF)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}°F`),
        explanation: `তাপমাত্রার ব্যবধানের ক্ষেত্রে ΔF = (৯/৫) ΔC = ১.৮ × ${toBnDigits(dC)} = ${toBnDigits(dF)}°F।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপমাত্রার পরিবর্তন',
      })
    );
  });

  // =========================================================================
  // 2. Ch 1: First Law of Thermodynamics & Carnot Engine & Refrigerator (~100 MCQs)
  // =========================================================================
  // 2A: First Law dQ = dU + dW (32 MCQs)
  [
    { dq: 500, dw: 200, mode: 'তাপ গ্রহণ ও সিস্টেম দ্বারা কাজ' },
    { dq: 800, dw: 350, mode: 'তাপ গ্রহণ ও সিস্টেম দ্বারা কাজ' },
    { dq: 1200, dw: 450, mode: 'তাপ গ্রহণ ও সিস্টেম দ্বারা কাজ' },
    { dq: 600, dw: -150, mode: 'তাপ গ্রহণ ও সিস্টেমের ওপর কাজ' },
    { dq: 900, dw: -300, mode: 'তাপ গ্রহণ ও সিস্টেমের ওপর কাজ' },
    { dq: 400, dw: -200, mode: 'তাপ গ্রহণ ও সিস্টেমের ওপর কাজ' },
    { dq: -500, dw: -200, mode: 'তাপ বর্জন ও সিস্টেমের ওপর কাজ' },
    { dq: -700, dw: 300, mode: 'তাপ বর্জন ও সিস্টেম দ্বারা কাজ' },
    { dq: 1000, dw: 400, mode: 'তাপ গ্রহণ ও সিস্টেম দ্বারা কাজ' },
    { dq: 1500, dw: 600, mode: 'তাপ গ্রহণ ও সিস্টেম দ্বারা কাজ' },
    { dq: 300, dw: -100, mode: 'তাপ গ্রহণ ও সিস্টেমের ওপর কাজ' },
    { dq: 2000, dw: 850, mode: 'তাপ গ্রহণ ও সিস্টেম দ্বারা কাজ' },
  ].forEach((fl, idx) => {
    const du = fl.dq - fl.dw;
    const qText = fl.dq >= 0 ? `একটি সিস্টেম ${toBnDigits(fl.dq)} J তাপ শোষণ করে` : `একটি সিস্টেম ${toBnDigits(Math.abs(fl.dq))} J তাপ বর্জন করে`;
    const wText = fl.dw >= 0 ? `সিস্টেম কর্তৃক ${toBnDigits(fl.dw)} J কাজ সম্পাদিত হলে` : `সিস্টেমের ওপর ${toBnDigits(Math.abs(fl.dw))} J কাজ সম্পাদিত হলে`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${qText} এবং ${wText} অভ্যন্তরীণ শক্তির পরিবর্তন (ΔU) কত জুল?`,
        correct: `${toBnDigits(du)} J`,
        distractors: [fl.dq + fl.dw, du + 150, du - 150, -du, du + 400]
          .filter((x) => x !== du)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `তাপগতিবিদ্যার ১ম সূত্র ΔQ = ΔU + ΔW => ΔU = ${toBnDigits(fl.dq)} - (${toBnDigits(fl.dw)}) = ${toBnDigits(du)} J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপগতিবিদ্যার ১ম সূত্র',
      })
    );
  });

  // 2B: Carnot Engine Efficiency, Work & Sink Heat (45 MCQs)
  [
    { t1K: 400, t2K: 300, q1: 1000 },
    { t1K: 500, t2K: 300, q1: 2000 },
    { t1K: 600, t2K: 300, q1: 1200 },
    { t1K: 800, t2K: 400, q1: 2400 },
    { t1K: 500, t2K: 400, q1: 1500 },
    { t1K: 600, t2K: 450, q1: 2000 },
    { t1K: 1000, t2K: 400, q1: 3000 },
    { t1K: 800, t2K: 200, q1: 1600 },
    { t1K: 750, t2K: 300, q1: 1000 },
    { t1K: 900, t2K: 300, q1: 1800 },
    { t1K: 1000, t2K: 500, q1: 4000 },
    { t1K: 600, t2K: 240, q1: 2500 },
    { t1K: 1200, t2K: 300, q1: 1600 },
    { t1K: 800, t2K: 600, q1: 2000 },
    { t1K: 500, t2K: 250, q1: 1000 },
  ].forEach((ce, idx) => {
    const eff = Number(((1 - ce.t2K / ce.t1K) * 100).toFixed(1));
    const work = Number(((eff / 100) * ce.q1).toFixed(1));
    const q2 = Number((ce.q1 - work).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি কার্নো ইঞ্জিন ${toBnDigits(ce.t1K)} K ও ${toBnDigits(ce.t2K)} K তাপমাত্রার মধ্যে কাজ করলে ইঞ্জিনটির কর্মদক্ষতা (η) কত?`,
        correct: `${toBnDigits(eff)}%`,
        distractors: [100 - eff, eff / 2, eff + 15, eff - 12]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x <= 100 && x !== eff)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}%`),
        explanation: `η = (1 - T₂/T₁) × ১০০% = (1 - ${toBnDigits(ce.t2K)}/${toBnDigits(ce.t1K)}) × ১০০% = ${toBnDigits(eff)}%।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কার্নো ইঞ্জিনের কর্মদক্ষতা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(ce.t1K)} K তাপমাত্রার উৎস থেকে ${toBnDigits(ce.q1)} J তাপ গ্রহণ করে ${toBnDigits(ce.t2K)} K তাপমাত্রার গ্রাহকে তাপ বর্জন করলে কার্নো ইঞ্জিনটি কত জুল কাজ করবে?`,
        correct: `${toBnDigits(work)} J`,
        distractors: [q2, work + 200, work / 2, ce.q1]
          .filter((x) => x > 0 && x !== work)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `দক্ষতা η = ${toBnDigits(eff)}%; কৃতকাজ W = η × Q₁ = ${toBnDigits(work)} J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কার্নো ইঞ্জিনের কাজ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(ce.t1K)} K ও ${toBnDigits(ce.t2K)} K তাপমাত্রার মধ্যে কর্মরত একটি কার্নো ইঞ্জিন উৎস থেকে ${toBnDigits(ce.q1)} J তাপ শোষণ করলে তাপগ্রাহকে কত জুল তাপ বর্জন করবে?`,
        correct: `${toBnDigits(q2)} J`,
        distractors: [work, q2 + 250, q2 / 2, ce.q1]
          .filter((x) => x > 0 && x !== q2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `Q₂ = Q₁ × (T₂/T₁) = ${toBnDigits(ce.q1)} × (${toBnDigits(ce.t2K)}/${toBnDigits(ce.t1K)}) = ${toBnDigits(q2)} J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · বর্জিত তাপ নির্ণয়',
      })
    );
  });

  // 2C: Refrigerator COP K = T2 / (T1 - T2) (16 MCQs)
  [
    { t2K: 250, t1K: 300, cop: 5 },
    { t2K: 240, t1K: 300, cop: 4 },
    { t2K: 270, t1K: 300, cop: 9 },
    { t2K: 260, t1K: 312, cop: 5 },
    { t2K: 280, t1K: 320, cop: 7 },
    { t2K: 273, t1K: 300, cop: 10.11 },
    { t2K: 255, t1K: 306, cop: 5 },
    { t2K: 225, t1K: 300, cop: 3 },
    { t2K: 264, t1K: 297, cop: 8 },
    { t2K: 240, t1K: 280, cop: 6 },
  ].forEach((rf, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি আদর্শ রেফ্রিজারেটর ${toBnDigits(rf.t2K)} K তাপমাত্রার শীতল প্রকোষ্ঠ থেকে তাপ অপসারণ করে ${toBnDigits(rf.t1K)} K তাপমাত্রার পরিবেশে ছাড়লে এর কার্যসম্পাদন সহগ (COP) কত?`,
        correct: toBnDigits(rf.cop),
        distractors: [rf.cop + 1, rf.cop - 1.5, rf.cop * 2, Number((1 / rf.cop).toFixed(2)), rf.cop + 4]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== rf.cop)
          .slice(0, 4)
          .map((x) => toBnDigits(x)),
        explanation: `COP = T₂/(T₁ - T₂) = ${toBnDigits(rf.t2K)} / (${toBnDigits(rf.t1K)} - ${toBnDigits(rf.t2K)}) = ${toBnDigits(rf.cop)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · রেফ্রিজারেটরের COP',
      })
    );
  });

  // =========================================================================
  // 3. Ch 2: Static Electricity — Coulomb Force, Field, Potential, Capacitors (~140 MCQs)
  // =========================================================================
  // 3A: Coulomb force scaling & direct numeric F = 9e9 * q1*q2 / r^2 (32 MCQs)
  [
    { q1Uc: 2, q2Uc: 5, rM: 3, fMn: 10 },
    { q1Uc: 4, q2Uc: 4, rM: 2, fMn: 36 },
    { q1Uc: 1, q2Uc: 8, rM: 2, fMn: 18 },
    { q1Uc: 3, q2Uc: 3, rM: 3, fMn: 9 },
    { q1Uc: 5, q2Uc: 10, rM: 3, fMn: 50 },
    { q1Uc: 2, q2Uc: 10, rM: 1, fMn: 180 },
    { q1Uc: 4, q2Uc: 9, rM: 6, fMn: 9 },
    { q1Uc: 8, q2Uc: 2, rM: 4, fMn: 9 },
    { q1Uc: 6, q2Uc: 6, rM: 3, fMn: 36 },
    { q1Uc: 10, q2Uc: 10, rM: 5, fMn: 36 },
  ].forEach((cl, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `শূন্যস্থানে ${toBnDigits(cl.rM)} m দূরত্বে রাখা ${toBnDigits(cl.q1Uc)} μC এবং ${toBnDigits(cl.q2Uc)} μC দুটি বিন্দু চার্জের মধ্যে ক্রিয়াশীল কুলম্ব বল কত mN (মিলি-নিউটন)?`,
        correct: `${toBnDigits(cl.fMn)} mN`,
        distractors: [cl.fMn * 2, cl.fMn / 2, cl.fMn + 12, cl.fMn * 3, cl.fMn + 45]
          .filter((x) => x > 0 && x !== cl.fMn)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mN`),
        explanation: `F = (৯×১০⁹ × ${toBnDigits(cl.q1Uc)}×১০⁻⁶ × ${toBnDigits(cl.q2Uc)}×১০⁻⁶) / ${toBnDigits(cl.rM)}² = ${toBnDigits(cl.fMn)}×১০⁻³ N = ${toBnDigits(cl.fMn)} mN।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · কুলম্বের সূত্র',
      })
    );
  });

  [
    { change: 'চার্জদ্বয়ের দূরত্ব দ্বিগুণ', factor: 'এক-চতুর্থাংশ (F/4)' },
    { change: 'চার্জদ্বয়ের দূরত্ব অর্ধেক', factor: 'চার গুণ (4F)' },
    { change: 'উভয় চার্জ দ্বিগুণ এবং দূরত্ব দ্বিগুণ', factor: 'অপরিবর্তিত (F)' },
    { change: 'চার্জ দুটিকে K = ৪ পরাবৈদ্যুতিক মাধ্যমে', factor: 'এক-চতুর্থাংশ (F/4) (২)' },
    { change: 'দূরত্ব ৩ গুণ এবং একটি চার্জ ৩ গুণ', factor: 'এক-তৃতীয়াংশ (F/3)' },
    { change: 'উভয় চার্জ ৩ গুণ এবং দূরত্ব অর্ধেক', factor: '৩৬ গুণ (36F)' },
    { change: 'চার্জ দুটিকে K = ২ মাধ্যমে এবং দূরত্ব অপরিবর্তিত', factor: 'অর্ধেক (F/2)' },
    { change: 'একটি চার্জ ৪ গুণ এবং দূরত্ব দ্বিগুণ', factor: 'অপরিবর্তিত (F) (২)' },
  ].forEach((cs, idx) => {
    const clean = cs.factor.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `দুটি বিন্দু চার্জের মধ্যবর্তী বল F হলে, ${cs.change} করা হলে নতুন স্থির তড়িৎ বল কত হবে?`,
        correct: clean,
        distractors: ['অর্ধেক (F/2)', 'দ্বিগুণ (2F)', 'চার গুণ (4F)', 'এক-চতুর্থাংশ (F/4)', 'অপরিবর্তিত (F)', '৩৬ গুণ (36F)']
          .filter((x) => x !== clean)
          .slice(0, 4),
        explanation: `কুলম্বের সূত্র F = q₁q₂/(4πε₀Kr²) অনুযায়ী নতুন বল হবে ${clean}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · কুলম্ব বলের নির্ভরতা',
      })
    );
  });

  // 3B: Electric Field E = V/d & Potential Work W = q * ΔV (36 MCQs)
  [
    { v: 200, dCm: 4, qUc: 5 },
    { v: 500, dCm: 5, qUc: 2 },
    { v: 1000, dCm: 2, qUc: 3 },
    { v: 300, dCm: 10, qUc: 4 },
    { v: 600, dCm: 3, qUc: 5 },
    { v: 400, dCm: 8, qUc: 10 },
    { v: 1200, dCm: 6, qUc: 2 },
    { v: 800, dCm: 4, qUc: 6 },
    { v: 900, dCm: 9, qUc: 5 },
    { v: 1500, dCm: 5, qUc: 4 },
  ].forEach((ef, idx) => {
    const E = Math.round(ef.v / (ef.dCm / 100));
    const W = (ef.qUc * ef.v) / 1000; // mJ
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(ef.dCm)} cm ব্যবধানে অবস্থিত দুটি সমান্তরাল ধাতব পাতের মধ্যে বিভব পার্থক্য ${toBnDigits(ef.v)} V হলে পাতদ্বয়ের মধ্যবর্তী সুষম তড়িৎ প্রাবল্য কত V/m?`,
        correct: `${toBnDigits(E)} V/m`,
        distractors: [E / 2, E * 2, ef.v / ef.dCm, E + 1000]
          .filter((x) => x !== E)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V/m`),
        explanation: `E = V/d = ${toBnDigits(ef.v)} / ${toBnDigits(ef.dCm / 100)} = ${toBnDigits(E)} V/m।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · বিভব ও প্রাবল্যের সম্পর্ক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(ef.v)} V বিভব পার্থক্যের দুটি বিন্দুর মধ্যে ${toBnDigits(ef.qUc)} μC চার্জ সরাতে কত mJ (মিলিজুল) কাজ করতে হবে?`,
        correct: `${toBnDigits(W)} mJ`,
        distractors: [W * 2, W / 2, W + 2, W + 5]
          .filter((x) => x > 0 && x !== W)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mJ`),
        explanation: `কৃতকাজ W = qV = ${toBnDigits(ef.qUc)}×১০⁻⁶ × ${toBnDigits(ef.v)} = ${toBnDigits(W)} mJ।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · তড়িৎ বিভব ও কাজ',
      })
    );
  });

  // 3C: Capacitor Series, Parallel, Dielectric & Stored Energy (44 MCQs)
  [
    { c1: 4, c2: 4, mode: 'শ্রেণি', ceq: 2 },
    { c1: 4, c2: 4, mode: 'সমান্তরাল', ceq: 8 },
    { c1: 6, c2: 6, mode: 'শ্রেণি', ceq: 3 },
    { c1: 6, c2: 6, mode: 'সমান্তরাল', ceq: 12 },
    { c1: 12, c2: 6, mode: 'শ্রেণি', ceq: 4 },
    { c1: 12, c2: 6, mode: 'সমান্তরাল', ceq: 18 },
    { c1: 15, c2: 10, mode: 'শ্রেণি', ceq: 6 },
    { c1: 15, c2: 10, mode: 'সমান্তরাল', ceq: 25 },
    { c1: 20, c2: 5, mode: 'শ্রেণি', ceq: 4 },
    { c1: 20, c2: 5, mode: 'সমান্তরাল', ceq: 25 },
    { c1: 30, c2: 15, mode: 'শ্রেণি', ceq: 10 },
    { c1: 30, c2: 15, mode: 'সমান্তরাল', ceq: 45 },
  ].forEach((cp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(cp.c1)} μF ও ${toBnDigits(cp.c2)} μF ধারকত্বের দুটি ধারককে ${cp.mode} সমবায়ে যুক্ত করলে তুল্য ধারকত্ব কত μF হবে?`,
        correct: `${toBnDigits(cp.ceq)} μF`,
        distractors: [cp.ceq * 2, cp.ceq / 2, cp.c1 + cp.c2, Math.abs(cp.c1 - cp.c2) + 1]
          .filter((x) => x > 0 && x !== cp.ceq)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μF`),
        explanation: `${cp.mode} সমবায়ে ধারকদ্বয়ের তুল্য ধারকত্ব = ${toBnDigits(cp.ceq)} μF।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকের সমবায়',
      })
    );
  });

  [
    { c0: 5, k: 4, v: 100 },
    { c0: 10, k: 6, v: 50 },
    { c0: 4, k: 5, v: 200 },
    { c0: 8, k: 3, v: 100 },
    { c0: 12, k: 2.5, v: 100 },
    { c0: 6, k: 8, v: 50 },
    { c0: 15, k: 4, v: 20 },
    { c0: 20, k: 5, v: 10 },
  ].forEach((dc, idx) => {
    const cNew = dc.c0 * dc.k;
    const uNew = Number((0.5 * cNew * dc.v * dc.v * 1e-3).toFixed(1)); // mJ
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বায়ু মাধ্যমে একটি সমান্তরাল পাত ধারকের ধারকত্ব ${toBnDigits(dc.c0)} μF। পাতদ্বয়ের মাঝে পরা-ধ্রুবক K = ${toBnDigits(dc.k)} বিশিষ্ট অন্তরক প্রবেশ করালে নতুন ধারকত্ব কত μF হবে?`,
        correct: `${toBnDigits(cNew)} μF`,
        distractors: [dc.c0 / dc.k, cNew * 2, cNew / 2, dc.c0 + dc.k]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x !== cNew)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μF`),
        explanation: `পরা-ধ্রুবক K প্রবেশ করালে ধারকত্ব C' = K C₀ = ${toBnDigits(dc.k)} × ${toBnDigits(dc.c0)} = ${toBnDigits(cNew)} μF হয়।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকে পরাবৈদ্যুতিক মাধ্যম',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(cNew)} μF ধারকত্বের একটি ধারককে ${toBnDigits(dc.v)} V উৎসে চার্জিত করলে সঞ্চিত শক্তি কত mJ (মিলিজুল)?`,
        correct: `${toBnDigits(uNew)} mJ`,
        distractors: [uNew * 2, uNew / 2, uNew + 10, uNew + 25]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== uNew)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mJ`),
        explanation: `U = ½CV² = ½ × ${toBnDigits(cNew)}×১০⁻⁶ × ${toBnDigits(dc.v)}² = ${toBnDigits(uNew)} mJ।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকে সঞ্চিত শক্তি',
      })
    );
  });

  // 4. Extra Ch 1 Gas & Thermodynamics Conceptual Cards (28 MCQs)
  const thermoConcepts: {
    topic: string;
    ans: string;
    pool: string[];
    ref: string;
  }[] = [
    {
      topic: 'সমোষ্ণ প্রক্রিয়ায় (Isothermal) স্থির থাকে',
      ans: 'তাপমাত্রা (T) ও অভ্যন্তরীণ শক্তি (U)',
      pool: ['চাপ (P)', 'আয়তন (V)', 'এনট্রপি (S)', 'তাপমাত্রা (T) ও অভ্যন্তরীণ শক্তি (U)'],
      ref: 'সমোষ্ণ প্রক্রিয়া',
    },
    {
      topic: 'রুদ্ধতাপীয় প্রক্রিয়ায় (Adiabatic) কোনটি অপরিবর্তিত থাকে?',
      ans: 'এনট্রপি (ΔS = ০) ও মোট তাপ (ΔQ = ০)',
      pool: ['তাপমাত্রা (ΔT = ০)', 'চাপ (ΔP = ০)', 'আয়তন (ΔV = ০)', 'এনট্রপি (ΔS = ০) ও মোট তাপ (ΔQ = ০)'],
      ref: 'রুদ্ধতাপীয় প্রক্রিয়া',
    },
    {
      topic: 'সকল প্রত্যাগামী (Reversible) প্রক্রিয়ায় মহাবিশ্বের এনট্রপির পরিবর্তন',
      ans: 'শূন্য (ΔS = ০)',
      pool: ['সর্বদা ধনাত্মক', 'সর্বদা ঋণাত্মক', 'শূন্য (ΔS = ০)', 'অসীম'],
      ref: 'এনট্রপি',
    },
    {
      topic: 'কার্নো ইঞ্জিনের কর্মদক্ষতা ১০০% হবে যখন',
      ans: 'তাপগ্রাহকের তাপমাত্রা ০ K (পরম শূন্য) হয়',
      pool: ['তাপ উৎসের তাপমাত্রা ১০০°C হয়', 'উৎস ও গ্রাহকের তাপমাত্রা সমান হয়', 'তাপগ্রাহকের তাপমাত্রা ০ K (পরম শূন্য) হয়', 'গ্যাস আদর্শ হয়'],
      ref: 'কার্নো চক্র',
    },
    {
      topic: 'যে তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেল একই পাঠ দেয়',
      ans: '-৪০°',
      pool: ['০°', '৩২°', '-৪০°', '৫৭৪.২৫°'],
      ref: 'তাপমাত্রার স্কেল',
    },
    {
      topic: 'ফারেনহাইট ও কেলভিন স্কেল যে তাপমাত্রায় একই পাঠ দেয়',
      ans: '৫৭৪.২৫',
      pool: ['-৪০', '২৭৩.১৬', '৫৭৪.২৫', '৩১২.৫'],
      ref: 'তাপমাত্রার স্কেল',
    },
    {
      topic: 'পানির ত্রৈধ বিন্দুর (Triple Point) তাপমাত্রা কেলভিন স্কেলে',
      ans: '২৭৩.১৬ K (০.০১°C)',
      pool: ['০ K', '২৭৩ K', '২৭৩.১৬ K (০.০১°C)', '৩৭৩.১৫ K'],
      ref: 'পানির ত্রৈধ বিন্দু',
    },
    {
      topic: 'রুদ্ধতাপীয় লেখচিত্রের ঢাল সমোষ্ণ লেখচিত্রের ঢালের তুলনায়',
      ans: 'γ (গামা) গুণ বেশি খাড়া',
      pool: ['γ গুণ কম খাড়া', 'সমান', 'γ (গামা) গুণ বেশি খাড়া', '২γ গুণ'],
      ref: 'P-V লেখচিত্র',
    },
    {
      topic: 'রুদ্ধতাপীয় প্রসারণে গ্যাসের তাপমাত্রা',
      ans: 'হ্রাস পায় (সিস্টেম শীতল হয়)',
      pool: ['বৃদ্ধি পায়', 'অপরিবর্তিত থাকে', 'হ্রাস পায় (সিস্টেম শীতল হয়)', 'শূন্য হয়ে যায়'],
      ref: 'রুদ্ধতাপীয় প্রসারণ',
    },
    {
      topic: 'মেয়ারের সম্পর্ক (Mayer Relation) অনুযায়ী C_p - C_v সমান',
      ans: 'R (সর্বজনীন গ্যাস ধ্রুবক)',
      pool: ['γR', 'R/2', 'R (সর্বজনীন গ্যাস ধ্রুবক)', '3R/2'],
      ref: 'মোলার আপেক্ষিক তাপ',
    },
  ];
  thermoConcepts.forEach((tc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `তাপগতিবিদ্যা অনুসারে "${tc.topic}"— সঠিক উত্তর কোনটি?`,
        correct: tc.ans,
        distractors: tc.pool.filter((x) => x !== tc.ans),
        explanation: `${tc.topic} — ${tc.ans}।`,
        reference: `পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · ${tc.ref}`,
      })
    );
  });

  return list;
}
