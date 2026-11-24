import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredL(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sl_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 1: Isobaric Work, Isochoric Heating & Heat Engine Efficiency (~72 MCQs)
  // =========================================================================
  // 1A: Isobaric Work W = P * dV (16 MCQs)
  [
    { pKpa: 100, dVl: 2, w: 200 },
    { pKpa: 100, dVl: 5, w: 500 },
    { pKpa: 200, dVl: 3, w: 600 },
    { pKpa: 150, dVl: 4, w: 600 },
    { pKpa: 250, dVl: 4, w: 1000 },
    { pKpa: 300, dVl: 2, w: 600 },
    { pKpa: 400, dVl: 3, w: 1200 },
    { pKpa: 500, dVl: 5, w: 2500 },
    { pKpa: 120, dVl: 5, w: 600 },
    { pKpa: 200, dVl: 8, w: 1600 },
    { pKpa: 100, dVl: 10, w: 1000 },
    { pKpa: 300, dVl: 5, w: 1500 },
  ].forEach((ib, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(ib.pKpa)} kPa স্থির চাপে কোনো গ্যাসের আয়তন ${toBnDigits(ib.dVl)} লিটার (L) বৃদ্ধি পেলে গ্যাস কর্তৃক সম্পাদিত কাজ কত জুল? (১ L = ১০⁻³ m³)`,
        correct: `${toBnDigits(ib.w)} J`,
        distractors: [ib.w * 2, ib.w / 2, ib.w + 350, ib.w + 700, ib.pKpa]
          .filter((x) => x > 0 && x !== ib.w)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `সমচাপ প্রক্রিয়ায় কাজ W = PΔV = (${toBnDigits(ib.pKpa)}×১০³ Pa) × (${toBnDigits(ib.dVl)}×১০⁻³ m³) = ${toBnDigits(ib.w)} J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · সমচাপ প্রক্রিয়ায় কাজ',
      })
    );
  });

  // 1B: Heat Engine Efficiency from Q1 and Q2 (24 MCQs)
  [
    { q1: 1000, q2: 600 },
    { q1: 1000, q2: 750 },
    { q1: 2000, q2: 1200 },
    { q1: 1500, q2: 900 },
    { q1: 800, q2: 600 },
    { q1: 1200, q2: 900 },
    { q1: 2500, q2: 1500 },
    { q1: 4000, q2: 3000 },
    { q1: 5000, q2: 3000 },
    { q1: 3000, q2: 2400 },
    { q1: 2000, q2: 1500 },
    { q1: 1000, q2: 800 },
  ].forEach((he, idx) => {
    const w = he.q1 - he.q2;
    const eff = Number(((w / he.q1) * 100).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি তাপ ইঞ্জিন প্রতি চক্রে উৎস থেকে ${toBnDigits(he.q1)} J তাপ গ্রহণ করে এবং তাপগ্রাহকে ${toBnDigits(he.q2)} J তাপ বর্জন করলে ইঞ্জিনটির কর্মদক্ষতা কত?`,
        correct: `${toBnDigits(eff)}%`,
        distractors: [100 - eff, eff + 15, eff / 2, eff + 30]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x <= 100 && x !== eff)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}%`),
        explanation: `দক্ষতা η = (Q₁ - Q₂)/Q₁ × ১০০% = (${toBnDigits(w)}/${toBnDigits(he.q1)}) × ১০০% = ${toBnDigits(eff)}%।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপ ইঞ্জিনের দক্ষতা',
      })
    );
  });

  // =========================================================================
  // 2. Ch 2: Electric Field, Potential, Capacitance & Charge (~88 MCQs)
  // =========================================================================
  // 2A: Point Charge Electric Potential V = 9e9 * Q / r & Field E = 9e9 * Q / r^2 (36 MCQs)
  [
    { qUc: 2, r: 3 },
    { qUc: 4, r: 2 },
    { qUc: 5, r: 3 },
    { qUc: 8, r: 4 },
    { qUc: 10, r: 5 },
    { qUc: 6, r: 3 },
    { qUc: 12, r: 6 },
    { qUc: 16, r: 4 },
    { qUc: 9, r: 3 },
    { qUc: 20, r: 10 },
  ].forEach((pc, idx) => {
    const vKv = (9 * pc.qUc) / pc.r; // in kV
    const eKvM = (9 * pc.qUc) / (pc.r * pc.r); // in kV/m
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `শূন্যস্থানে অবস্থিত ${toBnDigits(pc.qUc)} μC মানের একটি বিন্দু চার্জ থেকে ${toBnDigits(pc.r)} m দূরে তড়িৎ বিভব (V) কত kV (কিলোভোল্ট)?`,
        correct: `${toBnDigits(vKv)} kV`,
        distractors: [vKv * 2, vKv / 2, vKv + 8, vKv + 15]
          .filter((x) => x > 0 && x !== vKv)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} kV`),
        explanation: `V = (৯×১০⁹ × ${toBnDigits(pc.qUc)}×১০⁻⁶) / ${toBnDigits(pc.r)} = ${toBnDigits(vKv)}×১০³ V = ${toBnDigits(vKv)} kV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · বিন্দু চার্জের বিভব',
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
        question: `শূন্যস্থানে ${toBnDigits(pc.qUc)} μC চার্জ হতে ${toBnDigits(pc.r)} m দূরত্বে তড়িৎ ক্ষেত্রের প্রাবল্য (E) কত kN/C?`,
        correct: `${toBnDigits(eKvM)} kN/C`,
        distractors: [eKvM * 2, eKvM / 2, eKvM + 5, eKvM + 12]
          .filter((x) => x > 0 && x !== eKvM)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} kN/C`),
        explanation: `E = (৯×১০⁹ × ${toBnDigits(pc.qUc)}×১০⁻⁶) / ${toBnDigits(pc.r)}² = ${toBnDigits(eKvM)} kN/C।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · তড়িৎ প্রাবল্য',
      })
    );
  });

  // 2B: Capacitor Charge Q = C * V & Energy in terms of Q and C: U = Q^2 / (2C) (36 MCQs)
  [
    { cUf: 2, v: 50 },
    { cUf: 4, v: 100 },
    { cUf: 5, v: 200 },
    { cUf: 10, v: 50 },
    { cUf: 8, v: 25 },
    { cUf: 20, v: 100 },
    { cUf: 12, v: 50 },
    { cUf: 15, v: 20 },
    { cUf: 25, v: 40 },
    { cUf: 50, v: 10 },
    { cUf: 100, v: 20 },
    { cUf: 6, v: 50 },
  ].forEach((cq, idx) => {
    const qMc = (cq.cUf * cq.v) / 1000; // in mC
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(cq.cUf)} μF ধারকত্বের একটি ধারককে ${toBnDigits(cq.v)} V ব্যাটারির সাথে সংযুক্ত করলে ধারকে সঞ্চিত চার্জের পরিমাণ কত মিলিকুলম্ব (mC)?`,
        correct: `${toBnDigits(qMc)} mC`,
        distractors: [qMc * 2, qMc / 2, Number((qMc + 0.3).toFixed(2)), Number((qMc + 1.5).toFixed(2))]
          .filter((x) => x > 0 && x !== qMc)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mC`),
        explanation: `Q = CV = ${toBnDigits(cq.cUf)}×১০⁻⁶ × ${toBnDigits(cq.v)} = ${toBnDigits(qMc)}×১০⁻³ C = ${toBnDigits(qMc)} mC।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকের চার্জ',
      })
    );
  });

  // =========================================================================
  // 3. Ch 3: Current Electricity — Temperature Coefficient, Joule Heating, Potentiometer (~80 MCQs)
  // =========================================================================
  // 3A: Resistance Temperature Coefficient Rt = R0(1 + alpha * dt) (16 MCQs)
  [
    { r0: 10, alpha: 0.004, dt: 50 },
    { r0: 20, alpha: 0.005, dt: 100 },
    { r0: 100, alpha: 0.004, dt: 50 },
    { r0: 50, alpha: 0.004, dt: 100 },
    { r0: 10, alpha: 0.005, dt: 200 },
    { r0: 25, alpha: 0.004, dt: 100 },
    { r0: 40, alpha: 0.005, dt: 50 },
    { r0: 80, alpha: 0.005, dt: 100 },
  ].forEach((rt, idx) => {
    const rFinal = Number((rt.r0 * (1 + rt.alpha * rt.dt)).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `০°C তাপমাত্রায় একটি তারের রোধ ${toBnDigits(rt.r0)} Ω এবং রোধের উষ্ণতা সহগ α = ${toBnDigits(rt.alpha)} /°C হলে ${toBnDigits(rt.dt)}°C তাপমাত্রায় তারটির রোধ কত Ω হবে?`,
        correct: `${toBnDigits(rFinal)} Ω`,
        distractors: [rt.r0, rFinal + 4, rFinal * 2, rFinal - 3]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== rFinal)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `R_t = R₀(1 + αt) = ${toBnDigits(rt.r0)}(১ + ${toBnDigits(rt.alpha)}×${toBnDigits(rt.dt)}) = ${toBnDigits(rFinal)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · রোধের উষ্ণতা সহগ',
      })
    );
  });

  // 3B: Joule Heating H = I^2 R t (24 MCQs)
  [
    { I: 2, R: 10, t: 5 },
    { I: 3, R: 5, t: 10 },
    { I: 4, R: 5, t: 20 },
    { I: 5, R: 4, t: 10 },
    { I: 2, R: 25, t: 10 },
    { I: 10, R: 2, t: 5 },
    { I: 3, R: 10, t: 20 },
    { I: 5, R: 10, t: 10 },
    { I: 4, R: 10, t: 15 },
    { I: 6, R: 5, t: 10 },
    { I: 2, R: 15, t: 30 },
    { I: 5, R: 8, t: 5 },
  ].forEach((jh, idx) => {
    const H = jh.I * jh.I * jh.R * jh.t;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(jh.R)} Ω রোধের একটি পরিবাহীর মধ্য দিয়ে ${toBnDigits(jh.I)} A তড়িৎ ${toBnDigits(jh.t)} সেকেন্ড প্রবাহিত হলে উৎপন্ন তাপশক্তি কত জুল?`,
        correct: `${toBnDigits(H)} J`,
        distractors: [H / 2, H * 2, jh.I * jh.R * jh.t, H + 150]
          .filter((x) => x > 0 && x !== H)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `জুলের সূত্র H = I²Rt = (${toBnDigits(jh.I)})² × ${toBnDigits(jh.R)} × ${toBnDigits(jh.t)} = ${toBnDigits(H)} J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · জুলের তাপন ক্রিয়া',
      })
    );
  });

  // 3C: Three Equal Resistors Series vs Parallel (24 MCQs)
  [3, 6, 9, 12, 15, 18, 21, 24, 30, 36, 45, 60].forEach((rVal, idx) => {
    const rPar = rVal / 3;
    const rSer = rVal * 3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `প্রতিটি ${toBnDigits(rVal)} Ω মানের ৩টি সমান রোধকে সমান্তরালে যুক্ত করলে তুল্য রোধ কত Ω হবে?`,
        correct: `${toBnDigits(rPar)} Ω`,
        distractors: [rVal, rSer, rPar * 2, rPar + 5]
          .filter((x) => x !== rPar)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `nটি সমান রোধের সমান্তরাল সমবায়ে R_p = R/n = ${toBnDigits(rVal)}/৩ = ${toBnDigits(rPar)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · সমান রোধের সমান্তরাল সমবায়',
      })
    );
  });

  // 3D: Potentiometer EMF comparison E1/E2 = l1/l2 (12 MCQs)
  [
    { e1: 1.5, l1: 60, l2: 80, e2: 2.0 },
    { e1: 2.0, l1: 50, l2: 75, e2: 3.0 },
    { e1: 1.2, l1: 40, l2: 50, e2: 1.5 },
    { e1: 3.0, l1: 60, l2: 40, e2: 2.0 },
    { e1: 1.5, l1: 30, l2: 90, e2: 4.5 },
    { e1: 2.4, l1: 80, l2: 50, e2: 1.5 },
    { e1: 4.0, l1: 80, l2: 60, e2: 3.0 },
    { e1: 1.8, l1: 45, l2: 60, e2: 2.4 },
  ].forEach((pt, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `পোটেনশিওমিটারের সাহায্যে দুটি কোষের তড়িচ্চালক শক্তি তুলনা করার সময় ${toBnDigits(pt.e1)} V-এর কোষের জন্য নাল বিন্দু ${toBnDigits(pt.l1)} cm পাওয়া গেল। দ্বিতীয় কোষের জন্য নাল বিন্দু ${toBnDigits(pt.l2)} cm হলে এর EMF কত V?`,
        correct: `${toBnDigits(pt.e2)} V`,
        distractors: [pt.e1, pt.e2 * 2, Number((pt.e2 / 2).toFixed(2)), Number((pt.e2 + 0.8).toFixed(2))]
          .filter((x) => x !== pt.e2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `E₁/E₂ = l₁/l₂ => E₂ = ${toBnDigits(pt.e1)} × (${toBnDigits(pt.l2)}/${toBnDigits(pt.l1)}) = ${toBnDigits(pt.e2)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · পোটেনশিওমিটার',
      })
    );
  });

  // =========================================================================
  // 4. Ch 4: Magnetism — Circular Coil, Solenoid & Parallel Wires (~68 MCQs)
  // =========================================================================
  // 4A: Circular coil center B = mu0 * N * I / (2 r) (in pi * 10^-5 T or exact numeric with pi)
  [
    { I: 2, rCm: 10, N: 5, bStr: '২π × ১০⁻⁵ T' },
    { I: 4, rCm: 10, N: 10, bStr: '৮π × ১০⁻⁵ T' },
    { I: 5, rCm: 20, N: 10, bStr: '৫π × ১০⁻⁵ T' },
    { I: 10, rCm: 25, N: 5, bStr: '৪π × ১০⁻⁵ T' },
    { I: 2, rCm: 5, N: 10, bStr: '৮π × ১০⁻⁵ T (২)' },
    { I: 3, rCm: 10, N: 10, bStr: '৬π × ১০⁻⁵ T' },
    { I: 1, rCm: 10, N: 5, bStr: 'π × ১০⁻⁵ T' },
    { I: 5, rCm: 10, N: 10, bStr: '১০π × ১০⁻⁵ T' },
  ].forEach((cc, idx) => {
    const cleanB = cc.bStr.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(cc.rCm)} cm ব্যাসার্ধ ও ${toBnDigits(cc.N)} পাকের একটি বৃত্তাকার কুণ্ডলীর মধ্য দিয়ে ${toBnDigits(cc.I)} A তড়িৎ প্রবাহিত হলে কুণ্ডলীর কেন্দ্রে সৃষ্ট চৌম্বক ক্ষেত্রের মান কত?`,
        correct: cleanB,
        distractors: ['π × ১০⁻⁵ T', '২π × ১০⁻⁵ T', '৪π × ১০⁻⁵ T', '৫π × ১০⁻⁵ T', '৬π × ১০⁻⁵ T', '৮π × ১০⁻⁵ T', '১০π × ১০⁻⁵ T']
          .filter((x) => x !== cleanB)
          .slice(0, 4),
        explanation: `B = (μ₀NI)/(2r) = (৪π×১০⁻⁷ × ${toBnDigits(cc.N)} × ${toBnDigits(cc.I)}) / (২ × ${toBnDigits(cc.rCm / 100)}) = ${cleanB}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · বৃত্তাকার কুণ্ডলীর চৌম্বক ক্ষেত্র',
      })
    );
  });

  // 4B: Parallel current wires force per unit length F/L = 2e-7 * I1 * I2 / d (16 MCQs)
  [
    { i1: 5, i2: 4, dCm: 10, fUn: 40 },
    { i1: 10, i2: 5, dCm: 10, fUn: 100 },
    { i1: 10, i2: 10, dCm: 20, fUn: 100 },
    { i1: 2, i2: 5, dCm: 10, fUn: 20 },
    { i1: 6, i2: 5, dCm: 10, fUn: 60 },
    { i1: 8, i2: 5, dCm: 10, fUn: 80 },
    { i1: 10, i2: 15, dCm: 10, fUn: 300 },
    { i1: 4, i2: 10, dCm: 20, fUn: 40 },
  ].forEach((pw, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `শূন্যস্থানে ${toBnDigits(pw.dCm)} cm ব্যবধানে দুটি সমান্তরাল দীর্ঘ তারে একই দিকে যথাক্রমে ${toBnDigits(pw.i1)} A ও ${toBnDigits(pw.i2)} A তড়িৎ প্রবাহিত হলে তার দুটির প্রতি মিটার দৈর্ঘ্যে ক্রিয়াশীল আকর্ষণ বল কত μN/m?`,
        correct: `${toBnDigits(pw.fUn)} μN/m`,
        distractors: [pw.fUn * 2, pw.fUn / 2, pw.fUn + 25, pw.fUn + 50]
          .filter((x) => x !== pw.fUn)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μN/m`),
        explanation: `F/L = (২×১০⁻⁷ × ${toBnDigits(pw.i1)} × ${toBnDigits(pw.i2)}) / ${toBnDigits(pw.dCm / 100)} = ${toBnDigits(pw.fUn)}×১০⁻⁶ N/m = ${toBnDigits(pw.fUn)} μN/m।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · সমান্তরাল পরিবাহীর মধ্যকার বল',
      })
    );
  });

  // 4C: Magnetic Dipole Moment M = N I A & Solenoid B = mu0 * n * I (20 MCQs)
  [
    { N: 50, I: 2, A: 0.04, M: 4 },
    { N: 100, I: 4, A: 0.05, M: 20 },
    { N: 200, I: 5, A: 0.01, M: 10 },
    { N: 40, I: 5, A: 0.02, M: 4 },
    { N: 150, I: 2, A: 0.02, M: 6 },
    { N: 100, I: 3, A: 0.03, M: 9 },
    { N: 500, I: 2, A: 0.01, M: 10 },
    { N: 80, I: 5, A: 0.025, M: 10 },
  ].forEach((dm, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `${toBnDigits(dm.N)} পাক ও ${toBnDigits(dm.A)} m² প্রস্থচ্ছেদের একটি কুণ্ডলীতে ${toBnDigits(dm.I)} A তড়িৎ প্রবাহিত হলে কুণ্ডলীটির চৌম্বক দ্বিমেরু ভ্রামক (M) কত A·m²?`,
        correct: `${toBnDigits(dm.M)} A·m²`,
        distractors: [dm.M * 2, dm.M / 2, dm.M + 3, dm.N * dm.I]
          .filter((x) => x > 0 && x !== dm.M)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} A·m²`),
        explanation: `চৌম্বক ভ্রামক M = NIA = ${toBnDigits(dm.N)} × ${toBnDigits(dm.I)} × ${toBnDigits(dm.A)} = ${toBnDigits(dm.M)} A·m²।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · চৌম্বক ভ্রামক',
      })
    );
  });

  // =========================================================================
  // 5. Ch 5: Flux, Self Inductance EMF, Reactances & AC (~96 MCQs)
  // =========================================================================
  // 5A: Magnetic Flux Phi = B A cos(theta) (24 MCQs)
  [
    { B: 0.5, A: 4, deg: 0, phi: 2.0 },
    { B: 0.4, A: 5, deg: 60, phi: 1.0 },
    { B: 0.8, A: 2, deg: 60, phi: 0.8 },
    { B: 1.2, A: 0.5, deg: 0, phi: 0.6 },
    { B: 2.0, A: 3, deg: 60, phi: 3.0 },
    { B: 0.6, A: 5, deg: 60, phi: 1.5 },
    { B: 1.5, A: 2, deg: 0, phi: 3.0 },
    { B: 0.5, A: 6, deg: 90, phi: 0 },
    { B: 1.0, A: 4, deg: 60, phi: 2.0 },
    { B: 0.25, A: 8, deg: 0, phi: 2.0 },
  ].forEach((fl, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(fl.A)} m² ক্ষেত্রফলের একটি তল ${toBnDigits(fl.B)} T সুষম চৌম্বক ক্ষেত্রের সাথে তলের অভিলম্ব ${toBnDigits(fl.deg)}° কোণ উৎপন্ন করলে তলটির মধ্য দিয়ে অতিক্রান্ত চৌম্বক ফ্লাক্স কত ওয়েবার (Wb)?`,
        correct: `${toBnDigits(fl.phi)} Wb`,
        distractors: [fl.B * fl.A + 0.5, fl.phi === 0 ? 3.0 : fl.phi * 2, fl.phi === 0 ? 1.5 : fl.phi / 2, fl.phi + 2.5]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x !== fl.phi)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Wb`),
        explanation: `চৌম্বক ফ্লাক্স Φ = BA cosθ = ${toBnDigits(fl.B)} × ${toBnDigits(fl.A)} × cos(${toBnDigits(fl.deg)}°) = ${toBnDigits(fl.phi)} Wb।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · চৌম্বক ফ্লাক্স',
      })
    );
  });

  // 5B: Self-inductance EMF E = L * (dI / dt) (20 MCQs)
  [
    { L: 0.5, dI: 4, dt: 0.1 },
    { L: 2.0, dI: 5, dt: 0.5 },
    { L: 0.4, dI: 10, dt: 0.2 },
    { L: 1.5, dI: 6, dt: 0.3 },
    { L: 0.2, dI: 15, dt: 0.1 },
    { L: 4.0, dI: 3, dt: 0.2 },
    { L: 0.8, dI: 5, dt: 0.4 },
    { L: 3.0, dI: 4, dt: 0.2 },
    { L: 1.0, dI: 8, dt: 0.2 },
    { L: 5.0, dI: 2, dt: 0.5 },
  ].forEach((si, idx) => {
    const emf = Number(((si.L * si.dI) / si.dt).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(si.L)} H স্বকীয় আবেশ গুণাঙ্কের একটি কুণ্ডলীতে ${toBnDigits(si.dt)} s সময়ে তড়িৎ প্রবাহ ${toBnDigits(si.dI)} A পরিবর্তিত হলে আবিষ্ট তড়িচ্চালক শক্তির মান কত V?`,
        correct: `${toBnDigits(emf)} V`,
        distractors: [emf * 2, emf / 2, emf + 5, emf + 12]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== emf)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `|E| = L (ΔI/Δt) = ${toBnDigits(si.L)} × (${toBnDigits(si.dI)}/${toBnDigits(si.dt)}) = ${toBnDigits(emf)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · স্বকীয় আবেশ',
      })
    );
  });

  // 5C: Inductive reactance XL = 2pi f L & AC Peak/RMS current I_rms = I0 / sqrt(2) (24 MCQs)
  [
    { f: 50, L: 0.1, xlStr: '১০π Ω' },
    { f: 50, L: 0.2, xlStr: '২০π Ω' },
    { f: 50, L: 0.5, xlStr: '৫০π Ω' },
    { f: 100, L: 0.2, xlStr: '৪০π Ω' },
    { f: 100, L: 0.5, xlStr: '১০০π Ω' },
    { f: 60, L: 0.5, xlStr: '৬০π Ω' },
    { f: 50, L: 1.0, xlStr: '১০০π Ω (২)' },
    { f: 25, L: 0.4, xlStr: '২০π Ω (২)' },
  ].forEach((xl, idx) => {
    const cleanXl = xl.xlStr.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(xl.f)} Hz কম্পাঙ্কের পরিবর্তী প্রবাহের পথে ${toBnDigits(xl.L)} H আবেশ গুণাঙ্কের একটি আবেশক যুক্ত করলে আবেশকীয় প্রতিঘাত (X_L) কত হবে?`,
        correct: cleanXl,
        distractors: ['৫π Ω', '১০π Ω', '২০π Ω', '৪০π Ω', '৫০π Ω', '৬০π Ω', '১০০π Ω']
          .filter((x) => x !== cleanXl)
          .slice(0, 4),
        explanation: `X_L = 2πfL = ২π × ${toBnDigits(xl.f)} × ${toBnDigits(xl.L)} = ${cleanXl}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · আবেশকীয় প্রতিঘাত',
      })
    );
  });

  [
    { i0Str: '১০√২', irms: 10, iavg: 9 },
    { i0Str: '২০√২', irms: 20, iavg: 18 },
    { i0Str: '৫√২', irms: 5, iavg: 4.5 },
    { i0Str: '১৫√২', irms: 15, iavg: 13.5 },
    { i0Str: '৫০√২', irms: 50, iavg: 45 },
    { i0Str: '১০০√২', irms: 100, iavg: 90 },
  ].forEach((ac, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি দিক পরিবর্তী প্রবাহের সমীকরণ I = ${ac.i0Str} sin(১০০πt) A হলে প্রবাহটির কার্যকর মান (I_rms) কত অ্যাম্পিয়ার?`,
        correct: `${toBnDigits(ac.irms)} A`,
        distractors: [ac.irms * 2, ac.irms / 2, ac.iavg, ac.irms + 12]
          .filter((x) => x !== ac.irms)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} A`),
        explanation: `I_rms = I₀/√২ = ${ac.i0Str}/√২ = ${toBnDigits(ac.irms)} A।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · দিক পরিবর্তী প্রবাহের কার্যকর মান',
      })
    );
  });

  return list;
}
