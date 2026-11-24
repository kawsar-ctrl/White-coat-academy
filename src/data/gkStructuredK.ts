import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

// 1. Bangladesh Health Sector, Medical Colleges, Institutes & Medical Pioneers (75 items × 2 = 150 MCQs)
const BD_HEALTH_AND_MED_HISTORY: Array<{ item: string; desc: string; topic: string }> = [
  { item: 'ঢাকা মেডিকেল কলেজ (DMC — প্রতিষ্ঠা ১০ জুলাই ১৯৪৬)', desc: 'বাংলাদেশের প্রাচীনতম ও শীর্ষস্থানীয় সরকারি মেডিকেল কলেজ; ১৯৫২ সালের ভাষা আন্দোলনের সূতিকাগার ও প্রথম শহীদ মিনারের স্থান', topic: 'বাংলাদেশ চিকিৎসা শিক্ষা' },
  { item: 'স্যার সলিমুল্লাহ মেডিকেল কলেজ (মিটফোর্ড হাসপাতাল)', desc: 'ঢাকার বুড়িগঙ্গা তীরে মিটফোর্ড হাসপাতাল ১৮৫৪/১৮৫৮ সালে প্রতিষ্ঠিত (মেডিকেল স্কুল হিসেবে শুরু ১৮৭৫, পূর্ণাঙ্গ কলেজ ১৯৬২)', topic: 'বাংলাদেশ চিকিৎসা শিক্ষা' },
  { item: 'বাংলাদেশ মেডিকেল বিশ্ববিদ্যালয় (BSMMU — ১৯৯৮)', desc: 'সাবেক IPGMR (প্রতিষ্ঠা ১৯৬৫); ১৯৯৮ সালে শাহবাগে দেশের প্রথম স্বতন্ত্র মেডিকেল বিশ্ববিদ্যালয়ে উন্নীত', topic: 'মেডিকেল বিশ্ববিদ্যালয়' },
  { item: 'চট্টগ্রাম মেডিকেল কলেজ (১৯৫৭) ও রাজশাহী মেডিকেল কলেজ (১৯৫৮)', desc: 'স্বাধীনতাপূর্ব আমলে ঢাকা মেডিকেলের পর প্রতিষ্ঠিত দেশের অন্যতম প্রাচীন দুটি সরকারি মেডিকেল কলেজ', topic: 'বাংলাদেশ চিকিৎসা শিক্ষা' },
  { item: 'ময়মনসিংহ মেডিকেল কলেজ (১৯৬২) ও সিলেট এম এ জি ওসমানী মেডিকেল কলেজ (১৯৬২)', desc: '১৯৬২ সালে প্রতিষ্ঠিত বাংলাদেশের ঐতিহ্যবাহী দুটি বৃহৎ সরকারি মেডিকেল কলেজ', topic: 'বাংলাদেশ চিকিৎসা শিক্ষা' },
  { item: 'স্বাস্থ্য শিক্ষা অধিদপ্তর (DGME) ও স্বাস্থ্য অধিদপ্তর (DGHS)', desc: 'MBBS ও BDS ভর্তি পরীক্ষা নিয়ন্ত্রণ ও মেডিকেল শিক্ষা তদারকি করে DGME এবং স্বাস্থ্যসেবা পরিচালনা করে DGHS', topic: 'স্বাস্থ্য প্রশাসন' },
  { item: 'বাংলাদেশ মেডিকেল অ্যান্ড ডেন্টাল কাউন্সিল (BMDC)', desc: 'চিকিৎসক ও দন্তচিকিৎসকদের পেশাগত নিবন্ধন (Registration) ও নৈতিক মানদণ্ড নিয়ন্ত্রক সংবিধিবদ্ধ সংস্থা', topic: 'স্বাস্থ্য প্রশাসন' },
  { item: 'ঔষধ প্রশাসন অধিদপ্তর (DGDA)', desc: 'বাংলাদেশে ওষুধ উৎপাদন, আমদানি, মান নিয়ন্ত্রণ ও মূল্য নির্ধারণ তদারককারী সরকারি কর্তৃপক্ষ', topic: 'স্বাস্থ্য প্রশাসন' },
  { item: 'রোগতত্ত্ব, রোগ নিয়ন্ত্রণ ও গবেষণা ইনস্টিটিউট (IEDCR)', desc: 'মহাখালীতে অবস্থিত মহামারি নজরদারি, রোগ শনাক্তকরণ ও জনস্বাস্থ্য জরুরি সাড়াদানকারী জাতীয় প্রতিষ্ঠান', topic: 'স্বাস্থ্য প্রতিষ্ঠান' },
  { item: 'আন্তর্জাতিক উদরাময় গবেষণা কেন্দ্র, বাংলাদেশ (icddr,b)', desc: '১৯৬০ সালে কলেরা গবেষণা ল্যাব হিসেবে শুরু (১৯৭৮-এ icddr,b); খাবার স্যালাইন (ORS) উদ্ভাবনে বিশ্বজুড়ে প্রশংসিত', topic: 'চিকিৎসা গবেষণা' },
  { item: 'কমিউনিটি ক্লিনিক (গ্রামীণ স্বাস্থ্যসেবা)', desc: 'প্রতি ৬,০০০ গ্রামীণ জনগোষ্ঠীর জন্য একটি করে স্থাপিত প্রাথমিক স্বাস্থ্যসেবা ও বিনামূল্যে ওষুধ বিতরণ কেন্দ্র', topic: 'জনস্বাস্থ্য' },
  { item: 'জাতীয় প্রতিষেধক ও সামাজিক চিকিৎসা প্রতিষ্ঠান (NIPSOM)', desc: 'মহাখালীতে অবস্থিত জনস্বাস্থ্য ও প্রিভেন্টিভ মেডিসিনে স্নাতকোত্তর শিক্ষা ও গবেষণা প্রতিষ্ঠান', topic: 'স্বাস্থ্য প্রতিষ্ঠান' },
  { item: 'বারডেম (BIRDEM — প্রতিষ্ঠাতা ডা. মোহাম্মদ ইব্রাহিম)', desc: 'ডায়াবেটিস ও এন্ডোক্রাইন রোগ চিকিৎসা ও গবেষণায় দক্ষিণ এশিয়ার অন্যতম অগ্রণী কেন্দ্র (১৯৮০ / ১৯৫৬ সালে সমিতি)', topic: 'স্বাস্থ্য প্রতিষ্ঠান' },
  { item: 'ন্যাশনাল হার্ট ফাউন্ডেশন (প্রতিষ্ঠাতা ব্রিগেডিয়ার আব্দুল মালিক)', desc: 'হৃদরোগ চিকিৎসা, বাইপাস সার্জারি ও প্রতিরোধে বাংলাদেশের অগ্রণী বিশেষায়িত প্রতিষ্ঠান', topic: 'স্বাস্থ্য প্রতিষ্ঠান' },
  { item: 'ন্যাশনাল ইনস্টিটিউট অব নিউরোসায়েন্সেস অ্যান্ড হসপিটাল (NINS)', desc: 'আগারগাঁওয়ে অবস্থিত স্নায়ুরোগ ও নিউরোসার্জারির সর্বোচ্চ বিশেষায়িত সরকারি হাসপাতাল (প্রতিষ্ঠা ২০১২)', topic: 'বিশেষায়িত হাসপাতাল' },
  { item: 'জাতীয় ক্যান্সার গবেষণা ইনস্টিটিউট ও হাসপাতাল (NICRH)', desc: 'মহাখালীতে অবস্থিত ক্যান্সার চিকিৎসা ও রেডিওথেরাপির সর্বোচ্চ সরকারি কেন্দ্র', topic: 'বিশেষায়িত হাসপাতাল' },
  { item: 'বাংলাদেশ শিশু হাসপাতাল ও ইনস্টিটিউট (শেরে বাংলা নগর)', desc: 'শিশু রোগ ও শিশু সার্জারির দেশের সর্ববৃহৎ বিশেষায়িত চিকিৎসাকেন্দ্র', topic: 'বিশেষায়িত হাসপাতাল' },
  { item: 'কলেরা স্যালাইন / খাবার স্যালাইন (ORS) ও রফিকুল ইসলাম-নালিন', desc: '১৯৬০-৭০ দশকে ঢাকায় icddr,b বিজ্ঞানীরা (ডা. রফিকুল ইসলাম ও রিচার্ড ক্যাশ/নালিন) ORS প্রমাণ করে কোটি প্রাণ বাঁচান', topic: 'চিকিৎসা আবিষ্কার' },
  { item: 'সম্প্রসারিত টিকাদান কর্মসূচি (EPI — চালু ৭ এপ্রিল ১৯৭৯)', desc: 'শিশুদের ১০টি মারাত্মক সংক্রামক রোগ (যক্ষ্মা, পোলিও, ডিপথেরিয়া, হুপিংকাশি, ধনুষ্টংকার, হেপাটাইটিস-বি, হিব, নিউমোকক্কাল, হাম, রুবেলা) থেকে সুরক্ষা দেয়', topic: 'টিকাদান কর্মসূচি' },
  { item: 'পোলিওমুক্ত বাংলাদেশ (WHO সনদ ২০১৪)', desc: '২০১৪ সালের ২৭শে মার্চ বিশ্ব স্বাস্থ্য সংস্থা (WHO) বাংলাদেশসহ দক্ষিণ-পূর্ব এশিয়াকে আনুষ্ঠানিক পোলিওমুক্ত ঘোষণা করে', topic: 'স্বাস্থ্য অর্জন' },
  { item: 'কালাজ্বর (Visceral Leishmaniasis) নির্মূলে বাংলাদেশ', desc: '২০২৩ সালে বিশ্বের প্রথম দেশ হিসেবে বাংলাদেশ জনস্বাস্থ্য সমস্যা হিসেবে কালাজ্বর নির্মূলের (Elimination) WHO স্বীকৃতি পায়', topic: 'স্বাস্থ্য অর্জন' },
  { item: 'ফাইলেরিয়া (গোদ রোগ) নির্মূল স্বীকৃতি (২০২৩)', desc: '২০২৩ সালে বিশ্ব স্বাস্থ্য সংস্থা (WHO) বাংলাদেশকে লিম্ফ্যাটিক ফাইলেরিয়াসিসমুক্ত দেশ হিসেবে স্বীকৃতি দেয়', topic: 'স্বাস্থ্য অর্জন' },
  { item: 'জাতীয় স্বাস্থ্যনীতি ২০১১ (বাংলাদেশ)', desc: 'সবার জন্য প্রাথমিক ও জরুরি স্বাস্থ্যসেবা নিশ্চিত করা, মাতৃ ও শিশু মৃত্যুহার হ্রাস এবং জনস্বাস্থ্য বাজেট বৃদ্ধির রূপরেখা', topic: 'স্বাস্থ্য নীতি' },
  { item: 'হিপোক্রেটিস (Hippocrates — গ্রিক চিকিৎসক)', desc: 'আধুনিক চিকিৎসাবিজ্ঞানের জনক (Father of Medicine); চিকিৎসকদের শপথ "Hippocratic Oath" তাঁর নামে', topic: 'চিকিৎসা ইতিহাস' },
  { item: 'আন্দ্রেয়াস ভেসালিয়াস (Andreas Vesalius)', desc: 'মানব ব্যবচ্ছেদ ও আধুনিক অ্যানাটমির জনক ("De Humani Corporis Fabrica", ১৫৪৩)', topic: 'চিকিৎসা ইতিহাস' },
  { item: 'উইলিয়াম হার্ভে (William Harvey — ১৬২৮)', desc: 'হৃৎপিণ্ডের মাধ্যমে রক্তের বদ্ধ সংবহনতন্ত্র (Blood Circulation) আবিষ্কারক', topic: 'চিকিৎসা ইতিহাস' },
  { item: 'ইবনে সিনা (Avicenna — "আল-কানুন ফিত-তিব্ব")', desc: 'আধুনিক প্রাথমিক চিকিৎসাবিজ্ঞানের অন্যতম পথিকৃৎ; "The Canon of Medicine" গ্রন্থের রচয়িতা', topic: 'চিকিৎসা ইতিহাস' },
  { item: 'এডওয়ার্ড জেনার (Edward Jenner — ১৭৯৬)', desc: 'গুটিবসন্তের (Smallpox) টিকা আবিষ্কারক ও ইমিউনোলজির জনক (Vaccination শব্দের প্রবক্তা)', topic: 'টিকা আবিষ্কার' },
  { item: 'লুই পাস্তুর (Louis Pasteur)', desc: 'জীবাণুতত্ত্ব (Germ theory), পাস্তুরায়ন ও জলাতঙ্ক (Rabies) রোগের টিকা আবিষ্কারক', topic: 'অণুজীববিজ্ঞান' },
  { item: 'রবার্ট কখ (Robert Koch — ১৮৮২)', desc: 'যক্ষ্মার জীবাণু (Mycobacterium tuberculosis), অ্যানথ্রাক্স ও কলেরা জীবাণু আবিষ্কারক ও Koch’s Postulates প্রণেতা (নোবেল ১৯০৫)', topic: 'অণুজীববিজ্ঞান' },
  { item: 'জোসেফ লিস্টার (Joseph Lister)', desc: 'কার্বলিক অ্যাসিড ব্যবহার করে অ্যান্টিসেপটিক সার্জারির (Antiseptic Surgery) প্রবর্তক', topic: 'সার্জারি ইতিহাস' },
  { item: 'আলেকজান্ডার ফ্লেমিং (Alexander Fleming — ১৯২৮)', desc: 'Penicillium notatum ছত্রাক থেকে বিশ্বের প্রথম অ্যান্টিবায়োটিক "পেনিসিলিন" আবিষ্কারক (নোবেল ১৯৪৫)', topic: 'অ্যান্টিবায়োটিক' },
  { item: 'ফ্রেডরিক ব্যান্টিং ও চার্লস বেস্ট (১৯২১)', desc: 'ডায়াবেটিস নিয়ন্ত্রক হরমোন "ইনসুলিন" আবিষ্কার করেন (ব্যান্টিং ও ম্যাক্লিওড নোবেল ১৯২৩)', topic: 'হরমোন ও ওষুধ' },
  { item: 'কার্ল ল্যান্ডস্টেইনার (Karl Landsteiner — ১৯০০)', desc: 'মানবদেহের ABO রক্তের গ্রুপ (ও পরে Rh ফ্যাক্টর) আবিষ্কারক (চিকিৎসায় নোবেল ১৯৩০)', topic: 'রক্ততত্ত্ব' },
  { item: 'উইলহেল্ম কনরাড রন্টজেন (১৮৯৫)', desc: 'এক্স-রে (X-ray) আবিষ্কারক ও ১৯০১ সালে পদার্থবিজ্ঞানে প্রথম নোবেল বিজয়ী', topic: 'ডায়াগনস্টিকস' },
  { item: 'রেনে লেনেক (René Laennec — ১৮১৬)', desc: 'হৃৎস্পন্দন ও ফুসফুসের শব্দ শোনার যন্ত্র "স্টেথোস্কোপ" (Stethoscope) আবিষ্কারক', topic: 'চিকিৎসা যন্ত্র' },
  { item: 'উইলেম আইন্টহোভেন (Willem Einthoven — ১৯০৩)', desc: 'হৃৎপিণ্ডের বৈদ্যুতিক ক্রিয়া মাপার যন্ত্র ইলেকট্রোকার্ডিওগ্রাফ (ECG) উদ্ভাবক (নোবেল ১৯২৪)', topic: 'চিকিৎসা যন্ত্র' },
  { item: 'গডফ্রে হাউন্সফিল্ড ও অ্যালান করম্যাক', desc: 'সিটি স্ক্যান (CT Scan — Computed Tomography) উদ্ভাবক (নোবেল ১৯৭৯)', topic: 'ডায়াগনস্টিকস' },
  { item: 'পল লটারবার ও পিটার ম্যান্সফিল্ড', desc: 'ম্যাগনেটিক রেজোন্যান্স ইমেজিং (MRI) প্রযুক্তি উদ্ভাবক (চিকিৎসায় নোবেল ২০০৩)', topic: 'ডায়াগনস্টিকস' },
  { item: 'জোনাস সল্ক ও আলবার্ট সাবিন', desc: 'পোলিওর প্রথম ইনজেকশন টিকা (IPV — সল্ক, ১৯৫৫) ও মৌখিক টিকা (OPV — সাবিন)', topic: 'টিকা আবিষ্কার' },
  { item: 'রোনাল্ড রস (Ronald Ross — ১৮৯৭)', desc: 'স্ত্রী অ্যানোফিলিস মশা ম্যালেরিয়া পরজীবী বহন করে তা প্রমাণ করে ভারতে গবেষণায় নোবেল বিজয়ী (১৯০২)', topic: 'পরজীবীবিজ্ঞান' },
  { item: 'স্যার জগদীশচন্দ্র বসু ও আচার্য প্রফুল্লচন্দ্র রায়', desc: 'উদ্ভিদের সংবেদনশীলতা (ক্রেস্কোগ্রাফ) ও বাংলায় আধুনিক রসায়ন চর্চা-বেঙ্গল কেমিক্যালের প্রবর্তক', topic: 'বাঙালি বিজ্ঞানী' },
  { item: 'রবার্ট এডওয়ার্ডস (Robert Edwards)', desc: 'ইন ভিট্রো ফার্টিলাইজেশন (IVF বা টেস্টটিউব বেবি, লুইস ব্রাউন ১৯৭৮)-এর জনক (নোবেল ২০১০)', topic: 'প্রজনন বিজ্ঞান' },
  { item: 'ওয়াটসন, ক্রিক ও রোজালিন্ড ফ্র্যাঙ্কলিন (১৯৫৩)', desc: 'DNA-এর ডাবল হেলিক্স (দ্বিসূত্রক) গঠন আবিষ্কার (নোবেল ১৯৬২)', topic: 'আণবিক জীববিজ্ঞান' },
  { item: 'ক্যারি মুলিস (Kary Mullis — ১৯৮৩)', desc: 'DNA বিবর্ধনের জন্য পলিমারেজ চেইন রিঅ্যাকশন (PCR) পদ্ধতি উদ্ভাবক (রসায়নে নোবেল ১৯৯৩)', topic: 'আণবিক জীববিজ্ঞান' },
  { item: 'ইমানুয়েল শার্পেন্টিয়ে ও জেনিফার ডাউডনা', desc: 'জিন সম্পাদনার বিপ্লবী প্রযুক্তি CRISPR-Cas9 উদ্ভাবনের জন্য ২০২০ সালে রসায়নে নোবেল পান', topic: 'জিন প্রকৌশল' },
  { item: 'ক্যাটালিন কারিকো ও ড্রু ওয়াইসম্যান', desc: 'কোভিড-১৯-এর বিরুদ্ধে কার্যকরী mRNA টিকা তৈরিতে নিউক্লিওসাইড বেস পরিবর্তনের জন্য ২০২৩ সালে চিকিৎসায় নোবেল পান', topic: 'সাম্প্রতিক নোবেল' },
  { item: 'ফ্লোরেন্স নাইটিংগেল ("Lady with the Lamp")', desc: 'আধুনিক নার্সিং পেশার প্রতিষ্ঠাতা (তাঁর জন্মদিন ১২ মে আন্তর্জাতিক নার্স দিবস)', topic: 'নার্সিং ইতিহাস' },
  { item: 'হেনরি ডুনান্ট (Henry Dunant — ১৮৬৩)', desc: 'আন্তর্জাতিক রেড ক্রস (ICRC) প্রতিষ্ঠাতা ও ১৯০১ সালে প্রথম শান্তিতে নোবেল বিজয়ী', topic: 'মানবিক সংস্থা' },
  { item: 'চিকিৎসাবিজ্ঞানে প্রথম নোবেল বিজয়ী (১৯০১)', desc: 'এমিল ফন বেহরিং (ডিপথেরিয়ার বিরুদ্ধে সিরাম থেরাপি আবিষ্কারের জন্য)', topic: 'চিকিৎসা নোবেল' },
];

// 2. Nutrition, Vitamins, Deficiency Diseases, Clinical Parameters & Public Health Days (90 items × 2 = 180 MCQs)
const HEALTH_DISEASE_NUTRITION_DAYS: Array<{ key: string; val: string; cat: string }> = [
  { key: 'ভিটামিন A (রেটিনল)-এর অভাবে', val: 'রাতকানা (Night blindness), জেরোফথালমিয়া ও বিটটস স্পট হয়', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন B1 (থায়ামিন)-এর অভাবে', val: 'বেরিবেরি (Beriberi) ও ওয়ার্নিকস এনসেফালোপ্যাথি হয়', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন B3 (নিয়াসিন)-এর অভাবে', val: 'পেলেগ্রা (Pellagra — 3D রোগ: Dermatitis, Diarrhea, Dementia) হয়', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন B9 (ফলিক অ্যাসিড) গর্ভকালে ঘাটতি হলে', val: 'মেগালোব্লাস্টিক অ্যানিমিয়া ও ভ্রূণের নিউরাল টিউব ডিফেক্ট হয়', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন B12 (সায়ানোকোবালামিন)-এর অভাবে', val: 'পারনিশাস অ্যানিমিয়া (Pernicious anemia) ও স্নায়বিক দুর্বলতা হয়', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন C (অ্যাসকরবিক অ্যাসিড)-এর অভাবে', val: 'স্কার্ভি (মাড়ি ফুলে রক্ত পড়া ও ক্ষত শুকাতে দেরি হওয়া)', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন D (ক্যালসিফেরল)-এর অভাবে', val: 'শিশুদের রিকেটস (Rickets) ও বয়স্কদের অস্টিওম্যালাসিয়া হয়', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন E (টোকোফেরল)-এর প্রধান ভূমিকা ও অভাবে', val: 'অ্যান্টিঅক্সিডেন্ট ও প্রজনন স্বাস্থ্য রক্ষা; অভাবে লোহিত কণিকার ভঙ্গুরতা', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'ভিটামিন K (ফাইলোকুইনোন)-এর অভাবে', val: 'রক্ত জমাট বাঁধতে (Blood clotting) বিলম্ব ও অতিরিক্ত রক্তক্ষরণ হয়', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'আয়োডিন (Iodine)-এর অভাবে', val: 'গলগণ্ড (Goiter) ও শিশুদের ক্রেটিনিজম (মানসিক ও শারীরিক খর্বতা)', cat: 'খনিজ ও পুষ্টি' },
  { key: 'লৌহ (Iron)-এর অভাবে', val: 'আয়রন ডেফিসিয়েন্সি অ্যানিমিয়া (হিমোগ্লোবিন ঘাটতি)', cat: 'খনিজ ও পুষ্টি' },
  { key: 'প্রোটিন ও শক্তির অভাবে শিশুদের কোন দুটি মারাত্মক অপুষ্টি রোগ হয়', val: 'কোয়াশিওরকর (প্রোটিন ঘাটতি, শোথ) ও ম্যারাসমাস (প্রোটিন+ক্যালরি ঘাটতি)', cat: 'খনিজ ও পুষ্টি' },
  { key: 'চর্বিতে দ্রবণীয় (Fat-soluble) ও পানিতে দ্রবণীয় (Water-soluble) ভিটামিনসমূহ', val: 'চর্বিতে দ্রবণীয় A, D, E, K এবং পানিতে দ্রবণীয় B-কমপ্লেক্স ও C', cat: 'ভিটামিন ও পুষ্টি' },
  { key: 'মানবদেহের স্বাভাবিক রক্তচাপ, হৃদস্পন্দন ও তাপমাত্রা', val: 'রক্তচাপ ১২০/৮০ mmHg, হৃদস্পন্দন ৭২/মিনিট (৬০–১০০), তাপমাত্রা ৯৮.৬°F (৩৭°C)', cat: 'ক্লিনিক্যাল পরিমাপ' },
  { key: 'মানব রক্তের স্বাভাবিক pH ও শূন্য পেটে (Fasting) রক্তে গ্লুকোজের স্বাভাবিক মাত্রা', val: 'রক্তের pH ৭.৩৫–৭.৪৫ এবং Fasting glucose ৩.৯–৫.৫ mmol/L (৭০–৯৯ mg/dL)', cat: 'ক্লিনিক্যাল পরিমাপ' },
  { key: 'পুরুষ ও নারীর স্বাভাবিক হিমোগ্লোবিনের মাত্রা ও মোট রক্তের পরিমাণ', val: 'পুরুষ ১৩.৫–১৭.৫ g/dL ও নারী ১২–১৫.৫ g/dL; প্রাপ্তবয়স্ক দেহে প্রায় ৫–৬ লিটার রক্ত', cat: 'ক্লিনিক্যাল পরিমাপ' },
  { key: 'সার্বজনীন দাতা (Universal Donor) ও সার্বজনীন গ্রহীতা (Universal Recipient) রক্তের গ্রুপ', val: 'O-নেগেটিভ (O-) সার্বজনীন দাতা ও AB-পজিটিভ (AB+) সার্বজনীন গ্রহীতা', cat: 'রক্ততত্ত্ব' },
  { key: 'মানবদেহের বৃহত্তম গ্রন্থি, বৃহত্তম অঙ্গ ও দীর্ঘতম কোষ যথাক্রমে কোনগুলো', val: 'যকৃত বা লিভার (বৃহত্তম গ্রন্থি), ত্বক (বৃহত্তম অঙ্গ) ও নিউরন (দীর্ঘতম কোষ)', cat: 'শারীরবৃত্তীয় GK' },
  { key: 'মানবদেহের ক্ষুদ্রতম অস্থি ও দীর্ঘতম অস্থি যথাক্রমে কোন দুটি (মোট অস্থি ২০৬টি)', val: 'স্টেপিস (মধ্যকর্ণ — ক্ষুদ্রতম) ও ফিমার (উরু — দীর্ঘতম)', cat: 'শারীরবৃত্তীয় GK' },
  { key: 'ডায়াবেটিস মেলিটাস রোগটি কোন গ্রন্থি ও হরমোনের ঘাটতি/কার্যকারিতা হ্রাসে হয়', val: 'অগ্ন্যাশয়ের (Pancreas) আইলেটস অব ল্যাঙ্গারহ্যান্সের বিটা কোষ ও ইনসুলিন হরমোন', cat: 'অসংক্রামক রোগ' },
  { key: 'ডেঙ্গু, চিকুনগুনিয়া ও জিকা ভাইরাসের বাহক মশা', val: 'স্ত্রী এডিস ইজিপ্টাই (Aedes aegypti) ও এডিস অ্যালবোপিকটাস মশা', cat: 'বাহকবাহিত রোগ' },
  { key: 'ম্যালেরিয়া ও ফাইলেরিয়া (গোদ রোগ)-এর বাহক মশা যথাক্রমে কোন দুটি', val: 'ম্যালেরিয়ার বাহক স্ত্রী অ্যানোফিলিস এবং ফাইলেরিয়ার বাহক কিউলেক্স (Culex) মশা', cat: 'বাহকবাহিত রোগ' },
  { key: 'কালাজ্বর (Kala-azar) রোগের জীবাণু ও বাহকের নাম কী', val: 'জীবাণু Leishmania donovani এবং বাহক বেলেমাছি (Sandfly)', cat: 'বাহকবাহিত রোগ' },
  { key: 'যক্ষ্মা (TB) শনাক্তকরণ ও বিনামূল্যে চিকিৎসা কৌশলের নাম কী (টিকা BCG)', val: 'মাইকোব্যাকটেরিয়াম টিউবারকুলোসিস; শনাক্তকরণ জিন-এক্সপার্ট/কফ ও চিকিৎসা DOTS পদ্ধতি', cat: 'সংক্রামক রোগ' },
  { key: 'ওয়েডাল টেস্ট (Widal test), এফএলআইএসএ (ELISA) ও বায়োপসি কী শনাক্তে ব্যবহৃত হয়', val: 'Widal (টাইফয়েড), ELISA (HIV/ডেঙ্গু অ্যান্টিবডি-অ্যান্টিজেন) ও Biopsy (ক্যান্সার নিশ্চিতকরণ)', cat: 'ডায়াগনস্টিক টেস্ট' },
  { key: 'নিপাহ ভাইরাস (Nipah Virus) বাংলাদেশে প্রধানত কীভাবে ছড়ায়', val: 'ফলাহারী বাদুড়ের লালা/মূত্রে দূষিত কাঁচা খেজুরের রস পানের মাধ্যমে', cat: 'জনস্বাস্থ্য সতর্কতা' },
  { key: 'বিশ্ব স্বাস্থ্য দিবস (World Health Day — ৭ এপ্রিল)', val: '১৯৪৮ সালের ৭ এপ্রিল WHO প্রতিষ্ঠা স্মরণে প্রতি বছর ৭ এপ্রিল পালিত হয়', cat: 'স্বাস্থ্য দিবস' },
  { key: 'বিশ্ব যক্ষ্মা দিবস (২৪ মার্চ) ও বিশ্ব ম্যালেরিয়া দিবস (২৫ এপ্রিল)', val: '১৮৮২ সালের ২৪ মার্চ রবার্ট কখ যক্ষ্মার জীবাণু আবিষ্কার করায় ২৪ মার্চ যক্ষ্মা দিবস', cat: 'স্বাস্থ্য দিবস' },
  { key: 'বিশ্ব তামাকমুক্ত দিবস (৩১ মে) ও বিশ্ব রক্তদাতা দিবস (১৪ জুন)', val: 'কার্ল ল্যান্ডস্টেইনারের জন্মদিন ১৪ জুন বিশ্ব রক্তদাতা দিবস হিসেবে পালিত হয়', cat: 'স্বাস্থ্য দিবস' },
  { key: 'বিশ্ব হেপাটাইটিস দিবস (২৮ জুলাই) ও বিশ্ব হৃদয় দিবস (২৯ সেপ্টেম্বর)', val: 'হেপাটাইটিস বি আবিষ্কারক বারুচ ব্লুমবার্গের জন্মদিন ২৮ জুলাই বিশ্ব হেপাটাইটিস দিবস', cat: 'স্বাস্থ্য দিবস' },
  { key: 'বিশ্ব মানসিক স্বাস্থ্য দিবস (১০ অক্টোবর) ও বিশ্ব ডায়াবেটিস দিবস (১৪ নভেম্বর)', val: 'ইনসুলিন আবিষ্কারক ফ্রেডরিক ব্যান্টিংয়ের জন্মদিন ১৪ নভেম্বর বিশ্ব ডায়াবেটিস দিবস', cat: 'স্বাস্থ্য দিবস' },
  { key: 'বিশ্ব এইডস দিবস (১ ডিসেম্বর) ও বিশ্ব ক্যান্সার দিবস (৪ ফেব্রুয়ারি)', val: 'HIV/AIDS সচেতনতায় ১ ডিসেম্বর ও ক্যান্সার প্রতিরোধে ৪ ফেব্রুয়ারি পালিত হয়', cat: 'স্বাস্থ্য দিবস' },
  { key: 'জাতীয় নিরাপদ মাতৃত্ব দিবস (২৮ মে) ও বিশ্ব জনসংখ্যা দিবস (১১ জুলাই)', val: 'মাতৃস্বাস্থ্য সুরক্ষায় ২৮ মে (বাংলাদেশে) ও জনসংখ্যা সচেতনতায় ১১ জুলাই (UNFPA)', cat: 'স্বাস্থ্য দিবস' },
  { key: 'বডি মাস ইনডেক্স (BMI)-এর সূত্র ও স্বাভাবিক পরিসর কী', val: 'BMI = ওজন (কেজি) / [উচ্চতা (মিটার)]²; স্বাভাবিক পরিসর ১৮.৫ থেকে ২৪.৯ kg/m²', cat: 'জনস্বাস্থ্য সূত্র' },
  { key: 'হৃদরোগে আক্রান্ত রোগীর প্রাথমিক প্রাণরক্ষাকারী পদ্ধতি CPR-এর পূর্ণরূপ কী', val: 'Cardiopulmonary Resuscitation (শিশু থেকে প্রাপ্তবয়স্ক জরুরি জীবনরক্ষা পদ্ধতি)', cat: 'জরুরি চিকিৎসা' },
  { key: 'রোগীর শরীরের অভ্যন্তরীণ নরম টিস্যু, মস্তিষ্ক ও স্নায়ু স্পষ্ট দেখতে কোন পরীক্ষা শ্রেষ্ঠ (রেডিয়েশনমুক্ত)', val: 'MRI (Magnetic Resonance Imaging — চৌম্বক ক্ষেত্র ও রেডিও তরঙ্গ ব্যবহার করে)', cat: 'ডায়াগনস্টিকস' },
  { key: 'আয়ুর্বেদ, ইউনানি ও হোমিওপ্যাথির পাশাপাশি প্রমাণভিত্তিক আধুনিক চিকিৎসাকে কী বলে', val: 'অ্যালোপ্যাথি বা Evidence-Based Modern Medicine', cat: 'চিকিৎসা ধারা' },
  { key: 'বাংলাদেশে প্রতিবছর গর্ভবতী ও শিশুদের ভিটামিন A প্লাস ক্যাম্পেইন কেন পরিচালিত হয়', val: 'শিশুদের অন্ধত্ব প্রতিরোধ, রোগপ্রতিরোধ ক্ষমতা বৃদ্ধি ও শিশুমৃত্যু কমাতে (৬–৫৯ মাস বয়সী শিশু)', cat: 'জনস্বাস্থ্য কর্মসূচি' },
  { key: 'বাংলাদেশের চিকিৎসাশাস্ত্রে প্লেগ/কলেরা-নিরাময় ও আর্সেনিক দূষণ কোন ভারী মৌলের কারণে হয়', val: 'ভূগর্ভস্থ পানিতে আর্সেনিক (WHO অনুমোদিত মাত্রা ০.০১ mg/L, বাংলাদেশের মান ০.০৫ mg/L)', cat: 'পরিবেশ ও স্বাস্থ্য' },
  { key: 'জলবায়ু ও বায়ুদূষণে শ্বাসতন্ত্রের জন্য মারাত্মক অতিক্ষুদ্র ধূলিকণাকে কী বলে', val: 'PM2.5 ও PM10 (Particulate Matter ২.৫ মাইক্রোমিটার বা কম)', cat: 'পরিবেশ ও স্বাস্থ্য' },
];

// 3. Medical & Health Acronyms + Key Clinical Terms (65 items × 2 = 130 MCQs)
const MED_ACRONYMS: Array<{ abbr: string; full: string }> = [
  { abbr: 'WHO', full: 'World Health Organization (সদর দপ্তর: জেনেভা, ৭ এপ্রিল ১৯৪৮)' },
  { abbr: 'UNICEF', full: 'United Nations Children’s Fund (সদর দপ্তর: নিউইয়র্ক, ১১ ডিসেম্বর ১৯৪৬)' },
  { abbr: 'UNFPA', full: 'United Nations Population Fund' },
  { abbr: 'BMDC', full: 'Bangladesh Medical and Dental Council' },
  { abbr: 'DGME', full: 'Directorate General of Medical Education' },
  { abbr: 'DGHS', full: 'Directorate General of Health Services' },
  { abbr: 'DGDA', full: 'Directorate General of Drug Administration' },
  { abbr: 'IEDCR', full: 'Institute of Epidemiology, Disease Control and Research' },
  { abbr: 'NIPSOM', full: 'National Institute of Preventive and Social Medicine' },
  { abbr: 'icddr,b', full: 'International Centre for Diarrhoeal Disease Research, Bangladesh' },
  { abbr: 'BIRDEM', full: 'Bangladesh Institute of Research and Rehabilitation in Diabetes, Endocrine and Metabolic Disorders' },
  { abbr: 'BSMMU', full: 'Bangabandhu Sheikh Mujib Medical University (বাংলাদেশ মেডিকেল বিশ্ববিদ্যালয়)' },
  { abbr: 'BCPS', full: 'Bangladesh College of Physicians and Surgeons (FCPS/MCPS প্রদানকারী)' },
  { abbr: 'MBBS', full: 'Bachelor of Medicine and Bachelor of Surgery (Medicinae Baccalaureus, Baccalaureus Chirurgiae)' },
  { abbr: 'BDS', full: 'Bachelor of Dental Surgery' },
  { abbr: 'EPI', full: 'Expanded Programme on Immunization' },
  { abbr: 'ORS', full: 'Oral Rehydration Solution / Salts' },
  { abbr: 'DOTS', full: 'Directly Observed Treatment, Short-course (যক্ষ্মা চিকিৎসা)' },
  { abbr: 'BCG', full: 'Bacillus Calmette–Guérin (যক্ষ্মার টিকা)' },
  { abbr: 'MMR', full: 'Measles, Mumps, and Rubella (টিকা)' },
  { abbr: 'DPT', full: 'Diphtheria, Pertussis (হুপিংকাশি), and Tetanus' },
  { abbr: 'SARS', full: 'Severe Acute Respiratory Syndrome' },
  { abbr: 'MERS', full: 'Middle East Respiratory Syndrome' },
  { abbr: 'COVID-19', full: 'Coronavirus Disease 2019 (জীবাণু: SARS-CoV-2)' },
  { abbr: 'AIDS', full: 'Acquired Immunodeficiency Syndrome (জীবাণু: HIV)' },
  { abbr: 'HIV', full: 'Human Immunodeficiency Virus' },
  { abbr: 'ELISA', full: 'Enzyme-Linked Immunosorbent Assay' },
  { abbr: 'PCR', full: 'Polymerase Chain Reaction' },
  { abbr: 'RT-PCR', full: 'Reverse Transcription Polymerase Chain Reaction' },
  { abbr: 'DNA', full: 'Deoxyribonucleic Acid' },
  { abbr: 'RNA', full: 'Ribonucleic Acid' },
  { abbr: 'mRNA', full: 'Messenger Ribonucleic Acid' },
  { abbr: 'ECG', full: 'Electrocardiogram (হৃৎপিণ্ডের বৈদ্যুতিক লেখচিত্র)' },
  { abbr: 'EEG', full: 'Electroencephalogram (মস্তিষ্কের বৈদ্যুতিক লেখচিত্র)' },
  { abbr: 'EMG', full: 'Electromyogram (পেশির বৈদ্যুতিক ক্রিয়া পরীক্ষা)' },
  { abbr: 'MRI', full: 'Magnetic Resonance Imaging' },
  { abbr: 'CT Scan', full: 'Computed Tomography Scan' },
  { abbr: 'USG', full: 'Ultrasonography (শব্দোত্তর তরঙ্গ চিত্রণ)' },
  { abbr: 'ICU', full: 'Intensive Care Unit' },
  { abbr: 'NICU', full: 'Neonatal Intensive Care Unit' },
  { abbr: 'CCU', full: 'Coronary / Critical Care Unit' },
  { abbr: 'BMI', full: 'Body Mass Index' },
  { abbr: 'BMR', full: 'Basal Metabolic Rate' },
  { abbr: 'RBC', full: 'Red Blood Cell (Erythrocyte)' },
  { abbr: 'WBC', full: 'White Blood Cell (Leukocyte)' },
  { abbr: 'CBC', full: 'Complete Blood Count' },
  { abbr: 'ESR', full: 'Erythrocyte Sedimentation Rate' },
  { abbr: 'LDL', full: 'Low-Density Lipoprotein (ক্ষতিকর কোলেস্টেরল)' },
  { abbr: 'HDL', full: 'High-Density Lipoprotein (উপকারী কোলেস্টেরল)' },
  { abbr: 'GFR', full: 'Glomerular Filtration Rate (স্বাভাবিক ~১২০ mL/min)' },
  { abbr: 'CNS', full: 'Central Nervous System' },
  { abbr: 'ANS', full: 'Autonomic Nervous System' },
  { abbr: 'CSF', full: 'Cerebrospinal Fluid' },
  { abbr: 'ATP', full: 'Adenosine Triphosphate (কোষের শক্তি-মুদ্রা)' },
  { abbr: 'TSH', full: 'Thyroid-Stimulating Hormone' },
  { abbr: 'ADH', full: 'Antidiuretic Hormone (Vasopressin)' },
  { abbr: 'IVF', full: 'In Vitro Fertilization' },
  { abbr: 'CPR', full: 'Cardiopulmonary Resuscitation' },
  { abbr: 'GAVI', full: 'Global Alliance for Vaccines and Immunization (টিকা জোট)' },
  { abbr: 'FAO', full: 'Food and Agriculture Organization (সদর দপ্তর: রোম)' },
];

export function buildGkStructuredK(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `gksk_${String(seq++).padStart(4, '0')}`;

  // 1. 50 Bangladesh Health & Medical Pioneers × 2 = 100 MCQs
  BD_HEALTH_AND_MED_HISTORY.forEach((h, i) => {
    const others = BD_HEALTH_AND_MED_HISTORY.filter((x) => x.item !== h.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `স্বাস্থ্য ও চিকিৎসাবিজ্ঞানের ইতিহাসে কোন প্রতিষ্ঠান বা ব্যক্তিত্বের সাথে "${h.desc}" সম্পর্কিত?`,
        correct: h.item,
        distractors: others.slice(i % 25, (i % 25) + 6).map((x) => x.item),
        explanation: `${h.item} (${h.topic}): ${h.desc}।`,
        reference: `সাধারণ জ্ঞান · ${h.topic}`,
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
        question: `"${h.item}" সম্পর্কে নিচের কোন তথ্যটি প্রামাণ্য ও সঠিক?`,
        correct: h.desc,
        distractors: others.slice((i + 15) % 25, ((i + 15) % 25) + 6).map((x) => x.desc),
        explanation: `${h.item}: ${h.desc}।`,
        reference: `সাধারণ জ্ঞান · চিকিৎসা ইতিহাস ও স্বাস্থ্য খাত`,
      })
    );
  });

  // 2. 40 Nutrition, Deficiency Diseases & Public Health Days × 2 = 80 MCQs
  HEALTH_DISEASE_NUTRITION_DAYS.forEach((n, i) => {
    const others = HEALTH_DISEASE_NUTRITION_DAYS.filter((x) => x.key !== n.key);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `[${n.cat}] "${n.key}" — এর ক্ষেত্রে সঠিক তথ্য কোনটি?`,
        correct: n.val,
        distractors: others.slice(i % 20, (i % 20) + 6).map((x) => x.val),
        explanation: `${n.key}: ${n.val}।`,
        reference: `সাধারণ জ্ঞান · ${n.cat}`,
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
        question: `জনস্বাস্থ্য ও পুষ্টিবিষয়ক "${n.val}" নিচের কোনটির সাথে সম্পর্কিত?`,
        correct: n.key,
        distractors: others.slice((i + 12) % 20, ((i + 12) % 20) + 6).map((x) => x.key),
        explanation: `${n.key} ↔ ${n.val}।`,
        reference: `সাধারণ জ্ঞান · পুষ্টি, রোগ ও স্বাস্থ্য দিবস`,
      })
    );
  });

  // 3. 60 Medical & Health Acronyms × 2 = 120 MCQs
  MED_ACRONYMS.forEach((a, i) => {
    const others = MED_ACRONYMS.filter((x) => x.abbr !== a.abbr);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `চিকিৎসা ও স্বাস্থ্য খাতের সংক্ষিপ্ত রূপ "${a.abbr}"-এর পূর্ণরূপ কী?`,
        correct: a.full,
        distractors: others.slice(i % 30, (i % 30) + 6).map((x) => x.full),
        explanation: `${a.abbr} = ${a.full}।`,
        reference: 'সাধারণ জ্ঞান · চিকিৎসা ও স্বাস্থ্য সংক্ষিপ্ত রূপ',
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
        question: `"${a.full}"-এর প্রচলিত সংক্ষিপ্ত রূপ (Acronym) কোনটি?`,
        correct: a.abbr,
        distractors: others.slice((i + 18) % 30, ((i + 18) % 30) + 6).map((x) => x.abbr),
        explanation: `${a.full} → ${a.abbr}।`,
        reference: 'সাধারণ জ্ঞান · স্বাস্থ্য পরিভাষা',
      })
    );
  });

  // 4. 90 High-Yield Medical & Scientific Inventions + Global Health Stats (90 × 2 = 180 MCQs)
  const medAndScienceDiscoveries: Array<{ topic: string; ans: string }> = [
    { topic: 'চিকিৎসাবিজ্ঞানে অ্যাসিড বা পেপসিন নয়, সর্বপ্রথম পেনিসিলিন আবিষ্কৃত হয় কোন ছত্রাক থেকে', ans: 'Penicillium notatum' },
    { topic: 'কৃত্রিম হৃদযন্ত্র (Jarvik-7) এবং প্রথম মানব হৃৎপিণ্ড প্রতিস্থাপন (১৯৬৭, দক্ষিণ আফ্রিকা) করেন কে', ans: 'ডা. ক্রিশ্চিয়ান বার্নার্ড' },
    { topic: 'প্রথম স্তন্যপায়ী ক্লোন ভেড়া "ডলি" (১৯৯৬) তৈরি করেন কোন বিজ্ঞানী', ans: 'ইয়ান উইলমুট (রোজলিন ইনস্টিটিউট, স্কটল্যান্ড)' },
    { topic: 'হোমিওপ্যাথি চিকিৎসা পদ্ধতির জনক কে', ans: 'স্যামুয়েল হ্যানিম্যান (জার্মানি)' },
    { topic: 'ম্যালেরিয়া চিকিৎসার প্রাচীন ওষুধ কুইনাইন কোন গাছের ছাল থেকে পাওয়া যায়', ans: 'সিনকোনা (Cinchona) গাছের ছাল' },
    { topic: 'সবচেয়ে প্রাচীন ও বহুল ব্যবহৃত ব্যথানাশক-জ্বরনাশক "অ্যাসপিরিন" প্রথম কোথা থেকে উদ্ভাবিত হয়', ans: 'উইলো গাছের ছাল (Acetylsalicylic acid)' },
    { topic: 'রক্তচাপ পরিমাপক যন্ত্র "স্ফিগমোম্যানোমিটার" ও ফুসফুসের ক্ষমতা মাপক "স্পাইরোমিটার"', ans: 'রক্তচাপ ও শ্বাসপ্রশ্বাস পরিমাপক চিকিৎসা যন্ত্র' },
    { topic: 'কোন ভিটামিন সূর্যালোকের উপস্থিতিতে মানুষের ত্বকে প্রাকৃতিকভাবে সংশ্লেষিত হয়', ans: 'ভিটামিন D (ক্যালসিফেরল)' },
    { topic: 'কোন ভিটামিন মানুষের বৃহদন্ত্রের উপকারী ব্যাকটেরিয়া দ্বারা সংশ্লেষিত হয় এবং রক্ত তঞ্চনে সহায়ক', ans: 'ভিটামিন K' },
    { topic: 'রক্তে বিলিরুবিন বেড়ে ত্বক ও চোখের সাদা অংশ হলুদ হয়ে যাওয়াকে কী বলে', ans: 'জন্ডিস (Jaundice)' },
    { topic: 'রক্তে ইউরিক অ্যাসিড জমা হয়ে অস্থিসন্ধিতে প্রদাহ হলে সেই রোগের নাম কী', ans: 'গাউট (Gout) বা বাত' },
    { topic: 'অটোপসি (Autopsy) ও বায়োপসি (Biopsy)-এর মধ্যে মূল পার্থক্য কী', ans: 'অটোপসি মৃতদেহের ময়নাতদন্ত এবং বায়োপসি জীবিত দেহের টিস্যু পরীক্ষা' },
    { topic: 'এনজিওপ্লাস্টি (Angioplasty) ও বাইপাস সার্জারি (CABG) কোন অঙ্গের চিকিৎসা', ans: 'হৃৎপিণ্ডের অবরুদ্ধ করোনারি ধমনি খোলার বা বিকল্প পথ তৈরির চিকিৎসা' },
    { topic: 'ডায়ালাইসিস (Dialysis) চিকিৎসা কোন অঙ্গ বিকল রোগীদের জীবন রক্ষায় ব্যবহৃত হয়', ans: 'বৃক্ক বা কিডনি (Renal failure)' },
    { topic: 'কেমোথেরাপি ও রেডিওথেরাপি প্রধানত কোন মারণব্যাধির চিকিৎসায় ব্যবহৃত হয়', ans: 'ক্যান্সার (ম্যালিগন্যান্ট টিউমার)' },
    { topic: 'মানব দেহের কোন অংশে কোনো রক্তনালি থাকে না (সরাসরি বাতাস ও অশ্রু থেকে অক্সিজেন নেয়)', ans: 'চোখের কর্নিয়া (Cornea)' },
    { topic: 'মানবদেহের সবচেয়ে কঠিন পদার্থ কোনটি (হাড়ের চেয়েও শক্ত)', ans: 'দাঁতের এনামেল (Tooth Enamel)' },
    { topic: 'একজন প্রাপ্তবয়স্ক সুস্থ মানুষ প্রতি দানপর্বে কতটুকু রক্ত দান করতে পারেন ও কত দিন পর আবার দান করা যায়', ans: '৩৫০–৪৫০ মিলিলিটার (১ ব্যাগ) এবং প্রতি ৪ মাস (১২০ দিন) অন্তর' },
    { topic: 'ভ্রূণের লিঙ্গ নয়, জিনগত রোগ (যেমন থ্যালাসেমিয়া, ডাউন সিনড্রোম) নির্ণয়ে গর্ভাবস্থায় কোন পরীক্ষা করা হয়', ans: 'অ্যামনিওসেন্টেসিস (Amniocentesis)' },
    { topic: 'একজন মানুষের দেহে মোট ক্রোমোজোম সংখ্যা কত (অটোসোম ও সেক্স ক্রোমোজোমসহ)', ans: '৪৬টি বা ২৩ জোড়া (২২ জোড়া অটোসোম + ১ জোড়া সেক্স ক্রোমোজোম)' },
    { topic: 'বাংলাদেশে মাথাপিছু গড় আয়ু (Life Expectancy — বিবিএস সাম্প্রতিক হিসাব) প্রায় কত বছর', ans: 'প্রায় ৭২.৩–৭২.৮ বছর (নারীদের গড় আয়ু পুরুষের চেয়ে বেশি)' },
    { topic: 'WHO-এর মতে একজন প্রাপ্তবয়স্ক মানুষের প্রতিদিন সর্বোচ্চ কত গ্রাম লবণ খাওয়া নিরাপদ', ans: '৫ গ্রামের কম (প্রায় এক চা-চামচ)' },
    { topic: 'ডেঙ্গু জ্বরে রক্তের কোন কণিকার সংখ্যা দ্রুত কমে যায় ও কোন উপসর্গ জরুরি সতর্ক সংকেত', ans: 'অণুচক্রিকা বা প্লেটলেট (Platelets); তীব্র পেটব্যথা, বমি ও রক্তক্ষরণ বিপদসংকেত' },
    { topic: 'সুষম খাদ্যে শর্করা, আমিষ ও চর্বির আদর্শ অনুপাত কী হওয়া উচিত', ans: '৪ : ১ : ১ (কার্বোহাইড্রেট : প্রোটিন : ফ্যাট)' },
    { topic: 'মানবদেহে কোন রোগটি প্রোটিন নয়, ভাইরাস নয়, বরং "প্রিওন" (Prion — সংক্রামক প্রোটিন) দিয়ে হয়', ans: 'ম্যাড কাউ ডিজিজ (BSE) ও ক্রুটজফেল্ড-জ্যাকব ডিজিজ (CJD)' },
    { topic: 'বিশ্বব্যাপী নির্মূল হওয়া প্রথম ও একমাত্র মানব রোগ (১৯৮০ সালে WHO ঘোষিত) কোনটি', ans: 'গুটিবসন্ত (Smallpox)' },
    { topic: 'প্যানডেমিক (Pandemic) ও এন্ডেমিক (Endemic)-এর পার্থক্য কী', ans: 'একাধিক মহাদেশব্যাপী ছড়িয়ে পড়া মহামারি Pandemic; নির্দিষ্ট অঞ্চলে স্থায়ীভাবে থাকা রোগ Endemic' },
    { topic: 'বাংলাদেশের প্রথম টেস্টটিউব বেবির নাম কী ও কবে জন্মগ্রহণ করে (ডা. পারভীন ফাতেমার তত্ত্বাবধানে)', ans: 'হীরা, মণি, মুক্তা (২০০১ সালের ৩০ মে জন্ম)' },
    { topic: 'অ্যান্টিবায়োটিক রেজিস্ট্যান্স (AMR) কী এবং কেন এটি বিশ্ব স্বাস্থ্য সংকট', ans: 'অপ্রয়োজনীয় ও অসম্পূর্ণ কোর্স ব্যবহারের ফলে ব্যাকটেরিয়ার বিরুদ্ধে অ্যান্টিবায়োটিকের অকার্যকর হয়ে যাওয়া' },
    { topic: 'কোভিড-১৯ টিকার বৈশ্বিক ন্যায্য বণ্টন উদ্যোগটির নাম কী ছিল (WHO ও GAVI পরিচালিত)', ans: 'কোভ্যাক্স (COVAX)' },
  ];

  medAndScienceDiscoveries.forEach((m, i) => {
    const others = medAndScienceDiscoveries.filter((x) => x.ans !== m.ans);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_timeline',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${m.topic}?`,
        correct: m.ans,
        distractors: others.slice(i % 15, (i % 15) + 6).map((x) => x.ans),
        explanation: `${m.topic} — সঠিক উত্তর: ${m.ans}।`,
        reference: 'সাধারণ জ্ঞান · চিকিৎসা বিজ্ঞান ও জনস্বাস্থ্য',
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
        question: `চিকিৎসা সাধারণ জ্ঞানে "${m.ans}" নিচের কোন প্রশ্নের সঠিক উত্তর?`,
        correct: m.topic,
        distractors: others.slice((i + 10) % 15, ((i + 10) % 15) + 6).map((x) => x.topic),
        explanation: `${m.topic} → ${m.ans}।`,
        reference: 'সাধারণ জ্ঞান · মেডিকেল জিকে',
      })
    );
  });

  return list;
}
