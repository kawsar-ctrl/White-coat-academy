import { McqQuestion } from '../types/learning';
import { synthesizeFromFacts } from './bioQuestionHelpers';
import { CHEM1_FACTS_PART1 } from './chem1FactsPart1';
import { CHEM1_FACTS_PART2 } from './chem1FactsPart2';
import { CHEM1_FACTS_PART3 } from './chem1FactsPart3';
import { CHEM1_FACTS_PART4 } from './chem1FactsPart4';
import { CHEM1_FACTS_PART5 } from './chem1FactsPart5';
import { CHEM1_FACTS_PART6 } from './chem1FactsPart6';
import { buildChem1StructuredA } from './chem1StructuredA';
import { buildChem1StructuredB } from './chem1StructuredB';
import { buildChem1StructuredC } from './chem1StructuredC';
import { buildChem1StructuredD } from './chem1StructuredD';
import { buildChem1StructuredE } from './chem1StructuredE';
import { buildChem1StructuredF } from './chem1StructuredF';
import { buildChem1StructuredG } from './chem1StructuredG';
import { buildChem1StructuredH } from './chem1StructuredH';
import { buildChem1StructuredI } from './chem1StructuredI';
import { buildChem1StructuredJ } from './chem1StructuredJ';
import { buildChem1StructuredK } from './chem1StructuredK';
import { buildChem1StructuredL } from './chem1StructuredL';
import { buildChem1StructuredM } from './chem1StructuredM';
import { buildChem1StructuredN } from './chem1StructuredN';
import { buildChem1StructuredO } from './chem1StructuredO';
import { buildChem1StructuredP } from './chem1StructuredP';

const ALL_CHEM1_FACTS = [
  ...CHEM1_FACTS_PART1,
  ...CHEM1_FACTS_PART2,
  ...CHEM1_FACTS_PART3,
  ...CHEM1_FACTS_PART4,
  ...CHEM1_FACTS_PART5,
  ...CHEM1_FACTS_PART6,
];

const CHEM1_CATEGORY_POOLS: Record<string, string[]> = {
  'ল্যাব যন্ত্রপাতি': [
    'পল-বুঙ্গি ব্যালেন্স',
    'বুরেট (Burette)',
    'পিপেট (Pipette)',
    'ভলিউমেট্রিক ফ্লাস্ক',
    'বুনসেন বার্নার',
    'কনিক্যাল ফ্লাস্ক',
    'ডেসিক্যাটর',
    'রিসার্চ গ্রেড ও অ্যানালার বিকারক',
  ],
  'ল্যাব নিরাপত্তা': [
    'পিক্রিক অ্যাসিড ও বিস্ফোরক ঝুঁকি প্রতীক',
    'জারক পদার্থের হ্যাজার্ড প্রতীক',
    'তীব্র বিষাক্ত (Toxic) প্রতীক',
    'ক্ষয়কারক (Corrosive) প্রতীক',
    'ফিউম হুড (Fume Hood)',
    'পরিবেশের জন্য ক্ষতিকর প্রতীক',
  ],
  'পরমাণু মডেল': [
    'রাদারফোর্ডের আলফা-কণা বিচ্ছুরণ পরীক্ষা',
    'বোরের পরমাণু মডেল',
    'প্লাঙ্কের কোয়ান্টাম তত্ত্ব',
    'ডি-ব্রগলির তরঙ্গ-কণা দ্বৈত নীতি',
    'হাইজেনবার্গের অনিশ্চয়তা নীতি',
    'শ্রোডিঞ্জারের তরঙ্গ সমীকরণ',
  ],
  'কোয়ান্টাম সংখ্যা': [
    'প্রধান কোয়ান্টাম সংখ্যা (n)',
    'সহকারী কোয়ান্টাম সংখ্যা (l)',
    'চুম্বকীয় কোয়ান্টাম সংখ্যা (m)',
    'স্পিন কোয়ান্টাম সংখ্যা (s)',
  ],
};

const CHEM1_HALLMARK_POOL = ALL_CHEM1_FACTS.map((f) => f.hallmark).filter((x): x is string => Boolean(x));
const CHEM1_SITE_POOL = ALL_CHEM1_FACTS.map((f) => f.site).filter((x): x is string => Boolean(x));
const CHEM1_METRIC_POOL = ALL_CHEM1_FACTS.map((f) => f.metric).filter((x): x is string => Boolean(x));
const CHEM1_EXAMPLE_POOL = ALL_CHEM1_FACTS.map((f) => f.example).filter((x): x is string => Boolean(x));

const CHEM1_DISCOVERER_POOL = [
  'নিলস বোর (১৯১৩)',
  'আর্নেস্ট রাদারফোর্ড (১৯১১)',
  'ম্যাক্স প্ল্যাঙ্ক (১৯০০)',
  'লুই ডি-ব্রগলি (১৯২৪)',
  'ওয়ার্নার হাইজেনবার্গ (১৯২৭)',
  'আরউইন শ্রোডিঞ্জার (১৯২৬)',
  'উলফগ্যাং পাউলি (১৯২৫)',
  'ফ্রেডরিখ হুন্ড (১৯২৭)',
  'হেনরি মোসলে (১৯১৩)',
  'লিনাস পাউলিং (১৯৩২)',
  'হেনরি লুই লা শাতেলিয়ার (১৮৮৪)',
  'এস. পি. এল. সোরেনসেন (১৯০৯)',
  'উইলহেল্ম অসওয়াল্ড (১৮৮৮)',
  'জার্মেইন হেস (১৮৪০)',
  'কাজিমিয়ের্জ ফাজান (১৯২৩)',
  'লুই পাস্তুর',
];

const FACT_MCQS_CHEM1: McqQuestion[] = synthesizeFromFacts({
  prefix: 'chem1_fact',
  subjectId: 'chem_1',
  hscLevel: '11',
  facts: ALL_CHEM1_FACTS,
  categoryPools: CHEM1_CATEGORY_POOLS,
  hallmarkPool: CHEM1_HALLMARK_POOL,
  discovererPool: CHEM1_DISCOVERER_POOL,
  sitePool: CHEM1_SITE_POOL,
  metricPool: CHEM1_METRIC_POOL,
  examplePool: CHEM1_EXAMPLE_POOL,
});

const RAW_CHEM1_POOL: McqQuestion[] = [
  ...FACT_MCQS_CHEM1,
  ...buildChem1StructuredA(),
  ...buildChem1StructuredB(),
  ...buildChem1StructuredC(),
  ...buildChem1StructuredD(),
  ...buildChem1StructuredE(),
  ...buildChem1StructuredF(),
  ...buildChem1StructuredG(),
  ...buildChem1StructuredH(),
  ...buildChem1StructuredI(),
  ...buildChem1StructuredJ(),
  ...buildChem1StructuredK(),
  ...buildChem1StructuredL(),
  ...buildChem1StructuredM(),
  ...buildChem1StructuredN(),
  ...buildChem1StructuredO(),
  ...buildChem1StructuredP(),
];

const seenChem1Text = new Set<string>();
const DEDUPED_CHEM1: McqQuestion[] = [];
for (const q of RAW_CHEM1_POOL) {
  const norm = q.question.trim().replace(/\s+/g, ' ');
  if (seenChem1Text.has(norm)) continue;
  seenChem1Text.add(norm);
  DEDUPED_CHEM1.push({
    ...q,
    id: `chem1_q_${String(DEDUPED_CHEM1.length + 1).padStart(4, '0')}`,
  });
}

export const CHEM1_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_CHEM1.slice(0, 4500);
