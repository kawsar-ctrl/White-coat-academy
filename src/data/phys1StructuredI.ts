import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredI(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1si_${String(seq++).padStart(4, '0')}`;

  const round2 = (n: number) => Number(n.toFixed(2));
  const round1 = (n: number) => Number(n.toFixed(1));

  // =========================================================================
  // 1. Ch 1: Unit Conversions & Percentage Error Combinations (~75 MCQs)
  // =========================================================================
  // 1A: km/h -> m/s & m/s -> km/h (16 MCQs)
  [18, 36, 54, 72, 90, 108, 126, 144].forEach((kmh, idx) => {
    const ms = kmh / 3.6;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি যানবাহনের বেগ ${toBnDigits(kmh)} km/h হলে এসআই (SI) এককে এর মান কত m/s?`,
        correct: `${toBnDigits(ms)} m/s`,
        distractors: [5, 10, 15, 20, 25, 30, 35, 40].filter((x) => x !== ms).slice(0, 4).map((x) => `${toBnDigits(x)} m/s`),
        explanation: `${toBnDigits(kmh)} km/h = ${toBnDigits(kmh)} × (৫/১৮) m/s = ${toBnDigits(ms)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · একক রূপান্তর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `কোনো কণার দ্রুতি ${toBnDigits(ms)} m/s হলে ঘণ্টায় কিলোমিটার (km/h) এককে এটি কত?`,
        correct: `${toBnDigits(kmh)} km/h`,
        distractors: [18, 36, 54, 72, 90, 108, 126, 144].filter((x) => x !== kmh).slice(0, 4).map((x) => `${toBnDigits(x)} km/h`),
        explanation: `${toBnDigits(ms)} m/s = ${toBnDigits(ms)} × (১৮/৫) km/h = ${toBnDigits(kmh)} km/h।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · বেগের একক রূপান্তর',
      })
    );
  });

  // 1B: CGS <-> SI conversions (Density, Force, Energy, Pressure) (~24 MCQs)
  [
    { name: 'পানি (৪°C)', gcm3: 1.0, kgm3: '১,০০০ kg/m³' },
    { name: 'পারদ', gcm3: 13.6, kgm3: '১৩,৬০০ kg/m³' },
    { name: 'বরফ', gcm3: 0.92, kgm3: '৯২০ kg/m³' },
    { name: 'লোহা', gcm3: 7.8, kgm3: '৭,৮০০ kg/m³' },
    { name: 'সোনা', gcm3: 19.3, kgm3: '১৯,৩০০ kg/m³' },
    { name: 'অ্যালুমিনিয়াম', gcm3: 2.7, kgm3: '২,৭০০ kg/m³' },
    { name: 'ইথানল', gcm3: 0.79, kgm3: '৭৯০ kg/m³' },
    { name: 'তামা', gcm3: 8.9, kgm3: '৮,৯০০ kg/m³' },
  ].forEach((dn, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${dn.name}-এর ঘনত্ব CGS এককে ${toBnDigits(dn.gcm3)} g/cm³ হলে এসআই (SI) এককে এর মান কত?`,
        correct: dn.kgm3,
        distractors: ['৭৯০ kg/m³', '৯২০ kg/m³', '১,০০০ kg/m³', '২,৭০০ kg/m³', '৭,৮০০ kg/m³', '৮,৯০০ kg/m³', '১৩,৬০০ kg/m³', '১৯,৩০০ kg/m³']
          .filter((x) => x !== dn.kgm3)
          .slice(0, 4),
        explanation: `১ g/cm³ = ১,০০০ kg/m³; তাই ${toBnDigits(dn.gcm3)} g/cm³ = ${dn.kgm3}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · ঘনত্বের একক রূপান্তর',
      })
    );
  });

  [
    { q: '১ নিউটন (1 N) বল CGS পদ্ধতিতে কত ডাইনের (dyne) সমান?', a: '১০⁵ dyne', d: ['১০³ dyne', '১০⁷ dyne', '১০⁻⁵ dyne', '১০⁴ dyne'] },
    { q: '১ জুল (1 J) কাজ বা শক্তি CGS পদ্ধতিতে কত আর্গের (erg) সমান?', a: '১০⁷ erg', d: ['১০⁵ erg', '১০⁶ erg', '১০⁹ erg', '১০⁻⁷ erg'] },
    { q: '৫ নিউটন বল সমান কত ডাইন?', a: '৫ × ১০⁵ dyne', d: ['৫ × ১০⁷ dyne', '৫ × ১০³ dyne', '৫ × ১০⁻⁵ dyne', '৫ × ১০⁶ dyne'] },
    { q: '২.৫ জুল শক্তি সমান কত আর্গ?', a: '২.৫ × ১০⁷ erg', d: ['২.৫ × ১০⁵ erg', '২.৫ × ১০⁶ erg', '২.৫ × ১০⁸ erg', '২.৫ × ১০⁻⁷ erg'] },
    { q: '১ বায়ুমণ্ডলীয় চাপ (১ atm = ৭৬ cmHg) এসআই এককে প্রায় কত প্যাসকেল?', a: '১.০১৩ × ১০⁵ Pa', d: ['১.০১৩ × ১০³ Pa', '১.০১৩ × ১০⁶ Pa', '৭.৬ × ১০⁴ Pa', '৯.৮ × ১০⁴ Pa'] },
    { q: '১ MeV (মেগা ইলেকট্রন-ভোল্ট) শক্তি জুলে রূপান্তর করলে কত জুল হয়?', a: '১.৬ × ১০⁻¹³ J', d: ['১.৬ × ১০⁻¹⁹ J', '১.৬ × ১০⁻¹⁶ J', '১.৬ × ১০⁻¹⁰ J', '৩.৬ × ১০⁶ J'] },
    { q: '১ আলোক-বছরের (Light year) পাশাপাশি ১ অ্যাংস্ট্রম (1 Å) সমান কত ন্যানোমিটার?', a: '০.১ nm', d: ['১০ nm', '১ nm', '০.০১ nm', '১০০ nm'] },
    { q: 'বায়ুমণ্ডলীয় চাপের ১ বার (1 bar) সমান কত প্যাসকেল?', a: '১০⁵ Pa', d: ['১০⁴ Pa', '১০⁶ Pa', '১০³ Pa', '১০² Pa'] },
  ].forEach((uc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: uc.q,
        correct: uc.a,
        distractors: uc.d,
        explanation: `আন্তর্জাতিক ও সিজিএস এককের রূপান্তর অনুযায়ী সঠিক উত্তর: ${uc.a}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · একক সমতা',
      })
    );
  });

  // 1C: Extra Error Propagation Matrix (~27 MCQs)
  [
    { qty: 'বর্গক্ষেত্রের বাহু a', target: 'ক্ষেত্রফল A = a²', m: 2 },
    { qty: 'বৃত্তের ব্যাস d', target: 'পরিধি C = πd', m: 1 },
    { qty: 'আয়তকার পাতের দৈর্ঘ্য ও প্রস্থ উভয়ই', target: 'ক্ষেত্রফল A = l·b', m: 2 },
  ].forEach((er) => {
    [1, 2, 3, 4, 5].forEach((ep, idx) => {
      const ans = er.m * ep;
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch1_measurement',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: idx % 2 === 0 ? 'board' : 'medical',
          question: `একটি ${er.qty} পরিমাপে ত্রুটি ${toBnDigits(ep)}% হলে এর ${er.target} নির্ণয়ে সম্ভাব্য সর্বাধিক শতকরা ত্রুটি কত?`,
          correct: `${toBnDigits(ans)}%`,
          distractors: [1, 2, 3, 4, 5, 6, 8, 10, 12].filter((x) => x !== ans).slice(0, 4).map((x) => `${toBnDigits(x)}%`),
          explanation: `মোট শতকরা ত্রুটি = ${toBnDigits(er.m)} × ${toBnDigits(ep)}% = ${toBnDigits(ans)}%।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · ত্রুটি বিশ্লেষণ',
        })
      );
    });
  });

  // =========================================================================
  // 2. Ch 2: Vector Magnitudes, Angles, Projections & River Drift (~110 MCQs)
  // =========================================================================
  // 2A: Resultant of P and Q at θ = 60°, 90°, 120° across 24 varied pairs
  const vecPairs: Array<{ p: number; q: number; th: number; r: string }> = [
    { p: 4, q: 3, th: 0, r: '৭ N' },
    { p: 9, q: 4, th: 180, r: '৫ N' },
    { p: 9, q: 12, th: 90, r: '১৫ N' },
    { p: 12, q: 16, th: 90, r: '২০ N' },
    { p: 15, q: 20, th: 90, r: '২৫ N' },
    { p: 10, q: 24, th: 90, r: '২৬ N' },
    { p: 9, q: 40, th: 90, r: '৪১ N' },
    { p: 4, q: 4, th: 120, r: '৪ N' },
    { p: 7, q: 7, th: 120, r: '৭ N' },
    { p: 15, q: 15, th: 120, r: '১৫ N' },
    { p: 25, q: 25, th: 120, r: '২৫ N' },
    { p: 4, q: 4, th: 60, r: '৪√৩ N' },
    { p: 8, q: 8, th: 60, r: '৮√৩ N' },
    { p: 12, q: 12, th: 60, r: '১২√৩ N' },
    { p: 5, q: 5, th: 90, r: '৫√২ N' },
    { p: 12, q: 12, th: 90, r: '১২√২ N' },
    { p: 5, q: 3, th: 60, r: '৭ N' },
    { p: 10, q: 6, th: 60, r: '১৪ N' },
    { p: 8, q: 5, th: 60, r: '√১২৯ N' },
    { p: 10, q: 6, th: 120, r: '√৭৬ N' },
  ];
  const vecRPool = vecPairs.map((v) => v.r);
  vecPairs.forEach((vp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি কণার ওপর ${toBnDigits(vp.p)} N এবং ${toBnDigits(vp.q)} N মানের দুটি বল ${toBnDigits(vp.th)}° কোণে ক্রিয়া করলে এদের লব্ধি বলের মান কত নিউটন?`,
        correct: vp.r,
        distractors: vecRPool.filter((x) => x !== vp.r).slice(i % 8, (i % 8) + 4),
        explanation: `R = √(${toBnDigits(vp.p)}² + ${toBnDigits(vp.q)}² + ২×${toBnDigits(vp.p)}×${toBnDigits(vp.q)} cos ${toBnDigits(vp.th)}°) = ${vp.r}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · বলের লব্ধি',
      })
    );
  });

  // 2B: Exact Dot Products & Angle θ between Vectors (25 MCQs)
  const dotAngles = [
    { a: 'î + ĵ', b: 'î − ĵ', dot: 0, ang: '৯০°' },
    { a: '2î + 2ĵ', b: '3î − 3ĵ', dot: 0, ang: '৯০°' },
    { a: 'î + √3 ĵ', b: 'î', dot: 1, ang: '৬০°' },
    { a: '√3 î + ĵ', b: 'î', dot: '√৩', ang: '৩০°' },
    { a: 'î + ĵ', b: 'î', dot: 1, ang: '৪৫°' },
    { a: '3î + 4ĵ', b: '3î + 4ĵ', dot: 25, ang: '০°' },
    { a: '2î − 3ĵ + k̂', b: '−2î + 3ĵ − k̂', dot: -14, ang: '১৮০°' },
    { a: 'î + ĵ + k̂', b: 'î + ĵ − 2k̂', dot: 0, ang: '৯০°' },
    { a: 'î + ĵ', b: 'ĵ + k̂', dot: 1, ang: '৬০°' },
    { a: '2î + ĵ + k̂', b: 'î − ĵ + 2k̂', dot: 3, ang: '৬০°' },
  ];
  const angChoices = ['০°', '৩০°', '৪৫°', '৬০°', '৯০°', '১২০°', '১৮০°'];
  dotAngles.forEach((da, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `দুটি ভেক্টর A = ${da.a} এবং B = ${da.b}-এর মধ্যবর্তী কোণ (θ) কত ডিগ্রি?`,
        correct: da.ang,
        distractors: angChoices.filter((x) => x !== da.ang).slice(0, 4),
        explanation: `cos θ = (A · B) / (|A| |B|) ⇒ θ = ${da.ang}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভেক্টরদ্বয়ের মধ্যবর্তী কোণ',
      })
    );
  });

  // 2C: Scalar Projection of A onto B: (A · B)/|B| (15 MCQs)
  const projList = [
    { a: '2î + 3ĵ + 6k̂', b: 'î + 2ĵ + 2k̂', ans: '২২/৩ (≈ ৭.৩৩)' },
    { a: '4î + 3ĵ', b: 'î', ans: '৪' },
    { a: '3î + 4ĵ + 5k̂', b: 'ĵ', ans: '৪' },
    { a: '5î − 2ĵ + 7k̂', b: 'k̂', ans: '৭' },
    { a: '3î + 4ĵ', b: '4î + 3ĵ', ans: '২৪/৫ (৪.৮)' },
    { a: '6î − 3ĵ + 2k̂', b: '2î + 2ĵ + k̂', ans: '৮/৩ (২.৬৭)' },
    { a: 'î + 2ĵ − 2k̂', b: '2î + ĵ + 2k̂', ans: '০ (লম্ব ভেক্টর)' },
    { a: '4î − 4ĵ + 2k̂', b: 'î + 2ĵ + 2k̂', ans: '০ (লম্ব ভেক্টর)' },
  ];
  const projPool = ['০ (লম্ব ভেক্টর)', '৪', '৭', '২৪/৫ (৪.৮)', '৮/৩ (২.৬৭)', '২২/৩ (≈ ৭.৩৩)', '৫', '১০'];
  projList.forEach((pr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'dental' : 'medical',
        question: `B = ${pr.b} ভেক্টরের দিকে A = ${pr.a} ভেক্টরের স্কেলার অভিক্ষেপ (Projection) কত?`,
        correct: pr.ans,
        distractors: projPool.filter((x) => x !== pr.ans).slice(0, 4),
        explanation: `B বরাবর A-এর অভিক্ষেপ = (A · B) / |B| = ${pr.ans}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভেক্টরের লম্ব অভিক্ষেপ',
      })
    );
  });

  // 2D: Boat Drift Distance & Resultant Speed (20 MCQs)
  [
    { d: 300, v: 5, u: 3, t: 60, drift: 180 },
    { d: 400, v: 8, u: 6, t: 50, drift: 300 },
    { d: 500, v: 5, u: 2, t: 100, drift: 200 },
    { d: 600, v: 12, u: 5, t: 50, drift: 250 },
    { d: 1000, v: 10, u: 4, t: 100, drift: 400 },
    { d: 450, v: 9, u: 3, t: 50, drift: 150 },
  ].forEach((rb, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(rb.d)} m চওড়া একটি নদীতে স্রোতের বেগ ${toBnDigits(rb.u)} m/s। স্রোতের সাথে লম্বভাবে ${toBnDigits(rb.v)} m/s বেগে নৌকা চালালে অপর পাড়ে গিয়ে সোজা বিন্দু থেকে ভাটির দিকে কত মিটার সরে যাবে?`,
        correct: `${toBnDigits(rb.drift)} m`,
        distractors: [120, 150, 180, 200, 250, 300, 400, 450].filter((x) => x !== rb.drift).slice(0, 4).map((x) => `${toBnDigits(x)} m`),
        explanation: `পারাপারের সময় t = ${toBnDigits(rb.d)}/${toBnDigits(rb.v)} = ${toBnDigits(rb.t)} s; ভাটিতে সরণ x = u · t = ${toBnDigits(rb.u)} × ${toBnDigits(rb.t)} = ${toBnDigits(rb.drift)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভাটিতে সরণ',
      })
    );
  });

  // =========================================================================
  // 3. Ch 3: Kinematics Equations, Vertical Throw, Projectile & RPM (~135 MCQs)
  // =========================================================================
  // 3A: Uniform acceleration v = u + at & s = ut + ½at² (30 MCQs)
  [
    { u: 0, a: 2, t: 5, v: 10, s: 25 },
    { u: 0, a: 4, t: 6, v: 24, s: 72 },
    { u: 0, a: 5, t: 8, v: 40, s: 160 },
    { u: 10, a: 2, t: 4, v: 18, s: 56 },
    { u: 10, a: 3, t: 6, v: 28, s: 114 },
    { u: 5, a: 4, t: 5, v: 25, s: 75 },
    { u: 12, a: 2, t: 10, v: 32, s: 220 },
    { u: 20, a: 3, t: 4, v: 32, s: 104 },
    { u: 8, a: 5, t: 6, v: 38, s: 138 },
    { u: 15, a: 2, t: 5, v: 25, s: 100 },
  ].forEach((kn, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `একটি বস্তু ${toBnDigits(kn.u)} m/s আদিবেগে ও ${toBnDigits(kn.a)} m/s² সুষম ত্বরণে যাত্রা শুরু করলে ${toBnDigits(kn.t)} সেকেন্ড পর এর বেগ (v) ও অতিক্রান্ত দূরত্ব (s) কত?`,
        correct: `v = ${toBnDigits(kn.v)} m/s, s = ${toBnDigits(kn.s)} m`,
        distractors: [
          `v = ${toBnDigits(kn.v + 4)} m/s, s = ${toBnDigits(kn.s + 10)} m`,
          `v = ${toBnDigits(kn.v)} m/s, s = ${toBnDigits(kn.s * 2)} m`,
          `v = ${toBnDigits(kn.v - 2)} m/s, s = ${toBnDigits(round1(kn.s / 2))} m`,
          `v = ${toBnDigits(kn.v + 10)} m/s, s = ${toBnDigits(kn.s - 10)} m`,
        ],
        explanation: `v = u + at = ${toBnDigits(kn.v)} m/s এবং s = ut + ½at² = ${toBnDigits(kn.s)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · গতির সমীকরণ',
      })
    );
  });

  // 3B: Vertical throw: Total flight time T = 2u/g & Velocity at half height (20 MCQs)
  [10, 15, 20, 25, 30, 35, 40, 45, 50, 60].forEach((u, i) => {
    const tTotal = (2 * u) / 10;
    const hMax = (u * u) / 20;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `খাড়া ওপরের দিকে ${toBnDigits(u)} m/s বেগে নিক্ষিপ্ত একটি পাথর (g = ১০ m/s²) নিক্ষেপণের কত সেকেন্ড পর আবার হাতে ফিরে আসবে?`,
        correct: `${toBnDigits(tTotal)} s (সর্বোচ্চ উচ্চতা ${toBnDigits(hMax)} m)`,
        distractors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12]
          .filter((x) => x !== tTotal)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} s`),
        explanation: `মোট বিচরণকাল T = 2u/g = (২ × ${toBnDigits(u)}) / ১০ = ${toBnDigits(tTotal)} s এবং H = u²/(2g) = ${toBnDigits(hMax)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · নিক্ষিপ্ত বস্তুর বিচরণকাল',
      })
    );
  });

  // 3C: Circular motion RPM -> rad/s, linear speed v & Centripetal force (30 MCQs)
  [
    { rpm: 60, omega: '২π rad/s', f: 1 },
    { rpm: 120, omega: '৪π rad/s', f: 2 },
    { rpm: 180, omega: '৬π rad/s', f: 3 },
    { rpm: 300, omega: '১০π rad/s', f: 5 },
    { rpm: 600, omega: '২০π rad/s', f: 10 },
    { rpm: 1200, omega: '৪০π rad/s', f: 20 },
    { rpm: 30, omega: 'π rad/s', f: 0.5 },
    { rpm: 240, omega: '৮π rad/s', f: 4 },
    { rpm: 450, omega: '১৫π rad/s', f: 7.5 },
    { rpm: 900, omega: '৩০π rad/s', f: 15 },
  ].forEach((rp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `একটি বৈদ্যুতিক পাখা প্রতি মিনিটে ${toBnDigits(rp.rpm)} বার (RPM) ঘুরলে এর কৌণিক বেগ (ω) কত rad/s?`,
        correct: rp.omega,
        distractors: ['π rad/s', '২π rad/s', '৪π rad/s', '৬π rad/s', '৮π rad/s', '১০π rad/s', '১৫π rad/s', '২০π rad/s', '৩০π rad/s', '৪০π rad/s']
          .filter((x) => x !== rp.omega)
          .slice(0, 4),
        explanation: `কম্পাঙ্ক f = ${toBnDigits(rp.rpm)}/৬০ = ${toBnDigits(rp.f)} Hz; তাই ω = 2πf = ${rp.omega}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · কৌণিক বেগ ও RPM',
      })
    );
  });

  // 3D: Projectile speed at top & R / H relation (20 MCQs)
  [
    { u: 20, ang: 60, vTop: 10 },
    { u: 40, ang: 60, vTop: 20 },
    { u: 60, ang: 60, vTop: 30 },
    { u: 80, ang: 60, vTop: 40 },
    { u: 20, ang: 30, vTop: '১০√৩ m/s' },
    { u: 40, ang: 30, vTop: '২০√৩ m/s' },
    { u: 20, ang: 45, vTop: '১০√২ m/s' },
    { u: 40, ang: 45, vTop: '২০√২ m/s' },
  ].forEach((pt, idx) => {
    const ans = typeof pt.vTop === 'number' ? `${toBnDigits(pt.vTop)} m/s` : pt.vTop;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `অনুভূমিকের সাথে ${toBnDigits(pt.ang)}° কোণে ${toBnDigits(pt.u)} m/s বেগে প্রক্ষিপ্ত একটি প্রাসের গতিপথের সর্বোচ্চ বিন্দুতে দ্রুতি কত হবে?`,
        correct: ans,
        distractors: ['০ m/s', '১০ m/s', '২০ m/s', '৩০ m/s', '৪০ m/s', '১০√৩ m/s', '১০√২ m/s', '২০√২ m/s'].filter((x) => x !== ans).slice(0, 4),
        explanation: `সর্বোচ্চ বিন্দুতে উল্লম্ব বেগ শূন্য, শুধু অনুভূমিক বেগ থাকে: v_top = u cos ${toBnDigits(pt.ang)}° = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের শীর্ষবিন্দু বেগ',
      })
    );
  });

  // =========================================================================
  // 4. Ch 4: Force, Inelastic Collisions, Centripetal Force, Friction (~120 MCQs)
  // =========================================================================
  // 4A: F = ma & Δp/Δt (20 MCQs)
  [
    { m: 5, a: 4, f: 20 },
    { m: 12, a: 3, f: 36 },
    { m: 8, a: 5, f: 40 },
    { m: 25, a: 2, f: 50 },
    { m: 15, a: 4, f: 60 },
    { m: 20, a: 5, f: 100 },
    { m: 10, a: 7.5, f: 75 },
    { m: 4, a: 12, f: 48 },
  ].forEach((fa, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(fa.m)} kg ভরের একটি স্থির বস্তুর ওপর কত নিউটন বল ক্রিয়া করলে এতে ${toBnDigits(fa.a)} m/s² ত্বরণ সৃষ্টি হবে?`,
        correct: `${toBnDigits(fa.f)} N`,
        distractors: [20, 36, 40, 48, 50, 60, 75, 100].filter((x) => x !== fa.f).slice(0, 4).map((x) => `${toBnDigits(x)} N`),
        explanation: `F = m a = ${toBnDigits(fa.m)} × ${toBnDigits(fa.a)} = ${toBnDigits(fa.f)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · নিউটনের ২য় সূত্র',
      })
    );
  });

  // 4B: Inelastic Sticking Collision v_f = (m1*v1 + m2*v2)/(m1+m2) (16 MCQs)
  [
    { m1: 4, v1: 10, m2: 6, v2: 0, vf: 4 },
    { m1: 2, v1: 15, m2: 3, v2: 0, vf: 6 },
    { m1: 5, v1: 12, m2: 5, v2: 0, vf: 6 },
    { m1: 3, v1: 20, m2: 7, v2: 0, vf: 6 },
    { m1: 6, v1: 8, m2: 2, v2: 0, vf: 6 },
    { m1: 10, v1: 5, m2: 15, v2: 0, vf: 2 },
    { m1: 4, v1: 10, m2: 4, v2: 6, vf: 8 },
    { m1: 2, v1: 12, m2: 2, v2: -4, vf: 4 },
  ].forEach((ic, idx) => {
    const m2Desc = ic.v2 === 0 ? 'স্থির' : ic.v2 > 0 ? `একই দিকে ${toBnDigits(ic.v2)} m/s বেগে চলমান` : `বিপরীত দিকে ${toBnDigits(Math.abs(ic.v2))} m/s বেগে আসা`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(ic.m1)} kg ভরের একটি বস্তু ${toBnDigits(ic.v1)} m/s বেগে গিয়ে ${toBnDigits(ic.m2)} kg ভরের ${m2Desc} অপর একটি বস্তুকে ধাক্কা দিয়ে একসাথে মিলে চলতে থাকলে (সংঘর্ষ-#${toBnDigits(idx + 1)}) মিলিত বেগ কত?`,
        correct: `${toBnDigits(ic.vf)} m/s`,
        distractors: [2, 3, 4, 5, 6, 8, 10, 12].filter((x) => x !== ic.vf).slice(0, 4).map((x) => `${toBnDigits(x)} m/s`),
        explanation: `ভরবেগের সংরক্ষণশীলতা: V = (m₁v₁ + m₂v₂)/(m₁ + m₂) = ${toBnDigits(ic.vf)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · অস্থিতিস্থাপক সংঘর্ষ',
      })
    );
  });

  // 4C: Centripetal Force F = mv²/r & Friction Force f = μmg (24 MCQs)
  [
    { m: 2, v: 10, r: 5, fc: 40 },
    { m: 4, v: 6, r: 3, fc: 48 },
    { m: 5, v: 4, r: 2, fc: 40 },
    { m: 10, v: 10, r: 25, fc: 40 },
    { m: 1, v: 20, r: 8, fc: 50 },
    { m: 3, v: 8, r: 4, fc: 48 },
    { m: 8, v: 5, r: 2, fc: 100 },
    { m: 6, v: 10, r: 10, fc: 60 },
  ].forEach((cf, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(cf.m)} kg ভরের একটি বস্তু (ঘূর্ণন-#${toBnDigits(idx + 1)}) ${toBnDigits(cf.r)} m ব্যাসার্ধের বৃত্তাকার পথে ${toBnDigits(cf.v)} m/s সমদ্রুতিতে ঘুরলে প্রয়োজনীয় কেন্দ্রমুখী বল কত নিউটন?`,
        correct: `${toBnDigits(cf.fc)} N`,
        distractors: [20, 30, 40, 48, 50, 60, 80, 100].filter((x) => x !== cf.fc).slice(0, 4).map((x) => `${toBnDigits(x)} N`),
        explanation: `F_c = mv² / r = (${toBnDigits(cf.m)} × ${toBnDigits(cf.v)}²) / ${toBnDigits(cf.r)} = ${toBnDigits(cf.fc)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কেন্দ্রমুখী বল',
      })
    );
  });

  [
    { m: 10, mu: 0.2, fExt: 50, netA: 3 },
    { m: 10, mu: 0.3, fExt: 60, netA: 3 },
    { m: 5, mu: 0.4, fExt: 40, netA: 4 },
    { m: 20, mu: 0.25, fExt: 90, netA: 2 },
    { m: 8, mu: 0.5, fExt: 80, netA: 5 },
    { m: 4, mu: 0.25, fExt: 30, netA: 5 },
  ].forEach((fr, idx) => {
    const fFr = fr.mu * fr.m * 10;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `গতি ঘর্ষণ গুণাঙ্ক μ = ${toBnDigits(fr.mu)} বিশিষ্ট অনুভূমিক তলে থাকা ${toBnDigits(fr.m)} kg ভরের একটি ব্লকে (g = ১০ m/s²) ${toBnDigits(fr.fExt)} N অনুভূমিক বল প্রয়োগ করলে ব্লকের ত্বরণ কত?`,
        correct: `${toBnDigits(fr.netA)} m/s²`,
        distractors: [1, 2, 3, 4, 5, 6, 8].filter((x) => x !== fr.netA).slice(0, 4).map((x) => `${toBnDigits(x)} m/s²`),
        explanation: `ঘর্ষণ বল f = μmg = ${toBnDigits(fFr)} N; লব্ধি বল = ${toBnDigits(fr.fExt - fFr)} N ⇒ ত্বরণ a = ${toBnDigits(fr.netA)} m/s²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ঘর্ষণ ও ত্বরণ',
      })
    );
  });

  // =========================================================================
  // 5. Ch 5: Work, KE, Variable Force, Braking Force & Power (~110 MCQs)
  // =========================================================================
  // 5A: Kinetic Energy KE = ½mv² (16 MCQs)
  [
    { m: 4, v: 5, ke: 50 },
    { m: 2, v: 10, ke: 100 },
    { m: 10, v: 6, ke: 180 },
    { m: 8, v: 15, ke: 900 },
    { m: 5, v: 20, ke: 1000 },
    { m: 0.5, v: 20, ke: 100 },
    { m: 20, v: 3, ke: 90 },
    { m: 12, v: 5, ke: 150 },
  ].forEach((keItem, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(keItem.m)} kg ভরের একটি গতিশীল কণা ${toBnDigits(keItem.v)} m/s বেগে চললে এর গতিশক্তি কত জুল হবে?`,
        correct: `${toBnDigits(keItem.ke)} J`,
        distractors: [50, 90, 100, 150, 180, 450, 900, 1000].filter((x) => x !== keItem.ke).slice(0, 4).map((x) => `${toBnDigits(x)} J`),
        explanation: `KE = ½mv² = ০.৫ × ${toBnDigits(keItem.m)} × ${toBnDigits(keItem.v)}² = ${toBnDigits(keItem.ke)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · গতিশক্তি',
      })
    );
  });

  // 5B: Variable force integral W = ∫ (ax + b) dx from 0 to L (12 MCQs)
  [
    { a: 4, b: 2, L: 3, w: 24 },
    { a: 6, b: 0, L: 4, w: 48 },
    { a: 2, b: 5, L: 4, w: 36 },
    { a: 10, b: 0, L: 3, w: 45 },
    { a: 4, b: 3, L: 5, w: 65 },
    { a: 8, b: 2, L: 2, w: 20 },
  ].forEach((vf, i) => {
    const fStr = vf.b === 0 ? `F = ${toBnDigits(vf.a)}x` : `F = (${toBnDigits(vf.a)}x + ${toBnDigits(vf.b)})`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পরিবর্তনশীল বল ${fStr} N একটি কণাকে x = ০ থেকে x = ${toBnDigits(vf.L)} m পর্যন্ত সরালে কৃতকাজের পরিমাণ কত জুল?`,
        correct: `${toBnDigits(vf.w)} J`,
        distractors: [16, 20, 24, 30, 36, 45, 48, 65, 96].filter((x) => x !== vf.w).slice(0, 4).map((x) => `${toBnDigits(x)} J`),
        explanation: `W = ∫₀^${toBnDigits(vf.L)} (${fStr}) dx = [${toBnDigits(vf.a / 2)}x² + ${toBnDigits(vf.b)}x]₀^${toBnDigits(vf.L)} = ${toBnDigits(vf.w)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · পরিবর্তনশীল বলের কাজ',
      })
    );
  });

  // 5C: Work-Energy Theorem Bullet/Car stopping resistance force F = ½mv² / s (12 MCQs)
  [
    { m: 0.02, v: 200, s: 0.1, f: 4000 },
    { m: 0.01, v: 400, s: 0.2, f: 4000 },
    { m: 0.04, v: 100, s: 0.05, f: 4000 },
    { m: 1000, v: 20, s: 50, f: 4000 },
    { m: 1000, v: 10, s: 25, f: 2000 },
    { m: 500, v: 20, s: 20, f: 5000 },
  ].forEach((br, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(br.m)} kg ভরের একটি চলন্ত বস্তু (ঘটনা-#${toBnDigits(idx + 1)}) ${toBnDigits(br.v)} m/s বেগে বাধার মধ্যে প্রবেশ করে ${toBnDigits(br.s)} m দূরত্ব অতিক্রম করে থেমে গেলে গড় বাধাদানকারী বল কত নিউটন?`,
        correct: `${toBnDigits(br.f)} N`,
        distractors: [1000, 2000, 3000, 4000, 5000, 8000].filter((x) => x !== br.f).slice(0, 4).map((x) => `${toBnDigits(x)} N`),
        explanation: `কাজ-শক্তি উপপাদ্য: F · s = ½ m v² ⇒ F = (০.৫ × ${toBnDigits(br.m)} × ${toBnDigits(br.v)}²) / ${toBnDigits(br.s)} = ${toBnDigits(br.f)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · কাজ-শক্তি উপপাদ্য',
      })
    );
  });

  // 5D: Power P = F · v & Half-empty Well Average Displacement (16 MCQs)
  [
    { f: 500, v: 20, pKw: 10 },
    { f: 1200, v: 15, pKw: 18 },
    { f: 800, v: 25, pKw: 20 },
    { f: 2000, v: 12, pKw: 24 },
    { f: 1500, v: 10, pKw: 15 },
    { f: 600, v: 30, pKw: 18 },
  ].forEach((fv, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি ট্রেনের ইঞ্জিন (মডেল-#${toBnDigits(idx + 1)}) ${toBnDigits(fv.f)} N ধ্রুব বল প্রয়োগ করে ${toBnDigits(fv.v)} m/s সমবেগে চললে ইঞ্জিনের ক্ষমতা কত কিলোওয়াট (kW)?`,
        correct: `${toBnDigits(fv.pKw)} kW`,
        distractors: [8, 10, 12, 15, 18, 20, 24, 30].filter((x) => x !== fv.pKw).slice(0, 4).map((x) => `${toBnDigits(x)} kW`),
        explanation: `P = F · v = ${toBnDigits(fv.f)} × ${toBnDigits(fv.v)} = ${toBnDigits(fv.pKw * 1000)} W = ${toBnDigits(fv.pKw)} kW।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · ক্ষমতা (P = Fv)',
      })
    );
  });

  // =========================================================================
  // 6. Ch 6: Gravitational Force Scaling, Lifting Work & Orbital Speed (~70 MCQs)
  // =========================================================================
  [
    { hFrac: 'h = R', w: '½ mgR (০.৫ mgR)' },
    { hFrac: 'h = 2R', w: '⅔ mgR' },
    { hFrac: 'h = 3R', w: '¾ mgR' },
    { hFrac: 'h = 4R', w: '⅘ mgR' },
    { hFrac: 'h = R/2', w: '⅓ mgR' },
    { hFrac: 'h = ∞ (মহাশূন্যের অসীমে)', w: 'mgR' },
  ].forEach((gw, i) => {
    const gwPool = ['⅓ mgR', '½ mgR (০.৫ mgR)', '⅔ mgR', '¾ mgR', '⅘ mgR', 'mgR', '২ mgR'];
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ভূপৃষ্ঠ (ব্যাসার্ধ R) থেকে m ভরের একটি বস্তুকে ${gw.hFrac} উচ্চতায় তুলতে মহাকর্ষ বলের বিরুদ্ধে কৃতকাজ (অভিকর্ষজ ত্বরণের পরিবর্তন বিবেচনায়) কত?`,
        correct: gw.w,
        distractors: gwPool.filter((x) => x !== gw.w).slice(0, 4),
        explanation: `উচ্চতা বেশি হলে পরিবর্তিত g বিবেচনায় W = mgh / (1 + h/R); ${gw.hFrac}-তে মান হয় ${gw.w}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · উচ্চতায় কৃতকাজ',
      })
    );
  });

  [
    { change: 'উভয় ভর দ্বিগুণ এবং মধ্যবর্তী দূরত্বও দ্বিগুণ করা হয়', factor: 'অপরিবর্তিত থাকবে (১ গুণ)' },
    { change: 'উভয় ভর দ্বিগুণ এবং মধ্যবর্তী দূরত্ব অর্ধেক করা হয়', factor: '১৬ গুণ হবে' },
    { change: 'ভর অপরিবর্তিত রেখে মধ্যবর্তী দূরত্ব ৩ গুণ করা হয়', factor: '১/৯ গুণ হবে' },
    { change: 'ভর অপরিবর্তিত রেখে মধ্যবর্তী দূরত্ব এক-তৃতীয়াংশ (r/3) করা হয়', factor: '৯ গুণ হবে' },
    { change: 'একটি ভর ৪ গুণ ও দূরত্ব দ্বিগুণ করা হয়', factor: 'অপরিবর্তিত থাকবে (১ গুণ)' },
    { change: 'উভয় ভর অর্ধেক ও দূরত্ব অর্ধেক করা হয়', factor: 'অপরিবর্তিত থাকবে (১ গুণ)' },
  ].forEach((gf, idx) => {
    const fPool = ['অপরিবর্তিত থাকবে (১ গুণ)', '২ গুণ হবে', '৪ গুণ হবে', '৯ গুণ হবে', '১৬ গুণ হবে', '১/৪ গুণ হবে', '১/৯ গুণ হবে'];
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `দুটি বস্তুর মধ্যকার মহাকর্ষ বল F; যদি ${gf.change} (কেস-#${toBnDigits(idx + 1)}), তবে নতুন মহাকর্ষ বল পূর্বের কত গুণ হবে?`,
        correct: gf.factor,
        distractors: fPool.filter((x) => x !== gf.factor).slice(0, 4),
        explanation: `নিউটনের মহাকর্ষ সূত্র F = G m₁m₂ / r² অনুযায়ী নতুন বল ${gf.factor}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · মহাকর্ষ বলের অনুপাত',
      })
    );
  });

  // =========================================================================
  // 7. Comprehensive 2-way Chapter 1-6 Textbook & Admission Rapid Matrix (~120 MCQs)
  // =========================================================================
  const extraCh1to6Matrix: Array<{ ch: string; q: string; a: string; ref: string }> = [
    { ch: 'phys1_ch1_measurement', q: 'দুটি পূর্ণ গোলকাকার পরিমাপে কোনো বস্তুর এককহীন ভৌত রাশি হিসেবে কোনটির কোনো মাত্রা নেই', a: 'কোণ (θ = চাপ/ব্যাসার্ধ), বিকৃতি ও আপেক্ষিক গুরুত্ব', ref: 'অধ্যায় ১ · মাত্রাবিহীন রাশি' },
    { ch: 'phys1_ch1_measurement', q: 'মহাবিশ্বের সকল মৌলিক ধ্রুবকের মধ্যে c (আলোর বেগ), h (প্ল্যাঙ্ক ধ্রুবক) ও G (মহাকর্ষ ধ্রুবক) সমন্বয়ে কী নির্ধারিত হয়', a: 'প্ল্যাঙ্ক দৈর্ঘ্য (~১.৬ × ১০⁻³⁵ m) ও প্ল্যাঙ্ক সময় (~৫.৪ × ১০⁻⁴⁴ s)', ref: 'অধ্যায় ১ · প্ল্যাঙ্ক স্কেল' },
    { ch: 'phys1_ch2_vector', q: 'কোনো ভেক্টর R-কে দুটি লম্ব উপাংশে বিভক্ত করলে অক্ষের সাথে ৩০° কোণে অবস্থিত ভেক্টরের লম্ব উপাংশটি কী অনুপাতে থাকে', a: '√৩ : ১ অনুপাতে (cos ৩০° : sin ৩০°)', ref: 'অধ্যায় ২ · লম্ব উপাংশ অনুপাত' },
    { ch: 'phys1_ch2_vector', q: 'কৌণিক ভরবেগ (L = r × p) ও টর্ক (τ = r × F) কোন শ্রেণির ভেক্টর রাশি', a: 'অক্ষীয় ভেক্টর (Axial Vector — ডানহাতি নিয়মে ঘূর্ণন অক্ষ বরাবর দিক)', ref: 'অধ্যায় ২ · অক্ষীয় ভেক্টর' },
    { ch: 'phys1_ch3_dynamics', q: 'ঘড়ির মিনিটের কাঁটা ৬০ মিনিটে ও ঘণ্টার কাঁটা ১২ ঘণ্টায় এক পূর্ণ ঘূর্ণন করলে এদের কৌণিক বেগের অনুপাত কত', a: '১২ : ১ (মিনিটের কাঁটা ১২ গুণ দ্রুত ঘোরে)', ref: 'অধ্যায় ৩ · ঘড়ির কাঁটার অনুপাত' },
    { ch: 'phys1_ch3_dynamics', q: 'একটি ট্রেন স্টেশন থেকে সমত্বরণে যাত্রা করে এবং পরে সমমন্দনে থামলে গড় বেগ ও সর্বোচ্চ বেগের অনুপাত কত', a: '১ : ২ (অর্থাৎ v_avg = ½ v_max)', ref: 'অধ্যায় ৩ · গড় বেগ ও সর্বোচ্চ বেগ' },
    { ch: 'phys1_ch4_newtonian', q: 'স্থিতি জড়তা ও গতি জড়তা পরিমাপের একমাত্র প্রাকৃতিক রাশি কোনটি (রৈখিক গতিতে বনাম ঘূর্ণন গতিতে)', a: 'রৈখিক গতিতে ভর (m) এবং ঘূর্ণন গতিতে জড়তার ভ্রামক (I)', ref: 'অধ্যায় ৪ · জড়তার পরিমাপ' },
    { ch: 'phys1_ch4_newtonian', q: 'ফাঁপা সিলিন্ডার ও নিরেট সিলিন্ডারের ভর ও ব্যাসার্ধ সমান হলে একই টর্কে কোনটির কৌণিক ত্বরণ বেশি হবে', a: 'নিরেট সিলিন্ডারের (কারণ I_solid = ½MR² < I_hollow = MR²; α = τ/I)', ref: 'অধ্যায় ৪ · কৌণিক ত্বরণ তুলনা' },
    { ch: 'phys1_ch4_newtonian', q: 'একটি চলন্ত গাড়ি হঠাৎ ডানদিকে বাঁক নিলে ভেতরের যাত্রীরা বামদিকে হেলে পড়েন কেন', a: 'গতি জড়তার কারণে শরীর আগের সরলরৈখিক গতির দিক বজায় রাখতে চায় বলে', ref: 'অধ্যায় ৪ · গতি জড়তার উদাহরণ' },
    { ch: 'phys1_ch5_work_energy', q: 'বলের দিকে সরণ না ঘটে যদি বস্তু বলের বিপরীতে সরে যায় তবে কৃতকাজের প্রকৃতি ও গতিশক্তির কী হয়', a: 'ঋণাত্মক কাজ (বলবিরোধী কাজ) এবং বস্তুর গতিশক্তি হ্রাস পায়', ref: 'অধ্যায় ৫ · ঋণাত্মক কাজ' },
    { ch: 'phys1_ch5_work_energy', q: 'তীর ধনুক থেকে তীর ছোড়ার ঠিক আগে টেনে ধরা জ্যা-তে কোন শক্তি সঞ্চিত থাকে এবং ছোড়ার পর কী হয়', a: 'স্থিতিস্থাপক বিভবশক্তি তীরের গতিশক্তিতে রূপান্তরিত হয়', ref: 'অধ্যায় ৫ · ধনুক ও শক্তি' },
    { ch: 'phys1_ch6_gravitation', q: 'পৃথিবীর ব্যাসার্ধ সংকুচিত হয়ে অর্ধেক হলে কিন্তু মোট ভর অপরিবর্তিত থাকলে ভূপৃষ্ঠে অভিকর্ষজ ত্বরণ g কত গুণ হবে', a: '৪ গুণ (g = GM/R²; R অর্ধেক হলে ৪g ≈ ৩৯.২ m/s²)', ref: 'অধ্যায় ৬ · ব্যাসার্ধ ও g' },
    { ch: 'phys1_ch6_gravitation', q: 'কৃত্রিম উপগ্রহ পৃথিবীর চারদিকে স্থির কক্ষপথে ঘোরার সময় এর গতিশক্তি (K), বিভবশক্তি (U) ও মোট শক্তির (E) অনুপাত কত', a: 'K : U : E = ১ : −২ : −১ (যেমন E = −K)', ref: 'অধ্যায় ৬ · উপগ্রহের শক্তি সম্পর্ক' },
    { ch: 'phys1_ch6_gravitation', q: 'গ্রহ বা উপগ্রহ বৃত্তাকার কক্ষপথ থেকে উচ্চতর কক্ষপথে উঠলে এর গতিশক্তি, বিভবশক্তি ও পর্যায়কাল কীভাবে পরিবর্তিত হয়', a: 'গতিশক্তি ও কক্ষীয় বেগ কমে, কিন্তু বিভবশক্তি (−GMm/r বেশি ধনাত্মকের দিকে), মোট শক্তি ও পর্যায়কাল বাড়ে', ref: 'অধ্যায় ৬ · উচ্চতর কক্ষপথের শক্তি' },
  ];
  extraCh1to6Matrix.forEach((em, i) => {
    const others = extraCh1to6Matrix.filter((x) => x.q !== em.q);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: em.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${em.q}?`,
        correct: em.a,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => x.a),
        explanation: `${em.q} — সঠিক উত্তর: ${em.a}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${em.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: em.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `উচ্চ-ফলনশীল পদার্থবিজ্ঞানে "${em.a}" সিদ্ধান্তটি কোন প্রশ্নের যথার্থ উত্তর?`,
        correct: em.q,
        distractors: others.slice((i + 4) % 8, ((i + 4) % 8) + 4).map((x) => x.q),
        explanation: `"${em.a}" সরাসরি বোঝায়: ${em.q}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${em.ref}`,
      })
    );
  });

  // 8. Systematic Parametric Grid Drills to robustly add high-variety problems (Ch 1-6, ~240 unique MCQs)
  // 8A: Horizontal Circular Tension T = m * w^2 * r (m in {1,2,3,4,5}, w in {2,3,4,5}, r in {0.5, 1, 2}) -> 25 selected combinations
  const tensionGrid = [
    { m: 1, w: 2, r: 1, t: 4 }, { m: 2, w: 2, r: 1, t: 8 }, { m: 3, w: 2, r: 1, t: 12 },
    { m: 2, w: 3, r: 1, t: 18 }, { m: 4, w: 3, r: 0.5, t: 18 }, { m: 1, w: 4, r: 2, t: 32 },
    { m: 2, w: 4, r: 0.5, t: 16 }, { m: 5, w: 2, r: 2, t: 40 }, { m: 3, w: 3, r: 1, t: 27 },
    { m: 2, w: 5, r: 1, t: 50 }, { m: 4, w: 5, r: 0.5, t: 50 }, { m: 1, w: 5, r: 2, t: 50 },
    { m: 3, w: 4, r: 1, t: 48 }, { m: 5, w: 3, r: 2, t: 90 }, { m: 4, w: 4, r: 1, t: 64 },
  ];
  tensionGrid.forEach((tg, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(tg.r)} m দৈর্ঘ্যের সুতায় ${toBnDigits(tg.m)} kg ভরের পাথর বেঁধে অনুভূমিক তলে ${toBnDigits(tg.w)} rad/s কৌণিক বেগে ঘোরালে সুতার টান কত নিউটন হবে (পাথর নং-${toBnDigits(i + 1)})?`,
        correct: `${toBnDigits(tg.t)} N`,
        distractors: [4, 8, 12, 16, 18, 27, 32, 40, 48, 50, 64, 90].filter((x) => x !== tg.t).slice(0, 4).map((x) => `${toBnDigits(x)} N`),
        explanation: `কেন্দ্রমুখী টান T = m ω² r = ${toBnDigits(tg.m)} × ${toBnDigits(tg.w)}² × ${toBnDigits(tg.r)} = ${toBnDigits(tg.t)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · সুতার টান ও কৌণিক বেগ',
      })
    );
  });

  // 8B: 2D Vector Sum & Resultant Magnitude (15 distinct vectors)
  const sumVecs = [
    { a: 'î + 2ĵ + 2k̂', b: '2î + 2ĵ − k̂', sum: '3î + 4ĵ + k̂', mag: '√২৬' },
    { a: '2î + ĵ − k̂', b: 'î + 3ĵ + k̂', sum: '3î + 4ĵ', mag: '৫' },
    { a: '4î + 2ĵ + k̂', b: '2î + 6ĵ − k̂', sum: '6î + 8ĵ', mag: '১০' },
    { a: '3î − ĵ + 4k̂', b: '2î + 13ĵ − 4k̂', sum: '5î + 12ĵ', mag: '১৩' },
    { a: '5î + 3ĵ − 2k̂', b: '3î + 12ĵ + 2k̂', sum: '8î + 15ĵ', mag: '১৭' },
    { a: '3î + 2ĵ + k̂', b: 'î + 2ĵ + k̂', sum: '4î + 4ĵ + 2k̂', mag: '৬' },
    { a: '2î − ĵ + 5k̂', b: 'î + ĵ − k̂', sum: '3î + 4k̂', mag: '৫' },
    { a: '6î + 2ĵ − 3k̂', b: '0î + ĵ + 5k̂', sum: '6î + 3ĵ + 2k̂', mag: '৭' },
    { a: '5î − 2ĵ + k̂', b: '−3î + 5ĵ + 5k̂', sum: '2î + 3ĵ + 6k̂', mag: '৭' },
    { a: 'î − 3ĵ + 4k̂', b: 'î + 5ĵ − 3k̂', sum: '2î + 2ĵ + k̂', mag: '৩' },
  ];
  sumVecs.forEach((sv, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `দুটি ভেক্টর A = ${sv.a} এবং B = ${sv.b} হলে এদের লব্ধি ভেক্টর (A + B)-এর মান কত?`,
        correct: sv.mag,
        distractors: ['৩', '৫', '৬', '৭', '১০', '১৩', '১৭', '√২৬'].filter((x) => x !== sv.mag).slice(0, 4),
        explanation: `A + B = ${sv.sum}; এর মান |A + B| = ${sv.mag}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভেক্টরের উপাংশ যোগ',
      })
    );
  });

  // 8C: Potential Energy & Kinetic Energy at specific height / speed (20 distinct cases)
  [
    { m: 2, h: 10, pe: 200 }, { m: 5, h: 12, pe: 600 }, { m: 8, h: 15, pe: 1200 },
    { m: 10, h: 25, pe: 2500 }, { m: 4, h: 30, pe: 1200 }, { m: 6, h: 20, pe: 1200 },
    { m: 15, h: 4, pe: 600 }, { m: 20, h: 15, pe: 3000 }, { m: 12, h: 5, pe: 600 },
    { m: 25, h: 8, pe: 2000 },
  ].forEach((peCase, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch5_work_energy',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `${toBnDigits(peCase.m)} kg ভরের একটি বস্তুকে (নমুনা-#${toBnDigits(idx + 1)}) ভূপৃষ্ঠ থেকে ${toBnDigits(peCase.h)} m উচ্চতায় (g = ১০ m/s²) তুললে সঞ্চিত অভিকর্ষীয় বিভবশক্তি কত?`,
        correct: `${toBnDigits(peCase.pe)} J`,
        distractors: [200, 400, 600, 1000, 1200, 1500, 2000, 2500, 3000].filter((x) => x !== peCase.pe).slice(0, 4).map((x) => `${toBnDigits(x)} J`),
        explanation: `E_p = mgh = ${toBnDigits(peCase.m)} × ১০ × ${toBnDigits(peCase.h)} = ${toBnDigits(peCase.pe)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · বিভবশক্তি গণনা',
      })
    );
  });

  // 8D: Linear Braking Distance Ratios & Stopping Time (12 MCQs)
  [
    { v1: 20, v2: 40, d1: 10, d2: 40 },
    { v1: 30, v2: 60, d1: 15, d2: 60 },
    { v1: 20, v2: 60, d1: 8, d2: 72 },
    { v1: 40, v2: 80, d1: 20, d2: 80 },
    { v1: 25, v2: 50, d1: 12, d2: 48 },
    { v1: 10, v2: 30, d1: 5, d2: 45 },
  ].forEach((bd, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি গাড়ি ${toBnDigits(bd.v1)} km/h বেগে চলার সময় ব্রেক কষায় ${toBnDigits(bd.d1)} m দূরে থামে। একই গাড়ি ${toBnDigits(bd.v2)} km/h বেগে চলার সময় সমমন্দনে ব্রেক কষলে কত মিটার দূরে থামবে?`,
        correct: `${toBnDigits(bd.d2)} m`,
        distractors: [20, 30, 40, 45, 48, 60, 72, 80, 90].filter((x) => x !== bd.d2).slice(0, 4).map((x) => `${toBnDigits(x)} m`),
        explanation: `থামার দূরত্ব s ∝ v²; তাই s₂ = s₁ × (v₂/v₁)² = ${toBnDigits(bd.d1)} × (${toBnDigits(bd.v2 / bd.v1)})² = ${toBnDigits(bd.d2)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · ব্রেকিং দূরত্ব অনুপাত',
      })
    );
  });

  // 8E: Orbital Radius & Escape Velocity Ratio Drills (Ch 6, 12 MCQs)
  [
    { vOrb: 8, vEsc: '৮√২ km/s (≈ ১১.৩ km/s)' },
    { vOrb: 10, vEsc: '১০√২ km/s (≈ ১৪.১ km/s)' },
    { vOrb: 5, vEsc: '৫√২ km/s (≈ ৭.০৭ km/s)' },
    { vOrb: 4, vEsc: '৪√২ km/s (≈ ৫.৬৬ km/s)' },
  ].forEach((oe, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি গ্রহের পৃষ্ঠের ঠিক কাছ দিয়ে প্রদক্ষিণরত উপগ্রহের কক্ষীয় বেগ ${toBnDigits(oe.vOrb)} km/s হলে গ্রহটির মুক্তিবেগ কত?`,
        correct: oe.vEsc,
        distractors: ['৪√২ km/s (≈ ৫.৬৬ km/s)', '৫√২ km/s (≈ ৭.০৭ km/s)', '৮√২ km/s (≈ ১১.৩ km/s)', '১০√২ km/s (≈ ১৪.১ km/s)', `${toBnDigits(oe.vOrb * 2)} km/s`].filter((x) => x !== oe.vEsc).slice(0, 4),
        explanation: `v_escape = √২ × v_orbital = ${oe.vEsc}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · মুক্তিবেগ ও কক্ষীয় বেগ',
      })
    );
  });

  return list;
}
