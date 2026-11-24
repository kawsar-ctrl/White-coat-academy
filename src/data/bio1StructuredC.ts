import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface BioChemPhysioRow {
  ch: string;
  vl: string;
  item: string;
  detail: string;
  context: string;
  note: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio1StructuredC(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_sc_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // SECTION 1: Photosynthesis Complete Pathways (Light, Calvin, C4, CAM, Photorespiration) (~140 MCQs)
  // =========================================================================
  const photoRows: BioChemPhysioRow[] = [
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'রুবেন ও ক্যামেন-এর ১৮O আইসোটোপ পরীক্ষা (১৯৪১)',
      detail: 'সালোকসংশ্লেষণে নির্গত অক্সিজেনের (O₂) প্রকৃত উৎস CO₂ নয়, বরং ফটোলাইসিসকৃত পানি (H₂O) বলে প্রমাণ করা',
      context: 'Chlorella শৈবালে তেজস্ক্রিয়হীন ভারী অক্সিজেন H₂¹⁸O ব্যবহার',
      note: 'এর আগে কর্নেলিয়াস ভ্যান নীল সালফার ব্যাকটেরিয়ায় প্রমাণ করেছিলেন যে O₂ পানি থেকে আসে।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'ক্লোরোফিল-a ও ক্লোরোফিল-b-এর রাসায়নিক পার্থক্য',
      detail: 'পোরফিরিন বলয়ের ৩ নম্বর কার্বনে ক্লোরোফিল-a তে মিথাইল গ্রুপ (-CH₃) এবং ক্লোরোফিল-b তে ফর্মাইল/অ্যালডিহাইড গ্রুপ (-CHO) থাকা',
      context: 'ক্লোরোফিল-a: C₅₅H₇₂O₅N₄Mg এবং ক্লোরোফিল-b: C₅₅H₇₀O₆N₄Mg',
      note: 'উভয়ের কেন্দ্রে Mg²⁺ পরমাণু ৪টি নাইট্রোজেনের সাথে যুক্ত এবং লেজে ২০ কার্বনবিশিষ্ট ফাইটল চেইন থাকে।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'পানির ফটোলাইসিস ও অক্সিজেন ইভল্ভিং কমপ্লেক্স (OEC)',
      detail: 'PS-II (P₆₈₀)-এর সাথে যুক্ত Mn²⁺, Ca²⁺ ও Cl⁻ আয়নসমন্বিত কমপ্লেক্স যা আলোক শক্তিতে পানি ভেঙে ৪টি H⁺, ৪টি e⁻ ও ১টি O₂ উৎপন্ন করে',
      context: 'থাইলাকয়েডের ভেতরের গহ্বরে (Lumen) প্রোটন জমা করা',
      note: 'অচক্রীয় ফটোফসফোরাইলেশনে পানির ফটোলাইসিস ঘটে, কিন্তু চক্রীয় ফটোফসফোরাইলেশনে পানি ভাঙে না ও O₂ বের হয় না।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'Z-স্কিম (অচক্রীয় ইলেকট্রন পরিবহন পথ)',
      detail: 'P₆₈₀ → ফিওফাইটিন → প্লাস্টোকুইনন (PQ) → সাইটোক্রোম b₆f → প্লাস্টোসায়ানিন (PC) → P₇₀₀ → ফেরিডক্সিন (Fd) → FNR → NADPH+H⁺',
      context: 'থাইলাকয়েড ঝিল্লিতে ATP, NADPH+H⁺ ও O₂ উৎপাদন',
      note: 'প্লাস্টোসায়ানিন (PC) একটি তামা-যুক্ত (Cu²⁺) মোবাইল ইলেকট্রন বাহক যা PS-II কে PS-I এর সাথে সংযুক্ত করে।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'চক্রীয় ফটোফসফোরাইলেশন (Cyclic Photophosphorylation)',
      detail: 'কেবল PS-I (P₇₀₀) অংশগ্রহণ করে ইলেকট্রন ফেরিডক্সিন থেকে প্লাস্টোকুইনন ও সাইটোক্রোম b₆f হয়ে পুনরায় P₇₀₀-এ ফিরে আসা এবং কেবল ATP উৎপন্ন হওয়া',
      context: 'স্ট্রোমা ল্যামেলিতে যেখানে PS-II ও NADP রিডাক্টেজ অনুপস্থিত',
      note: 'কেলভিন চক্রে ২ NADPH-এর বিপরীতে ৩ ATP লাগে বলে অতিরিক্ত ATP চাহিদা মেটাতে চক্রীয় প্রবাহ চলে।',
      diff: 'board',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'এমারসন প্রভাব ও রেড ড্রপ (Red Drop)',
      detail: '৬৮০ nm-এর বেশি তরঙ্গদৈর্ঘ্যে (দূর-লাল) সালোকসংশ্লেষণ হঠাৎ কমে যাওয়া (রেড ড্রপ) এবং লাল+দূর-লাল আলো একসাথে দিলে হার বেড়ে যাওয়া (এমারসন এফেক্ট)',
      context: 'দুটি পৃথক ফটোসিস্টেম (PS-I ও PS-II) যুগপৎ সক্রিয় থাকার প্রমাণ',
      note: 'দূর-লাল আলোতে কেবল PS-I কাজ করে কিন্তু লাল+দূর-লাল একসাথে দিলে উভয় ফটোসিস্টেম মিলে Z-স্কিম চালায়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'রুবিস্কো (RuBisCO) এনজাইমের কার্বোক্সিলেজ বিক্রিয়া',
      detail: '৫-কার্বনযুক্ত RuBP-এর সাথে CO₂ যুক্ত করে অস্থায়ী ৬-কার্বন যৌগ থেকে ২ অণু ৩-ফসফোগ্লিসারিক অ্যাসিড (3-PGA) তৈরি করা',
      context: 'C₃ বা কেলভিন চক্রের প্রথম স্থায়ী যৌগ ৩-PGA সৃষ্টি',
      note: 'RuBisCO-এর পূর্ণরূপ Ribulose-1,5-bisphosphate carboxylase-oxygenase; এটি O₂ বেশি থাকলে ফটোরেসপিরেশন ঘটায়।',
      diff: 'board',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'C₄ (হ্যাচ ও স্ল্যাক) চক্রের প্রথম স্থায়ী যৌগ ও কার্বোক্সিলেজ',
      detail: 'মেসোফিল কোষে PEP কার্বোক্সিলেজ এনজাইম ৩-কার্বন PEP-এর সাথে HCO₃⁻ যুক্ত করে ৪-কার্বন অক্সালোঅ্যাসিটিক অ্যাসিড (OAA) তৈরি করা',
      context: 'ভুট্টা, আখ, জোয়ার ও মুথা ঘাস (C₄ উদ্ভিদ)',
      note: 'PEPCase-এর O₂-এর প্রতি কোনো আসক্তি নেই বলে C₄ উদ্ভিদে ফটোরেসপিরেশন প্রায় শূন্য হয়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'CAM (Crassulacean Acid Metabolism) প্রক্রিয়া',
      detail: 'রাতে পত্ররন্ধ্র খুলে CO₂ গ্রহণ করে ম্যালিক অ্যাসিড হিসেবে কোষগহ্বরে জমা রাখা এবং দিনে পত্ররন্ধ্র বন্ধ রেখে তা ভেঙে কেলভিন চক্র চালানো',
      ex_dummy: '',
      context: 'পাথরকুচি (Bryophyllum), আনারস, ক্যাকটাস ও ঘৃতকুমারী (মরু/রসালো উদ্ভিদ)',
      note: 'CAM উদ্ভিদে সময়ের ব্যবধানে (Temporal separation) ও C₄ উদ্ভিদে স্থানের ব্যবধানে (Spatial separation) দুটি চক্র চলে।',
      diff: 'medical',
    } as BioChemPhysioRow,
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'ফটোরেসপিরেশন (C₂ বা গ্লাইকোলেট চক্র)',
      detail: 'উচ্চ তাপমাত্রা ও উচ্চ O₂/CO₂ অনুপাতে RuBisCO অক্সিজিনেজ হিসেবে কাজ করে RuBP কে ভেঙে ফসফোগ্লাইকোলেট তৈরি এবং ক্লোরোপ্লাস্ট-পারঅক্সিসোম-মাইটোকন্ড্রিয়ায় ATP ছাড়াই কার্বন নষ্ট হওয়া',
      context: 'C₃ উদ্ভিদের সালোকসংশ্লেষণ দক্ষতা ২৫–৫০% হ্রাসকারী অপচয়মূলক প্রক্রিয়া',
      note: 'ফটোরেসপিরেশনে ১ অণু CO₂ মুক্ত করতে গ্লাইসিন মাইটোকন্ড্রিয়ায় সেরিনে রূপান্তরিত হয় এবং কোনো ATP তৈরি হয় না।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'ব্ল্যাকম্যানের লিমিটিং ফ্যাক্টর সূত্র (১৯০৫)',
      detail: 'কোনো জৈবিক প্রক্রিয়া একাধিক প্রভাবক দ্বারা নিয়ন্ত্রিত হলে সবচেয়ে কম বা ন্যূনতম মাত্রায় থাকা প্রভাবকটিই বিক্রিয়ার গতি নির্ধারণ করে',
      context: 'আলো, CO₂ ঘনত্ব, তাপমাত্রা ও পানির যৌথ প্রভাব',
      note: 'স্বাভাবিক পরিবেশে বায়ুমণ্ডলের মাত্র ০.০৩–০.০৪% CO₂ থাকায় অধিকাংশ ক্ষেত্রে CO₂-ই লিমিটিং ফ্যাক্টর হিসেবে কাজ করে।',
      diff: 'board',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'কার্ডিনাল পয়েন্ট ও Q₁₀ তাপমাত্রা সহগ',
      detail: 'সালোকসংশ্লেষণের অনুকূল তাপমাত্রা সাধারণত ২২°–৩৫°C (C₃) ও ৩০°–৪৫°C (C₄) এবং প্রতি ১০°C তাপমাত্রা বৃদ্ধিতে এনজাইম বিক্রিয়ার বেগ দ্বিগুণ হওয়া',
      context: '৪৫°C-এর বেশি তাপমাত্রায় এনজাইম বিনষ্ট হয়ে সালোকসংশ্লেষণ বন্ধ হওয়া',
      note: 'সালোকসংশ্লেষণ সূর্যের লাল (৬৫০–৭০০ nm) ও নীল (৪৩০–৪৭০ nm) আলোতে সর্বাধিক এবং সবুজ আলোতে সর্বনিম্ন হয়।',
      diff: 'dental',
    },
  ];

  // =========================================================================
  // SECTION 2: Cellular Respiration Complete Enzymes, Complexes & RQ (~150 MCQs)
  // =========================================================================
  const respRows: BioChemPhysioRow[] = [
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'হেক্সোকাইনেজ ও ফসফোফ্রুক্টোকাইনেজ-১ (PFK-1)',
      detail: 'গ্লাইকোলাইসিসের যথাক্রমে ১ম ও ৩য় ধাপের একমুখী প্রাইমিং বিক্রিয়া যেখানে Mg²⁺ সহায়তায় ১টি করে মোট ২ অণু ATP খরচ হয়',
      context: 'সাইটোপ্লাজমে গ্লাইকোলাইসিসের প্রস্তুতি বা বিনিয়োগ পর্যায়',
      note: 'ফসফোফ্রুক্টোকাইনেজ-১ (PFK-1) হলো সমগ্র গ্লাইকোলাইসিসের প্রধান পেসমেকার (Rate-limiting) এনজাইম যা উচ্চ ATP-তে বাধাপ্রাপ্ত হয়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'অ্যালডোলেজ ও ট্রায়োজ ফসফেট আইসোমারেজ',
      detail: '৬-কার্বন ফ্রুক্টোজ-১,৬-বিসফসফেট ভেঙে দুটি ৩-কার্বন যৌগ 3-PGAL (G3P) ও DHAP সৃষ্টি এবং উভয়ের আন্তঃরূপান্তর',
      context: 'গ্লাইকোলাইসিসের ৪র্থ ও ৫ম ধাপ (৩-কার্বন স্তরে বিভাজন)',
      note: 'প্রতিটি গ্লুকোজ থেকে ২ অণু 3-PGAL তৈরি হয় বলে পরবর্তী সকল বিক্রিয়া ২ বার করে ঘটে।',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: '১,৩-বিসফসফোগ্লিসারেট ও ফসফোইনলপাইরুভেট (সাবস্ট্রেট-লেভেল ATP)',
      detail: 'গ্লাইকোলাইসিসের ৭ম (ফসফোগ্লিসারেট কাইনেজ) ও ১০ম (পাইরুভেট কাইনেজ) ধাপে ETS ছাড়াই সরাসরি ADP থেকে ৪ অণু ATP তৈরি',
      context: 'গ্লাইকোলাইসিসে নিট উৎপাদন: ২ অণু পাইরুভিক অ্যাসিড, ২ ATP ও ২ NADH+H⁺',
      note: 'এনোলেজ এনজাইম ২-ফসফোগ্লিসারেট থেকে পানি বের করে উচ্চ-শক্তির ফসফোইনলপাইরুভেট (PEP) তৈরি করে (ফ্লোরাইড একে বাধা দেয়)।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'পাইরুভেট ডিহাইড্রোজিনেজ কমপ্লেক্স (লিঙ্ক বিক্রিয়া)',
      detail: 'মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে ৩-কার্বন পাইরুভেট থেকে ১ CO₂, ১ NADH+H⁺ এবং ২-কার্বন অ্যাসিটাইল-CoA সৃষ্টিকারী ৫-কোফ্যাক্টরযুক্ত এনজাইম কমপ্লেক্স',
      context: 'কোফ্যাক্টর: TPP (ভিটামিন B₁), Lipoic acid, CoA (B₅), FAD (B₂) ও NAD⁺ (B₃)',
      note: 'গ্লাইকোলাইসিস ও ক্রেবস চক্রের মধ্যে এটি সংযোগকারী সেতু; আর্সেনাইট লাইপোয়িক অ্যাসিডকে নিষ্ক্রিয় করে এ ধাপ বন্ধ করে।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'সাইট্রেট সিন্থেজ ও ক্রেবস চক্রের প্রথম উৎপাদ (সাইট্রিক অ্যাসিড)',
      detail: '২-কার্বন অ্যাসিটাইল-CoA ও ৪-কার্বন অক্সালোঅ্যাসিটিক অ্যাসিড ঘনীভূত হয়ে ৬-কার্বন ট্রাইকার্বোক্সিলিক সাইট্রিক অ্যাসিড গঠন করা',
      context: 'সাইট্রিক অ্যাসিড চক্র বা TCA চক্রের সূচনা ধাপ',
      note: 'অক্সালোঅ্যাসিটেট প্রতি চক্র শেষে পুনরুত্পাদিত হয় বলে ক্রেবস চক্র নিরবচ্ছিন্নভাবে চলতে পারে।',
      diff: 'board',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'সাকসিনাইল-CoA সিন্থেটেজ (ক্রেবস চক্রের একমাত্র সরাসরি ATP/GTP)',
      detail: '৪-কার্বন সাকসিনাইল-CoA ভেঙে সাকসিনিক অ্যাসিড তৈরির সময় সাবস্ট্রেট-লেভেল ফসফোরাইলেশনে ১ অণু GTP (বা ATP) উৎপন্ন হওয়া',
      context: 'মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে ক্রেবস চক্রের ৫ম ধাপ (১ গ্লুকোজে ২ GTP)',
      note: 'অন্যদিকে সাকসিনেট ডিহাইড্রোজিনেজ হলো ক্রেবস চক্রের একমাত্র এনজাইম যা ম্যাট্রিক্সে না থেকে অন্তঃঝিল্লিতে (কমপ্লেক্স-II) অবস্থান করে।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'ম্যালিক অ্যাসিড থেকে OAA ও ১ গ্লুকোজে ৩টি ডিকার্বোক্সিলেশন',
      detail: '১ অণু পাইরুভেট সম্পূর্ণ জারণে ৩টি CO₂ বের হওয়া (লিঙ্কে ১, আইসোসাইট্রেটে ১, α-কিটোগ্লুটারেটে ১; ১ গ্লুকোজে মোট ৬ CO₂)',
      context: 'সবাত শ্বসনের অ্যাম্ফিবলিক (উপচিতি + অপচিতি) পথ',
      note: 'ক্রেবস চক্রের α-কিটোগ্লুটারেট অ্যামিনো অ্যাসিড এবং সাকসিনাইল-CoA হিমোগ্লোবিন ও ক্লোরোফিলের পোরফিরিন বলয় সংশ্লেষে ব্যবহৃত হয়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'ETS কমপ্লেক্স-I, II, III ও IV (সাইটোক্রোম অক্সিডেজ)',
      detail: 'NADH ডিহাইড্রোজিনেজ (I), সাকসিনেট ডিহাইড্রোজিনেজ (II), সাইটোক্রোম bc₁ (III) ও সাইটোক্রোম a-a₃ অক্সিডেজ (IV) হয়ে সর্বশেষ গ্রহীতা O₂ তে ইলেকট্রন গমন',
      context: 'মাইটোকন্ড্রিয়ার অন্তঃঝিল্লি (ক্রিস্টি) বরাবর ইলেকট্রন পরিবহন',
      note: 'কমপ্লেক্স-IV বা সাইটোক্রোম c অক্সিডেজে Fe ও Cu থাকে; সায়ানাইড (CN⁻) ও কার্বন মনোক্সাইড (CO) কমপ্লেক্স-IV কে রুদ্ধ করে মৃত্যু ঘটায়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'পিটার মিচেলের কেমিওঅসমোটিক মতবাদ (অক্সিডেটিভ ফসফোরাইলেশন)',
      detail: 'ইলেকট্রন প্রবাহের শক্তিতে ম্যাট্রিক্স থেকে আন্তঃঝিল্লি স্থানে H⁺ পাম্প হয়ে তৈরি প্রোটন-মোটিভ ফোর্স দিয়ে ATP সিন্থেজে (F₀-F₁) ATP তৈরি হওয়া',
      context: 'প্রতি NADH → ~২.৫ (সর্বোচ্চ ৩) এবং প্রতি FADH₂ → ~১.৫ (সর্বোচ্চ ২) অণু ATP',
      note: 'পিটার মিচেল ১৯৭৮ সালে রসায়নে নোবেল পান; ২,৪-ডাইনাইট্রোফেনল (DNP) প্রোটন গ্রেডিয়েন্ট নষ্ট করে (Uncoupler) তাপ উৎপন্ন করে।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'ম্যালেট-অ্যাস্পার্টেট (৩৮ ATP) বনাম গ্লিসেরল-৩-ফসফেট শাটল (৩৬ ATP)',
      detail: 'যকৃত ও হৃৎপিণ্ডে সাইটোপ্লাজমিক NADH ম্যাট্রিক্সের NAD⁺ কে দিলে ৩৮ ATP এবং কঙ্কালপেশি ও উদ্ভিদে FAD কে দিলে ৩৬ ATP উৎপন্ন হওয়া',
      context: 'প্রকৃতকোষে ১ গ্লুকোজ থেকে নিট ৩৬ বা ৩৮ অণু ATP পাওয়া',
      note: 'আদিকোষে মাইটোকন্ড্রিয়া না থাকায় পরিবহন খরচ লাগে না এবং সরাসরি ৩৮ অণু ATP উৎপন্ন হয়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'অ্যালকোহল ও ল্যাকটিক অ্যাসিড ফারমেন্টেশন (অবাত শ্বসন)',
      detail: 'পাইরুভেট থেকে CO₂ ত্যাগ করে ইথানল ও ২ ATP (ইস্টে) বনাম CO₂ ত্যাগ না করে ল্যাকটিক অ্যাসিড ও ২ ATP (পেশি ও ল্যাক্টোব্যাসিলাসে)',
      context: 'অক্সিজেনের অনুপস্থিতিতে NAD⁺ পুনরুৎপাদন করে গ্লাইকোলাইসিস চালু রাখা',
      note: 'ল্যাকটিক অ্যাসিড গাঁজনে কোনো CO₂ উৎপন্ন হয় না, কিন্তু অ্যালকোহল গাঁজনে প্রতি গ্লুকোজে ২ অণু CO₂ বের হয় (পাউরুটি ফোলে)।',
      diff: 'board',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      item: 'শ্বসনিক হার (RQ = নির্গত CO₂ / গৃহীত O₂)',
      detail: 'শর্করায় ১.০, চর্বি/লিপিডে ~০.৭, প্রোটিনে ~০.৮–০.৯, জৈব অ্যাসিডে >১.০ (ম্যালিক ১.৩৩, অক্সালিক ৪.০), CAM উদ্ভিদে রাতে ০ এবং অবাত শ্বসনে অসীম (∞)',
      context: 'গ্যানং-এর রেসপাইরোমিটার যন্ত্র দিয়ে পরিমাপযোগ্য শ্বসনবস্তু নির্দেশক',
      note: 'অঙ্কুরিত তৈলবীজে (সরিষা/রেড়ি) চর্বি জারণে বেশি O₂ লাগে বলে RQ ১-এর কম (~০.৭) হয়।',
      diff: 'medical',
    },
  ];

  // =========================================================================
  // SECTION 3: Biomolecules, Enzymes, Embryology & Biotechnology (~180 MCQs)
  // =========================================================================
  const biotechEmbryoRows: BioChemPhysioRow[] = [
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      item: 'বিজারক বনাম অ-বিজারক চিনি (Reducing vs Non-reducing Sugar)',
      detail: 'মুক্ত অ্যালডিহাইড বা কিটোন গ্রুপ থাকায় যে শর্করা ফেলিং দ্রবণ ও বেনেডিক্ট দ্রবণকে বিজারিত করে লাল-কমলা Cu₂O অধঃক্ষেপ দেয় (সব মনোস্যাকারাইড, ম্যাল্টোজ, ল্যাকটোজ)',
      context: 'অন্যদিকে সুক্রোজ ও স্টার্চ-গ্লাইকোজেন অ-বিজারক শর্করা',
      note: 'ফ্রুক্টোজ কিটোজ শর্করা হলেও ক্ষারীয় মাধ্যমে এনডায়ল রূপান্তরের মাধ্যমে বেনেডিক্ট ও ফেলিং পরীক্ষা দেয়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      item: 'অত্যাবশ্যকীয় অ্যামিনো অ্যাসিড (PVT TIM HALL)',
      detail: 'মানবদেহে সংশ্লেষিত হয় না বলে খাদ্য থেকে গ্রহণ করা বাধ্যতামূলক অ্যামিনো অ্যাসিড (ভ্যালিন, লিউসিন, আইসোলিউসিন, লাইসিন, মিথিওনিন, ফিনাইলঅ্যালানিন, থ্রিওনিন, ট্রিপটোফ্যান, প্রাপ্তবয়স্কে ৮টি + শিশুতে হিস্টিডিন ও আর্জিনিন)',
      context: 'অ্যান্টি-নিউট্রিশনাল বা প্রোটিনের জৈবমান নির্ণায়ক',
      note: 'সিস্টিন ও মিথিওনিন হলো সালফারযুক্ত অ্যামিনো অ্যাসিড; গ্লাইসিন হলো একমাত্র অপ্রতিসম কার্বনবিহীন সরলতম অ্যামিনো অ্যাসিড।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      item: 'টারপিনয়েড, রাবার ও স্টেরয়েড (উদ্ভূত লিপিড)',
      detail: '৫-কার্বন আইসোপ্রিন (C₅H₈) এককের পলিমার টারপিন ও রাবার এবং ৪-বলয়যুক্ত সাইক্লোপেন্টানোপারহাইড্রোফেনানথ্রিন কাঠামোর কোলেস্টেরল-হরমোন-ভিটামিন D',
      context: 'ক্যারোটিনয়েড (C₄₀ টেট্রাটারপিন), অ্যান্থোসায়ানিন (পানিতে দ্রবণীয় ফ্ল্যাভোনয়েড) নয় বরং লিপিডজাত রঞ্জক',
      note: 'কোলেস্টেরল মানবদেহে স্টেরয়েড হরমোন (টেস্টোস্টেরন, ইস্ট্রোজেন, কর্টিসল), পিত্ত অ্যাসিড ও ভিটামিন-D সংশ্লেষের পূর্বসূরি।',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      item: 'অ্যাপোএনজাইম, কো-ফ্যাক্টর ও হলোএনজাইম',
      detail: 'এনজাইমের নিষ্ক্রিয় প্রোটিন অংশ (অ্যাপোএনজাইম) + অ-প্রোটিন অংশ (কো-ফ্যাক্টর) মিলে গঠিত সম্পূর্ণ সক্রিয় এনজাইম (হলোএনজাইম)',
      context: 'দৃঢ়ভাবে যুক্ত জৈব অংশ = প্রস্থেটিক গ্রুপ (যেমন হিম); শিথিলভাবে যুক্ত জৈব অংশ = কো-এনজাইম (NAD⁺, FAD, CoA)',
      note: 'প্রায় সব ভিটামিন বি-কমপ্লেক্স কো-এনজাইমের পূর্বসূরি হিসেবে কাজ করে; ধাতব আয়ন অ্যাক্টিভেটর হিসেবে কাজ করে।',
      diff: 'board',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      item: 'মাইকেলিস-মেনটেন ধ্রুবক (Km)',
      detail: 'যে সাবস্ট্রেট ঘনত্বে এনজাইম বিক্রিয়ার গতি সর্বোচ্চ বেগের অর্ধেক (½ Vmax) হয় — নিম্ন Km মানে সাবস্ট্রেটের প্রতি এনজাইমের উচ্চ আসক্তি (Affinity)',
      context: 'এনজাইম গতিবিদ্যার মৌলিক পরিমাপক',
      note: 'কার্বনিক অ্যানহাইড্রেজ হলো অন্যতম দ্রুতগতিসম্পন্ন এনজাইম এবং হেক্সোকাইনেজ-গ্লুকোকাইনেজের Km মান ভিন্ন হয়।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      item: 'নন-মেমব্রেন বা নিউসেলার পলিএমব্রায়োনি ও অ্যাপোস্পোরি',
      detail: 'একটি বীজের ভেতরে নিষিক্ত ডিম্বাণু ছাড়াও নিউসেলাস বা ইন্টিগুমেন্ট থেকে একাধিক ভ্রূণ সৃষ্টি হওয়া (অ্যাডভেন্টিভ পলিএমব্রায়োনি)',
      context: 'লেবু, কমলা ও আম (Citrus ও Mangifera)',
      note: 'লিউয়েনহুক (১৭১৯) কমলার বীজে সর্বপ্রথম বহুভ্রূণতা (Polyembryony) পর্যবেক্ষণ করেন।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      item: 'হেলোবিয়াল, নিউক্লিয়ার ও সেলুলার শস্য (Endosperm)',
      def_placeholder: '',
      detail: 'প্রাথমিক শস্য নিউক্লিয়াস প্রাচীর গঠন ছাড়া মুক্তভাবে বিভক্ত হওয়া (নিউক্লিয়ার যেমন নারিকেল-গম), সাথে সাথে প্রাচীর গঠিত হওয়া (সেলুলার যেমন ধুতুরা) ও মধ্যবর্তী দশা (হেলোবিয়াল)',
      context: 'ভ্রূণের পরিস্ফুটনে পুষ্টি সরবরাহকারী ৩n টিস্যু',
      note: 'অসস্যল বা এক্স-অ্যালবুমিনাস বীজে (মটর, ছোলা, আম) ভ্রূণ বৃদ্ধির সময় সম্পূর্ণ শস্য শোষিত হয়ে যায়; ধান-গম-রেড়ি হলো সস্যল বীজ।',
      diff: 'board',
    } as BioChemPhysioRow,
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      item: 'নিউক্লিয়ার, ক্যাপিট্যাট ও সিঙ্গামি-ত্রিমিলন (S. G. Nawaschin, ১৮৯৮)',
      detail: 'একটি পুংগ্যামেট ডিম্বাণুর সাথে মিশে জাইগোট (2n) এবং অপর পুংগ্যামেট ২টি মেরু নিউক্লিয়াসের সাথে মিশে প্রাইমারি এন্ডোস্পার্ম নিউক্লিয়াস (3n) গঠন করা',
      context: 'কেবলমাত্র আবৃতবীজী (Angiosperm) উদ্ভিদের অনন্য শনাক্তকারী বৈশিষ্ট্য',
      note: '১৮৯৮ সালে রুশ বিজ্ঞানী সার্গেই নাওয়াশিন Lilium ও Fritillaria উদ্ভিদে দ্বিনিষেক আবিষ্কার করেন।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      item: 'pBR322 ও pUC19 ক্লোনিং ভেক্টর',
      detail: 'বোলিভার ও রদ্রিগেজ নির্মিত ৪৩৬১ bp বিশিষ্ট কৃত্রিম প্লাজমিড যাতে অরিজিন অব রেপ্লিকেশন (ori), অ্যাম্পিসিলিন (ampᴿ) ও টেট্রাসাইক্লিন (tetᴿ) প্রতিরোধী সিলেকটেবল মার্কার জিন থাকে',
      context: 'সফল রিকম্বিন্যান্ট ক্লোন শনাক্ত করতে ইনসার্শনাল ইনঅ্যাক্টিভেশন ব্যবহৃত হয়',
      note: 'কোনো বিদেশি DNA BamHI সাইটে ঢোকালে tetᴿ জিন নিষ্ক্রিয় হয়ে যায়, ফলে রিকম্বিন্যান্ট ব্যাকটেরিয়া টেট্রাসাইক্লিন মাধ্যমে বাঁচতে পারে না।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      item: 'Bt-বেগুন ও Bt-তুলা (Cry1Ac জিন)',
      detail: 'মাটির Bacillus thuringiensis ব্যাকটেরিয়া থেকে প্রাপ্ত ক্রাই (Cry) জিন প্রবেশ করিয়ে ফল ও ডগা ছিদ্রকারী পোকার প্রতি প্রতিরোধী ট্রান্সজেনিক ফসল তৈরি',
      context: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) কর্তৃক ২০১৩ সালে অনুমোদিত প্রথম GM খাদ্যফসল',
      note: 'Bt প্রোটক্সিন কেবল কীটপতঙ্গের ক্ষারীয় অন্ত্রের pH-এ সক্রিয় হয়ে অন্ত্র ছিদ্র করে, তাই মানুষের অম্লীয় পাকস্থলিতে সম্পূর্ণ নিরাপদ।',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      item: 'টিস্যু কালচারে টোটিপোটেন্সি ও মুরাশিগ-স্কুগ (MS) মিডিয়াম',
      detail: 'একটি একক সজীব উদ্ভিদ কোষের সমগ্র পূর্ণাঙ্গ উদ্ভিদ গঠনের অন্তর্নিহিত ক্ষমতা (গটলিব হ্যাবারল্যান্ডট, ১৯০২) ও অক্সিন-সাইটোকাইনিন সমন্বিত পুষ্টি মাধ্যম',
      context: 'অর্কিড, আলু, কলা ও স্ট্রবেরির রোগমুক্ত ক্লোনাল মাইক্রোপ্রোপাগেশন',
      note: 'অসংগঠিত বিভাজনশীল কোষপিণ্ডকে ক্যালাস (Callus) বলে এবং অ্যান্থার কালচারের মাধ্যমে সরাসরি হ্যাপ্লয়েড (n) উদ্ভিদ পাওয়া যায়।',
      diff: 'board',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      item: 'হাইব্রিডোমা ও মনোক্লোনাল অ্যান্টিবডি (কোহলার ও মিলস্টেইন)',
      detail: 'অ্যান্টিবডি উৎপাদনকারী স্বল্পায়ু B-লিম্ফোসাইটের সাথে অমর মায়োলোমা ক্যান্সার কোষ ফিউশন করে একক এপিটোপ-সুনির্দিষ্ট অ্যান্টিবডি তৈরি',
      context: 'ক্যান্সার শনাক্তকরণ, প্রেগন্যান্সি টেস্ট ও লক্ষ্যভেদী ইমিউনোথেরাপি',
      note: '১৯৮৪ সালে এই প্রযুক্তির জন্য সিজার মিলস্টেইন ও জর্জ কোহলার চিকিৎসাবিজ্ঞানে নোবেল লাভ করেন।',
      diff: 'dental',
    },
  ];

  const addBioChemMatrix = (rows: BioChemPhysioRow[], ref: string) => {
    rows.forEach((r, i) => {
      const others = rows.filter((x) => x.item !== r.item);
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'bio_1',
          chapterId: r.ch,
          visualLessonId: r.vl,
          hscLevel: '11',
          difficulty: r.diff || 'medical',
          question: `"${r.detail}" — জীববিজ্ঞানে এটি কোন প্রক্রিয়া, এনজাইম বা পরীক্ষার নির্ভুল বিবরণ?`,
          correct: r.item,
          distractors: others.slice(i % Math.max(1, others.length - 5), (i % Math.max(1, others.length - 5)) + 5).map((x) => x.item),
          explanation: `${r.item}: ${r.detail}। ${r.note}`,
          reference: `${ref} · ${r.item}`,
        })
      );
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'bio_1',
          chapterId: r.ch,
          visualLessonId: r.vl,
          hscLevel: '11',
          difficulty: i % 2 === 0 ? 'dental' : 'board',
          question: `${r.item} সম্পর্কিত নিচের কোন বৈজ্ঞানিক তথ্যটি নির্ভুল?`,
          correct: r.detail,
          distractors: others.slice((i + 3) % Math.max(1, others.length - 5), ((i + 3) % Math.max(1, others.length - 5)) + 5).map((x) => x.detail),
          explanation: `${r.item} (${r.context}): ${r.detail}। ${r.note}`,
          reference: `${ref} · ${r.item}`,
        })
      );
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'bio_1',
          chapterId: r.ch,
          visualLessonId: r.vl,
          hscLevel: '11',
          difficulty: i % 3 === 0 ? 'board' : 'medical',
          question: `"${r.context}" — এই প্রেক্ষাপটটি কোন বিষয়ের সাথে সরাসরি যুক্ত?`,
          correct: r.item,
          distractors: others.slice((i + 5) % Math.max(1, others.length - 5), ((i + 5) % Math.max(1, others.length - 5)) + 5).map((x) => x.item),
          explanation: `${r.context} হলো "${r.item}"-এর প্রেক্ষাপট। ${r.note}`,
          reference: `${ref} · প্রয়োগ ও প্রেক্ষাপট`,
        })
      );
    });
  };

  addBioChemMatrix(photoRows, 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · সালোকসংশ্লেষণ');
  addBioChemMatrix(respRows, 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · কোষীয় শ্বসন');
  addBioChemMatrix(biotechEmbryoRows, 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ ও ১০ · জৈব-রসায়ন, ভ্রূণতত্ত্ব ও জীবপ্রযুক্তি');

  // =========================================================================
  // SECTION 4: Quantitative Stoichiometry — Respiration, Photosynthesis, PCR & Glycolysis (~240 MCQs)
  // =========================================================================
  // 4A. Photon & Quantum Yield / C3 vs C4 ATP-NADPH difference problems (60 MCQs)
  const co2Counts = [1, 2, 3, 4, 6, 8, 9, 10, 12, 15, 18, 24];
  co2Counts.forEach((c, i) => {
    const c3Atp = c * 3;
    const c4Atp = c * 5;
    const nadph = c * 2;
    const extraAtpInC4 = c * 2;
    const photonsMin = c * 8;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `C₃ উদ্ভিদে ${toBnDigits(c)} অণু CO₂ স্থিরীকরণে কেলভিন চক্রে যথাক্রমে কতটি ATP ও NADPH+H⁺ প্রয়োজন হয়?`,
        correct: `${toBnDigits(c3Atp)}টি ATP ও ${toBnDigits(nadph)}টি NADPH+H⁺`,
        distractors: [
          `${toBnDigits(c4Atp)}টি ATP ও ${toBnDigits(nadph)}টি NADPH+H⁺`,
          `${toBnDigits(nadph)}টি ATP ও ${toBnDigits(c3Atp)}টি NADPH+H⁺`,
          `${toBnDigits(c3Atp + 6)}টি ATP ও ${toBnDigits(nadph + 4)}টি NADPH+H⁺`,
        ],
        explanation: `কেলভিন চক্রে প্রতি ১ অণু CO₂ বিজারণে ৩ ATP ও ২ NADPH+H⁺ ব্যয় হয়; তাই ${toBnDigits(c)} অণুতে ${toBnDigits(c3Atp)} ATP ও ${toBnDigits(nadph)} NADPH+H⁺ লাগে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · কেলভিন চক্র হিসাব',
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
        question: `একটি ভুট্টা (C₄) উদ্ভিদে ${toBnDigits(c)} অণু CO₂ থেকে শর্করা তৈরিতে একটি ধান (C₃) উদ্ভিদের তুলনায় অতিরিক্ত কতটি ATP খরচ হয়?`,
        correct: `${toBnDigits(extraAtpInC4)}টি অতিরিক্ত ATP`,
        distractors: [
          `${toBnDigits(c)}টি অতিরিক্ত ATP`,
          `${toBnDigits(c3Atp)}টি অতিরিক্ত ATP`,
          `${toBnDigits(c4Atp)}টি অতিরিক্ত ATP`,
        ],
        explanation: `C₃-এ ৩ ATP ও C₄-এ ৫ ATP প্রতি CO₂ লাগে। পাইরুভেট থেকে PEP পুনর্গঠনে প্রতি CO₂-এ অতিরিক্ত ২ ATP ব্যয় হয় (${toBnDigits(c)} × ২ = ${toBnDigits(extraAtpInC4)} ATP)।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · C₃ বনাম C₄ শক্তি তুলনা',
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
        question: `কোয়ান্টাম প্রয়োজনীয়তা ৮ ফোটন/O₂ হিসেবে ${toBnDigits(c)} অণু O₂ মুক্ত করতে (এবং ${toBnDigits(c)} CO₂ বিজারণে) ন্যূনতম কতটি আলোক ফোটন শোষিত হতে হবে?`,
        correct: `${toBnDigits(photonsMin)}টি ফোটন`,
        distractors: [
          `${toBnDigits(c * 4)}টি ফোটন`,
          `${toBnDigits(c * 12)}টি ফোটন`,
          `${toBnDigits(c * 6)}টি ফোটন`,
        ],
        explanation: `২টি ফটোসিস্টেমে (PS-II ও PS-I) ১টি O₂ মুক্ত করতে ৪টি ইলেকট্রন দুইবার উত্তেজিত হয় (৪ × ২ = ৮ ফোটন)। তাই ${toBnDigits(c)} অণুতে ${toBnDigits(photonsMin)}টি ফোটন।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · কোয়ান্টাম ইল্ড',
      })
    );
  });

  // 4B. Pyruvate / Acetyl-CoA / Krebs / ETC Quantitative Drills (48 MCQs)
  const pyrMols = [1, 2, 3, 4, 5, 6, 8, 10];
  pyrMols.forEach((p, i) => {
    const linkNadh = p;
    const linkCo2 = p;
    const krebsCo2 = p * 2;
    const totalPyruvateCo2 = p * 3;
    const krebsNadh = p * 3;
    const krebsFadh = p * 1;
    const krebsAtpEquivClassic = p * 15; // 1 link NADH (3) + 3 NADH (9) + 1 FADH2 (2) + 1 GTP (1) = 15 ATP per pyruvate
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মাইটোকন্ড্রিয়ার ভেতরে ${toBnDigits(p)} অণু পাইরুভিক অ্যাসিড সম্পূর্ণ জারিত হলে লিঙ্ক বিক্রিয়া ও ক্রেবস চক্র মিলিয়ে মোট কত অণু CO₂ এবং কতটি FADH₂ উৎপন্ন হবে?`,
        correct: `${toBnDigits(totalPyruvateCo2)} অণু CO₂ ও ${toBnDigits(krebsFadh)}টি FADH₂`,
        distractors: [
          `${toBnDigits(krebsCo2)} অণু CO₂ ও ${toBnDigits(krebsFadh * 2)}টি FADH₂`,
          `${toBnDigits(linkCo2)} অণু CO₂ ও ${toBnDigits(krebsNadh)}টি FADH₂`,
          `${toBnDigits(totalPyruvateCo2 + 2)} অণু CO₂ ও ${toBnDigits(krebsFadh + 1)}টি FADH₂`,
        ],
        explanation: `প্রতি পাইরুভেট (C₃) জারণে লিঙ্কে ১ CO₂ + ক্রেবসে ২ CO₂ = মোট ৩ CO₂ এবং ক্রেবসে ১টি FADH₂ (ও মোট ৪টি NADH+H⁺) উৎপন্ন হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · পাইরুভেট জারণ',
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
        question: `সনাতন হিসাব (১ NADH = ৩ ATP, ১ FADH₂ = ২ ATP) অনুযায়ী ${toBnDigits(p)} অণু পাইরুভিক অ্যাসিড মাইটোকন্ড্রিয়ায় সম্পূর্ণ জারিত হয়ে মোট কত অণু ATP তৈরি করে?`,
        correct: `${toBnDigits(krebsAtpEquivClassic)} অণু ATP`,
        distractors: [
          `${toBnDigits(p * 12)} অণু ATP`,
          `${toBnDigits(p * 18)} অণু ATP`,
          `${toBnDigits(p * 10)} অণু ATP`,
        ],
        explanation: `১ পাইরুভেট → ৪ NADH (১২ ATP) + ১ FADH₂ (২ ATP) + ১ GTP (১ ATP) = ১৫ ATP। তাই ${toBnDigits(p)} অণুতে ${toBnDigits(krebsAtpEquivClassic)} অণু ATP।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শ্বসন শক্তি হিসাব',
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
        question: `${toBnDigits(p)} অণু অ্যাসিটাইল-CoA ক্রেবস চক্রে প্রবেশ করলে সরাসরি কত অণু GTP ও কতটি NADH+H⁺ উৎপন্ন হয়?`,
        correct: `${toBnDigits(p)} অণু GTP ও ${toBnDigits(krebsNadh)}টি NADH+H⁺`,
        distractors: [
          `${toBnDigits(p * 2)} অণু GTP ও ${toBnDigits(krebsNadh)}টি NADH+H⁺`,
          `${toBnDigits(p)} অণু GTP ও ${toBnDigits(p * 2)}টি NADH+H⁺`,
          `${toBnDigits(p)} অণু GTP ও ${toBnDigits(p * 4)}টি NADH+H⁺`,
        ],
        explanation: `প্রতি অ্যাসিটাইল-CoA ক্রেবস চক্রে ৩ NADH+H⁺, ১ FADH₂, ১ GTP ও ২ CO₂ উৎপন্ন করে (লিঙ্ক ধাপ বাদে)।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ক্রেবস চক্র উৎপাদ',
      })
    );
  });

  // 4C. PCR Amplification Cycles (2^n) + DNA Restriction Fragments (36 MCQs)
  const pcrCycles = [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 20];
  pcrCycles.forEach((cyc, i) => {
    const copies = Math.pow(2, cyc);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পলিমারেজ চেইন রিঅ্যাকশনে (PCR) ১টি লক্ষ্য DNA খণ্ড থেকে ${toBnDigits(cyc)} চক্র পর তাত্ত্বিকভাবে কতটি DNA কপি তৈরি হবে?`,
        correct: `${toBnDigits(copies.toLocaleString('en-US'))}টি (2^${toBnDigits(cyc)})`,
        distractors: [
          `${toBnDigits((cyc * 2).toLocaleString('en-US'))}টি`,
          `${toBnDigits(Math.pow(2, cyc - 1).toLocaleString('en-US'))}টি`,
          `${toBnDigits((copies * 2).toLocaleString('en-US'))}টি`,
          `${toBnDigits((cyc * cyc).toLocaleString('en-US'))}টি`,
        ],
        explanation: `প্রতি PCR চক্রে DNA-এর পরিমাণ দ্বিগুণ হয়। তাই n চক্র পর মোট কপি = 2ⁿ = 2^${toBnDigits(cyc)} = ${toBnDigits(copies)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · PCR প্রবর্ধন',
      })
    );
  });

  const restrictionCases = [
    { sites: 3, type: 'রৈখিক DNA (Linear)', frags: 4 },
    { sites: 4, type: 'রৈখিক DNA (Linear)', frags: 5 },
    { sites: 5, type: 'রৈখিক DNA (Linear)', frags: 6 },
    { sites: 6, type: 'রৈখিক DNA (Linear)', frags: 7 },
    { sites: 3, type: 'বৃত্তাকার প্লাজমিড DNA (Circular)', frags: 3 },
    { sites: 4, type: 'বৃত্তাকার প্লাজমিড DNA (Circular)', frags: 4 },
    { sites: 5, type: 'বৃত্তাকার প্লাজমিড DNA (Circular)', frags: 5 },
    { sites: 6, type: 'বৃত্তাকার প্লাজমিড DNA (Circular)', frags: 6 },
  ];
  restrictionCases.forEach((rc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি ${rc.type} অণুতে EcoRI এনজাইমের ${toBnDigits(rc.sites)}টি নির্দিষ্ট শনাক্তকরণ সাইট থাকলে সম্পূর্ণ পরিপাকের পর মোট কতটি DNA খণ্ড পাওয়া যাবে?`,
        correct: `${toBnDigits(rc.frags)}টি খণ্ড`,
        distractors: [
          `${toBnDigits(rc.frags === rc.sites ? rc.sites + 1 : rc.sites)}টি খণ্ড`,
          `${toBnDigits(rc.sites * 2)}টি খণ্ড`,
          `${toBnDigits(rc.sites - 1)}টি খণ্ড`,
        ],
        explanation: `রৈখিক DNA-তে nটি কাটার স্থানে (n + ১)টি খণ্ড তৈরি হয়, কিন্তু বৃত্তাকার প্লাজমিড DNA-তে nটি কাটার স্থানে ঠিক nটি খণ্ড তৈরি হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · রেস্ট্রিকশন ম্যাপিং',
      })
    );
  });

  // 4D. Cell Division Cross-Check Matrix (Chromosome, Chromatid, DNA C-value across Mitosis & Meiosis) (~120 MCQs)
  const speciesForCycle = [
    { name: 'মটরশুঁটি', twoN: 14 },
    { name: 'পেঁয়াজ', twoN: 16 },
    { name: 'ভুট্টা', twoN: 20 },
    { name: 'ধান', twoN: 24 },
    { name: 'গোলআলু', twoN: 48 },
    { name: 'মানুষ', twoN: 46 },
  ];
  speciesForCycle.forEach((sp, i) => {
    const n = sp.twoN / 2;
    const totalChromatidsMetaphase = sp.twoN * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${sp.name} (2n = ${toBnDigits(sp.twoN)}) কোষের মাইটোসিস মেটাফেজ দশায় বিষুবীয় অঞ্চলে মোট কতটি ক্রোমোজোম এবং মোট কতটি ক্রোমাটিড উপস্থিত থাকে?`,
        correct: `${toBnDigits(sp.twoN)}টি ক্রোমোজোম ও ${toBnDigits(totalChromatidsMetaphase)}টি ক্রোমাটিড`,
        distractors: [
          `${toBnDigits(totalChromatidsMetaphase)}টি ক্রোমোজোম ও ${toBnDigits(totalChromatidsMetaphase)}টি ক্রোমাটিড`,
          `${toBnDigits(sp.twoN)}টি ক্রোমোজোম ও ${toBnDigits(sp.twoN)}টি ক্রোমাটিড`,
          `${toBnDigits(n)}টি ক্রোমোজোম ও ${toBnDigits(sp.twoN)}টি ক্রোমাটিড`,
        ],
        explanation: `S-দশায় প্রতিটি ক্রোমোজোম দুটি সিস্টার ক্রোমাটিড গঠন করে, তাই মেটাফেজে ক্রোমোজোম ${toBnDigits(sp.twoN)}টি থাকলেও ক্রোমাটিড থাকে ২ × ${toBnDigits(sp.twoN)} = ${toBnDigits(totalChromatidsMetaphase)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মেটাফেজ বিশ্লেষণ',
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
        question: `${sp.name} (2n = ${toBnDigits(sp.twoN)}) এর একটি জনন মাতৃকোষে অ্যানাফেজ-১ দশায় বিপরীত মেরুগামী প্রতিটি ক্রোমোজোম গ্রুপে কতটি ক্রোমোজোম ও কতটি ক্রোমাটিড থাকে?`,
        correct: `${toBnDigits(n)}টি ক্রোমোজোম ও ${toBnDigits(sp.twoN)}টি ক্রোমাটিড`,
        distractors: [
          `${toBnDigits(n)}টি ক্রোমোজোম ও ${toBnDigits(n)}টি ক্রোমাটিড`,
          `${toBnDigits(sp.twoN)}টি ক্রোমোজোম ও ${toBnDigits(totalChromatidsMetaphase)}টি ক্রোমাটিড`,
          `${toBnDigits(sp.twoN)}টি ক্রোমোজোম ও ${toBnDigits(sp.twoN)}টি ক্রোমাটিড`,
        ],
        explanation: `অ্যানাফেজ-১ এ হোমোলোগাস জোড় ভেঙে প্রতিটি মেরুতে n = ${toBnDigits(n)}টি ডায়াড (প্রতিটিতে ২ ক্রোমাটিড) যায়; ফলে মোট ক্রোমাটিড = ${toBnDigits(n)} × ২ = ${toBnDigits(sp.twoN)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মায়োসিস-১ অ্যানাফেজ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'board',
        question: `${sp.name} (2n = ${toBnDigits(sp.twoN)}) এর কোষে মাইটোসিস অ্যানাফেজ দশায় উভয় মেরু মিলিয়ে মোট কতটি অপত্য ক্রোমোজোম অবস্থান করে?`,
        correct: `${toBnDigits(totalChromatidsMetaphase)}টি (প্রতি মেরুতে ${toBnDigits(sp.twoN)}টি করে)`,
        distractors: [
          `${toBnDigits(sp.twoN)}টি (প্রতি মেরুতে ${toBnDigits(n)}টি করে)`,
          `${toBnDigits(n)}টি (প্রতি মেরুতে ${toBnDigits(n / 2)}টি করে)`,
          `${toBnDigits(totalChromatidsMetaphase * 2)}টি`,
        ],
        explanation: `অ্যানাফেজে সেন্ট্রোমিয়ার বিভক্ত হয়ে সিস্টার ক্রোমাটিড আলাদা হয়ে স্বাধীন অপত্য ক্রোমোজোমে পরিণত হয়; তাই কোষটিতে সাময়িকভাবে ${toBnDigits(totalChromatidsMetaphase)}টি ক্রোমোজোম থাকে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মাইটোসিস অ্যানাফেজ',
      })
    );
  });

  // =========================================================================
  // SECTION 5: High-Yield Enzyme Steps, Pigments, Restriction Enzymes & Scientist Matrix (~260 MCQs)
  // =========================================================================
  const restrictionEnzymes = [
    { enz: 'EcoRI', source: 'Escherichia coli RY13', seq: "5'-G↓AATTC-3'", endType: 'আঠালো প্রান্ত (Sticky end — 5′ ওভারহ্যাং)' },
    { enz: 'BamHI', source: 'Bacillus amyloliquefaciens H', seq: "5'-G↓GATCC-3'", endType: 'আঠালো প্রান্ত (Sticky end — 5′ ওভারহ্যাং)' },
    { enz: 'HindIII', source: 'Haemophilus influenzae Rd', seq: "5'-A↓AGCTT-3'", endType: 'আঠালো প্রান্ত (Sticky end — 5′ ওভারহ্যাং)' },
    { enz: 'PstI', source: 'Providencia stuartii 164', seq: "5'-CTGCA↓G-3'", endType: 'আঠালো প্রান্ত (Sticky end — 3′ ওভারহ্যাং)' },
    { enz: 'SmaI', source: 'Serratia marcescens Sb', seq: "5'-CCC↓GGG-3'", endType: 'ভোঁতা প্রান্ত (Blunt end)' },
    { enz: 'EcoRV', source: 'Escherichia coli J62', seq: "5'-GAT↓ATC-3'", endType: 'ভোঁতা প্রান্ত (Blunt end)' },
    { enz: 'TaqI', source: 'Thermus aquaticus YT1', seq: "5'-T↓CGA-3'", endType: '৪-ক্ষারক আঠালো প্রান্ত' },
    { enz: 'NotI', source: 'Nocardia otitidiscaviarum', seq: "5'-GC↓GGCCGC-3'", endType: '৮-ক্ষারক বিরল কর্তনকারী (Rare cutter)' },
  ];
  restrictionEnzymes.forEach((re, i) => {
    const others = restrictionEnzymes.filter((x) => x.enz !== re.enz);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_repro_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `রিকম্বিন্যান্ট DNA প্রযুক্তিতে ব্যবহৃত রেস্ট্রিকশন এনজাইম "${re.enz}" নিচের কোন প্যালিনড্রোমিক ক্রমটি কর্তন করে?`,
        correct: re.seq,
        distractors: others.slice(0, 4).map((x) => x.seq),
        explanation: `${re.enz} এনজাইমটি ${re.source} ব্যাকটেরিয়া থেকে সংগৃহীত এবং ${re.seq} স্থানে কেটে ${re.endType} তৈরি করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · রেস্ট্রিকশন এন্ডোনিউক্লিয়েজ',
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
        question: `রেস্ট্রিকশন এনজাইম "${re.enz}" কোন ব্যাকটেরিয়া থেকে পৃথকীকৃত হয়েছে?`,
        correct: re.source,
        distractors: others.slice(1, 5).map((x) => x.source),
        explanation: `নামকরণের প্রথানুসারে প্রথম অক্ষর গণ, পরের দুটি প্রজাতি এবং শেষের অক্ষর-সংখ্যা স্ট্রেইন ও আবিষ্কার ক্রম নির্দেশ করে: ${re.enz} ← ${re.source}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · আণবিক কাঁচির উৎস',
      })
    );
  });

  // All 10 Glycolysis Enzymes & Substrates Matrix (20 MCQs)
  const glycolysisSteps = [
    { step: 'গ্লুকোজ → গ্লুকোজ-৬-ফসফেট', enz: 'হেক্সোকাইনেজ (Hexokinase)', note: '১ম ধাপ; Mg²⁺ উপস্থিতিতে ১টি ATP খরচ হয়' },
    { step: 'গ্লুকোজ-৬-ফসফেট ↔ ফ্রুক্টোজ-৬-ফসফেট', enz: 'ফসফোগ্লুকোআইসোমারেজ', note: '২য় ধাপ; উভমুখী সমানুকরণ বিক্রিয়া' },
    { step: 'ফ্রুক্টোজ-৬-ফসফেট → ফ্রুক্টোজ-১,৬-বিসফসফেট', enz: 'ফসফোফ্রুক্টোকাইনেজ-১ (PFK-1)', note: '৩য় ও হার-নির্ধারক (Pacemaker) ধাপ; ১টি ATP ব্যয় হয়' },
    { step: 'ফ্রুক্টোজ-১,৬-বিসফসফেট ↔ 3-PGAL + DHAP', enz: 'অ্যালডোলেজ (Aldolase)', note: '৪র্থ ধাপ; ৬-কার্বন শর্করা দুটি ৩-কার্বনে বিভক্ত হয়' },
    { step: '3-PGAL ↔ ১,৩-বিসফসফোগ্লিসারেট', enz: 'গ্লিসারালডিহাইড-৩-ফসফেট ডিহাইড্রোজিনেজ (GAPDH)', note: '৬ষ্ঠ ধাপ; NADH+H⁺ উৎপন্ন হয় ও অজৈব ফসফেট যুক্ত হয়' },
    { step: '১,৩-বিসফসফোগ্লিসারেট → ৩-ফসফোগ্লিসারেট', enz: 'ফসফোগ্লিসারেট কাইনেজ', note: '৭ম ধাপ; প্রথম সাবস্ট্রেট-লেভেল ATP সংশ্লেষ (২ ATP/গ্লুকোজ)' },
    { step: '৩-ফসফোগ্লিসারেট ↔ ২-ফসফোগ্লিসারেট', enz: 'ফসফোগ্লিসারেট মিউটেজ', note: '৮ম ধাপ; ফসফেট মূলকের অভ্যন্তরীণ স্থানান্তর' },
    { step: '২-ফসফোগ্লিসারেট → ফসফোইনলপাইরুভেট (PEP)', enz: 'এনোলেজ (Enolase)', note: '৯ম ধাপ; ১ অণু H₂O অপসারিত হয়ে উচ্চ-শক্তির বন্ধন গড়ে' },
    { step: 'ফসফোইনলপাইরুভেট (PEP) → পাইরুভিক অ্যাসিড', enz: 'পাইরুভেট কাইনেজ (Pyruvate kinase)', note: '১০ম ও শেষ ধাপ; দ্বিতীয় সাবস্ট্রেট-লেভেল ATP সংশ্লেষ (২ ATP/গ্লুকোজ)' },
  ];
  glycolysisSteps.forEach((gs, i) => {
    const others = glycolysisSteps.filter((x) => x.enz !== gs.enz);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `গ্লাইকোলাইসিসের "${gs.step}" বিক্রিয়াটি কোন এনজাইমের সহায়তায় সম্পন্ন হয়?`,
        correct: gs.enz,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.enz),
        explanation: `${gs.step} বিক্রিয়ায় ${gs.enz} অনুঘটক হিসেবে কাজ করে (${gs.note})।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · গ্লাইকোলাইসিস ধাপসমূহ',
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
        question: `গ্লাইকোলাইসিস পথে "${gs.enz}" এনজাইমটি কোন রূপান্তর পরিচালনা করে?`,
        correct: gs.step,
        distractors: others.slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.step),
        explanation: `${gs.enz} এনজাইমের বিক্রিয়া: ${gs.step} (${gs.note})।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · গ্লাইকোলাইসিস এনজাইম',
      })
    );
  });

  // Krebs Cycle 8 Enzymes & Transformations (16 MCQs)
  const krebsSteps = [
    { step: 'অ্যাসিটাইল-CoA + OAA → সাইট্রিক অ্যাসিড', enz: 'সাইট্রেট সিন্থেজ' },
    { step: 'সাইট্রিক অ্যাসিড ↔ আইসোসাইট্রিক অ্যাসিড', enz: 'অ্যাকোনিটেজ (Aconitase)' },
    { step: 'আইসোসাইট্রিক অ্যাসিড → α-কিটোগ্লুটারিক অ্যাসিড', enz: 'আইসোসাইট্রেট ডিহাইড্রোজিনেজ (১ম NADH ও CO₂)' },
    { step: 'α-কিটোগ্লুটারিক অ্যাসিড → সাকসিনাইল-CoA', enz: 'α-কিটোগ্লুটারেট ডিহাইড্রোজিনেজ (২য় NADH ও CO₂)' },
    { step: 'সাকসিনাইল-CoA → সাকসিনিক অ্যাসিড', enz: 'সাকসিনাইল-CoA সিন্থেটেজ (GTP/ATP সৃষ্টি)' },
    { step: 'সাকসিনিক অ্যাসিড → ফিউমারিক অ্যাসিড', enz: 'সাকসিনেট ডিহাইড্রোজিনেজ (FADH₂ সৃষ্টি)' },
    { step: 'ফিউমারিক অ্যাসিড → ম্যালিক অ্যাসিড', enz: 'ফিউমারেজ (Fumarase)' },
    { step: 'ম্যালিক অ্যাসিড → অক্সালোঅ্যাসিটিক অ্যাসিড (OAA)', enz: 'ম্যালেট ডিহাইড্রোজিনেজ (৩য় NADH)' },
  ];
  krebsSteps.forEach((ks, i) => {
    const others = krebsSteps.filter((x) => x.enz !== ks.enz);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ক্রেবস চক্রে "${ks.step}" ধাপটি কোন এনজাইমের মাধ্যমে ঘটে?`,
        correct: ks.enz,
        distractors: others.slice(0, 4).map((x) => x.enz),
        explanation: `মাইটোকন্ড্রিয়ার ক্রেবস চক্রে ${ks.step} বিক্রিয়াটি ${ks.enz} দ্বারা অনুঘটিত হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ক্রেবস চক্র এনজাইম',
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
        question: `ক্রেবস চক্রের "${ks.enz}" এনজাইমের প্রধান কাজ কোনটি?`,
        correct: ks.step,
        distractors: others.slice(1, 5).map((x) => x.step),
        explanation: `${ks.enz} এনজাইমটি ${ks.step} রূপান্তর পরিচালনা করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · TCA চক্র',
      })
    );
  });

  // Medical High-Yield Additional Plant Diversity, Genetics & Cell Assertions (~180 MCQs)
  const extraBotanyBank: Array<{
    ch: string;
    vl: string;
    q: string;
    a: string;
    w: string[];
    exp: string;
  }> = [
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'কোষঝিল্লির ফ্লুইড মোজাইক মডেলে কোন উপাদানটি "আইসবার্গের সমুদ্রে" আইসবার্গের সাথে তুলনীয়?',
      a: 'ইন্টিগ্রাল বা ট্রান্সমেমব্রেন প্রোটিনসমূহ',
      w: ['ফসফোলিপিড অণুর ফ্যাটি অ্যাসিড লেজ', 'কোলেস্টেরল অণু', 'কার্বোহাইড্রেট গ্লাইকোপ্রোটিন শৃঙ্খল'],
      exp: 'সিঙ্গার ও নিকলসন (১৯৭২) মতে লিপিডের তরল সমুদ্রে প্রোটিনগুলো আইসবার্গের মতো ভেসে থাকে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'ক্লোরোপ্লাস্ট ও মাইটোকন্ড্রিয়াকে "এন্ডোসিম্বায়োন্ট" (অন্তঃমিথোজীবী) বলার প্রধান প্রমাণ কী?',
      a: 'উভয়ের নিজস্ব বৃত্তাকার DNA, ৭০S রাইবোজোম ও দ্বিস্তরী ঝিল্লি থাকা এবং দ্বি-বিভাজনে বংশবৃদ্ধি',
      w: ['কোষগহ্বরের ভেতরে অবস্থান করা', '৮০S রাইবোজোম ও হিস্টোনযুক্ত রৈখিক DNA থাকা', 'গলগি বডি থেকে উৎপত্তি হওয়া'],
      exp: 'লিন মারগুলিস-এর এন্ডোসিম্বায়োটিক তত্ত্ব অনুসারে আদিম প্রকৃতকোষ কর্তৃক ভক্ষিত প্রোক্যারিওট থেকেই এদের উদ্ভব।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'একটি সম্পূর্ণ ৮০S প্রকৃতকোষীয় রাইবোজোম কোন দুটি উপ-একক নিয়ে গঠিত?',
      a: '৬০S বড় উপ-একক ও ৪০S ছোট উপ-একক',
      w: ['৫০S বড় উপ-একক ও ৩০S ছোট উপ-একক', '৪০S বড় উপ-একক ও ৪০S ছোট উপ-একক', '৫০S বড় উপ-একক ও ৪০S ছোট উপ-একক'],
      exp: 'আদিকোষের ৭০S (৫০S+৩০S) এবং প্রকৃতকোষের ৮০S (৬০S+৪০S) রাইবোজোমের স্বেডবার্গ একক সরাসরি যোগ হয় না কারণ এটি আকৃতি ও ঘনত্বের ওপর নির্ভরশীল।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'ডিএনএ প্রতিলিপনের সময় দুটি সূত্রকের পাক খুলে হাইড্রোজেন বন্ধন ছিন্ন করে রেপ্লিকেশন ফর্ক তৈরি করে কোন এনজাইম?',
      a: 'DNA হেলিকেজ (Helicase)',
      w: ['DNA লাইগেজ', 'RNA প্রাইমেজ', 'টপোআইসোমারেজ-I'],
      exp: 'হেলিকেজ হাইড্রোজেন বন্ধন ভেঙে সূত্রক পৃথক করে, SSBP প্রোটিন সেগুলোকে পুনরায় জোড়া লাগা থেকে আটকায় ও গাইরেজ সুপারকয়েলিং দূর করে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'DNA পলিমারেজ-III কোন অভিমুখে নতুন নিউক্লিওটাইড যুক্ত করে শৃঙ্খল বর্ধিত করে?',
      a: 'কেবলমাত্র ৫′ → ৩′ অভিমুখে',
      w: ['কেবলমাত্র ৩′ → ৫′ অভিমুখে', 'উভয় দিক থেকেই ৫′ → ৩′ ও ৩′ → ৫′', 'কেবল ৩′ → ৩′ প্রান্তে'],
      exp: 'নতুন আগত dNTP অণু পূর্ববর্তী নিউক্লিওটাইডের মুক্ত ৩′-OH প্রান্তে যুক্ত হয় বলে সংশ্লেষণ সর্বদা ৫′→৩′ দিকে চলে।',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      q: 'জেনেটিক কোড "অপরিপূরণীয় নয় বা অবক্ষয়ী (Degenerate)" বলতে কী বোঝায়?',
      a: 'একটি অ্যামিনো অ্যাসিডের জন্য একাধিক (২ থেকে ৬টি) সমার্থক কোডন থাকতে পারা',
      w: ['একটি কোডন একাধিক ভিন্ন অ্যামিনো অ্যাসিড নির্দেশ করা', 'কোডনগুলোর মাঝে বিরামচিহ্ন থাকা', 'সব জীবের কোড ভিন্ন হওয়া'],
      exp: '৬১টি সেন্স কোডন মিলে ২০টি অ্যামিনো অ্যাসিড কোড করে, তাই ১৮টি অ্যামিনো অ্যাসিডের একাধিক কোডন রয়েছে।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'ক্যান্সার সৃষ্টির অন্যতম প্রধান জিনগত কারণ কী?',
      a: 'প্রোটো-অনকোজিনের মিউটেশনে অনকোজিনে রূপান্তর এবং টিউমার সাপ্রেসর জিন (p53) নিষ্ক্রিয় হওয়া',
      w: ['অ্যাপোপটোসিস অতিসক্রিয় হওয়া', 'কোষ চক্রের G₀ দশায় স্থায়ী হয়ে যাওয়া', 'S-দশায় DNA রেপ্লিকেশন বন্ধ হওয়া'],
      exp: 'p53 জিনকে "জিনোমের অভিভাবক" বলা হয়; এটি ক্ষতিগ্রস্ত DNA যুক্ত কোষকে G₁ দশায় থামায় বা অ্যাপোপটোসিস ঘটায়।',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      q: 'উদ্ভিদের কোন অংশে মায়োসিস কোষ বিভাজন পর্যবেক্ষণের জন্য সর্বাধিক ব্যবহৃত হয়?',
      a: 'কচি পুষ্পমুকুলের পরাগধানী (Anther) ও ডিম্বক',
      w: ['পেঁয়াজের মূল অগ্রভাগ (Root tip)', 'পরিপক্ব পাতার বহিঃত্বক', 'বয়স্ক কাণ্ডের মজ্জা'],
      exp: 'পেঁয়াজের মূলের অগ্রভাগ মাইটোসিস পর্যবেক্ষণের আদর্শ নমুনা, আর পরাগমাতৃকোষ মায়োসিস পর্যবেক্ষণের শ্রেষ্ঠ উৎস।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'অসম্পৃক্ত ফ্যাটি অ্যাসিড (যেমন ওলিক, লিনোলিক অ্যাসিড) সাধারণ তাপমাত্রায় কী অবস্থায় থাকে এবং এর গুরুত্ব কী?',
      a: 'তরল অবস্থায় (তেল) থাকে; কোষঝিল্লির তরলতা বাড়ায় ও হৃদ্‌স্বাস্থ্যের জন্য উপকারী',
      w: ['কঠিন অবস্থায় (চর্বি) থাকে', 'রক্তে LDL কোলেস্টেরল দ্রুত বৃদ্ধি করে', 'এতে কোনো দ্বিবন্ধন থাকে না'],
      exp: 'অসম্পৃক্ত ফ্যাটি অ্যাসিডে এক বা একাধিক C=C দ্বিবন্ধন থাকায় সিস-কিংক তৈরি হয়ে অণুগুলো ঘন সন্নিবেশিত হতে পারে না।',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      q: 'অ্যান্থোসায়ানিন নামক রঞ্জক পদার্থটি উদ্ভিদ কোষের কোথায় দ্রবীভূত অবস্থায় থাকে?',
      a: 'কোষগহ্বরের (Vacuole) কোষরসে পানিতে দ্রবীভূত অবস্থায়',
      w: ['ক্লোরোপ্লাস্টের থাইলাকয়েডে', 'মাইটোকন্ড্রিয়ার ক্রিস্টিতে', 'কোষপ্রাচীরের মধ্যপর্দায়'],
      exp: 'অ্যান্থোসায়ানিন pH-ভেদে লাল, বেগুনি বা নীল বর্ণ দেয় (প্লাস্টিডের ক্যারোটিনয়েড চর্বিতে দ্রবণীয়, অ্যান্থোসায়ানিন পানিতে দ্রবণীয়)।',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      q: 'T₂ ব্যাকটেরিওফাজের মস্তকে থাকা নিউক্লিক অ্যাসিডটির প্রকৃতি কীরূপ?',
      a: 'রৈখিক দ্বিসূত্রক DNA (প্রায় ১৫০টি জিনসমন্বিত)',
      w: ['বৃত্তাকার একসূত্রক RNA', 'দ্বিসূত্রক RNA', 'একসূত্রক DNA'],
      exp: 'TMV, ডেঙ্গু, HIV ও পোলিও হলো ssRNA ভাইরাস; T₂ ফাজ, ভ্যারিওলা ও হেপাটাইটিস-বি হলো DNA ভাইরাস।',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      q: 'ইন্টারফেরন (Interferon) কীভাবে ভাইরাস সংক্রমণ প্রতিরোধ করে?',
      a: 'ভাইরাস আক্রান্ত কোষ থেকে নিঃসৃত হয়ে পাশের সুস্থ কোষগুলোকে অ্যান্টিভাইরাল প্রোটিন তৈরির সংকেত দেয়',
      w: ['সরাসরি ভাইরাসের ডিএনএ ভক্ষণ করে', 'ব্যাকটেরিয়ার কোষপ্রাচীর গলিয়ে দেয়', 'রক্ততঞ্চন ত্বরান্বিত করে'],
      exp: 'আইস্যাকস ও লিন্ডেনম্যান (১৯৫৭) ইন্টারফেরন আবিষ্কার করেন; এটি প্রজাতি-নির্দিষ্ট কিন্তু ভাইরাস-নির্দিষ্ট নয়।',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      q: 'ম্যালেরিয়ার জীবাণু Plasmodium-এর জীবনচক্রে কোন পর্যায়টি মশাকে সংক্রমিত করে এবং কোনটি মানুষকে সংক্রমিত করে?',
      a: 'মশাকে গ্যামেটোসাইট এবং মানুষকে স্পোরোজয়েট সংক্রমিত করে',
      w: ['মশাকে স্পোরোজয়েট এবং মানুষকে গ্যামেটোসাইট', 'উভয়কেই মেরোজয়েট', 'মশাকে উকিনেট এবং মানুষকে ট্রফোজয়েট'],
      exp: 'স্ত্রী অ্যানোফিলিস মশার লালাগ্রন্থি থেকে কাস্তে-আকৃতির স্পোরোজয়েট মানুষে প্রবেশ করে; রক্ত পান করার সময় মশা মানুষের রক্ত থেকে গ্যামেটোসাইট গ্রহণ করে।',
    },
    {
      ch: 'bio1_ch5_lower_plants',
      vl: 'photosynthesis',
      q: 'ব্রায়োফাইটা ও টেরিডোফাইটার মধ্যে প্রধান জীবনচক্রগত পার্থক্য কী?',
      a: 'ব্রায়োফাইটায় হ্যাপ্লয়েড গ্যামিটোফাইট প্রধান ও স্বনির্ভর, আর টেরিডোফাইটায় ডিপ্লয়েড স্পোরোফাইট প্রধান ও স্বনির্ভর',
      w: ['ব্রায়োফাইটায় জাইলেম থাকে কিন্তু টেরিডোফাইটায় থাকে না', 'টেরিডোফাইটায় নিষেকে পানি লাগে না', 'ব্রায়োফাইটায় প্রকৃত মূল থাকে'],
      exp: 'টেরিডোফাইটায় গ্যামিটোফাইট (প্রোথ্যালাস) ও স্পোরোফাইট উভয়েই স্বভোজী ও স্বতন্ত্র, কিন্তু স্পোরোফাইট বৃহৎ ও দীর্ঘস্থায়ী।',
    },
    {
      ch: 'bio1_ch7_angiosperm',
      vl: 'photosynthesis',
      q: 'বাংলাদেশের প্রাকৃতিকভাবে জন্মানো একমাত্র নগ্নবীজী বনাঞ্চলীয় সাইকাস প্রজাতি এবং বিরল Podocarpus কোথায় বেশি দেখা যায়?',
      a: 'চট্টগ্রাম, পার্বত্য চট্টগ্রাম ও সিলেটের পাহাড়ি অঞ্চলে (যেমন Cycas pectinata)',
      w: ['সুন্দরবনের লোনাপানিতে', 'বরেন্দ্র অঞ্চলের সমতলে', 'সেন্টমার্টিনের প্রবাল দ্বীপে'],
      exp: 'বাংলাদেশে প্রাকৃতিকভাবে ৫ প্রজাতির নগ্নবীজী জন্মে: Cycas pectinata, Podocarpus neriifolius, Gnetum-এর প্রজাতি ইত্যাদি।',
    },
    {
      ch: 'bio1_ch8_tissue',
      vl: 'photosynthesis',
      q: 'দ্বিবীজপত্রী উদ্ভিদে বর্ষবলয় (Annual ring) সৃষ্টির প্রধান কারণ কী?',
      a: 'ঋতুভেদে বসন্তকাঠ (বৃহৎ গহ্বরযুক্ত ভেসেল) ও শরৎকাঠ (ক্ষুদ্র ও পুরু প্রাচীরযুক্ত ভেসেল)-এর পর্যায়ক্রমিক উৎপাদন',
      w: ['পাতার ঝরে পড়া ও কুঁড়ি গজানো', 'বাইরের কর্ক স্তরের পুরুত্ব', 'মূলরোমের সংখ্যা বৃদ্ধি'],
      exp: 'একটি বসন্তকাঠ ও একটি শরৎকাঠ বলয় মিলে ১টি বর্ষবলয় গঠন করে, যা গণনা করে (ডেনড্রোক্রোনোলজি) বৃক্ষের বয়স নির্ণয় করা হয়।',
    },
    {
      ch: 'bio1_ch9_physiology',
      vl: 'photosynthesis',
      q: 'সালোকসংশ্লেষণের "লুপ্তপ্রায় লাল" বা কমপেনসেশন পয়েন্ট (Light Compensation Point) বলতে কী বোঝায়?',
      a: 'আলোর যে তীব্রতায় সালোকসংশ্লেষণে CO₂ গ্রহণ ও শ্বসনে CO₂ ত্যাগের হার সমান হয়ে যায় (নিট গ্যাস বিনিময় শূন্য)',
      w: ['আলোর সর্বোচ্চ তীব্রতায় পাতা পুড়ে যাওয়া', 'কেবল রাতের বেলা পত্ররন্ধ্র খোলা থাকা', 'অক্সিজেন উৎপাদন সর্বোচ্চ হওয়া'],
      exp: 'ছায়াপ্রিয় (Sciophyte) উদ্ভিদে কমপেনসেশন পয়েন্ট আলোকপ্রিয় (Heliophyte) উদ্ভিদের চেয়ে অনেক কম থাকে।',
    },
    {
      ch: 'bio1_ch10_repro_biotech',
      vl: 'mitosis_cell',
      q: 'DNA ফিঙ্গারপ্রিন্টিংয়ে প্রতিটি ব্যক্তির স্বতন্ত্র জেনেটিক প্রোফাইল তৈরির ভিত্তি কী?',
      a: 'নন-কোডিং DNA অংশের VNTR (Variable Number Tandem Repeats) ও STR-এর দৈর্ঘ্যের বহুরূপিতা',
      w: ['হিমোগ্লোবিনের জিন বিন্যাস', 'মাইটোকন্ড্রিয়ার আকার', 'রাইবোজোমের সংখ্যা'],
      exp: 'অ্যালেক জেফ্রিজ (১৯৮৪) আবিষ্কৃত এ পদ্ধতি পিতৃত্ব নির্ণয় ও ফরেনসিক অপরাধী শনাক্তকরণে ব্যবহৃত হয়।',
    },
  ];

  extraBotanyBank.forEach((eb, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: eb.ch,
        visualLessonId: eb.vl,
        hscLevel: '11',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: eb.q,
        correct: eb.a,
        distractors: eb.w,
        explanation: eb.exp,
        reference: 'জীববিজ্ঞান ১ম পত্র · সমন্বিত ব্যাংক',
      })
    );
  });

  // =========================================================================
  // SECTION 6: Additional High-Volume Combinatorial Matrix Across All 9 Chapters (~280 MCQs)
  // =========================================================================
  // Microorganisms Diseases + Vector/Transmission Mode + Control (48 MCQs)
  const humanPlantBio1Diseases = [
    { name: 'ম্যালেরিয়া', agent: 'Plasmodium প্রজাতি (প্রোটোজোয়া)', vector: 'স্ত্রী Anopheles মশা', drug: 'ক্লোরোকুইন, আর্টেমিসিনিন ও প্রাইমাকুইন' },
    { name: 'ডেঙ্গু জ্বর', agent: 'ফ্ল্যাভিভাইরাস (DENV 1–4, ssRNA)', vector: 'স্ত্রী Aedes aegypti ও A. albopictus', drug: 'সাপোর্টিভ তরল চিকিৎসা (কোনো নির্দিষ্ট অ্যান্টিভাইরাল নেই)' },
    { name: 'কলেরা (ওলাউঠা)', agent: 'Vibrio cholerae (কমা-আকৃতির গ্রাম-নেগেটিভ)', vector: 'দূষিত পানি ও খাদ্য', drug: 'ওরাল স্যালাইন (ORS) ও ডক্সিসাইক্লিন/অ্যাজিথ্রোমাইসিন' },
    { name: 'হেপাটাইটিস-বি', agent: 'HBV (দ্বিসূত্রক DNA ভাইরাস)', vector: 'রক্ত, সূচ, যৌনসংস্পর্শ ও মা-থেকে-শিশু', drug: 'রিকম্বিন্যান্ট Engerix-B টিকা ও টেনোফোভির' },
    { name: 'এইডস (AIDS)', agent: 'HIV (রিভার্স ট্রান্সক্রিপ্টেজযুক্ত রেট্রোভাইরাস)', vector: 'অসুরক্ষিত রক্ত, সিরিঞ্জ ও সংক্রমিত প্রজনন তরল', drug: 'অ্যান্টি-রেট্রোভাইরাল থেরাপি (ART — জিডোভুডিন)' },
    { name: 'ব্লাস্ট রোগ (ধান)', agent: 'Magnaporthe oryzae / Pyricularia oryzae (ছত্রাক)', vector: 'বায়ুবাহিত কনিডিয়া স্পোর', drug: 'ট্রাইসাইক্লাজল ছত্রাকনাশক ও প্রতিরোধী জাত' },
    { name: 'আলুর লেট ব্লাইট', agent: 'Phytophthora infestans (উমাইসিটিস)', vector: 'শীতল আর্দ্র বায়ু ও আক্রান্ত বীজ আলু', drug: 'বোর্দো মিক্সচার (CuSO₄ + চুন) ও ম্যানকোজেব' },
    { name: 'দাদ রোগ (Ringworm)', agent: 'Trichophyton, Microsporum ও Epidermophyton (ছত্রাক)', vector: 'সংক্রমিত চামড়া, তোয়ালে ও মাটি', drug: 'গ্রাইসিওফুলভিন ও ক্লোট্রাইমাজল' },
    { name: 'পেঁপের রিংস্পট রোগ', agent: 'পাপায়া রিংস্পট ভাইরাস (PRSV)', vector: 'জাবপোকা (Aphid) কীট', drug: 'PRSV কোট-প্রোটিন জিনযুক্ত ট্রান্সজেনিক পেঁপে' },
    { name: 'ধানের টুংরো রোগ', agent: 'RTBV (dsDNA) ও RTSV (ssRNA) ভাইরাসদ্বয়', vector: 'সবুজ পাতা ফড়িং (Nephotettix virescens)', drug: 'রোগাক্রান্ত চারা অপসারণ ও ফড়িং দমন' },
  ];
  humanPlantBio1Diseases.forEach((hd, i) => {
    const others = humanPlantBio1Diseases.filter((x) => x.name !== hd.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: i < 5 || i === 9 ? 'bio1_ch4_microbe' : 'bio1_ch5_lower_plants',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${hd.name}" রোগটির প্রধান জীবাণু কোনটি?`,
        correct: hd.agent,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.agent),
        explanation: `${hd.name} রোগটি ${hd.agent} দ্বারা সৃষ্ট, যা ${hd.vector}-এর মাধ্যমে ছড়ায়। প্রতিরোধ/চিকিৎসা: ${hd.drug}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪–৫ · অণুজীবজনিত রোগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: i < 5 || i === 9 ? 'bio1_ch4_microbe' : 'bio1_ch5_lower_plants',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${hd.name}" রোগটি প্রধানত কোন বাহক বা মাধ্যমে সংক্রমিত হয়?`,
        correct: hd.vector,
        distractors: others.slice((i + 2) % 5, ((i + 2) % 5) + 4).map((x) => x.vector),
        explanation: `${hd.name} (${hd.agent}) মূলত ${hd.vector} দ্বারা বিস্তার লাভ করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪–৫ · রোগ বিস্তার ও বাহক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: i < 5 || i === 9 ? 'bio1_ch4_microbe' : 'bio1_ch5_lower_plants',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${hd.name}" রোগের প্রতিকার বা প্রতিরোধে নিচের কোনটি সর্বাধিক প্রাসঙ্গিক?`,
        correct: hd.drug,
        distractors: others.slice((i + 3) % 5, ((i + 3) % 5) + 4).map((x) => x.drug),
        explanation: `${hd.name} নিয়ন্ত্রণে ${hd.drug} ব্যবহার করা হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪–৫ · রোগ প্রতিরোধ',
      })
    );
  });

  // Cellular Organelles Double vs Single vs Non-membranous & Functions (48 MCQs)
  const organelleMembraneList = [
    { org: 'নিউক্লিয়াস', mem: 'ছিদ্রযুক্ত দ্বি-স্তরবিশিষ্ট ফসফোলিপিড ঝিল্লি', ch: 'bio1_ch1_cell', extra: 'জিনোমিক DNA ধারণ ও সকল জৈবিক কাজের নিয়ন্ত্রণকেন্দ্র' },
    { org: 'মাইটোকন্ড্রিয়া', mem: 'পোরিনযুক্ত মসৃণ বহিঃঝিল্লি ও ক্রিস্টি-ভুক্ত অন্তঃঝিল্লি (দ্বি-স্তরী)', ch: 'bio1_ch1_cell', extra: 'অক্সিডেটিভ ফসফোরাইলেশন ও ক্রেবস চক্রের মাধ্যমে ATP তৈরি' },
    { org: 'ক্লোরোপ্লাস্ট', mem: 'দ্বি-স্তরী আবরণী ও অভ্যন্তরীণ থাইলাকয়েড-গ্রানা তন্ত্র', ch: 'bio1_ch1_cell', extra: 'আলোক শক্তি দিয়ে কার্বোহাইড্রেট খাদ্য সংশ্লেষ' },
    { org: 'গলগি বডি (ডিকটিওজোম)', mem: 'একক ঝিল্লিবেষ্টিত সিস্টারনি, ভেসিকল ও ভ্যাকুওল', ch: 'bio1_ch1_cell', extra: 'কোষপ্লেট, অ্যাক্রোজোম ও লাইসোজোম গঠন এবং ক্ষরণ নিয়ন্ত্রণ' },
    { org: 'লাইসোজোম', mem: 'হজমকারী এনজাইম থেকে কোষকে রক্ষাকারী বিশেষ গ্লাইকোসাইলেটেড একক ঝিল্লি', ch: 'bio1_ch1_cell', extra: 'অন্তঃকোষীয় পরিপাক, অটোফ্যাজি ও অটোলাইসিস' },
    { org: 'পারঅক্সিসোম', mem: 'একক লিপিড দ্বিস্তর ঝিল্লি', ch: 'bio1_ch1_cell', extra: 'H₂O₂ বিষনাশন ও C₃ উদ্ভিদে ফটোরেসপিরেশন' },
    { org: 'গ্লাইঅক্সিসোম', mem: 'একক ঝিল্লি', ch: 'bio1_ch1_cell', extra: 'তৈলবীজের অঙ্কুরোদগমে চর্বি থেকে শর্করা রূপান্তর' },
    { org: 'রাইবোজোম', mem: 'আবরণীবিহীন (কোনো ঝিল্লি নেই)', ch: 'bio1_ch1_cell', extra: 'mRNA-এর নির্দেশনা অনুযায়ী অ্যামিনো অ্যাসিড যুক্ত করে প্রোটিন তৈরি' },
    { org: 'সেন্ট্রিওল', mem: 'আবরণীবিহীন (৯+০ মাইক্রোটিউবিউল)', ch: 'bio1_ch1_cell', extra: 'প্রাণিকোষে অ্যাস্টার রশ্মি-স্পিন্ডল তন্তু ও সিলিয়া-ফ্ল্যাজেলার ব্যাসাল বডি গঠন' },
    { org: 'সাইটোস্কেলেটন (মাইক্রোটিউবিউল)', mem: 'আবরণীবিহীন টিউবুলিন প্রোটিন নালিকা', ch: 'bio1_ch1_cell', extra: 'কোষের আকৃতি, অঙ্গাণু পরিবহন ও স্পিন্ডল যন্ত্র গঠন' },
    { org: 'নিউক্লিওলাস', mem: 'আবরণীবিহীন ঘন কণিকাময় অঞ্চল', ch: 'bio1_ch1_cell', extra: 'rRNA সংশ্লেষ ও রাইবোজোমের উপ-একক সমাহার' },
    { org: 'কোষগহ্বর (টোনোপ্লাস্ট)', mem: 'টোনোপ্লাস্ট নামক একক নির্বাচনী ভেদ্য ঝিল্লি', ch: 'bio1_ch1_cell', extra: 'রসস্ফীতি বজায় রাখা ও অ্যান্থোসায়ানিন সঞ্চয়' },
  ];
  organelleMembraneList.forEach((om, i) => {
    const others = organelleMembraneList.filter((x) => x.org !== om.org);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: om.ch,
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `কোষীয় অঙ্গাণু "${om.org}"-এর ঝিল্লি বা আবরণীর প্রকৃতি কীরূপ?`,
        correct: om.mem,
        distractors: others.filter((x) => x.mem !== om.mem).slice(0, 4).map((x) => x.mem),
        explanation: `${om.org}-এ ${om.mem} থাকে এবং এর মূল কাজ: ${om.extra}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষীয় অঙ্গাণুর ঝিল্লি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: om.ch,
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'dental',
        question: `নিচের কোন কোষীয় কাঠামোর মূল শারীরবৃত্তীয় কাজ হলো "${om.extra}"?`,
        correct: om.org,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.org),
        explanation: `${om.org} (${om.mem}) কোষে "${om.extra}" দায়িত্ব পালন করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষীয় অঙ্গাণুর কাজ',
      })
    );
  });

  // DNA Base-Pair Mass / Molecular Weight & Peptide Bond Drills (~40 MCQs)
  const bpCounts = [50, 100, 150, 200, 300, 400, 500, 600, 750, 1000];
  bpCounts.forEach((bp, i) => {
    const totalNuc = bp * 2;
    const turns = Number((bp / 10).toFixed(1));
    const lenNm = Number((bp * 0.34).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি দ্বিসূত্রক B-DNA খণ্ডের দৈর্ঘ্য ${toBnDigits(lenNm)} nm হলে এতে মোট কতটি নিউক্লিওটাইড (উভয় সূত্রকে মিলিয়ে) এবং কতটি পূর্ণ ঘূর্ণন রয়েছে?`,
        correct: `${toBnDigits(totalNuc)}টি নিউক্লিওটাইড ও ${toBnDigits(turns)}টি ঘূর্ণন`,
        distractors: [
          `${toBnDigits(bp)}টি নিউক্লিওটাইড ও ${toBnDigits(turns)}টি ঘূর্ণন`,
          `${toBnDigits(totalNuc)}টি নিউক্লিওটাইড ও ${toBnDigits(turns * 2)}টি ঘূর্ণন`,
          `${toBnDigits(totalNuc * 2)}টি নিউক্লিওটাইড ও ${toBnDigits(turns / 2)}টি ঘূর্ণন`,
        ],
        explanation: `প্রতি বেসপেয়ারের দূরত্ব ০.৩৪ nm। তাই বেসপেয়ার = ${toBnDigits(lenNm)} / ০.৩৪ = ${toBnDigits(bp)}টি, মোট নিউক্লিওটাইড = ২ × ${toBnDigits(bp)} = ${toBnDigits(totalNuc)}টি এবং ঘূর্ণন = ${toBnDigits(bp)} / ১০ = ${toBnDigits(turns)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · B-DNA গাণিতিক সমস্যা',
      })
    );
  });

  // Historical Scientists in Botany (25 pairs × 2 = 50 MCQs)
  const botanyScientists = [
    { person: 'রবার্ট হুক (১৬৬৫)', feat: 'করকের প্রস্থচ্ছেদে মৃত কোষপ্রাচীর দেখে Micrographia গ্রন্থে প্রথম Cell নামকরণ করেন' },
    { person: 'অ্যান্টনি ভন লিউয়েনহুক (১৬৭৪)', feat: 'এক-লেন্স অণুবীক্ষণ যন্ত্রে সর্বপ্রথম সজীব কোষ, ব্যাকটেরিয়া ও প্রোটোজোয়া পর্যবেক্ষণ করেন' },
    { person: 'ম্যাথিয়াস শ্লেইডেন ও থিওডোর সোয়ান (১৮৩৮–৩৯)', feat: 'সকল জীব কোষ দ্বারা গঠিত — কোষ তত্ত্ব (Cell Theory) প্রস্তাব করেন' },
    { person: 'রুডলফ ভিরখো (১৮৫৫)', feat: 'Omnis cellula e cellula — পূর্ববর্তী কোষ থেকেই নতুন কোষের উৎপত্তি তত্ত্ব যোগ করেন' },
    { person: 'ওয়াল্টার ফ্লেমিং (১৮৮২)', feat: 'প্রাণিকোষে মাইটোসিস কোষ বিভাজন ও ক্রোমাটিন পর্যবেক্ষণ এবং Mitosis নামকরণ করেন' },
    { person: 'ফার্মার ও মুর (১৯০৫)', feat: 'হ্রাসমূলক কোষ বিভাজনের নামকরণ করেন Meiosis' },
    { person: 'ওয়াল্ডেয়ার (১৮৮৮)', feat: 'রঞ্জক ধারণক্ষমতার ভিত্তিতে ক্রোমোজোম (Chromosome) নামকরণ করেন' },
    { person: 'ফ্রেডরিখ মেশার (১৮৬৯)', feat: 'ক্ষতস্থানের পুঁজের কোষের নিউক্লিয়াস থেকে সর্বপ্রথম নিউক্লিন (নিউক্লিক অ্যাসিড) পৃথক করেন' },
    { person: 'কর্ণবার্গ (১৯৫৬)', feat: 'ইন-ভিট্রো পদ্ধতিতে ব্যাকটেরিয়া থেকে DNA পলিমারেজ-I আবিষ্কার ও DNA সংশ্লেষ করেন' },
    { person: 'হরগোবিন্দ খোরানা, নিরেনবার্গ ও হলি (১৯৬৮)', feat: 'জেনেটিক কোডের পাঠোদ্ধার ও প্রোটিন সংশ্লেষে তার ভূমিকা ব্যাখ্যা করে নোবেল পান' },
    { person: 'রনাল্ড রস (১৮৯৭)', feat: 'স্ত্রী অ্যানোফিলিস মশার পাকস্থলিতে ম্যালেরিয়ার পরজীবীর উওসিস্ট আবিষ্কার করে প্রমাণ করেন মশাই বাহক' },
    { person: 'চার্লস ল্যাভেরান (১৮৮০)', feat: 'ম্যালেরিয়া রোগীর লোহিত রক্তকণিকায় সর্বপ্রথম Plasmodium পরজীবী শনাক্ত করেন' },
    { person: 'টি. ও. ডিনার (১৯৭১)', feat: 'প্রোটিন আবরণীবিহীন ক্ষুদ্র সংক্রামক RNA কণা "ভিরয়েড" আবিষ্কার করেন' },
    { person: 'জর্জ বেন্থাম ও জোসেফ হুকার', feat: 'Genera Plantarum গ্রন্থে সপুষ্পক উদ্ভিদের সর্বাধিক গ্রহণযোগ্য প্রাকৃতিক শ্রেণিবিন্যাস প্রকাশ করেন' },
    { person: 'আর. এইচ. হুইটেকার (১৯৬৯)', feat: 'জীবজগতের ৫-রাজ্য (Monera, Protista, Fungi, Plantae, Animalia) শ্রেণিবিন্যাস প্রদান করেন' },
    { person: 'স্টিফেন হেলস', feat: 'উদ্ভিদ শারীরতত্ত্বের জনক এবং মূলজ চাপ ও প্রস্বেদন নিয়ে প্রথম পরীক্ষা করেন' },
    { person: 'এফ. ডব্লিউ. ভেন্ট (১৯২৮)', feat: 'জই (Avena) অঙ্কুরোদ্গমে কোলিওপ্টাইল পরীক্ষায় অক্সিন হরমোনের অস্তিত্ব প্রমাণ করেন' },
    { person: 'রবিন হিল (১৯৩৭)', feat: 'হিল বিক্রিয়ায় প্রমাণ করেন ক্লোরোপ্লাস্ট বিচ্ছিন্ন অবস্থায় CO₂ ছাড়াই কেবল আলো ও পানিতে O₂ মুক্ত করে' },
    { person: 'পল বার্গ (১৯৭২)', feat: 'প্রথম রিকম্বিন্যান্ট DNA অণু তৈরি করেন (জিন প্রকৌশলের জনক)' },
    { person: 'অ্যালেক জেফ্রিজ (১৯৮৪)', feat: 'DNA ফিঙ্গারপ্রিন্টিং বা জেনেটিক প্রোফাইলিং পদ্ধতি আবিষ্কার করেন' },
  ];
  botanyScientists.forEach((bs, i) => {
    const others = botanyScientists.filter((x) => x.person !== bs.person);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: i < 10 ? 'bio1_ch1_cell' : i < 13 ? 'bio1_ch4_microbe' : i < 15 ? 'bio1_ch7_angiosperm' : i < 18 ? 'bio1_ch9_physiology' : 'bio1_ch10_repro_biotech',
        visualLessonId: i < 13 || i >= 18 ? 'mitosis_cell' : 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `উদ্ভিদবিজ্ঞানের ইতিহাসে কে "${bs.feat}"?`,
        correct: bs.person,
        distractors: others.slice(i % 10, (i % 10) + 4).map((x) => x.person),
        explanation: `${bs.person} ${bs.feat}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · ঐতিহাসিক আবিষ্কার ও বিজ্ঞানী',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: i < 10 ? 'bio1_ch1_cell' : i < 13 ? 'bio1_ch4_microbe' : i < 15 ? 'bio1_ch7_angiosperm' : i < 18 ? 'bio1_ch9_physiology' : 'bio1_ch10_repro_biotech',
        visualLessonId: i < 13 || i >= 18 ? 'mitosis_cell' : 'photosynthesis',
        hscLevel: '11',
        difficulty: 'dental',
        question: `বিজ্ঞানী ${bs.person} জীববিজ্ঞানের কোন মৌলিক আবিষ্কারের জন্য প্রসিদ্ধ?`,
        correct: bs.feat,
        distractors: others.slice((i + 4) % 10, ((i + 4) % 10) + 4).map((x) => x.feat),
        explanation: `${bs.person}-এর অমর কীর্তি হলো তিনি ${bs.feat}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · বিজ্ঞানীদের অবদান',
      })
    );
  });

  return list;
}
