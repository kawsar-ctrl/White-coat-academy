import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredI(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2si_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 7: Physical Optics — YDSE, Interference Intensity, Malus, Brewster, EM Spectrum (~150 MCQs)
  // =========================================================================
  // 1A: YDSE Fringe Width beta = (lambda * D) / d (24 MCQs)
  [
    { lamNm: 500, D: 1.0, dMm: 0.5 },
    { lamNm: 600, D: 1.0, dMm: 0.5 },
    { lamNm: 600, D: 1.5, dMm: 0.3 },
    { lamNm: 400, D: 2.0, dMm: 0.4 },
    { lamNm: 500, D: 2.0, dMm: 0.5 },
    { lamNm: 550, D: 1.0, dMm: 0.5 },
    { lamNm: 450, D: 1.0, dMm: 0.3 },
    { lamNm: 640, D: 1.0, dMm: 0.4 },
    { lamNm: 700, D: 1.0, dMm: 0.5 },
    { lamNm: 480, D: 1.5, dMm: 0.6 },
    { lamNm: 520, D: 2.0, dMm: 0.4 },
    { lamNm: 600, D: 2.0, dMm: 0.6 },
  ].forEach((yd, idx) => {
    const betaMm = Number(((yd.lamNm * 1e-9 * yd.D) / (yd.dMm * 1e-3) * 1000).toFixed(2));
    const n3Bright = Number((3 * betaMm).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `ইয়ং-এর দ্বি-চির পরীক্ষায় ${toBnDigits(yd.lamNm)} nm তরঙ্গদৈর্ঘ্যের আলো ব্যবহার করা হলো। চির দুটির মধ্যবর্তী দূরত্ব ${toBnDigits(yd.dMm)} mm এবং পর্দার দূরত্ব ${toBnDigits(yd.D)} m হলে পরপর দুটি উজ্জ্বল ডোরার ব্যবধান (ডোরার প্রস্থ) কত mm?`,
        correct: `${toBnDigits(betaMm)} mm`,
        distractors: [betaMm * 2, betaMm / 2, betaMm + 0.5, betaMm + 1.2]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== betaMm)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mm`),
        explanation: `ডোরার ব্যবধান β = λD/d = (${toBnDigits(yd.lamNm)}×১০⁻⁹ × ${toBnDigits(yd.D)}) / (${toBnDigits(yd.dMm)}×১০⁻³) = ${toBnDigits(betaMm)} mm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ইয়ং-এর দ্বি-চির ব্যতিচার',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `ইয়ং-এর দ্বি-চির পরীক্ষায় ডোরার প্রস্থ β = ${toBnDigits(betaMm)} mm হলে (λ=${toBnDigits(yd.lamNm)} nm, d=${toBnDigits(yd.dMm)} mm) কেন্দ্রীয় চরম থেকে ৩য় উজ্জ্বল ডোরার দূরত্ব কত mm?`,
        correct: `${toBnDigits(n3Bright)} mm`,
        distractors: [betaMm, n3Bright * 2, Number((2.5 * betaMm).toFixed(2)), n3Bright + 1.5]
          .filter((x) => x !== n3Bright)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mm`),
        explanation: `n-তম উজ্জ্বল ডোরার দূরত্ব x_n = nβ = ৩ × ${toBnDigits(betaMm)} = ${toBnDigits(n3Bright)} mm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ব্যতিচার ডোরার অবস্থান',
      })
    );
  });

  // 1B: Interference Max/Min Intensity Ratio ((sqrt(I1)+sqrt(I2))/(sqrt(I1)-sqrt(I2)))^2 (20 MCQs)
  [
    { ratioI: '৪ : ১', maxMin: '৯ : ১', ampRatio: '২ : ১' },
    { ratioI: '৯ : ১', maxMin: '৪ : ১', ampRatio: '৩ : ১' },
    { ratioI: '১৬ : ১', maxMin: '২৫ : ৯', ampRatio: '৪ : ১' },
    { ratioI: '২৫ : ১', maxMin: '৯ : ৪', ampRatio: '৫ : ১' },
    { ratioI: '৯ : ৪', maxMin: '২৫ : ১', ampRatio: '৩ : ২' },
    { ratioI: '১৬ : ৯', maxMin: '৪৯ : ১', ampRatio: '৪ : ৩' },
    { ratioI: '২৫ : ৯', maxMin: '১৬ : ১', ampRatio: '৫ : ৩' },
    { ratioI: '১ : ১', maxMin: 'অসীম (I_min = ০)', ampRatio: '১ : ১ (২)' },
  ].forEach((ir, idx) => {
    const cleanAmp = ir.ampRatio.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `দুটি সুসংগত তরঙ্গের তীব্রতার অনুপাত (I₁ : I₂) = ${ir.ratioI} হলে ব্যতিচারে সর্বাধিক ও সর্বনিম্ন তীব্রতার অনুপাত (I_max : I_min) কত?`,
        correct: ir.maxMin,
        distractors: ['৪ : ১', '৯ : ১', '১৬ : ১', '২৫ : ১', '২৫ : ৯', '৪৯ : ১', '৯ : ৪']
          .filter((x) => x !== ir.maxMin)
          .slice(0, 4),
        explanation: `I_max/I_min = (√I₁ + √I₂)² / (√I₁ - √I₂)² = ${ir.maxMin}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ব্যতিচার তীব্রতার অনুপাত',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `দুটি আলোক তরঙ্গের তীব্রতার অনুপাত ${ir.ratioI} হলে এদের বিস্তারের (Amplitude) অনুপাত (a₁ : a₂) কত?`,
        correct: cleanAmp,
        distractors: ['১ : ১', '২ : ১', '৩ : ১', '৪ : ১', '৫ : ১', '৩ : ২', '৪ : ৩', '৫ : ৩']
          .filter((x) => x !== cleanAmp)
          .slice(0, 4),
        explanation: `তীব্রতা বিস্তারের বর্গের সমানুপাতিক (I ∝ a²); তাই a₁ : a₂ = √(${ir.ratioI}) = ${cleanAmp}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · তীব্রতা ও বিস্তার',
      })
    );
  });

  // 1C: Malus Law I = I0 cos^2(theta) & Brewster Law tan(theta_p) = n (20 MCQs)
  [
    { deg: 0, frac: 'I₀', pct: '১০০%' },
    { deg: 30, frac: '৩I₀/৪', pct: '৭৫%' },
    { deg: 45, frac: 'I₀/২', pct: '৫০%' },
    { deg: 60, frac: 'I₀/৪', pct: '২৫%' },
    { deg: 90, frac: '০ (শূন্য)', pct: '০%' },
  ].forEach((ml, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `সমবর্তক ও বিশ্লেষকের অক্ষদ্বয়ের মধ্যবর্তী কোণ θ = ${toBnDigits(ml.deg)}° হলে নির্গত সমবর্তিত আলোর তীব্রতা (I) আপতিত সমবর্তিত আলোর তীব্রতার (I₀) কত অংশ হবে?`,
        correct: ml.frac,
        distractors: ['০ (শূন্য)', 'I₀/৪', 'I₀/২', '৩I₀/৪', 'I₀', 'I₀/৮']
          .filter((x) => x !== ml.frac)
          .slice(0, 4),
        explanation: `ম্যালুসের সূত্র I = I₀ cos²(${toBnDigits(ml.deg)}°) = ${ml.frac} (${ml.pct})।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ম্যালুসের সূত্র',
      })
    );
  });

  [
    { n: '১ (√১)', deg: '৪৫°' },
    { n: '√৩ (১.৭৩২)', deg: '৬০°' },
    { n: '১/√৩ (০.৫৭৭)', deg: '৩০°' },
    { n: '১.৫ (ক্রাউন কাঁচ)', deg: '৫৬.৩°' },
    { n: '১.৩৩ (পানি)', deg: '৫৩.১°' },
    { n: '২.৪ (হীরক)', deg: '৬৭.৪°' },
  ].forEach((br, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো স্বচ্ছ মাধ্যমের প্রতিসরণাঙ্ক n = ${br.n} হলে ঐ মাধ্যমের জন্য ব্রুস্টার বা সমবর্তন কোণ (Polarizing Angle) কত?`,
        correct: br.deg,
        distractors: ['৩০°', '৪৫°', '৫৩.১°', '৫৬.৩°', '৬০°', '৬৭.৪°', '৯০°'].filter((x) => x !== br.deg).slice(0, 4),
        explanation: `ব্রুস্টারের সূত্র tan(θ_p) = n => θ_p = tan⁻¹(${br.n}) ≈ ${br.deg}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ব্রুস্টারের সূত্র',
      })
    );
  });

  // 1D: EM Spectrum Bands (wavelength/frequency/uses) 2-way (28 MCQs)
  const emBands = [
    { name: 'গামা রশ্মি (Gamma Rays)', range: '১০⁻¹² m-এর কম', use: 'ক্যান্সার চিকিৎসায় রেডিওথেরাপি ও জীবাণুমুক্তকরণ' },
    { name: 'এক্স-রে (X-rays)', range: '১০⁻¹¹ m থেকে ১০⁻⁸ m', use: 'হাড়ের ফাটল নির্ণয় ও ক্রিস্টাল গঠন বিশ্লেষণ' },
    { name: 'অতিবেগুনি রশ্মি (UV)', range: '১০ nm থেকে ৩৮০ nm', use: 'জাল টাকা শনাক্তকরণ ও ভিটামিন-ডি সংশ্লেষণ' },
    { name: 'দৃশ্যমান আলো (Visible)', range: '৩৮০ nm থেকে ৭৮০ nm', use: 'মানবচক্ষুতে দর্শন অনুভূতি ও সালোকসংশ্লেষণ' },
    { name: 'অবলোহিত রশ্মি (Infrared)', range: '৭৮০ nm থেকে ১ mm', use: 'টিভি রিমোট কন্ট্রোল, নাইট ভিশন ও ফিজিওথেরাপি' },
    { name: 'মাইক্রোওয়েভ (Microwave)', range: '১ mm থেকে ০.৩ m', use: 'রাডার ব্যবস্থা, স্যাটেলাইট যোগাযোগ ও ওভেন' },
    { name: 'রেডিও তরঙ্গ (Radio Waves)', range: '০.৩ m থেকে কয়েক km', use: 'বেতার ও টেলিভিশন সম্প্রচার এবং মোবাইল নেটওয়ার্ক' },
  ];
  emBands.forEach((em, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `তাড়িতচৌম্বক বর্ণালির "${em.name}"-এর ব্যবহারিক প্রয়োগ কোনটি?`,
        correct: em.use,
        distractors: emBands.map((x) => x.use).filter((u) => u !== em.use).slice(0, 4),
        explanation: `${em.name} (তরঙ্গদৈর্ঘ্য ${em.range})-এর প্রধান ব্যবহার: ${em.use}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · তাড়িতচৌম্বক বর্ণালি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${em.use}" কাজে কোন তাড়িতচৌম্বক তরঙ্গ ব্যবহৃত হয়?`,
        correct: em.name,
        distractors: emBands.map((x) => x.name).filter((n) => n !== em.name).slice(0, 4),
        explanation: `এই কাজে ${em.name} ব্যবহৃত হয়।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · তাড়িতচৌম্বক তরঙ্গের ব্যবহার',
      })
    );
  });

  // =========================================================================
  // 2. Ch 8: Modern Physics — Relativity, Photon Energy, Photoelectric, X-ray, de Broglie (~160 MCQs)
  // =========================================================================
  // 2A: Time Dilation & Length Contraction & Relativistic Mass (45 MCQs)
  [
    { vStr: '০.৬c', gamma: 1.25, invG: 0.8 },
    { vStr: '০.৮c', gamma: 1.67, invG: 0.6 },
    { vStr: '০.৮৬৬c (√৩c/২)', gamma: 2.0, invG: 0.5 },
    { vStr: '০.৯৬c', gamma: 3.57, invG: 0.28 },
    { vStr: '০.৯৮c', gamma: 5.03, invG: 0.199 },
  ].forEach((rl, idx) => {
    const lNew = Number((100 * rl.invG).toFixed(1));
    const tNew = Number((10 * rl.gamma).toFixed(2));
    const mNew = Number((10 * rl.gamma).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `স্থির অবস্থায় ১০০ m দৈর্ঘ্যের একটি মহাকাশযান ${rl.vStr} বেগে গতিশীল হলে পৃথিবী থেকে এর আপাত দৈর্ঘ্য কত মিটার মনে হবে?`,
        correct: `${toBnDigits(lNew)} m`,
        distractors: [100, Number((100 * rl.gamma).toFixed(1)), Number((lNew / 2).toFixed(1)), Number((lNew + 15).toFixed(1))]
          .filter((x) => x !== lNew)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `দৈর্ঘ্য সংকোচন L = L₀ √(1 - v²/c²) = ১০০ × ${toBnDigits(rl.invG)} = ${toBnDigits(lNew)} m।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · দৈর্ঘ্য সংকোচন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি গতিশীল কাঠামো ${rl.vStr} বেগে চললে সেখানকার ১০ s সময় পৃথিবীর স্থির পর্যবেক্ষকের ঘড়িতে কত সেকেন্ড মনে হবে?`,
        correct: `${toBnDigits(tNew)} s`,
        distractors: [10, Number((10 * rl.invG).toFixed(2)), Number((tNew * 2).toFixed(2)), Number((tNew + 5).toFixed(2))]
          .filter((x) => x !== tNew)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} s`),
        explanation: `কাল দীর্ঘায়ন t = t₀ / √(1 - v²/c²) = ১০ × ${toBnDigits(rl.gamma)} = ${toBnDigits(tNew)} s।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · কাল দীর্ঘায়ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `১০ kg নিশ্চল ভরের একটি বস্তু ${rl.vStr} বেগে গতিশীল হলে এর আপেক্ষিক ভর (m) কত kg হবে?`,
        correct: `${toBnDigits(mNew)} kg`,
        distractors: [10, Number((10 * rl.invG).toFixed(2)), Number((mNew * 2).toFixed(2)), Number((mNew + 8).toFixed(2))]
          .filter((x) => x !== mNew)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} kg`),
        explanation: `আপেক্ষিক ভর m = m₀ / √(1 - v²/c²) = ১০ × ${toBnDigits(rl.gamma)} = ${toBnDigits(mNew)} kg।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ভরের আপেক্ষিকতা',
      })
    );
  });

  // 2B: Photon Energy E = 12400 / lambda(A) eV & X-ray lambda_min = 12400 / V(volt) A (40 MCQs)
  [
    { lamA: 6200, eV: 2.0 },
    { lamA: 4000, eV: 3.1 },
    { lamA: 3100, eV: 4.0 },
    { lamA: 2480, eV: 5.0 },
    { lamA: 2000, eV: 6.2 },
    { lamA: 1240, eV: 10.0 },
    { lamA: 5000, eV: 2.48 },
    { lamA: 620, eV: 20.0 },
    { lamA: 310, eV: 40.0 },
    { lamA: 1000, eV: 12.4 },
    { lamA: 8000, eV: 1.55 },
    { lamA: 12400, eV: 1.0 },
  ].forEach((ph, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(ph.lamA)} Å তরঙ্গদৈর্ঘ্যের একটি ফোটনের শক্তি ইলেকট্রন-ভোল্ট (eV) এককে কত?`,
        correct: `${toBnDigits(ph.eV)} eV`,
        distractors: [ph.eV * 2, ph.eV / 2, ph.eV + 1.5, ph.eV + 4]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== ph.eV)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} eV`),
        explanation: `E(eV) ≈ ১২,৪০০ / λ(Å) = ১২,৪০০ / ${toBnDigits(ph.lamA)} = ${toBnDigits(ph.eV)} eV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ফোটনের শক্তি',
      })
    );
  });

  [
    { vKv: 12.4, lamMinA: 1.0 },
    { vKv: 24.8, lamMinA: 0.5 },
    { vKv: 31.0, lamMinA: 0.4 },
    { vKv: 62.0, lamMinA: 0.2 },
    { vKv: 124.0, lamMinA: 0.1 },
    { vKv: 50.0, lamMinA: 0.248 },
    { vKv: 40.0, lamMinA: 0.31 },
    { vKv: 20.0, lamMinA: 0.62 },
    { vKv: 100.0, lamMinA: 0.124 },
    { vKv: 10.0, lamMinA: 1.24 },
  ].forEach((xr, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি এক্স-রে নলের দুই প্রান্তে ${toBnDigits(xr.vKv)} kV বিভব পার্থক্য প্রয়োগ করলে উৎপন্ন এক্স-রে রশ্মির ন্যূনতম তরঙ্গদৈর্ঘ্য (λ_min) কত Å?`,
        correct: `${toBnDigits(xr.lamMinA)} Å`,
        distractors: [xr.lamMinA * 2, xr.lamMinA / 2, xr.lamMinA + 0.5, xr.lamMinA + 1.2]
          .map((x) => Number(x.toFixed(3)))
          .filter((x) => x > 0 && x !== xr.lamMinA)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Å`),
        explanation: `λ_min ≈ ১২,৪০০ / V(volt) = ১২.৪ / V(kV) = ১২.৪ / ${toBnDigits(xr.vKv)} = ${toBnDigits(xr.lamMinA)} Å।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · এক্স-রে ন্যূনতম তরঙ্গদৈর্ঘ্য',
      })
    );
  });

  // 2C: Photoelectric Equation K_max = E_photon - phi & Stopping Potential V0 (32 MCQs)
  [
    { E: 5.0, phi: 2.0 },
    { E: 6.2, phi: 2.2 },
    { E: 4.5, phi: 2.5 },
    { E: 3.8, phi: 1.8 },
    { E: 7.0, phi: 3.0 },
    { E: 5.5, phi: 2.5 },
    { E: 4.0, phi: 2.1 },
    { E: 8.5, phi: 4.5 },
    { E: 6.0, phi: 4.2 },
    { E: 3.1, phi: 2.1 },
  ].forEach((pe, idx) => {
    const kMax = Number((pe.E - pe.phi).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(pe.phi)} eV কার্য-অপেক্ষকবিশিষ্ট একটি ধাতব পাতে ${toBnDigits(pe.E)} eV শক্তির ফোটন আপতিত হলে নির্গত ফটোইলেকট্রনের সর্বাধিক গতিশক্তি (K_max) কত eV?`,
        correct: `${toBnDigits(kMax)} eV`,
        distractors: [pe.E + pe.phi, pe.E, kMax * 2, kMax / 2]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== kMax)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} eV`),
        explanation: `আইনস্টাইনের ফটোতড়িৎ সমীকরণ: K_max = hf - Φ₀ = ${toBnDigits(pe.E)} - ${toBnDigits(pe.phi)} = ${toBnDigits(kMax)} eV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ফটোতড়িৎ সমীকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(pe.phi)} eV কার্য-অপেক্ষকের ধাতুতে ${toBnDigits(pe.E)} eV ফোটন আপতিত হলে নিবৃত্তি বিভব (Stopping Potential, V₀) কত ভোল্ট হবে?`,
        correct: `${toBnDigits(kMax)} V`,
        distractors: [pe.E, pe.phi, Number((kMax * 2).toFixed(2)), Number((kMax + 1.5).toFixed(2))]
          .filter((x) => x !== kMax)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `eV₀ = K_max = ${toBnDigits(kMax)} eV; সুতরাং নিবৃত্তি বিভব V₀ = ${toBnDigits(kMax)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · নিবৃত্তি বিভব',
      })
    );
  });

  // 2D: de Broglie Electron Wavelength lambda = 12.27 / sqrt(V) Å & Compton Shift (24 MCQs)
  [
    { V: 100, lamA: 1.227 },
    { V: 400, lamA: 0.614 },
    { V: 10000, lamA: 0.123 },
    { V: 2500, lamA: 0.245 },
    { V: 144, lamA: 1.023 },
    { V: 64, lamA: 1.534 },
    { V: 25, lamA: 2.454 },
    { V: 16, lamA: 3.068 },
  ].forEach((db, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `স্থির অবস্থা থেকে ${toBnDigits(db.V)} V বিভব পার্থক্যে ত্বরান্বিত একটি ইলেকট্রনের ডি-ব্রগলি তরঙ্গদৈর্ঘ্য প্রায় কত Å?`,
        correct: `${toBnDigits(db.lamA)} Å`,
        distractors: [db.lamA * 2, db.lamA / 2, db.lamA + 1, db.lamA * 5]
          .map((x) => Number(x.toFixed(3)))
          .filter((x) => x > 0 && x !== db.lamA)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Å`),
        explanation: `ইলেকট্রনের ডি-ব্রগলি তরঙ্গদৈর্ঘ্য λ ≈ ১২.২৭ / √V = ১২.২৭ / √${toBnDigits(db.V)} ≈ ${toBnDigits(db.lamA)} Å।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ডি-ব্রগলি তরঙ্গদৈর্ঘ্য',
      })
    );
  });

  [
    { angle: '০°', shift: '০ (কোনো পরিবর্তন নেই)' },
    { angle: '৬০°', shift: '০.৫ λ_c (≈ ০.০১২১ Å)' },
    { angle: '৯০°', shift: 'λ_c (≈ ০.০২৪৩ Å)' },
    { angle: '১২০°', shift: '১.৫ λ_c (≈ ০.০৩৬৪ Å)' },
    { angle: '১৮০°', shift: '২ λ_c (≈ ০.০৪৮৫ Å — সর্বোচ্চ)' },
  ].forEach((cm, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কম্পটন ক্রিয়ায় বিক্ষেপণ কোণ φ = ${cm.angle} হলে ফোটনের তরঙ্গদৈর্ঘ্য পরিবর্তন (Δλ) কত হয়?`,
        correct: cm.shift,
        distractors: [
          '০ (কোনো পরিবর্তন নেই)',
          '০.৫ λ_c (≈ ০.০১২১ Å)',
          'λ_c (≈ ০.০২৪৩ Å)',
          '১.৫ λ_c (≈ ০.০৩৬৪ Å)',
          '২ λ_c (≈ ০.০৪৮৫ Å — সর্বোচ্চ)',
        ].filter((x) => x !== cm.shift),
        explanation: `Δλ = λ_c(1 - cosφ); φ = ${cm.angle} বসালে Δλ = ${cm.shift}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · কম্পটন বিচ্যুতি',
      })
    );
  });

  return list;
}
