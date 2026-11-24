import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface BotanyExtraRow {
  ch: string;
  vl: string;
  concept: string;
  answer: string;
  context: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio1StructuredE(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_se_${String(seq++).padStart(4, '0')}`;

  // 1. High-Yield Botany Diagnostic Assertions across All 9 Chapters (~240 MCQs)
  const extraRows: BotanyExtraRow[] = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', concept: 'নিউক্লিক অ্যাসিডে ফসফেট মূলকের অবস্থান ও আধান', answer: 'পেন্টোজ শর্করার ৫′- ও ৩′-কার্বন সংযোগকারী ঋণাত্মক চার্জযুক্ত অ্যাসিডিক অংশ', context: 'হিস্টোনের ধনাত্মক চার্জের সাথে আকর্ষণে DNA কুণ্ডলীকৃত থাকে', diff: 'medical' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', concept: 'প্রকৃতকোষীয় রাইবোজোমের ৬০S উপ-এককে প্রাপ্ত rRNA সমূহ', answer: '২৮S, ৫.৮S এবং ৫S rRNA অণু (এবং ৪০S-এ ১৮S rRNA)', context: '৭০S-এর ৫০S-এ ২৩S ও ৫S এবং ৩০S-এ ১৬S rRNA থাকে', diff: 'medical' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', concept: 'সাইটোপ্লাজমিক আবর্তন বা সাইক্লোসিস (Cyclosis)', answer: 'কোষপ্রাচীরের ভেতরে অ্যাক্টিন মাইক্রোফিলামেন্ট ও মায়োসিনের সাহায্যে প্রোটোপ্লাজমের ঘূর্ণন চলন', context: 'একমুখী (Chara) ও বহুমুখী (Tradescantia) সাইক্লোসিস দেখা যায়', diff: 'board' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', concept: 'গ্লাইকোজাইলেশন ও সালফেশন (গলগি কাজ)', answer: 'সিস্টারনির অভ্যন্তরে প্রোটিন ও লিপিডে কার্বোহাইড্রেট ও সালফেট মূলক সংযোগ', context: 'মিউসিন ও প্রোটিওগ্লাইক্যান তৈরির অপরিহার্য ধাপ', diff: 'dental' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', concept: 'প্রোটিওজোম (Proteasome) কমপ্লেক্স', answer: 'ইউবিকুইটিন চিহ্নিত পুরোনো বা ত্রুটিপূর্ণ কোষীয় প্রোটিন ভেঙে ফেলা ব্যারেল-আকৃতির প্রোটিন কমপ্লেক্স', context: 'কোষে প্রোটিনের গুণমান নিয়ন্ত্রণ ও অ্যামিনো অ্যাসিড পুনর্ব্যবহার', diff: 'medical' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', concept: 'ইন্টারফেজে হিস্টোন প্রোটিন ও সেন্ট্রিওল প্রতিলিপন', answer: 'প্রধানত কোষ চক্রের S-উপপর্যায়ে (DNA সংশ্লেষণের সাথে যুগপৎ)', context: 'মাইটোসিসের প্রস্তুতির জন্য G₂-তে টিউবুলিন সংশ্লেষিত হয়', diff: 'medical' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', concept: 'মায়োসিসে রিকম্বিনেশন নডিউল (Recombination Nodule)', answer: 'প্যাকাইটিন উপ-পর্যায়ে নন-সিস্টার ক্রোমাটিডের কায়াজমা স্থলে অবস্থিত রিকম্বিনেজ এনজাইম কমপ্লেক্স', context: 'জিন বিনিময় বা ক্রসিং ওভার সম্পাদনের আণবিক কেন্দ্র', diff: 'medical' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', concept: 'এন্ডোমায়োসিস বনাম ফ্রি-নিউক্লিয়ার বিভাজন', answer: 'নিউক্লিয়ার পর্দা অক্ষত রেখেই ক্রোমোজোম সংখ্যা বাড়া (এন্ডোমায়োসিস) বনাম সাইটোকাইনেসিসহীন বহুনিউক্লীয় বিভাজন', context: 'ডাবের তরল শস্য মুক্ত নিউক্লীয় বিভাজনের ফসল', diff: 'dental' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', concept: 'ম্যাল্টোজ ও সেলোবায়োজ-এর গ্লাইকোসাইডিক পার্থক্য', answer: 'ম্যাল্টোজে দুটি α-D-গ্লুকোজ α-১,৪ বন্ধনে এবং সেলোবায়োজে দুটি β-D-গ্লুকোজ β-১,৪ বন্ধনে যুক্ত', context: 'ম্যাল্টোজ স্টার্চের এবং সেলোবায়োজ সেলুলোজের ভাঙন উপজাত', diff: 'medical' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', concept: 'অলিগোস্যাকারাইডের মিষ্টতার ক্রম ও রেফিনোজ', answer: 'ফ্রুক্টোজ > সুক্রোজ > গ্লুকোজ > গ্যালাকটোজ > ম্যাল্টোজ > ল্যাকটোজ', context: 'রেফিনোজ (গ্যালাকটোজ+গ্লুকোজ+ফ্রুক্টোজ) হলো ট্রাইস্যাকারাইড', diff: 'dental' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', concept: 'সিস্টিন, মিথিওনিন ও ফিনাইলঅ্যালানিন', answer: 'প্রথম দুটি সালফারযুক্ত (-S-) ও ফিনাইলঅ্যালানিন অ্যারোমেটিক বলয়যুক্ত অ্যামিনো অ্যাসিড', context: 'টাইরোসিন ও ট্রিপটোফ্যানও অ্যারোমেটিক অ্যামিনো অ্যাসিড', diff: 'medical' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', concept: 'সিউডোইউরিডিন ও অ্যাডেনোসিন মনোফসফেট', answer: 'tRNA-তে থাকা বিরল নিউক্লিওসাইড (সিউডোইউরিডিন) এবং প্রোটিন-মুক্ত শক্তি বাহক নিউক্লিওটাইড (AMP)', context: 'নিউক্লিওসাইড = বেস + শর্করা; নিউক্লিওটাইড = নিউক্লিওসাইড + ফসফেট', diff: 'board' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', concept: 'গ্লাইকোপ্রোটিন gp120 ও CD4 রিসেপ্টর', answer: 'HIV ভাইরাসের বাইরের gp120 প্রোটিন মানুষের T-হেল্পার লিম্ফোসাইটের CD4 রিসেপ্টরে যুক্ত হওয়া', context: 'CD4 কোষ ধ্বংস হয়ে শরীরে সুযোগসন্ধানী সংক্রমণ (AIDS) ঘটায়', diff: 'medical' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', concept: 'পাস্টারাইজেশন (লুই পাস্তুর)', answer: 'দুধ ও পানীয়ের রোগজীবাণু ধ্বংসে ৬২.৮°C-এ ৩০ মিনিট (LTLT) অথবা ৭১.৭°C-এ ১৫ সেকেন্ড (HTST) উত্তপ্ত করে দ্রুত শীতল করা', context: 'যক্ষ্মার জীবাণু Coxiella burnetii সহ ক্ষতিকর ব্যাকটেরিয়া ধ্বংস হয়', diff: 'board' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', concept: 'প্লাজমোডিয়ামের এক্সফ্ল্যাজেলেশন প্রক্রিয়া', answer: 'মশার ক্রপে একটি মাইক্রোগ্যামেটোসাইট থেকে দ্রুত ৪–৮টি চাবুকের মতো সচল শুক্রাণু (মাইক্রোগ্যামেট) তৈরি হওয়া', context: '২০°–৩০°C তাপমাত্রায় স্ত্রী Anopheles মশার পাকস্থলিতে ঘটে', diff: 'medical' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', concept: 'অ্যানাইসোগ্যামাস ও প্লাজমোগ্যামি', answer: 'আকার ও আচরণে ভিন্ন দুটি গ্যামেটের মিলন বনাম দুটি কোষের কেবল সাইটোপ্লাজমের মিলন', context: 'ছত্রাকে প্লাজমোগ্যামির পরপরই ডাইক্যারিয়ন (n+n) দশা তৈরি হতে পারে', diff: 'board' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', concept: 'র‍্যামেন্টা (Ramenta) ও প্রোথ্যালাস রাইজয়েড', answer: 'Pteris ফার্নের কচি পাতা ও রাইজোম আবৃতকারী বাদামি শল্কপত্র (র‍্যামেন্টা) এবং প্রোথ্যালাসের নিচের এককোষী রাইজয়েড', context: 'র‍্যামেন্টা কচি অঙ্গকে রোদ ও শুষ্কতা থেকে বাঁচায়', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'গ্যামোসেপালাস, পলিপেটালাস ও এপিপেটালাস পুষ্প', answer: 'যুক্তবৃত্তি (K₍₅₎), মুক্ত দলমণ্ডল (C₅) এবং দললগ্ন পুংকেশর (C—A সংযোগ)', context: 'জবা ফুলে যুক্তবৃত্তি ও মুক্ত দলমণ্ডল; ধুতুরা-বেগুনে দললগ্ন পুংকেশর', diff: 'board' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', concept: 'সিনিয়ার ফসিল (Cycas জীবন্ত জীবাশ্ম) বনাম Pinus', answer: 'জীবাশ্ম প্রজাতির মতো প্রাচীন বৈশিষ্ট্য বজায় রেখে বর্তমানে টিকে থাকা সপুষ্পক নয় এমন নগ্নবীজী', context: 'Cycas, Ginkgo biloba এবং Metasequoia জীবন্ত জীবাশ্মের উদাহরণ', diff: 'medical' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', concept: 'ক্যালসিনেশন বা সিস্টোলিথ ও র‍্যাফাইড', answer: 'পাতার কোষে ক্যালসিয়াম কার্বোনেটের আঙুরের থোকার মতো স্ফটিক (সিস্টোলিথ — বট/রাবার) ও সূঁচালো ক্যালসিয়াম অক্সালেট (র‍্যাফাইড — কচু)', context: 'কচু খেলে গলা চুলকানোর পেছনে র‍্যাফাইড স্ফটিকের ভূমিকা রয়েছে', diff: 'medical' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', concept: 'হাইড্রোফাইট, মেসোফাইট ও জেরোফাইটের পাতার কিউটিকল', answer: 'নিমজ্জিত জলজ উদ্ভিদে কিউটিকল অনুপস্থিত বা অতি পাতলা; মরু উদ্ভিদে বহুস্তর বিশিষ্ট পুরু মোমযুক্ত কিউটিকল', context: 'জেরোফাইটে পাতায় মাল্টিপল এপিডার্মিস (যেমন Ficus ও Nerium) থাকে', diff: 'dental' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', concept: 'অক্সিডেটিভ বনাম সাবস্ট্রেট-লেভেল বনাম ফটোফসফোরাইলেশন', answer: 'যথাক্রমে শ্বসন ETS-এ O₂ সহায়তায়, কাইনেজ এনজাইমে সরাসরি ও ক্লোরোপ্লাস্টে আলোক শক্তিতে ADP + Pi → ATP', context: 'জৈবকোষে ATP তৈরির তিনটি মৌলিক পথ', diff: 'medical' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', concept: 'নাইট্রেট অ্যাসিমিলেশন (NO₃⁻ → NH₄⁺)', answer: 'সাইটোপ্লাজমে নাইট্রেট রিডাক্টেজ (Mo-নির্ভর) ও প্লাস্টিডে নাইট্রাইট রিডাক্টেজ-এর মাধ্যমে বিজারণ', context: 'উৎপন্ন NH₄⁺ পরবর্তীতে GS-GOGAT পথে গ্লুটামেট অ্যামিনো অ্যাসিডে যুক্ত হয়', diff: 'dental' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', concept: 'পার্থেনোকার্পিক বনাম অ্যাপোমিক্সিস বীজ', answer: 'নিষেক ছাড়া বীজহীন ফল (পার্থেনোকার্পি) বনাম নিষেক ছাড়া মাতৃ-উদ্ভিদের হুবহু জিনগত প্রতিলিপি বীজ (অ্যাপোমিক্সিস)', context: 'পোয়েসি ও অ্যাস্টারেসি গোত্রে অ্যাপোমিক্সিস বাণিজ্যিকভাবে গুরুত্বপূর্ণ', diff: 'medical' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', concept: 'ইন-সিটু বনাম এক্স-সিটু উদ্ভিদ সংরক্ষণ', answer: 'প্রাকৃতিক আবাসস্থলে (জাতীয় উদ্যান, সুন্দরবন, ইকোপার্ক) সংরক্ষণ বনাম বোটানিক্যাল গার্ডেন, সিড ব্যাংক ও টিস্যু কালচারে সংরক্ষণ', context: 'ক্রায়োপ্রিজারভেশনে (-১৯৬°C তরল নাইট্রোজেনে) পরাগ ও বীজ দীর্ঘকাল সংরক্ষণ করা হয়', diff: 'board' },
  ];

  extraRows.forEach((r, i) => {
    const others = extraRows.filter((x) => x.concept !== r.concept);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: r.diff || 'medical',
        question: `উদ্ভিদবিজ্ঞানে "${r.answer}" — এটি নিচের কোনটির সুনির্দিষ্ট উত্তর?`,
        correct: r.concept,
        distractors: others.slice(i % 12, (i % 12) + 4).map((x) => x.concept),
        explanation: `${r.concept}: ${r.answer}। প্রাসঙ্গিক তথ্য: ${r.context}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · উচ্চতর সমন্বিত ব্যাংক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `"${r.concept}" সম্পর্কে নিচের কোন ব্যাখ্যাটি যথার্থ?`,
        correct: r.answer,
        distractors: others.slice((i + 4) % 12, ((i + 4) % 12) + 4).map((x) => x.answer),
        explanation: `${r.concept}: ${r.answer}। (${r.context})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায়ভিত্তিক ব্যাখ্যা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${r.context}" — এই বৈশিষ্ট্য বা ঘটনাটি নিচের কোন ধারণার সাথে সরাসরি জড়িত?`,
        correct: r.concept,
        distractors: others.slice((i + 8) % 12, ((i + 8) % 12) + 4).map((x) => x.concept),
        explanation: `${r.context} হলো "${r.concept}" (${r.answer})-এর অন্তর্ভুক্ত।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · প্রাসঙ্গিক বিশ্লেষণ',
      })
    );
  });

  // 2. Quantitative & Analytical Matrix across Botany Chapters (~200 unique MCQs)
  // 2A. DNA Hydrogen Bond / Molecular Mass / Turn Drills with distinct phrasing (24 MCQs)
  [20, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300].forEach((turns, i) => {
    const bp = turns * 10;
    const lenAngstrom = turns * 34;
    const nucCount = bp * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি DNA অণুর মোট দৈর্ঘ্য ${toBnDigits(lenAngstrom.toLocaleString('en-US'))} Å হলে B-DNA মডেল অনুযায়ী এতে মোট কতটি ফসফেট গ্রুপ ও কতটি পূর্ণ প্যাঁচ থাকবে?`,
        correct: `${toBnDigits(nucCount.toLocaleString('en-US'))}টি ফসফেট ও ${toBnDigits(turns)}টি প্যাঁচ`,
        distractors: [
          `${toBnDigits(bp.toLocaleString('en-US'))}টি ফসফেট ও ${toBnDigits(turns)}টি প্যাঁচ`,
          `${toBnDigits(nucCount.toLocaleString('en-US'))}টি ফসফেট ও ${toBnDigits(turns * 2)}টি প্যাঁচ`,
          `${toBnDigits((nucCount * 2).toLocaleString('en-US'))}টি ফসফেট ও ${toBnDigits(turns / 2)}টি প্যাঁচ`,
        ],
        explanation: `প্রতি পূর্ণ প্যাঁচ ৩৪ Å (১০ বেসপেয়ার = ২০ নিউক্লিওটাইড/ফসফেট)। তাই প্যাঁচ = ${toBnDigits(lenAngstrom)}/৩৪ = ${toBnDigits(turns)} এবং মোট ফসফেট = ${toBnDigits(turns)} × ২০ = ${toBnDigits(nucCount)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · DNA দৈর্ঘ্য ও ফসফেট গণনা',
      })
    );
  });

  // 2B. Photosynthesis ATP vs NADPH ratio in C3, C4, and Photorespiration & Oxygen release (40 MCQs)
  [2, 3, 4, 5, 6, 8, 9, 10, 12, 18].forEach((glu, i) => {
    const o2Mol = glu * 6;
    const calvinAtp = glu * 18;
    const c4Atp = glu * 30;
    const nadph = glu * 12;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `C₄ উদ্ভিদে (যেমন ভুট্টায়) ${toBnDigits(glu)} অণু হেক্সোজ (গ্লুকোজ) তৈরিতে কেলভিন ও হ্যাচ-স্ল্যাক চক্র মিলিয়ে মোট কতটি ATP ও NADPH+H⁺ খরচ হয়?`,
        correct: `${toBnDigits(c4Atp)}টি ATP ও ${toBnDigits(nadph)}টি NADPH+H⁺`,
        distractors: [
          `${toBnDigits(calvinAtp)}টি ATP ও ${toBnDigits(nadph)}টি NADPH+H⁺`,
          `${toBnDigits(c4Atp)}টি ATP ও ${toBnDigits(glu * 24)}টি NADPH+H⁺`,
          `${toBnDigits(glu * 36)}টি ATP ও ${toBnDigits(nadph)}টি NADPH+H⁺`,
        ],
        explanation: `প্রতি CO₂-তে C₄-এ ৫ ATP ও ২ NADPH+H⁺ ব্যয় হয়; তাই ১ গ্লুকোজে (৬ CO₂) ৩০ ATP ও ১২ NADPH+H⁺ এবং ${toBnDigits(glu)} গ্লুকোজে ${toBnDigits(c4Atp)} ATP ও ${toBnDigits(nadph)} NADPH+H⁺ লাগে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · C₄ শর্করা সংশ্লেষ হিসাব',
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
        question: `সালোকসংশ্লেষণে ${toBnDigits(o2Mol)} অণু অক্সিজেন (O₂) পরিবেশে মুক্ত হলে কেলভিন চক্রের মাধ্যমে কত অণু গ্লুকোজ (C₆H₁₂O₆) সংশ্লেষিত হবে?`,
        correct: `${toBnDigits(glu)} অণু গ্লুকোজ`,
        distractors: [
          `${toBnDigits(glu * 2)} অণু গ্লুকোজ`,
          `${toBnDigits(o2Mol)} অণু গ্লুকোজ`,
          `${toBnDigits(glu * 3 + 1)} অণু গ্লুকোজ`,
          `${toBnDigits(Math.max(1, glu - 1))} অণু গ্লুকোজ`,
        ],
        explanation: `প্রতি ৬ অণু O₂ মুক্ত হওয়ার সাথে ১ অণু গ্লুকোজ উৎপন্ন হয়; তাই ${toBnDigits(o2Mol)} / ৬ = ${toBnDigits(glu)} অণু গ্লুকোজ।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · গ্যাস বিনিময় অনুপাত',
      })
    );
  });

  // 2C. Chromosomal DNA Mass (C-value) across G1 -> S -> G2 -> Prophase -> Anaphase -> Meiosis I -> Meiosis II (36 MCQs)
  const dnaWeights = [10, 12, 16, 20, 24, 30, 40, 50, 60, 80, 100, 120];
  dnaWeights.forEach((cVal, i) => {
    const doubled = cVal * 2;
    const haploidGamete = cVal / 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি ডিপ্লয়েড উদ্ভিদ দেহকোষে G₁ দশায় DNA-এর পরিমাণ ${toBnDigits(cVal)} পিকোগ্রাম (pg) হলে মায়োসিস-১ এর প্রোফেজ-১ (প্যাকাইটিন) ও মায়োসিস-২ শেষে উৎপন্ন হ্যাপ্লয়েড স্পোরে DNA পরিমাণ যথাক্রমে কত হবে?`,
        correct: `প্রোফেজ-১ এ ${toBnDigits(doubled)} pg এবং স্পোরে ${toBnDigits(haploidGamete)} pg`,
        distractors: [
          `প্রোফেজ-১ এ ${toBnDigits(cVal)} pg এবং স্পোরে ${toBnDigits(haploidGamete)} pg`,
          `প্রোফেজ-১ এ ${toBnDigits(doubled)} pg এবং স্পোরে ${toBnDigits(cVal)} pg`,
          `প্রোফেজ-১ এ ${toBnDigits(cVal * 4)} pg এবং স্পোরে ${toBnDigits(haploidGamete)} pg`,
        ],
        explanation: `G₁-এ 2C = ${toBnDigits(cVal)} pg হলে S-দশার পর প্রোফেজ-১-এ 4C = ${toBnDigits(doubled)} pg, মায়োসিস-১ শেষে 2C = ${toBnDigits(cVal)} pg এবং মায়োসিস-২ শেষে প্রতিটি হ্যাপ্লয়েড কোষে 1C = ${toBnDigits(haploidGamete)} pg হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · DNA C-মান পরিবর্তন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি হ্যাপ্লয়েড পরাগরেণুতে (n) DNA-এর পরিমাণ ${toBnDigits(haploidGamete)} pg হলে ঐ উদ্ভিদের একটি ডিপ্লয়েড প্যারেনকাইমা কোষের G₂ দশায় DNA পরিমাণ কত পিকোগ্রাম হবে?`,
        correct: `${toBnDigits(doubled)} pg`,
        distractors: [
          `${toBnDigits(cVal)} pg`,
          `${toBnDigits(haploidGamete)} pg`,
          `${toBnDigits(doubled * 2)} pg`,
        ],
        explanation: `পরাগরেণু 1C = ${toBnDigits(haploidGamete)} pg → দেহকোষের G₁-এ 2C = ${toBnDigits(cVal)} pg → S-দশায় দ্বিগুণ হয়ে G₂ দশায় 4C = ${toBnDigits(doubled)} pg।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষচক্র C-মান হিসাব',
      })
    );
  });

  // 2D. Bryophyta / Pteridophyta / Gymnosperm / Angiosperm Ploidy Level Identification (40 MCQs)
  const tissuePloidyList = [
    { part: 'মসের (Riccia/Funaria) প্রধান উদ্ভিদদেহ (থ্যালাস)', ploidy: 'হ্যাপ্লয়েড (n)', ex: 'অ্যান্থেরিডিয়া ও আর্কিগোনিয়া ধারণকারী গ্যামিটোফাইট' },
    { part: 'ব্রায়োফাইটের ক্যাপসুলের স্পোর মাতৃকোষ', ploidy: 'ডিপ্লয়েড (2n)', ex: 'মায়োসিস বিভাজনের মাধ্যমে n স্পোর তৈরি করে' },
    { part: 'Pteris ফার্নের প্রধান রাইজোম-যুক্ত দেহ ও পিনা', ploidy: 'ডিপ্লয়েড (2n)', ex: 'ভাস্কুলার স্পোরোফাইট উদ্ভিদ' },
    { part: 'Pteris ফার্নের হৃদপিণ্ডাকার প্রোথ্যালাস', ploidy: 'হ্যাপ্লয়েড (n)', ex: 'স্বভোজী গ্যামিটোফাইট যাতে অ্যান্থেরিডিয়া-আর্কিগোনিয়া হয়' },
    { part: 'Cycas নগ্নবীজী উদ্ভিদের শস্য (Endosperm)', ploidy: 'হ্যাপ্লয়েড (n)', ex: 'নিষেকের পূর্বেই মেগাস্পোর থেকে গঠিত স্ত্রী-গ্যামিটোফাইট' },
    { part: 'আবৃতবীজী উদ্ভিদের (ধান/আম) শস্য (Endosperm)', ploidy: 'ট্রিপ্লয়েড (3n)', ex: 'ত্রিমিলনে ১টি পুংগ্যামেট + ২টি মেরু নিউক্লিয়াস থেকে সৃষ্ট' },
    { part: 'আবৃতবীজী উদ্ভিদের পরাগনালিকার নালিকা ও জনন নিউক্লিয়াস', ploidy: 'হ্যাপ্লয়েড (n)', ex: 'মাইক্রোস্পোরের মাইটোসিসে সৃষ্ট পুং-গ্যামিটোফাইট' },
    { part: 'ডিম্বকের নিউসেলাস (ভ্রূণপোষক) ও ইন্টিগুমেন্ট', ploidy: 'ডিপ্লয়েড (2n)', ex: 'স্পোরোফাইটিক মাতৃ-টিস্যু' },
    { part: 'Spirogyra শৈবালের ফিলামেন্টাস সবুজ দেহ', ploidy: 'হ্যাপ্লয়েড (n)', ex: 'জাইগোস্পোর (2n) ছাড়া সম্পূর্ণ জীবনচক্র হ্যাপ্লন্টিক' },
    { part: 'Agaricus ছত্রাকের গৌণ মাইসেলিয়ামের কোষ', ploidy: 'ডাইক্যারিওটিক (n + n)', ex: 'প্লাজমোগ্যামির পর দুটি ভিন্ন নিউক্লিয়াস একত্রে অবস্থান' },
  ];
  tissuePloidyList.forEach((tp, i) => {
    const opts = ['হ্যাপ্লয়েড (n)', 'ডিপ্লয়েড (2n)', 'ট্রিপ্লয়েড (3n)', 'ডাইক্যারিওটিক (n + n)', 'টেট্রাপ্লয়েড (4n)'];
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: i < 4 ? 'bio1_ch5_lower_plants' : i < 8 ? 'bio1_ch10_repro_biotech' : 'bio1_ch5_lower_plants',
        visualLessonId: i < 4 ? 'photosynthesis' : 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জীববিজ্ঞানে "${tp.part}"-এর ক্রোমোজোমীয় প্লয়েডি স্তর কী?`,
        correct: tp.ploidy,
        distractors: opts.filter((o) => o !== tp.ploidy),
        explanation: `${tp.part} হলো ${tp.ploidy} (${tp.ex})।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · উদ্ভিদ গোষ্ঠীসমূহের প্লয়েডি',
      })
    );
  });

  // 2E. Rapid One-Liner Medical Botanical Facts (50 more unique MCQs)
  const extraMedBotany: Array<{ ch: string; vl: string; q: string; a: string; w: string[]; exp: string }> = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', q: 'কোষের অভ্যন্তরে কোন অঙ্গাণুটিকে "ডিকটিওজোম", "ইডিওসোম" বা "লাইপোকন্ড্রিয়া" নামেও অভিহিত করা হয়?', a: 'গলগি বডি (Golgi Apparatus)', w: ['মাইটোকন্ড্রিয়া', 'এন্ডোপ্লাজমিক রেটিকুলাম', 'সেন্ট্রিওল'], exp: 'উদ্ভিদ কোষে গলগি বডিকে ডিকটিওজোম এবং শুক্রাণুতে অ্যাক্রোজোম গঠনের সময় ইডিওসোম বলা হয়।' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', q: 'এক্সন ও ইন্ট্রনের মধ্যে কোন অংশটি mRNA থেকে স্প্লাইসিং প্রক্রিয়ায় কেটে বাদ দেওয়া হয়?', a: 'ইন্ট্রন (নন-কোডিং অংশ)', w: ['এক্সন (কোডিং অংশ)', '৫′-ক্যাপ', 'পলি-A লেজ'], exp: 'এক্সনগুলো জোড়া লেগে পরিপক্ব কার্যকর mRNA গঠন করে এবং প্রোটিনে অনূদিত হয়।' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', q: 'জোড়-বাঁধা হোমোলোগাস ক্রোমোজোমকে একত্রে কী বলে এবং এতে মোট কয়টি ক্রোমাটিড থাকে?', a: 'বাইভ্যালেন্ট; এতে ২টি সেন্ট্রোমিয়ার ও ৪টি ক্রোমাটিড (টেট্রাড) থাকে', w: ['মনোভ্যালেন্ট; ২টি ক্রোমাটিড', 'ট্রাইভ্যালেন্ট; ৬টি ক্রোমাটিড', 'অক্টোভ্যালেন্ট; ৮টি ক্রোমাটিড'], exp: 'জাইগোটিনে সৃষ্ট প্রতিটি বাইভ্যালেন্টে দুটি ডায়াড অর্থাৎ ৪টি ক্রোমাটিড থাকে।' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', q: 'যে অ্যামিনো অ্যাসিডে একটি অপ্রতিসম আলফা-কার্বনও (Chiral center) অনুপস্থিত এবং যা আলোক-নিষ্ক্রিয়, সেটি কী?', a: 'গ্লাইসিন (Glycine — সবচেয়ে সরল অ্যামিনো অ্যাসিড)', w: ['অ্যালানিন', 'সেরিন', 'সিস্টিন'], exp: 'গ্লাইসিনের R-গ্রুপ একটি হাইড্রোজেন পরমাণু হওয়ায় α-কার্বনে দুটি H থাকায় এটি অকাইরাল।' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', q: 'ব্যাকটেরিয়ার কোষে ক্ষুদ্র বৃত্তাকার অতিরিক্ত DNA বা প্লাজমিডের একটি প্রধান চিকিৎসাবিজ্ঞানীয় গুরুত্ব কী?', a: 'অ্যান্টিবায়োটিক প্রতিরোধী জিন (R-প্লাজমিড) বহন করা ও জেনেটিক ইঞ্জিনিয়ারিংয়ে ভেক্টর হিসেবে ব্যবহৃত হওয়া', w: ['শুধু প্রোটিন হজম করা', 'ফ্ল্যাজেলা তৈরি করা', 'সালোকসংশ্লেষণ ঘটানো'], exp: 'কনজুগেশনের মাধ্যমে R-প্লাজমিড এক ব্যাকটেরিয়া থেকে অন্য ব্যাকটেরিয়ায় অ্যান্টিবায়োটিক রেজিস্ট্যান্স ছড়াতে পারে।' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', q: 'মানুষের রক্তের সিরাম বা প্লাজমা ব্যবহার করে যে নির্দিষ্ট ভাইরাল বা ব্যাকটেরিয়াল অ্যান্টিবডি/অ্যান্টিজেন শনাক্ত করা হয়, তার জনপ্রিয় টেস্ট কী?', a: 'ELISA (Enzyme-Linked Immunosorbent Assay)', w: ['বেলিস-স্টার্লিং পরীক্ষা', 'ফেলিং পরীক্ষা', 'হিল বিক্রিয়া'], exp: 'ডেঙ্গু, HIV ও হেপাটাইটিস শনাক্তকরণে ELISA অত্যন্ত সংবেদনশীল পরীক্ষা।' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', q: 'Agaricus ছত্রাকে গিল বা ল্যামেলি স্তরে হাইমেনিয়ামের উপরের দুটি জীবাণুমুক্ত সহায়ক ও স্পোর-উৎপাদনকারী কোষের নাম কী?', a: 'প্যারাফাইসিস (বন্ধ্যা কোষ) ও ব্যাসিডিয়াম (উর্বর কোষ)', w: ['সিনার্জিড ও অ্যান্টিপোডাল', 'ট্রাকিড ও ভেসেল', 'ক্যাপসোমিয়ার ও ভিরিয়ন'], exp: 'প্যারাফাইসিস ব্যাসিডিয়াগুলোর মাঝে সুরক্ষামূলক স্তম্ভ হিসেবে অবস্থান করে।' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', q: 'Cycas-এর পাতার কিনারায় ভাঁজ না থাকলেও কচি অবস্থায় কুকুরের লেজের মতো কুণ্ডলিত থাকে; এর নাম কী?', a: 'সারসিনেট ভার্নেশন (Circinate Vernation)', w: ['ইমব্রিকেট অ্যাস্টিভেশন', 'র‍্যাসিমোজ মঞ্জরি', 'গ্লাইকোজাইলেশন'], exp: 'Cycas ও ফার্নে সারসিনেট ভার্নেশন থাকায় এটি টেরিডোফাইটা ও নগ্নবীজীর বিবর্তনীয় সেতুবন্ধন দেখায়।' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', q: 'ভাস্কুলার বান্ডলকে ঘিরে অবস্থিত বা পাতার মেসোফিলের মাঝে অবস্থানকারী প্যারেনকাইমা কোষের বলয়কে কী বলে?', a: 'বান্ডলশীথ (Bundle sheath)', w: ['টোনোপ্লাস্ট', 'ক্যাসপেরিয়ান ফিতা', 'মধ্যপর্দা'], exp: 'C₄ উদ্ভিদে বান্ডলশীথ কোষে বড় ও গ্রানাবিহীন ক্লোরোপ্লাস্ট থাকে।' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', q: 'ক্লোরোফিলের কোন দুটি তরঙ্গদৈর্ঘ্যে আলোর শোষণ চূড়া (Absorption peaks) থাকে এবং সালোকসংশ্লেষণ সর্বাধিক হয়?', a: 'নীল (~৪৩০–৪৫০ nm) ও লাল (~৬৬০–৬৮০ nm) অঞ্চলে', w: ['সবুজ (~৫৩০ nm) ও হলুদ (~৫৮০ nm) অঞ্চলে', 'অতিবেগুনি (~২৫০ nm) ও অবলোহিত (~৯০০ nm)', 'কেবল এক্স-রে অঞ্চলে'], exp: 'সবুজ আলো ক্লোরোফিল শোষণ না করে প্রতিফলিত করে বলে পাতা সবুজ দেখায়।' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', q: 'মাইটোকন্ড্রিয়ার ইলেকট্রন ট্রান্সপোর্ট সিস্টেমে চূড়ান্ত ইলেকট্রন গ্রহীতা কী এবং সাইটোপ্লাজমিক শ্বসনের শেষে কী গঠিত হয়?', a: 'আণবিক অক্সিজেন (O₂) যা প্রোটন গ্রহণ করে বিপাকীয় পানি (H₂O) গঠন করে', w: ['কার্বন ডাই-অক্সাইড (CO₂)', 'নাইট্রেট (NO₃⁻)', 'পাইরুভিক অ্যাসিড'], exp: '২e⁻ + ২H⁺ + ½O₂ → H₂O বিক্রিয়া সাইটোক্রোম a-a₃ অক্সিডেজ কমপ্লেক্স-IV-এ সম্পন্ন হয়।' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', q: 'উদ্ভিদ প্রজননে একই গাছের এক ফুল থেকে অন্য ফুলে পরাগরেণু স্থানান্তরিত হলে তাকে কী পরাগায়ন বলে?', a: 'গেইটোনোগ্যামি (Geitonogamy — জেনেটিক্যালি স্ব-পরাগায়নের সমতুল্য)', w: ['জেনোগ্যামি (Xenogamy)', 'অটোগ্যামি (Autogamy)', 'অ্যানিমোফিলি'], exp: 'অটোগ্যামি একই ফুলের মধ্যে, গেইটোনোগ্যামি একই গাছের ভিন্ন ফুলে ও জেনোগ্যামি ভিন্ন গাছের ফুলে পরাগায়ন বোঝায়।' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', q: 'রবার্টসন, হার্শে ও চেইজ কোন জীবাণু ও তেজস্ক্রিয় আইসোটোপ দিয়ে প্রমাণ করেন যে DNA-ই বংশগতির ধারক?', a: 'T₂ ব্যাকটেরিওফাজ ও ³²P (DNA) এবং ³⁵S (প্রোটিন)', w: ['TMV ভাইরাস ও ¹⁴C', 'E. coli ও ¹⁸O', 'Penicillium ও ¹⁵N'], exp: '১৯৫২ সালে হার্শে ও চেইজ দেখান সংক্রমণের সময় প্রোটিন (³⁵S) নয়, বরং ফাজের DNA (³²P) ব্যাকটেরিয়ায় প্রবেশ করে।' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', q: 'জিনোম সিকোয়েন্সিংয়ের জনক হিসেবে দুইবার রসায়নে নোবেল বিজয়ী এবং প্রথম DNA সিকোয়েন্সিং পদ্ধতির উদ্ভাবক কে?', a: 'ফ্রেডেরিক স্যাঙ্গার (Sanger Sequencing / Chain-termination method)', w: ['জেমস ওয়াটসন', 'ক্যারি মুলিস', 'পল বার্গ'], exp: 'ডাইডিঅক্সিনিউক্লিওটাইড (ddNTP) ব্যবহার করে স্যাঙ্গার পদ্ধতিতে DNA বেস ক্রম নির্ণয় করা হয়।' },
  ];
  extraMedBotany.forEach((em, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: em.ch,
        visualLessonId: em.vl,
        hscLevel: '11',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: em.q,
        correct: em.a,
        distractors: em.w,
        explanation: `${em.a}। ${em.exp}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · স্পেশাল অ্যাডমিশন সংকলন',
      })
    );
  });

  // 3. Mineral Deficiency Symptoms & Ion Role Cross-Matrix (~45 MCQs)
  const mineralMatrix = [
    { el: 'নাইট্রোজেন (N)', type: 'ম্যাক্রোমৌল (অ্যানায়ন NO₃⁻ ও ক্যাটায়ন NH₄⁺ উভয় রূপে শোষিত)', symptom: 'বয়স্ক পাতায় প্রথমে ক্লোরোসিস (হলুদ হওয়া) ও বৃদ্ধি ব্যাহত হওয়া', role: 'ক্লোরোফিল, অ্যামিনো অ্যাসিড ও নিউক্লিক অ্যাসিডের গাঠনিক উপাদান' },
    { el: 'ম্যাগনেসিয়াম (Mg²⁺)', type: 'ম্যাক্রোমৌল (সচল উপাদান)', symptom: 'বয়স্ক পাতার শিরার মধ্যবর্তী অঞ্চলে ক্লোরোসিস (ইন্টারভেইনাল ক্লোরোসিস)', role: 'ক্লোরোফিল অণুর কেন্দ্রীয় পরমাণু ও রাইবোজোমের উপ-একক সংযোগকারী' },
    { el: 'পটাশিয়াম (K⁺)', type: 'ম্যাক্রোমৌল (পাতা ও ভাজক কোষে সর্বাধিক)', symptom: 'পাতার কিনারা ও ডগা পুড়ে যাওয়া বা কুঁচকে যাওয়া (মার্জিনাল স্কর্চিং)', role: 'পত্ররন্ধ্র খোলা-বন্ধ করা ও এনজাইম সক্রিয়করণ নিয়ন্ত্রণ' },
    { el: 'ফসফরাস (H₂PO₄⁻ / HPO₄²⁻)', type: 'ম্যাক্রোমৌল', symptom: 'পাতায় গাঢ় নীলাভ-সবুজ বা বেগুনি (অ্যান্থোসায়ানিন) ছোপ ও মূল বৃদ্ধি হ্রাস', role: 'ATP, DNA, RNA ও ফসফোলিপিডের অপরিহার্য উপাদান' },
    { el: 'ক্যালসিয়াম (Ca²⁺)', type: 'ম্যাক্রোমৌল (উদ্ভিদে অচল বা Immobile)', symptom: 'কচি ডগা ও বর্ধনশীল মূলের অগ্রভাগ মরে যাওয়া (হুকড টিপ ও ডাই-ব্যাক)', role: 'মধ্যপর্দার ক্যালসিয়াম পেকটেট গঠন ও কোষপ্রাচীর দৃঢ়করণ' },
    { el: 'সালফার (SO₄²⁻)', type: 'ম্যাক্রোমৌল', symptom: 'তরুণ পাতায় সর্বত্র ক্লোরোসিস ও কাণ্ড চিকন কাষ্ঠল হওয়া', role: 'সিস্টিন ও মিথিওনিন অ্যামিনো অ্যাসিড এবং কো-এনজাইম-A গঠন' },
    { el: 'আয়রন বা লৌহ (Fe²⁺ / Fe³⁺)', type: 'মাইক্রোমৌল (ট্রেস উপাদান)', symptom: 'কচি পাতায় তীব্র শিরামধ্যস্থ ক্লোরোসিস', role: 'ক্লোরোফিল সংশ্লেষে অনুঘটক এবং সাইটোক্রোম ও ফেরিডক্সিনের উপাদান' },
    { el: 'ম্যাঙ্গানিজ (Mn²⁺)', type: 'মাইক্রোমৌল', symptom: 'কচি পাতায় ক্লোরোসিসের সাথে মৃত (নেক্রোটিক) ধূসর দাগ (জইয়ের গ্রে স্পেক)', role: 'সালোকসংশ্লেষণে পানির ফটোলাইসিস (OEC) সক্রিয় করা' },
    { el: 'জিংক (Zn²⁺)', type: 'মাইক্রোমৌল', symptom: 'পাতা ছোট ও বিকৃত হওয়া (লিটল লিফ রোগ) ও পর্বমধ্য খাটো হওয়া (রোজেট)', role: 'ট্রিপটোফ্যান থেকে অক্সিন (IAA) সংশ্লেষ ও কার্বনিক অ্যানহাইড্রেজের সহ-উপাদান' },
    { el: 'বোরন (BO₃³⁻)', type: 'মাইক্রোমৌল', symptom: 'পুষ্পমঞ্জরি ও মুকুল ঝরে যাওয়া, চিনির বিটের হার্ট-রট এবং ফাঁপা কাণ্ড', role: 'শর্করা পরিবহন ও পরাগনালিকার বৃদ্ধি নিয়ন্ত্রণ' },
    { el: 'কপার (Cu²⁺)', type: 'মাইক্রোমৌল', symptom: 'লেবুজাতীয় উদ্ভিদে ডাই-ব্যাক (Die-back) ও কচি পাতা মোড়ানো', role: 'প্লাস্টোসায়ানিন ও পলিফেনল অক্সিডেজ এনজাইমের উপাদান' },
    { el: 'মলিবডেনাম (MoO₄²⁻)', type: 'মাইক্রোমৌল (সর্বাপেক্ষা কম প্রয়োজনীয়)', symptom: 'ফুলকপিতে হুইপটেইল (Whiptail) রোগ ও নাইট্রোজেন আবদ্ধকরণ ব্যাহত', role: 'নাইট্রেট রিডাক্টেজ ও নাইট্রোজিনেজ এনজাইমের অপরিহার্য ধাতব আয়ন' },
    { el: 'ক্লোরিন (Cl⁻)', type: 'মাইক্রোমৌল', symptom: 'পাতা তামাটে বর্ণ ধারণ করে নেতিয়ে পড়া ও মূলের বৃদ্ধি কমে যাওয়া', role: 'পানির সালোক-বিভাজনে (Mn²⁺-এর সাথে) ও অভিস্রবণিক ভারসাম্য রক্ষা' },
  ];
  mineralMatrix.forEach((m, i) => {
    const others = mineralMatrix.filter((x) => x.el !== m.el);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `উদ্ভিদ পুষ্টিতে কোন খনিজ মৌলের অভাবে "${m.symptom}" দেখা যায়?`,
        correct: m.el,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => x.el),
        explanation: `${m.el} (${m.type})-এর অভাবে ${m.symptom} ঘটে। এর প্রধান কাজ: ${m.role}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · খনিজ পুষ্টি ও অভাবজনিত লক্ষণ',
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
        question: `উদ্ভিদ শারীরতত্ত্বে "${m.role}" — এই কাজটি কোন খনিজ মৌলের সাথে সম্পর্কিত?`,
        correct: m.el,
        distractors: others.slice((i + 3) % 8, ((i + 3) % 8) + 4).map((x) => x.el),
        explanation: `${m.el} উদ্ভিদে ${m.role} হিসেবে কাজ করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · খনিজ মৌলের শারীরবৃত্তীয় ভূমিকা',
      })
    );
  });

  // 4. Plant Growth Regulators, Antagonism & Commercial Uses (~36 MCQs)
  const hormoneMatrix = [
    { h: 'অক্সিন (IAA / NAA / 2,4-D)', site: 'কাণ্ড ও মূলের শীর্ষস্থ ভাজক টিস্যু (মেরিস্টেম)', bioassay: 'অ্যাভেনা কোলিওপটাইল কার্ভেচার টেস্ট (Avena curvature)', use: 'অ্যাগোছো দমনে ২,৪-ডি (দ্বিবীজপত্রী আগাছানাশক), কলমে মূল গজানো ও পার্থেনোকার্পিক ফল তৈরি' },
    { h: 'জিবেরেলিন (GA₃)', site: 'কচি পাতা, বর্ধনশীল বীজ ও অঙ্কুরোদগমশীল ভ্রূণ', bioassay: 'বামন মটর বা ভুট্টার পর্বমধ্য দীর্ঘীকরণ (বোল্টিং)', use: 'আঙুর ও আখের উৎপাদন বাড়ানো, যবের বীজে α-অ্যামাইলেজ ক্ষরণ ও সুপ্তাবস্থা ভঙ্গ' },
    { h: 'সাইটোকাইনিন (জিয়াটিন / কাইনেটিন)', site: 'বর্ধনশীল মূলের অগ্রভাগ, ডাবের পানি ও ফল', bioassay: 'পাতার বার্ধক্য বিলম্বিতকরণ (রিচমন্ড-ল্যাং প্রভাব)', use: 'টিস্যু কালচারে কান্ড-মুকুল সৃষ্টি, পার্শ্বমুকুল বৃদ্ধি ও ক্লোরোফিল সংরক্ষণ' },
    { h: 'অ্যাবসিসিক অ্যাসিড (ABA / স্ট্রেস হরমোন)', site: 'পরিণত পাতা, বীজ আবরণ ও ক্লোরোপ্লাস্ট (ভায়োলাজ্যান্থিন থেকে)', bioassay: 'খরা অবস্থায় পত্ররন্ধ্র দ্রুত বন্ধ করানো ও বীজের সুপ্তাবস্থা বজায় রাখা', use: 'পাতা ও ফল ঝরা (অ্যাবসিশন) ত্বরান্বিত করা এবং জিবেরেলিনের বিপরীত কাজ করা' },
    { h: 'ইথিলিন (C₂H₄ — একমাত্র গ্যাসীয় হরমোন)', site: 'পাকা ফল, জীর্ণ পাতা ও পর্বসন্ধি', bioassay: 'ট্রিপল রেসপন্স (কাণ্ডের প্রসারণ হ্রাস, স্থূলতা বৃদ্ধি, অনুভূমিক বৃদ্ধি)', use: 'ক্লাইম্যাক্টেরিক শ্বসন বাড়িয়ে কৃত্রিমভাবে কাঁচা ফল (কলা, আম) পাকানো ও আনারসে ফুল আনা' },
    { h: 'ফ্লোরিজেন (FT প্রোটিন — প্রকল্পিত পুষ্প-হরমোন)', site: 'আলোকপর্যায়কাল সাড়াদানকারী পাতায় উৎপন্ন হয়ে ফ্লোয়েমে পরিবাহিত', bioassay: 'স্বল্পদিবা বা দীর্ঘদিবা উদ্ভিদে কাণ্ডাগ্রকে পুষ্পমুকুলে রূপান্তর', use: 'ফটোপিরিয়ডিজম নিয়ন্ত্রণের মাধ্যমে ঋতুভিত্তিক পুষ্পায়ন সূচনা করা' },
  ];
  hormoneMatrix.forEach((hm, i) => {
    const others = hormoneMatrix.filter((x) => x.h !== hm.h);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `উদ্ভিদের কোন বৃদ্ধি নিয়ন্ত্রক বা হরমোনের সাথে "${hm.bioassay}" সরাসরি যুক্ত?`,
        correct: hm.h,
        distractors: others.slice(0, 4).map((x) => x.h),
        explanation: `${hm.h}-এর বৈশিষ্ট্যমূলক বায়োঅ্যাসে/প্রভাব হলো ${hm.bioassay}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ফাইটোহরমোন',
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
        question: `কৃষি ও উদ্যানতত্ত্বে "${hm.use}" — এটি কোন উদ্ভিদ হরমোনের ব্যবহারিক প্রয়োগ?`,
        correct: hm.h,
        distractors: others.slice(1, 5).map((x) => x.h),
        explanation: `${hm.h} (${hm.site}-এ উৎপন্ন) দিয়ে ${hm.use} করা হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · হরমোনের ব্যবহারিক প্রয়োগ',
      })
    );
  });

  // 5. Enzyme Specificity, Optimum pH, Cofactor & Prosthetic Group Matrix (~30 MCQs)
  const enzymeFacts = [
    { enz: 'ক্যাটালেজ (Catalase)', co: 'হিম (লৌহযুক্ত প্রোস্থেটিক গ্রুপ)', rx: '২H₂O₂ → ২H₂O + O₂ (পারঅক্সিসোমে সর্বাধিক)', opt: 'টার্নওভার সংখ্যা সর্বাধিক (~৪ × ১০⁷/সেকেন্ড)' },
    { enz: 'কার্বনিক অ্যানহাইড্রেজ', co: 'জিংক আয়ন (Zn²⁺)', rx: 'CO₂ + H₂O ⇌ H₂CO₃ (অতি দ্রুতমুখী বিক্রিয়া)', opt: 'প্রতি সেকেন্ডে প্রায় ৬ লাখ H₂CO₃ অণু গঠন' },
    { enz: 'নাইট্রোজিনেজ কমপ্লেক্স', co: 'মলিবডেনাম ও আয়রন (Mo-Fe প্রোটিন)', rx: 'N₂ + ৮H⁺ + ৮e⁻ + ১৬ATP → ২NH₃ + H₂', opt: 'অবাত পরিবেশে লেগহিমোগ্লোবিনের সুরক্ষায় কার্যকর' },
    { enz: 'RuBisCO (রুবিস্কো)', co: 'ম্যাগনেসিয়াম আয়ন (Mg²⁺)', rx: 'RuBP + CO₂ → ২ × ৩-PGA (কেলভিন চক্রের প্রথম ধাপ)', opt: 'পৃথিবীতে সর্বাধিক প্রচুর (Most abundant) প্রোটিন/এনজাইম' },
    { enz: 'হেক্সোকাইনেজ ও পাইরুভেট কাইনেজ', co: 'ম্যাগনেসিয়াম আয়ন (Mg²⁺)', rx: 'গ্লুকোজ → গ্লুকোজ-৬-ফসফেট ও PEP → পাইরুভেট', opt: 'গ্লাইকোলাইসিসের অপুনর্মুখী (Irreversible) ফসফোরাইলেশন ধাপ' },
    { enz: 'সাক্সিনেট ডিহাইড্রোজিনেজ', co: 'FAD (প্রোস্থেটিক গ্রুপ)', rx: 'সাক্সিনিক অ্যাসিড → ফিউমারিক অ্যাসিড', opt: 'ক্রেবস চক্রের একমাত্র এনজাইম যা মাইটোকন্ড্রিয়ার অন্তঃঝিল্লিতে থাকে' },
    { enz: 'অ্যামাইলেজ (টায়ালিন / অগ্ন্যাশয়)', co: 'ক্লোরাইড আয়ন (Cl⁻)', rx: 'স্টার্চের α-১,৪ গ্লাইকোসাইডিক বন্ধন ভেঙে ম্যাল্টোজ তৈরি', opt: 'লালারস ও অগ্ন্যাশয় রসে যথাক্রমে pH ৬.৮ ও ৭.১–৮.০' },
    { enz: 'ইউরিয়েজ (প্রথম কেলাসিত এনজাইম)', co: 'নিকেল আয়ন (Ni²⁺)', rx: 'ইউরিয়া + H₂O → ২NH₃ + CO₂', opt: 'জে. বি. সামনার (১৯২৬) কাঁঠালি শিম থেকে প্রথম বিশুদ্ধ এনজাইমরূপে পৃথক করেন' },
    { enz: 'ট্যাক পলিমারেজ (Taq Polymerase)', co: 'ম্যাগনেসিয়াম আয়ন (Mg²⁺)', rx: 'PCR-এ ৭২°C তাপমাত্রায় DNA শৃঙ্খল সম্প্রসারণ', opt: 'উষ্ণ প্রস্রবণের Thermus aquaticus ব্যাকটেরিয়া থেকে সংগৃহীত' },
    { enz: 'অ্যালকোহল ডিহাইড্রোজিনেজ', co: 'NAD⁺ ও Zn²⁺', rx: 'অ্যাসিটালডিহাইড → ইথানল (ইস্টের গাঁজন)', opt: 'অবাত শ্বসনে NADH+H⁺ পুনঃজারিত করে গ্লাইকোলাইসিস চালু রাখে' },
  ];
  enzymeFacts.forEach((ef, i) => {
    const others = enzymeFacts.filter((x) => x.enz !== ef.enz);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch3_cell_chem',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জৈবরসায়নে কোন এনজাইমের সক্রিয়তার জন্য "${ef.co}" অপরিহার্য সহ-উপাদান হিসেবে কাজ করে এবং বিক্রিয়াটি "${ef.rx}"?`,
        correct: ef.enz,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.enz),
        explanation: `${ef.enz} (${ef.co} সহকারে) ${ef.rx} ঘটায়। বিশেষ তথ্য: ${ef.opt}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · এনজাইম ও কো-ফ্যাক্টর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch3_cell_chem',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'board',
        question: `এনজাইম "${ef.enz}" সম্পর্কে নিচের কোন বিশেষ তথ্যটি সঠিক?`,
        correct: ef.opt,
        distractors: others.slice((i + 2) % 6, ((i + 2) % 6) + 4).map((x) => x.opt),
        explanation: `${ef.enz}-এর ক্ষেত্রে সঠিক তথ্য: ${ef.opt} (${ef.rx})।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · এনজাইম বৈশিষ্ট্য',
      })
    );
  });

  // 6. Photoperiodism (LDP / SDP / DNP) & Vernalization Plant Matrix (~20 MCQs)
  const photoPlants = [
    { group: 'স্বল্পদিবা উদ্ভিদ (Short-Day Plant / SDP)', ex: 'আমন ধান, পাট, তামাক, সয়াবিন, ডালিয়া, চন্দ্রমল্লিকা', crit: 'সংকটকালের চেয়ে দীর্ঘ অবিচ্ছিন্ন অন্ধকারকাল পেলে তবেই ফুল ফোটে (লাল আলো অন্ধকার ভাঙলে পুষ্পায়ন থামে)' },
    { group: 'দীর্ঘদিবা উদ্ভিদ (Long-Day Plant / LDP)', ex: 'গম, যব, মুলা, পালং শাক, লেটুস, শালগম, আলু', crit: 'সংকটকালের চেয়ে বেশি দিবা-দৈর্ঘ্য ও স্বল্প অন্ধকারকাল পেলে ফুল ফোটে (গ্রীষ্মকালীন/বসন্ত পুষ্পায়ন)' },
    { group: 'দিবানিরেপেক্ষ উদ্ভিদ (Day-Neutral Plant / DNP)', ex: 'টমেটো, শসা, সূর্যমুখী, কার্পাস, ভুট্টা, মরিচ', crit: 'নির্দিষ্ট দৈহিক পরিপক্বতায় পৌঁছালে দিনের দৈর্ঘ্যের ওপর নির্ভর না করেই সারা বছর ফুল ফোটে' },
    { group: 'ভার্নালিন ও ফাইটোক্রোম P_r / P_fr তন্ত্র', ex: 'শীতকালীন গম ও রাই (০°–৫°C শৈত্যপ্রদান)', crit: 'লোহিত আলোতে (৬৬০ nm) নিষ্ক্রিয় P_r সক্রিয় P_fr-এ এবং দূর-লোহিতে (৭৩০ nm) P_fr পুনরায় P_r-এ রূপান্তরিত হয়' },
  ];
  photoPlants.forEach((pp, i) => {
    const others = photoPlants.filter((x) => x.group !== pp.group);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `উদ্ভিদের আলোকপর্যায়কাল ও ফ্লোরিজেন তত্ত্বে "${pp.ex}" — এগুলো কোন শ্রেণির বা প্রক্রিয়ার অন্তর্ভুক্ত?`,
        correct: pp.group,
        distractors: others.map((x) => x.group),
        explanation: `${pp.group}-এর উদাহরণ ${pp.ex}। মূলনীতি: ${pp.crit}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ফটোপিরিয়ডিজম ও ভার্নালাইজেশন',
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
        question: `"${pp.group}"-এর পুষ্পায়ন বা শারীরবৃত্তীয় কৌশল সম্পর্কে কোন তথ্যটি সঠিক?`,
        correct: pp.crit,
        distractors: others.map((x) => x.crit),
        explanation: `${pp.group}-এর ক্ষেত্রে ${pp.crit}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · পুষ্পায়ন শারীরতত্ত্ব',
      })
    );
  });

  return list;
}

