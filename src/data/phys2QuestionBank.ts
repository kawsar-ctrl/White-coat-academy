import { McqQuestion } from '../types/learning';
import { synthesizeFromFacts } from './bioQuestionHelpers';
import { PHYS2_FACTS_PART1 } from './phys2FactsPart1';
import { PHYS2_FACTS_PART2 } from './phys2FactsPart2';
import { PHYS2_FACTS_PART3 } from './phys2FactsPart3';
import { PHYS2_FACTS_PART4 } from './phys2FactsPart4';
import { PHYS2_FACTS_PART5 } from './phys2FactsPart5';
import { PHYS2_FACTS_PART6 } from './phys2FactsPart6';
import { PHYS2_FACTS_PART7 } from './phys2FactsPart7';
import { PHYS2_FACTS_PART8 } from './phys2FactsPart8';
import { PHYS2_FACTS_PART9 } from './phys2FactsPart9';
import { PHYS2_FACTS_PART10 } from './phys2FactsPart10';
import { PHYS2_FACTS_PART11 } from './phys2FactsPart11';
import { buildPhys2StructuredA } from './phys2StructuredA';
import { buildPhys2StructuredB } from './phys2StructuredB';
import { buildPhys2StructuredC } from './phys2StructuredC';
import { buildPhys2StructuredD } from './phys2StructuredD';
import { buildPhys2StructuredE } from './phys2StructuredE';
import { buildPhys2StructuredF } from './phys2StructuredF';
import { buildPhys2StructuredG } from './phys2StructuredG';
import { buildPhys2StructuredH } from './phys2StructuredH';
import { buildPhys2StructuredI } from './phys2StructuredI';
import { buildPhys2StructuredJ } from './phys2StructuredJ';
import { buildPhys2StructuredK } from './phys2StructuredK';
import { buildPhys2StructuredL } from './phys2StructuredL';
import { buildPhys2StructuredM } from './phys2StructuredM';
import { buildPhys2StructuredN } from './phys2StructuredN';
import { buildPhys2StructuredO } from './phys2StructuredO';
import { buildPhys2StructuredP } from './phys2StructuredP';
import { buildPhys2StructuredQ } from './phys2StructuredQ';
import { buildPhys2StructuredR } from './phys2StructuredR';
import { buildPhys2StructuredS } from './phys2StructuredS';

const ALL_PHYS2_FACTS = [
  ...PHYS2_FACTS_PART1,
  ...PHYS2_FACTS_PART2,
  ...PHYS2_FACTS_PART3,
  ...PHYS2_FACTS_PART4,
  ...PHYS2_FACTS_PART5,
  ...PHYS2_FACTS_PART6,
  ...PHYS2_FACTS_PART7,
  ...PHYS2_FACTS_PART8,
  ...PHYS2_FACTS_PART9,
  ...PHYS2_FACTS_PART10,
  ...PHYS2_FACTS_PART11,
];

const PHYS2_CATEGORY_POOLS: Record<string, string[]> = {
  'তাপগতিবিদ্যা': [
    'তাপগতিবিদ্যার শূন্যতম সূত্র',
    'সমোষ্ণ প্রক্রিয়া',
    'রুদ্ধতাপীয় প্রক্রিয়া',
    'কার্নো ইঞ্জিন',
    'এনট্রপি (Entropy)',
    'রেফ্রিজারেটর ও COP',
  ],
  'স্থির তড়িৎ': [
    'কুলম্বের সূত্র',
    'গাউসের সূত্র ও তড়িৎ ফ্লাক্স',
    'সমবিভব তল',
    'তড়িৎ দ্বিমেরু',
    'সমান্তরাল পাত ধারক',
  ],
  'চল তড়িৎ': [
    'তাড়ন বেগ ও ওহমের সূত্র',
    'কার্শফের সূত্র',
    'হুইটস্টোন ব্রিজ ও পোটেনশিওমিটার',
    'শান্ট ও অ্যামিটার',
    'জুলের তাপন সূত্র',
  ],
  'চৌম্বক ক্রিয়া ও আবেশ': [
    'লরেঞ্জ বল',
    'বায়ো-স্যাভার্ট সূত্র',
    'ফ্যারাডের সূত্র ও লেঞ্জের সূত্র',
    'ট্রান্সফরমার',
    'LCR অনুনাদ বর্তনী',
  ],
  'জ্যামিতিক আলোকবিজ্ঞান': [
    'স্নেলের সূত্র ও প্রতিসরণাঙ্ক',
    'পূর্ণ অভ্যন্তরীণ প্রতিফলন (TIR)',
    'প্রিজম ও বিচ্ছুরণ',
    'লেন্সের ক্ষমতা ও সমবায়',
  ],
  'ভৌত আলোকবিজ্ঞান': [
    'হাইগেনসের তরঙ্গ তত্ত্ব',
    'ইয়ং-এর দ্বি-চির ব্যতিচার',
    'আলোর অপবর্তন ও গ্রেটিং',
    'আলোর সমবর্তন ও ব্রুস্টারের সূত্র',
  ],
  'আধুনিক পদার্থবিজ্ঞান': [
    'বিশেষ আপেক্ষিক তত্ত্ব',
    'আলোকতড়িৎ ক্রিয়া',
    'কম্পটন ক্রিয়া ও ডি-ব্রগলি তরঙ্গ',
    'এক্স-রে উৎপাদন',
  ],
  'পরমাণু ও নিউক্লিয়ার পদার্থ': [
    'বোরের পরমাণু মডেল ও বর্ণালি',
    'তেজস্ক্রিয় ক্ষয় ও অর্ধায়ু',
    'নিউক্লীয় ফিশন ও ফিউশন',
    'ভর-ত্রুটি ও বন্ধন শক্তি',
  ],
  'সেমিকন্ডাক্টর ও ইলেকট্রনিক্স': [
    'n-টাইপ ও p-টাইপ অর্ধপরিবাহী',
    'p-n জংশন ডায়োড',
    'বাইপোলার ট্রানজিস্টর',
    'লজিক গেট ও বুলিয়ান সূত্র',
  ],
  'জ্যোতির্বিজ্ঞান': [
    'চন্দ্রশেখর সীমা',
    'শোয়ার্জশিল্ড ব্যাসার্ধ ও কৃষ্ণগহ্বর',
    'হাবলের সূত্র ও বিগ ব্যাং',
    'পালসার ও নিউট্রন তারা',
  ],
};

const PHYS2_HALLMARK_POOL = ALL_PHYS2_FACTS.map((f) => f.hallmark).filter((x): x is string => Boolean(x));
const PHYS2_SITE_POOL = ALL_PHYS2_FACTS.map((f) => f.site).filter((x): x is string => Boolean(x));
const PHYS2_METRIC_POOL = ALL_PHYS2_FACTS.map((f) => f.metric).filter((x): x is string => Boolean(x));
const PHYS2_EXAMPLE_POOL = ALL_PHYS2_FACTS.map((f) => f.example).filter((x): x is string => Boolean(x));

const PHYS2_DISCOVERER_POOL = [
  'সাদি কার্নো (১৮২৪)',
  'রুডলফ ক্লসিয়াস (১৮৬৫)',
  'চার্লস কুলম্ব (১৭৮৫)',
  'জর্জ সাইমন ওহম (১৮২৭)',
  'মাইকেল ফ্যারাডে (১৮৩১)',
  'হাইনরিখ লেঞ্জ (১৮৩৪)',
  'জেমস ক্লার্ক ম্যাক্সওয়েল (১৮৬৪)',
  'থমাস ইয়ং (১৮০১)',
  'ডেভিড ব্রুস্টার (১৮১৫)',
  'আলবার্ট আইনস্টাইন (১৯০৫)',
  'আর্থার কম্পটন (১৯২৩)',
  'উইলহেল্ম কনরাড রন্টজেন (১৮৯৫)',
  'হেনরি বেকেরেল (১৮৯৬)',
  'নিলস বোর (১৯১৩)',
  'জর্জ বুল (১৮৫৪)',
];

const FACT_MCQS_PHYS2: McqQuestion[] = synthesizeFromFacts({
  prefix: 'phys2_fact',
  subjectId: 'phys_2',
  hscLevel: '12',
  facts: ALL_PHYS2_FACTS,
  categoryPools: PHYS2_CATEGORY_POOLS,
  hallmarkPool: PHYS2_HALLMARK_POOL,
  discovererPool: PHYS2_DISCOVERER_POOL,
  sitePool: PHYS2_SITE_POOL,
  metricPool: PHYS2_METRIC_POOL,
  examplePool: PHYS2_EXAMPLE_POOL,
});

const RAW_PHYS2_POOL: McqQuestion[] = [
  ...FACT_MCQS_PHYS2,
  ...buildPhys2StructuredA(),
  ...buildPhys2StructuredB(),
  ...buildPhys2StructuredC(),
  ...buildPhys2StructuredD(),
  ...buildPhys2StructuredE(),
  ...buildPhys2StructuredF(),
  ...buildPhys2StructuredG(),
  ...buildPhys2StructuredH(),
  ...buildPhys2StructuredI(),
  ...buildPhys2StructuredJ(),
  ...buildPhys2StructuredK(),
  ...buildPhys2StructuredL(),
  ...buildPhys2StructuredM(),
  ...buildPhys2StructuredN(),
  ...buildPhys2StructuredO(),
  ...buildPhys2StructuredP(),
  ...buildPhys2StructuredQ(),
  ...buildPhys2StructuredR(),
  ...buildPhys2StructuredS(),
];

const seenPhys2Text = new Set<string>();
const DEDUPED_PHYS2: McqQuestion[] = [];
for (const q of RAW_PHYS2_POOL) {
  const norm = q.question.trim().replace(/\s+/g, ' ');
  if (seenPhys2Text.has(norm)) continue;
  seenPhys2Text.add(norm);
  DEDUPED_PHYS2.push({
    ...q,
    id: `phys2_q_${String(DEDUPED_PHYS2.length + 1).padStart(4, '0')}`,
  });
}

export const PHYS2_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_PHYS2.slice(0, 4500);
