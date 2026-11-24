import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredA(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sa_${String(seq++).padStart(4, '0')}`;

  // 1. SI Units & Dimensions Matrix (20 quantities x 2 = 40 MCQs)
  const dimMatrix = [
    { name: 'বল (Force)', unit: 'নিউটন (N = kg·m·s⁻²)', dim: '[MLT⁻²]', ch: 'phys1_mechanics' },
    { name: 'কাজ বা শক্তি (Work / Energy)', unit: 'জুল (J = N·m)', dim: '[ML²T⁻²]', ch: 'phys1_mechanics' },
    { name: 'ক্ষমতা (Power)', unit: 'ওয়াট (W = J/s)', dim: '[ML²T⁻³]', ch: 'phys1_mechanics' },
    { name: 'ভরবেগ ও বলের ঘাত (Momentum / Impulse)', unit: 'kg·m·s⁻¹ বা N·s', dim: '[MLT⁻¹]', ch: 'phys1_mechanics' },
    { name: 'টর্ক বা বলের ভ্রামক (Torque)', unit: 'N·m (ভেক্টর)', dim: '[ML²T⁻²] (টর্ক)', ch: 'phys1_mechanics' },
    { name: 'জড়তার ভ্রামক (Moment of Inertia)', unit: 'kg·m²', dim: '[ML²]', ch: 'phys1_mechanics' },
    { name: 'কৌণিক ভরবেগ (Angular Momentum)', unit: 'kg·m²·s⁻¹ বা J·s', dim: '[ML²T⁻¹]', ch: 'phys1_mechanics' },
    { name: 'কৌণিক বেগ (Angular Velocity)', unit: 'rad·s⁻¹', dim: '[T⁻¹]', ch: 'phys1_mechanics' },
    { name: 'কৌণিক ত্বরণ (Angular Acceleration)', unit: 'rad·s⁻²', dim: '[T⁻²]', ch: 'phys1_mechanics' },
    { name: 'সর্বজনীন মহাকর্ষীয় ধ্রুবক (G)', unit: 'N·m²·kg⁻²', dim: '[M⁻¹L³T⁻²]', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'মহাকর্ষীয় প্রাবল্য (Gravitational Field)', unit: 'N·kg⁻¹ বা m·s⁻²', dim: '[LT⁻²]', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'মহাকর্ষীয় বিভব (Gravitational Potential)', unit: 'J·kg⁻¹', dim: '[L²T⁻²]', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'পীড়ন ও ইয়ং-এর গুণাঙ্ক (Stress / Y)', unit: 'N·m⁻² বা Pa', dim: '[ML⁻¹T⁻²]', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'পৃষ্ঠটান ও স্প্রিং ধ্রুবক (T / k)', unit: 'N·m⁻¹', dim: '[MT⁻²]', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'সান্দ্রতা গুণাঙ্ক (Coefficient of Viscosity, η)', unit: 'Pa·s বা N·s·m⁻²', dim: '[ML⁻¹T⁻¹]', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'কম্পাঙ্ক (Frequency)', unit: 'হার্টজ (Hz = s⁻¹)', dim: '[T⁻¹] (কম্পাঙ্ক)', ch: 'phys1_ch8_9_shm_waves' },
    { name: 'শব্দের তীব্রতা (Sound Intensity)', unit: 'W·m⁻²', dim: '[MT⁻³]', ch: 'phys1_ch8_9_shm_waves' },
    { name: 'বিকৃতি ও পয়সনের অনুপাত', unit: 'এককবিহীন (Dimensionless)', dim: '[M⁰L⁰T⁰]', ch: 'phys1_ch6_7_grav_matter' },
    { name: 'সার্বজনীন গ্যাস ধ্রুবক (R)', unit: 'J·mol⁻¹·K⁻¹', dim: '[ML²T⁻²N⁻¹Θ⁻¹]', ch: 'phys1_ch10_ideal_gas' },
    { name: 'বোল্টজম্যান ধ্রুবক (k_B)', unit: 'J·K⁻¹', dim: '[ML²T⁻²Θ⁻¹]', ch: 'phys1_ch10_ideal_gas' },
  ];
  dimMatrix.forEach((dm, i) => {
    const others = dimMatrix.filter((x) => x.name !== dm.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: dm.ch,
        visualLessonId: dm.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `"${dm.name}"-এর সঠিক এসআই (SI) একক কোনটি?`,
        correct: dm.unit,
        distractors: others.slice(i % 10, (i % 10) + 5).map((x) => x.unit),
        explanation: `${dm.name}-এর এসআই একক ${dm.unit} এবং মাত্রা ${dm.dim}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · একক ও মাত্রা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: dm.ch,
        visualLessonId: dm.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${dm.name}" রাশিটির সঠিক মাত্রা সমীকরণ কোনটি?`,
        correct: dm.dim,
        distractors: others.slice((i + 3) % 10, ((i + 3) % 10) + 5).map((x) => x.dim),
        explanation: `${dm.name} = ${dm.unit}; তাই এর মাত্রা ${dm.dim}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · মাত্রা বিশ্লেষণ',
      })
    );
  });

  // 2. Scalar vs Vector Identification & Unit Prefix Multipliers (30 MCQs)
  const scalarVectorPairs = [
    { item: 'কাজ, শক্তি, ক্ষমতা, চাপ ও মহাকর্ষীয় বিভব', cls: 'স্কেলার রাশি (শুধু মান আছে, দিক নেই)' },
    { item: 'সরণ, বেগ, ত্বরণ, বল, ভরবেগ ও ওজন', cls: 'ভেক্টর রাশি (মান ও দিক উভয়ই আছে)' },
    { item: 'টর্ক, কৌণিক বেগ, কৌণিক ভরবেগ ও ক্ষেত্রফল ভেক্টর', cls: 'অক্ষীয় ভেক্টর (Axial Vector)' },
    { item: 'তড়িৎ প্রবাহ (A), তাপমাত্রা, ঘনত্ব ও আপেক্ষিক গুরুত্ব', cls: 'স্কেলার রাশি (ভেক্টর যোগের সূত্র মানে না)' },
    { item: 'তড়িৎ ক্ষেত্র প্রাবল্য (E), চৌম্বক ক্ষেত্র (B) ও তড়িৎ দ্বিমেরু ভ্রামক', cls: 'ভেক্টর রাশি (ভেক্টর যোগের সামান্তরিক সূত্র মানে)' },
  ];
  scalarVectorPairs.forEach((sv, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ভৌত রাশির শ্রেণিবিভাগ অনুযায়ী "${sv.item}" কোন শ্রেণির অন্তর্ভুক্ত?`,
        correct: sv.cls,
        distractors: [
          'স্কেলার রাশি (শুধু মান আছে, দিক নেই)',
          'ভেক্টর রাশি (মান ও দিক উভয়ই আছে)',
          'অক্ষীয় ভেক্টর (Axial Vector)',
          'মাত্রাবিহীন টেনসর রাশি',
          'নাল বা শূন্য ভেক্টর',
        ].filter((x) => x !== sv.cls),
        explanation: `${sv.item} — এরা সবাই ${sv.cls}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · স্কেলার ও ভেক্টর রাশি',
      })
    );
  });

  const prefixes = [
    { name: 'পেটা (Peta, P)', val: '১০¹⁵' },
    { name: 'টেরা (Tera, T)', val: '১০¹²' },
    { name: 'গিগা (Giga, G)', val: '১০⁹' },
    { name: 'মেগা (Mega, M)', val: '১০⁶' },
    { name: 'মাইক্রো (Micro, μ)', val: '১০⁻⁶' },
    { name: 'ন্যানো (Nano, n)', val: '১০⁻⁹' },
    { name: 'পিকো (Pico, p)', val: '১০⁻¹²' },
    { name: 'ফেমটো (Femto, f)', val: '১০⁻¹⁵' },
    { name: 'অ্যাটো (Atto, a)', val: '১০⁻¹⁸' },
  ];
  prefixes.forEach((pf, i) => {
    const others = prefixes.filter((x) => x.name !== pf.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `এসআই উপসর্গ "${pf.name}" কোন গুণিতক মান নির্দেশ করে?`,
        correct: pf.val,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.val),
        explanation: `${pf.name} এর গুণিতক মান হলো ${pf.val}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · এসআই উপসর্গ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${pf.val}" গুণিতকটির প্রচলিত এসআই উপসর্গের নাম কী?`,
        correct: pf.name,
        distractors: others.slice((i + 2) % 5, ((i + 2) % 5) + 4).map((x) => x.name),
        explanation: `${pf.val} গুণিতককে ${pf.name} বলা হয়।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · এসআই উপসর্গ',
      })
    );
  });

  // 3. Vector Resultant, Dot Product & Cross Product Numericals (~42 MCQs)
  const resultantCases = [
    { p: 3, q: 4, deg: 90, r: '৫ N', exp: '√(৩² + ৪² + ২×৩×৪×cos ৯০°) = √২৫ = ৫ N।' },
    { p: 6, q: 8, deg: 90, r: '১০ N', exp: '√(৬² + ৮²) = √১০০ = ১০ N।' },
    { p: 5, q: 5, deg: 120, r: '৫ N', exp: 'সমান ভেক্টরের মধ্যবর্তী কোণ ১২০° হলে লব্ধি R = P = ৫ N।' },
    { p: 10, q: 10, deg: 60, r: '১০√৩ N', exp: 'R = ২P cos(θ/2) = ২০ cos ৩০° = ১০√৩ N।' },
    { p: 8, q: 8, deg: 90, r: '৮√২ N', exp: '√(৮² + ৮²) = ৮√২ N।' },
    { p: 12, q: 5, deg: 0, r: '১৭ N', exp: '০° কোণে একই দিকে ক্রিয়াশীল বলে R = ১২ + ৫ = ১৭ N।' },
    { p: 12, q: 5, deg: 180, r: '৭ N', exp: '১৮০° কোণে বিপরীত দিকে ক্রিয়াশীল বলে R = ১২ − ৫ = ৭ N।' },
    { p: 10, q: 6, deg: 60, r: '১৪ N', exp: '√(১০০ + ৩৬ + ২×১০×৬×০.৫) = √১৯৬ = ১৪ N।' },
  ];
  resultantCases.forEach((rc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(rc.p)} N ও ${toBnDigits(rc.q)} N মানের দুটি বল পরস্পরের সাথে ${toBnDigits(rc.deg)}° কোণে ক্রিয়া করলে এদের লব্ধির মান কত?`,
        correct: rc.r,
        distractors: ['৫ N', '৭ N', '১০ N', '১৪ N', '১৭ N', '৮√২ N', '১০√৩ N', '২০ N'].filter((x) => x !== rc.r),
        explanation: rc.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভেক্টরের লব্ধি',
      })
    );
  });

  // Orthogonal Vector Dot Product Problems (A . B = 0)
  const orthoCases = [
    { ax: 2, ay: 3, az: -1, bx: 4, by: -2, mVal: 2, expr: '2î + 3ĵ − k̂ এবং 4î − 2ĵ + mk̂' },
    { ax: 3, ay: -2, az: 1, bx: 2, by: 4, mVal: 2, expr: '3î − 2ĵ + k̂ এবং 2î + 4ĵ + mk̂' },
    { ax: 4, ay: 2, az: -2, bx: 3, by: -3, mVal: 3, expr: '4î + 2ĵ − 2k̂ এবং 3î − 3ĵ + mk̂' },
    { ax: 5, ay: -3, az: 2, bx: 2, by: 2, mVal: -2, expr: '5î − 3ĵ + 2k̂ এবং 2î + 2ĵ + mk̂' },
    { ax: 1, ay: 4, az: -2, bx: 2, by: 1, mVal: 3, expr: 'î + 4ĵ − 2k̂ এবং 2î + ĵ + mk̂' },
    { ax: 6, ay: -4, az: 3, bx: 2, by: 6, mVal: 4, expr: '6î − 4ĵ + 3k̂ এবং 2î + 6ĵ + mk̂' },
  ];
  orthoCases.forEach((oc) => {
    const dotPart = oc.ax * oc.bx + oc.ay * oc.by;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `m-এর মান কত হলে (${oc.expr}) ভেক্টর দুটি পরস্পরের ওপর লম্ব হবে?`,
        correct: `${toBnDigits(oc.mVal)}`,
        distractors: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 6]
          .filter((x) => x !== oc.mVal)
          .map((x) => toBnDigits(x)),
        explanation: `লম্ব হলে ডট গুণফল ০ হয়: (${toBnDigits(dotPart)}) + (${toBnDigits(oc.az)})m = ০ ⇒ m = ${toBnDigits(oc.mVal)}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ডট গুণন',
      })
    );
  });

  // Magnitude of 3D Vectors (Pythagorean quadruples)
  [
    { x: 2, y: 3, z: 6, mag: 7 },
    { x: 1, y: 2, z: 2, mag: 3 },
    { x: 3, y: 4, z: 12, mag: 13 },
    { x: 2, y: -1, z: 2, mag: 3 },
    { x: 6, y: 2, z: -3, mag: 7 },
    { x: 4, y: 4, z: 7, mag: 9 },
  ].forEach((vm, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_units_vectors',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `A = ${toBnDigits(vm.x)}î + ${toBnDigits(vm.y)}ĵ + ${toBnDigits(vm.z)}k̂ ভেক্টরটির মান (|A|) কত একক?`,
        correct: `${toBnDigits(vm.mag)} একক`,
        distractors: [3, 5, 7, 9, 11, 13, 15]
          .filter((x) => x !== vm.mag)
          .map((x) => `${toBnDigits(x)} একক`),
        explanation: `|A| = √(${toBnDigits(vm.x)}² + ${toBnDigits(vm.y)}² + ${toBnDigits(vm.z)}²) = ${toBnDigits(vm.mag)} একক (ক্রম #${toBnDigits(idx + 1)})।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভেক্টরের মান',
      })
    );
  });

  // 4. Kinematics & Projectile Numericals (~48 MCQs)
  // Free fall h = 0.5*g*t^2 (using g=10 m/s^2) and v = g*t
  [
    { t: 2, v: 20, h: 20 },
    { t: 3, v: 30, h: 45 },
    { t: 4, v: 40, h: 80 },
    { t: 5, v: 50, h: 125 },
    { t: 6, v: 60, h: 180 },
  ].forEach((ff) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `স্থির অবস্থান থেকে অবাধে পড়ন্ত কোনো বস্তু (g = ১০ m/s²) ${toBnDigits(ff.t)} সেকেন্ডে কত মিটার দূরত্ব অতিক্রম করবে?`,
        correct: `${toBnDigits(ff.h)} m`,
        distractors: [10, 20, 40, 45, 60, 80, 100, 125, 180]
          .filter((x) => x !== ff.h)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `h = ½gt² = ০.৫ × ১০ × ${toBnDigits(ff.t)}² = ${toBnDigits(ff.h)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · পড়ন্ত বস্তু',
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
        question: `বাধাহীনভাবে পড়ন্ত বস্তুর ${toBnDigits(ff.t)} সেকেন্ড পর (g = ১০ m/s²) প্রাপ্ত বেগ কত m/s?`,
        correct: `${toBnDigits(ff.v)} m/s`,
        distractors: [10, 15, 20, 30, 40, 50, 60, 80]
          .filter((x) => x !== ff.v)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `v = u + gt = ০ + ১০ × ${toBnDigits(ff.t)} = ${toBnDigits(ff.v)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · পড়ন্ত বস্তু',
      })
    );
  });

  // Projectile Range / Max Height / Time of Flight (g = 10 m/s^2)
  [
    { v0: 20, deg: 30, tFlight: 2, hMax: 5 },
    { v0: 40, deg: 30, tFlight: 4, hMax: 20 },
    { v0: 20, deg: 45, rMax: 40, hMax: 10 },
    { v0: 40, deg: 45, rMax: 160, hMax: 40 },
    { v0: 60, deg: 30, tFlight: 6, hMax: 45 },
  ].forEach((pr) => {
    if (pr.tFlight !== undefined) {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_mechanics',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: 'medical',
          question: `একটি প্রাসকে ${toBnDigits(pr.v0)} m/s বেগে অনুভূমিকের সাথে ${toBnDigits(pr.deg)}° কোণে নিক্ষেপ করলে (g = ১০ m/s²) এর মোট বিচরণকাল (Time of flight) কত?`,
          correct: `${toBnDigits(pr.tFlight)} s`,
          distractors: [1, 2, 3, 4, 5, 6, 8, 10]
            .filter((x) => x !== pr.tFlight)
            .map((x) => `${toBnDigits(x)} s`),
          explanation: `T = (2v₀ sin ${toBnDigits(pr.deg)}°) / g = (2 × ${toBnDigits(pr.v0)} × ০.৫) / ১০ = ${toBnDigits(pr.tFlight)} s।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের বিচরণকাল',
        })
      );
    }
    if (pr.rMax !== undefined) {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_mechanics',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: 'medical',
          question: `${toBnDigits(pr.v0)} m/s বেগে অনুভূমিকের সাথে ৪৫° কোণে নিক্ষিপ্ত প্রাসের (g = ১০ m/s²) অনুভূমিক পাল্লা কত?`,
          correct: `${toBnDigits(pr.rMax)} m`,
          distractors: [20, 40, 60, 80, 120, 160, 200]
            .filter((x) => x !== pr.rMax)
            .map((x) => `${toBnDigits(x)} m`),
          explanation: `R_max = v₀² / g = ${toBnDigits(pr.v0)}² / ১০ = ${toBnDigits(pr.rMax)} m।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের পাল্লা',
        })
      );
    }
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(pr.v0)} m/s বেগে ${toBnDigits(pr.deg)}° কোণে নিক্ষিপ্ত একটি প্রাসের (g = ১০ m/s²) সর্বাধিক উচ্চতা (H_max) কত?`,
        correct: `${toBnDigits(pr.hMax)} m`,
        distractors: [5, 10, 15, 20, 30, 40, 45, 60]
          .filter((x) => x !== pr.hMax)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `H = (v₀² sin²${toBnDigits(pr.deg)}°) / 2g = ${toBnDigits(pr.hMax)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের সর্বোচ্চ উচ্চতা',
      })
    );
  });

  // Stopping distance v^2 = 2as (doubling speed -> 4x distance)
  [
    { factor: 2, sq: 4, d1: 10, d2: 40 },
    { factor: 3, sq: 9, d1: 5, d2: 45 },
    { factor: 2, sq: 4, d1: 20, d2: 80 },
    { factor: 3, sq: 9, d1: 10, d2: 90 },
  ].forEach((sd) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি গাড়ি নির্দিষ্ট বেগে চলার সময় ব্রেক চেপে ${toBnDigits(sd.d1)} m দূরত্বে থামে। একই মন্দনে বেগ ${toBnDigits(sd.factor)} গুণ হলে থামতে কত দূরত্ব লাগবে?`,
        correct: `${toBnDigits(sd.d2)} m`,
        distractors: [20, 30, 40, 45, 60, 80, 90, 120]
          .filter((x) => x !== sd.d2)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `সমমন্দনে থামার দূরত্ব s ∝ u²; তাই বেগ ${toBnDigits(sd.factor)} গুণ হলে দূরত্ব ${toBnDigits(sd.sq)} × ${toBnDigits(sd.d1)} = ${toBnDigits(sd.d2)} m হবে।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · গতি সমীকরণ',
      })
    );
  });

  // 5. Newton's Law, Impulse, Recoil Velocity & Centripetal Force (~36 MCQs)
  [
    { m: 5, a: 4, f: 20 },
    { m: 10, a: 3, f: 30 },
    { m: 8, a: 5, f: 40 },
    { m: 12, a: 2.5, f: 30 },
    { m: 4, a: 15, f: 60 },
  ].forEach((nf) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(nf.m)} kg ভরের কোনো স্থির বস্তুর ওপর কত বল প্রয়োগ করলে এতে ${toBnDigits(nf.a)} m/s² ত্বরণ সৃষ্টি হবে?`,
        correct: `${toBnDigits(nf.f)} N`,
        distractors: [10, 15, 20, 25, 30, 40, 50, 60]
          .filter((x) => x !== nf.f)
          .map((x) => `${toBnDigits(x)} N`),
        explanation: `F = ma = ${toBnDigits(nf.m)} × ${toBnDigits(nf.a)} = ${toBnDigits(nf.f)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · নিউটনের ২য় সূত্র',
      })
    );
  });

  // Gun recoil MV = mv
  [
    { gunM: 5, bulletG: 20, bulletV: 500, recoil: 2 },
    { gunM: 4, bulletG: 10, bulletV: 400, recoil: 1 },
    { gunM: 10, bulletG: 50, bulletV: 600, recoil: 3 },
    { gunM: 2, bulletG: 10, bulletV: 800, recoil: 4 },
  ].forEach((gr) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(gr.gunM)} kg ভরের একটি বন্দুক থেকে ${toBnDigits(gr.bulletG)} g ভরের গুলি ${toBnDigits(gr.bulletV)} m/s বেগে ছোড়া হলে বন্দুকের পশ্চাৎ বেগ কত হবে?`,
        correct: `${toBnDigits(gr.recoil)} m/s`,
        distractors: [0.5, 1, 1.5, 2, 3, 4, 5, 8]
          .filter((x) => x !== gr.recoil)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `V = mv / M = (${toBnDigits(gr.bulletG / 1000)} × ${toBnDigits(gr.bulletV)}) / ${toBnDigits(gr.gunM)} = ${toBnDigits(gr.recoil)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ভরবেগের সংরক্ষণশীলতা',
      })
    );
  });

  // Centripetal Force Fc = mv^2 / r
  [
    { m: 2, v: 6, r: 3, fc: 24 },
    { m: 4, v: 5, r: 2, fc: 50 },
    { m: 1, v: 10, r: 5, fc: 20 },
    { m: 3, v: 4, r: 2, fc: 24 },
    { m: 5, v: 6, r: 3, fc: 60 },
  ].forEach((cf) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(cf.m)} kg ভরের একটি বস্তু ${toBnDigits(cf.r)} m ব্যাসার্ধের বৃত্তাকার পথে ${toBnDigits(cf.v)} m/s সমদ্রুতিতে ঘুরলে কেন্দ্রমুখী বল কত?`,
        correct: `${toBnDigits(cf.fc)} N`,
        distractors: [12, 18, 20, 24, 36, 48, 50, 60]
          .filter((x) => x !== cf.fc)
          .map((x) => `${toBnDigits(x)} N`),
        explanation: `F_c = mv² / r = (${toBnDigits(cf.m)} × ${toBnDigits(cf.v)}²) / ${toBnDigits(cf.r)} = ${toBnDigits(cf.fc)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কেন্দ্রমুখী বল',
      })
    );
  });

  // 6. Moment of Inertia Formulas & Kinetic Energy / Spring / Power Numericals (~50 MCQs)
  const inertiaBodies = [
    { body: 'M ভর ও R ব্যাসার্ধের পাতলা বৃত্তাকার রিং (নিজ কেন্দ্রগামী লম্ব অক্ষে)', formula: 'MR²', k: 'R' },
    { body: 'M ভর ও R ব্যাসার্ধের সুষম চাকতি বা নিরেট সিলিন্ডার (নিজ অক্ষে)', formula: '½ MR²', k: 'R / √2' },
    { body: 'M ভর ও R ব্যাসার্ধের নিরেট গোলক (ব্যাসের সাপেক্ষে)', formula: '(2/5) MR²', k: '√(2/5) R' },
    { body: 'M ভর ও R ব্যাসার্ধের ফাঁপা গোলক (ব্যাসের সাপেক্ষে)', formula: '(2/3) MR²', k: '√(2/3) R' },
    { body: 'M ভর ও L দৈর্ঘ্যের সরু সুষম দণ্ড (মধ্যবিন্দুগামী লম্ব অক্ষে)', formula: '(1/12) ML²', k: 'L / √12' },
    { body: 'M ভর ও L দৈর্ঘ্যের সরু সুষম দণ্ড (এক প্রান্তগামী লম্ব অক্ষে)', formula: '(1/3) ML²', k: 'L / √3' },
  ];
  inertiaBodies.forEach((ib, i) => {
    const others = inertiaBodies.filter((x) => x.body !== ib.body);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ib.body}"-এর জড়তার ভ্রামক (I) কত?`,
        correct: ib.formula,
        distractors: others.slice(i % 2, (i % 2) + 4).map((x) => x.formula),
        explanation: `${ib.body}-এর জড়তার ভ্রামক I = ${ib.formula} এবং চক্রগতির ব্যাসার্ধ K = ${ib.k}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · জড়তার ভ্রামক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${ib.body}"-এর চক্রগতির ব্যাসার্ধ (Radius of Gyration, K) কত?`,
        correct: ib.k,
        distractors: others.slice((i + 1) % 2, ((i + 1) % 2) + 4).map((x) => x.k),
        explanation: `I = MK² ⇒ K = √(I/M) = ${ib.k}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · চক্রগতির ব্যাসার্ধ',
      })
    );
  });

  // Work & Kinetic Energy & Spring Energy & Power Numericals
  [
    { f: 20, s: 5, deg: 60, w: 50 },
    { f: 40, s: 10, deg: 60, w: 200 },
    { f: 50, s: 4, deg: 0, w: 200 },
    { f: 100, s: 3, deg: 60, w: 150 },
  ].forEach((wk) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `কোনো বস্তুর ওপর ${toBnDigits(wk.f)} N বল প্রয়োগ করায় বলের দিকের সাথে ${toBnDigits(wk.deg)}° কোণে ${toBnDigits(wk.s)} m সরণ হলে কৃতকাজ কত জুল?`,
        correct: `${toBnDigits(wk.w)} J`,
        distractors: [25, 50, 75, 100, 150, 200, 300, 400]
          .filter((x) => x !== wk.w)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `W = Fs cos θ = ${toBnDigits(wk.f)} × ${toBnDigits(wk.s)} × cos ${toBnDigits(wk.deg)}° = ${toBnDigits(wk.w)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · কাজ',
      })
    );
  });

  [
    { k: 200, xCm: 10, u: 1 },
    { k: 400, xCm: 10, u: 2 },
    { k: 1000, xCm: 20, u: 20 },
    { k: 500, xCm: 20, u: 10 },
    { k: 800, xCm: 5, u: 1 },
  ].forEach((sp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(sp.k)} N/m স্প্রিং ধ্রুবক বিশিষ্ট স্প্রিংকে (ক্রমিক #${toBnDigits(idx + 1)}) ${toBnDigits(sp.xCm)} cm প্রসারিত করলে সঞ্চিত বিভব শক্তি কত?`,
        correct: `${toBnDigits(sp.u)} J`,
        distractors: [0.5, 1, 2, 4, 5, 10, 20, 40]
          .filter((x) => x !== sp.u)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `U = ½ kx² = ০.৫ × ${toBnDigits(sp.k)} × (${toBnDigits(sp.xCm / 100)})² = ${toBnDigits(sp.u)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · স্প্রিংয়ের সঞ্চিত শক্তি',
      })
    );
  });

  // Momentum vs Kinetic Energy % increase
  [
    { pPct: '১০০% বাড়লে (দ্বিগুণ হলে)', kPct: '৩০০% বাড়ে (৪ গুণ হয়)' },
    { pPct: '২০০% বাড়লে (তিনগুণ হলে)', kPct: '৮০০% বাড়ে (৯ গুণ হয়)' },
    { pPct: '৫০% বাড়লে (১.৫ গুণ হলে)', kPct: '১২৫% বাড়ে (২.২৫ গুণ হয়)' },
    { pPct: 'অর্ধেক (৫০% কম) হলে', kPct: '৭৫% কমে (১/৪ গুণ হয়)' },
  ].forEach((kp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `নির্দিষ্ট ভরের কোনো বস্তুর রৈখিক ভরবেগ ${kp.pPct} এর গতিশক্তির কীরূপ পরিবর্তন হবে?`,
        correct: kp.kPct,
        distractors: [
          '১০০% বাড়ে (দ্বিগুণ হয়)',
          '২০০% বাড়ে (তিনগুণ হয়)',
          '৩০০% বাড়ে (৪ গুণ হয়)',
          '৮০০% বাড়ে (৯ গুণ হয়)',
          '১২৫% বাড়ে (২.২৫ গুণ হয়)',
          '৭৫% কমে (১/৪ গুণ হয়)',
          '৫০% কমে (অর্ধেক হয়)',
        ].filter((x) => x !== kp.kPct),
        explanation: `স্থির ভরের জন্য K = P²/(2m) অর্থাৎ K ∝ P²; তাই ${kp.pPct} গতিশক্তি ${kp.kPct}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · গতিশক্তি ও ভরবেগ',
      })
    );
  });

  // Pump / Motor Power P = mgh / t
  [
    { m: 200, h: 15, t: 10, p: 3000 },
    { m: 500, h: 20, t: 25, p: 4000 },
    { m: 100, h: 12, t: 6, p: 2000 },
    { m: 300, h: 10, t: 15, p: 2000 },
    { m: 600, h: 20, t: 20, p: 6000 },
  ].forEach((pw, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_mechanics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `একটি পাম্প (মডেল-${toBnDigits(idx + 1)}) ${toBnDigits(pw.t)} সেকেন্ডে ${toBnDigits(pw.m)} kg পানি ${toBnDigits(pw.h)} m উচ্চতায় তুললে (g = ১০ m/s²) কার্যকর ক্ষমতা কত কিলোওয়াট?`,
        correct: `${toBnDigits(pw.p / 1000)} kW`,
        distractors: [1, 1.5, 2, 3, 4, 5, 6, 8]
          .filter((x) => x !== pw.p / 1000)
          .map((x) => `${toBnDigits(x)} kW`),
        explanation: `P = mgh / t = (${toBnDigits(pw.m)} × ১০ × ${toBnDigits(pw.h)}) / ${toBnDigits(pw.t)} = ${toBnDigits(pw.p)} W = ${toBnDigits(pw.p / 1000)} kW।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · ক্ষমতা',
      })
    );
  });

  return list;
}
