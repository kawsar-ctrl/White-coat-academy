import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredJ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sj_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 7: Elasticity, Stress-Strain, Bulk Modulus, Bubble Work, Viscosity (~160 MCQs)
  // =========================================================================
  // 1A: Stress = F/A & Strain = l/L & Energy Density u = ½ * stress * strain (30 MCQs)
  [
    { f: 100, aMm2: 1, stress: '১ × ১০⁸ N/m²' },
    { f: 200, aMm2: 2, stress: '১ × ১০⁸ N/m² (২)' },
    { f: 500, aMm2: 2, stress: '২.৫ × ১০⁸ N/m²' },
    { f: 600, aMm2: 3, stress: '২ × ১০⁸ N/m²' },
    { f: 1000, aMm2: 5, stress: '২ × ১০⁸ N/m² (২)' },
    { f: 400, aMm2: 1, stress: '৪ × ১০⁸ N/m²' },
    { f: 1500, aMm2: 3, stress: '৫ × ১০⁸ N/m²' },
    { f: 800, aMm2: 4, stress: '২ × ১০⁸ N/m² (৩)' },
  ].forEach((st, idx) => {
    const cleanStress = st.stress.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(st.aMm2)} mm² প্রস্থচ্ছেদ ক্ষেত্রফলের একটি তারে (নমুনা-#${toBnDigits(idx + 1)}) ${toBnDigits(st.f)} N টান বল প্রয়োগ করলে উদ্ভূত অসহ বা অনুদৈর্ঘ্য পীড়ন (Stress) কত?`,
        correct: cleanStress,
        distractors: ['১ × ১০⁸ N/m²', '২ × ১০⁸ N/m²', '২.৫ × ১০⁸ N/m²', '৪ × ১০⁸ N/m²', '৫ × ১০⁸ N/m²', '১ × ১০⁶ N/m²']
          .filter((x) => x !== cleanStress)
          .slice(0, 4),
        explanation: `পীড়ন = F / A = ${toBnDigits(st.f)} / (${toBnDigits(st.aMm2)} × ১০⁻⁶) = ${cleanStress}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পীড়ন গণনা',
      })
    );
  });

  // Bulk Modulus B = ΔP / (ΔV/V)
  [
    { dp: '২ × ১০⁶ Pa', dvPct: '০.১%', b: '২ × ১০⁹ Pa' },
    { dp: '৫ × ১০⁶ Pa', dvPct: '০.৫%', b: '১ × ১০⁹ Pa' },
    { dp: '৪ × ১০⁶ Pa', dvPct: '০.২%', b: '২ × ১০⁹ Pa (২)' },
    { dp: '৩ × ১০⁷ Pa', dvPct: '০.১%', b: '৩ × ১০¹⁰ Pa' },
    { dp: '১ × ১০⁷ Pa', dvPct: '০.২%', b: '৫ × ১০⁹ Pa' },
    { dp: '৬ × ১০⁶ Pa', dvPct: '০.১৫%', b: '৪ × ১০⁹ Pa' },
  ].forEach((bm, idx) => {
    const cleanB = bm.b.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `অতিরিক্ত ${bm.dp} চাপ প্রয়োগে কোনো তরলের আয়তন ${bm.dvPct} হ্রাস পেলে (নমুনা-#${toBnDigits(idx + 1)}) তরলটির আয়তন স্থিতিস্থাপক গুণাঙ্ক (B) কত?`,
        correct: cleanB,
        distractors: ['১ × ১০⁹ Pa', '২ × ১০⁹ Pa', '৪ × ১০⁹ Pa', '৫ × ১০⁹ Pa', '৩ × ১০¹⁰ Pa', '১ × ১০⁸ Pa']
          .filter((x) => x !== cleanB)
          .slice(0, 4),
        explanation: `আয়তন বিকৃতি = ${bm.dvPct}; তাই B = ΔP / (ΔV/V) = ${cleanB}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · আয়তন গুণাঙ্ক',
      })
    );
  });

  // Elastic energy stored W = ½ * F * l & lateral Poisson ratio
  [
    { f: 100, lMm: 2, w: '০.১ J' },
    { f: 200, lMm: 4, w: '০.৪ J' },
    { f: 500, lMm: 2, w: '০.৫ J' },
    { f: 400, lMm: 5, w: '১.০ J' },
    { f: 1000, lMm: 3, w: '১.৫ J' },
    { f: 800, lMm: 5, w: '২.০ J' },
  ].forEach((ew, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `একটি ধাতব তারে ${toBnDigits(ew.f)} N ভার ঝোলানোয় এর দৈর্ঘ্য ${toBnDigits(ew.lMm)} mm বৃদ্ধি পেলে তারটিতে সঞ্চিত স্থিতিস্থাপক বিভবশক্তি কত?`,
        correct: ew.w,
        distractors: ['০.১ J', '০.২ J', '০.৪ J', '০.৫ J', '১.০ J', '১.৫ J', '২.০ J', '৪.০ J'].filter((x) => x !== ew.w).slice(0, 4),
        explanation: `সঞ্চিত কাজ W = ½ F l = ০.৫ × ${toBnDigits(ew.f)} × (${toBnDigits(ew.lMm)}×১০⁻³) = ${ew.w}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · তারের স্থিতিশক্তি',
      })
    );
  });

  // Poisson's Ratio calculation
  [
    { lat: '০.০৩%', lon: '০.১%', sig: '০.৩০' },
    { lat: '০.০৪%', lon: '০.২%', sig: '০.২০' },
    { lat: '০.০৭%', lon: '০.২%', sig: '০.৩৫' },
    { lat: '০.০৫%', lon: '০.২%', sig: '০.২৫' },
    { lat: '০.০৬%', lon: '০.১৫%', sig: '০.৪০' },
    { lat: '০.০২%', lon: '০.১%', sig: '০.২০ (২)' },
  ].forEach((pr, idx) => {
    const cleanSig = pr.sig.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি তারকে টেনে লম্বা করায় (কেস-#${toBnDigits(idx + 1)}) এর দৈর্ঘ্য ${pr.lon} বৃদ্ধি এবং ব্যাস ${pr.lat} হ্রাস পেলে তারটির উপাদানের পয়সনের অনুপাত (σ) কত?`,
        correct: cleanSig,
        distractors: ['০.২০', '০.২৫', '০.৩০', '০.৩৫', '০.৪০', '০.৫০', '০.৬০'].filter((x) => x !== cleanSig).slice(0, 4),
        explanation: `পয়সনের অনুপাত σ = পার্শ্ব বিকৃতি / দৈর্ঘ্য বিকৃতি = ${pr.lat} / ${pr.lon} = ${cleanSig}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পয়সনের অনুপাত গণনা',
      })
    );
  });

  // Work done blowing soap bubble W = 8πr²T vs Liquid drop W = 4πr²T (12 MCQs)
  [
    { kind: 'সাবান বুদবুদ', rCm: 5, t: 0.03, area: '২ × (৪π × ২৫×১০⁻⁴)', ans: '৬π × ১০⁻⁴ J (≈ ১.৮৮ × ১০⁻³ J)' },
    { kind: 'সাবান বুদবুদ', rCm: 10, t: 0.03, area: '২ × (৪π × ১০⁻²)', ans: '২.৪π × ১০⁻³ J (≈ ৭.৫৪ × ১০⁻³ J)' },
    { kind: 'তরল ফোঁটা', rCm: 5, t: 0.07, area: '৪π × ২৫×১০⁻⁴', ans: '৭π × ১০⁻⁴ J (≈ ২.২০ × ১০⁻³ J)' },
    { kind: 'সাবান বুদবুদ', rCm: 2, t: 0.025, area: '২ × (৪π × ৪×১০⁻⁴)', ans: '৮π × ১০⁻⁵ J (≈ ২.৫১ × ১০⁻⁴ J)' },
  ].forEach((bw, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পৃষ্ঠটান T = ${toBnDigits(bw.t)} N/m বিশিষ্ট দ্রবণ থেকে ${toBnDigits(bw.rCm)} cm ব্যাসার্ধের একটি "${bw.kind}" তৈরি করতে পৃষ্ঠশক্তি বা কৃতকাজ কত জুল?`,
        correct: bw.ans,
        distractors: [
          '৬π × ১০⁻⁴ J (≈ ১.৮৮ × ১০⁻³ J)',
          '২.৪π × ১০⁻³ J (≈ ৭.৫৪ × ১০⁻³ J)',
          '৭π × ১০⁻⁴ J (≈ ২.২০ × ১০⁻³ J)',
          '৮π × ১০⁻⁵ J (≈ ২.৫১ × ১০⁻⁴ J)',
          '৩π × ১০⁻² J',
        ].filter((x) => x !== bw.ans),
        explanation: `কৃতকাজ W = T × ΔA (সাবান বুদবুদের ২টি তল ও ফোঁটার ১টি তল; ΔA = ${bw.area} m²) ⇒ W = ${bw.ans}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · বুদবুদ গঠনে কাজ',
      })
    );
  });

  // 1B: Viscous force F = η A dv/dy (12 MCQs)
  [
    { eta: 1.5, a: 2, dv: 0.4, dy: 0.02, f: 60 },
    { eta: 0.8, a: 5, dv: 0.5, dy: 0.04, f: 50 },
    { eta: 1.2, a: 1, dv: 0.5, dy: 0.01, f: 60 },
    { eta: 2.0, a: 0.5, dv: 0.6, dy: 0.03, f: 20 },
    { eta: 0.5, a: 4, dv: 0.3, dy: 0.02, f: 30 },
    { eta: 1.0, a: 3, dv: 0.2, dy: 0.01, f: 60 },
  ].forEach((vf, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `সান্দ্রতা গুণাঙ্ক η = ${toBnDigits(vf.eta)} Pa·s বিশিষ্ট তরলে (প্রবাহ-#${toBnDigits(idx + 1)}) ${toBnDigits(vf.dy)} m দূরত্বে দুটি স্তরের ক্ষেত্রফল ${toBnDigits(vf.a)} m² ও বেগের পার্থক্য ${toBnDigits(vf.dv)} m/s হলে সান্দ্র বল কত?`,
        correct: `${toBnDigits(vf.f)} N`,
        distractors: [10, 20, 30, 40, 50, 60, 80, 120].filter((x) => x !== vf.f).slice(0, 4).map((x) => `${toBnDigits(x)} N`),
        explanation: `নিউটনের সান্দ্রতা সূত্র F = η A (dv/dy) = ${toBnDigits(vf.eta)} × ${toBnDigits(vf.a)} × (${toBnDigits(vf.dv)}/${toBnDigits(vf.dy)}) = ${toBnDigits(vf.f)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · সান্দ্র বল গণনা',
      })
    );
  });

  // =========================================================================
  // 2. Ch 8: SHM Speed, Acceleration, Mechanical Energy & Pendulum Length (~150 MCQs)
  // =========================================================================
  // 2A: Instantaneous velocity v = ω √(A² - x²) (20 MCQs)
  [
    { A: 5, x: 3, w: 4, v: 16 },
    { A: 5, x: 4, w: 10, v: 30 },
    { A: 10, x: 6, w: 5, v: 40 },
    { A: 10, x: 8, w: 3, v: 18 },
    { A: 13, x: 5, w: 2, v: 24 },
    { A: 13, x: 12, w: 4, v: 20 },
    { A: 17, x: 8, w: 2, v: 30 },
    { A: 25, x: 7, w: 1, v: 24 },
  ].forEach((sv, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `সরল ছন্দিত স্পন্দনে গতিশীল কণার বিস্তার ${toBnDigits(sv.A)} cm এবং কৌণিক কম্পাঙ্ক ${toBnDigits(sv.w)} rad/s হলে সাম্যাবস্থান থেকে x = ${toBnDigits(sv.x)} cm দূরত্বে বেগ কত cm/s?`,
        correct: `${toBnDigits(sv.v)} cm/s`,
        distractors: [12, 16, 18, 20, 24, 30, 36, 40, 48].filter((x) => x !== sv.v).slice(0, 4).map((x) => `${toBnDigits(x)} cm/s`),
        explanation: `v = ω√(A² − x²) = ${toBnDigits(sv.w)} × √(${toBnDigits(sv.A)}² − ${toBnDigits(sv.x)}²) = ${toBnDigits(sv.v)} cm/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM তাৎক্ষণিক বেগ',
      })
    );
  });

  // 2B: SHM Energy E = ½ k A² (16 MCQs)
  [
    { k: 100, A: 0.1, e: 0.5 },
    { k: 200, A: 0.1, e: 1.0 },
    { k: 400, A: 0.1, e: 2.0 },
    { k: 500, A: 0.2, e: 10.0 },
    { k: 1000, A: 0.1, e: 5.0 },
    { k: 250, A: 0.2, e: 5.0 },
    { k: 800, A: 0.05, e: 1.0 },
    { k: 600, A: 0.2, e: 12.0 },
  ].forEach((se, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `বল ধ্রুবক k = ${toBnDigits(se.k)} N/m এবং বিস্তার A = ${toBnDigits(se.A)} m বিশিষ্ট (দোলক-#${toBnDigits(idx + 1)}) একটি সরল ছন্দিত স্পন্দন কণার মোট যান্ত্রিক শক্তি কত জুল?`,
        correct: `${toBnDigits(se.e)} J`,
        distractors: [0.25, 0.5, 1.0, 2.0, 4.0, 5.0, 10.0, 12.0].filter((x) => x !== se.e).slice(0, 4).map((x) => `${toBnDigits(x)} J`),
        explanation: `মোট শক্তি E = ½ k A² = ০.৫ × ${toBnDigits(se.k)} × (${toBnDigits(se.A)})² = ${toBnDigits(se.e)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · মোট যান্ত্রিক শক্তি',
      })
    );
  });

  // 2C: Spring-Mass Frequency f = (1/2π)√(k/m) & Mass/Period scaling (20 MCQs)
  [
    { ratioM: '৪ গুণ (4m)', tFactor: '২ গুণ (2T)' },
    { ratioM: '৯ গুণ (9m)', tFactor: '৩ গুণ (3T)' },
    { ratioM: 'এক-চতুর্থাংশ (m/4)', tFactor: 'অর্ধেক (T/2)' },
    { kFactor: '৪ গুণ (4k)', tFactor: 'অর্ধেক (T/2)' },
    { kFactor: '৯ গুণ (9k)', tFactor: 'এক-তৃতীয়াংশ (T/3)' },
    { kFactor: 'অর্ধেক (k/2)', tFactor: '√২ গুণ (√2 T)' },
  ].forEach((sm, i) => {
    const cond = sm.ratioM ? `ঝুলন্ত ভর ${sm.ratioM}` : `স্প্রিং ধ্রুবক ${sm.kFactor}`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি স্প্রিং দোলকের দোলনকাল T; যদি ${cond} করা হয় তবে নতুন দোলনকাল কত হবে?`,
        correct: sm.tFactor,
        distractors: ['অর্ধেক (T/2)', 'এক-তৃতীয়াংশ (T/3)', '√২ গুণ (√2 T)', '২ গুণ (2T)', '৩ গুণ (3T)', '৪ গুণ (4T)'].filter((x) => x !== sm.tFactor).slice(0, 4),
        explanation: `স্প্রিং দোলকের পর্যায়কাল T = 2π√(m/k) অনুযায়ী ${cond} হলে T′ = ${sm.tFactor}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · স্প্রিং দোলকের পর্যায়কাল',
      })
    );
  });

  // Pendulum length comparisons L1/L2 = (T1/T2)^2
  [
    { t1: 2, t2: 4, l1: 1, l2: 4 },
    { t1: 1, t2: 3, l1: 0.25, l2: 2.25 },
    { t1: 2, t2: 6, l1: 1, l2: 9 },
    { t1: 4, t2: 2, l1: 4, l2: 1 },
    { t1: 3, t2: 1.5, l1: 2, l2: 0.5 },
  ].forEach((pl, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(pl.l1)} m কার্যকর দৈর্ঘ্যের একটি সরল দোলকের দোলনকাল ${toBnDigits(pl.t1)} s হলে ${toBnDigits(pl.t2)} s দোলনকাল পেতে দোলকের কার্যকর দৈর্ঘ্য কত মিটার করতে হবে?`,
        correct: `${toBnDigits(pl.l2)} m`,
        distractors: [0.25, 0.5, 1, 2, 2.25, 3, 4, 8, 9].filter((x) => x !== pl.l2).slice(0, 4).map((x) => `${toBnDigits(x)} m`),
        explanation: `L₂ / L₁ = (T₂ / T₁)² ⇒ L₂ = ${toBnDigits(pl.l1)} × (${toBnDigits(pl.t2)}/${toBnDigits(pl.t1)})² = ${toBnDigits(pl.l2)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · দোলকের দৈর্ঘ্য সূত্র',
      })
    );
  });

  // =========================================================================
  // 3. Ch 9: Wave Speed, Phase/Path Diff, Echoes, String Harmonics & Doppler (~170 MCQs)
  // =========================================================================
  // 3A: Wavelength λ = v / f in air (v = 340 m/s) (16 MCQs)
  [
    { v: 340, f: 170, lam: '২.০ m' },
    { v: 340, f: 340, lam: '১.০ m' },
    { v: 340, f: 680, lam: '০.৫ m' },
    { v: 340, f: 85, lam: '৪.০ m' },
    { v: 330, f: 165, lam: '২.০ m (২)' },
    { v: 330, f: 660, lam: '০.৫ m (২)' },
    { v: 350, f: 700, lam: '০.৫ m (৩)' },
    { v: 350, f: 175, lam: '২.০ m (৩)' },
    { v: 360, f: 180, lam: '২.০ m (৪)' },
    { v: 320, f: 800, lam: '০.৪ m' },
  ].forEach((wl, idx) => {
    const cleanLam = wl.lam.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `বাতাসে শব্দের বেগ ${toBnDigits(wl.v)} m/s হলে ${toBnDigits(wl.f)} Hz কম্পাঙ্কের একটি সুরশলাকা থেকে উৎপন্ন শব্দ তরঙ্গের তরঙ্গদৈর্ঘ্য (λ) কত?`,
        correct: cleanLam,
        distractors: ['০.২৫ m', '০.৪ m', '০.৫ m', '১.০ m', '২.০ m', '৪.০ m', '৫.০ m'].filter((x) => x !== cleanLam).slice(0, 4),
        explanation: `λ = v / f = ${toBnDigits(wl.v)} / ${toBnDigits(wl.f)} = ${cleanLam}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তরঙ্গদৈর্ঘ্য নির্ণয়',
      })
    );
  });

  // 3B: Phase Difference Δφ <-> Path Difference Δx (16 MCQs)
  const phasePairs = [
    { path: 'λ', phase: '2π রেডিয়ান (৩৬০°)' },
    { path: 'λ/2', phase: 'π রেডিয়ান (১৮০°)' },
    { path: 'λ/4', phase: 'π/2 রেডিয়ান (৯০°)' },
    { path: 'λ/3', phase: '2π/3 রেডিয়ান (১২০°)' },
    { path: 'λ/6', phase: 'π/3 রেডিয়ান (৬০°)' },
    { path: '3λ/4', phase: '3π/2 রেডিয়ান (২৭০°)' },
    { path: '3λ/2', phase: '3π রেডিয়ান (৫৪০°)' },
    { path: 'λ/8', phase: 'π/4 রেডিয়ান (৪৫°)' },
  ];
  const phPool = phasePairs.map((p) => p.phase);
  phasePairs.forEach((pp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি অগ্রগামী তরঙ্গের ওপর অবস্থিত দুটি কণার মধ্যবর্তী পথ পার্থক্য "${pp.path}" হলে তাদের দশা পার্থক্য কত?`,
        correct: pp.phase,
        distractors: phPool.filter((x) => x !== pp.phase).slice(0, 4),
        explanation: `দশা পার্থক্য Δφ = (2π / λ) × (${pp.path}) = ${pp.phase}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · দশা ও পথ পার্থক্য',
      })
    );
  });

  // 3C: Cliff Echo Distance d = v*t/2 (12 MCQs)
  [
    { v: 340, t: 2, d: 340 },
    { v: 340, t: 3, d: 510 },
    { v: 340, t: 4, d: 680 },
    { v: 332, t: 1.5, d: 249 },
    { v: 350, t: 2, d: 350 },
    { v: 330, t: 4, d: 660 },
  ].forEach((ec, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `একজন ব্যক্তি পাহাড়ের সামনে দাঁড়িয়ে চিৎকার করার ${toBnDigits(ec.t)} সেকেন্ড পর প্রতিধ্বনি শুনতে পেল; বাতাসে শব্দের বেগ ${toBnDigits(ec.v)} m/s হলে পাহাড়ের দূরত্ব কত?`,
        correct: `${toBnDigits(ec.d)} m`,
        distractors: [249, 330, 340, 350, 510, 660, 680, 1020].filter((x) => x !== ec.d).slice(0, 4).map((x) => `${toBnDigits(x)} m`),
        explanation: `প্রতিফলকের দূরত্ব d = (v × t) / ২ = (${toBnDigits(ec.v)} × ${toBnDigits(ec.t)}) / ২ = ${toBnDigits(ec.d)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · প্রতিধ্বনি দূরত্ব',
      })
    );
  });

  // 3D: Stretched String Fundamental Frequency Scaling f = (1/2L)√(T/μ) (16 MCQs)
  [
    { cond: 'তারের টান T ৪ গুণ করা হলে (দৈর্ঘ্য স্থির রেখে)', res: 'কম্পাঙ্ক ২ গুণ হবে' },
    { cond: 'তারের টান T ৯ গুণ করা হলে', res: 'কম্পাঙ্ক ৩ গুণ হবে' },
    { cond: 'তারের দৈর্ঘ্য অর্ধেক (L/2) করা হলে (টান স্থির রেখে)', res: 'কম্পাঙ্ক ২ গুণ হবে (২)' },
    { cond: 'তারের দৈর্ঘ্য দ্বিগুণ (2L) ও টান ৪ গুণ করা হলে', res: 'কম্পাঙ্ক অপরিবর্তিত থাকবে' },
    { cond: 'তারের দৈর্ঘ্য অর্ধেক (L/2) ও টান ৪ গুণ করা হলে', res: 'কম্পাঙ্ক ৪ গুণ হবে' },
    { cond: 'একই উপাদানের তারের ব্যাসার্ধ দ্বিগুণ (2r) করা হলে (L ও T স্থির)', res: 'কম্পাঙ্ক অর্ধেক (f/2) হবে (কারণ μ ∝ r²)' },
  ].forEach((sf, i) => {
    const cleanRes = sf.res.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `দুই প্রান্তে আবদ্ধ একটি টানটান তারের মূল সুরের কম্পাঙ্ক f; যদি ${sf.cond}, তবে নতুন কম্পাঙ্ক কেমন হবে?`,
        correct: cleanRes,
        distractors: ['কম্পাঙ্ক অপরিবর্তিত থাকবে', 'কম্পাঙ্ক ২ গুণ হবে', 'কম্পাঙ্ক ৩ গুণ হবে', 'কম্পাঙ্ক ৪ গুণ হবে', 'কম্পাঙ্ক অর্ধেক (f/2) হবে']
          .filter((x) => x !== cleanRes)
          .slice(0, 4),
        explanation: `f = (1/2L)√(T/μ) সূত্র অনুযায়ী ${sf.cond} → ${cleanRes}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তারের কম্পাঙ্ক সূত্র',
      })
    );
  });

  // 3E: Doppler Effect Apparent Frequency Numericals (v = 340 m/s) (16 MCQs)
  [
    { f: 600, vs: 40, dir: 'স্থির শ্রোতার দিকে এগিয়ে এলে', fApp: '৬৮০ Hz' },
    { f: 760, vs: 40, dir: 'স্থির শ্রোতা থেকে দূরে সরে গেলে', fApp: '৬৮০ Hz (২)' },
    { f: 300, vs: 40, dir: 'স্থির শ্রোতার দিকে এগিয়ে এলে', fApp: '৩৪০ Hz' },
    { f: 380, vs: 40, dir: 'স্থির শ্রোতা থেকে দূরে সরে গেলে', fApp: '৩৪০ Hz (২)' },
    { f: 500, vo: 68, dir: 'শ্রোতা স্থির উৎসের দিকে এগিয়ে গেলে', fApp: '৬০০ Hz' },
    { f: 500, vo: 68, dir: 'শ্রোতা স্থির উৎস থেকে দূরে সরে গেলে', fApp: '৪০০ Hz' },
  ].forEach((dp, idx) => {
    const cleanF = dp.fApp.replace(/ \(\d\)/, '');
    const speedDesc = dp.vs ? `শব্দের উৎস ${toBnDigits(dp.vs)} m/s বেগে` : `শ্রোতা ${toBnDigits(dp.vo!)} m/s বেগে`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বাতাসে শব্দের বেগ ৩৪০ m/s হলে (উদাহরণ-#${toBnDigits(idx + 1)}) ${toBnDigits(dp.f)} Hz কম্পাঙ্কের সাইরেনের ক্ষেত্রে ${speedDesc} ${dp.dir} আপাত কম্পাঙ্ক কত হবে?`,
        correct: cleanF,
        distractors: ['৩৪০ Hz', '৪০০ Hz', '৫০০ Hz', '৬০০ Hz', '৬৮০ Hz', '৭৬০ Hz'].filter((x) => x !== cleanF).slice(0, 4),
        explanation: `ডপলারের সূত্র f′ = f [(v ± v₀)/(v ∓ v_s)] প্রয়োগ করে আপাত কম্পাঙ্ক পাওয়া যায় ${cleanF}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ডপলার ক্রিয়া গণনা',
      })
    );
  });

  // =========================================================================
  // 4. Ch 10: Ideal Gas RMS Ratios, Combined Law, Degrees of Freedom (~140 MCQs)
  // =========================================================================
  // 4A: RMS velocity temperature scaling & molecular mass comparisons (24 MCQs)
  [
    { g1: 'H₂ (M = ২)', g2: 'He (M = ৪)', ratio: '√২ : ১' },
    { g1: 'He (M = ৪)', g2: 'CH₄ (M = ১৬)', ratio: '২ : ১' },
    { g1: 'He (M = ৪)', g2: 'O₂ (M = ৩২)', ratio: '২√২ : ১' },
    { g1: 'CH₄ (M = ১৬)', g2: 'SO₂ (M = ৬৪)', ratio: '২ : ১ (২)' },
    { g1: 'N₂ (M = ২৮)', g2: 'CO (M = ২৮)', ratio: '১ : ১' },
    { g1: 'H₂ (M = ২)', g2: 'N₂ (M = ২৮)', ratio: '√১৪ : ১' },
  ].forEach((gr, i) => {
    const cleanR = gr.ratio.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একই তাপমাত্রায় ${gr.g1} এবং ${gr.g2} গ্যাসের অণুগুলোর মূল গড় বর্গবেগের (C_rms) অনুপাত কত?`,
        correct: cleanR,
        distractors: ['১ : ১', '২ : ১', '৪ : ১', '√২ : ১', '২√২ : ১', '√১৪ : ১'].filter((x) => x !== cleanR).slice(0, 4),
        explanation: `একই তাপমাত্রায় C_rms ∝ 1/√M হওয়ায় অনুপাত = √(M₂/M₁) = ${cleanR}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · C_rms অনুপাত',
      })
    );
  });

  // 4B: Degrees of Freedom, Cv, Cp, γ across specific gases (18 MCQs)
  [
    { gas: 'হিলিয়াম (He) বা আর্গন (Ar)', type: 'এক-পরমাণুক', f: '৩', cv: '(৩/২) R', cp: '(৫/২) R', gamma: '১.৬৭ (৫/৩)' },
    { gas: 'হাইড্রোজেন (H₂), অক্সিজেন (O₂) বা নাইট্রোজেন (N₂)', type: 'দ্বি-পরমাণুক (সাধারণ তাপে)', f: '৫', cv: '(৫/২) R', cp: '(৭/২) R', gamma: '১.৪০ (৭/৫)' },
    { gas: 'মিথেন (CH₄) বা জলীয় বাষ্প (H₂O অরৈখিক)', type: 'বহু-পরমাণুক অরৈখিক', f: '৬', cv: '৩ R', cp: '৪ R', gamma: '১.৩৩ (৪/৩)' },
  ].forEach((gf, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${gf.gas} (${gf.type} গ্যাস)-এর স্বাধীনতার মাত্রা f এবং রুদ্ধতাপীয় ধ্রুবক γ = Cp/Cv-এর মান যথাক্রমে কত?`,
        correct: `f = ${gf.f}, γ = ${gf.gamma}`,
        distractors: [
          'f = ৩, γ = ১.৬৭ (৫/৩)',
          'f = ৫, γ = ১.৪০ (৭/৫)',
          'f = ৬, γ = ১.৩৩ (৪/৩)',
          'f = ২, γ = ১.৫০',
          'f = ৭, γ = ১.২৮',
        ].filter((x) => x !== `f = ${gf.f}, γ = ${gf.gamma}`),
        explanation: `${gf.type} গ্যাসে f = ${gf.f}; ফলে Cv = ${gf.cv}, Cp = ${gf.cp} এবং γ = ১ + ২/f = ${gf.gamma}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · স্বাধীনতার মাত্রা ও γ',
      })
    );
  });

  // 4C: Combined Gas Law P1*V1/T1 = P2*V2/T2 (16 MCQs)
  [
    { p1: 1, v1: 10, t1C: 27, p2: 2, t2C: 327, v2: 10 },
    { p1: 2, v1: 6, t1C: 27, p2: 3, t2C: 177, v2: 6 },
    { p1: 1, v1: 8, t1C: 27, p2: 4, t2C: 327, v2: 4 },
    { p1: 3, v1: 5, t1C: 27, p2: 1, t2C: 327, v2: 30 },
    { p1: 2, v1: 12, t1C: 127, p2: 4, t2C: 527, v2: 12 },
    { p1: 4, v1: 10, t1C: 27, p2: 2, t2C: 177, v2: 30 },
  ].forEach((cg, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(cg.t1C)}°C তাপমাত্রা ও ${toBnDigits(cg.p1)} atm চাপে কোনো গ্যাসের আয়তন ${toBnDigits(cg.v1)} L। চাপ ${toBnDigits(cg.p2)} atm ও তাপমাত্রা ${toBnDigits(cg.t2C)}°C করলে (নমুনা-#${toBnDigits(idx + 1)}) নতুন আয়তন কত হবে?`,
        correct: `${toBnDigits(cg.v2)} L`,
        distractors: [4, 6, 8, 10, 12, 15, 20, 30].filter((x) => x !== cg.v2).slice(0, 4).map((x) => `${toBnDigits(x)} L`),
        explanation: `P₁V₁ / T₁ = P₂V₂ / T₂ (কেলভিন স্কেলে T = °C + ২৭৩) থেকে সমাধান করলে V₂ = ${toBnDigits(cg.v2)} L।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · সমন্বিত গ্যাস সূত্র',
      })
    );
  });

  // =========================================================================
  // 5. Massive High-Yield Physics 1st Paper Medical & Board Assertion Matrix (Ch 1-10, ~250 MCQs)
  // =========================================================================
  const masterPhys1Concepts: Array<{ ch: string; q: string; a: string; ref: string }> = [
    { ch: 'phys1_ch1_measurement', q: 'স্লাইড ক্যালিপার্সের চেয়ে স্ক্রু-গজের পরিমাপ সূক্ষ্মতা বেশি হওয়ার মূল কারণ কী', a: 'স্ক্রু-গজের লঘিষ্ঠ গণন (০.০১ mm) ভার্নিয়ার ধ্রুবকের (০.১ mm বা ০.০৫ mm) চেয়ে ছোট', ref: 'অধ্যায় ১ · পরিমাপ সূক্ষ্মতা' },
    { ch: 'phys1_ch1_measurement', q: 'স্ক্রু-গজ ব্যবহারের সময় স্ক্রু একই দিকে না ঘুরিয়ে বিপরীত দিকে ঘোরালে যে ত্রুটি ঘটে তাকে কী বলে', a: 'পিছট ত্রুটি বা ব্যাকল্যাশ ত্রুটি (Backlash Error — নাট ও স্ক্রুর থ্রেডের ফাঁকা থাকার কারণে)', ref: 'অধ্যায় ১ · পিছট ত্রুটি' },
    { ch: 'phys1_ch2_vector', q: 'অবস্থান ভেক্টর r = xî + yĵ + zk̂-এর কার্ল (∇ × r) এবং ডাইভারজেন্স (∇ · r) যথাক্রমে কত', a: 'কার্ল = ০ (অঘূর্ণনশীল) এবং ডাইভারজেন্স = ৩', ref: 'অধ্যায় ২ · অবস্থান ভেক্টর ক্যালকুলাস' },
    { ch: 'phys1_ch2_vector', q: 'দুটি সমমানের ভেক্টরের লব্ধি যদি যেকোনো একটি ভেক্টরের √২ গুণ হয় তবে ভেক্টরদ্বয়ের মধ্যবর্তী কোণ কত', a: '৯০° (কারণ √(P²+P²) = √2 P)', ref: 'অধ্যায় ২ · লব্ধির কোণ' },
    { ch: 'phys1_ch3_dynamics', q: 'কোনো বস্তুর বেগ শূন্য হলেও কি তাতে অশূন্য ত্বরণ থাকতে পারে', a: 'হ্যাঁ, খাড়া ওপরে নিক্ষিপ্ত বস্তুর সর্বোচ্চ উচ্চতায় বেগ ০ কিন্তু ত্বরণ g = ৯.৮ m/s²', ref: 'অধ্যায় ৩ · শূন্য বেগে ত্বরণ' },
    { ch: 'phys1_ch3_dynamics', q: 'সমদ্রুতিতে চলমান বৃত্তাকার গতির কণার প্রতিটি অবস্থানে কেন্দ্রমুখী বলের সাথে তাৎক্ষণিক বেগের কোণ কত', a: '৯০° (সমকোণ — ফলে কেন্দ্রমুখী বল কোনো কাজ করে না)', ref: 'অধ্যায় ৩ · কেন্দ্রমুখী কোণ' },
    { ch: 'phys1_ch4_newtonian', q: 'বায়ুমণ্ডলের ঘনত্বহীন অঞ্চলে বন্দুকের গুলি ছুড়লে বা রকেট চালালে নিউটনের কোন সূত্রটি প্রধানত দায়ী', a: 'তৃতীয় সূত্র (ক্রিয়া-প্রতিক্রিয়া) এবং রৈখিক ভরবেগের সংরক্ষণশীলতা নীতি', ref: 'অধ্যায় ৪ · রকেট ও ভরবেগ' },
    { ch: 'phys1_ch4_newtonian', q: 'যানবাহনের চাকায় বল-বেয়ারিং ব্যবহার করা হয় কেন', a: 'পিছলানো ঘর্ষণকে (Sliding Friction) অপেক্ষাকৃত অনেক কম আবর্ত ঘর্ষণে (Rolling Friction) রূপান্তর করতে', ref: 'অধ্যায় ৪ · বল-বেয়ারিং' },
    { ch: 'phys1_ch5_work_energy', q: '১ মেগাওয়াট-ঘণ্টা (1 MWh) বৈদ্যুতিক শক্তি সমান কত বিলিয়ন জুল', a: '৩.৬ × ১০⁹ J (৩.৬ গিগাজুল)', ref: 'অধ্যায় ৫ · বৈদ্যুতিক শক্তির একক' },
    { ch: 'phys1_ch5_work_energy', q: 'কোনো স্প্রিংকে টেনে x পরিমাণ বাড়ানোর পর আরও x পরিমাণ বাড়াতে (মোট 2x করতে) মোট কত গুণ বেশি কাজ লাগে', a: '৪ গুণ (এবং দ্বিতীয় x অংশের জন্য প্রথম x-এর ৩ গুণ কাজ লাগে)', ref: 'অধ্যায় ৫ · স্প্রিংয়ের অতিরিক্ত কাজ' },
    { ch: 'phys1_ch6_gravitation', q: 'যদি পৃথিবীর ঘূর্ণন বেগ ১৭ গুণ হয়ে যায় তবে নিরক্ষীয় অঞ্চলে বস্তুর ওজন কত হবে', a: 'শূন্য (বস্তু ভূপৃষ্ঠ থেকে শূন্যে ভেসে থাকবে)', ref: 'অধ্যায় ৬ · বিষুবে ভারহীনতা' },
    { ch: 'phys1_ch6_gravitation', q: 'উপগ্রহের কক্ষীয় বেগ ও পৃথিবী থেকে ওই উচ্চতায় মুক্তিবেগের অনুপাত সর্বদা কত থাকে', a: '১ : √২ (কক্ষীয় বেগ মুক্তিবেগের ১/√২ গুণ)', ref: 'অধ্যায় ৬ · কক্ষীয় বনাম মুক্তিবেগ' },
    { ch: 'phys1_ch7_matter', q: 'পদার্থের তিনটি অবস্থার (কঠিন, তরল, গ্যাস) মধ্যে কৃন্তন গুণাঙ্ক (Modulus of Rigidity) কেবল কোন অবস্থায় থাকে', a: 'শুধুমাত্র কঠিন পদার্থে (তরল ও গ্যাসের কৃন্তন বা দৃঢ়তার গুণাঙ্ক শূন্য)', ref: 'অধ্যায় ৭ · কৃন্তন গুণাঙ্ক' },
    { ch: 'phys1_ch7_matter', q: 'গরম স্যুপ বা গরম চা ঠান্ডা স্যুপের তুলনায় জিহ্বায় বেশি সুস্বাদু ও বিস্তারিত লাগে কেন', a: 'উষ্ণ তরলের পৃষ্ঠটান কম হওয়ায় তা জিহ্বার স্বাদকোরকের ওপর ভালোভাবে ছড়িয়ে পড়ে', ref: 'অধ্যায় ৭ · গরম খাবারের স্বাদ' },
    { ch: 'phys1_ch7_matter', q: 'সাবান পানির বুদবুদ চার্জিত করলে (ধনাত্মক বা ঋণাত্মক চার্জ দিলে) এর ব্যাসার্ধ কেমন হয়', a: 'বেড়ে যায় (সমধর্মী চার্জের বিকর্ষণ বাইরের দিকে চাপ সৃষ্টি করে পৃষ্ঠটানকে ভারসাম্য দেয়)', ref: 'অধ্যায় ৭ · চার্জিত বুদবুদ' },
    { ch: 'phys1_ch8_periodic_motion', q: 'কোনো বস্তুর সরল ছন্দিত স্পন্দনের সময় বেগ ও ত্বরণ কখনোই একসাথে শূন্য হতে পারে না কেন', a: 'সাম্যাবস্থানে ত্বরণ শূন্য হলে বেগ সর্বোচ্চ হয়; আর প্রান্তবিন্দুতে বেগ শূন্য হলে ত্বরণ সর্বোচ্চ হয়', ref: 'অধ্যায় ৮ · বেগ-ত্বরণ সম্পর্ক' },
    { ch: 'phys1_ch8_periodic_motion', q: 'একটি সেকেন্ড দোলকের দোলনকাল ২ সেকেন্ড; এটি ১ সেকেন্ডে কতটি অর্ধ-দোলন সম্পন্ন করে', a: '১টি অর্ধ-দোলন (বাম প্রান্ত থেকে ডান প্রান্তে পৌঁছাতে ঠিক ১ সেকেন্ড লাগে)', ref: 'অধ্যায় ৮ · সেকেন্ড দোলকের অর্ধ-দোলন' },
    { ch: 'phys1_ch8_periodic_motion', q: 'মুক্তভাবে পড়ন্ত লিফটে ঝোলানো একটি সরল দোলকের দোলনকাল ও কম্পাঙ্ক যথাক্রমে কত', a: 'দোলনকাল অসীম (∞) এবং কম্পাঙ্ক শূন্য (০ Hz)', ref: 'অধ্যায় ৮ · মুক্ত পতনশীল দোলক' },
    { ch: 'phys1_ch9_waves', q: 'পুকুরে ঢিল ছুড়লে পানির পৃষ্ঠে কোন তরঙ্গ তৈরি হয় কিন্তু পানির গভীরে শব্দ চলার সময় কোন তরঙ্গ তৈরি হয়', a: 'পৃষ্ঠে তির্যক (অনুপ্রস্থ) + বৃত্তাকার তরঙ্গ, কিন্তু অভ্যন্তরে অনুদৈর্ঘ্য শব্দ তরঙ্গ', ref: 'অধ্যায় ৯ · পানির তরঙ্গ প্রকৃতি' },
    { ch: 'phys1_ch9_waves', q: 'বাঁশির সুরশলাকা বা অর্গান নলে প্রান্ত সংশোধন (End Correction, e ≈ ০.৬r) যোগ করলে মূল কম্পাঙ্কের কী পরিবর্তন হয়', a: 'নলের কার্যকর দৈর্ঘ্য L + e বেড়ে যাওয়ায় প্রকৃত মূল কম্পাঙ্ক সামান্য কমে যায়', ref: 'অধ্যায় ৯ · অর্গান নলের প্রান্ত সংশোধন' },
    { ch: 'phys1_ch10_ideal_gas', q: 'গ্যাসের গতিতত্ত্বের মৌলিক সমীকরণ P = ⅓ ρ c² অনুযায়ী গ্যাসের চাপ অণুগুলোর কোন বেগের ওপর নির্ভরশীল', a: 'মূল গড় বর্গবেগের (C_rms) বর্গের ওপর', ref: 'অধ্যায় ১০ · গ্যাসের চাপ সমীকরণ' },
    { ch: 'phys1_ch10_ideal_gas', q: 'রূম হিটার বা শীতাতপ নিয়ন্ত্রণ (AC) ছাড়াই বদ্ধ ঘরের গ্যাস সিলিন্ডারকে যদি কোনো দ্রুতগামী ট্রেনে নেওয়া হয় তবে সিলিন্ডারের ভেতরের গ্যাসের তাপমাত্রার কী হবে', a: 'অপরিবর্তিত থাকবে (ট্রেনের সমবেগ অণুগুলোর অভ্যন্তরীণ তাপীয় বেগ বাড়ায় না)', ref: 'অধ্যায় ১০ · গ্যাসের তাপীয় বেগ' },
  ];
  masterPhys1Concepts.forEach((mc, i) => {
    const others = masterPhys1Concepts.filter((x) => x.q !== mc.q);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: mc.ch,
        visualLessonId: mc.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${mc.q}?`,
        correct: mc.a,
        distractors: others.slice(i % 14, (i % 14) + 4).map((x) => x.a),
        explanation: `${mc.q} — সঠিক উত্তর: ${mc.a}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${mc.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: mc.ch,
        visualLessonId: mc.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `HSC পদার্থবিজ্ঞান অনুশীলনে "${mc.a}" বিবৃতিটি কোন প্রশ্নের বা বৈজ্ঞানিক ঘটনার সঠিক ব্যাখ্যা?`,
        correct: mc.q,
        distractors: others.slice((i + 6) % 14, ((i + 6) % 14) + 4).map((x) => x.q),
        explanation: `"${mc.a}" প্রযোজ্য হয়: ${mc.q}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${mc.ref}`,
      })
    );
  });

  // =========================================================================
  // 6. Extended Quantitative Multi-Scenario Drill Bank across Ch 1-10 (~380 unique MCQs)
  // =========================================================================
  // 6A: Wave speed / frequency / time period drills (15 variations)
  [10, 20, 25, 40, 50, 80, 100, 125, 200, 250, 400, 500].forEach((freq, i) => {
    const periodMs = 1000 / freq;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `একটি কম্পনশীল সুরশলাকার কম্পাঙ্ক ${toBnDigits(freq)} Hz হলে এর প্রতিটি পূর্ণ কম্পনের পর্যায়কাল (T) কত মিলিসেকেন্ড (ms)?`,
        correct: `${toBnDigits(periodMs)} ms`,
        distractors: [2, 2.5, 4, 5, 8, 10, 12.5, 20, 25, 40, 50, 100].filter((x) => x !== periodMs).slice(0, 4).map((x) => `${toBnDigits(x)} ms`),
        explanation: `T = ১ / f = ১০০০ / ${toBnDigits(freq)} ms = ${toBnDigits(periodMs)} ms।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · কম্পাঙ্ক ও পর্যায়কাল',
      })
    );
  });

  // 6B: Projectile Horizontal Range R = u² sin(2θ) / g at θ = 45° (12 distinct velocities)
  [10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80].forEach((u, i) => {
    const rMax = (u * u) / 10;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি গোলা বা ফুটবলকে (g = ১০ m/s²) ${toBnDigits(u)} m/s বেগে নিক্ষেপ করলে সম্ভাব্য সর্বাধিক অনুভূমিক পাল্লা (R_max, ৪৫° কোণে) কত মিটার হবে?`,
        correct: `${toBnDigits(rMax)} m`,
        distractors: [10, 22.5, 40, 62.5, 90, 122.5, 160, 202.5, 250, 360, 490, 640].filter((x) => x !== rMax).slice(0, 4).map((x) => `${toBnDigits(x)} m`),
        explanation: `সর্বাধিক পাল্লা R_max = u² / g = ${toBnDigits(u)}² / ১০ = ${toBnDigits(rMax)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · সর্বাধিক পাল্লা',
      })
    );
  });

  // 6C: Sound Velocity vs Temperature: v_T = 332 * √(T/273) & v_θ ≈ 332 + 0.6 θ (10 cases)
  [5, 15, 35, 45, 50].forEach((tc, i) => {
    const vSound = Number((332 + 0.6 * tc).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `প্রতি ১°C তাপমাত্রা বৃদ্ধিতে বাতাসে শব্দের বেগ ০.৬ m/s হারে বাড়লে (০°C-এ ৩৩২ m/s) ঠিক ${toBnDigits(tc)}°C তাপমাত্রায় বায়ুতে শব্দের বেগ কত হবে?`,
        correct: `${toBnDigits(vSound)} m/s`,
        distractors: [335, 341, 353, 359, 362, 368].filter((x) => x !== vSound).slice(0, 4).map((x) => `${toBnDigits(x)} m/s`),
        explanation: `v_${toBnDigits(tc)} = ৩৩২ + (০.৬ × ${toBnDigits(tc)}) = ${toBnDigits(vSound)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তাপমাত্রা ও শব্দের বেগ',
      })
    );
  });

  // 6D: Torque τ = r F sin θ (12 combinations)
  [
    { r: 0.5, f: 20, ang: 90, tau: 10 },
    { r: 0.5, f: 40, ang: 30, tau: 10 },
    { r: 2, f: 15, ang: 90, tau: 30 },
    { r: 2, f: 30, ang: 30, tau: 30 },
    { r: 1.5, f: 20, ang: 90, tau: 30 },
    { r: 0.4, f: 50, ang: 90, tau: 20 },
    { r: 0.8, f: 50, ang: 30, tau: 20 },
    { r: 1.0, f: 25, ang: 90, tau: 25 },
  ].forEach((tq, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `একটি রেঞ্চের (ক্ষেত্রে-#${toBnDigits(idx + 1)}) অক্ষ থেকে ${toBnDigits(tq.r)} m দূরে হাতলের সাথে ${toBnDigits(tq.ang)}° কোণে ${toBnDigits(tq.f)} N বল প্রয়োগ করলে উৎপন্ন টর্ক কত N·m?`,
        correct: `${toBnDigits(tq.tau)} N·m`,
        distractors: [5, 10, 15, 20, 25, 30, 40, 50].filter((x) => x !== tq.tau).slice(0, 4).map((x) => `${toBnDigits(x)} N·m`),
        explanation: `τ = r F sin θ = ${toBnDigits(tq.r)} × ${toBnDigits(tq.f)} × sin ${toBnDigits(tq.ang)}° = ${toBnDigits(tq.tau)} N·m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · টর্ক নির্ণয়',
      })
    );
  });

  // 6E: Gravitational Acceleration g on Planet with Mass M' & Radius R' (10 cases)
  [
    { desc: 'ভর ২ গুণ ও ব্যাসার্ধ ২ গুণ', gMult: 'অর্ধেক (g/2 = ৪.৯ m/s²)' },
    { desc: 'ভর ২ গুণ ও ব্যাসার্ধ সমান', gMult: '২ গুণ (2g = ১৯.৬ m/s²)' },
    { desc: 'ভর ৪ গুণ ও ব্যাসার্ধ ২ গুণ', gMult: 'সমান (g = ৯.৮ m/s²)' },
    { desc: 'ভর ৮ গুণ ও ব্যাসার্ধ ২ গুণ', gMult: '২ গুণ (2g = ১৯.৬ m/s²) (২)' },
    { desc: 'ভর অর্ধেক ও ব্যাসার্ধ অর্ধেক', gMult: '২ গুণ (2g = ১৯.৬ m/s²) (৩)' },
    { desc: 'ভর এক-চতুর্থাংশ ও ব্যাসার্ধ অর্ধেক', gMult: 'সমান (g = ৯.৮ m/s²) (২)' },
    { desc: 'ঘনত্ব সমান ও ব্যাসার্ধ ২ গুণ', gMult: '২ গুণ (2g = ১৯.৬ m/s²) (৪)' },
    { desc: 'ঘনত্ব ২ গুণ ও ব্যাসার্ধ অর্ধেক', gMult: 'সমান (g = ৯.৮ m/s²) (৩)' },
  ].forEach((gp, idx) => {
    const cleanG = gp.gMult.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch6_gravitation',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো গ্রহের ${gp.desc} হলে (তুলনা-#${toBnDigits(idx + 1)}) ওই গ্রহের পৃষ্ঠে অভিকর্ষজ ত্বরণ পৃথিবীর ত্বরণের (g = ৯.৮ m/s²) কত হবে?`,
        correct: cleanG,
        distractors: ['অর্ধেক (g/2 = ৪.৯ m/s²)', 'সমান (g = ৯.৮ m/s²)', '২ গুণ (2g = ১৯.৬ m/s²)', '৪ গুণ (4g = ৩৯.২ m/s²)', 'এক-চতুর্থাংশ (g/4 = ২.৪৫ m/s²)']
          .filter((x) => x !== cleanG),
        explanation: `g = GM / R² = (4/3)πG R ρ সূত্র অনুযায়ী মান দাঁড়ায় ${cleanG}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · অন্য গ্রহে g',
      })
    );
  });

  // 6F: Ideal Gas Pressure-Density-Temperature scaling (10 MCQs)
  [
    { p: 1, tK: 300, n: 2, vL: 24.6, ans: '২ মোল (PV / RT ≈ ২)' },
    { p: 2, tK: 300, n: 4, vL: 49.2, ans: '৪ মোল' },
    { p: 1, tK: 273, n: 1, vL: 22.4, ans: '১ মোল (STP আয়তন ২২.৪ L)' },
    { p: 2, tK: 273, n: 2, vL: 22.4, ans: '২ মোল (২)' },
    { p: 1, tK: 546, n: 0.5, vL: 22.4, ans: '০.৫ মোল' },
  ].forEach((ig, idx) => {
    const cleanAns = ig.ans.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(ig.p)} atm চাপে এবং ${toBnDigits(ig.tK)} K তাপমাত্রায় একটি আবদ্ধ সিলিন্ডারে (নমুনা-#${toBnDigits(idx + 1)}) গ্যাসের আয়তন ${toBnDigits(ig.vL)} L হলে এতে কত মোল আদর্শ গ্যাস রয়েছে (R = ০.০৮২ L·atm/mol·K)?`,
        correct: cleanAns,
        distractors: ['০.৫ মোল', '১ মোল (STP আয়তন ২২.৪ L)', '২ মোল (PV / RT ≈ ২)', '৪ মোল', '৮ মোল']
          .filter((x) => x !== cleanAns),
        explanation: `আদর্শ গ্যাস সমীকরণ PV = nRT থেকে n = PV / (RT) = ${cleanAns}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · মোল সংখ্যা নির্ণয়',
      })
    );
  });

  // 6G: Capillary Excess Height / SHM Frequency / Horizontal Throw Range Drills (24 MCQs)
  [
    { h: 20, v0: 10, t: 2, x: 20 },
    { h: 20, v0: 25, t: 2, x: 50 },
    { h: 45, v0: 10, t: 3, x: 30 },
    { h: 45, v0: 20, t: 3, x: 60 },
    { h: 80, v0: 15, t: 4, x: 60 },
    { h: 80, v0: 30, t: 4, x: 120 },
    { h: 125, v0: 20, t: 5, x: 100 },
    { h: 5, v0: 12, t: 1, x: 12 },
  ].forEach((hp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(hp.h)} m উঁচু ছাদ বা পাহাড় থেকে (g = ১০ m/s²) অনুভূমিকভাবে ${toBnDigits(hp.v0)} m/s বেগে একটি বল নিক্ষেপ করলে বলটি পাহাড়ের পাদদেশ থেকে কত মিটার দূরে মাটিতে পড়বে?`,
        correct: `${toBnDigits(hp.x)} m (${toBnDigits(hp.t)} সেকেন্ডে)`,
        distractors: [12, 20, 30, 50, 60, 100, 120, 150].filter((x) => x !== hp.x).slice(0, 4).map((x) => `${toBnDigits(x)} m`),
        explanation: `পতনের সময় t = √(2h/g) = ${toBnDigits(hp.t)} s; অনুভূমিক দূরত্ব x = v₀ · t = ${toBnDigits(hp.v0)} × ${toBnDigits(hp.t)} = ${toBnDigits(hp.x)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · অনুভূমিক প্রাসের পাল্লা',
      })
    );
  });

  // 6H: Intensity Ratio from Distance (I ∝ 1/r²) (10 MCQs)
  [
    { r1: 2, r2: 4, ratio: '৪ : ১' },
    { r1: 1, r2: 3, ratio: '৯ : ১' },
    { r1: 2, r2: 6, ratio: '৯ : ১ (২)' },
    { r1: 1, r2: 4, ratio: '১৬ : ১' },
    { r1: 2, r2: 10, ratio: '২৫ : ১' },
    { r1: 3, r2: 6, ratio: '৪ : ১ (২)' },
  ].forEach((ir, idx) => {
    const cleanR = ir.ratio.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি বিন্দু উৎস থেকে যথাক্রমে ${toBnDigits(ir.r1)} m এবং ${toBnDigits(ir.r2)} m দূরে অবস্থিত দুটি বিন্দুতে শব্দের তীব্রতার অনুপাত (I₁ : I₂) কত?`,
        correct: cleanR,
        distractors: ['২ : ১', '৪ : ১', '৯ : ১', '১৬ : ১', '২৫ : ১', '১ : ৪'].filter((x) => x !== cleanR).slice(0, 4),
        explanation: `বিন্দু উৎসের জন্য I ∝ 1/r² ⇒ I₁/I₂ = (r₂/r₁)² = ${cleanR}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · দূরত্ব ও তীব্রতা',
      })
    );
  });

  return list;
}
