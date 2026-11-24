import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

// 60 Additional World Countries: Capital, Currency & Parliamentary/Key Identity (60 × 3 = 180 MCQs)
const EXTRA_COUNTRIES_BANK: Array<{ country: string; capital: string; currency: string; parliament: string }> = [
  { country: 'জার্মানি', capital: 'বার্লিন', currency: 'ইউরো (Euro)', parliament: 'বুন্ডেসট্যাগ (Bundestag)' },
  { country: 'ফ্রান্স', capital: 'প্যারিস', currency: 'ইউরো', parliament: 'ন্যাশনাল অ্যাসেম্বলি (সিনেট)' },
  { country: 'যুক্তরাজ্য (UK)', capital: 'লন্ডন', currency: 'পাউন্ড স্টার্লিং', parliament: 'ব্রিটিশ পার্লামেন্ট (হাউস অব কমন্স ও লর্ডস)' },
  { country: 'যুক্তরাষ্ট্র (USA)', capital: 'ওয়াশিংটন ডিসি', currency: 'মার্কিন ডলার', parliament: 'কংগ্রেস (সিনেট ও হাউস অব রিপ্রেজেন্টেটিভস)' },
  { country: 'ভারত', capital: 'নয়াদিল্লি', currency: 'ভারতীয় রুপি', parliament: 'সংসদ (লোকসভা ও রাজ্যসভা)' },
  { country: 'পাকিস্তান', capital: 'ইসলামাবাদ', currency: 'পাকিস্তানি রুপি', parliament: 'মজলিস-ই-শুরা' },
  { country: 'মিয়ানমার (পূর্ব নাম বার্মা)', capital: 'নেপিডো (পূর্বে ইয়াঙ্গুন)', currency: 'কিয়াট (Kyat)', parliament: 'পিইদাউংসু হ্লুত্তাও' },
  { country: 'ইতালি', capital: 'রোম', currency: 'ইউরো', parliament: 'চেম্বার অব ডেপুটিজ ও সিনেট' },
  { country: 'স্পেন', capital: 'মাদ্রিদ', currency: 'ইউরো', parliament: 'কর্টেস জেনারালস (Cortes)' },
  { country: 'ইউক্রেন', capital: 'কিয়েভ (Kyiv)', currency: 'হ্রিভনিয়া (Hryvnia)', parliament: 'ভেরখোভনা রাদা' },
  { country: 'সিঙ্গাপুর', capital: 'সিঙ্গাপুর সিটি', currency: 'সিঙ্গাপুর ডলার', parliament: 'সিঙ্গাপুর পার্লামেন্ট (নগররাষ্ট্র)' },
  { country: 'মঙ্গোলিয়া', capital: 'উলানবাটর', currency: 'তোগরোগ (Tögrög)', parliament: 'স্টেট গ্রেট খুরাল' },
  { country: 'উজবেকিস্তান', capital: 'তাশখন্দ', currency: 'সোম (Som)', parliament: 'ওলি মজলিস (মধ্য এশিয়ার ডাবল ল্যান্ডলকড দেশ)' },
  { country: 'আজারবাইজান', capital: 'বাকু', currency: 'মানাত (Manat)', parliament: 'মিল্লি মজলিস (COP-29 আয়োজক ২০২৪)' },
  { country: 'জর্জিয়া', capital: 'তিবিলিসি', currency: 'লারি (Lari)', parliament: 'জর্জিয়ান পার্লামেন্ট (ককেশাস অঞ্চল)' },
  { country: 'আর্মেনিয়া', capital: 'ইয়েরেভান', currency: 'দ্রাম (Dram)', parliament: 'ন্যাশনাল অ্যাসেম্বলি' },
  { country: 'হাঙ্গেরি', capital: 'বুদাপেস্ট', currency: 'ফোরিন্ট (Forint)', parliament: 'ওরসাগিউলেস (ন্যাশনাল অ্যাসেম্বলি)' },
  { country: 'রোমানিয়া', capital: 'বুখারেস্ট', currency: 'লিউ (Leu)', parliament: 'দ্বিকক্ষবিশিষ্ট রোমানিয়ান পার্লামেন্ট' },
  { country: 'চেক প্রজাতন্ত্র (চেকিয়া)', capital: 'প্রাগ', currency: 'চেক কোরুনা (Koruna)', parliament: 'চেম্বার অব ডেপুটিজ' },
  { country: 'বুলগেরিয়া', capital: 'সোফিয়া', currency: 'লেভ (Lev)', parliament: 'নারোদনো সাবরানিয়ে' },
  { country: 'আয়ারল্যান্ড', capital: 'ডাবলিন', currency: 'ইউরো', parliament: 'ইর‍্যাখটাস (Oireachtas — ডেইল ও সিনাদ)' },
  { country: 'কম্বোডিয়া', capital: 'নমপেন', currency: 'রিয়েল (Riel)', parliament: 'জাতীয় পরিষদ (আঙ্করভাট মন্দিরের দেশ)' },
  { country: 'লাওস', capital: 'ভিয়েনতিয়েন', currency: 'কিপ (Kip)', parliament: 'দক্ষিণ-পূর্ব এশিয়ার একমাত্র স্থলবেষ্টিত দেশ' },
  { country: 'ব্রুনাই', capital: 'বন্দর সেরি বেগাওয়ান', currency: 'ব্রুনাই ডলার', parliament: 'সুলতানি আইনসভা (বোর্নিও দ্বীপে অবস্থিত)' },
  { country: 'পূর্ব তিমুর (তিমুর-লেস্তে)', capital: 'দিলি', currency: 'মার্কিন ডলার', parliament: 'ন্যাশনাল পার্লামেন্ট (এশিয়ার নবীনতম রাষ্ট্র ২০০২)' },
  { country: 'ওমান', capital: 'মাস্কাট', currency: 'ওমানি রিয়াল', parliament: 'মজলিস আল-শুরা' },
  { country: 'কুয়েত', capital: 'কুয়েত সিটি', currency: 'কুয়েতি দিনার (বিশ্বের সর্বোচ্চ মূল্যমানের মুদ্রা)', parliament: 'মজলিস আল-উম্মাহ' },
  { country: 'বাহরাইন', capital: 'মানামা', currency: 'বাহরাইনি দিনার', parliament: 'মজলিস আল-নুওয়াব (পারস্য উপসাগরের দ্বীপরাষ্ট্র)' },
  { country: 'ইয়েমেন', capital: 'সানা', currency: 'ইয়েমেনি রিয়াল', parliament: 'হাউস অব রিপ্রেজেন্টেটিভস (সোকোত্রা দ্বীপ)' },
  { country: 'লেবানন', capital: 'বৈরুত', currency: 'লেবানিজ পাউন্ড', parliament: 'মজলিস আল-নুওয়াব (সিডার বৃক্ষের প্রতীক)' },
  { country: 'সিরিয়া', capital: 'দামেস্ক (বিশ্বের অন্যতম প্রাচীন জনবসতি শহর)', currency: 'সিরিয়ান পাউন্ড', parliament: 'পিপলস অ্যাসেম্বলি' },
  { country: 'তিউনিসিয়া', capital: 'তিউনিস', currency: 'তিউনিসিয়ান দিনার', parliament: 'আরব বসন্তের সূচনাস্থল (২০১০)' },
  { country: 'আলজেরিয়া', capital: 'আলজিয়ার্স', currency: 'আলজেরিয়ান দিনার', parliament: 'আফ্রিকার আয়তনে বৃহত্তম দেশ' },
  { country: 'সুদান', capital: 'খার্তুম (সাদা ও নীল নীলনদের মিলনস্থল)', currency: 'সুদানিজ পাউন্ড', parliament: 'ট্রানজিশনাল লেজিসলেচার' },
  { country: 'ঘানা (পূর্ব নাম গোল্ড কোস্ট)', capital: 'আক্রা', currency: 'সেডি (Cedi)', parliament: 'পার্লামেন্ট অব ঘানা (কফি আনানের জন্মভূমি)' },
  { country: 'সেনেগাল', capital: 'ডাকার', currency: 'সিএফএ ফ্রাঁ (CFA Franc)', parliament: 'আফ্রিকার প্রথম বাংলাদেশকে স্বীকৃতিদানকারী দেশ' },
  { country: 'তানজানিয়া', capital: 'দোদোমা (বৃহত্তম শহর দারুস সালাম)', currency: 'তানজানিয়ান শিলিং', parliament: 'আফ্রিকার সর্বোচ্চ পর্বত মাউন্ট কিলিমানজারোর দেশ' },
  { country: 'উগান্ডা', capital: 'কাম্পালা', currency: 'উগান্ডান শিলিং', parliament: 'ভিক্টোরিয়া হ্রদের তীরবর্তী পার্ল অব আফ্রিকা' },
  { country: 'জিম্বাবুয়ে (পূর্ব নাম দক্ষিণ রোডেশিয়া)', capital: 'হারারে (পূর্ব নাম স্যালিসবারি)', currency: 'জিগ / ডলার', parliament: 'ভিক্টোরিয়া জলপ্রপাতের দেশ' },
  { country: 'নামিবিয়া (পূর্ব নাম দক্ষিণ-পশ্চিম আফ্রিকা)', capital: 'উইন্ডহোক', currency: 'নামিবিয়ান ডলার', parliament: 'নামিব মরুভূমি অবস্থিত' },
  { country: 'ভেনেজুয়েলা', capital: 'কারাকাস', currency: 'বলিভার (Bolívar)', parliament: 'বিশ্বের উচ্চতম অ্যাঞ্জেল জলপ্রপাত ও বৃহৎ তেল মজুদ' },
  { country: 'উরুগুয়ে', capital: 'মন্টেভিডিও', currency: 'উরুগুয়েন পেসো', parliament: 'প্রথম ফিফা বিশ্বকাপ আয়োজক ও চ্যাম্পিয়ন (১৯৩০)' },
  { country: 'প্যারাগুয়ে', capital: 'আসুনসিওন', currency: 'গুয়ারানি (Guaraní)', parliament: 'দক্ষিণ আমেরিকার স্থলবেষ্টিত দেশ' },
  { country: 'বলিভিয়া', capital: 'সুক্রে (সাংবিধানিক) ও লা পাজ (প্রশাসনিক)', currency: 'বলিভিয়ানো', parliament: 'টিটিকাকা হ্রদ ও স্থলবেষ্টিত অ্যান্ডিয়ান রাষ্ট্র' },
  { country: 'ইকুয়েডর', capital: 'কুইটো (বিষুবরেখার ওপর অবস্থিত)', currency: 'মার্কিন ডলার', parliament: 'ডারউইনের বিবর্তনবাদের গ্যালাপাগোস দ্বীপপুঞ্জের দেশ' },
  { country: 'পানামা', capital: 'পানামা সিটি', currency: 'বালবোয়া / মার্কিন ডলার', parliament: 'পানামা খাল ও দুই আমেরিকার সংযোগস্থল' },
  { country: 'জ্যামাইকা', capital: 'কিংস্টন', currency: 'জ্যামাইকান ডলার', parliament: 'দ্রুততম মানব উসাইন বোল্টের দেশ' },
  { country: 'ক্রোয়েশিয়া', capital: 'জাগরেব', currency: 'ইউরো (পূর্বে কুনা)', parliament: 'সাবোর (Sabor — অ্যাড্রিয়াটিক উপকূলীয় দেশ)' },
  { country: 'বেলারুশ', capital: 'মিনস্ক', currency: 'বেলারুশিয়ান রুবল', parliament: 'ইউরোপের স্থলবেষ্টিত প্রজাতন্ত্র' },
  { country: 'কসোভো', capital: 'প্রিস্টিনা', currency: 'ইউরো', parliament: 'দক্ষিণ-পূর্ব ইউরোপের নবীন রাষ্ট্র (২০০৮)' },
];

// 80 World Rivers, Deserts, Mountains, Lakes & Oceans Geo Facts (80 × 2 = 160 MCQs)
const WORLD_PHYSICAL_GEO: Array<{ feature: string; ans: string }> = [
  { feature: 'পৃথিবীর দীর্ঘতম নদী নীলনদ (৬,৬৫০ কিমি) কোন হ্রদ থেকে উৎপন্ন হয়ে কোথায় পড়েছে', ans: 'ভিক্টোরিয়া হ্রদ (হোয়াইট নীল) ও ইথিওপিয়ার তানা হ্রদ থেকে উৎপন্ন হয়ে ভূমধ্যসাগরে পড়েছে' },
  { feature: 'পানিপ্রবাহ ও অববাহিকার আয়তনে বিশ্বের বৃহত্তম নদী কোনটি', ans: 'আমাজন নদী (দক্ষিণ আমেরিকা, আটলান্টিক মহাসাগরে পতিত)' },
  { feature: 'কোন নদী বিষুবরেখাকে দুবার অতিক্রম করেছে এবং কোন নদী মকরক্রান্তিকে দুবার অতিক্রম করেছে', ans: 'কঙ্গো (জায়ারে) নদী বিষুবরেখাকে ও লিম্পোপো নদী মকরক্রান্তিকে দুবার অতিক্রম করেছে' },
  { feature: 'ইউরোপের দীর্ঘতম নদী কোনটি (যা কাস্পিয়ান সাগরে পতিত হয়েছে)', ans: 'ভলগা নদী (রাশিয়া)' },
  { feature: 'ইউরোপের ১০টি দেশের মধ্য দিয়ে প্রবাহিত আন্তর্জাতিক নদী কোনটি', ans: 'দানিয়ুব নদী (কৃষ্ণ সাগরে পতিত; ৪টি রাজধানীর মধ্য দিয়ে যায়)' },
  { feature: 'উত্তর আমেরিকার দীর্ঘতম নদী ব্যবস্থা কোনটি', ans: 'মিসিসিপি-মিসৌরি নদী ব্যবস্থা' },
  { feature: 'অস্ট্রেলিয়ার দীর্ঘতম নদী ব্যবস্থা কোন দুটি নদীর সমন্বয়ে গঠিত', ans: 'মারে-ডার্লিং নদী (Murray-Darling)' },
  { feature: 'মৃত সাগর (Dead Sea) কোন দুটি দেশের সীমান্তে অবস্থিত ও কেন মানুষ এতে ডুবে যায় না', ans: 'জর্ডান ও ইসরায়েল-পশ্চিম তীর; উচ্চ লবণাক্ততা (~৩৪%) ও ঘনত্বের কারণে' },
  { feature: 'পৃথিবীর শুষ্কতম স্থান (বৃষ্টিপাতহীন মরুভূমি) "আতাকামা মরুভূমি" কোন দেশে অবস্থিত', ans: 'চিলি (দক্ষিণ আমেরিকা)' },
  { feature: 'আফ্রিকার দক্ষিণাংশের বিখ্যাত "কালাহারি মরুভূমি" প্রধানত কোন দেশে বিস্তৃত', ans: 'বতসোয়ানা (এছাড়া নামিবিয়া ও দক্ষিণ আফ্রিকা)' },
  { feature: 'আয়তনে বিশ্বের বৃহত্তম অবিচ্ছিন্ন বালুকাময় মরুভূমি "রুব আল-খালি" (Empty Quarter) কোথায় অবস্থিত', ans: 'আরব উপদ্বীপ (মূলত সৌদি আরব)' },
  { feature: 'উত্তর আমেরিকার উত্তর-পূর্ব ও কানাডা সীমান্তের ৫টি বৃহৎ স্বাদুপানির হ্রদ (Great Lakes) কী কী', ans: 'সুপিরিয়র, মিশিগান, হিউরন, ইরি ও অন্টারিও (HOMES)' },
  { feature: 'আফ্রিকার সর্বোচ্চ শৃঙ্গ "মাউন্ট কিলিমানজারো" (৫,৮৯৫ মিটার — সুপ্ত আগ্নেয়গিরি) কোন দেশে অবস্থিত', ans: 'তানজানিয়া' },
  { feature: 'ইউরোপের মূল অংশের সর্বোচ্চ পর্বতশৃঙ্গ "মাউন্ট এলব্রাস" (ককেশাস) ও পশ্চিম ইউরোপের "মঁ ব্লাঁ" (আল্পস) কোথায়', ans: 'মাউন্ট এলব্রাস (রাশিয়া) ও মঁ ব্লাঁ (ফ্রান্স-ইতালি সীমান্ত)' },
  { feature: 'উত্তর আমেরিকার সর্বোচ্চ শৃঙ্গ "ডেনালি" (মাউন্ট ম্যাককিনলে) কোথায় অবস্থিত', ans: 'আলাস্কা, যুক্তরাষ্ট্র' },
  { feature: 'দক্ষিণ আমেরিকার তথা পশ্চিম গোলার্ধের সর্বোচ্চ পর্বতশৃঙ্গ "অ্যাকনকাগুয়া" কোন দেশে অবস্থিত', ans: 'আর্জেন্টিনা (আন্দিজ পর্বতমালা)' },
  { feature: 'ভারত ও নেপাল থেকে প্রবাহিত নদীগুলোর মতো এশিয়া ও ইউরোপকে পৃথককারী প্রাকৃতিক পর্বতমালা ও নদী কোনটি', ans: 'উরাল পর্বতমালা, উরাল নদী ও ককেশাস পর্বতমালা' },
  { feature: 'সিনাই উপদ্বীপ কোন দেশের অংশ ও এশিয়া-আফ্রিকাকে সংযুক্ত করেছে', ans: 'মিশরের এশীয় অংশ (সুয়েজ খাল দ্বারা বিভক্ত)' },
  { feature: 'বিশ্বের বৃহত্তম উপদ্বীপ (Peninsula) কোনটি', ans: 'আরব উপদ্বীপ (Arabian Peninsula)' },
  { feature: 'পৃথিবীর একমাত্র মহাদেশ যা চারটি গোলার্ধেই (উত্তর, দক্ষিণ, পূর্ব, পশ্চিম) বিস্তৃত', ans: 'আফ্রিকা মহাদেশ' },
  { feature: 'সর্বাধিক সংখ্যক দেশ কোন মহাদেশে অবস্থিত (৫৪টি সার্বভৌম রাষ্ট্র)', ans: 'আফ্রিকা মহাদেশ' },
  { feature: 'কোন মহাসাগরের আকৃতি ইংরেজি "S" অক্ষরের মতো এবং কোন মহাসাগরে সর্বাধিক "রিং অব ফায়ার" আগ্নেয়গিরি রয়েছে', ans: 'আটলান্টিক মহাসাগরের আকৃতি "S"-এর মতো; প্রশান্ত মহাসাগরে "Ring of Fire"' },
  { feature: 'বিশ্বের গভীরতম ও প্রশস্ততম মহাসাগরীয় বেল্ট প্রশান্ত মহাসাগরে সৃষ্ট ভয়াবহ ঘূর্ণিঝড় পূর্ব এশিয়ায় কী নামে পরিচিত', ans: 'টাইফুন (Typhoon — চীন/জাপান সাগরে; আমেরিকায় হারিকেন এবং বঙ্গোপসাগরে সাইক্লোন)' },
  { feature: 'পৃথিবীর বায়ুমণ্ডলীয় চাপের কারণে সৃষ্ট কোন বায়ুকে "বাণিজ্য বায়ু" (Trade Winds) বলে', ans: 'অয়ন বায়ু (উপক্রান্তীয় উচ্চচাপ বলয় থেকে নিরক্ষীয় নিম্নচাপের দিকে প্রবাহিত)' },
  { feature: 'পৃথিবীতে দিন-রাত সমান হয় বছরের কোন দুটি তারিখে (জলবিষুব ও মহাবিষুব)', ans: '২১শে মার্চ (মহাবিষুব) ও ২৩শে সেপ্টেম্বর (জলবিষুব)' },
  { feature: 'উত্তর গোলার্ধে বছরের দীর্ঘতম দিন ও ক্ষুদ্রতম রাত এবং ক্ষুদ্রতম দিন যথাক্রমে কোন দুটি তারিখ', ans: '২১শে জুন (দীর্ঘতম দিন) এবং ২২শে ডিসেম্বর (ক্ষুদ্রতম দিন)' },
  { feature: 'সূর্যের নিকটতম গ্রহ, পৃথিবীর যমজ গ্রহ এবং বলয়যুক্ত গ্রহ যথাক্রমে কোন তিনটি', ans: 'বুধ (নিকটতম), শুক্র (পৃথিবীর যমজ) এবং শনি (উজ্জ্বল বলয়যুক্ত)' },
  { feature: 'মঙ্গল ও বৃহস্পতি গ্রহের কক্ষপথের মাঝখানে অবস্থিত ক্ষুদ্র পাথুরে মহাজাগতিক বস্তুগুলোর বেল্ট কী নামে পরিচিত', ans: 'গ্রহাণুপুঞ্জ বা Asteroid Belt' },
  { feature: 'সূর্য থেকে পৃথিবীতে আলো আসতে এবং চাঁদ থেকে পৃথিবীতে আলো আসতে আনুমানিক কত সময় লাগে', ans: 'সূর্য থেকে প্রায় ৮ মিনিট ১৯ সেকেন্ড (৫০০ সে.) এবং চাঁদ থেকে প্রায় ১.৩ সেকেন্ড' },
  { feature: 'গ্রিনিচ মান সময় (GMT / UTC 0°) থেকে বাংলাদেশের স্থানীয় সময় (BST) কত ঘণ্টা এগিয়ে', ans: '৬ ঘণ্টা এগিয়ে (UTC +6:00 — ৯০° পূর্ব দ্রাঘিমা অনুযায়ী)' },
];

export function buildGkStructuredN(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `gksn_${String(seq++).padStart(4, '0')}`;

  // 1. 50 Countries × 3 = 150 MCQs
  EXTRA_COUNTRIES_BANK.forEach((c, i) => {
    const others = EXTRA_COUNTRIES_BANK.filter((x) => x.country !== c.country);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${c.country}" রাষ্ট্রের রাজধানীর নাম কী?`,
        correct: c.capital,
        distractors: others.slice(i % 25, (i % 25) + 6).map((x) => x.capital),
        explanation: `${c.country}-এর রাজধানী ${c.capital}, মুদ্রা ${c.currency} এবং আইনসভা/বৈশিষ্ট্য: ${c.parliament}।`,
        reference: 'সাধারণ জ্ঞান · বিশ্ব রাজধানী',
      })
    );

    const uniqueCurrencies = Array.from(new Set(others.map((x) => x.currency))).filter((cur) => cur !== c.currency);
    const currencyOffset = i % uniqueCurrencies.length;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `"${c.country}"-এর প্রচলিত মুদ্রা কোনটি?`,
        correct: c.currency,
        distractors: [...uniqueCurrencies.slice(currencyOffset), ...uniqueCurrencies.slice(0, currencyOffset)].slice(0, 6),
        explanation: `${c.country}-এর সরকারি মুদ্রা হলো ${c.currency}।`,
        reference: 'সাধারণ জ্ঞান · দেশের মুদ্রা',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'dental' : 'medical',
        question: `"${c.parliament}" — এটি নিচের কোন দেশের আইনসভা বা পরিচিতি?`,
        correct: c.country,
        distractors: others.slice((i + 15) % 25, ((i + 15) % 25) + 6).map((x) => x.country),
        explanation: `${c.country} (${c.capital}): ${c.parliament}।`,
        reference: 'সাধারণ জ্ঞান · দেশের সংসদ ও তথ্য',
      })
    );
  });

  // 2. 30 World Physical Geography & Astronomy × 2 = 60 MCQs
  WORLD_PHYSICAL_GEO.forEach((w, i) => {
    const others = WORLD_PHYSICAL_GEO.filter((x) => x.ans !== w.ans);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${w.feature}?`,
        correct: w.ans,
        distractors: others.slice(i % 15, (i % 15) + 6).map((x) => x.ans),
        explanation: `${w.feature} — উত্তর: ${w.ans}।`,
        reference: 'সাধারণ জ্ঞান · বিশ্ব ভৌত ভূগোল ও মহাকাশ',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `বিশ্ব ভূগোলের "${w.ans}" তথ্যটি নিচের কোন প্রশ্নের সঠিক উত্তর?`,
        correct: w.feature,
        distractors: others.slice((i + 10) % 15, ((i + 10) % 15) + 6).map((x) => x.feature),
        explanation: `${w.feature} → ${w.ans}।`,
        reference: 'সাধারণ জ্ঞান · ভৌত ভূগোল',
      })
    );
  });

  return list;
}
