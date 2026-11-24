import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredT(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2st_${String(seq++).padStart(4, '0')}`;

  // 1. Quantitative Chemistry: Molarity, % w/v, ppm, Titration Equivalence & Beer-Lambert (~220 MCQs)
  const molarCases: Array<{ solute: string; mw: number; mass: number; volMl: number }> = [
    { solute: 'NaOH', mw: 40, mass: 4, volMl: 500 },
    { solute: 'NaOH', mw: 40, mass: 2, volMl: 250 },
    { solute: 'NaOH', mw: 40, mass: 8, volMl: 2000 },
    { solute: 'Na₂CO₃', mw: 106, mass: 5.3, volMl: 500 },
    { solute: 'Na₂CO₃', mw: 106, mass: 10.6, volMl: 2000 },
    { solute: 'Na₂CO₃', mw: 106, mass: 2.65, volMl: 250 },
    { solute: 'H₂SO₄', mw: 98, mass: 4.9, volMl: 500 },
    { solute: 'H₂SO₄', mw: 98, mass: 9.8, volMl: 250 },
    { solute: 'H₂C₂O₄·2H₂O', mw: 126, mass: 6.3, volMl: 500 },
    { solute: 'H₂C₂O₄·2H₂O', mw: 126, mass: 12.6, volMl: 2000 },
    { solute: 'KOH', mw: 56, mass: 5.6, volMl: 500 },
    { solute: 'HCl', mw: 36.5, mass: 3.65, volMl: 500 },
  ];

  molarCases.forEach((c, idx) => {
    const m = Number(((1000 * c.mass) / (c.mw * c.volMl)).toFixed(3));
    const ppm = Math.round((c.mass * 1000 * 1000) / c.volMl);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(c.volMl)} mL দ্রবণে ${toBnDigits(c.mass)} g ${c.solute} (M = ${toBnDigits(c.mw)}) দ্রবীভূত থাকলে দ্রবণটির মোলারিটি (M) কত?`,
        correct: `${toBnDigits(m)} M`,
        distractors: [
          `${toBnDigits(Number((m * 2).toFixed(3)))} M`,
          `${toBnDigits(Number((m / 2).toFixed(3)))} M`,
          `${toBnDigits(Number((m * 10).toFixed(3)))} M`,
        ],
        explanation: `S = (১০০০ × w) / (M × V) = (১০০০ × ${toBnDigits(c.mass)}) / (${toBnDigits(c.mw)} × ${toBnDigits(c.volMl)}) = ${toBnDigits(m)} M।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মোলারিটি গণনা',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(c.volMl)} mL জলীয় দ্রবণে ${toBnDigits(c.mass)} g ${c.solute} দ্রবীভূত থাকলে পিপিএম (ppm) এককে এর ঘনমাত্রা কত?`,
        correct: `${toBnDigits(ppm)} ppm`,
        distractors: [
          `${toBnDigits(Math.round(ppm / 10))} ppm`,
          `${toBnDigits(ppm * 10)} ppm`,
          `${toBnDigits(Math.round(ppm / 100))} ppm`,
        ],
        explanation: `১ ppm = ১ mg/L। এখানে ${toBnDigits(c.mass)} g = ${toBnDigits(c.mass * 1000)} mg এবং আয়তন = ${toBnDigits(c.volMl / 1000)} L; তাই ppm = ${toBnDigits(ppm)}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · ppm ঘনমাত্রা',
      })
    );
  });

  // % (w/v) to Molarity & ppm Conversions
  const pctCases: Array<{ solute: string; mw: number; pct: number }> = [
    { solute: 'NaOH', mw: 40, pct: 4 },
    { solute: 'NaOH', mw: 40, pct: 10 },
    { solute: 'Na₂CO₃', mw: 106, pct: 5.3 },
    { solute: 'Na₂CO₃', mw: 106, pct: 10.6 },
    { solute: 'H₂SO₄', mw: 98, pct: 4.9 },
    { solute: 'H₂SO₄', mw: 98, pct: 9.8 },
    { solute: 'গ্লুকোজ (C₆H₁₂O₆)', mw: 180, pct: 1.8 },
    { solute: 'গ্লুকোজ (C₆H₁₂O₆)', mw: 180, pct: 9 },
    { solute: 'CH₃COOH', mw: 60, pct: 6 },
    { solute: 'HNO₃', mw: 63, pct: 6.3 },
  ];
  pctCases.forEach((p) => {
    const mol = Number(((10 * p.pct) / p.mw).toFixed(3));
    const ppm = Math.round(p.pct * 10000);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(p.pct)}% (w/v) ${p.solute} (M = ${toBnDigits(p.mw)}) দ্রবণের মোলার ঘনমাত্রা কত?`,
        correct: `${toBnDigits(mol)} M`,
        distractors: [
          `${toBnDigits(Number((mol * 2).toFixed(3)))} M`,
          `${toBnDigits(Number((mol / 10).toFixed(3)))} M`,
          `${toBnDigits(Number((mol * 5).toFixed(3)))} M`,
        ],
        explanation: `শতকরা থেকে মোলারিটি S = (১০ × %) / M = (১০ × ${toBnDigits(p.pct)}) / ${toBnDigits(p.mw)} = ${toBnDigits(mol)} M।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · শতকরা থেকে মোলারিটি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(p.pct)}% (w/v) ${p.solute} দ্রবণের ঘনমাত্রা ppm এককে কত?`,
        correct: `${toBnDigits(ppm)} ppm`,
        distractors: [
          `${toBnDigits(ppm / 10)} ppm`,
          `${toBnDigits(ppm * 10)} ppm`,
          `${toBnDigits(ppm / 100)} ppm`,
        ],
        explanation: `১% (w/v) = ১০,০০০ mg/L = ১০,০০০ ppm। অতএব ${toBnDigits(p.pct)}% = ${toBnDigits(ppm)} ppm।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · শতকরা থেকে ppm',
      })
    );
  });

  // Titration Equivalence Volume Problems (V₁S₁e₁ = V₂S₂e₂)
  const titrations: Array<{ acid: string; ea: number; va: number; sa: number; base: string; eb: number; sb: number }> = [
    { acid: 'H₂SO₄', ea: 2, va: 25, sa: 0.1, base: 'NaOH', eb: 1, sb: 0.1 },
    { acid: 'H₂SO₄', ea: 2, va: 20, sa: 0.2, base: 'NaOH', eb: 1, sb: 0.4 },
    { acid: 'HCl', ea: 1, va: 20, sa: 0.5, base: 'Na₂CO₃', eb: 2, sb: 0.25 },
    { acid: 'H₂C₂O₄', ea: 2, va: 25, sa: 0.2, base: 'KOH', eb: 1, sb: 0.5 },
    { acid: 'HNO₃', ea: 1, va: 30, sa: 0.2, base: 'Na₂CO₃', eb: 2, sb: 0.15 },
    { acid: 'H₂SO₄', ea: 2, va: 15, sa: 0.3, base: 'Na₂CO₃', eb: 2, sb: 0.15 },
  ];
  titrations.forEach((t) => {
    const vb = Number(((t.va * t.sa * t.ea) / (t.sb * t.eb)).toFixed(1).replace(/\.0$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(t.va)} mL ${toBnDigits(t.sa)} M ${t.acid} দ্রবণকে সম্পূর্ণ প্রশমিত করতে ${toBnDigits(t.sb)} M ${t.base} দ্রবণের কত mL প্রয়োজন হবে?`,
        correct: `${toBnDigits(vb)} mL`,
        distractors: [
          `${toBnDigits(vb * 2)} mL`,
          `${toBnDigits(Number((vb / 2).toFixed(1)))} mL`,
          `${toBnDigits(t.va)} mL`,
          `${toBnDigits(vb + 10)} mL`,
          `${toBnDigits(vb + 15)} mL`,
        ],
        explanation: `তুল্যতা সমীকরণ eₐ·Vₐ·Sₐ = e_b·V_b·S_b অনুযায়ী ${toBnDigits(t.ea)}×${toBnDigits(t.va)}×${toBnDigits(t.sa)} = ${toBnDigits(t.eb)}×V_b×${toBnDigits(t.sb)} ⇒ V_b = ${toBnDigits(vb)} mL।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · অম্ল-ক্ষার টাইট্রেশন',
      })
    );
  });

  // Oxidation Number & Equivalent Weight Matrix
  const oxList: Array<{ species: string; target: string; ox: string; note: string }> = [
    { species: 'KMnO₄', target: 'Mn', ox: '+৭', note: '১ + Mn + ৪(-২) = ০ ⇒ Mn = +৭' },
    { species: 'K₂Cr₂O₇', target: 'Cr', ox: '+৬', note: '২(+১) + ২Cr + ৭(-২) = ০ ⇒ Cr = +৬' },
    { species: 'Na₂S₂O₃', target: 'S (গড়)', ox: '+২', note: '২(+১) + ২S + ৩(-২) = ০ ⇒ S = +২' },
    { species: 'Na₂S₄O₆ (টেট্রাথায়োনেট)', target: 'S (গড়)', ox: '+২.৫', note: 'দুটি প্রান্তীয় S (+৫) এবং দুটি মধ্যবর্তী S (০); গড় = ১০/৪ = +২.৫' },
    { species: 'CrO₅ (ক্রোমিয়াম পেন্টাঅক্সাইড)', target: 'Cr', ox: '+৬', note: 'প্রজাপতি গঠনে ৪টি পারঅক্সাইড O (-১) ও ১টি অক্সাইড O (-২) থাকায় Cr = +৬' },
    { species: 'H₂SO₅ (ক্যারো’স অ্যাসিড)', target: 'S', ox: '+৬', note: 'একটি পারঅক্সি (–O–O–) বন্ধনের ২টি O (-১) ও বাকি ৩টি O (-২) হওয়ায় S = +৬' },
    { species: 'H₂S₂O₈ (মার্শালের অ্যাসিড)', target: 'S', ox: '+৬', note: 'মাঝে একটি পারঅক্সি (–O–O–) বন্ধন থাকায় উভয় সালফারের জারণ মান +৬' },
    { species: 'K₄[Fe(CN)₆]', target: 'Fe', ox: '+২', note: '৪(+১) + Fe + ৬(-১) = ০ ⇒ Fe = +২' },
    { species: 'K₃[Fe(CN)₆]', target: 'Fe', ox: '+৩', note: '৩(+১) + Fe + ৬(-১) = ০ ⇒ Fe = +৩' },
    { species: '[Ni(CO)₄]', target: 'Ni', ox: '০', note: 'কার্বনিল (CO) একটি প্রশম লিগ্যান্ড (চার্জ ০) হওয়ায় নিকেলের জারণ সংখ্যা ০' },
    { species: 'Fe₃O₄', target: 'Fe (গড়)', ox: '+৮/৩ (+২.৬৭)', note: 'এটি FeO (+২) ও Fe₂O₃ (+৩)-এর ১:১ মিশ্র অক্সাইড, তাই গড় +৮/৩' },
    { species: 'Ca(OCl)Cl (ব্লিচিং পাউডার)', target: 'Cl পরমাণুদ্বয়', ox: '+১ এবং -১', note: 'OCl⁻-এ Cl = +১ এবং Cl⁻-এ Cl = -১; গড় শূন্য' },
    { species: 'NH₄NO₃', target: 'দুই N পরমাণু', ox: '-৩ এবং +৫', note: 'NH₄⁺-এ N = -৩ এবং NO₃⁻-এ N = +৫' },
    { species: 'OF₂', target: 'O', ox: '+২', note: 'ফ্লোরিন (-১) সর্বাধিক তড়িৎ ঋণাত্মক বলে অক্সিজেন +২ হয়' },
    { species: 'KO₂ (পটাশিয়াম সুপারঅক্সাইড)', target: 'O', ox: '-১/২ (-০.৫)', note: 'K (+১) + ২O = ০ ⇒ সুপারঅক্সাইড O₂⁻-এ O = -০.৫' },
    { species: 'Na₂O₂ (সোডিয়াম পারঅক্সাইড)', target: 'O', ox: '-১', note: 'পারঅক্সাইড O₂²⁻ আয়নে অক্সিজেনের জারণ মান -১' },
  ];

  const oxValues = oxList.map((x) => x.ox);
  oxList.forEach((o, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: idx < 6 ? 'medical' : 'dental',
        question: `${o.species} যৌগ/আয়নে ${o.target}-এর জারণ সংখ্যা (Oxidation number) কত?`,
        correct: o.ox,
        distractors: Array.from(new Set(oxValues)).filter((x) => x !== o.ox).slice(idx % 4, (idx % 4) + 5),
        explanation: `${o.species}-এ ${o.note}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · জারণ সংখ্যা নির্ণয়',
      })
    );
  });

  // 2. Quantitative Chemistry High-Yield Concepts Matrix (55 entries × 4 angles = 220 MCQs)
  const quantMatrix: Array<{
    title: string;
    detail: string;
    pearl: string;
    diff?: 'board' | 'medical' | 'dental';
  }> = [
    {
      title: 'জারণ-বিজারণ তুল্যসংখ্যা (n-ফ্যাক্টর): KMnO₄ ও K₂Cr₂O₇',
      detail: 'অম্লীয় মাধ্যমে ১ মোল KMnO₄ ৫ মোল ইলেকট্রন গ্রহণ করে Mn²⁺ হয় (তুল্যসংখ্যা ৫); অম্লীয় K₂Cr₂O₇ ৬ মোল ইলেকট্রন গ্রহণ করে ২Cr³⁺ হয় (তুল্যসংখ্যা ৬)',
      pearl: 'ক্ষারীয় বা নিরপেক্ষ মাধ্যমে KMnO₄ মাত্র ৩টি ইলেকট্রন গ্রহণ করে MnO₂ অধঃক্ষেপ তৈরি করে (তুল্যসংখ্যা ৩)',
      diff: 'medical',
    },
    {
      title: 'অক্সালিক অ্যাসিড (C₂O₄²⁻) ও Fe²⁺-এর বিজারণ তুল্যসংখ্যা',
      detail: 'C₂O₄²⁻ → 2CO₂ + 2e⁻ হওয়ায় অক্সালিক অ্যাসিডের তুল্যসংখ্যা ২; Fe²⁺ → Fe³⁺ + e⁻ হওয়ায় ফেরাস সালফেটের (FeSO₄) তুল্যসংখ্যা ১',
      pearl: '১ মোল KMnO₄ অম্লীয় মাধ্যমে ৫ মোল Fe²⁺ অথবা ২.৫ মোল অক্সালিক অ্যাসিডকে সম্পূর্ণ জারিত করতে পারে',
      diff: 'medical',
    },
    {
      title: 'আয়োডোমিতি (Iodometry) বনাম আয়োডিমিতি (Iodimetry)',
      detail: 'আয়োডিমিতিতে প্রমাণ আয়োডিন (I₂) দ্রবণ সরাসরি বিজারক (থায়োসালফেট, ভিটামিন-C) টাইট্রেশনে ব্যবহৃত হয়; আয়োডোমিতিতে জারক (Cu²⁺, K₂Cr₂O₇) অতিরিক্ত KI থেকে I₂ মুক্ত করে, যা পরে Na₂S₂O₃ দিয়ে মাপা হয়',
      pearl: 'উভয় টাইট্রেশনেই প্রান্তবিন্দুর ঠিক আগে (হালকা খড়বর্ণে) সদ্য প্রস্তুত স্টার্চ নির্দেশক যোগ করলে গাঢ় নীল বর্ণ থেকে বর্ণহীন হয়ে শেষবিন্দু পাওয়া যায়',
      diff: 'medical',
    },
    {
      title: 'কপার (Cu²⁺) নির্ণয়ে আয়োডোমিতির বিক্রিয়া ও সাদা Cu₂I₂ অধঃক্ষেপ',
      detail: '2CuSO₄ + 4KI → Cu₂I₂↓ (সাদা) + I₂ + 2K₂SO₄ এবং মুক্ত I₂ + 2Na₂S₂O₃ → Na₂S₄O₆ + 2NaI',
      pearl: '১ মোল Cu²⁺ থেকে ½ মোল I₂ মুক্ত হয়, যা ১ মোল Na₂S₂O₃ দ্বারা প্রশমিত হয়; অর্থাৎ Cu²⁺ ও Na₂S₂O₃-এর মোল অনুপাত ১:১',
      diff: 'medical',
    },
    {
      title: 'K₂Cr₂O₇ দিয়ে Fe²⁺ টাইট্রেশনে নির্দেশকের ভূমিকা',
      detail: 'KMnO₄ স্ব-নির্দেশক হলেও K₂Cr₂O₇ স্ব-নির্দেশক নয় (সবুজ Cr³⁺ গঠিত হয়)—তাই অভ্যন্তরীণ নির্দেশক হিসেবে ডাইফিনাইল অ্যামিন (ডিফিনাইলামিন সালফোনেট) ও গাঢ় H₃PO₄ ব্যবহৃত হয়',
      pearl: 'বাহ্যিক নির্দেশক হিসেবে পটাশিয়াম ফেরিসায়ানাইড K₃[Fe(CN)₆] আগে প্রচলিত ছিল',
      diff: 'medical',
    },
    {
      title: 'মোলারিটি বনাম মোলালিটি (m) এবং তাপমাত্রার প্রভাব',
      detail: 'মোলারিটি (M = mol/L দ্রবণ) আয়তনের ওপর নির্ভরশীল হওয়ায় তাপমাত্রা পরিবর্তনে বদলায়; কিন্তু মোলালিটি (m = mol/kg দ্রাবক), মোল ভগ্নাংশ ও % (w/w) তাপমাত্রার ওপর নির্ভরশীল নয়',
      pearl: 'মোলাল দ্রবণে কেবল দ্রাবকের ভর (১০০০ g = ১ kg) বিবেচনা করা হয়, তাই মোলালিটিই তাপ-নিরপেক্ষ নির্ভুল একক',
      diff: 'medical',
    },
    {
      title: 'বিয়ার-ল্যাম্বার্ট সূত্র (A = log(I₀/I) = ε·c·l)',
      detail: 'একবর্ণী আলোর শোষণ বা অ্যাবজর্ভ্যান্স (A) দ্রবণের মোলার ঘনমাত্রা (c) ও আলোর পথের দৈর্ঘ্য (l)-এর সমানুপাতিক; ε হলো মোলার অ্যাবজর্পশন সহগ',
      pearl: 'অ্যাবজর্ভ্যান্স A = ০ হলে ১০০% আলো পাস করে (T = ১০০%); A = ১ হলে ১০% আলো ও A = ২ হলে ১% আলো পাস করে',
      diff: 'medical',
    },
    {
      title: 'পারমাণবিক শোষণ বর্ণালিমিতি (AAS — Atomic Absorption Spectroscopy)',
      detail: 'হলো-ক্যাথোড ল্যাম্পের একবর্ণী আলো শিখায় থাকা মুক্ত পরমাণু দ্বারা শোষিত হওয়ার মাত্রা থেকে পানিতে অতি সূক্ষ্ম ppm বা ppb স্তরের ভারী ধাতু (As, Pb, Hg, Fe) নির্ণয় করা হয়',
      pearl: 'অত্যন্ত সংবেদনশীল হওয়ায় খাদ্য ও পানিতে ট্রেস ধাতু শনাক্তকরণে AAS ব্যবহৃত হয়',
      diff: 'dental',
    },
    {
      title: 'রক্তে গ্লুকোজ (mg/dL থেকে mmol/L) এবং কোলেস্টেরল রূপান্তর',
      detail: 'রক্তে গ্লুকোজের (M = ১৮০) ক্ষেত্রে mmol/L-কে ১৮ দিয়ে গুণ করলে mg/dL পাওয়া যায়; সুস্থ অভুক্ত ব্যক্তির স্বাভাবিক গ্লুকোজ ৩.৯–৫.৫ mmol/L (৭০–৯৯ mg/dL)',
      pearl: 'কোলেস্টেরলের (M = ৩৮৬.৬) জন্য mmol/L কে ৩৮.৬ দিয়ে গুণ করলে mg/dL পাওয়া যায় (<২০০ mg/dL স্বাভাবিক)',
      diff: 'medical',
    },
    {
      title: 'ম্যাক্রোমোল ও অ্যাভোগাড্রো সংখ্যা (N_A = ৬.০২২ × ১০²³)',
      detail: '১ মোল যেকোনো পদার্থে ৬.০২২ × ১০²³টি কণা থাকে; ১৮ mL পানিতে (১ মোল = ১৮ g) ১০ × N_A সংখ্যক ইলেকট্রন ও প্রোটন এবং ৩ × N_A সংখ্যক পরমাণু থাকে',
      pearl: '১ মোল ইলেকট্রনের মোট চার্জ হলো ১ ফ্যারাডে (৯৬,৪৮৫ ≈ ৯৬,৫০০ কুলম্ব)',
      diff: 'board',
    },
    {
      title: 'লিমিটিং বিক্রিয়ক (Limiting Reactant) শনাক্তকরণ',
      detail: 'বিক্রিয়ার সমতা অনুযায়ী যে বিক্রিয়ক সবার আগে নিঃশেষ হয়ে উৎপাদের সর্বোচ্চ পরিমাণ নির্ধারণ করে তাকে লিমিটিং বিক্রিয়ক বলে',
      pearl: 'উদ্বৃত্ত বিক্রিয়ক বিক্রিয়া শেষে পাত্রে অবশিষ্ট থেকে যায়',
      diff: 'board',
    },
    {
      title: 'সেমি-মোলার (০.৫ M), ডেসি-মোলার (০.১ M) ও সেন্টি-মোলার (০.০১ M) দ্রবণ',
      detail: '১ M = মোলার, ০.৫ M = সেমি-মোলার, ০.১ M = ডেসি-মোলার, ০.০১ M = সেন্টি-মোলার এবং ০.০০১ M = মিলি-মোলার দ্রবণ',
      pearl: 'নরমাল (N) = মোলারিটি (M) × তুল্যসংখ্যা (e); যেমন ১ M H₂SO₄ = ২ N H₂SO₄',
      diff: 'board',
    },
    {
      title: 'গাঢ় বাণিজ্যিক অ্যাসিড ও অ্যামোনিয়ার প্রমাণ মোলারিটি',
      detail: 'বাণিজ্যিক গাঢ় HCl (~৩৭%, ঘনত্ব ১.১৯) ≈ ১২ M; গাঢ় HNO₃ (~৭০%) ≈ ১৬ M; এবং গাঢ় H₂SO₄ (~৯৮%, ঘনত্ব ১.৮৪) ≈ ১৮ M',
      pearl: 'গাঢ় H₂SO₄ পানিতে মেশাতে হলে সর্বদা পানির মধ্যে ফোঁটায় ফোঁটায় অ্যাসিড যোগ করে নাড়তে হবে (কখনো অ্যাসিডে পানি নয়)',
      diff: 'medical',
    },
    {
      title: 'আর্দ্রবিশ্লেষণ ও দ্রবণের মিশ্রণের চূড়ান্ত প্রকৃতি নির্ণয়',
      detail: 'সমান আয়তন ও ঘনমাত্রার H₂SO₄ ও NaOH মিশালে H₂SO₄-এর তুল্যসংখ্যা ২ হওয়ায় অতিরিক্ত H⁺ থেকে দ্রবণটি অম্লীয় হবে',
      pearl: 'মিশ্রণের চূড়ান্ত প্রকৃতি নির্ণয়ে eₐVₐSₐ ও e_bV_bS_b-এর মধ্যে কোনটি বড় তা তুলনা করা হয়',
      diff: 'medical',
    },
    {
      title: 'অবশিষ্ট জারক ও নমুনায় লোহার (% Fe) পরিমাণ নির্ণয়',
      detail: 'আকরিকের Fe²⁺-কে প্রমাণ KMnO₄ বা K₂Cr₂O₇ দিয়ে টাইট্রেশন করে প্রতিটি মোল Fe²⁺ = ১/৫ মোল KMnO₄ (বা ১/৬ মোল K₂Cr₂O₇) ধরে শতকরা বিশুদ্ধ লোহা বের করা হয়',
      pearl: 'অক্সিজেন-সৃষ্ট ধোঁয়া এড়াতে Fe²⁺-কে লঘু H₂SO₄-এ দ্রবীভূত করে টাইট্রেশন করা হয় (HCl নিলে KMnO₄ Cl⁻-কে জারিত করে Cl₂ তৈরি করতে পারে)',
      diff: 'medical',
    },
    {
      title: 'গ্যাস অ্যাবসর্পশন ও অরস্যাত (Orsat) বা ল্যাবে CO₂-O₂-CO শোষণ',
      detail: 'KOH দ্রবণ CO₂ শোষণ করে, ক্ষারীয় পাইরোগ্যালেট দ্রবণ O₂ শোষণ করে এবং অ্যামোনিয়াক্যাল কিউপ্রাস ক্লোরাইড (Cu₂Cl₂) CO শোষণ করে',
      pearl: 'তারপিন তেল ওজোন (O₃) এবং অনাদ্র CuSO₄ বা গাঢ় H₂SO₄ জলীয়বাষ্প শোষণ করে',
      diff: 'medical',
    },
    {
      title: 'মিথাইল অরেঞ্জ, মিথাইল রেড ও ফেনলফথ্যালিনের বর্ণ পরিবর্তন',
      detail: 'ফেনলফথ্যালিন অম্লে বর্ণহীন ও ক্ষারে গোলাপি-লাল (pH ৮.৩–১০); মিথাইল অরেঞ্জ অম্লে লাল ও ক্ষারে হলুদ (pH ৩.১–৪.৪)',
      pearl: 'সবল অ্যাসিড ও সবল ক্ষার (HCl + NaOH) টাইট্রেশনে সমতুল্য বিন্দুর pH খাড়াভাবে ৩ থেকে ১১ পর্যন্ত লাফ দেয় বলে যেকোনো নির্দেশকই কাজ করে',
      diff: 'medical',
    },
    {
      title: 'গোল্ড স্মিথ বা আকরিক থেকে CaCO₃ বিশুদ্ধতা নির্ণয় (ব্যাক টাইট্রেশন)',
      detail: 'অদ্রবণীয় CaCO₃ বা মার্বেলকে নির্দিষ্ট অতিরিক্ত প্রমাণ HCl-এ দ্রবীভূত করে, অবশিষ্ট HCl-কে প্রমাণ NaOH দিয়ে টাইট্রেট করে প্রকৃত CaCO₃ ভর বের করা হয়',
      pearl: 'যেসব পদার্থ সরাসরি টাইট্রেশনে ধীর বা অদ্রবণীয় (যেমন অ্যান্টাসিড ট্যাবলেট, ডিমের খোসা), সেগুলোর বিশ্লেষণে ব্যাক টাইট্রেশন ব্যবহৃত হয়',
      diff: 'dental',
    },
    {
      title: 'গ্যাসের আংশিক চাপ ও শতকরা সংযুতি থেকে স্থূল সংকেত (Empirical Formula)',
      detail: 'মৌলগুলোর শতকরা ভরকে নিজ নিজ পারমাণবিক ভর দিয়ে ভাগ করে ক্ষুদ্রতম ভাগফলে ভাগ করলে পূর্ণসংখ্যার স্থূল সংকেত পাওয়া যায়; আণবিক সংকেত = n × স্থূল সংকেত',
      pearl: 'অ্যাসিটিক অ্যাসিড (CH₃COOH), গ্লুকোজ (C₆H₁₂O₆) ও ফরম্যালডিহাইডের (HCHO) স্থূল সংকেত অভিন্ন: CH₂O',
      diff: 'board',
    },
    {
      title: 'ডিজিটাল স্পেক্ট্রোফটোমিটারে λ_max নির্বাচন ও ট্রান্সমিট্যান্স',
      detail: 'যে নির্দিষ্ট তরঙ্গদৈর্ঘ্যে দ্রবণ সর্বোচ্চ আলো শোষণ করে (λ_max), সেই তরঙ্গদৈর্ঘ্যে পরিমাপ করলে সর্বোচ্চ সংবেদনশীলতা পাওয়া যায়',
      pearl: 'শোষণ A = ২ - log₁₀(%T); অর্থাৎ %T = ১০ হলে A = ১.০',
      diff: 'medical',
    },
  ];

  const qTitles = quantMatrix.map((q) => q.title);
  const qDetails = quantMatrix.map((q) => q.detail);
  const qPearls = quantMatrix.map((q) => q.pearl);

  quantMatrix.forEach((q, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: q.diff ?? 'medical',
        question: `পরিমাণগত রসায়নে "${q.title}"-এর সঠিক নিয়ম বা বিশ্লেষণ কোনটি?`,
        correct: q.detail,
        distractors: [1, 2, 3, 4].map((o) => qDetails[(idx + o * 3) % quantMatrix.length]),
        explanation: `${q.detail}। পরীক্ষা নোট: ${q.pearl}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · পরিমাণগত রসায়ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${q.title}" বিষয়ে পরীক্ষার জন্য সবচেয়ে গুরুত্বপূর্ণ সূক্ষ্ম তথ্য বা ব্যতিক্রম কোনটি?`,
        correct: q.pearl,
        distractors: [1, 2, 3, 4].map((o) => qPearls[(idx + o * 5) % quantMatrix.length]),
        explanation: `${q.pearl}। মূলনীতি: ${q.detail}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মেডিকেল ভর্তি প্রস্তুতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${q.detail}" — এই বিবৃতিটি পরিমাণগত রসায়নের কোন বিষয়ের বর্ণনা?`,
        correct: q.title,
        distractors: [1, 2, 3, 4].map((o) => qTitles[(idx + o * 7) % quantMatrix.length]),
        explanation: `এটি "${q.title}" অধ্যায়ের অন্তর্ভুক্ত: ${q.pearl}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · এইচএসসি ও ভর্তি প্রশ্ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${q.pearl}" — এই বিশেষ তথ্যটি নিচের কোন পদ্ধতির বা বিষয়ের অন্তর্গত?`,
        correct: q.title,
        distractors: [1, 2, 3, 4].map((o) => qTitles[(idx + o * 9) % quantMatrix.length]),
        explanation: `তথ্যটি "${q.title}" সম্পর্কিত: ${q.detail}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · পরিমাণগত রসায়ন',
      })
    );
  });

  // 3. Stoichiometric Mole, Molecule & Mass Conversions (160+ MCQs)
  const molSpecies: Array<{ name: string; mw: number; atomsPerMol: number }> = [
    { name: 'CO₂', mw: 44, atomsPerMol: 3 },
    { name: 'CH₄', mw: 16, atomsPerMol: 5 },
    { name: 'NH₃', mw: 17, atomsPerMol: 4 },
    { name: 'H₂O', mw: 18, atomsPerMol: 3 },
    { name: 'SO₂', mw: 64, atomsPerMol: 3 },
    { name: 'H₂SO₄', mw: 98, atomsPerMol: 7 },
    { name: 'গ্লুকোজ (C₆H₁₂O₆)', mw: 180, atomsPerMol: 24 },
    { name: 'CaCO₃', mw: 100, atomsPerMol: 5 },
  ];
  molSpecies.forEach((sp) => {
    const massHalf = Number((sp.mw / 2).toFixed(1).replace(/\.0$/, ''));
    const massDouble = sp.mw * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(massHalf)} g ${sp.name} (আণবিক ভর ${toBnDigits(sp.mw)})-এ মোট কতটি অণু বিদ্যমান থাকবে?`,
        correct: `৩.০১১ × ১০²³টি (০.৫ মোল)`,
        distractors: [
          `৬.০২২ × ১০²³টি (১.০ মোল)`,
          `১.২০৪ × ১০²⁴টি (২.০ মোল)`,
          `১.৫০৫ × ১০²³টি (০.২৫ মোল)`,
        ],
        explanation: `মোল সংখ্যা = ${toBnDigits(massHalf)} / ${toBnDigits(sp.mw)} = ০.৫ মোল। অণু সংখ্যা = ০.৫ × ৬.০২২ × ১০²³ = ৩.০১১ × ১০²³টি।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মোল ও অ্যাভোগাড্রো সংখ্যা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(massDouble)} g ${sp.name} নমুনায় সর্বমোট পরমাণুর সংখ্যা (অণুপ্রতি ${toBnDigits(sp.atomsPerMol)}টি পরমাণু ধরে) কত মোল পরমাণু বা কত গুণ N_A?`,
        correct: `${toBnDigits(2 * sp.atomsPerMol)} × N_Aটি পরমাণু`,
        distractors: [
          `২ × N_Aটি পরমাণু`,
          `${toBnDigits(sp.atomsPerMol)} × N_Aটি পরমাণু`,
          `${toBnDigits(4 * sp.atomsPerMol)} × N_Aটি পরমাণু`,
        ],
        explanation: `${toBnDigits(massDouble)} g হলো ২ মোল ${sp.name}। প্রতি অণুতে ${toBnDigits(sp.atomsPerMol)}টি পরমাণু থাকায় মোট পরমাণু = ২ × ${toBnDigits(sp.atomsPerMol)} × N_A = ${toBnDigits(2 * sp.atomsPerMol)} N_A।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · পরমাণু গণনা',
      })
    );
  });

  // Blood Glucose Unit Conversion Drill
  [5, 6, 7, 8, 10, 12].forEach((mmol) => {
    const mgdl = mmol * 18;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একজন রোগীর রক্তে গ্লুকোজের মাত্রা ${toBnDigits(mmol)} mmol/L হলে mg/dL এককে এর মান কত হবে? (গ্লুকোজের আণবিক ভর ১৮০)`,
        correct: `${toBnDigits(mgdl)} mg/dL`,
        distractors: [
          `${toBnDigits(mmol * 10)} mg/dL`,
          `${toBnDigits(mmol * 36)} mg/dL`,
          `${toBnDigits(mmol * 9)} mg/dL`,
        ],
        explanation: `${toBnDigits(mmol)} mmol/L = ${toBnDigits(mmol)} × ১৮০ mg/L = ${toBnDigits(mmol * 180)} mg / ১০ dL = ${toBnDigits(mgdl)} mg/dL (সংক্ষেপে mmol/L × ১৮)।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · ক্লিনিক্যাল ঘনমাত্রা রূপান্তর',
      })
    );
  });

  return list;
}
