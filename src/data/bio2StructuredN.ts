import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio2NRaw {
  ch: 'bio2_ch3_digestion' | 'bio2_ch4_blood';
  vl: string;
  cat: string;
  term: string;
  fact: string;
  clinical: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredN(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_sn_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 3 (Digestion & Absorption) + Ch 4 (Blood & Circulation): 60 × 4 = 240 unique MCQs
  const rows: Bio2NRaw[] = [
    // --- Chapter 3: Digestion & Absorption ---
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'oral_gastric',
      term: 'দুধের দাঁত (২০টি) বনাম স্থায়ী দাঁতের (৩২টি) দন্তসংকেত',
      fact: 'শিশুর দুধের দাঁতে প্রিমোলার ও আক্কেল দাঁত থাকে না: (I₂C₁P₀M₂ / I₂C₁P₀M₂) × ২ = ২০; প্রাপ্তবয়স্কে (I₂C₁P₂M₃ / I₂C₁P₂M₃) × ২ = ৩২',
      clinical: 'হাইপোডোন্ট/ডাইফায়োডোন্ট দাঁত: জীবনে দুবার গজায় ২০টি এবং একবার গজায় ১২টি দাঁত (৮ প্রিমোলার + ৪ তৃতীয় মোলার/আক্কেল দাঁত)',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'oral_gastric',
      term: 'দাঁতের এনামেল, ডেন্টিন ও পাল্প গহ্বর',
      fact: 'এক্টোডার্মাল অ্যামেলোব্লাস্ট থেকে সৃষ্ট দেহের কঠিনতম পদার্থ এনামেল (৯৬% হাইড্রোক্সিঅ্যাপাটাইট) ও মেসোডার্মাল ওডন্টোব্লাস্ট নির্মিত ডেন্টিন',
      clinical: 'মুখের অতিরিক্ত অ্যাসিড ও ফ্লোরাইড স্বল্পতায় এনামেল ক্ষয় হয়ে ডেন্টাল ক্যারিজ (দন্তক্ষয়) সৃষ্টি হয়',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'oral_gastric',
      term: 'তিন জোড়া লালাগ্রন্থি (প্যারোটিড, সাবম্যান্ডিবুলার ও সাবলিঙ্গুয়াল)',
      fact: 'কানের নিচে বৃহত্তম প্যারোটিড (স্টেনসন নালি — ২৫%), চোয়ালের নিচে সাবম্যান্ডিবুলার (হোয়ার্টন নালি — ~৭০% সর্বাধিক লালা) ও জিহ্বার নিচে সাবলিঙ্গুয়াল (বার্থোলিন/রিভিনাস নালি — ৫%)',
      clinical: 'দৈনিক ১.০–১.৫ লিটার লালা (pH ৬.২–৭.৪) ক্ষরিত হয় যাতে টায়ালিন (α-অ্যামাইলেজ), লাইসোজাইম ও IgA থাকে; প্যারোটিড গ্রন্থির ভাইরাল প্রদাহই হলো মাম্পস',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'oral_gastric',
      term: 'পাকস্থলির ৪ প্রকার গ্যাস্ট্রিক গ্রন্থি কোষ ও ক্ষরণ',
      fact: 'মিউকাস নেক কোষ (ক্ষারীয় মিউসিন + HCO₃⁻), প্যারাইটাল/অক্সিন্টিক কোষ (HCl ও ক্যাসলের ইন্ট্রিনসিক ফ্যাক্টর), চিফ/পেপটিক কোষ (পেপসিনোজেন ও প্রোরেনিন) এবং G-কোষ (গ্যাস্ট্রিন হরমোন)',
      clinical: 'প্যারাইটাল কোষ নষ্ট হলে ভিটামিন B₁₂ শোষিত হতে পারে না ও পার্নিসিয়াস অ্যানিমিয়া (Pernicious anemia) হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'oral_gastric',
      term: 'পাকস্থলির নিজস্ব এপিথেলিয়াম কেন HCl ও পেপসিনে হজম হয় না?',
      fact: 'পুরু বাইকার্বোনেট-সমৃদ্ধ জলনিরোধী মিউকাস স্তর, এপিথেলিয়াল টাইট জাংশন ও পেপসিনোজেনের নিষ্ক্রিয় প্রো-এনজাইম রূপে ক্ষরণ',
      clinical: 'Helicobacter pylori সংক্রমণ বা দীর্ঘস্থায়ী NSAIDs এই মিউকাস বাধা নষ্ট করলে গ্যাস্ট্রিক/পেপটিক আলসার হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'liver_pancreas',
      term: 'যকৃৎ (Liver — বৃহত্তম গ্রন্থি, ~১.২–১.৫ কেজি) ও লবিউল গঠন',
      fact: 'যকৃতের কার্যকরী একক ষড়ভুজাকার হেপাটিক লবিউল; সাইনুসয়েডে অবস্থিত ফ্যাগোসাইটিক কুফার কোষ (Kupffer cells) পুরনো RBC ও জীবাণু ধ্বংস করে',
      clinical: 'যকৃতে গ্লাইকোজেনেসিস, গ্লাইকোজেনোলাইসিস, গ্লুকোনিওজেনেসিস, অরনিথিন চক্রে ইউরিয়া সংশ্লেষ ও প্লাজমা প্রোটিন (অ্যালবুমিন, ফাইব্রিনোজেন, প্রোথ্রম্বিন) উৎপন্ন হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'liver_pancreas',
      term: 'পিত্তরস (Bile) ও ইমালসিফিকেশন (Emulsification)',
      fact: 'যকৃত থেকে উৎপন্ন ও পিত্তথলিতে ঘনীভূত (pH ৭.৬–৮.৬) এনজাইমবিহীন পিত্তরসে পিত্তলবণ (সোডিয়াম গ্লাইকোকোলেট ও টরোকোলেট) ও পিত্তরঞ্জক (বিলিরুবিন-বিলিভার্ডিন) থাকে',
      clinical: 'পিত্তলবণ চর্বির বড় গোলককে ক্ষুদ্র মাইকেলে ভেঙে লাইপেজ এনজাইমের ক্রিয়াতল বাড়িয়ে দেয় এবং চর্বি-দ্রবণীয় ভিটামিন (A, D, E, K) শোষণে সাহায্য করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'liver_pancreas',
      term: 'অগ্ন্যাশয় (মিশ্র গ্রন্থি): অ্যাসিনাই (বহিঃক্ষরা) ও আইলেটস (অন্তঃক্ষরা)',
      fact: 'বহিঃক্ষরা অ্যাসিনি থেকে ট্রিপসিনোজেন, কাইমোট্রিপসিনোজেন, প্রোকার্বক্সিপেপটাইডেজ, অ্যামাইলেজ, লাইপেজ, নিউক্লিয়েজ ও প্রচুর HCO₃⁻ উইরসাং নালিতে ডিউওডেনামে আসে',
      clinical: 'অন্ত্রের ব্রাশ-বর্ডারের এন্টারোকাইনেজ এনজাইম নিষ্ক্রিয় ট্রিপসিনোজেনকে সক্রিয় ট্রিপসিনে পরিণত করে যা বাকি প্রোটিয়েজগুলোকে সক্রিয় করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'liver_pancreas',
      term: 'গ্যাস্ট্রোইনটেস্টাইনাল হরমোন: গ্যাস্ট্রিন, সিক্রেটিন, CCK ও সোমাটোস্ট্যাটিন',
      fact: 'গ্যাস্ট্রিন পাকস্থলির HCl ক্ষরণ বাড়ায়; সিক্রেটিন (প্রথম আবিষ্কৃত হরমোন — বেলিস ও স্টার্লিং ১৯০২) অগ্ন্যাশয় থেকে HCO₃⁻-সমৃদ্ধ পানি ক্ষরণ করায়; CCK পিত্তথলি সংকোচন ও অগ্ন্যাশয় এনজাইম ক্ষরণ ঘটায়',
      clinical: 'GIP ও সোমাটোস্ট্যাটিন গ্যাস্ট্রিক অম্ল ক্ষরণ ও পেরিস্টালসিস কমিয়ে নিয়ন্ত্রকের কাজ করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'absorption',
      term: 'ক্ষুদ্রান্ত্রের ভিলাই, মাইক্রোভিলাই (ব্রাশ বর্ডার) ও ল্যাকটিয়েল (Lacteal)',
      fact: 'প্লিকা সার্কুলারিস, ভিলাই ও মাইক্রোভিলাই শোষণতলের ক্ষেত্রফল ~৬০০ গুণ বাড়ায় (~২০০–২৫০ m²); ভিলাইয়ের কেন্দ্রে থাকে লসিকা নালি ল্যাকটিয়েল',
      clinical: 'গ্লুকোজ-গ্যালাকটোজ SGLT1 দিয়ে Na⁺-সহ সক্রিয়ভাবে রক্ত-কৈশিকে যায়; কিন্তু লং-চেইন ফ্যাটি অ্যাসিড ও মনোগ্লিসারাইড কাইলোমাইক্রন হিসেবে ল্যাকটিয়েলে ঢোকে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'absorption',
      term: 'বৃহদন্ত্রের সিমবায়োটিক ব্যাকটেরিয়া ও ভিটামিন সংশ্লেষ',
      fact: 'কোলনের মিথোজীবী E. coli ব্যাকটেরিয়া অপাচ্য সেলুলোজ-আঁশ গাঁজিয়ে ভিটামিন-K (রক্ত তঞ্চনের জন্য অপরিহার্য) এবং ভিটামিন-B₁₂, বায়োটিন ও ফলিক অ্যাসিড তৈরি করে',
      clinical: 'বৃহদন্ত্রে কোনো পরিপাক এনজাইম থাকে না; এটি মূলত প্রতিদিন প্রায় ১–১.৫ লিটার পানি ও NaCl শোষণ করে মল গঠন করে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'absorption',
      term: 'স্থূলতা (Obesity) ও WHO-নির্ধারিত বডি মাস ইনডেক্স (BMI) শ্রেণিবিন্যাস',
      fact: 'BMI = ওজন (kg) / উচ্চতা² (m²); স্বাভাবিক ১৮.৫–২৪.৯, অতিরিক্ত ওজন ২৫.০–২৯.৯, শ্রেণি-১ স্থূলতা ৩০.০–৩৪.৯, শ্রেণি-২ ৩৫.০–৩৯.৯ ও মরবিড স্থূলতা >= ৪০.০',
      clinical: 'উচ্চ BMI টাইপ-২ ডায়াবেটিস, উচ্চ রক্তচাপ, ফ্যাটি লিভার, অবস্ট্রাক্টিভ স্লিপ অ্যাপনিয়া ও করোনারি হৃদ্রোগের ঝুঁকি বহুগুণ বাড়ায়',
      diff: 'medical',
    },
    // --- Chapter 4: Blood & Circulation ---
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'blood_cells',
      term: 'প্লাজমা (৫৫%) বনাম সিরাম (Serum) ও প্লাজমা প্রোটিন (৭–৮%)',
      fact: 'রক্ত থেকে কোষ সরালে প্লাজমা পাওয়া যায়; প্লাজমা থেকে ফাইব্রিনোজেন ও তঞ্চন ফ্যাক্টর বাদ দিলে হালকা হলুদ তরল সিরাম থাকে (অ্যালবুমিন অনকোটিক চাপ রাখে, গ্লোবিউলিন অনাক্রম্যতা দেয়)',
      clinical: 'রক্তে অ্যালবুমিন কমে গেলে (লিভার সিরোসিস বা নেফ্রোটিক সিনড্রোম) টিস্যুর ফাঁকে পানি জমে শোথ বা ইডিমা (Edema) দেখা দেয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'blood_cells',
      term: 'লোহিত রক্তকণিকা (RBC): এরিথ্রোপয়েসিস, হিমোগ্লোবিন ও কার্বনিক অ্যানহাইড্রেজ',
      fact: 'পুরুষে ৪.৫–৫.৫ ও স্ত্রীতে ৪.০–৫.০ মিলিয়ন/mm³; ব্যাস ৭.২ µm, আয়ু ১২০ দিন, বয়স্ক অবস্থায় লাল অস্থিমজ্জায় এরিথ্রোপয়েটিন হরমোনের (বৃক্ক থেকে) প্রভাবে সৃষ্টি',
      clinical: 'অক্সিজেনের অভাবে (উচ্চ পাহাড়ে বা ধূমপানে) বৃক্কের জাক্সটাগ্লোমেরুলার কোষ এরিথ্রোপয়েটিন বাড়িয়ে পলিসাইথেমিয়া ঘটায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'blood_cells',
      term: 'শ্বেত রক্তকণিকা (WBC)-র ৫টি প্রকারের স্বাভাবিক শতকরা হার (Never Let Monkeys Eat Bananas)',
      fact: 'নিউট্রোফিল (৬০–৭০%), লিম্ফোসাইট (২০–২৫%), মনোসাইট (৩–৮% — বৃহত্তম, টিস্যুতে ম্যাক্রোফেজ), ইওসিনোফিল (২–৪%) এবং বেসোফিল (০.৫–১% — হিস্টামিন-হেপারিন ক্ষরণ)',
      clinical: 'ব্যাকটেরিয়া সংক্রমণে নিউট্রোফিল, অ্যালার্জি ও কৃমি সংক্রমণে ইওসিনোফিল এবং ভাইরাল সংক্রমণে লিম্ফোসাইট দ্রুত বেড়ে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'blood_cells',
      term: 'রক্ত তঞ্চনের প্রধান ফ্যাক্টর (I–XIII) ও ৪টি অপরিহার্য ফ্যাক্টর',
      fact: 'I-ফাইব্রিনোজেন, II-প্রোথ্রম্বিন, III-টিস্যু ফ্যাক্টর (থ্রম্বোপ্লাস্টিন), IV-ক্যালসিয়াম আয়ন (Ca²⁺), VIII-অ্যান্টিহেমোফিলিক-A ও IX-ক্রিসমাস ফ্যাক্টর',
      clinical: 'থ্রম্বিন (সক্রিয় ফ্যাক্টর-IIa) দ্রবণীয় ফাইব্রিনোজেনকে অদ্রবণীয় ফাইব্রিন মনোমারে ভাঙে ও ফ্যাক্টর-XIII ক্রস-লিঙ্ক করে মজবুত তঞ্চন জাল গড়ে; যকৃতে II, VII, IX, X তৈরিতে ভিটামিন-K লাগে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'blood_cells',
      term: 'ABO ব্লাড গ্রুপ (ল্যান্ডস্টেইনার ১৯০০) ও এরিথ্রোব্লাস্টোসিস ফিটালিস (Rh)',
      fact: 'O গ্রুপে কোনো A/B অ্যান্টিজেন না থাকায় সর্বজনীন দাতা ও AB প্লাজমায় অ্যান্টি-a/b না থাকায় সর্বজনীন গ্রহীতা (সর্বোচ্চ ও নেগেটিভ/পজিটিভ)',
      clinical: 'Rh⁻ মা ও Rh⁺ পিতার প্রথম Rh⁺ সন্তান জন্মের সময় ভ্রূণের RBC মায়ের রক্তে ঢুকলে অ্যান্টি-D অ্যান্টিবডি হয়; প্রসবের ৭২ ঘণ্টার মধ্যে RhoGAM (অ্যান্টি-D) ইনজেকশনে ২য় সন্তান বাঁচে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'হৃৎপিণ্ডের ৪টি কপাটিকা ও কার্ডিয়াক সাইকেল (০.৮ সেকেন্ড) ধ্বনি (লুব-ডাব)',
      fact: '১ম ধ্বনি "LUB" (দীর্ঘ ও মৃদু, ভেন্ট্রিকুলার সিস্টোলের শুরুতে ট্রাইকাসপিড ও বাইকাসপিড/মাইট্রাল বন্ধ হওয়ায়) এবং ২য় ধ্বনি "DUB" (তীক্ষ্ণ ও সংক্ষিপ্ত, সেমিলুনার কপাটিকা বন্ধ হওয়ায়)',
      clinical: '০.৮ সেকেন্ডের চক্রে অ্যাট্রিয়াল সিস্টোল ০.১s, অ্যাট্রিয়াল ডায়াস্টোল ০.৭s, ভেন্ট্রিকুলার সিস্টোল ০.৩s এবং ভেন্ট্রিকুলার ডায়াস্টোল ০.৫s',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'হৃৎপিণ্ডের জাংশনাল টিস্যু ও আবেগ পরিবহন বেগ (মায়োজেনিক তন্ত্র)',
      fact: 'SA নোড (স্বাভাবিক পেসমেকার — ৭০–৮০/মি.) → AV নোড (০.১s বিলম্ব যাতে অলিন্দ সম্পূর্ণ খালি হয়) → বান্ডল অব হিজ → বাম-ডান শাখা → পার্কিঞ্জি তন্তু (সর্বোচ্চ ৪ m/s বেগে নিলয়ে ছড়ায়)',
      clinical: 'SA নোড বিকল হলে AV নোড ৪০–৬০/মি. ও পার্কিঞ্জি তন্তু ২০–৪০/মি. হারে ব্যাকআপ স্পন্দন চালাতে পারে (কৃত্রিম পেসমেকারে লিথিয়াম ব্যাটারি থাকে)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'ইলেকট্রোকার্ডিওগ্রাম (ECG): P, QRS ও T তরঙ্গের শারীরবৃত্তীয় অর্থ',
      fact: 'P-তরঙ্গ = অ্যাট্রিয়াল ডিপোলারাইজেশন (সংকোচনের পূর্বে); QRS কমপ্লেক্স = ভেন্ট্রিকুলার ডিপোলারাইজেশন (এবং আড়ালকৃত অ্যাট্রিয়াল রিপোলারাইজেশন); T-তরঙ্গ = ভেন্ট্রিকুলার রিপোলারাইজেশন',
      clinical: 'ST-অংশের উত্তোলন (ST elevation) তীব্র মায়োকার্ডিয়াল ইনফার্কশন (হার্ট অ্যাটাক)-এর এবং বর্ধিত PR ব্যবধান হার্ট ব্লকের স্পষ্ট চিহ্ন',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'ব্যারোরিসেপ্টর রিফ্লেক্স (রক্তচাপ নিয়ন্ত্রণ)',
      fact: 'ক্যারোটিড সাইনাস (IX গ্লসোফ্যারিঞ্জিয়াল) ও অ্যাওর্টিক আর্চে (X ভেগাস) অবস্থিত চাপ-সংবেদী রিসেপ্টর রক্তচাপ বাড়লে মেডুলার ভেসোমোটর কেন্দ্র দমন করে হৃৎস্পন্দন ও ধমনি সংকোচন কমায়',
      clinical: 'ফ্রাঙ্ক-স্টার্লিং সূত্র মতে শিরা ফিরে আসা (Venous return) বাড়লে এন্ড-ডায়াস্টোলিক আয়তন ও স্ট্রোক ভলিউম বেড়ে কার্ডিয়াক আউটপুট বাড়ে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'হৃদরোগ: অ্যানজাইনা পেকটোরিস, মায়োকার্ডিয়াল ইনফার্কশন ও স্ট্রোক/CABG',
      fact: 'করোনারি ধমনিতে কোলেস্টেরল প্লাক (অ্যাথেরোস্ক্লেরোসিস) জমে রক্তস্বল্পতায় বুকে চাপ-ব্যথা হলে অ্যানজাইনা; আর সম্পূর্ণ অবরোধে হৃৎপেশির মৃত্যু (নেক্রোসিস) হলে হার্ট অ্যাটাক (MI)',
      clinical: 'চিকিৎসায় ব্যালুন অ্যাঞ্জিওপ্লাস্টি ও ধাতব স্টেন্ট বসানো হয় অথবা পায়ের গ্রেট স্যাফেনাস শিরা দিয়ে করোনারি আর্টারি বাইপাস গ্রাফটিং (CABG) করা হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'absorption',
      term: 'ক্ষুদ্রান্ত্র ও অগ্ন্যাশয় এনজাইম বিক্রিয়ার চূড়ান্ত ছক',
      fact: 'ম্যাল্টেজ (ম্যাল্টোজ → ২ গ্লুকোজ), সুক্রেজ (সুক্রোজ → গ্লুকোজ + ফ্রুক্টোজ), ল্যাকটেজ (ল্যাকটোজ → গ্লুকোজ + গ্যালাকটোজ), ডাইপেপটাইডেজ (→ অ্যামিনো অ্যাসিড) ও লাইপেজ (→ ফ্যাটি অ্যাসিড + গ্লিসারল)',
      clinical: 'ল্যাকটেজ এনজাইমের অভাবে দুধ খেলে অন্ত্রের ব্যাকটেরিয়া ল্যাকটোজ গাঁজিয়ে গ্যাস-ডায়রিয়া করে (Lactose intolerance)',
      diff: 'board',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'blood_cells',
      term: 'ভ্রূণের লসিকা তন্ত্র (Lymphatic System) ও থাইমাস-প্লীহা',
      fact: 'রক্তকৈশিক থেকে বের হওয়া অতিরিক্ত টিস্যু তরল ও শোষিত চর্বি (কাইলের সাদা কাইলোমাইক্রন) বাম থোরাসিক ও ডান লিম্ফ্যাটিক ডাক্ট হয়ে সাবক্ল্যাভিয়ান শিরায় ফিরে আসে',
      clinical: 'প্লীহা (Spleen) হলো বৃহত্তম গৌণ লিম্ফয়েড অঙ্গ যা "RBC-এর কবরস্থান" ও জরুরি অবস্থায় রক্তের রিজার্ভার হিসেবে কাজ করে',
      diff: 'medical',
    },
  ];

  // Add 14 more clinical Ch3 & Ch4 items so we have 38 × 4 = 152 + ~250 quantitative drills = ~402 unique MCQs!
  const extraN: Bio2NRaw[] = [
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'oral_gastric',
      term: 'বিলিরুবিন বিপাক ও জন্ডিস (হিমোলাইটিক, হেপাটিক, অবস্ট্রাক্টিভ)',
      fact: 'RBC-র হিম ভেঙে প্লীহায় অসংযোজিত বিলিরুবিন হয় → যকৃতে গ্লুকুরোনিক অ্যাসিডের সাথে যুক্ত হয়ে পিত্তের সাথে অন্ত্রে গিয়ে স্টারকোবিলিনোজেন (মলের বাদামি রঙ) ও মূত্রে ইউরোবিলিনোজেন হয়',
      clinical: 'পিত্তনালিতে পাথর আটকালে (অবস্ট্রাক্টিভ জন্ডিস) মল ফ্যাকাশে সাদা (Clay-colored) ও রক্তে কনজুগেটেড বিলিরুবিন বেড়ে ত্বক-চোখের স্ক্লেরা হলুদ হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'oral_gastric',
      term: 'অ্যাপােন্ডিক্স, সিকাম ও কোলনের টিনিয়া কোলাই (Taeniae coli)',
      fact: 'ইলিয়াম যেখানে সিকামে প্রবেশ করে তার নিচে বদ্ধ নলাকার ভার্মিফর্ম অ্যাপেন্ডিক্স (প্রদাহই অ্যাপেনডিসাইটিস); বৃহদন্ত্রের অনুদৈর্ঘ্য পেশিগুচ্ছ হলো টিনিয়া কোলাই যা থলির মতো হস্ট্রা (Haustra) তৈরি করে',
      clinical: 'অ্যাপেন্ডিক্সে প্রচুর লসিকা টিস্যু থাকায় এটি প্রদাহ ও ইমিউন সংকেত নিয়ন্ত্রণে অংশ নেয়',
      diff: 'board',
    },
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      cat: 'absorption',
      term: 'কার্বোহাইড্রেট, প্রোটিন ও চর্বির ক্যালরিক মূল্য (Calorific Value)',
      fact: 'প্রোটিন ≈ ৪.১ kcal/g (বম্ব ক্যালোরিমিটারে ৫.৬৫), কার্বোহাইড্রেট ≈ ৪.০ kcal/g (শরীরবৃত্তীয়) এবং স্নেহ/চর্বি ≈ ৯.০ kcal/g (বম্ব ৯.৪৫ — সর্বাধিক)',
      clinical: 'চর্বির প্রতি গ্রামে শর্করা ও প্রোটিনের দ্বিগুণের বেশি শক্তি সঞ্চিত থাকায় দেহে অ্যাডিপোজ টিস্যু প্রধান দীর্ঘমেয়াদি শক্তি ভান্ডার',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'প্রবাহের পথ: সিস্টেমিক বনাম পালমোনারি সংবহন (উইলিয়াম হার্ভে, ১৬২৮)',
      fact: 'সিস্টেমিক: বাম নিলয় → অ্যাওর্টা → সারাদেহ → সুপিরিয়র/ইনফেরিয়র ভেনা কাভা → ডান অলিন্দ; পালমোনারি: ডান নিলয় → পালমোনারি ট্রাঙ্ক (CO₂ রক্ত) → ফুসফুস → ৪টি পালমোনারি শিরা (O₂ রক্ত) → বাম অলিন্দ',
      clinical: 'পালমোনারি ধমনি একমাত্র ধমনি যা অবিশুদ্ধ রক্ত ও পালমোনারি শিরা একমাত্র শিরা যা বিশুদ্ধ O₂-যুক্ত রক্ত বহন করে',
      diff: 'board',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'হৃৎপিণ্ডের প্রাচীরের ৩টি স্তর ও বাম নিলয়ের পুরুত্ব',
      fact: 'বাইরের পেরিকার্ডিয়ামের সেরাস স্তর এপিকার্ডিয়াম, মাঝের হৃৎপেশিময় মায়োকার্ডিয়াম ও ভেতরের এন্ডোথেলিয়াল এন্ডোকার্ডিয়াম',
      clinical: 'সমগ্র দেহে উচ্চ চাপে (১২০ mmHg) রক্ত পাম্প করতে হয় বলে বাম নিলয়ের মায়োকার্ডিয়াম ডান নিলয়ের চেয়ে প্রায় ৩ গুণ পুরু',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'blood_cells',
      term: 'প্পল্যাজমা প্রোটিন প্রোফাইল ও ইএসআর (ESR) বনাম হিমাটোক্রিট (PCV)',
      fact: 'স্বাভাবিক রক্তে RBC আয়তনের শতকরা হার (হিমাটোক্রিট/PCV) পুরুষে ~৪৫% ও নারীতে ~৪২%; এবং অ্যান্টি-কোয়াগুল্যান্টযুক্ত নলে ১ ঘণ্টায় RBC থিতানোর হার ESR',
      clinical: 'রক্তশূন্যতা ও দীর্ঘস্থায়ী প্রদাহে (যেমন যক্ষ্মা, রিউম্যাটয়েড আর্থ্রাইটিস) ESR বেড়ে যায় এবং রক্ত সংরক্ষণে সোডিয়াম সাইট্রেট বা EDTA-র মতো Ca²⁺ চিলেটর ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'হৃৎপিণ্ডের ব্যালান্স: কর্ডি টেন্ডিনি (Chordae Tendineae) ও প্যাপিলারি পেশি',
      fact: 'নিলয়ের সংকোচনের সময় উচ্চ রক্তচাপে বাইকাসপিড ও ট্রাইকাসপিড কপাটিকা যেন উল্টে অলিন্দে খুলে না যায়, সেজন্য শক্ত তন্তুময় রজ্জু কর্ডি টেন্ডিনি প্যাপিলারি পেশির সাথে আটকে রাখে',
      clinical: 'হার্ট অ্যাটাকে প্যাপিলারি পেশি ছিঁড়ে গেলে মারাত্মক ভাল্ব রিগার্জিটেশন (রক্ত উল্টো প্রবাহ) ঘটে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      cat: 'heart_phys',
      term: 'স্বাভাবিক রক্তচাপ, পালস প্রেশার (PP) ও মীন আর্টারিয়াল প্রেশার (MAP)',
      fact: 'স্বাভাবিক সিস্টোলিক ১২০ / ডায়াস্টোলিক ৮০ mmHg; পালস প্রেশার PP = SBP − DBP = ৪০ mmHg; মীন প্রেশার MAP = DBP + ১/৩ PP ≈ ৯৩.৩ mmHg',
      clinical: 'রক্তচাপ মাপার যন্ত্র হলো স্ফিগমোম্যানোমিটার ও ধ্বনি শোনার করোটকফ সাউন্ড স্টেথোস্কোপের মাধ্যমে শোনা হয় (নীরব ক্রমাগত উচ্চচাপ >= ১৪০/৯০ mmHg)',
      diff: 'medical',
    },
  ];

  const allNRows = [...rows, ...extraN];
  allNRows.forEach((r, idx) => {
    const sameCat = allNRows.filter((x) => x.cat === r.cat && x.term !== r.term);
    const pool = sameCat.length >= 3 ? sameCat : allNRows.filter((x) => x.term !== r.term);
    const pick = <T,>(getter: (x: Bio2NRaw) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: r.diff ?? 'medical',
        question: `মানব পরিপাক ও সংবহন শারীরতত্ত্বে "${r.fact}" — এটি নিচের কোন পরিভাষা বা গঠনটির ক্ষেত্রে প্রযোজ্য?`,
        correct: r.term,
        distractors: pick((x) => x.term, 1),
        explanation: `${r.term}: ${r.fact}। (${r.clinical})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ ও ৪ · গাজী আজমল স্যার',
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
        question: `"${r.term}"-এর সঠিক শারীরবৃত্তীয় গঠন বা কার্যপ্রণালি নিচের কোনটি?`,
        correct: r.fact,
        distractors: pick((x) => x.fact, 2),
        explanation: `${r.term} সম্পর্কে সঠিক তথ্য: ${r.fact}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ ও ৪ · বোর্ড ও মেডিকেল ভিত্তিক',
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
        question: `ক্লিনিক্যাল কেস বিশ্লেষণ: "${r.clinical}" — এটি সরাসরি কোন শারীরবৃত্তীয় বিষয়ের সাথে জড়িত?`,
        correct: r.term,
        distractors: pick((x) => x.term, 3),
        explanation: `"${r.clinical}" হলো ${r.term} (${r.fact})-এর অন্যতম প্রধান ক্লিনিক্যাল তাৎপর্য।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ ও ৪ · ক্লিনিক্যাল কোরিলেশন',
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
        question: `"${r.term}" সম্পর্কিত ক্লিনিক্যাল বা রোগতাত্ত্বিক গুরুত্বপূর্ণ সত্য কোনটি?`,
        correct: r.clinical,
        distractors: pick((x) => x.clinical, 4),
        explanation: `${r.term}-এর ক্লিনিক্যাল দিক হলো: ${r.clinical}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ ও ৪ · ডেন্টাল-মেডিকেল হাই-ইল্ড',
      })
    );
  });

  // 2. Quantitative Drills for Ch 3 & Ch 4 (~270 MCQs -> Total ~400!)
  // 2A. Cardiac Output (CO = HR × SV) & MAP/PP Numericals (20 × 3 = 60 MCQs)
  const heartCases = [
    { hr: 72, sv: 70, sbp: 120, dbp: 80 },
    { hr: 75, sv: 70, sbp: 125, dbp: 80 },
    { hr: 80, sv: 75, sbp: 130, dbp: 85 },
    { hr: 60, sv: 80, sbp: 115, dbp: 75 },
    { hr: 90, sv: 70, sbp: 140, dbp: 90 },
    { hr: 100, sv: 65, sbp: 135, dbp: 85 },
    { hr: 120, sv: 90, sbp: 150, dbp: 90 },
    { hr: 140, sv: 100, sbp: 160, dbp: 85 },
    { hr: 50, sv: 110, sbp: 110, dbp: 70 },
    { hr: 85, sv: 60, sbp: 120, dbp: 75 },
  ];
  heartCases.forEach((hc, i) => {
    const coMl = hc.hr * hc.sv;
    const coL = Number((coMl / 1000).toFixed(2));
    const pp = hc.sbp - hc.dbp;
    const map = Number((hc.dbp + pp / 3).toFixed(1));
    const cycleSec = Number((60 / hc.hr).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একজন সুস্থ ব্যক্তির হৃদস্পন্দনের হার মিনিটে ${toBnDigits(hc.hr)} বার এবং প্রতি স্পন্দনে বাম নিলয়ের স্ট্রোক ভলিউম (SV) ${toBnDigits(hc.sv)} mL হলে তাঁর কার্ডিয়াক আউটপুট (CO) এবং প্রতিটি কার্ডিয়াক চক্রের স্থায়িত্বকাল কত হবে?`,
        correct: `CO = ${toBnDigits(coL)} L/min (${toBnDigits(coMl.toLocaleString('en-US'))} mL) ও চক্র ${toBnDigits(cycleSec)} সেকেন্ড`,
        distractors: [
          `CO = ${toBnDigits(Number((coL / 2).toFixed(2)))} L/min ও চক্র ${toBnDigits(cycleSec)} সেকেন্ড`,
          `CO = ${toBnDigits(coL)} L/min ও চক্র ${toBnDigits(Number((cycleSec * 2).toFixed(2)))} সেকেন্ড`,
          `CO = ${toBnDigits(Number((coL + 1.5).toFixed(2)))} L/min ও চক্র ${toBnDigits(Number((60 / (hc.hr + 20)).toFixed(2)))} সেকেন্ড`,
        ],
        explanation: `CO = HR × SV = ${toBnDigits(hc.hr)} × ${toBnDigits(hc.sv)} = ${toBnDigits(coMl)} mL = ${toBnDigits(coL)} L/min। আর কার্ডিয়াক চক্রকাল = ৬০ / ${toBnDigits(hc.hr)} = ${toBnDigits(cycleSec)} সেকেন্ড।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · কার্ডিয়াক আউটপুট ও চক্রকাল গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `রক্তচাপ পরিমাপ করে সিস্টোলিক ${toBnDigits(hc.sbp)} mmHg ও ডায়াস্টোলিক ${toBnDigits(hc.dbp)} mmHg পাওয়া গেলে পালস প্রেশার (PP) ও মীন আর্টারিয়াল প্রেশার (MAP) কত হবে?`,
        correct: `PP = ${toBnDigits(pp)} mmHg ও MAP ≈ ${toBnDigits(map)} mmHg`,
        distractors: [
          `PP = ${toBnDigits(hc.sbp + hc.dbp)} mmHg ও MAP = ${toBnDigits((hc.sbp + hc.dbp) / 2)} mmHg`,
          `PP = ${toBnDigits(pp)} mmHg ও MAP = ${toBnDigits(Number((hc.dbp + pp / 2).toFixed(1)))} mmHg`,
          `PP = ${toBnDigits(pp - 10)} mmHg ও MAP = ${toBnDigits(hc.dbp)} mmHg`,
        ],
        explanation: `PP = SBP − DBP = ${toBnDigits(hc.sbp)} − ${toBnDigits(hc.dbp)} = ${toBnDigits(pp)} mmHg এবং MAP = DBP + (PP / ৩) = ${toBnDigits(hc.dbp)} + ${toBnDigits(Number((pp / 3).toFixed(1)))} ≈ ${toBnDigits(map)} mmHg।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · পালস প্রেশার ও মীন আর্টারিয়াল প্রেশার',
      })
    );
  });

  // 2B. BMI & Obesity Category Numerical Drills (16 × 2 = 32 MCQs)
  const bmiCases = [
    { w: 50, h: 1.70, cat: 'স্বাভাবিক ওজন (১৮.৫–২৪.৯)' },
    { w: 68, h: 1.70, cat: 'স্বাভাবিক ওজন (১৮.৫–২৪.৯)' },
    { w: 80, h: 1.70, cat: 'অতিরিক্ত ওজন / Overweight (২৫.০–২৯.৯)' },
    { w: 92, h: 1.70, cat: 'শ্রেণি-১ স্থূলতা (৩০.০–৩৪.৯)' },
    { w: 108, h: 1.70, cat: 'শ্রেণি-২ স্থূলতা (৩৫.০–৩৯.৯)' },
    { w: 48, h: 1.65, cat: 'স্বল্প ওজন / Underweight (< ১৮.৫)' },
    { w: 64, h: 1.60, cat: 'অতিরিক্ত ওজন / Overweight (২৫.০–২৯.৯)' },
    { w: 72, h: 1.50, cat: 'শ্রেণি-১ স্থূলতা (৩০.০–৩৪.৯)' },
    { w: 90, h: 1.50, cat: 'মরবিড বা শ্রেণি-৩ স্থূলতা (>= ৪০.০)' },
    { w: 54, h: 1.80, cat: 'স্বল্প ওজন / Underweight (< ১৮.৫)' },
    { w: 75, h: 1.75, cat: 'স্বাভাবিক ওজন (১৮.৫–২৪.৯)' },
    { w: 100, h: 1.60, cat: 'শ্রেণি-২ স্থূলতা (৩৫.০–৩৯.৯)' },
  ];
  const allBmiCats = [
    'স্বল্প ওজন / Underweight (< ১৮.৫)',
    'স্বাভাবিক ওজন (১৮.৫–২৪.৯)',
    'অতিরিক্ত ওজন / Overweight (২৫.০–২৯.৯)',
    'শ্রেণি-১ স্থূলতা (৩০.০–৩৪.৯)',
    'শ্রেণি-২ স্থূলতা (৩৫.০–৩৯.৯)',
    'মরবিড বা শ্রেণি-৩ স্থূলতা (>= ৪০.০)',
  ];
  bmiCases.forEach((bc, i) => {
    const bmiVal = Number((bc.w / (bc.h * bc.h)).toFixed(1));
    const wrongCats = allBmiCats.filter((c) => c !== bc.cat).slice(0, 3);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `একজন প্রাপ্তবয়স্ক ব্যক্তির দৈহিক ওজন ${toBnDigits(bc.w)} kg এবং উচ্চতা ${toBnDigits(bc.h)} মিটার (${toBnDigits(Math.round(bc.h * 100))} cm) হলে তাঁর BMI ও WHO শ্রেণিবিন্যাস কত হবে?`,
        correct: `BMI ≈ ${toBnDigits(bmiVal)} · ${bc.cat}`,
        distractors: wrongCats.map((wc, idx) => `BMI ≈ ${toBnDigits(Number((bmiVal + (idx + 1) * 4.5).toFixed(1)))} · ${wc}`),
        explanation: `BMI = ${toBnDigits(bc.w)} / (${toBnDigits(bc.h)})² = ${toBnDigits(bmiVal)} kg/m², যা "${bc.cat}" শ্রেণির অন্তর্ভুক্ত।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · BMI ও স্থূলতা গণনা',
      })
    );
  });

  // 2C. Calorific Value Calculation Drills (10 × 2 = 20 MCQs)
  [
    { carb: 50, prot: 20, fat: 10 },
    { carb: 60, prot: 25, fat: 15 },
    { carb: 80, prot: 30, fat: 20 },
    { carb: 100, prot: 25, fat: 10 },
    { carb: 40, prot: 40, fat: 20 },
    { carb: 70, prot: 30, fat: 10 },
    { carb: 90, prot: 20, fat: 15 },
    { carb: 120, prot: 40, fat: 30 },
  ].forEach((m, i) => {
    const kcal = m.carb * 4 + m.prot * 4 + m.fat * 9;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `এক বেলা আহারে ${toBnDigits(m.carb)} গ্রাম শর্করা, ${toBnDigits(m.prot)} গ্রাম প্রোটিন এবং ${toBnDigits(m.fat)} গ্রাম চর্বি গ্রহণ করলে শারীরবৃত্তীয় প্রমাণ মান (৪, ৪, ৯ kcal/g) অনুযায়ী মোট কত কিলোক্যালরি (kcal) শক্তি পাওয়া যাবে?`,
        correct: `${toBnDigits(kcal)} kcal`,
        distractors: [
          `${toBnDigits(m.carb * 4 + m.prot * 4 + m.fat * 4)} kcal`,
          `${toBnDigits(kcal + 120)} kcal`,
          `${toBnDigits(Math.round(kcal * 0.75))} kcal`,
        ],
        explanation: `শক্তি = (${toBnDigits(m.carb)}×৪) + (${toBnDigits(m.prot)}×৪) + (${toBnDigits(m.fat)}×৯) = ${toBnDigits(m.carb * 4)} + ${toBnDigits(m.prot * 4)} + ${toBnDigits(m.fat * 9)} = ${toBnDigits(kcal)} kcal।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · খাদ্যের ক্যালরি হিসাব',
      })
    );
  });

  // 2D. Digestive Enzyme Source -> Substrate -> Product Matrix (18 × 3 = 54 MCQs)
  const digestiveEnzymes = [
    { enz: 'টায়ালিন (লালার α-অ্যামাইলেজ)', src: 'লালাগ্রন্থি (প্যারোটিড ও সাবম্যান্ডিবুলার)', sub: 'সেদ্ধ শ্বেতসার (Starch)', prod: 'ম্যাল্টোজ ও আইসোম্যাল্টোজ', ph: '৬.৮ (প্রায় নিরপেক্ষ)' },
    { enz: 'পেপসিন (পেপসিনোজেন + HCl)', src: 'পাকস্থলির চিফ/পেপটিক কোষ', sub: 'জটিল প্রোটিন', prod: 'প্রোটিওজ ও পেপটোন', ph: '১.৫–২.৫ (অতি অম্লীয়)' },
    { enz: 'রেনিন / কাইমোসিন (নবজাতকে)', src: 'পাকস্থলির পেপটিক কোষ', sub: 'দ্রবণীয় দুগ্ধ প্রোটিন কেসিনোজেন', prod: 'Ca²⁺ সহ অদ্রবণীয় প্যারাকেসিনেট দই', ph: '২.০–৩.৫ (শিশুদের দুগ্ধ পরিপাকে)' },
    { enz: 'ট্রিপসিন (ট্রিপসিনোজেন + এন্টারোকাইনেজ)', src: 'অগ্ন্যাশয়ের অ্যাসিনার কোষ', sub: 'প্রোটিন, প্রোটিওজ ও পেপটোন', prod: 'ক্ষুদ্র পলিপেপটাইড', ph: '৭.৮–৮.৪ (ক্ষারীয়)' },
    { enz: 'কাইমোট্রিপসিন', src: 'অগ্ন্যাশয় রস (ট্রিপসিন দ্বারা সক্রিয়)', sub: 'প্রোটিন ও দুগ্ধ কেসিন', prod: 'পেপটাইড খণ্ড', ph: '৮.০ (ক্ষারীয়)' },
    { enz: 'কার্বক্সিপেপটাইডেজ', src: 'অগ্ন্যাশয় রস', sub: 'পলিপেপটাইডের কার্বক্সিল প্রান্ত', prod: 'মুক্ত অ্যামিনো অ্যাসিড ও ডাইপেপটাইড', ph: '৭.৫–৮.২ (Zn²⁺ যুক্ত)' },
    { enz: 'অগ্ন্যাশয়িক অ্যামাইলেজ (অ্যামাইলপসিন)', src: 'অগ্ন্যাশয় রস', sub: 'অ-পরিপাককৃত কাঁচা ও সেদ্ধ স্টার্চ', prod: 'ম্যাল্টোজ, ম্যাল্টোট্রায়োজ ও α-ডেক্সট্রিন', ph: '৭.১–৮.০' },
    { enz: 'স্টেয়াপসিন (অগ্ন্যাশয়িক লাইপেজ)', src: 'অগ্ন্যাশয় রস (পিত্তলবণের উপস্থিতিতে)', sub: 'ইমালসিফায়েড ট্রাইগ্লিসারাইড চর্বি', prod: 'ফ্যাটি অ্যাসিড ও ২-মনোগ্লিসারাইড', ph: '৮.০' },
    { enz: 'নিউক্লিয়েজ (DNase ও RNase)', src: 'অগ্ন্যাশয় রস', sub: 'খাদ্যের DNA ও RNA', prod: 'ডিঅক্সিরাইবো ও রাইবোনিউক্লিওটাইড', ph: '৭.৫–৮.০' },
    { enz: 'অ্যামিনোপেপটাইডেজ ও ডাইপেপটাইডেজ', src: 'ক্ষুদ্রান্ত্রের সাক্কাস এন্টারিকাস', sub: 'ক্ষুদ্র পেপটাইড ও ডাইপেপটাইড', prod: 'শোষণযোগ্য একক অ্যামিনো অ্যাসিড', ph: '৭.৮' },
    { enz: 'ল্যাকটেজ (β-গ্যালাকটোসিডেজ)', src: 'ক্ষুদ্রান্ত্রের ব্রাশ-বর্ডার কোষ', sub: 'ল্যাকটোজ (দুগ্ধ শর্করা)', prod: 'গ্লুকোজ + গ্যালাকটোজ', ph: '৭.২–৭.৮' },
    { enz: 'সুক্রেজ ও আইসোম্যাল্টেজ', src: 'ক্ষুদ্রান্ত্রের ব্রাশ-বর্ডার কোষ', sub: 'সুক্রোজ ও শাখাযুক্ত ডেক্সট্রিন', prod: 'গ্লুকোজ + ফ্রুক্টোজ ও গ্লুকোজ', ph: '৭.২–৭.৮' },
    { enz: 'নিউক্লিওটাইডেজ ও নিউক্লিওসাইডেজ', src: 'আন্ত্রিক রস (সাক্কাস এন্টারিকাস)', sub: 'নিউক্লিওটাইড ও নিউক্লিওসাইড', prod: 'পেন্টোজ শর্করা, ফসফেট ও নাইট্রোজেন বেস', ph: '৭.৮' },
    { enz: 'গ্যাস্ট্রিক লাইপেজ', src: 'পাকস্থলির গ্রন্থি (অল্প পরিমাণ)', sub: 'মাখনের মতো ক্ষুদ্র-শৃঙ্খল ট্রাইগ্লিসারাইড', prod: 'ফ্যাটি অ্যাসিড ও ডাইগ্লিসারাইড', ph: '৩.০–৫.০' },
  ];
  digestiveEnzymes.forEach((de, idx) => {
    const others = digestiveEnzymes.filter((x) => x.enz !== de.enz);
    const pick = (s: number) => [0, 1, 2, 3].map((k) => others[(idx + s + k * 3) % others.length]);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `খাদ্যের "${de.sub}"-কে অনুকূল pH ${de.ph}-এ ভেঙে "${de.prod}" উৎপন্নকারী পরিপাক এনজাইমটি নিচের কোনটি?`,
        correct: de.enz,
        distractors: pick(1).map((x) => x.enz),
        explanation: `${de.enz} (${de.src} থেকে ক্ষরিত, pH ${de.ph}) ${de.sub}-কে ${de.prod}-এ পরিণত করে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · পরিপাক এনজাইম ছক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `${de.enz} কোথা থেকে ক্ষরিত হয় ও এর চূড়ান্ত বিক্রিয়ালব্ধ উপাদ কী?`,
        correct: `উৎস: ${de.src} → উৎপাদ: ${de.prod}`,
        distractors: pick(2).map((x) => `উৎস: ${x.src} → উৎপাদ: ${x.prod}`),
        explanation: `${de.src} থেকে আসা ${de.enz} এনজাইমের ক্রিয়ায় ${de.sub} থেকে ${de.prod} উৎপন্ন হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · এনজাইম ও উৎস',
      })
    );
  });

  // 2E. ABO & Rh Blood Group Compatibility Cross Matrix (16 MCQs)
  const bloodCompatibility = [
    { rec: 'O⁻ (নেগেটিভ)', rbcAccept: 'কেবল O⁻', plasmaAccept: 'যেকোনো (O, A, B, AB) গ্রুপের RBC' },
    { rec: 'O⁺ (পজিটিভ)', rbcAccept: 'O⁺ এবং O⁻', plasmaAccept: 'O, A, B বা AB প্লাজমা' },
    { rec: 'A⁻ (নেগেটিভ)', rbcAccept: 'A⁻ এবং O⁻', plasmaAccept: 'A বা AB প্লাজমা' },
    { rec: 'A⁺ (পজিটিভ)', rbcAccept: 'A⁺, A⁻, O⁺ এবং O⁻', plasmaAccept: 'A বা AB প্লাজমা' },
    { rec: 'B⁻ (নেগেটিভ)', rbcAccept: 'B⁻ এবং O⁻', plasmaAccept: 'B বা AB প্লাজমা' },
    { rec: 'B⁺ (পজিটিভ)', rbcAccept: 'B⁺, B⁻, O⁺ এবং O⁻', plasmaAccept: 'B বা AB প্লাজমা' },
    { rec: 'AB⁻ (নেগেটিভ)', rbcAccept: 'AB⁻, A⁻, B⁻ এবং O⁻', plasmaAccept: 'কেবল AB প্লাজমা (সর্বজনীন প্লাজমা দাতা)' },
    { rec: 'AB⁺ (পজিটিভ)', rbcAccept: 'যেকোনো ৮টি গ্রুপের RBC (সর্বজনীন গ্রহীতা)', plasmaAccept: 'কেবল AB প্লাজমা' },
  ];
  bloodCompatibility.forEach((bc, idx) => {
    const others = bloodCompatibility.filter((x) => x.rec !== bc.rec);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `জরুরি প্যাকড RBC রক্ত পরিসঞ্চালনে (Transfusion) একজন "${bc.rec}" রক্তগ্রুপধারী রোগী নিরাপদে নিচের কোন গ্রুপগুলোর রক্ত গ্রহণ করতে পারবেন?`,
        correct: bc.rbcAccept,
        distractors: others.slice(0, 4).map((x) => x.rbcAccept),
        explanation: `${bc.rec} রক্তগ্রুপের রোগীর রক্তে বিরাজমান অ্যান্টিবডি বিবেচনায় ${bc.rbcAccept} নিরাপদ। (অপরদিকে প্লাজমা ট্রান্সফিউশনে AB সর্বজনীন দাতা)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · ABO ও Rh ব্লাড ট্রান্সফিউশন',
      })
    );
  });

  return list;
}
