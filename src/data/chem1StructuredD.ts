import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredD(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sd_${String(seq++).padStart(4, '0')}`;

  // 1. Lab Apparatus, Precision, Primary/Secondary Standards & Hazards (Ch 1, ~75 MCQs)
  const labItems = [
    { item: 'অ্যানালার অক্সালিক অ্যাসিড (H₂C₂O₄·2H₂O)', cls: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ', why: 'বাতাসের আর্দ্রতা শোষণ করে না, বিশুদ্ধ ও আণবিক ভর দীর্ঘদিন অপরিবর্তিত থাকে।' },
    { item: 'অনার্দ্র সোডিয়াম কার্বনেট (Na₂CO₃)', cls: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ', why: 'উচ্চ বিশুদ্ধতায় পাওয়া যায় এবং দীর্ঘদিন ওজন ও ঘনমাত্রা স্থির থাকে।' },
    { item: 'পটাশিয়াম ডাইক্রোমেট (K₂Cr₂O₇)', cls: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ', why: 'জারক প্রাইমারি স্ট্যান্ডার্ড হিসেবে সরাসরি প্রমাণ দ্রবণ তৈরিতে ব্যবহৃত হয়।' },
    { item: 'সোডিয়াম হাইড্রোক্সাইড (NaOH)', cls: 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ', why: 'জলগ্রাহী (ডেলিকোয়েসেন্ট) ও বায়ুর CO₂ শোষণ করে বলে প্রমাণীকরণ প্রয়োজন হয়।' },
    { item: 'পটাশিয়াম পারম্যাঙ্গানেট (KMnO₄)', cls: 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ', why: 'আলো ও জৈব পদার্থের সংস্পর্শে MnO₂-তে বিয়োজিত হয় বলে ঘনমাত্রা স্থির থাকে না।' },
    { item: 'গাঢ় সালফিউরিক অ্যাসিড (H₂SO₄) ও HCl', cls: 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ', why: 'উদ্বায়ী বা জলগ্রাহী প্রকৃতির হওয়ায় সরাসরি মেপে প্রমাণ দ্রবণ তৈরি করা যায় না।' },
    { item: 'সোডিয়াম থায়োসালফেট (Na₂S₂O₃·5H₂O)', cls: 'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ', why: 'স্ফটিক পানি হারাতে পারে ও CO₂-এর প্রভাবে সালফার অধঃক্ষেপ দিয়ে বিয়োজিত হয়।' },
    { item: 'পটাশিয়াম হাইড্রোজেন থ্যালেট (KHP)', cls: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থ', why: 'NaOH দ্রবণের প্রমাণীকরণে অতি নির্ভরযোগ্য প্রাইমারি অ্যাসিড স্ট্যান্ডার্ড।' },
  ];
  labItems.forEach((li, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `টাইট্রেশনের প্রমাণ দ্রবণ প্রস্তুতিতে "${li.item}" কোন শ্রেণির পদার্থ?`,
        correct: li.cls,
        distractors: [
          'প্রাইমারি স্ট্যান্ডার্ড পদার্থ',
          'সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ',
          'শুষ্ককারী ডেসিক্যান্ট পদার্থ',
          'অম্ল-ক্ষার নির্দেশক পদার্থ',
        ],
        explanation: `${li.item} একটি ${li.cls}। কারণ: ${li.why}`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · প্রমাণ দ্রবণ',
      })
    );
  });

  const glasswareUses = [
    { tool: 'আয়তনিক বা ভলিউমেট্রিক ফ্লাস্ক', use: 'নির্দিষ্ট আয়তনের প্রমাণ (মোলার) দ্রবণ প্রস্তুতকরণ', err: '±০.১ mL (২৫০ mL-এ)' },
    { tool: 'বুরেট (Burette, ৫০ mL)', use: 'টাইট্রেশনের সময় ফোঁটায় ফোঁটায় চলমান আয়তন পরিমাপ', err: '±০.০৫ mL (ক্ষুদ্রতম পাঠ ০.১ mL)' },
    { tool: 'ভলিউমেট্রিক পিপেট (২৫ mL)', use: 'এক পাত্র থেকে অন্য পাত্রে নির্দিষ্ট আয়তন দ্রবণ নির্ভুল স্থানান্তর', err: '±০.০৩ mL (TD চিহ্নযুক্ত)' },
    { tool: 'মাপচোঙ (Graduated Cylinder)', use: 'অপেক্ষাকৃত কম সূক্ষ্মতায় আনুমানিক আয়তনের তরল পরিমাপ', err: '±০.৫ থেকে ±১.০ mL' },
    { tool: 'কনিক্যাল বা আর্লেনমেয়ার ফ্লাস্ক', use: 'টাইট্রেশনের দ্রবণ ধারণ ও ছিটকে পড়া রোধ করে ঘোরানো', err: 'আয়তনমাপক নয় (প্রায় ২০% সহনসীমা)' },
    { tool: 'ডেসিক্যাটর (Desiccator)', use: 'অনাদ্র CaCl₂ বা সিলিকা জেল রেখে গরম ক্রুসিবল ও লবণ শুষ্ক সংরক্ষণ', err: 'আর্দ্রতামুক্ত পরিবেশ সৃষ্টি' },
    { tool: 'পোরসেলিন ক্রুসিবল (Crucible)', use: 'উচ্চ তাপমাত্রায় (~১০০০ °C) অধঃক্ষেপ ভস্মীকরণ ও শুষ্ককরণ', err: 'তাপ-সহনশীল পাত্র' },
    { tool: 'সেন্ট্রিফিউজ মেশিন (Centrifuge)', use: 'সেমি-মাইক্রো বিশ্লেষণে দ্রুত অধঃক্ষেপ ও সুপারনেট্যান্ট পৃথকীকরণ', err: 'ঘূর্ণন গতি ৩০০০–৪০০০ rpm' },
    { tool: 'কিপস অ্যাপারেটাস (Kipp’s Apparatus)', use: 'FeS + লঘু H₂SO₄ থেকে চাহিদামাফিক H₂S গ্যাস উৎপাদন', err: 'স্বয়ংক্রিয় গ্যাস নিয়ন্ত্রক' },
    { tool: 'ফিউম হুড (Fume Hood)', use: 'বিষাক্ত, ঝাঁঝালো বা ক্ষতিকর গ্যাস (H₂S, Cl₂, Br₂, NO₂) নিরাপদে অপসারণ', err: 'বায়ু প্রবাহ নিয়ন্ত্রিত চেম্বার' },
  ];
  const allToolNames = glasswareUses.map((g) => g.tool);
  glasswareUses.forEach((g, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `রসায়ন পরীক্ষাগারে "${g.use}"-এর জন্য সবচেয়ে উপযোগী যন্ত্র বা পাত্র কোনটি?`,
        correct: g.tool,
        distractors: allToolNames.filter((t) => t !== g.tool).slice(i % 6, (i % 6) + 4),
        explanation: `${g.tool}-এর প্রধান কাজ হলো ${g.use} (${g.err})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · ল্যাব যন্ত্রপাতি',
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
        question: `ল্যাবরেটরিতে "${g.tool}" ব্যবহারের ক্ষেত্রে নিচের কোন তথ্যটি সঠিক?`,
        correct: `${g.use} (${g.err})`,
        distractors: glasswareUses
          .filter((x) => x.tool !== g.tool)
          .slice((i + 1) % 5, ((i + 1) % 5) + 4)
          .map((x) => `${x.use} (${x.err})`),
        explanation: `${g.tool}: ${g.use} — বৈশিষ্ট্য: ${g.err}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · ল্যাবরেটরি কৌশল',
      })
    );
  });

  const ghsSymbols = [
    { sym: 'বিস্ফোরিত বোমা (Exploding Bomb)', meaning: 'বিস্ফোরক পদার্থ (পিক্রিক অ্যাসিড, TNT, নাইট্রোগ্লিসারিন, NH₄NO₃)' },
    { sym: 'বৃত্তের ওপর অগ্নিশিখা (Flame Over Circle)', meaning: 'জারক পদার্থ (KMnO₄, K₂Cr₂O₇, গাঢ় HNO₃, H₂O₂, KClO₃)' },
    { sym: 'অগ্নিশিখা (Flame)', meaning: 'দাহ্য পদার্থ (ইথার, অ্যাসিটোন, ইথানল, Na, সাদা ফসফরাস)' },
    { sym: 'মাথার খুলি ও আড়াআড়ি হাড় (Skull & Crossbones)', meaning: 'তীব্র বিষাক্ত (KCN, As₂O₃, HgCl₂, মিথানল, Cl₂ গ্যাস)' },
    { sym: 'হাত ও ধাতুর ওপর ফোঁটা (Corrosion)', meaning: 'ক্ষয়কারক পদার্থ (গাঢ় H₂SO₄, HCl, HNO₃, NaOH, KOH, Br₂)' },
    { sym: 'বিস্ময়চিহ্ন (Exclamation Mark)', meaning: 'উত্তেজক বা স্বাস্থ্যঝুঁকি (অ্যামোনিয়া, অ্যাসিটোন, চর্ম-চোখ জ্বালাপোড়া)' },
    { sym: 'মানবদেহের ভেতরে নক্ষত্র (Health Hazard)', meaning: 'দীর্ঘমেয়াদী স্বাস্থ্যঝুঁকি/কার্সিনোজেন (বেনজিন, ফর্মালডিহাইড, Cr⁶⁺)' },
    { sym: 'গ্যাস সিলিন্ডার (Gas Cylinder)', meaning: 'উচ্চ চাপে সংরক্ষিত গ্যাস (LPG, N₂, O₂, H₂ সিলিন্ডার)' },
  ];
  ghsSymbols.forEach((gs, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `আন্তর্জাতিক GHS হ্যাজার্ড প্রতীক "${gs.sym}" রাসায়নিক বোতলের গায়ে কী নির্দেশ করে?`,
        correct: gs.meaning,
        distractors: ghsSymbols.filter((x) => x.sym !== gs.sym).slice(i % 4, (i % 4) + 4).map((x) => x.meaning),
        explanation: `${gs.sym} চিহ্নটি ${gs.meaning} বোঝাতে ব্যবহৃত হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · হ্যাজার্ড প্রতীক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${gs.meaning}" — এই ঝুঁকি বোঝাতে কোন GHS বিপদ-সংকেত প্রতীক ব্যবহার করা হয়?`,
        correct: gs.sym,
        distractors: ghsSymbols.filter((x) => x.sym !== gs.sym).slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.sym),
        explanation: `${gs.meaning}-এর জন্য নির্ধারিত GHS প্রতীক হলো ${gs.sym}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · ল্যাব নিরাপত্তা',
      })
    );
  });

  // 2. Quantum Numbers, Subshells, Nodes & Aufbau Drills (Ch 2, ~110 MCQs)
  const quantumSets = [
    { n: 3, l: 2, m: -2, s: '+½', valid: 'সম্ভব (3d অরবিটালের ইলেকট্রন)' },
    { n: 4, l: 3, m: 3, s: '-½', valid: 'সম্ভব (4f অরবিটালের ইলেকট্রন)' },
    { n: 2, l: 2, m: 0, s: '+½', valid: 'অসম্ভব (l কখনো n-এর সমান হতে পারে না)' },
    { n: 3, l: 1, m: 2, s: '+½', valid: 'অসম্ভব (l = ১ হলে |m| ≤ ১, m = ২ সম্ভব নয়)' },
    { n: 4, l: 0, m: 1, s: '-½', valid: 'অসম্ভব (l = ০ হলে m কেবল ০ হতে পারে)' },
    { n: 1, l: 0, m: 0, s: '0', valid: 'অসম্ভব (s-এর মান কেবল +½ বা −½ হতে পারে)' },
    { n: 0, l: 0, m: 0, s: '+½', valid: 'অসম্ভব (প্রধান কোয়ান্টাম সংখ্যা n ≥ ১ হতে হয়)' },
    { n: 5, l: 3, m: -3, s: '+½', valid: 'সম্ভব (5f অরবিটালের ইলেকট্রন)' },
    { n: 2, l: 1, m: -1, s: '-½', valid: 'সম্ভব (2p অরবিটালের ইলেকট্রন)' },
    { n: 3, l: 2, m: -3, s: '+½', valid: 'অসম্ভব (l = ২ এর জন্য m = −২ থেকে +২)' },
    { n: 4, l: 2, m: 0, s: '+½', valid: 'সম্ভব (4d অরবিটালের ইলেকট্রন)' },
    { n: 3, l: -1, m: 0, s: '+½', valid: 'অসম্ভব (সহকারী কোয়ান্টাম সংখ্যা l ঋণাত্মক হয় না)' },
  ];
  const invalidReasons = quantumSets.map((q) => q.valid);
  quantumSets.forEach((qs, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `কোয়ান্টাম সংখ্যার সেট (n = ${toBnDigits(qs.n)}, l = ${toBnDigits(qs.l)}, m = ${toBnDigits(qs.m)}, s = ${qs.s}) সম্পর্কে কোন মন্তব্যটি সঠিক?`,
        correct: qs.valid,
        distractors: invalidReasons.filter((r) => r !== qs.valid).slice(i % 6, (i % 6) + 4),
        explanation: `n ≥ ১, l ∈ {০ .. n−১}, m ∈ {−l .. +l}, s ∈ {+½, −½}; তাই সেটটি ${qs.valid}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · কোয়ান্টাম সংখ্যা',
      })
    );
  });

  const subshellList = [
    { name: '1s', n: 1, l: 0, orbs: 1, maxE: 2, radNodes: 0, angNodes: 0 },
    { name: '2s', n: 2, l: 0, orbs: 1, maxE: 2, radNodes: 1, angNodes: 0 },
    { name: '2p', n: 2, l: 1, orbs: 3, maxE: 6, radNodes: 0, angNodes: 1 },
    { name: '3s', n: 3, l: 0, orbs: 1, maxE: 2, radNodes: 2, angNodes: 0 },
    { name: '3p', n: 3, l: 1, orbs: 3, maxE: 6, radNodes: 1, angNodes: 1 },
    { name: '3d', n: 3, l: 2, orbs: 5, maxE: 10, radNodes: 0, angNodes: 2 },
    { name: '4s', n: 4, l: 0, orbs: 1, maxE: 2, radNodes: 3, angNodes: 0 },
    { name: '4p', n: 4, l: 1, orbs: 3, maxE: 6, radNodes: 2, angNodes: 1 },
    { name: '4d', n: 4, l: 2, orbs: 5, maxE: 10, radNodes: 1, angNodes: 2 },
    { name: '4f', n: 4, l: 3, orbs: 7, maxE: 14, radNodes: 0, angNodes: 3 },
    { name: '5s', n: 5, l: 0, orbs: 1, maxE: 2, radNodes: 4, angNodes: 0 },
    { name: '5p', n: 5, l: 1, orbs: 3, maxE: 6, radNodes: 3, angNodes: 1 },
    { name: '5d', n: 5, l: 2, orbs: 5, maxE: 10, radNodes: 2, angNodes: 2 },
    { name: '5f', n: 5, l: 3, orbs: 7, maxE: 14, radNodes: 1, angNodes: 3 },
  ];
  subshellList.forEach((sb, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `${sb.name} উপশক্তিস্তরের (Subshell) অরীয় বা গোলকীয় নোড (n − l − 1) এবং কৌণিক নোডের (l) সংখ্যা যথাক্রমে কত?`,
        correct: `${toBnDigits(sb.radNodes)}টি ও ${toBnDigits(sb.angNodes)}টি`,
        distractors: ['০টি ও ০টি', '১টি ও ০টি', '১টি ও ১টি', '২টি ও ১টি', '০টি ও ২টি', '২টি ও ২টি', '৩টি ও ১টি', '১টি ও ৩টি'].filter(
          (x) => x !== `${toBnDigits(sb.radNodes)}টি ও ${toBnDigits(sb.angNodes)}টি`
        ),
        explanation: `${sb.name}-এর জন্য n = ${toBnDigits(sb.n)}, l = ${toBnDigits(sb.l)}; তাই অরীয় নোড = ${toBnDigits(sb.n)}−${toBnDigits(sb.l)}−১ = ${toBnDigits(sb.radNodes)} এবং কৌণিক নোড = ${toBnDigits(sb.angNodes)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · অরবিটাল নোড',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${sb.name} উপস্তরে (n = ${toBnDigits(sb.n)}, l = ${toBnDigits(sb.l)}) (n + l)-এর মান এবং অরবিটাল সংখ্যা কত?`,
        correct: `n + l = ${toBnDigits(sb.n + sb.l)}, অরবিটাল ${toBnDigits(sb.orbs)}টি (সর্বোচ্চ ${toBnDigits(sb.maxE)}টি e⁻)`,
        distractors: [1, 2, 3, 4, 5, 6, 7, 8]
          .filter((x) => x !== sb.n + sb.l)
          .slice(0, 4)
          .map((x, idx) => {
            const altOrbs = [1, 3, 5, 7][(i + idx) % 4];
            return `n + l = ${toBnDigits(x)}, অরবিটাল ${toBnDigits(altOrbs)}টি (সর্বোচ্চ ${toBnDigits(altOrbs * 2)}টি e⁻)`;
          }),
        explanation: `অরবিটাল সংখ্যা = (2l + 1) = ${toBnDigits(sb.orbs)} এবং সর্বোচ্চ ইলেকট্রন = 2(2l + 1) = ${toBnDigits(sb.maxE)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · আউফবাউ ও উপস্তর',
      })
    );
  });

  // Unpaired electrons in d-block ions (20 MCQs)
  const ionsUnpaired = [
    { ion: 'Sc³⁺ (Z = ২১)', cfg: '[Ar] 3d⁰', unpaired: 0, color: 'বর্ণহীন ও ডায়াচৌম্বক' },
    { ion: 'Ti³⁺ (Z = ২২)', cfg: '[Ar] 3d¹', unpaired: 1, color: 'বেগুনি ও প্যারাচৌম্বক' },
    { ion: 'V³⁺ (Z = ২৩)', cfg: '[Ar] 3d²', unpaired: 2, color: 'সবুজ ও প্যারাচৌম্বক' },
    { ion: 'Cr³⁺ (Z = ২৪)', cfg: '[Ar] 3d³', unpaired: 3, color: 'সবুজ/বেগুনি ও প্যারাচৌম্বক' },
    { ion: 'Mn²⁺ (Z = ২৫)', cfg: '[Ar] 3d⁵', unpaired: 5, color: 'হালকা গোলাপি ও সর্বোচ্চ প্যারাচৌম্বক' },
    { ion: 'Fe³⁺ (Z = ২৬)', cfg: '[Ar] 3d⁵', unpaired: 5, color: 'হলদে-বাদামি ও প্যারাচৌম্বক' },
    { ion: 'Fe²⁺ (Z = ২৬)', cfg: '[Ar] 3d⁶', unpaired: 4, color: 'হালকা সবুজ ও প্যারাচৌম্বক' },
    { ion: 'Co²⁺ (Z = ২৭)', cfg: '[Ar] 3d⁷', unpaired: 3, color: 'গোলাপি ও প্যারাচৌম্বক' },
    { ion: 'Ni²⁺ (Z = ২৮)', cfg: '[Ar] 3d⁸', unpaired: 2, color: 'সবুজ ও প্যারাচৌম্বক' },
    { ion: 'Cu²⁺ (Z = ২৯)', cfg: '[Ar] 3d⁹', unpaired: 1, color: 'নীল ও প্যারাচৌম্বক' },
    { ion: 'Cu⁺ (Z = ২৯)', cfg: '[Ar] 3d¹⁰', unpaired: 0, color: 'বর্ণহীন ও ডায়াচৌম্বক' },
    { ion: 'Zn²⁺ (Z = ৩০)', cfg: '[Ar] 3d¹⁰', unpaired: 0, color: 'বর্ণহীন ও ডায়াচৌম্বক' },
  ];
  ionsUnpaired.forEach((iu, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${iu.ion} আয়নের গ্রাউন্ড স্টেটে (${iu.cfg}) কয়টি বিজোড় d-ইলেকট্রন বিদ্যমান?`,
        correct: `${toBnDigits(iu.unpaired)}টি (${iu.color})`,
        distractors: [0, 1, 2, 3, 4, 5]
          .filter((x) => x !== iu.unpaired)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)}টি`),
        explanation: `${iu.ion} = ${iu.cfg}; হুন্ডের নীতি অনুসারে ৫টি d-অরবিটালে ${toBnDigits(iu.unpaired)}টি বিজোড় ইলেকট্রন থাকে এবং আয়নটি ${iu.color}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অবস্থান্তর আয়ন',
      })
    );
  });

  // 3. Rydberg Spectral Transitions (Ch 2, ~45 MCQs)
  const transitions = [
    { n2: 2, n1: 1, series: 'লাইম্যান (অতিবেগুনি / UV)', line: '১ম লাইন (সবচেয়ে দীর্ঘ তরঙ্গদৈর্ঘ্য, ১২১.৬ nm)' },
    { n2: 3, n1: 1, series: 'লাইম্যান (অতিবেগুনি / UV)', line: '২য় লাইন (Lyman-β, ১০২.৬ nm)' },
    { n2: 4, n1: 1, series: 'লাইম্যান (অতিবেগুনি / UV)', line: '৩য় লাইন (Lyman-γ, ৯৭.২ nm)' },
    { n2: 3, n1: 2, series: 'বামার (দৃশ্যমান / Visible)', line: 'Hα লাল রেখা (১ম লাইন, ৬৫৬.৩ nm)' },
    { n2: 4, n1: 2, series: 'বামার (দৃশ্যমান / Visible)', line: 'Hβ নীল-সবুজ রেখা (২য় লাইন, ৪৮৬.১ nm)' },
    { n2: 5, n1: 2, series: 'বামার (দৃশ্যমান / Visible)', line: 'Hγ নীল রেখা (৩য় লাইন, ৪৩৪.০ nm)' },
    { n2: 6, n1: 2, series: 'বামার (দৃশ্যমান / Visible)', line: 'Hδ বেগুনি রেখা (৪র্থ লাইন, ৪১০.২ nm)' },
    { n2: 4, n1: 3, series: 'প্যাসচেন (অবলোহিত / Near-IR)', line: '১ম লাইন (১৮৭৫ nm)' },
    { n2: 5, n1: 3, series: 'প্যাসচেন (অবলোহিত / Near-IR)', line: '২য় লাইন (১২৮২ nm)' },
    { n2: 5, n1: 4, series: 'ব্র্যাকেট (অবলোহিত / IR)', line: '১ম লাইন (৪০৫১ nm)' },
    { n2: 6, n1: 5, series: 'ফুন্ড (দূর অবলোহিত / Far-IR)', line: '১ম লাইন (৭৪৬০ nm)' },
    { n2: 7, n1: 6, series: 'হাম্ফ্রিস (দূর অবলোহিত / Far-IR)', line: '১ম লাইন (১২৩৭০ nm)' },
  ];
  const seriesNames = [
    'লাইম্যান (অতিবেগুনি / UV)',
    'বামার (দৃশ্যমান / Visible)',
    'প্যাসচেন (অবলোহিত / Near-IR)',
    'ব্র্যাকেট (অবলোহিত / IR)',
    'ফুন্ড (দূর অবলোহিত / Far-IR)',
    'হাম্ফ্রিস (দূর অবলোহিত / Far-IR)',
  ];
  transitions.forEach((tr, i) => {
    const num = tr.n2 * tr.n2 - tr.n1 * tr.n1;
    const den = tr.n1 * tr.n1 * tr.n2 * tr.n2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `হাইড্রোজেন পরমাণুতে ইলেকট্রন n₂ = ${toBnDigits(tr.n2)} থেকে n₁ = ${toBnDigits(tr.n1)} শক্তিস্তরে নেমে এলে কোন বর্ণালি সিরিজ সৃষ্টি হয়?`,
        correct: tr.series,
        distractors: seriesNames.filter((s) => s !== tr.series).slice(0, 4),
        explanation: `n₁ = ${toBnDigits(tr.n1)}-এ নেমে এলে ${tr.series}-এর ${tr.line} তৈরি হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · হাইড্রোজেন বর্ণালি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `হাইড্রোজেনে n₂ = ${toBnDigits(tr.n2)} → n₁ = ${toBnDigits(tr.n1)} ইলেকট্রন স্থানান্তরে বিকিরিত ফোটনের তরঙ্গসংখ্যা (1/λ) R_H-এর কত গুণ?`,
        correct: `${toBnDigits(num)}/${toBnDigits(den)} R_H`,
        distractors: [
          `${toBnDigits(num + 1)}/${toBnDigits(den)} R_H`,
          `${toBnDigits(num)}/${toBnDigits(den + 4)} R_H`,
          `${toBnDigits(tr.n2 - tr.n1)}/${toBnDigits(tr.n1 * tr.n2)} R_H`,
          `${toBnDigits(num + 2)}/${toBnDigits(den * 2)} R_H`,
        ],
        explanation: `রিডবার্গ সূত্র ν̄ = R_H (1/n₁² − 1/n₂²) = R_H (1/${toBnDigits(tr.n1 * tr.n1)} − 1/${toBnDigits(tr.n2 * tr.n2)}) = (${toBnDigits(num)}/${toBnDigits(den)}) R_H।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · রিডবার্গ সমীকরণ',
      })
    );
  });

  // Total spectral lines when electron drops from n to ground state: n(n-1)/2
  for (let n = 3; n <= 8; n++) {
    const lines = (n * (n - 1)) / 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'dental',
        question: `হাইড্রোজেন পরমাণুতে কোনো ইলেকট্রন n = ${toBnDigits(n)} শক্তিস্তর থেকে ভূমি-স্তরে (n = ১) ফিরে এলে সর্বোচ্চ কতটি বর্ণালি রেখা পাওয়া যেতে পারে?`,
        correct: `${toBnDigits(lines)}টি`,
        distractors: [lines - 2, lines - 1, lines + 2, lines + 4, n * 2].filter((x) => x > 0 && x !== lines).map((x) => `${toBnDigits(x)}টি`),
        explanation: `n-তম স্তর থেকে গ্রাউন্ড স্টেটে মোট বর্ণালি রেখার সংখ্যা = n(n − 1)/2 = ${toBnDigits(n)}×${toBnDigits(n - 1)}/2 = ${toBnDigits(lines)}টি।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বর্ণালি রেখা গণনা',
      })
    );
  }

  // 4. Hybridization, VSEPR Geometry & Bond Angle Matrix (Ch 3, ~90 MCQs)
  const vseprSpecies = [
    { mol: 'BeCl₂ (গ্যাসীয়)', hyb: 'sp', shape: 'সরলরৈখিক', angle: '১৮০°', lp: '০টি' },
    { mol: 'CO₂', hyb: 'sp', shape: 'সরলরৈখিক', angle: '১৮০°', lp: '০টি' },
    { mol: 'C₂H₂ (ইথাইন)', hyb: 'sp', shape: 'সরলরৈখিক', angle: '১৮০°', lp: '০টি' },
    { mol: 'BF₃ / BCl₃', hyb: 'sp²', shape: 'ত্রিকোণাকার সমতলীয়', angle: '১২০°', lp: '০টি' },
    { mol: 'C₂H₄ (ইথিন)', hyb: 'sp²', shape: 'ত্রিকোণাকার সমতলীয়', angle: '১২০°', lp: '০টি' },
    { mol: 'SO₃', hyb: 'sp²', shape: 'ত্রিকোণাকার সমতলীয়', angle: '১২০°', lp: '০টি' },
    { mol: 'SO₂ / O₃ / SnCl₂', hyb: 'sp²', shape: 'কৌণিক বা V-আকৃতির', angle: '১১৯° (প্রায় ১২০° থেকে কম)', lp: '১টি' },
    { mol: 'CH₄ / CCl₄ / NH₄⁺', hyb: 'sp³', shape: 'সুষম চতুস্তলকীয়', angle: '১০৯.৫° (১০৯°২৮′)', lp: '০টি' },
    { mol: 'NH₃ / H₃O⁺ / NF₃', hyb: 'sp³', shape: 'ত্রিকোণাকার পিরামিডীয়', angle: '১০৭° (NH₃) / ১০২.৫° (NF₃)', lp: '১টি' },
    { mol: 'H₂O / OF₂', hyb: 'sp³', shape: 'কৌণিক বা বেন্ট (V-আকৃতি)', angle: '১০৪.৫°', lp: '২টি' },
    { mol: 'PCl₅ (গ্যাসীয়)', hyb: 'sp³d', shape: 'ত্রিকোণাকার দ্বিপিরামিডীয়', angle: '৯০° ও ১২০°', lp: '০টি' },
    { mol: 'SF₄', hyb: 'sp³d', shape: 'ঢেঁকিকল বা সি-স (See-saw)', angle: '<৯০° ও <১২০°', lp: '১টি' },
    { mol: 'ClF₃ / BrF₃', hyb: 'sp³d', shape: 'T-আকৃতির (T-shaped)', angle: '৮৭.৫° (~৯০°)', lp: '২টি' },
    { mol: 'XeF₂ / I₃⁻', hyb: 'sp³d', shape: 'সরলরৈখিক', angle: '১৮০°', lp: '৩টি' },
    { mol: 'SF₆ / [Co(NH₃)₆]³⁺', hyb: 'sp³d²', shape: 'অষ্টতলকীয় (Octahedral)', angle: '৯০°', lp: '০টি' },
    { mol: 'BrF₅ / IF₅', hyb: 'sp³d²', shape: 'বর্গাকার পিরামিডীয়', angle: '৮৪.৮° (<৯০°)', lp: '১টি' },
    { mol: 'XeF₄ / [Ni(CN)₄]²⁻', hyb: 'sp³d² (বা dsp²)', shape: 'সমতলীয় বর্গাকার', angle: '৯০°', lp: '২টি (XeF₄-এ)' },
    { mol: 'IF₇', hyb: 'sp³d³', shape: 'পঞ্চভুজীয় দ্বিপিরামিডীয়', angle: '৭২° ও ৯০°', lp: '০টি' },
    { mol: '[Cu(NH₃)₄]²⁺', hyb: 'dsp²', shape: 'সমতলীয় বর্গাকার', angle: '৯০°', lp: '০টি' },
    { mol: '[Ni(CO)₄]', hyb: 'sp³', shape: 'সুষম চতুস্তলকীয়', angle: '১০৯.৫°', lp: '০টি' },
  ];
  const allShapes = Array.from(new Set(vseprSpecies.map((v) => v.shape)));
  const allHybs = ['sp', 'sp²', 'sp³', 'sp³d', 'sp³d²', 'sp³d³', 'dsp²'];
  vseprSpecies.forEach((v, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `VSEPR তত্ত্ব অনুসারে ${v.mol}-এর জ্যামিতিক আকৃতি ও বন্ধন কোণ কোনটি?`,
        correct: `${v.shape} (${v.angle})`,
        distractors: allShapes
          .filter((s) => s !== v.shape)
          .slice(i % 7, (i % 7) + 4)
          .map((s) => `${s}`),
        explanation: `${v.mol}-এ কেন্দ্রীয় পরমাণু ${v.hyb} সংকরিত ও নিঃসঙ্গ ইলেকট্রন জোড় ${v.lp}; তাই আকৃতি ${v.shape} ও বন্ধন কোণ ${v.angle}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · সংকরায়ন ও আকৃতি',
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
        question: `${v.mol} অণু বা আয়নের কেন্দ্রীয় পরমাণুতে কোন ধরনের সংকরায়ন (Hybridization) ঘটে?`,
        correct: v.hyb,
        distractors: allHybs.filter((h) => h !== v.hyb).slice(i % 3, (i % 3) + 4),
        explanation: `${v.mol}-এর স্টেরিক সংখ্যা ও জ্যামিতি (${v.shape}) অনুযায়ী সংকরায়ন হলো ${v.hyb}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · সংকরায়ন',
      })
    );
  });

  // 5. Oxide Acid-Base-Amphoteric Classification (Ch 3, ~30 MCQs)
  const oxides = [
    { ox: 'Na₂O / K₂O / CaO / MgO', cls: 'ক্ষারীয় অক্সাইড' },
    { ox: 'CO₂ / SO₂ / SO₃ / P₄O₁₀ / Cl₂O₇', cls: 'অম্লীয় অক্সাইড' },
    { ox: 'Al₂O₃ / ZnO / BeO', cls: 'উভধর্মী (Amphoteric) অক্সাইড' },
    { ox: 'SnO / PbO / Cr₂O₃', cls: 'উভধর্মী (Amphoteric) অক্সাইড' },
    { ox: 'CO / NO / N₂O', cls: 'নিরপেক্ষ (Neutral) অক্সাইড' },
    { ox: 'N₂O₅ / N₂O₃ / NO₂', cls: 'অম্লীয় অক্সাইড' },
    { ox: 'CrO₃ / Mn₂O₇', cls: 'তীব্র অম্লীয় ধাতব অক্সাইড' },
    { ox: 'Fe₃O₄ / Pb₃O₄', cls: 'মিশ্র অক্সাইড (Mixed Oxide)' },
    { ox: 'Na₂O₂ / BaO₂', cls: 'পার-অক্সাইড (O₂²⁻ আয়নযুক্ত)' },
    { ox: 'KO₂ / RbO₂', cls: 'সুপার-অক্সাইড (O₂⁻ আয়নযুক্ত)' },
  ];
  const oxClasses = Array.from(new Set(oxides.map((o) => o.cls)));
  oxides.forEach((ox, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `অম্ল-ক্ষারক ধর্ম ও গঠন অনুসারে "${ox.ox}" কোন শ্রেণির অক্সাইড?`,
        correct: ox.cls,
        distractors: oxClasses.filter((c) => c !== ox.cls).slice(0, 4),
        explanation: `${ox.ox} হলো ${ox.cls}।`,
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
        difficulty: 'dental',
        question: `নিচের কোন অক্সাইড গুচ্ছটি "${ox.cls}"-এর অন্তর্ভুক্ত?`,
        correct: ox.ox,
        distractors: oxides.filter((x) => x.cls !== ox.cls).slice(i % 4, (i % 4) + 4).map((x) => x.ox),
        explanation: `${ox.cls}-এর সঠিক উদাহরণ হলো ${ox.ox}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অক্সাইডের ধর্ম',
      })
    );
  });

  // 6. Periodic Trends & Diagonal/Fajan Comparisons (Ch 3, ~30 MCQs)
  const trends = [
    { q: 'দ্বিতীয় পর্যায়ের মৌলগুলোর প্রথম আয়নিকরণ শক্তির (IE₁) সঠিক ক্রম কোনটি?', a: 'Li < B < Be < C < O < N < F < Ne', d: ['Li < Be < B < C < N < O < F < Ne', 'Ne < F < N < O < C < Be < B < Li', 'Li < B < Be < C < N < O < F < Ne'] },
    { q: 'হ্যালোজেনসমূহের ইলেকট্রন আসক্তির সঠিক ক্রম কোনটি?', a: 'Cl > F > Br > I', d: ['F > Cl > Br > I', 'I > Br > Cl > F', 'F > Br > Cl > I'] },
    { q: '১৬ নং গ্রুপের চালকোজেন মৌলগুলোর ইলেকট্রন আসক্তির সঠিক ক্রম কোনটি?', a: 'S > Se > Te > Po > O', d: ['O > S > Se > Te > Po', 'Te > Se > S > O', 'O > Se > S > Te'] },
    { q: 'পাউলিং স্কেলে তড়িৎ ঋণাত্মকতার সঠিক ক্রম কোনটি?', a: 'F (৪.০) > O (৩.৫) > N = Cl (৩.০) > Br (২.৮)', d: ['F > Cl > O > N', 'O > F > Cl > N', 'Cl > F > O > N'] },
    { q: 'সমইলেকট্রনিক আয়নসমূহের (১০টি e⁻) আয়নিক ব্যাসার্ধের সঠিক ক্রম কোনটি?', a: 'N³⁻ > O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺', d: ['Al³⁺ > Mg²⁺ > Na⁺ > F⁻ > O²⁻ > N³⁻', 'F⁻ > O²⁻ > N³⁻ > Na⁺ > Mg²⁺ > Al³⁺', 'Na⁺ > Mg²⁺ > Al³⁺ > N³⁻ > O²⁻ > F⁻'] },
    { q: 'ফাজানের নীতি অনুযায়ী নিচের ক্লোরাইডগুলোর সমযোজী চরিত্রের সঠিক ক্রম কোনটি?', a: 'LiCl > NaCl > KCl > RbCl', d: ['RbCl > KCl > NaCl > LiCl', 'NaCl > KCl > LiCl > RbCl', 'KCl > RbCl > NaCl > LiCl'] },
    { q: 'চার্জ ঘনত্ব বৃদ্ধির সাথে সাথে পোলারায়ন ও সমযোজী চরিত্রের সঠিক ক্রম কোনটি?', a: 'AlCl₃ > MgCl₂ > NaCl', d: ['NaCl > MgCl₂ > AlCl₃', 'MgCl₂ > AlCl₃ > NaCl', 'AlCl₃ > NaCl > MgCl₂'] },
    { q: 'আয়নিক লবণের গলনাঙ্কের সঠিক ক্রম (হ্যালাইডের পোলারায়নের ভিত্তিতে) কোনটি?', a: 'NaF > NaCl > NaBr > NaI', d: ['NaI > NaBr > NaCl > NaF', 'NaCl > NaF > NaBr > NaI', 'NaBr > NaI > NaCl > NaF'] },
    { q: 'ক্ষারীয় মৃত্তিকা ধাতুর কার্বনেটসমূহের তাপীয় স্থায়িত্বের সঠিক ক্রম কোনটি?', a: 'BeCO₃ < MgCO₃ < CaCO₃ < SrCO₃ < BaCO₃', d: ['BaCO₃ < SrCO₃ < CaCO₃ < MgCO₃ < BeCO₃', 'CaCO₃ < MgCO₃ < BeCO₃ < BaCO₃', 'MgCO₃ < BeCO₃ < CaCO₃ < BaCO₃'] },
    { q: 'হাইড্রোহ্যালিক অ্যাসিডসমূহের বিজারণ ক্ষমতা ও অম্লত্বের সঠিক ক্রম কোনটি?', a: 'HI > HBr > HCl > HF', d: ['HF > HCl > HBr > HI', 'HCl > HBr > HI > HF', 'HF > HI > HBr > HCl'] },
    { q: 'গ্রুপ-১৫ হাইড্রাইডসমূহের ক্ষারকীয় শক্তির সঠিক ক্রম কোনটি?', a: 'NH₃ > PH₃ > AsH₃ > SbH₃ > BiH₃', d: ['BiH₃ > SbH₃ > AsH₃ > PH₃ > NH₃', 'PH₃ > NH₃ > AsH₃ > SbH₃', 'AsH₃ > PH₃ > NH₃ > BiH₃'] },
    { q: 'অক্সিজেন প্রজাতিগুলোর O–O বন্ধন দৈর্ঘ্যের সঠিক ক্রম কোনটি (বন্ধন ক্রমের বিপরীত)?', a: 'O₂²⁻ (১.৪৯ Å) > O₂⁻ (১.৩৩ Å) > O₂ (১.২১ Å) > O₂⁺ (১.১২ Å)', d: ['O₂⁺ > O₂ > O₂⁻ > O₂²⁻', 'O₂ > O₂⁺ > O₂⁻ > O₂²⁻', 'O₂⁻ > O₂²⁻ > O₂⁺ > O₂'] },
    { q: 'পোলার অণুগুলোর মধ্যে কোনটির হাইড্রোজেন বন্ধন শক্তি সবচেয়ে বেশি?', a: 'H–F···H (প্রায় ৪১.৮ kJ/mol)', d: ['H–O···H', 'H–N···H', 'H–Cl···H'] },
    { q: 'জলীয় দ্রবণে ক্ষার ধাতু আয়নগুলোর গতিশীলতা (হাইড্রেটেড আকারের বিপরীত) কোনটি সঠিক?', a: 'Cs⁺ > Rb⁺ > K⁺ > Na⁺ > Li⁺', d: ['Li⁺ > Na⁺ > K⁺ > Rb⁺ > Cs⁺', 'K⁺ > Na⁺ > Li⁺ > Cs⁺', 'Na⁺ > K⁺ > Li⁺ > Rb⁺'] },
    { q: 'কেন্দ্রীয় পরমাণুর জারণ সংখ্যা অনুযায়ী Mn-এর অক্সাইডগুলোর অম্লত্বের ক্রম কোনটি?', a: 'MnO < MnO₂ < Mn₂O₇', d: ['Mn₂O₇ < MnO₂ < MnO', 'MnO₂ < MnO < Mn₂O₇', 'MnO < Mn₂O₇ < MnO₂'] },
  ];
  trends.forEach((tr) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: tr.q,
        correct: tr.a,
        distractors: tr.d,
        explanation: `পর্যায়বৃত্ত প্রবণতা ও রাসায়নিক বন্ধনের নিয়ম অনুযায়ী সঠিক ক্রম হলো: ${tr.a}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · প্রবণতা ও ক্রম',
      })
    );
  });

  return list;
}
