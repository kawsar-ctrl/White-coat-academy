import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredC(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sc_${String(seq++).padStart(4, '0')}`;

  // 1. Quantitative Stoichiometry: Mole Count, Mass, Molecule/Atom Counts & Mass % (42 MCQs)
  const moleComps = [
    { name: 'CO₂ (M = ৪৪)', m: 44, g: 22, mol: 0.5 },
    { name: 'NH₃ (M = ১৭)', m: 17, g: 34, mol: 2 },
    { name: 'H₂SO₄ (M = ৯৮)', m: 98, g: 49, mol: 0.5 },
    { name: 'CaCO₃ (M = ১০০)', m: 100, g: 25, mol: 0.25 },
    { name: 'NaOH (M = ৪০)', m: 40, g: 10, mol: 0.25 },
    { name: 'গ্লুকোজ C₆H₁₂O₆ (M = ১৮০)', m: 180, g: 36, mol: 0.2 },
    { name: 'CH₄ (M = ১৬)', m: 16, g: 48, mol: 3 },
    { name: 'ইউরিয়া NH₂CONH₂ (M = ৬০)', m: 60, g: 15, mol: 0.25 },
  ];
  moleComps.forEach((mc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(mc.g)} গ্রাম ${mc.name}-এর মধ্যে কত মোল যৌগ বিদ্যমান?`,
        correct: `${toBnDigits(mc.mol)} মোল`,
        distractors: [0.1, 0.2, 0.25, 0.5, 1, 2, 3, 4]
          .filter((x) => x !== mc.mol)
          .map((x) => `${toBnDigits(x)} মোল`),
        explanation: `মোল সংখ্যা n = W / M = ${toBnDigits(mc.g)} / ${toBnDigits(mc.m)} = ${toBnDigits(mc.mol)} মোল।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মোল হিসাব',
      })
    );
    const avogMult = mc.mol === 1 ? 'N_A' : `${toBnDigits(mc.mol)} × N_A`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(mc.g)} গ্রাম ${mc.name}-এ মোট অণুর সংখ্যা অ্যাভোগাড্রো ধ্রুবক (N_A = ৬.০২২ × ১০²³)-এর সাপেক্ষে কতটি?`,
        correct: avogMult,
        distractors: ['০.২৫ × N_A', '০.৫ × N_A', '২ × N_A', '৩ × N_A', '৪ × N_A', '০.২ × N_A'].filter(
          (x) => x !== avogMult
        ),
        explanation: `মোল সংখ্যা n = ${toBnDigits(mc.mol)} হওয়ায় অণু সংখ্যা = n × N_A = ${avogMult}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · অণুর সংখ্যা',
      })
    );
  });

  // Mass Percentage Composition Matrix
  const pctComps = [
    { comp: 'ইউরিয়া (NH₂CONH₂, M = ৬০)-তে নাইট্রোজেন (N)', pct: '৪৬.৬৭%' },
    { comp: 'অ্যামোনিয়াম নাইট্রেট (NH₄NO₃, M = ৮০)-এ নাইট্রোজেন (N)', pct: '৩৫%' },
    { comp: 'অ্যামোনিয়াম সালফেট [(NH₄)₂SO₄, M = ১৩২]-এ নাইট্রোজেন (N)', pct: '২১.২১%' },
    { comp: 'চুনাপাথর (CaCO₃, M = ১০০)-এ ক্যালসিয়াম (Ca)', pct: '৪০%' },
    { comp: 'গ্লুকোজ (C₆H₁₂O₆, M = ১৮০)-এ কার্বন (C)', pct: '৪০% (C=৭২/১৮০)' },
    { comp: 'মিথেন (CH₄, M = ১৬)-এ কার্বন (C)', pct: '৭৫%' },
    { comp: 'সালফিউরিক অ্যাসিড (H₂SO₄, M = ৯৮)-এ সালফার (S)', pct: '৩২.৬৫%' },
    { comp: 'সোডিয়াম হাইড্রোক্সাইড (NaOH, M = ৪০)-এ অক্সিজেন (O)', pct: '৪০% (O=১৬/৪০)' },
  ];
  pctComps.forEach((pc, i) => {
    const others = pctComps.filter((x) => x.comp !== pc.comp && x.pct !== pc.pct);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${pc.comp}"-এর ভরের শতকরা সংযুক্তি (Percentage composition) কত?`,
        correct: pc.pct,
        distractors: Array.from(new Set(others.map((x) => x.pct))).concat(['৫৫%', '২৮%']),
        explanation: `${pc.comp}-এর শতকরা পরিমাণ হলো ${pc.pct}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · শতকরা সংযুক্তি',
      })
    );
  });

  // 2. Equivalent Weight (E = M / e) & Dilution/Preparation Calculations (~42 MCQs)
  const eqWeights = [
    { name: 'H₂SO₄ (M = ৯৮, ক্ষারকতা ২)', e: '৪৯' },
    { name: 'HCl (M = ৩৬.৫, ক্ষারকতা ১)', e: '৩৬.৫' },
    { name: 'NaOH (M = ৪০, অম্লতা ১)', e: '৪০' },
    { name: 'Na₂CO₃ (M = ১০৬, যোজ্যতা ২)', e: '৫৩' },
    { name: 'অনার্দ্র অক্সালিক অ্যাসিড H₂C₂O₄ (M = ৯০)', e: '৪৫' },
    { name: 'সোদক অক্সালিক অ্যাসিড H₂C₂O₄·2H₂O (M = ১২৬)', e: '৬৩' },
    { name: 'অম্লীয় মাধ্যমে KMnO₄ (M = ১৫৮, e = ৫)', e: '৩১.৬' },
    { name: 'অম্লীয় মাধ্যমে K₂Cr₂O₇ (M = ২৯৪, e = ৬)', e: '৪৯ (২৯৪/৬)' },
    { name: 'আয়োডোমিতিতে Na₂S₂O₃·5H₂O (M = ২৪৮, e = ১)', e: '২৪৮' },
    { name: 'Al₂(SO₄)₃ (M = ৩৪২, মোট ক্যাটায়ন চার্জ +৬)', e: '৫৭' },
  ];
  eqWeights.forEach((ew, i) => {
    const others = eqWeights.filter((x) => x.name !== ew.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `আয়তনিক বিশ্লেষণে "${ew.name}"-এর রাসায়নিক তুল্য ভর (Equivalent Weight, E = M/e) কত?`,
        correct: ew.e,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.e),
        explanation: `তুল্য ভর E = আণবিক ভর / তুল্য সংখ্যা অনুযায়ী ${ew.name}-এর তুল্য ভর ${ew.e}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · তুল্য ভর',
      })
    );
  });

  // Preparation Mass w = (S * M * V) / 1000
  const prepMass = [
    { sub: 'Na₂CO₃ (M = ১০৬)', s: 0.1, v: 250, w: 2.65 },
    { sub: 'Na₂CO₃ (M = ১০৬)', s: 0.05, v: 500, w: 2.65 },
    { sub: 'NaOH (M = ৪০)', s: 0.2, v: 500, w: 4 },
    { sub: 'NaOH (M = ৪০)', s: 0.5, v: 200, w: 4 },
    { sub: 'H₂C₂O₄·2H₂O (M = ১২৬)', s: 0.1, v: 100, w: 1.26 },
    { sub: 'K₂Cr₂O₇ (M = ২৯৪)', s: 0.05, v: 200, w: 2.94 },
    { sub: 'H₂SO₄ (M = ৯৮)', s: 0.5, v: 100, w: 4.9 },
    { sub: 'NaCl (M = ৫৮.৫)', s: 0.2, v: 250, w: 2.925 },
  ];
  prepMass.forEach((pm) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(pm.v)} mL আয়তনের ${toBnDigits(pm.s)} M ${pm.sub} প্রমাণ দ্রবণ তৈরি করতে কত গ্রাম দ্রব প্রয়োজন হবে?`,
        correct: `${toBnDigits(pm.w)} গ্রাম`,
        distractors: [
          `${toBnDigits(Number((pm.w * 2).toFixed(3)))} গ্রাম`,
          `${toBnDigits(Number((pm.w / 2).toFixed(3)))} গ্রাম`,
          `${toBnDigits(Number((pm.w * 10).toFixed(3)))} গ্রাম`,
          `${toBnDigits(Number((pm.w + 1.5).toFixed(3)))} গ্রাম`,
        ],
        explanation: `w = (S × M × V) / ১০০০ সূত্রানুসারে w = ${toBnDigits(pm.w)} গ্রাম।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · প্রমাণ দ্রবণ তৈরি',
      })
    );
  });

  // 3. Dalton Partial Pressure, Mole Fraction & Ideal Gas Calculations (~36 MCQs)
  const daltonCases = [
    { nA: 2, gA: 'N₂', nB: 3, gB: 'O₂', pTot: 10, pA: 4, pB: 6 },
    { nA: 1, gA: 'CH₄', nB: 4, gB: 'He', pTot: 5, pA: 1, pB: 4 },
    { nA: 3, gA: 'H₂', nB: 1, gB: 'N₂', pTot: 8, pA: 6, pB: 2 },
    { nA: 2, gA: 'CO₂', nB: 2, gB: 'Ar', pTot: 12, pA: 6, pB: 6 },
    { nA: 1, gA: 'O₂', nB: 4, gB: 'N₂', pTot: 1, pA: 0.2, pB: 0.8 },
  ];
  daltonCases.forEach((dc) => {
    const nTot = dc.nA + dc.nB;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি বদ্ধ পাত্রে ${toBnDigits(dc.nA)} মোল ${dc.gA} এবং ${toBnDigits(dc.nB)} মোল ${dc.gB} গ্যাসের মিশ্রণের মোট চাপ ${toBnDigits(dc.pTot)} atm হলে ${dc.gA} গ্যাসটির আংশিক চাপ কত atm?`,
        correct: `${toBnDigits(dc.pA)} atm`,
        distractors: [
          `${toBnDigits(dc.pB)} atm`,
          `${toBnDigits(dc.pTot)} atm`,
          `${toBnDigits(Number((dc.pA + 1.5).toFixed(2)))} atm`,
          `${toBnDigits(Number((dc.pA * 2.5).toFixed(2)))} atm`,
        ].filter((x) => x !== `${toBnDigits(dc.pA)} atm`),
        explanation: `${dc.gA}-এর মোল ভগ্নাংশ X = ${toBnDigits(dc.nA)} / ${toBnDigits(nTot)}। অতএব আংশিক চাপ = (${toBnDigits(dc.nA)}/${toBnDigits(nTot)}) × ${toBnDigits(dc.pTot)} = ${toBnDigits(dc.pA)} atm।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · ডাল্টনের আংশিক চাপ',
      })
    );
  });

  // RMS Temperature Scaling: C_rms doubles when T quadruples
  [
    { t1k: 300, mult: 2, t2k: 1200 },
    { t1k: 200, mult: 2, t2k: 800 },
    { t1k: 100, mult: 3, t2k: 900 },
    { t1k: 250, mult: 2, t2k: 1000 },
    { t1k: 150, mult: 3, t2k: 1350 },
  ].forEach((rm) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `স্থির আয়তনে ${toBnDigits(rm.t1k)} K তাপমাত্রায় কোনো গ্যাসের RMS বেগকে ${toBnDigits(rm.mult)} গুণ বৃদ্ধি করতে হলে তাপমাত্রাকে কত কেলভিনে (K) উন্নীত করতে হবে?`,
        correct: `${toBnDigits(rm.t2k)} K`,
        distractors: [
          `${toBnDigits(rm.t1k * rm.mult)} K`,
          `${toBnDigits(rm.t2k / 2)} K`,
          `${toBnDigits(rm.t2k + 300)} K`,
          `${toBnDigits(rm.t1k + 273)} K`,
        ].filter((x) => x !== `${toBnDigits(rm.t2k)} K`),
        explanation: `C_rms ∝ √T হওয়ায় বেগ ${toBnDigits(rm.mult)} গুণ করতে পরম তাপমাত্রা ${toBnDigits(rm.mult * rm.mult)} গুণ অর্থাৎ ${toBnDigits(rm.t1k)} × ${toBnDigits(rm.mult * rm.mult)} = ${toBnDigits(rm.t2k)} K হতে হবে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · RMS বেগ ও তাপমাত্রা',
      })
    );
  });

  // 4. Electrolysis Products (Cathode & Anode) + ΔG° = -nFE° + Battery Matrix (~44 MCQs)
  const electrolysisTable = [
    { cell: 'গলিত NaCl (Pt তড়িৎদ্বার)', cathode: 'ধাতব সোডিয়াম (Na)', anode: 'ক্লোরিন গ্যাস (Cl₂)' },
    { cell: 'গাঢ় জলীয় NaCl / ব্রাইন (Pt তড়িৎদ্বার)', cathode: 'হাইড্রোজেন গ্যাস (H₂)', anode: 'ক্লোরিন গ্যাস (Cl₂) (দ্রবণে NaOH)' },
    { cell: 'লঘু জলীয় H₂SO₄ (Pt তড়িৎদ্বার)', cathode: 'হাইড্রোজেন গ্যাস (H₂, ২ আয়তন)', anode: 'অক্সিজেন গ্যাস (O₂, ১ আয়তন)' },
    { cell: 'জলীয় CuSO₄ দ্রবণ (নিষ্ক্রিয় Pt তড়িৎদ্বার)', cathode: 'কপার ধাতু (Cu)', anode: 'অক্সিজেন গ্যাস (O₂) (দ্রবণ অম্লীয় হয়)' },
    { cell: 'জলীয় CuSO₄ দ্রবণ (সক্রিয় Cu তড়িৎদ্বার)', cathode: 'বিশুদ্ধ কপার জমা (Cu)', anode: 'কপার দণ্ড ক্ষয় হয়ে Cu²⁺ রূপে দ্রবণে আসে' },
    { cell: 'গলিত Al₂O₃ + ক্রায়োলাইট (হল-হেরোল্ট পদ্ধতি)', cathode: 'তরল অ্যালুমিনিয়াম (Al)', anode: 'কার্বন দণ্ডে অক্সিজেন ও CO₂' },
  ];
  electrolysisTable.forEach((et, i) => {
    const others = electrolysisTable.filter((x) => x.cell !== et.cell);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${et.cell}"-এর তড়িৎ বিশ্লেষণে ক্যাথোড (Cathode) এবং অ্যানোডে (Anode) যথাক্রমে কী উৎপন্ন হয়?`,
        correct: `ক্যাথোডে ${et.cathode}; অ্যানোডে ${et.anode}`,
        distractors: others.map((x) => `ক্যাথোডে ${x.cathode}; অ্যানোডে ${x.anode}`),
        explanation: `${et.cell}-এ বিজারণ বিক্রিয়ায় ক্যাথোডে ${et.cathode} এবং জারণ বিক্রিয়ায় অ্যানোডে ${et.anode} উৎপন্ন হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ বিশ্লেষণ উৎপাদ',
      })
    );
  });

  // Faraday 2nd Law Series Connection
  [
    { m1: 'Ag (E = ১০৮)', w1: 10.8, m2: 'Cu (E = ৩১.৭৫)', w2: 3.175 },
    { m1: 'Ag (E = ১০৮)', w1: 21.6, m2: 'Al (E = ৯)', w2: 1.8 },
    { m1: 'Cu (E = ৩১.৭৫)', w1: 6.35, m2: 'Fe²⁺ (E = ২৮)', w2: 5.6 },
    { m1: 'H₂ (E = ১)', w1: 1, m2: 'O₂ (E = ৮)', w2: 8 },
    { m1: 'Al (E = ৯)', w1: 2.7, m2: 'Mg (E = ১২)', w2: 3.6 },
  ].forEach((f2) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `শ্রেণি সমবায়ে যুক্ত দুটি তড়িৎ বিশ্লেষ্য কোষে সমপরিমাণ বিদ্যুৎ চালনা করলে প্রথম কোষে ${toBnDigits(f2.w1)} গ্রাম ${f2.m1} সঞ্চিত হলে দ্বিতীয় কোষে কত গ্রাম ${f2.m2} সঞ্চিত হবে?`,
        correct: `${toBnDigits(f2.w2)} গ্রাম`,
        distractors: [
          `${toBnDigits(Number((f2.w2 * 2).toFixed(3)))} গ্রাম`,
          `${toBnDigits(Number((f2.w2 / 2).toFixed(3)))} গ্রাম`,
          `${toBnDigits(f2.w1)} গ্রাম`,
          `${toBnDigits(Number((f2.w2 + 4.5).toFixed(2)))} গ্রাম`,
        ],
        explanation: `ফ্যারাডের ২য় সূত্র W₁/W₂ = E₁/E₂ ব্যবহার করে দ্বিতীয় কোষে সঞ্চিত ভর W₂ = ${toBnDigits(f2.w2)} গ্রাম।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের ২য় সূত্র',
      })
    );
  });

  // 5. Organic Chemistry: Esters, Carboxylic Acids, Ozonolysis Products, Physical Properties & Reagents (~90 MCQs)
  const esterFruits = [
    { ester: 'অ্যামাইল অ্যাসিটেট / আইসোপেন্টাইল অ্যাসিটেট', smell: 'পাকা কলার সুগন্ধ' },
    { ester: 'ইথাইল বিউটারেট (Ethyl butyrate)', smell: 'পাকা আনারসের সুগন্ধ' },
    { ester: 'অক্টাইল অ্যাসিটেট (Octyl acetate)', smell: 'কমলালেবুর সুগন্ধ' },
    { ester: 'বেনজাইল অ্যাসিটেট', smell: 'জুঁই বা জেসমিন ফুলের সুগন্ধ' },
    { ester: 'মিথাইল স্যালিসাইলেট (অয়েল অব উইন্টারগ্রিন)', smell: 'আয়োডেক্স বা ব্যথানাশক মলমের গন্ধ' },
    { ester: 'আইসোবিউটাইল মিথানোয়েট', smell: 'রাস্পবেরি ফলের সুগন্ধ' },
  ];
  esterFruits.forEach((ef, i) => {
    const others = esterFruits.filter((x) => x.ester !== ef.ester);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জৈব এস্টারসমূহের মধ্যে "${ef.smell}"-এর জন্য দায়ী যৌগ কোনটি?`,
        correct: ef.ester,
        distractors: others.map((x) => x.ester),
        explanation: `${ef.ester} একটি সুগন্ধি এস্টার যা ${ef.smell} প্রদান করে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · এস্টারসমূহ',
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
        question: `"${ef.ester}" এস্টারটি নিচের কোন সুগন্ধির জন্য পরিচিত?`,
        correct: ef.smell,
        distractors: others.map((x) => x.smell),
        explanation: `${ef.ester}-এ ${ef.smell} পাওয়া যায়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · প্রাকৃতিক এস্টার',
      })
    );
  });

  const naturalAcids = [
    { acid: 'ফরমিক অ্যাসিড (HCOOH)', src: 'লাল পিঁপড়া ও মৌমাছির হুলে' },
    { acid: 'অ্যাসিটিক অ্যাসিড (CH₃COOH)', src: 'ভিনেগার বা শিরকায়' },
    { acid: 'ল্যাকটিক অ্যাসিড', src: 'টক দই ও পরিশ্রান্ত পেশিতে' },
    { acid: 'সাইট্রিক অ্যাসিড', src: 'লেবু ও কমলাজাতীয় টক ফলে' },
    { acid: 'টারটারিক অ্যাসিড', src: 'তেঁতুল ও আঙুরে' },
    { acid: 'অক্সালিক অ্যাসিড', src: 'টমেটো, পালং শাক ও আমড়া/কামরাঙায়' },
    { acid: 'ম্যালিক অ্যাসিড', src: 'কাঁচা আপেলে' },
    { acid: 'বিউটারিক অ্যাসিড', src: 'পচা মাখনে (Rancid butter)' },
  ];
  naturalAcids.forEach((na, i) => {
    const others = naturalAcids.filter((x) => x.acid !== na.acid);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `জৈব অ্যাসিডগুলোর মধ্যে "${na.src}" প্রধানত কোন অ্যাসিড পাওয়া যায়?`,
        correct: na.acid,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.acid),
        explanation: `${na.src} প্রাকৃতিকভাবে ${na.acid} উপস্থিত থাকে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · প্রাকৃতিক জৈব অ্যাসিড',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'dental',
        question: `প্রাকৃতিক উৎস অনুযায়ী "${na.acid}" সাধারণত কোথায় পাওয়া যায়?`,
        correct: na.src,
        distractors: others.slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.src),
        explanation: `${na.acid}-এর প্রধান প্রাকৃতিক উৎস হলো ${na.src}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব অ্যাসিডের উৎস',
      })
    );
  });

  // Ozonolysis Product Identification Matrix (14 MCQs)
  const ozono = [
    { alkene: 'ইথিন (CH₂=CH₂)', prod: '২ অণু মিথান্যাল (HCHO)' },
    { alkene: 'প্রোপিন (CH₃–CH=CH₂)', prod: '১ অণু ইথান্যাল (CH₃CHO) + ১ অণু মিথান্যাল (HCHO)' },
    { alkene: 'বিউট-২-ইন (CH₃–CH=CH–CH₃)', prod: '২ অণু ইথান্যাল (CH₃CHO)' },
    { alkene: 'বিউট-১-ইন (CH₃CH₂CH=CH₂)', prod: '১ অণু প্রোপান্যাল + ১ অণু মিথান্যাল' },
    { alkene: '২-মিথাইলপ্রোপিন [(CH₃)₂C=CH₂]', prod: '১ অণু প্রোপানোন (অ্যাসিটোন) + ১ অণু মিথান্যাল' },
    { alkene: '২,৩-ডাইমিথাইলবিউট-২-ইন', prod: '২ অণু প্রোপানোন (CH₃COCH₃)' },
    { alkene: 'বেনজিন (C₆H₆)', prod: '৩ অণু গ্লাইঅক্সাল (CHO–CHO)' },
  ];
  ozono.forEach((oz, i) => {
    const others = ozono.filter((x) => x.alkene !== oz.alkene);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${oz.alkene}"-কে ওজোন (O₃) ও পরে Zn/H₂O দ্বারা ওজোনোলাইসিস করলে কোন কার্বনিল যৌগ উৎপন্ন হয়?`,
        correct: oz.prod,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.prod),
        explanation: `দ্বিবন্ধন স্থানে O₃ যুক্ত হয়ে ওজোনাইড গঠন ও Zn/H₂O বিশ্লেষণে ${oz.alkene} থেকে ${oz.prod} উৎপন্ন হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · ওজোনোলাইসিস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'dental',
        question: `কোন অসম্পৃক্ত যৌগের ওজোনোলাইসিসে (O₃, Zn/H₂O) সরাসরি "${oz.prod}" পাওয়া যায়?`,
        correct: oz.alkene,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.alkene),
        explanation: `উৎপাদগুলোর অক্সিজেন অপসারণ করে C=C পুনঃসংযোগ করলে মূল যৌগ ${oz.alkene} পাওয়া যায়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · ওজোনোলাইসিস রিভার্স',
      })
    );
  });

  // 6. Grignard Reagent & Functional Group Reactivity / Boiling Point Matrix (30 MCQs)
  const grignards = [
    { sub: 'মিথান্যাল (HCHO)', prod: '১° (প্রাইমারি) অ্যালকোহল (যেমন ইথানল)' },
    { sub: 'ইথান্যাল (CH₃CHO বা মিথান্যাল ছাড়া যেকোনো অ্যালডিহাইড)', prod: '২° (সেকেন্ডারি) অ্যালকোহল' },
    { sub: 'অ্যাসিটোন / প্রোপানোন (কিটোন)', prod: '৩° (টারশিয়ারি) অ্যালকোহল' },
    { sub: 'শুষ্ক বরফ বা কার্বন ডাই-অক্সাইড (CO₂)', prod: 'কার্বক্সিলিক অ্যাসিড (R–COOH)' },
    { sub: 'পানি (H₂O) বা অ্যালকোহল (ROH) বা NH₃', prod: 'অ্যালকেন (R–H)' },
  ];
  grignards.forEach((gr, i) => {
    const others = grignards.filter((x) => x.sub !== gr.sub);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `গ্রিগনার্ড বিকারক (R–MgX)-এর সাথে "${gr.sub}" বিক্রিয়া ও পরে অম্লীয় আর্দ্রবিশ্লেষণ (H⁺/H₂O) করলে কী উৎপন্ন হয়?`,
        correct: gr.prod,
        distractors: others.map((x) => x.prod),
        explanation: `RMgX নিউক্লিওফিলিক সংযোজনে ${gr.sub}-এর সাথে বিক্রিয়া করে ${gr.prod} তৈরি করে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · গ্রিগনার্ড বিক্রিয়া',
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
        question: `গ্রিগনার্ড বিকারক (CH₃MgBr) থেকে আর্দ্রবিশ্লেষণের মাধ্যমে "${gr.prod}" পেতে নিচের কোন বিক্রিয়কটি ব্যবহার করতে হবে?`,
        correct: gr.sub,
        distractors: others.map((x) => x.sub),
        explanation: `${gr.prod} সংশ্লেষণের জন্য RMgX-এর সাথে ${gr.sub} বিক্রিয়া করাতে হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · গ্রিগনার্ড সংশ্লেষণ',
      })
    );
  });

  // 7. Extra High-Yield Organic, Quantitative, Electro & Economic Chemistry Drills (~60 MCQs)
  const extraChem2: Array<[string, string, string, string, [string, string, string], string]> = [
    ['chem2_ch1_env', 'ph_buffer', 'ফটোকেমিক্যাল স্মগ সৃষ্টিতে কোন তিনটি উপাদান সূর্যালোকের উপস্থিতিতে বিক্রিয়া করে?', 'নাইট্রোজেনের অক্সাইড (NOx), উদ্বায়ী জৈব যৌগ (VOC) ও সূর্যালোক', ['SO₂, কয়লার ধোঁয়া ও কুয়াশা', 'CO₂, আর্গন ও জলীয় বাষ্প', 'নাইট্রোজেন ও নিয়ন গ্যাস'], 'লস অ্যাঞ্জেলেস টাইপ স্মগ বা জারক স্মগে NOx ও হাইড্রোকার্বন UV আলোতে PAN ও O₃ তৈরি করে।'],
    ['chem2_ch1_env', 'ph_buffer', 'মহাসাগর বা ভূপৃষ্ঠের বায়ুতে গ্রিনহাউজ গ্যাস N₂O-এর প্রধান মানবসৃষ্ট উৎস কোনটি?', 'নাইট্রোজেন সার ও জৈব বর্জ্য পচন', ['রেফ্রিজারেটর', 'কাচ শিল্প', 'সিলিকন চিপ তৈরি'], 'অতিরিক্ত নাইট্রোজেন সার প্রয়োগে ডিনাইট্রিফিকেশন ব্যাকটেরিয়া N₂O গ্যাস উৎপন্ন করে।'],
    ['chem2_ch1_env', 'ph_buffer', 'স্থির তাপমাত্রায় বাস্তব গ্যাসের PV বনাম P লেখচিত্রে H₂ ও He গ্যাসের রেখা সর্বদা আদর্শ গ্যাস রেখার ওপরে থাকে কেন?', 'H₂ ও He অণুর আকর্ষণ নগণ্য হলেও সংকোচনে নিজস্ব আয়তন b প্রাধান্য পায় (Z > ১)', ['এদের আণবিক ভর অনেক বেশি', 'এরা আদর্শ গ্যাস নয় বরং তরল', 'এদের মধ্যে H-বন্ধন আছে'], 'H₂ ও He-এর ভ্যান ডার ওয়ালস ধ্রুবক "a" অতি ক্ষুদ্র বলে সব চাপে Z = PV/nRT > ১ হয়।'],
    ['chem2_ch1_env', 'ph_buffer', 'আর্দ্র গ্যাসের মোট চাপ P_total থেকে জলীয় বাষ্পের চাপ (f) বাদ দিলে কী পাওয়া যায়?', 'শুষ্ক গ্যাসের প্রকৃত চাপ (P_dry = P_total − f)', ['গ্যাসের আংশিক আয়তন', 'গ্যাসের সংকট চাপ', 'গ্যাসের বাষ্প ঘনত্ব'], 'ডাল্টনের আংশিক চাপ সূত্রানুসারে পানির ওপর সংগৃহীত গ্যাসের চাপে জলীয় বাষ্পচাপ যুক্ত থাকে।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'প্রোপাইন (CH₃–C≡CH)-এর হাইড্রোজেন (≡C–H) অ্যামোনিয়াম Cu₂Cl₂ বা AgNO₃-এর সাথে বিক্রিয়া করে অধঃক্ষেপ দেয়, কিন্তু বিউট-২-আইন (CH₃–C≡C–CH₃) দেয় না কেন?', 'বিউট-২-আইনে কোনো অম্লীয় টার্মিনাল sp-C–H হাইড্রোজেন নেই', ['বিউট-২-আইন একটি অ্যালকিন', 'বিউট-২-আইন পানিতে গ্যাসীয়', 'প্রোপাইনের ভর বেশি'], 'কেবল ১-অ্যালকাইন (যেখানে ত্রিবন্ধনযুক্ত কার্বনে সরাসরি H থাকে) ধাতব অ্যাসিটাইলাইড অধঃক্ষেপ দেয়।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'বেনজোয়িক অ্যাসিডকে সোডালাইম (NaOH + CaO) সহ উত্তপ্ত করলে ডিকার্বক্সিলেশন বিক্রিয়ায় কী তৈরি হয়?', 'বেনজিন (C₆H₆)', ['টলুইন', 'ফেনল', 'অ্যানিলিন'], 'C₆H₅COONa + NaOH (CaO, Δ) → C₆H₆ + Na₂CO₃।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'হ্যালোফর্ম বিক্রিয়া দেয় এমন যৌগ শনাক্ত করতে নিচের কোনটি সঠিক ক্রাইটেরিয়া?', 'CH₃–C(=O)– অথবা CH₃–CH(OH)– মূলক উপস্থিতি', ['–COOH মূলক উপস্থিতি', 'বেনজিন বলয়ে –NO₂ মূলক', 'শুধুমাত্র ১টি কার্বন বিশিষ্ট অ্যালকোহল'], 'মিথানল বা প্রোপান-১-অল এ মূলক নেই বলে আয়োডোফর্ম দেয় না, কিন্তু প্রোপান-২-অল ও ইথানল দেয়।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'ক্লোরোফর্ম (CHCl₃) ও অ্যাসিটোনের ক্ষারীয় (KOH) ঘনীভবন বিক্রিয়ায় কোন ঘুমের ওষুধ বা অ্যান্টিসেপটিক যৌগ তৈরি হয়?', 'ক্লোরিটোন (Chloretone)', ['প্যারাসিটামল', 'গ্যামাক্সিন', 'ইথাইল ক্লোরাইড'], 'অ্যাসিটোন + CHCl₃ (KOH) → ট্রাইক্লোরো-টার্ট-বিউটাইল অ্যালকোহল বা ক্লোরিটোন।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'প্রাকৃতিক রাবারের স্থিতিস্থাপকতা, দৃঢ়তা ও তাপসহ ক্ষমতা বাড়াতে সালফারসহ উত্তপ্ত করার প্রক্রিয়াকে কী বলে?', 'ভালকানাইজেশন (Vulcanization)', ['পাস্তুরায়ন', 'সাবানায়ন', 'গ্যালভানাইজিং'], 'চার্লস গুডইয়ার আবিষ্কৃত ভালকানাইজেশনে ৩–৫% সালফার পলি-আইসোপ্রিন শিকলের মাঝে ডাইসালফাইড ক্রস-লিঙ্ক তৈরি করে।'],
    ['chem2_ch2_organic', 'benzene_aromatic', 'প্যারাফিন মোম বা নন-স্টিক রান্নার পাত্রের প্রলেপ তৈরিতে ব্যবহৃত রাসায়নিক নিষ্ক্রিয় ও তাপসহ পলিমার কোনটি?', 'টেফলন (PTFE — পলিটেট্রাফ্লোরোইথিলিন)', ['ব্যাকেলাইট', 'পলিভিনাইল ক্লোরাইড', 'রেয়ন'], 'টেফলনে অত্যন্ত শক্তিশালী C–F বন্ধন থাকায় এটি অ্যাসিড, ক্ষার ও উচ্চতাপে অপরিবর্তিত থাকে।'],
    ['chem2_ch3_quant', 'ph_buffer', 'গাঢ় HCl (৩৭% w/w, ঘনত্ব ১.১৯ g/mL)-এর বোতল থেকে সরাসরি প্রমাণ দ্রবণ তৈরি না করে প্রথমে আনুমানিক ঘনমাত্রায় বানিয়ে Na₂CO₃ দিয়ে প্রমিত করা হয় কেন?', 'HCl উদ্বায়ী হওয়ায় সঠিক ভর ওজনে ত্রুটি হয় (সেকেন্ডারি স্ট্যান্ডার্ড)', ['HCl প্রাইমারি স্ট্যান্ডার্ড', 'HCl পানিতে মিশে না', 'HCl-এর আণবিক ভর অজানা'], 'গাঢ় HCl থেকে HCl গ্যাস বাষ্পীভূত হতে থাকে বলে এটি প্রাইমারি স্ট্যান্ডার্ড নয়।'],
    ['chem2_ch3_quant', 'ph_buffer', 'কোনো জলীয় দ্রবণের ঘনমাত্রা ১ ppb (parts per billion) বলতে কত পরিমাণ দ্রব বোঝায়?', 'প্রতি লিটার পানিতে ১ মাইক্রোগ্রাম (১ μg/L বা ১০⁻³ mg/L)', ['প্রতি লিটারে ১ গ্রাম', 'প্রতি লিটারে ১ মিলিগ্রাম', 'প্রতি লিটারে ১০০ মিলিগ্রাম'], '১ ppm = ১ mg/L এবং ১ ppb = ১ μg/L = ১০⁻³ ppm।'],
    ['chem2_ch3_quant', 'ph_buffer', 'দুর্বল অ্যাসিড (CH₃COOH) ও দুর্বল ক্ষার (NH₄OH)-এর টাইট্রেশনে কোনো সাধারণ নির্দেশকই সঠিক ফলাফল দেয় না কেন?', 'প্রশমন বিন্দুতে pH-এর কোনো খাড়া উল্লম্ফন (Sharp pH jump) ঘটে না', ['উভয়েই বর্ণহীন', 'বিক্রিয়ায় কোনো লবণ হয় না', 'pH সর্বদা শূন্য থাকে'], 'pH পরিবর্তন অতি ধীর হওয়ায় নির্দেশকের বর্ণ পরিবর্তন অস্পষ্ট থাকে; এজন্য কন্ডাক্টোমেট্রিক বা pH-মেট্রিক টাইট্রেশন করা হয়।'],
    ['chem2_ch4_electro', 'ph_buffer', 'আয়নিক চলাচলের কারণে তড়িৎ রাসায়নিক কোষে লবণ সেতু (Salt bridge) সরিয়ে নিলে কী ঘটবে?', 'কোষের তড়িৎ প্রবাহ ও ভোল্টেজ তৎক্ষণাৎ শূন্যে নেমে যাবে', ['ভোল্টেজ দ্বিগুণ হবে', 'ক্যাথোড গলে যাবে', 'কোনো পরিবর্তন হবে না'], 'লবণ সেতু অর্ধকোষ দুটির বৈদ্যুতিক নিরপেক্ষতা বজায় রাখে ও অভ্যন্তরীণ বর্তনী সম্পূর্ণ করে।'],
    ['chem2_ch4_electro', 'ph_buffer', 'কোনো ধাতব আয়নের প্রমাণ বিজারণ বিভব E° যত বেশি ধনাত্মক হয়, মৌল বা আয়নটির ধর্ম কেমন হয়?', 'তীব্র জারক এবং সহজ বিজারণ প্রবণতা (যেমন F₂, Au³⁺, Ag⁺)', ['তীব্র বিজারক ধাতু', 'অ্যানোড হিসেবে সবচেয়ে ভালো', 'কখনো ইলেকট্রন গ্রহণ করে না'], 'উচ্চ E°(red) মানেই ইলেকট্রন গ্রহণের প্রবল প্রবণতা অর্থাৎ শক্তিশালী জারক।'],
    ['chem2_ch4_electro', 'ph_buffer', 'আধুনিক বৈদ্যুতিক গাড়ি (EV) ও স্মার্টফোনে লিথিয়াম-আয়ন ব্যাটারি বেশি জনপ্রিয় হওয়ার প্রধান কারণ কী?', 'লিথিয়ামের পারমাণবিক ভর সর্বনিম্ন এবং সর্বোচ্চ তড়িৎ বিভব ও শক্তি ঘনত্ব (~৩.৭ V)', ['এতে ভারী লেড ব্যবহৃত হয়', 'এটি একবারই ব্যবহারযোগ্য', 'এতে ৩৮% সালফিউরিক অ্যাসিড থাকে'], 'Li হলো পর্যায় সারণির হালকা ধাতু ও সর্বনিম্ন বিজারণ বিভব (−৩.০৫ V)-যুক্ত, ফলে প্রতি কেজিতে সর্বোচ্চ শক্তি সঞ্চিত হয়।'],
    ['chem2_ch5_economic', 'benzene_aromatic', 'বাংলাদেশের চিনিকল ও কাগজকলগুলোর বর্জ্য পানিতে অতিরিক্ত জৈব পদার্থ থাকলে জলাশয়ে কী পরিবেশগত বিপর্যয় ঘটে?', 'BOD বেড়ে গিয়ে পানির দ্রবীভূত অক্সিজেন (DO) শূন্যের কাছাকাছি নেমে আসে এবং মাছ মারা যায়', ['পানির pH ১৪ হয়ে যায়', 'পানি বরফে জমে যায়', 'পানিতে ওজোন স্তর তৈরি হয়'], 'জৈব বর্জ্য পচনের সময় ব্যাকটেরিয়া পানির DO নিঃশেষ করে ফেলে (Eutrophication ও Hypoxia)।'],
    ['chem2_ch5_economic', 'benzene_aromatic', 'টেক্সটাইল, কাগজ ও প্লাস্টিক শিল্পে ব্যবহৃত পানির খরতা দূর করে বয়লারের ক্ষতি (স্কেল জমা) রোধে কোন আধুনিক পদ্ধতি ব্যবহৃত হয়?', 'আয়ন-বিনিময় রেজিন (Cation & Anion exchange resin) দ্বারা ডি-আয়োনাইজেশন', ['লবণ যোগ করা', 'সালফার পোড়ানো', 'কার্বন ডাই-অক্সাইড চালনা'], 'ক্যাটায়ন রেজিন (R–H) Ca²⁺/Mg²⁺-কে H⁺ দিয়ে এবং অ্যানায়ন রেজিন (R–OH) Cl⁻/SO₄²⁻-কে OH⁻ দিয়ে প্রতিস্থাপন করে বিশুদ্ধ পানি দেয়।'],
  ];
  extraChem2.forEach((d) => {
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
        reference: 'রসায়ন ২য় পত্র · হাজারী ও নাগ · মেডিকেল ও ডেন্টাল স্পেশাল',
      })
    );
  });

  // 8. Quick Quantitative Calculations: Moles to Gas Volume (STP), Gas Density d = PM/RT, & Concentration Conversions (40 MCQs)
  const wvPct = [
    { name: 'NaOH (M = ৪০)', pct: 4, mol: 1 },
    { name: 'NaOH (M = ৪০)', pct: 2, mol: 0.5 },
    { name: 'H₂SO₄ (M = ৯৮)', pct: 4.9, mol: 0.5 },
    { name: 'H₂SO₄ (M = ৯৮)', pct: 9.8, mol: 1 },
    { name: 'Na₂CO₃ (M = ১০৬)', pct: 5.3, mol: 0.5 },
    { name: 'Na₂CO₃ (M = ১০৬)', pct: 10.6, mol: 1 },
    { name: 'গ্লুকোজ (M = ১৮০)', pct: 1.8, mol: 0.1 },
    { name: 'গ্লুকোজ (M = ১৮০)', pct: 9, mol: 0.5 },
  ];
  wvPct.forEach((wp) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `জলীয় দ্রবণে ${toBnDigits(wp.pct)}% (w/v) ${wp.name} দ্রবণের মোলার ঘনমাত্রা কত?`,
        correct: `${toBnDigits(wp.mol)} M`,
        distractors: [0.1, 0.25, 0.5, 1, 2, 2.5, 4]
          .filter((x) => x !== wp.mol)
          .map((x) => `${toBnDigits(x)} M`),
        explanation: `S = (% w/v × ১০) / M = (${toBnDigits(wp.pct)} × ১০) / M = ${toBnDigits(wp.mol)} M।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · শতকরা থেকে মোলারিটি',
      })
    );
  });

  // Faraday gas liberation at STP: H2 (11.2 L/F) and O2 (5.6 L/F) and Cl2 (11.2 L/F)
  [
    { gas: 'H₂ গ্যাস (ক্যাথোডে)', f: 1, l: 11.2 },
    { gas: 'H₂ গ্যাস (ক্যাথোডে)', f: 2, l: 22.4 },
    { gas: 'H₂ গ্যাস (ক্যাথোডে)', f: 4, l: 44.8 },
    { gas: 'O₂ গ্যাস (অ্যানোডে)', f: 1, l: 5.6 },
    { gas: 'O₂ গ্যাস (অ্যানোডে)', f: 2, l: 11.2 },
    { gas: 'O₂ গ্যাস (অ্যানোডে)', f: 4, l: 22.4 },
    { gas: 'Cl₂ গ্যাস (অ্যানোডে)', f: 1, l: 11.2 },
    { gas: 'Cl₂ গ্যাস (অ্যানোডে)', f: 2, l: 22.4 },
  ].forEach((fg) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `জলীয় তড়িৎ বিশ্লেষ্যের মধ্য দিয়ে ${toBnDigits(fg.f)} ফ্যারাডে (F) তড়িৎ প্রবাহিত করলে STP-তে কত লিটার ${fg.gas} উৎপন্ন হবে?`,
        correct: `${toBnDigits(fg.l)} লিটার`,
        distractors: [2.8, 5.6, 11.2, 22.4, 44.8, 89.6]
          .filter((x) => x !== fg.l)
          .map((x) => `${toBnDigits(x)} লিটার`),
        explanation: `১ ফ্যারাডে তড়িতে H₂ ও Cl₂-এর তুল্য মোল (১/২ মোল = ১১.২ L) এবং O₂-এর ১/৪ মোল (৫.৬ L) মুক্ত হয়; তাই ${toBnDigits(fg.f)} F-এ ${toBnDigits(fg.l)} লিটার।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · গ্যাসীয় তড়িৎ বিশ্লেষণ',
      })
    );
  });

  // 9. Hydrocarbon & Aromatic Single-Step Synthesis Output Drills (24 MCQs)
  const organicOutputs: Array<{ rxn: string; out: string; note: string }> = [
    { rxn: 'বেনজিন + গাঢ় HNO₃ + গাঢ় H₂SO₄ (৫৫–৬০ °C)', out: 'নাইট্রোবেনজিন (C₆H₅NO₂)', note: 'ইলেকট্রোফাইল NO₂⁺ দ্বারা নাইট্রেশন।' },
    { rxn: 'টলুইন + গাঢ় HNO₃ + গাঢ় H₂SO₄ (১০০ °C, ধাপে ধাপে)', out: 'TNT (২,৪,৬-ট্রাইনাইট্রোটলুইন)', note: 'বিস্ফোরক TNT তৈরি হয়।' },
    { rxn: 'ফেনল + গাঢ় HNO₃ + গাঢ় H₂SO₄', out: 'পিক্রিক অ্যাসিড (২,৪,৬-ট্রাইনাইট্রোফেনল)', note: 'তীব্র অম্লীয় বিস্ফোরক যৌগ।' },
    { rxn: 'বেনজিন + CH₃COCl / অনার্দ্র AlCl₃', out: 'অ্যাসিটোফেনন (C₆H₅COCH₃)', note: 'ফ্রিডেল-ক্রাফ্টস অ্যাসাইলেশন।' },
    { rxn: 'ইথাইন + H₂ / লিন্ডলার প্রভাবক (Pd/BaSO₄)', out: 'সিস-ইথিন বা অ্যালকেন থেকে সিস-অ্যালকিন', note: 'সিন-সংযোজনে সিস-অ্যালকিন হয়।' },
    { rxn: 'প্রোপানোন (CH₃COCH₃) + HCN', out: 'অ্যাসিটোন সায়ানোহাইড্রিন', note: 'কার্বনিল মূলকে নিউক্লিওফিলিক সংযোজন।' },
    { rxn: 'অ্যাসিটিক অ্যাসিড + PCl₅', out: 'অ্যাসিটাইল ক্লোরাইড (CH₃COCl) + POCl₃ + HCl', note: '–OH মূলক –Cl দ্বারা প্রতিস্থাপিত হয়।' },
    { rxn: 'ইথানল + ইথানোয়িক অ্যাসিড (গাঢ় H₂SO₄, Δ)', out: 'ইথাইল ইথানোয়েট (সুগন্ধি এস্টার)', note: 'এস্টারিফিকেশন বিক্রিয়া।' },
    { rxn: 'সেলুলোজ / গ্লুকোজ (ইস্টের জাইমেজ এনজাইম)', out: 'ইথানল (CH₃CH₂OH) ও CO₂', note: 'অবাত শ্বসন বা গাঁজন (Fermentation)।' },
    { rxn: '১,২-ডাইব্রোমোইথেন + অ্যালকোহলীয় KOH (২ মোল)', out: 'ইথাইন / অ্যাসিটিলিন (HC≡CH)', note: 'দুই ধাপে ডিহাইড্রোহ্যালোজেনেশন।' },
  ];
  organicOutputs.forEach((oo, i) => {
    const others = organicOutputs.filter((x) => x.rxn !== oo.rxn);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${oo.rxn}" বিক্রিয়ায় প্রধান জৈব উৎপাদ (Major Product) কোনটি?`,
        correct: oo.out,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.out),
        explanation: `${oo.rxn} থেকে ${oo.out} উৎপন্ন হয়। (${oo.note})`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব উৎপাদ',
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
        question: `"${oo.out}" সংশ্লেষণের জন্য কোন আদর্শ বিক্রিয়াটি ব্যবহার করা হয়?`,
        correct: oo.rxn,
        distractors: others.slice((i + 3) % 5, ((i + 3) % 5) + 4).map((x) => x.rxn),
        explanation: `${oo.out} প্রস্তুত করা হয় "${oo.rxn}"-এর মাধ্যমে। (${oo.note})`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব সংশ্লেষণ',
      })
    );
  });

  // 10. Redox Half-Reaction Electron Count & Dilution/Mixing Calculations (20 MCQs)
  const redoxPairs = [
    { half: 'MnO₄⁻ → Mn²⁺ (অম্লীয় মাধ্যম)', e: '৫টি ইলেকট্রন (5e⁻)' },
    { half: 'MnO₄⁻ → MnO₂ (প্রশম/মৃদু ক্ষারীয় মাধ্যম)', e: '৩টি ইলেকট্রন (3e⁻)' },
    { half: 'MnO₄⁻ → MnO₄²⁻ (তীব্র ক্ষারীয় মাধ্যম)', e: '১টি ইলেকট্রন (1e⁻)' },
    { half: 'Cr₂O₇²⁻ → 2Cr³⁺ (অম্লীয় মাধ্যম)', e: '৬টি ইলেকট্রন (6e⁻)' },
    { half: 'C₂O₄²⁻ → 2CO₂ (অক্সালেট জারণ)', e: '২টি ইলেকট্রন বর্জন (2e⁻)' },
    { half: '2S₂O₃²⁻ → S₄O₆²⁻ (প্রতি মোল থায়োসালফেটে)', e: '১টি ইলেকট্রন বর্জন (প্রতি মোলে 1e⁻)' },
    { half: 'H₂O₂ → O₂ + 2H⁺ (বিজারক হিসেবে H₂O₂)', e: '২টি ইলেকট্রন বর্জন (2e⁻)' },
    { half: 'IO₃⁻ → I⁻ (আয়োডেট বিজারণ)', e: '৬টি ইলেকট্রন গ্রহণ (6e⁻)' },
  ];
  redoxPairs.forEach((rp, i) => {
    const others = redoxPairs.filter((x) => x.half !== rp.half && x.e !== rp.e);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জারণ-বিজারণ অর্ধবিক্রিয়া "${rp.half}" সমতায়নের ক্ষেত্রে প্রতি মোলে কতটি ইলেকট্রন আদান-প্রদান হয়?`,
        correct: rp.e,
        distractors: Array.from(new Set(others.map((x) => x.e))).slice(0, 4),
        explanation: `${rp.half} অর্ধবিক্রিয়ায় জারণ সংখ্যা পরিবর্তনের ভিত্তিতে ${rp.e} বিনিময় হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · অর্ধবিক্রিয়া সমতায়ন',
      })
    );
  });

  // 11. Environmental Chemistry: Greenhouse Gases, Ozone Depleting Substances & Heavy Metal Toxicities (24 MCQs)
  const toxicMetals = [
    { metal: 'পারদ বা মার্কারি (Hg / CH₃Hg⁺)', disease: 'মিনামাটা (Minamata) রোগ — স্নায়ুতন্ত্র ও মস্তিষ্ক বিকল' },
    { metal: 'ক্যাডমিয়াম (Cd²⁺)', disease: 'ইটাই-ইটাই (Itai-Itai) রোগ — অস্থি ভঙ্গুরতা ও তীব্র ব্যথা' },
    { metal: 'আর্সেনিক (As³⁺ / As⁵⁺)', disease: 'আর্সেনিকোসিস (ত্বকে মেলানোসিস, কেরাটোসিস ও ক্যান্সার)' },
    { metal: 'লেড বা সিসা (Pb²⁺)', disease: 'শিশুদের বুদ্ধিমত্তা হ্রাস, হিমোগ্লোবিন সংশ্লেষ বাধা ও রক্তস্বল্পতা' },
    { metal: 'ক্রোমিয়াম (Cr⁶⁺ — ট্যানারি বর্জ্য)', disease: 'ত্বকের আলসার, ফুসফুস ও পাকস্থলির ক্যান্সার' },
    { metal: 'নাইট্রেট আয়ন (NO₃⁻ > ৪৫–৫০ ppm পানিতে)', disease: 'শিশুদের ব্লু-বেবি সিন্ড্রোম (মেথহিমোগ্লোবিনেমিয়া)' },
  ];
  toxicMetals.forEach((tm, i) => {
    const others = toxicMetals.filter((x) => x.metal !== tm.metal);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পানি বা খাদ্যশৃঙ্খলে "${tm.metal}" দূষণের ফলে মানবদেহে প্রধানত কোন রোগ বা স্বাস্থ্যঝুঁকি দেখা দেয়?`,
        correct: tm.disease,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.disease),
        explanation: `${tm.metal} দূষণের ফলে ${tm.disease} সৃষ্টি হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · ভারী ধাতু ও পানি দূষণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${tm.disease}" — এটি পরিবেশের কোন রাসায়নিক দূষকের কারণে ঘটে?`,
        correct: tm.metal,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.metal),
        explanation: `${tm.disease}-এর জন্য দায়ী দূষক হলো ${tm.metal}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরিবেশগত বিষক্রিয়া',
      })
    );
  });

  // 12. Bangladesh Natural Gas Fields, Fertilizer Plants & Polymer/Glass Colors (20 MCQs)
  const glassColors = [
    { ox: 'কোবাল্ট অক্সাইড (CoO)', col: 'গাঢ় নীল কাচ (Cobalt Blue)' },
    { ox: 'ক্রোমিয়াম(III) অক্সাইড (Cr₂O₃) বা FeO', col: 'সবুজ বর্ণের বোতল কাচ' },
    { ox: 'ম্যাঙ্গানিজ ডাই-অক্সাইড (MnO₂)', col: 'বেগুনি বা হালকা গোলাপি কাচ' },
    { ox: 'কিউপ্রাস অক্সাইড (Cu₂O) বা কলয়েডাল গোল্ড', col: 'রুবির মতো লাল কাচ' },
    { ox: 'ফেরিক অক্সাইড (Fe₂O₃)', col: 'হলুদ বা বাদামি-হলুদ কাচ' },
    { ox: 'টিন অক্সাইড (SnO₂) বা ক্যাডমিয়াম সালফাইড', col: 'দুধের মতো অস্বচ্ছ সাদা / উজ্জ্বল হলুদ কাচ' },
  ];
  glassColors.forEach((gc, i) => {
    const others = glassColors.filter((x) => x.ox !== gc.ox);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `কাচ শিল্পে গলিত কাচে "${gc.ox}" যোগ করলে কাচটির বর্ণ কেমন হয়?`,
        correct: gc.col,
        distractors: others.map((x) => x.col),
        explanation: `${gc.ox} কাচে মিশালে ${gc.col} তৈরি হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · রঙিন কাচ',
      })
    );
  });

  // Coal grades carbon percentage
  const coalGrades = [
    { grade: 'পিট কয়লা (Peat)', c: '৫০ – ৬০% কার্বন (সর্বনিম্ন মান)', note: 'আর্দ্রতা ও ধোঁয়া সবচেয়ে বেশি।' },
    { grade: 'লিগনাইট বা বাদামি কয়লা', c: '৬০ – ৭০% কার্বন', note: 'তাপবিদ্যুৎ ও গ্যাসীকরণে ব্যবহৃত।' },
    { grade: 'বিটুমিনাস কয়লা', c: '৭৫ – ৮৫% কার্বন (বড়পুকুরিয়া কয়লা)', note: 'বাংলাদেশের প্রধান কয়লা শ্রেণি ও কোক তৈরিতে ব্যবহৃত।' },
    { grade: 'অ্যানথ্রাসাইট কয়লা', c: '৯০ – ৯৫% কার্বন (সর্বোচ্চ মান)', note: 'ধোঁয়াহীন নীল শিখায় জ্বলে ও সর্বাধিক তাপ দেয়।' },
  ];
  coalGrades.forEach((cg, i) => {
    const others = coalGrades.filter((x) => x.grade !== cg.grade);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `কয়লার শ্রেণিবিভাগে "${cg.grade}"-এ কার্বনের শতকরা পরিমাণ ও মান কেমন?`,
        correct: cg.c,
        distractors: others.map((x) => x.c),
        explanation: `${cg.grade}-এ ${cg.c} থাকে। (${cg.note})`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · কয়লার শ্রেণিবিভাগ',
      })
    );
  });

  return list;
}
