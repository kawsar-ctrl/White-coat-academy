import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

// Chemistry 2nd Paper Structured Pool O (~470 MCQs)
// Focus: Chapter 4 (Electrochemistry) & Chapter 5 (Economic / Industrial Chemistry)
// - Conductance, Kohlrausch, Faraday's 1st & 2nd Laws, Selective Discharge
// - Electrochemical Series, Galvanic/Daniell Cell, SHE, Calomel, Nernst Equation
// - Batteries (Dry, Mercury, Lead-Acid, Li-ion), H₂-O₂ Fuel Cell, Corrosion
// - Bangladesh Natural Gas & Coal, Urea, Cement, Glass, Ceramic, Pulp/Paper, Leather, ETP, Nano

interface Ch45Fact {
  concept: string;
  fact: string;
  topic: string;
  ch: 'chem2_ch4_electro' | 'chem2_ch5_economic';
}

const ELECTROCHEM_FACTS: Ch45Fact[] = [
  { concept: 'ধাতব (ইলেকট্রনীয়) পরিবাহী ও তড়িৎ বিশ্লেষ্য (আয়নিক) পরিবাহীর ওপর তাপমাত্রা বৃদ্ধির প্রভাব', fact: 'তাপমাত্রা বাড়লে ধাতব পরিবাহিতা কমে (ক্যাটলন কম্পনে বাধা), কিন্তু তড়িৎ বিশ্লেষ্যের পরিবাহিতা বাড়ে (সান্দ্রতা কমে ও আয়ন গতিশীলতা বাড়ে)', topic: 'তড়িৎ পরিবাহিতা', ch: 'chem2_ch4_electro' },
  { concept: 'তড়িৎ বিশ্লেষ্যের মোলার পরিবাহিতা (Λm) ও আপেক্ষিক পরিবাহিতা (κ)-এর গাণিতিক সম্পর্ক', fact: 'Λm = (κ × ১০০০) / C (যেখানে C = মোলারিটি; একক S·cm²·mol⁻¹) — লঘুকরণে Λm বাড়ে কিন্তু κ কমে', topic: 'পরিবাহিতা ও লঘুকরণ', ch: 'chem2_ch4_electro' },
  { concept: 'অসীম লঘুত্বে তীব্র ও দুর্বল তড়িৎ বিশ্লেষ্যের মোলার পরিবাহিতা মাপার "কোলরাশের সূত্র" (Kohlrausch’s Law)', fact: 'Λ°m = ν⁺λ°⁺ + ν⁻λ°⁻ (অসীম লঘুত্বে প্রতিটি আয়ন অপর আয়নের প্রভাবমুক্ত হয়ে স্বাধীনভাবে পরিবাহিতায় অবদান রাখে)', topic: 'কোলরাশের সূত্র', ch: 'chem2_ch4_electro' },
  { concept: 'ফ্যারাডের প্রথম তড়িৎ বিশ্লেষণ সূত্র (Faraday’s 1st Law: W = ZIt)', fact: 'তড়িৎদ্বারে সঞ্চিত বা দ্রবীভূত পদার্থের ভর (W) প্রবাহিত তড়িৎ চার্জ Q (= It)-এর সমানুপাতিক; W = (M × I × t) / (n × F)', topic: 'ফ্যারাডের সূত্র', ch: 'chem2_ch4_electro' },
  { concept: 'ফ্যারাডের দ্বিতীয় সূত্র (Faraday’s 2nd Law) — শ্রেণি সংযোগে ভিন্ন ভিন্ন তড়িৎ বিশ্লেষ্য', fact: 'সমান চার্জ (Q) প্রবাহিত হলে বিভিন্ন তড়িৎদ্বারে সঞ্চিত পদার্থের ভর তাদের রাসায়নিক তুল্যভরের (E = M/n) সমানুপাতিক', topic: 'ফ্যারাডের সূত্র', ch: 'chem2_ch4_electro' },
  { concept: 'তড়িৎ রাসায়নিক তুল্যাঙ্ক (Z) ও রাসায়নিক তুল্যভর (E)-এর সম্পর্ক', fact: 'Z = E / F = M / (n × ৯৬৫০০) g/C (অর্থাৎ ১ কুলম্ব চার্জে সঞ্চিত পদার্থের ভর)', topic: 'তড়িৎ রাসায়নিক তুল্যাঙ্ক', ch: 'chem2_ch4_electro' },
  { concept: 'গাঢ় NaCl দ্রবণ (ব্রাইন) বনাম অতি লঘু NaCl দ্রবণের তড়িৎ বিশ্লেষণে প্ল্যাটিনাম অ্যানোডে কী উৎপন্ন হয়', fact: 'গাঢ় ব্রাইনে Cl₂ গ্যাস (ক্লোরাইডের উচ্চ ঘনমাত্রার কারণে), কিন্তু অতি লঘু NaCl-এ H₂O জারিত হয়ে O₂ গ্যাস উৎপন্ন হয়', topic: 'তড়িৎ বিশ্লেষণ উৎপাদ', ch: 'chem2_ch4_electro' },
  { concept: 'কস্টিক সোডা (NaOH) উৎপাদনে পারদ ক্যাথোড কোষে (Castner-Kellner) ক্যাথোডে H⁺-এর বদলে Na⁺ চার্জমুক্ত হয় কেন', fact: 'পারদে হাইড্রোজেনের অতিবিভব (Overpotential) অনেক বেশি হওয়ায় Na⁺ আগে বিজারিত হয়ে সোডিয়াম অ্যামালগাম (Na-Hg) তৈরি করে', topic: 'অতিবিভব প্রভাব', ch: 'chem2_ch4_electro' },
  { concept: 'তড়িৎ রাসায়নিক সারিতে (Electrochemical Series) লিথিয়াম (Li) ও ফ্লোরিন (F₂)-এর অবস্থান ও প্রমাণ বিজারণ বিভব', fact: 'Li শীর্ষে (সর্বনিম্ন E°red = -৩.০৫ V — শক্তিশালী বিজারক); F₂ সর্বনিম্নে (সর্বোচ্চ E°red = +২.৮৭ V — শক্তিশালী জারক)', topic: 'তড়িৎ রাসায়নিক সারি', ch: 'chem2_ch4_electro' },
  { concept: 'তড়িৎ রাসায়নিক সারির কোন ধাতুগুলো লঘু HCl বা H₂SO₄ থেকে প্রতিস্থাপন করে হাইড্রোজেন (H₂) গ্যাস মুক্ত করতে পারে', fact: 'যাদের প্রমাণ বিজারণ বিভব ঋণাত্মক (E°red < ০, যেমন Li, Na, Mg, Al, Zn, Fe); Cu, Ag, Au, Pt পারে না (E°red > ০)', topic: 'ধাতব সক্রিয়তা', ch: 'chem2_ch4_electro' },
  { concept: 'গ্যালভানিক কোষ (যেমন ড্যানিয়েল কোষ Zn|Zn²⁺||Cu²⁺|Cu)-এ অ্যানোড ও ক্যাথোডের চিহ্ন ও ক্রিয়া', fact: 'অ্যানোড ঋণাত্মক (-) যেখানে জারণ ঘটে (Zn → Zn²⁺ + 2e⁻) এবং ক্যাথোড ধনাত্মক (+) যেখানে বিজারণ ঘটে (Cu²⁺ + 2e⁻ → Cu); প্রমাণ বিভব E°cell = +১.১০ V', topic: 'ড্যানিয়েল কোষ', ch: 'chem2_ch4_electro' },
  { concept: 'গ্যালভানিক কোষে লবণ সেতু (Salt Bridge — KCl, KNO₃ বা NH₄NO₃)-এর প্রধান দুটি কাজ কী', fact: '১) অভ্যন্তরীণ বর্তনী পূর্ণ করা ও ২) উভয় অর্ধকোষে তড়িৎ নিরপেক্ষতা (Electrical Neutrality) বজায় রাখা; K⁺ ও Cl⁻-এর আয়ন গতিবেগ প্রায় সমান', topic: 'লবণ সেতু', ch: 'chem2_ch4_electro' },
  { concept: 'প্রমাণ হাইড্রোজেন তড়িৎদ্বার (SHE — Standard Hydrogen Electrode)-এর শর্ত ও নির্ধারিত বিভব', fact: '২৫ °C (২৯৮ K)-এ ১ M [H⁺] দ্রবণে প্লাটিনাইজড Pt পাতে ১ atm চাপে শুষ্ক H₂ গ্যাস চালনা; এর E° = ০.০০ V ধরা হয়', topic: 'প্রমাণ তড়িৎদ্বার', ch: 'chem2_ch4_electro' },
  { concept: 'সেকেন্ডারি নির্দেশক তড়িৎদ্বার "সম্পৃক্ত ক্যালোমেল তড়িৎদ্বার" (Calomel Electrode)-এর গঠন ও বিভব', fact: 'Hg | Hg₂Cl₂(s), সম্পৃক্ত KCl; ২৫ °C-এ এর প্রমাণ বিজারণ বিভব +০.২৪২ V (বা ১ N KCl-এ +০.২৮ V)', topic: 'নির্দেশক তড়িৎদ্বার', ch: 'chem2_ch4_electro' },
  { concept: 'নার্নস্ট সমীকরণ (Nernst Equation) অনুসারে ২৫ °C (২৯৮ K)-এ কোষ বিভব Ecell-এর সূত্র', fact: 'Ecell = E°cell - (0.0591 / n) log₁₀([উৎপাদ]/[বিক্রিয়ক]); সাম্যাবস্থায় Ecell = ০ হলে log₁₀K = nE°/০.০৫৯১', topic: 'নার্নস্ট সমীকরণ', ch: 'chem2_ch4_electro' },
  { concept: 'একটি তড়িৎ রাসায়নিক কোষ স্বতঃস্ফূর্তভাবে কাজ করার জন্য ΔG° ও E°cell-এর চিহ্ন কেমন হতে হবে', fact: 'E°cell ধনাত্মক (> ০) এবং মুক্তশক্তি পরিবর্তন ΔG° = -nFE°cell ঋণাত্মক (< ০)', topic: 'তাপগতিবিদ্যা ও কোষ', ch: 'chem2_ch4_electro' },
  { concept: 'লেকল্যান্স শুষ্ক কোষ (Dry Cell) বনাম মার্কারি বাটন সেল (Mercury Cell)-এর ভোল্টেজ ও বৈশিষ্ট্য', fact: 'ড্রাই সেল (Zn অ্যানোড, MnO₂+C ক্যাথোড, NH₄Cl+ZnCl₂ পেস্ট): ১.৫ V; মার্কারি সেল (HgO ক্যাথোড): স্থির ১.৩৫ V (আয়ন ঘনত্ব না বদলানোয়)', topic: 'প্রাইমারি ব্যাটারি', ch: 'chem2_ch4_electro' },
  { concept: 'গাড়ির লেড স্টোরেজ বা সঞ্চয়ক ব্যাটারির (Lead-Acid Battery) তড়িৎদ্বার, তড়িৎ বিশ্লেষ্য ও ভোল্টেজ', fact: 'অ্যানোড Pb, ক্যাথোড PbO₂, তড়িৎ বিশ্লেষ্য ৩৮% H₂SO₄ (আপেক্ষিক গুরুত্ব ১.২৮–১.৩০); প্রতি কোষ ~২ V (৬টি সিরিজে ১২ V)', topic: 'সেকেন্ডারি ব্যাটারি', ch: 'chem2_ch4_electro' },
  { concept: 'রিচার্জেবল লিথিয়াম-আয়ন (Li-ion) ব্যাটারির প্রধান সুবিধা ও ক্যাথোড-অ্যানোড উপাদান', fact: 'উচ্চ শক্তি-ভর অনুপাত ও স্মৃতি-প্রভাবহীন (৩.৬–৩.৭ V); গ্রাফাইট অ্যানোড ও LiCoO₂/LiFePO₄ ক্যাথোড', topic: 'লিথিয়াম ব্যাটারি', ch: 'chem2_ch4_electro' },
  { concept: 'হাইড্রোজেন-অক্সিজেন ফুয়েল সেল (H₂–O₂ Fuel Cell)-এর কার্যদক্ষতা ও প্রধান পরিবেশগত সুবিধা', fact: 'গরম KOH দ্রবণে ছিদ্রযুক্ত কার্বন+Pt তড়িৎদ্বার; কার্যদক্ষতা ~৭০–৭৫%, ভোল্টেজ ১.২৩ V ও উপজাত বিশুদ্ধ পানীয় জল (মহাকাশযানে ব্যবহৃত)', topic: 'ফুয়েল সেল', ch: 'chem2_ch4_electro' },
  { concept: 'লোহায় মরিচা (Rust: Fe₂O₃·xH₂O) রোধে "উৎসর্গীকৃত অ্যানোড" বা ক্যাথোডিক সুরক্ষা পদ্ধতিতে কী ব্যবহৃত হয়', fact: 'লোহার চেয়ে অধিক সক্রিয় ধাতু ম্যাগনেসিয়াম (Mg) বা দস্তা (Zn — গ্যালভানাইজিং) — যা নিজে ক্ষয়ে গিয়ে লোহাকে রক্ষা করে', topic: 'ক্ষয়রোধ ও গ্যালভানাইজিং', ch: 'chem2_ch4_electro' },
  { concept: 'pH মিটারে দ্রবণের pH মাপার জন্য নির্দেশক তড়িৎদ্বার হিসেবে কোন বিশেষ তড়িৎদ্বার ব্যবহৃত হয়', fact: 'গ্লাস তড়িৎদ্বার (Glass Electrode — অতি পাতলা কাচের বাল্ব H⁺ আয়নের প্রতি সংবেদনশীল)', topic: 'যান্ত্রিক তড়িৎদ্বার', ch: 'chem2_ch4_electro' },
];

const ECONOMIC_INDUSTRIAL_FACTS: Ch45Fact[] = [
  { concept: 'বাংলাদেশের প্রাকৃতিক গ্যাসের প্রধান উপাদান (প্রায় ৯৪–৯৯%) ও প্রথম আবিষ্কৃত গ্যাসক্ষেত্র', fact: 'প্রধান উপাদান মিথেন (CH₄, সালফার-মুক্ত উৎকৃষ্ট মান); প্রথম গ্যাসক্ষেত্র সিলেটের হরিপুর (১৯৫৫) ও বৃহত্তম তিতাস/বিবিয়ানা', topic: 'প্রাকৃতিক গ্যাস ও কয়লা', ch: 'chem2_ch5_economic' },
  { concept: 'কয়লার মানের ক্রম (কার্বন শতকরা হার অনুযায়ী) ও বাংলাদেশের বড়পুকুরিয়া কয়লার শ্রেণি', fact: 'পিট (~৫০%) < লিগনাইট (~৬৫%) < বিটুমিনাস (~৮০%+) < অ্যানথ্রাসাইট (~৯০%+); বড়পুকুরিয়ায় উচ্চমানের বিটুমিনাস কয়লা মেলে', topic: 'কয়লার শ্রেণিবিভাগ', ch: 'chem2_ch5_economic' },
  { concept: 'ইউরিয়া সার CO(NH₂)₂-এ নাইট্রোজেনের শতকরা পরিমাণ ও উৎপাদনের দুটি ধাপের মধ্যবর্তী যৌগ', fact: '৪৬.৬% (প্রায় ৪৬% N); উচ্চ চাপ ও ১৮০–১৯০ °C তাপমাত্রায় NH₃ + CO₂ থেকে প্রথমে অ্যামোনিয়াম কার্বামেট (NH₂COONH₄) পরে বিয়োজনে ইউরিয়া', topic: 'ইউরিয়া সার শিল্প', ch: 'chem2_ch5_economic' },
  { concept: 'ইউরিয়া উৎপাদনে ক্ষতিকর উপজাত "বাইইউরেট" (Biuret) কেন ২%-এর নিচে রাখতে হয়', fact: 'ইউরিয়া অতিরিক্ত উত্তপ্ত হলে দুটি অণু মিলে NH₃ ত্যাগ করে বাইইউরেট গড়ে, যা ফসলের বীজ অঙ্কুরোদগম ও পাতার ক্ষতি করে', topic: 'ইউরিয়ার বিশুদ্ধতা', ch: 'chem2_ch5_economic' },
  { concept: 'মিশ্র সার TSP (ট্রিপল সুপার ফসফেট) ও DAP (ডাই-অ্যামোনিয়াম ফসফেট)-এর উপাদান ও পুষ্টিগুণ', fact: 'TSP: Ca(H₂PO₄)₂ (রক ফসফেট + H₃PO₄, ~৪৬–৪৮% P₂O₅); DAP: (NH₄)₂HPO₄ (১৮% N ও ৪৬% P₂O₅ উভয়ই সরবরাহ করে)', topic: 'ফসফেট সার', ch: 'chem2_ch5_economic' },
  { concept: 'পোর্টল্যান্ড সিমেন্টের প্রধান চারটি অক্সাইড উপাদান ও সর্বাধিক পরিমাণে থাকা অক্সাইড', fact: 'চুন CaO (৬০–৬৭% সর্বাধিক), সিলিকা SiO₂ (১৭–২৫%), অ্যালুমিনা Al₂O₃ (৩–৮%) এবং আয়রন অক্সাইড Fe₂O₃ (০.৫–৬%)', topic: 'সিমেন্ট উপাদান', ch: 'chem2_ch5_economic' },
  { concept: 'সিমেন্ট ক্লিংকারের যৌগগুলোর (C₃S, C₂S, C₃A) ভূমিকা ও জিপসাম (CaSO₄·2H₂O) যোগের কারণ', fact: 'C₃S প্রাথমিক দৃঢ়তা ও C₂S দীর্ঘমেয়াদী দৃঢ়তা দেয়; C₃A দ্রুত জমাট বাঁধতে চায় বলে জমাট বাঁধা মন্থর (Retard) করতে ২–৫% জিপসাম মেশানো হয়', topic: 'সিমেন্ট রসায়ন', ch: 'chem2_ch5_economic' },
  { concept: 'সোডা-লাইম কাচ বনাম বোরোসিলিকেট (পাইরেক্স) কাচের উপাদান ও ব্যবহারের পার্থক্য', fact: 'সোডা-লাইম (জানালা/বোতল): Na₂O·CaO·6SiO₂; বোরোসিলিকেট কাচে B₂O₃ থাকায় প্রসারণ গুণাঙ্ক অতি কম ও তাপসহিষ্ণু (ল্যাব যন্ত্রপাতি)', topic: 'কাচ শিল্প', ch: 'chem2_ch5_economic' },
  { concept: 'কাচ শিল্পে অ্যানিলিং (Annealing) প্রক্রিয়া ও রঙিন কাচ তৈরিতে ব্যবহৃত ধাতব অক্সাইড', fact: 'তপ্ত কাচকে ভেঙে যাওয়া রোধে ধীর ও নিয়ন্ত্রিত শীতলীকরণই অ্যানিলিং; রঙের জন্য CoO (গাঢ় নীল), Cr₂O₃ (সবুজ), FeO (হালকা সবুজ)', topic: 'কাচের অ্যানিলিং', ch: 'chem2_ch5_economic' },
  { concept: 'সিরামিক শিল্পের তিনটি প্রধান মৌলিক কাঁচামাল (চায়না ক্লে, ফেল্ডস্পার ও কোয়ার্টজ)-এর ভূমিকা', fact: 'চায়না ক্লে/কেওলিইন (Al₂O₃·2SiO₂·2H₂O) নমনীয়তা দেয়, ফেল্ডস্পার (K₂O·Al₂O₃·6SiO₂) ফ্লাক্স/গলায় এবং কোয়ার্টজ/ফ্লিন্ট (SiO₂) কাঠামোগত দৃঢ়তা দেয়', topic: 'সিরামিক শিল্প', ch: 'chem2_ch5_economic' },
  { concept: 'কাগজ তৈরির ক্রাফট (Kraft / সালফেট) পদ্ধতিতে বাঁশ বা কাঠ থেকে লিগনিন সরাতে কোন হজম-তরল (White Liquor) লাগে', fact: 'কস্টিক সোডা (NaOH) ও সোডিয়াম সালফাইড (Na₂S)-এর মিশ্রণ (খুব মজবুত পাল্প পাওয়া যায়)', topic: 'পাল্প ও কাগজ শিল্প', ch: 'chem2_ch5_economic' },
  { concept: 'কাগজের পাল্পকে ফর্সা করতে পরিবেশবান্ধব বিরঞ্জক ও কাগজে কালি না ছড়ানোর জন্য সাইজিং উপাদান', fact: 'বিরঞ্জনে ClO₂ বা H₂O₂ (ক্লোরিন নয়, ডাইঅক্সিন এড়াতে); সাইজিং-এ রজিন সাবান ও অ্যালুম (ফিটকিরি)', topic: 'কাগজ উৎপাদন', ch: 'chem2_ch5_economic' },
  { concept: 'চামড়া পাকা বা ট্যানিং (Chrome Tanning) করার জন্য প্রধান ট্যানিং এজেন্ট ও বর্জ্য পরিবেশগত ঝুঁকি', fact: 'বেসিক ক্রোমিয়াম সালফেট [Cr(OH)SO₄ / Cr₂(SO₄)₃] — এর Cr³⁺ বর্জ্যে জারিত হয়ে ক্যান্সার সৃষ্টিকারী বিষাক্ত Cr⁶⁺ হয়ে নদী দূষিত করে', topic: 'চামড়া ট্যানিং', ch: 'chem2_ch5_economic' },
  { concept: 'আখের ছোবড়া (Bagasse) ও ঝোলাগুড় (Molasses) চিনি শিল্পের কোন দুটি মূল্যবান উপজাত', fact: 'ব্যাগাস বা ছোবড়া কাগজ মণ্ড ও বয়লার জ্বালানিতে এবং মোলাসেস গাঁজন করে ইথানল/স্পিরিট উৎপাদনে ব্যবহৃত হয়', topic: 'চিনি শিল্প উপজাত', ch: 'chem2_ch5_economic' },
  { concept: 'সবুজ রসায়নের (Green Chemistry) "অ্যাটম ইকোনমি" (Atom Economy) বলতে কী বোঝায়', fact: '(কাঙ্ক্ষিত উৎপাদের আণবিক ভর / সকল বিক্রিয়কের মোট আণবিক ভর) × ১০০% — যত বেশি (১০০% এর কাছাকাছি), বর্জ্য তত কম ও বিক্রিয়া তত পরিবেশবান্ধব', topic: 'গ্রিন কেমিস্ট্রি', ch: 'chem2_ch5_economic' },
  { concept: 'ETP (Effluent Treatment Plant) ও বর্জ্য ব্যবস্থাপনার 3R নীতি বলতে কী বোঝায়', fact: 'ETP হলো শিল্প তরল বর্জ্য পরিশোধনাগার (ভৌত, রাসায়নিক ও জৈবিক ধাপ); 3R হলো Reduce (হ্রাস), Reuse (পুনঃব্যবহার) ও Recycle (পুনঃচক্রায়ণ)', topic: 'বর্জ্য ব্যবস্থাপনা', ch: 'chem2_ch5_economic' },
  { concept: 'ন্যানো-কণার (Nanoparticles) আকার সীমা ও বাণিজ্যিকভাবে ব্যবহৃত প্রধান ৩টি ন্যানো-পদার্থ', fact: '১–১০০ ন্যানোমিটার (nm); কার্বন ন্যানোটিউব (CNT) ও গ্রাফিন, জীবাণুনাশক ন্যানো-সিলভার (Ag) এবং সানস্ক্রিনে ন্যানো-TiO₂ / ZnO', topic: 'ন্যানো-রসায়ন', ch: 'chem2_ch5_economic' },
  { concept: 'ইউরিয়া সারে দ্রুত গলন রোধ ও ধীর নিঃসরণের জন্য মাঝে মাঝে কোন প্রলেপ ব্যবহার করা হয় এবং প্রিলিং টাওয়ারের কাজ কী', fact: 'প্রিলিং টাওয়ারে গলিত ইউরিয়াকে বাতাসে স্প্রে করে গোলাকার দানা (Prills) বানানো হয়; ধীর নিঃসরণে সালফার বা নিম-কোটিং হয়', topic: 'ইউরিয়া প্রক্রিয়াকরণ', ch: 'chem2_ch5_economic' },
  { concept: 'বাংলাদেশের সিলেটের ছাতক ও সরকারি-বেসরকারি সিমেন্ট কারখানাগুলোতে চুনাপাথরের মূল বিকল্প কাঁচামাল কোনটি', fact: 'চুনাপাথর (CaCO₃) ও কাদামাটি (Al₂O₃·SiO₂) মিশিয়ে রোটারি কিল্নে ১৪৫০ °C তাপমাত্রায় পুড়িয়ে সিমেন্ট ক্লিংকার তৈরি হয়', topic: 'সিমেন্ট উৎপাদন', ch: 'chem2_ch5_economic' },
  { concept: 'ফুটো বা কাঁচের পাত্রে নকশা খোদাই (Etching of Glass) করার জন্য কোন অ্যাসিড ব্যবহার করা হয়', fact: 'হাইড্রোফ্লোরিক অ্যাসিড (HF — কাচের SiO₂-এর সাথে বিক্রিয়া করে উদ্বায়ী SiF₄ ও H₂SiF₆ তৈরি করে)', topic: 'কাচ ও HF বিক্রিয়া', ch: 'chem2_ch5_economic' },
];

export function buildChem2StructuredO(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2so_${String(seq++).padStart(4, '0')}`;

  const renderChapterFacts = (items: Ch45Fact[], chapterTitle: string) => {
    const factPool = Array.from(new Set(items.map((x) => x.fact)));
    const conceptPool = Array.from(new Set(items.map((x) => x.concept)));
    const topicPool = Array.from(new Set(items.map((x) => x.topic)));

    items.forEach((it, idx) => {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: it.ch === 'chem2_ch4_electro' ? 'ph_buffer' : 'benzene_aromatic',
          hscLevel: '12',
          difficulty: idx % 2 === 0 ? 'medical' : 'dental',
          question: `${it.concept} — সঠিক তথ্য কোনটি?`,
          correct: it.fact,
          distractors: factPool.filter((f) => f !== it.fact).slice(idx % 10, (idx % 10) + 5),
          explanation: `${it.concept}: ${it.fact}।`,
          reference: `রসায়ন ২য় পত্র · ${chapterTitle} · ${it.topic}`,
        })
      );

      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: it.ch === 'chem2_ch4_electro' ? 'ph_buffer' : 'benzene_aromatic',
          hscLevel: '12',
          difficulty: 'board',
          question: `"${it.fact}" — এটি ${chapterTitle}-এর কোন প্রশ্নের সঠিক উত্তর?`,
          correct: it.concept,
          distractors: conceptPool.filter((c) => c !== it.concept).slice((idx + 4) % 10, ((idx + 4) % 10) + 5),
          explanation: `${it.fact} বিবৃতিটি "${it.concept}" প্রসঙ্গে প্রযোজ্য।`,
          reference: `রসায়ন ২য় পত্র · ${chapterTitle} · ${it.topic}`,
        })
      );

      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: it.ch === 'chem2_ch4_electro' ? 'ph_buffer' : 'benzene_aromatic',
          hscLevel: '12',
          difficulty: idx % 3 === 0 ? 'medical' : 'board',
          question: `${chapterTitle}-এ "${it.concept}" মূলত কোন বিষয়ের অন্তর্ভুক্ত?`,
          correct: it.topic,
          distractors: topicPool.filter((t) => t !== it.topic),
          explanation: `"${it.concept}" "${it.topic}" বিষয়াংশের অন্তর্ভুক্ত।`,
          reference: `রসায়ন ২য় পত্র · ${chapterTitle} · ${it.topic}`,
        })
      );

      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: it.ch,
          visualLessonId: it.ch === 'chem2_ch4_electro' ? 'ph_buffer' : 'benzene_aromatic',
          hscLevel: '12',
          difficulty: 'dental',
          question: `বোর্ড ও ভর্তি পরীক্ষায় "${it.topic}" থেকে ${it.concept} বিষয়ে কোনটি সর্বাধিক গুরুত্বপূর্ণ সিদ্ধান্ত?`,
          correct: it.fact,
          distractors: factPool.filter((f) => f !== it.fact).slice((idx + 6) % 10, ((idx + 6) % 10) + 5),
          explanation: `মূল সিদ্ধান্ত: ${it.fact}।`,
          reference: `রসায়ন ২য় পত্র · ${chapterTitle} · ${it.topic}`,
        })
      );
    });
  };

  renderChapterFacts(ELECTROCHEM_FACTS, 'অধ্যায় ৪ (তড়িৎ রসায়ন)');
  renderChapterFacts(ECONOMIC_INDUSTRIAL_FACTS, 'অধ্যায় ৫ (অর্থনৈতিক রসায়ন)');

  // 3. Faraday Electrolysis Quantitative Drills (24 MCQs, chem2_ch4_electro)
  const faradayCases = [
    { q: 'গলিত Al₂O₃ বা AlCl₃ থেকে ১ মোল অ্যালুমিনিয়াম (২৭ g) সঞ্চিত করতে কত ফ্যারাডে (F) তড়িৎ প্রয়োজন?', a: '৩ ফ্যারাডে (৩ × ৯৬৫০০ C)', d: ['১ ফ্যারাডে', '২ ফ্যারাডে', '৬ ফ্যারাডে'], exp: 'Al³⁺ + 3e⁻ → Al; ১ মোল Al³⁺ বিজারণে ৩ মোল ইলেকট্রন অর্থাৎ ৩ F তড়িৎ লাগে।' },
    { q: 'CuSO₄ দ্রবণের মধ্য দিয়ে ২ অ্যাম্পিয়ার তড়িৎ ৪৮,২৫০ সেকেন্ড চালনা করলে ক্যাথোডে কত গ্রাম কপার (Cu = ৬৩.৫) জমবে?', a: '৩১.৭৫ গ্রাম (০.৫ মোল Cu)', d: ['৬৩.৫ গ্রাম', '১৫.৮৭৫ গ্রাম', '১২৭ গ্রাম'], exp: 'Q = ২ × ৪৮২৫০ = ৯৬৫০০ C = ১ F; ১ F তড়িতে Cu²⁺ (n=২) সঞ্চিত হয় ৬৩.৫/২ = ৩১.৭৫ g।' },
    { q: 'AgNO₃ দ্রবণের মধ্য দিয়ে ৯৬৫ কুলম্ব তড়িৎ চালনা করলে ক্যাথোডে কত গ্রাম সিলভার (Ag = ১০৮) জমা হবে?', a: '১.০৮ গ্রাম', d: ['১০.৮ গ্রাম', '০.১০৮ গ্রাম', '৫.৪০ গ্রাম'], exp: 'Q = ৯৬৫ C = ০.০১ F; Ag⁺ (n=১) হওয়ায় W = ০.০১ × ১০৮ = ১.০৮ g।' },
    { q: 'একটি ক্রোমিয়াম Cr₂(SO₄)₃ দ্রবণ থেকে ২ মোল ক্রোমিয়াম (Cr³⁺) সঞ্চিত করতে কত ফ্যারাডে বিদ্যুৎ লাগবে?', a: '৬ ফ্যারাডে', d: ['২ ফ্যারাডে', '৩ ফ্যারাডে', '৪ ফ্যারাডে'], exp: 'প্রতি মোল Cr³⁺ + 3e⁻ → Cr জন্য ৩ F; তাই ২ মোলের জন্য ৬ F।' },
    { q: 'শ্রেণি সংযোগে AgNO₃ এবং CuSO₄ দ্রবণের মধ্য দিয়ে সমান চার্জ পাঠালে ১০.৮ g Ag জমলে কত গ্রাম Cu (৬৩.৫) জমবে?', a: '৩.১৭৫ গ্রাম', d: ['৬.৩৫ গ্রাম', '১.৫৮ গ্রাম', '১০.৮ গ্রাম'], exp: '১০.৮ g Ag = ০.১ F ⇒ ০.১ F তড়িতে Cu জমে ০.১ × (৬৩.৫/২) = ৩.১৭৫ g।' },
    { q: 'অম্লীয় পানির তড়িৎ বিশ্লেষণে ১ মোল O₂ গ্যাস অ্যানোডে উৎপন্ন হতে কত ফ্যারাডে চার্জ প্রবাহিত করতে হবে?', a: '৪ ফ্যারাডে', d: ['১ ফ্যারাডে', '২ ফ্যারাডে', '৮ ফ্যারাডে'], exp: '2H₂O → O₂ + 4H⁺ + 4e⁻; ১ মোল O₂ উৎপাদনে ৪ মোল e⁻ অর্থাৎ ৪ F তড়িৎ প্রয়োজন।' },
    { q: 'ZnSO₄ দ্রবণের মধ্য দিয়ে ৫ A তড়িৎ ১৯৩০ সেকেন্ড চালনা করলে কত গ্রাম Zn (M = ৬৫.৪) সঞ্চিত হবে?', a: '৩.২৭ গ্রাম', d: ['৬.৫৪ গ্রাম', '১.৬৩৫ গ্রাম', '৬৫.৪ গ্রাম'], exp: 'Q = ৫ × ১৯৩০ = ৯৬৫০ C = ০.১ F ⇒ W = ০.১ × (৬৫.৪/২) = ৩.২৭ g।' },
    { q: '১ মোল MnO₄⁻ আয়নকে অম্লীয় মাধ্যমে সম্পূর্ণরূপে Mn²⁺-এ বিজারিত করতে কত ফ্যারাডে তড়িৎ প্রয়োজন?', a: '৫ ফ্যারাডে', d: ['১ ফ্যারাডে', '৩ ফ্যারাডে', '৭ ফ্যারাডে'], exp: 'MnO₄⁻ (+৭) → Mn²⁺ (+২) পরিবর্তনে ৫টি ইলেকট্রন অর্থাৎ ৫ F লাগে।' },
    { q: 'গলিত CaCl₂ থেকে ২০ গ্রাম ক্যালসিয়াম (Ca = ৪০) পেতে কত ফ্যারাডে তড়িৎ লাগবে?', a: '১ ফ্যারাডে', d: ['২ ফ্যারাডে', '০.৫ ফ্যারাডে', '৪ ফ্যারাডে'], exp: '২০ g Ca = ০.৫ মোল; Ca²⁺ (n=২) ⇒ ০.৫ × ২ = ১ F।' },
    { q: '২ মোল Fe²⁺ জারিত হয়ে Fe³⁺-এ রূপান্তরিত হতে কত কুলম্ব চার্জ প্রয়োজন?', a: '১,৯৩,০০০ কুলম্ব (২ F)', d: ['৯৬,৫০০ কুলম্ব', '৩,৮৬,০০০ কুলম্ব', '৪৮,২৫০ কুলম্ব'], exp: 'প্রতি Fe²⁺ ১টি e⁻ ছাড়ে ⇒ ২ মোল = ২ F = ২ × ৯৬,৫০০ = ১,৯৩,০০০ C।' },
  ];
  faradayCases.forEach((fc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: fc.q,
        correct: fc.a,
        distractors: fc.d,
        explanation: fc.exp,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের তড়িৎ বিশ্লেষণ গণনা',
      })
    );
  });

  // 4. Reduction Potential & Cell EMF Matrix (12 × 2 = 24 MCQs, chem2_ch4_electro)
  const emfPairs = [
    { cell: 'Zn(s) | Zn²⁺(1M) || Cu²⁺(1M) | Cu(s)', emf: '+১.১০ V [E°(Cu²⁺/Cu)=+০.৩৪, E°(Zn²⁺/Zn)=-০.৭৬]' },
    { cell: 'Zn(s) | Zn²⁺(1M) || Ag⁺(1M) | Ag(s)', emf: '+১.৫৬ V [E°(Ag⁺/Ag)=+০.৮০, E°(Zn²⁺/Zn)=-০.৭৬]' },
    { cell: 'Mg(s) | Mg²⁺(1M) || Cu²⁺(1M) | Cu(s)', emf: '+২.৭১ V [E°(Cu²⁺/Cu)=+০.৩৪, E°(Mg²⁺/Mg)=-২.৩৭]' },
    { cell: 'Fe(s) | Fe²⁺(1M) || Cu²⁺(1M) | Cu(s)', emf: '+০.৭৮ V [E°(Cu²⁺/Cu)=+০.৩৪, E°(Fe²⁺/Fe)=-০.৪৪]' },
    { cell: 'Cu(s) | Cu²⁺(1M) || Ag⁺(1M) | Ag(s)', emf: '+০.৪৬ V [E°(Ag⁺/Ag)=+০.৮০, E°(Cu²⁺/Cu)=+০.৩৪]' },
    { cell: 'Ni(s) | Ni²⁺(1M) || Ag⁺(1M) | Ag(s)', emf: '+১.০৫ V [E°(Ag⁺/Ag)=+০.৮০, E°(Ni²⁺/Ni)=-০.২৫]' },
    { cell: 'Zn(s) | Zn²⁺(1M) || H⁺(1M) | H₂(1atm), Pt', emf: '+০.৭৬ V [E°(H⁺/H₂)=০.০০, E°(Zn²⁺/Zn)=-০.৭৬]' },
    { cell: 'Pt, H₂(1atm) | H⁺(1M) || Cu²⁺(1M) | Cu(s)', emf: '+০.৩৪ V [E°(Cu²⁺/Cu)=+০.৩৪, E°(H⁺/H₂)=০.০০]' },
  ];
  const emfVals = emfPairs.map((x) => x.emf);
  const cellVals = emfPairs.map((x) => x.cell);
  emfPairs.forEach((ep, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `২৫ °C তাপমাত্রায় গ্যালভানিক কোষ "${ep.cell}"-এর প্রমাণ কোষ বিভব (E°cell) কত?`,
        correct: ep.emf,
        distractors: emfVals.filter((e) => e !== ep.emf),
        explanation: `E°cell = E°cathode(red) - E°anode(red) ⇒ ${ep.emf}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · প্রমাণ কোষ বিভব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `নিচের কোন কোষটির প্রমাণ বিভব ${ep.emf}?`,
        correct: ep.cell,
        distractors: cellVals.filter((c) => c !== ep.cell),
        explanation: `এই বিভবটি ${ep.cell} কোষের জন্য পাওয়া যায়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · কোষ ডায়াগ্রাম',
      })
    );
  });

  // 5. Industrial Chemistry Formulas, Catalysts & Compositions (45 pairs × 2 = 90 MCQs, chem2_ch5_economic)
  const industrialMatrix: Array<{ item: string; info: string; topic: string }> = [
    { item: 'সালফিউরিক অ্যাসিড (স্পর্শ পদ্ধতি)', info: 'ভ্যানাডিয়াম পেন্টক্সাইড (V₂O₅) প্রভাবক, ৪৫০ °C এবং ২ atm চাপ (অলিয়াম H₂S₂O₇ গঠিত হয়)', topic: 'স্পর্শ পদ্ধতি' },
    { item: 'অ্যামোনিয়া (হেবার-বশ পদ্ধতি)', info: 'আয়রন (Fe) প্রভাবক + K₂O/Al₂O₃ বিবর্ধক, ৪৫০–৫৫০ °C ও ২০০ atm চাপ', topic: 'হেবার পদ্ধতি' },
    { item: 'নাইট্রিক অ্যাসিড (অস্টিওয়াল্ড পদ্ধতি)', info: 'প্ল্যাটিনাম-রোডিয়াম (Pt-Rh) গজ প্রভাবক, ৮০০–৮৫০ °C তাপমাত্রায় NH₃ জারণ', topic: 'অস্টিওয়াল্ড পদ্ধতি' },
    { item: 'সিমেন্টের ফ্ল্যাশ-সেটিং বা তাৎক্ষণিক জমাট বাঁধা প্রতিরোধক', info: 'জিপসাম (CaSO₄·2H₂O) — ক্লিংকারের সাথে ২–৫% পেষণ করা হয়', topic: 'সিমেন্ট সংযোজন' },
    { item: 'বাংলাদেশের প্রাকৃতিক গ্যাসে সালফারের পরিমাণ', info: 'প্রায় শূন্য (০%) বা সালফারমুক্ত — তাই ইউরিয়া ও বিদ্যুৎকেন্দ্রের জন্য অত্যন্ত উপযোগী', topic: 'বাংলাদেশ গ্যাস' },
    { item: 'পোর্টল্যান্ড সিমেন্টে ট্রাইক্যালসিয়াম সিলিকেট (C₃S)', info: 'সিমেন্টকে পানি মিশানোর পর প্রথম ৭ দিনে প্রাথমিক শক্তিশালী দৃঢ়তা ও হাইড্রেশন তাপ দেয়', topic: 'সিমেন্ট ক্লিংকার' },
    { item: 'পোর্টল্যান্ড সিমেন্টে ডাইক্যালসিয়াম সিলিকেট (C₂S)', info: 'ধীরে ধীরে আর্দ্রবিশ্লেষিত হয়ে পরবর্তী মাস ও বছর ধরে চূড়ান্ত দীর্ঘমেয়াদী দৃঢ়তা প্রদান করে', topic: 'সিমেন্ট ক্লিংকার' },
    { item: 'পোর্টল্যান্ড সিমেন্টে ম্যাগনেশিয়া (MgO) ও মুক্ত চুনের আধিক্য', info: 'কংক্রিটে ফাটল সৃষ্টি করে ও সিমেন্টের প্রসারণ ঘটিয়ে স্থায়িত্ব কমায় (MgO < ৪% রাখতে হয়)', topic: 'সিমেন্ট মানদণ্ড' },
    { item: 'কাচ শিল্পের প্রধান ৩টি কাঁচামাল', info: 'সিলিকা বালি (SiO₂), সোডা অ্যাশ (Na₂CO₃) এবং চুনাপাথর (CaCO₃)', topic: 'কাচ উৎপাদন' },
    { item: 'বোরোসিলিকেট (পাইরেক্স) কাচের বিশেষ উপাদান', info: 'বোরন ট্রাই-অক্সাইড (B₂O₃ — ১০–১৩%) যা তাপীয় প্রসারণ হ্রাস করে', topic: 'বিশেষ কাচ' },
    { item: 'ক্রিস্টাল বা ফ্লিন্ট কাচ (লেড গ্লাস)', info: 'লেড অক্সাইড (PbO) সমৃদ্ধ কাচ — উচ্চ প্রতিসরাঙ্ক থাকায় লেন্স, প্রিজম ও ঝাড়বাতিতে ব্যবহৃত হয়', topic: 'ফ্লিন্ট কাচ' },
    { item: 'ওয়েল/অলিভ গ্রিন কাচ ও গাঢ় নীল কাচ', info: 'সবুজ কাচে Fe₂O₃/Cr₂O₃ এবং গাঢ় নীল কাচে কোবাল্ট অক্সাইড (CoO) মেশানো হয়', topic: 'রঙিন কাচ' },
    { item: 'বিস্কুট ফায়ারিং (Biscuit Firing) বনাম গ্লেজ ফায়ারিং', info: 'সিরামিকে ৯০০–১০০০ °C-এ প্রাথমিক পোড়ানো (বিস্কুট) ও পরে কাচ সদৃশ গ্লেজ লেপ দিয়ে ১২০০–১৪০০ °C-এ পোড়ানো', topic: 'সিরামিক প্রক্রিয়া' },
    { item: 'কাগজের পাল্প তৈরিতে ক্রাফট পদ্ধতির কালো লিকার (Black Liquor)', info: 'ব্যবহৃত Na₂S ও NaOH এবং দ্রবীভূত লিগনিনযুক্ত কালো বর্জ্য যা পুনরুদ্ধার চুল্লিতে রাসায়নিক পুনঃপ্রাপ্তিতে যায়', topic: 'ক্রাফট পাল্পিং' },
    { item: 'উন্নত চিকন কাগজ ও নিউজপ্রিন্ট কাগজের মূল কাঁচামাল পার্থক্য', info: 'নিউজপ্রিন্ট (খুলনা নিউজপ্রিন্ট মিল) গেওয়া কাঠের যান্ত্রিক মণ্ডে; উন্নত লেখার কাগজ বাঁশ ও পাটের রাসায়নিক মণ্ডে', topic: 'কাগজের মণ্ড' },
    { item: 'প্লাস্টিক রিসাইক্লিং কোড #১ (PET) ও #২ (HDPE)', info: 'PET (১) কোমল পানীয়ের বোতল; HDPE (২) দুধের ক্যান, ডিটারজেন্টের বোতল ও শক্ত পাইপ', topic: 'প্লাস্টিক রিসাইক্লিং' },
    { item: 'সিন্থেটিক ফুয়েল তৈরির ফিশার-ট্রপশ (Fischer-Tropsch) পদ্ধতি', info: 'CO + H₂ (সিন্থেসিস গ্যাস) থেকে Fe/Co প্রভাবকে তরল হাইড্রোকার্বন (কৃত্রিম পেট্রোল/ডিজেল) তৈরি', topic: 'সিন-গ্যাস ও জ্বালানি' },
    { item: 'কোল-গ্যাস ও ওয়াটার গ্যাস (সিন্থেসিস গ্যাস)-এর সংযুক্তি', info: 'ওয়াটার গ্যাস: CO + H₂ (১:১); প্রোডিউসার গ্যাস: CO + N₂; কোল গ্যাস: H₂ + CH₄ + CO', topic: 'গ্যাসীয় জ্বালানি' },
    { item: 'রঙ/পেইন্টে টাইটেনিয়াম ডাই-অক্সাইড (TiO₂) ও ন্যানো কণার কাজ', info: 'TiO₂ সর্বোচ্চ অস্বচ্ছতা ও উজ্জ্বল সাদা রঙ দেয় এবং ন্যানো-TiO₂ সানস্ক্রিন লোশনে UV-রশ্মি আটকায়', topic: 'ন্যানো-অক্সাইড' },
    { item: 'ফুলারিন (C₆₀ বাকিবল) ও গ্রাফিন (Graphene)-এ কার্বনের সংকরায়ন', info: 'উভয়েই sp² সংকরিত কার্বন (গ্রাফিন একমাত্রিক-পুরুত্বের ২D ষড়ভুজাকার চাদর, সর্বাধিক দৃঢ় ও বিদ্যুৎ পরিবাহী)', topic: 'কার্বন ন্যানো-ম্যাটেরিয়াল' },
    { item: 'কৃষিতে ইউরিয়া ও ডিএপি (DAP) সারের পাশাপাশি মিউরেট অব পটাশ (MOP)-এর সংকেত', info: 'পটাশিয়াম ক্লোরাইড (KCl) — উদ্ভিদের কাণ্ড দৃঢ়তা, জল নিয়ন্ত্রণ ও শস্যের পুষ্টি বৃদ্ধিতে সহায়ক', topic: 'পটাশ সার' },
    { item: 'বাংলাদেশের ফেঞ্চুগঞ্জ, আশুগঞ্জ, ঘোড়াশাল ও যমুনা সার কারখানায় উৎপাদিত প্রধান সার', info: 'প্রাকৃতিক গ্যাস (CH₄) থেকে তৈরি ইউরিয়া [CO(NH₂)₂] ও অ্যামোনিয়া', topic: 'বাংলাদেশ সার শিল্প' },
    { item: 'বাঁশ বা কাঠের লিগনিন-সেলুলোজ আলাদা করার পর সেলুলোজের সাদা ফাইবার থেকে কী গঠিত হয়', info: 'কাগজের শীট (হাইড্রোজেন বন্ধন দ্বারা সেলুলোজ তন্তু পরস্পর লেগে থাকে)', topic: 'সেলুলোজ কাগজ' },
    { item: 'ট্যানারি শিল্পে কাঁচা চামড়াকে পচনরোধে সংরক্ষণের প্রাথমিক ধাপ "কিউরিং" (Curing) কী দিয়ে করা হয়', info: 'খাদ্য লবণ (NaCl) দ্বারা পানিশূন্য করে ব্যাকটেরিয়ার বংশবিস্তার রোধ', topic: 'চামড়া প্রক্রিয়াকরণ' },
    { item: 'হালকা-ধূসর সিমেন্ট উৎপাদনে কিল্নে কত তাপমাত্রায় ক্লিংকার তৈরি হয়', info: '১৪০০–১৫০০ °C তাপমাত্রায় (ঘূর্ণায়মান রোটারি কিল্নে)', topic: 'সিমেন্ট কিল্ন' },
  ];

  const indInfoPool = Array.from(new Set(industrialMatrix.map((x) => x.info)));
  const indItemPool = Array.from(new Set(industrialMatrix.map((x) => x.item)));

  industrialMatrix.forEach((im, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `শিল্প রসায়নে "${im.item}"-এর সাথে নিচের কোন বৈশিষ্ট্য বা শর্তটি সরাসরি যুক্ত?`,
        correct: im.info,
        distractors: indInfoPool.filter((x) => x !== im.info).slice(i % 12, (i % 12) + 5),
        explanation: `${im.item}: ${im.info}।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৫ · ${im.topic}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${im.info}" — শিল্প রসায়নের কোন বিষয়টির ক্ষেত্রে এটি প্রযোজ্য?`,
        correct: im.item,
        distractors: indItemPool.filter((x) => x !== im.item).slice((i + 5) % 12, ((i + 5) % 12) + 5),
        explanation: `${im.info} তথ্যটি "${im.item}" সম্পর্কিত।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৫ · ${im.topic}`,
      })
    );
  });

  // 6. Electrochemistry Quick Traps (15 × 2 = 30 MCQs, chem2_ch4_electro)
  const electroTraps = [
    { q: 'একই ধাতুর দুটি তড়িৎদ্বার ভিন্ন ঘনমাত্রার দ্রবণে ডুবিয়ে যে কোষ বানানো হয় তাকে কী বলে', a: 'ঘনমাত্রা কোষ (Concentration Cell — E°cell = ০, কেবল ঘনত্ব পার্থক্যে ভোল্টেজ জন্মায়)' },
    { q: 'অ্যানায়ন ও ক্যাটায়নের মধ্যে কোনটি সর্বদা অ্যানোডে গিয়ে ইলেকট্রন ত্যাগ করে জারিত হয়', a: 'অ্যানায়ন (তবে দ্রবণে একাধিক অ্যানায়ন থাকলে যার জারণ বিভব বেশি/বিজারণ বিভব কম সে আগে চার্জমুক্ত হয়)' },
    { q: 'নিম্নলিখিত আয়নগুলোর অ্যানোডে চার্জমুক্ত হওয়ার অগ্রাধিকার ক্রম কী: SO₄²⁻, NO₃⁻, OH⁻, Cl⁻, Br⁻, I⁻', a: 'I⁻ > Br⁻ > Cl⁻ > OH⁻ > NO₃⁻ > SO₄²⁻ (I⁻ সবচেয়ে সহজে জারিত হয়)' },
    { q: 'ক্যাথোডে বিজারিত হওয়ার অগ্রাধিকার ক্রমে ধনাত্মক আয়নসমূহের মধ্যে Au³⁺, Ag⁺, Cu²⁺, H⁺, Zn²⁺, Na⁺-এর ক্রম কী', a: 'Au³⁺ > Ag⁺ > Cu²⁺ > H⁺ > Zn²⁺ > Na⁺ (সর্বোচ্চ বিজারণ বিভবের আয়ন আগে জমে)' },
    { q: 'লেড-অ্যাসিড ব্যাটারি চার্জ করার সময় H₂SO₄-এর ঘনত্ব বা আপেক্ষিক গুরুত্বের কী পরিবর্তন ঘটে', a: 'পুনরায় H₂SO₄ উৎপন্ন হওয়ায় ঘনত্ব ও আপেক্ষিক গুরুত্ব বৃদ্ধি পেয়ে ~১.২৮–১.৩০ হয় (ডিসচার্জে কমে <১.১৮)' },
    { q: 'আর্দ্র বায়ু ও CO₂-এর উপস্থিতিতে লোহায় মরিচা পড়ার সময় লোহার পৃষ্ঠে অ্যানোড ও ক্যাথোড বিক্রিয়া কী', a: 'অ্যানোড: Fe → Fe²⁺ + 2e⁻; ক্যাথোড: O₂ + 4H⁺ + 4e⁻ → 2H₂O' },
    { q: 'AgNO₃ দ্রবণকে তামার (Cu) পাত্রে সংরক্ষণ করা যায় না কেন', a: 'Cu-এর জারণ বিভব Ag-এর চেয়ে বেশি হওয়ায় Cu সহজেই Ag⁺-কে প্রতিস্থাপিত করে Cu(NO₃)₂ তৈরি করে ও পাত্র ক্ষয়ে যায়' },
    { q: 'ZnSO₄ দ্রবণকে লোহার (Fe) বা তামার পাত্রে সংরক্ষণ করা যায় কিন্তু CuSO₄ দ্রবণকে লোহার পাত্রে রাখা যায় না কেন', a: 'Zn লোহা/তামার চেয়ে বেশি সক্রিয়; কিন্তু Fe তামার চেয়ে বেশি সক্রিয় হওয়ায় Cu²⁺-কে বিজারিত করে' },
    { q: 'আপেক্ষিক রোধ (ρ) এবং আপেক্ষিক পরিবাহিতা (κ)-এর একক যথাক্রমে কী', a: 'ρ-এর একক Ω·cm (বা Ω·m) এবং κ (= 1/ρ)-এর একক S·cm⁻¹ বা Ω⁻¹·cm⁻¹' },
    { q: 'কোষ ধ্রুবক (Cell Constant = l / A)-এর একক ও পরিবাহিতার সাথে সম্পর্ক কী', a: 'একক cm⁻¹ (বা m⁻¹); আপেক্ষিক পরিবাহিতা κ = পরিবাহিতা (G) × কোষ ধ্রুবক' },
  ];
  const etAns = electroTraps.map((x) => x.a);
  const etQ = electroTraps.map((x) => x.q);
  electroTraps.forEach((et, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${et.q}?`,
        correct: et.a,
        distractors: etAns.filter((a) => a !== et.a),
        explanation: `${et.q} → ${et.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ রাসায়নিক প্রয়োগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `সিদ্ধান্ত "${et.a}" নিচের কোন তড়িৎ রসায়নের প্রশ্নের যথার্থ ব্যাখ্যা?`,
        correct: et.q,
        distractors: etQ.filter((q) => q !== et.q),
        explanation: `${et.a} ↔ ${et.q}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ রসায়ন',
      })
    );
  });

  return list;
}
