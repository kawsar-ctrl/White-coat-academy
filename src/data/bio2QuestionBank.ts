import { McqQuestion } from '../types/learning';
import { synthesizeFromFacts } from './bioQuestionHelpers';
import { BIO2_FACTS_PART1 } from './bio2FactsPart1';
import { BIO2_FACTS_PART2 } from './bio2FactsPart2';
import { BIO2_FACTS_PART3 } from './bio2FactsPart3';
import { BIO2_FACTS_PART4 } from './bio2FactsPart4';
import { buildBio2StructuredA } from './bio2StructuredA';
import { buildBio2StructuredB } from './bio2StructuredB';
import { buildBio2StructuredC } from './bio2StructuredC';
import { buildBio2StructuredD } from './bio2StructuredD';
import { buildBio2StructuredE } from './bio2StructuredE';
import { buildBio2StructuredF } from './bio2StructuredF';
import { buildBio2StructuredG } from './bio2StructuredG';
import { buildBio2StructuredH } from './bio2StructuredH';
import { buildBio2StructuredI } from './bio2StructuredI';
import { buildBio2StructuredJ } from './bio2StructuredJ';
import { buildBio2StructuredK } from './bio2StructuredK';
import { buildBio2StructuredL } from './bio2StructuredL';
import { buildBio2StructuredM } from './bio2StructuredM';
import { buildBio2StructuredN } from './bio2StructuredN';
import { buildBio2StructuredO } from './bio2StructuredO';
import { buildBio2StructuredP } from './bio2StructuredP';
import { buildBio2StructuredQ } from './bio2StructuredQ';
import { buildBio2StructuredR } from './bio2StructuredR';
import { buildBio2StructuredS } from './bio2StructuredS';
import { buildBio2StructuredT } from './bio2StructuredT';
import { buildBio2StructuredU } from './bio2StructuredU';

const ALL_BIO2_FACTS = [...BIO2_FACTS_PART1, ...BIO2_FACTS_PART2, ...BIO2_FACTS_PART3];

const BIO2_SYNTH_POOLS = {
  categoryPools: {
    taxonomy: ['দ্বিপদ নামকরণ', 'ত্রিপদ নামকরণ', 'অরীয় প্রতিসাম্যতা', 'দ্বিপার্শ্বীয় প্রতিসাম্যতা'],
    phyla: ['Porifera', 'Cnidaria', 'Platyhelminthes', 'Nematoda', 'Mollusca', 'Annelida', 'Arthropoda', 'Echinodermata'],
    chordates: ['Chordata', 'Chondrichthyes', 'Osteichthyes', 'Amphibia', 'Reptilia', 'Aves', 'Mammalia'],
    hydra: ['নিডোসাইট', 'ইন্টারস্টিশিয়াল কোষ', 'পেনিট্র্যান্ট', 'Zoochlorella'],
    grasshopper: ['ওমাটিডিয়াম', 'ম্যালপিজিয়ান নালিকা', 'হিমোসিল', 'স্পাইরাকল'],
    rohu: ['ভেনাস হার্ট', 'বায়ুথলি (পটকা)', 'ফুলকা', 'পার্শ্বরেখা তন্ত্র'],
    digestion: ['দন্তসংকেত', 'প্যারাইটাল কোষ', 'যকৃৎ', 'অগ্ন্যাশয়', 'সিক্রেটিন', 'ভিলাই'],
    blood: ['প্লাজমা', 'RBC', 'WBC', 'অণুচক্রিকা', 'ফাইব্রিনোজেন', 'Rh ফ্যাক্টর'],
    heart: ['বাইকাসপিড কপাটিকা', 'SA নোড', 'ECG', 'ব্যারোরিসেপ্টর'],
    respiration_anatomy: ['স্বরযন্ত্র', 'ফুসফুস', 'সাইনোসাইটিস', 'ওটাইটিস মিডিয়া'],
    gas_exchange: ['অক্সিহিমোগ্লোবিন', 'ক্লোরাইড শিফট', 'হ্যালডেন প্রভাব', 'বোর প্রভাব'],
    excretion: ['নেফ্রন', 'বোম্যানস ক্যাপসুল', 'ইউরোক্রোম', 'RAAS ও অ্যালডোস্টেরন', 'ডায়ালাইসিস'],
    skeleton: ['অক্ষীয় কঙ্কাল', 'করোটিকা', 'কশেরুকা ও পর্শুকা'],
    muscle: ['সার্কোমিয়ার', 'স্লাইডিং ফিলামেন্ট', 'সাইনোভিয়াল অস্থিসন্ধি', 'হৃৎপেশি'],
    nervous: ['সেরেব্রাম', 'সেরেবেলাম', 'মেডুলা অবলংগাটা', 'সিন্যাপস'],
    sense: ['রেটিনা', 'ককলিয়া ও অর্গান অব কর্টি', 'ফোভিয়া সেন্ট্রালিস'],
    endocrine: ['পিটুইটারি', 'থাইরয়েড', 'অ্যাড্রেনাল', 'প্যারাথাইরয়েড'],
    human_repro: ['শুক্রাণুজনন', 'ডিম্বাণুজনন', 'প্লাসেন্টা', 'IVF'],
    immunology: ['সহজাত প্রতিরক্ষা', 'IgG', 'IgA', 'IgM', 'IgE'],
    genetics: ['মেন্ডেলের প্রথম সূত্র', 'অসম্পূর্ণ প্রকটতা', 'এপিস্ট্যাসিস', 'হিমোফিলিয়া ও বর্ণান্ধতা'],
    evolution: ['ল্যামার্কবাদ', 'ডারউইনবাদ', 'হার্ডি-ওয়াইনবার্গ নীতি', 'আর্কিওপ্টেরিক্স'],
  },
  hallmarkPool: [
    'দ্বিস্তরী সিলেন্টেরনযুক্ত ও নেমাটোসিস্টবাহী প্রাণীপর্ব',
    'হিমোসিল, সন্ধিযুক্ত উপাঙ্গ ও কাইটিনময় বহিঃকঙ্কালবিশিষ্ট পর্ব',
    'পাকস্থলির HCl ও ইন্ট্রিনসিক ফ্যাক্টর ক্ষরণকারী কোষ',
    'অলিন্দ থেকে নিলয়ে বৈদ্যুতিক সংকেত প্রেরণকারী মায়োজেনিক কেন্দ্র',
    'RBC ও প্লাজমার মাঝে HCO₃⁻ ও Cl⁻ আয়ন বিনিময়ের শারীরবৃত্তীয় প্রক্রিয়া',
    'বৃক্কে পানি ও সোডিয়াম পুনঃশোষণ নিয়ন্ত্রণকারী হরমোন তন্ত্র',
  ],
  discovererPool: [
    'ক্যারোলাস লিনিয়াস (১৭৫৮)',
    'কার্ল ল্যান্ডস্টেইনার (১৯০০)',
    'উইলেম আইন্থোভেন (১৯০৩)',
    'বেলিস ও স্টার্লিং (১৯০২)',
    'এইচ. জে. হ্যামবার্গার (১৮৯২)',
    'হ্যানসন ও হাক্সলি (১৯৫৪)',
    'গ্রেগর জোহান মেন্ডেল (১৮৬৬)',
    'চার্লস ডারউইন (১৮৫৯)',
  ],
  sitePool: [
    'মানবদেহের যকৃতে',
    'অগ্ন্যাশয়ের আইলেটস অব ল্যাঙ্গারহ্যান্সে',
    'ডান অলিন্দের প্রাচীরে',
    'নেফ্রনের দূরবর্তী প্যাঁচানো নালিকায়',
    'অন্তঃকর্ণের ককলিয়ার স্ক্যালা মিডিয়ায়',
    'চোখের রেটিনার ফোভিয়া সেন্ট্রালিসে',
  ],
  metricPool: [
    '২০৬টি অস্থি (৮০ অক্ষীয় + ১২৬ উপাঙ্গীয়)',
    '৫–৬ লিটার ও pH ৭.৩৫–৭.৪৫',
    '১২৫ mL/min ও ১.৫ লিটার/দিন',
    'আয়ু ১২০ দিন',
    '১২ জোড়া করোটিক স্নায়ু',
    '১.৫–৪.০ লাখ/mm³',
  ],
  examplePool: [
    'Labeo rohita (রুই মাছ)',
    'Hydra vulgaris (হাইড্রা)',
    'থাইরক্সিনের অভাবে ক্রেটিনিজম ও গলগণ্ড',
    'O-নেগেটিভ সর্বজনীন দাতা ও AB-পজিটিভ সর্বজনীন গ্রহীতা',
    'সন্ধ্যামালতী ফুলে অসম্পূর্ণ প্রকটতা (১:২:১)',
    'লাল-সবুজ বর্ণান্ধতা ও হিমোফিলিয়া',
  ],
};

const FACT_MCQS_BIO2 = synthesizeFromFacts({
  prefix: 'bio2_f',
  subjectId: 'bio_2',
  hscLevel: '12',
  facts: ALL_BIO2_FACTS,
  ...BIO2_SYNTH_POOLS,
});

const FACT_MCQS_BIO2_PART4 = synthesizeFromFacts({
  prefix: 'bio2_f4',
  subjectId: 'bio_2',
  hscLevel: '12',
  facts: BIO2_FACTS_PART4,
  ...BIO2_SYNTH_POOLS,
});

const RAW_BIO2_POOL: McqQuestion[] = [
  ...FACT_MCQS_BIO2,
  ...buildBio2StructuredA(1),
  ...buildBio2StructuredB(1),
  ...buildBio2StructuredC(1),
  ...buildBio2StructuredD(1),
  ...FACT_MCQS_BIO2_PART4,
  ...buildBio2StructuredE(),
  ...buildBio2StructuredF(),
  ...buildBio2StructuredG(),
  ...buildBio2StructuredH(),
  ...buildBio2StructuredI(),
  ...buildBio2StructuredJ(),
  ...buildBio2StructuredK(),
  ...buildBio2StructuredL(),
  ...buildBio2StructuredM(),
  ...buildBio2StructuredN(),
  ...buildBio2StructuredO(),
  ...buildBio2StructuredP(),
  ...buildBio2StructuredQ(),
  ...buildBio2StructuredR(),
  ...buildBio2StructuredS(),
  ...buildBio2StructuredT(),
  ...buildBio2StructuredU(),
];

const DEDUPED_BIO2: McqQuestion[] = [];
const seenBio2Text = new Set<string>();

for (const q of RAW_BIO2_POOL) {
  const key = q.question.trim();
  if (seenBio2Text.has(key)) continue;
  seenBio2Text.add(key);
  DEDUPED_BIO2.push({
    ...q,
    id: `bio2_q_${String(DEDUPED_BIO2.length + 1).padStart(4, '0')}`,
  });
  if (DEDUPED_BIO2.length === 5000) break;
}

export const BIO2_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_BIO2;
