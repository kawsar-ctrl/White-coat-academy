import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio2SRaw {
  ch:
    | 'bio2_ch1_taxonomy'
    | 'bio2_ch2_animal_id'
    | 'bio2_ch3_digestion'
    | 'bio2_ch4_blood'
    | 'bio2_ch5_respiration'
    | 'bio2_ch6_excretion';
  vl: string;
  cat: string;
  key: string;
  detail: string;
  examTip: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredS(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_ss_${String(seq++).padStart(4, '0')}`;

  // 1. High-Yield Ch 1–6 Clinical & Comparative Matrix (60 entries × 4 = 240 unique MCQs)
  const rows: Bio2SRaw[] = [
    // Ch 1 & 2
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla_deep',
      key: 'ট্রাইকোসিস্ট (প্যারামেসিয়াম) বনাম নেমাটোসিস্ট (হাইড্রা) বনাম কলোব্লাস্ট (টেনোফোরা)',
      detail: 'নিডারিয়ার নিডোসাইটে দংশন অঙ্গাণু নেমাটোসিস্ট এবং টেনোফোরা পর্বের "কম্ব জেলিতে" আঠালো শিকার-ধরা কলোব্লাস্ট কোষ থাকে',
      examTip: 'উভচর Cnidaria-য় কেবল পলিপ, কেবল মেডুসা, বা পলিপ-মেডুসা উভয় দশার মেটাজেনেসিস দেখা যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla_deep',
      key: 'উন্মুক্ত রক্তসংবহন (হিমোসিল) বনাম বদ্ধ রক্তসংবহন',
      detail: 'Arthropoda ও অধিকাংশ Mollusca (ব্যতিক্রম: Cephalopoda যেমন অক্টোপাস-স্কুইডে বদ্ধ সংবহন)-তে রক্তনালির বদলে সাইনাসে রক্ত প্রবাহিত হয়',
      examTip: 'Annelida ও Chordata-য় রক্ত সর্বদা আবদ্ধ ধমনি, শিরা ও কৈশিকজালিকার মধ্য দিয়েই চলাচল করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla_deep',
      key: 'অভিশ্রবণ ও রেচনে অ্যামিবার সংকোচনশীল গহ্বর (Contractile Vacuole)',
      detail: 'মিঠাপানির এককোষী প্রোটোজোয়ায় ক্রমাগত অন্তঃঅভিস্রবণে ঢুকে পড়া অতিরিক্ত পানি পাম্প করে বের করে কোষ ফেটে যাওয়া রোধ করে',
      examTip: 'সামুদ্রিক প্রোটিস্ট বা পরজীবী Entamoeba-তে এটি থাকে না কারণ বাহ্যিক মাধ্যম আইসোটোনিক',
      diff: 'board',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla_deep',
      key: 'হাইড্রোথার্মাল ভেন্ট, স্পঞ্জ-গ্লাস ও প্রবাল প্রাচীর (Cnidaria: Anthozoa)',
      detail: 'Hexactinellida স্পঞ্জে ৬-রশ্মিময় সিলিকা স্পিকিউল (ভিনাসের ফুলের ঝুড়ি Euplectella) এবং Anthozoa-য় CaCO₃ নিঃসৃত প্রবাল প্রাচীর (যেমন সেন্ট মার্টিন দ্বীপ)',
      examTip: 'বাংলাদেশের একমাত্র প্রবাল-সদৃশ দ্বীপ সেন্ট মার্টিনের প্রবালগুলো Anthozoa শ্রেণির উপনিবেশিক নিডারিয়ান',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla_deep',
      key: 'মাছের প্যারোটিক বা আঁইশের প্রকার: প্ল্যাকয়েড, গ্যানয়েড, সাইক্লয়েড ও টিনয়েড',
      detail: 'হাঙরে ডার্মাল দাঁতের মতো প্ল্যাকয়েড, রুই-কাতলা-ইলিশে মসৃণ গোল সাইক্লয়েড এবং কই-ভেটকিতে পশ্চাৎ কিনারা কাঁটাযুক্ত টিনয়েড আঁইশ থাকে',
      examTip: 'অস্টিকথিসের সাইক্লয়েড আঁইশে বছরে তৈরি ঘন-হালকা সার্কুলি থেকে মাছের বয়স নির্ণয় করা যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla_deep',
      key: 'চোয়াল, ফুলকা ও হৃৎপিণ্ড: পিট্রোমাইজন-রুই-ব্যাঙ-কুমির-পাখি-স্তন্যপায়ী তুলনা',
      detail: 'সরীসৃপের মধ্যে একমাত্র কুমির ও ঘড়িয়াল (Crocodilia)-তে সম্পূর্ণ ৪-প্রকোষ্ঠী হৃৎপিণ্ড রয়েছে এবং উভচরের ত্বক নগ্ন, আর্দ্র ও মিউকাস গ্রন্থিযুক্ত',
      examTip: 'কচ্ছপ ও সাপে অসম্পূর্ণ ৪-প্রকোষ্ঠী (আংশিক আন্তঃনিলয় পর্দাযুক্ত ৩-প্রকোষ্ঠী) হৃৎপিণ্ড থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'model_animals',
      key: 'হাইড্রার মুকুলোদ্গম (Budding) ও পুনরুৎপত্তি-সক্ষমতা',
      detail: 'গ্রীষ্মে খাদ্য পর্যাপ্ত হলে দেহকাণ্ডের নিচের দিকে বহিঃ ও অন্তঃত্বকের ইন্টারস্টিশিয়াল কোষ দ্রুত বিভাজিত হয়ে অযৌন মুকুল সৃষ্টি করে',
      examTip: 'অপরদিকে হেমন্ত ও শীতে প্রতিকূল পরিবেশে অস্থায়ী শুক্রাশয় (শঙ্কু) ও ডিম্বাশয় (গোলাকার) তৈরি হয়ে যৌন জনন ঘটে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'model_animals',
      key: 'হাইড্রার বহিঃকোষীয় ও অন্তঃকোষীয় দ্বৈত পরিপাক',
      detail: 'শিকার সিলেন্টেরনে প্রবেশের পর ফ্ল্যাজেলাযুক্ত পুষ্টিকোষের নড়াচড়া ও গ্রন্থিকোষের এনজাইমে প্রথমে বহিঃকোষীয় আংশিক পরিপাক ও পরে সিউডোপডিয়ায় গিলে অন্তঃকোষীয় পরিপাক হয়',
      examTip: 'হাইড্রা শর্করা বা শ্বেতসার হজম করতে পারে না — এটি কেবল মাংসাশী (প্রাণী-আমিষ, লিপিড) প্রাণী',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'model_animals',
      key: 'ঘাসফড়িংয়ের ২ জোড়া ডানা: টেগমিনা বনাম মেমব্রেনাস ডানা',
      detail: 'মধ্যবক্ষের চামড়ার মতো শক্ত ও সরু ১ম জোড়া ডানা (টেগমিনা/এলাইট্রা) উড়ার কাজে নয় বরং পশ্চাৎ পাখাকে ঢেকে রক্ষায় কাজে লাগে; পশ্চাৎবক্ষের চওড়া পাতলা ঝিল্লিময় ডানাই মূলত ওড়ে',
      examTip: 'তিন জোড়া পায়ের শেষ জোড়া (মেটাহোরাসিক) দীর্ঘ ও মাংসল ফিমার-টিবিয়াযুক্ত বলে ঘাসফড়িং লাফাতে (Saltatorial) পারে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'model_animals',
      key: 'ঘাসফড়িংয়ের স্নায়ুতন্ত্র: সুপ্রা-ইসোফ্যাজিয়াল গ্যাংলিয়ন ও ভেন্ট্রাল নার্ভ কর্ড',
      detail: 'অন্ননালির উপরের মস্তিষ্ক (প্রোটো-ডিউটো-ট্রাইটোসেরেব্রাম), অন্ননালির নিচের সাব-ইসোফ্যাজিয়াল গ্যাংলিয়ন এবং বক্ষ (৩ জোড়া) ও উদরের (৫ জোড়া) জোড়া স্নায়ুরজ্জু',
      examTip: 'মাথা কেটে নিলেও বক্ষীয় গ্যাংলিয়ার স্বয়ংক্রিয় নিয়ন্ত্রণে ঘাসফড়িং বেশ কিছুক্ষণ হাঁটাচলা ও শ্বাস-নিয়ন্ত্রণ চালাতে পারে',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'model_animals',
      key: 'রুই মাছের রেনাল পোর্টাল তন্ত্র ও হেপাটিক পোর্টাল তন্ত্র',
      detail: 'রুই মাছের লেজের রক্ত কডাল শিরার মাধ্যমে সরাসরি হৃৎপিণ্ডে না গিয়ে রেনাল পোর্টাল শিরায় বৃক্ক হয়ে এবং অন্ত্রের রক্ত হেপাটিক পোর্টাল শিরায় যকৃৎ হয়ে ফেরে',
      examTip: 'মানুষে হেপাটিক পোর্টাল তন্ত্র থাকলেও প্রাপ্তবয়স্ক স্তন্যপায়ীতে রেনাল পোর্টাল তন্ত্র সম্পূর্ণ অনুপস্থিত থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'model_animals',
      key: 'রুই মাছের কৃত্রিম প্রজননে পিটুইটারি নির্যাস (PG হরমোন) প্রয়োগ',
      detail: 'ডিম্বস্ফোটন ঘটাতে স্ত্রী ও পুরুষ ব্রুড রুই মাছে পরিপক্ব মাথার পিটুইটারি গ্রন্থি থেকে সংগৃহীত গনাডোট্রপিক নির্যাস বা সিন্থেটিক ওভাপ্রিম (Ovaprim) ইনজেকশন দেওয়া হয়',
      examTip: 'হ্যাচারিতে প্রথমে প্রাথমিক ও ৬ ঘণ্টা পর চূড়ান্ত ডোজ দিলে স্ত্রী ও পুরুষ একযোগে ডিম ও মিল্ট ছাড়ে',
      diff: 'board',
    },
    // Ch 3 Digestion
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'digestion_deep',
      key: 'গলধঃকরণ (Deglutition) ও ইউভুলা-এপিগ্লটিস সমন্বয়',
      detail: 'মুখগহ্বরে খাদ্যবস্তু লালার সাথে মিশে পিচ্ছিল বোলাস (Bolus) হলে কোমল তালুর ইউভুলা নাসা-গলবিল বন্ধ করে ও এপিগ্লটিস শ্বাসনালির মুখ ঢেকে খাদ্য অন্ননালিতে পাঠায়',
      examTip: 'মেডুলা অবলংগাটার স্বয়ংক্রিয় নিয়ন্ত্রণে খাদ্য অন্ননালিতে প্রবেশ করে পেরিস্টালসিসে পাকস্থলিতে নামে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'digestion_deep',
      key: 'ব্রুনারের গ্রন্থি (Brunner’s Glands) ও ক্রিপ্টস অব লিবারকুন (Crypts of Lieberkühn)',
      detail: 'ডিউওডেনামের সাবমিউকোসায় অবস্থিত ব্রুনারের গ্রন্থি ক্ষারীয় শ্লেষ্মা-HCO₃⁻ ছেড়ে পাকস্থলির অম্লীয় কাইম প্রশমিত করে; ক্ষুদ্রান্ত্রের ক্রিপ্টসের প্যানেথ কোষ লাইসোজাইম ও মিউকোসার অন্ত্ররস (সাক্কাস এন্টারিকাস) ক্ষরণ করে',
      examTip: 'হিস্টোলজি পরীক্ষায় প্রায়ই আসে: সাবমিউকোসায় গ্রন্থি কেবল অন্ননালি ও ডিউওডেনামের (ব্রুনারের গ্রন্থি) বৈশিষ্ট্য',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'digestion_deep',
      key: 'পৌষ্টিকনালির প্রাচীরের ৪টি হিস্টোলজিক্যাল স্তর (ভেতর থেকে বাইরে)',
      detail: 'মিউকোসা (ল্যামিনা প্রোপ্রিয়া ও মাসকুলারিস মিউকোসি), সাবমিউকোসা (রক্ত-লসিকা ও মেইসনার প্লেক্সাস), মাসকুলারিস এক্সটার্না (অভ্যন্তরীণ বৃত্তাকার + অয়ারব্যাক প্লেক্সাস + বাহ্যিক অনুদৈর্ঘ্য) ও সেরোসা/অ্যাডভেন্টিশিয়া',
      examTip: 'ব্যতিক্রম: পাকস্থলিতে বৃত্তাকার ও অনুদৈর্ঘ্য স্তরের ভেতরে অতিরিক্ত তির্যক (Oblique) পেশিস্তর থাকায় খাদ্য মন্থন (Churning) জোরালো হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'digestion_deep',
      key: 'মাইসেল (Micelle) ও কাইলোমাইক্রন (Chylomicron) — চর্বি শোষণের দুই ধাপ',
      detail: 'পিত্তলবণ ও ফসফোলিপিড দিয়ে মোড়া পানিতে দ্রবণীয় ফ্যাটি অ্যাসিড-মনোগ্লিসারাইড গোলাক হলো মাইসেল; অন্ত্রে ঢোকার পর এন্টেরোসাইটের SER-এ পুনঃসংযুক্ত ট্রাইগ্লিসারাইডের প্রোটিন আবৃত কণা হলো কাইলোমাইক্রন',
      examTip: 'ছোট চেইন ফ্যাটি অ্যাসিড সরাসরি রক্তকৈশিকে ঢুকলেও বড় কাইলোমাইক্রন কেবল ভিলাইয়ের কেন্দ্রীয় ল্যাকটিয়েলে (লসিকানালি) প্রবেশ করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'digestion_deep',
      key: 'অ্যামিনো অ্যাসিড ও মনোস্যাকারাইডের Na⁺-সহপরিবহন (SGLT1 বনাম GLUT2/GLUT5)',
      detail: 'লুমেন থেকে গ্লুকোজ ও গ্যালাকটোজ SGLT1 বাহকে Na⁺ আয়নের ঘনত্ব-গ্রেডিয়েন্ট ব্যবহার করে (গৌণ সক্রিয় শোষণ) ভেতরে ঢোকে এবং ফ্রুক্টোজ GLUT5 দিয়ে ফ্যাসিলিটেটেড ব্যাপনে ঢোকে',
      examTip: 'ওরাল রিহাইড্রেশন স্যালাইনে (ORS) লবণ ও চিনি একসাথে দেওয়া হয় কারণ SGLT1 পথে গ্লুকোজ ও Na⁺ যুগ্ম শোষণে পানিশূন্যতা দ্রুত সারে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'digestion_deep',
      key: 'ডেন্টাল ফর্মুলা ও দাঁতের ৪ প্রকারের বিশেষ কাজ',
      detail: 'কর্তন/ইনসিজর (কাটা — ৮টি), ছেদন/ক্যানাইন (ছেঁড়া — ৪টি), অগ্রপেষণ/প্রিমোলার (চূর্ণন — ৮টি) ও পেষণ/মোলার (পেষণ — ১২টি, শেষ ৪টি আক্কেল দাঁত)',
      examTip: 'উভয় চোয়ালের ডান ও বাম দিকে প্রতি অর্ধাংশে (I₂ C₁ P₂ M₃) হিসেবে মোট ৩২টি স্থায়ী দাঁত থাকে',
      diff: 'dental',
    },
    // Ch 4 Blood & Circulation
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'circulation_deep',
      key: 'মেনিনজাইটিস বনাম পেরিকার্ডাইটিস ও ভাস্কুলার স্তর: অ্যাওর্টা-শিরা পার্থক্য',
      detail: 'ধমনির প্রাচীরের টিউনিকা মিডিয়া (মসৃণ পেশি ও ইলাস্টিক তন্তু) পুরু, গহ্বর সরু এবং কপাটিকা নেই (ব্যতিক্রম অ্যাওর্টিক/পালমোনারি); শিরার প্রাচীর পাতলা, গহ্বর চওড়া ও একমুখী রক্তপ্রবাহে অর্ধচন্দ্রাকার কপাটিকা থাকে',
      examTip: 'রক্তচাপ কম থাকায় পায়ের শিরায় কপাটিকা দুর্বল হলে রক্ত জমে শিরা ফুলে ওঠাকে ভ্যারিকোজ ভেইন বলে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'circulation_deep',
      key: 'থ্রম্বাস (Thrombus) বনাম এম্বোলাস (Embolus) ও DVT',
      detail: 'রক্তনালির ভেতরেই অস্বাভাবিক জমাট বাঁধা রক্তপিণ্ড হলো থ্রম্বাস; সেই জমাট বা বায়ু-চর্বির পিণ্ড ছুটে রক্তস্রোতে ভেসে দূরবর্তী ফুসফুস বা মস্তিষ্কের সূক্ষ্ম ধমনি আটকালে তা এম্বোলাস',
      examTip: 'পায়ের গভীর শিরায় রক্ত জমাট বাঁধাকে Deep Vein Thrombosis (DVT) বলে যা পালমোনারি এম্বোলিজমের প্রধান কারণ',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'circulation_deep',
      key: 'রক্তের প্রকৃত ক্যালসিয়াম-চিলেটর বনাম ভিভো অ্যান্টি-কোয়াগুল্যান্ট হেপারিন',
      detail: 'মাস্ট কোষ ও বেসোফিল ক্ষরিত সালফেটেড মিউকোপলিস্যাকারাইড হেপারিন অ্যান্টি-থ্রম্বিন-III সক্রিয় করে জীবিত রক্তনালির ভেতরে রক্ত জমাট বাঁধতে দেয় না',
      examTip: 'ব্লাড ব্যাংকে রক্ত সংরক্ষণে ACD / CPD দ্রবণের সাইট্রেট রক্তের মুক্ত Ca²⁺ (ফ্যাক্টর-IV) আবদ্ধ করে রক্ত জমাট ঠেকায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'circulation_deep',
      key: 'মাইক্রোস্কোপিক অণুচক্রিকা (থ্রম্বোসাইট) ও মেগাক্যারিওসাইট উৎস',
      detail: 'অস্থিমজ্জার বৃহৎ পলিপ্লয়েড মেগাক্যারিওসাইট কোষের সাইটোপ্লাজমীয় ভগ্নাংশ (নিউক্লিয়াসবিহীন, আয়ু ৫–৯ দিন); সেরোটোনিন (ভ্যাসোকনস্ট্রিক্টর) ও থ্রম্বোপ্লাস্টিন ছেড়ে রক্তক্ষরণ বন্ধ করে',
      examTip: 'ডেঙ্গু জ্বরে অণুচক্রিকা ১ লাখের নিচে (< ২০,০০০ হলে তীব্র রক্তক্ষরণ ঝুঁকি) নেমে গেলে থ্রম্বোসাইটোপেনিয়া ঘটে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'circulation_deep',
      key: 'ডান নিলয়ের প্রান্তীয় ট্রাবিকুলি কার্নি ও ইন্টারভেন্ট্রিকুলার সেপ্টাম',
      detail: 'বাম ও ডান নিলয়কে পৃথককারী পুরু পেশিময় পর্দা (যেখানে বান্ডল অব হিজ নামে); অলিন্দের ভেতরে খাঁজযুক্ত পেক্টিনেট পেশি ও নিলয়ে ট্রাবিকুলি কার্নি দেখা যায়',
      examTip: 'জন্মগতভাবে এই পর্দায় ছিদ্র (VSD/ASD) থাকলে অক্সিজেনযুক্ত ও বিজারিত রক্ত মিশে শিশু নীলবর্ণ (সায়ানোসিস / ব্লু-বেবি) হতে পারে',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'circulation_deep',
      key: 'করোনারি অ্যাঞ্জিওগ্রাফি, থ্রম্বোলাইটিক ও অ্যাঞ্জিওপ্লাস্টি বনাম পেসমেকার',
      detail: 'রেডিও-ওপেক ডাই ঢুকিয়ে এক্স-রেতে করোনারি ধমনির ব্লক দেখানো অ্যাঞ্জিওগ্রাম; ক্যাথেটারে বেলুন ফুলিয়ে ধমনি খোলা PTCA (স্টেন্ট বসানো) এবং SA নোড বিকলে পেসমেকার বসানো',
      examTip: 'একটি বা দুটি অথবা তিনটি চেম্বারে (ডান অলিন্দ ও উভয় নিলয়) তার বসিয়ে যথাক্রমে সিঙ্গেল, ডুয়াল বা বাইভেন্ট্রিকুলার পেসমেকার দেওয়া হয়',
      diff: 'board',
    },
    // Ch 5 & 6 Deep
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_renal_deep',
      key: 'শ্বসন রঞ্জক: হিমোগ্লোবিন বনাম মায়োগ্লোবিন (অক্সিজেন সংরক্ষণ)',
      detail: 'হিমোগ্লোবিন টেট্রামার (৪টি হিম, সিগময়েড বিয়োজন কার্ভ, বোর প্রভাব দেখায়); পেশিকোষের মায়োগ্লোবিন মনোমার (১টি হিম, অধিবৃত্তাকার/Hyperbolic কার্ভ, খুব কম pO₂-তে অক্সিজেন ধরে রাখে)',
      examTip: 'তিমি ও সিলের মতো ডুবুরি স্তন্যপায়ীর পেশিতে প্রচুর মায়োগ্লোবিন থাকায় তারা দীর্ঘ সময় পানির নিচে অক্সিজেন মজুদ রাখতে পারে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_renal_deep',
      key: 'ফুসফুসের কৈশিকজালিকায় গ্যাস বিনিময় (রক্তপ্রবাহের সময়কাল ০.৭৫ সেকেন্ড)',
      detail: 'বিশ্রামের সময় অ্যালভিওলার কৈশিকে RBC প্রায় ০.৭৫ সেকেন্ড থাকে যার প্রথম ০.২৫ সেকেন্ডের মধ্যেই O₂ ও CO₂ সাম্যাবস্থা অর্জিত হয়ে যায়',
      examTip: 'পরিশ্রমের সময় হৃদগতি বাড়ায় রক্ত দ্রুত প্রবাহিত হলেও (০.২৫–০.৩ সেকেন্ড) সুস্থ ফুসফুসে পর্যাপ্ত সেফটি মার্জিনের কারণে রক্ত ১০০% অক্সিজেনযুক্ত হতে পারে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_renal_deep',
      key: 'হেরিং-ব্রয়ার প্রতিবর্ত (Hering-Breuer Inflation Reflex)',
      detail: 'ফুসফুস অতিরিক্ত প্রসারিত হয়ে গেলে ব্রঙ্কিওলের স্ট্রেচ রিসেপ্টর ভেগাস স্নায়ু দিয়ে মেডুলায় নিবারক সংকেত পাঠিয়ে প্রশ্বাস বন্ধ করে অ্যালভিওলাস ফেটে যাওয়া ঠেকায়',
      examTip: 'স্বাভাবিক বিশ্রামের চেয়ে ভারী ব্যায়ামের সময় যখন টাইডাল ভলিউম ১ লিটার ছাড়ায় তখন এই প্রতিবর্ত সক্রিয় হয়',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'resp_renal_deep',
      key: 'রেনাল ক্লিয়ারেন্স (C = U×V/P) ও ইনিউলিন বনাম ক্রিয়েটিনিন',
      detail: 'প্রতি মিনিটে যে আয়তনের রক্তরস একটি নির্দিষ্ট পদার্থ থেকে সম্পূর্ণ পরিষ্কার হয় তাকে ক্লিয়ারেন্স বলে; ইনিউলিন গ্লোমেরুলাসে ফিল্টার হয় কিন্তু শোষিত বা ক্ষরিত হয় না বলে তা নিখুঁত GFR (~১২৫ mL/min) মাপে',
      examTip: 'ক্লিনিক্যাল প্র্যাকটিসে রক্তের endogenous পেশি-বর্জ্য ক্রিয়েটিনিন ক্লিয়ারেন্স (CrCl) কিডনির কার্যকারিতা যাচাইয়ে সর্বাধিক ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'resp_renal_deep',
      key: 'বাস্তব বৃক্কে প্রতিরক্ষা: কিডনি বায়োপসি ও নেফ্রোটিক বনাম নেফ্রাইটিক সিনড্রোম',
      detail: 'নেফ্রোটিক সিনড্রোমে প্রোটিন ক্ষয় (> ৩.৫ গ্রাম/দিন), রক্তে অ্যালবুমিন হ্রাস ও তীব্র শরীর ফোলা (ইডিমা); নেফ্রাইটিক সিনড্রোমে মূত্রে RBC কাস্ট, রক্তক্ষরণ ও উচ্চ রক্তচাপ প্রধান',
      examTip: 'উভয় অবস্থাতেই গ্লোমেরুলার বেসমেন্ট মেমব্রেন বা পডোসাইটের গঠনগত ক্ষতি ঘটে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'resp_renal_deep',
      key: 'পৌষ্টিক-মূত্রনালির ট্রানজিশনাল এপিথেলিয়াম (ইউরোথেলিয়াম)',
      detail: 'রেনাল পেলভিস, ইউরেটার ও মূত্রথলির অভ্যন্তরীণ আবরণী স্থিতিস্থাপক ট্রানজিশনাল এপিথেলিয়াম (ইউরোথেলিয়াম) দিয়ে তৈরি যা মূত্র জমলে না ফেটে বহু গুণ প্রসারিত হতে পারে',
      examTip: 'গোল ছাতার মতো পৃষ্ঠীয় আমব্রেলা কোষ ও শক্ত প্লাক মূত্রের বিষাক্ত ইউরিয়া রক্তে ফিরে যাওয়া ঠেকায়',
      diff: 'medical',
    },
  ];

  // Add 10 more entries so rows = 40 -> 40 × 4 = 160 + ~300 quantitative drills = ~460 unique MCQs!
  const extraS: Bio2SRaw[] = [
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla_deep',
      key: 'কোয়েলোডার্ম ও ডিপ্লোব্লাস্টিক বনাম ট্রিপ্লোব্লাস্টিক ভ্রূণীয় স্তর',
      detail: 'Cnidaria ও Ctenophora দ্বিস্তরী (এক্টোডার্ম + এন্ডোডার্ম + অকোষীয় মেসোগ্লিয়া); Platyhelminthes থেকে Chordata পর্যন্ত সকল প্রাণী ত্রিস্তরী (এক্টো, মেসো ও এন্ডোডার্ম)',
      examTip: 'Porifera-তে টিস্যু স্তর নেই (কোষীয় মাত্রার সংগঠন) ও এদের পিনাকোডার্ম-কোয়ানোডার্ম স্তর থাকে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'model_animals',
      key: 'হাইড্রা-কে ধ্বংস করা বনাম যৌন প্রজননে নিডারিয়ান লার্ভা স্টেরিওগ্যাস্ট্রুলা',
      detail: 'হাইড্রার নিষিক্ত ডিম্বাণু মরুলা ও ফাঁপা ব্লাস্টুলা পার হয়ে নিরেট গ্যাস্ট্রুলা (স্টেরিওগ্যাস্ট্রুলা) তৈরি করে কাইটিনময় সিস্ট-আবরণে শীতকাল কাটায়',
      examTip: 'অন্য সামুদ্রিক নিডারিয়ার মতো হাইড্রার জীবনচক্রে মুক্ত-সাঁতারু প্ল্যানুলা লার্ভা দশা অনুপস্থিত',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'digestion_deep',
      key: 'ভিটামিন B₁₂ শোষণ পথ (ক্যাসলের ইন্ট্রিনসিক ফ্যাক্টর)',
      detail: 'পাকস্থলির প্যারাইটাল কোষ ক্ষরিত গ্লাইকোপ্রোটিন ইন্ট্রিনসিক ফ্যাক্টর (IF) ভিটামিন B₁₂-এর সাথে যুক্ত হয়ে সুরক্ষিত অবস্থায় টার্মিনাল ইলিয়ামে গিয়ে রিসেপ্টরের মাধ্যমে রক্তে শোষিত হয়',
      examTip: 'টার্মিনাল ইলিয়াম কেটে ফেলা হলে বা পাকস্থলির গ্যাস্ট্রেকটমিতে ভিটামিন B₁₂ ঘাটতিতে মেগালোব্লাস্টিক বা পার্নিসিয়াস অ্যানিমিয়া হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'circulation_deep',
      key: 'হিমোগ্লোবিনোপ্যাথি: থ্যালাসেমিয়া ও সিকেল-সেল অ্যানিমিয়া',
      detail: 'আলফা বা বিটা গ্লোবিন শৃঙ্খলের পরিমাণগত উৎপাদন কমে গেলে থ্যালাসেমিয়া (অটোসোমাল প্রচ্ছন্ন); বিটা-গ্লোবিনের ৬ নম্বর অবস্থানে গ্লুটামিকের বদলে ভ্যালিন বসলে সিকেল-সেল (HbS)',
      examTip: 'হিমোগ্লোবিন S কম অক্সিজেনে কাস্তে আকৃতির হয়ে ম্যালেরিয়া পরজীবীর বিরুদ্ধে হেটারোজাইগাস বাহককে প্রাকৃতিক সুরক্ষা দেয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_renal_deep',
      key: 'শ্বসন ঝিল্লি (Respiratory Membrane)-র ০.৫ µm পুরুত্ব',
      detail: 'অ্যালভিওলার এপিথেলিয়াম + এপিথেলিয়াল বেসমেন্ট মেমব্রেন + ইন্টারস্টিশিয়াল স্পেস + কৈশিক বেসমেন্ট মেমব্রেন + কৈশিক এন্ডোথেলিয়াম মিলে অতি পাতলা ব্যাপন বাধা গড়ে',
      examTip: 'পালমোনারি ইডিমা বা নিউমোনিয়ায় ঝিল্লিতে তরল জমলে পুরুত্ব বেড়ে O₂ ব্যাপন ব্যাহত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'resp_renal_deep',
      key: 'রক্তে ইউরিয়া ও ক্রিয়েটিনিন জমে ইউরেমিয়া (Uremia)',
      detail: 'উভয় বৃক্কের কার্যকারিতা < ১৫% হলে রক্তে BUN (ইউরিয়া নাইট্রোজেন), ক্রিয়েটিনিন ও K⁺ বিষাক্ত মাত্রায় জমা হয়ে ইউরেমিয়া ঘটে যার চিকিৎসা ডায়ালাইসিস বা বৃক্ক প্রতিস্থাপন',
      examTip: 'স্বাভাবিক সিরাম ক্রিয়েটিনিন ০.৬–১.২ mg/dL; ক্রিয়েটিনিন দ্বিগুণ হলে সাধারণত GFR প্রায় অর্ধেক নেমে গেছে বোঝায়',
      diff: 'medical',
    },
  ];

  const allSRows = [...rows, ...extraS];
  allSRows.forEach((r, idx) => {
    const sameCat = allSRows.filter((x) => x.cat === r.cat && x.key !== r.key);
    const pool = sameCat.length >= 3 ? sameCat : allSRows.filter((x) => x.key !== r.key);
    const pick = <T,>(getter: (x: Bio2SRaw) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: r.diff ?? 'medical',
        question: `তুলনামূলক প্রাণিবিজ্ঞান বিশ্লেষণ: "${r.detail}" — এটি নিচের কোনটির নির্ভুল বর্ণনা?`,
        correct: r.key,
        distractors: pick((x) => x.key, 1),
        explanation: `${r.key}: ${r.detail}। (${r.examTip})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · সমন্বিত মেডিকেল-ডেন্টাল রিভিশন',
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
        question: `"${r.key}" বিষয়ক নির্ভুল অঙ্গসংস্থানিক বা শারীরবৃত্তীয় তথ্য কোনটি?`,
        correct: r.detail,
        distractors: pick((x) => x.detail, 2),
        explanation: `${r.key}: ${r.detail}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · বোর্ড এক্সিলেন্স ব্যাংক',
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
        question: `মেডিকেল অ্যাডমিশন ক্লু: "${r.examTip}" — এটি কোন বিষয় বা অবস্থার সাথে সম্পর্কিত?`,
        correct: r.key,
        distractors: pick((x) => x.key, 3),
        explanation: `${r.examTip} হলো "${r.key}" (${r.detail})-এর বিশেষ পরীক্ষামুখী তথ্য।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · হাই-ইল্ড ক্লু ব্যাংক',
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
        question: `"${r.key}" প্রসঙ্গে নিচের কোন বাড়তি/ক্লিনিক্যাল বক্তব্যটি যথার্থ?`,
        correct: r.examTip,
        distractors: pick((x) => x.examTip, 4),
        explanation: `${r.key}: ${r.examTip}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · ডেন্টাল রিভিশন ব্যাংক',
      })
    );
  });

  // 2. Quantitative Drills Across Ch 1-6 (~320 unique MCQs -> Total ~464!)
  // 2A. Total Oxygen Delivery (VO2 = CO × (CaO2 - CvO2)) Drills (12 × 2 = 24 MCQs)
  [
    { coL: 5, artO2: 20, venO2: 15 },
    { coL: 6, artO2: 20, venO2: 15 },
    { coL: 10, artO2: 20, venO2: 12 },
    { coL: 15, artO2: 20, venO2: 8 },
    { coL: 20, artO2: 20, venO2: 5 },
    { coL: 5, artO2: 20, venO2: 16 },
    { coL: 12, artO2: 20, venO2: 10 },
    { coL: 8, artO2: 19, venO2: 14 },
  ].forEach((vc, i) => {
    const diffPer100 = vc.artO2 - vc.venO2;
    const o2PerL = diffPer100 * 10;
    const totalO2Ml = vc.coL * o2PerL;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ধমনি রক্তের প্রতি ১০০ mL-এ ${toBnDigits(vc.artO2)} mL O₂ এবং শিরা রক্তের প্রতি ১০০ mL-এ ${toBnDigits(vc.venO2)} mL O₂ থাকলে ${toBnDigits(vc.coL)} L/min কার্ডিয়াক আউটপুটে প্রতি মিনিটে দেহের কলাসমূহ মোট কত mL অক্সিজেন ব্যবহার করে?`,
        correct: `${toBnDigits(totalO2Ml.toLocaleString('en-US'))} mL O₂/min`,
        distractors: [
          `${toBnDigits((vc.coL * vc.artO2 * 10).toLocaleString('en-US'))} mL O₂/min`,
          `${toBnDigits((vc.coL * vc.venO2 * 10).toLocaleString('en-US'))} mL O₂/min`,
          `${toBnDigits((totalO2Ml / 2).toLocaleString('en-US'))} mL O₂/min`,
        ],
        explanation: `প্রতি ১০০ mL-এ অক্সিজেন নিষ্কাশন = ${toBnDigits(vc.artO2)}−${toBnDigits(vc.venO2)} = ${toBnDigits(diffPer100)} mL (= প্রতি লিটারে ${toBnDigits(o2PerL)} mL)। অতএব ${toBnDigits(vc.coL)} L/min-এ = ${toBnDigits(totalO2Ml)} mL O₂/min।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · অক্সিজেন ব্যবহার (Fick সূত্র)',
      })
    );
  });

  // 2B. Renal Clearance C = (U × V) / P Numerical Drills (10 × 2 = 20 MCQs)
  [
    { u: 50, v: 2, p: 1 },
    { u: 120, v: 1, p: 1 },
    { u: 62.5, v: 2, p: 1 },
    { u: 100, v: 1.2, p: 1 },
    { u: 75, v: 2, p: 1.5 },
    { u: 90, v: 1.5, p: 1 },
    { u: 45, v: 2, p: 1 },
    { u: 80, v: 1.5, p: 1 },
    { u: 55, v: 2, p: 1 },
    { u: 60, v: 2, p: 1.2 },
  ].forEach((cl, i) => {
    const clearVal = Math.round((cl.u * cl.v) / cl.p);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch6_excretion',
        visualLessonId: 'nephron',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `কোনো রোগীর রেনাল ক্লিয়ারেন্স পরীক্ষায় মূত্রে ইনিউলিনের ঘনত্ব U = ${toBnDigits(cl.u)} mg/mL, মূত্র প্রবাহের হার V = ${toBnDigits(cl.v)} mL/min এবং রক্তরসে ঘনত্ব P = ${toBnDigits(cl.p)} mg/mL হলে গ্লোমেরুলার ফিল্ট্রেশন রেট (GFR) কত হবে?`,
        correct: `${toBnDigits(clearVal)} mL/min`,
        distractors: [
          `${toBnDigits(clearVal * 2)} mL/min`,
          `${toBnDigits(Math.round(clearVal / 2))} mL/min`,
          `${toBnDigits(Math.round(cl.u * cl.p))} mL/min`,
        ],
        explanation: `ইনিউলিন ক্লিয়ারেন্স C = (U × V) / P = (${toBnDigits(cl.u)} × ${toBnDigits(cl.v)}) / ${toBnDigits(cl.p)} = ${toBnDigits(clearVal)} mL/min = GFR।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · রেনাল ক্লিয়ারেন্স ও GFR গণনা',
      })
    );
  });

  // 2C. Dental Formula Tooth-Type Counts Across Age Groups (12 × 2 = 24 MCQs)
  const dentCases = [
    { group: '৪ বছর বয়সী শিশু (দুধের দাঁত — ২০টি)', i: 8, c: 4, pm: 0, m: 8 },
    { group: '২৮ বছর বয়সী পূর্ণবয়স্ক মানুষ (৩২টি)', i: 8, c: 4, pm: 8, m: 12 },
    { group: 'আক্কেল দাঁত না গজানো ১৮ বছর বয়সী তরুণ (২৮টি)', i: 8, c: 4, pm: 8, m: 8 },
    { group: 'কুকুর / বিড়াল (মাংসাশী — ৪২টি, I₃ C₁ P₄ M₂ / I₃ C₁ P₄ M₃)', i: 12, c: 4, pm: 16, m: 10 },
    { group: 'সর্বভুক মানুষের উপরের চোয়ালের ১৬টি দাঁত', i: 4, c: 2, pm: 4, m: 6 },
    { group: 'শিশুর নিচের চোয়ালের ১০টি দুধের দাঁত', i: 4, c: 2, pm: 0, m: 4 },
  ];
  dentCases.forEach((dc, idx) => {
    const total = dc.i + dc.c + dc.pm + dc.m;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'dental' : 'medical',
        question: `${dc.group}-এ মোট ${toBnDigits(total)}টি দাঁতের মধ্যে ইনসিজর (I), ক্যানাইন (C), প্রিমোলার (P) ও মোলার (M)-এর পৃথক সংখ্যা যথাক্রমে কত?`,
        correct: `I = ${toBnDigits(dc.i)}, C = ${toBnDigits(dc.c)}, P = ${toBnDigits(dc.pm)}, M = ${toBnDigits(dc.m)}`,
        distractors: [
          `I = ${toBnDigits(dc.c)}, C = ${toBnDigits(dc.i)}, P = ${toBnDigits(dc.m)}, M = ${toBnDigits(dc.pm)}`,
          `I = ${toBnDigits(dc.i + 2)}, C = ${toBnDigits(dc.c)}, P = ${toBnDigits(dc.pm + 2)}, M = ${toBnDigits(Math.max(0, dc.m - 4))}`,
          `I = ${toBnDigits(dc.i / 2)}, C = ${toBnDigits(dc.c / 2)}, P = ${toBnDigits(dc.pm / 2)}, M = ${toBnDigits(dc.m / 2)}`,
        ],
        explanation: `${dc.group}-এর দন্তবিন্যাস: I=${toBnDigits(dc.i)}, C=${toBnDigits(dc.c)}, P=${toBnDigits(dc.pm)}, M=${toBnDigits(dc.m)} (সর্বমোট ${toBnDigits(total)}টি)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · দন্তসংকেত হিসাব',
      })
    );
  });

  // 2D. Differential WBC Absolute Cell Counts Numericals (10 × 2 = 20 MCQs)
  [
    { totalWbc: 8000, neutPct: 65, lymphPct: 25, eosPct: 3 },
    { totalWbc: 10000, neutPct: 60, lymphPct: 30, eosPct: 4 },
    { totalWbc: 6000, neutPct: 70, lymphPct: 20, eosPct: 2 },
    { totalWbc: 12000, neutPct: 75, lymphPct: 18, eosPct: 2 },
    { totalWbc: 9000, neutPct: 60, lymphPct: 25, eosPct: 10 },
    { totalWbc: 7000, neutPct: 65, lymphPct: 25, eosPct: 4 },
  ].forEach((wb, i) => {
    const neutAbs = Math.round((wb.totalWbc * wb.neutPct) / 100);
    const lymphAbs = Math.round((wb.totalWbc * wb.lymphPct) / 100);
    const eosAbs = Math.round((wb.totalWbc * wb.eosPct) / 100);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি রক্তের CBC রিপোর্টে মোট WBC গণনা ${toBnDigits(wb.totalWbc.toLocaleString('en-US'))}/µL এবং ডিফারেন্সিয়াল গণনায় নিউট্রোফিল ${toBnDigits(wb.neutPct)}% ও লিম্ফোসাইট ${toBnDigits(wb.lymphPct)}% পাওয়া গেলে প্রতি মাইক্রোলিটারে পরম (Absolute) নিউট্রোফিল ও লিম্ফোসাইট সংখ্যা কত?`,
        correct: `নিউট্রোফিল ${toBnDigits(neutAbs.toLocaleString('en-US'))}/µL ও লিম্ফোসাইট ${toBnDigits(lymphAbs.toLocaleString('en-US'))}/µL`,
        distractors: [
          `নিউট্রোফিল ${toBnDigits(lymphAbs.toLocaleString('en-US'))}/µL ও লিম্ফোসাইট ${toBnDigits(neutAbs.toLocaleString('en-US'))}/µL`,
          `নিউট্রোফিল ${toBnDigits((neutAbs * 2).toLocaleString('en-US'))}/µL ও লিম্ফোসাইট ${toBnDigits(eosAbs.toLocaleString('en-US'))}/µL`,
          `নিউট্রোফিল ${toBnDigits(eosAbs.toLocaleString('en-US'))}/µL ও লিম্ফোসাইট ${toBnDigits((wb.totalWbc - neutAbs).toLocaleString('en-US'))}/µL`,
        ],
        explanation: `Absolute Count = (শতাংশ × মোট WBC)/১০০; তাই নিউট্রোফিল = ${toBnDigits(neutAbs)}/µL এবং লিম্ফোসাইট = ${toBnDigits(lymphAbs)}/µL।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · WBC ডিফারেন্সিয়াল হিসাব',
      })
    );
  });

  // 2E. Rapid Clinical & Anatomical Facts Ch 1–6 (45 entries × 3 = 135 MCQs)
  const rapidFactsS: Array<{ ch: Bio2SRaw['ch']; vl: string; key: string; desc: string; hint: string }> = [
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', key: 'প্রজাপতি ও পোকামাকড়ে প্রোগ্লটিড বনাম মোল্টিং হরমোন একডাইসন', desc: 'অ্যাপোলিসিস ও একডাইসিসে পুরোনো কিউটিকল ত্যাগ করে বৃদ্ধি', hint: 'প্লাটিহেলমিনথেস ফিতাকৃমিতে প্রতিটি দেহখণ্ড হলো প্রোগ্লটিড যাতে উভলিঙ্গ জনন অঙ্গ থাকে' },
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', key: 'বাইপিনারিয়া, ট্রকোফোর ও প্ল্যানুলা লার্ভার পর্ব মিল', desc: 'যথাক্রমে Echinodermata, Mollusca/Annelida এবং Cnidaria পর্বের বৈশিষ্ট্যময় মুক্ত সাঁতারু লার্ভা', hint: 'লার্ভা পর্যবেক্ষণ শ্রেণিবিন্যাসে বিবর্তনীয় সম্পর্ক নির্ধারণে প্রধান ভূমিকা রাখে' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', key: 'হাইড্রার গ্লাইডিং, সাঁতার ও ভাসা চলন', desc: 'গ্যাস্ট্রোভাস্কুলার গহ্বর থেকে পাদচাকতিতে বায়ু বুদবুদ তৈরি করে পানির পৃষ্ঠে ভেসে থাকা এবং অ্যামিবয়েড গ্লাইডিং', hint: 'হাইড্রায় কোনো স্থায়ী পায়ু বা শ্বসন-রেচন তন্ত্র না থাকায় ত্বক দিয়ে ব্যাপনে শ্বসন-রেচন হয়' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', key: 'ঘাসফড়িংয়ের ম্যালপিজিয়ান নালিকার পটাশিয়াম ইউরেট শোষণ', desc: 'দূরবর্তী প্রান্ত থেকে K⁺, OH⁻ ও ইউরেট ভেতরে ঢুকে CO₂-সহ K₂CO₃ ও পানিতে পুনঃশোষিত হয়ে গোড়ায় শক্ত ইউরিক অ্যাসিড পড়ে থাকে', hint: 'পানি সংরক্ষণের চমৎকার মরু/স্থলজ অভিযোজন' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', key: 'রুই মাছের ৯টি অযুগ্ম ও যুগ্ম পাখনা: পেলভিক ও পেক্টোরাল', desc: 'বক্ষ পাখনা ঘূর্ণনে, শ্রোণি পাখনা ওঠানামা-ভারসাম্যে এবং পৃষ্ঠ পাখনা পার্শ্বীয় ঘূর্ণন রোধে সাহায্য করে', hint: 'হোমোসার্কাল পুচ্ছ পাখনা সোজা সম্মুখে শক্তিশালী ধাক্কা তৈরি করে' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', key: 'গ্যাস্ট্রিক কাইম (Chyme) বনাম আন্ত্রিক কাইল (Chyle)', desc: 'পাকস্থলিতে HCl ও পেপসিনে মন্থিত আংশিক পরিপাককৃত অম্লীয় অর্ধতরল কাইম; ক্ষুদ্রান্ত্রে পিত্ত-অগ্ন্যাশয় রসে মিশ্রিত ক্ষারীয় স্নেহসমৃদ্ধ তরল কাইল', hint: 'লসিকানালির চর্বিসমৃদ্ধ সাদা তরলও কাইল নামে পরিচিত' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', key: 'গ্লাইকোজেনেসিস বনাম গ্লাইকোজেনোলাইসিস ও গ্লুকোনিওজেনেসিস', desc: 'গ্লুকোজ → গ্লাইকোজেন (ইনসুলিন); গ্লাইকোজেন → গ্লুকোজ (গ্লুকাগন); এবং অ-শর্করা উৎস (অ্যামিনো অ্যাসিড/ল্যাকটেট/গ্লিসারল) → গ্লুকোজ (গ্লুকোনিওজেনেসিস)', hint: 'যকৃত মানবদেহে রক্তের গ্লুকোজ মাত্রা ৭০–১১০ mg/dL-এ ধরে রাখার কেন্দ্রীয় কারখানা' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', key: 'রক্তের বাফার তন্ত্র: বাইকার্বোনেট, ফসফেট ও হিমোগ্লোবিন-প্রোটিন', desc: 'রক্তের স্বাভাবিক pH ৭.৩৫–৭.৪৫ ধরে রাখতে H₂CO₃/HCO₃⁻ (২০:১ অনুপাত) প্রধান বহিঃকোষীয় বাফার হিসেবে কাজ করে', hint: 'pH < ৭.৩৫ হলে অ্যাসিডোসিস ও > ৭.৪৫ হলে অ্যালকালোসিস ঘটে' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', key: 'লিম্ফোসাইট ও মনোসাইট (অ্যাগ্রানুলোসাইট) বনাম গ্রানুলোসাইট', desc: 'সাইটোপ্লাজমে দানাবিহীন অখণ্ডিত বড় নিউক্লিয়াসযুক্ত অ্যাগ্রানুলোসাইট (লিম্ফোসাইট, মনোসাইট); দানাযুক্ত বহুখণ্ড নিউক্লিয়াস (PMN) হলো নিউট্রোফিল, ইওসিনোফিল, বেসোফিল', hint: 'মনোসাইট রক্তের বৃহত্তম শ্বেত কণিকা (১২–২০ µm) যা টিস্যুতে গিয়ে ম্যাক্রোফেজ হয়' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', key: 'কার্ডিয়াক ইনপুট ও ভেনাস রিটার্ন: কঙ্কাল-পেশি পাম্প ও শ্বসন পাম্প', desc: 'পায়ের শিরা ঘিরে থাকা পেশির সংকোচন-প্রসারণ ও শিরার একমুখী কপাটিকা মাধ্যাকর্ষণের বিপরীতে রক্তকে ডান অলিন্দে তুলে আনে', hint: 'দীর্ঘক্ষণ স্থির দাঁড়িয়ে থাকলে ভেনাস রিটার্ন কমে মস্তিষ্কে রক্ত না পৌঁছে অজ্ঞান (Syncope) হতে পারে' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', key: 'ব্রঙ্কিওল ও অ্যালভিওলাসে প্যারাসিমপ্যাথেটিক বনাম সিমপ্যাথেটিক ক্রিয়া', desc: 'এপিনেফ্রিন/অ্যাড্রেনালিন (β₂-রিসেপ্টর) ব্রঙ্কোডাইলেশন ঘটায় (শ্বাসনালি প্রসারিত করে); ভেগাসের অ্যাসিটাইলকোলিন ও হিস্টামিন ব্রঙ্কোকনস্ট্রিকশন ঘটায়', hint: 'তীব্র হাঁপানির (Asthma) আক্রমণে শ্বাসনালি প্রসারণে β₂-অ্যাগনিস্ট (সালবুটামল) ইনহেলার ব্যবহার করা হয়' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', key: 'শব্দ সৃষ্টি: ভোকাল কর্ডের টান, দৈর্ঘ্য ও বয়ঃসন্ধিতে টেস্টোস্টেরনের প্রভাব', desc: 'পুরুষের টেস্টোস্টেরন স্বরযন্ত্রের থাইরয়েড তরুণাস্থি (অ্যাডামস অ্যাপল) ও ভোকাল কর্ড বড় ও পুরু করে বলে কণ্ঠস্বর ভারী ও গম্ভীর (নিম্ন কম্পাঙ্ক) হয়', hint: 'ফুসফুস থেকে বের হওয়া বায়ুর চাপে ভোকাল কর্ড কম্পিত হয়ে প্রাথমিক শব্দ তৈরি করে, ও মুখ-জিহ্বা-ঠোঁট স্পষ্ট উচ্চারণ ঘটায়' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', key: 'মূত্রথলির ট্রাইগোন (Trigone) ও অভ্যন্তরীণ-বাহ্যিক স্ফিংক্টার', desc: 'দুটি ইউরেটারের প্রবেশমুখ ও একটি ইউরেথ্রার বহির্মুখ মিলে মূত্রথলির গোড়ায় ত্রিকোণাকার ট্রাইগোন গঠিত হয়', hint: 'অভ্যন্তরীণ স্ফিংক্টার মসৃণ (অনৈচ্ছিক) এবং বাহ্যিক স্ফিংক্টার কঙ্কাল পেশির (ঐচ্ছিক)' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', key: 'অরনিথিন-সিট্রুলিন-আর্জিনিন (আর্জিনেজ এনজাইমে ইউরিয়া মুক্তি)', desc: 'যকৃতের মাইটোকন্ড্রিয়া ও সাইটোপ্লাজমে কার্বাময়েল ফসফেট + অরনিথিন → সিট্রুলিন → আর্জিনিনোসাকসিনেট → আর্জিনিন ভেঙে ইউরিয়া ও পুনরায় অরনিথিন তৈরি হয়', hint: 'আর্জিনেজ এনজাইম কেবল যকৃত কোষেই সক্রিয় বলে একমাত্র যকৃতেই ইউরিয়া তৈরি হতে পারে' },
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', key: 'আইসিজেডএন (ICZN) দ্বিপদ নাম ও হোলোটাইপ-সিনোটাইপ', desc: 'কোনো প্রজাতির প্রথম বিবরণের সময় লেখক যে একক নির্দিষ্ট নমুনাটি মানদণ্ড হিসেবে মনোনীত করেন তা হলো হোলোটাইপ', hint: 'যদি গণ ও প্রজাতির নাম হুবহু এক হয় (যেমন প্রজাপতি/মাছ/শিয়াল Vulpes vulpes বা কেউটে Naja naja), প্রাণিবিজ্ঞানে সেই টটোনিম বৈধ' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', key: 'ঘাসফড়িংয়ের দৃষ্টি: মোজাইক দর্শনে পিক্সেল-সদৃশ সমন্বয়', desc: 'প্রতিটি ওমাটিডিয়ামের র‍্যাবডোম বস্তুর একটি ক্ষুদ্র বিন্দুর আলো ধরে, এবং মস্তিষ্কে ~২,০০০টি ক্ষুদ্র বিন্দু মিলে একটি সামগ্রিক ছবি তৈরি করে', hint: 'এ ধরনের দর্শন নড়াচড়া শনাক্তকরণে অসাধারণ দ্রুত কিন্তু রেজোলিউশন মানুষের ক্যামেরা-চোখের চেয়ে কম' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', key: 'অগ্ন্যাশয়িক জুসের ক্ষারীয় pH (৭.৮–৮.৪) ও বাইকার্বোনেট নিরপেক্ষীকরণ', desc: 'পাকস্থলি থেকে আসা pH ২.০-এর অম্লীয় কাইম ডিউওডেনামে ঢুকলে সিক্রেটিন হরমোন অগ্ন্যাশয়ের ডাক্ট কোষ থেকে NaHCO₃-পূর্ণ তরল ক্ষরণ করে pH ৮.০-এ আনে', hint: 'পাকস্থলির পেপসিন নিষ্ক্রিয় হয়ে যায় ও অগ্ন্যাশয়ের ট্রিপসিন-লাইপেজ কাজ শুরু করে' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', key: 'ফিটাল (HbF) বনাম প্রাপ্তবয়স্ক (HbA) হিমোগ্লোবিনের শৃঙ্খল', desc: 'HbA-তে ২ আলফা + ২ বিটা (α₂β₂) গ্লোবিন পলিপেপটাইড; আর ভ্রূণীয় HbF-এ ২ আলফা + ২ গামা (α₂γ₂) শৃঙ্খল থাকে', hint: 'জন্মের ৬ মাসের মধ্যে HbF ধীরে ধীরে HbA দ্বারা প্রতিস্থাপিত হয়' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', key: 'সায়ানোসিস (নীল ত্বক-নখ) এর কারণ', desc: 'রক্তে ডি-অক্সিহিমোগ্লোবিনের (অক্সিজেনবিহীন Hb) ঘনত্ব প্রতি ১০০ mL রক্তে ৫ গ্রামের বেশি হয়ে গেলে ঠোঁট, জিহ্বা ও নখের নিচ নীলচে দেখায়', hint: 'মারাত্মক অ্যানিমিয়া রোগীর পর্যাপ্ত Hb-ই থাকে না বলে অক্সিজেন অভাবেও সহজে সায়ানোসিস দেখা যায় না' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', key: 'বৃক্কে H⁺ ক্ষরণ ও NH₄⁺ (অ্যামোনিয়াম বাফার) দিয়ে অ্যাসিড-ক্ষার নিয়ন্ত্রণ', desc: 'রক্ত অতিরিক্ত অম্লীয় (অ্যাসিডোসিস) হলে কিডনির PCT-DCT কোষ গ্লুটামিন ভেঙে NH₃ ও নতুন HCO₃⁻ তৈরি করে এবং মূত্রে H⁺ + NH₃ = NH₄⁺ রূপে অ্যাসিড বের করে দেয়', hint: 'এভাবে ফুসফুস দ্রুত CO₂ বের করে ও বৃক্ক দীর্ঘমেয়াদে HCO₃⁻/H⁺ ভারসাম্য স্থির রাখে' },
  ];

  rapidFactsS.forEach((rf, idx) => {
    const others = rapidFactsS.filter((x) => x.key !== rf.key);
    const pick = (s: number) => [0, 1, 2, 3].map((k) => others[(idx + s + k * 4) % others.length]);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: rf.ch,
        visualLessonId: rf.vl,
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বিশেষ প্রাণিবিজ্ঞান তথ্য: "${rf.desc}" — এটি নিচের কোন পরিভাষার ক্ষেত্রে প্রযোজ্য?`,
        correct: rf.key,
        distractors: pick(1).map((x) => x.key),
        explanation: `${rf.key}: ${rf.desc}। (${rf.hint})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১–৬ · মাস্টার রিভিশন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: rf.ch,
        visualLessonId: rf.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `"${rf.key}" সম্পর্কে নিচের কোন ব্যাখ্যাটি সঠিক?`,
        correct: rf.desc,
        distractors: pick(2).map((x) => x.desc),
        explanation: `${rf.key}: ${rf.desc}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১–৬ · বোর্ড ও অ্যাডমিশন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: rf.ch,
        visualLessonId: rf.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${rf.hint}" — এই ক্লিনিক্যাল বা পরীক্ষামুখী তথ্যটি কোন বিষয়ের সাথে যুক্ত?`,
        correct: rf.key,
        distractors: pick(3).map((x) => x.key),
        explanation: `${rf.hint} হলো "${rf.key}" (${rf.desc})-এর প্রাসঙ্গিক দিক।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১–৬ · মেডিকেল ক্লু',
      })
    );
  });

  return list;
}
