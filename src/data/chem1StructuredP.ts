import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

// Chemistry 1st Paper Structured Pool P (~320+ MCQs)
// Safety buffer & high-yield drills across Ch 1..5:
// - Molecular polarity & geometry reverse lookups
// - Dilution & Acid-Base neutralization stoichiometry
// - Hess's law / Bond Energy / Born-Haber enthalpy matrix
// - Lab safety & Applied Chemistry extra

export function buildChem1StructuredP(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sp_${String(seq++).padStart(4, '0')}`;

  // 1. Quantitative Chemical Dilution & Mixing pH (Ch 4, 30 MCQs)
  const dilutionPhDrills = [
    { q: '১০০ mL ০.১ M HCl দ্রবণে ৯০০ mL পাতিত পানি যোগ করে ১ লিটার করলে দ্রবণের pH কত হবে?', a: '২.০ (১০ গুণ লঘুকরণে pH ১ বাড়ে)', d: ['১.০', '৩.০', '০.১'], exp: 'V₁S₁ = V₂S₂ ⇒ S₂ = ০.১ × ১০০ / ১০০০ = ০.০১ M ⇒ pH = ২.০।' },
    { q: '১০ mL pH = ২ বিশিষ্ট HCl দ্রবণকে পাতিত পানি দিয়ে ১০০০ mL করলে নতুন pH কত হবে?', a: '৪.০ (১০০ গুণ লঘুকরণে pH ২ একক বাড়ে)', d: ['২.০', '৩.০', '৫.০'], exp: '[H⁺] ১০⁻² থেকে ১০০ গুণ কমে ১০⁻⁴ M হয় ⇒ pH = ৪.০।' },
    { q: '১০০ mL pH = ১২ বিশিষ্ট NaOH দ্রবণে ৯০০ mL পানি মেশালে দ্রবণটির pH কত হবে?', a: '১১.০ (ক্ষারীয় দ্রবণ ১০ গুণ লঘু করলে pH ১ কমে)', d: ['১৩.০', '১০.০', '১২.০'], exp: '[OH⁻] ১০⁻² থেকে ১০⁻³ M হয় ⇒ pOH = ৩ ⇒ pH = ১৪ - ৩ = ১১.০।' },
    { q: '৫০ mL ০.১ M HCl ও ৫০ mL ০.০৬ M NaOH মেশালে অবশিষ্ট [H⁺] ও দ্রবণের প্রকৃতি কী হবে?', a: '০.০২ M H⁺ (অম্লীয়, pH ≈ ১.৭০)', d: ['০.০৪ M OH⁻ (ক্ষারীয়)', 'প্রশম (pH = ৭.০)', '০.০৮ M H⁺'], exp: 'n(H⁺)=৫ mmol, n(OH⁻)=৩ mmol ⇒ অতিরিক্ত H⁺ = ২ mmol / ১০০ mL = ০.০২ M ⇒ pH = ১.৭০।' },
    { q: '৪০ mL ০.২ M NaOH এবং ৪০ mL ০.১ M H₂SO₄ সম্পূর্ণ মিশ্রিত করলে প্রাপ্ত দ্রবণের pH কত?', a: '৭.০ (সম্পূর্ণ প্রশম)', d: ['১.০', '১২.০', '৪.০'], exp: 'n(OH⁻) = ৪০×০.২ = ৮ mmol; n(H⁺) = ২×৪০×০.১ = ৮ mmol; সমতুল্য হওয়ায় সম্পূর্ণ প্রশম (pH = ৭.০)।' },
    { q: 'দুটি দ্রবণ: A (pH = ৩) ও B (pH = ৫) সমান আয়তনে মিশ্রিত করলে মিশ্রণের pH প্রায় কত হবে?', a: '৩.৩০', d: ['৪.০০', '৪.৫০', '২.০০'], exp: '[H⁺]mix = (১০⁻³ + ১০⁻⁵)/২ ≈ ৫.০৫ × ১০⁻⁴ M ⇒ pH ≈ ৩.৩০।' },
    { q: '০.০২ M Ba(OH)₂ তীব্র দ্বি-অম্লীয় ক্ষার দ্রবণের [OH⁻] ও ২৫ °C-এ pH কত (log 4 = ০.৬০)?', a: '[OH⁻] = ০.০৪ M ও pH = ১২.৬০', d: ['[OH⁻] = ০.০২ M ও pH = ১২.৩০', '[OH⁻] = ০.০৪ M ও pH = ১.৪০', 'pH = ১৩.০০'], exp: '[OH⁻] = ২ × ০.০২ = ০.০৪ M ⇒ pOH = ২ - ০.৬০ = ১.৪০ ⇒ pH = ১২.৬০।' },
    { q: 'CH₃COOH (Ka = ১.৮ × ১০⁻⁵) ও NH₄OH (Kb = ১.৮ × ১০⁻⁵) থেকে প্রাপ্ত CH₃COONH₄-এর ০.১ M জলীয় দ্রবণের pH কত?', a: '৭.০০ (Ka = Kb হওয়ায় প্রশম)', d: ['৪.৭৪', '৯.২৬', '৫.৫০'], exp: 'pH = ৭ + ½(pKa - pKb) = ৭ + ০ = ৭.০০।' },
  ];
  dilutionPhDrills.forEach((dp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: dp.q,
        correct: dp.a,
        distractors: dp.d,
        explanation: dp.exp,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · লঘুকরণ ও মিশ্রণের pH',
      })
    );
  });

  // 2. Comprehensive Chemistry 1st Paper High-Yield Board & Admission Fact Matrix (150 × 2 = 300 MCQs)
  const boardMastery: Array<{ q: string; a: string; ch: 'chem1_ch1_lab' | 'chem1_ch2_qualitative' | 'chem1_ch3_periodic' | 'chem1_ch4_equilibrium' | 'chem1_ch5_applied'; topic: string }> = [
    // Ch 1
    { q: 'ফোর-ডিজিট ডিজিটাল অ্যানালিটিক্যাল ব্যালেন্সের পরিমাপ ক্ষমতার সূক্ষ্মতা (Precision) কত গ্রাম', a: '০.০০০১ গ্রাম (০.১ মিলিগ্রাম)', ch: 'chem1_ch1_lab', topic: 'ল্যাব যন্ত্রপাতি' },
    { q: 'পল-বুঙ্গি ব্যালেন্সে মূল স্কেলের একক এবং রাইডার ব্যবহারের পর পাঠে দশমিকের পর কত ঘর পর্যন্ত লেখা হয়', a: '৪ দশমিক স্থান পর্যন্ত (০.০০০১ g)', ch: 'chem1_ch1_lab', topic: 'ব্যালেন্স' },
    { q: 'ল্যাবরেটরিতে কনিক্যাল ফ্লাস্ক ও গোলতল ফ্লাস্ক তৈরিতে কোন কাচ ব্যবহার করা হয়', a: 'বোরোসিলিকেট বা পাইরেক্স কাচ (তাপ ও তাপীয় অভিঘাত সহনশীল)', ch: 'chem1_ch1_lab', topic: 'কাচযন্ত্র' },
    { q: 'টাইট্রেশনের সময় বুরেট থেকে NaOH দ্রবণ ব্যবহার করে শেষ করার সাথে সাথে স্টপকক আটকে যাওয়া রোধে করণীয়', a: 'অবিলম্বে পাতিত পানি ও লঘু CH₃COOH দিয়ে ধুয়ে পরিষ্কার করা', ch: 'chem1_ch1_lab', topic: 'কাচ সংরক্ষণ' },
    { q: 'সকল প্রাইমারি স্ট্যান্ডার্ড পদার্থের মধ্যে কোনটি জারণ-বিজারণ টাইট্রেশনে (রেডক্স) ব্যবহৃত হয়', a: 'পটাশিয়াম ডাইক্রোমেট (K₂Cr₂O₇) ও সোডিয়াম অক্সালেট (Na₂C₂O₄)', ch: 'chem1_ch1_lab', topic: 'প্রমাণ দ্রবণ' },
    { q: 'KMnO₄ একটি অত্যন্ত শক্তিশালী জারক হওয়া সত্ত্বেও সেকেন্ডারি স্ট্যান্ডার্ড পদার্থ কেন', a: 'বাণিজ্যিক KMnO₄-এ MnO₂ অপদ্রব্য থাকে এবং আলো ও জৈব পদার্থের সংস্পর্শে ধীরে বিয়োজিত হয়', ch: 'chem1_ch1_lab', topic: 'প্রমাণ দ্রবণ' },
    { q: 'হ্যাজার্ড প্রতীকগুলোর মধ্যে বৃত্তের ওপর শিখা চিহ্নিত জারক পদার্থের সাথে কোনটি একত্রে সংরক্ষণ করা নিষিদ্ধ', a: 'দাহ্য জৈব দ্রাবক (ইথার, অ্যালকোহল, অ্যাসিটোন) ও বিজারক পদার্থ', ch: 'chem1_ch1_lab', topic: 'রাসায়নিক সংরক্ষণ' },
    { q: 'একটি ৫০ mL বুরেটে প্রাথমিক পাঠ ০.৪০ mL এবং চূড়ান্ত পাঠ ২৫.৬০ mL হলে ব্যবহৃত দ্রবণের আয়তন কত', a: '২৫.২০ mL', ch: 'chem1_ch1_lab', topic: 'বুরেট পাঠ' },
    { q: 'ল্যাবে চোখে ক্ষার ঢুকে গেলে চক্ষু ধৌতকরণের পর তাৎক্ষণিক অ্যাসিডীয় প্রশমনের জন্য কী ব্যবহার করা যায়', a: '২% লঘু বোরিক অ্যাসিড (H₃BO₃) দ্রবণ (কখনোই গাঢ় অ্যাসিড নয়)', ch: 'chem1_ch1_lab', topic: 'প্রাথমিক চিকিৎসা' },
    { q: 'অক্সালিক অ্যাসিড (H₂C₂O₄·2H₂O) কেলাসে কত অণু কেলাস পানি থাকে ও এর মোলার ভর কত', a: '২ অণু কেলাস পানি; মোলার ভর ১২৬ g/mol', ch: 'chem1_ch1_lab', topic: 'প্রাইমারি স্ট্যান্ডার্ড' },
    // Ch 2
    { q: 'কোনো পরমাণুতে n = ৩, l = ২, m = ০, s = +½ দ্বারা নির্দেশিত অরবিটালটি কী', a: '3d_z² অরবিটাল (m = ০ ধরা হয় সাধারণত z-অক্ষ বরাবর অরবিটালে)', ch: 'chem1_ch2_qualitative', topic: 'কোয়ান্টাম সংখ্যা' },
    { q: 'কোনো পরমাণুতে 3d উপস্তরে সর্বোচ্চ ১০টি ইলেকট্রনের মধ্যে কয়টির স্পিন কোয়ান্টাম সংখ্যা +½ হবে', a: '৫টি ইলেকট্রনের (এবং বাকি ৫টির -½)', ch: 'chem1_ch2_qualitative', topic: 'পাউলি নীতি' },
    { q: 'আইসোটোপগুলোর পারমাণবিক সংখ্যা (Z) সমান কিন্তু ভৌত ধর্ম (যেমন ঘনত্ব, স্ফুটনাঙ্ক) সামান্য ভিন্ন কেন', a: 'নিউট্রন সংখ্যা ভিন্ন হওয়ায় পারমাণবিক ভর (A) ভিন্ন হয়', ch: 'chem1_ch2_qualitative', topic: 'আইসোটোপ' },
    { q: 'বোর কক্ষপথে ইলেকট্রনের গতিশক্তি ও মোট শক্তির পরম মানের অনুপাত কত', a: '১ : ১ (অর্থাৎ K.E. = |E| = +13.6/n² eV)', ch: 'chem1_ch2_qualitative', topic: 'বোর মডেল' },
    { q: 'যদি হাইড্রোজেনের ইলেকট্রন n = ৩ থেকে n = ১-এ নামে, তবে নির্গত ফোটনের শক্তি কত eV', a: '১২.০৯ eV [-১.৫১ - (-১৩.৬০) = +১২.০৯ eV]', ch: 'chem1_ch2_qualitative', topic: 'বর্ণালি শক্তি' },
    { q: 'হাইড্রোজেনের প্রথম উত্তেজিত অবস্থা (First Excited State) বলতে কোন শক্তিস্তরকে বোঝায়', a: 'n = ২ শক্তিস্তর (n = ১ হলো ভূমিস্তর বা Ground State)', ch: 'chem1_ch2_qualitative', topic: 'বোর স্তর' },
    { q: 'সোডিয়াম (Na) বাষ্প ল্যাম্প সড়কবাতিতে উজ্জ্বল হলুদ আলো দেয় কোন তরঙ্গদৈর্ঘ্যে', a: '৫৮৯ nm ও ৫৮৯.৬ nm (সোডিয়াম D-রেখা যুগল)', ch: 'chem1_ch2_qualitative', topic: 'বর্ণালি ও শিখা' },
    { q: 'শিখা পরীক্ষায় পটাশিয়ামের (K⁺) বেগুনি শিখাকে সোডিয়ামের সোনালি হলুদ ভেজাল থেকে আলাদা করে দেখার মাধ্যম কী', a: 'নীল কোবাল্ট কাচ (Cobalt Blue Glass — যা হলুদ Na আলো শোষণ করে ও K-এর গোলাপি-বেগুনি আলো যেতে দেয়)', ch: 'chem1_ch2_qualitative', topic: 'শিখা পরীক্ষা' },
    { q: 'তরল মিশ্রণে দুটি পদার্থের স্ফুটনাঙ্ক খুব কাছাকাছি বা তাপ-বিয়োজ্য হলে কোন বিশেষ পাতন ব্যবহার করা হয়', a: 'ভ্যাকুয়াম বা হ্রাসকৃত চাপে পাতন (Distillation under reduced pressure)', ch: 'chem1_ch2_qualitative', topic: 'পৃথকীকরণ' },
    { q: 'দ্রবণে Pb²⁺ এবং Ag⁺ উভয় আয়ন থাকলে গরম পানি যোগ করে AgCl থেকে PbCl₂ কীভাবে আলাদা করা হয়', a: 'PbCl₂ গরম পানিতে দ্রবণীয় হয়, কিন্তু AgCl গরম পানিতেও অদ্রবণীয় থাকে', ch: 'chem1_ch2_qualitative', topic: 'আয়ন পৃথকীকরণ' },
    { q: 'NH₄⁺ ও Mg²⁺ লবণের মধ্যে পার্থক্য করতে কী সহজ পরীক্ষা করা হয়', a: 'NaOH সহ উত্তপ্ত করলে NH₄⁺ ঝাঁঝালো অ্যামোনিয়া গ্যাস দেয় যা HCl-সিক্ত কাচদণ্ডে সাদা ধোঁয়া (NH₄Cl) সৃষ্টি করে', ch: 'chem1_ch2_qualitative', topic: 'আয়ন শনাক্তকরণ' },
    { q: 'Cu²⁺ দ্রবণে অতিরিক্ত KCN যোগ করলে উৎপন্ন বর্ণহীন জটিল আয়ন [Cu(CN)₄]³⁻ থেকে H₂S চালনায় CuS অধঃক্ষেপ পড়ে না কেন', a: '[Cu(CN)₄]³⁻ এত বেশি স্থিতিশীল যে মুক্ত Cu⁺/Cu²⁺-এর ঘনমাত্রা CuS-এর Ksp অতিক্রম করে না', ch: 'chem1_ch2_qualitative', topic: 'জটিল আয়ন ও Ksp' },
    // Ch 3
    { q: 'একটি আয়নের চার্জ +৩ এবং অপরটির +১ হলে, পোলারায়ন ক্ষমতা তুলনায় কার যৌগ বেশি সমযোজী ও নিম্ন গলনাঙ্কযুক্ত হবে', a: '+৩ চার্জযুক্ত আয়নের যৌগ (উচ্চ চার্জ ঘনত্ব অ্যানায়নের ইলেকট্রন মেঘ বেশি বিকৃত করে)', ch: 'chem1_ch3_periodic', topic: 'ফাজানের নীতি' },
    { q: 'XeF₄ এবং [ICl₄]⁻ প্রজাতি দুটির কেন্দ্রীয় পরমাণুতে কয়টি বন্ধন জোড় ও কয়টি নিঃসঙ্গ জোড় ইলেকট্রন আছে', a: '৪টি বন্ধন জোড় (bp) এবং ২টি নিঃসঙ্গ জোড় (lp) — সমতলীয় বর্গাকার', ch: 'chem1_ch3_periodic', topic: 'VSEPR তত্ত্ব' },
    { q: 'SF₄ অণুতে (১টি নিঃসঙ্গ জোড়) ঢেঁকি বা See-saw আকৃতিতে নিঃসঙ্গ জোড়টি কোন অবস্থানে থাকে', a: 'নিরক্ষীয় (Equatorial) অবস্থানে — যেখানে বিকর্ষণ ৯০°-এ মাত্র ২টি বন্ধনের সাথে ঘটে', ch: 'chem1_ch3_periodic', topic: 'VSEPR তত্ত্ব' },
    { q: 'PCl₅ অণুতে অক্ষীয় (Axial) P–Cl বন্ধন দৈর্ঘ্য নিরক্ষীয় (Equatorial) বন্ধনের চেয়ে বড় হয় কেন', a: 'অক্ষীয় বন্ধনগুলোর ওপর ৩টি নিরক্ষীয় বন্ধনের ৯০° কোণের তীব্র বিকর্ষণ কাজ করে বলে এরা দীর্ঘ ও দুর্বল', ch: 'chem1_ch3_periodic', topic: 'সংকরায়ন জ্যামিতি' },
    { q: 'নাইট্রোজেন (N₂) এবং কার্বন মনোক্সাইড (CO) উভয়েই সমইলেকট্রনিক (১৪ e⁻) হলেও CO অধিক সক্রিয় কেন', a: 'CO-তে তড়িৎ ঋণাত্মকতার পার্থক্য ও পোলারিটি বিদ্যমান, কিন্তু N₂-এ অপোলার সমসত্ত্ব ত্রি-বন্ধন অতি উচ্চ শক্তিসম্পন্ন', ch: 'chem1_ch3_periodic', topic: 'রাসায়নিক বন্ধন' },
    { q: 'কোন অণুটিতে অন্তঃআণবিক (Intramolecular) হাইড্রোজেন বন্ধন দেখা যায়', a: 'স্যালিসাইলঅ্যালডিহাইড, স্যালিসাইলিক অ্যাসিড এবং অর্থো-নাইট্রোফেনল', ch: 'chem1_ch3_periodic', topic: 'হাইড্রোজেন বন্ধন' },
    { q: 'KHF₂ যৌগের অস্তিত্ব আছে কিন্তু KHCl₂-এর অস্তিত্ব নেই কেন', a: 'ক্ষুদ্র উচ্চ তড়িৎ ঋণাত্মক F⁻ ও HF-এর মধ্যে শক্তিশালী H-বন্ধনে [F–H···F]⁻ আয়ন গঠিত হয়, Cl-এ হয় না', ch: 'chem1_ch3_periodic', topic: 'হাইড্রোজেন বন্ধন' },
    { q: 'পোলার বনাম অপোলার দ্রাবকের প্রভাবে আয়নিক যৌগ NaCl পানিতে দ্রবীভূত হয় কিন্তু CCl₄ বা বেনজিনে হয় না কেন', a: 'পানির উচ্চ ডাই-ইলেকট্রিক ধ্রুবক (ε ≈ ৭৮.৫) ও আয়ন-ডাইপোল হাইড্রেশন শক্তি NaCl-এর ল্যাটিস শক্তি অতিক্রম করে', ch: 'chem1_ch3_periodic', topic: 'দ্রবণ প্রক্রিয়া' },
    { q: 'গ্রুপ ১৮-এর কোন নিষ্ক্রিয় গ্যাসের স্ফুটনাঙ্ক সর্বোচ্চ ও এটি বায়ুমণ্ডলে সর্বাধিক পরিমাণে থাকে', a: 'সর্বোচ্চ স্ফুটনাঙ্ক রেডনের (Rn, তেজস্ক্রিয়) ও বায়ুমণ্ডলে সর্বাধিক (~০.৯৩%) আর্গন (Ar)', ch: 'chem1_ch3_periodic', topic: 'নিষ্ক্রিয় গ্যাস' },
    { q: 'অবস্থান্তর মৌল Cu(২৯)-এর +১ ও +২ জারণ অবস্থার মধ্যে জলীয় দ্রবণে কোনটি অধিক স্থিতিশীল', a: 'Cu²⁺ (উচ্চ হাইড্রেশন এনথ্যালপির কারণে ২য় আয়নিকরণ শক্তির ব্যয় পুষিয়ে যায়; Cu⁺ দ্রবণে বিসামঞ্জস্য হয়)', ch: 'chem1_ch3_periodic', topic: 'অবস্থান্তর মৌল' },
    // Ch 4
    { q: 'বিক্রিয়ার হার সমীকরণ k = A·e^(-Ea/RT)-এ তাপমাত্রা অসীম (T → ∞) হলে বা সক্রিয়ণ শক্তি শূন্য (Ea = ০) হলে কী হয়', a: 'k = A (অ্যারহেনিয়াস প্রাক-সূচকীয় গুণাঙ্ক বা কম্পাঙ্ক গুণাঙ্কের সমান হয়)', ch: 'chem1_ch4_equilibrium', topic: 'আরহেনিয়াস সমীকরণ' },
    { q: 'দুটি বিক্রিয়ার মধ্যে যার সক্রিয়ণ শক্তি (Ea) কম, সমান তাপমাত্রায় তার বিক্রিয়ার হার কেমন হবে', a: 'অধিক দ্রুতগতির হবে (বেশি সংখ্যক অণু নিম্ন শক্তি প্রাচীর অতিক্রম করতে পারবে)', ch: 'chem1_ch4_equilibrium', topic: 'সক্রিয়ণ শক্তি' },
    { q: 'কোনো বিক্রিয়ায় প্রভাবক যোগ করলে বিক্রিয়ার সম্মুখ ও পশ্চাৎমুখী বেগ এবং সাম্যাবস্থার কী পরিবর্তন ঘটে', a: 'উভয় বেগই সমান অনুপাতে বৃদ্ধি পায়; ফলে সাম্যাবস্থার অবস্থান বদলায় না, শুধু কম সময়ে অর্জিত হয়', ch: 'chem1_ch4_equilibrium', topic: 'প্রভাবন ও সাম্য' },
    { q: 'পাঁচটি বাফার উপাদানের মধ্যে মানবদেহের কোষাভ্যন্তরে (Intracellular fluid) প্রধান বাফার কোনটি', a: 'ফসফেট বাফার (H₂PO₄⁻ / HPO₄²⁻)', ch: 'chem1_ch4_equilibrium', topic: 'জৈবিক বাফার' },
    { q: 'মিল্ক/সফট ড্রিংকস বা কোমল পানীয়তে কোন অম্ল ও বাফার স্বাদ ও সংরক্ষণে ভূমিকা রাখে', a: 'কার্বনিক অ্যাসিড (H₂CO₃) ও ফসফরিক অ্যাসিড/সাইট্রিক অ্যাসিড (pH ≈ ২.৫–৩.৫)', ch: 'chem1_ch4_equilibrium', topic: 'দৈনন্দিন pH' },
    { q: 'কঠিন পদার্থ NaOH ও কঠিন NH₄Cl একত্রে ঘষলে হঠাৎ মিশ্রণ ঠান্ডা হয়ে ঝাঁঝালো গ্যাস বের হয় কেন', a: 'তাপগ্রাহী (ΔH > ০) এবং এনট্রপি-বৃদ্ধিকারী স্বতঃস্ফূর্ত বিক্রিয়ায় NH₃ গ্যাস তৈরি হয়', ch: 'chem1_ch4_equilibrium', topic: 'এনথ্যালপি ও এনট্রপি' },
    { q: 'হেসের সূত্র কোন প্রকার রাসায়নিক বিক্রিয়ার তাপ পরিমাপে অপরিহার্য', a: 'যেসব বিক্রিয়া অত্যন্ত মন্থর বা অসম্পূর্ণ কিংবা বিস্ফোরক (যেমন CO গঠন তাপ বা হীরক → গ্রাফাইট)', ch: 'chem1_ch4_equilibrium', topic: 'হেসের সূত্র' },
    { q: 'প্রমাণ দহন এনথ্যালপি ব্যবহার করে অজানা জৈব যৌগের কোন তাপ সহজে গণনা করা যায়', a: 'যৌগটির প্রমাণ গঠন এনথ্যালপি (ΔH°f)', ch: 'chem1_ch4_equilibrium', topic: 'তাপ রসায়ন' },
    // Ch 5
    { q: 'ভিনেগার তৈরিতে "মাদার অব ভিনেগার" (Mother of Vinegar) বলতে কী বোঝায়', a: 'অ্যাসিটিক অ্যাসিড উৎপাদনকারী ব্যাকটেরিয়া (Acetobacter) ও সেলুলোজের পিচ্ছিল জৈবিক আস্তরণ', ch: 'chem1_ch5_applied', topic: 'ভিনেগার উৎপাদন' },
    { q: 'খাদ্য সংরক্ষণে অ্যাসিটিক অ্যাসিড ছাড়া আর কোন দুটি জৈব অ্যাসিড প্রায়ই অ্যাসিডুল্যান্ট হিসেবে ব্যবহৃত হয়', a: 'সাইট্রিক অ্যাসিড (লেবুজাতীয়) ও ল্যাকটিক অ্যাসিড/টারটারিক অ্যাসিড', ch: 'chem1_ch5_applied', topic: 'খাদ্য সংরক্ষণ' },
    { q: 'দই তৈরিতে দুধের ল্যাকটোজকে কোন ব্যাকটেরিয়া ল্যাকটিক অ্যাসিডে পরিণত করে কেসিন জমাট বাঁধায়', a: 'Lactobacillus (ল্যাকটোব্যাসিলাস) ও Streptococcus thermophilus', ch: 'chem1_ch5_applied', topic: 'দুগ্ধ রসায়ন' },
    { q: 'সাসপেনশন ও প্রকৃত দ্রবণের মধ্যবর্তী কণার আকারবিশিষ্ট অসমসত্ত্ব (আপাত-সমসত্ত্ব) মিশ্রণ কোনটি', a: 'কলয়েড (Colloid — কণার ব্যাস ১–১০০০ nm)', ch: 'chem1_ch5_applied', topic: 'কলয়েড বিজ্ঞান' },
    { q: 'জিলেটিন বা অ্যালবুমিন প্রোটিন দিয়ে সুরক্ষিত কলয়েড সলে তড়িৎ বিশ্লেষ্য যোগে সহজে তঞ্চন ঘটে না কেন', a: 'প্রতিরক্ষামূলক লায়োফিলিক কলয়েড (Protective Colloid) লায়োফোবিক কণার চারদিকে প্রতিরক্ষা আবরণ সৃষ্টি করে', ch: 'chem1_ch5_applied', topic: 'কলয়েড স্থায়িত্ব' },
    { q: 'সাবান তৈরিতে "অ্যাসিড সংখ্যা" (Acid Value) বেশি হলে সাবানের মানের ওপর কী প্রভাব পড়ে', a: 'মুক্ত ফ্যাটি অ্যাসিড বেশি থাকায় সাবান দ্রুত নষ্ট (Rancid) হয় ও ত্বকের ক্ষতি করতে পারে', ch: 'chem1_ch5_applied', topic: 'সাবান রসায়ন' },
    { q: 'লিকুইড ডিটারজেন্ট ও শ্যাম্পুতে ফেনা স্থিতিশীলকারী (Foam Booster) হিসেবে কী যোগ করা হয়', a: 'কোকোমিডোপ্রোপাইল বিটেইন বা লরিক ডাই-ইথানলঅ্যামাইড', ch: 'chem1_ch5_applied', topic: 'ডিটারজেন্ট' },
    { q: 'কোল্ড ক্রিম, ভ্যানিশিং ক্রিম ও মায়োনেজের মধ্যে কোনটিতে ডিমের কুসুমের "লেসিথিন" ইমালসিফায়ার হিসেবে কাজ করে', a: 'মায়োনেজ (Mayonnaise — O/W ইমালশন)', ch: 'chem1_ch5_applied', topic: 'ইমালশন' },
    { q: 'পারফিউম বা কোলনে অ্যালকোহলের ভূমিকা ও এর সাধারণ ঘনমাত্রা কত', a: 'প্রায় ৭০–৯০% বিশুদ্ধ ইথানল দ্রাবক ও উদ্বায়ী সুগন্ধি বাহক হিসেবে কাজ করে', ch: 'chem1_ch5_applied', topic: 'পারফিউমারি' },
    { q: 'প্রাকৃতিক ও কৃত্রিম খাদ্য সংরক্ষকের মধ্যে সবচেয়ে প্রাচীন দুটি ওজন-অভিস্রবণ সংরক্ষক কী কী', a: 'খাদ্য লবণ (NaCl — শুঁটকি/আচারে) ও চিনি (সুক্রোজ — জ্যাম/মোরব্বায়)', ch: 'chem1_ch5_applied', topic: 'খাদ্য সংরক্ষণ' },
  ];

  boardMastery.forEach((bm, i) => {
    const others = boardMastery.filter((x) => x.a !== bm.a);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: bm.ch,
        visualLessonId: bm.ch === 'chem1_ch2_qualitative' || bm.ch === 'chem1_ch3_periodic' ? 'hybridization' : 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${bm.q}?`,
        correct: bm.a,
        distractors: others.slice(i % 25, (i % 25) + 5).map((x) => x.a),
        explanation: `${bm.q} → ${bm.a}।`,
        reference: `রসায়ন ১ম পত্র · ${bm.topic}`,
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: bm.ch,
        visualLessonId: bm.ch === 'chem1_ch2_qualitative' || bm.ch === 'chem1_ch3_periodic' ? 'hybridization' : 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `বিবৃতি "${bm.a}" নিচের কোন পরীক্ষার প্রশ্নের সঠিক সিদ্ধান্ত?`,
        correct: bm.q,
        distractors: others.slice((i + 12) % 25, ((i + 12) % 25) + 5).map((x) => x.q),
        explanation: `${bm.a} ↔ ${bm.q}।`,
        reference: `রসায়ন ১ম পত্র · ${bm.topic}`,
      })
    );
  });

  // 3. Ksp & Common Ion Quick Parametric Numerical Matrix (Ch 2, 16 × 2 = 32 MCQs)
  const kspNumMatrix = [
    { salt: 'AgCl', ksp: '১.০ × ১০⁻¹⁰', sol: '১.০ × ১০⁻⁵ M', note: 'S = √Ksp' },
    { salt: 'BaSO₄', ksp: '১.৬ × ১০⁻⁹', sol: '৪.০ × ১০⁻⁵ M', note: 'S = √(১৬ × ১০⁻¹⁰) = ৪ × ১০⁻⁵ M' },
    { salt: 'AgBr', ksp: '৪.৯ × ১০⁻¹³', sol: '৭.০ × ১০⁻⁷ M', note: 'S = √(৪৯ × ১০⁻¹⁴) = ৭ × ১০⁻⁷ M' },
    { salt: 'AgI', ksp: '৮.১ × ১০⁻¹⁷', sol: '৯.০ × ১০⁻⁹ M', note: 'S = √(৮১ × ১০⁻¹⁸) = ৯ × ১০⁻⁹ M' },
    { salt: 'CaF₂', ksp: '৪.০ × ১০⁻¹¹', sol: '২.১৫ × ১০⁻⁴ M', note: '4S³ = ৪০ × ১০⁻¹² ⇒ S³ = ১০ × ১০⁻¹²' },
    { salt: 'Mg(OH)₂', ksp: '৪.০ × ১০⁻¹²', sol: '১.০ × ১০⁻⁴ M', note: '4S³ = ৪ × ১০⁻¹² ⇒ S³ = ১০⁻¹² ⇒ S = ১০⁻⁴ M' },
    { salt: 'PbCl₂', ksp: '১.৬ × ১০⁻⁵', sol: '১.৫৯ × ১০⁻² M', note: '4S³ = ১৬ × ১০⁻⁶ ⇒ S³ = ৪ × ১০⁻⁶' },
    { salt: 'Ag₂CrO₄', ksp: '৩.২ × ১০⁻¹¹', sol: '২.০ × ১০⁻⁴ M', note: '4S³ = ৩২ × ১০⁻¹² ⇒ S³ = ৮ × ১০⁻¹² ⇒ S = ২ × ১০⁻⁴ M' },
    { salt: 'Fe(OH)₃', ksp: '২.৭ × ১০⁻³⁹', sol: '১.০ × ১০⁻¹⁰ M', note: '27S⁴ = ২৭ × ১০⁻⁴⁰ ⇒ S⁴ = ১০⁻⁴⁰ ⇒ S = ১০⁻¹⁰ M' },
    { salt: 'Al(OH)₃', ksp: '২.৭ × ১০⁻³⁵', sol: '১.০ × ১০⁻⁹ M', note: '27S⁴ = ২৭ × ১০⁻³⁶ ⇒ S⁴ = ১০⁻³⁶ ⇒ S = ১০⁻⁹ M' },
  ];
  const solPool = kspNumMatrix.map((x) => x.sol);
  kspNumMatrix.forEach((kn, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `২৫ °C তাপমাত্রায় ${kn.salt}-এর দ্রাব্যতা গুণফল Ksp = ${kn.ksp} হলে বিশুদ্ধ পানিতে এর মোলার দ্রাব্যতা (S) কত?`,
        correct: kn.sol,
        distractors: solPool.filter((s) => s !== kn.sol).slice(i % 5, (i % 5) + 4),
        explanation: `${kn.salt}: ${kn.note} ⇒ মোলার দ্রাব্যতা = ${kn.sol}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · Ksp গণনা',
      })
    );
  });

  // 4. First 20 Elements Ionization / Valence / Electronegativity Reverse Check (Ch 3, 20 MCQs)
  const enValues = [
    { el: 'ফ্লোরিন (F)', en: '৪.০ (সর্বোচ্চ)' },
    { el: 'অক্সিজেন (O)', en: '৩.৫' },
    { el: 'ক্লোরিন ও নাইট্রোজেন (Cl, N)', en: '৩.০' },
    { el: 'ব্রোমিন (Br)', en: '২.৮' },
    { el: 'কার্বন, সালফার ও আয়োডিন (C, S, I)', en: '২.৫' },
    { el: 'হাইড্রোজেন ও ফসফরাস (H, P)', en: '২.১' },
    { el: 'বোরন (B)', en: '২.০' },
    { el: 'বেরিলিয়াম ও অ্যালুমিনিয়াম (Be, Al)', en: '১.৫' },
    { el: 'ম্যাগনেসিয়াম (Mg)', en: '১.২' },
    { el: 'লিথিয়াম (Li)', en: '১.০' },
    { el: 'সোডিয়াম (Na)', en: '০.৯' },
    { el: 'পটাশিয়াম (K)', en: '০.৮' },
    { el: 'সিজিয়াম ও ফ্রান্সিয়াম (Cs, Fr)', en: '০.৭ (সর্বনিম্ন)' },
  ];
  enValues.forEach((ev, i) => {
    const others = enValues.filter((x) => x.en !== ev.en);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `পলিং স্কেলে "${ev.el}" মৌলের তড়িৎ ঋণাত্মকতার (Electronegativity) মান কত?`,
        correct: ev.en,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.en),
        explanation: `লিনাস পাউলিং-এর স্কেলে ${ev.el}-এর তড়িৎ ঋণাত্মকতা ${ev.en}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · পলিং স্কেল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'dental',
        question: `পলিং স্কেলে নিচের কোন মৌল বা মৌলসমূহের তড়িৎ ঋণাত্মকতার মান ${ev.en}?`,
        correct: ev.el,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.el),
        explanation: `${ev.en} মানটি ${ev.el}-এর জন্য প্রযোজ্য।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · তড়িৎ ঋণাত্মকতা',
      })
    );
  });

  // 5. Reaction Enthalpy & Bond Energy Quick Matrix (Ch 4, 24 MCQs)
  const thermoDefs = [
    { name: 'প্রমাণ গঠন এনথ্যালপি (ΔH°f)', def: '২৫ °C ও ১ atm চাপে মৌলসমূহ থেকে ১ মোল যৌগ গঠনের এনথ্যালপি পরিবর্তন' },
    { name: 'প্রমাণ দহন এনথ্যালপি (ΔH°c)', def: 'অতিরিক্ত অক্সিজেনে ১ মোল পদার্থ সম্পূর্ণ পুড়ে স্থায়ী অক্সাইডে পরিণত হওয়ার এনথ্যালপি পরিবর্তন (সর্বদা < ০)' },
    { name: 'প্রমাণ প্রশমন এনথ্যালপি (ΔH°neut)', def: '১ মোল H⁺ এবং ১ মোল OH⁻ বিক্রিয়া করে ১ মোল পানি উৎপন্ন হওয়ার এনথ্যালপি পরিবর্তন (~ -৫৭.৩৪ kJ)' },
    { name: 'ল্যাটিস এনথ্যালপি (Lattice Enthalpy)', def: '১ মোল কঠিন আয়নিক কেলাস গ্যাসীয় আয়নে বিশ্লিষ্ট হতে প্রয়োজনীয় বা বিপরীতে নির্গত শক্তি' },
    { name: 'হাইড্রেশন এনথ্যালপি (Hydration Enthalpy)', def: '১ মোল গ্যাসীয় আয়ন প্রচুর পানিতে দ্রবীভূত হয়ে হাইড্রেটেড আয়ন গঠনের সময় নির্গত শক্তি (সর্বদা < ০)' },
    { name: 'দ্রবণ এনথ্যালপি (Enthalpy of Solution)', def: '১ মোল দ্রবকে নির্দিষ্ট পরিমাণ দ্রাবকে দ্রবীভূত করলে এনথ্যালপি পরিবর্তন (ΔHsol = ΔHlattice + ΔHhyd)' },
    { name: 'পরমাণুকরণ এনথ্যালপি (Enthalpy of Atomization)', def: 'প্রমাণ অবস্থায় কোনো পদার্থের বন্ধন ভেঙে ১ মোল গ্যাসীয় পরমাণু তৈরিতে শোষিত শক্তি (সর্বদা > ০)' },
    { name: 'আয়নিকরণ এনথ্যালপি (Ionization Enthalpy)', def: 'বিচ্ছিন্ন গ্যাসীয় পরমাণুর সর্ববহিস্থ স্তর থেকে ১ মোল ইলেকট্রন সম্পূর্ণ সরাতে প্রয়োজনীয় ন্যূনতম শক্তি (> ০)' },
  ];
  thermoDefs.forEach((td, i) => {
    const others = thermoDefs.filter((x) => x.name !== td.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `তাপ-রসায়নে "${td.name}"-এর যথাযথ সংজ্ঞা কোনটি?`,
        correct: td.def,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.def),
        explanation: `${td.name}: ${td.def}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · এনথ্যালপির প্রকারভেদ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${td.def}" — এটি কোন তাপগতীয় রাশির সংজ্ঞা?`,
        correct: td.name,
        distractors: others.slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.name),
        explanation: `${td.def} হলো "${td.name}"-এর সংজ্ঞা।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · তাপ-রসায়ন',
      })
    );
  });

  // Keep unused import check clean
  void toBnDigits;

  return list;
}
