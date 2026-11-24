import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface ReproBiotechRow {
  ch: 'bio1_ch10_reproduction' | 'bio1_ch11_biotech';
  vl: string;
  cat: string;
  term: string;
  def: string;
  pearl: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio1StructuredK(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio1_sk_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 10 (Plant Reproduction) + Ch 11 (Biotechnology): 85 × 4 = 340 unique MCQs
  const rows: ReproBiotechRow[] = [
    // --- Chapter 10: Plant Reproduction ---
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'পরাগধানীর ট্যাপেটাম (Tapetum)',
      def: 'মাইক্রোস্পোরাঞ্জিয়ামের অভ্যন্তরীণ পুষ্টিদায়ক কোষস্তর যা বৃদ্ধিপ্রাপ্ত পরাগরেণুকে পুষ্টি, ইউবিস্ক বডি ও স্পোরোপোলেনিন সরবরাহ করে',
      pearl: 'বহু-নিউক্লীয় পলিপ্লয়েড কোষ নিয়ে গঠিত ও ক্যালোজ বিগলনকারী ক্যালেজ এনজাইম ক্ষরণ করে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'এন্ডোথেসিয়াম (Endothecium)',
      def: 'পরাগধানীর এপিডার্মিসের নিচে অবস্থিত অরীয় প্রাচীরে আলফা-সেলুলোজ ব্যান্ডযুক্ত স্তর যা পরাগধানী বিদারণে (Dehiscence) প্রধান ভূমিকা রাখে',
      pearl: 'যে পাতলা প্রাচীরযুক্ত কোষরেখা বরাবর পরাগধানী ফেটে পরাগরেণু বের হয় তাকে স্টোমিয়াম (Stomium) বলে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'পরাগরেণুর এক্সাইন ও ইন্টাইন',
      def: 'স্পোরোপোলেনিন-নির্মিত পুরু, নকশাদার বহিঃস্তর হলো এক্সাইন (জার্মপোরে অনুপস্থিত) এবং পেকটিন-সেলুলোজ নির্মিত পাতলা অন্তঃস্তর হলো ইন্টাইন',
      pearl: 'পরাগনালি (Pollen tube) জার্মপোর দিয়ে ইন্টাইনের প্রসারণের ফলে নির্গত হয়; স্পোরোপোলেনিনের কারণে পরাগ জীবাশ্ম টিকে থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'নিউসেলার ও ইন্টেগুমেন্ট: মুখী (Orthotropous) বনাম অধোমুখী (Anatropous) ডিম্বক',
      def: 'ডিম্বকরন্ধ্র, ডিম্বকমূল ও ডিম্বকনাভি একই সরলরেখায় খাড়া থাকলে মুখী (পান, গোলমরিচ); ১৮০° বাঁকা হয়ে ডিম্বকনাভির পাশে থাকলে অধোমুখী (শিম, সরিষা, ৮০% আবৃতবীজী)',
      pearl: 'অর্ধ-অধোমুখী (Hemianatropous) দেখা যায় রেনানকুলাসে ও বক্রমুখী (Campylotropous) দেখা যায় সরিষা-কালকাসুন্দে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'পলিগনাম (Polygonum) ধরনের মনোপোরিক ভ্রূণথলি (Embryo Sac)',
      def: '১টি সক্রিয় মেগাস্পোর থেকে ৩ বার মুক্ত-নিউক্লীয় মাইটোসিসে গঠিত ৭ কোষ ও ৮ নিউক্লিয়াসবিশিষ্ট পরিণত স্ত্রী গ্যামিটোফাইট',
      pearl: 'ডিম্বকরন্ধ্র প্রান্তে ১টি ডিম্বাণু ও ২টি সহকারী কোষ (গর্ভযন্ত্র), কেন্দ্রে ২টি পোলার নিউক্লিয়াসযুক্ত সেকেন্ডারি কোষ এবং ডিম্বকমূলে ৩টি প্রতিপাদ কোষ',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'সহকারী কোষের ফিলিফর্ম অ্যাপারেটাস (Filiform Apparatus)',
      def: 'সিনার্জিড কোষের ডিম্বকরন্ধ্র প্রান্তের আঙুলের মতো কোষপ্রাচীরের ভাঁজ যা রাসায়নিক সংকেতের (ক্যালসিয়াম-বোরন/ল্যুর প্রোটিন) মাধ্যমে পরাগনালিকে পথ দেখায়',
      pearl: 'একটি সিনার্জিড কোষ ভেঙে পরাগনালি ভ্রূণথলির ভেতরে দুটি পুং-গ্যামেট মুক্ত করে',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'pollination',
      term: 'জেনোগ্যামি (Xenogamy), অটোগ্যামি (Autogamy) ও গেইটেনোগ্যামি (Geitonogamy)',
      def: 'একই ফুলে পরাগায়ন অটোগ্যামি, একই গাছের ভিন্ন ফুলে গেইটেনোগ্যামি (জিনগতভাবে স্ব-পরাগায়ন) এবং ভিন্ন দুটি গাছের ফুলে পরাগায়ন জেনোগ্যামি (প্রকৃত পর-পরাগায়ন)',
      pearl: 'পরাগায়ন-নির্ভর বৈচিত্র্য ও বিবর্তনে জেনোগ্যামি সবচেয়ে কার্যকর ভূমিকা রাখে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'pollination',
      term: 'স্ব-পরাগায়ন প্রতিরোধী কৌশল: হার্কোগ্যামি, হেটারোস্টাইলি ও ডাইকোগ্যামি',
      def: 'ভৌত বাধা থাকলে হার্কোগ্যামি (আকন্দ); ভিন্ন দৈর্ঘ্যের গর্ভদণ্ড-পুংদণ্ড হলে হেটারোস্টাইলি (প্রিমুলা); ও পুং-স্ত্রী স্তবকের অসম পরিণতি হলে ডাইকোগ্যামি',
      pearl: 'পুংকেশর আগে পাকলে প্রোটান্ড্রি (জবা, সূর্যমুখী, ধনে) ও গর্ভপত্র আগে পাকলে প্রোটোগাইনি (কচু, মিরাবিলিস, বট)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'pollination',
      term: 'ক্লেইস্টোগ্যামাস (বদ্ধ পুষ্প) ও চ্যাসমোগ্যামাস (উন্মুক্ত পুষ্প)',
      def: 'জীবনে কখনো না ফোটা বদ্ধ ফুল ক্লেইস্টোগ্যামাস (যেমন কানশিরা Commelina, চিনাবাদাম ও ভায়োলা) যেখানে শতভাগ স্ব-পরাগায়ন নিশ্চিত থাকে',
      pearl: 'পরাগায়নকারীর অনুপস্থিতিতেও ক্লেইস্টোগ্যামাস ফুলে নিয়মিত বীজ উৎপন্ন হয়',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'pollination',
      term: 'জলপরাগী (পাতাশেওলা Vallisneria), বায়ুপরাগী (ধান), পতঙ্গপরাগী ও বাদুড়পরাগী ফুল',
      def: 'বায়ুপরাগী ধানে পালকের মতো গর্ভমুণ্ড ও হালকা মসৃণ পরাগরেণু; পাতাশেওলায় পানির তলে বা পৃষ্ঠে পরাগায়ন; কদম-শিমুল-কলায় কাইরোপ্টেরোফিলি (বাদুড়)',
      pearl: 'শামুক দ্বারা পরাগায়নকে ম্যালাকোফিলি (কচু) ও পাখি দ্বারা অর্নিথোফিলি (শিমুল, পলাশ, মান্দার) বলা হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'দ্বিনিষেক (Double Fertilization) ও ত্রিমিলন (Triple Fusion)',
      def: 'নাওয়াশিন (S.G. Nawaschin, ১৮৯৮) Lilium ও Fritillaria-তে আবিষ্কার করেন: ১টি শুক্রাণু (n) + ডিম্বাণু (n) → জাইগোট (2n) এবং ২য় শুক্রাণু (n) + সেকেন্ডারি নিউক্লিয়াস (2n) → শস্য (3n)',
      pearl: 'একমাত্র আবৃতবীজী (Angiosperm) উদ্ভিদেই দ্বিনিষেক ও ট্রিপ্লয়েড (3n) শস্য উৎপন্ন হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'পোরোগ্যামি, চ্যালাজোগ্যামি ও মেসোগ্যামি',
      def: 'পরাগনালি ডিম্বকরন্ধ্র (Micropyle) দিয়ে ঢুকলে পোরোগ্যামি (অধিকাংশ আবৃতবীজী), ডিম্বকমূল দিয়ে ঢুকলে চ্যালাজোগ্যামি (ঝাউ Casuarina) ও ডিম্বকত্বক ভেদ করলে মেসোগ্যামি (কুমড়া)',
      pearl: 'ট্রুবে (Treub) প্রথম ঝাউ গাছে চ্যালাজোগ্যামি পর্যবেক্ষণ করেন',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'নিষেকের পর ফুলের অংশগুলোর রূপান্তর (ডিম্বক → বীজ; গর্ভাশয় → ফল)',
      def: 'বাইরের ইন্টেগুমেন্ট → বীজত্বক টেসটা; ভেতরের ইন্টেগুমেন্ট → টেগমেন; গর্ভাশয় প্রাচীর → ফলত্বক (পেরিকার্প); ওভুল স্টক → বীজবৃন্ত',
      pearl: 'নিউসেলাস সাধারণত ক্ষয় হয় তবে গোলমরিচ, বীট ও শাপলায় পাতলা আবরণ পেরিস্পার্ম (Perisperm, 2n) হিসেবে থেকে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'ভ্রূণের সাসপেনসর (Suspensor) ও হস্টোরিয়াম',
      def: 'প্রথম জাইগোটিক বিভাজনে সৃষ্ট ব্যাসাল কোষ থেকে ৬–১০ কোষী সাসপেনসর তৈরি হয় যা ভ্রূণকে পুষ্টিকর শস্যকলার গভীরে ঠেলে দেয়',
      pearl: 'অপর টার্মিনাল কোষটি (ভ্রূণকোষ) হৃৎপিণ্ডাকার হয়ে প্রকৃত ভ্রূণে বিকশিত হয়',
      diff: 'board',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'পার্থেনোজেনেসিস (অনিষিক্ত জনন) বনাম অ্যাপোস্পোরি ও অ্যাডভেন্টিভ এম্ব্রায়োনি',
      def: 'অনিষিক্ত ডিম্বাণু থেকে ভ্রূণ তৈরি হওয়া হলো পার্থেনোজেনেসিস (Solanum nigrum, কলা, তামাক); মিয়োসিস ছাড়াই রেনুধর কোষ (2n) থেকে সরাসরি গ্যামিটোফাইট হলে অ্যাপোস্পোরি',
      pearl: 'ডিম্বকের নিউসেলাস বা ইন্টেগুমেন্ট (2n) থেকে একাধিক ভ্রূণ তৈরি হলে (লেবু, আম) তাকে অ্যাডভেন্টিভ পলিএমব্রায়োনি বলে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'কৃত্রিম সংকরায়নে ইমাস্কুলেশন (পুরুষত্বহীনকরণ) ও ব্যাগিং',
      def: 'উভলিঙ্গ ফুল কুঁড়ি অবস্থায় থাকতে পরাগধানী অপসারণ করা হলো ইমাস্কুলেশন এবং অবাঞ্ছিত পরাগরেণু ঠেকাতে পলিথিন/কাগজে ঢেকে রাখা হলো ব্যাগিং',
      pearl: 'ধান, গম ও পাটের উচ্চফলনশীল হাইব্রিড (যেমন হাইব্রিড ধান, তোষা পাট) উদ্ভাবনে এই ধাপ অপরিহার্য',
      diff: 'board',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'জেনিয়া (Xenia) ও মেটাজেনিয়া (Metaxenia) প্রভাব',
      def: 'ভুট্টার শস্যে পরাগরেণুর জিনগত প্রভাব সরাসরি শস্যের বর্ণে প্রকাশ পাওয়াকে জেনিয়া (যেমন সাদা ভুট্টায় বেগুনি দানা) ও মাতৃটিস্যু ফলত্বকে প্রকাশ পেলে মেটাজেনিয়া বলে',
      pearl: 'জেনিয়া প্রভাবের কারণ হলো শস্য (3n) গঠনে পিতৃগ্যামেটের (n) সরাসরি সংমিশ্রণ',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'প্রাকৃতিক অঙ্গজ প্রজনন: পাথরকুচি পাতা, কন্দ, রাইজোম ও রানার',
      def: 'পাথরকুচির (Bryophyllum) পাতার কিনারায় অস্থানিক মুকুল, আদা-হলুদের রাইজোম, কচুরিপানার অফসেট, ও শুশনি-দূর্বাঘাসের রানার',
      pearl: 'পটোল ও মিষ্টি আলুতে রূপান্তরিত মূলের সাহায্যে অঙ্গজ জনন ঘটে; এবং কলমে (Grafting) নিচের অংশ স্টক ও উপরের অংশ সায়ন (Scion)',
      diff: 'board',
    },

    // --- Chapter 11: Biotechnology ---
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'tissue_culture',
      term: 'টটিপোটেন্সি (Totipotency) ও গোতলিয়ব হ্যাবারল্যান্ড (১৯০২)',
      def: 'প্রতিটি সজীব উদ্ভিদ কোষের একটি সম্পূর্ণ বহুকোষী উদ্ভিদে রূপান্তরিত হওয়ার সহজাত ক্ষমতা; হ্যাবারল্যান্ডকে উদ্ভিদ টিস্যু কালচারের জনক বলা হয়',
      pearl: 'হোয়াইট, স্কুগ-মিলার ও মুর্শিগে-স্কুগ (MS মিডিয়াম) পরবর্তীতে পূর্ণাঙ্গ টিস্যু কালচার প্রতিষ্ঠা করেন',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'tissue_culture',
      term: 'মেরিস্টেম কালচার (রোগমুক্ত চারা উৎপাদন)',
      def: 'উদ্ভিদের শীর্ষমুকুল ভাজক টিস্যুতে (Apical meristem) ভাস্কুলার বান্ডল না থাকা ও দ্রুত কোষ বিভাজনের কারণে ভাইরাস প্রবেশ করতে পারে না',
      pearl: 'তাই গোলআলু, কলা ও স্ট্রবেরির ভাইরাসমুক্ত চারা তৈরিতে ০.২–০.৫ mm মেরিস্টেম এক্সপ্লান্ট ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'tissue_culture',
      term: 'প্রোটোপ্লাস্ট ফিউশন ও সোমাটিক হাইব্রিড (যেমন Pomato)',
      def: 'সেলুলেজ ও পেকটিনেজ এনজাইম দিয়ে কোষপ্রাচীর গলিয়ে নগ্ন প্রোটোপ্লাস্ট তৈরি ও PEG (পলিইথিলিন গ্লাইকল) বা ইলেকট্রো-ফিউশনে দুটি প্রজাতি মেলানো',
      pearl: 'আলু (Solanum tuberosum) ও টমেটো (Lycopersicon)-র প্রোটোপ্লাস্ট ফিউশনে সৃষ্টি হয় পোম্যাটো (Pomato); সাইটোপ্লাজম মিলনে তৈরি হয় সাইব্রিড (Cybrid)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'tissue_culture',
      term: 'অ্যান্থার/মাইক্রোস্পোর কালচার (হ্যাপ্লয়েড ও হোমোজাইগাস ডিপ্লয়েড উদ্ভিদ)',
      def: 'পরাগরেণু বা অ্যান্থার কালচার করে হ্যাপ্লয়েড (n) চারা উৎপাদন ও কলচিসিন (Colchicine) প্রয়োগে ক্রোমোজোম দ্বিগুণ করে শতভাগ হোমোজাইগাস ডিপ্লয়েড (2n) লাইন পাওয়া',
      pearl: 'গুহা ও মহেশ্বরী (১৯৬৪) প্রথম ধুতুরা গাছে পরাগধানী কালচার করে হ্যাপ্লয়েড উদ্ভিদ তৈরি করেন',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'tissue_culture',
      term: 'সোমাক্লোনাল ভ্যারিয়েশন (Somaclonal Variation)',
      def: 'দীর্ঘকাল ক্যালাস কালচারে টিস্যু রাখার ফলে জিনগত/এপিজেনেটিক পরিবর্তনের মাধ্যমে মূল মাতৃ-উদ্ভিদ থেকে সামান্য ভিন্ন নতুন বৈশিষ্ট্যের চারা সৃষ্টি',
      pearl: 'লবণাক্ততা বা রোগ-প্রতিরোধী ফসল নির্বাচনে এই ভ্যারিয়েশন ব্যবহার করা হয়; তবে একরকম ক্লোন চাইলে সরাসরি অর্গানোজেনেসিস ভালো',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'tissue_culture',
      term: 'অটোক্লেভ জীবাণুমুক্তকরণ ও ল্যামিনার এয়ার ফ্লো',
      def: 'MS আবাদ মাধ্যম ১২১°C তাপমাত্রা ও ১৫ পাউন্ড/বর্গইঞ্চি চাপে ১৫–২০ মিনিট অটোক্লেভ করে সমস্ত ব্যাকটেরিয়া ও ছত্রাকের স্পোর ধ্বংস করা হয়',
      pearl: 'এক্সপ্লান্ট পৃষ্ঠতল জীবাণুমুক্ত করতে ০.১% মারকিউরিক ক্লোরাইড (HgCl₂) বা ৭০% ইথানল ও সোডিয়াম হাইপোক্লোরাইট ব্যবহৃত হয়',
      diff: 'board',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'আণবিক কাঁচি (Molecular Scissors) বা টাইপ-II রেস্ট্রিকশন এন্ডোনিউক্লিয়েজ',
      def: 'প্যালিনড্রোমিক DNA অনুক্রম (যেমন EcoRI: ৫′-GAATTC-৩′) চিনে নির্দিষ্ট স্থানে DNA দ্বিসূত্রক কেটে স্টিকি বা ব্লান্ট প্রান্ত তৈরি করে (স্মিথ, নাথানস ও আরবার)',
      pearl: 'EcoRI (E. coli RY13), HindIII (Haemophilus influenzae Rd) এবং BamHI আঠালো/কোহেসিভ প্রান্ত ও SmaI ব্লান্ট প্রান্ত দেয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'আণবিক আঠা (Molecular Glue) DNA লাইগেজ',
      def: 'T4 ফাজ ব্যাকটেরিওফাজ বা E. coli থেকে প্রাপ্ত এনজাইম যা কাটা DNA খণ্ড ও বাহক প্লাজমিডের ৩′-OH এবং ৫′-PO₄ প্রান্তে ফসফোডাইএস্টার বন্ধন জুড়ে দেয়',
      pearl: 'ফলে দুটি ভিন্ন উৎসের DNA জোড়া লেগে রিকম্বিন্যান্ট DNA (rDNA বা কাইমেরিক DNA) গঠিত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'pBR322 প্লাজমিডের গঠনিক উপাদান ও মার্কার জিন',
      def: 'বলিভার ও রদ্রিগেজ নির্মিত ৪,৩৬১ বেসপেয়ার কৃত্রিম প্লাজমিড যাতে ori, rop এবং দুটি অ্যান্টিবায়োটিক প্রতিরোধী জিন ampᴿ (অ্যাম্পিসিলিন) ও tetᴿ (টেট্রাসাইক্লিন) আছে',
      pearl: 'BamHI বা SalI দিয়ে tetᴿ স্থানে বিদেশি জিন বসালে রিকম্বিন্যান্ট ক্লোন টেট্রাসাইক্লিনে মারা যায় কিন্তু অ্যাম্পিসিলিনে বেঁচে থাকে (Insertional inactivation)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'Ti প্লাজমিড (Agrobacterium tumefaciens — প্রাকৃতিক জেনেটিক ইঞ্জিনিয়ার)',
      def: 'দ্বিবীজপত্রী উদ্ভিদে ক্রাউন গল (Crown gall) টিউমার সৃষ্টিকারী T-DNA অংশের টিউমার জিন সরিয়ে কাঙ্ক্ষিত জিন ঢুকিয়ে ট্রান্সজেনিক উদ্ভিদ তৈরি করা হয়',
      pearl: 'একবীজপত্রী উদ্ভিদে (ধান, ভুট্টা) সাধারণত জিন গান বা বায়োলিস্টিকস (সোনার/টাংস্টেনের প্রলেপযুক্ত ক্ষুদ্র কণা) পদ্ধতিতে জিন প্রবেশ করানো হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'পলিমারেজ চেইন রিঅ্যাকশন (PCR)-এর তিনটি ধাপ ও Taq পলিমারেজ',
      def: 'ক্যারি মুলিস (১৯৮৩) আবিষ্কৃত ইন-ভিট্রো DNA বিবর্ধন: ডিন্যাচুরেশন (৯৪–৯৬°C), অ্যানিলিং (৫০–৬৫°C) এবং এক্সটেনশন (৭২°C তাপ-সহিষ্ণু Thermus aquaticus এনজাইমে)',
      pearl: 'nটি সাইকেল শেষে ১টি DNA অণু থেকে ২ⁿটি কপি (যেমন ৩০ সাইকেলে প্রায় ১০০ কোটি বা ২³⁰ কপি) তৈরি হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'জেল ইলেকট্রোফোরেসিস (Gel Electrophoresis) ও ইথিডিয়াম ব্রোমাইড',
      def: 'অ্যাগারোজ জেলে ঋণাত্মক চার্জযুক্ত DNA খণ্ডগুলো আকার অনুযায়ী অ্যানোডের দিকে সরে গিয়ে পৃথক হয়; ছোট খণ্ড দ্রুত চলে দূরে যায়',
      pearl: 'ইথিডিয়াম ব্রোমাইড দিয়ে রঞ্জিত করে UV আলোতে কমলা রঙের DNA ব্যান্ড দেখা যায়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'রিকম্বিন্যান্ট হিউম্যান ইনসুলিন (হিউমুলিন — ১৯৮২/১৯৮৩)',
      def: 'E. coli ব্যাকটেরিয়ায় মানুষের ইনসুলিনের A-শৃঙ্খল (২১ অ্যামিনো অ্যাসিড) ও B-শৃঙ্খল (৩০ অ্যামিনো অ্যাসিড) পৃথকভাবে উৎপন্ন করে ডাইসালফাইড বন্ধনে যুক্ত করা',
      pearl: 'এলি লিলি (Eli Lilly) কোম্পানি প্রথম বাণিজ্যিক রিকম্বিন্যান্ট ইনসুলিন হিউমুলিন বাজারে আনে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'ইন্টারফেরন (α, β, γ) ও টিস্যু প্লাজমিনোজেন অ্যাক্টিভেটর (tPA)',
      def: 'ভাইরাস আক্রান্ত কোষ থেকে ক্ষরিত অ্যান্টি-ভাইরাল ও টিউমার প্রতিরোধী গ্লাইকোপ্রোটিন হলো ইন্টারফেরন (হেপাটাইটিস B/C ও ক্যান্সারে ব্যবহৃত); আর tPA রক্তের জমাট (Thrombus) গলায়',
      pearl: 'পাকস্থলি বা স্ট্রোকের রোগীর ধমনির জমাট রক্ত গলাতে রিকম্বিন্যান্ট tPA ও ইউরোকাইনেজ জরুরি জীবনরক্ষাকারী ওষুধ',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'গোল্ডেন রাইস (Golden Rice — ভিটামিন A সমৃদ্ধ ধান)',
      def: 'ইঙ্গো পোট্রিকাস ও পিটার বেয়ার ড্যাফোডিলের psy জিন এবং Erwinia ব্যাকটেরিয়ার crtI জিন ধানের এন্ডোস্পার্মে প্রবেশ করিয়ে বিটা-ক্যারোটিন উৎপাদন ঘটান',
      pearl: 'শিশুদের রাতকানা ও ভিটামিন-A ঘাটতিজনিত অন্ধত্ব দূর করতে উদ্ভাবিত সোনালি বর্ণের ট্রান্সজেনিক ধান',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'Bt বেগুন ও Bt তুলা (Bacillus thuringiensis)',
      def: 'মাটির ব্যাকটেরিয়া থেকে প্রাপ্ত cry জিন (Cry1Ac) ফসলে প্রবেশ করিয়ে প্রো-টক্সিন ক্রিস্টাল প্রোটিন তৈরি যা ডগা ও ফল ছিদ্রকারী পোকার ক্ষারীয় অন্ত্রে ছিদ্র করে মারে',
      pearl: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI) দেশে প্রথম Bt বেগুনের ৪টি জাত মাঠ পর্যায়ে অবমুক্ত করেছে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'বাংলাদেশের পাট ও ইলিশের জিনোম সিকোয়েন্সিং',
      def: 'ড. মাকসুদুল আলমের নেতৃত্বে ২০১০ সালে তোষা পাট (Corchorus olitorius) ও ছত্রাক (Macrophomina) ও ২০১৩ সালে দেশি পাটের পূর্ণাঙ্গ জীবনরহস্য উন্মোচিত হয়',
      pearl: 'পরবর্তীতে বাংলাদেশ কৃষি বিশ্ববিদ্যালয়ের ড. শামসুল আলম ও দল ২০১৮ সালে জাতীয় মাছ ইলিশের (Tenualosa ilisha) জিনোম সিকোয়েন্স করেন',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'CRISPR-Cas9 জিন এডিটিং (জেনিফার ডাউডনা ও ইমানুয়েল শার্পেন্টিয়ে)',
      def: 'গাইড RNA (gRNA) দ্বারা নির্ধারিত স্থানে Cas9 এন্ডোনিউক্লিয়েজ দিয়ে DNA-তে নির্ভুল কাট দিয়ে ক্ষতিকর মিউটেশন সংশোধন বা জিন নিষ্ক্রিয় করার আধুনিক পদ্ধতি',
      pearl: 'সিকেল-সেল অ্যানিমিয়া চিকিৎসা ও খরা-লবণসহিষ্ণু ফসল তৈরিতে বিপ্লব সৃষ্টি করেছে (নোবেল পুরস্কার ২০২০)',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'ব্লটিং টেকনিক: সাউদার্ন (DNA), নর্দার্ন (RNA), ওয়েস্টার্ন (প্রোটিন)',
      def: 'ই. এম. সাউদার্ন ১৯৭৫ সালে জেল থেকে নাইট্রোসেলুলোজ ঝিল্লিতে DNA স্থানান্তরের সাউদার্ন ব্লট উদ্ভাবন করেন; নর্দার্ন RNA ও ওয়েস্টার্ন অ্যান্টিবডি-প্রোটিন শনাক্ত করে',
      pearl: 'HIV নিশ্চিতকরণে ওয়েস্টার্ন ব্লট এবং DNA ফিঙ্গারপ্রিন্টিংয়ে (অ্যালেক জেফ্রিস — VNTR/STR) সাউদার্ন ব্লট ও PCR ব্যবহৃত হয়',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'জিন থেরাপি (ADA-SCID ১৯৯০) ও মনোক্লোনাল অ্যান্টিবডি (হাইব্রিডোমা)',
      def: '৪ বছর বয়সী মেয়ে শিশুর অ্যাডেনোসিন ডিঅ্যামিনেজ (ADA) এনজাইম ঘাটতির চিকিৎসায় প্রথম সফল জিন থেরাপি করা হয়',
      pearl: 'কোহলার ও মিলস্টেইন মায়েলোমা ক্যান্সার কোষের সাথে B-লিম্ফোসাইট ফিউজ করে অনির্দিষ্টকাল একক অ্যান্টিবডি তৈরির হাইব্রিডোমা প্রযুক্তি গড়েন',
      diff: 'medical',
    },
  ];

  // Add 14 extra Ch 10 & Ch 11 items so rows = 52 -> 52 × 4 = 208 unique MCQs + numericals!
  const extraKRows: ReproBiotechRow[] = [
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'অ্যারিলেটেড ও ক্লিভ-ডিম্বক: ক্যালাজাল-মাইক্রোপাইলার মেরু',
      def: 'ডিম্বকের অভ্যন্তরীণ কলা নিউসেলাস (ভ্রূণপোষক কলা, 2n) দিয়ে আবৃত থাকে ও ডিম্বকবৃন্ত যেখানে দেহের সাথে মেশে তাকে র‍্যাফি (Raphe) বলে',
      pearl: 'ফানিকিউলাস ও ডিম্বকদেহের সংযোগস্থলের দাগ হলো হিলাম (Hilum)',
      diff: 'board',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'anther_ovule',
      term: 'জেনারেটিভ ও টিউব (নালিকা) কোষের পরিণতি',
      def: 'পরাগরেণুর প্রথম অসম মাইটোসিসে বড় নালিকা কোষ ও ছোট স্পিন্ডল-আকৃতির জেনারেটিভ কোষ হয়; জেনারেটিভ কোষ মাইটোসিসে ২টি হ্যাপ্লয়েড শুক্রাণু তৈরি করে',
      pearl: 'প্রায় ৬০% আবৃতবীজীতে পরাগরেণু ২-কোষী অবস্থায় এবং ধান-ঘাসে ৩-কোষী অবস্থায় পরাগধানী থেকে নির্গত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'পরাগ-গর্ভমুণ্ড মিথস্ক্রিয়া ও স্ব-অসঙ্গতি (Self-Incompatibility)',
      def: 'একই উদ্ভিদের কার্যকরী পরাগরেণু তার নিজের গর্ভমুণ্ডে অঙ্কুরিত হতে বা গর্ভদণ্ড ভেদ করতে না পারার জিনগত প্রতিরোধ ব্যবস্থা (S-অ্যালিল)',
      pearl: 'মুলত ব্রাসিকা ও সোলানেসি গোত্রে পর-পরাগায়ন নিশ্চিত করতে এবং ইনব্রিডিং ডিপ্রেশন এড়াতে এটি কাজ করে',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'নিউক্লিয়ার, হেলোবিয়াল ও সেলুলার এন্ডোস্পার্ম',
      def: 'প্রাথমিক শস্য নিউক্লিয়াস কোষপ্রাচীর ছাড়া ভাগ হলে নিউক্লিয়ার (ডাবের তরল, গম, ধান), কোষপ্রাচীরসহ হলে সেলুলার (ধুতুরা, বালসাম) ও মধ্যবর্তী হলে হেলোবিয়াল (একবীজপত্রী)',
      pearl: 'নারিকেলে প্রথমে নিউক্লিয়ার (তরল ডাব) ও পরে পরিধি বরাবর সেলুলার (সাদা শাঁস) উভয় রূপই দেখা যায়',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch10_reproduction',
      vl: 'mitosis_cell',
      cat: 'fertilization',
      term: 'হাইব্রিড ভিজর বা হেটারোসিস (Heterosis)',
      def: 'দুটি জিনগতভাবে ভিন্ন বিশুদ্ধ পিতৃ-মাতৃ সারি সংকরায়নের ফলে উৎপন্ন F₁ অপত্যের পিতামাতার চেয়ে অধিক ফলন, বৃদ্ধি ও রোগ-প্রতিরোধ ক্ষমতা প্রদর্শন',
      pearl: 'ভুট্টা, ধান ও সূর্যমুখীতে সাইটোপ্লাজমিক মেল স্টেরিলিটি (CMS) ব্যবহার করে বাণিজ্যিক হাইব্রিড বীজ উৎপাদন হয়',
      diff: 'board',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'YAC, BAC এবং কসমিড (Cosmid) ভেক্টরের ধারণক্ষমতা',
      def: 'সাধারণ প্লাজমিড (~১০–১৫ kb) < ল্যামডা ফাজ (~২৫ kb) < কসমিড (~৪৫ kb) < BAC (~৩০০ kb) < YAC (ইস্ট আর্টিফিশিয়াল ক্রোমোজোম, ~১–২ Mb)',
      pearl: 'হিউম্যান জিনোম প্রজেক্টে বৃহৎ মানুষের DNA খণ্ড ক্লোনিংয়ে BAC এবং YAC ভেক্টর ব্যাপকভাবে ব্যবহৃত হয়েছিল',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'cDNA লাইব্রেরি ও রিভার্স ট্রান্সক্রিপ্টেজ',
      def: 'পরিণত mRNA ছাঁচ থেকে রিভার্স ট্রান্সক্রিপ্টেজ এনজাইমে ইন্ট্রনবিহীন কমপ্লিমেন্টারি DNA (cDNA) তৈরি করে ব্যাকটেরিয়ায় এক্সপ্রেশন ক্লোন করা',
      pearl: 'প্রোক্যারিওটিক E. coli স্প্লাইসিং করতে পারে না বলে মানুষের জিন (যেমন ইনসুলিন) প্রকাশের জন্য অবশ্যই cDNA বা কৃত্রিম ইন্ট্রন-মুক্ত জিন লাগে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'recombinant',
      term: 'ব্লু-হোয়াইট স্ক্রিনিং (lacZ জিন ও X-gal)',
      def: 'প্লাজমিডের β-গ্যালাকটোসিডেজ উৎপাদনকারী lacZ জিনের ভেতরে বিদেশি জিন ঢুকলে নীল রঙের বদলে সাদা (White) রিকম্বিন্যান্ট কলোনি পাওয়া যায়',
      pearl: 'স্বাভাবিক অ-রিকম্বিন্যান্ট কলোনিগুলো X-gal ভেঙে নীল (Blue) রঙ ধারণ করে সহজেই পৃথক হয়ে যায়',
      diff: 'dental',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'ফার্মাং (Pharming) ও ট্রান্সজেনিক প্রাণী (ROSIE ও ডলি)',
      def: 'ট্রান্সজেনিক গরু রোজির দুধে প্রতি লিটারে ২.৪ গ্রাম মানুষের α-ল্যাক্টালবুমিন প্রোটিন; আর সোম্যাটিক সেল নিউক্লিয়ার ট্রান্সফারে (SCNT) ইয়ান উইলমুট তৈরি করেন ক্লোন ভেড়া ডলি (১৯৯৬)',
      pearl: 'ডলি একটি প্রাপ্তবয়স্ক ফিন ডরসেট ভেড়ার স্তনগ্রন্থির ডিপ্লয়েড নিউক্লিয়াস থেকে জন্ম নেওয়া প্রথম ক্লোন স্তন্যপায়ী',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'বায়োইনফরমেটিক্স ও ফ্লেভার সেভর টমেটো (Flavr Savr)',
      def: 'অ্যান্টিসেন্স RNA প্রযুক্তির মাধ্যমে পলিগ্যালাকটুরোনেজ এনজাইম দমন করে পচন বিলম্বিত প্রথম অনুমোদিত GM খাদ্য ফসল (১৯৯৪)',
      pearl: 'পলিগ্যালাকটুরোনেজ পেকটিন ভেঙে টমেটো নরম করে দেয়; সেটি দমন করায় ফসল দীর্ঘদিন সতেজ থাকে',
      diff: 'medical',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'সুপার-বাগ (Pseudomonas putida) ও বায়োরিমিডিয়েশন',
      def: 'ড. আনন্দ মোহন চক্রবর্তী চারটি প্লাজমিড একত্র করে সমুদ্রে তেল নিঃসরণ পরিষ্কারকারী অক্টেন-জাইলিন-ন্যাপথালিন বিয়োজক ব্যাকটেরিয়া উদ্ভাবন করেন',
      pearl: 'জীবাণুর মাধ্যমে পরিবেশের বিষাক্ত তেল ও ভারী ধাতু দূষণমুক্ত করাকে বায়োরিমিডিয়েশন বলে',
      diff: 'board',
    },
    {
      ch: 'bio1_ch11_biotech',
      vl: 'mitosis_cell',
      cat: 'applications',
      term: 'ভোজ্য টিকা (Edible Vaccine) ও রিকম্বিন্যান্ট হেপাটাইটিস B টিকা',
      def: 'ইস্ট কোষে (Saccharomyces) হেপাটাইটিস-B সারফেস অ্যান্টিজেন (HBsAg) তৈরি; পাশাপাশি কলা ও আলুতে অ্যান্টিজেন প্রকাশ করে সুইবিহীন ভোজ্য টিকা গবেষণা',
      pearl: 'বাণিজ্যিক হেপাটাইটিস-B ভ্যাকসিন (Engerix-B / Recombivax) প্রথম নিরাপদ রিকম্বিন্যান্ট সাবইউনিট টিকা',
      diff: 'medical',
    },
  ];

  const allKRows = [...rows, ...extraKRows];
  allKRows.forEach((r, idx) => {
    const sameCat = allKRows.filter((x) => x.cat === r.cat && x.term !== r.term);
    const pool = sameCat.length >= 3 ? sameCat : allKRows.filter((x) => x.term !== r.term);
    const pick = <T,>(getter: (x: ReproBiotechRow) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: r.diff ?? 'medical',
        question: `উদ্ভিদ প্রজনন ও জীবপ্রযুক্তিতে "${r.def}" — এটি কোন পরিভাষা বা কৌশলের সাথে সরাসরি যুক্ত?`,
        correct: r.term,
        distractors: pick((x) => x.term, 1),
        explanation: `${r.term}: ${r.def}। (${r.pearl})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ ও ১১ · প্রজনন ও জীবপ্রযুক্তি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `"${r.term}" বলতে বা এর মূল কার্যপ্রণালি হিসেবে কোনটি বোঝায়?`,
        correct: r.def,
        distractors: pick((x) => x.def, 2),
        explanation: `${r.term}-এর নির্ভুল বিবরণ: ${r.def}। (${r.pearl})`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ ও ১১ · ধারণামূলক প্রশ্ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: 'dental',
        question: `অ্যাডমিশন হাই-ইল্ড পয়েন্ট: "${r.pearl}" — এটি নিচের কোন বিষয়ের সাথে সম্পর্কিত?`,
        correct: r.term,
        distractors: pick((x) => x.term, 3),
        explanation: `${r.pearl} — এই তথ্যটি "${r.term}" (${r.def})-এর গুরুত্বপূর্ণ অংশ।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ ও ১১ · ডেন্টাল ও মেডিকেল নোট',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${r.term}" সংক্রান্ত নিচের কোন বাড়তি বা ব্যতিক্রমী তথ্যটি সঠিক?`,
        correct: r.pearl,
        distractors: pick((x) => x.pearl, 4),
        explanation: `${r.term}-এর ক্ষেত্রে প্রযোজ্য সঠিক তথ্য হলো: ${r.pearl}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ ও ১১ · উচ্চতর অ্যাডমিশন',
      })
    );
  });

  // 2. Quantitative Genetics & Biotechnology Drills (Ch 10 Ploidy Crosses + Ch 11 PCR/Fragments = ~280 MCQs)
  // 2A. Cross Ploidy & Double Fertilization Matrix (20 crosses × 3 = 60 MCQs)
  const crossPloidies = [
    { fem: 2, male: 4, plant: 'গম/সরিষা' },
    { fem: 4, male: 2, plant: 'তরমুজ (বীজহীন triploid তৈরি)' },
    { fem: 4, male: 6, plant: 'স্ট্রিপ-গ্রাস' },
    { fem: 6, male: 2, plant: 'হেক্সাপ্লয়েড × ডিপ্লয়েড গম' },
    { fem: 6, male: 4, plant: 'Triticum × ট্রিটিক্যালি' },
    { fem: 2, male: 6, plant: 'ওট সংকর' },
    { fem: 8, male: 2, plant: 'অক্টাপ্লয়েড স্ট্রবেরি × ডিপ্লয়েড' },
    { fem: 2, male: 8, plant: 'ডিপ্লয়েড × অক্টাপ্লয়েড স্ট্রবেরি' },
    { fem: 4, male: 8, plant: 'আখের সংকর জাত' },
    { fem: 8, male: 4, plant: 'সাজানো আখ সংকর' },
  ];
  const baseXList = [7, 8, 9, 10, 12];
  crossPloidies.forEach((cp, idx) => {
    const x = baseXList[idx % baseXList.length];
    const eggN = (cp.fem / 2) * x;
    const spermN = (cp.male / 2) * x;
    const embryo = eggN + spermN;
    const endosperm = 2 * eggN + spermN;
    const seedCoat = cp.fem * x;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_reproduction',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${cp.plant} প্রজাতিতে মূল ক্রোমোজোম সংখ্যা x = ${toBnDigits(x)}। একটি ${toBnDigits(cp.fem)}n স্ত্রী উদ্ভিদকে ${toBnDigits(cp.male)}n পুরুষ উদ্ভিদের পরাগ দিয়ে পরাগায়িত করলে নিষেকের পর ভ্রূণ ও শস্যকলার ক্রোমোজোম সংখ্যা যথাক্রমে কত হবে?`,
        correct: `ভ্রূণ = ${toBnDigits(embryo)} এবং শস্য = ${toBnDigits(endosperm)}`,
        distractors: [
          `ভ্রূণ = ${toBnDigits(endosperm)} এবং শস্য = ${toBnDigits(embryo)}`,
          `ভ্রূণ = ${toBnDigits(embryo)} এবং শস্য = ${toBnDigits(eggN + 2 * spermN)}`,
          `ভ্রূণ = ${toBnDigits(seedCoat)} এবং শস্য = ${toBnDigits(seedCoat + spermN)}`,
        ],
        explanation: `স্ত্রী গ্যামেট (ডিম্বাণু) = ${toBnDigits(eggN)}, সেকেন্ডারি নিউক্লিয়াস = ২ × ${toBnDigits(eggN)} = ${toBnDigits(2 * eggN)} এবং পুং গ্যামেট = ${toBnDigits(spermN)}। অতএব ভ্রূণ = ${toBnDigits(eggN)} + ${toBnDigits(spermN)} = ${toBnDigits(embryo)} এবং শস্য = ${toBnDigits(2 * eggN)} + ${toBnDigits(spermN)} = ${toBnDigits(endosperm)}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · পলিপ্লয়েডি দ্বিনিষেক গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_reproduction',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `উদ্ভিদ প্রজননে (x = ${toBnDigits(x)}) যদি স্ত্রী গাছ ${toBnDigits(cp.fem)}n ও পুরুষ গাছ ${toBnDigits(cp.male)}n হয়, তবে গঠিত বীজের বীজত্বক (Testa/Tegmen) ও অ্যালিউরোন স্তরের ক্রোমোজোম সংখ্যা যথাক্রমে কত হবে?`,
        correct: `বীজত্বক = ${toBnDigits(seedCoat)} ও অ্যালিউরোন = ${toBnDigits(endosperm)}`,
        distractors: [
          `বীজত্বক = ${toBnDigits(embryo)} ও অ্যালিউরোন = ${toBnDigits(endosperm)}`,
          `বীজত্বক = ${toBnDigits(seedCoat)} ও অ্যালিউরোন = ${toBnDigits(embryo)}`,
          `বীজত্বক = ${toBnDigits(cp.male * x)} ও অ্যালিউরোন = ${toBnDigits(seedCoat)}`,
        ],
        explanation: `বীজত্বক সরাসরি মাতৃডিম্বকের ত্বক থেকে আসে (${toBnDigits(cp.fem)}n = ${toBnDigits(seedCoat)}), আর অ্যালিউরোন স্তর হলো শস্যের (Endosperm) বাইরের স্তর (${toBnDigits(endosperm)})।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · বীজত্বক ও অ্যালিউরোন প্লয়েডি',
      })
    );
  });

  // 2B. Pollen & Ovule Meiosis/Mitosis Cell Division Counts (15 × 2 = 30 MCQs)
  [40, 80, 100, 120, 160, 200, 240, 320, 400, 480, 600, 800, 1000, 1200, 1600].forEach((seeds, i) => {
    const pollenMeiosis = seeds / 4;
    const totalMeiosis = seeds + pollenMeiosis;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch10_reproduction',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি আবৃতবীজী উদ্ভিদে সম্পূর্ণভাবে ${toBnDigits(seeds)}টি নিষিক্ত বীজ উৎপন্ন করতে মোট ন্যূনতম কতবার মায়োসিস কোষ বিভাজন প্রয়োজন হবে?`,
        correct: `${toBnDigits(totalMeiosis)} বার (${toBnDigits(pollenMeiosis)} পুং + ${toBnDigits(seeds)} স্ত্রী মায়োসিস)`,
        distractors: [
          `${toBnDigits(seeds / 2)} বার (${toBnDigits(pollenMeiosis)} পুং + ${toBnDigits(pollenMeiosis)} স্ত্রী)`,
          `${toBnDigits(seeds * 2)} বার`,
          `${toBnDigits(seeds + seeds / 2)} বার`,
        ],
        explanation: `১টি মায়োসিসে ৪টি পরাগরেণু তৈরি হয় (${toBnDigits(seeds)}টি রেণুতে ${toBnDigits(pollenMeiosis)} বার), কিন্তু স্ত্রী রেণু মাতৃকোষে ১টি মায়োসিসে ৩টি নষ্ট হয়ে মাত্র ১টি কার্যকর ডিম্বাণু হয় (${toBnDigits(seeds)}টি ডিম্বাণুতে ${toBnDigits(seeds)} বার)। মোট = ${toBnDigits(totalMeiosis)} বার।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১০ · বীজ ও মায়োসিস সংখ্যা গণনা',
      })
    );
  });

  // 2C. PCR Amplification Cycles & Restriction Fragment Counts (20 × 3 = 60 MCQs)
  [4, 5, 6, 8, 10, 12, 15, 16, 18, 20].forEach((n, i) => {
    const copies = Math.pow(2, n);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch11_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `PCR যন্ত্রে প্রাথমিকভাবে ১টি ডাবল-স্ট্র্যান্ডেড টার্গেট DNA অণু নিয়ে ধারাবাহিক ${toBnDigits(n)}টি চক্র সম্পন্ন করলে মোট কতটি DNA কপি উৎপন্ন হবে?`,
        correct: `${toBnDigits(copies.toLocaleString('en-US'))}টি (২^${toBnDigits(n)})`,
        distractors: [
          `${toBnDigits((2 * n).toLocaleString('en-US'))}টি`,
          `${toBnDigits(Math.pow(2, n - 1).toLocaleString('en-US'))}টি`,
          `${toBnDigits((n * n).toLocaleString('en-US'))}টি`,
        ],
        explanation: `প্রতিটি PCR চক্রে DNA দ্বিগুণ হয় (N = N₀ × 2ⁿ)। এখানে ১ × 2^${toBnDigits(n)} = ${toBnDigits(copies.toLocaleString('en-US'))}টি DNA অণু পাওয়া যাবে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · PCR গাণিতিক হিসাব',
      })
    );
  });

  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((cuts, i) => {
    const linearFrags = cuts + 1;
    const circularFrags = cuts;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch11_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি রৈখিক (Linear) DNA অণু এবং একটি বৃত্তাকার (Circular) প্লাজমিড DNA উভয়েই EcoRI এনজাইমের ${toBnDigits(cuts)}টি নির্দিষ্ট কাটার স্থান (Restriction site) থাকলে সম্পূর্ণ হজমের পর যথাক্রমে কয়টি খণ্ড পাওয়া যাবে?`,
        correct: `রৈখিকে ${toBnDigits(linearFrags)}টি ও বৃত্তাকারে ${toBnDigits(circularFrags)}টি খণ্ড`,
        distractors: [
          `উভয়েই ${toBnDigits(cuts)}টি খণ্ড`,
          `রৈখিকে ${toBnDigits(circularFrags)}টি ও বৃত্তাকারে ${toBnDigits(linearFrags)}টি খণ্ড`,
          `রৈখিকে ${toBnDigits(cuts * 2)}টি ও বৃত্তাকারে ${toBnDigits(cuts + 2)}টি খণ্ড`,
        ],
        explanation: `বৃত্তাকার প্লাজমিডে nটি কাটে nটি খণ্ড (${toBnDigits(circularFrags)}টি) এবং রৈখিক DNA-তে nটি কাটে n+1টি খণ্ড (${toBnDigits(linearFrags)}টি) উৎপন্ন হয়।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · রেস্ট্রিকশন ম্যাপিং',
      })
    );
  });

  // 2D. Restriction Enzymes & Palindrome Target Reference Matrix (8 × 4 = 32 MCQs)
  const restEnzymes = [
    { enz: 'EcoRI', src: 'Escherichia coli RY13', seq: "৫′-G↓AATTC-৩′", end: '৫′-ওভারহ্যাং স্টিকি প্রান্ত (AATT)' },
    { enz: 'BamHI', src: 'Bacillus amyloliquefaciens H', seq: "৫′-G↓GATCC-৩′", end: '৫′-ওভারহ্যাং স্টিকি প্রান্ত (GATC)' },
    { enz: 'HindIII', src: 'Haemophilus influenzae Rd', seq: "৫′-A↓AGCTT-৩′", end: '৫′-ওভারহ্যাং স্টিকি প্রান্ত (AGCT)' },
    { enz: 'PstI', src: 'Providencia stuartii', seq: "৫′-CTGCA↓G-৩′", end: '৩′-ওভারহ্যাং স্টিকি প্রান্ত (TGCA)' },
    { enz: 'SmaI', src: 'Serratia marcescens', seq: "৫′-CCC↓GGG-৩′", end: 'সমান বা ব্লান্ট প্রান্ত (Blunt end)' },
    { enz: 'EcoRV', src: 'Escherichia coli J62', seq: "৫′-GAT↓ATC-৩′", end: 'সমান বা ব্লান্ট প্রান্ত (Blunt end)' },
    { enz: 'AluI', src: 'Arthrobacter luteus', seq: "৫′-AG↓CT-৩′", end: '৪-বেস স্বীকৃত ব্লান্ট প্রান্ত' },
    { enz: 'TaqI', src: 'Thermus aquaticus', seq: "৫′-T↓CGA-৩′", end: 'তাপ-সহিষ্ণু ব্যাকটেরিয়া থেকে প্রাপ্ত ৪-বেস কাটার' },
  ];
  restEnzymes.forEach((re, idx) => {
    const others = restEnzymes.filter((x) => x.enz !== re.enz);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch11_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `রিকম্বিন্যান্ট DNA প্রযুক্তিতে প্যালিনড্রোমিক অনুক্রম ${re.seq} চিনে কাটার জন্য কোন রেস্ট্রিকশন এনজাইম ব্যবহৃত হয়?`,
        correct: `${re.enz} (${re.src})`,
        distractors: others.slice(0, 4).map((x) => `${x.enz} (${x.src})`),
        explanation: `${re.enz} এনজাইমটি ${re.src} থেকে পৃথক করা হয় এবং এটি ${re.seq} স্থানে কেটে ${re.end} সৃষ্টি করে।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · রেস্ট্রিকশন এনজাইম তালিকা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_1',
        chapterId: 'bio1_ch11_biotech',
        visualLessonId: 'mitosis_cell',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${re.enz} রেস্ট্রিকশন এনজাইমের উৎস অণুজীব ও কাটা প্রান্তের ধরন কী?`,
        correct: `${re.src} · ${re.end}`,
        distractors: others.slice(1, 5).map((x) => `${x.src} · ${x.end}`),
        explanation: `${re.enz} এর প্রথম অক্ষর গণ (Genus) ও পরবর্তী দুই অক্ষর প্রজাতি (Species) নির্দেশ করে (${re.src}) এবং কাটার স্থান ${re.seq}।`,
        reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১১ · এনজাইম নামকরণ ও প্রান্ত',
      })
    );
  });

  return list;
}
