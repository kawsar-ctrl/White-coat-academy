import { McqQuestion } from '../types/learning';
import { synthesizeFromFacts } from './bioQuestionHelpers';
import { ENG_FACTS_PART1 } from './engFactsPart1';
import { ENG_FACTS_PART2 } from './engFactsPart2';
import { ENG_FACTS_PART3 } from './engFactsPart3';
import { buildEngStructuredA } from './engStructuredA';
import { buildEngStructuredB } from './engStructuredB';
import { buildEngStructuredC } from './engStructuredC';
import { buildEngStructuredD } from './engStructuredD';
import { buildEngStructuredE } from './engStructuredE';
import { buildEngStructuredF } from './engStructuredF';
import { buildEngStructuredG } from './engStructuredG';
import { buildEngStructuredH } from './engStructuredH';
import { buildEngStructuredI } from './engStructuredI';
import { buildEngStructuredJ } from './engStructuredJ';
import { buildEngStructuredK } from './engStructuredK';
import { buildEngStructuredL } from './engStructuredL';
import { buildEngStructuredM } from './engStructuredM';
import { buildEngStructuredN } from './engStructuredN';
import { buildEngStructuredO } from './engStructuredO';

const ALL_ENG_FACTS = [...ENG_FACTS_PART1, ...ENG_FACTS_PART2, ...ENG_FACTS_PART3];

const ENG_CATEGORY_POOLS: Record<string, string[]> = {
  'Parts of Speech': [
    'Abstract Noun & Uncountable Noun Rules',
    'Collective Noun & Noun of Multitude',
    'Relative Pronouns (Who, Whom, Whose, Which, That)',
    'Determiners (Few, A Few, The Few / Little, A Little, The Little)',
    'Articles (A, An, The & Zero Article)',
    'Degree of Comparison (Prefer, Senior, Junior, Double Comparative)',
    'Preposition vs Conjunction vs Adverb Recognition',
    'Compound & Phrasal Prepositions (Despite, Owing to, In lieu of)',
    'Reciprocal & Reflexive Pronouns (Each other vs Oneself)',
    'Adverbs of Frequency & Negative Position Rules',
    'Prepositions of Time, Space & Transport (In, On, At, By)',
    'Greek & Latin Irregular Plurals in Science & Medicine',
  ],
  'Non-finite Verb': [
    'Gerund (Verb + ing as Noun)',
    'Participle (Present, Past & Perfect Participle)',
    'Bare Infinitive & Full Infinitive',
    'Verbal Noun',
    'Bare Infinitive vs Full Infinitive (To + V1 vs V1)',
    'Verbal Noun vs Gerund Distinction',
  ],
  'Verb & Mood': [
    'Causative Verbs (Make, Have, Get, Let, Help)',
    'Subjunctive Mood (Mandative Subjunctive)',
    'Sequence of Tenses & Universal Truth',
    'Modal Auxiliaries & Past Deduction (Must have, Should have)',
    'Verbals & Linking Verbs (Copulative Verbs)',
    'As if / As though (Unreal Past & Past Perfect)',
    'Wish / If only (Desire & Regret Expressions)',
    'Transitive vs Intransitive & Factitive Verbs',
  ],
  'Clause & Conditionals': [
    'Conditionals (Zero, 1st, 2nd, 3rd & Mixed)',
    'Noun Clause vs Adjective (Relative) Clause vs Adverbial Clause',
    'Linkers & Correlative Conjunctions (Lest, Unless, Until)',
    'Restrictive vs Non-restrictive Relative Clauses (That vs Which)',
    'Subordinating Time Clauses & Future Reference',
  ],
  'Sentence Structure': [
    'Inversion of Adverbs (Negative/Restrictive Adverbs)',
    'Subject-Verb Agreement (Either/Or, As Well As, One of the)',
    'Subject-Verb Agreement (Distance, Money, Time & Fractions)',
    'Dangling / Misplaced Modifier',
    'Parallelism (সমান্তরাল গঠন) & Redundancy',
    'Tag Questions (বাক্যাংশ প্রশ্ন) — ব্যতিক্রমসমূহ',
    'Embedded Questions & Affirmative Agreement (So / Neither)',
    'Transformation of Sentences (Simple, Complex, Compound)',
    'Cleft Sentences & Emphatic Structures (It is... who/that)',
    'Ellipsis & Auxiliaries in Comparative Clauses',
    'Appositives & Non-restrictive Modifiers',
    'Tense-Accurate Bengali to English Translation Patterns',
  ],
  'Voice & Narration': [
    'Passive Voice (Quasi-Passive, Reflexive & Prepositional)',
    'Narration / Indirect Speech Rules',
    'Complex Passive Structures (Double Object, Infinitive & Bare Infinitive)',
    'Advanced Narration (Optative, Exclamatory, Vocative & Sir/Madam)',
  ],
  'Vocabulary & Usage': [
    'Confusing Word Pairs (Affect/Effect, Lie/Lay, Rise/Raise)',
    'Prefix, Suffix & Word Formation',
    'Phrasal Verbs with "Look", "Put", "Break", "Call"',
    'Homophones & Homonyms (Cite/Site/Sight, Stationary/Stationery)',
    'Latin & Foreign Loan Words in Academic English',
    'Group Verbs with "Take", "Get", "Turn", "Keep"',
    'Spelling Rules (Doubling Consonants, -ei-/-ie-, Silent Letters)',
    'Figures of Speech (Allusion, Synecdoche, Metonymy, Pun)',
    'Literary Periods of English Literature (Renaissance to Modern)',
    'Clinical Abbreviations & Prescription Latin (Rx, Stat, PRN, BID)',
  ],
};

const ENG_HALLMARK_POOL = ALL_ENG_FACTS.map((f) => f.hallmark).filter((x): x is string => Boolean(x));
const ENG_SITE_POOL = ALL_ENG_FACTS.map((f) => f.site).filter((x): x is string => Boolean(x));
const ENG_METRIC_POOL = ALL_ENG_FACTS.map((f) => f.metric).filter((x): x is string => Boolean(x));
const ENG_EXAMPLE_POOL = ALL_ENG_FACTS.map((f) => f.example).filter((x): x is string => Boolean(x));

const FACT_MCQS_ENG: McqQuestion[] = synthesizeFromFacts({
  prefix: 'eng_fact',
  subjectId: 'eng',
  medicalGroup: 'eng',
  hscLevel: 'admission',
  facts: ALL_ENG_FACTS,
  categoryPools: ENG_CATEGORY_POOLS,
  hallmarkPool: ENG_HALLMARK_POOL,
  discovererPool: ['Wren & Martin', 'Michael Swan', 'Raymond Murphy', 'F. T. Wood'],
  sitePool: ENG_SITE_POOL,
  metricPool: ENG_METRIC_POOL,
  examplePool: ENG_EXAMPLE_POOL,
});

const RAW_ENG_POOL: McqQuestion[] = [
  ...FACT_MCQS_ENG,
  ...buildEngStructuredA(),
  ...buildEngStructuredB(),
  ...buildEngStructuredC(),
  ...buildEngStructuredD(),
  ...buildEngStructuredE(),
  ...buildEngStructuredF(),
  ...buildEngStructuredG(),
  ...buildEngStructuredH(),
  ...buildEngStructuredI(),
  ...buildEngStructuredJ(),
  ...buildEngStructuredK(),
  ...buildEngStructuredL(),
  ...buildEngStructuredM(),
  ...buildEngStructuredN(),
  ...buildEngStructuredO(),
];

const seenEngText = new Set<string>();
const DEDUPED_ENG: McqQuestion[] = [];
for (const q of RAW_ENG_POOL) {
  const norm = q.question.trim().replace(/\s+/g, ' ');
  if (seenEngText.has(norm)) continue;
  seenEngText.add(norm);
  DEDUPED_ENG.push({
    ...q,
    subjectId: 'eng',
    medicalGroup: 'eng',
    id: `eng_q_${String(DEDUPED_ENG.length + 1).padStart(4, '0')}`,
  });
}

export const ENG_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_ENG.slice(0, 6000);
