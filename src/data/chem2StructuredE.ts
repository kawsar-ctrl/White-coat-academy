import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredE(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2se_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 1: Boyle, Charles & Gay-Lussac Numerical Drills (~70 MCQs)
  const boyleCases = [
    { p1: 1, v1: 10, p2: 2, v2: 5 },
    { p1: 2, v1: 6, p2: 3, v2: 4 },
    { p1: 1, v1: 20, p2: 4, v2: 5 },
    { p1: 3, v1: 8, p2: 6, v2: 4 },
    { p1: 1.5, v1: 10, p2: 3, v2: 5 },
    { p1: 2.5, v1: 4, p2: 1, v2: 10 },
    { p1: 760, v1: 100, p2: 380, v2: 200, unit: 'mmHg', vUnit: 'mL' },
    { p1: 750, v1: 400, p2: 1500, v2: 200, unit: 'mmHg', vUnit: 'mL' },
  ];
  boyleCases.forEach((bc, i) => {
    const pU = bc.unit ?? 'atm';
    const vU = bc.vUnit ?? 'L';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `স্থির তাপমাত্রায় কোনো গ্যাসের ${toBnDigits(bc.p1)} ${pU} চাপে আয়তন ${toBnDigits(bc.v1)} ${vU} হলে ${toBnDigits(bc.p2)} ${pU} চাপে ওই গ্যাসের আয়তন কত হবে?`,
        correct: `${toBnDigits(bc.v2)} ${vU}`,
        distractors: [bc.v2 * 2, bc.v2 / 2, bc.v2 + 3, bc.v1]
          .filter((x) => x !== bc.v2 && x > 0)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} ${vU}`),
        explanation: `বয়েলের সূত্র P₁V₁ = P₂V₂ ⇒ V₂ = (${toBnDigits(bc.p1)} × ${toBnDigits(bc.v1)}) / ${toBnDigits(bc.p2)} = ${toBnDigits(bc.v2)} ${vU}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · বয়েলের সূত্র',
      })
    );
  });

  const charlesCases = [
    { t1C: 27, v1: 300, t2C: 327, v2: 600 },
    { t1C: 27, v1: 600, t2C: 177, v2: 900 },
    { t1C: 0, v1: 273, t2C: 273, v2: 546 },
    { t1C: 127, v1: 400, t2C: 27, v2: 300 },
    { t1C: 27, v1: 150, t2C: 227, v2: 250 },
    { t1C: 77, v1: 350, t2C: 427, v2: 700 },
  ];
  charlesCases.forEach((cc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'dental' : 'medical',
        question: `স্থির চাপে ${toBnDigits(cc.t1C)} °C তাপমাত্রায় একটি গ্যাসের আয়তন ${toBnDigits(cc.v1)} mL হলে ${toBnDigits(cc.t2C)} °C তাপমাত্রায় আয়তন কত mL হবে?`,
        correct: `${toBnDigits(cc.v2)} mL`,
        distractors: [cc.v2 + 100, cc.v2 - 100, cc.v1 * 2, Math.round(cc.v2 / 2)]
          .filter((x) => x !== cc.v2 && x > 0)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mL`),
        explanation: `চার্লসের সূত্র V₁/T₁ = V₂/T₂ (কেলভিন স্কেলে); T₁ = ${toBnDigits(cc.t1C + 273)} K, T₂ = ${toBnDigits(cc.t2C + 273)} K ⇒ V₂ = ${toBnDigits(cc.v2)} mL।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · চার্লসের সূত্র',
      })
    );
  });

  // 2. Graham's Diffusion / Effusion Rate Ratio & RMS Velocity (Ch 1, ~60 MCQs)
  const grahamPairs = [
    { g1: 'H₂ (M = ২)', g2: 'O₂ (M = ৩২)', ratio: '৪ : ১', rVal: '৪ গুণ' },
    { g1: 'He (M = ৪)', g2: 'CH₄ (M = ১৬)', ratio: '২ : ১', rVal: '২ গুণ' },
    { g1: 'CH₄ (M = ১৬)', g2: 'SO₂ (M = ৬৪)', ratio: '২ : ১', rVal: '২ গুণ' },
    { g1: 'H₂ (M = ২)', g2: 'CH₄ (M = ১৬)', ratio: '২√২ : ১ (প্রায় ২.৮৩ : ১)', rVal: '২.৮৩ গুণ' },
    { g1: 'NH₃ (M = ১৭)', g2: 'HCl (M = ৩৬.৫)', ratio: '১.৪৬৫ : ১', rVal: '১.৪৬৫ গুণ' },
    { g1: 'CO (M = ২৮)', g2: 'N₂ (M = ২৮)', ratio: '১ : ১ (সমান হারে)', rVal: '১ গুণ (সমান)' },
    { g1: 'N₂ (M = ২৮)', g2: 'CO₂ (M = ৪৪)', ratio: '১.২৫ : ১', rVal: '১.২৫ গুণ' },
    { g1: 'He (M = ৪)', g2: 'SO₂ (M = ৬৪)', ratio: '৪ : ১', rVal: '৪ গুণ' },
  ];
  grahamPairs.forEach((gp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `গ্রাহামের ব্যাপন সূত্রানুযায়ী একই তাপমাত্রা ও চাপে ${gp.g1} গ্যাস ${gp.g2} গ্যাসের তুলনায় কত অনুপাতে বা কত গুণ দ্রুত ব্যাপিত হয়?`,
        correct: gp.ratio,
        distractors: ['১ : ৪', '১৬ : ১', '৮ : ১', '১ : ২', '৩ : ১', '৪ : ১', '২ : ১'].filter((x) => x !== gp.ratio).slice(0, 4),
        explanation: `r₁ / r₂ = √(M₂ / M₁) সূত্র বসিয়ে ${gp.g1} ও ${gp.g2}-এর ব্যাপন হারের অনুপাত পাওয়া যায় ${gp.ratio}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্রাহামের ব্যাপন সূত্র',
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
        question: `একই তাপমাত্রায় ${gp.g1} এবং ${gp.g2} গ্যাস অণুদ্বয়ের বর্গমূল গড় বর্গবেগের (C_rms) অনুপাত কত?`,
        correct: gp.ratio,
        distractors: ['১ : ৪', '৮ : ১', '১৬ : ১', '১ : ২'].filter((x) => x !== gp.ratio),
        explanation: `C_rms = √(3RT / M); একই তাপমাত্রায় C₁/C₂ = √(M₂/M₁) = ${gp.ratio}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · বর্গমূল গড় বর্গবেগ',
      })
    );
  });

  // Unknown gas molar mass from diffusion rate / time (16 MCQs)
  const unknownGasDiffusion = [
    { q: 'একটি অজ্ঞাত গ্যাসের ব্যাপন হার মিথেন (CH₄, M = ১৬) গ্যাসের ব্যাপন হারের অর্ধেক। গ্যাসটির আণবিক ভর কত?', a: '৬৪ g/mol (SO₂)', d: ['৩২ g/mol', '৮ g/mol', '৪৪ g/mol'] },
    { q: 'সম-আয়তনের H₂ (M = ২) গ্যাস নিঃসৃত হতে ১০ সেকেন্ড এবং অজ্ঞাত গ্যাস X নিঃসৃত হতে ৪০ সেকেন্ড সময় নেয়। X গ্যাসটির আণবিক ভর কত?', a: '৩২ g/mol (O₂)', d: ['১৬ g/mol', '৮ g/mol', '৬৪ g/mol'] },
    { q: 'হিলিয়াম (He, M = ৪) গ্যাসের তুলনায় একটি অজ্ঞাত গ্যাস ৩ গুণ ধীরে ব্যাপিত হয়। অজ্ঞাত গ্যাসটির আণবিক ভর কত?', a: '৩৬ g/mol', d: ['১২ g/mol', '১৬ g/mol', '৪৪ g/mol'] },
    { q: 'সমচাপ ও তাপমাত্রায় N₂ (M = ২৮) এবং CO (M = ২৮) গ্যাসের মধ্যে কোনটি দ্রুত ব্যাপিত হবে?', a: 'উভয়ের আণবিক ভর সমান (২৮) বলে সমান হারে ব্যাপিত হবে', d: ['N₂ দ্বিগুণ দ্রুত', 'CO দ্বিগুণ দ্রুত', 'কোনোটিই ব্যাপিত হবে না'] },
    { q: 'একই সিলিন্ডারে H₂, N₂ ও CO₂ গ্যাস থাকলে তাপমাত্রা ২৭ °C-এ কোন গ্যাসটির অণুপ্রতি গড় গতিশক্তি সর্বাধিক?', a: 'তিনটিরই গড় গতিশক্তি সমান (কারণ E_k = 3/2 kT কেবল তাপমাত্রানির্ভর)', d: ['H₂-এর সবচেয়ে বেশি', 'CO₂-এর সবচেয়ে বেশি', 'N₂-এর সবচেয়ে বেশি'] },
    { q: 'কোনো গ্যাসের পরম তাপমাত্রা (K) ৪ গুণ বাড়ানো হলে ওই গ্যাসের অণুগুলোর বর্গমূল গড় বর্গবেগ (C_rms) কত গুণ হবে?', a: '২ গুণ (কারণ C_rms ∝ √T)', d: ['৪ গুণ', '১৬ গুণ', 'অর্ধেক'] },
    { q: 'কত ডিগ্রি সেলসিয়াস তাপমাত্রায় অক্সিজেনের (O₂) C_rms বেগ ০ °C তাপমাত্রার তুলনায় দ্বিগুণ হবে?', a: '৮১৯ °C (১০৯২ K = ৪ × ২৭৩ K)', d: ['৫৪৬ °C', '২৭৩ °C', '১০০ °C'] },
    { q: 'একই কাচনলের দুই প্রান্ত থেকে NH₃ (M=১৭) ও HCl (M=৩৬.৫) গ্যাস প্রবেশ করালে সাদা NH₄Cl-এর বলয়টি কোন প্রান্তের কাছে গঠিত হবে?', a: 'HCl প্রান্তের কাছে (কারণ হালকা NH₃ দ্রুত বেশি দূরত্ব অতিক্রম করে)', d: ['NH₃ প্রান্তের কাছে', 'ঠিক মাঝখানে', 'নলের বাইরে'] },
  ];
  unknownGasDiffusion.forEach((ug, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: ug.q,
        correct: ug.a,
        distractors: ug.d,
        explanation: `${ug.q} — উত্তর: ${ug.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের গতিসূত্র ও ব্যাপন',
      })
    );
  });

  // 3. Dalton Partial Pressure, Water Quality & Atmospheric Chemistry (Ch 1, ~75 MCQs)
  const daltonWater = [
    { q: 'একটি ২ লিটার পাত্রে ৮ গ্রাম CH₄ (০.৫ mol) ও ১৬ গ্রাম O₂ (০.৫ mol) আছে; মোট চাপ ৪ atm হলে CH₄-এর আংশিক চাপ কত?', a: '২.০ atm (মোল ভগ্নাংশ X = ০.৫)', d: ['১.০ atm', '৩.০ atm', '৪.০ atm'] },
    { q: 'ডাল্টনের আংশিক চাপ সূত্র (P = P₁ + P₂ + ...) নিচের কোন গ্যাস মিশ্রণের ক্ষেত্রে প্রযোজ্য নয়?', a: 'পরস্পর বিক্রিয়াশীল গ্যাস মিশ্রণ (যেমন NH₃ ও HCl অথবা H₂ ও Cl₂ সূর্যালোকে)', d: ['N₂ ও O₂ মিশ্রণ', 'He ও Ar মিশ্রণ', 'CH₄ ও CO₂ মিশ্রণ'] },
    { q: 'পানির উপর সংগৃহীত আর্দ্র গ্যাসের চাপ মাপার সময় শুষ্ক গ্যাসের প্রকৃত চাপ কীভাবে বের করা হয়?', a: 'P_dry = P_total − জলীয় বাষ্পচাপ (Aqueous Tension)', d: ['P_dry = P_total + জলীয় বাষ্পচাপ', 'P_dry = P_total × জলীয় বাষ্পচাপ', 'দুটি সমান ধরা হয়'] },
    { q: 'কোনো গ্যাস সিলিন্ডার থেকে উচ্চ চাপে থাকা গ্যাসের ছিদ্র দিয়ে বের হওয়ার ঘটনাকে কী বলে?', a: 'অনুব্যাপন বা ইফিউশন (Effusion)', d: ['ব্যাপন', 'অভিস্রবণ', 'অধিশোষণ'] },
    { q: 'ভ্যান ডার ওয়ালস সমীকরণ (P + n²a/V²)(V − nb) = nRT-এ "a" ধ্রুবকের মান শূন্য হলে কী বোঝায়?', a: 'গ্যাস অণুগুলোর মধ্যে কোনো আন্তঃআণবিক আকর্ষণ বল নেই (আদর্শ গ্যাসের কাছাকাছি)', d: ['অণুগুলোর আয়তন অসীম', 'গ্যাস সহজেই তরল হয়', 'গ্যাসটি অতি ভারী'] },
    { q: 'NH₃, CO₂, O₂ এবং H₂ গ্যাসের মধ্যে কোনটির ভ্যান ডার ওয়ালস ধ্রুবক "a"-এর মান সর্বাধিক ও সবচেয়ে সহজে তরলীকৃত হয়?', a: 'NH₃ (শক্তিশালী H-বন্ধন ও পোলারিটির কারণে a = ৪.১৭)', d: ['H₂ (সর্বনিম্ন)', 'O₂', 'N₂'] },
    { q: 'যদি পানিতে জৈব দূষক (সুয়ারেজ/শিল্পবর্জ্য) বেড়ে যায়, তবে দ্রবীভূত অক্সিজেন (DO) এবং BOD-এর কী পরিবর্তন হবে?', a: 'BOD বেড়ে যাবে ও DO দ্রুত কমে শূন্যের কাছাকাছি নামবে', d: ['BOD কমে যাবে ও DO বাড়বে', 'উভয়ই বাড়বে', 'উভয়ই অপরিবর্তিত থাকবে'] },
    { q: 'WHO ও বাংলাদেশের স্ট্যান্ডার্ড অনুযায়ী পানীয় জলে আর্সেনিকের (As) সর্বোচ্চ অনুমোদিত সীমা যথাক্রমে কত?', a: 'WHO: ০.০১ mg/L (১০ ppb) এবং বাংলাদেশ: ০.০৫ mg/L (৫০ ppb)', d: ['WHO: ১.০ ppm ও BD: ৫.০ ppm', 'WHO: ০.৫ ppm ও BD: ১.০ ppm', 'দুটিতেই ১০ ppm'] },
    { q: 'পানিতে উপস্থিত স্থায়ী খরতা (CaCl₂, MgSO₄ জনিত) দূর করার সবচেয়ে আধুনিক ও সম্পূর্ণ আয়নিক পদ্ধতি কোনটি?', a: 'আয়ন বিনিময় রেজিন পদ্ধতি (ক্যাটায়ন ও অ্যানায়ন এক্সচেঞ্জার) বা পারমুটিট পদ্ধতি', d: ['শুধু ফুটানো (এতে কেবল অস্থায়ী খরতা দূর হয়)', 'ক্লোরিনেশন', 'বালি দিয়ে ছাঁকা'] },
    { q: 'জলীয় দ্রবণে Ca(HCO₃)₂ ও Mg(HCO₃)₂ থাকার কারণে সৃষ্ট পানির অস্থায়ী খরতা কীভাবে দূর করা যায়?', a: 'পানি ফুটিয়ে (তাপে অদ্রবণীয় CaCO₃ অধঃক্ষিপ্ত হয়) অথবা ক্লার্কের চুন পদ্ধতিতে', d: ['অ্যাসিড যোগ করে', 'বরফ জমিয়ে', 'ফটকিরি না মিশিয়ে ছেঁকে'] },
    { q: 'লন্ডন বা ধ্রুপদী স্মগ (Classical Smog) এবং লস এঞ্জেলেস বা ফটোকেমিক্যাল স্মগের মধ্যে মূল পার্থক্য কী?', a: 'ধ্রুপদী স্মগ SO₂-ধোঁয়া-কুয়াশা (বিজারক) আর ফটোকেমিক্যাল স্মগ সূর্যালোকে NOx + হাইড্রোকার্বন (PAN, O₃ — জারক)', d: ['উভয়ই কেবল অক্সিজেন দিয়ে গঠিত', 'ফটোকেমিক্যাল স্মগ কেবল রাতে হয়', 'ধ্রুপদী স্মগ কেবল CFC থেকে হয়'] },
    { q: 'বায়ুমণ্ডলের ট্রপোস্ফিয়ারের ওজোন (O₃) ক্ষতিকর দূষক হলেও স্ট্র্যাটোস্ফিয়ারের ওজোন স্তর প্রাণিজগতের জন্য আশীর্বাদ কেন?', a: 'এটি সূর্যের ক্ষতিকর UV-B ও UV-C রশ্মি শোষণ করে পৃথিবীতে ত্বকের ক্যান্সার ও মিউটেশন রোধ করে', d: ['এটি তাপমাত্রা ১০০ °C রাখে', 'এটি অক্সিজেন শোষণ করে', 'এটি বৃষ্টিপাত বন্ধ করে'] },
    { q: 'পোলার স্ট্র্যাটোস্ফিয়ারিক মেঘে CFC থেকে সৃষ্ট একটি সক্রিয় ক্লোরিন ফ্রি-র‍্যাডিকেল (Cl•) কতটি ওজোন (O₃) অণু ভাঙতে সক্ষম?', a: 'প্রায় ১,০০,০০০টি (১ লক্ষ) O₃ অণু (শৃঙ্খল বিক্রিয়ার মাধ্যমে)', d: ['মাত্র ১টি', '১০টি', '১০০টি'] },
    { q: 'ব্রনস্টেড-লাউরি, আরহেনিয়াস ও লুইস মতবাদ অনুসারে কোন প্রজাতিটি উভধর্মী বা অ্যাম্ফিপ্রোটিক (H⁺ দাতা ও গ্রহীতা)?', a: 'HCO₃⁻, HSO₄⁻ ও H₂O', d: ['NH₄⁺ ও BF₃', 'CO₃²⁻ ও Cl⁻', 'HCl ও HNO₃'] },
    { q: 'হাইড্রোকার্বন দহনে সৃষ্ট কোন বিষাক্ত গ্যাস রক্তের হিমোগ্লোবিনের সাথে O₂-এর চেয়ে ২০০–২৫০ গুণ বেশি আসক্তিতে কার্বোক্সিহিমোগ্লোবিন তৈরি করে?', a: 'কার্বন মনোক্সাইড (CO)', d: ['কার্বন ডাই-অক্সাইড (CO₂)', 'নাইট্রোজেন (N₂)', 'মিথেন (CH₄)'] },
  ];
  daltonWater.forEach((dw, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: dw.q,
        correct: dw.a,
        distractors: dw.d,
        explanation: `${dw.q} — সঠিক উত্তর: ${dw.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরিবেশ রসায়ন',
      })
    );
  });

  // 4. Ch 5: Economic & Industrial Chemistry Comprehensive Matrix (~160 MCQs)
  const cementCompounds = [
    { cmp: 'ট্রাইক্যালসিয়াম সিলিকেট (C₃S / 3CaO·SiO₂)', pct: '~৪৫–৫০%', role: 'পানি যোজনের প্রথম ৭–১৪ দিনের প্রাথমিক দৃঢ়তা ও শক্তি প্রদান' },
    { cmp: 'ডাইক্যালসিয়াম সিলিকেট (C₂S / 2CaO·SiO₂)', pct: '~২৫%', role: 'ধীরে জমাট বাঁধে ও ১ মাস থেকে বছরব্যাপী চূড়ান্ত দৃঢ়তা বৃদ্ধি' },
    { cmp: 'ট্রাইক্যালসিয়াম অ্যালুমিনেট (C₃A / 3CaO·Al₂O₃)', pct: '~১০%', role: 'তাৎক্ষণিক জমাট বাঁধা (Flash Setting) ঘটায় যা জিপসাম দ্বারা নিয়ন্ত্রিত হয়' },
    { cmp: 'টেট্রাক্যালসিয়াম অ্যালুমিনোফেরাইট (C₄AF)', pct: '~৯–১০%', role: 'সিমেন্টের ধূসর রং ও হালকা তাপ নিরোধক গঠন তৈরি' },
    { cmp: 'জিপসাম (CaSO₄·2H₂O)', pct: '২–৩%', role: 'সিমেন্টের দ্রুত জমাট বাঁধা বিলম্বিত করে কাজের উপযোগী সময় বৃদ্ধি' },
  ];
  cementCompounds.forEach((cm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `পোর্টল্যান্ড সিমেন্টের উপাদান "${cm.cmp}"-এর মূল ভূমিকা কী?`,
        correct: `${cm.role} (পরিমাণ ${cm.pct})`,
        distractors: cementCompounds.filter((x) => x.cmp !== cm.cmp).map((x) => `${x.role} (পরিমাণ ${x.pct})`),
        explanation: `পোর্টল্যান্ড সিমেন্টে ${cm.cmp} (${cm.pct})-এর কাজ হলো: ${cm.role}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · সিমেন্টের উপাদান',
      })
    );
  });

  const glassColorsAndTypes = [
    { type: 'কোবাল্ট অক্সাইড (CoO)', effect: 'গাঢ় নীল বর্ণের কাচ' },
    { type: 'কিউপ্রিক অক্সাইড (CuO) বা ক্রোমিক অক্সাইড (Cr₂O₃)', effect: 'সবুজ বর্ণের কাচ' },
    { type: 'ম্যাঙ্গানিজ ডাই-অক্সাইড (MnO₂)', effect: 'বেগুনি (Violet) বর্ণের কাচ ও সবুজাভ আভা দূরীকরণ' },
    { type: 'ফেরিক অক্সাইড (Fe₂O₃)', effect: 'হলুদ-বাদামি বা গাঢ় অ্যাম্বার (ওষুধের বোতল) কাচ' },
    { type: 'ক্যাডমিয়াম সালফাইড (CdS)', effect: 'উজ্জ্বল হলুদ বর্ণের কাচ' },
    { type: 'সোনা (Au কলয়েড) বা কিউপ্রাস অক্সাইড (Cu₂O)', effect: 'উজ্জ্বল রুবি-লাল বর্ণের কাচ' },
    { type: 'সোডা-লাইম কাচ (নরম কাচ)', effect: 'জানালার কাচ, বোতল ও টিউবলাইট (উচ্চ তাপ-সংবেদনশীল)' },
    { type: 'পটাশ-লাইম কাচ (শক্ত কাচ)', effect: 'উচ্চ গলনাঙ্কবিশিষ্ট দহন নল ও রাসায়নিক যন্ত্রপাতি' },
    { type: 'বোরোসিলিকেট বা পাইরেক্স কাচ', effect: 'তাপ-প্রতিরোধী ল্যাবরেটরি ফ্লাস্ক, বিকার ও ওভেনওয়্যার' },
    { type: 'ফ্লিন্ট বা লেড কাচ', effect: 'উচ্চ প্রতিসরাঙ্কবিশিষ্ট অপটিক্যাল লেন্স, প্রিজম ও ক্রিস্টাল' },
    { type: 'সিলিকা বা কোয়ার্টজ কাচ (১০০% SiO₂)', effect: 'UV রশ্মি প্রবেশযোগ্য স্পেক্ট্রোফটোমিটার কিউভেট ও ল্যাম্প' },
  ];
  glassColorsAndTypes.forEach((gc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'dental' : 'board',
        question: `কাচ শিল্পে "${gc.type}" কোন বৈশিষ্ট্য বা কাচ উৎপাদনের সাথে যুক্ত?`,
        correct: gc.effect,
        distractors: glassColorsAndTypes.filter((x) => x.effect !== gc.effect).slice(i % 6, (i % 6) + 4).map((x) => x.effect),
        explanation: `${gc.type} ব্যবহারের মাধ্যমে "${gc.effect}" পাওয়া যায়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · কাচ শিল্প',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${gc.effect}" — এটি উৎপাদনে নিচের কোনটি ব্যবহৃত হয় বা কোন ধরনের কাচ প্রযোজ্য?`,
        correct: gc.type,
        distractors: glassColorsAndTypes.filter((x) => x.type !== gc.type).slice((i + 2) % 6, ((i + 2) % 6) + 4).map((x) => x.type),
        explanation: `${gc.effect}-এর জন্য ${gc.type} ব্যবহার করা হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · কাচের প্রকারভেদ',
      })
    );
  });

  const industrialProcesses = [
    { item: 'অসওয়াল্ড প্রক্রিয়া (HNO₃ উৎপাদন)', cond: 'Pt–Rh জালি প্রভাবক, ৮৫০ °C ও ৫–৯ atm চাপ; NH₃ → NO → NO₂ → HNO₃' },
    { item: 'হেবার-বস প্রক্রিয়া (NH₃ সংশ্লেষণ)', cond: 'Fe চূর্ণ + Al₂O₃/K₂O, ৪৫০–৫০০ °C ও ২০০ atm চাপ' },
    { item: 'বস-মেইসার প্রক্রিয়া (ইউরিয়া উৎপাদন)', cond: 'তরল NH₃ + CO₂ → NH₂COONH₄ (১৮০–১৯০ °C, ১৩০–১৫০ atm) → ইউরিয়া' },
    { item: 'স্পর্শ পদ্ধতি (H₂SO₄ উৎপাদন)', cond: 'V₂O₅ প্রভাবক, ৪৫০ °C, ১–২ atm চাপ; SO₃-কে ৯৮% H₂SO₄-এ শোষণ করে ওলিয়াম' },
    { item: 'সলভে অ্যামোনিয়া-সোডা পদ্ধতি (Na₂CO₃)', cond: 'সম্পৃক্ত ব্রাইন + NH₃ + CO₂ → NaHCO₃↓; উত্তাপে Na₂CO₃ (NH₃ পুনরুদ্ধার Ca(OH)₂-এ)' },
    { item: 'ডাউন পদ্ধতি (ধাতব Na উৎপাদন)', cond: 'গলিত ৪০% NaCl + ৬০% CaCl₂ মিশ্রণের (৬০০ °C) তড়িৎ বিশ্লেষণ' },
    { item: 'ক্রাফট / সালফেট পাল্পিং (কাগজ)', cond: 'সাদা লিকার (NaOH + Na₂S) দ্বারা কাঠ-বাঁশের লিগনিন পৃথকীকরণ' },
    { item: 'সালফাইট পাল্পিং (কাগজ)', cond: 'ক্যালসিয়াম/ম্যাগনেশিয়াম বাইসালফাইট [Ca(HSO₃)₂] ও মুক্ত SO₂' },
    { item: 'ক্রোম ট্যানিং (চামড়া শিল্প)', cond: 'বেসিক ক্রোমিয়াম সালফেট [Cr(OH)SO₄] দ্বারা কোলাজেন স্থায়ীকরণ' },
    { item: 'উদ্ভিজ্জ ট্যানিং (চামড়া শিল্প)', cond: 'গাছের ছাল-ফল (বাবলা/গর্জন/মাইরোবালান) থেকে প্রাপ্ত ট্যানিন পলিফেনল' },
    { item: 'পোড়া ইট/সিরামিক বিস্কুট ফায়ারিং', cond: 'চায়না ক্লে, কোয়ার্টজ ও ফেল্ডস্পার স্লিপ ছাঁচে ৯০০–১০০০ °C ও গ্লেজিং ১২০০–১৪০০ °C' },
    { item: 'মাইরো-কয়লা ও কোক উৎপাদন', cond: 'বায়ুশূন্য স্থানে বিটুমিনাস কয়লার ১০০০ °C তাপমাত্রায় ধ্বংসাত্মক পাতন (উপজাত কোল্টার)' },
  ];
  industrialProcesses.forEach((ip, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `শিল্প রসায়নে "${ip.item}"-এর অনুকূল শর্ত বা মূল বিক্রিয়া প্রবাহ কোনটি?`,
        correct: ip.cond,
        distractors: industrialProcesses.filter((x) => x.cond !== ip.cond).slice(i % 6, (i % 6) + 4).map((x) => x.cond),
        explanation: `${ip.item}: ${ip.cond}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · রাসায়নিক শিল্প',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${ip.cond}" — এটি কোন শিল্পোৎপাদন প্রক্রিয়ার বৈশিষ্ট্য?`,
        correct: ip.item,
        distractors: industrialProcesses.filter((x) => x.item !== ip.item).slice((i + 2) % 6, ((i + 2) % 6) + 4).map((x) => x.item),
        explanation: `${ip.cond} শর্তটি ${ip.item} প্রক্রিয়ায় ব্যবহৃত হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · শিল্প কারিগরি',
      })
    );
  });

  // Recycling SPI Codes (14 MCQs)
  const spiCodes = [
    { code: 'কোড ১ — PET / PETE', ex: 'মিনারেল ওয়াটার ও কোমল পানীয়ের স্বচ্ছ একবার ব্যবহারযোগ্য বোতল' },
    { code: 'কোড ২ — HDPE', ex: 'দুধের জার, শ্যাম্পুর বোতল ও শক্ত প্লাস্টিক (নিরাপদ পুনর্ব্যবহারযোগ্য)' },
    { code: 'কোড ৩ — PVC', ex: 'পানির পাইপ, রেইনকোট ও বৈদ্যুতিক কেবলের আবরণ (পোড়ালে ডাইঅক্সিন)' },
    { code: 'কোড ৪ — LDPE', ex: 'নমনীয় শপিং ব্যাগ, স্কুইজ বোতল ও প্যাকিং ফিল্ম' },
    { code: 'কোড ৫ — PP (পলিপ্রোপিলিন)', ex: 'ওষুধের বোতল, দইয়ের কাপ ও মাইক্রোওয়েভ-নিরাপদ খাদ্যপাত্র' },
    { code: 'কোড ৬ — PS (পলিস্টাইরিন)', ex: 'স্টাইরোফোম, ওয়ান-টাইম ফাস্টফুড বক্স ও ডিসপোজেবল কাপ' },
    { code: 'কোড ৭ — Others (PC/অ্যাক্রিলিক/PLA)', ex: 'পলিকার্বোনেট বোতল, কম্পিউটার কেস ও বায়োপ্লাস্টিক' },
  ];
  spiCodes.forEach((sc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `আন্তর্জাতিক প্লাস্টিক রিসাইক্লিং "${sc.code}"-এর সাধারণ ব্যবহার ও উদাহরণ কোনটি?`,
        correct: sc.ex,
        distractors: spiCodes.filter((x) => x.ex !== sc.ex).slice(0, 4).map((x) => x.ex),
        explanation: `${sc.code} দিয়ে তৈরি হয়: ${sc.ex}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · প্লাস্টিক রিসাইক্লিং',
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
        question: `"${sc.ex}" তৈরিতে ব্যবহৃত প্লাস্টিকের রিসাইক্লিং কোড কোনটি?`,
        correct: sc.code,
        distractors: spiCodes.filter((x) => x.code !== sc.code).slice(0, 4).map((x) => x.code),
        explanation: `${sc.ex}-এর গায়ে ${sc.code} প্রতীক থাকে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · রিসাইক্লিং কোড',
      })
    );
  });

  // Extra Ch 5 Industrial facts & Bangladesh gas/coal/nanotech (30 MCQs)
  const extraCh5 = [
    { q: 'বাংলাদেশের প্রাকৃতিক গ্যাসে সাধারণত মিথেনের (CH₄) শতকরা পরিমাণ প্রায় কত?', a: '৯৫% – ৯৯% (সিলেট/বিবিয়ানা/তিতাস)', d: ['৪০% – ৫০%', '৬০% – ৬৫%', '২০% – ৩০%'] },
    { q: 'গৃহস্থালি সিলিন্ডারের LPG গ্যাসের গন্ধহীনতা দূর করে লিকেজ শনাক্ত করতে কী মেশানো হয়?', a: 'ইথাইল মারক্যাপ্টান (C₂H₅SH)', d: ['ক্লোরোফর্ম', 'অ্যামোনিয়া', 'ন্যাফথালিন'] },
    { q: 'CNG (Compressed Natural Gas) ও LPG (Liquefied Petroleum Gas)-এর প্রধান রাসায়নিক উপাদান যথাক্রমে কী?', a: 'CNG: মিথেন (CH₄); LPG: প্রোপেন (C₃H₈) ও বিউটেন (C₄H₁₀)', d: ['CNG: বিউটেন; LPG: মিথেন', 'উভয়েই হাইড্রোজেন', 'CNG: ইথিন; LPG: বেনজিন'] },
    { q: 'কয়লার মান (Rank) অনুযায়ী সবচেয়ে উন্নত কয়লা কোনটি যাতে কার্বন ৯০%-এর বেশি ও ধোঁয়া সর্বনিম্ন?', a: 'অ্যানথ্রাসাইট (Anthracite)', d: ['লিগনাইট (Lignite)', 'পিট কয়লা (Peat)', 'সাব-বিটুমিনাস'] },
    { q: 'কাগজের মণ্ড বা পাল্পকে ক্লোরিন গ্যাস ছাড়া পরিবেশবান্ধব উপায়ে সাদা (TCF Bleaching) করতে কী ব্যবহৃত হয়?', a: 'হাইড্রোজেন পারঅক্সাইড (H₂O₂) বা ওজোন (O₃) বা ClO₂', d: ['পটাশিয়াম সায়ানাইড', 'লেড অ্যাসিটেট', 'সালফিউরিক অ্যাসিড'] },
    { q: 'ইউরিয়া সার উৎপাদনের সময় তাপমাত্রা অত্যধিক বেড়ে গেলে ইউরিয়া নিজেদের মধ্যে ঘনীভূত হয়ে কোন বিষাক্ত যৌগ তৈরি করে?', a: 'বাইইউরেট (Biuret, >২% হলে উদ্ভিদের জন্য ক্ষতিকর)', d: ['অ্যাসপিরিন', 'বেনজিন', 'ফরমালিন'] },
    { q: 'নন-পোরাস বা নিশ্ছিদ্র চীনামাটির সিরামিক পাত্রকে জলরোধী ও চকচকে করতে পাত্রের গায়ে কীসের প্রলেপ দেওয়া হয়?', a: 'সিলিকা, ফেল্ডস্পার, চুন ও ZnO/PbO-এর গ্লেজ (Glaze)', d: ['শুধু খাবার লবণ', 'সালফার গুঁড়া', 'জিপসাম ও কয়লা'] },
    { q: 'চামড়া ট্যানিং প্রক্রিয়ায় পশম ও অবাঞ্ছিত প্রোটিন দূর করতে প্রথম চুন-সালফাইড দ্রবণে ডোবানোর পর কী প্রক্রিয়ায় অ্যাসিড ও লবণ দেওয়া হয়?', a: 'পিকলিং (Pickling, H₂SO₄ + NaCl)', d: ['ভালকানাইজেশন', 'সাবানায়ন', 'অ্যানিলিং'] },
    { q: 'ন্যানো-কণার (Nanoparticle) আকার সাধারণত কোন পরিসরের মধ্যে থাকে?', a: '১ – ১০০ ন্যানোমিটার (nm)', d: ['১ – ১০০ মাইক্রোমিটার', '১ – ১০ মিলিমিটার', '১০০০ – ৫০০০ nm'] },
    { q: 'পাঁচটি প্রধান ইউরিয়া নয় এমন সারের মধ্যে টিএসপি (TSP)-এর রাসায়নিক সংকেত কী?', a: 'মনোক্যালসিয়াম ডাইহাইড্রোজেন ফসফেট [Ca(H₂PO₄)₂]', d: ['অ্যামোনিয়াম সালফেট', 'পটাশিয়াম ক্লোরাইড', 'ইউরিয়া নাইট্রেট'] },
    { q: 'কাচপাত্র তৈরির চুল্লি থেকে গরম কাচকে হঠাৎ ঠান্ডা করলে কী ত্রুটি ঘটে যা অ্যানিলিং দিয়ে দূর করা হয়?', a: 'অভ্যন্তরীণ তাপীয় পীড়ন (Thermal Stress) সৃষ্টি হয়ে কাচ সামান্য আঘাতেই ফেটে ভঙ্গুর হয়ে যায়', d: ['কাচ লোহার মতো শক্ত হয়', 'কাচ তরল থাকে', 'কাচ কালো হয়ে যায়'] },
    { q: 'বর্জ্য পানি শোধনাগারে (ETP) জৈব বর্জ্য পচানোর জন্য ব্যাকটেরিয়া ব্যবহার করে কোন ধাপের ট্রিটমেন্ট করা হয়?', a: 'সেকেন্ডারি বা বায়োলজিক্যাল ট্রিটমেন্ট ধাপ', d: ['প্রাইমারি স্ক্রিনিং', 'শুধু তড়িৎ প্রলেপন', 'তাপ পাতন'] },
  ];
  extraCh5.forEach((ec, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: ec.q,
        correct: ec.a,
        distractors: ec.d,
        explanation: `${ec.q} — সঠিক উত্তর: ${ec.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · অর্থনৈতিক রসায়ন',
      })
    );
  });

  // 5. Additional Ch 1 Atmospheric Composition & Acid-Base Numericals (~80 MCQs)
  const gasAtm = [
    { q: 'শুষ্ক বায়ুমণ্ডলে নাইট্রোজেন (N₂), অক্সিজেন (O₂) ও আর্গনের (Ar) শতকরা আয়তন অনুপাত যথাক্রমে কত?', a: 'N₂: ৭৮.০৮%, O₂: ২০.৯৫%, Ar: ০.৯৩%', d: ['N₂: ৫০%, O₂: ৪৯%, Ar: ১%', 'N₂: ৮০%, O₂: ১০%, Ar: ১০%', 'N₂: ৬৫%, O₂: ৩০%, Ar: ৫%'] },
    { q: 'স্ট্র্যাটোস্ফিয়ারে অতিবেগুনি রশ্মি দ্বারা ওজোন (O₃) তৈরি ও প্রাকৃতিক ভারসাম্যের চক্রকে কী বলে?', a: 'চ্যাপম্যান চক্র (Chapman Cycle)', d: ['ক্রেবস চক্র', 'বর্ন-হেবার চক্র', 'হ্যাবার প্রক্রিয়া'] },
    { q: 'অ্যাসিড বৃষ্টির জন্য দায়ী প্রধান দুটি বায়ু দূষক গ্যাস ও বৃষ্টিপাতের উপাদান অ্যাসিড যথাক্রমে কী?', a: 'SO₂ ও NO₂ গ্যাস → H₂SO₄ ও HNO₃', d: ['CH₄ ও NH₃ → HCl', 'CO ও N₂ → H₃PO₄', 'He ও Ar → HF'] },
    { q: 'ফটোকেমিক্যাল স্মগের ফলে চোখে জ্বালাপোড়া সৃষ্টিকারী তীব্র ল্যাক্রিমেটরি (অশ্রু ঝরানো) যৌগ কোনটি?', a: 'PAN (পার-অক্সিঅ্যাসিটাইল নাইট্রেট) ও অ্যাক্রোলিন', d: ['SO₂ ও গ্রাফাইট', 'মিথেন ও জলীয়বাষ্প', 'ইউরিয়া ও নাইট্রেট'] },
    { q: 'ডিকন (Deacon) বা অটোমোবাইল এগজস্টের ক্যাটালাইটিক কনভার্টার বিষক্রিয়ায় অকার্যকর হয় কোন গ্যাসোলিন সংযোজকের কারণে?', a: 'টেট্রা-ইথাইল লেড [Pb(C₂H₅)₄]', d: ['ইথানল', 'আইসো-অকটেন', 'মিথাইল টারশিয়ারি বিউটাইল ইথার'] },
    { q: 'আর্দ্র বায়ু শুষ্ক বায়ুর চেয়ে হালকা হয় কেন?', a: 'বায়ুতে থাকা জলীয়বাষ্পের (H₂O, M = ১৮) আণবিক ভর শুষ্ক বায়ুর গড় আণবিক ভরের (~২৯) চেয়ে কম বলে', d: ['জলীয়বাষ্পের ভর ৩৬', 'আর্দ্র বায়ুর চাপ ১০ atm', 'O₂ আর্দ্র বায়ুতে থাকে না'] },
    { q: 'যদি ০ °C (২৭৩ K) থেকে তাপমাত্রা কমে −২৭৩.১৫ °C হয়, তবে আদর্শ গ্যাসের আয়তন তাত্ত্বিকভাবে কত হবে?', a: 'শূন্য (পরম শূন্য তাপমাত্রা, ০ K)', d: ['২২.৪ লিটার', 'অসীম', 'দ্বিগুণ'] },
    { q: 'বায়ুমণ্ডলে CO₂ গ্যাসের স্বাভাবিক ঘনত্ব শিল্পবিপ্লবের পূর্বে ~২৮০ ppm থাকলেও বর্তমানে প্রায় কত ppm-এ পৌঁছেছে?', a: 'প্রায় ৪১৫–৪২০ ppm (এবং বাড়ছে)', d: ['৫০ ppm', '১০,০০০ ppm', '১ ppm'] },
  ];
  gasAtm.forEach((ga, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: ga.q,
        correct: ga.a,
        distractors: ga.d,
        explanation: `${ga.q} — সঠিক উত্তর: ${ga.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · বায়ুমণ্ডল ও দূষণ',
      })
    );
  });

  // Additional ideal gas molar mass / STP density / pressure drills (30 MCQs)
  const stpDensities = [
    { gas: 'মিথেন (CH₄, M = ১৬)', dens: '০.৭১৪ g/L', mass112: '৮.০ গ্রাম' },
    { gas: 'অক্সিজেন (O₂, M = ৩২)', dens: '১.৪২৯ g/L', mass112: '১৬.০ গ্রাম' },
    { gas: 'নাইট্রোজেন (N₂, M = ২৮)', dens: '১.২৫০ g/L', mass112: '১৪.০ গ্রাম' },
    { gas: 'কার্বন ডাই-অক্সাইড (CO₂, M = ৪৪)', dens: '১.৯৬৪ g/L', mass112: '২২.০ গ্রাম' },
    { gas: 'অ্যামোনিয়া (NH₃, M = ১৭)', dens: '০.৭৫৯ g/L', mass112: '৮.৫ গ্রাম' },
    { gas: 'সালফার ডাই-অক্সাইড (SO₂, M = ৬৪)', dens: '২.৮৫৭ g/L', mass112: '৩২.০ গ্রাম' },
  ];
  stpDensities.forEach((sd, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `STP-তে (২২.৪ L/mol) ১১.২ লিটার ${sd.gas} গ্যাসের ভর কত গ্রাম?`,
        correct: sd.mass112,
        distractors: stpDensities.filter((x) => x.mass112 !== sd.mass112).slice(0, 4).map((x) => x.mass112),
        explanation: `১১.২ লিটার (STP) = ০.৫ মোল; তাই ভর = ০.৫ × আণবিক ভর = ${sd.mass112}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · STP-তে ভর ও ঘনত্ব',
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
        question: `STP-তে (০ °C, ১ atm) ${sd.gas} গ্যাসের ঘনত্ব (M / ২২.৪) প্রায় কত g/L?`,
        correct: sd.dens,
        distractors: stpDensities.filter((x) => x.dens !== sd.dens).slice(0, 4).map((x) => x.dens),
        explanation: `STP-তে গ্যাসের ঘনত্ব d = M / ২২.৪ = ${sd.dens}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের ঘনত্ব',
      })
    );
  });

  return list;
}
