import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredM(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sm_${String(seq++).padStart(4, '0')}`;

  // 1. KE = p^2 / (2m) Momentum & Kinetic Energy Scaling (20 MCQs)
  [
    { pctP: '১০০%', factorP: 2, pctKE: '৩০০%' },
    { pctP: '২০০%', factorP: 3, pctKE: '৮০০%' },
    { pctP: '৫০%', factorP: 1.5, pctKE: '১২৫%' },
    { pctP: '১০%', factorP: 1.1, pctKE: '২১%' },
    { pctP: '২০%', factorP: 1.2, pctKE: '৪৪%' },
    { pctP: '৩০%', factorP: 1.3, pctKE: '৬৯%' },
    { pctP: '৪০%', factorP: 1.4, pctKE: '৯৬%' },
    { pctP: '৩০% হ্রাস', factorP: 0.7, pctKE: '৫১% হ্রাস' },
  ].forEach((pk, idx) => {
    const isDec = pk.pctP.includes('হ্রাস');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: isDec
          ? `একটি গতিশীল বস্তুর ভরবেগ ${pk.pctP} পেলে এর গতিশক্তি শতকরা কত হ্রাস পাবে?`
          : `কোনো বস্তুর রৈখিক ভরবেগ ${pk.pctP} বৃদ্ধি করলে এর গতিশক্তি শতকরা কত বৃদ্ধি পাবে?`,
        correct: pk.pctKE,
        distractors: ['২১%', '৪৪%', '৬৯%', '৯৬%', '১২৫%', '৩০০%', '৮০০%', '৫১% হ্রাস']
          .filter((x) => x !== pk.pctKE)
          .slice(0, 4),
        explanation: `E_k = p²/(2m); ভরবেগ ${toBnDigits(pk.factorP)} গুণ হলে গতিশক্তি (${toBnDigits(pk.factorP)})² গুণ হয়, ফলে পরিবর্তন ${pk.pctKE}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · ভরবেগ ও গতিশক্তির সম্পর্ক',
      })
    );
  });

  [
    { m1: 1, m2: 4, ratioP: '১ : ২' },
    { m1: 1, m2: 9, ratioP: '১ : ৩' },
    { m1: 1, m2: 16, ratioP: '১ : ৪' },
    { m1: 4, m2: 9, ratioP: '২ : ৩' },
    { m1: 9, m2: 16, ratioP: '৩ : ৪' },
    { m1: 4, m2: 25, ratioP: '২ : ৫' },
    { m1: 16, m2: 25, ratioP: '৪ : ৫' },
    { m1: 1, m2: 25, ratioP: '১ : ৫' },
    { m1: 9, m2: 25, ratioP: '৩ : ৫' },
    { m1: 2, m2: 8, ratioP: '১ : ২ (২)' },
    { m1: 3, m2: 12, ratioP: '১ : ২ (৩)' },
    { m1: 5, m2: 20, ratioP: '১ : ২ (৪)' },
  ].forEach((mr, idx) => {
    const cleanP = mr.ratioP.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(mr.m1)} kg এবং ${toBnDigits(mr.m2)} kg ভরের দুটি বস্তু সমান গতিশক্তি নিয়ে গতিশীল থাকলে তাদের ভরবেগের অনুপাত (p₁ : p₂) কত?`,
        correct: cleanP,
        distractors: ['১ : ২', '১ : ৩', '১ : ৪', '২ : ৩', '৩ : ৪', '২ : ৫', '৪ : ৫', '১ : ৫']
          .filter((x) => x !== cleanP)
          .slice(0, 4),
        explanation: `সম-গতিশক্তির জন্য p = √(2mE_k) ∝ √m; তাই p₁/p₂ = √(${toBnDigits(mr.m1)}/${toBnDigits(mr.m2)}) = ${cleanP}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · সম-গতিশক্তিতে ভরবেগের অনুপাত',
      })
    );
  });

  // 2. Projectile Horizontal Range R = u^2 sin(2theta) / g (g = 10) (14 MCQs)
  [
    { u: 10, deg: 45, r: 10 },
    { u: 20, deg: 45, r: 40 },
    { u: 30, deg: 45, r: 90 },
    { u: 40, deg: 45, r: 160 },
    { u: 50, deg: 45, r: 250 },
    { u: 20, deg: 15, r: 20 },
    { u: 40, deg: 15, r: 80 },
    { u: 60, deg: 15, r: 180 },
    { u: 20, deg: 75, r: 20 },
    { u: 40, deg: 75, r: 80 },
    { u: 60, deg: 75, r: 180 },
    { u: 80, deg: 15, r: 320 },
    { u: 100, deg: 15, r: 500 },
    { u: 100, deg: 45, r: 1000 },
  ].forEach((rg, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `ভূমি থেকে ${toBnDigits(rg.u)} m/s বেগে ও ${toBnDigits(rg.deg)}° নিক্ষেপণ কোণে ছোড়া প্রাসের অনুভূমিক পাল্লা (Range) কত m? (g = ১০ m/s²)`,
        correct: `${toBnDigits(rg.r)} m`,
        distractors: [rg.r / 2, rg.r * 2, rg.r + 30, rg.r + 75]
          .filter((x) => x > 0 && x !== rg.r)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `R = (u² sin2θ)/g = (${toBnDigits(rg.u)}² × sin${toBnDigits(2 * rg.deg)}°)/১০ = ${toBnDigits(rg.r)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের অনুভূমিক পাল্লা',
      })
    );
  });

  // 3. Rotational Kinematics & Torque tau = I alpha (22 MCQs)
  [
    { I: 4, a: 5 },
    { I: 6, a: 4 },
    { I: 8, a: 3 },
    { I: 10, a: 6 },
    { I: 12, a: 5 },
    { I: 2.5, a: 8 },
    { I: 5, a: 9 },
    { I: 15, a: 4 },
    { I: 20, a: 3 },
    { I: 3, a: 12 },
    { I: 7, a: 6 },
    { I: 9, a: 5 },
  ].forEach((tq, idx) => {
    const tau = tq.I * tq.a;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `${toBnDigits(tq.I)} kg·m² জড়তার ভ্রামকবিশিষ্ট একটি দৃঢ় বস্তুতে ${toBnDigits(tq.a)} rad/s² কৌণিক ত্বরণ সৃষ্টি করতে কত N·m টর্ক প্রয়োজন?`,
        correct: `${toBnDigits(tau)} N·m`,
        distractors: [tau / 2, tau * 2, tau + 8, tau + 15]
          .filter((x) => x !== tau)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} N·m`),
        explanation: `টর্ক τ = Iα = ${toBnDigits(tq.I)} × ${toBnDigits(tq.a)} = ${toBnDigits(tau)} N·m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · টর্ক ও কৌণিক ত্বরণ',
      })
    );
  });

  [
    { w0: 0, a: 2, t: 5 },
    { w0: 4, a: 3, t: 4 },
    { w0: 6, a: 2, t: 6 },
    { w0: 10, a: 4, t: 5 },
    { w0: 5, a: 5, t: 6 },
    { w0: 0, a: 4, t: 8 },
    { w0: 8, a: 3, t: 4 },
    { w0: 12, a: 2, t: 7 },
    { w0: 2, a: 6, t: 5 },
    { w0: 10, a: 5, t: 8 },
  ].forEach((rk, idx) => {
    const w = rk.w0 + rk.a * rk.t;
    const theta = rk.w0 * rk.t + 0.5 * rk.a * rk.t * rk.t;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি চাকা ${toBnDigits(rk.w0)} rad/s আদি কৌণিক বেগ এবং ${toBnDigits(rk.a)} rad/s² সুষম কৌণিক ত্বরণে ঘুরলে ${toBnDigits(rk.t)} s পরে এর কৌণিক সরণ (θ) কত রেডিয়ান হবে?`,
        correct: `${toBnDigits(theta)} rad`,
        distractors: [theta / 2, theta * 2, w, theta + 18, theta + 30]
          .filter((x) => x > 0 && x !== theta)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} rad`),
        explanation: `θ = ω₀t + ½αt² = (${toBnDigits(rk.w0)}×${toBnDigits(rk.t)}) + ½×${toBnDigits(rk.a)}×${toBnDigits(rk.t)}² = ${toBnDigits(theta)} rad।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কৌণিক গতি সমীকরণ',
      })
    );
  });

  // 4. Capillary rise h ~ 1/r & Gravitation Force Scaling (20 MCQs)
  [
    { r1: 0.4, h1: 6, r2: 0.2, h2: 12 },
    { r1: 0.5, h1: 4, r2: 0.25, h2: 8 },
    { r1: 0.6, h1: 5, r2: 0.3, h2: 10 },
    { r1: 0.2, h1: 10, r2: 0.4, h2: 5 },
    { r1: 0.3, h1: 12, r2: 0.6, h2: 6 },
    { r1: 0.8, h1: 3, r2: 0.4, h2: 6 },
    { r1: 0.9, h1: 4, r2: 0.3, h2: 12 },
    { r1: 0.2, h1: 15, r2: 0.6, h2: 5 },
    { r1: 1.0, h1: 3, r2: 0.5, h2: 6 },
    { r1: 0.4, h1: 8, r2: 0.8, h2: 4 },
  ].forEach((cp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(cp.r1)} mm ব্যাসার্ধের একটি কৈশিক নলে পানি ${toBnDigits(cp.h1)} cm উচ্চতায় উঠলে ${toBnDigits(cp.r2)} mm ব্যাসার্ধের একই নলে পানি কত cm উঠবে?`,
        correct: `${toBnDigits(cp.h2)} cm`,
        distractors: [cp.h1, cp.h2 * 2, cp.h2 / 2, cp.h2 + 3, cp.h2 + 7]
          .filter((x) => x > 0 && x !== cp.h2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `জুরিনের সূত্র (Jurin's Law) অনুসারে h ∝ 1/r (h₁r₁ = h₂r₂); তাই h₂ = (${toBnDigits(cp.h1)}×${toBnDigits(cp.r1)})/${toBnDigits(cp.r2)} = ${toBnDigits(cp.h2)} cm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · কৈশিক নলে আরোহণ',
      })
    );
  });

  [
    { mScale: 'উভয় ভর দ্বিগুণ', rScale: 'দূরত্ব অর্ধেক', fFactor: '১৬ গুণ' },
    { mScale: 'উভয় ভর দ্বিগুণ', rScale: 'দূরত্ব দ্বিগুণ', fFactor: 'অপরিবর্তিত (১ গুণ)' },
    { mScale: 'একটি ভর ৩ গুণ', rScale: 'দূরত্ব ৩ গুণ', fFactor: '১/৩ গুণ' },
    { mScale: 'উভয় ভর ৩ গুণ', rScale: 'দূরত্ব ৩ গুণ', fFactor: '১ গুণ (অপরিবর্তিত)' },
    { mScale: 'একটি ভর ৪ গুণ', rScale: 'দূরত্ব দ্বিগুণ', fFactor: '১ গুণ' },
    { mScale: 'উভয় ভর অপরিবর্তিত', rScale: 'দূরত্ব ৩ গুণ', fFactor: '১/৯ গুণ' },
    { mScale: 'উভয় ভর অপরিবর্তিত', rScale: 'দূরত্ব অর্ধেক', fFactor: '৪ গুণ' },
    { mScale: 'উভয় ভর ৪ গুণ', rScale: 'দূরত্ব অর্ধেক', fFactor: '৬৪ গুণ' },
    { mScale: 'একটি ভর দ্বিগুণ', rScale: 'দূরত্ব অর্ধেক', fFactor: '৮ গুণ' },
    { mScale: 'উভয় ভর অর্ধেক', rScale: 'দূরত্ব অর্ধেক', fFactor: '১ গুণ (সমান)' },
  ].forEach((gf, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `দুটি বস্তুর মধ্যকার আকর্ষণ বলের ক্ষেত্রে যদি ${gf.mScale} এবং ${gf.rScale} করা হয়, তবে মহাকর্ষ বল প্রাথমিক মানের কত গুণ হবে?`,
        correct: gf.fFactor,
        distractors: ['২ গুণ', '৪ গুণ', '৮ গুণ', '১৬ গুণ', '৬৪ গুণ', '১/৪ গুণ', '১/৯ গুণ', '১/৩ গুণ']
          .filter((x) => x !== gf.fFactor)
          .slice(0, 4),
        explanation: `F = G m₁m₂/r² সূত্রানুসারে নতুন বল প্রাথমিক বলের ${gf.fFactor} হবে।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · নিউটনের মহাকর্ষ সূত্র',
      })
    );
  });

  // 5. Doppler Effect & Moving Source (12 MCQs)
  [
    { f: 660, vs: 30, v: 330, toward: true, fApp: 726 },
    { f: 660, vs: 30, v: 330, toward: false, fApp: 605 },
    { f: 340, vs: 34, v: 340, toward: false, fApp: 309.09 },
    { f: 680, vs: 17, v: 340, toward: true, fApp: 715.79 },
    { f: 500, vs: 50, v: 350, toward: true, fApp: 583.33 },
    { f: 500, vs: 50, v: 350, toward: false, fApp: 437.5 },
    { f: 700, vs: 35, v: 350, toward: true, fApp: 777.78 },
    { f: 700, vs: 35, v: 350, toward: false, fApp: 636.36 },
    { f: 600, vs: 30, v: 330, toward: true, fApp: 660 },
    { f: 600, vs: 30, v: 330, toward: false, fApp: 550 },
    { f: 400, vs: 20, v: 340, toward: true, fApp: 425 },
    { f: 400, vs: 20, v: 340, toward: false, fApp: 377.78 },
  ].forEach((dp, idx) => {
    const dir = dp.toward ? 'স্থির শ্রোতার দিকে এগিয়ে আসছে' : 'স্থির শ্রোতা থেকে দূরে সরে যাচ্ছে';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(dp.f)} Hz কম্পাঙ্কের হুইসেল বাজিয়ে একটি ট্রেন ${toBnDigits(dp.vs)} m/s বেগে ${dir}। বাতাসে শব্দের বেগ ${toBnDigits(dp.v)} m/s হলে শ্রোতার নিকট শ্রুত আপাত কম্পাঙ্ক কত Hz?`,
        correct: `${toBnDigits(dp.fApp)} Hz`,
        distractors: [dp.f, Number((dp.fApp + 45).toFixed(2)), Number((dp.fApp - 45).toFixed(2)), dp.f * 2]
          .filter((x) => x > 0 && x !== dp.fApp)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Hz`),
        explanation: `ডপলার ক্রিয়া: f' = f × [v / (v ${dp.toward ? '-' : '+'} v_s)] = ${toBnDigits(dp.fApp)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ডপলার ক্রিয়া',
      })
    );
  });

  // 6. Friction & Banking of Roads & Elevator Gravity (16 MCQs)
  [
    { r: 40, v: 20, tanVal: '১.০' },
    { r: 100, v: 10, tanVal: '০.১' },
    { r: 50, v: 10, tanVal: '০.২' },
    { r: 20, v: 10, tanVal: '০.৫' },
    { r: 90, v: 30, tanVal: '১.০' },
    { r: 80, v: 20, tanVal: '০.৫' },
  ].forEach((bk, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(bk.r)} m ব্যাসার্ধের একটি বাঁক ঘোরার সময় গাড়ির সর্বোচ্চ নিরাপদ বেগ ${toBnDigits(bk.v)} m/s হলে রাস্তার ব্যাংকিং কোণের ট্যানজেন্ট (tanθ) কত? (g = ১০ m/s²)`,
        correct: bk.tanVal,
        distractors: ['০.১', '০.২', '০.২৫', '০.৫', '১.০', '২.০'].filter((x) => x !== bk.tanVal).slice(0, 4),
        explanation: `tanθ = v²/(rg) = ${toBnDigits(bk.v)}²/(${toBnDigits(bk.r)}×১০) = ${bk.tanVal}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · রাস্তার ব্যাংকিং',
      })
    );
  });

  [
    { m: 60, a: 2, dir: 'উপরের দিকে', n: 720 },
    { m: 60, a: 2, dir: 'নিচের দিকে', n: 480 },
    { m: 50, a: 4, dir: 'উপরের দিকে', n: 700 },
    { m: 50, a: 4, dir: 'নিচের দিকে', n: 300 },
    { m: 80, a: 2, dir: 'উপরের দিকে', n: 960 },
    { m: 80, a: 2, dir: 'নিচের দিকে', n: 640 },
    { m: 70, a: 3, dir: 'উপরের দিকে', n: 910 },
    { m: 70, a: 3, dir: 'নিচের দিকে', n: 490 },
    { m: 40, a: 5, dir: 'উপরের দিকে', n: 600 },
    { m: 40, a: 5, dir: 'নিচের দিকে', n: 200 },
  ].forEach((el, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(el.m)} kg ভরের এক ব্যক্তি একটি লিফটে অবস্থান করছেন। লিফটটি ${toBnDigits(el.a)} m/s² ত্বরণে ${el.dir} চললে ব্যক্তির অনুভূত আপাত ওজন কত N? (g = ১০ m/s²)`,
        correct: `${toBnDigits(el.n)} N`,
        distractors: [el.m * 10, el.n + 100, el.n - 100, el.n * 2]
          .filter((x) => x > 0 && x !== el.n)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} N`),
        explanation: `${el.dir} ত্বরণে R = m(g ${el.dir === 'উপরের দিকে' ? '+' : '-'} a) = ${toBnDigits(el.m)}(১০ ${el.dir === 'উপরের দিকে' ? '+' : '-'} ${toBnDigits(el.a)}) = ${toBnDigits(el.n)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · লিফটে আপাত ওজন',
      })
    );
  });

  // 7. Gas Kinetic Energy & Percentage Error Propagation (18 MCQs)
  [
    { n: 2, tK: 300, ekJ: 7479 },
    { n: 1, tK: 300, ekJ: 3739.5 },
    { n: 4, tK: 300, ekJ: 14958 },
    { n: 2, tK: 600, ekJ: 14958 },
    { n: 1, tK: 400, ekJ: 4986 },
    { n: 2, tK: 500, ekJ: 12465 },
    { n: 3, tK: 200, ekJ: 7479 },
    { n: 5, tK: 400, ekJ: 24930 },
  ].forEach((gk, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(gk.tK)} K তাপমাত্রায় ${toBnDigits(gk.n)} মোল আদর্শ গ্যাসের অণুগুলোর মোট রৈখিক গতিশক্তি প্রায় কত জুল? (R = ৮.৩১ J/mol·K)`,
        correct: `${toBnDigits(gk.ekJ)} J`,
        distractors: [gk.ekJ / 2, gk.ekJ * 2, Number((gk.ekJ / 3).toFixed(1)), gk.ekJ + 1500]
          .filter((x) => x !== gk.ekJ)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `গ্যাসের মোট রৈখিক গতিশক্তি E_k = (3/2)nRT = ১.৫ × ${toBnDigits(gk.n)} × ৮.৩১ × ${toBnDigits(gk.tK)} = ${toBnDigits(gk.ekJ)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গ্যাসের গতিশক্তি',
      })
    );
  });

  [
    { qty: 'বৃত্তের ক্ষেত্রফল (A = πr²)', meas: 'ব্যাসার্ধ (r)', errIn: 2, errOut: 4 },
    { qty: 'বৃত্তের ক্ষেত্রফল (A = πr²)', meas: 'ব্যাসার্ধ (r)', errIn: 3, errOut: 6 },
    { qty: 'গোলকের আয়তন (V = 4/3 πr³)', meas: 'ব্যাসার্ধ (r)', errIn: 1, errOut: 3 },
    { qty: 'গোলকের আয়তন (V = 4/3 πr³)', meas: 'ব্যাসার্ধ (r)', errIn: 2, errOut: 6 },
    { qty: 'গোলকের আয়তন (V = 4/3 πr³)', meas: 'ব্যাসার্ধ (r)', errIn: 3, errOut: 9 },
    { qty: 'ঘনকের আয়তন (V = a³)', meas: 'বাহুর দৈর্ঘ্য (a)', errIn: 1.5, errOut: 4.5 },
    { qty: 'গোলকের পৃষ্ঠতলের ক্ষেত্রফল (4πr²)', meas: 'ব্যাসার্ধ (r)', errIn: 2.5, errOut: 5 },
    { qty: 'দোলনকাল থেকে g নির্ণয়ে (g = 4π²L/T²)', meas: 'দোলনকাল (T) (L ত্রুটিহীন)', errIn: 2, errOut: 4 },
    { qty: 'গতিশক্তি (E_k = ½mv²)', meas: 'বেগ (v) (m ত্রুটিহীন)', errIn: 4, errOut: 8 },
    { qty: 'বৃত্তাকার চাকতির জড়তার ভ্রামক (½mr²)', meas: 'ব্যাসার্ধ (r) (m ত্রুটিহীন)', errIn: 1.5, errOut: 3 },
  ].forEach((pe, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${pe.qty} নির্ণয়ের পরীক্ষায় যদি ${pe.meas} পরিমাপে শতকরা ত্রুটি ${toBnDigits(pe.errIn)}% হয়, তবে চূড়ান্ত ফলে সর্বাধিক শতকরা ত্রুটি কত?`,
        correct: `${toBnDigits(pe.errOut)}%`,
        distractors: [pe.errIn, pe.errOut + 2, pe.errOut * 2, pe.errOut + 5]
          .filter((x) => x !== pe.errOut)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}%`),
        explanation: `ঘাতের (Power) নিয়মানুসারে ΔQ/Q = n(Δx/x); তাই শতকরা ত্রুটি = ${toBnDigits(pe.errOut)}%।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · শতকরা ত্রুটি বিশ্লেষণ',
      })
    );
  });

  // 8. Circular Speed v = w r & Centripetal Acceleration a_c = v^2 / r (20 MCQs)
  [
    { v: 10, r: 2 },
    { v: 12, r: 3 },
    { v: 15, r: 5 },
    { v: 20, r: 4 },
    { v: 24, r: 6 },
    { v: 30, r: 10 },
    { v: 18, r: 9 },
    { v: 40, r: 8 },
    { v: 50, r: 25 },
    { v: 16, r: 4 },
  ].forEach((cc, idx) => {
    const ac = (cc.v * cc.v) / cc.r;
    const w = Number((cc.v / cc.r).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(cc.r)} m ব্যাসার্ধের বৃত্তাকার পথে একটি কণা ${toBnDigits(cc.v)} m/s সমদ্রুতিতে ঘুরলে এর কেন্দ্রমুখী ত্বরণ কত m/s²?`,
        correct: `${toBnDigits(ac)} m/s²`,
        distractors: [ac / 2, ac * 2, w, ac + 15]
          .filter((x) => x !== ac)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m/s²`),
        explanation: `কেন্দ্রমুখী ত্বরণ a_c = v²/r = ${toBnDigits(cc.v)}² / ${toBnDigits(cc.r)} = ${toBnDigits(ac)} m/s²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · কেন্দ্রমুখী ত্বরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(cc.r)} m ব্যাসার্ধের বৃত্তে ${toBnDigits(cc.v)} m/s রৈখিক বেগে ঘূর্ণায়মান কণার কৌণিক বেগ (ω) কত rad/s?`,
        correct: `${toBnDigits(w)} rad/s`,
        distractors: [w * 2, w / 2, ac, w + 4]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== w)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} rad/s`),
        explanation: `কৌণিক বেগ ω = v/r = ${toBnDigits(cc.v)} / ${toBnDigits(cc.r)} = ${toBnDigits(w)} rad/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · রৈখিক ও কৌণিক বেগের সম্পর্ক',
      })
    );
  });

  // 9. Escape velocity from Orbital velocity (6 MCQs)
  [
    { vOrb: 4, vEsc: '৪√২ km/s' },
    { vOrb: 5, vEsc: '৫√২ km/s' },
    { vOrb: 6, vEsc: '৬√২ km/s' },
    { vOrb: 7, vEsc: '৭√২ km/s' },
    { vOrb: 8, vEsc: '৮√২ km/s' },
    { vOrb: 10, vEsc: '১০√২ km/s' },
  ].forEach((ev, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো গ্রহের পৃষ্ঠের ঠিক কাছাকাছি প্রদক্ষিণরত উপগ্রহের কক্ষীয় বেগ ${toBnDigits(ev.vOrb)} km/s হলে ঐ গ্রহ থেকে মুক্তিবেগ কত হবে?`,
        correct: ev.vEsc,
        distractors: [
          `${toBnDigits(ev.vOrb)} km/s`,
          `${toBnDigits(ev.vOrb * 2)} km/s`,
          `${toBnDigits(ev.vOrb)}√৩ km/s`,
          `${toBnDigits(ev.vOrb / 2)} km/s`,
        ],
        explanation: `মুক্তিবেগ v_e = √২ × কক্ষীয় বেগ (v_o) = ${ev.vEsc}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · কক্ষীয় বেগ ও মুক্তিবেগ',
      })
    );
  });

  return list;
}
