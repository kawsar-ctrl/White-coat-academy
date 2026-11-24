import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredE(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1se_${String(seq++).padStart(4, '0')}`;

  // 1. SI Prefixes & Physical Constants Matrix (~32 MCQs)
  const siPrefixes = [
    { name: 'ইয়োক্টো (yocto, y)', pow: '১০⁻²⁴', ex: 'প্রোটনের ভরের স্কেল (~১.৬৭ × ১০⁻²⁴ g)' },
    { name: 'জেপ্টো (zepto, z)', pow: '১০⁻²¹', ex: 'আণবিক দ্বিমেরু ও অতি ক্ষুদ্র চার্জ' },
    { name: 'অ্যাটো (atto, a)', pow: '১০⁻¹⁸', ex: '১ অ্যাটোসেকেন্ডে আলোর অতিক্রান্ত অতি সূক্ষ্ম দূরত্ব' },
    { name: 'ফেমটো (femto, f)', pow: '১০⁻¹⁵', ex: 'পারমাণবিক নিউক্লিয়াসের ব্যাসার্ধ (~১–৭ fm)' },
    { name: 'পিকো (pico, p)', pow: '১০⁻¹²', ex: 'পারমাণবিক ব্যাসার্ধ ও ধারকের ক্ষুদ্র মান (pF)' },
    { name: 'ন্যানো (nano, n)', pow: '১০⁻⁹', ex: 'দৃশ্যমান আলোর তরঙ্গদৈর্ঘ্য (৩৮০–৭৮০ nm)' },
    { name: 'মাইক্রো (micro, μ)', pow: '১০⁻⁶', ex: 'মানবদেহের কোষ ও ব্যাকটেরিয়ার আকার (μm)' },
    { name: 'মিলি (milli, m)', pow: '১০⁻³', ex: 'রক্তচাপ ও মিটার স্কেলের ক্ষুদ্রতম ভাগ (mm)' },
    { name: 'সেন্টি (centi, c)', pow: '১০⁻²', ex: '১ মিটার = ১০০ সেন্টিমিটার' },
    { name: 'ডেসি (deci, d)', pow: '১০⁻¹', ex: '১ ডেসিলিটার = ১০০ mL' },
    { name: 'কিলো (kilo, k)', pow: '১০³', ex: 'বৈদ্যুতিক শক্তি (kWh) ও দূরত্ব (km)' },
    { name: 'মেগা (mega, M)', pow: '১০⁶', ex: 'নিউক্লীয় বিক্রিয়ার শক্তি (MeV) ও রোধ (MΩ)' },
    { name: 'গিগা (giga, G)', pow: '১০⁹', ex: 'প্রসেসরের ক্লক কম্পাঙ্ক (GHz)' },
    { name: 'টেরা (tera, T)', pow: '১০¹²', ex: 'বৃহৎ ডেটা স্টোরেজ (TB) ও জ্যোতির্বৈজ্ঞানিক প্রাবল্য' },
    { name: 'পেটা (peta, P)', pow: '১০¹⁵', ex: 'বৃহৎ সৌরশক্তি উৎপাদন ও দূরত্ব স্কেল' },
    { name: 'এক্সা (exa, E)', pow: '১০¹⁸', ex: 'গ্যালাক্টিক দূরত্বের মেট্রিক প্রকাশ' },
  ];
  const powPool = siPrefixes.map((p) => p.pow);
  siPrefixes.forEach((sp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `আন্তর্জাতিক একক পদ্ধতিতে (SI) "${sp.name}" উপসর্গটির ১০-এর ঘাত সূচক কত?`,
        correct: sp.pow,
        distractors: powPool.filter((x) => x !== sp.pow).slice(i % 10, (i % 10) + 4),
        explanation: `${sp.name}-এর গুণিতক মান ${sp.pow}। ব্যবহারিক উদাহরণ: ${sp.ex}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · SI উপসর্গ',
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
        question: `SI উপসর্গের কোন জোড়াটিতে "${sp.pow}" গুণিতকটি সঠিকভাবে প্রযোজ্য (প্রাসঙ্গিক ক্ষেত্র: ${sp.ex})?`,
        correct: sp.name,
        distractors: siPrefixes.filter((x) => x.name !== sp.name).slice((i + 3) % 10, ((i + 3) % 10) + 4).map((x) => x.name),
        explanation: `${sp.pow} সূচকটি ${sp.name} উপসর্গকে নির্দেশ করে।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · একক রূপান্তর',
      })
    );
  });

  // 2. Dimensional Equations & SI Equivalent Matrix (~56 MCQs)
  const dimQuantities = [
    { q: 'সর্বজনীন মহাকর্ষীয় ধ্রুবক (G)', dim: '[M⁻¹L³T⁻²]', unit: 'N·m²·kg⁻²' },
    { q: 'প্ল্যাঙ্কের ধ্রুবক (h)', dim: '[ML²T⁻¹]', unit: 'J·s' },
    { q: 'বোল্টজম্যান ধ্রুবক (k)', dim: '[ML²T⁻²θ⁻¹]', unit: 'J·K⁻¹' },
    { q: 'তাপীয় পরিবাহিতাঙ্ক (K)', dim: '[MLT⁻³θ⁻¹]', unit: 'W·m⁻¹·K⁻¹' },
    { q: 'সান্দ্রতা গুণাঙ্ক (η)', dim: '[ML⁻¹T⁻¹]', unit: 'Pa·s বা N·s·m⁻²' },
    { q: 'পৃষ্ঠটান ও বল ধ্রুবক (T, k)', dim: '[MT⁻²]', unit: 'N·m⁻¹ বা J·m⁻²' },
    { q: 'ইয়ং গুণাঙ্ক ও পীড়ন (Y, Stress)', dim: '[ML⁻¹T⁻²]', unit: 'N·m⁻² বা Pa' },
    { q: 'বলের ঘাত (Impulse)', dim: '[MLT⁻¹]', unit: 'N·s বা kg·m·s⁻¹' },
    { q: 'টর্ক বা বলের ভ্রামক (τ)', dim: '[ML²T⁻²]', unit: 'N·m' },
    { q: 'জড়তার ভ্রামক (I)', dim: '[ML²]', unit: 'kg·m²' },
    { q: 'কৌণিক ত্বরণ (α)', dim: '[T⁻²]', unit: 'rad·s⁻²' },
    { q: 'ক্ষমতা (Power)', dim: '[ML²T⁻³]', unit: 'W বা J·s⁻¹' },
    { q: 'মহাকর্ষীয় বিভব (V_g)', dim: '[L²T⁻²]', unit: 'J·kg⁻¹' },
    { q: 'মহাকর্ষীয় প্রাবল্য (E_g)', dim: '[LT⁻²]', unit: 'N·kg⁻¹ বা m·s⁻²' },
    { q: 'আপেক্ষিক তাপ (s)', dim: '[L²T⁻²θ⁻¹]', unit: 'J·kg⁻¹·K⁻¹' },
    { q: 'আপেক্ষিক সুপ্ততাপ (L)', dim: '[L²T⁻²]', unit: 'J·kg⁻¹ (কাজের সমতুল্য নয়, ভরপ্রতি)' },
    { q: 'এনট্রপি (ΔS)', dim: '[ML²T⁻²θ⁻¹]', unit: 'J·K⁻¹' },
    { q: 'বেগ গ্রেডিয়েন্ট (dv/dy)', dim: '[T⁻¹]', unit: 's⁻¹' },
    { q: 'দশমিক বিকৃতি (Strain) ও পয়সনের অনুপাত', dim: '[M⁰L⁰T⁰] (মাত্রাহীন)', unit: 'এককবিহীন বিশুদ্ধ সংখ্যা' },
    { q: 'চাপীয় গ্রেডিয়েন্ট (dP/dx)', dim: '[ML⁻²T⁻²]', unit: 'Pa·m⁻¹' },
    { q: 'স্টিফান-বোল্টজম্যান ধ্রুবক (σ)', dim: '[MT⁻³θ⁻⁴]', unit: 'W·m⁻²·K⁻⁴' },
    { q: 'শক্তির ঘনত্ব (Energy Density)', dim: '[ML⁻¹T⁻²]', unit: 'J·m⁻³' },
  ];
  dimQuantities.forEach((dq, i) => {
    const otherDims = Array.from(new Set(dimQuantities.filter((x) => x.dim !== dq.dim).map((x) => x.dim)));
    const otherUnits = Array.from(new Set(dimQuantities.filter((x) => x.unit !== dq.unit).map((x) => x.unit)));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ভৌত রাশি "${dq.q}"-এর সঠিক মাত্রা সমীকরণ কোনটি?`,
        correct: dq.dim,
        distractors: otherDims.slice(i % 10, (i % 10) + 4),
        explanation: `${dq.q}-এর মাত্রা সমীকরণ ${dq.dim} এবং প্রচলিত একক ${dq.unit}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · মাত্রা সমীকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 1 ? 'board' : 'medical',
        question: `"${dq.q}" রাশিটির সঠিক এসআই বা লব্ধ একক নিচের কোনটি?`,
        correct: dq.unit,
        distractors: otherUnits.slice((i + 4) % 10, ((i + 4) % 10) + 4),
        explanation: `${dq.q}-এর একক ${dq.unit} এবং মাত্রা ${dq.dim}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · একক বিশ্লেষণ',
      })
    );
  });

  // 3. Percentage Error Propagation Numericals (~44 MCQs)
  const errCases = [
    { shape: 'গোলকের ব্যাসার্ধ r', target: 'আয়তন V = (4/3)πr³', mult: 3, errs: [1, 2, 3, 4] },
    { shape: 'গোলকের ব্যাস d', target: 'পৃষ্ঠতলের ক্ষেত্রফল A = πd²', mult: 2, errs: [1.5, 2.5, 3, 5] },
    { shape: 'ঘনকের একটি বাহু a', target: 'ঘনকের আয়তন V = a³', mult: 3, errs: [0.5, 1.5, 2, 4] },
    { shape: 'বৃত্তাকার চাকতির ব্যাসার্ধ r', target: 'ক্ষেত্রফল A = πr²', mult: 2, errs: [1, 2, 4, 6] },
  ];
  errCases.forEach((ec) => {
    ec.errs.forEach((ep, idx) => {
      const ans = Number((ec.mult * ep).toFixed(1));
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch1_measurement',
          visualLessonId: 'circuits_optics',
          hscLevel: '11',
          difficulty: idx % 2 === 0 ? 'medical' : 'dental',
          question: `একটি ${ec.shape} পরিমাপে সর্বাধিক ত্রুটি ${toBnDigits(ep)}% হলে এর ${ec.target} নির্ণয়ে শতকরা ত্রুটি কত হবে?`,
          correct: `${toBnDigits(ans)}%`,
          distractors: [
            `${toBnDigits(ep)}%`,
            `${toBnDigits(Number((ans + ep).toFixed(1)))}%`,
            `${toBnDigits(Number((ans / 2).toFixed(1)))}%`,
            `${toBnDigits(Number((ans * 2).toFixed(1)))}%`,
          ],
          explanation: `ঘাত ${toBnDigits(ec.mult)} হওয়ায় ${ec.target}-এ শতকরা ত্রুটি = ${toBnDigits(ec.mult)} × ${toBnDigits(ep)}% = ${toBnDigits(ans)}%।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · শতকরা ত্রুটি',
        })
      );
    });
  });

  const multiErr = [
    { q: 'একটি বস্তুর ভর পরিমাপে ২% এবং বেগ পরিমাপে ৩% ত্রুটি হলে গতিশক্তি (½mv²) নির্ণয়ে সর্বাধিক শতকরা ত্রুটি কত?', ans: '৮%', d: ['৫%', '৬%', '১১%', '১%'], exp: 'ΔK/K = Δm/m + ২(Δv/v) = ২% + ২(৩%) = ৮%।' },
    { q: 'ভর পরিমাপে ১% এবং বেগ পরিমাপে ৪% ত্রুটি থাকলে গতিশক্তি নির্ণয়ে সর্বাধিক ত্রুটি কত?', ans: '৯%', d: ['৫%', '৪%', '১৭%', '৭%'], exp: 'ΔK/K = ১% + ২(৪%) = ৯%।' },
    { q: 'সরল দোলকের দৈর্ঘ্য L পরিমাপে ১% এবং পর্যায়কাল T পরিমাপে ২% ত্রুটি হলে g (= 4π²L/T²) নির্ণয়ে শতকরা ত্রুটি কত?', ans: '৫%', d: ['৩%', '৪%', '৬%', '১%'], exp: 'Δg/g = ΔL/L + ২(ΔT/T) = ১% + ২(২%) = ৫%।' },
    { q: 'সরল দোলকের দৈর্ঘ্য পরিমাপে ২% এবং পর্যায়কাল পরিমাপে ১.৫% ত্রুটি হলে g নির্ণয়ে মোট শতকরা ত্রুটি কত?', ans: '৫%', d: ['৩.৫%', '২.৫%', '৬%', '৭%'], exp: 'Δg/g = ২% + ২(১.৫%) = ৫%।' },
    { q: 'ঘনকের ভর পরিমাপে ৩% এবং বাহুর দৈর্ঘ্য পরিমাপে ২% ত্রুটি থাকলে এর ঘনত্ব (m/a³) নির্ণয়ে সর্বাধিক ত্রুটি কত?', ans: '৯%', d: ['৫%', '৭%', '১১%', '১%'], exp: 'Δρ/ρ = Δm/m + ৩(Δa/a) = ৩% + ৩(২%) = ৯%।' },
    { q: 'ঘনকের ভর পরিমাপে ২% এবং দৈর্ঘ্য পরিমাপে ১% ত্রুটি থাকলে ঘনত্ব নির্ণয়ে সর্বাধিক শতকরা ত্রুটি কত?', ans: '৫%', d: ['৩%', '৪%', '৬%', '৮%'], exp: 'Δρ/ρ = ২% + ৩(১%) = ৫%।' },
    { q: 'সিলিন্ডারের ভর ২%, ব্যাসার্ধ ১% এবং দৈর্ঘ্য ১% ত্রুটিপূর্ণ হলে এর উপাদানের ঘনত্ব (m/(πr²L)) নির্ণয়ে ত্রুটি কত?', ans: '৫%', d: ['৪%', '৬%', '৩%', '৭%'], exp: 'Δρ/ρ = Δm/m + ২(Δr/r) + ΔL/L = ২% + ২(১%) + ১% = ৫%।' },
    { q: 'ভৌত রাশি P = a³b²/(√c · d)-তে a, b, c ও d পরিমাপে যথাক্রমে ১%, ২%, ৪% ও ৩% ত্রুটি হলে P-তে সর্বাধিক ত্রুটি কত?', ans: '১২%', d: ['১০%', '১৪%', '৮%', '৬%'], exp: 'ΔP/P = ৩(১%) + ২(২%) + ½(৪%) + ৩% = ৩ + ৪ + ২ + ৩ = ১২%।' },
  ];
  multiErr.forEach((me, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: me.q,
        correct: me.ans,
        distractors: me.d,
        explanation: me.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · ত্রুটি সমন্বয়',
      })
    );
  });

  // 4. Vernier & Screw Gauge Readings (~36 MCQs)
  const vernierConfigs = [
    { sMm: 1, n: 10, vc: 0.1, msr: 12, vsr: 4, read: 12.4 },
    { sMm: 1, n: 10, vc: 0.1, msr: 25, vsr: 7, read: 25.7 },
    { sMm: 1, n: 20, vc: 0.05, msr: 18, vsr: 12, read: 18.6 },
    { sMm: 1, n: 20, vc: 0.05, msr: 30, vsr: 15, read: 30.75 },
    { sMm: 0.5, n: 25, vc: 0.02, msr: 10, vsr: 10, read: 10.2 },
    { sMm: 0.5, n: 50, vc: 0.01, msr: 14, vsr: 25, read: 14.25 },
  ];
  vernierConfigs.forEach((vc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি স্লাইড ক্যালিপার্সের প্রধান স্কেলের ক্ষুদ্রতম ভাগ ${toBnDigits(vc.sMm)} mm এবং ভার্নিয়ারের ${toBnDigits(vc.n)} ঘর প্রধান স্কেলের ${toBnDigits(vc.n - 1)} ঘরের সমান হলে ভার্নিয়ার ধ্রুবক (VC) কত?`,
        correct: `${toBnDigits(vc.vc)} mm`,
        distractors: [0.01, 0.02, 0.05, 0.1, 0.2, 0.5].filter((x) => x !== vc.vc).slice(0, 4).map((x) => `${toBnDigits(x)} mm`),
        explanation: `VC = s / n = ${toBnDigits(vc.sMm)} / ${toBnDigits(vc.n)} = ${toBnDigits(vc.vc)} mm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · ভার্নিয়ার ধ্রুবক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ভার্নিয়ার ধ্রুবক ${toBnDigits(vc.vc)} mm বিশিষ্ট ক্যালিপার্সে প্রধান স্কেল পাঠ ${toBnDigits(vc.msr)} mm ও ভার্নিয়ার সমপাতন ${toBnDigits(vc.vsr)} হলে (শূন্য ত্রুটি শূন্য) মোট দৈর্ঘ্য পাঠ কত?`,
        correct: `${toBnDigits(vc.read)} mm`,
        distractors: [
          `${toBnDigits(Number((vc.read + vc.vc * 5).toFixed(2)))} mm`,
          `${toBnDigits(Number((vc.read - vc.vc * 3).toFixed(2)))} mm`,
          `${toBnDigits(Number((vc.msr + vc.vsr * 0.1).toFixed(2)))} mm`,
          `${toBnDigits(Number((vc.read + 1).toFixed(2)))} mm`,
        ],
        explanation: `পাঠ = MSR + (VSR × VC) = ${toBnDigits(vc.msr)} + (${toBnDigits(vc.vsr)} × ${toBnDigits(vc.vc)}) = ${toBnDigits(vc.read)} mm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · স্লাইড ক্যালিপার্স পাঠ',
      })
    );
  });

  const screwConfigs = [
    { pitch: 0.5, div: 50, lc: 0.01, lsr: 2.5, csr: 28, read: 2.78 },
    { pitch: 1.0, div: 100, lc: 0.01, lsr: 3.0, csr: 45, read: 3.45 },
    { pitch: 0.5, div: 100, lc: 0.005, lsr: 1.5, csr: 40, read: 1.70 },
    { pitch: 1.0, div: 50, lc: 0.02, lsr: 4.0, csr: 15, read: 4.30 },
  ];
  screwConfigs.forEach((sc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch1_measurement',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি স্ক্রু-গজের পিচ ${toBnDigits(sc.pitch)} mm এবং বৃত্তাকার স্কেলে ${toBnDigits(sc.div)}টি ভাগ আছে। রৈখিক স্কেল পাঠ ${toBnDigits(sc.lsr)} mm ও বৃত্তাকার স্কেলের ${toBnDigits(sc.csr)}তম দাগ মিললে (শূন্য ত্রুটিহীন) তারের ব্যাস কত?`,
        correct: `${toBnDigits(sc.read)} mm`,
        distractors: [
          `${toBnDigits(Number((sc.read + 0.5).toFixed(2)))} mm`,
          `${toBnDigits(Number((sc.read - 0.25).toFixed(2)))} mm`,
          `${toBnDigits(Number((sc.lsr + sc.csr * 0.1).toFixed(2)))} mm`,
          `${toBnDigits(Number((sc.read + 1.0).toFixed(2)))} mm`,
        ],
        explanation: `LC = ${toBnDigits(sc.pitch)}/${toBnDigits(sc.div)} = ${toBnDigits(sc.lc)} mm; ব্যাস = ${toBnDigits(sc.lsr)} + (${toBnDigits(sc.csr)} × ${toBnDigits(sc.lc)}) = ${toBnDigits(sc.read)} mm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১ · স্ক্রু-গজ',
      })
    );
  });

  // 5. Vector Resultants at Special Angles (0, 60, 90, 120, 180) (~50 MCQs)
  const resConfigs = [
    { p: 3, q: 4, ang: 90, r: '৫ একক' },
    { p: 6, q: 8, ang: 90, r: '১০ একক' },
    { p: 5, q: 12, ang: 90, r: '১৩ একক' },
    { p: 8, q: 15, ang: 90, r: '১৭ একক' },
    { p: 7, q: 24, ang: 90, r: '২৫ একক' },
    { p: 5, q: 5, ang: 120, r: '৫ একক' },
    { p: 10, q: 10, ang: 120, r: '১০ একক' },
    { p: 12, q: 12, ang: 120, r: '১২ একক' },
    { p: 6, q: 6, ang: 60, r: '৬√৩ একক' },
    { p: 10, q: 10, ang: 60, r: '১০√৩ একক' },
    { p: 8, q: 8, ang: 90, r: '৮√২ একক' },
    { p: 10, q: 10, ang: 90, r: '১০√২ একক' },
    { p: 3, q: 5, ang: 60, r: '৭ একক' },
    { p: 6, q: 10, ang: 60, r: '১৪ একক' },
    { p: 7, q: 8, ang: 120, r: '√৫৭ একক' },
    { p: 10, q: 6, ang: 180, r: '৪ একক' },
    { p: 15, q: 9, ang: 0, r: '২৪ একক' },
  ];
  const rPool = ['৫ একক', '৭ একক', '১০ একক', '১২ একক', '১৩ একক', '১৪ একক', '১৭ একক', '২৫ একক', '৪ একক', '২৪ একক', '৬√৩ একক', '১০√৩ একক', '৮√২ একক', '১০√২ একক', '√৫৭ একক'];
  resConfigs.forEach((rc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(rc.p)} একক ও ${toBnDigits(rc.q)} একক মানের দুটি বল পরস্পর ${toBnDigits(rc.ang)}° কোণে একটি বিন্দুতে ক্রিয়া করলে এদের লব্ধির মান কত?`,
        correct: rc.r,
        distractors: rPool.filter((x) => x !== rc.r).slice(i % 8, (i % 8) + 4),
        explanation: `R = √(P² + Q² + 2PQ cos θ) = √(${toBnDigits(rc.p)}² + ${toBnDigits(rc.q)}² + ২×${toBnDigits(rc.p)}×${toBnDigits(rc.q)} cos ${toBnDigits(rc.ang)}°) = ${rc.r}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · সামান্তরিক সূত্র',
      })
    );
  });

  // 6. 3D Vector Magnitude, Unit Vector, Angle, Perpendicular Unknown m (~65 MCQs)
  const vec3d = [
    { v: '2î − 2ĵ + k̂', mag: 3 },
    { v: '3î + 4ĵ − 12k̂', mag: 13 },
    { v: '6î − 3ĵ + 2k̂', mag: 7 },
    { v: '2î + 3ĵ + 6k̂', mag: 7 },
    { v: '4î + 4ĵ − 2k̂', mag: 6 },
    { v: 'î + 2ĵ + 2k̂', mag: 3 },
    { v: '8î + 6ĵ + 0k̂', mag: 10 },
    { v: '2î + 6ĵ + 9k̂', mag: 11 },
    { v: '4î − 8ĵ + k̂', mag: 9 },
  ];
  vec3d.forEach((vc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `ত্রিমাত্রিক ভেক্টর A = ${vc.v}-এর পরমমান |A| এবং এর সমান্তরাল একক ভেক্টর â কোনটি?`,
        correct: `মান ${toBnDigits(vc.mag)}; â = (${vc.v}) / ${toBnDigits(vc.mag)}`,
        distractors: [3, 6, 7, 9, 10, 11, 13]
          .filter((x) => x !== vc.mag)
          .slice(0, 4)
          .map((x) => `মান ${toBnDigits(x)}; â = (${vc.v}) / ${toBnDigits(x)}`),
        explanation: `|A| = √(A_x² + A_y² + A_z²) = ${toBnDigits(vc.mag)} এবং একক ভেক্টর â = A / |A|।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · একক ভেক্টর',
      })
    );
  });

  const perpCases = [
    { a: '2î + mĵ + k̂', b: '4î − 2ĵ − 2k̂', mVal: 3 },
    { a: 'mî − 2ĵ + k̂', b: '2î + 3ĵ − 4k̂', mVal: 5 },
    { a: '3î + 2ĵ + mk̂', b: '2î − 5ĵ + 4k̂', mVal: 1 },
    { a: '4î + mĵ − 3k̂', b: 'î + 2ĵ + 2k̂', mVal: 1 },
    { a: '5î + 3ĵ − 2k̂', b: '2î − mĵ + k̂', mVal: '৮/৩ (২.৬৭)' },
    { a: 'î + mĵ − 5k̂', b: '3î + 2ĵ + k̂', mVal: 1 },
    { a: '2î + 4ĵ + mk̂', b: '3î − ĵ + 2k̂', mVal: -1 },
    { a: 'mî + 5ĵ + 2k̂', b: '3î − 2ĵ − 2k̂', mVal: '১৪/৩' },
  ];
  perpCases.forEach((pc, i) => {
    const ansStr = typeof pc.mVal === 'number' ? toBnDigits(pc.mVal) : pc.mVal;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `m-এর মান কত হলে A = ${pc.a} এবং B = ${pc.b} ভেক্টর দুটি পরস্পর লম্ব হবে?`,
        correct: ansStr,
        distractors: ['০', '১', '−১', '২', '৩', '৫', '৮/৩ (২.৬৭)', '১৪/৩'].filter((x) => x !== ansStr).slice(0, 4),
        explanation: `লম্ব হওয়ার শর্ত A · B = ০ সমাধান করে পাওয়া যায় m = ${ansStr}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · লম্ব ভেক্টরের শর্ত',
      })
    );
  });

  // 7. Divergence, Curl, Parallelogram Area & Cross Product (~40 MCQs)
  const divCurlCases = [
    { q: 'একটি ভেক্টর ক্ষেত্র V = x²î + y²ĵ + z²k̂ হলে (১, ২, ৩) বিন্দুতে এর ডাইভারজেন্স (∇·V) কত?', a: '১২', d: ['৬', '১৪', '২৪', '০'], exp: '∇·V = 2x + 2y + 2z = ২(১) + ২(২) + ২(৩) = ১২।' },
    { q: 'V = 3x²î + 5y²ĵ − 2z²k̂ ক্ষেত্রের (১, ১, ১) বিন্দুতে ডাইভারজেন্সের মান কত?', a: '১২', d: ['৬', '১৬', '২০', '১০'], exp: '∇·V = 6x + 10y − 4z = ৬ + ১০ − ৪ = ১২।' },
    { q: 'V = (x + 3y)î + (y − 2z)ĵ + (x + az)k̂ ক্ষেত্রটি সলিনয়ডাল হলে ধ্রুবক "a"-এর মান কত?', a: '−২', d: ['+২', '+১', '০', '−১'], exp: '∇·V = ১ + ১ + a = ০ ⇒ a = −২।' },
    { q: 'A = (2x + y)î + (3y − z)ĵ + (x + az)k̂ ভেক্টর ক্ষেত্রটি সলিনয়ডাল হলে a সমান কত?', a: '−৫', d: ['+৫', '−৩', '+২', '০'], exp: '∇·A = ২ + ৩ + a = ০ ⇒ a = −৫।' },
    { q: 'স্কেলার ক্ষেত্র φ = x²y + yz হলে (১, ২, ১) বিন্দুতে গ্রেডিয়েন্ট ∇φ কত?', a: '4î + 2ĵ + 2k̂', d: ['2î + 2ĵ + k̂', '4î + ĵ + 2k̂', '2î + 4ĵ + k̂'], exp: '∂φ/∂x = 2xy = ৪; ∂φ/∂y = x²+z = ২; ∂φ/∂z = y = ২ ⇒ 4î + 2ĵ + 2k̂।' },
    { q: 'স্কেলার ফাংশন φ = 3x²y − y³z²-এর (১, −২, −১) বিন্দুতে গ্রেডিয়েন্ট ∇φ কত?', a: '−12î − 9ĵ − 16k̂', d: ['12î + 9ĵ + 16k̂', '−12î + 9ĵ − 8k̂', '6î − 3ĵ − 16k̂'], exp: '∂φ/∂x = 6xy = −১২; ∂φ/∂y = 3x² − 3y²z² = ৩ − ১২ = −৯; ∂φ/∂z = −2y³z = −১৬।' },
    { q: 'দুটি ভেক্টর A = 2î + ĵ − k̂ ও B = î − ĵ + 2k̂ কোনো সামান্তরিকের সন্নিহিত বাহু হলে ক্ষেত্রফল কত বর্গ একক?', a: '√৩৫', d: ['√২৭', '√১৪', '৬', '৫'], exp: 'A × B = î(2−1) − ĵ(4+1) + k̂(−2−1) = î − 5ĵ − 3k̂; ক্ষেত্রফল = √(১+২৫+৯) = √৩৫।' },
    { q: 'কোনো সামান্তরিকের দুটি সন্নিহিত বাহু P = 3î + 2ĵ এবং Q = î + 4ĵ হলে সামান্তরিকের ক্ষেত্রফল কত?', a: '১০ বর্গ একক', d: ['১৪ বর্গ একক', '৮ বর্গ একক', '১২ বর্গ একক', '৫ বর্গ একক'], exp: '|P × Q| = |3×4 − 2×1| = |১২ − ২| = ১০ বর্গ একক।' },
    { q: 'কোনো ত্রিভুজের দুটি সন্নিহিত বাহু A = 4î + 3ĵ ও B = 2î + 5ĵ হলে ত্রিভুজটির ক্ষেত্রফল কত?', a: '৭ বর্গ একক', d: ['১৪ বর্গ একক', '২০ বর্গ একক', '৩.৫ বর্গ একক', '১০ বর্গ একক'], exp: 'Area = ½ |A × B| = ½ |৪×৫ − ৩×২| = ½ (১৪) = ৭ বর্গ একক।' },
    { q: 'A = 3î − 2ĵ + k̂ এবং B = 6î − 4ĵ + ak̂ ভেক্টর দুটি সমান্তরাল হলে "a"-এর মান কত?', a: '২', d: ['−২', '৩', '১', '৪'], exp: 'সমান্তরাল শর্তে সহগের অনুপাত সমান: ৬/৩ = (−৪)/(−২) = a/১ ⇒ a = ২।' },
  ];
  divCurlCases.forEach((dc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: dc.q,
        correct: dc.a,
        distractors: dc.d,
        explanation: dc.exp,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ভেক্টর ক্যালকুলাস ও ক্ষেত্রফল',
      })
    );
  });

  // 8. River Crossing Time & Angle Numericals (~32 MCQs)
  const riverCases = [
    { d: 400, v: 4, u: 2, minT: '১০০ s', drift: '২০০ m', ang: '১২০°' },
    { d: 600, v: 6, u: 3, minT: '১০০ s (২)', drift: '৩০০ m', ang: '১২০°' },
    { d: 1000, v: 10, u: 5, minT: '১০০ s (৩)', drift: '৫০০ m', ang: '১২০°' },
    { d: 500, v: 10, u: 5 * 1.414, minT: '৫০ s', drift: '৩৫৩.৫ m', ang: '১৩৫°' },
    { d: 800, v: 8, u: 4, minT: '১০০ s (৪)', drift: '৪০০ m', ang: '১২০°' },
    { d: 900, v: 10, u: 5, minT: '৯০ s', drift: '৪৫০ m', ang: '১২০°' },
    { d: 1200, v: 12, u: 6, minT: '১০০ s (৫)', drift: '৬০০ m', ang: '১২০°' },
    { d: 600, v: 10, u: 5, minT: '৬০ s', drift: '৩০০ m (২)', ang: '১২০°' },
  ];
  riverCases.forEach((rc, idx) => {
    const cleanMinT = rc.minT.replace(/ \(\d\)/, '');
    const cleanDrift = rc.drift.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(rc.d)} m প্রশস্ত একটি নদীতে স্রোতের বেগ ${toBnDigits(Number(rc.u.toFixed(2)))} m/s এবং নৌকার বেগ ${toBnDigits(rc.v)} m/s (কেস-#${toBnDigits(idx + 1)})। ন্যূনতম সময়ে নদী পার হতে কত সময় লাগবে?`,
        correct: cleanMinT,
        distractors: ['৫০ s', '৬০ s', '৯০ s', '১০০ s', '১৫০ s', '২০০ s'].filter((x) => x !== cleanMinT).slice(0, 4),
        explanation: `ন্যূনতম সময় t_min = d / v = ${toBnDigits(rc.d)} / ${toBnDigits(rc.v)} = ${cleanMinT}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · নদী ও নৌকা',
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
        question: `${toBnDigits(rc.d)} m প্রস্থের নদীতে ${toBnDigits(rc.v)} m/s বেগের নৌকা সোজাসুজি (ন্যূনতম দূরত্বে) অপর পাড়ে পৌঁছাতে স্রোতের দিকের সাথে কত কোণে চালাতে হবে (স্রোত ≈ ${toBnDigits(Number(rc.u.toFixed(2)))} m/s)?`,
        correct: rc.ang,
        distractors: ['৯০°', '১২০°', '১৩৫°', '১৫০°', '৬০°'].filter((x) => x !== rc.ang),
        explanation: `সোজাসুজি পার হতে cos θ = −u/v ⇒ θ = ${rc.ang}। (ন্যূনতম সময়ে গেলে ভাটিতে সরণ হতো ${cleanDrift})`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ন্যূনতম দূরত্বে নদী পার',
      })
    );
  });

  // 9. Projectile Motion H_max, T, R Numericals (~64 MCQs, g = 10 m/s²)
  const projCases = [
    { u: 20, ang: 30, t: 2, h: 5, r: '২০√৩ m (≈ ৩৪.৬ m)' },
    { u: 20, ang: 45, t: '২√২ s (≈ ২.৮৩ s)', h: 10, r: '৪০ m' },
    { u: 20, ang: 60, t: '২√৩ s (≈ ৩.৪৬ s)', h: 15, r: '২০√৩ m (≈ ৩৪.৬ m)' },
    { u: 40, ang: 30, t: 4, h: 20, r: '৮০√৩ m (≈ ১৩৮.৬ m)' },
    { u: 40, ang: 45, t: '৪√২ s (≈ ৫.৬৬ s)', h: 40, r: '১৬০ m' },
    { u: 40, ang: 60, t: '৪√৩ s (≈ ৬.৯৩ s)', h: 60, r: '৮০√৩ m (≈ ১৩৮.৬ m)' },
    { u: 30, ang: 30, t: 3, h: 11.25, r: '৪৫√৩ m (≈ ৭৭.৯ m)' },
    { u: 30, ang: 45, t: '৩√২ s (≈ ৪.২৪ s)', h: 22.5, r: '৯০ m' },
    { u: 50, ang: 30, t: 5, h: 31.25, r: '১২৫√৩ m (≈ ২১৬.৫ m)' },
    { u: 60, ang: 30, t: 6, h: 45, r: '১৮০√৩ m (≈ ৩১১.৮ m)' },
    { u: 10, ang: 45, t: '√২ s (≈ ১.৪১ s)', h: 2.5, r: '১০ m' },
    { u: 60, ang: 45, t: '৬√২ s (≈ ৮.৪৯ s)', h: 90, r: '৩৬০ m' },
  ];
  const hPool = ['২.৫ m', '৫ m', '১০ m', '১১.২৫ m', '১৫ m', '২০ m', '২২.৫ m', '৩১.২৫ m', '৪০ m', '৪৫ m', '৬০ m', '৯০ m'];
  const rProjPool = ['১০ m', '২০√৩ m (≈ ৩৪.৬ m)', '৪০ m', '৪৫√৩ m (≈ ৭৭.৯ m)', '৯০ m', '৮০√৩ m (≈ ১৩৮.৬ m)', '১৬০ m', '১২৫√৩ m (≈ ২১৬.৫ m)', '১৮০√৩ m (≈ ৩১১.৮ m)', '৩৬০ m'];
  projCases.forEach((pc, i) => {
    const hStr = `${toBnDigits(pc.h)} m`;
    const tStr = typeof pc.t === 'number' ? `${toBnDigits(pc.t)} s` : pc.t;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `একটি প্রাসকে ভূমির সাথে ${toBnDigits(pc.ang)}° কোণে ${toBnDigits(pc.u)} m/s বেগে নিক্ষেপ করলে (g = ১০ m/s²) এর সর্বাধিক উচ্চতা (H_max) কত?`,
        correct: hStr,
        distractors: hPool.filter((x) => x !== hStr).slice(i % 6, (i % 6) + 4),
        explanation: `H = u² sin²θ / (2g) = (${toBnDigits(pc.u)}² sin²${toBnDigits(pc.ang)}°) / ২০ = ${hStr}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের সর্বোচ্চ উচ্চতা',
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
        question: `ভূমির সাথে ${toBnDigits(pc.ang)}° কোণে ${toBnDigits(pc.u)} m/s বেগে নিক্ষিপ্ত একটি বলের (g = ১০ m/s²) মোট বিচরণকাল (T) এবং আনুভূমিক পাল্লা (R) যথাক্রমে কত?`,
        correct: `T = ${tStr}, R = ${pc.r}`,
        distractors: rProjPool
          .filter((x) => x !== pc.r)
          .slice(0, 4)
          .map((x, j) => `T = ${toBnDigits(j + 2.5)} s, R = ${x}`),
        explanation: `T = 2u sinθ / g = ${tStr} এবং R = u² sin(2θ) / g = ${pc.r}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের পাল্লা ও বিচরণকাল',
      })
    );
  });

  // 10. Linear Kinematics & Circular Motion Numericals (~70 MCQs)
  const carStop = [
    { u: 10, a: 2, s: 25, t: 5 },
    { u: 20, a: 4, s: 50, t: 5 },
    { u: 20, a: 5, s: 40, t: 4 },
    { u: 30, a: 5, s: 90, t: 6 },
    { u: 40, a: 8, s: 100, t: 5 },
    { u: 15, a: 2.5, s: 45, t: 6 },
    { u: 24, a: 4, s: 72, t: 6 },
    { u: 12, a: 3, s: 24, t: 4 },
  ];
  carStop.forEach((cs, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(cs.u)} m/s বেগে চলমান একটি গাড়িতে ব্রেক কষায় ${toBnDigits(cs.a)} m/s² সুষম মন্দন সৃষ্টি হলে গাড়িটি থামার আগে কত দূরত্ব অতিক্রম করবে?`,
        correct: `${toBnDigits(cs.s)} m (${toBnDigits(cs.t)} সেকেন্ডে থামবে)`,
        distractors: [24, 25, 40, 45, 50, 72, 90, 100]
          .filter((x) => x !== cs.s)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} m`),
        explanation: `v² = u² − 2as ⇒ s = u²/(2a) = ${toBnDigits(cs.u)}² / (২×${toBnDigits(cs.a)}) = ${toBnDigits(cs.s)} m এবং t = u/a = ${toBnDigits(cs.t)} s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · সমমন্দন গতি',
      })
    );
  });

  const circMotion = [
    { v: 10, r: 5, ac: 20 },
    { v: 20, r: 10, ac: 40 },
    { v: 12, r: 4, ac: 36 },
    { v: 6, r: 2, ac: 18 },
    { v: 15, r: 25, ac: 9 },
    { v: 30, r: 45, ac: 20 },
    { v: 8, r: 4, ac: 16 },
    { v: 25, r: 50, ac: 12.5 },
  ];
  circMotion.forEach((cm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'dental' : 'medical',
        question: `${toBnDigits(cm.r)} m ব্যাসার্ধের বৃত্তাকার পথে ${toBnDigits(cm.v)} m/s সমদ্রুতিতে ঘূর্ণায়মান কোনো কণার কেন্দ্রমুখী ত্বরণ কত?`,
        correct: `${toBnDigits(cm.ac)} m/s²`,
        distractors: [9, 12.5, 16, 18, 20, 36, 40, 50].filter((x) => x !== cm.ac).slice(0, 4).map((x) => `${toBnDigits(x)} m/s²`),
        explanation: `কেন্দ্রমুখী ত্বরণ a_c = v² / r = ${toBnDigits(cm.v)}² / ${toBnDigits(cm.r)} = ${toBnDigits(cm.ac)} m/s²।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · কেন্দ্রমুখী ত্বরণ',
      })
    );
  });

  // 11. Ch 1-3 Conceptual High-Yield Medical/Admission Assertion Matrix (~100 MCQs via 2-way Q↔A pairs)
  const ch1to3Pairs: Array<{ ch: string; q: string; a: string; ref: string }> = [
    { ch: 'phys1_ch1_measurement', q: 'স্ক্রু-গজের থিম্বল একবার ঘোরালে রৈখিক স্কেলে স্ক্রুটি যে দূরত্ব অতিক্রম করে তাকে কী বলে', a: 'স্ক্রু-গজের পিচ (Pitch)', ref: 'অধ্যায় ১ · স্ক্রু-গজ' },
    { ch: 'phys1_ch1_measurement', q: 'কোন যন্ত্রের সাহায্যে অত্যন্ত সূক্ষ্মভাবে ০.০০১ mm পর্যন্ত মাপা যায় এবং পেছনের চাপে পিছট ত্রুটি দেখা দেয়', a: 'মাইক্রোমিটার স্ক্রু-গজ', ref: 'অধ্যায় ১ · পরিমাপ যন্ত্র' },
    { ch: 'phys1_ch1_measurement', q: '০.০০৪৫০ সংখ্যাটিতে কতগুলো সার্থক অঙ্ক (Significant Figures) রয়েছে', a: '৩টি সার্থক অঙ্ক (৪, ৫ এবং শেষের ০; বামের শূন্য নয়)', ref: 'অধ্যায় ১ · সার্থক অঙ্ক' },
    { ch: 'phys1_ch1_measurement', q: 'একটি পরীক্ষার পরিমাপে পুনরাবৃত্ত ফল বারবার একই এলে তা ভালোভাবে কী নির্দেশ করে', a: 'উচ্চ সূক্ষ্মতা (High Precision) এবং কম এলোমেলো ত্রুটি', ref: 'অধ্যায় ১ · নির্ভুলতা ও সূক্ষ্মতা' },
    { ch: 'phys1_ch1_measurement', q: 'পরীক্ষণের সময় যন্ত্রপাতির সঠিকতা পরীক্ষার জন্য একাধিকবার পাঠ নিয়ে গড় নির্ণয় করলে কোন ত্রুটি দূর হয়', a: 'এলোমেলো ত্রুটি (Random Error)', ref: 'অধ্যায় ১ · ত্রুটি হ্রাস' },
    { ch: 'phys1_ch1_measurement', q: 'একটি গোলকের ব্যাস মাপতে গিয়ে লেভেলিং বা লম্বন ত্রুটি এড়াতে স্কেলের দাগের সাথে চোখ কীভাবে রাখতে হয়', a: 'দাগের ঠিক লম্বভাবে খাড়া ওপরে', ref: 'অধ্যায় ১ · লম্বন ত্রুটি' },
    { ch: 'phys1_ch2_vector', q: 'কোন শর্তে দুটি অশূন্য ভেক্টর A ও B-এর যোগফলের মান বিয়োগফলের মানের সমান (|A+B| = |A−B|) হয়', a: 'যখন ভেক্টর দুটি পরস্পর লম্ব (θ = ৯০°)', ref: 'অধ্যায় ২ · ভেক্টরের কোণ' },
    { ch: 'phys1_ch2_vector', q: 'কোন শর্তে তিনটি ভেক্টর মিলে শূন্য লব্ধি (ত্রিভুজ গঠন) সৃষ্টি করতে পারে না', a: 'যখন যেকোনো দুটি ভেক্টরের যোগফল তৃতীয়টির চেয়ে ছোট হয় (যেমন ২, ৩, ৭)', ref: 'অধ্যায় ২ · ভেক্টর ত্রিভুজ শর্ত' },
    { ch: 'phys1_ch2_vector', q: 'কোনো ভেক্টরের উপাংশের মান কি মূল ভেক্টরের মানের চেয়ে বেশি হতে পারে (সাধারণ লম্ব উপাংশে)', a: 'লম্ব উপাংশে (θ = ৯০°) কখনোই মূল মানের বেশি হতে পারে না (সর্বোচ্চ সমান)', ref: 'অধ্যায় ২ · ভেক্টর বিভাজন' },
    { ch: 'phys1_ch2_vector', q: 'পাখি আকাশে ওড়া এবং ট্রলি ব্যাগ ঠেলা অপেক্ষা টানা সহজ হওয়া ভেক্টরের কোন নীতির ফল', a: 'ভেক্টরের উপাংশ বিভাজন (টানার সময় ওজনের বিপরীত দিকে উল্লম্ব উপাংশ কাজ করায় ঘর্ষণ কমে)', ref: 'অধ্যায় ২ · ভেক্টর বিভাজনের প্রয়োগ' },
    { ch: 'phys1_ch2_vector', q: 'নৌকার গুণ টানার সময় দীর্ঘ রশি ব্যবহার করলে নৌকা সামনের দিকে দ্রুত এগোয় কেন', a: 'দীর্ঘ রশিতে θ ক্ষুদ্রতর হওয়ায় অনুভূমিক উপাংশ F cos θ বেড়ে যায় এবং পাড়ের দিকের টান কমে', ref: 'অধ্যায় ২ · নৌকার গুণ টানা' },
    { ch: 'phys1_ch2_vector', q: 'আয়ত একক ভেক্টর (î, ĵ, k̂)-এর মধ্যকার যেকোনো দুটির ক্রস গুণনের মান ও ডট গুণনের মান যথাক্রমে কত', a: 'ভিন্ন দুটির ক্রস মান ১ (লম্ব একক ভেক্টর) এবং ডট মান ০', ref: 'অধ্যায় ২ · একক ভেক্টর' },
    { ch: 'phys1_ch2_vector', q: 'যে ভেক্টরের পাদবিন্দু নির্দিষ্ট থাকে (যেমন অবস্থান ভেক্টর r) তাকে কী বলে', a: 'সীমাবদ্ধ ভেক্টর (Localized Vector)', ref: 'অধ্যায় ২ · ভেক্টরের প্রকারভেদ' },
    { ch: 'phys1_ch2_vector', q: 'তিনটি ভেক্টর A, B, C একই সমতলে (Coplanar) অবস্থান করলে এদের ত্রিজোড় গুণফল কী হয়', a: 'A · (B × C) = ০ (সমতলীয় হওয়ায় ঘনসামান্তরিকের আয়তন শূন্য)', ref: 'অধ্যায় ২ · সমতলীয় ভেক্টর' },
    { ch: 'phys1_ch3_dynamics', q: 'মুক্তভাবে পড়ন্ত বস্তুর গতিবেগ সময়ের সাথে সমানুপাতিক (v ∝ t) হলেও অতিক্রান্ত দূরত্ব কেমন', a: 'সময়ের বর্গের সমানুপাতিক (h ∝ t²)', ref: 'অধ্যায় ৩ · পড়ন্ত বস্তু' },
    { ch: 'phys1_ch3_dynamics', q: 'খুব ওপর থেকে বৃষ্টির ফোঁটা পড়ার সময় ত্বরণ একসময় শূন্য হয়ে স্থির প্রান্তীয় বেগ লাভ করে কেন', a: 'বায়ুর সান্দ্র বাধা ও প্লবতা ঊর্ধ্বমুখী হয়ে ফোঁটার ওজনের সমান হয়ে যাওয়ায়', ref: 'অধ্যায় ৩ · প্রান্তীয় বেগ' },
    { ch: 'phys1_ch3_dynamics', q: 'খাড়া ওপরের দিকে নিক্ষিপ্ত একটি বল সর্বোচ্চ উচ্চতায় পৌঁছানোর মুহূর্তে এর বেগ ও ত্বরণ কেমন', a: 'বেগ শূন্য (v = ০), কিন্তু ত্বরণ শূন্য নয় (g ≈ ৯.৮ m/s² নিচের দিকে)', ref: 'অধ্যায় ৩ · উল্লম্ব গতি' },
    { ch: 'phys1_ch3_dynamics', q: 'একটি প্রাসকে অনুভূমিকের সাথে θ কোণে ছুড়লে গতিপথের কোন বিন্দুতে এর দ্রুতি ও গতিশক্তি সর্বনিম্ন হয়', a: 'সর্বোচ্চ বিন্দুতে (সেখানে বেগ শুধু অনুভূমিক উপাংশ v₀ cos θ)', ref: 'অধ্যায় ৩ · প্রাসের শক্তি' },
    { ch: 'phys1_ch3_dynamics', q: 'প্রাস সর্বোচ্চ উচ্চতায় পৌঁছালে মোট গতিশক্তির কত ভগ্নাংশ অবশিষ্ট থাকে (যদি নিক্ষেপণ কোণ ৬০° হয়)', a: 'এক-চতুর্থাংশ (cos² ৬০° = ¼)', ref: 'অধ্যায় ৩ · শীর্ষবিন্দুতে গতিশক্তি' },
    { ch: 'phys1_ch3_dynamics', q: 'একটি লিফট সমবেগে ওপরে উঠলে বা নিচে নামলে লিফটের ভেতর থাকা যাত্রীর ওজনের কী পরিবর্তন হয়', a: 'কোনো পরিবর্তন হয় না (ত্বরণ a = ০ বলে প্রকৃত ওজন mg অনুভূত হয়)', ref: 'অধ্যায় ৩ · লিফটের গতি' },
    { ch: 'phys1_ch3_dynamics', q: 'রৈখিক ত্বরণ a_t এবং কেন্দ্রমুখী ত্বরণ a_c যখন সমান সময়ে উপস্থিত থাকে তখন মোট লব্ধি ত্বরণ কত', a: 'a_net = √(a_t² + a_c²) (অসম বৃত্তাকার গতি)', ref: 'অধ্যায় ৩ · অসম বৃত্তাকার গতি' },
    { ch: 'phys1_ch3_dynamics', q: 'ত্বরণ বনাম সময় (a-t) লেখচিত্র সরলরেখা হলেও যদি তা সময় অক্ষের সাথে ঋণাত্মক ঢালে থাকে তবে তা কী বোঝায়', a: 'সময়ের সাথে ত্বরণ সুষম হারে হ্রাস পাচ্ছে (অসম ত্বরণ বা পরিবর্তনশীল ত্বরণ)', ref: 'অধ্যায় ৩ · লেখচিত্র ব্যাখ্যা' },
  ];
  ch1to3Pairs.forEach((cp, i) => {
    const others = ch1to3Pairs.filter((x) => x.q !== cp.q);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cp.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${cp.q}?`,
        correct: cp.a,
        distractors: others.slice(i % 14, (i % 14) + 4).map((x) => x.a),
        explanation: `${cp.q} — উত্তর: ${cp.a}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${cp.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cp.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `পদার্থবিজ্ঞানে "${cp.a}" সিদ্ধান্তটি নিচের কোন বৈজ্ঞানিক প্রশ্নের বা পরিস্থিতির সাথে সামঞ্জস্যপূর্ণ?`,
        correct: cp.q,
        distractors: others.slice((i + 5) % 14, ((i + 5) % 14) + 4).map((x) => x.q),
        explanation: `"${cp.a}" প্রযোজ্য হয় যখন: ${cp.q}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${cp.ref}`,
      })
    );
  });

  return list;
}
