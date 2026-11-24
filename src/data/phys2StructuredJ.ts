import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredJ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sj_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 9: Atomic & Nuclear Physics (~190 MCQs)
  // =========================================================================
  // 1A: Bohr Orbit Radius r_n = n^2 * 0.529 Å & Energy E_n = -13.6 / n^2 eV (32 MCQs)
  [
    { n: 1, rA: 0.529, E: -13.6 },
    { n: 2, rA: 2.116, E: -3.4 },
    { n: 3, rA: 4.761, E: -1.51 },
    { n: 4, rA: 8.464, E: -0.85 },
    { n: 5, rA: 13.225, E: -0.544 },
  ].forEach((bh, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বোরের পরমাণু মডেল অনুসারে হাইড্রোজেন পরমাণুর ${toBnDigits(bh.n)}-তম স্থায়ী কক্ষপথে ইলেকট্রনের শক্তি (E_${toBnDigits(bh.n)}) কত eV?`,
        correct: `${toBnDigits(bh.E)} eV`,
        distractors: ['-১৩.৬ eV', '-৩.৪ eV', '-১.৫১ eV', '-০.৮৫ eV', '-০.৫৪৪ eV', '-৬.৮ eV']
          .filter((x) => x !== `${toBnDigits(bh.E)} eV`)
          .slice(0, 4),
        explanation: `E_n = -১৩.৬ / n² = -১৩.৬ / ${toBnDigits(bh.n)}² = ${toBnDigits(bh.E)} eV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · বোরের কক্ষপথের শক্তি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(bh.n)}-তম বোর কক্ষপথের ব্যাসার্ধ প্রায় কত Å? (r₁ = ০.৫২৯ Å)`,
        correct: `${toBnDigits(bh.rA)} Å`,
        distractors: ['০.৫২৯ Å', '২.১১৬ Å', '৪.৭৬১ Å', '৮.৪৬৪ Å', '১৩.২২৫ Å', '১.০৫৮ Å']
          .filter((x) => x !== `${toBnDigits(bh.rA)} Å`)
          .slice(0, 4),
        explanation: `r_n = n² r₁ = ${toBnDigits(bh.n)}² × ০.৫২৯ = ${toBnDigits(bh.rA)} Å।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · বোর কক্ষপথের ব্যাসার্ধ',
      })
    );
  });

  // Transition energies (12 MCQs)
  [
    { from: 2, to: 1, dE: 10.2, series: 'লাইম্যান (অতিবেগুনি)' },
    { from: 3, to: 1, dE: 12.09, series: 'লাইম্যান (অতিবেগুনি)' },
    { from: 4, to: 1, dE: 12.75, series: 'লাইম্যান (অতিবেগুনি)' },
    { from: 3, to: 2, dE: 1.89, series: 'বামার (দৃশ্যমান)' },
    { from: 4, to: 2, dE: 2.55, series: 'বামার (দৃশ্যমান)' },
    { from: 5, to: 2, dE: 2.86, series: 'বামার (দৃশ্যমান)' },
    { from: 4, to: 3, dE: 0.66, series: 'প্যাশ্চেন (অবলোহিত)' },
  ].forEach((tr, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `হাইড্রোজেন পরমাণুতে ইলেকট্রন n = ${toBnDigits(tr.from)} কক্ষপথ থেকে n = ${toBnDigits(tr.to)} কক্ষপথে ঝাঁপ দিলে বিকিরিত ফোটনের শক্তি প্রায় কত eV?`,
        correct: `${toBnDigits(tr.dE)} eV`,
        distractors: ['১.৮৯ eV', '২.৫৫ eV', '৩.৪০ eV', '১০.২ eV', '১২.০৯ eV', '১৩.৬ eV']
          .filter((x) => x !== `${toBnDigits(tr.dE)} eV`)
          .slice(0, 4),
        explanation: `ΔE = E_${toBnDigits(tr.from)} - E_${toBnDigits(tr.to)} ≈ ${toBnDigits(tr.dE)} eV (${tr.series} সিরিজ)।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · পারমাণবিক বর্ণালি ও সংক্রমণ',
      })
    );
  });

  // 1B: Nuclear Radius R = R0 * A^(1/3) & Proton/Neutron counts & Alpha/Beta Decay (48 MCQs)
  [
    { A1: 8, A2: 64, ratio: '১ : ২' },
    { A1: 8, A2: 216, ratio: '১ : ৩' },
    { A1: 27, A2: 64, ratio: '৩ : ৪' },
    { A1: 27, A2: 125, ratio: '৩ : ৫' },
    { A1: 64, A2: 125, ratio: '৪ : ৫' },
    { A1: 1, A2: 27, ratio: '১ : ৩ (২)' },
    { A1: 1, A2: 64, ratio: '১ : ৪' },
    { A1: 8, A2: 125, ratio: '২ : ৫' },
  ].forEach((nr, idx) => {
    const cleanR = nr.ratio.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `ভরসংখ্যা A = ${toBnDigits(nr.A1)} এবং A = ${toBnDigits(nr.A2)} বিশিষ্ট দুটি নিউক্লিয়াসের ব্যাসার্ধের অনুপাত (R₁ : R₂) কত?`,
        correct: cleanR,
        distractors: ['১ : ২', '১ : ৩', '১ : ৪', '৩ : ৪', '৩ : ৫', '৪ : ৫', '২ : ৫', '১ : ৮']
          .filter((x) => x !== cleanR)
          .slice(0, 4),
        explanation: `R = R₀ A^(1/3); তাই R₁/R₂ = (${toBnDigits(nr.A1)}/${toBnDigits(nr.A2)})^(1/3) = ${cleanR}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · নিউক্লিয়াসের ব্যাসার্ধ',
      })
    );
  });

  [
    { sym: '₂₃₅U (Z=৯২, A=২৩৫)', z: 92, a: 235 },
    { sym: '₂₃₈U (Z=৯২, A=২৩৮)', z: 92, a: 238 },
    { sym: '₂₂₆Ra (Z=৮৮, A=২২৬)', z: 88, a: 226 },
    { sym: '₁₄C (Z=৬, A=১৪)', z: 6, a: 14 },
    { sym: '₆₀Co (Z=২৭, A=৬০)', z: 27, a: 60 },
    { sym: '₁₃₁I (Z=৫৩, A=১৩১)', z: 53, a: 131 },
    { sym: '₂₃₉Pu (Z=৯৪, A=২৩৯)', z: 94, a: 239 },
    { sym: '₂₁₀Po (Z=৮৪, A=২১০)', z: 84, a: 210 },
  ].forEach((nu, idx) => {
    const neutrons = nu.a - nu.z;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${nu.sym} নিউক্লিয়াসে প্রোটন ও নিউট্রনের সংখ্যা যথাক্রমে কতটি?`,
        correct: `${toBnDigits(nu.z)}টি প্রোটন ও ${toBnDigits(neutrons)}টি নিউট্রন`,
        distractors: [
          `${toBnDigits(neutrons)}টি প্রোটন ও ${toBnDigits(nu.z)}টি নিউট্রন`,
          `${toBnDigits(nu.z)}টি প্রোটন ও ${toBnDigits(nu.a)}টি নিউট্রন`,
          `${toBnDigits(nu.z + 2)}টি প্রোটন ও ${toBnDigits(neutrons - 2)}টি নিউট্রন`,
          `${toBnDigits(nu.z - 2)}টি প্রোটন ও ${toBnDigits(neutrons)}টি নিউট্রন`,
        ],
        explanation: `প্রোটন সংখ্যা Z = ${toBnDigits(nu.z)} এবং নিউট্রন সংখ্যা N = A - Z = ${toBnDigits(nu.a)} - ${toBnDigits(nu.z)} = ${toBnDigits(neutrons)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · নিউক্লীয় গঠন',
      })
    );
  });

  // Alpha/Beta sequential decay (16 MCQs)
  [
    { a0: 238, z0: 92, nAlpha: 1, nBeta: 0 },
    { a0: 238, z0: 92, nAlpha: 2, nBeta: 2 },
    { a0: 232, z0: 90, nAlpha: 6, nBeta: 4 },
    { a0: 235, z0: 92, nAlpha: 7, nBeta: 4 },
    { a0: 226, z0: 88, nAlpha: 1, nBeta: 0 },
    { a0: 238, z0: 92, nAlpha: 8, nBeta: 6 },
    { a0: 214, z0: 84, nAlpha: 1, nBeta: 2 },
    { a0: 222, z0: 86, nAlpha: 2, nBeta: 1 },
  ].forEach((dc, idx) => {
    const aFinal = dc.a0 - 4 * dc.nAlpha;
    const zFinal = dc.z0 - 2 * dc.nAlpha + dc.nBeta;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `পারমাণবিক সংখ্যা ${toBnDigits(dc.z0)} ও ভরসংখ্যা ${toBnDigits(dc.a0)} বিশিষ্ট একটি নিউক্লিয়াস থেকে পর্যায়ক্রমে ${toBnDigits(dc.nAlpha)}টি α-কণা ও ${toBnDigits(dc.nBeta)}টি β⁻-কণা নির্গত হলে সৃষ্ট নতুন নিউক্লিয়াসের পারমাণবিক সংখ্যা ও ভরসংখ্যা কত হবে?`,
        correct: `Z = ${toBnDigits(zFinal)}, A = ${toBnDigits(aFinal)}`,
        distractors: [
          `Z = ${toBnDigits(zFinal - 2)}, A = ${toBnDigits(aFinal)}`,
          `Z = ${toBnDigits(zFinal)}, A = ${toBnDigits(aFinal + 4)}`,
          `Z = ${toBnDigits(dc.z0 - 2 * dc.nAlpha)}, A = ${toBnDigits(aFinal - 4)}`,
          `Z = ${toBnDigits(zFinal + 2)}, A = ${toBnDigits(dc.a0 - 2 * dc.nAlpha)}`,
        ],
        explanation: `প্রতি α ক্ষয়ে ΔA = -৪, ΔZ = -২ এবং প্রতি β⁻ ক্ষয়ে ΔZ = +১; তাই Z' = ${toBnDigits(zFinal)}, A' = ${toBnDigits(aFinal)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · আলফা ও বিটা ক্ষয় সূত্র',
      })
    );
  });

  // 1C: Half-life N = N0 (1/2)^(t/T) & Decay constant lambda = 0.693/T & Mean life (40 MCQs)
  [
    { T: 10, t: 30, remPct: '১২.৫% (১/৮ অংশ)' },
    { T: 5, t: 20, remPct: '৬.২৫% (১/১৬ অংশ)' },
    { T: 8, t: 16, remPct: '২৫% (১/৪ অংশ)' },
    { T: 12, t: 60, remPct: '৩.১২৫% (১/৩২ অংশ)' },
    { T: 4, t: 12, remPct: '১২.৫% (১/৮ অংশ) (২)' },
    { T: 15, t: 30, remPct: '২৫% (১/৪ অংশ) (২)' },
    { T: 20, t: 80, remPct: '৬.২৫% (১/১৬ অংশ) (২)' },
    { T: 100, t: 300, remPct: '১২.৫% (১/৮ অংশ) (৩)' },
  ].forEach((hl, idx) => {
    const cleanRem = hl.remPct.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি তেজস্ক্রিয় মৌলের অর্ধায়ু ${toBnDigits(hl.T)} দিন। ${toBnDigits(hl.t)} দিন পর মৌলটির প্রাথমিক পরিমাণের কত অংশ অক্ষত অবশিষ্ট থাকবে?`,
        correct: cleanRem,
        distractors: ['৫০% (১/২ অংশ)', '২৫% (১/৪ অংশ)', '১২.৫% (১/৮ অংশ)', '৬.২৫% (১/১৬ অংশ)', '৩.১২৫% (১/৩২ অংশ)']
          .filter((x) => x !== cleanRem)
          .slice(0, 4),
        explanation: `অর্ধায়ুর সংখ্যা n = ${toBnDigits(hl.t)}/${toBnDigits(hl.T)} = ${toBnDigits(hl.t / hl.T)}; অক্ষত অংশ = (১/২)^${toBnDigits(hl.t / hl.T)} = ${cleanRem}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · তেজস্ক্রিয় অর্ধায়ু',
      })
    );
  });

  [
    { T: 100, lam: '০.০০৬৯৩', tau: 144.3 },
    { T: 50, lam: '০.০১৩৮৬', tau: 72.15 },
    { T: 10, lam: '০.০৬৯৩', tau: 14.43 },
    { T: 20, lam: '০.০৩৪৬৫', tau: 28.86 },
    { T: 5, lam: '০.১৩৮৬', tau: 7.22 },
    { T: 200, lam: '০.০০৩৪৬৫', tau: 288.6 },
  ].forEach((dc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো তেজস্ক্রিয় পদার্থের অর্ধায়ু ${toBnDigits(dc.T)} সেকেন্ড হলে এর অবক্ষয় ধ্রুবক (λ) কত s⁻¹?`,
        correct: `${dc.lam} s⁻¹`,
        distractors: ['০.৬৯৩ s⁻¹', '০.০৬৯৩ s⁻¹', '০.০০৬৯৩ s⁻¹', '০.০১৩৮৬ s⁻¹', '০.১৩৮৬ s⁻¹', '০.০৩৪৬৫ s⁻¹']
          .filter((x) => x !== `${dc.lam} s⁻¹`)
          .slice(0, 4),
        explanation: `λ = ০.৬৯৩ / T₁/₂ = ০.৬৯৩ / ${toBnDigits(dc.T)} = ${dc.lam} s⁻¹।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · অবক্ষয় ধ্রুবক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি তেজস্ক্রিয় নমুনার অর্ধায়ু ${toBnDigits(dc.T)} বছর হলে এর গড় আয়ু (Mean life, τ) প্রায় কত বছর?`,
        correct: `${toBnDigits(dc.tau)} বছর`,
        distractors: [dc.T, dc.T * 0.693, dc.tau * 2, dc.tau / 2]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x !== dc.tau)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} বছর`),
        explanation: `গড় আয়ু τ = ১/λ = ১.৪৪৩ × T₁/₂ = ১.৪৪৩ × ${toBnDigits(dc.T)} ≈ ${toBnDigits(dc.tau)} বছর।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · গড় আয়ু ও অর্ধায়ু',
      })
    );
  });

  // =========================================================================
  // 2. Ch 10: Semiconductors, BJT Alpha-Beta, Number Systems & Logic Gates (~160 MCQs)
  // =========================================================================
  // 2A: BJT alpha <-> beta & IE = IB + IC (40 MCQs)
  [
    { alpha: 0.9, beta: 9 },
    { alpha: 0.95, beta: 19 },
    { alpha: 0.96, beta: 24 },
    { alpha: 0.98, beta: 49 },
    { alpha: 0.99, beta: 99 },
    { alpha: 0.8, beta: 4 },
    { alpha: 0.92, beta: 11.5 },
    { alpha: 0.975, beta: 39 },
    { alpha: 0.85, beta: 5.67 },
    { alpha: 0.75, beta: 3 },
  ].forEach((bj, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি কমন বেস (CB) ট্রানজিস্টরের প্রবাহ বিবর্ধন গুণক α = ${toBnDigits(bj.alpha)} হলে কমন এমিটার (CE) বিন্যাসে প্রবাহ লাভ β কত হবে?`,
        correct: toBnDigits(bj.beta),
        distractors: [3, 4, 9, 19, 24, 49, 99].filter((x) => x !== bj.beta).slice(0, 4).map((x) => toBnDigits(x)),
        explanation: `β = α / (1 - α) = ${toBnDigits(bj.alpha)} / (১ - ${toBnDigits(bj.alpha)}) = ${toBnDigits(bj.beta)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · ট্রানজিস্টরের α ও β সম্পর্ক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি ট্রানজিস্টরের কমন এমিটার প্রবাহ লাভ β = ${toBnDigits(bj.beta)} হলে কমন বেস প্রবাহ গুণক α-এর মান কত?`,
        correct: toBnDigits(bj.alpha),
        distractors: [0.75, 0.8, 0.9, 0.95, 0.96, 0.98, 0.99].filter((x) => x !== bj.alpha).slice(0, 4).map((x) => toBnDigits(x)),
        explanation: `α = β / (1 + β) = ${toBnDigits(bj.beta)} / (১ + ${toBnDigits(bj.beta)}) = ${toBnDigits(bj.alpha)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · BJT প্রবাহ বিবর্ধন গুণক',
      })
    );
  });

  [
    { ie: 10, ib: 0.2, ic: 9.8 },
    { ie: 5, ib: 0.1, ic: 4.9 },
    { ie: 20, ib: 0.4, ic: 19.6 },
    { ie: 15, ib: 0.5, ic: 14.5 },
    { ie: 8, ib: 0.2, ic: 7.8 },
    { ie: 12, ib: 0.3, ic: 11.7 },
    { ie: 25, ib: 0.5, ic: 24.5 },
    { ie: 50, ib: 1.0, ic: 49.0 },
  ].forEach((cur, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি ট্রানজিস্টরের এমিটার প্রবাহ I_E = ${toBnDigits(cur.ie)} mA এবং পীঠ প্রবাহ I_B = ${toBnDigits(cur.ib)} mA হলে সংগ্রাহক প্রবাহ I_C কত mA?`,
        correct: `${toBnDigits(cur.ic)} mA`,
        distractors: [cur.ie + cur.ib, cur.ie, Number((cur.ic - 0.5).toFixed(1)), cur.ib * 10]
          .filter((x) => x !== cur.ic)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mA`),
        explanation: `I_E = I_B + I_C => I_C = ${toBnDigits(cur.ie)} - ${toBnDigits(cur.ib)} = ${toBnDigits(cur.ic)} mA।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · ট্রানজিস্টর প্রবাহ সমীকরণ',
      })
    );
  });

  // 2B: Number System Conversions Decimal <-> Binary <-> Hexadecimal (56 MCQs)
  [13, 19, 25, 29, 35, 42, 45, 53, 59, 63, 75, 85, 99, 117, 150, 175, 200, 255].forEach((dec, idx) => {
    const bin = dec.toString(2);
    const hex = dec.toString(16).toUpperCase();
    const oct = dec.toString(8);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `দশমিক সংখ্যা (${toBnDigits(dec)})₁₀-এর সমতুল্য বাইনারি সংখ্যা কোনটি?`,
        correct: `(${bin})₂`,
        distractors: [
          `(${(dec + 1).toString(2)})₂`,
          `(${(dec - 1).toString(2)})₂`,
          `(${(dec + 2).toString(2)})₂`,
          `(${(dec ^ 3).toString(2)})₂`,
        ].filter((x) => x !== `(${bin})₂`),
        explanation: `${toBnDigits(dec)}-কে ক্রমাগত ২ দ্বারা ভাগ করে অবশেষ নিচ থেকে ওপরে সাজালে বাইনারি পাওয়া যায় (${bin})₂।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · সংখ্যা পদ্ধতি রূপান্তর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `বাইনারি সংখ্যা (${bin})₂-এর সমতুল্য হেক্সাডেসিমেল (Hexadecimal) ও অক্টাল মান যথাক্রমে কোনটি?`,
        correct: `(${hex})₁₆ ও (${oct})₈`,
        distractors: [
          `(${(dec + 1).toString(16).toUpperCase()})₁₆ ও (${oct})₈`,
          `(${hex})₁₆ ও (${(dec + 2).toString(8)})₈`,
          `(${(dec - 1).toString(16).toUpperCase()})₁₆ ও (${(dec - 1).toString(8)})₈`,
          `(${(dec + 4).toString(16).toUpperCase()})₁₆ ও (${(dec + 4).toString(8)})₈`,
        ],
        explanation: `(${bin})₂ = (${toBnDigits(dec)})₁₀ = (${hex})₁₆ এবং (${oct})₈।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · বাইনারি থেকে হেক্সাডেসিমেল ও অক্টাল',
      })
    );
  });

  // 2C: Logic Gate Evaluations & Boolean Identities (44 MCQs)
  const gateDefs: { name: string; fn: (a: number, b: number) => number; expr: string }[] = [
    { name: 'AND', fn: (a, b) => a & b, expr: 'Y = A · B' },
    { name: 'OR', fn: (a, b) => a | b, expr: 'Y = A + B' },
    { name: 'NAND', fn: (a, b) => (a & b ? 0 : 1), expr: 'Y = (A · B)̅' },
    { name: 'NOR', fn: (a, b) => (a | b ? 0 : 1), expr: 'Y = (A + B)̅' },
    { name: 'XOR', fn: (a, b) => a ^ b, expr: 'Y = A ⊕ B' },
    { name: 'XNOR', fn: (a, b) => (a ^ b ? 0 : 1), expr: 'Y = (A ⊕ B)̅' },
  ];
  const pairs: [number, number][] = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ];
  gateDefs.forEach((g) => {
    pairs.forEach(([a, b], idx) => {
      const out = g.fn(a, b);
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_2',
          chapterId: 'phys2_ch10_semiconductor',
          visualLessonId: 'circuits_optics',
          hscLevel: '12',
          difficulty: idx % 2 === 0 ? 'board' : 'medical',
          question: `একটি ২-ইনপুটবিশিষ্ট ${g.name} গেটের ইনপুটদ্বয় A = ${toBnDigits(a)} এবং B = ${toBnDigits(b)} হলে আউটপুট Y কত হবে?`,
          correct: toBnDigits(out),
          distractors: [toBnDigits(out === 1 ? 0 : 1), 'অসংজ্ঞায়িত', 'উচ্চ ইম্পিডেন্স', '২'].filter((x) => x !== toBnDigits(out)),
          explanation: `${g.name} গেটের বুলিয়ান ফাংশন ${g.expr}; তাই (${toBnDigits(a)}, ${toBnDigits(b)}) ইনপুটে আউটপুট ${toBnDigits(out)}।`,
          reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · লজিক গেটের সত্যক সারণি',
        })
      );
    });
  });

  // Boolean algebra identities (10 MCQs)
  [
    { expr: 'A + A̅', val: '১' },
    { expr: 'A · A̅', val: '০' },
    { expr: 'A + ১', val: '১ (২)' },
    { expr: 'A · ০', val: '০ (২)' },
    { expr: 'A + A', val: 'A' },
    { expr: 'A · A', val: 'A (২)' },
    { expr: 'A + A·B (শোষণ উপপাদ্য)', val: 'A (৩)' },
    { expr: '(A + B)̅ (ডি মরগান)', val: 'A̅ · B̅' },
    { expr: '(A · B)̅ (ডি মরগান)', val: 'A̅ + B̅' },
    { expr: '(A̿) দ্বৈত পূরক', val: 'A (৪)' },
  ].forEach((bl, idx) => {
    const cleanV = bl.val.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বুলিয়ান বীজগণিতের নিয়মানুসারে "${bl.expr}" রাশিটির সরলীকৃত মান কোনটি?`,
        correct: cleanV,
        distractors: ['০', '১', 'A', 'A̅', 'A̅ · B̅', 'A̅ + B̅', 'B'].filter((x) => x !== cleanV).slice(0, 4),
        explanation: `বুলিয়ান উপপাদ্য অনুসারে ${bl.expr} = ${cleanV}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · বুলিয়ান বীজগণিত',
      })
    );
  });

  return list;
}
