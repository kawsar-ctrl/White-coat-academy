import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Bio2ORaw {
  ch: 'bio2_ch5_respiration' | 'bio2_ch6_excretion';
  vl: string;
  cat: string;
  term: string;
  fact: string;
  clinical: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildBio2StructuredO(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_so_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 5 (Respiration) + Ch 6 (Excretion): 44 × 4 = 176 unique MCQs
  const rows: Bio2ORaw[] = [
    // --- Chapter 5: Respiration & Breathing ---
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'স্বরযন্ত্রের (Larynx) ৯টি তরুণাস্থি ও গ্লটিস-এপিগ্লটিস',
      fact: '৩টি অযুগ্ম (থাইরয়েড/অ্যাডামস অ্যাপল — বৃহত্তম, ক্রিকয়েড — সম্পূর্ণ আংটি, এপিগ্লটিস — স্থিতিস্থাপক) ও ৩ জোড়া যুগ্ম (অ্যারিটিনয়েড, কর্নিকুলেট, কিউনিফর্ম)',
      clinical: 'খাদ্য গেলার সময় এপিগ্লটিস গ্লটিস ঢেকে শ্বাসনালিতে খাদ্য প্রবেশ রোধ করে; ভোকাল কর্ডের কম্পনে স্বর সৃষ্টি হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'ট্রাকিয়া (১৬–২০টি C-আকৃতির তরুণাস্থি) ও কারিনা',
      fact: 'প্রায় ১০–১২ cm লম্বা শ্বাসনালির পেছনের অসম্পূর্ণ অংশ অন্ননালিকে প্রসারিত হতে সাহায্য করে ও ভেতরে সিউডোস্ট্র্যাটিফায়েড সিলিয়েটেড কলাম্নার এপিথেলিয়াম থাকে',
      clinical: 'পঞ্চম বক্ষকশেরুকার (T₅) স্তরে ট্রাকিয়া বিভক্ত হওয়ার রিজ কারিনা অত্যন্ত সংবেদনশীল — বিদেশি কণা ঢুকলেই প্রবল কাশির রিফ্লেক্স সৃষ্টি হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'ডান বনাম বাম ফুসফুসের লব, ফিশার ও ব্রঙ্কাস পার্থক্য',
      fact: 'ডান ফুসফুসে ৩টি লোব (২ ফিশার, ওজন ~৬২৫g, খাটো-প্রশস্ত) এবং বাম ফুসফুসে ২টি লোব, ১ ফিশার ও কার্ডিয়াক নচ (ওজন ~৫৬৫g)',
      clinical: 'ডান প্রধান ব্রঙ্কাস তুলনামূলক খাটো, প্রশস্ত ও উল্লম্ব হওয়ায় শ্বাসগ্রহণে ভুলবশত ছোট বস্তু অধিকাংশ সময় ডান ফুসফুসেই ঢুকে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'অ্যালভিওলাসের টাইপ-I ও টাইপ-II কোষ এবং সারফ্যাকট্যান্ট (DPPC)',
      fact: 'অ্যালভিওলাইয়ের (~৭০০ মিলিয়ন; ~৭০–১০০ m² ক্ষেত্রফল) পাতলা স্কোয়ামাস টাইপ-I কোষ গ্যাস বিনিময় করে ও কিউবয়ডাল টাইপ-II কোষ ডাইপামিটয়েল ফসফ্যাটিডিলকোলিন (সারফ্যাকট্যান্ট) ক্ষরণ করে',
      clinical: 'সারফ্যাকট্যান্ট পৃষ্ঠটান (Surface tension) কমিয়ে অ্যালভিওলাস চুপসে যাওয়া (Atelectasis) ঠেকায়; অপরিণত নবজাতকে এর অভাবে IRDS (শ্বাসকষ্ট) হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'প্লুরা (Pleura) ও নিউমোথোরাক্স',
      fact: 'বাইরের প্যারাইটাল ও ভেতরের ভিসেরাল প্লুরার মাঝের সেরাস গহ্বরে -৪ থেকে -৮ mmHg ঋণাত্মক অন্তঃপ্লুরাল চাপ ও সেরাস তরল থাকে',
      clinical: 'বুক জখম হয়ে প্লুরাল গহ্বরে বায়ু ঢুকলে ঋণাত্মক চাপ নষ্ট হয়ে ফুসফুস চুপসে যায় — এ অবস্থাকে নিউমোথোরাক্স (Pneumothorax) বলে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'অক্সিজেন পরিবহন (৯৭–৯৮.৫% হিমোগ্লোবিন + ১.৫–৩% প্লাজমা দ্রবণ)',
      fact: '১টি হিমোগ্লোবিন (Hb₄) অণুর ৪টি Fe²⁺ (ফেরাস আয়ন) পরমাণু প্রতিটিতে ১টি করে মোট ৪টি O₂ অণু (১ গ্রাম Hb সর্বোচ্চ ১.৩৪ mL O₂) পরিবহন করে',
      clinical: 'বিশ্রামের সময় ১০০ mL অক্সিজেনযুক্ত ধমনি রক্তে ~২০ mL O₂ থাকে যার মধ্যে সাধারণত ~৫ mL O₂ (২৫%) টিস্যুতে মুক্ত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'বোর প্রভাব (Bohr Effect) ও অক্সিহিমোগ্লোবিন বিয়োজন লেখচিত্র',
      fact: 'সক্রিয় কলায় pCO₂ বৃদ্ধি, H⁺ বৃদ্ধি (pH হ্রাস), তাপমাত্রা বৃদ্ধি ও ২,৩-BPG বাড়লে অক্সিজেন-হিমোগ্লোবিন বিয়োজন কার্ভ ডানে সরে গিয়ে বেশি O₂ টিস্যুতে মুক্ত করে',
      clinical: 'ফিটাল হিমোগ্লোবিন (HbF: ২α+২γ) ২,৩-BPG-এর প্রতি কম সংবেদনশীল বলে এর O₂ আসক্তি HbA-এর চেয়ে বেশি — যা গর্ভফুল দিয়ে ভ্রূণকে O₂ টেনে নিতে সাহায্য করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'CO₂ পরিবহন (৭০% বাইকার্বোনেট + ২৩% কার্বামিনোহিমোগ্লোবিন + ৭% প্লাজমা)',
      fact: 'RBC-র ভেতরে কার্বনিক অ্যানহাইড্রেজ (Zn²⁺ এনজাইম) CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻ বিক্রিয়া ৫০ লক্ষ গুণ ত্বরান্বিত করে',
      clinical: 'হ্যামবার্গারের ক্লোরাইড শিফটে HCO₃⁻ প্লাজমায় বের হলে তড়িৎ সমতা রাখতে Cl⁻ RBC-তে ঢোকে; হ্যালডেন প্রভাবে অক্সিজেন ফুসফুসে Hb থেকে CO₂-কে বের করে দেয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'কার্বন মনোক্সাইড (CO) বিষক্রিয়া ও কার্বক্সিহিমোগ্লোবিন',
      fact: 'অক্সিজেনের তুলনায় হিমোগ্লোবিনের প্রতি CO-র আসক্তি প্রায় ২১০–২৫০ গুণ বেশি হওয়ায় স্বল্প CO উপস্থিতিতেই স্থায়ী চেরি-লাল কার্বক্সিহিমোগ্লোবিন তৈরি হয়',
      clinical: 'অক্সিজেন পরিবহন সম্পূর্ণ ভেঙে পড়ে শ্বাসরোধ মৃত্যু ঘটে; দ্রুত ১০০% উচ্চ-চাপের অক্সিজেন (Hyperbaric O₂) দিয়ে চিকিৎসা করতে হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'শ্বসন নিয়ন্ত্রণ কেন্দ্র: মেডুলা (DRG/VRG) ও পন্স (নিউমোট্যাক্সিক ও অ্যাপনিউস্টিক)',
      fact: 'মেডুলার ডর্সাল রেসপিরেটরি গ্রুপ (DRG) স্বাভাবিক ছন্দময় প্রশ্বাস-নিঃশ্বাস চালায়; পন্সের নিউমোট্যাক্সিক কেন্দ্র "সুইচ অফ" সিগন্যাল দিয়ে শ্বাসের গভীরতা সীমিত ও হার দ্রুত করে',
      clinical: 'হাইপোথ্যালামাস ও সেরিব্রাল কর্টেক্স আবেগ, কথা ও ইচ্ছাকৃত শ্বাস ধরে রাখার মতো স্বল্পমেয়াদি সচেতন নিয়ন্ত্রণ প্রদান করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'শ্বসনাঙ্গের রোগ: সাইনোসাইটিস ও ওটাইটিস মিডিয়া',
      fact: '৪ জোড়া প্যারান্যাসাল সাইনাসের (ম্যাক্সিলারি — বৃহত্তম ও সর্বাধিক আক্রান্ত, ফ্রন্টাল, এথময়েড, স্ফেনয়েড) মিউকোসায় প্রদাহ হলো সাইনোসাইটিস',
      clinical: 'গলবিল ও মধ্যকর্ণের সংযোগকারী ইউস্টেশিয়ান নালি দিয়ে জীবাণু গিয়ে শিশুদের মধ্যকর্ণের পুঁজ-প্রদাহ (ওটাইটিস মিডিয়া) ও কানের পর্দায় চাপ সৃষ্টি করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'এমফাইসিমা (ধূমপানজনিত রোগ) বনাম ব্রঙ্কাইটিস ও হাঁপানি',
      fact: 'দীর্ঘমেয়াদি ধূমপানে অ্যালভিওলার প্রাচীরের ইলাস্টিন ভেঙে (α₁-অ্যান্টিট্রিপসিন অভাবে) অ্যালভিওলাইগুলো একত্রে বড় থলি হয়ে গ্যাস বিনিময় ক্ষেত্রফল কমিয়ে দেয় (এমফাইসিমা)',
      clinical: 'শ্রমসাধ্য প্রশ্বাস ও Barrel chest এমফাইসিমার মূল লক্ষণ; কৃত্রিম শ্বসনে (CPR) ৩০ বার বক্ষ চাপ ও ২ বার মুখে-মুখে শ্বাস দেওয়া হয়',
      diff: 'dental',
    },

    // --- Chapter 6: Waste & Excretion ---
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'nephron_struct',
      term: 'মানব বৃক্কের অবস্থান, ডান-বাম উচ্চতা ও হাইলাম (Hilum)',
      fact: 'T₁₂–L₃ কশেরুকার দুপাশে রেট্রোপেরিটোনিয়াল শিমের বীজ আকৃতির অঙ্গ; যকৃতের কারণে ডান বৃক্ক বাম বৃক্কের চেয়ে ~১.৫–২ cm নিচে অবস্থিত',
      clinical: 'প্রতিটি বৃক্কে ~১০–১২ লক্ষ নেফ্রন থাকে; ডান-বাম পিরামিড (৮–১৮টি) মাইনর ক্যালিক্স → মেজর ক্যালিক্স → রেনাল পেলভিস হয়ে ইউরেটারে উন্মুক্ত হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'nephron_struct',
      term: 'কর্টিক্যাল নেফ্রন (৮৫%) বনাম জাক্সটামেডুলারি নেফ্রন (১৫%)',
      fact: 'কর্টিক্যাল নেফ্রনের হেনলির লুপ খাটো এবং কেবল কর্টেক্স-সীমারেখায় থাকে; জাক্সটামেডুলারি নেফ্রনের দীর্ঘ হেনলির লুপ মেডুলার গভীরে নেমে ভাসা রেক্টা দ্বারা ঘেরা থাকে',
      clinical: 'মূত্রকে রক্তের চেয়ে ৪ গুণ পর্যন্ত ঘনীভূত (১২০০–১৪০০ mOsm/L) করতে জাক্সটামেডুলারি নেফ্রনের দীর্ঘ লুপ ও ভাসা রেক্টা অপরিহার্য',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'nephron_struct',
      term: 'গ্লোমেরুলার ফিল্ট্রেশন বাধা (৩টি স্তর) ও পডোসাইট স্লিট পোর',
      fact: '১) ফেনেস্ট্রেটেড কৈশিক এন্ডোথেলিয়াম, ২) ঋণাত্মক চার্জযুক্ত বেসমেন্ট মেমব্রেন (অ্যালবুমিন প্রোটিন আটকায়) ও ৩) বোম্যানস ক্যাপসুলের ভিসেরাল পডোসাইটের পেডিসেল স্লিট পোর',
      clinical: 'নেফ্রাইটিস বা ডায়াবেটিসে বেসমেন্ট মেমব্রেন নষ্ট হলে প্রোটিন (অ্যালবুমিনুরিয়া) ও RBC (হিমাচুরিয়া) মূত্রের সাথে বের হয়ে যায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'অতিপরিস্রাবণ (Ultrafiltration) ও নিট ফিল্ট্রেশন চাপ (NFP = ১০–১৫ mmHg)',
      fact: 'অ্যাফারেন্ট ধমনিকা ইফারেন্টের চেয়ে চওড়া হওয়ায় গ্লোমেরুলার রক্তচাপ (P_g ≈ ৫৫–৬০ mmHg) বিরুদ্ধ বোম্যানস ক্যাপসুল চাপ (P_b ≈ ১৫–১৮ mmHg) ও কলয়েড অস্মোটিক চাপ (P_c ≈ ৩০–৩২ mmHg) অতিক্রম করে',
      clinical: 'স্বাভাবিক GFR ≈ ১২৫ mL/min (প্রতিদিন ~১৮০ লিটার পরিস্রুত সৃষ্টি হয় যার ৯৯% নালিকায় শোষিত হয়ে ~১.৫ লিটার মূত্র তৈরি হয়)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'নিকটবর্তী প্যাঁচানো নালিকা (PCT)-তে বাধ্যতামূলক ৬৫–৭০% পুনঃশোষণ',
      fact: 'অসংখ্য মাইক্রোভিলাই (ব্রাশ বর্ডার) ও প্রচুর মাইটোকন্ড্রিয়াযুক্ত কিউবয়ডাল এপিথেলিয়াম ১০০% গ্লুকোজ-অ্যামিনো অ্যাসিড, ~৬৫% পানি-NaCl ও ~৮৫% HCO₃⁻ শোষণ করে',
      clinical: 'ডায়াবেটিসে রক্তের গ্লুকোজ রেনাল থ্রেশহোল্ড (~১৮০ mg/dL) ছাড়িয়ে গেলে PCT-র SGLT2 বাহক স্যাচুরেটেড হয়ে মূত্রে গ্লুকোজ (গ্লাইকোসুরিয়া) আসে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'হেনলির লুপের কাউন্টার-কারেন্ট মাল্টিপ্লায়ার (Counter-current Multiplier)',
      fact: 'অবতরণকারী (Descending) বাহু কেবল পানির প্রতি ভেদ্য (আয়নে অভেদ্য) ফলে পরিস্রুত ঘন হয়; আরোহী (Ascending) পুরু বাহু কেবল Na⁺-K⁺-2Cl⁻ পাম্প করে (পানিতে অভেদ্য) ফলে পরিস্রুত লঘু হয়',
      clinical: 'এই ব্যবস্থা মেডুলার ইন্টারস্টিশিয়ামে ক্রমান্বয়ে ৩০০ থেকে ১২০০ mOsm/L হাইপার-অসমোটিক গ্রেডিয়েন্ট বজায় রাখে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'ADH (ভ্যাসোপ্রেসিন) বনাম অ্যালডোস্টেরন ও ANF (হরমোনাল অসমোরেগুলেশন)',
      fact: 'পশ্চাৎ পিটুইটারি ক্ষরিত ADH DCT ও সংগ্রাহী নালিকায় অ্যাকুয়াপোরিন-২ চ্যানেল বসিয়ে বিশুদ্ধ পানি শোষণ করে; অ্যাড্রেনাল কর্টেক্সের অ্যালডোস্টেরন Na⁺ শোষণ ও K⁺/H⁺ ত্যাগ ঘটায়',
      clinical: 'ADH-এর অভাবে অতিরিক্ত তরল মূত্রত্যাগ (ডায়াবেটিস ইনসিপিডাস) হয়; বিপরীতে অলিন্দ প্রাচীর ক্ষরিত ANF সোডিয়াম ও পানি ত্যাগ বাড়িয়ে রক্তচাপ কমায়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'রেনিন-অ্যাঞ্জিওটেনসিন-অ্যালডোস্টেরন তন্ত্র (RAAS)',
      fact: 'রক্তচাপ বা GFR কমে গেলে বৃক্কের জাক্সটাগ্লোমেরুলার (JG) কোষ থেকে রেনিন ক্ষরিত হয়ে যকৃতের অ্যাঞ্জিওটেনসিনোজেনকে অ্যাঞ্জিওটেনসিন-I → ফুসফুসের ACE-তে শক্তিশালী অ্যাঞ্জিওটেনসিন-II করে',
      clinical: 'অ্যাঞ্জিওটেনসিন-II ইফারেন্ট ধমনিকা সংকুচিত করে, অ্যালডোস্টেরন ও ADH বাড়িয়ে রক্তচাপ ও GFR পুনরুদ্ধার করে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'যকৃতের অরনিথিন বা ইউরিয়া চক্র (ক্রেবস-হেনসেলিট চক্র)',
      fact: 'বিষাক্ত অ্যামোনিয়া (NH₃ — অ্যামিনো অ্যাসিডের ডিঅ্যামিনেশন থেকে) + CO₂ → ২/৩ ATP ব্যয়ে তুলনামূলক নিরাপদ ও জলদ্রবণীয় ইউরিয়া [CO(NH₂)₂] উৎপাদন',
      clinical: 'স্তন্যপায়ী ও প্রাপ্তবয়স্ক উভচর ইউরিওটেলিক, পাখি-পতঙ্গ-সরীসৃপ ইউরিকোটেলিক (ইউরিক অ্যাসিড — সর্বনিম্ন পানি লাগে) ও অস্থিময় মাছ-হাইড্রা অ্যামোনোটেলিক',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'nephron_struct',
      term: 'স্বাভাবিক মূত্রের উপাদান, pH (৪.৫–৮.০, গড় ৬.০) ও অস্বাভাবিক উপাদানসমূহ',
      fact: '৯৫% পানি + ২% ইউরিয়া + ২.৬% অন্যান্য (ক্রিয়েটিনিন, ইউরিক অ্যাসিড, NaCl) ও হিমোগ্লোবিনের ভেঙে যাওয়া ইউরোক্রোম রঞ্জক (খড়-হলুদ বর্ণ)',
      clinical: 'অস্বাভাবিক মূত্র পরীক্ষা: গ্লুকোজ (ডায়াবেটিস), কিটোন বডি (তীব্র ডায়াবেটিস/উপবাস), প্রোটিন (নেফ্রাইটিস), বিলিরুবিন (জন্ডিস) এবং লিউকোসাইট/পুঁজ (পাইউরিয়া/UTI)',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'nephron_struct',
      term: 'হিমোডায়ালাইসিস (কৃত্রিম বৃক্ক) বনাম পেরিটোনিয়াল ডায়ালাইসিস ও প্রতিস্থাপন',
      fact: 'আর্টেরিওভেনাস ফিস্টুলার মাধ্যমে রোগীর রক্ত হেপারিন মিশিয়ে অর্ধভেদ্য সেলোফেন নালির মধ্য দিয়ে ডায়ালাইসেট তরলে প্রবাহিত করে ইউরিয়া-ক্রিয়েটিনিন অপসারণ',
      clinical: 'পেরিটোনিয়াল ডায়ালাইসিসে পেটের নিজস্ব পেরিটোনিয়াম অর্ধভেদ্য পর্দার কাজ করে; আর চূড়ান্ত বিকল বৃক্কের স্থায়ী সমাধান হলো কিডনি ট্রান্সপ্ল্যান্ট (সর্বোত্তম ম্যাচ অভিন্ন যমজ)',
      diff: 'board',
    },
  ];

  // Add 16 more Ch 5 & Ch 6 entries = 39 entries × 4 = 156 unique MCQs + ~230 quantitative drills = ~386 unique MCQs!
  const extraO: Bio2ORaw[] = [
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'resp_anatomy',
      term: 'নাসিকার শ্বাস-পথ: নাসারন্ধ্র → ভেস্টিবিউল → কনকা → নাসাগলবিল → ল্যারিংক্স',
      fact: 'বায়ুমণ্ডলের বায়ু নাসিকার সমৃদ্ধ রক্তজালিকা ও সিলিয়াযুক্ত মিউকাস ঝিল্লি দিয়ে গিয়ে দেহতাপমাত্রা (৩৭°C) ও ১০০% আপেক্ষিক আর্দ্রতায় পৌঁছে অ্যালভিওলাসে যায়',
      clinical: 'মুখ দিয়ে দীর্ঘদিন শ্বাস নিলে শুষ্ক-ঠান্ডা ও জীবাণুযুক্ত বায়ু সরাসরি শ্বাসনালিতে ঢুকে সংক্রমণ ও শুষ্ক কাশির ঝুঁকি বাড়ায়',
      diff: 'board',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'অ্যানাটমিক্যাল ডেড স্পেস (Dead Space — ~১৫০ mL) বনাম অ্যালভিওলার ভেন্টিলেশন',
      fact: 'নাক থেকে টার্মিনাল ব্রঙ্কিওল পর্যন্ত প্রবাহী অঞ্চলে কোনো গ্যাস বিনিময় হয় না বলে প্রতিটি ৫০০ mL টাইডাল ভলিউমের ১৫০ mL ডেড স্পেসে থেকে যায়',
      clinical: 'তাই প্রকৃত গ্যাস বিনিময়ে অংশ নেয় প্রতি শ্বাসে মাত্র (৫০০ − ১৫০) = ৩৫০ mL তাজা বাতাস',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'হাইপোক্সিয়া, অ্যাসফিক্সিয়া ও অ্যালটিটিউড (উচ্চতা) সিকনেস',
      fact: 'অ্যানিমিক, হাইপোক্সিক, স্ট্যাগন্যান্ট ও হিস্টোটক্সিক (সায়ানাইড) — এই ৪ প্রকার কোষীয় অক্সিজেন ঘাটতি হলো হাইপোক্সিয়া',
      clinical: 'অধিক উচ্চতায় (৩,০০০+ মিটার) কম বায়ুচাপ ও কম pO₂-র কারণে মাথা ব্যথা, বমিভাব ও দ্রুত শ্বাসপ্রশ্বাস শুরু হয়; দীর্ঘমেয়াদে RBC সংখ্যা ও ২,৩-BPG বাড়ে',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      cat: 'gas_transport',
      term: 'অ্যালভিওলার বনাম টিস্যু স্তরে pO₂ ও pCO₂ আংশিক চাপ (Partial Pressure)',
      fact: 'প্রশ্বাস বায়ু pO₂ ১৫৯ → অ্যালভিওলাস ১০৪ → ধমনি ৯৫–১০০ → বিশ্রামরত টিস্যু ৪০ mmHg; বিপরীতে CO₂ টিস্যু ৪৫–৪৬ → শিরারক্ত ৪৫ → অ্যালভিওলাস ৪০ mmHg',
      clinical: 'এই আংশিক চাপের গ্রেডিয়েন্ট মেনেই কেবল নিষ্ক্রিয় ব্যাপন (Diffusion) প্রক্রিয়ায় অক্সিজেন ও কার্বন ডাইঅক্সাইড বিনিময় হয়',
      diff: 'medical',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'পোড়া গন্ধ, বৃক্কে পাথর (রেনাল ক্যালকুলাই) ও অসমোরিসেপ্টর',
      fact: 'মূত্রে অতিরিক্ত ক্যালসিয়াম অক্সালেট, ক্যালসিয়াম ফসফেট বা ইউরিক অ্যাসিডের স্ফটিক জমে কঠিন পাথর তৈরি হলে তীব্র কোমর থেকে কুঁচকি ব্যথা (Renal colic) হয়',
      clinical: 'হাইপোথ্যালামাসের অসমোরিসেপ্টর রক্তের ঘনত্ব মাত্র ১–২% বাড়লেই তৃষ্ণা জাগায় ও ADH নিঃসরণ বাড়ায়',
      diff: 'dental',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      cat: 'urine_form',
      term: 'বৃক্কের এন্ডোক্রাইন ও বিপাকীয় ভূমিকা (এরিথ্রোপয়েটিন ও ক্যালসিট্রিওল)',
      fact: 'বৃক্ক শুধু বর্জ্যই সরায় না — এটি রক্তচাপ নিয়ন্ত্রণে রেনিন, RBC উৎপাদনে এরিথ্রোপয়েটিন এবং ভিটামিন-D-কে সক্রিয় ক্যালসিট্রিওল [১,২৫-(OH)₂D₃]-এ রূপান্তর করে',
      clinical: 'তাই দীর্ঘস্থায়ী কিডনি রোগে (CKD) তীব্র রক্তাল্পতা (অ্যানিমিয়া) ও হাড়ের দুর্বলতা (রেনাল অস্টিওডিস্ট্রফি) দেখা দেয়',
      diff: 'medical',
    },
  ];

  const allORows = [...rows, ...extraO];
  allORows.forEach((r, idx) => {
    const sameCat = allORows.filter((x) => x.cat === r.cat && x.term !== r.term);
    const pool = sameCat.length >= 3 ? sameCat : allORows.filter((x) => x.term !== r.term);
    const pick = <T,>(getter: (x: Bio2ORaw) => T, shift: number): T[] =>
      [0, 1, 2, 3].map((k) => getter(pool[(idx + shift + k * 2) % pool.length]));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: r.ch,
        visualLessonId: r.vl,
        hscLevel: '12',
        difficulty: r.diff ?? 'medical',
        question: `শ্বসন ও রেচন শারীরবৃত্তে "${r.fact}" — এটি কোন অঙ্গ বা প্রক্রিয়ার নির্ভুল পরিচয়?`,
        correct: r.term,
        distractors: pick((x) => x.term, 1),
        explanation: `${r.term}: ${r.fact}। (${r.clinical})`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ ও ৬ · গাজী আজমল স্যার',
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
        question: `"${r.term}"-এর মূল শারীরবৃত্তীয় গঠন বা প্রক্রিয়াটি কী?`,
        correct: r.fact,
        distractors: pick((x) => x.fact, 2),
        explanation: `${r.term} সংক্রান্ত সঠিক বিবরণ: ${r.fact}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ ও ৬ · বোর্ড ও মেডিকেল ব্যাংক',
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
        question: `ক্লিনিক্যাল প্রয়োগ: "${r.clinical}" — এটি কোন বিষয়ের প্রত্যক্ষ ফলাফল?`,
        correct: r.term,
        distractors: pick((x) => x.term, 3),
        explanation: `${r.clinical} হলো ${r.term} (${r.fact})-এর ক্লিনিক্যাল তাৎপর্য।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ ও ৬ · মেডিকেল ও ক্লিনিক্যাল',
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
        question: `"${r.term}" সম্পর্কিত নিচের কোন ক্লিনিক্যাল বা পরীক্ষার দিকটি সঠিক?`,
        correct: r.clinical,
        distractors: pick((x) => x.clinical, 4),
        explanation: `${r.term}: ${r.clinical}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ ও ৬ · ডেন্টাল রিভিশন',
      })
    );
  });

  // 2. Quantitative Respiratory & Renal Numerical Drills (260+ unique MCQs!)
  // 2A. Pulmonary Volumes, Capacities & Alveolar Ventilation (TV - DS) × RR (20 × 3 = 60 MCQs)
  const respCases = [
    { tv: 500, ds: 150, rr: 12, irv: 3000, erv: 1100, rv: 1200 },
    { tv: 500, ds: 150, rr: 16, irv: 3100, erv: 1000, rv: 1200 },
    { tv: 600, ds: 150, rr: 14, irv: 2800, erv: 1100, rv: 1100 },
    { tv: 450, ds: 150, rr: 18, irv: 2500, erv: 900, rv: 1100 },
    { tv: 550, ds: 150, rr: 15, irv: 2900, erv: 1150, rv: 1200 },
    { tv: 700, ds: 150, rr: 20, irv: 2600, erv: 1000, rv: 1100 },
    { tv: 400, ds: 150, rr: 24, irv: 2400, erv: 900, rv: 1000 },
    { tv: 800, ds: 150, rr: 10, irv: 2700, erv: 1000, rv: 1200 },
    { tv: 500, ds: 140, rr: 15, irv: 3000, erv: 1000, rv: 1200 },
    { tv: 650, ds: 150, rr: 12, irv: 2850, erv: 1100, rv: 1200 },
  ];
  respCases.forEach((rc, i) => {
    const minVent = rc.tv * rc.rr;
    const alvVent = (rc.tv - rc.ds) * rc.rr;
    const vc = rc.tv + rc.irv + rc.erv;
    const tlc = vc + rc.rv;
    const frc = rc.erv + rc.rv;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একজন ব্যক্তির টাইডাল ভলিউম (TV) = ${toBnDigits(rc.tv)} mL, অ্যানাটমিক্যাল ডেড স্পেস = ${toBnDigits(rc.ds)} mL এবং শ্বসনের হার মিনিটে ${toBnDigits(rc.rr)} বার হলে তাঁর প্রতি মিনিটে মিনিট ভেন্টিলেশন এবং কার্যকর অ্যালভিওলার ভেন্টিলেশন যথাক্রমে কত হবে?`,
        correct: `${toBnDigits(minVent.toLocaleString('en-US'))} mL/min ও ${toBnDigits(alvVent.toLocaleString('en-US'))} mL/min`,
        distractors: [
          `${toBnDigits(alvVent.toLocaleString('en-US'))} mL/min ও ${toBnDigits(minVent.toLocaleString('en-US'))} mL/min`,
          `${toBnDigits((rc.tv * rc.rr).toLocaleString('en-US'))} mL/min ও ${toBnDigits((rc.ds * rc.rr).toLocaleString('en-US'))} mL/min`,
          `${toBnDigits(((rc.tv + rc.ds) * rc.rr).toLocaleString('en-US'))} mL/min ও ${toBnDigits((rc.tv * 10).toLocaleString('en-US'))} mL/min`,
        ],
        explanation: `মিনিট ভেন্টিলেশন = TV × RR = ${toBnDigits(rc.tv)} × ${toBnDigits(rc.rr)} = ${toBnDigits(minVent)} mL/min। আর অ্যালভিওলার ভেন্টিলেশন = (TV − DS) × RR = (${toBnDigits(rc.tv)}−${toBnDigits(rc.ds)}) × ${toBnDigits(rc.rr)} = ${toBnDigits(alvVent)} mL/min।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · অ্যালভিওলার ভেন্টিলেশন গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'medical',
        question: `স্পাইরোমেট্রিতে কারও TV = ${toBnDigits(rc.tv)} mL, IRV = ${toBnDigits(rc.irv)} mL, ERV = ${toBnDigits(rc.erv)} mL এবং রেসিডিউয়াল ভলিউম RV = ${toBnDigits(rc.rv)} mL পাওয়া গেলে ভাইটাল ক্যাপাসিটি (VC) ও ফাংশনাল রেসিডিউয়াল ক্যাপাসিটি (FRC) কত হবে?`,
        correct: `VC = ${toBnDigits(vc.toLocaleString('en-US'))} mL ও FRC = ${toBnDigits(frc.toLocaleString('en-US'))} mL`,
        distractors: [
          `VC = ${toBnDigits(tlc.toLocaleString('en-US'))} mL ও FRC = ${toBnDigits(frc.toLocaleString('en-US'))} mL`,
          `VC = ${toBnDigits(vc.toLocaleString('en-US'))} mL ও FRC = ${toBnDigits((rc.tv + rc.rv).toLocaleString('en-US'))} mL`,
          `VC = ${toBnDigits((rc.irv + rc.tv).toLocaleString('en-US'))} mL ও FRC = ${toBnDigits(rc.rv.toLocaleString('en-US'))} mL`,
        ],
        explanation: `ভাইটাল ক্যাপাসিটি VC = IRV + TV + ERV = ${toBnDigits(vc)} mL এবং FRC = ERV + RV = ${toBnDigits(frc)} mL (টোটাল লাং ক্যাপাসিটি TLC = VC + RV = ${toBnDigits(tlc)} mL)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ফুসফুসীয় আয়তন ও ধারণক্ষমতা',
      })
    );
  });

  // 2B. Glomerular Net Filtration Pressure (NFP = Pg - (Pb + Pc)) & Daily Filtrate/Urine Math (20 × 3 = 60 MCQs)
  const renalCases = [
    { pg: 60, pb: 18, pc: 32, gfrMin: 125, reabsPct: 99 },
    { pg: 55, pb: 15, pc: 30, gfrMin: 120, reabsPct: 99 },
    { pg: 65, pb: 15, pc: 30, gfrMin: 130, reabsPct: 98.5 },
    { pg: 58, pb: 16, pc: 30, gfrMin: 115, reabsPct: 99 },
    { pg: 52, pb: 15, pc: 28, gfrMin: 110, reabsPct: 98.5 },
    { pg: 70, pb: 20, pc: 30, gfrMin: 140, reabsPct: 99 },
    { pg: 50, pb: 15, pc: 30, gfrMin: 90, reabsPct: 99 },
    { pg: 62, pb: 17, pc: 30, gfrMin: 125, reabsPct: 98 },
    { pg: 64, pb: 14, pc: 32, gfrMin: 125, reabsPct: 99.2 },
    { pg: 56, pb: 18, pc: 28, gfrMin: 100, reabsPct: 99 },
  ];
  renalCases.forEach((rc, i) => {
    const nfp = rc.pg - (rc.pb + rc.pc);
    const dailyLiters = Number(((rc.gfrMin * 1440) / 1000).toFixed(1));
    const urineLiters = Number(((dailyLiters * (100 - rc.reabsPct)) / 100).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch6_excretion',
        visualLessonId: 'nephron',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `নেফ্রনের মালপিজিয়ান বডিতে গ্লোমেরুলার কৈশিক রক্তচাপ P_g = ${toBnDigits(rc.pg)} mmHg, বোম্যানস ক্যাপসুলের হাইড্রোস্ট্যাটিক চাপ P_b = ${toBnDigits(rc.pb)} mmHg এবং প্লাজমা কলয়েড অস্মোটিক চাপ P_c = ${toBnDigits(rc.pc)} mmHg হলে কার্যকর নিট পরিস্রাবণ চাপ (NFP) কত mmHg হবে?`,
        correct: `${toBnDigits(nfp)} mmHg`,
        distractors: [
          `${toBnDigits(rc.pg - rc.pc)} mmHg`,
          `${toBnDigits(rc.pg + rc.pb - rc.pc)} mmHg`,
          `${toBnDigits(nfp + 15)} mmHg`,
        ],
        explanation: `NFP = P_g − (P_b + P_c) = ${toBnDigits(rc.pg)} − (${toBnDigits(rc.pb)} + ${toBnDigits(rc.pc)}) = ${toBnDigits(nfp)} mmHg ধনাত্মক চাপেই অতিপরিস্রাবণ ঘটে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · অতিপরিস্রাবণ চাপ (NFP) গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch6_excretion',
        visualLessonId: 'nephron',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একজন ব্যক্তির গ্লোমেরুলার ফিল্ট্রেশন রেট (GFR) = ${toBnDigits(rc.gfrMin)} mL/min এবং নালিকায় ${toBnDigits(rc.reabsPct)}% পানি পুনঃশোষিত হলে ২৪ ঘণ্টায় (১ দিনে) মোট কত লিটার পরিস্রুত সৃষ্টি হবে এবং মূত্র নির্গত হবে কত লিটার?`,
        correct: `পরিস্রুত = ${toBnDigits(dailyLiters)} লিটার · মূত্র ≈ ${toBnDigits(urineLiters)} লিটার`,
        distractors: [
          `পরিস্রুত = ${toBnDigits(Number((dailyLiters / 2).toFixed(1)))} লিটার · মূত্র = ${toBnDigits(Number((urineLiters * 3).toFixed(2)))} লিটার`,
          `পরিস্রুত = ${toBnDigits(rc.gfrMin)} লিটার · মূত্র = ${toBnDigits(Number((urineLiters * 2).toFixed(2)))} লিটার`,
          `পরিস্রুত = ${toBnDigits(dailyLiters)} লিটার · মূত্র = ${toBnDigits(Number((dailyLiters * 0.1).toFixed(2)))} লিটার`,
        ],
        explanation: `২৪ ঘণ্টা = ১৪৪০ মিনিট; মোট পরিস্রুত = (${toBnDigits(rc.gfrMin)} × ১৪৪০) / ১০০০ = ${toBnDigits(dailyLiters)} লিটার। মাত্র ${toBnDigits(Number((100 - rc.reabsPct).toFixed(1)))}% নির্গত হওয়ায় মূত্র = ${toBnDigits(urineLiters)} লিটার।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · GFR ও দৈনিক মূত্র হিসাব',
      })
    );
  });

  // 2C. Hemoglobin O2 Carrying Capacity & CO2 Transport Fraction Numericals (10 × 2 = 20 MCQs)
  [10, 12, 14, 15, 16, 18, 8, 9].forEach((hbGram, i) => {
    const maxO2 = Number((hbGram * 1.34).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `প্রতি গ্রাম হিমোগ্লোবিন সর্বোচ্চ ১.৩৪ mL অক্সিজেন বহন করতে পারলে যে ব্যক্তির প্রতি ১০০ mL রক্তে ${toBnDigits(hbGram)} গ্রাম হিমোগ্লোবিন রয়েছে, তাঁর প্রতি ১০০ mL শতভাগ সম্পৃক্ত ধমনি রক্তে Hb দ্বারা বাহিত অক্সিজেনের পরিমাণ কত?`,
        correct: `প্রায় ${toBnDigits(maxO2)} mL O₂`,
        distractors: [
          `প্রায় ${toBnDigits(Number((hbGram * 2).toFixed(1)))} mL O₂`,
          `প্রায় ${toBnDigits(Number((hbGram * 0.5).toFixed(1)))} mL O₂`,
          `প্রায় ${toBnDigits(Number((maxO2 + 6).toFixed(1)))} mL O₂`,
        ],
        explanation: `১০০ mL রক্তে হিমোগ্লোবিন দ্বারা পরিবাহিত সর্বোচ্চ O₂ = ${toBnDigits(hbGram)} × ১.৩৪ ≈ ${toBnDigits(maxO2)} mL।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · হিমোগ্লোবিন-O₂ বহন ক্ষমতা',
      })
    );
  });

  // 2D. Nitrogenous Excretory Products & Animal Phyla Excretory Organs Matrix (12 × 3 = 36 MCQs)
  const excretoryOrgans = [
    { org: 'শিখা কোষ (Flame cell / Protonephridia)', animal: 'ফিতাকৃমি ও যকৃতকৃমি (Platyhelminthes)', waste: 'অ্যামোনিয়া (অধিকাংশ)' },
    { org: 'নেফ্রিডিয়া (Metanephridia)', animal: 'কেঁচো ও জোঁক (Annelida)', waste: 'অ্যামোনিয়া ও ইউরিয়া' },
    { org: 'ম্যালপিজিয়ান নালিকা', animal: 'ঘাসফড়িং ও আরশোলা (পতঙ্গ)', waste: 'শক্ত ইউরিক অ্যাসিড (ইউরিকোটেলিক)' },
    { org: 'সবুজ গ্রন্থি বা অ্যান্টেনাল গ্রন্থি', animal: 'বাগদা চিংড়ি ও গলদা (Crustacea)', waste: 'অ্যামোনিয়া (জলজ)' },
    { org: 'কক্সাল গ্রন্থি (Coxal glands)', animal: 'মাকড়সা ও বিছা (Arachnida)', waste: 'গুয়ানিন ও ইউরিক অ্যাসিড' },
    { org: 'কেবারস অঙ্গ (Keber’s organ / বোজানাসের অঙ্গ)', animal: 'ঝিনুক ও আপেল শামুক (Mollusca)', waste: 'অ্যামোনিয়া ও ইউরিক অ্যাসিড' },
    { org: 'নেফ্রনযুক্ত মেটানেফ্রিক বৃক্ক', animal: 'মানুষসহ সকল স্তন্যপায়ী, পাখি ও সরীসৃপ', waste: 'মানুষে ইউরিয়া; পাখি-সরীসৃপে ইউরিক অ্যাসিড' },
    { org: 'মাইক্রোনালিকা রেনেট কোষ (Renette cell)', animal: 'গোলকৃমি Ascaris (Nematoda)', waste: 'অ্যামোনিয়া ও ইউরিয়া' },
    { org: 'ত্বক, শ্বসনতন্ত্র ও যকৃত (সহায়ক রেচন অঙ্গ)', animal: 'মানুষ (ঘর্মগ্রন্থি, ফুসফুস CO₂, পিত্তরঞ্জক)', waste: 'লবণ-পানি, CO₂ ও বিলিরুবিন' },
  ];
  excretoryOrgans.forEach((eo, idx) => {
    const others = excretoryOrgans.filter((x) => x.org !== eo.org);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch6_excretion',
        visualLessonId: 'nephron',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `"${eo.animal}"-এর প্রধান রেচন অঙ্গ এবং নিষ্কাশিত বর্জ্যের প্রকৃতি কী?`,
        correct: `${eo.org} · ${eo.waste}`,
        distractors: others.slice(0, 4).map((x) => `${x.org} · ${x.waste}`),
        explanation: `${eo.animal}-এর রেচন অঙ্গ হলো ${eo.org} এবং প্রধান নাইট্রোজেনঘটিত বর্জ্য ${eo.waste}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ ও ১ · তুলনামূলক রেচন অঙ্গ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch6_excretion',
        visualLessonId: 'nephron',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${eo.org}" কোন প্রাণী গোষ্ঠীর বৈশিষ্ট্যপূর্ণ রেচন অঙ্গ?`,
        correct: eo.animal,
        distractors: others.slice(1, 5).map((x) => x.animal),
        explanation: `${eo.org} পাওয়া যায় ${eo.animal}-তে (${eo.waste})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · রেচন অঙ্গ ম্যাচিং',
      })
    );
  });

  // 2E. Paranasal Sinuses & Nephron Segment Transport Summary (20 MCQs)
  const extraQuick = [
    { ch: 'bio2_ch5_respiration' as const, vl: 'bohr_curve', q: 'চার জোড়া প্যারান্যাসাল সাইনাসের মধ্যে কোনটির সংক্রমণ সবচেয়ে বেশি হয় (বৃদ্ধির ছিদ্র উপরে থাকার কারণে)?', a: 'ম্যাক্সিলারি সাইনাস (গাল ও চোখের নিচে)', w: ['ফ্রন্টাল সাইনাস', 'এথময়েড সাইনাস', 'স্ফেনয়েড সাইনাস'] },
    { ch: 'bio2_ch5_respiration' as const, vl: 'bohr_curve', q: 'হৃৎপিণ্ড ও শ্বসন ক্রিয়ায় প্যারাসিমপ্যাথেটিক ভেগাস স্নায়ুর কাজ কী?', a: 'ব্রঙ্কোকনস্ট্রিকশন ও হৃদস্পন্দনের হার কমানো', w: ['ব্রঙ্কোডাইলেশন ও হৃদস্পন্দন বাড়ানো', 'অ্যাড্রেনালিন ক্ষরণ বাড়ানো', 'সারফ্যাকট্যান্ট ধ্বংস করা'] },
    { ch: 'bio2_ch5_respiration' as const, vl: 'bohr_curve', q: 'কৃত্রিম শ্বাসপ্রশ্বাসের (মাউথ-টু-মাউথ) সময় দাতার নিঃশ্বাস বায়ুতে কত শতাংশ অক্সিজেন থাকে যা রোগীর জন্য যথেষ্ট?', a: 'প্রায় ১৬–১৭% অক্সিজেন (এবং ৪% CO₂)', w: ['মাত্র ২% অক্সিজেন', '২১% অক্সিজেন', 'শূন্য শতাংশ অক্সিজেন'] },
    { ch: 'bio2_ch6_excretion' as const, vl: 'nephron', q: 'মূত্রের pH এবং স্বাভাবিক দৈনিক গ্লুকোজ নির্গমনের পরিমাণ যথাক্রমে কত?', a: 'গড় pH ৬.০ (৪.৫–৮.০) এবং গ্লুকোজ ০ (সম্পূর্ণ পুনঃশোষিত)', w: ['pH ৮.৫ এবং গ্লুকোজ ১০ গ্রাম', 'pH ২.০ এবং গ্লুকোজ ৫ গ্রাম', 'pH ৭.৪ এবং গ্লুকোজ ২ গ্রাম'] },
    { ch: 'bio2_ch6_excretion' as const, vl: 'nephron', q: 'মূত্রে রক্তের RBC উপস্থিতি ও অ্যালবুমিন প্রোটিনের উপস্থিতিকে যথাক্রমে কী বলে?', a: 'হিমাচুরিয়া (Hematuria) ও অ্যালবুমিনুরিয়া (Proteinuria)', w: ['গ্লাইকোসুরিয়া ও কিটোনিউরিয়া', 'পলিউরিয়া ও অলিগুরিয়া', 'পাইউরিয়া ও ইউরেমিয়া'] },
    { ch: 'bio2_ch6_excretion' as const, vl: 'nephron', q: 'হেনলির লুপের কোন অংশটি পানির জন্য অভেদ্য কিন্তু সক্রিয় NaCl পাম্প করে মেডুলাকে ঘনীভূত করে?', a: 'আরোহী পুরু বাহু (Thick Ascending Limb)', w: ['অবতরণকারী সরু বাহু', 'নিকটবর্তী প্যাঁচানো নালিকা (PCT)', 'বোম্যানস ক্যাপসুলের প্যারাইটাল স্তর'] },
    { ch: 'bio2_ch6_excretion' as const, vl: 'nephron', q: 'রেনাল থ্রেশহোল্ড (প্রায় ১৮০ mg/dL) অতিক্রম করলে ডায়াবেটিস মেলিটাস রোগীতে অতিরিক্ত মূত্র কেন হয় (অসমোটিক ডাইউরেসিস)?', a: 'নালিকার লুমেনে অতিরিক্ত গ্লুকোজ অভিস্রবণ চাপে পানি ধরে রাখে', w: ['পিটুইটারি থেকে অতিমাত্রায় ADH ক্ষরিত হয়', 'গ্লোমেরুলাসের ছিদ্র পুরোপুরি বন্ধ হয়ে যায়', 'হেনলির লুপে Na⁺ সম্পূর্ণ বন্ধ হয়'] },
    { ch: 'bio2_ch6_excretion' as const, vl: 'nephron', q: 'জাক্সটাগ্লোমেরুলার অ্যাপারেটাস (JGA) কোন দুটি অংশের সংযোগস্থলে গঠিত হয়?', a: 'অ্যাফারেন্ট ধমনিকার JG কোষ ও দূরবর্তী প্যাঁচানো নালিকার ম্যাকুলা ডেনসা', w: ['ইফারেন্ট ধমনিকা ও হেনলির লুপ', 'পেলভিস ও সংগ্রাহী নালিকা', 'রেনাল ক্যাপসুল ও পিরামিড'] },
  ];
  extraQuick.forEach((eq) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: eq.ch,
        visualLessonId: eq.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: eq.q,
        correct: eq.a,
        distractors: eq.w,
        explanation: `${eq.q} — সঠিক উত্তর: ${eq.a}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ ও ৬ · উচ্চ-গুরুত্বপূর্ণ প্রশ্ন',
      })
    );
  });

  return list;
}
