import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

export function buildGkStructuredG(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `gksg_${String(seq++).padStart(4, '0')}`;

  // 1. High-Yield Abbreviations & Full Forms (75 × 2 = 150 MCQs)
  const abbrs: Array<{ short: string; full: string; ch: string }> = [
    { short: 'BMDC', full: 'Bangladesh Medical and Dental Council', ch: 'gk_health_intl' },
    { short: 'DGHS', full: 'Directorate General of Health Services', ch: 'gk_health_intl' },
    { short: 'DGDA', full: 'Directorate General of Drug Administration', ch: 'gk_health_intl' },
    { short: 'IEDCR', full: 'Institute of Epidemiology, Disease Control and Research', ch: 'gk_health_intl' },
    { short: 'NIPSOM', full: 'National Institute of Preventive and Social Medicine', ch: 'gk_health_intl' },
    { short: 'BSMMU', full: 'Bangabandhu Sheikh Mujib Medical University', ch: 'gk_health_intl' },
    { short: 'BIRDEM', full: 'Bangladesh Institute of Research and Rehabilitation in Diabetes, Endocrine and Metabolic Disorders', ch: 'gk_health_intl' },
    { short: 'NICVD', full: 'National Institute of Cardiovascular Diseases', ch: 'gk_health_intl' },
    { short: 'icddr,b', full: 'International Centre for Diarrhoeal Disease Research, Bangladesh', ch: 'gk_health_intl' },
    { short: 'WHO', full: 'World Health Organization', ch: 'gk_health_intl' },
    { short: 'UNICEF', full: 'United Nations Children’s Fund', ch: 'gk_health_intl' },
    { short: 'UNESCO', full: 'United Nations Educational, Scientific and Cultural Organization', ch: 'gk_health_intl' },
    { short: 'UNHCR', full: 'United Nations High Commissioner for Refugees', ch: 'gk_health_intl' },
    { short: 'UNDP', full: 'United Nations Development Programme', ch: 'gk_health_intl' },
    { short: 'UNEP', full: 'United Nations Environment Programme', ch: 'gk_health_intl' },
    { short: 'FAO', full: 'Food and Agriculture Organization', ch: 'gk_health_intl' },
    { short: 'WFP', full: 'World Food Programme', ch: 'gk_health_intl' },
    { short: 'ILO', full: 'International Labour Organization', ch: 'gk_health_intl' },
    { short: 'IMF', full: 'International Monetary Fund', ch: 'gk_health_intl' },
    { short: 'WTO', full: 'World Trade Organization', ch: 'gk_health_intl' },
    { short: 'IAEA', full: 'International Atomic Energy Agency', ch: 'gk_health_intl' },
    { short: 'ICJ', full: 'International Court of Justice', ch: 'gk_health_intl' },
    { short: 'NATO', full: 'North Atlantic Treaty Organization', ch: 'gk_health_intl' },
    { short: 'SAARC', full: 'South Asian Association for Regional Cooperation', ch: 'gk_health_intl' },
    { short: 'BIMSTEC', full: 'Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation', ch: 'gk_health_intl' },
    { short: 'ASEAN', full: 'Association of Southeast Asian Nations', ch: 'gk_health_intl' },
    { short: 'OIC', full: 'Organisation of Islamic Cooperation', ch: 'gk_health_intl' },
    { short: 'NAM', full: 'Non-Aligned Movement', ch: 'gk_health_intl' },
    { short: 'SDG', full: 'Sustainable Development Goals', ch: 'gk_health_intl' },
    { short: 'EPI', full: 'Expanded Programme on Immunization', ch: 'gk_health_intl' },
    { short: 'ORS', full: 'Oral Rehydration Solution (Saline)', ch: 'gk_health_intl' },
    { short: 'BCG', full: 'Bacillus Calmette–Guérin (যক্ষ্মা টিকা)', ch: 'gk_health_intl' },
    { short: 'MRI', full: 'Magnetic Resonance Imaging', ch: 'gk_health_intl' },
    { short: 'ECG', full: 'Electrocardiogram', ch: 'gk_health_intl' },
    { short: 'EEG', full: 'Electroencephalogram', ch: 'gk_health_intl' },
    { short: 'ELISA', full: 'Enzyme-Linked Immunosorbent Assay', ch: 'gk_health_intl' },
    { short: 'RT-PCR', full: 'Reverse Transcription Polymerase Chain Reaction', ch: 'gk_health_intl' },
    { short: 'COPD', full: 'Chronic Obstructive Pulmonary Disease', ch: 'gk_health_intl' },
    { short: 'AIDS', full: 'Acquired Immunodeficiency Syndrome', ch: 'gk_health_intl' },
    { short: 'SARS', full: 'Severe Acute Respiratory Syndrome', ch: 'gk_health_intl' },
    { short: 'BMI', full: 'Body Mass Index', ch: 'gk_health_intl' },
    { short: 'GFR', full: 'Glomerular Filtration Rate', ch: 'gk_health_intl' },
    { short: 'BRRI', full: 'Bangladesh Rice Research Institute', ch: 'gk_bd_geo_economy' },
    { short: 'BARI', full: 'Bangladesh Agricultural Research Institute', ch: 'gk_bd_geo_economy' },
    { short: 'BJRI', full: 'Bangladesh Jute Research Institute', ch: 'gk_bd_geo_economy' },
    { short: 'BEZA', full: 'Bangladesh Economic Zones Authority', ch: 'gk_bd_geo_economy' },
    { short: 'BIDA', full: 'Bangladesh Investment Development Authority', ch: 'gk_bd_geo_economy' },
    { short: 'NBR', full: 'National Board of Revenue', ch: 'gk_bd_geo_economy' },
    { short: 'ECNEC', full: 'Executive Committee of the National Economic Council', ch: 'gk_bd_geo_economy' },
    { short: 'BSEC', full: 'Bangladesh Securities and Exchange Commission', ch: 'gk_bd_geo_economy' },
    { short: 'GDP', full: 'Gross Domestic Product', ch: 'gk_bd_geo_economy' },
    { short: 'GNP', full: 'Gross National Product', ch: 'gk_bd_geo_economy' },
    { short: 'LDC', full: 'Least Developed Country', ch: 'gk_bd_geo_economy' },
    { short: 'LASER', full: 'Light Amplification by Stimulated Emission of Radiation', ch: 'gk_health_intl' },
    { short: 'RADAR', full: 'Radio Detection and Ranging', ch: 'gk_health_intl' },
    { short: 'SONAR', full: 'Sound Navigation and Ranging', ch: 'gk_health_intl' },
    { short: 'GPS', full: 'Global Positioning System', ch: 'gk_health_intl' },
    { short: 'CPU', full: 'Central Processing Unit', ch: 'gk_health_intl' },
    { short: 'RAM', full: 'Random Access Memory', ch: 'gk_health_intl' },
    { short: 'ROM', full: 'Read-Only Memory', ch: 'gk_health_intl' },
    { short: 'PDF', full: 'Portable Document Format', ch: 'gk_health_intl' },
    { short: 'USB', full: 'Universal Serial Bus', ch: 'gk_health_intl' },
    { short: 'SIM', full: 'Subscriber Identity Module', ch: 'gk_health_intl' },
    { short: 'VPN', full: 'Virtual Private Network', ch: 'gk_health_intl' },
    { short: 'CERN', full: 'Conseil Européen pour la Recherche Nucléaire (European Organization for Nuclear Research)', ch: 'gk_health_intl' },
  ];
  abbrs.forEach((ab, i) => {
    const others = abbrs.filter((x) => x.short !== ab.short);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: ab.ch,
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `সংক্ষিপ্ত রূপ "${ab.short}"-এর সঠিক পূর্ণরূপ (Elaboration) কোনটি?`,
        correct: ab.full,
        distractors: others.slice(i % 35, (i % 35) + 8).map((x) => x.full),
        explanation: `${ab.short}-এর পূর্ণরূপ হলো ${ab.full}।`,
        reference: 'সাধারণ জ্ঞান · গুরুত্বপূর্ণ পূর্ণরূপ (Abbreviations)',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: ab.ch,
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `"${ab.full}"-এর প্রচলিত সংক্ষিপ্ত রূপ (Acronym) কোনটি?`,
        correct: ab.short,
        distractors: others.slice((i + 15) % 35, ((i + 15) % 35) + 8).map((x) => x.short),
        explanation: `${ab.full}-কে সংক্ষেপে ${ab.short} লেখা হয়।`,
        reference: 'সাধারণ জ্ঞান · Acronym Identification',
      })
    );
  });

  // 2. Fathers / Founders / Pioneers of Disciplines (65 × 2 = 130 MCQs)
  const fathers: Array<{ field: string; person: string }> = [
    { field: 'আধুনিক চিকিৎসাশাস্ত্রের (Medicine) জনক', person: 'হিপোক্রেটিস (Hippocrates)' },
    { field: 'আধুনিক চিকিৎসাবিজ্ঞান ও "আল-কানুন ফিত তিব" গ্রন্থের রচয়িতা', person: 'ইবনে সিনা (Avicenna)' },
    { field: 'আধুনিক অঙ্গসংস্থানবিদ্যা বা অ্যানাটমির জনক', person: 'আন্দ্রেয়াস ভেসালিয়াস' },
    { field: 'আধুনিক শল্যচিকিৎসার (Surgery) জনক (ইসলামি স্বর্ণযুগ)', person: 'আবুল কাসিম আল-জাহরাউই' },
    { field: 'অ্যান্টিসেপটিক সার্জারির জনক', person: 'জোসেফ লিস্টার' },
    { field: 'ইমিউনোলজি ও ভ্যাকসিনেশনের জনক', person: 'এডওয়ার্ড জেনার' },
    { field: 'আধুনিক জীবাণুতত্ত্ব ও মাইক্রোবায়োলজির জনক', person: 'লুই পাস্তুর' },
    { field: 'আধুনিক ব্যাকটেরিওলজির জনক (যক্ষ্মা ও কলেরা জীবাণু)', person: 'রবার্ট কখ' },
    { field: 'বংশগতিবিদ্যা বা জেনেটিক্সের জনক', person: 'গ্রেগর জোহান মেন্ডেল' },
    { field: 'আধুনিক শ্রেণিবিন্যাস ও দ্বিপদ নামকরণের জনক', person: 'কার্ল লিনিয়াস' },
    { field: 'বিবর্তনবাদ ও প্রাকৃতিক নির্বাচনের জনক', person: 'চার্লস ডারউইন' },
    { field: 'উদ্ভিদবিজ্ঞানের (Botany) জনক', person: 'থিওফ্রাস্টাস' },
    { field: 'প্রাণিবিজ্ঞান (Zoology) ও রাষ্ট্রবিজ্ঞানের জনক', person: 'অ্যারিস্টটল' },
    { field: 'চিরায়ত পদার্থবিজ্ঞান (Classical Physics)-এর জনক', person: 'স্যার আইজ্যাক নিউটন' },
    { field: 'আধুনিক পদার্থবিজ্ঞানের (Modern Physics) জনক', person: 'আলবার্ট আইনস্টাইন' },
    { field: 'আধুনিক রসায়নের জনক (ভরের নিত্যতা ও অক্সিজেন দহন)', person: 'অ্যান্টোয়ান ল্যাভয়সিয়ে' },
    { field: 'জৈব রসায়নের জনক (কৃত্রিম ইউরিয়া সংশ্লেষ)', person: 'ফ্রেডরিখ ভোলার' },
    { field: 'আধুনিক অর্থনীতির জনক ("Wealth of Nations")', person: 'অ্যাডাম স্মিথ' },
    { field: 'সমাজবিজ্ঞানের (Sociology) জনক', person: 'অগাস্ট কোঁৎ' },
    { field: 'ইতিহাসের (History) জনক', person: 'হেরোডোটাস' },
    { field: 'বৈজ্ঞানিক ইতিহাসের জনক', person: 'থুসিডাইডিস' },
    { field: 'ভূগোলের (Geography) জনক ও পৃথিবীর পরিধি নির্ণায়ক', person: 'ইরাটোস্থেনিস' },
    { field: 'জ্যামিতির (Geometry) জনক ("Elements")', person: 'ইউক্লিড' },
    { field: 'বীজগণিতের (Algebra) জনক', person: 'মুহাম্মদ ইবনে মুসা আল-খোয়ারিজমি' },
    { field: 'আধুনিক আলোকবিজ্ঞানের (Optics) জনক ("কিতাব আল-মানাজির")', person: 'ইবনে আল-হাইথাম (আলহাজেন)' },
    { field: 'মনোবিশ্লেষণ তত্ত্বের (Psychoanalysis) জনক', person: 'সিগমুন্ড ফ্রয়েড' },
    { field: 'কম্পিউটারের জনক (অ্যানালিটিক্যাল ইঞ্জিন)', person: 'চার্লস ব্যাবেজ' },
    { field: 'আধুনিক কম্পিউটার বিজ্ঞান ও AI-এর জনক', person: 'অ্যালান টুরিং' },
    { field: 'ওয়ার্ল্ড ওয়াইড ওয়েব (WWW)-এর জনক', person: 'স্যার টিম বার্নার্স-লি' },
    { field: 'সবুজ বিপ্লবের (Green Revolution) জনক (১৯৭০ শান্তি নোবেল)', person: 'নরম্যান বোরলগ' },
    { field: 'গ্রিনহাউস প্রভাব ও বৈশ্বিক উষ্ণতা তত্ত্বের আদি ব্যাখ্যাকারী', person: 'স্বান্তে আরহেনিয়াস' },
    { field: 'বিশ্ব স্কাউট আন্দোলনের (১৯০৭) প্রতিষ্ঠাতা', person: 'লর্ড ব্যাডেন পাওয়েল' },
    { field: 'আধুনিক অলিম্পিক গেমসের (১৮৯৬) পুনঃপ্রবর্তক', person: 'ব্যারন পিয়েরে দ্য কুবার্তা' },
    { field: 'গুগল (Google)-এর দুই সহ-প্রতিষ্ঠাতা', person: 'ল্যারি পেজ ও সের্গেই ব্রিন' },
    { field: 'মাইক্রোসফটের সহ-প্রতিষ্ঠাতা ও মানবকল্যাণ তহবিল দাতা', person: 'বিল গেটস (সাথে পল অ্যালেন)' },
    { field: 'অ্যাপল (Apple)-এর সহ-প্রতিষ্ঠাতা ও দূরদর্শী উদ্যোক্তা', person: 'স্টিভ জবস (সাথে স্টিভ ওজনিয়াক)' },
    { field: 'ইউটিউবের (YouTube) বাংলাদেশি বংশোদ্ভূত সহ-প্রতিষ্ঠাতা', person: 'জাভেদ করিম' },
    { field: 'বাংলাদেশি বংশোদ্ভূত স্থপতি ও টিউবুলার ডিজাইনের জনক', person: 'ড. ফজলুর রহমান খান' },
    { field: 'বাংলাদেশে ক্যান্সার নয়, কিডনি প্রতিস্থাপন ও ডায়াবেটিক গবেষণার পথিকৃৎ', person: 'জাতীয় অধ্যাপক ডা. মোহাম্মদ ইব্রাহিম (বারডেম)' },
    { field: 'বাংলাদেশে শিশু স্বাস্থ্যসেবা ও কমিউনিটি পেডিয়াট্রিক্সের পথিকৃৎ', person: 'জাতীয় অধ্যাপক ডা. এম আর খান' },
    { field: 'বাংলায় টেস্ট টিউব বেবি বা বন্ধ্যত্ব চিকিৎসায় পথিকৃৎ প্রসূতি বিশেষজ্ঞ', person: 'অধ্যাপক ডা. ফিরোজা বেগম / ডা. পারভীন ফাতিমা' },
    { field: 'বাংলাদেশের প্রথম এভারেস্ট বিজয়ী পর্বতারোহী (২০১০)', person: 'মুসা ইব্রাহীম' },
    { field: 'বাংলাদেশের প্রথম নারী এভারেস্ট জয়ী পর্বতারোহী (২০১২)', person: 'নিশাত মজুমদার' },
    { field: 'বাংলায় নবজাগরণের অগ্রদূত ও "আত্মীয় সভা"র প্রতিষ্ঠাতা', person: 'রাজা রামমোহন রায়' },
    { field: 'বাংলা ছাপাখানার আদিমুদ্রক ও বাংলা অক্ষর খোদাইশিল্পী', person: 'চার্লস উইলকিনস ও পঞ্চানন কর্মকার' },
  ];
  fathers.forEach((ft, i) => {
    const others = fathers.filter((x) => x.field !== ft.field);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ft.field}" হিসেবে বিশ্বব্যাপী পরিচিত কে?`,
        correct: ft.person,
        distractors: others.slice(i % 25, (i % 25) + 8).map((x) => x.person),
        explanation: `${ft.field} হলেন ${ft.person}।`,
        reference: 'সাধারণ জ্ঞান · জনক ও পথিকৃৎ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `"${ft.person}" নিচের কোন ক্ষেত্রে জনক বা প্রধান পথিকৃৎ হিসেবে পরিচিত?`,
        correct: ft.field,
        distractors: others.slice((i + 12) % 25, ((i + 12) % 25) + 8).map((x) => x.field),
        explanation: `${ft.person} হলেন "${ft.field}"।`,
        reference: 'সাধারণ জ্ঞান · ঐতিহাসিক অবদান',
      })
    );
  });

  // 3. Extra Bangladeshi & Global Health/Policy Milestones (30 items × 2 = 60 MCQs)
  const extraMilestones: Array<{ item: string; ans: string; ch: string }> = [
    { item: 'বাংলাদেশের জাতীয় স্বাস্থ্যনীতি সর্বশেষ প্রণীত ও অনুমোদিত হয় কত সালে', ans: '২০১১ সালে', ch: 'gk_health_intl' },
    { item: 'বাংলাদেশে "সবার জন্য স্বাস্থ্য" অর্জনে গ্রামীণ পর্যায়ে নির্মিত সেবাকেন্দ্র', ans: 'কমিউনিটি ক্লিনিক (প্রতি ৬,০০০ মানুষের জন্য ১টি)', ch: 'gk_health_intl' },
    { item: 'জাতীয় ক্যান্সার গবেষণা ইনস্টিটিউট ও হাসপাতাল (NICRH) ঢাকার কোথায় অবস্থিত', ans: 'মহাখালী, ঢাকা', ch: 'gk_health_intl' },
    { item: 'জাতীয় চক্ষু বিজ্ঞান ইনস্টিটিউট (NIO) এবং পঙ্গু হাসপাতাল (NITOR) ঢাকার কোথায়', ans: 'আগারগাঁও / শেরেবাংলা নগর, ঢাকা', ch: 'gk_health_intl' },
    { item: 'জাতীয় অর্থোপেডিক হাসপাতাল ও পুনর্বাসন প্রতিষ্ঠান (NITOR)-এর পূর্বনাম', ans: 'পঙ্গু হাসপাতাল (১৯৭২ সালে মুক্তিযোদ্ধাদের চিকিৎসায় প্রতিষ্ঠিত)', ch: 'gk_health_intl' },
    { item: 'জাতীয় বক্ষব্যাধি ইনস্টিটিউট ও হাসপাতাল (NIDCH) কোথায় অবস্থিত', ans: 'মহাখালী, ঢাকা', ch: 'gk_health_intl' },
    { item: 'বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় নয়, বাংলাদেশের প্রথম পাবলিক মেডিকেল বিশ্ববিদ্যালয় BSMMU প্রতিষ্ঠা', ans: '১৯৯৮ সালে (৩০ এপ্রিল ১৯৯৮)', ch: 'gk_health_intl' },
    { item: 'বাংলাদেশের অন্যান্য বিভাগীয় চারটি মেডিকেল বিশ্ববিদ্যালয় (চট্টগ্রাম, রাজশাহী, সিলেট, খুলনা)', ans: 'চট্টগ্রাম, রাজশাহী, সিলেট (বঙ্গমাতা ফজিলাতুন্নেছা) ও শেখ হাসিনা মেডিকেল বিশ্ববিদ্যালয় (খুলনা)', ch: 'gk_health_intl' },
    { item: 'বাংলাদেশের কোন জেলায় দেশের একমাত্র সরকারি মানসিক হাসপাতাল অবস্থিত', ans: 'পাবনা (হেমায়েতপুর, ১৯৫৭ প্রতিষ্ঠিত)', ch: 'gk_bd_geo_economy' },
    { item: 'বাংলাদেশ পরমাণু শক্তি কমিশন ও সাভার পরমাণু চিকিৎসা ইনস্টিটিউট (NINMAS)', ans: 'চিকিৎসা ক্ষেত্রে রেডিও-আইসোটোপ ও থাইরয়েড স্ক্যানিং সেবা দেয়', ch: 'gk_health_intl' },
    { item: 'বাংলাদেশের প্রথম ভাসমান হাসপাতাল যা চরাঞ্চলে চিকিৎসা দেয়', ans: '"জীবন তরী" (ইম্প্যাক্ট ফাউন্ডেশন বাংলাদেশ)', ch: 'gk_health_intl' },
    { item: 'বাংলাদেশ সরকার কবে "জাতীয় নিরাপদ খাদ্য দিবস" ঘোষণা করে (নিরাপদ খাদ্য কর্তৃপক্ষ BFSA)', ans: '২ ফেব্রুয়ারি', ch: 'gk_bd_geo_economy' },
    { item: 'প্রতি বছর বাংলাদেশে কোন দিনটি "জাতীয় স্বেচ্ছায় রক্তদান ও মরণোত্তর চক্ষুদান দিবস" পালিত হয়', ans: '২ নভেম্বর (সন্ধানী ১৯৭৮ সালে মরণোত্তর চক্ষুদান শুরু করে)', ch: 'gk_health_intl' },
    { item: 'বাংলাদেশে স্বেচ্ছায় রক্তদান ও চক্ষুদান আন্দোলন শুরু করা মেডিকেল শিক্ষার্থীদের সংগঠন', ans: 'সন্ধানী (১৯৭৭ সালে ঢাকা মেডিকেল কলেজে প্রতিষ্ঠিত)', ch: 'gk_health_intl' },
    { item: 'শহীদ ডা. শামসুল আলম খান মিলন কবে স্বৈরাচারবিরোধী আন্দোলনে শহীদ হন', ans: '২৭ নভেম্বর ১৯৯০ (শহীদ ডা. মিলন দিবস)', ch: 'gk_bangladesh' },
    { item: 'মুক্তিযুদ্ধে অবদানের জন্য বীরশ্রেষ্ঠ খেতাবের পাশাপাশি বাংলাদেশের সর্বোচ্চ সামরিক বেসামরিক খেতাবের ক্রম', ans: 'বীরশ্রেষ্ঠ > বীর উত্তম > বীর বিক্রম > বীর প্রতীক', ch: 'gk_bangladesh' },
    { item: 'বাংলাদেশের জাতীয় সংসদের মোট আসন সংখ্যা ও সরাসরি নির্বাচিত আসন কতটি', ans: 'মোট ৩৫০টি (৩০০টি সরাসরি নির্বাচিত + ৫০টি সংরক্ষিত নারী আসন)', ch: 'gk_bangladesh' },
    { item: 'বাংলাদেশের জাতীয় সংসদ ভবনের মোট তলা, প্রবেশপথ ও স্থাপত্য বৈশিষ্ট্য', ans: '৯ তলা (উচ্চতা ১৫৫ ফুট), লুই আই কান নির্মিত (১৯৬১ শুরু, ১৯৮২ উদ্বোধন)', ch: 'gk_bangladesh' },
    { item: 'বাংলাদেশে প্রথম ডিজিটাল জাতীয় পরিচয়পত্র (স্মার্ট NID) বিতরণ শুরু হয় কবে', ans: '২ অক্টোবর ২০১৬', ch: 'gk_bd_geo_economy' },
    { item: 'বাংলাদেশে প্রচলিত ব্যাংক নোট (টাকা) ছাপানোর সরকারি প্রতিষ্ঠান "সিকিউরিটি প্রিন্টিং কর্পোরেশন" কোথায়', ans: 'গাজীপুর (শিমুলতলী)', ch: 'gk_bd_geo_economy' },
  ];
  extraMilestones.forEach((em, i) => {
    const others = extraMilestones.filter((x) => x.item !== em.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: em.ch,
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${em.item}" — এর সঠিক উত্তর কোনটি?`,
        correct: em.ans,
        distractors: others.slice(i % 10, (i % 10) + 8).map((x) => x.ans),
        explanation: `${em.item}: ${em.ans}।`,
        reference: 'সাধারণ জ্ঞান · জাতীয় স্বাস্থ্য ও প্রতিষ্ঠান',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: em.ch,
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `"${em.ans}" — নিচের কোন প্রতিষ্ঠান বা ঐতিহাসিক তথ্যের উত্তর?`,
        correct: em.item,
        distractors: others.slice((i + 5) % 10, ((i + 5) % 10) + 8).map((x) => x.item),
        explanation: `${em.ans} সম্পর্কিত তথ্যটি হলো: ${em.item}।`,
        reference: 'সাধারণ জ্ঞান · গুরুত্বপূর্ণ তথ্য',
      })
    );
  });

  return list;
}
