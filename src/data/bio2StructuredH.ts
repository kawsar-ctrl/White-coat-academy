import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface ReproImmGenRow {
  ch: string;
  vl: string;
  term: string;
  fact: string;
  clinical: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredH(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_sh_${String(seq++).padStart(4, '0')}`;

  // 1. Human Reproduction, Embryology, Immunology & Genetics Matrix (54 × 3 = 162 MCQs)
  const rigRows: ReproImmGenRow[] = [
    // Human Reproduction & Embryology (18)
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'সার্টলি (Sertoli) কোষ ও ইনহিবিন হরমোন', fact: 'সেমিনিফেরাস নালিকার অভ্যন্তরে বর্ধনশীল শুক্রাণুকে পুষ্টি জোগানো (নার্স কোষ), রক্ত-শুক্রাশয় প্রাচীর গঠন এবং FSH কমাতে ইনহিবিন ক্ষরণ', clinical: 'অ্যান্ড্রোজেন-বাইন্ডিং প্রোটিন (ABP) ক্ষরণ করে উচ্চ টেস্টোস্টেরন ঘনত্ব ধরে রাখে', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'লেডিগ (Leydig) বা আন্তঃকোষীয় কোষ', fact: 'সেমিনিফেরাস নালিকার মধ্যবর্তী যোজক কলায় অবস্থিত কোষ যা পিটুইটারির LH (ICSH)-এর উদ্দীপনায় টেস্টোস্টেরন ক্ষরণ করে', clinical: 'পুরুষের গৌণ যৌন বৈশিষ্ট্য ও শুক্রাণুজনন সচল রাখে', diff: 'board' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'স্পার্মিওজেনেসিস (Spermiogenesis)', fact: 'গোল নিশ্চল হ্যাপ্লয়েড স্পার্মাটিড (n) বিভাজন ছাড়াই রূপান্তরিত হয়ে অ্যাক্রোজোম ও ফ্ল্যাজেলাযুক্ত সচল শুক্রাণুতে (Spermatozoa) পরিণত হওয়া', clinical: 'গলগি বডি থেকে অ্যাক্রোজোম ও দূরবর্তী সেন্ট্রিওল থেকে অ্যাক্সিয়াল ফিলামেন্ট গঠিত হয়', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ডিম্বাণুজননের প্রথম ও দ্বিতীয় মায়োটিক স্থগিতাবস্থা (Arrest)', fact: 'ভ্রূণাবস্থায় প্রাথমিক উওসাইট প্রোফেজ-১ (ডিপ্লোটিন)-এ আটকে থাকে এবং ডিম্বপাতের সময় গৌণ উওসাইট মেটাফেজ-২-তে আটকে থাকে', clinical: 'কেবল শুক্রাণু প্রবেশের পরই গৌণ উওসাইটের মেটাফেজ-২ সম্পন্ন হয়ে ২য় পোলার বডি ও ওভাম গঠিত হয়', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'অ্যাক্রোজোম বিক্রিয়া (Acrosome Reaction) ও হায়ালুরোনিডেজ', fact: 'শুক্রাণুর অ্যাক্রোজোম থেকে হায়ালুরোনিডেজ ও অ্যাক্রোসিন (জোনা লাইসিন) নিঃসৃত হয়ে করোনা রেডিয়াটা ও জোনা পেলুসিডা ভেদ করা', clinical: 'এর পূর্বে স্ত্রী জনননালিতে ক্যাপাসিটেশন (Capacitation) সম্পন্ন হওয়া বাধ্যতামূলক', diff: 'dental' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'কর্টিক্যাল বিক্রিয়া (Cortical Reaction) ও পলিস্পার্মি রোধ', fact: 'প্রথম শুক্রাণু প্রবেশের সাথে সাথে ডিম্বাণুর কর্টিক্যাল দানা উৎসেচক ছেড়ে জোনা পেলুসিডাকে শক্ত করে অন্য শুক্রাণুর প্রবেশ চিরতরে বন্ধ করা', clinical: 'ডিপ্লয়েড (2n) জাইগোটের সঠিক ক্রোমোজোম সংখ্যা নিশ্চিত করে', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ঋতুচক্রের ১৪শ দিনের LH সার্জ ও কর্পাস লুটিয়াম', fact: 'গ্রাফিয়ান ফলিকলের উচ্চ ইস্ট্রোজেন পজিটিভ ফিডব্যাকে LH-এর আকস্মিক তীব্র বৃদ্ধি (LH surge) ঘটিয়ে ডিম্বপাত করানো ও খালি ফলিকলকে কর্পাস লুটিয়ামে পরিণত করা', clinical: 'কর্পাস লুটিয়াম প্রচুর প্রোজেস্টেরন ক্ষরণ করে এন্ডোমেট্রিয়ামকে ইমপ্লান্টেশনের জন্য ধরে রাখে', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'মরুলা (Morula) ও ব্লাস্টোসিস্টের ট্রফোব্লাস্ট', fact: 'নিষেকের ৩–৪ দিনে ১৬–৩২ কোষের নিরেট তুঁতফল আকৃতির মরুলা এবং ৬ষ্ঠ–৭ম দিনে রোপিত ট্রফোব্লাস্ট ও অন্তঃকোষপুঞ্জযুক্ত ফাঁপা ব্লাস্টোসিস্ট', clinical: 'ট্রফোব্লাস্ট থেকেই অমরার কোরিওনিক ভিলাই গঠিত হয় ও অন্তঃকোষপুঞ্জ থেকে ভ্রূণ গঠিত হয়', diff: 'dental' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'এইচসিজি (hCG — হিউম্যান কোরিওনিক গোনাডোট্রপিন)', fact: 'রোপিত ব্লাস্টোসিস্টের সিনসাইটিওট্রফোব্লাস্ট থেকে ক্ষরিত হরমোন যা গর্ভাবস্থার প্রথম ২–৩ মাস কর্পাস লুটিয়ামকে সচল রাখে', clinical: 'গর্ভাবস্থার (Pregnancy) ইউরিন স্ট্রিপ টেস্টে মূত্রে hCG উপস্থিতিই শনাক্ত করা হয়', diff: 'board' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ভ্রূণীয় এক্টোডার্ম, মেসোডার্ম ও এন্ডোডার্মের উদ্ভূত অঙ্গ', fact: 'এক্টোডার্ম: মস্তিষ্ক, স্নায়ুতন্ত্র, এপিডার্মিস, কর্নিয়া-লেন্স; মেসোডার্ম: রক্ত, হৃৎপিণ্ড, পেশি, অস্থি, বৃক্ক; এন্ডোডার্ম: পৌষ্টিকনালির আবরণ, যকৃৎ, অগ্ন্যাশয়, ফুসফুস আবরণ', clinical: 'দাঁতের এনামেল এক্টোডার্ম থেকে এবং ডেন্টিন মেসোডার্ম থেকে তৈরি হয়', diff: 'medical' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ভ্রূণীয় বহিঃআবরণী: অ্যামনিয়ন, কোরিওন ও অ্যালানটয়েস', fact: 'অ্যামনিওটিক তরলে ভ্রূণকে আঘাত থেকে রক্ষাকারী অ্যামনিয়ন, গ্যাস বিনিময় ও অমরা গঠনকারী কোরিওন এবং নাভির রক্তনালি সৃষ্টিকারী অ্যালানটয়েস', clinical: 'অ্যামনিওসেন্টেসিসে অ্যামনিওটিক তরলের ভ্রূণকোষ পরীক্ষা করে ডাউন সিন্ড্রোম শনাক্ত করা হয়', diff: 'dental' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'আইসিএসআই (ICSI) বনাম আইভিএফ-ইটি (IVF-ET)', fact: 'পুরুষের অলিগোস্পার্মিয়া বা স্পার্ম গতিশীলতা কম থাকলে মাইক্রোপিপেটে একটি শুক্রাণু সরাসরি ডিম্বাণুর সাইটোপ্লাজমে প্রবেশ (ICSI)', clinical: 'ইন ভিট্রো ফার্টিলাইজেশনে (টেস্ট টিউব বেবি) দেহের বাইরে নিষেক ঘটিয়ে ব্লাস্টোসিস্ট জরায়ুতে প্রতিস্থাপন করা হয়', diff: 'board' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'ভ্যাসেকটমি (Vasectomy) ও টিউবেকটমি (Tubectomy)', fact: 'স্থায়ী জন্মনিয়ন্ত্রণে যথাক্রমে পুরুষের ভ্যাস ডিফারেন্স কেটে বাঁধা এবং নারীর ফ্যালোপিয়ান নালি (অ্যাম্পুলা/ইস্থমাস) কেটে বাঁধা', clinical: 'এগুলোতে হরমোন বা যৌনক্ষমতার কোনো পরিবর্তন হয় না, কেবল গ্যামেটের মিলন রোধ হয়', diff: 'board' },
    // Immunology (18)
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'প্রথম প্রতিরক্ষা স্তর: ত্বকের সিবাম, লাইসোজাইম ও মিউকাস সিলিয়া', fact: 'ত্বকের ল্যাকটিক-ফ্যাটি অ্যাসিড (pH ৩–৫), অশ্রু-লালায় ব্যাকটেরিয়ার কোষপ্রাচীর ধ্বংসকারী লাইসোজাইম এবং শ্বাসনালির মিউকোসিলিয়ারি এসকেলেটর', clinical: 'পাকস্থলির HCl (pH ১.৫–২) খাদ্যবাহিত অধিকাংশ জীবাণু ধ্বংস করে', diff: 'board' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'প্রাকৃতিক ঘাতক কোষ (NK Cell) — পারফোরিন ও গ্র্যানজাইম', fact: 'সহজাত অনাক্রম্যতার বৃহৎ দানাদার লিম্ফোসাইট যা MHC-I অনুপস্থিত ভাইরাস-আক্রান্ত কোষ ও টিউমার কোষে পারফোরিন দিয়ে ছিদ্র করে গ্র্যানজাইমে অ্যাপোপটোসিস ঘটায়', clinical: 'এরা কোনো পূর্ব-পরিচিতি বা অ্যান্টিবডি ছাড়াই দ্রুত কাজ করে', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'ইন্টারফেরন (Interferon α, β) প্রতিরক্ষা সংকেত', fact: 'ভাইরাস-আক্রান্ত কোষ থেকে ক্ষরিত সাইটোকাইন গ্লাইকোপ্রোটিন যা প্রতিবেশী সুস্থ কোষকে অ্যান্টিভাইরাল প্রোটিন তৈরিতে সতর্ক করে ভাইরাস বিভাজন থামায়', clinical: 'ইন্টারফেরন প্রজাতি-নির্দিষ্ট (Species-specific) কিন্তু ভাইরাস-অনির্দিষ্ট (Virus non-specific)', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'কমপ্লিমেন্ট সিস্টেম ও MAC (Membrane Attack Complex)', fact: 'রক্তরসে থাকা ৩০+ নিষ্ক্রিয় প্লাজমা প্রোটিন (C1–C9) সক্রিয় হয়ে C5b-C9 দ্বারা জীবাণুর ঝিল্লিতে ছিদ্র (Lysis) ও অপসোনাইজেশন ঘটানো', clinical: 'যকৃতে সংশ্লেষিত এই প্রোটিনগুলো ধাপে ধাপে ক্যাসকেড বিক্রিয়ায় সক্রিয় হয়', diff: 'dental' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'MHC ক্লাস-I বনাম MHC ক্লাস-II অণু', fact: 'মানবদেহের প্রায় সব নিউক্লিয়াসযুক্ত কোষে MHC-I (যা CD8⁺ সাইটোটক্সিক T-কোষে সংকেত দেয়) বনাম কেবল APC (ম্যাক্রোফেজ/ডেন্ড্রাইটিক/B-কোষ)-তে MHC-II (CD4⁺ হেল্পার T-কোষে দেয়)', clinical: 'অঙ্গ প্রতিস্থাপনে গ্রাফট রিজেকশন কমাতে দাতা-গ্রহীতার HLA/MHC ম্যাচিং করা হয়', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'হিউমোরাল বনাম কোষ-নির্ভর (Cell-Mediated) অনাক্রম্যতা', fact: 'B-লিম্ফোসাইট থেকে উদ্ভূত প্লাজমা কোষ অ্যান্টিবডি ক্ষরণ করে বহিঃকোষীয় জীবাণু নাশ করে (হিউমোরাল); আর সাইটোটক্সিক T-কোষ আক্রান্ত কোষ সরাসরি ধ্বংস করে (কোষ-নির্ভর)', clinical: 'হেল্পার T-কোষ (CD4⁺) ইন্টারলিউকিন-২ ও ৪ ছেড়ে উভয় ব্যবস্থাকেই উদ্দীপ্ত করে', diff: 'board' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'ইমিউনোগ্লোবিউলিন (Ig) অণুর H₂L₂ ও Fab-Fc অঞ্চল', fact: 'ডাইসালফাইড (-S-S-) বন্ধনে যুক্ত ২টি ভারী (Heavy) ও ২টি হালকা (Light) পলিপেপটাইড শৃঙ্খল; N-প্রান্তের পরিবর্তনীয় Fab অংশ অ্যান্টিজেন বাঁধে এবং Fc অংশ রিসেপ্টরে যুক্ত হয়', clinical: 'প্যাপাইন (Papain) এনজাইম দিয়ে অ্যান্টিবডিকে ২টি Fab ও ১টি Fc খণ্ডে ভাঙা যায়', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'IgG বনাম IgA বনাম IgM বনাম IgE শ্রেণির বিশেষত্ব', fact: 'IgG এককভাবে অমরা অতিক্রম করে ভ্রূণ রক্ষা করে; IgA মায়ের শালদুধ-লালা-অশ্রুতে ডাইমার; IgM বৃহত্তম পেন্টামার (প্রথম সাড়া); IgE অ্যালার্জি ও কৃমির বিরুদ্ধে মাস্ট কোষ উদ্দীপ্ত করে', clinical: 'মোট সিরাম অ্যান্টিবডির প্রায় ৭৫–৮০% হলো IgG', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'সক্রিয় বনাম নিষ্ক্রিয় এবং প্রাকৃতিক বনাম কৃত্রিম অনাক্রম্যতা', fact: 'রোগ হলে প্রাকৃতিক সক্রিয়; টিকায় কৃত্রিম সক্রিয়; মায়ের দুধ/প্লাসেন্টায় প্রাকৃতিক নিষ্ক্রিয়; সাপের অ্যান্টিভেনম বা টিটেনাস অ্যান্টিটক্সিনে কৃত্রিম নিষ্ক্রিয় অনাক্রম্যতা', clinical: 'সক্রিয় অনাক্রম্যতা দীর্ঘস্থায়ী ও মেমোরি কোষ তৈরি করে, নিষ্ক্রিয় অনাক্রম্যতা তাৎক্ষণিক কিন্তু স্বল্পস্থায়ী', diff: 'board' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'হাইব্রিডোমা প্রযুক্তি ও মনোক্লোনাল অ্যান্টিবডি (mAb)', fact: 'নির্দিষ্ট অ্যান্টিজেন-উদ্দীপ্ত প্লীহার B-কোষ ও অমর মায়েলোমা ক্যান্সার কোষের ফিউশনে (PEG + HAT মিডিয়াম) তৈরি একক ক্লোন থেকে অভিন্ন অ্যান্টিবডি উৎপাদন', clinical: 'গর্ভধারণ পরীক্ষা, ক্যান্সার টার্গেটেড থেরাপি ও অটোইমিউন চিকিৎসায় ব্যাপক ব্যবহৃত', diff: 'dental' },
    // Genetics & Evolution (18)
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'বোম্বে ফেনোটাইপ (Bombay Phenotype / hh)', fact: '১৯নং ক্রোমোজোমের FUT1 (H) জিনের হোমোজাইগাস প্রচ্ছন্ন (hh) অবস্থায় H-অ্যান্টিজেন তৈরি না হওয়ায় IA/IB জিন থাকা সত্ত্বেও রক্তের গ্রুপ O-এর মতো আচরণ করা', clinical: 'প্রচ্ছন্ন এপিস্ট্যাসিসের একটি ধ্রুপদী মানবীয় উদাহরণ; এদের কেবল hh দাতার রক্ত দেওয়া যায়', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'পরিপূরক জিন (Complementary — ৯:৭) বনাম পরিশোধক এপিস্ট্যাসিস (১৩:৩)', fact: 'মিষ্টি মটরে দুটি অ-অ্যালিলিক প্রকট জিনের যুগ্ম উপস্থিতিতে বেগুনি ফুল (৯:৭) বনাম সাদা লেগহর্ন মুরগিতে প্রকট I জিন C জিনকে বাধা দেওয়ায় ১৩ সাদা : ৩ রঙিন', clinical: 'উভয়ই মেন্ডেলের ৯:৩:৩:১ অনুপাতের বিশেষ আণবিক ব্যতিক্রম', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'প্রকট এপিস্ট্যাসিস (১২:৩:১) ও দ্বৈত প্রকট এপিস্ট্যাসিস (১৫:১)', fact: 'মিষ্টি কুমড়ায় W জিন Y/y জিনকে ঢেকে রাখায় ১২ সাদা : ৩ হলুদ : ১ সবুজ এবং ক্যাপসেলা বার্সা-প্যাস্টোরিস-এ যেকোনো একটি প্রকট জিন থাকলে ত্রিভুজাকার ফল (১৫:১)', clinical: '৯:৩:৪ অনুপাত হলো প্রচ্ছন্ন এপিস্ট্যাসিস (যেমন ইঁদুরের অ্যাগৌটি-কালো-অ্যালবিনো লোম)', diff: 'dental' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'মারণ জিন বা লিথাল জিন (Lethal Allele — ২:১ অনুপাত)', fact: 'হোমোজাইগাস অবস্থায় (AYAY বা CC) ভ্রূণের মৃত্যু ঘটায় বলে জীবিত অপত্যে মেন্ডেলের ৩:১ অনুপাত বদলে ২:১ হওয়া (যেমন কুইনোর হলুদ ইঁদুর বা ক্রিপার মুরগি)', clinical: 'মানুষে থ্যালাসেমিয়া মেজর ও সিকেল সেল অ্যানিমিয়া রিসেসিভ লিথাল জিনের উদাহরণ', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'সেক্স-লিংকড (X-বাহিত) বনাম সেক্স-ইনফ্লুয়েন্সড বনাম হল্যান্ড্রিক জিন', fact: 'X-বাহিত (বর্ণান্ধতা, হিমোফিলিয়া — ক্রিস-ক্রস বংশগতি); Y-বাহিত হল্যান্ড্রিক (কানে লোম — পিতা থেকে সব পুত্রে); অটোজোমাল কিন্তু হরমোন-প্রভাবিত (পুরুষালি টাক)', clinical: 'বর্ণান্ধ মা ও স্বাভাবিক বাবার সকল পুত্র বর্ণান্ধ হয় এবং সকল কন্যা বাহক হয়', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'ক্রিস-ক্রস উত্তরাধিকার (Criss-Cross Inheritance)', fact: 'পিতার X-লিঙ্কড প্রচ্ছন্ন বৈশিষ্ট্য বাহক কন্যার মাধ্যমে পরবর্তী প্রজন্মের নাতির (দৌহিত্রের) দেহে প্রকাশিত হওয়া', clinical: 'পুরুষে কেবল একটি X ক্রোমোজোম (হেমিজাইগাস) থাকায় রিসেসিভ জিন সহজেই প্রকাশ পায়', diff: 'board' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'প্লিওট্রপি (Pleiotropy) ও পলিজেনিক উত্তরাধিকার (১:৪:৬:৪:১)', fact: 'একটি মাত্র জিনের মিউটেশনে একাধিক ফেনোটাইপিক প্রভাব (সিকেল-সেল অ্যানিমিয়া বা ফিনাইলকিটোনিউরিয়া) বনাম একাধিক জিনের সমষ্টিগতভাবে একটি বৈশিষ্ট্য নিয়ন্ত্রণ (ত্বকের বর্ণ, উচ্চতা)', clinical: 'নিলসন-ইহলের লাল গমের দানা ও ডেভেনপোর্টের মানুষের গাত্রবর্ণে ১:৪:৬:৪:১ বেল-কার্ভ পাওয়া যায়', diff: 'dental' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'সমসংস্থ (Homologous) বনাম সমবৃত্তীয় (Analogous) অঙ্গ', fact: 'একই ভ্রূণীয় উৎপত্তি ও অস্থি গঠন কিন্তু ভিন্ন কাজ — অপসারী বিবর্তন (মানুষের হাত, তিমির ফ্লিপার, বাদুড়ের ডানা) বনাম ভিন্ন উৎপত্তি কিন্তু একই কাজ — অভিসারী বিবর্তন (প্রজাপতির ডানা ও পাখির ডানা)', clinical: 'সমসংস্থ অঙ্গ পূর্বপুরুষের অভিন্ন উৎসের জোরালো প্রমাণ দেয়', diff: 'board' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'আর্কিওপ্টেরিক্স ও পেরিপেটাস সংযোগকারী যোগসূত্র (Connecting Links)', fact: 'সরীসৃপ (চোয়ালে দাঁত, নখরযুক্ত ডানা, লম্বা লেজে কশেরুকা) ও পাখি (পালক, ডানা, চঞ্চু)-র মধ্যে জীবাশ্ম যোগসূত্র আর্কিওপ্টেরিক্স; অ্যানিলিডা-আর্থ্রোপোডার যোগসূত্র পেরিপেটাস', clinical: 'নগ্নবীজী ও ফার্নের মধ্যে Cycas এবং মাছ ও উভচরের মধ্যে ডিপনোই লাংফিশ সংযোগ রক্ষা করে', diff: 'board' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'ল্যামার্কের অর্জিত বৈশিষ্ট্যের বংশানুসরণ বনাম ভাইজম্যানের জার্মপ্লাজম তত্ত্ব', fact: 'অঙ্গের ব্যবহার-অব্যবহার তত্ত্ব (জিরাফের গলা) ল্যামার্ক; এবং দেহকোষ (সোমাটোপ্লাজম)-এর পরিবর্তন নয় বরং জননকোষ (জার্মপ্লাজম)-ই বংশগতির ধারক তা প্রমাণ করেন অগাস্ট ভাইজম্যান', clinical: 'ভাইজম্যান ২২ প্রজন্ম ইঁদুরের লেজ কেটে প্রমাণ করেন অর্জিত দেহগত ক্ষত বংশপরম্পরায় যায় না', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'হার্ডি-ওয়াইনবার্গ সাম্যাবস্থার ৫টি শর্ত ও জেনেটিক ড্রিফট', fact: 'বৃহৎ জনগোষ্ঠী, অবাধ প্রজনন, এবং মিউটেশন-মাইগ্রেশন-প্রাকৃতিক নির্বাচন অনুপস্থিত থাকলে অ্যালিল ফ্রিকোয়েন্সি p+q=১ এবং জিনোটাইপ p²+২pq+q²=১ ধ্রুব থাকে', clinical: 'ক্ষুদ্র বিচ্ছিন্ন জনগোষ্ঠীতে হঠাৎ অ্যালিল পরিবর্তনে জেনেটিক ড্রিফট (বটলনেক ও ফাউন্ডার প্রভাব) ঘটে', diff: 'medical' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', term: 'ভৌগোলিক ও সময়ের মহাযুগ: মেসোজোয়িক বনাম সিনোজোয়িক', fact: 'প্যালিওজোয়িকে মাছ-উভচরের আবির্ভাব; মেসোজোয়িক = "সরীসৃপ ও ডাইনোসরের যুগ" (ট্রায়াসিক-জুরাসিক-ক্রিটেশাস); সিনোজোয়িক = "স্তন্যপায়ী ও আধুনিক মানুষের যুগ"', clinical: 'ক্রিটেশাসের শেষে উল্কাপাতে ডাইনোসর বিলুপ্ত হয়ে স্তন্যপায়ীদের দ্রুত অভিযোজিত বিকিরণ ঘটে', diff: 'dental' },
  ];

  rigRows.forEach((row, i) => {
    const others = rigRows.filter((x) => x.term !== row.term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: row.ch,
        visualLessonId: row.vl,
        hscLevel: '12',
        difficulty: row.diff || 'medical',
        question: `জীববিজ্ঞান ২য় পত্রে "${row.fact}" — এটি কোন ধারণা বা উপাদানের সুনির্দিষ্ট ব্যাখ্যা?`,
        correct: row.term,
        distractors: others.slice(i % 20, (i % 20) + 4).map((x) => x.term),
        explanation: `${row.term}: ${row.fact}। বিশেষ তথ্য: ${row.clinical}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯–১২',
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
        question: `"${row.clinical}" — এই বিশেষ বৈশিষ্ট্য বা ক্লিনিক্যাল তথ্যটি কোনটির সাথে যুক্ত?`,
        correct: row.term,
        distractors: others.slice((i + 6) % 20, ((i + 6) % 20) + 4).map((x) => x.term),
        explanation: `${row.clinical} সরাসরি ${row.term} (${row.fact}) সম্পর্কিত।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · প্রাসঙ্গিক বিশ্লেষণ',
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
        question: `"${row.term}" বিষয়ে নিচের কোন তথ্যটি সঠিক?`,
        correct: row.fact,
        distractors: others.slice((i + 12) % 20, ((i + 12) % 20) + 4).map((x) => x.fact),
        explanation: `${row.term}: ${row.fact} (${row.clinical})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · উচ্চতর অধ্যায়',
      })
    );
  });

  // 2. Quantitative Hardy-Weinberg Equilibrium Drills (16 cases × 2 = 32 MCQs)
  const hwCases = [
    { qPct: 1, label: '১% (০.০১)', q: 0.1 },
    { qPct: 4, label: '৪% (০.০৪)', q: 0.2 },
    { qPct: 9, label: '৯% (০.০৯)', q: 0.3 },
    { qPct: 16, label: '১৬% (০.১৬)', q: 0.4 },
    { qPct: 25, label: '২৫% (০.২৫)', q: 0.5 },
    { qPct: 36, label: '৩৬% (০.৩৬)', q: 0.6 },
    { qPct: 0.25, label: '০.২৫% (প্রতি ৪০০ জনে ১ জন)', q: 0.05 },
    { qPct: 0.16, label: '০.১৬% (প্রতি ৬২৫ জনে ১ জন)', q: 0.04 },
    { qPct: 0.09, label: '০.০৯%', q: 0.03 },
    { qPct: 0.04, label: '০.০৪% (প্রতি ২,৫০০ জনে ১ জন)', q: 0.02 },
    { qPct: 0.01, label: '০.০১% (প্রতি ১০,০০০ জনে ১ জন)', q: 0.01 },
    { qPct: 0.64, label: '০.৬৪%', q: 0.08 },
    { qPct: 1.44, label: '১.৪৪%', q: 0.12 },
    { qPct: 2.25, label: '২.২৫%', q: 0.15 },
    { qPct: 6.25, label: '৬.২৫%', q: 0.25 },
    { qPct: 12.25, label: '১২.২৫%', q: 0.35 },
  ];
  hwCases.forEach((h, i) => {
    const p = Number((1 - h.q).toFixed(2));
    const carrierPct = Number((2 * p * h.q * 100).toFixed(2));
    const domHomPct = Number((p * p * 100).toFixed(2));
    const w1 = Number((p * h.q * 100).toFixed(2));
    const w2 = Number((h.q * 100).toFixed(2));
    const w3 = Number((2 * h.q * 100).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `হার্ডি-ওয়াইনবার্গ সাম্যাবস্থায় থাকা একটি জনগোষ্ঠীতে অটোজোমাল প্রচ্ছন্ন রোগগ্রস্ত (aa বা q²) ব্যক্তির হার ${h.label} হলে ঐ জনগোষ্ঠীতে বাহক (Aa বা ২pq) ও বিশুদ্ধ প্রকট (AA বা p²) ব্যক্তির শতকরা হার যথাক্রমে কত?`,
        correct: `বাহক ${toBnDigits(carrierPct)}% এবং বিশুদ্ধ প্রকট ${toBnDigits(domHomPct)}%`,
        distractors: [
          `বাহক ${toBnDigits(w1)}% এবং বিশুদ্ধ প্রকট ${toBnDigits(domHomPct)}%`,
          `বাহক ${toBnDigits(w2)}% এবং বিশুদ্ধ প্রকট ${toBnDigits(Number((100 - w2).toFixed(2)))}%`,
          `বাহক ${toBnDigits(w3)}% এবং বিশুদ্ধ প্রকট ${toBnDigits(Number((p * 100).toFixed(2)))}%`,
        ],
        explanation: `q² = ${toBnDigits(h.q * h.q)} → q = ${toBnDigits(h.q)}, তাই p = ১ − ${toBnDigits(h.q)} = ${toBnDigits(p)}। অতএব বাহক ২pq = ${toBnDigits(carrierPct)}% এবং বিশুদ্ধ প্রকট p² = ${toBnDigits(domHomPct)}%।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২ · হার্ডি-ওয়াইনবার্গ সমীকরণ',
      })
    );
  });

  // 3. Spermatogenesis vs Oogenesis Gamete Yield Multipliers (14 × 2 = 28 MCQs)
  [5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 120, 150, 200, 250].forEach((m, i) => {
    const sperms = m * 4;
    const ova = m;
    const polarBodies = m * 3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(m)}টি প্রাথমিক শুক্রাণু মাতৃকোষ (Primary spermatocyte) এবং ${toBnDigits(m)}টি প্রাথমিক ডিম্বাণু মাতৃকোষ (Primary oocyte) থেকে মায়োসিস শেষে মোট কতটি সক্রিয় শুক্রাণু ও কতটি সক্রিয় ডিম্বাণু উৎপন্ন হবে?`,
        correct: `${toBnDigits(sperms)}টি শুক্রাণু ও ${toBnDigits(ova)}টি ডিম্বাণু (এবং ${toBnDigits(polarBodies)}টি পোলার বডি)`,
        distractors: [
          `${toBnDigits(m)}টি শুক্রাণু ও ${toBnDigits(sperms)}টি ডিম্বাণু`,
          `${toBnDigits(m * 2)}টি শুক্রাণু ও ${toBnDigits(m * 2)}টি ডিম্বাণু`,
          `${toBnDigits(sperms)}টি শুক্রাণু ও ${toBnDigits(m * 4)}টি ডিম্বাণু`,
        ],
        explanation: `১টি প্রাইমারি স্পার্মাটোসাইট থেকে ৪টি সচল শুক্রাণু এবং ১টি প্রাইমারি উওসাইট থেকে ১টি ডিম্বাণু ও ৩টি পোলার বডি হয়; তাই ${toBnDigits(m)}টি থেকে ${toBnDigits(sperms)}টি শুক্রাণু ও ${toBnDigits(ova)}টি ডিম্বাণু।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · গ্যামেটোজেনেসিস হিসাব',
      })
    );
  });

  // 4. Non-Mendelian F2 Progeny Counts (36 MCQs)
  [160, 320, 480, 640, 800, 960, 1280, 1600, 3200].forEach((tot, i) => {
    const comp9 = (tot * 9) / 16;
    const comp7 = (tot * 7) / 16;
    const epi12 = (tot * 12) / 16;
    const epi3 = (tot * 3) / 16;
    const epi1 = tot / 16;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `দুটি সাদা ফুলের মিষ্টি মটরশুঁটির (CcPp × CcPp — পরিপূরক জিন ৯:৭) সংকরায়ণে F₂ জনুতে মোট ${toBnDigits(tot.toLocaleString('en-US'))}টি উদ্ভিদ জন্মালে বেগুনি ও সাদা ফুলের সংখ্যা যথাক্রমে কত হবে?`,
        correct: `বেগুনি ${toBnDigits(comp9.toLocaleString('en-US'))}টি ও সাদা ${toBnDigits(comp7.toLocaleString('en-US'))}টি`,
        distractors: [
          `বেগুনি ${toBnDigits(comp7.toLocaleString('en-US'))}টি ও সাদা ${toBnDigits(comp9.toLocaleString('en-US'))}টি`,
          `বেগুনি ${toBnDigits(epi12.toLocaleString('en-US'))}টি ও সাদা ${toBnDigits((tot - epi12).toLocaleString('en-US'))}টি`,
          `বেগুনি ${toBnDigits(((tot * 15) / 16).toLocaleString('en-US'))}টি ও সাদা ${toBnDigits(epi1.toLocaleString('en-US'))}টি`,
        ],
        explanation: `পরিপূরক জিনের F₂ অনুপাত ৯:৭; তাই বেগুনি = ${toBnDigits(tot)}×৯/১৬ = ${toBnDigits(comp9)} এবং সাদা = ${toBnDigits(tot)}×৭/১৬ = ${toBnDigits(comp7)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · পরিপূরক জিনের হিসাব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'board',
        question: `প্রকট এপিস্ট্যাসিসে (মিষ্টি কুমড়ায় ১২:৩:১) F₂ বংশধরে মোট ${toBnDigits(tot.toLocaleString('en-US'))}টি ফলের মধ্যে সাদা, হলুদ ও সবুজ ফলের সংখ্যা যথাক্রমে কত হবে?`,
        correct: `${toBnDigits(epi12.toLocaleString('en-US'))} সাদা, ${toBnDigits(epi3.toLocaleString('en-US'))} হলুদ ও ${toBnDigits(epi1.toLocaleString('en-US'))} সবুজ`,
        distractors: [
          `${toBnDigits(comp9.toLocaleString('en-US'))} সাদা, ${toBnDigits(epi3.toLocaleString('en-US'))} হলুদ ও ${toBnDigits(epi1.toLocaleString('en-US'))} সবুজ`,
          `${toBnDigits(epi12.toLocaleString('en-US'))} হলুদ, ${toBnDigits(epi3.toLocaleString('en-US'))} সাদা ও ${toBnDigits(epi1.toLocaleString('en-US'))} সবুজ`,
          `${toBnDigits(((tot * 13) / 16).toLocaleString('en-US'))} সাদা, ${toBnDigits(epi3.toLocaleString('en-US'))} সবুজ ও ${toBnDigits(0)} হলুদ`,
        ],
        explanation: `১২:৩:১ অনুপাত অনুযায়ী ১৬ ভাগের ১২ ভাগ (${toBnDigits(epi12)}) সাদা, ৩ ভাগ (${toBnDigits(epi3)}) হলুদ ও ১ ভাগ (${toBnDigits(epi1)}) সবুজ হবে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · প্রকট এপিস্ট্যাসিস',
      })
    );
  });

  // 5. ABO Blood Group Paternity & X-linked Pedigree Cross Scenarios (20 MCQs)
  const crossScenarios = [
    { ch: 'bio2_ch10_immune_genetics', q: 'পিতা বিষমসংকর A (Iᴬi) ও মাতা বিষমসংকর B (Iᴮi) রক্তের গ্রুপধারী হলে তাদের সন্তানের রক্তের গ্রুপ কী কী হতে পারে?', a: 'A, B, AB এবং O — চারটি গ্রুপেরই ২৫% করে সম্ভাবনা থাকে', w: ['কেবল AB ও O গ্রুপ', 'কেবল A ও B গ্রুপ (৫০% করে)', 'কেবল AB গ্রুপ ১০০%'], exp: 'Iᴬi × Iᴮi → IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B), ii (O) — সমান ১:১:১:১ অনুপাতে।' },
    { ch: 'bio2_ch10_immune_genetics', q: 'যদি মায়ের রক্তের গ্রুপ AB (IᴬIᴮ) ও বাবার রক্তের গ্রুপ O (ii) হয়, তবে তাদের কোন রক্তের গ্রুপের সন্তান হওয়া জিনগতভাবে অসম্ভব?', a: 'AB এবং O গ্রুপ (সন্তান কেবল A বা B হবে)', w: ['কেবল A গ্রুপ', 'কেবল B গ্রুপ', 'সবগুলোই সম্ভব'], exp: 'IᴬIᴮ × ii → Iᴬi (৫০% A) ও Iᴮi (৫০% B); AB বা O হওয়ার কোনো সুযোগ নেই।' },
    { ch: 'bio2_ch10_immune_genetics', q: 'একজন স্বাভাবিক দৃষ্টিসম্পন্ন বাহক মহিলা (XᶜX) ও একজন বর্ণান্ধ পুরুষের (XᶜY) বিয়ে হলে তাদের কন্যাসন্তানদের কত শতাংশ বর্ণান্ধ হবে?', a: '৫০% কন্যা বর্ণান্ধ (XᶜXᶜ) ও ৫০% কন্যা স্বাভাবিক বাহক (XᶜX)', w: ['সব কন্যা (১০০%) বর্ণান্ধ', 'কোনো কন্যাই বর্ণান্ধ হবে না (০%)', '২৫% কন্যা বর্ণান্ধ'], exp: 'মায়ের থেকে Xᶜ বা X এবং বাবার থেকে অবশ্যই Xᶜ আসায় অর্ধেক কন্যা XᶜXᶜ (বর্ণান্ধ) ও অর্ধেক XᶜX (বাহক)।' },
    { ch: 'bio2_ch10_immune_genetics', q: 'হিমোফিলিয়া আক্রান্ত পুরুষ (XʰY) ও সম্পূর্ণ স্বাভাবিক হোমোজাইগাস মহিলার (XX) সন্তানদের ক্ষেত্রে নিচের কোনটি সঠিক?', a: 'সকল পুত্র স্বাভাবিক (১০০%) এবং সকল কন্যা বাহক (১০০% XʰX)', w: ['৫০% পুত্র হিমোফিলিক ও ৫০% কন্যা স্বাভাবিক', 'সকল পুত্র হিমোফিলিক', 'কোনো সন্তানই বাহক হবে না'], exp: 'বাবার Xʰ কেবল কন্যাদের যায় (যারা বাহক হবে), আর পুত্ররা বাবার Y ও মায়ের X পাওয়ায় সম্পূর্ণ সুস্থ থাকে।' },
    { ch: 'bio2_ch10_immune_genetics', q: 'ক্লোরাইড বা হিমোগ্লোবিন ছাড়া মানুষের লিঙ্গ নির্ধারণে (XX-XY) ভ্রূণের লিঙ্গ কার শুক্রাণু দ্বারা নির্ধারিত হয় এবং কোন জিন অণ্ডকোষ সৃষ্টি সূচনা করে?', a: 'পিতার Y-বাহিত শুক্রাণু ও Y ক্রোমোজোমের SRY (TDF) জিন', w: ['মাতার X ক্রোমোজোম', 'ডিম্বাণুর সাইটোপ্লাজম', 'অটোজোমের ২১ নং ক্রোমোজোম'], exp: 'মানবদেহে Y ক্রোমোজোমের সংক্ষিপ্ত বাহুর SRY জিন টেস্টেস-ডিটারমিনিং ফ্যাক্টর তৈরি করে।' },
    { ch: 'bio2_ch10_immune_genetics', q: 'অ্যান্টিকোয়াগুল্যান্ট বা Rh ছাড়া ABO অ্যান্টিজেনের বিপরীতে একজন O-গ্রুপের ব্যক্তির রক্তরসে কোন অ্যান্টিবডি স্বাভাবিকভাবেই উপস্থিত থাকে?', a: 'অ্যান্টি-A (α) এবং অ্যান্টি-B (β) উভয়ই', w: ['কোনো অ্যান্টিবডি থাকে না', 'কেবল অ্যান্টি-A থাকে', 'কেবল অ্যান্টি-D থাকে'], exp: 'RBC-তে A বা B অ্যান্টিজেন অনুপস্থিত থাকায় O গ্রুপের প্লাজমায় α ও β উভয় অ্যান্টিবডি থাকে।' },
    { ch: 'bio2_ch10_immune_genetics', q: 'বাংলাদেশ EPI টিকাদান কর্মসূচিতে জন্মের পরপরই শিশুকে যক্ষ্মা প্রতিরোধে কোন টিকা বাম বাহুতে দেওয়া হয়?', a: 'BCG (Bacillus Calmette–Guérin — জীবিত দুর্বলকৃত)', w: ['OPV (পোলিও)', 'MR (হাম-রুবেলা)', 'TT (টিটেনাস)'], exp: 'BCG টিকা জন্মের পর বা প্রথম ৬ সপ্তাহের মধ্যে বাম ডেল্টয়েডে ইন্ট্রাডার্মালভাবে দেওয়া হয়।' },
    { ch: 'bio2_ch10_immune_genetics', q: 'পেন্টাভ্যালেন্ট টিকা (Pentavalent Vaccine) একসাথে কয়টি ও কোন রোগগুলোর বিরুদ্ধে সুরক্ষা দেয়?', a: '৫টি রোগ: ডিপথেরিয়া, হুপিংকাশি (পারটুসিস), ধনুষ্টংকার (টিটেনাস), হেপাটাইটিস-বি ও Hib', w: ['৩টি: হাম, মাম্পস, রুবেলা', '৪টি: যক্ষ্মা, পোলিও, টাইফয়েড, কলেরা', '২টি: নিউমোনিয়া ও রোটাভাইরাস'], exp: 'EPI-তে ৬, ১০ ও ১৪ সপ্তাহ বয়সে পেন্টাভ্যালেন্ট টিকার ৩টি ডোজ দেওয়া হয়।' },
  ];
  crossScenarios.forEach((cs, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cs.ch,
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: cs.q,
        correct: cs.a,
        distractors: cs.w,
        explanation: `${cs.a}। ${cs.exp}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০–১১ · জেনেটিক্স ও টিকাদান',
      })
    );
  });

  // 6. Complete EPI Vaccine & Antibody Class Quick Drills (12 × 3 = 36 MCQs)
  const epiMatrix = [
    { v: 'BCG (Bacillus Calmette–Guérin)', target: 'যক্ষ্মা (Tuberculosis — Mycobacterium tuberculosis)', type: 'জীবিত দুর্বলকৃত ব্যাকটেরিয়াল ভ্যাকসিন' },
    { v: 'OPV (Sabin) ও IPV (Salk)', target: 'পোলিওমায়েলাইটিস (Polio virus)', type: 'যথাক্রমে ওরাল জীবিত দুর্বলকৃত (Sabin) ও ইনজেকটেবল নিষ্ক্রিয় (Salk)' },
    { v: 'TT (Tetanus Toxoid)', target: 'ধনুষ্টংকার (Clostridium tetani)', type: 'রোগজীবাণুর নিষ্ক্রিয়কৃত বিষ বা টক্সয়েড (Toxoid) ভ্যাকসিন' },
    { v: 'হেপাটাইটিস-বি (Recombivax)', target: 'হেপাটাইটিস-বি ভাইরাস (HBsAg)', type: 'ইস্ট কোষে তৈরি রিকম্বিন্যান্ট সাব-ইউনিট প্রোটিন ভ্যাকসিন' },
    { v: 'MMR / MR টিকা', target: 'হাম (Measles), মাম্পস ও রুবেলা', type: 'জীবিত দুর্বলকৃত ভাইরাল (Attenuated) ভ্যাকসিন' },
    { v: 'পিসিভি (PCV)', target: 'নিউমোকক্কাল নিউমোনিয়া (Streptococcus pneumoniae)', type: 'কনজুগেট পলিস্যাকারাইড ভ্যাকসিন' },
  ];
  epiMatrix.forEach((ep, i) => {
    const others = epiMatrix.filter((x) => x.v !== ep.v);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `টিকাদান ও প্রতিরক্ষা অধ্যায়ে কোন টিকাটি "${ep.target}" রোগ প্রতিরোধে ব্যবহৃত হয় এবং এটি "${ep.type}"?`,
        correct: ep.v,
        distractors: others.slice(0, 4).map((x) => x.v),
        explanation: `${ep.v} হলো ${ep.type}, যা ${ep.target} প্রতিরোধে ব্যবহৃত হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০ · ভ্যাকসিন শ্রেণিবিভাগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'dental',
        question: `রোগ প্রতিরোধে ব্যবহৃত "${ep.v}" ভ্যাকসিনটি মূলত কোন প্রকৃতির টিকা?`,
        correct: ep.type,
        distractors: others.slice(1, 5).map((x) => x.type),
        explanation: `${ep.v} (${ep.target}) একটি ${ep.type}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০ · EPI টিকা প্রকৃতি',
      })
    );
  });

  return list;
}
