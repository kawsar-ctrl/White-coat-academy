import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredD(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sd_${String(seq++).padStart(4, '0')}`;

  // 1. Ideal Gas Equation PV = nRT Quantitative Problems (~20 MCQs)
  const idealGasCases = [
    { n: 2, tC: 27, v: 24.63, p: 2, gas: 'N₂' },
    { n: 1, tC: 27, v: 8.21, p: 3, gas: 'CO₂' },
    { n: 4, tC: 127, v: 32.84, p: 4, gas: 'O₂' },
    { n: 0.5, tC: 27, v: 12.315, p: 1, gas: 'CH₄' },
    { n: 3, tC: 27, v: 12.315, p: 6, gas: 'H₂' },
  ];
  idealGasCases.forEach((ig) => {
    const tK = ig.tC + 273;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(ig.tC)} °C তাপমাত্রায় ${toBnDigits(ig.v)} লিটার আয়তনের একটি সিলিন্ডারে ${toBnDigits(ig.n)} মোল ${ig.gas} গ্যাস থাকলে (R = ০.০৮২১ L·atm·K⁻¹·mol⁻¹) গ্যাসটির চাপ কত atm?`,
        correct: `${toBnDigits(ig.p)} atm`,
        distractors: [0.5, 1, 2, 3, 4, 6, 8, 12]
          .filter((x) => x !== ig.p)
          .map((x) => `${toBnDigits(x)} atm`),
        explanation: `PV = nRT ⇒ P = (${toBnDigits(ig.n)} × ০.০৮২১ × ${toBnDigits(tK)}) / ${toBnDigits(ig.v)} = ${toBnDigits(ig.p)} atm।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · আদর্শ গ্যাস সমীকরণ',
      })
    );
  });

  // 2. Gas Density Ratio & Molar Mass via d = PM/RT (~12 MCQs)
  const gasDensities = [
    { name: 'SO₂ (M = ৬৪)', m: 64, relHe: 16, relH2: 32 },
    { name: 'CO₂ (M = ৪৪)', m: 44, relHe: 11, relH2: 22 },
    { name: 'O₂ (M = ৩২)', m: 32, relHe: 8, relH2: 16 },
    { name: 'CH₄ (M = ১৬)', m: 16, relHe: 4, relH2: 8 },
    { name: 'N₂ (M = ২৮)', m: 28, relHe: 7, relH2: 14 },
  ];
  gasDensities.forEach((gd) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একই তাপমাত্রা ও চাপে ${gd.name} গ্যাসের ঘনত্ব হিলিয়াম (He, M = ৪) গ্যাসের তুলনায় কত গুণ?`,
        correct: `${toBnDigits(gd.relHe)} গুণ`,
        distractors: [2, 4, 7, 8, 11, 16, 32]
          .filter((x) => x !== gd.relHe)
          .map((x) => `${toBnDigits(x)} গুণ`),
        explanation: `d = PM/(RT) হওয়ায় স্থির T ও P-তে ঘনত্ব আণবিক ভরের সমানুপাতিক; তাই ${toBnDigits(gd.m)} / ৪ = ${toBnDigits(gd.relHe)} গুণ।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের ঘনত্ব',
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
        question: `${gd.name} গ্যাসের বাষ্প ঘনত্ব (Vapour Density = M / 2) কত?`,
        correct: `${toBnDigits(gd.relH2)}`,
        distractors: [4, 8, 14, 16, 22, 28, 32, 64]
          .filter((x) => x !== gd.relH2)
          .map((x) => `${toBnDigits(x)}`),
        explanation: `বাষ্প ঘনত্ব (VD) = আণবিক ভর / ২ = ${toBnDigits(gd.m)} / ২ = ${toBnDigits(gd.relH2)}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · বাষ্প ঘনত্ব',
      })
    );
  });

  // 3. Lewis Acid / Lewis Base & Amphiprotic Classification (18 MCQs)
  const acidBaseTypes = [
    { sp: 'BF₃, AlCl₃, FeCl₃ (অষ্টক অপূর্ণ কেন্দ্রীয় পরমাণু)', cls: 'লুইস অ্যাসিড (ইলেকট্রন জোড় গ্রহীতা)' },
    { sp: 'NH₃, H₂O, R–OH, Cl⁻ (নিঃসঙ্গ ইলেকট্রন জোড় দাতা)', cls: 'লুইস ক্ষারক (ইলেকট্রন জোড় দাতা)' },
    { sp: 'HCO₃⁻, HSO₄⁻, HS⁻, H₂O (প্রোটন দান ও গ্রহণ উভয়েই সক্ষম)', cls: 'উভধর্মী বা অ্যাম্ফিপ্রোটিক (Amphiprotic)' },
    { sp: 'SiCl₄, SnCl₄, Zn²⁺, Cu²⁺ (ফাঁকা d-অরবিটালযুক্ত সত্তা)', cls: 'd-অরবিটালভিত্তিক লুইস অ্যাসিড' },
    { sp: 'HCl, HNO₃, H₂SO₄ (জলীয় দ্রবণে প্রোটন দানকারী)', cls: 'ব্রনস্টেড-লাউরি ও আরহেনিয়াস অ্যাসিড' },
    { sp: 'CH₃NH₂ (মিথান্যামিন) ও পিরিডিন (C₅H₅N)', cls: 'নাইট্রোজেনের নিঃসঙ্গ জোড়যুক্ত লুইস ও ব্রনস্টেড ক্ষারক' },
  ];
  acidBaseTypes.forEach((ab, i) => {
    const others = acidBaseTypes.filter((x) => x.sp !== ab.sp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `অম্ল-ক্ষার মতবাদ অনুযায়ী "${ab.sp}" কোন শ্রেণির অন্তর্ভুক্ত?`,
        correct: ab.cls,
        distractors: others.slice(i % 2, (i % 2) + 4).map((x) => x.cls),
        explanation: `${ab.sp}: ${ab.cls}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · লুইস ও ব্রনস্টেড মতবাদ',
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
        question: `নিচের কোনটি "${ab.cls}"-এর যথাযথ উদাহরণ?`,
        correct: ab.sp,
        distractors: others.slice((i + 1) % 2, ((i + 1) % 2) + 4).map((x) => x.sp),
        explanation: `${ab.cls}-এর আদর্শ উদাহরণ হলো ${ab.sp}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · অম্ল-ক্ষার উদাহরণ',
      })
    );
  });

  // 4. Optical Isomer Count Math (2^n) for Asymmetric Carbons (12 MCQs)
  [
    { n: 1, name: 'ল্যাকটিক অ্যাসিড / ২-বিউটানল', iso: 2 },
    { n: 2, name: '২-ব্রোমো-৩-ক্লোরোবিউটেন (২টি ভিন্ন কাইরাল কেন্দ্র)', iso: 4 },
    { n: 3, name: 'অ্যালডোপেন্টোজ (রাইবোজ/জাইলোজ)', iso: 8 },
    { n: 4, name: 'অ্যালডোহেক্সোজ (খোলা-শিকল গ্লুকোজ)', iso: 16 },
    { n: 5, name: 'আবদ্ধ চাক্রিক α/β-গ্লুকোপাইরানোজ (৫টি কাইরাল C*)', iso: 32 },
  ].forEach((op) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `কোনো অপ্রতিসম জৈব যৌগে (${op.name}) ${toBnDigits(op.n)}টি ভিন্ন কাইরাল কার্বন থাকলে এতে মোট কতটি আলোক সক্রিয় সমানু সম্ভব?`,
        correct: `${toBnDigits(op.iso)}টি`,
        distractors: [2, 3, 4, 6, 8, 12, 16, 24, 32]
          .filter((x) => x !== op.iso)
          .map((x) => `${toBnDigits(x)}টি`),
        explanation: `কোনো যৌগে nটি অসমান বা ভিন্ন কাইরাল কেন্দ্র থাকলে মোট আলোক সক্রিয় সমানু সংখ্যা = 2ⁿ = 2^${toBnDigits(op.n)} = ${toBnDigits(op.iso)}টি।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · আলোক সমানু সংখ্যা',
      })
    );
  });

  // 5. Organic Reactivity Rankings, Aromaticity & Structural Isomer Type Pairs (32 MCQs)
  const organicRankings: Array<{ q: string; a: string; d: [string, string, string]; exp: string }> = [
    {
      q: 'অ্যালকেনের মুক্ত-মূলক (Free radical) প্রতিস্থাপনে হ্যালোজেনসমূহের সক্রিয়তার সঠিক ক্রম কোনটি?',
      a: 'F₂ > Cl₂ > Br₂ > I₂',
      d: ['I₂ > Br₂ > Cl₂ > F₂', 'Cl₂ > F₂ > Br₂ > I₂', 'Br₂ > Cl₂ > F₂ > I₂'],
      exp: 'হ্যালোজেনের সক্রিয়তা F₂-এ বিস্ফোরক মাত্রায় সর্বোচ্চ এবং I₂-তে সর্বনিম্ন ও উভমুখী।',
    },
    {
      q: 'SN2 বিক্রিয়ায় একই অ্যালকাইল গ্রুপের হ্যালাইডগুলোর সক্রিয়তার সঠিক ক্রম কোনটি?',
      a: 'R–I > R–Br > R–Cl > R–F',
      d: ['R–F > R–Cl > R–Br > R–I', 'R–Cl > R–Br > R–I > R–F', 'সব হ্যালাইডের সক্রিয়তা সমান'],
      exp: 'C–I বন্ধন দীর্ঘ ও দুর্বলতম হওয়ায় I⁻ সহজেই লিভিং গ্রুপ হিসেবে অপসারিত হয় (উৎকৃষ্ট লিভিং গ্রুপ)।',
    },
    {
      q: 'SN1 বিক্রিয়ায় অ্যালকাইল হ্যালাইডের সক্রিয়তার সঠিক ক্রম কোনটি?',
      a: '৩° হ্যালাইড > ২° হ্যালাইড > ১° হ্যালাইড > CH₃X',
      d: ['CH₃X > ১° > ২° > ৩°', '১° > ২° > ৩° > CH₃X', '২° > ৩° > ১° > CH₃X'],
      exp: 'SN1 বিক্রিয়ার হার কার্বোক্যাটায়নের স্থায়িত্বের ওপর নির্ভরশীল (৩° > ২° > ১° > CH₃⁺)।',
    },
    {
      q: 'জৈব বিক্রিয়ায় লুকাস বিকারকের সাথে অ্যালকোহলের বিক্রিয়াশীলতার সঠিক ক্রম কোনটি?',
      a: '৩° অ্যালকোহল > ২° অ্যালকোহল > ১° অ্যালকোহল',
      d: ['১° > ২° > ৩°', '২° > ১° > ৩°', 'সবগুলো তাৎক্ষণিক অধঃক্ষেপ দেয়'],
      exp: '৩° অ্যালকোহল সুস্থিত ৩° কার্বোক্যাটায়ন তৈরি করায় কক্ষ তাপমাত্রায় সাথে সাথেই সাদা ঘোলাটে অধঃক্ষেপ দেয়।',
    },
    {
      q: 'জলীয় দ্রবণে ইথাইল অ্যামিনগুলোর ক্ষারকত্বের (Basicity) সঠিক ক্রম কোনটি?',
      a: '(C₂H₅)₂NH (২°) > (C₂H₅)₃N (৩°) > C₂H₅NH₂ (১°) > NH₃',
      d: ['NH₃ > ১° > ২° > ৩°', '৩° > ১° > ২° > NH₃', 'C₆H₅NH₂ > ২° > ১° > NH₃'],
      exp: '+I প্রভাব, স্টেরিক বাধা ও হাইড্রেশন শক্তির মিলিত প্রভাবে জলীয় দ্রবণে ২° ইথাইল অ্যামিন সর্বাধিক ক্ষারকীয়।',
    },
    {
      q: 'নিচের কার্বনিল যৌগগুলোর মধ্যে নিউক্লিওফিলিক সংযোজন বিক্রিয়ায় কোনটির সক্রিয়তা সর্বাধিক?',
      a: 'মিথান্যাল (HCHO) > ইথান্যাল (CH₃CHO) > প্রোপানোন (CH₃COCH₃)',
      d: ['প্রোপানোন > ইথান্যাল > মিথান্যাল', 'ইথান্যাল > প্রোপানোন > মিথান্যাল', 'বেঞ্জোফেনন > অ্যাসিটোন > HCHO'],
      exp: '+I দাতা অ্যালকাইল গ্রুপ বাড়লে কার্বনিল কার্বনের আংশিক ধনাত্মকতা ও স্টেরিক সহজলভ্যতা কমে; তাই HCHO সবচেয়ে সক্রিয়।',
    },
    {
      q: 'বেনজিন বলয়ে ইলেকট্রোফিলিক প্রতিস্থাপন বিক্রিয়ায় কোন যৌগটির সক্রিয়তা বেনজিন অপেক্ষা সর্বাধিক?',
      a: 'ফেনল / অ্যানিলিন (–OH / –NH₂ বলয় সক্রিয়কারী)',
      d: ['নাইট্রোবেনজিন (C₆H₅NO₂)', 'বেনজয়িক অ্যাসিড (C₆H₅COOH)', 'ক্লোরোবেনজিন (C₆H₅Cl)'],
      exp: '–OH ও –NH₂ মূলক +M রেজোন্যান্স প্রভাবে বলয়ের অর্থো ও প্যারা অবস্থানে ইলেকট্রন ঘনত্ব প্রবলভাবে বাড়ায়।',
    },
    {
      q: 'গ্লুকোজ, ইথানল ও ডাইমিথাইল ইথারের মধ্যে স্ফুটনাঙ্কের সঠিক ক্রম কোনটি?',
      a: 'গ্লুকোজ (কঠিন) > ইথানল (৭৮.৩ °C) > ডাইমিথাইল ইথার (−২৪ °C)',
      d: ['ডাইমিথাইল ইথার > ইথানল > গ্লুকোজ', 'ইথানল > গ্লুকোজ > ডাইমিথাইল ইথার', 'ডাইমিথাইল ইথার ও ইথানলের স্ফুটনাঙ্ক সমান'],
      exp: 'ইথানলে আন্তঃআণবিক হাইড্রোজেন বন্ধন থাকায় সমান আণবিক ভরের ইথার অপেক্ষা স্ফুটনাঙ্ক অনেক বেশি।',
    },
    {
      q: 'ইথানল ও ডাইমিথাইল ইথার (CH₃CH₂OH ও CH₃–O–CH₃) পরস্পর কোন ধরনের সমানু?',
      a: 'কার্যকরী মূলক সমানু (Functional group isomers)',
      d: ['চেইন সমানু', 'অবস্থান সমানু', 'মেটামারিজম'],
      exp: 'উভয়ের আণবিক সংকেত C₂H₆O হলেও একটিতে –OH (অ্যালকোহল) ও অন্যটিতে –O– (ইথার) কার্যকরী মূলক রয়েছে।',
    },
    {
      q: 'ডাই-ইথাইল ইথার (C₂H₅–O–C₂H₅) ও মিথাইল প্রোপাইল ইথার (CH₃–O–C₃H₇) পরস্পর কী ধরনের গাঠনিক সমানু?',
      a: 'মেটামার (Metamers)',
      d: ['টটোমার', 'এনানশিওমার', 'ডায়াস্টেরিওমার'],
      exp: 'দ্বিযোজী বা বহুযোজী কার্যকরী মূলকের (–O–, –CO–) দুই পাশে কার্বন শিকলের ভিন্নতার কারণে মেটামারিজম ঘটে।',
    },
    {
      q: 'প্রোপানোন (কিটো রূপ) এবং প্রোপ-১-ইন-২-অল (ইনল রূপ) পরস্পর কোন ধরনের গতিশীল সমানু?',
      a: 'টটোমার (Tautomers / কিটো-ইনল টটোমারিজম)',
      d: ['সিস-ট্রান্স সমানু', 'চেইন সমানু', 'আলোক সমানু'],
      exp: 'α-হাইড্রোজেন ও পাই বন্ধনের ১,৩-স্থানান্তরের ফলে গঠিত গতিশীল সমানুতাকে টটোমারিজম বলে।',
    },
    {
      q: 'কোন যৌগটিতে কার্যকরী মূলক হিসেবে কেবল একটি দ্বিবন্ধন বা ত্রিবন্ধন না থাকলেও অণুটি হাকেল নিয়মে (১০টি π ইলেকট্রন) অ্যারোমেটিক?',
      a: 'ন্যাপথালিন (C₁₀H₈)',
      d: ['সাইক্লোঅক্টাটেট্রাইন (COT, ৮ π e⁻)', 'সাইক্লোবিউটাডাইইন (৪ π e⁻)', 'সাইক্লোহেক্সেন'],
      exp: 'ন্যাপথালিন সমতলীয় অনুবন্ধী দ্বি-চাক্রিক যৌগ যাতে ৪(২)+২ = ১০টি সঞ্চরণশীল π ইলেকট্রন আছে।',
    },
  ];
  organicRankings.forEach((or) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: or.q,
        correct: or.a,
        distractors: or.d,
        explanation: or.exp,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব সক্রিয়তা ও সমানুতা',
      })
    );
  });

  // 6. Beer-Lambert Absorbance (A = ε*c*l) & Dilution V1S1 = V2S2 Quantitative Calculations (~36 MCQs)
  const blCases = [
    { eps: 1000, c: 0.002, l: 1, abs: 2 },
    { eps: 500, c: 0.001, l: 2, abs: 1 },
    { eps: 2500, c: 0.0002, l: 1, abs: 0.5 },
    { eps: 4000, c: 0.0001, l: 2, abs: 0.8 },
    { eps: 1500, c: 0.001, l: 1, abs: 1.5 },
    { eps: 200, c: 0.005, l: 1, abs: 1 },
  ];
  blCases.forEach((bl) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `বিয়ার-ল্যাম্বার্ট সূত্রে কোনো দ্রবণের মোলার শোষণ গুণাঙ্ক ε = ${toBnDigits(bl.eps)} L·mol⁻¹·cm⁻¹, ঘনমাত্রা ${toBnDigits(bl.c)} M এবং কোষের পথদৈর্ঘ্য ${toBnDigits(bl.l)} cm হলে শোষণ মাত্রা (Absorbance, A) কত?`,
        correct: `${toBnDigits(bl.abs)}`,
        distractors: [0.25, 0.4, 0.5, 0.8, 1, 1.5, 2, 3, 4]
          .filter((x) => x !== bl.abs)
          .map((x) => toBnDigits(x)),
        explanation: `A = ε · c · l = ${toBnDigits(bl.eps)} × ${toBnDigits(bl.c)} × ${toBnDigits(bl.l)} = ${toBnDigits(bl.abs)}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · বিয়ার-ল্যাম্বার্ট সূত্র',
      })
    );
  });

  // Dilution V1*S1 = V2*S2
  [
    { v1: 50, s1: 0.4, v2: 200, s2: 0.1 },
    { v1: 100, s1: 0.5, v2: 500, s2: 0.1 },
    { v1: 25, s1: 0.8, v2: 100, s2: 0.2 },
    { v1: 20, s1: 1.0, v2: 400, s2: 0.05 },
    { v1: 40, s1: 0.5, v2: 100, s2: 0.2 },
    { v1: 10, s1: 2.0, v2: 500, s2: 0.04 },
  ].forEach((dl) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(dl.v1)} mL ${toBnDigits(dl.s1)} M HCl দ্রবণে পানি মিশিয়ে মোট আয়তন ${toBnDigits(dl.v2)} mL করলে লঘুকৃত দ্রবণটির মোলারিটি কত হবে?`,
        correct: `${toBnDigits(dl.s2)} M`,
        distractors: [0.02, 0.04, 0.05, 0.1, 0.2, 0.4, 0.5]
          .filter((x) => x !== dl.s2)
          .map((x) => `${toBnDigits(x)} M`),
        explanation: `V₁S₁ = V₂S₂ ⇒ S₂ = (${toBnDigits(dl.v1)} × ${toBnDigits(dl.s1)}) / ${toBnDigits(dl.v2)} = ${toBnDigits(dl.s2)} M।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · লঘুকরণ সূত্র',
      })
    );
  });

  // 7. Gibbs Free Energy ΔG° = -nFE° & Electrochemical Series Spontaneity Checks (~24 MCQs)
  const emfSpontaneity = [
    { rxn: 'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)', eCell: '+1.10 V', n: 2, dg: '−২১২.৩ kJ', spont: 'স্বতঃস্ফূর্ত (ড্যানিয়েল কোষ চলে)' },
    { rxn: 'Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s)', eCell: '+0.46 V', n: 2, dg: '−৮৮.৭৮ kJ', spont: 'স্বতঃস্ফূর্ত (কপার তার Ag⁺ বিজারিত করে)' },
    { rxn: 'Mg(s) + Zn²⁺(aq) → Mg²⁺(aq) + Zn(s)', eCell: '+1.61 V', n: 2, dg: '−৩১০.৭ kJ', spont: 'স্বতঃস্ফূর্ত (Mg Zn²⁺-কে প্রতিস্থাপন করে)' },
    { rxn: 'Fe(s) + Cu²⁺(aq) → Fe²⁺(aq) + Cu(s)', eCell: '+0.78 V', n: 2, dg: '−১৫০.৫ kJ', spont: 'স্বতঃস্ফূর্ত (CuSO₄ দ্রবণ লোহার পাত্রে রাখা যায় না)' },
  ];
  emfSpontaneity.forEach((es) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${es.rxn} কোষ বিক্রিয়ায় n = ${toBnDigits(es.n)} এবং E°cell = ${toBnDigits(es.eCell)} হলে প্রমাণ মুক্ত শক্তি পরিবর্তন ΔG° কত (F = ৯৬,৫০০ C/mol)?`,
        correct: es.dg,
        distractors: ['+২১২.৩ kJ', '−১০০.৫ kJ', '+১৫০.৫ kJ', '−৪২৫.০ kJ', '+৮৮.৭৮ kJ'].filter((x) => x !== es.dg),
        explanation: `ΔG° = −nFE°cell = −${toBnDigits(es.n)} × ৯৬.৫ × ${toBnDigits(es.eCell)} = ${es.dg}; ঋণাত্মক ΔG° হওয়ায় বিক্রিয়াটি ${es.spont}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · কোষের মুক্ত শক্তি',
      })
    );
  });

  // Container storage safety in Electrochemistry
  [
    { sol: 'CuSO₄ দ্রবণ', unsafe: 'লোহার (Fe) বা জিঙ্কের (Zn) পাত্র', safe: 'সিলভার (Ag) বা প্লাটিনাম পাত্র', why: 'Fe ও Zn-এর জারণ বিভব Cu অপেক্ষা বেশি হওয়ায় পাত্র ক্ষয় হয়ে Cu জমা হবে।' },
    { sol: 'AgNO₃ দ্রবণ', unsafe: 'কপার (Cu) বা লোহার (Fe) পাত্র', safe: 'কাচের বা সোনার (Au) পাত্র', why: 'Cu সক্রিয়তা সারিতে Ag-এর ওপরে থাকায় কপার চামচে AgNO₃ নাড়ালে দ্রবণ নীল হয় ও রূপা জমা পড়ে।' },
    { sol: 'ZnSO₄ দ্রবণ', unsafe: 'ম্যাগনেসিয়ামের (Mg) পাত্র', safe: 'কপার (Cu) বা লোহার (Fe) পাত্র', why: 'Fe ও Cu-এর চেয়ে Zn বেশি সক্রিয় বলে Zn²⁺ এরা প্রতিস্থাপন করতে পারে না।' },
    { sol: 'লঘু H₂SO₄ অ্যাসিড', unsafe: 'জিঙ্ক (Zn) বা লোহার (Fe) পাত্র', safe: 'কপার (Cu) বা কাচের পাত্র', why: 'সক্রিয়তা সারিতে H₂-এর নিচে থাকায় Cu লঘু অ্যাসিড থেকে H₂ গ্যাস মুক্ত করে না।' },
  ].forEach((cs) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `তড়িৎ রাসায়নিক সারি অনুযায়ী "${cs.sol}" নিরাপদে সংরক্ষণের জন্য নিচের কোন পাত্রটি উপযুক্ত?`,
        correct: cs.safe,
        distractors: [cs.unsafe, 'সোডিয়াম ধাতুর পাত্র', 'ক্যালসিয়াম ধাতুর পাত্র', 'ম্যাগনেসিয়াম পাত্র'].filter((x) => x !== cs.safe),
        explanation: `${cs.why} তাই ${cs.safe} নিরাপদ।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · পাত্রে দ্রবণ সংরক্ষণ',
      })
    );
  });

  // 8. Primary vs Secondary Standard Substance & Bangladesh Industrial Plants (20 MCQs)
  const primarySecondary = [
    { name: 'অনার্দ্র সোডিয়াম কার্বনেট (Na₂CO₃)', type: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ' },
    { name: 'সোদক অক্সালিক অ্যাসিড (H₂C₂O₄·2H₂O)', type: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ' },
    { name: 'পটাশিয়াম ডাইক্রোমেট (K₂Cr₂O₇)', type: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ' },
    { name: 'কস্টিক সোডা (NaOH) — CO₂ ও জলীয় বাষ্প শোষণকারী', type: 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ' },
    { name: 'পটাশিয়াম পারম্যাঙ্গানেট (KMnO₄) — আলোক/তাপে স্ব-বিয়োজিত', type: 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ' },
    { name: 'সালফিউরিক অ্যাসিড (H₂SO₄) ও হাইড্রোক্লোরিক অ্যাসিড (HCl)', type: 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ' },
  ];
  primarySecondary.forEach((ps, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `আয়তনিক বিশ্লেষণে "${ps.name}" নিচের কোন শ্রেণির প্রমাণ পদার্থ হিসেবে বিবেচিত হয়?`,
        correct: ps.type,
        distractors: [
          ps.type === 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ' ? 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ' : 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ',
          'টারশিয়ারি প্রাইমারি দ্রাবক',
          'স্ব-নির্দেশক ক্ষার',
        ],
        explanation: `${ps.name} হলো একটি ${ps.type}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · স্ট্যান্ডার্ড পদার্থ',
      })
    );
  });

  const econIndustry = [
    { prod: 'বাংলাদেশের প্রথম ও বৃহত্তম কাগজ কল', ans: 'কর্ণফুলী পেপার মিল (চন্দ্রঘোনা — কাঁচামাল বাঁশ ও নরম কাঠ)' },
    { prod: 'বাংলাদেশের প্রাকৃতিক গ্যাসে সালফারের পরিমাণ', ans: 'প্রায় ০% (H₂S < ৪ ppm — মিষ্টি গ্যাস)' },
    { prod: 'ইউরিয়া সারে ক্ষতিকর উপজাত যা সর্বোচ্চ ১.৫%-এর কম রাখতে হয়', ans: 'বাই-ইউরেট (NH₂CONHCONH₂)' },
    { prod: 'বাংলাদেশের প্রধান কয়লা খনি (বিটুমিনাস মানের)', ans: 'বড়পুকুরিয়া কয়লা খনি (দিনাজপুর)' },
    { prod: 'সিমেন্ট উৎপাদনে ঘূর্ণায়মান ভাটিতে (Rotary Kiln) তাপমাত্রা', ans: '১৪০০ – ১৫০০ °C' },
    { prod: 'সিরামিক সামগ্রীর গায়ে চকচকে জলরোধী প্রলেপ দেওয়ার প্রক্রিয়া', ans: 'গ্লেজিং (Glazing — NaCl ও সিলিকা)' },
    { prod: 'হাইড্রোকার্বন থেকে ন্যানো-টিউব ও গ্রাফিন তৈরির উপাদান', ans: 'sp² সংকরিত কার্বন পরমাণু' },
    { prod: 'পানযোগ্য ও শিল্প-বর্জ্য শোধনে ETP-র পূর্ণরূপ', ans: 'Effluent Treatment Plant (বর্জ্য পরিশোধনাগার)' },
  ];
  econIndustry.forEach((ei, i) => {
    const others = econIndustry.filter((x) => x.prod !== ei.prod);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `অর্থনৈতিক রসায়ন পাঠ্যবই অনুযায়ী "${ei.prod}" সংক্রান্ত সঠিক তথ্য কোনটি?`,
        correct: ei.ans,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.ans),
        explanation: `${ei.prod}: ${ei.ans}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · অর্থনৈতিক রসায়ন',
      })
    );
  });

  // 9. Battery Voltages & Electrode Composition Quick Matrix (14 MCQs)
  const batteries = [
    { cell: 'শুষ্ক কোষ বা লেক্ল্যাঞ্চ ড্রাই সেল', volt: '১.৫ V', elec: 'Zn অ্যানোড, MnO₂ + C ক্যাথোড, NH₄Cl + ZnCl₂ পেস্ট' },
    { cell: 'মার্কারি বাটন সেল (ঘড়ি/ক্যালকুলেটর)', volt: '১.৩৫ V (স্থির ভোল্টেজ)', elec: 'Zn-Hg অ্যানোড, HgO পেস্ট ক্যাথোড, KOH' },
    { cell: 'লেড স্টোরেজ (অটোমোবাইল) সেল', volt: 'প্রতি সেল ২.০ V (৬ সেলে ১২ V)', elec: 'Pb অ্যানোড, PbO₂ ক্যাথোড, ৩৮% H₂SO₄' },
    { cell: 'লিথিয়াম-আয়ন রিচার্জেবল সেল', volt: '৩.৬ – ৩.৭ V', elec: 'গ্রাফাইট অ্যানোড, LiCoO₂ ক্যাথোড, LiPF₆ দ্রবণ' },
    { cell: 'হাইড্রোজেন-অক্সিজেন ফুয়েল সেল', volt: '১.২৩ V', elec: 'ছিদ্রযুক্ত কার্বন+Pt তড়িৎদ্বার, গাঢ় KOH/PEM' },
  ];
  batteries.forEach((b, i) => {
    const others = batteries.filter((x) => x.cell !== b.cell);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${b.cell}"-এর তড়িৎ উপাদান (অ্যানোড, ক্যাথোড ও তড়িৎ বিশ্লেষ্য) কোনগুলো?`,
        correct: b.elec,
        distractors: others.map((x) => x.elec),
        explanation: `${b.cell} (${b.volt})-এ ব্যবহৃত হয় ${b.elec}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ব্যাটারি পরিচিতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${b.cell}" থেকে প্রাপ্ত আদর্শ কোষ বিভব (Voltage) কত?`,
        correct: b.volt,
        distractors: others.map((x) => x.volt),
        explanation: `${b.cell}-এর সাধারণ ভোল্টেজ ${b.volt}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · কোষ ভোল্টেজ',
      })
    );
  });

  // 10. Gas Constant R Units & Conversions + Environmental Formulas (12 MCQs)
  const rUnits = [
    { unit: 'লিটার-অ্যাটমোস্ফিয়ার একক (L·atm·K⁻¹·mol⁻¹)', val: '০.০৮২১' },
    { unit: 'SI বা জুল একক (J·K⁻¹·mol⁻¹)', val: '৮.৩১৪' },
    { unit: 'CGS বা আর্গ একক (erg·K⁻¹·mol⁻¹)', val: '৮.৩১৪ × ১০⁷' },
    { unit: 'ক্যালরি একক (cal·K⁻¹·mol⁻¹)', val: '১.৯৮৭ (প্রায় ২.০)' },
  ];
  rUnits.forEach((ru, i) => {
    const others = rUnits.filter((x) => x.unit !== ru.unit);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মোলার গ্যাস ধ্রুবক R-এর মান "${ru.unit}"-এ কত?`,
        correct: ru.val,
        distractors: others.map((x) => x.val),
        explanation: `${ru.unit}-এ সর্বজনীন গ্যাস ধ্রুবক R = ${ru.val}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · R-এর একক ও মান',
      })
    );
  });

  // 11. RMS Speed Temperature Ratio & Graham's Diffusion Rate Math (8 MCQs)
  const rmsCases = [
    { t1C: 27, t2K: 1200, ratio: '২ গুণ', exp: 'T₁ = ৩০০ K এবং T₂ = ১২০০ K; C ∝ √T হওয়ায় √(১২০০/৩০০) = ২ গুণ।' },
    { t1C: 27, t2K: 2700, ratio: '৩ গুণ', exp: 'T₁ = ৩০০ K এবং T₂ = ২৭০০ K; √(২৭০০/৩০০) = √৯ = ৩ গুণ।' },
    { t1C: 127, t2K: 1600, ratio: '২ গুণ', exp: 'T₁ = ৪০০ K এবং T₂ = ১৬০০ K; √(১৬০০/৪০০) = ২ গুণ।' },
    { t1C: -73, t2K: 800, ratio: '২ গুণ', exp: 'T₁ = ২০০ K এবং T₂ = ৮০০ K; √(৮০০/২০০) = ২ গুণ।' },
  ];
  rmsCases.forEach((rc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(rc.t1C)} °C তাপমাত্রা থেকে বাড়িয়ে ${toBnDigits(rc.t2K)} K তাপমাত্রায় নিলে কোনো আদর্শ গ্যাসের অণুগুলোর বর্গমূল গড় বর্গবেগ (C_rms) কত গুণ হবে?`,
        correct: rc.ratio,
        distractors: ['২ গুণ', '৩ গুণ', '৪ গুণ', '৮ গুণ', '৯ গুণ'].filter((x) => x !== rc.ratio),
        explanation: rc.exp,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের গতিবেগ',
      })
    );
  });

  // 12. Volumetric & Redox Equivalent Factor (e-change / n-factor) (10 MCQs)
  const redoxFactors = [
    { sp: 'অম্লীয় মাধ্যমে KMnO₄ (MnO₄⁻ → Mn²⁺)', n: '৫', eq: 'M / ৫' },
    { sp: 'ক্ষারীয় বা প্রশম মাধ্যমে KMnO₄ (MnO₄⁻ → MnO₂)', n: '৩', eq: 'M / ৩' },
    { sp: 'অম্লীয় মাধ্যমে K₂Cr₂O₇ (Cr₂O₇²⁻ → 2Cr³⁺)', n: '৬', eq: 'M / ৬' },
    { sp: 'অম্লীয় মাধ্যমে ফেরাস সালফেট FeSO₄ (Fe²⁺ → Fe³⁺)', n: '১', eq: 'M / ১' },
    { sp: 'অক্সালিক অ্যাসিড H₂C₂O₄ (C₂O₄²⁻ → 2CO₂)', n: '২', eq: 'M / ২' },
    { sp: 'সোডিয়াম থায়োসালফেট Na₂S₂O₃ (2S₂O₃²⁻ → S₄O₆²⁻)', n: '১ (প্রতি মোল Na₂S₂O₃-এ)', eq: 'M / ১' },
  ];
  redoxFactors.forEach((rf, i) => {
    const others = redoxFactors.filter((x) => x.sp !== rf.sp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জারণ-বিজারণ টাইট্রেশনে "${rf.sp}"-এর প্রতি মোলের তুল্য সংখ্যা (বা ইলেকট্রন গ্রহণ/বর্জন সংখ্যা, e) কত?`,
        correct: rf.n,
        distractors: ['১', '২', '৩', '৪', '৫', '৬', '৭'].filter((x) => x !== rf.n && (rf.n.length > 1 || x !== rf.n)),
        explanation: `${rf.sp} বিক্রিয়ায় ইলেকট্রন আদান-প্রদান সংখ্যা ${rf.n}; ফলে এর তুল্য ভর = ${rf.eq}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · রেডক্স টাইট্রেশন ও তুল্য ভর',
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
        question: `মোলার ভর M হলে "${rf.sp}"-এর গ্রাম-তুল্য ভর (Equivalent Mass) কত?`,
        correct: rf.eq,
        distractors: others.map((x) => x.eq).filter((v, idx, arr) => v !== rf.eq && arr.indexOf(v) === idx),
        explanation: `তুল্য ভর = আণবিক ভর / তুল্য সংখ্যা = ${rf.eq}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · গ্রাম-তুল্য ভর',
      })
    );
  });

  // 13. Faraday Electrolysis Deposited Mass & Charge Math (10 MCQs)
  const faradayCases = [
    { ion: 'Ag⁺ (Ag = ১০৮)', q: '১ ফ্যারাডে (৯৬,৫০০ C)', mass: '১০৮ g', exp: 'Ag⁺ + e⁻ → Ag; ১ F তড়িতে ১ মোল অর্থাৎ ১০৮ g রূপা জমা হয়।' },
    { ion: 'Cu²⁺ (Cu = ৬৩.৫)', q: '২ ফ্যারাডে', mass: '৬৩.৫ g', exp: 'Cu²⁺ + 2e⁻ → Cu; ২ F তড়িতে ১ মোল অর্থাৎ ৬৩.৫ g কপার জমা হয়।' },
    { ion: 'Cu²⁺ (Cu = ৬৩.৫)', q: '১ ফ্যারাডে', mass: '৩১.৭৫ g', exp: 'Cu-এর তুল্য ভর ৬৩.৫ / ২ = ৩১.৭৫ g, যা ১ F তড়িতে ক্যাথোডে সঞ্চিত হয়।' },
    { ion: 'Al³⁺ (Al = ২৭)', q: '১ ফ্যারাডে', mass: '৯ g', exp: 'Al-এর তুল্য ভর ২৭ / ৩ = ৯ g; তাই ১ F তড়িতে ৯ g অ্যালুমিনিয়াম জমা হয়।' },
    { ion: 'Al³⁺ (Al = ২৭)', q: '৩ ফ্যারাডে', mass: '২৭ g', exp: 'Al³⁺ + 3e⁻ → Al; ১ মোল (২৭ g) Al জমাতে ৩ F বিদ্যুৎ প্রয়োজন।' },
    { ion: 'Fe³⁺ (Fe = ৫৫.৮)', q: '১ ফ্যারাডে', mass: '১৮.৬ g', exp: 'Fe³⁺ + 3e⁻ → Fe; তুল্য ভর = ৫৫.৮ / ৩ = ১৮.৬ g।' },
    { ion: 'Zn²⁺ (Zn = ৬৫.৪)', q: '১ ফ্যারাডে', mass: '৩২.৭ g', exp: 'Zn²⁺ + 2e⁻ → Zn; তুল্য ভর = ৬৫.৪ / ২ = ৩২.৭ g।' },
    { ion: 'Na⁺ (Na = ২৩)', q: '১ ফ্যারাডে', mass: '২৩ g', exp: 'গলিত NaCl তড়িৎ বিশ্লেষণে ১ F তড়িতে ১ মোল বা ২৩ g Na জমা হয়।' },
  ];
  faradayCases.forEach((fc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `তড়িৎ বিশ্লেষণে ${fc.ion} দ্রবণের মধ্য দিয়ে ${fc.q} বিদ্যুৎ চালনা করলে ক্যাথোডে কত গ্রাম ধাতু সঞ্চিত হবে?`,
        correct: fc.mass,
        distractors: ['৯ g', '১৮.৬ g', '২৩ g', '২৭ g', '৩১.৭৫ g', '৩২.৭ g', '৬৩.৫ g', '১০৮ g'].filter((x) => x !== fc.mass),
        explanation: fc.exp,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের ১ম ও ২য় সূত্র',
      })
    );
  });

  // 14. Essential Organic Named Reactions & Economic Chemistry Constituents (20 MCQs)
  const namedReactions = [
    { rxn: 'উর্টজ বিক্রিয়া (Wurtz Reaction)', info: 'শুষ্ক ইথারে R–X + 2Na → উচ্চতর সম-অ্যালকেন (R–R)' },
    { rxn: 'হফম্যান ক্ষুদ্রাংশকরণ বিক্রিয়া', info: 'R–CONH₂ + Br₂ + 4KOH → ১ কার্বন কমবিশিষ্ট ১° অ্যামিন (R–NH₂)' },
    { rxn: 'ক্লিমেনসন বিজারণ (Clemmensen)', info: 'Zn-Hg ও গাঢ় HCl দ্বারা কার্বনিল (>C=O) গ্রুপ থেকে অ্যালকেন (–CH₂–) গঠন' },
    { rxn: 'রাইমার-টাইম্যান বিক্রিয়া', info: 'ফেনল + CHCl₃ + NaOH (৬০–৭০ °C) → স্যালিসাইল-অ্যালডিহাইড' },
    { rxn: 'কোবে (Kolbe) বিক্রিয়া', info: 'সোডিয়াম ফিনেট + CO₂ (১২৫ °C, ৪–৭ atm) → স্যালিসাইলিক অ্যাসিড' },
    { rxn: 'ক্যানিজারো বিক্রিয়া (Cannizzaro)', info: 'α-হাইড্রোজেনবিহীন অ্যালডিহাইড (HCHO, C₆H₅CHO) + ৫০% NaOH → অ্যালকোহল ও কার্বক্সিলেট লবণ' },
    { rxn: 'অ্যালডল ঘনীভবন (Aldol)', info: 'α-হাইড্রোজেনযুক্ত অ্যালডিহাইড/কিটোন + লঘু NaOH → β-হাইড্রোক্সি অ্যালডিহাইড' },
    { rxn: 'কার্বিল-অ্যামিন পরীক্ষা', info: '১° অ্যামিন + CHCl₃ + KOH (তাপ) → তীব্র দুর্গন্ধযুক্ত আইসোসায়ানাইড (R–NC)' },
    { rxn: 'টলেন বিকারক (অ্যামোনিয়াক্যাল AgNO₃)', info: 'অ্যালডিহাইডের সাথে বিক্রিয়ায় উজ্জ্বল রৌপ্য দর্পণ (Silver mirror) সৃষ্টি করে' },
    { rxn: 'ফেহলিং দ্রবণ (Cu²⁺-টারটারেট জটিল)', info: 'অ্যালিফ্যাটিক অ্যালডিহাইডের সাথে উত্তপ্ত করলে কিউপ্রাস অক্সাইডের (Cu₂O) লাল অধঃক্ষেপ দেয়' },
    { rxn: 'আয়োডোফর্ম পরীক্ষা (I₂ + NaOH)', info: 'CH₃CO– বা CH₃CH(OH)– মূলকযুক্ত যৌগে হলুদ স্ফটিক (CHI₃) অধঃক্ষেপ দেয়' },
    { rxn: 'ফ্রিডেল-ক্রাফ্টস অ্যাসাইলেশন', info: 'অনার্দ্র AlCl₃-এর উপস্থিতিতে বেনজিন + RCOCl → অ্যারাইল কিটোন (C₆H₅COR)' },
  ];
  namedReactions.forEach((nr, i) => {
    const others = namedReactions.filter((x) => x.rxn !== nr.rxn);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জৈব রসায়নের বিখ্যাত "${nr.rxn}"-এর মূল রাসায়নিক রূপান্তর ও বিকারক কোনটি?`,
        correct: nr.info,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.info),
        explanation: `${nr.rxn}: ${nr.info}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · নামকরণকৃত জৈব বিক্রিয়া',
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
        question: `"${nr.info}" — এটি নিচের কোন নামকরণকৃত বিক্রিয়া বা শনাক্তকরণ পরীক্ষার বিবরণ?`,
        correct: nr.rxn,
        distractors: others.slice((i + 2) % 5, ((i + 2) % 5) + 4).map((x) => x.rxn),
        explanation: `${nr.info} দ্বারা ${nr.rxn} নির্দেশিত হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব বিক্রিয়া শনাক্তকরণ',
      })
    );
  });

  // Economic Chemistry Additional High-Yield Matrix (8 MCQs)
  const econExtras = [
    { item: 'পোর্টল্যান্ড সিমেন্টের প্রধান চারটি উপাদানের মধ্যে সর্বাধিক শতকরা হারে থাকে', ans: 'চুন বা ক্যালসিয়াম অক্সাইড (CaO, ৬০–৬৭%)' },
    { item: 'সিমেন্টের দ্রুত জমাট বাঁধা (Flash setting) নিয়ন্ত্রণের জন্য ক্লিংকারের সাথে যোগ করা হয়', ans: '২–৩% জিপসাম (CaSO₄·2H₂O)' },
    { item: 'সাধারণ সোডা-লাইম কাচের প্রধান কাঁচামালসমূহ', ans: 'সিলিকা (SiO₂), সোডা অ্যাশ (Na₂CO₃) ও চুনাপাথর (CaCO₃)' },
    { item: 'ল্যাবরেটরির তাপসহ কাচপাত্র তৈরিতে ব্যবহৃত পাইরেক্স বা বোরোসিলিকেট কাচের উপাদান', ans: 'বোরন ট্রাই-অক্সাইড (B₂O₃) ও SiO₂' },
    { item: 'চামড়া ট্যানিংয়ের জন্য পশুর চামড়ার প্রোটিন কোলাজেনকে স্থায়ী করতে সর্বাধিক ব্যবহৃত হয়', ans: 'বেসিক ক্রোমিয়াম সালফেট [Cr(OH)SO₄]' },
    { item: 'বাংলাদেশের প্রাকৃতিক গ্যাসে মিথেন (CH₄)-এর শতকরা পরিমাণ', ans: 'প্রায় ৯৩% থেকে ৯৮%' },
    { item: 'কার্বনিল পদ্ধতিতে (Mond Process) কয়লা বা প্রাকৃতিক গ্যাস ভিত্তিক ন্যানো/শিল্প ধাতু বিশোধনে কোন ধাতু বিশুদ্ধ করা হয়?', ans: 'নিকেল [Ni(CO)₄ গঠনের মাধ্যমে]' },
    { item: 'কাচ শিল্পে অ্যানিলিং (Annealing) প্রক্রিয়ার মূল উদ্দেশ্য', ans: 'উত্তপ্ত কাচকে ধীরে ধীরে শীতল করে অভ্যন্তরীণ পীড়ন দূর ও ভঙ্গুরতা কমানো' },
  ];
  econExtras.forEach((ee, i) => {
    const others = econExtras.filter((x) => x.item !== ee.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `শিল্প ও অর্থনৈতিক রসায়নে "${ee.item}" কোনটি?`,
        correct: ee.ans,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.ans),
        explanation: `${ee.item}: ${ee.ans}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · শিল্প রসায়ন',
      })
    );
  });

  return list;
}
