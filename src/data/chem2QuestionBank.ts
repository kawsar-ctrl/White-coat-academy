import { McqQuestion } from '../types/learning';
import { synthesizeFromFacts } from './bioQuestionHelpers';
import { CHEM2_FACTS_PART1 } from './chem2FactsPart1';
import { CHEM2_FACTS_PART2 } from './chem2FactsPart2';
import { CHEM2_FACTS_PART3 } from './chem2FactsPart3';
import { CHEM2_FACTS_PART4 } from './chem2FactsPart4';
import { CHEM2_FACTS_PART5 } from './chem2FactsPart5';
import { CHEM2_FACTS_PART6 } from './chem2FactsPart6';
import { CHEM2_FACTS_PART7 } from './chem2FactsPart7';
import { CHEM2_FACTS_PART8 } from './chem2FactsPart8';
import { CHEM2_FACTS_PART9 } from './chem2FactsPart9';
import { buildChem2StructuredA } from './chem2StructuredA';
import { buildChem2StructuredB } from './chem2StructuredB';
import { buildChem2StructuredC } from './chem2StructuredC';
import { buildChem2StructuredD } from './chem2StructuredD';
import { buildChem2StructuredE } from './chem2StructuredE';
import { buildChem2StructuredF } from './chem2StructuredF';
import { buildChem2StructuredG } from './chem2StructuredG';
import { buildChem2StructuredH } from './chem2StructuredH';
import { buildChem2StructuredI } from './chem2StructuredI';
import { buildChem2StructuredJ } from './chem2StructuredJ';
import { buildChem2StructuredK } from './chem2StructuredK';
import { buildChem2StructuredL } from './chem2StructuredL';
import { buildChem2StructuredM } from './chem2StructuredM';
import { buildChem2StructuredN } from './chem2StructuredN';
import { buildChem2StructuredO } from './chem2StructuredO';
import { buildChem2StructuredP } from './chem2StructuredP';
import { buildChem2StructuredQ } from './chem2StructuredQ';
import { buildChem2StructuredR } from './chem2StructuredR';
import { buildChem2StructuredS } from './chem2StructuredS';
import { buildChem2StructuredT } from './chem2StructuredT';
import { buildChem2StructuredU } from './chem2StructuredU';
import { buildChem2StructuredV } from './chem2StructuredV';
import { buildChem2StructuredW } from './chem2StructuredW';

const ALL_CHEM2_FACTS = [
  ...CHEM2_FACTS_PART1,
  ...CHEM2_FACTS_PART2,
  ...CHEM2_FACTS_PART3,
  ...CHEM2_FACTS_PART4,
  ...CHEM2_FACTS_PART5,
  ...CHEM2_FACTS_PART6,
  ...CHEM2_FACTS_PART7,
  ...CHEM2_FACTS_PART8,
  ...CHEM2_FACTS_PART9,
];

const CHEM2_CATEGORY_POOLS: Record<string, string[]> = {
  'বায়ুমণ্ডল ও গ্যাস সূত্র': [
    'বয়েলের সূত্র',
    'চার্লসের সূত্র',
    'অ্যাভোগাড্রোর সূত্র',
    'গ্রাহামের গ্যাস ব্যাপন সূত্র',
    'ডাল্টনের আংশিক চাপ সূত্র',
    'ভ্যান ডার ওয়ালস সমীকরণ',
  ],
  'পানি দূষণ ও মানদণ্ড': [
    'DO, BOD ও COD এবং পানিতে আর্সেনিক দূষণ',
    'পানির খরতা ও দূরীকরণ',
    'অ্যাসিড বৃষ্টি ও ফটোকেমিক্যাল স্মগ',
    'গ্রিনহাউজ প্রভাব ও ওজোন স্তর ক্ষয়',
  ],
  'তড়িৎ রাসায়নিক কোষ': [
    'প্রমাণ হাইড্রোজেন তড়িৎদ্বার (SHE)',
    'গ্যালভানিক (ড্যানিয়েল) কোষ ও লবণ সেতু',
    'নার্নস্ট সমীকরণ',
    'ক্যালোমেল তড়িৎদ্বার ও গ্লাস তড়িৎদ্বার',
  ],
  'শিল্প রসায়ন': [
    'ইউরিয়া সার উৎপাদন',
    'কাচ, সিরামিক ও পোর্টল্যান্ড সিমেন্ট',
    'পাল্প-পেপার ও চামড়া ট্যানিং শিল্প',
    'সিমেন্ট শিল্প ও জিপসামের ভূমিকা',
    'কাচ শিল্পের প্রকারভেদ ও অ্যানিলিং',
  ],
};

const CHEM2_HALLMARK_POOL = ALL_CHEM2_FACTS.map((f) => f.hallmark).filter((x): x is string => Boolean(x));
const CHEM2_SITE_POOL = ALL_CHEM2_FACTS.map((f) => f.site).filter((x): x is string => Boolean(x));
const CHEM2_METRIC_POOL = ALL_CHEM2_FACTS.map((f) => f.metric).filter((x): x is string => Boolean(x));
const CHEM2_EXAMPLE_POOL = ALL_CHEM2_FACTS.map((f) => f.example).filter((x): x is string => Boolean(x));

const CHEM2_DISCOVERER_POOL = [
  'রবার্ট বয়েল (১৬৬২)',
  'জ্যাক চার্লস (১৭৮৭)',
  'অ্যামেদিও অ্যাভোগাড্রো (১৮১১)',
  'টমাস গ্রাহাম (১৮২৯)',
  'জন ডাল্টন (১৮০১)',
  'মাইকেল ফ্যারাডে (১৮৩৩)',
  'ওয়াল্টার নার্নস্ট (১৮৮৯)',
  'ফ্রেডরিখ ভোলার (১৮২৮)',
  'ভিক্টর গ্রিগনার্ড (১৯১২)',
  'এরিক হাকেল (১৯৩১)',
  'ভ্লাদিমির মার্কনিকভ (১৮৬৯)',
  'হাওয়ার্ড লুকাস (১৯৩০)',
  'অগাস্ট বিয়ার ও জোহান ল্যাম্বার্ট',
  'চার্লস ফ্রিডেল ও জেমস ক্রাফ্টস (১৮৭৭)',
];

const FACT_MCQS_CHEM2: McqQuestion[] = synthesizeFromFacts({
  prefix: 'chem2_fact',
  subjectId: 'chem_2',
  hscLevel: '12',
  facts: ALL_CHEM2_FACTS,
  categoryPools: CHEM2_CATEGORY_POOLS,
  hallmarkPool: CHEM2_HALLMARK_POOL,
  discovererPool: CHEM2_DISCOVERER_POOL,
  sitePool: CHEM2_SITE_POOL,
  metricPool: CHEM2_METRIC_POOL,
  examplePool: CHEM2_EXAMPLE_POOL,
});

const RAW_CHEM2_POOL: McqQuestion[] = [
  ...FACT_MCQS_CHEM2,
  ...buildChem2StructuredA(),
  ...buildChem2StructuredB(),
  ...buildChem2StructuredC(),
  ...buildChem2StructuredD(),
  ...buildChem2StructuredE(),
  ...buildChem2StructuredF(),
  ...buildChem2StructuredG(),
  ...buildChem2StructuredH(),
  ...buildChem2StructuredI(),
  ...buildChem2StructuredJ(),
  ...buildChem2StructuredK(),
  ...buildChem2StructuredL(),
  ...buildChem2StructuredM(),
  ...buildChem2StructuredN(),
  ...buildChem2StructuredO(),
  ...buildChem2StructuredP(),
  ...buildChem2StructuredQ(),
  ...buildChem2StructuredR(),
  ...buildChem2StructuredS(),
  ...buildChem2StructuredT(),
  ...buildChem2StructuredU(),
  ...buildChem2StructuredV(),
  ...buildChem2StructuredW(),
];

const seenChem2Text = new Set<string>();
const DEDUPED_CHEM2: McqQuestion[] = [];
for (const q of RAW_CHEM2_POOL) {
  const norm = q.question.trim().replace(/\s+/g, ' ');
  if (seenChem2Text.has(norm)) continue;
  seenChem2Text.add(norm);
  DEDUPED_CHEM2.push({
    ...q,
    id: `chem2_q_${String(DEDUPED_CHEM2.length + 1).padStart(4, '0')}`,
  });
}

export const CHEM2_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_CHEM2.slice(0, 6000);
