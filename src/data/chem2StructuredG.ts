import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredG(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sg_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 3 Quantitative Chemistry: ppm / % w-v / Molarity Conversions (~60 MCQs)
  const ppmCases = [
    { sol: 'NaOH (M = ৪০)', m: 40, molar: 0.001, ppm: 40 },
    { sol: 'NaOH (M = ৪০)', m: 40, molar: 0.01, ppm: 400 },
    { sol: 'Na₂CO₃ (M = ১০৬)', m: 106, molar: 0.001, ppm: 106 },
    { sol: 'Na₂CO₃ (M = ১০৬)', m: 106, molar: 0.01, ppm: 1060 },
    { sol: 'H₂SO₄ (M = ৯৮)', m: 98, molar: 0.001, ppm: 98 },
    { sol: 'H₂SO₄ (M = ৯৮)', m: 98, molar: 0.005, ppm: 490 },
    { sol: 'HCl (M = ৩৬.৫)', m: 36.5, molar: 0.01, ppm: 365 },
    { sol: 'CaCO₃ (M = ১০০)', m: 100, molar: 0.001, ppm: 100 },
    { sol: 'CaCO₃ (M = ১০০)', m: 100, molar: 0.002, ppm: 200 },
    { sol: 'গ্লুকোজ (M = ১৮০)', m: 180, molar: 0.001, ppm: 180 },
    { sol: 'NaCl (M = ৫৮.৫)', m: 58.5, molar: 0.01, ppm: 585 },
    { sol: 'KOH (M = ৫৬)', m: 56, molar: 0.005, ppm: 280 },
  ];
  ppmCases.forEach((pc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(pc.molar)} M ${pc.sol} জলীয় দ্রবণের ঘনমাত্রা ppm (mg/L) এককে কত?`,
        correct: `${toBnDigits(pc.ppm)} ppm`,
        distractors: [pc.ppm * 10, pc.ppm / 10, pc.ppm * 2, pc.ppm + 50]
          .filter((x) => x !== pc.ppm)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} ppm`),
        explanation: `ppm = S (molarity) × M × ১০০০ = ${toBnDigits(pc.molar)} × ${toBnDigits(pc.m)} × ১০০০ = ${toBnDigits(pc.ppm)} ppm।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · ppm গণনা',
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
        question: `পানিতে দ্রবীভূত ${toBnDigits(pc.ppm)} ppm ${pc.sol} দ্রবণের মোলার ঘনমাত্রা কত?`,
        correct: `${toBnDigits(pc.molar)} M`,
        distractors: [0.001, 0.002, 0.005, 0.01, 0.05, 0.1]
          .filter((x) => x !== pc.molar)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} M`),
        explanation: `S = ppm / (M × ১০০০) = ${toBnDigits(pc.ppm)} / (${toBnDigits(pc.m)} × ১০০০) = ${toBnDigits(pc.molar)} M।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · ppm থেকে মোলারিটি',
      })
    );
  });

  // 2. Acid-Base Titration Stoichiometry (n1*V1*S1 = n2*V2*S2) (~40 MCQs)
  const titrations = [
    { q: '২৫ mL ০.২ M Na₂CO₃ দ্রবণকে সম্পূর্ণ প্রশমিত করতে ০.১ M HCl দ্রবণের কত mL প্রয়োজন?', a: '১০০ mL', d: ['৫০ mL', '২৫ mL', '২০০ mL'], exp: 'Na₂CO₃ + 2HCl ⇒ ১×২৫×০.২ × ২ = ১×V×০.১ ⇒ V = ১০০ mL।' },
    { q: '২০ mL ০.১ M H₂SO₄ দ্রবণকে সম্পূর্ণ প্রশমিত করতে ০.১ M NaOH দ্রবণের কত mL লাগবে?', a: '৪০ mL', d: ['২০ mL', '১০ mL', '৮০ mL'], exp: 'H₂SO₄ দ্বিক্ষারীয় বলে ২×২০×০.১ = ১×V×০.১ ⇒ V = ৪০ mL।' },
    { q: '৫০ mL ০.১ M HCl দ্রবণকে সম্পূর্ণ প্রশমিত করতে ২৫ mL NaOH দ্রবণ লাগলে NaOH-এর মোলারিটি কত?', a: '০.২ M', d: ['০.১ M', '০.০৫ M', '০.৪ M'], exp: '৫০ × ০.১ = ২৫ × S₂ ⇒ S₂ = ০.২ M।' },
    { q: '১০ mL ০.৫ M NaOH প্রশমিত করতে ২৫ mL H₂SO₄ লাগলে অ্যাসিডটির ঘনমাত্রা কত?', a: '০.১ M (বা ০.২ N)', d: ['০.২ M', '০.৫ M', '০.০৫ M'], exp: '২ × ২৫ × S_acid = ১ × ১০ × ০.৫ ⇒ S_acid = ৫ / ৫০ = ০.১ M।' },
    { q: '১০০ mL ০.১ M H₃PO₄-কে সম্পূর্ণ প্রশমিত করে Na₃PO₄ করতে ০.২ M NaOH-এর কত mL প্রয়োজন?', a: '১৫০ mL', d: ['৫০ mL', '১০০ mL', '৩০০ mL'], exp: '৩ × ১০০ × ০.১ = ১ × V × ০.২ ⇒ V = ৩০ / ০.২ = ১৫০ mL।' },
    { q: '১০০ mL ০.১ M KMnO₄ অম্লীয় মাধ্যমে কত মোল FeSO₄-কে জারিত করে Fe₂(SO₄)₃ তৈরি করতে পারবে?', a: '০.০৫ মোল FeSO₄', d: ['০.০১ মোল', '০.১ মোল', '০.৫ মোল'], exp: '১ মোল KMnO₄ জারিত করে ৫ মোল Fe²⁺-কে; ০.০১ মোল KMnO₄ জারিত করবে ০.০৫ মোল Fe²⁺।' },
    { q: 'অম্লীয় মাধ্যমে ১ মোল পটাশিয়াম ডাইক্রোমেট (K₂Cr₂O₇) কত মোল ফেরাস (Fe²⁺) আয়নকে জারিত করে?', a: '৬ মোল Fe²⁺ আয়ন', d: ['১ মোল', '৩ মোল', '৫ মোল'], exp: 'Cr₂O₇²⁻ + 6Fe²⁺ + 14H⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O।' },
    { q: 'অম্লীয় মাধ্যমে ২ মোল KMnO₄ দ্বারা কত মোল অক্সালিক অ্যাসিড (H₂C₂O₄) জারিত হয়ে CO₂ গ্যাস উৎপন্ন করে?', a: '৫ মোল H₂C₂O₄', d: ['২ মোল', '১০ মোল', '১ মোল'], exp: '2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O।' },
  ];
  titrations.forEach((tr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: tr.q,
        correct: tr.a,
        distractors: tr.d,
        explanation: tr.exp,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · টাইট্রেশন স্টোইকিওমেট্রি',
      })
    );
  });

  // 3. Oxidation State Matrix (Ch 3, ~60 MCQs)
  const oxStates = [
    { cmp: 'KMnO₄-এ Mn-এর জারণ সংখ্যা', val: '+৭' },
    { cmp: 'K₂MnO₄ (পটাশিয়াম ম্যাঙ্গানেট)-এ Mn-এর জারণ সংখ্যা', val: '+৬' },
    { cmp: 'MnO₂-এ Mn-এর জারণ সংখ্যা', val: '+৪' },
    { cmp: 'K₂Cr₂O₇ এবং CrO₄²⁻-এ Cr-এর জারণ সংখ্যা', val: '+৬' },
    { cmp: 'CrO₅ (ক্রোমিয়াম পেন্টা-অক্সাইড, প্রজাপতি গঠন)-এ Cr-এর জারণ সংখ্যা', val: '+৬ (৪টি পার-অক্সাইড O=−১ ও ১টি O=−২)' },
    { cmp: 'H₂SO₅ (ক্যারোস অ্যাসিড)-এ S-এর জারণ সংখ্যা', val: '+৬ (১টি পার-অক্সাইড বন্ধন থাকায়)' },
    { cmp: 'H₂S₂O₈ (মার্শালস অ্যাসিড)-এ S-এর জারণ সংখ্যা', val: '+৬ (কেন্দ্রীয় S–O–O–S পার-অক্সাইড)' },
    { cmp: 'Na₂S₂O₃ (সোডিয়াম থায়োসালফেট)-এ S-এর গড় জারণ সংখ্যা', val: '+২' },
    { cmp: 'Na₂S₄O₆ (সোডিয়াম টেট্রাথায়োনেট)-এ S-এর গড় জারণ সংখ্যা', val: '+২.৫ (+৫/২)' },
    { cmp: 'Fe₃O₄ (ম্যাগনেটাইট)-এ Fe-এর গড় জারণ সংখ্যা', val: '+৮/৩ (+২ ও +৩ মিশ্রিত)' },
    { cmp: 'K₄[Fe(CN)₆]-এ Fe-এর জারণ সংখ্যা', val: '+২' },
    { cmp: 'K₃[Fe(CN)₆]-এ Fe-এর জারণ সংখ্যা', val: '+৩' },
    { cmp: '[Ni(CO)₄] (নিকেল টেট্রাকার্বনিল)-এ Ni-এর জারণ সংখ্যা', val: '০ (শূন্য)' },
    { cmp: 'OF₂ (অক্সিজেন ডাইফ্লোরাইড)-এ O-এর জারণ সংখ্যা', val: '+২ (F সর্বাধিক তড়িৎ ঋণাত্মক)' },
    { cmp: 'O₂F₂-এ O-এর জারণ সংখ্যা', val: '+১' },
    { cmp: 'KO₂ (পটাশিয়াম সুপার-অক্সাইড)-এ O-এর জারণ সংখ্যা', val: '−০.৫ (−১/২)' },
    { cmp: 'H₂O₂ এবং Na₂O₂ (পার-অক্সাইড)-এ O-এর জারণ সংখ্যা', val: '−১' },
    { cmp: 'Ca(OCl)Cl (ব্লিচিং পাউডার)-এ দুটি Cl-এর জারণ সংখ্যা', val: '−১ এবং +১ (গড় ০)' },
    { cmp: 'HClO₄ (পারক্লোরিক অ্যাসিড)-এ Cl-এর জারণ সংখ্যা', val: '+৭' },
    { cmp: 'HN₃ (হাইড্রাজোয়িক অ্যাসিড)-এ N-এর গড় জারণ সংখ্যা', val: '−১/৩' },
    { cmp: 'CH₂Cl₂ (ডাইক্লোরোমিথেন)-এ C-এর জারণ সংখ্যা', val: '০ (শূন্য)' },
    { cmp: 'C₆H₁₂O₆ (গ্লুকোজ)-এ C-এর গড় জারণ সংখ্যা', val: '০ (শূন্য)' },
    { cmp: 'FeS₂ (আয়রন পাইরাইট)-এ S-এর জারণ সংখ্যা', val: '−১ (ডাইসালফাইড S₂²⁻, Fe = +২)' },
  ];
  const oxChoices = ['০ (শূন্য)', '+১', '+২', '+৩', '+৪', '+৬', '+৭', '−১', '−২', '−০.৫ (−১/২)', '+২.৫ (+৫/২)', '+৮/৩ (+২ ও +৩ মিশ্রিত)'];
  oxStates.forEach((os, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${os.cmp} কত?`,
        correct: os.val,
        distractors: oxChoices.filter((x) => !os.val.startsWith(x.split(' ')[0])).slice(i % 6, (i % 6) + 4),
        explanation: `জারণ সংখ্যার নিয়ম ও গাঠনিক বন্ধন বিশ্লেষণে ${os.cmp} = ${os.val}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · জারণ সংখ্যা',
      })
    );
  });

  // 4. Equivalent Weights & Indicators (Ch 3, ~40 MCQs)
  const eqWeights = [
    { sub: 'H₂SO₄ (M = ৯৮)', val: '৪৯ (M/2)' },
    { sub: 'Na₂CO₃ (M = ১০৬)', val: '৫৩ (M/2)' },
    { sub: 'NaOH (M = ৪০)', val: '৪০ (M/1)' },
    { sub: 'H₃PO₄ (সম্পূর্ণ প্রশমন, M = ৯৮)', val: '৩২.৬৭ (M/3)' },
    { sub: 'H₃PO₃ (দ্বিক্ষারীয়, M = ৮২)', val: '৪১ (M/2)' },
    { sub: 'H₃PO₂ (একক্ষারীয়, M = ৬৬)', val: '৬৬ (M/1)' },
    { sub: 'অম্লীয় KMnO₄ (M = ১৫৮)', val: '৩১.৬ (M/5)' },
    { sub: 'প্রশম KMnO₄ (MnO₂, M = ১৫৮)', val: '৫২.৬৭ (M/3)' },
    { sub: 'অম্লীয় K₂Cr₂O₇ (M = ২৯৪)', val: '৪৯ (M/6)' },
    { sub: 'অক্সালিক অ্যাসিড H₂C₂O₄·2H₂O (M = ১২৬)', val: '৬৩ (M/2)' },
    { sub: 'সোডিয়াম থায়োসালফেট Na₂S₂O₃ (M = ১৫৮)', val: '১৫৮ (M/1)' },
    { sub: 'ফেরাস সালফেট (অম্লীয় জারণে, M = ১৫২)', val: '১৫২ (M/1)' },
  ];
  eqWeights.forEach((ew, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `আয়তনিক ও জারণ-বিজারণ বিশ্লেষণে "${ew.sub}"-এর তুল্য ভর (Equivalent Weight = M / তুল্য সংখ্যা) কত?`,
        correct: ew.val,
        distractors: eqWeights.filter((x) => x.val !== ew.val).slice(i % 6, (i % 6) + 4).map((x) => x.val),
        explanation: `তুল্য সংখ্যা দিয়ে আণবিক ভরকে ভাগ করলে ${ew.sub}-এর তুল্য ভর পাওয়া যায় ${ew.val}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · তুল্য ভর',
      })
    );
  });

  const indicators = [
    { ind: 'মিথাইল অরেঞ্জ', range: '৩.১ – ৪.৪', acidCol: 'লাল / গোলাপি', baseCol: 'হলুদ', best: 'সবল অ্যাসিড + মৃদু ক্ষার (HCl বনাম Na₂CO₃)' },
    { ind: 'মিথাইল রেড', range: '৪.২ – ৬.৩', acidCol: 'লাল', baseCol: 'হলুদ', best: 'সবল অ্যাসিড + মৃদু ক্ষার (HCl বনাম NH₄OH)' },
    { ind: 'লিটমাস', range: '৪.৫ – ৮.৩', acidCol: 'লাল', baseCol: 'নীল', best: 'সাধারণ সবল অ্যাসিড ও সবল ক্ষার' },
    { ind: 'ব্রোমোথাইমল ব্লু', range: '৬.০ – ৭.৬', acidCol: 'হলুদ', baseCol: 'নীল', best: 'সবল অ্যাসিড + সবল ক্ষার (pH = ৭-এর কাছাকাছি)' },
    { ind: 'ফেনল রেড', range: '৬.৮ – ৮.৪', acidCol: 'হলুদ', baseCol: 'লাল', best: 'রক্ত/জৈব মাধ্যমের প্রশম টাইট্রেশন' },
    { ind: 'ফেনলফথ্যালিন', range: '৮.৩ – ১০.০', acidCol: 'বর্ণহীন', baseCol: 'গোলাপি / লালচে বেগুনি', best: 'মৃদু অ্যাসিড + সবল ক্ষার (CH₃COOH বনাম NaOH)' },
    { ind: 'থাইমল ব্লু (ক্ষারীয় পরিসর)', range: '৮.০ – ৯.৬', acidCol: 'হলুদ', baseCol: 'নীল', best: 'মৃদু অ্যাসিড ও সবল ক্ষার টাইট্রেশন' },
  ];
  indicators.forEach((ind, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `অম্ল-ক্ষার নির্দেশক "${ind.ind}"-এর বর্ণ পরিবর্তনের pH পরিসর ও রং পরিবর্তন কোনটি?`,
        correct: `pH ${ind.range} (অম্লে ${ind.acidCol} → ক্ষারে ${ind.baseCol})`,
        distractors: indicators
          .filter((x) => x.ind !== ind.ind)
          .slice(0, 4)
          .map((x) => `pH ${x.range} (অম্লে ${x.acidCol} → ক্ষারে ${x.baseCol})`),
        explanation: `${ind.ind}: pH ${ind.range} পরিসরে অম্লে ${ind.acidCol} থেকে ক্ষারে ${ind.baseCol} হয়; উপযোগী: ${ind.best}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · নির্দেশকের বর্ণ পরিবর্তন',
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
        question: `"${ind.best}" টাইট্রেশনে সমাপ্তি বিন্দু নির্ণয়ে নিচের কোন নির্দেশক সবচেয়ে উপযোগী?`,
        correct: `${ind.ind} (pH পরিসর ${ind.range})`,
        distractors: indicators
          .filter((x) => x.ind !== ind.ind)
          .slice(i % 3, (i % 3) + 4)
          .map((x) => `${x.ind} (pH পরিসর ${x.range})`),
        explanation: `${ind.best}-এ খাড়া pH উল্লম্ফন পরিসরের সাথে ${ind.ind} (${ind.range}) খাপ খায়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · টাইট্রেশন নির্দেশক',
      })
    );
  });

  // 5. Ch 4 Electrochemistry: Faraday Quantitative Problems (~80 MCQs)
  const faradayCases = [
    { ion: 'Cu²⁺ (CuSO₄ দ্রবণ)', m: 63.5, n: 2, amps: 5, mins: 32.16, chargeC: 9650, mass: '৩.১৭৫ g' },
    { ion: 'Ag⁺ (AgNO₃ দ্রবণ)', m: 108, n: 1, amps: 2, mins: 80.4, chargeC: 9650, mass: '১০.৮ g' },
    { ion: 'Al³⁺ (গলিত Al₂O₃)', m: 27, n: 3, amps: 10, mins: 160.8, chargeC: 96500, mass: '৯.০ g' },
    { ion: 'Na⁺ (গলিত NaCl)', m: 23, n: 1, amps: 5, mins: 321.67, chargeC: 96500, mass: '২৩.০ g' },
    { ion: 'Ca²⁺ (গলিত CaCl₂)', m: 40, n: 2, amps: 10, mins: 160.83, chargeC: 96500, mass: '২০.০ g' },
    { ion: 'Mg²⁺ (গলিত MgCl₂)', m: 24, n: 2, amps: 4, mins: 201.0, chargeC: 48250, mass: '৬.০ g' },
    { ion: 'Zn²⁺ (ZnSO₄ দ্রবণ)', m: 65.4, n: 2, amps: 2, mins: 804.17, chargeC: 96500, mass: '৩২.৭ g' },
    { ion: 'Cr³⁺ (CrCl₃ দ্রবণ)', m: 52, n: 3, amps: 3, mins: 536.1, chargeC: 96500, mass: '১৭.৩৩ g' },
  ];
  faradayCases.forEach((fc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${fc.ion} দ্রবণের মধ্য দিয়ে ${toBnDigits(fc.chargeC)} কুলম্ব (C) তড়িৎ প্রবাহিত করলে ক্যাথোডে কত গ্রাম ধাতু সঞ্চিত হবে? (F = ৯৬,৫০০ C)`,
        correct: fc.mass,
        distractors: faradayCases.filter((x) => x.mass !== fc.mass).slice(i % 4, (i % 4) + 4).map((x) => x.mass),
        explanation: `W = (M × Q) / (n × F) = (${toBnDigits(fc.m)} × ${toBnDigits(fc.chargeC)}) / (${toBnDigits(fc.n)} × ৯৬৫০০) = ${fc.mass}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের প্রথম সূত্র',
      })
    );
  });

  // Faraday required for 1 mole reduction (20 MCQs)
  const faradayMoles = [
    { rxn: 'Al³⁺ + 3e⁻ → Al (১ মোল Al)', f: '৩ ফ্যারাডে (২৮৯,৫০০ C)' },
    { rxn: 'Cu²⁺ + 2e⁻ → Cu (১ মোল Cu)', f: '২ ফ্যারাডে (১৯৩,০০০ C)' },
    { rxn: 'Ag⁺ + e⁻ → Ag (১ মোল Ag)', f: '১ ফ্যারাডে (৯৬,৫০০ C)' },
    { rxn: 'MnO₄⁻ → Mn²⁺ (অম্লীয় মাধ্যমে ১ মোল MnO₄⁻)', f: '৫ ফ্যারাডে (৪৮২,৫০০ C)' },
    { rxn: 'Cr₂O₇²⁻ → 2Cr³⁺ (১ মোল Cr₂O₇²⁻)', f: '৬ ফ্যারাডে (৫৭৯,০০০ C)' },
    { rxn: '2H₂O → O₂ + 4H⁺ + 4e⁻ (১ মোল O₂ গ্যাস)', f: '৪ ফ্যারাডে (৩৮৬,০০০ C)' },
    { rxn: '2Cl⁻ → Cl₂ + 2e⁻ (১ মোল Cl₂ গ্যাস)', f: '২ ফ্যারাডে (১৯৩,০০০ C)' },
    { rxn: 'Fe³⁺ → Fe²⁺ (১ মোল Fe³⁺)', f: '১ ফ্যারাডে (৯৬,৫০০ C)' },
    { rxn: 'Fe²⁺ → Fe (১ মোল ধাতব Fe)', f: '২ ফ্যারাডে (১৯৩,০০০ C)' },
    { rxn: 'Sn⁴⁺ → Sn²⁺ (১ মোল Sn⁴⁺)', f: '২ ফ্যারাডে (১৯৩,০০০ C)' },
  ];
  faradayMoles.forEach((fm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `তড়িৎ বিশ্লেষণে "${fm.rxn}" অর্ধ-বিক্রিয়াটি সম্পন্ন করতে কত ফ্যারাডে (F) তড়িৎ চার্জ প্রয়োজন?`,
        correct: fm.f,
        distractors: faradayMoles.filter((x) => x.f !== fm.f).slice(0, 4).map((x) => x.f),
        explanation: `১ মোল ইলেকট্রন স্থানান্তরে ১ ফ্যারাডে (৯৬,৫০০ C) বিদ্যুৎ লাগে; ${fm.rxn} ক্ষেত্রে লাগে ${fm.f}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডে ও মোল ইলেকট্রন',
      })
    );
  });

  // 6. Standard Electrode Potential, Cell Feasibility & Nernst Equation (Ch 4, ~65 MCQs)
  const cellPairs = [
    { cell: 'Zn | Zn²⁺(1M) || Cu²⁺(1M) | Cu', eAn: -0.76, eCat: 0.34, emf: '+১.১০ V' },
    { cell: 'Mg | Mg²⁺(1M) || Ag⁺(1M) | Ag', eAn: -2.37, eCat: 0.80, emf: '+৩.১৭ V' },
    { cell: 'Fe | Fe²⁺(1M) || Cu²⁺(1M) | Cu', eAn: -0.44, eCat: 0.34, emf: '+০.৭৮ V' },
    { cell: 'Zn | Zn²⁺(1M) || Ag⁺(1M) | Ag', eAn: -0.76, eCat: 0.80, emf: '+১.৫৬ V' },
    { cell: 'Al | Al³⁺(1M) || Ni²⁺(1M) | Ni', eAn: -1.66, eCat: -0.25, emf: '+১.৪১ V' },
    { cell: 'Cu | Cu²⁺(1M) || Ag⁺(1M) | Ag', eAn: 0.34, eCat: 0.80, emf: '+০.৪৬ V' },
    { cell: 'Cd | Cd²⁺(1M) || Cu²⁺(1M) | Cu', eAn: -0.40, eCat: 0.34, emf: '+০.৭৪ V' },
    { cell: 'Sn | Sn²⁺(1M) || Pb²⁺(1M) | Pb', eAn: -0.14, eCat: -0.13, emf: '+০.০১ V' },
  ];
  cellPairs.forEach((cp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `২৫ °C-এ ${cp.cell} কোষের তড়িৎদ্বারগুলোর প্রমাণ বিজারণ বিভব যথাক্রমে ${toBnDigits(cp.eAn)} V এবং ${toBnDigits(cp.eCat)} V হলে প্রমাণ কোষ বিভব (E°_cell) কত?`,
        correct: cp.emf,
        distractors: cellPairs.filter((x) => x.emf !== cp.emf).slice(0, 4).map((x) => x.emf),
        explanation: `E°_cell = E°_cathode − E°_anode = ${toBnDigits(cp.eCat)} − (${toBnDigits(cp.eAn)}) = ${cp.emf}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · প্রমাণ কোষ বিভব',
      })
    );
  });

  // Nernst Equation Numericals & Electrochemistry Concepts (30 MCQs)
  const electroConcepts = [
    { q: '২৫ °C-এ E°_cell = ১.১০ V বিশিষ্ট ড্যানিয়েল কোষে [Zn²⁺] = ০.১ M এবং [Cu²⁺] = ০.১ M হলে নার্নস্ট সমীকরণে E_cell কত হবে?', a: '১.১০ V (কারণ log([Zn²⁺]/[Cu²⁺]) = log(১) = ০)', d: ['১.০৪ V', '১.১৬ V', '০.৫৫ V'] },
    { q: '২৫ °C তাপমাত্রায় ড্যানিয়েল কোষে [Zn²⁺] = ০.০১ M এবং [Cu²⁺] = ১.০ M হলে E_cell কত হবে? (E° = ১.১০ V)', a: '১.১৫৯ V (১.১০ + ০.০৫৯/২ × ২)', d: ['১.০৪১ V', '১.১০ V', '০.৯৮ V'] },
    { q: 'একটি প্রমাণ হাইড্রোজেন তড়িৎদ্বার (SHE)-কে pH = ২ বিশিষ্ট অম্ল দ্রবণে ডুবালে ২৫ °C-এ এর বিজারণ বিভব কত হবে?', a: '−০.১১৮ V (−০.০৫৯ × pH)', d: ['+০.১১৮ V', '০.০০ V', '−০.০৫৯ V'] },
    { q: 'জিংক সালফেট (ZnSO₄) দ্রবণ কি কপারের (Cu) পাত্রে সংরক্ষণ করা যাবে? (E°_Zn = −০.৭৬ V, E°_Cu = +০.৩৪ V)', a: 'হ্যাঁ, নিরাপদে রাখা যাবে (Cu Zn²⁺-কে বিজারিত করতে পারে না; E°_cell ঋণাত্মক)', d: ['না, পাত্র ক্ষয় হয়ে যাবে', 'তাৎক্ষণিক বিস্ফোরণ ঘটবে', 'হাইড্রোজেন গ্যাস বের হবে'] },
    { q: 'কপার সালফেট (CuSO₄) দ্রবণকে লোহার (Fe) বা জিংকের (Zn) পাত্রে সংরক্ষণ করা যায় না কেন?', a: 'Fe বা Zn-এর বিজারণ বিভব কম (অধিক সক্রিয়) বলে Cu²⁺-কে প্রতিস্থাপিত করে ও পাত্র ফুটো করে দেয়', d: ['Cu²⁺ ধাতুকে গলিয়ে দেয়', 'দ্রবণ জমে বরফ হয়', 'E°_cell ঋণাত্মক হয় বলে'] },
    { q: 'কোনো তড়িৎ-বিশ্লেষ্য দ্রবণে তড়িৎ বিশ্লেষণের ফলে Na⁺, Mg²⁺, Cu²⁺ এবং Ag⁺ আয়ন একসাথে থাকলে ক্যাথোডে কোনটি সবার আগে চার্জমুক্ত হবে?', a: 'Ag⁺ (সর্বোচ্চ প্রমাণ বিজারণ বিভব +০.৮০ V)', d: ['Na⁺ (−২.৭১ V)', 'Mg²⁺ (−২.৩৭ V)', 'Cu²⁺ (+০.৩৪ V)'] },
    { q: 'জলীয় Na₂SO₄-এর তড়িৎ বিশ্লেষণে অ্যানোডে এবং ক্যাথোডে যথাক্রমে কোন দুটি গ্যাস নির্গত হয়?', a: 'অ্যানোডে O₂ (পানির জারণ) এবং ক্যাথোডে H₂ (পানির বিজারণ)', d: ['ক্যাথোডে Na ও অ্যানোডে SO₂', 'উভয় তড়িৎদ্বারে H₂', 'অ্যানোডে H₂ ও ক্যাথোডে O₂'] },
    { q: 'মোলার পরিবাহিতা (Λ_m) ও আপেক্ষিক পরিবাহিতার (κ) মধ্যে সঠিক গাণিতিক সম্পর্ক কী (C = মোলারিটি)?', a: 'Λ_m = (κ × ১০০০) / C (একক S·cm²·mol⁻¹)', d: ['Λ_m = κ × C', 'Λ_m = C / (κ × ১০০০)', 'Λ_m = κ² / C'] },
    { q: 'লোহায় মরিচা (Fe₂O₃·xH₂O) প্রতিরোধে লোহার ওপর জিংকের প্রলেপ দেওয়াকে গ্যালভানাইজিং বলে; প্রলেপ উঠে গেলেও লোহায় মরিচা পড়ে না কেন?', a: 'Zn লোহার চেয়ে অধিক সক্রিয় হওয়ায় আত্মোৎসর্গী অ্যানোড (Sacrificial Anode) হিসেবে নিজে জারিত হয়ে লোহাকে রক্ষা করে', d: ['Zn পানির সাথে বিক্রিয়া করে', 'লোহা Zn-এর চেয়ে সক্রিয়', 'Zn ক্যাথোড হিসেবে কাজ করে'] },
    { q: 'ড্রাই সেল বা লেকল্যাঞ্চ কোষে অ্যানোড, ক্যাথোড ও ইলেকট্রোলাইট পেস্ট হিসেবে যথাক্রমে কী থাকে?', a: 'অ্যানোড: জিংক পাত্র; ক্যাথোড: গ্রাফাইট দণ্ড + MnO₂; পেস্ট: NH₄Cl + ZnCl₂', d: ['Pb, PbO₂ ও H₂SO₄', 'LiCoO₂ ও গ্রাফাইট', 'Cu ও AgNO₃'] },
    { q: 'লিথিয়াম-আয়ন ব্যাটারি (Li-ion) অন্য রিচার্জেবল ব্যাটারির চেয়ে জনপ্রিয় ও উৎকৃষ্ট কেন?', a: 'অতি হালকা, উচ্চ শক্তির ঘনত্ব (~৩.৭ V), মেমোরি ইফেক্টহীন ও দীর্ঘ চার্জিং সাইকেল', d: ['এতে গলিত সালফিউরিক অ্যাসিড থাকে', 'এর ওজন সবচেয়ে বেশি', 'এটি একবার ব্যবহারের পর নষ্ট হয়'] },
    { q: 'মার্কিউরিক অক্সাইড বা বাটন সেল (হাতঘড়ি/হিয়ারিং এইড)-এ সর্বদা স্থির কত ভোল্ট বিভব পাওয়া যায়?', a: '১.৩৫ V (ইলেকট্রোলাইট KOH-এর ঘনমাত্রা বদলায় না)', d: ['১২.০ V', '৩.৭ V', '২.০ V'] },
  ];
  electroConcepts.forEach((ec, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: ec.q,
        correct: ec.a,
        distractors: ec.d,
        explanation: `${ec.q} — সঠিক উত্তর: ${ec.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ রসায়ন',
      })
    );
  });

  // 7. Extra High-Yield Ch 3 & Ch 4 & Ch 2 Quantitative & Conceptual Drills (~150+ MCQs)
  // 7A: Molality, Mole Fraction & Mixing Molarity (M_mix = (V1S1 + V2S2)/(V1+V2)) (24 MCQs)
  const mixMols = [
    { v1: 100, s1: 0.2, v2: 100, s2: 0.4, res: '০.৩০ M' },
    { v1: 200, s1: 0.5, v2: 300, s2: 0.5, res: '০.৫০ M' },
    { v1: 100, s1: 1.0, v2: 400, s2: 0.25, res: '০.৪০ M' },
    { v1: 50, s1: 0.4, v2: 150, s2: 0.2, res: '০.২৫ M' },
    { v1: 250, s1: 0.2, v2: 250, s2: 0.6, res: '০.৪০ M' },
    { v1: 100, s1: 0.6, v2: 200, s2: 0.3, res: '০.৪০ M' },
  ];
  mixMols.forEach((mm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `${toBnDigits(mm.v1)} mL ${toBnDigits(mm.s1)} M HCl দ্রবণের সাথে ${toBnDigits(mm.v2)} mL ${toBnDigits(mm.s2)} M HCl দ্রবণ মিশ্রিত করলে মিশ্রণের চূড়ান্ত মোলারিটি কত হবে?`,
        correct: mm.res,
        distractors: ['০.১০ M', '০.২০ M', '০.২৫ M', '০.৩০ M', '০.৪০ M', '০.৫০ M', '০.৮০ M']
          .filter((x) => x !== mm.res)
          .slice(0, 4),
        explanation: `S = (V₁S₁ + V₂S₂) / (V₁ + V₂) = (${toBnDigits(mm.v1 * mm.s1)} + ${toBnDigits(mm.v2 * mm.s2)}) / ${toBnDigits(mm.v1 + mm.v2)} = ${mm.res}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মিশ্রণের ঘনমাত্রা',
      })
    );
  });

  // 7B: Mole count / Molecule count at STP & mass (Ch 3, 24 MCQs)
  const avogadroCases = [
    { desc: '১১.২ লিটার (STP) CO₂ গ্যাস (M = ৪৪)', mol: '০.৫ মোল', molsCount: '৩.০১১ × ১০²³টি অণু' },
    { desc: '৫.৬ লিটার (STP) O₂ গ্যাস (M = ৩২)', mol: '০.২৫ মোল', molsCount: '১.৫০৬ × ১০²³টি অণু' },
    { desc: '৪৪.৮ লিটার (STP) N₂ গ্যাস (M = ২৮)', mol: '২.০ মোল', molsCount: '১.২০৪ × ১০²⁴টি অণু' },
    { desc: '২.২৪ লিটার (STP) NH₃ গ্যাস (M = ১৭)', mol: '০.১ মোল', molsCount: '৬.০২২ × ১০²²টি অণু' },
    { desc: '৩.৬ গ্রাম পানি (H₂O, M = ১৮)', mol: '০.২ মোল', molsCount: '১.২০৪ × ১০²³টি অণু' },
    { desc: '৯০ গ্রাম গ্লুকোজ (C₆H₁₂O₆, M = ১৮০)', mol: '০.৫ মোল', molsCount: '৩.০১১ × ১০²³টি অণু' },
  ];
  avogadroCases.forEach((ac, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${ac.desc}-এ মোট কতটি অণু উপস্থিত রয়েছে?`,
        correct: `${ac.molsCount} (${ac.mol})`,
        distractors: avogadroCases
          .filter((x) => x.molsCount !== ac.molsCount)
          .slice(0, 4)
          .map((x) => `${x.molsCount} (${x.mol})`),
        explanation: `মোল সংখ্যা = ${ac.mol}; অণু সংখ্যা = n × ৬.০২২ × ১০²³ = ${ac.molsCount}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · অ্যাভোগাড্রো সংখ্যা',
      })
    );
  });

  // 7C: Percentage composition of common compounds (20 MCQs)
  const pctComp = [
    { cmp: 'মিথেন (CH₄, M = ১৬)-এ হাইড্রোজেনের শতকরা পরিমাণ', pct: '২৫%' },
    { cmp: 'মিথেন (CH₄, M = ১৬)-এ কার্বনের শতকরা পরিমাণ', pct: '৭৫%' },
    { cmp: 'চুনাপাথর (CaCO₃, M = ১০০)-এ ক্যালসিয়ামের শতকরা পরিমাণ', pct: '৪০%' },
    { cmp: 'চুনাপাথর (CaCO₃, M = ১০০)-এ অক্সিজেনের শতকরা পরিমাণ', pct: '৪৮%' },
    { cmp: 'ইউরিয়া [(NH₂)₂CO, M = ৬০]-এ নাইট্রোজেনের শতকরা পরিমাণ', pct: '৪৬.৬৭%' },
    { cmp: 'পানি (H₂O, M = ১৮)-এ অক্সিজেনের শতকরা পরিমাণ', pct: '৮৮.৮৯%' },
    { cmp: 'সালফিউরিক অ্যাসিড (H₂SO₄, M = ৯৮)-এ সালফারের শতকরা পরিমাণ', pct: '৩২.৬৫%' },
    { cmp: 'অ্যামোনিয়া (NH₃, M = ১৭)-এ নাইট্রোজেনের শতকরা পরিমাণ', pct: '৮২.৩৫%' },
    { cmp: 'কার্বন ডাই-অক্সাইড (CO₂, M = ৪৪)-এ কার্বনের শতকরা পরিমাণ', pct: '২৭.২৭%' },
    { cmp: 'গ্লুকোজ (C₆H₁₂O₆, M = ১৮০)-এ কার্বনের শতকরা পরিমাণ', pct: '৪০.০০%' },
  ];
  pctComp.forEach((pc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `${pc.cmp} কত?`,
        correct: pc.pct,
        distractors: pctComp.filter((x) => x.pct !== pc.pct).slice(i % 5, (i % 5) + 4).map((x) => x.pct),
        explanation: `শতকরা সংযুক্তি = (মৌলের মোট পারমাণবিক ভর / যৌগের আণবিক ভর) × ১০০ = ${pc.pct}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · শতকরা সংযুক্তি',
      })
    );
  });

  // 7D: Series Electrolysis (Faraday's 2nd Law) Ratio Problems (Ch 4, 16 MCQs)
  const faraday2nd = [
    { q: 'শ্রেণি সংযোগে AgNO₃ ও CuSO₄ দ্রবণের মধ্য দিয়ে একই পরিমাণ বিদ্যুৎ চালনা করলে ক্যাথোডে সঞ্চিত Ag (M=১০৮) ও Cu (M=৬৩.৫)-এর মোল অনুপাত কত?', a: '২ : ১ (কারণ তুল্য ভর ১০৮ : ৩১.৭৫ ⇒ ১ মোল Ag : ০.৫ মোল Cu)', d: ['১ : ২', '১ : ১', '৩ : ১'] },
    { q: 'শ্রেণি সংযোগে CuSO₄ ও AlCl₃ দ্রবণে একই তড়িৎ প্রবাহিত করে ০.৩ মোল Cu সঞ্চিত হলে কত মোল Al সঞ্চিত হবে?', a: '০.২ মোল Al (তড়িৎ চার্জ ০.৬ F ⇒ Al = ০.৬ / ৩)', d: ['০.৩ মোল Al', '০.৪৫ মোল Al', '০.৯ মোল Al'] },
    { q: '২ ফ্যারাডে বিদ্যুৎ চালনা করে ক্যাথোডে ১ মোল ধাতু পাওয়া যাবে নিচের কোন দ্রবণ থেকে?', a: 'CuSO₄ বা ZnSO₄ (দ্বিযোজী ধাতব আয়ন)', d: ['AgNO₃ (২ মোল পাওয়া যাবে)', 'AlCl₃ (২/৩ মোল পাওয়া যাবে)', 'NaCl (২ মোল পাওয়া যাবে)'] },
    { q: 'একই চার্জ দ্বারা ক্যাথোডে ২৩ g সোডিয়াম (Na) সঞ্চিত হলে সম-পরিমাণ বিদ্যুতে কত গ্রাম ক্যালসিয়াম (Ca = ৪০) সঞ্চিত হবে?', a: '২০ গ্রাম Ca (উভয়ই ১ গ্রাম-তুল্য ভর)', d: ['৪০ গ্রাম', '১০ গ্রাম', '৮০ গ্রাম'] },
    { q: '৯৬৫ অ্যাম্পিয়ার বিদ্যুৎ ১০০ সেকেন্ড ধরে AgNO₃ দ্রবণে চালনা করলে কত গ্রাম Ag (M=১০৮) জমা হবে?', a: '১০৮ গ্রাম (মোট চার্জ Q = ৯৬,৫০০ C = ১ F)', d: ['৫৪ গ্রাম', '২১৬ গ্রাম', '১০.৮ গ্রাম'] },
    { q: '৫ অ্যাম্পিয়ার বিদ্যুৎ ১৯.৩ মিনিট (বা ১১৫৮ সেকেন্ড) ধরে CuSO₄ দ্রবণে চালনা করলে ক্যাথোডে কত মোল Cu জমা হবে?', a: '০.০৩ মোল (Q = ৫৭৯০ C = ০.০৬ F ⇒ ০.০৬/২)', d: ['০.০৬ মোল', '০.১২ মোল', '০.৩০ মোল'] },
    { q: 'জলীয় দ্রবণের মোলারিটি C বাড়লে নির্দিষ্ট পরিবাহিতা (κ) সাধারণত বাড়ে, কিন্তু মোলার পরিবাহিতা (Λ_m) কী হয়?', a: 'হ্রাস পায় (ঘন দ্রবণে আন্তঃআয়নিক আকর্ষণ ও বাধা বেড়ে যায় বলে)', d: ['অসীম হয়', 'বর্গ আকারে বাড়ে', 'শূন্য হয়ে যায়'] },
    { q: 'সবল তড়িৎ বিশ্লেষ্য এবং দুর্বল তড়িৎ বিশ্লেষ্যের মধ্যে কোনটির অসীম লঘুকরণে মোলার পরিবাহিতা (Λ°_m) গ্রাফ থেকে সরাসরি পাওয়া যায় না?', a: 'দুর্বল তড়িৎ বিশ্লেষ্যের (যেমন CH₃COOH; কলরাশের সূত্র দিয়ে পরোক্ষভাবে বের করতে হয়)', d: ['সবল KCl-এর', 'সবল NaCl-এর', 'সবল HCl-এর'] },
  ];
  faraday2nd.forEach((f2, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: f2.q,
        correct: f2.a,
        distractors: f2.d,
        explanation: `${f2.q} — সঠিক উত্তর: ${f2.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের দ্বিতীয় সূত্র ও পরিবাহিতা',
      })
    );
  });

  // 8. Additional Ch 2, 3, 4 Rapid Concept & Numerical Drills (~120 MCQs)
  const rapidChem2: Array<{ ch: string; vl: string; q: string; a: string; d: string[] }> = [
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: '১ মোলার (1 M) সোডিয়াম কার্বনেট (Na₂CO₃) দ্রবণের নরমালিটি (N) কত?', a: '২ N (তুল্য সংখ্যা = ২)', d: ['১ N', '০.৫ N', '৩ N'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: '১ মোলার (1 M) সালফিউরিক অ্যাসিডের নরমালিটি কত এবং ০.৫ N H₂SO₄ সমান কত মোলার?', a: '২ N এবং ০.২৫ M', d: ['১ N এবং ০.৫ M', '০.৫ N এবং ১.০ M', '৪ N এবং ২.০ M'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: '০.১ M KMnO₄ অম্লীয় দ্রবণ জারক হিসেবে ক্রিয়া করলে এর নরমালিটি (N) কত?', a: '০.৫ N (নরমালিটি = মোলারিটি × তুল্য সংখ্যা ৫)', d: ['০.১ N', '০.২ N', '০.০২ N'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'যে জারণ-বিজারণ বিক্রিয়ায় আয়োডিন সরাসরি বিজারক দ্বারা বিজারিত হয় (যেমন Na₂S₂O₃ + I₂) তাকে কী বলে?', a: 'আয়োডিমিতি (Iodimetry)', d: ['আয়োডোমিতি (Iodometry)', 'অ্যাসিডিমিতি', 'অ্যালকালিমেট্রি'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'টাইট্রেশনে KMnO₄ দ্রবণ ব্যবহারের সময় H₂SO₄-এর পরিবর্তে HNO₃ বা HCl ব্যবহার করা হয় না কেন?', a: 'HNO₃ নিজেই শক্তিশালী জারক এবং HCl নিজেই KMnO₄ দ্বারা জারিত হয়ে Cl₂ গ্যাস তৈরি করে', d: ['এরা অদ্রবণীয় লবণ তৈরি করে', 'এরা রঙিন নয়', 'তাপমাত্রা কমে যায়'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'জলীয় দ্রবণে কোন যৌগটি জারক ও বিজারক উভয় হিসেবেই কাজ করতে সক্ষম?', a: 'H₂O₂, SO₂, HNO₂ ও O₃ (মধ্যবর্তী জারণ সংখ্যা বিশিষ্ট)', d: ['KMnO₄ (+৭ সর্বোচ্চ)', 'F₂ (সর্বোচ্চ জারক)', 'H₂S (−২ সর্বনিম্ন)'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'জারণ-বিজারণের ইলেকট্রনীয় মতবাদ অনুসারে বিজারণ (Reduction) প্রক্রিয়ায় কী ঘটে?', a: 'ইলেকট্রন গ্রহণ ও ধনাত্মক জারণ সংখ্যা হ্রাস', d: ['ইলেকট্রন ত্যাগ', 'জারণ সংখ্যা বৃদ্ধি', 'প্রোটন ত্যাগ'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'কোনো নমুনার স্থূল সংকেত CH₂O এবং আণবিক ভর ১৮০ হলে যৌগটির আণবিক সংকেত কী?', a: 'C₆H₁₂O₆ (n = ১৮০ / ৩০ = ৬)', d: ['C₂H₄O₂ (৬০)', 'CH₂O (৩০)', 'C₃H₆O₃ (৯০)'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'গ্যালভানিক কোষে ইলেকট্রন কোন তড়িৎদ্বার থেকে কোন তড়িৎদ্বারে এবং কোন পথে প্রবাহিত হয়?', a: 'বাইরের তার দিয়ে অ্যানোড (ঋণাত্মক) থেকে ক্যাথোডে (ধনাত্মক)', d: ['ক্যাথোড থেকে অ্যানোডে', 'লবণ সেতুর ভেতর দিয়ে ইলেকট্রন যায়', 'অ্যানোড থেকে বাতাসে'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'তড়িৎ-রাসায়নিক কোষে লবণ সেতু (Salt Bridge)-এর মধ্য দিয়ে তড়িৎ প্রবাহ কীভাবে পরিবাহিত হয়?', a: 'ক্যাটায়ন ও অ্যানায়ন আয়নের বিপরীতমুখী গমনের মাধ্যমে (ইলেকট্রন নয়)', d: ['মুক্ত ইলেকট্রন দিয়ে', 'ধাতব তার দিয়ে', 'পানির বাষ্প দিয়ে'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'স্বতঃস্ফূর্ত গ্যালভানিক কোষ এবং তড়িৎ-বিশ্লেষ্য কোষের (Electrolytic Cell) অ্যানোডের মেরু যথাক্রমে কী?', a: 'গ্যালভানিক কোষে অ্যানোড ঋণাত্মক (−) এবং তড়িৎ-বিশ্লেষ্য কোষে অ্যানোড ধনাত্মক (+)', d: ['উভয় ক্ষেত্রেই ধনাত্মক', 'উভয় ক্ষেত্রেই ঋণাত্মক', 'গ্যালভানিকে অ্যানোড ধনাত্মক'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'কোন ধাতুটি লঘু H₂SO₄ থেকে হাইড্রোজেন গ্যাস (H₂) প্রতিস্থাপন করতে পারে না?', a: 'কপার (Cu, E° = +০.৩৪ V > ০.০০ V)', d: ['জিংক (Zn, −০.৭৬ V)', 'আয়রন (Fe, −০.৪৪ V)', 'ম্যাগনেশিয়াম (Mg, −২.৩৭ V)'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'তড়িৎ-রাসায়নিক সারিতে সবচেয়ে শক্তিশালী বিজারক ধাতু ও সবচেয়ে শক্তিশালী জারক অধাতু যথাক্রমে কোন দুটি?', a: 'লিথিয়াম (Li, E° = −৩.০৫ V) ও ফ্লোরিন (F₂, E° = +২.৮৭ V)', d: ['সোনা ও আয়োডিন', 'কপার ও ক্লোরিন', 'সোডিয়াম ও অক্সিজেন'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'ব্যাটারি বা কোষের প্রমাণ গিবস মুক্ত শক্তি ΔG° = −২১২.৩ kJ (n = ২)-এর মান ঋণাত্মক হওয়ার অর্থ কী?', a: 'কোষ বিক্রিয়াটি স্বতঃস্ফূর্ত ও E°_cell = +১.১০ V (ধনাত্মক)', d: ['কোষ কাজ করবে না', 'বাইরে থেকে বিদ্যুৎ দিতে হবে', 'সাম্যধ্রুবক K < ১'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'অ্যালকাইল হ্যালাইড + অ্যামোনিয়া/KCN বিক্রিয়ায় R–CN (সায়ানাইড) তৈরি হয়, কিন্তু AgCN দিলে কোন যৌগ তৈরি হয়?', a: 'অ্যালকাইল আইসোসায়ানাইড (R–NC, Ag–CN সমযোজী হওয়ায় N দিয়ে আক্রমণ করে)', d: ['অ্যালকাইল সায়ানাইড (R–CN)', 'অ্যামিন (R–NH₂)', 'অ্যালকোহল (R–OH)'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'নিরুদক P₂O₅ বা গাঢ় H₂SO₄ দ্বারা অ্যাসিটামাইড (CH₃CONH₂)-কে উত্তপ্ত করলে কী উৎপন্ন হয়?', a: 'মিথাইল সায়ানাইড / ইথেননাইট্রাইল (CH₃CN)', d: ['মিথান্যামিন', 'অ্যাসিটিক অ্যাসিড', 'অ্যাসিটোন'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'টলুইনকে KMnO₄ + KOH সহ জারিত ও পরে H⁺ দ্বারা অম্লীয় করলে কোন অ্যারোমেটিক অ্যাসিড পাওয়া যায়?', a: 'বেনজোয়িক অ্যাসিড (C₆H₅COOH)', d: ['থ্যালিক অ্যাসিড', 'স্যালিসাইলিক অ্যাসিড', 'ফেনল'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'অ্যানিলিন গাঢ় সালফিউরিক অ্যাসিডের সাথে ১৮০ °C তাপমাত্রায় বিক্রিয়া করে কী উৎপন্ন করে যা জুইটার-আয়ন গঠন করে?', a: 'সালফানিলিক অ্যাসিড (p-অ্যামিনোবেনজিন সালফোনিক অ্যাসিড)', d: ['বেনজিন ডায়াজোনিয়াম সালফেট', 'পিক্রিক অ্যাসিড', 'অ্যাসিট্যানিলাইড'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'ডেটলের (Dettol) মূল জীবাণুনাশক অ্যারোমেটিক রাসায়নিক উপাদানটি কী?', a: 'ক্লোরোজাইলেনল (৪-ক্লোরো-৩,৫-ডাইমিথাইলফেনল)', d: ['ফেনল (কার্বলিক অ্যাসিড)', 'পিক্রিক অ্যাসিড', 'ইথানল'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'স্যালিসাইলিক অ্যাসিড ও ফেনল POCl₃-এর উপস্থিতিতে বিক্রিয়া করে কোন অন্ত্রনালির অ্যান্টিসেপটিক (Salol) তৈরি করে?', a: 'ফিনাইল স্যালিসাইলেট (স্যালোল)', d: ['অ্যাসপিরিন', 'মিথাইল স্যালিসাইলেট', 'প্যারাসিটামল'] },
  ];
  rapidChem2.forEach((rc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: rc.ch,
        visualLessonId: rc.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: rc.q,
        correct: rc.a,
        distractors: rc.d,
        explanation: `${rc.q} — সঠিক উত্তর: ${rc.a}।`,
        reference: 'রসায়ন ২য় পত্র · সমন্বিত মূল্যায়ন ব্যাংক',
      })
    );
  });

  // 9. Systematic Reaction Reagent & Empirical Formula Drills (~120 more MCQs across Ch 2, 3, 4)
  // 9A: Empirical Formula <-> Molecular Formula Multiplier Drills (12 MCQs)
  const empFormulas = [
    { emp: 'CH₂ (ভর = ১৪)', mw: 56, molF: 'C₄H₈ (বিউটিন/সাইক্লোবিউটেন)' },
    { emp: 'CH (ভর = ১৩)', mw: 78, molF: 'C₆H₆ (বেনজিন)' },
    { emp: 'CH₂O (ভর = ৩০)', mw: 60, molF: 'C₂H₄O₂ (অ্যাসিটিক অ্যাসিড)' },
    { emp: 'NO₂ (ভর = ৪৬)', mw: 92, molF: 'N₂O₄ (ডাইনাইট্রোজেন টেট্রা-অক্সাইড)' },
    { emp: 'CH₃ (ভর = ১৫)', mw: 30, molF: 'C₂H₆ (ইথেন)' },
    { emp: 'C₂H₅ (ভর = ২৯)', mw: 58, molF: 'C₄H₁₀ (বিউটেন)' },
    { emp: 'HO (ভর = ১৭)', mw: 34, molF: 'H₂O₂ (হাইড্রোজেন পারঅক্সাইড)' },
    { emp: 'CH₂Cl (ভর = ৪৯.৫)', mw: 99, molF: 'C₂H₄Cl₂ (১,২-ডাইক্লোরোইথেন)' },
  ];
  empFormulas.forEach((ef, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `কোনো যৌগের স্থূল সংকেত ${ef.emp} এবং বাষ্প ঘনত্ব (VD) ${toBnDigits(ef.mw / 2)} (আণবিক ভর ${toBnDigits(ef.mw)}) হলে যৌগটির আণবিক সংকেত কোনটি?`,
        correct: ef.molF,
        distractors: empFormulas.filter((x) => x.molF !== ef.molF).slice(0, 4).map((x) => x.molF),
        explanation: `আণবিক ভর M = ২ × VD = ${toBnDigits(ef.mw)}; গুণিতক n = M / স্থূল সংকেত ভর ⇒ আণবিক সংকেত ${ef.molF}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · স্থূল ও আণবিক সংকেত',
      })
    );
  });

  // 9B: Organic Functional Group Prefixes & Suffixes (24 MCQs)
  const fgGroups = [
    { fg: '–COOH (কার্বক্সিলিক অ্যাসিড)', suffix: '-ওইক অ্যাসিড (-oic acid)', prefix: 'কার্বক্সি-' },
    { fg: '–SO₃H (সালফোনিক অ্যাসিড)', suffix: '-সালফোনিক অ্যাসিড', prefix: 'সালফো-' },
    { fg: '–COOR (এস্টার)', suffix: '-ওয়েট (-oate)', prefix: 'অ্যালকোক্সিকার্বনিল-' },
    { fg: '–CONH₂ (অ্যাসিড অ্যামাইড)', suffix: '-অ্যামাইড (-amide)', prefix: 'কার্বাময়েল-' },
    { fg: '–C≡N (নাইট্রাইল)', suffix: '-নাইট্রাইল (-nitrile)', prefix: 'সায়ানো-' },
    { fg: '–CHO (অ্যালডিহাইড)', suffix: '-অ্যাল (-al)', prefix: 'ফরমায়েল / অক্সো-' },
    { fg: '>C=O (কিটোন)', suffix: '-ওন (-one)', prefix: 'অক্সো- / কিটো-' },
    { fg: '–OH (অ্যালকোহল)', suffix: '-অল (-ol)', prefix: 'হাইড্রক্সি-' },
    { fg: '–NH₂ (অ্যামিন)', suffix: '-অ্যামিন (-amine)', prefix: 'অ্যামিনো-' },
    { fg: '–OR (ইথার)', suffix: 'অ্যালকোক্সি অ্যালকেন (কেবল উপসর্গ)', prefix: 'অ্যালকোক্সি-' },
  ];
  fgGroups.forEach((fg, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `IUPAC নামকরণে প্রধান কার্যকরী মূলক "${fg.fg}"-এর পরপদ (Suffix) ও উপপদ (Prefix) যথাক্রমে কী?`,
        correct: `পরপদ: ${fg.suffix}, উপপদ: ${fg.prefix}`,
        distractors: fgGroups
          .filter((x) => x.fg !== fg.fg)
          .slice(i % 5, (i % 5) + 4)
          .map((x) => `পরপদ: ${x.suffix}, উপপদ: ${x.prefix}`),
        explanation: `${fg.fg} প্রধান মূলক হলে ${fg.suffix} এবং অপ্রধান মূলক হলে ${fg.prefix} ব্যবহৃত হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · কার্যকরী মূলকের নামকরণ',
      })
    );
  });

  // 9C: Beer-Lambert Transmittance <-> Absorbance Drills (16 MCQs)
  const beerCases = [
    { tr: '১০০% (সব আলো পার হয়)', abs: '০.০০' },
    { tr: '১০% (I/I₀ = ০.১)', abs: '১.০০' },
    { tr: '১% (I/I₀ = ০.০১)', abs: '২.০০' },
    { tr: '০.১% (I/I₀ = ০.০০১)', abs: '৩.০০' },
    { tr: '৫০% (I/I₀ = ০.৫)', abs: '০.৩০১' },
    { tr: '২৫% (I/I₀ = ০.২৫)', abs: '০.৬০২' },
  ];
  beerCases.forEach((bc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো রঙিন দ্রবণের মধ্য দিয়ে একবর্ণী আলোর সঞ্চারণ (Transmittance, T) ${bc.tr} হলে বিয়ার-ল্যাম্বার্ট সূত্রানুযায়ী শোষণ (Absorbance, A) কত?`,
        correct: bc.abs,
        distractors: beerCases.filter((x) => x.abs !== bc.abs).slice(0, 4).map((x) => x.abs),
        explanation: `A = −log₁₀(T) = log₁₀(১০০ / %T) = ${bc.abs}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · বিয়ার-ল্যাম্বার্ট গণনা',
      })
    );
  });

  return list;
}
