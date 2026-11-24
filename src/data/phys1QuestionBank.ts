import { McqQuestion } from '../types/learning';
import { synthesizeFromFacts } from './bioQuestionHelpers';
import { PHYS1_FACTS_PART1 } from './phys1FactsPart1';
import { PHYS1_FACTS_PART2 } from './phys1FactsPart2';
import { PHYS1_FACTS_PART3 } from './phys1FactsPart3';
import { PHYS1_FACTS_PART4 } from './phys1FactsPart4';
import { PHYS1_FACTS_PART5 } from './phys1FactsPart5';
import { PHYS1_FACTS_PART6 } from './phys1FactsPart6';
import { PHYS1_FACTS_PART7 } from './phys1FactsPart7';
import { PHYS1_FACTS_PART8 } from './phys1FactsPart8';
import { PHYS1_FACTS_PART9 } from './phys1FactsPart9';
import { PHYS1_FACTS_PART10 } from './phys1FactsPart10';
import { buildPhys1StructuredA } from './phys1StructuredA';
import { buildPhys1StructuredB } from './phys1StructuredB';
import { buildPhys1StructuredC } from './phys1StructuredC';
import { buildPhys1StructuredD } from './phys1StructuredD';
import { buildPhys1StructuredE } from './phys1StructuredE';
import { buildPhys1StructuredF } from './phys1StructuredF';
import { buildPhys1StructuredG } from './phys1StructuredG';
import { buildPhys1StructuredH } from './phys1StructuredH';
import { buildPhys1StructuredI } from './phys1StructuredI';
import { buildPhys1StructuredJ } from './phys1StructuredJ';
import { buildPhys1StructuredK } from './phys1StructuredK';
import { buildPhys1StructuredL } from './phys1StructuredL';
import { buildPhys1StructuredM } from './phys1StructuredM';
import { buildPhys1StructuredN } from './phys1StructuredN';
import { buildPhys1StructuredO } from './phys1StructuredO';
import { buildPhys1StructuredP } from './phys1StructuredP';
import { buildPhys1StructuredQ } from './phys1StructuredQ';
import { buildPhys1StructuredR } from './phys1StructuredR';

const ALL_PHYS1_FACTS = [
  ...PHYS1_FACTS_PART1,
  ...PHYS1_FACTS_PART2,
  ...PHYS1_FACTS_PART3,
  ...PHYS1_FACTS_PART4,
  ...PHYS1_FACTS_PART5,
  ...PHYS1_FACTS_PART6,
  ...PHYS1_FACTS_PART7,
  ...PHYS1_FACTS_PART8,
  ...PHYS1_FACTS_PART9,
  ...PHYS1_FACTS_PART10,
];

const PHYS1_CATEGORY_POOLS: Record<string, string[]> = {
  'ভৌত রাশি ও পরিমাপ': [
    'ভার্নিয়ার স্কেল ও ধ্রুবক',
    'স্ক্রু গজ ও পিচ',
    'পারসেক ও আলোকবর্ষ',
    'মৌলিক ও লব্ধ একক',
    'শতকরা ত্রুটি ও মাত্রা',
  ],
  'ভেক্টর বিশ্লেষণ': [
    'সামান্তরিক সূত্র ও লব্ধি',
    'ডট (স্কেলার) গুণন',
    'ক্রস (ভেক্টর) গুণন',
    'গ্রেডিয়েন্ট, ডাইভারজেন্স ও কার্ল',
    'নৌকা ও স্রোতের আপেক্ষিক বেগ',
  ],
  'গতিবিদ্যা ও প্রাস': [
    'প্রাসের সর্বাধিক উচ্চতা ও পাল্লা',
    'বেগ-সময় লেখচিত্র',
    'সুষম ত্বরণ ও পড়ন্ত বস্তু',
    'কৌণিক ত্বরণ ও কেন্দ্রমুখী ত্বরণ',
  ],
  'নিউটনিয়ান বলবিদ্যা': [
    'ভরবেগের সংরক্ষণ',
    'টর্ক ও জড়তার ভ্রামক',
    'কৌণিক ভরবেগ ও ঘূর্ণন',
    'ঘর্ষণ ও রাস্তার ব্যাংকিং',
  ],
  'কাজ, ক্ষমতা ও শক্তি': [
    'কাজ-শক্তি উপপাদ্য',
    'যান্ত্রিক শক্তির সংরক্ষণ',
    'ক্ষমতা ও কর্মদক্ষতা',
    'স্প্রিংয়ের বিভব শক্তি',
  ],
  'মহাকর্ষ ও অভিকর্ষ': [
    'কেপলারের গ্রহীয় গতিসূত্র',
    'মুক্তিবেগ (Escape Velocity)',
    'ভূ-স্থির কৃত্রিম উপগ্রহ',
    'মহাকর্ষীয় বিভব ও প্রাবল্য',
  ],
  'পদার্থের গাঠনিক ধর্ম': [
    'হুকের সূত্র ও ইয়ং-এর গুণাঙ্ক',
    'পয়সনের অনুপাত ও দৃঢ়তা',
    'সান্দ্রতা ও স্টোকসের সূত্র',
    'পৃষ্ঠটান ও কৈশিক নল',
  ],
  'পর্যাবৃত্ত গতি (SHM)': [
    'সরল ছন্দিত স্পন্দনের সমীকরণ',
    'সেকেন্ড দোলক',
    'স্প্রিং-ভর দোলক',
    'SHM-এ বিভব ও গতিশক্তি',
  ],
  'তরঙ্গ ও শব্দ': [
    'অগ্রগামী ও স্থির তরঙ্গ',
    'শব্দের বেগ ও ল্যাপ্লাস সংশোধন',
    'ডপলার ক্রিয়া ও বিট',
    'অর্গান নল ও তীব্রতা লেভেল',
  ],
  'আদর্শ গ্যাস ও গতিতত্ত্ব': [
    'বয়েল, চার্লস ও রেনোর সূত্র',
    'গ্যাসের গড় বর্গবেগের বর্গমূল',
    'স্বাধীনতার মাত্রা ও সমবিভাজন',
    'আপেক্ষিক আর্দ্রতা ও শিশিরাঙ্ক',
  ],
};

const PHYS1_HALLMARK_POOL = ALL_PHYS1_FACTS.map((f) => f.hallmark).filter((x): x is string => Boolean(x));
const PHYS1_SITE_POOL = ALL_PHYS1_FACTS.map((f) => f.site).filter((x): x is string => Boolean(x));
const PHYS1_METRIC_POOL = ALL_PHYS1_FACTS.map((f) => f.metric).filter((x): x is string => Boolean(x));
const PHYS1_EXAMPLE_POOL = ALL_PHYS1_FACTS.map((f) => f.example).filter((x): x is string => Boolean(x));

const PHYS1_DISCOVERER_POOL = [
  'স্যার আইজ্যাক নিউটন (১৬৮৭)',
  'গ্যালিলিও গ্যালিলি (১৬৩৮)',
  'জোহানেস কেপলার (১৬০৯–১৬১৯)',
  'রবার্ট হুক (১৬৭৬)',
  'টমাস ইয়ং (১৮০৭)',
  'জর্জ গ্যাব্রিয়েল স্টোকস (১৮৫১)',
  'ড্যানিয়েল বার্নৌলি (১৭৩৮)',
  'পিয়েরে সাইমন ল্যাপ্লাস (১৮১৬)',
  'রবার্ট বয়েল (১৬৬২)',
  'জ্যাক চার্লস (১৭৮৭)',
  'হেনরি ক্যাভেন্ডিশ (১৭৯৮)',
  'পিয়েরে ভার্নিয়ার (১৬৩১)',
  'ম্যাক্স প্ল্যাঙ্ক (১৯০০)',
  'আলেকজান্ডার গ্রাহাম বেল',
];

const FACT_MCQS_PHYS1: McqQuestion[] = synthesizeFromFacts({
  prefix: 'phys1_fact',
  subjectId: 'phys_1',
  hscLevel: '11',
  facts: ALL_PHYS1_FACTS,
  categoryPools: PHYS1_CATEGORY_POOLS,
  hallmarkPool: PHYS1_HALLMARK_POOL,
  discovererPool: PHYS1_DISCOVERER_POOL,
  sitePool: PHYS1_SITE_POOL,
  metricPool: PHYS1_METRIC_POOL,
  examplePool: PHYS1_EXAMPLE_POOL,
});

const RAW_PHYS1_POOL: McqQuestion[] = [
  ...FACT_MCQS_PHYS1,
  ...buildPhys1StructuredA(),
  ...buildPhys1StructuredB(),
  ...buildPhys1StructuredC(),
  ...buildPhys1StructuredD(),
  ...buildPhys1StructuredE(),
  ...buildPhys1StructuredF(),
  ...buildPhys1StructuredG(),
  ...buildPhys1StructuredH(),
  ...buildPhys1StructuredI(),
  ...buildPhys1StructuredJ(),
  ...buildPhys1StructuredK(),
  ...buildPhys1StructuredL(),
  ...buildPhys1StructuredM(),
  ...buildPhys1StructuredN(),
  ...buildPhys1StructuredO(),
  ...buildPhys1StructuredP(),
  ...buildPhys1StructuredQ(),
  ...buildPhys1StructuredR(),
];

const seenPhys1Text = new Set<string>();
const DEDUPED_PHYS1: McqQuestion[] = [];
for (const q of RAW_PHYS1_POOL) {
  const norm = q.question.trim().replace(/\s+/g, ' ');
  if (seenPhys1Text.has(norm)) continue;
  seenPhys1Text.add(norm);
  DEDUPED_PHYS1.push({
    ...q,
    id: `phys1_q_${String(DEDUPED_PHYS1.length + 1).padStart(4, '0')}`,
  });
}

export const PHYS1_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_PHYS1.slice(0, 4500);
