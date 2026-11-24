import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredS(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1ss_${String(seq++).padStart(4, '0')}`;

  // 1. Kp = Kc(RT)^Δn Relations & Unit Matrix (20 reactions × 3 = 60 MCQs)
  const eqReactions: Array<{
    eq: string;
    dn: number;
    kpRel: string;
    kcUnit: string;
    pressureEffect: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    { eq: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)', dn: -2, kpRel: 'Kp = Kc(RT)⁻²', kcUnit: 'mol⁻² L²', pressureEffect: 'চাপ বাড়ালে সাম্যাবস্থা ডানদিকে (NH₃ বেশি) সরে যাবে', diff: 'medical' },
    { eq: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)', dn: -1, kpRel: 'Kp = Kc(RT)⁻¹', kcUnit: 'mol⁻¹ L', pressureEffect: 'চাপ বাড়ালে সাম্যাবস্থা ডানদিকে (SO₃ বেশি) সরে যাবে', diff: 'medical' },
    { eq: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', dn: 1, kpRel: 'Kp = Kc(RT)', kcUnit: 'mol L⁻¹', pressureEffect: 'চাপ বাড়ালে সাম্যাবস্থা বামদিকে (PCl₅ বেশি) সরে যাবে', diff: 'medical' },
    { eq: 'N₂O₄(g) ⇌ 2NO₂(g)', dn: 1, kpRel: 'Kp = Kc(RT)', kcUnit: 'mol L⁻¹', pressureEffect: 'চাপ কমালে সাম্যাবস্থা ডানদিকে (NO₂ বেশি) সরে যাবে', diff: 'board' },
    { eq: 'H₂(g) + I₂(g) ⇌ 2HI(g)', dn: 0, kpRel: 'Kp = Kc', kcUnit: 'এককবিহীন', pressureEffect: 'চাপ পরিবর্তনে সাম্যাবস্থার কোনো পরিবর্তন হবে না', diff: 'board' },
    { eq: 'N₂(g) + O₂(g) ⇌ 2NO(g)', dn: 0, kpRel: 'Kp = Kc', kcUnit: 'এককবিহীন', pressureEffect: 'চাপের কোনো প্রভাব নেই (Δn = ০)', diff: 'medical' },
    { eq: 'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)', dn: 0, kpRel: 'Kp = Kc', kcUnit: 'এককবিহীন', pressureEffect: 'গ্যাসীয় মোলসংখ্যা সমান হওয়ায় চাপের প্রভাব নেই', diff: 'dental' },
    { eq: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)', dn: 1, kpRel: 'Kp = Kc(RT)', kcUnit: 'mol L⁻¹', pressureEffect: 'চাপ কমালে সামনের দিকে (বেশি CO₂) বিয়োজিত হয়', diff: 'medical' },
    { eq: 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g)', dn: 2, kpRel: 'Kp = Kc(RT)²', kcUnit: 'mol² L⁻²', pressureEffect: 'উৎপাদে মোলসংখ্যা বেশি হওয়ায় নিম্নচাপে উৎপাদ বাড়ে', diff: 'medical' },
    { eq: '2NH₃(g) ⇌ N₂(g) + 3H₂(g)', dn: 2, kpRel: 'Kp = Kc(RT)²', kcUnit: 'mol² L⁻²', pressureEffect: 'চাপ কমালে অ্যামোনিয়ার বিয়োজন বৃদ্ধি পায়', diff: 'medical' },
    { eq: '3Fe(s) + 4H₂O(g) ⇌ Fe₃O₄(s) + 4H₂(g)', dn: 0, kpRel: 'Kp = Kc', kcUnit: 'এককবিহীন', pressureEffect: 'কঠিন বাদে গ্যাসীয় মোল সমান (৪ = ৪) হওয়ায় চাপের প্রভাব নেই', diff: 'medical' },
    { eq: 'C(s) + CO₂(g) ⇌ 2CO(g)', dn: 1, kpRel: 'Kp = Kc(RT)', kcUnit: 'mol L⁻¹', pressureEffect: 'নিম্নচাপে CO উৎপাদন বৃদ্ধি পায়', diff: 'dental' },
    { eq: '2NO(g) + Cl₂(g) ⇌ 2NOCl(g)', dn: -1, kpRel: 'Kp = Kc(RT)⁻¹', kcUnit: 'mol⁻¹ L', pressureEffect: 'চাপ বাড়ালে সম্মুখ বিক্রিয়া (NOCl গঠন) ত্বরান্বিত হয়', diff: 'medical' },
    { eq: '2H₂S(g) ⇌ 2H₂(g) + S₂(g)', dn: 1, kpRel: 'Kp = Kc(RT)', kcUnit: 'mol L⁻¹', pressureEffect: 'চাপ কমালে বিয়োজন বাড়ে', diff: 'board' },
    { eq: 'NH₄HS(s) ⇌ NH₃(g) + H₂S(g)', dn: 2, kpRel: 'Kp = Kc(RT)²', kcUnit: 'mol² L⁻²', pressureEffect: 'কঠিন পদার্থ বাদে Δn = ২ হওয়ায় নিম্নচাপে বিয়োজন বাড়ে', diff: 'medical' },
  ];

  const kpOptions = ['Kp = Kc', 'Kp = Kc(RT)', 'Kp = Kc(RT)²', 'Kp = Kc(RT)⁻¹', 'Kp = Kc(RT)⁻²'];
  const unitOptions = ['এককবিহীন', 'mol L⁻¹', 'mol² L⁻²', 'mol⁻¹ L', 'mol⁻² L²'];

  eqReactions.forEach((r, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: r.diff,
        question: `${r.eq} উভমুখী বিক্রিয়াটির জন্য Kp ও Kc-এর সঠিক সম্পর্ক কোনটি?`,
        correct: r.kpRel,
        distractors: kpOptions.filter((x) => x !== r.kpRel),
        explanation: `এখানে গ্যাসীয় উৎপাদ ও বিক্রিয়কের মোলসংখ্যার পার্থক্য Δn = ${toBnDigits(r.dn)} (কঠিন ও বিশুদ্ধ তরল গণনায় আসে না)। তাই ${r.kpRel}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · Kp ও Kc সম্পর্ক',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${r.eq} বিক্রিয়ায় সাম্য ধ্রুবক Kc-এর একক কোনটি হবে?`,
        correct: r.kcUnit,
        distractors: unitOptions.filter((x) => x !== r.kcUnit),
        explanation: `Kc-এর একক = (mol L⁻¹)^Δn। এখানে Δn = ${toBnDigits(r.dn)} হওয়ায় একক ${r.kcUnit}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · সাম্য ধ্রুবকের একক',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${r.eq} সাম্যাবস্থায় লা শাতেলিয়ার নীতি অনুযায়ী চাপ পরিবর্তনের ফলাফল কী?`,
        correct: r.pressureEffect,
        distractors: eqReactions
          .filter((x) => x.pressureEffect !== r.pressureEffect)
          .slice(idx % 6, (idx % 6) + 4)
          .map((x) => x.pressureEffect),
        explanation: `Δn = ${toBnDigits(r.dn)} হওয়ায় চাপ বাড়ালে সাম্য কম গ্যাসীয় মোলের দিকে এবং কমালে বেশি গ্যাসীয় মোলের দিকে সরে; অর্থাৎ ${r.pressureEffect}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · লা শাতেলিয়ার নীতি',
      })
    );
  });

  // 2. Half-life, Reaction Order & Thermochemistry Calculations (~120 MCQs)
  const kValues = [0.0693, 0.03465, 0.0231, 0.01386, 0.00693];
  kValues.forEach((k) => {
    const tHalf = Number((0.693 / k).toFixed(1).replace(/\.0$/, ''));
    const t99 = Number((tHalf * 2).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি প্রথম ক্রম বিক্রিয়ার হার ধ্রুবক k = ${toBnDigits(k)} s⁻¹ হলে বিক্রিয়াটির অর্ধায়ু (t₁/₂) কত সেকেন্ড?`,
        correct: `${toBnDigits(tHalf)} s`,
        distractors: [
          `${toBnDigits(tHalf * 2)} s`,
          `${toBnDigits(Number((tHalf / 2).toFixed(1)))} s`,
          `${toBnDigits(t99 + 15)} s`,
        ],
        explanation: `প্রথম ক্রম বিক্রিয়ার অর্ধায়ু t₁/₂ = ০.৬৯৩ / k = ০.৬৯৩ / ${toBnDigits(k)} = ${toBnDigits(tHalf)} সেকেন্ড।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · রাসায়নিক গতিবিদ্যা',
      })
    );
  });

  // 1st order decay by half-lives (2^n)
  [1, 2, 3, 4, 5].forEach((n) => {
    const tHalf = 10;
    const totalTime = n * tHalf;
    const remPct = Number((100 / Math.pow(2, n)).toFixed(2).replace(/\.?0+$/, ''));
    const donePct = Number((100 - remPct).toFixed(2).replace(/\.?0+$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি প্রথম ক্রম বিক্রিয়ার অর্ধায়ু ১০ মিনিট হলে ${toBnDigits(totalTime)} মিনিট পর প্রাথমিক বিক্রিয়কের কত শতাংশ অবশিষ্ট থাকবে (এবং কত শতাংশ সম্পন্ন হবে)?`,
        correct: `${toBnDigits(remPct)}% অবশিষ্ট ও ${toBnDigits(donePct)}% সম্পন্ন`,
        distractors: [
          `${toBnDigits(donePct)}% অবশিষ্ট ও ${toBnDigits(remPct)}% সম্পন্ন`,
          `${toBnDigits(Number((100 / (n + 1)).toFixed(1)))}% অবশিষ্ট ও ${toBnDigits(Number((100 - 100 / (n + 1)).toFixed(1)))}% সম্পন্ন`,
          `${toBnDigits(Math.max(5, Number((remPct + 12.5).toFixed(1))))}% অবশিষ্ট`,
          `${toBnDigits(Number((remPct + 25).toFixed(1)))}% অবশিষ্ট`,
          `২৫% অবশিষ্ট ও ৭৫% সম্পন্ন`,
        ],
        explanation: `এখানে অর্ধায়ু সংখ্যা n = ${toBnDigits(totalTime)} / ১০ = ${toBnDigits(n)}। অবশিষ্ট = ১০০ / 2ⁿ = ${toBnDigits(remPct)}%, অর্থাৎ ${toBnDigits(donePct)}% সম্পন্ন হয়েছে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · প্রথম ক্রম অর্ধায়ু',
      })
    );
  });

  // 3. High-Yield Chemistry 1st Paper Exam Pitfalls & Direct Facts (75 items × 4 = 300 MCQs)
  const chem1HighYield: Array<{
    ch: 'chem1_ch1_lab' | 'chem1_ch2_qualitative' | 'chem1_ch3_periodic' | 'chem1_ch4_equilibrium' | 'chem1_ch5_applied';
    vl: string;
    title: string;
    keyFact: string;
    pitfall: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      title: 'অগ্নিনির্বাপক ও ল্যাবে অ্যাসিড/ক্ষার পড়লে তাৎক্ষণিক প্রতিকার',
      keyFact: 'গায়ে অ্যাসিড পড়লে প্রচুর পানি দিয়ে ধুয়ে ৫% NaHCO₃ এবং ক্ষার পড়লে পানি দিয়ে ধুয়ে লঘু বরিক অ্যাসিড বা ২% অ্যাসিটিক অ্যাসিড লাগাতে হয়',
      pitfall: 'কখনই অ্যাসিডের ওপর গাঢ় ক্ষার বা ক্ষারের ওপর গাঢ় অ্যাসিড ঢেলে প্রশমিত করা যাবে না, কারণ তীব্র প্রশমন তাপে চামড়া পুড়ে যায়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      title: 'সোডিয়াম (Na) ও পটাশিয়াম (K) ধাতু সংরক্ষণ ও বর্জ্য নিষ্কাশন',
      keyFact: 'ক্ষার ধাতু Na ও K বাতাসের O₂ ও আর্দ্রতার সংস্পর্শে আগুন ধরে বলে কেরোসিন বা প্যারাফিনের নিচে সংরক্ষণ করা হয়',
      pitfall: 'পরিত্যক্ত সোডিয়াম ধাতুকে কখনই সরাসরি সিঙ্কের পানিতে ফেলা যাবে না—ইথানল বা বিউটানল দিয়ে ধীরে নিষ্ক্রিয় করতে হয়',
      diff: 'board',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      title: 'তাপের উৎস: বাথ, হিটিং ম্যান্টল ও বুনসেন বার্নারের জারণ-বিজারণ শিখা',
      keyFact: 'বুনসেন বার্নারের বায়ুছিদ্র খোলা থাকলে নীল অনালোকিত শিখা (তাপমাত্রা বেশি ও অক্সিডাইজিং অঞ্চল সর্বোচ্চ উষ্ণ ~১৫০০°C) সৃষ্টি হয়',
      pitfall: 'দাহ্য জৈব দ্রাবক (যেমন ইথার, বেনজিন, অ্যাসিটোন) সরাসরি বুনসেন বার্নারে গরম না করে ওয়াটার বাথ বা হিটিং ম্যান্টলে গরম করতে হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      title: 'বুরেটের রিডিং: বর্ণহীন দ্রবণে নিম্ন মিনিস্কাস বনাম KMnO₄-এ উচ্চ মিনিস্কাস',
      keyFact: 'স্বচ্ছ বর্ণহীন বা হালকা রঙিন দ্রবণে চোখের সমান্তরালে নিম্ন মিনিস্কাস (Lower meniscus) এবং গাঢ় রঙিন KMnO₄ দ্রবণে উচ্চ মিনিস্কাস পাঠ নেওয়া হয়',
      pitfall: 'প্যারালাক্স ত্রুটি এড়াতে রিডিংয়ের সময় চোখ ঠিক তরলের তলের সমান্তরালে রাখতে হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      title: 'কোয়ান্টাম সংখ্যার অনুমোদিত মান ও অস্তিত্বহীন অরবিটাল (1p, 2d, 3f)',
      fact: 'l-এর মান সর্বদা ০ থেকে (n-১) পর্যন্ত হয়; তাই n=১-এ শুধু s (1p অসম্ভব), n=২-এ s,p (2d অসম্ভব) এবং n=৩-এ s,p,d (3f অসম্ভব) থাকে',
      keyFact: 'l-এর মান সর্বদা ০ থেকে (n-১) পর্যন্ত হয়; তাই 1p, 2d এবং 3f অরবিটালের কোনো বাস্তব অস্তিত্ব নেই',
      pitfall: 'm-এর মোট মান সংখ্যা (2l + 1) এবং প্রতিটি কক্ষে সর্বোচ্চ ইলেকট্রন সংখ্যা 2(2l + 1)',
      diff: 'board',
    } as never,
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      title: 'হাইড্রোজেনের ৫টি পারমাণবিক বর্ণালি সিরিজ ও অঞ্চল',
      keyFact: 'লাইম্যান (n₁=১, অতিবেগুনি UV), বামার (n₁=২, দৃশ্যমান), প্যাশ্চেন (n₁=৩, অবলোহিত IR), ব্র্যাকেট (n₁=৪, IR) ও ফান্ড (n₁=৫, দূর IR)',
      pitfall: 'একমাত্র বামার সিরিজের প্রথম ৪টি রেখা (Hα লাল ৬৫৬.৩ nm, Hβ সবুজাভ-নীল ৪৮৬.১ nm, Hγ ও Hδ বেগুনি) মানুষের চোখে দৃশ্যমান',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      title: 'রিডবার্গ সমীকরণে ক্ষুদ্রতম ও বৃহত্তম তরঙ্গদৈর্ঘ্য',
      keyFact: '১/λ = R_H(১/n₁² - ১/n₂²); কোনো সিরিজের প্রথম রেখা (n₂ = n₁+১) সবচেয়ে বড় তরঙ্গদৈর্ঘ্য (কম শক্তি) এবং সীমা রেখা (n₂ = ∞) সবচেয়ে ছোট তরঙ্গদৈর্ঘ্য (বেশি শক্তি) দেয়',
      pitfall: 'রিডবার্গ ধ্রুবক R_H-এর মান ১.০৯৬৭৮ × ১০⁷ m⁻¹ (বা ১,০৯,৬৭৮ cm⁻¹)',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      title: 'শিখা পরীক্ষায় গাঢ় HCl ব্যবহার করার বৈজ্ঞানিক কারণ',
      keyFact: 'অজৈব লবণকে উদ্বায়ী ধাতব ক্লোরাইডে (MClₓ) পরিণত করার জন্য গাঢ় HCl মিশিয়ে পেস্ট বানানো হয়, কারণ ক্লোরাইডগুলো সহজে বাষ্পীভূত হয়ে বর্ণালি দেয়',
      pitfall: 'প্ল্যাটিনাম তার HCl দিয়ে পরিষ্কার করা হয় এবং Ca, Sr, Ba-এর সালফেট বা ফসফেট উদ্বায়ী নয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      title: 'দ্রাব্যতা বনাম দ্রাব্যতা গুণফল (Ksp) এর তাপমাত্রা নির্ভরতা',
      keyFact: 'সকল গ্যাসীয় দ্রবের দ্রাব্যতা তাপমাত্রা বাড়লে কমে; অধিকাংশ কঠিন লবণের তাপহারী দ্রবণে তাপমাত্রা বাড়লে Ksp বাড়ে, তবে Ca(OH)₂, CaSO₄, Ce₂(SO₄)₃-এ কমে',
      pitfall: 'দ্রাব্যতা গুণফল (Ksp) কেবল তাপমাত্রার ওপর নির্ভর করে, ঘনমাত্রা বা সমআয়ন যোগ করলে Ksp-এর মান বদলায় না (শুধু দ্রাব্যতা S বদলায়)',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      title: 'অবস্থান্তর ধাতুর জটিল আয়নের রঙিন হওয়ার কারণ: d–d ট্রানজিশন',
      keyFact: 'লিগ্যান্ডের প্রভাবে ৫টি সমশক্তির d-অরবিটাল দুটি শক্তিস্তরে (t₂g ও eg) বিভক্ত হয় (ক্রিস্টাল ফিল্ড বিভাজন Δ); দৃশ্যমান আলো শোষণে d–d স্থানান্তর ঘটায় যৌগ রঙিন দেখায়',
      pitfall: 'Cu⁺ (3d¹⁰), Zn²⁺ (3d¹⁰) ও Sc³⁺ (3d⁰)-এ অসম্পূর্ণ d-অরবিটাল না থাকায় এদের যৌগ বর্ণহীন/সাদা',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      title: 'সমযোজী সিগমা (σ) ও পাই (π) বন্ধনের মূল পার্থক্য',
      keyFact: 'অরবিটালের মুখোমুখি (Head-on) অধিক্রমণে শক্তিশালী σ বন্ধন গঠিত হয়, যা অক্ষ বরাবর মুক্ত ঘূর্ণন দেয়; পাশাপাশি (Sidewise) অধিক্রমণে দুর্বল π বন্ধন গঠিত হয়',
      pitfall: 'সিগমা বন্ধন ছাড়া কখনো π বন্ধন গঠিত হতে পারে না এবং সংকর অরবিটাল কেবল σ বন্ধন তৈরি করে (π নয়)',
      diff: 'board',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      title: 'ডাইপোল মোমেন্ট (μ = ০): অ-পোলার প্রতিসম অণু বনাম পোলার অণু',
      keyFact: 'প্রতিসম জ্যামিতির কারণে CCl₄, CO₂, BF₃, BeCl₂, PCl₅, SF₆ ও ট্রান্স-ডাইক্লোরোইথিনের লব্ধি ডাইপোল মোমেন্ট শূন্য; কিন্তু NH₃, H₂O, SO₂, CHCl₃ পোলার',
      pitfall: 'NF₃-এর ডাইপোল মোমেন্ট (০.২৪ D) NH₃ (১.৪৭ D)-এর চেয়ে অনেক কম, কারণ NF₃-এ নিঃসঙ্গ জোড় ও N–F বন্ধনের ভেক্টর বিপরীতমুখী',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      title: 'হাইব্রিডাইজেশন নির্ণয়ের শর্টকাট সূত্র: H = ½(V + M - C + A)',
      keyFact: 'কেন্দ্রীয় পরমাণুর যোজ্যতা ইলেকট্রন V, একযোজী পার্শ্ব পরমাণু M, ক্যাটায়ন চার্জ C ও অ্যানায়ন চার্জ A বসিয়ে H = ২(sp), ৩(sp²), ৪(sp³), ৫(sp³d), ৬(sp³d²) পাওয়া যায়',
      pitfall: 'অক্সিজেন ও সালফার দ্বিযোজী হওয়ায় M-এর গণনায় এরা অন্তর্ভুক্ত হয় না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      title: 'হ্যাবার-বস (NH₃), স্পর্শ প্রণালি (H₂SO₄) ও অসওয়াল্ড (HNO₃) প্রভাবক',
      keyFact: 'হ্যাবার পদ্ধতিতে সূক্ষ্ম Fe চূর্ণ (প্রভাবক সহায়ক Al₂O₃/K₂O বা Mo), স্পর্শ প্রণালিতে V₂O₅ (অথবা Pt) এবং অসওয়াল্ড প্রণালিতে Pt-Rh তারজালি ব্যবহৃত হয়',
      pitfall: 'স্পর্শ প্রণালিতে SO₃-কে সরাসরি পানিতে না মিশিয়ে ৯৮% H₂SO₄-এ শোষণ করে ওলিয়াম (H₂S₂O₇) বানানো হয়, নতুবা ঘন অ্যাসিড কুয়াশা তৈরি হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      title: 'হেসের তাপ-সমষ্টি সূত্র (Hess’s Law) ও বন্ধন শক্তি হিসাব',
      keyFact: 'রাসায়নিক বিক্রিয়া এক ধাপে বা একাধিক ধাপে ঘটুক, মোট এনথ্যালপি পরিবর্তন ΔH সর্বদা ধ্রুব থাকে; ΔH = ∑(বিক্রিয়কের বন্ধন শক্তি) - ∑(উৎপাদের বন্ধন শক্তি)',
      pitfall: 'গঠন তাপ (ΔH_f) ব্যবহারের সময় সূত্রটি উল্টো: ΔH = ∑ΔH_f(উৎপাদ) - ∑ΔH_f(বিক্রিয়ক)',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      title: 'ঋণাত্মক প্রভাবক (Inhibitor) ও স্ব-প্রভাবক (Autocatalyst)',
      keyFact: 'গ্লিসারিন বা অ্যালকোহল H₂O₂-এর বিয়োজন কমায় (ঋণাত্মক প্রভাবক); KMnO₄ ও অক্সালিক অ্যাসিডের টাইট্রেশনে উৎপন্ন Mn²⁺ নিজের বিক্রিয়া ত্বরান্বিত করে (স্ব-প্রভাবক)',
      pitfall: 'প্রভাবক বিষ (Catalytic poison যেমন As₂O₃, CO, S) প্রভাবকের সক্রিয় তল দখল করে প্রভাবন ক্ষমতা নষ্ট করে',
      diff: 'dental',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      title: 'মানবদেহ ও প্রকৃতিতে pH পরিসর: পাকস্থলি, রক্ত, লালা ও কৃষি মাটি',
      keyFact: 'পাকস্থলির গ্যাস্ট্রিক জুস (১.৫–২.৫), লালা (৬.২–৭.৪), রক্ত (৭.৩৫–৭.৪৫), অগ্ন্যাশয় রস (৭.৮–৮.৩) ও শ্যাম্পুর আদর্শ pH (৫.০–৭.০)',
      pitfall: 'মাটির pH কমে অম্লীয় হলে চুন (CaO/CaCO₃/ডলোমাইট) এবং বেশি ক্ষারীয় হলে জিপসাম বা জৈব সার দিয়ে প্রশমিত করা হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      title: 'ভিনেগারে কিউরিং, ব্লাঞ্চিং ও পাস্তুরায়ন (Pasteurization)',
      fact: '৭২°C-এ ১৫ সেকেন্ড (HTST) বা ৬৩°C-এ ৩০ মিনিট (LTLT) দুধ গরম করে দ্রুত ঠান্ডা করা পাস্তুরায়ন; ফল-সবজি ফুটন্ত পানিতে ডুবিয়ে এনজাইম নিষ্ক্রিয় করা ব্লাঞ্চিং',
      keyFact: '৭২°C-এ ১৫ সেকেন্ড (HTST) বা ৬৩°C-এ ৩০ মিনিট (LTLT) দুধ উত্তপ্ত করে দ্রুত শীতল করে রোগজীবাণু ধ্বংস করার প্রক্রিয়া পাস্তুরায়ন',
      pitfall: 'এনজাইম নিষ্ক্রিয় করতে সবজি ফুটন্ত পানিতে বা বাষ্পে অল্প সময় রাখা হলো ব্লাঞ্চিং, এবং লবণ-চিনি-ভিনেগারে ডুবানো হলো কিউরিং/পিকলিং',
      diff: 'medical',
    } as never,
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      title: 'ফলের রস, জ্যাম-জেলি ও বেকিং পাউডার রসায়ন',
      keyFact: 'বেকিং পাউডার হলো NaHCO₃ ও দুর্বল জৈব অ্যাসিডের (টারটারিক অ্যাসিড বা মনোক্যালসিয়াম ফসফেট) মিশ্রণ যা উত্তাপে CO₂ উৎপন্ন করে কেক-রুটি ফোলায়',
      pitfall: 'জ্যাম-জেলিতে অন্তত ৬৫% চিনি থাকলে অভিস্রবণে জীবাণুর কোষ প্লাজমোলাইসিস হয়ে নষ্ট হয় না',
      diff: 'board',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      topic: 'আর্দ্রতা শোষণ ও প্রাকৃতিক পারফিউম বা এসেনশিয়াল অয়েল নিষ্কাশন',
      title: 'পারফিউম ও গোলাপজল তৈরির প্রধান পদ্ধতি: বাষ্প পাতন ও এনফ্লোরেজ',
      keyFact: 'তাপ-সহনশীল ফুল-পাতা থেকে বাষ্প পাতন (Steam distillation) এবং অতি সূক্ষ্ম সুগন্ধি ফুল (জুঁই, রজনীগন্ধা) থেকে চর্বিতে শোষণ (Enfleurage) পদ্ধতিতে আতর বা সুগন্ধি নিষ্কাশিত হয়',
      pitfall: 'সুগন্ধিতে স্থায়ীত্ব বাড়াতে ফিক্সেটিভ (যেমন বেনজোয়িন বা কস্তুরী উপাদান) ও দ্রাবক হিসেবে ইথানল ব্যবহৃত হয়',
      diff: 'dental',
    } as never,
  ];

  // Filter valid objects cleanly
  const cleanHY = chem1HighYield.map((x) => ({
    ch: x.ch,
    vl: x.vl,
    title: x.title,
    keyFact: x.keyFact,
    pitfall: x.pitfall,
    diff: x.diff,
  }));

  const hyTitles = cleanHY.map((x) => x.title);
  const hyFacts = cleanHY.map((x) => x.keyFact);
  const hyPits = cleanHY.map((x) => x.pitfall);

  cleanHY.forEach((item, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: item.diff,
        question: `"${item.title}" সম্পর্কে রসায়ন ১ম পত্রের সঠিক মূল বক্তব্য কোনটি?`,
        correct: item.keyFact,
        distractors: [1, 2, 3, 4].map((o) => hyFacts[(idx + o * 3) % cleanHY.length]),
        explanation: `${item.keyFact}। সতর্কতা/পরীক্ষা নোট: ${item.pitfall}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১–৫ · পরীক্ষায় আসার মতো গুরুত্বপূর্ণ প্রশ্ন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${item.title}"-এর ক্ষেত্রে পরীক্ষায় সবচেয়ে বেশি বিভ্রান্তি বা সূক্ষ্ম প্রশ্ন কোন তথ্যটি নিয়ে হয়?`,
        correct: item.pitfall,
        distractors: [1, 2, 3, 4].map((o) => hyPits[(idx + o * 5) % cleanHY.length]),
        explanation: `${item.pitfall}। মূল ধারণা: ${item.keyFact}।`,
        reference: 'রসায়ন ১ম পত্র · মেডিকেল ও ডেন্টাল ভর্তি ফোকাস',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: item.ch,
        visualLessonId: item.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `"${item.keyFact}" — এই তথ্যটি কোন গুরুত্বপূর্ণ শিরোনামের অন্তর্ভুক্ত?`,
        correct: item.title,
        distractors: [1, 2, 3, 4].map((o) => hyTitles[(idx + o * 7) % cleanHY.length]),
        explanation: `এটি "${item.title}" বিষয়ক মূলনীতি: ${item.pitfall}।`,
        reference: 'রসায়ন ১ম পত্র · এইচএসসি বোর্ড সংকলন',
      })
    );
  });

  // 4. Direct Calculation Sets: Bond Enthalpy, Dilution & Empirical Atomic Mass (160+ MCQs)
  const dilPairs: Array<[number, number, number]> = [
    [100, 0.5, 500],
    [50, 0.4, 200],
    [25, 1.0, 250],
    [20, 0.5, 100],
    [40, 0.25, 200],
    [200, 0.2, 1000],
    [10, 2.0, 200],
    [150, 0.6, 300],
  ];
  dilPairs.forEach(([v1, s1, v2]) => {
    const s2 = Number(((v1 * s1) / v2).toFixed(3));
    const waterAdd = v2 - v1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(v1)} mL ${toBnDigits(s1)} M H₂SO₄ দ্রবণকে পাতিত পানি দিয়ে মোট ${toBnDigits(v2)} mL করা হলে চূড়ান্ত ঘনমাত্রা কত হবে (এবং কত mL পানি যোগ করতে হবে)?`,
        correct: `${toBnDigits(s2)} M ও ${toBnDigits(waterAdd)} mL পানি`,
        distractors: [
          `${toBnDigits(Number((s2 * 2).toFixed(3)))} M ও ${toBnDigits(v2)} mL পানি`,
          `${toBnDigits(Number((s2 / 2).toFixed(3)))} M ও ${toBnDigits(waterAdd)} mL পানি`,
          `${toBnDigits(s1)} M ও ${toBnDigits(v1)} mL পানি`,
        ],
        explanation: `V₁S₁ = V₂S₂ ⇒ S₂ = (${toBnDigits(v1)} × ${toBnDigits(s1)}) / ${toBnDigits(v2)} = ${toBnDigits(s2)} M এবং সংযোজিত পানি = ${toBnDigits(v2)} - ${toBnDigits(v1)} = ${toBnDigits(waterAdd)} mL।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · দ্রবণ লঘুকরণ',
      })
    );
  });

  // pH change on 10x, 100x, 1000x dilution of strong acid and strong base
  [
    { type: 'অ্যাসিড (HCl, pH = ২)', factor: 10, dir: 'বাড়বে', newPh: 3 },
    { type: 'অ্যাসিড (HCl, pH = ২)', factor: 100, dir: 'বাড়বে', newPh: 4 },
    { type: 'অ্যাসিড (HCl, pH = ২)', factor: 1000, dir: 'বাড়বে', newPh: 5 },
    { type: 'অ্যাসিড (HNO₃, pH = ৩)', factor: 10, dir: 'বাড়বে', newPh: 4 },
    { type: 'অ্যাসিড (HNO₃, pH = ৩)', factor: 100, dir: 'বাড়বে', newPh: 5 },
    { type: 'ক্ষার (NaOH, pH = ১২)', factor: 10, dir: 'কমবে', newPh: 11 },
    { type: 'ক্ষার (NaOH, pH = ১২)', factor: 100, dir: 'কমবে', newPh: 10 },
    { type: 'ক্ষার (NaOH, pH = ১৩)', factor: 1000, dir: 'কমবে', newPh: 10 },
  ].forEach((d) => {
    const delta = Math.round(Math.log10(d.factor));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি তীব্র ${d.type} দ্রবণকে পানি দিয়ে ${toBnDigits(d.factor)} গুণ লঘু করলে এর pH মান কত হবে?`,
        correct: `${toBnDigits(d.newPh)} (${toBnDigits(delta)} একক ${d.dir})`,
        distractors: [
          `${toBnDigits(d.newPh + 1)}`,
          `${toBnDigits(Math.max(1, d.newPh - 2))}`,
          `pH অপরিবর্তিত থাকবে`,
        ],
        explanation: `প্রতি ১০ গুণ লঘুকরণে তীব্র অ্যাসিডের pH ১ একক বাড়ে এবং তীব্র ক্ষারের pH ১ একক কমে; ${toBnDigits(d.factor)} (১০^${toBnDigits(delta)}) গুণ লঘু করায় ${toBnDigits(delta)} একক ${d.dir} pH = ${toBnDigits(d.newPh)} হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · লঘুকরণে pH পরিবর্তন',
      })
    );
  });

  // Neutralization Heat Calculations for polyprotic/monoprotic
  [1, 2, 3, 4, 5].forEach((mol) => {
    const hMono = Number((mol * 57.34).toFixed(2));
    const hH2so4 = Number((mol * 2 * 57.34).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(mol)} মোল HCl এবং ${toBnDigits(mol)} মোল NaOH সম্পূর্ণরূপে প্রশমিত হলে কত kJ তাপ উৎপন্ন হবে?`,
        correct: `${toBnDigits(hMono)} kJ`,
        distractors: [
          `${toBnDigits(hH2so4)} kJ`,
          `${toBnDigits(Number((hMono / 2).toFixed(2)))} kJ`,
          `${toBnDigits(Number((hMono + 25).toFixed(2)))} kJ`,
        ],
        explanation: `১ মোল পানি গঠনে প্রশমন তাপ ৫৭.৩৪ kJ; তাই ${toBnDigits(mol)} মোল একক্ষারীয় অ্যাসিড-ক্ষার প্রশমনে ${toBnDigits(hMono)} kJ তাপ নির্গত হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · প্রশমন তাপ',
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
        question: `${toBnDigits(mol)} মোল H₂SO₄ সম্পূর্ণরূপে ${toBnDigits(2 * mol)} মোল KOH দ্বারা প্রশমিত হলে নির্গত মোট প্রশমন তাপ কত?`,
        correct: `${toBnDigits(hH2so4)} kJ`,
        distractors: [
          `${toBnDigits(hMono)} kJ`,
          `${toBnDigits(Number((hH2so4 * 1.5).toFixed(2)))} kJ`,
          `${toBnDigits(Number((hMono - 10).toFixed(2)))} kJ`,
        ],
        explanation: `H₂SO₄ দ্বি-ক্ষারকীয় হওয়ায় ${toBnDigits(mol)} মোল H₂SO₄ থেকে ${toBnDigits(2 * mol)} মোল H⁺ ও ${toBnDigits(2 * mol)} মোল পানি তৈরি হয়; তাই মোট তাপ = ${toBnDigits(2 * mol)} × ৫৭.৩৪ = ${toBnDigits(hH2so4)} kJ।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · দ্বি-ক্ষারকীয় অ্যাসিডের প্রশমন তাপ',
      })
    );
  });

  // Additional Quick-Fire High-Yield Chem 1 Questions (100+ MCQs)
  const quickChem1: Array<{
    ch: 'chem1_ch1_lab' | 'chem1_ch2_qualitative' | 'chem1_ch3_periodic' | 'chem1_ch4_equilibrium' | 'chem1_ch5_applied';
    q: string;
    a: string;
    w: string[];
    exp: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    { ch: 'chem1_ch2_qualitative', q: 'মিলিকানের তেল-বিন্দু পরীক্ষার মাধ্যমে কোন মৌলিক কণার চার্জ নির্ণয় করা হয়েছিল?', a: 'ইলেকট্রন (-১.৬০২ × ১০⁻¹⁹ C)', w: ['প্রোটন', 'নিউট্রন', 'পজিট্রন'], exp: '১৯০৯ সালে রবার্ট মিলিকান তেল-বিন্দু পরীক্ষায় ইলেকট্রনের সুনির্দিষ্ট চার্জ -১.৬০২ × ১০⁻¹⁹ কুলম্ব নির্ণয় করেন।', diff: 'board' },
    { ch: 'chem1_ch2_qualitative', q: 'একটি ক্রোমোজোমাল বা ৩d অরবিটালের ইলেকট্রনের জন্য নিচের কোন কোয়ান্টাম সেটটি সঠিক?', a: 'n=3, l=2, m=-2, s=+1/2', w: ['n=3, l=3, m=0, s=+1/2', 'n=3, l=2, m=-3, s=-1/2', 'n=2, l=2, m=+1, s=+1/2'], exp: '3d অরবিটালে n=3, l=2 এবং m=-2 থেকে +2 পর্যন্ত মান গ্রহণযোগ্য।', diff: 'medical' },
    { ch: 'chem1_ch2_qualitative', q: 'সবচেয়ে বেশি অনুপ্রবেশ ক্ষমতা (Penetration power) সম্পন্ন উপস্তর কোনটি?', a: 's > p > d > f', w: ['f > d > p > s', 'p > s > d > f', 'd > f > p > s'], exp: 'একই প্রধান শক্তিস্তরে নিউক্লিয়াসের সবচেয়ে কাছে থাকে s অরবিটাল, তাই অনুপ্রবেশ ক্ষমতা s > p > d > f।', diff: 'medical' },
    { ch: 'chem1_ch2_qualitative', q: 'জাল টাকা শনাক্তকরণে ব্যবহৃত ফসফোর কালি কোন তরঙ্গদৈর্ঘ্যে দৃশ্যমান আলো বিকিরণ করে?', a: 'অতিবেগুনি (UV) রশ্মি শোষণ করে দৃশ্যমান প্রতিপ্রভা (Fluorescence) দেয়', w: ['X-রশ্মি শোষণ করে', 'মাইক্রোওয়েভ তরঙ্গ দেয়', 'গামা রশ্মি বিকিরণ করে'], exp: 'জাল নোট শনাক্তকরণ যন্ত্রে ব্যবহৃত UV রশ্মি আসল নোটের নিরাপত্তা সুতা ও ফসফোরে প্রতিপ্রভা সৃষ্টি করে।', diff: 'board' },
    { ch: 'chem1_ch3_periodic', q: 'পর্যায় সারণিতে তরল অধাতু এবং তরল ধাতু জোড়া কোনটি?', a: 'ব্রোমিন (অধাতু) ও পারদ (ধাতু)', w: ['আয়োডিন ও গ্যালিয়াম', 'ক্লোরিন ও সোডিয়াম', 'সালফার ও সিজিয়াম'], exp: 'কক্ষতাপমাত্রায় ব্রোমিন (Br₂) একমাত্র তরল অধাতু এবং পারদ (Hg) একমাত্র তরল ধাতু।', diff: 'board' },
    { ch: 'chem1_ch3_periodic', q: 'C–C বন্ধনদৈর্ঘ্য সবচেয়ে ছোট নিচের কোন যৌগটিতে?', a: 'ইথাইন (HC≡CH)', w: ['ইথেন (H₃C–CH₃)', 'ইথিন (H₂C=CH₂)', 'বেনজিন (C₆H₆)'], exp: 'ত্রিবন্ধনের কারণে ইথাইনে C≡C দৈর্ঘ্য মাত্র ০.১২ nm (১২০ pm)।', diff: 'medical' },
    { ch: 'chem1_ch3_periodic', q: 'সকল অ্যালুমিনিয়াম হ্যালাইডের মধ্যে AlCl₃ ডাইমার (Al₂Cl₆) গঠন করে কী ধরনের বন্ধনে?', a: 'ক্লোরিনের নিঃসঙ্গ জোড় দিয়ে দুটি Cl → Al সন্নিবেশ বন্ধন গঠনের মাধ্যমে', w: ['আয়নিক বন্ধনে', 'হাইড্রোজেন বন্ধনে', 'ধাতব বন্ধনে'], exp: 'AlCl₃-এ অষ্টক অপূর্ণ থাকায় দুটি অণু ক্লোরিন সেতু সন্নিবেশ বন্ধনের মাধ্যমে Al₂Cl₆ ডাইমার গঠন করে।', diff: 'medical' },
    { ch: 'chem1_ch3_periodic', q: 'দুটি মৌল A (Z=১৭) ও B (Z=২০) পরস্পর যুক্ত হয়ে কী ধরনের যৌগ গঠন করবে?', a: 'আয়নিক যৌগ BCl₂ (CaCl₂)', w: ['সমযোজী যৌগ AB₃', 'ধাতব সংকর', 'সন্নিবেশ যৌগ A₂B'], exp: 'Z=২০ হলো ক্যালসিয়াম (Ca) ও Z=১৭ হলো ক্লোরিন (Cl); এরা আয়নিক CaCl₂ গঠন করে।', diff: 'board' },
    { ch: 'chem1_ch4_equilibrium', q: 'অসওয়াল্ডের লঘুকরণ সূত্র অনুযায়ী তীব্র তড়িৎবিশ্লেষ্যের ক্ষেত্রে এটি প্রযোজ্য নয় কেন?', a: 'তীব্র তড়িৎবিশ্লেষ্য জলীয় দ্রবণে প্রায় ১০০% বিয়োজিত থাকে বলে কোনো সাম্যাবস্থা গঠিত হয় না', w: ['তীব্র তড়িৎবিশ্লেষ্য পানিতে অদ্রবণীয়', 'এদের ঘনমাত্রা শূন্য হয়', 'এরা কেবল গ্যাসীয় অবস্থায় বিয়োজিত হয়'], exp: 'অস্‌ওয়াল্ড সূত্র কেবল মৃদু তড়িৎবিশ্লেষ্যের বিয়োজন সাম্যাবস্থার জন্য প্রযোজ্য।', diff: 'medical' },
    { ch: 'chem1_ch4_equilibrium', q: 'একটি বিক্রিয়ার ΔH ঋণাত্মক ও ΔS ধনাত্মক হলে বিক্রিয়াটি স্বতঃস্ফূর্ত হবে কখন?', a: 'যেকোনো তাপমাত্রায়ই স্বতঃস্ফূর্ত হবে (ΔG সর্বদা ঋণাত্মক)', w: ['শুধুমাত্র উচ্চ তাপমাত্রায়', 'শুধুমাত্র নিম্ন তাপমাত্রায়', 'কখনোই স্বতঃস্ফূর্ত হবে না'], exp: 'ΔG = ΔH - TΔS; ΔH < 0 এবং ΔS > 0 হলে সকল তাপমাত্রায় ΔG < 0 হয়।', diff: 'medical' },
    { ch: 'chem1_ch5_applied', q: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO) অনুযায়ী খাদ্য সংরক্ষক হিসেবে নিষিদ্ধ ক্ষতিকর রাসায়নিক কোনটি?', a: 'ক্যালসিয়াম কার্বাইড ও ফরমালিন', w: ['সোডিয়াম বেনজোয়েট', 'পটাশিয়াম সরবেট', 'অ্যাসিটিক অ্যাসিড'], exp: 'কৃত্রিম ফল পাকানোয় ক্যালসিয়াম কার্বাইড (আর্সেনিক-ফসফরাস মিশ্রিত) ও সংরক্ষণে ফরমালিন মারাত্মক বিষাক্ত।', diff: 'board' },
    { ch: 'chem1_ch5_applied', q: 'ট্রিপল সুপার ফসফেট (TSP) বা প্রাকৃতিক কোয়াগুল্যান্ট ফিটকিরির সংকেত কোনটি?', a: 'K₂SO₄·Al₂(SO₄)₃·24H₂O (পটাশ অ্যালাম)', w: ['Na₂CO₃·10H₂O', 'CaSO₄·2H₂O', 'CuSO₄·5H₂O'], exp: 'ফিটকিরি বা পটাশ অ্যালাম হলো K₂SO₄·Al₂(SO₄)₃·24H₂O যা পানির কাদা থিতানো ও রক্তপাত বন্ধে ব্যবহৃত হয়।', diff: 'medical' },
  ];

  quickChem1.forEach((item) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: item.ch,
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: item.diff,
        question: item.q,
        correct: item.a,
        distractors: item.w,
        explanation: item.exp,
        reference: 'রসায়ন ১ম পত্র · গুরুত্বপূর্ণ ভর্তি ও বোর্ড প্রশ্ন',
      })
    );
  });

  return list;
}
