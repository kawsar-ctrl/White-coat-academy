import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredB(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sb_${String(seq++).padStart(4, '0')}`;

  // 1. Periodic Trend Ordering & Exceptions (36 MCQs)
  const periodicComparisons: Array<{
    q: string;
    a: string;
    d: [string, string, string];
    exp: string;
    diff?: 'board' | 'medical' | 'dental';
  }> = [
    {
      q: 'দ্বিতীয় পর্যায়ের মৌল B, C, N, O-এর প্রথম আয়নিকরণ শক্তির সঠিক ক্রম কোনটি?',
      a: 'N > O > C > B',
      d: ['O > N > C > B', 'B > C > N > O', 'C > B > O > N'],
      exp: 'N-এর অর্ধপূর্ণ স্থায়ী 2p³ উপস্তরের কারণে N-এর প্রথম আয়নিকরণ শক্তি O (2p⁴) অপেক্ষা বেশি; তাই N > O > C > B।',
    },
    {
      q: 'তৃতীয় পর্যায়ের মৌল Na, Mg, Al, Si-এর প্রথম আয়নিকরণ শক্তির সঠিক ক্রম কোনটি?',
      a: 'Si > Mg > Al > Na',
      d: ['Si > Al > Mg > Na', 'Al > Mg > Si > Na', 'Mg > Si > Al > Na'],
      exp: 'Mg-এর পূর্ণ 3s² অরবিটাল Al-এর 3s² 3p¹ অপেক্ষা বেশি স্থায়ী হওয়ায় Mg-এর প্রথম আয়নিকরণ শক্তি Al-এর চেয়ে বেশি।',
    },
    {
      q: 'হ্যালোজেনসমূহের ইলেকট্রন আসক্তির সঠিক অধঃক্রম কোনটি?',
      a: 'Cl > F > Br > I',
      d: ['F > Cl > Br > I', 'I > Br > Cl > F', 'Cl > Br > F > I'],
      exp: 'F পরমাণুর 2p উপস্তরের আকার অত্যধিক ক্ষুদ্র ও ইলেকট্রন ঘনত্ব বেশি হওয়ায় আগত ইলেকট্রন বিকর্ষিত হয়; তাই Cl-এর ইলেকট্রন আসক্তি সর্বোচ্চ।',
    },
    {
      q: 'হ্যালোজেনসমূহের তড়িৎ ঋণাত্মকতার সঠিক ক্রম কোনটি?',
      a: 'F > Cl > Br > I',
      d: ['Cl > F > Br > I', 'I > Br > Cl > F', 'Br > Cl > F > I'],
      exp: 'ছোট পারমাণবিক আকারের জন্য ফ্লোরিনের তড়িৎ ঋণাত্মকতা সর্বোচ্চ (৪.০), তারপর Cl (৩.০), Br (২.৮) এবং I (২.৫)।',
    },
    {
      q: 'O²⁻, F⁻, Na⁺ ও Mg²⁺ আইসোইলেকট্রনিক আয়নগুলোর আকারের (ব্যাসার্ধের) সঠিক ক্রম কোনটি?',
      a: 'O²⁻ > F⁻ > Na⁺ > Mg²⁺',
      d: ['Mg²⁺ > Na⁺ > F⁻ > O²⁻', 'F⁻ > O²⁻ > Na⁺ > Mg²⁺', 'Na⁺ > Mg²⁺ > O²⁻ > F⁻'],
      exp: 'সবার ১০টি করে ইলেকট্রন থাকলেও প্রোটন সংখ্যা বাড়ায় নিউক্লীয় আকর্ষণ বাড়ে (Z: O=8, F=9, Na=11, Mg=12), ফলে Mg²⁺ সবচেয়ে ছোট ও O²⁻ সবচেয়ে বড়।',
    },
    {
      q: 'দ্বিতীয় পর্যায়ের Li, Be, B, C মৌলগুলোর মধ্যে Be ও B-এর প্রথম আয়নিকরণ শক্তির সঠিক সম্পর্ক কোনটি?',
      a: 'Be > B',
      d: ['B > Be', 'Be = B', 'Li > Be'],
      exp: 'Be-এর সুস্থিত পরিপূর্ণ 2s² উপস্তর থেকে ইলেকট্রন সরাতে B (2s² 2p¹) অপেক্ষা বেশি শক্তির প্রয়োজন হয়।',
    },
    {
      q: 'ক্ষার ধাতুর হ্যালাইডগুলোর মধ্যে ফাজানের নীতি অনুযায়ী কোনটিতে সমযোজী বৈশিষ্ট্য সর্বাধিক?',
      a: 'LiI',
      d: ['LiF', 'CsF', 'NaCl'],
      exp: 'ক্ষুদ্রতম ক্যাটায়ন (Li⁺) এবং বৃহত্তম অ্যানায়ন (I⁻)-এর সমন্বয়ে পোলারায়ন সর্বাধিক হওয়ায় LiI-তে সমযোজী চরিত্র সবচেয়ে বেশি।',
    },
    {
      q: 'ক্ষারীয় মৃত্তিকা ধাতুর সালফেটগুলোর (BeSO₄ থেকে BaSO₄) পানিতে দ্রাব্যতার সঠিক ক্রম কোনটি?',
      a: 'BeSO₄ > MgSO₄ > CaSO₄ > SrSO₄ > BaSO₄',
      d: ['BaSO₄ > SrSO₄ > CaSO₄ > MgSO₄ > BeSO₄', 'CaSO₄ > BaSO₄ > BeSO₄ > MgSO₄', 'সকল সালফেটের দ্রাব্যতা সমান'],
      exp: 'গ্রুপ-২-এ ওপর থেকে নিচে ক্যাটায়নের আকার বাড়লে হাইড্রেশন শক্তি দ্রুত কমে যায় বলে সালফেটগুলোর দ্রাব্যতা কমে (BaSO₄ প্রায় অদ্রবণীয়)।',
    },
    {
      q: 'ক্ষারীয় মৃত্তিকা ধাতুর হাইড্রোক্সাইডগুলোর পানিতে দ্রাব্যতা ও ক্ষারীয়তার ক্রম কোনটি?',
      a: 'Be(OH)₂ < Mg(OH)₂ < Ca(OH)₂ < Sr(OH)₂ < Ba(OH)₂',
      d: ['Be(OH)₂ > Mg(OH)₂ > Ca(OH)₂ > Ba(OH)₂', 'Mg(OH)₂ > Ba(OH)₂ > Ca(OH)₂', 'সকল হাইড্রোক্সাইড উভধর্মী'],
      exp: 'ক্ষুদ্র OH⁻ আয়নের ক্ষেত্রে ক্যাটায়নের আকার বাড়লে ল্যাটিস শক্তি দ্রুত হ্রাস পায়, তাই নিচের দিকে দ্রাব্যতা ও ক্ষারীয়তা বাড়ে।',
    },
    {
      q: 'অক্সিঅ্যাসিডের অম্লশক্তির সঠিক ক্রম কোনটি?',
      a: 'HClO₄ > HClO₃ > HClO₂ > HClO',
      d: ['HClO > HClO₂ > HClO₃ > HClO₄', 'HClO₃ > HClO₄ > HClO > HClO₂', 'HClO₂ > HClO₄ > HClO₃ > HClO'],
      exp: 'কেন্দ্রীয় Cl পরমাণুর ধনাত্মক জারণ মান (+৭ > +৫ > +৩ > +১) বাড়লে O–H বন্ধন দুর্বল হয়ে H⁺ দান প্রবণতা বাড়ে।',
    },
    {
      q: 'অক্সাইডগুলোর মধ্যে অম্লীয়তার সঠিক ক্রম কোনটি?',
      a: 'Cl₂O₇ > SO₃ > P₄O₁₀ > SiO₂',
      d: ['SiO₂ > P₄O₁₀ > SO₃ > Cl₂O₇', 'SO₃ > Cl₂O₇ > SiO₂ > P₄O₁₀', 'P₄O₁₀ > SO₃ > Cl₂O₇ > SiO₂'],
      exp: 'একই পর্যায়ে বাম থেকে ডানে অধাতব ধর্ম ও কেন্দ্রীয় পরমাণুর জারণ মান বাড়লে অক্সাইডের অম্লীয়তা বাড়ে।',
    },
    {
      q: 'আণবিক আন্তঃআণবিক আকর্ষণ ও গলনাঙ্ক বিবেচনায় কোন যৌগটির গলনাঙ্ক সর্বাধিক?',
      a: 'Al₂O₃ (অথবা NaCl) — কিন্তু সমযোজী NaCl > MgCl₂ > AlCl₃',
      d: ['AlCl₃ > MgCl₂ > NaCl', 'SiCl₄ > PCl₅ > NaCl', 'AlCl₃ (কক্ষ তাপমাত্রায় ১৮০°C-এ ঊর্ধ্বপাতিত হয়)'],
      exp: 'ফাজানের নীতি অনুযায়ী Na⁺ থেকে Al³⁺-এর দিকে চার্জ বাড়লে সমযোজী চরিত্র বাড়ে ও গলনাঙ্ক কমে (NaCl ৮০১°C > MgCl₂ ৭১৪°C > AlCl₃ ১৯০°C)।',
    },
    {
      q: 'হ্যালোজেনসমূহের বিজারণ বা জারণ ক্ষমতার ক্ষেত্রে নিচের কোন তথ্যটি সঠিক?',
      a: 'জারণ ক্ষমতা: F₂ > Cl₂ > Br₂ > I₂',
      d: ['জারণ ক্ষমতা: I₂ > Br₂ > Cl₂ > F₂', 'ক্লোরাইড আয়ন ফ্লোরাইডের চেয়ে শক্তিশালী বিজারক: ভুল (I⁻ > Br⁻ > Cl⁻ > F⁻)', 'আয়োডিন ক্লোরাইডকে জারিত করে Cl₂ মুক্ত করে'],
      exp: 'ফ্লোরিনের প্রমাণ বিজারণ বিভব (+২.৮৭ V) সর্বাধিক হওয়ায় F₂ তীব্রতম জারক এবং I⁻ তীব্রতম বিজারক।',
    },
    {
      q: 'সমযোজী হাইড্রোক্সি যৌগ কার্বন-হাইড্রোজেনের কোন সংকরায়িত কার্বনে সর্বাধিক তড়িৎ ঋণাত্মকতা ও অম্লধর্ম দেখা যায়?',
      a: 'sp সংকরিত কার্বন (যেমন ইথাইন, H–C≡C–H)',
      d: ['sp³ সংকরিত কার্বন (যেমন ইথেন)', 'sp² সংকরিত কার্বন (যেমন ইথিন)', 'সকল কার্বনের তড়িৎ ঋণাত্মকতা সমান (২.৫)'],
      exp: 'sp সংকরায়নে ৫০% s-চরিত্র থাকায় ইলেকট্রন নিউক্লিয়াসের সবচেয়ে কাছে থাকে; তাই sp কার্বনের তড়িৎ ঋণাত্মকতা (৩.২৫) > sp² (২.৭৫) > sp³ (২.৫)।',
    },
    {
      q: 'একই উপস্তরে প্রবেশ করলে দুটি ইলেকট্রনের জন্য নিচের কোনটি পাউলির বর্জন নীতি লঙ্ঘন করে?',
      a: 'n = ৩, l = ২, m = ০, s = +১/২ এবং n = ৩, l = ২, m = ০, s = +১/২',
      d: ['n = ৩, l = ২, m = ০, s = +১/২ এবং s = −১/২', 'n = ৩, l = ১, m = −১ ও m = +১', 'n = ৪, l = ০, m = ০, s = −১/২'],
      exp: 'চারটি কোয়ান্টাম সংখ্যা (n, l, m, s) কখনোই দুটি ইলেকট্রনের জন্য এক হতে পারে না; একই অরবিটালে থাকলে স্পিন বিপরীত হতে হবে।',
    },
    {
      q: 'নিচের কোন কোয়ান্টাম সংখ্যার সেটটি একটি পরমাণুতে বাস্তবে অসম্ভব?',
      a: 'n = ২, l = ২, m = ০, s = +১/২',
      d: ['n = ৩, l = ২, m = −২, s = −১/২', 'n = ৪, l = ৩, m = +৩, s = +১/২', 'n = ১, l = ০, m = ০, s = +১/২'],
      exp: 'l-এর সর্বোচ্চ মান (n − ১)। তাই n = ২ হলে l কেবল ০ বা ১ হতে পারে, কখনোই l = ২ সম্ভব নয় (2d অরবিটাল নেই)।',
    },
    {
      q: 'অসম্ভব অরবিটাল গুচ্ছ কোনটি?',
      a: '1p, 2d, 3f',
      d: ['2p, 3d, 4f', '4s, 4p, 4d', '5s, 5p, 5f'],
      exp: 'n = ১-এ শুধু 1s; n = ২-এ 2s, 2p; n = ৩-এ 3s, 3p, 3d থাকে। তাই 1p, 2d এবং 3f অরবিটালের কোনো অস্তিত্ব নেই।',
    },
    {
      q: 'নিচের কোন মৌল বা অণুটি অষ্টক সংকোচনের (Incomplete Octet) উদাহরণ?',
      a: 'BF₃ এবং BeCl₂',
      d: ['PCl₅ এবং SF₆', 'CH₄ এবং NH₃', 'H₂O এবং CCl₄'],
      exp: 'BeCl₂-তে Be-এর যোজ্যতা স্তরে ৪টি এবং BF₃-তে B-এর যোজ্যতা স্তরে ৬টি ইলেকট্রন থাকে (৮টির কম)।',
    },
  ];
  periodicComparisons.forEach((pc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: i >= 14 ? 'chem1_ch2_qualitative' : 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: pc.diff ?? (i % 2 === 0 ? 'medical' : 'dental'),
        question: pc.q,
        correct: pc.a,
        distractors: pc.d,
        explanation: pc.exp,
        reference: 'রসায়ন ১ম পত্র · হাজারী ও নাগ · অধ্যায় ২ ও ৩',
      })
    );
  });

  // 2. Chemical Kinetics, Equilibrium (Kp/Kc), Le Chatelier, pH & Buffer Quantitative Math (~120 MCQs)
  // 2A. Strong Acid & Strong Base pH Calculations (32 MCQs)
  const acidCases = [
    { name: 'HCl', conc: 0.1, hMult: 1, ph: 1 },
    { name: 'HCl', conc: 0.01, hMult: 1, ph: 2 },
    { name: 'HNO₃', conc: 0.001, hMult: 1, ph: 3 },
    { name: 'HCl', conc: 0.0001, hMult: 1, ph: 4 },
    { name: 'H₂SO₄', conc: 0.05, hMult: 2, ph: 1 },
    { name: 'H₂SO₄', conc: 0.005, hMult: 2, ph: 2 },
    { name: 'H₂SO₄', conc: 0.0005, hMult: 2, ph: 3 },
    { name: 'H₂SO₄', conc: 0.00005, hMult: 2, ph: 4 },
    { name: 'H₂SO₄', conc: 0.5, hMult: 2, ph: 0 },
    { name: 'HCl', conc: 0.00001, hMult: 1, ph: 5 },
  ];
  acidCases.forEach((ac, idx) => {
    const pOH = 14 - ac.ph;
    const hConc = ac.conc * ac.hMult;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `২৫ °C তাপমাত্রায় ${toBnDigits(ac.conc)} M ${ac.name} জলীয় দ্রবণের pH মান কত?`,
        correct: `${toBnDigits(ac.ph)}`,
        distractors: Array.from(new Set([0, 1, 2, 3, 4, 5, 7, 10, 12, 13].filter((v) => v !== ac.ph))).map((v) =>
          toBnDigits(v)
        ),
        explanation: `${ac.name} তীব্র অ্যাসিড; [H⁺] = ${toBnDigits(ac.conc)} × ${toBnDigits(ac.hMult)} = ${toBnDigits(hConc)} M = ১০⁻${toBnDigits(ac.ph)} M। অতএব pH = −log(১০⁻${toBnDigits(ac.ph)}) = ${toBnDigits(ac.ph)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · pH হিসাব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'dental',
        question: `২৫ °C তাপমাত্রায় ${toBnDigits(ac.conc)} M ${ac.name} দ্রবণের pOH মান কত?`,
        correct: `${toBnDigits(pOH)}`,
        distractors: Array.from(new Set([ac.ph, 7, 9, 10, 11, 12, 13, 14].filter((v) => v !== pOH))).map((v) =>
          toBnDigits(v)
        ),
        explanation: `দ্রবণটির pH = ${toBnDigits(ac.ph)}; যেহেতু pH + pOH = ১৪, তাই pOH = ১৪ − ${toBnDigits(ac.ph)} = ${toBnDigits(pOH)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · pOH নির্ণয়',
      })
    );
  });

  const baseCases = [
    { name: 'NaOH', conc: 0.1, ohMult: 1, poh: 1, ph: 13 },
    { name: 'KOH', conc: 0.01, ohMult: 1, poh: 2, ph: 12 },
    { name: 'NaOH', conc: 0.001, ohMult: 1, poh: 3, ph: 11 },
    { name: 'NaOH', conc: 0.0001, ohMult: 1, poh: 4, ph: 10 },
    { name: 'Ca(OH)₂', conc: 0.05, ohMult: 2, poh: 1, ph: 13 },
    { name: 'Ba(OH)₂', conc: 0.005, ohMult: 2, poh: 2, ph: 12 },
    { name: 'Ca(OH)₂', conc: 0.0005, ohMult: 2, poh: 3, ph: 11 },
    { name: 'NaOH', conc: 0.00001, ohMult: 1, poh: 5, ph: 9 },
  ];
  baseCases.forEach((bc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `২৫ °C তাপমাত্রায় ${toBnDigits(bc.conc)} M ${bc.name} ক্ষার দ্রবণের pH মান কত?`,
        correct: `${toBnDigits(bc.ph)}`,
        distractors: Array.from(new Set([bc.poh, 7, 8, 9, 10, 11, 12, 13, 14].filter((v) => v !== bc.ph))).map((v) =>
          toBnDigits(v)
        ),
        explanation: `[OH⁻] = ${toBnDigits(bc.conc)} × ${toBnDigits(bc.ohMult)} = ১০⁻${toBnDigits(bc.poh)} M হওয়ায় pOH = ${toBnDigits(bc.poh)}। অতএব pH = ১৪ − ${toBnDigits(bc.poh)} = ${toBnDigits(bc.ph)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · ক্ষারের pH',
      })
    );
  });

  // 2B. Weak Acid [H+] = sqrt(Ka*C) & Henderson-Hasselbalch Buffer pH (16 MCQs)
  const weakAcids = [
    { ka: '১ × ১০⁻⁵', c: '০.১ M', hPlus: '১ × ১০⁻³ M', ph: 3, alpha: '১%' },
    { ka: '১ × ১০⁻⁴', c: '০.০১ M', hPlus: '১ × ১০⁻³ M', ph: 3, alpha: '১০%' },
    { ka: '১ × ১০⁻⁶', c: '০.০১ M', hPlus: '১ × ১০⁻⁴ M', ph: 4, alpha: '১%' },
    { ka: '১ × ১০⁻⁵', c: '০.০০১ M', hPlus: '১ × ১০⁻⁴ M', ph: 4, alpha: '১০%' },
    { ka: '১ × ১০⁻⁸', c: '০.০১ M', hPlus: '১ × ১০⁻⁵ M', ph: 5, alpha: '০.১%' },
    { ka: '১ × ১০⁻⁶', c: '১.০ M', hPlus: '১ × ১০⁻³ M', ph: 3, alpha: '০.১%' },
  ];
  weakAcids.forEach((wa, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি দুর্বল মনোবেসিক অ্যাসিডের বিয়োজন ধ্রুবক Ka = ${wa.ka} এবং ঘনমাত্রা ${wa.c} হলে দ্রবণটির pH এবং বিয়োজন মাত্রা (α) কত?`,
        correct: `pH = ${toBnDigits(wa.ph)}, α = ${wa.alpha}`,
        distractors: [
          `pH = ${toBnDigits(wa.ph + 2)}, α = ${wa.alpha}`,
          `pH = ${toBnDigits(wa.ph - 1)}, α = ৫০%`,
          `pH = ${toBnDigits(wa.ph + 1)}, α = ২৫%`,
          `pH = ${toBnDigits(wa.ph + 3)}, α = ৫%`,
        ],
        explanation: `[H⁺] = √(Ka × C) = ${wa.hPlus} হওয়ায় pH = ${toBnDigits(wa.ph)} এবং α = √(Ka/C) × ১০০% = ${wa.alpha}। (${idx + 1})`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অসওয়াল্ড সূত্র',
      })
    );
  });

  const bufferCases = [
    { pKa: 4.74, salt: 0.1, acid: 0.1, ph: '৪.৭৪' },
    { pKa: 4.74, salt: 1.0, acid: 0.1, ph: '৫.৭৪' },
    { pKa: 4.74, salt: 0.01, acid: 0.1, ph: '৩.৭৪' },
    { pKa: 5.0, salt: 0.2, acid: 0.02, ph: '৬.০' },
    { pKa: 4.0, salt: 0.05, acid: 0.5, ph: '৩.০' },
    { pKa: 7.2, salt: 0.5, acid: 0.5, ph: '৭.২' },
  ];
  bufferCases.forEach((bc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `কোনো অম্লীয় বাফার দ্রবণে দুর্বল অ্যাসিডের pKa = ${toBnDigits(bc.pKa)}, [লবণ] = ${toBnDigits(bc.salt)} M এবং [অম্ল] = ${toBnDigits(bc.acid)} M হলে বাফার দ্রবণের pH কত?`,
        correct: bc.ph,
        distractors: ['২.৭৪', '৭.০', '৮.৭৪', '৬.৭৪', '৪.০০', '৯.২'],
        explanation: `হেন্ডারসন-হ্যাসেলবাখ সমীকরণ: pH = pKa + log([লবণ]/[অম্ল]) = ${toBnDigits(bc.pKa)} + log(${toBnDigits(bc.salt)}/${toBnDigits(bc.acid)}) = ${bc.ph}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · হেন্ডারসন সমীকরণ',
      })
    );
  });

  // 2C. Kp = Kc(RT)^Δn & Le Chatelier Reaction Matrix (32 MCQs)
  const eqReactions = [
    { rxn: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)', dn: -2, rel: 'Kp = Kc(RT)⁻² (অর্থাৎ Kp < Kc)', unit: 'atm⁻² / L²·mol⁻²', heat: 'ΔH = −৯২ kJ (তাপোৎপাদী)' },
    { rxn: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)', dn: -1, rel: 'Kp = Kc(RT)⁻¹ (অর্থাৎ Kp < Kc)', unit: 'atm⁻¹ / L·mol⁻¹', heat: 'ΔH = −১৯৭ kJ (তাপোৎপাদী)' },
    { rxn: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', dn: 1, rel: 'Kp = Kc(RT)¹ (অর্থাৎ Kp > Kc)', unit: 'atm / mol·L⁻¹', heat: 'ΔH = +৯০ kJ (তাপহারী)' },
    { rxn: 'H₂(g) + I₂(g) ⇌ 2HI(g)', dn: 0, rel: 'Kp = Kc (Δn = ০)', unit: 'এককবিহীন', heat: 'ΔH = +৫২ kJ (চাপ নিরপেক্ষ)' },
    { rxn: 'N₂(g) + O₂(g) ⇌ 2NO(g)', dn: 0, rel: 'Kp = Kc (চাপের প্রভাব নেই)', unit: 'এককবিহীন', heat: 'ΔH = +১৮০ kJ (তাপহারী)' },
    { rxn: 'N₂O₄(g) ⇌ 2NO₂(g)', dn: 1, rel: 'Kp = Kc(RT) (Δn = +১)', unit: 'atm / mol·L⁻¹', heat: 'ΔH = +৫৭.২ kJ (তাপহারী)' },
    { rxn: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)', dn: 1, rel: 'Kp = P(CO₂) = Kc(RT)', unit: 'atm (সলিড বাদে Δn = +১)', heat: 'ΔH = +১৭৮ kJ (তাপহারী)' },
    { rxn: '2NH₃(g) ⇌ N₂(g) + 3H₂(g)', dn: 2, rel: 'Kp = Kc(RT)² (অর্থাৎ Kp > Kc)', unit: 'atm² / mol²·L⁻²', heat: 'ΔH = +৯২ kJ (তাপহারী)' },
  ];
  eqReactions.forEach((er, i) => {
    const others = eqReactions.filter((x) => x.rxn !== er.rxn);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${er.rxn} উভমুখী গ্যাসীয় বিক্রিয়ার ক্ষেত্রে Kp ও Kc-এর সঠিক সম্পর্ক কোনটি?`,
        correct: er.rel,
        distractors: Array.from(new Set(others.map((x) => x.rel))).slice(0, 4),
        explanation: `এখানে গ্যাসীয় মোল সংখ্যার পরিবর্তন Δn = ${toBnDigits(er.dn)}; তাই Kp = Kc(RT)^Δn অনুযায়ী ${er.rel}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · Kp ও Kc',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `${er.rxn} বিক্রিয়ায় সাম্যধ্রুবক Kp ও Kc-এর একক যথাক্রমে কী?`,
        correct: er.unit,
        distractors: Array.from(new Set(others.map((x) => x.unit))).slice(0, 4),
        explanation: `Δn = ${toBnDigits(er.dn)} হওয়ায় Kp-এর একক (atm)^Δn এবং Kc-এর একক (mol·L⁻¹)^Δn অর্থাৎ ${er.unit}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · সাম্যধ্রুবকের একক',
      })
    );
    const pressureAction =
      er.dn < 0
        ? 'চাপ বৃদ্ধি করলে সাম্যাবস্থা ডানদিকে (উৎপাদের দিকে) সরে যাবে'
        : er.dn > 0
          ? 'চাপ বৃদ্ধি করলে সাম্যাবস্থা বামদিকে (বিক্রিয়কের দিকে) সরে যাবে'
          : 'চাপ পরিবর্তন করলে সাম্যাবস্থার কোনো পরিবর্তন হবে না';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${er.rxn} (${er.heat}) বিক্রিয়ায় লা শাতেলিয়ার নীতি অনুসারে চাপের প্রভাব কোনটি?`,
        correct: pressureAction,
        distractors: [
          'চাপ বৃদ্ধি করলে সাম্যাবস্থা ডানদিকে (উৎপাদের দিকে) সরে যাবে',
          'চাপ বৃদ্ধি করলে সাম্যাবস্থা বামদিকে (বিক্রিয়কের দিকে) সরে যাবে',
          'চাপ পরিবর্তন করলে সাম্যাবস্থার কোনো পরিবর্তন হবে না',
          'প্রভাবক যোগ করলে সাম্যধ্রুবক Kc দ্বিগুণ হবে',
        ],
        explanation: `গ্যাসীয় মোল সংখ্যা Δn = ${toBnDigits(er.dn)}; চাপ বাড়ালে কম গ্যাসীয় মোলসংখ্যার দিকে সাম্য অগ্রসর হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · লা শাতেলিয়ার নীতি',
      })
    );
  });

  // 3. First-order Half-Life, Rate Constant Units & Q10 Temperature Rule (16 MCQs)
  const k1Half = [0.693, 0.0693, 0.03465, 0.1386, 0.231, 0.3465];
  k1Half.forEach((k) => {
    const tHalf = Number((0.693 / k).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি প্রথম ক্রম বিক্রিয়ার হার ধ্রুবক k = ${toBnDigits(k)} s⁻¹ হলে বিক্রিয়াটির অর্ধায়ু (t₁/₂) কত সেকেন্ড?`,
        correct: `${toBnDigits(tHalf)} সেকেন্ড`,
        distractors: [
          `${toBnDigits(Number((tHalf * 2).toFixed(2)))} সেকেন্ড`,
          `${toBnDigits(Number((tHalf / 2).toFixed(2)))} সেকেন্ড`,
          `${toBnDigits(Number((tHalf * 10).toFixed(2)))} সেকেন্ড`,
          `${toBnDigits(Number((1 / k).toFixed(2)))} সেকেন্ড`,
        ],
        explanation: `প্রথম ক্রম বিক্রিয়ার অর্ধায়ু t₁/₂ = ০.৬৯৩ / k = ০.৬৯৩ / ${toBnDigits(k)} = ${toBnDigits(tHalf)} সেকেন্ড।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · প্রথম ক্রম বিক্রিয়া',
      })
    );
  });

  [
    { order: 'শূন্য ক্রম (Zero order)', unit: 'mol·L⁻¹·s⁻¹', half: 'প্রারম্ভিক ঘনমাত্রার সমানুপাতিক (a₀/2k)' },
    { order: 'প্রথম ক্রম (First order)', unit: 's⁻¹ (সময়⁻¹)', half: 'প্রারম্ভিক ঘনমাত্রার ওপর নির্ভরশীল নয় (0.693/k)' },
    { order: 'দ্বিতীয় ক্রম (Second order)', unit: 'L·mol⁻¹·s⁻¹', half: 'প্রারম্ভিক ঘনমাত্রার ব্যস্তানুপাতিক (1/(k·a₀))' },
  ].forEach((ord) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${ord.order} বিক্রিয়ার হার ধ্রুবক (k)-এর সঠিক একক কোনটি?`,
        correct: ord.unit,
        distractors: ['mol·L⁻¹·s⁻¹', 's⁻¹ (সময়⁻¹)', 'L·mol⁻¹·s⁻¹', 'L²·mol⁻²·s⁻¹'],
        explanation: `n-তম ক্রমের হার ধ্রুবকের সাধারণ একক (mol·L⁻¹)¹⁻ⁿ·s⁻¹; তাই ${ord.order}-এর একক ${ord.unit} এবং অর্ধায়ু ${ord.half}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · বিক্রিয়ার ক্রম',
      })
    );
  });

  // 4. Neutralization Heat, Food Preservatives, Milk, Vinegar & Colloids Matrix (40 MCQs)
  const appliedData = [
    { item: 'দুধের স্বাভাবিক pH', val: '৬.৬ – ৬.৮', ch: 'chem1_ch5_applied' },
    { item: 'মানব রক্তের স্বাভাবিক pH', val: '৭.৩৫ – ৭.৪৫ (৭.৪০)', ch: 'chem1_ch4_equilibrium' },
    { item: 'মানুষের অশ্রুজলের pH', val: '৭.৪ (প্রায় ৭.২–৭.৫)', ch: 'chem1_ch4_equilibrium' },
    { item: 'পাকস্থলির গ্যাস্ট্রিক জুসের pH', val: '১.৫ – ২.৫', ch: 'chem1_ch4_equilibrium' },
    { item: 'মুখগহ্বরে দাঁতের এনামেল ক্ষয় শুরুর pH', val: '৫.৫-এর নিচে', ch: 'chem1_ch4_equilibrium' },
    { item: 'ত্বকের প্রাকৃতিক অ্যাসিড ম্যান্টল ও বেবি শ্যাম্পুর pH', val: '৪.৫ – ৫.৫', ch: 'chem1_ch5_applied' },
    { item: 'ভিনেগারে CH₃COOH-এর শতকরা পরিমাণ', val: '৬% – ১০%', ch: 'chem1_ch5_applied' },
    { item: 'জ্যাম-জেলিতে সোডিয়াম বেনজোয়েটের সর্বোচ্চ নিরাপদ মাত্রা', val: '০.১% পর্যন্ত', ch: 'chem1_ch5_applied' },
    { item: 'গরুর দুধে পানির গড় শতকরা পরিমাণ', val: '৮৭.২%', ch: 'chem1_ch5_applied' },
    { item: 'কৌটাজাতকরণে রিটর্টিং তাপমাত্রা', val: '১১৬ – ১২১ °C', ch: 'chem1_ch5_applied' },
    { item: 'সিলিকন বা গ্লাসিয়াল অ্যাসিটিক অ্যাসিডের হিমাঙ্ক', val: '১৬.৬ °C', ch: 'chem1_ch5_applied' },
    { item: 'তীব্র অ্যাসিড ও তীব্র ক্ষারের প্রমাণ প্রশমন তাপ', val: '−৫৭.৩৪ kJ/mol', ch: 'chem1_ch4_equilibrium' },
  ];
  appliedData.forEach((ad, i) => {
    const others = appliedData.filter((x) => x.item !== ad.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: ad.ch,
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `HSC রসায়ন পাঠ্যবই অনুযায়ী "${ad.item}"-এর আদর্শ বা নির্ধারিত মান কোনটি?`,
        correct: ad.val,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.val),
        explanation: `${ad.item}-এর নির্ধারিত মান হলো ${ad.val}।`,
        reference: 'রসায়ন ১ম পত্র · হাজারী ও নাগ · অধ্যায় ৪ ও ৫',
      })
    );
  });

  // 5. Targeted High-Yield Medical & Dental Chemistry 1st Paper Drills (~160 MCQs via single-best-answer pairs + True/False conceptual)
  const chem1Drills: Array<[string, string, string, string, [string, string, string], string]> = [
    ['chem1_ch1_lab', 'ph_buffer', 'পল-বুঙ্গি ব্যালেন্সে ১০ মিলিগ্রাম (mg) রাইডার ব্যবহার করা হলে রাইডার ধ্রুবকের মান কত?', '০.০০০২ গ্রাম', ['০.০০০১ গ্রাম', '০.০০২ গ্রাম', '০.০০৫ গ্রাম'], 'রাইডার ধ্রুবক = ২ × (রাইডার ওজন / ১০০) = ২ × (০.০১ g / ১০০) = ০.০০০২ g।'],
    ['chem1_ch1_lab', 'ph_buffer', 'রসায়ন পরীক্ষাগারে যে সকল প্রাকৃতিক বা অজৈব পদার্থ বায়ু থেকে জলীয় বাষ্প শোষণ করে গলে যায় (যেমন CaCl₂, NaOH) তাদের কী বলে?', 'পানিগ্রাহী বা উদগ্রাহী (Deliquescent) পদার্থ', ['উদ্বায়ী পদার্থ', 'প্রাইমারি স্ট্যান্ডার্ড', 'নিরুদক নয় এমন লবণ'], 'উদগ্রাহী পদার্থ বায়ু থেকে আর্দ্রতা টেনে দ্রবণে পরিণত হয়, তাই এদের ডেসিক্যাটর বা এয়ারটাইট বোতলে রাখা হয়।'],
    ['chem1_ch1_lab', 'ph_buffer', 'কাচপাত্র তৈরিতে ক্ষারীয় CaO ও Na₂O ব্যবহারের বদলে কোন উপাদান বেশি থাকলে তা তাপ-সহনশীল পাইরেক্স কাচে পরিণত হয়?', 'বোরন ট্রাই-অক্সাইড (B₂O₃)', ['লেড অক্সাইড (PbO)', 'কোবাল্ট অক্সাইড (CoO)', 'আয়রন অক্সাইড (Fe₂O₃)'], 'বোরোসিলিকেট কাচে প্রায় ১২–১৩% B₂O₃ থাকায় এটি তাপীয় প্রসারণ সহনশীল হয়।'],
    ['chem1_ch1_lab', 'ph_buffer', 'KMnO₄ দ্রবণ দ্বারা টাইট্রেশনের সময় বুরেটের মেনিস্কাসের কোন অংশের পাঠ নিতে হয়?', 'ঊর্ধ্ব মেনিস্কাস (Upper meniscus)', ['নিম্ন মেনিস্কাস', 'মধ্য বিন্দু', 'শূন্য দাগ ছাড়া অন্য যেকোনো দাগ'], 'KMnO₄ গাঢ় বেগুনি রঙের হওয়ায় নিম্ন মেনিস্কাস দেখা যায় না, তাই ঊর্ধ্ব মেনিস্কাসের পাঠ নেওয়া হয়।'],
    ['chem1_ch1_lab', 'ph_buffer', 'বুনসেন বার্নারের অনুজ্জ্বল নীল শিখার ভেতরে জারণ ও বিজারণ অঞ্চলগুলোর মধ্যে সবচেয়ে উষ্ণ অংশ কোনটি?', 'বাইরের পূর্ণ জারণ মণ্ডলের প্রান্তভাগ (প্রায় ১৫০০–১৫৭০ °C)', ['নীল অভ্যন্তরীণ শঙ্কুর একদম গোড়া (৩০০ °C)', 'অভ্যন্তরীণ বিজারণ অঞ্চল', 'বার্নার নলের ভেতরের বায়ুছিদ্র'], 'শিখার বাইরের অঞ্চলে বায়ুর অক্সিজেনের সাথে পূর্ণ দহন ঘটে বলে তাপমাত্রা সর্বাধিক (~১৫৭০ °C) হয়।'],
    ['chem1_ch1_lab', 'ph_buffer', 'ল্যাবরেটরিতে চোখে তীব্র ক্ষার বা অ্যাসিড ছিটকে পড়লে তাৎক্ষণিক প্রথম কাজ কী?', 'অন্তত ১৫–২০ মিনিট অবিরাম ঠান্ডা পরিষ্কার পানির ঝাপটা দিয়ে চোখ ধোয়া', ['তাৎক্ষণিক লঘু HCl বা NaHCO₃ ঢালা', 'তুলো দিয়ে চোখ ঘষে মোছা', 'চোখ বন্ধ করে রাখা'], 'চোখে কখনোই সরাসরি রাসায়নিক নিরপেক্ষকারী ব্যবহার করা হয় না; কেবল প্রচুর পরিষ্কার পানির ঝাপটা দিতে হয়।'],
    ['chem1_ch1_lab', 'ph_buffer', 'কোন বিকারকটি ল্যাবরেটরিতে ডেসিক্যাটরে আর্দ্রতা শোষণকারী (Desiccant) হিসেবে ব্যবহৃত হয় না?', 'পটাশিয়াম নাইট্রেট (KNO₃)', ['সিলিকা জেল', 'অনার্দ্র CaCl₂', 'ফসফরাস পেন্টা-অক্সাইড (P₂O₅)'], 'অনার্দ্র CaCl₂, সিলিকা জেল, গাঢ় H₂SO₄ ও P₂O₅ উৎকৃষ্ট নিরুদক বা শুষ্ককারক, কিন্তু KNO₃ নয়।'],
    ['chem1_ch1_lab', 'ph_buffer', 'টাইট্রেশনে সূক্ষ্মভাবে ০.০০৫ M বা তার চেয়ে সূক্ষ্ম আয়তন মাপতে ১০ mL পিপেটের পরিবর্তে কী ব্যবহার বেশি উপযোগী?', 'মাইক্রোপিপেট (Micropipette) বা ১০ mL মাইক্রো-বুরেট', ['১০০ mL পরিমাপক সিলিন্ডার', '২৫০ mL বিকার', '৫০০ mL ভলিউমেট্রিক ফ্লাস্ক'], 'ক্ষুদ্র আয়তনের জন্য মেজারিং সিলিন্ডারের চেয়ে মাইক্রোপিপেট বা বুরেটের সূক্ষ্মতা অনেক বেশি।'],
    ['chem1_ch2_qualitative', 'hybridization', 'একই মৌলের পরমাণুর মধ্যে নিউট্রন সংখ্যা ভিন্ন কিন্তু প্রোটন সংখ্যা সমান হলে তাদের পরস্পরকে কী বলে?', 'আইসোটোপ (Isotope)', ['আইসোবার', 'আইসোটোন', 'আইসোইলেকট্রনিক'], 'যেমন হাইড্রোজেনের তিনটি আইসোটোপ: প্রোটিয়াম (¹H), ডিউটেরিয়াম (²H) ও ট্রিটিয়াম (³H)।'],
    ['chem1_ch2_qualitative', 'hybridization', 'মেসন, নিউট্রিনো, পজিট্রন ও পাইওন — এগুলো পরমাণুর কোন ধরনের কণিকা?', 'অস্থায়ী মূল কণিকা (Unstable fundamental particles)', ['স্থায়ী মূল কণিকা', 'কম্পোজিট কণিকা', 'কেবল ধনাত্মক কণিকা'], 'ইলেকট্রন, প্রোটন ও নিউট্রন স্থায়ী; আর পজিট্রন, নিউট্রিনো, মেসন, গ্র্যাভিটন হলো অস্থায়ী মূল কণিকা।'],
    ['chem1_ch2_qualitative', 'hybridization', 'জাল পাসপোর্ট ও ব্যাংক নোটের নিরাপত্তা চিহ্ন যাচাই করতে কোন তড়িৎচুম্বকীয় বিকিরণ ব্যবহৃত হয়?', 'অতিবেগুনি রশ্মি (UV: ২৩০–৩৭৫ nm)', ['অবলোহিত রশ্মি (IR)', 'রেডিও তরঙ্গ', 'গামা রশ্মি'], 'জাল নোট শনাক্তকারী যন্ত্রে UV আলো ফেললে আসল নোটের নিরাপত্তা সুতা ও ফসফর কালি প্রতিপ্রভা ছড়ায়।'],
    ['chem1_ch2_qualitative', 'hybridization', 'চিকিৎসাবিজ্ঞানে MRI (Magnetic Resonance Imaging)-তে শরীরের অভ্যন্তরীণ ছবি তুলতে কোন তরঙ্গ ব্যবহৃত হয়?', 'রেডিও ফ্রিকোয়েন্সি তরঙ্গ (নিউক্লিয়ার ম্যাগনেটিক রেজোন্যান্স)', ['উচ্চ শক্তির এক্স-রে', 'গামা রশ্মি', 'অতিবেগুনি রশ্মি'], 'MRI-তে শক্তিশালী চৌম্বক ক্ষেত্র ও রেডিও তরঙ্গ ব্যবহৃত হয় বলে রোগীর কোনো আয়োনাইজিং তেজস্ক্রিয় ক্ষতির ঝুঁকি নেই।'],
    ['chem1_ch2_qualitative', 'hybridization', 'ইলেকট্রনের কক্ষীয় কৌণিক ভরবেগ ও অরবিটাল কৌণিক ভরবেগ নির্ণয়ের সূত্র দুটির মূল পার্থক্য কী?', 'বোর কৌণিক ভরবেগ mvr = nh/(2π), আর অরবিটাল কৌণিক ভরবেগ = √(l(l+1))·h/(2π)', ['উভয়ই সবসময় শূন্য হয়', 'অরবিটাল কৌণিক ভরবেগ m দিয়ে নির্ণীত হয়', 's-অরবিটালে অরবিটাল কৌণিক ভরবেগ h/2π'], 'l = ০ (s-অরবিটাল) হলে অরবিটাল কৌণিক ভরবেগ √(০×১) = ০ হয়।'],
    ['chem1_ch2_qualitative', 'hybridization', 'সমআয়ন প্রভাবের (Common Ion Effect) কারণে একটি স্বল্প দ্রবণীয় লবণ AgCl-এর জলীয় দ্রবণে NaCl যোগ করলে কী ঘটে?', 'AgCl-এর দ্রাব্যতা হ্রাস পায় এবং অতিরিক্ত AgCl অধঃক্ষিপ্ত হয়', ['AgCl-এর দ্রাব্যতা দ্বিগুণ হয়', 'AgCl-এর Ksp বেড়ে যায়', 'দ্রবণ নীল বর্ণের হয়'], 'একই আয়ন Cl⁻-এর ঘনমাত্রা বেড়ে যাওয়ায় লা শাতেলিয়ার নীতি অনুসারে সাম্য বামদিকে সরে AgCl-এর দ্রাব্যতা কমায়, তবে Ksp অপরিবর্তিত থাকে।'],
    ['chem1_ch2_qualitative', 'hybridization', 'কোন হ্যালাইডের ক্ষেত্রে আলোকসংবেদনশীল ফটোগ্রাফিক প্লেটে AgBr ব্যবহৃত হয় এবং অসওয়াল্ড বা হ্যালাইড পরীক্ষায় ক্রিম অধঃক্ষেপ দেয়?', 'ব্রোমাইড আয়ন (Br⁻)', ['ফ্লোরাইড (F⁻)', 'ক্লোরাইড (Cl⁻)', 'নাইট্রেট (NO₃⁻)'], 'AgBr হালকা হলুদ/ক্রিম বর্ণের অধঃক্ষেপ তৈরি করে যা গাঢ় অ্যামোনিয়াতে ধীরগতিতে দ্রবীভূত হয়।'],
    ['chem1_ch2_qualitative', 'hybridization', 'অবিশুদ্ধ বেনজয়িক অ্যাসিড ও ন্যাপথালিনের সাথে খাদ্যলবণ (NaCl) মিশ্রিত থাকলে কোন পদ্ধতিতে বিশুদ্ধ বেনজয়িক অ্যাসিড পৃথক করা সহজতম?', 'উর্ধ্বপাতন (Sublimation)', ['আংশিক পাতন', 'ক্রোমাটোগ্রাফি', 'দ্রাবক নিষ্কাশন'], 'বেনজয়িক অ্যাসিড ও ন্যাপথালিন উদবায়ী কঠিন (Sublime) কিন্তু NaCl অনুদ্বায়ী।'],
    ['chem1_ch2_qualitative', 'hybridization', 'সমস্ফুটন মিশ্রণ (Azeotropic mixture — যেমন ৯৫.৬% ইথানল ও ৪.৪% পানি বা রেকটিফায়েড স্পিরিট)-কে সাধারণ আংশিক পাতনে পৃথক করা যায় না কেন?', 'উভয় উপাদান একই স্থির তাপমাত্রায় (৭৮.১ °C) অভিন্ন সংযুক্তিতে বাষ্পীভূত হয়', ['ইথানল পানিতে অদ্রবণীয়', 'ইথানলের স্ফুটনাঙ্ক ২০০ °C', 'পানি উচ্চতাপে বিয়োজিত হয়'], 'অ্যাজিওট্রপিক মিশ্রণ থেকে ১০০% বিশুদ্ধ (Absolute) অ্যালকোহল পেতে CaO দিয়ে নিরুদন বা বেনজিন যোগ করে অ্যাজিওট্রপিক পাতন করতে হয়।'],
    ['chem1_ch3_periodic', 'hybridization', 'পানি (H₂O) তরল কিন্তু হাইড্রোজেন সালফাইড (H₂S) সাধারণ তাপমাত্রায় গ্যাস কেন?', 'H₂O অণুসমূহের মধ্যে শক্তিশালী আন্তঃআণবিক হাইড্রোজেন বন্ধন বিদ্যমান', ['অক্সিজেনের আণবিক ভর সালফারের চেয়ে বেশি', 'H₂S একটি আয়নিক যৌগ', 'পানির অণু সরলরৈখিক'], 'S-এর তড়িৎ ঋণাত্মকতা (২.৫) কম হওয়ায় H₂S-এ হাইড্রোজেন বন্ধন গঠিত হয় না, কিন্তু H₂O-তে শক্তিশালী H-বন্ধন থাকে।'],
    ['chem1_ch3_periodic', 'hybridization', 'অর্থো-নাইট্রোফেনল বাষ্পে উদ্বায়ী কিন্তু প্যারা-নাইট্রোফেনলের স্ফুটনাঙ্ক অনেক বেশি ও বাষ্প-অনুদ্বায়ী কেন?', 'অর্থো-নাইট্রোফেনলে অন্তঃআণবিক এবং প্যারা-নাইট্রোফেনলে আন্তঃআণবিক H-বন্ধন থাকে', ['প্যারা যৌগটি আয়নিক', 'অর্থো যৌগের আণবিক ভর কম', 'প্যারা যৌগে সংকরায়ন ঘটে না'], 'অর্থো সমানুতে একই অণুর –OH ও –NO₂ গ্রুপের মধ্যে অন্তঃআণবিক H-বন্ধন চিলেট রিং তৈরি করায় পাশের অণুর সাথে আকর্ষণ কমে।'],
    ['chem1_ch3_periodic', 'hybridization', 'KHF₂ (পটাশিয়াম বাইফ্লোরাইড) যৌগটির অস্তিত্ব থাকলেও KHCl₂-এর অস্তিত্ব নেই কেন?', 'অত্যধিক শক্তিশালী হাইড্রোজেন বন্ধনের মাধ্যমে [F–H···F]⁻ আয়ন গঠনের কারণে', ['ক্লোরিনের ইলেকট্রন আসক্তি কম', 'ফ্লোরিন d-অরবিটাল ব্যবহার করে', 'পটাশিয়াম কেবল ফ্লোরিনের সাথে বিক্রিয়া করে'], 'HF₂⁻ (বাইফ্লোরাইড) আয়ন সুস্থিত শক্তিশালী প্রতিসম হাইড্রোজেন বন্ধনের ফল, যা Cl⁻-এর কম তড়িৎ ঋণাত্মকতায় সম্ভব নয়।'],
    ['chem1_ch3_periodic', 'hybridization', 'নিষ্ক্রিয় গ্যাস (Group 18)-এর মধ্যে কোনটি প্রথম রাসায়নিক যৌগ XePtF₆ সংশ্লেষণের মাধ্যমে নিষ্ক্রিয়তার ধারণা ভেঙে দেয়?', 'জেনন (Xe — নীল বার্টলেট, ১৯৬২)', ['হিলিয়াম (He)', 'নিয়ন (Ne)', 'আর্গন (Ar)'], 'জেননের প্রথম আয়নিকরণ শক্তি অক্সিজেন অণুর প্রায় সমান হওয়ায় শক্তিশালী জারক PtF₆-এর সাথে Xe⁺[PtF₆]⁻ গঠিত হয়।'],
    ['chem1_ch3_periodic', 'hybridization', 'NH₃ এবং NF₃ উভয় অণুই ত্রিকোণাকার পিরামিডীয় হলেও NH₃-এর ডাইপোল মোমেন্ট (১.৪৭ D) NF₃ (০.২৩ D) অপেক্ষা অনেক বেশি কেন?', 'NH₃-তে বন্ধন ডাইপোল ও নিঃসঙ্গ জোড়ের ডাইপোল একই দিকে, কিন্তু NF₃-তে বিপরীত দিকে ক্রিয়া করে', ['NF₃ অণু সমতলীয়', 'নাইট্রোজেনের তড়িৎ ঋণাত্মকতা ফ্লোরিন অপেক্ষা বেশি', 'NF₃-তে কোনো নিঃসঙ্গ জোড় নেই'], 'F পরমাণু N অপেক্ষা অধিক তড়িৎ ঋণাত্মক হওয়ায় N→F বন্ধন ভেক্টর নিচের দিকে এবং নিঃসঙ্গ জোড়ের ভেক্টর ওপরের দিকে গিয়ে আংশিক প্রশমিত হয়।'],
    ['chem1_ch3_periodic', 'hybridization', 'অবস্থান্তর ধাতুর জটিল যৌগে সিগমা বন্ধনের পাশাপাশি যে ব্যাক-বন্ডিং (Synergic π-bonding) দেখা যায় তা প্রধানত কোন লিগ্যান্ডে প্রবল?', 'কার্বন মনোক্সাইড (CO) ও CN⁻', ['F⁻ ও Cl⁻', 'H₂O ও NH₃', 'SO₄²⁻'], 'ধাতব কার্বনিল [Ni(CO)₄, Fe(CO)₅] যৌগে CO ধাতুর সাথে σ বন্ধনের পাশাপাশি ধাতুর পূর্ণ d-অরবিটাল থেকে CO-এর π* অরবিটালে ব্যাক-বন্ডিং করে।'],
    ['chem1_ch3_periodic', 'hybridization', 'CaCl₂ এবং ZnCl₂-এর মধ্যে কোনটি অধিক সমযোজী প্রকৃতির এবং কেন?', 'ZnCl₂ অধিক সমযোজী, কারণ Zn²⁺-এর ছদ্ম নিষ্ক্রিয় গ্যাস বিন্যাস (18 e⁻) থাকায় এর পোলারায়ন ক্ষমতা বেশি', ['CaCl₂ অধিক সমযোজী', 'উভয়ের আয়নিক চরিত্র শতভাগ', 'ZnCl₂-এর গলনাঙ্ক বেশি'], 'Cu⁺, Ag⁺, Zn²⁺, Cd²⁺, Hg²⁺-এর বহিঃস্থ স্তরে (ns² np⁶ nd¹⁰) ১৮টি ইলেকট্রন থাকে বলে d-ইলেকট্রনের দুর্বল স্ক্রিনিংয়ে এদের পোলারায়ন ক্ষমতা অষ্টকপূর্ণ (8 e⁻) Ca²⁺ অপেক্ষা অনেক বেশি।'],
    ['chem1_ch4_equilibrium', 'ph_buffer', 'পানিতে সামান্য তীব্র অ্যাসিড যোগ করলে pH ব্যাপকভাবে বদলে গেলেও রক্তের বাফার দ্রবণের pH ৭.৪ প্রায় অপরিবর্তিত থাকে কেন?', 'বাফার দ্রবণে থাকা দুর্বল অ্যাসিড ও তার অনুবন্ধী ক্ষার যোগকৃত H⁺/OH⁻-কে প্রশমিত করে', ['বাফার দ্রবণের Kw = ০', 'রক্তে কোনো পানি থাকে না', 'বাফার কেবল তাপ শোষণ করে'], 'রক্তের H₂CO₃ / HCO₃⁻ বাফার সিস্টেমে অতিরিক্ত H⁺ এলে HCO₃⁻ তা গ্রহণ করে দুর্বল H₂CO₃ তৈরি করে এবং pH স্থির রাখে।'],
    ['chem1_ch4_equilibrium', 'ph_buffer', 'কোনো বিক্রিয়ার সম্মুখমুখী সক্রিয়ণ শক্তি Ef = ৮০ kJ/mol এবং পশ্চাৎমুখী সক্রিয়ণ শক্তি Eb = ১২৫ kJ/mol হলে বিক্রিয়াটির এনথালপি পরিবর্তন (ΔH) কত?', '−৪৫ kJ/mol (তাপোৎপাদী)', ['+৪৫ kJ/mol (তাপহারী)', '+২০৫ kJ/mol', '−২০৫ kJ/mol'], 'ΔH = Ef − Eb = ৮০ − ১২৫ = −৪৫ kJ/mol; ঋণাত্মক মান হওয়ায় এটি তাপোৎপাদী বিক্রিয়া।'],
    ['chem1_ch4_equilibrium', 'ph_buffer', 'একটি উভমুখী বিক্রিয়ায় তাপমাত্রা বাড়ালে সাম্যধ্রুবক Kc-এর মান বৃদ্ধি পায়; এতে বোঝা যায় বিক্রিয়াটি—', 'তাপহারী (Endothermic, ΔH > ০)', ['তাপোৎপাদী (Exothermic, ΔH < ০)', 'Δn = ০ বিশিষ্ট বিক্রিয়া', 'প্রভাবক নির্ভর বিক্রিয়া'], 'ভ্যান্ট হফ সমীকরণ অনুসারে তাপহারী বিক্রিয়ায় তাপমাত্রা বাড়ালে K বাড়ে এবং তাপোৎপাদী বিক্রিয়ায় K কমে।'],
    ['chem1_ch4_equilibrium', 'ph_buffer', '২৫ °C তাপমাত্রায় পানির আয়নিক গুণফল Kw = ১×১০⁻¹⁴ এবং কোনো নির্দিষ্ট ক্ষারীয় দ্রবণে [H⁺] = ১×১০⁻¹¹ M হলে ঐ দ্রবণে [OH⁻] কত?', '১×১০⁻³ M', ['১×১০⁻¹¹ M', '১×১০⁻⁷ M', '১×১০⁻¹⁴ M'], '[OH⁻] = Kw / [H⁺] = ১০⁻¹⁴ / ১০⁻¹¹ = ১০⁻³ M।'],
    ['chem1_ch5_applied', 'ph_buffer', 'দুধ থেকে মাখন (Butter) তৈরির প্রক্রিয়ায় চর্বি কণাগুলোকে একত্রিত করতে কোন ভৌত-রাসায়নিক ঘটনা ঘটে?', 'ইমালশন ভেঙে যাওয়া (Demulsification / Churning)', ['সাবানায়ন', 'পলিমারাইজেশন', 'উর্ধ্বপাতন'], 'দুধকে মন্থন করলে Oil-in-Water ইমালশন ভেঙে Water-in-Oil প্রলেপযুক্ত মাখন আলাদা হয়।'],
    ['chem1_ch5_applied', 'ph_buffer', 'আসকরবিক অ্যাসিড (ভিটামিন C) এবং টোকোফেরল (ভিটামিন E) খাদ্যশিল্পে কী ভূমিকা পালন করে?', 'প্রাকৃতিক অ্যান্টি-অক্সিডেন্ট (জারণ ও র‍্যান্সিডিটি রোধক)', ['কৃত্রিম মিষ্টিকারক', 'জেলিং এজেন্ট', 'রঞ্জক পদার্থ'], 'ভিটামিন E চর্বি-দ্রবণীয় এবং ভিটামিন C পানি-দ্রবণীয় প্রাকৃতিক অ্যান্টি-অক্সিডেন্ট।'],
  ];

  chem1Drills.forEach((d) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: d[0],
        visualLessonId: d[1],
        hscLevel: '11',
        difficulty: 'medical',
        question: d[2],
        correct: d[3],
        distractors: d[4],
        explanation: d[5],
        reference: 'রসায়ন ১ম পত্র · মেডিকেল ও ডেন্টাল স্পেশাল',
      })
    );
  });

  // 6. Quantitative Thermochemistry, Atom Economy, & Multi-step Calculations (50+ MCQs)
  // 6A. Atom Economy Calculations
  const atomEco = [
    { prodM: 46, totalM: 46, name: 'ইথিন + পানি → ইথানল (সংযোজন বিক্রিয়া)' },
    { prodM: 180, totalM: 240, name: 'সালিসাইলিক অ্যাসিড + অ্যাসিটিক অ্যানহাইড্রাইড → অ্যাসপিরিন + অ্যাসিটিক অ্যাসিড' },
    { prodM: 44, totalM: 100, name: 'ক্যালসিয়াম কার্বনেটের তাপীয় বিয়োজনে CO₂ উৎপাদন (বর্জ্য CaO = ৫৬)' },
    { prodM: 56, totalM: 100, name: 'চুনাপাথর (CaCO₃ = ১০০) থেকে কুইক লাইম (CaO = ৫৬) উৎপাদন' },
    { prodM: 64, totalM: 80, name: 'হাইড্রোজেন পারঅক্সাইড ছাড়া গ্রিন অক্সিডেশনে উৎপাদ' },
  ];
  atomEco.forEach((ae) => {
    const pct = Math.round((ae.prodM / ae.totalM) * 100);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${ae.name}" প্রক্রিয়ায় কাঙ্ক্ষিত উৎপাদের আণবিক ভর ${toBnDigits(ae.prodM)} এবং মোট বিক্রিয়কের ভর ${toBnDigits(ae.totalM)} হলে বিক্রিয়াটির অ্যাটম ইকোনমি কত শতাংশ?`,
        correct: `${toBnDigits(pct)}%`,
        distractors: Array.from(new Set([25, 44, 56, 75, 80, 100, 50, 60].filter((x) => x !== pct))).map(
          (x) => `${toBnDigits(x)}%`
        ),
        explanation: `অ্যাটম ইকোনমি = (কাঙ্ক্ষিত উৎপাদের ভর / সকল বিক্রিয়কের মোট ভর) × ১০০% = (${toBnDigits(ae.prodM)} / ${toBnDigits(ae.totalM)}) × ১০০% = ${toBnDigits(pct)}%।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · সবুজ রসায়ন',
      })
    );
  });

  // 6B. Q10 Rate Multiplier Math: Rate increases 2x or 3x per 10°C
  [
    { t1: 20, t2: 40, factor: 2, mult: 4 },
    { t1: 20, t2: 50, factor: 2, mult: 8 },
    { t1: 25, t2: 65, factor: 2, mult: 16 },
    { t1: 30, t2: 80, factor: 2, mult: 32 },
    { t1: 20, t2: 40, factor: 3, mult: 9 },
    { t1: 25, t2: 55, factor: 3, mult: 27 },
    { t1: 10, t2: 70, factor: 2, mult: 64 },
  ].forEach((qm) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `প্রতি ১০ °C তাপমাত্রা বৃদ্ধিতে কোনো রাসায়নিক বিক্রিয়ার হার ${toBnDigits(qm.factor)} গুণ বাড়লে তাপমাত্রা ${toBnDigits(qm.t1)} °C থেকে ${toBnDigits(qm.t2)} °C-এ উন্নীত করলে বিক্রিয়ার বেগ কত গুণ বৃদ্ধি পাবে?`,
        correct: `${toBnDigits(qm.mult)} গুণ`,
        distractors: [
          `${toBnDigits((qm.t2 - qm.t1) / 10)} গুণ`,
          `${toBnDigits(qm.mult * 2)} গুণ`,
          `${toBnDigits(Math.max(2, qm.mult / 2))} গুণ`,
          `${toBnDigits(((qm.t2 - qm.t1) / 10) * qm.factor)} গুণ`,
          `${toBnDigits(qm.mult * 4)} গুণ`,
          `${toBnDigits(qm.mult + 6)} গুণ`,
        ],
        explanation: `তাপমাত্রা বৃদ্ধি ΔT = ${toBnDigits(qm.t2 - qm.t1)} °C। ১০ °C ব্যবধান সংখ্যা n = ${toBnDigits((qm.t2 - qm.t1) / 10)}। অতএব হার বৃদ্ধি = ${toBnDigits(qm.factor)}^${toBnDigits((qm.t2 - qm.t1) / 10)} = ${toBnDigits(qm.mult)} গুণ।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · তাপমাত্রার প্রভাব',
      })
    );
  });

  // 6C. Sigma & Pi Bond Counting Matrix across Famous Molecules (18 MCQs)
  const sigPiMols = [
    { name: 'মিথেন (CH₄)', sig: 4, pi: 0 },
    { name: 'ইথেন (C₂H₆)', sig: 7, pi: 0 },
    { name: 'ইথিন (C₂H₄)', sig: 5, pi: 1 },
    { name: 'ইথাইন / অ্যাসিটিলিন (C₂H₂)', sig: 3, pi: 2 },
    { name: 'প্রোপিন (C₃H₆)', sig: 8, pi: 1 },
    { name: 'বেনজিন (C₆H₆)', sig: 12, pi: 3 },
    { name: 'টলুইন (C₆H₅CH₃)', sig: 15, pi: 3 },
    { name: 'ন্যাপথালিন (C₁₀H₈)', sig: 19, pi: 5 },
    { name: 'হাইড্রোজেন সায়ানাইড (H–C≡N)', sig: 2, pi: 2 },
    { name: 'কার্বন ডাই-অক্সাইড (O=C=O)', sig: 2, pi: 2 },
    { name: 'সায়ানোজেন (N≡C–C≡N)', sig: 3, pi: 4 },
    { name: 'টেট্রাসায়ানোইথিন [(NC)₂C=C(CN)₂]', sig: 9, pi: 9 },
  ];
  sigPiMols.forEach((sp, i) => {
    const others = sigPiMols.filter((x) => x.name !== sp.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${sp.name}" অণুতে মোট কতটি সিগমা (σ) ও পাই (π) বন্ধন উপস্থিত আছে?`,
        correct: `${toBnDigits(sp.sig)}টি σ এবং ${toBnDigits(sp.pi)}টি π বন্ধন`,
        distractors: Array.from(
          new Set(others.map((x) => `${toBnDigits(x.sig)}টি σ এবং ${toBnDigits(x.pi)}টি π বন্ধন`))
        ).slice(0, 4),
        explanation: `${sp.name}-এর গাঠনিক সংকেত বিশ্লেষণে প্রতিটি একক বন্ধন ১টি σ, দ্বিবন্ধন ১টি σ + ১টি π এবং ত্রিবন্ধন ১টি σ + ২টি π নিয়ে মোট ${toBnDigits(sp.sig)}টি σ ও ${toBnDigits(sp.pi)}টি π বন্ধন পাওয়া যায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · সিগমা ও পাই বন্ধন',
      })
    );
  });

  // 6D. Lab Glassware & Chemical Hazard Pictograms Matrix (24 MCQs)
  const hazardSymbols = [
    { sym: 'বৃত্তের ওপর শিখা (Flame over Circle)', meaning: 'জারক পদার্থ (Oxidizing: KMnO₄, HNO₃, H₂O₂)' },
    { sym: 'শুধু আগুনের শিখা (Flame)', meaning: 'দাহ্য পদার্থ (Flammable: ইথার, অ্যাসিটোন, ইথানল)' },
    { sym: 'বিস্ফোরিত বোমা (Exploding Bomb)', meaning: 'বিস্ফোরক পদার্থ (Explosive: পিক্রিক অ্যাসিড, TNT)' },
    { sym: 'মাথার খুলি ও আড়াআড়ি হাড় (Skull & Crossbones)', meaning: 'তীব্র বিষাক্ত পদার্থ (Toxic: KCN, HgCl₂, As₂O₃)' },
    { sym: 'হাত ও ধাতব পাতে ক্ষয় (Corrosion)', meaning: 'ক্ষয়কারক পদার্থ (Corrosive: গাঢ় H₂SO₄, NaOH)' },
    { sym: 'শুকনো গাছ ও মরা মাছ', meaning: 'পরিবেশের জন্য মারাত্মক ক্ষতিকর (Hg, Pb, Cd বর্জ্য)' },
    { sym: 'মানবদেহের বুকে তারকা চিহ্ন (Health Hazard)', meaning: 'কার্সিনোজেন ও দীর্ঘমেয়াদি স্বাস্থ্যঝুঁকি (বেনজিন, ক্রোমেট)' },
    { sym: 'বিস্ময়চিহ্ন (Exclamation Mark !)', meaning: 'স্বল্পমাত্রার বিষ বা ত্বক-চোখ জ্বালাপোড়া সৃষ্টিকারী (Irritant)' },
  ];
  hazardSymbols.forEach((hs, i) => {
    const others = hazardSymbols.filter((x) => x.sym !== hs.sym);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `রাসায়নিক বিকারকের বোতলে "${hs.sym}" নামক GHS হ্যাজার্ড প্রতীকটি কী নির্দেশ করে?`,
        correct: hs.meaning,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.meaning),
        explanation: `GHS মানদণ্ড অনুযায়ী "${hs.sym}" প্রতীকটি ${hs.meaning} নির্দেশ করে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · GHS প্রতীক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${hs.meaning}" শ্রেণির রাসায়নিক দ্রব্যের কন্টেইনারে কোন সতর্কীকরণ চিহ্নটি মুদ্রিত থাকে?`,
        correct: hs.sym,
        distractors: others.slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.sym),
        explanation: `${hs.meaning}-এর জন্য আন্তর্জাতিকভাবে স্বীকৃত প্রতীক হলো ${hs.sym}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · ল্যাব নিরাপত্তা',
      })
    );
  });

  // 6E. Quantum Number Valid/Invalid & Wavelength/Frequency/Energy Quick Calculations (24 MCQs)
  const emRegions = [
    { name: 'মহাজাগতিক ও গামা রশ্মি', range: '< ০.০১ nm (< ০.১ Å)', use: 'ক্যান্সারের টিউমার কোষ ধ্বংস (⁶⁰Co)' },
    { name: 'এক্স-রে (X-ray)', range: '০.০১ – ১০ nm', use: 'হাড় ভাঙা শনাক্ত ও ক্রিস্টালের গঠন নির্ণয়' },
    { name: 'অতিবেগুনি (UV) রশ্মি', range: '১০ – ৩৮০ nm (২৩০–৩৭৫ nm)', use: 'জাল টাকা শনাক্ত, ভিটামিন D সংশ্লেষ ও জীবাণুনাশ' },
    { name: 'দৃশ্যমান আলো (Visible)', range: '৩৮০ – ৭৮০ nm', use: 'বামার সিরিজ ও আলোক-সালোকসংশ্লেষণ' },
    { name: 'অবলোহিত (IR) রশ্মি', range: '৭৮০ nm – ১ mm', use: 'জৈব কার্যকরী মূলক শনাক্ত ও ফিজিওথেরাপি/রিমোট' },
    { name: 'মাইক্রোওয়েভ', range: '১ mm – ১ m', use: 'রাডার, ওয়াই-ফাই ও খাদ্য গরম করা' },
    { name: 'রেডিও তরঙ্গ', range: '> ১ m', use: 'MRI (মেডিকেল ইমেজিং) ও বেতার যোগাযোগ' },
  ];
  emRegions.forEach((em, i) => {
    const others = emRegions.filter((x) => x.name !== em.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `তড়িৎচুম্বকীয় বর্ণালির "${em.name}" অঞ্চলের সাধারণ তরঙ্গদৈর্ঘ্যের পরিসর কোনটি?`,
        correct: em.range,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.range),
        explanation: `${em.name}-এর তরঙ্গদৈর্ঘ্য ${em.range}; প্রধান ব্যবহার: ${em.use}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · তড়িৎচুম্বকীয় বর্ণালি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${em.use}" ক্ষেত্রে তড়িৎচুম্বকীয় বর্ণালির কোন রশ্মি বা তরঙ্গ ব্যবহৃত হয়?`,
        correct: em.name,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.name),
        explanation: `${em.use}-এ ${em.name} (${em.range}) প্রয়োগ করা হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বর্ণালির প্রয়োগ',
      })
    );
  });

  // 6F. Visible Spectrum Color Wavelengths (VIBGYOR) + Enthalpy ΔH = ΔE + ΔnRT (18 MCQs)
  const vibgyor = [
    { color: 'বেগুনি (Violet)', nm: '৩৮০ – ৪২৪ nm' },
    { color: 'নীল বা আসমানি (Indigo/Blue)', nm: '৪২৪ – ৪৯১ nm' },
    { color: 'সবুজ (Green)', nm: '৪৯১ – ৫৭৫ nm' },
    { color: 'হলুদ (Yellow)', nm: '৫৭৫ – ৫৮৫ nm' },
    { color: 'কমলা (Orange)', nm: '৫৮৫ – ৬৪৭ nm' },
    { color: 'লাল (Red)', nm: '৬৪৭ – ৭৮০ nm' },
  ];
  vibgyor.forEach((v, i) => {
    const others = vibgyor.filter((x) => x.color !== v.color);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `দৃশ্যমান আলোর বর্ণালিতে "${v.color}" বর্ণের আলোর তরঙ্গদৈর্ঘ্যের পরিসর কত nm?`,
        correct: v.nm,
        distractors: others.map((x) => x.nm),
        explanation: `VIBGYOR বর্ণালিতে বেগুনির তরঙ্গদৈর্ঘ্য সর্বনিম্ন ও শক্তির পরিমাণ সর্বোচ্চ; আর ${v.color}-এর পরিসর ${v.nm}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · দৃশ্যমান বর্ণালি',
      })
    );
  });

  [
    { rxn: 'C(s) + O₂(g) → CO₂(g)', rel: 'ΔH = ΔE (Δn = ০)' },
    { rxn: 'N₂(g) + 3H₂(g) → 2NH₃(g)', rel: 'ΔH = ΔE − 2RT (ΔH < ΔE)' },
    { rxn: 'PCl₅(g) → PCl₃(g) + Cl₂(g)', rel: 'ΔH = ΔE + RT (ΔH > ΔE)' },
    { rxn: '2SO₂(g) + O₂(g) → 2SO₃(g)', rel: 'ΔH = ΔE − RT (ΔH < ΔE)' },
    { rxn: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)', rel: 'ΔH = ΔE − 2RT (তরল H₂O বিবেচনায় Δn = −২)' },
    { rxn: '2H₂O₂(l) → 2H₂O(l) + O₂(g)', rel: 'ΔH = ΔE + RT (Δn = +১)' },
  ].forEach((th) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${th.rxn} বিক্রিয়ার ক্ষেত্রে এনথালপি পরিবর্তন (ΔH) ও অভ্যন্তরীণ শক্তি পরিবর্তন (ΔE)-এর সঠিক সম্পর্ক কোনটি?`,
        correct: th.rel,
        distractors: [
          'ΔH = ΔE (Δn = ০)',
          'ΔH = ΔE − 2RT (ΔH < ΔE)',
          'ΔH = ΔE + RT (ΔH > ΔE)',
          'ΔH = ΔE − RT (ΔH < ΔE)',
          'ΔH = ΔE + 3RT',
        ],
        explanation: `স্থির চাপে ΔH = ΔE + ΔnRT সূত্র প্রয়োগ করে গ্যাসীয় মোল পার্থক্য Δn বসালে ${th.rel} পাওয়া যায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · ΔH ও ΔE সম্পর্ক',
      })
    );
  });

  return list;
}
