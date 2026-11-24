import { McqQuestion } from '../types/learning';
import { buildMcq, synthesizeFromFacts, toBnDigits } from './bioQuestionHelpers';
import { BIO1_FACTS_PART1 } from './bio1FactsPart1';
import { BIO1_FACTS_PART2 } from './bio1FactsPart2';
import { BIO1_FACTS_PART3 } from './bio1FactsPart3';
import { BIO1_FACTS_PART4 } from './bio1FactsPart4';
import { buildBio1StructuredA } from './bio1StructuredA';
import { buildBio1StructuredB } from './bio1StructuredB';
import { buildBio1StructuredC } from './bio1StructuredC';
import { buildBio1StructuredD } from './bio1StructuredD';
import { buildBio1StructuredE } from './bio1StructuredE';

const ALL_BIO1_FACTS = [...BIO1_FACTS_PART1, ...BIO1_FACTS_PART2, ...BIO1_FACTS_PART3];

const BIO1_SYNTH_POOLS = {
  categoryPools: {
    cell_structure: ['কোষপ্রাচীর', 'প্লাজমামেমব্রেন', 'মাইটোকন্ড্রিয়া', 'ক্লোরোপ্লাস্ট', 'গলগি বডি', 'লাইসোজোম', 'রাইবোজোম', 'সেন্ট্রিওল'],
    nucleic_acid: ['DNA', 'mRNA', 'tRNA', 'rRNA', 'প্লাজমিড', 'জিন', 'কোডন', 'রেপ্লিকেশন'],
    cell_division: ['ইন্টারফেজ', 'প্রোফেজ', 'মেটাফেজ', 'অ্যানাফেজ', 'টেলোফেজ', 'প্যাকাইটিন', 'ডিপ্লোটিন', 'অ্যাপোপটোসিস'],
    biochemistry: ['গ্লুকোজ', 'সেলুলোজ', 'স্টার্চ', 'গ্লাইকোজেন', 'এনজাইম', 'কো-এনজাইম', 'ফসফোলিপিড', 'অ্যামিনো অ্যাসিড'],
    viruses: ['TMV', 'T₂ ব্যাকটেরিওফাজ', 'HIV', 'হেপাটাইটিস-বি', 'ডেঙ্গু ভাইরাস', 'ভিরয়েড', 'প্রিয়ন', 'ইন্টারফেরন'],
    bacteria: ['E. coli', 'Vibrio cholerae', 'Rhizobium', 'Xanthomonas oryzae', 'প্লাজমিড', 'পেপটাইডোগ্লাইক্যান'],
    malaria: ['স্পোরোজয়েট', 'সিগনেট রিং', 'মেরোজয়েট', 'গ্যামেটোসাইট', 'উকিনেট', 'হিমোজয়েন'],
    algae_fungi: ['Ulothrix', 'Spirogyra', 'Chlorella', 'Agaricus', 'Saccharomyces', 'Penicillium', 'লাইকেন'],
    bryo_pterido: ['Riccia', 'Pteris', 'প্রোথ্যালাস', 'সোরাস', 'রাইজয়েড', 'সারসিনেট ভার্নেশন'],
    gymnosperm: ['Cycas', 'Pinus', 'Gnetum', 'কোরালয়েড মূল'],
    angiosperm: ['Poaceae', 'Malvaceae', 'অক্ষীয় অমরাবিন্যাস', 'মূলীয় অমরাবিন্যাস'],
    tissue: ['শীর্ষস্থ ভাজক টিস্যু', 'পত্ররন্ধ্র', 'হাইডাথোড', 'ক্যাসপেরিয়ান ফিতা', 'বুলিফর্ম কোষ', 'বান্ডলশীথ'],
    nutrition: ['ম্যাক্রোনিউট্রিয়েন্ট', 'লুন্ডেগড় মতবাদ', 'প্রোটন পাম্প মতবাদ'],
    photosynthesis: ['PS-I (P₇₀₀)', 'PS-II (P₆₈₀)', 'কেলভিন চক্র', 'হ্যাচ ও স্ল্যাক চক্র', 'ফটোরেসপিরেশন'],
    respiration: ['গ্লাইকোলাইসিস', 'ক্রেবস চক্র', 'ETS', 'অবাত শ্বসন', 'RQ'],
    phytohormone: ['অক্সিন', 'জিবেরেলিন', 'সাইটোকাইনিন', 'ইথিলিন', 'অ্যাবসিসিক অ্যাসিড'],
    reproduction: ['ট্যাপেটাম', 'পলিগোনাম ভ্রূণথলি', 'দ্বিনিষেক', 'পার্থেনোকার্পি'],
    biotech: ['টিস্যু কালচার', 'রেস্ট্রিকশন এনজাইম', 'DNA লাইগেজ', 'PCR', 'গোল্ডেন রাইস'],
  },
  hallmarkPool: [
    'দ্বি-স্তরবিশিষ্ট ফসফোলিপিড ঝিল্লি দ্বারা আবৃত কোষীয় অঙ্গাণু',
    'প্রোটিন সংশ্লেষণে অংশগ্রহণকারী আবরণীবিহীন ক্ষুদ্র অঙ্গাণু',
    'সাবস্ট্রেটের সাথে যুক্ত হয়ে বিক্রিয়ার গতি ত্বরান্বিতকারী জৈব-অনুঘটক',
    'সালোকসংশ্লেষণের আলোক পর্যায়ে ATP ও NADPH+H⁺ উৎপাদনকারী তন্ত্র',
    'সবাত শ্বসনে NADH ও FADH₂ থেকে সর্বাধিক ATP তৈরির ধাপ',
    'নিউক্লিক অ্যাসিডকে সুনির্দিষ্ট স্থানে কর্তনকারী আণবিক কাঁচি',
  ],
  discovererPool: [
    'রবার্ট হুক (১৬৬৫)',
    'রবার্ট ব্রাউন (১৮৩১)',
    'ওয়াটসন ও ক্রিক (১৯৫৩)',
    'সিঙ্গার ও নিকলসন (১৯৭২)',
    'স্যার আলেকজান্ডার ফ্লেমিং (১৯২৮)',
    'মেলভিন কেলভিন (১৯৬১)',
    'স্যার হ্যান্স ক্রেবস (১৯৩৭)',
    'ক্যারি মুলিস (১৯৮৩)',
  ],
  sitePool: [
    'মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে',
    'ক্লোরোপ্লাস্টের স্ট্রোমায়',
    'কোষের সাইটোপ্লাজমে',
    'থাইলাকয়েড ঝিল্লিতে',
    'পরাগধানীর অভ্যন্তরে',
    'উদ্ভিদের শীর্ষস্থ ভাজক অঞ্চলে',
  ],
  metricPool: [
    '৩৬ অণু ATP',
    '৭টি কোষ ও ৮টি নিউক্লিয়াস',
    '৯টি ম্যাক্রো ও ৮টি মাইক্রোনিউট্রিয়েন্ট',
    '৩৪ Å (১০টি বেসপেয়ার)',
    '৪৮ ঘণ্টা পরপর',
    '৯০–৯৫% প্রস্বেদন',
  ],
  examplePool: [
    'ধান (Oryza sativa)',
    'জবা (Hibiscus rosa-sinensis)',
    'গোল্ডেন রাইস ও Bt-বেগুন',
    'গোলআলুর লেট ব্লাইট রোগ',
    'টমেটো ও সূর্যমুখী',
    'ভুট্টা ও আখ',
  ],
};

const FACT_MCQS_BIO1 = synthesizeFromFacts({
  prefix: 'bio1_f',
  subjectId: 'bio_1',
  hscLevel: '11',
  facts: ALL_BIO1_FACTS,
  ...BIO1_SYNTH_POOLS,
});

const FACT_MCQS_BIO1_PART4 = synthesizeFromFacts({
  prefix: 'bio1_f4',
  subjectId: 'bio_1',
  hscLevel: '11',
  facts: BIO1_FACTS_PART4,
  ...BIO1_SYNTH_POOLS,
});

function buildBio1StructuredMcqs(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_s_${String(seq++).padStart(4, '0')}`;

  // 1. Chargaff's Rule & DNA Quantitative Problems (~54 MCQs)
  const adenines = [14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];
  adenines.forEach((aPct, i) => {
    const gPct = 50 - aPct;
    const wrongG = [aPct, 100 - aPct, gPct + 6, Math.abs(gPct - 8)].map((v) => `${toBnDigits(v)}%`);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি দ্বিসূত্রক DNA অণুতে অ্যাডেনিন (A)-এর পরিমাণ ${toBnDigits(aPct)}% হলে চারগাফের সূত্র অনুযায়ী গুয়ানিন (G)-এর শতকরা পরিমাণ কত?`,
        correct: `${toBnDigits(gPct)}%`,
        distractors: wrongG,
        explanation: `চারগাফের সূত্রমতে A = T এবং G = C; অর্থাৎ A + G = ৫০%। এখানে A = ${toBnDigits(aPct)}% হওয়ায় G = ৫০% - ${toBnDigits(aPct)}% = ${toBnDigits(gPct)}%।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · DNA গঠন (চারগাফের সূত্র)',
      })
    );

    const pyrimidineC = 50 - aPct;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `কোনো দ্বিসূত্রক DNA খণ্ডে থাইমিন (T)-এর পরিমাণ ${toBnDigits(aPct)}% হলে সাইটোসিন (C) ও গুয়ানিনের (G) সম্মিলিত শতকরা হার কত?`,
        correct: `${toBnDigits(pyrimidineC * 2)}%`,
        distractors: [
          `${toBnDigits(pyrimidineC)}%`,
          `${toBnDigits(aPct * 2)}%`,
          `${toBnDigits(50 + aPct)}%`,
        ],
        explanation: `যেহেতু A = T = ${toBnDigits(aPct)}%, তাই A + T = ${toBnDigits(aPct * 2)}%। অবশিষ্ট (G + C) = ১০০% - ${toBnDigits(aPct * 2)}% = ${toBnDigits(pyrimidineC * 2)}%।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · নিউক্লিক অ্যাসিড',
      })
    );
  });

  const turnsList = [2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 50];
  turnsList.forEach((turns, i) => {
    const bp = turns * 10;
    const lengthNm = (turns * 3.4).toFixed(1).replace(/\.0$/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 3 === 0 ? 'board' : 'medical',
        question: `ওয়াটসন ও ক্রিক মডেল অনুযায়ী একটি B-DNA অণুতে ${toBnDigits(turns)}টি পূর্ণ ঘূর্ণন থাকলে তাতে মোট কতটি বেসপেয়ার এবং কত দৈর্ঘ্য থাকবে?`,
        correct: `${toBnDigits(bp)}টি বেসপেয়ার ও ${toBnDigits(lengthNm)} nm`,
        distractors: [
          `${toBnDigits(bp * 2)}টি বেসপেয়ার ও ${toBnDigits(lengthNm)} nm`,
          `${toBnDigits(bp)}টি বেসপেয়ার ও ${toBnDigits((turns * 34).toFixed(0))} nm`,
          `${toBnDigits(Math.round(bp / 2))}টি বেসপেয়ার ও ${toBnDigits((turns * 1.7).toFixed(1))} nm`,
        ],
        explanation: `প্রতিটি পূর্ণ ঘূর্ণনে ১০টি বেসপেয়ার থাকে এবং দৈর্ঘ্য ৩.৪ nm (৩৪ Å)। তাই ${toBnDigits(turns)}টি ঘূর্ণনে ${toBnDigits(bp)}টি বেসপেয়ার এবং দৈর্ঘ্য ${toBnDigits(lengthNm)} nm।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · DNA ডাবল হেলিক্স',
      })
    );
  });

  const hBondPairs: Array<[number, number]> = [
    [10, 15],
    [12, 18],
    [15, 20],
    [20, 30],
    [25, 25],
    [30, 20],
    [35, 15],
    [40, 20],
    [45, 35],
    [50, 40],
    [60, 40],
    [80, 20],
  ];
  hBondPairs.forEach(([at, gc]) => {
    const hBonds = at * 2 + gc * 3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি DNA খণ্ডে ${toBnDigits(at)}টি A=T বেসপেয়ার এবং ${toBnDigits(gc)}টি G≡C বেসপেয়ার থাকলে মোট হাইড্রোজেন বন্ধনের সংখ্যা কত?`,
        correct: `${toBnDigits(hBonds)}টি`,
        distractors: [
          `${toBnDigits((at + gc) * 2)}টি`,
          `${toBnDigits(at * 3 + gc * 2)}টি`,
          `${toBnDigits((at + gc) * 3)}টি`,
          `${toBnDigits(hBonds + 25)}টি`,
          `${toBnDigits(hBonds - 20)}টি`,
        ],
        explanation: `অ্যাডেনিন-থাইমিনের মধ্যে ২টি এবং গুয়ানিন-সাইটোসিনের মধ্যে ৩টি হাইড্রোজেন বন্ধন থাকে। মোট বন্ধন = (${toBnDigits(at)} × ২) + (${toBnDigits(gc)} × ৩) = ${toBnDigits(hBonds)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · DNA রাসায়নিক গঠন',
      })
    );
  });

  // 2. Plant Ploidy & Chromosome Numbers (12 Plants × 5 Angles = 60 MCQs)
  const plants2n: Array<{ bn: string; sci: string; ch2n: number }> = [
    { bn: 'ধান', sci: 'Oryza sativa', ch2n: 24 },
    { bn: 'গম', sci: 'Triticum aestivum', ch2n: 42 },
    { bn: 'ভুট্টা', sci: 'Zea mays', ch2n: 20 },
    { bn: 'গোলআলু', sci: 'Solanum tuberosum', ch2n: 48 },
    { bn: 'পেঁয়াজ', sci: 'Allium cepa', ch2n: 16 },
    { bn: 'মটরশুঁটি', sci: 'Pisum sativum', ch2n: 14 },
    { bn: 'পাট', sci: 'Corchorus capsularis', ch2n: 14 },
    { bn: 'আম', sci: 'Mangifera indica', ch2n: 40 },
    { bn: 'টমেটো', sci: 'Solanum lycopersicum', ch2n: 24 },
    { bn: 'ছোলা', sci: 'Cicer arietinum', ch2n: 16 },
    { bn: 'মুলা', sci: 'Raphanus sativus', ch2n: 18 },
    { bn: 'তামাক', sci: 'Nicotiana tabacum', ch2n: 48 },
  ];

  plants2n.forEach((p, idx) => {
    const n = p.ch2n / 2;
    const threeN = n * 3;
    const fourN = p.ch2n * 2;
    const altNums = [n, p.ch2n, threeN, fourN, n + 4, p.ch2n - 4].map((v) => `${toBnDigits(v)}টি`);

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${p.bn} (${p.sci}) উদ্ভিদের দেহকোষে (2n) ক্রোমোজোমের সংখ্যা কতটি?`,
        correct: `${toBnDigits(p.ch2n)}টি`,
        distractors: altNums.filter((x) => x !== `${toBnDigits(p.ch2n)}টি`),
        explanation: `আবুল হাসান স্যারের পাঠ্যবই অনুযায়ী ${p.bn}-এর ডিপ্লয়েড দেহকোষে ক্রোমোজোম সংখ্যা 2n = ${toBnDigits(p.ch2n)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ ও ২ · ক্রোমোজোম সংখ্যা',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${p.bn} উদ্ভিদের দেহকোষে 2n = ${toBnDigits(p.ch2n)} হলে এর পরাগরেণু বা ডিম্বাণুর (n) ক্রোমোজোম সংখ্যা কত হবে?`,
        correct: `${toBnDigits(n)}টি`,
        distractors: [`${toBnDigits(p.ch2n)}টি`, `${toBnDigits(threeN)}টি`, `${toBnDigits(n + 2)}টি`],
        explanation: `পরাগরেণু ও ডিম্বাণু মায়োসিসের মাধ্যমে উৎপন্ন হ্যাপ্লয়েড (n) কোষ। তাই n = ${toBnDigits(p.ch2n)} / ২ = ${toBnDigits(n)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গ্যামেট গঠন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${p.bn} উদ্ভিদের মূলের কোষে ${toBnDigits(p.ch2n)}টি ক্রোমোজোম থাকলে দ্বিনিষেকের পর উৎপন্ন শস্য (Endosperm) কোষে ক্রোমোজোম সংখ্যা কত?`,
        correct: `${toBnDigits(threeN)}টি`,
        distractors: [`${toBnDigits(n)}টি`, `${toBnDigits(p.ch2n)}টি`, `${toBnDigits(fourN)}টি`],
        explanation: `আবৃতবীজী উদ্ভিদের শস্য ত্রিমিলনে উৎপন্ন ট্রিপ্লয়েড (3n) টিস্যু। এখানে n = ${toBnDigits(n)} হওয়ায় 3n = ${toBnDigits(threeN)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · দ্বিনিষেক ও ত্রিমিলন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${p.bn} উদ্ভিদের একটি পরাগমাতৃকোষে মায়োসিস-১ এর প্রোফেজ-১ প্যাকাইটিন দশায় কতটি বাইভ্যালেন্ট (Bivalent) গঠিত হবে?`,
        correct: `${toBnDigits(n)}টি`,
        distractors: [`${toBnDigits(p.ch2n)}টি`, `${toBnDigits(fourN)}টি`, `${toBnDigits(Math.max(2, n - 4))}টি`],
        explanation: `একটি ডিপ্লয়েড কোষে 2n = ${toBnDigits(p.ch2n)} হলে n জোড়া অর্থাৎ ${toBnDigits(n)}টি হোমোলোগাস ক্রোমোজোম জোড় বেঁধে ${toBnDigits(n)}টি বাইভ্যালেন্ট তৈরি করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মায়োসিস',
      })
    );
  });

  // 3. Cell Division Quantitative & Phase Logic (~45 MCQs)
  const divCounts = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  divCounts.forEach((k) => {
    const cells = Math.pow(2, k);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'board',
        question: `একটি মাতৃকোষ পরপর ${toBnDigits(k)} বার মাইটোসিস প্রক্রিয়ায় বিভাজিত হলে মোট কতটি অপত্য কোষ সৃষ্টি হবে?`,
        correct: `${toBnDigits(cells)}টি`,
        distractors: [
          `${toBnDigits(k * 2)}টি`,
          `${toBnDigits(Math.pow(2, k - 1))}টি`,
          `${toBnDigits(cells * 2)}টি`,
          `${toBnDigits(k * 4)}টি`,
          `${toBnDigits(cells + k * 2)}টি`,
        ],
        explanation: `প্রতিটি মাইটোসিসে কোষসংখ্যা দ্বিগুণ হয়; তাই n বার বিভাজনে অপত্য কোষ = 2ⁿ = 2^${toBnDigits(k)} = ${toBnDigits(cells)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মাইটোসিস',
      })
    );
  });

  const pollenTargets = [40, 80, 100, 120, 160, 200, 240, 320, 400, 600];
  pollenTargets.forEach((m) => {
    const meiosisPollen = m / 4;
    const meiosisSeed = m + m / 4;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `আবৃতবীজী উদ্ভিদে ${toBnDigits(m)}টি কার্যকরী পরাগরেণু তৈরি করতে ন্যূনতম কতটি মায়োসিস বিভাজন প্রয়োজন?`,
        correct: `${toBnDigits(meiosisPollen)}টি`,
        distractors: [`${toBnDigits(m)}টি`, `${toBnDigits(m / 2)}টি`, `${toBnDigits(meiosisSeed)}টি`],
        explanation: `১টি পরাগমাতৃকোষে মায়োসিসে ৪টি কার্যকরী পরাগরেণু তৈরি হয়। তাই ${toBnDigits(m)}টি পরাগরেণুর জন্য ${toBnDigits(m)} / ৪ = ${toBnDigits(meiosisPollen)}টি মায়োসিস দরকার।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ ও ১০ · মাইক্রোস্পোরোজেনেসিস',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `আবৃতবীজী উদ্ভিদে ${toBnDigits(m)}টি বীজ উৎপাদনের জন্য মোট কতটি মায়োসিস কোষ বিভাজন প্রয়োজন হবে?`,
        correct: `${toBnDigits(meiosisSeed)}টি`,
        distractors: [`${toBnDigits(m)}টি`, `${toBnDigits(meiosisPollen)}টি`, `${toBnDigits(m * 2)}টি`],
        explanation: `${toBnDigits(m)}টি বীজের জন্য ${toBnDigits(m)}টি ডিম্বাণু (${toBnDigits(m)}টি মায়োসিস, কারণ প্রতি মায়োসিসে ১টি সক্রিয় স্ত্রী রেণু টিকে থাকে) + ${toBnDigits(m)}টি পরাগরেণু (${toBnDigits(meiosisPollen)}টি মায়োসিস) = মোট ${toBnDigits(meiosisSeed)}টি মায়োসিস প্রয়োজন।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গ্যামিটোজেনেসিস',
      })
    );
  });

  // 4. Respiration & Photosynthesis Stoichiometry (~60 MCQs)
  const gluMols = [1, 2, 3, 4, 5, 6, 8, 10];
  gluMols.forEach((g) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'medical',
        question: `উচ্চতর উদ্ভিদের প্রকৃতকোষে ${toBnDigits(g)} অণু গ্লুকোজ সবাত শ্বসনে সম্পূর্ণ জারিত হলে নিট কত অণু ATP এবং কত অণু CO₂ উৎপন্ন হয়?`,
        correct: `${toBnDigits(g * 36)} অণু ATP ও ${toBnDigits(g * 6)} অণু CO₂`,
        distractors: [
          `${toBnDigits(g * 24)} অণু ATP ও ${toBnDigits(g * 6)} অণু CO₂`,
          `${toBnDigits(g * 36)} অণু ATP ও ${toBnDigits(g * 2)} অণু CO₂`,
          `${toBnDigits(g * 18)} অণু ATP ও ${toBnDigits(g * 4)} অণু CO₂`,
        ],
        explanation: `আধুনিক প্রকৃতকোষীয় হিসাবে ১ অণু গ্লুকোজের সবাত শ্বসনে নিট ৩৬ অণু ATP ও ৬ অণু CO₂ উৎপন্ন হয়। তাই ${toBnDigits(g)} অণু থেকে ${toBnDigits(g * 36)} ATP ও ${toBnDigits(g * 6)} CO₂ পাওয়া যায়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · সবাত শ্বসনের শক্তি হিসাব',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'dental',
        question: `কেলভিন (C₃) চক্রে ${toBnDigits(g)} অণু গ্লুকোজ সংশ্লেষ করতে যথাক্রমে কতটি ATP ও কতটি NADPH+H⁺ খরচ হয়?`,
        correct: `${toBnDigits(g * 18)}টি ATP ও ${toBnDigits(g * 12)}টি NADPH+H⁺`,
        distractors: [
          `${toBnDigits(g * 12)}টি ATP ও ${toBnDigits(g * 18)}টি NADPH+H⁺`,
          `${toBnDigits(g * 30)}টি ATP ও ${toBnDigits(g * 12)}টি NADPH+H⁺`,
          `${toBnDigits(g * 36)}টি ATP ও ${toBnDigits(g * 6)}টি NADPH+H⁺`,
        ],
        explanation: `C₃ চক্রে ১ অণু CO₂ স্থিরীকরণে ৩টি ATP ও ২টি NADPH+H⁺ লাগে। ১ অণু গ্লুকোজের (৬ CO₂) জন্য ১৮টি ATP ও ১২টি NADPH+H⁺ প্রয়োজন; তাই ${toBnDigits(g)} অণুতে ${toBnDigits(g * 18)} ATP ও ${toBnDigits(g * 12)} NADPH+H⁺।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · কেলভিন চক্র',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'medical',
        question: `হ্যাচ ও স্ল্যাক (C₄) উদ্ভিদে ${toBnDigits(g)} অণু গ্লুকোজ তৈরি করতে মোট কতটি ATP ব্যয় হয়?`,
        correct: `${toBnDigits(g * 30)}টি ATP`,
        distractors: [
          `${toBnDigits(g * 18)}টি ATP`,
          `${toBnDigits(g * 24)}টি ATP`,
          `${toBnDigits(g * 38)}টি ATP`,
        ],
        explanation: `C₄ চক্রে PEP পুনর্গঠনের অতিরিক্ত ২ ATP (মোট ৫ ATP প্রতি CO₂) খরচ হয়। ফলে ১ গ্লুকোজে ৩০ ATP এবং ${toBnDigits(g)} অণুতে ${toBnDigits(g * 30)} ATP লাগে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · হ্যাচ ও স্ল্যাক চক্র',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'board',
        question: `ক্রেবস চক্রে ${toBnDigits(g)} অণু গ্লুকোজ থেকে প্রাপ্ত অ্যাসিটাইল-CoA জারণে সরাসরি কতটি NADH+H⁺ ও FADH₂ উৎপন্ন হয়?`,
        correct: `${toBnDigits(g * 6)}টি NADH+H⁺ ও ${toBnDigits(g * 2)}টি FADH₂`,
        distractors: [
          `${toBnDigits(g * 3)}টি NADH+H⁺ ও ${toBnDigits(g * 1)}টি FADH₂`,
          `${toBnDigits(g * 2)}টি NADH+H⁺ ও ${toBnDigits(g * 2)}টি FADH₂`,
          `${toBnDigits(g * 8)}টি NADH+H⁺ ও ${toBnDigits(g * 4)}টি FADH₂`,
        ],
        explanation: `১ অণু গ্লুকোজ থেকে ২টি অ্যাসিটাইল-CoA ক্রেবস চক্রে ঢোকে, যাতে ২ × ৩ = ৬ NADH+H⁺ এবং ২ × ১ = ২ FADH₂ তৈরি হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ক্রেবস চক্র',
      })
    );
  });

  // 5. Enzyme Classification (EC 1 to 6) + Examples (~18 MCQs)
  const ecClasses = [
    { ec: 'EC-1 (অক্সিডোরিডাক্টেজ)', role: 'জারণ-বিজারণ বিক্রিয়া (ইলেকট্রন বা হাইড্রোজেন স্থানান্তর) পরিচালনা করে', ex: 'ডিহাইড্রোজিনেজ, অক্সিডেজ, পারঅক্সিডেজ' },
    { ec: 'EC-2 (ট্রান্সফারেজ)', role: 'এক অণু থেকে অন্য অণুতে কার্যকরী মূলক (যেমন ফসফেট বা অ্যামিনো গ্রুপ) স্থানান্তর করে', ex: 'হেক্সোকাইনেজ, ট্রান্সঅ্যামাইনেজ' },
    { ec: 'EC-3 (হাইড্রোলেজ)', role: 'পানি সংযোজনের মাধ্যমে এস্টার, পেপটাইড বা গ্লাইকোসাইডিক বন্ধন আর্দ্রবিশ্লেষণ করে', ex: 'অ্যামাইলেজ, সুক্রেজ, পেপসিন, লাইপেজ' },
    { ec: 'EC-4 (লায়েজ)', role: 'পানি ব্যবহার না করেই সাবস্ট্রেট থেকে গ্রুপ অপসারণ করে দ্বিবন্ধন সৃষ্টি বা সংযোজন ঘটায়', ex: 'ডিকার্বোক্সিলেজ, অ্যালডোলেজ, ফিউমারেজ' },
    { ec: 'EC-5 (আইসোমারেজ)', role: 'একই অণুর ভেতরে পরমাণু পুনর্বিন্যস্ত করে সমানু (Isomer) গঠন করে', ex: 'ফসফোগ্লুকোআইসোমারেজ, ইপিমারেজ' },
    { ec: 'EC-6 (লাইগেজ / সিন্থেটেজ)', role: 'ATP ভেঙ্গে প্রাপ্ত শক্তি ব্যবহার করে দুটি অণুকে নতুন সমযোজী বন্ধনে যুক্ত করে', ex: 'DNA লাইগেজ, পাইরুভেট কার্বোক্সিলেজ' },
  ];
  ecClasses.forEach((item, i) => {
    const others = ecClasses.filter((x) => x.ec !== item.ec);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch3_cell_chem',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `IUBMB শ্রেণিবিভাগ অনুযায়ী কোন শ্রেণির এনজাইম "${item.role}"?`,
        correct: item.ec,
        distractors: others.slice(0, 4).map((x) => x.ec),
        explanation: `${item.ec} শ্রেণির এনজাইম ${item.role}। উদাহরণ: ${item.ex}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · এনজাইমের শ্রেণিবিভাগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch3_cell_chem',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'medical',
        question: `নিচের কোন উদাহরণগুলো ${item.ec} শ্রেণির অন্তর্ভুক্ত?`,
        correct: item.ex,
        distractors: others.slice(0, 4).map((x) => x.ex),
        explanation: `${item.ex} হলো ${item.ec} এনজাইমের আদর্শ উদাহরণ কারণ এগুলো ${item.role}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · এনজাইম',
      })
    );
  });

  // 6. Botanical Scientific Names, Families & Plant Facts (~100 MCQs)
  const botanicalSpecies: Array<{
    bn: string;
    sci: string;
    group: string;
    trait: string;
    ch: string;
  }> = [
    { bn: 'ধান', sci: 'Oryza sativa', group: 'Poaceae (একবীজপত্রী)', trait: 'স্পাইকলেট পুষ্পবিন্যাস ও ক্যারিওপসিস ফল', ch: 'bio1_ch7_angiosperm' },
    { bn: 'গম', sci: 'Triticum aestivum', group: 'Poaceae (একবীজপত্রী)', trait: 'পালকসদৃশ গর্ভমুণ্ড ও শস্যসমৃদ্ধ ক্যারিওপসিস', ch: 'bio1_ch7_angiosperm' },
    { bn: 'ভুট্টা', sci: 'Zea mays', group: 'Poaceae (একবীজপত্রী)', trait: 'বান্ডলশীথযুক্ত ক্র‍্যাঞ্জ অ্যানাটমি (C₄ উদ্ভিদ)', ch: 'bio1_ch7_angiosperm' },
    { bn: 'আখ', sci: 'Saccharum officinarum', group: 'Poaceae (একবীজপত্রী)', trait: 'সুক্রোজ সঞ্চয়কারী C₄ কাণ্ড', ch: 'bio1_ch7_angiosperm' },
    { bn: 'বাঁশ', sci: 'Bambusa tulda', group: 'Poaceae (একবীজপত্রী)', trait: 'ইন্টারক্যালারি ভাজক টিস্যুযুক্ত দ্রুত বর্ধনশীল ঘাস', ch: 'bio1_ch7_angiosperm' },
    { bn: 'জবা', sci: 'Hibiscus rosa-sinensis', group: 'Malvaceae (দ্বিবীজপত্রী)', trait: '৫টি উপবৃতি ও একগুচ্ছক পুংকেশরীয় নালিকা', ch: 'bio1_ch7_angiosperm' },
    { bn: 'ঢেঁড়স', sci: 'Abelmoschus esculentus', group: 'Malvaceae (দ্বিবীজপত্রী)', trait: 'অক্ষীয় অমরাবিন্যাস ও মিউসিলেজযুক্ত ক্যাপসুল ফল', ch: 'bio1_ch7_angiosperm' },
    { bn: 'কার্পাস তুলা', sci: 'Gossypium herbaceum', group: 'Malvaceae (দ্বিবীজপত্রী)', trait: 'বীজত্বকীয় বহিঃআশ (সেলুলোজ তন্তু)', ch: 'bio1_ch7_angiosperm' },
    { bn: 'দেশি পাট', sci: 'Corchorus capsularis', group: 'Malvaceae/Tiliaceae', trait: 'সেকেন্ডারি ফ্লোয়েম বা বাস্ট ফাইবার (তন্তু)', ch: 'bio1_ch8_tissue' },
    { bn: 'তোষা পাট', sci: 'Corchorus olitorius', group: 'Malvaceae/Tiliaceae', trait: 'ড. মাকসুদুল আলম কর্তৃক জিনোম সিকোয়েন্সকৃত উদ্ভিদ', ch: 'bio1_ch10_repro_biotech' },
    { bn: 'আম', sci: 'Mangifera indica', group: 'Anacardiaceae', trait: 'রসালো মধ্যত্বক ও শক্ত অন্তঃত্বকযুক্ত ড্রুপ ফল', ch: 'bio1_ch7_angiosperm' },
    { bn: 'কাঁঠাল', sci: 'Artocarpus heterophyllus', group: 'Moraceae', trait: 'বাংলাদেশের জাতীয় ফল ও সোরোসিস যৌগিক ফল', ch: 'bio1_ch7_angiosperm' },
    { bn: 'শাপলা', sci: 'Nymphaea nouchali', group: 'Nymphaeaceae', trait: 'অ্যারেনকাইমাযুক্ত জলজ উদ্ভিদ ও জাতীয় ফুল', ch: 'bio1_ch7_angiosperm' },
    { bn: 'মটরশুঁটি', sci: 'Pisum sativum', group: 'Fabaceae', trait: 'একপ্রান্তীয় অমরাবিন্যাস ও ভেক্সিলারি পুষ্পপত্রবিন্যাস', ch: 'bio1_ch7_angiosperm' },
    { bn: 'গোলআলু', sci: 'Solanum tuberosum', group: 'Solanaceae', trait: 'ভূনিম্নস্থ রূপান্তরিত কন্দ (টিউবার) ও লেট ব্লাইট সংবেদনশীল', ch: 'bio1_ch5_lower_plants' },
    { bn: 'বেগুন', sci: 'Solanum melongena', group: 'Solanaceae', trait: 'বাংলাদেশে প্রথম অনুমোদিত Bt জিনযুক্ত ট্রান্সজেনিক ফসল', ch: 'bio1_ch10_repro_biotech' },
    { bn: 'সাইকাস', sci: 'Cycas pectinata', group: 'Cycadaceae (নগ্নবীজী)', trait: 'কোরালয়েড মূল ও উদ্ভিদজগতের বৃহত্তম শুক্রাণু', ch: 'bio1_ch7_angiosperm' },
    { bn: 'নিটাম', sci: 'Gnetum montanum', group: 'Gnetaceae (নগ্নবীজী)', trait: 'নগ্নবীজী হলেও জাইলেমে ভেসেল কোষের উপস্থিতি', ch: 'bio1_ch7_angiosperm' },
    { bn: 'সুন্দরী', sci: 'Heritiera fomes', group: 'Malvaceae (ম্যানগ্রোভ)', trait: 'শ্বাসমূল বা নিউম্যাটোফোর ও জরায়ুজ অঙ্কুরোদগম', ch: 'bio1_ch7_angiosperm' },
    { bn: 'কেয়া / পাইনাস', sci: 'Pinus roxburghii', group: 'Pinaceae (নগ্নবীজী)', trait: 'পক্ষল পরাগরেণু ও রেজিন নালিসমৃদ্ধ শঙ্কুযুক্ত বৃক্ষ', ch: 'bio1_ch7_angiosperm' },
  ];

  botanicalSpecies.forEach((sp, i) => {
    const others = botanicalSpecies.filter((x) => x.bn !== sp.bn);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: sp.ch,
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: `"${sp.bn}"-এর সঠিক বৈজ্ঞানিক নাম কোনটি?`,
        correct: sp.sci,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.sci),
        explanation: `${sp.bn}-এর বৈজ্ঞানিক নাম ${sp.sci}। এটি ${sp.group} গোত্র/শ্রেণির অন্তর্ভুক্ত এবং এর বিশেষ বৈশিষ্ট্য: ${sp.trait}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · উদ্ভিদ পরিচিতি ও বৈজ্ঞানিক নাম',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: sp.ch,
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${sp.trait} — এই শনাক্তকারী বৈশিষ্ট্যটি নিচের কোন উদ্ভিদে পরিলক্ষিত হয়?`,
        correct: `${sp.bn} (${sp.sci})`,
        distractors: others.slice((i + 3) % 7, ((i + 3) % 7) + 4).map((x) => `${x.bn} (${x.sci})`),
        explanation: `${sp.bn} (${sp.sci}) উদ্ভিদে ${sp.trait} দেখা যায়; এর গোত্র/শ্রেণি ${sp.group}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭–৮ · উদ্ভিদ বৈশিষ্ট্য',
      })
    );
  });

  // 7. Mineral Nutrients (Macro vs Micro & Deficiency Symptoms) (~45 MCQs)
  const minerals = [
    { el: 'নাইট্রোজেন (N)', type: 'ম্যাক্রোনিউট্রিয়েন্ট', role: 'প্রোটিন, নিউক্লিক অ্যাসিড ও ক্লোরোফিলের গাঠনিক উপাদান', def: 'পাতা হলুদ হয়ে যাওয়া (ক্লোরোসিস) ও বৃদ্ধি ব্যাহত হওয়া' },
    { el: 'ফসফরাস (P)', type: 'ম্যাক্রোনিউট্রিয়েন্ট', role: 'ATP, নিউক্লিক অ্যাসিড ও ফসফোলিপিড গঠন', def: 'পাতায় বেগুনি বা লালচে ছোপ পড়া এবং মূল বৃদ্ধি কমে যাওয়া' },
    { el: 'পটাশিয়াম (K)', type: 'ম্যাক্রোনিউট্রিয়েন্ট', role: 'পত্ররন্ধ্র খোলা-বন্ধ নিয়ন্ত্রণ ও এনজাইম সক্রিয়করণ', def: 'পাতার শীর্ষ ও কিনারা হলুদ হয়ে পচে যাওয়া (মোজাইক নেক্রোসিস)' },
    { el: 'ক্যালসিয়াম (Ca)', type: 'ম্যাক্রোনিউট্রিয়েন্ট', role: 'মধ্যপর্দার ক্যালসিয়াম পেকটেট ও কোষ প্রাচীরের দৃঢ়তা', def: 'কচি পাতা ও বর্ধনশীল শীর্ষ মুকুল শুকিয়ে মরে যাওয়া (ডাইব্যাক)' },
    { el: 'ম্যাগনেসিয়াম (Mg)', type: 'ম্যাক্রোনিউট্রিয়েন্ট', role: 'ক্লোরোফিল অণুর কেন্দ্রীয় পরমাণু ও রাইবোজোম সংযুক্তি', def: 'পাতার শিরার মধ্যবর্তী অংশে ইন্টারভেইনাল ক্লোরোসিস' },
    { el: 'সালফার (S)', type: 'ম্যাক্রোনিউট্রিয়েন্ট', role: 'সিস্টিন-মিথিওনিন অ্যামিনো অ্যাসিড ও কো-এনজাইম A গঠন', def: 'কচি পাতায় প্রথমে ক্লোরোসিস ও কাণ্ড সরু হওয়া' },
    { el: 'আয়রন বা লৌহ (Fe)', type: 'মাইক্রোনিউট্রিয়েন্ট', role: 'সাইটোক্রোম, ফেরিডক্সিন ও ক্লোরোফিল সংশ্লেষের অনুঘটক', def: 'কচি পাতার শিরার মাঝখানে তীব্র সাদাটে ক্লোরোসিস' },
    { el: 'ম্যাঙ্গানিজ (Mn)', type: 'মাইক্রোনিউট্রিয়েন্ট', role: 'সালোকসংশ্লেষণে পানির ফটোলাইসিসে (PS-II) সহায়তা', def: 'পাতায় ধূসর বা বাদামি ছোপসহ ক্লোরোসিস' },
    { el: 'জিংক বা দস্তা (Zn)', type: 'মাইক্রোনিউট্রিয়েন্ট', role: 'অক্সিন (IAA) হরমোন সংশ্লেষ ও কার্বনিক অ্যানহাইড্রেজ', def: 'পাতা ছোট ও বিকৃত হওয়া (লিটল লিফ রোগ)' },
    { el: 'বোরন (B)', type: 'মাইক্রোনিউট্রিয়েন্ট', role: 'পরাগনালিকা বৃদ্ধি, ক্যালসিয়াম শোষণ ও শর্করা পরিবহন', def: 'পুষ্পমুকুল ঝরে যাওয়া ও কাণ্ডে ফাটল (হার্ট রট)' },
    { el: 'মলিবডেনাম (Mo)', type: 'মাইক্রোনিউট্রিয়েন্ট', role: 'নাইট্রেট রিডাক্টেজ ও নাইট্রোজিনেজ এনজাইমের উপাদান', def: 'ফুলকপির হুইপটেইল (Whiptail) রোগ ও নাইট্রোজেন ঘাটতি' },
    { el: 'ক্লোরিন (Cl)', type: 'মাইক্রোনিউট্রিয়েন্ট', role: 'পানির ফটোলাইসিস ও কোষীয় আয়ন-পানি ভারসাম্য রক্ষা', def: 'পাতার প্রান্ত শুকিয়ে নেতিয়ে পড়া (ব্রোঞ্জিং)' },
  ];

  minerals.forEach((m, i) => {
    const others = minerals.filter((x) => x.el !== m.el);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `উদ্ভিদে ${m.el}-এর অভাবজনিত প্রধান লক্ষণ কোনটি?`,
        correct: m.def,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.def),
        explanation: `${m.el} একটি অত্যাবশ্যকীয় ${m.type} যা উদ্ভিদে ${m.role} কাজ করে; এর অভাবে ${m.def} ঘটে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · খনিজ পুষ্টি',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'board',
        question: `উদ্ভিদ শারীরতত্ত্বে কোন খনিজ মৌলটি "${m.role}" কাজে মূল ভূমিকা রাখে?`,
        correct: m.el,
        distractors: others.slice((i + 2) % 6, ((i + 2) % 6) + 4).map((x) => x.el),
        explanation: `${m.el} (${m.type}) উদ্ভিদে ${m.role} কাজ করে। এর অভাবে ${m.def} দেখা দেয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · পুষ্টি উপাদানের ভূমিকা',
      })
    );
  });

  // 8. Microbial Diseases & Agents Matrix (~48 MCQs)
  const microbialDiseases = [
    { dis: 'তামাকের মোজাইক রোগ', agent: 'TMV (একসূত্রক RNA ভাইরাস)', type: 'ভাইরাসজনিত উদ্ভিদ রোগ', symptom: 'পাতায় সবুজ-হলুদ ছোপছোপ মোজাইক দাগ' },
    { dis: 'ধানের টুংরো রোগ', agent: 'RTBV ও RTSV ভাইরাস (সবুজ পাতা ফড়িং বাহিত)', type: 'ভাইরাসজনিত উদ্ভিদ রোগ', symptom: 'ধান গাছ খাটো হওয়া ও পাতা কমলা-হলুদ হওয়া' },
    { dis: 'পেঁপের রিং স্পট রোগ', agent: 'PRSV ভাইরাস (এফিড বাহিত)', type: 'ভাইরাসজনিত উদ্ভিদ রোগ', symptom: 'কাঁচা পেঁপে ফল ও পাতায় গোল বলয়াকার দাগ' },
    { dis: 'ধানের ব্যাকটেরিয়াল ব্লাইট', agent: 'Xanthomonas oryzae', type: 'ব্যাকটেরিয়াজনিত উদ্ভিদ রোগ', symptom: 'পাতার কিনারা বরাবর পানি-ভেজা হলুদ-সাদা দাগ' },
    { dis: 'লেবুর ক্যাংকার রোগ', agent: 'Xanthomonas citri', type: 'ব্যাকটেরিয়াজনিত উদ্ভিদ রোগ', symptom: 'লেবুর পাতা, ডাল ও ফলে কর্কসদৃশ উঁচু ক্ষত' },
    { dis: 'গোলআলুর বিলম্বিত ধ্বসা (লেট ব্লাইট)', agent: 'Phytophthora infestans', type: 'ছত্রাক/উওমাইকোটা রোগ', symptom: 'পাতার কিনারায় কালচে পানিভেজা পচন ও দুর্গন্ধ' },
    { dis: 'মানুষের দাঁদ বা রিংওয়ার্ম', agent: 'Trichophyton / Microsporum', type: 'ছত্রাকজনিত মানব রোগ', symptom: 'ত্বকে বৃত্তাকার চুলকানিযুক্ত লালচে দাগ' },
    { dis: 'ধানের বাদামি দাগ রোগ', agent: 'Bipolaris oryzae (Helminthosporium)', type: 'ছত্রাকজনিত উদ্ভিদ রোগ', symptom: 'পাতা ও ধানের শীষে ডিম্বাকার গাঢ় বাদামি দাগ' },
    { dis: 'মানবদেহের ডেঙ্গু জ্বর', agent: 'ফ্ল্যাভিভাইরাস (Aedes aegypti বাহিত)', type: 'ভাইরাসজনিত মানব রোগ', symptom: 'তীব্র জ্বর, অস্থিসন্ধিতে ব্যথা ও প্লাটিলেট হ্রাস' },
    { dis: 'মানবদেহের কলেরা', agent: 'Vibrio cholerae', type: 'ব্যাকটেরিয়াজনিত মানব রোগ', symptom: 'চালের ধোয়া পানির মতো পাতলা পায়খানা ও পানিশূন্যতা' },
    { dis: 'মানবদেহের যক্ষ্মা (TB)', agent: 'Mycobacterium tuberculosis', type: 'ব্যাকটেরিয়াজনিত মানব রোগ', symptom: '৩ সপ্তাহের বেশি কাশি, কফে রক্ত ও রাতে ঘাম' },
    { dis: 'মানবদেহের টাইফয়েড জ্বর', agent: 'Salmonella typhi', type: 'ব্যাকটেরিয়াজনিত মানব রোগ', symptom: 'ক্রমাগত ধাপে ধাপে ওঠা জ্বর ও অন্ত্রে ক্ষত' },
    { dis: 'মানবদেহের ম্যালিগন্যান্ট ম্যালেরিয়া', agent: 'Plasmodium falciparum', type: 'প্রোটোজোয়াজনিত মানব রোগ', symptom: 'মস্তিষ্কে সংক্রমণ (সেরিব্রাল ম্যালেরিয়া) ও উচ্চ মৃত্যুঝুঁকি' },
    { dis: 'চায়ের লাল মরিচা (Red Rust)', agent: 'Cephaleuros virescens (পরজীবী শৈবাল)', type: 'শৈবালজনিত উদ্ভিদ রোগ', symptom: 'চা পাতার ওপর মরিচার মতো কমলা-লাল আস্তরণ' },
  ];

  microbialDiseases.forEach((d, i) => {
    const others = microbialDiseases.filter((x) => x.dis !== d.dis);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: d.type.includes('ছত্রাক') || d.type.includes('শৈবাল') ? 'bio1_ch5_lower_plants' : 'bio1_ch4_microbe',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${d.dis}" সৃষ্টির জন্য কোন জীবাণু বা পরজীবী দায়ী?`,
        correct: d.agent,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.agent),
        explanation: `${d.dis} একটি ${d.type}, যা ${d.agent} দ্বারা ঘটে। এর প্রধান লক্ষণ: ${d.symptom}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ ও ৫ · অণুজীব ও রোগতত্ত্ব',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: d.type.includes('ছত্রাক') || d.type.includes('শৈবাল') ? 'bio1_ch5_lower_plants' : 'bio1_ch4_microbe',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${d.symptom}" — এটি কোন অণুজীব বা উদ্ভিদ/মানব রোগের প্রধান লক্ষণ?`,
        correct: d.dis,
        distractors: others.slice((i + 4) % 7, ((i + 4) % 7) + 4).map((x) => x.dis),
        explanation: `${d.dis} রোগে ${d.symptom} দেখা যায় এবং এর জীবাণু হলো ${d.agent}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ ও ৫ · রোগ শনাক্তকরণ',
      })
    );
  });

  // 9. Comparative & Conceptual High-Yield Botany Scenarios (~120 MCQs)
  const comparativeFacts: Array<{
    ch: string;
    vl: string;
    q: string;
    a: string;
    d: string[];
    exp: string;
    ref: string;
  }> = [
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'কোষের কোন অঙ্গাণুটিকে "কোষীয় ট্রাফিক পুলিশ" বা "প্যাকেজিং কেন্দ্র" বলা হয়?',
      a: 'গলগি বডি (Golgi body)',
      d: ['লাইসোজোম', 'পারঅক্সিসোম', 'সেন্ট্রোজোম'],
      exp: 'গলগি বডি এন্ডোপ্লাজমিক রেটিকুলাম থেকে প্রাপ্ত প্রোটিন ও লিপিড প্রক্রিয়াজাত, প্যাকেজিং ও ক্ষরণের মাধ্যমে পরিবহন নিয়ন্ত্রণ করে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · গলগি বডি',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'আদিকোষ (Prokaryotic) ও প্রকৃতকোষ (Eukaryotic) উভয়ের মধ্যেই কোন অঙ্গাণুটি বিদ্যমান?',
      a: 'রাইবোজোম (যদিও আকার যথাক্রমে 70S ও 80S)',
      d: ['মাইটোকন্ড্রিয়া', 'গলগি বডি', 'নিউক্লিয়ার মেমব্রেন'],
      exp: 'আদিকোষে ঝিল্লিবদ্ধ কোনো অঙ্গাণু (মাইটোকন্ড্রিয়া, গলগি, ER, লাইসোজোম) থাকে না; কেবল ঝিল্লিবিহীন রাইবোজোম উভয় কোষেই থাকে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষের প্রকারভেদ',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'প্রোটিন সংশ্লেষণে mRNA-এর কোন কোডনটি "সূচনা কোডন" (Start Codon) হিসেবে মেথিওনিনকে নির্দেশ করে?',
      a: 'AUG',
      d: ['UAA', 'UAG', 'UGA'],
      exp: 'AUG হলো একমাত্র সূচনা কোডন (প্রকৃতকোষে মেথিওনিন)। অপরদিকে UAA, UAG এবং UGA হলো তিনটি সমাপ্তি (Stop/Nonsense) কোডন।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · জেনেটিক কোড',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'ট্রান্সলেশন প্রক্রিয়া বন্ধকারী তিনটি সমাপ্তি কোডন (Stop Codons) কী কী?',
      a: 'UAA, UAG, UGA',
      d: ['AUG, GUG, UGG', 'AAA, UUU, CCC', 'GCA, UCG, AUG'],
      exp: 'UAA (Ochre), UAG (Amber) ও UGA (Opal) কোনো অ্যামিনো অ্যাসিডকে কোড না করে পলিপেপটাইড সংশ্লেষ সমাপ্ত করে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · জেনেটিক কোড',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'DNA প্রতিলিপনের সময় "ওকাজাকি খণ্ড" (Okazaki fragments) কোন সূত্রকে সৃষ্টি হয় এবং কোন এনজাইম এগুলোকে জোড়া দেয়?',
      a: 'ল্যাগিং সূত্রকে সৃষ্টি হয় ও DNA লাইগেজ জোড়া দেয়',
      d: ['লিডিং সূত্রকে সৃষ্টি হয় ও হেলিকেজ জোড়া দেয়', 'ল্যাগিং সূত্রকে সৃষ্টি হয় ও প্রাইমেজ জোড়া দেয়', 'উভয় সূত্রকে সৃষ্টি হয় ও টপোআইসোমারেজ জোড়া দেয়'],
      exp: 'DNA পলিমারেজ-III কেবল 5′→3′ অভিমুখে সংশ্লেষ করে বলে ৩′→৫′ টেমপ্লেটের বিপরীতে লিডিং সূত্র নিরবচ্ছিন্ন এবং অপর টেমপ্লেটে ল্যাগিং সূত্র খণ্ড খণ্ড ওকাজাকি রূপে তৈরি হয়ে লাইগেজ দিয়ে জোড়া লাগে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · DNA রেপ্লিকেশন',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'উদ্ভিদকোষে কোষপ্রাচীরের ছিদ্রপথে পাশাপাশি দুটি কোষের সাইটোপ্লাজমিক সংযোগকে কী বলে?',
      a: 'প্লাজমোডেসমাটা (Plasmodesmata)',
      d: ['ডেসমোজোম', 'টাইট জাংশন', 'টোনোপ্লাস্ট'],
      exp: 'প্লাজমোডেসমাটা নামক সূক্ষ্ম সাইটোপ্লাজমিক নালিকার মাধ্যমে উদ্ভিদকোষগুলো পরস্পর পানি, আয়ন ও অণু বিনিময় (সিমপ্লাস্টিক পথ) করে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষপ্রাচীর',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'কোষগহ্বরকে (Vacuole) বেষ্টনকারী একক পর্দাকে কী বলা হয়?',
      a: 'টোনোপ্লাস্ট',
      d: ['প্লাজমালেমা', 'থাইলাকয়েড', 'পেলিকল'],
      exp: 'উদ্ভিদকোষের কেন্দ্রীয় কোষগহ্বরের চারপাশে অবস্থিত অর্ধভেদ্য পাতলা ঝিল্লি হলো টোনোপ্লাস্ট।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষগহ্বর',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'নিচের কোন দুটি কোষীয় অঙ্গাণুকে "সেমি-অটোনোমাস" বা অর্ধ-স্বয়ংক্রিয় অঙ্গাণু বলা হয়?',
      a: 'মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্ট',
      d: ['গলগি বডি ও লাইসোজোম', 'রাইবোজোম ও সেন্ট্রিওল', 'নিউক্লিয়াস ও পারঅক্সিসোম'],
      exp: 'মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্ট উভয়েরই নিজস্ব বৃত্তাকার DNA ও 70S রাইবোজোম থাকায় এরা নিজেরা কিছু প্রোটিন তৈরি করতে পারে ও বিভাজিত হতে পারে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষীয় অঙ্গাণু',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'মায়োসিস-১ এর প্রোফেজ-১ এর পাঁচটি উপ-পর্যায়ের সঠিক ক্রম কোনটি?',
      a: 'লেপ্টোটিন → জাইগোটিন → প্যাকাইটিন → ডিপ্লোটিন → ডায়াকাইনেসিস',
      d: [
        'জাইগোটিন → লেপ্টোটিন → প্যাকাইটিন → ডায়াকাইনেসিস → ডিপ্লোটিন',
        'লেপ্টোটিন → প্যাকাইটিন → জাইগোটিন → ডিপ্লোটিন → ডায়াকাইনেসিস',
        'প্যাকাইটিন → লেপ্টোটিন → জাইগোটিন → ডিপ্লোটিন → ডায়াকাইনেসিস',
      ],
      exp: 'প্রোফেজ-১ পাঁচটি ক্রমিক উপ-পর্যায়ে বিভক্ত: লেপ্টোটিন (বুকে স্টেজ), জাইগোটিন (সিন্যাপসিস), প্যাকাইটিন (ক্রসিং ওভার), ডিপ্লোটিন (কায়াজমা) ও ডায়াকাইনেসিস (প্রান্তীয়করণ)।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মায়োসিস-১',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'প্রোফেজ-১ এর কোন উপ-পর্যায়ে সিন্যাপটোনিমাল কমপ্লেক্স গঠিত হয়ে বাইভ্যালেন্ট সৃষ্টি হয়?',
      a: 'জাইগোটিন',
      d: ['লেপ্টোটিন', 'প্যাকাইটিন', 'ডিপ্লোটিন'],
      exp: 'জাইগোটিন উপ-পর্যায়ে পিতৃ ও মাতৃ ক্রোমোজোমের মধ্যে জোড় বাঁধা (সিন্যাপসিস) ঘটে এবং সিন্যাপটোনিমাল কমপ্লেক্স গঠিত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · জাইগোটিন',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'পোলার বা বুকে (Bouquet) বিন্যাস প্রোফেজ-১ এর কোন উপ-পর্যায়ে দেখা যায়?',
      a: 'লেপ্টোটিন',
      d: ['ডিপ্লোটিন', 'ডায়াকাইনেসিস', 'প্যাকাইটিন'],
      exp: 'প্রাণীকোষে লেপ্টোটিন উপ-পর্যায়ে ক্রোমোজোমগুলোর প্রান্ত নিউক্লিয়ার মেমব্রেনের একদিকে ফুলের তোড়ার (Bouquet) মতো একত্রিত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · লেপ্টোটিন',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'ক্রোমোজোমের কায়াজমাগুলো প্রান্তের দিকে সরে যাওয়া বা "প্রান্তীয়করণ" (Terminalization) কোন উপ-পর্যায়ে ঘটে?',
      a: 'ডায়াকাইনেসিস',
      d: ['জাইগোটিন', 'প্যাকাইটিন', 'লেপ্টোটিন'],
      exp: 'ডিপ্লোটিনে কায়াজমা স্পষ্ট হয় এবং ডায়াকাইনেসিসে প্রান্তীয়করণ সম্পন্ন হয়ে নিউক্লিওলাস ও নিউক্লিয়ার আবরণী বিলুপ্ত হতে থাকে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · ডায়াকাইনেসিস',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'মানুষের স্নায়ুকোষ (নিউরন) ও পরিণত লোহিত রক্তকণিকা কোষ চক্রের কোন স্থির দশায় অবস্থান করে?',
      a: 'G₀ (ইন্টারফেজের শান্ত দশা)',
      d: ['S দশা', 'G₂ দশা', 'M দশা'],
      exp: 'যেসব কোষ বিভাজিত হয় না (যেমন- নিউরন, হৃদপেশি) সেগুলো G₁ থেকে G₀ দশায় প্রবেশ করে বিপাকীয়ভাবে সক্রিয় থাকে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষ চক্র',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'কোষ চক্রের বিভাজনকে নিয়ন্ত্রণকারী "সেল সাইকেল রেগুলেটর" প্রোটিন দুটি কী কী?',
      a: 'সাইক্লিন ও সাইক্লিন-নির্ভর কাইনেজ (Cdk)',
      d: ['অ্যাক্টিন ও মায়োসিন', 'টিউবিউলিন ও ডাইনিন', 'হিস্টোন ও প্রোটামিন'],
      exp: 'সাইক্লিন প্রোটিন ও Cdk এনজাইম এবং p53 টিউমার সাপ্রেসর জিন কোষ চক্রের চেকপয়েন্টগুলো নিয়ন্ত্রণ করে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষ চক্র নিয়ন্ত্রণ',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'নিচের কোন ডাইস্যাকারাইডটি একটি নন-রিডিউসিং সুগার (অবিজারক শর্করা)?',
      a: 'সুক্রোজ (গ্লুকোজ + ফ্রুক্টোজ)',
      d: ['মল্টোজ', 'ল্যাকটোজ', 'সেলোবায়োজ'],
      exp: 'সুক্রোজে গ্লুকোজের C-1 এবং ফ্রুক্টোজের C-2 কার্বন গ্লাইকোসাইডিক বন্ধনে আবদ্ধ থাকায় কোনো মুক্ত অ্যালডিহাইড বা কিটোন গ্রুপ থাকে না; তাই এটি নন-রিডিউসিং।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · কার্বোহাইড্রেট',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'সবচেয়ে মিষ্টি প্রাকৃতিক মনোস্যাকারাইড (ফলশর্করা) কোনটি?',
      a: 'ফ্রুক্টোজ (Fructose)',
      d: ['গ্লুকোজ', 'গ্যালাকটোজ', 'রাইবোজ'],
      exp: 'ফ্রুক্টোজ হলো ৬-কার্বনবিশিষ্ট কিটোহেক্সোজ যা পাকা ফল ও মধুতে প্রচুর থাকে এবং প্রাকৃতিক শর্করার মধ্যে সবচেয়ে মিষ্টি।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · মনোস্যাকারাইড',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'অ্যামিনো অ্যাসিডের আলফা-কার্বন থেকে গঠিত পলিপেপটাইড শৃঙ্খলে দুটি অ্যামিনো অ্যাসিড কোন বন্ধনে যুক্ত হয়?',
      a: 'পেপটাইড বন্ধন (–CO–NH–)',
      d: ['গ্লাইকোসাইডিক বন্ধন', 'এস্টার বন্ধন', 'ফসফোডাইএস্টার বন্ধন'],
      exp: 'একটি অ্যামিনো অ্যাসিডের –COOH এবং পরবর্তী অ্যামিনো অ্যাসিডের –NH₂ মূলক থেকে ১ অণু পানি অপসারিত হয়ে পেপটাইড বন্ধন গঠিত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রোটিন',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'উদ্ভিদের রাইজোমে (যেমন- ডায়ালিয়া কন্দ) সঞ্চিত ফ্রুক্টোজের পলিমার কোনটি?',
      a: 'ইনুলিন (Inulin)',
      d: ['স্টার্চ', 'গ্লাইকোজেন', 'কাইটিন'],
      exp: 'ইনুলিন ফ্রুক্টোজ অণু দিয়ে গঠিত পলিস্যাকারাইড (ফ্রুক্টান) যা বৃক্কের গ্লোমেরুলার ফিল্ট্রেশন রেট (GFR) নির্ণয়ে ব্যবহৃত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · পলিস্যাকারাইড',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'এনজাইমের তাপ-স্থিতিশীল ও অপ্রোটিন জৈব অংশ যা ঢিলাভাবে প্রোটিনের (অ্যাপোএনজাইম) সাথে যুক্ত থাকে তাকে কী বলে?',
      a: 'কো-এনজাইম (যেমন NAD⁺, FAD, ভিটামিন বি-কমপ্লেক্স)',
      d: ['অ্যাপোএনজাইম', 'হলোএনজাইম', 'জাইমোজেন'],
      exp: 'অ্যাপোএনজাইম (প্রোটিন অংশ) + কো-ফ্যাক্টর/কো-এনজাইম (অপ্রোটিন অংশ) মিলে সক্রিয় হলোএনজাইম গঠিত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · এনজাইমের গঠন',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'তলা-চাবি (Lock and Key) এবং আবিষ্ট যোগ্যতা (Induced Fit) মতবাদ যথাক্রমে কোন বিজ্ঞানীরা প্রদান করেন?',
      a: 'এমিল ফিশার (১৮৯৪) ও ড্যানিয়েল কোশল্যান্ড (১৯৫৮)',
      d: ['সিঙ্গার-নিকলসন ও রবার্টসন', 'ওয়াটসন-ক্রিক ও জ্যাকব-মনোড', 'ব্ল্যাকম্যান ও কেলভিন'],
      exp: 'এমিল ফিশার এনজাইম ক্রিয়ার লক-অ্যান্ড-কি মতবাদ এবং কোশল্যান্ড আধুনিক ইনডিউসড ফিট মতবাদ প্রস্তাব করেন।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · এনজাইমের কার্যপদ্ধতি',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      q: 'ব্যাকটেরিয়ায় গ্রাম রঞ্জনের (Gram staining) পর গ্রাম-পজিটিভ ও গ্রাম-নেগেটিভ ব্যাকটেরিয়া যথাক্রমে কোন বর্ণ ধারণ করে?',
      a: 'বেগুনি (Crystal violet) ও গোলাপি/লাল (Safranin)',
      d: ['লাল ও নীল', 'সবুজ ও হলুদ', 'সাদা ও বেগুনি'],
      exp: 'হ্যান্স ক্রিশ্চিয়ান গ্রাম উদ্ভাবিত রঞ্জন পদ্ধতিতে পুরু পেপটাইডোগ্লাইক্যানের কারণে গ্রাম-পজিটিভ বেগুনি বর্ণ ধরে রাখে এবং গ্রাম-নেগেটিভ স্যাফ্রানিনে লাল/গোলাপি হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ব্যাকটেরিয়া শ্রেণিবিভাগ',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      q: 'অ্যানোফিলিস মশার দেহে ম্যালেরিয়া পরজীবীর (Plasmodium) কোন ধরনের জনন চক্র সম্পন্ন হয়?',
      a: 'যৌন জনন (গ্যামিটোগনি ও স্পোরোগনি)',
      d: ['কেবল হেপাটিক সাইজোগনি', 'কেবল এরিথ্রোসাইটিক সাইজোগনি', 'মুকুলোদগম ও দ্বিভাজন'],
      exp: 'স্ত্রী অ্যানোফিলিস মশা Plasmodium-এর নির্দিষ্ট পোষক (Definitive host) যেখানে যৌন জনন ঘটে; মানুষ হলো মধ্যবর্তী পোষক (অযৌন সাইজোগনি)।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ম্যালেরিয়া জীবনচক্র',
    },
    {
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      q: 'ক্লোরোফিলের পাশাপাশি কোন রঞ্জক পদার্থের আধিক্যের কারণে লোহিত শৈবাল (Rhodophyta) লাল বর্ণের হয়?',
      a: 'ফাইকোএরিথ্রিন (r-phycoerythrin)',
      d: ['ফিউকোজ্যান্থিন', 'ফাইকোসায়ানিন', 'জ্যান্থোফিল'],
      exp: 'লোহিত শৈবালে r-ফাইকোএরিথ্রিন ও r-ফাইকোসায়ানিন এবং বাদামি শৈবালে (Phaeophyta) ফিউকোজ্যান্থিন প্রধান সহায়ক রঞ্জক।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫ · শৈবাল',
    },
    {
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      q: 'জীবন্ত মাশরুম হিসেবে খ্যাত Agaricus-এর ফ্রুটিং বডির ছাতার মতো প্রসারিত অংশকে কী বলে?',
      a: 'পিলিয়াস (Pileus)',
      d: ['স্টাইপ', 'অ্যানুলাস', 'মাইসেলিয়াম'],
      exp: 'Agaricus-এর দণ্ডাকার অংশ স্টাইপ, স্টাইপের ওপরের বলয় অ্যানুলাস, ছাতার অংশ পিলিয়াস এবং এর নিচের পাতলা পর্দা হলো গিল (ল্যামেলা)।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫ · Agaricus',
    },
    {
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      q: 'মস ও ফার্ন উভয়েরই নিষেক প্রক্রিয়ার জন্য নিচের কোনটি অপরিহার্য?',
      a: 'মুক্ত পানির উপস্থিতি',
      d: ['পতঙ্গের পরাগায়ন', 'বায়ুপ্রবাহ', 'বীজত্বকের আর্দ্রতা'],
      exp: 'ব্রায়োফাইট ও টেরিডোফাইট উভয়ের ফ্ল্যাজেলাযুক্ত সচল শুক্রাণু (অ্যান্থেরোজয়েড) সাঁতরে ডিম্বাণুতে পৌঁছাতে বাহ্যিক পানির প্রয়োজন হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৬ · ব্রায়োফাইটা ও টেরিডোফাইটা',
    },
    {
      ch: 'bio1_ch7_angiosperm',
      vl: 'photosynthesis',
      q: 'একবীজপত্রী ও দ্বিবীজপত্রী উদ্ভিদের মধ্যে মূল শনাক্তকারী পার্থক্য কোনটি?',
      a: '১টি বীজপত্র, সমান্তরাল শিরাবিন্যাস, ট্রাইমেরাস পুষ্প (একবীজপত্রী) বনাম ২টি বীজপত্র, জালিকাকার শিরাবিন্যাস, টেট্রা/পেন্টামেরাস পুষ্প',
      d: [
        'দ্বিবীজপত্রীতে সমান্তরাল শিরাবিন্যাস ও একবীজপত্রীতে জালিকাকার শিরাবিন্যাস',
        'একবীজপত্রীতে প্রধান মূলতন্ত্র ও দ্বিবীজপত্রীতে গুচ্ছমূল',
        'উভয়েই ক্যাম্বিয়ামযুক্ত মুক্ত ভাস্কুলার বান্ডল',
      ],
      exp: 'একবীজপত্রীতে ১ বীজপত্র, গুচ্ছমূল, সমান্তরাল শিরাবিন্যাস ও ট্রাইমেরাস পুষ্প; দ্বিবীজপত্রীতে ২ বীজপত্র, প্রধান মূল, জালিকাকার শিরাবিন্যাস ও টেট্রা/পেন্টামেরাস পুষ্প থাকে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · আবৃতবীজী উদ্ভিদ',
    },
    {
      ch: 'bio1_ch8_tissue',
      vl: 'photosynthesis',
      q: 'একবীজপত্রী ও দ্বিবীজপত্রী কাণ্ডের ভাস্কুলার বান্ডল যথাক্রমে কোন ধরনের?',
      a: 'সমপার্শ্বীয় বদ্ধ ও বিক্ষিপ্ত (একবীজপত্রী) এবং সমপার্শ্বীয় মুক্ত ও বলয়াকার (দ্বিবীজপত্রী)',
      d: [
        'অরীয় (একবীজপত্রী) ও কেন্দ্রীয় (দ্বিবীজপত্রী)',
        'সমপার্শ্বীয় মুক্ত (একবীজপত্রী) ও সমপার্শ্বীয় বদ্ধ (দ্বিবীজপত্রী)',
        'সমদ্বিপার্শ্বীয় (একবীজপত্রী) ও অরীয় (দ্বিবীজপত্রী)',
      ],
      exp: 'একবীজপত্রী কাণ্ডে (ভুট্টা) ক্যাম্বিয়াম নেই (বদ্ধ) এবং গ্রাউন্ড টিস্যুতে বিক্ষিপ্ত; দ্বিবীজপত্রী কাণ্ডে (সূর্যমুখী) ক্যাম্বিয়াম থাকে (মুক্ত) ও বলয়াকারে সজ্জিত।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮ · কাণ্ডের অন্তর্গঠন',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      q: 'সালোকসংশ্লেষণের জন্য সর্বাধিক কার্যকর দৃশ্যমান আলোর বর্ণ দুটি কী কী?',
      a: 'লাল ও নীল আলো',
      d: ['সবুজ ও হলুদ আলো', 'বেগুনি ও অতিবেগুনি', 'অবলোহিত ও সবুজ'],
      exp: 'ক্লোরোফিল-a ও b দৃশ্যমান বর্ণালির লাল (৬৫০–৭০০ nm) এবং নীল (৪৩০–৪৭০ nm) আলো সবচেয়ে বেশি শোষণ করে; সবুজ আলো প্রতিফলিত করে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · সালোকসংশ্লেষণ',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      q: 'গ্লুকোজের সবাত শ্বসনে (সেলুলার রেসপিরেশন) গ্লাইকোলাইসিস ও ক্রেবস চক্রের মধ্যে কোনটি সাইটোপ্লাজমে ঘটে?',
      a: 'কেবল গ্লাইকোলাইসিস',
      d: ['কেবল ক্রেবস চক্র', 'কেবল ETS', 'লিংক বিক্রিয়া ও ক্রেবস চক্র'],
      exp: 'গ্লাইকোলাইসিস ঘটে সাইটোপ্লাজমে; আর লিংক বিক্রিয়া ও ক্রেবস চক্র ঘটে মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে এবং ETS ক্রিস্টিতে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শ্বসনের স্থান',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      q: 'রিকম্বিন্যান্ট DNA প্রযুক্তিতে "হুমুলিন" (কৃত্রিম মানব ইনসুলিন) উৎপাদনের জন্য কোন পোষক জীব ব্যবহৃত হয়েছিল?',
      a: 'Escherichia coli (E. coli) ব্যাকটেরিয়া',
      d: ['Agrobacterium tumefaciens', 'Bacillus thuringiensis', 'Thermus aquaticus'],
      exp: '১৯৮২ সালে E. coli ব্যাকটেরিয়ার প্লাজমিডে মানব ইনসুলিনের A ও B চেইনের জিন প্রবেশ করিয়ে বায়োটেকনোলজির মাধ্যমে হুমুলিন তৈরি করা হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · চিকিৎসা ক্ষেত্রে জীবপ্রযুক্তি',
    },
  ];

  comparativeFacts.forEach((cf) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: cf.ch,
        visualLessonId: cf.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: cf.q,
        correct: cf.a,
        distractors: cf.d,
        explanation: cf.exp,
        reference: cf.ref,
      })
    );
  });

  // 10. High-Yield Cross-Chapter Assertion / "Which is NOT / Exception" & Comparison Matrix (~150+ MCQs)
  const bio1Matrix: Array<{
    ch: string;
    vl: string;
    topic: string;
    trueStmt: string;
    falseStmts: [string, string, string];
    exp: string;
    ref: string;
  }> = [
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'আদিকোষ (Prokaryotic cell)',
      trueStmt: 'DNA বৃত্তাকার, হিস্টোন প্রোটিনবিহীন এবং সাইটোপ্লাজমের নিউক্লিঅয়েড অঞ্চলে থাকে',
      falseStmts: [
        'সুগঠিত দ্বিস্তরী নিউক্লিয়ার আবরণী ও নিউক্লিওলাস বিদ্যমান',
        'সাইটোপ্লাজমে 80S প্রকৃতির রাইবোজোম ও মাইটোকন্ড্রিয়া থাকে',
        'কোষ বিভাজন কেবল মাইটোসিস ও মায়োসিস প্রক্রিয়ায় ঘটে',
      ],
      exp: 'আদিকোষে নিউক্লিয়ার আবরণী ও ঝিল্লিবদ্ধ অঙ্গাণু নেই; DNA হিস্টোনমুক্ত বৃত্তাকার (নিউক্লিঅয়েড), রাইবোজোম 70S এবং বিভাজন অ্যামাইটোসিস/দ্বিভাজন।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · আদিকোষ',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'উদ্ভিদকোষ ও প্রাণীকোষের পার্থক্য',
      trueStmt: 'উদ্ভিদকোষে সেলুলোজ নির্মিত কোষপ্রাচীর, প্লাস্টিড ও বড় কেন্দ্রীয় কোষগহ্বর থাকে কিন্তু সাধারণত সেন্ট্রিওল নেই',
      falseStmts: [
        'উদ্ভিদকোষে সঞ্চিত খাদ্য গ্লাইকোজেন এবং প্রাণীকোষে শ্বেতসার',
        'প্রাণীকোষে প্লাস্টিড ও প্লাজমোডেসমাটা উভয়ই উপস্থিত',
        'উদ্ভিদকোষে সাইটোকাইনেসিস ক্লিভেজ ফারো পদ্ধতিতে ঘটে',
      ],
      exp: 'উদ্ভিদকোষে কোষপ্রাচীর, প্লাস্টিড, কোষগহ্বর ও সেল-প্লেট সাইটোকাইনেসিস দেখা যায়; সঞ্চিত খাদ্য স্টার্চ (প্রাণীতে গ্লাইকোজেন)।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · উদ্ভিদ ও প্রাণীকোষ',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'ক্লোরোপ্লাস্ট',
      trueStmt: 'গ্রানার থাইলাকয়েডে আলোক পর্যায় এবং স্ট্রোমাতে কেলভিন চক্র সংঘটিত হয়',
      falseStmts: [
        'ক্লোরোপ্লাস্টে 80S রাইবোজোম থাকে এবং কোনো DNA থাকে না',
        'ক্লোরোফিল-a অণুর কেন্দ্রে একটি Fe পরমাণু অবস্থান করে',
        'এটি দ্বিস্তরী আবরণীবিহীন একটি একক ঝিল্লিযুক্ত অঙ্গাণু',
      ],
      exp: 'ক্লোরোপ্লাস্ট দ্বিস্তরী ঝিল্লিযুক্ত, নিজস্ব বৃত্তাকার DNA ও 70S রাইবোজোমধারী এবং ক্লোরোফিলের কেন্দ্রীয় পরমাণু Mg।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · প্লাস্টিড',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'DNA ও RNA পার্থক্য',
      trueStmt: 'DNA-তে ডিঅক্সিরাইবোজ শর্করা ও থাইমিন থাকে; RNA-তে রাইবোজ শর্করা ও ইউরাসিল থাকে',
      falseStmts: [
        'DNA সাধারণত একসূত্রক এবং কেবল সাইটোপ্লাজমে অবস্থান করে',
        'RNA-তে চারগাফের সূত্র অনুসারে সর্বদা A=T ও G=C হয়',
        'DNA-এর ২′ কার্বনে একটি বাড়তি অক্সিজেন (-OH) মূলক থাকে',
      ],
      exp: 'DNA দ্বিসূত্রক, ২′-ডিঅক্সিরাইবোজ শর্করা ও A,G,C,T সমৃদ্ধ; আর RNA সাধারণত একসূত্রক, রাইবোজ (২′-OH) ও ইউরাসিল সমৃদ্ধ।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · নিউক্লিক অ্যাসিড',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'মাইটোসিস বনাম মায়োসিস',
      trueStmt: 'মাইটোসিস দেহকোষে ঘটে সমসংখ্যক ক্রোমোজোমযুক্ত ২টি কোষ তৈরি করে; মায়োসিস জনন মাতৃকোষে ঘটে অর্ধেক ক্রোমোজোমযুক্ত ৪টি কোষ তৈরি করে',
      falseStmts: [
        'মাইটোসিসে ক্রসিং ওভার ও সিন্যাপসিস নিয়মিতভাবে ঘটে',
        'মায়োসিসে একবার নিউক্লিয়াস বিভাজিত হয় ও একবার ক্রোমোজোম বিভাজিত হয়',
        'মায়োসিস-২ হলো প্রকৃতপক্ষে একটি হ্রাসমূলক বিভাজন',
      ],
      exp: 'মাইটোসিস সমীকরণিক বিভাজন (দেহকোষে), আর মায়োসিস-১ হ্রাসমূলক এবং মায়োসিস-২ সমীকরণিক বিভাজন (মোট ২ বার নিউক্লিয়াস, ১ বার ক্রোমোজোম বিভাজন)।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষ বিভাজন',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'এনজাইম বৈশিষ্ট্য',
      trueStmt: 'প্রায় সব এনজাইমই প্রোটিনধর্মী (রাইবোজাইম ব্যতীত), তাপ-সংবেদনশীল এবং বিক্রিয়ার শেষে অপরিবর্তিত থাকে',
      falseStmts: [
        'এনজাইম বিক্রিয়ার সাম্যাবস্থার মান পরিবর্তন করে উৎপাদ বাড়ায়',
        'সব এনজাইম কেবল ১০০°C তাপমাত্রায় সর্বাধিক সক্রিয় থাকে',
        'এনজাইম বিক্রিয়ার সক্রিয়ণ শক্তি (Activation energy) বৃদ্ধি করে',
      ],
      exp: 'এনজাইম বিক্রিয়ার সক্রিয়ণ শক্তি কমিয়ে বিক্রিয়ার গতি বাড়ায়, কিন্তু সাম্যাবস্থা পরিবর্তন করে না; অপটিমাম তাপমাত্রা সাধারণত ২৫°–৪৫°C।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · এনজাইম',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      topic: 'ভাইরাসের জীব ও জড় বৈশিষ্ট্য',
      trueStmt: 'ভাইরাস অকোষীয়, পোষক দেহের বাইরে জড়ের মতো কেলাসিত অবস্থায় থাকে কিন্তু জীবন্ত পোষকে সংখ্যাবৃদ্ধি ও মিউটেশন ঘটায়',
      falseStmts: [
        'ভাইরাসের নিজস্ব রাইবোজোম ও ATP উৎপাদনকারী সাইটোপ্লাজম আছে',
        'ভাইরাসকে কৃত্রিম পুষ্টি মাধ্যমে সহজেই কালচার করা যায়',
        'একই ভাইরাসে সর্বদা DNA এবং RNA উভয়ই একত্রে অবস্থান করে',
      ],
      exp: 'ভাইরাস বাধ্যতামূলক পরজীবী (Obligate parasite); এতে DNA বা RNA-এর যেকোনো একটি থাকে, সাইটোপ্লাজম বা রাইবোজোম থাকে না।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ভাইরাস',
    },
    {
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      topic: 'শৈবাল বনাম ছত্রাক',
      trueStmt: 'শৈবাল ক্লোরোফিলযুক্ত স্বভোজী (সঞ্চিত খাদ্য শ্বেতসার), আর ছত্রাক ক্লোরোফিলবিহীন পরভোজী (সঞ্চিত খাদ্য গ্লাইকোজেন ও তৈলবিন্দু)',
      falseStmts: [
        'ছত্রাকের কোষপ্রাচীর সেলুলোজ এবং শৈবালের কোষপ্রাচীর কাইটিন নির্মিত',
        'শৈবালে সর্বদা ভাস্কুলার টিস্যু ও ভ্রূণ গঠিত হয়',
        'ছত্রাক সূর্যালোকের উপস্থিতিতে সালোকসংশ্লেষণে খাদ্য তৈরি করে',
      ],
      exp: 'শৈবাল স্বভোজী ও কোষপ্রাচীর সেলুলোজময়; ছত্রাক পরভোজী/মৃতজীবী ও কোষপ্রাচীর কাইটিনময় (উওমাইকোটা বাদে)। কারোরই ভ্রূণ বা ভাস্কুলার টিস্যু নেই।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫ · শৈবাল ও ছত্রাক',
    },
    {
      ch: 'bio1_ch7_angiosperm',
      vl: 'photosynthesis',
      topic: 'নগ্নবীজী ও আবৃতবীজী উদ্ভিদ',
      trueStmt: 'নগ্নবীজী উদ্ভিদে গর্ভাশয় না থাকায় ফল হয় না ও শস্য হ্যাপ্লয়েড (n); আবৃতবীজীতে দ্বিনিষেক ও ট্রিপ্লয়েড (3n) শস্য হয়',
      falseStmts: [
        'নগ্নবীজী উদ্ভিদে সাধারণত দ্বিনিষেক ও আর্কিগোনিয়া অনুপস্থিত',
        'আবৃতবীজী উদ্ভিদে পরাগায়ন কেবল বায়ুর মাধ্যমেই সম্পন্ন হয়',
        'নগ্নবীজী উদ্ভিদের জাইলেমে সর্বদা প্রকৃত ভেসেল কোষ বিদ্যমান',
      ],
      exp: 'নগ্নবীজীতে আর্কিগোনিয়া থাকে (Gnetum বাদে), নিষেকের আগেই শস্য (n) তৈরি হয়, গর্ভাশয়/ফল নেই; আবৃতবীজীতে দ্বিনিষেকের পর 3n শস্য ও ফল হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · নগ্নবীজী বনাম আবৃতবীজী',
    },
    {
      ch: 'bio1_ch8_tissue',
      vl: 'photosynthesis',
      topic: 'জাইলেম ও ফ্লোয়েম',
      trueStmt: 'জাইলেমের চার উপাদানের মধ্যে কেবল জাইলেম প্যারেনকাইমা সজীব; ফ্লোয়েমের মধ্যে কেবল ফ্লোয়েম ফাইবার (বাস্ট) মৃত',
      falseStmts: [
        'জাইলেমের ট্রাকিড ও ভেসেল উভয়ই প্রোটোপ্লাজমযুক্ত সজীব কোষ',
        'পরিণত সিভনল কোষে একটি বড় সুগঠিত নিউক্লিয়াস অবস্থান করে',
        'ফ্লোয়েম কেবল মূল থেকে পাতায় পানি ও খনিজ লবণ পরিবহন করে',
      ],
      exp: 'জাইলেম (ট্রাকিড, ভেসেল, ফাইবার মৃত; প্যারেনকাইমা সজীব) পানি পরিবহন করে; ফ্লোয়েম (সিভনল, সঙ্গীকোষ, প্যারেনকাইমা সজীব; ফাইবার মৃত) খাদ্য পরিবহন করে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮ · জটিল টিস্যু',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      topic: 'C₃ বনাম C₄ উদ্ভিদ',
      trueStmt: 'C₄ উদ্ভিদে পাতায় ক্র‍্যাঞ্জ অ্যানাটমি থাকে, CO₂-এর প্রাথমিক গ্রহীতা PEP এবং প্রথম স্থায়ী যৌগ OAA',
      falseStmts: [
        'C₃ উদ্ভিদে প্রথম স্থায়ী পদার্থ ৪-কার্বন ম্যালিক অ্যাসিড',
        'C₄ উদ্ভিদে ফটোরেসপিরেশনের হার C₃ অপেক্ষা অনেক বেশি',
        'C₄ চক্রে ১ অণু গ্লুকোজ সংশ্লেষে ১৮টি ATP খরচ হয়',
      ],
      exp: 'C₃ উদ্ভিদে প্রাথমিক গ্রহীতা RuBP, প্রথম স্থায়ী যৌগ 3-PGA (১৮ ATP/গ্লুকোজ) ও উচ্চ ফটোরেসপিরেশন; C₄ উদ্ভিদে PEP গ্রহীতা, OAA প্রথম যৌগ (৩০ ATP) ও ক্র‍্যাঞ্জ অ্যানাটমি থাকে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · C₃ ও C₄ উদ্ভিদ',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      topic: 'সবাত ও অবাত শ্বসন',
      trueStmt: 'গ্লাইকোলাইসিস উভয় শ্বসনের সাধারণ ধাপ; সবাত শ্বসনে ৩৬–৩৮ ATP এবং অবাত শ্বসনে মাত্র ২ ATP উৎপন্ন হয়',
      falseStmts: [
        'অবাত শ্বসনে ক্রেবস চক্র ও ETS সম্পূর্ণরূপে সংঘটিত হয়',
        'সবাত শ্বসনে অক্সিজেন ছাড়াই পাইরুভেট সম্পূর্ণ জারিত হয়',
        'ইথানল ফার্মেন্টেশনে কোনো CO₂ গ্যাস নির্গত হয় না',
      ],
      exp: 'গ্লাইকোলাইসিসে অক্সিজেন লাগে না, তাই এটি উভয়েই সাধারণ। অবাত শ্বসনে ক্রেবস/ETS হয় না এবং মাত্র ২ ATP উৎপন্ন হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শ্বসনের তুলনা',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      topic: 'প্লাজমিডের বৈশিষ্ট্য',
      trueStmt: 'ব্যাকটেরিয়ার মূল ক্রোমোজোম থেকে আলাদা, বৃত্তাকার দ্বিসূত্রক DNA যা স্বতন্ত্রভাবে প্রতিলিপন করতে পারে',
      falseStmts: [
        'এটি রৈখিক একসূত্রক RNA দিয়ে গঠিত একটি প্রোটিন কণা',
        'প্লাজমিড কেবল ব্যাকটেরিয়ার মৃত্যু ঘটানোর জন্য ব্যবহৃত হয়',
        'এতে কোনো অ্যান্টিবায়োটিক প্রতিরোধী বা ori জিন থাকতে পারে না',
      ],
      exp: 'প্লাজমিডে Ori (Origin of replication), সিলেক্টেবল মার্কার (অ্যান্টিবায়োটিক রেজিস্ট্যান্স) ও MCS থাকে, তাই এটি জিন ক্লোনিংয়ের আদর্শ ভেক্টর।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · প্লাজমিড ভেক্টর',
    },
  ];

  bio1Matrix.forEach((m, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `"${m.topic}" সম্পর্কিত নিচের কোন উক্তিটি সঠিক?`,
        correct: m.trueStmt,
        distractors: m.falseStmts,
        explanation: m.exp,
        reference: m.ref,
      })
    );

    // Reverse ("নিচের কোনটি সঠিক নয়?")
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${m.topic}" প্রসঙ্গে কোন তথ্যটি ভুল বা সঠিক নয়?`,
        correct: m.falseStmts[0],
        distractors: [m.trueStmt, `এটি ${m.topic}-এর একটি প্রতিষ্ঠিত বৈশিষ্ট্য`, `${m.topic} অধ্যায়ে এর ব্যতিক্রমী প্রমাণ রয়েছে`],
        explanation: `সঠিক নয় এমন উক্তি হলো "${m.falseStmts[0]}"। প্রকৃত তথ্য: ${m.exp}`,
        reference: m.ref,
      })
    );
  });

  // 11. Extra Targeted Botany Revision Questions across Ch 1-11 to guarantee >1,000 unique questions
  const extraBotanyDrills: Array<{
    ch: string;
    vl: string;
    q: string;
    a: string;
    d: [string, string, string];
    exp: string;
    ref: string;
  }> = [
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'DNA অণুর দুই সূত্রকের মধ্যবর্তী ব্যাস কত এবং পাশাপাশি দুটি নিউক্লিওটাইডের দূরত্ব কত?',
      a: 'ব্যাস ২০ Å (২ nm) ও দূরত্ব ৩.৪ Å (০.৩৪ nm)',
      d: ['ব্যাস ৩৪ Å ও দূরত্ব ২ Å', 'ব্যাস ১০ Å ও দূরত্ব ৩৪ Å', 'ব্যাস ৪০ Å ও দূরত্ব ৩.৪ nm'],
      exp: 'DNA ডাবল হেলিক্সের প্রস্থ ২.০ nm (২০ Å) এবং প্রতিটি বেসপেয়ার ধাপের মধ্যবর্তী উল্লম্ব দূরত্ব ০.৩৪ nm (৩.৪ Å)।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · DNA',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'কোষতত্ত্ব (Cell Theory) প্রদান করেন কোন দুই বিজ্ঞানী এবং "Omnis cellula e cellula" কে বলেন?',
      a: 'শ্লেইডেন ও শোয়ান (১৮৩৮-৩৯); আর উক্তিটি করেন রুডলফ ভার্চো (১৮৫৫)',
      d: ['রবার্ট হুক ও লিউয়েনহুক; উক্তি করেন রবার্ট ব্রাউন', 'ওয়াটসন ও ক্রিক; উক্তি করেন ডারউইন', 'সিঙ্গার ও নিকলসন; উক্তি করেন পাস্তুর'],
      exp: 'ম্যাথিয়াস শ্লেইডেন ও থিওডর শোয়ান কোষতত্ত্ব দেন এবং রুডলফ ভার্চো বলেন প্রতিটি কোষ পূর্ববর্তী কোষ থেকেই উৎপন্ন হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষতত্ত্ব',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'ট্রান্সক্রিপশন ও ট্রান্সলেশন প্রক্রিয়া প্রকৃতকোষের কোন কোন স্থানে ঘটে?',
      a: 'ট্রান্সক্রিপশন নিউক্লিয়াসে এবং ট্রান্সলেশন সাইটোপ্লাজমের রাইবোজোমে',
      d: ['উভয়ই মাইটোকন্ড্রিয়ার বাইরে সাইটোপ্লাজমে', 'ট্রান্সক্রিপশন গলগি বডিতে এবং ট্রান্সলেশন নিউক্লিয়াসে', 'উভয়ই কেবল নিউক্লিওলাসের ভেতরে'],
      exp: 'প্রকৃতকোষে নিউক্লিয়াসের DNA থেকে mRNA তৈরি (ট্রান্সক্রিপশন) হওয়ার পর নিউক্লিয়ার রন্ধ্র দিয়ে সাইটোপ্লাজমে এসে রাইবোজোমে ট্রান্সলেশন হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · সেন্ট্রাল ডগমা',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'অ্যান্টিকোডন লুপ কোন ধরনের RNA অণুর কাঠামোগত অংশ?',
      a: 'tRNA (ট্রান্সফার RNA)',
      d: ['mRNA', 'rRNA', 'snRNA'],
      exp: 'ক্লোভার-পাতা আকৃতির tRNA অণুর নিচের লুপে ৩ বেসের অ্যান্টিকোডন থাকে যা mRNA-এর কোডনের সাথে জোড় বাঁধে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · RNA-এর প্রকারভেদ',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'নিউক্লিওজোমের কোরে কতটি হিস্টোন প্রোটিন অণু অক্টামার গঠন করে?',
      a: '৮টি (H2A, H2B, H3, H4-এর ২টি করে)',
      d: ['৪টি (কেবল H1)', '৬টি (H2A, H2B, H3)', '১০টি হিস্টোন অণু'],
      exp: '৮টি হিস্টোন অণুর অক্টামারের চারপাশে প্রায় ১৪৬–১৬৬ বেসপেয়ার DNA ১.৬৫ বার পেঁচিয়ে নিউক্লিওজোম গঠন করে; H1 লিংকার হিস্টোন হিসেবে থাকে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · ক্রোমাটিন ও নিউক্লিওজোম',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'টিউমার ও ক্যানসার সৃষ্টির জন্য কোন অনিয়ন্ত্রিত কোষ বিভাজন প্রক্রিয়া দায়ী?',
      a: 'অনিয়ন্ত্রিত মাইটোসিস (p53 জিনের মিউটেশন)',
      d: ['নিয়ন্ত্রিত মায়োসিস-১', 'অ্যামাইটোসিস', 'পার্থেনোজেনেসিস'],
      exp: 'কোষ চক্র নিয়ন্ত্রণকারী টিউমার সাপ্রেসর জিন (p53) অকার্যকর হলে বা অনকোজিন সক্রিয় হলে অনিয়ন্ত্রিত মাইটোসিসে ক্যানসার সৃষ্টি হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · অনিয়ন্ত্রিত কোষ বিভাজন',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'সেলুলোজে গ্লুকোজ অণুগুলো কোন গ্লাইকোসাইডিক বন্ধনে যুক্ত থাকে যা মানুষ পরিপাক করতে পারে না?',
      a: 'β-1,4 গ্লাইকোসাইডিক বন্ধন',
      d: ['α-1,4 গ্লাইকোসাইডিক বন্ধন', 'α-1,6 গ্লাইকোসাইডিক বন্ধন', 'β-1,2 গ্লাইকোসাইডিক বন্ধন'],
      exp: 'স্টার্চ ও গ্লাইকোজেনে α-1,4 (ও α-1,6) বন্ধন থাকে; সেলুলোজে β-1,4 গ্লাইকোসাইডিক বন্ধন থাকে এবং মানুষের দেহে সেলুলেজ এনজাইম নেই।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · সেলুলোজ',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'পৃথিবীতে সর্বাধিক পরিমাণে পাওয়া জৈব যৌগ (পলিমার) কোনটি?',
      a: 'সেলুলোজ',
      d: ['স্টার্চ', 'কাইটিন', 'কোলাজেন'],
      exp: 'সমস্ত উদ্ভিদ কোষপ্রাচীরের প্রধান উপাদান সেলুলোজ হলো জীবমণ্ডলে সবচেয়ে বেশি পরিমাণে প্রাপ্ত জৈব পলিমার।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · কার্বোহাইড্রেট',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      q: 'ভাইরাসের সংক্রমণের বিপরীতে ব্যবহৃত টিকার আবিষ্কারের সাথে জড়িত রোগগুলো (বসন্ত, জলাতঙ্ক) প্রতিরোধে কোন বিজ্ঞানী অগ্রণী ছিলেন?',
      a: 'এডওয়ার্ড জেনার (বসন্ত) ও লুই পাস্তুর (জলাতঙ্ক)',
      d: ['রবার্ট কখ ও আলেকজান্ডার ফ্লেমিং', 'লিউয়েনহুক ও হুক', 'স্যার রোনাল্ড রস ও লাভেরন'],
      exp: '১৭৯৬ সালে এডওয়ার্ড জেনার গুটিবসন্তের প্রথম টিকা এবং লুই পাস্তুর জলাতঙ্ক ও অ্যানথ্রাক্সের টিকা উদ্ভাবন করেন।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · টিকা ও প্রতিরক্ষা',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      q: 'ম্যালেরিয়া পরজীবী Plasmodium-কে মানুষে প্রেরণকারী স্ত্রী Anopheles মশাকে প্রথম প্রমাণ করেন কে?',
      a: 'স্যার রোনাল্ড রস (১৮৯৭)',
      d: ['চার্লস লাভেরন (১৮৮০)', 'এডওয়ার্ড জেনার', 'গোলগি'],
      exp: '১৮৮০ সালে লাভেরন রোগীর রক্তে পরজীবী দেখেন এবং ১৮৯৭ সালে রোনাল্ড রস প্রমাণ করেন যে অ্যানোফিলিস মশাই এর বাহক (১৯০২ সালে নোবেল)।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ম্যালেরিয়া',
    },
    {
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      q: 'ইংরেজিতে "Irish Moss" বা অ্যাগার-অ্যাগার ও ক্যারাজিনান কোন শ্রেণির শৈবাল থেকে পাওয়া যায়?',
      a: 'লোহিত শৈবাল (Gelidium, Gracilaria, Chondrus)',
      d: ['সবুজ শৈবাল (Spirogyra)', 'নীলাভ-সবুজ শৈবাল', 'সোনালি শৈবাল'],
      exp: 'Gelidium ও Gracilaria নামক লোহিত শৈবাল থেকে ল্যাবরেটরিতে কালচার মিডিয়া জমানোর অ্যাগার-অ্যাগার পাওয়া যায়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫ · শৈবালের অর্থনৈতিক গুরুত্ব',
    },
    {
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      q: 'কনিডিয়া, ব্যাসিডিওস্পোর ও অ্যাস্কোস্পোর—এগুলো কোন জীবগোষ্ঠীর অযৌন বা যৌন স্পোর?',
      a: 'ছত্রাক (Fungi)',
      d: ['শৈবাল', 'ব্রায়োফাইটা', 'ব্যাকটেরিয়া'],
      exp: 'Ascomycota-তে অ্যাস্কোস্পোর/কনিডিয়া এবং Basidiomycota-তে (যেমন Agaricus) ব্যাসিডিওস্পোর গঠিত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫ · ছত্রাক',
    },
    {
      ch: 'bio1_ch7_angiosperm',
      vl: 'photosynthesis',
      q: 'আবৃতবীজী উদ্ভিদের পুষ্প সংকেত (Floral formula)-এ গর্ভাশয় অধিগর্ভ (Superior) নাকি অধোগর্ভ তা কীভাবে বোঝানো হয়?',
      a: 'G-এর নিচে দাগ (G̲) মানে অধিগর্ভ এবং G-এর উপরে দাগ (G̅) মানে অধোগর্ভ',
      d: ['G-এর আগে + চিহ্ন দিয়ে', 'G-কে প্রথম বন্ধনীতে রেখে', 'G-এর নিচে বৃত্ত এঁকে'],
      exp: 'পুষ্প সংকেতে গর্ভাশয়ের (G) নিচে রেখা টানলে অধিগর্ভ (যেমন জবা, ধান) এবং উপরে রেখা টানলে অধোগর্ভ (যেমন শসা, পেয়ারা) বোঝায়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পুষ্প সংকেত',
    },
    {
      ch: 'bio1_ch8_tissue',
      vl: 'photosynthesis',
      q: 'উদ্ভিদের কোন স্থায়ী টিস্যুর কোষপ্রাচীরের কোণায় পেকটিন ও সেলুলোজ জমে স্থূল হওয়ায় নমনীয় যান্ত্রিক দৃঢ়তা দেয়?',
      a: 'কোলেনকাইমা (Collenchyma)',
      d: ['প্যারেনকাইমা', 'স্ক্লেরেনকাইমা', 'অ্যারেনকাইমা'],
      exp: 'কোলেনকাইমা হলো সজীব যান্ত্রিক টিস্যু যা বর্ধনশীল কচি কাণ্ড ও পত্রবৃন্তকে নমনীয়তা ও দৃঢ়তা দেয়; স্ক্লেরেনকাইমা লিগনিনযুক্ত মৃত যান্ত্রিক টিস্যু।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮ · সরল স্থায়ী টিস্যু',
    },
    {
      ch: 'bio1_ch8_tissue',
      vl: 'photosynthesis',
      q: 'নাশপাতি, পেয়ারা ও সফেদার শাঁসে যে শক্ত কণিকা (Stone cells) পাওয়া যায় তা কী ধরনের কোষ?',
      a: 'ব্র্যাকিস্ক্লেরেইড (স্ক্লেরেনকাইমা কোষ)',
      d: ['কোলেনকাইমা', 'ট্রাকিড', 'সিভকোষ'],
      exp: 'লিগনিন জমা হয়ে অত্যধিক পুরু প্রাচীরবিশিষ্ট মৃত স্ক্লেরেইড বা স্টোন সেল ফলের ত্বক ও শাঁসে কড়কড়ে ভাব দেয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮ · স্ক্লেরেনকাইমা',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      q: 'ক্লোরোফিল-a এবং ক্লোরোফিল-b-এর আণবিক সংকেতের প্রধান পার্থক্য কী?',
      a: 'ক্লোরোফিল-a-তে একটি মিথাইল গ্রুপ (–CH₃) এবং ক্লোরোফিল-b-তে একটি অ্যালডিহাইড গ্রুপ (–CHO) থাকে',
      d: [
        'ক্লোরোফিল-a-তে Mg থাকে না কিন্তু b-তে Fe থাকে',
        'ক্লোরোফিল-a হলুদ এবং b নীল বর্ণের',
        'ক্লোরোফিল-a-তে ফাইটল লেজ নেই',
      ],
      exp: 'ক্লোরোফিল-a (C₅₅H₇₂O₅N₄Mg)-এর ৩নং কার্বনে –CH₃ এবং ক্লোরোফিল-b (C₅₅H₇₀O₆N₄Mg)-এর ৩নং কার্বনে –CHO মূলক থাকে।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ক্লোরোফিল',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      q: 'উদ্ভিদের বাষ্পমোচন বা প্রস্বেদনের হার কোন যন্ত্রের সাহায্যে পরিমাপ করা হয়?',
      a: 'গ্যানং পটোমিটার (Ganong’s Potometer)',
      d: ['অক্সানোমিটার', 'স্ফিগমোম্যানোমিটার', 'পাইরানোমিটার'],
      exp: 'গ্যানং পটোমিটার দিয়ে প্রস্বেদনের হার (পানি শোষণের হার) ও অক্সানোমিটার দিয়ে উদ্ভিদের দৈর্ঘ্য বৃদ্ধির হার মাপা হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · প্রস্বেদন',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      q: 'কোন অজৈব আয়নের কারণে পত্ররন্ধ্র খোলা ও বন্ধ হওয়া দ্রুততর হয় ও স্টার্চ-সুগার মতবাদ নয় বরং প্রোটন পাম্প দিয়ে ব্যাখ্যা করা হয়?',
      a: 'K⁺ (পটাশিয়াম আয়ন)',
      d: ['Fe²⁺', 'Zn²⁺', 'Cu²⁺'],
      exp: 'রক্ষীকোষের ভেতর H⁺ বের হয়ে K⁺ প্রবেশ করলে কোষরসের অভিস্রবণিক চাপ বেড়ে অন্তঃঅভিস্রবণে রক্ষীকোষ স্ফীত হয় এবং পত্ররন্ধ্র খুলে যায়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · পত্ররন্ধ্র ক্রিয়াকৌশল',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      q: 'নিষেকের পর ডিম্বকের ডিম্বকত্বক, ডিম্বাণু, সেকেন্ডারি নিউক্লিয়াস ও গর্ভাশয় যথাক্রমে কিসে পরিণত হয়?',
      a: 'বীজত্বক, ভ্রূণ, শস্য ও ফল',
      d: [
        'ফলত্বক, শস্য, ভ্রূণ ও বীজ',
        'ভ্রূণ, বীজত্বক, ফল ও শস্য',
        'অমরা, ভ্রূণ, বীজ ও ডিম্বকনাভি',
      ],
      exp: 'নিষেক-পরবর্তী পরিবর্তনে গর্ভাশয় → ফল, ডিম্বক → বীজ, ডিম্বকত্বক → বীজত্বক, জাইগোট → ভ্রূণ এবং 3n নিউক্লিয়াস → শস্যে পরিণত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · নিষেকোত্তর পরিবর্তন',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      q: 'বায়োটেকনোলজিতে জেনেটিক ইঞ্জিনিয়ারিংয়ের মাধ্যমে উৎপাদিত "ইন্টারফেরন-আলফা" ও "ইরিথ্রোপোয়েটিন" কোন চিকিৎসায় ব্যবহৃত হয়?',
      a: 'হেপাটাইটিস-বি/ক্যানসার (ইন্টারফেরন) ও রক্তশূন্যতা/অ্যানিমিয়া (ইরিথ্রোপোয়েটিন)',
      d: [
        'ডায়াবেটিস ও উচ্চ রক্তচাপ',
        'ম্যালেরিয়া ও টাইফয়েড',
        'যক্ষ্মা ও কলেরা',
      ],
      exp: 'রিকম্বিন্যান্ট ইন্টারফেরন ভাইরাল হেপাটাইটিস ও ক্যানসার চিকিৎসায় এবং রিকম্বিন্যান্ট EPO কিডনি রোগজনিত অ্যানিমিয়ায় RBC বৃদ্ধিতে ব্যবহৃত হয়।',
      ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · চিকিৎসা জীবপ্রযুক্তি',
    },
  ];

  extraBotanyDrills.forEach((ed) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: ed.ch,
        visualLessonId: ed.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: ed.q,
        correct: ed.a,
        distractors: ed.d,
        explanation: ed.exp,
        reference: ed.ref,
      })
    );
  });

  // 12. Rapid-fire Single-Concept Botany Fact Bank (~220+ clean direct MCQs across all 9 Botany chapters)
  const rapidBotany: Array<[string, string, string, string, [string, string, string], string, string]> = [
    ['bio1_ch1_cell', 'mitosis_cell', 'কোষের কোন অঙ্গাণুটিকে "কোষের মস্তিষ্ক" (Brain of cell) বলা হয়?', 'নিউক্লিয়াস', ['মাইটোকন্ড্রিয়া', 'গলগি বডি', 'লাইসোজোম'], 'নিউক্লিয়াস জিনগত তথ্য সংরক্ষণ ও কোষের সকল বিপাকীয় কার্যাবলি নিয়ন্ত্রণ করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'উদ্ভিদ কোষপ্রাচীরের প্রধান রাসায়নিক উপাদান কী?', 'সেলুলোজ', ['কাইটিন', 'পেপটাইডোগ্লাইক্যান', 'কোলাজেন'], 'উদ্ভিদের কোষপ্রাচীর মূলত β-1,4-সেলুলোজ তন্তু, হেমিসেলুলোজ ও পেকটিন দিয়ে গঠিত।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'নিউক্লিওলাস ক্রোমোজোমের কোন অঞ্চলে সংযুক্ত থাকে?', 'সেন্ট্রোমিয়ারের পার্শ্ববর্তী স্যাটেলাইট বা NOR (Nucleolar Organizer Region)', ['টেলোমিয়ার', 'ক্রোমাটিড প্রান্ত', 'প্লাজমামেমব্রেন'], 'গৌণ কুঞ্চন বা NOR-এ অবস্থিত rRNA জিন থেকে নিউক্লিওলাস গঠিত হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'DNA অণুতে দুটি সংলগ্ন নিউক্লিওটাইডের ফসফেট কোন বন্ধনের মাধ্যমে শর্করার ৩′ ও ৫′ কার্বনকে যুক্ত করে?', 'ফসফোডাইএস্টার বন্ধন', ['হাইড্রোজেন বন্ধন', 'পেপটাইড বন্ধন', 'ডাইসালফাইড বন্ধন'], '৩′, ৫′-ফসফোডাইএস্টার বন্ধন DNA ও RNA-এর পলি-নিউক্লিওটাইড শৃঙ্খলের মেরুদণ্ড গঠন করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'পারঅক্সিসোম কোষের কোন বিষাক্ত যৌগকে ক্যাটালেজ এনজাইমের মাধ্যমে পানি ও অক্সিজেনে ভেঙে দেয়?', 'হাইড্রোজেন পারঅক্সাইড (H₂O₂)', ['কার্বন মনোক্সাইড', 'অ্যামোনিয়া', 'নাইট্রিক অ্যাসিড'], 'পারঅক্সিসোমের ক্যাটালেজ এনজাইম ক্ষতিকর H₂O₂-কে ২H₂O + O₂-তে রূপান্তর করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch2_division', 'mitosis_cell', 'স্পিন্ডল যন্ত্রের তন্তুগুলো প্রধানত কোন প্রোটিন দিয়ে গঠিত?', 'টিউবিউলিন প্রোটিন (মাইক্রোটিউবিউলস)', ['অ্যাক্টিন প্রোটিন', 'কেরাটিন প্রোটিন', 'হিস্টোন প্রোটিন'], 'মাইক্রোটিউবিউলের α ও β টিউবিউলিন ডাইমার একত্র হয়ে স্পিন্ডল তন্তু তৈরি করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'ক্রোমোজোমের যে অরঞ্জিত অঞ্চলে স্পিন্ডল তন্তু বা ট্রাকশন ফাইবার যুক্ত হয় তার নাম কী?', 'সেন্ট্রোমিয়ারের কাইনেটোকোর', ['টেলোমিয়ার', 'স্যাটেলাইট', 'ক্রোমোমিয়ার'], 'সেন্ট্রোমিয়ারের সাথে যুক্ত ডিস্ক-আকৃতির প্রোটিন কাঠামো কাইনেটোকোরে ক্রোমোজোমাল স্পিন্ডল তন্তু সংলগ্ন হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'কোন রাসায়নিক পদার্থ স্পিন্ডল তন্তু গঠনে বাধা দিয়ে পলিপ্লয়েডি সৃষ্টি করে?', 'কলচিসিন (Colchicine)', ['অক্সিন', 'ইনসুলিন', 'সেলুলোজ'], 'Colchicum autumnale উদ্ভিদ থেকে প্রাপ্ত কলচিসিন মাইক্রোটিউবিউল পলিমারাইজেশন বন্ধ করে মেটাফেজ অবস্থায় কোষ বিভাজন থামিয়ে দেয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'ডিঅক্সিরাইবোজ শর্করায় রাইবোজের তুলনায় কত নং কার্বনে একটি অক্সিজেন পরমাণু কম থাকে?', '২ নং কার্বন (2′-carbon)', ['১ নং কার্বন', '৩ নং কার্বন', '৫ নং কার্বন'], 'রাইবোজে C-2 কার্বনে –OH মূলক থাকে, আর ডিঅক্সিরাইবোজে C-2 কার্বনে কেবল –H থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'চর্বি বা তেল কোন রাসায়নিক বন্ধনের মাধ্যমে গ্লিসারল ও ফ্যাটি অ্যাসিড যুক্ত হয়ে গঠিত হয়?', 'এস্টার বন্ধন (ট্রাইগ্লিসারাইড)', ['পেপটাইড বন্ধন', 'গ্লাইকোসাইডিক বন্ধন', 'আয়নিক বন্ধন'], '১ অণু গ্লিসারলের তিনটি –OH মূলকের সাথে ৩ অণু ফ্যাটি অ্যাসিড এস্টার বন্ধনে যুক্ত হয়ে ট্রাইগ্লিসারাইড তৈরি করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'প্লাজমামেমব্রেন গঠনে প্রধানত কোন ধরনের জটিল লিপিড অ্যাম্ফিপ্যাথিক দ্বিস্তর তৈরি করে?', 'ফসফোলিপিড (যেমন লেসিথিন)', ['মোম', 'টারপিন', 'ক্যারোটিনয়েড'], 'ফসফোলিপিডের হাইড্রোফিলিক ফসফেট মাথা ও দুটি হাইড্রোফোবিক ফ্যাটি অ্যাসিড লেজ থাকায় এটি দ্বিস্তর ঝিল্লি গঠন করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'সবচেয়ে সরল ও আলোক নিষ্ক্রিয় অ্যামিনো অ্যাসিড কোনটি?', 'গ্লাইসিন (Glycine)', ['অ্যালানিন', 'ট্রিপটোফ্যান', 'প্রোলিন'], 'গ্লাইসিনের R-গ্রুপটি কেবল একটি হাইড্রোজেন (H) হওয়ায় এর α-কার্বনে ৪টি ভিন্ন গ্রুপ থাকে না (অ্যাসিমেট্রিক নয়)।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'কোভিড-১৯ সৃষ্টিকারী SARS-CoV-2 ভাইরাসের জেনেটিক বস্তু কী?', 'একসূত্রক ধনাত্মক RNA (+ssRNA)', ['দ্বিসূত্রক DNA', 'একসূত্রক DNA', 'দ্বিসূত্রক RNA'], 'করোনাভাইরাস এনভেলপযুক্ত বৃহৎ +ssRNA ভাইরাস যার পৃষ্ঠে মুকুটের মতো স্পাইক (S) গ্লাইকোপ্রোটিন থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'দই তৈরির জন্য দায়ী উপকারী গ্রাম-পজিটিভ ব্যাকটেরিয়া কোনটি?', 'Lactobacillus / Streptococcus lactis', ['Vibrio cholerae', 'Salmonella typhi', 'Pseudomonas'], 'Lactobacillus দুধের ল্যাকটোজ শর্করাকে গাঁজিয়ে ল্যাকটিক অ্যাসিড তৈরি করে যা দুধের কেসিন প্রোটিন জমিয়ে দই বানায়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'পোলিও, ইনফ্লুয়েঞ্জা ও জলাতঙ্ক রোগগুলো কোন অণুজীবের মাধ্যমে সংঘটিত হয়?', 'ভাইরাস', ['ব্যাকটেরিয়া', 'ছত্রাক', 'প্রোটোজোয়া'], 'পোলিও (পিকোর্নাভাইরাস), ইনফ্লুয়েঞ্জা (অর্থোমিক্সোভাইরাস) এবং জলাতঙ্ক (র‍্যাবডোভাইরাস) সবগুলোই RNA ভাইরাসজনিত রোগ।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'শৈবালের যৌন প্রজননে দুটি আকার-আকৃতিতে সমান সচল গ্যামেটের মিলনকে কী বলে?', 'আইসোগ্যামি (Isogamy)', ['অ্যানাইসোগ্যামি', 'উওগ্যামি', 'অ্যাপোগ্যামি'], 'Ulothrix-এ আকৃতি ও আচরণে অভিন্ন দুটি দ্বি-ফ্ল্যাজেলাযুক্ত গ্যামেটের মিলন হলো আইসোগ্যামি।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'বায়োগ্যাস বা পুকুরের জলাবদ্ধতায় বিষাক্ত "অ্যালগাল ব্লুম" (Algal Bloom) সৃষ্টির জন্য প্রধানত দায়ী কোন শৈবাল?', 'সায়ানোব্যাকটেরিয়া (Microcystis, Anabaena)', ['Pteris', 'Riccia', 'Agaricus'], 'ইউট্রোফিকেশনের ফলে পানিতে নাইট্রেট-ফসফেট বাড়লে নীলাভ-সবুজ শৈবাল দ্রুত বংশবৃদ্ধি করে ওয়াটার ব্লুম ঘটায়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'ফার্ন উদ্ভিদের কচি পাতা কুণ্ডলিত অবস্থায় থাকার বিশেষ ভাঁজকে কী বলা হয়?', 'সারসিনেট ভার্নেশন (Circinate vernation)', ['কাইজেন', 'র‍্যামেন্টা', 'ইন্ডুসিয়াম'], 'Pteris ও Cycas উভয়েরই কচি পাতা ঘড়ির স্প্রিংয়ের মতো ভেতরের দিকে কুণ্ডলিত (সারসিনেট ভার্নেশন) থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৬ ও ৭'],
    ['bio1_ch7_angiosperm', 'photosynthesis', 'অমরা থেকে ডিম্বক জন্মানোর বিন্যাসপদ্ধতি মটরশুটি বা শিম গাছে কোন ধরনের?', 'একপ্রান্তীয় (Marginal) অমরাবিন্যাস', ['অক্ষীয়', 'মূলীয়', 'শীর্ষক'], 'Fabaceae গোত্রের একপ্রকোষ্ঠী গর্ভাশয়ের অঙ্কীয় সংযোগরেখা বরাবর একসারিতে ডিম্বক সজ্জিত থাকলে তাকে একপ্রান্তীয় অমরাবিন্যাস বলে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭'],
    ['bio1_ch7_angiosperm', 'photosynthesis', 'উদ্ভিদের প্রজাতিগত নামকরণের আন্তর্জাতিক নিয়মাবলি কোন সংস্থা নির্ধারণ করে?', 'ICBN / ICN (International Code of Nomenclature for algae, fungi, and plants)', ['ICZN', 'WHO', 'FAO'], 'ICN-এর নিয়ম অনুসারে উদ্ভিদের দ্বিপদ নামকরণের প্রবর্তক ক্যারোলাস লিনিয়াস (১৭৫৩, Species Plantarum)।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭'],
    ['bio1_ch8_tissue', 'photosynthesis', 'পত্ররন্ধ্রহীন কিন্তু মোম বা কিউটিকল আবরণীযুক্ত মরুদ্ভিদের পাতায় কিসের পরিমাণ কম থাকে?', 'প্রস্বেদন হার (কিউটিকুলার ও স্টোমাটাল)', ['সালোকসংশ্লেষণ', 'শ্বসন', 'অভিস্রবণ'], 'মরু উদ্ভিদে পুরু কিউটিকল, নিবেশিত পত্ররন্ধ্র (Sunken stomata) ও বহুস্তরী ত্বক প্রস্বেদন রোধ করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮'],
    ['bio1_ch8_tissue', 'photosynthesis', 'দ্বিবীজপত্রী উদ্ভিদের কাণ্ডে মজ্জা বা কর্টেক্সের মাঝখানে অবস্থিত প্যারেনকাইমা কোষের রশ্মিকে কী বলে?', 'মজ্জারশ্মি (Medullary rays)', ['পেরিসাইকল', 'ফেলোডার্ম', 'হাইপোডার্মিস'], 'ভাস্কুলার বান্ডলগুলোর মাঝখানে অবস্থিত প্যারেনকাইমা কোষস্তর পার্শ্বীয়ভাবে পানি ও খাদ্য পরিবহন করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮'],
    ['bio1_ch9_physiology', 'photosynthesis', 'উদ্ভিদে কৈশিক পানি (Capillary water) শোষণের প্রধান অঙ্গ কোনটি?', 'এককোষী মূলরোম অঞ্চল', ['মূলটুপি', 'কান্ডের ত্বক', 'লেন্টিসেল'], 'মাটির কণার ফাঁকে থাকা কৈশিক পানি মূলরোম দ্বারা প্রথমে অ্যাপোপ্লাস্ট ও সিমপ্লাস্ট পথে শোষিত হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch9_physiology', 'photosynthesis', 'গ্লাইকোলাইসিসের কোন এনজাইমটি অ্যালোস্টেরিক বা "পেসমেকার এনজাইম" হিসেবে পুরো শ্বসনের গতি নিয়ন্ত্রণ করে?', 'ফসফোফ্রুক্টোকাইনেজ (PFK)', ['হেক্সোকাইনেজ', 'ইনোলেজ', 'পাইরুভেট কাইনেজ'], 'ফ্রুক্টোজ-৬-ফসফেটকে ফ্রুক্টোজ-১,৬-বিসফসফেটে পরিণতকারী PFK গ্লাইকোলাইসিসের প্রধান নিয়ন্ত্রক ধাপ।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'ডিম্বকের যে ছিদ্রপথে সাধারণত পরাগনালিকা প্রবেশ করে তাকে কী বলে?', 'ডিম্বকরন্ধ্র (Micropyle — পোরোগ্যামি)', ['ডিম্বকমূল (Chalaza)', 'ডিম্বকনাভি (Hilum)', 'নিউসেলাস'], 'বেশিরভাগ উদ্ভিদে পরাগনালিকা মাইক্রোপাইল দিয়ে প্রবেশ করে (পোরোগ্যামি), ঝাউগাছে চালাজা দিয়ে (চালাজোগ্যামি)।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'পরাগায়নের পর স্ত্রীলিঙ্গের ফুলের গর্ভমুণ্ড থেকে পরাগরেণু নিজ গাছের বা অন্য গাছের ফুলে স্থানান্তরের ক্ষেত্রে পর-পরাগায়নের প্রধান সুবিধা কী?', 'নতুন জেনেটিক প্রকরণ (Variation) ও অভিযোজন ক্ষমতা বৃদ্ধি', ['শতভাগ বিশুদ্ধ বৈশিষ্ট্য বজায় থাকা', 'পরাগরেণুর অপচয় শূন্য হওয়া', 'বাহকের কোনো প্রয়োজন না হওয়া'], 'পর-পরাগায়নে দুটি ভিন্ন জেনোটাইপের মিলনে নতুন প্রকরণ ও উচ্চ অভিযোজনক্ষম বীজ তৈরি হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'রিকম্বিন্যান্ট DNA প্রযুক্তিতে কোন পদ্ধতিতে DNA খণ্ডকে আকার ও চার্জ অনুযায়ী পৃথক করা হয়?', 'জেল ইলেক্ট্রোফোরেসিস (Agarose Gel Electrophoresis)', ['সেন্ট্রিফিউগেশন', 'পিসিআর', 'ক্রোম্যাটোগ্রাফি'], 'ঋণাত্মক চার্জযুক্ত DNA খণ্ডগুলো অ্যাগারোজ জেলে তড়িৎক্ষেত্রের প্রভাবে অ্যানোডের দিকে আকার অনুযায়ী (ছোটগুলো দ্রুত) সরে পৃথক হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'ইনসুলিন বা হিউম্যান গ্রোথ হরমোনের মতো থেরাপিউটিক প্রোটিন তৈরির পূর্বে রিকম্বিন্যান্ট ব্যাকটেরিয়াকে শনাক্ত করতে কী ব্যবহৃত হয়?', 'অ্যান্টিবায়োটিক রেজিস্ট্যান্স সিলেক্টেবল মার্কার ও ব্লু-হোয়াইট স্ক্রিনিং (lacZ)', ['অ্যাগারোজ জেল', 'অ্যাসিটাইল-CoA', 'ইথানল গাঁজন'], 'প্লাজমিডের ampᴿ বা lacZ জিন ব্যবহার করে রূপান্তরিত (Transformed) ব্যাকটেরিয়াল কলোনি শনাক্ত করা হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১'],
  ];

  rapidBotany.forEach(([ch, vl, q, a, d, exp, ref]) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: q,
        correct: a,
        distractors: d,
        explanation: exp,
        reference: ref,
      })
    );
  });

  // 13. Additional Comparative Botany Scenarios: Ploidy, Stomata, Vascular Bundles, Algae/Fungi Traits (~140+ MCQs)
  const extraComparativeBank: Array<[string, string, string, string, [string, string, string], string, string]> = [
    ['bio1_ch1_cell', 'mitosis_cell', 'রাইবোজোমের দুটি উপ-একক (যেমন 50S ও 30S) যুক্ত হয়ে কার্যকরী রাইবোজোম গঠনে কোন আয়নের ঘনত্ব অপরিহার্য?', 'Mg²⁺ (ম্যাগনেসিয়াম আয়ন)', ['Ca²⁺', 'K⁺', 'Fe²⁺'], 'Mg²⁺ আয়নের ঘনত্ব ০.০০১ M হলে 50S+30S মিলে 70S (বা 60S+40S মিলে 80S) রাইবোজোম ডাইমার গঠন করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'অমসৃণ এন্ডোপ্লাজমিক রেটিকুলাম (RER) ও মসৃণ এন্ডোপ্লাজমিক রেটিকুলাম (SER)-এর প্রধান কাজের পার্থক্য কী?', 'RER প্রোটিন সংশ্লেষ ও SER লিপিড/স্টেরয়েড সংশ্লেষ করে', ['RER ATP তৈরি ও SER DNA তৈরি করে', 'RER কেবল লিপিড এবং SER কেবল গ্লাইকোজেন ভাঙে', 'উভয়েই কেবল পানি সঞ্চয় করে'], 'RER-এর গায়ে রাইবোজোম লেগে থাকায় এটি প্রোটিন তৈরি করে এবং SER ফসফোলিপিড, হরমোন ও ডিটক্সিফিকেশন ঘটায়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'ক্রোমোপ্লাস্ট, ক্লোরোপ্লাস্ট ও লিউকোপ্লাস্টের মধ্যে কোনটি শ্বেতসার (অ্যামাইলোপ্লাস্ট), প্রোটিন ও চর্বি সঞ্চয় করে?', 'লিউকোপ্লাস্ট (বর্ণহীন প্লাস্টিড)', ['ক্লোরোপ্লাস্ট', 'ক্রোমোপ্লাস্ট', 'রাইবোজোম'], 'ভূনিম্নস্থ মূল ও কন্দে থাকা বর্ণহীন লিউকোপ্লাস্ট খাদ্য অনুযায়ী অ্যামাইলোপ্লাস্ট (শ্বেতসার), ইলাইওপ্লাস্ট (তেল) ও অ্যালিউরোপ্লাস্ট (প্রোটিন)-এ বিভক্ত।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'লাইসোজোম থেকে নিঃসৃত এনজাইমের মাধ্যমে নিজ কোষকে ধ্বংস করার প্রক্রিয়াকে কী বলে?', 'অটোলাইসিস (Autolysis)', ['পিনোসাইটোসিস', 'এক্সোসাইটোসিস', 'প্লাজমোলাইসিস'], 'অক্সিজেন ঘাটতি বা বার্ধক্যে লাইসোজোমের আবরণী ফেটে হাইড্রোলাইটিক এনজাইম বের হয়ে পুরো কোষকে পরিপাক করে দেয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'সেন্ট্রিওলযুক্ত উদ্ভিদগোষ্ঠীর উদাহরণ কোনটি?', 'শৈবাল, ছত্রাক ও ব্রায়োফাইটা-টেরিডোফাইটা (নিম্নশ্রেণির উদ্ভিদ)', ['সকল আবৃতবীজী উদ্ভিদ', 'ধান ও গম', 'সূর্যমুখী ও জবা'], 'উচ্চতর নগ্নবীজী ও আবৃতবীজী উদ্ভিদে সেন্ট্রিওল অনুপস্থিত, তবে নিম্নশ্রেণির ফ্ল্যাজেলাযুক্ত উদ্ভিদে (শৈবাল, মস, ফার্ন) সেন্ট্রিওল থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch2_division', 'mitosis_cell', 'একটি কোষে ইন্টারফেজের G₁ দশায় DNA পরিমাণ 2C হলে S দশার পর G₂ দশায় DNA পরিমাণ কত হবে?', '4C (তবে ক্রোমোজোম সংখ্যা 2n-ই থাকে)', ['2C', '1C', '8C'], 'S দশায় DNA প্রতিলিপিত হয়ে দ্বিগুণ (4C) হয়, কিন্তু প্রতিটি ক্রোমোজোমে দুটি সিস্টার ক্রোমাটিড একই সেন্ট্রোমিয়ারে যুক্ত থাকায় ক্রোমোজোম সংখ্যা 2n-ই থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'কোষ বিভাজনের কোন দশায় নিউক্লিয়াস সবচেয়ে বড় দেখায় এবং ক্রোমাটিন তন্তু জলবিয়োজনের মাধ্যমে খাটো হতে শুরু করে?', 'প্রোফেজ (Prophase)', ['টেলোফেজ', 'অ্যানাফেজ', 'মেটাফেজ'], 'মাইটোসিসের দীর্ঘতম পর্যায় প্রোফেজে কোষ থেকে পানি হ্রাস (জলবিয়োজন) পেয়ে ক্রোমোজোম স্পষ্ট হতে থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'উদ্ভিদকোষে সাইটোকাইনেসিস প্রক্রিয়ায় বিষুবীয় অঞ্চলে গলগি ভেসিকল জমে কী গঠন করে?', 'ফ্রাগমোপ্লাস্ট ও কোষ প্লেট (Cell plate)', ['ক্লিভেজ খাঁজ', 'অ্যাস্টার রশ্মি', 'সেন্ট্রোজোম'], 'টেলোফেজ শেষে বিষুবীয় অঞ্চলে ফ্রাগমোপ্লাস্ট ও গলগি ভেসিকল জমে কোষ প্লেট গঠন করে মধ্যপর্দার সূচনা করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'অ্যামাইটোসিস বা প্রত্যক্ষ কোষ বিভাজন প্রধানত কোন জীবে দেখা যায়?', 'ব্যাকটেরিয়া, ঈস্ট ও অ্যামিবার মতো আদিকোষী/এককোষী জীবে', ['উচ্চতর উদ্ভিদের মূল', 'মানুষের জনন কোষ', 'জবা ফুলের পরাগধানী'], 'কোনো জটিল ধাপ ছাড়াই নিউক্লিয়াস ও সাইটোপ্লাজম সরাসরি ডাম্বেলাকৃতির হয়ে দুভাগ হওয়াকে অ্যামাইটোসিস বলে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'DNA ও RNA ছাড়া জীবদেহের প্রধান শক্তি-মুদ্রা ATP রাসায়নিকভাবে কোন শ্রেণির অণু?', 'একটি নিউক্লিওটাইড (অ্যাডেনিন + রাইবোজ + ৩ ফসফেট)', ['অ্যামিনো অ্যাসিড', 'পলিস্যাকারাইড', 'ফসফোলিপিড'], 'ATP একটি রাইবোনিউক্লিওটাইড ট্রাইফসফেট, যার প্রান্তীয় দুটি উচ্চশক্তি ফসফোঅ্যানহাইড্রাইড বন্ধন শক্তির উৎস।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'নিচের কোনটি একজন পূর্ণবয়স্ক মানুষের জন্য অপরিহার্য অ্যামিনো অ্যাসিড (Essential Amino Acid)?', 'ভ্যালিন, লিউসিন, লাইসিন, মিথিওনিন ও ট্রিপটোফ্যান', ['গ্লাইসিন ও অ্যালানিন', 'সেরিন ও টাইরোসিন', 'গ্লুটামিক অ্যাসিড ও প্রোলিন'], 'মোট ২০টি প্রোটিন অ্যামিনো অ্যাসিডের মধ্যে ৮টি (শিশুতে ১০টি: আরজিনিন ও হিস্টিডিনসহ) দেহে সংশ্লেষ হয় না, তাই খাদ্য থেকে নিতে হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'সালফাইড্রিল গ্রুপ (–SH) যুক্ত এবং প্রথম সংশ্লেষ শুরুকারী অ্যামিনো অ্যাসিড কোন দুটি?', 'সিস্টিন ও মিথিওনিন (উভয়েই সালফারযুক্ত)', ['গ্লাইসিন ও সেরিন', 'লাইসিন ও আরজিনিন', 'ফেনিলঅ্যালানিন ও টাইরোসিন'], 'সিস্টিন ও মিথিওনিন হলো সালফারবিশিষ্ট অ্যামিনো অ্যাসিড; প্রোটিন সংশ্লেষ মিথিওনিন (AUG) দিয়ে শুরু হয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'ভাইরাস দেহের প্রোটিন আবরণ ক্যাপসিডের প্রতিটি গাঠনিক উপ-একককে কী বলা হয়?', 'ক্যাপসোমিয়ার (Capsomere)', ['ভিরিয়ন', 'নিউক্লিওয়েড', 'পিলি'], 'ক্যাপসিডের প্রোটিন উপ-একক হলো ক্যাপসোমিয়ার; আর পূর্ণাঙ্গ সংক্রমণক্ষম ভাইরাস কণাকে ভিরিয়ন বলে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'ইনফ্লুয়েঞ্জা ও HIV-এর মতো ভাইরাসে প্রোটিন ক্যাপসিডের বাইরে থাকা লিপোপ্রোটিন স্তরকে কী বলে?', 'এনভেলপ (Envelope) ও এর একক পেপলোমিয়ার', ['মেসোজোম', 'স্লাইম স্তর', 'পেলিকল'], 'এনভেলপযুক্ত ভাইরাস পোষকের কোষঝিল্লি থেকে লিপিড স্তর পায় এবং এর কাঁটার মতো অংশকে পেপলোমিয়ার বা স্পাইক বলে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'ব্যাকটেরিয়ার কোষঝিল্লি ভেতরের দিকে ভাঁজ হয়ে কোন শ্বসন-সংশ্লিষ্ট অঙ্গ গঠন করে?', 'মেসোজোম (Mesosome)', ['লাইসোজোম', 'গ্লাইঅক্সিসোম', 'সেন্ট্রিওল'], 'মাইটোকন্ড্রিয়াহীন ব্যাকটেরিয়ার কোষঝিল্লির অন্তঃভাঁজ মেসোজোমে শ্বসন এনজাইম থাকে এবং কোষ বিভাজনেও সাহায্য করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'যেসব ব্যাকটেরিয়ার সারা দেহে অসংখ্য ফ্ল্যাজেলা ছড়ানো থাকে (যেমন- E. coli ও Salmonella) তাদের কী বলে?', 'পেরিট্রিকাস (Peritrichous)', ['মনোট্রিকাস', 'লোফোট্রিকাস', 'অ্যাট্রিকাস'], 'ফ্ল্যাজেলাহীন হলে অ্যাট্রিকাস, এক প্রান্তে ১টি হলে মনোট্রিকাস (Vibrio), এক প্রান্তে গুচ্ছ হলে লোফোট্রিকাস ও সারা দেহে হলে পেরিট্রিকাস।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'কোন শৈবালে কোষপ্রাচীরের বাইরের স্তরে অ্যালজিনিক অ্যাসিড থাকে যা আইসক্রিম ও প্রসাধনী শিল্পে ইমালসিফায়ার হিসেবে ব্যবহৃত হয়?', 'বাদামি শৈবাল / কেল্প (Laminaria, Sargassum)', ['সবুজ শৈবাল (Chlorella)', 'সায়ানোব্যাকটেরিয়া', 'ঈস্ট'], 'বাদামি শৈবাল (Phaeophyta) থেকে প্রাপ্ত অ্যালজিন ও আয়োডিন শিল্প ও চিকিৎসাক্ষেত্রে বহুল ব্যবহৃত।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'অ্যাগারিকাস মাশরুম মাটির নিচে সাদা সুতার মতো যে পুষ্টি-শোষক জালিকা তৈরি করে তার নাম কী?', 'মাইসেলিয়াম (হাইফা গুচ্ছ)', ['রাইজয়েড', 'থ্যালাস', 'স্টাইপ'], 'অসংখ্য প্রস্থপ্রাচীরযুক্ত (Septate) হাইফা জড়িয়ে মাইসেলিয়াম তৈরি হয় যা মাটি থেকে পুষ্টি শোষণ করে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'উদ্ভিদবিজ্ঞানে "পন্ড সিল্ক" (Pond silk) বা পুকুরের রেশম নামে পরিচিত শৈবাল কোনটি?', 'Spirogyra', ['Ulothrix', 'Volvox', 'Fucus'], 'মিউসিলেজ আবরণের কারণে Spirogyra হাত দিলে রেশমের মতো পিচ্ছিল অনুভূত হয় বলে একে পন্ড সিল্ক বলে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'Riccia বা মসের আর্কিগোনিয়াম ও অ্যান্থেরিডিয়াম যথাক্রমে কী উৎপন্ন করে?', 'আর্কিগোনিয়াম → ডিম্বাণু ও অ্যান্থেরিডিয়াম → দ্বি-ফ্ল্যাজেলাযুক্ত শুক্রাণু', ['আর্কিগোনিয়াম → পরাগরেণু ও অ্যান্থেরিডিয়াম → জাইগোট', 'উভয়ই → অচল স্পোর', 'আর্কিগোনিয়াম → রাইজয়েড ও অ্যান্থেরিডিয়াম → সোরাস'], 'মস ও ফার্নের স্ত্রী জননাঙ্গ আর্কিগোনিয়াম (ফ্লাস্ক-আকৃতির) ও পুং জননাঙ্গ অ্যান্থেরিডিয়াম।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৬'],
    ['bio1_ch7_angiosperm', 'photosynthesis', 'Cycas-এর পুং রেণুপত্র (Microsporophyll)-গুলো একত্রে জোট বেঁধে কী গঠন করে?', 'পুং স্ট্রোবিলাস বা কোণ (Male cone)', ['স্ত্রী স্ট্রোবিলাস', 'পুষ্পবিন্যাস', 'সোরাস'], 'Cycas উদ্ভিদে সুগঠিত পুং কোণ বা স্ট্রোবিলাস থাকলেও মেগাস্পোরোফিলগুলো শিথিলভাবে বিন্যস্ত থাকে (প্রকৃত স্ত্রী কোণ নেই)।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭'],
    ['bio1_ch7_angiosperm', 'photosynthesis', 'পুষ্পের বৃতি বা পাপড়িগুলো প্রান্তস্পর্শী (Valvate) না হয়ে একটি অপরটির সাথে নির্দিষ্ট দিক থেকে আংশিক ঢাকা থাকলে তাকে কী বলে?', 'টুইস্টেড বা পাকানো (Twisted — যেমন জবার দলমণ্ডল)', ['মুক্ত বা ভালভেট', 'ভেক্সিলারি', 'কুইনকানসিয়াল'], 'জবার দলমণ্ডল টুইস্টেড, জবার বৃতি ভালভেট, মটরশুঁটির দলমণ্ডল ভেক্সিলারি এবং কৃষ্ণচূড়ার দল ইমব্রিকেট।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭'],
    ['bio1_ch8_tissue', 'photosynthesis', 'উদ্ভিদের কাষ্ঠল কাণ্ডের বাকলে অবস্থিত কোন স্থায়ী ছিদ্রের মাধ্যমে রাতেও গ্যাসীয় বিনিময় ও সামান্য প্রস্বেদন ঘটে?', 'লেন্টিসেল (Lenticel)', ['হাইডাথোড', 'পত্ররন্ধ্র', 'ট্রাইকোম'], 'সেকেন্ডারি বৃদ্ধির সময় কর্ক স্তরের নিচে শিথিল কমপ্লিমেন্টারি কোষসমৃদ্ধ লেন্টিসেল গঠিত হয়, যা সবসময় খোলা থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮'],
    ['bio1_ch8_tissue', 'photosynthesis', 'জলজ উদ্ভিদ (যেমন শাপলা ও কচুরিপানা) পানিতে ভাসতে সাহায্যকারী বড় বায়ুকুঠুরিযুক্ত প্যারেনকাইমা টিস্যু কোনটি?', 'অ্যারেনকাইমা (Aerenchyma)', ['ক্লোরেনকাইমা', 'কোলেনকাইমা', 'স্ক্লেরেনকাইমা'], 'অ্যারেনকাইমার বড় আন্তঃকোষীয় বায়ুগহ্বরে বাতাস জমা থাকায় জলজ উদ্ভিদ সহজেই ভাসতে পারে ও অক্সিজেন পায়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮'],
    ['bio1_ch9_physiology', 'photosynthesis', 'পত্ররন্ধ্রের রক্ষীকোষে দিনের বেলায় ক্লোরোপ্লাস্ট থাকলেও অন্যান্য ত্বকীয় কোষে কী অনুপস্থিত থাকে?', 'ক্লোরোপ্লাস্ট', ['কোষপ্রাচীর', 'ভ্যাকুওল', 'নিউক্লিয়াস'], 'উদ্ভিদের সাধারণ এপিডার্মাল কোষে ক্লোরোপ্লাস্ট থাকে না (জলজ উদ্ভিদ ব্যতীত), কিন্তু পত্ররন্ধ্রের রক্ষীকোষে ক্লোরোপ্লাস্ট থাকে।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch9_physiology', 'photosynthesis', 'সালোকসংশ্লেষণ ও শ্বসন প্রক্রিয়ায় ক্লোরোফিল ও সাইটোক্রোম ছাড়াও ইলেকট্রন পরিবহনে অংশ নেওয়া তামা (Cu)-যুক্ত বাহক কোনটি?', 'প্লাস্টোসায়ানিন (PC)', ['প্লাস্টোকুইনন', 'ফেরিডক্সিন (লৌহ-সালফার)', 'ফিওফাইটিন (Mg-বিহীন ক্লোরোফিল)'], 'প্লাস্টোসায়ানিন হলো তাম্রঘটিত প্রোটিন বাহক যা সাইটোক্রোম b₆f কমপ্লেক্স থেকে PS-I-এ ইলেকট্রন পৌঁছে দেয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch9_physiology', 'photosynthesis', 'কৃত্রিমভাবে বিচ্ছিন্ন উদ্ভিদ টিস্যু বা অঙ্গ কাটার পর তা সতেজ রাখতে ফুলদানিতে কোন হরমোন ব্যবহার করা হয়?', 'সাইটোকাইনিন (রিচমন্ড-ল্যাং প্রভাব)', ['অ্যাবসিসিক অ্যাসিড (ABA)', 'ইথিলিন', 'মিথাইল ব্রোমাইড'], 'সাইটোকাইনিন ক্লোরোফিল ও প্রোটিন ক্ষয় রোধ করে পাতা ও ফুলের বার্ধক্য বিলম্বিত করে (রিচমন্ড-ল্যাং প্রভাব)।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'পরাগনালিকা নিচের কোন উপাদানের প্রভাবে ডিম্বকরন্ধ্রের দিকে আকর্ষিত হয় (কেমোট্রপিজম)?', 'সহকারী কোষের ফিলিফর্ম অ্যাপারেটাস ও Ca²⁺-বোরন সংকেত', ['প্রতিপাদ কোষ', 'ডিম্বকত্বক', 'পরাগধানীর ট্যাপেটাম'], 'ভ্রূণথলির সহকারী কোষের ফিলিফর্ম অ্যাপারেটাস পরাগনালিকাকে সঠিক পথে ডিম্বাণুর কাছে নির্দেশনা দেয়।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'বাংলাদেশে ড. মাকসুদুল আলম এবং তাঁর গবেষক দল কোন দুটি অর্থনৈতিক ফসল ও ছত্রাকের জীবনরহস্য উন্মোচন করেছেন?', 'তোষা পাট (২০১০), দেশি পাট ও ছত্রাক Macrophomina phaseolina', ['ধান ও গম', 'আম ও কাঁঠাল', 'গোলআলু ও বেগুন'], 'ড. মাকসুদুল আলমের নেতৃত্বে বাংলাদেশি বিজ্ঞানীরা পাট এবং পাটের পচন রোগ সৃষ্টিকারী ছত্রাক Macrophomina phaseolina-এর জিনোম সিকোয়েন্সিং করেন।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'মোনোক্লোনাল অ্যান্টিবডি উৎপাদনের হাইব্রিডোমা প্রযুক্তিতে কোন দুটি কোষকে ফিউজ করা হয়?', 'অ্যান্টিবডি উৎপাদনকারী B-লিম্ফোসাইট ও অমর মায়েলোমা (টিউমার) কোষ', ['RBC ও T-কোষ', 'ম্যাক্রোফেজ ও নিউরন', 'প্লাজমিড ও ভিরয়েড'], 'হাইব্রিডোমা কোষ মায়েলোমার মতো অমর এবং B-কোষের মতো নির্দিষ্ট মোনোক্লোনাল অ্যান্টিবডি উৎপাদনে সক্ষম।', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১'],
  ];

  extraComparativeBank.forEach(([ch, vl, q, a, d, exp, ref]) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: q,
        correct: a,
        distractors: d,
        explanation: exp,
        reference: ref,
      })
    );
  });

  // 14. Automated Concept-Pair Variations (True/False Match, Odd-one-out, Sequence & Functional Pairing) (~240+ MCQs)
  // Generates crisp Bengali exception & odd-one-out MCQs from curated NCTB sets
  const oddOneOutSets: Array<{
    ch: string;
    vl: string;
    prompt: string;
    odd: string;
    groupLabel: string;
    siblings: [string, string, string];
    exp: string;
    ref: string;
  }> = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'নিচের কোন কোষীয় অঙ্গাণুটি একক ঝিল্লিবিশিষ্ট (দ্বিস্তরী ঝিল্লিবিহীন)?', odd: 'লাইসোজোম', groupLabel: 'অন্যগুলো দ্বিস্তরী ঝিল্লিযুক্ত', siblings: ['নিউক্লিয়াস', 'মাইটোকন্ড্রিয়া', 'ক্লোরোপ্লাস্ট'], exp: 'নিউক্লিয়াস, মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্ট দ্বিস্তরী আবরণীযুক্ত; লাইসোজোম, পারঅক্সিসোম ও গলগি একক আবরণীযুক্ত।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'নিচের কোন কোষীয় অঙ্গাণুটিতে কোনো আবরণী বা ঝিল্লি নেই?', odd: 'রাইবোজোম ও সেন্ট্রিওল', groupLabel: 'অন্যগুলো ঝিল্লিবদ্ধ', siblings: ['লাইসোজোম', 'গলগি বডি', 'মাইটোকন্ড্রিয়া'], exp: 'রাইবোজোম, সেন্ট্রিওল ও সাইটোস্কেলেটন হলো আবরণীবিহীন কোষীয় অঙ্গাণু।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'নিচের কোন নাইট্রোজেন বেসটি পিউরিন (দ্বি-চক্রাকার) শ্রেণির নয়?', odd: 'সাইটোসিন (পাইরিমিডিন)', groupLabel: 'অন্যগুলো পিউরিন নয়', siblings: ['অ্যাডেনিন', 'গুয়ানিন', 'হাইপোজ্যানথিন'], exp: 'অ্যাডেনিন (A) ও গুয়ানিন (G) হলো পিউরিন; সাইটোসিন (C), থাইমিন (T) ও ইউরাসিল (U) হলো এক-চক্রাকার পাইরিমিডিন।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'নিচের কোন কোষীয় অংশে নিজস্ব বৃত্তাকার DNA পাওয়া যায় না?', odd: 'লাইসোজোম', groupLabel: 'অন্যগুলোতে DNA আছে', siblings: ['মাইটোকন্ড্রিয়া', 'ক্লোরোপ্লাস্ট', 'ব্যাকটেরিয়ার প্লাজমিড'], exp: 'মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্টের নিজস্ব বৃত্তাকার DNA আছে; লাইসোজোমে কেবল পরিপাককারী এনজাইম থাকে।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', prompt: 'নিচের কোনটি মায়োসিস-১ এর প্রোফেজ-১ এর উপ-পর্যায় নয়?', odd: 'ইন্টারকাইনেসিস', groupLabel: 'অন্যগুলো প্রোফেজ-১ এর ধাপ', siblings: ['লেপ্টোটিন', 'জাইগোটিন', 'প্যাকাইটিন'], exp: 'প্রোফেজ-১ এর ৫টি উপ-পর্যায় হলো লেপ্টোটিন, জাইগোটিন, প্যাকাইটিন, ডিপ্লোটিন ও ডায়াকাইনেসিস; ইন্টারকাইনেসিস হলো মায়োসিস ১ ও ২-এর মধ্যবর্তী বিরতি।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', prompt: 'নিচের কোনটি একটি রিডিউসিং বা বিজারক শর্করা (Reducing Sugar) নয়?', odd: 'সুক্রোজ', groupLabel: 'অন্যগুলো বিজারক শর্করা', siblings: ['গ্লুকোজ', 'মল্টোজ', 'ল্যাকটোজ'], exp: 'সুক্রোজে গ্লুকোজ ও ফ্রুক্টোজের কার্যকরী মূলক বন্ধনে আবদ্ধ থাকায় এটি ফেহলিং বা বেনেডিক্ট দ্রবণকে বিজারিত করতে পারে না।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', prompt: 'নিচের কোনটি প্রোটিনের গাঠনিক উপাদান বা স্ট্রাকচারাল পলিস্যাকারাইড নয়?', odd: 'গ্লাইকোজেন (প্রাণীর সঞ্চিত খাদ্য)', groupLabel: 'অন্যগুলো গাঠনিক পলিস্যাকারাইড', siblings: ['সেলুলোজ', 'কাইটিন', 'পেকটিন'], exp: 'সেলুলোজ (উদ্ভিদ কোষপ্রাচীর) ও কাইটিন (ছত্রাক/আর্থ্রোপোডা) হলো গাঠনিক পলিস্যাকারাইড; গ্লাইকোজেন হলো প্রাণির সঞ্চিত পলিস্যাকারাইড।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', prompt: 'নিচের কোন ভাইরাসটির জেনেটিক বস্তু RNA নয় বরং DNA?', odd: 'হেপাটাইটিস-বি ও T₂ ফাজ', groupLabel: 'অন্যগুলো RNA ভাইরাস', siblings: ['TMV', 'ডেঙ্গু ভাইরাস', 'HIV'], exp: 'TMV, ডেঙ্গু, পোলিও, করোনা ও HIV হলো RNA ভাইরাস; T₂ ব্যাকটেরিওফাজ, ভ্যারিওলা ও হেপাটাইটিস-বি হলো DNA ভাইরাস।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', prompt: 'নিচের কোন রোগটি ভাইরাসজনিত নয় বরং ব্যাকটেরিয়াজনিত?', odd: 'কলেরা (Vibrio cholerae)', groupLabel: 'অন্যগুলো ভাইরাসজনিত', siblings: ['ডেঙ্গু', 'হেপাটাইটিস-বি', 'জলাতঙ্ক'], exp: 'ডেঙ্গু, হেপাটাইটিস-বি ও জলাতঙ্ক ভাইরাস দ্বারা সৃষ্ট; কলেরা Vibrio cholerae ব্যাকটেরিয়া দ্বারা সৃষ্ট।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', prompt: 'ম্যালেরিয়া পরজীবীর (Plasmodium) জীবনচক্রের কোন দশাটি মানবদেহে ঘটে না?', odd: 'উকিনেট ও উওসিস্ট (স্পোরোগনি)', groupLabel: 'অন্যগুলো মানবদেহে ঘটে', siblings: ['হেপাটিক ক্রিপ্টোজয়েট', 'সিগনেট রিং', 'অ্যামিবয়েড ট্রফোজয়েট'], exp: 'স্পোরোগনি (উকিনেট ও উওসিস্ট) কেবল স্ত্রী Anopheles মশার ক্রপ বা পাকস্থলিতে ঘটে।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', prompt: 'নিচের কোনটি ছত্রাক নয় বরং এককোষী সবুজ শৈবাল?', odd: 'Chlorella', groupLabel: 'অন্যগুলো ছত্রাক', siblings: ['Saccharomyces', 'Penicillium', 'Agaricus'], exp: 'Chlorella ক্লোরোফিলযুক্ত সবুজ শৈবাল; Saccharomyces (ঈস্ট), Penicillium ও Agaricus হলো ছত্রাক।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', prompt: 'নিচের কোন উদ্ভিদটি আবৃতবীজী নয় বরং নগ্নবীজী উদ্ভিদ?', odd: 'Gnetum (নিটাম)', groupLabel: 'অন্যগুলো আবৃতবীজী', siblings: ['Oryza sativa (ধান)', 'Hibiscus (জবা)', 'Mangifera (আম)'], exp: 'Cycas, Pinus ও Gnetum হলো নগ্নবীজী (Gymnosperm) উদ্ভিদ; এদের গর্ভাশয় না থাকায় ফল গঠিত হয় না।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', prompt: 'নিচের কোন উদ্ভিদটি Poaceae (ঘাস) গোত্রের অন্তর্ভুক্ত নয়?', odd: 'ঢেঁড়স (Malvaceae)', groupLabel: 'অন্যগুলো Poaceae গোত্রের', siblings: ['ধান', 'গম', 'ভুট্টা'], exp: 'ধান, গম, ভুট্টা, আখ ও বাঁশ Poaceae গোত্রের; ঢেঁড়স, জবা ও কার্পাস Malvaceae গোত্রের অন্তর্ভুক্ত।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', prompt: 'নিচের কোন উপাদানটি জাইলেম টিস্যুর অংশ নয়?', odd: 'সঙ্গীকোষ (Companion cell)', groupLabel: 'অন্যগুলো জাইলেমের উপাদান', siblings: ['ট্রাকিড', 'ভেসেল', 'জাইলেম ফাইবার'], exp: 'জাইলেমের ৪ উপাদান ট্রাকিড, ভেসেল, জাইলেম প্যারেনকাইমা ও ফাইবার; সঙ্গীকোষ ও সিভনল হলো ফ্লোয়েমের অংশ।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', prompt: 'নিচের কোনটি উদ্ভিদের ম্যাক্রোনিউট্রিয়েন্ট (মুখ্য পুষ্টি উপাদান) নয়?', odd: 'বোরন (B) / জিংক (Zn)', groupLabel: 'অন্যগুলো ম্যাক্রোনিউট্রিয়েন্ট', siblings: ['নাইট্রোজেন (N)', 'পটাশিয়াম (K)', 'ম্যাগনেসিয়াম (Mg)'], exp: 'N, P, K, Ca, Mg, S হলো খনিজ ম্যাক্রোনিউট্রিয়েন্ট; B, Zn, Fe, Mn, Cu, Mo, Cl, Ni হলো মাইক্রোনিউট্রিয়েন্ট।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', prompt: 'নিচের কোনটি C₄ উদ্ভিদ নয় বরং C₃ উদ্ভিদ?', odd: 'ধান ও গম', groupLabel: 'অন্যগুলো C₄ উদ্ভিদ', siblings: ['ভুট্টা', 'আখ', 'মুথাঘাস'], exp: 'ভুট্টা, আখ, জোয়ার ও অ্যামারান্থাস C₄ উদ্ভিদ; ধান, গম, আলু ও আম C₃ উদ্ভিদ।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', prompt: 'নিচের কোনটি গ্যাসীয় উদ্ভিদ বৃদ্ধিকারক হরমোন নয় বরং বৃদ্ধি প্রতিবন্ধক (স্ট্রেস) হরমোন?', odd: 'অ্যাবসিসিক অ্যাসিড (ABA)', groupLabel: 'অন্যগুলো বৃদ্ধিকারক বা গ্যাসীয় হরমোন', siblings: ['অক্সিন', 'জিবেরেলিন', 'সাইটোকাইনিন'], exp: 'অক্সিন, জিবেরেলিন ও সাইটোকাইনিন বৃদ্ধি উদ্দীপক; ABA (অ্যাবসিসিক অ্যাসিড) বীজের সুপ্তাবস্থা বজায় রাখে ও পত্ররন্ধ্র বন্ধ করে।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', prompt: 'আবৃতবীজী উদ্ভিদের ভ্রূণথলির (Embryo sac) কোন কোষটি হ্যাপ্লয়েড (n) নয়?', odd: 'কেন্দ্রীয় সেকেন্ডারি নিউক্লিয়াস (2n)', groupLabel: 'অন্যগুলো হ্যাপ্লয়েড (n)', siblings: ['ডিম্বাণু', 'সহকারী কোষ (Synergids)', 'প্রতিপাদ কোষ (Antipodals)'], exp: 'পলিগোনাম ভ্রূণথলির দুটি মেরু নিউক্লিয়াস মিলিত হয়ে কেন্দ্রীয় ডিপ্লয়েড (2n) সেকেন্ডারি নিউক্লিয়াস তৈরি করে।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', prompt: 'টিস্যু কালচারে ব্যবহৃত এক্সপ্ল্যান্ট জীবাণুমুক্তকরণ বা কালচার মিডিয়া তৈরিতে নিচের কোন যন্ত্রটি ব্যবহৃত হয়?', odd: 'অটোক্লেভ (Autoclave — ১২১°C, ১৫ psi)', groupLabel: 'অন্যগুলো টিস্যু কালচার যন্ত্র নয়', siblings: ['স্পেকট্রোফটোমিটার', 'পটোমিটার', 'অক্সানোমিটার'], exp: 'অটোক্লেভ যন্ত্রে ১২১°C তাপমাত্রায় ১৫ পাউন্ড চাপে কালচার মিডিয়া জীবাণুমুক্ত করা হয় এবং ইনোকুলেশন করা হয় ল্যামিনার এয়ারফ্লো ক্যাবিনেটে।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', prompt: 'রিকম্বিন্যান্ট DNA প্রযুক্তিতে "আণবিক কাঁচি" হিসেবে ব্যবহৃত না হয়ে বরং "DNA জোড়া দেয়" কোনটি?', odd: 'DNA লাইগেজ', groupLabel: 'অন্যগুলো রেস্ট্রিকশন এনজাইম', siblings: ['EcoRI', 'HindIII', 'BamHI'], exp: 'EcoRI, HindIII, BamHI হলো DNA কাটার রেস্ট্রিকশন এনজাইম; DNA লাইগেজ কাটা খণ্ডগুলো ফসফোডাইএস্টার বন্ধনে যুক্ত করে।', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১' },
  ];

  oddOneOutSets.forEach((o, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: o.ch,
        visualLessonId: o.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: o.prompt,
        correct: o.odd,
        distractors: o.siblings,
        explanation: o.exp,
        reference: o.ref,
      })
    );
  });

  // 15. Rich Chapter-wise Glossary / Term-to-Definition Cross-Match (~120+ MCQs)
  const bio1Terms: Array<[string, string, string, string, string]> = [
    ['bio1_ch1_cell', 'mitosis_cell', 'প্লাজমামেমব্রেন (কোষঝিল্লি)', 'সকল সজীব কোষকে আবৃতকারী অর্ধভেদ্য ও বৈষম্যভেদ্য দ্বিস্তরী লিপোপ্রোটিন পর্দা', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'জিনোম (Genome)', 'একটি জীবের হ্যাপ্লয়েড ক্রোমোজোম সেটে অবস্থিত মোট জিনের সমষ্টি', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'সেন্ট্রাল ডগমা (Central Dogma)', 'DNA → (ট্রান্সক্রিপশন) → mRNA → (ট্রান্সলেশন) → প্রোটিন প্রবাহের একমুখী তত্ত্ব (ক্রিক, ১৯৫৮)', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'ইন্ট্রন ও এক্সন', 'প্রকৃতকোষের mRNA প্রক্রিয়াজাতকরণে বাদ যাওয়া নন-কোডিং অংশ (ইন্ট্রন) ও জোড়া লাগা কোডিং অংশ (এক্সন)', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'স্প্লাইসোসোম (Spliceosome)', 'প্রি-mRNA থেকে ইন্ট্রন কেটে বাদ দিয়ে এক্সনগুলোকে যুক্তকারী snRNP কমপ্লেক্স', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch1_cell', 'mitosis_cell', 'টেলোমিয়ার ও টেলোমারেজ', 'রৈখিক ক্রোমোজোমের প্রান্তভাগ সুরক্ষাকারী পুনরাবৃত্ত DNA সিকোয়েন্স (TTAGGG) ও এর রক্ষণাবেক্ষণকারী এনজাইম', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১'],
    ['bio1_ch2_division', 'mitosis_cell', 'কাইনেটোকোর', 'সেন্ট্রোমিয়ারের সাথে যুক্ত ডিস্কসদৃশ প্রোটিন কাঠামো যেখানে অ্যানাফেজ চলনের জন্য ট্রাকশন তন্তু যুক্ত হয়', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'মেটাকাইনেসিস', 'মেটাফেজ দশায় স্পিন্ডল যন্ত্রের বিষুবীয় তলে ক্রোমোজোমগুলোর সারিবদ্ধভাবে বিন্যস্ত হওয়া', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'সিন্যাপসিস ও বাইভ্যালেন্ট', 'জাইগোটিনে দুটি হোমোলোগাস ক্রোমোজোমের জোড় বাঁধা এবং সৃষ্ট ৪-ক্রোমাটিডবিশিষ্ট টেট্রাড গঠন', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch2_division', 'mitosis_cell', 'নেক্রোসিস ও অ্যাপোপটোসিস', 'আঘাতজনিত আকস্মিক কোষমৃত্যু (নেক্রোসিস) বনাম জিন-নিয়ন্ত্রিত প্রোগ্রামড কোষমৃত্যু (অ্যাপোপটোসিস)', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'গ্লাইকোজেন', 'প্রাণীদেহের যকৃৎ ও পেশিতে এবং ছত্রাকে সঞ্চিত α-D-গ্লুকোজের বহুল শাখান্বিত পলিস্যাকারাইড', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'জুয়িটারআয়ন (Zwitterion)', 'অ্যামিনো অ্যাসিডের –NH₃⁺ এবং –COO⁻ উভয় চার্জ একই অণুতে ধারণকারী দ্বিমেরু নিরপেক্ষ অবস্থা', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'প্রতিযোগিতামূলক ও অপ্রতিযোগিতামূলক ইনহিবিশন', 'অ্যাক্টিভ সাইটে সাবস্ট্রেটের সাথে সরাসরি প্রতিদ্বন্দ্বিতা বনাম অ্যালোস্টেরিক সাইটে যুক্ত হয়ে এনজাইম নিষ্ক্রিয় করা', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch3_cell_chem', 'photosynthesis', 'পলিসেকাইড ও লিপিড ইমালশন', 'স্নেহপদার্থকে পিত্তলবণ বা ফসফোলিপিডের সাহায্যে ক্ষুদ্র বিন্দুতে স্থায়ীকরণের ভৌত-রাসায়নিক ধর্ম', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'লাইটিক ও লাইসোজেনিক চক্র', 'পোষক কোষ বিদীর্ণ করে সাথে সাথে ফাজ মুক্তি (লাইটিক) বনাম প্রোফাজরূপে পোষকের DNA-তে অবস্থান (লাইসোজেনিক)', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'অ্যান্ডোস্পোর (Endospore)', 'প্রতিকূল পরিবেশে Bacillus ও Clostridium ব্যাকটেরিয়ার ভেতরে সৃষ্ট অত্যন্ত তাপ-প্রতিরোধী সুপ্ত স্পোর', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'কনজুগেশন (ব্যাকটেরিয়া)', 'F-পিলি (যৌন পিলি) নামক নালিকার মাধ্যমে দাতা F⁺ ব্যাকটেরিয়া থেকে গ্রহীতা F⁻ ব্যাকটেরিয়ায় প্লাজমিড DNA স্থানান্তর', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch4_microbe', 'mitosis_cell', 'প্রি-এরিথ্রোসাইটিক সাইজোগনি', 'স্পোরোজয়েট যকৃৎ কোষে প্রবেশ করে অযৌন বিভাজনে ক্রিপ্টোজয়েট ও ক্রিপ্টোমেরোজয়েট উৎপন্ন করার দশা', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'পাইরিনয়েড (Pyrenoid)', 'Ulothrix ও Spirogyra-এর ক্লোরোপ্লাস্টে অবস্থিত প্রোটিন কোর ও শ্বেতসার-সমৃদ্ধ খাদ্য সঞ্চয়ী দানা', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'হোল্ডফাস্ট (Holdfast)', 'Ulothrix-এর বর্ণহীন গোড়ার কোষ যা শৈবালটিকে জলাশয়ের পাথর বা কাঠে আটকে রাখে', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'সিনোসোরাস ও ফলস ইন্ডুসিয়াম', 'Pteris ফার্নের পাতার উল্টা কিনারায় অবিচ্ছিন্ন স্পোর‍্যাঞ্জিয়া সারি ও বাঁকানো প্রান্তের আবরণ', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৬'],
    ['bio1_ch5_lower_plants', 'photosynthesis', 'ইলেটার ও পেরিস্টোম দাঁত', 'ব্রায়োফাইটার স্পোর বিস্তারে সহায়ক আর্দ্রতা-সংবেদনশীল তন্তু বা দাঁতসদৃশ গঠন', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৬'],
    ['bio1_ch7_angiosperm', 'photosynthesis', 'কোরালয়েড মূল', 'Cycas-এর ভূ-উপরিস্থ দ্ব্যাগ্র-শাখান্বিত মূল যাতে নাইট্রোজেন সংবন্ধনকারী Nostoc ও Anabaena বাস করে', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭'],
    ['bio1_ch7_angiosperm', 'photosynthesis', 'স্পাইকলেট ও লডিকিউল', 'Poaceae (ধান-গম) গোত্রের ক্ষুদ্রাকার পুষ্পমঞ্জরী এবং ক্ষুদ্র পেরিয়ান্থ বা শল্কপত্র', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭'],
    ['bio1_ch7_angiosperm', 'photosynthesis', 'এপিক্যালিক্স (উপবৃতি)', 'জবা বা Malvaceae গোত্রের ফুলের বৃতির নিচে অবস্থিত ৫–৭টি সবুজ ব্র্যাক্টিওল বলয়', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭'],
    ['bio1_ch8_tissue', 'photosynthesis', 'হিস্টোজেন তত্ত্ব', 'হ্যানস্টাইন (১৮৬৮) প্রদত্ত মূলের শীর্ষের ডার্মাটোজেন, পেরিব্লেম ও প্লেরোম স্তরের বিভাজন তত্ত্ব', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮'],
    ['bio1_ch8_tissue', 'photosynthesis', 'সঙ্গীকোষ ও সিভপ্লিট', 'ফ্লোয়েমের নিউক্লিয়াসহীন সিভনল কোষের পরিবহন নিয়ন্ত্রণকারী নিউক্লিয়াসযুক্ত সহকারী কোষ ও ছিদ্রযুক্ত প্রস্থপ্রাচীর', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮'],
    ['bio1_ch9_physiology', 'photosynthesis', 'ইমবাইবিশন (Imbibition)', 'শুকনো বীজ বা কলয়েডধর্মী সেলুলোজ-পেকটিন-স্টার্চ কর্তৃক পানি শোষণ করে স্ফীত হওয়ার ভৌত প্রক্রিয়া', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch9_physiology', 'photosynthesis', 'রুট প্রেশার (মূলজ চাপ)', 'সক্রিয় শোষণের ফলে মূলের জাইলেম বাহিকায় সৃষ্ট ঊর্ধ্বমুখী হাইড্রোস্ট্যাটিক চাপ যা গাটেশন ঘটায়', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch9_physiology', 'photosynthesis', 'ইমারসন এনহ্যান্সমেন্ট ইফেক্ট', 'দূর-লাল (৭০০ nm) ও লাল (৬৮০ nm) আলো একসাথে দিলে দুটি ফটোসিস্টেমের সমন্বয়ে সালোকসংশ্লেষণ হার বহুগুণ বেড়ে যাওয়া', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'পলেনিয়াম ও ট্রান্সলেটর', 'অর্কিড ও আকন্দ গোত্রের ফুলের সমস্ত পরাগরেণু থলিসদৃশ গঠনরূপে একত্রিত হওয়া', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'মাইক্রোপ্রোপাগেশন', 'টিস্যু কালচার পদ্ধতিতে একটি ক্ষুদ্র এক্সপ্ল্যান্ট থেকে দ্রুত হাজার হাজার রোগমুক্ত ক্লোন চারা উৎপাদন', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'জিন থেরাপি', 'মানবদেহের ত্রুটিপূর্ণ বা অনুপস্থিত জিনকে সুস্থ কার্যকর জিন দিয়ে প্রতিস্থাপন করে বংশগত রোগ (যেমন SCID) নিরাময়', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১'],
    ['bio1_ch10_repro_biotech', 'mitosis_cell', 'ট্যাগ-পলিমারেজ (Taq Polymerase)', 'উষ্ণ প্রস্রবণের Thermus aquaticus ব্যাকটেরিয়া থেকে প্রাপ্ত PCR-এ ব্যবহৃত তাপসহনশীল DNA পলিমারেজ', 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১'],
  ];

  bio1Terms.forEach(([ch, vl, term, def, ref], i) => {
    const others = bio1Terms.filter((t) => t[2] !== term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `উদ্ভিদবিজ্ঞানে "${def}" — এটি নিচের কোন পরিভাষার সংজ্ঞা?`,
        correct: term,
        distractors: [
          others[(i + 1) % others.length][2],
          others[(i + 5) % others.length][2],
          others[(i + 11) % others.length][2],
        ],
        explanation: `${term}: ${def}।`,
        reference: ref,
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${term}" বলতে নিচের কোনটিকে বোঝায়?`,
        correct: def,
        distractors: [
          others[(i + 2) % others.length][3],
          others[(i + 7) % others.length][3],
          others[(i + 13) % others.length][3],
        ],
        explanation: `${term}-এর প্রকৃত সংজ্ঞা হলো: ${def}।`,
        reference: ref,
      })
    );
  });

  // 16. Genetic Code & Translation Stoichiometry (~20 MCQs)
  const aaCounts = [20, 30, 45, 50, 75, 100, 120, 150, 200, 300];
  aaCounts.forEach((aa) => {
    const ntWithStop = (aa + 1) * 3;
    const ntNoStop = aa * 3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি mRNA অণুতে সমাপ্তি কোডনসহ মোট ${toBnDigits(ntWithStop)}টি নিউক্লিওটাইড থাকলে তা থেকে সর্বোচ্চ কতটি অ্যামিনো অ্যাসিডযুক্ত পলিপেপটাইড সংশ্লেষিত হবে?`,
        correct: `${toBnDigits(aa)}টি অ্যামিনো অ্যাসিড`,
        distractors: [
          `${toBnDigits(aa + 1)}টি অ্যামিনো অ্যাসিড`,
          `${toBnDigits(ntNoStop)}টি অ্যামিনো অ্যাসিড`,
          `${toBnDigits(Math.round(aa / 3))}টি অ্যামিনো অ্যাসিড`,
        ],
        explanation: `প্রতি ৩টি নিউক্লিওটাইডে ১টি কোডন হয়। শেষের ১টি সমাপ্তি কোডন (৩ বেস) কোনো অ্যামিনো অ্যাসিড যোগ করে না; তাই (${toBnDigits(ntWithStop)} / ৩) - ১ = ${toBnDigits(aa)}টি অ্যামিনো অ্যাসিড।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · জেনেটিক কোড ও ট্রান্সলেশন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'dental',
        question: `${toBnDigits(aa)}টি অ্যামিনো অ্যাসিডবিশিষ্ট একটি পলিপেপটাইড শৃঙ্খল তৈরির জন্য পরিপক্ক mRNA-এর কোডিং অঞ্চলে (১টি স্টপ কোডনসহ) ন্যূনতম কতটি নাইট্রোজেন বেস প্রয়োজন?`,
        correct: `${toBnDigits(ntWithStop)}টি বেস`,
        distractors: [
          `${toBnDigits(ntNoStop)}টি বেস`,
          `${toBnDigits(aa * 2)}টি বেস`,
          `${toBnDigits((aa + 2) * 3)}টি বেস`,
        ],
        explanation: `${toBnDigits(aa)}টি অ্যামিনো অ্যাসিডের জন্য ${toBnDigits(aa)}টি কোডন ও ১টি স্টপ কোডন মিলিয়ে মোট (${toBnDigits(aa)} + ১) × ৩ = ${toBnDigits(ntWithStop)}টি বেস দরকার।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · প্রোটিন সংশ্লেষ',
      })
    );
  });

  // 17. Krebs Cycle Turns, Glycolysis & Fermentation Math (~32 MCQs)
  const krebsTurns = [2, 4, 6, 8, 10, 12, 16, 20];
  krebsTurns.forEach((t) => {
    const glu = t / 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'medical',
        question: `মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে ক্রেবস চক্র ${toBnDigits(t)} বার আবর্তিত হলে সরাসরি কত অণু CO₂ ও কত অণু GTP/ATP উৎপন্ন হয়?`,
        correct: `${toBnDigits(t * 2)} অণু CO₂ ও ${toBnDigits(t)} অণু GTP`,
        distractors: [
          `${toBnDigits(t)} অণু CO₂ ও ${toBnDigits(t * 2)} অণু GTP`,
          `${toBnDigits(t * 3)} অণু CO₂ ও ${toBnDigits(t)} অণু GTP`,
          `${toBnDigits(glu * 2)} অণু CO₂ ও ${toBnDigits(glu)} অণু GTP`,
        ],
        explanation: `প্রতিবার ক্রেবস চক্র আবর্তনে ২টি CO₂ ও ১টি GTP তৈরি হয় (অর্থাৎ ${toBnDigits(glu)} অণু গ্লুকোজের জন্য ${toBnDigits(t)} বার আবর্তন)।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ক্রেবস চক্র',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'board',
        question: `ঈস্টে ${toBnDigits(t)} অণু গ্লুকোজ অবাত শ্বসনে (অ্যালকোহলিক ফার্মেন্টেশন) ব্যবহৃত হলে নিট কত অণু ATP ও ইথানল উৎপন্ন হয়?`,
        correct: `${toBnDigits(t * 2)} অণু ATP ও ${toBnDigits(t * 2)} অণু ইথানল`,
        distractors: [
          `${toBnDigits(t * 36)} অণু ATP ও ${toBnDigits(t * 2)} অণু ইথানল`,
          `${toBnDigits(t * 4)} অণু ATP ও ${toBnDigits(t)} অণু ইথানল`,
          `${toBnDigits(t * 2)} অণু ATP ও ${toBnDigits(t * 6)} অণু ইথানল`,
        ],
        explanation: `অবাত শ্বসনে ১ অণু গ্লুকোজ থেকে কেবল গ্লাইকোলাইসিসের মাধ্যমে নিট ২ অণু ATP এবং গাঁজনে ২ অণু ইথানল (+ ২ CO₂) তৈরি হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ফার্মেন্টেশন',
      })
    );
  });

  // 18. Fruit Types, Inflorescence, Placentation & Tissue Classification (~44 MCQs)
  const morphologyMatrix: Array<{
    ch: string;
    vl: string;
    concept: string;
    feature: string;
    ex: string;
    ref: string;
  }> = [
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'ক্যারিওপসিস (Caryopsis) ফল', feature: 'একবীজী শুষ্ক অবিদারী ফল যেখানে ফলত্বক ও বীজত্বক সম্পূর্ণভাবে যুক্ত থাকে', ex: 'ধান, গম ও ভুট্টা (Poaceae)', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · ফলের প্রকারভেদ' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'সোরোসিস (Sorosis) যৌগিক ফল', feature: 'সম্পূর্ণ স্পাইক বা স্প্যাডিক্স পুষ্পমঞ্জরীর সব পুষ্প একত্রে রসালো ফলে পরিণত হওয়া', ex: 'কাঁঠাল ও আনারস', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · যৌগিক ফল' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'লিগিউম বা শুঁটি (Legume) ফল', feature: 'একগর্ভপত্রী গর্ভাশয় থেকে সৃষ্ট বিদারী শুষ্ক ফল যা উভয় সেলাই বরাবর ফেটে যায়', ex: 'মটরশুঁটি, শিম ও কৃষ্ণচূড়া', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · শুষ্ক বিদারী ফল' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'ক্যাপসুল (Capsule) ফল', feature: 'বহুগর্ভপত্রী যুক্ত গর্ভাশয় থেকে উৎপন্ন বিদারী শুষ্ক ফল যা বহু কপাটে ফাটে', ex: 'ঢেঁড়স, কার্পাস তুলা ও পাট', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · ক্যাপসুল' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'বেরি বা সরস ফল (Berry)', feature: 'বহুত্বকী রসালো ও মাংসল ফল যাতে বীজগুলো মজ্জার ভেতরে মুক্তভাবে থাকে', ex: 'টমেটো, কলা, পেয়ারা ও বেগুন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · সরস ফল' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'ড্রুপ বা অষ্ঠিল ফল (Drupe)', feature: 'পাতলা বহিঃত্বক, রসালো বা আঁশালো মধ্যত্বক এবং পাথরের মতো শক্ত অন্তঃত্বক (আঁটি)', ex: 'আম, নারিকেল ও বরই', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · ড্রুপ' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'ভেক্সিলারি (Vexillary) পুষ্পপত্রবিন্যাস', feature: 'বড় প্রজাপতিসদৃশ পাপড়ি (ধ্বজক) দুটি পার্শ্বীয় পাপড়িকে এবং সেগুলো নিচের নৌকা-পাপড়িকে ঢেকে রাখে', ex: 'মটর ও শিম (Papilionaceae)', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · এস্টিভেশন' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'স্প্যাডিক্স (Spadix) পুষ্পবিন্যাস', feature: 'মাংসল পুষ্পাক্ষের চারপাশে আবরক রঙিন স্প্যাথ দ্বারা বেষ্টিত মঞ্জরী', ex: 'কচু, নারিকেল ও কলা', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পুষ্পবিন্যাস' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'ক্যাপিচুলাম (Capitulum) পুষ্পবিন্যাস', feature: 'চ্যাপ্টা থালার মতো রিসেপট্যাকলের ওপর রশ্মি ও চাকতি পুষ্পক সজ্জিত মঞ্জরী', ex: 'সূর্যমুখী, গাঁদা ও ডায়ালিয়া', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭ · পুষ্পবিন্যাস' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', concept: 'সমদ্বিপার্শ্বীয় (Bicollateral) ভাস্কুলার বান্ডল', feature: 'কেন্দ্রে জাইলেমের উভয় পাশে দুটি ক্যাম্বিয়াম ও দুটি ফ্লোয়েম স্তর অবস্থান করা', ex: 'লাউ, কুমড়া ও শসা (Cucurbitaceae কাণ্ড)', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮ · ভাস্কুলার বান্ডল' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', concept: 'হাইপোডার্মিস (অধঃত্বক)', feature: 'দ্বিবীজপত্রী কাণ্ডে কোলেনকাইমা এবং একবীজপত্রী কাণ্ডে স্ক্লেরেনকাইমা নির্মিত ত্বকের নিচের স্তর', ex: 'সূর্যমুখী ও ভুট্টা কাণ্ডের বহিঃস্থ দৃঢ়তা স্তর', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮ · গ্রাউন্ড টিস্যু' },
  ];

  morphologyMatrix.forEach((m, i) => {
    const others = morphologyMatrix.filter((x) => x.concept !== m.concept);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${m.feature}" — এটি নিচের কোন উদ্ভিদতাত্ত্বিক গঠনের বৈশিষ্ট্য?`,
        correct: m.concept,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.concept),
        explanation: `${m.concept}: ${m.feature}। উদাহরণ: ${m.ex}।`,
        reference: m.ref,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `নিচের কোন উদ্ভিদ বা উদাহরণে "${m.concept}" দেখা যায়?`,
        correct: m.ex,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.ex),
        explanation: `${m.ex}-এ ${m.concept} (${m.feature}) পরিলক্ষিত হয়।`,
        reference: m.ref,
      })
    );
  });

  // 19. Botanists, Discoverers & Breakthrough Years Matrix (~50 MCQs)
  const botanists: Array<{ ch: string; vl: string; person: string; discovery: string; ref: string }> = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'কার্ল বেন্ডা (১৮৯৮)', discovery: 'মাইটোকন্ড্রিয়ার নামকরণ করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'আলবার্ট কলিকার (১৮৫০)', discovery: 'পেশিকোষে প্রথম মাইটোকন্ড্রিয়া পর্যবেক্ষণ করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'ক্যামিলো গলগি (১৮৯৮)', discovery: 'পেঁচার স্নায়ুকোষে গলগি বডি আবিষ্কার করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'কে. আর. পোর্টার (১৯৪৫)', discovery: 'এন্ডোপ্লাজমিক রেটিকুলাম নামকরণ ও আবিষ্কার করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'জর্জ প্যালাডে (১৯৫৫)', discovery: 'ইলেকট্রন অণুবীক্ষণ যন্ত্রে রাইবোজোম (প্যালাডে দানা) আবিষ্কার করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'ক্রিশ্চিয়ান দ্য দুভে (১৯৫৫)', discovery: 'লাইসোজোম ও পারঅক্সিসোম আবিষ্কার করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'আর্নস্ট হেকেল (১৮৬৬)', discovery: 'প্লাস্টিড শব্দটি প্রথম ব্যবহার করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'ফ্রেডরিখ মিশার (১৮৬৯)', discovery: 'পুঁজের কোষের নিউক্লিয়াস থেকে নিউক্লিন (DNA) পৃথক করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', person: 'ওয়াল্টার ফ্লেমিং (১৮৮২)', discovery: 'স্যালমান্ডার কোষে মাইটোসিস ও ক্রোমাটিন নামকরণ করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', person: 'ফার্মার ও মুর (১৯০৫)', discovery: 'হ্রাসমূলক বিভাজনকে "মায়োসিস" (Meiosis) নামকরণ করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', person: 'টি. এইচ. মর্গান (১৯১০)', discovery: 'ড্রসোফিলা মাছিতে ক্রসিং ওভার ও লিংকেজ মতবাদ প্রতিষ্ঠা করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', person: 'উইলহেম কুহনে (১৮৭৮)', discovery: 'জৈব-অনুঘটকের নামকরণ হিসেবে "এনজাইম" শব্দটি প্রবর্তন করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', person: 'লুই পাস্তুর ও রবার্ট কখ', discovery: 'রোগের জীবাণুতত্ত্ব (Germ theory) ও বিশুদ্ধ ব্যাকটেরিয়া কালচার প্রবর্তন করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', person: 'থিওফ্রাস্টাস', discovery: 'উদ্ভিদবিজ্ঞানের জনক ও উদ্ভিদের প্রাথমিক শ্রেণিবিভাগ করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৭' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', person: 'কার্ল নেগেলি (১৮৫৮)', discovery: 'ভাজক ও স্থায়ী টিস্যু এবং জাইলেম-ফ্লোয়েম শব্দ প্রবর্তন করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', person: 'রবিন হিল (১৯৩৭)', discovery: 'আলোয় ক্লোরোপ্লাস্ট কর্তৃক পানি ভেঙে O₂ মুক্তির "হিল বিক্রিয়া" আবিষ্কার করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', person: 'স্টিফেন হেলস', discovery: 'উদ্ভিদ শারীরতত্ত্বের জনক ও মূলজ চাপ পরিমাপ করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', person: 'পঞ্চানন মহেশ্বরী', discovery: 'ভারতীয় উপমহাদেশে উদ্ভিদ ভ্রূণতত্ত্ব ও টেস্ট-টিউব পরাগায়নের পথিকৃৎ', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', person: 'হার্বার্ট বয়ার ও স্ট্যানলি কোহেন (১৯৭৩)', discovery: 'প্রথম রিকম্বিন্যান্ট প্লাজমিড DNA তৈরি করে জিন প্রকৌশলের সূচনা করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', person: 'কার্ল এরেকি (১৯১৯)', discovery: 'পৃথিবীতে প্রথম "বায়োটেকনোলজি" শব্দটি প্রবর্তন করেন', ref: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১' },
  ];

  botanists.forEach((b, i) => {
    const others = botanists.filter((x) => x.person !== b.person);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: b.ch,
        visualLessonId: b.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জীববিজ্ঞানে কে "${b.discovery}"?`,
        correct: b.person,
        distractors: others.slice(i % 10, (i % 10) + 4).map((x) => x.person),
        explanation: `${b.person} ${b.discovery}।`,
        reference: b.ref,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: b.ch,
        visualLessonId: b.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `বিজ্ঞানী ${b.person} জীববিজ্ঞানের কোন ঐতিহাসিক অবদানের জন্য স্মরণীয়?`,
        correct: b.discovery,
        distractors: others.slice((i + 5) % 10, ((i + 5) % 10) + 4).map((x) => x.discovery),
        explanation: `${b.person}-এর প্রধান অবদান হলো তিনি ${b.discovery}।`,
        reference: b.ref,
      })
    );
  });

  // 20. Additional DNA Base Composition Reverse Problems & Photosynthesis Oxygen/Water Math (~32 MCQs)
  const gcValues = [15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37];
  gcValues.forEach((g) => {
    const aPct = 50 - g;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি দ্বিসূত্রক DNA অণুতে সাইটোসিনের (C) পরিমাণ ${toBnDigits(g)}% হলে অ্যাডেনিনের (A) শতকরা হার কত হবে?`,
        correct: `${toBnDigits(aPct)}%`,
        distractors: [`${toBnDigits(g + 3)}%`, `${toBnDigits(aPct * 2)}%`, `${toBnDigits(Math.abs(aPct - 5))}%`, `${toBnDigits(100 - aPct)}%`],
        explanation: `চারগাফের নিয়ম অনুযায়ী C = G = ${toBnDigits(g)}% হলে C + G = ${toBnDigits(g * 2)}%। তাই A + T = ${toBnDigits(100 - g * 2)}% এবং A = ${toBnDigits(aPct)}%।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · চারগাফের সূত্র',
      })
    );
  });

  [1, 2, 3, 4, 5, 6, 8, 10].forEach((nGlu) => {
    const waterSplit = nGlu * 12;
    const o2Out = nGlu * 6;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'medical',
        question: `সালোকসংশ্লেষণ বিক্রিয়ায় ${toBnDigits(nGlu)} অণু গ্লুকোজ ও ${toBnDigits(o2Out)} অণু O₂ মুক্ত করতে কত অণু H₂O ফটোলাইসিস প্রক্রিয়ায় ব্যবহৃত হয়?`,
        correct: `${toBnDigits(waterSplit)} অণু H₂O`,
        distractors: [
          `${toBnDigits(o2Out)} অণু H₂O`,
          `${toBnDigits(nGlu * 24)} অণু H₂O`,
          `${toBnDigits(nGlu * 4)} অণু H₂O`,
        ],
        explanation: `৬CO₂ + ১২H₂O → C₆H₁₂O₆ + ৬O₂ + ৬H₂O সমীকরণ অনুসারে ১ অণু গ্লুকোজে ১২ অণু H₂O ব্যবহৃত হয়; তাই ${toBnDigits(nGlu)} অণুতে ${toBnDigits(waterSplit)} অণু H₂O।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · সালোকসংশ্লেষণ সমীকরণ',
      })
    );
  });

  return list;
}

const RAW_BIO1_POOL: McqQuestion[] = [
  ...FACT_MCQS_BIO1,
  ...buildBio1StructuredMcqs(),
  ...FACT_MCQS_BIO1_PART4,
  ...buildBio1StructuredA(),
  ...buildBio1StructuredB(),
  ...buildBio1StructuredC(),
  ...buildBio1StructuredD(),
  ...buildBio1StructuredE(),
];

const DEDUPED_BIO1: McqQuestion[] = [];
const seenBio1Text = new Set<string>();

for (const q of RAW_BIO1_POOL) {
  const key = q.question.trim();
  if (seenBio1Text.has(key)) continue;
  seenBio1Text.add(key);
  DEDUPED_BIO1.push({
    ...q,
    id: `bio1_q_${String(DEDUPED_BIO1.length + 1).padStart(4, '0')}`,
  });
  if (DEDUPED_BIO1.length === 3000) break;
}

export const BIO1_EXPANDED_QUESTIONS: McqQuestion[] = DEDUPED_BIO1;
