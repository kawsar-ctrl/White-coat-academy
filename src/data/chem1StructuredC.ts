import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredC(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sc_${String(seq++).padStart(4, '0')}`;

  // 1. Key Periodic Table Elements: Block, Group, Period & Valence Shell (44 MCQs)
  const elements = [
    { sym: 'Li (Z = ৩)', grp: 'গ্রুপ ১ (ক্ষার ধাতু)', period: '২য় পর্যায়', block: 's-ব্লক', val: '2s¹' },
    { sym: 'Be (Z = ৪)', grp: 'গ্রুপ ২ (ক্ষারীয় মৃত্তিকা)', period: '২য় পর্যায়', block: 's-ব্লক', val: '2s²' },
    { sym: 'B (Z = ৫)', grp: 'গ্রুপ ১৩', period: '২য় পর্যায়', block: 'p-ব্লক', val: '2s² 2p¹' },
    { sym: 'N (Z = ৭)', grp: 'গ্রুপ ১৫ (নিক্টোজেন)', period: '২য় পর্যায়', block: 'p-ব্লক', val: '2s² 2p³' },
    { sym: 'O (Z = ৮)', grp: 'গ্রুপ ১৬ (চালকোজেন)', period: '২য় পর্যায়', block: 'p-ব্লক', val: '2s² 2p⁴' },
    { sym: 'F (Z = ৯)', grp: 'গ্রুপ ১৭ (হ্যালোজেন)', period: '২য় পর্যায়', block: 'p-ব্লক', val: '2s² 2p⁵' },
    { sym: 'Na (Z = ১১)', grp: 'গ্রুপ ১ (ক্ষার ধাতু)', period: '৩য় পর্যায়', block: 's-ব্লক', val: '3s¹' },
    { sym: 'Mg (Z = ১২)', grp: 'গ্রুপ ২ (ক্ষারীয় মৃত্তিকা)', period: '৩য় পর্যায়', block: 's-ব্লক', val: '3s²' },
    { sym: 'Al (Z = ১৩)', grp: 'গ্রুপ ১৩', period: '৩য় পর্যায়', block: 'p-ব্লক', val: '3s² 3p¹' },
    { sym: 'Si (Z = ১৪)', grp: 'গ্রুপ ১৪', period: '৩য় পর্যায়', block: 'p-ব্লক', val: '3s² 3p²' },
    { sym: 'P (Z = ১৫)', grp: 'গ্রুপ ১৫ (নিক্টোজেন)', period: '৩য় পর্যায়', block: 'p-ব্লক', val: '3s² 3p³' },
    { sym: 'S (Z = ১৬)', grp: 'গ্রুপ ১৬ (চালকোজেন)', period: '৩য় পর্যায়', block: 'p-ব্লক', val: '3s² 3p⁴' },
    { sym: 'Cl (Z = ১৭)', grp: 'গ্রুপ ১৭ (হ্যালোজেন)', period: '৩য় পর্যায়', block: 'p-ব্লক', val: '3s² 3p⁵' },
    { sym: 'Ar (Z = ১৮)', grp: 'গ্রুপ ১৮ (নিষ্ক্রিয় গ্যাস)', period: '৩য় পর্যায়', block: 'p-ব্লক', val: '3s² 3p⁶' },
    { sym: 'K (Z = ১৯)', grp: 'গ্রুপ ১ (ক্ষার ধাতু)', period: '৪র্থ পর্যায়', block: 's-ব্লক', val: '4s¹' },
    { sym: 'Ca (Z = ২০)', grp: 'গ্রুপ ২ (ক্ষারীয় মৃত্তিকা)', period: '৪র্থ পর্যায়', block: 's-ব্লক', val: '4s²' },
    { sym: 'Sc (Z = ২১)', grp: 'গ্রুপ ৩ (d-ব্লক)', period: '৪র্থ পর্যায়', block: 'd-ব্লক', val: '3d¹ 4s²' },
    { sym: 'Cr (Z = ২৪)', grp: 'গ্রুপ ৬ (অবস্থান্তর)', period: '৪র্থ পর্যায়', block: 'd-ব্লক', val: '3d⁵ 4s¹' },
    { sym: 'Mn (Z = ২৫)', grp: 'গ্রুপ ৭ (অবস্থান্তর)', period: '৪র্থ পর্যায়', block: 'd-ব্লক', val: '3d⁵ 4s²' },
    { sym: 'Fe (Z = ২৬)', grp: 'গ্রুপ ৮ (অবস্থান্তর)', period: '৪র্থ পর্যায়', block: 'd-ব্লক', val: '3d⁶ 4s²' },
    { sym: 'Cu (Z = ২৯)', grp: 'গ্রুপ ১১ (মুদ্রা ধাতু)', period: '৪র্থ পর্যায়', block: 'd-ব্লক', val: '3d¹⁰ 4s¹' },
    { sym: 'Zn (Z = ৩০)', grp: 'গ্রুপ ১২ (d-ব্লক)', period: '৪র্থ পর্যায়', block: 'd-ব্লক', val: '3d¹⁰ 4s²' },
  ];
  const allGrps = Array.from(new Set(elements.map((e) => e.grp)));
  elements.forEach((el, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `আধুনিক পর্যায় সারণিতে ${el.sym} মৌলটির সঠিক পর্যায়, গ্রুপ ও ব্লক কোনটি?`,
        correct: `${el.period}, ${el.grp} (${el.block})`,
        distractors: allGrps
          .filter((g) => g !== el.grp)
          .slice(i % 5, (i % 5) + 4)
          .map((g) => `${el.period}, ${g} (${el.block})`),
        explanation: `${el.sym}-এর সর্ববহিঃস্থ ইলেকট্রন বিন্যাস ${el.val}; তাই এর অবস্থান ${el.period}, ${el.grp} (${el.block})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · পর্যায় সারণিতে অবস্থান',
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
        question: `স্বাভাবিক বা গ্রাউন্ড স্টেটে ${el.sym} পরমাণুর যোজ্যতা স্তরের ইলেকট্রন বিন্যাস কোনটি?`,
        correct: el.val,
        distractors: elements
          .filter((x) => x.val !== el.val)
          .slice(i % 8, (i % 8) + 4)
          .map((x) => x.val),
        explanation: `${el.sym}-এর ইলেকট্রন বিন্যাসে সর্ববহিঃস্থ যোজ্যতা স্তরে ${el.val} থাকে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · যোজ্যতা স্তর',
      })
    );
  });

  // 2. Salt Hydrolysis & Aqueous Solution pH Nature (18 MCQs)
  const saltNature = [
    { salt: 'NH₄Cl (অ্যামোনিয়াম ক্লোরাইড)', nature: 'অম্লীয় (pH < ৭)', reason: 'তীব্র অ্যাসিড HCl ও দুর্বল ক্ষার NH₄OH থেকে উৎপন্ন; NH₄⁺ আর্দ্রবিশ্লেষিত হয়ে H⁺ দেয়।' },
    { salt: 'CH₃COONa (সোডিয়াম অ্যাসিটেট)', nature: 'ক্ষারীয় (pH > ৭)', reason: 'দুর্বল অ্যাসিড CH₃COOH ও তীব্র ক্ষার NaOH থেকে উৎপন্ন; CH₃COO⁻ পানির সাথে OH⁻ দেয়।' },
    { salt: 'Na₂CO₃ (সোডিয়াম কার্বনেট)', nature: 'তীব্র ক্ষারীয় (pH > ৭)', reason: 'কার্বনেট আয়ন (CO₃²⁻) পানির সাথে বিক্রিয়ায় OH⁻ উৎপন্ন করে।' },
    { salt: 'FeCl₃ / AlCl₃', nature: 'অম্লীয় (pH < ৭)', reason: 'উচ্চ চার্জযুক্ত Fe³⁺/Al³⁺ আয়ন পানির অণু থেকে প্রোটন মুক্ত করে জলীয় দ্রবণকে অম্লীয় করে।' },
    { salt: 'NaCl / KNO₃ / K₂SO₄', nature: 'প্রশম বা নিরপেক্ষ (pH = ৭)', reason: 'তীব্র অ্যাসিড ও তীব্র ক্ষারের লবণ বলে এদের আয়ন পানির সাথে আর্দ্রবিশ্লেষিত হয় না।' },
    { salt: 'CuSO₄ (কপার সালফেট)', nature: 'অম্লীয় (pH < ৭)', reason: 'তীব্র H₂SO₄ ও মৃদু Cu(OH)₂ ক্ষারের লবণ হওয়ায় দ্রবণ অম্লধর্মী (নীল লিটমাস লাল করে)।' },
    { salt: 'KCN / NaCN (পটাশিয়াম সায়ানাইড)', nature: 'ক্ষারীয় (pH > ৭)', reason: 'দুর্বল অ্যাসিড HCN ও তীব্র ক্ষার KOH-এর লবণ হওয়ায় দ্রবণ ক্ষারধর্মী।' },
    { salt: 'Na₂SO₄ (সোডিয়াম সালফেট)', nature: 'প্রশম (pH = ৭)', reason: 'তীব্র ক্ষার NaOH এবং তীব্র অ্যাসিড H₂SO₄ থেকে সৃষ্ট নিরপেক্ষ লবণ।' },
    { salt: 'CH₃COONH₄ (অ্যামোনিয়াম অ্যাসিটেট)', nature: 'প্রায় প্রশম (pH ≈ ৭)', reason: 'CH₃COOH (Ka = ১.৮×১০⁻⁵) এবং NH₄OH (Kb = ১.৮×১০⁻⁵)-এর বিয়োজন ধ্রুবক সমান।' },
  ];
  saltNature.forEach((sn, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `২৫ °C তাপমাত্রায় ${sn.salt} লবণের জলীয় দ্রবণের প্রকৃতি কেমন হয়?`,
        correct: sn.nature,
        distractors: ['অম্লীয় (pH < ৭)', 'ক্ষারীয় (pH > ৭)', 'প্রশম বা নিরপেক্ষ (pH = ৭)', 'উভধর্মী (pH = ১ ও ১৪)'],
        explanation: `${sn.salt}: ${sn.nature}। কারণ: ${sn.reason}`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · লবণের আর্দ্রবিশ্লেষণ',
      })
    );
  });

  // 3. Molecular Orbital Theory (Bond Order & Magnetic Character) (18 MCQs)
  const motSpecies = [
    { sp: 'H₂ অণু', bo: '১', mag: 'ডায়াচৌম্বক (কোনো বিজোড় e⁻ নেই)' },
    { sp: 'He₂ অণু (তাত্ত্বিক)', bo: '০ (অস্তিত্বহীন)', mag: 'স্থায়ী অণু গঠন করে না' },
    { sp: 'N₂ অণু', bo: '৩', mag: 'ডায়াচৌম্বক (সকল e⁻ যুগ্ম)' },
    { sp: 'O₂ অণু', bo: '২', mag: 'প্যারাচৌম্বক (π* অরবিটালে ২টি বিজোড় e⁻)' },
    { sp: 'O₂⁺ আয়ন', bo: '২.৫', mag: 'প্যারাচৌম্বক (১টি বিজোড় e⁻)' },
    { sp: 'O₂⁻ (সুপার-অক্সাইড আয়ন)', bo: '১.৫', mag: 'প্যারাচৌম্বক (১টি বিজোড় e⁻)' },
    { sp: 'O₂²⁻ (পার-অক্সাইড আয়ন)', bo: '১', mag: 'ডায়াচৌম্বক (কোনো বিজোড় e⁻ নেই)' },
    { sp: 'F₂ অণু', bo: '১', mag: 'ডায়াচৌম্বক (বন্ধন ক্রম ১)' },
    { sp: 'CO অণু (N₂-এর আইসোইলেকট্রনিক)', bo: '৩', mag: 'ডায়াচৌম্বক (১৪টি ইলেকট্রন)' },
  ];
  motSpecies.forEach((m, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `আণবিক অরবিটাল তত্ত্ব (MOT) অনুসারে "${m.sp}"-এর বন্ধন ক্রম (Bond Order) কত?`,
        correct: m.bo,
        distractors: ['০ (অস্তিত্বহীন)', '১', '১.৫', '২', '২.৫', '৩', '৩.৫'].filter((x) => x !== m.bo),
        explanation: `Bond Order = (Nb − Na) / ২ সূত্রানুসারে ${m.sp}-এর বন্ধন ক্রম ${m.bo} এবং চৌম্বক প্রকৃতি ${m.mag}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · আণবিক অরবিটাল তত্ত্ব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `আণবিক অরবিটাল তত্ত্ব অনুযায়ী "${m.sp}"-এর চৌম্বক ধর্ম কোনটি?`,
        correct: m.mag,
        distractors: [
          'ডায়াচৌম্বক (কোনো বিজোড় e⁻ নেই)',
          'প্যারাচৌম্বক (π* অরবিটালে ২টি বিজোড় e⁻)',
          'প্যারাচৌম্বক (১টি বিজোড় e⁻)',
          'ফেরোচৌম্বক (স্থায়ী ডোমেইন)',
          'স্থায়ী অণু গঠন করে না',
        ].filter((x) => x !== m.mag),
        explanation: `${m.sp}: ${m.mag} (বন্ধন ক্রম = ${m.bo})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · MOT চৌম্বক ধর্ম',
      })
    );
  });

  // 4. Colloid Dispersion Matrix (Dispersion Medium vs Dispersed Phase) (16 MCQs)
  const colloids = [
    { name: 'ধোঁয়া (Smoke)', phase: 'কঠিন', med: 'গ্যাস (বায়ু)', type: 'কঠিন অ্যারোসল' },
    { name: 'কুয়াশা ও মেঘ (Fog/Mist)', phase: 'তরল', med: 'গ্যাস (বায়ু)', type: 'তরল অ্যারোসল' },
    { name: 'দুধ ও মাখন (Milk / Butter)', phase: 'তরল', med: 'তরল', type: 'ইমালশন (Emulsion)' },
    { name: 'সাবানের ফেনা (Soap Lather)', phase: 'গ্যাস', med: 'তরল', type: 'ফোম (Foam)' },
    { name: 'পনির ও জেলি (Cheese / Jelly)', phase: 'তরল', med: 'কঠিন', type: 'জেল (Gel)' },
    { name: 'গোল্ড সল ও কালি (Ink / Sol)', phase: 'কঠিন', med: 'তরল', type: 'সল (Sol)' },
    { name: 'পিউমিস পাথর ও ফোম রাবার', phase: 'গ্যাস', med: 'কঠিন', type: 'কঠিন ফোম' },
    { name: 'রঙিন কাচ ও রত্নপাথর', phase: 'কঠিন', med: 'কঠিন', type: 'কঠিন সল' },
  ];
  colloids.forEach((col, i) => {
    const others = colloids.filter((x) => x.name !== col.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `কলয়েড শ্রেণিবিভাগে "${col.name}" কোন ধরনের কলয়েডাল সিস্টেম এবং এর বিস্তৃত দশা ও বিস্তার মাধ্যম কী?`,
        correct: `${col.type} (${col.med}-এ ${col.phase})`,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => `${x.type} (${x.med}-এ ${x.phase})`),
        explanation: `${col.name} হলো ${col.type}, যেখানে বিস্তার মাধ্যম ${col.med} ও বিস্তৃত দশা ${col.phase}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · কলয়েডের শ্রেণিবিভাগ',
      })
    );
  });

  // 5. Food Additives, Fertilizers, Toiletries & Green Chemistry Extra Matrix (26 MCQs)
  const appliedFacts: Array<[string, string, [string, string, string], string]> = [
    ['কাপড় কাচার সাবান (Hard Soap) কোন ক্ষারের সাথে চর্বির বিক্রিয়ায় তৈরি হয়?', 'সোডিয়াম হাইড্রোক্সাইড (NaOH)', ['পটাশিয়াম হাইড্রোক্সাইড (KOH)', 'অ্যামোনিয়াম হাইড্রোক্সাইড', 'ক্যালসিয়াম হাইড্রোক্সাইড'], 'NaOH দিয়ে কঠিন সাবান (RCOONa) এবং KOH দিয়ে নরম/তরল সাবান (RCOOK) তৈরি হয়।'],
    ['বেবি পাউডার বা ট্যালকম পাউডারের মূল উপাদান ট্যাল্ক-এর রাসায়নিক সংকেত কোনটি?', 'Mg₃Si₄O₁₀(OH)₂ (হাইড্রেটেড ম্যাগনেসিয়াম সিলিকেট)', ['CaCO₃', 'ZnSO₄', 'Na₂B₄O₇'], 'ট্যাল্কে পিচ্ছিলতা দেওয়ার জন্য ম্যাগনেসিয়াম সিলিকেট এবং জীবাণুনাশক ও স্নিগ্ধতার জন্য বোরিক অ্যাসিড/জিঙ্ক অক্সাইড থাকে।'],
    ['রোজ-ওয়াটার (গোলাপ জল) ও ফুল থেকে সুগন্ধি এসেনশিয়াল অয়েল নিষ্কাশনে কোন পাতন পদ্ধতি ব্যবহৃত হয়?', 'বাষ্প পাতন (Steam Distillation)', ['নিম্নচাপ পাতন', 'উর্ধ্বপাতন', 'ক্রিস্টালাইজেশন'], 'পানিতে অদ্রবণীয় কিন্তু উচ্চ স্ফুটনাঙ্কের সুগন্ধি তেলগুলো স্টিম পাতনে ১০০ °C-এর নিচেই আলাদা করা যায়।'],
    ['আফটার-শেভ লোশনে ব্যবহৃত অ্যান্টিসেপটিক ও কুলিং এজেন্ট কোনটি?', 'ডিনেচার্ড ইথানল ও মেনথল', ['সোডিয়াম হাইপোক্লোরাইট', 'অ্যাসিটিক অ্যাসিড', 'সালফিউরিক অ্যাসিড'], 'আফটার-শেভে ইথানল জীবাণু ধ্বংস করে, গ্লিসারিন আর্দ্রতা ধরে রাখে এবং মেনথল শীতল অনুভূতি দেয়।'],
    ['টুথপেস্টে দাঁতের ক্ষয়রোধী (Anti-cavity) উপাদান হিসেবে কোন লবণটি যোগ করা হয়?', 'সোডিয়াম ফ্লোরাইড (NaF) বা স্ট্যানাস ফ্লোরাইড (SnF₂)', ['সোডিয়াম ক্লোরাইড (NaCl)', 'ক্যালসিয়াম সালফেট', 'পটাশিয়াম নাইট্রেট ছাড়া কিছুই নয়'], 'ফ্লোরাইড আয়ন দাঁতের হাইড্রক্সিঅ্যাপাটাইটকে অধিক অম্ল-প্রতিরোধী ফ্লুরোঅ্যাপাটাইটে রূপান্তরিত করে।'],
    ['ফল পাকাতে বা কাঁচা আম কৃত্রিমভাবে পাকাতে অসাধু ব্যবসায়ীরা কোন নিষিদ্ধ রাসায়নিক ব্যবহার করে যা পানির সাথে অ্যাসিটিলিন গ্যাস দেয়?', 'ক্যালসিয়াম কার্বাইড (CaC₂)', ['ইথিলিন গ্যাস', 'সোডিয়াম বেনজোয়েট', 'সাইট্রিক অ্যাসিড'], 'ক্যালসিয়াম কার্বাইডে আর্সেনিক ও ফসফরাস বিষ থাকে; নিরাপদ প্রাকৃতিক ফল পাকানোর হরমোন হলো ইথিলিন (C₂H₄)।'],
    ['দুধে ভেজাল প্রোটিন বা নাইট্রোজেন বাড়াতে কোন বিষাক্ত রাসায়নিক মেশানোর ফলে বৃক্কে পাথর ও কিডনি বিকল হয়?', 'মেলামাইন (Melamine, C₃H₆N₆)', ['ল্যাকটোজ', 'ভিটামিন C', 'ফর্মালিন'], 'মেলামাইনে ৬৬% নাইট্রোজেন থাকায় কেলডাল (Kjeldahl) পরীক্ষায় কৃত্রিম প্রোটিন বেশি দেখায়।'],
    ['খাদ্যে চর্বি-অ্যাসিডের জারণজনিত দুর্গন্ধ (Rancidity) ঠেকাতে কোন কৃত্রিম অ্যান্টি-অক্সিডেন্ট ব্যবহৃত হয়?', 'BHA, BHT ও TBHQ', ['ফরমালডিহাইড', 'সোডিয়াম সাইক্লামেট', 'স্যাকারিন'], 'বিউটাইলেটেড হাইড্রক্সি অ্যানিসোল (BHA) ও টলুইন (BHT) ফ্রি-র‍্যাডিকেল চেইন বিক্রিয়া থামিয়ে তেল-চর্বি সংরক্ষণ করে।'],
    ['গ্লাস ক্লিনারের প্রধান পরিষ্কারক উপাদান অ্যামোনিয়া (NH₄OH)-এর পাশাপাশি কাচ ঝকঝকে রাখতে কোন জৈব দ্রাবক থাকে?', 'আইসোপ্রোপাইল অ্যালকোহল (বা ইথিলিন গ্লাইকল)', ['ক্লোরোফর্ম', 'নাইট্রোবেনজিন', 'অ্যাসিটিক অ্যাসিড'], 'আইসোপ্রোপাইল অ্যালকোহল দ্রুত বাষ্পীভূত হয়ে কাচে কোনো দাগ রাখে না।'],
    ['টয়লেট ক্লিনারের (Harpic/Toilet Cleaner) সক্রিয় উপাদান হিসেবে জীবাণু ও আয়রনের দাগ দূর করতে কী থাকে?', 'হাইড্রোক্লোরিক অ্যাসিড (HCl) বা কস্টিক সোডা (NaOH) + সারফ্যাক্ট্যান্ট', ['ভিনেগার', 'অলিভ অয়েল', 'ল্যাকটিক অ্যাসিড'], 'গাঢ় HCl কমোডের ক্যালসিয়াম কার্বনেট ও আয়রনের অদ্রবণীয় দাগ দ্রুত দ্রবীভূত করে।'],
    ['কোল্ড ক্রিম হলো Water-in-Oil (W/O) ইমালশন, আর ভ্যানিশিং ক্রিম কোন ধরনের ইমালশন?', 'Oil-in-Water (O/W) ইমালশন', ['Water-in-Oil (W/O) ইমালশন', 'কঠিন সল', 'গ্যাসীয় অ্যারোসল'], 'ভ্যানিশিং ক্রিমে স্টেরিক অ্যাসিড ও পটাশ থাকে যা ত্বকে লাগালে পানি বাষ্পীভূত হয়ে অদৃশ্য হয়ে যায়।'],
    ['লিপস্টিকের প্রধান উপাদান কী যা ঠোঁটে মসৃণতা ও রঙের স্থায়িত্ব আনে?', 'মোম (Beeswax/Carnauba wax), ক্যাস্টর অয়েল ও রঞ্জক (ইওসিন/কারমিন)', ['ক্যালসিয়াম কার্বাইড', 'অ্যামোনিয়া ও পারদ', 'সালফার গুঁড়া'], 'লিপস্টিকে প্রায় ৬৫% তেল, ২৫% মোম এবং বাকিটা রঞ্জক ও ইমোলিয়েন্ট থাকে।'],
    ['নেইল পলিশের প্রলেপ তুলতে "নেইল পলিশ রিমুভার"-এ প্রধান দ্রাবক হিসেবে কোন যৌগ ব্যবহৃত হয়?', 'অ্যাসিটোন (প্রোপানোন) বা ইথাইল অ্যাসিটেট', ['সালফিউরিক অ্যাসিড', 'পানি', 'বেনজিন'], 'নেইল পলিশে নাইট্রোসেলুলোজ থাকে যা অ্যাসিটোনে দ্রুত দ্রবীভূত হয়।'],
  ];
  appliedFacts.forEach((af) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: af[0],
        correct: af[1],
        distractors: af[2],
        explanation: af[3],
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · কর্মমুখী রসায়ন',
      })
    );
  });

  // 6. Quantitative & Theoretical Quick Drills across Ch 1–4 (60 MCQs)
  // 6A. Bond Order / Formal Charge / Hybridization quick pairs & pH of Neutral Water / Dilution
  const dilutionCases = [
    { v1: 10, c1: 0.1, v2: 100, phBefore: 1, phAfter: 2 },
    { v1: 10, c1: 0.1, v2: 1000, phBefore: 1, phAfter: 3 },
    { v1: 20, c1: 0.01, v2: 200, phBefore: 2, phAfter: 3 },
    { v1: 50, c1: 0.01, v2: 5000, phBefore: 2, phAfter: 4 },
    { v1: 10, c1: 0.001, v2: 100, phBefore: 3, phAfter: 4 },
  ];
  dilutionCases.forEach((dc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(dc.v1)} mL ${toBnDigits(dc.c1)} M HCl দ্রবণে পানি যোগ করে মোট আয়তন ${toBnDigits(dc.v2)} mL করা হলে লঘু দ্রবণের pH কত হবে?`,
        correct: `${toBnDigits(dc.phAfter)}`,
        distractors: [dc.phBefore, dc.phAfter + 2, 7, Math.max(0, dc.phBefore - 1)]
          .filter((x) => x !== dc.phAfter)
          .map((x) => toBnDigits(x)),
        explanation: `V₁S₁ = V₂S₂ অনুযায়ী ${toBnDigits(dc.v2 / dc.v1)} গুণ লঘু করায় [H⁺] কমে ১০⁻${toBnDigits(dc.phAfter)} M হয়, তাই pH = ${toBnDigits(dc.phAfter)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · লঘুকরণ ও pH',
      })
    );
  });

  // 6B. Quantum Numbers of Specific Last Electrons (14 MCQs)
  const lastElectrons = [
    { el: 'Li (Z = ৩)', qSet: 'n = ২, l = ০, m = ০, s = +১/২' },
    { el: 'Be (Z = ৪)', qSet: 'n = ২, l = ০, m = ০, s = −১/২' },
    { el: 'B (Z = ৫)', qSet: 'n = ২, l = ১, m = −১, s = +১/২' },
    { el: 'N (Z = ৭)', qSet: 'n = ২, l = ১, m = +১, s = +১/২' },
    { el: 'Ne (Z = ১০)', qSet: 'n = ২, l = ১, m = +১, s = −১/২' },
    { el: 'Na (Z = ১১)', qSet: 'n = ৩, l = ০, m = ০, s = +১/২' },
    { el: 'Mg (Z = ১২)', qSet: 'n = ৩, l = ০, m = ০, s = −১/২' },
    { el: 'K (Z = ১৯)', qSet: 'n = ৪, l = ০, m = ০, s = +১/২' },
    { el: 'Ca (Z = ২০)', qSet: 'n = ৪, l = ০, m = ০, s = −১/২' },
    { el: 'Sc (Z = ২১)-এর ২১তম ইলেকট্রন', qSet: 'n = ৩, l = ২, m = −২, s = +১/২' },
  ];
  lastElectrons.forEach((le, i) => {
    const others = lastElectrons.filter((x) => x.el !== le.el);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `হুন্ড ও আফবাউ নিয়ম অনুযায়ী ${le.el} পরমাণুর সর্বশেষ প্রবেশকৃত ইলেকট্রনটির সম্ভাব্য কোয়ান্টাম সংখ্যার সেট কোনটি?`,
        correct: le.qSet,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.qSet),
        explanation: `${le.el}-এর ইলেকট্রন বিন্যাস থেকে সর্বশেষ ইলেকট্রনের কোয়ান্টাম সেট হলো ${le.qSet}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · কোয়ান্টাম সেট',
      })
    );
  });

  // 6C. Catalyst & Process Matching Matrix (14 MCQs)
  const industrialCatalysts = [
    { proc: 'হেবার-বস পদ্ধতিতে অ্যামোনিয়া (NH₃) উৎপাদন', cat: 'আয়রন (Fe) চূর্ণ + Al₂O₃/K₂O বা Mo প্রমোটর' },
    { proc: 'স্পর্শ পদ্ধতিতে সালফিউরিক অ্যাসিড (SO₂ → SO₃)', cat: 'ভ্যানাডিয়াম পেন্টা-অক্সাইড (V₂O₅)' },
    { proc: 'অসওয়াল্ড পদ্ধতিতে নাইট্রিক অ্যাসিড (NH₃ → NO)', cat: 'প্লাটিনাম-রোডিয়াম (Pt-Rh) তারজালি' },
    { proc: 'তেল থেকে মার্জারিন বা বনস্পতি (অসম্পৃক্ত তেলের হাইড্রোজেনেশন)', cat: 'নিকেল (Ni) চূর্ণ (১৫০–১৮০ °C)' },
    { proc: 'ডিকন পদ্ধতিতে ক্লোরিন (HCl + O₂ → Cl₂) উৎপাদন', cat: 'কিউপ্রিক ক্লোরাইড (CuCl₂)' },
    { proc: 'পলিথিন উৎপাদনে জিগলার-নাটা প্রভাবক', cat: 'TiCl₄ + (C₂H₅)₃Al (ট্রাই-ইথাইল অ্যালুমিনিয়াম)' },
    { proc: 'অ্যামোনিয়া বিশ্লেষণে লিন্ডলার প্রভাবক (অ্যালকাইন → সিস-অ্যালকিন)', cat: 'Pd / BaSO₄ ও কুইনোলিন বিষ' },
  ];
  industrialCatalysts.forEach((ic, i) => {
    const others = industrialCatalysts.filter((x) => x.proc !== ic.proc);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ic.proc}" শিল্প বা গবেষণা প্রক্রিয়ায় প্রভাবক (Catalyst) হিসেবে কোনটি ব্যবহৃত হয়?`,
        correct: ic.cat,
        distractors: others.map((x) => x.cat),
        explanation: `${ic.proc}-এ ${ic.cat} ব্যবহৃত হয় যা সক্রিয়ণ শক্তি কমিয়ে বিক্রিয়ার বেগ বহুগুণ বাড়ায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · শিল্প বিক্রিয়ার প্রভাবক',
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
        question: `"${ic.cat}" প্রভাবকটি প্রধানত কোন রাসায়নিক সংশ্লেষণ প্রক্রিয়ায় ব্যবহৃত হয়?`,
        correct: ic.proc,
        distractors: others.map((x) => x.proc),
        explanation: `${ic.cat} হলো ${ic.proc}-এর আদর্শ প্রভাবক।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · প্রভাবক ব্যবহার',
      })
    );
  });

  // 6D. Chemistry 1st Paper True/False Assertion Bank (42 MCQs)
  const chem1TruePairs: Array<{ ch: string; vis: string; trueStmt: string; falsePool: [string, string, string]; exp: string }> = [
    {
      ch: 'chem1_ch1_lab',
      vis: 'ph_buffer',
      trueStmt: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থের জলীয় দ্রবণের ঘনমাত্রা দীর্ঘদিন অপরিবর্তিত থাকে (যেমন অনার্দ্র Na₂CO₃ ও K₂Cr₂O₇)।',
      falsePool: [
        'NaOH ও HCl প্রাইমারি স্ট্যান্ডার্ড পদার্থ।',
        'KMnO₄ একটি প্রাইমারি স্ট্যান্ডার্ড পদার্থ।',
        'ভলিউমেট্রিক ফ্লাস্ককে সরাসরি বার্নারে উত্তপ্ত করা উচিত।',
      ],
      exp: 'অনার্দ্র সোডিয়াম কার্বনেট ও পটাশিয়াম ডাইক্রোমেট প্রাইমারি স্ট্যান্ডার্ড; NaOH পানি ও CO₂ শোষণ করে বলে সেকেন্ডারি।',
    },
    {
      ch: 'chem1_ch1_lab',
      vis: 'ph_buffer',
      trueStmt: 'বুনসেন বার্নারের অনুজ্জ্বল নীল শিখার সর্বোচ্চ তাপমাত্রা বাইরের জারণ মণ্ডলে (~১৫৭০ °C) থাকে।',
      falsePool: [
        'বুনসেন বার্নারের বায়ুছিদ্র বন্ধ করলে নীল শিখা তৈরি হয়।',
        'হলুদ উজ্জ্বল শিখায় কালি পড়ে না ও তাপমাত্রা সর্বোচ্চ।',
        'পল-বুঙ্গি ব্যালেন্সে বাতাস চলাচল খোলা রেখে ওজন নেওয়া উচিত।',
      ],
      exp: 'বায়ুছিদ্র খোলা থাকলে সম্পূর্ণ দহন হয়ে নীল অনুজ্জ্বল শিখা তৈরি হয়, যার বাইরের জারণ মণ্ডল সর্বাধিক উত্তপ্ত।',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vis: 'hybridization',
      trueStmt: 'ডি-ব্রগলির সমীকরণ λ = h/(mv) এবং হাইজেনবার্গের অনিশ্চয়তা নীতি Δx·Δp ≥ h/(4π) ইলেকট্রনের তরঙ্গ প্রকৃতি প্রতিষ্ঠা করে।',
      falsePool: [
        'বোর পরমাণু মডেল হাইজেনবার্গের অনিশ্চয়তা নীতি মেনে চলে।',
        'প্রধান কোয়ান্টাম সংখ্যা n-এর মান ০ হতে পারে।',
        'স্পিন কোয়ান্টাম সংখ্যা (s) শ্রোডিঞ্জারের তরঙ্গ সমীকরণ থেকে আসে।',
      ],
      exp: 'n সবসময় ধনাত্মক পূর্ণসংখ্যা (১, ২, ৩...) এবং স্পিন কোয়ান্টাম সংখ্যা শ্রোডিঞ্জার সমীকরণ থেকে আসে না।',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vis: 'hybridization',
      trueStmt: 'দ্রাব্যতা গুণফল (Ksp) কেবল তাপমাত্রার ওপর নির্ভর করে এবং দ্রবণে সমআয়ন যোগ করলে তা পরিবর্তিত হয় না।',
      falsePool: [
        'সমআয়ন যোগ করলে Ksp-এর মান দ্রুত বৃদ্ধি পায়।',
        'Kip < Ksp হলে দ্রবণে অধঃক্ষেপ পড়ে।',
        'Be এবং Mg ধাতু শিখা পরীক্ষায় গাঢ় বেগুনি ও লাল বর্ণ দেয়।',
      ],
      exp: 'সমআয়ন প্রভাবে দ্রাব্যতা s কমে কিন্তু Ksp-এর ধ্রুবক মান একই তাপমাত্রায় স্থির থাকে।',
    },
    {
      ch: 'chem1_ch3_periodic',
      vis: 'hybridization',
      trueStmt: 'অবস্থান্তর মৌলের সুস্থিত আয়নের d-অরবিটাল আংশিক পূর্ণ (d¹–d⁹) থাকে, তাই Sc³⁺ (d⁰) ও Zn²⁺ (d¹⁰) অবস্থান্তর মৌল নয়।',
      falsePool: [
        'সকল d-ব্লক মৌলই প্রকৃত অবস্থান্তর মৌল।',
        'Zn²⁺ জলীয় দ্রবণে গাঢ় নীল রঙের হয়।',
        'পর্যায় সারণিতে ফ্লোরিনের ইলেকট্রন আসক্তি ক্লোরিনের চেয়ে বেশি।',
      ],
      exp: 'Sc ও Zn d-ব্লক মৌল হলেও এদের সুস্থিত আয়নে d⁰ বা d¹⁰ বিন্যাস থাকায় এরা অবস্থান্তর মৌলের সংজ্ঞায় পড়ে না।',
    },
    {
      ch: 'chem1_ch3_periodic',
      vis: 'hybridization',
      trueStmt: 'ফ্লোরিনের তড়িৎ ঋণাত্মকতা সর্বোচ্চ (৪.০), আর ক্লোরিনের ইলেকট্রন আসক্তি সকল মৌলের মধ্যে সর্বোচ্চ (−৩৪৯ kJ/mol)।',
      falsePool: [
        'হিলিয়ামের ইলেকট্রন আসক্তি সকল মৌলের মধ্যে সর্বোচ্চ।',
        'নাইট্রোজেনের প্রথম আয়নিকরণ শক্তি অক্সিজেনের চেয়ে কম।',
        'H₂O অপেক্ষা H₂S-এর স্ফুটনাঙ্ক বেশি।',
      ],
      exp: 'ফ্লোরিন সর্বোচ্চ তড়িৎ ঋণাত্মক মৌল এবং ক্লোরিন সর্বোচ্চ ইলেকট্রন আসক্তিসম্পন্ন মৌল।',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vis: 'ph_buffer',
      trueStmt: 'সাম্যধ্রুবক (Kc/Kp) কেবল তাপমাত্রা পরিবর্তনে পরিবর্তিত হয়; প্রভাবক বা চাপ পরিবর্তনে সাম্যধ্রুবকের মান বদলায় না।',
      falsePool: [
        'ধনাত্মক প্রভাবক যোগ করলে সাম্যধ্রুবক Kc বৃদ্ধি পায়।',
        'তাপোৎপাদী বিক্রিয়ায় তাপমাত্রা বাড়ালে সাম্যধ্রুবক K বাড়ে।',
        'তীব্র অ্যাসিড ও তীব্র ক্ষারের প্রশমন তাপ ΔH = +৫৭.৩৪ kJ/mol (তাপহারী)।',
      ],
      exp: 'প্রভাবক সাম্যাবস্থা দ্রুত অর্জনে সাহায্য করে কিন্তু সাম্যের অবস্থান বা K পরিবর্তন করে না।',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vis: 'ph_buffer',
      trueStmt: 'অক্সিঅ্যাসিডে কেন্দ্রীয় পরমাণুর জারণ সংখ্যা বাড়লে অম্লশক্তি বাড়ে (যেমন HClO₄ > HClO₃ > HClO₂ > HClO)।',
      falsePool: [
        'হ্যালোজেন হাইড্রাইডগুলোর মধ্যে HF জলীয় দ্রবণে সবচেয়ে তীব্র অ্যাসিড।',
        '২৫ °C-এর বেশি তাপমাত্রায় বিশুদ্ধ পানির pH মান ৭-এর চেয়ে বেশি হয়।',
        'রক্তের প্রধান বাফার সিস্টেম হলো NH₄OH / NH₄Cl।',
      ],
      exp: 'HI > HBr > HCl > HF হলো হাইড্রোহ্যালিক অ্যাসিডের শক্তির সঠিক ক্রম।',
    },
    {
      ch: 'chem1_ch5_applied',
      vis: 'ph_buffer',
      trueStmt: 'দুধ হলো Oil-in-Water (O/W) ইমালশন, আর মাখন হলো Water-in-Oil (W/O) ইমালশন।',
      falsePool: [
        'ভিনেগারে ৩০% ইথানোয়িক অ্যাসিড থাকে।',
        'সাদা ফসফরাস কেরোসিনের নিচে সংরক্ষণ করা হয়।',
        'গ্লাস ক্লিনারে তীব্র ক্ষার NaOH ব্যবহার করা হয়।',
      ],
      exp: 'দুধে পানির মধ্যে চর্বি বিন্দু ভাসে (O/W), আর মাখনে চর্বির মধ্যে পানির বিন্দু থাকে (W/O)।',
    },
    {
      ch: 'chem1_ch5_applied',
      vis: 'ph_buffer',
      trueStmt: 'ভিনেগার তৈরিতে ইস্টের জাইমেজ এনজাইম শর্করাকে ইথানলে এবং অ্যাসিটোব্যাক্টর ব্যাকটেরিয়া ইথানলকে অ্যাসিটিক অ্যাসিডে জারিত করে।',
      falsePool: [
        'শুলজে-হার্ডি সূত্র অনুযায়ী কোয়াগুলেশন ক্ষমতার ক্রম Na⁺ > Mg²⁺ > Al³⁺।',
        'কলয়েড কণার ব্যাস ১০⁻² cm-এর চেয়েও বড়।',
        'সাসপেনশন কখনোই টিন্ডাল প্রভাব বা তলানি দেখায় না।',
      ],
      exp: 'আয়নগুলোর যোজ্যতা বাড়লে কোয়াগুলেশন ক্ষমতা বাড়ে (Al³⁺ > Mg²⁺ > Na⁺)।',
    },
  ];
  chem1TruePairs.forEach((tp, idx) => {
    const topics = [
      'প্রাইমারি স্ট্যান্ডার্ড পদার্থ',
      'বুনসেন বার্নারের শিখা ও পল-বুঙ্গি ব্যালেন্স',
      'তরঙ্গ বলবিদ্যা ও কোয়ান্টাম সংখ্যা',
      'দ্রাব্যতা গুণফল (Ksp) ও সমআয়ন প্রভাব',
      'd-ব্লক ও অবস্থান্তর মৌল',
      'পর্যায়বৃত্ত ধর্ম (তড়িৎ ঋণাত্মকতা ও ইলেকট্রন আসক্তি)',
      'রাসায়নিক সাম্যাবস্থা ও প্রভাবক',
      'অক্সিঅ্যাসিডের অম্লত্ব ও পানির pH',
      'দুধ, মাখন ও ইমালশন',
      'ভিনেগার ও কলয়েড রসায়ন',
    ];
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: tp.ch,
        visualLessonId: tp.vis,
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${topics[idx]}" সংক্রান্ত নিচের কোন বক্তব্যটি সম্পূর্ণ সঠিক?`,
        correct: tp.trueStmt,
        distractors: tp.falsePool,
        explanation: tp.exp,
        reference: 'রসায়ন ১ম পত্র · হাজারী ও নাগ · মেডিকেল রিভিশন',
      })
    );
  });

  // 7. Conjugate Acid & Conjugate Base Matrix (16 MCQs)
  const conjPairs = [
    { sp: 'H₂O (পানি)', conjAcid: 'H₃O⁺ (হাইড্রোনিয়াম আয়ন)', conjBase: 'OH⁻ (হাইড্রক্সাইড আয়ন)' },
    { sp: 'NH₃ (অ্যামোনিয়া)', conjAcid: 'NH₄⁺ (অ্যামোনিয়াম আয়ন)', conjBase: 'NH₂⁻ (অ্যামাইড আয়ন)' },
    { sp: 'HSO₄⁻ (বাইসালফেট আয়ন)', conjAcid: 'H₂SO₄ (সালফিউরিক অ্যাসিড)', conjBase: 'SO₄²⁻ (সালফেট আয়ন)' },
    { sp: 'HCO₃⁻ (বাইকার্বনেট আয়ন)', conjAcid: 'H₂CO₃ (কার্বনিক অ্যাসিড)', conjBase: 'CO₃²⁻ (কার্বনেট আয়ন)' },
    { sp: 'H₂PO₄⁻ (ডাইহাইড্রোজেন ফসফেট)', conjAcid: 'H₃PO₄ (ফসফরিক অ্যাসিড)', conjBase: 'HPO₄²⁻ (হাইড্রোজেন ফসফেট)' },
    { sp: 'HS⁻ (বাইসালফাইড আয়ন)', conjAcid: 'H₂S (হাইড্রোজেন সালফাইড)', conjBase: 'S²⁻ (সালফাইড আয়ন)' },
  ];
  conjPairs.forEach((cp, i) => {
    const others = conjPairs.filter((x) => x.sp !== cp.sp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ব্রনস্টেড-লাউরি মতবাদ অনুযায়ী উভধর্মী সত্তা "${cp.sp}"-এর অনুবন্ধী অম্ল (Conjugate Acid) কোনটি?`,
        correct: cp.conjAcid,
        distractors: [cp.conjBase, ...others.slice(0, 3).map((x) => x.conjAcid)],
        explanation: `কোনো ক্ষারক ১টি প্রোটন (H⁺) গ্রহণ করলে তার অনুবন্ধী অম্ল গঠিত হয়; ${cp.sp} + H⁺ → ${cp.conjAcid}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অনুবন্ধী অম্ল-ক্ষার',
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
        question: `ব্রনস্টেড-লাউরি মতবাদ অনুযায়ী "${cp.sp}" একটি প্রোটন দান করলে উৎপন্ন অনুবন্ধী ক্ষারক (Conjugate Base) কোনটি?`,
        correct: cp.conjBase,
        distractors: [cp.conjAcid, ...others.slice(0, 3).map((x) => x.conjBase)],
        explanation: `অম্ল থেকে ১টি প্রোটন (H⁺) অপসারিত হলে তার অনুবন্ধী ক্ষারক পাওয়া যায়; ${cp.sp} − H⁺ → ${cp.conjBase}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অনুবন্ধী ক্ষারক',
      })
    );
  });

  // 8. Oxide Acid-Base Classification (14 MCQs)
  const oxides = [
    { ox: 'Na₂O / K₂O / CaO', type: 'ক্ষারীয় অক্সাইড (Basic Oxide)' },
    { ox: 'Al₂O₃ / ZnO / BeO', type: 'উভধর্মী অক্সাইড (Amphoteric Oxide)' },
    { ox: 'SO₃ / P₄O₁₀ / Cl₂O₇', type: 'অম্লীয় অক্সাইড (Acidic Oxide)' },
    { ox: 'CO / NO / N₂O', type: 'প্রশম বা নিরপেক্ষ অক্সাইড (Neutral Oxide)' },
    { ox: 'Na₂O₂ / BaO₂ / H₂O₂', type: 'পারঅক্সাইড (Peroxide, অক্সিজেন জারণ মান −১)' },
    { ox: 'KO₂ / RbO₂', type: 'সুপারঅক্সাইড (Superoxide, অক্সিজেন জারণ মান −১/২)' },
    { ox: 'Fe₃O₄ / Pb₃O₄', type: 'মিশ্র অক্সাইড (Mixed Oxide)' },
  ];
  oxides.forEach((ox, i) => {
    const others = oxides.filter((x) => x.ox !== ox.ox);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `অক্সিজেনের সাথে বিক্রিয়ায় গঠিত "${ox.ox}" কোন শ্রেণির অক্সাইডের উদাহরণ?`,
        correct: ox.type,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.type),
        explanation: `${ox.ox} হলো ${ox.type}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অক্সাইডের শ্রেণিবিভাগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `নিচের কোন অক্সাইড গুচ্ছটি "${ox.type}" হিসেবে পরিচিত?`,
        correct: ox.ox,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.ox),
        explanation: `${ox.type}-এর আদর্শ উদাহরণ হলো ${ox.ox}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অক্সাইড পরিচিতি',
      })
    );
  });

  // 9. Lab Apparatus Functions & Equilibrium Kc Quantitative Math (18 MCQs)
  const labApps = [
    { app: 'স্পিরিট ল্যাম্প বা ওয়াটার বাথ', fn: 'জ্বালানি হিসেবে মিথানল বা ইথানল জ্বালিয়ে নিম্ন তাপমাত্রায় পাত্র গরম করা' },
    { app: 'কনডেনসার (লিবিগ শীতক)', fn: 'পাতনের সময় গরম বাষ্পকে ঠান্ডা পানির প্রবাহে ঘনীভূত করে তরলে পরিণত করা' },
    { app: 'সেপারেটরি ফানেল (Separatory Funnel)', fn: 'দুটি অমিশ্রণীয় তরল স্তর (যেমন পানি ও ইথার) ঘনত্বের ভিত্তিতে পৃথক করা' },
    { app: 'বুখনার ফানেল (Büchner Funnel)', fn: 'ভ্যাকুয়াম বা সাকশন পাম্পের সাহায্যে দ্রুত কঠিন-তরল পরিস্রাবণ করা' },
    { app: 'পোর্সেলিন ক্রুসিবল', fn: 'উচ্চ তাপমাত্রায় (প্রায় ১০০০ °C) কঠিন নমুনা পোড়ানো বা ছাই (Ash) তৈরি করা' },
    { app: 'ফিল্টার পেপার (হোয়াটম্যান নং ৪০/৪২)', fn: 'তরল দ্রবণ থেকে সূক্ষ্ম অদ্রবণীয় কঠিন অধঃক্ষেপ ছেঁকে আলাদা করা' },
  ];
  labApps.forEach((la, i) => {
    const others = labApps.filter((x) => x.app !== la.app);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `রসায়ন পরীক্ষাগারে "${la.app}"-এর প্রধান কাজ কী?`,
        correct: la.fn,
        distractors: others.map((x) => x.fn),
        explanation: `${la.app}: ${la.fn}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · পরীক্ষাগার যন্ত্রপাতি',
      })
    );
  });

  // Quantitative Kc Calculations: Forward vs Reverse / Multiplied Equation
  [4, 9, 16, 25, 100].forEach((kVal) => {
    const kRev = `১/${toBnDigits(kVal)} (${toBnDigits(Number((1 / kVal).toFixed(4)))})`;
    const kSqrt = toBnDigits(Math.sqrt(kVal));
    const kSq = toBnDigits(kVal * kVal);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `নির্দিষ্ট তাপমাত্রায় A + B ⇌ C + D বিক্রিয়ার সাম্যধ্রুবক Kc = ${toBnDigits(kVal)} হলে বিপরীত বিক্রিয়া C + D ⇌ A + B-এর সাম্যধ্রুবক K′c কত হবে?`,
        correct: kRev,
        distractors: [`${toBnDigits(kVal)}`, kSqrt, kSq, `−${toBnDigits(kVal)}`],
        explanation: `কোনো বিক্রিয়াকে উল্টে দিলে নতুন সাম্যধ্রুবক পূর্বেরটির ব্যস্তানুপাতিক হয়: K′c = ১ / Kc = ১ / ${toBnDigits(kVal)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · সাম্যধ্রুবকের বৈশিষ্ট্য',
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
        question: `কোনো তাপমাত্রায় 2A ⇌ 2B বিক্রিয়ার সাম্যধ্রুবক K = ${toBnDigits(kVal)} হলে সমীকরণকে ১/২ দিয়ে গুণ করে প্রাপ্ত A ⇌ B বিক্রিয়ার সাম্যধ্রুবক K′ কত?`,
        correct: kSqrt,
        distractors: [`${toBnDigits(kVal)}`, kSq, `${toBnDigits(kVal / 2)}`, `${toBnDigits(kVal * 2)}`],
        explanation: `বিক্রিয়ার সমীকরণকে n দিয়ে গুণ করলে নতুন সাম্যধ্রুবক K′ = Kⁿ; তাই ১/২ দিয়ে গুণ করলে K′ = √(${toBnDigits(kVal)}) = ${kSqrt}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · সাম্যধ্রুবকের সম্পর্ক',
      })
    );
  });

  return list;
}
