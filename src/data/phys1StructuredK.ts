import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredK(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sk_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 1: Vernier Scale, Screw Gauge & Dimensional Analysis (~105 MCQs)
  // =========================================================================
  // 1A: Vernier Constant & Total Reading
  [
    { s: 1, n: 10, msr: 22, vsr: 4 },
    { s: 1, n: 10, msr: 35, vsr: 7 },
    { s: 1, n: 20, msr: 18, vsr: 6 },
    { s: 1, n: 20, msr: 26, vsr: 12 },
    { s: 1, n: 20, msr: 41, vsr: 14 },
    { s: 1, n: 50, msr: 15, vsr: 25 },
    { s: 1, n: 50, msr: 32, vsr: 15 },
    { s: 0.5, n: 10, msr: 12, vsr: 6 },
    { s: 0.5, n: 25, msr: 20, vsr: 10 },
    { s: 0.5, n: 25, msr: 28, vsr: 15 },
    { s: 1, n: 10, msr: 44, vsr: 3 },
    { s: 1, n: 20, msr: 52, vsr: 8 },
    { s: 1, n: 50, msr: 19, vsr: 30 },
    { s: 0.5, n: 10, msr: 25, vsr: 4 },
    { s: 0.5, n: 25, msr: 36, vsr: 20 },
  ].forEach((v, idx) => {
    const vc = Number((v.s / v.n).toFixed(3));
    const total = Number((v.msr + v.vsr * vc).toFixed(3));
    const distractorVals = [
      Number((v.msr + v.vsr * vc * 2).toFixed(3)),
      Number((v.msr + (v.vsr + 2) * vc).toFixed(3)),
      Number((v.msr + v.vsr * v.s).toFixed(3)),
      Number((v.msr - v.vsr * vc).toFixed(3)),
    ].map((x) => `${toBnDigits(x)} mm`);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি ভার্নিয়ার ক্যালিপার্সের প্রধান স্কেলের ক্ষুদ্রতম ১ ভাগের মান ${toBnDigits(v.s)} mm এবং ভার্নিয়ার স্কেলের ${toBnDigits(v.n)} ভাগ প্রধান স্কেলের ${toBnDigits(v.n - 1)} ভাগের সমান। প্রধান স্কেল পাঠ ${toBnDigits(v.msr)} mm ও ভার্নিয়ার সমপাতন ${toBnDigits(v.vsr)} হলে পরিমাপকৃত দৈর্ঘ্য কত?`,
        correct: `${toBnDigits(total)} mm`,
        distractors: distractorVals,
        explanation: `VC = ${toBnDigits(v.s)}/${toBnDigits(v.n)} = ${toBnDigits(vc)} mm; মোট পাঠ L = ${toBnDigits(v.msr)} + (${toBnDigits(v.vsr)} × ${toBnDigits(vc)}) = ${toBnDigits(total)} mm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · ভার্নিয়ার স্কেল',
      })
    );
  });

  // 1B: Screw Gauge Least Count & Diameter
  [
    { pitch: 1, div: 100, msr: 4, csr: 35 },
    { pitch: 1, div: 100, msr: 6, csr: 48 },
    { pitch: 0.5, div: 50, msr: 2.5, csr: 22 },
    { pitch: 0.5, div: 50, msr: 3.0, csr: 40 },
    { pitch: 0.5, div: 100, msr: 1.5, csr: 60 },
    { pitch: 0.5, div: 100, msr: 5.0, csr: 30 },
    { pitch: 1, div: 50, msr: 3.0, csr: 15 },
    { pitch: 1, div: 50, msr: 7.0, csr: 25 },
    { pitch: 0.5, div: 50, msr: 4.5, csr: 18 },
    { pitch: 1, div: 100, msr: 2.0, csr: 72 },
    { pitch: 0.5, div: 100, msr: 2.0, csr: 44 },
    { pitch: 1, div: 50, msr: 5.0, csr: 12 },
  ].forEach((sg, idx) => {
    const lc = Number((sg.pitch / sg.div).toFixed(4));
    const diam = Number((sg.msr + sg.csr * lc).toFixed(4));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 3 === 0 ? 'dental' : 'board',
        question: `একটি স্ক্রু গজের পিচ ${toBnDigits(sg.pitch)} mm এবং বৃত্তাকার স্কেলের ভাগসংখ্যা ${toBnDigits(sg.div)}। কোনো তারের ব্যাস মাপার সময় রৈখিক স্কেল পাঠ ${toBnDigits(sg.msr)} mm ও বৃত্তাকার স্কেল পাঠ ${toBnDigits(sg.csr)} পাওয়া গেলে তারটির ব্যাস কত?`,
        correct: `${toBnDigits(diam)} mm`,
        distractors: [
          `${toBnDigits(Number((sg.msr + sg.csr * lc * 2).toFixed(4)))} mm`,
          `${toBnDigits(Number((sg.msr + (sg.csr + 10) * lc).toFixed(4)))} mm`,
          `${toBnDigits(Number((sg.msr + sg.csr * 0.1).toFixed(4)))} mm`,
          `${toBnDigits(Number((sg.msr + lc).toFixed(4)))} mm`,
        ],
        explanation: `লঘিষ্ঠ গণন LC = ${toBnDigits(sg.pitch)}/${toBnDigits(sg.div)} = ${toBnDigits(lc)} mm; ব্যাস = ${toBnDigits(sg.msr)} + (${toBnDigits(sg.csr)} × ${toBnDigits(lc)}) = ${toBnDigits(diam)} mm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · স্ক্রু গজ',
      })
    );
  });

  // 1C: Dimensions & SI Units 2-way cards (44 MCQs)
  const dimItems = [
    { qty: 'প্ল্যাঙ্কের ধ্রুবক (h)', dim: '[ML²T⁻¹]', unit: 'J·s' },
    { qty: 'মহাকর্ষীয় ধ্রুবক (G)', dim: '[M⁻¹L³T⁻²]', unit: 'N·m²·kg⁻²' },
    { qty: 'সান্দ্রতা গুণাঙ্ক (η)', dim: '[ML⁻¹T⁻¹]', unit: 'Pa·s বা N·s·m⁻²' },
    { qty: 'পৃষ্ঠটান (T)', dim: '[MT⁻²]', unit: 'N·m⁻¹' },
    { qty: 'ইয়ং-এর গুণাঙ্ক (Y)', dim: '[ML⁻¹T⁻²]', unit: 'N·m⁻² (Pa)' },
    { qty: 'কৌণিক ভরবেগ (L)', dim: '[ML²T⁻¹]', unit: 'kg·m²·s⁻¹' },
    { qty: 'জড়তার ভ্রামক (I)', dim: '[ML²]', unit: 'kg·m²' },
    { qty: 'বোল্টজম্যান ধ্রুবক (k)', dim: '[ML²T⁻²Θ⁻¹]', unit: 'J·K⁻¹' },
    { qty: 'সর্বজনীন গ্যাস ধ্রুবক (R)', dim: '[ML²T⁻²N⁻¹Θ⁻¹]', unit: 'J·mol⁻¹·K⁻¹' },
    { qty: 'তাপ পরিবাহিতাঙ্ক (K)', dim: '[MLT⁻³Θ⁻¹]', unit: 'W·m⁻¹·K⁻¹' },
    { qty: 'আপেক্ষিক তাপ (s)', dim: '[L²T⁻²Θ⁻¹]', unit: 'J·kg⁻¹·K⁻¹' },
    { qty: 'সুপ্ততাপ (L)', dim: '[L²T⁻²]', unit: 'J·kg⁻¹' },
    { qty: 'বলের ঘাত (J)', dim: '[MLT⁻¹]', unit: 'N·s' },
    { qty: 'টর্ক (τ)', dim: '[ML²T⁻²]', unit: 'N·m' },
    { qty: 'স্প্রিং ধ্রুবক (k)', dim: '[MT⁻²]', unit: 'N·m⁻¹' },
    { qty: 'মহাকর্ষীয় বিভব (V)', dim: '[L²T⁻²]', unit: 'J·kg⁻¹' },
    { qty: 'ক্ষমতা (P)', dim: '[ML²T⁻³]', unit: 'Watt (J·s⁻¹)' },
    { qty: 'চাপ বা পীড়ন', dim: '[ML⁻¹T⁻²]', unit: 'Pascal (N·m⁻²)' },
    { qty: 'তীব্রতা (Intensity)', dim: '[MT⁻³]', unit: 'W·m⁻²' },
    { qty: 'বেগ নতি (Velocity gradient)', dim: '[T⁻¹]', unit: 's⁻¹' },
    { qty: 'কৌণিক বেগ (ω)', dim: '[T⁻¹]', unit: 'rad·s⁻¹' },
    { qty: 'ভর প্রবাহের হার (dm/dt)', dim: '[MT⁻¹]', unit: 'kg·s⁻¹' },
  ];
  const allDims = Array.from(new Set(dimItems.map((d) => d.dim)));
  const allUnits = Array.from(new Set(dimItems.map((d) => d.unit)));
  dimItems.forEach((item, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `ভৌত রাশি "${item.qty}"-এর সঠিক মাত্রা সমীকরণ কোনটি?`,
        correct: item.dim,
        distractors: allDims.filter((d) => d !== item.dim).slice(0, 4),
        explanation: `${item.qty}-এর এসআই একক ${item.unit} এবং এর মাত্রা হলো ${item.dim}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · মাত্রা বিশ্লেষণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `এসআই (SI) পদ্ধতিতে "${item.qty}"-এর প্রচলিত একক কোনটি?`,
        correct: item.unit,
        distractors: allUnits.filter((u) => u !== item.unit).slice(0, 4),
        explanation: `${item.qty}-এর এসআই একক ${item.unit}, যার মাত্রা ${item.dim}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · এসআই একক',
      })
    );
  });

  // =========================================================================
  // 2. Ch 2: Vectors (Magnitude, Dot Product, Perpendicularity, Boat-River) (~100 MCQs)
  // =========================================================================
  // 2A: 3D Vector Magnitude |A| = sqrt(a^2 + b^2 + c^2) (20 MCQs)
  [
    [1, 2, 2, 3],
    [2, 3, 6, 7],
    [1, 4, 8, 9],
    [4, 4, 7, 9],
    [2, 6, 9, 11],
    [3, 4, 12, 13],
    [6, 6, 7, 11],
    [2, 10, 11, 15],
    [4, 8, 8, 12],
    [3, 6, 6, 9],
    [5, 12, 0, 13],
    [8, 15, 0, 17],
    [6, 8, 0, 10],
    [2, 4, 4, 6],
    [4, 12, 3, 13],
    [1, 8, 4, 9],
    [6, 12, 4, 14],
    [9, 12, 8, 17],
    [8, 9, 12, 17],
    [6, 9, 2, 11],
  ].forEach(([a, b, c, mag], idx) => {
    const vecStr = c === 0 ? `${toBnDigits(a)}î + ${toBnDigits(b)}ĵ` : `${toBnDigits(a)}î + ${toBnDigits(b)}ĵ + ${toBnDigits(c)}k̂`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `ভেক্টর A = ${vecStr} হলে |A|-এর মান কত একক?`,
        correct: `${toBnDigits(mag)} একক`,
        distractors: [mag - 2, mag - 1, mag + 1, mag + 2, mag + 4]
          .filter((x) => x > 0 && x !== mag)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} একক`),
        explanation: `|A| = √(${toBnDigits(a)}² + ${toBnDigits(b)}² + ${toBnDigits(c)}²) = √(${toBnDigits(mag * mag)}) = ${toBnDigits(mag)} একক।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভেক্টরের মান',
      })
    );
  });

  // 2B: Perpendicularity condition A · B = 0 -> solve for m (20 MCQs)
  [
    { a: [2, 3, -1], b: [4, -2, 2], mPos: 'z', mVal: 2 },
    { a: [3, 2, 1], b: [2, -3, 0], mPos: 'z', mVal: 0 },
    { a: [4, -2, 6], b: [1, 5, 1], mPos: 'z', mVal: 1 },
    { a: [5, 2, -4], b: [2, 3, 4], mPos: 'z', mVal: 4 },
    { a: [3, -4, 2], b: [4, 3, 0], mPos: 'z', mVal: 0 },
    { a: [6, 2, -3], b: [1, 3, 4], mPos: 'z', mVal: 4 },
    { a: [2, -3, 5], b: [3, 2, 0], mPos: 'z', mVal: 0 },
    { a: [4, 1, -2], b: [1, 4, 4], mPos: 'z', mVal: 4 },
    { a: [2, 5, 1], b: [3, -2, 4], mPos: 'z', mVal: 4 },
    { a: [3, 1, -2], b: [2, 2, 4], mPos: 'z', mVal: 4 },
    { a: [5, -1, 3], b: [1, 8, 1], mPos: 'z', mVal: 1 },
    { a: [2, 4, -5], b: [3, 1, 2], mPos: 'z', mVal: 2 },
    { a: [4, -3, 2], b: [2, 4, 2], mPos: 'z', mVal: 2 },
    { a: [6, -2, 4], b: [1, 5, 1], mPos: 'z', mVal: 1 },
    { a: [3, 6, -3], b: [2, 1, 4], mPos: 'z', mVal: 4 },
    { a: [5, 3, -2], b: [2, -2, 2], mPos: 'z', mVal: 2 },
  ].forEach((p, idx) => {
    const aStr = `${toBnDigits(p.a[0])}î ${p.a[1] >= 0 ? '+' : '-'} ${toBnDigits(Math.abs(p.a[1]))}ĵ ${p.a[2] >= 0 ? '+' : '-'} ${toBnDigits(Math.abs(p.a[2]))}k̂`;
    const bStr = `${toBnDigits(p.b[0])}î ${p.b[1] >= 0 ? '+' : '-'} ${toBnDigits(Math.abs(p.b[1]))}ĵ + mk̂`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `যদি A = ${aStr} এবং B = ${bStr} ভেক্টর দুটি পরস্পর লম্ব হয়, তবে m-এর মান কত?`,
        correct: toBnDigits(p.mVal),
        distractors: [-2, -1, 0, 1, 2, 3, 4, 5, 6]
          .filter((x) => x !== p.mVal)
          .slice(0, 4)
          .map((x) => toBnDigits(x)),
        explanation: `দুটি ভেক্টর লম্ব হলে A·B = ০। (${toBnDigits(p.a[0])}×${toBnDigits(p.b[0])}) + (${toBnDigits(p.a[1])}×${toBnDigits(p.b[1])}) + (${toBnDigits(p.a[2])}×m) = ০ => m = ${toBnDigits(p.mVal)}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ডট গুণন ও লম্ব শর্ত',
      })
    );
  });

  // 2C: River-boat minimum time & drift (24 MCQs)
  [
    { d: 400, v: 4, u: 2 },
    { d: 600, v: 5, u: 3 },
    { d: 800, v: 8, u: 4 },
    { d: 1000, v: 10, u: 3 },
    { d: 500, v: 5, u: 2 },
    { d: 900, v: 6, u: 4 },
    { d: 1200, v: 8, u: 5 },
    { d: 300, v: 3, u: 2 },
    { d: 750, v: 5, u: 4 },
    { d: 600, v: 10, u: 6 },
    { d: 1500, v: 10, u: 4 },
    { d: 450, v: 9, u: 3 },
  ].forEach((rb, idx) => {
    const tMin = rb.d / rb.v;
    const drift = rb.u * tMin;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(rb.d)} m চওড়া একটি নদীতে স্রোতের বেগ ${toBnDigits(rb.u)} m/s। স্থির পানিতে ${toBnDigits(rb.v)} m/s বেগে চলমান নৌকা ন্যূনতম সময়ে নদী পার হতে চাইলে কত সময় লাগবে?`,
        correct: `${toBnDigits(tMin)} s`,
        distractors: [tMin / 2, tMin + 20, tMin + 40, tMin * 2, tMin - 15]
          .filter((x) => x > 0 && x !== tMin)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} s`),
        explanation: `ন্যূনতম সময়ে পার হতে স্রোতের সাথে ৯০° কোণে রওনা দিতে হবে; t_min = d / v = ${toBnDigits(rb.d)} / ${toBnDigits(rb.v)} = ${toBnDigits(tMin)} s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · নদী-নৌকার গতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(rb.d)} m প্রস্থের নদীতে ${toBnDigits(rb.u)} m/s বেগে স্রোত বইছে। ${toBnDigits(rb.v)} m/s বেগের নৌকা স্রোতের সাথে লম্বভাবে রওনা দিয়ে অপর পাড়ে পৌঁছালে পাড় বরাবর সরণ (Drift) কত হবে?`,
        correct: `${toBnDigits(drift)} m`,
        distractors: [drift / 2, drift + 100, drift + 200, drift - 80, rb.d]
          .filter((x) => x > 0 && x !== drift)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `পারাপারের সময় t = ${toBnDigits(rb.d)}/${toBnDigits(rb.v)} = ${toBnDigits(tMin)} s; সরণ x = u × t = ${toBnDigits(rb.u)} × ${toBnDigits(tMin)} = ${toBnDigits(drift)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · স্রোতের কারণে সরণ',
      })
    );
  });

  // 2D: Cross product area (18 MCQs)
  [
    { p: [2, 0, 0], q: [0, 5, 0], areaP: 10, areaT: 5 },
    { p: [3, 0, 0], q: [0, 4, 0], areaP: 12, areaT: 6 },
    { p: [4, 0, 0], q: [0, 6, 0], areaP: 24, areaT: 12 },
    { p: [5, 0, 0], q: [0, 8, 0], areaP: 40, areaT: 20 },
    { p: [3, 4, 0], q: [0, 0, 4], areaP: 20, areaT: 10 },
    { p: [6, 8, 0], q: [0, 0, 3], areaP: 30, areaT: 15 },
    { p: [5, 12, 0], q: [0, 0, 2], areaP: 26, areaT: 13 },
    { p: [1, 2, 2], q: [0, 0, 0], areaP: 0, areaT: 0 },
  ]
    .filter((x) => x.areaP > 0)
    .forEach((ar, idx) => {
      const pStr = `${toBnDigits(ar.p[0])}î + ${toBnDigits(ar.p[1])}ĵ`;
      const qStr = ar.q[2] ? `${toBnDigits(ar.q[2])}k̂` : `${toBnDigits(ar.q[1])}ĵ`;
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch2_vector',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: idx % 2 === 0 ? 'board' : 'medical',
          question: `একটি সামান্তরিকের দুটি সন্নিহিত বাহু P = ${pStr} এবং Q = ${qStr} দ্বারা নির্দেশিত হলে সামান্তরিকটির ক্ষেত্রফল কত বর্গ একক?`,
          correct: `${toBnDigits(ar.areaP)} বর্গ একক`,
          distractors: [ar.areaT, ar.areaP + 4, ar.areaP + 8, ar.areaP * 2]
            .filter((x) => x !== ar.areaP)
            .slice(0, 4)
            .map((x) => `${toBnDigits(x)} বর্গ একক`),
          explanation: `সামান্তরিকের ক্ষেত্রফল = |P × Q| = ${toBnDigits(ar.areaP)} বর্গ একক।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ক্রস গুণনের জ্যামিতিক তাৎপর্য',
        })
      );
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch2_vector',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: 'dental',
          question: `কোনো ত্রিভুজের দুটি সন্নিহিত বাহু P = ${pStr} ও Q = ${qStr} হলে ত্রিভুজটির ক্ষেত্রফল কত বর্গ একক?`,
          correct: `${toBnDigits(ar.areaT)} বর্গ একক`,
          distractors: [ar.areaP, ar.areaT + 3, ar.areaT + 6, ar.areaT * 3]
            .filter((x) => x !== ar.areaT)
            .slice(0, 4)
            .map((x) => `${toBnDigits(x)} বর্গ একক`),
          explanation: `ত্রিভুজের ক্ষেত্রফল = ½|P × Q| = ½ × ${toBnDigits(ar.areaP)} = ${toBnDigits(ar.areaT)} বর্গ একক।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ত্রিভুজের ক্ষেত্রফল',
        })
      );
    });

  // =========================================================================
  // 3. Ch 3: Kinematics & Projectile Motion (~96 MCQs)
  // =========================================================================
  // 3A: Uniform acceleration (v = u + at, s = ut + 1/2 a t^2) (36 MCQs)
  [
    { u: 0, a: 2, t: 5 },
    { u: 0, a: 4, t: 6 },
    { u: 4, a: 2, t: 5 },
    { u: 5, a: 3, t: 4 },
    { u: 6, a: 4, t: 5 },
    { u: 10, a: 2, t: 8 },
    { u: 8, a: 5, t: 4 },
    { u: 12, a: 3, t: 6 },
    { u: 0, a: 6, t: 7 },
    { u: 15, a: 4, t: 5 },
    { u: 2, a: 6, t: 6 },
    { u: 10, a: 4, t: 10 },
  ].forEach((k, idx) => {
    const v = k.u + k.a * k.t;
    const s = k.u * k.t + 0.5 * k.a * k.t * k.t;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(k.u)} m/s আদিবেগে যাত্রা করে একটি গাড়ি ${toBnDigits(k.a)} m/s² সুষম ত্বরণে ${toBnDigits(k.t)} s চললে এর শেষবেগ কত হবে?`,
        correct: `${toBnDigits(v)} m/s`,
        distractors: [v - 4, v + 4, v + 8, s]
          .filter((x) => x > 0 && x !== v)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `v = u + at = ${toBnDigits(k.u)} + (${toBnDigits(k.a)} × ${toBnDigits(k.t)}) = ${toBnDigits(v)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · গতির সমীকরণ',
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
        question: `একটি বস্তু ${toBnDigits(k.u)} m/s আদিবেগে ও ${toBnDigits(k.a)} m/s² সুষম ত্বরণে সরলপথে চললে ${toBnDigits(k.t)} সেকেন্ডে কত দূরত্ব অতিক্রম করবে?`,
        correct: `${toBnDigits(s)} m`,
        distractors: [s / 2, s + 15, s + 30, v * k.t]
          .filter((x) => x > 0 && x !== s)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `s = ut + ½at² = (${toBnDigits(k.u)}×${toBnDigits(k.t)}) + ½×${toBnDigits(k.a)}×${toBnDigits(k.t)}² = ${toBnDigits(s)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · সরণ নির্ণয়',
      })
    );
  });

  // 3B: Projectile Motion (Range R, Max Height H, Time of Flight T) with g = 10 m/s^2 stated (36 MCQs)
  [
    { u: 20, deg: 30, sinD: 0.5, sin2D: 0.866 },
    { u: 20, deg: 45, sinD: 0.707, sin2D: 1 },
    { u: 40, deg: 30, sinD: 0.5, sin2D: 0.866 },
    { u: 40, deg: 45, sinD: 0.707, sin2D: 1 },
    { u: 30, deg: 30, sinD: 0.5, sin2D: 0.866 },
    { u: 30, deg: 45, sinD: 0.707, sin2D: 1 },
    { u: 60, deg: 30, sinD: 0.5, sin2D: 0.866 },
    { u: 50, deg: 45, sinD: 0.707, sin2D: 1 },
    { u: 80, deg: 30, sinD: 0.5, sin2D: 0.866 },
    { u: 10, deg: 45, sinD: 0.707, sin2D: 1 },
  ].forEach((pr, idx) => {
    const g = 10;
    const h = Number(((pr.u * pr.u * pr.sinD * pr.sinD) / (2 * g)).toFixed(1));
    const t = Number(((2 * pr.u * pr.sinD) / g).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `ভূমি থেকে ${toBnDigits(pr.u)} m/s বেগে ও আনুভূমিকের সাথে ${toBnDigits(pr.deg)}° কোণে নিক্ষিপ্ত একটি প্রাসের সর্বাধিক উচ্চতা কত? (ধরি g = ১০ m/s²)`,
        correct: `${toBnDigits(h)} m`,
        distractors: [h * 2, h / 2, h + 10, h + 25]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== h)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `H = (u² sin²θ) / (2g) = (${toBnDigits(pr.u)}² × sin²${toBnDigits(pr.deg)}°) / ২০ = ${toBnDigits(h)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের সর্বাধিক উচ্চতা',
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
        question: `ভূমি থেকে ${toBnDigits(pr.u)} m/s বেগে ${toBnDigits(pr.deg)}° কোণে ছোড়া প্রাসের বিচরণকাল (Time of flight) কত? (g = ১০ m/s²)`,
        correct: `${toBnDigits(t)} s`,
        distractors: [t / 2, t * 2, t + 1.5, t + 3]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== t)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} s`),
        explanation: `T = (2u sinθ) / g = (২ × ${toBnDigits(pr.u)} × sin${toBnDigits(pr.deg)}°) / ১০ = ${toBnDigits(t)} s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের বিচরণকাল',
      })
    );
  });

  // =========================================================================
  // 4. Ch 4: Newtonian Mechanics (Impulse, Momentum, MOI, Torque, Banking) (~114 MCQs)
  // =========================================================================
  // 4A: Impulse & Force (24 MCQs)
  [
    { m: 2, u: 10, v: 25, t: 0.5 },
    { m: 4, u: 5, v: 20, t: 2 },
    { m: 0.5, u: 20, v: -10, t: 0.1 },
    { m: 0.2, u: 30, v: -20, t: 0.05 },
    { m: 5, u: 0, v: 12, t: 3 },
    { m: 3, u: 4, v: 16, t: 4 },
    { m: 10, u: 2, v: 10, t: 4 },
    { m: 0.4, u: 15, v: -15, t: 0.2 },
    { m: 6, u: 5, v: 15, t: 2 },
    { m: 8, u: 0, v: 15, t: 5 },
  ].forEach((imp, idx) => {
    const J = Math.abs(imp.m * (imp.v - imp.u));
    const F = Number((J / imp.t).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(imp.m)} kg ভরের একটি বস্তুর বেগ ${toBnDigits(imp.u)} m/s থেকে পরিবর্তিত হয়ে ${toBnDigits(imp.v)} m/s হলে বলের ঘাতের মান কত N·s?`,
        correct: `${toBnDigits(J)} N·s`,
        distractors: [J / 2, J * 2, J + 5, J + 12]
          .filter((x) => x > 0 && x !== J)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} N·s`),
        explanation: `বলের ঘাত J = m|v - u| = ${toBnDigits(imp.m)} × |${toBnDigits(imp.v)} - (${toBnDigits(imp.u)})| = ${toBnDigits(J)} N·s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · বলের ঘাত',
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
        question: `${toBnDigits(imp.m)} kg ভরের একটি বস্তুর বেগ ${toBnDigits(imp.t)} s সময়ে ${toBnDigits(imp.u)} m/s থেকে ${toBnDigits(imp.v)} m/s করতে গড় বলের মান কত N?`,
        correct: `${toBnDigits(F)} N`,
        distractors: [F / 2, F * 2, F + 10, J]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== F)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} N`),
        explanation: `F = m|v - u|/t = ${toBnDigits(J)} / ${toBnDigits(imp.t)} = ${toBnDigits(F)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · নিউটনের ২য় সূত্র',
      })
    );
  });

  // 4B: Gun recoil & Inelastic collision (24 MCQs)
  [
    { m: 0.02, v: 400, M: 4 },
    { m: 0.01, v: 500, M: 5 },
    { m: 0.05, v: 200, M: 5 },
    { m: 0.04, v: 300, M: 6 },
    { m: 0.025, v: 400, M: 5 },
    { m: 0.03, v: 300, M: 4.5 },
    { m: 0.02, v: 300, M: 3 },
    { m: 0.015, v: 400, M: 3 },
    { m: 0.05, v: 300, M: 10 },
    { m: 0.04, v: 500, M: 8 },
  ].forEach((gun, idx) => {
    const V = Number(((gun.m * gun.v) / gun.M).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(gun.M)} kg ভরের একটি বন্দুক থেকে ${toBnDigits(gun.m * 1000)} g ভরের একটি গুলি ${toBnDigits(gun.v)} m/s বেগে নিক্ষিপ্ত হলে বন্দুকটির পশ্চাৎ বেগ কত m/s?`,
        correct: `${toBnDigits(V)} m/s`,
        distractors: [V * 2, V / 2, V + 1, V + 3]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== V)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m/s`),
        explanation: `ভরবেগের সংরক্ষণ সূত্রানুসারে V = mv/M = (${toBnDigits(gun.m)} × ${toBnDigits(gun.v)}) / ${toBnDigits(gun.M)} = ${toBnDigits(V)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · বন্দুকের পশ্চাৎ বেগ',
      })
    );
  });

  // 4C: Moment of Inertia & Rotational KE (30 MCQs)
  [
    { shape: 'পাতলা বৃত্তাকার রিং (কেন্দ্রগামী লম্ব অক্ষ)', coeff: 1, m: 2, r: 0.5 },
    { shape: 'সুষম চাকতি বা নিরেট সিলিন্ডার (কেন্দ্রগামী অক্ষ)', coeff: 0.5, m: 4, r: 0.5 },
    { shape: 'নিরেট গোলক (ব্যাস বরাবর)', coeff: 0.4, m: 5, r: 1 },
    { shape: 'ফাঁপা গোলক (ব্যাস বরাবর)', coeff: 0.67, m: 3, r: 1 },
    { shape: 'সরু দণ্ড (মধ্যবিন্দুগামী লম্ব অক্ষ, L ব্যাসার্ধ অর্থে)', coeff: 1 / 12, m: 6, r: 2 },
    { shape: 'সুষম চাকতি (কেন্দ্রগামী অক্ষ)', coeff: 0.5, m: 8, r: 0.5 },
    { shape: 'নিরেট গোলক (ব্যাস সাপেক্ষে)', coeff: 0.4, m: 10, r: 0.5 },
    { shape: 'বৃত্তাকার রিং (অক্ষ বরাবর)', coeff: 1, m: 5, r: 0.4 },
  ].forEach((sh, idx) => {
    const moi = Number((sh.coeff * sh.m * sh.r * sh.r).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(sh.m)} kg ভর ও ${toBnDigits(sh.r)} m ব্যাসার্ধ/দৈর্ঘ্যবিশিষ্ট একটি ${sh.shape}-এর জড়তার ভ্রামক কত kg·m²?`,
        correct: `${toBnDigits(moi)} kg·m²`,
        distractors: [moi * 2, moi / 2, moi + 1, moi + 2.5]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== moi)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} kg·m²`),
        explanation: `নির্দিষ্ট অক্ষ সাপেক্ষে জড়তার ভ্রামক I = ${toBnDigits(Number(sh.coeff.toFixed(2)))} × MR² = ${toBnDigits(moi)} kg·m²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · জড়তার ভ্রামক',
      })
    );
  });

  // Rotational KE: E_r = 1/2 I omega^2 (16 MCQs)
  [
    { I: 2, w: 10 },
    { I: 4, w: 5 },
    { I: 6, w: 4 },
    { I: 8, w: 5 },
    { I: 10, w: 6 },
    { I: 5, w: 8 },
    { I: 3, w: 10 },
    { I: 12, w: 5 },
    { I: 0.5, w: 20 },
    { I: 1.5, w: 10 },
  ].forEach((rot, idx) => {
    const ke = 0.5 * rot.I * rot.w * rot.w;
    const L = rot.I * rot.w;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(rot.I)} kg·m² জড়তার ভ্রামকবিশিষ্ট একটি চাকা ${toBnDigits(rot.w)} rad/s কৌণিক বেগে ঘুরলে এর ঘূর্ণন গতিশক্তি কত?`,
        correct: `${toBnDigits(ke)} J`,
        distractors: [ke / 2, ke * 2, L, ke + 40]
          .filter((x) => x !== ke)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `E_rot = ½ Iω² = ½ × ${toBnDigits(rot.I)} × (${toBnDigits(rot.w)})² = ${toBnDigits(ke)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ঘূর্ণন গতিশক্তি',
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
        question: `${toBnDigits(rot.I)} kg·m² জড়তার ভ্রামকের একটি বস্তু ${toBnDigits(rot.w)} rad/s কৌণিক বেগে ঘূর্ণায়মান হলে এর কৌণিক ভরবেগ (L) কত kg·m²/s?`,
        correct: `${toBnDigits(L)} kg·m²/s`,
        distractors: [L / 2, L * 2, ke, L + 10]
          .filter((x) => x !== L)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} kg·m²/s`),
        explanation: `কৌণিক ভরবেগ L = Iω = ${toBnDigits(rot.I)} × ${toBnDigits(rot.w)} = ${toBnDigits(L)} kg·m²/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কৌণিক ভরবেগ',
      })
    );
  });

  // 4D: Centripetal force F = mv^2 / r (12 MCQs)
  [
    { m: 2, v: 10, r: 5 },
    { m: 4, v: 6, r: 3 },
    { m: 5, v: 8, r: 4 },
    { m: 10, v: 10, r: 20 },
    { m: 1000, v: 20, r: 100 },
    { m: 500, v: 10, r: 50 },
    { m: 3, v: 12, r: 9 },
    { m: 8, v: 5, r: 2 },
    { m: 1200, v: 15, r: 90 },
    { m: 0.5, v: 8, r: 2 },
  ].forEach((cf, idx) => {
    const f = Number(((cf.m * cf.v * cf.v) / cf.r).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(cf.m)} kg ভরের একটি বস্তু ${toBnDigits(cf.r)} m ব্যাসার্ধের বৃত্তাকার পথে ${toBnDigits(cf.v)} m/s সমদ্রুতিতে ঘুরলে কেন্দ্রমুখী বলের মান কত N?`,
        correct: `${toBnDigits(f)} N`,
        distractors: [f / 2, f * 2, f + 15, cf.m * cf.v]
          .filter((x) => x > 0 && x !== f)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} N`),
        explanation: `কেন্দ্রমুখী বল F = mv²/r = (${toBnDigits(cf.m)} × ${toBnDigits(cf.v)}²) / ${toBnDigits(cf.r)} = ${toBnDigits(f)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কেন্দ্রমুখী বল',
      })
    );
  });

  // =========================================================================
  // 5. Ch 5: Work, Power, Energy & Efficiency (~84 MCQs)
  // =========================================================================
  // 5A: Work W = F s cos(theta) (24 MCQs)
  [
    { F: 20, s: 5, deg: 0, cos: 1 },
    { F: 40, s: 10, deg: 60, cos: 0.5 },
    { F: 50, s: 8, deg: 60, cos: 0.5 },
    { F: 100, s: 4, deg: 60, cos: 0.5 },
    { F: 30, s: 6, deg: 0, cos: 1 },
    { F: 25, s: 8, deg: 90, cos: 0 },
    { F: 60, s: 5, deg: 90, cos: 0 },
    { F: 80, s: 5, deg: 60, cos: 0.5 },
    { F: 15, s: 12, deg: 0, cos: 1 },
    { F: 50, s: 10, deg: 180, cos: -1 },
    { F: 20, s: 4, deg: 180, cos: -1 },
    { F: 120, s: 5, deg: 60, cos: 0.5 },
  ].forEach((wk, idx) => {
    const w = wk.F * wk.s * wk.cos;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `কোনো বস্তুর ওপর ${toBnDigits(wk.F)} N বল প্রয়োগ করায় বলের দিকের সাথে ${toBnDigits(wk.deg)}° কোণে বস্তুটির ${toBnDigits(wk.s)} m সরণ ঘটলে কৃতকাজ কত জুল?`,
        correct: `${toBnDigits(w)} J`,
        distractors: [wk.F * wk.s, wk.F * wk.s * 0.5, -wk.F * wk.s, 0, wk.F * wk.s + 50]
          .filter((x) => x !== w)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `W = Fs cosθ = ${toBnDigits(wk.F)} × ${toBnDigits(wk.s)} × cos(${toBnDigits(wk.deg)}°) = ${toBnDigits(w)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · কাজ নির্ণয়',
      })
    );
  });

  // 5B: Water pump power & HP & efficiency (30 MCQs)
  [
    { m: 100, h: 10, t: 5, g: 9.8 },
    { m: 200, h: 15, t: 10, g: 9.8 },
    { m: 500, h: 20, t: 25, g: 9.8 },
    { m: 300, h: 10, t: 15, g: 9.8 },
    { m: 1000, h: 12, t: 60, g: 9.8 },
    { m: 600, h: 20, t: 30, g: 9.8 },
    { m: 150, h: 20, t: 10, g: 9.8 },
    { m: 400, h: 15, t: 20, g: 9.8 },
    { m: 250, h: 16, t: 10, g: 9.8 },
    { m: 800, h: 15, t: 40, g: 9.8 },
  ].forEach((pmp, idx) => {
    const pWatt = Number(((pmp.m * pmp.g * pmp.h) / pmp.t).toFixed(1));
    const pHp = Number((pWatt / 746).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি পাম্প ${toBnDigits(pmp.t)} সেকেন্ডে ${toBnDigits(pmp.m)} kg পানি ${toBnDigits(pmp.h)} m উচ্চতায় তুললে পাম্পটির কার্যকর ক্ষমতা (Output Power) কত ওয়াট? (g = ৯.৮ m/s²)`,
        correct: `${toBnDigits(pWatt)} W`,
        distractors: [pWatt / 2, pWatt * 2, pWatt + 490, pWatt - 245]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== pWatt)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} W`),
        explanation: `P = mgh/t = (${toBnDigits(pmp.m)} × ৯.৮ × ${toBnDigits(pmp.h)}) / ${toBnDigits(pmp.t)} = ${toBnDigits(pWatt)} W।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · পাম্পের ক্ষমতা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(pmp.m)} kg পানি ${toBnDigits(pmp.h)} m উচ্চতায় ${toBnDigits(pmp.t)} সেকেন্ডে তুলতে প্রয়োজনীয় অশ্বক্ষমতা (HP) প্রায় কত? (১ HP = ৭৪৬ W)`,
        correct: `${toBnDigits(pHp)} HP`,
        distractors: [pHp * 2, pHp / 2, pHp + 1.5, pHp + 3.0]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== pHp)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} HP`),
        explanation: `P = ${toBnDigits(pWatt)} W = ${toBnDigits(pWatt)} / ৭৪৬ ≈ ${toBnDigits(pHp)} HP।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · অশ্বক্ষমতা',
      })
    );
  });

  // 5C: Spring potential energy U = 1/2 k x^2 (16 MCQs)
  [
    { k: 200, x: 0.1 },
    { k: 400, x: 0.05 },
    { k: 500, x: 0.2 },
    { k: 100, x: 0.2 },
    { k: 800, x: 0.1 },
    { k: 1000, x: 0.1 },
    { k: 200, x: 0.3 },
    { k: 600, x: 0.1 },
    { k: 1200, x: 0.05 },
    { k: 300, x: 0.2 },
  ].forEach((sp, idx) => {
    const u = Number((0.5 * sp.k * sp.x * sp.x).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(sp.k)} N/m স্প্রিং ধ্রুবকবিশিষ্ট একটি স্প্রিংকে ${toBnDigits(sp.x * 100)} cm প্রসারিত করলে এতে সঞ্চিত বিভবশক্তি কত?`,
        correct: `${toBnDigits(u)} J`,
        distractors: [u * 2, u / 2, u + 2, u + 5]
          .map((z) => Number(z.toFixed(2)))
          .filter((z) => z > 0 && z !== u)
          .slice(0, 4)
          .map((z) => `${toBnDigits(z)} J`),
        explanation: `U = ½kx² = ½ × ${toBnDigits(sp.k)} × (${toBnDigits(sp.x)})² = ${toBnDigits(u)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · স্প্রিংয়ের বিভব শক্তি',
      })
    );
  });

  // =========================================================================
  // 6. Ch 6: Gravitation & Satellites (~65 MCQs)
  // =========================================================================
  // 6A: Variation of g with altitude h and depth d (30 MCQs)
  [
    { hRatio: 'R', gFrac: 'g/4', pct: '২৫%' },
    { hRatio: '2R', gFrac: 'g/9', pct: '১১.১১%' },
    { hRatio: '3R', gFrac: 'g/16', pct: '৬.২৫%' },
    { hRatio: '4R', gFrac: 'g/25', pct: '৪%' },
    { hRatio: '9R', gFrac: 'g/100', pct: '১%' },
  ].forEach((alt, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `পৃথিবী পৃষ্ঠ হতে কত উচ্চতায় অভিকর্ষজ ত্বরণের মান ভূপৃষ্ঠের মানের ${alt.pct} (${alt.gFrac}) হবে? (পৃথিবীর ব্যাসার্ধ R)`,
        correct: `h = ${alt.hRatio}`,
        distractors: ['R/2', 'R', '2R', '3R', '4R', '9R'].map((x) => `h = ${x}`).filter((x) => x !== `h = ${alt.hRatio}`).slice(0, 4),
        explanation: `g' = g[R/(R+h)]²; মান ${alt.gFrac} হওয়ার অর্থ R/(R+h) = 1/√(g/g'), তাই h = ${alt.hRatio}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · উচ্চতার সাথে g-এর পরিবর্তন',
      })
    );
  });

  [
    { dFrac: 'R/2', gRem: '৫০%', gDec: '৫০%' },
    { dFrac: 'R/4', gRem: '৭৫%', gDec: '২৫%' },
    { dFrac: '3R/4', gRem: '২৫%', gDec: '৭৫%' },
    { dFrac: 'R/5', gRem: '৮০%', gDec: '২০%' },
    { dFrac: '2R/5', gRem: '৬০%', gDec: '৪০%' },
    { dFrac: '3R/5', gRem: '৪০%', gDec: '৬০%' },
    { dFrac: 'R/10', gRem: '৯০%', gDec: '১০%' },
    { dFrac: '9R/10', gRem: '১০%', gDec: '৯০%' },
  ].forEach((dep, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `পৃথিবী পৃষ্ঠ থেকে গভীরতা d = ${dep.dFrac} হলে সেখানে অভিকর্ষজ ত্বরণ g' ভূপৃষ্ঠের মানের শতকরা কত ভাগ হবে?`,
        correct: dep.gRem,
        distractors: ['১০%', '২০%', '২৫%', '৪০%', '৫০%', '৬০%', '৭৫%', '৮০%', '৯০%']
          .filter((x) => x !== dep.gRem)
          .slice(0, 4),
        explanation: `গভীরতায় g' = g(1 - d/R); d = ${dep.dFrac} বসালে g' হয় ভূপৃষ্ঠের ${dep.gRem}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · গভীরতার সাথে g-এর পরিবর্তন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `ভূপৃষ্ঠ থেকে ${dep.dFrac} গভীরতায় গেলে অভিকর্ষজ ত্বরণের মান ভূপৃষ্ঠের তুলনায় শতকরা কত হ্রাস পায়?`,
        correct: dep.gDec,
        distractors: ['১০%', '২০%', '২৫%', '৪০%', '৫০%', '৬০%', '৭৫%', '৮০%', '৯০%']
          .filter((x) => x !== dep.gDec)
          .slice(0, 4),
        explanation: `Δg/g = d/R; তাই d = ${dep.dFrac} গভীরতায় g-এর মান ${dep.gDec} হ্রাস পায়।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · গভীরতায় ওজন হ্রাস',
      })
    );
  });

  // 6B: Kepler's 3rd law T^2 ~ r^3 & Orbital/Escape Velocity (20 MCQs)
  [
    { ratioR: 4, ratioT: 8 },
    { ratioR: 9, ratioT: 27 },
    { ratioR: 16, ratioT: 64 },
    { ratioR: 25, ratioT: 125 },
    { ratioR: 0.25, ratioT: 0.125 },
  ].forEach((kp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `সূর্য থেকে কোনো গ্রহের গড় দূরত্ব বর্তমান দূরত্বের ${toBnDigits(kp.ratioR)} গুণ হলে গ্রহটির পর্যায়কাল বর্তমান পর্যায়কালের কত গুণ হবে?`,
        correct: `${toBnDigits(kp.ratioT)} গুণ`,
        distractors: Array.from(
          new Set(
            [kp.ratioR, kp.ratioR * 2, Math.sqrt(kp.ratioR), kp.ratioT * 2, kp.ratioT * 4, kp.ratioT / 2, 1.5, 3]
              .map((x) => Number(x.toFixed(4)))
              .filter((x) => x > 0 && x !== kp.ratioT)
          )
        )
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} গুণ`),
        explanation: `কেপলারের ৩য় সূত্রানুসারে T² ∝ r³; তাই T₂/T₁ = (r₂/r₁)^(3/2) = (${toBnDigits(kp.ratioR)})^(3/2) = ${toBnDigits(kp.ratioT)} গুণ।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · কেপলারের ৩য় সূত্র',
      })
    );
  });

  [
    { planet: 'পৃথিবী', ve: '১১.২ km/s', vo: '৭.৯২ km/s' },
    { planet: 'চাঁদ', ve: '২.৩৮ km/s', vo: '১.৬৮ km/s' },
    { planet: 'মঙ্গল', ve: '৫.০৩ km/s', vo: '৩.৫৫ km/s' },
    { planet: 'বৃহস্পতি', ve: '৫৯.৫ km/s', vo: '৪২.১ km/s' },
    { planet: 'বুধ', ve: '৪.২৫ km/s', vo: '৩.০০ km/s' },
    { planet: 'শুক্র', ve: '১০.৩৬ km/s', vo: '৭.৩৩ km/s' },
  ].forEach((pl, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${pl.planet} গ্রহের/উপগ্রহের পৃষ্ঠ হতে কোনো বস্তুর মুক্তিবেগ (Escape velocity) প্রায় কত?`,
        correct: pl.ve,
        distractors: ['২.৩৮ km/s', '৪.২৫ km/s', '৫.০৩ km/s', '১০.৩৬ km/s', '১১.২ km/s', '৫৯.৫ km/s'].filter((x) => x !== pl.ve).slice(0, 4),
        explanation: `${pl.planet}-এর ক্ষেত্রে v_e = √(2GM/R) ≈ ${pl.ve}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · বিভিন্ন গ্রহের মুক্তিবেগ',
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
        question: `${pl.planet}-এর পৃষ্ঠের ঠিক কাছাকাছি ঘূর্ণায়মান কৃত্রিম উপগ্রহের কক্ষীয় বেগ (v_o = v_e/√২) প্রায় কত?`,
        correct: pl.vo,
        distractors: ['১.৬৮ km/s', '৩.০০ km/s', '৩.৫৫ km/s', '৭.৩৩ km/s', '৭.৯২ km/s', '৪২.১ km/s'].filter((x) => x !== pl.vo).slice(0, 4),
        explanation: `কক্ষীয় বেগ v_o = v_e/√২; ${pl.planet}-এর জন্য তা প্রায় ${pl.vo}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · উপগ্রহের কক্ষীয় বেগ',
      })
    );
  });

  return list;
}
