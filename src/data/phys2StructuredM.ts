import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredM(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sm_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 6: Geometric Optics — Thin Prism, Thin Lens Contact, Mirror, Magnification (~104 MCQs)
  // =========================================================================
  // 1A: Thin Prism Minimum Deviation delta = (n - 1) A (16 MCQs)
  [
    { A: 6, n: 1.5, d: 3 },
    { A: 8, n: 1.5, d: 4 },
    { A: 10, n: 1.5, d: 5 },
    { A: 10, n: 1.6, d: 6 },
    { A: 5, n: 1.6, d: 3 },
    { A: 12, n: 1.5, d: 6 },
    { A: 4, n: 1.5, d: 2 },
    { A: 10, n: 1.4, d: 4 },
  ].forEach((pr, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(pr.A)}° প্রতিসারক কোণ ও ${toBnDigits(pr.n)} প্রতিসরণাঙ্কবিশিষ্ট একটি সরু প্রিজমের ন্যূনতম বিচ্যুতি কোণ (δ_m) কত ডিগ্রি?`,
        correct: `${toBnDigits(pr.d)}°`,
        distractors: [pr.A, pr.d * 2, pr.d / 2, pr.d + 2.5]
          .filter((x) => x > 0 && x !== pr.d)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}°`),
        explanation: `সরু প্রিজমের জন্য δ_m = (μ - 1)A = (${toBnDigits(pr.n)} - ১) × ${toBnDigits(pr.A)}° = ${toBnDigits(pr.d)}°।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · সরু প্রিজমের বিচ্যুতি',
      })
    );
  });

  // 1B: Equivalent Focal Length of Two Thin Lenses in Contact 1/f = 1/f1 + 1/f2 (20 MCQs)
  [
    { f1: 20, f2: 20, feq: 10 },
    { f1: 30, f2: 60, feq: 20 },
    { f1: 20, f2: -40, feq: 40 },
    { f1: 15, f2: -30, feq: 30 },
    { f1: 25, f2: 25, feq: 12.5 },
    { f1: 40, f2: 40, feq: 20 },
    { f1: 10, f2: 10, feq: 5 },
    { f1: 12, f2: 24, feq: 8 },
    { f1: 10, f2: -20, feq: 20 },
    { f1: 30, f2: -60, feq: 60 },
  ].forEach((tl, idx) => {
    const f2Label = tl.f2 > 0 ? `${toBnDigits(tl.f2)} cm ফোকাস দূরত্বের উত্তল` : `${toBnDigits(Math.abs(tl.f2))} cm ফোকাস দূরত্বের অবতল`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(tl.f1)} cm ফোকাস দূরত্বের একটি উত্তল লেন্সের সাথে ${f2Label} লেন্স পরস্পরের সংস্পর্শে রাখলে তুল্য ফোকাস দূরত্ব কত cm হবে?`,
        correct: `${toBnDigits(tl.feq)} cm`,
        distractors: [tl.feq * 2, tl.feq / 2, tl.f1 + Math.abs(tl.f2), tl.feq + 15]
          .filter((x) => x > 0 && x !== tl.feq)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `1/F = 1/f₁ + 1/f₂ = 1/${toBnDigits(tl.f1)} + 1/(${toBnDigits(tl.f2)}) => F = ${toBnDigits(tl.feq)} cm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · সংস্পর্শে থাকা লেন্সের ফোকাস দূরত্ব',
      })
    );
  });

  // 1C: Hypermetropia Near Point Correction & Compound Microscope Magnification (24 MCQs)
  [
    { nearCm: 50, p: '+২ D' },
    { nearCm: 100, p: '+৩ D' },
    { nearCm: 75, p: '+২.৬৭ D' },
    { nearCm: 40, p: '+১.৫ D' },
    { nearCm: 200, p: '+৩.৫ D' },
  ].forEach((hy, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `দূরদৃষ্টি (Hypermetropia) ত্রুটিযুক্ত এক ব্যক্তির চোখের নিকটবিন্দু ${toBnDigits(hy.nearCm)} cm। ২৫ cm দূরত্বে বই রেখে পড়তে চাইলে তাঁকে কত ক্ষমতার উত্তল লেন্সের চশমা পরতে হবে?`,
        correct: hy.p,
        distractors: ['+১.৫ D', '+২ D', '+২.৬৭ D', '+৩ D', '+৩.৫ D', '-২ D', '-৩ D'].filter((x) => x !== hy.p).slice(0, 4),
        explanation: `u = ০.২৫ m, v = -${toBnDigits(hy.nearCm / 100)} m; P = 1/u + 1/v = ৪ - ১০০/${toBnDigits(hy.nearCm)} = ${hy.p}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · দীর্ঘদৃষ্টির প্রতিকার',
      })
    );
  });

  [
    { mo: 20, me: 5 },
    { mo: 30, me: 10 },
    { mo: 40, me: 5 },
    { mo: 50, me: 8 },
    { mo: 15, me: 6 },
    { mo: 25, me: 10 },
    { mo: 60, me: 5 },
    { mo: 100, me: 10 },
  ].forEach((cm, idx) => {
    const M = cm.mo * cm.me;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি জটিল অণুবীক্ষণ যন্ত্রের অভিলক্ষ্যের বিবর্ধন ${toBnDigits(cm.mo)} এবং অভিনেত্রের বিবর্ধন ${toBnDigits(cm.me)} হলে যন্ত্রটির মোট বিবর্ধন কত গুণ?`,
        correct: `${toBnDigits(M)} গুণ`,
        distractors: [cm.mo + cm.me, M / 2, M * 2, M + 40]
          .filter((x) => x !== M)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} গুণ`),
        explanation: `জটিল অণুবীক্ষণ যন্ত্রের মোট বিবর্ধন M = m_o × m_e = ${toBnDigits(cm.mo)} × ${toBnDigits(cm.me)} = ${toBnDigits(M)} গুণ।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · জটিল অণুবীক্ষণ যন্ত্র',
      })
    );
  });

  // =========================================================================
  // 2. Ch 7: Physical Optics — Diffraction Grating, Phase vs Path Diff, EM Frequency (~64 MCQs)
  // =========================================================================
  // 2A: Phase Difference delta_phi = (2pi / lambda) * delta_x (24 MCQs)
  [
    { path: 'λ', phase: '২π' },
    { path: 'λ/২', phase: 'π' },
    { path: 'λ/৪', phase: 'π/২' },
    { path: 'λ/৬', phase: 'π/৩' },
    { path: 'λ/৮', phase: 'π/৪' },
    { path: '৩λ/২', phase: '৩π' },
    { path: '৩λ/৪', phase: '৩π/২' },
    { path: '২λ', phase: '৪π' },
  ].forEach((pd, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একই উৎস থেকে নির্গত দুটি আলোক তরঙ্গের মধ্যে পথ পার্থক্য Δx = ${pd.path} হলে এদের মধ্যবর্তী দশা পার্থক্য (Δφ) কত রেডিয়ান?`,
        correct: pd.phase,
        distractors: ['π/৪', 'π/৩', 'π/২', 'π', '৩π/২', '২π', '৩π', '৪π'].filter((x) => x !== pd.phase).slice(0, 4),
        explanation: `দশা পার্থক্য Δφ = (2π/λ) × পথ পার্থক্য = (2π/λ) × (${pd.path}) = ${pd.phase}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · দশা ও পথ পার্থক্য',
      })
    );
  });

  // 2B: Grating Constant d = 1/N (16 MCQs)
  [
    { nPerCm: 5000, dUm: 2.0 },
    { nPerCm: 4000, dUm: 2.5 },
    { nPerCm: 2000, dUm: 5.0 },
    { nPerCm: 10000, dUm: 1.0 },
    { nPerCm: 2500, dUm: 4.0 },
    { nPerCm: 8000, dUm: 1.25 },
    { nPerCm: 1000, dUm: 10.0 },
    { nPerCm: 6250, dUm: 1.6 },
  ].forEach((gr, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি অপবর্তন গ্রেটিংয়ে প্রতি সেন্টিমিটারে ${toBnDigits(gr.nPerCm)}টি দাগ বা রেখা টানা থাকলে গ্রেটিং ধ্রুবক (d) কত মাইক্রোমিটার (μm)?`,
        correct: `${toBnDigits(gr.dUm)} μm`,
        distractors: [gr.dUm * 2, gr.dUm / 2, gr.dUm + 1.5, gr.dUm * 10]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x !== gr.dUm)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μm`),
        explanation: `গ্রেটিং ধ্রুবক d = ১ cm / ${toBnDigits(gr.nPerCm)} = ১০⁴ μm / ${toBnDigits(gr.nPerCm)} = ${toBnDigits(gr.dUm)} μm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · গ্রেটিং ধ্রুবক',
      })
    );
  });

  // 2C: EM Wave Frequency f = c / lambda (16 MCQs)
  [
    { lamNm: 600, fStr: '৫ × ১০¹⁴ Hz' },
    { lamNm: 500, fStr: '৬ × ১০¹⁴ Hz' },
    { lamNm: 400, fStr: '৭.৫ × ১০¹⁴ Hz' },
    { lamNm: 300, fStr: '১ × ১০¹⁵ Hz' },
    { lamNm: 750, fStr: '৪ × ১০¹⁴ Hz' },
    { lamNm: 150, fStr: '২ × ১০¹⁵ Hz' },
    { lamNm: 1000, fStr: '৩ × ১০¹⁴ Hz' },
    { lamNm: 200, fStr: '১.৫ × ১০¹⁵ Hz' },
  ].forEach((em, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `শূন্যস্থানে ${toBnDigits(em.lamNm)} nm তরঙ্গদৈর্ঘ্যের তাড়িতচৌম্বক তরঙ্গের কম্পাঙ্ক কত? (c = ৩ × ১০⁸ m/s)`,
        correct: em.fStr,
        distractors: ['৩ × ১০¹⁴ Hz', '৪ × ১০¹⁴ Hz', '৫ × ১০¹⁴ Hz', '৬ × ১০¹⁴ Hz', '৭.৫ × ১০¹⁴ Hz', '১ × ১০¹⁵ Hz', '২ × ১০¹⁵ Hz']
          .filter((x) => x !== em.fStr)
          .slice(0, 4),
        explanation: `কম্পাঙ্ক f = c/λ = (৩×১০⁸) / (${toBnDigits(em.lamNm)}×১০⁻⁹) = ${em.fStr}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · আলোর তরঙ্গদৈর্ঘ্য ও কম্পাঙ্ক',
      })
    );
  });

  // =========================================================================
  // 3. Ch 8: Modern Physics — Threshold Wavelength, Mass-Energy E=mc^2, Photon Momentum (~48 MCQs)
  // =========================================================================
  [
    { phiEv: 2.0, lam0A: 6200 },
    { phiEv: 2.48, lam0A: 5000 },
    { phiEv: 3.1, lam0A: 4000 },
    { phiEv: 4.0, lam0A: 3100 },
    { phiEv: 5.0, lam0A: 2480 },
    { phiEv: 6.2, lam0A: 2000 },
    { phiEv: 1.55, lam0A: 8000 },
    { phiEv: 1.0, lam0A: 12400 },
  ].forEach((tw, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো ধাতব পৃষ্ঠের কার্য-অপেক্ষক Φ₀ = ${toBnDigits(tw.phiEv)} eV হলে ধাতুটির সূচন তরঙ্গদৈর্ঘ্য (λ₀) প্রায় কত Å?`,
        correct: `${toBnDigits(tw.lam0A)} Å`,
        distractors: [tw.lam0A * 2, tw.lam0A / 2, tw.lam0A + 1000, tw.lam0A + 2500]
          .filter((x) => x !== tw.lam0A)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Å`),
        explanation: `সূচন তরঙ্গদৈর্ঘ্য λ₀ ≈ ১২,৪০০ / Φ₀(eV) = ১২,৪০০ / ${toBnDigits(tw.phiEv)} = ${toBnDigits(tw.lam0A)} Å।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · সূচন তরঙ্গদৈর্ঘ্য',
      })
    );
  });

  [
    { massLabel: '১ গ্রাম (১০⁻³ kg)', eStr: '৯ × ১০¹³ J' },
    { massLabel: '২ গ্রাম (২×১০⁻³ kg)', eStr: '১.৮ × ১০¹⁴ J' },
    { massLabel: '১ মিলিগ্রাম (১০⁻⁶ kg)', eStr: '৯ × ১০¹⁰ J' },
    { massLabel: '৫ গ্রাম (৫×১০⁻³ kg)', eStr: '৪.৫ × ১০¹⁴ J' },
    { massLabel: '১ কিলোগ্রাম (১ kg)', eStr: '৯ × ১০¹⁶ J' },
    { massLabel: '১০ গ্রাম (১০⁻² kg)', eStr: '৯ × ১০¹⁴ J' },
  ].forEach((mc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `আইনস্টাইনের ভর-শক্তি সমীকরণ (E = mc²) অনুসারে ${mc.massLabel} ভর সম্পূর্ণরূপে শক্তিতে রূপান্তরিত হলে কত জুল শক্তি পাওয়া যাবে?`,
        correct: mc.eStr,
        distractors: ['৯ × ১০¹⁰ J', '৯ × ১০¹³ J', '১.৮ × ১০¹⁴ J', '৪.৫ × ১০¹⁴ J', '৯ × ১০¹⁴ J', '৯ × ১০¹⁶ J']
          .filter((x) => x !== mc.eStr)
          .slice(0, 4),
        explanation: `E = mc² = m × (৩×১০⁸)² = m × ৯×১০¹⁶ J = ${mc.eStr}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ভর-শক্তি সমতুল্যতা',
      })
    );
  });

  // =========================================================================
  // 4. Ch 9: Bohr Angular Momentum & Remaining Mass Half-Life (~40 MCQs)
  // =========================================================================
  [
    { n: 1, lStr: 'h / (2π)' },
    { n: 2, lStr: 'h / π' },
    { n: 3, lStr: '3h / (2π)' },
    { n: 4, lStr: '2h / π' },
    { n: 5, lStr: '5h / (2π)' },
    { n: 6, lStr: '3h / π' },
  ].forEach((am, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `বোরের পরমাণু মডেল অনুসারে n = ${toBnDigits(am.n)}-তম কক্ষপথে ঘূর্ণায়মান ইলেকট্রনের কৌণিক ভরবেগ কত?`,
        correct: am.lStr,
        distractors: ['h / (2π)', 'h / π', '3h / (2π)', '2h / π', '5h / (2π)', '3h / π'].filter((x) => x !== am.lStr).slice(0, 4),
        explanation: `বোরের স্বীকার্য অনুসারে L = nh/(2π); n = ${toBnDigits(am.n)} বসালে পাওয়া যায় ${am.lStr}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · বোরের কৌণিক ভরবেগ স্বীকার্য',
      })
    );
  });

  [
    { m0: 64, T: 10, t: 30, rem: 8 },
    { m0: 80, T: 5, t: 20, rem: 5 },
    { m0: 100, T: 8, t: 16, rem: 25 },
    { m0: 128, T: 6, t: 24, rem: 8 },
    { m0: 200, T: 15, t: 45, rem: 25 },
    { m0: 160, T: 4, t: 16, rem: 10 },
    { m0: 400, T: 12, t: 36, rem: 50 },
    { m0: 320, T: 10, t: 50, rem: 10 },
  ].forEach((hm, idx) => {
    const decayed = hm.m0 - hm.rem;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(hm.T)} দিন অর্ধায়ুর ${toBnDigits(hm.m0)} g একটি তেজস্ক্রিয় আইসোটোপ ${toBnDigits(hm.t)} দিন পরে ক্ষয় হয়ে কত গ্রাম অবশিষ্ট থাকবে?`,
        correct: `${toBnDigits(hm.rem)} g`,
        distractors: [decayed, hm.rem * 2, hm.rem / 2, hm.rem + 12]
          .filter((x) => x > 0 && x !== hm.rem)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} g`),
        explanation: `n = ${toBnDigits(hm.t)}/${toBnDigits(hm.T)} = ${toBnDigits(hm.t / hm.T)}; অবশিষ্ট ভর = ${toBnDigits(hm.m0)} × (১/২)^${toBnDigits(hm.t / hm.T)} = ${toBnDigits(hm.rem)} g।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · তেজস্ক্রিয় ভর ক্ষয়',
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
        question: `${toBnDigits(hm.m0)} g ভরের একটি তেজস্ক্রিয় নমুনা (অর্ধায়ু ${toBnDigits(hm.T)} বছর) ${toBnDigits(hm.t)} বছরে কত গ্রাম ক্ষয়প্রাপ্ত হবে?`,
        correct: `${toBnDigits(decayed)} g`,
        distractors: [hm.rem, decayed - 10, hm.m0 / 2, decayed + 16]
          .filter((x) => x > 0 && x !== decayed)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} g`),
        explanation: `অবশিষ্ট ভর ${toBnDigits(hm.rem)} g; সুতরাং ক্ষয়প্রাপ্ত ভর = ${toBnDigits(hm.m0)} - ${toBnDigits(hm.rem)} = ${toBnDigits(decayed)} g।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · ক্ষয়প্রাপ্ত পরিমাণ নির্ণয়',
      })
    );
  });

  // =========================================================================
  // 5. Ch 10: Binary Addition & Hex/Octal to Decimal & Rectifier Frequency (~72 MCQs)
  // =========================================================================
  [
    { a: '1011', b: '0101', sum: '10000' },
    { a: '1101', b: '0110', sum: '10011' },
    { a: '1010', b: '1100', sum: '10110' },
    { a: '1111', b: '0001', sum: '10000' },
    { a: '1001', b: '0111', sum: '10000' },
    { a: '1110', b: '1011', sum: '11001' },
    { a: '10101', b: '01010', sum: '11111' },
    { a: '11001', b: '00111', sum: '100000' },
    { a: '10011', b: '01101', sum: '100000' },
    { a: '11100', b: '01010', sum: '100110' },
  ].forEach((ba, idx) => {
    const decA = parseInt(ba.a, 2);
    const decB = parseInt(ba.b, 2);
    const decS = decA + decB;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `বাইনারি যোগ (${ba.a})₂ + (${ba.b})₂-এর সঠিক ফল কত?`,
        correct: `(${ba.sum})₂`,
        distractors: [
          `(${(decS + 1).toString(2)})₂`,
          `(${(decS - 1).toString(2)})₂`,
          `(${(decS + 2).toString(2)})₂`,
          `(${(decS - 2).toString(2)})₂`,
        ].filter((x) => x !== `(${ba.sum})₂`),
        explanation: `(${ba.a})₂ = ${toBnDigits(decA)} এবং (${ba.b})₂ = ${toBnDigits(decB)}; যোগফল = ${toBnDigits(decS)} = (${ba.sum})₂।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · বাইনারি যোগ',
      })
    );
  });

  ['A5', '1F', '2C', '3E', '4B', '7A', 'FF', 'C8', '9D', 'B4', 'E2', '5F'].forEach((hx, idx) => {
    const dec = parseInt(hx, 16);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `হেক্সাডেসিমেল সংখ্যা (${hx})₁₆-এর সমতুল্য দশমিক (Decimal) মান কত?`,
        correct: `(${toBnDigits(dec)})₁₀`,
        distractors: [dec + 10, dec - 10, dec + 16, dec - 4]
          .filter((x) => x > 0 && x !== dec)
          .slice(0, 4)
          .map((x) => `(${toBnDigits(x)})₁₀`),
        explanation: `(${hx})₁₆-কে ১৬-এর স্থানীয় মান দিয়ে গুণ করে যোগ করলে পাওয়া যায় (${toBnDigits(dec)})₁₀।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · হেক্সাডেসিমেল থেকে দশমিক',
      })
    );
  });

  // Rectifier ripple frequency & Transistor Voltage gain (16 MCQs)
  [50, 60, 100, 120, 200, 400].forEach((fAc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি ফুল-ওয়েভ (Full-wave) রেক্টিফায়ারের ইনপুটে ${toBnDigits(fAc)} Hz কম্পাঙ্কের AC সরবরাহ দিলে আউটপুট রিপল কম্পাঙ্ক কত Hz হবে?`,
        correct: `${toBnDigits(fAc * 2)} Hz`,
        distractors: [fAc, fAc / 2, fAc * 4, fAc + 25]
          .filter((x) => x !== fAc * 2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Hz`),
        explanation: `ফুল-ওয়েভ রেক্টিফায়ারে আউটপুট রিপল কম্পাঙ্ক = ২ × ইনপুট কম্পাঙ্ক = ${toBnDigits(fAc * 2)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · রেক্টিফায়ার কম্পাঙ্ক',
      })
    );
  });

  // =========================================================================
  // 6. Ch 11: Redshift z = Δλ/λ = v/c & Distance Conversions (~32 MCQs)
  // =========================================================================
  [
    { lam0: 500, dLam: 5, vStr: '৩ × ১০⁶ m/s' },
    { lam0: 600, dLam: 6, vStr: '৩ × ১০⁶ m/s (২)' },
    { lam0: 400, dLam: 8, vStr: '৬ × ১০⁶ m/s' },
    { lam0: 500, dLam: 10, vStr: '৬ × ১০⁶ m/s (২)' },
    { lam0: 600, dLam: 15, vStr: '৭.৫ × ১০⁶ m/s' },
    { lam0: 600, dLam: 3, vStr: '১.৫ × ১০⁶ m/s' },
    { lam0: 450, dLam: 9, vStr: '৬ × ১০⁶ m/s (৩)' },
    { lam0: 300, dLam: 12, vStr: '১.২ × ১০⁷ m/s' },
  ].forEach((rs, idx) => {
    const cleanV = rs.vStr.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি দূরবর্তী গ্যালাক্সি থেকে আসা ${toBnDigits(rs.lam0)} nm তরঙ্গদৈর্ঘ্যের আলোর লোহিত অপসারণ Δλ = ${toBnDigits(rs.dLam)} nm পরিলক্ষিত হলে গ্যালাক্সিটির অপসারণ বেগ প্রায় কত?`,
        correct: cleanV,
        distractors: ['১.৫ × ১০⁶ m/s', '৩ × ১০⁶ m/s', '৬ × ১০⁶ m/s', '৭.৫ × ১০⁶ m/s', '১.২ × ১০⁷ m/s', '৩ × ১০⁸ m/s']
          .filter((x) => x !== cleanV)
          .slice(0, 4),
        explanation: `v/c = Δλ/λ₀ => v = c × (${toBnDigits(rs.dLam)}/${toBnDigits(rs.lam0)}) = ${cleanV}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ডপলার লোহিত অপসারণ',
      })
    );
  });

  // Parsec <-> Light year conversions (10 MCQs)
  [2, 3, 4, 5, 10, 20, 50, 100].forEach((pc, idx) => {
    const ly = Number((pc * 3.26).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি নক্ষত্রের দূরত্ব ${toBnDigits(pc)} পারসেক (Parsec) হলে আলোকবর্ষ (Light-year) এককে এই দূরত্ব কত? (১ পারসেক = ৩.২৬ আলোকবর্ষ)`,
        correct: `${toBnDigits(ly)} আলোকবর্ষ`,
        distractors: [Number((ly * 2).toFixed(2)), Number((ly / 2).toFixed(2)), Number((pc * 9.46).toFixed(2)), Number((ly + 5).toFixed(2))]
          .filter((x) => x !== ly)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} আলোকবর্ষ`),
        explanation: `${toBnDigits(pc)} পারসেক = ${toBnDigits(pc)} × ৩.২৬ = ${toBnDigits(ly)} আলোকবর্ষ।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · পারসেক ও আলোকবর্ষ',
      })
    );
  });

  return list;
}
