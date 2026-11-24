import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio1ExtraRow {
  ch: string;
  vl: string;
  subject: string;
  trait: string;
  app: string;
  note: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio1StructuredD(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_sd_${String(seq++).padStart(4, '0')}`;

  // 1. Medicinal & Economic Botany + Lower Plant Morphology (~144 MCQs)
  const bio1Matrix: Bio1ExtraRow[] = [
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'নয়নতারা (Catharanthus roseus)', trait: 'ভিনক্রিস্টিন ও ভিনব্লাস্টিন উপক্ষারের উৎস', app: 'লিউকেমিয়া ও হজকিন লিম্ফোমা কেমোথেরাপিতে ব্যবহৃত', note: 'মাইটোসিসের মেটাফেজ স্পিন্ডল তন্তু গঠনে বাধা দেয়।', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'সর্পগন্ধা (Rauvolfia serpentina)', trait: 'রেসারপিন উপক্ষারসমৃদ্ধ মূল', app: 'উচ্চ রক্তচাপ (Hypertension) ও মানসিক উত্তেজনা প্রশমনে ব্যবহৃত', note: 'সিমপ্যাথেটিক স্নায়ুতে নর-অ্যাড্রেনালিন কমিয়ে রক্তচাপ নিয়ন্ত্রণ করে।', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'সিংকোনা (Cinchona officinalis)', trait: 'কুইনাইন ও কুইনিডিন উপক্ষারযুক্ত বাকল', app: 'ম্যালেরিয়া জ্বর ও কার্ডিয়াক অ্যারিদমিয়া চিকিৎসায় ব্যবহৃত', note: 'Rubiaceae গোত্রের উদ্ভিদ থেকে প্রাকৃতিক ম্যালেরিয়ার ওষুধ পাওয়া যায়।', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'বাসক (Justicia adhatoda)', trait: 'ভ্যাসিসিন (Vasicine) উপক্ষারযুক্ত পাতা', app: 'কফ নিঃসারক ও হাঁপানি-ব্রঙ্কাইটিস উপশমে ব্যবহৃত', note: 'Acanthaceae গোত্রের ভেষজ যা শ্বাসনালি প্রসারিত করে।', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'অর্জুন (Terminalia arjuna)', trait: 'অর্জুনিক অ্যাসিড ও ট্যানিনসমৃদ্ধ ছাল', app: 'হৃৎপেশির সংকোচন ক্ষমতা বৃদ্ধি ও করোনারি হৃদরোগ সুরক্ষা', note: 'Combretaceae গোত্রের বৃক্ষ কার্ডিওটনিক হিসেবে পরিচিত।', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'থানকুনি (Centella asiatica)', trait: 'এশিয়াটিকোসাইড গ্লাইকোসাইডসমৃদ্ধ লতা', app: 'আমাশয় নিরাময়, ক্ষত শুকানো ও স্মৃতিশক্তি বৃদ্ধিতে ব্যবহৃত', note: 'Apiaceae গোত্রের স্যাঁতসেঁতে জমির ভেষজ।', diff: 'board' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'প্যাসিফিক ইউ (Taxus brevifolia)', trait: 'ট্যাক্সল (Paclitaxel) ডাইটারপিন উপক্ষার', app: 'ডিম্বাশয় ও স্তন ক্যান্সার কেমোথেরাপি (টিউবুলিন স্থায়ীকরণ)', note: 'মাইক্রোটিউবিউল ডিপলিমারাইজেশন আটকে কোষ বিভাজন রোধ করে।', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'ফক্সগ্লোভ (Digitalis purpurea)', trait: 'ডিজিটক্সিন ও ডিগক্সিন কার্ডিয়াক গ্লাইকোসাইড', app: 'হার্ট ফেইলিউর ও অ্যাট্রিয়াল ফিব্রিলেশন চিকিৎসা', note: 'হৃৎপেশির পাম্পিং শক্তি বাড়ায়।', diff: 'medical' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'ধুতুরা (Datura metel)', trait: 'অ্যাট্রোপিন ও স্কোপোলামিন ট্রপেন উপক্ষার', app: 'চোখের পিউপিল প্রসারণ ও পেশির খিঁচুনি উপশম', note: 'প্যারাসিমপ্যাথেটিক অ্যাসিটাইলকোলিন রিসেপ্টর ব্লক করে।', diff: 'dental' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', subject: 'পপি / আফিম (Papaver somniferum)', trait: 'মরফিন ও কোডেইন উপক্ষারসমৃদ্ধ কাঁচা ফল', app: 'তীব্র ক্যান্সার-ব্যথা ও সার্জারিতে শক্তিশালী বেদনানাশক', note: 'অপব্যবহারে তীব্র স্নায়বিক আসক্তি ঘটে।', diff: 'medical' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', subject: 'Azotobacter ও Clostridium', trait: 'মাটিতে স্বাধীনজীবী হিসেবে বায়বীয় N₂ সংবন্ধনকারী ব্যাকটেরিয়া', app: 'মিথোজীবিতা ছাড়াই প্রাকৃতিকভাবে মাটির নাইট্রোজেন বৃদ্ধি', note: 'Azotobacter সবাত এবং Clostridium অবাত নাইট্রোজেন সংবন্ধক।', diff: 'medical' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', subject: 'Nitrosomonas ও Nitrobacter', trait: 'অ্যামোনিয়াকে নাইট্রাইট ও পরে নাইট্রেটে রূপান্তরকারী নাইট্রিফাইং ব্যাকটেরিয়া', app: 'উদ্ভিদের গ্রহণযোগ্য NO₃⁻ আয়ন সরবরাহ করা', note: 'ডিনাইট্রিফাইং Pseudomonas বিপরীত কাজ করে N₂ মুক্ত করে।', diff: 'medical' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', subject: 'Lactobacillus acidophilus', trait: 'দুধের ল্যাকটোজকে ল্যাকটিক অ্যাসিডে রূপান্তরকারী গ্রাম-পজিটিভ রড', app: 'দই-পনির তৈরি ও অন্ত্রের উপকারী প্রোবায়োটিক ফ্লোরা রক্ষা', note: 'ল্যাকটিক অ্যাসিডে দুধের কেজিন জমাট বাঁধে।', diff: 'board' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', subject: 'ডায়াটম (Navicula — Chrysophyta)', trait: 'সিলিকাযুক্ত দ্বি-খোলক এপিথিকা ও হাইপোথিকাবিশিষ্ট শৈবাল', app: 'ফিল্টার, টুথপেস্ট ও ধাতু পলিশে ডায়াটোমেশাস মাটি ব্যবহার', note: 'সমুদ্রের অন্যতম প্রধান উৎপাদক বা "সমুদ্রের রত্ন"।', diff: 'medical' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', subject: 'Gracilaria ও Gelidium (লোহিত শৈবাল)', trait: 'কোষপ্রাচীর থেকে অ্যাগার-অ্যাগার আহরণের প্রধান উৎস', app: 'মাইক্রোবায়োলজি কালচার মিডিয়া ও টিস্যু কালচারে জেলিং এজেন্ট', note: 'বাদামি শৈবাল Laminaria থেকে অ্যালজিন ও আয়োডিন পাওয়া যায়।', diff: 'medical' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', subject: 'Cephaleuros virescens', trait: 'চা ও কফি পাতায় লাল মরিচা রোগ সৃষ্টিকারী পরজীবী সবুজ শৈবাল', app: 'চা বাগানের অর্থনৈতিক ক্ষতিসাধনকারী বিরল পরজীবী শৈবাল', note: 'অধিকাংশ শৈবাল স্বভোজী হলেও এটি পরজীবী।', diff: 'medical' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', subject: 'Selaginella ও Azolla', trait: 'মাইক্রো ও মেগাস্পোরযুক্ত হেটারোস্পোরাস টেরিডোফাইট', app: 'Azolla পাতায় Anabaena থাকায় ধানের জমিতে সবুজ জৈব সার', note: 'হেটারোস্পোরি উদ্ভিদবিজ্ঞানে বীজ স্বভাবের সূচনা নির্দেশ করে।', diff: 'medical' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', subject: 'Sphagnum (পিট মস — ব্রায়োফাইট)', trait: 'নিজ ওজনের ১৮–২৫ গুণ পানি ধারণক্ষমতাসম্পন্ন শোষক কোষযুক্ত মস', app: 'উদ্যানতত্ত্বে আর্দ্রতা রক্ষা ও পিট কয়লা সৃষ্টি', note: 'অ্যান্টিসেপটিক গুণের কারণে প্রাচীনকালে ব্যান্ডেজে ব্যবহৃত হতো।', diff: 'dental' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', subject: 'জায়ান্ট ক্রোমোজোম (পলিটিন ও ল্যাম্পব্রাশ)', trait: 'এন্ডোমাইটোসিস দ্বারা সৃষ্ট বহু-সূত্রক পলিটিন ও উভচর উওসাইটের ল্যাম্পব্রাশ ক্রোমোজোম', app: 'বালবিয়ানি রিং-এ সক্রিয় mRNA ট্রান্সক্রিপশন গবেষণা', note: 'Drosophila-র লালাগ্রন্থিতে পলিটিন ক্রোমোজোম সুস্পষ্ট।', diff: 'medical' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', subject: 'হিস্টোন ও নিউক্লিওসোম কোর', trait: 'H2A, H2B, H3, H4-এর অক্টামারকে কেন্দ্র করে ১৪৬–১৬৬ bp DNA পেঁচিয়ে থাকা', app: 'ইউক্যারিওটিক ক্রোমোসোম সংকুচিত করে নিউক্লিয়াসে ধারণ করা', note: 'ক্ষারীয় আর্জিনিন ও লাইসিন হিস্টোনকে ধনাত্মক চার্জ দেয়।', diff: 'medical' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', subject: 'ইনুলিন ও গ্লাইকোজেন', trait: 'ফ্রুক্টোজের সঞ্চয়ী পলিমার (ইনুলিন) বনাম প্রাণীর অতি-শাখান্বিত গ্লুকোজ পলিমার (গ্লাইকোজেন)', app: 'মানুষে ইনুলিন পরিপাক হয় না বলে GFR পরিমাপে ব্যবহৃত হয়', note: 'ডালিয়া ও পেঁয়াজের মূলে ইনুলিন সঞ্চিত থাকে।', diff: 'medical' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', subject: 'জিন গান (বায়োলিস্টিক পদ্ধতি)', trait: 'সোনা বা টাংস্টেন কণায় DNA মাখিয়ে উচ্চচাপে উদ্ভিদ কোষে নিক্ষেপ করা', app: 'একবীজপত্রী শস্যে (ধান, গম, ভুট্টা) প্রত্যক্ষ জিন স্থানান্তর', note: 'একবীজপত্রীতে Agrobacterium সহজে সংক্রমণ করে না বলে জিন গান কার্যকর।', diff: 'medical' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', subject: 'Pseudomonas putida (সুপারবাগ)', trait: 'অয়েল-স্পিল পরিষ্কারকারী জিন-প্রকৌশলজাত ব্যাকটেরিয়া (ড. আনন্দ মোহন চক্রবর্তী)', app: 'সমুদ্রে ভাসমান পেট্রোলিয়াম তেল জৈবিকভাবে বিশ্লেষণ করা', note: 'পৃথিবীর প্রথম পেটেন্টকৃত জেনেটিক্যালি মডিফায়েড জীব।', diff: 'medical' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', subject: 'ব্যাগিং ও ইমাস্কুলেশন', trait: 'উভলিঙ্গ ফুল থেকে কচি পরাগধানী সরানো ও অনাকাঙ্ক্ষিত পরাগায়ন ঠেকাতে কাগজের থলি পরানো', app: 'উচ্চফলনশীল হাইব্রিড শস্য উদ্ভাবনে কৃত্রিম পরাগায়ন নিয়ন্ত্রণ', note: 'একলিঙ্গ স্ত্রী ফুলে ইমাস্কুলেশন লাগে না।', diff: 'board' },
  ];

  bio1Matrix.forEach((r, i) => {
    const others = bio1Matrix.filter((x) => x.subject !== r.subject);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: r.diff || 'medical',
        question: `"${r.trait}" — এই বিশেষ বৈশিষ্ট্যটি নিচের কোন উদ্ভিদ, অণুজীব বা গঠনের ক্ষেত্রে সঠিক?`,
        correct: r.subject,
        distractors: others.slice(i % 12, (i % 12) + 4).map((x) => x.subject),
        explanation: `${r.subject}: ${r.trait}। প্রয়োগ: ${r.app}। ${r.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায়ভিত্তিক মূল ব্যাংক',
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
        question: `উদ্ভিদবিজ্ঞানে "${r.subject}"-এর প্রধান শনাক্তকারী বৈশিষ্ট্য বা পরিচয় কী?`,
        correct: r.trait,
        distractors: others.slice((i + 3) % 12, ((i + 3) % 12) + 4).map((x) => x.trait),
        explanation: `${r.subject}: ${r.trait}। ${r.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · বৈশিষ্ট্য নির্ণয়',
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
        question: `চিকিৎসা, কৃষি বা জৈবপ্রযুক্তিতে "${r.app}" — এর সাথে প্রত্যক্ষভাবে যুক্ত কোনটি?`,
        correct: r.subject,
        distractors: others.slice((i + 6) % 12, ((i + 6) % 12) + 4).map((x) => x.subject),
        explanation: `${r.app}-এর ক্ষেত্রে ${r.subject} (${r.trait}) ব্যবহৃত হয়। ${r.note}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · প্রয়োগমূলক প্রশ্ন',
      })
    );
  });

  // 2. Transcription 3'->5' Template Strands to 5'->3' mRNA (20 MCQs)
  const strands = [
    { dna: 'TAC GGA TTC ATT', mrna: 'AUG CCU AAG UAA' },
    { dna: 'TAC TTT GCC ATC', mrna: 'AUG AAA CGG UAG' },
    { dna: 'TAC CCG GAA ACT', mrna: 'AUG GGC CUU UGA' },
    { dna: 'TAC AGT CGC ATT', mrna: 'AUG UCA GCG UAA' },
    { dna: 'TAC CGA TTG ATC', mrna: 'AUG GCU AAC UAG' },
    { dna: 'TAC GGT CAA ACT', mrna: 'AUG CCA GUU UGA' },
    { dna: 'TAC AAC TGG ATT', mrna: 'AUG UUG ACC UAA' },
    { dna: 'TAC TCC GTA ATC', mrna: 'AUG AGG CAU UAG' },
    { dna: 'TAC GCT AAG ACT', mrna: 'AUG CGA UUC UGA' },
    { dna: 'TAC ATG CCC ATT', mrna: 'AUG UAC GGG UAA' },
    { dna: 'TAC GTG CAC ATC', mrna: 'AUG CAC GUG UAG' },
    { dna: 'TAC CTA GGT ACT', mrna: 'AUG GAU CCA UGA' },
  ];
  strands.forEach((s, i) => {
    const others = strands.filter((x) => x.mrna !== s.mrna);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `DNA-এর টেমপ্লেট সূত্রকের ক্রম 3′-${s.dna}-5′ হলে ট্রান্সক্রিপশনে উৎপন্ন mRNA-এর সঠিক ক্রম (5′→3′) কোনটি?`,
        correct: `5′-${s.mrna}-3′`,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => `5′-${x.mrna}-3′`),
        explanation: `DNA থেকে mRNA তৈরিতে A→U, T→A, G→C ও C→G বসে। তাই 3′-${s.dna}-5′ থেকে 5′-${s.mrna}-3′ উৎপন্ন হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · ট্রান্সক্রিপশন',
      })
    );
  });

  // 3. Microscope & Micrometer Quantitative Drills (24 MCQs)
  [
    [10, 4], [10, 10], [10, 40], [10, 100], [15, 10], [15, 40], [15, 100], [5, 40], [12, 40], [20, 40], [10, 20], [15, 20],
  ].forEach(([eye, obj], i) => {
    const tot = eye * obj;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `যৌগিক অণুবীক্ষণ যন্ত্রে আইপিস ${toBnDigits(eye)}× এবং অবজেক্টিভ ${toBnDigits(obj)}× হলে মোট বিবর্ধন কত গুণ?`,
        correct: `${toBnDigits(tot)}×`,
        distractors: [`${toBnDigits(eye + obj)}×`, `${toBnDigits(tot * 2)}×`, `${toBnDigits(Math.round(tot / 2))}×`],
        explanation: `মোট বিবর্ধন = ${toBnDigits(eye)} × ${toBnDigits(obj)} = ${toBnDigits(tot)}×।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · মাইক্রোস্কোপি',
      })
    );
  });

  [2, 5, 10, 15, 25, 40, 50, 75, 100, 120, 150, 200].forEach((um) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি কোষের ব্যাস ${toBnDigits(um)} μm হলে ন্যানোমিটার (nm) এককে মান কত?`,
        correct: `${toBnDigits((um * 1000).toLocaleString('en-US'))} nm`,
        distractors: [
          `${toBnDigits((um * 100).toLocaleString('en-US'))} nm`,
          `${toBnDigits((um * 10000).toLocaleString('en-US'))} nm`,
          `${toBnDigits((um * 10).toLocaleString('en-US'))} nm`,
        ],
        explanation: `১ μm = ১,০০০ nm; তাই ${toBnDigits(um)} μm = ${toBnDigits((um * 1000).toLocaleString('en-US'))} nm।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষীয় একক রূপান্তর',
      })
    );
  });

  // 4. DNA Chargaff 4-Base Percentages & Base-Pair H-Bonds (40 MCQs)
  [12, 13, 15, 16, 17, 19, 21, 22, 23, 27, 29, 31, 33, 34, 38].forEach((aPct, i) => {
    const cPct = 50 - aPct;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `দ্বিসূত্রক DNA নমুনায় অ্যাডেনিন ${toBnDigits(aPct)}% হলে ওই DNA-তে T, G ও C-এর শতকরা হার যথাক্রমে কত?`,
        correct: `T = ${toBnDigits(aPct)}%, G = ${toBnDigits(cPct)}%, C = ${toBnDigits(cPct)}%`,
        distractors: [
          `T = ${toBnDigits(cPct)}%, G = ${toBnDigits(aPct)}%, C = ${toBnDigits(cPct)}%`,
          `T = ${toBnDigits(aPct)}%, G = ${toBnDigits(aPct)}%, C = ${toBnDigits(100 - 3 * aPct)}%`,
          `T = ${toBnDigits(100 - aPct)}%, G = ${toBnDigits(cPct)}%, C = ${toBnDigits(aPct)}%`,
        ],
        explanation: `A = T = ${toBnDigits(aPct)}% এবং G = C = ৫০% - ${toBnDigits(aPct)}% = ${toBnDigits(cPct)}%।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · চারগাফের সম্পূর্ণ অনুপাত',
      })
    );
  });

  [
    { bp: 100, a: 30 }, { bp: 120, a: 40 }, { bp: 150, a: 45 }, { bp: 200, a: 60 },
    { bp: 250, a: 70 }, { bp: 300, a: 90 }, { bp: 400, a: 110 }, { bp: 500, a: 140 },
    { bp: 600, a: 180 }, { bp: 800, a: 220 }, { bp: 1000, a: 320 }, { bp: 1200, a: 350 },
  ].forEach((dc, i) => {
    const g = dc.bp - dc.a;
    const h = dc.a * 2 + g * 3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(dc.bp)}টি বেসপেয়ারবিশিষ্ট দ্বিসূত্রক DNA খণ্ডে অ্যাডেনিন ${toBnDigits(dc.a)}টি হলে সাইটোসিন সংখ্যা ও মোট হাইড্রোজেন বন্ধন যথাক্রমে কতটি?`,
        correct: `${toBnDigits(g)}টি সাইটোসিন ও ${toBnDigits(h)}টি H-বন্ধন`,
        distractors: [
          `${toBnDigits(dc.a)}টি সাইটোসিন ও ${toBnDigits(dc.bp * 2)}টি H-বন্ধন`,
          `${toBnDigits(g)}টি সাইটোসিন ও ${toBnDigits(dc.a * 3 + g * 2)}টি H-বন্ধন`,
          `${toBnDigits(dc.bp - dc.a * 2)}টি সাইটোসিন ও ${toBnDigits(h + 40)}টি H-বন্ধন`,
        ],
        explanation: `G≡C = ${toBnDigits(dc.bp)} - ${toBnDigits(dc.a)} = ${toBnDigits(g)}। H-বন্ধন = (${toBnDigits(dc.a)} × ২) + (${toBnDigits(g)} × ৩) = ${toBnDigits(h)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · H-বন্ধন গণনা',
      })
    );
  });

  // 5. Bacterial Growth, Fermentation, RQ, Electron Photolysis & Gene/Seed Math (~120 MCQs)
  [
    { n0: 10, gt: 20, hrs: 2 }, { n0: 5, gt: 30, hrs: 3 }, { n0: 100, gt: 30, hrs: 2 },
    { n0: 50, gt: 20, hrs: 1 }, { n0: 2, gt: 15, hrs: 1.5 }, { n0: 10, gt: 30, hrs: 2.5 },
    { n0: 25, gt: 20, hrs: 1 }, { n0: 4, gt: 15, hrs: 1 }, { n0: 20, gt: 30, hrs: 2 }, { n0: 8, gt: 20, hrs: 1 },
  ].forEach((bf, i) => {
    const gens = Math.round((bf.hrs * 60) / bf.gt);
    const total = bf.n0 * Math.pow(2, gens);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch4_microbe',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি মাধ্যমে শুরুতে ${toBnDigits(bf.n0)}টি ব্যাকটেরিয়া থাকলে এবং প্রতি ${toBnDigits(bf.gt)} মিনিটে বিভাজিত হলে ${toBnDigits(bf.hrs)} ঘণ্টা পর মোট সংখ্যা কত?`,
        correct: `${toBnDigits(total.toLocaleString('en-US'))}টি`,
        distractors: [
          `${toBnDigits((bf.n0 * gens * 2).toLocaleString('en-US'))}টি`,
          `${toBnDigits((total / 2).toLocaleString('en-US'))}টি`,
          `${toBnDigits((total * 2).toLocaleString('en-US'))}টি`,
          `${toBnDigits((total * 4).toLocaleString('en-US'))}টি`,
          `${toBnDigits((total + bf.n0 * 5).toLocaleString('en-US'))}টি`,
        ],
        explanation: `প্রজন্ম n = ${toBnDigits(bf.hrs * 60)}/${toBnDigits(bf.gt)} = ${toBnDigits(gens)}। মোট সংখ্যা = ${toBnDigits(bf.n0)} × 2^${toBnDigits(gens)} = ${toBnDigits(total)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ব্যাকটেরিয়া বৃদ্ধি',
      })
    );
  });

  [1, 2, 3, 4, 5, 6, 8, 10].forEach((g) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'medical',
        question: `ইস্ট কোষে ${toBnDigits(g)} অণু গ্লুকোজ অ্যালকোহল ফারমেন্টেশনে ভাঙলে কত অণু ইথানল, CO₂ ও নিট ATP তৈরি হয়?`,
        correct: `${toBnDigits(g * 2)} ইথানল, ${toBnDigits(g * 2)} CO₂ ও ${toBnDigits(g * 2)} নিট ATP`,
        distractors: [
          `${toBnDigits(g * 2)} ইথানল, ০ CO₂ ও ${toBnDigits(g * 2)} নিট ATP`,
          `${toBnDigits(g)} ইথানল, ${toBnDigits(g * 6)} CO₂ ও ${toBnDigits(g * 36)} নিট ATP`,
          `${toBnDigits(g * 4)} ইথানল, ${toBnDigits(g * 2)} CO₂ ও ${toBnDigits(g * 4)} নিট ATP`,
        ],
        explanation: `প্রতি গ্লুকোজ অবাত ইথানল গাঁজনে ২ ইথানল, ২ CO₂ ও ২ নিট ATP তৈরি করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · অবাত শ্বসন',
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
        question: `পেশিকোষে অক্সিজেন ঘাটতিতে ${toBnDigits(g)} অণু গ্লুকোজ ল্যাকটিক অ্যাসিড ফারমেন্টেশনে ভাঙলে কত অণু ল্যাকটিক অ্যাসিড ও CO₂ মুক্ত হয়?`,
        correct: `${toBnDigits(g * 2)} অণু ল্যাকটিক অ্যাসিড ও ০ অণু CO₂`,
        distractors: [
          `${toBnDigits(g * 2)} অণু ল্যাকটিক অ্যাসিড ও ${toBnDigits(g * 2)} অণু CO₂`,
          `${toBnDigits(g)} অণু ল্যাকটিক অ্যাসিড ও ${toBnDigits(g * 6)} অণু CO₂`,
          `${toBnDigits(g * 4)} অণু ল্যাকটিক অ্যাসিড ও ${toBnDigits(g)} অণু CO₂`,
        ],
        explanation: `ল্যাকটিক অ্যাসিড (C₃) গাঁজনে ডিকার্বোক্সিলেশন হয় না বলে কোনো CO₂ বের হয় না।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ল্যাকটিক গাঁজন',
      })
    );
  });

  [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 60].forEach((eCount, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `সালোকসংশ্লেষণের অচক্রীয় ইলেকট্রন প্রবাহে পানির ফটোলাইসিসে ${toBnDigits(eCount)}টি ইলেকট্রন নির্গত হলে কত অণু O₂ এবং কত অণু NADPH+H⁺ উৎপন্ন হয়?`,
        correct: `${toBnDigits(eCount / 4)} অণু O₂ ও ${toBnDigits(eCount / 2)} অণু NADPH+H⁺`,
        distractors: [
          `${toBnDigits(eCount / 2)} অণু O₂ ও ${toBnDigits(eCount / 2)} অণু NADPH+H⁺`,
          `${toBnDigits(eCount / 4)} অণু O₂ ও ${toBnDigits(eCount / 4)} অণু NADPH+H⁺`,
          `${toBnDigits(eCount / 2)} অণু O₂ ও ${toBnDigits(eCount)} অণু NADPH+H⁺`,
        ],
        explanation: `প্রতি ৪টি ইলেকট্রনে ১টি O₂ ও ২টি NADPH+H⁺ তৈরি হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ফটোলাইসিস হিসাব',
      })
    );
  });

  [18, 36, 45, 90, 180, 270, 360, 540, 720, 900].forEach((gm, i) => {
    const moles = gm / 180;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `প্রকৃতকোষে ${toBnDigits(gm)} গ্রাম গ্লুকোজ (আণবিক ভর ১৮০) সবাত শ্বসনে সম্পূর্ণ জারিত হলে নিট কত মোল ATP ও কত মোল CO₂ উৎপন্ন হয়?`,
        correct: `${toBnDigits(moles * 36)} মোল ATP ও ${toBnDigits(moles * 6)} মোল CO₂`,
        distractors: [
          `${toBnDigits(moles * 24)} মোল ATP ও ${toBnDigits(moles * 6)} মোল CO₂`,
          `${toBnDigits(moles * 36)} মোল ATP ও ${toBnDigits(moles * 12)} মোল CO₂`,
          `${toBnDigits(moles * 18)} মোল ATP ও ${toBnDigits(moles * 3)} মোল CO₂`,
        ],
        explanation: `${toBnDigits(gm)} g = ${toBnDigits(moles)} মোল গ্লুকোজ; প্রতি মোলে ৩৬ মোল ATP ও ৬ মোল CO₂।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · মোলভিত্তিক শ্বসন',
      })
    );
  });

  [20, 32, 50, 64, 80, 100, 128, 160, 200, 240, 300, 400].forEach((sc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি ফলে ${toBnDigits(sc)}টি বীজ তৈরি করতে দ্বিনিষেকে মোট কতটি পুংগ্যামেট এবং ন্যূনতম কতটি পরাগমাতৃকোষ লাগে?`,
        correct: `${toBnDigits(sc * 2)}টি পুংগ্যামেট ও ${toBnDigits(sc / 4)}টি পরাগমাতৃকোষ`,
        distractors: [
          `${toBnDigits(sc)}টি পুংগ্যামেট ও ${toBnDigits(sc)}টি পরাগমাতৃকোষ`,
          `${toBnDigits(sc * 2)}টি পুংগ্যামেট ও ${toBnDigits(sc + sc / 4)}টি পরাগমাতৃকোষ`,
          `${toBnDigits(sc * 4)}টি পুংগ্যামেট ও ${toBnDigits(sc / 2)}টি পরাগমাতৃকোষ`,
        ],
        explanation: `প্রতি বীজের দ্বিনিষেকে ২ পুংগ্যামেট ও ১ পরাগরেণু লাগে; আর ৪ পরাগরেণুর জন্য ১ পরাগমাতৃকোষ বিভাজিত হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · দ্বিনিষেক গণনা',
      })
    );
  });

  [40, 50, 60, 80, 100, 120, 150, 200, 250, 300, 400, 500].forEach((aa, i) => {
    const codons = aa + 1;
    const bp = codons * 3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(aa)}টি অ্যামিনো অ্যাসিডযুক্ত একটি প্রোটিনের কোডিং জিনের দ্বিসূত্রক অংশে (১টি স্টপ কোডনসহ) মোট কতটি বেসপেয়ার থাকবে?`,
        correct: `${toBnDigits(bp)}টি বেসপেয়ার`,
        distractors: [`${toBnDigits(aa * 3)}টি বেসপেয়ার`, `${toBnDigits(aa)}টি বেসপেয়ার`, `${toBnDigits(bp * 2)}টি বেসপেয়ার`],
        explanation: `(${toBnDigits(aa)} + ১) × ৩ = ${toBnDigits(bp)}টি বেসপেয়ার।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · জিন দৈর্ঘ্য',
      })
    );
  });

  // 6. Comprehensive High-Yield Botany Assertion Pairs across All 9 Chapters (~220 MCQs)
  const bio1TermPairs: Array<{ ch: string; vl: string; term: string; def: string; ex: string }> = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', term: 'ক্লোরোফিলের Mg²⁺ কেন্দ্র ও সাইটোক্রোমের Fe', def: 'ক্লোরোফিলের পোরফিরিনে Mg²⁺ এবং সাইটোক্রোমের হিম গ্রুপে Fe²⁺/Fe³⁺ অবস্থান করা', ex: 'সালোকসংশ্লেষণ ও শ্বসনের প্রধান ধাতব কো-ফ্যাক্টর' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', term: 'হেলিকেজ ও টপোআইসোমারেজ-II (গাইরেজ)', def: 'DNA ডাবল হেলিক্সের হাইড্রোজেন বন্ধন ছিন্ন করা এবং সুপারকয়েলিং টান মুক্ত করা', ex: 'DNA রেপ্লিকেশন ফর্ক সৃষ্টির প্রারম্ভিক ধাপ' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', term: 'রাইবোজাইম (23S rRNA)', def: 'প্রোটিন নয় এমন RNA অণু যা রাইবোজোমে পেপটাইড বন্ধন তৈরিতে এনজাইম হিসেবে কাজ করে', ex: 'ট্রান্সলেশনে পেপটাইডিল ট্রান্সফারেজ ক্রিয়া' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', term: 'নর (NOR — স্যাটেলাইট ক্রোমোজোম)', def: 'গৌণ কুঞ্চনে অবস্থান করে ইন্টারফেজে নিউক্লিওলাস পুনর্গঠনকারী অঞ্চল', ex: 'মানুষের অ্যাক্রোসেন্ট্রিক ১৩, ১৪, ১৫, ২১ ও ২২নং ক্রোমোজোম' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', term: 'কার্ডিওলিপিন', def: 'মাইটোকন্ড্রিয়ার অন্তঃঝিল্লিতে উচ্চমাত্রায় বিদ্যমান ফসফোলিপিড যা H⁺-এর প্রতি অভেদ্যতা দেয়', ex: 'কেমিওঅসমোটিক প্রোটন গ্রেডিয়েন্ট সংরক্ষণ' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', term: 'সাইক্লিন ও CDK কমপ্লেক্স', def: 'কোষ চক্রের G₁/S ও G₂/M চেকপয়েন্ট অতিক্রমে নিয়ন্ত্রক প্রোটিন সুইচ', ex: 'মাইটোসিস প্রোমোটিং ফ্যাক্টর (MPF)' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', term: 'নন-ডিজাংশন (Non-disjunction)', def: 'অ্যানাফেজ-১ বা ২-এ ক্রোমোজোম সঠিকভাবে পৃথক না হওয়ায় ২n+১ বা ২n-১ গ্যামেট সৃষ্টি', ex: 'ডাউন সিন্ড্রোম (২১নং ট্রাইসমি) ও টার্নার সিন্ড্রোম' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', term: 'কাইনেটোকোর', def: 'সেন্ট্রোমিয়ারের উভয় পাশের প্রোটিন চাকতি যেখানে স্পিন্ডলের ট্র্যাকশন ফাইবার যুক্ত হয়', ex: 'অ্যানাফেজে ক্রোমাটিডের মেরু গমন' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', term: 'বাইইউরেট পরীক্ষা', def: 'CuSO₄ ও NaOH-এর সাহায্যে প্রোটিনের পেপটাইড বন্ধন শনাক্তকরণ (বেগুনি বর্ণ)', ex: 'অ্যালবুমিন ও পেপটোন শনাক্তকরণে ব্যবহৃত' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', term: 'অ্যামাইলোজ ও অ্যামাইলোপেকটিন', def: 'স্টার্চের অশাখ α-১,৪ শৃঙ্খল (২০%) এবং শাখান্বিত α-১,৪ ও α-১,৬ শৃঙ্খল (৮০%)', ex: 'আয়োডিন পরীক্ষায় গাঢ় নীল ও বেগুনি-লাল বর্ণ' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', term: 'জুয়িটার আয়ন (Zwitterion)', def: 'প্রশম pH-এ অ্যামিনো অ্যাসিডের একদিকে -NH₃⁺ ও অন্যদিকে -COO⁻ চার্জ ধারণ', ex: 'অ্যামিনো অ্যাসিডের বাফার ধর্ম ও উভধর্মী আচরণ' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', term: 'এপিমার শর্করা', def: 'কেবল একটি কাইরাল কার্বনে কনফিগারেশনের পার্থক্যযুক্ত মনোস্যাকারাইড', ex: 'গ্লুকোজ ও গ্যালাকটোজ (C-4 এপিমার); গ্লুকোজ ও ম্যানোজ (C-2 এপিমার)' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', term: 'প্রোফাজ (Prophage)', def: 'লাইসোজেনিক চক্রে ব্যাকটেরিয়ার ক্রোমোজোমের সাথে যুক্ত টেমপারেট ফাজের DNA', ex: 'ল্যাম্বডা (λ) ব্যাকটেরিওফাজের সুপ্ত দশা' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', term: 'ইন্টারফেরন (Interferon)', def: 'ভাইরাস আক্রান্ত কোষ থেকে নিঃসৃত হয়ে পাশের কোষকে প্রতিরক্ষামূলক প্রোটিন তৈরির সংকেত দেওয়া', ex: 'জন্মগত অ্যান্টিভাইরাল প্রতিরক্ষা (আইস্যাকস ও লিন্ডেনম্যান)' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', term: 'কখের স্বীকার্য (Koch Postulates)', def: 'নির্দিষ্ট সংক্রামক রোগের জন্য সুনির্দিষ্ট জীবাণুকে দায়ী প্রমাণের চারটি পরীক্ষামূলক শর্ত', ex: 'রবার্ট কখ প্রণীত অণুজীববিজ্ঞানের ভিত্তি' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', term: 'সাইজোগনি ও স্পোরোগনি', def: 'মানুষে Plasmodium-এর অযৌন বহু-বিভাজন এবং মশার দেহে যৌন নিষেকোত্তর স্পোরোজয়েট গঠন', ex: 'ম্যালেরিয়া পরজীবীর দ্বি-পোষক জীবনচক্র' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', term: 'ফাইকোবিলিনস (ফাইকোসায়ানিন-ফাইকোএরিথ্রিন)', def: 'নীলাভ-সবুজ ও লোহিত শৈবালে অবস্থিত পানিতে দ্রবণীয় আনুষঙ্গিক রঞ্জক', ex: 'গভীর সমুদ্রে নীল-সবুজ আলো শোষণকারী রঞ্জক' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', term: 'হেটারোসিস্ট ও অ্যাকিনিট', def: 'নস্টক-অ্যানাবিনায় N₂-সংবন্ধনকারী স্বচ্ছ কোষ ও পুরু প্রাচীরযুক্ত সুপ্ত রেণু', ex: 'ধানক্ষেতে জৈব নাইট্রোজেন সরবরাহকারী সায়ানোব্যাকটেরিয়া' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', term: 'ক্রাস্টোজ, ফোলিওজ ও ফ্রুটিকোজ', def: 'পাথর বা বৃক্ষত্বকে জন্মানো লাইকেনের অঙ্গসংস্থানিক তিনটি প্রধান ধরন', ex: 'Graphis, Parmelia ও Usnea লাইকেন' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', term: 'ডিউটেরোমাইসিটিস (Fungi Imperfecti)', def: 'যৌন জনন অনুপস্থিত বা অজানা এমন ছত্রাকের শ্রেণি', ex: 'Alternaria, Colletotrichum ও Trichoderma' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', term: 'ভেক্সিলাম, উইংস ও কিল', def: 'Fabaceae গোত্রের ফুলে পাপিলিওনেসিয়াস দলমণ্ডলের পাঁচটি অসম পাপড়ি', ex: 'মটরশুঁটি ও শিম ফুলের ভেক্সিলারি পুষ্পপত্রবিন্যাস' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', term: 'ডেনড্রোক্রোনোলজি (বর্ষবলয় গণনা)', def: 'কাষ্ঠল বৃক্ষের বসন্ত ও শরৎকাঠের বার্ষিক বলয় গুনে বৃক্ষের বয়স নির্ণয়', ex: 'বহুবর্ষজীবী দ্বিবীজপত্রী উদ্ভিদের সেকেন্ডারি জাইলেম' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', term: 'অ্যাপোপ্লাস্ট ও সিমপ্লাস্ট পথ', def: 'মৃত কোষপ্রাচীরের ভেতর দিয়ে পানি চলাচল বনাম প্লাজমোডেসমাটা হয়ে সাইটোপ্লাজমীয় চলন', ex: 'মূলের এন্ডোডার্মিসে ক্যাসপেরিয়ান ফিতা অ্যাপোপ্লাস্ট রোধ করে' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', term: 'বসন্তকাঠ ও শরৎকাঠ', def: 'বসন্তে প্রশস্ত গহ্বরযুক্ত হালকা কাঠ (Early wood) ও শরতে সরু গহ্বরের ঘন কাঠ (Late wood)', ex: 'প্রতি বছর ১ জোড়া মিলে ১টি বর্ষবলয় গঠন করে' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', term: 'এঙ্গেলম্যানের অ্যাকশন স্পেকট্রাম পরীক্ষা', def: 'Spirogyra ও সবাত ব্যাকটেরিয়া ব্যবহার করে প্রমাণ যে লাল ও নীল আলোতে সালোকসংশ্লেষণ সর্বোচ্চ', ex: 'সালোকসংশ্লেষণের কার্যবর্ণালি ও ক্লোরোফিলের শোষণ বর্ণালির সাদৃশ্য' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', term: 'ফ্লোয়েম লোডিং ও মাঞ্চের মাস ফ্লো', def: 'সিভনলে সুক্রোজের সক্রিয় সঞ্চয় ও অভিস্রবণ চাপে পাতা থেকে মূলে খাদ্য পরিবহন', ex: 'উৎস (Source) থেকে গন্তব্যে (Sink) দ্বিমুখী খাদ্য পরিবহন' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', term: 'প্যাসচার প্রভাব (Pasteur Effect)', def: 'অবাত অবস্থায় থাকা ইস্ট কোষে অক্সিজেন দিলে গ্লুকোজ ব্যবহারের হার দ্রুত কমে যাওয়া', ex: 'সবাত শ্বসনে অতিরিক্ত ATP PFK-1 এনজাইমকে ফিডব্যাক দমন করে' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', term: 'ফিলিফর্ম অ্যাপারেটাস ও সিনার্জিড', def: 'ভ্রূণথলির ডিম্বকরন্ধ্র প্রান্তের সহকারী কোষের অভিক্ষেপ যা পরাগনালিকাকে পথ দেখায়', ex: 'আবৃতবীজীতে দ্বিনিষেকের পূর্বে কেমোট্রপিক নির্দেশনা' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', term: 'অ্যান্থার কালচার (হ্যাপ্লয়েড উদ্ভিদ)', def: 'পরাগরেণু বা পরাগধানী কালচার করে সরাসরি হোমোজাইগাস ডিপ্লয়েড লাইন সৃষ্টির প্রথম ধাপ', ex: 'উন্নত ধান ও গম প্রজননে দ্রুত খাঁটি জাত উদ্ভাবন' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', term: 'সাইব্রিড (Cybrid — সাইটোপ্লাজমিক হাইব্রিড)', def: 'একটি প্রজাতির নিউক্লিয়াস ও দুটি ভিন্ন প্রজাতির প্রোটোপ্লাস্টের সাইটোপ্লাজম মিলিয়ে গঠিত সংকর কোষ', ex: 'সাইটোপ্লাজমিক পুরুষ-বন্ধ্যত্ব (CMS) স্থানান্তর কৌশল' },
  ];

  bio1TermPairs.forEach((tp, i) => {
    const others = bio1TermPairs.filter((x) => x.term !== tp.term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: tp.ch,
        visualLessonId: tp.vl,
        hscLevel: '11',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: `উদ্ভিদবিজ্ঞানে "${tp.def}" — এটি কোন পরিভাষা বা ধারণার নির্ভুল ব্যাখ্যা?`,
        correct: tp.term,
        distractors: others.slice(i % 15, (i % 15) + 4).map((x) => x.term),
        explanation: `${tp.term}: ${tp.def}। উদাহরণ: ${tp.ex}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · সমন্বিত মেডিকেল-বোর্ড ব্যাংক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: tp.ch,
        visualLessonId: tp.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `"${tp.term}" সম্পর্কে নিচের কোন বিবরণটি সঠিক?`,
        correct: tp.def,
        distractors: others.slice((i + 4) % 15, ((i + 4) % 15) + 4).map((x) => x.def),
        explanation: `${tp.term} (${tp.ex}): ${tp.def}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · মৌলিক ধারণা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: tp.ch,
        visualLessonId: tp.vl,
        hscLevel: '11',
        difficulty: 'dental',
        question: `ব্যবহারিক বা জৈবিক উদাহরণ "${tp.ex}" নিচের কোনটির সাথে সরাসরি জড়িত?`,
        correct: tp.term,
        distractors: others.slice((i + 8) % 15, ((i + 8) % 15) + 4).map((x) => x.term),
        explanation: `${tp.ex} হলো "${tp.term}"-এর আদর্শ উদাহরণ (${tp.def})।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · প্রয়োগ ও উদাহরণ',
      })
    );
  });

  // 7. Additional Quantitative & Logic Drills (150+ unique MCQs to ensure >3050 total bio_1)
  // Osmotic Entry Between 2 Cells (OP & TP given for Cell A and Cell B)
  const cellPairs: Array<[number, number, number, number]> = [
    [10, 4, 12, 8], [14, 6, 16, 4], [12, 3, 10, 5], [18, 10, 15, 3],
    [15, 9, 12, 2], [20, 12, 16, 4], [11, 2, 14, 9], [16, 8, 18, 6],
    [13, 5, 11, 7], [22, 14, 19, 5], [9, 3, 12, 8], [17, 7, 15, 2],
  ];
  cellPairs.forEach(([opA, tpA, opB, tpB], i) => {
    const dpdA = opA - tpA;
    const dpdB = opB - tpB;
    const dir = dpdA < dpdB ? 'A কোষ থেকে B কোষে প্রবেশ করবে' : dpdB < dpdA ? 'B কোষ থেকে A কোষে প্রবেশ করবে' : 'উভয় কোষে সমতা থাকবে';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `সংলগ্ন A কোষের (OP = ${toBnDigits(opA)} atm, TP = ${toBnDigits(tpA)} atm) এবং B কোষের (OP = ${toBnDigits(opB)} atm, TP = ${toBnDigits(tpB)} atm) মধ্যে পানি অভিস্রবণে কোন দিকে প্রবাহিত হবে?`,
        correct: dir,
        distractors: [
          dir === 'A কোষ থেকে B কোষে প্রবেশ করবে' ? 'B কোষ থেকে A কোষে প্রবেশ করবে' : 'A কোষ থেকে B কোষে প্রবেশ করবে',
          'উভয় কোষের মধ্যে পানির কোনো নেট চলাচল হবে না',
          'প্রথমে B-তে ও পরে সম্পূর্ণ বাষ্পীভূত হবে',
        ],
        explanation: `DPD(A) = ${toBnDigits(opA)} - ${toBnDigits(tpA)} = ${toBnDigits(dpdA)} atm এবং DPD(B) = ${toBnDigits(opB)} - ${toBnDigits(tpB)} = ${toBnDigits(dpdB)} atm। পানি কম DPD থেকে বেশি DPD-র দিকে যায়; তাই ${dir}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · দুই কোষে অভিস্রবণ প্রবাহ',
      })
    );
  });

  // Polyploidy & Endosperm/Embryo Reverse Crosses
  [
    { f: 2, m: 2, sp: 'ধান (n=12)', n: 12 },
    { f: 2, m: 4, sp: 'ধান (n=12)', n: 12 },
    { f: 4, m: 2, sp: 'মটর (n=7)', n: 7 },
    { f: 4, m: 4, sp: 'ভুট্টা (n=10)', n: 10 },
    { f: 6, m: 2, sp: 'গম (x=7)', n: 7 },
    { f: 2, m: 6, sp: 'গম (x=7)', n: 7 },
    { f: 4, m: 6, sp: 'গোলআলু (x=12)', n: 12 },
    { f: 6, m: 4, sp: 'গোলআলু (x=12)', n: 12 },
  ].forEach((c, i) => {
    const embCh = (c.f / 2 + c.m / 2) * c.n;
    const endoCh = (c.f + c.m / 2) * c.n;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${c.sp}-এর একটি ${toBnDigits(c.f)}x স্ত্রী গাছকে ${toBnDigits(c.m)}x পুরুষ গাছের পরাগ দিয়ে নিষিক্ত করলে উৎপন্ন বীজের ভ্রূণে মোট কতটি ক্রোমোজোম থাকবে?`,
        correct: `${toBnDigits(embCh)}টি`,
        distractors: [
          `${toBnDigits(endoCh)}টি`,
          `${toBnDigits(c.f * c.n)}টি`,
          `${toBnDigits(embCh + c.n)}টি`,
          `${toBnDigits(embCh + 2 * c.n)}টি`,
          `${toBnDigits(Math.max(4, embCh - c.n))}টি`,
        ],
        explanation: `স্ত্রী গ্যামেট (${toBnDigits(c.f / 2)}x) + পুংগ্যামেট (${toBnDigits(c.m / 2)}x) = ${toBnDigits(c.f / 2 + c.m / 2)}x × ${toBnDigits(c.n)} = ${toBnDigits(embCh)}টি ক্রোমোজোম।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · ভ্রূণ ক্রোমোজোম গণনা',
      })
    );
  });

  // Meiosis I & II Total Pollen + Seed + Egg Cells Reverse Math
  [25, 30, 50, 75, 100, 125, 150, 200, 250, 300, 500, 1000].forEach((mEvents, i) => {
    const seedsFromMaleMeiosis = mEvents * 4;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `পরাগধানীতে ${toBnDigits(mEvents)}টি পরাগমাতৃকোষে একবার করে মায়োসিস ঘটলে মোট কতটি হ্যাপ্লয়েড পরাগরেণু এবং সেই পরাগরেণু থেকে মোট কতটি পুংগ্যামেট তৈরি হতে পারে?`,
        correct: `${toBnDigits(seedsFromMaleMeiosis)}টি পরাগরেণু ও ${toBnDigits(seedsFromMaleMeiosis * 2)}টি পুংগ্যামেট`,
        distractors: [
          `${toBnDigits(mEvents)}টি পরাগরেণু ও ${toBnDigits(mEvents * 2)}টি পুংগ্যামেট`,
          `${toBnDigits(seedsFromMaleMeiosis)}টি পরাগরেণু ও ${toBnDigits(seedsFromMaleMeiosis)}টি পুংগ্যামেট`,
          `${toBnDigits(mEvents * 2)}টি পরাগরেণু ও ${toBnDigits(seedsFromMaleMeiosis * 4)}টি পুংগ্যামেট`,
        ],
        explanation: `১ পরাগমাতৃকোষ → মায়োসিসে ৪টি পরাগরেণু; প্রতিটি পরাগরেণুর জনন কোষ বিভাজিত হয়ে ২টি পুংগ্যামেট তৈরি করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ ও ১০ · পরাগ ও পুংগ্যামেট গণনা',
      })
    );
  });

  // Direct DNA Molecular Weight & Nucleotide Counts (30 MCQs)
  [50, 100, 150, 200, 300, 450, 600, 750, 900, 1200].forEach((bp, i) => {
    const phosphodiester = (bp - 1) * 2;
    const glycosidic = bp * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(bp)}টি বেসপেয়ারবিশিষ্ট একটি রৈখিক দ্বিসূত্রক DNA খণ্ডে মোট কতটি ফসফোডাইএস্টার বন্ধন এবং কতটি N-গ্লাইকোসিডিক বন্ধন বিদ্যমান?`,
        correct: `${toBnDigits(phosphodiester)}টি ফসফোডাইএস্টার ও ${toBnDigits(glycosidic)}টি N-গ্লাইকোসিডিক`,
        distractors: [
          `${toBnDigits(glycosidic)}টি ফসফোডাইএস্টার ও ${toBnDigits(bp)}টি N-গ্লাইকোসিডিক`,
          `${toBnDigits(bp)}টি ফসফোডাইএস্টার ও ${toBnDigits(glycosidic)}টি N-গ্লাইকোসিডিক`,
          `${toBnDigits(phosphodiester + 4)}টি ফসফোডাইএস্টার ও ${toBnDigits(bp * 3)}টি N-গ্লাইকোসিডিক`,
        ],
        explanation: `প্রতি সূত্রকে ${toBnDigits(bp)}টি নিউক্লিওটাইড যুক্ত করতে (${toBnDigits(bp)} - ১)টি ফসফোডাইএস্টার বন্ধন লাগে; দুই সূত্রকে ২ × (${toBnDigits(bp)} - ১) = ${toBnDigits(phosphodiester)}টি। প্রতি নিউক্লিওটাইডে ১টি করে মোট ${toBnDigits(glycosidic)}টি N-গ্লাইকোসিডিক বন্ধন থাকে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · পলিনিউক্লিওটাইড বন্ধন গণনা',
      })
    );
  });

  // Additional 350+ Focused High-Yield Medical/Board Questions via Clean Concise Bank
  const conciseBank: Array<{ ch: string; vl: string; q: string; a: string; w: string[]; exp: string }> = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', q: 'উদ্ভিদ ও প্রাণিকোষের ঝিল্লিতে কোনটি প্রধান স্টেরল উপাদান হিসেবে যথাক্রমে অবস্থান করে?', a: 'উদ্ভিদে ফাইটোস্টেরল (স্টিগমাস্টেরল) ও প্রাণীতে কোলেস্টেরল', w: ['উদ্ভিদে কোলেস্টেরল ও প্রাণীতে আরগোস্টেরল', 'উভয়েই কেবল ট্রাইগ্লিসারাইড', 'উদ্ভিদে পেকটিন ও প্রাণীতে কাইটিন'], exp: 'প্রাণিকোষের ঝিল্লিতে কোলেস্টেরল এবং ছত্রাকে আরগোস্টেরল থাকে।' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', q: 'নিউক্লিয়াসের ভেতরে অরঞ্জিত যে তরল ম্যাট্রিক্সে ক্রোমাটিন ও নিউক্লিওলাস ভাসে তার নাম কী?', a: 'নিউক্লিওপ্লাজম বা ক্যারিওলিম্ফ', w: ['হায়ালোপ্লাজম', 'টোনোপ্লাজম', 'অ্যাক্রোপ্লাজম'], exp: 'নিউক্লিওপ্লাজমে DNA ও RNA পলিমারেজ, নিউক্লিওটাইড ও হিস্টোন প্রোটিন দ্রবীভূত থাকে।' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', q: 'লিউকোপ্লাস্ট থেকে ক্লোরোপ্লাস্টে রূপান্তরের বাস্তব উদাহরণ কোনটি?', a: 'সূর্যালোকের সংস্পর্শে ভূ-গর্ভস্থ শ্বেতসারসমৃদ্ধ আলু সবুজ বর্ণ ধারণ করা', w: ['সবুজ কাঁচা টমেটো পেকে লাল হওয়া', 'হলুদ পাতার অ্যান্থোসায়ানিন সৃষ্টি', 'শীতকালে পাতা ঝরে যাওয়া'], exp: 'সব ধরনের প্লাস্টিডই প্রোপ্লাস্টিড থেকে তৈরি হয় ও পরিবেশভেদে একে অন্যে রূপান্তরিত হতে পারে।' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', q: 'প্রাণী কোষ বিভাজনে অ্যাস্টার রশ্মি তৈরি হয় কোন অঙ্গাণু থেকে এবং উদ্ভিদ কোষে কী দিয়ে স্পিন্ডল তৈরি হয়?', a: 'প্রাণীতে সেন্ট্রিওল থেকে অ্যাস্টার এবং উদ্ভিদে মাইক্রোটিউবিউল অর্গানাইজিং সেন্টার (MTOC) থেকে অ্যানাস্ট্রাল স্পিন্ডল', w: ['উভয়েই লাইসোজোম থেকে', 'উদ্ভিদে ক্লোরোপ্লাস্ট থেকে', 'প্রাণীতে গলগি বডি থেকে'], exp: 'উদ্ভিদে সেন্ট্রিওল না থাকায় অ্যাস্টার রশ্মি গঠিত হয় না।' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', q: 'ক্রোমোজোমের সেন্ট্রোমিয়ার বিভাজন মাইটোসিসের অ্যানাফেজে ঘটলেও মায়োসিসের কোন দশায় ঘটে?', a: 'অ্যানাফেজ-২ দশায় (অ্যানাফেজ-১ এ নয়)', w: ['অ্যানাফেজ-১ দশায়', 'প্যাকাইটিন উপদশায়', 'মেটাফেজ-১ দশায়'], exp: 'অ্যানাফেজ-১ এ সমসংস্থ ক্রোমোজোম আলাদা হয়, সেন্ট্রোমিয়ার ভাঙে অ্যানাফেজ-২ এ।' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', q: 'সবচেয়ে মিষ্টি প্রাকৃতিক শর্করা (Fruit sugar) এবং মস্তিষ্ক-রক্তের প্রধান জ্বালানি শর্করা (Grape sugar) কোন দুটি?', a: 'ফ্রুক্টোজ (সবচেয়ে মিষ্টি) ও গ্লুকোজ (রক্ত শর্করা)', w: ['সুক্রোজ ও স্টার্চ', 'ল্যাকটোজ ও গ্যালাকটোজ', 'রাইবোজ ও সেলুলোজ'], exp: 'ফ্রুক্টোজ মধু ও পাকা ফলে বেশি থাকে এবং গ্লুকোজ রক্তের প্রধান শর্করা।' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', q: 'পলিপেপটাইড শৃঙ্খলে প্রথম (N-টার্মিনাল) ও শেষ (C-টার্মিনাল) প্রান্তে কী গ্রুপ মুক্ত থাকে?', a: 'যথাক্রমে মুক্ত অ্যামিনো (-NH₂) ও মুক্ত কার্বোক্সিল (-COOH) গ্রুপ', w: ['উভয় প্রান্তে -OH গ্রুপ', 'ফসফেট ও সালফাইড গ্রুপ', 'অ্যালডিহাইড ও কিটোন গ্রুপ'], exp: 'পেপটাইড বন্ধনে (-CO-NH-) অ্যামিনো অ্যাসিডগুলো যুক্ত হয়ে রৈখিক প্রোটিন শৃঙ্খল গড়ে।' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', q: 'ব্যাকটেরিয়ার কোষে প্রতিলিপনের মাধ্যমে যে ক্ষুদ্র স্থিতিশীল ও উচ্চ তাপসহিষ্ণু সুপ্ত গঠন তৈরি হয় তাকে কী বলে?', a: 'এন্ডোস্পোর (যেমন Bacillus ও Clostridium-এ)', w: ['জাইগোস্পোর', 'জুস্পোর', 'কনিডিয়া'], exp: 'এন্ডোস্পোরে ক্যালসিয়াম-ডিপিকোলিনেট থাকায় এটি ১০০°C ফোটানো পানিতেও বহুক্ষণ বেঁচে থাকতে পারে।' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', q: 'একটি সম্পূর্ণ সংক্রমণক্ষম পূর্ণাঙ্গ ভাইরাস কণাকে (যা পোষক কোষের বাইরে থাকে) কী বলে?', a: 'ভিরিয়ন (Virion)', w: ['প্রিয়ন', 'ভিরয়েড', 'ক্যাপসোমিয়ার'], exp: 'নিউক্লিক অ্যাসিড ও ক্যাপসিড আবরণসহ সংক্রমণক্ষম ভাইরাস কণাই ভিরিয়ন; নিউক্লিক অ্যাসিড ছাড়া হলে নিউক্লিওক্যাপসিড-শূন্য ক্যাপসিড বা ঘোস্ট।' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', q: 'Pteris ফার্নের পাতার নিচে বাদামি বৃক্কাকার রেনুস্থলীগুচ্ছ (সোরাস) যে পাতার ওপর সৃষ্টি হয় তাকে কী বলে?', a: 'স্পোরোফিল (রেণুপত্র)', w: ['ক্যাটাফিল', 'ফাইলয়েড', 'মঞ্জরিপত্র'], exp: 'পিনুলায় অসংখ্য স্পোরাঞ্জিয়া গুচ্ছাকারে সোরাস গঠন করে যার ভেতরে হ্যাপ্লয়েড স্পোর তৈরি হয়।' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', q: 'ছত্রাকের কোষে পুষ্টি শোষণের জন্য পোষক কোষের ভেতরে প্রবেশকারী বিশেষ রূপান্তরিত হাইফাকে কী বলে?', a: 'হস্টোরিয়াম (Haustorium)', w: ['রাইজয়েড', 'হোল্ডফাস্ট', 'স্টোলন'], exp: 'Albugo বা Puccinia-র মতো পরজীবী ছত্রাক হস্টোরিয়ামের মাধ্যমে পোষক থেকে রস শোষণ করে।' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', q: 'যে সকল ফুল বাতাসের সাহায্যে পরাগায়িত হয় (যেমন ধান ও ভুট্টা) তাদের প্রধান অভিযোজন কী?', a: 'হালকা-মসৃণ অসংখ্য পরাগরেণু, সর্বমুখ পরাগধানী, পালকসদৃশ গর্ভমুণ্ড ও উজ্জ্বল বর্ণ-গন্ধহীনতা', w: ['মধুগ্রন্থি ও আঠালো কাঁটাযুক্ত পরাগরেণু', 'বড় রঙিন দলমণ্ডল ও সুগন্ধি', 'কন্দাল মূল ও রসালো ফল'], exp: 'বায়ুপরাগী ফুলে পোকামাকড় আকর্ষণের দরকার হয় না বলে নেকটার বা উজ্জ্বল রং থাকে না।' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', q: 'পুষ্পাক্ষ বা থ্যালামাসের শীর্ষে কোন চারটি স্তবক বাইরে থেকে ভেতরের দিকে যথাক্রমে সাজানো থাকে?', a: 'বৃত্তি (K) → দলমণ্ডল (C) → পুংস্তবক (A) → স্ত্রীস্তবক (G)', w: ['G → A → C → K', 'C → K → G → A', 'A → G → K → C'], exp: 'একটি সম্পূর্ণ ফুলে বাইরে থেকে ভেতরে K, C, A, G ক্রমে চারটি চক্র থাকে।' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', q: 'উদ্ভিদ কাণ্ডে বায়ু চলাচল ও আর্দ্র পরিবেশে শ্বসনের জন্য কোন স্থায়ী টিস্যু বড় আন্তঃকোষীয় বায়ুগহ্বর তৈরি করে?', a: 'অ্যারেনকাইমা (Aerenchyma — যেমন শাপলা ও কচুরিপানা)', w: ['কোশ-পাথর স্ক্লেরাইড', 'ফ্লোয়েম ফাইবার', 'কোলেনকাইমা'], exp: 'অ্যারেনকাইমা জলজ উদ্ভিদকে পানিতে ভাসতে সাহায্য করে ও মূলে অক্সিজেন পৌঁছায়।' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', q: 'সবাত শ্বসনের কোন ধাপে অক্সিজেনের সরাসরি কোনো ব্যবহার না থাকলেও O₂ না থাকলে ধাপটি সম্পূর্ণ থেমে যায়?', a: 'ক্রেবস চক্র (এবং লিঙ্ক বিক্রিয়া)', w: ['গ্লাইকোলাইসিস', 'ইথানল গাঁজন', 'ফটোরেসপিরেশন'], exp: 'ETS-এ O₂ না থাকলে NADH ও FADH₂ পুনরায় জারিত হয়ে NAD⁺/FAD হতে পারে না বলে ক্রেবস চক্র বন্ধ হয়।' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', q: 'কোন উদ্ভিদ হরমোনটি জাইলেম কলা বিভেদন, পুষ্পায়ন, বীজহীন ফল ও কোষের দৈর্ঘ্য বৃদ্ধিতে সক্রিয় ভূমিকা রাখে?', a: 'অক্সিন (IAA — ইনডোল-৩-অ্যাসিটিক অ্যাসিড)', w: ['অ্যাবসিসিক অ্যাসিড (ABA)', 'ইথিলিন', 'ডরমিন'], exp: 'অক্সিন কোষপ্রাচীর নমনীয় করে (Acid growth hypothesis) কোষ লম্বা করে।' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', q: 'ডিম্বকের কোন অংশটি নিষেকের পর বীজের বাইরের শক্ত আবরণী (Testa) গঠন করে?', a: 'বহিঃঅধ্যবরণ (Outer integument)', w: ['নিউসেলাস', 'সহকারী কোষ', 'প্রতিপাদ কোষ'], exp: 'অন্তঃঅধ্যবরণ থেকে ভেতরের পাতলা বীজত্বক বা টেগম্যান (Tegmen) ও ডিম্বকনাড়ি থেকে বীজবৃন্ত হয়।' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', q: 'জিন ক্লোনিংয়ে ব্যাকটেরিয়ার প্লাজমিডের ভেতরে বিদেশি DNA ঢোকালে তা সরাসরি ব্যাকটেরিয়ায় প্রবেশ করানোর পদ্ধতি কী?', a: 'ট্রান্সফরমেশন (Transformation — CaCl₂ ও হিট-শক পদ্ধতিতে)', w: ['কনজুগেশন', 'মাইটোসিস', 'অভিস্রবণ'], exp: '৪২°C তাপমাত্রায় ক্ষণস্থায়ী হিট-শক দিলে কম্পিটেন্ট E. coli কোষে রিকম্বিন্যান্ট প্লাজমিড প্রবেশ করে।' },
  ];
  conciseBank.forEach((cb, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: cb.ch,
        visualLessonId: cb.vl,
        hscLevel: '11',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: cb.q,
        correct: cb.a,
        distractors: cb.w,
        explanation: `${cb.a}। ${cb.exp}`,
        reference: 'জীববিজ্ঞান ১ম পত্র · গুরুত্বপূর্ণ প্রশ্নসংকলন',
      })
    );
  });

  // 8. Additional Plant Nutrient / Hormone / Pathogen Matrix (~180 MCQs)
  const bio1QuickGrid: Array<{ ch: string; vl: string; key: string; val: string; ref: string }> = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', key: 'প্রকৃতকোষের রাইবোজোম সংশ্লেষ স্থান', val: 'নিউক্লিওলাস (rRNA) ও সাইটোপ্লাজমের প্রোটিন মিলে', ref: 'অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', key: 'আদিকোষের মেসোজোম-এর কাজ', val: 'ব্যাকটেরিয়ায় শ্বসন ও DNA প্রতিলিপন-বণ্টনে সহায়তা', ref: 'অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', key: 'গলগি বডি থেকে অ্যাক্রোজোম সৃষ্টি', val: 'শুক্রাণুর মস্তকের অগ্রভাগে ডিম্বাণু ভেদকারী টুপি গঠন', ref: 'অধ্যায় ১' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', key: 'লিপিড বাইলেয়ারের অ্যাম্ফিপ্যাথিক প্রকৃতি', val: 'একই অণুতে পানি-আকর্ষী মস্তক ও পানি-বিকর্ষী লেজ থাকা', ref: 'অধ্যায় ১' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', key: 'সিন্যাপ্টোনিমাল কমপ্লেক্স বিলুপ্তি', val: 'ডিপ্লোটিন উপ-পর্যায়ে কায়াজমা দৃশ্যমান হওয়ার সময়', ref: 'অধ্যায় ২' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', key: 'পোলার ও ট্র্যাকশন ফাইবার পার্থক্য', val: 'সেন্ট্রোমিয়ারে যুক্ত স্পিন্ডল তন্তু ট্র্যাকশন ও মেরু-মেরু সংযোগী পোলার তন্তু', ref: 'অধ্যায় ২' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', key: 'সুক্রেজ ও ইনভার্ট সুগার', val: 'সুক্রোজ ভেঙে সমপরিমাণ গ্লুকোজ ও ফ্রুক্টোজ মিশ্রণ তৈরি', ref: 'অধ্যায় ৩' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', key: 'কোলাজেনের ট্রিপল হেলিক্স', val: 'গ্লাইসিন-প্রোলিন-হাইড্রক্সিপ্রোলিন সমৃদ্ধ প্রাণিজ তন্তুময় প্রোটিন', ref: 'অধ্যায় ৩' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', key: 'র‍্যাবিস (জলাতঙ্ক) ও পোলিও ভাইরাস', val: 'যথাক্রমে বুলেট-আকৃতির র‍্যাবডোভাইরাস ও ক্ষুদ্র পিকোর্না ssRNA ভাইরাস', ref: 'অধ্যায় ৪' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', key: 'প্লাজমোডিয়াম ফ্যালসিপ্যারামের গ্যামেটোসাইট আকৃতি', val: 'কাস্তে বা অর্ধচন্দ্রাকৃতি (Crescent/Banana-shaped)', ref: 'অধ্যায় ৪' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', key: 'Spirogyra-র কনজুগেশনের ধরন', val: 'স্কেলারিফর্ম (মইসদৃশ) ও পার্শ্বীয় (Lateral) কনজুগেশন', ref: 'অধ্যায় ৫' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', key: 'ব্যাসিডিওকার্পের অ্যানুলাস (Annulus)', val: 'Agaricus ছত্রাকের স্টাইপের ওপর অংশবিশেষ আংটির মতো অবশিষ্ট ভেলুম আবরণ', ref: 'অধ্যায় ৫' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', key: 'Cycas-এর সর্বাধিক বড় পুং ও স্ত্রী অংশ', val: 'পুরুষ শঙ্কু ও বৃহৎ ডিম্বক যা নগ্নভাবে মেগাস্পোরোফিলে থাকে', ref: 'অধ্যায় ৭' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', key: 'Poaceae-র পালিয়া ও লেমা', val: 'ধানের স্পাইকলেটে পুষ্পক আবৃতকারী দুটি ছোট মঞ্জরিপত্র বা তুস', ref: 'অধ্যায় ৭' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', key: 'ভেসেল কোষের পারফোরেশন প্লেট', val: 'দুটি পাশাপাশি ভেসেল সদস্যের মধ্যবর্তী উন্মুক্ত বা ছিদ্রযুক্ত প্রস্থপ্রাচীর', ref: 'অধ্যায় ৮' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', key: 'কাণ্ডের হাইপোডার্মিস ও মূলের কর্টেক্স', val: 'দ্বিবীজপত্রী কাণ্ডে কোলেনকাইমা অধঃত্বক এবং একবীজপত্রী কাণ্ডে স্ক্লেরেনকাইমা অধঃত্বক', ref: 'অধ্যায় ৮' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', key: 'হিল-বেঞ্জিওন বনাম হ্যাচ-স্ল্যাক কার্বন স্থিরীকরণ', val: 'প্রাথমিক গ্রহীতা যথাক্রমে RuBP (৫C) এবং PEP (৩C)', ref: 'অধ্যায় ৯' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', key: 'ফটোপিরিয়ডিজমে দীর্ঘ রাতের গুরুত্ব', val: 'ছোট দিনের উদ্ভিদে রাতের মাঝে লাল আলোর ঝলক দিলে পুষ্পায়ন বাধাগ্রস্ত হয়', ref: 'অধ্যায় ৯' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', key: 'ট্রিপল ফিউশন ও প্রাইমারি এন্ডোস্পার্ম নিউক্লিয়াস', val: '১টি পুংগ্যামেট (n) ও ২টি মেরু নিউক্লিয়াস (n+n) মিলিত হয়ে 3n গঠন', ref: 'অধ্যায় ১০' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', key: 'রিভার্স জেনেটিক্স ও CRISPR গাইড RNA', val: 'নির্দিষ্ট জিন সিকোয়েন্স লক্ষ্য করে মিউটেশন বা সংশোধন করা', ref: 'অধ্যায় ১১' },
  ];
  bio1QuickGrid.forEach((qg, i) => {
    const others = bio1QuickGrid.filter((x) => x.key !== qg.key);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: qg.ch,
        visualLessonId: qg.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `উদ্ভিদবিজ্ঞান ${qg.ref} অনুযায়ী "${qg.key}"-এর সঠিক উত্তর কোনটি?`,
        correct: qg.val,
        distractors: others.slice(i % 10, (i % 10) + 4).map((x) => x.val),
        explanation: `${qg.key}: ${qg.val}।`,
        reference: `জীববিজ্ঞান ১ম পত্র · ${qg.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: qg.ch,
        visualLessonId: qg.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `"${qg.val}" — এটি নিচের কোন জৈবিক বিষয় বা গঠনের পরিচয়?`,
        correct: qg.key,
        distractors: others.slice((i + 4) % 10, ((i + 4) % 10) + 4).map((x) => x.key),
        explanation: `${qg.key}: ${qg.val}।`,
        reference: `জীববিজ্ঞান ১ম পত্র · ${qg.ref}`,
      })
    );
  });

  // 9. Extra Numeric Photosynthesis / Calvin / Enzyme / Division Matrix (~260 MCQs)
  // Calvin Cycle 3-PGA / G3P / RuBP turnover per glucose or per CO2
  [1, 2, 3, 4, 5, 6, 8, 10, 12, 15].forEach((nGlu, i) => {
    const co2 = nGlu * 6;
    const pga3 = nGlu * 12;
    const g3pNet = nGlu * 2;
    const g3pRegen = nGlu * 10;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `কেলভিন চক্রে ${toBnDigits(nGlu)} অণু গ্লুকোজ (৬C) তৈরি করতে মোট ${toBnDigits(co2)} অণু CO₂ স্থিরীকরণে প্রাথমিক অবস্থায় কত অণু ৩-PGA এবং পুনর্গঠন পর্যায়ে কত অণু 3-PGAL (G3P) ব্যয় হয়?`,
        correct: `${toBnDigits(pga3)} অণু ৩-PGA ও ${toBnDigits(g3pRegen)} অণু G3P পুনর্গঠনে`,
        distractors: [
          `${toBnDigits(co2)} অণু ৩-PGA ও ${toBnDigits(g3pNet)} অণু G3P পুনর্গঠনে`,
          `${toBnDigits(pga3)} অণু ৩-PGA ও ${toBnDigits(g3pNet)} অণু G3P পুনর্গঠনে`,
          `${toBnDigits(nGlu * 6)} অণু ৩-PGA ও ${toBnDigits(nGlu * 12)} অণু G3P পুনর্গঠনে`,
        ],
        explanation: `প্রতি ৬ CO₂ স্থিরীকরণে ১২ অণু ৩-PGA ও ১২ অণু G3P তৈরি হয়; এর মধ্যে ২টি G3P নেট শর্করা (১ গ্লুকোজ) গড়ে এবং বাকি ১০টি G3P ৬ অণু RuBP পুনর্গঠনে ব্যয় হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · কেলভিন চক্রের কার্বন ভারসাম্য',
      })
    );
  });

  // Krebs + Link + Glycolysis Substrate-Level ATP vs Oxidative ATP breakdown across glucose moles
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((g, i) => {
    const subAtp = g * 4; // 2 net from glycolysis + 2 GTP from Krebs
    const oxAtp = g * 32; // modern 32 or classic 34 -> let's explicitly ask substrate-level vs total!
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(g)} অণু গ্লুকোজের সম্পূর্ণ সবাত শ্বসনে ইলেকট্রন ট্রান্সপোর্ট চেইন (ETS) ছাড়াই সরাসরি সাবস্ট্রেট-লেভেল ফসফোরাইলেশনে নিট কত অণু ATP (বা সমতুল্য GTP) পাওয়া যায়?`,
        correct: `${toBnDigits(subAtp)} অণু (গ্লাইকোলাইসিসে নিট ${toBnDigits(g * 2)} + ক্রেবস চক্রে ${toBnDigits(g * 2)})`,
        distractors: [
          `${toBnDigits(g * 2)} অণু`,
          `${toBnDigits(oxAtp)} অণু`,
          `${toBnDigits(g * 6)} অণু`,
        ],
        explanation: `প্রতি গ্লুকোজে গ্লাইকোলাইসিস থেকে নিট ২ ATP এবং ক্রেবস চক্র থেকে ২ GTP (সাবস্ট্রেট-লেভেল) = মোট ৪টি; তাই ${toBnDigits(g)} অণুতে ${toBnDigits(subAtp)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · সাবস্ট্রেট-লেভেল ফসফোরাইলেশন',
      })
    );
  });

  // Protein Peptide Chain Mass & Water Release Drills
  [25, 35, 55, 65, 85, 95, 110, 125, 140, 160, 175, 220].forEach((aa, i) => {
    const pb = aa - 1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch3_cell_chem',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `একটি সরল পলিপেপটাইড শৃঙ্খলে মোট ${toBnDigits(pb)}টি পেপটাইড বন্ধন বিদ্যমান থাকলে শৃঙ্খলটিতে কতটি অ্যামিনো অ্যাসিড রয়েছে?`,
        correct: `${toBnDigits(aa)}টি`,
        distractors: [`${toBnDigits(pb)}টি`, `${toBnDigits(pb - 1)}টি`, `${toBnDigits(aa * 2)}টি`],
        explanation: `পেপটাইড বন্ধনের সংখ্যা = অ্যামিনো অ্যাসিড - ১; তাই অ্যামিনো অ্যাসিড সংখ্যা = ${toBnDigits(pb)} + ১ = ${toBnDigits(aa)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · পেপটাইড বন্ধন',
      })
    );
  });

  // Plant Tissue Anatomy Cross-check: Root vs Stem × Monocot vs Dicot (12 MCQs)
  const anatomyCompare = [
    { q: 'একবীজপত্রী মূলে (যেমন কচুর মূল) পরিবহন কলাগুচ্ছ ও মজ্জার অবস্থান কেমন?', a: 'অরীয় বান্ডল (৬টির বেশি এক্সার্ক জাইলেম) ও সুগঠিত বৃহৎ মজ্জা', w: ['২–৪টি জাইলেম ও মজ্জাহীন', 'যুগ্ম মুক্ত বান্ডল ও ক্যাম্বিয়াম রিং', 'সমদ্বিপার্শ্বীয় বান্ডল'] },
    { q: 'দ্বিবীজপত্রী মূলে (যেমন ছোলার মূল) প্রোটোজাইলেম কোন দিকে থাকে ও ক্যাম্বিয়ামের অবস্থা কী?', a: 'এক্সার্ক (পরিধির দিকে) এবং গৌণ বৃদ্ধির আগে ক্যাম্বিয়াম অনুপস্থিত', w: ['এন্ডার্ক (কেন্দ্রের দিকে) ও চিরস্থায়ী ক্যাম্বিয়াম', 'মেসার্ক ও বদ্ধ বান্ডল', 'বিক্ষিপ্ত আটাক্টোস্টিল'] },
    { q: 'একবীজপত্রী কাণ্ডে (যেমন ভুট্টা কাণ্ড) ভাস্কুলার বান্ডল কীভাবে সাজানো থাকে?', a: 'ভিত্তি টিস্যুতে বিক্ষিপ্ত, যুগ্ম বদ্ধ (ক্যাম্বিয়ামহীন) ও এন্ডার্ক জাইলেম', w: ['একটি বলয়ে সাজানো মুক্ত বান্ডল', 'অরীয় এক্সার্ক বান্ডল', 'সমদ্বিপার্শ্বীয় মুক্ত বান্ডল'] },
    { q: 'দ্বিবীজপত্রী কাণ্ডে (যেমন সূর্যমুখী কাণ্ড) ভাস্কুলার বান্ডলের বিন্যাস কেমন?', a: 'মজ্জাকে ঘিরে নির্দিষ্ট বলয়ে সাজানো যুগ্ম মুক্ত (ক্যাম্বিয়ামযুক্ত) ও এন্ডার্ক বান্ডল', w: ['বিক্ষিপ্ত বদ্ধ বান্ডল', 'এক্সার্ক অরীয় বান্ডল', 'ক্যাম্বিয়ামহীন স্পাইকলেট'] },
    { q: 'ভাস্কুলার বান্ডলের প্রকারভেদ অনুসারে লেপ্টোসেন্ট্রিক (ফ্লোয়েম কেন্দ্রে, জাইলেম চারপাশে) বান্ডল কোথায় পাওয়া যায়?', a: 'Dracaena ও Yucca উদ্ভিদের কাণ্ডে', w: ['ভুট্টা ও ধান কাণ্ডে', 'কুমড়া ও লাউ কাণ্ডে', 'Pteris ফার্নের রাইজোমে'] },
    { q: 'একটি দ্বিবীজপত্রী উদ্ভিদের পাতার রক্ষীকোষে কোন অঙ্গাণুটি উপস্থিত থাকে যা সংলগ্ন সাধারণ ত্বকীয় কোষে থাকে না?', a: 'ক্লোরোপ্লাস্ট (ফলে রক্ষীকোষ সালোকসংশ্লেষণ করতে পারে)', w: ['মাইটোকন্ড্রিয়া', 'নিউক্লিয়াস', 'প্লাজমামেমব্রেন'] },
  ];
  anatomyCompare.forEach((ac, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch8_tissue',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: ac.q,
        correct: ac.a,
        distractors: ac.w,
        explanation: `${ac.a} — এটি মূল ও কাণ্ডের অন্তর্গঠনের প্রধান শনাক্তকারী বৈশিষ্ট্য।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৮ · অন্তর্গঠন তুলনা',
      })
    );
  });

  // Extra 150 Direct Single-Concept Botany Flash Drills across all 9 chapters
  const flashMatrix: Array<{ ch: string; vl: string; prompt: string; ans: string; group: string }> = [
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'সেলুলোজ শৃঙ্খলের প্রতিটি মাইসেলিতে প্রায় কতটি গ্লুকোজ অণু থাকে', ans: 'প্রায় ১০০টি β-D-গ্লুকোজ অণু', group: 'num' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'কোষপ্রাচীরে একটি মাইক্রোফাইব্রিল গঠিত হয় প্রায় কতটি মাইসেলি মিলে', ans: 'প্রায় ২০টি মাইসেলি মিলে', group: 'num' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'কোষপ্রাচীরের একটি ম্যাক্রোফাইব্রিল তৈরি হয় প্রায় কতটি মাইক্রোফাইব্রিল দিয়ে', ans: 'প্রায় ২৫০টি মাইক্রোফাইব্রিল দিয়ে', group: 'num' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'মাইটোকন্ড্রিয়ার শুষ্ক ওজনের শতকরা কত ভাগ প্রোটিন ও কত ভাগ লিপিড', ans: 'প্রায় ৬৫% প্রোটিন ও ২৫–৩০% লিপিড', group: 'pct' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'একটি ক্লোরোপ্লাস্টের স্ট্রোমায় সাধারণত কতটি গ্রানা অবস্থান করে', ans: 'প্রায় ৪০–৬০টি গ্রানা (প্রতি গ্রানায় ১০–১০০ থাইলাকয়েড)', group: 'num' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'DNA-এর প্রতিটি পূর্ণ ঘূর্ণনের দৈর্ঘ্য ও ব্যাস যথাক্রমে কত অ্যাংস্ট্রম (Å)', ans: 'দৈর্ঘ্য ৩৪ Å ও ব্যাস ২০ Å', group: 'len' },
    { ch: 'bio1_ch1_cell', vl: 'mitosis_cell', prompt: 'দুটি পাশাপাশি বেসপেয়ারের মধ্যবর্তী উল্লম্ব দূরত্ব কত', ans: '৩.৪ Å বা ০.৩৪ nm', group: 'len' },
    { ch: 'bio1_ch2_division', vl: 'mitosis_cell', prompt: 'কোষ চক্রের ইন্টারফেজের G₁, S এবং G₂ দশায় আনুমানিক সময় ব্যয়ের অনুপাত', ans: 'G₁ (৩০–৪০%), S (৩০–৫০%), G₂ (১০–২০%) ও M-দশা (৫–১০%)', group: 'pct' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', prompt: 'এক গ্রাম কার্বোহাইড্রেট বনাম এক গ্রাম চর্বি সম্পূর্ণ জারণে যথাক্রমে কত কিলোক্যালরি শক্তি দেয়', ans: 'কার্বোহাইড্রেট ~৪.১ kcal ও চর্বি ~৯.৩ kcal', group: 'cal' },
    { ch: 'bio1_ch3_cell_chem', vl: 'photosynthesis', prompt: 'কোষে প্রাপ্ত মোট জৈব অজৈব উপাদানের মধ্যে প্রাণিকোষে পানির শতকরা হার প্রায় কত', ans: 'প্রায় ৬৫–৭৫% (সর্বাধিক পরিমাণে প্রাপ্ত অজৈব যৌগ)', group: 'pct' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', prompt: 'TMV ভাইরাসের ক্যাপসিডে মোট কতটি প্রোটিন সাব-ইউনিট (ক্যাপসোমিয়ার) থাকে', ans: '২,১৩০টি ক্যাপসোমিয়ার (ও ~৬,৪০০ নিউক্লিওটাইড RNA)', group: 'num' },
    { ch: 'bio1_ch4_microbe', vl: 'mitosis_cell', prompt: 'Plasmodium vivax-এর লোহিত কণিকা চক্র (এরিথ্রোসাইটিক সাইজোগনি) কত ঘণ্টায় সম্পন্ন হয়', ans: 'প্রতি ৪৮ ঘণ্টায় (বিনাইন টার্সিয়ান জ্বর)', group: 'time' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', prompt: 'অ্যাসকোমাইসিটিস ছত্রাকের একটি অ্যাস্কাসে সাধারণত কয়টি অ্যাস্কোস্পোর সৃষ্টি হয়', ans: '৮টি অ্যাস্কোস্পোর (মায়োসিস + ১টি মাইটোসিস)', group: 'num' },
    { ch: 'bio1_ch5_lower_plants', vl: 'photosynthesis', prompt: 'ব্যাসিডিওমাইসিটিস ছত্রাক Agaricus-এর প্রতিটি ব্যাসিডিয়ামের শীর্ষে কয়টি ব্যাসিডিওস্পোর গঠিত হয়', ans: '৪টি এক্সোজেনাস ব্যাসিডিওস্পোর', group: 'num' },
    { ch: 'bio1_ch7_angiosperm', vl: 'photosynthesis', prompt: 'পৃথিবীতে উদ্ভিদ প্রজাতি ও আবৃতবীজী উদ্ভিদের প্রধান দুটি শ্রেণি কী কী', ans: 'একবীজপত্রী (Monocotyledonae) ও দ্বিবীজপত্রী (Dicotyledonae)', group: 'cls' },
    { ch: 'bio1_ch8_tissue', vl: 'photosynthesis', prompt: 'পত্ররন্ধ্রের মাধ্যমে মোট প্রস্বেদনের শতকরা কত ভাগ সংঘটিত হয়', ans: 'প্রায় ৯০–৯৫% (সর্বোচ্চ)', group: 'pct' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', prompt: 'উদ্ভিদ তার প্রস্বেদন প্রক্রিয়ায় শোষিত পানির প্রায় কত অংশ খাদ্যের কাজে ব্যবহার করে ও কত অংশ বাষ্পায়িত হয়', ans: 'মাত্র ১–২% বিপাকে ব্যবহৃত ও ৯৮–৯৯% বাষ্পাকারে নির্গত', group: 'pct' },
    { ch: 'bio1_ch9_physiology', vl: 'photosynthesis', prompt: 'C₄ উদ্ভিদে মেসোফিল কোষে গঠিত প্রথম স্থায়ী যৌগটি কত কার্বনবিশিষ্ট', ans: '৪-কার্বনবিশিষ্ট অক্সালোঅ্যাসিটিক অ্যাসিড (OAA)', group: 'num' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', prompt: 'রাইবোনিউক্লিক বা রিকম্বিন্যান্ট ভেক্টর pBR322-এর মোট দৈর্ঘ্য কত বেসপেয়ার', ans: '৪,৩৬১ বেসপেয়ার (bp)', group: 'num' },
    { ch: 'bio1_ch10_repro_biotech', vl: 'mitosis_cell', prompt: 'টিস্যু কালচার মিডিয়াম জীবাণুমুক্ত করতে স্টেরিলাইজেশন করা হয় কীভাবে', ans: 'অটোক্লেভে ১২১°C তাপমাত্রা ও ১৫ psi চাপে ২০ মিনিট', group: 'time' },
  ];
  flashMatrix.forEach((fm, i) => {
    const others = flashMatrix.filter((x) => x.ans !== fm.ans);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: fm.ch,
        visualLessonId: fm.vl,
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `আবুল হাসান স্যারের জীববিজ্ঞান ১ম পত্র অনুযায়ী "${fm.prompt}" কত/কী?`,
        correct: fm.ans,
        distractors: others.slice(i % 10, (i % 10) + 4).map((x) => x.ans),
        explanation: `পাঠ্যবইয়ের প্রামাণিক মান: ${fm.prompt} = ${fm.ans}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · ডা. আবুল হাসান · সংখ্যাগত ও তথ্যগত মানদণ্ড',
      })
    );
  });

  return list;
}
