import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredO(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2so_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 5: LCR Resonance Frequency, Mutual Inductance & Peak-Average AC (~50 MCQs)
  // =========================================================================
  // 1A: Mutual Inductance E = M (dI / dt) (14 MCQs)
  [
    { M: 0.5, dI: 6, dt: 0.1 },
    { M: 0.2, dI: 10, dt: 0.1 },
    { M: 1.5, dI: 4, dt: 0.2 },
    { M: 2.0, dI: 5, dt: 0.5 },
    { M: 0.4, dI: 15, dt: 0.3 },
    { M: 0.8, dI: 5, dt: 0.2 },
    { M: 3.0, dI: 8, dt: 0.4 },
    { M: 1.2, dI: 10, dt: 0.3 },
    { M: 0.6, dI: 12, dt: 0.2 },
    { M: 2.5, dI: 4, dt: 0.5 },
  ].forEach((mi, idx) => {
    const emf = Number(((mi.M * mi.dI) / mi.dt).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `দুটি কুণ্ডলীর পারস্পরিক আবেশ গুণাঙ্ক M = ${toBnDigits(mi.M)} H। প্রাথমিক কুণ্ডলীতে ${toBnDigits(mi.dt)} s সময়ে প্রবাহ ${toBnDigits(mi.dI)} A পরিবর্তিত হলে গৌণ কুণ্ডলীতে আবিষ্ট EMF কত V?`,
        correct: `${toBnDigits(emf)} V`,
        distractors: Array.from(new Set([emf * 2, emf / 2, emf + 6, emf + 14, emf + 25]))
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== emf)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `|E| = M (ΔI/Δt) = ${toBnDigits(mi.M)} × (${toBnDigits(mi.dI)}/${toBnDigits(mi.dt)}) = ${toBnDigits(emf)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · পারস্পরিক আবেশ',
      })
    );
  });

  // 1B: LCR Resonance Angular Frequency w0 = 1/sqrt(LC) (12 MCQs)
  [
    { lMh: 10, cUf: 10, w0: 10000 },
    { lMh: 25, cUf: 4, w0: 10000 },
    { lMh: 40, cUf: 10, w0: 5000 },
    { lMh: 100, cUf: 10, w0: 1000 },
    { lMh: 2, cUf: 50, w0: 10000 },
    { lMh: 50, cUf: 2, w0: 10000 },
    { lMh: 1, cUf: 1, w0: 100000 },
    { lMh: 4, cUf: 1, w0: 50000 },
    { lMh: 10, cUf: 40, w0: 5000 },
    { lMh: 25, cUf: 16, w0: 5000 },
  ].forEach((rs, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি শ্রেণি LCR বর্তনীতে L = ${toBnDigits(rs.lMh)} mH এবং C = ${toBnDigits(rs.cUf)} μF হলে (সেট-${toBnDigits(idx + 1)}) বর্তনীর অনুনাদী কৌণিক কম্পাঙ্ক (ω₀) কত rad/s?`,
        correct: `${toBnDigits(rs.w0)} rad/s`,
        distractors: Array.from(new Set([rs.w0 * 2, rs.w0 / 2, rs.w0 * 10, rs.w0 / 10, rs.w0 + 2500]))
          .filter((x) => x > 0 && x !== rs.w0)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} rad/s`),
        explanation: `ω₀ = 1 / √(LC) = 1 / √(${toBnDigits(rs.lMh)}×১০⁻³ × ${toBnDigits(rs.cUf)}×১০⁻⁶) = ${toBnDigits(rs.w0)} rad/s।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · LCR অনুনাদী কম্পাঙ্ক',
      })
    );
  });

  // =========================================================================
  // 2. Ch 6: Critical Angle, Mirror Focus & Lens Magnification (~60 MCQs)
  // =========================================================================
  // 2A: Critical angle from Refractive Index & vice versa (12 MCQs)
  [
    { nStr: '√২ (১.৪১৪)', deg: 45 },
    { nStr: '২', deg: 30 },
    { nStr: '২/√৩ (১.১৫৫)', deg: 60 },
    { nStr: '১.৩৩ (পানি)', deg: 48.75 },
    { nStr: '১.৫ (কাঁচ)', deg: 41.8 },
    { nStr: '২.৪ (হীরক)', deg: 24.4 },
  ].forEach((cr, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো স্বচ্ছ মাধ্যমের প্রতিসরণাঙ্ক n = ${cr.nStr} হলে বায়ুর সাপেক্ষে ঐ মাধ্যমের সংকট কোণ (Critical Angle) প্রায় কত ডিগ্রি?`,
        correct: `${toBnDigits(cr.deg)}°`,
        distractors: ['২৪.৪°', '৩০°', '৪১.৮°', '৪৫°', '৪৮.৭৫°', '৬০°'].filter((x) => x !== `${toBnDigits(cr.deg)}°`).slice(0, 4),
        explanation: `sin(θ_c) = 1/n => θ_c = sin⁻¹(1/${cr.nStr}) ≈ ${toBnDigits(cr.deg)}°।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · সংকট কোণ',
      })
    );
  });

  // 2B: Mirror Radius of Curvature & Focal Length R = 2f (16 MCQs)
  [10, 15, 20, 25, 30, 40, 50, 60].forEach((fCm, idx) => {
    const rCm = fCm * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি অবতল গোলীয় দর্পণের বক্রতার ব্যাসার্ধ ${toBnDigits(rCm)} cm হলে দর্পণটির ফোকাস দূরত্ব কত cm?`,
        correct: `${toBnDigits(fCm)} cm`,
        distractors: Array.from(new Set([rCm, rCm * 2, fCm / 2, fCm + 5]))
          .filter((x) => x !== fCm)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `গোলীয় দর্পণের ফোকাস দূরত্ব f = R/2 = ${toBnDigits(rCm)}/২ = ${toBnDigits(fCm)} cm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · গোলীয় দর্পণ',
      })
    );
  });

  // 2C: Two Thin Lenses Separated by Distance d: 1/F = 1/f1 + 1/f2 - d/(f1 f2) (16 MCQs)
  [
    { f1: 20, f2: 20, d: 10, F: 13.33 },
    { f1: 30, f2: 60, d: 30, F: 30 },
    { f1: 20, f2: 30, d: 10, F: 15 },
    { f1: 40, f2: 40, d: 20, F: 26.67 },
    { f1: 10, f2: 10, d: 5, F: 6.67 },
    { f1: 25, f2: 50, d: 25, F: 25 },
    { f1: 15, f2: 30, d: 15, F: 15 },
    { f1: 20, f2: 40, d: 20, F: 20 },
  ].forEach((ls, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(ls.f1)} cm ও ${toBnDigits(ls.f2)} cm ফোকাস দূরত্বের দুটি উত্তল লেন্সকে পরস্পর থেকে ${toBnDigits(ls.d)} cm দূরে সমাক্ষীয়ভাবে স্থাপন করলে তুল্য ফোকাস দূরত্ব কত cm?`,
        correct: `${toBnDigits(ls.F)} cm`,
        distractors: Array.from(new Set([ls.F * 2, Number((ls.F / 2).toFixed(2)), ls.f1 + ls.f2, Number((ls.F + 10).toFixed(2))]))
          .filter((x) => x > 0 && x !== ls.F)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `1/F = 1/f₁ + 1/f₂ - d/(f₁f₂) => F ≈ ${toBnDigits(ls.F)} cm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · নির্দিষ্ট দূরত্বে লেন্স সমবায়',
      })
    );
  });

  // =========================================================================
  // 3. Ch 7 & Ch 8: Photon Energy in Joules & Wave Number / Angular Freq (~56 MCQs)
  // =========================================================================
  // 3A: Photon Energy E = h f (in 10^-19 J) (16 MCQs)
  [
    { fMul: 5, eVal: 3.315 },
    { fMul: 6, eVal: 3.978 },
    { fMul: 4, eVal: 2.652 },
    { fMul: 8, eVal: 5.304 },
    { fMul: 10, eVal: 6.63 },
    { fMul: 3, eVal: 1.989 },
    { fMul: 7, eVal: 4.641 },
    { fMul: 9, eVal: 5.967 },
  ].forEach((pf, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(pf.fMul)} × ১০¹⁴ Hz কম্পাঙ্কের একটি ফোটনের শক্তি প্রায় কত জুল? (h = ৬.৬৩ × ১০⁻³⁴ J·s)`,
        correct: `${toBnDigits(pf.eVal)} × ১০⁻¹⁹ J`,
        distractors: ['১.৯৮৯ × ১০⁻¹⁹ J', '২.৬৫২ × ১০⁻¹⁹ J', '৩.৩১৫ × ১০⁻¹⁹ J', '৩.৯৭৮ × ১০⁻¹⁹ J', '৫.৩০৪ × ১০⁻¹⁹ J', '৬.৬৩ × ১০⁻¹⁹ J']
          .filter((x) => x !== `${toBnDigits(pf.eVal)} × ১০⁻¹⁹ J`)
          .slice(0, 4),
        explanation: `E = hf = ৬.৬৩×১০⁻³⁴ × ${toBnDigits(pf.fMul)}×১০¹⁴ = ${toBnDigits(pf.eVal)} × ১০⁻¹⁹ J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · প্ল্যাঙ্কের কোয়ান্টাম সূত্র',
      })
    );
  });

  // 3B: de Broglie Wavelength vs Kinetic Energy Ratio (lambda ~ 1 / sqrt(K)) (12 MCQs)
  [
    { kScale: '৪ গুণ', lamFactor: 'অর্ধেক (১/২ গুণ)' },
    { kScale: '৯ গুণ', lamFactor: 'এক-তৃতীয়াংশ (১/৩ গুণ)' },
    { kScale: '১৬ গুণ', lamFactor: 'এক-চতুর্থাংশ (১/৪ গুণ)' },
    { kScale: '২৫ গুণ', lamFactor: 'এক-পঞ্চমাংশ (১/৫ গুণ)' },
    { kScale: '১/৪ অংশ', lamFactor: 'দ্বিগুণ (২ গুণ)' },
    { kScale: '১/৯ অংশ', lamFactor: 'তিন গুণ (৩ গুণ)' },
  ].forEach((db, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি মুক্ত ইলেকট্রনের গতিশক্তি ${db.kScale} করা হলে এর ডি-ব্রগলি তরঙ্গদৈর্ঘ্য প্রাথমিক মানের কত হবে?`,
        correct: db.lamFactor,
        distractors: [
          'অর্ধেক (১/২ গুণ)',
          'এক-তৃতীয়াংশ (১/৩ গুণ)',
          'এক-চতুর্থাংশ (১/৪ গুণ)',
          'দ্বিগুণ (২ গুণ)',
          'তিন গুণ (৩ গুণ)',
          'চার গুণ (৪ গুণ)',
        ].filter((x) => x !== db.lamFactor).slice(0, 4),
        explanation: `λ = h / √(2mK) ∝ 1/√K; সুতরাং গতিশক্তি ${db.kScale} হলে তরঙ্গদৈর্ঘ্য হবে ${db.lamFactor}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ডি-ব্রগলি তরঙ্গ ও গতিশক্তি',
      })
    );
  });

  // 3C: Wave Path Diff -> Phase / Interference Constructive vs Destructive (16 MCQs)
  [
    { lamNm: 500, n: 2, dxNm: 1000, type: 'গঠনমূলক (উজ্জ্বল)' },
    { lamNm: 600, n: 3, dxNm: 1800, type: 'গঠনমূলক (উজ্জ্বল)' },
    { lamNm: 400, n: 4, dxNm: 1600, type: 'গঠনমূলক (উজ্জ্বল)' },
    { lamNm: 500, n: 1, dxNm: 250, type: 'ধ্বংসাত্মক (অন্ধকার)' },
    { lamNm: 600, n: 2, dxNm: 900, type: 'ধ্বংসাত্মক (অন্ধকার)' },
    { lamNm: 400, n: 3, dxNm: 1000, type: 'ধ্বংসাত্মক (অন্ধকার)' },
    { lamNm: 700, n: 2, dxNm: 1400, type: 'গঠনমূলক (উজ্জ্বল)' },
    { lamNm: 800, n: 1, dxNm: 400, type: 'ধ্বংসাত্মক (অন্ধকার)' },
  ].forEach((inT, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(inT.lamNm)} nm তরঙ্গদৈর্ঘ্যের দুটি সুসংগত তরঙ্গ কোনো বিন্দুতে মিলিত হওয়ার সময় পথ পার্থক্য ${toBnDigits(inT.dxNm)} nm হলে ঐ বিন্দুতে কীরূপ ব্যতিচার সৃষ্টি হবে?`,
        correct: inT.type,
        distractors: [
          'গঠনমূলক (উজ্জ্বল)',
          'ধ্বংসাত্মক (অন্ধকার)',
          'কোনো ব্যতিচার নয়',
          'সম্পূর্ণ সমবর্তন',
        ].filter((x) => x !== inT.type),
        explanation: `পথ পার্থক্য Δx = ${toBnDigits(inT.dxNm)} nm যা λ = ${toBnDigits(inT.lamNm)} nm-এর সাপেক্ষে ${inT.type} শর্ত পূরণ করে।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · গঠনমূলক ও ধ্বংসাত্মক ব্যতিচার',
      })
    );
  });

  // =========================================================================
  // 4. Ch 9, Ch 10 & Ch 11: Octal/Decimal, Stellar Parallax, Fission Energy, Ionization (~80 MCQs)
  // =========================================================================
  // 4A: Octal to Decimal Conversions (16 MCQs)
  ['17', '25', '34', '46', '57', '64', '77', '105', '124', '150', '210', '377'].forEach((oc, idx) => {
    const dec = parseInt(oc, 8);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `অক্টাল সংখ্যা (${toBnDigits(oc)})₈-এর সমতুল্য দশমিক (Decimal) মান কত?`,
        correct: `(${toBnDigits(dec)})₁₀`,
        distractors: Array.from(new Set([dec + 4, dec - 4, dec + 8, Number(oc)]))
          .filter((x) => x > 0 && x !== dec)
          .slice(0, 4)
          .map((x) => `(${toBnDigits(x)})₁₀`),
        explanation: `(${toBnDigits(oc)})₈-কে ৮-এর ঘাত দিয়ে গুণ করে যোগ করলে পাওয়া যায় (${toBnDigits(dec)})₁₀।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · অক্টাল থেকে দশমিক',
      })
    );
  });

  // 4B: Stellar Parallax d(pc) = 1 / p(arcsec) (12 MCQs)
  [
    { p: 0.5, dPc: 2 },
    { p: 0.25, dPc: 4 },
    { p: 0.2, dPc: 5 },
    { p: 0.1, dPc: 10 },
    { p: 0.05, dPc: 20 },
    { p: 0.04, dPc: 25 },
    { p: 0.02, dPc: 50 },
    { p: 0.01, dPc: 100 },
    { p: 0.4, dPc: 2.5 },
    { p: 0.8, dPc: 1.25 },
  ].forEach((px, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `পৃথিবী থেকে কোনো নক্ষত্রের বার্ষিক লম্বন (Parallax) কোণ ${toBnDigits(px.p)} আর্ক-সেকেন্ড (") হলে নক্ষত্রটির দূরত্ব কত পারসেক?`,
        correct: `${toBnDigits(px.dPc)} পারসেক`,
        distractors: Array.from(new Set([px.dPc * 2, px.dPc / 2, px.dPc + 5, Number((px.dPc * 3.26).toFixed(2))]))
          .filter((x) => x > 0 && x !== px.dPc)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} পারসেক`),
        explanation: `দূরত্ব d (পারসেক) = ১ / p(") = ১ / ${toBnDigits(px.p)} = ${toBnDigits(px.dPc)} পারসেক।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · নক্ষত্রের লম্বন দূরত্ব',
      })
    );
  });

  // 4C: Half-life Number of Half-lives from Remaining Fraction (12 MCQs)
  [
    { rem: '৫০% (১/২)', n: 1 },
    { rem: '২৫% (১/৪)', n: 2 },
    { rem: '১২.৫% (১/৮)', n: 3 },
    { rem: '৬.২৫% (১/১৬)', n: 4 },
    { rem: '৩.১২৫% (১/৩২)', n: 5 },
    { rem: '১/৬৪ অংশ', n: 6 },
    { rem: '১/১২৮ অংশ', n: 7 },
    { rem: '১/২৫৬ অংশ', n: 8 },
  ].forEach((hl, idx) => {
    const T = 10;
    const totalT = hl.n * T;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `১০ বছর অর্ধায়ুর একটি তেজস্ক্রিয় নমুনা ক্ষয় হয়ে প্রাথমিক পরিমাণের ${hl.rem} অবশিষ্ট থাকতে কত বছর সময় লাগবে?`,
        correct: `${toBnDigits(totalT)} বছর`,
        distractors: Array.from(new Set([totalT + 10, totalT - 10, totalT * 2, totalT + 25, totalT + 5, totalT + 30]))
          .filter((x) => x > 0 && x !== totalT)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} বছর`),
        explanation: `(১/২)^n = ${hl.rem} => n = ${toBnDigits(hl.n)}টি অর্ধায়ু; মোট সময় t = ${toBnDigits(hl.n)} × ১০ = ${toBnDigits(totalT)} বছর।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · ক্ষয়ের সময় নির্ণয়',
      })
    );
  });

  // 4D: Scientist & Discovery Cards for Physics 2nd Paper (40 MCQs)
  const scientists2: { sci: string; work: string; ch: string }[] = [
    { sci: 'স্যার জে. জে. থমসন (১৮৯৭)', work: 'ইলেকট্রন আবিষ্কার ও e/m অনুপাত নির্ণয়', ch: 'phys2_ch9_atomic_nuclear' },
    { sci: 'জেমস চ্যাডউইক (১৯৩২)', work: 'নিউট্রন কণা আবিষ্কার', ch: 'phys2_ch9_atomic_nuclear' },
    { sci: 'অটো হান ও স্ট্রাসম্যান (১৯৩৮)', work: 'ইউরেনিয়ামের নিউক্লীয় ফিশন আবিষ্কার', ch: 'phys2_ch9_atomic_nuclear' },
    { sci: 'মাদাম কুরি ও পিয়েরে কুরি (১৮৯৮)', work: 'পলোনিয়াম ও রেডিয়াম মৌল আবিষ্কার', ch: 'phys2_ch9_atomic_nuclear' },
    { sci: 'বার্ডিন, ব্র্যাটেইন ও শকলি (১৯৪৭)', work: 'ট্রানজিস্টর উদ্ভাবন', ch: 'phys2_ch10_semiconductor' },
    { sci: 'ক্রিস্টিয়ান হাইগেনস (১৬৭৮)', work: 'আলোর তরঙ্গ তত্ত্ব ও গৌণ তরঙ্গিকা নীতি', ch: 'phys2_ch7_physical_optics' },
    { sci: 'থমাস ইয়ং (১৮০১)', work: 'আলোর দ্বি-চির ব্যতিচার পরীক্ষা', ch: 'phys2_ch7_physical_optics' },
    { sci: 'জোসেফ ফন ফ্রনহফার', work: 'সৌর বর্ণালিতে কালো শোষণ রেখা ও এক-চির অপবর্তন', ch: 'phys2_ch7_physical_optics' },
    { sci: 'মাইকেল ফ্যারাডে (১৮৩১)', work: 'তাড়িতচৌম্বক আবেশ ও তড়িৎ-বিশ্লেষণ সূত্র', ch: 'phys2_ch5_em_induction' },
    { sci: 'হ্যান্স ক্রিশ্চিয়ান ওয়েরস্টেড (১৮২০)', work: 'তড়িৎ প্রবাহের চৌম্বক ক্রিয়া আবিষ্কার', ch: 'phys2_ch4_magnetism' },
    { sci: 'জর্জ সাইমন ওহম (১৮২৭)', work: 'পরিবাহীর বিভব ও প্রবাহের সমানুপাতিক সূত্র', ch: 'phys2_ch3_current_elec' },
    { sci: 'লর্ড কেলভিন (১৮৪৮)', work: 'পরম তাপমাত্রার স্কেল ও তাপগতিবিদ্যার ২য় সূত্রের বিবৃতি', ch: 'phys2_thermo' },
  ];
  const allSci2 = scientists2.map((s) => s.sci);
  const allWork2 = scientists2.map((s) => s.work);
  scientists2.forEach((s, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: s.ch,
        visualLessonId: s.ch === 'phys2_thermo' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `"${s.work}" — এর সাথে জড়িত বিজ্ঞানী কে?`,
        correct: s.sci,
        distractors: allSci2.filter((x) => x !== s.sci).slice(0, 4),
        explanation: `${s.sci} এর কৃতিত্ব হলো ${s.work}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · বিজ্ঞানীদের অবদান',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: s.ch,
        visualLessonId: s.ch === 'phys2_thermo' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `বিজ্ঞানী ${s.sci} নিচের কোন আবিষ্কার বা তত্ত্বের জন্য প্রসিদ্ধ?`,
        correct: s.work,
        distractors: allWork2.filter((x) => x !== s.work).slice(0, 4),
        explanation: `${s.sci}: ${s.work}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · ঐতিহাসিক আবিষ্কার',
      })
    );
  });

  return list;
}
