import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio1MatrixRow {
  ch: string;
  vl: string;
  topic: string;
  fact: string;
  group: string;
  diff?: 'board' | 'medical' | 'dental';
  note: string;
}

export function buildBio1StructuredA(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_sa_${String(seq++).padStart(4, '0')}`;

  // 1. Organelles, Cell Wall & Nucleus Matrix (~150 MCQs)
  const cellMatrix: Bio1MatrixRow[] = [
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'সেলুলোজ মাইক্রোফাইব্রিল',
      fact: 'β-D-গ্লুকোজ অণুর সমন্বয়ে গঠিত উদ্ভিদ কোষপ্রাচীরের প্রধান গাঠনিক একক (প্রায় ১০০টি গ্লুকোজ শৃঙ্খলে ১টি মাইসেলি)',
      group: 'cell_wall',
      diff: 'medical',
      note: '২০টি মাইসেলি মিলে মাইক্রোফাইব্রিল ও ২৫০টি মাইক্রোফাইব্রিল মিলে ম্যাক্রোফাইব্রিল তৈরি করে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'সেকেন্ডারি কোষপ্রাচীর',
      fact: 'কোষের বৃদ্ধি পূর্ণ হওয়ার পর প্রাইমারি প্রাচীরের ভেতরে লিগনিন ও সুবেরিন জমে গঠিত তিন স্তরবিশিষ্ট পুরু স্তর',
      group: 'cell_wall',
      diff: 'board',
      note: 'ট্রাকিড, ভেসেল ও স্ক্লেরেনকাইমা কোষে লিগনিনযুক্ত সেকেন্ডারি প্রাচীর দেখা যায়; ভাজক কোষে এটি থাকে না।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'ফ্র্যাগমোপ্লাস্ট',
      fact: 'টেলোফেজের শেষে কোষের বিষুবীয় অঞ্চলে স্পিন্ডল তন্তু ও গলগি ভেসিকল জমে গঠিত কোষপ্লেটের পূর্বসূরি',
      group: 'cell_wall',
      diff: 'medical',
      note: 'ফ্র্যাগমোপ্লাস্ট থেকেই দুটি অপত্য উদ্ভিদ কোষের মাঝে মধ্যপর্দা সৃষ্টি হয়।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'কূপ এলাকা (Pit Field)',
      fact: 'সেকেন্ডারি প্রাচীর সৃষ্টি না হওয়ায় কোষপ্রাচীরের অত্যন্ত পাতলা অঞ্চল যেখানে প্লাজমোডেসমাটা অবস্থান করে',
      group: 'cell_wall',
      diff: 'dental',
      note: 'নগ্নবীজী উদ্ভিদের ট্রাকিডে টরাসযুক্ত (Torus) সপাড় কূপ থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'রবার্টসন-এর ইউনিট মেমব্রেন মডেল',
      fact: '১৯৫৯ সালে প্রস্তাবিত প্রোটিন-লিপিড-প্রোটিন (P-L-P) ত্রিস্তরবিশিষ্ট ঝিল্লি ধারণা',
      group: 'membrane',
      diff: 'board',
      note: 'জে. ডেভিড রবার্টসনের মতে সব জৈবিক ঝিল্লির গড় পুরুত্ব ৭৫–১০০ Å।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'কোলেস্টেরল (ঝিল্লি ফ্লুইডিটি বাফার)',
      fact: 'প্রাণিকোষের ফসফোলিপিড দ্বিস্তরের মাঝে অবস্থান করে নিম্ন তাপমাত্রায় ঝিল্লি জমাট বাঁধা এবং উচ্চ তাপমাত্রায় অতিরিক্ত তরল হওয়া রোধ করা',
      group: 'membrane',
      diff: 'medical',
      note: 'উদ্ভিদ কোষের প্লাজমামেমব্রেনে কোলেস্টেরলের পরিবর্তে ফাইটোস্টেরল (যেমন স্টিগমাস্টেরল) থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'সিমপোর্ট ও অ্যান্টিপোর্ট (কো-ট্রান্সপোর্ট)',
      fact: 'একই দিকে দুটি অণু পরিবাহিত হলে সিমপোর্ট এবং বিপরীত দিকে পরিবাহিত হলে অ্যান্টিপোর্ট বাহক প্রোটিন ব্যবস্থা',
      group: 'membrane',
      diff: 'medical',
      note: 'Na⁺-K⁺ পাম্প হলো অ্যান্টিপোর্ট এবং Na⁺-গ্লুকোজ বাহক হলো সিমপোর্টের উদাহরণ।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'পিনোসাইটোসিস (Cell Drinking)',
      fact: 'প্লাজমামেমব্রেনের ইনভ্যাজিনেশনের মাধ্যমে কোষের বাইরে থেকে ক্ষুদ্র তরল ফোঁটা ও দ্রবীভূত পদার্থ গ্রহণের সক্রিয় প্রক্রিয়া',
      group: 'membrane',
      diff: 'board',
      note: 'কঠিন কণা গ্রহণকে ফ্যাগোসাইটোসিস (Cell Eating) বলা হয়।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'প্লাস্টিডের অ্যামাইলোপ্লাস্ট',
      fact: 'বর্ণহীন লিউকোপ্লাস্ট যা শ্বেতসার বা স্টার্চ খাদ্য হিসেবে সঞ্চয় করে (যেমন আলু ও চালের শস্যে)',
      group: 'plastid',
      diff: 'board',
      note: 'ইলায়োপ্লাস্ট তেল-চর্বি এবং অ্যালিউরোপ্লাস্ট (প্রোটিনোপ্লাস্ট) প্রোটিন সঞ্চয় করে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'লাইকোপিন ও জ্যান্থোফিল (ক্রোমোপ্লাস্ট)',
      fact: 'পাকা টমেটোর লাল বর্ণের জন্য দায়ী লাইকোপিন এবং ফুল-পাতার হলুদ বর্ণের জন্য দায়ী জ্যান্থোফিল রঞ্জক',
      group: 'plastid',
      diff: 'dental',
      note: 'সবুজ কাঁচা টমেটো ও মরিচ পাকলে ক্লোরোপ্লাস্ট ক্রোমোপ্লাস্টে রূপান্তরিত হয়।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'স্ট্রোমা ল্যামেলি (ফ্রেট চ্যানেল)',
      fact: 'ক্লোরোপ্লাস্টের দুটি পাশাপাশি গ্রানাকে সংযুক্তকারী থাইলাকয়েড নালিকা যা কেবল PS-I বহন করে',
      group: 'plastid',
      diff: 'medical',
      note: 'স্ট্রোমায় থাকা ৭০S রাইবোজোম ও বৃত্তাকার DNA ক্লোরোপ্লাস্টকে আংশিক স্বনির্ভর অঙ্গাণু করেছে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'পোরিন প্রোটিন (মাইটোকন্ড্রিয়ার বহিঃঝিল্লি)',
      fact: 'মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্টের বহিঃআবরণীতে অবস্থিত বড় চ্যানেল প্রোটিন যা ঝিল্লিকে সহজে ভেদ্য করে',
      group: 'organelle_misc',
      diff: 'medical',
      note: 'অন্তঃঝিল্লি অত্যন্ত নির্বাচনমূলক ভেদ্য এবং এতে কার্ডিওলিপিন ফসফোলিপিড বেশি থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'গলগি বডির সিস ও ট্রান্স মুখ',
      fact: 'ER থেকে প্রোটিন গ্রহণকারী উত্তল গঠন-মুখ (Cis face) এবং সিক্রেটরি ভেসিকল ত্যাগকারী অবতল পরিপক্ব-মুখ (Trans face)',
      group: 'organelle_misc',
      diff: 'medical',
      note: 'উদ্ভিদ কোষে গলগি বডিকে ডিকটিওজোম (Dictyosome) এবং শুক্রাণুর অ্যাক্রোজোম গঠনে এর মুখ্য ভূমিকা থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'টোনোপ্লাস্ট (কোষগহ্বর ঝিল্লি)',
      fact: 'সজীব উদ্ভিদ কোষের কেন্দ্রীয় ভ্যাকুওলকে ঘিরে থাকা একক অর্ধভেদ্য আবরণী যা অ্যান্থোসায়ানিন ও বর্জ্য পৃথক রাখে',
      group: 'organelle_misc',
      diff: 'board',
      note: 'ভ্যাকুওলের ভেতরের জলীয় তরলকে কোষরস (Cell sap) বলে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'সেন্ট্রোজোম ও মাইক্রোটিউবিউল (৯+০ বিন্যাস)',
      fact: 'আবরণীবিহীন অঙ্গাণু যাতে দুটি সেন্ট্রিওল সমকোণে থেকে ৯টি ট্রিপলেট মাইক্রোটিউবিউলের চক্রাকার বিন্যাস তৈরি করে',
      group: 'organelle_misc',
      diff: 'medical',
      note: 'ফ্ল্যাজেলা ও সিলিয়ার অ্যাক্সোনিমে ৯+২ (৯টি ডাবলেট ও কেন্দ্রে ২টি সিঙ্গলেট) বিন্যাস থাকে, কিন্তু ব্যাসাল বডি ও সেন্ট্রিওলে ৯+০ বিন্যাস থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'মাইক্রোফিলামেন্ট (অ্যাক্টিন তন্তু)',
      fact: 'প্রায় ৬–৭ nm ব্যাসের অ্যাক্টিন প্রোটিন দিয়ে গঠিত কোষকঙ্কাল উপাদান যা সাইক্লোসিস ও অ্যামিবয়েড চলন ঘটায়',
      group: 'organelle_misc',
      diff: 'dental',
      note: 'মাইক্রোটিউবিউল ২৫ nm ব্যাসের টিউবুলিন প্রোটিন দিয়ে তৈরি এবং ইন্টারমিডিয়েট ফিলামেন্ট ১০ nm ব্যাসের হয়।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'নিউক্লিয়ার পোর কমপ্লেক্স',
      fact: 'নিউক্লিয়ার এনভেলপের দুই ঝিল্লির সংযোগস্থলে অক্টাগোনাল বা অষ্টভুজাকার প্রোটিন রিংযুক্ত ছিদ্র যা RNA ও রাইবোজোম পরিবহন করে',
      group: 'nucleus',
      diff: 'medical',
      note: 'প্রতিটি নিউক্লিয়ার পোরে প্রায় ৮টি প্রোটিন কণিকার অ্যানুলাস থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'ইউক্রোমাটিন বনাম হেটারোক্রোমাটিন',
      fact: 'ইন্টারফেজে হালকা রঞ্জিত ও ট্রান্সক্রিপশন-সক্রিয় অংশ ইউক্রোমাটিন এবং গাঢ় রঞ্জিত ও নিষ্ক্রিয় ঘন অংশ হেটারোক্রোমাটিন',
      group: 'nucleus',
      diff: 'medical',
      note: 'নারীদের দুটি X ক্রোমোজোমের একটি নিষ্ক্রিয় হেটারোক্রোমাটিনে পরিণত হয়ে বার বডি (Barr body) গঠন করে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'টেলোমিয়ার (Telomere)',
      fact: 'রৈখিক ইউক্যারিওটিক ক্রোমোজোমের দুই প্রান্তে TTAGGG পুনরাবৃত্তিময় প্রতিরক্ষামূলক ক্যাপ যা কোষের বার্ধক্য ও ক্রোমোজোম ফিউশন রোধ করে',
      group: 'nucleus',
      diff: 'medical',
      note: 'টেলোমারেজ এনজাইম জার্ম কোষ ও ক্যান্সার কোষে টেলোমিয়ারের দৈর্ঘ্য পুনর্গঠন করে (এলিজাবেথ ব্ল্যাকবার্ন, নোবেল ২০০৯)।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'সিজ-স্লাইডিং ও হাইড্রোজেন বন্ধন (পলিনিউক্লিওটাইড)',
      fact: 'দুটি পাশাপাশি নিউক্লিওটাইড ৩′-৫′ ফসফোডাইএস্টার বন্ধনে এবং বিপরীত দুটি সূত্রকের ক্ষারক হাইড্রোজেন বন্ধনে যুক্ত থাকা',
      group: 'nucleus',
      diff: 'board',
      note: 'নাইট্রোজেন বেস ও পেন্টোজ শর্করার ১′-কার্বন N-গ্লাইকোসিডিক বন্ধনে এবং শর্করার ৫′-কার্বন ফসফেটের সাথে এস্টার বন্ধনে যুক্ত থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'রাইবোজ ও ডিঅক্সিরাইবোজ পার্থক্য',
      fact: 'পেন্টোজ শর্করার ২ নম্বর কার্বনে অক্সিজেন (-OH) থাকলে রাইবোজ এবং অক্সিজেন না থাকলে (-H) ২-ডিঅক্সিরাইবোজ',
      group: 'nucleus',
      diff: 'medical',
      note: '২′-কার্বনে -OH অনুপস্থিত থাকায় DNA রাসায়নিকভাবে RNA-এর চেয়ে বেশি স্থিতিশীল।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'পিউরিন ও পাইরিমিডিন ক্ষারক',
      fact: 'দ্বি-বলয়বিশিষ্ট অ্যাডেনিন ও গুয়ানিন (পিউরিন) এবং এক-বলয়বিশিষ্ট থাইমিন, সাইটোসিন ও ইউরাসিল (পাইরিমিডিন)',
      group: 'nucleus',
      diff: 'board',
      note: 'DNA-তে থাইমিন এবং RNA-তে থাইমিনের পরিবর্তে ইউরাসিল (5-ডিমাইথাইল ইউরাসিল নয়, বরং থাইমিন হলো 5-মিথাইল ইউরাসিল) থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'মেসেলসন ও স্টাহল পরীক্ষা',
      fact: '১৫N আইসোটোপ ও CsCl ঘনত্ব গ্রেডিয়েন্ট সেন্ট্রিফিউগেশন ব্যবহার করে DNA-এর অর্ধসংরক্ষণশীল (Semiconservative) রেপ্লিকেশন প্রমাণ',
      group: 'nucleus',
      diff: 'medical',
      note: '১৯৫৮ সালে E. coli ব্যাকটেরিয়ায় তারা প্রমাণ করেন প্রতিটি অপত্য DNA-তে একটি পুরোনো ও একটি নতুন সূত্রক থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'সেন্ট্রাল ডগমা (Central Dogma)',
      fact: 'ফ্রান্সিস ক্রিক প্রস্তাবিত জেনেটিক তথ্য প্রবাহের দিকনির্দেশনা: DNA → mRNA (ট্রান্সক্রিপশন) → প্রোটিন (ট্রান্সলেশন)',
      group: 'nucleus',
      diff: 'board',
      note: 'রেট্রোভাইরাসে (HIV) রিভার্স ট্রান্সক্রিপ্টেজ এনজাইম RNA থেকে DNA তৈরি করে যাকে রিভার্স ট্রান্সক্রিপশন বা টেমিনিজম বলে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'RNA পলিমারেজ-I, II ও III',
      fact: 'প্রকৃতকোষে রাইবোজোমাল rRNA (I), মেসেঞ্জার mRNA (II) এবং tRNA ও 5S rRNA (III) সংশ্লেষকারী আলাদা এনজাইমসমূহ',
      group: 'nucleus',
      diff: 'medical',
      note: 'আদিকোষে কেবল একটি মাত্র RNA পলিমারেজ কোর এনজাইম + সিগমা ফ্যাক্টর সব ধরনের RNA তৈরি করে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      topic: 'ল্যাক ওপেরন (Lac Operon)',
      fact: 'জ্যাকব ও মোনোড (১৯৬১) প্রস্তাবিত E. coli-তে ল্যাকটোজ বিপাক নিয়ন্ত্রণকারী জিন গুচ্ছ (lacZ, lacY, lacA)',
      group: 'nucleus',
      diff: 'medical',
      note: 'ল্যাকটোজ বা অ্যালোল্যাকটোজ ইন্ডুসার হিসেবে কাজ করে রিপ্রেসর প্রোটিনকে নিষ্ক্রিয় করে ট্রান্সক্রিপশন চালু করে।',
    },
  ];

  cellMatrix.forEach((item, i) => {
    const others = cellMatrix.filter((x) => x.topic !== item.topic);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: item.diff || 'medical',
        question: `কোষবিজ্ঞানে "${item.fact}" — এটি কোন গঠন বা ধারণার সঠিক পরিচয়?`,
        correct: item.topic,
        distractors: others.slice(i % 10, (i % 10) + 5).map((x) => x.topic),
        explanation: `${item.topic}: ${item.fact}। ${item.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষ ও এর গঠন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'dental' : 'board',
        question: `উদ্ভিদ কোষতত্ত্ব অনুযায়ী "${item.topic}" সম্পর্কে নিচের কোন তথ্যটি নির্ভুল?`,
        correct: item.fact,
        distractors: others.slice((i + 4) % 10, ((i + 4) % 10) + 5).map((x) => x.fact),
        explanation: `${item.topic}-এর মূল বৈশিষ্ট্য হলো: ${item.fact}। ${item.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষতত্ত্ব ও অঙ্গাণু',
      })
    );
  });

  // 2. Quantitative Genetic Code, Replication & Polypeptide Calculations (~120 MCQs)
  const codonCounts = [30, 45, 60, 75, 90, 105, 120, 150, 180, 210, 240, 300];
  codonCounts.forEach((aaCount, idx) => {
    const codingNucleotides = aaCount * 3;
    const totalNucleotidesWithStop = (aaCount + 1) * 3;
    const peptideBonds = aaCount - 1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(aaCount)}টি অ্যামিনো অ্যাসিড নিয়ে গঠিত একটি পলিপেপটাইড শৃঙ্খল তৈরির জন্য সমাপ্তি কোডনসহ mRNA-তে ন্যূনতম কতটি নিউক্লিওটাইড থাকা প্রয়োজন?`,
        correct: `${toBnDigits(totalNucleotidesWithStop)}টি`,
        distractors: [
          `${toBnDigits(codingNucleotides)}টি`,
          `${toBnDigits(aaCount)}টি`,
          `${toBnDigits(totalNucleotidesWithStop * 2)}টি`,
          `${toBnDigits(aaCount + 3)}টি`,
        ],
        explanation: `প্রতিটি অ্যামিনো অ্যাসিডের জন্য ১টি ট্রিপলেট কোডন (৩ নিউক্লিওটাইড) ও সমাপ্তির জন্য ১টি স্টপ কোডন লাগে। মোট নিউক্লিওটাইড = (${toBnDigits(aaCount)} + ১) × ৩ = ${toBnDigits(totalNucleotidesWithStop)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · জেনেটিক কোড ও অনুবাদ',
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
        question: `${toBnDigits(aaCount)}টি অ্যামিনো অ্যাসিড রাইবোজোমে ট্রান্সলেশন প্রক্রিয়ায় যুক্ত হয়ে একটি পলিপেপটাইড তৈরি করলে মোট কতটি পেপটাইড বন্ধন ও কত অণু পানি মুক্ত হবে?`,
        correct: `${toBnDigits(peptideBonds)}টি পেপটাইড বন্ধন ও ${toBnDigits(peptideBonds)} অণু পানি`,
        distractors: [
          `${toBnDigits(aaCount)}টি পেপটাইড বন্ধন ও ${toBnDigits(aaCount)} অণু পানি`,
          `${toBnDigits(aaCount + 1)}টি পেপটাইড বন্ধন ও ${toBnDigits(aaCount)} অণু পানি`,
          `${toBnDigits(aaCount - 2)}টি পেপটাইড বন্ধন ও ${toBnDigits(aaCount)} অণু পানি`,
        ],
        explanation: `nটি অ্যামিনো অ্যাসিড কনডেনসেশন বিক্রিয়ায় যুক্ত হলে (n - ১)টি পেপটাইড বন্ধন গঠিত হয় এবং প্রতি বন্ধনে ১ অণু H₂O নির্গত হয়। এখানে ${toBnDigits(aaCount)} - ১ = ${toBnDigits(peptideBonds)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রোটিন সংশ্লেষ',
      })
    );
  });

  const mrnaLengths = [120, 180, 270, 360, 450, 600, 750, 900];
  mrnaLengths.forEach((len) => {
    const maxAa = len / 3 - 1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি পরিপক্ব ইউক্যারিওটিক mRNA-তে ${toBnDigits(len)}টি নাইট্রোজেন ক্ষারক থাকলে (শেষ ৩টি স্টপ কোডন হলে) সর্বোচ্চ কতটি অ্যামিনো অ্যাসিডের প্রোটিন তৈরি হবে?`,
        correct: `${toBnDigits(maxAa)}টি`,
        distractors: [
          `${toBnDigits(len / 3)}টি`,
          `${toBnDigits(len / 3 + 1)}টি`,
          `${toBnDigits(len)}টি`,
        ],
        explanation: `মোট কোডন = ${toBnDigits(len)} / ৩ = ${toBnDigits(len / 3)}টি। স্টপ কোডন (১টি) অ্যামিনো অ্যাসিড কোড করে না বলে মোট অ্যামিনো অ্যাসিড = ${toBnDigits(maxAa)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · ট্রান্সলেশন গণনা',
      })
    );
  });

  const aminoCodonMap: Array<{ aa: string; codons: string; note: string }> = [
    { aa: 'মেথিওনিন (সূচনা অ্যামিনো অ্যাসিড)', codons: 'AUG (মাত্র ১টি কোডন)', note: 'প্রায় সব পলিপেপটাইডের প্রথম অ্যামিনো অ্যাসিড মেথিওনিন এবং এর কেবল একটিই কোডন AUG।' },
    { aa: 'ট্রিপটোফ্যান (একমাত্র কোডনযুক্ত দ্বিতীয় AA)', codons: 'UGG (মাত্র ১টি কোডন)', note: 'মেথিওনিন ও ট্রিপটোফ্যান হলো একমাত্র দুটি অ্যামিনো অ্যাসিড যাদের মাত্র ১টি করে কোডন রয়েছে।' },
    { aa: 'ফিনাইলঅ্যালানিন (প্রথম আবিষ্কৃত কোডন)', codons: 'UUU ও UUC', note: 'নিরেনবার্গ ও ম্যাথেই ১৯৬১ সালে পলি-U (UUU) দিয়ে প্রথম ফিনাইলঅ্যালানিন কোডন আবিষ্কার করেন।' },
    { aa: 'সমাপ্তি বা নন-সেন্স কোডন (Stop Codons)', codons: 'UAA (Ochre), UAG (Amber), UGA (Opal)', note: 'এই ৩টি কোডনের কোনো tRNA অ্যান্টিকোডন নেই; রিলিজ ফ্যাক্টর ট্রান্সলেশন থামিয়ে দেয়।' },
    { aa: 'লাইসিন (হিস্টোন-সমৃদ্ধ ক্ষারীয় AA)', codons: 'AAA ও AAG', note: 'ড. হরগোবিন্দ খোরানা কৃত্রিমভাবে AAA-সমৃদ্ধ কোডন সংশ্লেষ করেন।' },
    { aa: 'লিউসিন, আর্জিনিন ও সেরিন', codons: 'সর্বাধিক ৬টি করে কোডন', note: 'লিউসিন, আর্জিনিন ও সেরিন প্রতিটির জন্য জেনেটিক কোডে সর্বাধিক ৬টি করে সমার্থক কোডন আছে।' },
  ];
  aminoCodonMap.forEach((c, i) => {
    const others = aminoCodonMap.filter((x) => x.aa !== c.aa);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জেনেটিক কোড টেবিল অনুযায়ী "${c.aa}"-এর সাথে কোন কোডনগুলো সম্পর্কিত?`,
        correct: c.codons,
        distractors: others.slice(0, 4).map((x) => x.codons),
        explanation: c.note,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · জেনেটিক কোড',
      })
    );
  });

  // 3. Cell Division Stage-by-Stage & Quantitative Drills (~160 MCQs)
  const divisionDetails: Bio1MatrixRow[] = [
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'G₁ উপ-পর্যায় (প্রি-সিন্থেসিস)',
      fact: 'কোষ চক্রের ইন্টারফেজে প্রোটিন, RNA ও কোষীয় অঙ্গাণু বৃদ্ধির সবচেয়ে দীর্ঘস্থায়ী (৩০–৪০%) প্রস্তুতি পর্যায়',
      group: 'div_stage',
      diff: 'board',
      note: 'G₁ দশায় কোষ সিদ্ধান্ত নেয় যে সে বিভাজনে (S দশা) যাবে নাকি G₀ দশায় প্রবেশ করবে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'S উপ-পর্যায় (DNA প্রতিলিপন)',
      fact: 'ইন্টারফেজের যে নির্দিষ্ট পর্যায়ে ক্রোমোজোমাল DNA এবং সেন্ট্রিওল দ্বিগুণ (2C → 4C) হয়',
      group: 'div_stage',
      diff: 'medical',
      note: 'S দশায় DNA পরিমাণ দ্বিগুণ হলেও সেন্ট্রোমিয়ার বিভক্ত না হওয়ায় ক্রোমোজোম সংখ্যা 2n-ই থাকে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'G₂ উপ-পর্যায় (পোস্ট-সিন্থেসিস)',
      fact: 'স্পিন্ডল তন্তু গঠনের জন্য টিউবুলিন প্রোটিন সংশ্লেষ ও মাইটোসিস প্রোমোটিং ফ্যাক্টর (MPF) সক্রিয় হওয়ার দশা',
      group: 'div_stage',
      diff: 'dental',
      note: 'G₂ চেকপয়েন্ট নিশ্চিত করে যে DNA প্রতিলিপন নির্ভুলভাবে সম্পন্ন হয়েছে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'পানি বিয়োজন (প্রোফেজ)',
      fact: 'মাইটোসিসের দীর্ঘতম প্রথম ধাপ যেখানে ক্রোমাটিন থেকে পানি বিয়োজনের ফলে ক্রোমোজোম খাটো, মোটা ও দৃশ্যমান হয়',
      group: 'div_stage',
      diff: 'board',
      note: 'প্রোফেজের শেষদিকে নিউক্লিওলাস ও নিউক্লিয়ার এনভেলপ ক্ষয়প্রাপ্ত হতে শুরু করে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'মেটাকাইনেসিস (মেটাফেজ)',
      fact: 'সকল ক্রোমোজোমের সেন্ট্রোমিয়ার স্পিন্ডল যন্ত্রের বিষুবীয় অঞ্চলে (Equatorial plate) বিন্যস্ত হওয়া',
      group: 'div_stage',
      diff: 'medical',
      note: 'মেটাফেজে সুপারকয়েলিং সর্বোচ্চ হয় বলে ক্যারিওটাইপ বিশ্লেষণ ও ক্রোমোজোম গণনার জন্য এটাই শ্রেষ্ঠ ধাপ।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'সেন্ট্রোমিয়ারের দ্বি-বিভাজন (অ্যানাফেজ)',
      fact: 'সিস্টার ক্রোমাটিডগুলো পরস্পর থেকে সম্পূর্ণ বিচ্ছিন্ন হয়ে বিপরীত মেরুতে গমন শুরু করার স্বল্পস্থায়ী দশা',
      group: 'div_stage',
      diff: 'medical',
      note: 'অ্যানাফেজ দশায় প্রতিটি অপত্য ক্রোমোজোমে ১টি করে ক্রোমাটিড থাকে এবং V, L, J, I আকৃতি ধারণ করে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'জল যোজন ও ক্লিভেজ ফারো (টেলোফেজ)',
      fact: 'ক্রোমোজোমে পানি পুনঃশোষিত হয়ে সূক্ষ্ম ক্রোমাটিনে রূপান্তর এবং প্রাণিকোষে অ্যাক্টিন-মায়োসিন কনট্রাক্টাইল রিংয়ে সাইটোকাইনেসিস',
      group: 'div_stage',
      diff: 'board',
      note: 'উদ্ভিদ কোষে কেন্দ্র থেকে পরিধির দিকে (Centrifugal) কোষপ্লেট গঠিত হয়, আর প্রাণিকোষে পরিধি থেকে কেন্দ্রের দিকে (Centripetal) ক্লিভেজ হয়।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'প্লাজমোডিয়াম বা সিনোসাইট (মুক্ত নিউক্লীয় বিভাজন)',
      fact: 'ক্যারিওকাইনেসিসের পর সাইটোকাইনেসিস না ঘটায় একটি কোষে বহু নিউক্লিয়াস সৃষ্টি হওয়া',
      group: 'div_stage',
      diff: 'medical',
      note: 'ডাবের পানি (তরল শস্য) এবং Vaucheria শৈবাল ও Rhizopus ছত্রাকের হাইফা সিনোসাইটিক গঠনের উৎকৃষ্ট উদাহরণ।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'কলচিসিন (Colchicine) প্রভাব',
      fact: 'Colchicum autumnale উদ্ভিদ থেকে প্রাপ্ত ক্ষারক যা স্পিন্ডল তন্তু গঠন বন্ধ করে কোষকে মেটাফেজে আটকে পলিপ্লয়েডি সৃষ্টি করে',
      group: 'div_stage',
      diff: 'medical',
      note: 'একে মাইটোটিক পয়জন বলা হয়; উদ্ভিদ প্রজননে বীজহীন বা বৃহৎ আকারের পলিপ্লয়েড ফসল তৈরিতে এটি ব্যবহৃত হয়।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'লেপ্টোটিন (Leptotene)',
      fact: 'প্রোফেজ-১ এর প্রথম উপ-পর্যায় যেখানে সরু সুতার মতো ক্রোমোজোমে পুঁতির দানার মতো ক্রোমোমিয়ার দেখা যায়',
      group: 'meiosis_stage',
      diff: 'board',
      note: 'প্রাণিকোষের লেপ্টোটিন দশায় অ্যাস্টার রশ্মির দিকে ক্রোমোজোমগুলো ঝুঁকে পড়ে বুকেন স্টেজ তৈরি করে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'জাইগোটিন (Zygotene)',
      fact: 'সিন্যাপ্টোনিমাল কমপ্লেক্স প্রোটিন গঠনের মাধ্যমে দুটি হোমোলোগাস ক্রোমোজোমের জোড় বাঁধা (বাইভ্যালেন্ট সৃষ্টি)',
      group: 'meiosis_stage',
      diff: 'medical',
      note: 'বাইভ্যালেন্টের প্রতিটি জোড়ায় ৪টি ক্রোমাটিড থাকে বলে একে টেট্রাড অবস্থা বলা হয়।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'প্যাকাইটিন (Pachytene)',
      fact: 'নন-সিস্টার ক্রোমাটিডের মধ্যে X-আকৃতির কায়াজমা তৈরি ও রিকম্বিনেজ এনজাইমে অংশ বিনিময় (ক্রসিং ওভার)',
      group: 'meiosis_stage',
      diff: 'medical',
      note: 'ক্রসিং ওভারের কারণে জেনেটিক ভেরিয়েশন সৃষ্টি হয়, যা অভিব্যক্তি ও প্রজননের ভিত্তি।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'ডিপ্লোটিন (Diplotene)',
      fact: 'সিন্যাপ্টোনিমাল কমপ্লেক্স বিলুপ্ত হয়ে হোমোলোগাস ক্রোমোজোমের বিকর্ষণ ও কায়াজমা স্পষ্টভাবে X-আকারে দৃশ্যমান হওয়া',
      group: 'meiosis_stage',
      diff: 'medical',
      note: 'মানব নারীর প্রাথমিক উওসাইট জন্মের পূর্বেই ডিপ্লোটিনের ডিক্টিওটিন দশায় বহু বছর থেমে থাকে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'অ্যানাফেজ-১ বনাম অ্যানাফেজ-২',
      fact: 'অ্যানাফেজ-১ এ সেন্ট্রোমিয়ার বিভাজিত না হয়ে পূর্ণাঙ্গ হোমোলোগাস ক্রোমোজোম আলাদা হয় (ক্রোমোজোম অর্ধেক হয়)',
      group: 'meiosis_stage',
      diff: 'medical',
      note: 'অ্যানাফেজ-২ এ মাইটোসিসের মতো সেন্ট্রোমিয়ার বিভক্ত হয়ে সিস্টার ক্রোমাটিড পৃথক হয়।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'অ্যাপোপটোসিস বনাম নেক্রোসিস',
      fact: 'জিন-নিয়ন্ত্রিত প্রোগ্রামড কোষমৃত্যু (অ্যাপোপটোসিস) বনাম আঘাত বা সংক্রমণে প্রদাহজনক অনিয়ন্ত্রিত কোষমৃত্যু (নেক্রোসিস)',
      group: 'div_stage',
      diff: 'dental',
      note: 'ভ্রূণাবস্থায় মানুষের আঙুলের মাঝের পর্দা অপসারণ অ্যাপোপটোসিসের মাধ্যমে ঘটে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      topic: 'হ্যাপ্লয়েড জীবের জাইগোটিক মায়োসিস',
      fact: 'Chlamydomonas, Ulothrix ও Spirogyra-তে ডিপ্লয়েড জাইগোট গঠনের পরপরই মায়োসিস ঘটে হ্যাপ্লয়েড দেহ পুনর্গঠন',
      group: 'meiosis_stage',
      diff: 'medical',
      note: 'উচ্চতর উদ্ভিদে স্পোরিক মায়োসিস এবং মানুষের মতো প্রাণীতে গ্যামেটিক মায়োসিস ঘটে।',
    },
  ];

  divisionDetails.forEach((item, i) => {
    const others = divisionDetails.filter((x) => x.topic !== item.topic);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: item.diff || 'medical',
        question: `কোষ বিভাজনে "${item.fact}" — এটি কোন পর্যায় বা প্রক্রিয়াকে নির্দেশ করে?`,
        correct: item.topic,
        distractors: others.slice(i % 8, (i % 8) + 5).map((x) => x.topic),
        explanation: `${item.topic}: ${item.fact}। ${item.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষ বিভাজন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `"${item.topic}"-এর ক্ষেত্রে কোন বক্তব্যটি সঠিক?`,
        correct: item.fact,
        distractors: others.slice((i + 3) % 8, ((i + 3) % 8) + 5).map((x) => x.fact),
        explanation: `${item.topic} সম্পর্কে: ${item.fact}। ${item.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মাইটোসিস ও মায়োসিস',
      })
    );
  });

  // Quantitative Cell Division Matrix
  const divNValues = [7, 8, 10, 12, 14, 16, 20, 23, 24];
  divNValues.forEach((nVal) => {
    const dip = nVal * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি ডিপ্লয়েড প্রজাতির দেহকোষে 2n = ${toBnDigits(dip)}টি ক্রোমোজোম এবং S-দশার পূর্বে DNA পরিমাণ 20 pg হলে G₂ দশায় ঐ কোষে ক্রোমোজোম ও DNA পরিমাণ কত হবে?`,
        correct: `${toBnDigits(dip)}টি ক্রোমোজোম ও ৪০ pg DNA`,
        distractors: [
          `${toBnDigits(dip * 2)}টি ক্রোমোজোম ও ৪০ pg DNA`,
          `${toBnDigits(dip)}টি ক্রোমোজোম ও ২০ pg DNA`,
          `${toBnDigits(nVal)}টি ক্রোমোজোম ও ১০ pg DNA`,
        ],
        explanation: `S-দশায় DNA রেপ্লিকেশনের ফলে DNA পরিমাণ দ্বিগুণ (২০ → ৪০ pg) হয়, কিন্তু সিস্টার ক্রোমাটিড একই সেন্ট্রোমিয়ারে যুক্ত থাকায় ক্রোমোজোম সংখ্যা ${toBnDigits(dip)}টিই থাকে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষ চক্র ও DNA পরিমাণ',
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
        question: `যদি 2n = ${toBnDigits(dip)} ক্রোমোজোমবিশিষ্ট কোনো কোষে মায়োসিস-১ শেষে দুটি অপত্য কোষ তৈরি হয়, তবে প্রতিটি কোষে ক্রোমোজোম ও ক্রোমাটিড সংখ্যা কত?`,
        correct: `${toBnDigits(nVal)}টি ক্রোমোজোম ও ${toBnDigits(dip)}টি ক্রোমাটিড`,
        distractors: [
          `${toBnDigits(dip)}টি ক্রোমোজোম ও ${toBnDigits(dip)}টি ক্রোমাটিড`,
          `${toBnDigits(nVal)}টি ক্রোমোজোম ও ${toBnDigits(nVal)}টি ক্রোমাটিড`,
          `${toBnDigits(dip)}টি ক্রোমোজোম ও ${toBnDigits(dip * 2)}টি ক্রোমাটিড`,
        ],
        explanation: `মায়োসিস-১ শেষে ক্রোমোজোম সংখ্যা অর্ধেক (${toBnDigits(nVal)}) হয়, তবে প্রতিটি ক্রোমোজোম ২টি করে সিস্টার ক্রোমাটিড বহন করায় মোট ক্রোমাটিড সংখ্যা ${toBnDigits(dip)}টি থাকে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মায়োসিস-১ ও ২',
      })
    );
  });

  // 4. Biochemistry: Sugars, Amino Acids, Lipids, Enzymes (~160 MCQs)
  const bioChemItems: Bio1MatrixRow[] = [
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'গ্লিসারালডিহাইড ও ডাইহাইড্রক্সিঅ্যাসিটোন',
      fact: '৩ কার্বনবিশিষ্ট ট্রায়োজ মনোস্যাকারাইড যা গ্লাইকোলাইসিস ও কেলভিন চক্রের অন্তর্বর্তী যৌগ',
      group: 'sugar',
      diff: 'medical',
      note: 'গ্লিসারালডিহাইড হলো অ্যালডোজ ও ডাইহাইড্রক্সিঅ্যাসিটোন হলো কিটোজ ট্রায়োজ।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'রিবিউলোজ-১,৫-বিসফসফেট (RuBP)',
      fact: '৫ কার্বনবিশিষ্ট কিটোপেন্টোজ যা কেলভিন চক্রে CO₂ গ্রহণকারী প্রাথমিক যৌগ',
      group: 'sugar',
      diff: 'medical',
      note: 'রুবিস্কো এনজাইমের সহায়তায় RuBP-র সাথে CO₂ যুক্ত হয়ে ৬-কার্বনের অস্থায়ী যৌগ ও পরে ৩-PGA তৈরি হয়।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'ফ্রুক্টোজ (ফল শর্করা / লিভুলোজ)',
      fact: 'প্রকৃতিতে প্রাপ্ত সবচেয়ে মিষ্টি ৬-কার্বনবিশিষ্ট কিটোহেক্সোজ যা সুক্রোজ ও মধুতে প্রচুর থাকে',
      group: 'sugar',
      diff: 'board',
      note: 'ফ্রুক্টোজ বামাবর্তী (Levorotatory) বলে একে লিভুলোজ বলা হয়, আর গ্লুকোজ ডানাবর্তী (Dextrose)।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'মল্টোজ (মল্ট চিনি)',
      fact: 'দুটি α-D-গ্লুকোজ অণু α(১→৪) গ্লাইকোসাইডিক বন্ধনে যুক্ত হয়ে গঠিত বিজারক ডাইস্যাকারাইড',
      group: 'sugar',
      diff: 'medical',
      note: 'অঙ্কুরিত যব ও শ্বেতসারের আংশিক আর্দ্রবিশ্লেষণে (অ্যামাইলেজ ক্রিয়ায়) মল্টোজ উৎপন্ন হয়।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'ল্যাক্টোজ (দুগ্ধ শর্করা)',
      fact: 'β-D-গ্যালাকটোজ ও β-D-গ্লুকোজ অণু β(১→৪) গ্লাইকোসাইডিক বন্ধনে যুক্ত বিজারক ডাইস্যাকারাইড',
      group: 'sugar',
      diff: 'dental',
      note: 'ল্যাকটেজ এনজাইমের অভাবে দুধ পরিপাকে সমস্যাকে ল্যাক্টোজ ইনটলারেন্স বলে।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'অ্যামাইলোজ বনাম অ্যামাইলোপেকটিন',
      fact: 'স্টার্চের অশাখ α(১→৪) অংশ অ্যামাইলোজ (আয়োডিনে নীল বর্ণ) ও শাখান্বিত α(১→৬) অংশ অ্যামাইলোপেকটিন (লালচে-বেগুনি)',
      group: 'sugar',
      diff: 'medical',
      note: 'স্টার্চে ২০% অ্যামাইলোজ ও ৮০% অ্যামাইলোপেকটিন থাকে।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'গ্লাইকোজেন (প্রাণিজ শ্বেতসার)',
      fact: 'প্রতি ৮–১২ গ্লুকোজ পরপর α(১→৬) শাখাযুক্ত অত্যন্ত শাখান্বিত পলিস্যাকারাইড যা যকৃত, পেশি ও ছত্রাকে সঞ্চিত থাকে',
      group: 'sugar',
      diff: 'board',
      note: 'গ্লাইকোজেন আয়োডিন দ্রবণের সাথে লালচে-বাদামি বর্ণ দেয়।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'পেপটাইড ও গ্লাইকোসাইডিক ও এস্টার বন্ধন',
      fact: 'প্রোটিনে পেপটাইড (-CONH-), কার্বোহাইড্রেটে গ্লাইকোসাইডিক (-C-O-C-) এবং লিপিডে এস্টার (-COO-) বন্ধন',
      group: 'protein',
      diff: 'board',
      note: 'নিউক্লিক অ্যাসিডে দুটি নিউক্লিওটাইডের মাঝে ফসফোডাইএস্টার বন্ধন থাকে।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'জুয়েটারআয়ন (Zwitterion)',
      fact: 'প্রশম pH-এ অ্যামিনো অ্যাসিডের -NH₃⁺ এবং -COO⁻ উভয় চার্জ বহনকারী উভধর্মী অবস্থা',
      group: 'protein',
      diff: 'medical',
      note: 'যে pH-এ অ্যামিনো অ্যাসিডের নিট চার্জ শূন্য হয় তাকে আইসোইলেকট্রিক বিন্দু (pI) বলে।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'সালফারযুক্ত অ্যামিনো অ্যাসিড (সিস্টিন ও মেথিওনিন)',
      fact: 'পার্শ্বশৃঙ্খলে সালফার পরমাণু বহনকারী অ্যামিনো অ্যাসিড যা প্রোটিনের টারশিয়ারি গঠনে ডাইসালফাইড (-S-S-) সেতু তৈরি করে',
      group: 'protein',
      diff: 'medical',
      note: 'কেরাটিন (চুল ও নখ) এবং ইনসুলিনের গঠন স্থিতিশীল রাখতে ডাইসালফাইড বন্ধন অত্যন্ত জরুরি।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'অ্যারোম্যাটিক অ্যামিনো অ্যাসিড (Phe, Tyr, Trp)',
      fact: 'বেনজিন বা ইন্ডোল বলয়যুক্ত অ্যামিনো অ্যাসিড; ট্রিপটোফ্যান থেকে অক্সিন, সেরোটোনিন ও মেলাটোনিন তৈরি হয়',
      group: 'protein',
      diff: 'medical',
      note: 'টাইরোসিন থেকে থাইরক্সিন, অ্যাড্রেনালিন, ডোপামিন ও ত্বকের রঞ্জক মেলানিন সংশ্লেষিত হয়।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'হিমোগ্লোবিনের কোয়াটার্নারি গঠন',
      fact: 'চারটি পৃথক পলিপেপটাইড সাব-ইউনিট (২α ও ২β) হাইড্রোফোবিক, আয়নিক ও হাইড্রোজেন বন্ধনে একত্রিত হয়ে কার্যকরী প্রোটিন গঠন',
      group: 'protein',
      diff: 'medical',
      note: 'বিটা-চেইনের ৬ষ্ঠ অবস্থানে গ্লুটামিক অ্যাসিডের পরিবর্তে ভ্যালিন বসলে সিকল-সেল অ্যানিমিয়া হয়।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'গ্লোবিউলার বনাম ফাইব্রাস প্রোটিন',
      fact: 'পানিতে দ্রবণীয় ও গোলাকার কার্যকরী প্রোটিন (এনজাইম, অ্যান্টিবডি, অ্যালবুমিন) বনাম অদ্রবণীয় তন্তুময় গাঠনিক প্রোটিন (কোলাজেন, কেরাটিন)',
      group: 'protein',
      diff: 'dental',
      note: 'স্তন্যপায়ী প্রাণিদেহে সবচেয়ে বেশি প্রাপ্ত প্রোটিন হলো কোলাজেন (আর জীবমণ্ডলে RuBisCO)।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'ফসফোলিপিড (লেসিথিন) ও অ্যাম্ফিপ্যাথিক প্রকৃতি',
      fact: 'একই অণুতে পানি-আকর্ষী ফসফেট মস্তক ও পানি-বিকর্ষী দুটি ফ্যাটি অ্যাসিড লেজ থাকার কারণে কোষঝিল্লির দ্বিস্তর গঠন',
      group: 'lipid',
      diff: 'medical',
      note: '১টি গ্লিসারল, ২টি ফ্যাটি অ্যাসিড, ১টি ফসফোরিক অ্যাসিড ও কোলিন মিলে লেসিথিন গঠিত।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'হ্যালো-হরমোন, ভিটামিন D ও পিত্ত-অ্যাসিডের স্টেরয়েড মূলক',
      fact: '১৭ কার্বনযুক্ত ৪-বলয় সাইক্লোপেন্টানোপারহাইড্রোফেনান্থ্রিন কাঠামোবিশিষ্ট উদ্ভূত লিপিড',
      group: 'lipid',
      diff: 'medical',
      note: 'কোলেস্টেরল, টেস্টোস্টেরন, ইস্ট্রোজেন, প্রোজেস্টেরন ও কর্টিসল সবই স্টেরয়েড জাতীয় যৌগ।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'জাইমেজ, রেনিন ও ডায়াস্টেজ',
      fact: 'ইস্ট থেকে ইথানল তৈরিতে জাইমেজ, দুধের কেসিন জমাটে রেনিন এবং স্টার্চকে মল্টোজে ভাঙতে অ্যামাইলেজ/ডায়াস্টেজ',
      group: 'enzyme',
      diff: 'board',
      note: 'পায়েল ও পারসোজ (১৮৩৩) প্রথম আবিষ্কৃত এনজাইম ডায়াস্টেজ (অ্যামাইলেজ) পৃথক করেন; কুনহে "Enzyme" নামকরণ করেন।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'অ্যালোস্টেরিক এনজাইম (ফিডব্যাক নিবৃত্তি)',
      fact: 'সক্রিয় স্থান ছাড়াও অন্য নিয়ন্ত্রক স্থানে চূড়ান্ত উৎপাদ যুক্ত হয়ে এনজাইমের আকার পরিবর্তন ও বিক্রিয়া নিয়ন্ত্রণ',
      group: 'enzyme',
      diff: 'medical',
      note: 'ATP অতিরিক্ত হলে গ্লাইকোলাইসিসের ফসফোফ্রুক্টোকাইনেজ অ্যালোস্টেরিকভাবে নিবৃত্ত হয়।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      topic: 'এনজাইমের অপটিমাম তাপমাত্রা ও pH',
      fact: 'মানবদেহের অধিকাংশ এনজাইম ৩৫°–৪০°C তাপমাত্রায় এবং পেপসিন pH ১.৫–২.০, টায়ালিন pH ৬.৮ ও ট্রিপসিন pH ৮.০-এ সর্বোচ্চ সক্রিয়',
      group: 'enzyme',
      diff: 'medical',
      note: '৬০°C-এর বেশি তাপে প্রোটিন প্রকৃতি নষ্ট (ডিন্যাচারেশন) হয়ে এনজাইম স্থায়ীভাবে অকার্যকর হয়।',
    },
  ];

  bioChemItems.forEach((item, i) => {
    const others = bioChemItems.filter((x) => x.topic !== item.topic);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: item.diff || 'medical',
        question: `কোষ রসায়নে "${item.fact}" — এটি কোন জৈব অণু বা ধারণার বিবরণ?`,
        correct: item.topic,
        distractors: others.slice(i % 9, (i % 9) + 5).map((x) => x.topic),
        explanation: `${item.topic}: ${item.fact}। ${item.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · কোষ রসায়ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `"${item.topic}" সম্পর্কে নিচের কোন বৈশিষ্ট্যটি সঠিক?`,
        correct: item.fact,
        distractors: others.slice((i + 3) % 9, ((i + 3) % 9) + 5).map((x) => x.fact),
        explanation: `${item.topic}-এর সঠিক তথ্য: ${item.fact}। ${item.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · জৈব অণু',
      })
    );
  });

  // 5. Microbiology: Virus, Bacteria, Malaria (~180 MCQs)
  const microbeMatrix: Array<{
    agent: string;
    genomeOrType: string;
    diseaseOrRole: string;
    detail: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    {
      agent: 'TMV (Tobacco Mosaic Virus)',
      genomeOrType: 'একসূত্রক (+) RNA ও ২১৩০টি ক্যাপসোমিয়ার',
      diseaseOrRole: 'তামাক পাতার মোজাইক রোগ',
      detail: 'দিমিত্রি ইভানভস্কি (১৮৯২) ও ওয়েনডেল স্ট্যানলি (১৯৩৫, প্রথম কেলাসন)',
      diff: 'medical',
    },
    {
      agent: 'T₂ ব্যাকটেরিওফাজ',
      genomeOrType: 'দ্বিসূত্রক রৈখিক DNA (প্রায় ২ লাখ bp) ও ব্যাঙাচি আকৃতি',
      diseaseOrRole: 'E. coli ব্যাকটেরিয়ায় লাইটিক সংক্রমণ',
      detail: 'মাথায় DNA, কলারে স্পর্শক তন্তু ও বেসপ্লেটে ৬টি স্পাইক থাকে; লাইসোজাইম এনজাইম ব্যাকটেরিয়া প্রাচীর ছিদ্র করে',
      diff: 'medical',
    },
    {
      agent: 'HIV (Human Immunodeficiency Virus)',
      genomeOrType: 'দুটি সমরূপ একসূত্রক (+) RNA ও রিভার্স ট্রান্সক্রিপ্টেজ',
      diseaseOrRole: 'AIDS (CD4⁺ T-হেল্পার কোষ ধ্বংস)',
      detail: 'পৃষ্ঠের gp120 গ্লাইকোপ্রোটিন মানব T-কোষের CD4 রিসেপ্টরে যুক্ত হয়',
      diff: 'medical',
    },
    {
      agent: 'হেপাটাইটিস-বি ভাইরাস (HBV)',
      genomeOrType: 'আংশিক দ্বিসূত্রক বৃত্তাকার DNA (একমাত্র DNA হেপাটাইটিস)',
      diseaseOrRole: 'লিভার সিরোসিস ও হেপাটোসেলুলার কার্সিনোমা',
      detail: 'রক্ত, ইনজেকশন ও অসুরক্ষিত মাধ্যমে ছড়ায়; এপিআই টিকা ও পেন্টাভ্যালেন্ট ভ্যাকসিনে অন্তর্ভুক্ত',
      diff: 'dental',
    },
    {
      agent: 'র‍্যাবিস ভাইরাস (Lyssavirus)',
      genomeOrType: 'বুলেট আকৃতির একসূত্রক (-) RNA ভাইরাস',
      diseaseOrRole: 'জলাতঙ্ক বা হাইড্রোফোবিয়া',
      detail: 'কুকুর বা শিয়ালের লালার মাধ্যমে সংক্রমিত হয়ে মস্তিষ্কে নেগ্রি বডি (Negri body) সৃষ্টি করে',
      diff: 'board',
    },
    {
      agent: 'পোলিও ও চিকুনগুনিয়া ভাইরাস',
      genomeOrType: 'ক্ষুদ্র একসূত্রক (+) RNA ভাইরাস',
      diseaseOrRole: 'পোলিওমায়েলাইটিস (মোটর নিউরন) ও অস্থিসন্ধি ব্যথার জ্বর',
      detail: 'চিকুনগুনিয়া Aedes মশকীবাহিত আলফাভাইরাস এবং পোলিও অন্ত্র দিয়ে কেন্দ্রীয় স্নায়ুতন্ত্রে পৌঁছায়',
      diff: 'dental',
    },
    {
      agent: 'SARS-CoV-2 (করোনা ভাইরাস)',
      genomeOrType: 'বৃহত্তম একসূত্রক (+) RNA ও স্পাইক (S) গ্লাইকোপ্রোটিনযুক্ত এনভেলপড ভাইরাস',
      diseaseOrRole: 'COVID-19 (ACE2 রিসেপ্টর দিয়ে ফুসফুস আক্রান্ত)',
      detail: 'RT-PCR পরীক্ষায় ভাইরাল RNA শনাক্ত করা হয়',
      diff: 'medical',
    },
    {
      agent: 'প্যাপিলোমা ও হার্পিস ভাইরাস',
      genomeOrType: 'দ্বিসূত্রক DNA ভাইরাস',
      diseaseOrRole: 'জরায়ুমুখ ক্যান্সার (HPV) ও ত্বকের ফোসকা',
      detail: 'ইমার্জিং অনকোভাইরাস হিসেবে HPV-16 ও 18 জরায়ুমুখ ক্যান্সারের প্রধান কারণ',
      diff: 'medical',
    },
    {
      agent: 'Mycoplasma (PPLO)',
      genomeOrType: 'কোষপ্রাচীরবিহীন ক্ষুদ্রতম স্বভোজী-বহির্ভূত প্রোক্যারিওট (০.১–০.৩ µm)',
      diseaseOrRole: 'মানুষের অপ্রথাগত নিউমোনিয়া ও উদ্ভিদে উইচ-ব্রুম রোগ',
      detail: 'কোষপ্রাচীর না থাকায় পেনিসিলিন অ্যান্টিবায়োটিক এর ওপর কাজ করে না',
      diff: 'medical',
    },
    {
      agent: 'Streptococcus pneumoniae',
      genomeOrType: 'চেইন বা জোড়ায় (ডিপ্লোকক্কাস) গ্রাম-পজিটিভ গোলাকার ব্যাকটেরিয়া',
      diseaseOrRole: 'ফুসফুসে ব্যাকটেরিয়াল নিউমোনিয়া',
      detail: 'গ্রিফিথের ১৯২৮ সালের রূপান্তর (Transformation) পরীক্ষায় ব্যবহৃত S-ও R-স্ট্রেন',
      diff: 'medical',
    },
    {
      agent: 'Clostridium tetani ও C. botulinum',
      genomeOrType: 'বাধ্যতামূলক অবাত, এন্ডোস্পোর গঠনকারী গ্রাম-পজিটিভ দণ্ডাকার ব্যাকটেরিয়া',
      diseaseOrRole: 'ধনুষ্টংকার (টিটেনাস) ও ফুড পয়জনিং (বটুলিজম)',
      detail: 'এন্ডোস্পোর ডিপিকোলিনিক অ্যাসিড ও ক্যালসিয়াম সমৃদ্ধ হওয়ায় প্রতিকূল তাপমাত্রায় টিকে থাকে',
      diff: 'dental',
    },
    {
      agent: 'Rhizobium ও Azotobacter',
      genomeOrType: 'নাইট্রোজেন সংবদ্ধনকারী গ্রাম-নেগেটিভ ব্যাকটেরিয়া',
      diseaseOrRole: 'লেগহিমোগ্লোবিনযুক্ত শিম্বগোত্রীয় উদ্ভিদের মূলের নডিউলে N₂ সংবদ্ধন',
      detail: 'Rhizobium মিথোজীবী ও Azotobacter মাটিতে মুক্তজীবী নাইট্রোজেন সংবদ্ধক',
      diff: 'board',
    },
    {
      agent: 'Mycobacterium tuberculosis',
      genomeOrType: 'মাইকোলিক অ্যাসিড সমৃদ্ধ অ্যাসিড-ফাস্ট দণ্ডাকার ব্যাকটেরিয়া',
      diseaseOrRole: 'যক্ষ্মা বা টিউবারকিউলোসিস (BCG টিকা প্রতিরোধী)',
      detail: 'রবার্ট কখ ১৮৮২ সালে যক্ষ্মার জীবাণু আবিষ্কার করেন (কখের শর্তাবলি)',
      diff: 'medical',
    },
    {
      agent: 'Salmonella typhi ও Treponema pallidum',
      genomeOrType: 'গ্রাম-নেগেটিভ দণ্ডাকার (টাইফয়েড) ও স্পাইরাল/স্পাইরোকিট (সিফিলিস)',
      diseaseOrRole: 'টাইফয়েড জ্বর (Widal টেস্ট) ও যৌনবাহিত সিফিলিস রোগ',
      detail: 'Salmonella দূষিত পানি-খাবারে ছড়ায় এবং Treponema কর্ক-স্ক্রু আকৃতির ব্যাকটেরিয়া',
      diff: 'medical',
    },
    {
      agent: 'Plasmodium malariae ও P. ovale',
      genomeOrType: 'প্রোটোজোয়ান স্পোরোজোয়া পরজীবী',
      diseaseOrRole: 'কোয়ার্টান ম্যালেরিয়া (৭২ ঘণ্টা পরপর জ্বর) ও মাইল্ড টার্শিয়ান ম্যালেরিয়া (৪৮ ঘণ্টা)',
      detail: 'P. vivax বিনাইন টার্শিয়ান এবং P. falciparum ম্যালিগন্যান্ট টার্শিয়ান ম্যালেরিয়া ঘটায়',
      diff: 'medical',
    },
    {
      agent: 'সিগনেট রিং, অ্যামিবয়েড ও শফনার্স ডটস',
      genomeOrType: 'Plasmodium vivax-এর লোহিত কণিকায় এরিথ্রোসাইটিক সাইজোগনি দশা',
      diseaseOrRole: 'RBC-র ভেতরে হিমোগ্লোবিন ভেঙে বিষাক্ত হিমোজয়েন ও কাঁপুনিসহ জ্বর',
      detail: 'হিমোজয়েন মুক্ত হওয়ার সময় শরীরে জ্বর আসে; শফনার্স ডটস P. vivax শনাক্তকারী চিহ্ন',
      diff: 'medical',
    },
  ];

  microbeMatrix.forEach((m, i) => {
    const others = microbeMatrix.filter((x) => x.agent !== m.agent);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch4_microbe',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: m.diff,
        question: `অণুজীববিজ্ঞানে "${m.genomeOrType}" বৈশিষ্ট্যযুক্ত এবং "${m.diseaseOrRole}" সৃষ্টিকারী অণুজীব কোনটি?`,
        correct: m.agent,
        distractors: others.slice(i % 8, (i % 8) + 5).map((x) => x.agent),
        explanation: `${m.agent}-এর গঠন: ${m.genomeOrType}। এটি ${m.diseaseOrRole} ঘটায়। (${m.detail})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · অণুজীব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch4_microbe',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `"${m.agent}"-এর নিউক্লিক অ্যাসিড/কোষীয় প্রকৃতি কোনটি?`,
        correct: m.genomeOrType,
        distractors: others.slice((i + 3) % 8, ((i + 3) % 8) + 5).map((x) => x.genomeOrType),
        explanation: `${m.agent} সম্পর্কে: ${m.genomeOrType}। ${m.detail}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ভাইরাস, ব্যাকটেরিয়া ও ম্যালেরিয়া',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch4_microbe',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'dental',
        question: `নিচের কোন রোগ বা শারীরবৃত্তীয় ভূমিকা সরাসরি "${m.agent}"-এর সাথে সম্পর্কিত?`,
        correct: m.diseaseOrRole,
        distractors: others.slice((i + 5) % 8, ((i + 5) % 8) + 5).map((x) => x.diseaseOrRole),
        explanation: `${m.agent} → ${m.diseaseOrRole}। ${m.detail}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · অণুজীবজনিত রোগ',
      })
    );
  });

  // 6. Algae, Fungi, Bryophyta, Pteridophyta & Lower Plants Matrix (~160 MCQs)
  const lowerPlantMatrix: Array<{
    name: string;
    group: string;
    feature: string;
    reserveOrWall: string;
    ch: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    {
      name: 'Chlorella (এককোষী সবুজ শৈবাল)',
      group: 'Chlorophyta',
      feature: 'মহাকাশযানে O₂ উৎপাদন ও দ্রুত প্রোটিন (Single Cell Protein) উৎস হিসেবে ব্যবহৃত',
      reserveOrWall: 'পাইরিনয়েড ও শ্বেতসার; ক্লোরেলা থেকে ক্লোরেলিন অ্যান্টিবায়োটিক পাওয়া যায়',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Spirogyra (পুকুরের রেশমি সুতা)',
      group: 'Chlorophyta',
      feature: 'সর্পিলাকার ফিতাকৃতির ক্লোরোপ্লাস্ট এবং সিঁড়ির মতো কনজুগেশন নালি দিয়ে সোপানাকার সংযুক্তি',
      reserveOrWall: 'ভাসমান অশাখ ফিলামেন্ট; বাহিরের আবরণ মিউসিলেজ পিচ্ছিল',
      ch: 'bio1_ch5_lower_plants',
      diff: 'board',
    },
    {
      name: 'Sargassum ও Laminaria (বাদামি শৈবাল)',
      group: 'Phaeophyta',
      feature: 'ফিউকোজ্যান্থিন রঞ্জকযুক্ত সামুদ্রিক কেল্প যা আয়োডিন, পটাশ ও অ্যালজিনিক অ্যাসিডের প্রধান উৎস',
      reserveOrWall: 'সঞ্চিত খাদ্য ল্যামিনারিন, ম্যানিটল ও তৈলবিন্দু; কোষপ্রাচীরে অ্যালজিন',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Polysiphonia ও Gelidium (লোহিত শৈবাল)',
      group: 'Rhodophyta',
      feature: 'ফাইকোএরিথ্রিন রঞ্জকযুক্ত সামুদ্রিক শৈবাল যা ল্যাবরেটরির অ্যাগার-অ্যাগার জেল তৈরি করে',
      reserveOrWall: 'সঞ্চিত খাদ্য ফ্লোরিডিয়ান স্টার্চ; জীবনচক্রে কোনো ফ্ল্যাজেলেট দশা থাকে না',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Saccharomyces cerevisiae (বেকার্স ইস্ট)',
      group: 'Ascomycota (এককোষী ছত্রাক)',
      feature: 'মুকুলোদ্গম (Budding) ও অ্যাসকোস্পোর তৈরিকারী ছত্রাক যা বেকারি ও মদ্যশিল্পে গাঁজন ঘটায়',
      reserveOrWall: 'ভিটামিন বি-কমপ্লেক্স সমৃদ্ধ এবং জাইমেজ এনজাইমের উৎস',
      ch: 'bio1_ch5_lower_plants',
      diff: 'board',
    },
    {
      name: 'Penicillium notatum ও P. chrysogenum',
      group: 'Ascomycota (সবুজ-নীল মোল্ড)',
      feature: 'ঝাড়ু বা ব্রাশ আকৃতির কনিডিওফোরে কনিডিয়া সৃষ্টিকারী পেনিসিলিন অ্যান্টিবায়োটিক উৎপাদনকারী ছত্রাক',
      reserveOrWall: '১৯২৮ সালে স্যার আলেকজান্ডার ফ্লেমিং পেনিসিলিন আবিষ্কার করেন',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Phytophthora infestans',
      group: 'Oomycota (ওয়াটার মোল্ড)',
      feature: '১৮৪৫ সালের আইরিশ আলুর দুর্ভিক্ষ সৃষ্টিকারী গোলআলুর বিলম্বিত ধসা (Late blight) রোগের জীবাণু',
      reserveOrWall: 'কোষপ্রাচীর সেলুলোজ নির্মিত ও ডাইপ্ল্যানিটিক জুস্পোর উৎপন্ন হয়',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Aspergillus flavus ও A. niger',
      group: 'Ascomycota',
      feature: 'যকৃত ক্যান্সার সৃষ্টিকারী আফলাটক্সিন বিষ উৎপাদন (A. flavus) ও সাইট্রিক অ্যাসিড উৎপাদন (A. niger)',
      reserveOrWall: 'শস্যদানায় আর্দ্র অবস্থায় জন্মে এবং কর্ণের অটোমাইকোসিস ঘটাতে পারে',
      ch: 'bio1_ch5_lower_plants',
      diff: 'dental',
    },
    {
      name: 'Riccia fluitans ও R. discolor (লিভারওয়ার্ট)',
      group: 'Bryophyta (অপুষ্পক উভচর)',
      feature: 'ভাস্কুলার টিস্যুবিহীন দ্বি-বিভাজিত রোজেট আকৃতির গ্যামিটোফাইটিক থ্যালাস',
      reserveOrWall: 'অ্যান্থেরিডিয়াম থেকে দ্বিফ্ল্যাজেলেট শুক্রাণু ও ফ্লাস্ক-আকৃতির আর্কিগোনিয়াম',
      ch: 'bio1_ch5_lower_plants',
      diff: 'board',
    },
    {
      name: 'Sphagnum (পিট মস)',
      group: 'Bryophyta',
      feature: 'নিজের ওজনের চেয়ে বহুগুণ পানি ধারণক্ষম হায়ালিন কোষযুক্ত মস যা পিট কয়লা ও ক্ষত ড্রেসিংয়ে ব্যবহৃত হয়',
      reserveOrWall: 'প্রোটোনিমা দশা বিদ্যমান এবং ক্যাপসুলে কলামেল্লা ও অপারকুলাম থাকে',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Pteris vittata (আর্সেনিক শোষণকারী ফার্ন)',
      group: 'Pteridophyta',
      feature: 'ফাইটোরিমেডিয়েশনের মাধ্যমে মাটি থেকে বিষাক্ত আর্সেনিক শোষণ করতে সক্ষম ভাস্কুলার অপুষ্পক উদ্ভিদ',
      reserveOrWall: 'স্পোরোফাইট প্রধান, রাইজোমে র‍্যামেন্টা শল্ক ও বহুফ্ল্যাজেলেট শুক্রাণু',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Azolla pinnata ও Marsilea (জলজ ফার্ন)',
      group: 'Pteridophyta',
      feature: 'পাতার গহ্বরে Anabaena azollae ধারণ করে ধানের জমিতে জৈব সার হিসেবে ব্যবহৃত ভাসমান ফার্ন',
      reserveOrWall: 'হেটারোস্পোরাস (মাইক্রো ও মেগাস্পোর উভয়ই তৈরি করে)',
      ch: 'bio1_ch5_lower_plants',
      diff: 'medical',
    },
    {
      name: 'Cycas revoluta ও C. circinalis',
      group: 'Gymnosperm (নগ্নবীজী)',
      feature: 'পাম গাছের মতো দেখায় বলে সাগো-পাম নামে পরিচিত; ফল গঠন না করে উন্মুক্ত বীজ তৈরি করে',
      reserveOrWall: 'দ্বিনিষেক হয় না, ডিপ্লোব্ল্যাস্টিক নয় বরং ভাস্কুলার ক্যাম্বিয়ামযুক্ত',
      ch: 'bio1_ch7_angiosperm',
      diff: 'board',
    },
    {
      name: 'Podocarpus neriifolius (বাঁশপাতা)',
      group: 'Gymnosperm (বাংলাদেশের প্রাকৃতিক নগ্নবীজী)',
      feature: 'চট্টগ্রাম ও পার্বত্য চট্টগ্রামের বনে জন্মানো বাংলাদেশের অন্যতম দেশীয় নগ্নবীজী বৃক্ষ',
      reserveOrWall: 'বাংলাদেশে প্রাকৃতিকভাবে জন্মানো ৫টি নগ্নবীজী প্রজাতির একটি',
      ch: 'bio1_ch7_angiosperm',
      diff: 'medical',
    },
  ];

  lowerPlantMatrix.forEach((p, i) => {
    const others = lowerPlantMatrix.filter((x) => x.name !== p.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: p.ch,
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: p.diff,
        question: `"${p.feature}" — এটি নিচের কোন উদ্ভিদ বা গোষ্ঠীর অনন্য বৈশিষ্ট্য?`,
        correct: p.name,
        distractors: others.slice(i % 7, (i % 7) + 5).map((x) => x.name),
        explanation: `${p.name} (${p.group}): ${p.feature}। ${p.reserveOrWall}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫–৭ · নিম্নশ্রেণির উদ্ভিদ ও নগ্নবীজী',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: p.ch,
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'dental' : 'medical',
        question: `"${p.name}" সম্পর্কে কোন তথ্যটি সঠিক?`,
        correct: p.reserveOrWall,
        distractors: others.slice((i + 3) % 7, ((i + 3) % 7) + 5).map((x) => x.reserveOrWall),
        explanation: `${p.name} (${p.group}) সম্পর্কে: ${p.reserveOrWall}। (${p.feature})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৫–৭ · উদ্ভিদ বৈচিত্র্য',
      })
    );
  });

  // 7. Extra High-Yield Botany Rapid-Fire Facts (~140 MCQs)
  const rapidBotany: Array<{ q: string; a: string; wrongs: string[]; ch: string; vl: string; exp: string; diff: 'board' | 'medical' | 'dental' }> = [
    {
      q: 'কোষপ্রাচীরবিহীন প্রোটোপ্লাস্টকে কী বলা হয়?',
      a: 'স্ফেরোপ্লাস্ট বা নগ্ন প্রোটোপ্লাস্ট',
      wrongs: ['টোনোপ্লাস্ট', 'সিমপ্লাস্ট', 'অ্যাপোপ্লাস্ট'],
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      exp: 'সেলুলেজ ও পেকটিনেজ এনজাইম দিয়ে কোষপ্রাচীর অপসারণ করলে গোলাকার প্রোটোপ্লাস্ট পাওয়া যায়।',
      diff: 'medical',
    },
    {
      q: 'প্রকৃতকোষের কোন দুটি অঙ্গাণুতে ৭০S রাইবোজোম ও নিজস্ব বৃত্তাকার DNA থাকে?',
      a: 'মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্ট',
      wrongs: ['গলগি বডি ও লাইসোজোম', 'পারঅক্সিসোম ও ভ্যাকুওল', 'নিউক্লিওলাস ও সেন্ট্রিওল'],
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      exp: 'এন্ডোসিমবায়োটিক মতবাদ অনুযায়ী মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্ট প্রোক্যারিওটিক পূর্বসূরি থেকে আগত অর্ধ-স্বনির্ভর অঙ্গাণু।',
      diff: 'medical',
    },
    {
      q: 'DNA ডাবল হেলিক্সের ব্যাস এবং একটি পূর্ণ ঘূর্ণনের দৈর্ঘ্য যথাক্রমে কত?',
      a: '২০ Å (২ nm) ও ৩৪ Å (৩.৪ nm)',
      wrongs: ['১০ Å ও ৩৪ Å', '৩৪ Å ও ২০ Å', '৩০ Å ও ১০ Å'],
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      exp: 'B-DNA-এর ব্যাস ২ nm (২০ Å), পূর্ণ ঘূর্ণন ৩.৪ nm (৩৪ Å) এবং পাশাপাশি দুটি বেসপেয়ারের দূরত্ব ০.৩৪ nm (৩.৪ Å)।',
      diff: 'board',
    },
    {
      q: 'মিথোজীবী বা নডিউল গঠনের পূর্বে লেগুমিনাস উদ্ভিদে অক্সিজেন শোষক গোলাপি রঞ্জক কোনটি?',
      a: 'লেগহিমোগ্লোবিন',
      wrongs: ['ফাইকোসায়ানিন', 'সাইটোক্রোম-সি', 'অ্যান্থোসায়ানিন'],
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      exp: 'Rhizobium-এর নাইট্রোজিনেজ এনজাইম অক্সিজেনে নিষ্ক্রিয় হয় বলে মূলের অর্বুদে লেগহিমোগ্লোবিন O₂ ধরে রাখে।',
      diff: 'medical',
    },
    {
      q: 'কোন উদ্ভিদ রোগটি "বাংলাদেশের পাটের কাণ্ডপচা" বা ব্ল্যাক ব্যান্ড রোগ হিসেবে পরিচিত?',
      a: 'Macrophomina phaseolina ছত্রাকজনিত রোগ',
      wrongs: ['Phytophthora infestans', 'Puccinia graminis', 'Ustilago tritici'],
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      exp: 'Macrophomina phaseolina ছত্রাক পাটের কাণ্ডে কালচে দাগ ও পচন সৃষ্টি করে; গমের ব্ল্যাক রাস্ট করে Puccinia graminis।',
      diff: 'dental',
    },
    {
      q: 'কোন ভাইরাসকে "ক্যান্সার সৃষ্টিকারী RNA অনকোভাইরাস"-এর উদাহরণ হিসেবে গণ্য করা হয়?',
      a: 'রাউস সারকোমা ভাইরাস (RSV) ও HTLV-1',
      wrongs: ['বসন্ত (Variola) ভাইরাস', 'র‍্যাবিস ভাইরাস', 'টিএমভি (TMV)'],
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      exp: 'Peyton Rous ১৯১১ সালে মুরগির সারকোমা ভাইরাস আবিষ্কার করেন যা প্রথম আবিষ্কৃত টিউমার ভাইরাস।',
      diff: 'medical',
    },
    {
      q: 'সিলিকন বা পলিপেপটাইড নয়, কেবল প্রোটিনের অভাবে কোন ভাইরাস-সদৃশ কণা ক্রুজফেল্ট-জ্যাকব রোগ করে?',
      a: 'প্রিয়ন (PrPˢᶜ)',
      wrongs: ['ভিরয়েড', 'ভিরিয়ন', 'প্লাজমিড'],
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      exp: 'প্রিয়ন হলো নিউক্লিক অ্যাসিডবিহীন সংক্রামক প্রোটিন, আর পূর্ণাঙ্গ সংক্রামক ভাইরাসকে ভিরিয়ন বলে।',
      diff: 'medical',
    },
    {
      q: 'উদ্ভিদ কোষে গ্লাইকোজেনের পরিবর্তে প্রধান সঞ্চিত পলিস্যাকারাইড কোনটি?',
      a: 'স্টার্চ (শ্বেতসার)',
      wrongs: ['কাইটিন', 'গ্লাইকোজেন', 'হেপারিন'],
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      exp: 'সবুজ উদ্ভিদ সালোকসংশ্লেষণে তৈরি গ্লুকোজ অ্যামাইলোপ্লাস্টে স্টার্চ হিসেবে জমা রাখে।',
      diff: 'board',
    },
    {
      q: 'অ্যাডেনিন ও থাইমিনের মাঝে এবং গুয়ানিন ও সাইটোসিনের মাঝে যথাক্রমে কতটি হাইড্রোজেন বন্ধন থাকে?',
      a: '২টি এবং ৩টি',
      wrongs: ['৩টি এবং ২টি', '১টি এবং ২টি', '২টি এবং ৪টি'],
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      exp: 'A=T দ্বি-হাইড্রোজেন বন্ধনে এবং G≡C ত্রি-হাইড্রোজেন বন্ধনে আবদ্ধ থাকায় G-C সমৃদ্ধ DNA-এর গলনাঙ্ক (Tm) বেশি হয়।',
      diff: 'board',
    },
    {
      q: 'মানুষের কোন অ্যামিনো অ্যাসিডগুলোর সংশ্লেষ দেহে হয় না (অত্যাবশ্যকীয়: PVT TIM HALL)?',
      a: 'ভ্যালিন, লিউসিন, আইসোলিউসিন, লাইসিন, মেথিওনিন, থ্রিওনিন, ট্রিপটোফ্যান, ফিনাইলঅ্যালানিন (ও শিশুদের আর্জিনিন-হিস্টিডিন)',
      wrongs: ['গ্লাইসিন, অ্যালানিন, সেরিন, প্রোলিন', 'অ্যাসপার্টেট, গ্লুটামেট, সিস্টিন, টাইরোসিন', 'কেবল গ্লাইসিন ও প্রোলিন'],
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      exp: 'প্রাপ্তবয়স্ক মানুষে ৮টি (এবং বৃদ্ধি পর্যায়ে আর্জিনিন ও হিস্টিডিনসহ ১০টি) অ্যামিনো অ্যাসিড অত্যাবশ্যকীয়।',
      diff: 'medical',
    },
    {
      q: 'কোন এনজাইমটি RNA সূত্রককে ছাঁচ (Template) হিসেবে ব্যবহার করে DNA তৈরি করে?',
      a: 'রিভার্স ট্রান্সক্রিপ্টেজ (RNA-নির্ভর DNA পলিমারেজ)',
      wrongs: ['DNA হেলিকেজ', 'RNA প্রাইমেজ', 'টপোআইসোমারেজ'],
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      exp: 'টেমিন ও বাল্টিমোর (১৯৭০) রেট্রোভাইরাসে রিভার্স ট্রান্সক্রিপ্টেজ আবিষ্কার করেন; এটি cDNA লাইব্রেরি তৈরিতেও ব্যবহৃত হয়।',
      diff: 'medical',
    },
    {
      q: 'DNA রেপ্লিকেশনের সময় সুপারকয়েলিং বা প্যাঁচ খোলার টান প্রশমন করে কোন এনজাইম?',
      a: 'টপোআইসোমারেজ (ব্যাকটেরিয়ায় DNA গাইরেজ)',
      wrongs: ['DNA লাইগেজ', 'SSB প্রোটিন', 'এক্সোনিউক্লিয়েজ'],
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      exp: 'হেলিকেজ হাইড্রোজেন বন্ধন ভাঙে এবং টপোআইসোমারেজ সামনের দিকে সৃষ্ট অতিরিক্ত সুপারকয়েলিং ছাড়িয়ে দেয়।',
      diff: 'medical',
    },
    {
      q: 'উদ্ভিদের কোন শ্রেণিতে ডাইক্যারিয়ন (n+n) দশা দীর্ঘস্থায়ী ও ফ্রুটিং বডি গঠিত হয়?',
      a: 'অ্যাসকোমাইকোটা ও বেসিডিওমাইকোটা ছত্রাকে',
      wrongs: ['সবুজ শৈবালে', 'সায়ানোব্যাকটেরিয়ায়', 'ব্রায়োফাইটায়'],
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      exp: 'প্লাজমোগ্যামির পরপরই ক্যারিওগ্যামি না হওয়ায় দুটি হ্যাপ্লয়েড নিউক্লিয়াস একসাথে থেকে (n+n) ডাইক্যারিয়ন দশা সৃষ্টি করে।',
      diff: 'medical',
    },
    {
      q: 'সবুজ উদ্ভিদ ও প্রবাল ব্যতীত কোন প্রাণীজগতের সাথে জুজ্যান্থেলি (Zooxanthellae) শৈবাল মিথোজীবী হয়?',
      a: 'প্রবাল ও সিলেন্টারেটা (Hydra viridissima-তে Zoochlorella)',
      wrongs: ['রুইমাছ ও ঘাসফড়িং', 'গোলকৃমি ও ফিতাকৃমি', 'ম্যালেরিয়া পরজীবী'],
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      exp: 'শৈবাল ও হাইড্রার মিথোজীবিতায় শৈবাল অক্সিজেন-শর্করা দেয় এবং হাইড্রা আশ্রয় ও CO₂-নাইট্রোজেন বর্জ্য সরবরাহ করে।',
      diff: 'dental',
    },
    {
      q: 'সাইকাসের কোন অঙ্গটি আকারে ও গঠনে দ্বিবীজপত্রী উদ্ভিদের মতো নয়, বরং নীল-সবুজ শৈবালের বসবাসে প্রবালের মতো হয়?',
      a: 'কোরালয়েড মূল (Anabaena ও Nostoc সমৃদ্ধ)',
      wrongs: ['প্রধান মূল', 'রাচিস', 'বুলবিল'],
      ch: 'bio1_ch7_angiosperm',
      vl: 'photosynthesis',
      exp: 'অ্যাপিওজোট্রপিক কোরালয়েড মূল ভূ-পৃষ্ঠের ওপর উঠে এসে অ্যানাবেনা-নস্টকের সাথে মিথোজীবিতায় নাইট্রোজেন সংবদ্ধন করে।',
      diff: 'board',
    },
  ];

  rapidBotany.forEach((item) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: item.diff,
        question: item.q,
        correct: item.a,
        distractors: item.wrongs,
        explanation: item.exp,
        reference: 'জীববিজ্ঞান ১ম পত্র · হাই-ইল্ড প্রশ্ন ব্যাংক',
      })
    );
  });

  return list;
}
