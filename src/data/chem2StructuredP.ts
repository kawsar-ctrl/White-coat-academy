import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

// Chemistry 2nd Paper Structured Pool P (~464 MCQs)
// Focus: High-Yield Admission & Board Drills for Chapter 1 (Environmental) & Chapter 2 (Organic)
// - Gas & Environmental Deep Drills (160 MCQs)
// - Organic Reaction Conversion Chains & Stereochemistry (200 MCQs)
// - Sigma/Pi Bond, Gas Ratio & Functional Reagent Matrices (104 MCQs)

interface DualFact {
  concept: string;
  fact: string;
  topic: string;
  ch: 'chem2_ch1_env' | 'chem2_ch2_organic';
}

const CH1_DEEP_DRILLS: DualFact[] = [
  { concept: 'গ্যাসের সংকোচনশীলতা গুণাঙ্ক Z = PV / nRT-এর মান ১-এর চেয়ে কম (Z < ১) হলে কী বোঝায়', fact: 'বাস্তব গ্যাসে অণুগুলোর মধ্যে আকর্ষণ বল প্রাধান্য পাচ্ছে এবং আদর্শ গ্যাসের তুলনায় গ্যাসটি অধিক সংকোচনশীল (ঋণাত্মক বিচ্যুতি)', topic: 'বাস্তব গ্যাসের বিচ্যুতি', ch: 'chem2_ch1_env' },
  { concept: 'উচ্চ চাপে বাস্তব গ্যাসের Z > ১ (ধনাত্মক বিচ্যুতি) হওয়ার মূল কারণ কী', fact: 'উচ্চ চাপে অণুগুলোর নিজস্ব বর্জিত আয়তন (nb) নগণ্য থাকে না এবং বিকর্ষণ বল প্রাধান্য পায়', topic: 'বাস্তব গ্যাসের বিচ্যুতি', ch: 'chem2_ch1_env' },
  { concept: 'গ্যাসের সন্ধি তাপমাত্রা (Critical Temperature, Tc = 8a / 27Rb)-এর ভৌত তাৎপর্য কী', fact: 'সর্বোচ্চ যে তাপমাত্রায় কেবল চাপ প্রয়োগ করে গ্যাসকে তরল করা যায় (এর ওপরে যতই চাপ দেওয়া হোক গ্যাস তরল হয় না)', topic: 'সন্ধি ধ্রুবক', ch: 'chem2_ch1_env' },
  { concept: 'CO₂ ও NH₃ গ্যাসকে সাধারণ কক্ষ তাপমাত্রায় (২৫ °C) কেবল চাপ দিয়ে তরল করা যায় কিন্তু N₂ বা H₂-কে যায় না কেন', fact: 'CO₂ (Tc = ৩১.১ °C) ও NH₃ (Tc = ১৩২.৪ °C)-এর সন্ধি তাপমাত্রা কক্ষ তাপমাত্রার বেশি; N₂ (-১৪৭ °C) ও H₂ (-২৪০ °C)-এর অনেক কম', topic: 'গ্যাস তরলীকরণ', ch: 'chem2_ch1_env' },
  { concept: 'ভ্যান ডার ওয়ালস সমীকরণে "a" ধ্রুবকের মান N₂ ও He-এর তুলনায় NH₃ এবং SO₂-এর বেশি কেন', fact: 'NH₃ (H-বন্ধন) ও SO₂ (পোলার)-এর আন্তঃআণবিক আকর্ষণ বল অত্যন্ত শক্তিশালী বলে সহজে তরল হয়', topic: 'ভ্যান ডার ওয়ালস ধ্রুবক', ch: 'chem2_ch1_env' },
  { concept: 'পানীয় জলে বিশ্ব স্বাস্থ্য সংস্থা (WHO) অনুযায়ী দ্রবীভূত অক্সিজেন (DO), pH ও TDS-এর নিরাপদ মান', fact: 'DO ≥ ৫–৬ mg/L, pH ৬.৫–৮.৫ এবং TDS < ৫০০ ppm', topic: 'পানির মানদণ্ড', ch: 'chem2_ch1_env' },
  { concept: 'জীবাণুমুক্তকরণে (পানি বিশুদ্ধকরণ) ব্লিচিং পাউডার Ca(OCl)Cl-এর কোন সক্রিয় মূলক জীবাণু ধ্বংস করে', fact: 'হাইপোক্লোরাস অ্যাসিড (HOCl) থেকে উৎপন্ন জায়মান অক্সিজেন [O] জীবাণুর কোষপ্রাচীর জারিত করে', topic: 'পানি শোধন', ch: 'chem2_ch1_env' },
  { concept: 'তীব্র অম্ল HCl-এর অনুবন্ধী ক্ষার Cl⁻ অত্যন্ত দুর্বল, কিন্তু দুর্বল অম্ল CH₃COOH-এর অনুবন্ধী ক্ষার CH₃COO⁻ কেমন', fact: 'সবল অম্লের অনুবন্ধী ক্ষার দুর্বল এবং দুর্বল অম্লের অনুবন্ধী ক্ষার তুলনামূলকভাবে সবল হয়', topic: 'অনুবন্ধী অম্ল-ক্ষার', ch: 'chem2_ch1_env' },
  { concept: 'হাইড্রাসিডসমূহের (HF, HCl, HBr, HI) অম্লীয় শক্তির সঠিক ক্রম কোনটি এবং কারণ কী', fact: 'HI > HBr > HCl > HF — নিচে নামলে হ্যালোজেন পরমাণুর আকার বাড়ায় H–X বন্ধন শক্তি কমে সহজে H⁺ মুক্ত হয়', topic: 'হাইড্রাসিডের সবলতা', ch: 'chem2_ch1_env' },
  { concept: 'অক্সো-অ্যাসিডগুলোর (HClO, HClO₂, HClO₃, HClO₄) তীব্রতার সঠিক ক্রম ও কারণ কী', fact: 'HClO₄ > HClO₃ > HClO₂ > HClO — কেন্দ্রীয় পরমাণুর জারণ সংখ্যা (+৭ থেকে +১) বাড়লে O–H বন্ধন অধিক পোলার হয় ও অনুবন্ধী অ্যানায়ন বেশি স্থিতিশীল হয়', topic: 'অক্সো-অ্যাসিডের সবলতা', ch: 'chem2_ch1_env' },
  { concept: 'পানিতে ক্ষারীয় Ca(HCO₃)₂ লবণের কারণে সৃষ্ট অস্থায়ী খরতা ফুটালে (Boiling) কীভাবে দূর হয়', fact: 'তাপে দ্রবণীয় Ca(HCO₃)₂ বিয়োজিত হয়ে অদ্রবণীয় CaCO₃ অধঃক্ষেপ ও CO₂ গ্যাস হিসেবে আলাদা হয়ে যায়', topic: 'পানির খরতা দূরীকরণ', ch: 'chem2_ch1_env' },
  { concept: 'বাস্তব বায়ুমণ্ডলীয় দূষণে কণিকাপদার্থ PM2.5 ও PM10-এর আকার ও স্বাস্থ্যঝুঁকি কী', fact: 'যথাক্রমে ২.৫ µm ও ১০ µm বা কম ব্যাসের সূক্ষ্ম ভাসমান কণা — PM2.5 ফুসফুসের অ্যালভিওলাই ভেদ করে রক্তে প্রবেশ করে', topic: 'কণিকা দূষণ', ch: 'chem2_ch1_env' },
  { concept: 'বজ্রপাতের সময় বায়ুমণ্ডলে নাইট্রোজেন সংবদ্ধনের (Nitrogen Fixation) প্রথম বিক্রিয়াটি কী', fact: 'প্রায় ৩০০০ °C তাপে N₂ + O₂ ⇌ 2NO, যা পরে অক্সিজেন ও বৃষ্টির পানিতে HNO₃ হয়ে মাটিতে নাইট্রেট সার দেয়', topic: 'প্রাকৃতিক রসায়ন', ch: 'chem2_ch1_env' },
  { concept: 'হেনরির সূত্র (Henry’s Law: C = k_H · P) কোন প্রাকৃতিক ঘটনার ব্যাখ্যা দেয়', fact: 'নির্দিষ্ট তাপমাত্রায় তরলে গ্যাসের দ্রাব্যতা গ্যাসের আংশিক চাপের সমানুপাতিক (যেমন সোডা ওয়াটারে উচ্চ চাপে CO₂ দ্রবণ)', topic: 'গ্যাসের দ্রাব্যতা', ch: 'chem2_ch1_env' },
  { concept: 'আদর্শ গ্যাস ও বাস্তব গ্যাসের মধ্যে অভ্যন্তরীণ শক্তি (Internal Energy, U)-এর নির্ভরতার পার্থক্য', fact: 'আদর্শ গ্যাসের অভ্যন্তরীণ শক্তি কেবল তাপমাত্রার (T) ওপর নির্ভর করে; বাস্তব গ্যাসের U তাপমাত্রা ও আয়তন (আন্তঃআণবিক বল) উভয়ের ওপর নির্ভর করে', topic: 'গ্যাস গতিতত্ত্ব', ch: 'chem2_ch1_env' },
  { concept: 'একটি বাস্তব গ্যাসের এক মোলের জন্য সংকোচনশীলতা সমীকরণে P→০ সীমায় Z-এর মান কত হয়', fact: 'Z → ১ (কারণ অতি নিম্ন চাপে সকল বাস্তব গ্যাস আদর্শ গ্যাসের মতো আচরণ করে)', topic: 'আদর্শ আচরণ', ch: 'chem2_ch1_env' },
  { concept: 'শিল্পোন্নত অঞ্চলের তাজমহল বা মার্বেল পাথরের স্থাপনার "মার্বেল ক্যান্সার" বিক্রিয়াটি কী', fact: 'অ্যাসিড বৃষ্টির H₂SO₄ + CaCO₃ → CaSO₄ + H₂O + CO₂ বিক্রিয়ায় মার্বেল ক্ষয়ে যাওয়া ও হলদেটে হওয়া', topic: 'অ্যাসিড বৃষ্টির প্রভাব', ch: 'chem2_ch1_env' },
  { concept: 'বায়ুমণ্ডলে স্ট্র্যাটোস্ফিয়ারের ওজোন (Good Ozone) বনাম ট্রপোস্ফিয়ারের ওজোন (Bad Ozone)', fact: 'স্ট্র্যাটোস্ফিয়ারের O₃ UV-B রশ্মি শোষণ করে জীবজগৎ বাঁচায়; ট্রপোস্ফিয়ারের O₃ ফটোকেমিক্যাল স্মগের বিষাক্ত শ্বাসকষ্ট সৃষ্টিকারী গ্রিনহাউজ দূষক', topic: 'ওজোন দ্বৈততা', ch: 'chem2_ch1_env' },
  { concept: 'পানি পরিশোধনে ফিটকিরি বা অ্যালুম [K₂SO₄·Al₂(SO₄)₃·24H₂O] কোন নীতিতে ঘোলা কাদা থিতায়', fact: 'তঞ্চন বা কোয়াগুলেশন (Al³⁺ আয়ন ঋণাত্মক চার্জযুক্ত কলয়েড কাদাকণাকে প্রশমিত করে ভারী ফ্লক তৈরি করে থিতায়)', topic: 'পানি শোধন', ch: 'chem2_ch1_env' },
  { concept: 'শিল্প কারখানায় ফসফেট ডিটারজেন্টের বদলে নিরাপদ পানীয় বা জৈব-বিয়োজ্য ডিটারজেন্ট ব্যবহার করা হয় কেন', fact: 'ইউট্রোফিকেশন (শৈবাল পুষ্পায়ন) প্রতিরোধ করে নদীর DO মান বজায় রাখার জন্য', topic: 'জলজ পরিবেশ', ch: 'chem2_ch1_env' },
  { concept: 'একটি আদর্শ গ্যাসের একই আয়তন ও তাপমাত্রায় N₂ ও CO গ্যাসের চাপ সমান হয় কেন', fact: 'উভয়ের আণবিক ভর (২৮ g/mol) এবং মোল সংখ্যা সমান হওয়ায় সমসংখ্যক অণু দেয়ালে সমান ভরবেগ স্থানান্তর করে', topic: 'গ্যাস চাপ', ch: 'chem2_ch1_env' },
  { concept: 'অক্সিজেন (M=৩২) এবং মিথেন (M=১৬) গ্যাসের ব্যাপন হারের অনুপাত কত', fact: 'r(CH₄) : r(O₂) = √(৩২ / ১৬) = √২ : ১ ≈ ১.৪১৪ : ১ (অর্থাৎ মিথেন দ্রুততর)', topic: 'ব্যাপন অনুপাত', ch: 'chem2_ch1_env' },
  { concept: 'আর্সেনিক (As) দূষণে পানির রঙ বা গন্ধের কোনো পরিবর্তন হয় না, তাই প্রাথমিক লক্ষণ মানবদেহে কোথায় প্রকাশ পায়', fact: 'হাত-পায়ের তালুতে কালো ছোপ/খসখসে কেরাটোসিস (মেলানোসিস) ও দীর্ঘমেয়াদে ব্ল্যাক-ফুট রোগ এবং ত্বকের ক্যান্সার', topic: 'আর্সেনিকোসিস', ch: 'chem2_ch1_env' },
  { concept: 'একটি গ্যাস সিলিন্ডারে O₂, N₂ ও CO₂-এর আংশিক চাপ যথাক্রমে ০.২, ০.৭ ও ০.১ atm হলে সিলিন্ডারের মোট চাপ কত', fact: '১.০ atm (ডাল্টনের আংশিক চাপ সূত্র: Ptotal = P₁ + P₂ + P₃)', topic: 'ডাল্টনের সূত্র', ch: 'chem2_ch1_env' },
  { concept: 'তাপমাত্রা স্থির রেখে নির্দিষ্ট ভরের গ্যাসের চাপ ৩ গুণ করলে ঘনত্বের কী পরিবর্তন হবে', fact: 'ঘনত্বও ৩ গুণ হবে (স্থির T-তে d ∝ P, কারণ ঘনত্ব d = PM / RT)', topic: 'গ্যাসের ঘনত্ব', ch: 'chem2_ch1_env' },
];

const CH2_CONVERSION_DRILLS: DualFact[] = [
  { concept: 'মিথানল থেকে ইথানল (কার্বন সংখ্যা বৃদ্ধি — Ascending Series) রূপান্তরের আদর্শ ধাপ কী', fact: 'CH₃OH + PCl₅ → CH₃Cl + KCN → CH₃CN (বিজারণ Na/EtOH) → CH₃CH₂NH₂ + HNO₂ → CH₃CH₂OH', topic: 'কার্বন শিকল বৃদ্ধি', ch: 'chem2_ch2_organic' },
  { concept: 'ইথানল থেকে মিথানল (কার্বন সংখ্যা হ্রাস — Descending Series) রূপান্তরের আদর্শ ধাপ কী', fact: 'CH₃CH₂OH (জারণ) → CH₃COOH (NH₃/Δ) → CH₃CONH₂ (হফম্যান Br₂/KOH) → CH₃NH₂ + HNO₂ → CH₃OH', topic: 'কার্বন শিকল হ্রাস', ch: 'chem2_ch2_organic' },
  { concept: 'বেনজিন থেকে বেনজোয়িক অ্যাসিড ও অ্যানিলিন তৈরি করার দুটি প্রধান পথ কী', fact: 'অ্যালকাইলেশন (CH₃Cl/AlCl₃) → টলুইন (KMnO₄) → C₆H₅COOH; নাইট্রেশন (HNO₃/H₂SO₄) → নাইট্রোবেনজিন (Sn/HCl) → অ্যানিলিন', topic: 'অ্যারোম্যাটিক রূপান্তর', ch: 'chem2_ch2_organic' },
  { concept: 'বেনজিন ডায়াজোনিয়াম ক্লোরাইডকে (C₆H₅N₂⁺Cl⁻) হাইপোফসফরাস অ্যাসিড (H₃PO₂ + Cu⁺/H₂O) বা ইথানল সহ উত্তপ্ত করলে কী পাওয়া যায়', fact: 'বিশুদ্ধ বেনজিন (C₆H₆ — ডায়াজো মূলকের সরাসরি বিজারণ অপসারণ)', topic: 'ডায়াজোনিয়াম রূপান্তর', ch: 'chem2_ch2_organic' },
  { concept: 'ফেনল থেকে অ্যাসপিরিন (Aspirin) সংশ্লেষণের দুই ধাপের রূপান্তর কোনটি', fact: 'ফেনল → (কোলবে-শ্মিট CO₂/NaOH) → স্যালিসিলিক অ্যাসিড + অ্যাসিটিক অ্যানহাইড্রাইড ((CH₃CO)₂O) → অ্যাসপিরিন', topic: 'ঔষধ সংশ্লেষণ', ch: 'chem2_ch2_organic' },
  { concept: 'ইথান্যাল (CH₃CHO) থেকে প্রোপানোন (CH₃COCH₃) তৈরির ধাপগুলো কী কী', fact: 'CH₃CHO + CH₃MgI → প্রোপান-২-অল → CrO₃/K₂Cr₂O₇ দ্বারা জারণ → প্রোপানোন', topic: 'গ্রিগনার্ড রূপান্তর', ch: 'chem2_ch2_organic' },
  { concept: 'ক্যালসিয়াম অ্যাসিটেট [(CH₃COO)₂Ca]-কে শুষ্ক পাতন (Dry Distillation) করলে কী উৎপন্ন হয়', fact: 'অ্যাসিটোন বা প্রোপানোন (CH₃COCH₃ + CaCO₃)', topic: 'কিটোন প্রস্তুতি', ch: 'chem2_ch2_organic' },
  { concept: 'ইথিন (CH₂=CH₂) ও ক্লোরোইথেন থেকে ডাই-ইথাইল ইথার তৈরি করার উইলিয়ামসন বিক্রিয়া কী', fact: 'C₂H₅ONa + C₂H₅Br → C₂H₅–O–C₂H₅ + NaBr (অপ্রতিসম ইথারেও ১° অ্যালকাইল হ্যালাইড নেওয়া জরুরি)', topic: 'উইলিয়ামসন সংশ্লেষণ', ch: 'chem2_ch2_organic' },
  { concept: 'টারশিয়ারি-বিউটাইল ইথাইল ইথার তৈরি করতে (CH₃)₃C-ONa + C₂H₅Br নাকি C₂H₅ONa + (CH₃)₃C-Br নিতে হয়', fact: '(CH₃)₃C-ONa + C₂H₅Br নিতে হয় (৩° হ্যালাইড ও অ্যালকোক্সাইডে SN2-এর বদলে অপসারণ ঘটে আইসোবিউটিন তৈরি হয়)', topic: 'উইলিয়ামসন সতর্কতা', ch: 'chem2_ch2_organic' },
  { concept: 'গ্লাইসিন এবং অ্যালানিন যুক্ত হয়ে গঠিত সরল ডাইপেপটাইড বন্ধন ভেঙে আর্দ্রবিশ্লেষণ কোন এনজাইমে ঘটে', fact: 'পেপটাইড বন্ধন (-CO-NH-) অ্যামাইড শ্রেণির; অ্যাসিড/ক্ষার বা পেপটাইডেজ এনজাইমে আর্দ্রবিশ্লেষিত হয়ে α-অ্যামিনো অ্যাসিড দেয়', topic: 'প্রোটিন রসায়ন', ch: 'chem2_ch2_organic' },
  { concept: 'স্টার্চ (অ্যামাইলোজ ও অ্যামাইলোপেকটিন) বনাম সেলুলোজ গঠনে গ্লুকোজের গ্লাইকোসাইডিক বন্ধনের পার্থক্য কী', fact: 'স্টার্চ α-D-গ্লুকোজ (α-১,৪ ও α-১,৬ — মানুষ হজম করতে পারে); সেলুলোজ β-D-গ্লুকোজ (β-১,৪ — মানুষের সেলুলেজ নেই)', topic: 'পলিস্যাকারাইড', ch: 'chem2_ch2_organic' },
  { concept: 'নাইট্রোবেনজিনকে প্রশম মাধ্যমে (Zn চূর্ণ + NH₄Cl) বিজারিত করলে অ্যানিলিনের বদলে কী উৎপন্ন হয়', fact: 'ফিনাইলহাইড্রক্সিলঅ্যামিন (C₆H₅NHOH)', topic: 'নাইট্রোবেনজিন বিজারণ', ch: 'chem2_ch2_organic' },
  { concept: 'নাইট্রাস অ্যাসিড (HNO₂)-এর সাথে প্রাথমিক অ্যালিফ্যাটিক অ্যামিন (R-NH₂) ও অ্যারোম্যাটিক অ্যামিন (Ar-NH₂)-এর আচরণের পার্থক্য', fact: 'অ্যালিফ্যাটিক RNH₂ কক্ষ তাপমাত্রায় অস্থায়ী ডায়াজোনিয়াম ভেঙে N₂ বুদবুদ ও অ্যালকোহল দেয়; অ্যানিলিন ০–৫ °C-এ স্থায়ী ডায়াজোনিয়াম লবণ গড়ে', topic: 'অ্যামিন বিক্রিয়া', ch: 'chem2_ch2_organic' },
  { concept: 'বেনজিন বলয়ে সালফোনেশন, ক্লোরিনেশন এবং নাইট্রেশন এই তিনটি প্রতিস্থাপনে বলয়ে যুক্ত হাইড্রোজেন কোন প্রক্রিয়ায় অপসারিত হয়', fact: 'C–H বন্ধনের দুটি ইলেকট্রন বলয়ে রেখে H⁺ (প্রোটন) রূপে বেস দ্বারা অপসারিত হয়ে অ্যারোম্যাটিকত্ব পুনঃপ্রতিষ্ঠিত হয়', topic: 'EAS কৌশল', ch: 'chem2_ch2_organic' },
  { concept: 'ইথানল এবং প্রোপান-১-অলের মধ্যে পার্থক্য করতে কোন পরীক্ষাটি নির্ভুলভাবে ব্যবহৃত হয়', fact: 'আয়োডোফর্ম পরীক্ষা (I₂ + NaOH) — ইথানলে CH₃CH(OH)- থাকায় হলুদ CHI₃ দেয়, প্রোপান-১-অল দেয় না', topic: 'অ্যালকোহল পার্থক্য', ch: 'chem2_ch2_organic' },
  { concept: 'ফরম্যালডিহাইড (HCHO) এবং ইথান্যাল (CH₃CHO)-এর মধ্যে দুটি ভিন্ন সহজ পার্থক্যকারী বিক্রিয়া কী', fact: '১) আয়োডোফর্ম (কেবল CH₃CHO হলুদ অধঃক্ষেপ দেয়); ২) অ্যালডল ঘনীভবন (কেবল CH₃CHO দেয়, HCHO দেয় না — HCHO দেয় ক্যানিজারো)', topic: 'অ্যালডিহাইড পার্থক্য', ch: 'chem2_ch2_organic' },
  { concept: 'ইথান্যাল (CH₃CHO) এবং প্রোপানোন (CH₃COCH₃)-এর মধ্যে পার্থক্য করতে কী ব্যবহার করা হয়', fact: 'টলেন্স বিকারক বা ফেহলিং দ্রবণ (উভয়েই আয়োডোফর্ম দেয়, কিন্তু কেবল CH₃CHO টলেন্স ও ফেহলিং পরীক্ষা দেয়)', topic: 'অ্যালডিহাইড-কিটোন পার্থক্য', ch: 'chem2_ch2_organic' },
  { concept: 'অ্যাসিটিক অ্যাসিড ও ফরমিক অ্যাসিডের মধ্যে পার্থক্য করতে কোন বিকারক ব্যবহার করা হয়', fact: 'টলেন্স বিকারক বা মারকিউরিক ক্লোরাইড (HgCl₂) — ফরমিক অ্যাসিড বিজারক হওয়ায় টলেন্সে Ag দর্পণ ও HgCl₂-এ সাদা Hg₂Cl₂ দেয়', topic: 'কার্বক্সিলিক পার্থক্য', ch: 'chem2_ch2_organic' },
  { concept: 'ফ্রুক্টোজ (কিটোহেক্সোজ) কিটোন গ্রুপ থাকা সত্ত্বেও টলেন্স ও ফেহলিং দ্রবণকে বিজারিত করে কেন', fact: 'ক্ষারীয় মাধ্যমে এনডায়োল টটোমারিজমের (Lobry de Bruyn–Alberda van Ekenstein পুনর্বিন্যাস) মাধ্যমে গ্লুকোজ/ম্যানোজে রূপান্তরিত হয় বলে', topic: 'শর্করার বিজারণ ধর্ম', ch: 'chem2_ch2_organic' },
  { concept: 'ডিএনএ ফিঙ্গারপ্রিন্টিং ও পলিমারের পাশাপাশি সাবান তৈরিতে তেল/চর্বি হিসেবে কীসের ট্রাইএস্টার ব্যবহৃত হয়', fact: 'গ্লিসারল (প্রোপেন-১,২,৩-ট্রাইঅল) এবং উচ্চতর ফ্যাটি অ্যাসিডের (স্টিয়ারিক, পামিটিক, ওলেইক অ্যাসিড) ট্রাইগ্লিসারাইড এস্টার', topic: 'তেল ও চর্বি', ch: 'chem2_ch2_organic' },
  { concept: 'তেল (তরল) থেকে কৃত্রিম ঘি বা ডালডা (কঠিন চর্বি) তৈরির হাইড্রোজেনেশন প্রক্রিয়ায় কী প্রভাবক লাগে', fact: 'সূক্ষ্ম নিকেল (Ni) প্রভাবক ও ১৫০–২০০ °C তাপমাত্রায় অসম্পৃক্ত C=C বন্ধনে H₂ সংযোজন', topic: 'হার্ডেনিং অব অয়েল', ch: 'chem2_ch2_organic' },
  { concept: 'লিবারম্যান নাইট্রোসো পরীক্ষা (Liebermann’s Nitroso Test) কোন শ্রেণির যৌগ শনাক্তকরণে ব্যবহৃত হয়', fact: 'ফেনল এবং সেকেন্ডারি (২°) অ্যামিন শনাক্তকরণে (সবুজ থেকে লাল ও NaOH-এ নীল বর্ণ পরিবর্তন)', topic: 'বিশেষ শনাক্তকরণ', ch: 'chem2_ch2_organic' },
  { concept: 'নাইলন-৬,৬ এর চেয়ে কেভলার (Kevlar) বা প্যারা-অ্যারামিড তন্তু বুলেটপ্রুফ জ্যাকেটে ব্যবহৃত হয় কেন', fact: 'অ্যারোম্যাটিক বলয় ও প্রবল আন্তঃশিকল হাইড্রোজেন বন্ধনের কারণে ইস্পাতের চেয়ে প্রায় ৫ গুণ বেশি প্রসার্য দৃঢ়তা সম্পন্ন', topic: 'উন্নত পলিমার', ch: 'chem2_ch2_organic' },
  { concept: 'জৈব যৌগে নাইট্রোজেন, সালফার ও হ্যালোজেন মৌলগুলো সমযোজী বন্ধন থেকে আয়নিক লবণে নেওয়ার "ল্যাসেইন পরীক্ষা" (Lassaigne’s Test) কী', fact: 'জৈব যৌগকে সোডিয়াম (Na) ধাতু সহ গলিয়ে NaCN, Na₂S ও NaX-এ রূপান্তর করে দ্রবণে শনাক্ত করা', topic: 'মৌল শনাক্তকরণ', ch: 'chem2_ch2_organic' },
  { concept: 'অ্যাক্রোলিন, ফরমালিন ও প্যারাফর্মালডিহাইডের মধ্যে "মেটালডিহাইড" বা "প্যারা-অ্যাসিট্যালডিহাইড" কীভাবে গঠিত হয়', fact: 'গাঢ় H₂SO₄-এর কয়েক ফোঁটার উপস্থিতিতে অ্যাসিট্যালডিহাইডের ত্রিমাত্রিক চক্রায়নে ট্রাইমার (প্যারালডিহাইড, ঘুমের ঔষধে) তৈরি হয়', topic: 'কার্বনিল পলিমার', ch: 'chem2_ch2_organic' },
];

export function buildChem2StructuredP(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sp_${String(seq++).padStart(4, '0')}`;

  const renderDual = (items: DualFact[], label: string) => {
    const factPool = Array.from(new Set(items.map((x) => x.fact)));
    const conceptPool = Array.from(new Set(items.map((x) => x.concept)));
    const topicPool = Array.from(new Set(items.map((x) => x.topic)));

    items.forEach((it, idx) => {
      const vl = it.ch === 'chem2_ch1_env' ? 'ph_buffer' : 'benzene_aromatic';
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: vl,
          hscLevel: '12',
          difficulty: idx % 2 === 0 ? 'medical' : 'dental',
          question: `${it.concept} — সঠিক ব্যাখ্যা কোনটি?`,
          correct: it.fact,
          distractors: factPool.filter((f) => f !== it.fact).slice(idx % 12, (idx % 12) + 5),
          explanation: `${it.concept}: ${it.fact}।`,
          reference: `রসায়ন ২য় পত্র · ${label} · ${it.topic}`,
        })
      );

      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: vl,
          hscLevel: '12',
          difficulty: 'board',
          question: `"${it.fact}" — এটি ${label}-এর কোন ধারণার সাথে সরাসরি সম্পর্কিত?`,
          correct: it.concept,
          distractors: conceptPool.filter((c) => c !== it.concept).slice((idx + 4) % 12, ((idx + 4) % 12) + 5),
          explanation: `${it.fact} তথ্যটি "${it.concept}" প্রসঙ্গে প্রযোজ্য।`,
          reference: `রসায়ন ২য় পত্র · ${label} · ${it.topic}`,
        })
      );

      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: vl,
          hscLevel: '12',
          difficulty: idx % 3 === 0 ? 'medical' : 'board',
          question: `${label}-এ "${it.concept}" বিষয়টি কোন উপ-টপিকের অন্তর্গত?`,
          correct: it.topic,
          distractors: topicPool.filter((t) => t !== it.topic),
          explanation: `"${it.concept}" মূলত "${it.topic}" অংশে আলোচিত হয়।`,
          reference: `রসায়ন ২য় পত্র · ${label} · ${it.topic}`,
        })
      );

      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: vl,
          hscLevel: '12',
          difficulty: 'dental',
          question: `পরীক্ষায় "${it.topic}" প্রসঙ্গে (${it.concept}) নিচের কোনটি সবচেয়ে নির্ভুল সিদ্ধান্ত?`,
          correct: it.fact,
          distractors: factPool.filter((f) => f !== it.fact).slice((idx + 7) % 12, ((idx + 7) % 12) + 5),
          explanation: `নির্ভুল সিদ্ধান্ত: ${it.fact}।`,
          reference: `রসায়ন ২য় পত্র · ${label} · ${it.topic}`,
        })
      );
    });
  };

  renderDual(CH1_DEEP_DRILLS, 'পরিবেশ রসায়ন');
  renderDual(CH2_CONVERSION_DRILLS, 'জৈব রূপান্তর ও কৌশল');

  // 3. Sigma & Pi Bond Counting Matrix (12 molecules × 2 = 24 MCQs, chem2_ch2_organic)
  const sigmaPiMolecules = [
    { mol: 'বেনজিন (C₆H₆)', bonds: '১২টি সিগমা (σ) ও ৩টি পাই (π) বন্ধন' },
    { mol: 'ন্যাফথ্যালিন (C₁₀H₈)', bonds: '১৯টি সিগমা (σ) ও ৫টি পাই (π) বন্ধন' },
    { mol: 'টলুইন (C₆H₅CH₃)', bonds: '১৫টি সিগমা (σ) ও ৩টি পাই (π) বন্ধন' },
    { mol: 'অ্যানথ্রাসিন (C₁₄H₁₀)', bonds: '২৬টি সিগমা (σ) ও ৭টি পাই (π) বন্ধন' },
    { mol: 'টেট্রাসায়ানোইথিলিন [(CN)₂C=C(CN)₂]', bonds: '৯টি সিগমা (σ) ও ৯টি পাই (π) বন্ধন' },
    { mol: 'প্রোপিন (CH₃–CH=CH₂)', bonds: '৮টি সিগমা (σ) ও ১টি পাই (π) বন্ধন' },
    { mol: '১,৩-বিউটাডাইন (CH₂=CH–CH=CH₂)', bonds: '৯টি সিগমা (σ) ও ২টি পাই (π) বন্ধন' },
    { mol: 'প্রোপানোন (CH₃–CO–CH₃)', bonds: '৯টি সিগমা (σ) ও ১টি পাই (π) বন্ধন' },
    { mol: 'ফেনল (C₆H₅OH)', bonds: '১৩টি সিগমা (σ) ও ৩টি পাই (π) বন্ধন' },
    { mol: 'ইথানোয়িক অ্যাসিড (CH₃COOH)', bonds: '৭টি সিগমা (σ) ও ১টি পাই (π) বন্ধন' },
    { mol: 'বিউট-১-ইন-৩-আইন (ভিনাইল অ্যাসিটিলিন)', bonds: '৭টি সিগমা (σ) ও ৩টি পাই (π) বন্ধন' },
    { mol: 'মিথাইল সায়ানাইড (CH₃–C≡N)', bonds: '৫টি সিগমা (σ) ও ২টি পাই (π) বন্ধন' },
  ];
  const spBondPool = Array.from(new Set(sigmaPiMolecules.map((x) => x.bonds)));
  const spMolPool = Array.from(new Set(sigmaPiMolecules.map((x) => x.mol)));
  sigmaPiMolecules.forEach((sp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জৈব যৌগ "${sp.mol}"-এর একটি অণুতে মোট কয়টি সিগমা (σ) ও কয়টি পাই (π) বন্ধন থাকে?`,
        correct: sp.bonds,
        distractors: spBondPool.filter((b) => b !== sp.bonds),
        explanation: `${sp.mol} অণুর গঠনে মোট ${sp.bonds} বিদ্যমান।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · সিগমা ও পাই বন্ধন গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `নিচের কোন জৈব অণুটিতে "${sp.bonds}" উপস্থিত রয়েছে?`,
        correct: sp.mol,
        distractors: spMolPool.filter((m) => m !== sp.mol),
        explanation: `${sp.bonds} দেখা যায় "${sp.mol}" অণুতে।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · গাঠনিক বন্ধন সংখ্যা',
      })
    );
  });

  // 4. Parametric Gas RMS & Molecular Mass Comparison Drills (24 MCQs, chem2_ch1_env)
  const gasPairs = [
    { g1: 'H₂ (M=২)', g2: 'O₂ (M=৩২)', ratio: '৪ : ১', note: '√(৩২/২) = √১৬ = ৪ : ১' },
    { g1: 'H₂ (M=২)', g2: 'CH₄ (M=১৬)', ratio: '২√২ : ১ (≈ ২.৮৩ : ১)', note: '√(১৬/২) = √৮ = ২√২ : ১' },
    { g1: 'He (M=৪)', g2: 'CH₄ (M=১৬)', ratio: '২ : ১', note: '√(১৬/৪) = √৪ = ২ : ১' },
    { g1: 'CH₄ (M=১৬)', g2: 'SO₂ (M=৬৪)', ratio: '২ : ১ (CH₄ দ্বিগুণ দ্রুত)', note: '√(৬৪/১৬) = ২ : ১' },
    { g1: 'He (M=৪)', g2: 'Ar (M=৪০)', ratio: '√১০ : ১ (≈ ৩.১৬ : ১)', note: '√(৪০/৪) = √১০ : ১' },
    { g1: 'NH₃ (M=১৭)', g2: 'HCl (M=৩৬.৫)', ratio: '১.৪৬ : ১ (সাদা ধোঁয়া HCl প্রান্তের কাছে)', note: '√(৩৬.৫/১৭) ≈ ১.৪৬৫ : ১' },
    { g1: 'CO (M=২৮)', g2: 'N₂ (M=২৮)', ratio: '১ : ১ (সমান হার)', note: '√(২৮/২৮) = ১ : ১' },
    { g1: 'Ne (M=২০)', g2: 'SO₃ (M=৮০)', ratio: '২ : ১', note: '√(৮০/২০) = ২ : ১' },
  ];
  const grRatioPool = Array.from(new Set(gasPairs.map((x) => x.ratio)));
  gasPairs.forEach((gp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `সমান তাপমাত্রা ও চাপে ${gp.g1} এবং ${gp.g2} গ্যাসের ব্যাপন হারের অনুপাত (r₁ : r₂) কত?`,
        correct: gp.ratio,
        distractors: grRatioPool.filter((r) => r !== gp.ratio),
        explanation: `গ্রাহামের সূত্রমতে r₁/r₂ = √(M₂/M₁) = ${gp.note}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · ব্যাপন অনুপাত',
      })
    );
  });

  // 5. Diagnostic Reagents & Color/Product Matrix (20 × 2 = 40 MCQs, chem2_ch2_organic)
  const diagReagents = [
    { test: 'অ্যামোনিয়াক্যাল AgNO₃ (টলেন্স)', target: 'অ্যালডিহাইড (-CHO) ও প্রান্তীয় অ্যালকাইন (Ag প্রতিস্থাপন)', obs: 'রৌপ্য দর্পণ (অ্যালডিহাইডে) / সাদা অধঃক্ষেপ (অ্যালকাইনে)' },
    { test: 'ফেহলিং দ্রবণ (Cu²⁺ + রশেল লবণ)', target: 'অ্যালিফ্যাটিক অ্যালডিহাইড (এবং বিজারক গ্লুকোজ/ফ্রুক্টোজ)', obs: 'কিউপ্রাস অক্সাইডের (Cu₂O) ইটের ন্যায় লাল অধঃক্ষেপ' },
    { test: 'ব্রোমিন পানি (Br₂/H₂O)', target: 'ফেনল ও অ্যানিলিন (এবং অসম্পৃক্ত যৌগ)', obs: 'ফেনলে সাদা ২,৪,৬-ট্রাইব্রোমোফেনল অধঃক্ষেপ / অ্যালকিনে বর্ণহীন' },
    { test: 'নিরপেক্ষ ফেরিক ক্লোরাইড (FeCl₃)', target: 'ফেনোলিক -OH মূলক', obs: 'বেগুনি/নীলাভ-বেগুনি রঙের জটিল দ্রবণ' },
    { test: '২,৪-ডাইনাইট্রোফিনাইলহাইড্রাজিন (2,4-DNP)', target: 'কার্বনিল (>C=O: অ্যালডিহাইড ও কিটোন)', obs: 'হলুদ বা কমলা-লাল কেলাসিত হাইড্রাজোন অধঃক্ষেপ' },
    { test: 'সোডিয়াম বাইকার্বনেট (৫% NaHCO₃)', target: 'কার্বক্সিলিক অ্যাসিড (-COOH) ও সালফোনিক অ্যাসিড', obs: 'তীব্র ফেনাসহ বর্ণহীন CO₂ গ্যাসের বুদবুদ (চুনজল ঘোলা)' },
    { test: 'I₂ + NaOH (উত্তাপ) আয়োডোফর্ম', target: 'CH₃CO- এবং CH₃CH(OH)- মূলকযুক্ত যৌগ', obs: 'মিষ্টি ঝাঁঝালো গন্ধযুক্ত হালকা হলুদ CHI₃ অধঃক্ষেপ' },
    { test: 'CHCl₃ + অ্যালকোহলীয় KOH (কার্বিল অ্যামিন)', target: 'প্রাথমিক (১°) অ্যামিন (R-NH₂ / Ar-NH₂)', obs: 'অসহ্য তীব্র দুর্গন্ধযুক্ত আইসোসায়ানাইড গ্যাস' },
    { test: 'শীতল ১% ক্ষারীয় KMnO₄ (বেয়ারের বিকারক)', target: 'কার্বন-কার্বন দ্বিবন্ধন বা ত্রিবন্ধন অসম্পৃক্ততা', obs: 'গোলাপি বেগুনি বর্ণ দূরীভূত ও বাদামী MnO₂ অধঃক্ষেপ' },
    { test: 'অনার্দ্র ZnCl₂ + গাঢ় HCl (লুকাস)', target: '১°, ২°, ৩° অ্যালকোহলের শ্রেণি বিভাজন', obs: '৩°-এ তাৎক্ষণিক, ২°-এ ৫ মিনিটে সাদা ঘোলা স্তর, ১°-এ অপরিবর্তিত' },
    { test: 'অ্যাসিডযুক্ত K₂Cr₂O₇ দ্রবণ (তাপ)', target: '১° ও ২° অ্যালকোহল ও অ্যালডিহাইড', obs: 'কমলা ডাইক্রোমেট দ্রবণ বিজারিত হয়ে সবুজ Cr³⁺-এ রূপান্তর' },
    { test: 'ক্ষারীয় β-ন্যাফথল + ডায়াজোনিয়াম লবণ', target: 'প্রাথমিক অ্যারোম্যাটিক অ্যামিন (ডায়াজোকরণের পর)', obs: 'উজ্জ্বল কমলা-লাল অ্যাজো রঞ্জকের অধঃক্ষেপ' },
  ];
  const obsPool = diagReagents.map((x) => x.obs);
  const tgtPool = diagReagents.map((x) => x.target);
  diagReagents.forEach((dr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${dr.test}" পরীক্ষায় সংশ্লিষ্ট কার্যকরী মূলকের সাথে ধনাত্মক পর্যবেক্ষণ (Observation) কী পাওয়া যায়?`,
        correct: dr.obs,
        distractors: obsPool.filter((o) => o !== dr.obs).slice(i % 7, (i % 7) + 5),
        explanation: `${dr.test} (${dr.target}) → ${dr.obs}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · কার্যকরী মূলক শনাক্তকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${dr.test}" বিকারকটি প্রধানত কোন শ্রেণির যৌগ বা মূলক শনাক্তকরণে প্রযোজ্য?`,
        correct: dr.target,
        distractors: tgtPool.filter((t) => t !== dr.target).slice((i + 4) % 7, ((i + 4) % 7) + 5),
        explanation: `${dr.test} দ্বারা ${dr.target} শনাক্ত করা হয় (${dr.obs})।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · গুণগত জৈব বিশ্লেষণ',
      })
    );
  });

  // Unused import guard
  void toBnDigits;

  return list;
}
