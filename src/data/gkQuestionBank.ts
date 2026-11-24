import { McqQuestion } from '../types/learning';
import { synthesizeFromFacts } from './bioQuestionHelpers';
import { GK_FACTS_PART1 } from './gkFactsPart1';
import { GK_FACTS_PART2 } from './gkFactsPart2';
import { GK_FACTS_PART3 } from './gkFactsPart3';
import { buildGkStructuredA } from './gkStructuredA';
import { buildGkStructuredB } from './gkStructuredB';
import { buildGkStructuredC } from './gkStructuredC';
import { buildGkStructuredD } from './gkStructuredD';
import { buildGkStructuredE } from './gkStructuredE';
import { buildGkStructuredF } from './gkStructuredF';
import { buildGkStructuredG } from './gkStructuredG';
import { buildGkStructuredH } from './gkStructuredH';
import { buildGkStructuredI } from './gkStructuredI';
import { buildGkStructuredJ } from './gkStructuredJ';
import { buildGkStructuredK } from './gkStructuredK';
import { buildGkStructuredL } from './gkStructuredL';
import { buildGkStructuredM } from './gkStructuredM';
import { buildGkStructuredN } from './gkStructuredN';
import { buildGkStructuredO } from './gkStructuredO';
import { buildGkStructuredP } from './gkStructuredP';

const ALL_GK_FACTS = [...GK_FACTS_PART1, ...GK_FACTS_PART2, ...GK_FACTS_PART3];

const GK_CATEGORY_POOLS: Record<string, string[]> = {
  'মুক্তিযুদ্ধ ও ইতিহাস': [
    '১৯৫২ সালের ভাষা আন্দোলন ও ২১শে ফেব্রুয়ারি',
    'ঐতিহাসিক ৬ দফা দাবি (১৯৬৬)',
    '১৯৬৯-এর গণঅভ্যুত্থান ও আগরতলা ষড়যন্ত্র মামলা',
    '৭ই মার্চের ঐতিহাসিক ভাষণ ও ২৬শে মার্চ স্বাধীনতা ঘোষণা',
    'মুজিবনগর সরকার (বাংলাদেশের প্রথম অস্থায়ী সরকার)',
    'মুক্তিযুদ্ধের ১১টি সেক্টর ও জেড-কে-এস ফোর্স',
    '১৬ই ডিসেম্বর বিজয়, ১৪ই ডিসেম্বর বুদ্ধিজীবী দিবস ও বিদেশি বন্ধু',
    'বাংলাদেশ গণপরিষদ ও প্রথম মন্ত্রিসভা (১৯৭২)',
    '১৯৭১ সালের মুক্তিযুদ্ধের বিদেশি সমর্থন ও সাংবাদিকতা',
  ],
  'সংবিধান ও শাসনব্যবস্থা': [
    'বাংলাদেশের সংবিধান (১৯৭২) ও মূলনীতি',
    'বাংলাদেশের সংসদ ও সাংবিধানিক প্রতিষ্ঠান',
    'মৌলিক অধিকার ও বিচার বিভাগ',
  ],
  'বাংলার প্রাচীন ইতিহাস': [
    'প্রাচীন বাংলার জনপদ, পাল ও সেন আমল',
    'পুণ্ড্রবর্ধন, গৌড় ও সমতট জনপদ',
  ],
  'বাংলার মধ্যযুগীয় ইতিহাস': [
    'সুলতানি ও মুঘল আমল এবং ঢাকা রাজধানী',
    'বাংলার বিখ্যাত প্রাচীন ও মধ্যযুগীয় স্থাপত্য',
  ],
  'ব্রিটিশ ও পাকিস্তান আমল': [
    'ব্রিটিশ বিরোধী আন্দোলন, বঙ্গভঙ্গ (১৯০৫) ও লাহোর প্রস্তাব (১৯৪০)',
    'ফকির-সন্ন্যাসী বিদ্রোহ ও নীল বিদ্রোহ',
  ],
  'জাতীয় বিষয়াবলি': [
    'বাংলাদেশের জাতীয় প্রতীক, সংগীত ও স্মৃতিসৌধ',
    'বাংলা সাহিত্য ও ভাষা-ঐতিহ্যের মাইলফলক',
  ],
  'বাংলাদেশের ভূগোল': [
    'বাংলাদেশের ভৌগোলিক অবস্থান, আয়তন ও সীমান্ত',
    'বাংলাদেশের পাহাড়, উপত্যকা, ঝরনা ও জলবায়ু',
  ],
  'বাংলাদেশের নদ-নদী': [
    'বাংলাদেশের প্রধান নদ-নদী ও আন্তঃসীমান্ত নদী',
    'বাংলাদেশের নদ-নদী ও প্রধান সেতুসমূহ',
  ],
  'পরিবেশ ও বন': [
    'সুন্দরবন ও বাংলাদেশের বনাঞ্চল',
    'টাঙ্গুয়ার হাওর ও রামসার সাইট',
  ],
  'অবকাঠামো ও অর্থনীতি': [
    'পদ্মা সেতু, মেট্রোরেল ও কর্ণফুলী টানেল (মেগা প্রকল্প)',
    'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্র ও মাতারবাড়ী বন্দর',
  ],
  'অর্থনীতি ও কৃষি': [
    'বাংলাদেশের কৃষি, জিডিপি ও GI পণ্য',
    'বাংলাদেশের কৃষি গবেষণা ও উচ্চফলনশীল জাত',
  ],
  'বাংলাদেশের স্বাস্থ্য খাত': [
    'বাংলাদেশের চিকিৎসা শিক্ষা ও স্বাস্থ্য ব্যবস্থা',
    'মানবদেহ, পুষ্টি ও জনস্বাস্থ্যবিষয়ক সাধারণ জ্ঞান',
  ],
  'আন্তর্জাতিক সংস্থা': [
    'বিশ্ব স্বাস্থ্য সংস্থা (WHO) ও জাতিসংঘের সংস্থাসমূহ',
    'আঞ্চলিক ও আন্তর্জাতিক জোট (SAARC, OIC, BIMSTEC, BRICS)',
    'জাতিসংঘ শান্তিরক্ষা মিশন ও আন্তর্জাতিক কূটনীতি',
  ],
  'চিকিৎসা বিজ্ঞান ও নোবেল': [
    'চিকিৎসাবিজ্ঞানের যুগান্তকারী আবিষ্কার ও জনকসমূহ',
  ],
  'বিশ্ব ভূগোল': [
    'বিশ্ব ভূগোল — প্রণালি, খাল, মহাসাগর ও মরুভূমি',
    'বিশ্বের প্রাচীন সভ্যতা ও সপ্তাশ্চর্য',
  ],
  'পুরস্কার ও সম্মাননা': [
    'নোবেল পুরস্কার ও বিশ্ববিখ্যাত সম্মাননা',
  ],
  'বিজ্ঞান ও সাম্প্রতিক': [
    'মহাকাশ, প্রযুক্তি ও পরিবেশ সম্মেলন',
  ],
};

const GK_HALLMARK_POOL = ALL_GK_FACTS.map((f) => f.hallmark).filter((x): x is string => Boolean(x));
const GK_SITE_POOL = ALL_GK_FACTS.map((f) => f.site).filter((x): x is string => Boolean(x));
const GK_METRIC_POOL = ALL_GK_FACTS.map((f) => f.metric).filter((x): x is string => Boolean(x));
const GK_EXAMPLE_POOL = ALL_GK_FACTS.map((f) => f.example).filter((x): x is string => Boolean(x));

const FACT_MCQS_GK: McqQuestion[] = synthesizeFromFacts({
  prefix: 'gk_fact',
  subjectId: 'gk',
  medicalGroup: 'gk',
  hscLevel: 'admission',
  facts: ALL_GK_FACTS,
  categoryPools: GK_CATEGORY_POOLS,
  hallmarkPool: GK_HALLMARK_POOL,
  discovererPool: ['হামিদুর রহমান', 'লুই আই কান', 'ড. মাকসুদুল আলম', 'এডওয়ার্ড জেনার', 'সৈয়দ মাইনুল হোসেন'],
  sitePool: GK_SITE_POOL,
  metricPool: GK_METRIC_POOL,
  examplePool: GK_EXAMPLE_POOL,
});

const RAW_GK_POOL: McqQuestion[] = [
  ...FACT_MCQS_GK,
  ...buildGkStructuredA(),
  ...buildGkStructuredB(),
  ...buildGkStructuredC(),
  ...buildGkStructuredD(),
  ...buildGkStructuredE(),
  ...buildGkStructuredF(),
  ...buildGkStructuredG(),
  ...buildGkStructuredH(),
  ...buildGkStructuredI(),
  ...buildGkStructuredJ(),
  ...buildGkStructuredK(),
  ...buildGkStructuredL(),
  ...buildGkStructuredM(),
  ...buildGkStructuredN(),
  ...buildGkStructuredO(),
  ...buildGkStructuredP(),
];

const seenGkText = new Set<string>();
const DEDUPED_GK: McqQuestion[] = [];
for (const q of RAW_GK_POOL) {
  const norm = q.question.trim().replace(/\s+/g, ' ');
  if (seenGkText.has(norm)) continue;
  seenGkText.add(norm);
  DEDUPED_GK.push({
    ...q,
    subjectId: 'gk',
    medicalGroup: 'gk',
    id: `gk_q_${String(DEDUPED_GK.length + 1).padStart(4, '0')}`,
  });
}

export const GK_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_GK.slice(0, 4000);
