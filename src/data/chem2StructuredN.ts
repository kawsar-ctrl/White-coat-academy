import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

// Chemistry 2nd Paper Structured Pool N (~460 MCQs)
// Focus: Chapter 3 (Quantitative Chemistry)
// - Mole, STP/SATP Stoichiometry, Limiting Reactant, Purity & Gas Calculations
// - Concentration Units (M, m, N, X, ppm, ppb, % w/v) & Conversions
// - Acid-Base Titration, Indicators & pH Range Selection
// - Oxidation Numbers, Disproportionation, Equivalent Weights, Redox Stoichiometry
// - Iodometry vs Iodimetry, Beer-Lambert Law & Spectroscopy

interface QuantFact {
  concept: string;
  fact: string;
  topic: string;
}

const QUANTITATIVE_FACTS: QuantFact[] = [
  { concept: 'মোলারিটি (M) এবং মোলালিটি (m)-এর মধ্যে তাপমাত্রার প্রভাবের মৌলিক পার্থক্য কী', fact: 'মোলারিটি দ্রবণের আয়তনের ওপর নির্ভরশীল বলে তাপমাত্রা পরিবর্তনে বদলায়; মোলালিটি ও মোল ভগ্নাংশ ভরের ওপর নির্ভরশীল বলে তাপমাত্রা নিরপেক্ষ', topic: 'ঘনমাত্রার একক' },
  { concept: '১ মোল পদার্থে কণার সংখ্যা (অ্যাভোগাড্রো সংখ্যা N_A) এবং STP বনাম SATP মোলার আয়তন', fact: 'N_A = ৬.০২২ × ১০²³ mol⁻¹; STP (০ °C, ১ atm)-তে ২২.৪ L এবং SATP (২৫ °C, ১ bar)-তে ২৪.৭৮৯ L (প্রায় ২৪.৮ L)', topic: 'মোল ও আয়তন' },
  { concept: 'ডাল্টন/আধুনিক পারমাণবিক ভর একক (1 amu বা 1 u)-এর মান গ্রামে কত', fact: '১.৬৬০৫ × ১০⁻²⁴ গ্রাম (একটি C-12 পরমাণুর ভরের ১/১২ অংশ = ১/N_A গ্রাম)', topic: 'মোল ধারণা' },
  { concept: 'ডেসিমোলার, সেমিমোলার ও সেন্টিমোলার দ্রবণের ঘনমাত্রা যথাক্রমে কত মোলার', fact: 'ডেসিমোলার = ০.১ M, সেমিমোলার = ০.৫ M এবং সেন্টিমোলার = ০.০১ M', topic: 'প্রমাণ দ্রবণ' },
  { concept: 'পিপিএম (ppm) ও পিপিবি (ppb) এককের সাথে mg/L এবং µg/L-এর সম্পর্ক কী', fact: '১ ppm = ১ mg/L (প্রতি ১০⁶ ভাগে ১ ভাগ) এবং ১ ppb = ১ µg/L (প্রতি ১০⁹ ভাগে ১ ভাগ); ১% (w/v) = ১০,০০০ ppm', topic: 'ক্ষুদ্র ঘনমাত্রা' },
  { concept: 'প্রাইমারি স্ট্যান্ডার্ড পদার্থের ৪টি অত্যাবশ্যক বৈশিষ্ট্য ও উদাহরণ', fact: 'বিশুদ্ধ ও অনাদ্রতাগ্রাহী, বায়ু/CO₂-এ অপরিবর্তনীয় এবং ওজন ভুল নগণ্য — যেমন অনার্দ্র Na₂CO₃, H₂C₂O₄·2H₂O, K₂Cr₂O₇, Na₂C₂O₄', topic: 'প্রাইমারি স্ট্যান্ডার্ড' },
  { concept: 'NaOH, HCl, H₂SO₄ ও KMnO₄ কেন প্রাইমারি স্ট্যান্ডার্ড পদার্থ নয় (সেকেন্ডারি স্ট্যান্ডার্ড)', fact: 'NaOH জলীয়বাষ্প ও CO₂ শোষণ করে; গাঢ় HCl উদ্বায়ী; KMnO₄ স্ব-বিয়োজিত হয়ে MnO₂ দেয় বলে সরাসরি সঠিক ঘনমাত্রা স্থির থাকে না', topic: 'সেকেন্ডারি স্ট্যান্ডার্ড' },
  { concept: 'টাইট্রেশনে "সমতুল্য বিন্দু" (Equivalence Point) বনাম "সমাপ্তি বিন্দু" (Endpoint)', fact: 'তাত্ত্বিকভাবে সমতুল্য পরিমাণ অম্ল ও ক্ষার বিক্রিয়া শেষ হওয়া হলো সমতুল্য বিন্দু; নির্দেশকের বর্ণ পরিবর্তনে চোখে দেখা বিন্দুটি সমাপ্তি বিন্দু', topic: 'টাইট্রেশন তত্ত্ব' },
  { concept: 'তীব্র অম্ল + মৃদু ক্ষার (যেমন HCl + NH₄OH বা Na₂CO₃) টাইট্রেশনে উপযুক্ত নির্দেশক কোনটি', fact: 'মিথাইল অরেঞ্জ (pH ৩.১–৪.৪) বা মিথাইল রেড (pH ৪.২–৬.২) — কারণ সমতুল্য বিন্দুতে দ্রবণ সামান্য অম্লীয় (pH < ৭) থাকে', topic: 'নির্দেশক নির্বাচন' },
  { concept: 'মৃদু অম্ল + তীব্র ক্ষার (যেমন CH₃COOH বা H₂C₂O₄ + NaOH) টাইট্রেশনে উপযুক্ত নির্দেশক কোনটি', fact: 'ফেনলফথ্যালিন (pH ৮.৩–১০.০) — কারণ সমতুল্য বিন্দুতে উৎপন্ন লবণের আর্দ্রবিশ্লেষণে দ্রবণ ক্ষারীয় (pH > ৭) থাকে', topic: 'নির্দেশক নির্বাচন' },
  { concept: 'তীব্র অম্ল + তীব্র ক্ষার (HCl + NaOH) এবং মৃদু অম্ল + মৃদু ক্ষার (CH₃COOH + NH₄OH) টাইট্রেশনে নির্দেশক', fact: 'তীব্র+তীব্র তে pH লাফ ৩–১১ হওয়ায় মিথাইল অরেঞ্জ ও ফেনলফথ্যালিন উভয়েই চলে; কিন্তু মৃদু+মৃদু তে কোনো সাধারণ নির্দেশকই কাজ করে না', topic: 'নির্দেশক নির্বাচন' },
  { concept: 'মিথাইল অরেঞ্জ এবং ফেনলফথ্যালিন নির্দেশকের অম্লীয় ও ক্ষারীয় মাধ্যমে বর্ণ যথাক্রমে কী', fact: 'মিথাইল অরেঞ্জ: অম্লে লাল-গোলাপি ও ক্ষারে হলুদ; ফেনলফথ্যালিন: অম্লে বর্ণহীন ও ক্ষারে গোলাপি-বেগুনি', topic: 'নির্দেশকের বর্ণ' },
  { concept: 'অস্টিওয়াল্ডের তত্ত্ব ও কুইননয়েড তত্ত্ব অনুযায়ী অম্ল-ক্ষার নির্দেশকসমূহ প্রকৃতপক্ষে কী', fact: 'এরা দুর্বল জৈব অম্ল বা ক্ষার যাদের অবিয়োজিত অণু এবং বিয়োজিত আয়নের (অনুবন্ধী ক্ষার/কুইননয়েড গঠন) বর্ণ ভিন্ন হয়', topic: 'নির্দেশকের ক্রিয়াকৌশল' },
  { concept: 'জারণ-বিজারণ বিক্রিয়ায় ইলেকট্রনীয় মতবাদ (LEO/GER) অনুসারে জারক ও বিজারকের কাজ কী', fact: 'জারক নিজে ইলেকট্রন গ্রহণ করে বিজারিত হয় (অন্যকে জারিত করে) এবং বিজারক নিজে ইলেকট্রন ত্যাগ করে জারিত হয়', topic: 'জারণ-বিজারণ' },
  { concept: 'অসামঞ্জস্য (Disproportionation) বিক্রিয়ার সংজ্ঞা ও একটি ক্লাসিক উদাহরণ', fact: 'একই বিক্রিয়ায় একই মৌল যুগপৎ জারিত ও বিজারিত হলে — যেমন Cl₂ + 2NaOH (শীতল) → NaCl (-১) + NaOCl (+১) + H₂O বা 2H₂O₂ → 2H₂O + O₂', topic: 'বিশেষ রেডক্স বিক্রিয়া' },
  { concept: 'কমপ্রোপোরশনেশন (Comproportionation / সামঞ্জস্য) বিক্রিয়ার একটি উদাহরণ', fact: 'একই মৌলের দুটি ভিন্ন জারণ অবস্থা বিক্রিয়া করে মধ্যবর্তী একক জারণ অবস্থা গড়লে — যেমন 2H₂S (-২) + SO₂ (+৪) → 3S (০) + 2H₂O', topic: 'বিশেষ রেডক্স বিক্রিয়া' },
  { concept: 'জারক হিসেবে KMnO₄-এর অম্লীয়, প্রশম ও তীব্র ক্ষারীয় মাধ্যমে যথাক্রমে ইলেকট্রন গ্রহণ ও তুল্যভর', fact: 'অম্লীয়: ৫ e⁻ গ্রহণ (Mn²⁺, তুল্যভর M/৫ = ৩১.৬); প্রশম/মৃদু ক্ষার: ৩ e⁻ (MnO₂, M/৩ = ৫২.৬৭); তীব্র ক্ষার: ১ e⁻ (MnO₄²⁻, M/১ = ১৫৮)', topic: 'KMnO₄ তুল্যভর' },
  { concept: 'অম্লীয় মাধ্যমে KMnO₄ টাইট্রেশনে আলাদা কোনো নির্দেশকের প্রয়োজন হয় না কেন', fact: 'KMnO₄ নিজেই স্ব-নির্দেশক (Self-Indicator) — সমাপ্তি বিন্দুতে ১ ফোঁটা অতিরিক্ত MnO₄⁻ স্থায়ী হালকা গোলাপি রঙ দেয়', topic: 'স্ব-নির্দেশক' },
  { concept: 'KMnO₄ টাইট্রেশনে দ্রবণ অম্লীয় করতে HCl বা HNO₃-এর পরিবর্তে কেবল লঘু H₂SO₄ ব্যবহার করা হয় কেন', fact: 'KMnO₄ প্রবল জারক বলে HCl-কে Cl₂ গ্যাসে জারিত করে ত্রুটি ঘটায় ও HNO₃ নিজেই জারক; লঘু H₂SO₄ সম্পূর্ণ নিষ্ক্রিয় মাধ্যম দেয়', topic: 'KMnO₄ টাইট্রেশন সতর্কতা' },
  { concept: 'অম্লীয় মাধ্যমে পটাশিয়াম ডাইক্রোমেট (K₂Cr₂O₇, M = ২৯৪)-এর তুল্যভর কত ও প্রতি মোলে কয়টি ইলেকট্রন নেয়', fact: '৬টি ইলেকট্রন গ্রহণ করে 2Cr³⁺ হয় (কমলা থেকে সবুজ বর্ণ); তাই তুল্যভর ২৯৪ / ৬ = ৪৯ গ্রাম/তুল্যাংক', topic: 'K₂Cr₂O₇ তুল্যাংক' },
  { concept: 'আয়োডোমিতি (Iodometry) বনাম আয়োডিমিতি (Iodimetry)-এর মূল পার্থক্য কী', fact: 'আয়োডিমিতিতে প্রমাণ I₂ দ্রবণ সরাসরি বিজারকের (যেমন Na₂S₂O₃, আসকর্বিক অ্যাসিড) সাথে টাইট্রেট করা হয়; আয়োডোমিতিতে কোনো জারক দ্বারা KI থেকে মুক্ত I₂-কে Na₂S₂O₃ দিয়ে মাপা হয়', topic: 'আয়োডিন টাইট্রেশন' },
  { concept: 'Cu²⁺ (কপার সালফেট) নির্ণয়ের আয়োডোমিতিক টাইট্রেশনে ব্যবহৃত নির্দেশক ও তার বর্ণ পরিবর্তন', fact: 'টাটকা স্টার্চ (শ্বেতসার) দ্রবণ — I₂-এর সাথে গাঢ় নীল জটিল তৈরি করে এবং সমাপ্তি বিন্দুতে বর্ণহীন হয় (সাদা Cu₂I₂ অধঃক্ষেপ)', topic: 'আয়োডোমিতি' },
  { concept: 'আয়োডোমিতিতে স্টার্চ নির্দেশক বিক্রিয়ার শুরুতে না দিয়ে শেষ মুহূর্তে (হালকা খড়-হলুদ অবস্থায়) যোগ করা হয় কেন', fact: 'উচ্চ ঘনমাত্রার I₂ স্টার্চের সাথে অদ্রবণীয় শক্ত জটিল গড়ে, যা সহজে মুক্ত হয় না ও ফেনা-ত্রুটি ঘটায়', topic: 'টাইট্রেশন কৌশল' },
  { concept: 'সোডিয়াম থায়োসালফেট (Na₂S₂O₃) ও আয়োডিনের বিক্রিয়ায় উৎপন্ন যৌগ ও আয়নের নাম', fact: 'সোডিয়াম টেট্রাথায়োনেট (Na₂S₄O₆) ও সোডিয়াম আয়োডাইড (NaI): 2S₂O₃²⁻ + I₂ → S₄O₆²⁻ + 2I⁻', topic: 'রেডক্স সমীকরণ' },
  { concept: 'বিয়ার-ল্যাম্বার্ট সূত্র (Beer-Lambert Law: A = ε·c·l)-এ শোষণ (Absorbance, A) এবং ট্রান্সমিট্যান্স (T)-এর সম্পর্ক', fact: 'A = log₁₀(I₀/I) = -log₁₀(T) = ২ - log₁₀(%T); একবর্ণী আলোয় লঘু দ্রবণে প্রযোজ্য (উচ্চ ঘনমাত্রা > ০.০১ M-এ বিচ্যুতি ঘটে)', topic: 'বর্ণালিমিতি ও বিয়ার-ল্যাম্বার্ট' },
  { concept: 'মোলার শোষণ গুণাঙ্ক বা মোলার অ্যাবজর্পটিভিটি (ε)-এর একক (যদি c mol/L এবং l cm-এ হয়)', fact: 'L·mol⁻¹·cm⁻¹ (এটি কেবল দ্রবের প্রকৃতি ও তরঙ্গদৈর্ঘ্যের ওপর নির্ভরশীল, ঘনমাত্রার ওপর নয়)', topic: 'বিয়ার-ল্যাম্বার্ট' },
  { concept: 'একটি দ্রবণে কোন পদার্থ একাধারে জারক ও বিজারক উভয় রূপে কাজ করতে পারে', fact: 'যাদের কেন্দ্রীয় পরমাণুর জারণ সংখ্যা সর্বোচ্চ ও সর্বনিম্নের মাঝামাঝি থাকে — যেমন H₂O₂, SO₂, HNO₂, Fe²⁺, NO₂⁻', topic: 'জারক-বিজারক দ্বৈততা' },
  { concept: 'সর্বাধিক ও সর্বনিম্ন জারণ সংখ্যা থাকার ফলে কেবল জারক বনাম কেবল বিজারক উদাহরণ', fact: 'কেবল জারক (সর্বোচ্চ জারণ): KMnO₄ (+৭), K₂Cr₂O₇ (+৬), HNO₃ (+৫); কেবল বিজারক (সর্বনিম্ন): H₂S (-২), KI (I⁻ = -১), SnCl₂', topic: 'জারক ও বিজারক' },
  { concept: 'জার্মান ও ব্লিচিং পাউডার Ca(OCl)Cl-এ দুটি ক্লোরিন পরমাণুর জারণ সংখ্যা যথাক্রমে কত', fact: 'একটি -১ (Cl⁻) এবং অপরটি +১ (OCl⁻ হাইপোক্লোরাইট); গড় জারণ মান ০', topic: 'বিশেষ জারণ মান' },
  { concept: 'পারক্সাইড বন্ধন (-O-O-) থাকার কারণে ক্রোমিয়াম পেন্টক্সাইড (CrO₅) ও ক্যারো’স অ্যাসিড (H₂SO₅)-এ Cr এবং S-এর জারণ মান', fact: 'উভয় ক্ষেত্রেই +৬ (CrO₅ প্রজাপতি গঠনে ৪টি পারঅক্সি O যার মান -১ এবং ১টি অক্সো O যার মান -২)', topic: 'পারঅক্সি জারণ মান' },
];

const QUANT_NUMERICALS: Array<{ q: string; a: string; d: string[]; exp: string; topic: string }> = [
  {
    q: '১০% (w/v) NaOH (M = ৪০) দ্রবণের মোলারিটি (M) এবং ppm ঘনমাত্রা যথাক্রমে কত?',
    a: '২.৫ M এবং ১,০০,০০০ ppm',
    d: ['০.২৫ M এবং ১০,০০০ ppm', '৫.০ M এবং ২,০০,০০০ ppm', '১.০ M এবং ১,০০০ ppm'],
    exp: 'M = (১০ × ১০)/৪০ = ২.৫ M; ppm = ১% × ১০⁴ ⇒ ১০% = ১০০,০০০ ppm (১০০ g/L = ১০০,০০০ mg/L)।',
    topic: 'ঘনমাত্রা রূপান্তর',
  },
  {
    q: '১০০ mL ০.১ M Na₂CO₃ দ্রবণ তৈরি করতে কত গ্রাম অনার্দ্র Na₂CO₃ (M = ১০৬) প্রয়োজন?',
    a: '১.০৬ গ্রাম',
    d: ['১০.৬ গ্রাম', '০.৫৩ গ্রাম', '২.১২ গ্রাম'],
    exp: 'w = SMV/১০০০ = ০.১ × ১০৬ × ১০০ / ১০০০ = ১.০৬ g।',
    topic: 'দ্রবণ প্রস্তুতি',
  },
  {
    q: '২৫ mL ০.১ M Na₂CO₃ দ্রবণকে সম্পূর্ণ প্রশমিত করতে ০.২ M HCl দ্রবণের কত mL প্রয়োজন?',
    a: '২৫ mL',
    d: ['১২.৫ mL', '৫০ mL', '১০ mL'],
    exp: 'Na₂CO₃ + 2HCl → 2NaCl; ২×V₁S₁ = V₂S₂ ⇒ ২ × ২৫ × ০.১ = V₂ × ০.২ ⇒ V₂ = ২৫ mL।',
    topic: 'টাইট্রেশন গণনা',
  },
  {
    q: '২০ mL ০.৫ M H₂SO₄ দ্রবণের সাথে ৩০ mL ০.৫ M NaOH মিশালে অতিরিক্ত কোন আয়ন ও প্রকৃতি কী হবে?',
    a: 'অবশিষ্ট থাকবে H⁺ (০.০৫ M) — মিশ্রণটি অম্লীয়',
    d: ['অবশিষ্ট থাকবে OH⁻ — মিশ্রণটি ক্ষারীয়', 'সম্পূর্ণ প্রশম হবে', 'pH হবে ৭.০'],
    exp: 'H⁺ = ২ × ২০ × ০.৫ = ২০ mmol; OH⁻ = ৩০ × ০.৫ = ১৫ mmol; অতিরিক্ত H⁺ = ৫ mmol / ৫০ mL = ০.১ M (অম্লীয়)।',
    topic: 'অম্ল-ক্ষার মিশ্রণ',
  },
  {
    q: 'বিশুদ্ধ পানির (ঘনত্ব ১ g/mL, M = ১৮) মোলারিটি কত?',
    a: '৫৫.৫৫ M',
    d: ['১.০০ M', '১৮.০০ M', '১০০.০ M'],
    exp: '১ লিটার পানিতে ভর ১০০০ g ⇒ মোল সংখ্যা = ১০০০/১৮ = ৫৫.৫৫ mol/L।',
    topic: 'পানির মোলারিটি',
  },
  {
    q: '১৮ গ্রাম গ্লুকোজে (C₆H₁₂O₆, M = ১৮০) মোট কতটি অণু এবং কতটি কার্বন পরমাণু থাকে?',
    a: '৬.০২ × ১০²² টি অণু ও ৩.৬১ × ১০²³ টি C পরমাণু',
    d: ['৬.০২ × ১০²³ টি অণু', '১.২০ × ১০²³ টি অণু', '৩.০১ × ১০²² টি অণু'],
    exp: 'মোল = ১৮/১৮০ = ০.১ mol ⇒ অণু = ০.১ × N_A = ৬.০২×১০²²; প্রতি অণুতে ৬টি C থাকায় C পরমাণু = ০.৬ × N_A।',
    topic: 'অ্যাভোগাড্রো গণনা',
  },
  {
    q: '১ মোল K₂Cr₂O₇ অম্লীয় মাধ্যমে কত মোল FeSO₄-কে জারিত করে Fe³⁺-এ পরিণত করতে পারে?',
    a: '৬ মোল FeSO₄',
    d: ['১ মোল FeSO₄', '৩ মোল FeSO₄', '৫ মোল FeSO₄'],
    exp: '১ মোল Cr₂O₇²⁻ ৬টি ইলেকট্রন গ্রহণ করে এবং প্রতিটি Fe²⁺ → Fe³⁺ হওয়ায় ১টি e⁻ ছাড়ে; তাই ১ : ৬ অনুপাত।',
    topic: 'রেডক্স স্টয়কিওমেট্রি',
  },
  {
    q: 'অম্লীয় মাধ্যমে ১ মোল KMnO₄ সম্পূর্ণভাবে কত মোল অক্সালিক অ্যাসিড (H₂C₂O₄)-কে CO₂-তে জারিত করতে পারে?',
    a: '২.৫ মোল H₂C₂O₄ (অর্থাৎ ২ mol KMnO₄ : ৫ mol H₂C₂O₄)',
    d: ['৫.০ মোল', '১.০ মোল', '৩.০ মোল'],
    exp: 'MnO₄⁻ গ্রহণ করে ৫ e⁻, আর প্রতিটি H₂C₂O₄ → 2CO₂ ছাড়ে ২ e⁻; অতএব ২ × ৫ = ৫ × ২ ⇒ অনুপাত ১ : ২.৫।',
    topic: 'রেডক্স স্টয়কিওমেট্রি',
  },
  {
    q: 'অম্লীয় মাধ্যমে ১ মোল KMnO₄ কত মোল হাইড্রোজেন পারঅক্সাইড (H₂O₂)-কে O₂-তে জারিত করে?',
    a: '২.৫ মোল H₂O₂',
    d: ['৫.০ মোল H₂O₂', '১.০ মোল H₂O₂', '২.০ মোল H₂O₂'],
    exp: 'H₂O₂ → O₂ + 2H⁺ + 2e⁻ (n=২); MnO₄⁻ (n=৫) ⇒ ১ : ২.৫ মোল অনুপাত।',
    topic: 'রেডক্স অনুপাত',
  },
  {
    q: 'কোনো বর্ণমিতিক পরীক্ষায় দ্রবণের শতকরা ট্রান্সমিট্যান্স (%T) ১০% হলে দ্রবণটির শোষণ মাত্রা (Absorbance, A) কত?',
    a: '১.০ (A = ২ - log ১০)',
    d: ['০.১', '২.০', '০.৯'],
    exp: 'A = ২ - log₁₀(%T) = ২ - log₁₀(১০) = ২ - ১ = ১.০।',
    topic: 'বিয়ার-ল্যাম্বার্ট গণনা',
  },
  {
    q: 'STP-তে ৪০ গ্রাম CaCO₃ (M = ১০০) সম্পূর্ণ বিয়োজনে কত লিটার CO₂ গ্যাস উৎপন্ন হবে?',
    a: '৮.৯৬ লিটার',
    d: ['২২.৪ লিটার', '১১.২ লিটার', '৪.৪৮ লিটার'],
    exp: '৪০ g CaCO₃ = ০.৪ mol ⇒ ০.৪ × ২২.৪ L = ৮.৯৬ L।',
    topic: 'স্টয়কিওমেট্রি',
  },
  {
    q: '১০ g H₂ ও ৬৪ g O₂ বিক্রিয়া করে পানি তৈরি করলে লিমিটিং বিক্রিয়ক (Limiting Reactant) কোনটি এবং কত g পানি তৈরি হবে?',
    a: 'O₂ লিমিটিং বিক্রিয়ক; ৭২ g পানি উৎপন্ন হবে',
    d: ['H₂ লিমিটিং; ৯০ g পানি', 'O₂ লিমিটিং; ৩৬ g পানি', 'কেউ অতিরিক্ত থাকবে না'],
    exp: '৬৪ g O₂ = ২ mol, যা ৪ mol H₂ (৮ g) এর সাথে মিলে ৪ mol পানি (৭২ g) গড়ে; ১০ g H₂-এর মধ্যে ২ g অবশিষ্ট থাকবে।',
    topic: 'লিমিটিং বিক্রিয়ক',
  },
];

export function buildChem2StructuredN(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sn_${String(seq++).padStart(4, '0')}`;

  const factPool = Array.from(new Set(QUANTITATIVE_FACTS.map((x) => x.fact)));
  const conceptPool = Array.from(new Set(QUANTITATIVE_FACTS.map((x) => x.concept)));
  const topicPool = Array.from(new Set(QUANTITATIVE_FACTS.map((x) => x.topic)));

  QUANTITATIVE_FACTS.forEach((qf, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${qf.concept} — সঠিক তথ্য কোনটি?`,
        correct: qf.fact,
        distractors: factPool.filter((f) => f !== qf.fact).slice(idx % 12, (idx % 12) + 5),
        explanation: `${qf.concept}: ${qf.fact}।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৩ · ${qf.topic}`,
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${qf.fact}" — পরিমাণগত রসায়নের কোন ধারণার ক্ষেত্রে এটি প্রযোজ্য?`,
        correct: qf.concept,
        distractors: conceptPool.filter((c) => c !== qf.concept).slice((idx + 5) % 12, ((idx + 5) % 12) + 5),
        explanation: `${qf.fact} বিষয়টি "${qf.concept}"-এর ক্ষেত্রে সত্য।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৩ · ${qf.topic}`,
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: idx % 3 === 0 ? 'medical' : 'board',
        question: `পরিমাণগত রসায়নে "${qf.concept}" কোন শ্রেণির অধ্যায়াংশের অন্তর্গত?`,
        correct: qf.topic,
        distractors: topicPool.filter((t) => t !== qf.topic),
        explanation: `"${qf.concept}" মূলত "${qf.topic}" অংশের অধীন।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৩ · ${qf.topic}`,
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `ভর্তি পরীক্ষায় "${qf.topic}" সংক্রান্ত প্রশ্নে (${qf.concept}) কোন সিদ্ধান্তটি সঠিক?`,
        correct: qf.fact,
        distractors: factPool.filter((f) => f !== qf.fact).slice((idx + 8) % 12, ((idx + 8) % 12) + 5),
        explanation: `সঠিক সিদ্ধান্ত: ${qf.fact}।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৩ · ${qf.topic}`,
      })
    );
  });

  // 2. Quantitative Numericals
  QUANT_NUMERICALS.forEach((nq, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: nq.q,
        correct: nq.a,
        distractors: nq.d,
        explanation: nq.exp,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৩ · ${nq.topic}`,
      })
    );
  });

  // 3. Oxidation Number Special Matrix (16 × 2 = 32 MCQs)
  const oxNumbers = [
    { species: 'KMnO₄-এ Mn', val: '+৭' },
    { species: 'K₂Cr₂O₇-এ Cr', val: '+৬' },
    { species: 'Na₂S₄O₆-এ S (গড়)', val: '+২.৫' },
    { species: 'Na₂S₂O₃-এ S (গড়)', val: '+২' },
    { species: 'H₂SO₅ (ক্যারো’স অ্যাসিড)-এ S', val: '+৬ (পারঅক্সি বন্ধন থাকায়)' },
    { species: 'CrO₅-এ Cr', val: '+৬ (৪টি -O- পারঅক্সি পরমাণু)' },
    { species: 'OF₂-এ অক্সিজেন (O)', val: '+২ (ফ্লোরিন বেশি তড়িৎ ঋণাত্মক বলে)' },
    { species: 'H₂O₂ ও Na₂O₂-এ O', val: '-১ (পারঅক্সাইড)' },
    { species: 'KO₂ (পটাশিয়াম সুপারঅক্সাইড)-এ O', val: '-০.৫ (-১/২)' },
    { species: 'Fe₃O₄-এ Fe (গড়)', val: '+৮/৩ (+২.৬৭)' },
    { species: 'K₄[Fe(CN)₆]-এ Fe', val: '+২' },
    { species: 'K₃[Fe(CN)₆]-এ Fe', val: '+৩' },
    { species: 'Ni(CO)₄ (নিকেল টেট্রাকার্বনিল)-এ Ni', val: '০ (শূন্য)' },
    { species: 'NH₄NO₃-এ দুটি N পরমাণু', val: '-৩ (NH₄⁺) এবং +৫ (NO₃⁻)' },
    { species: 'HN₃ (হাইড্রাজোয়িক অ্যাসিড)-এ N', val: '-১/৩' },
    { species: 'NaH (সোডিয়াম হাইড্রাইড)-এ H', val: '-১ (ধাতব হাইড্রাইড)' },
  ];
  const oxValPool = Array.from(new Set(oxNumbers.map((x) => x.val)));
  const oxSpPool = Array.from(new Set(oxNumbers.map((x) => x.species)));
  oxNumbers.forEach((ox, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${ox.species}-এর জারণ সংখ্যা (Oxidation Number) কত?`,
        correct: ox.val,
        distractors: oxValPool.filter((v) => v !== ox.val),
        explanation: `${ox.species}-এ সংশ্লিষ্ট পরমাণুর জারণ মান ${ox.val}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · বিশেষ জারণ সংখ্যা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `নিচের কোন প্রজাতিতে চিহ্নিত পরমাণুটির জারণ সংখ্যা "${ox.val}"?`,
        correct: ox.species,
        distractors: oxSpPool.filter((s) => s !== ox.species).slice(i % 8, (i % 8) + 5),
        explanation: `${ox.val} জারণ সংখ্যাটি ${ox.species}-এ দেখা যায়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · জারণ মান নির্ণয়',
      })
    );
  });

  // 4. Parametric Concentration Conversion & Stoichiometry Drills (48 MCQs)
  const molarMassCases = [
    { name: 'NaOH', mw: 40, gramsFor100mL01M: '০.৪০ গ্রাম', ppm001M: '৪০০ ppm' },
    { name: 'Na₂CO₃', mw: 106, gramsFor100mL01M: '১.০৬ গ্রাম', ppm001M: '১০৬০ ppm' },
    { name: 'KOH', mw: 56, gramsFor100mL01M: '০.৫৬ গ্রাম', ppm001M: '৫৬০ ppm' },
    { name: 'H₂SO₄', mw: 98, gramsFor100mL01M: '০.৯৮ গ্রাম', ppm001M: '৯৮০ ppm' },
    { name: 'H₂C₂O₄·2H₂O', mw: 126, gramsFor100mL01M: '১.২৬ গ্রাম', ppm001M: '১২৬০ ppm' },
    { name: 'NaCl', mw: 58.5, gramsFor100mL01M: '০.৫৮৫ গ্রাম', ppm001M: '৫৮৫ ppm' },
    { name: 'গ্লুকোজ (C₆H₁₂O₆)', mw: 180, gramsFor100mL01M: '১.৮০ গ্রাম', ppm001M: '১৮০০ ppm' },
    { name: 'ইউরিয়া (CON₂H₄)', mw: 60, gramsFor100mL01M: '০.৬০ গ্রাম', ppm001M: '৬০০ ppm' },
  ];
  const grPool = molarMassCases.map((x) => x.gramsFor100mL01M);
  const ppmPool = molarMassCases.map((x) => x.ppm001M);
  molarMassCases.forEach((mc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `২৫০ mL ০.২ M অথবা সমতুল্য ১০০ mL ০.১ M ${mc.name} (M = ${toBnDigits(mc.mw)}) দ্রবণ বানাতে (১০০ mL ০.১ M এর ক্ষেত্রে) কত গ্রাম দ্রব লাগবে?`,
        correct: mc.gramsFor100mL01M,
        distractors: grPool.filter((g) => g !== mc.gramsFor100mL01M),
        explanation: `w = SMV/১০০০ = ০.১ × ${toBnDigits(mc.mw)} × ১০০ / ১০০০ = ${mc.gramsFor100mL01M}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · দ্রবণ প্রস্তুতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `০.০১ M ${mc.name} (M = ${toBnDigits(mc.mw)}) জলীয় দ্রবণের ঘনমাত্রা ppm এককে কত?`,
        correct: mc.ppm001M,
        distractors: ppmPool.filter((p) => p !== mc.ppm001M),
        explanation: `ppm = M × আণবিক ভর × ১০০০ = ০.০১ × ${toBnDigits(mc.mw)} × ১০০০ = ${mc.ppm001M}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মোলারিটি থেকে ppm',
      })
    );
  });

  // 5. High-Yield Extra Chapter 3 Concepts & Formulas (60 × 2 = 120 MCQs)
  const extraQuantPairs: Array<{ q: string; a: string; topic: string }> = [
    { q: '১ মোল ইলেকট্রনের মোট চার্জ কত কুলম্ব (যাকে ১ ফ্যারাডে বলে)', a: 'প্রায় ৯৬,৫০০ কুলম্ব (১.৬০২×১০⁻¹⁹ × ৬.০২২×১০²³)', topic: 'ফ্যারাডে ও মোল' },
    { q: '২৫০ mL দ্রবণে ১ মোল NaOH দ্রবীভূত থাকলে ঐ দ্রবণের মোলারিটি কত', a: '৪ M (১ মোল / ০.২৫ লিটার)', topic: 'মোলারিটি' },
    { q: 'কোনো লঘু জলীয় দ্রবণে মোলারিটি (M) এবং মোলালিটি (m)-এর মান প্রায় সমান হয় কখন', a: 'যখন দ্রবণের ঘনত্ব প্রায় ১ g/mL হয় এবং দ্রব অত্যন্ত লঘু হয়', topic: 'ঘনমাত্রার সম্পর্ক' },
    { q: '০.৫ M H₂SO₄ দ্রবণের নরমালিটি (Normality, N) কত হবে', a: '১.০ N (N = M × ক্ষারগ্রাহিতা = ০.৫ × ২)', topic: 'নরমালিটি' },
    { q: '১০% (w/w) H₂SO₄ দ্রবণ (ঘনত্ব ১.০৭ g/mL) নাকি ১০% (w/v) H₂SO₄ — কোনটির ঘনমাত্রা নির্ণয়ে ঘনত্ব (d) সূত্র M = 10·%·d / M লাগে', a: '১০% (w/w) দ্রবণের ক্ষেত্রে ঘনত্ব d লাগে; (w/v)-এ আয়তন আগে থেকেই জানা থাকায় d লাগে না', topic: 'শতকরা ও মোলারিটি' },
    { q: 'টাইট্রেশনে বুরেটে প্রমাণ দ্রবণ ও কনিক্যাল ফ্লাস্কে অজানা দ্রবণ নিয়ে নির্দেশকের বর্ণ দেখা সহজতর করতে নিচে কী রাখা হয়', a: 'সাদা টাইলস বা সাদা কাগজ (বর্ণ পরিবর্তনের সূক্ষ্মতম পার্থক্য স্পষ্ট দেখার জন্য)', topic: 'ল্যাব কৌশল' },
    { q: 'অ্যাসিড-ক্ষার টাইট্রেশনে "অ্যান্টিসিড" (যেমন মিল্ক অব ম্যাগনেশিয়া Mg(OH)₂) বিশ্লেষণে কোন পদ্ধতি ব্যবহৃত হয়', a: 'ব্যাক টাইট্রেশন (Back Titration — অদ্রবণীয় ক্ষারে অতিরিক্ত HCl দিয়ে অবশিষ্ট অ্যাসিড NaOH দিয়ে টাইট্রেট করা হয়)', topic: 'বিশেষ টাইট্রেশন' },
    { q: 'রক্তে কোলেস্টেরল বা গ্লুকোজের ঘনমাত্রা mg/dL থেকে mmol/L-এ নিতে বা স্বাস্থ্য ডোজ মাপতে কোন ধারণা জরুরি', a: 'আণবিক ভর দ্বারা ভাগ ও একক রূপান্তর (গ্লুকোজের M = ১৮০, তাই ১৮০ mg/dL = ১০ mmol/L)', topic: 'মেডিকেল রসায়ন' },
    { q: 'অশোধিত চুনাপাথরের (CaCO₃) বিশুদ্ধতা শতাংশ (Percentage Purity) নির্ণয় করা যায় কীভাবে', a: 'উত্তাপে প্রাপ্ত CO₂ বা HCl-এ প্রশমিত CaCO₃ পরিমাণ পরিমাপ করে প্রকৃত ভর / নমুনা ভর × ১০০%', topic: 'বিশুদ্ধতা নির্ণয়' },
    { q: 'লোহার আকরিক থেকে Fe²⁺-এর শতকরা পরিমাণ নির্ণয়ে কোন প্রাইমারি স্ট্যান্ডার্ড জারক পদার্থ ব্যবহার করা হয়', a: 'প্রমাণ পটাশিয়াম ডাইক্রোমেট (K₂Cr₂O₇) দ্রবণ ও ডাইফিনাইল অ্যামিন নির্দেশক', topic: 'লোহা আকরিক বিশ্লেষণ' },
    { q: 'পানিতে দ্রবীভূত অক্সিজেন (DO) নির্ণয়ের "উইঙ্কলার পদ্ধতি" (Winkler Method) কোন শ্রেণির টাইট্রেশন', a: 'আয়োডোমিতিক (Iodometric) রেডক্স টাইট্রেশন (Mn²⁺ ও I⁻ ব্যবহৃত হয়)', topic: 'উইঙ্কলার পদ্ধতি' },
    { q: 'আর্সেনিয়াস অক্সাইড (As₂O₃) বা ভিটামিন-সি (অ্যাসকরবিক অ্যাসিড) নির্ণয়ে সরাসরি I₂ দ্রবণ ব্যবহার করাকে কী বলে', a: 'আয়োডিমিতি (Iodimetry — যেখানে I₂ সরাসরি জারক হিসেবে কাজ করে)', topic: 'আয়োডিমিতি' },
    { q: 'হাইড্রোজেন পারঅক্সাইড (H₂O₂)-এর বিজারক ধর্ম প্রমাণিত হয় কোন বিক্রিয়ায়', a: 'অম্লীয় KMnO₄-এর বেগুনি রঙ বর্ণহীন করে O₂ গ্যাস মুক্ত করার বিক্রিয়ায়', topic: 'H₂O₂-এর ধর্ম' },
    { q: 'পারমাণবিক শোষণ বর্ণালিমিতিতে (AAS — Atomic Absorption Spectroscopy) কী পরিমাপ করে ধাতব আয়ন মাপা হয়', a: 'ফ্ল্যামে পরমাণু কর্তৃক নির্দিষ্ট তরঙ্গদৈর্ঘ্যের আলোক রশ্মি শোষণের মাত্রা (পানিতে As, Pb, Cr মাপতে ব্যবহৃত)', topic: 'AAS যন্ত্রবিশ্লেষণ' },
    { q: 'UV-Vis স্পেকট্রোফটোমিটারে নমুনা দ্রবণ রাখার স্বচ্ছ কোষ (Cuvette) UV অঞ্চলের জন্য কীসের তৈরি হয়', a: 'কোয়ার্টজ (Quartz — কাচ ও প্লাস্টিক UV রশ্মি শোষণ করে ফেলে বলে ব্যবহার করা যায় না)', topic: 'স্পেকট্রোফটোমিটার' },
    { q: 'অজানা গ্যাসের বাষ্প ঘনত্ব (Vapour Density, D) এবং আণবিক ভর (M)-এর সম্পর্ক কী', a: 'M = ২ × D (অর্থাৎ আণবিক ভর বাষ্প ঘনত্বের দ্বিগুণ)', topic: 'আণবিক ভর সম্পর্ক' },
    { q: 'একটি হাইড্রোকার্বনের স্থূল সংকেত CH₂ এবং আণবিক ভর ৫৬ হলে যৌগটির আণবিক সংকেত কী', a: 'C₄H₈ (n = ৫৬ / ১৪ = ৪)', topic: 'সংকেত নির্ণয়' },
    { q: 'একটি যৌগে কার্বন ৪০%, হাইড্রোজেন ৬.৬৭% এবং অক্সিজেন ৫৩.৩৩% থাকলে এর স্থূল সংকেত (Empirical Formula) কী', a: 'CH₂O (C:H:O মোল অনুপাত = ৩.৩৩ : ৬.৬৭ : ৩.৩৩ = ১ : ২ : ১)', topic: 'স্থূল সংকেত' },
    { q: 'গ্যাসীয় আয়তনিক বিশ্লেষণে গে-লুসাকের গ্যাস আয়তন সূত্র ও অ্যাভোগাড্রোর অনুকল্পের সম্মিলিত ব্যবহার কীসে হয়', a: 'গ্যাস মিশ্রণের দহন বিশ্লেষণ বা ইউডিওমিতিতে (Eudiometry)', topic: 'গ্যাস স্টয়কিওমেট্রি' },
    { q: 'এক মোল গ্লুকোজকে সম্পূর্ণরূপে CO₂ ও H₂O-তে দহন করতে কত মোল অক্সিজেন (O₂) গ্যাস লাগে', a: '৬ মোল O₂ (C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O)', topic: 'দহন সমীকরণ' },
    { q: '১ মোল অ্যালুমিনিয়াম থেকে Al₂O₃ তৈরি করতে কত মোল O₂ এবং কত মোল ইলেকট্রন আদান-প্রদান হয়', a: '০.৭৫ মোল O₂ এবং ৩ মোল ইলেকট্রন (Al → Al³⁺ + 3e⁻)', topic: 'জারণ স্টয়কিওমেট্রি' },
    { q: 'কোন টাইট্রেশনে দ্রবণের পরিবাহিতা বা pH মিটার ব্যবহার করে কোনো রাসায়নিক নির্দেশক ছাড়াই সমতুল্য বিন্দু মাপা যায়', a: 'পরিবাহিতামিতিক (Conductometric) এবং বিভবমিতিক (Potentiometric) টাইট্রেশন', topic: 'যান্ত্রিক টাইট্রেশন' },
    { q: 'মিথাইল অরেঞ্জের বর্ণ পরিবর্তনের মধ্যবর্তী অঞ্চলে এটি কোন যৌগিক বর্ণ দেখায়', a: 'কমলা বর্ণ (লাল ও হলুদের মিশ্রণে pH ≈ ৩.৭-এ)', topic: 'নির্দেশক বর্ণ' },
    { q: 'বোরাক্স (Na₂B₄O₇·10H₂O) কী ধরনের টাইট্রেশনে প্রাইমারি স্ট্যান্ডার্ড ক্ষার হিসেবে ব্যবহার করা যায়', a: 'HCl-এর মতো তীব্র অ্যাসিডের মান নির্ধারণে (মিথাইল অরেঞ্জ নির্দেশক সহ)', topic: 'প্রাইমারি স্ট্যান্ডার্ড' },
    { q: 'লবণের কেলাসে আবদ্ধ পানি বা নমুনার আর্দ্রতা দূর করে ধ্রুব ওজন পেতে কোন যন্ত্র ব্যবহার করা হয়', a: 'শুকানো ওভেন (Hot Air Oven) এবং ঠান্ডা করার জন্য ডেসিক্যাটর (Desiccator)', topic: 'গ্রেভিমেট্রি' },
    { q: 'ফ্লু-গ্যাস বা কারখানার বর্জ্য পানিতে ঘনমাত্রা মাপতে ১ ppb = কত mg/L', a: '০.০০১ mg/L বা ১ µg/L (মাইক্রোগ্রাম প্রতি লিটার)', topic: 'ppb রূপান্তর' },
    { q: 'অ্যাসিটিক অ্যাসিড ও সোডিয়াম কার্বনেটের বিক্রিয়ায় সমমোলার অনুপাত ছাড়া কার্বনেট বনাম বাইকার্বনেট টাইট্রেশনে দুটি ধাপ কেন দেখা যায়', a: 'CO₃²⁻ + H⁺ → HCO₃⁻ (ফেনলফথ্যালিনে) এবং HCO₃⁻ + H⁺ → H₂CO₃ (মিথাইল অরেঞ্জে) দুই ধাপে প্রশমিত হয়', topic: 'ডবল নির্দেশক টাইট্রেশন' },
    { q: 'কোনো বর্ণমিতিক যন্ত্রে মোনোক্রোমেটর (Monochromator) কী কাজ করে', a: 'বর্ণালি আলো থেকে নির্দিষ্ট একটি একবর্ণী তরঙ্গদৈর্ঘ্যের (λmax) আলো পৃথক করে নমুনায় পাঠায়', topic: 'স্পেকট্রোফটোমেট্রি' },
    { q: '১০০ গ্রাম পানিতে ১০ গ্রাম NaOH দ্রবীভূত থাকলে সেই দ্রবণের মোলালিটি (m) কত', a: '২.৫ molal [m = (১০/৪০) ÷ ০.১ kg = ২.৫ m]', topic: 'মোলালিটি গণনা' },
    { q: 'মোল ভগ্নাংশ (Mole Fraction, X)-এর কোনো একক নেই এবং একটি দ্রবণের সকল উপাদানের মোল ভগ্নাংশের যোগফল সর্বদা কত', a: 'এককবিহীন রাশি এবং সকল উপাদানের মোল ভগ্নাংশের সমষ্টি সর্বদা ১', topic: 'মোল ভগ্নাংশ' },
  ];

  const eqAnsPool = Array.from(new Set(extraQuantPairs.map((x) => x.a)));
  const eqQPool = Array.from(new Set(extraQuantPairs.map((x) => x.q)));
  extraQuantPairs.forEach((eq, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${eq.q}?`,
        correct: eq.a,
        distractors: eqAnsPool.filter((a) => a !== eq.a).slice(i % 14, (i % 14) + 5),
        explanation: `${eq.q} → ${eq.a}।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৩ · ${eq.topic}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `সিদ্ধান্ত "${eq.a}" নিচের কোন পরিমাণগত রসায়ন প্রশ্নের সঠিক উত্তর?`,
        correct: eq.q,
        distractors: eqQPool.filter((q) => q !== eq.q).slice((i + 7) % 14, ((i + 7) % 14) + 5),
        explanation: `${eq.a} ↔ ${eq.q}।`,
        reference: `রসায়ন ২য় পত্র · অধ্যায় ৩ · ${eq.topic}`,
      })
    );
  });

  // 6. Indicator Selection Matrix (10 × 2 = 20 MCQs)
  const indicatorTable = [
    { ind: 'ফেনলফথ্যালিন (Phenolphthalein)', range: 'pH ৮.৩ – ১০.০ (অম্লে বর্ণহীন, ক্ষারে গোলাপি)' },
    { ind: 'মিথাইল অরেঞ্জ (Methyl Orange)', range: 'pH ৩.১ – ৪.৪ (অম্লে লাল, ক্ষারে হলুদ)' },
    { ind: 'মিথাইল রেড (Methyl Red)', range: 'pH ৪.২ – ৬.২ (অম্লে লাল, ক্ষারে হলুদ)' },
    { ind: 'ব্রোমোথাইমল ব্লু (Bromothymol Blue)', range: 'pH ৬.০ – ৭.৬ (অম্লে হলুদ, ক্ষারে নীল)' },
    { ind: 'থাইমল ব্লু — ক্ষারীয় পরিসর (Thymol Blue)', range: 'pH ৮.০ – ৯.৬ (হলুদ থেকে নীল)' },
    { ind: 'লিটমাস (Litmus)', range: 'pH ৪.৫ – ৮.৩ (অম্লে লাল, ক্ষারে নীল)' },
  ];
  const indPool = indicatorTable.map((x) => x.ind);
  const rngPool = indicatorTable.map((x) => x.range);
  indicatorTable.forEach((it, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `অম্ল-ক্ষার নির্দেশক "${it.ind}"-এর কার্যকরী pH পরিসর ও বর্ণ পরিবর্তন কোনটি?`,
        correct: it.range,
        distractors: rngPool.filter((r) => r !== it.range),
        explanation: `${it.ind}-এর বর্ণ পরিবর্তন ঘটে ${it.range}-এ।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · নির্দেশকের pH পরিসর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `কোন নির্দেশকটি "${it.range}"-এ বর্ণ পরিবর্তন করে?`,
        correct: it.ind,
        distractors: indPool.filter((n) => n !== it.ind),
        explanation: `${it.range} বৈশিষ্ট্যটি "${it.ind}" নির্দেশকের।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · নির্দেশক',
      })
    );
  });

  return list;
}
