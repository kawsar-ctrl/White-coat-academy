import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

const uniqueDists = (correct: string, candidates: string[]): string[] =>
  Array.from(new Set(candidates)).filter((c) => c !== correct).slice(0, 4);

export function buildPhys1StructuredR(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sr_${String(seq++).padStart(4, '0')}`;

  // 1. Screw Gauge Total Reading Numericals (Ch 1) — 24 MCQs
  const screwCases: Array<{ pitch: number; div: number; linear: number; circ: number }> = [
    { pitch: 1, div: 100, linear: 2, circ: 45 },
    { pitch: 1, div: 100, linear: 3, circ: 68 },
    { pitch: 1, div: 100, linear: 4, circ: 12 },
    { pitch: 1, div: 100, linear: 5, circ: 85 },
    { pitch: 0.5, div: 50, linear: 1.5, circ: 32 },
    { pitch: 0.5, div: 50, linear: 2.5, circ: 18 },
    { pitch: 0.5, div: 50, linear: 3.5, circ: 40 },
    { pitch: 0.5, div: 100, linear: 2.0, circ: 60 },
    { pitch: 1, div: 50, linear: 6, circ: 25 },
    { pitch: 1, div: 50, linear: 8, circ: 15 },
    { pitch: 1, div: 100, linear: 7, circ: 54 },
    { pitch: 0.5, div: 50, linear: 4.0, circ: 22 },
  ];
  screwCases.forEach((sc) => {
    const lc = Number((sc.pitch / sc.div).toFixed(3));
    const reading = Number((sc.linear + sc.circ * lc).toFixed(3));
    const ans = `${toBnDigits(reading)} mm`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি স্ক্রু-গজের পিচ ${toBnDigits(sc.pitch)} mm এবং বৃত্তাকার স্কেলের ভাগসংখ্যা ${toBnDigits(sc.div)}। মূল স্কেলের পাঠ ${toBnDigits(sc.linear)} mm ও বৃত্তাকার স্কেলের পাঠ ${toBnDigits(sc.circ)} হলে তারের ব্যাস কত?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((reading + sc.pitch * 0.5).toFixed(3)))} mm`,
          `${toBnDigits(Number((reading + lc * 10).toFixed(3)))} mm`,
          `${toBnDigits(Number(Math.max(0.1, reading - lc * 12).toFixed(3)))} mm`,
          `${toBnDigits(Number((sc.linear + sc.circ * 0.1).toFixed(3)))} mm`,
          `${toBnDigits(Number((reading + 1.25).toFixed(3)))} mm`,
        ]),
        explanation: `লঘিষ্ঠ গণন LC = ${toBnDigits(sc.pitch)}/${toBnDigits(sc.div)} = ${toBnDigits(lc)} mm। মোট পাঠ = ${toBnDigits(sc.linear)} + (${toBnDigits(sc.circ)} × ${toBnDigits(lc)}) = ${toBnDigits(reading)} mm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · স্ক্রু-গজ ব্যবহারিক',
      })
    );
    const area = Number((Math.PI * Math.pow(reading / 2, 2)).toFixed(2));
    const areaAns = `${toBnDigits(area)} mm²`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `কোনো তারের ব্যাস ${toBnDigits(reading)} mm হলে তারটির প্রস্থচ্ছেদের ক্ষেত্রফল কত mm²?`,
        correct: areaAns,
        distractors: uniqueDists(areaAns, [
          `${toBnDigits(Number((area * 4).toFixed(2)))} mm²`,
          `${toBnDigits(Number((area * 2).toFixed(2)))} mm²`,
          `${toBnDigits(Number((area / 2).toFixed(2)))} mm²`,
          `${toBnDigits(Number((area + 2.5).toFixed(2)))} mm²`,
          `${toBnDigits(Number((area + 5.1).toFixed(2)))} mm²`,
        ]),
        explanation: `ক্ষেত্রফল A = π(d/2)² = π × (${toBnDigits(Number((reading / 2).toFixed(3)))})² ≈ ${toBnDigits(area)} mm²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · প্রস্থচ্ছেদের ক্ষেত্রফল',
      })
    );
  });

  // 2. Vector Angle, Unit Vector & River Crossing Speeds (Ch 2) — 36 MCQs
  const dotAngles: Array<{ a: number; b: number; deg: number; cosVal: string; sinVal: string }> = [
    { a: 4, b: 5, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 6, b: 8, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 10, b: 12, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 8, b: 10, deg: 30, cosVal: '√3/2', sinVal: '1/2' },
    { a: 12, b: 15, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 5, b: 8, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 7, b: 10, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 9, b: 14, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 6, b: 15, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 14, b: 20, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 16, b: 25, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
    { a: 20, b: 30, deg: 60, cosVal: '1/2', sinVal: '√3/2' },
  ];
  dotAngles.forEach(({ a, b, deg }) => {
    const dot = deg === 60 ? (a * b) / 2 : Number((a * b * Math.cos((deg * Math.PI) / 180)).toFixed(2));
    const crossMag = Number((a * b * Math.sin((deg * Math.PI) / 180)).toFixed(2));
    const dotAns = `${toBnDigits(dot)}`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `|A| = ${toBnDigits(a)} এবং |B| = ${toBnDigits(b)} মানের দুটি ভেক্টরের মধ্যবর্তী কোণ ${toBnDigits(deg)}° হলে এদের স্কেলার গুণফল (A · B) কত?`,
        correct: dotAns,
        distractors: uniqueDists(dotAns, [
          `${toBnDigits(a * b)}`,
          `${toBnDigits(crossMag)}`,
          `${toBnDigits(Number((dot + 6).toFixed(2)))}`,
          `${toBnDigits(Number((dot * 2 + 4).toFixed(2)))}`,
          `${toBnDigits(Math.max(1, Number((dot - 5).toFixed(2))))}`,
        ]),
        explanation: `A · B = AB cosθ = ${toBnDigits(a)} × ${toBnDigits(b)} × cos(${toBnDigits(deg)}°) = ${toBnDigits(dot)}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ডট গুণন',
      })
    );
    const crossAns = `${toBnDigits(crossMag)}`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(a)} একক ও ${toBnDigits(b)} একক মানের দুটি ভেক্টর ${toBnDigits(deg)}° কোণে ক্রিয়াশীল হলে এদের দিয়ে গঠিত সামান্তরিকের ক্ষেত্রফল |A × B| কত বর্গ একক?`,
        correct: crossAns,
        distractors: uniqueDists(crossAns, [
          `${toBnDigits(dot)}`,
          `${toBnDigits(a * b)}`,
          `${toBnDigits(Number((crossMag / 2).toFixed(2)))}`,
          `${toBnDigits(Number((crossMag + 12).toFixed(2)))}`,
          `${toBnDigits(Number((crossMag + 5).toFixed(2)))}`,
        ]),
        explanation: `সামান্তরিকের ক্ষেত্রফল = |A × B| = AB sinθ = ${toBnDigits(a)} × ${toBnDigits(b)} × sin(${toBnDigits(deg)}°) ≈ ${toBnDigits(crossMag)}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ক্রস গুণন ও ক্ষেত্রফল',
      })
    );
    const triAns = `${toBnDigits(Number((crossMag / 2).toFixed(2)))}`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `|A| = ${toBnDigits(a)} ও |B| = ${toBnDigits(b)} ভেক্টর দুটি কোনো ত্রিভুজের দুটি সন্নিহিত বাহু নির্দেশ করলে এবং এদের অন্তর্ভুক্ত কোণ ${toBnDigits(deg)}° হলে ত্রিভুজটির ক্ষেত্রফল কত?`,
        correct: triAns,
        distractors: uniqueDists(triAns, [
          `${toBnDigits(crossMag)}`,
          `${toBnDigits(dot)}`,
          `${toBnDigits(a * b)}`,
          `${toBnDigits(Number((crossMag / 2 + 7).toFixed(2)))}`,
          `${toBnDigits(Number((crossMag / 2 + 11).toFixed(2)))}`,
        ]),
        explanation: `সন্নিহিত বাহু হলে ত্রিভুজের ক্ষেত্রফল = ½|A × B| = ½ × ${toBnDigits(crossMag)} = ${triAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ত্রিভুজের ক্ষেত্রফল',
      })
    );
  });

  // 3. Projectile & Uniform Acceleration Equations (Ch 3) — 36 MCQs
  const projCases: Array<{ v0: number; theta: number }> = [
    { v0: 20, theta: 30 },
    { v0: 40, theta: 30 },
    { v0: 60, theta: 30 },
    { v0: 20, theta: 45 },
    { v0: 30, theta: 45 },
    { v0: 40, theta: 45 },
    { v0: 50, theta: 45 },
    { v0: 20, theta: 60 },
    { v0: 40, theta: 60 },
    { v0: 100, theta: 30 },
    { v0: 80, theta: 30 },
    { v0: 10, theta: 30 },
  ];
  projCases.forEach(({ v0, theta }) => {
    const rad = (theta * Math.PI) / 180;
    const g = 9.8;
    const H = Number(((v0 * v0 * Math.pow(Math.sin(rad), 2)) / (2 * g)).toFixed(2));
    const T = Number(((2 * v0 * Math.sin(rad)) / g).toFixed(2));
    const R = Number(((v0 * v0 * Math.sin(2 * rad)) / g).toFixed(2));
    const hAns = `${toBnDigits(H)} m`;
    const tAns = `${toBnDigits(T)} s`;
    const rAns = `${toBnDigits(R)} m`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি প্রাসকে অনুভূমিকের সাথে ${toBnDigits(theta)}° কোণে ${toBnDigits(v0)} m/s বেগে নিক্ষেপ করলে এর সর্বাধিক উচ্চতা কত মিটার হবে? (g = ৯.৮ m/s²)`,
        correct: hAns,
        distractors: uniqueDists(hAns, [
          `${toBnDigits(Number((H * 2).toFixed(2)))} m`,
          `${toBnDigits(Number((H / 2).toFixed(2)))} m`,
          `${toBnDigits(R)} m`,
          `${toBnDigits(Number((H + 8.5).toFixed(2)))} m`,
          `${toBnDigits(Number((H + 14.2).toFixed(2)))} m`,
        ]),
        explanation: `সর্বাধিক উচ্চতা H = (v₀ sinθ)² / (2g) = (${toBnDigits(v0)} sin${toBnDigits(theta)}°)² / ১৯.৬ ≈ ${toBnDigits(H)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের উচ্চতা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `ভূমি থেকে ${toBnDigits(v0)} m/s বেগে ও ${toBnDigits(theta)}° নিক্ষেপণ কোণে নিক্ষিপ্ত একটি প্রাসের মোট বিচরণকাল (Time of Flight) কত সেকেন্ড?`,
        correct: tAns,
        distractors: uniqueDists(tAns, [
          `${toBnDigits(Number((T / 2).toFixed(2)))} s`,
          `${toBnDigits(Number((T * 2).toFixed(2)))} s`,
          `${toBnDigits(Number((T + 2.4).toFixed(2)))} s`,
          `${toBnDigits(Number((T + 4.1).toFixed(2)))} s`,
          `${toBnDigits(Math.max(0.4, Number((T - 1.1).toFixed(2))))} s`,
        ]),
        explanation: `বিচরণকাল T = (2v₀ sinθ) / g = (২ × ${toBnDigits(v0)} × sin${toBnDigits(theta)}°) / ৯.৮ ≈ ${toBnDigits(T)} s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের বিচরণকাল',
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
        question: `${toBnDigits(v0)} m/s বেগে অনুভূমিকের সাথে ${toBnDigits(theta)}° কোণে নিক্ষিপ্ত প্রাসের অনুভূমিক পাল্লা (Range) কত মিটার? (g = ৯.৮ m/s²)`,
        correct: rAns,
        distractors: uniqueDists(rAns, [
          `${toBnDigits(H)} m`,
          `${toBnDigits(Number((R / 2).toFixed(2)))} m`,
          `${toBnDigits(Number((R * 2).toFixed(2)))} m`,
          `${toBnDigits(Number((R + 18.5).toFixed(2)))} m`,
          `${toBnDigits(Number((R + 27.4).toFixed(2)))} m`,
        ]),
        explanation: `অনুভূমিক পাল্লা R = (v₀² sin2θ) / g = (${toBnDigits(v0)}² × sin${toBnDigits(2 * theta)}°) / ৯.৮ ≈ ${toBnDigits(R)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের পাল্লা',
      })
    );
  });

  // 4. Rotational Mechanics: Torque, Moment of Inertia & Angular Momentum (Ch 4) — 36 MCQs
  const rotBodies: Array<{ m: number; r: number; omega: number }> = [
    { m: 2, r: 0.5, omega: 4 },
    { m: 4, r: 0.5, omega: 6 },
    { m: 5, r: 1.0, omega: 4 },
    { m: 3, r: 1.0, omega: 8 },
    { m: 6, r: 0.5, omega: 10 },
    { m: 10, r: 0.4, omega: 5 },
    { m: 8, r: 0.5, omega: 6 },
    { m: 2, r: 1.5, omega: 4 },
    { m: 4, r: 1.0, omega: 5 },
    { m: 12, r: 0.5, omega: 3 },
    { m: 5, r: 0.8, omega: 5 },
    { m: 10, r: 0.6, omega: 10 },
  ];
  rotBodies.forEach(({ m, r, omega }) => {
    const iDisc = Number((0.5 * m * r * r).toFixed(3));
    const L = Number((iDisc * omega).toFixed(3));
    const eRot = Number((0.5 * iDisc * omega * omega).toFixed(3));
    const iAns = `${toBnDigits(iDisc)} kg·m²`;
    const lAns = `${toBnDigits(L)} kg·m²/s`;
    const eAns = `${toBnDigits(eRot)} J`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(m)} kg ভর ও ${toBnDigits(r)} m ব্যাসার্ধের একটি সুষম বৃত্তাকার চাকতির কেন্দ্রগামী ও তলের লম্ব অক্ষের সাপেক্ষে জড়তার ভ্রামক কত?`,
        correct: iAns,
        distractors: uniqueDists(iAns, [
          `${toBnDigits(Number((m * r * r).toFixed(3)))} kg·m²`,
          `${toBnDigits(Number((0.4 * m * r * r).toFixed(3)))} kg·m²`,
          `${toBnDigits(Number((0.25 * m * r * r).toFixed(3)))} kg·m²`,
          `${toBnDigits(Number((iDisc + 1.5).toFixed(3)))} kg·m²`,
          `${toBnDigits(Number((iDisc + 2.25).toFixed(3)))} kg·m²`,
        ]),
        explanation: `চাকতির জড়তার ভ্রামক I = ½MR² = ০.৫ × ${toBnDigits(m)} × ${toBnDigits(r)}² = ${toBnDigits(iDisc)} kg·m²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · জড়তার ভ্রামক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(iDisc)} kg·m² জড়তার ভ্রামকের একটি বস্তু ${toBnDigits(omega)} rad/s কৌণিক বেগে ঘুরলে এর কৌণিক ভরবেগ কত?`,
        correct: lAns,
        distractors: uniqueDists(lAns, [
          `${toBnDigits(eRot)} kg·m²/s`,
          `${toBnDigits(Number((L * 2).toFixed(3)))} kg·m²/s`,
          `${toBnDigits(Number((L / 2).toFixed(3)))} kg·m²/s`,
          `${toBnDigits(Number((L + 3.5).toFixed(3)))} kg·m²/s`,
          `${toBnDigits(Number((L + 7.2).toFixed(3)))} kg·m²/s`,
        ]),
        explanation: `কৌণিক ভরবেগ L = Iω = ${toBnDigits(iDisc)} × ${toBnDigits(omega)} = ${toBnDigits(L)} kg·m²/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কৌণিক ভরবেগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(iDisc)} kg·m² জড়তার ভ্রামকের একটি চাকা ${toBnDigits(omega)} rad/s কৌণিক বেগে ঘুরলে এর ঘূর্ণন গতিশক্তি কত জুল?`,
        correct: eAns,
        distractors: uniqueDists(eAns, [
          `${toBnDigits(L)} J`,
          `${toBnDigits(Number((eRot * 2).toFixed(3)))} J`,
          `${toBnDigits(Number((eRot / 2).toFixed(3)))} J`,
          `${toBnDigits(Number((eRot + 5.5).toFixed(3)))} J`,
          `${toBnDigits(Number((eRot + 11.4).toFixed(3)))} J`,
        ]),
        explanation: `ঘূর্ণন গতিশক্তি E_k = ½Iω² = ০.৫ × ${toBnDigits(iDisc)} × ${toBnDigits(omega)}² = ${toBnDigits(eRot)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ঘূর্ণন গতিশক্তি',
      })
    );
  });

  // 5. Work, Spring Potential, Power & Efficiency (Ch 5) — 36 MCQs
  const springWork: Array<{ k: number; xCm: number; m: number; h: number }> = [
    { k: 200, xCm: 10, m: 40, h: 15 },
    { k: 400, xCm: 5, m: 50, h: 12 },
    { k: 500, xCm: 10, m: 60, h: 20 },
    { k: 800, xCm: 5, m: 100, h: 10 },
    { k: 1000, xCm: 4, m: 80, h: 25 },
    { k: 600, xCm: 10, m: 25, h: 16 },
    { k: 1200, xCm: 5, m: 75, h: 8 },
    { k: 300, xCm: 20, m: 120, h: 10 },
    { k: 1600, xCm: 5, m: 200, h: 15 },
    { k: 2000, xCm: 2, m: 90, h: 20 },
    { k: 900, xCm: 10, m: 45, h: 12 },
    { k: 1500, xCm: 4, m: 150, h: 14 },
  ];
  springWork.forEach(({ k, xCm, m, h }) => {
    const xM = xCm / 100;
    const spE = Number((0.5 * k * xM * xM).toFixed(2));
    const pe = Number((m * 9.8 * h).toFixed(1));
    const pumpPower = Number((pe / 10).toFixed(1));
    const spAns = `${toBnDigits(spE)} J`;
    const peAns = `${toBnDigits(pe)} J`;
    const pwrAns = `${toBnDigits(pumpPower)} W`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(k)} N/m বল ধ্রুবকের একটি স্প্রিংকে সাম্যাবস্থা থেকে ${toBnDigits(xCm)} cm সংকুচিত করলে এতে সঞ্চিত বিভবশক্তি কত জুল?`,
        correct: spAns,
        distractors: uniqueDists(spAns, [
          `${toBnDigits(Number((spE * 2).toFixed(2)))} J`,
          `${toBnDigits(Number((spE * 10).toFixed(2)))} J`,
          `${toBnDigits(Number((spE / 2).toFixed(2)))} J`,
          `${toBnDigits(Number((spE + 1.5).toFixed(2)))} J`,
          `${toBnDigits(Number((spE + 3.25).toFixed(2)))} J`,
        ]),
        explanation: `স্প্রিং বিভবশক্তি U = ½kx² = ০.৫ × ${toBnDigits(k)} × (${toBnDigits(xM)})² = ${toBnDigits(spE)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · স্প্রিংয়ের শক্তি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(m)} kg ভরের একটি বস্তুকে ভূমি থেকে ${toBnDigits(h)} m উচ্চতায় তুলতে অভিকর্ষ বলের বিরুদ্ধে কৃতকাজ কত জুল? (g = ৯.৮ m/s²)`,
        correct: peAns,
        distractors: uniqueDists(peAns, [
          `${toBnDigits(Number((m * h).toFixed(1)))} J`,
          `${toBnDigits(Number((pe * 2).toFixed(1)))} J`,
          `${toBnDigits(Number((pe / 2).toFixed(1)))} J`,
          `${toBnDigits(Number((pe + 98).toFixed(1)))} J`,
          `${toBnDigits(Number((pe + 196).toFixed(1)))} J`,
        ]),
        explanation: `কৃতকাজ W = mgh = ${toBnDigits(m)} × ৯.৮ × ${toBnDigits(h)} = ${toBnDigits(pe)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · অভিকর্ষীয় বিভবশক্তি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `একটি পাম্প ১০ সেকেন্ডে ${toBnDigits(m)} kg পানি ${toBnDigits(h)} m উচ্চতায় তুলতে পারলে পাম্পটির কার্যকর ক্ষমতা কত ওয়াট? (g = ৯.৮ m/s²)`,
        correct: pwrAns,
        distractors: uniqueDists(pwrAns, [
          `${toBnDigits(pe)} W`,
          `${toBnDigits(Number((pumpPower * 2).toFixed(1)))} W`,
          `${toBnDigits(Number((pumpPower / 2).toFixed(1)))} W`,
          `${toBnDigits(Number((pumpPower + 120).toFixed(1)))} W`,
          `${toBnDigits(Number((pumpPower + 45).toFixed(1)))} W`,
        ]),
        explanation: `ক্ষমতা P = mgh/t = (${toBnDigits(m)} × ৯.৮ × ${toBnDigits(h)}) / ১০ = ${toBnDigits(pumpPower)} W।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · পাম্পের ক্ষমতা',
      })
    );
  });

  // 6. Gravitation, Escape Velocity & Variation of g (Ch 6) — 30 MCQs
  const gHeightRatios: Array<{ mult: string; factor: number; ratioText: string }> = [
    { mult: 'পৃথিবীর ব্যাসার্ধের সমান (h = R)', factor: 0.25, ratioText: 'g/4 (এক-চতুর্থাংশ)' },
    { mult: 'পৃথিবীর ব্যাসার্ধের দ্বিগুণ (h = 2R)', factor: 0.111, ratioText: 'g/9 (এক-নবমাংশ)' },
    { mult: 'পৃথিবীর ব্যাসার্ধের তিনগুণ (h = 3R)', factor: 0.0625, ratioText: 'g/16 (ষোলো ভাগের এক ভাগ)' },
    { mult: 'পৃথিবীর ব্যাসার্ধের অর্ধেক (h = R/2)', factor: 0.444, ratioText: '4g/9' },
    { mult: 'পৃথিবীর অভ্যন্তরে অর্ধেক গভীরতায় (d = R/2)', factor: 0.5, ratioText: 'g/2 (অর্ধেক)' },
    { mult: 'পৃথিবীর কেন্দ্রে (d = R)', factor: 0, ratioText: 'শূন্য (0)' },
    { mult: 'পৃথিবীর অভ্যন্তরে এক-তৃতীয়াংশ গভীরতায় (d = R/3)', factor: 0.667, ratioText: '2g/3' },
    { mult: 'পৃথিবীর অভ্যন্তরে তিন-চতুর্থাংশ গভীরতায় (d = 3R/4)', factor: 0.25, ratioText: 'g/4' },
    { mult: 'পৃথিবীর ব্যাসার্ধের চারগুণ উচ্চতায় (h = 4R)', factor: 0.04, ratioText: 'g/25' },
    { mult: 'ভূপৃষ্ঠে (h = 0, d = 0)', factor: 1, ratioText: 'সর্বোচ্চ g (৯.৮ m/s²)' },
  ];
  const gOpts = ['g/4', 'g/9', 'g/16', '4g/9', 'g/2', 'শূন্য (0)', '2g/3', 'g/25', '৯.৮ m/s²'];
  gHeightRatios.forEach((gr, idx) => {
    const val = Number((9.8 * gr.factor).toFixed(2));
    const valAns = `${toBnDigits(val)} m/s²`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `ভূপৃষ্ঠে g = ৯.৮ m/s² হলে ${gr.mult} অবস্থানে অভিকর্ষজ ত্বরণের আনুমানিক মান কত m/s²?`,
        correct: valAns,
        distractors: uniqueDists(valAns, [
          `${toBnDigits(Number((9.8 * (gr.factor === 0 ? 0.5 : 1 - gr.factor)).toFixed(2)))} m/s²`,
          `${toBnDigits(Number((val + 1.96).toFixed(2)))} m/s²`,
          `${toBnDigits(Number((val + 3.25).toFixed(2)))} m/s²`,
          `${toBnDigits(Number((val + 4.9).toFixed(2)))} m/s²`,
          '৯.৮১ m/s²',
        ]),
        explanation: `সূত্র: উচ্চতায় g' = g(R/(R+h))² এবং গভীরতায় g' = g(1 - d/R); এক্ষেত্রে মান ${gr.ratioText} ≈ ${valAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · অভিকর্ষজ ত্বরণের পরিবর্তন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${gr.mult} অবস্থানে অভিকর্ষজ ত্বরণ ভূপৃষ্ঠের ত্বরণ g-এর কত অংশ হয়?`,
        correct: gr.ratioText,
        distractors: uniqueDists(
          gr.ratioText,
          [1, 2, 4, 5, 7].map((o) => gOpts[(idx + o) % gOpts.length])
        ),
        explanation: `${gr.mult} অবস্থানে g' = ${gr.ratioText}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · উচ্চতা ও গভীরতায় g',
      })
    );
  });

  const planetEscapes: Array<{ name: string; mRatio: number; rRatio: number; vEsc: number }> = [
    { name: 'পৃথিবী (M_E, R_E)', mRatio: 1, rRatio: 1, vEsc: 11.2 },
    { name: 'চাঁদ', mRatio: 0.0123, rRatio: 0.273, vEsc: 2.38 },
    { name: 'মঙ্গল গ্রহ', mRatio: 0.107, rRatio: 0.532, vEsc: 5.03 },
    { name: 'বৃহস্পতি গ্রহ', mRatio: 317.8, rRatio: 11.2, vEsc: 59.5 },
    { name: 'সূর্য', mRatio: 333000, rRatio: 109, vEsc: 617.7 },
    { name: 'এমন গ্রহ যার ভর পৃথিবীর ৪ গুণ ও ব্যাসার্ধ সমান', mRatio: 4, rRatio: 1, vEsc: 22.4 },
    { name: 'এমন গ্রহ যার ভর পৃথিবীর ৯ গুণ ও ব্যাসার্ধ সমান', mRatio: 9, rRatio: 1, vEsc: 33.6 },
    { name: 'এমন গ্রহ যার ভর পৃথিবীর সমান ও ব্যাসার্ধ ৪ গুণ', mRatio: 1, rRatio: 4, vEsc: 5.6 },
    { name: 'এমন গ্রহ যার ভর পৃথিবীর ৮ গুণ ও ব্যাসার্ধ ২ গুণ', mRatio: 8, rRatio: 2, vEsc: 22.4 },
    { name: 'এমন গ্রহ যার ঘনত্ব পৃথিবীর সমান ও ব্যাসার্ধ দ্বিগুণ', mRatio: 8, rRatio: 2, vEsc: 22.4 },
  ];
  planetEscapes.forEach((pe) => {
    const ans = `${toBnDigits(pe.vEsc)} km/s`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${pe.name}-এর পৃষ্ঠ থেকে কোনো বস্তুর মুক্তিবেগ (Escape Velocity) প্রায় কত km/s?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((pe.vEsc / 2).toFixed(2)))} km/s`,
          `${toBnDigits(Number((pe.vEsc * 2).toFixed(2)))} km/s`,
          `${toBnDigits(Number((pe.vEsc / 1.414).toFixed(2)))} km/s`,
          `${toBnDigits(Number((pe.vEsc + 4.5).toFixed(2)))} km/s`,
          `${toBnDigits(Number((pe.vEsc + 9.2).toFixed(2)))} km/s`,
        ]),
        explanation: `মুক্তিবেগ v_e = √(2GM/R); অনুপাত √(${toBnDigits(pe.mRatio)}/${toBnDigits(pe.rRatio)}) × ১১.২ ≈ ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · মুক্তিবেগ',
      })
    );
  });

  // 7. Elasticity, Capillary Rise & Surface Tension (Ch 7) — 24 MCQs
  const youngCases: Array<{ f: number; l: number; dlMm: number; aMm2: number }> = [
    { f: 100, l: 2, dlMm: 1, aMm2: 1 },
    { f: 200, l: 2, dlMm: 2, aMm2: 1 },
    { f: 500, l: 1, dlMm: 0.5, aMm2: 2 },
    { f: 400, l: 3, dlMm: 1.5, aMm2: 2 },
    { f: 600, l: 2, dlMm: 1.2, aMm2: 1 },
    { f: 800, l: 1.5, dlMm: 2, aMm2: 3 },
    { f: 1000, l: 2, dlMm: 1, aMm2: 2 },
    { f: 1200, l: 3, dlMm: 1.8, aMm2: 2 },
  ];
  youngCases.forEach(({ f, l, dlMm, aMm2 }) => {
    const stressMPa = Number((f / aMm2).toFixed(1));
    const strain = Number((dlMm / (l * 1000)).toExponential(2));
    const yGPa = Number(((f * l) / (aMm2 * dlMm)).toFixed(1));
    const stressAns = `${toBnDigits(stressMPa)} MPa`;
    const yAns = `${toBnDigits(yGPa)}×১০⁹ N/m²`;
    const uDens = Number((0.5 * stressMPa * 1e6 * (dlMm / (l * 1000))).toFixed(0));
    const uAns = `${toBnDigits(uDens)} J/m³`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(aMm2)} mm² প্রস্থচ্ছেদের তারে ${toBnDigits(f)} N বল প্রয়োগ করলে তারে সৃষ্ট পীড়ন (Stress) কত MPa (×১০⁶ N/m²)?`,
        correct: stressAns,
        distractors: uniqueDists(stressAns, [
          `${toBnDigits(Number((stressMPa * 2).toFixed(1)))} MPa`,
          `${toBnDigits(Number((stressMPa / 2).toFixed(1)))} MPa`,
          `${toBnDigits(Number((stressMPa + 50).toFixed(1)))} MPa`,
          `${toBnDigits(Number((stressMPa + 125).toFixed(1)))} MPa`,
          `${toBnDigits(Number((f * aMm2).toFixed(1)))} MPa`,
        ]),
        explanation: `পীড়ন = F/A = ${toBnDigits(f)} N / (${toBnDigits(aMm2)}×১০⁻⁶ m²) = ${toBnDigits(stressMPa)} MPa।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পীড়ন',
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
        question: `${toBnDigits(l)} m দৈর্ঘ্য ও ${toBnDigits(aMm2)} mm² প্রস্থচ্ছেদের একটি তারে ${toBnDigits(f)} N বল প্রয়োগে দৈর্ঘ্য ${toBnDigits(dlMm)} mm বৃদ্ধি পেলে উপাদানের ইয়ং-এর গুণাঙ্ক Y কত?`,
        correct: yAns,
        distractors: uniqueDists(yAns, [
          `${toBnDigits(Number((yGPa * 2).toFixed(1)))}×১০⁹ N/m²`,
          `${toBnDigits(Number((yGPa / 2).toFixed(1)))}×১০⁹ N/m²`,
          `${toBnDigits(Number((yGPa + 100).toFixed(1)))}×১০⁹ N/m²`,
          `${toBnDigits(Number((yGPa + 45).toFixed(1)))}×১০⁹ N/m²`,
          `${toBnDigits(yGPa)}×১০¹¹ N/m²`,
        ]),
        explanation: `Y = (FL)/(Al) = (${toBnDigits(f)} × ${toBnDigits(l)}) / (${toBnDigits(aMm2)}×১০⁻⁶ × ${toBnDigits(dlMm)}×১০⁻³) = ${yAns} (বিকৃতি = ${strain})।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · ইয়ং-এর গুণাঙ্ক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(l)} m তারে ${toBnDigits(f)} N বলে (${toBnDigits(aMm2)} mm² প্রস্থচ্ছেদ) দৈর্ঘ্য ${toBnDigits(dlMm)} mm বাড়লে তারের একক আয়তনে সঞ্চিত স্থিতিস্থাপক বিভবশক্তি কত?`,
        correct: uAns,
        distractors: uniqueDists(uAns, [
          `${toBnDigits(uDens * 2)} J/m³`,
          `${toBnDigits(Math.round(uDens / 2))} J/m³`,
          `${toBnDigits(uDens + 2500)} J/m³`,
          `${toBnDigits(uDens + 5000)} J/m³`,
          `${toBnDigits(Math.max(100, uDens - 1500))} J/m³`,
        ]),
        explanation: `একক আয়তনে শক্তি u = ½ × পীড়ন × বিকৃতি = ${uAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · স্থিতিস্থাপক শক্তি',
      })
    );
  });

  // 8. SHM Equations, Pendulum Clocks & Spring Oscillators (Ch 8) — 30 MCQs
  const shmEqs: Array<{ amp: number; omega: number; phiText: string }> = [
    { amp: 0.1, omega: 10, phiText: 'π/6' },
    { amp: 0.2, omega: 5, phiText: 'π/4' },
    { amp: 0.05, omega: 20, phiText: 'π/3' },
    { amp: 0.4, omega: 4, phiText: 'π/2' },
    { amp: 0.5, omega: 6, phiText: '0' },
    { amp: 0.15, omega: 10, phiText: 'π/6' },
    { amp: 0.25, omega: 8, phiText: 'π/4' },
    { amp: 0.08, omega: 25, phiText: 'π/3' },
    { amp: 0.12, omega: 15, phiText: '0' },
    { amp: 0.3, omega: 10, phiText: 'π/2' },
  ];
  shmEqs.forEach(({ amp, omega, phiText }) => {
    const vmax = Number((amp * omega).toFixed(2));
    const amax = Number((amp * omega * omega).toFixed(2));
    const tPeriod = Number(((2 * Math.PI) / omega).toFixed(3));
    const vAns = `${toBnDigits(vmax)} m/s`;
    const aAns = `${toBnDigits(amax)} m/s²`;
    const tAns = `${toBnDigits(tPeriod)} s`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি সরল ছন্দিত স্পন্দনের সমীকরণ x = ${toBnDigits(amp)} sin(${toBnDigits(omega)}t + ${phiText}) m হলে কণাটির সর্বোচ্চ বেগ কত m/s?`,
        correct: vAns,
        distractors: uniqueDists(vAns, [
          `${toBnDigits(amax)} m/s`,
          `${toBnDigits(Number((vmax * 2).toFixed(2)))} m/s`,
          `${toBnDigits(Number((vmax / 2).toFixed(2)))} m/s`,
          `${toBnDigits(Number((vmax + 1.5).toFixed(2)))} m/s`,
          `${toBnDigits(amp)} m/s`,
        ]),
        explanation: `সর্বোচ্চ বেগ v_max = ωA = ${toBnDigits(omega)} × ${toBnDigits(amp)} = ${vAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM সর্বোচ্চ বেগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `x = ${toBnDigits(amp)} sin(${toBnDigits(omega)}t + ${phiText}) m সমীকরণের ক্ষেত্রে কণাটির সর্বোচ্চ ত্বরণের মান কত m/s²?`,
        correct: aAns,
        distractors: uniqueDists(aAns, [
          `${toBnDigits(vmax)} m/s²`,
          `${toBnDigits(Number((amax * 2).toFixed(2)))} m/s²`,
          `${toBnDigits(Number((amax / 2).toFixed(2)))} m/s²`,
          `${toBnDigits(Number((amax + 5).toFixed(2)))} m/s²`,
          `${toBnDigits(Number((amax + 12).toFixed(2)))} m/s²`,
        ]),
        explanation: `সর্বোচ্চ ত্বরণ a_max = ω²A = ${toBnDigits(omega)}² × ${toBnDigits(amp)} = ${aAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM সর্বোচ্চ ত্বরণ',
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
        question: `একটি সরল ছন্দিত স্পন্দনের কৌণিক কম্পাঙ্ক ω = ${toBnDigits(omega)} rad/s এবং বিস্তার ${toBnDigits(amp)} m হলে পর্যায়কাল T প্রায় কত সেকেন্ড?`,
        correct: tAns,
        distractors: uniqueDists(tAns, [
          `${toBnDigits(Number((tPeriod * 2).toFixed(3)))} s`,
          `${toBnDigits(Number((tPeriod / 2).toFixed(3)))} s`,
          `${toBnDigits(Number((omega / (2 * Math.PI)).toFixed(3)))} s`,
          `${toBnDigits(Number((tPeriod + 0.5).toFixed(3)))} s`,
          `${toBnDigits(Number((tPeriod + 1.1).toFixed(3)))} s`,
        ]),
        explanation: `পর্যায়কাল T = 2π/ω = ২π/${toBnDigits(omega)} ≈ ${tAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · পর্যায়কাল নির্ণয়',
      })
    );
  });

  // 9. Sound Intensity Level (dB), Beats & Organ Pipes (Ch 9) — 30 MCQs
  const dbLevels: Array<{ multText: string; ratio: number; db: number }> = [
    { multText: '১০ গুণ', ratio: 10, db: 10 },
    { multText: '১০০ গুণ', ratio: 100, db: 20 },
    { multText: '১,০০০ গুণ', ratio: 1000, db: 30 },
    { multText: '১০,০০০ গুণ', ratio: 10000, db: 40 },
    { multText: '১,০০,০০০ গুণ', ratio: 100000, db: 50 },
    { multText: '১০⁶ গুণ', ratio: 1000000, db: 60 },
    { multText: '১০⁸ গুণ', ratio: 100000000, db: 80 },
    { multText: '১০¹⁰ গুণ', ratio: 1e10, db: 100 },
    { multText: '১০¹² গুণ (ব্যথা সীমা)', ratio: 1e12, db: 120 },
    { multText: '২ গুণ', ratio: 2, db: 3.01 },
  ];
  dbLevels.forEach((d) => {
    const ans = `${toBnDigits(d.db)} dB`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `কোনো শব্দের তীব্রতা প্রমাণ তীব্রতা I₀ (১০⁻¹² W/m²)-এর চেয়ে ${d.multText} হলে শব্দের তীব্রতা লেভেল কত ডেসিবেল (dB) হবে?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((d.db * 2).toFixed(2)))} dB`,
          `${toBnDigits(Number((d.db / 2).toFixed(2)))} dB`,
          `${toBnDigits(Number((d.db + 15).toFixed(2)))} dB`,
          `${toBnDigits(Number((d.db + 25).toFixed(2)))} dB`,
          `${toBnDigits(Math.max(1, Number((d.db - 5).toFixed(2))))} dB`,
        ]),
        explanation: `β = 10 log₁₀(I/I₀) = 10 log₁₀(${d.ratio}) = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তীব্রতা লেভেল',
      })
    );
  });

  const organPipes: Array<{ lenCm: number; v: number }> = [
    { lenCm: 50, v: 340 },
    { lenCm: 25, v: 340 },
    { lenCm: 85, v: 340 },
    { lenCm: 100, v: 340 },
    { lenCm: 40, v: 320 },
    { lenCm: 80, v: 320 },
    { lenCm: 50, v: 330 },
    { lenCm: 30, v: 330 },
    { lenCm: 60, v: 336 },
    { lenCm: 42, v: 336 },
  ];
  organPipes.forEach(({ lenCm, v }) => {
    const lM = lenCm / 100;
    const fClosed = Number((v / (4 * lM)).toFixed(1));
    const fOpen = Number((v / (2 * lM)).toFixed(1));
    const closedAns = `${toBnDigits(fClosed)} Hz`;
    const openAns = `${toBnDigits(fOpen)} Hz`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(lenCm)} cm দীর্ঘ একটি একমুখ বদ্ধ অর্গান নলের মূল সুরের কম্পাঙ্ক কত Hz? (শব্দের বেগ v = ${toBnDigits(v)} m/s)`,
        correct: closedAns,
        distractors: uniqueDists(closedAns, [
          openAns,
          `${toBnDigits(Number((fClosed * 3).toFixed(1)))} Hz`,
          `${toBnDigits(Number((fClosed / 2).toFixed(1)))} Hz`,
          `${toBnDigits(Number((fClosed + 40).toFixed(1)))} Hz`,
          `${toBnDigits(Number((fClosed + 75).toFixed(1)))} Hz`,
        ]),
        explanation: `একমুখ বদ্ধ নলের মূল সুর f₁ = v/(4L) = ${toBnDigits(v)} / (৪ × ${toBnDigits(lM)}) = ${closedAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · বদ্ধ অর্গান নল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(lenCm)} cm দীর্ঘ উভয়মুখ খোলা একটি অর্গান নলের মূল সুরের কম্পাঙ্ক কত Hz? (বায়ুতে শব্দের বেগ ${toBnDigits(v)} m/s)`,
        correct: openAns,
        distractors: uniqueDists(openAns, [
          closedAns,
          `${toBnDigits(Number((fOpen * 2).toFixed(1)))} Hz`,
          `${toBnDigits(Number((fOpen + 55).toFixed(1)))} Hz`,
          `${toBnDigits(Number((fOpen + 110).toFixed(1)))} Hz`,
          `${toBnDigits(Number((fOpen / 4).toFixed(1)))} Hz`,
        ]),
        explanation: `উভয়মুখ খোলা নলের মূল সুর f₁ = v/(2L) = ${toBnDigits(v)} / (২ × ${toBnDigits(lM)}) = ${openAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · খোলা অর্গান নল',
      })
    );
  });

  // 10. Ideal Gas: Degrees of Freedom, Kinetic Energy & Relative Humidity (Ch 10) — 36 MCQs
  const gasTypes: Array<{ gas: string; dof: number; gamma: string; cv: string; cp: string }> = [
    { gas: 'এক-পরমাণুক গ্যাস (যেমন: He, Ar, Ne)', dof: 3, gamma: '1.67 (5/3)', cv: '(3/2)R', cp: '(5/2)R' },
    { gas: 'দ্বি-পরমাণুক গ্যাস (স্বাভাবিক তাপমাত্রায়: H₂, N₂, O₂)', dof: 5, gamma: '1.40 (7/5)', cv: '(5/2)R', cp: '(7/2)R' },
    { gas: 'বহু-পরমাণুক / অরৈখিক ত্রি-পরমাণুক গ্যাস (যেমন: CH₄, H₂O বাষ্প)', dof: 6, gamma: '1.33 (4/3)', cv: '3R', cp: '4R' },
    { gas: 'উচ্চ তাপমাত্রায় কম্পনসহ দ্বি-পরমাণুক গ্যাস', dof: 7, gamma: '1.29 (9/7)', cv: '(7/2)R', cp: '(9/2)R' },
  ];
  const dofPool = ['৩টি', '৫টি', '৬টি', '৭টি', '২টি', '৪টি'];
  const gammaPool = ['1.67 (5/3)', '1.40 (7/5)', '1.33 (4/3)', '1.29 (9/7)', '1.50 (3/2)', '2.00'];
  const cvPool = ['(3/2)R', '(5/2)R', '3R', '(7/2)R', 'R', '2R'];
  gasTypes.forEach((gt, idx) => {
    const dofAns = `${toBnDigits(gt.dof)}টি`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${gt.gas}-এর একটি অণুর স্বাধীনতার মাত্রা (Degrees of Freedom) কয়টি?`,
        correct: dofAns,
        distractors: uniqueDists(dofAns, dofPool),
        explanation: `${gt.gas}-এর স্বাধীনতার মাত্রা f = ${toBnDigits(gt.dof)}।`,
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
        difficulty: 'medical',
        question: `${gt.gas}-এর ক্ষেত্রে মোলার আপেক্ষিক তাপদ্বয়ের অনুপাত γ (= Cp/Cv)-এর মান কত?`,
        correct: gt.gamma,
        distractors: uniqueDists(gt.gamma, gammaPool),
        explanation: `γ = 1 + 2/f; এখানে f = ${toBnDigits(gt.dof)} হওয়ায় γ = ${gt.gamma}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · মোলার আপেক্ষিক তাপের অনুপাত',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${gt.gas}-এর স্থির আয়তনে মোলার আপেক্ষিক তাপ Cv-এর মান কত? (ইঙ্গিত সূচক: ${toBnDigits(idx + 1)})`,
        correct: gt.cv,
        distractors: uniqueDists(gt.cv, cvPool),
        explanation: `Cv = (f/2)R = ${gt.cv} এবং Cp = Cv + R = ${gt.cp}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · সমবিভাজন নীতি',
      })
    );
  });

  const humidityCases: Array<{ f: number; F: number }> = [
    { f: 12, F: 24 },
    { f: 15, F: 25 },
    { f: 18, F: 30 },
    { f: 14, F: 20 },
    { f: 16, F: 20 },
    { f: 9, F: 15 },
    { f: 18, F: 24 },
    { f: 21, F: 28 },
    { f: 10.5, F: 15 },
    { f: 13.5, F: 18 },
    { f: 16.5, F: 22 },
    { f: 19.5, F: 26 },
  ];
  humidityCases.forEach(({ f, F }) => {
    const rh = Number(((f / F) * 100).toFixed(1));
    const rhAns = `${toBnDigits(rh)}%`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'board',
        question: `কোনো স্থানে শিশিরাঙ্কে সম্পৃক্ত জলীয়বাষ্প চাপ f = ${toBnDigits(f)} mmHg এবং বায়ুর তাপমাত্রায় সম্পৃক্ত জলীয়বাষ্প চাপ F = ${toBnDigits(F)} mmHg হলে ঐ স্থানের আপেক্ষিক আর্দ্রতা কত?`,
        correct: rhAns,
        distractors: uniqueDists(rhAns, [
          `${toBnDigits(Number((100 - rh).toFixed(1)))}%`,
          `${toBnDigits(Number((rh / 2).toFixed(1)))}%`,
          `${toBnDigits(Number(Math.min(99, rh + 12).toFixed(1)))}%`,
          `${toBnDigits(Number(Math.max(10, rh - 14).toFixed(1)))}%`,
          `${toBnDigits(Number(Math.min(98, rh + 8).toFixed(1)))}%`,
        ]),
        explanation: `আপেক্ষিক আর্দ্রতা R = (f/F) × ১০০% = (${toBnDigits(f)}/${toBnDigits(F)}) × ১০০% = ${rhAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · আপেক্ষিক আর্দ্রতা',
      })
    );
  });

  // 11. High-Yield Physics 1st Paper Ch 1–10 Concept & Pitfall Matrix (60 entries × 4 angles = 240 MCQs)
  const matrixTopics: Array<{
    ch:
      | 'phys1_ch1_measurement'
      | 'phys1_ch2_vector'
      | 'phys1_ch3_dynamics'
      | 'phys1_ch4_newtonian'
      | 'phys1_ch5_work_energy'
      | 'phys1_ch6_gravitation'
      | 'phys1_ch7_matter'
      | 'phys1_ch8_periodic_motion'
      | 'phys1_ch9_waves'
      | 'phys1_ch10_ideal_gas';
    vl: 'circuits_optics' | 'thermodynamics';
    topic: string;
    principle: string;
    trap: string;
    valueNote: string;
  }> = [
    { ch: 'phys1_ch1_measurement', vl: 'circuits_optics', topic: 'আলোকবর্ষ (Light Year) ও পারসেক', principle: 'দুটিই জ্যোতির্বিদ্যার বৃহৎ দৈর্ঘ্য বা দূরত্বের একক (সময়ের একক নয়)', trap: '১ পারসেক = ৩.২৬ আলোকবর্ষ = ৩.০৮×১০¹⁶ m', valueNote: '১ আলোকবর্ষ ≈ ৯.৪৬×১০¹⁵ m' },
    { ch: 'phys1_ch1_measurement', vl: 'circuits_optics', topic: 'তাৎপর্যপূর্ণ অঙ্কসংখ্যা (Significant Figures)', principle: 'অশূন্য অঙ্কের মধ্যবর্তী শূন্য এবং দশমিকের ডানদিকের শেষ শূন্য তাৎপর্যপূর্ণ হিসেবে গণ্য হয়', trap: 'দশমিকের আগে ও পরে অগ্রবর্তী শূন্য (০.০০৪৫-এ তিনটি শূন্য) তাৎপর্যপূর্ণ নয়', valueNote: '২.৩০-এ তাৎপর্যপূর্ণ অঙ্ক ৩টি, কিন্তু ২৩০০-তে ২টি' },
    { ch: 'phys1_ch1_measurement', vl: 'circuits_optics', topic: 'এককের আন্তর্জাতিক পদ্ধতি (SI মৌলিক একক)', principle: 'মোট ৭টি মৌলিক একক—দৈর্ঘ্য, ভর, সময়, তাপমাত্রা, তড়িৎ প্রবাহ, দীপন তীব্রতা ও পদার্থের পরিমাণ', trap: 'কোণ (radian) ও ঘনকোণ (steradian) মৌলিক নয় বরং সম্পূরক (Supplementary) একক', valueNote: 'ক্যান্ডেলা (cd) দীপন তীব্রতার মৌলিক একক' },
    { ch: 'phys1_ch1_measurement', vl: 'circuits_optics', topic: 'গোলীয় তলের বক্রতার ব্যাসার্ধ পরিমাপক যন্ত্র', principle: 'স্ফেরোমিটারের সাহায্যে উত্তল বা অবতল লেন্সের বক্রতার ব্যাসার্ধ ও সূক্ষ্ম পাতের পুরুত্ব মাপা হয়', trap: 'স্ফেরোমিটারের ৩টি স্থির পা ও ১টি চলমান মধ্যবর্তী স্ক্রু থাকে', valueNote: 'বক্রতার ব্যাসার্ধ R = d²/(6h) + h/2' },
    { ch: 'phys1_ch1_measurement', vl: 'circuits_optics', topic: 'পুনরাবৃত্তি ত্রুটি বনাম যান্ত্রিক ত্রুটি', principle: 'দৈব ত্রুটি (Random error) বারবার পাঠ নিয়ে গড় করে কমানো যায়, কিন্তু পদ্ধতিগত বা যান্ত্রিক ত্রুটি যায় না', trap: 'যন্ত্রের শূন্য ত্রুটি (Zero Error) হলো পদ্ধতিগত ত্রুটি (Systematic Error)', valueNote: 'লঘিষ্ঠ গণন যত ছোট পরিমাপের যথার্থতা তত বেশি' },
    { ch: 'phys1_ch1_measurement', vl: 'circuits_optics', topic: 'মাত্রা সমীকরণের সীমাবদ্ধতা', principle: 'মাত্রা বিশ্লেষণ দিয়ে সমীকরণের সত্যতা যাচাই করা গেলেও মাত্রাহীন ধ্রুবকের মান নির্ণয় করা যায় না', trap: 'ত্রিকোণমিতিক, লগারিদমিক ও সূচকীয় ফাংশন মাত্রাবিহীন রাশি', valueNote: 'কোণ ও বিকৃতি মাত্রাহীন হলেও এদের একক যথাক্রমে রেডিয়ান ও এককহীন' },

    { ch: 'phys1_ch2_vector', vl: 'circuits_optics', topic: 'শূন্য ভেক্টর (Null Vector)', principle: 'যার মান শূন্য এবং সুনির্দিষ্ট কোনো দিক নেই, বিপরীত ভেক্টরের যোগফলে উৎপন্ন হয়', trap: 'স্থির কণার বেগ ও সমবেগে গতিশীল বস্তুর ত্বরণ শূন্য ভেক্টরের উদাহরণ', valueNote: 'দুটি সমান ভেক্টরের মধ্যবর্তী কোণ ১৮০° হলে লব্ধি শূন্য হয়' },
    { ch: 'phys1_ch2_vector', vl: 'circuits_optics', topic: 'ভেক্টর অপারেটর ডেল (∇) ও গ্রেডিয়েন্ট', principle: 'কোনো স্কেলার ক্ষেত্রের গ্রেডিয়েন্ট (∇φ) সর্বদা একটি ভেক্টর রাশি যা সর্বাধিক বৃদ্ধির দিক নির্দেশ করে', trap: 'ভেক্টর ক্ষেত্রের ডাইভারজেন্স (∇·V) স্কেলার, কিন্তু কার্ল (∇×V) ভেক্টর রাশি', valueNote: 'কার্ল শূন্য (∇×V = 0) হলে ভেক্টর ক্ষেত্রটি সংরক্ষণশীল বা অঘূর্ণনশীল হয়' },
    { ch: 'phys1_ch2_vector', vl: 'circuits_optics', topic: 'সোলেনয়েডাল (Solenoidal) ভেক্টর ক্ষেত্র', principle: 'কোনো ভেক্টর ক্ষেত্রের ডাইভারজেন্স শূন্য (∇·V = 0) হলে তাকে সোলেনয়েডাল ক্ষেত্র বলে', trap: 'চৌম্বক ক্ষেত্রের ডাইভারজেন্স সর্বদা শূন্য (∇·B = 0) অর্থাৎ একক চৌম্বক মেরুর অস্তিত্ব নেই', valueNote: 'ধনাত্মক ডাইভারজেন্স উৎস (Source) এবং ঋণাত্মক ডাইভারজেন্স সিঙ্ক (Sink) নির্দেশ করে' },
    { ch: 'phys1_ch2_vector', vl: 'circuits_optics', topic: 'নদী পারাপারে ন্যূনতম সময় ও ন্যূনতম দূরত্ব', principle: 'ন্যূনতম সময়ে নদী পার হতে স্রোতের সাথে ঠিক ৯০° কোণে নৌকা চালাতে হয়', trap: 'সোজা বিপরীত বিন্দুতে পৌঁছাতে স্রোতের বেগের বিপরীতমুখী স্থূলকোণে (>৯০°) নৌকা চালাতে হয়', valueNote: 'ন্যূনতম দূরত্ব কেবল তখনই সম্ভব যখন নৌকার বেগ স্রোতের বেগের চেয়ে বেশি (v > u)' },
    { ch: 'phys1_ch2_vector', vl: 'circuits_optics', topic: 'ভেক্টর গুণনের বিনিময় ও বণ্টন ধর্ম', principle: 'স্কেলার (ডট) গুণন বিনিময় সূত্র মেনে চলে (A·B = B·A), কিন্তু ভেক্টর (ক্রস) গুণন মানে না', trap: 'A × B = −(B × A); দিক পরস্পরের বিপরীত হয়', valueNote: 'সমতলীয় দুটি ভেক্টরের ক্রস গুণফল শূন্য হলে তারা পরস্পর সমান্তরাল বা বিপরীতমুখী' },
    { ch: 'phys1_ch2_vector', vl: 'circuits_optics', topic: 'তিনটি সমমানের ভেক্টরের লব্ধি শূন্য হওয়ার শর্ত', principle: 'সমমানের তিনটি ভেক্টর পরস্পর ১২০° কোণে ক্রিয়া করলে তাদের লব্ধি শূন্য হয়', trap: 'ত্রিভুজ সূত্র অনুযায়ী তিনটি বাহুর যোগফল শূন্য হতে যেকোনো দুটির যোগফল তৃতীয়টির চেয়ে বড় বা সমান হতে হবে', valueNote: 'যেমন: ২, ৩ ও ৬ একক মানের তিনটি ভেক্টরের লব্ধি কখনো শূন্য হতে পারে না' },

    { ch: 'phys1_ch3_dynamics', vl: 'circuits_optics', topic: 'গ্যালিলিওর পড়ন্ত বস্তুর সূত্র ও বিজোড় সংখ্যার নিয়ম', principle: 'স্থির অবস্থা থেকে মুক্তভাবে পড়ন্ত বস্তু সমান সময়ে যে দূরত্ব অতিক্রম করে তার অনুপাত ১ : ৩ : ৫ : ৭ : ...', trap: '১ম, ২য় ও ৩য় সেকেন্ডে অতিক্রান্ত মোট দূরত্বের অনুপাত ১ : ৪ : ৯ (n²), কিন্তু ঐ একক সেকেন্ডে অতিক্রান্ত দূরত্বের অনুপাত ১ : ৩ : ৫', valueNote: 't-তম সেকেন্ডে অতিক্রান্ত দূরত্ব s_t = u + ½g(2t - 1)' },
    { ch: 'phys1_ch3_dynamics', vl: 'circuits_optics', topic: 'প্রাসের গতিপথে সর্বোচ্চ বিন্দুতে বেগ ও ত্বরণের কোণ', principle: 'প্রাসের সর্বোচ্চ উচ্চতায় উল্লম্ব বেগ শূন্য হলেও অনুভূমিক বেগ v₀cosθ থাকে এবং অভিকর্ষজ ত্বরণ নিচের দিকে কাজ করে', trap: 'প্রাসের সর্বোচ্চ বিন্দুতে বেগ ও ত্বরণের মধ্যবর্তী কোণ ৯০° (গতিশক্তি শূন্য নয় বরং ½mv₀²cos²θ)', valueNote: 'নিক্ষেপণ কোণ ৪৫° হলে অনুভূমিক পাল্লা সর্বাধিক এবং R = 4H হয়' },
    { ch: 'phys1_ch3_dynamics', vl: 'circuits_optics', topic: 'সমান অনুভূমিক পাল্লার দুটি নিক্ষেপণ কোণ', principle: 'একই আদিবেগে θ ও (৯০°−θ) কোণে নিক্ষেপ করলে উভয় প্রাসের অনুভূমিক পাল্লা সমান হয়', trap: 'যেমন ৩০° ও ৬০° কোণে পাল্লা সমান, তবে ৬০° কোণে সর্বোচ্চ উচ্চতা ও বিচরণকাল বেশি হবে', valueNote: 'অনুভূমিক পাল্লার সাধারণ সম্পর্ক R = 4H cotθ' },
    { ch: 'phys1_ch3_dynamics', vl: 'circuits_optics', topic: 'সরণ-সময় ও বেগ-সময় লেখচিত্রের ঢাল ও ক্ষেত্রফল', principle: 'সরণ-সময় (s–t) লেখচিত্রের ঢাল বেগ নির্দেশ করে এবং বেগ-সময় (v–t) লেখচিত্রের ঢাল ত্বরণ নির্দেশ করে', trap: 'v–t লেখচিত্র ও সময় অক্ষের মধ্যবর্তী ক্ষেত্রফল মোট সরণ এবং গতিপথের দূরত্ব দেয়', valueNote: 'a–t লেখচিত্রের ক্ষেত্রফল বেগের পরিবর্তন (Δv) নির্দেশ করে' },
    { ch: 'phys1_ch3_dynamics', vl: 'circuits_optics', topic: 'তাৎক্ষণিক বেগ ও গড় বেগের সমতা', principle: 'সুষম বেগে গতিশীল বস্তুর গড় বেগ ও তাৎক্ষণিক বেগ সর্বদা সমান হয়', trap: 'সমত্বরণে গতিশীল বস্তুর গড় বেগ = (u + v)/2 কেবল সুষম ত্বরণের ক্ষেত্রে প্রযোজ্য', valueNote: 'বস্তু বৃত্তাকার পথে ১ বার ঘুরে এলে গড় দ্রুতি ধনাত্মক হলেও গড় বেগ শূন্য হয়' },
    { ch: 'phys1_ch3_dynamics', vl: 'circuits_optics', topic: 'বন্দুকের গুলি তক্তা ভেদ করার অঙ্ক', principle: 'একটি গুলি v বেগে ১টি তক্তা ভেদ করতে পারলে ২v বেগে অনুরূপ ৪টি তক্তা ভেদ করতে পারবে (n ∝ v²)', trap: 'অর্ধেক বেগ হারালে গুলিটি বাকি দূরত্বের মাত্র এক-তৃতীয়াংশ দূরত্ব অতিক্রম করে থেমে যাবে', valueNote: 'কাজ-শক্তি উপপাদ্য থেকে Fs = ½mv² পাওয়া যায়' },

    { ch: 'phys1_ch4_newtonian', vl: 'circuits_optics', topic: 'বলের ঘাত (Impulse) ও ভরবেগের পরিবর্তন', principle: 'অল্প সময় ধরে ক্রিয়াশীল বৃহৎ বল ও তার ক্রিয়াকালের গুণফল (J = FΔt) বস্তুর ভরবেগের পরিবর্তনের সমান', trap: 'বলের ঘাতের মাত্রা [MLT⁻¹] ও একক N·s যা রৈখিক ভরবেগের সমান', valueNote: 'বল-সময় (F–t) লেখচিত্রের ক্ষেত্রফলই হলো বলের ঘাত' },
    { ch: 'phys1_ch4_newtonian', vl: 'circuits_optics', topic: 'রকেটের ধাক্কা (Rocket Thrust) ও পরিবর্তনশীল ভর', principle: 'রকেট গ্যাস নির্গমনের হার (dm/dt) ও রকেটের সাপেক্ষে গ্যাসের আপেক্ষিক বেগ (v_rel)-এর গুণফলই হলো ঊর্ধ্বমুখী ধাক্কা', trap: 'রকেট ভরবেগের নিত্যতা সূত্র মেনে মহাশূন্যে (বাতাসহীন স্থানেও) চলতে পারে', valueNote: 'ধাক্কা বল F = v_rel × (Δm/Δt)' },
    { ch: 'phys1_ch4_newtonian', vl: 'circuits_optics', topic: 'রাস্তার ব্যাংকিং ও কেন্দ্রমুখী বল', principle: 'গাড়ি নিরাপদে বাঁক নেওয়ার সময় রাস্তার বাইরের প্রান্ত ভেতরের চেয়ে উঁচু রাখাকে ব্যাংকিং বলে; ব্যাংকিং কোণ tanθ = v²/(rg)', trap: 'ব্যাংকিং কোণ গাড়ির ভরের ওপর নির্ভর করে না, কেবল বেগ ও বাঁকের ব্যাসার্ধের ওপর নির্ভরশীল', valueNote: 'সমতল রাস্তায় কেবল ঘর্ষণ বলের কারণে সর্বোচ্চ নিরাপদ বেগ v = √(μ_s rg)' },
    { ch: 'phys1_ch4_newtonian', vl: 'circuits_optics', topic: 'স্থিতিস্থাপক ও অস্থিতিস্থাপক সংঘর্ষ', principle: 'স্থিতিস্থাপক সংঘর্ষে মোট ভরবেগ এবং মোট গতিশক্তি উভয়ই সংরক্ষিত থাকে (প্রত্যাগমন গুণাঙ্ক e = ১)', trap: 'অস্থিতিস্থাপক সংঘর্ষে ভরবেগ সংরক্ষিত থাকলেও গতিশক্তি তাপ বা শব্দে রূপান্তরিত হয়ে হ্রাস পায়', valueNote: 'সমান ভরের দুটি বস্তুর মুখোমুখি স্থিতিস্থাপক সংঘর্ষে তারা বেগ বিনিময় করে' },
    { ch: 'phys1_ch4_newtonian', vl: 'circuits_optics', topic: 'সমান্তরাল ও লম্ব অক্ষ উপপাদ্য (Moment of Inertia)', principle: 'সমান্তরাল অক্ষ উপপাদ্য I = I_cm + Md² যেকোনো আকৃতির বস্তুর জন্য প্রযোজ্য, কিন্তু লম্ব অক্ষ উপপাদ্য (I_z = I_x + I_y) শুধু সমতল পাতের জন্য প্রযোজ্য', trap: 'গোলকের মতো ত্রিমাত্রিক বস্তুতে সরাসরি I_z = I_x + I_y খাটে না', valueNote: 'পাতলা দণ্ডের কেন্দ্রগামী লম্ব অক্ষের সাপেক্ষে I = ML²/12 এবং প্রান্তবিন্দুগামী অক্ষে ML²/3' },
    { ch: 'phys1_ch4_newtonian', vl: 'circuits_optics', topic: 'রোলিং গতি (Rolling Motion without Slipping)', principle: 'আনত তলে না পিছলে গড়িয়ে নামা বস্তুর মোট গতিশক্তি = রৈখিক গতিশক্তি + ঘূর্ণন গতিশক্তি', trap: 'একই উচ্চতা থেকে নিরেট গোলক, নিরেট সিলিন্ডার ও রিং ছেড়ে দিলে নিরেট গোলক সবার আগে নিচে পৌঁছাবে (K²/R² সর্বনিম্ন ২/৫)', valueNote: 'রিং-এর K²/R² = ১ সর্বোচ্চ হওয়ায় এটি সবার শেষে পৌঁছাবে' },

    { ch: 'phys1_ch5_work_energy', vl: 'circuits_optics', topic: 'কেন্দ্রমুখী বল দ্বারা কৃতকাজ', principle: 'বৃত্তাকার পথে ঘূর্ণনরত বস্তুর ওপর কেন্দ্রমুখী বল সর্বদা বেগের লম্ব দিকে ক্রিয়া করে বলে কৃতকাজ শূন্য হয়', trap: 'সূর্যের চারদিকে পৃথিবীর ঘূর্ণন বা ইলেকট্রনের কক্ষপথে ঘূর্ণনে কেন্দ্রমুখী বল কোনো কাজ করে না', valueNote: 'cos(90°) = 0 হওয়ায় W = F·s cos90° = 0' },
    { ch: 'phys1_ch5_work_energy', vl: 'circuits_optics', topic: 'সংরক্ষণশীল বল বনাম অসংরক্ষণশীল বল', principle: 'সংরক্ষণশীল বলে (মহাকর্ষ, স্থির তড়িৎ, স্প্রিং বল) বদ্ধ পথে মোট কৃতকাজ শূন্য এবং কাজ পথের ওপর নির্ভর করে না', trap: 'ঘর্ষণ বল, সান্দ্র বল ও বায়ুর বাধা হলো অসংরক্ষণশীল বল—এতে যান্ত্রিক শক্তি তাপে অপচয় হয়', valueNote: 'সংরক্ষণশীল বল F = -dU/dx' },
    { ch: 'phys1_ch5_work_energy', vl: 'circuits_optics', topic: 'অশ্বক্ষমতা (Horsepower) ও ওয়াটের সম্পর্ক', principle: '১ মেট্রিক বা প্রচলিত ব্রিটিশ অশ্বক্ষমতা (1 HP) সমান ৭৪৬ ওয়াট (W)', trap: '১ কিলোওয়াট-ঘণ্টা (1 kWh বা ১ ইউনিট বিদ্যুৎ) ক্ষমতার একক নয়, এটি ৩.৬×১০⁶ জুল শক্তির একক', valueNote: 'ওয়াট-ঘণ্টা শক্তির একক, ওয়াট ক্ষমতার একক' },
    { ch: 'phys1_ch5_work_energy', vl: 'circuits_optics', topic: 'ভরবেগ ও গতিশক্তির অনুপাতীয় সম্পর্ক', principle: 'কোনো বস্তুর রৈখিক ভরবেগ দ্বিগুণ করলে গতিশক্তি ৪ গুণ (E_k = p²/2m) হয়', trap: 'একই ভরবেগের হালকা ও ভারী বস্তুর মধ্যে হালকা বস্তুর গতিশক্তি বেশি (E_k ∝ 1/m)', valueNote: 'একই গতিশক্তির দুটি বস্তুর মধ্যে ভারী বস্তুটির ভরবেগ বেশি (p = √(2mE_k))' },
    { ch: 'phys1_ch5_work_energy', vl: 'circuits_optics', topic: 'কুয়া থেকে পানি তোলার গড় উচ্চতা নিয়ম', principle: 'L গভীরতার পূর্ণ কুয়া সম্পূর্ণ খালি করতে পানির ভরকেন্দ্রের গড় সরণ L/2 ধরা হয়', trap: 'কুয়াটি অর্ধেক পূর্ণ থাকলে খালি করতে গড় সরণ (L/2 + L)/2 = 3L/4 নিতে হয়', valueNote: 'কৃতকাজ W = m × g × h_cm' },
    { ch: 'phys1_ch5_work_energy', vl: 'circuits_optics', topic: 'স্প্রিং কেটে দুটুকরা করলে স্প্রিং ধ্রুবকের পরিবর্তন', principle: 'একটি স্প্রিংকে সমান ২ ভাগ করলে প্রতি খণ্ডের স্প্রিং ধ্রুবক মূল স্প্রিংয়ের দ্বিগুণ (k′ = 2k) হয় (k ∝ 1/L)', trap: 'দুটি স্প্রিং শ্রেণিতে যুক্ত করলে তুল্য ধ্রুবক কমে (1/k_s = 1/k₁ + 1/k₂) এবং সমান্তরালে বাড়ে (k_p = k₁ + k₂)', valueNote: 'স্প্রিংয়ের বল-সরণ লেখচিত্রের ঢাল হলো k এবং ক্ষেত্রফল সঞ্চিত শক্তি ½kx²' },

    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', topic: 'মহাশূন্যে পৃথিবীর আকার ও g-এর মান পরিবর্তন', principle: 'মেরু অঞ্চলে পৃথিবীর ব্যাসার্ধ কম ও ঘূর্ণন বেগ শূন্য বলে g-এর মান সর্বাধিক (৯.৮৩ m/s²)', trap: 'বিষুব অঞ্চলে ব্যাসার্ধ বেশি ও কেন্দ্রবিমুখী প্রভাব সর্বাধিক বলে g-এর মান সর্বনিম্ন (৯.৭৮ m/s²)', valueNote: 'পৃথিবীর ঘূর্ণন বন্ধ হয়ে গেলে বিষুব অঞ্চলে g বাড়বে, কিন্তু মেরু অঞ্চলে কোনো পরিবর্তন হবে না' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', topic: 'মহাকর্ষীয় বিভব (V) ও প্রাবল্য (E)', principle: 'অসীম থেকে একক ভরের বস্তুকে মহাকর্ষীয় ক্ষেত্রের কোনো বিন্দুতে আনতে কৃতকাজকে মহাকর্ষীয় বিভব (V = -GM/r) বলে', trap: 'মহাকর্ষীয় বিভব সর্বদা ঋণাত্মক এবং অসীমে এর মান সর্বোচ্চ (শূন্য)', valueNote: 'পৃথিবীর কেন্দ্রে মহাকর্ষীয় প্রাবল্য শূন্য হলেও বিভব অশূন্য (-3GM/2R)' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', topic: 'কৃত্রিম উপগ্রহের মোট যান্ত্রিক শক্তি', principle: 'বৃত্তাকার কক্ষপথে ঘূর্ণনশীল উপগ্রহের গতিশক্তি K = +GMm/(2r) এবং বিভবশক্তি U = -GMm/r', trap: 'মোট শক্তি E = -GMm/(2r) ঋণাত্মক হওয়াই প্রমাণ করে উপগ্রহটি পৃথিবীর সাথে আবদ্ধ', valueNote: 'উপগ্রহের উচ্চতা বাড়লে কক্ষীয় বেগ কমে কিন্তু পর্যায়কাল ও মোট শক্তি বৃদ্ধি পায়' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', topic: 'কেপলারের দ্বিতীয় সূত্র (ক্ষেত্রফল সূত্র)', principle: 'গ্রহ ও সূর্যকে সংযোগকারী ব্যাসার্ধ-ভেক্টর সমান সময়ে সমান ক্ষেত্রফল অতিক্রম করে (dA/dt = L/2m = ধ্রুবক)', trap: 'কেপলারের ২য় সূত্র কৌণিক ভরবেগের নিত্যতা সূত্রের প্রত্যক্ষ ফলাফল', valueNote: 'গ্রহ সূর্যের নিকটবর্তী হলে (অনুসূর অবস্থানে) কক্ষীয় দ্রুতি সর্বোচ্চ হয়' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', topic: 'পার্কিং কক্ষপথ বা জিও-স্টেশনারি স্যাটেলাইটের উচ্চতা', principle: 'পৃথিবী পৃষ্ঠ থেকে প্রায় ৩৫,৭৮৬ km (≈ ৩৬,০০০ km) উচ্চতায় কক্ষপথের পর্যায়কাল ২৪ ঘণ্টা হয়', trap: 'জিও-স্টেশনারি উপগ্রহ নিরক্ষীয় তলে পশ্চিম থেকে পূর্বে আবর্তন করে বলে ভূমি থেকে স্থির দেখায়', valueNote: 'বঙ্গবন্ধু-১ স্যাটেলাইট ১১৯.১° পূর্ব দ্রাঘিমায় একটি জিও-স্টেশনারি উপগ্রহ' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', topic: 'পৃথিবীর চারদিকে কোনো গ্রহের মুক্তিবেগ ও কণার ভর', principle: 'কোনো গ্রহের পৃষ্ঠ থেকে মুক্তিবেগ v_e = √(2gR), যা উৎক্ষিপ্ত বস্তুর ভর বা নিক্ষেপণ কোণের ওপর নির্ভর করে না', trap: '৪৫°, ৬০° বা ৯০° যে কোণেই ১১.২ km/s বেগে নিক্ষেপ করা হোক, বস্তু পৃথিবীর আকর্ষণ ছাড়িয়ে যাবে', valueNote: 'বস্তুকে ০° (অনুভূমিক) কোণে ৭.৯২ km/s বেগে ছুড়লে সেটি পৃথিবীর কৃত্রিম উপগ্রহে পরিণত হয়' },

    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', topic: 'পয়সনের অনুপাত (Poisson’s Ratio σ)', principle: 'স্থিতিস্থাপক সীমার মধ্যে পার্শ্ব বিকৃতি ও দৈর্ঘ্য বিকৃতির অনুপাতকে পয়সনের অনুপাত বলে', trap: 'σ একটি মাত্রাবিহীন ও এককবিহীন সংখ্যা; এর তাত্ত্বিক সীমা −১ থেকে +০.৫ (ব্যবহারিক সীমা ০ থেকে ০.৫)', valueNote: 'সবচেয়ে বেশি σ ≈ ০.৪৮ রাবারের এবং শূন্যের কাছাকাছি কর্কের' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', topic: 'ইস্পাত ও রাবারের মধ্যে অধিক স্থিতিস্থাপক কোনটি', principle: 'একই বিকৃতি ঘটাতে রাবারের তুলনায় ইস্পাতে অনেক বেশি পীড়ন দিতে হয় বলে ইস্পাতের ইয়ং-এর গুণাঙ্ক (২×১০¹¹ N/m²) বেশি', trap: 'রাবার বেশি প্রসারিত হয় বলে অনেকে ভুল করে রাবারকে বেশি স্থিতিস্থাপক ভাবে—প্রকৃতপক্ষে ইস্পাত অধিক স্থিতিস্থাপক', valueNote: 'তাপমাত্রা বাড়লে সাধারণত পদার্থের স্থিতিস্থাপক গুণাঙ্ক কমে যায় (ব্যতিক্রম ইনভার স্টিল)' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', topic: 'পৃষ্ঠটান ও পৃষ্ঠশক্তির সংখ্যাগত সমতা', principle: 'তরলের পৃষ্ঠের একক ক্ষেত্রফল বৃদ্ধি করতে কৃতকাজই হলো পৃষ্ঠশক্তি, যার সাংখ্যিক মান পৃষ্ঠটানের (T) সমান', trap: 'একটি বড় তরল বিন্দু ভেঙে Nটি ছোট বিন্দু হলে মোট পৃষ্ঠের ক্ষেত্রফল বাড়ে বলে তাপমাত্রা কমে (শীতল হয়)', valueNote: 'বিপরীতক্রমে Nটি ছোট বিন্দু মিশে বড় বিন্দু হলে তাপশক্তি মুক্ত হয় ও উষ্ণতা বাড়ে' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', topic: 'সাবান মিশ্রিত পানি ও স্পর্শ কোণ (Angle of Contact)', principle: 'বিশুদ্ধ পানি ও পরিষ্কার কাচের স্পর্শ কোণ ০°, কিন্তু সাধারণ পানি ও কাচের প্রায় ৮° (সূক্ষ্মকোণ)', trap: 'পারদ ও কাচের স্পর্শ কোণ স্থূলকোণ (প্রায় ১৩৮°–১৪০°), তাই পারদ কাচকে ভেজায় না এবং কৈশিক নলে নিচে নেমে যায়', valueNote: 'ডিটারজেন্ট বা গরম পানি ব্যবহারে পানির পৃষ্ঠটান কমে যাওয়ায় কাপড় সহজে পরিষ্কার হয়' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', topic: 'সান্দ্রতা গুণাঙ্ক (η) ও তাপমাত্রার বিপরীত প্রভাব', principle: 'তাপমাত্রা বাড়ালে তরলের সান্দ্রতা কমে যায় (আন্তঃআণবিক আকর্ষণ হ্রাস পায়), কিন্তু গ্যাসের সান্দ্রতা বেড়ে যায়', trap: 'গ্যাসে তাপমাত্রা বাড়লে অণুগুলোর ভরবেগ বিনিময়ের হার (η ∝ √T) বাড়ে বলে সান্দ্রতা বৃদ্ধি পায়', valueNote: 'স্টোকসের সূত্র অনুযায়ী গোলকের প্রান্তীয় বেগ v_t ∝ r² (ব্যাসার্ধের বর্গের সমানুপাতিক)' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', topic: 'আন্তঃআণবিক বল ও স্ফটিকাকার বনাম অদানাদার কঠিন', principle: 'কঠিন পদার্থের অণুগুলোর মধ্যে দূরত্ব r₀ হলে আকর্ষণ ও বিকর্ষণ বল সমান (নিট বল শূন্য ও বিভবশক্তি সর্বনিম্ন) হয়', trap: 'কাচ, প্লাস্টিক ও পিচ প্রকৃত কঠিন নয়, এগুলো হলো অতিশীতল তরল বা অ্যামরফাস কঠিন', valueNote: 'একটি অণুকে অপর অণু থেকে আলাদা করার শক্তির পরিমাপই হলো বন্ধন শক্তি' },

    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', topic: 'দোলনরত সরল দোলকের কার্যকর দৈর্ঘ্য ও ঋতু পরিবর্তন', principle: 'গ্রীষ্মকালে তাপমাত্রা বৃদ্ধিতে ধাতব দোলকের দৈর্ঘ্য L বাড়ায় দোলনকাল T বাড়ে (দোলক ধীরে চলে ও ঘড়ি স্লো হয়)', trap: 'শীতকালে দৈর্ঘ্য কমায় T কমে, অর্থাৎ দোলক দ্রুত চলে এবং ঘড়ি ফাস্ট হয়', valueNote: 'পাহাড়ের চূড়ায় বা খনির গভীরে g কমায় দোলনকাল বাড়ে ও ঘড়ি ধীরে চলে' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', topic: 'লিফটে থাকা সরল দোলকের দোলনকাল', principle: 'লিফট a ত্বরণে ওপরে উঠলে কার্যকর অভিকর্ষজ ত্বরণ (g + a) বাড়ে বলে দোলনকাল কমে যায়', trap: 'লিফটের দড়ি ছিঁড়ে মুক্তভাবে পড়লে (a = g) কার্যকর ত্বরণ শূন্য ও দোলনকাল অসীম (∞) হয়ে দোলা বন্ধ হয়ে যায়', valueNote: 'সেকেন্ড দোলকের স্বাভাবিক দোলনকাল ২ সেকেন্ড এবং কার্যকর দৈর্ঘ্য প্রায় ০.৯৯৩ m' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', topic: 'ফাঁপা গোলক পূর্ণ ও অর্ধপূর্ণ পানির দোলক', principle: 'পানিভর্তি ফাঁপা গোলক দোলকের নিচ দিয়ে পানি চুইয়ে পড়তে থাকলে প্রথমে ভরকেন্দ্র নিচে নেমে L বাড়ায় T বাড়ে', trap: 'সব পানি পড়ে সম্পূর্ণ খালি হয়ে গেলে ভরকেন্দ্র পুনরায় গোলকের কেন্দ্রে ফিরে আসায় T আগের মানে ফিরে আসে', valueNote: 'অর্থাৎ দোলনকাল প্রথমে বাড়ে এবং পরে কমে প্রাথমিক মানে আসে' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', topic: 'SHM-এ বেগ ও ত্বরণের মধ্যকার দশা পার্থক্য', principle: 'সরণের সাপেক্ষে বেগ π/2 (৯০°) দশায় এগিয়ে থাকে এবং ত্বরণ π (১৮০°) দশায় বিপরীতমুখী থাকে', trap: 'সর্বোচ্চ অবস্থানে (x = ±A) কণাটি ক্ষণিকের জন্য স্থির (বেগ শূন্য) কিন্তু ত্বরণ ও প্রত্যয়নী বল সর্বোচ্চ থাকে', valueNote: 'সাম্যাবস্থানে (x = 0) ত্বরণ শূন্য হলেও বেগ ও গতিশক্তি সর্বাধিক' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', topic: 'দোলকের বিস্তারের পরিবর্তন ও সমকাল সূত্র', principle: '৪° বা ক্ষুদ্র কৌণিক বিস্তারের মধ্যে সরল দোলকের দোলনকাল ববের ভর, উপাদান এবং বিস্তারের ওপর নির্ভর করে না', trap: 'একটি দোলকে একজনের পাশে আরেকজন দোলনায় বসলেও দোলনকাল বদলায় না, তবে দাঁড়িয়ে গেলে ভরকেন্দ্র ওপরে ওঠায় L কমে T কমে', valueNote: 'বড় বিস্তারে দোলনকাল সামান্য বৃদ্ধি পায়' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', topic: 'SHM-এ বিভবশক্তি ও গতিশক্তি সমান হওয়ার অবস্থান', principle: 'সাম্যাবস্থা থেকে x = ±A/√2 (প্রায় ০.৭০৭ A) দূরত্বে গতিশক্তি ও বিভবশক্তি পরস্পর সমান হয়', trap: 'x = ±A/2 অবস্থানে গতিশক্তি মোট শক্তির ৭৫% (৩/৪) এবং বিভবশক্তি ২৫% (১/৪) হয়', valueNote: 'SHM-এ গড় গতিশক্তি ও গড় বিভবশক্তি উভয়ই মোট শক্তির অর্ধেক (¼ kA²)' },

    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', topic: 'শব্দের তীব্রতা (I), বিস্তার (A) ও কম্পাঙ্কের (f) সম্পর্ক', principle: 'তরঙ্গের তীব্রতা মাধ্যমের ঘনত্ব ρ, বেগ v, কম্পাঙ্কের বর্গ f² এবং বিস্তারের বর্গ A²-এর সমানুপাতিক (I = 2π²ρvf²A²)', trap: 'বিস্তার দ্বিগুণ করলে তীব্রতা ৪ গুণ হয়, কিন্তু কম্পাঙ্ক দ্বিগুণ করলেও তীব্রতা ৪ গুণ বাড়ে', valueNote: 'শব্দের তীব্রতা লেভেল ১ dB বাড়াতে তীব্রতা প্রায় ২৬% (১.২৬ গুণ) বাড়াতে হয়' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', topic: 'বায়ুর চাপ ও আর্দ্রতার প্রভাবে শব্দের বেগ', principle: 'আদর্শ গ্যাস ধরে নিলে একই তাপমাত্রায় বায়ুর চাপ পরিবর্তনের ফলে শব্দের বেগের কোনো পরিবর্তন হয় না', trap: 'বায়ুতে জলীয়বাষ্প বাড়লে (আর্দ্রতা বেশি হলে) বায়ুর গড় ঘনত্ব কমে যায় বলে বর্ষাকালে শব্দের বেগ বৃদ্ধি পায়', valueNote: 'কঠিন মাধ্যমে (যেমন ইস্পাতে ~৫,১০০ m/s) শব্দের বেগ সবচেয়ে বেশি, গ্যাসে সবচেয়ে কম' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', topic: 'অগ্রগামী তরঙ্গ বনাম স্থির তরঙ্গ (Standing Wave)', principle: 'অগ্রগামী তরঙ্গ শক্তি স্থানান্তর করে, কিন্তু স্থির তরঙ্গের মাধ্যমে কোনো শক্তি আবদ্ধ সীমার বাইরে সঞ্চালিত হয় না', trap: 'স্থির তরঙ্গে পরপর দুটি নিস্পন্দ বিন্দু (Node) বা পরপর দুটি সুস্পন্দ বিন্দুর (Antinode) মধ্যবর্তী দূরত্ব λ/2', valueNote: 'একটি নিস্পন্দ ও নিকটতম সুস্পন্দ বিন্দুর দূরত্ব λ/4' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', topic: 'একমুখ বদ্ধ নল বনাম উভয়মুখ খোলা নলের উপসুর', principle: 'উভয়মুখ খোলা নলে যুগ্ম ও অযুগ্ম সব হারমোনিক (১ : ২ : ৩ : ৪) পাওয়া যায়, কিন্তু বদ্ধ নলে কেবল অযুগ্ম হারমোনিক (১ : ৩ : ৫ : ৭) পাওয়া যায়', trap: 'খোলা নলের ২য় হারমোনিক হলো ১ম উপসুর, কিন্তু বদ্ধ নলের ৩য় হারমোনিক হলো ১ম উপসুর', valueNote: 'তাই একই দৈর্ঘ্যের খোলা নলের শব্দের গুণ বা টিম্বার বদ্ধ নলের চেয়ে সমৃদ্ধ ও শ্রুতিমধুর' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', topic: 'বিট বা স্বরকম্প ও অজানা সুরশলাকার কম্পাঙ্ক নির্ণয়', principle: 'কাছাকাছি কম্পাঙ্কের দুটি সুরশলাকা একত্রে শব্দের পর্যায়ক্রমিক হ্রাস-বৃদ্ধি ঘটায়; প্রতি সেকেন্ডে বিট সংখ্যা N = |f₁ − f₂|', trap: 'অজানা শলাকার বাহুতে মোম লাগালে ভর বাড়ে তাই কম্পাঙ্ক কমে; ফাইল দিয়ে ঘষে হালকা করলে কম্পাঙ্ক বাড়ে', valueNote: 'তারের টান T বাড়ালে কম্পাঙ্ক f ∝ √T অনুসারে বৃদ্ধি পায়' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', topic: 'আলোক তরঙ্গ বনাম শব্দ তরঙ্গে সমবর্তন (Polarization)', principle: 'শব্দ বায়ুতে অনুদৈর্ঘ্য তরঙ্গ বলে শব্দের সমবর্তন (Polarization) ঘটে না, কিন্তু আলোর (আড় তরঙ্গ) সমবর্তন ঘটে', trap: 'প্রতিফলন, প্রতিসরণ, ব্যতিচার ও অপবর্তন শব্দ এবং আলো উভয় তরঙ্গেই ঘটে থাকে', valueNote: 'কেবল সমবর্তন ধর্ম প্রমাণ করে যে তরঙ্গটি অনুপ্রস্থ (Transverse)' },

    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', topic: 'সমোষ্ণ লেখ ও বয়েলের সূত্রের লেখচিত্র (PV vs P)', principle: 'স্থির তাপমাত্রায় P–V লেখচিত্র সমপরাবৃত্ত (Rectangular Hyperbola), কিন্তু আদর্শ গ্যাসের PV বনাম P লেখচিত্র অনুভূমিক সরলরেখা', trap: 'চাপ-আয়তন লেখচিত্রের বয়েল রেখাগুলো তাপমাত্রা বাড়ার সাথে মূলবিন্দু থেকে দূরে সরে যায়', valueNote: 'চাপ স্থির থাকলে V বনাম T(°C) লেখচিত্র −২৭৩.১৫ °C বিন্দুগামী সরলরেখা' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', topic: 'পরম আর্দ্রতা বনাম আপেক্ষিক আর্দ্রতা ও আরাম', principle: 'একক আয়তন বায়ুতে উপস্থিত জলীয়বাষ্পের ভরকে পরম আর্দ্রতা (kg/m³) বলে, কিন্তু মানুষের স্বাচ্ছন্দ্য নির্ভর করে আপেক্ষিক আর্দ্রতার ওপর', trap: 'শিশিরাঙ্ক বলতে এমন তাপমাত্রাকে বোঝায় যে তাপমাত্রায় বায়ু উপস্থিত জলীয়বাষ্প দ্বারা সম্পৃক্ত হয়', valueNote: 'আপেক্ষিক আর্দ্রতা ১০০% হলে ঘাম শুকায় না এবং শুষ্ক ও সিক্ত বাল্ব থার্মোমিটারের পাঠ সমান হয়' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', topic: 'গ্যাসের অণুর তিন প্রকার বেগের অনুপাত (v_p : v_avg : c_rms)', principle: 'সর্বাধিক সম্ভাব্য বেগ v_p = √(2RT/M), গড় বেগ v_avg = √(8RT/πM) এবং মূল গড় বর্গবেগ c_rms = √(3RT/M)', trap: 'সর্বদা c_rms > v_avg > v_p; এদের অনুপাত √2 : √(8/π) : √3 ≈ ১ : ১.১২৮ : ১.২২৪', valueNote: 'হাইড্রোজেন সবচেয়ে হালকা হওয়ায় একই তাপমাত্রায় H₂ অণুর c_rms সর্বাধিক' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', topic: 'গড় মুক্ত পথ (Mean Free Path λ)', principle: 'দুটি পরপর সংঘর্ষের মধ্যবর্তী অতিক্রান্ত গড় দূরত্ব হলো গড় মুক্ত পথ (λ = 1 / (√2 π n d²))', trap: 'চাপ বাড়লে বা ঘনত্ব বাড়লে অণুগুলোর সংখ্যা ঘনত্ব n বাড়ে বলে গড় মুক্ত পথ কমে যায় (λ ∝ 1/P)', valueNote: 'স্থির চাপে তাপমাত্রা বাড়ালে λ ∝ T অনুসারে গড় মুক্ত পথ বৃদ্ধি পায়' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', topic: 'বাস্তব গ্যাস কখন আদর্শ গ্যাসের মতো আচরণ করে', principle: 'অত্যন্ত উচ্চ তাপমাত্রা ও অতি নিম্ন চাপে বাস্তব গ্যাসের অণুগুলোর মধ্যবর্তী আকর্ষণ ও আয়তন নগণ্য হওয়ায় আদর্শ আচরণ করে', trap: 'উচ্চ চাপ ও নিম্ন তাপমাত্রায় বাস্তব গ্যাস আদর্শ আচরণ থেকে সবচেয়ে বেশি বিচ্যুত হয়', valueNote: 'ভ্যান্ডার ওয়ালস সমীকরণে ধ্রুবক a আন্তঃআণবিক আকর্ষণ ও b অণুর নিজস্ব আয়তন সংশোধন নির্দেশ করে' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', topic: 'শিশির জমা বনাম মেঘ মুক্ত আকাশ ও সিক্ত বাল্ব পার্থক্য', principle: 'মেঘহীন পরিষ্কার রাতে ভূপৃষ্ঠ দ্রুত তাপ বিকিরণ করে শীতল হয় বলে শিশির বেশি জমে, কিন্তু মেঘলা রাতে বিকিরণ বাধা পাওয়ায় শিশির কম জমে', trap: 'শুষ্ক ও সিক্ত বাল্বের তাপমাত্রার পার্থক্য বেশি হলে আবহাওয়া শুষ্ক (দ্রুত বাষ্পীভবন ও ঘাম দ্রুত শুকায়)', valueNote: 'শুষ্ক ও সিক্ত বাল্বের পার্থক্য কম হলে ঝড়-বৃষ্টির পূর্বাভাস দেয়' },
  ];

  const topicsPool = matrixTopics.map((m) => m.topic);
  const principlesPool = matrixTopics.map((m) => m.principle);
  const trapsPool = matrixTopics.map((m) => m.trap);
  const valuesPool = matrixTopics.map((m) => m.valueNote);

  matrixTopics.forEach((m, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `"${m.topic}" বিষয়ে মৌলিক পদার্থবৈজ্ঞানিক নীতি কোনটি?`,
        correct: m.principle,
        distractors: uniqueDists(
          m.principle,
          [1, 3, 7, 11, 17].map((o) => principlesPool[(idx + o) % matrixTopics.length])
        ),
        explanation: `${m.principle}। (${m.trap})`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায়ভিত্তিক মূলনীতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${m.topic}" সংক্রান্ত ভর্তি পরীক্ষার সাধারণ বিভ্রান্তি দূর করতে কোন তথ্যটি সঠিক?`,
        correct: m.trap,
        distractors: uniqueDists(
          m.trap,
          [2, 5, 9, 13, 19].map((o) => trapsPool[(idx + o) % matrixTopics.length])
        ),
        explanation: `${m.trap}। (${m.valueNote})`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · মেডিকেল ও ভার্সিটি ট্রিকস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${m.topic}"-এর গাণিতিক সম্পর্ক বা সংখ্যাত্মক বৈশিষ্ট্য হিসেবে কোনটি নির্ভুল?`,
        correct: m.valueNote,
        distractors: uniqueDists(
          m.valueNote,
          [1, 4, 8, 12, 16].map((o) => valuesPool[(idx + o) % matrixTopics.length])
        ),
        explanation: `${m.valueNote} — ${m.principle}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · গাণিতিক সারসংক্ষেপ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `"${m.trap}" — এই গুরুত্বপূর্ণ সিদ্ধান্তটি কোন ধারণার সাথে সরাসরি জড়িত?`,
        correct: m.topic,
        distractors: uniqueDists(
          m.topic,
          [2, 6, 10, 14, 18].map((o) => topicsPool[(idx + o) % matrixTopics.length])
        ),
        explanation: `এটি "${m.topic}"-এর গুরুত্বপূর্ণ পরীক্ষার পয়েন্ট।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · চূড়ান্ত রিভিশন',
      })
    );
  });

  return list;
}
