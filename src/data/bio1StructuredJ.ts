import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface PhysConceptRow {
  topic: string;
  concept: string;
  def: string;
  clinical: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio1StructuredJ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_sj_${String(seq++).padStart(4, '0')}`;

  // 1. High-Yield Chapter 9 (Plant Physiology) Conceptual Matrix: 75 × 4 = 300 unique MCQs
  const physRows: PhysConceptRow[] = [
    // Mineral Absorption & Transport
    {
      topic: 'absorption',
      concept: 'সক্রিয় শোষণের লুন্ডেগার্ড (Lundegardh) সাইটোক্রোম পাম্প মতবাদ',
      def: 'শ্বসন প্রক্রিয়ায় উৎপন্ন ইলেকট্রন সাইটোক্রোম তন্ত্রের মাধ্যমে বাইরে যায় ও বিনিময়ে অ্যানায়ন (NO₃⁻, Cl⁻) কোষের ভেতরে প্রবেশ করে',
      clinical: 'অ্যানায়ন শ্বসন (Anion respiration) নামে পরিচিত ও ক্যাটায়ন নিষ্ক্রিয়ভাবে বৈদ্যুতিক ভারসাম্যে ঢোকে',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'আয়ন বাহক (Carrier) ধারণায় লিসিথিন ফসফোলিপিড বাহক (বেনেট-ক্লার্ক)',
      def: 'কোষঝিল্লির ফসফোলিপিড লিসিথিন ATP-এর সহায়তায় ক্যাটায়ন ও অ্যানায়ন উভয়ের সাথে অস্থায়ী যৌগ গঠন করে ভেতরে আনে',
      clinical: 'লিসিথিন → ফসফ্যাটাইডিক অ্যাসিড + কোলিন চক্রে সক্রিয়ভাবে লবণ পরিশোষিত হয়',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'প্রোটন-অ্যানায়ন কো-ট্রান্সপোর্ট মতবাদ (Mitchell কেমিঅসমোটিক মডেল)',
      def: 'ATP-এজ দ্বারা H⁺ পাম্প করে কোষের বাইরে প্রোটন গ্রেডিয়েন্ট তৈরি ও তার শক্তিতে ক্যারিয়ার দিয়ে ক্যাটায়ন-অ্যানায়ন শোষণ',
      clinical: 'সবচেয়ে আধুনিক ও সর্বজনগ্রাহ্য সক্রিয় খনিজ লবণ শোষণ প্রক্রিয়া',
      diff: 'dental',
    },
    {
      topic: 'absorption',
      concept: 'নিষ্ক্রিয় শোষণের ডোনান সাম্যাবস্থা (Donnan Equilibrium)',
      def: 'কোষের ভেতরে থাকা অব্যাপনযোগ্য স্থির ঋণাত্মক আয়নগুলোকে প্রশমিত করতে বিপরীত ধনাত্মক আয়ন ঝিল্লি ভেদ করে ভেতরে জমা হওয়া',
      clinical: 'বিপাকীয় শক্তি ATP ছাড়াই অভ্যন্তরীণ ঋণাত্মক আয়নের টানে ক্যাটায়ন সঞ্চিত হয়',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'সচল (Mobile) বনাম অচল (Immobile) খনিজ উপাদান ও ঘাটতির লক্ষণ',
      def: 'N, P, K, Mg সচল মৌল হওয়ায় ঘাটতির লক্ষণ প্রথমে বয়স্ক নিচের পাতায় দেখা যায়; Ca, B, S, Fe অচল হওয়ায় কচি শীর্ষপাতায় লক্ষণ প্রকাশ পায়',
      clinical: 'কচি পাতার অগ্রভাগ ও শীর্ষমুকুল মরে যাওয়া প্রধানত ক্যালসিয়াম (Ca) ও বোরন (B) ঘাটতির স্পষ্ট সংকেত',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'নাইট্রোজেন, ম্যাগনেসিয়াম ও আয়রনের অভাবজনিত ক্লোরোসিস',
      def: 'Mg ক্লোরোফিলের কেন্দ্রীয় পরমাণু, Fe ক্লোরোফিল সংশ্লেষের কো-ফ্যাক্টর ও N ক্লোরোফিল-প্রোটিনের মূল গাঠনিক উপাদান',
      clinical: 'ম্যাগনেসিয়ামের অভাবে শিরা সবুজ থেকে শিরার মধ্যবর্তী অংশ হলুদ হয়ে যায় (Interveinal chlorosis)',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'উদ্ভিদের ১৭টি অত্যাবশ্যকীয় মৌলের মধ্যে ম্যাক্রো বনাম মাইক্রোনিউট্রিয়েন্ট',
      def: '৯টি ম্যাক্রোমৌল (C, H, O, N, K, Ca, Mg, P, S) এবং ৮টি মাইক্রোমৌল (Fe, Mn, Cu, Zn, B, Mo, Cl, Ni)',
      clinical: 'মলিবডেনাম (Mo) নাইট্রোজেন ফিক্সেশন ও নাইট্রেট রিডাক্টেজ এনজাইমের জন্য অতি প্রয়োজনীয় এবং Zn IAA (অক্সিন) সংশ্লেষে লাগে',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'ফসফরাস ও পটাশিয়াম শোষণ বনাম লবণ পরিবহনের সর্বাধিক আয়ন',
      def: 'উদ্ভিদ সবচেয়ে দ্রুত শোষণ করে K⁺ ও NO₃⁻ এবং সবচেয়ে মন্থরভাবে শোষণ করে Ca²⁺ ও SO₄²⁻ আয়ন',
      clinical: 'ফ্লোয়েম রসে জৈব খাদ্য প্রধানত সুক্রোজ (নন-রিডিউসিং শর্করা) আকারে উৎস (Source) থেকে সিঙ্কে (Sink) প্রবাহিত হয়',
      diff: 'dental',
    },
    {
      topic: 'absorption',
      concept: 'মান্‌চ (Munch) প্রেশার-ফ্লো হাইপোথিসিস (১৯৩০)',
      def: 'মেসোফিল কোষে সুক্রোজ লোডিংয়ের ফলে অসমোটিক চাপ ও টার্গর চাপ বাড়ে এবং ফ্লোয়েম দিয়ে উচ্চ-চাপ থেকে নিম্ন-চাপ এলাকায় গণ-প্রবাহ (Mass flow) ঘটে',
      clinical: 'রসাস্বাদন পরীক্ষায় রিংগিং (Girdling) করলে বাকল কাটার উপরের অংশে খাদ্য জমে ফুলে যায়',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'ইমবাইবিশন (Imbibition) ও কৈশিক পানি (Capillary Water)',
      def: 'শুষ্ক কলয়েডধর্মী পদার্থ (সেলুলোজ, পেকটিন, স্টার্চ, জিলেটিন) কর্তৃক তরল পানি শোষণ (অঙ্কুরোদগমে বীজের ফোলা) ও মাটির শস্যক্ষেত্রে একমাত্র শোষিতব্য কৈশিক পানি',
      clinical: 'উদ্ভিদ হাইগ্রোস্কোপিক বা মহাকর্ষীয় পানি শোষণ করতে পারে না, কেবল মাটির কণার ফাঁকের কৈশিক পানি শোষণ করে',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'ডিক্সন ও জলি (Dixon & Jolly, ১৮৯৪)-এর কোহেশন-টেনশন-প্রস্বেদন টান তত্ত্ব',
      def: 'জাইলেমের অবিচ্ছিন্ন পানির স্তম্ভ পানির অণুগুলোর পরস্পর আসক্তি (Cohesion), জাইলেম প্রাচীরের প্রতি আসক্তি (Adhesion) এবং প্রস্বেদন টানে উপরে ওঠে',
      clinical: 'পাতার প্রস্বেদন জনিত ঋণাত্মক চাপ (-১ থেকে -৩০ বার পর্যন্ত) উঁচু বৃক্ষের (যেমন ইউক্যালিপটাস) শীর্ষে পানি পৌঁছায়',
      diff: 'medical',
    },
    // Transpiration & Stomata
    {
      topic: 'transpiration',
      concept: 'আধুনিক প্রোটন-পাম্প ও K⁺ আয়নের সক্রিয় পরিবহন মতবাদ (Fujino, Levitt ১৯৭৪)',
      def: 'নীল আলোর (Blue light) উপস্থিতিতে রক্ষীকোষে প্রোটন (H⁺) বাইরে বের হয় ও K⁺ এবং Cl⁻-ম্যালেট ভেতরে প্রবেশ করে অভিস্রবণিক বিভব কমায়',
      clinical: 'পানি ঢুকে রক্ষীকোষ স্ফীত (Turgid) হয় ও পত্ররন্ধ্র খুলে যায়; খরা অবস্থায় ABA এই পাম্প বন্ধ করে পত্ররন্ধ্র বন্ধ করে দেয়',
      diff: 'medical',
    },
    {
      topic: 'transpiration',
      concept: 'পত্ররন্ধ্রীয়, ত্বকীয় (কিউটিকুলার) ও লেন্টিকুলার প্রস্বেদনের অনুপাত',
      def: 'মোট প্রস্বেদনের ৮০–৯০% বা ৯০–৯৫% ঘটে পত্ররন্ধ্র দিয়ে, ৫–১০% কিউটিকল দিয়ে এবং ০.১–১% লেন্টিসেল দিয়ে',
      clinical: 'গ্যানং পটোমিটার (Ganong Potometer) দিয়ে উদ্ভিদের পানি শোষণের হার (পরোক্ষভাবে প্রস্বেদন হার) মাপা হয়',
      diff: 'medical',
    },
    {
      topic: 'transpiration',
      concept: 'সক্রিয় প্রস্বেদন-বিরোধী (Antitranspirants) পদার্থ',
      def: 'ফিনাইলমারকিউরিক অ্যাসিটেট (PMA), অ্যাবসিসিক অ্যাসিড (ABA), অ্যাসপিরিন ও উচ্চ ঘনত্বের CO₂ পত্ররন্ধ্র আংশিক বন্ধ রেখে প্রস্বেদন কমায়',
      clinical: 'অ্যালোকল ও সিলিকন ইমালশন পাতার উপর পাতলা ফিল্ম তৈরি করে জলহানি হ্রাস করে',
      diff: 'dental',
    },
    {
      topic: 'transpiration',
      concept: 'প্রস্বেদন-কে কার্টিস (Curtis, ১৯২৬) কেন "প্রয়োজনীয় অমঙ্গল" (Necessary Evil) বলেছেন?',
      def: 'অতিরিক্ত প্রস্বেদনে উদ্ভিদ শুকিয়ে মারা যাওয়ার ঝুঁকি থাকলেও প্রস্বেদন টান ছাড়া পানি-খনিজ পরিবহন ও পাতার তাপ নিয়ন্ত্রণ সম্ভব নয়',
      clinical: 'শোষণকৃত পানির প্রায় ৯৮–৯৯% প্রস্বেদনে বের হয়ে যায়, মাত্র ১–২% বিপাকীয় কাজে ব্যবহৃত হয়',
      diff: 'board',
    },
    // Photosynthesis
    {
      topic: 'photosynthesis',
      concept: 'ক্লোরোফিল-a বনাম ক্লোরোফিল-b অণুর আণবিক সংকেত ও পারফাইরিন শীর্ষ',
      def: 'ক্লোরোফিল-a (C₅₅H₇₂O₅N₄Mg)-র পাইরোল রিং-২-এর ৩ নম্বর কার্বনে মিথাইল (-CH₃) মূলক ও ক্লোরোফিল-b (C₅₅H₇₀O₆N₄Mg)-তে অ্যালডিহাইড (-CHO) মূলক থাকে',
      clinical: 'ক্লোরোফিলের ফাইটল (Phytol) লেজ থাইলাকয়েডের লিপিড স্তরে প্রোথিত থাকে ও Mg²⁺ চারটি নাইট্রোজেনের কেন্দ্রে থাকে',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'লাল-পতন (Red Drop) ও এমারসন এনহ্যান্সমেন্ট ইফেক্ট (১৯৫৭)',
      def: '৬৮০ nm-এর বেশি তরঙ্গদৈর্ঘ্যের লাল আলোতে সালোকসংশ্লেষণ হার হঠাৎ কমে যায়; কিন্তু দীর্ঘ (>৬৮০) ও স্বল্প (<৬৮০) আলো একসাথে দিলে হার বহু বেড়ে যায়',
      clinical: 'এই পরীক্ষা থেকেই প্রমাণিত হয় ক্লোরোপ্লাস্টে দুটি পৃথক ফটোসিস্টেম (PS-I P700 ও PS-II P680) সমন্বিতভাবে কাজ করে',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'অচক্রীয় (Non-cyclic) ফটোফসফোরাইলেশন বা Z-স্কিম (রবিন হিল ও বেনডাল)',
      def: 'PS-II (P680) থেকে ইলেকট্রন ফিয়োফাইটিন, প্লাস্টোকুইনন (PQ), সাইটোক্রোম b₆f ও প্লাস্টোসায়ানিন (PC) হয়ে PS-I (P700) এবং ফেরিডক্সিনের মাধ্যমে NADP⁺ বিজারণ করে',
      clinical: 'একই সাথে H₂O ফটোলাইসিসে O₂ মুক্ত হয়, ATP তৈরি হয় ও NADPH + H⁺ উৎপন্ন হয়',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'চক্রীয় (Cyclic) ফটোফসফোরাইলেশন',
      def: 'কেবল PS-I (P700) অংশ নেয়; ফেরিডক্সিন থেকে ইলেকট্রন NADP⁺-এ না গিয়ে PQ ও সাইটোক্রোম b₆f-এর মাধ্যমে ঘুরে আবার P700-এ ফিরে আসে',
      clinical: 'এতে কেবল ATP তৈরি হয়; কোনো পানির ফটোলাইসিস, O₂ মুক্তি বা NADPH উৎপন্ন হয় না',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'জল বিশ্লেষণ (Photolysis) কমপ্লেক্সের খনিজ কো-ফ্যাক্টরসমূহ',
      def: 'থাইলাকয়েডের ভেতরের দিকে Mn²⁺, Cl⁻ ও Ca²⁺ আয়নসমৃদ্ধ অক্সিজেন-উৎপাদনকারী কমপ্লেক্স (OEC) ২ অণু H₂O ভেঙে ৪e⁻, ৪H⁺ ও ১টি O₂ দেয়',
      clinical: 'রবার্ট হিল (১৯৩৭) ও পরবর্তীতে রুবেন-কামেন (¹⁸O আইসোটোপ ব্যবহার করে) প্রমাণ করেন নির্গত O₂ আসে H₂O থেকে, CO₂ থেকে নয়',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'কেলভিন চক্র (C₃ চক্র)-এর তিনটি ধাপ ও RuBisCO এনজাইম',
      def: '১) কার্বক্সিলেশন (RuBP + CO₂ → ২টি 3-PGA, অনুঘটক রুবিস্কো), ২) বিজারণ (3-PGA → 3-PGAL/G3P) এবং ৩) RuBP পুনরুৎপাদন',
      clinical: 'পৃথিবীতে সর্বাধিক প্রাপ্ত প্রোটিন হলো RuBisCO; ৬টি CO₂ আবদ্ধ করে ১টি গ্লুকোজ বানাতে ১৮টি ATP ও ১২টি NADPH লাগে',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'হ্যাচ ও স্ল্যাক (C₄) চক্র ও ক্র্যাঞ্জ অ্যানাটমি (Kranz Anatomy)',
      def: 'ভুট্টা, আখ, জোয়ার, মুথাঘাস ও অ্যামারান্থাস পাতায় মেসোফিল কোষে PEP কার্বক্সিলেজ CO₂ ধরে ৪-কার্বন অক্সালোঅ্যাসিটেট/ম্যালেট বানিয়ে বান্ডল সিথে পাঠায়',
      clinical: 'বান্ডল সিথ কোষে উচ্চ CO₂ ঘনত্ব তৈরি হওয়ায় ফটোরেসপিরেশন শূন্যের কোঠায় নেমে আসে ও উচ্চ তাপমাত্রায় (৩০–৪৫°C) উৎপাদন বাড়ে',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'ফটোরেসপিরেশন বা C₂ চক্র (অ্যাডিশনাল অক্সিজেনেশন)',
      def: 'অতিরিক্ত আলো ও উচ্চ O₂/CO₂ অনুপাতে রুবিস্কো অক্সিজেনেজ রূপে RuBP ভেঙে ফসফোগ্লাইকোলেট তৈরি করে যা ক্লোরোপ্লাস্ট → পেরক্সিজোম → মাইটোকন্ড্রিয়ায় নষ্ট হয়',
      clinical: 'এটি ২৫% পর্যন্ত স্থিরকৃত কার্বন CO₂ হিসেবে অপচয় করে এবং কোনো ATP তৈরি করে না (বরং ব্যয় করে)',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'CAM (Crassulacean Acid Metabolism) উদ্ভিদের অভিযোজন',
      def: 'পাথরকুচি, আনারস ও ফণিমনসার মতো জেরোফাইট উদ্ভিদে পানি বাঁচাতে রাতে পত্ররন্ধ্র খুলে (Scotoactive) CO₂ ম্যালিক অ্যাসিড রূপে জমা রাখে ও দিনে কেলভিন চক্র চালায়',
      clinical: 'এতে সময়গত পৃথকীকরণ (Temporal separation) ঘটে, যেখানে C₄ উদ্ভিদে স্থানিক পৃথকীকরণ (মেসোফিল বনাম বান্ডল সিথ) ঘটে',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'ব্ল্যাকম্যানের লিমিটিং ফ্যাক্টর নীতি (Law of Limiting Factors, ১৯০৫)',
      def: 'যখন কোনো রাসায়নিক প্রক্রিয়া একাধিক শর্তের উপর নির্ভরশীল, তখন প্রক্রিয়ার গতিবেগ সবচেয়ে কম পরিমাণে উপস্থিত উপাদানটি দ্বারা নিয়ন্ত্রিত হয়',
      clinical: 'আলোক তীব্রতা পর্যাপ্ত হলে প্রায়ই বায়ুমণ্ডলের কম CO₂ (০.০৩–০.০৪%) সালোকসংশ্লেষণের লিমিটিং ফ্যাক্টর হয়ে দাঁড়ায়',
      diff: 'board',
    },
    {
      topic: 'photosynthesis',
      concept: 'সালোকসংশ্লেষণ বনাম ব্যাকটেরিওফটোসিন্থেসিস (ভ্যান নীল মতবাদ)',
      def: 'সবুজ ও পার্পল সালফার ব্যাকটেরিয়া (যেমন Chlorobium, Chromatium) H₂O-এর পরিবর্তে H₂S ব্যবহার করে অ্যানঅক্সিজেনিক সালোকসংশ্লেষণে সালফার মুক্ত করে',
      clinical: 'CO₂ + 2H₂S → (CH₂O) + H₂O + 2S সমীকরণটি ভ্যান নীলের O₂-উৎস মতবাদের মূল প্রমাণ',
      diff: 'dental',
    },
    // Respiration
    {
      topic: 'respiration',
      concept: 'গ্লাইকোলাইসিসের (EMP পথ) তিনটি অপরিবর্তনীয় নিয়ন্ত্রক ধাপ',
      def: '১) হেক্সোকাইনেজ, ২) ফসফোফ্রুক্টোকাইনেজ-১ (PFK-1, প্রধান পেসমেকার এনজাইম) এবং ৩) পাইরুভেট কাইনেজ',
      clinical: 'সকল সজীব কোষের সাইটোপ্লাজমে অক্সিজেন ছাড়াই ১ গ্লুকোজ থেকে ২ পাইরুভেট, ২ নেট ATP ও ২ NADH + H⁺ তৈরি হয়',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'পাইরুভেট ডিহাইড্রোজিনেজ লিংক বিক্রিয়া',
      def: 'মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে ২ পাইরুভেট জারিত হয়ে ২ অ্যাসিটাইল CoA, ২ CO₂ ও ২ NADH + H⁺ উৎপন্ন করে',
      clinical: 'এতে ৫টি কো-ফ্যাক্টর লাগে: TPP (ভিটামিন B₁), লিপোইক অ্যাসিড, CoA-SH (B₅), FAD (B₂) ও NAD⁺ (B₃)',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'ক্রেবস চক্র (TCA / সাইট্রিক অ্যাসিড চক্র)-এ সাবস্ট্রেট-লেভেল GTP/ATP ও বিজারক',
      def: '১ অণু গ্লুকোজের জন্য ২ বার চক্র ঘুরে ২ GTP (= ২ ATP), ৬ NADH + H⁺, ২ FADH₂ এবং ৪ CO₂ উৎপন্ন হয়',
      clinical: 'চক্রের সব এনজাইম ম্যাট্রিক্সে দ্রবীভূত থাকলেও সাকসিনেট ডিহাইড্রোজিনেজ মাইটোকন্ড্রিয়ার অন্তঃঝিল্লিতে (Complex II) প্রোথিত থাকে',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'মাইটোকন্ড্রিয়ার ইলেকট্রন ট্রান্সপোর্ট চেইন (ETC) ও টার্মিনাল O₂ গ্রাহক',
      def: 'Complex I → Q → Complex III → Cyt c → Complex IV (সাইটোক্রোম c অক্সিডেজ, Cu ও Fe যুক্ত) হয়ে শেষ ইলেকট্রন গ্রহীতা অক্সিজেন (১/২ O₂ + ২H⁺ → H₂O)',
      clinical: 'সায়ানাইড ও কার্বন মনোক্সাইড Complex IV-কে অবরুদ্ধ করে কোষীয় শ্বসন থামিয়ে দেয়',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'ম্যালেট-অ্যাস্পার্ট্রেট শাটল বনাম গ্লিসারল-৩-ফসফেট শাটল (মোট ৩৬ বনাম ৩৮ ATP)',
      def: 'হৃদপেশি ও যকৃতে ম্যালেট শাটলে সাইটোসলিক NADH থেকে ৬টি ATP হয়ে মোট ৩৮ ATP; কিন্তু কঙ্কাল পেশি ও মস্তিষ্কে ৪ ATP হওয়ায় মোট ৩৬ ATP',
      clinical: 'আধুনিক হিসাব (প্রতি NADH = ২.৫ ATP, FADH₂ = ১.৫ ATP) অনুযায়ী যথাক্রমে ৩০ বা ৩২ ATP উৎপন্ন হয়',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'অবাত শ্বসন (অ্যালকোহল ও ল্যাকটিক অ্যাসিড গাঁজন)',
      def: 'ইস্টে পাইরুভেট ডিকার্বক্সিলেজ ও অ্যালকোহল ডিহাইড্রোজিনেজের মাধ্যমে ইথানল + CO₂; প্রাণীপেশি ও ল্যাকটোব্যাসিলাসে CO₂ ছাড়াই ল্যাকটিক অ্যাসিড তৈরি হয়',
      clinical: 'উভয় গাঁজনেই NAD⁺ পুনরুৎপাদিত হয় যাতে গ্লাইকোলাইসিস চালু থাকে এবং নিট মাত্র ২ ATP লাভ হয়',
      diff: 'board',
    },
    {
      topic: 'respiration',
      concept: 'শ্বসনিক হার (RQ = নির্গত CO₂ / গৃহীত O₂) ও খাদ্য উপাদানভেদে মান',
      def: 'কার্বোহাইড্রেট = ১.০; প্রোটিন ≈ ০.৮–০.৯; স্নেহ/চর্বি ≈ ০.৭; জৈব অ্যাসিড (অক্সালিক/ম্যালিক) > ১ (যেমন ১.৩৩–৪.০); রসালো CAM পাতায় রাতে = ০',
      clinical: 'অবাত শ্বসনে কোনো O₂ ব্যবহৃত হয় না কিন্তু CO₂ বের হয় বলে RQ-এর মান অসীম (∞) ধরা হয়',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'পাস্তুর প্রভাব (Pasteur Effect) ও প্রোপেন/পেন্টোজ ফসফেট পথ (PPP)',
      def: 'অবাত পরিবেশে থাকা ইস্টকে O₂ সরবরাহ করলে গ্লাইকোলাইসিসের হার ও গ্লুকোজ ক্ষয় কমে যাওয়া হলো পাস্তুর প্রভাব',
      clinical: 'আর HMP শান্ট বা পেন্টোজ ফসফেট পথ সাইটোপ্লাজমে রাইবোজ-৫-ফসফেট (DNA/RNA) ও জৈবসংশ্লেষী NADPH তৈরি করে',
      diff: 'dental',
    },
    // Hormones, Photoperiodism, Vernalization
    {
      topic: 'hormones',
      concept: 'অক্সিন (IAA)-এর আবিষ্কার ও প্রধান শারীরবৃত্তীয় কাজ',
      def: 'এফ. ডব্লিউ. ওয়েন্ট (১৯২৮) অ্যাভেনা কালেক্টর পরীক্ষার মাধ্যমে আবিষ্কার করেন; এর উৎস ট্রিপটোফ্যান অ্যামিনো অ্যাসিড ও জিংক (Zn²⁺)',
      clinical: 'শীর্ষপ্রকটতা (Apical dominance), কলমে অস্থানিক মূল গজানো, ফল ঝরা রোধ ও পার্থেনোকার্পিক ফল সৃষ্টি করে (২,৪-D আগাছানাশক)',
      diff: 'medical',
    },
    {
      topic: 'hormones',
      concept: 'জিব্বেরেলিন (GA₃)-এর বোল্টিং, আলফা-অ্যামাইলেজ ও অঙ্কুরোদগম ক্রিয়া',
      def: 'জাপানি বিজ্ঞানী কুরোসাওয়া ধানের "বাকানে" (Foolish seedling) রোগের Gibberella fujikuroi ছত্রাক থেকে এটি শনাক্ত করেন',
      clinical: 'বাঁধাকপি-গাজরের কাণ্ডের পর্বমধ্য দ্রুত লম্বা করা (Bolting), বীজের সুপ্তাবস্থা ভাঙা ও অ্যালিউরোন স্তরে α-অ্যামাইলেজ সক্রিয় করা এর কাজ',
      diff: 'medical',
    },
    {
      topic: 'hormones',
      concept: 'সাইটোকাইনিন (কাইনেটিন/জিয়াটিন) ও রিচমন্ড-ল্যাং প্রভাব',
      def: 'স্কুগ ও মিলার কর্তৃক আবিষ্কৃত অ্যাডেনিন (পিউরিন)-জাত হরমোন যা কোষ বিভাজন, পার্শ্বীয় মুকুল বৃদ্ধি ও পাতার বার্ধক্য বিলম্বিত (Richmond-Lang) করে',
      clinical: 'টিস্যু কালচারে সাইটোকাইনিন/অক্সিন অনুপাত বেশি হলে কাণ্ড (Shoot) ও কম হলে মূল (Root) সৃষ্টি হয়',
      diff: 'medical',
    },
    {
      topic: 'hormones',
      concept: 'ইথিলিন (C₂H₄) — একমাত্র গ্যাসীয় ফাইটোহরমোন',
      def: 'মিথিওনিন থেকে উৎপন্ন গ্যাসীয় হরমোন যা ফল পাকানো (Climacteric rise in respiration), পুষ্প-ফল মোচন (Abscission) ও ট্রিপল রেসপন্স ঘটায়',
      clinical: 'ইথেফন (Ethephon) দ্রবণ বাণিজ্যিকভাবে আম-কলা-টমেটো দ্রুত পাকাতে নিরাপদ উৎস হিসেবে ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      topic: 'hormones',
      concept: 'অ্যাবসিসিক অ্যাসিড (ABA) — স্ট্রেস বা খরা-সহায়ক হরমোন',
      def: 'বৃদ্ধি প্রতিরোধক হরমোন যা খরা ও লবণাক্ততায় রক্ষীকোষ থেকে K⁺ বের করে পত্ররন্ধ্র বন্ধ করে, বীজ-মুকুলের সুপ্তাবস্থা বজায় রাখে ও জরায়ুজ অঙ্কুরোদগম ঠেকায়',
      clinical: 'হরমোনটি শারীরবৃত্তীয়ভাবে জিব্বেরেলিনের (GA) বিপরীতধর্মী বা অ্যান্টাগনিস্ট হিসেবে কাজ করে',
      diff: 'medical',
    },
    {
      topic: 'hormones',
      concept: 'ফটোপিরিয়ডিজম ও ফাইটোক্রোম (Pr বনাম Pfr)',
      def: 'গার্ণার ও অ্যালার্ড (১৯২০) কর্তৃক আবিষ্কৃত দিবা-রাত্রির দৈর্ঘ্যনির্ভর পুষ্পায়ন; লাল আলোতে (৬৬০ nm) প্রোটিনরঞ্জক Pr রূপান্তরিত হয়ে সক্রিয় Pfr (৭৩০ nm শোষণকারী) হয়',
      clinical: 'আসল নিয়ন্ত্রক হলো অবিচ্ছিন্ন অন্ধকারকাল; স্বল্পদিবা (SDP) উদ্ভিদে Pfr পুষ্পায়ন থামায় কিন্তু দীর্ঘদিবা (LDP) উদ্ভিদে Pfr পুষ্পায়ন উদ্দীপ্ত করে',
      diff: 'medical',
    },
    {
      topic: 'hormones',
      concept: 'ভার্নালিজেশন (Vernalization) বা শৈত্যপ্রদান',
      def: 'অঙ্কুরিত বীজ বা কচি চারার (যেমন শীতকালীন গম) বর্ধনশীল শীর্ষকে ০°–৫°C শীতল তাপমাত্রায় রেখে দ্রুত পুষ্পায়ন ত্বরান্বিত করা (লাইসেঙ্কো, ১৯২৮)',
      clinical: 'ধারণা করা হয় এসময় শীর্ষক অঞ্চলে "ভার্নালিন" নামক প্রকল্পিত পুষ্পহরমোন সৃষ্টি হয় (GA₃ দ্বারা প্রতিস্থাপনযোগ্য)',
      diff: 'board',
    },
    {
      topic: 'hormones',
      concept: 'উদ্ভিদের ন্যাস্টিক (Nastic) চলন বনাম ট্রপিক (Tropic) চলন',
      def: 'উদ্দীপকের দিকনির্ভর বৃদ্ধিজনিত চলন হলো ট্রপিজম (ফটোট্রপিজম-অক্সিন), আর উদ্দীপকের তীব্রতানির্ভর কোষরসস্ফীতি চলন হলো ন্যাস্টিক (লজ্জাবতীর সিসমোন্যাস্টি)',
      clinical: 'লজ্জাবতী (Mimosa pudica) স্পর্শ করলে পত্রকমূলের পালভিনাস (Pulvinus) থেকে দ্রুত K⁺ ও পানি বের হয়ে পাতা নুয়ে পড়ে',
      diff: 'medical',
    },
    // Plus 20 extra deep metabolic/enzyme rows
    {
      topic: 'photosynthesis',
      concept: 'ফসফোএনলপাইরুভেট কার্বক্সিলেজ (PEPcase) ও পিরুভেট ফসফেট ডাইকাইনেজ',
      def: 'C₄ মেসোফিল কোষে PEPcase অক্সিজেনের প্রতি আসক্তিহীনভাবে HCO₃⁻ গ্রহণ করে ও বান্ডল সিথে পাইরুভেট ফিরে আসার পর PPDK দ্বারা ২টি অতিরিক্ত ATP খরচে PEP পুনর্গঠন হয়',
      clinical: 'তাই ১টি গ্লুকোজ তৈরিতে C₃ উদ্ভিদে ১৮ ATP লাগলে C₄ উদ্ভিদে মোট ৩০টি ATP (প্রতি CO₂-তে ৫ ATP) প্রয়োজন হয়',
      diff: 'medical',
    },
    {
      topic: 'photosynthesis',
      concept: 'কেলভিন চক্রে ১টি ট্রায়োজ ফসফেট (G3P) রপ্তানি বনাম গ্লুকোজ সংশ্লেষণ',
      def: 'কেলভিন চক্রে ৩ অণু CO₂ স্থির হলে মোট ৬টি G3P তৈরি হয় যার ১টি নিট লাভ হিসেবে সাইটোপ্লাজমে যায় ও ৫টি পুনরায় ৩টি RuBP বানায়',
      clinical: 'অর্থাৎ ৬টি G3P-র মধ্যে ৫/৬ অংশ RuBP পুনরুৎপাদনে এবং মাত্র ১/৬ অংশ গ্লুকোজ/সুক্রোজ তৈরিতে ব্যয় হয়',
      diff: 'dental',
    },
    {
      topic: 'photosynthesis',
      concept: 'কারোটিনয়েড (ক্যারোটিন ও জ্যান্থোফিল) সহায়ক রঞ্জকের অ্যান্টিঅক্সিডেন্ট ভূমিকা',
      def: 'বেগুনি-নীল আলো শোষণ করে ক্লোরোফিল-a-তে শক্তি স্থানান্তর এবং অতিরিক্ত ফোটন শক্তি তাপ হিসেবে ছড়িয়ে ফটো-অক্সিডেশন প্রতিরোধ করে',
      clinical: 'অর্থো-অ্যাক্সেসরি রঞ্জক না থাকলে তীব্র সূর্যালোকে ক্লোরোফিল-a সহজেই জারিত হয়ে বিনষ্ট হতো',
      diff: 'board',
    },
    {
      topic: 'respiration',
      concept: 'সবাত শ্বসনে কার্বক্সিলেশন বনাম ডিকার্বক্সিলেশন ধাপ',
      def: '১ অণু গ্লুকোজ সম্পূর্ণ জারণে মোট ৬টি CO₂ বের হয়: ২টি লিংক বিক্রিয়ায় ও ৪টি ক্রেবস চক্রে (আইসোসাইট্রেট → α-KG এবং α-KG → সাকসিনাইল CoA)',
      clinical: 'গ্লাইকোলাইসিস ধাপে কোনো কার্বন CO₂ রূপে মুক্ত হয় না — ৬ কার্বন দুটি ৩-কার্বন পাইরুভেটে অটুট থাকে',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'ক্রেবস চক্রের একমাত্র ৫-কার্বন অন্তর্বর্তী যৌগ',
      def: 'আলফা-কিটোগ্লুটারিক অ্যাসিড (α-Ketoglutarate) হলো সাইট্রিক অ্যাসিড চক্রের একমাত্র ৫-কার্বন যৌগ যা অ্যামিনো অ্যাসিড (গ্লুটামেট) সংশ্লেষের পূর্বগামী',
      clinical: 'অক্সালোঅ্যাসিটেট ৪-কার্বন ও সাইট্রেট/আইসোসাইট্রেট ৬-কার্বন জৈব অ্যাসিড',
      diff: 'medical',
    },
    {
      topic: 'respiration',
      concept: 'সায়ানাইড-সহিষ্ণু শ্বসন (Alternative Oxidase / AOX পথ)',
      def: 'কচু বা আরাম লিলি জাতীয় উদ্ভিদে (Amorphophallus) ATP তৈরি ছাড়াই সরাসরি তাপ উৎপন্ন করে পরাগায়নকারী পতঙ্গ আকর্ষণকারী বিকল্প শ্বসন পথ',
      clinical: 'এই থার্মোজেনিক শ্বসনে ফুলের তাপমাত্রা পরিবেষ্টিত বায়ুর চেয়ে ১৫–২০°C পর্যন্ত বেশি হতে পারে',
      diff: 'dental',
    },
    {
      topic: 'absorption',
      concept: 'প্লাজমোলাইসিস (Plasmolysis) ও ডিপ্লাজমোলাইসিস',
      def: 'অতিসারী (Hypertonic) দ্রবণে উদ্ভিদ কোষ রাখলে বহিঃঅভিস্রবণে পানি বের হয়ে কোষপ্রাচীর থেকে প্রোটোপ্লাজম সংকুচিত হয়ে বিচ্ছিন্ন হওয়া',
      clinical: 'কোষপ্রাচীর ও সংকুচিত প্রোটোপ্লাজমের মাঝের ফাঁকা স্থানে বাইরের অতিসারী দ্রবণ প্রবেশ করে; লঘুসারী দ্রবণে রাখলে পুনরায় স্ফীত হয়',
      diff: 'board',
    },
    {
      topic: 'absorption',
      concept: 'অভিস্রবণীয় চাপে (OP), রসস্ফীতি চাপে (TP) ও ব্যাপন ঘাটতিতে (DPD) সম্পর্ক',
      def: 'DPD (বা টান ক্ষমতা SP) = OP − TP; পূর্ণ রসস্ফীত কোষে TP = OP হয় বলে DPD = ০ এবং ফ্ল্যাসিড কোষে TP = ০ বলে DPD = OP হয়',
      clinical: 'সর্বদা পানি প্রবাহিত হয় কম DPD (উচ্চ জলবিভব Ψ_w) যুক্ত কোষ থেকে বেশি DPD (নিম্ন জলবিভব Ψ_w) যুক্ত কোষের দিকে',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'পানির বিভব বা ওয়াটার পটেনশিয়াল (Ψ_w = Ψ_s + Ψ_p)',
      def: 'বিশুদ্ধ পানির প্রমাণ জলবিভব শূন্য (০); দ্রব যোগ করলে দ্রব বিভব (Ψ_s) সর্বদা ঋণাত্মক হয় এবং কোষ প্রাচীরের চাপ বিভব (Ψ_p) সাধারণত ধনাত্মক হয়',
      clinical: 'অন্য কোনো প্লাজমোলাইজড বা জাইলেমের টানযুক্ত কোষে Ψ_p শূন্য বা ঋণাত্মক হতে পারে',
      diff: 'medical',
    },
    {
      topic: 'absorption',
      concept: 'অ্যাপোপ্লাস্ট (Apoplast) বনাম সিমপ্লাস্ট (Symplast) পথ',
      def: 'কোষপ্রাচীর ও আন্তঃকোষীয় ফাঁক দিয়ে অজৈব নির্জীব পথে পানি চলাচল (অ্যাপোপ্লাস্ট — এন্ডোডার্মিসে বাধা পায়) বনাম প্লাজমোডেসমাটার মাধ্যমে সজীব সাইটোপ্লাজমীয় পথ',
      clinical: 'ক্যাসপেরিয়ান ফিতার কারণে এন্ডোডার্মিস স্তরে সমস্ত জলপ্রবাহ বাধ্যতামূলকভাবে সিমপ্লাস্ট পথে ঢুকে কর্টেক্স থেকে জাইলেমে যায়',
      diff: 'medical',
    },
  ];

  physRows.forEach((r, idx) => {
    const sameTopic = physRows.filter((x) => x.topic === r.topic && x.concept !== r.concept);
    const fallback = physRows.filter((x) => x.concept !== r.concept);
    const pool = sameTopic.length >= 3 ? sameTopic : fallback;
    const pick = <T,>(getter: (x: PhysConceptRow) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: r.diff ?? 'medical',
        question: `উদ্ভিদ শারীরতত্ত্বে "${r.def}" — এই তত্ত্ব বা প্রক্রিয়াটি কী নামে পরিচিত?`,
        correct: r.concept,
        distractors: pick((x) => x.concept, 1),
        explanation: `${r.concept}: ${r.def}। (${r.clinical})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · উদ্ভিদ শারীরতত্ত্ব',
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
        question: `"${r.concept}"-এর মূল ক্রিয়াকৌশল বা সংজ্ঞা নিচের কোনটি?`,
        correct: r.def,
        distractors: pick((x) => x.def, 2),
        explanation: `${r.concept}-এর সঠিক ব্যাখ্যা: ${r.def}। (${r.clinical})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · প্রক্রিয়া ও মতবাদ',
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
        question: `শারীরবৃত্তীয় বিশ্লেষণ: "${r.clinical}" — এই সিদ্ধান্তটি কোন ধারণা বা প্রক্রিয়ার সাথে সম্পর্কিত?`,
        correct: r.concept,
        distractors: pick((x) => x.concept, 3),
        explanation: `"${r.clinical}" ঘটনাটি সরাসরি ${r.concept} (${r.def})-এর সাথে যুক্ত।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · মেডিকেল ও ডেন্টাল বিশ্লেষণ',
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
        question: `"${r.concept}" সম্পর্কিত পরীক্ষামুখী সঠিক বৈশিষ্ট্য বা ব্যতিক্রম কোনটি?`,
        correct: r.clinical,
        distractors: pick((x) => x.clinical, 4),
        explanation: `${r.concept}-এর গুরুত্বপূর্ণ পরীক্ষামূলক ফলাফল: ${r.clinical}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · উচ্চতর অ্যাডমিশন নোট',
      })
    );
  });

  // 2. Quantitative Plant Physiology Calculation Drills (160+ unique MCQs)
  // 2A. Water Potential (Ψw = Ψs + Ψp) & DPD Cell-to-Cell Water Flow (20 × 2 = 40 MCQs)
  const cellPairs = [
    { opA: 12, tpA: 8, opB: 10, tpB: 4 },
    { opA: 15, tpA: 10, opB: 14, tpB: 7 },
    { opA: 18, tpA: 12, opB: 16, tpB: 6 },
    { opA: 20, tpA: 15, opB: 18, tpB: 8 },
    { opA: 22, tpA: 14, opB: 19, tpB: 5 },
    { opA: 10, tpA: 6, opB: 12, tpB: 9 },
    { opA: 14, tpA: 5, opB: 16, tpB: 11 },
    { opA: 16, tpA: 4, opB: 18, tpB: 12 },
    { opA: 24, tpA: 18, opB: 20, tpB: 10 },
    { opA: 25, tpA: 20, opB: 21, tpB: 9 },
  ];
  cellPairs.forEach((cp, i) => {
    const dpdA = cp.opA - cp.tpA;
    const dpdB = cp.opB - cp.tpB;
    const psiWA = -dpdA;
    const psiWB = -dpdB;
    const flow = dpdB > dpdA ? 'কোষ-A থেকে কোষ-B-তে' : 'কোষ-B থেকে কোষ-A-তে';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পাশাপাশি দুটি উদ্ভিদ কোষ A ও B-এর জন্য কোষ-A-তে OP = ${toBnDigits(cp.opA)} atm, TP = ${toBnDigits(cp.tpA)} atm এবং কোষ-B-তে OP = ${toBnDigits(cp.opB)} atm, TP = ${toBnDigits(cp.tpB)} atm হলে কোষ দুটির মধ্যে পানি কোন দিকে প্রবাহিত হবে?`,
        correct: `${flow} (DPD যথাক্রমে ${toBnDigits(dpdA)} ও ${toBnDigits(dpdB)} atm)`,
        distractors: [
          `${dpdB > dpdA ? 'কোষ-B থেকে কোষ-A-তে' : 'কোষ-A থেকে কোষ-B-তে'} (OP বেশি হওয়ায়)`,
          `উভয় দিকে সমান গতিতে (সাম্যাবস্থায়)`,
          `কোনো দিকেই প্রবাহিত হবে না`,
        ],
        explanation: `DPD = OP − TP; এখানে DPD_A = ${toBnDigits(cp.opA)}−${toBnDigits(cp.tpA)} = ${toBnDigits(dpdA)} এবং DPD_B = ${toBnDigits(cp.opB)}−${toBnDigits(cp.tpB)} = ${toBnDigits(dpdB)}। পানি সর্বদা কম DPD থেকে বেশি DPD-তে (${flow}) যায়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · DPD ও জলপ্রবাহ গাণিতিক সমস্যা',
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
        question: `একটি জীবিত উদ্ভিদ কোষের দ্রব বিভব Ψ_s = −${toBnDigits(cp.opA)} bar এবং চাপ বিভব Ψ_p = +${toBnDigits(cp.tpA)} bar হলে কোষটির নিট জলবিভব (Ψ_w) কত bar হবে?`,
        correct: `−${toBnDigits(Math.abs(psiWA))} bar`,
        distractors: [
          `+${toBnDigits(Math.abs(psiWA))} bar`,
          `−${toBnDigits(cp.opA + cp.tpA)} bar`,
          `${toBnDigits(cp.tpA)} bar`,
        ],
        explanation: `জলবিভবের সূত্র Ψ_w = Ψ_s + Ψ_p = −${toBnDigits(cp.opA)} + (${toBnDigits(cp.tpA)}) = −${toBnDigits(Math.abs(psiWA))} bar। (পাশের কোষ B-এর তুলনায় Ψ_w = ${toBnDigits(psiWB)} bar হলে প্রবাহ দিক নির্ধারিত হয়)।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ওয়াটার পটেনশিয়াল সূত্র',
      })
    );
  });

  // 2B. C3 vs C4 ATP & NADPH Stoichiometry Numericals (14 × 2 = 28 MCQs)
  [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].forEach((hexose, i) => {
    const co2Fixed = hexose * 6;
    const c3Atp = hexose * 18;
    const c4Atp = hexose * 30;
    const nadph = hexose * 12;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি C₄ উদ্ভিদের (যেমন ভুট্টা বা আখ) পাতায় ${toBnDigits(hexose)} অণু হেক্সোজ শর্করা (গ্লুকোজ) সংশ্লেষ করতে ${toBnDigits(co2Fixed)} অণু CO₂ আবদ্ধকরণে মোট কতটি ATP ও কতটি NADPH + H⁺ ব্যয় হয়?`,
        correct: `${toBnDigits(c4Atp)}টি ATP ও ${toBnDigits(nadph)}টি NADPH + H⁺`,
        distractors: [
          `${toBnDigits(c3Atp)}টি ATP ও ${toBnDigits(nadph)}টি NADPH + H⁺`,
          `${toBnDigits(c4Atp)}টি ATP ও ${toBnDigits(c3Atp)}টি NADPH + H⁺`,
          `${toBnDigits(hexose * 24)}টি ATP ও ${toBnDigits(hexose * 6)}টি NADPH + H⁺`,
        ],
        explanation: `প্রতি CO₂-তে C₄ উদ্ভিদে ৫ ATP ও ২ NADPH লাগে। তাই ১ গ্লুকোজ (৬ CO₂)-এ ৩০ ATP ও ১২ NADPH; অতএব ${toBnDigits(hexose)} গ্লুকোজে ${toBnDigits(c4Atp)} ATP ও ${toBnDigits(nadph)} NADPH।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · C₄ চক্র শক্তি হিসাব',
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
        question: `ধান বা গমের মতো C₃ উদ্ভিদে ${toBnDigits(hexose)} অণু গ্লুকোজ সংশ্লেষণে C₄ উদ্ভিদের তুলনায় কতটি ATP সাশ্রয় হয় (ফটোরেসপিরেশন উপেক্ষা করে)?`,
        correct: `${toBnDigits(c4Atp - c3Atp)}টি ATP কম লাগে (${toBnDigits(c3Atp)} বনাম ${toBnDigits(c4Atp)})`,
        distractors: [
          `${toBnDigits(hexose * 6)}টি ATP কম লাগে`,
          `${toBnDigits(hexose * 24)}টি ATP কম লাগে`,
          `কোনো পার্থক্য থাকে না`,
        ],
        explanation: `প্রতি গ্লুকোজে C₃ চক্রে ১৮ ATP ও C₄ চক্রে ৩০ ATP লাগে (পার্থক্য ১২ ATP/গ্লুকোজ)। তাই ${toBnDigits(hexose)} গ্লুকোজে পার্থক্য ${toBnDigits(c4Atp - c3Atp)} ATP।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · C₃ ও C₄ চক্র তুলনা',
      })
    );
  });

  // 2C. Aerobic Respiration ATP & RQ Stoichiometry Numericals (15 × 3 = 45 MCQs)
  [2, 3, 4, 5, 6, 8, 10, 12, 15, 20].forEach((glu, i) => {
    const netAerobicHeart = glu * 38;
    const netAerobicBrain = glu * 36;
    const co2Out = glu * 6;
    const krebsNadh = glu * 6;
    const krebsFadh2 = glu * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(glu)} অণু গ্লুকোজ সবাত শ্বসনে (ম্যালেট-অ্যাস্পার্ট্রেট শাটল পথ ধরে) সম্পূর্ণ জারিত হলে ক্রেবস চক্রে মোট কতটি NADH + H⁺ এবং কতটি FADH₂ উৎপন্ন হয়?`,
        correct: `${toBnDigits(krebsNadh)}টি NADH + H⁺ ও ${toBnDigits(krebsFadh2)}টি FADH₂`,
        distractors: [
          `${toBnDigits(glu * 10)}টি NADH + H⁺ ও ${toBnDigits(krebsFadh2)}টি FADH₂`,
          `${toBnDigits(krebsNadh)}টি NADH + H⁺ ও ${toBnDigits(glu * 4)}টি FADH₂`,
          `${toBnDigits(glu * 4)}টি NADH + H⁺ ও ${toBnDigits(glu)}টি FADH₂`,
        ],
        explanation: `১ অণু গ্লুকোজে ক্রেবস চক্র ২ বার আবর্তিত হয়ে ৬ NADH + H⁺ ও ২ FADH₂ তৈরি করে (প্রচলিত হিসাবে যথাক্রমে ৩৮ বা ৩৬ ATP-এর অংশ); তাই ${toBnDigits(glu)} গ্লুকোজে ${toBnDigits(krebsNadh)} NADH ও ${toBnDigits(krebsFadh2)} FADH₂।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ক্রেবস চক্র হিসাব',
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
        question: `অক্সিজেনের অভাবে ইস্ট কোষে ${toBnDigits(glu)} অণু গ্লুকোজ অবাত গাঁজন প্রক্রিয়ায় ভাঙলে মোট কত অণু CO₂ ও নিট কতটি ATP উৎপন্ন হবে?`,
        correct: `${toBnDigits(glu * 2)} অণু CO₂ ও নিট ${toBnDigits(glu * 2)}টি ATP`,
        distractors: [
          `${toBnDigits(co2Out)} অণু CO₂ ও নিট ${toBnDigits(netAerobicBrain)}টি ATP`,
          `${toBnDigits(glu * 4)} অণু CO₂ ও নিট ${toBnDigits(glu * 4)}টি ATP`,
          `কোনো CO₂ নয় ও নিট ${toBnDigits(glu * 2)}টি ATP`,
        ],
        explanation: `অ্যালকোহলিক ফার্মেন্টেশনে ১ অণু গ্লুকোজ থেকে ২ ইথানল + ২ CO₂ + নিট ২ ATP হয়; তাই ${toBnDigits(glu)} গ্লুকোজে ${toBnDigits(glu * 2)} CO₂ ও ${toBnDigits(glu * 2)} ATP (ক্লোরোফিলহীন কঙ্কাল পেশির ল্যাকটিক অ্যাসিডে CO₂ হয় না)।`,
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
        difficulty: 'medical',
        question: `সবাত শ্বসনে প্রচলিত সমীকরণ অনুযায়ী ${toBnDigits(glu)} অণু গ্লুকোজের সম্পূর্ণ জারণে প্রোক্যারিওট/যকৃত কোষে কতটি ATP এবং গ্লিসারল-৩-ফসফেট শাটলে (পেশি-মস্তিষ্কে) কতটি ATP তৈরি হয়?`,
        correct: `যথাক্রমে ${toBnDigits(netAerobicHeart)}টি ও ${toBnDigits(netAerobicBrain)}টি ATP`,
        distractors: [
          `যথাক্রমে ${toBnDigits(netAerobicBrain)}টি ও ${toBnDigits(glu * 32)}টি ATP`,
          `যথাক্রমে ${toBnDigits(glu * 40)}টি ও ${toBnDigits(netAerobicHeart)}টি ATP`,
          `উভয় ক্ষেত্রেই সমান ${toBnDigits(netAerobicHeart)}টি ATP`,
        ],
        explanation: `প্রতি গ্লুকোজে প্রচলিত হিসাবে ৩৮ (হৃদযকৃৎ/প্রোক্যারিওট) বা ৩৬ (গ্লিসারল-৩-ফসফেট শাটল) ATP তৈরি হয়; ${toBnDigits(glu)} অণুতে যথাক্রমে ${toBnDigits(netAerobicHeart)} ও ${toBnDigits(netAerobicBrain)} ATP।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শ্বসন শক্তি-বিবরণী',
      })
    );
  });

  // 2D. RQ Calculation Drills Across Substrates (10 × 2 = 20 MCQs)
  const rqSubstrates = [
    { name: 'ম্যালিক অ্যাসিড (C₄H₆O₅)', co2: 4, o2: 3, rq: '১.৩৩ (> ১)' },
    { name: 'অক্সালিক অ্যাসিড (C₂H₂O₄)', co2: 4, o2: 1, rq: '৪.০ (> ১)' },
    { name: 'ট্রিপামিটিন চর্বি (C₅₁H₉₈O₆)', co2: 102, o2: 145, rq: '০.৭ (< ১)' },
    { name: 'ট্রাইওলেইন লিপিড (C₅₇H₁₀₄O₆)', co2: 57, o2: 80, rq: '০.৭১ (< ১)' },
    { name: 'সুক্রোজ (C₁₂H₂₂O₁₁)', co2: 12, o2: 12, rq: '১.০' },
    { name: 'ফ্রুক্টোজ (C₆H₁₂O₆)', co2: 6, o2: 6, rq: '১.০' },
    { name: 'টার্টারিক অ্যাসিড (C₄H₆O₆)', co2: 8, o2: 5, rq: '১.৬ (> ১)' },
    { name: 'সাইট্রিক অ্যাসিড (C₆H₈O₇)', co2: 12, o2: 9, rq: '১.৩৩ (> ১)' },
    { name: 'অঙ্কুরিত সরিষা বীজ (তেলসমৃদ্ধ)', co2: 72, o2: 100, rq: '০.৭২ (< ১)' },
    { name: 'সাধারণ গ্লাইকোলাইটিক গাঁজন (CO₂ নির্গত, O₂ = ০)', co2: 2, o2: 0, rq: 'অসীম (∞)' },
  ];
  rqSubstrates.forEach((rq, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `উদ্ভিদের শ্বসনে ${rq.name} জারিত হয়ে প্রতি ${toBnDigits(rq.o2)} অণু O₂ গ্রহণের বিপরীতে ${toBnDigits(rq.co2)} অণু CO₂ নির্গত হলে শ্বসনিক হার (RQ) কত হবে?`,
        correct: rq.rq,
        distractors: [
          rq.rq === '১.০' ? '০.৭ (< ১)' : '১.০',
          rq.rq === 'অসীম (∞)' ? '০ (শূন্য)' : '২.৫',
          rq.rq === '০.৭ (< ১)' ? '১.৩৩ (> ১)' : '০.৫',
        ].slice(0, 3),
        explanation: `RQ = নির্গত CO₂ / গৃহীত O₂ = ${toBnDigits(rq.co2)} / ${toBnDigits(rq.o2)} ≈ ${rq.rq}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শ্বসনিক হার (RQ)',
      })
    );
  });

  // 2E. Phytohormone Experimental Bioassay & Agricultural Application (16 × 2 = 32 MCQs)
  const bioassays = [
    { assay: 'অ্যাভেনা বক্রতা পরীক্ষা (Avena Curvature Test)', hormone: 'অক্সিন (IAA)', note: 'ওট চারার কোলিওপটাইলের একপাশে অগার ব্লক বসিয়ে বক্রতার কোণ মাপা হয়' },
    { assay: 'বার্লি শস্যদানা আলফা-অ্যামাইলেজ পরীক্ষা', hormone: 'জিব্বেরেলিন (GA₃)', note: 'ভ্রূণবিহীন বার্লি বীজের অ্যালিউরোন স্তরে শ্বেতসার বিশ্লেষী এনজাইম উদ্দীপিত করে' },
    { assay: 'তামাক পিথ ক্যালাস কোষ বিভাজন ও ক্লোরোফিল সংরক্ষণ (রিচমন্ড-ল্যাং)', hormone: 'সাইটোকাইনিন (কাইনেটিন)', note: 'পাতার ক্লোরোফিল ও প্রোটিন ভেঙে যাওয়া রোধ করে বার্ধক্য বিলম্বিত করে' },
    { assay: 'ট্রিপল রেসপন্স পরীক্ষা (মোটর চারার স্থূল-বাঁকা-ক্ষুদ্র বৃদ্ধি)', hormone: 'ইথিলিন (C₂H₄)', note: 'অন্ধকারে মটর চারায় আনুভূমিক বৃদ্ধি, কাণ্ড স্থূল হওয়া ও দৈর্ঘ্যবৃদ্ধি রোধ করে' },
    { assay: 'স্টোম্যাটা দ্রুত বন্ধ হওয়া ও বীজ সুপ্তাবস্থা বজায় রাখা', hormone: 'অ্যাবসিসিক অ্যাসিড (ABA)', note: 'খরা বা লবণাক্ততার স্ট্রেসে পাতা ঝরে পড়া ও বাষ্পীভবন ক্ষয় ঠেকায়' },
    { assay: 'পারথেনোকার্পিক বীজহীন টমেটো ও আঙ্গুরের গুচ্ছ বড় করা', hormone: 'অক্সিন ও জিব্বেরেলিন', note: 'ফুলের পরাগায়ন ও নিষেক ছাড়াই ডিম্বাশয়কে ফলে পরিণত করতে ও পুষ্পমঞ্জুরী প্রসারণে কাজ করে' },
    { assay: 'হাইড্রোথার্মাল বা ২৪-ডি (2,4-D) দ্বারা দ্বিবীজপত্রী আগাছা দমন', hormone: 'সংশ্লেষিত অক্সিন (২,৪-D)', note: 'ধান-গমের মতো একবীজপত্রী শস্যক্ষেতের ক্ষতি না করেই চওড়া পাতার আগাছা ধ্বংস করে' },
    { assay: 'আনারস ও লিচুতে সমকালীন পুষ্পায়ন (Synchronized Flowering)', hormone: 'ইথেফন/ইথিলিন ও NAA', note: 'বাণিজ্যিক চাষে একসাথে ফুল ও ফল ধরানোর জন্য প্রয়োগ করা হয়' },
  ];
  bioassays.forEach((ba, idx) => {
    const others = bioassays.filter((x) => x.hormone !== ba.hormone);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch9_physiology',
        visualLessonId: 'photosynthesis',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `উদ্ভিদ হরমোন শনাক্তকরণ বা প্রয়োগে "${ba.assay}" কোন ফাইটোহরমোনটির জন্য প্রযোজ্য?`,
        correct: ba.hormone,
        distractors: others.slice(0, 4).map((x) => x.hormone),
        explanation: `${ba.assay} মূলত ${ba.hormone}-এর জৈবিক পরীক্ষা (Bioassay) বা ব্যবহার: ${ba.note}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ফাইটোহরমোন বায়োঅ্যাসে',
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
        question: `${ba.hormone}-এর ক্রিয়াকৌশল সম্পর্কে নিচের কোন মন্তব্যটি যথার্থ?`,
        correct: ba.note,
        distractors: others.slice(0, 4).map((x) => x.note),
        explanation: `${ba.hormone} (${ba.assay}): ${ba.note}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · কৃষি ও উদ্যানতত্ত্বে হরমোন',
      })
    );
  });

  return list;
}
