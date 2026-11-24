import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio2RRaw {
  ch: 'bio2_ch11_genetics' | 'bio2_ch12_behavior';
  vl: string;
  cat: string;
  term: string;
  fact: string;
  pearl: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredR(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_sr_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 11 (Genetics & Evolution) + Ch 12 (Animal Behavior Deep Coverage): 45 × 4 = 180 unique MCQs
  const rows: Bio2RRaw[] = [
    // --- Chapter 11: Genetics & Evolution ---
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'mendelian',
      term: 'অসম্পূর্ণ প্রকটতা (Incomplete Dominance) বনাম সহ-প্রকটতা (Codominance)',
      fact: 'সন্ধ্যামালতী (Mirabilis jalapa)-তে লাল × সাদা → F₁ গোলাপি ও F₂-তে ফিনোটাইপ ও জিনোটাইপ উভয়ই ১:২:১; সহ-প্রকটতায় দুটি অ্যালিল সমানভাবে প্রকাশ পায় (IᴬIᴮ রক্তের AB গ্রুপ ও শর্টহর্ন গরুতে রোয়ান বর্ণ)',
      pearl: 'উভয় ক্ষেত্রেই মেন্ডেলের মনোহাইব্রিড ৩:১ অনুপাত পরিবর্তিত হয়ে F₂ ফিনোটাইপিক অনুপাত ১:২:১ হয়ে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'mendelian',
      term: 'লিথাল জিন বা মারণ জিন (লুসিয়েন কুইনো ১৯০৫) — ২:১ অনুপাত',
      fact: 'হোমোজাইগাস অবস্থায় জীবের ভ্রূণাবস্থাতেই মৃত্যু ঘটানো প্রকট বা প্রচ্ছন্ন জিন (যেমন হলুদ ইঁদুর AʸA × AʸA → AʸAʸ মারা যায় ও ২ হলুদ : ১ অ-হলুদ জীবিত থাকে)',
      pearl: 'মানুষে অ্যাখন্ড্রোপ্লাসিয়া (বামনত্ব), থ্যালাসেমিয়া মেজর ও সিকেল-সেল অ্যানিমিয়া লিথাল/সেমি-লিথাল জিনের উদাহরণ; লতা-মটরে ক্রিপার মুরগিও ২:১ অনুপাত দেখায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'mendelian',
      term: 'পরিপূরক জিন (Complementary Genes — ৯:৭ অনুপাত)',
      fact: 'মিষ্টি মটরে (Lathyrus odoratus) দুটি ভিন্ন লোকাসের অন্তত একটি করে প্রকট জিন (C_P_) একসাথে উপস্থিত থাকলেই কেবল বেগুনি ফুল হয়, অন্যথায় (C_pp, ccP_, ccpp) সাদা ফুল হয়',
      pearl: 'ফলে ডাইহাইব্রিড F₂ ৯:৩:৩:১ অনুপাত পরিবর্তিত হয়ে ৯ বেগুনি : ৭ সাদা হয় (বেটসন ও পানেট আবিষ্কার করেন)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'mendelian',
      term: 'প্রকট এপিস্ট্যাসিস (Dominant Epistasis — ১৩:৩ এবং ১২:৩:১)',
      fact: 'সাদা লেগহর্ন মুরগিতে I (প্রকট বাধাদানকারী জিন) রঙিন C জিনকে ঢেকে দেয় বলে F₂-তে ১৩ সাদা : ৩ রঙিন হয়; আর সামার স্কোয়াশে W জিন অন্য লোকাস চেপে রাখায় ১২ সাদা : ৩ হলুদ : ১ সবুজ হয়',
      pearl: 'একটি লোকাসের জিন কর্তৃক ভিন্ন লোকাসের (নন-অ্যালিলিক) জিনের প্রকাশে বাধা দেওয়াই হলো এপিস্ট্যাসিস',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'mendelian',
      term: 'দ্বৈত প্রচ্ছন্ন এপিস্ট্যাসিস বনাম প্রচ্ছন্ন এপিস্ট্যাসিস (৯:৩:৪ অনুপাত)',
      fact: 'কোনো লোকাসে হোমোজাইগাস প্রচ্ছন্ন অবস্থা (যেমন ইঁদুরের লোমে aa বা মানুষের বম্বে ফেনোটাইপ hh) অন্য লোকাসের রঙের জিনকে প্রকাশ হতে না দিলে ৯:৩:৪ অনুপাত দেখা যায়',
      pearl: 'মানুষের অগৌতি (A), কালো (a) লোমের বর্ণবিন্যাসে প্রচ্ছন্ন এপিস্ট্যাসিস আদর্শ উদাহরণ',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'mendelian',
      term: 'পলিজেনিক বা বহু-জিন বংশগতি (মানুষের গায়ের রঙ, উচ্চতা ও বুদ্ধিমত্তা)',
      fact: 'একাধিক স্বতন্ত্র জিনের সম্মিলিত সংযোজনমূলক (Additive) প্রভাবে ফিনোটাইপের নিরবচ্ছিন্ন পরিবর্তন (বক্ররেখা বণ্টন — নীলসন-এহলে গমের দানা ও মানুষের ত্বকে ৩টি জিন A, B, C)',
      pearl: '৬টি প্রকট অ্যালিল থাকলে গাঢ় কৃষ্ণ ও ৬টি প্রচ্ছন্ন অ্যালিল থাকলে অত্যন্ত ফর্সা এবং F₂ প্রজন্মে ১:৬:১৫:২০:১৫:৬:১ অনুপাত পাওয়া যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'sex_linked',
      term: 'সেক্স-লিঙ্কড ইনহেরিট্যান্স: লাল-সবুজ বর্ণান্ধতা, হিমোফিলিয়া ও ক্রিস-ক্রস উত্তরাধিকার',
      fact: 'X-ক্রোমোজোমবাহিত প্রচ্ছন্ন জিন পিতা থেকে বাহক কন্যায় ও কন্যা থেকে ৫০% দৌহিত্রে (নাতিতে) যায় (মরগ্যান ড্রসোফিলায় সাদা চোখ দিয়ে প্রমাণ করেন)',
      pearl: 'পুরুষে ১টি মাত্র X ক্রোমোজোম থাকায় হেমিজাইগাস অবস্থাতেই রোগ প্রকাশ পায়; হিমোফিলিয়া-A ফ্যাক্টর-VIII ও হিমোফিলিয়া-B (ক্রিসমাস রোগ) ফ্যাক্টর-IX-এর অভাবে হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'sex_linked',
      term: 'ডুশেন মাসকুলার ডিস্ট্রোফি (DMD) ও প্রজেরিয়া বনাম হোলান্ড্রিক Y-লিঙ্কড',
      fact: 'X-লিঙ্কড প্রচ্ছন্ন DMD-তে ডিস্ট্রোফিন প্রোটিনের অভাবে শিশুবয়সে পেশি ক্ষয় হয়; অপরদিকে কেবল Y-ক্রোমোজোমবাহিত কানের পিনায় অতিরিক্ত লোম (হাইপারট্রাইকোসিস) পিতা থেকে কেবল পুত্র সন্তানে যায়',
      pearl: 'ড্রসোফিলা ও মানুষে XX/XY (পুরুষ হেটারোগ্যামেটিক), কিন্তু পাখি-প্রজাপতি-কিছু সাপে ZZ/ZW (স্ত্রী হেটারোগ্যামেটিক) ও ঘাসফড়িংয়ে XX/XO লিঙ্গ নির্ধারণ দেখা যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'evolution',
      term: 'ল্যামার্কবাদ (১৮০৯, Philosophie Zoologique) বনাম ডারউইনবাদ (১৮৫৯, প্রাকৃতিক নির্বাচন)',
      fact: 'ল্যামার্ক অঙ্গের ব্যবহার-অব্যবহার ও অর্জিত বৈশিষ্ট্যের বংশানুক্রমিক সঞ্চরণ প্রস্তাব করেন (ভাইজম্যানের ইঁদুরের লেজ ও জার্মপ্লাজম তত্ত্বে খণ্ডিত); ডারউইন অত্যাধিক বংশবৃদ্ধি, জীবনসংগ্রাম ও যোগ্যতমের জয়তত্ত্ব দেন',
      pearl: 'উগো দ্য ভ্রিসের মিউটেশন তত্ত্ব ও ডারউইনের প্রাকৃতিক নির্বাচন মিলিয়ে আধুনিক সিন্থেটিক বা নব্য-ডারউইনবাদ গড়ে ওঠে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'evolution',
      term: 'সমসংস্থ (Homologous — অপসারী বিবর্তন) বনাম সমবৃত্তীয় (Analogous — অভিসারী বিবর্তন)',
      fact: 'উৎপত্তি ও অন্তর্গঠন এক কিন্তু কাজ ভিন্ন (মানুষের হাত, বাদুড়ের ডানা, তিমির ফ্লিপার ও ঘোড়ার অগ্রপদ) হলো সমসংস্থ অঙ্গ; উৎপত্তি ভিন্ন কিন্তু কাজ এক (পাখির ডানা ও প্রজাপতির ডানা) হলো সমবৃত্তীয়',
      pearl: 'মানুষের প্রায় ১০০+ নিষ্ক্রিয় অঙ্গের মধ্যে অ্যাপেন্ডিক্স, কক্কিক্স, আক্কেল দাঁত ও চোখের নিকটিটেটিং মেমব্রেন পূর্বপুরুষীয় বিবর্তনের জীবন্ত প্রমাণ',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'evolution',
      term: 'আর্কিওপ্টেরিক্স (Archaeopteryx lithographica — জুরাসিক সংযোগকারী জীবাশ্ম)',
      fact: 'জার্মানির ব্যাভেরিয়া থেকে প্রাপ্ত ১৫ কোটি বছরের জীবাশ্ম যাতে সরীসৃপীয় (চোয়ালে দাঁত, দীর্ঘ কশেরুকাময় লেজ, ডানায় নখর) ও পক্ষী-বৈশিষ্ট্য (পালক, ফুরকুলা, চঞ্চু) উভয়ই ছিল',
      pearl: 'জীবন্ত কানেক্টিং লিংকের উদাহরণ হলো প্লাটিপাস (সরীসৃপ-স্তন্যপায়ী), পেরিপ্যাটাস (অ্যানিলিডা-আর্থ্রোপোডা) ও লাংফিশ Protopterus (মাছ-উভচর)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'evolution',
      term: 'হার্ডি-ওয়াইনবার্গ সাম্যাবস্থা (p + q = ১; p² + 2pq + q² = ১) ও ৫ শর্ত',
      fact: 'বৃহৎ পপুলেশন, অবাধ যৌনমিলন এবং কোনো মিউটেশন, জিন প্রবাহ (অভিবাসন), জিনগত অপসারণ (Genetic drift) ও প্রাকৃতিক নির্বাচন না থাকলে অ্যালিল ফ্রিকোয়েন্সি যুগ যুগ ধরে স্থির থাকে',
      pearl: 'শিল্পোন্নত ইংল্যান্ডে সাদা বনাম কালো পেপার্ড মথের (Biston betularia) সংখ্যা পরিবর্তন নির্দেশক (Directional) প্রাকৃতিক নির্বাচনের ক্লাসিক প্রমাণ',
      diff: 'medical',
    },

    // --- Chapter 12: Animal Behavior (High-Priority Deep Expansion!) ---
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'taxes_reflex',
      term: 'ফটোট্যাক্সিস (আলোক), কেমোট্যাক্সিস (রাসায়নিক) ও থার্মোট্যাক্সিস (তাপ)',
      fact: 'আলো বা রাসায়নিক/তাপ উদ্দীপকের উৎসের দিকে (ধনাত্মক) বা বিপরীত দিকে (ঋণাত্মক) সমগ্র প্রাণীর দিকনির্ভর সক্রিয় চলন হলো ট্যাক্সিস',
      pearl: 'Euglena ও মথের আলোর দিকে উড়ে যাওয়া ধনাত্মক ফটোট্যাক্সিস; আরশোলা ও কেঁচোর আলো থেকে লুকানো ঋণাত্মক ফটোট্যাক্সিস; মশার CO₂/ল্যাকটিক অ্যাসিডে এগোনো ধনাত্মক কেমোট্যাক্সিস',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'taxes_reflex',
      term: 'জিওট্যাক্সিস, রিওট্যাক্সিস, অ্যানিমোট্যাক্সিস, হাইগ্রোট্যাক্সিস ও গ্যালভানোট্যাক্সিস',
      fact: 'অভিকর্ষে জিওট্যাক্সিস, পানির স্রোতের বিপরীতে মাছের চলা রিওট্যাক্সিস, বায়ুপ্রবাহের দিক অনুযায়ী পোকামাকড়ের ওড়া অ্যানিমোট্যাক্সিস, আর্দ্রতায় হাইগ্রোট্যাক্সিস ও তড়িৎপ্রবাহে গ্যালভানোট্যাক্সিস',
      pearl: 'ম্যাগট লার্ভা ঋণাত্মক ফটোট্যাক্সিস দেখালে মাছে ধনাত্মক রিওট্যাক্সিস নদীর উজানে স্রোত ভেঙে এগোতে ও ডিম পাড়তে সাহায্য করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'taxes_reflex',
      term: 'কাইনেসিস (Kinesis) বনাম ট্যাক্সিস (Taxis)',
      fact: 'উদ্দীপকের দিকনির্ভর নয় বরং তীব্রতার ওপর নির্ভর করে প্রাণীর অনির্দেশ্য গতিবেগ (অর্থোকাইনেসিস) বা দিক-পরিবর্তন হার (ক্লিনোকাইনেসিস) পাল্টানো হলো কাইনেসিস',
      pearl: 'কাঠের উকুন (Woodlouse) শুষ্ক স্থানে দ্রুত ও এলোমেলো ঘুরে আর্দ্র স্থানে পৌঁছে স্থির হয়ে যাওয়া হলো কাইনেসিসের শ্রেষ্ঠ উদাহরণ',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'taxes_reflex',
      term: 'প্রতিবর্তী ক্রিয়া (Reflex Action) ও প্রতিবর্তী চাপের ৫টি উপাদান',
      fact: 'মস্তিষ্কের চিন্তা ছাড়াই সুষুম্নাকাণ্ডের মাধ্যমে তাৎক্ষণিক স্বয়ংক্রিয় সাড়া: গ্রাহক (Receptor) → সংবেদী নিউরন → কেন্দ্রীয় ইন্টারনিউরন → চেষ্টীয় নিউরন → কারক (Effector)',
      pearl: 'সদ্যোজাত শিশুর মাতৃদুগ্ধ চোষা ও হাত গরম বস্তু থেকে টেনে নেওয়া হলো সহজাত (Unconditioned) প্রতিবর্ত ক্রিয়া',
      diff: 'board',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'instinct',
      term: 'সহজাত আচরণ (Instinct / Fixed Action Pattern — FAP) ও রিলিজার',
      fact: 'জিনগতভাবে নির্ধারিত, কোনো পূর্ব-অভিজ্ঞতা বা শিক্ষা ছাড়াই প্রজাতির সব সদস্যের মধ্যে একই ধাঁচে সম্পন্ন হওয়া অপরিবর্তনীয় আচরণ (যাকে সাইন স্টিমুলাস বা রিলিজার চালু করে)',
      pearl: 'টিনবার্জেনের তিন-কাঁটা স্টিকলব্যাক মাছের লাল-পেট প্রতিদ্বন্দ্বী আক্রমণ, গ্রেল্যাগ হংসের ডিম গড়িয়ে বাসায় আনা ও বাবুই পাখির জটিল বাসা বোনা হলো ক্লাসিক FAP',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'instinct',
      term: 'মাইগ্রেশন (অভিযান): পাখি, মনার্ক প্রজাপতি ও স্যামন/ইলিশ মাছ',
      fact: 'ঋতু পরিবর্তন, খাদ্য বা প্রজননের তাগিদে সূর্য-তারা-চৌম্বক ক্ষেত্র ও ঘ্রাণ-স্মৃতি ব্যবহার করে দীর্ঘ পথে ভ্রমণ এবং মৌসুম শেষে ফিরে আসা',
      pearl: 'আর্কটিক টার্ন বছরে ~৭০,০০০ কিমি উড়ে রেকর্ড করে; স্যামন (Anadromous) সমুদ্র থেকে ঘ্রাণে জন্ম-নদীতে ফেরে ও ঈল (Catadromous) নদী থেকে সারগাসো সাগরে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'instinct',
      term: 'মাকড়সার জাল বোনা ও অপত্য যত্ন (Parental Care)',
      fact: 'জন্মগতভাবে মাকড়সার স্পিনারেট গ্রন্থি থেকে রেশম সুতায় জ্যামিতিক জাল বোনা এবং তেলাপিয়া/গ্যাস্টেরোস্টিয়াস মাছে ডিম ও পোনা মুখে বা বাসায় নিয়ে পাহারা দেওয়া',
      pearl: 'প্রতিরক্ষা ও সন্তানের বেঁচে থাকার হার বাড়াতে প্রজাতির জিনগত সহজাত প্রবৃত্তি হিসেবে এটি বিবর্তিত হয়েছে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'অভ্যস্ততা বা হ্যাবিচুয়েশন (Habituation — সরলতম শিখন)',
      fact: 'বারবার একই নির্দোষ বা গুরুত্বহীন উদ্দীপকের সম্মুখীন হওয়ার পর প্রাণীর সহজাত প্রতিক্রিয়া ধীরে ধীরে কমে গিয়ে সাড়া দেওয়া সম্পূর্ণ বন্ধ করে দেওয়া',
      pearl: 'খেতের কাকতাড়ুয়াকে প্রথম দিকে ভয় পেলেও কিছুদিন পর কাক ও পাখির তার ওপর বসে থাকা এবং ঝাঁকি দিলেও শামুকের শুঁড় ভেতরে না নেওয়া',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'ইমপ্রিন্টিং (Imprinting — কনরাড লরেঞ্জ ১৯৩৫)',
      fact: 'জীবনের অত্যন্ত সংক্ষিপ্ত ও সংবেদনশীল ক্রিটিক্যাল পিরিয়ডে (জন্মের পর কয়েক ঘণ্টার মধ্যে) সদ্যোজাত শাবকের প্রথম দেখা চলমান বস্তুকে মা হিসেবে স্থায়ীভাবে চিনে অনুসরণ করা',
      pearl: 'অস্ট্রিয়ান প্রাণিবিজ্ঞানী কনরাড লরেঞ্জ হাঁসের বাচ্চাদের ওপর এই পরীক্ষা চালিয়ে নিগো থার্স্টেন/টিনবার্জেন ও ভন ফ্রিশের সাথে ১৯৭৩ সালে নোবেল পুরস্কার লাভ করেন',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'আইভান পাভলভের ক্লাসিক্যাল কন্ডিশনিং (সাপেক্ষ প্রতিবর্তী ক্রিয়া — ১৯০৪)',
      fact: 'নিরপেক্ষ উদ্দীপক (ঘণ্টার ধ্বনি — CS) বারবার স্বাভাবিক উদ্দীপকের (মাংস — UCS) সাথে যুক্ত করে পরিবেশন করায় কেবল ঘণ্টার শব্দেই কুকুরের লালাক্ষরণ (CR) শেখানো',
      pearl: 'দুটি সংযুক্ত উদ্দীপকের মধ্যে স্নায়বিক সংযোগ স্থাপিত হওয়াকে অ্যাসোসিয়েটিভ লার্নিং বলে; বহুদিন মাংস না দিলে কন্ডিশনড সাড়া লুপ্ত (Extinction) হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'ট্রায়াল অ্যান্ড এরর / অপারেন্ট কন্ডিশনিং (থর্নডাইক ও বি.এফ. স্কিনার)',
      fact: 'নিজের আচরণের ফলাফলের (পুরস্কার বা শাস্তি — Reinforcement/Punishment) ভিত্তিতে কোনো জটিল গোলকধাঁধা বা পাজল বক্সের লিভার চাপতে শেখা',
      pearl: 'স্কিনারের ইঁদুর লিভার চেপে খাবার পাওয়ার পর আচরণের হার বহুগুণ বেড়ে যাওয়া এর চিরায়ত প্রমাণ',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'অন্তর্দৃষ্টিমূলক শিখন বা ইনসাইট লার্নিং (ভলফগ্যাং কোহলার — শিম্পাঞ্জি সুলতান)',
      fact: 'কোনো ট্রায়াল অ্যান্ড এরর ছাড়াই অতীত অভিজ্ঞতা ও মানসিক যুক্তি ব্যবহার করে হঠাৎ সমস্যার সমাধান খুঁজে পাওয়া (যেমন কাঠের বাক্স সাজিয়ে বা দুটি লাঠি জুড়ে ঝুলন্ত কলা পাড়া)',
      pearl: 'এটি প্রাণীজগতের সর্বোচ্চ স্তরের বৌদ্ধিক শিখন যা শিম্পাঞ্জি, মানুষ, ডলফিন ও দাঁড়কাকে দেখা যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'মৌমাছির সামাজিক সংগঠন: হ্যাপ্লোডিপ্লয়েডি (রাণি-কর্মী 2n বনাম ড্রোন n)',
      fact: 'অনিষিক্ত ডিম্বাণু থেকে পার্থেনোজেনেসিসে হ্যাপ্লয়েড পুরুষ ড্রোন (n = ১৬), নিষিক্ত ডিম্বাণু থেকে ডিপ্লয়েড (2n = ৩২) বন্ধ্যা স্ত্রী কর্মী এবং রয়্যাল জেলি খেয়ে প্রজননক্ষম রাণি হয়',
      pearl: 'মৌচাকের প্রহরা, মকরন্দ সংগ্রহ, মৌ-মোম তৈরি ও বাচ্চার লালনপালন সবই বন্ধ্যা স্ত্রী কর্মী মৌমাছিরা সম্পন্ন করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'মৌমাছির যোগাযোগ ভাষা: বৃত্তাকার নৃত্য বনাম ওয়াগল নৃত্য (কার্ল ভন ফ্রিশ)',
      fact: 'খাদ্যের উৎস মৌচাকের খুব কাছে (< ৫০–১০০ মিটার) হলে বৃত্তাকার নৃত্য (Round dance — কেবল ঘ্রাণ ও নৈকট্য); আর দূরে (> ১০০ মিটার) হলে ইংরেজি ৮-আকৃতির ওয়াগল নৃত্য (Waggle dance)',
      pearl: 'ওয়াগল নৃত্যের সরলরৈখিক দৌড়ের অভিকর্ষ-কোণ সূর্যের সাপেক্ষে দিক ও দুলুনির সংখ্যা দূরত্ব নির্ভুলভাবে জানিয়ে দেয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'অ্যালট্রুইজম (Altruism বা পরোপকারিতা) ও কিন সিলেকশন (W.D. Hamilton)',
      fact: 'নিজের জীবন বা প্রজনন সুযোগের ঝুঁকি নিয়েও একই পরিবারের বা কলোনির আত্মীয়দের বাঁচানোর আচরণ (যেমন বেল্ডিংস গ্রাউন্ড স্কুইরেলের সতর্ক ডাক বা কর্মী মৌমাছির হুল ফুটিয়ে আত্মাহুতি)',
      pearl: 'হ্যামিল্টনের নিয়ম (rB > C) অনুসারে রক্তের সম্পর্কযুক্ত আত্মীয়দের মাধ্যমে নিজের সমধর্মী জিনের অন্তর্ভুক্তিমূলক যোগ্যতা (Inclusive fitness) বৃদ্ধি পায় বলেই অ্যালট্রুইজম টিকে আছে',
      diff: 'medical',
    },
  ];

  // Add 14 more Ch 11 & Ch 12 items = 41 rows × 4 = 164 + ~300 quantitative & conceptual drills = ~464 unique MCQs!
  const extraR: Bio2RRaw[] = [
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'evolution',
      term: 'আধুনিক মানুষের বিবর্তন ক্রম ও নিআন্ডারথাল বনাম ক্রো-ম্যাগনন',
      fact: 'অস্ট্রালোপিথেকাস (~৪০০–৫০০ cc) → হোমো হ্যাবিলিস (হ্যান্ডিম্যান, ~৭০০ cc) → হোমো ইরেক্টাস (~৯০০ cc, আগুনের ব্যবহার) → নিআন্ডারথাল (~১৪৫০ cc, মৃতদেহ কবর) → হোমো স্যাপিয়েন্স (~১৩৫০–১৪০০ cc)',
      pearl: 'প্রথম সত্যিকারের আধুনিক মানুষের জীবাশ্ম ক্রো-ম্যাগনন মানুষ (আধুনিক হোমো স্যাপিয়েন্স) গুহাচিত্র ও সূক্ষ্ম যন্ত্রের জন্য বিখ্যাত',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'evolution',
      term: 'অ্যাটাভিজম (Atavism) ও ভ্রূণতাত্ত্বিক প্রমাণ (বায়োজেনেটিক সূত্র — হেকেল)',
      fact: 'ভ্রূণাবস্থার পুরোনো পূর্বপুরুষের কোনো লুপ্ত বৈশিষ্ট্য হঠাৎ বংশধরে ফিরে আসা হলো অ্যাটাভিজম (মানব শিশুতে ছোট লেজ বা ঘন লোম); আর আর্নস্ট হেকেলের "অন্টোজেনি রিক্যাপিচুলেটস ফাইলোজেনি"',
      pearl: 'সকল মেরুদণ্ডী ভ্রূণেই প্রারম্ভিক পর্যায়ে গলবিলীয় ফুলকা খাঁজ ও নটোকর্ড দেখা যাওয়া তাদের অভিন্ন পূর্বপুরুষের সাক্ষ্য দেয়',
      diff: 'board',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'sex_linked',
      term: 'অটোসোমাল বনাম সেক্স-ক্রোমোজোমাল অস্বাভাবিকতা (সিনড্রোম)',
      fact: 'ডাউন সিনড্রোম (৪৭, ২১-নং ট্রাইসোমি — মঙ্গলয়েড মুখ ও মানসিক প্রতিবন্ধিতা); ক্লাইনফেল্টার (৪৭, XXY — বন্ধ্যা পুরুষ, গাইনেকোমাস্টিয়া); টার্নার (৪৫, XO — বন্ধ্যা খর্বাকৃতি নারী, ওয়েবড ঘাড়)',
      pearl: 'বয়স্ক মায়েদের ডিম্বাণু গঠনে মায়োসিস-১ নন-ডিসজাংশনের কারণে ডাউন সিনড্রোমের ঝুঁকি উল্লেখযোগ্যভাবে বেড়ে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'mendelian',
      term: 'বহু-অ্যালিল (Multiple Alleles) ও বম্বে ফেনোটাইপ (hh জিনোটাইপ)',
      fact: 'একই জিন লোকাসে পপুলেশনের মধ্যে ২টির বেশি (যেমন ABO রক্তের ৩টি অ্যালিল Iᴬ, Iᴮ, i; বা খরগোশের লোমের ৪টি অ্যালিল) বিকল্প রূপ থাকা; H-জিন হোমোজাইগাস প্রচ্ছন্ন hh হলে Iᴬ/Iᴮ থেকেও O-এর মতো আচরণ করে',
      pearl: 'বহু-অ্যালিল থেকে সম্ভব ডিপ্লয়েড জিনোটাইপ সংখ্যা = n(n + 1)/2 সূত্র দিয়ে বের করা হয় (৩ অ্যালিলে ৬টি জিনোটাইপ)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'প্রাণী আচরণবিদ্যা (ইথোলজি — Ethology) ও তিন নোবেলজয়ী পথিকৃৎ',
      fact: 'কনরাড লরেঞ্জ (ইমপ্রিন্টিং), নিকো টিনবার্জেন (সাইন স্টিমুলাস ও FAP) ও কার্ল ভন ফ্রিশ (মৌমাছির নৃত্য) প্রাকৃতিক পরিবেশে প্রাণী আচরণ গবেষণার আধুনিক বিজ্ঞানী',
      pearl: 'প্রাকৃতিক আচরণ ব্যাখ্যায় টিনবার্জেন ৪টি প্রশ্ন (কার্যকারণ, বিকাশ, অভিযোজনমূলক মূল্য ও বিবর্তন) নির্ধারণ করেন',
      diff: 'board',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'learning_social',
      term: 'আঞ্চলিকতা (Territoriality), ফেরোমন ও কুকুর-পাখির ছদ্মবেশ (Camouflage)',
      fact: 'খাদ্য, সঙ্গী ও নিরাপদ আশ্রয়ের জন্য নির্দিষ্ট ভৌগোলিক এলাকা চিহ্নিত (মূত্র/ফেরোমন বা গান দিয়ে) ও রক্ষা করা; আর পরিবেশের সাথে মিশে থাকা ক্রিপটিক বর্ণ হলো ক্যামোফ্লেজ',
      pearl: 'অন্যদিকে বিষাক্ত বা ভয়ংকর প্রাণীর অনুকরণ করে শিকারি এড়ানো হলো বেটসিয়ান মিমিক্রি (Batesian mimicry — যেমন ভাইসরয় প্রজাপতি কর্তৃক মনার্কের অনুকরণ)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'instinct',
      term: 'জৈবিক ঘড়ি (Circadian Rhythm) ও সুপ্রাকায়াজম্যাটিক নিউক্লিয়াস (SCN)',
      fact: 'হাইপোথ্যালামাসের অভ্যন্তরীণ SCN প্রায় ২৪ ঘণ্টার প্রাকৃতিক ছন্দে (ঘুম-জাগরণ, দেহ-তাপ, কর্টিসল-মেলাটোনিন) প্রাণী দেহ পরিচালনা করে এবং পাইনাল গ্রন্থিতে সংকেত পাঠায়',
      pearl: 'ঋতুভেদে দিনের দৈর্ঘ্য (ফটোপিরিয়ড) অনুসারে পাখির পরিযায়ন ও স্তন্যপায়ীর প্রজনন চক্রও এই জৈবিক ঘড়ির নিয়ন্ত্রণে ঘটে',
      diff: 'medical',
    },
  ];

  const allRRows = [...rows, ...extraR];
  allRRows.forEach((r, idx) => {
    const sameCat = allRRows.filter((x) => x.cat === r.cat && x.term !== r.term);
    const pool = sameCat.length >= 3 ? sameCat : allRRows.filter((x) => x.term !== r.term);
    const pick = <T,>(getter: (x: Bio2RRaw) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: r.diff ?? 'medical',
        question: `জিনতত্ত্ব, বিবর্তন ও প্রাণী আচরণে "${r.fact}" — এটি কোনটির সুনির্দিষ্ট পরিচয়?`,
        correct: r.term,
        distractors: pick((x) => x.term, 1),
        explanation: `${r.term}: ${r.fact}। (${r.pearl})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ ও ১২ · গাজী আজমল স্যার',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `"${r.term}" সম্পর্কিত মূল বৈজ্ঞানিক সূত্র বা আচরণগত ব্যাখ্যা কোনটি?`,
        correct: r.fact,
        distractors: pick((x) => x.fact, 2),
        explanation: `${r.term}: ${r.fact}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ ও ১২ · বোর্ড প্রস্তুতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `বিশেষ দৃষ্টান্ত/পরীক্ষা-তথ্য: "${r.pearl}" — এটি কোন বিষয়ের সাথে সরাসরি যুক্ত?`,
        correct: r.term,
        distractors: pick((x) => x.term, 3),
        explanation: `${r.pearl} হলো "${r.term}" (${r.fact})-এর মূল প্রমাণ/উদাহরণ।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ ও ১২ · মেডিকেল অ্যাডমিশন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${r.term}" প্রসঙ্গে নিচের কোন দৃষ্টান্ত বা তাৎপর্যটি সঠিক?`,
        correct: r.pearl,
        distractors: pick((x) => x.pearl, 4),
        explanation: `${r.term}: ${r.pearl}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ ও ১২ · ডেন্টাল রিভিশন',
      })
    );
  });

  // 2. High-Yield Quantitative Genetics (Hardy-Weinberg, Sex-Linked, Blood Type, Non-Mendelian Ratios) + Behavior Cases (300+ MCQs!)
  // 2A. Hardy-Weinberg Allele & Genotype Frequencies (p + q = 1, p² + 2pq + q² = 1) (15 × 3 = 45 MCQs)
  const hwCases = [
    { qVal: 0.1, pop: 10000 },
    { qVal: 0.2, pop: 5000 },
    { qVal: 0.3, pop: 10000 },
    { qVal: 0.4, pop: 2000 },
    { qVal: 0.5, pop: 4000 },
    { qVal: 0.05, pop: 20000 },
    { qVal: 0.15, pop: 10000 },
    { qVal: 0.25, pop: 8000 },
    { qVal: 0.02, pop: 50000 },
    { qVal: 0.04, pop: 25000 },
    { qVal: 0.08, pop: 10000 },
    { qVal: 0.12, pop: 10000 },
  ];
  hwCases.forEach((hw, i) => {
    const pVal = Number((1 - hw.qVal).toFixed(2));
    const q2 = Number((hw.qVal * hw.qVal).toFixed(4));
    const het2pq = Number((2 * pVal * hw.qVal).toFixed(4));
    const carrierPct = Number((het2pq * 100).toFixed(2));
    const affectedCount = Math.round(q2 * hw.pop);
    const carrierCount = Math.round(het2pq * hw.pop);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `হার্ডি-ওয়াইনবার্গ সাম্যাবস্থায় থাকা ${toBnDigits(hw.pop.toLocaleString('en-US'))} জনসংখ্যার একটি পপুলেশনে প্রচ্ছন্ন (aa) অ্যালিলের ফ্রিকোয়েন্সি q = ${toBnDigits(hw.qVal)} হলে প্রকট অ্যালিল p-এর মান এবং হেটারোজাইগাস বাহকের (2pq) শতকরা হার কত হবে?`,
        correct: `p = ${toBnDigits(pVal)} ও বাহক ${toBnDigits(carrierPct)}%`,
        distractors: [
          `p = ${toBnDigits(hw.qVal)} ও বাহক ${toBnDigits(Number((q2 * 100).toFixed(2)))}%`,
          `p = ${toBnDigits(pVal)} ও বাহক ${toBnDigits(Number((pVal * hw.qVal * 100).toFixed(2)))}%`,
          `p = ${toBnDigits(Number((pVal * pVal).toFixed(2)))} ও বাহক ${toBnDigits(carrierPct)}%`,
        ],
        explanation: `p + q = ১ ⇒ p = ১ − ${toBnDigits(hw.qVal)} = ${toBnDigits(pVal)}। আর হেটারোজাইগাস বাহক (2pq) = ২ × ${toBnDigits(pVal)} × ${toBnDigits(hw.qVal)} = ${toBnDigits(het2pq)} = ${toBnDigits(carrierPct)}%।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · হার্ডি-ওয়াইনবার্গ অ্যালিল গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি ${toBnDigits(hw.pop.toLocaleString('en-US'))} মানুষের জনগোষ্ঠীতে একটি অটোসোমাল প্রচ্ছন্ন জিনগত রোগে আক্রান্ত ব্যক্তির (q²) সংখ্যা ${toBnDigits(affectedCount.toLocaleString('en-US'))} জন হলে হার্ডি-ওয়াইনবার্গ সূত্রানুযায়ী ওই জনগোষ্ঠীতে সুস্থ হেটারোজাইগাস বাহকের (Aa) সম্ভাব্য সংখ্যা কতজন?`,
        correct: `প্রায় ${toBnDigits(carrierCount.toLocaleString('en-US'))} জন`,
        distractors: [
          `প্রায় ${toBnDigits(affectedCount.toLocaleString('en-US'))} জন`,
          `প্রায় ${toBnDigits((carrierCount / 2).toLocaleString('en-US'))} জন`,
          `প্রায় ${toBnDigits(Math.round(pVal * hw.pop).toLocaleString('en-US'))} জন`,
        ],
        explanation: `q² = ${toBnDigits(affectedCount)}/${toBnDigits(hw.pop)} = ${toBnDigits(q2)} ⇒ q = ${toBnDigits(hw.qVal)}, p = ${toBnDigits(pVal)}। বাহক = 2pq × N = ${toBnDigits(het2pq)} × ${toBnDigits(hw.pop)} = ${toBnDigits(carrierCount)} জন।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · বাহক সংখ্যা নির্ণয়',
      })
    );
  });

  // 2B. Sex-Linked Inheritance (Colorblindness & Hemophilia) Cross Matrix (12 scenarios × 2 = 24 MCQs)
  const sexCrosses = [
    { parents: 'স্বাভাবিক পুরুষ (XᴴY) × হিমোফিলিক বাহক নারী (XᴴXʰ)', sons: '৫০% সুস্থ, ৫০% হিমোফিলিক', daughters: '৫০% সুস্থ, ৫০% বাহক (সবাই রোগমুক্ত)' },
    { parents: 'হিমোফিলিক পুরুষ (XʰY) × স্বাভাবিক নারী (XᴴXᴴ)', sons: '১০০% সুস্থ স্বাভাবিক', daughters: '১০০% হিমোফিলিক বাহক' },
    { parents: 'হিমোফিলিক পুরুষ (XʰY) × বাহক নারী (XᴴXʰ)', sons: '৫০% সুস্থ, ৫০% হিমোফিলিক', daughters: '৫০% বাহক, ৫০% হিমোফিলিক' },
    { parents: 'বর্ণান্ধ পুরুষ (XᶜY) × বর্ণান্ধ নারী (XᶜXᶜ)', sons: '১০০% বর্ণান্ধ', daughters: '১০০% বর্ণান্ধ' },
    { parents: 'স্বাভাবিক পুরুষ (Xᶜ⁺Y) × বর্ণান্ধ নারী (XᶜXᶜ)', sons: '১০০% বর্ণান্ধ (মায়ের Xᶜ পাওয়ায়)', daughters: '১০০% বাহক (বাবার স্বাভাবিক Xᶜ⁺ পাওয়ায়)' },
    { parents: 'বর্ণান্ধ পুরুষ (XᶜY) × স্বাভাবিক নারী (Xᶜ⁺Xᶜ⁺)', sons: '১০০% স্বাভাবিক', daughters: '১০০% বাহক' },
    { parents: 'স্বাভাবিক পুরুষ (Xᶜ⁺Y) × বর্ণান্ধ বাহক নারী (Xᶜ⁺Xᶜ)', sons: '৫০% স্বাভাবিক, ৫০% বর্ণান্ধ', daughters: '৫০% স্বাভাবিক, ৫০% বাহক' },
    { parents: 'বর্ণান্ধ পুরুষ (XᶜY) × বর্ণান্ধ বাহক নারী (Xᶜ⁺Xᶜ)', sons: '৫০% স্বাভাবিক, ৫০% বর্ণান্ধ', daughters: '৫০% বাহক, ৫০% বর্ণান্ধ' },
  ];
  sexCrosses.forEach((sc, idx) => {
    const others = sexCrosses.filter((x) => x.parents !== sc.parents);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `সেক্স-লিঙ্কড বংশগতিতে "${sc.parents}"-এর মধ্যে বিবাহ হলে তাদের সম্ভাব্য পুত্র ও কন্যা সন্তানদের ফলাফল কী হবে?`,
        correct: `পুত্র: ${sc.sons} · কন্যা: ${sc.daughters}`,
        distractors: others.slice(0, 4).map((x) => `পুত্র: ${x.sons} · কন্যা: ${x.daughters}`),
        explanation: `পিতার Y-ক্রোমোজোমে কোনো X-লিঙ্কড জিন নেই; পুত্ররা X-ক্রোমোজোম পায় কেবল মায়ের কাছ থেকে এবং কন্যারা উভয় পিতামাতার কাছ থেকে। তাই: পুত্র ${sc.sons} এবং কন্যা ${sc.daughters}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · সেক্স-লিঙ্কড ক্রস চার্ট',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'board',
        question: `যদি কোনো দম্পতির সন্তানদের মধ্যে "${sc.sons} এবং কন্যা সন্তানে ${sc.daughters}" দেখা যায়, তবে পিতা-মাতার জিনোটাইপ কী ছিল?`,
        correct: sc.parents,
        distractors: others.slice(1, 5).map((x) => x.parents),
        explanation: `চেকারবোর্ড বিশ্লেষণে একমাত্র ${sc.parents} থেকেই পুত্র ${sc.sons} ও কন্যা ${sc.daughters} পাওয়া যায়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · পেডিগ্রি বিশ্লেষণ',
      })
    );
  });

  // 2C. ABO Paternity / Child Genotype Probability Drills (10 × 2 = 20 MCQs)
  const aboCrosses = [
    { p: 'পিতা Iᴬi (A) × মাতা Iᴮi (B)', kids: 'চারটি গ্রুপেরই (A, B, AB, O) প্রতিটির ২৫% করে সম্ভাবনা' },
    { p: 'পিতা IᴬIᴬ (A) × মাতা IᴮIᴮ (B)', kids: 'সকল (১০০%) সন্তানই কেবল AB (IᴬIᴮ) গ্রুপের হবে' },
    { p: 'পিতা IᴬIᴮ (AB) × মাতা ii (O)', kids: 'সন্তানরা ৫০% A ও ৫০% B গ্রুপ হবে — কখনোই O বা AB নয়' },
    { p: 'পিতা IᴬIᴮ (AB) × মাতা IᴬIᴮ (AB)', kids: '২৫% A, ৫০% AB এবং ২৫% B — কখনোই O গ্রুপ হবে না' },
    { p: 'পিতা ii (O) × মাতা ii (O)', kids: 'সকল (১০০%) সন্তানই কেবল O (ii) গ্রুপের হবে' },
    { p: 'পিতা Iᴬi (A) × মাতা ii (O)', kids: '৫০% A ও ৫০% O গ্রুপের সন্তান' },
    { p: 'পিতা Iᴮi (B) × মাতা ii (O)', kids: '৫০% B ও ৫০% O গ্রুপের সন্তান' },
    { p: 'পিতা IᴬIᴮ (AB) × মাতা Iᴬi (A)', kids: '৫০% A, ২৫% AB ও ২৫% B (কখনো O নয়)' },
  ];
  aboCrosses.forEach((ac, idx) => {
    const others = aboCrosses.filter((x) => x.p !== ac.p);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `রক্তের গ্রুপ বংশগতিতে "${ac.p}" দম্পতির সন্তানদের সম্ভাব্য ABO রক্তগ্রুপ বণ্টন কেমন হবে?`,
        correct: ac.kids,
        distractors: others.slice(0, 4).map((x) => x.kids),
        explanation: `${ac.p} ক্রসের গ্যামেট মিলনে ফলাফল হলো: ${ac.kids}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ABO রক্তের গ্রুপ বংশগতি',
      })
    );
  });

  // 2D. All Mendelian & Non-Mendelian Ratios Quick Identifier (12 × 2 = 24 MCQs)
  const ratios = [
    { r: '৩ : ১', topic: 'মেন্ডেলের ১ম সূত্র (পৃথকীকরণ) মনোহাইব্রিড F₂ ফিনোটাইপ' },
    { r: '৯ : ৩ : ৩ : ১', topic: 'মেন্ডেলের ২য় সূত্র (স্বাধীনভাবে বিন্যাস) ডাইহাইব্রিড F₂ ফিনোটাইপ' },
    { r: '১ : ২ : ১', topic: 'অসম্পূর্ণ প্রকটতা (Mirabilis jalapa) বা সহ-প্রকটতার F₂ ফিনোটাইপ' },
    { r: '২ : ১', topic: 'লিথাল বা মারণ জিন (হলুদ ইঁদুর/ক্রিপার মুরগি) F₂ জীবিত অনুপাত' },
    { r: '৯ : ৭', topic: 'পরিপূরক জিন (মিষ্টি মটরের বেগুনি : সাদা ফুল) F₂ অনুপাত' },
    { r: '১৩ : ৩', topic: 'প্রকট এপিস্ট্যাটিক বাধা (সাদা লেগহর্ন মুরগির পালকের বর্ণ) F₂ অনুপাত' },
    { r: '১২ : ৩ : ১', topic: 'প্রকট এপিস্ট্যাসিস (সামার স্কোয়াশের সাদা-হলুদ-সবুজ বর্ণ)' },
    { r: '৯ : ৩ : ৪', topic: 'প্রচ্ছন্ন এপিস্ট্যাসিস (ইঁদুরের লোমের অগৌতি-কালো-অ্যালবিনো)' },
    { r: '১৫ : ১', topic: 'দ্বৈত প্রকট বা ডুপ্লিকেট জিন (শেফার্ডস পার্সের বীজ ক্যাপসুল)' },
    { r: '১ : ৬ : ১৫ : ২০ : ১৫ : ৬ : ১', topic: '৩ জোড়া পলিজিনের (মানুষের গায়ের বর্ণ) F₂ বণ্টন অনুপাত' },
  ];
  ratios.forEach((rt, idx) => {
    const others = ratios.filter((x) => x.r !== rt.r);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `মেন্ডেলীয় ও নন-মেন্ডেলীয় বংশগতিতে F₂ প্রজন্মের "${rt.r}" ফিনোটাইপিক অনুপাতটি নিচের কোন ঘটনার পরিচয় বহন করে?`,
        correct: rt.topic,
        distractors: others.slice(0, 4).map((x) => x.topic),
        explanation: `${rt.r} অনুপাত পাওয়া যায়: ${rt.topic}-এ।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · জেনেটিক অনুপাত ছক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${rt.topic}"-এর আদর্শ F₂ ফিনোটাইপিক অনুপাত কত?`,
        correct: rt.r,
        distractors: others.slice(1, 5).map((x) => x.r),
        explanation: `${rt.topic}-এ F₂ ফিনোটাইপিক অনুপাত হলো ${rt.r}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · মেন্ডেলের ব্যতিক্রম',
      })
    );
  });

  // 2E. Animal Behavior (Ch 12) Real-Life Scenarios & Taxis Type Matching (25 × 3 = 75 MCQs)
  const behaviorScenarios = [
    { scenario: 'রাতের অন্ধকারে বৈদ্যুতিক বাল্বের দিকে পতঙ্গের ছুটে আসা ও পোড়া', type: 'ধনাত্মক ফটোট্যাক্সিস', group: 'ট্যাক্সিস (সহজাত দিকনির্ভর চলন)' },
    { scenario: 'দিনের আলোতে কেঁচো বা আরশোলার অন্ধকার গর্তে লুকিয়ে পড়া', type: 'ঋণাত্মক ফটোট্যাক্সিস', group: 'ট্যাক্সিস (সহজাত দিকনির্ভর চলন)' },
    { scenario: 'নদীর স্রোতের বিপরীতে ইলিশ বা স্যামন মাছের উজানে সাঁতার কাটা', type: 'ধনাত্মক রিওট্যাক্সিস', group: 'ট্যাক্সিস (সহজাত দিকনির্ভর চলন)' },
    { scenario: 'ফার্নের শুক্রাণুর ম্যালিক অ্যাসিডের আকর্ষণে আর্কিগোনিয়ামের দিকে ও স্ত্রী মশার ঘামের ল্যাকটিক অ্যাসিডে ছুটে আসা', type: 'ধনাত্মক কেমোট্যাক্সিস', group: 'ট্যাক্সিস (সহজাত দিকনির্ভর চলন)' },
    { scenario: 'উদ্ভিজ্জ কেঁচোর ভেজা মাটির গভীরে যাওয়া ও মরু প্রাণীর জলের উৎসের দিকে ধাবিত হওয়া', type: 'ধনাত্মক হাইগ্রোট্যাক্সিস', group: 'ট্যাক্সিস (সহজাত দিকনির্ভর চলন)' },
    { scenario: 'মাছ ও সোনালি পাখির শীত এড়িয়ে হাজার মাইল পাড়ি দিয়ে গরম দেশে আসা', type: 'মাইগ্রেশন বা অভিযান', group: 'সহজাত বাৎসরিক আচরণ' },
    { scenario: 'তিন-কাঁটা স্টিকলব্যাক পুরুষ মাছের যেকোনো লাল-পেট মডেল দেখে আক্রমণ করা', type: 'ফিক্সড অ্যাকশন প্যাটার্ন (FAP)', group: 'সাইন-স্টিমুলাস নির্ভর সহজাত আচরণ' },
    { scenario: 'নতুন তৈরি কাকতাড়ুয়াকে ভয় পাওয়া ছেড়ে কয়েক দিন পর পাখির নির্ভয়ে তার কাঁধে বসা', type: 'অভ্যস্ততা বা হ্যাবিচুয়েশন', group: 'অ-সংযোগমূলক সরলতম শিখন' },
    { scenario: 'ডিম ফুটে বেরোনোর পরপরই হাঁসের ছানার বিজ্ঞানী লরেঞ্জকে মা ভেবে পিছু নেওয়া', type: 'ইমপ্রিন্টিং (Imprinting)', group: 'সংবেদনশীল কালের স্থায়ী শিখন' },
    { scenario: 'খাবার ছাড়াও কেবল প্রতিদিনের ঘণ্টার ধ্বনিতে কুকুরের মুখে লালা ঝরা', type: 'ক্লাসিক্যাল বা সাপেক্ষ প্রতিবর্তী শিখন', group: 'সংযোগমূলক (Associative) শিখন' },
    { scenario: 'দুটি খাটো বাঁশের লাঠি জুড়ে ও বাক্স সাজিয়ে সুলতান শিম্পাঞ্জির ওপর থেকে কলা পেড়ে খাওয়া', type: 'অন্তর্দৃষ্টিমূলক শিখন (Insight learning)', group: 'উচ্চতর বুদ্ধিবৃত্তিক শিখন' },
    { scenario: 'খাবারের দূরত্ব ১০০ মিটারের বেশি হলে কর্মী মৌমাছির পেট দুলিয়ে ইংরেজি ৮-আকৃতির নাচ', type: 'ওয়াগল নৃত্য (Waggle dance)', group: 'সামাজিক যোগাযোগ আচরণ' },
    { scenario: 'মৌচাক রক্ষায় হুল ফোটানোর ফলে নিজের জীবন বিপন্ন জেনেও শত্রুকে তাড়া করা', type: 'অ্যালট্রুইজম (Altruism / কিন সিলেকশন)', group: 'সামাজিক আত্মত্যাগমূলক আচরণ' },
  ];
  behaviorScenarios.forEach((bs, idx) => {
    const others = behaviorScenarios.filter((x) => x.type !== bs.type);
    const pick = (s: number) => [0, 1, 2, 3].map((k) => others[(idx + s + k * 2) % others.length]);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch12_behavior',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `প্রাণী আচরণ পর্যবেক্ষণ: "${bs.scenario}" — এটি নিচের কোন নির্দিষ্ট আচরণগত শ্রেণির উদাহরণ?`,
        correct: bs.type,
        distractors: pick(1).map((x) => x.type),
        explanation: `"${bs.scenario}" হলো ${bs.type} (${bs.group})-এর চিরায়ত উদাহরণ।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২ · প্রাণীর আচরণ উদাহরণ ব্যাংক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch12_behavior',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${bs.type}"-এর প্রকৃত উদাহরণ নিচের কোনটি?`,
        correct: bs.scenario,
        distractors: pick(2).map((x) => x.scenario),
        explanation: `${bs.type} (${bs.group})-এর সঠিক বাস্তব উদাহরণ: ${bs.scenario}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২ · আচরণগত ম্যাচিং',
      })
    );
  });

  // 2F. Honeybee Ploidy & Waggle Angle / Evolutionary Geological Era Drills (25 MCQs)
  [
    { q: 'মৌমাছির (Apis mellifera) কলোনিতে রাণি (2n=32), কর্মী (2n=32) ও পুরুষ ড্রোন (n=16)-এর ক্রোমোজোম বিন্যাস কোনটি?', a: 'রাণি ও কর্মী ডিপ্লয়েড (৩২) এবং ড্রোন হ্যাপ্লয়েড (১৬, অনিষিক্ত ডিম্বাণু থেকে)', w: ['সবাই ডিপ্লয়েড ৩২টি', 'রাণি ও ড্রোন ৩২ এবং কর্মী ১৬টি', 'কর্মী ট্রিপ্লয়েড ৪৮ ও ড্রোন ১৬টি'] },
    { q: 'ওয়াগল নৃত্যের সরলরৈখিক দৌড়টি যদি মৌচাকের ফ্রেমে ঠিক সোজা উপরের দিকে (অভিকর্ষের বিপরীতে ০°) নির্দেশ করে, তবে খাদ্য কোথায় আছে?', a: 'ঠিক সূর্যের দিকেই (অর্থাৎ চাক থেকে সরাসরি সূর্য বরাবর)', w: ['সূর্যের ঠিক বিপরীত দিকে (১৮০°)', 'সূর্য থেকে ডানে ৯০° কোণে', 'মৌচাকের ৫০ মিটারের মধ্যেই (কোনো নির্দিষ্ট দিক নেই)'] },
    { q: 'ওয়াগল নৃত্যে সরলরৈখিক পথটি যদি উল্লম্ব রেখা থেকে ডানে ৪০° হেলে থাকে, তবে খাদ্যের উৎস কোন দিকে হবে?', a: 'সূর্য থেকে ডানে ৪০° কোণে', w: ['সূর্য থেকে বামে ৪০° কোণে', 'সূর্যের সরাসরি বিপরীতে ৪০° কোণে', 'খাদ্যের দূরত্ব মাত্র ৪০ মিটার'] },
    { q: 'ভৌত-রাসায়নিক বিবর্তনের আদিম পৃথিবীতে অক্সিজেনমুক্ত বিজারক পরিবেশে CH₄, NH₃, H₂ ও জলীয়বাষ্পে বৈদ্যুতিক স্ফুলিঙ্গ দিয়ে কে প্রথম অ্যামিনো অ্যাসিড (গ্লাইসিন-অ্যালানিন) তৈরি করেন?', a: 'স্ট্যানলি মিলার ও হ্যারল্ড উরে (১৯৫৩) — ওপারিন-হ্যালডেন তত্ত্বের প্রমাণ', w: ['চার্লস ডারউইন ও আলফ্রেড ওয়ালেস', 'লুই পাস্তুর ও ফ্রান্সিসকো রেডি', 'গ্রেগর মেন্ডেল ও মরগ্যান'] },
    { q: 'জীববিজ্ঞানে মহাযুগ (Era)-এর কোন ক্রমটি প্রাচীনতম থেকে আধুনিকতম সঠিক ক্রম?', a: 'প্রিক্যাম্ব্রিয়ান → প্যালিওজোয়িক (মাছ-উভচর) → মেসোজোয়িক (ডাইনোসর/সরীসৃপ) → সিনোজোয়িক (স্তন্যপায়ী ও মানুষ)', w: ['মেসোজোয়িক → প্যালিওজোয়িক → সিনোজোয়িক → প্রিক্যাম্ব্রিয়ান', 'সিনোজোয়িক → মেসোজোয়িক → প্যালিওজোয়িক → আর্কাইক', 'প্যালিওজোয়িক → সিনোজোয়িক → মেসোজোয়িক → প্রিক্যাম্ব্রিয়ান'] },
    { q: 'ঘোড়ার বিবর্তনের ধারাবাহিক জীবাশ্ম ক্রমে প্রাচীনতম ৫/৪-আঙুলযুক্ত ক্ষুদ্র পূর্বপুরুষ থেকে আধুনিক ১-আঙুল/খুরযুক্ত ঘোড়া কোনটি?', a: 'Eohippus (Hyracotherium) → Mesohippus → Merychippus → Pliohippus → Equus', w: ['Equus → Pliohippus → Merychippus → Eohippus', 'Mesohippus → Eohippus → Equus → Pliohippus', 'Archaeopteryx → Ichthyostega → Equus → Dryopithecus'] },
  ].forEach((qd) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: qd.q.includes('মৌ') || qd.q.includes('ওয়াগল') ? 'bio2_ch12_behavior' : 'bio2_ch11_genetics',
        visualLessonId: qd.q.includes('মৌ') || qd.q.includes('ওয়াগল') ? 'bohr_curve' : 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: qd.q,
        correct: qd.a,
        distractors: qd.w,
        explanation: `${qd.q} — সঠিক উত্তর: ${qd.a}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ ও ১২ · উচ্চতর বিশ্লেষণ',
      })
    );
  });

  return list;
}
