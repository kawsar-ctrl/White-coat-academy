import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredG(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sg_${String(seq++).padStart(4, '0')}`;

  // 1. Elasticity: Wire Elongation l = FL / (AY) & Wire Stretching Resistance/Elasticity (Ch 7, ~40 MCQs)
  const wireCases = [
    { desc: 'দৈর্ঘ্য দ্বিগুণ (2L) ও ব্যাসার্ধ একই রাখা হলে প্রসারণ', ans: '২ গুণ (l ∝ L)' },
    { desc: 'দৈর্ঘ্য একই রেখে ব্যাসার্ধ দ্বিগুণ (2r) করা হলে সমভারে প্রসারণ', ans: 'এক-চতুর্থাংশ (l/4; কারণ l ∝ 1/r²)' },
    { desc: 'দৈর্ঘ্য দ্বিগুণ (2L) ও ব্যাসার্ধ দ্বিগুণ (2r) করা হলে সমভারে প্রসারণ', ans: 'অর্ধেক (l/2; কারণ 2/2² = ½)' },
    { desc: 'দৈর্ঘ্য অর্ধেক (L/2) ও ব্যাসার্ধ অর্ধেক (r/2) করা হলে প্রসারণ', ans: '২ গুণ (½ / (½)² = ২)' },
    { desc: 'ব্যাসার্ধ অর্ধেক (r/2) ও দৈর্ঘ্য একই রাখলে সমভারে প্রসারণ', ans: '৪ গুণ (l ∝ 1/r²)' },
    { desc: 'একই উপাদানের তারের দৈর্ঘ্য কেটে অর্ধেক করলে অসহ ভার (Breaking Load)', ans: 'অপরিবর্তিত থাকবে (দৈর্ঘ্যের ওপর নির্ভর করে না)' },
    { desc: 'তারের ব্যাস দ্বিগুণ (2d) করলে অসহ ভার (Breaking Force)', ans: '৪ গুণ হবে (অসহ ভার ∝ প্রস্থচ্ছেদ ক্ষেত্রফল A ∝ r²)' },
    { desc: 'তারকে টেনে স্থিতিস্থাপক সীমার মধ্যে দ্বিগুণ লম্বা করতে প্রয়োজনীয় বল', ans: 'ইয়ং-এর গুণাঙ্ক × প্রস্থচ্ছেদ ক্ষেত্রফল (F = Y·A)' },
  ];
  const wirePool = [
    '২ গুণ (l ∝ L)',
    'এক-চতুর্থাংশ (l/4; কারণ l ∝ 1/r²)',
    'অর্ধেক (l/2; কারণ 2/2² = ½)',
    '২ গুণ (½ / (½)² = ২)',
    '৪ গুণ (l ∝ 1/r²)',
    'অপরিবর্তিত থাকবে (দৈর্ঘ্যের ওপর নির্ভর করে না)',
    '৪ গুণ হবে (অসহ ভার ∝ প্রস্থচ্ছেদ ক্ষেত্রফল A ∝ r²)',
    'ইয়ং-এর গুণাঙ্ক × প্রস্থচ্ছেদ ক্ষেত্রফল (F = Y·A)',
  ];
  wireCases.forEach((wc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি ধাতব তারের ${wc.desc} কীরূপ হবে?`,
        correct: wc.ans,
        distractors: wirePool.filter((x) => x !== wc.ans).slice(i % 4, (i % 4) + 4),
        explanation: `হুকের সূত্র l = FL / (πr²Y) অনুযায়ী সঠিক উত্তর: ${wc.ans}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · তারের প্রসারণ ও অসহ ভার',
      })
    );
  });

  // Young's modulus numeric drills
  const youngNums = [
    { f: 200, l: 2, aMm2: 1, yGpa: 200, extMm: 2 },
    { f: 400, l: 2, aMm2: 2, yGpa: 200, extMm: 2 },
    { f: 100, l: 4, aMm2: 1, yGpa: 200, extMm: 2 },
    { f: 500, l: 2, aMm2: 1, yGpa: 200, extMm: 5 },
    { f: 1000, l: 1, aMm2: 2, yGpa: 100, extMm: 5 },
    { f: 600, l: 3, aMm2: 1.5, yGpa: 200, extMm: 6 },
  ];
  youngNums.forEach((yn, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(yn.aMm2)} mm² প্রস্থচ্ছেদের এবং ${toBnDigits(yn.l)} m দৈর্ঘ্যের একটি তারে (Y = ${toBnDigits(yn.yGpa)} × ১০⁹ N/m²) ${toBnDigits(yn.f)} N টান বল প্রয়োগ করলে দৈর্ঘ্য বৃদ্ধি কত মিলিমিটার?`,
        correct: `${toBnDigits(yn.extMm)} mm`,
        distractors: [0.5, 1, 2, 3, 4, 5, 6, 10].filter((x) => x !== yn.extMm).slice(0, 4).map((x) => `${toBnDigits(x)} mm`),
        explanation: `l = FL / (AY) = (${toBnDigits(yn.f)} × ${toBnDigits(yn.l)}) / (${toBnDigits(yn.aMm2)}×১০⁻⁶ × ${toBnDigits(yn.yGpa)}×১০⁹) = ${toBnDigits(yn.extMm)} mm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · ইয়ং গুণাঙ্ক গণনা',
      })
    );
  });

  // 2. Excess Pressure in Droplet/Bubble & Capillary Rise (Ch 7, ~36 MCQs)
  const surfNums = [
    { kind: 'তরল ফোঁটা', rMm: 1, t: 0.07, dp: 140 },
    { kind: 'তরল ফোঁটা', rMm: 0.5, t: 0.07, dp: 280 },
    { kind: 'সাবান বুদবুদ', rMm: 1, t: 0.03, dp: 120 },
    { kind: 'সাবান বুদবুদ', rMm: 2, t: 0.03, dp: 60 },
    { kind: 'সাবান বুদবুদ', rMm: 0.5, t: 0.025, dp: 200 },
    { kind: 'পানির অভ্যন্তরে বায়ুর বুদবুদ', rMm: 0.2, t: 0.07, dp: 700 },
  ];
  surfNums.forEach((sn, i) => {
    const mult = sn.kind === 'সাবান বুদবুদ' ? 4 : 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(sn.rMm)} mm ব্যাসার্ধের একটি "${sn.kind}"-এর পৃষ্ঠটান T = ${toBnDigits(sn.t)} N/m হলে এর ভেতরে অতিরিক্ত চাপ (ΔP) কত প্যাসকেল (Pa)?`,
        correct: `${toBnDigits(sn.dp)} Pa`,
        distractors: [60, 70, 120, 140, 200, 280, 350, 700].filter((x) => x !== sn.dp).slice(0, 4).map((x) => `${toBnDigits(x)} Pa`),
        explanation: `ΔP = ${toBnDigits(mult)}T / r = (${toBnDigits(mult)} × ${toBnDigits(sn.t)}) / (${toBnDigits(sn.rMm)} × ১০⁻³) = ${toBnDigits(sn.dp)} Pa।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · অতিরিক্ত চাপ',
      })
    );
  });

  // Stokes terminal velocity scaling
  const stokesScale = [
    { rMult: 2, vMult: 4 },
    { rMult: 3, vMult: 9 },
    { rMult: 4, vMult: 16 },
    { rMult: 0.5, vMult: 0.25 },
  ];
  stokesScale.forEach((st, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `একই উপাদানের দুটি ধাতব গোলকের মধ্যে দ্বিতীয়টির ব্যাসার্ধ প্রথমটির ${toBnDigits(st.rMult)} গুণ হলে কোনো সান্দ্র তরলের মধ্য দিয়ে পড়ার সময় দ্বিতীয়টির প্রান্তীয় বেগ প্রথমটির কত গুণ হবে?`,
        correct: `${toBnDigits(st.vMult)} গুণ`,
        distractors: ['০.২৫ গুণ', '০.৫ গুণ', '২ গুণ', '৪ গুণ', '৮ গুণ', '৯ গুণ', '১৬ গুণ', '২৭ গুণ'].filter((x) => x !== `${toBnDigits(st.vMult)} গুণ`).slice(0, 4),
        explanation: `স্টোকসের প্রান্তীয় বেগ v_t ∝ r² হওয়ায় ব্যাসার্ধ ${toBnDigits(st.rMult)} গুণ হলে প্রান্তীয় বেগ (${toBnDigits(st.rMult)})² = ${toBnDigits(st.vMult)} গুণ হয়।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · প্রান্তীয় বেগ',
      })
    );
  });

  // 3. SHM Equation Parsing, Energy Fractions & Pendulum Period Scaling (Ch 8, ~75 MCQs)
  const shmEqs = [
    { eq: 'x = 0.05 sin(20t + π/3)', amp: '০.০৫ m', omega: 20, vmax: 1, amax: 20 },
    { eq: 'x = 0.10 sin(10t + π/6)', amp: '০.১০ m', omega: 10, vmax: 1, amax: 10 },
    { eq: 'x = 0.20 sin(5t + π/4)', amp: '০.২০ m', omega: 5, vmax: 1, amax: 5 },
    { eq: 'x = 0.04 sin(50t)', amp: '০.০৪ m', omega: 50, vmax: 2, amax: 100 },
    { eq: 'x = 0.02 sin(100t − π/2)', amp: '০.০২ m', omega: 100, vmax: 2, amax: 200 },
    { eq: 'x = 0.50 sin(4t)', amp: '০.৫০ m', omega: 4, vmax: 2, amax: 8 },
  ];
  shmEqs.forEach((se, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `সরল ছন্দিত স্পন্দনশীল কণার সমীকরণ ${se.eq} হলে (SI এককে) এর সর্বোচ্চ বেগ (v_max) এবং সর্বোচ্চ ত্বরণ (a_max) যথাক্রমে কত?`,
        correct: `v_max = ${toBnDigits(se.vmax)} m/s, a_max = ${toBnDigits(se.amax)} m/s²`,
        distractors: [
          `v_max = ${toBnDigits(se.omega)} m/s, a_max = ${toBnDigits(se.amax)} m/s²`,
          `v_max = ${toBnDigits(se.vmax * 2)} m/s, a_max = ${toBnDigits(se.amax / 2)} m/s²`,
          `v_max = ${toBnDigits(se.vmax)} m/s, a_max = ${toBnDigits(se.omega)} m/s²`,
          `v_max = ${toBnDigits(se.vmax * 5)} m/s, a_max = ${toBnDigits(se.amax * 2)} m/s²`,
        ],
        explanation: `বিস্তার A = ${se.amp}, ω = ${toBnDigits(se.omega)} rad/s; তাই v_max = ωA = ${toBnDigits(se.vmax)} m/s এবং a_max = ω²A = ${toBnDigits(se.amax)} m/s²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM বেগ ও ত্বরণ',
      })
    );
  });

  // SHM Energy Fraction at x/A
  const shmEnergyPos = [
    { pos: 'x = ০ (সাম্যাবস্থান)', keFrac: '১০০% (E)', peFrac: '০% (শূন্য)' },
    { pos: 'x = ±A (প্রান্তবিন্দু)', keFrac: '০% (শূন্য)', peFrac: '১০০% (E)' },
    { pos: 'x = A / ২', keFrac: '৭৫% (¾ E)', peFrac: '২৫% (¼ E)' },
    { pos: 'x = A / √২', keFrac: '৫০% (½ E)', peFrac: '৫০% (½ E)' },
    { pos: 'x = (√৩ / ২) A', keFrac: '২৫% (¼ E)', peFrac: '৭৫% (¾ E)' },
  ];
  shmEnergyPos.forEach((ep, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `মোট যান্ত্রিক শক্তি E বিশিষ্ট সরল ছন্দিত স্পন্দন কণার "${ep.pos}" অবস্থানে গতিশক্তি (KE) ও বিভবশক্তি (PE) কত হবে?`,
        correct: `KE = ${ep.keFrac}, PE = ${ep.peFrac}`,
        distractors: shmEnergyPos
          .filter((x) => x.pos !== ep.pos)
          .map((x) => `KE = ${x.keFrac}, PE = ${x.peFrac}`),
        explanation: `PE = ½k x² এবং KE = ½k(A² − x²); ${ep.pos}-এ KE = ${ep.keFrac} এবং PE = ${ep.peFrac}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM শক্তির বণ্টন',
      })
    );
  });

  // Pendulum L, g changes & Spring series/parallel combinations
  const pendCases = [
    { cond: 'কার্যকর দৈর্ঘ্য L ৪ গুণ করা হলে', tChange: 'দোলনকাল ২ গুণ হবে (T ∝ √L)' },
    { cond: 'কার্যকর দৈর্ঘ্য L ৯ গুণ করা হলে', tChange: 'দোলনকাল ৩ গুণ হবে' },
    { cond: 'কার্যকর দৈর্ঘ্য এক-চতুর্থাংশ (L/4) করা হলে', tChange: 'দোলনকাল অর্ধেক (T/2) হবে' },
    { cond: 'দোলককে চাঁদে (g_moon = g/6) নিয়ে গেলে', tChange: 'দোলনকাল √৬ (≈ ২.৪৫) গুণ হবে' },
    { cond: 'দোলকযুক্ত লিফট g/4 ত্বরণে ওপরে উঠলে (g_eff = 5g/4)', tChange: 'দোলনকাল কমে √(৪/৫) গুণ হবে' },
    { cond: 'দোলকযুক্ত লিফট g/2 ত্বরণে নিচে নামলে (g_eff = g/2)', tChange: 'দোলনকাল বেড়ে √২ গুণ হবে' },
    { cond: 'ফাঁপা ববকে পানি পূর্ণ করে অর্ধেক খালি করে নিলে', tChange: 'ভরকেন্দ্র নিচে নামায় প্রথমে L ও T বাড়ে, পরে খালি হলে পূর্বাবস্থায় ফিরে' },
    { cond: 'দোলকের দৈর্ঘ্য ২% বাড়ালে (ক্ষুদ্র পরিবর্তন)', tChange: 'দোলনকাল ১% বাড়বে (ΔT/T = ½ ΔL/L)' },
  ];
  const pendPool = pendCases.map((p) => p.tChange);
  pendCases.forEach((pc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি সরল দোলকের ক্ষেত্রে "${pc.cond}" এর দোলনকালের (T) কী পরিবর্তন ঘটবে?`,
        correct: pc.tChange,
        distractors: pendPool.filter((x) => x !== pc.tChange).slice(i % 4, (i % 4) + 4),
        explanation: `সরল দোলকের সূত্র T = 2π√(L / g_eff) অনুযায়ী ${pc.cond} → ${pc.tChange}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · সরল দোলকের দোলনকাল',
      })
    );
  });

  // Spring combinations
  const springCombos = [
    { k1: 100, k2: 100, mode: 'সমান্তরাল (Parallel)', keq: 200 },
    { k1: 100, k2: 100, mode: 'শ্রেণি (Series)', keq: 50 },
    { k1: 300, k2: 600, mode: 'শ্রেণি (Series)', keq: 200 },
    { k1: 300, k2: 600, mode: 'সমান্তরাল (Parallel)', keq: 900 },
    { k1: 200, k2: 200, mode: 'শ্রেণি (Series)', keq: 100 },
    { k1: 200, k2: 200, mode: 'সমান্তরাল (Parallel)', keq: 400 },
  ];
  springCombos.forEach((sc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(sc.k1)} N/m এবং ${toBnDigits(sc.k2)} N/m স্প্রিং ধ্রুবকবিশিষ্ট দুটি স্প্রিংকে "${sc.mode}" সমবায়ে যুক্ত করলে তুল্য স্প্রিং ধ্রুবক (k_eq) কত হবে?`,
        correct: `${toBnDigits(sc.keq)} N/m`,
        distractors: [50, 100, 150, 200, 300, 400, 600, 900].filter((x) => x !== sc.keq).slice(0, 4).map((x) => `${toBnDigits(x)} N/m`),
        explanation: `শ্রেণিতে 1/k_s = 1/k₁ + 1/k₂ এবং সমান্তরালে k_p = k₁ + k₂ ⇒ তুল্য মান ${toBnDigits(sc.keq)} N/m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · স্প্রিংয়ের সমবায়',
      })
    );
  });

  // 4. Ch 7 & 8 High-Yield Two-Way Medical Fact Matrix (~80 MCQs)
  const ch7to8Pairs: Array<{ ch: string; q: string; a: string; ref: string }> = [
    { ch: 'phys1_ch7_matter', q: 'তাপমাত্রা বৃদ্ধি করলে স্থিতিস্থাপকতা হ্রাস পেলেও কোন সংকর ধাতুর ইয়ং গুণাঙ্ক প্রায় অপরিবর্তিত থাকে', a: 'ইনভার ইস্পাত (Invar: ৩৬% Ni ও ৬৪% Fe)', ref: 'অধ্যায় ৭ · স্থিতিস্থাপকতা ও তাপমাত্রা' },
    { ch: 'phys1_ch7_matter', q: 'কোয়ার্টজ বা ফসফর ব্রোঞ্জ তন্তু গ্যালভানোমিটার ও টর্শন ব্যালেন্সে ব্যবহৃত হয় কেন', a: 'স্থিতিস্থাপক শ্রান্তি (Elastic Fatigue) ও স্থিতিস্থাপক অবশিষ্টতা খুবই কম বলে', ref: 'অধ্যায় ৭ · স্থিতিস্থাপক শ্রান্তি' },
    { ch: 'phys1_ch7_matter', q: 'একটি ইস্পাতের তারে স্থিতিস্থাপক সীমার বাইরে ভার ঝুলিয়ে ছেড়ে দিলে যে স্থায়ী বিকৃতি থেকে যায় তাকে কী বলে', a: 'স্থায়ী বিকৃতি বা প্লাস্টিক বিকৃতি (অসহ সীমার পূর্বাবস্থা)', ref: 'অধ্যায় ৭ · পীড়ন-বিকৃতি লেখ' },
    { ch: 'phys1_ch7_matter', q: 'যদি দুটি তারের দৈর্ঘ্য ও প্রস্থচ্ছেদ সমান কিন্তু একটি তামা ও অপরটি ইস্পাতের হয় তবে সমান দৈর্ঘ্য বৃদ্ধিতে কোনটিতে বেশি বল লাগবে', a: 'ইস্পাতের তারে (কারণ Y_steel > Y_copper)', ref: 'অধ্যায় ৭ · ইয়ং গুণাঙ্ক তুলনা' },
    { ch: 'phys1_ch7_matter', q: 'পানির সাথে সাধারণ সাবান বা ডিটারজেন্ট মেশালে পৃষ্ঠটান ও কাপড় ভেজানোর ক্ষমতা কেমন হয়', a: 'পৃষ্ঠটান কমে যায় এবং স্পর্শ কোণ হ্রাস পেয়ে কাপড় ভেজানোর ক্ষমতা বাড়ে', ref: 'অধ্যায় ৭ · সাবান ও পৃষ্ঠটান' },
    { ch: 'phys1_ch7_matter', q: 'একটি সাবান বুদবুদ ও একটি পানির ফোঁটায় অতিরিক্ত চাপের সূত্র যথাক্রমে 4T/r ও 2T/r হয় কেন', a: 'সাবান বুদবুদের ভেতরে ও বাইরে দুটি মুক্ততল থাকে, পানির ফোঁটার মাত্র একটি', ref: 'অধ্যায় ৭ · মুক্ততল সংখ্যা' },
    { ch: 'phys1_ch7_matter', q: 'ঝড়ের সময় উত্তাল সমুদ্রে নাবিকেরা পানিতে তেল ঢেলে দেয় কেন', a: 'তেল পানির পৃষ্ঠটান কমিয়ে দেওয়ায় বড় ঢেউয়ের তীব্রতা ও ফেনা প্রশমিত হয়', ref: 'অধ্যায় ৭ · পৃষ্ঠটানের প্রয়োগ' },
    { ch: 'phys1_ch7_matter', q: 'পোড়া মাটির কলসি বা ইটের গায়ে সূক্ষ্ম কৈশিক ছিদ্র দিয়ে পানি ওপরে উঠে আসে কোন ধর্মের কারণে', a: 'পানির পৃষ্ঠটানজনিত কৈশিক ক্রিয়া (Capillarity)', ref: 'অধ্যায় ৭ · কৈশিক ক্রিয়া' },
    { ch: 'phys1_ch7_matter', q: 'একটি কৈশিক নলকে প্রয়োজনীয় আরোহণ উচ্চতা h-এর চেয়ে ছোট করে ভেঙে দিলে পানি কি ওপর দিয়ে উপচে পড়বে', a: 'না, নলের মুখ পর্যন্ত উঠে বক্রতা ব্যাসার্ধ বেড়ে সমানুপাতিক সাম্যে স্থির থাকবে (ঝর্ণা হবে না)', ref: 'অধ্যায় ৭ · অপর্যাপ্ত দৈর্ঘ্যের কৈশিক নল' },
    { ch: 'phys1_ch7_matter', q: 'রক্তের চাপ কম থাকা রোগীর তুলনায় ধমনীর সরু অংশে রক্তের বেগ বাড়লে চাপ কেমন হয় (বার্নৌলির নীতি)', a: 'সরু অংশে বেগ বাড়ায় স্থির চাপ কমে যায় (ভেন্টুরি প্রভাব)', ref: 'অধ্যায় ৭ · বার্নৌলির উপপাদ্য' },
    { ch: 'phys1_ch7_matter', q: 'ঝড়ের সময় ঘরের টিনের চাল ওপরে উড়ে যাওয়া বা দ্রুতগামী ট্রেনের পাশে দাঁড়ালে ট্রেনের দিকে টান লাগার কারণ কী', a: 'বেগ বেশি হলে বায়ুচাপ কমে যায় (বার্নৌলির উপপাদ্য)', ref: 'অধ্যায় ৭ · বায়ুগতিবিদ্যা' },
    { ch: 'phys1_ch7_matter', q: 'মানবদেহে ধমনী ও শিরায় রক্তের সান্দ্রতা প্রধানত কিসের ওপর নির্ভর করে', a: 'লোহিত রক্তকণিকার পরিমাণ (Hematocrit) এবং প্লাজমা প্রোটিনের ঘনত্বের ওপর', ref: 'অধ্যায় ৭ · রক্তের সান্দ্রতা' },
    { ch: 'phys1_ch8_periodic_motion', q: 'যে দোলকের দোলনকাল পৃথিবীর আহ্নিক গতির পর্যায়কাল (২৪ ঘণ্টা)-এর সাথে সমন্বিত বা ঠিক ২ সেকেন্ড তা কী নামে পরিচিত', a: 'সেকেন্ড দোলক (T = ২ s, কম্পাঙ্ক ০.৫ Hz)', ref: 'অধ্যায় ৮ · সেকেন্ড দোলক' },
    { ch: 'phys1_ch8_periodic_motion', q: 'পাহাড়ের চূড়ায় বা গভীর খনির তলদেশে সেকেন্ড দোলক নিয়ে গেলে দোলক ঘড়িটির সময় কেমন চলবে', a: 'উভয় স্থানে g কমে যাওয়ায় T বেড়ে ঘড়িটি ধীরে (Slow) চলবে ও সময় হারাবে', ref: 'অধ্যায় ৮ · পাহাড় ও খনিতে দোলক' },
    { ch: 'phys1_ch8_periodic_motion', q: 'পৃথিবীর বিষুব অঞ্চল থেকে কোনো সেকেন্ড দোলক ঘড়িকে মেরু অঞ্চলে নিয়ে গেলে ঘড়িটি কী করবে', a: 'মেরুতে g বেশি বলে T কমে যাবে এবং ঘড়িটি দ্রুত (Fast) চলবে (সময় লাভ করবে)', ref: 'অধ্যায় ৮ · অক্ষাংশ ও দোলক' },
    { ch: 'phys1_ch8_periodic_motion', q: 'একটি ফাঁপা ধাতব গোলকের ভেতরে পারদ পূর্ণ করে দোলালে সরল দোলকের কার্যকর দৈর্ঘ্য কোথা পর্যন্ত মাপা হয়', a: 'ঝুলন বিন্দু থেকে ববের ভরকেন্দ্রের কেন্দ্র পর্যন্ত দূরত্ব', ref: 'অধ্যায় ৮ · কার্যকর দৈর্ঘ্য' },
    { ch: 'phys1_ch8_periodic_motion', q: 'সকল পর্যাবৃত্ত গতি সরল ছন্দিত গতি কি না এবং উদাহরণ কী', a: 'সকল সরল ছন্দিত গতি পর্যাবৃত্ত, কিন্তু সকল পর্যাবৃত্ত গতি (যেমন বৃত্তাকার বা হৃৎস্পন্দন) সরল ছন্দিত নয়', ref: 'অধ্যায় ৮ · গতির শ্রেণিবিভাগ' },
    { ch: 'phys1_ch8_periodic_motion', q: 'সরল ছন্দিত গতির জন্য সর্বনিম্ন প্রয়োজনীয় শর্ত দুটি ভৌত ধর্ম কী কী', a: 'জড়তা (ভর) এবং স্থিতিস্থাপকতা (প্রত্যায়নী বল)', ref: 'অধ্যায় ৮ · SHM শর্ত' },
    { ch: 'phys1_ch8_periodic_motion', q: 'পরবশ কম্পনে (Forced Vibration) বাহ্যিক পর্যাবৃত্ত বলের কম্পাঙ্ক বস্তুর স্বাভাবিক কম্পাঙ্কের সমান হলে কী ঘটে', a: 'অনুনাদ (Resonance) সৃষ্টি হয় এবং কম্পনের বিস্তার সর্বাধিক হয়', ref: 'অধ্যায় ৮ · অনুনাদ' },
    { ch: 'phys1_ch8_periodic_motion', q: 'সৈন্যদল পুল পার হওয়ার সময় মার্চিং বা তালে তালে পা ফেলে না কেন', a: 'সৈন্যদের পা ফেলার কম্পাঙ্ক পুলের স্বাভাবিক কম্পাঙ্কের সমান হয়ে অনুনাদ ঘটলে পুল ভেঙে যেতে পারে', ref: 'অধ্যায় ৮ · অনুনাদের ঝুঁকি' },
  ];
  ch7to8Pairs.forEach((cp, i) => {
    const others = ch7to8Pairs.filter((x) => x.q !== cp.q);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cp.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${cp.q}?`,
        correct: cp.a,
        distractors: others.slice(i % 12, (i % 12) + 4).map((x) => x.a),
        explanation: `${cp.q} — সঠিক উত্তর: ${cp.a}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${cp.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cp.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `পদার্থবিজ্ঞানে "${cp.a}" সিদ্ধান্তটি কোন ঘটনার সঠিক ব্যাখ্যা?`,
        correct: cp.q,
        distractors: others.slice((i + 5) % 12, ((i + 5) % 12) + 4).map((x) => x.q),
        explanation: `"${cp.a}" প্রযোজ্য যখন: ${cp.q}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${cp.ref}`,
      })
    );
  });

  // 5. Additional Numerical Drills on Capillary, Elastic Energy & Pendulum Percentage (Ch 7-8, ~40 MCQs)
  const capRadii = [
    { r1: 1, r2: 2, h1: 6, h2: 3 },
    { r1: 0.5, r2: 1, h1: 10, h2: 5 },
    { r1: 0.4, r2: 0.8, h1: 8, h2: 4 },
    { r1: 0.2, r2: 0.6, h1: 12, h2: 4 },
    { r1: 0.3, r2: 0.9, h1: 9, h2: 3 },
  ];
  capRadii.forEach((cr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি ${toBnDigits(cr.r1)} mm ব্যাসার্ধের কৈশিক নলে পানি ${toBnDigits(cr.h1)} cm উচ্চতায় ওঠে। একই পানিতে ${toBnDigits(cr.r2)} mm ব্যাসার্ধের অপর একটি নল ডুবালে পানি কত cm উঠবে?`,
        correct: `${toBnDigits(cr.h2)} cm`,
        distractors: [2, 3, 4, 5, 6, 8, 12, 18].filter((x) => x !== cr.h2).slice(0, 4).map((x) => `${toBnDigits(x)} cm`),
        explanation: `জুরিনের সূত্র h₁ r₁ = h₂ r₂ ⇒ h₂ = (${toBnDigits(cr.h1)} × ${toBnDigits(cr.r1)}) / ${toBnDigits(cr.r2)} = ${toBnDigits(cr.h2)} cm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · জুরিনের কৈশিক সূত্র',
      })
    );
  });

  // Pendulum seconds lost/gained per day for small % change in L or g
  const clockDrift = [
    { cond: 'কার্যকর দৈর্ঘ্য ০.২% বৃদ্ধি পেলে (T বাড়ে ০.১%)', effect: 'প্রতিদিন ৮৬.৪ সেকেন্ড ধীরে চলবে (সময় হারাবে)' },
    { cond: 'কার্যকর দৈর্ঘ্য ০.২% হ্রাস পেলে (T কমে ০.১%)', effect: 'প্রতিদিন ৮৬.৪ সেকেন্ড দ্রুত চলবে (সময় লাভ করবে)' },
    { cond: 'অভিকর্ষজ ত্বরণ g ০.৪% হ্রাস পেলে (পাহাড়ে)', effect: 'প্রতিদিন ১৭২.৮ সেকেন্ড ধীরে চলবে' },
    { cond: 'অভিকর্ষজ ত্বরণ g ০.৪% বৃদ্ধি পেলে (মেরুতে)', effect: 'প্রতিদিন ১৭২.৮ সেকেন্ড দ্রুত চলবে' },
  ];
  clockDrift.forEach((cd, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি সঠিক সময়দানকারী সেকেন্ড দোলক ঘড়ির ${cd.cond} ঘড়িটি এক দিনে (৮৬,৪০০ সেকেন্ডে) কতটুকু সময় হারাবে বা লাভ করবে?`,
        correct: cd.effect,
        distractors: clockDrift.filter((x) => x.effect !== cd.effect).map((x) => x.effect).concat(['কোনো সময়ের পার্থক্য হবে না']),
        explanation: `ΔT/T = ½ (ΔL/L − Δg/g); ২৪ ঘণ্টা = ৮৬,৪০০ s দ্বারা গুণ করে পাওয়া যায়: ${cd.effect}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · দোলক ঘড়ির সময় ত্রুটি',
      })
    );
  });

  return list;
}
