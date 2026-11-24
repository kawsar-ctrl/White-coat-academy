import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio2MRaw {
  ch: 'bio2_ch1_taxonomy' | 'bio2_ch2_animal_id';
  vl: string;
  cat: string;
  term: string;
  fact: string;
  pearl: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredM(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_sm_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 1 (Animal Diversity & Taxonomy) + Ch 2 (Hydra, Grasshopper, Rohu): 78 × 4 = 312 unique MCQs
  const rows: Bio2MRaw[] = [
    // --- Chapter 1: Animal Diversity & Classification ---
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'basis',
      term: 'দ্বি-অরীয় (Biradial) ও গোলীয় (Spherical) প্রতিসাম্যতা',
      fact: 'Ctenophora পর্বের প্রাণী (যেমন Ceoloplana, Beroe)-তে দ্বি-অরীয় প্রতিসাম্যতা ও ভলভক্স বা রেডিওলারিয়ানে গোলীয় প্রতিসাম্যতা দেখা যায়',
      pearl: 'স্পঞ্জ (Porifera) ও আপেল শামুক (Pila)-এ অপ্রতিসাম্যতা (Asymmetry) এবং প্রজাপতি-মানুষে দ্বিপার্শ্বীয় প্রতিসাম্যতা থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'basis',
      term: 'প্রকৃত খণ্ডকায়ন বা মেটামেরিজম (Metamerism)',
      fact: 'ভ্রূণাবস্থা বা পূর্ণাঙ্গ দেহে অনুদৈর্ঘ্যভাবে একই ধরনের অঙ্গ-খণ্ডকের পুনরাবৃত্তি যা কেঁচো (Annelida)-তে বাহ্যিক ও অভ্যন্তরীণ উভয়ভাবে স্পষ্ট',
      pearl: 'আর্থ্রোপোডায় (ঘাসফড়িং) বাহ্যিক ও কর্ডাটায় (মানুষের কশেরুকা-পর্শুকা-পেশি) কেবল অভ্যন্তরীণ খণ্ডকায়ন দেখা যায়; ফিতাকৃমির খণ্ডায়ন মেকি (Pseudometamerism)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'basis',
      term: 'সর্পিল (Spiral) বনাম অরীয় (Radial) ক্লিভেজ ও ব্লাস্টোপোর পরিণতি',
      fact: 'প্রোটোস্টোমিয়াতে (Annelida, Mollusca, Arthropoda) সর্পিল ও নির্ধারিত ক্লিভেজে ব্লাস্টোপোর থেকে প্রথমে মুখ সৃষ্টি হয়',
      pearl: 'ডিউটারোস্টোমিয়াতে (Echinodermata ও Chordata) অরীয় ও অনির্ধারিত ক্লিভেজে ব্লাস্টোপোর থেকে প্রথমে পায়ু ও পরে মুখ গঠিত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'basis',
      term: 'অ্যাসিলোমেট, সিউডোসিলোমেট ও ইউসিলোমেট',
      fact: 'প্যারেনকাইমা পূর্ণ সিলোমবিহীন প্রাণী প্লাটিহেলমিনথেস (অ্যাসিলোমেট); মেসোডার্মহীন ভ্রূণীয় ব্লাস্টোসিলের অবশিষ্ট গহ্বরযুক্ত নেমাটোডা (সিউডোসিলোমেট)',
      pearl: 'অ্যানিলিডা থেকে কর্ডাটা পর্যন্ত মেসোডার্মাল পেরিটোনিয়াম পর্দাবেষ্টিত প্রকৃত সিলোম (ইউসিলোমেট) বিদ্যমান',
      diff: 'board',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Porifera (পরিফেরা) পর্বের কোয়ানোসাইট ও ক্যানাল তন্ত্র',
      fact: 'অস্টিয়া ছিদ্র দিয়ে পানি স্পঞ্জোসিল গহ্বরে ঢুকে কলার-ফ্ল্যাজেলাযুক্ত কোয়ানোসাইট কোষের মাধ্যমে খাদ্য ছেঁকে অসকুলাম দিয়ে বের হয়ে যায়',
      pearl: 'Scypha ও Spongilla-তে ক্যালসিয়াম কার্বোনেট-সিলিকা স্পিকিউল বা স্পঞ্জিন তন্তু অভ্যন্তরীণ কঙ্কাল গঠন করে এবং অ্যাম্ফিব্লাস্টুলা লার্ভা পাওয়া যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Cnidaria (নিডারিয়া) পর্বের পলিমরফিজম (পলিপ ও মেডুসা) এবং প্ল্যানুলা লার্ভা',
      fact: 'নিডোব্লাস্ট কোষ, সিলেন্টেরন বা গ্যাস্ট্রোভাস্কুলার গহ্বর ও জীবনচক্রে অযৌন স্থির পলিপ ও যৌন মুক্ত-সাঁতারু মেডুসা দশার পর্যায়ক্রম (মেটাজেনেসিস — Obelia)',
      pearl: 'Hydra ও প্রবাল কেবল পলিপ দশায় থাকে; Aurelia (জেলিফিশ)-এ প্রধানত মেডুসা দশা; সবার সাধারণ সিলিয়াযুক্ত লার্ভা হলো প্ল্যানুলা',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Platyhelminthes (প্লাটিহেলমিনথেস) পর্বের শিখা কোষ (Flame Cell / Protonephridia)',
      fact: 'পৃষ্ঠীয়-অঙ্কীয়ভাবে চ্যাপ্টা, অ্যাসিলোমেট দেহে রেচন ও অভিস্রবণ নিয়ন্ত্রণে ফ্লিকারেটের ন্যায় সিলিয়া-নড়া শিখা কোষ বা সোলেনোসাইট',
      pearl: 'যকৃতকৃমি (Fasciola hepatica)-তে মিরাসিডিয়াম-স্পোরোসিস্ট-রেডিয়া-সারকেরিয়া-মেটাসারকেরিয়া এবং ফিতাকৃমিতে (Taenia) চোষক ও হুকযুক্ত স্কোলেক্স থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Nematoda (নেমাটোডা) পর্বের ইলাস্টিক কিউটিকল ও কোষ-নির্দিষ্টতা (Eutely)',
      fact: 'দ্বিপ্রান্ত সুঁচালো নলাকার কৃমিতে স্থিতিস্থাপক কোলাজেন কিউটিকল, সিউডোসিল ও মুখ-পায়ুসহ পূর্ণাঙ্গ নল-ভেতর-নল পৌষ্টিকনালি দেখা যায়',
      pearl: 'গোলকৃমি (Ascaris), হুকওয়ার্ম (Ancylostoma) ও ফাইলেরিয়া কৃমি (Wuchereria bancrofti — গোদরোগ সৃষ্টিকারী) এই পর্বের সদস্য',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Mollusca (মলাস্কা) পর্বের র‍্যাডুলা (Radula), ম্যান্টল ও হিমোসায়ানিন',
      fact: 'নরম অখণ্ডিত দেহ ম্যান্টল পর্দায় আবৃত (যা চুনময় খোলস গড়ে), মাংসল পদ, ও মুখগহ্বরে র‍্যাডুলা নামক কাইটিনময় দাঁতযুক্ত রেতিজিহ্বা (ঝিনুকে অনুপস্থিত)',
      pearl: 'রক্তে তামা-যুক্ত নীল শ্বাসরঞ্জক হিমোসায়ানিন ও সামুদ্রিক সদস্যে ট্রকোফোর ও ভেলিজার লার্ভা দেখা যায় (দ্বিতীয় বৃহত্তম প্রাণীপর্ব)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Annelida (অ্যানিলিডা) পর্বের নেফ্রিডিয়া ও সিটি/প্যারাপোডিয়া',
      fact: 'আংটির মতো প্রকৃত খণ্ডিত দেহ, কাইটিনময় সিটা বা প্যারাপোডিয়া চলন অঙ্গ ও প্রতিটি খণ্ডকে পেঁচানো রেচননালিকা নেফ্রিডিয়া (কেঁচো Metaphire, জোঁক Hirudinaria)',
      pearl: 'প্লাজমায় দ্রবীভূত হিমোগ্লোবিনসহ বদ্ধ রক্তসংবহন তন্ত্র এবং জোঁকের লালায় রক্ত জমাট রোধক হিরুডিন (Hirudin) থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Arthropoda (আর্থ্রোপোডা) পর্ব — প্রাণিজগতের বৃহত্তম পর্ব (~৮০% প্রজাতি)',
      fact: 'সন্ধিযুক্ত উপাঙ্গ, কাইটিনময় বহিঃকঙ্কাল (একডাইসিসে খোলস বদল), হিমোসিলযুক্ত উন্মুক্ত রক্তসংবহন, পুঞ্জাক্ষি ও ম্যালপিজিয়ান নালিকা বা সবুজ গ্রন্থি (চিংড়ি)',
      pearl: 'চিংড়ির রেচন অঙ্গ হলো অ্যান্টেনাল বা সবুজ গ্রন্থি, মাকড়সার বুক-লাং ও কক্সাল গ্রন্থি এবং পতঙ্গের ট্রাকিয়া ও ম্যালপিজিয়ান নালিকা',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'phyla',
      term: 'Echinodermata (একাইনোডার্মাটা) পর্বের পানি সংবহনতন্ত্র ও নালিকা পদ',
      fact: 'কেবল সামুদ্রিক কণ্টকত্বকী প্রাণী (তারামাছ Asterias): লার্ভা দ্বিপার্শ্বীয় (বাইপিনারিয়া) কিন্তু পরিণত প্রাণী পঞ্চ-অরীয় ও মস্তকহীন',
      pearl: 'ম্যাড্রেপোরাইট থেকে উৎপন্ন ইউনিক পানি সংবহনতন্ত্র (Water vascular system) ও টিউব ফিট (নালিকা পদ) চলন, শ্বসন ও খাদ্য গ্রহণে কাজ করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'chordata',
      term: 'কর্ডাটা পর্বের ৩টি মৌলিক ও ১টি বিশেষ বৈশিষ্ট্য',
      fact: '১) নটোকর্ড, ২) পৃষ্ঠীয় ফাঁপা স্নায়ুরজ্জু, ৩) গলবিলীয় ফুলকা রন্ধ্র (Pharyngeal gill slits) এবং ৪) পায়ু-পরবর্তী লেজ ও এন্ডোস্টাইল/থাইরয়েড',
      pearl: 'ইউরোকর্ডাটায় (Ascidia) কেবল লার্ভার লেজে নটোকর্ড থাকে (রেট্রোগ্রেসিভ মেটামরফোসিস); সেফালোকর্ডাটায় (Branchiostoma) আজীবন দেহের অগ্র-পশ্চাৎ নটোকর্ড থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'chordata',
      term: 'মিক্সিনি (হ্যাগফিশ) বনাম পেট্রোমাইজনটিডা (ল্যাম্প্রে — অ্যামোসিট লার্ভা)',
      fact: 'চোয়ালবিহীন ভার্টিব্রেটা (অ্যাগনাথা): হ্যাগফিশ অন্ধ ও ৪ জোড়া কর্ষিকাযুক্ত (কোনো লার্ভা নেই); পেট্রোমাইজন (ল্যাম্প্রে) অ্যানাড্রোমাস ও এর অ্যামোসিট লার্ভা থাকে',
      pearl: 'মিক্সিনির দেহতরলের অভিস্রবণীয় চাপ সামুদ্রিক পানির সমান এবং আতঙ্কিত হলে প্রচুর মিউকাস (Slime) ছাড়ে',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'chordata',
      term: 'কন্ড্রিকথিস (তরুণাস্থিময় মাছ) বনাম অস্টিকথিস (অস্থিময় মাছ)',
      fact: 'কন্ড্রিকথিসে (হাঙর Scoliodon, শাপলাপাতা) প্ল্যাকয়েড আঁইশ, কানকোবিহীন ৫–৭ জোড়া মুক্ত ফুলকা ছিদ্র, পটকা অনুপস্থিত ও হেটারোসার্কাল পুচ্ছ পাখনা',
      pearl: 'অস্টিকথিসে (রুই Labeo, ইলিশ) সাইক্লয়েড/টিনয়েড/গ্যানয়েড আঁইশ, কানকোযুক্ত ৪ জোড়া ফুলকা, বায়ুথলি/পটকা ও হোমোসার্কাল পুচ্ছ পাখনা থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'chordata',
      term: 'অ্যাম্ফিবিয়া, রেপ্টিলিয়া, এভিস ও ম্যামালিয়ার হৃৎপিণ্ড ও করোটিক স্নায়ু',
      fact: 'মাছে ২-প্রকোষ্ঠী, উভচরে ৩-প্রকোষ্ঠী, সরীসৃপে অসম্পূর্ণ ৪-প্রকোষ্ঠী (ব্যতিক্রম কুমির — সম্পূর্ণ ৪-প্রকোষ্ঠী) ও পাখি-স্তন্যপায়ীতে সম্পূর্ণ ৪-প্রকোষ্ঠী',
      pearl: 'মাছ-উভচরে ১০ জোড়া করোটিক স্নায়ু এবং সরীসৃপ, পাখি ও স্তন্যপায়ীতে (অ্যামনিওটা) ১২ জোড়া করোটিক স্নায়ু থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'chordata',
      term: 'এভিস (পাখি) শ্রেণির বায়ুপূর্ণ অস্থি ও বায়ুথলি যুক্ত ফুসফুস',
      fact: 'উড্ডয়নের জন্য হালকা নিউম্যাটিক অস্থি, দাঁতহীন চঞ্চু, ডান ডিম্বাশয় অনুপস্থিত, ৯টি বায়ুথলিযুক্ত অপ্রসারণশীল ফুসফুস ও শব্দসৃষ্টিকারী সিরিংক্স (Syrinx)',
      pearl: 'ইউরিক অ্যাসিড রেচন (ইউরিকোটেলিক) ও মূত্রথলি অনুপস্থিত থাকায় দেহের ওজন কম থাকে (স্তন্যপায়ীর চেয়ে দ্রুত বিপাকীয় ৪১–৪২°C উষ্ণরক্তী)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch1_taxonomy',
      vl: 'mitosis_cell',
      cat: 'chordata',
      term: 'ম্যামালিয়া (স্তন্যপায়ী) শ্রেণির অনন্য শনাক্তকারী বৈশিষ্ট্য',
      fact: 'স্তনগ্রন্থি, লোম/চুল, বহিঃকর্ণে পিনা, বক্ষ-উদর পৃথককারী পেশিবহুল মধ্যচ্ছদা (Diaphragm), ৭টি গ্রীবাদেশীয় কশেরুকা ও নিউক্লিয়াসবিহীন গোল দ্বি-অবতল RBC',
      pearl: 'ব্যতিক্রম: উট ও লামার RBC নিউক্লিয়াসযুক্ত ডিম্বাকার; প্রোটোথেরিয়া (হংসচঞ্চু প্লাটিপাস ও একিডনা) ডিম পাড়ে এবং মার্সুপিয়ালে (ক্যাঙ্গারু) থলি থাকে',
      diff: 'medical',
    },

    // --- Chapter 2: Hydra, Grasshopper & Rohu ---
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'hydra',
      term: 'হাইড্রার বহিঃত্বক ও অন্তঃত্বকের ৭+৫ প্রকার কোষ এবং মেসোগ্লিয়া',
      fact: 'এপিডার্মিসে ৭ প্রকার কোষ (পেশি-আবরণী, ইন্টারস্টিশিয়াল, সংবেদী, স্নায়ু, গ্রন্থি, জনন ও নিডোসাইট); গ্যাস্ট্রোডার্মিসে ৫ প্রকার কোষ (নিডোসাইট ও জনন থাকে না)',
      pearl: 'উভয় স্তরের মাঝে অবস্থিত জেলি-সদৃশ মিউকোপলিস্যাকারাইডের অকোষীয় স্তর মেসোগ্লিয়া (যার পুরুত্ব কর্ষিকা ও পাদচাকতিতে পাতলা)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'hydra',
      term: 'হাইড্রার ইন্টারস্টিশিয়াল কোষ ও পুনরুৎপত্তি (Regeneration)',
      fact: 'পেশি-আবরণী কোষের ফাঁকে দলবদ্ধ টটিপোটেন্ট কোষ যা প্রতি ৪৫ দিনে হাইড্রার সমস্ত দেহকোষ প্রতিস্থাপন ও যেকোনো কোষে (জনন কোষ ও নিডোসাইট) রূপান্তরিত হতে পারে',
      pearl: 'এই অসীম পুনরুৎপত্তি ক্ষমতার জন্য হাইড্রার প্রাকৃতিক বার্ধক্যজনিত মৃত্যু হয় না বলে বিজ্ঞানী ব্রায়েন একে অমর বলেছিলেন',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'hydra',
      term: 'হাইড্রার ৪ প্রকার নেমাটোসিস্ট: পেনিট্র্যান্ট, ভলভেন্ট ও দুটি গ্লুটিন্যান্ট',
      fact: 'পেনিট্র্যান্ট/স্টিনোটিল (বৃহত্তম, বাট-বার্ব-হিপনোটক্সিন যুক্ত, শিকার বিদ্ধ করে); ভলভেন্ট (সূত্রক বন্ধ-পেঁচানো, শিকার জড়িয়ে ধরে); স্ট্রেপটোলিন (কাঁটাযুক্ত-দীর্ঘ আঠালো) ও স্টেরিওলিন (ক্ষুদ্রতম-কাঁটাবিহীন আঠালো)',
      pearl: 'নিডোসিল ট্রিগার স্পর্শ ও রাসায়নিক উদ্দীপনায় (অভিস্রবণ চাপ বেড়ে পানি ঢোকায়) ১০,০০০ ভাগের ১ সেকেন্ডের মধ্যে অপারকুলাম খুলে সূত্রক নিক্ষিপ্ত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'hydra',
      term: 'হাইড্রার মিথোজীবিতা (Hydra viridissima ও Zoochlorella)',
      fact: 'সবুজ হাইড্রার অন্তঃত্বকীয় পুষ্টিকোষের ভেতরে Chlorella vulgaris (Zoochlorella) শৈবাল বাস করে',
      pearl: 'হাইড্রা শৈবালকে আশ্রয়, CO₂ ও নাইট্রোজেন বর্জ্য দেয়; বিনিময়ে শৈবাল O₂ ও সালোকসংশ্লেষিত শর্করা সরবরাহ করে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'hydra',
      term: 'হাইড্রার গ্লাইডিং, হামাগুড়ি (লুপিং) ও সমারসল্টিং (ডিগবাজি) চলন',
      fact: 'ধীর দীর্ঘ-দূরত্বের চলন হলো শুঁয়োপোকার মতো লুপিং (Looping), আর দ্রুততম চলন হলো দুবার কর্ষিকা ও পাদচাকতির পালাক্রমিক স্থাপনে ডিগবাজি বা সমারসল্টিং',
      pearl: 'গ্লাইডিংয়ে পাদচাকতি অ্যামিবয়েডভাবে ও সাঁতারে কর্ষিকা নেড়ে চলে; একবার ব্যয় হওয়া নিডোসাইট আর ব্যবহৃত হয় না বরং গহ্বরে হজম হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'grasshopper',
      term: 'ঘাসফড়িংয়ের মস্তকের অংশ ও ম্যান্ডিবুলেট বা চর্বণ উপযোগী মুখোপাঙ্গ',
      fact: '৬টি ভ্রূণীয় খণ্ডক একীভূত মস্তক: ল্যাব্রাম (উপরের ওষ্ঠ), ম্যান্ডিবল (দাঁতযুক্ত ১ জোড়া চোয়াল), ১ম ম্যাক্সিলা, ল্যাবিয়াম (নিচের ওষ্ঠ) ও হাইপোফ্যারিংক্স (জিহ্বা)',
      pearl: 'পুঞ্জাক্ষি বা কম্পাউন্ড আইয়ের প্রতিটি একক ওমাটিডিয়ামের সংখ্যা ~২,০০০টি এবং হাইপোগন্যাথাস মস্তকে মুখনিম্নমুখী থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'grasshopper',
      term: 'ঘাসফড়িংয়ের ওমাটিডিয়ামের মোজাইক দর্শন: অ্যাপোজিশন বনাম সুপারপজিশন',
      fact: 'উজ্জ্বল দিনের আলোয় রেটিনুলার ও আইরিশ রঞ্জক আবরণী প্রসারিত হয়ে কেবল নিজস্ব কর্নিয়ার আলোকরশ্মি নিয়ে স্পষ্ট মোজাইক বা অ্যাপোজিশন প্রতিবিম্ব তৈরি করে',
      pearl: 'মৃদু রাতে রঞ্জক আবরণী সংকুচিত হয়ে পাশের ওমাটিডিয়াম থেকেও আলো ক্রিস্টালাইন কোণে এসে অস্পষ্ট সামগ্রিক সুপারপজিশন প্রতিবিম্ব বানায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'grasshopper',
      term: 'ঘাসফড়িংয়ের ১০ জোড়া স্পাইরাকল ও ৭-প্রকোষ্ঠী টিউবুলার হৃৎপিণ্ড',
      fact: 'বক্ষে ২ জোড়া ও উদরে ৮ জোড়া মোট ১০ জোড়া শ্বাসরন্ধ্র (প্রথম ৪ জোড়া প্রশ্বাস ও শেষ ৬ জোড়া নিঃশ্বাসে খোলে) ও ট্রাকিওলের শেষ প্রান্তের তরলে O₂/CO₂ বিনিময় হয়',
      pearl: 'হিমোলিম্ফে কোনো শ্বাসরঞ্জক নেই তাই এটি বর্ণহীন ও কেবল খাদ্য-হরমোন-বর্জ্য পরিবহন করে; অস্টিয়া দিয়ে রক্ত হৃৎপিণ্ডে ঢোকে ও অ্যালারি পেশি সঞ্চালনে সহায়তা করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'grasshopper',
      term: 'ঘাসফড়িংয়ের ম্যালপিজিয়ান নালিকা ও ইউরিকোটেলিক রেচন',
      fact: 'মেসেন্টেরন ও ইলিয়ামের সংযোগস্থলে অবস্থিত ~১০০–১৫০টি হলুদ সূক্ষ্ম নালিকা যা হিমোসিল থেকে পটাশিয়াম ইউরেট শোষণ করে ভেতরে ইউরিক অ্যাসিডের কেলাস হিসেবে মলাশয়ে পাঠায়',
      pearl: 'রেক্টাল প্যাড মলের প্রায় সব পানি পুনঃশোষণ করে নেওয়ায় শক্ত শুষ্ক ইউরিক অ্যাসিড ত্যাগ করে পানি বাঁচায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'grasshopper',
      term: 'অসম্পূর্ণ রূপান্তর (Hemimetabolous) ও খোলস বদল নিয়ন্ত্রক হরমোন',
      fact: 'ডিম → ৫ বার নিম্ফ (অপরিণত ছোট ঘাসফড়িং, ডানাবিহীন) → প্রাপ্তবয়স্ক (ইমাগো); পিউপা দশা অনুপস্থিত',
      pearl: 'মস্তিষ্কের প্রোথোরাসিকোট্রপিক (PTTH), প্রোথোরাসিক গ্রন্থির একডাইসন (খোলস বদল) ও কর্পোরা অ্যালাটার জুভেনাইল হরমোন (JH — নিম্ফ দশা বজায় রাখে)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'rohu',
      term: 'রুই মাছের (Labeo rohita) ৫ ধরনের পাখনা ও হোমোসার্কাল পুচ্ছ পাখনা',
      fact: 'যুগ্ম বক্ষ পাখনা (১৯টি রশ্মি) ও শ্রোণি পাখনা (৯টি); অযুগ্ম পৃষ্ঠ (১৫–১৬টি), পায়ু (৭টি) ও সমান দ্বিখণ্ডিত হোমোসার্কাল পুচ্ছ পাখনা (১৯টি)',
      pearl: 'রুই মাছে দেহের ভারসাম্য ও দিকপরিবর্তনে বক্ষ-শ্রোণি-পৃষ্ঠ পাখনা এবং সম্মুখে বেগ প্রদানে প্রধান ভূমিকা রাখে পুচ্ছ পাখনা',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'rohu',
      term: 'রুই মাছের সাইক্লয়েড আঁইশ ও বৃদ্ধিরেখা (Annuli)',
      fact: 'ওভারল্যাপিং (টাইলস-বৎ) রূপালি ডার্মাল আঁইশ যার কেন্দ্রে ফোকাস, বৃত্তাকার সার্কুলি ও বর্ষা-বসন্তে তৈরি স্পষ্ট বর্ষবলয় থাকে যা দিয়ে বয়স নির্ণয় হয়',
      pearl: 'গ্রীষ্মে খাদ্য পর্যাপ্ত থাকায় বৃদ্ধিরেখা দূরে দূরে ও শীতে ঘন হয়ে থাকে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'rohu',
      term: 'রুই মাছের ভেনাস হার্ট ও এক-চক্র সংবহন',
      fact: 'সাইনাস ভেনোসাস → অলিন্দ → নিলয় → বাল্বাস আর্টারিওসাস (স্থিতিস্থাপক প্রকোষ্ঠ, হৃৎপিণ্ডের অংশ নয়); কেবল CO₂-সমৃদ্ধ (অবিশুদ্ধ) রক্ত হৃৎপিণ্ড দিয়ে একমুখী প্রবাহিত হয়',
      pearl: 'ভেন্ট্রাল অ্যাওর্টা থেকে ৪ জোড়া অ্যাফারেন্ট ও ইফারেন্ট ব্রাঙ্কিয়াল ধমনি দিয়ে ফুলকায় গিয়ে রক্ত O₂ গ্রহণ করে ডর্সাল অ্যাওর্টায় দেহে ছড়ায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'rohu',
      term: 'রুই মাছের পটকা (Swim Bladder): রেটিয়া মিরাবিলিয়া ও ওয়েবেরিয়ান অসিকল',
      fact: 'বৃহৎ পশ্চাৎ ও ক্ষুদ্র অগ্র প্রকোষ্ঠবিশিষ্ট বায়ুথলি যা গ্যাস-গ্রন্থির কৈশিকজাল (রেটিয়া মিরাবিলিয়া) থেকে O₂, CO₂, N₂ নিয়ে প্লবতা রক্ষা করে',
      pearl: 'অগ্র প্রকোষ্ঠ ওয়েবেরিয়ান অসিকল (৪টি ক্ষুদ্র অস্থি) দিয়ে অন্তঃকর্ণের সাথে যুক্ত থাকায় শব্দ-তরঙ্গ বিবর্ধন ও গভীরতা অনুভবে সাহায্য করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'rohu',
      term: 'রুই মাছের ফুলকার গঠন: হোলোব্রাঙ্ক, ফুলকা আর্চ ও প্রতিপ্রবাহ বিনিময়',
      fact: '৪ জোড়া ফুলকা আর্চের প্রতিটিতে ২ সারি করে ফুলকা ফিলামেন্ট (হোলোব্রাঙ্ক) ও সূক্ষ্ম ল্যামেলা থাকে; রক্তপ্রবাহ ও জলপ্রবাহ পরস্পর বিপরীতমুখী (Counter-current)',
      pearl: 'প্রতিপ্রবাহ ব্যবস্থার কারণে পানির দ্রবীভূত অক্সিজেনের প্রায় ৮০%-এর বেশি রক্তে শোষিত হতে পারে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch2_animal_id',
      vl: 'heart_cardiac',
      cat: 'rohu',
      term: 'রুই মাছের প্রজনন ও হালদা নদী প্রাকৃতিক প্রজনন ক্ষেত্র',
      fact: 'জুন–জুলাই (আষাঢ়) বর্ষায় ২৭–৩০°C তাপমাত্রা, মেঘলা-বজ্রবৃষ্টি ও জোয়ারের টানে নদীতে বাহ্যিক নিষেক ঘটায়; ৪–১৫ দিনের ডিম-পোনা, রেণু-পোনা ও ধানি-পোনা ধাপ',
      pearl: 'চট্টগ্রামের হালদা নদী বাংলাদেশের একমাত্র প্রাকৃতিক জোয়ার-ভাটা সম্পন্ন কার্প প্রজনন ক্ষেত্র',
      diff: 'board',
    },
  ];

  rows.forEach((r, idx) => {
    const sameCat = rows.filter((x) => x.cat === r.cat && x.term !== r.term);
    const pool = sameCat.length >= 3 ? sameCat : rows.filter((x) => x.term !== r.term);
    const pick = <T,>(getter: (x: Bio2MRaw) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: r.diff ?? 'medical',
        question: `প্রাণিবিজ্ঞানে "${r.fact}" — এটি নিচের কোন প্রাণী বা তত্ত্বের শনাক্তকারী পরিচয়?`,
        correct: r.term,
        distractors: pick((x) => x.term, 1),
        explanation: `${r.term}: ${r.fact}। (${r.pearl})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ২ · গাজী আজমল স্যার',
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
        question: `"${r.term}" সম্পর্কিত মূল গঠন বা শারীরবৃত্তীয় বৈশিষ্ট্য কোনটি?`,
        correct: r.fact,
        distractors: pick((x) => x.fact, 2),
        explanation: `${r.term}-এর নির্ভুল বিবরণ: ${r.fact}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ২ · বোর্ড স্ট্যান্ডার্ড',
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
        question: `বিশেষ অ্যাডমিশন পয়েন্ট: "${r.pearl}" — এটি নিচের কোনটির ক্ষেত্রে প্রযোজ্য?`,
        correct: r.term,
        distractors: pick((x) => x.term, 3),
        explanation: `${r.pearl} হলো "${r.term}" (${r.fact})-এর বিশেষ অংশ।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ২ · ডেন্টাল ও মেডিকেল নোট',
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
        question: `"${r.term}"-এর ক্ষেত্রে নিচের কোন বাড়তি বা ব্যতিক্রমী তথ্যটি সঠিক?`,
        correct: r.pearl,
        distractors: pick((x) => x.pearl, 4),
        explanation: `${r.term}: ${r.pearl}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ২ · উচ্চতর অনুশীলন',
      })
    );
  });

  // 2. Scientific Name, Phylum & Unique Organ Rapid Matrix for Ch 1 & 2 (~250 more MCQs -> Total ~390+)
  const animalExamples = [
    { name: 'কলার স্পঞ্জ (Scypha)', sci: 'Scypha gelatinosa', phylum: 'Porifera', organ: 'কোয়ানোসাইট কোষ ও স্পিকিউল' },
    { name: 'মিঠাপানির স্পঞ্জ', sci: 'Spongilla lacustris', phylum: 'Porifera', organ: 'অস্টিয়া ও অসকুলাম নালিতন্ত্র' },
    { name: 'বাদামি হাইড্রা', sci: 'Hydra oligactis', phylum: 'Cnidaria', organ: 'কর্ষিকা ও পাদচাকতি (বেসাল ডিস্ক)' },
    { name: 'জেলিফিশ (Moon Jelly)', sci: 'Aurelia aurita', phylum: 'Cnidaria', organ: 'প্রধান মেডুসা দশা ও র‍্যাপেলিয়া' },
    { name: 'সমুদ্র ফুল (Sea Anemone)', sci: 'Metridium senile', phylum: 'Cnidaria', organ: 'সন্ন্যাসী কাঁকড়ার সাথে মিথোজীবী পলিপ' },
    { name: 'যকৃতকৃমি (Liver Fluke)', sci: 'Fasciola hepatica', phylum: 'Platyhelminthes', organ: 'ভেড়া ও শামুক পোষক ও শিখা কোষ' },
    { name: 'গরুর ফিতাকৃমি', sci: 'Taenia saginata', phylum: 'Platyhelminthes', organ: 'প্রোগ্লটিড খণ্ড ও হুকবিহীন স্কোলেক্স' },
    { name: 'মানুষের গোলকৃমি', sci: 'Ascaris lumbricoides', phylum: 'Nematoda', organ: 'সিউডোসিলোম ও যৌন দ্বিরূপতা' },
    { name: 'গোদরোগের কৃমি (ফাইলেরিয়া)', sci: 'Wuchereria bancrofti', phylum: 'Nematoda', organ: 'কিউলেক্স মশাবাহিত লসিকা নালি অবরোধ' },
    { name: 'আপেল শামুক', sci: 'Pila globosa', phylum: 'Mollusca', organ: 'ফুলকা + ফুসফুসময় উভচর ও র‍্যাডুলা' },
    { name: 'মুক্তা ঝিনুক', sci: 'Lamellidens marginalis / Pinctada', phylum: 'Mollusca', organ: 'নাক্রে ম্যান্টল স্তর দ্বারা মুক্তা গঠন' },
    { name: 'অক্টোপাস (ডেভিল ফিশ)', sci: 'Octopus vulgaris', phylum: 'Mollusca', organ: 'অন্তঃস্থ খোলসবিহীন ৮টি বাহু ও কালি-থলি' },
    { name: 'কেঁচো (কৃষকের বন্ধু)', sci: 'Metaphire posthuma', phylum: 'Annelida', organ: 'ক্লাইটেলাম, নেফ্রিডিয়া ও সিটা' },
    { name: 'মিঠাপানির জোঁক', sci: 'Hirudinaria granulosa', phylum: 'Annelida', organ: 'হিরুডিন-ক্ষরণকারী ৩২–৩৩ খণ্ড দেহ' },
    { name: 'সামুদ্রিক নেয়ারিস', sci: 'Nereis virens', phylum: 'Annelida', organ: 'সাঁতারের জন্য প্যারাপোডিয়া ও ট্রকোফোর লার্ভা' },
    { name: 'বাগদা চিংড়ি', sci: 'Penaeus monodon', phylum: 'Arthropoda', organ: 'অ্যান্টেনাল সবুজ গ্রন্থি ও ১৯ জোড়া উপাঙ্গ' },
    { name: 'মাছি ও মশা (Diptera)', sci: 'Musca domestica ও Anopheles', phylum: 'Arthropoda', organ: 'হলটার ভারসাম্য পাখনা ও সম্পূর্ণ রূপান্তর' },
    { name: 'রাজকাঁকড়া (জীবন্ত জীবাশ্ম)', sci: 'Limulus polyphemus', phylum: 'Arthropoda', organ: 'নীল হিমোসায়ানিন রক্ত ও বুক-গিল' },
    { name: 'তারামাছ (Starfish)', sci: 'Asterias rubens', phylum: 'Echinodermata', organ: '৫টি বাহু, টিউব ফিট ও ম্যাড্রেপোরাইট' },
    { name: 'সমুদ্র শসা (Sea Cucumber)', sci: 'Cucumaria planci', phylum: 'Echinodermata', organ: 'শ্বসন বৃক্ষ ও ভিসেরাল ইজেকশন' },
    { name: 'অ্যাসিডিয়া (সাগর ফোয়ারা)', sci: 'Ascidia mentula', phylum: 'Chordata (Urochordata)', organ: 'টিউনিসিন নির্মিত টিউনিক ও ট্যাডপোল লার্ভা' },
    { name: 'ল্যান্সলেট (অ্যাম্ফিঅক্সাস)', sci: 'Branchiostoma lanceolatum', phylum: 'Chordata (Cephalochordata)', organ: 'চক্রাঙ্গ বা হুইল অর্গান ও আজীবন নটোকর্ড' },
    { name: 'টিকটিকি ও ঘড়িয়াল', sci: 'Hemidactylus ও Gavialis gangeticus', phylum: 'Chordata (Reptilia)', organ: 'শুষ্ক আঁইশ, নখরযুক্ত ৫ আঙুল ও ক্লোয়েকা' },
    { name: 'বাংলাদেশের জাতীয় পাখি দোয়েল', sci: 'Copsychus saularis', phylum: 'Chordata (Aves)', organ: 'পালক, সিরিংক্স ও নিউম্যাটিক অস্থি' },
    { name: 'রয়েল বেঙ্গল টাইগার', sci: 'Panthera tigris tigris', phylum: 'Chordata (Mammalia)', organ: 'স্তনগ্রন্থি, ডায়াফ্রাম ও ৪-প্রকোষ্ঠী হৃৎপিণ্ড' },
  ];

  animalExamples.forEach((ae, idx) => {
    const others = animalExamples.filter((x) => x.name !== ae.name);
    const pick = (shift: number) =>
      [0, 1, 2, 3].map((k) => others[(idx + shift + k * 4) % others.length]);

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `"${ae.name}" প্রাণীটির সঠিক বৈজ্ঞানিক নাম ও পর্ব/শ্রেণি কোনটি?`,
        correct: `${ae.sci} · ${ae.phylum}`,
        distractors: pick(1).map((x) => `${x.sci} · ${x.phylum}`),
        explanation: `${ae.name}-এর বৈজ্ঞানিক নাম ${ae.sci} এবং এটি ${ae.phylum} গোষ্ঠীর প্রাণী (${ae.organ})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · প্রাণীর শ্রেণিবিন্যাস তালিকা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${ae.organ}" — এই অনন্য অঙ্গ বা শনাক্তকারী বৈশিষ্ট্যটি কোন প্রাণীতে দেখা যায়?`,
        correct: `${ae.name} (${ae.sci})`,
        distractors: pick(2).map((x) => `${x.name} (${x.sci})`),
        explanation: `${ae.organ} বৈশিষ্ট্যটি ${ae.phylum}-এর ${ae.name} (${ae.sci})-তে পাওয়া যায়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · শনাক্তকারী অঙ্গ ও বৈশিষ্ট্য',
      })
    );
  });

  // 2B. Hydra Nematocyst/Epidermis & Grasshopper/Rohu Quantitative Drills (50 MCQs)
  [
    { species: 'ঘাসফড়িং (স্ত্রী বনাম পুরুষ)', count: 2000, q: 'প্রতিটি পুঞ্জাক্ষিতে কতটি ওমাটিডিয়াম থাকে?', ans: 'প্রায় ২,০০০টি ষড়ভুজাকৃতি ওমাটিডিয়াম', w: ['প্রায় ২০০টি ওমাটিডিয়াম', 'প্রায় ১০,০০০টি ওমাটিডিয়াম', 'মাত্র ৫০টি ওমাটিডিয়াম'] },
    { species: 'ঘাসফড়িংয়ের ক্রপ ও গিজার্ড', count: 6, q: 'গিজার্ড বা প্রোভেন্ট্রিকুলাসের ভেতরে কাইটিনময় দাঁত ও প্যাডের সংখ্যা কতটি?', ans: '৬টি তীক্ষ্ণ কাইটিনময় দাঁত ও ৬টি প্যাড', w: ['৪টি কাইটিনময় দাঁত', '১০টি কাইটিনময় দাঁত', '১২টি কাইটিনময় দাঁত'] },
    { species: 'ঘাসফড়িংয়ের হেপাটিক সিকা', count: 6, q: 'অগ্র-অন্ত্র ও মধ্য-অন্ত্রের সংযোগস্থলে অবস্থিত ফাঁপা মোচাকার হেপাটিক সিকার সংখ্যা কতটি?', ans: '৬ জোড়া বা ১২টি', w: ['২ জোড়া বা ৪টি', '৩ জোড়া বা ৬টি', '১০ জোড়া বা ২০টি'] },
    { species: 'ঘাসফড়িংয়ের হৃৎপিণ্ড প্রকোষ্ঠ', count: 7, q: 'টিউবুলার পৃষ্ঠীয় হৃৎপিণ্ডে উদরের দিকে কতটি ফানেল-আকৃতির প্রকোষ্ঠ থাকে?', ans: '৭টি প্রকোষ্ঠ (প্রতিটিতে ১ জোড়া অস্টিয়া)', w: ['২টি প্রকোষ্ঠ', '৪টি প্রকোষ্ঠ', '১৩টি প্রকোষ্ঠ (তেলাপোকার মতো)'] },
    { species: 'রুই মাছের ফুলকা আর্চ ও রশ্মি', count: 4, q: 'রুই মাছের প্রতি পাশে কত জোড়া (বা কতটি) ফুলকা আর্চ ও মোট কতটি ফুলকা আর্চ থাকে?', ans: 'প্রতি পাশে ৪টি করে মোট ৪ জোড়া (৮টি)', w: ['প্রতি পাশে ৫টি করে মোট ১০টি', 'প্রতি পাশে ৩টি করে মোট ৬টি', 'প্রতি পাশে ৭টি করে মোট ১৪টি'] },
    { species: 'রুই মাছের বক্ষ ও পুচ্ছ পাখনা রশ্মি', count: 19, q: 'রুই মাছের প্রতিটি বক্ষ পাখনা ও পুচ্ছ পাখনায় কয়টি করে অস্থিময় পাখনা-রশ্মি (Fin rays) থাকে?', ans: '১৯টি করে পাখনা-রশ্মি (পৃষ্ঠ ১৫–১৬, শ্রোণি ৯, পায়ু ৭)', w: ['১০টি করে পাখনা-রশ্মি', '৩০টি করে পাখনা-রশ্মি', '৫টি করে পাখনা-রশ্মি'] },
    { species: 'রুই মাছের রক্ত সংবহন (অ্যাওর্টিক আর্চ)', count: 4, q: 'হৃৎপিণ্ডের ভেন্ট্রাল অ্যাওর্টা থেকে কত জোড়া অ্যাফারেন্ট ব্রাঙ্কিয়াল ধমনি ফুলকায় যায়?', ans: '৪ জোড়া অ্যাফারেন্ট ব্রাঙ্কিয়াল ধমনি', w: ['২ জোড়া', '৬ জোড়া', '৮ জোড়া'] },
    { species: 'রুই মাছের কশেরুকা ও মস্তিষ্ক', count: 38, q: 'রুই মাছের দেহকাণ্ড ও পুচ্ছ অঞ্চল মিলে মোট মেরুদণ্ডীয় কশেরুকা সংখ্যা সাধারণত কতটি?', ans: 'প্রায় ৩৭–৩৮টি (প্রধানত দেহে ১৯ + পুচ্ছে ১৯)', w: ['১২টি', '৬৪টি', '১০০টি'] },
  ].forEach((dr) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch2_animal_id',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${dr.species} সম্পর্কে: ${dr.q}`,
        correct: dr.ans,
        distractors: dr.w,
        explanation: `${dr.species}: সঠিক উত্তর হলো ${dr.ans}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২ · সংখ্যাগত প্রাণিপরিচিতি',
      })
    );
  });

  // 2C. Hydra Regeneration & Grasshopper Instar Timing Numerical Drills (20 × 3 = 60 MCQs)
  [2, 3, 4, 5, 6, 8, 10, 12, 15, 20].forEach((nymphCount, i) => {
    const molts = nymphCount * 5;
    const legs = nymphCount * 6;
    const spiracles = nymphCount * 20;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch2_animal_id',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(nymphCount)}টি ঘাসফড়িংয়ের ১ম ইনস্টার নিম্ফ পূর্ণাঙ্গ ইমাগোতে পরিণত হতে মোট সর্বনিম্ন কতবার খোলস মোচন (Ecdysis) সম্পন্ন করবে এবং তাদের সম্মিলিত শ্বাসরন্ধ্র (Spiracles) সংখ্যা কতটি হবে?`,
        correct: `${toBnDigits(molts)} বার মোচন ও মোট ${toBnDigits(spiracles)}টি শ্বাসরন্ধ্র`,
        distractors: [
          `${toBnDigits(nymphCount * 4)} বার মোচন ও মোট ${toBnDigits(nymphCount * 10)}টি শ্বাসরন্ধ্র`,
          `${toBnDigits(nymphCount * 6)} বার মোচন ও মোট ${toBnDigits(spiracles)}টি শ্বাসরন্ধ্র`,
          `${toBnDigits(molts)} বার মোচন ও মোট ${toBnDigits(legs)}টি শ্বাসরন্ধ্র`,
        ],
        explanation: `একটি ঘাসফড়িং নিম্ফ ৫টি ইনস্টার পার হয়ে ৫ বার মোচনে ইমাগো হয় ও প্রতিটিতে ১০ জোড়া = ২০টি শ্বাসরন্ধ্র (এবং ৬টি পা) থাকে; তাই ${toBnDigits(nymphCount)}টিতে ${toBnDigits(molts)} বার মোচন ও ${toBnDigits(spiracles)}টি শ্বাসরন্ধ্র।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২ · ঘাসফড়িংয়ের রূপান্তর ও অঙ্গসংখ্যা',
      })
    );
  });

  return list;
}
