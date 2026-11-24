import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredB(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sb_${String(seq++).padStart(4, '0')}`;

  // 1. Transformer Turn Ratio & AC RMS/Peak Conversions (~24 MCQs)
  [
    { vp: 200, np: 100, ns: 500, vs: 1000 },
    { vp: 220, np: 1000, ns: 100, vs: 22 },
    { vp: 100, np: 200, ns: 600, vs: 300 },
    { vp: 440, np: 400, ns: 100, vs: 110 },
    { vp: 240, np: 300, ns: 150, vs: 120 },
  ].forEach((tf) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_5_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি আদর্শ ট্রান্সফরমারের মুখ্য কুণ্ডলীর পাকসংখ্যা ${toBnDigits(tf.np)}, গৌণ কুণ্ডলীর পাকসংখ্যা ${toBnDigits(tf.ns)} এবং মুখ্য ভোল্টেজ ${toBnDigits(tf.vp)} V হলে গৌণ কুণ্ডলীর ভোল্টেজ কত?`,
        correct: `${toBnDigits(tf.vs)} V`,
        distractors: [22, 55, 110, 120, 220, 300, 500, 1000]
          .filter((x) => x !== tf.vs)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `V_s / V_p = N_s / N_p ⇒ V_s = ${toBnDigits(tf.vp)} × (${toBnDigits(tf.ns)}/${toBnDigits(tf.np)}) = ${toBnDigits(tf.vs)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ট্রান্সফরমার',
      })
    );
  });

  // AC Peak to RMS (V0 = V_rms * sqrt(2))
  [
    { v0: '১০০√২ V', vrms: '১০০ V' },
    { v0: '২২০√২ V (≈ ৩১১ V)', vrms: '২২০ V' },
    { v0: '৫০√২ V', vrms: '৫০ V' },
    { v0: '২০০√২ V', vrms: '২০০ V' },
  ].forEach((ac) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_5_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি পরিবর্তী (AC) ভোল্টেজের শীর্ষ মান ${ac.v0} হলে এর কার্যকর বা RMS ভোল্টেজ কত?`,
        correct: ac.vrms,
        distractors: ['৫০ V', '১০০ V', '১৫০ V', '২০০ V', '২২০ V', '৪৪০ V'].filter((x) => x !== ac.vrms),
        explanation: `V_rms = V₀ / √2 = ${ac.v0} / √2 = ${ac.vrms}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · AC-র RMS মান',
      })
    );
  });

  // 2. Lens Power P = 1/f & Combined Lenses P = P1 + P2 (~24 MCQs)
  [
    { fCm: 50, p: '+2.0 D', type: 'উত্তল লেন্স' },
    { fCm: 25, p: '+4.0 D', type: 'উত্তল লেন্স' },
    { fCm: -50, p: '−2.0 D', type: 'অবতল লেন্স' },
    { fCm: -20, p: '−5.0 D', type: 'অবতল লেন্স' },
    { fCm: 100, p: '+1.0 D', type: 'উত্তল লেন্স' },
    { fCm: -25, p: '−4.0 D', type: 'অবতল লেন্স' },
  ].forEach((ln) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(Math.abs(ln.fCm))} cm ফোকাস দূরত্ববিশিষ্ট একটি "${ln.type}"-এর ক্ষমতা কত ডায়প্টার (D)?`,
        correct: ln.p,
        distractors: ['+1.0 D', '+2.0 D', '+4.0 D', '+5.0 D', '−2.0 D', '−4.0 D', '−5.0 D'].filter((x) => x !== ln.p),
        explanation: `P = ১ / f(m) = ১০০ / (${toBnDigits(ln.fCm)}) = ${ln.p}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · লেন্সের ক্ষমতা',
      })
    );
  });

  [
    { p1: '+5 D', p2: '−2 D', peq: '+3 D', fEq: '+৩৩.৩ cm (উত্তল)' },
    { p1: '+4 D', p2: '+1 D', peq: '+5 D', fEq: '+২০ cm (উত্তল)' },
    { p1: '+2 D', p2: '−4 D', peq: '−2 D', fEq: '−৫০ cm (অবতল)' },
    { p1: '+3 D', p2: '−3 D', peq: '০ D', fEq: 'অসীম (সমতল কাচ)' },
  ].forEach((cl) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${cl.p1} ও ${cl.p2} ক্ষমতার দুটি পাতলা লেন্সকে পরস্পরের সংস্পর্শে রাখলে তুল্য ক্ষমতা ও কার্যকর ফোকাস দূরত্ব কত?`,
        correct: `${cl.peq} এবং ${cl.fEq}`,
        distractors: [
          '+3 D এবং +৩৩.৩ cm (উত্তল)',
          '+5 D এবং +২০ cm (উত্তল)',
          '−2 D এবং −৫০ cm (অবতল)',
          '০ D এবং অসীম (সমতল কাচ)',
          '+7 D এবং +১৪.৩ cm (উত্তল)',
        ].filter((x) => x !== `${cl.peq} এবং ${cl.fEq}`),
        explanation: `তুল্য ক্ষমতা P = P₁ + P₂ = ${cl.peq}; ফোকাস f = ১০০/P = ${cl.fEq}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · লেন্সের সমবায়',
      })
    );
  });

  // 3. Refractive Index, Speed of Light in Medium & Critical Angle (~20 MCQs)
  [
    { med: 'হীরক (μ ≈ ২.৪)', mu: '২.৪', speed: '১.২৫ × ১০⁸ m/s' },
    { med: 'কাচ (μ = ১.৫)', mu: '১.৫', speed: '২.০ × ১০⁸ m/s' },
    { med: 'পানি (μ = ১.৩৩)', mu: '১.৩৩ (৪/৩)', speed: '২.২৫ × ১০⁸ m/s' },
    { med: 'গ্লিসারিন (μ = ১.৪৭)', mu: '১.৪৭', speed: '২.০৪ × ১০⁸ m/s' },
  ].forEach((rm, i) => {
    const others = [
      { med: 'হীরক (μ ≈ ২.৪)', mu: '২.৪', speed: '১.২৫ × ১০⁸ m/s' },
      { med: 'কাচ (μ = ১.৫)', mu: '১.৫', speed: '২.০ × ১০⁸ m/s' },
      { med: 'পানি (μ = ১.৩৩)', mu: '১.৩৩ (৪/৩)', speed: '২.২৫ × ১০⁸ m/s' },
      { med: 'গ্লিসারিন (μ = ১.৪৭)', mu: '১.৪৭', speed: '২.০৪ × ১০⁸ m/s' },
    ].filter((x) => x.med !== rm.med);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `শূন্যস্থানে আলোর বেগ ৩ × ১০⁸ m/s হলে "${rm.med}" মাধ্যমে আলোর বেগ কত?`,
        correct: rm.speed,
        distractors: others.map((x) => x.speed),
        explanation: `v = c / μ = (৩ × ১০⁸) / (${rm.mu}) = ${rm.speed}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · মাধ্যমে আলোর বেগ',
      })
    );
  });

  // Critical Angle sin(c) = 1/μ
  [
    { mu: '√2 (প্রায় ১.৪১৪)', deg: '৪৫°' },
    { mu: '২', deg: '৩০°' },
    { mu: '২ / √3 (প্রায় ১.১৫৫)', deg: '৬০°' },
    { mu: '১.৫ (সাধারণ কাচ)', deg: 'প্রায় ৪১.৮° (৪২°)' },
  ].forEach((ca) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `শূন্যস্থানের সাপেক্ষে কোনো স্বচ্ছ মাধ্যমের প্রতিসরণাঙ্ক ${ca.mu} হলে ঐ মাধ্যমের সংকট কোণ (Critical Angle) কত?`,
        correct: ca.deg,
        distractors: ['৩০°', '৪৫°', '৬০°', 'প্রায় ৪১.৮° (৪২°)', '৯০°'].filter((x) => x !== ca.deg),
        explanation: `sin θ_c = ১ / μ ⇒ θ_c = arcsin(১ / ${ca.mu}) = ${ca.deg}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · সংকট কোণ',
      })
    );
  });

  // 4. Radioactive Half-Life & Remaining Fraction Calculations (~28 MCQs)
  const halfLifeCases = [
    { half: '১০ দিন', elapsed: '৩০ দিন', n: 3, rem: '১২.৫% (১/৮ অংশ)', decayed: '৮৭.৫% (৭/৮ অংশ)' },
    { half: '৫ ঘণ্টা', elapsed: '২০ ঘণ্টা', n: 4, rem: '৬.২৫% (১/১৬ অংশ)', decayed: '৯৩.৭৫% (১৫/১৬ অংশ)' },
    { half: '৮ দিন (I-131)', elapsed: '১৬ দিন', n: 2, rem: '২৫% (১/৪ অংশ)', decayed: '৭৫% (৩/৪ অংশ)' },
    { half: '১৬০০ বছর (Ra-226)', elapsed: '৪৮০০ বছর', n: 3, rem: '১২.৫% (১/৮ অংশ) (Ra)', decayed: '৮৭.৫% (৭/৮ অংশ) (Ra)' },
    { half: '২০ মিনিট', elapsed: '১০০ মিনিট', n: 5, rem: '৩.১২৫% (১/৩২ অংশ)', decayed: '৯৬.৮৭৫% (৩১/৩২ অংশ)' },
  ];
  halfLifeCases.forEach((hl) => {
    const cleanRem = hl.rem.replace(' (Ra)', '');
    const cleanDec = hl.decayed.replace(' (Ra)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_10_nuclear_semi',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি তেজস্ক্রিয় মৌলের অর্ধায়ু ${hl.half} হলে ${hl.elapsed} পর মৌলটির কত অংশ অক্ষত (অবশিষ্ট) থাকবে?`,
        correct: cleanRem,
        distractors: ['৫০% (১/২ অংশ)', '২৫% (১/৪ অংশ)', '১২.৫% (১/৮ অংশ)', '৬.২৫% (১/১৬ অংশ)', '৩.১২৫% (১/৩২ অংশ)'].filter(
          (x) => x !== cleanRem
        ),
        explanation: `অর্ধায়ু সংখ্যা n = ${toBnDigits(hl.n)}; অবশিষ্ট অংশ = (১/২)^${toBnDigits(hl.n)} = ${cleanRem}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · তেজস্ক্রিয় অর্ধায়ু',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_10_nuclear_semi',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `যদি কোনো তেজস্ক্রিয় নমুনার অর্ধায়ু ${hl.half} হয়, তবে ${hl.elapsed} সময়ে নমুনাটির কত শতাংশ ক্ষয়প্রাপ্ত হবে?`,
        correct: cleanDec,
        distractors: ['৫০% (১/২ অংশ)', '৭৫% (৩/৪ অংশ)', '৮৭.৫% (৭/৮ অংশ)', '৯৩.৭৫% (১৫/১৬ অংশ)', '৯৬.৮৭৫% (৩১/৩২ অংশ)'].filter(
          (x) => x !== cleanDec
        ),
        explanation: `ক্ষয়প্রাপ্ত অংশ = ১ − (১/২)^${toBnDigits(hl.n)} = ${cleanDec}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · তেজস্ক্রিয় ক্ষয়',
      })
    );
  });

  // Photoelectric Effect K_max = E_photon - phi
  [
    { hnu: 5.0, phi: 2.0, kmax: 3.0 },
    { hnu: 4.5, phi: 2.3, kmax: 2.2 },
    { hnu: 6.2, phi: 2.2, kmax: 4.0 },
    { hnu: 3.8, phi: 1.8, kmax: 2.0 },
    { hnu: 7.5, phi: 4.5, kmax: 3.0 },
  ].forEach((pe, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_elec_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি ধাতব পাতের (ধাতু-#${toBnDigits(idx + 1)}) কার্য অপেক্ষক (Work function) ${toBnDigits(pe.phi)} eV; এর ওপর ${toBnDigits(pe.hnu)} eV শক্তির ফোটন পড়লে নিঃসৃত ইলেকট্রনের সর্বোচ্চ গতিশক্তি কত eV?`,
        correct: `${toBnDigits(pe.kmax)} eV`,
        distractors: [1.5, 2.0, 2.2, 3.0, 3.5, 4.0, 5.0]
          .filter((x) => x !== pe.kmax)
          .map((x) => `${toBnDigits(x)} eV`),
        explanation: `আইনস্টাইনের ফটোতড়িৎ সমীকরণ K_max = hν − φ₀ = ${toBnDigits(pe.hnu)} − ${toBnDigits(pe.phi)} = ${toBnDigits(pe.kmax)} eV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ফটোইলেকট্রিক ক্রিয়া',
      })
    );
  });

  // 5. Transistor α <-> β & Binary/Decimal Conversions + Logic Gates (~44 MCQs)
  [
    { alpha: '০.৯৮', beta: '৪৯' },
    { alpha: '০.৯৯', beta: '৯৯' },
    { alpha: '০.৯৫', beta: '১৯' },
    { alpha: '০.৯৬', beta: '২৪' },
    { alpha: '০.৯০', beta: '৯' },
  ].forEach((tr) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_10_nuclear_semi',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি ট্রানজিস্টরের সাধারণ পীঠ প্রবাহ লাভ α = ${tr.alpha} হলে সাধারণ নিঃসারক প্রবাহ লাভ β কত হবে?`,
        correct: tr.beta,
        distractors: ['৯', '১৯', '২৪', '৪৯', '৯৯', '১০০'].filter((x) => x !== tr.beta),
        explanation: `β = α / (1 − α) = ${tr.alpha} / (১ − ${tr.alpha}) = ${tr.beta}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · ট্রানজিস্টর গুণাঙ্ক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_10_nuclear_semi',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি ট্রানজিস্টরের কারেন্ট গেইন β = ${tr.beta} হলে α-এর মান কত?`,
        correct: tr.alpha,
        distractors: ['০.৯০', '০.৯৫', '০.৯৬', '০.৯৮', '০.৯৯', '০.৮৫'].filter((x) => x !== tr.alpha),
        explanation: `α = β / (1 + β) = ${tr.beta} / (${tr.beta} + ১) = ${tr.alpha}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · α ও β সম্পর্ক',
      })
    );
  });

  // Binary <-> Decimal Conversions
  [
    { dec: 13, bin: '1101' },
    { dec: 25, bin: '11001' },
    { dec: 42, bin: '101010' },
    { dec: 19, bin: '10011' },
    { dec: 37, bin: '100101' },
    { dec: 53, bin: '110101' },
    { dec: 15, bin: '1111' },
  ].forEach((bn) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_10_nuclear_semi',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `দশমিক সংখ্যা (${toBnDigits(bn.dec)})₁₀-এর বাইনারি রূপ কত?`,
        correct: `(${bn.bin})₂`,
        distractors: ['(1101)₂', '(11001)₂', '(101010)₂', '(10011)₂', '(100101)₂', '(110101)₂', '(1111)₂'].filter(
          (x) => x !== `(${bn.bin})₂`
        ),
        explanation: `${toBnDigits(bn.dec)}-কে ক্রমাগত ২ দিয়ে ভাগ করলে বাইনারি মান পাওয়া যায় (${bn.bin})₂।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · বাইনারি সংখ্যা',
      })
    );
  });

  // Logic Gate Output Matrix
  const gateChecks = [
    { gate: '২-ইনপুট NAND গেট', a: 1, b: 1, out: 0 },
    { gate: '২-ইনপুট NAND গেট (ভিন্ন ইনপুট)', a: 1, b: 0, out: 1 },
    { gate: '২-ইনপুট NOR গেট', a: 0, b: 0, out: 1 },
    { gate: '২-ইনপুট XOR গেট (ভিন্ন ইনপুট)', a: 1, b: 0, out: 1 },
    { gate: '২-ইনপুট XOR গেট (অভিন্ন ইনপুট)', a: 1, b: 1, out: 0 },
    { gate: '২-ইনপুট XNOR গেট (অভিন্ন ইনপুট)', a: 1, b: 1, out: 1 },
  ];
  gateChecks.forEach((gc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_10_nuclear_semi',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি ${gc.gate}-এর ইনপুট A = ${toBnDigits(gc.a)} এবং B = ${toBnDigits(gc.b)} হলে আউটপুট Y কত হবে?`,
        correct: `${toBnDigits(gc.out)}`,
        distractors: [gc.out === 1 ? '০' : '১', 'উচ্চ ইম্পিড্যান্স (Z)', 'অনির্ণেয়'],
        explanation: `${gc.gate}-এর সত্যক সারণি অনুযায়ী (${toBnDigits(gc.a)}, ${toBnDigits(gc.b)}) ইনপুটে আউটপুট ${toBnDigits(gc.out)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · লজিক গেট',
      })
    );
  });

  return list;
}
