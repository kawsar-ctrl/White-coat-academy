import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredA(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sa_${String(seq++).padStart(4, '0')}`;

  // 1. Gas Laws Quantitative Problems (Boyle, Charles, Ideal Gas, Graham Diffusion, RMS Velocity, Dalton) (~70 MCQs)
  // 1A. Boyle's Law P1V1 = P2V2
  [
    { p1: 1, v1: 10, p2: 2, v2: 5 },
    { p1: 2, v1: 12, p2: 4, v2: 6 },
    { p1: 1.5, v1: 8, p2: 3, v2: 4 },
    { p1: 4, v1: 5, p2: 1, v2: 20 },
    { p1: 3, v1: 15, p2: 5, v2: 9 },
    { p1: 2, v1: 25, p2: 5, v2: 10 },
  ].forEach((b) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `স্থির তাপমাত্রায় ${toBnDigits(b.p1)} atm চাপে কোনো গ্যাসের আয়তন ${toBnDigits(b.v1)} লিটার। চাপ ${toBnDigits(b.p2)} atm করা হলে গ্যাসটির নতুন আয়তন কত লিটার হবে?`,
        correct: `${toBnDigits(b.v2)} লিটার`,
        distractors: [
          `${toBnDigits(b.v2 * 2)} লিটার`,
          `${toBnDigits(Math.max(1, b.v2 - 2))} লিটার`,
          `${toBnDigits(b.v1 + b.p2)} লিটার`,
          `${toBnDigits(b.v2 * 3)} লিটার`,
        ],
        explanation: `বয়েলের সূত্র: P₁V₁ = P₂V₂ ⇒ V₂ = (${toBnDigits(b.p1)} × ${toBnDigits(b.v1)}) / ${toBnDigits(b.p2)} = ${toBnDigits(b.v2)} লিটার।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · বয়েলের সূত্র',
      })
    );
  });

  // 1B. Charles's Law V1/T1 = V2/T2
  [
    { v1: 300, t1c: 27, t2c: 327, v2: 600 },
    { v1: 200, t1c: 27, t2c: 177, v2: 300 },
    { v1: 500, t1c: 27, t2c: -123, v2: 250 },
    { v1: 400, t1c: 127, t2c: -73, v2: 200 },
    { v1: 273, t1c: 0, t2c: 273, v2: 546 },
  ].forEach((c) => {
    const t1k = c.t1c + 273;
    const t2k = c.t2c + 273;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `স্থির চাপে ${toBnDigits(c.t1c)} °C তাপমাত্রায় একটি গ্যাসের আয়তন ${toBnDigits(c.v1)} mL। তাপমাত্রা ${toBnDigits(c.t2c)} °C করা হলে আয়তন কত mL হবে?`,
        correct: `${toBnDigits(c.v2)} mL`,
        distractors: [
          `${toBnDigits(Math.round(c.v2 * 1.5))} mL`,
          `${toBnDigits(Math.max(50, c.v2 - 100))} mL`,
          `${toBnDigits(c.v2 + 150)} mL`,
          `${toBnDigits(c.v2 * 2)} mL`,
        ],
        explanation: `চার্লসের সূত্র V₁/T₁ = V₂/T₂ অনুযায়ী T₁ = ${toBnDigits(t1k)} K ও T₂ = ${toBnDigits(t2k)} K; তাই V₂ = ${toBnDigits(c.v1)} × (${toBnDigits(t2k)}/${toBnDigits(t1k)}) = ${toBnDigits(c.v2)} mL।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · চার্লসের সূত্র',
      })
    );
  });

  // 1C. Graham's Law of Diffusion & RMS Velocity Ratios
  const gasPairs = [
    { g1: 'H₂ (M = ২)', m1: 2, g2: 'O₂ (M = ৩২)', m2: 32, ratio: '৪ গুণ', ratioStr: '৪ : ১' },
    { g1: 'He (M = ৪)', m1: 4, g2: 'CH₄ (M = ১৬)', m2: 16, ratio: '২ গুণ', ratioStr: '২ : ১' },
    { g1: 'CH₄ (M = ১৬)', m1: 16, g2: 'SO₂ (M = ৬৪)', m2: 64, ratio: '২ গুণ', ratioStr: '২ : ১' },
    { g1: 'H₂ (M = ২)', m1: 2, g2: 'CH₄ (M = ১৬)', m2: 16, ratio: '২√২ ≈ ২.৮৩ গুণ', ratioStr: '২√২ : ১' },
    { g1: 'He (M = ৪)', m1: 4, g2: 'SO₂ (M = ৬৪)', m2: 64, ratio: '৪ গুণ', ratioStr: '৪ : ১' },
    { g1: 'NH₃ (M = ১৭)', m1: 17, g2: 'CO₂ (M = ৪৪)', m2: 44, ratio: '১.৬১ গুণ', ratioStr: '√(৪৪/১৭)' },
  ];
  gasPairs.forEach((gp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একই তাপমাত্রা ও চাপে ${gp.g1} গ্যাসের ব্যাপন হার ও RMS বেগ ${gp.g2} গ্যাসের তুলনায় কত গুণ?`,
        correct: gp.ratio,
        distractors: ['১৬ গুণ', '১/৪ গুণ', '৮ গুণ', '১/২ গুণ', '৩ গুণ'].filter((x) => x !== gp.ratio),
        explanation: `গ্রাহামের সূত্র r₁/r₂ = √(M₂/M₁) = √(${toBnDigits(gp.m2)}/${toBnDigits(gp.m1)}) = ${gp.ratio}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · ব্যাপন ও RMS বেগ',
      })
    );
  });

  // 1D. STP Gas Mass & Molecule Count Math
  const stpGases = [
    { name: 'CO₂', m: 44, vol: 11.2, mass: 22 },
    { name: 'NH₃', m: 17, vol: 5.6, mass: 4.25 },
    { name: 'O₂', m: 32, vol: 5.6, mass: 8 },
    { name: 'CH₄', m: 16, vol: 44.8, mass: 32 },
    { name: 'N₂', m: 28, vol: 11.2, mass: 14 },
    { name: 'SO₂', m: 64, vol: 5.6, mass: 16 },
  ];
  stpGases.forEach((sg) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `STP-তে (০ °C, ১ atm) ${toBnDigits(sg.vol)} লিটার ${sg.name} গ্যাসের (আণবিক ভর ${toBnDigits(sg.m)}) ভর কত গ্রাম?`,
        correct: `${toBnDigits(sg.mass)} গ্রাম`,
        distractors: [
          `${toBnDigits(sg.m)} গ্রাম`,
          `${toBnDigits(sg.mass * 2)} গ্রাম`,
          `${toBnDigits(Number((sg.mass / 2).toFixed(2)))} গ্রাম`,
          `${toBnDigits(sg.mass + 10)} গ্রাম`,
        ],
        explanation: `STP-তে মোল সংখ্যা n = ${toBnDigits(sg.vol)} / ২২.৪ = ${toBnDigits(sg.vol / 22.4)} mol; অতএব ভর = ${toBnDigits(sg.vol / 22.4)} × ${toBnDigits(sg.m)} = ${toBnDigits(sg.mass)} গ্রাম।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · মোলার আয়তন',
      })
    );
  });

  // 2. Water Quality & Atmospheric Standards Matrix (22 MCQs)
  const envLimits = [
    { item: 'আর্সেনিক (WHO অনুমোদিত সর্বোচ্চ মাত্রা)', val: '০.০১ mg/L (১০ ppb)' },
    { item: 'আর্সেনিক (বাংলাদেশ DoE অনুমোদিত সর্বোচ্চ মাত্রা)', val: '০.০৫ mg/L (৫০ ppb)' },
    { item: 'জলজ প্রাণীর বেঁচে থাকার জন্য ন্যূনতম DO', val: '৪.০ – ৬.০ mg/L (ppm)' },
    { item: 'পানীয় জলের আদর্শ pH পরিসর (WHO)', val: '৬.৫ – ৮.৫' },
    { item: 'স্বাভাবিক অদূষিত বৃষ্টির পানির pH', val: '৫.৬ (দ্রবীভূত CO₂-এর কারণে)' },
    { item: 'বিশুদ্ধ পানীয় জলের সর্বোচ্চ অনুমোদিত TDS', val: '৫০০ mg/L (ppm)' },
    { item: 'বিশুদ্ধ নদী/পুকুরের জলের BOD মান', val: '১ – ৩ ppm (৬ ppm-এর বেশি দূষিত)' },
    { item: 'স্বাভাবিক পরিবেশে বায়ুমণ্ডলে N₂ ও O₂-এর আয়তন %', val: '৭৮.০৯% N₂ এবং ২০.৯৫% O₂' },
    { item: 'বায়ুমণ্ডলে CO₂ গ্যাসের স্বাভাবিক মাত্রা', val: 'প্রায় ০.০৩% – ০.০৪% (~৪০০ ppm)' },
    { item: 'মিনামাটা রোগ সৃষ্টিকারী ভারী ধাতু ও ইটাই-ইটাই ধাতু', val: 'পারদ (Hg²⁺) ও ক্যাডমিয়াম (Cd²⁺)' },
  ];
  envLimits.forEach((el, i) => {
    const others = envLimits.filter((x) => x.item !== el.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পরিবেশ রসায়ন মানদণ্ড অনুযায়ী "${el.item}" কোনটি?`,
        correct: el.val,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.val),
        explanation: `${el.item}-এর স্বীকৃত মান হলো ${el.val}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পানির মানদণ্ড ও দূষণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `পরিবেশগত গুণগত মানে "${el.val}" সংখ্যাগত বা রাসায়নিক তথ্যটি নিচের কোনটির ক্ষেত্রে প্রযোজ্য?`,
        correct: el.item,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.item),
        explanation: `${el.val} মানটি "${el.item}" নির্দেশ করে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরিবেশ রসায়ন',
      })
    );
  });

  // 3. Organic Chemistry: IUPAC Functional Groups, Isomer Counts & Optical Isomer Math (~68 MCQs)
  const iupacGroups = [
    { group: 'কার্বক্সিলিক অ্যাসিড (–COOH)', suffix: '–ওইক অ্যাসিড (–oic acid)', prefix: 'কার্বক্সি (Carboxy)' },
    { group: 'সালফোনিক অ্যাসিড (–SO₃H)', suffix: '–সালফোনিক অ্যাসিড', prefix: 'সালফো (Sulfo)' },
    { group: 'এস্টার (–COOR)', suffix: '–অ্যালকাইল –ওয়েট (–oate)', prefix: 'অ্যালকোক্সিকার্বনিল' },
    { group: 'অ্যাসিড অ্যামাইড (–CONH₂)', suffix: '–অ্যামাইড (–amide)', prefix: 'কার্বাময়েল (Carbamoyl)' },
    { group: 'নাইট্রাইল বা সায়ানাইড (–CN)', suffix: '–নাইট্রাইল (–nitrile)', prefix: 'সায়ানো (Cyano)' },
    { group: 'অ্যালডিহাইড (–CHO)', suffix: '–অ্যাল (–al)', prefix: 'ফরমাইল / অক্সো (Formyl/Oxo)' },
    { group: 'কিটোন (>C=O)', suffix: '–ওন (–one)', prefix: 'অক্সো / কিটো (Oxo/Keto)' },
    { group: 'অ্যালকোহল (–OH)', suffix: '–অল (–ol)', prefix: 'হাইড্রক্সি (Hydroxy)' },
    { group: 'অ্যামিন (–NH₂)', suffix: '–অ্যামিন (–amine)', prefix: 'অ্যামিনো (Amino)' },
  ];
  iupacGroups.forEach((ig, i) => {
    const others = iupacGroups.filter((x) => x.group !== ig.group);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `IUPAC পদ্ধতিতে "${ig.group}" প্রধান কার্যকরী মূলক হিসেবে থাকলে নামের শেষে কোন প্রত্যয় (Suffix) যুক্ত হয়?`,
        correct: ig.suffix,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.suffix),
        explanation: `${ig.group} প্রধান মূলক হলে Suffix "${ig.suffix}" এবং গৌণ মূলক হলে Prefix "${ig.prefix}" ব্যবহৃত হয়।`,
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
        difficulty: 'medical',
        question: `জৈব যৌগে "${ig.group}" গৌণ (সাবসিডিয়ারি) মূলক হিসেবে অবস্থান করলে কোন উপসর্গ (Prefix) ব্যবহৃত হয়?`,
        correct: ig.prefix,
        distractors: others.slice((i + 3) % 5, ((i + 3) % 5) + 4).map((x) => x.prefix),
        explanation: `অগ্রাধিকার কম হওয়ায় ${ig.group} মূলকটি "${ig.prefix}" উপসর্গ হিসেবে নামের পূর্বে বসে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · কার্যকরী মূলক উপসর্গ',
      })
    );
  });

  // Structural & Stereoisomer Count Drills
  const isomerCounts = [
    { formula: 'বিউটেন (C₄H₁₀)', count: '২টি চেইন সমানু', note: 'n-বিউটেন ও আইসোবিউটেন (২-মিথাইলপ্রোপেন)।' },
    { formula: 'পেন্টেন (C₅H₁₂)', count: '৩টি চেইন সমানু', note: 'n-পেন্টেন, আইসোপেন্টেন ও নিওপেন্টেন।' },
    { formula: 'হেক্সেন (C₆H₁₄)', count: '৫টি গাঠনিক সমানু', note: '১টি সরল শিকল ও ৪টি শাখাযুক্ত শিকল সমানু।' },
    { formula: 'হেপ্টেন (C₇H₁₆)', count: '৯টি গাঠনিক সমানু', note: 'অ্যালকেন সমগোত্রীয় শ্রেণিতে C₇H₁₆-এর ৯টি সমানু আছে।' },
    { formula: 'C₄H₁₀O সংকেতযুক্ত মোট গাঠনিক সমানু (অ্যালকোহল ও ইথার মিলে)', count: '৭টি (৪টি অ্যালকোহল + ৩টি ইথার)', note: 'বিউটানল-১, বিউটানল-২, আইসোবিউটানল, টার্ট-বিউটানল এবং ৩টি ইথার।' },
    { formula: 'ডাইক্লোরোবেনজিন (C₆H₄Cl₂)', count: '৩টি অবস্থান সমানু (অর্থো, মেটা, প্যারা)', note: '১,২-, ১,৩- ও ১,৪-ডাইক্লোরোবেনজিন।' },
    { formula: 'ল্যাকটিক অ্যাসিড [CH₃CH(OH)COOH] (১টি কাইরাল কার্বন)', count: '২টি আলোক সক্রিয় সমানু (d ও l)', note: '2¹ = ২টি এনানশিওমার (এবং ৫০:৫০ মিশ্রণ রেসিমিক)।' },
    { formula: 'টারটারিক অ্যাসিড (২টি অভিন্ন কাইরাল কার্বন)', count: '৩টি আলোক সমানু (d, l ও ১টি নিষ্ক্রিয় মেসো)', note: 'অভ্যন্তরীণ প্রতিসাম্য থাকায় d, l ও একটি অপটিক্যালি নিষ্ক্রিয় মেসো রূপ পাওয়া যায়।' },
  ];
  isomerCounts.forEach((ic, i) => {
    const others = isomerCounts.filter((x) => x.formula !== ic.formula);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ic.formula}"-এর ক্ষেত্রে মোট সমানুর সংখ্যা নিচের কোনটি?`,
        correct: ic.count,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.count),
        explanation: `${ic.formula}: ${ic.count}। ${ic.note}`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · সমানু সংখ্যা',
      })
    );
  });

  // 4. Named Organic Reactions & Identification Tests Matrix (~90 MCQs)
  const organicTests = [
    { test: 'বেয়ার পরীক্ষা (শীতল ক্ষারীয় ১% KMnO₄)', target: 'অ্যালকিন ও অ্যালকাইন (অসম্পৃক্ততা)', obs: 'বেগুনি KMnO₄ বর্ণহীন হয়ে বাদামি MnO₂ অধঃক্ষেপ পড়ে' },
    { test: 'ব্রোমিন পানি পরীক্ষা (Br₂ / CCl₄)', target: 'অসম্পৃক্ত কার্বন-কার্বন দ্বিবন্ধন বা ত্রিবন্ধন', obs: 'লালচে-কমলা ব্রোমিন দ্রবণ তাৎক্ষণিক বর্ণহীন হয়' },
    { test: 'লুকাস বিকারক (অনার্দ্র ZnCl₂ + গাঢ় HCl)', target: '১°, ২° ও ৩° অ্যালকোহল পার্থক্যকরণ', obs: '৩° অ্যালকোহলে তাৎক্ষণিক, ২°-তে ৫–১০ মিনিটে সাদা অধঃক্ষেপ ও ১°-তে বিক্রিয়া নেই' },
    { test: 'টলেন বিকারক ([Ag(NH₃)₂]OH)', target: 'অ্যালডিহাইড (–CHO) বনাম কিটোন পার্থক্যকরণ', obs: 'টেস্টটিউবের গায়ে উজ্জ্বল রুপালি সিলভার দর্পণ গঠিত হয়' },
    { test: 'ফেহলিং দ্রবণ পরীক্ষা (Cu²⁺-টারটারেট জটিল)', target: 'অ্যালিফ্যাটিক অ্যালডিহাইড ও রিডিউসিং সুগার', obs: 'কিউপ্রাস অক্সাইডের (Cu₂O) ইটের মতো লাল অধঃক্ষেপ পড়ে' },
    { test: '২,৪-ডাইনাইট্রোফিনাইলহাইড্রাজিন (2,4-DNP / ব্র্যাডির বিকারক)', target: 'কার্বনিল মূলক (>C=O — অ্যালডিহাইড ও কিটোন উভয়ই)', obs: 'উজ্জ্বল হলুদ-কমলা রঙের হাইড্রাজোন অধঃক্ষেপ সৃষ্টি হয়' },
    { test: 'আয়োডোফর্ম পরীক্ষা (I₂ + NaOH)', target: 'CH₃–CO– বা CH₃–CH(OH)– মূলকযুক্ত যৌগ (ইথানল, ইথান্যাল, অ্যাসিটোন)', obs: 'সুনির্দিষ্ট মিষ্টি গন্ধযুক্ত হলুদ CHI₃ কেলাস অধঃক্ষিপ্ত হয়' },
    { test: 'কার্বিল-অ্যামিন পরীক্ষা (CHCl₃ + অ্যালকোহলীয় KOH)', target: 'প্রাইমারি (১°) অ্যামিন ও ক্লোরোফর্ম শনাক্তকরণ', obs: 'অসহ্য তীব্র দুর্গন্ধযুক্ত আইসোসায়ানাইড বা কার্বিল-অ্যামিন (R–NC) উৎপন্ন হয়' },
    { test: 'নিরপেক্ষ ফেরিক ক্লোরাইড (FeCl₃) পরীক্ষা', target: 'ফেনল (Ar–OH) ও ইনল মূলক শনাক্তকরণ', obs: 'গাঢ় বেগুনি বর্ণের জটিল যৌগ তৈরি হয়' },
    { test: 'NaHCO₃ (সোডিয়াম বাইকার্বনেট) দ্রবণ পরীক্ষা', target: 'কার্বক্সিলিক অ্যাসিড (–COOH) ও ফেনল পার্থক্যকরণ', obs: 'ফেনল দেয় না কিন্তু কার্বক্সিলিক অ্যাসিড তীব্র CO₂ বুদবুদ সৃষ্টি করে' },
    { test: 'অ্যামোনিয়াম Cu(I) ক্লোরাইড বা [Ag(NH₃)₂]⁺ পরীক্ষা', target: 'টার্মিনাল অ্যালকাইন (১-অ্যালকাইন, যেমন ইথাইন ও প্রোপাইন)', obs: 'লালচে-বাদামি Cu₂C₂ বা সাদা Ag₂C₂ অ্যাসিটাইলাইড অধঃক্ষেপ পড়ে' },
    { test: 'স্যালিসাইলিক বা লিবারম্যান নাইট্রোসো পরীক্ষা (NaNO₂ + গাঢ় H₂SO₄)', target: 'সেকেন্ডারি (২°) অ্যামিন ও ফেনল', obs: 'সবুজ-নীল থেকে পানিতে লাল এবং ক্ষারে নীল বর্ণ পরিবর্তিত হয়' },
  ];
  organicTests.forEach((ot, i) => {
    const others = organicTests.filter((x) => x.test !== ot.test);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জৈব রসায়নে "${ot.target}" শনাক্তকরণ বা পার্থক্যকরণের জন্য কোন পরীক্ষাটি ব্যবহৃত হয়?`,
        correct: ot.test,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.test),
        explanation: `${ot.target} শনাক্তকরণে ${ot.test} করা হয়; এতে ${ot.obs}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · কার্যকরী মূলক পরীক্ষা',
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
        question: `"${ot.test}" প্রয়োগ করলে নিচের কোন বৈশিষ্ট্যপূর্ণ পর্যবেক্ষণ পাওয়া যায়?`,
        correct: ot.obs,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.obs),
        explanation: `${ot.test} হলো ${ot.target} পরীক্ষার পদ্ধতি, যাতে ${ot.obs}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · শনাক্তকরণ পর্যবেক্ষণ',
      })
    );
  });

  const namedRxns = [
    { name: 'উর্টজ বিক্রিয়া (Wurtz)', reactant: 'অ্যালকাইল হ্যালাইড (R–X) + Na / শুষ্ক ইথার', product: 'দ্বিগুণ কার্বনের প্রতিসম অ্যালকেন (R–R)' },
    { name: 'ফ্রিডেল-ক্রাফ্টস অ্যালকাইলেশন', reactant: 'বেনজিন + CH₃Cl / অনার্দ্র AlCl₃', product: 'টলুইন (মিথাইল বেনজিন)' },
    { name: 'ক্যানিজারো বিক্রিয়া (Cannizzaro)', reactant: 'α-H বিহীন অ্যালডিহাইড (HCHO/C₆H₅CHO) + ৫০% NaOH', product: 'অ্যালকোহল ও কার্বক্সিলিক অ্যাসিডের লবণ' },
    { name: 'অ্যালডল ঘনীভবন (Aldol)', reactant: 'α-H যুক্ত অ্যালডিহাইড (CH₃CHO) + লঘু NaOH', product: 'β-হাইড্রক্সি অ্যালডিহাইড (অ্যালডল)' },
    { name: 'হফম্যান ক্ষুদ্রাংশকরণ', reactant: 'অ্যামাইড (RCONH₂) + Br₂ + গাঢ় KOH', product: '১ কার্বন কম প্রাইমারি অ্যামিন (RNH₂)' },
    { name: 'ক্লেমেনসন বিজারণ (Clemmensen)', reactant: 'অ্যালডিহাইড/কিটোন + Zn-Hg ও গাঢ় HCl', product: 'অ্যালকেন (>C=O → >CH₂)' },
    { name: 'রাইমার-টাইম্যান বিক্রিয়া', reactant: 'ফেনল + CHCl₃ + NaOH (৬০–৭০ °C)', product: 'স্যালিসাইল্যালডিহাইড (২-হাইড্রক্সিবেঞ্জালডিহাইড)' },
    { name: 'কোলবে বিক্রিয়া (Kolbe)', reactant: 'সোডিয়াম ফিনেট + CO₂ (১২৫ °C, ৪–৭ atm)', product: 'স্যালিসাইলিক অ্যাসিড' },
    { name: 'স্য্যান্ডমেয়ার বিক্রিয়া (Sandmeyer)', reactant: 'বেনজিন ডায়াজোনিয়াম ক্লোরাইড + Cu₂Cl₂ / HCl', product: 'ক্লোরোবেনজিন (+ N₂↑)' },
    { name: 'উইলিয়ামসন সংশ্লেষণ', reactant: 'সোডিয়াম অ্যালকোক্সাইড (RONa) + ১° অ্যালকাইল হ্যালাইড', product: 'প্রতিসম বা অপ্রতিসম ইথার (R–O–R′)' },
    { name: 'রোজেনমুন্ড বিজারণ (Rosenmund)', reactant: 'অ্যাসাইল ক্লোরাইড (RCOCl) + H₂ / Pd-BaSO₄', product: 'অ্যালডিহাইড (R–CHO)' },
    { name: 'ডিকার্বক্সিলেশন (সোডালাইম বিক্রিয়া)', reactant: 'কার্বক্সিলিক অ্যাসিডের সোডিয়াম লবণ + NaOH(CaO) / Δ', product: '১ কার্বন কম অ্যালকেন (R–H)' },
  ];
  namedRxns.forEach((nr, i) => {
    const others = namedRxns.filter((x) => x.name !== nr.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${nr.reactant}" বিক্রিয়াটি জৈব রসায়নে কোন নামে পরিচিত এবং এর প্রধান উৎপাদ কী?`,
        correct: `${nr.name} → ${nr.product}`,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => `${x.name} → ${x.product}`),
        explanation: `${nr.reactant} থেকে ${nr.product} উৎপাদন প্রক্রিয়াটি ${nr.name} নামে পরিচিত।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · নামযুক্ত বিক্রিয়া',
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
        question: `জৈব সংশ্লেষণে "${nr.name}" বিক্রিয়ার জন্য প্রয়োজনীয় বিক্রিয়ক ও বিকারক কোনটি?`,
        correct: nr.reactant,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.reactant),
        explanation: `${nr.name}-এ ${nr.reactant} বিক্রিয়া করে ${nr.product} তৈরি হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিকারক ও শর্ত',
      })
    );
  });

  // 5. Aromatic Directing Groups (o/p vs meta) & Polymer/Drug Monomers (30 MCQs)
  const orthoMeta = [
    { grp: '–NH₂ / –OH / –OCH₃', type: 'শক্তিশালী বলয়-সক্রিয়কারী ও অর্থো-প্যারা নির্দেশক' },
    { grp: '–CH₃ / –C₂H₅ (অ্যালকাইল মূলক)', type: 'হাইপারকনজুগেশনে বলয়-সক্রিয়কারী ও অর্থো-প্যারা নির্দেশক' },
    { grp: '–Cl / –Br / –I (হ্যালোজেনসমূহ)', type: 'ব্যতিক্রম: বলয়-নিষ্ক্রিয়কারী (–I) কিন্তু অর্থো-প্যারা নির্দেশক (+M)' },
    { grp: '–NO₂ / –CN / –SO₃H / –COOH / –CHO', type: 'বলয়-নিষ্ক্রিয়কারী ও মেটা (meta) নির্দেশক' },
  ];
  orthoMeta.forEach((om) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `বেনজিন বলয়ে যুক্ত থাকলে "${om.grp}" মূলকটি প্রতিস্থাপন বিক্রিয়ায় কী ধরনের নির্দেশক ও সক্রিয়তা প্রভাব দেখায়?`,
        correct: om.type,
        distractors: orthoMeta.filter((x) => x.grp !== om.grp).map((x) => x.type),
        explanation: `${om.grp}: ${om.type}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · নির্দেশক মূলক',
      })
    );
  });

  const polymersDrugs = [
    { prod: 'পলিথিন (PE)', mono: 'ইথিন (CH₂=CH₂)' },
    { prod: 'পিভিসি (PVC)', mono: 'ভিনাইল ক্লোরাইড (CH₂=CH–Cl)' },
    { prod: 'টেফলন (PTFE)', mono: 'টেট্রাফ্লোরোইথিলিন (CF₂=CF₂)' },
    { prod: 'পলিস্টাইরিন', mono: 'স্টাইরিন (ভিনাইল বেনজিন)' },
    { prod: 'নাইলন-৬,৬', mono: 'হেক্সামিথিলিনডাইঅ্যামিন + এডিপিক অ্যাসিড' },
    { prod: 'টেরিলিন / ড্যাক্রন (পলিয়েস্টার)', mono: 'ইথিলিন গ্লাইকল + টেরেফথ্যালিক অ্যাসিড' },
    { prod: 'ব্যাকেলাইট (থার্মোসেটিং)', mono: 'ফেনল + ফরমালডিহাইড (মিথান্যাল)' },
    { prod: 'প্রাকৃতিক রাবার', mono: 'আইসোপ্রিন (২-মিথাইল-১,৩-বিউটাডাইইন)' },
    { prod: 'অ্যাসপিরিন (ব্যথানাশক)', mono: 'স্যালিসাইলিক অ্যাসিড + অ্যাসিটিক অ্যানহাইড্রাইড' },
    { prod: 'প্যারাসিটামল (জ্বরনাশক)', mono: 'p-অ্যামিনোফেনল + অ্যাসিটিক অ্যানহাইড্রাইড' },
  ];
  polymersDrugs.forEach((pd, i) => {
    const others = polymersDrugs.filter((x) => x.prod !== pd.prod);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${pd.prod}" তৈরি করতে মনোমার বা প্রধান কাঁচামাল হিসেবে নিচের কোনটি ব্যবহৃত হয়?`,
        correct: pd.mono,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.mono),
        explanation: `${pd.mono} থেকে পলিমারকরণ বা সংশ্লেষণের মাধ্যমে ${pd.prod} প্রস্তুত করা হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · পলিমার ও ওষুধ',
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
        question: `"${pd.mono}" মনোমার বা উপাদান থেকে নিচের কোন বহুল ব্যবহৃত পলিমার বা যৌগ উৎপাদিত হয়?`,
        correct: pd.prod,
        distractors: others.slice((i + 3) % 5, ((i + 3) % 5) + 4).map((x) => x.prod),
        explanation: `${pd.mono} ব্যবহৃত হয় ${pd.prod} তৈরিতে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · মনোমার-পলিমার',
      })
    );
  });

  return list;
}
