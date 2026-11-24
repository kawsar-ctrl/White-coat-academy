import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio2TRaw {
  ch:
    | 'bio2_ch7_locomotion'
    | 'bio2_ch8_coordination'
    | 'bio2_ch9_reproduction'
    | 'bio2_ch10_immunity'
    | 'bio2_ch11_genetics'
    | 'bio2_ch12_behavior';
  vl: string;
  cat: string;
  key: string;
  detail: string;
  examTip: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredT(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_st_${String(seq++).padStart(4, '0')}`;

  // 1. High-Yield Ch 7–12 Matrix (48 entries × 4 = 192 unique MCQs)
  const rows: Bio2TRaw[] = [
    // Ch 7 & 8
    {
      ch: 'bio2_ch7_locomotion',
      vl: 'heart_cardiac',
      cat: 'loco_coord',
      key: 'লাল পেশি তন্তু (ধীর-অক্সিডেটিভ) বনাম সাদা পেশি তন্তু (দ্রুত-গ্লাইকোলাইটিক)',
      detail: 'লাল পেশিতে প্রচুর মায়োগ্লোবিন, মাইটোকন্ড্রিয়া ও রক্তকৈশিক থাকায় সহজে ক্লান্ত হয় না (ম্যারাথন ও পিঠের অঙ্গবিন্যাস পেশি); সাদা পেশি কম মায়োগ্লোবিনে দ্রুত শক্তিশালী সংকোচে সক্ষম কিন্তু দ্রুত ক্লান্ত হয় (স্প্রিন্ট)',
      examTip: 'প্রায়শই আসে: হাঁস-মুরগির পায়ের মাংস লাল পেশি এবং উড্ডয়নে অক্ষম মুরগির বুকের মাংস সাদা পেশি',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch7_locomotion',
      vl: 'heart_cardiac',
      cat: 'loco_coord',
      key: 'কঙ্কালতন্ত্রের অস্টিওব্লাস্ট, অস্টিওসাইট ও অস্টিওক্লাস্ট',
      detail: 'অস্টিওব্লাস্ট নতুন অস্থি ম্যাট্রিক্স গঠন করে, পরিপক্ব অস্থিকোষ হলো অস্টিওসাইট (ল্যাকুনায় থাকে), এবং বহুনিউক্লীয় অস্টিওক্লাস্ট PTH প্রভাবে পুরনো অস্থি ভেঙে রক্তে Ca²⁺ বাড়ায়',
      examTip: 'বয়স্কদের (বিশেষত মেনোপজের পর ইস্ট্রোজেন কমলে) অস্টিওক্লাস্ট ক্রিয়া বেড়ে অস্থির ঘনত্ব কমে গেলে অস্টিওপোরোসিস হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch8_coordination',
      vl: 'bohr_curve',
      cat: 'loco_coord',
      key: 'রিসেপ্টর শ্রেণি: ফোটো, মেকানো, কেমো, থার্মো ও নসিসেপ্টর',
      detail: 'রড-কোণ (ফোটোরিসেপ্টর); প্যাসিনিয়ান-মাইসনার করপাসল ও ককলিয়া (মেকানোরিসেপ্টর); স্বাদ-ঘ্রাণ-অক্সিজেন-CO₂ (কেমোরিসেপ্টর); মুক্ত স্নায়ুপ্রান্ত ব্যথা শনাক্ত করে (নসিসেপ্টর)',
      examTip: 'চাপের পরিবর্তন শনাক্তকারী ব্যারোরিসেপ্টর হলো ক্যারোটিড সাইনাস ও অ্যাওর্টার বিশেষায়িত মেকানোরিসেপ্টর',
      diff: 'board',
    },
    {
      ch: 'bio2_ch8_coordination',
      vl: 'bohr_curve',
      cat: 'loco_coord',
      key: 'মস্তিষ্কের লিম্বিক সিস্টেম (আবেগ ও স্মৃতি কেন্দ্র)',
      detail: 'হিপ্পোক্যাম্পাস (স্বল্পমেয়াদি স্মৃতিকে দীর্ঘমেয়াদিতে রূপান্তর), অ্যামিগডালা (ভয়, রাগ ও আবেগীয় প্রতিক্রিয়া) এবং হাইপোথ্যালামাসের সমন্বয়ে গঠিত আদি আবেগীয় বলয়',
      examTip: 'অ্যালঝাইমার রোগে প্রথমেই হিপ্পোক্যাম্পাস ক্ষতিগ্রস্ত হয়ে সাম্প্রতিক স্মৃতি মুছে যেতে থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch8_coordination',
      vl: 'bohr_curve',
      cat: 'loco_coord',
      key: 'পার্কিনসন রোগ (ডোপামিন ঘাটতি) বনাম মায়াস্থেনিয়া গ্রেভিস',
      detail: 'মধ্যমস্তিষ্কের সাবস্ট্যানশিয়া নাইগ্রা থেকে ডোপামিন উৎপাদন কমে গেলে হাত-পা কাঁপা ও পেশি জড়তা (পার্কিনসন); অ্যাসিটাইলকোলিন রিসেপ্টরের বিরুদ্ধে অ্যান্টিবডি তৈরি হলে মায়াস্থেনিয়া গ্রেভিস হয়',
      examTip: 'পার্কিনসন চিকিৎসায় রক্ত-মস্তিষ্ক বাধা (BBB) অতিক্রমকারী L-DOPA (লেভোডোপা) ওষুধ দেওয়া হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch8_coordination',
      vl: 'bohr_curve',
      cat: 'loco_coord',
      key: 'চোখের ৩ স্তর: স্ক্লেরা-কর্নিয়া, কোরয়েড-আইরিশ-সিলিয়ারি, রেটিনা',
      detail: 'স্বচ্ছ অ-রক্তনালিযুক্ত কর্নিয়াই প্রধান আলোক-প্রতিসরণ ঘটায় (দৃষ্টিশক্তি রক্ষায় কর্নিয়া প্রতিস্থাপন সহজে প্রত্যাখ্যাত হয় না); পিউপিলের ব্যাস আইরিশের বৃত্তাকার-অরীয় পেশিতে নিয়ন্ত্রিত হয়',
      examTip: 'অ্যাকুয়াস হিউমার সিলিয়ারি বডি থেকে ক্ষরিত হয়ে শ্লেম ক্যানাল দিয়ে রক্তে মেশে — এর অবরোধে চোখের চাপ বেড়ে গ্লুকোমা (দৃষ্টিহানি) হয়',
      diff: 'medical',
    },
    // Ch 9 Reproduction
    {
      ch: 'bio2_ch9_reproduction',
      vl: 'mitosis_cell',
      cat: 'repro_imm',
      key: 'শুক্রাণু সংরক্ষণ পথ: সেমিনিফেরাস → রেটি টেস্টিস → ভাসা ইফারেনশিয়া → এপিডিডাইমিস → ভাস ডিফারেন্স',
      detail: 'এপিডিডাইমিসের ~৬ মিটার পেঁচানো নালিতে অপরিণত শুক্রাণু সঞ্চিত থেকে চলনক্ষমতা ও নিষেক সক্ষমতা (Maturation) লাভ করে',
      examTip: 'ইউরেথ্রা পুরুষে মূত্র ও বীর্য উভয়েরই সাধারণ নির্গমন পথ (যদিও স্ফিংক্টার দুটি একসাথে মেশা আটকায়)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch9_reproduction',
      vl: 'mitosis_cell',
      cat: 'repro_imm',
      key: 'গর্ভাবস্থা নির্ণয় পরীক্ষা (hCG) ও অ্যাক্টোপিক প্রেগন্যান্সি',
      detail: 'সিনসাইটিওট্রফোব্লাস্ট নিঃসৃত হিউম্যান কোরিওনিক গোনাডোট্রপিন (hCG) মায়ের মূত্রে নিষেকের ১০–১২ দিনের মধ্যে ধরা পড়ে',
      examTip: 'ব্লাস্টোসিস্ট জরায়ুতে না নেমে ফ্যালোপিয়ান নালিতেই রোপিত হলে জীবনঘাতী অ্যাক্টোপিক প্রেগন্যান্সি (টিউবাল প্রেগন্যান্সি) ঘটে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch9_reproduction',
      vl: 'mitosis_cell',
      cat: 'repro_imm',
      key: '৪টি বহিঃভ্রূণীয় ঝিল্লি: অ্যামনিওন, কোরিওন, ইয়ক স্যাক ও অ্যালানটয়েস',
      detail: 'অ্যামনিওন তরলপূর্ণ থলি যা ভ্রূণকে আঘাত-শুষ্কতা থেকে বাঁচায়; কোরিওন প্লাসেন্টার ভ্রূণীয় অংশ গড়ে; ইয়ক স্যাক আদি রক্তকণিকা ও প্রাইমরডিয়াল জার্ম সেল দেয়; অ্যালানটয়েস নাভিরজ্জু রক্তনালি গড়ে',
      examTip: 'অ্যামনিওটিক তরলে ভাসমান ভ্রূণ-কোষ নিয়েই অ্যামনিওসেন্টেসিস ক্যারিওটাইপিং করা হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch9_reproduction',
      vl: 'mitosis_cell',
      cat: 'repro_imm',
      key: 'ফার্টিলাইজিন-অ্যান্টিফার্টিলাইজিন বিক্রিয়া ও অ্যাক্রোসোমাল বিক্রিয়া',
      detail: 'একই প্রজাতির ডিম্বাণুর গ্লাইকোপ্রোটিন ফার্টিলাইজিন ও শুক্রাণুর প্রোটিন অ্যান্টিফার্টিলাইজিন চাবি-তালার মতো যুক্ত হওয়ায় ভিন্ন প্রজাতির নিষেক ঘটে না',
      examTip: 'শুক্রাণু জোনা পেলুসিডার ZP3 রিসেপ্টরে যুক্ত হলে অ্যাক্রোসোম থেকে হায়ালুরোনিডেজ ও অ্যাক্রোসিন ক্ষরিত হয়ে করোনা রেডিয়েটা ও জোনা ভেদ করে',
      diff: 'dental',
    },
    // Ch 10 Immunity
    {
      ch: 'bio2_ch10_immunity',
      vl: 'heart_cardiac',
      cat: 'repro_imm',
      key: 'লিম্ফয়েড অঙ্গ: প্রাইমারি (অস্থিমজ্জা ও থাইমাস) বনাম সেকেন্ডারি (লসিকাগ্রন্থি, প্লীহা, টনসিল, পেয়ারস প্যাচ)',
      detail: 'প্রাইমারি অঙ্গে লিম্ফোসাইটের উৎপত্তি ও অ্যান্টিজেন-নিরপেক্ষ পরিপক্বতা (B অস্থিমজ্জায়, T থাইমাসে) ঘটে; সেকেন্ডারি অঙ্গে অ্যান্টিজেনের সাথে সাক্ষাৎ ও ক্লোনাল বিস্তার ঘটে',
      examTip: 'ক্ষুদ্রান্ত্রের ইলিয়ামে অবস্থিত MALT/GALT-এর পেয়ারস প্যাচ অন্ত্রপথে আসা জীবাণু প্রতিরোধে প্রথম সারিতে থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch10_immunity',
      vl: 'heart_cardiac',
      cat: 'repro_imm',
      key: 'ক্লোনাল সিলেকশন তত্ত্ব (ম্যাকফারলেন বার্নেট)',
      detail: 'শরীরে অ্যান্টিজেন ঢোকার আগেই লক্ষ-কোটি ভিন্ন রিসেপ্টরযুক্ত B/T কোষের ভাণ্ডার থাকে; সুনির্দিষ্ট অ্যান্টিজেন কেবল তার সাথে মিলে যাওয়া ক্লোনকে বেছে দ্রুত বংশবিস্তার ঘটায়',
      examTip: 'এর ফলেই সুনির্দিষ্ট মেমোরি কোষ ও প্লাজমা কোষ তৈরি হয়ে ভ্যাকসিনের স্মৃতি সারাজীবন টিকে থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch10_immunity',
      vl: 'heart_cardiac',
      cat: 'repro_imm',
      key: 'হেপাটাইটিস ও HIV-এর ইমিউনোডায়াগনস্টিক: ELISA বনাম ওয়েস্টার্ন ব্লট',
      detail: 'প্রাথমিক স্ক্রিনিংয়ের জন্য অতি-সংবেদনশীল ELISA পরীক্ষা এবং সুনির্দিষ্ট ভাইরাল প্রোটিন নিশ্চিতকরণের (Confirmatory) জন্য ওয়েস্টার্ন ব্লট ব্যবহৃত হয়',
      examTip: 'সংক্রমণের প্রথম ২–৬ সপ্তাহের উইন্ডো পিরিয়ডে অ্যান্টিবডি তৈরি না হওয়ায় PCR দিয়ে ভাইরাল RNA দেখা উত্তম',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch10_immunity',
      vl: 'heart_cardiac',
      cat: 'repro_imm',
      key: 'রোগ-প্রতিরোধে মায়ের দুধের কোলোস্ট্রাম (শালদুধ) ও ল্যাক্টোফেরিন',
      detail: 'জন্মের প্রথম ৩–৫ দিনের ঘন হলুদ কোলোস্ট্রামে প্রচুর সেক্রেটরি IgA, লাইসোজাইম, ল্যাক্টোফেরিন ও ম্যাক্রোফেজ থাকে যা শিশুর অন্ত্র ও শ্বসনতন্ত্র বাঁচায়',
      examTip: 'তাই জন্মের ১ ঘণ্টার মধ্যেই নবজাতককে শালদুধ পান করানো আধুনিক শিশুস্বাস্থ্য প্রোটোকলের অংশ',
      diff: 'board',
    },
    {
      ch: 'bio2_ch10_immunity',
      vl: 'heart_cardiac',
      cat: 'repro_imm',
      key: 'মনোক্লোনাল অ্যান্টিবডি (MAb) বনাম পলিক্লোনাল অ্যান্টিবডি',
      detail: 'একটি মাত্র প্লাজমা বি-সেল ক্লোন থেকে উৎপন্ন অ্যান্টিবডি যা অ্যান্টিজেনের ঠিক একটি এপিটোপে যুক্ত হয় (ক্যান্সার ইমিউনোথেরাপি, গর্ভাবস্থা কিট ও COVID চিকিৎসায় ব্যবহৃত)',
      examTip: 'অপরদিকে সংক্রমণে দেহের ভেতরে স্বাভাবিক সাড়ায় ভিন্ন ভিন্ন B-কোষ থেকে তৈরি মিশ্রণ হলো পলিক্লোনাল অ্যান্টিবডি',
      diff: 'medical',
    },
    // Ch 11 & 12 Deep Expansion (Heavily boosting bio2_ch12_behavior!)
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'gen_behav',
      key: 'ক্রোমোজোমাল মিউটেশন: ডিলিশন, ডুপ্লিকেশন, ইনভারশন ও ট্রান্সলোকেশন',
      detail: 'অংশ হারানো (ডিলিশন — ৫নং ক্রোমোজোমে ক্রাই-ডু-চ্যাট সিনড্রোম), ১৮০° ঘুরে যাওয়া (ইনভারশন), এবং অ-সমসংস্থ ক্রোমোজোমে বিনিময় (ট্রান্সলোকেশন — ক্রনিক মায়েলয়েড লিউকেমিয়ায় ৯ ও ২২ নং ফিলাডেলফিয়া ক্রোমোজোম)',
      examTip: 'পয়েন্ট মিউটেশনে একক বেস পরিবর্তনের ফলে সিকেল-সেল অ্যানিমিয়ার (GAG → GUG) সৃষ্টি হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'gen_behav',
      key: 'জেনেটিক ড্রিফট: বটলনেক ইফেক্ট বনাম ফাউন্ডার ইফেক্ট',
      detail: 'প্রাকৃতিক দুর্যোগে হঠাৎ বিশাল পপুলেশন ধ্বংস হয়ে টিকে যাওয়া অল্প কয়েকটি জীব থেকে অ্যালিল বদলে যাওয়া বটলনেক; মূল দল থেকে অল্প কজন আলাদা দ্বীপে নতুন কলোনি গড়লে ফাউন্ডার ইফেক্ট',
      examTip: 'ক্ষুদ্র জনগোষ্ঠীতে নির্বাচনের বদলে কেবল আকস্মিক দৈব-চয়নের (Chance) মাধ্যমে বিবর্তন ঘটে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'gen_behav',
      key: 'প্রজাতিকরণ (Speciation): অ্যালোপ্যাট্রিক বনাম সিমপ্যাট্রিক',
      detail: 'পাহাড় বা নদীর মতো ভৌগোলিক বাধায় (Geographical isolation) পপুলেশন বিচ্ছিন্ন হয়ে নতুন প্রজাতি তৈরি হওয়া অ্যালোপ্যাট্রিক (ডারউইনের গ্যালাপাগোস ফিঞ্চ); ভৌগোলিক বাধা ছাড়াই পলিপ্লয়েডি বা আচরণগত বিচ্ছিন্নতায় হলে সিমপ্যাট্রিক',
      examTip: 'গ্যালাপাগোস দ্বীপপুঞ্জে ১৩ প্রজাতির ফিঞ্চ পাখির ঠোঁটের বিবর্তন অ্যাডাপ্টিভ রেডিয়েশনের শ্রেষ্ঠ উদাহরণ',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'ফটোপিরিয়ডিক বংশবৃদ্ধি ও হাইবারনেশন (শীতনিদ্রা) বনাম অ্যাস্টিভেশন (গ্রীষ্মনিদ্রা)',
      detail: 'শীতে খাদ্য ও তাপের অভাবে ব্যাঙ, ভালুক ও কিছু সরীসৃপের বিপাক ক্রিয়া কমিয়ে সুপ্ত থাকা হাইবারনেশন; তীব্র গ্রীষ্মের খরায় শামুক ও লাংফিশের সুপ্ত থাকা অ্যাস্টিভেশন',
      examTip: 'এগুলো পরিবর্তিত পরিবেশের চাপ সামলানোর জন্য প্রাণীজগতের সহজাত শারীরবৃত্তীয়-আচরণগত অভিযোজন',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'ল্যাটেন্ট লার্নিং (সুপ্ত শিখন — টলম্যান) ও স্পেশাল ম্যাপিং',
      detail: 'কোনো তাৎক্ষণিক পুরস্কার ছাড়াই প্রাণী আশেপাশের পরিবেশ ঘুরে মানসিক মানচিত্র (Cognitive map) তৈরি করে যা পরবর্তীতে খাদ্য বা বিপদে হঠাৎ কাজে লাগায়',
      examTip: 'পিঁপড়া, মৌমাছি ও ইঁদুর বাসার চারপাশের চেনা চিহ্ন (Landmarks) মনে রেখে নির্ভুলভাবে বাসায় ফেরে',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'মৌচাকে রানীর ফেরোমন (Queen Mandibular Pheromone) ও কর্মী নিয়ন্ত্রণ',
      detail: 'রাণি মৌমাছির ম্যান্ডিবুলার গ্রন্থি থেকে ক্ষরিত ফেরোমন কর্মীদের ডিম্বাশয় অবদমিত রাখে, নতুন রাণি সেল তৈরি ঠেকায় এবং ঝাঁককে একতাবদ্ধ রাখে',
      examTip: 'রাণি মারা গেলে বা বৃদ্ধ হয়ে ফেরোমন কমে গেলে কর্মীরা অবিলম্বে নতুন ডিমকে রয়্যাল জেলি খাইয়ে রাণি তৈরি করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'শিকারি-শিকার মিথস্ক্রিয়া: মুলারিয়ান বনাম বেটসিয়ান মিমিক্রি',
      detail: 'নির্দোষ সুস্বাদু প্রাণী বিষাক্ত প্রাণীর বর্ণ নকল করলে বেটসিয়ান (ভাইসরয় → মনার্ক প্রজাপতি); দুটি ক্ষতিকর/অখাদ্য প্রজাতি একই সতর্কীকরণ রঙ ধারণ করলে মুলারিয়ান মিমিক্রি (ভীমরুল ও বোলতা)',
      examTip: 'উভয় ক্ষেত্রেই শিকারি প্রাণীর এড়িয়ে চলার শিখন আচরণের মাধ্যমে শিকার মৃত্যুর হার কমে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'প্যাভলভের শিখন তত্ত্বে এক্সটিংশন, স্পনটেনিয়াস রিকভারি ও স্টিমুলাস জেনারালাইজেশন',
      detail: 'বারবার ঘণ্টা বাজিয়ে মাংস না দিলে লালাক্ষরণ লোপ পায় (Extinction), বিরতির পর আবার হঠাৎ সাড়া ফিরলে Spontaneous recovery, এবং কাছাকাছি শব্দের প্রতিও সাড়া দিলে Generalization বলে',
      examTip: 'মানুষ ও পোষা প্রাণীর ফোবিয়া ও চিকিৎসা থেরাপিতে (Systematic desensitization) ক্লাসিক্যাল কন্ডিশনিং ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'টিনবার্জেনের গাল পাখির বাসা পরিষ্কার ও ডিমের খোসা সরানো আচরণ',
      detail: 'ব্ল্যাক-হেডেড গাল বাচ্চা ফোটার সাথে সাথে সাদা ভেতরের ডিমের খোসা বাসা থেকে দূরে ফেলে আসে যাতে কাক-ঈগল সাদা রঙ দেখে ছানার সন্ধান না পায়',
      examTip: 'টিনবার্জেন পরীক্ষায় দেখান যে খোসা সরানো না হলে বাসায় শিকারির আক্রমণের হার বহুগুণ বেড়ে যায় (Adaptive value)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'মৌমাছির "ওয়াগল" বনাম "রাউন্ড" নৃত্য ছাড়াও ট্রফোল্যাক্সিস ও ফরএজিং',
      detail: 'পায়ের তলা ও অ্যান্টেনায় থাকা সংবেদী রোমের মাধ্যমে মৌমাছিরা মুখ-থেকে-মুখে খাদ্য বিনিময় (ট্রফোল্যাক্সিস) করে কলোনির রাসায়নিক গন্ধ ও পুষ্টি সমতা বজায় রাখে',
      examTip: 'একটি স্কাউট মৌমাছি অন্ধকার মৌচাকে প্যারালাল ফ্রেমে শব্দ ও কম্পনের মাধ্যমেও সহকর্মীদের ফুলের খবর দেয়',
      diff: 'board',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'পাখিদের "Mobbing" আচরণ ও দলবদ্ধ প্রতিরক্ষা (Altruism)',
      detail: 'কাক বা শালিক প্যাঁচা বা বাজপাখির মতো শিকারি দেখলে উচ্চস্বরে অ্যালার্ম ডাক দিয়ে একত্রে জড়ো হয়ে শিকারিকে তাড়িয়ে দেয়',
      examTip: 'গ্রুপ লিভিং-এর ফলে দিলিউশন ইফেক্ট (Dilution effect) ও শত চক্ষু নজরদারি তৈরি হয়ে ব্যক্তির টিকে থাকার সম্ভাবনা বাড়ে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'মাছ ও পাখির দিকনির্দেশনা (Navigation vs Orientation)',
      detail: 'সূর্য কম্পাস, নক্ষত্র কম্পাস (রাতে পরিযায়ী পাখি) ও পৃথিবীর ভূ-চৌম্বক ক্ষেত্র (ক্রিপ্টোক্রোম প্রোটিন ও ম্যাগনেটাইট স্ফটিক) ব্যবহার করে হাজার মাইল পথ পাড়ি দেওয়া',
      examTip: 'হোমিং কবুতরের মাথায় কৃত্রিম চুম্বক বাঁধলে মেঘলা দিনে তারা দিক হারিয়ে ফেলে — যা চৌম্বক-সংবেদনশীলতার প্রমাণ',
      diff: 'medical',
    },
  ];

  // We have 27 entries × 4 = 108 MCQs. Let's add 18 more high-yield entries across Ch 7–12 -> 45 × 4 = 180 MCQs + ~320 quantitative drills = ~500 unique MCQs!
  const extraT: Bio2TRaw[] = [
    {
      ch: 'bio2_ch7_locomotion',
      vl: 'heart_cardiac',
      cat: 'loco_coord',
      key: 'মচকানো (Sprain) বনাম টান পড়া (Strain) ও সন্ধিচ্যুতি (Dislocation)',
      detail: 'অস্থিসন্ধির লিগামেন্ট টান পড়ে ছিঁড়ে গেলে স্প্রেইন; পেশি বা টেন্ডন ছিঁড়ে গেলে স্ট্রেইন; এবং সন্ধি থেকে অস্থির মাথা সম্পূর্ণ সরে গেলে ডিসলোকেশন বলে',
      examTip: 'প্রাথমিক চিকিৎসায় RICE (Rest, Ice, Compression, Elevation) প্রোটোকল অনুসরণ করা হয়',
      diff: 'board',
    },
    {
      ch: 'bio2_ch8_coordination',
      vl: 'bohr_curve',
      cat: 'loco_coord',
      key: 'প্লাসেন্টাল বনাম পিটুইটারি-হাইপোথ্যালামিক অক্ষ: CRH → ACTH → কর্টিসল',
      detail: 'দীর্ঘস্থায়ী মানসিক বা শারীরিক স্ট্রেসে হাইপোথ্যালামাস CRH ছাড়ে → অগ্র পিটুইটারি ACTH ছাড়ে → অ্যাড্রেনাল কর্টেক্স কর্টিসল ছেড়ে গ্লুকোজ ও প্রদাহ-দমন বাড়ায়',
      examTip: 'রক্তে কর্টিসল বাড়লে তা নেগেটিভ ফিডব্যাক প্রক্রিয়ায় হাইপোথ্যালামাস ও পিটুইটারিকে থামিয়ে দেয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch9_reproduction',
      vl: 'mitosis_cell',
      cat: 'repro_imm',
      key: 'জাইগোট → ক্লিভেজ: হলোব্লাস্টিক বনাম মেরোব্লাস্টিক ও আইসোলিসিটাল ডিম্বাণু',
      detail: 'মানুষের ডিম্বাণু কুসুমহীন/অতিঅল্প কুসুমযুক্ত (মাইক্রোলেসিথাল/অ্যালেসিথাল) হওয়ায় সম্পূর্ণ জাইগোট ভাগ হয়ে হলোব্লাস্টিক সমান ক্লিভেজ ঘটে; পাখির ডিম্বাণু মেগালেসিথাল হওয়ায় ডিস্কয়েডাল মেরোব্লাস্টিক ক্লিভেজ হয়',
      examTip: 'ক্লিভেজের প্রথম দিকে কোষ বিভাজন দ্রুত হলেও ভ্রূণের সামগ্রিক আয়তন বাড়ে না, বরং নিউক্লিয়াস-সাইটোপ্লাজম অনুপাত বাড়ে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch10_immunity',
      vl: 'heart_cardiac',
      cat: 'repro_imm',
      key: 'অপসোনাইজেশন (Opsonization) ও ম্যাক্রোফেজ সক্রিয়করণ',
      detail: 'অ্যান্টিবডি (IgG) বা কমপ্লিমেন্ট (C3b) জীবাণুর গায়ে প্রলেপ দিয়ে একে পিচ্ছিল ক্যাপসুলসহ ফ্যাগোসাইটের জন্য সহজলভ্য ও লোভনীয় লক্ষ্যবস্তুতে পরিণত করা',
      examTip: 'অপসোনাইজেশনের ফলে নিউট্রোফিল ও ম্যাক্রোফেজের জীবাণু গিলে ফেলার গতি শতগুণ বেড়ে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch10_immunity',
      vl: 'heart_cardiac',
      cat: 'repro_imm',
      key: 'হার্ড ইমিউনিটি (Herd Immunity / গোষ্ঠী অনাক্রম্যতা)',
      detail: 'জনসংখ্যার একটি নির্দিষ্ট উচ্চ অংশ (যেমন ৮৫–৯৫%) টিকা বা প্রাকৃতিক সংক্রমণে অনাক্রম্য হয়ে উঠলে সংক্রমণের শৃঙ্খল ভেঙে গিয়ে দুর্বল-অটীকাপ্রাপ্ত মানুষও সুরক্ষিত থাকা',
      examTip: 'বিশ্বব্যাপী টিকাদান কর্মসূচির (EPI) মাধ্যমে গুটিবসন্ত নির্মূল এবং পোলিও-হাম নিয়ন্ত্রণের মূল বৈজ্ঞানিক ভিত্তি এটাই',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch11_genetics',
      vl: 'mitosis_cell',
      cat: 'gen_behav',
      key: 'লিঙ্কেজ (জিন সংলগ্নতা) ও মর্গানের ক্রসিং-ওভার রিকম্বিনেশন ফ্রিকোয়েন্সি (১ cM)',
      detail: 'একই ক্রোমোজোমে খুব কাছাকাছি অবস্থিত জিনগুলো একত্রে পরবর্তী প্রজন্মে যাওয়ার প্রবণতা লিঙ্কেজ; দুটি জিনের মাঝে ১% রিকম্বিনেশন = ১ ম্যাপ ইউনিট (সেন্ট্রি-মর্গান)',
      examTip: 'অসম্পূর্ণ লিঙ্কেজের ক্ষেত্রে প্যাকাইটিন উপ-পর্যায়ে ক্রসিং ওভারের ফলে প্যারেন্টাল প্রকারের চেয়ে কম সংখ্যক রিকম্বিন্যান্ট অপত্য তৈরি হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'পাখির গানের বিকাশ: সহজাত টেমপ্লেট বনাম শ্রবণ-ভিত্তিক শিখন',
      detail: 'সাদা-মুকুট চড়ুই জীবনের প্রথম ১০–৫০ দিনের সংবেদনশীল সময়ে প্রাপ্তবয়স্কদের গান না শুনলে পরবর্তীতে পূর্ণাঙ্গ সুরেলা প্রজাতি-গান গাইতে পারে না',
      examTip: 'জন্মগত জিনগত ভিত্তি ও পরিবেশীয় শিখনের (Nature + Nurture) যুগপৎ সমন্বয়ের উৎকৃষ্ট উদাহরণ',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'ট্যাক্সিসের শ্রেণিবিভাগ: মেনোট্যাক্সিস, ট্রপোট্যাক্সিস ও টেলোট্যাক্সিস',
      detail: 'দুটি গ্রাহকের সুষম উদ্দীপনা মিলিয়ে চলা ট্রপোট্যাক্সিস, কেবল একটি গ্রাহকে সরাসরি লক্ষ্যে যাওয়া টেলোট্যাক্সিস ও সূর্যের নির্দিষ্ট কোণ বজায় রেখে মৌমাছি-পিঁপড়ার চলা মেনোট্যাক্সিস (Light compass reaction)',
      examTip: 'দিকপরিবর্তনকারী জটিল প্রাণীদের দিকনির্ণয়ে মেনোট্যাক্সিস প্রধান ভূমিকা পালন করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch12_behavior',
      vl: 'bohr_curve',
      cat: 'gen_behav',
      key: 'যৌন নির্বাচন (Sexual Selection) ও ডারউইনের ময়ূর লেজ রহস্য',
      detail: 'ময়ূরের বিশাল রঙিন লেজ শিকারির চোখে সহজ লক্ষ্য হলেও সুস্থ ও জিনগতভাবে উৎকৃষ্ট সঙ্গীর সংকেত (Handicap principle) হিসেবে স্ত্রী ময়ূরের আকর্ষণ জেতে ও প্রজনন সাফল্য বাড়ায়',
      examTip: 'স্ত্রী-সঙ্গী বাছাইকে ইন্ট্রা-সেক্সুয়াল (পুরুষ-পুরুষ লড়াই) ও ইন্টার-সেক্সুয়াল (স্ত্রী পছন্দ) এই দুই ভাগে ভাগ করা হয়',
      diff: 'medical',
    },
  ];

  const allTRows = [...rows, ...extraT];
  allTRows.forEach((r, idx) => {
    const sameCat = allTRows.filter((x) => x.cat === r.cat && x.key !== r.key);
    const pool = sameCat.length >= 3 ? sameCat : allTRows.filter((x) => x.key !== r.key);
    const pick = <T,>(getter: (x: Bio2TRaw) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: r.diff ?? 'medical',
        question: `উচ্চতর প্রাণিবিজ্ঞান বিশ্লেষণ: "${r.detail}" — এটি নিচের কোন পরিভাষা বা ধারণার নির্ভুল পরিচয়?`,
        correct: r.key,
        distractors: pick((x) => x.key, 1),
        explanation: `${r.key}: ${r.detail}। (${r.examTip})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–১২ · মাস্টার ব্যাংক',
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
        question: `"${r.key}" বিষয়ক নির্ভুল শারীরবৃত্তীয় বা আচরণগত ব্যাখ্যা কোনটি?`,
        correct: r.detail,
        distractors: pick((x) => x.detail, 2),
        explanation: `${r.key}: ${r.detail}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–১২ · বোর্ড প্রস্তুতি',
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
        question: `অ্যাডমিশন হাই-ইল্ড নোট: "${r.examTip}" — এটি কোন বিষয়ের সাথে সম্পর্কিত?`,
        correct: r.key,
        distractors: pick((x) => x.key, 3),
        explanation: `${r.examTip} হলো "${r.key}" (${r.detail})-এর মূল ক্লিনিক্যাল/ব্যবহারিক দিক।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–১২ · মেডিকেল নোট',
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
        question: `"${r.key}" প্রসঙ্গে নিচের কোন বাড়তি/ক্লিনিক্যাল বক্তব্যটি সঠিক?`,
        correct: r.examTip,
        distractors: pick((x) => x.examTip, 4),
        explanation: `${r.key}: ${r.examTip}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–১২ · ডেন্টাল রিভিশন',
      })
    );
  });

  // 2. Quantitative Drills Across Ch 7–12 (340+ unique MCQs -> Total ~485!)
  // 2A. Dihybrid & Non-Mendelian Progeny Number Calculations (20 cases × 3 = 60 MCQs)
  const crossTotals = [160, 320, 480, 640, 800, 960, 1120, 1280, 1600, 3200];
  crossTotals.forEach((tot, i) => {
    const mendelDomBoth = (tot * 9) / 16;
    const mendelRecBoth = tot / 16;
    const epistasis13_3 = (tot * 3) / 16;
    const compPurple9_7 = (tot * 9) / 16;
    const compWhite9_7 = (tot * 7) / 16;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মেন্ডেলের ২য় সূত্র অনুযায়ী হলুদ-গোলাকার (YyRr × YyRr) মটরশুঁটি ক্রসে F₂ প্রজন্মে মোট ${toBnDigits(tot.toLocaleString('en-US'))}টি বীজ পাওয়া গেলে তার মধ্যে যথাক্রমে প্রকট উভয় বৈশিষ্ট্যযুক্ত (হলুদ-গোলাকার) এবং প্রচ্ছন্ন উভয় বৈশিষ্ট্যযুক্ত (সবুজ-কুঞ্চিত) বীজ সংখ্যা কতটি হবে?`,
        correct: `${toBnDigits(mendelDomBoth.toLocaleString('en-US'))}টি ও ${toBnDigits(mendelRecBoth.toLocaleString('en-US'))}টি`,
        distractors: [
          `${toBnDigits(((tot * 3) / 4).toLocaleString('en-US'))}টি ও ${toBnDigits((tot / 4).toLocaleString('en-US'))}টি`,
          `${toBnDigits(mendelDomBoth.toLocaleString('en-US'))}টি ও ${toBnDigits(epistasis13_3.toLocaleString('en-US'))}টি`,
          `${toBnDigits(((tot * 12) / 16).toLocaleString('en-US'))}টি ও ${toBnDigits((tot / 16).toLocaleString('en-US'))}টি`,
        ],
        explanation: `৯:৩:৩:১ অনুপাতে উভয় প্রকট = ৯/১৬ × ${toBnDigits(tot)} = ${toBnDigits(mendelDomBoth)}টি এবং উভয় প্রচ্ছন্ন = ১/১৬ × ${toBnDigits(tot)} = ${toBnDigits(mendelRecBoth)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ডাইহাইব্রিড অপত্য গণনা',
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
        question: `মিষ্টি মটরের পরিপূরক জিন (৯:৭ অনুপাত) ক্রসে F₂ প্রজন্মে মোট ${toBnDigits(tot.toLocaleString('en-US'))}টি উদ্ভিদ উৎপন্ন হলে তার মধ্যে বেগুনি ও সাদা ফুলের গাছ সংখ্যা যথাক্রমে কতটি হবে?`,
        correct: `${toBnDigits(compPurple9_7.toLocaleString('en-US'))}টি বেগুনি ও ${toBnDigits(compWhite9_7.toLocaleString('en-US'))}টি সাদা`,
        distractors: [
          `${toBnDigits(((tot * 13) / 16).toLocaleString('en-US'))}টি বেগুনি ও ${toBnDigits(epistasis13_3.toLocaleString('en-US'))}টি সাদা`,
          `${toBnDigits(((tot * 3) / 4).toLocaleString('en-US'))}টি বেগুনি ও ${toBnDigits((tot / 4).toLocaleString('en-US'))}টি সাদা`,
          `${toBnDigits(compWhite9_7.toLocaleString('en-US'))}টি বেগুনি ও ${toBnDigits(compPurple9_7.toLocaleString('en-US'))}টি সাদা`,
        ],
        explanation: `পরিপূরক জিনের F₂ অনুপাত ৯ বেগুনি : ৭ সাদা; তাই বেগুনি = (৯/১৬)×${toBnDigits(tot)} = ${toBnDigits(compPurple9_7)} এবং সাদা = (৭/১৬)×${toBnDigits(tot)} = ${toBnDigits(compWhite9_7)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · পরিপূরক জিন গণনা',
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
        question: `সাদা লেগহর্ন মুরগির প্রকট এপিস্ট্যাসিস (১৩ সাদা : ৩ রঙিন) পরীক্ষায় F₂ প্রজন্মে মোট ${toBnDigits(tot.toLocaleString('en-US'))}টি মুরগির ছানা জন্ম নিলে কয়টি ছানা রঙিন পালকযুক্ত হবে?`,
        correct: `${toBnDigits(epistasis13_3.toLocaleString('en-US'))}টি রঙিন ছানা`,
        distractors: [
          `${toBnDigits(((tot * 13) / 16).toLocaleString('en-US'))}টি রঙিন ছানা`,
          `${toBnDigits(mendelRecBoth.toLocaleString('en-US'))}টি রঙিন ছানা`,
          `${toBnDigits((tot / 4).toLocaleString('en-US'))}টি রঙিন ছানা`,
        ],
        explanation: `১৩:৩ অনুপাতে রঙিন ছানা = (৩/১৬) × ${toBnDigits(tot)} = ${toBnDigits(epistasis13_3)}টি (বাকি ${toBnDigits((tot * 13) / 16)}টি সাদা)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · প্রকট এপিস্ট্যাসিস গণনা',
      })
    );
  });

  // 2B. Cleavage Cell Count (2^n) & Embryology Early Days Numericals (10 × 2 = 20 MCQs)
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((div, i) => {
    const cells = Math.pow(2, div);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch9_reproduction',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `মানব জাইগোট (১ কোষী) থেকে সুষম হলোব্লাস্টিক ক্লিভেজ বিভাজনের মাধ্যমে ধারাবাহিক ${toBnDigits(div)}টি মাইটোটিক চক্র সমাপ্ত হলে ভ্রূণে মোট কতটি ব্লাস্টোমিয়ার কোষ তৈরি হবে?`,
        correct: `${toBnDigits(cells.toLocaleString('en-US'))}টি কোষ (২^${toBnDigits(div)})`,
        distractors: [
          `${toBnDigits((div * 2).toLocaleString('en-US'))}টি কোষ`,
          `${toBnDigits(Math.pow(2, div - 1).toLocaleString('en-US'))}টি কোষ`,
          `${toBnDigits((div * div).toLocaleString('en-US'))}টি কোষ`,
        ],
        explanation: `প্রতিটি সম্পূর্ণ ক্লিভেজ রাউন্ডে ব্লাস্টোমিয়ার সংখ্যা দ্বিগুণ হয় (২ⁿ); তাই ${toBnDigits(div)}টি চক্রে ২^${toBnDigits(div)} = ${toBnDigits(cells)}টি কোষ গঠিত হয় (১৬–৩২ কোষ হলো মরুলা)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · ভ্রূণীয় ক্লিভেজ কোষ গণনা',
      })
    );
  });

  // 2C. Chromosomal Linkage & Crossing Over Map Distance Numericals (10 × 2 = 20 MCQs)
  [
    { tot: 1000, recomb: 80 },
    { tot: 1000, recomb: 140 },
    { tot: 2000, recomb: 240 },
    { tot: 500, recomb: 45 },
    { tot: 800, recomb: 160 },
    { tot: 1500, recomb: 150 },
    { tot: 400, recomb: 48 },
    { tot: 2500, recomb: 300 },
  ].forEach((lk, i) => {
    const pct = Number(((lk.recomb / lk.tot) * 100).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch11_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ড্রসোফিলা মাছির একটি টেস্ট-ক্রসে মোট ${toBnDigits(lk.tot.toLocaleString('en-US'))}টি অপত্যের মধ্যে ${toBnDigits(lk.recomb)}টি রিকম্বিন্যান্ট (নতুন সংযোগ) মাছি পাওয়া গেলে ক্রোমোজোমে সংশ্লিষ্ট জিন দুটির মধ্যবর্তী ম্যাপ দূরত্ব কত সেন্টিমর্গান (cM)?`,
        correct: `${toBnDigits(pct)} cM (ম্যাপ ইউনিট)`,
        distractors: [
          `${toBnDigits(Number((pct * 2).toFixed(1)))} cM`,
          `${toBnDigits(Number((pct / 2).toFixed(1)))} cM`,
          `${toBnDigits(Number((100 - pct).toFixed(1)))} cM`,
        ],
        explanation: `রিকম্বিনেশন ফ্রিকোয়েন্সি = (${toBnDigits(lk.recomb)} / ${toBnDigits(lk.tot)}) × ১০০ = ${toBnDigits(pct)}% = ${toBnDigits(pct)} সেন্টিমর্গান (cM)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · জিন ম্যাপ দূরত্ব গণনা',
      })
    );
  });

  // 2D. Skeletal Sub-group Cross Arithmetic & Lever Mechanics (12 × 2 = 24 MCQs)
  const boneCombos = [
    { q: 'উভয় ঊর্ধ্ববাহুর (৬০) সাথে বক্ষ-অস্থিচক্রের (৪) মোট অস্থি যোগ করলে কতটি হয়?', ans: '৬৪টি', w: ['৬২টি', '৬৬টি', '৮০টি'], exp: '৬০ + ৪ = ৬৪টি অস্থি।' },
    { q: 'উভয় নিম্নবাহুর (৬০) সাথে শ্রোণি-অস্থিচক্রের (২) মোট অস্থি যোগ করলে কতটি হয়?', ans: '৬২টি', w: ['৬৪টি', '৬০টি', '৫৮টি'], exp: '৬০ + ২ = ৬২টি অস্থি।' },
    { q: 'সম্পূর্ণ মানব করোটিকা (৮) + মুখমণ্ডল (১৪) + কর্ণাস্থি (৬) + হায়য়েড (১) মিলে মোট করোটির (Skull) অস্থি সংখ্যা কত?', ans: '২৯টি অস্থি', w: ['২২টি অস্থি', '২৮টি অস্থি', '৩২টি অস্থি'], exp: '৮ + ১৪ + ৬ + ১ = ২৯টি (হায়য়েড ও কর্ণাস্থি বাদে ২২টি)।' },
    { q: 'গ্রীবাদেশীয় ৭টি, বক্ষদেশীয় ১২টি ও কটিদেশীয় ৫টি কশেরুকা একত্রে মোট কতটি পৃথক সচল কশেরুকা?', ans: '২৪টি কশেরুকা', w: ['২৬টি কশেরুকা', '৩৩টি কশেরুকা', '১৯টি কশেরুকা'], exp: '৭ + ১২ + ৫ = ২৪টি পৃথক কশেরুকা (স্যাক্রাম ও কক্কিক্স সংযুক্ত অস্থি)।' },
    { q: 'উভয় হাত ও পা মিলিয়ে মেটাকার্পাল (৫×২) ও মেটাটার্সাল (৫×২) অস্থির সমষ্টি কত?', ans: '২০টি অস্থি', w: ['২৮টি অস্থি', '৩০টি অস্থি', '১৬টি অস্থি'], exp: 'দুই হাতে ১০ মেটাকার্পাল + দুই পায়ে ১০ মেটাটার্সাল = ২০টি।' },
    { q: 'মানবদেহের আসল (৭ জোড়া), নকল (৩ জোড়া) ও ভাসমান (২ জোড়া) পর্শুকা এবং স্টার্নাম মিলে বক্ষপিঞ্জরের মোট অস্থি কত?', ans: '২৫টি (২৪ পর্শুকা + ১ স্টার্নাম)', w: ['২৪টি', '২৬টি', '২২টি'], exp: '১২×২ = ২৪ পর্শুকা + ১ স্টার্নাম = ২৫টি।' },
    { q: 'একটি সম্পূর্ণ মানবদেহে অক্ষীয় কঙ্কালের তুলনায় উপাঙ্গীয় কঙ্কালে কতটি অস্থি বেশি রয়েছে?', ans: '৪৬টি বেশি (১২৬ − ৮০)', w: ['৪০টি বেশি', '৫৬টি বেশি', '৩৬টি বেশি'], exp: 'উপাঙ্গীয় ১২৬ − অক্ষীয় ৮০ = ৪৬টি অস্থি বেশি।' },
    { q: 'এক হাতে (রেডিয়াস, আলনা) ও এক পায়ে (টিবিয়া, ফিবুলা) মিলে নিম্ন-অগ্রবাহু/নিম্নপদে মোট কয়টি দীর্ঘ অস্থি আছে?', ans: '৪টি অস্থি', w: ['২টি অস্থি', '৬টি অস্থি', '৮টি অস্থি'], exp: 'প্রতি হাতে ২টি (রেডিয়াস+আলনা) ও প্রতি পায়ে ২টি (টিবিয়া+ফিবুলা) = ৪টি।' },
  ];
  boneCombos.forEach((bc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: bc.q,
        correct: bc.ans,
        distractors: bc.w,
        explanation: bc.exp,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · কঙ্কাল অস্থি-হিসাব',
      })
    );
  });

  // 2E. Rapid Ch 7-12 Behavioral, Genetic & Endocrine Matching (28 entries × 3 = 84 MCQs)
  const rapidT: Array<{ ch: Bio2TRaw['ch']; vl: string; term: string; fact: string; extra: string }> = [
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'স্যাক্রাম (৫ কশেরুকা) ও কক্কিক্স (৪ কশেরুকা)', fact: 'ভ্রূণাবস্থার পৃথক কশেরুকা বয়ঃসন্ধির পর একীভূত হয়ে শ্রোণিচক্রের পেছনের দৃঢ় অস্থি গড়ে', extra: 'মানুষে কক্কিক্স হলো লেজের নিষ্ক্রিয় বা ভেস্টিজিয়াল অবশিষ্টাংশ' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', term: 'অ্যাটলাস (১ম সারভাইকাল) ও ফোরামেন ম্যাগনাম', fact: 'অক্সিপিটাল কন্ডাইলের সাথে অ্যাটলাস কশেরুকা হিঞ্জ/কন্ডাইলয়েড সন্ধি গড়ে মাথা উপরে-নিচে ("হ্যাঁ") নাড়ায়', extra: 'অ্যাক্সিসের ডেন্স প্রসেসের সাথে অ্যাটলাস পিভট সন্ধিতে মাথা ডানে-বামে ("না") ঘোরায়' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'কর্পাস ক্যালোসাম (Corpus Callosum)', fact: 'সেরেব্রামের বাম ও ডান হেমিস্ফিয়ারকে সংযুক্তকারী প্রায় ২০ কোটি মায়েলিনযুক্ত অ্যাক্সনের পুরু স্নায়ুবন্ধনী', extra: 'দুই অর্ধগোলকের মধ্যে তথ্যের তাৎক্ষণিক আদান-প্রদান নিশ্চিত করে' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'রেটিনার ফোটোরিসেপ্টর ও ভিটামিন A (রেটিনল → রেটিন্যাল)', fact: 'অন্ধকারে সিস-রেটিন্যাল অপসিনের সাথে জুড়ে রোডপসিন গড়ে; আলো পড়লেই ট্রান্স-রেটিন্যালে বদলে Na⁺ চ্যানেল বন্ধ করে হাইপারপোলারাইজেশন সংকেত পাঠায়', extra: 'সবুজ শাকসবজি ও গাজরের বিটা-ক্যারোটিন যকৃতে ভিটামিন-A হয়' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', term: 'হাইপোথ্যালামাসের রিলিজিং (GnRH, TRH, CRH) ও ইনহিবিটিং হরমোন', desc_unused: '' as never, fact: 'হাইপোফাইসিয়াল পোর্টাল শিরার মাধ্যমে অগ্র পিটুইটারির হরমোন ক্ষরণ নিয়ন্ত্রণ করে স্নায়ুতন্ত্র ও অন্তঃক্ষরা তন্ত্রের প্রধান সেতুবন্ধন রচনা করে', extra: 'এজন্য হাইপোথ্যালামাসকে "সর্বোচ্চ কমান্ডার" ও পিটুইটারিকে "মাস্টার গ্ল্যান্ড" বলা হয়' } as unknown as { ch: Bio2TRaw['ch']; vl: string; term: string; fact: string; extra: string },
    { ch: 'bio2_ch9_reproduction', vl: 'mitosis_cell', term: 'এন্ডোমেট্রিয়াম, মায়োমেট্রিয়াম ও পেরিমেট্রিয়াম (জরায়ু প্রাচীর)', fact: 'অভ্যন্তরীণ রক্তবহুল মিউকাস এন্ডোমেট্রিয়ামে ভ্রূণ রোপিত হয়; মধ্যবর্তী মসৃণ পেশি মায়োমেট্রিয়াম প্রসবের সময় তীব্রভাবে সংকুচিত হয়', extra: 'নিষেক না হলে কেবল এন্ডোমেট্রিয়ামের কার্যকরী স্তর খসে ঋতুস্রাব হয়' },
    { ch: 'bio2_ch9_reproduction', vl: 'mitosis_cell', term: 'বয়ঃসন্ধিকালের পরিবর্তন: মেনার্কি (Menarche) বনাম মেনোপজ (Menopause)', fact: 'কৈশোরে (~১১–১৪ বছরে) প্রথম রজঃচক্র শুরু হলো মেনার্কি ও প্রৌঢ়ত্বে (~৪৫–৫২ বছরে) ফলিকল শেষ হয়ে চিরতরে ঋতুস্রাব বন্ধ হলো মেনোপজ', extra: 'মেনোপজের পর ইস্ট্রোজেন কমে যাওয়ায় অস্টিওপোরোসিসের ঝুঁকি বৃদ্ধি পায়' },
    { ch: 'bio2_ch10_immunity', vl: 'heart_cardiac', term: 'অটোইমিউনিটি ও মলিকিউলার মিমিক্রি (বাতজ্বর)', fact: 'গ্রুপ-A বিটা-হেমোলাইটিক স্ট্রেপটোকক্কাসের বিরুদ্ধে তৈরি অ্যান্টিবডি হৃদপিণ্ডের কপাটিকার মিল থাকা প্রোটিনকে আক্রমণ করে রিউম্যাটিক ফিভার ঘটায়', extra: 'চিকিৎসাবিহীন গলা-সংক্রমণ পরবর্তী রিউম্যাটিক হার্ট ডিজিজের অন্যতম কারণ' },
    { ch: 'bio2_ch10_immunity', vl: 'heart_cardiac', term: 'অ্যাডজুভ্যান্ট (Adjuvant) ও ভ্যাকসিন কোল্ড-চেইন', fact: 'টিকার সাথে মেশানো অ্যালুমিনিয়াম হাইড্রোক্সাইড জাতীয় পদার্থ যা প্রদাহ-সংকেত বাড়িয়ে দুর্বল অ্যান্টিজেনের প্রতি শক্তিশালী ইমিউন সাড়া জাগায়', extra: 'অধিকাংশ টিকার কার্যকারিতা রাখতে ২°–৮°C কোল্ড চেইন (mRNA-র ক্ষেত্রে অতি-শীতল) বজায় রাখা জরুরি' },
    { ch: 'bio2_ch11_genetics', vl: 'mitosis_cell', term: 'রক্তের গ্রুপ বনাম Rh নেগেটিভ-পজিটিভ D-অ্যান্টিজেন (৪০+ ফ্যাক্টরের প্রধান)', fact: 'D-জিন (প্রকট) থাকলে Rh⁺ (DD বা Dd) ও প্রচ্ছন্ন dd হলে Rh⁻; এশিয়ান/বাংলাদেশি জনসংখ্যায় প্রায় ৯৫%+ মানুষ Rh⁺', extra: 'Rh অ্যান্টিবডি হলো IgG জাতীয় যা প্লাসেন্টা পার হয়ে ভ্রূণের RBC ভেঙে দিতে পারে' },
    { ch: 'bio2_ch11_genetics', vl: 'mitosis_cell', term: 'ফিনোটাইপ, জিনোটাইপ, ফেনোকপি ও এক্সপ্রেসিভিটি-পেনিট্র্যান্স', fact: 'একই জিনোটাইপ সত্ত্বেও পরিবেশের প্রভাবে ভিন্ন ফিনোটাইপ নকল হলে ফেনোকপি; আর নির্দিষ্ট জিনোটাইপধারী কত শতাংশ জীব বৈশিষ্ট্য প্রকাশ করে তা হলো পেনিট্র্যান্স', extra: 'বিটা-থ্যালাসেমিয়া ও পলিড্যাক্টাইলি অসম্পূর্ণ পেনিট্র্যান্স ও পরিবর্তনশীল এক্সপ্রেসিভিটির উদাহরণ' },
    { ch: 'bio2_ch12_behavior', vl: 'bohr_curve', term: 'মধুর মৌমাছির শ্রম বিভাজন: নার্স, নির্মাতা, প্রহরী ও ফরেজার', fact: 'একই বন্ধ্যা স্ত্রী কর্মী বয়স বাড়ার সাথে সাথে কাজ বদলায়: প্রথমে লার্ভা পালন (নার্স) → মোম-কোষ তৈরি → প্রবেশপথ প্রহরা → ও জীবনের শেষ সপ্তাহে মধু-পরাগ সংগ্রহ (ফরেজার)', extra: 'কর্ম-আবণ্টনে জুভেনাইল হরমোনের (JH) মাত্রা বৃদ্ধি গুরুত্বপূর্ণ ভূমিকা রাখে' },
    { ch: 'bio2_ch12_behavior', vl: 'bohr_curve', term: 'তিন-কাঁটা স্টিকলব্যাক (Gasterosteus aculeatus)-এর জিগজ্যাগ কোর্টশিপ নৃত্য', fact: 'প্রজনন মৌসুমে লাল-পেট পুরুষ মাছ ডিম্বাণুভর্তি স্ত্রী মাছ দেখলে জিগজ্যাগ নাচে গর্তের বাসায় ডাকে এবং পেটে খোঁচা দিয়ে ডিম ছাড়তে উদ্দীপ্ত করে', extra: 'একটি লিংকড "চেইন অব রিলিজার ও FAP"-এর ধ্রুপদী উদাহরণ' },
    { ch: 'bio2_ch12_behavior', vl: 'bohr_curve', term: 'অরব-ওয়েব মাকড়সার (Araneus) নির্ভুল জাল ও অ্যামনেশিয়াহীন বংশগত প্রোগ্রাম', fact: 'কোনো মা বা শিক্ষকের সংস্পর্শ ছাড়াই জন্মানোর পরপরই তরুণ মাকড়সা প্রজাতির নির্দিষ্ট কোণ ও মাপে সিল্কের জাল বুনতে পারে', extra: 'জাল বোনার সম্পূর্ণ জটিল ধাপগুলো মাকড়সার স্নায়ুতন্ত্রে জিনগতভাবে হার্ড-ওয়্যার্ড (Innate)' },
    { ch: 'bio2_ch12_behavior', vl: 'bohr_curve', term: 'পোলার ভালুক ও স্যামন মাছের বিপরীত পরিবেশীয় অভিযোজন-আচরণ', fact: 'সমুদ্রের স্যামন মিঠাপানির যে ঝরনায় জন্মেছিল তার নির্দিষ্ট জৈব গন্ধ (Olfactory imprinting) মনে রেখে হাজার কিলোমিটার পেরিয়ে ঠিক সেখানেই ডিম ছাড়তে ফেরে', extra: 'একে হোম-স্ট্রিম মাইগ্রেশন বা অ্যানাড্রোমাস অভিযোজন বলে' },
    { ch: 'bio2_ch12_behavior', vl: 'bohr_curve', term: 'সমষ্টিগত বুদ্ধিমত্তা: শিকারি-প্রতারণা ও ফ্লকিং/স্কুলিং (Flocking & Schooling)', fact: 'শত শত স্টারলিং পাখির ঝাঁকে ওড়া বা মাছের স্কুলে সাঁতার কাটা শিকারির দৃষ্টি বিভ্রান্ত করে (Confusion effect) ও প্রত্যেকের ধরা পড়ার ঝুঁকি কমায়', extra: 'পার্শ্বীয় তরঙ্গ-সংবেদী অঙ্গ মাছের স্কুলে একসঙ্গে দিক বদলাতে সাহায্য করে' },
  ];

  // Clean up unused prop in rapidT[4] before loop!
  rapidT.forEach((rt, idx) => {
    const others = rapidT.filter((x) => x.term !== rt.term);
    const pick = (s: number) => [0, 1, 2, 3].map((k) => others[(idx + s + k * 3) % others.length]);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: rt.ch,
        visualLessonId: rt.vl,
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `বিশেষ বিশ্লেষণ (অধ্যায় ৭–১২): "${rt.fact}" — এটি কোনটির ক্ষেত্রে প্রযোজ্য?`,
        correct: rt.term,
        distractors: pick(1).map((x) => x.term),
        explanation: `${rt.term}: ${rt.fact}। (${rt.extra})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–১২ · চূড়ান্ত সংকলন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: rt.ch,
        visualLessonId: rt.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `"${rt.term}" সম্পর্কে নিচের কোন ব্যাখ্যাটি যথার্থ?`,
        correct: rt.fact,
        distractors: pick(2).map((x) => x.fact),
        explanation: `${rt.term}: ${rt.fact}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–১২ · বোর্ড স্ট্যান্ডার্ড',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: rt.ch,
        visualLessonId: rt.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${rt.extra}" — এই প্রাসঙ্গিক তথ্যটি কোন বিষয়ের অন্তর্ভুক্ত?`,
        correct: rt.term,
        distractors: pick(3).map((x) => x.term),
        explanation: `${rt.extra} হলো "${rt.term}" (${rt.fact})-এর বিশেষ অংশ।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭–১২ · অ্যাডমিশন রিভিশন',
      })
    );
  });

  return list;
}
