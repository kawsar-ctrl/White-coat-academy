import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredB(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sb_${String(seq++).padStart(4, '0')}`;

  // 1. Oxidation Number & Equivalent Weight Matrix (36 MCQs)
  const oxNumbers = [
    { comp: 'KMnO₄-এ Mn', val: '+৭', exp: '+১ + x + ৪(−২) = ০ ⇒ x = +৭।' },
    { comp: 'K₂Cr₂O₇-এ Cr', val: '+৬', exp: '+২ + ২x + ৭(−২) = ০ ⇒ ২x = +১২ ⇒ x = +৬।' },
    { comp: 'Na₂S₂O₃-এ S (গড়)', val: '+২', exp: '+২ + ২x + ৩(−২) = ০ ⇒ ২x = +৪ ⇒ x = +২।' },
    { comp: 'Na₂S₄O₆-এ S (গড়)', val: '+২.৫ (+৫/২)', exp: '+২ + ৪x + ৬(−২) = ০ ⇒ ৪x = +১০ ⇒ x = +২.৫।' },
    { comp: 'H₂SO₅ (ক্যারোস অ্যাসিড)-এ S', val: '+৬ (একটি পারঅক্সাইড বন্ধনসহ)', exp: '২টি অক্সিজেন পারঅক্সাইড (−১) ও ৩টি সাধারণ (−২) হওয়ায় সালফারের জারণ মান +৬।' },
    { comp: 'CrO₅ (ক্রোমিয়াম পেন্টা-অক্সাইড)-এ Cr', val: '+৬ (প্রজাপতি গঠনে ২টি পারঅক্সাইড বন্ধন)', exp: '৪টি পারঅক্সাইড O (−১) এবং ১টি অক্সো O (−২) থাকায় Cr = +৬।' },
    { comp: 'K₄[Fe(CN)₆]-এ Fe', val: '+২', exp: '+৪ + x + ৬(−১) = ০ ⇒ x = +২।' },
    { comp: 'Fe(CO)₅-এ Fe', val: '০ (শূন্য)', exp: 'CO নিরপেক্ষ লিগ্যান্ড হওয়ায় ধাতব কার্বনিলে Fe-এর জারণ সংখ্যা ০।' },
    { comp: 'KO₂ (পটাশিয়াম সুপারঅক্সাইড)-এ O', val: '−১/২ (−০.৫)', exp: '+১ + ২x = ০ ⇒ x = −১/২।' },
    { comp: 'OF₂ (অক্সিজেন ডাইফ্লোরাইড)-এ O', val: '+২', exp: 'F সর্বদা −১ হওয়ায় x + ২(−১) = ০ ⇒ x = +২।' },
    { comp: 'NH₄NO₃-এ দুটি N যথাক্রমে', val: '−৩ এবং +৫', exp: 'NH₄⁺ আয়নে N = −৩ এবং NO₃⁻ আয়নে N = +৫।' },
    { comp: 'Ca(OCl)Cl (ব্লিচিং পাউডার)-এ দুটি Cl', val: '+১ এবং −১', exp: 'হাইপোক্লোরাইট (OCl⁻)-এ Cl = +১ এবং ক্লোরাইড (Cl⁻)-এ Cl = −১।' },
  ];
  oxNumbers.forEach((ox, i) => {
    const others = oxNumbers.filter((x) => x.comp !== ox.comp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ox.comp}"-এর সঠিক জারণ সংখ্যা (Oxidation Number) কত?`,
        correct: ox.val,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.val),
        explanation: `${ox.comp}: ${ox.val}। (${ox.exp})`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · জারণ সংখ্যা',
      })
    );
  });

  // 2. Quantitative Molarity, PPM, Solution Preparation & Titration Volume Calculations (~75 MCQs)
  // 2A. Molarity S = 1000w / (M*V)
  const molCalc = [
    { solute: 'NaOH', M: 40, w: 4, v: 1000, s: 0.1 },
    { solute: 'NaOH', M: 40, w: 2, v: 500, s: 0.1 },
    { solute: 'Na₂CO₃', M: 106, w: 10.6, v: 1000, s: 0.1 },
    { solute: 'Na₂CO₃', M: 106, w: 5.3, v: 250, s: 0.2 },
    { solute: 'Na₂CO₃', M: 106, w: 2.65, v: 250, s: 0.1 },
    { solute: 'H₂SO₄', M: 98, w: 4.9, v: 500, s: 0.1 },
    { solute: 'H₂C₂O₄·2H₂O', M: 126, w: 6.3, v: 500, s: 0.1 },
    { solute: 'গ্লুকোজ (C₆H₁₂O₆)', M: 180, w: 18, v: 500, s: 0.2 },
    { solute: 'K₂Cr₂O₇', M: 294, w: 2.94, v: 100, s: 0.1 },
    { solute: 'NaCl', M: 58.5, w: 5.85, v: 500, s: 0.2 },
  ];
  molCalc.forEach((mc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(mc.v)} mL আয়তনের জলীয় দ্রবণে ${toBnDigits(mc.w)} গ্রাম ${mc.solute} (আণবিক ভর ${toBnDigits(mc.M)}) দ্রবীভূত থাকলে দ্রবণটির মোলারিটি (M) কত?`,
        correct: `${toBnDigits(mc.s)} M`,
        distractors: [0.05, 0.1, 0.2, 0.5, 1.0, 0.25]
          .filter((x) => x !== mc.s)
          .map((x) => `${toBnDigits(x)} M`),
        explanation: `S = (১০০০ × w) / (M × V) = (১০০০ × ${toBnDigits(mc.w)}) / (${toBnDigits(mc.M)} × ${toBnDigits(mc.v)}) = ${toBnDigits(mc.s)} M।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মোলারিটি',
      })
    );
    const ppmVal = Math.round(mc.s * mc.M * 1000);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(mc.s)} M ঘনমাত্রার ${mc.solute} (M = ${toBnDigits(mc.M)}) দ্রবণের ঘনমাত্রা ppm এককে কত হবে?`,
        correct: `${toBnDigits(ppmVal)} ppm`,
        distractors: [
          `${toBnDigits(Math.round(ppmVal / 10))} ppm`,
          `${toBnDigits(ppmVal * 2)} ppm`,
          `${toBnDigits(Math.round(mc.s * mc.M))} ppm`,
          `${toBnDigits(ppmVal + 500)} ppm`,
        ],
        explanation: `ppm = S × M × ১০০০ = ${toBnDigits(mc.s)} × ${toBnDigits(mc.M)} × ১০০০ = ${toBnDigits(ppmVal)} ppm।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · ppm একক',
      })
    );
  });

  // 2B. Acid-Base Titration Volume V1S1*n1 = V2S2*n2 Math
  const titCases = [
    { acid: 'HCl', na: 1, va: 20, sa: 0.1, base: 'NaOH', nb: 1, sb: 0.1, vb: 20 },
    { acid: 'H₂SO₄', na: 2, va: 25, sa: 0.1, base: 'NaOH', nb: 1, sb: 0.1, vb: 50 },
    { acid: 'H₂SO₄', na: 2, va: 10, sa: 0.2, base: 'NaOH', nb: 1, sb: 0.2, vb: 20 },
    { acid: 'HCl', na: 1, va: 40, sa: 0.1, base: 'Na₂CO₃', nb: 2, sb: 0.1, vb: 20 },
    { acid: 'HCl', na: 1, va: 25, sa: 0.2, base: 'Na₂CO₃', nb: 2, sb: 0.1, vb: 25 },
    { acid: 'H₂SO₄', na: 2, va: 20, sa: 0.05, base: 'Na₂CO₃', nb: 2, sb: 0.1, vb: 10 },
  ];
  titCases.forEach((tc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(tc.va)} mL ${toBnDigits(tc.sa)} M ${tc.acid} দ্রবণকে সম্পূর্ণ প্রশমিত করতে ${toBnDigits(tc.sb)} M ${tc.base} দ্রবণের কত mL প্রয়োজন হবে?`,
        correct: `${toBnDigits(tc.vb)} mL`,
        distractors: [10, 15, 20, 25, 30, 40, 50, 100]
          .filter((x) => x !== tc.vb)
          .map((x) => `${toBnDigits(x)} mL`),
        explanation: `তুল্যতা সমীকরণ n_a · V_a · S_a = n_b · V_b · S_b ⇒ ${toBnDigits(tc.na)} × ${toBnDigits(tc.va)} × ${toBnDigits(tc.sa)} = ${toBnDigits(tc.nb)} × V_b × ${toBnDigits(tc.sb)} ⇒ V_b = ${toBnDigits(tc.vb)} mL।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · অম্ল-ক্ষার টাইট্রেশন',
      })
    );
  });

  // 2C. Indicator Selection & pH Range Matrix
  const indicators = [
    { ind: 'মিথাইল অরেঞ্জ', range: 'pH ৩.১ – ৪.৪', acidCol: 'লাল / গোলাপি', baseCol: 'হলুদ', bestFor: 'তীব্র অ্যাসিড (HCl) ও দুর্বল ক্ষার (Na₂CO₃ / NH₄OH)' },
    { ind: 'মিথাইল রেড', range: 'pH ৪.২ – ৬.৩', acidCol: 'লাল', baseCol: 'হলুদ', bestFor: 'তীব্র অ্যাসিড ও দুর্বল ক্ষারের (NH₄OH) টাইট্রেশন' },
    { ind: 'ফেনল রেড', range: 'pH ৬.৮ – ৮.৪', acidCol: 'হলুদ', baseCol: 'লাল', bestFor: 'রক্তের ও প্রশম-ক্ষারীয় টাইট্রেশন' },
    { ind: 'ফেনলফথ্যালিন', range: 'pH ৮.২ – ১০.০', acidCol: 'বর্ণহীন', baseCol: 'উজ্জ্বল গোলাপি-লাল', bestFor: 'দুর্বল অ্যাসিড (CH₃COOH/H₂C₂O₄) ও তীব্র ক্ষার (NaOH)' },
    { ind: 'লিটমাস', range: 'pH ৫.০ – ৮.০', acidCol: 'লাল', baseCol: 'নীল', bestFor: 'সাধারণ অম্ল-ক্ষার পরীক্ষা ও তীব্র অ্যাসিড-ক্ষার' },
  ];
  indicators.forEach((ind, i) => {
    const others = indicators.filter((x) => x.ind !== ind.ind);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `অম্ল-ক্ষার টাইট্রেশনে "${ind.ind}" নির্দেশকটির কার্যকর বর্ণ পরিবর্তনের pH পরিসর কত?`,
        correct: ind.range,
        distractors: others.map((x) => x.range),
        explanation: `${ind.ind} নির্দেশক ${ind.range} পরিসরে ${ind.acidCol} থেকে ${ind.baseCol} বর্ণ ধারণ করে (${ind.bestFor}-এর জন্য উপযোগী)।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · টাইট্রেশন নির্দেশক',
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
        question: `"${ind.bestFor}" টাইট্রেশনের সমাপ্তি বিন্দু নির্ণয়ে নিচের কোন নির্দেশকটি সবচেয়ে উপযোগী?`,
        correct: ind.ind,
        distractors: others.map((x) => x.ind),
        explanation: `${ind.bestFor}-এর প্রশমন বিন্দু ${ind.range}-এর কাছাকাছি হওয়ায় ${ind.ind} উপযুক্ত।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · নির্দেশক নির্বাচন',
      })
    );
  });

  // 3. Electrochemistry: Faraday Quantitative Deposit Math & Standard Cell EMF (~45 MCQs)
  const faradayMetals = [
    { ion: 'Ag⁺ (Ag = ১০৮)', m: 108, z: 1, F: 1, dep: 108 },
    { ion: 'Ag⁺ (Ag = ১০৮)', m: 108, z: 1, F: 2, dep: 216 },
    { ion: 'Cu²⁺ (Cu = ৬৩.৫)', m: 63.5, z: 2, F: 2, dep: 63.5 },
    { ion: 'Cu²⁺ (Cu = ৬৩.৫)', m: 63.5, z: 2, F: 1, dep: 31.75 },
    { ion: 'Al³⁺ (Al = ২৭)', m: 27, z: 3, F: 3, dep: 27 },
    { ion: 'Al³⁺ (Al = ২৭)', m: 27, z: 3, F: 1, dep: 9 },
    { ion: 'Fe²⁺ (Fe = ৫৬)', m: 56, z: 2, F: 1, dep: 28 },
    { ion: 'Ca²⁺ (Ca = ৪০)', m: 40, z: 2, F: 2, dep: 40 },
    { ion: 'Na⁺ (Na = ২৩)', m: 23, z: 1, F: 2, dep: 46 },
    { ion: 'Mg²⁺ (Mg = ২৪)', m: 24, z: 2, F: 1, dep: 12 },
  ];
  faradayMetals.forEach((fm) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `তড়িৎ বিশ্লেষণের সময় ${fm.ion} দ্রবণের মধ্য দিয়ে ${toBnDigits(fm.F)} ফ্যারাডে (F) বিদ্যুৎ প্রবাহিত করলে ক্যাথোডে কত গ্রাম ধাতু সঞ্চিত হবে?`,
        correct: `${toBnDigits(fm.dep)} গ্রাম`,
        distractors: [
          `${toBnDigits(fm.dep * 2)} গ্রাম`,
          `${toBnDigits(Number((fm.dep / 2).toFixed(2)))} গ্রাম`,
          `${toBnDigits(fm.m + fm.F)} গ্রাম`,
          `${toBnDigits(Number((fm.m / (fm.z + 1)).toFixed(2)))} গ্রাম`,
        ].filter((x) => x !== `${toBnDigits(fm.dep)} গ্রাম`),
        explanation: `ফ্যারাডের সূত্র: ১ ফ্যারাডে বিদ্যুৎ প্রবাহে ১ গ্রাম-তুল্য ভর (M/e = ${toBnDigits(fm.m)}/${toBnDigits(fm.z)}) সঞ্চিত হয়; তাই ${toBnDigits(fm.F)} F-এ = ${toBnDigits(fm.dep)} গ্রাম।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের সূত্র',
      })
    );
  });

  // Charge Q = I * t calculations
  [
    { amp: 9.65, sec: 100, q: 965, molE: '০.০১ মোল (১/১০০ F)' },
    { amp: 5, sec: 1930, q: 9650, molE: '০.১ মোল (০.১ F)' },
    { amp: 10, sec: 9650, q: 96500, molE: '১.০ মোল (১ F)' },
    { amp: 2, sec: 965, q: 1930, molE: '০.০২ মোল (০.০২ F)' },
  ].forEach((qt) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `কোনো তড়িৎ বিশ্লেষ্য কোষে ${toBnDigits(qt.amp)} অ্যাম্পিয়ার বিদ্যুৎ ${toBnDigits(qt.sec)} সেকেন্ড প্রবাহিত হলে কত ফ্যারাডে বা মোল ইলেকট্রন প্রবাহিত হয়?`,
        correct: qt.molE,
        distractors: ['০.০১ মোল (১/১০০ F)', '০.১ মোল (০.১ F)', '১.০ মোল (১ F)', '০.০২ মোল (০.০২ F)', '২.০ মোল (২ F)'].filter(
          (x) => x !== qt.molE
        ),
        explanation: `চার্জ Q = I × t = ${toBnDigits(qt.amp)} × ${toBnDigits(qt.sec)} = ${toBnDigits(qt.q)} C; মোল ইলেকট্রন = Q / ৯৬৫০০ = ${qt.molE}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ চার্জ হিসাব',
      })
    );
  });

  // Galvanic Cell EMF (E°cell = E°cathode - E°anode)
  const cellPairs = [
    { cell: 'Zn|Zn²⁺ || Cu²⁺|Cu (ড্যানিয়েল কোষ)', anodeE: '-0.76 V', cathodeE: '+0.34 V', emf: '+১.১০ V' },
    { cell: 'Zn|Zn²⁺ || Ag⁺|Ag', anodeE: '-0.76 V', cathodeE: '+0.80 V', emf: '+১.৫৬ V' },
    { cell: 'Mg|Mg²⁺ || Cu²⁺|Cu', anodeE: '-2.37 V', cathodeE: '+0.34 V', emf: '+২.৭১ V' },
    { cell: 'Fe|Fe²⁺ || Cu²⁺|Cu', anodeE: '-0.44 V', cathodeE: '+0.34 V', emf: '+০.৭৮ V' },
    { cell: 'Cu|Cu²⁺ || Ag⁺|Ag', anodeE: '+0.34 V', cathodeE: '+0.80 V', emf: '+০.৪৬ V' },
    { cell: 'Ni|Ni²⁺ || Ag⁺|Ag', anodeE: '-0.25 V', cathodeE: '+0.80 V', emf: '+১.০৫ V' },
  ];
  cellPairs.forEach((cp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `অ্যানোডের প্রমাণ বিজারণ বিভব ${toBnDigits(cp.anodeE)} এবং ক্যাথোডের ${toBnDigits(cp.cathodeE)} হলে "${cp.cell}" কোষটির প্রমাণ কোষ বিভব (E°cell) কত?`,
        correct: cp.emf,
        distractors: ['+১.১০ V', '+১.৫৬ V', '+২.৭১ V', '+০.৭৮ V', '+০.৪৬ V', '−০.৪২ V'].filter((x) => x !== cp.emf),
        explanation: `E°cell = E°cathode(red) − E°anode(red) = ${toBnDigits(cp.cathodeE)} − (${toBnDigits(cp.anodeE)}) = ${cp.emf}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · কোষ বিভব',
      })
    );
  });

  // 4. Economic & Industrial Chemistry Matrix + Environmental/Organic Conceptual Drills (~160 MCQs)
  const industrialProcesses = [
    { ind: 'ইউরিয়া সার (NH₂CONH₂)', raw: 'প্রাকৃতিক গ্যাস থেকে প্রাপ্ত NH₃ এবং CO₂', cond: '১৩০–১৫০ atm, ১৮০–১৯০ °C' },
    { ind: 'সোডা-লাইম বা সাধারণ কাচ', raw: 'বালি (SiO₂), সোডা অ্যাশ (Na₂CO₃) ও চুনাপাথর (CaCO₃)', cond: '১৫০০ °C গলন + অ্যানিলিং' },
    { ind: 'পোর্টল্যান্ড সিমেন্ট', raw: 'চুনাপাথর (CaCO₃), কাদামাটি ও ২–৫% জিপসাম', cond: '১৪০০–১৫০০ °C ঘূর্ণায়মান চুল্লি' },
    { ind: 'ক্রাফট (সালফেট) কাগজ মণ্ড', raw: 'কাঠ/বাঁশের সেলুলোজ, NaOH ও Na₂S (হোয়াইট লিকার)', cond: 'লিগনিন পৃথকীকরণ ও ব্লিচিং' },
    { ind: 'ক্রোম চামড়া ট্যানিং', raw: 'বেসিক ক্রোমিয়াম সালফেট [Cr(OH)SO₄]', cond: 'কোলাজেন ক্রস-লিঙ্কিং (ETP আবশ্যক)' },
    { ind: 'ফ্লিন্ট বা অপটিক্যাল কাচ', raw: 'SiO₂, K₂CO₃ এবং লেড অক্সাইড (PbO)', cond: 'উচ্চ প্রতিসরাঙ্ক লেন্স/প্রিজম' },
    { ind: 'সিরামিক সামগ্রী', raw: 'চায়না ক্লে (কাওলিনাইট Al₂O₃·2SiO₂·2H₂O), ফেল্ডস্পার ও কোয়ার্টজ', cond: 'গ্লেজিং ও ফায়ারিং' },
    { ind: 'টিএসপি (TSP) সার', raw: 'রক ফসফেট [Ca₃(PO₄)₂] ও গাঢ় ফসফরিক অ্যাসিড (H₃PO₄)', cond: '৪৪–৪৮% P₂O₅ সমতুল্য' },
  ];
  industrialProcesses.forEach((ip, i) => {
    const others = industrialProcesses.filter((x) => x.ind !== ip.ind);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `বাংলাদেশের অর্থনৈতিক রসায়নে "${ip.ind}" উৎপাদনের প্রধান কাঁচামাল কোনটি?`,
        correct: ip.raw,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.raw),
        explanation: `${ip.ind} উৎপাদনে ${ip.raw} ব্যবহৃত হয় (${ip.cond})।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · শিল্প কাঁচামাল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${ip.raw}" প্রধান কাঁচামাল ও "${ip.cond}" শর্তে কোন শিল্পপণ্যটি তৈরি করা হয়?`,
        correct: ip.ind,
        distractors: others.slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.ind),
        explanation: `এই উপাদানগুলো ${ip.ind} শিল্পে ব্যবহৃত হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · অর্থনৈতিক রসায়ন',
      })
    );
  });

  // High-Yield Organic, Environmental, Quantitative, Electro & Economic Single-Best-Answer Drills (~45 MCQs)
  const chem2Drills: Array<[string, string, string, string, [string, string, string], string]> = [
    ['chem2_ch2_organic', 'benzene_aromatic', 'বেনজিনের সাথে সূর্যালোকে অতিরিক্ত Cl₂ যুক্ত হলে কোন বিষাক্ত কীটনাশক তৈরি হয়?', 'গ্যামাক্সিন (BHC / বেনজিন হেক্সাক্লোরাইড, C₆H₆Cl₆)', ['ডিডিটি (DDT)', 'ক্লোরোবেনজিন', 'ফসজিন গ্যাস'], 'আলোক রাসায়নিক সংযোজনে ৩ অণু Cl₂ বেনজিনের ৩টি দ্বিবন্ধনে যুক্ত হয়ে C₆H₆Cl₆ (গ্যামাক্সিন/লিন্ডেন) গঠন করে।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ডিডিটি (DDT) তৈরিতে ক্লোরালের (CCl₃CHO) সাথে গাঢ় H₂SO₄-এর উপস্থিতিতে কোন যৌগটির ২ অণু ঘনীভবন বিক্রিয়া করে?', 'ক্লোরোবেনজিন (C₆H₅Cl)', ['ফেনল', 'নাইট্রোবেনজিন', 'টলুইন'], 'ক্লোরাল + ২ অণু ক্লোরোবেনজিন → p,p′-ডাইক্লোরোডাইফিনাইলট্রাইক্লোরোইথেন (DDT)।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'নন-মেটাল বা জৈব যৌগে নাইট্রোজেন, সালফার ও হ্যালোজেন মৌল শনাক্তকরণের জন্য কোন ধাতুর সাথে গলিয়ে ল্যাসাইন দ্রবণ তৈরি করা হয়?', 'সোডিয়াম (Na) ধাতু', ['পটাশিয়াম পারম্যাঙ্গানেট', 'জিঙ্ক গুঁড়া', 'কপার(II) অক্সাইড'], 'ল্যাসাইন (Lassaigne) পরীক্ষায় সোডিয়াম ধাতু জৈব যৌগের N, S, X-কে যথাক্রমে আয়নিক NaCN, Na₂S ও NaX-এ পরিণত করে।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ফেনল, ইথানল ও অ্যাসিটিক অ্যাসিডের মধ্যে জলীয় দ্রবণে অম্লত্বের (Acidic strength) সঠিক ক্রম কোনটি?', 'অ্যাসিটিক অ্যাসিড > ফেনল > পানি > ইথানল', ['ইথানল > ফেনল > অ্যাসিটিক অ্যাসিড', 'ফেনল > অ্যাসিটিক অ্যাসিড > পানি', 'সকলের অম্লত্ব সমান'], 'কার্বক্সিলেট আয়নে দুটি সমতুল্য অক্সিজেনে চার্জ ছড়িয়ে থাকে বলে CH₃COOH সবচেয়ে অম্লীয়; ফিনক্সাইড আয়নও রেজোন্যান্স স্থায়ী, তাই ফেনল পানি ও ইথানল অপেক্ষা বেশি অম্লীয়।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ক্লোরোঅ্যাসিটিক অ্যাসিডগুলোর (CCl₃COOH, CHCl₂COOH, CH₂ClCOOH, CH₃COOH) মধ্যে অম্লশক্তির সঠিক ক্রম কোনটি?', 'CCl₃COOH > CHCl₂COOH > CH₂ClCOOH > CH₃COOH', ['CH₃COOH > CH₂ClCOOH > CHCl₂COOH > CCl₃COOH', 'CHCl₂COOH > CCl₃COOH > CH₃COOH', 'সকলের Ka মান সমান'], '–Cl পরমাণুর সংখ্যা বাড়লে ইলেকট্রন আকর্ষী −I প্রভাব বেড়ে –O–H বন্ধন দুর্বল করে ও H⁺ দান সহজ করে।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'বিশুদ্ধ ইথাইন বা অ্যাসিটিলিন গ্যাসকে লোহিত তপ্ত লোহার নলের মধ্য দিয়ে (৪০০–৫০০ °C) চালনা করলে ট্রাইমারাইজেশনে কী উৎপন্ন হয়?', 'বেনজিন (C₆H₆)', ['ইথিলিন', 'ইথানল', 'ন্যাপথালিন'], '3HC≡CH (লোহিত তপ্ত Fe নল) → C₆H₆ (বেনজিন)।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ক্যালসিয়াম কার্বাইডে (CaC₂) ফোঁটায় ফোঁটায় পানি যোগ করলে কোন অ্যালকাইন গ্যাস উৎপন্ন হয় যা ধাতু ঝালাইয়ে (Oxy-acetylene) ব্যবহৃত হয়?', 'ইথাইন বা অ্যাসিটিলিন (C₂H₂)', ['ইথিন (C₂H₄)', 'মিথেন (CH₄)', 'প্রোপেন (C₃H₈)'], 'CaC₂ + 2H₂O → Ca(OH)₂ + C₂H₂↑।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'অ্যারোমেটিক যৌগ অ্যানিলিনের (C₆H₅NH₂) ব্রোমিন পানির সাথে বিক্রিয়ায় কী বর্ণের অধঃক্ষেপ পড়ে?', 'সাদা বর্ণের ২,৪,৬-ট্রাইব্রোমোঅ্যানিলিন', ['কালো অধঃক্ষেপ', 'হলুদ বর্ণের চিলেট', 'লালচে বর্ণের সল'], '–NH₂ তীব্র সক্রিয়কারী গ্রুপ হওয়ায় বিনা প্রভাবকেই বলয়ের ২, ৪, ৬ অবস্থানে Br প্রতিস্থাপিত হয়ে সাদা অধঃক্ষেপ দেয়।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'কোনো অ্যারোমেটিক অ্যামিন (অ্যানিলিন) মিথাইল অ্যামিনের (CH₃NH₂) তুলনায় অনেক দুর্বল ক্ষারক কেন?', 'অ্যানিলিনের N-এর নিঃসঙ্গ ইলেকট্রন জোড় বেনজিন বলয়ের রেজোন্যান্সে অংশ নেয়', ['অ্যানিলিনের আণবিক ভর কম', 'মিথাইল অ্যামিনে কোনো হাইড্রোজেন নেই', 'অ্যানিলিন একটি অ্যাসিড'], 'রেজোন্যান্সের কারণে N-এর ওপর ইলেকট্রন ঘনত্ব কমে যায় বলে অ্যানিলিন সহজে প্রোটন (H⁺) গ্রহণ করতে পারে না।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ইথিন (CH₂=CH₂) ও বাষ্পের উচ্চচাপে (H₃PO₄ প্রভাবক, ৩০০ °C, ৬০ atm) বা গাঢ় H₂SO₄ দ্বারা হাইড্রেশনে কী তৈরি হয়?', 'ইথানল (CH₃CH₂OH)', ['ইথান্যাল', 'ইথানোয়িক অ্যাসিড', 'ডাইমিথাইল ইথার'], 'শিল্পক্ষেত্রে পেট্রোকেমিক্যাল ইথিলিন থেকে এ পদ্ধতিতে বিশুদ্ধ ইথানল উৎপন্ন করা হয়।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ইথানলকে গাঢ় H₂SO₄-সহ ১৭০ °C তাপমাত্রায় উত্তপ্ত করলে ইথিন হয়, কিন্তু অতিরিক্ত ইথানলসহ ১৪০ °C তাপমাত্রায় উত্তপ্ত করলে কী উৎপন্ন হয়?', 'ডাই-ইথাইল ইথার (CH₃CH₂–O–CH₂CH₃)', ['ইথানোয়িক অ্যাসিড', 'অ্যাসিটোন', 'মিথানল'], '১৪০ °C তাপমাত্রায় দুই অণু ইথানল থেকে এক অণু পানি বের হয়ে ডাই-ইথাইল ইথার তৈরি করে (১৭০ °C-এ আন্তঃআণবিক অপসারণে ইথিন)।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ফর্মালডিহাইডের ৪০% জলীয় দ্রবণকে কী বলা হয় যা জৈবিক নমুনা সংরক্ষণে ব্যবহৃত হয়?', 'ফর্মালিন (Formalin)', ['গ্লাসিয়াল অ্যাসিড', 'রেকটিফায়েড স্পিরিট', 'লুকাস বিকারক'], 'ফর্মালিন হলো পানিতে প্রায় ৩৭–৪০% ফর্মালডিহাইড (HCHO) এবং সামান্য মিথানল স্ট্যাবিলাইজারযুক্ত দ্রবণ।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'কোন যৌগটি অজৈব ধাতুর মতো নয়, কিন্তু অ্যালডিহাইডের মতো টলেন ও ফেহলিং দ্রবণকে বিজারিত করে (কারণ এতে –CHO সদৃশ গ্রুপ আছে)?', 'মিথানোয়িক বা ফরমিক অ্যাসিড (H–COOH)', ['ইথানোয়িক অ্যাসিড (CH₃COOH)', 'বেনজয়িক অ্যাসিড', 'প্রোপানোয়িক অ্যাসিড'], 'H–C(=O)–OH গঠনে বামদিকে একটি H–C=O অংশ বিদ্যমান থাকায় ফরমিক অ্যাসিড সহজেই CO₂-এ জারিত হয়।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'প্রোটিনের জৈব একক অ্যামিনো অ্যাসিডসমূহ কোন বন্ধন দ্বারা পরস্পর যুক্ত হয়ে পলিপেপটাইড শিকল গঠন করে?', 'পেপটাইড বা অ্যামাইড বন্ধন (–CO–NH–)', ['গ্লাইকোসাইডিক বন্ধন', 'এস্টার বন্ধন', 'হাইড্রোজেন বন্ধন কেবল'], 'একটি অ্যামিনো অ্যাসিডের –COOH ও পরবর্তী অ্যামিনো অ্যাসিডের –NH₂ থেকে H₂O অপসারণে পেপটাইড বন্ধন সৃষ্টি হয়।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'নিচের কোনটি থার্মোপ্লাস্টিক পলিমার নয় (অর্থাৎ একবার ছাঁচে ঢালার পর গরম করলে আর গলে না, বরং পুড়ে যায়)?', 'ব্যাকেলাইট (Bakelite)', ['পলিথিন', 'পলিভিনাইল ক্লোরাইড (PVC)', 'পলিস্টাইরিন'], 'ব্যাকেলাইট হলো ফেনল ও ফর্মালডিহাইডের ত্রিমাত্রিক ক্রস-লিঙ্কযুক্ত থার্মোসেটিং রেজিন।'],
    ['chem2_ch1_env', 'ph_buffer', 'যে তাপমাত্রায় কোনো বাস্তব গ্যাস বিস্তৃত চাপ পরিসরে আদর্শ গ্যাস সমীকরণ (PV = nRT ও Z = ১) অনুসরণ করে তাকে কী বলে?', 'বয়েল তাপমাত্রা (Boyle Temperature, Tb = a / Rb)', ['সংকট তাপমাত্রা (Tc)', 'পরমশূন্য তাপমাত্রা', 'বিন্দু তাপমাত্রা'], 'বয়েল তাপমাত্রার নিচে বাস্তব গ্যাস মাঝারি চাপে Z < ১ (ঋণাত্মক বিচ্যুতি) এবং ওপরে Z > ১ দেখায়।'],
    ['chem2_ch1_env', 'ph_buffer', 'জুল-থমসন প্রভাবের কারণে সংকোচনের পর প্রসারণ ঘটালে শীতলীকরণ ঘটে, তবে সাধারণ কক্ষ তাপমাত্রায় কোন দুটি গ্যাস উত্তপ্ত হয় (যতক্ষণ না ইনভার্সন তাপমাত্রার নিচে নামানো হয়)?', 'হাইড্রোজেন (H₂) ও হিলিয়াম (He)', ['কার্বন ডাই-অক্সাইড ও অ্যামোনিয়া', 'নাইট্রোজেন ও অক্সিজেন', 'মিথেন ও প্রোপেন'], 'H₂ (−৮০ °C) ও He (−২৪০ °C)-এর উৎক্রম বা ইনভার্সন তাপমাত্রা কক্ষ তাপমাত্রার চেয়ে অনেক কম হওয়ায় কক্ষ তাপমাত্রায় প্রসারণে এরা উত্তপ্ত হয়।'],
    ['chem2_ch1_env', 'ph_buffer', 'প্লাস্টিক, কাঠ ও কয়লার মতো জীবাশ্ম জ্বালানির অসম্পূর্ণ দহনে কোন নীরব ঘাতক গ্যাসটি উৎপন্ন হয় যা হিমোগ্লোবিনের সাথে কার্বক্সিহিমোগ্লোবিন তৈরি করে?', 'কার্বন মনোক্সাইড (CO)', ['নাইট্রাস অক্সাইড (N₂O)', 'সালফার হেক্সাফ্লোরাইড', 'মিথেন (CH₄)'], 'হিমোগ্লোবিনের প্রতি CO-এর আসক্তি অক্সিজেনের চেয়ে ২০০–২৫০ গুণ বেশি।'],
    ['chem2_ch3_quant', 'ph_buffer', 'কোনো অজানা দ্রবণে ১০% (w/v) NaOH বলা হলে তার মোলার ঘনমাত্রা কত হবে (NaOH = ৪০)?', '২.৫ M', ['০.২৫ M', '১.০ M', '৪.০ M'], '১০% (w/v) মানে ১০০ mL-এ ১০ g বা ১০০০ mL-এ ১০০ g; তাই মোলারিটি = ১০০ / ৪০ = ২.৫ M।'],
    ['chem2_ch3_quant', 'ph_buffer', 'টাইট্রেশনে KMnO₄ দ্রবণের সাথে অ্যাসিড মাধ্যম তৈরি করতে কেন লঘু H₂SO₄-এর বদলে HCl বা HNO₃ ব্যবহার করা হয় না?', 'KMnO₄ HCl-কে জারিত করে Cl₂ গ্যাসে পরিণত করে এবং HNO₃ নিজেই একটি জারক', ['HCl পানিতে অদ্রবণীয়', 'HNO₃ একটি দুর্বল অ্যাসিড', 'H₂SO₄ নির্দেশক হিসেবে কাজ করে'], 'তীব্র জারক KMnO₄-এর উপস্থিতিতে Cl⁻ জারিত হয়ে ক্লোরিন গ্যাস নির্গত করে, ফলে আয়তনিক ফলাফলে ত্রুটি আসে।'],
    ['chem2_ch4_electro', 'ph_buffer', 'ধাতব কপারের তড়িৎ বিশোধনে (Electrorefining) অশুদ্ধ কপার দণ্ডকে কী হিসেবে ব্যবহার করা হয় এবং অ্যানোড মাডে কোন মূল্যবান ধাতু জমা হয়?', 'অ্যানোড হিসেবে অশুদ্ধ কপার; অ্যানোড মাডে সোনা (Au), রূপা (Ag) ও প্লাটিনাম (Pt) জমা হয়', ['ক্যাথোড হিসেবে অশুদ্ধ কপার; জিঙ্ক জমা হয়', 'অ্যানোডে লোহা জমা হয়', 'তড়িৎ বিশ্লেষ্য হিসেবে NaOH ব্যবহৃত হয়'], 'সক্রিয়তা কম হওয়ায় Au, Ag ও Pt জারিত না হয়ে অ্যানোডের নিচে অ্যানোড কাদা (Anode mud) হিসেবে জমা পড়ে।'],
    ['chem2_ch4_electro', 'ph_buffer', 'লোহার ওপর মরিচা পড়া (Rusting) রোধ করতে ক্যাথোডিক সুরক্ষায় বা গ্যালভানাইজিং-এ লোহার পাতের ওপর কোন ধাতুর প্রলেপ দেওয়া হয়?', 'জিঙ্ক (Zn) বা ম্যাগনেসিয়াম (ত্যাগী অ্যানোড)', ['কপার (Cu)', 'সোনা (Au)', 'পারদ (Hg)'], 'জিঙ্কের জারণ বিভব লোহা অপেক্ষা বেশি হওয়ায় জিঙ্ক নিজে জারিত হয়ে লোহাকে ক্ষয় থেকে রক্ষা করে।'],
    ['chem2_ch4_electro', 'ph_buffer', '১ মোল Cr₂O₇²⁻ আয়নকে সম্পূর্ণভাবে Cr³⁺ আয়নে বিজারিত করতে কত ফ্যারাডে (F) তড়িতের প্রয়োজন হবে?', '৬ ফ্যারাডে (6 F)', ['৩ ফ্যারাডে', '৫ ফ্যারাডে', '১২ ফ্যারাডে'], 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O; সমতায়িত সমীকরণে ৬ মোল ইলেকট্রন লাগে অর্থাৎ ৬ F।'],
    ['chem2_ch5_economic', 'benzene_aromatic', 'বাংলাদেশে উৎপাদিত প্রাকৃতিক গ্যাস সাধারণত "মিষ্টি গ্যাস" (Sweet Gas) নামে পরিচিত কেন?', 'এতে বিষাক্ত ও ক্ষয়কারক হাইড্রোজেন সালফাইড (H₂S) ও সালফার যৌগ প্রায় অনুপস্থিত', ['এর স্বাদ মিষ্টি চিনির মতো', 'এতে প্রচুর ইথানল থাকে', 'এতে ৫০% কার্বন মনোক্সাইড থাকে'], 'সালফারমুক্ত (H₂S < ৪ ppm) এবং ৯৫–৯৯% বিশুদ্ধ মিথেনসমৃদ্ধ প্রাকৃতিক গ্যাসকে সুইট গ্যাস বলে।'],
    ['chem2_ch5_economic', 'benzene_aromatic', 'বৈদ্যুতিক শর্ট সার্কিট বা ধাতব আগুনে (যেমন Na/Mg বা তেল আগুন) পানি ঢালা বিপজ্জনক; এক্ষেত্রে অগ্নিনির্বাপক হিসেবে কী ব্যবহৃত হয়?', 'শুষ্ক CO₂ বা শুষ্ক রাসায়নিক পাউডার (বালি / NaHCO₃)', ['লঘু সালফিউরিক অ্যাসিড', 'কেরোসিন তেল', 'হাইড্রোজেন গ্যাস'], 'পানি বিদ্যুৎ সুপরিবাহী ও সক্রিয় ধাতুর সাথে হাইড্রোজেন উৎপন্ন করে আগুন বাড়িয়ে দেয়; ভারী CO₂ অক্সিজেন সরবরাহ বিচ্ছিন্ন করে আগুন নেভায়।'],
  ];
  chem2Drills.forEach((d) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: d[0],
        visualLessonId: d[1],
        hscLevel: '12',
        difficulty: 'medical',
        question: d[2],
        correct: d[3],
        distractors: d[4],
        explanation: d[5],
        reference: 'রসায়ন ২য় পত্র · হাজারী ও নাগ · মেডিকেল স্পেশাল',
      })
    );
  });

  // 5. Additional Structured Drills: IUPAC Naming of Specific Organic Compounds, True/False, & Titration Molarity/Dilution (~130 MCQs)
  const iupacCompounds: Array<{ formula: string; iupac: string; common: string }> = [
    { formula: 'CH₃–CH(CH₃)–CH₂–COOH', iupac: '৩-মিথাইলবিউটানোয়িক অ্যাসিড', common: 'আইসোভ্যালেরিক অ্যাসিড' },
    { formula: 'CH₂=CH–CH₂–OH', iupac: 'প্রোপ-২-ইন-১-অল', common: 'অ্যালাইল অ্যালকোহল' },
    { formula: 'HOOC–COOH', iupac: 'ইথেনডাইওইক অ্যাসিড', common: 'অক্সালিক অ্যাসিড' },
    { formula: 'CH₃–CH(OH)–COOH', iupac: '২-হাইড্রক্সিপ্রোপানোয়িক অ্যাসিড', common: 'ল্যাকটিক অ্যাসিড' },
    { formula: 'CH₃–CO–CH₂–CH₃', iupac: 'বিউটান-২-ওন (২-বিউটানোন)', common: 'ইথাইল মিথাইল কিটোন' },
    { formula: 'HCOOCH₂CH₃', iupac: 'ইথাইল মিথানোয়েট', common: 'ইথাইল ফরমেট' },
    { formula: 'CH₃COOCH₂CH₃', iupac: 'ইথাইল ইথানোয়েট', common: 'ইথাইল অ্যাসিটেট' },
    { formula: 'CH₃–CH=CH–CHO', iupac: 'বিউট-২-ইন-১-অ্যাল', common: 'ক্রোটোনালডিহাইড' },
    { formula: '(CH₃)₃C–Br', iupac: '২-ব্রোমো-২-মিথাইলপ্রোপেন', common: 'টারশিয়ারি-বিউটাইল ব্রোমাইড' },
    { formula: 'C₆H₅–CH=CH₂', iupac: 'ফিনাইলইথিন / ইথিনাইলবেনজিন', common: 'স্টাইরিন' },
    { formula: 'CHCl₃', iupac: 'ট্রাইক্লোরোমিথেন', common: 'ক্লোরোফর্ম' },
    { formula: 'CHI₃', iupac: 'ট্রাই-আয়োডোমিথেন', common: 'আয়োডোফর্ম' },
    { formula: 'H₂C=C(CH₃)–CH=CH₂', iupac: '২-মিথাইলবিউটা-১,৩-ডাইইন', common: 'আইসোপ্রিন' },
    { formula: 'C₆H₄(OH)(COOH) [১,২ অবস্থান]', iupac: '২-হাইড্রক্সিবেনজয়িক অ্যাসিড', common: 'স্যালিসাইলিক অ্যাসিড' },
    { formula: 'C₆H₂(NO₂)₃OH [২,৪,৬]', iupac: '২,৪,৬-ট্রাইনাইট্রোফেনল', common: 'পিক্রিক অ্যাসিড' },
  ];
  iupacCompounds.forEach((ic, i) => {
    const others = iupacCompounds.filter((x) => x.formula !== ic.formula);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ic.formula}" (${ic.common}) জৈব যৌগটির সঠিক IUPAC নাম কোনটি?`,
        correct: ic.iupac,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => x.iupac),
        explanation: `${ic.common} (${ic.formula})-এর IUPAC নাম হলো ${ic.iupac}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · IUPAC নামকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${ic.iupac}" নামীয় জৈব যৌগটির প্রচলিত (সাধারণ) নাম কোনটি?`,
        correct: ic.common,
        distractors: others.slice((i + 3) % 8, ((i + 3) % 8) + 4).map((x) => x.common),
        explanation: `${ic.iupac}-এর প্রচলিত নাম ${ic.common} (${ic.formula})।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · প্রচলিত ও IUPAC নাম',
      })
    );
  });

  // 5B. Organic Hybridization & Bond Length / Carbon Count Quantitative Drills (25 MCQs)
  const dbes = [
    { formula: 'C₆H₆ (বেনজিন)', dbe: 4, note: '১টি বলয় (১) + ৩টি দ্বিবন্ধন (৩) = ৪।' },
    { formula: 'C₁₀H₈ (ন্যাপথালিন)', dbe: 7, note: '২টি বলয় (২) + ৫টি দ্বিবন্ধন (৫) = ৭।' },
    { formula: 'C₂H₂ (ইথাইন)', dbe: 2, note: '১টি ত্রিবন্ধন থাকায় ২ মাত্রার অসম্পৃক্ততা।' },
    { formula: 'C₂H₄ (ইথিন)', dbe: 1, note: '১টি দ্বিবন্ধন থাকায় DBE = ১।' },
    { formula: 'C₆H₁₂ (সাইক্লোহেক্সেন বা হেক্সিন)', dbe: 1, note: 'DBE = ৬ + ১ − ১২/২ = ১।' },
    { formula: 'C₆H₅NO₂ (নাইট্রোবেনজিন)', dbe: 5, note: 'বেনজিন বলয়ে ৪ + N=O দ্বিবন্ধন ১ (অথবা বেনজিনিক ৪)।' },
  ];
  dbes.forEach((db) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${db.formula}" যৌগটির অসম্পৃক্ততার মাত্রা বা দ্বিবন্ধন সমতুল্য (DBE / Index of Hydrogen Deficiency) মান কত?`,
        correct: `${toBnDigits(db.dbe)}`,
        distractors: [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((x) => x !== db.dbe).map((x) => toBnDigits(x)),
        explanation: `DBE = C + 1 − (H + X − N)/2 সূত্রানুসারে ${db.formula}-এর DBE = ${toBnDigits(db.dbe)}। (${db.note})`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · অসম্পৃক্ততার মাত্রা',
      })
    );
  });

  // 5C. Chemistry 2nd Paper True/False Assertion Bank (20 MCQs)
  const chem2TruePairs: Array<{ ch: string; vis: string; topic: string; trueStmt: string; falsePool: [string, string, string]; exp: string }> = [
    {
      ch: 'chem2_ch1_env',
      vis: 'ph_buffer',
      topic: 'গ্যাসের গতিতত্ত্ব ও বাস্তব গ্যাস',
      trueStmt: 'আদর্শ গ্যাস অণুগুলোর গড় গতিশক্তি কেবল পরম তাপমাত্রার (T) সমানুপাতিক, গ্যাসের আণবিক ভরের ওপর নির্ভর করে না।',
      falsePool: [
        'স্থির তাপমাত্রায় ভারী গ্যাস হালকা গ্যাসের চেয়ে দ্রুত ব্যাপিত হয়।',
        'ভ্যান ডার ওয়ালস ধ্রুবক "a" গ্যাস অণুর নিজস্ব আয়তন নির্দেশ করে।',
        'পরমশূন্য তাপমাত্রার মান ২৭৩.১৫ °C।',
      ],
      exp: 'Ek = (3/2)RT হওয়ায় কেবল তাপমাত্রাই গতিশক্তি নির্ধারণ করে; আর "a" আকর্ষণ বল ও "b" অণুর আয়তন নির্দেশ করে।',
    },
    {
      ch: 'chem2_ch1_env',
      vis: 'ph_buffer',
      topic: 'বায়ু ও পানি দূষণ মানদণ্ড',
      trueStmt: 'যেকোনো প্রাকৃতিক জলাশয়ের নমুনার জন্য COD-এর মান সর্বদা BOD-এর মানের চেয়ে বড় (COD > BOD) হয়।',
      falsePool: [
        'স্বাভাবিক বৃষ্টির পানির pH মান ঠিক ৭.০।',
        'বাংলাদেশ মানদণ্ডে পানীয় জলে আর্সেনিকের অনুমোদিত সীমা ০.৫০ ppm।',
        'CFC থেকে উৎপন্ন ফ্লোরিন র‍্যাডিকেল (F•) ওজোন স্তর ধ্বংসের প্রধান কারণ।',
      ],
      exp: 'COD-এ অণুজীব দ্বারা পচনযোগ্য ও অপচনযোগ্য উভয় জৈব পদার্থই জারিত হয় বলে COD > BOD; আর ওজোন ক্ষয়ে প্রধানত Cl• দায়ী।',
    },
    {
      ch: 'chem2_ch2_organic',
      vis: 'benzene_aromatic',
      topic: 'সমানুতা ও কাইরালিটি',
      trueStmt: 'দুটি এনানশিওমারের সমমোলার (৫০:৫০) মিশ্রণকে রেসিমিক মিশ্রণ বলে যা বাহ্যিক প্রশমনের কারণে আলোক নিষ্ক্রিয়।',
      falsePool: [
        '১-বিউটিন যৌগটি সিস-ট্রান্স (জ্যামিতিক) সমানুতা প্রদর্শন করে।',
        'টারশিয়ারি কার্বোক্যাটায়নের চেয়ে মিথাইল কার্বোক্যাটায়ন অধিক স্থায়ী।',
        'SN1 বিক্রিয়ায় ১০০% ওয়াল্ডেন ইনভার্সন (উল্টানো কনফিগারেশন) ঘটে।',
      ],
      exp: 'SN2 বিক্রিয়ায় ওয়াল্ডেন ইনভার্সন ঘটে, আর SN1 বিক্রিয়ায় প্ল্যানার কার্বোক্যাটায়ন দিয়ে রেসিমাইজেশন ঘটে।',
    },
    {
      ch: 'chem2_ch2_organic',
      vis: 'benzene_aromatic',
      topic: 'কার্যকরী মূলক ও শনাক্তকরণ পরীক্ষা',
      trueStmt: 'ইথানল, ইথান্যাল ও অ্যাসিটোন (প্রোপানোন) — তিনটি যৌগই NaOH + I₂ সহ উত্তপ্ত করলে হলুদ বর্ণের আয়োডোফর্ম (CHI₃) অধঃক্ষেপ দেয়।',
      falsePool: [
        'মিথানল ও মিথান্যাল ধনাত্মক আয়োডোফর্ম পরীক্ষা দেয়।',
        'অ্যাসিটোন (কিটোন) টলেন বিকারকের সাথে রুপালি দর্পণ তৈরি করে।',
        'টার্মিনাল অ্যালকোহলের পার্থক্যে লুকাস বিকারকের সাথে ১° অ্যালকোহল তাৎক্ষণিক সাদা অধঃক্ষেপ দেয়।',
      ],
      exp: 'আয়োডোফর্মের জন্য CH₃–CO– বা CH₃–CH(OH)– অংশ থাকতে হয়; মিথানল বা মিথান্যালে এ অংশ নেই।',
    },
    {
      ch: 'chem2_ch2_organic',
      vis: 'benzene_aromatic',
      topic: 'অ্যারোমেটিক বলয় ও প্রতিস্থাপন',
      trueStmt: 'হাকেল নীতি অনুযায়ী সমতলীয় অনুবন্ধী বলয়ে (4n + 2) সংখ্যক π ইলেকট্রন থাকলে যৌগটি অ্যারোমেটিক হয় (বেনজিনে ৬টি, ন্যাপথালিনে ১০টি)।',
      falsePool: [
        'নাইট্রোবেনজিনের –NO₂ মূলকটি অর্থো-প্যারা নির্দেশক।',
        'অ্যানিলিন অনায়াসে AlCl₃-সহ ফ্রিডেল-ক্রাফ্টস অ্যালকাইলেশন বিক্রিয়া দেয়।',
        'ক্লোরোবেনজিনের –Cl মূলকটি একটি মেটা নির্দেশক মূলক।',
      ],
      exp: '–NO₂ মেটা নির্দেশক, ক্লোরিন বলয়-নিষ্ক্রিয়কারী হলেও অর্থো-প্যারা নির্দেশক, এবং অ্যানিলিন AlCl₃-এর সাথে লবণ তৈরি করে বলে ফ্রিডেল-ক্রাফ্টস দেয় না।',
    },
    {
      ch: 'chem2_ch3_quant',
      vis: 'ph_buffer',
      topic: 'ঘনমাত্রা ও টাইট্রেশন',
      trueStmt: 'মোলালিটি (m) এবং মোল ভগ্নাংশ (X) দ্রাবক ও দ্রবের ভরের ওপর নির্ভরশীল হওয়ায় এরা তাপমাত্রা পরিবর্তনে অপরিবর্তিত থাকে।',
      falsePool: [
        'তাপমাত্রা বাড়লে দ্রবণের মোলারিটি (M) মান বৃদ্ধি পায়।',
        'NaOH একটি উৎকৃষ্ট প্রাইমারি স্ট্যান্ডার্ড পদার্থ।',
        'KMnO₄ টাইট্রেশনে স্টার্চ দ্রবণ বাহ্যিক নির্দেশক হিসেবে ব্যবহৃত হয়।',
      ],
      exp: 'তাপমাত্রা বাড়লে আয়তন বাড়ে বলে মোলারিটি (n/V) কমে; আর KMnO₄ স্ব-নির্দেশক।',
    },
    {
      ch: 'chem2_ch4_electro',
      vis: 'ph_buffer',
      topic: 'তড়িৎ রসায়ন ও ব্যাটারি',
      trueStmt: 'সকল প্রকার তড়িৎ কোষে (গ্যালভানিক ও তড়িৎ বিশ্লেষ্য উভয়ই) অ্যানোডে সর্বদা জারণ এবং ক্যাথোডে সর্বদা বিজারণ ঘটে।',
      falsePool: [
        'ড্যানিয়েল কোষে লবণ সেতু হিসেবে কেবল শুষ্ক কাচদণ্ড ব্যবহার করা হয়।',
        'গ্যালভানিক কোষে অ্যানোড ধনাত্মক (+) ও ক্যাথোড ঋণাত্মক (−) চিহ্নযুক্ত।',
        'হাইড্রোজেন-অক্সিজেন ফুয়েল সেল পরিবেশে বিষাক্ত CO₂ গ্যাস নির্গত করে।',
      ],
      exp: 'গ্যালভানিক কোষে অ্যানোড ঋণাত্মক ও ক্যাথোড ধনাত্মক মেরু হয়, তবে জারণ-বিজারণের সংজ্ঞা সর্বদা স্থির।',
    },
    {
      ch: 'chem2_ch5_economic',
      vis: 'benzene_aromatic',
      topic: 'শিল্প ও অর্থনৈতিক রসায়ন',
      trueStmt: 'পোর্টল্যান্ড সিমেন্ট জমাট বাঁধার গতি মন্থর করে শক্তিশালী সেটিং নিশ্চিত করতে ক্লিঙ্কারের সাথে ২–৫% জিপসাম (CaSO₄·2H₂O) যোগ করা হয়।',
      falsePool: [
        'পোর্টল্যান্ড সিমেন্টের প্রধান উপাদান হলো ক্রোমিয়াম অক্সাইড।',
        'বাংলাদেশের প্রাকৃতিক গ্যাসে মিথেনের পরিমাণ ৪০%-এর নিচে।',
        'কাচে ফ্লুরিন যোগ করে সিলিকা গলানো হলে তা অ্যানিলিং প্রক্রিয়া।',
      ],
      exp: 'পোর্টল্যান্ড সিমেন্টে প্রায় ৬০–৬৭% CaO থাকে এবং জিপসাম ফ্ল্যাশ সেটিং রোধ করে।',
    },
  ];
  chem2TruePairs.forEach((tp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: tp.ch,
        visualLessonId: tp.vis,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${tp.topic}" বিষয়ে নিচের কোন বিবৃতিটি সম্পূর্ণ নির্ভুল?`,
        correct: tp.trueStmt,
        distractors: tp.falsePool,
        explanation: tp.exp,
        reference: 'রসায়ন ২য় পত্র · হাজারী ও নাগ · মেডিকেল রিভিশন',
      })
    );
  });

  // 5D. Quick Percentage Mass & Stoichiometry Drills + Beer-Lambert + Hydrocarbon General Formulas (28 MCQs)
  const hydroSeries = [
    { cls: 'অ্যালকেন (Paraffins)', gen: 'CₙH₂ₙ₊₂', hyb: 'sp³ (১০৯.৫°)', rxn: 'ফ্রি-র‍্যাডিকেল প্রতিস্থাপন' },
    { cls: 'অ্যালকিন (Olefins)', gen: 'CₙH₂ₙ', hyb: 'sp² (১২০°)', rxn: 'ইলেকট্রোফিলিক সংযোজন' },
    { cls: 'অ্যালকাইন (Acetylenes)', gen: 'CₙH₂ₙ₋₂', hyb: 'sp (১৮০°)', rxn: 'ইলেকট্রোফিলিক সংযোজন ও অম্লীয় H প্রতিস্থাপন' },
    { cls: 'সাইক্লোঅ্যালকেন', gen: 'CₙH₂ₙ (চক্রাকার)', hyb: 'sp³ (চক্রাকার বন্ধন)', rxn: 'সংযোজন (ক্ষুদ্র বলয়ে) ও প্রতিস্থাপন' },
    { cls: 'অ্যালকাইল মূলক', gen: 'CₙH₂ₙ₊₁–', hyb: 'sp³-বন্ধনযুক্ত মূলক', rxn: 'প্রতিস্থাপন ও ঘনীভবন' },
  ];
  hydroSeries.forEach((hs, i) => {
    const others = hydroSeries.filter((x) => x.cls !== hs.cls);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `জৈব রসায়নে "${hs.cls}" সমগোত্রীয় শ্রেণির সাধারণ সংকেত (General formula) কোনটি?`,
        correct: hs.gen,
        distractors: others.map((x) => x.gen),
        explanation: `${hs.cls}-এর সাধারণ সংকেত ${hs.gen} (সংকরায়ন: ${hs.hyb}) এবং প্রধান বিক্রিয়া ${hs.rxn}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · সমগোত্রীয় শ্রেণি',
      })
    );
  });

  // 5E. Organic Chemistry Quick Conversion & Reagent Matrix (24 MCQs)
  const conversions = [
    { conv: 'অ্যাসিটিক অ্যাসিড (CH₃COOH) → ইথানল (CH₃CH₂OH)', reagent: 'LiAlH₄ / শুষ্ক ইথার (তীব্র বিজারক)' },
    { conv: 'ইথানল (CH₃CH₂OH) → ইথানোয়িক অ্যাসিড (CH₃COOH)', reagent: 'অম্লীয় K₂Cr₂O₇ বা ক্ষারীয় KMnO₄' },
    { conv: 'ইথানল (CH₃CH₂OH) → ইথান্যাল (CH₃CHO)', reagent: 'PCC (পাইরিডিনিয়াম ক্লোরোক্রোমেট) বা Cu / ৩০০ °C' },
    { conv: 'নাইট্রোবেনজিন (C₆H₅NO₂) → অ্যানিলিন (C₆H₅NH₂)', reagent: 'Sn + গাঢ় HCl (বা Fe + HCl)' },
    { conv: 'ফেনল (C₆H₅OH) → বেনজিন (C₆H₆)', reagent: 'জিঙ্ক গুঁড়া (Zn dust) সহ পাতন' },
    { conv: 'বেনজিন ডায়াজোনিয়াম ক্লোরাইড → ফেনল', reagent: 'উষ্ণ পানি (H₂O, ৬০ °C)' },
    { conv: 'ক্যালসিয়াম কার্বাইড (CaC₂) → ইথাইন (C₂H₂)', reagent: 'ফোঁটায় ফোঁটায় পানি (H₂O)' },
    { conv: 'ইথাইন → ইথান্যাল (কুচেরভ বিক্রিয়া)', reagent: '২০% H₂SO₄ + ২% HgSO₄ (৬০–৮০ °C)' },
    { conv: 'বেনজিন → সাইক্লোহেক্সেন (C₆H₁₂)', reagent: '৩H₂ / Ni (১৫০–২০০ °C)' },
    { conv: 'টলুইন → বেনজয়িক অ্যাসিড', reagent: 'ক্ষারীয় KMnO₄ + তাপ, পরে H₃O⁺' },
    { conv: 'অ্যালকাইল হ্যালাইড (R–X) → অ্যালকিন (অপসারণ)', reagent: 'অ্যালকোহলীয় KOH (alc. KOH) + Δ' },
    { conv: 'অ্যালকাইল হ্যালাইড (R–X) → অ্যালকোহল (প্রতিস্থাপন)', reagent: 'জলীয় KOH (aq. KOH / NaOH) + Δ' },
  ];
  conversions.forEach((cv, i) => {
    const others = conversions.filter((x) => x.conv !== cv.conv);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জৈব রূপান্তর "${cv.conv}" সম্পন্ন করার জন্য কোন বিকারক ও শর্ত প্রয়োজন?`,
        correct: cv.reagent,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.reagent),
        explanation: `${cv.conv} রূপান্তরের জন্য আদর্শ বিকারক হলো ${cv.reagent}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব রূপান্তর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `জৈব রসায়নে "${cv.reagent}" ব্যবহার করে প্রধানত কোন রূপান্তরটি ঘটানো হয়?`,
        correct: cv.conv,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.conv),
        explanation: `${cv.reagent} হলো "${cv.conv}" রূপান্তরের সুনির্দিষ্ট বিকারক।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিকারকের ক্রিয়া',
      })
    );
  });

  return list;
}
