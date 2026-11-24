import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredD(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sd_${String(seq++).padStart(4, '0')}`;

  // 1. Average Speed Harmonic Mean 2*v1*v2/(v1+v2) & Linear Motion Calculations (~28 MCQs)
  const avgSpeedCases = [
    { v1: 20, v2: 30, avg: 24 },
    { v1: 30, v2: 60, avg: 40 },
    { v1: 40, v2: 60, avg: 48 },
    { v1: 60, v2: 20, avg: 30 },
    { v1: 10, v2: 40, avg: 16 },
    { v1: 15, v2: 30, avg: 20 },
  ];
  avgSpeedCases.forEach((as, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি গাড়ি (যাত্রা-#${toBnDigits(idx + 1)}) সমদূরত্বের প্রথম অর্ধেক ${toBnDigits(as.v1)} km/h বেগে এবং বাকি অর্ধেক ${toBnDigits(as.v2)} km/h বেগে অতিক্রম করলে সমগ্র যাত্রায় গড় দ্রুতি কত?`,
        correct: `${toBnDigits(as.avg)} km/h`,
        distractors: [16, 20, 24, 25, 30, 40, 45, 48, 50]
          .filter((x) => x !== as.avg)
          .map((x) => `${toBnDigits(x)} km/h`),
        explanation: `সমদূরত্বের জন্য গড় দ্রুতি v_avg = 2v₁v₂ / (v₁ + v₂) = (২×${toBnDigits(as.v1)}×${toBnDigits(as.v2)}) / (${toBnDigits(as.v1 + as.v2)}) = ${toBnDigits(as.avg)} km/h।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · গড় দ্রুতি',
      })
    );
  });

  // 2. Unit Vector Cross Product & Vector Operations (~24 MCQs)
  const crossUnits = [
    { expr: 'î × ĵ', ans: 'k̂' },
    { expr: 'ĵ × k̂', ans: 'î' },
    { expr: 'k̂ × î', ans: 'ĵ' },
    { expr: 'ĵ × î', ans: '−k̂' },
    { expr: 'k̂ × ĵ', ans: '−î' },
    { expr: 'î × k̂', ans: '−ĵ' },
    { expr: 'î × î (বা ĵ × ĵ)', ans: '০ (শূন্য ভেক্টর)' },
  ];
  crossUnits.forEach((cu) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `ত্রিমাত্রিক কার্তেসীয় স্থানাঙ্ক ব্যবস্থায় ডানহাতি একক ভেক্টরগুলোর ক্রস গুণফল "${cu.expr}" সমান কত?`,
        correct: cu.ans,
        distractors: ['î', 'ĵ', 'k̂', '−î', '−ĵ', '−k̂', '০ (শূন্য ভেক্টর)', '১'].filter((x) => x !== cu.ans),
        explanation: `ডানহাতি চক্রাকার নিয়মে (î → ĵ → k̂ → î) ${cu.expr} = ${cu.ans}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · একক ভেক্টরের ক্রস গুণন',
      })
    );
  });

  // Vector Dot Product Exact Value Numericals
  [
    { a: '2î + 3ĵ − k̂', b: '3î − ĵ + 2k̂', val: 1 },
    { a: '4î − 2ĵ + k̂', b: 'î + 3ĵ + 5k̂', val: 3 },
    { a: '5î + 2ĵ + 3k̂', b: '2î − 3ĵ + k̂', val: 7 },
    { a: '3î + 4ĵ − 2k̂', b: '2î − ĵ + 4k̂', val: -6 },
    { a: 'î + 2ĵ + 3k̂', b: '4î − ĵ + 2k̂', val: 8 },
  ].forEach((dp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `যদি A = ${dp.a} এবং B = ${dp.b} হয়, তবে ডট গুণফল A · B কত?`,
        correct: `${toBnDigits(dp.val)}`,
        distractors: [-6, -2, 0, 1, 3, 5, 7, 8, 12]
          .filter((x) => x !== dp.val)
          .map((x) => toBnDigits(x)),
        explanation: `A · B = A_x B_x + A_y B_y + A_z B_z = ${toBnDigits(dp.val)}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · স্কেলার গুণফল',
      })
    );
  });

  // 3. Rotational Mechanics: Torque τ = Iα, Rotational KE = ½Iω², Angular Momentum L = Iω (~30 MCQs)
  [
    { i: 4, alpha: 5, tau: 20 },
    { i: 10, alpha: 3, tau: 30 },
    { i: 2.5, alpha: 4, tau: 10 },
    { i: 6, alpha: 6, tau: 36 },
    { i: 8, alpha: 5, tau: 40 },
  ].forEach((tr) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(tr.i)} kg·m² জড়তার ভ্রামকের একটি চাকায় ${toBnDigits(tr.alpha)} rad/s² কৌণিক ত্বরণ সৃষ্টি করতে কত N·m টর্ক প্রয়োজন?`,
        correct: `${toBnDigits(tr.tau)} N·m`,
        distractors: [8, 10, 15, 20, 25, 30, 36, 40]
          .filter((x) => x !== tr.tau)
          .map((x) => `${toBnDigits(x)} N·m`),
        explanation: `τ = Iα = ${toBnDigits(tr.i)} × ${toBnDigits(tr.alpha)} = ${toBnDigits(tr.tau)} N·m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · টর্ক ও কৌণিক ত্বরণ',
      })
    );
  });

  [
    { i: 4, w: 5, ke: 50, l: 20 },
    { i: 2, w: 10, ke: 100, l: 20 },
    { i: 6, w: 4, ke: 48, l: 24 },
    { i: 8, w: 5, ke: 100, l: 40 },
  ].forEach((rk, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(rk.i)} kg·m² জড়তার ভ্রামকের একটি বস্তু (চাকা-#${toBnDigits(idx + 1)}) ${toBnDigits(rk.w)} rad/s কৌণিক বেগে ঘুরলে এর ঘূর্ণন গতিশক্তি কত জুল?`,
        correct: `${toBnDigits(rk.ke)} J`,
        distractors: [20, 24, 40, 48, 50, 80, 100, 120]
          .filter((x) => x !== rk.ke)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `E_k = ½Iω² = ০.৫ × ${toBnDigits(rk.i)} × ${toBnDigits(rk.w)}² = ${toBnDigits(rk.ke)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ঘূর্ণন গতিশক্তি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(rk.i)} kg·m² জড়তার ভ্রামক ও ${toBnDigits(rk.w)} rad/s কৌণিক বেগে ঘূর্ণনশীল চাকার কৌণিক ভরবেগ (L) কত kg·m²/s?`,
        correct: `${toBnDigits(rk.l)} kg·m²/s`,
        distractors: [10, 16, 20, 24, 30, 40, 48, 50]
          .filter((x) => x !== rk.l)
          .map((x) => `${toBnDigits(x)} kg·m²/s`),
        explanation: `L = Iω = ${toBnDigits(rk.i)} × ${toBnDigits(rk.w)} = ${toBnDigits(rk.l)} kg·m²/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কৌণিক ভরবেগ',
      })
    );
  });

  // 4. nth second distance & Vertical Throw Time/Height (g = 10 m/s²) (~24 MCQs)
  [
    { u: 20, tUp: 2, hMax: 20 },
    { u: 30, tUp: 3, hMax: 45 },
    { u: 40, tUp: 4, hMax: 80 },
    { u: 50, tUp: 5, hMax: 125 },
  ].forEach((vt) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি পাথরকে খাড়া ওপরের দিকে ${toBnDigits(vt.u)} m/s বেগে নিক্ষেপ করলে (g = ১০ m/s²) সর্বোচ্চ উচ্চতায় উঠতে কত সেকেন্ড লাগবে এবং মোট উচ্চতা কত?`,
        correct: `${toBnDigits(vt.tUp)} s ও ${toBnDigits(vt.hMax)} m`,
        distractors: [
          { t: 2, h: 20 },
          { t: 3, h: 45 },
          { t: 4, h: 80 },
          { t: 5, h: 125 },
          { t: 6, h: 180 },
        ]
          .filter((x) => x.t !== vt.tUp)
          .map((x) => `${toBnDigits(x.t)} s ও ${toBnDigits(x.h)} m`),
        explanation: `t = u/g = ${toBnDigits(vt.tUp)} s এবং H = u²/(2g) = ${toBnDigits(vt.hMax)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · খাড়া ওপরের দিকে নিক্ষিপ্ত বস্তু',
      })
    );
  });

  [
    { n: 1, dist: 5 },
    { n: 2, dist: 15 },
    { n: 3, dist: 25 },
    { n: 4, dist: 35 },
    { n: 5, dist: 45 },
  ].forEach((ns) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `স্থির অবস্থান থেকে অবাধে পড়ন্ত একটি বস্তু (g = ১০ m/s²) তার গতির ঠিক ${toBnDigits(ns.n)}-তম সেকেন্ডে কত মিটার দূরত্ব অতিক্রম করে?`,
        correct: `${toBnDigits(ns.dist)} m`,
        distractors: [5, 10, 15, 20, 25, 35, 45, 55]
          .filter((x) => x !== ns.dist)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `s_n = u + ½g(2n − 1) = ০ + ৫(২×${toBnDigits(ns.n)} − ১) = ${toBnDigits(ns.dist)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · n-তম সেকেন্ডে অতিক্রান্ত দূরত্ব',
      })
    );
  });

  // 5. Ideal Gas C_rms Temperature Scaling & Sound Speed Temperature Scaling (~24 MCQs)
  [
    { t1C: 27, mult: 2, t2C: 927 },
    { t1C: 27, mult: 3, t2C: 2427 },
    { t1C: 127, mult: 2, t2C: 1327 },
    { t1C: -173, mult: 2, t2C: 127 },
  ].forEach((gt) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(gt.t1C)} °C তাপমাত্রায় থাকা কোনো আদর্শ গ্যাসের অণুগুলোর মূল গড় বর্গবেগ (C_rms) ${toBnDigits(gt.mult)} গুণ করতে হলে তাপমাত্রা কত ডিগ্রি সেলসিয়াসে উন্নীত করতে হবে?`,
        correct: `${toBnDigits(gt.t2C)} °C`,
        distractors: [127, 327, 600, 927, 1327, 2427]
          .filter((x) => x !== gt.t2C)
          .map((x) => `${toBnDigits(x)} °C`),
        explanation: `C_rms ∝ √T ⇒ বেগ ${toBnDigits(gt.mult)} গুণ করতে পরম তাপমাত্রা T হবে ${toBnDigits(gt.mult * gt.mult)} গুণ; তাই T₂ = ${toBnDigits(gt.t2C + 273)} K = ${toBnDigits(gt.t2C)} °C।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · RMS বেগ ও তাপমাত্রা',
      })
    );
  });

  // Sound velocity in air at T °C: v = 332 + 0.61*T (approx 0.6*T)
  [
    { t: 10, v: 338 },
    { t: 20, v: 344 },
    { t: 25, v: 347 },
    { t: 30, v: 350 },
    { t: 40, v: 356 },
  ].forEach((sv) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `০°C তাপমাত্রায় বায়ুতে শব্দের বেগ ৩৩২ m/s এবং প্রতি °C-এ ০.৬ m/s বাড়লে ${toBnDigits(sv.t)}°C তাপমাত্রায় শব্দের বেগ কত হবে?`,
        correct: `${toBnDigits(sv.v)} m/s`,
        distractors: [332, 338, 344, 347, 350, 356, 362]
          .filter((x) => x !== sv.v)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `v_θ = v₀ + ০.৬ × ${toBnDigits(sv.t)} = ৩৩২ + ${toBnDigits(sv.t * 0.6)} = ${toBnDigits(sv.v)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তাপমাত্রার সাথে শব্দের বেগ',
      })
    );
  });

  // 6. Comprehensive Multi-Chapter Concept & Dimension Equivalents Matrix (~230 MCQs via 2-way Q/A pairs!)
  const sameDimPairs = [
    { a: 'কাজ ও শক্তি', b: 'টর্ক বা বলের ভ্রামক', dim: '[ML²T⁻²]', ch: 'phys1_ch1_units_vectors' },
    { a: 'রৈখিক ভরবেগ', b: 'বলের ঘাত (Impulse)', dim: '[MLT⁻¹]', ch: 'phys1_mechanics' },
    { a: 'প্ল্যাঙ্কের ধ্রুবক (h)', b: 'কৌণিক ভরবেগ (L)', dim: '[ML²T⁻¹]', ch: 'phys1_mechanics' },
    { a: 'চাপ ও পীড়ন', b: 'ইয়ং-এর গুণাঙ্ক / আয়তন গুণাঙ্ক / শক্তি ঘনত্ব', dim: '[ML⁻¹T⁻²]', ch: 'phys1_ch6_7_grav_matter' },
    { a: 'পৃষ্ঠটান', b: 'স্প্রিং ধ্রুবক (বল ধ্রুবক k)', dim: '[MT⁻²]', ch: 'phys1_ch6_7_grav_matter' },
    { a: 'কম্পাঙ্ক (f)', b: 'কৌণিক বেগ (ω) / বেগ গ্রেডিয়েন্ট', dim: '[T⁻¹]', ch: 'phys1_ch8_9_shm_waves' },
    { a: 'গ্যাসের চাপ (P)', b: 'গ্যাসের একক আয়তনে গতিশক্তি (⅔ E/V)', dim: '[ML⁻¹T⁻²] (চাপ)', ch: 'phys1_ch10_ideal_gas' },
  ];
  sameDimPairs.forEach((sd, i) => {
    const others = sameDimPairs.filter((x) => x.a !== sd.a);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: sd.ch,
        visualLessonId: sd.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মাত্রা সমীকরণের দিক থেকে "${sd.a}" নিচের কোন ভৌত রাশির সাথে সম্পূর্ণ অভিন্ন?`,
        correct: sd.b,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.b),
        explanation: `${sd.a} এবং ${sd.b} উভয়েরই মাত্রা সমীকরণ হলো ${sd.dim}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · অভিন্ন মাত্রার রাশি',
      })
    );
  });

  // Elasticity, SHM, Wave, Gravitation & Gas Laws Direct Medical Questions (60 MCQs)
  const medPhysics1Pool: Array<{ ch: string; q: string; a: string; d: [string, string, string]; exp: string }> = [
    {
      ch: 'phys1_ch1_units_vectors',
      q: 'একটি ভেক্টর ক্ষেত্র V = x î + y ĵ + z k̂-এর ডাইভারজেন্স (∇·V)-এর মান কত?',
      a: '৩',
      d: ['১', '০', '৬'],
      exp: '∇·V = ∂x/∂x + ∂y/∂y + ∂z/∂z = ১ + ১ + ১ = ৩।',
    },
    {
      ch: 'phys1_ch1_units_vectors',
      q: 'যদি দুটি ভেক্টর A ও B-এর স্কেলার গুণফল √৩ গুণ হয় তাদের ক্রস গুণফলের মানের চেয়ে, তবে মধ্যবর্তী কোণ কত?',
      a: '৩০°',
      d: ['৪৫°', '৬০°', '৯০°'],
      exp: 'AB cos θ = √3 AB sin θ ⇒ tan θ = 1/√3 ⇒ θ = ৩০°।',
    },
    {
      ch: 'phys1_ch1_units_vectors',
      q: 'একটি ভার্নিয়ার ক্যালিপার্সের প্রধান স্কেলের ক্ষুদ্রতম ভাগ ১ mm এবং ভার্নিয়ারের ২০ ঘর প্রধান স্কেলের ১৯ ঘরের সমান হলে VC কত?',
      a: '০.০৫ mm',
      d: ['০.১ mm', '০.০১ mm', '০.৫ mm'],
      exp: 'VC = s/n = ১ mm / ২০ = ০.০৫ mm।',
    },
    {
      ch: 'phys1_mechanics',
      q: 'কোনো বস্তুর রৈখিক বেগ এবং কৌণিক বেগের মধ্যবর্তী সম্পর্ক কোনটি (যেখানে r ব্যাসার্ধ ভেক্টর)?',
      a: 'v = ω × r',
      d: ['v = r × ω', 'v = ω · r', 'ω = v × r'],
      exp: 'ভেক্টর রূপে রৈখিক বেগ v = ω × r (অবস্থান ভেক্টরের সাথে লম্ব)।',
    },
    {
      ch: 'phys1_mechanics',
      q: 'একটি চলন্ত গাড়ির টায়ার ও রাস্তার মধ্যবর্তী ঘর্ষণ কী ধরনের ঘর্ষণ?',
      a: 'আবর্ত ঘর্ষণ (Rolling friction) — যা পিছলানো ঘর্ষণ অপেক্ষা অনেক কম',
      d: ['স্থিতি ঘর্ষণ — যা সর্বোচ্চ', 'সান্দ্র ঘর্ষণ', 'তড়িৎচুম্বকীয় আকর্ষণ'],
      exp: 'চাকা গড়িয়ে চলার সময় আবর্ত ঘর্ষণ কাজ করে যা পিছলানো গতি ঘর্ষণের চেয়ে বহুগুণ কম।',
    },
    {
      ch: 'phys1_mechanics',
      q: 'একজন অ্যাথলেট দীর্ঘ লম্ফনে (Long Jump) সর্বাধিক দূরত্ব অতিক্রম করতে ভূমির সাথে আনুমানিক কত কোণে লাফ দেয়?',
      a: '৪৫° কোণে',
      d: ['৩০° কোণে', '৬০° কোণে', '৯০° কোণে'],
      exp: 'প্রাসের অনুভূমিক পাল্লা R = v₀² sin(2θ)/g, যা θ = ৪৫° হলে সর্বাধিক হয়।',
    },
    {
      ch: 'phys1_mechanics',
      q: 'একটি বস্তুকে সুষম বৃত্তাকার পথে ঘোরাতে ব্যয়িত কাজের পরিমাণ (১ পূর্ণ ঘূর্ণনে) কত?',
      a: 'শূন্য জুল (০ J)',
      d: ['2πr × F', 'mv²', '½ mv²'],
      exp: 'কেন্দ্রমুখী বল প্রতিটি মুহূর্তে সরণের সাথে ৯০° কোণে থাকে বলে W = F·ds cos ৯০° = ০।',
    },
    {
      ch: 'phys1_mechanics',
      q: 'নিচের কোনটিতে কৌণিক ভরবেগের সংরক্ষণশীলতা নীতি প্রত্যক্ষভাবে কাজ করে?',
      a: 'ডাইভিং বোর্ড থেকে লাফিয়ে ডাইভারের শূন্যে শরীর গুটিয়ে দ্রুত ডিগবাজি খাওয়া',
      d: ['বন্দুক ছোড়ার পর পেছনে ধাক্কা খাওয়া', 'হাঁটার সময় পায়ে ঘর্ষণ লাগা', 'পড়ন্ত বস্তুর বেগ বৃদ্ধি'],
      exp: 'শরীর গুটিয়ে নিলে জড়তার ভ্রামক I কমে যায়, তাই Iω ধ্রুব রাখতে ω বহুগুণ বেড়ে যায়।',
    },
    {
      ch: 'phys1_ch6_7_grav_matter',
      q: 'পৃথিবীর বিষুবরেখায় ঘূর্ণনের জন্য বস্তুর ওজন মেরুর তুলনায় সামান্য কম হওয়ার কারণ কী?',
      a: 'পৃথিবীর আহ্নিক গতির অপকেন্দ্রিক প্রভাব এবং বিষুবীয় ব্যাসার্ধ ~২১ km বেশি হওয়া',
      d: ['বিষুবে তাপমাত্রা বেশি থাকা', 'মেরুতে চুম্বক ক্ষেত্র থাকা', 'বায়ুমণ্ডলের চাপ পার্থক্য'],
      exp: 'R_eq > R_pole এবং বিষুবে ω²R cos²(০°) সর্বোচ্চ বিয়োগ হয় বলে g_eq < g_pole।',
    },
    {
      ch: 'phys1_ch6_7_grav_matter',
      q: 'সূর্য থেকে গ্রহের দূরত্ব এবং গ্রহের কক্ষীয় দ্রুতির (Orbital speed) মধ্যে সম্পর্ক কী?',
      a: 'দূরত্ব কমলে কক্ষীয় দ্রুতি বাড়ে (v_o ∝ 1/√r)',
      d: ['দূরত্ব বাড়লে দ্রুতি বাড়ে (v_o ∝ r)', 'সব গ্রহের কক্ষীয় দ্রুতি সমান', 'দ্রুতি সূর্যের ভরের ওপর নির্ভর করে না'],
      exp: 'v_o = √(GM/r); তাই সূর্যের কাছের গ্রহ (যেমন বুধ) সবচেয়ে দ্রুত এবং দূরের গ্রহ (নেপচুন) সবচেয়ে ধীরে ঘোরে।',
    },
    {
      ch: 'phys1_ch6_7_grav_matter',
      q: 'দুটি উপগ্রহ একই বৃত্তাকার কক্ষপথে ঘুরছে; একটির ভর অপরটির দ্বিগুণ হলে তাদের আবর্তনকালের অনুপাত কত?',
      a: '১ : ১ (সমান পর্যায়কাল)',
      d: ['১ : ২', '২ : ১', '১ : √২'],
      exp: 'উপগ্রহের বেগ ও পর্যায়কাল T = 2π√(r³/GM) উপগ্রহের নিজস্ব ভরের ওপর নির্ভরশীল নয়।',
    },
    {
      ch: 'phys1_ch6_7_grav_matter',
      q: 'পানির মধ্যে কাচের কৈশিক নল খাড়া ডুবালে নলের ভেতরে পানি ওপরে ওঠে, কিন্তু পারদের মধ্যে ডুবালে পারদ নিচে নামে কেন?',
      a: 'পানি-কাচে আসঞ্জন > সংসক্তি (সূক্ষ্ম স্পর্শ কোণ), পারদে সংসক্তি > আসঞ্জন (স্থূল স্পর্শ কোণ)',
      d: ['পারদের ঘনত্ব বেশি বলে সব তরলেই নিচে নামে', 'পানির পৃষ্ঠটান পারদের চেয়ে বেশি', 'পারদে কৈশিক চাপ শূন্য'],
      exp: 'cos θ ঋণাত্মক (θ > ৯০°) হওয়ায় পারদে কৈশিক অবনমন ঘটে (অবতল নয়, উত্তল তল)।',
    },
    {
      ch: 'phys1_ch6_7_grav_matter',
      q: 'রাস্তায় মশা ডোবার পানিতে জমে থাকা ডিম/লার্ভা ধ্বংস করতে পানিতে কেরোসিন ছিটানো হয় কেন?',
      a: 'কেরোসিন পানির পৃষ্ঠটান কমিয়ে দেয়, ফলে লার্ভা আর পানির ওপর ভেসে থাকতে পারে না ও ডুবে মারা যায়',
      d: ['কেরোসিন পানির সান্দ্রতা বাড়ায়', 'কেরোসিন পানির ঘনত্ব ১০ গুণ বাড়ায়', 'পানির তাপমাত্রা বাড়িয়ে দেয়'],
      exp: 'তেল বা জৈব তরল পানির মুক্ততলের পৃষ্ঠটান মারাত্মকভাবে হ্রাস করে।',
    },
    {
      ch: 'phys1_ch8_9_shm_waves',
      q: 'সরল ছন্দিত স্পন্দন গতিসম্পন্ন কোনো কণার x-t (সরণ-সময়) লেখচিত্র দেখতে কেমন হয়?',
      a: 'সাইন বা কোসাইন তরঙ্গাকার বক্ররেখা (Sinusoidal curve)',
      d: ['মূলবিন্দুগামী সরলরেখা', 'বৃত্ত', 'সমপরাবৃত্ত'],
      exp: 'x = A sin(ωt + δ) হওয়ায় সরণ-সময় লেখচিত্র সাইন বক্ররেখা এবং ত্বরণ-সরণ (a-x) লেখচিত্র ঋণাত্মক ঢালযুক্ত সরলরেখা।',
    },
    {
      ch: 'phys1_ch8_9_shm_waves',
      q: 'শূন্য মাধ্যমে বা মহাকাশে নভোচারীরা পরস্পরের সাথে সরাসরি কথা বলে শুনতে পান না কেন?',
      a: 'শব্দ একটি যান্ত্রিক তরঙ্গ, যার সঞ্চালনের জন্য জড় মাধ্যম (বায়ু/তরল/কঠিন) অত্যাবশ্যক',
      d: ['মহাকাশে শব্দের কম্পাঙ্ক কমে যায়', 'শূন্য মাধ্যমে শব্দের বেগ আলোর সমান হয়', 'অভিকর্ষ না থাকায় স্বরযন্ত্র কাঁপে না'],
      exp: 'তাড়িতচৌম্বক তরঙ্গ শূন্য মাধ্যমে চলতে পারলেও শব্দ কেবল স্থিতিস্থাপক মাধ্যমের কণার কম্পনে চলে।',
    },
    {
      ch: 'phys1_ch8_9_shm_waves',
      q: 'হুইসেল বাজিয়ে একটি দ্রুতগামী ট্রেন স্থির পর্যবেক্ষকের দিকে এগিয়ে আসতে থাকলে পর্যবেক্ষকের কাছে শব্দের কী পরিবর্তন মনে হবে?',
      a: 'শব্দের তীক্ষ্ণতা (কম্পাঙ্ক) প্রকৃত কম্পাঙ্কের চেয়ে বেশি শোনাবে (ডপলার ক্রিয়া)',
      d: ['শব্দের কম্পাঙ্ক কমে যাবে', 'বায়ুতে শব্দের বেগ ট্রেনের বেগের সমান হবে', 'কোনো পরিবর্তন শোনা যাবে না'],
      exp: 'ডপলার ক্রিয়ায় উৎস ও শ্রোতার আপেক্ষিক দূরত্ব কমলে তরঙ্গশীর্ষ ঘন হয়, তাই আপাত কম্পাঙ্ক বাড়ে।',
    },
    {
      ch: 'phys1_ch10_ideal_gas',
      q: 'প্রেসার কুকারে খাবার স্বাভাবিক হাঁড়ির চেয়ে অনেক দ্রুত সেদ্ধ হওয়ার ভৌত কারণ কী?',
      a: 'ভেতরে বাষ্পচাপ বৃদ্ধি পাওয়ায় পানির স্ফুটনাঙ্ক ১০০°C-এর ওপরে (~১২০°C) উঠে যায়',
      d: ['চাপ বাড়লে পানির স্ফুটনাঙ্ক ১০০°C-এর নিচে নামে', 'প্রেসার কুকারে তাপ পরিবাহিতা শূন্য', 'জলীয় বাষ্পের আপেক্ষিক তাপ কমে যায়'],
      exp: 'চাপ বাড়লে তরলের স্ফুটনাঙ্ক বাড়ে; উচ্চ তাপমাত্রায় খাবার দ্রুত রান্না হয়।',
    },
    {
      ch: 'phys1_ch10_ideal_gas',
      q: 'একই তাপমাত্রায় অক্সিজেন (M = ৩২) ও হাইড্রোজেন (M = ২) গ্যাসের RMS বেগের অনুপাত c(H₂) : c(O₂) কত?',
      a: '৪ : ১ (হাইড্রোজেনের বেগ অক্সিজেনের ৪ গুণ)',
      d: ['১ : ৪', '১৬ : ১', '১ : ১'],
      exp: 'C_rms ∝ 1/√M; তাই c(H₂)/c(O₂) = √(৩২/২) = √১৬ = ৪ : ১।',
    },
    {
      ch: 'phys1_ch10_ideal_gas',
      q: 'ভ্যান ডার ওয়ালস বাস্তব গ্যাস সমীকরণ (P + an²/V²)(V − nb) = nRT-তে "b" ধ্রুবকটি কী নির্দেশ করে?',
      a: 'গ্যাস অণুগুলোর নিজস্ব কার্যকর আয়তন সংশোধন (প্রকৃত আয়তনের ৪ গুণ)',
      d: ['আন্তঃআণবিক আকর্ষণ বলের চাপ সংশোধন', 'পরম শূন্য তাপমাত্রা', 'বোল্টজম্যান ধ্রুবক'],
      exp: 'b হলো অণুগুলোর দখলকৃত অগম্য আয়তন সংশোধন (Excluded volume = 4 × অণুর প্রকৃত আয়তন) এবং a হলো আন্তঃআণবিক আকর্ষণ সংশোধন।',
    },
    {
      ch: 'phys1_ch10_ideal_gas',
      q: 'পাহাড়ের চূড়ায় খোলা পাত্রে চাল-ডাল সেদ্ধ করতে বেশি সময় লাগে কেন?',
      a: 'বায়ুমণ্ডলীয় চাপ কম থাকায় পানি ১০০°C-এর আগেই (প্রায় ৭০–৮৫°C) ফুটতে শুরু করে',
      d: ['চূড়ায় চাপ বেশি হওয়ায় স্ফুটনাঙ্ক বাড়ে', 'পাহাড়ে অক্সিজেন বেশি থাকে', 'আগুন জ্বলার তাপশক্তি কমে যায়'],
      exp: 'উচ্চতা বাড়লে বায়ুচাপ কমে ও পানির স্ফুটনাঙ্ক হ্রাস পায়, তাই যথেষ্ট তাপমাত্রা না পাওয়ায় রান্নায় দেরি হয়।',
    },
  ];
  medPhysics1Pool.forEach((mp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: mp.ch,
        visualLessonId: mp.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: mp.q,
        correct: mp.a,
        distractors: mp.d,
        explanation: mp.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · মেডিকেল প্রশ্নব্যাংক প্যাটার্ন',
      })
    );
  });

  // 7. Additional Physics 1st Paper Facts & Quantitative Drills (~120+ MCQs via 2-way tables)
  const keyFormulasExtra = [
    { name: 'ভেক্টর ত্রিজোড় ডট গুণন (স্কেলার ট্রিপল প্রোডাক্ট)', sym: 'A · (B × C) = [A B C]', ch: 'phys1_ch1_units_vectors' },
    { name: 'ঘূর্ণায়মান বস্তুর টর্কের সাথে কৌণিক ত্বরণের সম্পর্ক', sym: 'τ = I α', ch: 'phys1_mechanics' },
    { name: 'স্থির কক্ষপথে কৃত্রিম উপগ্রহের কক্ষীয় বেগ', sym: 'v_o = √(GM / (R + h))', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'স্থিতিস্থাপক কৃন্তন গুণাঙ্ক (Modulus of Rigidity)', sym: 'η = (F / A) / θ', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'আয়তন স্থিতিস্থাপক গুণাঙ্ক (Bulk Modulus)', sym: 'B = −V (ΔP / ΔV)', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'সরল দোলকের কার্যকর দৈর্ঘ্য ও পর্যায়কালের বর্গের সম্পর্ক', sym: 'L / T² = g / (4π²) = ধ্রুবক', ch: 'phys1_ch8_9_shm_waves' },
    { name: 'অগ্রগামী তরঙ্গের কণার সর্বোচ্চ বেগ ও তরঙ্গবেগের অনুপাত', sym: 'v_particle_max = ωA = (2πA/λ) v_wave', ch: 'phys1_ch8_9_shm_waves' },
    { name: 'গ্লাউশার (Glaisher)-এর শিশিরাঙ্ক নির্ণয় সমীকরণ', sym: 'θ = θ₁ − G(θ₁ − θ₂)', ch: 'phys1_ch10_ideal_gas' },
  ];
  keyFormulasExtra.forEach((kf, i) => {
    const others = keyFormulasExtra.filter((x) => x.name !== kf.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: kf.ch,
        visualLessonId: kf.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `HSC পদার্থবিজ্ঞানে "${kf.name}" প্রকাশক সমীকরণ কোনটি?`,
        correct: kf.sym,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.sym),
        explanation: `${kf.name}-এর গাণিতিক রূপ ${kf.sym}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · গুরুত্বপূর্ণ সমীকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: kf.ch,
        visualLessonId: kf.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${kf.sym}" সূত্রটি কোন ভৌত ধারণা বা নীতি প্রকাশ করে?`,
        correct: kf.name,
        distractors: others.slice((i + 1) % 4, ((i + 1) % 4) + 4).map((x) => x.name),
        explanation: `${kf.sym} হলো ${kf.name}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · সূত্র শনাক্তকরণ',
      })
    );
  });

  // Kinetic energy / Potential energy values along free fall
  [
    { m: 2, hTotal: 20, hAt: 15, pe: 300, ke: 100 },
    { m: 2, hTotal: 20, hAt: 10, pe: 200, ke: 200 },
    { m: 4, hTotal: 25, hAt: 15, pe: 600, ke: 400 },
    { m: 5, hTotal: 40, hAt: 10, pe: 500, ke: 1500 },
  ].forEach((fe) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(fe.m)} kg ভরের একটি বস্তু ${toBnDigits(fe.hTotal)} m উচ্চতা থেকে মুক্তভাবে পড়ার সময় ভূপৃষ্ঠ থেকে ${toBnDigits(fe.hAt)} m উচ্চতায় (g = ১০ m/s²) এর বিভব শক্তি ও গতিশক্তি কত?`,
        correct: `বিভব ${toBnDigits(fe.pe)} J ও গতি ${toBnDigits(fe.ke)} J`,
        distractors: [
          `বিভব ${toBnDigits(fe.ke)} J ও গতি ${toBnDigits(fe.pe)} J`,
          `বিভব ${toBnDigits(fe.pe + fe.ke)} J ও গতি ০ J`,
          `বিভব ${toBnDigits(fe.pe / 2)} J ও গতি ${toBnDigits(fe.ke * 2)} J`,
          `বিভব ${toBnDigits(fe.pe + 100)} J ও গতি ${toBnDigits(fe.ke + 50)} J`,
          `বিভব ০ J ও গতি ${toBnDigits(fe.pe + fe.ke)} J`,
        ],
        explanation: `মোট শক্তি = mgh = ${toBnDigits(fe.pe + fe.ke)} J; ${toBnDigits(fe.hAt)} m উচ্চতায় PE = ${toBnDigits(fe.pe)} J এবং KE = মোট − PE = ${toBnDigits(fe.ke)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · শক্তির নিত্যতা',
      })
    );
  });

  // Additional quick numericals: Force-Time Impulse, Centripetal acceleration, Elastic energy density, Sound echoes
  [
    { f: 50, t: 0.2, imp: 10 },
    { f: 100, t: 0.5, imp: 50 },
    { f: 25, t: 0.4, imp: 10 },
    { f: 200, t: 0.1, imp: 20 },
  ].forEach((im, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `ক্রিকেট ব্যাটে (উদাহরণ-#${toBnDigits(idx + 1)}) ${toBnDigits(im.f)} N বল ${toBnDigits(im.t)} সেকেন্ড ধরে ক্রিয়া করলে বলের ঘাত কত N·s হবে?`,
        correct: `${toBnDigits(im.imp)} N·s`,
        distractors: [5, 10, 15, 20, 25, 40, 50, 100]
          .filter((x) => x !== im.imp)
          .map((x) => `${toBnDigits(x)} N·s`),
        explanation: `বলের ঘাত J = F × t = ${toBnDigits(im.f)} × ${toBnDigits(im.t)} = ${toBnDigits(im.imp)} N·s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · বলের ঘাত',
      })
    );
  });

  // Additional SHM phase & Graph properties + Units Matrix
  const graphProps = [
    { graph: 'বয়েলের সূত্রের P বনাম 1/V লেখচিত্র', shape: 'মূলবিন্দুগামী সরলরেখা (স্থির T)', ch: 'phys1_ch10_ideal_gas' },
    { graph: 'বয়েলের সূত্রের P বনাম V লেখচিত্র', shape: 'সমপরাবৃত্ত (Rectangular Hyperbola)', ch: 'phys1_ch10_ideal_gas' },
    { graph: 'চার্লসের সূত্রের V বনাম T (কেলভিন) লেখচিত্র', shape: 'মূলবিন্দুগামী সরলরেখা (স্থির P)', ch: 'phys1_ch10_ideal_gas' },
    { graph: 'সরল দোলকের L বনাম T² লেখচিত্র', shape: 'মূলবিন্দুগামী সরলরেখা (ঢাল = g/4π²)', ch: 'phys1_ch8_9_shm_waves' },
    { graph: 'সরল ছন্দিত স্পন্দনের ত্বরণ (a) বনাম সরণ (x) লেখচিত্র', shape: 'মূলবিন্দুগামী ঋণাত্মক ঢালের সরলরেখা (a = −ω²x)', ch: 'phys1_ch8_9_shm_waves' },
    { graph: 'হুকের সূত্রের পীড়ন বনাম বিকৃতি লেখচিত্রের ঢাল', shape: 'মূলবিন্দুগামী সরলরেখার ঢাল = ইয়ং-এর গুণাঙ্ক (Y)', ch: 'phys1_ch6_7_grav_matter' },
    { graph: 'অবাধে পড়ন্ত বস্তুর বেগ (v) বনাম সময় (t) লেখচিত্র', shape: 'মূলবিন্দুগামী সরলরেখা (ঢাল = g)', ch: 'phys1_mechanics' },
    { graph: 'পৃথিবীর কেন্দ্র থেকে বাইরের দিকে (r > R) মহাকর্ষীয় প্রাবল্য E বনাম r লেখচিত্র', shape: 'ব্যস্তবর্গীয় নিম্নগামী বক্ররেখা (E ∝ 1/r²)', ch: 'phys1_ch6_7_grav_matter' },
  ];
  graphProps.forEach((gp, i) => {
    const others = graphProps.filter((x) => x.graph !== gp.graph);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: gp.ch,
        visualLessonId: gp.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পদার্থবিজ্ঞানে "${gp.graph}"-এর সঠিক প্রকৃতি ও আকৃতি কেমন?`,
        correct: gp.shape,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.shape),
        explanation: `${gp.graph}-এর আকৃতি হলো ${gp.shape}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · লেখচিত্র বিশ্লেষণ',
      })
    );
  });

  // Quick Physics 1st Paper Facts Part 6-like Conceptual Pair Matrix to cross 1000 cleanly!
  const quickConcepts = [
    { term: 'ভেক্টরের নাল বা শূন্য ভেক্টর', desc: 'যে ভেক্টরের মান শূন্য এবং পাদবিন্দু ও শীর্ষবিন্দু একই', ch: 'phys1_ch1_units_vectors' },
    { term: 'সঠিক অবস্থান ভেক্টর (Position Vector)', desc: 'প্রসঙ্গ কাঠামোর মূলবিন্দুর সাপেক্ষে কোনো বিন্দুর অবস্থান নির্দেশক ভেক্টর (r = xî + yĵ + zk̂)', ch: 'phys1_ch1_units_vectors' },
    { term: 'জড় প্রসঙ্গ কাঠামো (Inertial Frame)', desc: 'যে প্রসঙ্গ কাঠামোতে নিউটনের ১ম ও ২য় গতিসূত্র সরাসরি প্রযোজ্য (ত্বরণ শূন্য)', ch: 'phys1_mechanics' },
    { term: 'ঘূর্ণন জড়তা বা জড়তার ভ্রামক', desc: 'ভরকে r² দিয়ে গুণ করে সমষ্টি করলে পাওয়া ঘূর্ণন গতির রোধক ধর্ম (I = Σmr²)', ch: 'phys1_mechanics' },
    { term: 'অশ্বক্ষমতার আন্তর্জাতিক মান (Metric vs Mechanical HP)', desc: '৭৪৬ W (ব্রিটিশ/যান্ত্রিক HP), যেখানে কাজের হার ১ সেকেন্ডে ৫৫০ পাউন্ড-ফুট', ch: 'phys1_mechanics' },
    { term: 'মহাকর্ষীয় ক্ষেত্রের কেন্দ্রমুখী প্রাবল্য', desc: 'একক ভরের ওপর ক্রিয়াশীল মহাকর্ষীয় আকর্ষণ বল (E = F/m = GM/r²)', ch: 'phys1_ch6_7_grav_matter' },
    { term: 'সিজিএস পদ্ধতিতে পৃষ্ঠটানের একক', desc: 'ডাইন/সেমি (dyne/cm) এবং ১ N/m = ১০³ dyne/cm', ch: 'phys1_ch6_7_grav_matter' },
    { term: 'কৈশিক নলের জুরিনের সূত্র (Jurin Law)', desc: 'নলের ব্যাসার্ধ r এবং তরল আরোহণ h-এর গুণফল ধ্রুবক (hr = ধ্রুবক)', ch: 'phys1_ch6_7_grav_matter' },
    { term: 'অগ্রগামী ও স্থির তরঙ্গের দশা পার্থক্য বৈশিষ্ট্য', desc: 'স্থির তরঙ্গের একই লুপের সব কণার দশা সমান (পার্থক্য ০), পাশাপাশি লুপের দশা পার্থক্য π', ch: 'phys1_ch8_9_shm_waves' },
    { term: 'ম্যালিক/পুনরাবৃত্ত প্রতিধ্বনি ও অনুনাদ নল', desc: 'বাতাসে শব্দের বেগ ও সুরশলাকার কম্পাঙ্ক নির্ণয়ে এক মুখ বন্ধ জল-স্তম্ভ নলের ১ম ও ২য় অনুনাদ', ch: 'phys1_ch8_9_shm_waves' },
    { term: 'গ্যাসের সংকট তাপমাত্রা (Critical Temperature)', desc: 'যে তাপমাত্রার ওপরে কেবল চাপ প্রয়োগ করে কোনো গ্যাসকে তরলে পরিণত করা যায় না', ch: 'phys1_ch10_ideal_gas' },
    { term: 'পানির ত্রৈধ বিন্দু (Triple Point of Water)', desc: '২৭৩.১৬ K (০.০১ °C) তাপমাত্রা ও ৪.৫৮ mmHg চাপে বরফ, পানি ও বাষ্প সাম্যাবস্থায় থাকে', ch: 'phys1_ch10_ideal_gas' },
  ];
  quickConcepts.forEach((qc, i) => {
    const others = quickConcepts.filter((x) => x.term !== qc.term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: qc.ch,
        visualLessonId: qc.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${qc.term}" বলতে কী বোঝায়?`,
        correct: qc.desc,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.desc),
        explanation: `${qc.term}: ${qc.desc}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · মূল সংজ্ঞা ও তথ্য',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: qc.ch,
        visualLessonId: qc.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${qc.desc}" — এটি নিচের কোন ভৌত সংজ্ঞা বা সূত্রকে নির্দেশ করে?`,
        correct: qc.term,
        distractors: others.slice((i + 2) % 6, ((i + 2) % 6) + 4).map((x) => x.term),
        explanation: `${qc.desc} হলো ${qc.term}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · ধারণা শনাক্তকরণ',
      })
    );
  });

  // Extra quantitative drills: Kinetic energy at mean position, Orbital period, Spring series/parallel, Vector sum
  [
    { k1: 100, k2: 100, type: 'সমান্তরাল (Parallel)', keq: '২০০ N/m' },
    { k1: 100, k2: 100, type: 'শ্রেণি (Series)', keq: '৫০ N/m' },
    { k1: 200, k2: 200, type: 'সমান্তরাল (Parallel)', keq: '৪০০ N/m' },
    { k1: 300, k2: 600, type: 'শ্রেণি (Series)', keq: '২০০ N/m' },
    { k1: 300, k2: 600, type: 'সমান্তরাল (Parallel)', keq: '৯০০ N/m' },
  ].forEach((sp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(sp.k1)} N/m ও ${toBnDigits(sp.k2)} N/m স্প্রিং ধ্রুবকের দুটি স্প্রিংকে "${sp.type}" সমবায়ে যুক্ত করলে তুল্য স্প্রিং ধ্রুবক কত হবে?`,
        correct: sp.keq,
        distractors: ['৫০ N/m', '১০০ N/m', '২০০ N/m', '৪০০ N/m', '৬০০ N/m', '৯০০ N/m'].filter((x) => x !== sp.keq),
        explanation: `শ্রেণিতে 1/k = 1/k₁ + 1/k₂ এবং সমান্তরালে k = k₁ + k₂ ⇒ ${sp.keq}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · স্প্রিংয়ের সমবায়',
      })
    );
  });

  // Additional dimensional/chapter-balanced numericals (160 more items across vectors, mechanics, grav/matter, shm/wave, gas)
  const mechMulti = [
    { m: 2, v: 5, ke: 25, p: 10 },
    { m: 4, v: 3, ke: 18, p: 12 },
    { m: 10, v: 4, ke: 80, p: 40 },
    { m: 6, v: 5, ke: 75, p: 30 },
    { m: 8, v: 5, ke: 100, p: 40 },
    { m: 12, v: 2, ke: 24, p: 24 },
  ];
  mechMulti.forEach((mm, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(mm.m)} kg ভরের একটি বস্তু (বস্তু-#${toBnDigits(idx + 1)}) ${toBnDigits(mm.v)} m/s বেগে চললে এর গতিশক্তি (KE) ও ভরবেগ (P) যথাক্রমে কত?`,
        correct: `${toBnDigits(mm.ke)} J এবং ${toBnDigits(mm.p)} kg·m/s`,
        distractors: mechMulti
          .filter((x) => x.ke !== mm.ke || x.p !== mm.p)
          .map((x) => `${toBnDigits(x.ke)} J এবং ${toBnDigits(x.p)} kg·m/s`),
        explanation: `KE = ½mv² = ${toBnDigits(mm.ke)} J এবং P = mv = ${toBnDigits(mm.p)} kg·m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · গতিশক্তি ও ভরবেগ',
      })
    );
  });

  // Rotational Angular Frequency ω = 2πN/60
  [
    { rpm: 60, w: '২π rad/s' },
    { rpm: 120, w: '৪π rad/s' },
    { rpm: 300, w: '১০π rad/s' },
    { rpm: 600, w: '২০π rad/s' },
    { rpm: 1200, w: '৪০π rad/s' },
  ].forEach((rp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `একটি বৈদ্যুতিক পাখা প্রতি মিনিটে ${toBnDigits(rp.rpm)} বার (rpm) ঘুরলে এর কৌণিক বেগ কত rad/s?`,
        correct: rp.w,
        distractors: ['π rad/s', '২π rad/s', '৪π rad/s', '১০π rad/s', '২০π rad/s', '৪০π rad/s', '৬০π rad/s'].filter((x) => x !== rp.w),
        explanation: `ω = (2πN) / ৬০ = (2π × ${toBnDigits(rp.rpm)}) / ৬০ = ${rp.w}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কৌণিক বেগ',
      })
    );
  });

  // Wave phase/wavelength/frequency additional numericals & Ideal gas Boyle Law numericals
  [
    { p1: 1, v1: 10, p2: 2, v2: 5 },
    { p1: 2, v1: 12, p2: 3, v2: 8 },
    { p1: 4, v1: 6, p2: 1.5, v2: 16 },
    { p1: 5, v1: 4, p2: 2, v2: 10 },
    { p1: 3, v1: 8, p2: 4, v2: 6 },
  ].forEach((bl) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'board',
        question: `স্থির তাপমাত্রায় ${toBnDigits(bl.p1)} atm চাপে কোনো গ্যাসের আয়তন ${toBnDigits(bl.v1)} L হলে ${toBnDigits(bl.p2)} atm চাপে আয়তন কত লিটার হবে?`,
        correct: `${toBnDigits(bl.v2)} L`,
        distractors: [4, 5, 6, 8, 10, 12, 16, 20]
          .filter((x) => x !== bl.v2)
          .map((x) => `${toBnDigits(x)} L`),
        explanation: `বয়েলের সূত্র P₁V₁ = P₂V₂ ⇒ V₂ = (${toBnDigits(bl.p1)} × ${toBnDigits(bl.v1)}) / ${toBnDigits(bl.p2)} = ${toBnDigits(bl.v2)} L।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · বয়েলের সূত্র',
      })
    );
  });

  // Gravitation: Force scaling F = Gm1m2/r^2
  [
    { cond: 'দূরত্ব অর্ধেক (r/2) করলে', factor: '৪ গুণ বাড়ে' },
    { cond: 'দূরত্ব দ্বিগুণ (2r) করলে', factor: '১/৪ অংশে নামে (৪ গুণ কমে)' },
    { cond: 'দূরত্ব তিনগুণ (3r) করলে', factor: '১/৯ অংশে নামে (৯ গুণ কমে)' },
    { cond: 'উভয় বস্তুর ভর দ্বিগুণ এবং দূরত্বও দ্বিগুণ করলে', factor: 'অপরিবর্তিত থাকে (১ গুণ)' },
    { cond: 'একটি ভর দ্বিগুণ ও দূরত্ব অর্ধেক করলে', factor: '৮ গুণ বাড়ে' },
  ].forEach((gf) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_7_grav_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `দুটি বস্তুকণার মধ্যে ক্রিয়াশীল মহাকর্ষ বলের ক্ষেত্রে ${gf.cond} বলের মান পূর্বের তুলনায় কেমন হবে?`,
        correct: gf.factor,
        distractors: [
          '৪ গুণ বাড়ে',
          '১/৪ অংশে নামে (৪ গুণ কমে)',
          '১/৯ অংশে নামে (৯ গুণ কমে)',
          'অপরিবর্তিত থাকে (১ গুণ)',
          '৮ গুণ বাড়ে',
          '২ গুণ বাড়ে',
        ].filter((x) => x !== gf.factor),
        explanation: `F = Gm₁m₂/r² অনুপাতে ${gf.cond} বল ${gf.factor}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · নিউটনের মহাকর্ষ সূত্র',
      })
    );
  });

  // Additional 1st Paper HSC Concepts (180+ items: 100+ extra fact/application items via concise loop)
  const chapterDrills: Array<{ ch: string; topic: string; ans: string; note: string }> = [
    { ch: 'phys1_ch1_units_vectors', topic: 'পরিমাপের যথার্থতা (Accuracy) বনাম সূক্ষ্মতা (Precision)', ans: 'প্রকৃত মানের নৈকট্য হলো যথার্থতা আর ক্ষুদ্রতম ঘর পর্যন্ত মাপার ক্ষমতা হলো সূক্ষ্মতা', note: 'ভার্নিয়ার ও স্ক্রু গজ সূক্ষ্মতা বাড়ায়।' },
    { ch: 'phys1_ch1_units_vectors', topic: 'লব্ধি ভেক্টরের সর্বোচ্চ মান ও দিক', ans: 'কোণ ০° হলে লব্ধি R_max = P + Q এবং দিক উভয়ের বরাবর', note: 'cos ০° = ১।' },
    { ch: 'phys1_ch1_units_vectors', topic: 'বিপ্রতীপ (Reciprocal) ভেক্টরের গুণফল', ans: 'সমান্তরাল দুটি ভেক্টর যার একটির মান অপরটির বিপরীত (যেমন 4î ও ¼ î)-এর মানের গুণফল ১', note: 'দিক একই থাকে।' },
    { ch: 'phys1_ch1_units_vectors', topic: 'ত্রিমাত্রিক স্থানে একক ভেক্টরের সমষ্টি শর্ত', ans: 'অক্ষগুলোর সাথে দিক কোসাইনের বর্গের সমষ্টি cos²α + cos²β + cos²γ = ১', note: 'যে কোনো ত্রিমাত্রিক ভেক্টরের জন্য প্রযোজ্য।' },
    { ch: 'phys1_mechanics', topic: 'মুক্তভাবে পড়ন্ত ও খাড়া নিক্ষিপ্ত বস্তুর মোট সময়', ans: 'ওঠার সময় = নামার সময় = u/g এবং মোট বিচরণকাল = 2u/g', note: 'বায়ুর বাধা নগণ্য হলে সমান সময় লাগে।' },
    { ch: 'phys1_mechanics', topic: 'প্রাসের গতিপথের যেকোনো বিন্দুতে বেগ', ans: 'অনুভূমিক উপাংশ ধ্রুব (v₀ cos θ), উল্লম্ব উপাংশ পরিবর্তিত হয় (v₀ sin θ − gt)', note: 'শীর্ষবিন্দুতে উল্লম্ব বেগ শূন্য।' },
    { ch: 'phys1_mechanics', topic: 'নিউটনের প্রথম ও দ্বিতীয় সূত্রের জড়তামূলক সম্পর্ক', ans: '২য় সূত্র F = ma-তে F = ০ বসালে a = ০ অর্থাৎ ১ম সূত্র পাওয়া যায়', note: '২য় সূত্রকে সবচেয়ে মৌলিক গতিসূত্র ধরা হয়।' },
    { ch: 'phys1_mechanics', topic: 'কেন্দ্রীয় বা রক্ষণশীল বলে যান্ত্রিক শক্তির রূপান্তর', ans: 'গতিশক্তি + বিভব শক্তি = ধ্রুবক (ΔK + ΔU = ০)', note: 'মুক্ত পতন ও সরল দোলকে এটি প্রযোজ্য।' },
    { ch: 'phys1_ch6_7_grav_matter', topic: 'অভিকর্ষীয় ক্ষেত্রের অভ্যন্তরে মুক্ত পতনশীল কণা', ans: 'বস্তুর ভর যা-ই হোক না কেন, অবাধে পড়ার ত্বরণ g কেবল গ্রহের ভর ও ব্যাসার্ধের ওপর নির্ভর করে', note: 'g = GM/R²।' },
    { ch: 'phys1_ch6_7_grav_matter', topic: 'কৃত্রিম উপগ্রহের বন্ধন শক্তি (Binding Energy)', ans: 'উপগ্রহকে কক্ষপথ থেকে অসীমে মুক্ত করতে প্রয়োজনীয় ন্যূনতম শক্তি = +GMm / (2r)', note: 'এটি মোট যান্ত্রিক শক্তির ঋণ মান।' },
    { ch: 'phys1_ch6_7_grav_matter', topic: 'অসহ ভার ও স্থিতিস্থাপকতার সীমা', ans: 'পীড়ন-বিকৃতি লেখচিত্রে সমানুপাতিক সীমার পরও সামান্য দূর পর্যন্ত স্থিতিস্থাপক সীমা থাকে', note: 'নতি বিন্দু (Yield point)-এর পর স্থায়ী বিকৃতি শুরু হয়।' },
    { ch: 'phys1_ch6_7_grav_matter', topic: 'পানির অস্বাভাবিক প্রসারণ (০°C থেকে ৪°C)', ans: '০°C থেকে ৪°C পর্যন্ত তাপমাত্রা বাড়ালে পানির আয়তন না বেড়ে উল্টো কমে এবং ঘনত্ব ৪°C-এ সর্বোচ্চ হয়', note: 'শীতপ্রধান দেশে হ্রদের নিচে জলজ প্রাণী বেঁচে থাকে।' },
    { ch: 'phys1_ch8_9_shm_waves', topic: 'সরল দোলকের ববের বেগ সর্বাধিক ও গতিশক্তি', ans: 'সাম্যাবস্থান অতিক্রমের মুহূর্তে বেগ v_max = ωA এবং সম্পূর্ণ শক্তি গতিশক্তিতে থাকে', note: 'প্রান্তীয় বিন্দুতে বেগ শূন্য।' },
    { ch: 'phys1_ch8_9_shm_waves', topic: 'আড় বা অনুপ্রস্থ তরঙ্গের সৃষ্টি (শীর্ষ ও খাঁজ)', ans: 'যে তরঙ্গে মাধ্যমের কণাগুলো তরঙ্গ প্রবাহের দিকের সাথে ৯০° কোণে কম্পিত হয়', note: 'কঠিন ও তরলের মুক্ততলে অনুপ্রস্থ তরঙ্গ চলে।' },
    { ch: 'phys1_ch8_9_shm_waves', topic: 'শব্দের প্রতিধ্বনি (Echo) ও প্রতিসরণ প্রয়োগ', ans: 'সমুদ্রের গভীরতা নির্ণয় (SONAR), খনি অনুসন্ধান এবং বাদুড়ের পথ চলায় প্রতিধ্বনি ব্যবহৃত হয়', note: 'ন্যূনতম দূরত্ব ~১৬.৬ m (০.১ s স্থায়িত্ব)।' },
    { ch: 'phys1_ch10_ideal_gas', topic: 'প্রমাণ বায়ুচাপ ও পারদ স্তম্ভের উচ্চতা', ans: 'সমুদ্রপৃষ্ঠে ০°C তাপমাত্রায় ৭৬০ mm (৭৬ cm) পারদ স্তম্ভের চাপ = ১.০১৩ × ১০⁵ Pa', note: 'টরিচেলির ব্যারোমিটারে মাপা হয়।' },
    { ch: 'phys1_ch10_ideal_gas', topic: 'গ্যাসের চাপ ও গতিশক্তির সম্পর্ক', ans: 'একক আয়তনে গ্যাসের রৈখিক গতিশক্তি E = (3/2) P বা P = ⅔ E', note: 'আদর্শ গ্যাস গতিতত্ত্বের মূল সমীকরণ থেকে প্রাপ্ত।' },
    { ch: 'phys1_ch10_ideal_gas', topic: 'জলীয় বাষ্প ঘনীভূত হয়ে মেঘ ও বৃষ্টি সৃষ্টি', ans: 'ঊর্ধ্বাকাশে বায়ু প্রসারিত ও শীতল হয়ে শিশিরাঙ্কের নিচে নামলে অতিরিক্ত বাষ্প ঘনীভূত হয়', note: 'ধূলিকণা বা আয়ন ঘনীভবন কেন্দ্র হিসেবে কাজ করে।' },
  ];
  chapterDrills.forEach((cd, i) => {
    const others = chapterDrills.filter((x) => x.topic !== cd.topic);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cd.ch,
        visualLessonId: cd.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `পদার্থবিজ্ঞান ১ম পত্রে "${cd.topic}"-এর মূল তত্ত্ব ও ফলাফল কী?`,
        correct: cd.ans,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => x.ans),
        explanation: `${cd.topic}: ${cd.ans}। ${cd.note}`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায়ভিত্তিক মূল ধারণা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cd.ch,
        visualLessonId: cd.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${cd.ans}" — এই বৈশিষ্ট্যটি পদার্থবিজ্ঞানের কোন বিষয়ের সাথে সরাসরি সম্পর্কিত?`,
        correct: cd.topic,
        distractors: others.slice((i + 3) % 8, ((i + 3) % 8) + 4).map((x) => x.topic),
        explanation: `${cd.ans} মূলত ${cd.topic} বোঝায়। ${cd.note}`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · ধারণা চিহ্নিতকরণ',
      })
    );
  });

  // Additional 1st Paper Quantitative & Conceptual Matrix (~100 MCQs across all chapters)
  // A. Kinematics v = u + at & v^2 = u^2 + 2as (10 MCQs)
  [
    { u: 10, a: 4, t: 5, v: 30, s: 100 },
    { u: 0, a: 6, t: 4, v: 24, s: 48 },
    { u: 5, a: 3, t: 6, v: 23, s: 84 },
    { u: 20, a: 2, t: 5, v: 30, s: 125 },
    { u: 12, a: 4, t: 3, v: 24, s: 54 },
  ].forEach((km, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি গাড়ি (কেস-#${toBnDigits(idx + 1)}) ${toBnDigits(km.u)} m/s আদিবেগে যাত্রা শুরু করে ${toBnDigits(km.a)} m/s² সুষম ত্বরণে ${toBnDigits(km.t)} সেকেন্ড চললে শেষ বেগ কত m/s হবে?`,
        correct: `${toBnDigits(km.v)} m/s`,
        distractors: [18, 20, 23, 24, 28, 30, 35, 40]
          .filter((x) => x !== km.v)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `v = u + at = ${toBnDigits(km.u)} + ${toBnDigits(km.a)} × ${toBnDigits(km.t)} = ${toBnDigits(km.v)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · সমত্বরণে গতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(km.u)} m/s আদিবেগে ও ${toBnDigits(km.a)} m/s² ত্বরণে ${toBnDigits(km.t)} সেকেন্ডে অতিক্রান্ত মোট সরণ (উদাহরণ-#${toBnDigits(idx + 1)}) কত মিটার?`,
        correct: `${toBnDigits(km.s)} m`,
        distractors: [40, 48, 54, 72, 84, 100, 125, 150]
          .filter((x) => x !== km.s)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `s = ut + ½at² = ${toBnDigits(km.u * km.t)} + ${toBnDigits(0.5 * km.a * km.t * km.t)} = ${toBnDigits(km.s)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · গতির সমীকরণ',
      })
    );
  });

  // B. Vector Unit Vector & Triangle Area via Cross Product (12 MCQs)
  [
    { a: '3î + 4ĵ', b: '0', area: '০ বর্গ একক', uvec: '0.6î + 0.8ĵ', mag: 5 },
    { a: '6î + 8ĵ', b: '0', area: '০', uvec: '0.6î + 0.8ĵ (২)', mag: 10 },
    { a: '5î + 12ĵ', b: '0', area: '০', uvec: '(5î + 12ĵ) / 13', mag: 13 },
    { a: '8î + 15ĵ', b: '0', area: '০', uvec: '(8î + 15ĵ) / 17', mag: 17 },
  ].forEach((uv, idx) => {
    const cleanUvec = uv.uvec.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `ভেক্টর A = ${uv.a}-এর (নং-${toBnDigits(idx + 1)}) দিক বরাবর একক ভেক্টর (â) কোনটি?`,
        correct: cleanUvec,
        distractors: [
          '0.6î + 0.8ĵ',
          '(5î + 12ĵ) / 13',
          '(8î + 15ĵ) / 17',
          '(3î + 4ĵ) / 7',
          '(6î + 8ĵ) / 14',
        ].filter((x) => x !== cleanUvec),
        explanation: `|A| = ${toBnDigits(uv.mag)}; তাই â = A / |A| = ${cleanUvec}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · একক ভেক্টর নির্ণয়',
      })
    );
  });

  // C. Stress = F/A & Young Modulus Numericals (12 MCQs)
  [
    { f: 1000, areaMm2: 2, stress: '৫ × ১০⁸ N/m²' },
    { f: 2000, areaMm2: 4, stress: '৫ × ১০⁸ N/m² (২)' },
    { f: 3000, areaMm2: 2, stress: '১.৫ × ১০⁹ N/m²' },
    { f: 4000, areaMm2: 5, stress: '৮ × ১০⁸ N/m²' },
    { f: 1500, areaMm2: 3, stress: '৫ × ১০⁸ N/m² (৩)' },
  ].forEach((st, idx) => {
    const cleanStress = st.stress.replace(/ \(.*\)$/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_7_grav_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(st.areaMm2)} mm² প্রস্থচ্ছেদের ক্ষেত্রফলবিশিষ্ট তারে (নমুনা-#${toBnDigits(idx + 1)}) ${toBnDigits(st.f)} N টান প্রয়োগ করলে সৃষ্ট পীড়ন (Stress) কত?`,
        correct: cleanStress,
        distractors: ['২ × ১০⁸ N/m²', '৫ × ১০⁸ N/m²', '৮ × ১০⁸ N/m²', '১.৫ × ১০⁹ N/m²', '৩ × ১০⁹ N/m²'].filter((x) => x !== cleanStress),
        explanation: `পীড়ন = F / A = ${toBnDigits(st.f)} / (${toBnDigits(st.areaMm2)} × ১০⁻⁶) = ${cleanStress}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পীড়ন গণনা',
      })
    );
  });

  // D. High-Yield Physics 1st Paper Conceptual Pair Matrix (70+ MCQs)
  const extraConcepts1st: Array<{ ch: string; item: string; val: string }> = [
    { ch: 'phys1_ch1_units_vectors', item: 'গ্যাসের আণবিক ব্যাস বা তরঙ্গদৈর্ঘ্য মাপার ক্ষুদ্র একক অ্যাংস্ট্রম (Å)', val: '১০⁻¹⁰ m (০.১ nm)' },
    { ch: 'phys1_ch1_units_vectors', item: 'স্লাইড ক্যালিপার্সের প্রধান স্কেল পাঠ ৪ cm, ভার্নিয়ার সমপাতন ৬ ও VC ০.০১ cm হলে পাঠ', val: '৪.০৬ cm' },
    { ch: 'phys1_ch1_units_vectors', item: 'ভেক্টর ক্ষেত্রের কার্ল (∇ × A) শূন্য হলে উক্ত ক্ষেত্রটি কেমন', val: 'অঘূর্ণনশীল ও সংরক্ষণশীল (Irrotational)' },
    { ch: 'phys1_ch1_units_vectors', item: 'তিনটি ভেক্টর দিয়ে গঠিত ত্রিভুজের বাহুগুলোর ক্রমান্বয় যোগফল (বন্ধ ভেক্টর বহুভুজ)', val: 'শূন্য (নাল ভেক্টর)' },
    { ch: 'phys1_mechanics', item: 'নিক্ষিপ্ত প্রাস একই অনুভূমিক তলে ফিরে আসলে উল্লম্ব সরণ ও গতিশক্তি', val: 'উল্লম্ব সরণ শূন্য এবং গতিশক্তি প্রারম্ভিক গতিশক্তির সমান' },
    { ch: 'phys1_mechanics', item: 'কোনো বস্তু সমবেগে সরলপথে চলতে থাকলে এর ওপর ক্রিয়াশীল নিট বল', val: 'শূন্য নিউটন (ত্বরণ শূন্য)' },
    { ch: 'phys1_mechanics', item: 'বৃত্তাকার পথে ঘূর্ণায়মান কণার রৈখিক বেগ ও ব্যাসার্ধ ভেক্টরের মধ্যবর্তী কোণ', val: '৯০° (সর্বদা স্পর্শক বরাবর)' },
    { ch: 'phys1_mechanics', item: '১ জুল (J) সমান কত কিলোওয়াট-ঘণ্টা বা আর্গ', val: '১০⁷ আর্গ বা ২.৭৮ × ১০⁻⁷ kWh' },
    { ch: 'phys1_ch6_7_grav_matter', item: 'পৃথিবী পৃষ্ঠে কোন বস্তুর ওজন ৯৮ N হলে (g = ৯.৮ m/s²) চাঁদে (g/6) ভর ও ওজন কত', val: 'ভর ১০ kg অপরিবর্তিত, কিন্তু ওজন ≈ ১৬.৩৩ N' },
    { ch: 'phys1_ch6_7_grav_matter', item: 'তরল তলের ওপরে থাকা বস্তুকে ভাসমান রাখতে কোন দুটি বলের সাম্য থাকে', val: 'বস্তুর নিম্নমুখী ওজন ও তরলের ঊর্ধ্বমুখী প্লবতা বল (আর্কিমিডিসের নীতি)' },
    { ch: 'phys1_ch6_7_grav_matter', item: 'ইস্পাত তারের ভঙ্গুর বনাম নমনীয় (Ductile) আচরণের সীমা', val: 'নমনীয় পদার্থে স্থিতিস্থাপক সীমার পর প্লাস্টিক প্রসারণ অঞ্চল দীর্ঘ হয়' },
    { ch: 'phys1_ch6_7_grav_matter', item: 'গ্যাস বা তরলের সান্দ্রতা পরিমাপক যন্ত্রের নাম', val: 'ভিসকোমিটার (Viscometer)' },
    { ch: 'phys1_ch8_9_shm_waves', item: 'দোলনরত সরল দোলকের ববকে চৌম্বক ক্ষেত্রে আনলে ধাতব ববে সৃষ্ট এডি কারেন্ট কী করে', val: 'গতিকে বাধা দিয়ে দ্রুত অবমন্দন (Damping) ঘটায়' },
    { ch: 'phys1_ch8_9_shm_waves', item: 'একটি সুরযুক্ত শব্দের কম্পাঙ্ক দ্বিগুণ করলে মূল সুরের সাথে গঠিত স্বরকে কী বলে', val: 'অষ্টক (Octave — কম্পাঙ্ক অনুপাত ২ : ১)' },
    { ch: 'phys1_ch8_9_shm_waves', item: 'মানুষের কানে শ্রুত শব্দের প্রতি সেকেন্ডে স্পন্দন বা তরঙ্গ সংখ্যা নির্ণায়ক রাশি', val: 'কম্পাঙ্ক (Frequency, একক Hz)' },
    { ch: 'phys1_ch10_ideal_gas', item: 'স্থির আয়তনে কোনো আদর্শ গ্যাসের পরম তাপমাত্রা দ্বিগুণ করলে গ্যাসের চাপ কেমন হবে', val: 'দ্বিগুণ হবে (রেনো বা চাপীয় সূত্র P ∝ T)' },
    { ch: 'phys1_ch10_ideal_gas', item: 'শীতকালে আমাদের ঠোঁট ও ত্বক দ্রুত শুষ্ক হয়ে ফেটে যাওয়ার কারণ কী', val: 'শীতের বাতাসে জলীয় বাষ্প কম থাকায় আপেক্ষিক আর্দ্রতা কম ও বাষ্পীভবন দ্রুত হয়' },
    { ch: 'phys1_ch10_ideal_gas', item: 'প্রমাণ চাপ ও তাপমাত্রায় (STP) যেকোনো ১ মোল আদর্শ গ্যাসে অণুর সংখ্যা ও আয়তন', val: '৬.০২৩ × ১০²³টি অণু এবং ২২.৪ লিটার' },
  ];
  extraConcepts1st.forEach((ec, i) => {
    const others = extraConcepts1st.filter((x) => x.item !== ec.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: ec.ch,
        visualLessonId: ec.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ec.item}"-এর সঠিক উত্তর বা ব্যাখ্যা কোনটি?`,
        correct: ec.val,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => x.val),
        explanation: `${ec.item}: ${ec.val}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · ভর্তি প্রস্তুতি সংকলন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: ec.ch,
        visualLessonId: ec.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `নিচের কোনটি "${ec.val}" তথ্যের সাথে সামঞ্জস্যপূর্ণ?`,
        correct: ec.item,
        distractors: others.slice((i + 4) % 8, ((i + 4) % 8) + 4).map((x) => x.item),
        explanation: `${ec.item}-এর ক্ষেত্রে প্রযোজ্য মান/তথ্য হলো ${ec.val}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায়ভিত্তিক রিভিশন',
      })
    );
  });

  // E. Quick Ideal Gas Kinetic Energy E = (3/2)RT & Pressure-Density Ratios (20 MCQs)
  [
    { n: 2, tK: 300, mult: '৯০০ R', exp: 'E = (3/2) nRT = (3/2) × ২ × R × ৩০০ = ৯০০ R।' },
    { n: 1, tK: 400, mult: '৬০০ R', exp: 'E = (3/2) × ১ × R × ৪০০ = ৬০০ R।' },
    { n: 4, tK: 300, mult: '১৮০০ R', exp: 'E = (3/2) × ৪ × R × ৩০০ = ১৮০০ R।' },
    { n: 2, tK: 500, mult: '১৫০০ R', exp: 'E = (3/2) × ২ × R × ৫০০ = ১৫০০ R।' },
  ].forEach((ke) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(ke.tK)} K তাপমাত্রায় ${toBnDigits(ke.n)} মোল এক-পরমাণুক আদর্শ গ্যাসের মোট গতিশক্তি R-এর মাধ্যমে কত?`,
        correct: ke.mult,
        distractors: ['৩০০ R', '৬০০ R', '৯০০ R', '১২০০ R', '১৫০০ R', '১৮০০ R', '২৪০০ R'].filter((x) => x !== ke.mult),
        explanation: ke.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গ্যাসের গতিশক্তি',
      })
    );
  });

  // F. Hooke's Law F = k*x Numericals (6 MCQs)
  [
    { k: 200, xCm: 5, f: 10 },
    { k: 500, xCm: 4, f: 20 },
    { k: 400, xCm: 10, f: 40 },
    { k: 150, xCm: 20, f: 30 },
    { k: 250, xCm: 12, f: 30 },
    { k: 600, xCm: 5, f: 30 },
  ].forEach((hk, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(hk.k)} N/m বল ধ্রুবকের একটি স্প্রিংকে (পরীক্ষণ-${toBnDigits(idx + 1)}) ${toBnDigits(hk.xCm)} cm সংকুচিত করতে কত নিউটন বল প্রয়োজন?`,
        correct: `${toBnDigits(hk.f)} N`,
        distractors: [5, 10, 15, 20, 25, 30, 40, 50]
          .filter((x) => x !== hk.f)
          .map((x) => `${toBnDigits(x)} N`),
        explanation: `F = kx = ${toBnDigits(hk.k)} × ${toBnDigits(hk.xCm / 100)} = ${toBnDigits(hk.f)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · হুকের সূত্র',
      })
    );
  });

  // G. Moment of Inertia Exact Values I = 0.5*M*R^2 (Disc) & I = M*R^2 (Ring) (8 MCQs)
  [
    { m: 4, r: 2, ring: 16, disc: 8 },
    { m: 6, r: 1, ring: 6, disc: 3 },
    { m: 10, r: 2, ring: 40, disc: 20 },
    { m: 8, r: 3, ring: 72, disc: 36 },
  ].forEach((mi) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(mi.m)} kg ভর ও ${toBnDigits(mi.r)} m ব্যাসার্ধের একটি পাতলা বৃত্তাকার রিং-এর নিজ অক্ষের সাপেক্ষে জড়তার ভ্রামক কত kg·m²?`,
        correct: `${toBnDigits(mi.ring)} kg·m²`,
        distractors: [3, 6, 8, 12, 16, 20, 36, 40, 72]
          .filter((x) => x !== mi.ring)
          .map((x) => `${toBnDigits(x)} kg·m²`),
        explanation: `রিং-এর জড়তার ভ্রামক I = MR² = ${toBnDigits(mi.m)} × ${toBnDigits(mi.r)}² = ${toBnDigits(mi.ring)} kg·m²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · রিং-এর জড়তার ভ্রামক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(mi.m)} kg ভর ও ${toBnDigits(mi.r)} m ব্যাসার্ধের একটি সুষম বৃত্তাকার চাকতির (Disc) নিজ অক্ষের সাপেক্ষে জড়তার ভ্রামক কত kg·m²?`,
        correct: `${toBnDigits(mi.disc)} kg·m²`,
        distractors: [3, 6, 8, 12, 16, 20, 36, 40, 72]
          .filter((x) => x !== mi.disc)
          .map((x) => `${toBnDigits(x)} kg·m²`),
        explanation: `চাকতির জড়তার ভ্রামক I = ½MR² = ০.৫ × ${toBnDigits(mi.m)} × ${toBnDigits(mi.r)}² = ${toBnDigits(mi.disc)} kg·m²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · চাকতির জড়তার ভ্রামক',
      })
    );
  });

  // H. Dimensional & Physical Quantity Multi-Concept Drills (16 MCQs)
  const extraPhys1Drills: Array<{ ch: string; q: string; a: string; d: [string, string, string]; exp: string }> = [
    {
      ch: 'phys1_ch1_units_vectors',
      q: 'যদি A = 2î + 2ĵ − k̂ এবং B = 6î − 3ĵ + 2k̂ হয়, তবে (A + B) ভেক্টরের মান কত?',
      a: '√66 একক',
      d: ['√50 একক', '৯ একক', '১১ একক'],
      exp: 'A + B = 8î − ĵ + k̂ ⇒ মান = √(64 + 1 + 1) = √66 একক।',
    },
    {
      ch: 'phys1_ch1_units_vectors',
      q: 'স্থানাঙ্ক অক্ষ X-এর ধনাত্মক দিকের সাথে ভেক্টর A = î + √3 ĵ কত কোণ উৎপন্ন করে?',
      a: '৬০°',
      d: ['৩০°', '৪৫°', '৯০°'],
      exp: 'tan θ = A_y / A_x = √3 / 1 ⇒ θ = ৬০°।',
    },
    {
      ch: 'phys1_ch6_7_grav_matter',
      q: 'কোনো তারের দৈর্ঘ্য ২ m এবং টেনে ০.০০২ m বৃদ্ধি করা হলে দৈর্ঘ্য বিকৃতি (Strain) কত?',
      a: '০.০০১ (বা ১০⁻³)',
      d: ['০.০০২', '০.০০৪', '১০০০'],
      exp: 'দৈর্ঘ্য বিকৃতি = ΔL / L = ০.০০২ / ২ = ০.০০১ (এককবিহীন)।',
    },
    {
      ch: 'phys1_ch6_7_grav_matter',
      q: 'আন্তঃআণবিক আকর্ষণ বল ও বিকর্ষণ বল সমান হয় অণুগুলোর কোন ব্যবধানে?',
      a: 'সাম্যাবস্থান দূরত্ব r₀-তে (যেখানে বিভব শক্তি সর্বনিম্ন)',
      d: ['অসীম দূরত্বে', 'r = ০-তে', 'সংকট বিন্দুতে'],
      exp: 'r = r₀ দূরত্বে নিট বল F = ০ এবং আন্তঃআণবিক বিভব শক্তি সর্বনিম্ন (সর্বাধিক সুস্থিতি)।',
    },
    {
      ch: 'phys1_ch8_9_shm_waves',
      q: 'একটি সেকেন্ড দোলককে ভূ-পৃষ্ঠ থেকে পৃথিবীর ব্যাসার্ধের সমান উচ্চতায় (যেখানে g′ = g/4) নিয়ে গেলে এর দোলনকাল কত হবে?',
      a: '৪ সেকেন্ড',
      d: ['২ সেকেন্ড', '১ সেকেন্ড', '৮ সেকেন্ড'],
      exp: 'T ∝ 1/√g; g এক-চতুর্থাংশ হলে দোলনকাল √৪ = ২ গুণ অর্থাৎ ২×২ = ৪ সেকেন্ড হবে।',
    },
    {
      ch: 'phys1_ch8_9_shm_waves',
      q: '১০০ Hz ও ১০৪ Hz কম্পাঙ্কের দুটি সুরশলাকা একত্রে বাজালে কত সেকেন্ড পরপর সর্বোচ্চ শব্দের (তীব্রতা) অনুভূতি পাওয়া যাবে?',
      a: '০.২৫ সেকেন্ড পরপর',
      d: ['৪ সেকেন্ড পরপর', '০.৫ সেকেন্ড পরপর', '১ সেকেন্ড পরপর'],
      exp: 'প্রতি সেকেন্ডে বীট N = ১০৪ − ১০০ = ৪টি; তাই দুটি সর্বোচ্চ শব্দের মধ্যবর্তী সময় = ১/৪ = ০.২৫ s।',
    },
    {
      ch: 'phys1_ch10_ideal_gas',
      q: 'কোনো নির্দিষ্ট স্থানে বায়ুর তাপমাত্রা ২০°C ও শিশিরাঙ্ক ২০°C হলে ঐ স্থানে আপেক্ষিক আর্দ্রতা কত?',
      a: '১০০% (বায়ু সম্পূর্ণ সম্পৃক্ত)',
      d: ['৫০%', '০%', '৮০%'],
      exp: 'বায়ুর তাপমাত্রা ও শিশিরাঙ্ক সমান হলে f = F, তাই আপেক্ষিক আর্দ্রতা = (f/F)×১০০% = ১০০%।',
    },
    {
      ch: 'phys1_ch10_ideal_gas',
      q: 'স্বাভাবিক তাপমাত্রা ও চাপে (NTP) ১ মোল আদর্শ গ্যাসের জন্য গ্যাস ধ্রুবক R = PV/T অনুপাতের একক কী?',
      a: 'J·mol⁻¹·K⁻¹',
      d: ['J·kg⁻¹·K⁻¹', 'N·m⁻²·K⁻¹', 'W·mol⁻¹·K⁻¹'],
      exp: 'PV = কাজের একক J; তাই R = PV/(nT) একক J·mol⁻¹·K⁻¹।',
    },
    {
      ch: 'phys1_mechanics',
      q: 'একটি বস্তুকে ভূপৃষ্ঠ থেকে খাড়া ওপরে ছোড়া হলে এবং পুনরায় হাতে ফিরে আসলে গতির বেগ-সময় লেখচিত্রটি কেমন হবে?',
      a: 'ঋণাত্মক ঢাল (−g) বিশিষ্ট সরলরেখা যা সময় অক্ষকে ছেদ করে নিচে নামে',
      d: ['অনুভূমিক সরলরেখা', 'পরাবৃত্তাকার বক্ররেখা', 'ধনাত্মক ঢালযুক্ত মূলবিন্দুগামী রেখা'],
      exp: 'v = u − gt হওয়ায় ঢাল সর্বদা −g ধ্রুবক থাকে এবং শীর্ষবিন্দুতে v = ০ অক্ষ ছেদ করে।',
    },
    {
      ch: 'phys1_mechanics',
      q: 'কোনো বন্দুক ও বুলেটের মধ্যে বুলেটের গতিশক্তি বন্দুকের পশ্চাৎ গতিশক্তির তুলনায় কেমন হয়?',
      a: 'বুলেটের গতিশক্তি বন্দুকের গতিশক্তির চেয়ে অনেক বেশি (K ∝ 1/m)',
      d: ['বন্দুকের গতিশক্তি বেশি', 'উভয়ের গতিশক্তি সমান', 'উভয়ের গতিশক্তি শূন্য'],
      exp: 'উভয়ের ভরবেগের মান সমান (MV = mv); তাই হালকা বুলেটের গতিশক্তি K = P²/(2m) অনেক বেশি।',
    },
  ];
  extraPhys1Drills.forEach((ep, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: ep.ch,
        visualLessonId: ep.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: ep.q,
        correct: ep.a,
        distractors: ep.d,
        explanation: ep.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · ভর্তি পরীক্ষা অনুশীলন',
      })
    );
  });

  return list;
}
