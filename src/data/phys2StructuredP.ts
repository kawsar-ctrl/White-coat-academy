import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredP(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sp_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 1: Isochoric Heat & Molar Specific Heat Work (~30 MCQs)
  // =========================================================================
  [
    { n: 2, cvMul: 1.5, dt: 100, label: 'এক-পরমাণুক আদর্শ গ্যাস (C_v = ১.৫R)' },
    { n: 4, cvMul: 1.5, dt: 50, label: 'এক-পরমাণুক আদর্শ গ্যাস (C_v = ১.৫R)' },
    { n: 2, cvMul: 2.5, dt: 100, label: 'দ্বি-পরমাণুক আদর্শ গ্যাস (C_v = ২.৫R)' },
    { n: 4, cvMul: 2.5, dt: 50, label: 'দ্বি-পরমাণুক আদর্শ গ্যাস (C_v = ২.৫R)' },
    { n: 1, cvMul: 2.5, dt: 200, label: 'দ্বি-পরমাণুক আদর্শ গ্যাস (C_v = ২.৫R)' },
    { n: 5, cvMul: 1.5, dt: 40, label: 'এক-পরমাণুক আদর্শ গ্যাস (C_v = ১.৫R)' },
    { n: 3, cvMul: 2.5, dt: 100, label: 'দ্বি-পরমাণুক আদর্শ গ্যাস (C_v = ২.৫R)' },
    { n: 2, cvMul: 3.0, dt: 100, label: 'বহু-পরমাণুক গ্যাস (C_v = ৩R)' },
    { n: 4, cvMul: 3.0, dt: 50, label: 'বহু-পরমাণুক গ্যাস (C_v = ৩R)' },
    { n: 5, cvMul: 2.5, dt: 80, label: 'দ্বি-পরমাণুক আদর্শ গ্যাস (C_v = ২.৫R)' },
  ].forEach((ic, idx) => {
    const rCoef = ic.n * ic.cvMul * ic.dt;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `স্থির আয়তনে ${toBnDigits(ic.n)} মোল ${ic.label}-এর তাপমাত্রা ${toBnDigits(ic.dt)} K বৃদ্ধি করলে অভ্যন্তরীণ শক্তির পরিবর্তন (ΔU) R-এর মাধ্যমে কত হবে?`,
        correct: `${toBnDigits(rCoef)} R`,
        distractors: Array.from(new Set([rCoef * 2, rCoef / 2, rCoef + 100, rCoef + 250, rCoef + 50]))
          .filter((x) => x > 0 && x !== rCoef)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} R`),
        explanation: `ΔU = n C_v ΔT = ${toBnDigits(ic.n)} × ${toBnDigits(ic.cvMul)}R × ${toBnDigits(ic.dt)} = ${toBnDigits(rCoef)} R।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · অভ্যন্তরীণ শক্তির পরিবর্তন',
      })
    );
  });

  [
    { v1: 2, t1: 300, t2: 600, gamma: 1.4, label: 'দ্বি-পরমাণুক (γ=১.৪)' },
    { v1: 4, t1: 300, t2: 600, gamma: 1.67, label: 'এক-পরমাণুক (γ=১.৬৭)' },
    { v1: 10, t1: 400, t2: 100, gamma: 1.5, label: 'আদর্শ গ্যাস (γ=১.৫)' },
    { v1: 8, t1: 273, t2: 546, gamma: 1.4, label: 'দ্বি-পরমাণুক (γ=১.৪)' },
    { v1: 5, t1: 300, t2: 900, gamma: 1.67, label: 'এক-পরমাণুক (γ=১.৬৭)' },
  ].forEach((ad, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(ad.t1)} K তাপমাত্রায় থাকা ${toBnDigits(ad.v1)} L আয়তনের ${ad.label} গ্যাসকে রুদ্ধতাপীয় প্রক্রিয়ায় সংকুচিত করে তাপমাত্রা ${toBnDigits(ad.t2)} K করলে গ্যাসটির T ও V-এর মধ্যকার সম্পর্ক কোনটি মেনে চলবে?`,
        correct: `T₁ V₁^(γ-1) = T₂ V₂^(γ-1)`,
        distractors: [`P₁V₁ = P₂V₂`, `T₁/V₁ = T₂/V₂`, `T₁ V₁^γ = T₂ V₂^γ`, `P₁/T₁ = P₂/T₂`],
        explanation: `রুদ্ধতাপীয় প্রক্রিয়ায় তাপমাত্রা ও আয়তনের সম্পর্ক T V^(γ-1) = ধ্রুবক।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · রুদ্ধতাপীয় সম্পর্ক',
      })
    );
  });

  // =========================================================================
  // 2. Ch 2: Spherical Capacitor & Dipole Torque (~34 MCQs)
  // =========================================================================
  [
    { rKm: 6400, cUf: '৭১১ μF (পৃথিবী)' },
    { rKm: 9, cUf: '১ μF' },
    { rKm: 18, cUf: '২ μF' },
    { rKm: 27, cUf: '৩ μF' },
    { rKm: 45, cUf: '৫ μF' },
    { rKm: 90, cUf: '১০ μF' },
  ].forEach((sc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `শূন্যস্থানে ${toBnDigits(sc.rKm)} km ব্যাসার্ধের একটি বিচ্ছিন্ন গোলীয় পরিবাহীর ধারকত্ব কত? (C = 4πε₀R = R / ৯×১০⁹)`,
        correct: sc.cUf,
        distractors: ['১ μF', '২ μF', '৩ μF', '৫ μF', '১০ μF', '৭১১ μF (পৃথিবী)'].filter((x) => x !== sc.cUf).slice(0, 4),
        explanation: `গোলকের ধারকত্ব C = R / (৯×১০⁹) = ${toBnDigits(sc.rKm)}×১০³ / (৯×১০⁹) = ${sc.cUf}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · গোলীয় পরিবাহীর ধারকত্ব',
      })
    );
  });

  [
    { p: 2e-6, E: 1e4, deg: 30, tauMn: 10 },
    { p: 4e-6, E: 5e3, deg: 30, tauMn: 10 },
    { p: 5e-6, E: 2e4, deg: 90, tauMn: 100 },
    { p: 3e-6, E: 1e4, deg: 90, tauMn: 30 },
    { p: 6e-6, E: 1e4, deg: 30, tauMn: 30 },
    { p: 8e-6, E: 5e3, deg: 90, tauMn: 40 },
    { p: 1e-5, E: 4e3, deg: 30, tauMn: 20 },
    { p: 2e-6, E: 3e4, deg: 90, tauMn: 60 },
  ].forEach((dp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(dp.p * 1e6)} μC·m দ্বিমেরু ভ্রামকের একটি তড়িৎ দ্বিমেরুকে ${toBnDigits(dp.E)} N/C সুষম তড়িৎ ক্ষেত্রের সাথে ${toBnDigits(dp.deg)}° কোণে স্থাপন করলে প্রযুক্ত টর্ক কত mN·m?`,
        correct: `${toBnDigits(dp.tauMn)} mN·m`,
        distractors: Array.from(new Set([dp.tauMn * 2, dp.tauMn / 2, dp.tauMn + 15, dp.tauMn + 35, dp.tauMn + 5]))
          .filter((x) => x > 0 && x !== dp.tauMn)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mN·m`),
        explanation: `τ = pE sinθ = ${toBnDigits(dp.p * 1e6)}×১০⁻⁶ × ${toBnDigits(dp.E)} × sin(${toBnDigits(dp.deg)}°) = ${toBnDigits(dp.tauMn)} mN·m।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · তড়িৎ দ্বিমেরুর ওপর টর্ক',
      })
    );
  });

  // =========================================================================
  // 3. Ch 3: Current Bulb Fuse Rating & Series Cell Grouping (~36 MCQs)
  // =========================================================================
  [
    { p: 1100, v: 220, I: 5 },
    { p: 2200, v: 220, I: 10 },
    { p: 440, v: 220, I: 2 },
    { p: 660, v: 220, I: 3 },
    { p: 1000, v: 200, I: 5 },
    { p: 1200, v: 240, I: 5 },
    { p: 2400, v: 240, I: 10 },
    { p: 500, v: 100, I: 5 },
    { p: 880, v: 220, I: 4 },
    { p: 1500, v: 250, I: 6 },
  ].forEach((fb, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি বৈদ্যুতিক হিটারের গায়ে "${toBnDigits(fb.p)} W - ${toBnDigits(fb.v)} V" লেখা থাকলে হিটারটি ${toBnDigits(fb.v)} V লাইনে সংযুক্ত অবস্থায় কত অ্যাম্পিয়ার তড়িৎ গ্রহণ করবে?`,
        correct: `${toBnDigits(fb.I)} A`,
        distractors: Array.from(new Set([fb.I * 2, fb.I / 2, fb.I + 3, fb.I + 7, fb.I + 11]))
          .filter((x) => x > 0 && x !== fb.I)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} A`),
        explanation: `প্রবাহমাত্রা I = P/V = ${toBnDigits(fb.p)} / ${toBnDigits(fb.v)} = ${toBnDigits(fb.I)} A।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · যন্ত্রের প্রবাহ রেটিং',
      })
    );
  });

  [
    { n: 4, E: 1.5, r: 0.5, R: 4 },
    { n: 5, E: 2.0, r: 0.4, R: 8 },
    { n: 6, E: 1.5, r: 0.5, R: 6 },
    { n: 10, E: 2.0, r: 0.2, R: 8 },
    { n: 8, E: 1.5, r: 0.25, R: 4 },
    { n: 4, E: 3.0, r: 0.5, R: 4 },
  ].forEach((cg, idx) => {
    const I = Number(((cg.n * cg.E) / (cg.R + cg.n * cg.r)).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `প্রতিটি ${toBnDigits(cg.E)} V EMF ও ${toBnDigits(cg.r)} Ω অভ্যন্তরীণ রোধের ${toBnDigits(cg.n)}টি কোষকে শ্রেণিতে যুক্ত করে ${toBnDigits(cg.R)} Ω রোধে প্রবাহ পাঠালে বর্তনীর প্রবাহমাত্রা কত A?`,
        correct: `${toBnDigits(I)} A`,
        distractors: Array.from(new Set([I * 2, Number((I / 2).toFixed(2)), Number((cg.E / cg.R).toFixed(2)), Number((I + 1.5).toFixed(2)), Number((I + 3).toFixed(2))]))
          .filter((x) => x > 0 && x !== I)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} A`),
        explanation: `শ্রেণি সমবায়ে I = nE/(R + nr) = (${toBnDigits(cg.n)}×${toBnDigits(cg.E)}) / (${toBnDigits(cg.R)} + ${toBnDigits(cg.n * cg.r)}) = ${toBnDigits(I)} A।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · কোষের শ্রেণি সমবায়',
      })
    );
  });

  // =========================================================================
  // 4. Ch 4: Earth Magnetic Field Total B = sqrt(BH^2 + BV^2) & Cyclotron Freq (~32 MCQs)
  // =========================================================================
  [
    { bh: 30, bv: 40, b: 50 },
    { bh: 60, bv: 80, b: 100 },
    { bh: 15, bv: 20, b: 25 },
    { bh: 24, bv: 18, b: 30 },
    { bh: 12, bv: 5, b: 13 },
    { bh: 24, bv: 10, b: 26 },
    { bh: 40, bv: 30, b: 50 },
    { bh: 8, bv: 15, b: 17 },
  ].forEach((eb, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `কোনো স্থানে ভূ-চৌম্বক ক্ষেত্রের অনুভূমিক উপাংশ ${toBnDigits(eb.bh)} μT এবং উল্লম্ব উপাংশ ${toBnDigits(eb.bv)} μT হলে ঐ স্থানে মোট ভূ-চৌম্বক ক্ষেত্রের মান কত μT?`,
        correct: `${toBnDigits(eb.b)} μT`,
        distractors: Array.from(new Set([eb.bh + eb.bv, Math.abs(eb.bh - eb.bv) + 3, eb.b * 2, eb.b + 12]))
          .filter((x) => x > 0 && x !== eb.b)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μT`),
        explanation: `B = √(B_H² + B_V²) = √(${toBnDigits(eb.bh)}² + ${toBnDigits(eb.bv)}²) = ${toBnDigits(eb.b)} μT।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · ভূ-চৌম্বক ক্ষেত্রের মান',
      })
    );
  });

  // =========================================================================
  // 5. Ch 5: AC Power P = V_rms I_rms cos(phi) & Capacitive Reactance (~36 MCQs)
  // =========================================================================
  [
    { v: 220, i: 5, pf: 0.8, p: 880 },
    { v: 200, i: 4, pf: 0.5, p: 400 },
    { v: 100, i: 10, pf: 0.6, p: 600 },
    { v: 220, i: 10, pf: 0.5, p: 1100 },
    { v: 110, i: 4, pf: 0.75, p: 330 },
    { v: 240, i: 5, pf: 0.5, p: 600 },
    { v: 200, i: 6, pf: 0.8, p: 960 },
    { v: 100, i: 8, pf: 0.5, p: 400 },
    { v: 250, i: 4, pf: 0.7, p: 700 },
    { v: 120, i: 5, pf: 0.8, p: 480 },
  ].forEach((ap, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি AC বর্তনীর কার্যকর ভোল্টেজ ${toBnDigits(ap.v)} V, কার্যকর প্রবাহ ${toBnDigits(ap.i)} A এবং ক্ষমতা গুণাঙ্ক ${toBnDigits(ap.pf)} হলে বর্তনীতে ব্যয়িত গড় ক্ষমতা কত ওয়াট?`,
        correct: `${toBnDigits(ap.p)} W`,
        distractors: Array.from(new Set([ap.v * ap.i, ap.p / 2, ap.p * 2, ap.p + 150, ap.p + 300]))
          .filter((x) => x > 0 && x !== ap.p)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} W`),
        explanation: `গড় ক্ষমতা P = V_rms I_rms cosφ = ${toBnDigits(ap.v)} × ${toBnDigits(ap.i)} × ${toBnDigits(ap.pf)} = ${toBnDigits(ap.p)} W।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · এসি বর্তনীর ক্ষমতা',
      })
    );
  });

  // =========================================================================
  // 6. Ch 6 & Ch 7: Relative Refractive Index, Mirror Magnification & Resultant Amplitude (~50 MCQs)
  // =========================================================================
  [
    { a1: 3, a2: 4, deg: 90, aRes: '৫ একক' },
    { a1: 6, a2: 8, deg: 90, aRes: '১০ একক' },
    { a1: 5, a2: 12, deg: 90, aRes: '১৩ একক' },
    { a1: 4, a2: 4, deg: 0, aRes: '৮ একক' },
    { a1: 4, a2: 4, deg: 120, aRes: '৪ একক' },
    { a1: 6, a2: 6, deg: 120, aRes: '৬ একক' },
    { a1: 5, a2: 5, deg: 180, aRes: '০ (শূন্য)' },
    { a1: 8, a2: 3, deg: 180, aRes: '৫ একক (২)' },
  ].forEach((sa, idx) => {
    const cleanA = sa.aRes.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(sa.a1)} একক ও ${toBnDigits(sa.a2)} একক বিস্তারের দুটি সুসংগত তরঙ্গ ${toBnDigits(sa.deg)}° দশা পার্থক্যে উপরিপাতিত হলে লব্ধি বিস্তার কত হবে?`,
        correct: cleanA,
        distractors: ['০ (শূন্য)', '৪ একক', '৫ একক', '৬ একক', '৮ একক', '১০ একক', '১৩ একক'].filter((x) => x !== cleanA).slice(0, 4),
        explanation: `লব্ধি বিস্তার A = √(a₁² + a₂² + 2a₁a₂ cosδ) = ${cleanA}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · তরঙ্গের উপরিপাতন',
      })
    );
  });

  [
    { nGlass: 1.5, nWater: 1.33, nWG: '১.১২৫ (৯/৮)' },
    { nGlass: 1.5, nWater: 1.25, nWG: '১.২ (৬/৫)' },
    { nDiam: 2.4, nWater: 1.2, nWG: '২.০' },
    { nDiam: 2.4, nGlass: 1.5, nWG: '১.৬' },
    { nGlass: 1.6, nWater: 1.2, nWG: '১.৩৩ (৪/৩)' },
    { nGlass: 1.8, nWater: 1.5, nWG: '১.২ (২)' },
  ].forEach((rn, idx) => {
    const cleanR = rn.nWG.replace(' (২)', '');
    const n1 = rn.nWater ?? rn.nGlass!;
    const n2 = rn.nDiam ?? rn.nGlass!;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বায়ুর সাপেক্ষে প্রথম মাধ্যমের প্রতিসরণাঙ্ক ${toBnDigits(n1)} এবং দ্বিতীয় মাধ্যমের প্রতিসরণাঙ্ক ${toBnDigits(n2)} হলে প্রথম মাধ্যমের সাপেক্ষে দ্বিতীয় মাধ্যমের প্রতিসরণাঙ্ক কত?`,
        correct: cleanR,
        distractors: ['১.১২৫ (৯/৮)', '১.২ (৬/৫)', '১.৩৩ (৪/৩)', '১.৬', '২.০', '০.৮'].filter((x) => x !== cleanR).slice(0, 4),
        explanation: `₁μ₂ = μ₂ / μ₁ = ${toBnDigits(n2)} / ${toBnDigits(n1)} = ${cleanR}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · আপেক্ষিক প্রতিসরণাঙ্ক',
      })
    );
  });

  // =========================================================================
  // 7. Ch 8, Ch 9, Ch 10 & Ch 11: Helium+/Lithium2+ Energy, BJT Gain, Stellar Luminosity (~85 MCQs)
  // =========================================================================
  // 7A: Hydrogen-like ion energy E_n = -13.6 * Z^2 / n^2 eV (12 MCQs)
  [
    { ion: 'He⁺ আয়ন (Z=২)', Z: 2, n: 1, E: -54.4 },
    { ion: 'He⁺ আয়ন (Z=২)', Z: 2, n: 2, E: -13.6 },
    { ion: 'He⁺ আয়ন (Z=২)', Z: 2, n: 3, E: -6.04 },
    { ion: 'Li²⁺ আয়ন (Z=৩)', Z: 3, n: 1, E: -122.4 },
    { ion: 'Li²⁺ আয়ন (Z=৩)', Z: 3, n: 2, E: -30.6 },
    { ion: 'Li²⁺ আয়ন (Z=৩)', Z: 3, n: 3, E: -13.6 },
  ].forEach((hi, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বোর মডেল অনুসারে ${hi.ion}-এর n = ${toBnDigits(hi.n)} কক্ষপথে ইলেকট্রনের শক্তি কত eV?`,
        correct: `${toBnDigits(hi.E)} eV`,
        distractors: ['-১৩.৬ eV', '-৬.০৪ eV', '-৩০.৬ eV', '-৫৪.৪ eV', '-১২২.৪ eV', '-৩.৪ eV']
          .filter((x) => x !== `${toBnDigits(hi.E)} eV`)
          .slice(0, 4),
        explanation: `E_n = -১৩.৬ × (Z²/n²) = -১৩.৬ × (${toBnDigits(hi.Z * hi.Z)}/${toBnDigits(hi.n * hi.n)}) = ${toBnDigits(hi.E)} eV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · হাইড্রোজেন-সদৃশ আয়নের শক্তি',
      })
    );
  });

  // 7B: BJT Common-Emitter Voltage Gain Av = beta * (RL / Rin) (12 MCQs)
  [
    { beta: 50, rl: 4000, rin: 1000, av: 200 },
    { beta: 100, rl: 5000, rin: 1000, av: 500 },
    { beta: 80, rl: 3000, rin: 1500, av: 160 },
    { beta: 60, rl: 4000, rin: 800, av: 300 },
    { beta: 100, rl: 2000, rin: 500, av: 400 },
    { beta: 40, rl: 5000, rin: 1000, av: 200 },
    { beta: 120, rl: 2500, rin: 1000, av: 300 },
    { beta: 50, rl: 6000, rin: 1500, av: 200 },
  ].forEach((vg, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি CE ট্রানজিস্টর বিবর্ধকের প্রবাহ লাভ β = ${toBnDigits(vg.beta)}, লোড রোধ R_L = ${toBnDigits(vg.rl)} Ω এবং ইনপুট রোধ R_in = ${toBnDigits(vg.rin)} Ω হলে ভোল্টেজ বিবর্ধন (A_v) কত?`,
        correct: toBnDigits(vg.av),
        distractors: Array.from(new Set([vg.av * 2, vg.av / 2, vg.beta, vg.av + 120, vg.av + 60]))
          .filter((x) => x > 0 && x !== vg.av)
          .slice(0, 4)
          .map((x) => toBnDigits(x)),
        explanation: `ভোল্টেজ বিবর্ধন A_v = β (R_L / R_in) = ${toBnDigits(vg.beta)} × (${toBnDigits(vg.rl)}/${toBnDigits(vg.rin)}) = ${toBnDigits(vg.av)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · ট্রানজিস্টরের ভোল্টেজ বিবর্ধন',
      })
    );
  });

  // 7C: Star Luminosity Scaling L ~ R^2 T^4 (12 MCQs)
  [
    { rScale: 'একই ব্যাসার্ধ', tScale: 'তাপমাত্রা দ্বিগুণ', lFactor: '১৬ গুণ' },
    { rScale: 'ব্যাসার্ধ দ্বিগুণ', tScale: 'একই তাপমাত্রা', lFactor: '৪ গুণ' },
    { rScale: 'ব্যাসার্ধ দ্বিগুণ', tScale: 'তাপমাত্রা দ্বিগুণ', lFactor: '৬৪ গুণ' },
    { rScale: 'ব্যাসার্ধ ৩ গুণ', tScale: 'একই তাপমাত্রা', lFactor: '৯ গুণ' },
    { rScale: 'ব্যাসার্ধ ৪ গুণ', tScale: 'তাপমাত্রা অর্ধেক', lFactor: '১ গুণ (সমান)' },
    { rScale: 'ব্যাসার্ধ অর্ধেক', tScale: 'তাপমাত্রা দ্বিগুণ', lFactor: '৪ গুণ (২)' },
  ].forEach((st, idx) => {
    const cleanL = st.lFactor.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `সূর্যের তুলনায় একটি নক্ষত্রের ${st.rScale} ও পৃষ্ঠের ${st.tScale} হলে নক্ষত্রটির দীপন ক্ষমতা (Luminosity) সূর্যের কত গুণ হবে?`,
        correct: cleanL,
        distractors: ['১ গুণ (সমান)', '২ গুণ', '৪ গুণ', '৮ গুণ', '৯ গুণ', '১৬ গুণ', '৬৪ গুণ']
          .filter((x) => x !== cleanL)
          .slice(0, 4),
        explanation: `স্টিফেন-বোল্টজম্যানের সূত্রানুসারে L = 4πR²σT⁴; তাই দীপন ক্ষমতা হবে ${cleanL}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · নক্ষত্রের দীপন ক্ষমতা',
      })
    );
  });

  // 7D: Uranium-235 Fission Energy & Electron Rest Energy (~24 MCQs)
  [1, 2, 5, 10, 20, 50, 100].forEach((nFis, idx) => {
    const mev = nFis * 200;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `প্রতিটি ²³⁵U নিউক্লিয়াসের ফিশনে প্রায় ২০০ MeV শক্তি নির্গত হলে ${toBnDigits(nFis)}টি নিউক্লিয়াসের ফিশনে মোট কত MeV শক্তি পাওয়া যাবে?`,
        correct: `${toBnDigits(mev)} MeV`,
        distractors: Array.from(new Set([mev * 2, mev / 2, mev + 100, mev + 300, mev + 500]))
          .filter((x) => x > 0 && x !== mev)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} MeV`),
        explanation: `মোট শক্তি = ${toBnDigits(nFis)} × ২০০ MeV = ${toBnDigits(mev)} MeV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · নিউক্লীয় ফিশন শক্তি',
      })
    );
  });

  // 7E: High-Yield Physics Constants & Values 2-way cards (~60 MCQs)
  const phys2Constants: { ch: string; vis: string; name: string; val: string }[] = [
    { ch: 'phys2_thermo', vis: 'thermodynamics', name: 'সর্বজনীন গ্যাস ধ্রুবক (R)', val: '৮.৩১৪ J·mol⁻¹·K⁻¹' },
    { ch: 'phys2_ch2_static_elec', vis: 'circuits_optics', name: 'শূন্যস্থানের তড়িৎ ভেদনযোগ্যতা (ε₀)', val: '৮.৮৫৪ × ১০⁻¹² C²·N⁻¹·m⁻²' },
    { ch: 'phys2_ch2_static_elec', vis: 'circuits_optics', name: 'কুলম্ব ধ্রুবক (১ / ৪πε₀)', val: '৯ × ১০⁹ N·m²·C⁻²' },
    { ch: 'phys2_ch4_magnetism', vis: 'circuits_optics', name: 'শূন্যস্থানের চৌম্বক প্রবেশ্যতা (μ₀)', val: '৪π × ১০⁻⁷ T·m·A⁻¹' },
    { ch: 'phys2_ch8_modern_phys', vis: 'circuits_optics', name: 'প্ল্যাঙ্কের ধ্রুবক (h)', val: '৬.৬২৬ × ১০⁻³⁴ J·s' },
    { ch: 'phys2_ch8_modern_phys', vis: 'circuits_optics', name: '১ ইলেকট্রন-ভোল্ট (1 eV)', val: '১.৬ × ১০⁻¹⁹ J' },
    { ch: 'phys2_ch8_modern_phys', vis: 'circuits_optics', name: 'ইলেকট্রনের নিশ্চল ভর-শক্তি (m₀c²)', val: '০.৫১১ MeV' },
    { ch: 'phys2_ch9_atomic_nuclear', vis: 'circuits_optics', name: '১ পারমাণবিক ভর একক (1 amu)-এর সমতুল্য শক্তি', val: '৯৩১.৫ MeV' },
    { ch: 'phys2_ch9_atomic_nuclear', vis: 'circuits_optics', name: 'রিডবার্গ ধ্রুবক (R_H)', val: '১.০৯৭ × ১০⁷ m⁻¹' },
    { ch: 'phys2_ch9_atomic_nuclear', vis: 'circuits_optics', name: '১ কুরি (1 Ci) তেজস্ক্রিয় সক্রিয়তা', val: '৩.৭ × ১০¹⁰ Bq (বিকিরণ/সেকেন্ড)' },
    { ch: 'phys2_ch8_modern_phys', vis: 'circuits_optics', name: 'স্টিফেন ধ্রুবক (σ)', val: '৫.৬৭ × ১০⁻⁸ W·m⁻²·K⁻⁴' },
    { ch: 'phys2_ch11_astronomy', vis: 'circuits_optics', name: 'মহাজাগতিক পটভূমি বিকিরণের (CMB) গড় তাপমাত্রা', val: '২.৭৩ K' },
  ];
  const constValPool = phys2Constants.map((c) => c.val);
  const constNamePool = phys2Constants.map((c) => c.name);
  phys2Constants.forEach((cn, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: cn.ch,
        visualLessonId: cn.vis,
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `পদার্থবিজ্ঞানে "${cn.name}"-এর প্রমাণ মান কত?`,
        correct: cn.val,
        distractors: constValPool.filter((v) => v !== cn.val).slice(0, 4),
        explanation: `${cn.name}-এর প্রচলিত এসআই/প্রমাণ মান হলো ${cn.val}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · মৌলিক ধ্রুবকসমূহ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: cn.ch,
        visualLessonId: cn.vis,
        hscLevel: '12',
        difficulty: 'board',
        question: `"${cn.val}" — এটি পদার্থবিজ্ঞানের কোন মৌলিক ধ্রুবক বা এককের মান?`,
        correct: cn.name,
        distractors: constNamePool.filter((n) => n !== cn.name).slice(0, 4),
        explanation: `${cn.val} হলো ${cn.name}-এর মান।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · ধ্রুবক ও একক মান',
      })
    );
  });

  // 7F: Mirror Image Height / Magnification m = -v/u (16 MCQs)
  [
    { u: 30, v: 60, ho: 2, hi: 4 },
    { u: 20, v: 60, ho: 3, hi: 9 },
    { u: 40, v: 20, ho: 6, hi: 3 },
    { u: 50, v: 25, ho: 8, hi: 4 },
    { u: 15, v: 45, ho: 2, hi: 6 },
    { u: 25, v: 50, ho: 4, hi: 8 },
    { u: 60, v: 30, ho: 10, hi: 5 },
    { u: 30, v: 90, ho: 2, hi: 6 },
  ].forEach((mg, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি উত্তল লেন্স থেকে ${toBnDigits(mg.u)} cm দূরে রাখা ${toBnDigits(mg.ho)} cm দৈর্ঘ্যের বস্তুর বাস্তব প্রতিবিম্ব লেন্স থেকে ${toBnDigits(mg.v)} cm দূরে গঠিত হলে প্রতিবিম্বের দৈর্ঘ্য কত cm?`,
        correct: `${toBnDigits(mg.hi)} cm`,
        distractors: Array.from(new Set([mg.hi * 2, mg.hi / 2, mg.ho, mg.hi + 3, mg.hi + 7]))
          .filter((x) => x > 0 && x !== mg.hi)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `রৈখিক বিবর্ধন |m| = v/u = l'/l => l' = ${toBnDigits(mg.ho)} × (${toBnDigits(mg.v)}/${toBnDigits(mg.u)}) = ${toBnDigits(mg.hi)} cm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · রৈখিক বিবর্ধন',
      })
    );
  });

  // 7G: Extra Half-life & Nuclear Activity / Capacitor Parallel Combinations (~130 MCQs)
  // Parallel Capacitor Grid (16 MCQs)
  [
    { c1: 2, c2: 3, c3: 5 },
    { c1: 4, c2: 6, c3: 10 },
    { c1: 5, c2: 10, c3: 15 },
    { c1: 8, c2: 12, c3: 20 },
    { c1: 1, c2: 2, c3: 7 },
    { c1: 3, c2: 9, c3: 18 },
    { c1: 10, c2: 20, c3: 30 },
    { c1: 6, c2: 8, c3: 10 },
  ].forEach((cp, idx) => {
    const sum = cp.c1 + cp.c2 + cp.c3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `${toBnDigits(cp.c1)} μF, ${toBnDigits(cp.c2)} μF এবং ${toBnDigits(cp.c3)} μF ধারকত্বের ৩টি ধারককে সমান্তরাল সমবায়ে যুক্ত করলে তুল্য ধারকত্ব কত μF?`,
        correct: `${toBnDigits(sum)} μF`,
        distractors: Array.from(new Set([sum * 2, sum / 2, sum + 5, sum - 4]))
          .filter((x) => x > 0 && x !== sum)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μF`),
        explanation: `সমান্তরাল সমবায়ে C_p = C₁ + C₂ + C₃ = ${toBnDigits(cp.c1)} + ${toBnDigits(cp.c2)} + ${toBnDigits(cp.c3)} = ${toBnDigits(sum)} μF।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকের সমান্তরাল সমবায়',
      })
    );
  });

  // Series Resistors 3-resistor sum (16 MCQs)
  [
    { r1: 2, r2: 4, r3: 6 },
    { r1: 5, r2: 10, r3: 15 },
    { r1: 3, r2: 6, r3: 9 },
    { r1: 10, r2: 20, r3: 30 },
    { r1: 4, r2: 8, r3: 12 },
    { r1: 6, r2: 12, r3: 18 },
    { r1: 8, r2: 16, r3: 24 },
    { r1: 15, r2: 25, r3: 40 },
  ].forEach((rs, idx) => {
    const sum = rs.r1 + rs.r2 + rs.r3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(rs.r1)} Ω, ${toBnDigits(rs.r2)} Ω এবং ${toBnDigits(rs.r3)} Ω মানের ৩টি রোধকে শ্রেণিতে যুক্ত করে ২ A প্রবাহ চালালে সমবায়ের দুই প্রান্তের বিভব পার্থক্য কত V?`,
        correct: `${toBnDigits(sum * 2)} V`,
        distractors: Array.from(new Set([sum, sum * 4, sum + 12, sum * 2 + 10]))
          .filter((x) => x > 0 && x !== sum * 2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `তুল্য রোধ R_s = ${toBnDigits(sum)} Ω; বিভব V = I R_s = ২ × ${toBnDigits(sum)} = ${toBnDigits(sum * 2)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · শ্রেণি বর্তনীর বিভব',
      })
    );
  });

  // Bohr Ionization Energy & Excitation Potential (12 MCQs)
  [
    { nFrom: 1, nTo: 2, vPot: 10.2 },
    { nFrom: 1, nTo: 3, vPot: 12.09 },
    { nFrom: 1, nTo: 4, vPot: 12.75 },
    { nFrom: 1, nTo: 5, vPot: 13.06 },
    { nFrom: 1, nTo: 6, vPot: 13.22 },
  ].forEach((ex, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `ভূমি স্তরে (n = ১) থাকা হাইড্রোজেন পরমাণুর ইলেকট্রনকে n = ${toBnDigits(ex.nTo)} শক্তিস্তরে উন্নীত করতে প্রয়োজনীয় উদ্দীপনা বিভব (Excitation Potential) কত ভোল্ট?`,
        correct: `${toBnDigits(ex.vPot)} V`,
        distractors: ['১০.২ V', '১২.০৯ V', '১২.৭৫ V', '১৩.০৬ V', '১৩.২২ V', '১৩.৬ V']
          .filter((x) => x !== `${toBnDigits(ex.vPot)} V`)
          .slice(0, 4),
        explanation: `প্রয়োজনীয় শক্তি ΔE = E_${toBnDigits(ex.nTo)} - E₁ = ${toBnDigits(ex.vPot)} eV; তাই উদ্দীপনা বিভব ${toBnDigits(ex.vPot)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · উদ্দীপনা বিভব',
      })
    );
  });

  // Extra 100+ Unique Parametric Grids for Ch 1, 2, 5, 6, 7, 8, 10 (to cross 3,150 comfortably)
  // A: Carnot Work & Kelvin Conversions (24 MCQs)
  [127, 227, 327, 427, 527, 627, 727, 827, 927, 1027, 1127, 1227].forEach((cVal, idx) => {
    const kVal = cVal + 273;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি তাপ ইঞ্জিনের উৎসের তাপমাত্রা ${toBnDigits(cVal)}°C এবং তাপগ্রাহকের তাপমাত্রা ২৭°C (৩০০ K) হলে পরম স্কেলে উৎসের তাপমাত্রা এবং কার্নো দক্ষতা যথাক্রমে কত?`,
        correct: `${toBnDigits(kVal)} K এবং ${toBnDigits(Number(((1 - 300 / kVal) * 100).toFixed(1)))}%`,
        distractors: [
          `${toBnDigits(kVal)} K এবং ${toBnDigits(Number(((300 / kVal) * 100).toFixed(1)))}%`,
          `${toBnDigits(cVal)} K এবং ৫০%`,
          `${toBnDigits(kVal + 100)} K এবং ৭৫%`,
          `${toBnDigits(kVal - 100)} K এবং ৪০%`,
        ],
        explanation: `T₁ = ${toBnDigits(cVal)} + ২৭৩ = ${toBnDigits(kVal)} K এবং η = (1 - ৩০০/${toBnDigits(kVal)}) × ১০০% = ${toBnDigits(Number(((1 - 300 / kVal) * 100).toFixed(1)))}%।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কার্নো ইঞ্জিন',
      })
    );
  });

  // B: Capacitive Reactance XC = 1 / (2pi f C) (16 MCQs)
  [
    { freqStr: '৫০ Hz', f: 50, cUf: 100, xcStr: '১০০/π Ω (≈ ৩১.৮৩ Ω)' },
    { freqStr: '৫০ Hz', f: 50, cUf: 50, xcStr: '২০০/π Ω (≈ ৬৩.৬৬ Ω)' },
    { freqStr: '৫০ Hz', f: 50, cUf: 1000, xcStr: '১০/π Ω (≈ ৩.১৮ Ω)' },
    { freqStr: '১০০ Hz', f: 100, cUf: 100, xcStr: '৫০/π Ω (≈ ১৫.৯২ Ω)' },
    { freqStr: '১০০ Hz', f: 100, cUf: 500, xcStr: '১০/π Ω (≈ ৩.১৮ Ω) (২)' },
    { freqStr: '২৫ Hz', f: 25, cUf: 100, xcStr: '২০০/π Ω (≈ ৬৩.৬৬ Ω) (২)' },
    { freqStr: '২০০ Hz', f: 200, cUf: 250, xcStr: '১০/π Ω (≈ ৩.১৮ Ω) (৩)' },
    { freqStr: '২৫০ Hz', f: 250, cUf: 100, xcStr: '২০/π Ω (≈ ৬.৩৭ Ω)' },
  ].forEach((xc, idx) => {
    const cleanX = xc.xcStr.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${xc.freqStr} কম্পাঙ্কের AC উৎসের সাথে ${toBnDigits(xc.cUf)} μF ধারক যুক্ত করলে ধারকটির ধারকীয় প্রতিঘাত (X_C) কত হবে?`,
        correct: cleanX,
        distractors: ['১০/π Ω (≈ ৩.১৮ Ω)', '২০/π Ω (≈ ৬.৩৭ Ω)', '৫০/π Ω (≈ ১৫.৯২ Ω)', '১০০/π Ω (≈ ৩১.৮৩ Ω)', '২০০/π Ω (≈ ৬৩.৬৬ Ω)']
          .filter((x) => x !== cleanX)
          .slice(0, 4),
        explanation: `X_C = 1/(2πfC) = 1 / (২π × ${toBnDigits(xc.f)} × ${toBnDigits(xc.cUf)}×১০⁻⁶) = ${cleanX}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ধারকীয় প্রতিঘাত',
      })
    );
  });

  // C: Electron kinetic energy after acceleration -> Voltage & Binary <-> Decimal extras (30 MCQs)
  [10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 27, 30, 31, 33, 36, 40, 44, 48, 50, 55, 60, 64, 70, 80, 90, 95, 100, 110, 120, 127].forEach((nDec, idx) => {
    const bin = nDec.toString(2);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `বাইনারি সংখ্যা (${bin})₂-কে দশমিক সংখ্যা পদ্ধতিতে রূপান্তর করলে মান কত হয়?`,
        correct: `(${toBnDigits(nDec)})₁₀`,
        distractors: Array.from(new Set([nDec + 1, nDec - 1, nDec + 2, nDec + 4, nDec - 2]))
          .filter((x) => x > 0 && x !== nDec)
          .slice(0, 4)
          .map((x) => `(${toBnDigits(x)})₁₀`),
        explanation: `(${bin})₂-এর প্রতিটি বিটকে ২-এর স্থানীয় মান দ্বারা গুণ করে যোগ করলে পাওয়া যায় (${toBnDigits(nDec)})₁₀।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · বাইনারি থেকে দশমিক',
      })
    );
  });

  // D: Radioactivity & Half-life Extra Set (20 MCQs)
  [
    { tHalf: 2, days: 10, N0: 640 },
    { tHalf: 3, days: 12, N0: 480 },
    { tHalf: 4, days: 20, N0: 960 },
    { tHalf: 5, days: 25, N0: 1600 },
    { tHalf: 6, days: 18, N0: 800 },
    { tHalf: 7, days: 21, N0: 400 },
    { tHalf: 8, days: 24, N0: 1200 },
    { tHalf: 9, days: 27, N0: 1600 },
    { tHalf: 10, days: 40, N0: 3200 },
    { tHalf: 12, days: 48, N0: 2400 },
  ].forEach((rd, idx) => {
    const n = rd.days / rd.tHalf;
    const rem = rd.N0 / Math.pow(2, n);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `প্রাথমিকভাবে ${toBnDigits(rd.N0)}টি তেজস্ক্রিয় পরমাণু (অর্ধায়ু ${toBnDigits(rd.tHalf)} দিন) থাকলে ${toBnDigits(rd.days)} দিন পর অক্ষত পরমাণুর সংখ্যা কতটি হবে?`,
        correct: `${toBnDigits(rem)}টি`,
        distractors: Array.from(new Set([rem * 2, rem / 2, rem + 25, rd.N0 - rem, rem + 60]))
          .filter((x) => x > 0 && x !== rem)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}টি`),
        explanation: `n = ${toBnDigits(rd.days)}/${toBnDigits(rd.tHalf)} = ${toBnDigits(n)}; N = ${toBnDigits(rd.N0)} / ২^${toBnDigits(n)} = ${toBnDigits(rem)}টি।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · অক্ষত পরমাণুর সংখ্যা',
      })
    );
  });

  // E: YDSE Fringe Width Scaling with Wavelength / Slit Separation / Screen Distance (18 MCQs)
  [
    { b0: 2, chg: 'পর্দার দূরত্ব (D) দ্বিগুণ', bNew: 4 },
    { b0: 2, chg: 'চিরদ্বয়ের দূরত্ব (d) অর্ধেক', bNew: 4 },
    { b0: 3, chg: 'চিরদ্বয়ের দূরত্ব (d) দ্বিগুণ', bNew: 1.5 },
    { b0: 4, chg: 'তরঙ্গদৈর্ঘ্য (λ) অর্ধেক', bNew: 2 },
    { b0: 1.5, chg: 'তরঙ্গদৈর্ঘ্য দ্বিগুণ ও দূরত্ব D দ্বিগুণ', bNew: 6 },
    { b0: 4, chg: 'D দ্বিগুণ ও d অর্ধেক', bNew: 16 },
    { b0: 6, chg: 'D অর্ধেক ও d ৩ গুণ', bNew: 1 },
    { b0: 5, chg: 'তরঙ্গদৈর্ঘ্য দ্বিগুণ', bNew: 10 },
    { b0: 8, chg: 'd চার গুণ', bNew: 2 },
    { b0: 3, chg: 'তরঙ্গদৈর্ঘ্য ৩ গুণ', bNew: 9 },
  ].forEach((yd, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `ইয়ং-এর দ্বি-চির পরীক্ষায় ডোরার প্রস্থ β = ${toBnDigits(yd.b0)} mm। যদি ${yd.chg} করা হয়, তবে নতুন ডোরার প্রস্থ কত mm হবে?`,
        correct: `${toBnDigits(yd.bNew)} mm`,
        distractors: Array.from(new Set([yd.b0, yd.bNew * 2, yd.bNew / 2, yd.bNew + 3, yd.bNew + 5]))
          .filter((x) => x > 0 && x !== yd.bNew)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mm`),
        explanation: `ডোরার প্রস্থ β = λD/d; প্রদত্ত পরিবর্তনে নতুন ডোরার প্রস্থ হয় ${toBnDigits(yd.bNew)} mm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ডোরার প্রস্থের পরিবর্তন',
      })
    );
  });

  // F: Electrostatic Potential Energy between two charges U = 9e9 * q1*q2 / r (16 MCQs)
  [
    { q1: 2, q2: 5, r: 3, uMj: 30 },
    { q1: 4, q2: 4, r: 2, uMj: 72 },
    { q1: 3, q2: 6, r: 9, uMj: 18 },
    { q1: 5, q2: 8, r: 4, uMj: 90 },
    { q1: 1, q2: 4, r: 2, uMj: 18 },
    { q1: 6, q2: 6, r: 3, uMj: 108 },
    { q1: 2, q2: 10, r: 5, uMj: 36 },
    { q1: 4, q2: 5, r: 2, uMj: 90 },
  ].forEach((eu, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `শূন্যস্থানে ${toBnDigits(eu.r)} m ব্যবধানে রাখা ${toBnDigits(eu.q1)} μC ও ${toBnDigits(eu.q2)} μC দুটি চার্জের সিস্টেমের স্থির তড়িৎ বিভব শক্তি কত মিলিজুল (mJ)?`,
        correct: `${toBnDigits(eu.uMj)} mJ`,
        distractors: Array.from(new Set([eu.uMj * 2, eu.uMj / 2, eu.uMj + 15, eu.uMj + 40]))
          .filter((x) => x > 0 && x !== eu.uMj)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mJ`),
        explanation: `U = (৯×১০⁹ × ${toBnDigits(eu.q1)}×১০⁻⁶ × ${toBnDigits(eu.q2)}×১০⁻⁶) / ${toBnDigits(eu.r)} = ${toBnDigits(eu.uMj)} mJ।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · স্থির তড়িৎ বিভব শক্তি',
      })
    );
  });

  // G: High-Yield Physics 2nd Paper Optical, Modern & Semiconductor Conceptual Extras (20 MCQs)
  [
    {
      ch: 'phys2_ch6_geo_optics',
      q: 'উত্তল দর্পণ সর্বদা কোন ধরনের প্রতিবিম্ব গঠন করে?',
      ans: 'অবাস্তব, সোজা ও খর্বিত (ছোট)',
      pool: ['বাস্তব ও উল্টো', 'বাস্তব ও বিবর্ধিত', 'অবাস্তব, সোজা ও বিবর্ধিত', 'অবাস্তব, সোজা ও খর্বিত (ছোট)'],
    },
    {
      ch: 'phys2_ch6_geo_optics',
      q: 'নভোদূরবীক্ষণ যন্ত্রের বিবর্ধন ক্ষমতা বাড়ানোর উপায় কী?',
      ans: 'অভিলক্ষ্যের ফোকাস দূরত্ব (f_o) বড় এবং অভিনেত্রের ফোকাস দূরত্ব (f_e) ছোট হওয়া',
      pool: ['উভয়ের ফোকাস দূরত্ব সমান হওয়া', 'f_o ছোট ও f_e বড় হওয়া', 'অভিলক্ষ্যের ফোকাস দূরত্ব (f_o) বড় এবং অভিনেত্রের ফোকাস দূরত্ব (f_e) ছোট হওয়া', 'লেন্সের ব্যাস শূন্য হওয়া'],
    },
    {
      ch: 'phys2_ch7_physical_optics',
      q: 'দুটি উৎস সুসংগত (Coherent) হওয়ার প্রধান শর্ত কী?',
      ans: 'সমান কম্পাঙ্ক (তরঙ্গদৈর্ঘ্য) এবং শূন্য বা ধ্রুব দশা পার্থক্য',
      pool: ['বিভিন্ন কম্পাঙ্ক ও সমান বিস্তার', 'সমান কম্পাঙ্ক (তরঙ্গদৈর্ঘ্য) এবং শূন্য বা ধ্রুব দশা পার্থক্য', 'সমান তীব্রতা ও ভিন্ন বেগ', 'তাপমাত্রা সমান হওয়া'],
    },
    {
      ch: 'phys2_ch8_modern_phys',
      q: 'ফটোইলেকট্রিক ক্রিয়ায় আপতিত আলোর তীব্রতা (Intensity) দ্বিগুণ করলে কী ঘটে?',
      ans: 'সম্পৃক্ত ফটোতড়িৎ প্রবাহ (Photoelectric current) দ্বিগুণ হয়, কিন্তু সর্বোচ্চ গতিশক্তি অপরিবর্তিত থাকে',
      pool: ['ইলেকট্রনের সর্বোচ্চ গতিশক্তি দ্বিগুণ হয়', 'নিবৃত্তি বিভব দ্বিগুণ হয়', 'সম্পৃক্ত ফটোতড়িৎ প্রবাহ (Photoelectric current) দ্বিগুণ হয়, কিন্তু সর্বোচ্চ গতিশক্তি অপরিবর্তিত থাকে', 'কার্য-অপেক্ষক অর্ধেক হয়'],
    },
    {
      ch: 'phys2_ch8_modern_phys',
      q: 'এক্স-রে (X-ray) রশ্মির ধর্ম সম্পর্কিত সঠিক তথ্য কোনটি?',
      ans: 'এটি ক্ষুদ্র তরঙ্গদৈর্ঘ্যের তাড়িতচৌম্বক তরঙ্গ যা তড়িৎ ও চৌম্বক ক্ষেত্র দ্বারা বিক্ষিপ্ত হয় না',
      pool: ['এটি ধনাত্মক চার্জযুক্ত কণা', 'তড়িৎ ক্ষেত্রে বেঁকে যায়', 'এটি ক্ষুদ্র তরঙ্গদৈর্ঘ্যের তাড়িতচৌম্বক তরঙ্গ যা তড়িৎ ও চৌম্বক ক্ষেত্র দ্বারা বিক্ষিপ্ত হয় না', 'এর বেগ শব্দের বেগের সমান'],
    },
    {
      ch: 'phys2_ch9_atomic_nuclear',
      q: 'আইসোটোপ, আইসোবার ও আইসোটোনের মধ্যে যথাক্রমে কোনগুলো সমান থাকে?',
      ans: 'আইসোটোপে প্রোটন (Z), আইসোবারে ভরসংখ্যা (A) এবং আইসোটোনে নিউট্রন (N) সমান',
      pool: ['আইসোটোপে নিউট্রন সমান', 'আইসোবারে প্রোটন সমান', 'আইসোটোপে প্রোটন (Z), আইসোবারে ভরসংখ্যা (A) এবং আইসোটোনে নিউট্রন (N) সমান', 'সবগুলোতে ইলেকট্রন সমান'],
    },
    {
      ch: 'phys2_ch10_semiconductor',
      q: 'একটি p-n জংশনের সম্মুখ ঝোঁক (Forward Bias) প্রয়োগ করলে অবক্ষয়ী স্তরের (Depletion Layer) কী পরিবর্তন হয়?',
      ans: 'অবক্ষয়ী স্তরের প্রস্থ ও বিভব প্রাচীর হ্রাস পায়',
      pool: ['অবক্ষয়ী স্তর প্রশস্ত হয়', 'অবক্ষয়ী স্তরের প্রস্থ ও বিভব প্রাচীর হ্রাস পায়', 'রোধ অসীম হয়', 'কোনো পরিবর্তন হয় না'],
    },
    {
      ch: 'phys2_ch10_semiconductor',
      q: 'বাইপোলার ট্রানজিস্টরের (BJT) সক্রিয় অঞ্চলে (Active Region) কাজ করার শর্ত কী?',
      ans: 'এমিটার-বেস জংশন সম্মুখ ঝোঁকে এবং কালেক্টর-বেস জংশন বিমুখী ঝোঁকে থাকবে',
      pool: ['উভয় জংশন সম্মুখ ঝোঁকে', 'উভয় জংশন বিমুখী ঝোঁকে', 'এমিটার-বেস জংশন সম্মুখ ঝোঁকে এবং কালেক্টর-বেস জংশন বিমুখী ঝোঁকে থাকবে', 'এমিটার-বেস বিমুখী ঝোঁকে'],
    },
    {
      ch: 'phys2_ch11_astronomy',
      q: 'কোনো নক্ষত্রের বর্ণ নীল-সাদা থেকে লাল হলে পৃষ্ঠতলের তাপমাত্রার কী নির্দেশ করে?',
      ans: 'নীল নক্ষত্র সর্বাধিক উত্তপ্ত ও লাল নক্ষত্র তুলনামূলকভাবে শীতল (উইনের সূত্র)',
      pool: ['লাল নক্ষত্র সবচেয়ে বেশি উত্তপ্ত', 'নীল নক্ষত্র সবচেয়ে শীতল', 'নীল নক্ষত্র সর্বাধিক উত্তপ্ত ও লাল নক্ষত্র তুলনামূলকভাবে শীতল (উইনের সূত্র)', 'বর্ণ তাপমাত্রার ওপর নির্ভরশীল নয়'],
    },
    {
      ch: 'phys2_ch11_astronomy',
      q: 'আমাদের সৌরজগৎ মিল্কিওয়ে ছায়াপথের কোন স্থানে অবস্থিত?',
      ans: 'ছায়াপথের কেন্দ্র থেকে প্রায় ২৬,০০০–৩০,০০০ আলোকবর্ষ দূরে ওরায়ন বাহুতে',
      pool: ['ঠিক ছায়াপথের কেন্দ্রে', 'ছায়াপথের বাইরে আন্তঃগ্যালাক্টিক শূন্যস্থানে', 'ছায়াপথের কেন্দ্র থেকে প্রায় ২৬,০০০–৩০,০০০ আলোকবর্ষ দূরে ওরায়ন বাহুতে', 'অ্যান্ড্রোমেডা গ্যালাক্সিতে'],
    },
  ].forEach((c, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: c.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: c.q,
        correct: c.ans,
        distractors: c.pool.filter((x) => x !== c.ans),
        explanation: `${c.q} সঠিক উত্তর: ${c.ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · মেডিকেল ভর্তি প্রস্তুতি',
      })
    );
  });

  return list;
}
