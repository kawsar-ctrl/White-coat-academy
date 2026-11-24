import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildBio2StructuredD(startSeq = 1): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = startSeq;
  const nextId = () => `bio2_sd_${String(seq++).padStart(4, '0')}`;

  // 1. WBC Differential & Plasma/Blood Volume Quantitative Calculations (~40 MCQs)
  const wbcTotals = [5000, 6000, 7000, 8000, 9000, 10000];
  wbcTotals.forEach((tot) => {
    const neut = Math.round(tot * 0.65);
    const lymph = Math.round(tot * 0.25);
    const mono = Math.round(tot * 0.05);
    const eos = Math.round(tot * 0.03);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `কোনো ব্যক্তির রক্তে মোট WBC সংখ্যা ${toBnDigits(tot)}/mm³ এবং নিউট্রোফিলের হার ৬৫% হলে প্রতি mm³ রক্তে নিউট্রোফিলের সংখ্যা কত?`,
        correct: `${toBnDigits(neut)}টি`,
        distractors: [`${toBnDigits(lymph)}টি`, `${toBnDigits(mono)}টি`, `${toBnDigits(eos)}টি`],
        explanation: `মোট WBC-এর ৬৫% নিউট্রোফিল হলে সংখ্যা = ${toBnDigits(tot)} × ০.৬৫ = ${toBnDigits(neut)}/mm³।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · শ্বেত রক্তকণিকা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একজন সুস্থ মানুষের মোট WBC ${toBnDigits(tot)}/mm³ ও লিম্ফোসাইট ২৫% হলে প্রতি ঘনমিলিমিটারে লিম্ফোসাইটের সংখ্যা কত?`,
        correct: `${toBnDigits(lymph)}টি`,
        distractors: [`${toBnDigits(neut)}টি`, `${toBnDigits(mono)}টি`, `${toBnDigits(Math.round(tot * 0.1))}টি`],
        explanation: `লিম্ফোসাইট সংখ্যা = ${toBnDigits(tot)} × ২৫% = ${toBnDigits(lymph)}/mm³।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · WBC ডিফারেন্সিয়াল কাউন্ট',
      })
    );
  });

  [4, 4.5, 5, 5.5, 6, 6.5].forEach((volL) => {
    const plasmaL = Number((volL * 0.55).toFixed(2));
    const cellL = Number((volL * 0.45).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `একজন ব্যক্তির দেহে মোট রক্তের আয়তন ${toBnDigits(volL)} লিটার হলে ৫৫% হিসেবে রক্তরস (প্লাজমা)-এর পরিমাণ কত লিটার?`,
        correct: `${toBnDigits(plasmaL)} লিটার`,
        distractors: [
          `${toBnDigits(cellL)} লিটার`,
          `${toBnDigits(Number((volL * 0.7).toFixed(2)))} লিটার`,
          `${toBnDigits(Number((volL * 0.35).toFixed(2)))} লিটার`,
        ],
        explanation: `রক্তের ৫৫% প্লাজমা এবং ৪৫% রক্তকণিকা। তাই ${toBnDigits(volL)} × ০.৫৫ = ${toBnDigits(plasmaL)} লিটার প্লাজমা।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · রক্তের উপাদান',
      })
    );
  });

  // 2. Brain Lobes, Eye Parts, Ear & Embryonic Membranes Matrix (~60 MCQs)
  const neuroSenseStructures = [
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'ফ্রন্টাল লোব (Frontal lobe)', fn: 'চিন্তা, বুদ্ধিমত্তা, কথা বলা (ব্রোকা অঞ্চল) ও ঐচ্ছিক পেশির সঞ্চালন নিয়ন্ত্রণ' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'প্যারাইটাল লোব (Parietal lobe)', fn: 'স্পর্শ, চাপ, তাপ, ব্যথা ও স্বাদ অনুভূতি গ্রহণ ও বিশ্লেষণ' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'টেম্পোরাল লোব (Temporal lobe)', fn: 'শ্রবণ, ভাষা বোঝা (ওয়ার্নিকি অঞ্চল), ঘ্রাণ ও স্মৃতি সংরক্ষণ' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'অক্সিপিটাল লোব (Occipital lobe)', fn: 'চোখ থেকে আগত দর্শন সংকেত বিশ্লেষণ ও প্রতিবিম্ব উপলব্ধি' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'পন্স (Pons Varolii)', fn: 'মধ্যমস্তিষ্ক ও মেডুলার মাঝে সেতুবন্ধন এবং শ্বাসক্রিয়ার ছন্দ (নিউমোট্যাক্সিক কেন্দ্র) নিয়ন্ত্রণ' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'কর্পাস ক্যালোসাম (Corpus callosum)', fn: 'ডান ও বাম সেরেব্রাল হেমিস্ফিয়ারের মাঝে তথ্য আদান-প্রদানকারী স্নায়ুরজ্জু' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'কর্নিয়া (Cornea)', fn: 'চোখের স্ক্লেরার সম্মুখের স্বচ্ছ, রক্তনালিবিহীন অংশ যা প্রতিসরণে প্রধান ভূমিকা রাখে ও সফলভাবে প্রতিস্থাপনযোগ্য' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'আইরিশ ও পিউপিল', fn: 'চোখের রঙিন পেশিময় পর্দা যা আলোর তীব্রতা অনুযায়ী পিউপিল ছোট-বড় করে আলো নিয়ন্ত্রণ করে' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'সিলিয়ারি বডি ও সাসপেনসরি লিগামেন্ট', fn: 'চোখের লেন্সের বক্রতা পরিবর্তন করে দূর ও কাছের বস্তু ফোকাসিং (উপযোজন) করা' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', part: 'ইউট্রিকুলাস, স্যাকুলাস ও অর্ধবৃত্তাকার নালি', fn: 'অটোলিথ দানা ও এন্ডোলিম্ফের মাধ্যমে দেহের স্থিতি ও গতিশীল ভারসাম্য রক্ষা করা' },
    { ch: 'bio2_ch8_coordination', vl: 'mitosis_cell', part: 'অ্যামনিওন (Amnion)', fn: 'ভ্রূণকে ঘিরে থাকা অভ্যন্তরীণ ভ্রূণীয় পর্দা যা অ্যামনিওটিক তরলে ভ্রূণকে আঘাত ও শুষ্কতা থেকে বাঁচায়' },
    { ch: 'bio2_ch8_coordination', vl: 'mitosis_cell', part: 'কোরিওন (Chorion)', fn: 'ভ্রূণের সর্ববহিঃস্থ পর্দা যা জরায়ুর এন্ডোমেট্রিয়ামের সাথে যুক্ত হয়ে প্লাসেন্টা (অমরা) গঠন করে' },
  ];

  neuroSenseStructures.forEach((ns, i) => {
    const others = neuroSenseStructures.filter((x) => x.part !== ns.part);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ns.ch,
        visualLessonId: ns.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানবদেহের কোন অংশ বা গঠনের প্রধান কাজ হলো "${ns.fn}"?`,
        correct: ns.part,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.part),
        explanation: `${ns.part}-এর মূল ভূমিকা হলো ${ns.fn}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ ও ৯ · স্নায়ু, ইন্দ্রিয় ও ভ্রূণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ns.ch,
        visualLessonId: ns.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `মানব শারীরতত্ত্বে "${ns.part}"-এর প্রধান কাজ কোনটি?`,
        correct: ns.fn,
        distractors: others.slice((i + 3) % 7, ((i + 3) % 7) + 4).map((x) => x.fn),
        explanation: `${ns.part}: ${ns.fn}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ ও ৯',
      })
    );
  });

  // 3. Human Clinical Disorders & Pathology Matrix (20 Diseases × 2 = 40 MCQs)
  const clinicalDisorders = [
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', dis: 'গ্যাস্ট্রিক ও পেপটিক আলসার', cause: 'Helicobacter pylori ব্যাকটেরিয়া সংক্রমণ বা অতিরিক্ত HCl-এ মিউকোসা ক্ষয়' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', dis: 'জন্ডিস (কামলা রোগ)', cause: 'রক্তে বিলিরুবিনের মাত্রা (>২ mg/dL) বেড়ে ত্বক, নখ ও চোখের সাদা অংশ হলুদ হওয়া' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', dis: 'অ্যাথেরোস্ক্লেরোসিস', cause: 'ধমনির অন্তঃপ্রাচীরে চর্বি, কোলেস্টেরল ও ক্যালসিয়াম জমে প্লাক সৃষ্টি ও নালি সরু হওয়া' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', dis: 'থ্রম্বোসাইটোপেনিয়া', cause: 'রক্তে অণুচক্রিকার সংখ্যা স্বাভাবিকের (১.৫ লাখ/mm³) চেয়ে মারাত্মকভাবে কমে যাওয়া' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', dis: 'ব্রংকাইটিস (Bronchitis)', cause: 'শ্বাসনালির ব্রঙ্কাইয়ের মিউকাস পর্দায় ভাইরাস-ব্যাকটেরিয়া বা ধূমপানজনিত প্রদাহ ও কফ সৃষ্টি' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', dis: 'নিউমোনিয়া (Pneumonia)', cause: 'Streptococcus pneumoniae জীবাণুতে অ্যালভিওলাসে তরল ও পুঁজ জমে শ্বাসকষ্ট হওয়া' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', dis: 'হাঁপানি বা অ্যাজমা', cause: 'অ্যালার্জেন ও IgE-র প্রভাবে ব্রঙ্কিওল সংকুচিত হয়ে শ্বাসের সময় বাঁশির মতো শব্দ (Wheezing)' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', dis: 'গ্লোমেরুলোনেফ্রাইটিস', cause: 'নেফ্রনের গ্লোমেরুলাসে প্রদাহ হয়ে মূত্রের সাথে রক্ত (হিম্যাচুরিয়া) ও প্রোটিন বের হওয়া' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', dis: 'ইউরেমিয়া (Uremia)', cause: 'বৃক্ক অকার্যকর হয়ে রক্তে ইউরিয়া, ক্রিয়েটিনিন ও নাইট্রোজেন বর্জ্য বিপজ্জনকভাবে জমা হওয়া' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', dis: 'অস্টিওপোরোসিস (Osteoporosis)', cause: 'ক্যালসিয়াম ও ইস্ট্রোজেন ঘাটতিতে অস্থির খনিজ ঘনত্ব কমে ছিদ্রযুক্ত ও ভঙ্গুর হওয়া' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', dis: 'রিকেটস ও অস্টিওম্যালাসিয়া', cause: 'ভিটামিন D-এর অভাবে যথাক্রমে শিশু ও প্রাপ্তবয়স্কদের হাড় নরম ও বেঁকে যাওয়া' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', dis: 'রিউমাটয়েড আর্থ্রাইটিস', cause: 'স্ব-অনাক্রম্য (Autoimmune) ত্রুটিতে সাইনোভিয়াল অস্থিসন্ধিতে প্রদাহ ও ব্যথা' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', dis: 'পার্কিনসনস ডিজিজ', cause: 'মধ্যমস্তিষ্কের সাবস্ট্যানশিয়া নিগ্রায় ডোপামিন নিউরন নষ্ট হয়ে হাত-পা কাঁপা ও চলন ধীর হওয়া' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', dis: 'গ্লুকোমা (Glaucoma)', cause: 'চোখের অ্যাকুয়াস হিউমারের নিষ্কাশন বন্ধ হয়ে ইন্ট্রা-অকুলার চাপ বেড়ে অপটিক স্নায়ু নষ্ট হওয়া' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', dis: 'ছানি বা ক্যাটার‍্যাক্ট (Cataract)', cause: 'বয়স বা ডায়াবেটিসের কারণে চোখের প্রাকৃতিক লেন্সের প্রোটিন ঘোলাটে ও অস্বচ্ছ হয়ে যাওয়া' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', dis: 'মায়াস্থেনিয়া গ্রাভিস', cause: 'নিউরোমাসকুলার জাংশনে অ্যাসিটাইলকোলিন রিসেপ্টরের বিরুদ্ধে অটো-অ্যান্টিবডি তৈরি হয়ে পেশি দুর্বলতা' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', dis: 'অ্যানাফাইল্যাকটিক শক', cause: 'তীব্র অ্যালার্জির ফলে মাস্ট কোষ থেকে প্রচুর হিস্টামিন বেরিয়ে রক্তচাপ হঠাৎ কমে যাওয়া' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', dis: 'এরাইথ্রোমাইসিন / অটোইমিউন টাইপ-১ ডায়াবেটিস', cause: 'নিজ দেহের T-কোষ অগ্ন্যাশয়ের β-কোষ ধ্বংস করায় ইনসুলিন উৎপাদন সম্পূর্ণ বন্ধ হওয়া' },
  ];

  clinicalDisorders.forEach((cd, i) => {
    const others = clinicalDisorders.filter((x) => x.dis !== cd.dis);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cd.ch,
        visualLessonId: cd.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${cd.cause}" — এটি নিচের কোন রোগ বা ক্লিনিক্যাল অবস্থার মূল কারণ বা বৈশিষ্ট্য?`,
        correct: cd.dis,
        distractors: others.slice(i % 9, (i % 9) + 4).map((x) => x.dis),
        explanation: `${cd.dis}: ${cd.cause}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · রোগতত্ত্ব ও ক্লিনিক্যাল বায়োলজি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cd.ch,
        visualLessonId: cd.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `চিকিৎসাবিজ্ঞানের আলোকে "${cd.dis}"-এর প্রধান কারণ বা প্যাথলজি কী?`,
        correct: cd.cause,
        distractors: others.slice((i + 5) % 9, ((i + 5) % 9) + 4).map((x) => x.cause),
        explanation: `${cd.dis}-এর প্যাথলজি: ${cd.cause}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · ক্লিনিক্যাল প্যাথলজি',
      })
    );
  });

  // 4. Evolution, Geological Eras, Homologous/Analogous & Non-Chordate Larvae (~44 MCQs)
  const evoAndLarva = [
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', item: 'প্লানুলা (Planula) লার্ভা', desc: 'Cnidaria (যেমন Obelia, Aurelia) পর্বের সিলিয়াযুক্ত মুক্ত সাঁতারু লার্ভা' },
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', item: 'ট্রোকোফোর (Trochophore) লার্ভা', desc: 'Annelida (যেমন Nereis) ও সামুদ্রিক Mollusca-র নাশপাতি আকৃতির লার্ভা' },
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', item: 'বাইপিনারিয়া (Bipinnaria) লার্ভা', desc: 'Echinodermata (তারামাছ) পর্বের দ্বিপার্শ্বীয় প্রতিসম সাঁতারু লার্ভা' },
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', item: 'ট্যাডপোল (Tadpole / অ্যাসিডিয়ান) লার্ভা', desc: 'Urochordata (Ascidia)-র লেজে নটোকর্ডযুক্ত লার্ভা যা পশ্চাৎমুখী রূপান্তরে পূর্ণাঙ্গ হয়' },
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', item: 'অ্যামোসিট (Ammocoete) লার্ভা', desc: 'Petromyzon বা ল্যাম্প্রে-র (চোয়ালবিহীন মাছ) স্বাদুপানির ফিল্টার-ফিডার লার্ভা' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', item: 'মেসোজোয়িক মহাযুগ (Mesozoic Era)', desc: '"সরীসৃপ ও ডাইনোসরের যুগ" — এ যুগে প্রথম পাখি (Archaeopteryx) ও আবৃতবীজী উদ্ভিদের উদ্ভব ঘটে' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', item: 'সিনোজোয়িক মহাযুগ (Cenozoic Era)', desc: '"স্তন্যপায়ী ও আধুনিক মানুষের যুগ" — বর্তমান যুগের স্তন্যপায়ী ও পুষ্পক উদ্ভিদের প্রাধান্য' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', item: 'প্যালিওজোয়িক মহাযুগ (Paleozoic Era)', desc: 'মাছ (ডেভোনিয়ান) ও উভচর প্রাণির উৎপত্তি এবং প্রচুর অমেরুদণ্ডী ও কয়লা-বনের যুগ' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', item: 'সমসংস্থ অঙ্গ (Homologous Organs)', desc: 'উৎপত্তি ও অভ্যন্তরীণ অস্থি কাঠামো এক কিন্তু কাজ ভিন্ন (মানুষের হাত, বাদুড়ের ডানা, তিমির ফ্লিপার) — অপসারী বিবর্তন' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', item: 'সমবৃত্তি অঙ্গ (Analogous Organs)', desc: 'উৎপত্তি ও গঠন ভিন্ন কিন্তু একই কাজের জন্য অভিযোজিত (পাখির ডানা, প্রজাপতির ডানা ও বাদুড়ের প্যাটাজিয়াম) — অভিসারী বিবর্তন' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', item: 'ডারউইনের গ্যালাপাগোস ফিঞ্চ পাখি', desc: 'খাদ্যাভ্যাস অনুযায়ী ঠোঁটের ভিন্নতা — অ্যানাডাপ্টিভ রেডিয়েশন (Adaptive radiation)-এর ক্লাসিক প্রমাণ' },
  ];

  evoAndLarva.forEach((el, i) => {
    const others = evoAndLarva.filter((x) => x.item !== el.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: el.ch,
        visualLessonId: el.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${el.desc}" — এটি নিচের কোনটির সাথে সম্পর্কিত?`,
        correct: el.item,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.item),
        explanation: `${el.item}: ${el.desc}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ১২ · লার্ভা ও বিবর্তন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: el.ch,
        visualLessonId: el.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `প্রাণিবিজ্ঞান ও বিবর্তনের আলোকে "${el.item}" বলতে কী বোঝায়?`,
        correct: el.desc,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.desc),
        explanation: `${el.item}-এর পরিচয়: ${el.desc}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ১২',
      })
    );
  });

  // 5. Digestive Juice Secretion & GI Hormone Action Matrix (~24 MCQs)
  const giDetails = [
    { item: 'দৈনিক লালারস ক্ষরণ (মানুষ)', val: '১.০ – ১.৫ লিটার/দিন (pH ৬.২–৭.৪)', note: 'তিন জোড়া লালাগ্রন্থি (প্যারোটিড, সাবম্যান্ডিবুলার, সাবলিঙ্গুয়াল) থেকে ক্ষরিত।' },
    { item: 'দৈনিক গ্যাস্ট্রিক রস ক্ষরণ', val: '২.০ – ২.৫ লিটার/দিন (pH ১.৫–২.৫)', note: 'পাকস্থলির প্রায় ৪ কোটি গ্যাস্ট্রিক গ্রন্থি থেকে ক্ষরিত হয়।' },
    { item: 'দৈনিক পিত্তরস ও অগ্ন্যাশয় রস', val: 'পিত্ত ০.৫–১.০ লিটার ও অগ্ন্যাশয় রস ১.২–১.৫ লিটার/দিন', note: 'উভয় রসই ডিওডেনামে এসে লিপিড ও প্রোটিন পরিপাকে সহায়তা করে।' },
    { item: 'মানুষের সক্রিয় দুধদাঁতের (Milk teeth) সংকেত', val: 'I(2/2) C(1/1) PM(0/0) M(2/2) × ২ = ২০টি', note: 'শিশুদের দুধদাঁতে প্রিমোলার (অগ্রপেষণ) ও আক্কেল দাঁত থাকে না।' },
    { item: 'গ্যাস্ট্রিন হরমোন', val: 'পাকস্থলির পাইলোরিক অংশের G-কোষ থেকে ক্ষরিত হয়ে HCl ও গ্যাস্ট্রিক রস বাড়ায়', note: 'খাদ্যে প্রোটিনের উপস্থিতিতে গ্যাস্ট্রিন ক্ষরণ বৃদ্ধি পায়।' },
    { item: 'এন্টেরোকাইনিন ও এন্টারোগ্যাস্ট্রোন', val: 'ক্ষুদ্রান্ত্রে আন্ত্রিক রস ক্ষরণ উদ্দীপ্ত করা ও পাকস্থলির ক্ষরণ কমানো', note: 'ডিওডেনামে চর্বিযুক্ত খাবার এলে পাকস্থলি খালি হওয়ার গতি কমে যায়।' },
  ];
  giDetails.forEach((gd, i) => {
    const others = giDetails.filter((x) => x.item !== gd.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানুষের পরিপাকতন্ত্রে "${gd.item}" সম্পর্কিত সঠিক তথ্য বা পরিমাণ কোনটি?`,
        correct: gd.val,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.val),
        explanation: `${gd.item}: ${gd.val}। ${gd.note}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · পরিপাক গ্রন্থি ও রস',
      })
    );
  });

  // 6. Heart Chambers & Respiratory Organs Across Animal Groups Matrix (~24 MCQs)
  const comparativeZooTable = [
    { grp: 'মাছ (রুই ও হাঙর)', heart: '২-প্রকোষ্ঠ হৃৎপিণ্ড (১ অলিন্দ, ১ নিলয়; এক-চক্রীয় ভেনাস হার্ট)', resp: 'ফুলকা (Gills)' },
    { grp: 'উভচর (কুনোব্যাঙ ও সোনা ব্যাঙ)', heart: '৩-প্রকোষ্ঠ হৃৎপিণ্ড (২ অলিন্দ, ১ নিলয়; অসম্পূর্ণ দ্বি-সংবহন)', resp: 'ত্বক, মুখগহ্বর ও ফুসফুস (ব্যাঙাচিতে ফুলকা)' },
    { grp: 'সরীসৃপ (সাপ-গিরগিটি, কুমির ব্যতীত)', heart: 'অসম্পূর্ণ ৪-প্রকোষ্ঠ হৃৎপিণ্ড (২ অলিন্দ, আংশিক বিভক্ত নিলয়)', resp: 'উন্নত স্পঞ্জসদৃশ ফুসফুস' },
    { grp: 'কুমির, পাখি ও স্তন্যপায়ী (মানুষ)', heart: 'সম্পূর্ণ ৪-প্রকোষ্ঠ হৃৎপিণ্ড (২ অলিন্দ, ২ নিলয়; সম্পূর্ণ দ্বি-সংবহন)', resp: 'বায়ুথলিযুক্ত/অ্যালভিওলাইযুক্ত ফুসফুস' },
    { grp: 'ঘাসফড়িং ও আরশোলা (পতঙ্গ)', heart: '৭/১৩-প্রকোষ্ঠ নলাকার পৃষ্ঠীয় হৃৎপিণ্ড (মুক্ত হিমোসিল)', resp: '১০ জোড়া শ্বাসরন্ধ্র ও ট্রাকিয়াল তন্ত্র' },
    { grp: 'চিংড়ি ও কাঁকড়া (ক্রাস্টাসিয়া)', heart: 'মুক্ত হিমোসিল ও হিমোসায়ানিনযুক্ত এক-প্রকোষ্ঠ পৃষ্ঠীয় হৃৎপিণ্ড', resp: 'বুক-গিল বা ফুলকা (Brachial chamber)' },
  ];
  comparativeZooTable.forEach((cz, i) => {
    const others = comparativeZooTable.filter((x) => x.grp !== cz.grp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${cz.grp}-এ হৃৎপিণ্ডের প্রকোষ্ঠ সংখ্যা ও ধরন কেমন?`,
        correct: cz.heart,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.heart),
        explanation: `${cz.grp}-এ ${cz.heart} এবং শ্বসন অঙ্গ হলো ${cz.resp}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ৪ · তুলনামূলক অঙ্গসংস্থান',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'board',
        question: `${cz.grp}-এর প্রধান শ্বসন অঙ্গ কোনটি?`,
        correct: cz.resp,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.resp),
        explanation: `${cz.grp}-এর শ্বসন অঙ্গ হলো ${cz.resp} এবং সংবহনতন্ত্র: ${cz.heart}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ৫ · শ্বসন অঙ্গ',
      })
    );
  });

  // 7. Quick Gametogenesis & Ploidy Numbers in Human Reproduction (~24 MCQs)
  const reproStages = [
    { cell: 'স্পার্মাটোগোনিয়া ও প্রাইমারি স্পার্মাটোসাইট', ploidy: 'ডিপ্লয়েড (2n = ৪৬টি ক্রোমোজোম)', note: 'মায়োসিস-১ শুরু করার আগ পর্যন্ত ক্রোমোজোম সংখ্যা ডিপ্লয়েড (৪৬) থাকে।' },
    { cell: 'সেকেন্ডারি স্পার্মাটোসাইট, স্পার্মাটিড ও শুক্রাণু', ploidy: 'হ্যাপ্লয়েড (n = ২৩টি ক্রোমোজোম)', note: 'মায়োসিস-১ এর পর ক্রোমোজোম সংখ্যা অর্ধেক হয়ে ২৩টি (২২+X বা ২২+Y) হয়।' },
    { cell: 'উওগোনিয়া ও প্রাইমারি উওসাইট', ploidy: 'ডিপ্লয়েড (2n = ৪৬টি ক্রোমোজোম)', note: 'ভ্রূণ অবস্থায় প্রাইমারি উওসাইট প্রোফেজ-১ এর ডিপ্লোটিনে আটকে থাকে।' },
    { cell: 'সেকেন্ডারি উওসাইট ও প্রথম পোলার বডি', ploidy: 'হ্যাপ্লয়েড (n = ২৩টি ক্রোমোজোম)', note: 'ডিম্বপাতের সময় মেটাফেজ-২ দশায় থাকা সেকেন্ডারি উওসাইট নির্গত হয়; শুক্রাণু ঢুকলে মায়োসিস-২ সম্পূর্ণ হয়।' },
    { cell: 'মরুলা (Morula) ও ব্লাস্টোসিস্ট (Blastocyst)', ploidy: 'ডিপ্লয়েড (2n = ৪৬; ১৬-কোষী ও ~৬৪-কোষী ভ্রূণ দশা)', note: 'জাইগোটের ক্লিভেজ বিভাজনে প্রথমে ১৬ কোষের নিরেট মরুলা ও পরে ফ্লুইডপূর্ণ ব্লাস্টোসিস্ট গঠিত হয়।' },
    { cell: '১টি প্রাইমারি স্পার্মাটোসাইট বনাম ১টি প্রাইমারি উওসাইট থেকে সৃষ্ট গ্যামেট', ploidy: 'যথাক্রমে ৪টি সচল শুক্রাণু ও মাত্র ১টি কার্যকরী ডিম্বাণু (+ ৩ পোলার বডি)', note: 'উওজেনেসিসে অসম সাইটোকাইনেসিস হওয়ায় পুরো সাইটোপ্লাজম ১টি ডিম্বাণুতে জমা হয়।' },
  ];
  const ploidyPool = [
    'ডিপ্লয়েড (2n = ৪৬টি ক্রোমোজোম)',
    'হ্যাপ্লয়েড (n = ২৩টি ক্রোমোজোম)',
    'ট্রিপ্লয়েড (3n = ৬৯টি ক্রোমোজোম)',
    'টেট্রাপ্লয়েড (4n = ৯২টি ক্রোমোজোম)',
    'ডিপ্লয়েড (2n = ৪৬; ১৬-কোষী ও ~৬৪-কোষী ভ্রূণ দশা)',
    'যথাক্রমে ৪টি সচল শুক্রাণু ও মাত্র ১টি কার্যকরী ডিম্বাণু (+ ৩ পোলার বডি)',
  ];
  reproStages.forEach((rs, i) => {
    const distinctPloidies = ploidyPool.filter((p) => p !== rs.ploidy);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানব জননে "${rs.cell}"-এর ক্রোমোজোমীয় অবস্থা বা সংখ্যাগত তথ্য কোনটি?`,
        correct: rs.ploidy,
        distractors: distinctPloidies.slice(i % 2, (i % 2) + 3).concat(distinctPloidies),
        explanation: `${rs.cell}: ${rs.ploidy}। ${rs.note}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৯',
      })
    );
  });

  // 8. Additional Cardiac Cycle & Embryo/Reproduction/Excretion/Digestion Concept Pairs (~30 MCQs)
  const spCounts = [10, 20, 25, 40, 50, 75, 100, 200];
  spCounts.forEach((c) => {
    const sperms = c * 4;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `মানব শুক্রাশয়ে ${toBnDigits(c)}টি প্রাইমারি স্পার্মাটোসাইট থেকে মায়োসিস বিভাজনের শেষে মোট কতটি কার্যকরী শুক্রাণু সৃষ্টি হবে?`,
        correct: `${toBnDigits(sperms)}টি শুক্রাণু`,
        distractors: [`${toBnDigits(c)}টি শুক্রাণু`, `${toBnDigits(c * 2)}টি শুক্রাণু`, `${toBnDigits(sperms * 2)}টি শুক্রাণু`],
        explanation: `প্রতিটি প্রাইমারি স্পার্মাটোসাইট (2n) মায়োসিস ১ ও ২-এর মাধ্যমে ৪টি হ্যাপ্লয়েড শুক্রাণু তৈরি করে; তাই ${toBnDigits(c)} × ৪ = ${toBnDigits(sperms)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · স্পার্মাটোজেনেসিস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'dental',
        question: `নারীর ডিম্বাশয়ে ${toBnDigits(c)}টি প্রাইমারি উওসাইট থেকে সম্পূর্ণ উওজেনেসিস শেষে সর্বাধিক কতটি কার্যকরী ডিম্বাণু তৈরি হতে পারে?`,
        correct: `${toBnDigits(c)}টি ডিম্বাণু`,
        distractors: [`${toBnDigits(sperms)}টি ডিম্বাণু`, `${toBnDigits(c * 2)}টি ডিম্বাণু`, `${toBnDigits(Math.max(1, Math.round(c / 2)))}টি ডিম্বাণু`],
        explanation: `প্রতিটি প্রাইমারি উওসাইট মায়োসিসে ১টি বড় কার্যকরী ডিম্বাণু এবং ছোট পোলার বডি (যা নষ্ট হয়ে যায়) তৈরি করে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · উওজেনেসিস',
      })
    );
  });

  // 9. Respiratory Partial Pressure Gradients (pO2 & pCO2) & Renal Tubule Reabsorption (~30 MCQs)
  const gasSites = [
    { site: 'প্রশ্বাসের বায়ু (Inspired air)', po2: '১৫৯ mmHg', pco2: '০.৩ mmHg' },
    { site: 'ফুসফুসের অ্যালভিওলার বায়ু', po2: '১০৪ mmHg', pco2: '৪০ mmHg' },
    { site: 'অক্সিজেনযুক্ত ধমনি রক্ত (Systemic arteries)', po2: '৯৫–১০০ mmHg', pco2: '৪০ mmHg' },
    { site: 'অক্সিজেনহীন শিরা রক্ত (Systemic veins)', po2: '৪০ mmHg', pco2: '৪৫–৪৬ mmHg' },
    { site: 'সক্রিয় কোষ ও দেহ টিস্যু (Rest)', po2: '২০–৪০ mmHg', pco2: '৪৫–৫০ mmHg' },
  ];
  gasSites.forEach((gs, i) => {
    const others = gasSites.filter((x) => x.site !== gs.site);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `স্বাভাবিক অবস্থায় "${gs.site}"-এ অক্সিজেনের আংশিক চাপ (pO₂) প্রায় কত mmHg থাকে?`,
        correct: gs.po2,
        distractors: others.map((x) => x.po2),
        explanation: `${gs.site}-এ pO₂ হলো ${gs.po2} এবং pCO₂ হলো ${gs.pco2}; এই আংশিক চাপের পার্থক্যেই ব্যাপন ঘটে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · গ্যাসীয় বিনিময়',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'medical',
        question: `মানবদেহের "${gs.site}"-এ কার্বন ডাই-অক্সাইডের আংশিক চাপ (pCO₂) কত mmHg?`,
        correct: gs.pco2,
        distractors: others.map((x) => x.pco2),
        explanation: `${gs.site}-এ pCO₂ হলো ${gs.pco2} ও pO₂ হলো ${gs.po2}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · pCO₂ চাপ',
      })
    );
  });

  // 10. Vertebral & Rib Regional Bone Multipliers + Renal Reabsorption (~28 MCQs)
  const skeletonRegions = [
    { reg: 'গ্রীবাদেশীয় (Cervical) কশেরুকা', perPerson: 7 },
    { reg: 'বক্ষদেশীয় (Thoracic) কশেরুকা', perPerson: 12 },
    { reg: 'কটিদেশীয় (Lumbar) কশেরুকা', perPerson: 5 },
    { reg: 'আসল পর্শুকা (True ribs — ১ম থেকে ৭ম জোড়া)', perPerson: 14 },
    { reg: 'ভাসমান পর্শুকা (Floating ribs — ১১শ ও ১২শ জোড়া)', perPerson: 4 },
  ];
  [2, 3, 4, 5].forEach((persons) => {
    skeletonRegions.forEach((sr) => {
      const total = sr.perPerson * persons;
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'bio_2',
          chapterId: 'bio2_ch7_locomotion',
          visualLessonId: 'heart_cardiac',
          hscLevel: '12',
          difficulty: 'board',
          question: `${toBnDigits(persons)}জন সুস্থ প্রাপ্তবয়স্ক মানুষের দেহে মোট কতটি ${sr.reg} বিদ্যমান থাকে?`,
          correct: `${toBnDigits(total)}টি`,
          distractors: [
            `${toBnDigits(sr.perPerson)}টি`,
            `${toBnDigits(total + persons * 2)}টি`,
            `${toBnDigits(Math.max(2, total - persons * 2))}টি`,
            `${toBnDigits(total + persons * 4)}টি`,
            `${toBnDigits(total * 2)}টি`,
          ],
          explanation: `প্রতিজন মানুষের দেহে ${toBnDigits(sr.perPerson)}টি ${sr.reg} থাকে। তাই ${toBnDigits(persons)}জনের দেহে ${toBnDigits(persons)} × ${toBnDigits(sr.perPerson)} = ${toBnDigits(total)}টি।`,
          reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · কঙ্কালতন্ত্র',
        })
      );
    });
  });

  // 11. Extra Targeted Zoology Single-Best-Answer MCQs (~30 MCQs)
  const extraZooDrills: Array<[string, string, string, string, [string, string, string], string]> = [
    ['bio2_ch3_digestion', 'heart_cardiac', 'পিত্তরসে অবস্থিত প্রধান দুটি পিত্তরঞ্জক (Bile pigments) কী কী যা হিমোগ্লোবিন ভেঙে তৈরি হয়?', 'বিলিরুবিন (হলুদ) ও বিলিভার্ডিন (সবুজ)', ['মেলানিন ও ক্যারোটিন', 'হিমোজয়েন ও ইউরোক্রোম', 'ট্রিপসিন ও পেপসিন'], 'যকৃত ও প্লীহায় মৃত RBC-এর হিমোগ্লোবিন ভেঙে বিলিরুবিন ও বিলিভার্ডিন উৎপন্ন হয় যা মলকে বর্ণ দেয়।'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'ক্ষুদ্রান্ত্রের কোন অংশের মিউকোসায় "পেয়ার’স প্যাচ" (Peyer’s patches) নামক লসিকা গুচ্ছ থাকে?', 'ইলিয়াম (Ileum)', ['ডিওডেনাম', 'জেজুনাম', 'অন্ননালি'], 'ইলিয়ামের ল্যামিনা প্রোপ্রিয়া ও সাবমিউকোসায় থাকা পেয়ার’স প্যাচ অন্ত্রের প্রতিরক্ষায় অংশ নেয়।'],
    ['bio2_ch4_blood', 'heart_cardiac', 'রক্তনালির অন্তঃপ্রাচীরে ক্ষত ছাড়া রক্ত জমাট বাঁধতে না দেওয়ার জন্য বেসোফিল ও মাস্ট কোষ কী ক্ষরণ করে?', 'হেপারিন (প্রাকৃতিক অ্যান্টিকোয়াগুলেন্ট)', ['ফাইব্রিনোজেন', 'প্রোথ্রম্বিন', 'থ্রম্বোপ্লাস্টিন'], 'হেপারিন প্রোথ্রম্বিনকে থ্রম্বিনে পরিণত হতে বাধা দিয়ে শরীরের ভেতরে রক্ত জমাট বাঁধা (থ্রম্বোসিস) রোধ করে।'],
    ['bio2_ch4_blood', 'heart_cardiac', 'হৃৎপিণ্ডের আবরণী "পেরিকার্ডিয়াম"-এর দুটি স্তরের মধ্যবর্তী তরলের নাম কী?', 'পেরিকার্ডিয়াল ফ্লুইড', ['প্লুরাল ফ্লুইড', 'সাইনোভিয়াল ফ্লুইড', 'পেরিলিম্ফ'], 'পেরিকার্ডিয়াল ফ্লুইড সংকোচন-প্রসারণের সময় হৃৎপিণ্ডকে ঘর্ষণ ও বাহ্যিক আঘাত থেকে রক্ষা করে।'],
    ['bio2_ch5_respiration', 'bohr_curve', 'শ্বাসনালির ট্রাকিয়া (Trachea) চুপসে যাওয়া প্রতিরোধে কতটি C-আকৃতির হায়ালিন তরুণাস্থি বলয় থাকে?', '১৬ – ২০টি অপূর্ণ তরুণাস্থি বলয়', ['২ – ৪টি', '৫০ – ৬০টি', '৮ – ১০টি পূর্ণ বলয়'], '১৬–২০টি C-আকৃতির তরুণাস্থি বলয় পেছন দিকে খোলা থাকে যাতে অন্ননালির খাবার গিলতে কোনো অসুবিধা না হয়।'],
    ['bio2_ch5_respiration', 'bohr_curve', 'কার্বন মনোক্সাইড (CO) গ্যাস মানবদেহে মারাত্মক বিষক্রিয়া ঘটায় কেন?', 'হিমোগ্লোবিনের প্রতি CO-এর আসক্তি O₂-এর তুলনায় ২০০–২৫০ গুণ বেশি (কার্বক্সিহিমোগ্লোবিন তৈরি করে)', ['এটি RBC ভেঙে ফেলে', 'এটি ফুসফুসকে জমিয়ে দেয়', 'এটি কেবল শ্বেত রক্তকণিকা ধ্বংস করে'], 'কার্বক্সিহিমোগ্লোবিন তৈরি হয়ে গেলে অক্সিজেন পরিবহন বন্ধ হয়ে টিস্যুতে তীব্র হাইপোক্সিয়া ঘটে।'],
    ['bio2_ch6_excretion', 'nephron', 'মানবদেহের কোন অঙ্গটি দেহের অম্ল-ক্ষার সাম্যাবস্থা (pH ৭.৪) রক্ষায় বাইকার্বনেট পুনঃশোষণ ও H⁺ ক্ষরণ করে?', 'বৃক্ক (নেফ্রন) ও ফুসফুস', ['যকৃৎ ও প্লীহা', 'অগ্ন্যাশয় ও পিত্তথলি', 'পাকস্থলি ও ক্ষুদ্রান্ত্র'], 'নেফ্রনের PCT ও DCT H⁺ এবং NH₄⁺ ক্ষরণ ও HCO₃⁻ পুনঃশোষণ করে রক্তের pH নিয়ন্ত্রণ করে।'],
    ['bio2_ch6_excretion', 'nephron', 'হিমোডায়ালাইসিস যন্ত্রে রক্ত জমাট বাঁধা রোধ করতে কোন অ্যান্টিকোয়াগুলেন্ট ব্যবহার করা হয়?', 'হেপারিন', ['সোডিয়াম ক্লোরাইড', 'ইথানল', 'ইউরিয়া'], 'ডায়ালাইসিসের আগে রোগীর রক্তে হেপারিন মিশিয়ে কৃত্রিম বৃক্ক বা ডায়ালাইজারে পাঠানো হয়।'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'পেশিকোষের যে বিশেষ এন্ডোপ্লাজমিক রেটিকুলাম সংকোচনের জন্য Ca²⁺ আয়ন সঞ্চয় ও মুক্ত করে তার নাম কী?', 'সার্কোপ্লাজমিক রেটিকুলাম', ['গলগি অ্যাপারেটাস', 'লাইসোজোম', 'নিউক্লিওলাস'], 'স্নায়ু উদ্দীপনা পৌঁছালে সার্কোপ্লাজমিক রেটিকুলাম থেকে প্রচুর Ca²⁺ বের হয়ে ট্রপোনিনের সাথে যুক্ত হয়।'],
    ['bio2_ch8_coordination', 'bohr_curve', 'অ্যাকুয়াস হিউমার ও ভিট্রিয়াস হিউমার চোখের যথাক্রমে কোন প্রকোষ্ঠে অবস্থান করে?', 'অ্যাকুয়াস হিউমার লেন্সের সামনে (অগ্র প্রকোষ্ঠ) ও ভিট্রিয়াস হিউমার লেন্সের পেছনে (পশ্চাৎ প্রকোষ্ঠ)', ['উভয়ই কর্নিয়ার সামনে', 'ভিট্রিয়াস হিউমার লেন্সের সামনে', 'উভয়ই রেটিনার পেছনে'], 'স্বচ্ছ অ্যাকুয়াস হিউমার কর্নিয়া-লেন্সকে পুষ্টি দেয়; আর জেলিসদৃশ ভিট্রিয়াস হিউমার অক্ষিগোলকের গোল আকৃতি বজায় রাখে।'],
    ['bio2_ch8_coordination', 'mitosis_cell', 'ডিম্বপাতের পর পরিত্যক্ত গ্রাফিয়ান ফলিকল LH-এর প্রভাবে কিসে রূপান্তরিত হয়ে প্রোজেস্টেরন ক্ষরণ করে?', 'কর্পাস লুটিয়াম (পীতগ্রন্থি)', ['অ্যাক্রোজোম', 'ব্লাস্টোসিস্ট', 'সিনসাইটিওট্রোফোব্লাস্ট'], 'নিষেক ঘটলে কর্পাস লুটিয়াম hCG-এর প্রভাবে প্রথম ৩ মাস প্রোজেস্টেরন ক্ষরণ করে গর্ভাবস্থা বজায় রাখে।'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'পৃথিবীর প্রথম জীবিত কোষ বা আদিকোষ (Protocell) উৎপত্তির "রাসায়নিক বিবর্তন তত্ত্ব" (Oparin-Haldane) পরীক্ষাগারে কে প্রমাণ করেন?', 'স্ট্যানলি মিলার ও হ্যারল্ড উরে (১৯৫৩)', ['চার্লস ডারউইন', 'জ্যাকব ও মনোড', 'গ্রেগর মেন্ডেল'], 'মিলার-উরে CH₄, NH₃, H₂ ও জলীয় বাষ্পে বৈদ্যুতিক স্ফুলিঙ্গ প্রয়োগ করে গ্লাইসিন-অ্যালানিন অ্যামিনো অ্যাসিড তৈরি করেন।'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'রক্তের ABO গ্রুপে Iᴬ এবং Iᴮ অ্যালিল দুটি যখন একত্রে থাকে (AB গ্রুপ), তখন কোন ধরনের জিনতাত্ত্বিক সম্পর্ক দেখা যায়?', 'সমপ্রকটতা (Codominance)', ['অসম্পূর্ণ প্রকটতা', 'প্রচ্ছন্ন এপিস্ট্যাসিস', 'প্লাইওট্রপি'], 'AB রক্তগ্রুপে Iᴬ ও Iᴮ উভয় অ্যালিল সমানভাবে নিজেদের অ্যান্টিজেন (A ও B) প্রকাশ করে — এটি সমপ্রকটতা ও মাল্টিপল অ্যালিলের উদাহরণ।'],
  ];

  extraZooDrills.forEach(([ch, vl, q, a, d, exp]) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: q,
        correct: a,
        distractors: d,
        explanation: exp,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · মেডিকেল স্পেশাল',
      })
    );
  });

  return list;
}
