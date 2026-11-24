import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredF(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sf_${String(seq++).padStart(4, '0')}`;

  // 1. Gun Recoil Velocity & Explosion Momentum Conservation (Ch 4, ~25 MCQs)
  const gunCases = [
    { mGun: 5, mBul: 0.02, vBul: 500, vGun: 2 },
    { mGun: 4, mBul: 0.01, vBul: 400, vGun: 1 },
    { mGun: 2, mBul: 0.01, vBul: 600, vGun: 3 },
    { mGun: 6, mBul: 0.03, vBul: 400, vGun: 2 },
    { mGun: 10, mBul: 0.05, vBul: 300, vGun: 1.5 },
    { mGun: 5, mBul: 0.05, vBul: 250, vGun: 2.5 },
    { mGun: 8, mBul: 0.02, vBul: 800, vGun: 2 },
    { mGun: 3, mBul: 0.015, vBul: 400, vGun: 2 },
  ];
  gunCases.forEach((gc, i) => {
    const mBulG = Math.round(gc.mBul * 1000);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(gc.mGun)} kg ভরের একটি বন্দুক থেকে ${toBnDigits(mBulG)} g ভরের একটি গুলি ${toBnDigits(gc.vBul)} m/s বেগে ছোড়া হলে বন্দুকের পশ্চাৎবেগ (Recoil velocity) কত হবে?`,
        correct: `${toBnDigits(gc.vGun)} m/s`,
        distractors: [0.5, 1, 1.5, 2, 2.5, 3, 4, 5].filter((x) => x !== gc.vGun).slice(0, 4).map((x) => `${toBnDigits(x)} m/s`),
        explanation: `ভরবেগের সংরক্ষণশীলতা অনুসারে M V = m v ⇒ V = (${toBnDigits(gc.mBul)} × ${toBnDigits(gc.vBul)}) / ${toBnDigits(gc.mGun)} = ${toBnDigits(gc.vGun)} m/s (বিপরীত দিকে)।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · বন্দুকের পশ্চাৎবেগ',
      })
    );
  });

  // 2. Moment of Inertia Calculations for Shapes (Ch 4, ~36 MCQs)
  const moiShapes = [
    { shape: 'সুষম রিং বা ফাঁপা সিলিন্ডার (অক্ষ কেন্দ্রে ও লম্ব)', formula: 'I = M R²', cases: [{ m: 2, r: 0.5, val: 0.5 }, { m: 4, r: 1, val: 4 }, { m: 5, r: 0.4, val: 0.8 }] },
    { shape: 'সুষম চাকতি বা নিরেট সিলিন্ডার (অক্ষ কেন্দ্রে ও লম্ব)', formula: 'I = ½ M R²', cases: [{ m: 4, r: 1, val: 2 }, { m: 8, r: 0.5, val: 1 }, { m: 10, r: 0.4, val: 0.8 }] },
    { shape: 'নিরেট গোলক (ব্যাস বরাবর)', formula: 'I = ⅖ M R²', cases: [{ m: 5, r: 1, val: 2 }, { m: 10, r: 0.5, val: 1 }, { m: 2.5, r: 2, val: 4 }] },
    { shape: 'সরু ও সুষম দণ্ড (ভরকেন্দ্রের মধ্য দিয়ে ও দৈর্ঘ্যের সাথে লম্ব)', formula: 'I = ¹⁄₁₂ M L²', cases: [{ m: 6, r: 2, val: 2 }, { m: 12, r: 1, val: 1 }, { m: 3, r: 2, val: 1 }] },
    { shape: 'সরু ও সুষম দণ্ড (এক প্রান্ত দিয়ে ও দৈর্ঘ্যের সাথে লম্ব)', formula: 'I = ⅓ M L²', cases: [{ m: 3, r: 2, val: 4 }, { m: 6, r: 1, val: 2 }, { m: 12, r: 0.5, val: 1 }] },
  ];
  moiShapes.forEach((ms) => {
    ms.cases.forEach((cs, idx) => {
      const lenLabel = ms.shape.includes('দণ্ড') ? `দৈর্ঘ্য L = ${toBnDigits(cs.r)} m` : `ব্যাসার্ধ R = ${toBnDigits(cs.r)} m`;
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch4_newtonian',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: idx % 2 === 0 ? 'medical' : 'dental',
          question: `${toBnDigits(cs.m)} kg ভর ও ${lenLabel} বিশিষ্ট একটি "${ms.shape}"-এর নির্ধারিত অক্ষের সাপেক্ষে জড়তার ভ্রামক (I) কত kg·m²?`,
          correct: `${toBnDigits(cs.val)} kg·m²`,
          distractors: [0.25, 0.4, 0.5, 0.8, 1, 1.5, 2, 3, 4, 6].filter((x) => x !== cs.val).slice(0, 4).map((x) => `${toBnDigits(x)} kg·m²`),
          explanation: `${ms.formula} সূত্র ব্যবহার করে পাওয়া যায় I = ${toBnDigits(cs.val)} kg·m²।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · জড়তার ভ্রামক গণনা',
        })
      );
    });
  });

  // 3. Centripetal Force, Banked Road & Friction Numericals (Ch 4, ~30 MCQs)
  const bankCases = [
    { v: 10, r: 10, g: 10, ang: '৪৫°' },
    { v: 20, r: 40, g: 10, ang: '৪৫° (২)' },
    { v: 10, r: 17.32, g: 10, ang: '৩০°' },
    { v: 20, r: 69.28, g: 10, ang: '৩০° (২)' },
    { v: 30, r: 52, g: 10, ang: '৬০°' },
  ];
  bankCases.forEach((bc, idx) => {
    const cleanAng = bc.ang.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(bc.r)} m ব্যাসার্ধের একটি রাস্তার বাঁকে (প্রায় g = ১০ m/s²) ঘর্ষণ ছাড়াই ${toBnDigits(bc.v)} m/s বেগে নিরাপদে বাঁক নিতে রাস্তার ব্যাংকিং কোণ প্রায় কত ডিগ্রি হতে হবে (দৃশ্যপট-#${toBnDigits(idx + 1)})?`,
        correct: cleanAng,
        distractors: ['১৫°', '৩০°', '৪৫°', '৬০°', '৭৫°'].filter((x) => x !== cleanAng),
        explanation: `tan θ = v² / (rg) অনুযায়ী θ ≈ ${cleanAng}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ব্যাংকিং কোণ',
      })
    );
  });

  // Lift apparent weight numericals (Ch 4)
  const liftCases = [
    { m: 60, dir: 'ওপরে উঠলে', a: 2, ans: 720 },
    { m: 60, dir: 'নিচে নামলে', a: 2, ans: 480 },
    { m: 50, dir: 'ওপরে উঠলে', a: 4, ans: 700 },
    { m: 50, dir: 'নিচে নামলে', a: 4, ans: 300 },
    { m: 80, dir: 'ওপরে উঠলে', a: 2.5, ans: 1000 },
    { m: 80, dir: 'নিচে নামলে', a: 2.5, ans: 600 },
    { m: 70, dir: 'দড়ি ছিঁড়ে মুক্তভাবে নিচে পড়লে (a = g)', a: 10, ans: 0 },
  ];
  liftCases.forEach((lc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(lc.m)} kg ভরের এক ব্যক্তি লিফটে দাঁড়িয়ে থাকলে এবং লিফটটি ${toBnDigits(lc.a)} m/s² ত্বরণে ${lc.dir} (g = ১০ m/s²) ব্যক্তির আপাত ওজন কত নিউটন?`,
        correct: `${toBnDigits(lc.ans)} N`,
        distractors: [0, 300, 480, 500, 600, 700, 720, 800, 1000].filter((x) => x !== lc.ans).slice(0, 4).map((x) => `${toBnDigits(x)} N`),
        explanation: `ওপরে উঠলে R = m(g + a) ও নিচে নামলে R = m(g − a); প্রদত্ত ক্ষেত্রে R = ${toBnDigits(lc.ans)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · লিফটে আপাত ওজন',
      })
    );
  });

  // 4. Work, Spring Potential Energy, Power & Pump Efficiency Numericals (Ch 5, ~75 MCQs)
  const workCases = [
    { f: 20, s: 5, ang: 60, w: 50 },
    { f: 40, s: 10, ang: 60, w: 200 },
    { f: 50, s: 8, ang: 0, w: 400 },
    { f: 30, s: 10, ang: 90, w: 0 },
    { f: 100, s: 4, ang: 180, w: -400 },
    { f: 10, s: 6, ang: 60, w: 30 },
  ];
  workCases.forEach((wc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(wc.f)} N ধ্রুব বল প্রয়োগে কোনো বস্তুর ${toBnDigits(wc.s)} m সরণ বলের দিকের সাথে ${toBnDigits(wc.ang)}° কোণে ঘটলে কৃতকাজ কত?`,
        correct: `${toBnDigits(wc.w)} J`,
        distractors: [-400, 0, 30, 50, 100, 200, 300, 400].filter((x) => x !== wc.w).slice(0, 4).map((x) => `${toBnDigits(x)} J`),
        explanation: `W = F s cos θ = ${toBnDigits(wc.f)} × ${toBnDigits(wc.s)} × cos ${toBnDigits(wc.ang)}° = ${toBnDigits(wc.w)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · কাজ নির্ণয়',
      })
    );
  });

  const springWork = [
    { k: 100, x: 0.2, u: 2 },
    { k: 200, x: 0.1, u: 1 },
    { k: 400, x: 0.5, u: 50 },
    { k: 500, x: 0.2, u: 10 },
    { k: 1000, x: 0.1, u: 5 },
    { k: 800, x: 0.25, u: 25 },
  ];
  springWork.forEach((sw, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(sw.k)} N/m স্প্রিং ধ্রুবকবিশিষ্ট একটি স্প্রিংকে সাম্যাবস্থা থেকে ${toBnDigits(sw.x)} m প্রসারিত করতে কত জুল কাজ করতে হবে?`,
        correct: `${toBnDigits(sw.u)} J`,
        distractors: [1, 2, 4, 5, 10, 20, 25, 50].filter((x) => x !== sw.u).slice(0, 4).map((x) => `${toBnDigits(x)} J`),
        explanation: `W = ½ k x² = ০.৫ × ${toBnDigits(sw.k)} × (${toBnDigits(sw.x)})² = ${toBnDigits(sw.u)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · স্প্রিংয়ের সঞ্চিত শক্তি',
      })
    );
  });

  const pumpCases = [
    { m: 1000, h: 20, t: 20, pW: 10000, hp: '১০ kW' },
    { m: 500, h: 30, t: 15, pW: 10000, hp: '১০ kW (২)' },
    { m: 2000, h: 15, t: 100, pW: 3000, hp: '৩ kW' },
    { m: 600, h: 25, t: 30, pW: 5000, hp: '৫ kW' },
    { m: 1200, h: 10, t: 60, pW: 2000, hp: '২ kW' },
    { m: 3000, h: 20, t: 60, pW: 10000, hp: '১০ kW (৩)' },
  ];
  pumpCases.forEach((pm, idx) => {
    const cleanHp = pm.hp.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি মোটর পাম্প (ঘটনা-#${toBnDigits(idx + 1)}) ${toBnDigits(pm.t)} সেকেন্ডে ${toBnDigits(pm.h)} m গভীরতা থেকে ${toBnDigits(pm.m)} kg পানি তুলতে পারলে (g = ১০ m/s²) পাম্পটির কার্যকর ক্ষমতা কত?`,
        correct: cleanHp,
        distractors: ['১ kW', '২ kW', '৩ kW', '৫ kW', '৮ kW', '১০ kW', '১৫ kW'].filter((x) => x !== cleanHp).slice(0, 4),
        explanation: `P = mgh / t = (${toBnDigits(pm.m)} × ১০ × ${toBnDigits(pm.h)}) / ${toBnDigits(pm.t)} = ${toBnDigits(pm.pW)} W = ${cleanHp}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · পাম্পের ক্ষমতা',
      })
    );
  });

  // Momentum vs KE % change (Ch 5)
  const kePctCases = [
    { pPct: 10, kePct: 21 },
    { pPct: 20, kePct: 44 },
    { pPct: 30, kePct: 69 },
    { pPct: 50, kePct: 125 },
    { pPct: 100, kePct: 300 },
    { pPct: 200, kePct: 800 },
  ];
  kePctCases.forEach((kp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `স্থির ভরের কোনো গতিশীল বস্তুর রৈখিক ভরবেগ ${toBnDigits(kp.pPct)}% বৃদ্ধি করলে এর গতিশক্তি শতকরা কত বৃদ্ধি পাবে?`,
        correct: `${toBnDigits(kp.kePct)}%`,
        distractors: [10, 20, 21, 40, 44, 60, 69, 100, 125, 200, 300, 400, 800].filter((x) => x !== kp.kePct).slice(0, 4).map((x) => `${toBnDigits(x)}%`),
        explanation: `KE ∝ p² ⇒ নতুন KE = (১ + ${toBnDigits(kp.pPct)}/১০০)² × KE ⇒ বৃদ্ধি = ${toBnDigits(kp.kePct)}%।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · ভরবেগ ও গতিশক্তি',
      })
    );
  });

  // 5. Gravitation: g Variation, Escape Velocity & Kepler T² ∝ r³ (Ch 6, ~75 MCQs)
  const gVarCases = [
    { loc: 'ভূপৃষ্ঠ থেকে h = R উচ্চতায়', ratio: 'g/4 (২৫%)', note: 'g′ = g[R/(R+R)]² = g/৪' },
    { loc: 'ভূপৃষ্ঠ থেকে h = 2R উচ্চতায়', ratio: 'g/9 (১১.১%)', note: 'g′ = g[R/(3R)]² = g/৯' },
    { loc: 'ভূপৃষ্ঠ থেকে h = 3R উচ্চতায়', ratio: 'g/16 (৬.২৫%)', note: 'g′ = g[R/(4R)]² = g/১৬' },
    { loc: 'ভূপৃষ্ঠ থেকে h = R/2 উচ্চতায়', ratio: '4g/9 (৪৪.৪%)', note: 'g′ = g[2/3]² = ৪g/৯' },
    { loc: 'ভূগর্ভে d = R/2 গভীরতায়', ratio: 'g/2 (৫০%)', note: 'g′ = g(১ − ১/২) = g/২' },
    { loc: 'ভূগর্ভে d = R/4 গভীরতায়', ratio: '3g/4 (৭৫%)', note: 'g′ = g(১ − ১/৪) = ৩g/৪' },
    { loc: 'ভূগর্ভে d = 3R/4 গভীরতায়', ratio: 'g/4 (২৫%) (২)', note: 'g′ = g(১ − ৩/৪) = g/৪' },
    { loc: 'পৃথিবীর কেন্দ্রে (d = R)', ratio: '০ (শূন্য)', note: 'কেন্দ্রে সব দিকের আকর্ষণ সমান ও বিপরীত বলে g′ = ০' },
  ];
  const gRatioPool = ['০ (শূন্য)', 'g/2 (৫০%)', 'g/4 (২৫%)', '3g/4 (৭৫%)', '4g/9 (৪৪.৪%)', 'g/9 (১১.১%)', 'g/16 (৬.২৫%)'];
  gVarCases.forEach((gv, i) => {
    const cleanR = gv.ratio.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${gv.loc} (যেখানে R পৃথিবীর ব্যাসার্ধ) অভিকর্ষজ ত্বরণ g′-এর মান ভূপৃষ্ঠের g-এর কত অংশ?`,
        correct: cleanR,
        distractors: gRatioPool.filter((x) => x !== cleanR).slice(0, 4),
        explanation: `${gv.note}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · অভিকর্ষজ ত্বরণের পরিবর্তন',
      })
    );
  });

  const escapePlanets = [
    { desc: 'ভর পৃথিবীর সমান কিন্তু ব্যাসার্ধ পৃথিবীর এক-চতুর্থাংশ (R/4)', mult: '২ গুণ (২২.৪ km/s)' },
    { desc: 'ভর পৃথিবীর দ্বিগুণ (2M) কিন্তু ব্যাসার্ধ পৃথিবীর অর্ধেক (R/2)', mult: '২ গুণ (২২.৪ km/s)' },
    { desc: 'ভর পৃথিবীর ৮ গুণ (8M) এবং ব্যাসার্ধ পৃথিবীর দ্বিগুণ (2R)', mult: '২ গুণ (২২.৪ km/s)' },
    { desc: 'ভর পৃথিবীর ৪ গুণ (4M) এবং ব্যাসার্ধ পৃথিবীর সমান (R)', mult: '২ গুণ (২২.৪ km/s)' },
    { desc: 'ঘনত্ব পৃথিবীর সমান (ρ) এবং ব্যাসার্ধ পৃথিবীর দ্বিগুণ (2R)', mult: '২ গুণ (২২.৪ km/s)' },
    { desc: 'অভিকর্ষজ ত্বরণ g পৃথিবীর ৪ গুণ এবং ব্যাসার্ধ R পৃথিবীর সমান', mult: '২ গুণ (২২.৪ km/s)' },
    { desc: 'ভর পৃথিবীর সমান কিন্তু ব্যাসার্ধ পৃথিবীর ৪ গুণ (4R)', mult: 'অর্ধেক (৫.৬ km/s)' },
    { desc: 'ভর পৃথিবীর ৯ গুণ (9M) এবং ব্যাসার্ধ পৃথিবীর সমান (R)', mult: '৩ গুণ (৩৩.৬ km/s)' },
  ];
  escapePlanets.forEach((ep, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `কোনো কাল্পনিক গ্রহের ${ep.desc} হলে ওই গ্রহের মুক্তিবেগ পৃথিবীর মুক্তিবেগের (১১.২ km/s) কত গুণ হবে?`,
        correct: ep.mult,
        distractors: ['অর্ধেক (৫.৬ km/s)', '√২ গুণ (১৫.৮ km/s)', '৩ গুণ (৩৩.৬ km/s)', '৪ গুণ (৪৪.৮ km/s)', 'সমান (১১.২ km/s)'].filter((x) => x !== ep.mult),
        explanation: `v_e = √(2GM/R) = √(2gR) = R√(8πGρ/3) সম্পর্ক অনুযায়ী মান হয় ${ep.mult}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · গ্রহের মুক্তিবেগ',
      })
    );
  });

  const keplerRatios = [
    { rRatio: '৪ : ১', tRatio: '৮ : ১' },
    { rRatio: '৯ : ১', tRatio: '২৭ : ১' },
    { rRatio: '১ : ৪', tRatio: '১ : ৮' },
    { rRatio: '১ : ৯', tRatio: '১ : ২৭' },
    { rRatio: '১৬ : ১', tRatio: '৬৪ : ১' },
    { rRatio: '২ : ১', tRatio: '২√২ : ১' },
  ];
  keplerRatios.forEach((kr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `সূর্যের চারদিকে ঘূর্ণায়মান দুটি গ্রহের কক্ষপথের গড় ব্যাসার্ধের অনুপাত ${kr.rRatio} হলে এদের পর্যায়কালের অনুপাত (T₁ : T₂) কত?`,
        correct: kr.tRatio,
        distractors: ['৪ : ১', '৮ : ১', '২৭ : ১', '১ : ৮', '১ : ২৭', '৬৪ : ১', '২√২ : ১', '১৬ : ১'].filter((x) => x !== kr.tRatio).slice(0, 4),
        explanation: `কেপলারের ৩য় সূত্র T² ∝ r³ ⇒ T₁/T₂ = (r₁/r₂)^(3/2) = ${kr.tRatio}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · কেপলারের ৩য় সূত্র',
      })
    );
  });

  // 6. Ch 4-6 Conceptual Medical & Dental Matrix (~120 MCQs via 2-way Q↔A pairs)
  const ch4to6Pairs: Array<{ ch: string; q: string; a: string; ref: string }> = [
    { ch: 'phys1_ch4_newtonian', q: 'সবল নিউক্লীয়, তাড়িতচৌম্বক, দুর্বল নিউক্লীয় ও মহাকর্ষ বলের মধ্যে আপেক্ষিক তীব্রতার ক্রম কোনটি', a: 'সবল নিউক্লীয় (১) > তাড়িতচৌম্বক (১০⁻²) > দুর্বল নিউক্লীয় (১০⁻¹¹) > মহাকর্ষ (১০⁻³⁹)', ref: 'অধ্যায় ৪ · ৪টি মৌলিক বল' },
    { ch: 'phys1_ch4_newtonian', q: 'সবল নিউক্লীয় বল ও তাড়িতচৌম্বক বলের বিনিময়কারী কণা (Exchange Particle) যথাক্রমে কী কী', a: 'গ্লুওন (বা পাই-মেসন) ও ফোটন', ref: 'অধ্যায় ৪ · বলের বাহক কণা' },
    { ch: 'phys1_ch4_newtonian', q: 'দুর্বল নিউক্লীয় বলের জন্য দায়ী বিনিময় কণা কোনটি এবং এটি কোন ক্ষয় প্রক্রিয়ায় কাজ করে', a: 'W⁺, W⁻ ও Z⁰ বোসন — যা বিটা (β) ক্ষয়ে ক্রিয়াশীল', ref: 'অধ্যায় ৪ · দুর্বল নিউক্লীয় বল' },
    { ch: 'phys1_ch4_newtonian', q: 'নিজের হাত দুদিকে মেলে ঘূর্ণন চেয়ারে বসা কোনো ব্যক্তি হাত দুটি বুকের কাছে গুটিয়ে আনলে কৌণিক বেগ বাড়ে কেন', a: 'জড়তার ভ্রামক I কমে যাওয়ায় কৌণিক ভরবেগ L = Iω ধ্রুব রাখতে ω বেড়ে যায়', ref: 'অধ্যায় ৪ · কৌণিক ভরবেগ সংরক্ষণ' },
    { ch: 'phys1_ch4_newtonian', q: 'আহ্নিক গতির প্রভাবে মেরু অঞ্চলের বরফ সম্পূর্ণ গলে বিষুবীয় সাগরে জমলে পৃথিবীর দিনের দৈর্ঘ্যের কী হবে', a: 'দিনের দৈর্ঘ্য বেড়ে ২৪ ঘণ্টার বেশি হবে (ঘূর্ণন অক্ষ থেকে ভর দূরে যাওয়ায় I ও T বাড়বে)', ref: 'অধ্যায় ৪ · পৃথিবীর I ও দিন' },
    { ch: 'phys1_ch4_newtonian', q: 'ঘর্ষণ গুণাঙ্ক μ_s ও ঘর্ষণ কোণ θ_s-এর মধ্যকার সঠিক গাণিতিক সম্পর্ক কী', a: 'μ_s = tan θ_s (স্থিতি কোণের ট্যানজেন্ট)', ref: 'অধ্যায় ৪ · ঘর্ষণ কোণ' },
    { ch: 'phys1_ch4_newtonian', q: 'একটি বস্তুকে ধ্রুব বেগে চালাতে যে গতি ঘর্ষণ বলের বিরুদ্ধে ধাক্কা দিতে হয় তা স্থিতি ঘর্ষণের সর্বোচ্চ মানের চেয়ে কেমন', a: 'সর্বদা সামান্য কম (অর্থাৎ f_k < f_s(max))', ref: 'অধ্যায় ৪ · ঘর্ষণ তুলনা' },
    { ch: 'phys1_ch5_work_energy', q: 'একটি বস্তুকে স্প্রিং-সহ প্রসারিত করলে কৃতকাজ প্রসারণের কীভাবে অনুপাতে পরিবর্তিত হয়', a: 'প্রসারণের বর্গের সমানুপাতিক (W ∝ x²)', ref: 'অধ্যায় ৫ · স্প্রিংয়ের কাজ' },
    { ch: 'phys1_ch5_work_energy', q: 'এক অশ্বক্ষমতা (১ HP) সমান কত ওয়াট এবং মেট্রিক অশ্বক্ষমতা কত ওয়াট', a: 'ব্রিটিশ/SI ১ HP = ৭৪৬ W (মেট্রিক HP ≈ ৭৩৫.৫ W)', ref: 'অধ্যায় ৫ · ক্ষমতা একক' },
    { ch: 'phys1_ch5_work_energy', q: 'গতিশীল ইলেকট্রনের শক্তি প্রকাশের ক্ষুদ্র একক ১ ইলেকট্রন-ভোল্ট (১ eV) সমান কত জুল', a: '১.৬ × ১০⁻¹⁹ J', ref: 'অধ্যায় ৫ · শক্তির একক' },
    { ch: 'phys1_ch5_work_energy', q: 'বৈদ্যুতিক বিলের ১ ইউনিট বা ১ কিলোওয়াট-ঘণ্টা (1 kWh) সমান কত মেগাজুল', a: '৩.৬ × ১০⁶ J (৩.৬ MJ)', ref: 'অধ্যায় ৫ · কিলোওয়াট-ঘণ্টা' },
    { ch: 'phys1_ch5_work_energy', q: 'কোনো বস্তুর রৈখিক ভরবেগ ও গতিশক্তির অনুপাত (p / KE) যদি ২ হয় তবে বস্তুটির বেগ কত', a: '১ m/s (কারণ p/KE = mv / (½mv²) = 2/v = ২ ⇒ v = ১ m/s)', ref: 'অধ্যায় ৫ · p ও KE অনুপাত' },
    { ch: 'phys1_ch5_work_energy', q: 'ঘড়ির কাঁটা ঘোরার সময় দম দেওয়া স্প্রিংয়ে কোন শক্তি কোন শক্তিতে রূপান্তরিত হয়', a: 'স্থিতিস্থাপক বিভবশক্তি ধীরে ধীরে যান্ত্রিক গতিশক্তিতে', ref: 'অধ্যায় ৫ · শক্তি রূপান্তর' },
    { ch: 'phys1_ch6_gravitation', q: 'হেনরি ক্যাভেন্ডিশ কোন যন্ত্রের সাহায্যে প্রথম সর্বজনীন মহাকর্ষীয় ধ্রুবক G-এর মান পরিমাপ করেন', a: 'টর্শন ব্যালেন্স (মোচড় তুলা যন্ত্র, ১৭৯৮)', ref: 'অধ্যায় ৬ · G নির্ণয়' },
    { ch: 'phys1_ch6_gravitation', q: 'ভূ-পৃষ্ঠের কোন স্থানে অভিকর্ষজ ত্বরণ g-এর মান সর্বাধিক এবং কোন স্থানে সর্বনিম্ন', a: 'মেরু অঞ্চলে সর্বাধিক (~৯.৮৩২ m/s²) এবং বিষুব অঞ্চলে সর্বনিম্ন (~৯.৭৮০ m/s²)', ref: 'অধ্যায় ৬ · অক্ষাংশ ভেদে g' },
    { ch: 'phys1_ch6_gravitation', q: 'কোন অক্ষাংশে পৃথিবীর আহ্নিক গতির কারণে g-এর মানের কোনো পরিবর্তন ঘটে না', a: 'মেরু অঞ্চলে (λ = ৯০° হওয়ায় cos ৯০° = ০)', ref: 'অধ্যায় ৬ · মেরুতে আহ্নিক প্রভাব' },
    { ch: 'phys1_ch6_gravitation', q: 'দুটি উপগ্রহ পৃথিবীর চারদিকে r ও 2r ব্যাসার্ধের কক্ষে ঘুরলে তাদের কক্ষীয় বেগের অনুপাত v₁ : v₂ কত', a: '√২ : ১ (কাছের উপগ্রহ দ্রুত চলে)', ref: 'অধ্যায় ৬ · কক্ষীয় বেগ' },
    { ch: 'phys1_ch6_gravitation', q: 'মহাকাশ স্টেশনে কোনো তরল ঢেলে দিলে বা গ্লাস উল্টালে পানি ফোঁটা আকারে ভাসে ও পতনশীল হয় না কেন', a: 'উপগ্রহের ভেতর কার্যকর অভিকর্ষ বা প্রতিক্রিয়া শূন্য (g_eff = ০) হওয়ায় প্লবতা থাকে না', ref: 'অধ্যায় ৬ · ভারহীনতা' },
    { ch: 'phys1_ch6_gravitation', q: 'পৃথিবী হঠাৎ তার কক্ষপথে ঘোরা বন্ধ করে স্থির হয়ে গেলে এবং নিজ অক্ষের ঘূর্ণন থাকলে কী হবে', a: 'সূর্যের মহাকর্ষে পৃথিবী সোজা সূর্যের বুকে আছড়ে পড়বে (আহ্নিক গতি বন্ধ হলে বিষুবে ওজন সামান্য বাড়বে)', ref: 'অধ্যায় ৬ · কক্ষীয় স্থায়িত্ব' },
    { ch: 'phys1_ch6_gravitation', q: 'ভূ-পৃষ্ঠের কাছাকাছি ঘূর্ণায়মান কৃত্রিম উপগ্রহের আবর্তনকাল ৮৪.৬ মিনিট; একে কী ধ্রুবক রাশি দ্বারা প্রকাশ করা যায়', a: 'T = √(3π / (Gρ)) — অর্থাৎ এটি কেবল গ্রহের গড় ঘনত্ব ρ-এর ওপর নির্ভরশীল', ref: 'অধ্যায় ৬ · উপগ্রহ ও ঘনত্ব' },
  ];
  ch4to6Pairs.forEach((cp, i) => {
    const others = ch4to6Pairs.filter((x) => x.q !== cp.q);
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
        question: `নিচের কোন পরিস্থিতি বা নিয়মের সরাসরি ফলাফল হলো "${cp.a}"?`,
        correct: cp.q,
        distractors: others.slice((i + 6) % 12, ((i + 6) % 12) + 4).map((x) => x.q),
        explanation: `"${cp.a}" সিদ্ধান্তটি প্রযোজ্য হয়: ${cp.q} ক্ষেত্রে।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${cp.ref}`,
      })
    );
  });

  // 7. Extra Wire Stretching / Cutting / Collision / Impulse quick combinations (~60 MCQs)
  const impulseMass = [
    { m: 2, u: 10, v: 25, imp: 30 },
    { m: 4, u: 5, v: 20, imp: 60 },
    { m: 0.5, u: 10, v: -10, imp: 10 },
    { m: 0.2, u: 20, v: -30, imp: 10 },
    { m: 3, u: 0, v: 15, imp: 45 },
    { m: 5, u: 12, v: 4, imp: 40 },
  ];
  impulseMass.forEach((im, idx) => {
    const dirNote = im.v < 0 ? 'বিপরীত দিকে ফিরে আসে' : 'একই দিকে চলতে থাকে';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(im.m)} kg ভরের একটি বস্তু (ঘটনা-#${toBnDigits(idx + 1)}) ${toBnDigits(im.u)} m/s বেগে চলার পর বল প্রয়োগে এর বেগ ${toBnDigits(Math.abs(im.v))} m/s হয়ে ${dirNote}। বস্তুটির ওপর প্রযুক্ত বলের ঘাতের মান কত?`,
        correct: `${toBnDigits(im.imp)} N·s`,
        distractors: [5, 10, 15, 20, 30, 40, 45, 60, 80].filter((x) => x !== im.imp).slice(0, 4).map((x) => `${toBnDigits(x)} N·s`),
        explanation: `বলের ঘাতের মান J = m|v − u| = ${toBnDigits(im.m)} × |${toBnDigits(im.v)} − ${toBnDigits(im.u)}| = ${toBnDigits(im.imp)} N·s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ভরবেগ ও বলের ঘাত',
      })
    );
  });

  // Work-energy braking & elevation numericals
  const workElev = [
    { m: 50, h: 10, w: 5000 },
    { m: 40, h: 15, w: 6000 },
    { m: 80, h: 5, w: 4000 },
    { m: 25, h: 12, w: 3000 },
    { m: 100, h: 8, w: 8000 },
    { m: 60, h: 20, w: 12000 },
  ];
  workElev.forEach((we, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(we.m)} kg ভরের এক ব্যক্তি ${toBnDigits(we.h)} m উঁচু সিঁড়ি দিয়ে ওপরে উঠলে (g = ১০ m/s²) অভিকর্ষ বলের বিরুদ্ধে কৃতকাজ কত?`,
        correct: `${toBnDigits(we.w)} J`,
        distractors: [2000, 3000, 4000, 5000, 6000, 8000, 12000].filter((x) => x !== we.w).slice(0, 4).map((x) => `${toBnDigits(x)} J`),
        explanation: `অভিকর্ষের বিরুদ্ধে কৃতকাজ W = mgh = ${toBnDigits(we.m)} × ১০ × ${toBnDigits(we.h)} = ${toBnDigits(we.w)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · বিভবশক্তি ও কাজ',
      })
    );
  });

  return list;
}
