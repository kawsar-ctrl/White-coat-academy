import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface NeuroLocRow {
  ch: string;
  vl: string;
  term: string;
  fact: string;
  clinical: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredG(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_sg_${String(seq++).padStart(4, '0')}`;

  // 1. Skeletal, Muscular, Neuro-Sensory & Endocrine Diagnostic Matrix (34 × 3 = 102 MCQs)
  const nlRows: NeuroLocRow[] = [
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'হ্যাভারসিয়ান তন্ত্র (Osteon) ও ভকম্যান নালি', fact: 'নিরেট অস্থির (Compact bone) গাঠনিক একক যেখানে কেন্দ্রীয় হ্যাভারসিয়ান নালিকে ঘিরে কনসেন্ট্রিক ল্যামেলি থাকে এবং আড়াআড়ি ভকম্যান নালি সংযোগ ঘটায়', clinical: 'অস্টিওসাইট কোষগুলো ল্যাকুনার ভেতর অবস্থান করে ও ক্যানালিকুলি দিয়ে পুষ্টি আদান-প্রদান করে', diff: 'medical' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'অস্টিওব্লাস্ট, অস্টিওসাইট ও অস্টিওক্লাস্ট', fact: 'যথাক্রমে অস্থি গঠনকারী কোষ, পরিপক্ব নিষ্ক্রিয় অস্থিকোষ এবং বহুনিন্ডক্লীয় অস্থি-ক্ষয়কারী (Resorption) কোষ', clinical: 'প্যারাথর্মোন হরমোন অস্টিওক্লাস্ট সক্রিয় করে রক্তে ক্যালসিয়াম (Ca²⁺) বাড়ায়', diff: 'medical' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'স্বচ্ছ (Hyaline), স্থিতিস্থাপক (Elastic) ও শ্বেততন্তুময় তরুণাস্থি', fact: 'যথাক্রমে শ্বাসনালি-অস্থিসন্ধিতে হায়ালিন, বহিঃকর্ণ ও এপিগ্লটিসে স্থিতিস্থাপক এবং আন্তঃকশেরুকা চাকতিতে শক্ত শ্বেততন্তুময় তরুণাস্থি', clinical: 'তরুণাস্থির কোষ কনড্রোসাইট ও বহিঃআবরণী পেরিকনড্রিয়াম নামে পরিচিত (রক্তনালিবিহীন)', diff: 'board' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'অ্যাটলাস (C₁) ও অ্যাক্সিস (C₂) কশেরুকা', fact: 'সর্বপ্রথম গ্রীবাদেশীয় কশেরুকা অ্যাটলাস মাথা ধারণ করে ("হ্যাঁ" চলন) ও দ্বিতীয় কশেরুকা অ্যাক্সিসের ওডোনটয়েড প্রসেস "না" চলনে ঘূর্ণন অক্ষ দেয়', clinical: 'মানুষসহ প্রায় সব স্তন্যপায়ীর গ্রীবায় ৭টি সার্ভাইকাল কশেরুকা থাকে', diff: 'medical' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'প্রকৃত (১–৭), অপ্রকৃত (৮–১০) ও ভাসমান (১১–১২) পর্শুকা', fact: 'প্রথম ৭ জোড়া সরাসরি স্টার্নামে, ৮ম–১০ম জোড়া ৭ম তরুণাস্থির মাধ্যমে পরোক্ষভাবে স্টার্নামে এবং ১১শ–১২শ জোড়া সামনে মুক্ত থাকে', clinical: 'পিছনের দিকে ১২ জোড়া পর্শুকাই থোরাসিক কশেরুকার সাথে যুক্ত', diff: 'board' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'পেশি সংকোচনে সার্কোমিয়ারের A, I এবং H অঞ্চলের পরিবর্তন', fact: 'স্লাইডিং ফিলামেন্ট তত্ত্বানুযায়ী সংকোচনের সময় I-ব্যান্ড ও H-জোন ছোট হয় (বা অদৃশ্য হয়) এবং Z-রেখা কাছাকাছি আসে, কিন্তু A-ব্যান্ড অপরিবর্তিত থাকে', clinical: 'অ্যাক্টিন ও মায়োসিন ফিলামেন্টের প্রকৃত দৈর্ঘ্য মোটেও বদলায় না, কেবল পিছলে ঢুকে পড়ে', diff: 'medical' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'ট্রপোনিন-C, ট্রপোমায়োসিন ও Ca²⁺ আয়ন সংযোগ', fact: 'সার্কোপ্লাজমিক রেটিকুলাম থেকে মুক্ত Ca²⁺ ট্রপোনিন-C-তে বাঁধলে ট্রপোমায়োসিন সরে গিয়ে অ্যাক্টিনের মায়োসিন-বাইন্ডিং সাইট উন্মুক্ত করে', clinical: 'মৃত্যুর পর ATP শেষ হয়ে যাওয়ায় ক্রস-ব্রিজ ভাঙতে না পেরে রাইগর মর্টিস (Rigor mortis) হয়', diff: 'medical' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'লাল পেশি (Slow-twitch) বনাম সাদা পেশি (Fast-twitch)', fact: 'লাল পেশিতে প্রচুর মায়োগ্লোবিন ও মাইটোকন্ড্রিয়া থাকায় ক্লান্তিহীন সবাত শ্বসনে (ম্যারাথন); সাদা পেশিতে গ্লাইকোজেন বেশি থাকায় দ্রুত অক্সিজেনবিহীন সংকোচনে (স্প্রিন্ট)', clinical: 'তীব্র অবাত পরিশ্রমে পেশিতে ল্যাকটিক অ্যাসিড জমে পেশি ক্লান্তি (Fatigue) আসে', diff: 'dental' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'প্রথম, দ্বিতীয় ও তৃতীয় শ্রেণির দেহ লিভার', fact: '১ম শ্রেণি (মাথা ওঠানো — ফালক্রাম মাঝে); ২য় শ্রেণি (গোড়ালি তোলা — ভার মাঝে); ৩য় শ্রেণি (বাইসেপ্সে হাত ভাঁজ — প্রচেষ্টা বা পেশি বল মাঝে)', clinical: 'মানবদেহে সর্বাধিকসংখ্যক লিভার হলো ৩য় শ্রেণির লিভার', diff: 'dental' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'স্যুইটজার, গমফোসিস ও সাইনোভিয়াল অস্থিসন্ধি', fact: 'করোটিকার অচল সুচার তন্তুময় সন্ধি; চোয়ালে দাঁতের গোড়া গমফোসিস; এবং কনুই-হাঁটু-কাঁধ তরলপূর্ণ সচল সাইনোভিয়াল সন্ধি', clinical: 'বুড়ো আঙুলের গোড়ায় (কার্পোমেটাকার্পাল) স্যাডল সন্ধি ও ঘাড়ে অ্যাটলাস-অ্যাক্সিসে পিভট সন্ধি থাকে', diff: 'medical' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'গ্রিনস্টিক বনাম কমিউনিটেড বনাম যৌগিক অস্থিভঙ্গ', fact: 'শিশুদের নরম হাড় একপাশে বেঁকে ফাটা (গ্রিনস্টিক); হাড় বহু টুকরো হওয়া (কমিউনিটেড); এবং ভাঙা হাড় চামড়া ভেদ করে বেরোনো (যৌগিক/Open)', clinical: 'লিগামেন্ট ছিঁড়ে যাওয়া বা টান লাগাকে মচকানো (Sprain) বলে', diff: 'board' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ডুরা ম্যাটার, অ্যারাকনয়েড ও পায়া ম্যাটার (মেনিনজেস)', fact: 'মস্তিষ্ক ও সুষুম্নাকাণ্ড আবৃতকারী বাইরের শক্ত ডুরা, মাঝের জালিকাকার অ্যারাকনয়েড ও ভেতরের রক্তনালিসমৃদ্ধ পায়া ম্যাটার', clinical: 'অ্যারাকনয়েড ও পায়া ম্যাটারের মধ্যবর্তী সাব-অ্যারাকনয়েড স্পেসে সেরিব্রোস্পাইনাল ফ্লুইড (CSF) থাকে', diff: 'board' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'সেরিব্রাল অ্যাকুইডাক্ট (Aqueduct of Sylvius) ও কোরয়েড প্লেক্সাস', fact: 'মধ্যমস্তিষ্কের ভেতর দিয়ে ৩য় ও ৪র্থ নিলয় (Ventricle) সংযোগকারী সরু নালি এবং ভেন্ট্রিকলে CSF উৎপাদনকারী রক্তজালিকা', clinical: 'প্রাপ্তবয়স্কের শরীরে প্রায় ১৫০ mL CSF মস্তিষ্ককে ভাসিয়ে রেখে ওজন ~৫০ গ্রামে নামিয়ে আনে', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'নিজল দানা (Nissl Granules) ও সল্টেটরি পরিবহন', fact: 'নিউরনের সোমায় থাকা অমসৃণ ER ও রাইবোজোমগুচ্ছ (প্রোটিন সংশ্লেষ) এবং মায়েলিনেটেড অ্যাক্সনে এক র‍্যানভিয়ার পর্ব থেকে পরের পর্বে লাফিয়ে উদ্দীপনা প্রবাহ', clinical: 'সল্টেটরি পরিবহনে মায়েলিনবিহীন অ্যাক্সনের চেয়ে ৫০ গুণ দ্রুত (~১২০ m/s) সংকেত চলে', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ব্রোকা (Broca’s) অঞ্চল ও ভার্নিকে (Wernicke’s) অঞ্চল', fact: 'বাম ফ্রন্টাল লোবে অবস্থিত কথা বলার মোটর অঞ্চল (ব্রোকা) বনাম টেম্পোরাল লোবে অবস্থিত ভাষা বোঝার সংবেদী অঞ্চল (ভার্নিকে)', clinical: 'ব্রোকা এলাকা ক্ষতিগ্রস্ত হলে রোগী কথা বুঝতে পারে কিন্তু স্পষ্ট বলতে পারে না (মোটর অ্যাফেজিয়া)', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'হাইপোথ্যালামাস ও লিম্বিক সিস্টেম', fact: 'দেহের তাপমাত্রা, ক্ষুধা-তৃষ্ণা, ঘুম, আবেগ ও পিটুইটারি গ্রন্থির প্রধান নিয়ন্ত্রক (থার্মোস্ট্যাট) এবং স্মৃতিতে হিপ্পোক্যাম্পাস-ভয়ে অ্যামিগডালা', clinical: 'হাইপোথ্যালামাস-পিটুইটারি অক্ষ স্নায়ু ও অন্তঃক্ষরা তন্ত্রের প্রধান সেতুবন্ধন', diff: 'board' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'সিমপ্যাথেটিক (থোরাকোলাম্বার) বনাম প্যারাসিমপ্যাথেটিক (ক্র্যানিওস্যাক্রাল)', fact: 'সিমপ্যাথেটিক জরুরি অবস্থায় হৃদস্পন্দন ও পিউপিল বাড়িয়ে নরএপিনেফ্রিন ছাড়ে; প্যারাসিমপ্যাথেটিক (বিশেষত ভেগাস) বিশ্রামে অ্যাসিটাইলকোলিন দিয়ে পরিপাক বাড়ায় ও হৃদস্পন্দন কমায়', clinical: 'দুটি শাখার স্নায়ু-সন্ধিতে প্রি-গ্যাংলিওনিক নিউরোট্রান্সমিটার সর্বদা অ্যাসিটাইলকোলিন', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'রড কোষ (রোডপসিন) ও কোণ কোষ (আয়োডপসিন)', fact: 'রেটিনার মৃদু আলো ও সাদাকালো দৃষ্টির প্রায় ১২ কোটি রড কোষ (ভিটামিন-A/রেটিন্যাল ও স্কটপসিন) এবং উজ্জ্বল রঙিন দৃষ্টির ৬০–৭০ লাখ লাল-সবুজ-নীল কোণ কোষ', clinical: 'ভিটামিন-A ঘাটতিতে রোডপসিন না তৈরি হয়ে রাতকানা (Nyctalopia) রোগ হয়', diff: 'board' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'অ্যাকুয়াস হিউমার, গ্লুকোমা ও ফোভিয়া সেন্ট্রালিস', fact: 'সিলিয়ারি বডি ক্ষরিত অ্যাকুয়াস হিউমার নিষ্কাশন বাধাগ্রস্ত হয়ে চোখের চাপ বেড়ে অপটিক স্নায়ু নষ্ট হওয়া (গ্লুকোমা); আর কেবল কোণ কোষসমৃদ্ধ তীক্ষ্ণ দৃষ্টির বিন্দু (ফোভিয়া)', clinical: 'দূরদৃষ্টি (Hypermetropia)-তে উত্তল লেন্স ও ক্ষীণদৃষ্টি (Myopia)-তে অবতল লেন্স ব্যবহার হয়', diff: 'dental' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ককলিয়ার স্ক্যালা মিডিয়া, অর্গান অব কর্টি ও রেইজনার্স পর্দা', fact: 'এন্ডোলিম্ফপূর্ণ স্ক্যালা মিডিয়ায় বেসিলার পর্দার ওপর অবস্থিত রোমকোষযুক্ত শ্রবণের মূল গ্রাহক অঙ্গ (অর্গান অব কর্টি)', clinical: 'স্ক্যালা ভেস্টিবুলি ও স্ক্যালা টিম্পানিতে পেরিলিম্ফ এবং স্ক্যালা মিডিয়ায় এন্ডোলিম্ফ থাকে', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ভেস্টিবুলার তন্ত্র: অর্ধবৃত্তাকার নালি বনাম ইউট্রিকুলাস-স্যাকুলাস', fact: 'তিনটি অর্ধবৃত্তাকার নালির অ্যাম্পুলাস্থ ক্রিস্টা ঘূর্ণন ভারসাম্য (Dynamic) এবং ইউট্রিকুলাস-স্যাকুলাসের ম্যাকুলা ওটোলিথ সরলরৈখিক ত্বরণ ও মাধ্যাকর্ষণ ভারসাম্য (Static) রক্ষা করে', clinical: 'মধ্যকর্ণের ম্যালিয়াস-ইনকাস-স্টেপিস শব্দতরঙ্গকে প্রায় ২০–২২ গুণ বিবর্ধিত করে ওভাল উইন্ডোতে পাঠায়', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'অ্যাড্রেনাল কর্টেক্সের ৩ স্তর (GFR) ও মেডুলা', fact: 'বাইরে থেকে ভেতরে জোনা গ্লোমেরুলোসা (মিনারেলোকর্টিকয়েড/অ্যালডোস্টেরন), ফ্যাসিকুলাটা (গ্লুকোকর্টিকয়েড/কর্টিসল) ও রেটিকুলারিস (সেক্স-কর্টিকয়েড)', clinical: 'ভেতরের অ্যাড্রেনাল মেডুলায় ক্রোমাফিন কোষ অ্যাড্রেনালিন ও নর-অ্যাড্রেনালিন ক্ষরণ করে', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ক্যালসিটোনিন (থাইরয়েড প্যারাফলিকুলার C-কোষ) বনাম প্যারাথর্মোন (PTH)', fact: 'ক্যালসিটোনিন রক্তে Ca²⁺ কমিয়ে অস্থিতে জমায়; প্যারাথর্মোন রক্তে Ca²⁺ বাড়ায় ও ফসফেট কমায়', clinical: 'থাইরয়েড অপারেশনে ভুলবশত প্যারাথাইরয়েড বাদ পড়লে হাইপোক্যালসেমিক টিট্যানি (খিঁচুনি) হয়', diff: 'dental' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'স্টেরয়েড/থাইরয়েড বনাম পেপটাইড হরমোনের ক্রিয়াকৌশল', fact: 'লিপিড-দ্রবণীয় স্টেরয়েড ও থাইরক্সিন সরাসরি কোষঝিল্লি ভেদ করে নিউক্লিয়াসে জিন ট্রান্সক্রিপশন নিয়ন্ত্রণ করে; পেপটাইড হরমোন দ্বিতীয় বার্তাবাহক (cAMP / IP₃) ব্যবহার করে', clinical: 'পিটুইটারির সব হরমোন ও ইনসুলিন পেপটাইড/প্রোটিনধর্মী', diff: 'medical' },
  ];

  nlRows.forEach((row, i) => {
    const others = nlRows.filter((x) => x.term !== row.term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: row.ch,
        visualLessonId: row.vl,
        hscLevel: '12',
        difficulty: row.diff || 'medical',
        question: `মানবদেহের চলন বা সমন্বয় অধ্যায়ে "${row.fact}" — এটি কোন গঠন বা প্রক্রিয়ার নির্ভুল পরিচয়?`,
        correct: row.term,
        distractors: others.slice(i % 16, (i % 16) + 4).map((x) => x.term),
        explanation: `${row.term}: ${row.fact}। ক্লিনিক্যাল তথ্য: ${row.clinical}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–৮',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: row.ch,
        visualLessonId: row.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'dental' : 'board',
        question: `শারীরবৃত্তীয় ও চিকিৎসা তথ্য: "${row.clinical}" — এটি সরাসরি নিচের কোনটির সাথে সম্পর্কিত?`,
        correct: row.term,
        distractors: others.slice((i + 5) % 16, ((i + 5) % 16) + 4).map((x) => x.term),
        explanation: `${row.clinical} — এটি ${row.term} (${row.fact}) সম্পর্কিত।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · ক্লিনিক্যাল অ্যানাটমি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: row.ch,
        visualLessonId: row.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${row.term}" সম্পর্কে নিচের কোন ব্যাখ্যাটি সর্বাপেক্ষা সঠিক?`,
        correct: row.fact,
        distractors: others.slice((i + 10) % 16, ((i + 10) % 16) + 4).map((x) => x.fact),
        explanation: `${row.term}: ${row.fact} (${row.clinical})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–৮ গভীরতা',
      })
    );
  });

  // 2. 12 Cranial Nerves Clinical Deficit & Foramen Matrix (12 × 3 = 36 MCQs)
  const cranialClinical = [
    { num: '১ম (Olfactory — সংবেদী)', deficit: 'অ্যানোসমিয়া (Anosmia — ঘ্রাণশক্তি সম্পূর্ণ লোপ পাওয়া)', origin: 'নাসিকার অলফ্যাক্টরি মিউকোসা থেকে এথময়েডের ক্রিব্রিফর্ম প্লেট হয়ে মস্তিষ্ক' },
    { num: '২য় (Optic — সংবেদী)', deficit: 'দৃষ্টিশক্তি হ্রাস বা নির্দিষ্ট দিকের অন্ধত্ব (Hemianopia)', origin: 'চোখের রেটিনার গ্যাংলিয়ন কোষ থেকে অপটিক কায়াজমা হয়ে থ্যালামাস' },
    { num: '৩য় (Oculomotor — চেষ্টীয়)', deficit: 'চোখের পাতা পড়ে যাওয়া (Ptosis), প্রসারিত পিউপিল ও চারটি অক্ষিপেশির পক্ষাঘাত', origin: 'মধ্যমস্তিষ্কের ভেন্ট্রাল অংশ থেকে অক্ষিগোলক ও সিলিয়ারি পেশি' },
    { num: '৪র্থ (Trochlear — ক্ষুদ্রতম চেষ্টীয়)', deficit: 'সুপিরিয়র অব্লিক পেশি অচল হওয়ায় নিচের দিকে ও ভেতরে তাকাতে দ্বিত্ব দর্শন (Diplopia)', origin: 'মধ্যমস্তিষ্কের পৃষ্ঠীয় দিক থেকে বের হওয়া একমাত্র করোটিক স্নায়ু' },
    { num: '৫ম (Trigeminal — বৃহত্তম মিশ্র)', deficit: 'মুখমণ্ডলের ত্বক-দাঁতের অনুভূতি লোপ, তীব্র ট্রাইজেমিনাল নিউরালজিয়া ও চিবানোয় দুর্বলতা', origin: 'পন্স থেকে উৎপন্ন হয়ে অপথ্যালমিক, ম্যাক্সিলারি ও ম্যান্ডিবুলার শাখায় বিভক্ত' },
    { num: '৬ষ্ঠ (Abducens — চেষ্টীয়)', deficit: 'ল্যাটারাল রেক্টাস পেশি অচল হওয়ায় চোখ বাইরের দিকে ঘুরাতে না পারা (অন্তর্মুখী ট্যারাভাব)', origin: 'পন্স ও মেডুলার সংযোগস্থল থেকে চোখের ল্যাটারাল রেক্টাস পেশি' },
    { num: '৭ম (Facial — মিশ্র)', deficit: 'মুখের একপাশ অবশ হওয়া (Bell’s palsy), কপাল ভাঁজ না হওয়া ও জিহ্বার অগ্র দুই-তৃতীয়াংশে স্বাদহীনতা', origin: 'পন্স থেকে মুখাবয়বের অভিব্যক্তি পেশি ও সাবম্যান্ডিবুলার-সাবলিঙ্গুয়াল লালাগ্রন্থি' },
    { num: '৮ম (Vestibulocochlear — সংবেদী)', deficit: 'সংবেদী বধিরতা (Deafness) এবং ভার্টিগো বা দেহের ভারসাম্যহীনতা', origin: 'অন্তঃকর্ণের ককলিয়া (শ্রবণ) ও ভেস্টিবিউল-অর্ধবৃত্তাকার নালি (ভারসাম্য)' },
    { num: '৯ম (Glossopharyngeal — মিশ্র)', deficit: 'জিহ্বার পশ্চাৎ এক-তৃতীয়াংশে স্বাদ লোপ, গ্যাঁগ রিফ্লেক্স হ্রাস ও প্যারোটিড লালা কমে যাওয়া', origin: 'মেডুলা থেকে গলবিল, জিহ্বার পেছনের অংশ ও ক্যারোটিড বডি' },
    { num: '১০ম (Vagus — দীর্ঘতম মিশ্র)', deficit: 'গলা বসে যাওয়া (Hoarseness), খাবার গিলতে কষ্ট ও হৃদ-শ্বসন-পরিপাক নিয়ন্ত্রণে গোলযোগ', origin: 'মেডুলা থেকে উদর গহ্বর পর্যন্ত বিস্তৃত প্যারাসিমপ্যাথেটিক প্রধান স্নায়ু' },
    { num: '১১শ (Accessory — চেষ্টীয়)', deficit: 'স্টার্নোক্লেইডোমাস্টয়েড ও ট্রাপিজিয়াস পেশি অচল হয়ে কাঁধ উঁচু করতে বা ঘাড় ঘোরাতে না পারা', origin: 'মেডুলা ও সুষুম্নাকাণ্ডের উপরের অংশ থেকে ঘাড়-কাঁধের পেশি' },
    { num: '১২শ (Hypoglossal — চেষ্টীয়)', deficit: 'জিহ্বা বের করলে আক্রান্ত দুর্বল পাশের দিকে বেঁকে যাওয়া ও কথা জড়িয়ে যাওয়া', origin: 'মেডুলা অবলংগাটা থেকে জিহ্বার অন্তর্নিহিত ও বহির্নিহিত চলন পেশি' },
  ];
  cranialClinical.forEach((cc, i) => {
    const others = cranialClinical.filter((x) => x.num !== cc.num);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `স্নায়ুবিজ্ঞানে কোন করোটিক স্নায়ুর (Cranial Nerve) ক্ষতির ফলে "${cc.deficit}" দেখা দেয়?`,
        correct: cc.num,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.num),
        explanation: `${cc.num} ক্ষতিগ্রস্ত হলে ${cc.deficit} ঘটে (উৎপত্তি ও বিস্তৃতি: ${cc.origin})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · করোটিক স্নায়ুর ক্লিনিক্যাল পরীক্ষা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'board',
        question: `উৎপত্তি ও বিস্তৃতি "${cc.origin}" — এটি নিচের কোন করোটিক স্নায়ুকে নির্দেশ করে?`,
        correct: cc.num,
        distractors: others.slice((i + 3) % 7, ((i + 3) % 7) + 4).map((x) => x.num),
        explanation: `${cc.num}: ${cc.origin}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · করোটিক স্নায়ুর পথ',
      })
    );
  });

  // 3. Complete Endocrine Disorders (Hypo vs Hyper) Matrix (14 × 3 = 42 MCQs)
  const endoDisorders = [
    { hormone: 'গ্রোথ হরমোন (GH / সোমাটোট্রপিন)', hypo: 'শৈশবে পিটুইটারি বামনত্ব (Dwarfism)', hyper: 'শৈশবে জাইগ্যান্টিজম ও প্রাপ্তবয়স্কে অ্যাক্রোমেগালি (হাত-পা-চোয়াল বড়)' },
    { hormone: 'থাইরক্সিন (T₃ / T₄)', hypo: 'শিশুতে ক্রেটিনিজম (বুদ্ধি প্রতিবন্ধিতা) ও বয়স্কতে মিক্সিডিমা / সাধারণ গলগণ্ড', hyper: 'গ্রেভস ডিজিজ / এক্সঅফথালমিক গলগণ্ড (বিস্ফারিত চোখ, দ্রুত নাড়ি)' },
    { hormone: 'প্যারাথর্মোন (PTH)', hypo: 'হাইপোক্যালসেমিয়া ও টিট্যানি (পেশির তীব্র খিঁচুনি)', hyper: 'অস্টিওপোরোসিস / অস্টিওম্যালাসিয়া ও রক্তে অতি-ক্যালসিয়াম (কিডনি পাথর)' },
    { hormone: 'ইনসুলিন (অগ্ন্যাশয় β-কোষ)', hypo: 'ডায়াবেটিস মেলিটাস (হাইপারগ্লাইসেমিয়া, গ্লাইকোসুরিয়া, কিটোঅ্যাসিডোসিস)', hyper: 'তীব্র হাইপোগ্লাইসেমিয়া (রক্তে শর্করা কমে মস্তিষ্কের কোমা/শক)' },
    { hormone: 'কর্টিসল (গ্লুকোকর্টিকয়েড)', hypo: 'অ্যাডিসনস ডিজিজ (রক্তচাপ কম, ব্রোঞ্জ ত্বক, দুর্বলতা)', hyper: 'কুশিংস সিন্ড্রোম (চাঁদপানা মুখমণ্ডল, বাফেলো হাম্প, স্থূলতা)' },
    { hormone: 'অ্যান্টি-ডাইইউরেটিক হরমোন (ADH)', hypo: 'ডায়াবেটিস ইনসিপিডাস (অত্যধিক পাতলা মূত্র ও তৃষ্ণা, মূত্রে শর্করা নেই)', hyper: 'SIADH (শরীরে অতিরিক্ত পানি জমা ও রক্তে Na⁺ কমে হাইপোন্যাট্রেমিয়া)' },
    { hormone: 'অ্যালডোস্টেরন (মিনারেলোকর্টিকয়েড)', hypo: 'রক্তে Na⁺ ও পানি হ্রাস, K⁺ বৃদ্ধি (হাইপারক্যালেমিয়া) ও নিম্ন রক্তচাপ', hyper: 'কন্স সিন্ড্রোম (উচ্চ রক্তচাপ ও পেশি দুর্বলতাসহ হাইপোক্যালেমিয়া)' },
    { hormone: 'প্রোল্যাক্টিন (PRL) ও অক্সিটোসিন', hypo: 'প্রসবোত্তর স্তন্যক্ষরণ ও দুগ্ধ নিঃসরণ ব্যাহত হওয়া', hyper: 'অস্বাভাবিক দুগ্ধক্ষরণ (গ্যালাক্টোরিয়া) ও ঋতুচক্র বন্ধ হওয়া' },
    { hormone: 'মেলাটোনিন (পিনিয়াল গ্রন্থি)', hypo: 'সার্কাডিয়ান রিদম বা ঘুম-জাগরণ চক্রের বিপর্যয় (অনিদ্রা)', hyper: 'অত্যধিক তন্দ্রাচ্ছন্নতা ও মৌসুমি বিষণ্ণতা (SAD)' },
    { hormone: 'থাইমোসিন (থাইমাস গ্রন্থি)', hypo: 'T-লিম্ফোসাইট পরিপক্বতা ব্যাহত হয়ে কোষীয় অনাক্রম্যতা কমে যাওয়া', hyper: 'অটোইমিউন প্রতিক্রিয়া বা মায়াস্থেনিয়া গ্র্যাভিসের সাথে থাইমোমা' },
  ];
  endoDisorders.forEach((ed, i) => {
    const others = endoDisorders.filter((x) => x.hormone !== ed.hormone);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `এন্ডোক্রিনোলজিতে কোন হরমোনের স্বল্পক্ষরণ (Hyposecretion)-এর ফলে "${ed.hypo}" রোগ দেখা দেয়?`,
        correct: ed.hormone,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.hormone),
        explanation: `${ed.hormone}-এর ঘাটতিতে ${ed.hypo} এবং অতি-ক্ষরণে ${ed.hyper} হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · হরমোনের অভাবজনিত রোগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'board',
        question: `কোন হরমোনের অতিক্ষরণ (Hypersecretion)-এর ফলে "${ed.hyper}" অবস্থা সৃষ্টি হয়?`,
        correct: ed.hormone,
        distractors: others.slice((i + 2) % 5, ((i + 2) % 5) + 4).map((x) => x.hormone),
        explanation: `${ed.hormone} অতিরিক্ত ক্ষরিত হলে ${ed.hyper} দেখা দেয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · হরমোনের অতিক্ষরণজনিত রোগ',
      })
    );
  });

  // 4. Quantitative Skeletal Multipliers across Multiple Individuals (12 × 6 = 72 MCQs)
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].forEach((n, idx) => {
    const cranial = n * 8;
    const facial = n * 14;
    const earOssicles = n * 6;
    const carpals = n * 16;
    const tarsals = n * 14;
    const phalangesHandFoot = n * 56;
    const ribsTotal = n * 24;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(n)} জন মানুষের করোটিকায় (Cranium ও মুখমণ্ডল মিলিয়ে, কর্ণাস্থি ও হাইঅয়েড বাদে) মোট কতটি অস্থি থাকে?`,
        correct: `${toBnDigits(cranial + facial)}টি অস্থি (করোটি ${toBnDigits(cranial)} + মুখমণ্ডল ${toBnDigits(facial)})`,
        distractors: [
          `${toBnDigits(n * 29)}টি অস্থি`,
          `${toBnDigits(n * 20)}টি অস্থি`,
          `${toBnDigits(n * 26)}টি অস্থি`,
        ],
        explanation: `প্রতি মানুষের ক্রেনিয়ামে ৮টি ও মুখমণ্ডলে ১৪টি = ২২টি অস্থি (সহ ৬টি কর্ণাস্থি + ১টি হাইঅয়েড = ২৯টি)। তাই ${toBnDigits(n)} জনে (${toBnDigits(cranial)}+${toBnDigits(facial)}) = ${toBnDigits(cranial + facial)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · করোটির অস্থি গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(n)} জন মানুষের উভয় মধ্যকর্ণে ম্যালিয়াস, ইনকাস ও স্টেপিস মিলিয়ে সর্বমোট কতটি কর্ণাস্থি (Ear ossicles) রয়েছে?`,
        correct: `${toBnDigits(earOssicles)}টি কর্ণাস্থি`,
        distractors: [
          `${toBnDigits(n * 3)}টি কর্ণাস্থি`,
          `${toBnDigits(n * 8)}টি কর্ণাস্থি`,
          `${toBnDigits(n * 12)}টি কর্ণাস্থি`,
        ],
        explanation: `প্রতি কানে ৩টি × ২ কান = ৬টি কর্ণাস্থি প্রতি জনে; ${toBnDigits(n)} জনে ${toBnDigits(earOssicles)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · কর্ণাস্থির সংখ্যা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(n)} জন মানুষের দুই হাতের কব্জিতে কার্পাল ও দুই পায়ের গোড়ালিতে টার্সাল অস্থির মোট সংখ্যা যথাক্রমে কত?`,
        correct: `কার্পাল ${toBnDigits(carpals)}টি ও টার্সাল ${toBnDigits(tarsals)}টি`,
        distractors: [
          `কার্পাল ${toBnDigits(tarsals)}টি ও টার্সাল ${toBnDigits(carpals)}টি`,
          `কার্পাল ${toBnDigits(n * 8)}টি ও টার্সাল ${toBnDigits(n * 7)}টি`,
          `কার্পাল ${toBnDigits(n * 20)}টি ও টার্সাল ${toBnDigits(n * 18)}টি`,
        ],
        explanation: `প্রতি হাতে ৮টি কার্পাল (২ হাতে ১৬টি) এবং প্রতি পায়ে ৭টি টার্সাল (২ পায়ে ১৪টি); তাই ${toBnDigits(n)} জনে ${toBnDigits(carpals)} ও ${toBnDigits(tarsals)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · হাত ও পায়ের অস্থি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(n)} জন মানুষের দুই হাত ও দুই পায়ের সমস্ত আঙুল (ফ্যালানজেস) মিলিয়ে মোট অস্থির সংখ্যা কতটি?`,
        correct: `${toBnDigits(phalangesHandFoot)}টি ফ্যালানজেস`,
        distractors: [
          `${toBnDigits(n * 28)}টি ফ্যালানজেস`,
          `${toBnDigits(n * 48)}টি ফ্যালানজেস`,
          `${toBnDigits(n * 60)}টি ফ্যালানজেস`,
        ],
        explanation: `এক হাতে ১৪টি (২+৩×৪) ও এক পায়ে ১৪টি ফ্যালানজেস; অর্থাৎ প্রতি মানুষের চারটি উপাঙ্গে ১৪ × ৪ = ৫৬টি এবং ${toBnDigits(n)} জনে ${toBnDigits(phalangesHandFoot)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ফ্যালানজেস সংখ্যা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(n)} জন মানুষের বক্ষপিঞ্জরে প্রকৃত ও ভাসমান পর্শুকা বাদে মোট কতটি অপ্রকৃত (False) পর্শুকা (৮ম–১০ম জোড়া) এবং মোট পর্শুকা রয়েছে?`,
        correct: `অপ্রকৃত ${toBnDigits(n * 6)}টি (মোট পর্শুকা ${toBnDigits(ribsTotal)}টি)`,
        distractors: [
          `অপ্রকৃত ${toBnDigits(n * 3)}টি (মোট পর্শুকা ${toBnDigits(n * 12)}টি)`,
          `অপ্রকৃত ${toBnDigits(n * 14)}টি (মোট পর্শুকা ${toBnDigits(ribsTotal)}টি)`,
          `অপ্রকৃত ${toBnDigits(n * 4)}টি (মোট পর্শুকা ${toBnDigits(n * 20)}টি)`,
        ],
        explanation: `প্রতি মানুষের ১২ জোড়া (২৪টি) পর্শুকার মধ্যে ৮ম, ৯ম ও ১০ম জোড়া = ৬টি অপ্রকৃত পর্শুকা; তাই ${toBnDigits(n)} জনে ${toBnDigits(n * 6)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · বক্ষপিঞ্জর অস্থি হিসাব',
      })
    );
  });

  // 5. Action Potential Voltage & Diopter Eye Lens Calculations (36 MCQs)
  const apProfiles = [
    { rest: -70, thresh: -55, peak: 30 }, { rest: -70, thresh: -50, peak: 35 },
    { rest: -65, thresh: -50, peak: 30 }, { rest: -75, thresh: -55, peak: 40 },
    { rest: -80, thresh: -60, peak: 35 }, { rest: -90, thresh: -65, peak: 30 },
    { rest: -60, thresh: -45, peak: 25 }, { rest: -85, thresh: -60, peak: 35 },
  ];
  apProfiles.forEach((ap, i) => {
    const depolFromRest = ap.peak - ap.rest;
    const threshDiff = ap.thresh - ap.rest;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি নিউরনের বিশ্রাম বিভব ${toBnDigits(ap.rest)} mV, প্রান্তিক উদ্দীপন সীমা (Threshold) ${toBnDigits(ap.thresh)} mV এবং অ্যাকশন পটেনশিয়ালের সর্বোচ্চ চূড়া +${toBnDigits(ap.peak)} mV হলে বিশ্রাম অবস্থা থেকে মোট কত মিলিভোল্ট বিভব পরিবর্তন ঘটে?`,
        correct: `${toBnDigits(depolFromRest)} mV (ন্যূনতম +${toBnDigits(threshDiff)} mV প্রারম্ভিক পরিবর্তন প্রয়োজন)`,
        distractors: [
          `${toBnDigits(ap.peak - ap.thresh)} mV (ন্যূনতম +${toBnDigits(threshDiff)} mV প্রারম্ভিক পরিবর্তন প্রয়োজন)`,
          `${toBnDigits(Math.abs(ap.rest) - ap.peak)} mV (ন্যূনতম +${toBnDigits(threshDiff + 5)} mV পরিবর্তন প্রয়োজন)`,
          `${toBnDigits(depolFromRest + 25)} mV (ন্যূনতম +${toBnDigits(threshDiff + 10)} mV পরিবর্তন প্রয়োজন)`,
        ],
        explanation: `বিশ্রাম বিভব (${toBnDigits(ap.rest)} mV) থেকে +${toBnDigits(ap.peak)} mV-এ পৌঁছাতে মোট বিভব পরিবর্তন = ${toBnDigits(ap.peak)} − (${toBnDigits(ap.rest)}) = ${toBnDigits(depolFromRest)} mV; আর অ্যাকশন পটেনশিয়াল সূচনায় Na⁺ চ্যানেল খুলতে ${toBnDigits(threshDiff)} mV ডিপোলারাইজেশন লাগে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · স্নায়ু উদ্দীপনা ও অ্যাকশন পটেনশিয়াল',
      })
    );
  });

  // Eye Lens Power P = 1 / f (meters) for Myopia & Hypermetropia (16 MCQs)
  [
    { fCm: 25, type: 'ক্ষীণদৃষ্টি (Myopia)', sign: '-', lens: 'অবতল (Concave)' },
    { fCm: 50, type: 'ক্ষীণদৃষ্টি (Myopia)', sign: '-', lens: 'অবতল (Concave)' },
    { fCm: 100, type: 'ক্ষীণদৃষ্টি (Myopia)', sign: '-', lens: 'অবতল (Concave)' },
    { fCm: 200, type: 'ক্ষীণদৃষ্টি (Myopia)', sign: '-', lens: 'অবতল (Concave)' },
    { fCm: 40, type: 'দূরদৃষ্টি (Hypermetropia)', sign: '+', lens: 'উত্তল (Convex)' },
    { fCm: 50, type: 'দূরদৃষ্টি (Hypermetropia)', sign: '+', lens: 'উত্তল (Convex)' },
    { fCm: 100, type: 'দূরদৃষ্টি (Hypermetropia)', sign: '+', lens: 'উত্তল (Convex)' },
    { fCm: 25, type: 'দূরদৃষ্টি (Hypermetropia)', sign: '+', lens: 'উত্তল (Convex)' },
  ].forEach((eye, i) => {
    const power = Number((100 / eye.fCm).toFixed(2));
    const oppLens = eye.sign === '-' ? 'উত্তল (Convex)' : 'অবতল (Concave)';
    const oppSign = eye.sign === '-' ? '+' : '-';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `একজন শিক্ষার্থীর চোখের ত্রুটি ${eye.type} সংশোধনের জন্য ${toBnDigits(eye.fCm)} cm ফোকাস দূরত্ববিশিষ্ট কোন ধরনের ও কত ডায়প্টার ক্ষমতার চশমা ব্যবহার করতে হবে?`,
        correct: `${eye.sign}${toBnDigits(power)} D ক্ষমতার ${eye.lens} লেন্স`,
        distractors: [
          `${oppSign}${toBnDigits(power)} D ক্ষমতার ${oppLens} লেন্স`,
          `${eye.sign}${toBnDigits(Number((power * 2).toFixed(2)))} D ক্ষমতার ${eye.lens} লেন্স`,
          `${oppSign}${toBnDigits(Number((power / 2).toFixed(2)))} D ক্ষমতার ${eye.lens} লেন্স`,
        ],
        explanation: `ক্ষমতা P = ১০০/f(cm) = ১০০/${toBnDigits(eye.fCm)} = ${toBnDigits(power)} D। মায়োপিয়ায় ঋণাত্মক (−) অবতল ও হাইপারমেট্রোপিয়ায় ধনাত্মক (+) উত্তল লেন্স ব্যবহৃত হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · চোখের ত্রুটি ও লেন্স ক্ষমতা',
      })
    );
  });

  // 6. High-Yield Assertion / True-Statement Bank for Ch 7 & Ch 8 (40 MCQs)
  const ch78Quick = [
    { ch: 'bio2_ch7_locomotion', q: 'মানবদেহের দীর্ঘতম ও দৃঢ়তম অস্থি কোনটি এবং ক্ষুদ্রতম অস্থি কোনটি?', a: 'দীর্ঘতম: ফিমার (উরু); ক্ষুদ্রতম: স্টেপিস (মধ্যকর্ণ)', w: ['দীর্ঘতম: টিবিয়া; ক্ষুদ্রতম: ইনকাস', 'দীর্ঘতম: হিউমেরাস; ক্ষুদ্রতম: ম্যালিয়াস', 'দীর্ঘতম: স্টার্নাম; ক্ষুদ্রতম: ভোমার'], exp: 'ফিমার দেহের সবচেয়ে লম্বা-শক্তিশালী অস্থি এবং মধ্যকর্ণের স্টেপিস ক্ষুদ্রতম অস্থি।' },
    { ch: 'bio2_ch7_locomotion', q: 'মানুষের পুরো দেহে প্রায় ৬৫০+ কঙ্কাল পেশি দেহের ওজনের কত শতাংশ গঠন করে?', a: 'প্রায় ৪০–৪৫% (বিশেষায়িত স্ট্রায়েটেড ঐচ্ছিক পেশি)', w: ['প্রায় ৫–১০%', 'প্রায় ৭০–৮০%', 'প্রায় ২%'], exp: 'কঙ্কাল পেশি দেহের মোট ওজনের প্রায় ৪০% এবং হৃদপেশি-মসৃণ পেশি মিলে প্রায় ১০%।' },
    { ch: 'bio2_ch7_locomotion', q: 'পেশিকোষের (Myocyte) ঝিল্লি ও এন্ডোপ্লাজমিক রেটিকুলামকে যথাক্রমে কী নামে ডাকা হয়?', a: 'সার্কোলেমা ও সার্কোপ্লাজমিক রেটিকুলাম (Ca²⁺ ভাণ্ডার)', w: ['নিউরোলেমা ও নিজল দানা', 'টোনোপ্লাস্ট ও গলগি বডি', 'প্লাজমোলেমা ও লাইসোজোম'], exp: 'সার্কোপ্লাজমিক রেটিকুলামে প্রচুর ক্যালসিয়াম আয়ন সঞ্চিত থাকে।' },
    { ch: 'bio2_ch7_locomotion', q: 'মানবদেহে কোনটি অস্থিকে অস্থির সাথে যুক্ত করে এবং কোনটি পেশিকে অস্থির সাথে যুক্ত করে?', a: 'লিগামেন্ট (অস্থি-অস্থি) এবং টেন্ডন (পেশি-অস্থি)', w: ['টেন্ডন (অস্থি-অস্থি) ও লিগামেন্ট (পেশি-অস্থি)', 'ফাসা ও পেরিঅস্টিয়াম', 'অ্যাপোনিউরোসিস ও মেনিস্কাস'], exp: 'কোলাজেনসমৃদ্ধ টেন্ডন পেশির টান অস্থিতে পৌঁছে দেয় ও স্থিতিস্থাপক লিগামেন্ট সন্ধি ধরে রাখে।' },
    { ch: 'bio2_ch7_locomotion', q: 'মেটাকার্পাল অস্থির পরপর অবস্থানকারী হাঁটু বা মালাইচাকি নামে পরিচিত সিসাময়েড (Sesamoid) অস্থিটির নাম কী?', a: 'প্যাটেলা (Patella)', w: ['অ্যাক্রোমিয়ন', 'ক্ল্যাভিকল (বিউটি বোন)', 'স্ক্যাপুলা'], exp: 'প্যাটেলা কোয়াড্রিসেপস ফেমোরিস টেন্ডনের মধ্যে বিকশিত দেহের বৃহত্তম সিসাময়েড অস্থি।' },
    { ch: 'bio2_ch8_coordination', q: 'মস্তিষ্কের দুটি সেরেব্রাল হেমিস্ফিয়ারকে ভেতরের দিকে সংযোগকারী সাদা স্নায়ুতন্তুর প্রশস্ত পটির নাম কী?', a: 'কর্পাস ক্যালোসাম (Corpus callosum)', w: ['পন্স ভ্যারোলি', 'ভার্মিস (Vermis)', 'অপটিক কায়াজমা'], exp: 'বৃহৎ সেরেবেলার অংশ যুক্ত থাকে ভার্মিস দিয়ে আর সেরেব্রামের গোলার্ধ যুক্ত থাকে কর্পাস ক্যালোসাম দিয়ে।' },
    { ch: 'bio2_ch8_coordination', q: 'হাইপোথ্যালামাসের স্নায়ুকোষে সংশ্লেষিত হলেও পশ্চাৎ পিটুইটারি (Neurohypophysis) থেকে ক্ষরিত হরমোন দুটি কী কী?', a: 'ADH (ভ্যাসোপ্রেসিন) ও অক্সিটোসিন', w: ['GH ও প্রোল্যাক্টিন', 'FSH ও LH', 'TSH ও ACTH'], exp: 'পশ্চাৎ পিটুইটারি কোনো হরমোন নিজে তৈরি করে না, কেবল হাইপোথ্যালামাসে তৈরি হরমোন জমা ও ক্ষরণ করে।' },
    { ch: 'bio2_ch8_coordination', q: 'চোখের কোন অংশটির প্রতিসরণ ক্ষমতা স্থির ও সর্বাধিক (~৪০ ডায়প্টার) এবং কোন অংশের সংকোচন-প্রসারণে ফোকাসিং (Accommodation) ঘটে?', a: 'কর্নিয়া সর্বাধিক প্রতিসরণ ঘটায়; সিলিয়ারি পেশি ও লেন্স অ্যাকোমোডেশন ঘটায়', w: ['আইরিশ প্রতিসরণ ঘটায় ও স্ক্লেরা ফোকাস করে', 'কোরয়েড ফোকাস করে', 'পিউপিল প্রতিসরণ ঘটায়'], exp: 'স্বচ্ছ কর্নিয়ার রক্তনালি না থাকায় প্রতিস্থাপনে গ্রাফট রিজেকশন প্রায় হয় না।' },
    { ch: 'bio2_ch8_coordination', q: 'আইলেটস অব ল্যাঙ্গারহ্যান্স ছাড়া কোন জরুরি হরমোনটি "ফ্লাইট অর ফাইট" পরিস্থিতিতে রক্তে গ্লুকোজ, শ্বাসহার ও হৃদস্পন্দন তাৎক্ষণিক বাড়ায়?', a: 'অ্যাড্রেনালিন (এপিনেফ্রিন — অ্যাড্রেনাল মেডুলা)', w: ['মেলাটোনিন', 'অক্সিটোসিন', 'ক্যালসিটোনিন'], exp: 'সিমপ্যাথেটিক উদ্দীপনায় অ্যাড্রেনাল মেডুলা থেকে অ্যাড্রেনালিন ও নর-অ্যাড্রেনালিন ক্ষরিত হয়।' },
    { ch: 'bio2_ch8_coordination', q: 'অক্ষিপেশি সঞ্চালনের বাইরে সেরিবেলাম ও পন্স ক্ষতিগ্রস্ত হলে প্রধানত কোন লক্ষণ দেখা দেয়?', a: 'পেশি সমন্বয়হীনতা ও টলমলে হাঁটা (Ataxia)', w: ['মুখের স্বাদ লোপ', 'রক্তচাপ ১০০% শূন্য হওয়া', 'চোখের লেন্স ঘোলা হওয়া'], exp: 'সেরিবেলাম ঐচ্ছিক পেশির সূক্ষ্ম সমন্বয়, ভঙ্গি ও ভারসাম্য নিয়ন্ত্রণ করে।' },
  ];
  ch78Quick.forEach((cq, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cq.ch,
        visualLessonId: cq.ch === 'bio2_ch7_locomotion' ? 'heart_cardiac' : 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: cq.q,
        correct: cq.a,
        distractors: cq.w,
        explanation: `${cq.a}। ${cq.exp}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–৮',
      })
    );
  });

  // 7. Synovial Joint Type & Anatomical Location Matrix (6 × 3 = 18 MCQs)
  const synovialJoints = [
    { jType: 'বল ও কোটর সন্ধি (Ball & Socket)', loc: 'স্কন্ধ-সন্ধি (হিউমেরাস-স্ক্যাপুলা) ও নিতম্ব-সন্ধি (ফিমার-পেলভিক)', dof: 'সর্বদিকে অবাধ ঘূর্ণন বা ত্রি-অক্ষীয় চলন সম্ভব' },
    { jType: 'কব্জা সন্ধি (Hinge Joint)', loc: 'কনুই, হাঁটু, গোড়ালি ও আঙুলের ইন্টারফ্যালাঞ্জিয়াল সন্ধি', dof: 'দরজার কব্জার মতো কেবল এক তলে ভাঁজ (Flexion) ও প্রসারণ (Extension)' },
    { jType: 'পিভট বা কীলক সন্ধি (Pivot Joint)', loc: '১ম ও ২য় গ্রীবা কশেরুকা (অ্যাটলাস-অ্যাক্সিস) ও রেডিও-আলনার সন্ধি', dof: 'একটি কেন্দ্রীয় অক্ষের চারদিকে ঘূর্ণন ("না" বলা বা হাতের তালু ঘোরানো)' },
    { jType: 'স্যাডল বা জিন সন্ধি (Saddle Joint)', loc: 'বৃদ্ধাঙ্গুলির ট্রাপিজিয়াম ও প্রথম মেটাকার্পালের মধ্যকার সন্ধি', dof: 'ঘোড়ার জিনের মতো দুটি তলে মুক্ত চলন ও বিপরীতমুখী আঁকড়ে ধরা (Opposition)' },
    { jType: 'গ্লাইডিং বা সমতল সন্ধি (Gliding Joint)', loc: 'কব্জির কার্পালগুলোর মধ্যে ও পায়ের টার্সালগুলোর মধ্যে', dof: 'সমতল অস্থিপ্রান্তগুলো পরস্পরের ওপর পিছলে সামান্য নড়াচড়া করে' },
    { jType: 'কনডাইলয়েড বা উপবৃত্তাকার সন্ধি (Condyloid)', loc: 'কব্জির রেডিও-কার্পাল সন্ধি ও মেটাকার্পো-ফ্যালাঞ্জিয়াল সন্ধি', dof: 'ভাঁজ-প্রসারণ ও ডান-বাম দুই অক্ষে চলন কিন্তু পূর্ণ ঘূর্ণন নয়' },
  ];
  synovialJoints.forEach((sj, i) => {
    const others = synovialJoints.filter((x) => x.jType !== sj.jType);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানব কঙ্কালের "${sj.loc}"-এ কোন ধরনের সচল সাইনোভিয়াল অস্থিসন্ধি দেখা যায়?`,
        correct: sj.jType,
        distractors: others.slice(0, 4).map((x) => x.jType),
        explanation: `${sj.loc}-এ ${sj.jType} থাকে, যার বৈশিষ্ট্য: ${sj.dof}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · সাইনোভিয়াল অস্থিসন্ধি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${sj.jType}" অস্থিসন্ধির প্রকৃত অবস্থান ও চলন প্রকৃতি নিচের কোনটি?`,
        correct: `${sj.loc} (${sj.dof})`,
        distractors: others.slice(1, 5).map((x) => `${x.loc} (${x.dof})`),
        explanation: `${sj.jType} অবস্থিত ${sj.loc}-এ এবং এতে ${sj.dof}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · অস্থিসন্ধির শ্রেণিবিন্যাস',
      })
    );
  });

  return list;
}
