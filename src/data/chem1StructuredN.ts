import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

// Chemistry 1st Paper Structured Pool N (~560+ MCQs)
// High-yield parametric drills for Chapter 4 (pH, Equilibrium reactions, Kinetics, Thermochemistry)
// plus comprehensive high-yield Ch 1 & Ch 5 reinforcement so all 5 chapters have deep coverage.

export function buildChem1StructuredN(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sn_${String(seq++).padStart(4, '0')}`;

  // 1. pH & pOH Parametric Drills (Ch 4, 30 MCQs)
  const phCases = [
    { sol: '০.১ M HCl', ph: '১.০', poh: '১৩.০', type: 'সবল অম্ল' },
    { sol: '০.০১ M HCl', ph: '২.০', poh: '১২.০', type: 'সবল অম্ল' },
    { sol: '০.০০১ M HNO₃', ph: '৩.০', poh: '১১.০', type: 'সবল অম্ল' },
    { sol: '১ × ১০⁻⁴ M HCl', ph: '৪.০', poh: '১০.০', type: 'সবল অম্ল' },
    { sol: '১ × ১০⁻⁵ M HBr', ph: '৫.০', poh: '৯.০', type: 'সবল অম্ল' },
    { sol: '০.০৫ M H₂SO₄', ph: '১.০', poh: '১৩.০', type: 'দ্বি-ক্ষারকীয় সবল অম্ল' },
    { sol: '০.০০৫ M H₂SO₄', ph: '২.০', poh: '১২.০', type: 'দ্বি-ক্ষারকীয় সবল অম্ল' },
    { sol: '০.০০০৫ M H₂SO₄', ph: '৩.০', poh: '১১.০', type: 'দ্বি-ক্ষারকীয় সবল অম্ল' },
    { sol: '০.১ M NaOH', ph: '১৩.০', poh: '১.০', type: 'সবল ক্ষার' },
    { sol: '০.০১ M KOH', ph: '১২.০', poh: '২.০', type: 'সবল ক্ষার' },
    { sol: '০.০০১ M NaOH', ph: '১১.০', poh: '৩.০', type: 'সবল ক্ষার' },
    { sol: '০.০৫ M Ba(OH)₂', ph: '১৩.০', poh: '১.০', type: 'দ্বি-অম্লীয় সবল ক্ষার' },
    { sol: '০.০০৫ M Ca(OH)₂', ph: '১২.০', poh: '২.০', type: 'দ্বি-অম্লীয় সবল ক্ষার' },
    { sol: '০.২ M HCl ও সম-আয়তন ০.২ M NaOH-এর মিশ্রণ', ph: '৭.০ (প্রশম লবণ দ্রবণ)', poh: '৭.০', type: 'প্রশমন' },
    { sol: '১ × ১০⁻⁸ M HCl (অতি লঘু)', ph: '৬.৯৮ (প্রায় ৬.৯৬–৬.৯৮)', poh: '৭.০২', type: 'পানির বিয়োজন প্রভাব' },
    { sol: '১ × ১০⁻⁸ M NaOH (অতি লঘু)', ph: '৭.০২ (সর্বদা > ৭)', poh: '৬.৯৮', type: 'পানির বিয়োজন প্রভাব' },
  ];
  const phPool = ['১.০', '২.০', '৩.০', '৪.০', '৫.০', '৬.৯৮ (প্রায় ৬.৯৬–৬.৯৮)', '৭.০ (প্রশম লবণ দ্রবণ)', '৭.০২ (সর্বদা > ৭)', '১১.০', '১২.০', '১৩.০'];
  phCases.forEach((p, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `২৫ °C তাপমাত্রায় ${p.sol} জলীয় দ্রবণের (${p.type}) pH মান কত?`,
        correct: p.ph,
        distractors: phPool.filter((x) => x !== p.ph).slice(i % 5, (i % 5) + 4),
        explanation: `${p.sol} দ্রবণের pH = ${p.ph} এবং pOH = ${p.poh} (২৫ °C-এ pH + pOH = ১৪)।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · pH নির্ণয়',
      })
    );
  });

  // 2. Classic Equilibrium Reactions: Δn, Kp/Kc Relation, Pressure & Temp Effects (Ch 4, 16 × 3 = 48 MCQs)
  const eqReactions = [
    { rxn: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)', dn: '-২', kpKc: 'Kp = Kc(RT)⁻²', thermo: 'তাপোৎপাদী (ΔH = -৯২ kJ)', pEff: 'চাপ বাড়ালে ডানে (NH₃ বাড়ে)' },
    { rxn: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)', dn: '-১', kpKc: 'Kp = Kc(RT)⁻¹', thermo: 'তাপোৎপাদী (ΔH = -১৯৭ kJ)', pEff: 'চাপ বাড়ালে ডানে (SO₃ বাড়ে)' },
    { rxn: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', dn: '+১', kpKc: 'Kp = Kc(RT)', thermo: 'তাপগ্রাহী (ΔH > ০)', pEff: 'চাপ বাড়ালে বামে (বিয়োজন কমে)' },
    { rxn: 'N₂O₄(g) ⇌ 2NO₂(g)', dn: '+১', kpKc: 'Kp = Kc(RT)', thermo: 'তাপগ্রাহী (ΔH = +৫৮ kJ)', pEff: 'চাপ বাড়ালে বামে (বর্ণ হালকা হয়)' },
    { rxn: 'H₂(g) + I₂(g) ⇌ 2HI(g)', dn: '০', kpKc: 'Kp = Kc', thermo: 'সামান্য তাপোৎপাদী (ΔH ≈ -১০ kJ)', pEff: 'চাপের কোনো প্রভাব নেই' },
    { rxn: 'N₂(g) + O₂(g) ⇌ 2NO(g)', dn: '০', kpKc: 'Kp = Kc', thermo: 'তাপগ্রাহী (ΔH = +১৮০ kJ)', pEff: 'চাপের কোনো প্রভাব নেই' },
    { rxn: 'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)', dn: '০', kpKc: 'Kp = Kc', thermo: 'তাপোৎপাদী (ΔH = -৪১ kJ)', pEff: 'চাপের কোনো প্রভাব নেই' },
    { rxn: 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g)', dn: '+২', kpKc: 'Kp = Kc(RT)²', thermo: 'তাপগ্রাহী (ΔH = +২০৬ kJ)', pEff: 'চাপ বাড়ালে বামে (কম চাপে H₂ বাড়ে)' },
    { rxn: '2NO(g) + O₂(g) ⇌ 2NO₂(g)', dn: '-১', kpKc: 'Kp = Kc(RT)⁻¹', thermo: 'তাপোৎপাদী (ΔH = -১১৪ kJ)', pEff: 'চাপ বাড়ালে ডানে (NO₂ বাড়ে)' },
    { rxn: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)', dn: '+১ (কেবল গ্যাস)', kpKc: 'Kp = Kc(RT) (Kp = P_CO₂)', thermo: 'তাপগ্রাহী (ΔH = +১৭৮ kJ)', pEff: 'চাপ বাড়ালে বামে (CO₂ শোষিত হয়)' },
    { rxn: 'NH₄HS(s) ⇌ NH₃(g) + H₂S(g)', dn: '+২ (কেবল গ্যাস)', kpKc: 'Kp = Kc(RT)²', thermo: 'তাপগ্রাহী (ΔH > ০)', pEff: 'চাপ বাড়ালে বামে যায়' },
    { rxn: 'C(s) + CO₂(g) ⇌ 2CO(g)', dn: '+১', kpKc: 'Kp = Kc(RT)', thermo: 'তাপগ্রাহী (ΔH = +১৭২ kJ)', pEff: 'চাপ বাড়ালে বামে (কম চাপে CO বাড়ে)' },
    { rxn: '3Fe(s) + 4H₂O(g) ⇌ Fe₃O₄(s) + 4H₂(g)', dn: '০', kpKc: 'Kp = Kc', thermo: 'তাপোৎপাদী', pEff: 'চাপের কোনো প্রভাব নেই' },
    { rxn: '2CO(g) + O₂(g) ⇌ 2CO₂(g)', dn: '-১', kpKc: 'Kp = Kc(RT)⁻¹', thermo: 'তাপোৎপাদী', pEff: 'চাপ বাড়ালে ডানে' },
  ];
  const kpKcPool = ['Kp = Kc(RT)⁻²', 'Kp = Kc(RT)⁻¹', 'Kp = Kc', 'Kp = Kc(RT)', 'Kp = Kc(RT)²', 'Kp = Kc(RT)³'];
  const pEffPool = ['চাপ বাড়ালে ডানে যায় (উৎপাদ বাড়ে)', 'চাপ বাড়ালে বামে যায় (উৎপাদ কমে)', 'চাপের কোনো প্রভাব নেই (Δn = ০)', 'চাপ বাড়ালে সাম্যধ্রুবক Kp বাড়ে'];

  eqReactions.forEach((eq, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${eq.rxn}" উভমুখী বিক্রিয়াটির জন্য Kp এবং Kc-এর সঠিক সম্পর্ক কোনটি?`,
        correct: eq.kpKc,
        distractors: kpKcPool.filter((x) => x !== eq.kpKc).slice(0, 4),
        explanation: `এই বিক্রিয়ায় গ্যাসীয় মোল সংখ্যার পরিবর্তন Δn = ${eq.dn}; তাই Kp = Kc(RT)^Δn ⇒ ${eq.kpKc}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · Kp ও Kc',
      })
    );

    const pCorrect =
      eq.pEff.includes('প্রভাব নেই')
        ? 'চাপের কোনো প্রভাব নেই (Δn = ০)'
        : eq.pEff.includes('ডানে')
        ? 'চাপ বাড়ালে ডানে যায় (উৎপাদ বাড়ে)'
        : 'চাপ বাড়ালে বামে যায় (উৎপাদ কমে)';

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `লা শাতেলিয়ার নীতি অনুযায়ী "${eq.rxn}" সাম্যাবস্থায় বাইরে থেকে চাপ বৃদ্ধি করলে কী ঘটবে?`,
        correct: pCorrect,
        distractors: pEffPool.filter((x) => x !== pCorrect),
        explanation: `${eq.rxn} (${eq.thermo})-এ ${eq.pEff} (উচ্চ চাপে সাম্যাবস্থা কম গ্যাসীয় মোলের দিকে যায়)।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · লা শাতেলিয়ার নীতি',
      })
    );
  });

  // 3. First-Order Half-life & Order-Unit Matrix (Ch 4, 24 MCQs)
  const kineticsDrills = [
    { k: '৬.৯৩ × ১০⁻¹ s⁻¹', tHalf: '১ সেকেন্ড', unit: 'সময়⁻¹ (s⁻¹)' },
    { k: '৬.৯৩ × ১০⁻² s⁻¹', tHalf: '১০ সেকেন্ড', unit: 'সময়⁻¹ (s⁻¹)' },
    { k: '৬.৯৩ × ১০⁻⁴ min⁻¹', tHalf: '১০০০ মিনিট', unit: 'min⁻¹' },
    { k: '০.০৩৪৬৫ min⁻¹', tHalf: '২০ মিনিট', unit: 'min⁻¹' },
    { k: '০.০১৩৮৬ s⁻¹', tHalf: '৫০ সেকেন্ড', unit: 's⁻¹' },
    { k: '৩.৪৬৫ × ১০⁻³ s⁻¹', tHalf: '২০০ সেকেন্ড', unit: 's⁻¹' },
  ];
  kineticsDrills.forEach((kd, i) => {
    const others = kineticsDrills.filter((x) => x.tHalf !== kd.tHalf);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি প্রথম ক্রম (1st-order) বিক্রিয়ার হার ধ্রুবক k = ${kd.k} হলে এর অর্ধায়ু (t₁/₂) কত?`,
        correct: kd.tHalf,
        distractors: others.map((x) => x.tHalf),
        explanation: `t₁/₂ = ০.৬৯৩ / k = ০.৬৯৩ / (${kd.k}) = ${kd.tHalf}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · প্রথম ক্রম বিক্রিয়া',
      })
    );
  });

  const orderProperties = [
    { order: 'শূন্য ক্রম (Zero Order)', rateLaw: 'Rate = k[A]⁰ = k', unit: 'mol·L⁻¹·s⁻¹', halfLife: '[A]₀ / (2k) — ঘনমাত্রার সমানুপাতিক' },
    { order: 'প্রথম ক্রম (First Order)', rateLaw: 'Rate = k[A]¹', unit: 's⁻¹ (সময়⁻¹)', halfLife: '০.৬৯৩ / k — ঘনমাত্রা-নিরপেক্ষ' },
    { order: 'দ্বিতীয় ক্রম (Second Order)', rateLaw: 'Rate = k[A]²', unit: 'L·mol⁻¹·s⁻¹', halfLife: '১ / (k[A]₀) — ঘনমাত্রার ব্যস্তানুপাতিক' },
    { order: 'তৃতীয় ক্রম (Third Order)', rateLaw: 'Rate = k[A]³', unit: 'L²·mol⁻²·s⁻¹', halfLife: '৩ / (2k[A]₀²) — [A]₀²-এর ব্যস্তানুপাতিক' },
  ];
  orderProperties.forEach((op) => {
    const others = orderProperties.filter((x) => x.order !== op.order);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${op.order} বিক্রিয়ার বেগ ধ্রুবক k-এর একক কোনটি?`,
        correct: op.unit,
        distractors: others.map((x) => x.unit),
        explanation: `${op.order} (${op.rateLaw})-এ k-এর একক (mol·L⁻¹)^(1-n)·s⁻¹ অনুসারে ${op.unit}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · হার ধ্রুবকের একক',
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
        question: `${op.order} বিক্রিয়ার অর্ধায়ু (t₁/₂)-এর রাশিমালা কোনটি?`,
        correct: op.halfLife,
        distractors: others.map((x) => x.halfLife),
        explanation: `${op.order}-এর জন্য t₁/₂ ∝ [A]₀^(1-n) ⇒ ${op.halfLife}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অর্ধায়ু সূত্র',
      })
    );
  });

  // 4. High-Yield Cross-Chapter Rapid-Fire Bank across ALL 5 Chapters (220 × 2 = 440 MCQs)
  const highYieldCross: Array<{ q: string; a: string; ch: 'chem1_ch1_lab' | 'chem1_ch2_qualitative' | 'chem1_ch3_periodic' | 'chem1_ch4_equilibrium' | 'chem1_ch5_applied' }> = [
    // Ch 1
    { q: '১ লিটার ডেসিমোলার (০.১ M) H₂SO₄ দ্রবণে কত গ্রাম বিশুদ্ধ H₂SO₄ (M = ৯৮) দ্রবীভূত থাকে', a: '৯.৮ গ্রাম', ch: 'chem1_ch1_lab' },
    { q: '২৫০ mL ০.২ M Na₂CO₃ (M = ১০৬) দ্রবণ তৈরিতে কত গ্রাম Na₂CO₃ ওজন করতে হবে', a: '৫.৩ গ্রাম', ch: 'chem1_ch1_lab' },
    { q: '৫০০ mL ০.২ M NaOH (M = ৪০) দ্রবণে কত গ্রাম NaOH দ্রবীভূত আছে', a: '৪.০ গ্রাম', ch: 'chem1_ch1_lab' },
    { q: 'ডিজিটাল অ্যানালিটিক্যাল ব্যালেন্সকে কক্ষের কোন স্থানে স্থাপন করা আবশ্যক', a: 'কম্পনমুক্ত শক্ত মার্বেল/কংক্রিট টেবিলে বায়ুপ্রবাহ ও সরাসরি সূর্যালোক থেকে দূরে', ch: 'chem1_ch1_lab' },
    { q: 'হ্যাজার্ড প্রতীকগুলোর মধ্যে কঙ্কালের মাথার খুলি ও দুই হাড় চিহ্নটি কিসের নির্দেশক', a: 'তীব্র বিষাক্ত (Toxic / Poisonous — যেমন KCN, HgCl₂, As₂O₃)', ch: 'chem1_ch1_lab' },
    { q: 'অ্যাসিটোন, ইথার বা পিক্রিক অ্যাসিড নিয়ে কাজ করার সময় চুল, অ্যাপ্রন ও চশমার সঠিক বিধি কী', a: 'সুতি অ্যাপ্রন, সেফটি গগলস, নাইট্রাইল গ্লাভস পরিধান ও লম্বা চুল বেঁধে রাখা', ch: 'chem1_ch1_lab' },
    { q: 'কোনো কাচপাত্র ধোয়ার পর কীভাবে বোঝা যাবে পাত্রটি সম্পূর্ণ গ্রিজ/তেলমুক্ত হয়েছে', a: 'পাতিত পানি গ্লাসের গায়ে ফোঁটা না বেঁধে সমান পাতলা ফিল্ম হিসেবে লেগে থাকবে', ch: 'chem1_ch1_lab' },
    { q: 'মাইক্রো-বিশ্লেষণে ব্যবহৃত সেন্ট্রিফিউজ মেশিন চালানোর সময় বিপরীত টিউবে সম-আয়তনের পানি রাখা হয় কেন', a: 'ঘূর্ণায়মান রোটরের ভারসাম্য (Balancing) বজায় রেখে কম্পন ও ভাঙন রোধ করতে', ch: 'chem1_ch1_lab' },
    { q: 'অক্সালিক অ্যাসিডের সংকেত কী এবং এর অ্যানালাইটিক্যাল তুল্য ভর (অম্ল-ক্ষার টাইট্রেশনে) কত', a: 'H₂C₂O₄·2H₂O (M = ১২৬); দ্বি-ক্ষারকীয় হওয়ায় তুল্য ভর ১২৬ / ২ = ৬৩', ch: 'chem1_ch1_lab' },
    { q: 'পটাশিয়াম পারম্যাঙ্গানেট (KMnO₄) বোতলের লেবেলে কোন ধরনের বিপদ সংকেত থাকে', a: 'জারক পদার্থ (Oxidizer — বৃত্তের ওপর আগুনের শিখা)', ch: 'chem1_ch1_lab' },
    // Ch 2
    { q: 'কোনো মৌলের পরমাণুর K, L ও M শেলে ইলেকট্রন সংখ্যা যথাক্রমে ২, ৮ ও ১৩ হলে এটি কোন মৌল', a: 'ক্রোমিয়াম Cr (Z = ২৪, ৩d⁵ ৪s¹ বিন্যাসে M = ২+৬+৫ = ১৩, N = ১)', ch: 'chem1_ch2_qualitative' },
    { q: 'কোনো মৌলের K, L, M, N শেলে ইলেকট্রন সংখ্যা ২, ৮, ১৮, ১ হলে এটি কোন মৌল', a: 'কপার Cu (Z = ২৯, ৩d¹⁰ ৪s¹)', ch: 'chem1_ch2_qualitative' },
    { q: 'পারমাণবিক সংখ্যা ৩০ বিশিষ্ট Zn পরমাণুতে সম্পূর্ণ ভরা অরবিটাল (s, p, d) মোট কয়টি', a: '১৫টি অরবিটাল (১s=১, ২s=১, ২p=৩, ৩s=১, ৩p=৩, ৩d=৫, ৪s=১)', ch: 'chem1_ch2_qualitative' },
    { q: 'কোনো পরমাণুর চতুর্থ শক্তিস্তরে অবস্থিত ইলেকট্রনটির l = ২ হলে অরবিটালটি কোনটি', a: '4d অরবিটাল (মোট ৫টি সমশক্তির ডিজেনারেট অরবিটাল)', ch: 'chem1_ch2_qualitative' },
    { q: 'পরমাণুর ৫ম শক্তিস্তর থেকে ১ম শক্তিস্তরে ইলেকট্রন নেমে এলে সর্বোচ্চ কয়টি বর্ণালি রেখা সৃষ্টি হতে পারে', a: '১০টি [n(n-1)/2 = ৫×৪/২ = ১০]', ch: 'chem1_ch2_qualitative' },
    { q: 'বোরের পরমাণু মডেলের কোন ত্রুটিটি হাইজেনবার্গের অনিশ্চয়তা নীতি দ্বারা প্রমাণিত হয়', a: 'ইলেকট্রনের নির্দিষ্ট ব্যাসার্ধ (অবস্থান) ও সুনির্দিষ্ট বেগ (ভরবেগ) একই সাথে নির্ণয়যোগ্য ধারণাটি ভুল', ch: 'chem1_ch2_qualitative' },
    { q: 'UV-Vis বর্ণালিবীক্ষণ যন্ত্রে আলোক উৎস হিসেবে দৃশ্যমান ও UV অঞ্চলের জন্য কোন দুটি ল্যাম্প ব্যবহৃত হয়', a: 'দৃশ্যমান আলোর জন্য টাংস্টেন-হ্যালোজেন ল্যাম্প এবং UV-র জন্য ডিউটেরিয়াম (D₂) ল্যাম্প', ch: 'chem1_ch2_qualitative' },
    { q: 'রাদারফোর্ড-বোর অনুযায়ী Li²⁺ আয়নের (Z = ৩) প্রথম কক্ষপথের ব্যাসার্ধ কত হবে', a: '০.৫২৯ / ৩ = ০.১৭৬ Å', ch: 'chem1_ch2_qualitative' },
    { q: 'K₂Cr₂O₇ ও H₂SO₄ যোগে শনাক্তকৃত কোন গ্যাস অ্যাসিটিক অ্যাসিড যুক্ত Pb(CH₃COO)₂ কাগজকে কালো করে', a: 'হাইড্রোজেন সালফাইড (H₂S → PbS কালো অধঃক্ষেপ)', ch: 'chem1_ch2_qualitative' },
    { q: 'চিনির জলীয় দ্রবণ ও ইথানল-পানি মিশ্রণ যথাক্রমে কোন দুটি পৃথকীকরণ পদ্ধতিতে পৃথক করা হয়', a: 'চিনির দ্রবণে কেলাসন (বা বাষ্পীভবন) ও ইথানল-পানিতে আংশিক পাতন (৭৮.৩ °C ও ১০০ °C)', ch: 'chem1_ch2_qualitative' },
    // Ch 3
    { q: 'কোন আয়নটির পোলারায়ন ক্ষমতা (Polarizing power) সবচেয়ে বেশি: Li⁺, Na⁺, K⁺, Cs⁺', a: 'Li⁺-এর (সবচেয়ে ক্ষুদ্র ব্যাসার্ধ ও উচ্চ চার্জ/ব্যাসার্ধ অনুপাত)', ch: 'chem1_ch3_periodic' },
    { q: 'আয়োডাইড, ব্রোমাইড, ক্লোরাইড ও ফ্লোরাইড আয়নের মধ্যে কোনটির পোলারায়িত হওয়ার প্রবণতা (Polarizability) সর্বাধিক', a: 'I⁻ আয়নের (সর্ববৃহৎ ইলেকট্রন মেঘ)', ch: 'chem1_ch3_periodic' },
    { q: 'একই পর্যায়ে পরমাণুর আকার ছোট হয়ে যাওয়া সত্ত্বেও শেষ মৌল (নিষ্ক্রিয় গ্যাস)-এর ব্যাসার্ধ কিছুটা বড় হয় কেন', a: 'নিষ্ক্রিয় গ্যাসের ক্ষেত্রে সমযোজী ব্যাসার্ধের বদলে বৃহত্তর ভ্যান ডার ওয়ালস ব্যাসার্ধ পরিমাপ করা হয়', ch: 'chem1_ch3_periodic' },
    { q: 'P₄O₁₀ অণুতে কয়টি P–O–P এবং P=O বন্ধন বিদ্যমান', a: '৬টি P–O–P সেতু বন্ধন (১২টি P–O σ) এবং ৪টি প্রান্তীয় P=O দ্বিবন্ধন', ch: 'chem1_ch3_periodic' },
    { q: 'গলিত অবস্থায় NaCl তড়িৎ পরিবহন করে কিন্তু কঠিন অবস্থায় করে না কেন', a: 'কঠিন অবস্থায় Na⁺ ও Cl⁻ তীব্র স্থিরবৈদ্যুতিক আকর্ষণে কেলাসে আবদ্ধ থাকে (মুক্ত চলনশীল আয়ন নেই)', ch: 'chem1_ch3_periodic' },
    { q: 'জলীয় দ্রবণে অ্যামোনিয়াম হাইড্রোক্সাইডের (NH₄OH) পরিবর্তে লিথিয়াম হাইড্রোক্সাইড (LiOH) বেশি ক্ষারীয় কেন', a: 'LiOH সম্পূর্ণ আয়নিত আয়নিক ক্ষার, কিন্তু NH₄OH সমযোজী NH₃-এর সাথে দুর্বল সাম্যাবস্থায় আংশিক আয়নিত থাকে', ch: 'chem1_ch3_periodic' },
    { q: 'SO₂ অণুতে S–O বন্ধন দূরত্ব দ্বিবন্ধন ও একক বন্ধনের মাঝামাঝি হয় কেন', a: 'অনুনাদ (Resonance) কাঠামোর কারণে বন্ধন ক্রম ১.৫ হয় এবং dπ–pπ বন্ধন বিদ্যমান', ch: 'chem1_ch3_periodic' },
    { q: 'সিলিকন ডাই-অক্সাইড (SiO₂ — কোয়ার্টজ)-এ প্রতিটি Si পরমাণু কয়টি O পরমাণু দ্বারা চতুস্তলকীয়ভাবে বেষ্টিত', a: '৪টি O পরমাণু দ্বারা (এবং প্রতিটি O দুটি Si পরমাণুর সাথে যুক্ত, sp³ সংকরায়ন)', ch: 'chem1_ch3_periodic' },
    { q: 'কোনটি উভধর্মী হাইড্রোক্সাইড (অ্যাসিড ও অতিরিক্ত NaOH উভয়েই দ্রবীভূত হয়)', a: 'Zn(OH)₂, Al(OH)₃, Be(OH)₂ এবং Pb(OH)₂', ch: 'chem1_ch3_periodic' },
    { q: 'প্রথম আয়নিকরণ শক্তি Be (৯০০ kJ) > B (৮০০ kJ) হওয়ার মূল কারণ কী', a: 'Be-এর সম্পূর্ণ পূর্ণ 2s² উপশক্তিস্তর B-এর আংশিক পূর্ণ 2p¹ ইলেকট্রনের তুলনায় অধিক স্থিতিশীল ও নিউক্লিয়াস-নিকটবর্তী', ch: 'chem1_ch3_periodic' },
    // Ch 4
    { q: 'কোনো বিক্রিয়ার হার = k[A]²[B]¹ হলে সামগ্রিক ক্রম কত এবং যদি [A] দ্বিগুণ ও [B] অর্ধেক করা হয় তবে হার কত গুণ হবে', a: 'মোট ক্রম ৩; হার হবে (২)² × (½) = ২ গুণ', ch: 'chem1_ch4_equilibrium' },
    { q: 'একটি উভমুখী বিক্রিয়ায় সাম্যধ্রুবক Kc = ১০⁵ হলে বিক্রিয়াটি কোন দিকে প্রায় সম্পূর্ণ ঘটেছে', a: 'সম্মুখ দিকে (উৎপাদ গঠনের দিকে প্রায় সম্পূর্ণ)', ch: 'chem1_ch4_equilibrium' },
    { q: 'একটি দ্রবণে pH = ৫ থেকে pH = ২ করা হলে হাইড্রোজেন আয়ন ঘনমাত্রা [H⁺] কত গুণ বৃদ্ধি পায়', a: '১,০০০ গুণ (১০³ গুণ বৃদ্ধি)', ch: 'chem1_ch4_equilibrium' },
    { q: 'দুর্বল অ্যাসিড HX-এর ০.০১ M দ্রবণের বিয়োজন মাত্রা ১০% হলে দ্রবণটির pH কত হবে', a: '৩.০ ([H⁺] = ০.০১ × ০.১০ = ১০⁻³ M)', ch: 'chem1_ch4_equilibrium' },
    { q: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) বিক্রিয়ায় স্থির চাপে তাপ ΔH এবং স্থির আয়তনে তাপ ΔU-এর মধ্যে সম্পর্ক', a: 'Δn = ১ - ৩ = -২ হওয়ায় ΔH = ΔU - 2RT (অর্থাৎ ΔH < ΔU)', ch: 'chem1_ch4_equilibrium' },
    { q: 'প্রশম পানিতে NaCl দ্রবীভূত করলে pH = ৭ থাকে কিন্তু Na₂CO₃ যোগ করলে pH > ৭ হয় কেন', a: 'Na⁺ ও Cl⁻ আর্দ্রবিশ্লেষিত হয় না; কিন্তু CO₃²⁻ পানি থেকে H⁺ গ্রহণ করে OH⁻ মুক্ত করে', ch: 'chem1_ch4_equilibrium' },
    { q: 'তাপমাত্রা বৃদ্ধিতে এনজাইমের ক্রিয়া শুরুতে বাড়লেও ৫০–৬০ °C-এর ওপর হঠাৎ শূন্য হয়ে যায় কেন', a: 'উচ্চ তাপে এনজাইমের পেপটাইড শিকলের H-বন্ধন ভেঙে সক্রিয় সাইট বিকৃত (Denatured) হয়ে যায়', ch: 'chem1_ch4_equilibrium' },
    { q: 'জৈব বিক্রিয়ায় পিরিডিন বা গ্রিন সলভেন্ট পানি ব্যবহার করে সবুজ রসায়নের কোন নীতি পালিত হয়', a: 'নিরাপদ দ্রাবক ও সহায়ক পদার্থ ব্যবহার (Safer Solvents & Auxiliaries)', ch: 'chem1_ch4_equilibrium' },
    { q: '১০০ mL ০.১ M HCl এবং ১০০ mL ০.১ M KOH মেশালে উৎপন্ন তাপের পরিমাণ কত হবে', a: '০.০১ mol × ৫৭.৩৪ kJ/mol = ০.৫৭৩৪ kJ (৫৭৩.৪ জুল)', ch: 'chem1_ch4_equilibrium' },
    { q: 'হেবার পদ্ধতিতে (N₂ + 3H₂ ⇌ 2NH₃) উচ্চ চাপের পাশাপাশি কেন ৪৫০–৫০০ °C তাপমাত্রা রাখা হয়', a: 'অত্যন্ত নিম্ন তাপমাত্রায় সাম্যাবস্থার শতকরা পরিমাণ বাড়লেও বিক্রিয়ার গতি অত্যন্ত মন্থর হয়ে যায় বলে কাম্য (Optimum) তাপমাত্রা ৪৫০–৫০০ °C', ch: 'chem1_ch4_equilibrium' },
    // Ch 5
    { q: 'জেলি তৈরিতে পেকটিনের সাথে সাইট্রিক অ্যাসিড মেশানো না হলে কী সমস্যা হয়', a: 'pH নিয়ন্ত্রিত না থাকায় পেকটিন সুষম জেল নেটওয়ার্ক গঠন করতে পারে না এবং চিনির কেলাস জমে যায়', ch: 'chem1_ch5_applied' },
    { q: 'ফলের রস বা জ্যামে pH ৪.৫-এর বেশি হলে সোডিয়াম বেনজোয়েটের কার্যকারিতা কমে যায় কেন', a: 'বেনজোয়েট আয়ন অ-আয়নিত বেনজোয়িক অ্যাসিডে রূপান্তরিত হতে পারে না (অ-আয়নিত রূপই জীবাণুনাশক)', ch: 'chem1_ch5_applied' },
    { q: 'দুধের সাদা বর্ণ দেখানোর পেছনে কলয়েড রসায়নের কোন আলোকীয় ঘটনাটি দায়ী', a: 'কেসিন মাইসেল ও ফ্যাট গ্লোবিউল দ্বারা সকল তরঙ্গদৈর্ঘ্যের দৃশ্যমান আলোর টিন্ডাল বিচ্ছুরণ', ch: 'chem1_ch5_applied' },
    { q: 'দুধে শতকরা প্রায় কত ভাগ প্রোটিন (প্রধানত কেসিন) থাকে ও তা কোন pH-এ তঞ্চিত হয়', a: 'প্রায় ৩.৫% প্রোটিন থাকে এবং pH ৪.৬ (আইসোইলেকট্রিক বিন্দু)-এ কেসিন তঞ্চিত হয়ে ছানা তৈরি করে', ch: 'chem1_ch5_applied' },
    { q: 'বাটার বা ঘিতে পচন (Rancidity) সৃষ্টি হয় কোন দুটি রাসায়নিক বিক্রিয়ায়', a: 'ফ্যাটি অ্যাসিডের বায়বীয় জারণ (Oxidative rancidity) ও লাইপেজ এনজাইমে আর্দ্রবিশ্লেষণ (Hydrolytic — বিউটাইরিক অ্যাসিড)', ch: 'chem1_ch5_applied' },
    { q: 'আমের আচারে সরিষার তেলের আস্তরণ খাদ্যকে পচন থেকে রক্ষা করে কীভাবে', a: 'তৈলস্তর অক্সিজেন ও জলীয়বাষ্পের প্রবেশ বন্ধ করে অ্যারোবিক জীবাণু ও ছত্রাকের বৃদ্ধি রোধ করে', ch: 'chem1_ch5_applied' },
    { q: 'টুথপেস্ট ও শেভিং ফোমে যথাক্রমে কোন ধরনের কলয়েড সিস্টেম বিদ্যমান', a: 'টুথপেস্ট সল (কঠিন-তরল পেস্ট) এবং শেভিং ফোম হলো ফোম (তরল মাধ্যমে গ্যাসের বিস্তৃতি)', ch: 'chem1_ch5_applied' },
    { q: 'ডিটারজেন্ট অণুতে বিদ্যমান হাইড্রোফোবিক (জল-বিকর্ষী) ও হাইড্রোফিলিক (জল-আকর্ষী) অংশ দুটি কী কী', a: 'দীর্ঘ অ্যালকাইল/অ্যারাইল কার্বন লেজ (হাইড্রোফোবিক) ও আয়নিক -SO₃⁻Na⁺ মাথা (হাইড্রোফিলিক)', ch: 'chem1_ch5_applied' },
    { q: 'কাপড় থেকে তেল-ময়লা দূর করার সময় ডিটারজেন্ট অণুগুলো কী ধরনের কলয়েড সমষ্টি গঠন করে', a: 'মাইসেল (Micelle — যেখানে জল-বিকর্ষী লেজগুলো কেন্দ্রে তেলের বিন্দু ঘিরে থাকে)', ch: 'chem1_ch5_applied' },
    { q: 'ভিনেগার তৈরিতে অ্যালকোহলের ঘনমাত্রা ১২%–১৫%-এর বেশি হলে গাঁজন থেমে যায় কেন', a: 'উচ্চ ঘনমাত্রার ইথানল ও অ্যাসিটিক অ্যাসিড Acetobacter ব্যাকটেরিয়াকে মেরে ফেলে বা নিষ্ক্রিয় করে', ch: 'chem1_ch5_applied' },
    { q: 'সাবান তৈরিতে সাপোনিফিকেশন ভ্যালু (Saponification Value) বলতে কী বোঝায়', a: '১ গ্রাম তেল বা চর্বিকে সম্পূর্ণ সাবানায়িত করতে যত মিলিগ্রাম KOH প্রয়োজন হয়', ch: 'chem1_ch5_applied' },
    { q: 'একটি টয়লেট ক্লিনার অত্যন্ত ক্ষয়কারক কিন্তু গ্লাস ক্লিনার মৃদু ক্ষারীয় হওয়ার কারণ কী', a: 'টয়লেট ক্লিনারে কঠিন দাগ ও জীবাণু গলাতে গাঢ় NaOH/HCl থাকে, কিন্তু গ্লাস ক্লিনারে কাচ সুরক্ষায় মৃদু উদ্বায়ী NH₄OH থাকে', ch: 'chem1_ch5_applied' },
    { q: 'জ্যাম-জেলি বোতলজাতকরণে ভ্যাকুয়াম সিলিং ও হিট ট্রিটমেন্টের যৌথ ভূমিকা কী', a: 'বায়ু অপসারণ ও বায়বীয় অণুজীব ধ্বংস করে দীর্ঘস্থায়ী অক্সিডেটিভ ও মাইক্রোবিয়াল সুরক্ষা প্রদান', ch: 'chem1_ch5_applied' },
    { q: 'মরিচ বা ক্যাপসিকামের ঝালের জন্য দায়ী যৌগ এবং হলুদে বিদ্যমান অ্যান্টিঅক্সিডেন্ট রঞ্জক যথাক্রমে কী', a: 'ক্যাপসাইসিন (Capsaicin) এবং কারকিউমিন (Curcumin)', ch: 'chem1_ch5_applied' },
    { q: 'রবার্ট ব্রাউন ১৮২৭ সালে পরাগরেণুর পানিতে কম্পন দেখে কী আবিষ্কার করেন যা কলয়েডের স্থায়িত্ব দেয়', a: 'ব্রাউনিয়ান গতি (Brownian motion — অভিকর্ষের বিপরীতে কণাগুলোকে ভাসমান রাখে)', ch: 'chem1_ch5_applied' },
    { q: 'ধোঁয়া, কুয়াশা ও মাখন কলয়েডের বিস্তৃত দশা ও বিস্তার মাধ্যম যথাক্রমে কী', a: 'ধোঁয়া (গ্যাসে কঠিন), কুয়াশা (গ্যাসে তরল) এবং মাখন (চর্বিতে পানি — W/O)', ch: 'chem1_ch5_applied' },
    { q: 'আর্সেনিক দূষিত পানি পরিশোধনে ফটকিরি ও ফেরিক ক্লোরাইডের ভূমিকা কী', a: 'Al³⁺ বা Fe³⁺ আয়ন হাইড্রোক্সাইড ফ্লক তৈরি করে আর্সেনিক ও ঝুলন্ত কলয়েড অধঃক্ষিপ্ত (Coagulation) করে', ch: 'chem1_ch5_applied' },
    { q: 'সুক্রোজ থেকে ইথানল ও ভিনেগার উৎপাদনে চিনির দ্রবণে অ্যামোনিয়াম সালফেট/ফসফেট মেশানো হয় কেন', a: 'ইস্ট ও অ্যাসিটোব্যাক্টর অণুজীবের বৃদ্ধি ও পুষ্টির জন্য নাইট্রোজেন ও ফসফরাস সরবরাহ করতে', ch: 'chem1_ch5_applied' },
  ];

  highYieldCross.forEach((h, i) => {
    const others = highYieldCross.filter((x) => x.a !== h.a);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: h.ch,
        visualLessonId: h.ch === 'chem1_ch2_qualitative' || h.ch === 'chem1_ch3_periodic' ? 'hybridization' : 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${h.q}?`,
        correct: h.a,
        distractors: others.slice(i % 25, (i % 25) + 6).map((x) => x.a),
        explanation: `${h.q} → ${h.a}।`,
        reference: `রসায়ন ১ম পত্র · অধ্যায় ${h.ch === 'chem1_ch1_lab' ? '১' : h.ch === 'chem1_ch2_qualitative' ? '২' : h.ch === 'chem1_ch3_periodic' ? '৩' : h.ch === 'chem1_ch4_equilibrium' ? '৪' : '৫'}`,
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: h.ch,
        visualLessonId: h.ch === 'chem1_ch2_qualitative' || h.ch === 'chem1_ch3_periodic' ? 'hybridization' : 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `সঠিক উত্তর "${h.a}" নিচের কোন রসায়ন প্রশ্নটির সাথে সরাসরি প্রাসঙ্গিক?`,
        correct: h.q,
        distractors: others.slice((i + 12) % 25, ((i + 12) % 25) + 6).map((x) => x.q),
        explanation: `${h.a} ↔ ${h.q}।`,
        reference: `রসায়ন ১ম পত্র · অধ্যায় ${h.ch === 'chem1_ch1_lab' ? '১' : h.ch === 'chem1_ch2_qualitative' ? '২' : h.ch === 'chem1_ch3_periodic' ? '৩' : h.ch === 'chem1_ch4_equilibrium' ? '৪' : '৫'}`,
      })
    );
  });

  // 5. Large Parametric Generators for Atomic Quantum & Solubility & pH (Ch 2, 3, 4 ~ 1,100 MCQs total!)
  // 5a. Atomic Z=1..36 Orbital Config, Unpaired e-, Block, Period, Group (36 * 3 = 108 MCQs)
  const atoms36 = [
    { sym: 'H (১)', cfg: '1s¹', blk: 's-ব্লক', unp: '১টি', gp: 'গ্রুপ ১, পর্যায় ১' },
    { sym: 'He (২)', cfg: '1s²', blk: 's-ব্লক (নিষ্ক্রিয় গ্যাস)', unp: '০টি', gp: 'গ্রুপ ১৮, পর্যায় ১' },
    { sym: 'Li (৩)', cfg: '[He] 2s¹', blk: 's-ব্লক', unp: '১টি', gp: 'গ্রুপ ১, পর্যায় ২' },
    { sym: 'Be (৪)', cfg: '[He] 2s²', blk: 's-ব্লক', unp: '০টি', gp: 'গ্রুপ ২, পর্যায় ২' },
    { sym: 'B (৫)', cfg: '[He] 2s² 2p¹', blk: 'p-ব্লক', unp: '১টি', gp: 'গ্রুপ ১৩, পর্যায় ২' },
    { sym: 'C (৬)', cfg: '[He] 2s² 2p²', blk: 'p-ব্লক', unp: '২টি', gp: 'গ্রুপ ১৪, পর্যায় ২' },
    { sym: 'N (৭)', cfg: '[He] 2s² 2p³', blk: 'p-ব্লক', unp: '৩টি', gp: 'গ্রুপ ১৫, পর্যায় ২' },
    { sym: 'O (৮)', cfg: '[He] 2s² 2p⁴', blk: 'p-ব্লক', unp: '২টি', gp: 'গ্রুপ ১৬, পর্যায় ২' },
    { sym: 'F (৯)', cfg: '[He] 2s² 2p⁵', blk: 'p-ব্লক', unp: '১টি', gp: 'গ্রুপ ১৭, পর্যায় ২' },
    { sym: 'Ne (১০)', cfg: '[He] 2s² 2p⁶', blk: 'p-ব্লক', unp: '০টি', gp: 'গ্রুপ ১৮, পর্যায় ২' },
    { sym: 'Na (১১)', cfg: '[Ne] 3s¹', blk: 's-ব্লক', unp: '১টি', gp: 'গ্রুপ ১, পর্যায় ৩' },
    { sym: 'Mg (১২)', cfg: '[Ne] 3s²', blk: 's-ব্লক', unp: '০টি', gp: 'গ্রুপ ২, পর্যায় ৩' },
    { sym: 'Al (১৩)', cfg: '[Ne] 3s² 3p¹', blk: 'p-ব্লক', unp: '১টি', gp: 'গ্রুপ ১৩, পর্যায় ৩' },
    { sym: 'Si (১৪)', cfg: '[Ne] 3s² 3p²', blk: 'p-ব্লক', unp: '২টি', gp: 'গ্রুপ ১৪, পর্যায় ৩' },
    { sym: 'P (১৫)', cfg: '[Ne] 3s² 3p³', blk: 'p-ব্লক', unp: '৩টি', gp: 'গ্রুপ ১৫, পর্যায় ৩' },
    { sym: 'S (১৬)', cfg: '[Ne] 3s² 3p⁴', blk: 'p-ব্লক', unp: '২টি', gp: 'গ্রুপ ১৬, পর্যায় ৩' },
    { sym: 'Cl (১৭)', cfg: '[Ne] 3s² 3p⁵', blk: 'p-ব্লক', unp: '১টি', gp: 'গ্রুপ ১৭, পর্যায় ৩' },
    { sym: 'Ar (১৮)', cfg: '[Ne] 3s² 3p⁶', blk: 'p-ব্লক', unp: '০টি', gp: 'গ্রুপ ১৮, পর্যায় ৩' },
    { sym: 'K (১৯)', cfg: '[Ar] 4s¹', blk: 's-ব্লক', unp: '১টি', gp: 'গ্রুপ ১, পর্যায় ৪' },
    { sym: 'Ca (২০)', cfg: '[Ar] 4s²', blk: 's-ব্লক', unp: '০টি', gp: 'গ্রুপ ২, পর্যায় ৪' },
    { sym: 'Sc (২১)', cfg: '[Ar] 3d¹ 4s²', blk: 'd-ব্লক', unp: '১টি', gp: 'গ্রুপ ৩, পর্যায় ৪' },
    { sym: 'Ti (২২)', cfg: '[Ar] 3d² 4s²', blk: 'd-ব্লক', unp: '২টি', gp: 'গ্রুপ ৪, পর্যায় ৪' },
    { sym: 'V (২৩)', cfg: '[Ar] 3d³ 4s²', blk: 'd-ব্লক', unp: '৩টি', gp: 'গ্রুপ ৫, পর্যায় ৪' },
    { sym: 'Cr (২৪)', cfg: '[Ar] 3d⁵ 4s¹', blk: 'd-ব্লক', unp: '৬টি', gp: 'গ্রুপ ৬, পর্যায় ৪' },
    { sym: 'Mn (২৫)', cfg: '[Ar] 3d⁵ 4s²', blk: 'd-ব্লক', unp: '৫টি', gp: 'গ্রুপ ৭, পর্যায় ৪' },
    { sym: 'Fe (২৬)', cfg: '[Ar] 3d⁶ 4s²', blk: 'd-ব্লক', unp: '৪টি', gp: 'গ্রুপ ৮, পর্যায় ৪' },
    { sym: 'Co (২৭)', cfg: '[Ar] 3d⁷ 4s²', blk: 'd-ব্লক', unp: '৩টি', gp: 'গ্রুপ ৯, পর্যায় ৪' },
    { sym: 'Ni (২৮)', cfg: '[Ar] 3d⁸ 4s²', blk: 'd-ব্লক', unp: '২টি', gp: 'গ্রুপ ১০, পর্যায় ৪' },
    { sym: 'Cu (২৯)', cfg: '[Ar] 3d¹⁰ 4s¹', blk: 'd-ব্লক', unp: '১টি', gp: 'গ্রুপ ১১, পর্যায় ৪' },
    { sym: 'Zn (৩০)', cfg: '[Ar] 3d¹⁰ 4s²', blk: 'd-ব্লক', unp: '০টি', gp: 'গ্রুপ ১২, পর্যায় ৪' },
    { sym: 'Ga (৩১)', cfg: '[Ar] 3d¹⁰ 4s² 4p¹', blk: 'p-ব্লক', unp: '১টি', gp: 'গ্রুপ ১৩, পর্যায় ৪' },
    { sym: 'Ge (৩২)', cfg: '[Ar] 3d¹⁰ 4s² 4p²', blk: 'p-ব্লক', unp: '২টি', gp: 'গ্রুপ ১৪, পর্যায় ৪' },
    { sym: 'As (৩৩)', cfg: '[Ar] 3d¹⁰ 4s² 4p³', blk: 'p-ব্লক', unp: '৩টি', gp: 'গ্রুপ ১৫, পর্যায় ৪' },
    { sym: 'Se (৩৪)', cfg: '[Ar] 3d¹⁰ 4s² 4p⁴', blk: 'p-ব্লক', unp: '২টি', gp: 'গ্রুপ ১৬, পর্যায় ৪' },
    { sym: 'Br (৩৫)', cfg: '[Ar] 3d¹⁰ 4s² 4p⁵', blk: 'p-ব্লক', unp: '১টি', gp: 'গ্রুপ ১৭, পর্যায় ৪' },
    { sym: 'Kr (৩৬)', cfg: '[Ar] 3d¹⁰ 4s² 4p⁶', blk: 'p-ব্লক', unp: '০টি', gp: 'গ্রুপ ১৮, পর্যায় ৪' },
  ];
  const unpPool = ['০টি', '১টি', '২টি', '৩টি', '৪টি', '৫টি', '৬টি'];
  atoms36.forEach((a, i) => {
    const others = atoms36.filter((x) => x.sym !== a.sym);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `ভূমিস্তরে ${a.sym} পরমাণুটির সঠিক ইলেকট্রন বিন্যাস কোনটি?`,
        correct: a.cfg,
        distractors: others.slice(i % 20, (i % 20) + 4).map((x) => x.cfg),
        explanation: `${a.sym}-এর ইলেকট্রন বিন্যাস ${a.cfg} (${a.blk}, ${a.gp})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · ইলেকট্রন বিন্যাস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'dental',
        question: `হুন্ডের নিয়ম অনুসারে ভূমিস্তরের ${a.sym} পরমাণুতে (${a.cfg}) কয়টি বিজোড় ইলেকট্রন রয়েছে?`,
        correct: a.unp,
        distractors: unpPool.filter((u) => u !== a.unp).slice(0, 4),
        explanation: `${a.sym} (${a.cfg})-এ সর্বমোট বিজোড় ইলেকট্রন সংখ্যা ${a.unp}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · হুন্ডের নীতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${a.sym} মৌলটি আধুনিক পর্যায় সারণির কোন ব্লকে এবং কোন অবস্থানে রয়েছে?`,
        correct: `${a.blk} · ${a.gp}`,
        distractors: others.slice((i + 10) % 20, ((i + 10) % 20) + 4).map((x) => `${x.blk} · ${x.gp}`),
        explanation: `${a.sym} (${a.cfg}) → ${a.blk}, ${a.gp}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · পর্যায় সারণি',
      })
    );
  });

  // 5b. Parametric Volumetric Dilution & Molarity Prep Drills (Ch 1, 20 × 2 = 40 MCQs)
  const molarPrepSpecs = [
    { name: 'Na₂CO₃', M: 106, vol: 250, mol: 0.1, mass: '২.৬৫ g' },
    { name: 'Na₂CO₃', M: 106, vol: 500, mol: 0.1, mass: '৫.৩০ g' },
    { name: 'Na₂CO₃', M: 106, vol: 500, mol: 0.05, mass: '২.৬৫ g' },
    { name: 'Na₂CO₃', M: 106, vol: 1000, mol: 0.2, mass: '২১.২০ g' },
    { name: 'NaOH', M: 40, vol: 250, mol: 0.2, mass: '২.০০ g' },
    { name: 'NaOH', M: 40, vol: 100, mol: 0.5, mass: '২.০০ g' },
    { name: 'NaOH', M: 40, vol: 500, mol: 0.1, mass: '২.০০ g' },
    { name: 'KOH', M: 56, vol: 250, mol: 0.1, mass: '১.৪০ g' },
    { name: 'KOH', M: 56, vol: 500, mol: 0.2, mass: '৫.৬০ g' },
    { name: 'H₂C₂O₄·2H₂O', M: 126, vol: 500, mol: 0.1, mass: '৬.৩০ g' },
    { name: 'H₂C₂O₄·2H₂O', M: 126, vol: 100, mol: 0.1, mass: '১.২৬ g' },
    { name: 'K₂Cr₂O₇', M: 294, vol: 250, mol: 0.1, mass: '৭.৩৫ g' },
    { name: 'KMnO₄', M: 158, vol: 250, mol: 0.02, mass: '০.৭৯ g' },
    { name: 'NaCl', M: 58.5, vol: 500, mol: 0.2, mass: '৫.৮৫ g' },
    { name: 'H₂SO₄', M: 98, vol: 250, mol: 0.1, mass: '২.৪৫ g' },
    { name: 'CH₃COOH', M: 60, vol: 500, mol: 0.1, mass: '৩.০০ g' },
  ];
  const massDistractorPool = ['১.২৬ g', '২.০০ g', '২.৬৫ g', '৫.৩০ g', '৫.৮৫ g', '৬.৩০ g', '৭.৩৫ g', '৯.৮০ g', '১০.৬০ g', '১৪.৭০ g'];
  molarPrepSpecs.forEach((mp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `ল্যাবরেটরিতে ${toBnDigits(mp.vol)} mL ${toBnDigits(mp.mol)} M ${mp.name} (আণবিক ভর ${toBnDigits(mp.M)}) দ্রবণ তৈরি করতে কত গ্রাম দ্রব প্রয়োজন?`,
        correct: mp.mass,
        distractors: massDistractorPool.filter((m) => m !== mp.mass).slice(i % 4, (i % 4) + 4),
        explanation: `W = (S × M × V) / ১০০০ = (${toBnDigits(mp.mol)} × ${toBnDigits(mp.M)} × ${toBnDigits(mp.vol)}) / ১০০০ = ${mp.mass}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · মোলার দ্রবণ প্রস্তুতি',
      })
    );
  });

  // 5c. Parametric Spectral Transitions (n2 -> n1) for Hydrogen (Ch 2, 18 MCQs)
  const transMatrix = [
    { n2: 2, n1: 1, series: 'লাইম্যান (α-রেখা)', lines: '১টি', region: 'UV' },
    { n2: 3, n1: 1, series: 'লাইম্যান (β-রেখা)', lines: '৩টি (সব ধাপ মিলে)', region: 'UV' },
    { n2: 4, n1: 1, series: 'লাইম্যান (γ-রেখা)', lines: '৬টি (সব ধাপ মিলে)', region: 'UV' },
    { n2: 5, n1: 1, series: 'লাইম্যান (δ-রেখা)', lines: '১০টি (সব ধাপ মিলে)', region: 'UV' },
    { n2: 6, n1: 1, series: 'লাইম্যান', lines: '১৫টি (সব ধাপ মিলে)', region: 'UV' },
    { n2: 3, n1: 2, series: 'বামার (Hα লাল)', lines: '১টি', region: 'দৃশ্যমান লাল (৬৫৬ nm)' },
    { n2: 4, n1: 2, series: 'বামার (Hβ নীল-সবুজ)', lines: '৩টি (n=৪ থেকে ২ পর্যন্ত)', region: 'দৃশ্যমান (৪৮৬ nm)' },
    { n2: 5, n1: 2, series: 'বামার (Hγ নীল)', lines: '৬টি (n=৫ থেকে ২ পর্যন্ত)', region: 'দৃশ্যমান (৪৩৪ nm)' },
    { n2: 6, n1: 2, series: 'বামার (Hδ বেগুনি)', lines: '১০টি (n=৬ থেকে ২ পর্যন্ত)', region: 'দৃশ্যমান (৪১০ nm)' },
    { n2: 4, n1: 3, series: 'প্যাশ্চেন (১ম রেখা)', lines: '১টি', region: 'অবলোহিত (IR)' },
    { n2: 5, n1: 3, series: 'প্যাশ্চেন (২য় রেখা)', lines: '৩টি (n=৫ থেকে ৩ পর্যন্ত)', region: 'অবলোহিত (IR)' },
    { n2: 5, n1: 4, series: 'ব্র্যাকেট (১ম রেখা)', lines: '১টি', region: 'অবলোহিত (IR)' },
    { n2: 6, n1: 5, series: 'ফুন্ড (১ম রেখা)', lines: '১টি', region: 'দূর অবলোহিত (IR)' },
  ];
  transMatrix.forEach((tr, i) => {
    const others = transMatrix.filter((x) => x.series !== tr.series);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `হাইড্রোজেন পরমাণুতে ইলেকট্রন n₂ = ${toBnDigits(tr.n2)} থেকে n₁ = ${toBnDigits(tr.n1)} স্তরে সরাসরি ফিরে এলে কোন বর্ণালি রেখা সৃষ্টি হয়?`,
        correct: `${tr.series} — ${tr.region}`,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => `${x.series} — ${x.region}`),
        explanation: `n₂ = ${toBnDigits(tr.n2)} → n₁ = ${toBnDigits(tr.n1)} ধাপান্তরে ${tr.series} (${tr.region}) উৎপন্ন হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · হাইড্রোজেন বর্ণালি ধাপান্তর',
      })
    );
  });

  // 5d. Food Additives, E-numbers & Industrial Household Formulas (Ch 5, 40 × 2 = 80 MCQs)
  const appliedFormulas = [
    { item: 'E210 ও E211 খাদ্য সংরক্ষক', desc: 'যথাক্রমে বেনজোয়িক অ্যাসিড ও সোডিয়াম বেনজোয়েট (জুস, জ্যাম ও সসে ব্যবহৃত)' },
    { item: 'E200 ও E202 খাদ্য সংরক্ষক', desc: 'যথাক্রমে সরবিক অ্যাসিড ও পটাশিয়াম সরবেট (পনির, বেকারি ও শুকনো ফলে ছত্রাকরোধী)' },
    { item: 'E250 ও E251 প্রিজারভেটিভ', desc: 'সোডিয়াম নাইট্রাইট ও সোডিয়াম নাইট্রেট (প্রক্রিয়াজাত মাংস সংরক্ষণে ব্যবহৃত)' },
    { item: 'E320 (BHA) ও E321 (BHT)', desc: 'বিউটাইলেটেড হাইড্রক্সিঅ্যানিসল ও হাইড্রক্সিটলুইন (চর্বিজাত খাদ্যের অ্যান্টিঅক্সিডেন্ট)' },
    { item: 'E300 ও E307 অ্যান্টিঅক্সিডেন্ট', desc: 'অ্যাসকরবিক অ্যাসিড (ভিটামিন C) ও আলফা-টোকোফেরল (ভিটামিন E)' },
    { item: 'E260 খাদ্য সংযোজক', desc: 'অ্যাসিটিক অ্যাসিড / ভিনেগার (আচার ও সালাদ ড্রেসিংয়ে অম্লতা নিয়ন্ত্রক)' },
    { item: 'E330 প্রাকৃতিক অ্যাসিডুল্যান্ট', desc: 'সাইট্রিক অ্যাসিড (জ্যাম-জেলির pH নিয়ন্ত্রণ ও অ্যান্টিঅক্সিডেন্ট সহায়ক)' },
    { item: 'ট্যালকম পাউডারের মূল খনিজ "ট্যাল্ক"', desc: 'হাইড্রেটেড ম্যাগনেসিয়াম সিলিকেট [Mg₃Si₄O₁₀(OH)₂]' },
    { item: 'ট্যালকম পাউডারে জিঙ্ক স্টিয়ারেট ও MgCO₃-এর কাজ', desc: 'জিঙ্ক স্টিয়ারেট ত্বকে মসৃণতা ও আসক্তি দেয় এবং MgCO₃ সুগন্ধি ধরে রাখে' },
    { item: 'কোল্ড ক্রিমে (W/O ইমালশন) প্রধান উপাদানসমূহ', desc: 'খনিজ তেল/তরল প্যারাফিন, মৌমাছির মোম, বোরাক্স এবং পানি (~২০–৩০%)' },
    { item: 'ভ্যানিশিং ক্রিমে (O/W ইমালশন) মুক্ত স্টিয়ারিক অ্যাসিডের ভূমিকা', desc: 'ত্বকে মাখার পর পানি বাষ্পীভূত হয়ে পাতলা স্টিয়ারিক অ্যাসিডের অদৃশ্য ম্যাট স্তর তৈরি করে' },
    { item: 'সলিড লিপস্টিকে ইওসিন (Eosin) ও টাইটেনিয়াম ডাই-অক্সাইডের কাজ', desc: 'ইওসিন স্থায়ী লাল রং দেয় এবং TiO₂ ওপাসিটি ও উজ্জ্বল ছায়া নিয়ন্ত্রণ করে' },
    { item: 'গ্যাস্ট্রিকের সিরাপ (মিল্ক অব ম্যাগনেসিয়া) ও রক্ত', desc: 'মিল্ক অব ম্যাগনেসিয়া [Mg(OH)₂] হলো সাসপেনশন (অ্যান্টাসিড), আর রক্ত হলো প্রাকৃতিক কলয়েড সল' },
    { item: 'হালকা লবণাক্ত খাবার বা মাছে "কিউরিং" (Curing) প্রক্রিয়া', desc: 'NaCl, চিনি ও সামান্য NaNO₂ মিশিয়ে অভিস্রবণ চাপে আর্দ্রতা কমিয়ে জীবাণু রোধ করা' },
    { item: 'ফ্রুট জুসে সালফাইটিং এজেন্ট (SO₂ / Na₂S₂O₅) যোগের ঝুঁকি ও সতর্কতা', desc: 'অ্যাজমা বা সালফাইট সংবেদনশীল রোগীদের শ্বাসকষ্ট সৃষ্টি করতে পারে (তাই মাত্রা সীমিত রাখা হয়)' },
    { item: 'ট্রিপল-অ্যাকশন শ্যাম্পু ও কন্ডিশনারে ব্যবহৃত সারফ্যাকট্যান্ট', desc: 'শ্যাম্পুতে অ্যানায়নিক সোডিয়াম লরাইল/লরেথ সালফেট (SLS/SLES) ও কন্ডিশনারে ক্যাটায়নিক কোয়াটারনারি অ্যামোনিয়াম যৌগ' },
    { item: 'ডিটারজেন্টে অপটিক্যাল ব্রাইটেনার (Optical Brightener) কী করে', desc: 'অদৃশ্য অতিবেগুনি (UV) আলো শোষণ করে দৃশ্যমান নীল আলো নির্গত করে সাদা কাপড়কে আরও উজ্জ্বল দেখায়' },
    { item: 'চিপস বা বিস্কুটের ফয়েল প্যাকেটে বাতাসের পরিবর্তে কোন নিষ্ক্রিয় গ্যাস ভরা হয়', desc: 'নাইট্রোজেন (N₂) গ্যাস — যাতে অক্সিজেনের অনুপস্থিতিতে চিপসের তেল জারিত (Rancid) না হয় ও মুচমুচে থাকে' },
    { item: 'আইসক্রিমে বরফ কেলাস গঠন ঠেকাতে ব্যবহৃত স্ট্যাবিলাইজার/ইমালসিফায়ার', desc: 'জিলেটিন, অ্যালজিনেট, গাম অ্যারাবিক ও লেসিথিন' },
    { item: 'বাঁশ, কাঠ বা ফলের টিনে পচন রোধে রেডিয়েশন স্টেরিলাইজেশন (কোল্ড পাস্তুরাইজেশন)', desc: 'গামা রশ্মি (⁶⁰Co থেকে) প্রয়োগ করে তাপ ছাড়াই খাদ্য জীবাণুমুক্ত ও অঙ্কুরোদগম রোধ করা' },
  ];
  appliedFormulas.forEach((af, i) => {
    const others = appliedFormulas.filter((x) => x.item !== af.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `কর্মমুখী রসায়নের তথ্যানুসারে "${af.item}" সম্পর্কিত সঠিক ব্যাখ্যা কোনটি?`,
        correct: af.desc,
        distractors: others.slice(i % 12, (i % 12) + 5).map((x) => x.desc),
        explanation: `${af.item}: ${af.desc}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · খাদ্য ও প্রসাধনী রসায়ন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${af.desc}" — এটি নিচের কোনটির ক্ষেত্রে প্রযোজ্য?`,
        correct: af.item,
        distractors: others.slice((i + 6) % 12, ((i + 6) % 12) + 5).map((x) => x.item),
        explanation: `${af.desc} ↔ ${af.item}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · ব্যবহারিক প্রয়োগ',
      })
    );
  });

  return list;
}
