import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio1SynthRow {
  ch:
    | 'bio1_ch1_cell'
    | 'bio1_ch2_division'
    | 'bio1_ch3_cell_chem'
    | 'bio1_ch4_microbe'
    | 'bio1_ch5_algae_fungi'
    | 'bio1_ch6_bryo_pterido'
    | 'bio1_ch12_environment';
  vl: string;
  cat: string;
  term: string;
  def: string;
  examNote: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio1StructuredL(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_sl_${String(seq++).padStart(4, '0')}`;

  // 1. Deep Chapter 12 (Environment, Distribution & Conservation) + Under-represented Ch 5 & 6 + High-Yield Ch 1-4 Pearls
  // 80 × 4 = 320 unique MCQs
  const rows: Bio1SynthRow[] = [
    // --- Chapter 12: Environment, Distribution & Conservation (26 entries = 104 MCQs) ---
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'লিন্ডেম্যানের ১০ শতাংশ শক্তির সূত্র (Lindemann 10% Law, ১৯৪২)',
      def: 'বাস্তুতন্ত্রে একটি পুষ্টিস্তর (Trophic level) থেকে পরবর্তী উচ্চতর পুষ্টিস্তরে মাত্র প্রায় ১০% শক্তি স্থানান্তরিত হয়, বাকি ৯০% শ্বসন ও তাপে ব্যয় হয়',
      examNote: 'শক্তির পিরামিড সর্বদা খাড়া (Upright) হয় — কখনো উল্টানো হতে পারে না',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'শক্তির পিরামিড বনাম জীবভরের (Biomass) উল্টানো পিরামিড',
      def: 'সামুদ্রিক ও পুকুর বাস্তুতন্ত্রে ক্ষুদ্র ফাইটোপ্ল্যাংকটনের মোট ভর মাছের (খাদকের) চেয়ে কম হওয়ায় জীবভরের পিরামিড উল্টানো (Inverted) হতে পারে',
      examNote: 'একটি বড় বৃক্ষের বাস্তুতন্ত্রে পরজীবী খাদ্যশৃঙ্খলে সংখ্যার পিরামিডও উল্টানো হতে পারে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'গ্রেজিং (Grazing) বনাম ডেট্রিটাস (Detritus) খাদ্যশৃঙ্খল',
      def: 'সবুজ উৎপাদক থেকে শুরু হয়ে তৃণভোজী হয়ে মাংসাশীতে যাওয়া হলো গ্রেজিং; আর মৃত জৈব পদার্থ (ডেট্রিটাস) থেকে পচনকারী ও ডেট্রিটিভোর দিয়ে শুরু হলো ডেট্রিটাস শৃঙ্খল',
      examNote: 'স্থলজ বাস্তুতন্ত্রে শক্তির একটি বড় অংশ ডেট্রিটাস খাদ্যশৃঙ্খলের মধ্য দিয়ে প্রবাহিত হয়',
      diff: 'board',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'হাইড্রোসিয়ার (Hydrosere) — জলাশয় থেকে বনভূমি পর্যায়ক্রম',
      def: 'ফাইটোপ্ল্যাংকটন (অগ্রণী বা Pioneer সম্প্রদায়) → নিমজ্জিত জলজ → ভাসমান পাতাযুক্ত → রিড-সোয়াম্প (নলখাগড়া) → সেজ-মিডো → গুল্ম → চূড়ান্ত ক্লাইম্যাক্স বনভূমি',
      examNote: 'শিলার উপর শুষ্ক জেরোসিয়ারে (Xerosere) অগ্রণী সম্প্রদায় (Pioneer species) হলো ক্রাসটোজ লাইকেন (Crustose lichen)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'প্রাথমিক (Primary) বনাম গৌণ (Secondary) বাস্তুতান্ত্রিক পর্যায়ক্রম',
      def: 'আগে কখনো প্রাণ ছিল না এমন নগ্ন শিলা বা লাভা ভূমিতে শুরু হলে প্রাথমিক পর্যায়ক্রম; আর দাবানল বা ঝড়ে ধ্বংসপ্রাপ্ত উর্বর বনে দ্রুত পুনর্গঠন হলো গৌণ পর্যায়ক্রম',
      examNote: 'আগে থেকেই মাটি ও বীজ-অণুজীব থাকায় গৌণ পর্যায়ক্রম অনেক কম সময়ে ক্লাইম্যাক্সে পৌঁছায়',
      diff: 'board',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'mangrove',
      term: 'সুন্দরবন ম্যানগ্রোভ বনাঞ্চলের প্রধান বৃক্ষরাজি (UNESCO বিশ্ব ঐতিহ্য)',
      def: 'সুন্দরী (Heritiera fomes), গেওয়া (Excoecaria agallocha), গরান (Ceriops decandra), কেওড়া (Sonneratia apetala), পশুর ও গোলপাতা (Nypa fruticans)',
      examNote: 'পৃথিবীর বৃহত্তম একক ম্যানগ্রোভ বন সুন্দরবনের বাংলাদেশ অংশে প্রায় ৬০% অবস্থান করছে (রামসার সাইট ও UNESCO সাইট ১৯৯৭)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'mangrove',
      term: 'ম্যানগ্রোভ উদ্ভিদের লবণাক্ততা সহনশীল শারীরবৃত্তীয় অভিযোজন',
      def: 'নিউম্যাটোফোর (শ্বাসমূল), জরায়ুজ অঙ্কুরোদগম (Vivipary), পুরু কিউটিকলযুক্ত রসালো পাতা এবং কোষরসের উচ্চ অভিস্রবণীয় চাপ ও লবণ গ্রন্থি',
      examNote: 'রাইজোফোরা (Rhizophora) ও সেরিওপস-এ বায়বীয় ঠেসমূল (Stilt root) জলোচ্ছ্বাসে গাছকে স্থির রাখে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'mangrove',
      term: 'জলজ উদ্ভিদের (Hydrophyte) অঙ্গসংস্থানিক অভিযোজন',
      def: 'অ্যারেনকাইমা (বায়ুকুঠুরি) টিস্যুযুক্ত স্পঞ্জি কাণ্ড, কিউটিকল ও যান্ত্রিক দৃঢ়কলা (স্ক্লেরেনকাইমা) হ্রাস, মূলত্র-র বদলে মূলপকেট (Root pocket — Pistia, Eichhornia)',
      examNote: 'কচুরিপানা ও টোপাপানার মূলে মূলত্রের বদলে ভারসাম্যরক্ষী মূলপকেট ও স্ফীত বায়বীয় বৃন্ত থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'mangrove',
      term: 'মরু উদ্ভিদের (Xerophyte) শুষ্কতা প্রতিরোধী অভিযোজন',
      def: 'নিমজ্জিত পত্ররন্ধ্র (Sunken stomata), পাতা কাঁটায় রূপান্তর, বহুস্তরী ত্বক, পুরু মোমযুক্ত কিউটিকল ও কোষে প্রচুর মিউসিলেজ (অ্যালো, ফণিমনসা, করবী)',
      examNote: 'শিকড় অত্যন্ত গভীর (ফ্রিয়াটোফাইট) অথবা পৃষ্ঠতলে বিস্তৃত হয়ে সামান্য শিশির ও বৃষ্টির পানি দ্রুত শোষণ করে',
      diff: 'board',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'conservation',
      term: 'বাংলাদেশের এন্ডেমিক (Endemic) ও বিলুপ্তপ্রায় উদ্ভিদ প্রজাতি',
      def: 'তালি পাম (Corypha taliera) প্রকৃতি থেকে প্রায় বিলুপ্ত (ঢাকা বিশ্ববিদ্যালয়ে শেষ বন্য নমুনা); লিচু-সদৃশ বাঙ্গি/রোটাং, Knema bengalensis ও Mantisia spathulata এন্ডেমিক',
      examNote: 'কোনো নির্দিষ্ট ভৌগোলিক অঞ্চলে প্রাকৃতিকভাবে সীমাবদ্ধ অন্য কোথাও অপ্রাপ্ত প্রজাতিকে এন্ডেমিক প্রজাতি বলে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'conservation',
      term: 'IUCN রেড ডাটা বুক (Red Data Book) শ্রেণিবিন্যাস',
      def: 'বিলুপ্ত (EX), বন্য পরিবেশে বিলুপ্ত (EW), মহাবিপন্ন (CR), বিপন্ন (EN), সংকটাপন্ন (VU), বিপদগ্রস্তপ্রায় (NT) ও ন্যূনতম বিপদগ্রস্ত (LC)',
      examNote: 'IUCN-এর সদর দপ্তর সুইজারল্যান্ডের গ্ল্যান্ডে অবস্থিত; গোলাপি পৃষ্ঠা সংকটাপন্ন প্রজাতি নির্দেশ করে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'conservation',
      term: 'ইন-সিটু (In-situ) সংরক্ষণ বনাম এক্স-সিটু (Ex-situ) সংরক্ষণ',
      def: 'প্রাকৃতিক আবাসে সংরক্ষণ: জাতীয় উদ্যান (ভাওয়াল, মধুপুর, লাউয়াছড়া), বন্যপ্রাণী অভয়ারণ্য, ইকোপার্ক, রামসার ও সাফারি পার্ক; বাইরে সংরক্ষণ: বোটানিক্যাল গার্ডেন, সিড ব্যাংক, ক্রায়োসংরক্ষণ',
      examNote: 'বাংলাদেশে রামসার কনভেনশনের অধীন দুটি আন্তর্জাতিক জলাভূমি হলো সুন্দরবন ও টাঙ্গুয়ার হাওর (সুনামগঞ্জ)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'conservation',
      term: 'ক্রায়োপ্রিজারভেশন (Cryopreservation) তাপমাত্রা ও ক্রায়োপ্রোটেক্ট্যান্ট',
      def: '−১৯৬°C তাপমাত্রায় তরল নাইট্রোজেনে (Liquid N₂) বীজ, পরাগরেণু, ভ্রূণ বা মেরিস্টেম অনির্দিষ্টকাল জীবন্ত সংরক্ষণ',
      examNote: 'কোষের ভেতরে বরফ স্ফটিক তৈরি ঠেকাতে DMSO (ডাইমিথাইল সালফক্সাইড) ও গ্লিসারল ক্রায়োপ্রোটেক্ট্যান্ট রূপে ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'conservation',
      term: 'বায়োম (Biome) বনাম বায়োস্ফিয়ার রিজার্ভ ও হটস্পট (Hotspot)',
      def: 'নরম্যান মায়ার্স প্রবর্তিত "বায়োডাইভার্সিটি হটস্পট" হলো উচ্চ এন্ডেমিক প্রজাতি ও >=৭০% আবাসস্থল হারানো অঞ্চল (বাংলাদেশের সিলেট-চট্টগ্রাম অংশ ইন্দো-বার্মা হটস্পটে পড়ে)',
      examNote: 'বাংলাদেশের প্রথম শালবন জাতীয় উদ্যান মধুপুর (টাঙ্গাইল) ও কাপ্তাই-লাউয়াছড়া রেইনফরেস্ট জীববৈচিত্র্যে সর্বাধিক সমৃদ্ধ',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'ফ্লোরা (Flora) ও ফনা (Fauna) এবং ওরিয়েন্টাল (Oriental) প্রাণীভৌগোলিক অঞ্চল',
      def: 'কোনো অঞ্চলের উদ্ভিদসমষ্টিকে ফ্লোরা ও প্রাণিসমষ্টিকে ফনা বলে; বাংলাদেশ এশীয় ওরিয়েন্টাল (ইন্দো-মালয়) প্রাণীভৌগোলিক অঞ্চলের অন্তর্গত',
      examNote: 'প্লীস্টোসিন ওয়ালেস রেখা (Wallace Line) ওরিয়েন্টাল ও অস্ট্রেলিয়ান অঞ্চলকে পৃথক করেছে',
      diff: 'board',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'পার্টিকেল, গ্রিনহাউস গ্যাস ও ইউট্রোফিকেশন (Eutrophication)',
      def: 'জলাশয়ে নাইট্রেট ও ফসফেট সার মিশে শৈবাল ব্লুম তৈরি ও দ্রবীভূত অক্সিজেন (DO) কমে জলজ প্রাণীর মৃত্যু হলো ইউট্রোফিকেশন',
      examNote: 'পানিতে জৈব দূষণের মাত্রা বাড়লে BOD (Biochemical Oxygen Demand) দ্রুত বৃদ্ধি পায়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'conservation',
      term: 'বাংলাদেশের প্রধান বোটানিক্যাল গার্ডেন ও জিন ব্যাংক',
      def: 'ন্যাশনাল বোটানিক্যাল গার্ডেন (মিরপুর, ঢাকা), বলধা গার্ডেন (ওয়ারী), সীতাকুণ্ড বোটানিক্যাল গার্ডেন ও বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI) জিন ব্যাংক',
      examNote: 'গাজীপুরে অবস্থিত BRRI জিন ব্যাংকে প্রায় ৮,০০০+ দেশি-বিদেশি ধানের জার্মপ্লাজম সংরক্ষিত আছে',
      diff: 'board',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'জৈবিক বিবর্ধন (Biomagnification) — DDT ও পারদ',
      def: 'পানিতে অদ্রবণীয় ও চর্বি-দ্রবণীয় কীটনাশক (DDT) বা মিথাইল মারকারি খাদ্যশৃঙ্খলের প্রতিটি উচ্চস্তরে ঘনত্ব বেড়ে শীর্ষ খাদকে মারাত্মক বিষক্রিয়া ঘটানো',
      examNote: 'DDT প্রভাবে মাছ-শিকারী পাখির (ঈগল, বাজপাখি) ডিমের খোলস পাতলা হয়ে ভেঙে প্রজনন ব্যাহত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'মাইকোরাইজা বনাম নাইট্রোজেন সংবন্ধনকারী রুট নডিউল মিথোজীবিতা',
      def: 'পাইন/অর্কিড মূলের সাথে ছত্রাকের মিথোজীবিতা ফসফরাস-পানি শোষণ বাড়ায় (মাইকোরাইজা); আর শিম-মটর মূলে Rhizobium ব্যাকটেরিয়া বায়ুর N₂ সংবন্ধন করে',
      examNote: 'রুট নডিউলে অবস্থিত অক্সিজেন-শোষক লাল রঞ্জক লেগহিমোগ্লোবিন (Leghemoglobin) নাইট্রোজিনেজ এনজাইমকে O₂-এর বিষক্রিয়া থেকে বাঁচায়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch12_environment',
      vl: 'photosynthesis',
      cat: 'ecology',
      term: 'হাইপারঅ্যাকুমুলেটর উদ্ভিদ ও ফাইটোরিমিডিয়েশন',
      def: 'শিল্পবর্জ্যযুক্ত মাটি থেকে বিষাক্ত ক্যাডমিয়াম, আর্সেনিক (Pteris vittata বা ঢেঁকিশাক) ও সিসা শোষণ করে পরিবেশ পরিষ্কারকারী উদ্ভিদ',
      examNote: 'বাংলাদেশে পানির আর্সেনিক ও ভারী ধাতু দূর করতে ফার্ন Pteris vittata এবং সূর্যমুখী অত্যন্ত কার্যকর',
      diff: 'dental',
    },

    // --- Chapter 5 & 6 Additional High-Yield Gaps ---
    {
      ch: 'bio1_ch5_algae_fungi',
      vl: 'photosynthesis',
      cat: 'algae_fungi',
      term: 'লাল মরিচা রোগ (Red Rust of Tea) ও গোলআলুর বিলম্বিত ধ্বসা রোগ',
      def: 'চা পাতার লাল মরিচা রোগ সৃষ্টিকারী পরজীবী সবুজ শৈবাল Cephaleuros virescens; আর আলুর লেট ব্লাইট সৃষ্টিকারী Phytophthora infestans (Oomycete ছত্রাক-সদৃশ)',
      examNote: 'Phytophthora infestans-এর কারণেই ১৮৪৫ সালে আয়ারল্যান্ডে ভয়াবহ দুর্ভিক্ষ (Irish Potato Famine) হয়েছিল',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch5_algae_fungi',
      vl: 'photosynthesis',
      cat: 'algae_fungi',
      term: 'Spirogyra-র সিঁড়িবৎ (Scalariform) ও পার্শ্বীয় সংশ্লেষ (Conjugation)',
      def: 'ভাসমান মিঠাপানির শৈবাল Spirogyra-য় পাশাপাশি দুটি ফিলামেন্টের মধ্যে সংশ্লেষ-নালি তৈরি হয়ে পজিটিভ (+) ও নেগেটিভ (−) কোষের মিলনে জাইগোস্পোর (2n) গঠন',
      examNote: 'জাইগোস্পোর অঙ্কুরোদগমের সময় মায়োসিস ঘটে ৪টি হ্যাপ্লয়েড নিউক্লিয়াস হয় যার ৩টি নষ্ট হয়ে ১টি নতুন ফিলামেন্ট দেয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch5_algae_fungi',
      vl: 'photosynthesis',
      cat: 'algae_fungi',
      term: 'Penicillium notatum ও Saccharomyces cerevisiae (বেকারস ইস্ট)',
      def: 'আলেকজান্ডার ফ্লেমিং (১৯২৮) Penicillium থেকে প্রথম অ্যান্টিবায়োটিক পেনিসিলিন আবিষ্কার করেন; এককোষী ইস্ট বাডিং ও অ্যালকোহল গাঁজন (ব্রেড-বেকারি) করে',
      examNote: 'ইস্ট কোষে জাইমেজ এনজাইম কমপ্লেক্স থাকে ও এটি ভিটামিন বি-কমপ্লেক্স সমৃদ্ধ',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch5_algae_fungi',
      vl: 'photosynthesis',
      cat: 'algae_fungi',
      term: 'ছত্রাকের কোষপ্রাচীর (কাইটিন) ও সঞ্চিত খাদ্য (গ্লাইকোজেন)',
      def: 'উদ্ভিদের সেলুলোজের বদলে ছত্রাকের কোষপ্রাচীর N-অ্যাসিটাইলগ্লুকোসামাইনের পলিমার কাইটিন দিয়ে গঠিত এবং সঞ্চিত খাদ্য গ্লাইকোজেন ও তৈলবিন্দু',
      examNote: 'এ কারণে আধুনিক ফাইভ-কিংডম শ্রেণিবিন্যাসে হুইটেকার ছত্রাককে উদ্ভিদ থেকে আলাদা করে Fungi রাজ্যে স্থান দেন',
      diff: 'board',
    },
    {
      ch: 'bio1_ch5_algae_fungi',
      vl: 'photosynthesis',
      cat: 'algae_fungi',
      term: 'Agaricus (মাশরুম)-এর বাসিডিওকার্প ও বিষাক্ত Amanita phalloides',
      def: 'ভোজ্য Agaricus bisporus-এর প্রোটিনসমৃদ্ধ ছত্রাকদেহে গিল (Lamellae)-এর গায়ে বাসিডিয়ামে ৪টি করে হ্যাপ্লয়েড বাসিডিওস্পোর জন্মে',
      examNote: 'বিষাক্ত মাশরুম টোডস্টুল (Amanita)-এ অ্যামাটক্সিন থাকে যা RNA পলিমারেজ-II বন্ধ করে লিভার বিকল করে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch5_algae_fungi',
      vl: 'photosynthesis',
      cat: 'algae_fungi',
      term: 'লাইকেন (Lichen) — বায়ুদূষণের জৈব নির্দেশক ও লিটমাস উৎস',
      def: 'শৈবাল (ফাইকোবায়োন্ট — ~১০%) ও ছত্রাকের (মাইকোবায়োন্ট — ~৯০%) বাধ্যতামূলক মিথোজীবী যা SO₂ দূষণে দ্রুত মারা যায় বলে দূষণ নির্দেশক (Bio-indicator)',
      examNote: 'Roccella tinctoria লাইকেন থেকে অ্যাসিড-ক্ষার নির্দেশক লিটমাস পেপার তৈরি হয় এবং Cladonia rangiferina (রেইনডিয়ার মস) আর্কটিকে খাদ্য',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch5_algae_fungi',
      vl: 'photosynthesis',
      cat: 'algae_fungi',
      term: 'ক্লোরেলা (Chlorella), স্পিরুলিনা (Spirulina) ও অ্যাগার-অ্যাগার উৎস',
      def: 'মহাকাশযানে O₂ ও এককোষী প্রোটিন (SCP) সরবরাহকারী সবুজ শৈবাল Chlorella; লোহিত শৈবাল Gelidium ও Gracilaria থেকে টিস্যু কালচারের অ্যাগার-অ্যাগার পাওয়া যায়',
      examNote: 'বাদামি শৈবাল Laminaria ও Sargassum থেকে আয়োডিন ও অ্যালজিনিক অ্যাসিড আহরণ করা হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch6_bryo_pterido',
      vl: 'photosynthesis',
      cat: 'bryo_pterido',
      term: 'Riccia-র স্কেল (Scale) ও এককোষী রাইজয়েড বনাম মসের বহুকোষী রাইজয়েড',
      def: 'Riccia থ্যালাসের অঙ্কীয় তলে বহুকোষী বেগুনি স্কেল (আর্দ্রতা ধরে রাখে) এবং মসৃণ ও খাঁজকাটা দু-ধরনের এককোষী রাইজয়েড থাকে',
      examNote: 'অপরদিকে মস (Funaria / Semibarbula)-এ তির্যক প্রাচীরযুক্ত বহুকোষী রাইজয়েড দেখা যায়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch6_bryo_pterido',
      vl: 'photosynthesis',
      cat: 'bryo_pterido',
      term: 'Riccia-র স্পোরোফাইট কেবল ক্যাপসিউলে সীমাবদ্ধ (সরলতম স্পোরোফাইট)',
      def: 'ব্রায়োফাইটার মধ্যে Riccia-র স্পোরোফাইটে পাদ (Foot) ও সিটা (Seta) অনুপস্থিত, শুধুমাত্র গোলাকার ক্যাপসিউল থাকে যা ক্যালিপ্ট্রায় আবৃত',
      examNote: 'এতে ইলেটারও থাকে না (Marchantia-তে স্পোর বিক্ষেপণে সাহায্যকারী হাইগ্রোস্কোপিক ইলেটার থাকে)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch6_bryo_pterido',
      vl: 'photosynthesis',
      cat: 'bryo_pterido',
      term: 'ব্রায়োফাইটকে কেন "উদ্ভিদজগতের উভচর" (Amphibian of Plant Kingdom) বলে?',
      def: 'এরা ভেজা ছায়াযুক্ত স্থলজ পরিবেশে জন্মালেও নিষেক সম্পন্ন করার জন্য সচল ফ্ল্যাজেলাযুক্ত শুক্রাণু (অ্যান্থেরোজয়েড) সাঁতরে আর্কিগোনিয়ামে পৌঁছাতে পানির ওপর সম্পূর্ণ নির্ভরশীল',
      examNote: 'আর্কিগোনিয়ামের গ্রীবা নালিকোষ গলে ম্যালিক অ্যাসিড ক্ষরণ করে শুক্রাণুকে কেমোট্যাক্সিসে আকর্ষণ করে',
      diff: 'board',
    },
    {
      ch: 'bio1_ch6_bryo_pterido',
      vl: 'photosynthesis',
      cat: 'bryo_pterido',
      term: 'Sphagnum (পিট মস) ও অ্যান্টিসেপটিক ড্রেসিং',
      def: 'নিজের শুষ্ক ওজনের ১৮–২৬ গুণ পর্যন্ত পানি শোষণ ও ধরে রাখার ক্ষমতাসম্পন্ন শোষক মস যা যুদ্ধক্ষেত্রে তুলার বিকল্প অ্যান্টিসেপটিক ব্যান্ডেজ ও পিট কয়লা হিসেবে ব্যবহৃত হতো',
      examNote: 'এর পাতায় জীবিত ক্লোরোফিল কোষ ও মৃত পানি-ধারণকারী হায়ালিন (Hyaline) কোষের ছিদ্রযুক্ত জালিকা থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch6_bryo_pterido',
      vl: 'photosynthesis',
      cat: 'bryo_pterido',
      term: 'Pteris-এর সোরাস, ইন্ডিউসিয়াম ও স্পোরাঞ্জিয়ামের অ্যানুলাস-স্টোমিয়াম',
      def: 'পিনার কিনারা উল্টে তৈরি মেকি আবরণ বা ফলস ইন্ডিউসিয়ামে ঢাকা সোরাস (Coenosorus); এবং শুকিয়ে গেলে টান দিয়ে স্পোর ছিটকে দেওয়া পুরু-প্রাচীর অ্যানুলাস বলয়',
      examNote: 'ফার্নের পাতার কিনারা বরাবর অবিচ্ছিন্ন সোরাস থাকার বৈশিষ্ট্য Pteris-এর অন্যতম প্রধান শনাক্তকারী চিহ্ন',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch6_bryo_pterido',
      vl: 'photosynthesis',
      cat: 'bryo_pterido',
      term: 'ফার্নের হৃৎপিণ্ডাকার প্রোথ্যালাস (Prothallus)',
      def: 'Pteris-এর হ্যাপ্লয়েড স্পোর অঙ্কুরিত হয়ে তৈরি সবুজ, স্বভোজী, চ্যাপ্টা, সহবাসীয় (একই দেহে নিচে অ্যান্থেরিডিয়া ও খাঁজের কাছে আর্কিগোনিয়া) গ্যামিটোফাইট',
      examNote: 'ব্রায়োফাইটে গ্যামিটোফাইট প্রধান ও স্পোরোফাইট পরনির্ভরশীল; কিন্তু টেরিডোফাইটে স্পোরোফাইট প্রধান ও উভয় দশা স্বাধীন/স্বভোজী',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch6_bryo_pterido',
      vl: 'photosynthesis',
      cat: 'bryo_pterido',
      term: 'বিষমরেণুপ্রসূ (Heterosporous) টেরিডোফাইট ও বীজ স্বভাবের সূচনা',
      def: 'Selaginella, Marsilea ও Azolla-য় ক্ষুদ্র মাইক্রোস্পোর ও বৃহৎ মেগাস্পোর উৎপন্ন হওয়াকে হেটারোস্পোরি বলে — যা থেকেই বিবর্তনে বীজ উদ্ভিদের উৎপত্তি',
      examNote: 'Azolla পিন্নাতার পাতার গহ্বরে Anabaena azollae মিথোজীবী বাস করায় ধানক্ষেতে উত্তম জৈবসার হিসেবে ব্যবহৃত হয়',
      diff: 'medical',
    },

    // --- High-Yield Ch 1-4 Synthesis Pearls ---
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      cat: 'cell_mol',
      term: 'হিস্টোন অক্টামার ও নিউক্লিওজোম পুঁতি (Nucleosome)',
      def: 'H2A, H2B, H3, H4 — এই ৪ প্রকার হিস্টোনের দুটি করে মোট ৮টি অণুর অক্টামারের চারপাশে ১.৬৫–১.৭৫ প্যাঁচে ~১৪৬ বেসপেয়ার DNA পেঁচানো ও H1 হিস্টোন লিঙ্কার হিসেবে যুক্ত',
      examNote: 'হিস্টোন প্রোটিন লাইসিন ও আর্জিনিন ক্ষারীয় অ্যামিনো অ্যাসিড সমৃদ্ধ হওয়ায় ধনাত্মক চার্জযুক্ত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      cat: 'cell_mol',
      term: 'ওকাজাকি খণ্ড (Okazaki Fragments) ও DNA পলিমারেজ-I',
      def: 'DNA রেপ্লিকেশনে ৩′→৫′ মূল সূত্রক ছাড়া অপর ৫′→৩′ ল্যাগিং সূত্রকে (Lagging strand) ১০০–১০০০ নিউক্লিওটাইডের যে খণ্ডাংশে সংশ্লেষ ঘটে',
      examNote: 'DNA পলিমারেজ কেবল ৫′→৩′ দিকেই নতুন নিউক্লিওটাইড যোগ করতে পারে; RNA প্রাইমার সরিয়ে শূন্যস্থান পূরণ করে DNA পলি-I ও জোড়া দেয় লাইগেজ',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      cat: 'cell_mol',
      term: 'ওয়াটসন-ক্রিক B-DNA বনাম চারগাফ-এর বেস সমতা নিয়ম',
      def: 'চারগাফের নিয়মে [A] = [T] ও [G] = [C], অর্থাৎ পিউরিন (A+G) = পিরিমিডিন (C+T); আর A=T-তে ২টি ও G≡C-তে ৩টি হাইড্রোজেন বন্ধন থাকে',
      examNote: 'G≡C পরিমাণ বেশি হলে DNA-র গলনাঙ্ক (Tm) বৃদ্ধি পায় কারণ ৩টি H-বন্ধন ভাঙতে বেশি তাপশক্তি লাগে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch1_cell',
      vl: 'mitosis_cell',
      cat: 'cell_mol',
      term: 'সেন্ট্রাল ডগমা (ফ্রান্সিস ক্রিক, ১৯৫৮) ও স্প্লাইসিওসোম',
      def: 'DNA → (ট্রান্সক্রিপশন) mRNA → (ট্রান্সলেশন) প্রোটিন; প্রকৃতকোষীয় hnRNA থেকে ইন্ট্রন কেটে ফেলে একজোন জোড়া দেওয়ার প্রক্রিয়া হলো স্প্লাইসিং',
      examNote: '৫′ প্রান্তে ৭-মিথাইলগুয়ানোসিন ক্যাপ ও ৩′ প্রান্তে পলি-A লেজ (প্রায় ২০০ অ্যাডেনিন) mRNA-কে ক্ষয় থেকে বাঁচায়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      cat: 'cell_div',
      term: 'মায়োসিস-১ এর প্রোফেজ-১: ৫টি উপপর্যায়ের অনন্য ঘটনা',
      def: 'লেপ্টোটিন (বুকে-সদৃশ বিন্যাস), জাইগোটিন (সিন্যাপসিস ও সিন্যাপ্টোনিমাল কমপ্লেক্স), প্যাকাইটিন (টেট্রাড ও ক্রসিং ওভার), ডিপ্লোটিন (কায়াজমা দৃশ্যমান) ও ডায়াকাইনেসিস (টার্মিনালাইজেশন)',
      examNote: 'মেটাফেজ-১-এ দুটি বিষুবীয় তলে বাইভ্যালেন্ট সজ্জা ও অ্যানাফেজ-১-এ সেন্ট্রোমিয়ার না ভেঙে সমসংস্থ ক্রোমোজোম পৃথক হওয়াই ক্রোমোজোম সংখ্যা অর্ধেক করে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch2_division',
      vl: 'mitosis_cell',
      cat: 'cell_div',
      term: 'ক্যান্সার কোষের p53 জিন (জিনোমের প্রহরী) ও মেটাস্ট্যাসিস',
      def: 'G₁/S চেকপয়েন্টে DNA ক্ষতি শনাক্ত করে কোষচক্র থামানো বা অ্যাপোপটোসিস ঘটানো টিউমার সাপ্রেসর জিন হলো p53; এর নিষ্ক্রিয়তায় অনিয়ন্ত্রিত মাইটোসিস ঘটে',
      examNote: 'ম্যালিগন্যান্ট টিউমারের রক্ত-লসিকা পথে দেহের দূরবর্তী অঙ্গে ছড়িয়ে পড়া হলো মেটাস্ট্যাসিস (Metastasis)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      cat: 'cell_mol',
      term: 'প্রোটিনের আলফা-হেলিক্স, বিটা-প্লিটেড ও কোয়ার্টারনারি গঠন (হিমোগ্লোবিন)',
      def: 'অ্যামিনো অ্যাসিডের পেপটাইড রৈখিক ক্রম প্রাথমিক; H-বন্ধনে ভাঁজ আলফা/বিটা গৌণ; ডাইসালফাইড-জলবিকর্ষী ত্রিমাত্রিক টারশিয়ারি (মাইওগ্লোবিন/এনজাইম) এবং একাধিক পলিপেপটাইড কোয়ার্টারনারি (হিমোগ্লোবিন ২α+২β)',
      examNote: 'তাপ বা অ্যাসিডে প্রোটিনের প্রাথমিক পেপটাইড বন্ধন অটুট থাকলেও গৌণ-টারশিয়ারি ভাঁজ খুলে কার্যকারিতা নষ্ট হয় (ডিন্যাচুরেশন)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      cat: 'cell_mol',
      term: 'প্রতিযোগী (Competitive) বনাম অ-প্রতিযোগী এনজাইম ইনহিবিটর',
      def: 'সাবস্ট্রেটের সাথে সাদৃশ্য থাকায় সরাসরি অ্যাক্টিভ সাইটে বসে Km বাড়ায় কিন্তু Vmax অপরিবর্তিত রাখে প্রতিযোগী ইনহিবিটর (যেমন সাকসিনেটের প্রতি ম্যালোনেট)',
      examNote: 'অ-প্রতিযোগী বা অ্যালোস্টেরিক ইনহিবিটর অ্যাক্টিভ সাইটের বাইরে বসে আকৃতি বদলে Vmax কমিয়ে দেয় (যেমন সায়ানাইড, ভারী ধাতু Hg²⁺/Pb²⁺)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch3_cell_chem',
      vl: 'photosynthesis',
      cat: 'cell_mol',
      term: 'IUBMB এনজাইমের ৬টি শ্রেণি (OTHLIL)',
      def: '১) অক্সিডোরিডাক্টেজ, ২) ট্রান্সফারেজ, ৩) হাইড্রোলেজ (সকল পরিপাকীয় এনজাইম), ৪) লাইয়েজ (পানি/CO₂ ছাড়াই দ্বিবন্ধন), ৫) আইসোমারেজ ও ৬) লাইগেজ (ATP ব্যয়ে জোড়া)',
      examNote: 'আর্নডেক্স ও হপকিন্স বা ক্রমানুসারে শ্রেণি নম্বরের প্রথম অঙ্কটি (EC নম্বর) প্রধান শ্রেণি নির্দেশ করে',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      cat: 'microbe',
      term: 'ট্রিপল লাইন: ভাইরাস, ভিরয়েড (Viroid) ও প্রিয়ন (Prion)',
      def: 'ভাইরাস (প্রোটিন + DNA/RNA); ভিরয়েড (প্রোটিন আবরণহীন ক্ষুদ্র বৃত্তাকার ssRNA — আলুর স্পিন্ডল টিউবার রোগ, ডিনার ১৯৭১); প্রিয়ন (নিউক্লিক অ্যাসিডবিহীন সংক্রামক প্রোটিন — ম্যাড কাউ/CJD, প্রুসিনার)',
      examNote: 'প্রিয়ন ও ভিরয়েড উভয়ই সাধারণ ব্যাকটেরিওসাইড ও অ্যান্টিবায়োটিকে অসংবেদনশীল',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      cat: 'microbe',
      term: 'প্লাজমোডিয়ামের সুপ্তিকাল (Incubation period) ও জ্বরের পর্যায়',
      def: 'P. vivax (বিনাইন টার্শিয়ান — ৪৮ ঘণ্টা পর জ্বর, সুপ্তি ১২–২০ দিন), P. malariae (কোয়ার্টান — ৭২ ঘণ্টা), P. ovale (মৃদু টার্শিয়ান — ৪৮ ঘণ্টা) ও P. falciparum (ম্যালিগন্যান্ট টার্শিয়ান — ৩৬–৪৮ ঘণ্টা)',
      examNote: 'ম্যালেরিয়ার কাঁপুনি দিয়ে জ্বর আসার কারণ এরিথ্রোসাইটিক শাইজোগনিতে লোহিত কণিকা ফেটে বিষাক্ত হিমোজয়েন (Hemozoin) রক্তে মেশা',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      cat: 'microbe',
      term: 'ধানের টুংরো (Tungro) ও ব্যাকটেরিয়াল লিফ ব্লাইট (Xanthomonas)',
      def: 'ধানের টুংরো সৃষ্টিকারী রাইস টুংরো ভাইরাস (RTV) ছড়ায় সবুজ পাতাফড়িং (Nephotettix) দ্বারা; আর পাতার ঝলসানো রোগ বা ব্লাইট ঘটায় গ্রাম-নেগেটিভ ব্যাকটেরিয়া Xanthomonas oryzae',
      examNote: 'অপরদিকে পেঁপের রিংস্পট ও টমেটোর লিফ কার্ল ভাইরাসবাহিত ও সাইট্রাস ক্যাংকার Xanthomonas citri দ্বারা সৃষ্ট',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch4_microbe',
      vl: 'mitosis_cell',
      cat: 'microbe',
      term: 'গ্রাম পজিটিভ বনাম গ্রাম নেগেটিভ ব্যাকটেরিয়া কোষপ্রাচীর',
      def: 'গ্রাম পজিটিভে পেপটিডোগ্লাইক্যান পুরু (২০–৮০ nm) ও টিকোয়িক অ্যাসিড থাকে (বেগুনি রঙ রাখে); গ্রাম নেগেটিভে পাতলা পেপটিডোগ্লাইক্যানের বাইরে লিপোপলিস্যাকারাইড (LPS/এন্ডোটক্সিন) স্তর থাকে (লাল/গোলাপি সাফ্রানিন রঙ নেয়)',
      examNote: 'লাইসোজাইম (চোখের জল ও লালায় প্রাপ্ত) পেপটিডোগ্লাইক্যানের β-১,৪ বন্ধন ভেঙে গ্রাম-পজিটিভ ব্যাকটেরিয়াকে ধ্বংস করে',
      diff: 'medical',
    },
  ];

  rows.forEach((r, idx) => {
    const sameCat = rows.filter((x) => x.cat === r.cat && x.term !== r.term);
    const pool = sameCat.length >= 3 ? sameCat : rows.filter((x) => x.term !== r.term);
    const pick = <T,>(getter: (x: Bio1SynthRow) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: r.diff ?? 'medical',
        question: `উদ্ভিদবিজ্ঞান ও বাস্তুসংস্থানে "${r.def}" — এটি নিচের কোনটির নির্ভুল ব্যাখ্যা?`,
        correct: r.term,
        distractors: pick((x) => x.term, 1),
        explanation: `${r.term}: ${r.def}। (${r.examNote})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · সমন্বিত হাই-ইল্ড ব্যাংক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `"${r.term}" সম্পর্কিত প্রধান সংজ্ঞা বা শারীরবৃত্তীয়-পরিবেশগত প্রক্রিয়া কোনটি?`,
        correct: r.def,
        distractors: pick((x) => x.def, 2),
        explanation: `${r.term}-এর ব্যাখ্যা: ${r.def}। (${r.examNote})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায়ভিত্তিক সংজ্ঞা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: 'dental',
        question: `পরীক্ষায় আসা তথ্য: "${r.examNote}" — এই তথ্যটি নিচের কোন বিষয়ের সাথে যুক্ত?`,
        correct: r.term,
        distractors: pick((x) => x.term, 3),
        explanation: `${r.examNote} হলো "${r.term}" (${r.def})-এর গুরুত্বপূর্ণ পরীক্ষার অংশ।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · মেডিকেল ও ডেন্টাল ফ্ল্যাশকার্ড',
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
        question: `"${r.term}" প্রসঙ্গে নিচের কোন বাড়তি তথ্যটি সবচেয়ে নির্ভুল?`,
        correct: r.examNote,
        distractors: pick((x) => x.examNote, 4),
        explanation: `${r.term}: ${r.examNote}। (${r.def})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · চূড়ান্ত রিভিশন',
      })
    );
  });

  // 2. Quantitative Drills for Ch 12 (10% Trophic Pyramid) + Ch 1 (Codons/mRNA/DNA) + Ch 3 (Lipids/Peptides)
  // 2A. Ecological 10% Energy Pyramid (15 × 2 = 30 MCQs)
  [50000, 100000, 200000, 400000, 500000, 800000, 1000000, 1500000, 2500000, 5000000].forEach((sunPlantKcal, i) => {
    const prod = sunPlantKcal;
    const herb = prod / 10;
    const primCarn = herb / 10;
    const topCarn = primCarn / 10;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch12_environment',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `একটি তৃণভূমির বাস্তুতন্ত্রে উৎপাদক (ঘাস) স্তরে মোট ${toBnDigits(prod.toLocaleString('en-US'))} কিলোক্যালরি (kcal) শক্তি সঞ্চিত থাকলে লিন্ডেম্যানের ১০% সূত্র অনুযায়ী চতুর্থ পুষ্টিস্তরে (ঈগল/সর্বোচ্চ খাদক) কত kcal শক্তি পৌঁছাবে?`,
        correct: `${toBnDigits(topCarn.toLocaleString('en-US'))} kcal`,
        distractors: [
          `${toBnDigits(primCarn.toLocaleString('en-US'))} kcal`,
          `${toBnDigits(herb.toLocaleString('en-US'))} kcal`,
          `${toBnDigits((topCarn / 10).toLocaleString('en-US'))} kcal`,
        ],
        explanation: `১ম স্তর (উৎপাদক) = ${toBnDigits(prod)} → ২য় স্তর (তৃণভোজী) = ${toBnDigits(herb)} → ৩য় স্তর (গৌণ খাদক) = ${toBnDigits(primCarn)} → ৪র্থ স্তর (সর্বোচ্চ খাদক) = ${toBnDigits(topCarn)} kcal।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১২ · শক্তির পিরামিড গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch12_environment',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: 'dental',
        question: `লিন্ডেম্যানের ১০% শক্তি স্থানান্তর নীতি অনুযায়ী যদি খাদ্যশৃঙ্খলের ৩য় পুষ্টিস্তরে (ছোট মাছ/ব্যাঙ) ${toBnDigits(primCarn.toLocaleString('en-US'))} J শক্তি জমা থাকে, তবে ১ম পুষ্টিস্তরে (সবুজ উৎপাদক) অন্তত কত J শক্তি ছিল?`,
        correct: `${toBnDigits(prod.toLocaleString('en-US'))} J`,
        distractors: [
          `${toBnDigits(herb.toLocaleString('en-US'))} J`,
          `${toBnDigits((prod * 10).toLocaleString('en-US'))} J`,
          `${toBnDigits((primCarn * 20).toLocaleString('en-US'))} J`,
        ],
        explanation: `৩য় স্তরে ${toBnDigits(primCarn)} J থাকলে ২য় স্তরে ছিল ${toBnDigits(herb)} J এবং ১ম স্তরে (উৎপাদকে) ছিল ${toBnDigits(prod)} J।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১২ · উল্টা গণনা পিরামিড',
      })
    );
  });

  // 2B. Polypeptide Length <-> Coding mRNA Bases & DNA Base Pairs (15 × 3 = 45 MCQs)
  [50, 80, 100, 120, 150, 180, 200, 250, 300, 350, 400, 500, 600, 750, 1000].forEach((aa, i) => {
    const codingCodons = aa + 1; // +1 stop codon
    const mrnaBases = codingCodons * 3;
    const peptideBonds = aa - 1;
    const waterOut = aa - 1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি পলিপেপটাইড শৃঙ্খলে ঠিক ${toBnDigits(aa)}টি অ্যামিনো অ্যাসিড থাকলে একে সংকেতদানকারী কার্যকর (ইন্ট্রন-মুক্ত) mRNA অণুতে প্রারম্ভিক (AUG) ও একটি সমাপ্তি কোডনসহ অন্তত কতটি নিউক্লিওটাইড ক্ষারক থাকবে?`,
        correct: `${toBnDigits(mrnaBases.toLocaleString('en-US'))}টি বেস (${toBnDigits(codingCodons)}টি কোডন)`,
        distractors: [
          `${toBnDigits((aa * 3).toLocaleString('en-US'))}টি বেস`,
          `${toBnDigits(((aa + 2) * 3).toLocaleString('en-US'))}টি বেস`,
          `${toBnDigits((mrnaBases * 2).toLocaleString('en-US'))}টি বেস`,
        ],
        explanation: `${toBnDigits(aa)}টি অ্যামিনো অ্যাসিডের জন্য ${toBnDigits(aa)}টি কোডন + ১টি সমাপ্তি কোডন (UAA/UAG/UGA) = ${toBnDigits(codingCodons)}টি কোডন = ${toBnDigits(codingCodons)} × ৩ = ${toBnDigits(mrnaBases)}টি নিউক্লিওটাইড।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · জেনেটিক কোডন হিসাব',
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
        question: `${toBnDigits(aa)}টি অ্যামিনো অ্যাসিড পরস্পর যুক্ত হয়ে একটি রৈখিক প্রোটিন শৃঙ্খল গঠন করলে মোট কতটি পেপটাইড বন্ধন (-CO-NH-) সৃষ্টি হবে এবং কত অণু পানি মুক্ত হবে?`,
        correct: `${toBnDigits(peptideBonds)}টি পেপটাইড বন্ধন ও ${toBnDigits(waterOut)} অণু H₂O`,
        distractors: [
          `${toBnDigits(aa)}টি পেপটাইড বন্ধন ও ${toBnDigits(aa)} অণু H₂O`,
          `${toBnDigits(peptideBonds)}টি পেপটাইড বন্ধন ও ${toBnDigits(aa)} অণু H₂O`,
          `${toBnDigits(aa + 1)}টি পেপটাইড বন্ধন ও ${toBnDigits(waterOut)} অণু H₂O`,
        ],
        explanation: `nটি অ্যামিনো অ্যাসিড কনডেনসেশন বিক্রিয়ায় যুক্ত হলে (n − ১)টি পেপটাইড বন্ধন তৈরি হয় এবং (n − ১) অণু পানি বের হয়; তাই ${toBnDigits(peptideBonds)}টি।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৩ · পেপটাইড বন্ধন গণনা',
      })
    );
  });

  // 2C. Chargaff DNA Base % Drills (20 × 2 = 40 MCQs)
  [12, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 26, 27, 28, 29, 31, 32, 33, 34, 36].forEach((aPct, i) => {
    const tPct = aPct;
    const gPct = 50 - aPct;
    const cPct = gPct;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch1_cell',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `চারগাফের নিয়ম অনুসারে একটি দ্বিসূত্রক DNA অণুতে অ্যাডেনিন (A)-এর পরিমাণ ${toBnDigits(aPct)}% হলে সাইটোসিন (C) এবং গুয়ানিন (G)-এর পরিমাণ আলাদাভাবে কত শতাংশ হবে?`,
        correct: `C = ${toBnDigits(cPct)}% ও G = ${toBnDigits(gPct)}%`,
        distractors: [
          `C = ${toBnDigits(aPct)}% ও G = ${toBnDigits(gPct * 2)}%`,
          `C = ${toBnDigits(100 - 2 * aPct)}% ও G = ${toBnDigits(100 - 2 * aPct)}%`,
          `C = ${toBnDigits(50 - cPct)}% ও G = ${toBnDigits(50 - gPct)}%`,
        ],
        explanation: `[A] = [T] = ${toBnDigits(aPct)}% হওয়ায় A+T = ${toBnDigits(2 * aPct)}%; বাকি ${toBnDigits(100 - 2 * aPct)}% হলো G+C। যেহেতু [G] = [C], তাই প্রত্যেকে = ${toBnDigits(gPct)}%।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · চারগাফ নিয়ম গাণিতিক সমস্যা',
      })
    );
  });

  // 2D. Mitosis / Meiosis Chromosome & Chromatid Tracking (15 × 3 = 45 MCQs)
  [14, 16, 18, 20, 22, 24, 28, 30, 32, 36, 40, 42, 46, 48, 50].forEach((n2, i) => {
    const n1 = n2 / 2;
    const g2Chromatids = n2 * 2;
    const met1Bivalents = n1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch2_division',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি ডিপ্লয়েড উদ্ভিদের দেহকোষে 2n = ${toBnDigits(n2)}টি ক্রোমোজোম থাকলে S-দশা পরবর্তী G₂ পর্যায়ে এবং মায়োসিস-১ এর মেটাফেজ-১-এ যথাক্রমে মোট ক্রোমাটিড ও বাইভ্যালেন্ট (Bivalent) সংখ্যা কত হবে?`,
        correct: `G₂-তে ${toBnDigits(g2Chromatids)}টি ক্রোমাটিড ও মেটাফেজ-১-এ ${toBnDigits(met1Bivalents)}টি বাইভ্যালেন্ট`,
        distractors: [
          `G₂-তে ${toBnDigits(n2)}টি ক্রোমাটিড ও মেটাফেজ-১-এ ${toBnDigits(n2)}টি বাইভ্যালেন্ট`,
          `G₂-তে ${toBnDigits(g2Chromatids)}টি ক্রোমাটিড ও মেটাফেজ-১-এ ${toBnDigits(n2)}টি বাইভ্যালেন্ট`,
          `G₂-তে ${toBnDigits(n1)}টি ক্রোমাটিড ও মেটাফেজ-১-এ ${toBnDigits(met1Bivalents)}টি বাইভ্যালেন্ট`,
        ],
        explanation: `S-দশায় DNA দ্বিগুণ হওয়ায় প্রতি ক্রোমোজোমে ২টি ক্রোমাটিড থাকে (মোট ${toBnDigits(n2)} × ২ = ${toBnDigits(g2Chromatids)}টি ক্রোমাটিড)। আর ২টি সমসংস্থ ক্রোমোজোম মিলে ১টি বাইভ্যালেন্ট হয়, তাই ${toBnDigits(n2)}/২ = ${toBnDigits(met1Bivalents)}টি বাইভ্যালেন্ট।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · ক্রোমাটিড ও বাইভ্যালেন্ট গণনা',
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
        question: `যে উদ্ভিদের ডিপ্লয়েড সংখ্যা 2n = ${toBnDigits(n2)}, তার অ্যানাফেজ-১ (মায়োসিস) শেষে প্রতিটি মেরুতে ক্রোমোজোম সংখ্যা এবং দ্বিনিষেকের পর গঠিত শস্যকোষে ক্রোমোজোম সংখ্যা কত হবে?`,
        correct: `মেরুতে ${toBnDigits(n1)}টি ও শস্যকোষে ${toBnDigits(n1 * 3)}টি`,
        distractors: [
          `মেরুতে ${toBnDigits(n2)}টি ও শস্যকোষে ${toBnDigits(n1 * 3)}টি`,
          `মেরুতে ${toBnDigits(n1)}টি ও শস্যকোষে ${toBnDigits(n2)}টি`,
          `মেরুতে ${toBnDigits(n2 * 2)}টি ও শস্যকোষে ${toBnDigits(n1 * 4)}টি`,
        ],
        explanation: `অ্যানাফেজ-১-এ সমসংস্থ ক্রোমোজোম আলাদা হয়ে প্রতি মেরুতে হ্যাপ্লয়েড n = ${toBnDigits(n1)}টি যায়। আর শস্য ট্রিপ্লয়েড (3n) বলে ${toBnDigits(n1)} × ৩ = ${toBnDigits(n1 * 3)}টি ক্রোমোজোম থাকে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ ও ১০ · প্লয়েডি সমন্বয়',
      })
    );
  });

  return list;
}
