import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredA(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sa_${String(seq++).padStart(4, '0')}`;

  // 1. Temperature Scale Conversions C/5 = (F-32)/9 = (K-273)/5 (~24 MCQs)
  const tempCases = [
    { c: 0, f: 32, k: 273 },
    { c: 25, f: 77, k: 298 },
    { c: 37, f: 98.6, k: 310 },
    { c: 100, f: 212, k: 373 },
    { c: -40, f: -40, k: 233 },
    { c: 50, f: 122, k: 323 },
    { c: 20, f: 68, k: 293 },
    { c: 40, f: 104, k: 313 },
  ];
  tempCases.forEach((tc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'board',
        question: `সেলসিয়াস স্কেলে ${toBnDigits(tc.c)} °C তাপমাত্রা ফারেনহাইট স্কেলে কত ডিগ্রি ফারেনহাইট (°F)?`,
        correct: `${toBnDigits(tc.f)} °F`,
        distractors: [32, 68, 77, 98.6, 104, 122, 212, -40]
          .filter((x) => x !== tc.f)
          .map((x) => `${toBnDigits(x)} °F`),
        explanation: `C/5 = (F−32)/9 ⇒ F = (৯/৫)×(${toBnDigits(tc.c)}) + ৩২ = ${toBnDigits(tc.f)} °F।`,
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
        question: `ফারেনহাইট স্কেলে ${toBnDigits(tc.f)} °F তাপমাত্রা পরম বা কেলভিন স্কেলে কত K?`,
        correct: `${toBnDigits(tc.k)} K`,
        distractors: [233, 273, 293, 298, 310, 313, 323, 373]
          .filter((x) => x !== tc.k)
          .map((x) => `${toBnDigits(x)} K`),
        explanation: `(F−32)/9 = (K−273)/5 ⇒ ${toBnDigits(tc.f)} °F = ${toBnDigits(tc.c)} °C = ${toBnDigits(tc.k)} K।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কেলভিন ও ফারেনহাইট স্কেল',
      })
    );
  });

  // 2. First Law of Thermodynamics dQ = dU + dW & Carnot Engine Efficiency (~36 MCQs)
  const firstLawCases = [
    { dq: 500, dw: 200, du: 300 },
    { dq: 800, dw: 350, du: 450 },
    { dq: 1200, dw: 500, du: 700 },
    { dq: 600, dw: 150, du: 450 },
    { dq: 1000, dw: 400, du: 600 },
  ];
  firstLawCases.forEach((fl, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'board',
        question: `কোনো তাপগতীয় সিস্টেমে (উদাহরণ-#${toBnDigits(idx + 1)}) ${toBnDigits(fl.dq)} J তাপ সরবরাহ করায় এটি ${toBnDigits(fl.dw)} J বাহ্যিক কাজ সম্পন্ন করলে অভ্যন্তরীণ শক্তির পরিবর্তন ΔU কত?`,
        correct: `${toBnDigits(fl.du)} J বৃদ্ধি`,
        distractors: [200, 300, 450, 500, 600, 700, 800]
          .filter((x) => x !== fl.du)
          .map((x) => `${toBnDigits(x)} J বৃদ্ধি`),
        explanation: `dQ = dU + dW ⇒ dU = ${toBnDigits(fl.dq)} − ${toBnDigits(fl.dw)} = ${toBnDigits(fl.du)} J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপগতিবিদ্যার ১ম সূত্র',
      })
    );
  });

  const carnotCases = [
    { t1C: 127, t2C: 27, eff: 25 },
    { t1C: 227, t2C: 27, eff: 40 },
    { t1C: 327, t2C: 27, eff: 50 },
    { t1C: 527, t2C: 127, eff: 50 },
    { t1C: 727, t2C: 227, eff: 50 },
    { t1C: 627, t2C: 177, eff: 50 },
    { t1C: 227, t2C: 127, eff: 20 },
    { t1C: 127, t2C: -73, eff: 50 },
    { t1C: 527, t2C: 27, eff: 62.5 },
  ];
  carnotCases.forEach((cc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি কার্নো ইঞ্জিন (কেস-#${toBnDigits(idx + 1)}) ${toBnDigits(cc.t1C)} °C ও ${toBnDigits(cc.t2C)} °C তাপমাত্রার মধ্যে কার্যরত হলে এর কর্মদক্ষতা কত শতাংশ?`,
        correct: `${toBnDigits(cc.eff)}%`,
        distractors: [20, 25, 33.3, 40, 50, 62.5, 75, 80]
          .filter((x) => x !== cc.eff)
          .map((x) => `${toBnDigits(x)}%`),
        explanation: `T₁ = ${toBnDigits(cc.t1C + 273)} K ও T₂ = ${toBnDigits(cc.t2C + 273)} K; η = (১ − T₂/T₁)×১০০% = ${toBnDigits(cc.eff)}%।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কার্নো ইঞ্জিন',
      })
    );
  });

  // 3. Capacitor Series / Parallel Equivalent Capacitance & Stored Energy ½CV² (~30 MCQs)
  const capCombos = [
    { c1: 6, c2: 6, type: 'শ্রেণি (Series)', eq: 3 },
    { c1: 6, c2: 6, type: 'সমান্তরাল (Parallel)', eq: 12 },
    { c1: 4, c2: 12, type: 'শ্রেণি (Series)', eq: 3 },
    { c1: 4, c2: 12, type: 'সমান্তরাল (Parallel)', eq: 16 },
    { c1: 3, c2: 6, type: 'শ্রেণি (Series)', eq: 2 },
    { c1: 3, c2: 6, type: 'সমান্তরাল (Parallel)', eq: 9 },
    { c1: 10, c2: 15, type: 'শ্রেণি (Series)', eq: 6 },
    { c1: 10, c2: 15, type: 'সমান্তরাল (Parallel)', eq: 25 },
  ];
  capCombos.forEach((cc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(cc.c1)} μF ও ${toBnDigits(cc.c2)} μF মানের দুটি ধারককে "${cc.type}" সমবায়ে যুক্ত করলে তুল্য ধারকত্ব কত হবে?`,
        correct: `${toBnDigits(cc.eq)} μF`,
        distractors: [2, 3, 6, 9, 12, 16, 18, 25]
          .filter((x) => x !== cc.eq)
          .map((x) => `${toBnDigits(x)} μF`),
        explanation: `ধারকের শ্রেণি সমবায়ে 1/C = 1/C₁ + 1/C₂ এবং সমান্তরালে C = C₁ + C₂ ⇒ ${toBnDigits(cc.eq)} μF।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকের সমবায়',
      })
    );
  });

  // Stored Energy U = 0.5 * C * V^2
  [
    { cUf: 10, v: 100, uMj: 50 },
    { cUf: 4, v: 50, uMj: 5 },
    { cUf: 20, v: 100, uMj: 100 },
    { cUf: 8, v: 50, uMj: 10 },
    { cUf: 2, v: 200, uMj: 40 },
  ].forEach((ce, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি ${toBnDigits(ce.cUf)} μF ধারককে (নমুনা-#${toBnDigits(idx + 1)}) ${toBnDigits(ce.v)} V বিভব উৎসে চার্জিত করলে এতে কত মিলিজুল (mJ) শক্তি সঞ্চিত হবে?`,
        correct: `${toBnDigits(ce.uMj)} mJ`,
        distractors: [5, 10, 20, 25, 40, 50, 80, 100]
          .filter((x) => x !== ce.uMj)
          .map((x) => `${toBnDigits(x)} mJ`),
        explanation: `U = ½ CV² = ০.৫ × (${toBnDigits(ce.cUf)} × ১০⁻⁶) × ${toBnDigits(ce.v)}² = ${toBnDigits(ce.uMj)} × ১০⁻³ J = ${toBnDigits(ce.uMj)} mJ।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকের সঞ্চিত শক্তি',
      })
    );
  });

  // 4. Current Electricity: Wire Stretching R' = n^2 R, Resistor Combos, Bulb Power & Shunt (~54 MCQs)
  [
    { r0: 5, n: 2, rNew: 20 },
    { r0: 4, n: 3, rNew: 36 },
    { r0: 10, n: 2, rNew: 40 },
    { r0: 3, n: 4, rNew: 48 },
    { r0: 2, n: 5, rNew: 50 },
  ].forEach((ws) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_elec_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(ws.r0)} Ω রোধের একটি তামার তারকে আয়তন স্থির রেখে টেনে দৈর্ঘ্যে ${toBnDigits(ws.n)} গুণ লম্বা করলে নতুন রোধ কত হবে?`,
        correct: `${toBnDigits(ws.rNew)} Ω`,
        distractors: [10, 15, 20, 30, 36, 40, 48, 50, 60]
          .filter((x) => x !== ws.rNew)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `আয়তন স্থির থাকলে R′ = n² R = ${toBnDigits(ws.n)}² × ${toBnDigits(ws.r0)} = ${toBnDigits(ws.rNew)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · রোধ ও তার টানা',
      })
    );
  });

  // Shunt Resistance S = (Ig * G) / (I - Ig)
  [
    { g: 90, mult: 10, s: 10 },
    { g: 99, mult: 100, s: 1 },
    { g: 100, mult: 11, s: 10 },
    { g: 45, mult: 10, s: 5 },
    { g: 80, mult: 5, s: 20 },
  ].forEach((sh) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_elec_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(sh.g)} Ω অভ্যন্তরীণ রোধের একটি গ্যালভানোমিটারের পাল্লা ${toBnDigits(sh.mult)} গুণ বাড়াতে সমান্তরালে কত ওহম (Ω) মানের শান্ট যুক্ত করতে হবে?`,
        correct: `${toBnDigits(sh.s)} Ω`,
        distractors: [1, 2, 5, 9, 10, 15, 20, 45]
          .filter((x) => x !== sh.s)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `S = G / (n − 1) = ${toBnDigits(sh.g)} / (${toBnDigits(sh.mult)} − ১) = ${toBnDigits(sh.s)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · শান্ট রোধ',
      })
    );
  });

  // Bulb Resistance R = V^2 / P & BOT Energy kWh
  [
    { v: 200, p: 100, r: 400 },
    { v: 200, p: 40, r: 1000 },
    { v: 220, p: 110, r: 440 },
    { v: 100, p: 50, r: 200 },
    { v: 200, p: 50, r: 800 },
  ].forEach((bl) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_elec_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি বৈদ্যুতিক বাল্বের গায়ে "${toBnDigits(bl.v)} V – ${toBnDigits(bl.p)} W" লেখা থাকলে বাল্বটির ফিলামেন্টের রোধ কত?`,
        correct: `${toBnDigits(bl.r)} Ω`,
        distractors: [100, 200, 400, 440, 500, 800, 1000, 1200]
          .filter((x) => x !== bl.r)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `R = V² / P = ${toBnDigits(bl.v)}² / ${toBnDigits(bl.p)} = ${toBnDigits(bl.r)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · বৈদ্যুতিক ক্ষমতা',
      })
    );
  });

  // BOT Units (kWh) = (Watt * Hours * Days) / 1000
  [
    { w: 100, hrs: 10, days: 30, units: 30 },
    { w: 200, hrs: 5, days: 30, units: 30 },
    { w: 1000, hrs: 4, days: 30, units: 120 },
    { w: 500, hrs: 6, days: 30, units: 90 },
    { w: 60, hrs: 10, days: 30, units: 18 },
  ].forEach((bt, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_elec_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি ${toBnDigits(bt.w)} W যন্ত্র (হিসাব-#${toBnDigits(idx + 1)}) দৈনিক ${toBnDigits(bt.hrs)} ঘণ্টা করে ${toBnDigits(bt.days)} দিন চললে মোট কত ইউনিট (kWh) বিদ্যুৎ খরচ হবে?`,
        correct: `${toBnDigits(bt.units)} ইউনিট`,
        distractors: [12, 18, 24, 30, 45, 60, 90, 120]
          .filter((x) => x !== bt.units)
          .map((x) => `${toBnDigits(x)} ইউনিট`),
        explanation: `ব্যয়িত শক্তি = (W × t) / ১০০০ = (${toBnDigits(bt.w)} × ${toBnDigits(bt.hrs)} × ${toBnDigits(bt.days)}) / ১০০০ = ${toBnDigits(bt.units)} kWh বা ইউনিট।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · বৈদ্যুতিক শক্তি ও বিল',
      })
    );
  });

  // Wheatstone Bridge 4th arm balancing P/Q = R/S
  [
    { p: 10, q: 20, r: 15, s: 30 },
    { p: 5, q: 10, r: 20, s: 40 },
    { p: 12, q: 24, r: 30, s: 60 },
    { p: 8, q: 16, r: 10, s: 20 },
    { p: 20, q: 5, r: 40, s: 10 },
  ].forEach((wb) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_elec_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি হুইটস্টোন ব্রিজের ৪টি বাহুর মধ্যে প্রথম তিনটির রোধ যথাক্রমে P = ${toBnDigits(wb.p)} Ω, Q = ${toBnDigits(wb.q)} Ω এবং R = ${toBnDigits(wb.r)} Ω হলে ব্রিজটিকে নিস্পন্দ (সাম্যাবস্থা) করতে ৪র্থ বাহুতে S-এর মান কত Ω হবে?`,
        correct: `${toBnDigits(wb.s)} Ω`,
        distractors: [5, 10, 15, 20, 25, 30, 40, 60]
          .filter((x) => x !== wb.s)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `P/Q = R/S ⇒ S = (Q × R) / P = (${toBnDigits(wb.q)} × ${toBnDigits(wb.r)}) / ${toBnDigits(wb.p)} = ${toBnDigits(wb.s)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · হুইটস্টোন ব্রিজ',
      })
    );
  });

  // Coulomb Force Scaling F = k q1 q2 / r^2
  [
    { cond: 'আধানদ্বয়ের মধ্যবর্তী দূরত্ব অর্ধেক করলে', factor: '৪ গুণ বাড়ে' },
    { cond: 'আধানদ্বয়ের মধ্যবর্তী দূরত্ব দ্বিগুণ করলে', factor: '১/৪ অংশে নামে' },
    { cond: 'উভয় আধানের মান দ্বিগুণ এবং দূরত্বও দ্বিগুণ করলে', factor: 'অপরিবর্তিত থাকে (১ গুণ)' },
    { cond: 'আধানের মাঝে শূন্যস্থানের বদলে K = ৫ পরাবৈদ্যুতিক মাধ্যম রাখলে', factor: '১/৫ অংশে নেমে আসে' },
  ].forEach((cf) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `দুটি স্থির বিন্দু আধানের ক্ষেত্রে ${cf.cond} তাদের মধ্যবর্তী কুলম্ব বল পূর্বের তুলনায় কেমন হয়?`,
        correct: cf.factor,
        distractors: [
          '৪ গুণ বাড়ে',
          '১/৪ অংশে নামে',
          'অপরিবর্তিত থাকে (১ গুণ)',
          '১/৫ অংশে নেমে আসে',
          '২ গুণ বাড়ে',
          '১৬ গুণ বাড়ে',
        ].filter((x) => x !== cf.factor),
        explanation: `F = (১ / 4πε₀K) × (q₁q₂ / r²); তাই ${cf.cond} বল ${cf.factor}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · কুলম্বের সূত্র',
      })
    );
  });

  return list;
}
