import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredL(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sl_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 7: Elasticity, Viscosity & Surface Tension (~96 MCQs)
  // =========================================================================
  // 1A: Stress, Strain, Young's Modulus (24 MCQs)
  [
    { F: 200, A_mm2: 2, L: 2, dL_mm: 1 },
    { F: 500, A_mm2: 5, L: 4, dL_mm: 2 },
    { F: 400, A_mm2: 2, L: 3, dL_mm: 1.5 },
    { F: 1000, A_mm2: 4, L: 2, dL_mm: 0.5 },
    { F: 600, A_mm2: 3, L: 5, dL_mm: 2.5 },
    { F: 800, A_mm2: 4, L: 2, dL_mm: 1 },
    { F: 1200, A_mm2: 6, L: 3, dL_mm: 1.5 },
    { F: 300, A_mm2: 1.5, L: 4, dL_mm: 2 },
  ].forEach((el, idx) => {
    const stressMPa = el.F / el.A_mm2; // N/mm^2 = MPa
    const strain = Number((el.dL_mm / (el.L * 1000)).toFixed(6));
    const yGPa = Number(((stressMPa / 1000) / strain).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(el.A_mm2)} mm² প্রস্থচ্ছেদের ক্ষেত্রফলবিশিষ্ট একটি তারে ${toBnDigits(el.F)} N বল প্রয়োগ করা হলে তারটির অসহ পীড়ন বা প্রযুক্ত পীড়ন কত MPa?`,
        correct: `${toBnDigits(stressMPa)} MPa`,
        distractors: [stressMPa / 2, stressMPa * 2, stressMPa + 50, stressMPa + 150]
          .filter((x) => x !== stressMPa)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} MPa`),
        explanation: `পীড়ন = F/A = ${toBnDigits(el.F)} / (${toBnDigits(el.A_mm2)}×১০⁻⁶) = ${toBnDigits(stressMPa)}×১০⁶ Pa = ${toBnDigits(stressMPa)} MPa।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পীড়ন ও বিকৃতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(el.L)} m দীর্ঘ ও ${toBnDigits(el.A_mm2)} mm² প্রস্থচ্ছেদের একটি তার ${toBnDigits(el.F)} N টানে ${toBnDigits(el.dL_mm)} mm প্রসারিত হলে উপাদানটির ইয়ং-এর গুণাঙ্ক কত GPa?`,
        correct: `${toBnDigits(yGPa)} GPa`,
        distractors: [yGPa / 2, yGPa * 2, yGPa + 100, yGPa - 50]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== yGPa)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} GPa`),
        explanation: `Y = FL/(AΔL) = ${toBnDigits(stressMPa)} MPa / ${toBnDigits(strain)} = ${toBnDigits(yGPa)} GPa।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · ইয়ং-এর গুণাঙ্ক',
      })
    );
  });

  // 1B: Terminal velocity scaling v_t ~ r^2 & merging raindrops (20 MCQs)
  [
    { n: 8, vSmall: 2 },
    { n: 8, vSmall: 5 },
    { n: 27, vSmall: 2 },
    { n: 27, vSmall: 3 },
    { n: 64, vSmall: 1 },
    { n: 64, vSmall: 2 },
    { n: 125, vSmall: 1 },
    { n: 8, vSmall: 4 },
    { n: 27, vSmall: 4 },
    { n: 64, vSmall: 3 },
  ].forEach((dr, idx) => {
    const scaleR = Math.round(Math.cbrt(dr.n));
    const vLarge = dr.vSmall * scaleR * scaleR;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(dr.vSmall)} cm/s প্রান্তীয় বেগে পতিত ${toBnDigits(dr.n)}টি সমান বৃষ্টির ক্ষুদ্র ফোঁটা একত্রিত হয়ে একটি বড় ফোঁটায় পরিণত হলে বড় ফোঁটাটির প্রান্তীয় বেগ কত cm/s হবে?`,
        correct: `${toBnDigits(vLarge)} cm/s`,
        distractors: [dr.vSmall * dr.n, dr.vSmall * scaleR, vLarge * 2, dr.vSmall * 3, dr.vSmall * 6, vLarge + 10]
          .filter((x) => x !== vLarge)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm/s`),
        explanation: `আয়তন সংরক্ষণ থেকে R = n^(1/3)r = ${toBnDigits(scaleR)}r; যেহেতু v_t ∝ r², তাই V_large = ${toBnDigits(scaleR)}² × ${toBnDigits(dr.vSmall)} = ${toBnDigits(vLarge)} cm/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · স্টোকসের সূত্র ও প্রান্তীয় বেগ',
      })
    );
  });

  // 1C: Excess pressure & work in surface tension (24 MCQs)
  [
    { T: 0.03, rCm: 1, mode: 'সাবান বুদবুদ' },
    { T: 0.04, rCm: 2, mode: 'সাবান বুদবুদ' },
    { T: 0.05, rCm: 1, mode: 'সাবান বুদবুদ' },
    { T: 0.072, rCm: 2, mode: 'পানির ফোঁটা' },
    { T: 0.06, rCm: 3, mode: 'সাবান বুদবুদ' },
    { T: 0.075, rCm: 1.5, mode: 'পানির ফোঁটা' },
    { T: 0.045, rCm: 1.5, mode: 'সাবান বুদবুদ' },
    { T: 0.08, rCm: 4, mode: 'পানির ফোঁটা' },
  ].forEach((st, idx) => {
    const rM = st.rCm / 100;
    const mult = st.mode === 'সাবান বুদবুদ' ? 4 : 2;
    const pEx = Number(((mult * st.T) / rM).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(st.rCm)} cm ব্যাসার্ধের একটি ${st.mode}-এর তরলের পৃষ্ঠটান ${toBnDigits(st.T)} N/m হলে এর অভ্যন্তরে অতিরিক্ত চাপ (Excess Pressure) কত Pa?`,
        correct: `${toBnDigits(pEx)} Pa`,
        distractors: [pEx / 2, pEx * 2, pEx + 4, pEx - 3]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== pEx)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Pa`),
        explanation: `${st.mode}-এর মুক্ত তল ${toBnDigits(mult / 2)}টি হওয়ায় ΔP = ${toBnDigits(mult)}T/r = ${toBnDigits(pEx)} Pa।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পৃষ্ঠটান ও অতিরিক্ত চাপ',
      })
    );
  });

  // =========================================================================
  // 2. Ch 8: Periodic Motion & SHM (~104 MCQs)
  // =========================================================================
  // 2A: SHM Equation x = A sin(wt + phi) extraction (36 MCQs)
  [
    { A: 0.05, w: 10, phi: 'π/6' },
    { A: 0.1, w: 20, phi: 'π/3' },
    { A: 0.2, w: 5, phi: 'π/4' },
    { A: 0.04, w: 25, phi: 'π/2' },
    { A: 0.5, w: 4, phi: '0' },
    { A: 0.08, w: 10, phi: 'π/6' },
    { A: 0.15, w: 20, phi: 'π/4' },
    { A: 0.02, w: 50, phi: 'π/3' },
    { A: 0.25, w: 8, phi: 'π/2' },
  ].forEach((shm, idx) => {
    const vmax = Number((shm.w * shm.A).toFixed(2));
    const amax = Number((shm.w * shm.w * shm.A).toFixed(1));
    const eq = shm.phi === '0' ? `x = ${toBnDigits(shm.A)} sin(${toBnDigits(shm.w)}t)` : `x = ${toBnDigits(shm.A)} sin(${toBnDigits(shm.w)}t + ${shm.phi})`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `সরল ছন্দিত স্পন্দনরত একটি কণার সমীকরণ ${eq} m হলে কণাটির সর্বাধিক বেগ (v_max) কত m/s?`,
        correct: `${toBnDigits(vmax)} m/s`,
        distractors: [vmax * 2, vmax / 2, amax, shm.A]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== vmax)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `x = A sin(ωt + δ) হতে A = ${toBnDigits(shm.A)} m, ω = ${toBnDigits(shm.w)} rad/s; সুতরাং v_max = ωA = ${toBnDigits(vmax)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · সরল ছন্দিত স্পন্দনের বেগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `একটি কণার সরল ছন্দিত গতির সমীকরণ ${eq} m হলে কণাটির সর্বাধিক ত্বরণের মান (a_max) কত m/s²?`,
        correct: `${toBnDigits(amax)} m/s²`,
        distractors: [amax * 2, amax / 2, vmax, shm.w]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== amax)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m/s²`),
        explanation: `সর্বাধিক ত্বরণ a_max = ω²A = (${toBnDigits(shm.w)})² × ${toBnDigits(shm.A)} = ${toBnDigits(amax)} m/s²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · সরল ছন্দিত স্পন্দনের ত্বরণ',
      })
    );
  });

  // 2B: Pendulum length scaling & percentage change (28 MCQs)
  [
    { pctL: '৪৪%', factorL: 1.44, pctT: '২০%' },
    { pctL: '২১%', factorL: 1.21, pctT: '১০%' },
    { pctL: '৬৯%', factorL: 1.69, pctT: '৩০%' },
    { pctL: '৩০০%', factorL: 4, pctT: '১০০%' },
    { pctL: '৮০০%', factorL: 9, pctT: '২০০%' },
  ].forEach((pl, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি সরল দোলকের কার্যকর দৈর্ঘ্য ${pl.pctL} বৃদ্ধি করা হলে এর দোলনকাল শতকরা কত বৃদ্ধি পাবে?`,
        correct: pl.pctT,
        distractors: ['১০%', '২০%', '৩০%', '৪৪%', '১০০%', '২০০%'].filter((x) => x !== pl.pctT).slice(0, 4),
        explanation: `T ∝ √L; দৈর্ঘ্য ${toBnDigits(pl.factorL)} গুণ হলে T হয় √(${toBnDigits(pl.factorL)}) গুণ, অর্থাৎ ${pl.pctT} বৃদ্ধি পায়।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · সরল দোলকের দোলনকাল',
      })
    );
  });

  [
    { k1: 100, k2: 100, mode: 'শ্রেণি', keq: 50 },
    { k1: 100, k2: 100, mode: 'সমান্তরাল', keq: 200 },
    { k1: 200, k2: 200, mode: 'শ্রেণি', keq: 100 },
    { k1: 200, k2: 200, mode: 'সমান্তরাল', keq: 400 },
    { k1: 300, k2: 600, mode: 'শ্রেণি', keq: 200 },
    { k1: 300, k2: 600, mode: 'সমান্তরাল', keq: 900 },
    { k1: 400, k2: 400, mode: 'শ্রেণি', keq: 200 },
    { k1: 400, k2: 400, mode: 'সমান্তরাল', keq: 800 },
    { k1: 600, k2: 300, mode: 'শ্রেণি', keq: 200 },
    { k1: 150, k2: 300, mode: 'শ্রেণি', keq: 100 },
    { k1: 150, k2: 300, mode: 'সমান্তরাল', keq: 450 },
  ].forEach((sp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `${toBnDigits(sp.k1)} N/m এবং ${toBnDigits(sp.k2)} N/m স্প্রিং ধ্রুবকের দুটি স্প্রিংকে ${sp.mode} সমবায়ে যুক্ত করলে তুল্য স্প্রিং ধ্রুবক কত N/m হবে?`,
        correct: `${toBnDigits(sp.keq)} N/m`,
        distractors: [sp.keq / 2, sp.keq * 2, sp.k1 + sp.k2, Math.abs(sp.k1 - sp.k2) + 50]
          .filter((x) => x > 0 && x !== sp.keq)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} N/m`),
        explanation: `${sp.mode} সমবায়ে তুল্য স্প্রিং ধ্রুবক = ${toBnDigits(sp.keq)} N/m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · স্প্রিং সমবায়',
      })
    );
  });

  // =========================================================================
  // 3. Ch 9: Waves, Organ Pipes, Beats & Sound Intensity (~110 MCQs)
  // =========================================================================
  // 3A: Sound Intensity dB = 10 log10(I / I0) (24 MCQs)
  [
    { ratio: '১০', db: 10 },
    { ratio: '১০০', db: 20 },
    { ratio: '১,০০০', db: 30 },
    { ratio: '১০⁴', db: 40 },
    { ratio: '১০⁵', db: 50 },
    { ratio: '১০⁶', db: 60 },
    { ratio: '১০⁷', db: 70 },
    { ratio: '১০⁸', db: 80 },
    { ratio: '১০⁹', db: 90 },
    { ratio: '১০¹⁰', db: 100 },
    { ratio: '১০¹²', db: 120 },
  ].forEach((dbItem, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো শব্দের তীব্রতা প্রমাণ তীব্রতা (I₀ = ১০⁻¹² W/m²)-এর তুলনায় ${dbItem.ratio} গুণ হলে শব্দটির তীব্রতা লেভেল কত ডেসিবেল (dB)?`,
        correct: `${toBnDigits(dbItem.db)} dB`,
        distractors: [dbItem.db / 10, dbItem.db + 10, dbItem.db + 20, dbItem.db * 2]
          .filter((x) => x > 0 && x !== dbItem.db)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} dB`),
        explanation: `β = ১০ log₁₀(I/I₀) = ১০ log₁₀(${dbItem.ratio}) = ${toBnDigits(dbItem.db)} dB।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শব্দের তীব্রতা লেভেল',
      })
    );
  });

  // 3B: Organ pipe fundamental frequencies (24 MCQs)
  [
    { L: 0.5, v: 340 },
    { L: 1.0, v: 340 },
    { L: 0.25, v: 340 },
    { L: 0.85, v: 340 },
    { L: 0.4, v: 320 },
    { L: 0.8, v: 320 },
    { L: 0.5, v: 350 },
    { L: 1.0, v: 350 },
    { L: 0.6, v: 360 },
    { L: 0.3, v: 360 },
  ].forEach((op, idx) => {
    const fOpen = Number((op.v / (2 * op.L)).toFixed(1));
    const fClosed = Number((op.v / (4 * op.L)).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(op.L)} m দৈর্ঘ্যের একটি দুই মুখ খোলা (Open) অর্গান নলের মূল সুরের কম্পাঙ্ক কত Hz? (শব্দের বেগ ${toBnDigits(op.v)} m/s)`,
        correct: `${toBnDigits(fOpen)} Hz`,
        distractors: [fClosed, fOpen * 2, fOpen + 50, fOpen - 40]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== fOpen)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Hz`),
        explanation: `খোলা নলের মূল সুর f₁ = v/(2L) = ${toBnDigits(op.v)} / (২ × ${toBnDigits(op.L)}) = ${toBnDigits(fOpen)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · খোলা অর্গান নল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(op.L)} m দীর্ঘ একটি এক মুখ বন্ধ (Closed) অর্গান নলের মৌলিক কম্পাঙ্ক কত Hz? (শব্দের বেগ ${toBnDigits(op.v)} m/s)`,
        correct: `${toBnDigits(fClosed)} Hz`,
        distractors: [fOpen, fClosed * 3, fClosed + 35, fClosed / 2]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== fClosed)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Hz`),
        explanation: `এক মুখ বন্ধ নলের মূল সুর f₁ = v/(4L) = ${toBnDigits(op.v)} / (৪ × ${toBnDigits(op.L)}) = ${toBnDigits(fClosed)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · বদ্ধ অর্গান নল',
      })
    );
  });

  // 3C: Progressive wave equation y = A sin(2pi/lambda (vt - x)) or sin(wt - kx) (24 MCQs)
  [
    { w: 100, k: 2 },
    { w: 200, k: 4 },
    { w: 300, k: 5 },
    { w: 400, k: 8 },
    { w: 600, k: 3 },
    { w: 500, k: 2.5 },
    { w: 120, k: 4 },
    { w: 250, k: 5 },
    { w: 360, k: 6 },
    { w: 450, k: 9 },
  ].forEach((wv, idx) => {
    const v = Number((wv.w / wv.k).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি অগ্রগামী তরঙ্গের সমীকরণ y = ০.০৫ sin(${toBnDigits(wv.w)}t - ${toBnDigits(wv.k)}x) m হলে তরঙ্গটির বেগ কত m/s?`,
        correct: `${toBnDigits(v)} m/s`,
        distractors: [v * 2, v / 2, wv.w, v + 25]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x !== v)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `তরঙ্গের বেগ v = ω/k = ${toBnDigits(wv.w)} / ${toBnDigits(wv.k)} = ${toBnDigits(v)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · অগ্রগামী তরঙ্গের বেগ',
      })
    );
  });

  // =========================================================================
  // 4. Ch 10: Ideal Gas, RMS Speed, Degrees of Freedom & Humidity (~110 MCQs)
  // =========================================================================
  // 4A: Gas RMS Speed Ratio vs Molar Mass & Temperature (24 MCQs)
  [
    { g1: 'হাইড্রোজেন (H₂, M=2)', m1: 2, g2: 'অক্সিজেন (O₂, M=32)', m2: 32, ratio: '৪ : ১' },
    { g1: 'হিলিয়াম (He, M=4)', m1: 4, g2: 'সালফার ডাইঅক্সাইড (SO₂, M=64)', m2: 64, ratio: '৪ : ১ (২)' },
    { g1: 'হাইড্রোজেন (H₂, M=2)', m1: 2, g2: 'হিলিয়াম (He, M=4)', m2: 4, ratio: '√২ : ১' },
    { g1: 'হিলিয়াম (He, M=4)', m1: 4, g2: 'মিথেন (CH₄, M=16)', m2: 16, ratio: '২ : ১' },
    { g1: 'হাইড্রোজেন (H₂, M=2)', m1: 2, g2: 'হাইড্রোজেন-সদৃশ (M=18)', m2: 18, ratio: '৩ : ১' },
    { g1: 'মিথেন (CH₄, M=16)', m1: 16, g2: 'সালফার ডাইঅক্সাইড (SO₂, M=64)', m2: 64, ratio: '২ : ১ (২)' },
  ].forEach((gr, idx) => {
    const cleanR = gr.ratio.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একই তাপমাত্রায় ${gr.g1} ও ${gr.g2} গ্যাস অণুগুলোর মূল গড় বর্গবেগের (C_rms) অনুপাত কত?`,
        correct: cleanR,
        distractors: ['১ : ২', '১ : ৪', '২ : ১', '৩ : ১', '৪ : ১', '√২ : ১', '১৬ : ১']
          .filter((x) => x !== cleanR)
          .slice(0, 4),
        explanation: `একই তাপমাত্রায় C_rms ∝ 1/√M; তাই c₁/c₂ = √(M₂/M₁) = √(${toBnDigits(gr.m2)}/${toBnDigits(gr.m1)}) = ${cleanR}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গ্যাসের মূল গড় বর্গবেগ',
      })
    );
  });

  // 4B: Degrees of freedom & gamma & molar specific heat (24 MCQs)
  [
    { gas: 'এক-পরমাণুক গ্যাস (He, Ne, Ar)', f: 3, cv: '3R/2', cp: '5R/2', gamma: '১.৬৭' },
    { gas: 'দ্বি-পরমাণুক গ্যাস (H₂, N₂, O₂) সাধারণ তাপমাত্রায়', f: 5, cv: '5R/2', cp: '7R/2', gamma: '১.৪০' },
    { gas: 'বহু-পরমাণুক অরৈখিক গ্যাস (CH₄, H₂O বাষ্প)', f: 6, cv: '3R', cp: '4R', gamma: '১.৩৩' },
  ].forEach((df, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${df.gas}-এর স্বাধীনতার মাত্রা (Degrees of freedom, f) কত?`,
        correct: toBnDigits(df.f),
        distractors: ['২', '৩', '৪', '৫', '৬', '৭'].filter((x) => x !== toBnDigits(df.f)).slice(0, 4),
        explanation: `${df.gas}-এর স্বাধীনতার মাত্রা f = ${toBnDigits(df.f)}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · স্বাধীনতার মাত্রা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `${df.gas}-এর স্থির আয়তনে মোলার আপেক্ষিক তাপ (C_v) কত?`,
        correct: df.cv,
        distractors: ['R/2', '3R/2', '5R/2', '3R', '7R/2', '4R'].filter((x) => x !== df.cv).slice(0, 4),
        explanation: `C_v = (f/2)R; f = ${toBnDigits(df.f)} বসালে C_v = ${df.cv}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · মোলার আপেক্ষিক তাপ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${df.gas}-এর মোলার আপেক্ষিক তাপদ্বয়ের অনুপাত γ = C_p/C_v কত?`,
        correct: df.gamma,
        distractors: ['১.০০', '১.২৫', '১.৩৩', '১.৪০', '১.৫০', '১.৬৭'].filter((x) => x !== df.gamma).slice(0, 4),
        explanation: `γ = 1 + 2/f = 1 + 2/${toBnDigits(df.f)} ≈ ${df.gamma}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গামা (γ) ধ্রুবক',
      })
    );
  });

  // 4C: Relative Humidity R = (f / F) * 100% (20 MCQs)
  [
    { f: 12, F: 24, R: 50 },
    { f: 15, F: 25, R: 60 },
    { f: 18, F: 24, R: 75 },
    { f: 16, F: 20, R: 80 },
    { f: 14, F: 35, R: 40 },
    { f: 18, F: 30, R: 60 },
    { f: 21, F: 30, R: 70 },
    { f: 27, F: 30, R: 90 },
    { f: 9, F: 20, R: 45 },
    { f: 11, F: 22, R: 50 },
    { f: 17, F: 20, R: 85 },
    { f: 13, F: 20, R: 65 },
  ].forEach((rh, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `কোনো দিনের শিশিরাঙ্কে সম্পৃক্ত জলীয় বাষ্পচাপ ${toBnDigits(rh.f)} mmHg এবং বায়ুর তাপমাত্রায় সম্পৃক্ত জলীয় বাষ্পচাপ ${toBnDigits(rh.F)} mmHg হলে ঐ দিনের আপেক্ষিক আর্দ্রতা কত?`,
        correct: `${toBnDigits(rh.R)}%`,
        distractors: [rh.R - 15, rh.R - 5, rh.R + 10, rh.R + 20]
          .filter((x) => x > 0 && x <= 100 && x !== rh.R)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}%`),
        explanation: `আপেক্ষিক আর্দ্রতা R = (f/F) × ১০০% = (${toBnDigits(rh.f)}/${toBnDigits(rh.F)}) × ১০০% = ${toBnDigits(rh.R)}%।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · আপেক্ষিক আর্দ্রতা',
      })
    );
  });

  // =========================================================================
  // 5. High-Yield Medical Assertion & Conceptual Matrix across Ch 1-10 (~80 MCQs)
  // =========================================================================
  const conceptCards: {
    chapterId: string;
    visualLessonId: string;
    topic: string;
    fact: string;
    pool: string[];
    ref: string;
  }[] = [
    {
      chapterId: 'phys1_ch1_measurement',
      visualLessonId: 'circuits_optics',
      topic: '১ পারসেক (Parsec)',
      fact: '৩.২৬ আলোকবর্ষ বা ৩.০৮ × ১০¹⁶ মিটার',
      pool: ['৯.৪৬ × ১০¹⁵ মিটার', '১.৪৯৬ × ১০¹¹ মিটার', '৩.০৮ × ১০¹² মিটার', '৩.২৬ আলোকবর্ষ বা ৩.০৮ × ১০¹⁶ মিটার'],
      ref: 'অধ্যায় ১ · দূরত্বের একক',
    },
    {
      chapterId: 'phys1_ch2_vector',
      visualLessonId: 'circuits_optics',
      topic: 'সলিডেনয়ডাল (Solenoidal) ভেক্টর ক্ষেত্র',
      fact: 'ডাইভারজেন্স শূন্য (∇ · V = ০)',
      pool: ['কার্ল শূন্য (∇ × V = ০)', 'গ্রেডিয়েন্ট শূন্য (∇φ = ০)', 'ডাইভারজেন্স শূন্য (∇ · V = ০)', 'অবস্থান ভেক্টর শূন্য'],
      ref: 'অধ্যায় ২ · ভেক্টর ক্যালকুলাস',
    },
    {
      chapterId: 'phys1_ch2_vector',
      visualLessonId: 'circuits_optics',
      topic: 'অঘূর্ণনশীল (Irrotational) বা সংরক্ষণশীল ভেক্টর ক্ষেত্র',
      fact: 'কার্ল শূন্য (∇ × V = ০)',
      pool: ['ডাইভারজেন্স শূন্য (∇ · V = ০)', 'কার্ল শূন্য (∇ × V = ০)', 'ল্যাপ্লাসিয়ান অসীম', 'ডট গুণন সর্বোচ্চ'],
      ref: 'অধ্যায় ২ · ভেক্টর ক্যালকুলাস',
    },
    {
      chapterId: 'phys1_ch3_dynamics',
      visualLessonId: 'circuits_optics',
      topic: 'প্রাসের সর্বাধিক অনুভূমিক পাল্লা (R_max)',
      fact: 'নিক্ষেপণ কোণ θ = ৪৫° হলে এবং R_max = u²/g',
      pool: ['θ = ৩০° হলে', 'θ = ৬০° হলে', 'θ = ৯০° হলে', 'নিক্ষেপণ কোণ θ = ৪৫° হলে এবং R_max = u²/g'],
      ref: 'অধ্যায় ৩ · প্রাসের পাল্লা',
    },
    {
      chapterId: 'phys1_ch3_dynamics',
      visualLessonId: 'circuits_optics',
      topic: 'প্রাসের সর্বোচ্চ উচ্চতায় বেগ ও ত্বরণের মধ্যবর্তী কোণ',
      fact: '৯০° (বেগ অনুভূমিক, অভিকর্ষজ ত্বরণ উল্লম্ব)',
      pool: ['০°', '৪৫°', '৯০° (বেগ অনুভূমিক, অভিকর্ষজ ত্বরণ উল্লম্ব)', '১৮০°'],
      ref: 'অধ্যায় ৩ · প্রাসের গতিপথ',
    },
    {
      chapterId: 'phys1_ch4_newtonian',
      visualLessonId: 'circuits_optics',
      topic: 'প্রকৃতির চারটি মৌলিক বলের মধ্যে সবচেয়ে শক্তিশালী বল',
      fact: 'সবল নিউক্লীয় বল (Strong Nuclear Force)',
      pool: ['মহাকর্ষ বল', 'তাড়িতচৌম্বক বল', 'দুর্বল নিউক্লীয় বল', 'সবল নিউক্লীয় বল (Strong Nuclear Force)'],
      ref: 'অধ্যায় ৪ · মৌলিক বল',
    },
    {
      chapterId: 'phys1_ch4_newtonian',
      visualLessonId: 'circuits_optics',
      topic: 'বিটা ক্ষয়ের (Beta decay) জন্য দায়ী মৌলিক বল',
      fact: 'দুর্বল নিউক্লীয় বল (Weak Nuclear Force)',
      pool: ['সবল নিউক্লীয় বল', 'মহাকর্ষ বল', 'তাড়িতচৌম্বক বল', 'দুর্বল নিউক্লীয় বল (Weak Nuclear Force)'],
      ref: 'অধ্যায় ৪ · মৌলিক বল',
    },
    {
      chapterId: 'phys1_ch5_work_energy',
      visualLessonId: 'circuits_optics',
      topic: 'শূন্য কাজের (Zero Work) শর্ত',
      fact: 'বল ও সরণের মধ্যবর্তী কোণ ৯০° অথবা সরণ শূন্য',
      pool: ['কোণ ০° হলে', 'কোণ ৪৫° হলে', 'কোণ ১৮০° হলে', 'বল ও সরণের মধ্যবর্তী কোণ ৯০° অথবা সরণ শূন্য'],
      ref: 'অধ্যায় ৫ · কাজ',
    },
    {
      chapterId: 'phys1_ch5_work_energy',
      visualLessonId: 'circuits_optics',
      topic: '১ কিলোওয়াট-ঘণ্টা (1 kWh)-এর সমতুল্য শক্তি',
      fact: '৩.৬ × ১০⁶ জুল (J)',
      pool: ['৩.৬ × ১০³ জুল', '৩.৬ × ১০⁵ জুল', '৩.৬ × ১০⁶ জুল (J)', '৭.৪৬ × ১০² জুল'],
      ref: 'অধ্যায় ৫ · শক্তির একক',
    },
    {
      chapterId: 'phys1_ch6_gravitation',
      visualLessonId: 'circuits_optics',
      topic: 'ভূ-স্থির উপগ্রহের (Geostationary Satellite) পর্যায়কাল',
      fact: '২৪ ঘণ্টা (পৃথিবীর আহ্নিক গতির সমান)',
      pool: ['১২ ঘণ্টা', '৮৪.৬ মিনিট', '২৪ ঘণ্টা (পৃথিবীর আহ্নিক গতির সমান)', '৩৬৫ দিন'],
      ref: 'অধ্যায় ৬ · কৃত্রিম উপগ্রহ',
    },
    {
      chapterId: 'phys1_ch6_gravitation',
      visualLessonId: 'circuits_optics',
      topic: 'পৃথিবীর কেন্দ্রে অভিকর্ষজ ত্বরণ (g) ও বস্তুর ওজন',
      fact: 'শূন্য (০), তবে ভর অপরিবর্তিত থাকে',
      pool: ['৯.৮ m/s²', 'অসীম', 'ভূপৃষ্ঠের অর্ধেক', 'শূন্য (০), তবে ভর অপরিবর্তিত থাকে'],
      ref: 'অধ্যায় ৬ · কেন্দ্রে g-এর মান',
    },
    {
      chapterId: 'phys1_ch7_matter',
      visualLessonId: 'circuits_optics',
      topic: 'পয়সনের অনুপাত (σ)-এর তাত্ত্বিক সীমা',
      fact: '-১ থেকে +০.৫ (ব্যবহারিক ক্ষেত্রে ০ থেকে ০.৫)',
      pool: ['০ থেকে ১', '-০.৫ থেকে +১', '-১ থেকে +০.৫ (ব্যবহারিক ক্ষেত্রে ০ থেকে ০.৫)', '১ থেকে অসীম'],
      ref: 'অধ্যায় ৭ · পয়সনের অনুপাত',
    },
    {
      chapterId: 'phys1_ch7_matter',
      visualLessonId: 'circuits_optics',
      topic: 'তরলের তাপমাত্রা বৃদ্ধি করলে পৃষ্ঠটান ও সান্দ্রতা',
      fact: 'উভয়ই হ্রাস পায় (গ্যাসের সান্দ্রতা বৃদ্ধি পায়)',
      pool: ['উভয়ই বৃদ্ধি পায়', 'উভয়ই অপরিবর্তিত থাকে', 'পৃষ্ঠটান বাড়ে, সান্দ্রতা কমে', 'উভয়ই হ্রাস পায় (গ্যাসের সান্দ্রতা বৃদ্ধি পায়)'],
      ref: 'অধ্যায় ৭ · তাপমাত্রার প্রভাব',
    },
    {
      chapterId: 'phys1_ch8_periodic_motion',
      visualLessonId: 'circuits_optics',
      topic: 'সেকেন্ড দোলকের (Second Pendulum) কম্পাঙ্ক ও দোলনকাল',
      fact: 'দোলনকাল ২ সেকেন্ড এবং কম্পাঙ্ক ০.৫ Hz',
      pool: ['দোলনকাল ১ s, কম্পাঙ্ক ১ Hz', 'দোলনকাল ২ সেকেন্ড এবং কম্পাঙ্ক ০.৫ Hz', 'দোলনকাল ৪ s, কম্পাঙ্ক ০.২৫ Hz', 'দোলনকাল ০.৫ s, কম্পাঙ্ক ২ Hz'],
      ref: 'অধ্যায় ৮ · সেকেন্ড দোলক',
    },
    {
      chapterId: 'phys1_ch8_periodic_motion',
      visualLessonId: 'circuits_optics',
      topic: 'কৃত্রিম উপগ্রহ বা মহাশূন্যে সরল দোলকের দোলনকাল',
      fact: 'অসীম (∞), কারণ কার্যকর g = ০',
      pool: ['শূন্য (০)', '২ সেকেন্ড', 'পৃথিবীর অর্ধেক', 'অসীম (∞), কারণ কার্যকর g = ০'],
      ref: 'অধ্যায় ৮ · ওজনহীনতায় দোলক',
    },
    {
      chapterId: 'phys1_ch9_waves',
      visualLessonId: 'circuits_optics',
      topic: 'বাতাসে শব্দের বেগের ক্ষেত্রে ল্যাপ্লাসের সংশোধন সূত্র',
      fact: 'v = √(γP/ρ) — রুদ্ধতাপীয় প্রক্রিয়া',
      pool: ['v = √(P/ρ) — সমোষ্ণ প্রক্রিয়া', 'v = √(γP/ρ) — রুদ্ধতাপীয় প্রক্রিয়া', 'v = √(ρ/P)', 'v = γP/ρ'],
      ref: 'অধ্যায় ৯ · শব্দের বেগ',
    },
    {
      chapterId: 'phys1_ch9_waves',
      visualLessonId: 'circuits_optics',
      topic: 'স্থির তরঙ্গের পরপর দুটি নিস্পন্দ (Node) বিন্দুর দূরত্ব',
      fact: 'λ/২ (অর্ধ-তরঙ্গদৈর্ঘ্য)',
      pool: ['λ/৪', 'λ/২ (অর্ধ-তরঙ্গদৈর্ঘ্য)', 'λ', '২λ'],
      ref: 'অধ্যায় ৯ · স্থির তরঙ্গ',
    },
    {
      chapterId: 'phys1_ch10_ideal_gas',
      visualLessonId: 'thermodynamics',
      topic: 'গ্যাসের গড় মুক্ত পথ (Mean Free Path, λ) বনাম ঘনত্ব/চাপ',
      fact: 'ঘনত্ব ও চাপের ব্যস্তানুপাতিক (λ ∝ 1/P)',
      pool: ['চাপের সমানুপাতিক', 'চাপের বর্গের সমানুপাতিক', 'ঘনত্ব ও চাপের ব্যস্তানুপাতিক (λ ∝ 1/P)', 'চাপের ওপর নির্ভর করে না'],
      ref: 'অধ্যায় ১০ · গড় মুক্ত পথ',
    },
    {
      chapterId: 'phys1_ch10_ideal_gas',
      visualLessonId: 'thermodynamics',
      topic: 'বাস্তব গ্যাসের ভ্যান ডার ওয়ালস সমীকরণে চাপ সংশোধন পদ',
      fact: 'an²/V² (আন্তঃআণবিক আকর্ষণের কারণে)',
      pool: ['nb', 'an²/V² (আন্তঃআণবিক আকর্ষণের কারণে)', 'RT/V', 'aV²/n²'],
      ref: 'অধ্যায় ১০ · বাস্তব গ্যাস',
    },
    {
      chapterId: 'phys1_ch10_ideal_gas',
      visualLessonId: 'thermodynamics',
      topic: 'সম্পৃক্ত বাষ্প (Saturated Vapour) কোন সূত্র মেনে চলে না?',
      fact: 'বয়েল ও চার্লসের সূত্র মেনে চলে না',
      pool: ['প্যাসকেলের সূত্র', 'আর্কিমিডিসের সূত্র', 'বয়েল ও চার্লসের সূত্র মেনে চলে না', 'অ্যাভোগাড্রোর সূত্র'],
      ref: 'অধ্যায় ১০ · বাষ্প ও আর্দ্রতা',
    },
  ];

  conceptCards.forEach((c, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: c.chapterId,
        visualLessonId: c.visualLessonId,
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `"${c.topic}" সম্পর্কিত নির্ভুল তথ্য কোনটি?`,
        correct: c.fact,
        distractors: c.pool.filter((x) => x !== c.fact),
        explanation: `${c.topic}: ${c.fact}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${c.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: c.chapterId,
        visualLessonId: c.visualLessonId,
        hscLevel: '11',
        difficulty: 'board',
        question: `নিচের কোন বিষয়টির ক্ষেত্রে "${c.fact}" প্রযোজ্য?`,
        correct: c.topic,
        distractors: conceptCards.map((x) => x.topic).filter((x) => x !== c.topic).slice(0, 4),
        explanation: `${c.fact} হলো "${c.topic}"-এর মূল বৈশিষ্ট্য।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${c.ref}`,
      })
    );
  });

  // =========================================================================
  // 6. Extra Parametric Wave Speed vs Temperature & SHM Energy Ratios (~70 MCQs)
  // =========================================================================
  // 6A: Sound speed vs temperature: v2 = v1 * sqrt(T2/T1) (18 MCQs)
  [
    { v1: 330, t1K: 300, t2K: 1200, v2: 660 },
    { v1: 332, t1K: 273, t2K: 1092, v2: 664 },
    { v1: 300, t1K: 300, t2K: 675, v2: 450 },
    { v1: 340, t1K: 273, t2K: 1092, v2: 680 },
    { v1: 320, t1K: 250, t2K: 1000, v2: 640 },
    { v1: 350, t1K: 300, t2K: 1200, v2: 700 },
    { v1: 280, t1K: 200, t2K: 800, v2: 560 },
    { v1: 360, t1K: 400, t2K: 900, v2: 540 },
    { v1: 330, t1K: 273, t2K: 2457, v2: 990 },
  ].forEach((sv, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(sv.t1K)} K তাপমাত্রায় বাতাসে শব্দের বেগ ${toBnDigits(sv.v1)} m/s হলে ${toBnDigits(sv.t2K)} K তাপমাত্রায় শব্দের বেগ কত m/s হবে?`,
        correct: `${toBnDigits(sv.v2)} m/s`,
        distractors: [sv.v1 * 4, sv.v1, sv.v2 + 100, sv.v2 / 2]
          .filter((x) => x !== sv.v2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `v ∝ √T; তাই v₂ = ${toBnDigits(sv.v1)} × √(${toBnDigits(sv.t2K)}/${toBnDigits(sv.t1K)}) = ${toBnDigits(sv.v2)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তাপমাত্রার সাথে শব্দের বেগ',
      })
    );
  });

  // 6B: SHM Energy ratio KE/PE at x = A/n (16 MCQs)
  [
    { frac: 'A/২', pePct: '২৫%', kePct: '৭৫%', ratioKePe: '৩ : ১' },
    { frac: 'A/√২', pePct: '৫০%', kePct: '৫০%', ratioKePe: '১ : ১' },
    { frac: 'A/৩', pePct: '১১.১১%', kePct: '৮৮.৮৯%', ratioKePe: '৮ : ১' },
    { frac: 'A/৪', pePct: '৬.২৫%', kePct: '৯৩.৭৫%', ratioKePe: '১৫ : ১' },
    { frac: '√৩A/২', pePct: '৭৫%', kePct: '২৫%', ratioKePe: '১ : ৩' },
  ].forEach((en, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `সরল ছন্দিত স্পন্দনরত কণার সরণ x = ${en.frac} হলে গতিশক্তি ও বিভবশক্তির অনুপাত (E_k : E_p) কত হবে?`,
        correct: en.ratioKePe,
        distractors: ['১ : ১', '১ : ৩', '২ : ১', '৩ : ১', '৪ : ১', '৮ : ১', '১৫ : ১'].filter((x) => x !== en.ratioKePe).slice(0, 4),
        explanation: `E_p/E = x²/A² এবং E_k/E = 1 - x²/A²; x = ${en.frac} হলে অনুপাত হয় ${en.ratioKePe}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM-এ শক্তির রূপান্তর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `বিস্তার A বিশিষ্ট SHM-এ কণার সরণ x = ${en.frac} হলে মোট শক্তির শতকরা কত ভাগ বিভবশক্তি হিসেবে সঞ্চিত থাকে?`,
        correct: en.pePct,
        distractors: ['৬.২৫%', '১১.১১%', '২৫%', '৫০%', '৭৫%', '৮৮.৮৯%'].filter((x) => x !== en.pePct).slice(0, 4),
        explanation: `বিভবশক্তি E_p = (x²/A²) × E; তাই x = ${en.frac} বিন্দুতে বিভবশক্তি মোট শক্তির ${en.pePct}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · বিভবশক্তির শতকরা হার',
      })
    );
  });

  // 6C: Gas law P1V1/T1 = P2V2/T2 & isothermal vs adiabatic slope (20 MCQs)
  [
    { p1: 1, v1: 10, t1: 300, p2: 2, t2: 600, v2: 10 },
    { p1: 2, v1: 6, t1: 300, p2: 1, t2: 300, v2: 12 },
    { p1: 1, v1: 8, t1: 300, p2: 2, t2: 300, v2: 4 },
    { p1: 3, v1: 4, t1: 400, p2: 2, t2: 400, v2: 6 },
    { p1: 2, v1: 10, t1: 300, p2: 4, t2: 600, v2: 10 },
    { p1: 1, v1: 12, t1: 200, p2: 3, t2: 400, v2: 8 },
    { p1: 4, v1: 5, t1: 250, p2: 2, t2: 500, v2: 20 },
    { p1: 2, v1: 9, t1: 300, p2: 3, t2: 450, v2: 9 },
  ].forEach((gl, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(gl.p1)} atm চাপে ও ${toBnDigits(gl.t1)} K তাপমাত্রায় একটি গ্যাসের আয়তন ${toBnDigits(gl.v1)} L। চাপ ${toBnDigits(gl.p2)} atm ও তাপমাত্রা ${toBnDigits(gl.t2)} K করলে গ্যাসটির আয়তন কত L হবে?`,
        correct: `${toBnDigits(gl.v2)} L`,
        distractors: [gl.v2 / 2, gl.v2 * 2, gl.v2 + 3, gl.v2 + 7]
          .filter((x) => x > 0 && x !== gl.v2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} L`),
        explanation: `P₁V₁/T₁ = P₂V₂/T₂ => V₂ = (${toBnDigits(gl.p1)}×${toBnDigits(gl.v1)}×${toBnDigits(gl.t2)})/(${toBnDigits(gl.t1)}×${toBnDigits(gl.p2)}) = ${toBnDigits(gl.v2)} L।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · আদর্শ গ্যাসের সমন্বয় সূত্র',
      })
    );
  });

  // 6D: Beat frequency & tuning fork (16 MCQs)
  [
    { f1: 256, n: 4, waxF2: 260, fileF2: 252 },
    { f1: 320, n: 5, waxF2: 325, fileF2: 315 },
    { f1: 400, n: 6, waxF2: 406, fileF2: 394 },
    { f1: 480, n: 4, waxF2: 484, fileF2: 476 },
    { f1: 512, n: 8, waxF2: 520, fileF2: 504 },
    { f1: 250, n: 5, waxF2: 255, fileF2: 245 },
    { f1: 384, n: 6, waxF2: 390, fileF2: 378 },
    { f1: 440, n: 4, waxF2: 444, fileF2: 436 },
  ].forEach((bt, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি অজানা সুর-শলাকা A-কে ${toBnDigits(bt.f1)} Hz কম্পাঙ্কের শলাকা B-এর সাথে একত্রে শব্দায়িত করলে প্রতি সেকেন্ডে ${toBnDigits(bt.n)}টি বিট উৎপন্ন হয়। A-এর বাহুতে সামান্য মোম লাগালে বিট সংখ্যা কমে যায়; তবে A-এর মূল কম্পাঙ্ক কত Hz ছিল?`,
        correct: `${toBnDigits(bt.waxF2)} Hz`,
        distractors: [bt.fileF2, bt.f1, bt.f1 + bt.n * 2, bt.f1 - bt.n * 2].map((x) => `${toBnDigits(x)} Hz`),
        explanation: `মোম লাগালে ভর বাড়ে তাই কম্পাঙ্ক কমে। বিট সংখ্যা কমায় A-এর কম্পাঙ্ক B-এর চেয়ে বেশি ছিল; অর্থাৎ f_A = ${toBnDigits(bt.f1)} + ${toBnDigits(bt.n)} = ${toBnDigits(bt.waxF2)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · বিট ও সুর-শলাকা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `সুর-শলাকা P ও ${toBnDigits(bt.f1)} Hz-এর Q একসাথে বাজালে সেকেন্ডে ${toBnDigits(bt.n)}টি বিট শোনা যায়। P-কে সামান্য ঘষে দিলে বিট সংখ্যা কমে; তবে P-এর প্রাথমিক কম্পাঙ্ক কত Hz?`,
        correct: `${toBnDigits(bt.fileF2)} Hz`,
        distractors: [bt.waxF2, bt.f1, bt.f1 + bt.n * 2, bt.f1 - bt.n * 2].map((x) => `${toBnDigits(x)} Hz`),
        explanation: `ঘষে দিলে ভর কমে তাই কম্পাঙ্ক বাড়ে। বিট সংখ্যা কমায় P-এর কম্পাঙ্ক Q-এর চেয়ে কম ছিল; অর্থাৎ f_P = ${toBnDigits(bt.f1)} - ${toBnDigits(bt.n)} = ${toBnDigits(bt.fileF2)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · বিট নির্ণয়',
      })
    );
  });

  return list;
}
