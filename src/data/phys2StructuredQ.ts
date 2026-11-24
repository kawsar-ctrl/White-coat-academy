import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

const uniqueDists = (correct: string, candidates: string[]): string[] =>
  Array.from(new Set(candidates)).filter((c) => c !== correct).slice(0, 4);

export function buildPhys2StructuredQ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sq_${String(seq++).padStart(4, '0')}`;

  // 1. Thermometer Scale Conversions (°C <-> °F <-> K) (Ch 1) — 36 MCQs
  const celsiusVals = [20, 25, 30, 35, 37, 40, 45, 50, 60, 75, 80, 100];
  celsiusVals.forEach((c) => {
    const f = Number(((9 * c) / 5 + 32).toFixed(1));
    const k = Number((c + 273.15).toFixed(2));
    const fAns = `${toBnDigits(f)} °F`;
    const kAns = `${toBnDigits(k)} K`;
    const dF = Number(((9 * c) / 5).toFixed(1));
    const dfAns = `${toBnDigits(dF)} °F`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'board',
        question: `সেলসিয়াস স্কেলে কোনো বস্তুর তাপমাত্রা ${toBnDigits(c)} °C হলে ফারেনহাইট স্কেলে ওই তাপমাত্রার পাঠ কত হবে?`,
        correct: fAns,
        distractors: uniqueDists(fAns, [
          `${toBnDigits(Number((f + 18).toFixed(1)))} °F`,
          `${toBnDigits(Number((f - 10).toFixed(1)))} °F`,
          `${toBnDigits(Number(((5 * c) / 9 + 32).toFixed(1)))} °F`,
          `${toBnDigits(Number((c + 32).toFixed(1)))} °F`,
          `${toBnDigits(Number((f + 9).toFixed(1)))} °F`,
        ]),
        explanation: `সূত্র: C/5 = (F − 32)/9 ⇒ F = (9/5)×${toBnDigits(c)} + 32 = ${fAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপমাত্রার স্কেল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(c)} °C তাপমাত্রাকে পরম বা কেলভিন স্কেলে প্রকাশ করলে মান কত কেলভিন হবে?`,
        correct: kAns,
        distractors: uniqueDists(kAns, [
          `${toBnDigits(Number((273.15 - c).toFixed(2)))} K`,
          `${toBnDigits(Number((k + 100).toFixed(2)))} K`,
          `${toBnDigits(Number((k - 32).toFixed(2)))} K`,
          `${toBnDigits(Number((k + 25).toFixed(2)))} K`,
          `${toBnDigits(Number((k + 50).toFixed(2)))} K`,
        ]),
        explanation: `T(K) = θ(°C) + ২৭৩.১৫ = ${toBnDigits(c)} + ২৭৩.১৫ = ${kAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কেলভিন স্কেল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `কোনো সিস্টেমের তাপমাত্রা ${toBnDigits(c)} °C বৃদ্ধি করলে ফারেনহাইট স্কেলে তাপমাত্রা কত ডিগ্রি ফারেনহাইট বাড়বে?`,
        correct: dfAns,
        distractors: uniqueDists(dfAns, [
          fAns,
          `${toBnDigits(c)} °F`,
          `${toBnDigits(Number((dF + 15).toFixed(1)))} °F`,
          `${toBnDigits(Number((dF / 2).toFixed(1)))} °F`,
          `${toBnDigits(Number((dF + 27).toFixed(1)))} °F`,
        ]),
        explanation: `তাপমাত্রার পার্থক্যের ক্ষেত্রে ΔF = (9/5) × ΔC = ১.৮ × ${toBnDigits(c)} = ${dfAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপমাত্রার ব্যবধান',
      })
    );
  });

  // 2. Carnot Engine Efficiency, Work & Heat Rejected (Ch 1) — 36 MCQs
  const carnotCases: Array<{ t1C: number; t2C: number; q1: number }> = [
    { t1C: 327, t2C: 27, q1: 1000 },
    { t1C: 227, t2C: 27, q1: 2000 },
    { t1C: 127, t2C: 27, q1: 1200 },
    { t1C: 527, t2C: 127, q1: 1600 },
    { t1C: 427, t2C: 77, q1: 1400 },
    { t1C: 727, t2C: 227, q1: 2500 },
    { t1C: 627, t2C: 177, q1: 1800 },
    { t1C: 227, t2C: 127, q1: 1500 },
    { t1C: 327, t2C: 127, q1: 2400 },
    { t1C: 927, t2C: 27, q1: 4000 },
    { t1C: 527, t2C: 27, q1: 3200 },
    { t1C: 427, t2C: 147, q1: 2100 },
  ];
  carnotCases.forEach(({ t1C, t2C, q1 }) => {
    const t1 = t1C + 273;
    const t2 = t2C + 273;
    const eff = Number(((1 - t2 / t1) * 100).toFixed(1));
    const work = Number(((eff / 100) * q1).toFixed(0));
    const q2 = Number((q1 - work).toFixed(0));
    const effAns = `${toBnDigits(eff)}%`;
    const workAns = `${toBnDigits(work)} J`;
    const q2Ans = `${toBnDigits(q2)} J`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি কার্নো ইঞ্জিন ${toBnDigits(t1C)} °C তাপমাত্রার উৎস থেকে তাপ গ্রহণ করে ${toBnDigits(t2C)} °C তাপমাত্রার গ্রাহকে বর্জন করলে ইঞ্জিনটির কর্মদক্ষতা কত?`,
        correct: effAns,
        distractors: uniqueDists(effAns, [
          `${toBnDigits(Number((100 - eff).toFixed(1)))}%`,
          `${toBnDigits(Number(Math.min(96, eff + 15).toFixed(1)))}%`,
          `${toBnDigits(Number(Math.max(5, eff - 12).toFixed(1)))}%`,
          `${toBnDigits(Number(((1 - t2C / t1C) * 100).toFixed(1)))}%`,
          `${toBnDigits(Number(Math.min(99, eff + 22).toFixed(1)))}%`,
        ]),
        explanation: `দক্ষতা η = (1 − T₂/T₁) × ১০০% = (1 − ${toBnDigits(t2)}/${toBnDigits(t1)}) × ১০০% = ${effAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কার্নো ইঞ্জিনের দক্ষতা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(t1C)} °C ও ${toBnDigits(t2C)} °C তাপমাত্রার মধ্যে কার্যরত একটি কার্নো ইঞ্জিন উৎস থেকে ${toBnDigits(q1)} J তাপ শোষণ করলে প্রতি চক্রে কৃতকাজ কত জুল?`,
        correct: workAns,
        distractors: uniqueDists(workAns, [
          q2Ans,
          `${toBnDigits(q1)} J`,
          `${toBnDigits(work + 250)} J`,
          `${toBnDigits(Math.max(50, work - 180))} J`,
          `${toBnDigits(work + 400)} J`,
        ]),
        explanation: `কৃতকাজ W = η × Q₁ = (${toBnDigits(eff)}/১০০) × ${toBnDigits(q1)} = ${workAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কার্নো ইঞ্জিনের কৃতকাজ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(t1C)} °C তাপমাত্রার উৎস থেকে ${toBnDigits(q1)} J তাপ নিয়ে ${toBnDigits(t2C)} °C তাপমাত্রার তাপগ্রাহকে একটি কার্নো ইঞ্জিন কত জুল তাপ বর্জন করবে?`,
        correct: q2Ans,
        distractors: uniqueDists(q2Ans, [
          workAns,
          `${toBnDigits(q1)} J`,
          `${toBnDigits(q2 + 200)} J`,
          `${toBnDigits(Math.max(50, q2 - 150))} J`,
          `${toBnDigits(q2 + 350)} J`,
        ]),
        explanation: `বর্জিত তাপ Q₂ = Q₁ × (T₂/T₁) = ${toBnDigits(q1)} × (${toBnDigits(t2)}/${toBnDigits(t1)}) = ${q2Ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · বর্জিত তাপ নির্ণয়',
      })
    );
  });

  // 3. Static Electricity: Coulomb Force, Field & Potential (Ch 2) — 36 MCQs
  const chargeCases: Array<{ q1uC: number; q2uC: number; rCm: number }> = [
    { q1uC: 2, q2uC: 8, rCm: 20 },
    { q1uC: 4, q2uC: 9, rCm: 30 },
    { q1uC: 5, q2uC: 5, rCm: 50 },
    { q1uC: 1, q2uC: 4, rCm: 10 },
    { q1uC: 3, q2uC: 6, rCm: 30 },
    { q1uC: 10, q2uC: 10, rCm: 100 },
    { q1uC: 8, q2uC: 2, rCm: 40 },
    { q1uC: 6, q2uC: 12, rCm: 60 },
    { q1uC: 9, q2uC: 4, rCm: 20 },
    { q1uC: 12, q2uC: 3, rCm: 30 },
    { q1uC: 16, q2uC: 1, rCm: 40 },
    { q1uC: 25, q2uC: 4, rCm: 50 },
  ];
  chargeCases.forEach(({ q1uC, q2uC, rCm }) => {
    const rM = rCm / 100;
    const force = Number(((9e9 * q1uC * 1e-6 * q2uC * 1e-6) / (rM * rM)).toFixed(2));
    const pot = Number(((9e9 * q1uC * 1e-6) / rM).toFixed(0));
    const field = Number(((9e9 * q1uC * 1e-6) / (rM * rM)).toFixed(0));
    const fAns = `${toBnDigits(force)} N`;
    const potAns = `${toBnDigits(pot)} V`;
    const eAns = `${toBnDigits(field)} N/C`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `শূন্যস্থানে ${toBnDigits(rCm)} cm ব্যবধানে অবস্থিত +${toBnDigits(q1uC)} μC এবং +${toBnDigits(q2uC)} μC দুটি বিন্দু আধানের মধ্যকার কুলম্ব বিকর্ষণ বল কত নিউটন?`,
        correct: fAns,
        distractors: uniqueDists(fAns, [
          `${toBnDigits(Number((force * 2).toFixed(2)))} N`,
          `${toBnDigits(Number((force / 2).toFixed(2)))} N`,
          `${toBnDigits(Number((force * 10).toFixed(2)))} N`,
          `${toBnDigits(Number((force + 1.5).toFixed(2)))} N`,
          `${toBnDigits(Number((force + 3.2).toFixed(2)))} N`,
        ]),
        explanation: `F = (9×10⁹ × ${toBnDigits(q1uC)}×10⁻⁶ × ${toBnDigits(q2uC)}×10⁻⁶) / (${toBnDigits(rM)})² = ${fAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · কুলম্বের সূত্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `+${toBnDigits(q1uC)} μC একটি বিন্দু আধান থেকে বায়ু মাধ্যমে ${toBnDigits(rCm)} cm দূরে তড়িৎ বিভব কত ভোল্ট?`,
        correct: potAns,
        distractors: uniqueDists(potAns, [
          `${toBnDigits(pot * 2)} V`,
          `${toBnDigits(Math.round(pot / 2))} V`,
          `${toBnDigits(field)} V`,
          `${toBnDigits(pot + 15000)} V`,
          `${toBnDigits(pot + 30000)} V`,
        ]),
        explanation: `বিভব V = (9×10⁹ × ${toBnDigits(q1uC)}×10⁻⁶) / ${toBnDigits(rM)} = ${potAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · তড়িৎ বিভব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `শূন্যস্থানে +${toBnDigits(q1uC)} μC আধান থেকে ${toBnDigits(rCm)} cm দূরত্বে সৃষ্ট তড়িৎ ক্ষেত্র প্রাবল্য E কত N/C?`,
        correct: eAns,
        distractors: uniqueDists(eAns, [
          `${toBnDigits(pot)} N/C`,
          `${toBnDigits(field * 2)} N/C`,
          `${toBnDigits(Math.round(field / 2))} N/C`,
          `${toBnDigits(field + 50000)} N/C`,
          `${toBnDigits(field + 120000)} N/C`,
        ]),
        explanation: `প্রাবল্য E = (9×10⁹ × ${toBnDigits(q1uC)}×10⁻⁶) / (${toBnDigits(rM)})² = ${eAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · তড়িৎ ক্ষেত্র প্রাবল্য',
      })
    );
  });

  // 4. Capacitors: Energy, Series & Parallel (Ch 2) — 30 MCQs
  const capCases: Array<{ c1: number; c2: number; v: number }> = [
    { c1: 6, c2: 3, v: 100 },
    { c1: 4, c2: 4, v: 200 },
    { c1: 12, c2: 6, v: 100 },
    { c1: 10, c2: 15, v: 50 },
    { c1: 8, c2: 8, v: 150 },
    { c1: 20, c2: 30, v: 200 },
    { c1: 3, c2: 6, v: 300 },
    { c1: 12, c2: 4, v: 100 },
    { c1: 15, c2: 10, v: 200 },
    { c1: 2, c2: 2, v: 500 },
  ];
  capCases.forEach(({ c1, c2, v }) => {
    const cs = Number(((c1 * c2) / (c1 + c2)).toFixed(2));
    const cp = c1 + c2;
    const energyParMj = Number((0.5 * cp * 1e-6 * v * v * 1000).toFixed(1));
    const csAns = `${toBnDigits(cs)} μF`;
    const cpAns = `${toBnDigits(cp)} μF`;
    const uAns = `${toBnDigits(energyParMj)} mJ`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(c1)} μF ও ${toBnDigits(c2)} μF ধারকত্বের দুটি ধারককে শ্রেণি (Series) সমবায়ে যুক্ত করলে তুল্য ধারকত্ব কত হবে?`,
        correct: csAns,
        distractors: uniqueDists(csAns, [
          cpAns,
          `${toBnDigits(Number((cs * 2).toFixed(2)))} μF`,
          `${toBnDigits(Number((cs + 1.5).toFixed(2)))} μF`,
          `${toBnDigits(Number((cs + 4.25).toFixed(2)))} μF`,
          `${toBnDigits(Number(((c1 + c2) / 2 + 1).toFixed(2)))} μF`,
        ]),
        explanation: `শ্রেণি সমবায়ে C_s = (${toBnDigits(c1)} × ${toBnDigits(c2)}) / (${toBnDigits(c1)} + ${toBnDigits(c2)}) = ${csAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকের শ্রেণি সমবায়',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(c1)} μF ও ${toBnDigits(c2)} μF ধারক দুটিকে সমান্তরালে যুক্ত করে ${toBnDigits(v)} V উৎসের সাথে সংযোগ দিলে মোট সঞ্চিত শক্তি কত মিলিজুল (mJ)?`,
        correct: uAns,
        distractors: uniqueDists(uAns, [
          `${toBnDigits(Number((energyParMj * 2).toFixed(1)))} mJ`,
          `${toBnDigits(Number((energyParMj / 2).toFixed(1)))} mJ`,
          `${toBnDigits(Number((0.5 * cs * 1e-6 * v * v * 1000).toFixed(1)))} mJ`,
          `${toBnDigits(Number((energyParMj + 25).toFixed(1)))} mJ`,
          `${toBnDigits(Number((energyParMj + 60).toFixed(1)))} mJ`,
        ]),
        explanation: `সমান্তরালে C_p = ${toBnDigits(cp)} μF; সঞ্চিত শক্তি U = ½C_p V² = ০.৫ × ${toBnDigits(cp)}×১০⁻⁶ × ${toBnDigits(v)}² = ${uAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকে সঞ্চিত শক্তি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(cp)} μF সমবায়ের একটি ধারকে ${toBnDigits(v)} V বিভব প্রয়োগ করলে পাতগুলোতে মোট কত মাইক্রোকুলম্ব (μC) আধান সঞ্চিত হবে?`,
        correct: `${toBnDigits(cp * v)} μC`,
        distractors: uniqueDists(`${toBnDigits(cp * v)} μC`, [
          `${toBnDigits(cp * v * 2)} μC`,
          `${toBnDigits(Math.round((cp * v) / 2))} μC`,
          `${toBnDigits(Math.round(cs * v))} μC`,
          `${toBnDigits(cp * v + 250)} μC`,
          `${toBnDigits(cp * v + 500)} μC`,
        ]),
        explanation: `আধান Q = C V = ${toBnDigits(cp)} μF × ${toBnDigits(v)} V = ${toBnDigits(cp * v)} μC।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · ধারকে সঞ্চিত আধান',
      })
    );
  });

  // 5. Current Electricity: Resistors, Shunts, Electric Bills & Joule Heat (Ch 3) — 42 MCQs
  const resCases: Array<{ r1: number; r2: number; e: number; rInt: number }> = [
    { r1: 6, r2: 3, e: 12, rInt: 1 },
    { r1: 4, r2: 4, e: 10, rInt: 0.5 },
    { r1: 12, r2: 6, e: 15, rInt: 1 },
    { r1: 10, r2: 15, e: 24, rInt: 2 },
    { r1: 8, r2: 8, e: 12, rInt: 2 },
    { r1: 20, r2: 30, e: 28, rInt: 2 },
    { r1: 3, r2: 6, e: 9, rInt: 1 },
    { r1: 12, r2: 4, e: 16, rInt: 1 },
    { r1: 15, r2: 10, e: 21, rInt: 1 },
    { r1: 18, r2: 9, e: 14, rInt: 1 },
  ];
  resCases.forEach(({ r1, r2, e, rInt }) => {
    const rPar = Number(((r1 * r2) / (r1 + r2)).toFixed(2));
    const current = Number((e / (rPar + rInt)).toFixed(2));
    const lostV = Number((current * rInt).toFixed(2));
    const rpAns = `${toBnDigits(rPar)} Ω`;
    const iAns = `${toBnDigits(current)} A`;
    const lvAns = `${toBnDigits(lostV)} V`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(r1)} Ω ও ${toBnDigits(r2)} Ω মানের দুটি রোধকে সমান্তরালে যুক্ত করলে এদের তুল্য রোধ কত ওহম হবে?`,
        correct: rpAns,
        distractors: uniqueDists(rpAns, [
          `${toBnDigits(r1 + r2)} Ω`,
          `${toBnDigits(Number((rPar * 2).toFixed(2)))} Ω`,
          `${toBnDigits(Number((rPar + 2).toFixed(2)))} Ω`,
          `${toBnDigits(Number((rPar + 4.5).toFixed(2)))} Ω`,
          `${toBnDigits(Number((rPar + 6).toFixed(2)))} Ω`,
        ]),
        explanation: `সমান্তরাল তুল্য রোধ R_p = (${toBnDigits(r1)}×${toBnDigits(r2)}) / (${toBnDigits(r1)}+${toBnDigits(r2)}) = ${rpAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · রোধের সমান্তরাল সমবায়',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(e)} V তড়িচ্চালক শক্তি ও ${toBnDigits(rInt)} Ω অভ্যন্তরীণ রোধের একটি কোষের সাথে ${toBnDigits(rPar)} Ω রোধের লোড যুক্ত করলে বর্তনীর মূল প্রবাহ কত অ্যাম্পিয়ার হবে?`,
        correct: iAns,
        distractors: uniqueDists(iAns, [
          `${toBnDigits(Number((e / rPar).toFixed(2)))} A`,
          `${toBnDigits(Number((current * 2).toFixed(2)))} A`,
          `${toBnDigits(Number((current / 2).toFixed(2)))} A`,
          `${toBnDigits(Number((current + 1.5).toFixed(2)))} A`,
          `${toBnDigits(Number((current + 3.25).toFixed(2)))} A`,
        ]),
        explanation: `প্রবাহ I = E / (R + r) = ${toBnDigits(e)} / (${toBnDigits(rPar)} + ${toBnDigits(rInt)}) = ${iAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · পূর্ণ বর্তনীর ওহমের সূত্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(rInt)} Ω অভ্যন্তরীণ রোধবিশিষ্ট কোষের মধ্য দিয়ে ${toBnDigits(current)} A প্রবাহ চালনা করলে কোষের নষ্ট ভোল্ট (Lost Volt) কত ভোল্ট হবে?`,
        correct: lvAns,
        distractors: uniqueDists(lvAns, [
          `${toBnDigits(Number((e - lostV).toFixed(2)))} V`,
          `${toBnDigits(e)} V`,
          `${toBnDigits(Number((lostV * 2).toFixed(2)))} V`,
          `${toBnDigits(Number((lostV + 1.5).toFixed(2)))} V`,
          `${toBnDigits(Number((lostV + 3.5).toFixed(2)))} V`,
        ]),
        explanation: `নষ্ট ভোল্ট = I × r = ${toBnDigits(current)} × ${toBnDigits(rInt)} = ${lvAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · নষ্ট ভোল্ট',
      })
    );
  });

  const shuntCases: Array<{ g: number; igMa: number; iMaxA: number }> = [
    { g: 100, igMa: 10, iMaxA: 1 },
    { g: 90, igMa: 10, iMaxA: 1 },
    { g: 100, igMa: 50, iMaxA: 5 },
    { g: 50, igMa: 20, iMaxA: 2 },
    { g: 99, igMa: 10, iMaxA: 1 },
    { g: 80, igMa: 100, iMaxA: 5 },
  ];
  shuntCases.forEach(({ g, igMa, iMaxA }) => {
    const igA = igMa / 1000;
    const shunt = Number(((igA * g) / (iMaxA - igA)).toFixed(3));
    const sAns = `${toBnDigits(shunt)} Ω`;
    const mult = Number((g * (iMaxA / igA - 1)).toFixed(0));
    const mAns = `${toBnDigits(mult)} Ω`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(g)} Ω রোধের একটি গ্যালভানোমিটার সর্বোচ্চ ${toBnDigits(igMa)} mA প্রবাহ মাপতে পারে। এর পাল্লা ${toBnDigits(iMaxA)} A-এ উন্নীত করতে সমান্তরালে কত ওহম মানের শান্ট যুক্ত করতে হবে?`,
        correct: sAns,
        distractors: uniqueDists(sAns, [
          `${toBnDigits(Number((shunt * 2).toFixed(3)))} Ω`,
          `${toBnDigits(Number((shunt * 10).toFixed(3)))} Ω`,
          `${toBnDigits(Number((shunt / 2).toFixed(3)))} Ω`,
          `${toBnDigits(Number((shunt + 0.5).toFixed(3)))} Ω`,
          `${toBnDigits(Number((shunt + 1.25).toFixed(3)))} Ω`,
        ]),
        explanation: `শান্ট S = (I_g × G) / (I − I_g) ≈ ${sAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · শান্ট গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(g)} Ω রোধের গ্যালভানোমিটারটির ভোল্টেজ পরিমাপের পাল্লা ${toBnDigits(Math.round(iMaxA / igA))} গুণ বাড়াতে এর সাথে শ্রেণিতে কত রোধ যুক্ত করতে হবে?`,
        correct: mAns,
        distractors: uniqueDists(mAns, [
          `${toBnDigits(g * Math.round(iMaxA / igA))} Ω`,
          `${toBnDigits(mult + g)} Ω`,
          `${toBnDigits(Math.round(mult / 2))} Ω`,
          `${toBnDigits(mult + 500)} Ω`,
          `${toBnDigits(mult + 1200)} Ω`,
        ]),
        explanation: `শ্রেণি রোধ R = G(n − 1) = ${toBnDigits(g)} × (${toBnDigits(Math.round(iMaxA / igA))} − ১) = ${mAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · ভোল্টমিটারে রূপান্তর',
      })
    );
  });

  // 6. Magnetism & EM Induction: Lorentz Force, Transformer, AC Peak/RMS, Resonance (Ch 4 & 5) — 48 MCQs
  const lorentzCases: Array<{ qMult: number; vExp: number; b: number; deg: number }> = [
    { qMult: 1, vExp: 6, b: 0.5, deg: 90 },
    { qMult: 1, vExp: 6, b: 2.0, deg: 30 },
    { qMult: 2, vExp: 5, b: 1.5, deg: 90 },
    { qMult: 1, vExp: 7, b: 0.2, deg: 30 },
    { qMult: 2, vExp: 6, b: 0.5, deg: 30 },
    { qMult: 1, vExp: 5, b: 4.0, deg: 90 },
    { qMult: 4, vExp: 5, b: 0.5, deg: 90 },
    { qMult: 1, vExp: 6, b: 1.0, deg: 90 },
  ];
  lorentzCases.forEach(({ qMult, vExp, b, deg }) => {
    const q = qMult * 1.6e-19;
    const v = Math.pow(10, vExp);
    const sinTheta = deg === 30 ? 0.5 : 1;
    const force = q * v * b * sinTheta;
    const coeff = Number((force / 1e-13).toFixed(2));
    const ans = `${toBnDigits(coeff)}×১০⁻¹³ N`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(qMult)}e চার্জবিশিষ্ট একটি কণা ১০^${toBnDigits(vExp)} m/s বেগে ${toBnDigits(b)} T সুষম চৌম্বক ক্ষেত্রের সাথে ${toBnDigits(deg)}° কোণে প্রবেশ করলে প্রযুক্ত চৌম্বক বল কত?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((coeff * 2).toFixed(2)))}×১০⁻¹³ N`,
          `${toBnDigits(Number((coeff / 2).toFixed(2)))}×১০⁻¹³ N`,
          `${toBnDigits(Number((coeff + 1.6).toFixed(2)))}×১০⁻¹³ N`,
          `${toBnDigits(Number((coeff + 3.2).toFixed(2)))}×১০⁻¹³ N`,
          'শূন্য (0 N)',
        ]),
        explanation: `চৌম্বক বল F = qvB sinθ = (${toBnDigits(qMult)}×১.৬×১০⁻¹⁹) × ১০^${toBnDigits(vExp)} × ${toBnDigits(b)} × sin${toBnDigits(deg)}° = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · লরেঞ্জ চৌম্বক বল',
      })
    );
  });

  const transformerCases: Array<{ vp: number; np: number; ns: number; ip: number }> = [
    { vp: 220, np: 100, ns: 500, ip: 10 },
    { vp: 220, np: 1000, ns: 100, ip: 2 },
    { vp: 110, np: 200, ns: 800, ip: 8 },
    { vp: 240, np: 600, ns: 150, ip: 3 },
    { vp: 440, np: 400, ns: 100, ip: 5 },
    { vp: 100, np: 50, ns: 250, ip: 15 },
    { vp: 200, np: 500, ns: 1000, ip: 4 },
    { vp: 250, np: 1000, ns: 200, ip: 1 },
    { vp: 120, np: 300, ns: 900, ip: 6 },
    { vp: 500, np: 1000, ns: 250, ip: 2 },
  ];
  transformerCases.forEach(({ vp, np, ns, ip }) => {
    const vs = Number(((vp * ns) / np).toFixed(1));
    const is = Number(((ip * np) / ns).toFixed(2));
    const vsAns = `${toBnDigits(vs)} V`;
    const isAns = `${toBnDigits(is)} A`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি আদর্শ ট্রান্সফরমারের মুখ্য কুণ্ডলীর পাকসংখ্যা ${toBnDigits(np)} ও গৌণ কুণ্ডলীর পাকসংখ্যা ${toBnDigits(ns)}। মুখ্য কুণ্ডলীতে ${toBnDigits(vp)} V প্রয়োগ করলে গৌণ কুণ্ডলীর ভোল্টেজ কত হবে?`,
        correct: vsAns,
        distractors: uniqueDists(vsAns, [
          `${toBnDigits(Number(((vp * np) / ns).toFixed(1)))} V`,
          `${toBnDigits(Number((vs * 2).toFixed(1)))} V`,
          `${toBnDigits(Number((vs / 2).toFixed(1)))} V`,
          `${toBnDigits(Number((vs + 55).toFixed(1)))} V`,
          `${toBnDigits(Number((vs + 110).toFixed(1)))} V`,
        ]),
        explanation: `V_s / V_p = N_s / N_p ⇒ V_s = ${toBnDigits(vp)} × (${toBnDigits(ns)}/${toBnDigits(np)}) = ${vsAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ট্রান্সফরমার ভোল্টেজ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `পাকসংখ্যা ${toBnDigits(np)} : ${toBnDigits(ns)} বিশিষ্ট একটি আদর্শ ট্রান্সফরমারের মুখ্য প্রবাহ ${toBnDigits(ip)} A হলে গৌণ কুণ্ডলীতে তড়িৎ প্রবাহ কত হবে?`,
        correct: isAns,
        distractors: uniqueDists(isAns, [
          `${toBnDigits(Number(((ip * ns) / np).toFixed(2)))} A`,
          `${toBnDigits(Number((is * 2).toFixed(2)))} A`,
          `${toBnDigits(Number((is / 2).toFixed(2)))} A`,
          `${toBnDigits(Number((is + 1.5).toFixed(2)))} A`,
          `${toBnDigits(Number((is + 3.25).toFixed(2)))} A`,
        ]),
        explanation: `I_s / I_p = N_p / N_s ⇒ I_s = ${toBnDigits(ip)} × (${toBnDigits(np)}/${toBnDigits(ns)}) = ${isAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ট্রান্সফরমার প্রবাহ',
      })
    );
  });

  const acPeaks = [10, 14.14, 20, 50, 100, 200, 220, 311, 400, 500];
  acPeaks.forEach((v0) => {
    const vRms = Number((v0 / Math.SQRT2).toFixed(1));
    const vAvg = Number(((2 * v0) / Math.PI).toFixed(1));
    const rmsAns = `${toBnDigits(vRms)} V`;
    const avgAns = `${toBnDigits(vAvg)} V`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি পরিবর্তী ভোল্টেজের শীর্ষ মান (Peak Voltage) ${toBnDigits(v0)} V হলে এর কার্যকর বা মূল গড় বর্গ (RMS) মান প্রায় কত ভোল্ট?`,
        correct: rmsAns,
        distractors: uniqueDists(rmsAns, [
          avgAns,
          `${toBnDigits(Number((v0 * Math.SQRT2).toFixed(1)))} V`,
          `${toBnDigits(Number((v0 / 2).toFixed(1)))} V`,
          `${toBnDigits(Number((vRms + 15).toFixed(1)))} V`,
          `${toBnDigits(Number((vRms + 30).toFixed(1)))} V`,
        ]),
        explanation: `V_rms = V₀ / √2 = ${toBnDigits(v0)} × ০.৭০৭ ≈ ${rmsAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · AC-এর RMS মান',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি সাইনুসয়েডাল পরিবর্তী ভোল্টেজের শীর্ষ মান ${toBnDigits(v0)} V হলে এর অর্ধচক্রের গড় মান প্রায় কত ভোল্ট?`,
        correct: avgAns,
        distractors: uniqueDists(avgAns, [
          rmsAns,
          `${toBnDigits(Number((v0 / 2).toFixed(1)))} V`,
          `${toBnDigits(Number((vAvg + 12).toFixed(1)))} V`,
          `${toBnDigits(Number((vAvg + 25).toFixed(1)))} V`,
          '০ V',
        ]),
        explanation: `অর্ধচক্রের গড় মান V_avg = (2V₀)/π = ০.৬৩৭ × ${toBnDigits(v0)} ≈ ${avgAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · AC-এর গড় মান',
      })
    );
  });

  // 7. High-Yield Physics 2nd Paper Ch 1–5 Exam Trap Matrix (50 entries × 4 angles = 200 MCQs)
  const matrix1to5: Array<{
    ch:
      | 'phys2_thermo'
      | 'phys2_ch2_static_elec'
      | 'phys2_ch3_current_elec'
      | 'phys2_ch4_magnetism'
      | 'phys2_ch5_em_induction';
    vl: 'thermodynamics' | 'circuits_optics';
    topic: string;
    principle: string;
    trap: string;
    valueNote: string;
  }> = [
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'তাপগতিবিদ্যার শূন্যতম সূত্র ও তাপীয় সাম্য', principle: 'দুটি বস্তু আলাদাভাবে তৃতীয় একটি বস্তুর সাথে তাপীয় সাম্যে থাকলে তারা পরস্পরের সাথেও তাপীয় সাম্যে থাকবে', trap: 'শূন্যতম সূত্র থেকেই তাপমাত্রা (Temperature)-র ধারণা ও থার্মোমিটারের কার্যনীতির ভিত্তি তৈরি হয়েছে', valueNote: 'সমান তাপমাত্রায় দুই বস্তু স্পর্শে রাখলে নিট তাপের আদান-প্রদান শূন্য হয়' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'সমোষ্ণ প্রসারণ ও সংকোচনে তাপ আদান-প্রদান', principle: 'সমোষ্ণ প্রক্রিয়ায় তাপমাত্রা ধ্রুব থাকায় অভ্যন্তরীণ শক্তির পরিবর্তন dU = ০ এবং গৃহীত তাপ dQ = dW', trap: 'সমোষ্ণ প্রসারণে সিস্টেমকে বাইরে থেকে তাপ সরবরাহ করতে হয় এবং সংকোচনে সিস্টেম থেকে তাপ বের করে নিতে হয়', valueNote: 'সমোষ্ণ প্রক্রিয়ায় কৃতকাজ W = nRT ln(V₂/V₁)' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'রুদ্ধতাপীয় প্রক্রিয়ায় গ্যাসের আপেক্ষিক তাপ', principle: 'রুদ্ধতাপীয় প্রক্রিয়ায় কোনো তাপ আদান-প্রদান না হওয়ায় (dQ = ০) গ্যাসের আপেক্ষিক তাপ শূন্য হয়', trap: 'বিপরীতে সমোষ্ণ প্রক্রিয়ায় তাপ দিলেও তাপমাত্রা ΔT = ০ হওয়ায় আপেক্ষিক তাপ অসীম (∞) হয়', valueNote: 'আপেক্ষিক তাপের সাধারণ সূত্র C = dQ/(m dT) থেকে এটি আসে' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'প্রত্যাবর্তী প্রক্রিয়ার (Reversible) শর্ত', principle: 'প্রক্রিয়াটি অসীম ধীরে সংঘটিত হতে হবে এবং ঘর্ষণ, সান্দ্রতা বা বৈদ্যুতিক রোধের মতো অপচয়ী বল অনুপস্থিত থাকতে হবে', trap: 'বাস্তবে কোনো প্রক্রিয়াই ১০০% প্রত্যাবর্তী নয়; মরিচা পড়া, তাপের পরিবহন ও জুলের তাপন অপ্রত্যাবর্তী প্রক্রিয়া', valueNote: 'প্রত্যাবর্তী চক্রের দক্ষতা কেবল কার্যকর তাপমাত্রার ওপর নির্ভর করে' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'পানির তাপীয় ব্যতিক্রম (০ °C থেকে ৪ °C)', principle: '০ °C থেকে ৪ °C পর্যন্ত পানিকে উত্তপ্ত করলে আয়তন না বেড়ে উল্টো সংকুচিত হয় এবং ৪ °C-এ ঘনত্ব সর্বাধিক (~১,০০০ kg/m³) হয়', trap: '৪ °C-এ পানির আয়তন সর্বনিম্ন হওয়ায় শীতপ্রধান দেশের হ্রদের তলদেশে ৪ °C-এর পানি জমে জলজ প্রাণী বেঁচে থাকে', valueNote: '০ °C থেকে ৪ °C পরিসরে পানির আয়তন প্রসারণ সহগ ঋণাত্মক' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'জুল-থমসন ক্রিয়া ও ইনভার্শন তাপমাত্রা', principle: 'উচ্চ চাপ অঞ্চল থেকে সরু ছিদ্রপথে রুদ্ধতাপীয়ভাবে প্রসারণের ফলে বাস্তব গ্যাস সাধারণত শীতল হয়', trap: 'হাইড্রোজেন ও হিলিয়ামের ইনভার্শন তাপমাত্রা কক্ষ তাপমাত্রার নিচে বলে স্বাভাবিক তাপমাত্রায় এরা প্রসারণে উষ্ণ হয়', valueNote: 'আদর্শ গ্যাসের ক্ষেত্রে জুল-থমসন ক্রিয়ায় তাপমাত্রার কোনো পরিবর্তন হয় না' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'ডিজেল ইঞ্জিন বনাম পেট্রোল (অটো) ইঞ্জিনের দক্ষতা', principle: 'পেট্রোল ইঞ্জিনে সম-আয়তন দহন ও ডিজেল ইঞ্জিনে সমচাপ দহন ঘটে', trap: 'ডিজেল ইঞ্জিনের সংকোচন অনুপাত (Compression Ratio ~১৫–২২) পেট্রোল ইঞ্জিনের (~৮–১০) চেয়ে বেশি বলে দক্ষতা বেশি', valueNote: 'উভয় ইঞ্জিনই চার-স্ট্রোক বা দুই-স্ট্রোক চক্রে কাজ করে' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'রুদ্ধতাপীয় প্রসারণ বনাম সমোষ্ণ প্রসারণে কৃতকাজ', principle: 'একই প্রাথমিক চাপ ও আয়তন থেকে সমান চূড়ান্ত আয়তনে প্রসারিত করলে সমোষ্ণ প্রক্রিয়ায় কৃতকাজ রুদ্ধতাপীয় কৃতকাজের চেয়ে বেশি হয়', trap: 'কিন্তু সমান আয়তনে সংকোচনের ক্ষেত্রে রুদ্ধতাপীয় সংকোচনে বেশি কাজ করতে হয় কারণ এর P–V রেখা বেশি খাড়া', valueNote: 'সমচাপ > সমোষ্ণ > রুদ্ধতাপীয় (প্রসারণে কৃতকাজের ক্রম)' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'আদর্শ ও বাস্তব তাপ ইঞ্জিনের দক্ষতা তুলনা', principle: 'একই তাপ উৎস T₁ ও তাপগ্রাহক T₂-এর মধ্যে কার্যরত কোনো বাস্তব ইঞ্জিনের দক্ষতা কার্নো ইঞ্জিনের দক্ষতার চেয়ে বেশি হতে পারে না', trap: 'কোনো আবিষ্কারক যদি কার্নো দক্ষতার চেয়ে বেশি দক্ষতার দাবি করেন তবে তা অসম্ভব (তাপগতিবিদ্যার ২য় সূত্রের লঙ্ঘন)', valueNote: 'বাস্তব ইঞ্জিনে η_real < η_Carnot' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', topic: 'প্রথম সূত্রের চিহ্ন প্রথা (Sign Convention)', principle: 'সিস্টেম দ্বারা তাপ শোষিত হলে +dQ, বর্জিত হলে −dQ; সিস্টেম প্রসারিত হয়ে কাজ করলে +dW ও সিস্টেমের ওপর কাজ করলে −dW', trap: 'তাপমাত্রা বাড়লে অভ্যন্তরীণ শক্তি বৃদ্ধি +dU এবং কমলে −dU ধরা হয়', valueNote: 'dQ = dU + dW পদার্থবিজ্ঞানের প্রচলিত সমীকরণ' },

    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'তড়িৎ বলরেখার ধর্ম (Electric Field Lines)', principle: 'বলরেখা ধনাত্মক আধান থেকে শুরু হয়ে ঋণাত্মক আধানে শেষ হয় (খোলা বক্ররেখা) এবং কখনো বদ্ধ লুপ তৈরি করে না', trap: 'দুটি বলরেখা কখনো পরস্পরকে ছেদ করে না; করলে ছেদবিন্দুতে প্রাবল্যের দুটি দিক থাকত', valueNote: 'বলরেখার ঘনত্ব বেশি মানে সেখানে তড়িৎ প্রাবল্য অধিক শক্তিশালী' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'তড়িৎ বিভব ও তড়িৎ প্রাবল্যের শূন্য বিন্দু', principle: 'তড়িৎ প্রাবল্য শূন্য হলেই সেখানে তড়িৎ বিভব শূন্য হতে হবে এমন কোনো বাধ্যবাধকতা নেই', trap: 'সমান ও সমধর্মী দুটি আধানের ঠিক মধ্যবিন্দুতে প্রাবল্য শূন্য, কিন্তু বিভব শূন্য নয় (২kQ/r)', valueNote: 'আবার সমান ও বিপরীতমুখী আধানের মধ্যবিন্দুতে বিভব শূন্য হলেও প্রাবল্য অশূন্য' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'নিরপেক্ষ সাবান বুদবুদকে আহিত করলে ব্যাসার্ধের পরিবর্তন', principle: 'সাবানের বুদবুদকে ধনাত্মক বা ঋণাত্মক যেকোনো আধানে আহিত করলে সমধর্মী আধানের পারস্পরিক বিকর্ষণের কারণে ব্যাসার্ধ বৃদ্ধি পায়', trap: 'চার্জ পজিটিভ হোক বা নেগেটিভ, উভয় ক্ষেত্রেই বুদবুদ প্রসারিত হয়ে বড় হয়', valueNote: 'স্থির তড়িৎ বিকর্ষণ বল সর্বদা পৃষ্ঠটানের বিপরীতে বাইরের দিকে ক্রিয়া করে' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'পরিবাহী গোলক ও অন্তরক গোলকের অভ্যন্তরে প্রাবল্য', principle: 'আহিত পরিবাহী গোলকের অভ্যন্তরে প্রাবল্য সর্বত্র শূন্য, কিন্তু সুষমভাবে আহিত অন্তরক গোলকের ভেতরে প্রাবল্য কেন্দ্র থেকে দূরত্বের সমানুপাতিক (E ∝ r)', trap: 'অন্তরক গোলকের কেন্দ্রে r = ০ হওয়ায় প্রাবল্য শূন্য এবং পৃষ্ঠে সর্বোচ্চ', valueNote: 'উভয় গোলকের বাইরের বিন্দুতে (r > R) সমস্ত আধান কেন্দ্রে পুঞ্জীভূত আছে বলে গণ্য করা যায়' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'সুষম তড়িৎ ক্ষেত্রে দ্বিমেরুর বিভব শক্তি ও স্থায়ী সাম্যাবস্থা', principle: 'তড়িৎ দ্বিমেরুর বিভব শক্তি U = −pE cosθ; θ = ০° (p ও E একই দিকে) হলে বিভব শক্তি সর্বনিম্ন (−pE) ও সাম্যাবস্থা স্থায়ী হয়', trap: 'θ = ১৮০° হলে বিভব শক্তি সর্বোচ্চ (+pE) ও সাম্যাবস্থা অস্থায়ী হয়; আর θ = ৯০° হলে U = ০ কিন্তু টর্ক সর্বোচ্চ', valueNote: 'দ্বিমেরুকে ০° থেকে ১৮০° ঘোরাতে কৃতকাজ W = 2pE' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'সমান্তরাল পাত ধারকের পাত দুটির মধ্যকার আকর্ষণ বল', principle: 'ধারকের একটি পাতের সৃষ্ট প্রাবল্য Q/(2Aε₀) অপর পাতের Q আধানকে আকর্ষণ করায় পারস্পরিক বল F = Q²/(2Aε₀) = ½ C E d', trap: 'পাতদ্বয়ের মধ্যবর্তী দূরত্ব পরিবর্তনে পাত দুটির পারস্পরিক আকর্ষণ বল বদলায় না (যদি Q স্থির থাকে)', valueNote: 'F = ½ Q E (কারণ নিজ পাতের ক্ষেত্র নিজের ওপর বল প্রয়োগ করে না)' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'একই বিভবে চার্জিত nটি ক্ষুদ্র তরল বিন্দু মিশে বড় বিন্দু গঠন', principle: 'r ব্যাসার্ধ ও q আধানের nটি ক্ষুদ্র বিন্দু মিলে R = n^(1/3) r ব্যাসার্ধের বড় বিন্দু গড়লে বিভব n^(2/3) গুণ বাড়ে', trap: 'বড় বিন্দুর ধারকত্ব n^(1/3) গুণ এবং মোট সঞ্চিত স্থির তড়িৎ শক্তি n^(5/3) গুণ বৃদ্ধি পায়', valueNote: 'কুলম্ব বিভব V = kQ/r = k(nq)/(n^(1/3)r) = n^(2/3) V₀' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'পরা-বৈদ্যুতিক ভাঙন (Dielectric Breakdown) ও মেরুবায়ন', principle: 'অত্যধিক তড়িৎ ক্ষেত্রে পরাবৈদ্যুতিকের ইলেকট্রন কক্ষপথ থেকে ছিটকে গিয়ে অন্তরক মাধ্যমটি পরিবাহী হয়ে ওঠে', trap: 'ধারকের পাতদ্বয়ের মাঝে ধাতব স্ল্যাব সম্পূর্ণ ভরে দিলে পাত শর্ট-সার্কিট হয়ে ধারকত্ব অসীম হয়ে যায়', valueNote: 'কাচের ডাই-ইলেকট্রিক শক্তি বাতাসের চেয়ে কয়েক গুণ বেশি' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'তড়িৎ ফ্লাক্সের কোণ নির্ভরশীলতা (Φ = EA cosθ)', principle: 'ক্ষেত্রফল ভেক্টর dA সর্বদা তলের বাইরের অভিলম্ব বরাবর ক্রিয়া করে; θ হলো প্রাবল্য E ও তলের অভিলম্বের মধ্যবর্তী কোণ', trap: 'তলের সাথে সমান্তরালে তড়িৎ ক্ষেত্র গেলে (অভিলম্বের সাথে ৯০°) তড়িৎ ফ্লাক্স শূন্য হয়', valueNote: 'তলের সাথে ৩০° কোণে ক্ষেত্র প্রবেশ করলে অভিলম্বের সাথে কোণ হবে ৬০°' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', topic: 'ধারকে চার্জ দেওয়ার সময় অর্ধেক শক্তি তাপ রূপে অপচয়', principle: 'V ভোল্ট ব্যাটারি দিয়ে Q আধান সরবরাহ করলে ব্যাটারি QV পরিমাণ কাজ করে, কিন্তু ধারকে সঞ্চিত হয় মাত্র ½QV', trap: 'বাকি ৫০% শক্তি সংযোগ তারের রোধে তাপ ও তড়িৎচৌম্বক বিকিরণ রূপে অপচয় হয়', valueNote: 'এটি সংযোগ তারের রোধ কম বা বেশি হওয়ার ওপর নির্ভর করে না' },

    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'একটি তারকে কেটে বা ভাঁজ করে সমান্তরালে জুড়লে রোধ', principle: 'R রোধের একটি তারকে সমান n টুকরো করে সবগুলোকে সমান্তরালে যুক্ত করলে তুল্য রোধ R/n² হয়', trap: 'তারের ব্যাসার্ধ বা ব্যাস অর্ধেক করে একই দৈর্ঘ্য রাখলে রোধ ৪ গুণ হয়, কিন্তু টেনে আয়তন স্থির রেখে অর্ধেক করলে ১৬ গুণ হয়', valueNote: '১ম ক্ষেত্রে R ∝ 1/r² ও ২য় ক্ষেত্রে R ∝ 1/r⁴' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'বৈদ্যুতিক বাল্বের রেটিং (P = V²/R) ও ফিলামেন্ট রোধ', principle: 'সমান ভোল্টেজে রেট করা বেশি ক্ষমতার (১০০ W) বাল্বের রোধ কম ক্ষমতার (৪০ W) বাল্বের রোধের চেয়ে কম এবং ফিলামেন্ট মোটা হয়', trap: '১০০ W ও ৪০ W বাল্ব সমান্তরালে লাগালে ১০০ W বেশি জ্বলবে (P ∝ 1/R), কিন্তু শ্রেণিতে ৪০ W বেশি উজ্জ্বল জ্বলবে (P ∝ R)', valueNote: 'বাল্বের ফিলামেন্ট টাংস্টেনের তৈরি যার গলনাঙ্ক ৩,৪১০ °C' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'অতিপরিবাহিতা (Superconductivity) ও সংকট তাপমাত্রা', principle: 'অত্যন্ত নিম্ন তাপমাত্রায় (সংকট তাপমাত্রার নিচে) কিছু ধাতু ও সিরামিকের বৈদ্যুতিক রোধ সম্পূর্ণ শূন্যে নেমে আসে', trap: 'অতিপরিবাহী মাধ্যম চুম্বক ক্ষেত্রকে ভেতরে প্রবেশ করতে দেয় না—একে মাইসনার প্রভাব (Meissner Effect) বলে', valueNote: 'হাইকে ক্যামারলিং ওনেস ১৯১১ সালে পারদে (৪.২ K) প্রথম অতিপরিবাহিতা আবিষ্কার করেন' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'রোধের উষ্ণতা গুণাঙ্ক (α) ও থার্মিস্টর', principle: 'ধাতুর জন্য রোধের উষ্ণতা সহগ α ধনাত্মক, অর্ধপরিবাহীর α ঋণাত্মক এবং ম্যাঙ্গানিন সংকর ধাতুর α প্রায় শূন্য', trap: 'থার্মিস্টরের α অত্যন্ত উচ্চ ঋণাত্মক হওয়ায় সামান্য তাপমাত্রা পরিবর্তনে এর রোধে বড় পরিবর্তন ঘটে', valueNote: 'তাপমাত্রা বাড়ালে ধাতব পরিবাহীর ইলেকট্রনের শিথিলন কাল (Relaxation Time) কমে বলে রোধ বাড়ে' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'মিটার ব্রিজের প্রান্তীয় ত্রুটি ও গ্যালভানোমিটার সংবেদনশীলতা', principle: 'মিটার ব্রিজে তামার পাতের সংযোগ রোধজনিত প্রান্তীয় ত্রুটি কমাতে রোধের ব্যবধান মধ্যবর্তী অংশে (৩০–৭০ cm) শূন্য বিন্দু আনার চেষ্টা করা হয়', trap: 'কোষ ও গ্যালভানোমিটারের অবস্থান পরস্পর বিনিময় করলেও হুইটস্টোন ব্রিজের ভারসাম্য বিন্দু অপরিবর্তিত থাকে', valueNote: 'উচ্চ মানের রোধের সাথে সমান্তরালে ক্ষুদ্র রোধ যুক্ত করলে তুল্য রোধ ক্ষুদ্রতম রোধের চেয়েও ছোট হয়' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'বৈদ্যুতিক কোষের ভুল সংযোগ (Reverse Polarity)', principle: 'nটি E ভোল্টের কোষকে শ্রেণিতে সাজানোর সময় mটি কোষ ভুলক্রমে উল্টো লাগালে নিট তড়িচ্চালক শক্তি হয় (n − 2m)E', trap: 'তড়িচ্চালক শক্তি কমলেও অভ্যন্তরীণ রোধ সর্বদা যোগ হয়ে nr-ই থাকে', valueNote: '১টি কোষ উল্টো লাগালে মোট কোষের নিট EMF 2E পরিমাণ কমে যায়' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'নাইক্রোম হিটার কুণ্ডলী কেটে ছোট করলে ক্ষমতা বৃদ্ধি', principle: 'স্থির ভোল্টেজের (২২০ V) হিটার তার কেটে দৈর্ঘ্য অর্ধেক করলে রোধ অর্ধেক হয়ে যায় এবং উৎপন্ন তাপ ক্ষমতা (P = V²/R) দ্বিগুণ বেড়ে যায়', trap: 'তাই পুড়ে যাওয়া হিটার কয়েল জোড়া দিলে তারের দৈর্ঘ্য কমে হিটারটি আগের চেয়ে বেশি উত্তপ্ত হয়', valueNote: 'কিন্তু প্রবাহ স্থির থাকলে (শ্রেণি বর্তনী) রোধ কমায় তাপ কমে যেত' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'কালার কোড (Carbon Resistor Color Code)', principle: 'বিবি রয় (BB ROY Great Britain Very Good Wife): কালো(0), বাদামি(1), লাল(2), কমলা(3), হলুদ(4), সবুজ(5), নীল(6), বেগুনি(7), ধূসর(8), সাদা(9)', trap: 'টলারেন্স ব্যান্ড: সোনালি ±৫%, রুপালি ±১০% এবং কোনো ব্যান্ড না থাকলে ±২০%', valueNote: 'প্রথম দুটি ব্যান্ড অঙ্ক, তৃতীয় ব্যান্ড ১০-এর ঘাত (Multiplier) নির্দেশ করে' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'অ্যামিটার ও ভোল্টমিটারের রোধ তুলনা', principle: 'সঠিক প্রবাহ মাপতে অ্যামিটারের রোধ যথাসম্ভব কম (গ্যালভানোমিটার অপেক্ষাও কম) এবং ভোল্টমিটারের রোধ যথাসম্ভব বেশি রাখা হয়', trap: 'মিলি-অ্যামিটার অপেক্ষা মূল অ্যামিটারের শান্ট ও রোধ আরও কম থাকে', valueNote: 'সর্বোচ্চ রোধের ক্রম: ভোল্টমিটার > গ্যালভানোমিটার > মিলি-অ্যামিটার > অ্যামিটার' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', topic: 'বৈদ্যুতিক ইস্ত্রি বা হিটারে ২২০ V–১০০০ W রেটিং', principle: '১,০০০ W যন্ত্র ১ ঘণ্টা চললে ১ kWh (১ ইউনিট) বিদ্যুৎ শক্তি খরচ হয়', trap: '২২০ V এর জায়গায় ১১০ V লাইনে (অর্ধেক ভোল্টেজে) চালালে ক্ষমতা P ∝ V² অনুযায়ী এক-চতুর্থাংশ (২৫০ W) হয়ে যাবে', valueNote: 'উপাদানের রোধ স্থির ধরে ক্ষমতা ভোল্টেজের বর্গের সমানুপাতিক' },

    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'বৃত্তাকার তারের কেন্দ্রে চৌম্বক ক্ষেত্র ও পাকসংখ্যা দ্বিগুণ', principle: 'একটি নির্দিষ্ট দৈর্ঘ্যের তারকে প্রথমে ১ পাকের ও পরে n পাকের বৃত্তাকার কুণ্ডলী করলে ব্যাসার্ধ r′ = r/n হওয়ায় কেন্দ্রে চৌম্বক ক্ষেত্র n² গুণ হয়', trap: 'পাকসংখ্যা কেবল নতুন তার জুড়ে বাড়ানো হলে কেন্দ্রে চৌম্বক ক্ষেত্র কেবল n গুণ বাড়ে', valueNote: '১ পাকের কুণ্ডলীর কেন্দ্রে B = μ₀I/(2r)' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'তড়িৎবাহী কুণ্ডলীর চৌম্বক দ্বিমেরু ভ্রামক (μ = NIA)', principle: 'N পাকের A ক্ষেত্রফলের কুণ্ডলীতে I প্রবাহ চললে এটি একটি চৌম্বক দ্বিমেরুর মতো আচরণ করে যার ভ্রামক M = NIA (একক A·m²)', trap: 'সুষম চৌম্বক ক্ষেত্রে রাখলে টর্ক τ = M B sinθ = N I A B sinα (যেখানে α হলো কুণ্ডলী তল ও B-এর অভিলম্বের কোণ)', valueNote: 'কুণ্ডলীর তল ক্ষেত্রের সমান্তরালে থাকলে টর্ক সর্বোচ্চ (NIBA) হয়' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'চৌম্বক ক্ষেত্রে হেলিক্যাল (সর্পিল) গতিপথ', principle: 'কোনো চার্জিত কণা চৌম্বক ক্ষেত্রের সাথে ০°, ৯০° বা ১৮০° ছাড়া অন্য কোনো তির্যক কোণে প্রবেশ করলে এর গতিপথ হেলিক্যাল (Helix) হয়', trap: 'লম্ব উপাংশ v sinθ বৃত্তাকার পথ এবং সমান্তরাল উপাংশ v cosθ সরলরৈখিক অগ্রগমন তৈরি করে', valueNote: 'পিচ p = (v cosθ) × (2πm / qB)' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'সাইক্লোট্রনে চার্জিত কণার কৌণিক কম্পাঙ্ক ও গতিশক্তি', principle: 'সাইক্লোট্রনে কণার আবর্তন কম্পাঙ্ক f = qB/(2πm) কণার বেগ বা ব্যাসার্ধের ওপর নির্ভর করে না (অ-আপেক্ষিক বেগে)', trap: 'ইলেকট্রনের ভর অতি ক্ষুদ্র হওয়ায় উচ্চ শক্তিতে আপেক্ষিক ভর দ্রুত বেড়ে যায়—তাই প্রচলিত সাইক্লোট্রনে ইলেকট্রন ত্বরান্বিত করা যায় না', valueNote: 'সর্বোচ্চ গতিশক্তি K_max = (q² B² R²) / (2m)' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'চল-কুণ্ডলী গ্যালভানোমিটারের সুবেদিতা ও ফসফর-ব্রোঞ্জ তার', principle: 'গ্যালভানোমিটারে ঝুলন তার হিসেবে ফসফর-ব্রোঞ্জ ব্যবহার করা হয় কারণ এর একক মোচড়ে প্রত্যয়নী টর্ক (c) অত্যন্ত কম ও মরিচা ধরে না', trap: 'নিরেট অ্যালুমিনিয়াম বা তামার ফ্রেমের ওপর কুণ্ডলী প্যাঁচানো হয় যাতে এডি কারেন্ট ড্যাম্পিংয়ে কাঁটা দ্রুত স্থির (Dead Beat) হয়', valueNote: 'প্রবাহ সুবেদিতা S_i = θ/I = NAB/c' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'অ্যাম্পিয়ারের বদ্ধ পথ সূত্র (∮ B·dl = μ₀ I_enc)', principle: 'যেকোনো বদ্ধ লুপ বরাবর চৌম্বক ক্ষেত্রের রৈখিক সমাকলন লুপ দ্বারা আবদ্ধ নিট তড়িৎ প্রবাহের μ₀ গুণের সমান', trap: 'ফাঁপা তড়িৎবাহী পাইপের ভেতরের অংশে কোনো প্রবাহ আবদ্ধ না থাকায় অভ্যন্তরে চৌম্বক ক্ষেত্র শূন্য হয়', valueNote: 'টোরয়েডের ভেতরের অক্ষ বরাবর সুষম ক্ষেত্র B = μ₀ n I' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'হিস্টেরেসিস লুপ ও শক্তির অপচয়', principle: 'চৌম্বকণ ও বিচৌম্বকণের এক পূর্ণ চক্রে H বনাম B বা I লেখচিত্রে প্রাপ্ত আবদ্ধ লুপকে হিস্টেরেসিস লুপ বলে', trap: 'কেবল ফেরোচৌম্বক পদার্থই হিস্টেরেসিস ধর্ম প্রদর্শন করে; ডায়া ও প্যারাচৌম্বক পদার্থে হিস্টেরেসিস থাকে না', valueNote: 'লুপের ক্ষেত্রফল প্রতি একক আয়তনে প্রতি চক্রে তাপ অপচয় নির্দেশ করে' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'চুম্বক ক্ষেত্র B-এর এককসমূহ ও সম্পর্ক', principle: 'চৌম্বক ক্ষেত্র বা ফ্লাক্স ঘনত্ব B-এর SI একক টেসলা (T = Wb/m² = N/(A·m)) ও CGS একক গাউস (G)', trap: 'চৌম্বক প্রাবল্য বা চুম্বকায়ন ক্ষেত্র H-এর একক A/m, কিন্তু B-এর একক টেসলা বা গাউস', valueNote: '১ টেসলা = ১০⁴ গাউস' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'সমমানের গতিশক্তিসম্পন্ন প্রোটন ও আলফা কণার বৃত্তাকার ব্যাসার্ধ', principle: 'একই চৌম্বক ক্ষেত্রে সমান গতিশক্তি E_k নিয়ে প্রবেশ করলে ব্যাসার্ধ r = √(2m E_k) / (qB)', trap: 'আলফা কণার ভর ৪m ও চার্জ ২e বলে প্রোটন ও আলফা কণার ব্যাসার্ধ সমান (√৪ / ২ = ১) হয়', valueNote: 'অন্যদিকে সমান বেগে প্রবেশ করলে আলফা কণার ব্যাসার্ধ প্রোটনের দ্বিগুণ হয়' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', topic: 'বিভিন্ন স্থানে পৃথিবীর ভূ-চুম্বক ক্ষেত্রের অনুভূমিক উপাংশ H', principle: 'দোলন চুম্বকমাপক বা টেনজেন্ট গ্যালভানোমিটারে প্রবাহ নির্ণয়ে ভূ-চৌম্বক ক্ষেত্রের অনুভূমিক উপাংশ H ব্যবহৃত হয়', trap: 'চৌম্বক মেরুতে H = ০ হওয়ায় সেখানে দণ্ড চুম্বকের অনুভূমিক দোলন বা দিগদর্শী কাঁটা কাজ করে না', valueNote: 'মোট ক্ষেত্র B = √(H² + V²) এবং tanδ = V/H' },

    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'গতিজনিত তড়িচ্চালক শক্তি (Motional EMF: ε = B L v)', principle: 'B সুষম চুম্বক ক্ষেত্রের সাথে লম্বভাবে L দৈর্ঘ্যের ধাতব দণ্ড v বেগে চললে এর দুই প্রান্তে ε = B L v বিভব পার্থক্য আবিষ্ট হয়', trap: 'উড়োজাহাজের ডানার প্রসার বরাবর পৃথিবীর চৌম্বক ক্ষেত্রের উল্লম্ব উপাংশ V ছেদ করলে ডানার দুই প্রান্তে বিভব সৃষ্টি হয়', valueNote: 'যদি দণ্ডের গতিবেগ চৌম্বক বলরেখার সমান্তরাল হয় তবে আবিষ্ট EMF শূন্য হয়' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'জেনারেটরে আবিষ্ট ভোল্টেজের সর্বোচ্চ মান ও দশা', principle: 'B ক্ষেত্রে ω কৌণিক বেগে ঘূর্ণায়মান N পাকের কুণ্ডলীতে আবিষ্ট ভোল্টেজ e = NBAω sin(ωt)', trap: 'কুণ্ডলীর তল চৌম্বক বলরেখার সমান্তরাল হলে (θ = ৯০°) ফ্লাক্স শূন্য হলেও ফ্লাক্স পরিবর্তনের হার ও আবিষ্ট ভোল্টেজ সর্বোচ্চ হয়', valueNote: 'অন্যদিকে কুণ্ডলী বলরেখার লম্ব থাকলে ফ্লাক্স সর্বোচ্চ কিন্তু আবিষ্ট ভোল্টেজ শূন্য' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'তাড়িতচৌম্বকীয় ড্যাম্পিং ও এডি কারেন্টের ব্যবহার', principle: 'চৌম্বক ক্ষেত্রে ধাতব পাত দুলতে থাকলে তাতে ঘূর্ণি প্রবাহ (Eddy Current) সৃষ্টি হয়ে লেঞ্জের সূত্রানুযায়ী গতিকে দ্রুত থামিয়ে দেয়', trap: 'ট্রেনের চৌম্বকীয় ব্রেক, ইনডাকশন ফার্নেস এবং ডেড-বিট গ্যালভানোমিটারে এডি কারেন্টের উপকারী ব্যবহার হয়', valueNote: 'বৈদ্যুতিক শক্তির মিটার (এনার্জি মিটার) ডিস্কেও এডি কারেন্ট ব্রেকিং কাজে লাগে' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'কয়েল থেকে ধাতব দণ্ড বা চুম্বক পড়ে যাওয়ার ত্বরণ', principle: 'কোনো পূর্ণ বদ্ধ তামার রিং-এর ভেতর দিয়ে একটি দণ্ড চুম্বক মুক্তভাবে নিচে পড়লে লেঞ্জের সূত্রানুসারে বাধা পাওয়ায় এর ত্বরণ g-এর চেয়ে কম (a < g) হয়', trap: 'কিন্তু রিং-এ সামান্য ফাঁকা বা কাটা থাকলে বর্তনী অসম্পূর্ণ বলে প্রবাহ চলে না এবং চুম্বক ঠিক g ত্বরণে পড়ে', valueNote: 'প্লাস্টিক বা কাঠের রিং হলেও ত্বরণ g থাকে' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'AC-তে চোক কুণ্ডলীর (Choke Coil) ভূমিকা', principle: 'টিউবলাইট বা AC সার্কিটে রোধ ব্যবহার করলে প্রচুর তাপ অপচয় হয়, কিন্তু উচ্চ স্বকীয় আবেশ ও নগণ্য রোধের চোক কুণ্ডলী শক্তির অপচয় ছাড়াই প্রবাহ সীমিত করে', trap: 'আদর্শ চোক কুণ্ডলীর ক্ষমতা গুণাঙ্ক cosφ = ০ (অর্থাৎ গড় তাপীয় অপচয় শূন্য)', valueNote: 'DC সার্কিটে চোক কুণ্ডলীর প্রতিঘাত X_L = ০ হওয়ায় এটি কোনো প্রবাহ নিয়ন্ত্রণ করতে পারে না' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'দূরে বিদ্যুৎ সঞ্চালনে উচ্চ ভোল্টেজ ব্যবহারের কারণ', principle: 'একই ক্ষমতা P = VI সরবরাহে ভোল্টেজ V অনেক গুণ বাড়ালে তারের মধ্য দিয়ে প্রবাহ I = P/V কমে যায়', trap: 'তারের তাপীয় ক্ষয় H = I²Rt প্রবাহের বর্গের সমানুপাতিক হওয়ায় উচ্চ ভোল্টেজে পরিবহনে লাইনের অপচয় বহুগুণ কমে আসে', valueNote: 'বাংলাদেশে গ্রিড সঞ্চালন ভোল্টেজ ১৩২ kV, ২৩০ kV ও ৪০০ kV পর্যন্ত ব্যবহৃত হয়' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'LCR সার্কিটে মান গুণাঙ্ক (Quality Factor Q)', principle: 'অনুনাদ সার্কিটের তীক্ষ্ণতা (Selectivity) নির্ধারণ করে Q-ফ্যাক্টর: Q = (1/R) √(L/C)', trap: 'রোধ R যত কম হবে, Q-ফ্যাক্টর তত বেশি ও অনুনাদ বক্ররেখা তত তীক্ষ্ণ হবে', valueNote: 'Q-ফ্যাক্টর হলো অনুনাদ কম্পাঙ্ক ও ব্যান্ডউইথের (Δf) অনুপাত: Q = f₀/Δf' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'স্বকীয় আবেশ গুণাঙ্ক L-এর জ্যামিতিক নির্ভরতা', principle: 'একটি লম্বা সোলেনয়েডের স্বকীয় আবেশ L = μ₀ N² A / l (পাকসংখ্যার বর্গের সমানুপাতিক)', trap: 'এর মধ্যে লোহার কোর প্রবেশ করালে L মান আপেক্ষিক প্রবেশ্যতা μ_r গুণ বেড়ে যায়', valueNote: 'সমান্তরাল তড়িৎবাহী দুটি তারের প্রবাহ বিপরীত হলে স্বকীয় আবেশ সর্বনিম্ন—যা স্ট্যান্ডার্ড রোধের কুণ্ডলীতে (Non-inductive winding) ব্যবহৃত হয়' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'ক্ষমতা গুণাঙ্ক (Power Factor cosφ) ও গড় ক্ষমতা', principle: 'AC বর্তনীতে প্রকৃত গড় ক্ষমতা P = V_rms I_rms cosφ, যেখানে cosφ = R / Z (রোধ ও প্রতিবন্ধকতার অনুপাত)', trap: 'শুদ্ধ রোধী বর্তনীতে φ = ০° (cosφ = ১, ক্ষমতা সর্বোচ্চ), আর বিশুদ্ধ ধারকীয় বা আবেশী বর্তনীতে φ = ±৯০° (cosφ = ০)', valueNote: 'ধারকীয় বর্তনীতে প্রবাহ ভোল্টেজের চেয়ে ৯০° এগিয়ে থাকে এবং আবেশী বর্তনীতে ৯০° পিছিয়ে থাকে' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', topic: 'ট্রান্সফরমারের শক্তির অপচয়ের ৪টি উৎস', principle: 'তামার ক্ষয় (I²R), হিস্টেরেসিস ক্ষয়, এডি কারেন্ট ক্ষয় এবং ফ্লাক্স লিকেজ—এই চার কারণে বাস্তব ট্রান্সফরমারের দক্ষতা < ১০০%', trap: 'কাজ করার সময় ট্রান্সফরমার থেকে যে গুনগুন শব্দ (Humming) আসে তার মূল কারণ মজ্জার ম্যাগনেটোস্ট্রিকশন (Magnetostriction)', valueNote: 'আধুনিক বড় পাওয়ার ট্রান্সফরমারের দক্ষতা ৯৫% থেকে ৯৯% পর্যন্ত হয়ে থাকে' },
  ];

  const tPool = matrix1to5.map((m) => m.topic);
  const pPool = matrix1to5.map((m) => m.principle);
  const trapPool = matrix1to5.map((m) => m.trap);
  const valPool = matrix1to5.map((m) => m.valueNote);

  matrix1to5.forEach((m, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `"${m.topic}" বিষয়ে নিচের কোন পদার্থবৈজ্ঞানিক নীতিটি সঠিক?`,
        correct: m.principle,
        distractors: uniqueDists(
          m.principle,
          [1, 3, 7, 11, 17].map((o) => pPool[(idx + o) % matrix1to5.length])
        ),
        explanation: `${m.principle}। (${m.trap})`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১–৫ মূলনীতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${m.topic}" সংক্রান্ত পরীক্ষায় বহুল ব্যবহৃত সূক্ষ্ম তথ্য বা ব্যতিক্রম কোনটি?`,
        correct: m.trap,
        distractors: uniqueDists(
          m.trap,
          [2, 5, 9, 13, 19].map((o) => trapPool[(idx + o) % matrix1to5.length])
        ),
        explanation: `${m.trap}। (${m.valueNote})`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · মেডিকেল ও ভার্সিটি ট্রিকস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${m.topic}"-এর গুরুত্বপূর্ণ গাণিতিক রূপ বা ধ্রুব তথ্য কোনটি?`,
        correct: m.valueNote,
        distractors: uniqueDists(
          m.valueNote,
          [1, 4, 8, 12, 16].map((o) => valPool[(idx + o) % matrix1to5.length])
        ),
        explanation: `${m.valueNote} — ${m.principle}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · গাণিতিক সারসংক্ষেপ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `"${m.trap}" — এ সিদ্ধান্তটি কোন বিষয়ের অন্তর্ভুক্ত?`,
        correct: m.topic,
        distractors: uniqueDists(
          m.topic,
          [2, 6, 10, 14, 18].map((o) => tPool[(idx + o) % matrix1to5.length])
        ),
        explanation: `এটি "${m.topic}"-এর উচ্চতর ব্যাখ্যা।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · চূড়ান্ত রিভিশন',
      })
    );
  });

  return list;
}
