import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredB(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sb_${String(seq++).padStart(4, '0')}`;

  // 1. Gravity g variation with height h & depth d, Escape velocity, Kepler (~40 MCQs)
  const gHeightDepth = [
    { q: 'ভূপৃষ্ঠ থেকে পৃথিবীর ব্যাসার্ধের সমান উচ্চতায় (h = R) অভিকর্ষজ ত্বরণের মান ভূপৃষ্ঠের মানের কত অংশ?', a: '১/৪ অংশ (২৫%)', d: ['১/২ অংশ (৫০%)', '১/৯ অংশ', '৩/৪ অংশ'], exp: 'g_h = g / (1 + h/R)² = g / (1+1)² = g/4।' },
    { q: 'ভূপৃষ্ঠ থেকে পৃথিবীর ব্যাসার্ধের দ্বিগুণ উচ্চতায় (h = 2R) অভিকর্ষজ ত্বরণ ভূপৃষ্ঠের মানের কত অংশ?', a: '১/৯ অংশ', d: ['১/৪ অংশ', '১/৩ অংশ', '১/১৬ অংশ'], exp: 'g_h = g / (1 + 2)² = g/9।' },
    { q: 'ভূপৃষ্ঠ থেকে কত গভীরতায় অভিকর্ষজ ত্বরণের মান ভূপৃষ্ঠের মানের অর্ধেক হবে (পৃথিবীর ব্যাসার্ধ R)?', a: 'R / ২ (ব্যাসার্ধের অর্ধেক)', d: ['R / ৪', 'R / √২', '২R'], exp: 'g_d = g(1 − d/R) = g/2 ⇒ d = R/2।' },
    { q: 'ভূপৃষ্ঠ থেকে কত উচ্চতায় অভিকর্ষজ ত্বরণের মান ভূপৃষ্ঠের মানের এক-চতুর্থাংশ হবে?', a: 'R (পৃথিবীর ব্যাসার্ধের সমান ≈ ৬৪০০ km)', d: ['২R', 'R/২', '৩R'], exp: 'g_h = g(R/(R+h))² = g/4 ⇒ R+h = 2R ⇒ h = R।' },
    { q: 'পৃথিবীর ভর অপরিবর্তিত থেকে ব্যাসার্ধ হঠাৎ অর্ধেক (R/2) হলে ভূপৃষ্ঠে অভিকর্ষজ ত্বরণ কত গুণ হবে?', a: '৪ গুণ', d: ['২ গুণ', '১/৪ গুণ', '৮ গুণ'], exp: 'g = GM/R²; R অর্ধেক হলে g হবে ৪ গুণ।' },
    { q: 'কোনো গ্রহের ভর ও ব্যাসার্ধ উভয়ই পৃথিবীর দ্বিগুণ হলে ঐ গ্রহে মুক্তিবেগ পৃথিবীর মুক্তিবেগের কত গুণ?', a: '১ গুণ (সমান অর্থাৎ ১১.২ km/s)', d: ['২ গুণ', '√২ গুণ', '৪ গুণ'], exp: 'v_e = √(2GM/R); M ও R উভয়ই ২ গুণ হলে অনুপাত ২/২ = ১ থাকে।' },
    { q: 'কোনো গ্রহের ভর পৃথিবীর ভরের ৪ গুণ এবং ব্যাসার্ধ পৃথিবীর ব্যাসার্ধের সমান হলে এর মুক্তিবেগ কত গুণ?', a: '২ গুণ (২২.৪ km/s)', d: ['৪ গুণ', '√২ গুণ', 'অর্ধেক'], exp: 'v_e ∝ √M (স্থির R); তাই √৪ = ২ গুণ।' },
    { q: 'পৃথিবী থেকে কোনো বস্তুকে ভূপৃষ্ঠের ব্যাসার্ধের সমান উচ্চতায় তুললে অভিকর্ষজ বিভব শক্তির পরিবর্তন কত?', a: '½ mgR (অর্ধেক mgR)', d: ['mgR', '২ mgR', 'mgR / ৪'], exp: 'ΔU = mgh / (1 + h/R) = mgR / (1 + 1) = ½ mgR।' },
  ];
  gHeightDepth.forEach((gd) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_7_grav_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: gd.q,
        correct: gd.a,
        distractors: gd.d,
        explanation: gd.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · মহাকর্ষ ও অভিকর্ষ',
      })
    );
  });

  // Kepler T^2 = R^3 ratios
  [
    { rMult: 4, tMult: 8 },
    { rMult: 9, tMult: 27 },
    { rMult: 16, tMult: 64 },
    { rMult: 0.25, tMult: 0.125 },
  ].forEach((kp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_7_grav_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `সূর্য থেকে কোনো গ্রহের গড় দূরত্ব বর্তমান দূরত্বের ${toBnDigits(kp.rMult)} গুণ হলে ঐ গ্রহের পর্যায়কাল (১ বছর) বর্তমানের কত গুণ হবে?`,
        correct: `${toBnDigits(kp.tMult)} গুণ`,
        distractors: [0.125, 0.25, 2, 4, 8, 16, 27, 64]
          .filter((x) => x !== kp.tMult)
          .map((x) => `${toBnDigits(x)} গুণ`),
        explanation: `কেপলারের ৩য় সূত্র T² ∝ R³ ⇒ T ∝ R^(3/2); (${toBnDigits(kp.rMult)})^(3/2) = ${toBnDigits(kp.tMult)} গুণ।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · কেপলারের ৩য় সূত্র',
      })
    );
  });

  // 2. Elasticity & Fluid Mechanics Quantitative Problems (~44 MCQs)
  // Wire stretching R/L change: Δl = FL/(AY)
  [
    { cond: 'একই উপাদানের দুটি তারের দৈর্ঘ্য সমান কিন্তু ২য় তারের ব্যাসার্ধ ১ম তারের দ্বিগুণ; সমান বলে ২য় তারের প্রসারণ ১ম তারের কত গুণ?', ans: '১/৪ অংশ', d: ['১/২ অংশ', '২ গুণ', '৪ গুণ'], exp: 'Δl ∝ 1/r²; ব্যাসার্ধ দ্বিগুণ হলে ক্ষেত্রফল ৪ গুণ হয়, তাই প্রসারণ ১/৪ অংশ।' },
    { cond: 'একই উপাদান ও প্রস্থচ্ছেদের তারের দৈর্ঘ্য কেটে অর্ধেক করলে এর ইয়ং-এর গুণাঙ্ক (Y) কত গুণ হবে?', ans: 'অপরিবর্তিত থাকবে (১ গুণ)', d: ['অর্ধেক হবে', 'দ্বিগুণ হবে', '৪ গুণ হবে'], exp: 'ইয়ং-এর গুণাঙ্ক কেবল তারের উপাদান ও তাপমাত্রার ওপর নির্ভর করে, দৈর্ঘ্য বা প্রস্থচ্ছেদের ওপর নয়।' },
    { cond: 'কোনো তারের ইয়ং-এর গুণাঙ্ক ২ × ১০¹¹ N/m²; তারটির দৈর্ঘ্য দ্বিগুণ করতে কী পরিমাণ পীড়নের প্রয়োজন হবে (তাত্ত্বিকভাবে)?', ans: '২ × ১০¹¹ N/m²', d: ['১ × ১০¹¹ N/m²', '৪ × ১০¹¹ N/m²', '০.৫ × ১০¹¹ N/m²'], exp: 'দৈর্ঘ্য দ্বিগুণ হলে দৈর্ঘ্য বিকৃতি l/L = L/L = ১; অতএব পীড়ন = Y × বিকৃতি = Y।' },
    { cond: 'একটি আদর্শ দৃঢ় বস্তুর (Perfectly rigid body) ইয়ং-এর গুণাঙ্ক কত?', ans: 'অসীম (∞)', d: ['শূন্য (০)', '১', '৯.৮ × ১০¹⁰ N/m²'], exp: 'আদর্শ দৃঢ় বস্তুতে কোনো বিকৃতি ঘটে না (বিকৃতি = ০), তাই Y = পীড়ন/০ = অসীম।' },
    { cond: 'একটি ইস্পাতের তারের ব্যাসার্ধ ১ mm এবং দৈর্ঘ্য ২ m; এর বিকৃতি ০.০০১ হলে দৈর্ঘ্য বৃদ্ধি কত?', ans: '২ mm', d: ['১ mm', '০.৫ mm', '৪ mm'], exp: 'বিকৃতি = ΔL / L ⇒ ΔL = ০.০০১ × ২ m = ০.০০২ m = ২ mm।' },
    { cond: 'বৃষ্টির একটি বড় ফোঁটা ভেঙে সম-আয়তনের ৬৪টি ক্ষুদ্র ফোঁটায় পরিণত হলে মোট পৃষ্ঠতলের ক্ষেত্রফল ও পৃষ্ঠশক্তি কত গুণ হবে?', ans: '৪ গুণ', d: ['৮ গুণ', '১৬ গুণ', '৬৪ গুণ'], exp: 'n = ৬৪ = ৪³; প্রতিটি ক্ষুদ্র ফোঁটার ব্যাসার্ধ r = R/4 এবং মোট পৃষ্ঠ ক্ষেত্রফল n^(1/3) = ৪ গুণ বাড়ে।' },
    { cond: 'আটটি সমান ক্ষুদ্র পানির ফোঁটা একত্রিত হয়ে একটি বড় ফোঁটা তৈরি করলে প্রান্তবেগ পূর্বের ফোঁটার প্রান্তবেগের কত গুণ হবে?', ans: '৪ গুণ', d: ['২ গুণ', '৮ গুণ', '১৬ গুণ'], exp: '৮টি মিলিত হলে বড় ব্যাসার্ধ R = 8^(1/3) r = 2r; এবং v_t ∝ r² হওয়ায় বেগ ২² = ৪ গুণ হয়।' },
    { cond: 'একটি কৈশিক নলে পানি ১০ cm ওঠে; নলটির ব্যাসার্ধ অর্ধেক করলে পানি কত উচ্চতায় উঠবে?', ans: '২০ cm', d: ['৫ cm', '১০ cm', '৪০ cm'], exp: 'h ∝ 1/r; ব্যাসার্ধ অর্ধেক হলে কৈশিক উচ্চতা দ্বিগুণ (২০ cm) হয়।' },
  ].forEach((el) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_7_grav_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: el.cond,
        correct: el.ans,
        distractors: el.d,
        explanation: el.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পদার্থের গাঠনিক ধর্ম',
      })
    );
  });

  // Capillary rise / Stokes terminal velocity ratios
  [
    { rFactor: 2, vFactor: 4 },
    { rFactor: 3, vFactor: 9 },
    { rFactor: 4, vFactor: 16 },
  ].forEach((st) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_7_grav_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `স্টোকসের সূত্র অনুযায়ী একই সান্দ্র তরলের মধ্য দিয়ে পড়ন্ত গোলকের ব্যাসার্ধ ${toBnDigits(st.rFactor)} গুণ হলে প্রান্তবেগ কত গুণ হবে?`,
        correct: `${toBnDigits(st.vFactor)} গুণ`,
        distractors: [2, 3, 4, 8, 9, 16, 27]
          .filter((x) => x !== st.vFactor)
          .map((x) => `${toBnDigits(x)} গুণ`),
        explanation: `প্রান্তবেগ v_t ∝ r²; তাই ব্যাসার্ধ ${toBnDigits(st.rFactor)} গুণ হলে প্রান্তবেগ ${toBnDigits(st.vFactor)} গুণ হয়।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · স্টোকসের সূত্র',
      })
    );
  });

  // 3. Simple Pendulum & Spring Oscillator Ratios (~36 MCQs)
  [
    { lMult: 4, tMult: '২ গুণ' },
    { lMult: 9, tMult: '৩ গুণ' },
    { lMult: 16, tMult: '৪ গুণ' },
    { lMult: 0.25, tMult: 'অর্ধেক (০.৫ গুণ)' },
  ].forEach((pl) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি সরল দোলকের কার্যকর দৈর্ঘ্য ${toBnDigits(pl.lMult)} গুণ করা হলে এর দোলনকাল কত গুণ হবে?`,
        correct: pl.tMult,
        distractors: ['অর্ধেক (০.৫ গুণ)', '২ গুণ', '৩ গুণ', '৪ গুণ', '৯ গুণ', '১৬ গুণ'].filter((x) => x !== pl.tMult),
        explanation: `T = 2π√(L/g) অর্থাৎ T ∝ √L; দৈর্ঘ্য ${toBnDigits(pl.lMult)} গুণ করলে দোলনকাল ${pl.tMult} হবে।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · সরল দোলক',
      })
    );
  });

  // Spring oscillator T = 2π√(m/k)
  [
    { k: 100, m: 1, tStr: '০.২π s' },
    { k: 100, m: 4, tStr: '০.৪π s' },
    { k: 400, m: 1, tStr: '০.১π s' },
    { k: 25, m: 1, tStr: '০.৪π s (২৫)' },
    { k: 16, m: 4, tStr: 'π s' },
  ].forEach((so) => {
    const cleanAns = so.tStr.replace(' (২৫)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(so.k)} N/m বল ধ্রুবকের একটি স্প্রিংয়ের সাথে ${toBnDigits(so.m)} kg ভর ঝুলিয়ে দোলালে দোলনকাল T কত হবে?`,
        correct: cleanAns,
        distractors: ['০.১π s', '০.২π s', '০.৪π s', '০.৫π s', 'π s', '২π s'].filter((x) => x !== cleanAns),
        explanation: `T = 2π√(m/k) = 2π√(${toBnDigits(so.m)}/${toBnDigits(so.k)}) = ${cleanAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · স্প্রিং দোলক',
      })
    );
  });

  // 4. SHM Wave Equation Parameter Extraction (~36 MCQs)
  const shmEqs = [
    { eq: 'x = ১০ sin(২πt + π/3) m', amp: '১০ m', omega: '২π rad/s', f: '১ Hz', vmax: '২০π m/s' },
    { eq: 'x = ০.৫ sin(১০t + π/6) m', amp: '০.৫ m', omega: '১০ rad/s', f: '৫/π Hz', vmax: '৫ m/s' },
    { eq: 'x = ৪ sin(৬πt) cm', amp: '৪ cm', omega: '৬π rad/s', f: '৩ Hz', vmax: '২৪π cm/s' },
    { eq: 'x = ২০ sin(৪πt + π/4) cm', amp: '২০ cm', omega: '৪π rad/s', f: '২ Hz', vmax: '৮০π cm/s' },
  ];
  shmEqs.forEach((se, i) => {
    const others = shmEqs.filter((x) => x.eq !== se.eq);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `সরল ছন্দিত স্পন্দনরত একটি কণার সরণ সমীকরণ ${se.eq} হলে কণাটির বিস্তার ও কৌণিক কম্পাঙ্ক যথাক্রমে কত?`,
        correct: `${se.amp} এবং ${se.omega}`,
        distractors: others.map((x) => `${x.amp} এবং ${x.omega}`),
        explanation: `x = A sin(ωt + δ) তুলনা করে বিস্তার A = ${se.amp} এবং কৌণিক কম্পাঙ্ক ω = ${se.omega}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM সমীকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `যদি কোনো কণার গতির সমীকরণ ${se.eq} হয়, তবে কণাটির কম্পাঙ্ক (f) ও সর্বোচ্চ বেগ (v_max = ωA) কত?`,
        correct: `${se.f} ও ${se.vmax}`,
        distractors: others.map((x) => `${x.f} ও ${x.vmax}`),
        explanation: `f = ω/(2π) = ${se.f} এবং v_max = ωA = ${se.vmax}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · কম্পাঙ্ক ও সর্বোচ্চ বেগ',
      })
    );
  });

  // 5. Wave Speed v=fλ, Beats, Decibel Scale, Organ Pipes (~48 MCQs)
  [
    { v: 340, f: 170, lam: 2 },
    { v: 330, f: 660, lam: 0.5 },
    { v: 350, f: 700, lam: 0.5 },
    { v: 360, f: 120, lam: 3 },
    { v: 320, f: 80, lam: 4 },
    { v: 300, f: 150, lam: 2 },
  ].forEach((wv, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `শব্দের বেগ ${toBnDigits(wv.v)} m/s হলে ${toBnDigits(wv.f)} Hz কম্পাঙ্কের শব্দের তরঙ্গদৈর্ঘ্য (উৎস-#${toBnDigits(idx + 1)}) কত মিটার?`,
        correct: `${toBnDigits(wv.lam)} m`,
        distractors: [0.25, 0.5, 1, 1.5, 2, 3, 4, 5]
          .filter((x) => x !== wv.lam)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `v = fλ ⇒ λ = ${toBnDigits(wv.v)} / ${toBnDigits(wv.f)} = ${toBnDigits(wv.lam)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তরঙ্গ বেগ',
      })
    );
  });

  // Decibel Intensity Level Increase Δβ = 10 log10(I2/I1)
  [
    { mult: 10, db: 10 },
    { mult: 100, db: 20 },
    { mult: 1000, db: 30 },
    { mult: 10000, db: 40 },
    { mult: 100000, db: 50 },
  ].forEach((db) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `কোনো শব্দের তীব্রতা স্বাভাবিকের চেয়ে ${toBnDigits(db.mult)} গুণ বৃদ্ধি পেলে শব্দের তীব্রতা লেভেল কত ডেসিবেল (dB) বৃদ্ধি পাবে?`,
        correct: `${toBnDigits(db.db)} dB`,
        distractors: [10, 20, 30, 40, 50, 60, 100]
          .filter((x) => x !== db.db)
          .map((x) => `${toBnDigits(x)} dB`),
        explanation: `Δβ = ১০ log₁₀(${toBnDigits(db.mult)}) = ${toBnDigits(db.db)} dB।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শব্দের তীব্রতা লেভেল',
      })
    );
  });

  // Beats Problems with waxing/filing tuning fork
  [
    { fA: 256, beat: 4, waxEffect: 'মোম লাগালে বীট কমে ২ হয়', ans: 260, exp: 'মোম লাগালে A-এর কম্পাঙ্ক কমে। এতে বীট কমলে A > B অর্থাৎ f_A − f_B = ৪; অথবা B-তে মোম লাগালে...' },
    { q: 'একটি অজানা সুরশলাকা ও ২৫৬ Hz কম্পাঙ্কের শলাকা একসাথে বাজালে প্রতি সেকেন্ডে ৪টি বীট উৎপন্ন হয়। অজানা শলাকায় মোম লাগালে বীট সংখ্যা কমে ২ হয়। অজানা শলাকার কম্পাঙ্ক কত?', a: '২৬০ Hz', d: ['২৫২ Hz', '২৫৪ Hz', '২৫৮ Hz'], exp: 'সম্ভাব্য কম্পাঙ্ক ২৫৬±৪ = ২৬০ বা ২৫২ Hz। মোম লাগালে ভর বাড়ায় কম্পাঙ্ক কমে; যেহেতু বীট ৪ থেকে কমে ২ হয়েছে, তাই ২৬০ কমে ২৫৮ হয়ে ২৫৬-এর কাছাকাছি এসেছে।' },
    { q: 'দুটি শলাকা একত্রে বাজালে প্রতি সেকেন্ডে ৫টি বীট শোনা যায়। একটির কম্পাঙ্ক ৩০০ Hz এবং অপরটিতে মোম লাগালে বীট বেড়ে ৭ হয়। দ্বিতীয়টির মূল কম্পাঙ্ক কত?', a: '২৯৫ Hz', d: ['৩০৫ Hz', '২৯৩ Hz', '৩০৭ Hz'], exp: 'সম্ভাব্য মান ৩০৫ বা ২৯৫ Hz। মোম লাগালে কম্পাঙ্ক কমে; বীট ৫ থেকে বেড়ে ৭ হয়েছে অর্থাৎ ২৯৫ কমে ২৯৩ হয়ে ৩০০ থেকে দূরে সরেছে।' },
    { q: 'দুটি শব্দ তরঙ্গের কম্পাঙ্ক যথাক্রমে ৪২০ Hz ও ৪১২ Hz হলে প্রতি ২ সেকেন্ডে মোট কতটি বীট শোনা যাবে?', a: '১৬টি বীট', d: ['৮টি বীট', '৪টি বীট', '১০টি বীট'], exp: 'প্রতি সেকেন্ডে বীট = |৪২০−৪১২| = ৮টি; অতএব ২ সেকেন্ডে = ৮×২ = ১৬টি বীট।' },
  ].forEach((bt) => {
    if ('q' in bt && bt.q) {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch8_9_shm_waves',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: 'medical',
          question: bt.q,
          correct: bt.a,
          distractors: bt.d,
          explanation: bt.exp,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · বীট গণনা',
        })
      );
    }
  });

  // Organ Pipe Fundamental Frequency (v = 340 m/s)
  [
    { type: 'এক মুখ বন্ধ নলের', l: 0.5, f1: 170, formula: 'f₁ = v / 4L' },
    { type: 'দুই মুখ খোলা নলের', l: 0.5, f1: 340, formula: 'f₁ = v / 2L' },
    { type: 'এক মুখ বন্ধ নলের', l: 0.25, f1: 340, formula: 'f₁ = v / 4L' },
    { type: 'দুই মুখ খোলা নলের', l: 1.0, f1: 170, formula: 'f₁ = v / 2L' },
  ].forEach((op, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `বায়ুতে শব্দের বেগ ৩৪০ m/s হলে ${toBnDigits(op.l)} m দৈর্ঘ্যের একটি ${op.type} (নল-#${toBnDigits(idx + 1)}) মূলসুরের কম্পাঙ্ক কত?`,
        correct: `${toBnDigits(op.f1)} Hz`,
        distractors: [85, 170, 340, 510, 680]
          .filter((x) => x !== op.f1)
          .map((x) => `${toBnDigits(x)} Hz`),
        explanation: `${op.formula} অনুসারে মূলসুরের কম্পাঙ্ক = ${toBnDigits(op.f1)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · অর্গান নল',
      })
    );
  });

  // 6. Ideal Gas C_rms, Kinetic Energy, Degrees of Freedom & Relative Humidity (~36 MCQs)
  [
    { f: 3, cv: '(3/2)R', cp: '(5/2)R', gamma: '১.৬৭', gas: 'এক-পরমাণুক গ্যাস (He, Ne, Ar)' },
    { f: 5, cv: '(5/2)R', cp: '(7/2)R', gamma: '১.৪০', gas: 'দ্বি-পরমাণুক গ্যাস (H₂, O₂, N₂)' },
    { f: 6, cv: '3R', cp: '4R', gamma: '১.৩৩', gas: 'অরৈখিক বহু-পরমাণুক গ্যাস (CH₄, NH₃)' },
  ].forEach((df, i) => {
    const others = [
      { f: 3, cv: '(3/2)R', cp: '(5/2)R', gamma: '১.৬৭', gas: 'এক-পরমাণুক গ্যাস (He, Ne, Ar)' },
      { f: 5, cv: '(5/2)R', cp: '(7/2)R', gamma: '১.৪০', gas: 'দ্বি-পরমাণুক গ্যাস (H₂, O₂, N₂)' },
      { f: 6, cv: '3R', cp: '4R', gamma: '১.৩৩', gas: 'অরৈখিক বহু-পরমাণুক গ্যাস (CH₄, NH₃)' },
    ].filter((x) => x.f !== df.f);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${df.gas}"-এর স্বাধীনতার মাত্রা f = ${toBnDigits(df.f)} হলে স্থির আয়তনে মোলার আপেক্ষিক তাপ C_v ও C_p যথাক্রমে কত?`,
        correct: `${df.cv} ও ${df.cp}`,
        distractors: [...others.map((x) => `${x.cv} ও ${x.cp}`), '(1/2)R ও (3/2)R', '2R ও 3R'],
        explanation: `C_v = (f/2)R = ${df.cv} এবং C_p = C_v + R = ${df.cp}; যেখানে γ = ${df.gamma}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · আপেক্ষিক তাপ ও স্বাধীনতার মাত্রা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: i === 0 ? 'dental' : 'board',
        question: `"${df.gas}"-এর ক্ষেত্রে দুটি মোলার আপেক্ষিক তাপের অনুপাত (γ = C_p / C_v) কত?`,
        correct: df.gamma,
        distractors: [...others.map((x) => x.gamma), '১.২০', '১.৫০'],
        explanation: `γ = ১ + 2/f = ১ + ২/${toBnDigits(df.f)} = ${df.gamma}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গামার মান',
      })
    );
  });

  // Relative Humidity R = (f/F)*100%
  [
    { f: 12, F: 20, r: 60 },
    { f: 15, F: 25, r: 60 },
    { f: 14, F: 20, r: 70 },
    { f: 18, F: 24, r: 75 },
    { f: 16, F: 20, r: 80 },
    { f: 9, F: 18, r: 50 },
  ].forEach((rh, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'board',
        question: `কোনো দিনের শিশিরাঙ্কে সম্পৃক্ত জলীয় বাষ্পচাপ ${toBnDigits(rh.f)} mmHg এবং বায়ুর তাপমাত্রায় সম্পৃক্ত বাষ্পচাপ ${toBnDigits(rh.F)} mmHg হলে (পর্যবেক্ষণ-#${toBnDigits(idx + 1)}) আপেক্ষিক আর্দ্রতা কত?`,
        correct: `${toBnDigits(rh.r)}%`,
        distractors: [40, 45, 50, 60, 65, 70, 75, 80, 85]
          .filter((x) => x !== rh.r)
          .map((x) => `${toBnDigits(x)}%`),
        explanation: `R = (f / F) × ১০০% = (${toBnDigits(rh.f)} / ${toBnDigits(rh.F)}) × ১০০% = ${toBnDigits(rh.r)}%।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · আপেক্ষিক আর্দ্রতা',
      })
    );
  });

  // Phase difference vs Path difference
  [
    { path: 'λ / ২', phase: 'π রেডিয়ান (১৮০°)' },
    { path: 'λ / ৪', phase: 'π/2 রেডিয়ান (৯০°)' },
    { path: 'λ / ৬', phase: 'π/3 রেডিয়ান (৬০°)' },
    { path: 'λ', phase: '2π রেডিয়ান (৩৬০°)' },
  ].forEach((pp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_9_shm_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `অগ্রগামী তরঙ্গের দুটি বিন্দুর মধ্যে পথ পার্থক্য "${pp.path}" হলে এদের দশা পার্থক্য (Δφ) কত হবে?`,
        correct: pp.phase,
        distractors: [
          'π রেডিয়ান (১৮০°)',
          'π/2 রেডিয়ান (৯০°)',
          'π/3 রেডিয়ান (৬০°)',
          '2π রেডিয়ান (৩৬০°)',
          'π/4 রেডিয়ান (৪৫°)',
        ].filter((x) => x !== pp.phase),
        explanation: `Δφ = (2π/λ) × (${pp.path}) = ${pp.phase}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · দশা ও পথ পার্থক্য',
      })
    );
  });

  return list;
}
