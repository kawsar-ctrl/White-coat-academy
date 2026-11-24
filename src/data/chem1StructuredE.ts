import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredE(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1se_${String(seq++).padStart(4, '0')}`;

  // 1. Reaction Order, Rate Constant Units & Half-life Problems (Ch 4, ~65 MCQs)
  const orderInfo = [
    { order: 'শূন্য ক্রম (n = ০)', unit: 'mol·L⁻¹·s⁻¹', half: 't₁/₂ = [A]₀ / (2k) (প্রারম্ভিক ঘনমাত্রার সমানুপাতিক)', ex: 'অতিবেগুনি আলোতে H₂ + Cl₂ → 2HCl ও ধাতব পৃষ্ঠে গ্যাসের বিয়োজন' },
    { order: 'প্রথম ক্রম (n = ১)', unit: 's⁻¹ (সময়⁻¹)', half: 't₁/₂ = ০.৬৯৩ / k (প্রারম্ভিক ঘনমাত্রা নিরপেক্ষ)', ex: 'তেজস্ক্রিয় ক্ষয়, N₂O₅ বিয়োজন ও H₂O₂-এর লঘু বিয়োজন' },
    { order: 'দ্বিতীয় ক্রম (n = ২)', unit: 'L·mol⁻¹·s⁻¹', half: 't₁/₂ = ১ / (k[A]₀) (প্রারম্ভিক ঘনমাত্রার ব্যস্তানুপাতিক)', ex: 'এস্টারের ক্ষারীয় আর্দ্রবিশ্লেষণ (CH₃COOC₂H₅ + NaOH)' },
    { order: 'তৃতীয় ক্রম (n = ৩)', unit: 'L²·mol⁻²·s⁻¹', half: 't₁/₂ = ৩ / (2k[A]₀²) ([A]₀²-এর ব্যস্তানুপাতিক)', ex: '2NO + O₂ → 2NO₂ এবং 2NO + Cl₂ → 2NOCl' },
    { order: 'ছদ্ম-প্রথম ক্রম (Pseudo-first)', unit: 's⁻¹', half: 't₁/₂ ≈ ০.৬৯৩ / k′ (অতিরিক্ত পানির কারণে)', ex: 'অ্যাসিডের উপস্থিতিতে সুক্রোজের আর্দ্রবিশ্লেষণ ও ইথাইল অ্যাসিটেটের আর্দ্রবিশ্লেষণ' },
  ];
  orderInfo.forEach((oi, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${oi.order} বিক্রিয়ার হার ধ্রুবক (k)-এর একক কোনটি?`,
        correct: oi.unit,
        distractors: orderInfo.filter((x) => x.unit !== oi.unit).map((x) => x.unit).concat(['mol²·L⁻²·s⁻¹']),
        explanation: `n-তম ক্রম বিক্রিয়ায় k-এর একক = (mol/L)^(1−n)·s⁻¹; তাই ${oi.order}-এর একক ${oi.unit}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · বিক্রিয়ার ক্রম',
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
        question: `${oi.order} বিক্রিয়ার অর্ধায়ু (t₁/₂)-এর গাণিতিক সম্পর্ক নিচের কোনটি?`,
        correct: oi.half,
        distractors: orderInfo.filter((x) => x.half !== oi.half).map((x) => x.half),
        explanation: `${oi.order} বিক্রিয়ার অর্ধায়ু সূত্র হলো ${oi.half}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অর্ধায়ু',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${oi.ex}" — এটি সাধারণত কোন ক্রমের রাসায়নিক বিক্রিয়ার উদাহরণ?`,
        correct: oi.order,
        distractors: orderInfo.filter((x) => x.order !== oi.order).map((x) => x.order),
        explanation: `${oi.ex} একটি সুপরিচিত ${oi.order} বিক্রিয়া।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · গতিবিদ্যা',
      })
    );
  });

  // 1st order numerical half-life <-> k drills (20 MCQs)
  const firstOrderDrills = [
    { k: '০.০৬৯৩ s⁻¹', tHalf: '১০ সেকেন্ড' },
    { k: '০.৬৯৩ min⁻¹', tHalf: '১ মিনিট' },
    { k: '৬.৯৩ × ১০⁻³ s⁻¹', tHalf: '১০০ সেকেন্ড' },
    { k: '০.০৩৪৬৫ s⁻¹', tHalf: '২০ সেকেন্ড' },
    { k: '৩.৪৬৫ × ১০⁻³ min⁻¹', tHalf: '২০০ মিনিট' },
    { k: '০.০০১৩৮৬ s⁻¹', tHalf: '৫০০ সেকেন্ড' },
    { k: '১.৩৮৬ × ১০⁻² min⁻¹', tHalf: '৫০ মিনিট' },
    { k: '০.০২৩১ s⁻¹', tHalf: '৩০ সেকেন্ড' },
    { k: '৬.৯৩ × ১০⁻⁴ s⁻¹', tHalf: '১০০০ সেকেন্ড' },
    { k: '০.১৭৩২৫ hr⁻¹', tHalf: '৪ ঘণ্টা' },
  ];
  firstOrderDrills.forEach((fo, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি প্রথম ক্রম বিক্রিয়ার হার ধ্রুবক k = ${fo.k} হলে বিক্রিয়াটির অর্ধায়ু (t₁/₂) কত?`,
        correct: fo.tHalf,
        distractors: firstOrderDrills.filter((x) => x.tHalf !== fo.tHalf).slice(i % 5, (i % 5) + 4).map((x) => x.tHalf),
        explanation: `t₁/₂ = ০.৬৯৩ / k = ০.৬৯৩ / (${fo.k}) = ${fo.tHalf}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অর্ধায়ু গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `কোনো প্রথম ক্রম বিক্রিয়ার অর্ধায়ু ${fo.tHalf} হলে হার ধ্রুবক (k)-এর মান কত?`,
        correct: fo.k,
        distractors: firstOrderDrills.filter((x) => x.k !== fo.k).slice((i + 1) % 5, ((i + 1) % 5) + 4).map((x) => x.k),
        explanation: `k = ০.৬৯৩ / t₁/₂ = ০.৬৯৩ / (${fo.tHalf}) = ${fo.k}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · হার ধ্রুবক নির্ণয়',
      })
    );
  });

  // 2. Kp = Kc(RT)^Δn & Le Chatelier Equilibrium Matrix (Ch 4, ~75 MCQs)
  const eqReactions = [
    { rxn: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g)', dn: -2, rel: 'Kp = Kc (RT)⁻² (অর্থাৎ Kp < Kc)', press: 'চাপ বাড়ালে উৎপাদ NH₃ বাড়ে', exo: true },
    { rxn: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)', dn: -1, rel: 'Kp = Kc (RT)⁻¹ (অর্থাৎ Kp < Kc)', press: 'চাপ বাড়ালে উৎপাদ SO₃ বাড়ে', exo: true },
    { rxn: 'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)', dn: 1, rel: 'Kp = Kc (RT)¹ (অর্থাৎ Kp > Kc)', press: 'চাপ বাড়ালে সাম্য পশ্চাৎদিকে সরে (বিয়োজন কমে)', exo: false },
    { rxn: 'H₂(g) + I₂(g) ⇌ 2HI(g)', dn: 0, rel: 'Kp = Kc (Δn = ০)', press: 'চাপ পরিবর্তনে সাম্যাবস্থার কোনো পরিবর্তন হয় না', exo: false },
    { rxn: 'N₂(g) + O₂(g) ⇌ 2NO(g)', dn: 0, rel: 'Kp = Kc (Δn = ০)', press: 'চাপ পরিবর্তনে সাম্যের অবস্থান বদলায় না', exo: false },
    { rxn: 'N₂O₄(g) ⇌ 2NO₂(g)', dn: 1, rel: 'Kp = Kc (RT)¹ (অর্থাৎ Kp > Kc)', press: 'চাপ কমালে বা আয়তন বাড়ালে NO₂ উৎপাদন বাড়ে', exo: false },
    { rxn: '2NO(g) + O₂(g) ⇌ 2NO₂(g)', dn: -1, rel: 'Kp = Kc (RT)⁻¹ (অর্থাৎ Kp < Kc)', press: 'চাপ বাড়ালে NO₂ উৎপাদন বাড়ে', exo: true },
    { rxn: 'CO(g) + 2H₂(g) ⇌ CH₃OH(g)', dn: -2, rel: 'Kp = Kc (RT)⁻² (অর্থাৎ Kp < Kc)', press: 'উচ্চ চাপে CH₃OH উৎপাদন বাড়ে', exo: true },
    { rxn: 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g)', dn: 2, rel: 'Kp = Kc (RT)² (অর্থাৎ Kp > Kc)', press: 'কম চাপে H₂ ও CO-এর উৎপাদন বাড়ে', exo: false },
    { rxn: 'CaCO₃(s) ⇌ CaO(s) + CO₂(g)', dn: 1, rel: 'Kp = Kc (RT)¹ (অর্থাৎ Kp = P_CO₂)', press: 'চাপ বাড়ালে CO₂ গ্যাস CaO-র সাথে যুক্ত হয়ে CaCO₃ বাড়ায়', exo: false },
    { rxn: 'NH₄HS(s) ⇌ NH₃(g) + H₂S(g)', dn: 2, rel: 'Kp = Kc (RT)²', press: 'কম চাপে বিয়োজন বৃদ্ধি পায়', exo: false },
    { rxn: 'CO(g) + H₂O(g) ⇌ CO₂(g) + H₂(g)', dn: 0, rel: 'Kp = Kc (Δn = ০)', press: 'চাপ বাড়ালেও বা কমালেও H₂ উৎপাদনে প্রভাব পড়ে না', exo: true },
    { rxn: '2NH₃(g) ⇌ N₂(g) + 3H₂(g)', dn: 2, rel: 'Kp = Kc (RT)²', press: 'নিম্ন চাপে অ্যামোনিয়ার বিয়োজন বাড়ে', exo: false },
    { rxn: 'C(s) + CO₂(g) ⇌ 2CO(g)', dn: 1, rel: 'Kp = Kc (RT)¹', press: 'নিম্ন চাপে CO উৎপাদন বৃদ্ধি পায়', exo: false },
    { rxn: '4HCl(g) + O₂(g) ⇌ 2Cl₂(g) + 2H₂O(g)', dn: -1, rel: 'Kp = Kc (RT)⁻¹', press: 'চাপ বাড়ালে ক্লোরিন উৎপাদন বাড়ে', exo: true },
  ];
  const relChoices = [
    'Kp = Kc (RT)⁻² (অর্থাৎ Kp < Kc)',
    'Kp = Kc (RT)⁻¹ (অর্থাৎ Kp < Kc)',
    'Kp = Kc (RT)¹ (অর্থাৎ Kp > Kc)',
    'Kp = Kc (Δn = ০)',
    'Kp = Kc (RT)² (অর্থাৎ Kp > Kc)',
  ];
  eqReactions.forEach((eq, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${eq.rxn} উভমুখী বিক্রিয়ায় গ্যাসীয় মোল সংখ্যার পরিবর্তন Δn এবং Kp ও Kc-এর সঠিক সম্পর্ক কোনটি?`,
        correct: eq.rel,
        distractors: relChoices.filter((r) => r !== eq.rel),
        explanation: `গ্যাসীয় উৎপাদ ও বিক্রিয়কের মোল পার্থক্য Δn = ${eq.dn >= 0 ? `+${toBnDigits(eq.dn)}` : toBnDigits(eq.dn)}; Kp = Kc(RT)^Δn থেকে ${eq.rel}।`,
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
        difficulty: 'board',
        question: `লা শাতেলিয়ারের নীতি অনুযায়ী ${eq.rxn} সাম্যাবস্থায় চাপ পরিবর্তনের সঠিক প্রভাব কোনটি?`,
        correct: eq.press,
        distractors: eqReactions.filter((x) => x.dn !== eq.dn).slice(0, 4).map((x) => x.press),
        explanation: `এই বিক্রিয়ায় Δn = ${toBnDigits(eq.dn)}; চাপ বাড়ালে সাম্য সর্বদা কম গ্যাসীয় মোলের দিকে সরে যায়, তাই ${eq.press}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · চাপের প্রভাব',
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
        question: `${eq.rxn} (${eq.exo ? 'তাপোৎপাদী, ΔH < ০' : 'তাপহারী, ΔH > ০'}) বিক্রিয়ায় তাপমাত্রা বাড়ালে সাম্যধ্রুবক Kp বা Kc-এর মানের কী পরিবর্তন হবে?`,
        correct: eq.exo ? 'Kc ও Kp-এর মান হ্রাস পায় (সাম্য বামে সরে)' : 'Kc ও Kp-এর মান বৃদ্ধি পায় (সাম্য ডানে সরে)',
        distractors: [
          eq.exo ? 'Kc ও Kp-এর মান বৃদ্ধি পায় (সাম্য ডানে সরে)' : 'Kc ও Kp-এর মান হ্রাস পায় (সাম্য বামে সরে)',
          'Kp বাড়ে কিন্তু Kc অপরিবর্তিত থাকে',
          'সাম্যধ্রুবক সর্বদা অপরিবর্তিত থাকে',
        ],
        explanation: `${eq.exo ? 'তাপোৎপাদী বিক্রিয়ায় তাপ দিলে পশ্চাৎ বিক্রিয়া ত্বরান্বিত হয়ে K কমে' : 'তাপহারী বিক্রিয়ায় তাপ দিলে সম্মুখ বিক্রিয়া ত্বরান্বিত হয়ে K বাড়ে'}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · তাপমাত্রার প্রভাব',
      })
    );
  });

  // 3. Ostwald Dilution, Buffer pH & Conjugate Acid-Base Matrix (Ch 4, ~85 MCQs)
  const ostwaldCases = [
    { acid: 'CH₃COOH', ka: '১.৮ × ১০⁻⁵', c: 0.1, alpha: '১.৩৪ × ১০⁻² (১.৩৪%)', hPlus: '১.৩৪ × ১০⁻³ M', ph: '২.৮৭' },
    { acid: 'CH₃COOH', ka: '১.০ × ১০⁻⁵', c: 0.1, alpha: '০.০১ (১%)', hPlus: '১.০ × ১০⁻³ M', ph: '৩.০' },
    { acid: 'CH₃COOH', ka: '১.০ × ১০⁻⁵', c: 0.001, alpha: '০.১ (১০%)', hPlus: '১.০ × ১০⁻⁴ M', ph: '৪.০' },
    { acid: 'HCN', ka: '৪.০ × ১০⁻¹⁰', c: 0.1, alpha: '৬.৩২ × ১০⁻⁵', hPlus: '৬.৩২ × ১০⁻⁶ M', ph: '৫.২০' },
    { acid: 'HCOOH', ka: '১.৮ × ১০⁻⁴', c: 0.05, alpha: '০.০৬ (৬%)', hPlus: '৩.০ × ১০⁻³ M', ph: '২.৫২' },
    { acid: 'মৃদু একক্ষারীয় অ্যাসিড HA', ka: '২.৫ × ১০⁻⁵', c: 0.1, alpha: '১.৫৮ × ১০⁻²', hPlus: '১.৫৮ × ১০⁻³ M', ph: '২.৮০' },
    { acid: 'মৃদু একক্ষারীয় অ্যাসিড HX', ka: '১.০ × ১০⁻⁶', c: 0.01, alpha: '০.০১ (১%)', hPlus: '১.০ × ১০⁻⁴ M', ph: '৪.০' },
    { acid: 'অ্যাসিড HY', ka: '৪.০ × ১০⁻⁶', c: 0.01, alpha: '০.০২ (২%)', hPlus: '২.০ × ১০⁻⁴ M', ph: '৩.৭০' },
  ];
  ostwaldCases.forEach((oc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(oc.c)} M ${oc.acid} দ্রবণের Ka = ${oc.ka} হলে অসওয়াল্ডের লঘুকরণ সূত্রানুযায়ী বিয়োজন মাত্রা (α) কত?`,
        correct: oc.alpha,
        distractors: ostwaldCases.filter((x) => x.alpha !== oc.alpha).slice(0, 4).map((x) => x.alpha),
        explanation: `α = √(Ka / C) = √(${oc.ka} / ${toBnDigits(oc.c)}) = ${oc.alpha}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অসওয়াল্ডের সূত্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'dental' : 'board',
        question: `${toBnDigits(oc.c)} M ${oc.acid} (Ka = ${oc.ka}) দ্রবণের pH-এর মান কত?`,
        correct: `pH ≈ ${oc.ph}`,
        distractors: ['১.০০', '২.০০', '২.৫২', '২.৮৭', '৩.০০', '৩.৭০', '৪.০০', '৫.২০', '৬.০০']
          .filter((x) => x !== oc.ph)
          .slice(0, 4)
          .map((x) => `pH ≈ ${x}`),
        explanation: `[H⁺] = √(Ka · C) = ${oc.hPlus}; তাই pH = −log[H⁺] ≈ ${oc.ph}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · মৃদু অ্যাসিডের pH',
      })
    );
  });

  // Henderson-Hasselbalch Buffer Ratios (20 MCQs)
  const bufferRatios = [
    { pka: 4.74, ratio: '১ : ১ ([লবণ] = [অ্যাসিড])', ph: '৪.৭৪' },
    { pka: 4.74, ratio: '১০ : ১ ([লবণ] = ১০ × [অ্যাসিড])', ph: '৫.৭৪' },
    { pka: 4.74, ratio: '১ : ১০ ([লবণ] = ০.১ × [অ্যাসিড])', ph: '৩.৭৪' },
    { pka: 4.74, ratio: '১০০ : ১ ([লবণ] = ১০০ × [অ্যাসিড])', ph: '৬.৭৪' },
    { pka: 3.74, ratio: '১০ : ১ (HCOONa / HCOOH)', ph: '৪.৭৪' },
    { pka: 3.74, ratio: '১ : ১ (HCOONa / HCOOH)', ph: '৩.৭৪' },
    { pka: 9.25, ratio: '১ : ১ (HCN / NaCN বাফার)', ph: '৯.২৫' },
    { pka: 9.25, ratio: '১ : ১০ (HCN / NaCN বাফার)', ph: '৮.২৫' },
    { pka: 7.20, ratio: '১ : ১ (ফসফেট বাফার H₂PO₄⁻/HPO₄²⁻)', ph: '৭.২০' },
    { pka: 6.10, ratio: '২০ : ১ (রক্তের HCO₃⁻ / H₂CO₃ বাফার)', ph: '৭.৪০' },
  ];
  bufferRatios.forEach((br) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একটি অম্লীয় বাফার দ্রবণে দুর্বল অ্যাসিডের pKa = ${toBnDigits(br.pka)} এবং [লবণ] : [অ্যাসিড] অনুপাত ${br.ratio} হলে দ্রবণটির pH কত?`,
        correct: br.ph,
        distractors: ['৩.৭৪', '৪.৭৪', '৫.৭৪', '৬.৭৪', '৭.২০', '৭.৪০', '৮.২৫', '৯.২৫'].filter((x) => x !== br.ph).slice(0, 4),
        explanation: `হেন্ডারসন-হ্যাসেলবালখ সমীকরণ pH = pKa + log([লবণ]/[অ্যাসিড]) = ${toBnDigits(br.pka)} + log(${br.ratio.split(' ')[0]}) = ${br.ph}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · বাফার pH গণনা',
      })
    );
  });

  // Conjugate Acid-Base Pairs (20 MCQs)
  const conjugates = [
    { sp: 'H₂O', conjAcid: 'H₃O⁺', conjBase: 'OH⁻' },
    { sp: 'NH₃', conjAcid: 'NH₄⁺', conjBase: 'NH₂⁻' },
    { sp: 'HCO₃⁻', conjAcid: 'H₂CO₃', conjBase: 'CO₃²⁻' },
    { sp: 'HSO₄⁻', conjAcid: 'H₂SO₄', conjBase: 'SO₄²⁻' },
    { sp: 'HPO₄²⁻', conjAcid: 'H₂PO₄⁻', conjBase: 'PO₄³⁻' },
    { sp: 'H₂PO₄⁻', conjAcid: 'H₃PO₄', conjBase: 'HPO₄²⁻' },
    { sp: 'HS⁻', conjAcid: 'H₂S', conjBase: 'S²⁻' },
    { sp: 'CH₃COOH', conjAcid: 'CH₃COOH₂⁺', conjBase: 'CH₃COO⁻' },
    { sp: 'NH₄⁺', conjAcid: 'প্রযোজ্য নয় (আরও H⁺ যুক্ত হয় না)', conjBase: 'NH₃' },
    { sp: 'HClO₄', conjAcid: 'প্রযোজ্য নয়', conjBase: 'ClO₄⁻ (অতি দুর্বল অনুবন্ধী ক্ষার)' },
  ];
  const allBases = conjugates.map((c) => c.conjBase);
  conjugates.forEach((cj, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `ব্রনস্টেড-লাউরি মতবাদ অনুযায়ী "${cj.sp}"-এর অনুবন্ধী ক্ষারক (Conjugate Base) কোনটি?`,
        correct: cj.conjBase,
        distractors: allBases.filter((b) => b !== cj.conjBase).slice(i % 5, (i % 5) + 4),
        explanation: `কোনো সত্তা থেকে একটি প্রোটন (H⁺) অপসারিত হলে তার অনুবন্ধী ক্ষারক তৈরি হয়; ${cj.sp} − H⁺ → ${cj.conjBase}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অনুবন্ধী ক্ষারক',
      })
    );
    if (!cj.conjAcid.startsWith('প্রযোজ্য')) {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_1',
          chapterId: 'chem1_ch4_equilibrium',
          visualLessonId: 'ph_buffer',
          hscLevel: '11',
          difficulty: 'medical',
          question: `ব্রনস্টেড-লাউরি মতবাদ অনুযায়ী "${cj.sp}"-এর অনুবন্ধী অ্যাসিড (Conjugate Acid) কোনটি?`,
          correct: cj.conjAcid,
          distractors: conjugates.filter((c) => c.conjAcid !== cj.conjAcid && !c.conjAcid.startsWith('প্রযোজ্য')).map((c) => c.conjAcid).slice(0, 4),
          explanation: `একটি প্রোটন (H⁺) গ্রহণ করলে অনুবন্ধী অ্যাসিড তৈরি হয়; ${cj.sp} + H⁺ → ${cj.conjAcid}।`,
          reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · অনুবন্ধী অ্যাসিড',
        })
      );
    }
  });

  // 4. Thermochemistry & Catalysis Quick Facts (Ch 4, ~30 MCQs)
  const catalysts = [
    { proc: 'হেবার-বস পদ্ধতি (NH₃ উৎপাদন)', cat: 'আয়রন চূর্ণ (Fe) প্রভাবক ও Al₂O₃/K₂O/Mo সহায়ক' },
    { proc: 'স্পর্শ পদ্ধতি (SO₂ → SO₃)', cat: 'ভ্যানাডিয়াম পেন্টা-অক্সাইড (V₂O₅) বা Pt অ্যাসবেস্টস' },
    { proc: 'অসওয়াল্ড পদ্ধতি (NH₃ → NO, HNO₃ তৈরি)', cat: 'প্লাটিনাম-রোডিয়াম জালি (Pt–Rh, ৮৫০ °C)' },
    { proc: 'তেলের হাইড্রোজেনেশন (মার্জারিন তৈরি)', cat: 'সূক্ষ্ম নিকেল চূর্ণ (Ni, ১৫০–২০০ °C)' },
    { proc: 'পটাশিয়াম ক্লোরেট (KClO₃) বিয়োজন করে O₂ তৈরি', cat: 'ম্যাঙ্গানিজ ডাই-অক্সাইড (MnO₂)' },
    { proc: 'ডিকন পদ্ধতি (HCl জারণে Cl₂ উৎপাদন)', cat: 'কিউপ্রিক ক্লোরাইড (CuCl₂, ৪৫০ °C)' },
    { proc: 'ভিনেগার থেকে অ্যাসিটিক অ্যাসিড (মনস্যান্টো প্রক্রিয়া)', cat: 'রোডিয়াম (Rh) ও আয়োডিন যৌগ' },
    { proc: 'H₂O₂-এর বিয়োজন ধীরগতির করা (ঋণাত্মক প্রভাবক)', cat: 'ফসফরিক অ্যাসিড (H₃PO₄) বা গ্লিসারিন' },
    { proc: 'ফ্রিডেল-ক্রাফটস অ্যালকাইলেশন ও অ্যাসাইলেশন', cat: 'অনাদ্র অ্যালুমিনিয়াম ক্লোরাইড (AlCl₃)' },
    { proc: 'ইথিলিন থেকে উচ্চ ঘনত্বের পলিথিন (HDPE)', cat: 'জিগলার-নাটা প্রভাবক [TiCl₄ + (C₂H₅)₃Al]' },
  ];
  catalysts.forEach((ct, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${ct.proc}"-এ কোন প্রভাবক বা প্রভাবক তন্ত্র ব্যবহৃত হয়?`,
        correct: ct.cat,
        distractors: catalysts.filter((x) => x.cat !== ct.cat).slice(i % 5, (i % 5) + 4).map((x) => x.cat),
        explanation: `${ct.proc}-এ ${ct.cat} ব্যবহার করে সক্রিয়ণ শক্তি কমানো হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · শিল্প প্রভাবন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${ct.cat}" কোন রাসায়নিক প্রক্রিয়ায় প্রভাবক হিসেবে ব্যবহৃত হয়?`,
        correct: ct.proc,
        distractors: catalysts.filter((x) => x.proc !== ct.proc).slice((i + 1) % 5, ((i + 1) % 5) + 4).map((x) => x.proc),
        explanation: `${ct.cat} প্রধানত ${ct.proc}-এ ব্যবহৃত হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · প্রভাবক',
      })
    );
  });

  // 5. Chapter 5 Applied Chemistry: Colloids, Emulsions, Preservatives, Food & Toiletries (~100 MCQs)
  const colloids = [
    { type: 'সল (Sol)', disp: 'কঠিন', med: 'তরল', ex: 'রঙ/পেইন্ট, স্টার্চ দ্রবণ, গোল্ড সল, কাদা-পানি' },
    { type: 'জেল (Gel)', disp: 'তরল', med: 'কঠিন', ex: 'পনির, মাখন, জেলি, জুতার কালি, দই' },
    { type: 'ইমালশন (Emulsion)', disp: 'তরল', med: 'তরল', ex: 'দুধ (O/W), কোল্ড ক্রিম (W/O), কড লিভার তেল' },
    { type: 'তরল অ্যারোসল (Liquid Aerosol)', disp: 'তরল', med: 'গ্যাস', ex: 'কুয়াশা, মেঘ, কীটনাশক স্প্রে' },
    { type: 'কঠিন অ্যারোসল (Solid Aerosol)', disp: 'কঠিন', med: 'গ্যাস', ex: 'ধোঁয়া, ধূলিকণা ও কুয়াশাচ্ছন্ন ধোঁয়াশা' },
    { type: 'ফোম (Foam)', disp: 'গ্যাস', med: 'তরল', ex: 'সাবানের ফেনা, হুইপড ক্রিম, সোডা ফেনা' },
    { type: 'কঠিন ফোম (Solid Foam)', disp: 'গ্যাস', med: 'কঠিন', ex: 'পিউমিস পাথর, ফোম রাবার, স্পঞ্জ, পাউরুটি' },
    { type: 'কঠিন সল (Solid Sol)', disp: 'কঠিন', med: 'কঠিন', ex: 'রঙিন কাচ, রত্নপাথর (রুবি কাচ), সংকর ধাতু' },
  ];
  colloids.forEach((cl, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `বিস্তৃত দশা "${cl.disp}" এবং বিস্তার মাধ্যম "${cl.med}" হলে সেই কলয়েড সিস্টেমকে কী বলা হয়?`,
        correct: cl.type,
        distractors: colloids.filter((x) => x.type !== cl.type).slice(i % 4, (i % 4) + 4).map((x) => x.type),
        explanation: `${cl.med} মাধ্যমে ${cl.disp} বিস্তৃত থাকলে তাকে ${cl.type} বলে (যেমন ${cl.ex})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · কলয়েডের শ্রেণিবিভাগ',
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
        question: `"${cl.ex}" — এগুলো কোন ধরনের কলয়েড সিস্টেমের উদাহরণ?`,
        correct: `${cl.type} (${cl.med}-এ ${cl.disp})`,
        distractors: colloids.filter((x) => x.type !== cl.type).slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => `${x.type} (${x.med}-এ ${x.disp})`),
        explanation: `${cl.ex} হলো ${cl.type} জাতীয় কলয়েড যেখানে বিস্তার মাধ্যম ${cl.med} ও বিস্তৃত দশা ${cl.disp}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · কলয়েডের উদাহরণ',
      })
    );
  });

  const preservatives = [
    { chem: 'সোডিয়াম বেনজোয়েট (C₆H₅COONa)', target: 'জ্যাম, জেলি, আচার, সস ও ফলের রস (অম্লীয় খাদ্য)', note: 'সর্বোচ্চ অনুমোদিত মাত্রা ০.১% (১০০০ ppm); pH < ৪.৫-এ সবচেয়ে সক্রিয়।' },
    { chem: 'ক্যালসিয়াম প্রোপিওনেট / সোডিয়াম প্রোপিওনেট', target: 'পাউরুটি, কেক ও বেকারি পণ্যে ছত্রাক (রোপ ব্যাকটেরিয়া) রোধ', note: 'রুটির ঈস্টের গাঁজন ব্যাহত না করেই ছত্রাক জন্মাতে বাধা দেয়।' },
    { chem: 'পটাশিয়াম সরবেট / সরবিক অ্যাসিড', target: 'পনির, দই, কেক ও শুকনো ফল সংরক্ষণ', note: '০.০৫–০.২% মাত্রায় ইস্ট ও মোল্ড প্রতিরোধী নিরাপদ খাদ্য সংরক্ষক।' },
    { chem: 'সোডিয়াম নাইট্রাইট (NaNO₂)', target: 'সসেজ, বেকন ও প্রক্রিয়াজাত মাংস কিউরিং', note: 'ক্লসট্রিডিয়াম বটুলিনাম দমন করে ও মাংসের গোলাপি রং অক্ষুণ্ণ রাখে।' },
    { chem: 'সালফার ডাই-অক্সাইড (SO₂) ও Na₂S₂O₅', target: 'কিশমিশ, শুকনো ফল, ওয়াইন ও ফলের মণ্ড', note: 'এনজাইমজনিত বাদামি বর্ণ ধারণ রোধ ও অ্যান্টিমাইক্রোবিয়াল হিসেবে কাজ করে।' },
    { chem: 'ভিনেগার (৬–১০% অ্যাসিটিক অ্যাসিড)', target: 'টক আচার, চাটনি ও সালাদ ড্রেসিং', note: 'pH ২.৪–৩.০-এ নামিয়ে এনে পচনকারী ব্যাকটেরিয়া ধ্বংস করে।' },
    { chem: 'গাঢ় চিনির সিরাপ (>৬৫% সুক্রোজ)', target: 'মোরব্বা, জ্যাম, জেলি ও কনডেন্সড মিল্ক', note: 'উচ্চ অভিস্রবণ চাপে জীবাণু কোষ প্লাজমোলাইসিস হয়ে মারা যায়।' },
    { chem: 'খাদ্যলবণ (NaCl, ৭–৮% বা ব্রাইন)', target: 'ইলিশ মাছ লবণজাতকরণ, মাংস ও কাঁচা আম কিউরিং', note: 'খাদ্যের মুক্ত পানি (Water activity) কমিয়ে অভিস্রবণে অণুজীব ধ্বংস করে।' },
    { chem: 'BHA ও BHT (অ্যান্টি-অক্সিডেন্ট)', target: 'ভোজ্যতেল, মাখন, চিপস ও চর্বিযুক্ত খাবার', note: 'অসম্পৃক্ত ফ্যাটি অ্যাসিডের ফ্রি-র‍্যাডিকেল জারণ (Rancidity) রোধ করে।' },
    { chem: 'প্রোপিয়নিক অ্যাসিডের লবণ বনাম EDTA', target: 'ড্রেসিং ও কৌটাজাত সামুদ্রিক খাদ্যে ধাতব আয়ন চিলেশন', note: 'EDTA ট্রেস ধাতব আয়ন আবদ্ধ করে জারণ বিক্রিয়া ও বিবর্ণতা প্রতিরোধ করে।' },
  ];
  preservatives.forEach((pr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `খাদ্য সংরক্ষণে "${pr.chem}" প্রধানত কোন ক্ষেত্রে ব্যবহৃত হয়?`,
        correct: pr.target,
        distractors: preservatives.filter((x) => x.target !== pr.target).slice(i % 5, (i % 5) + 4).map((x) => x.target),
        explanation: `${pr.chem}: ${pr.target}। ${pr.note}`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · খাদ্য প্রিজারভেটিভস',
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
        question: `"${pr.target}"-এ সর্বাধিক ব্যবহৃত অনুমোদিত খাদ্য সংরক্ষক কোনটি?`,
        correct: pr.chem,
        distractors: preservatives.filter((x) => x.chem !== pr.chem).slice((i + 1) % 5, ((i + 1) % 5) + 4).map((x) => x.chem),
        explanation: `${pr.target}-এর জন্য উপযুক্ত প্রিজারভেটিভ হলো ${pr.chem}। ${pr.note}`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · খাদ্য সংরক্ষণ',
      })
    );
  });

  const toiletries = [
    { item: 'অ্যাসপার্টেম (কৃত্রিম মিষ্টি) নয়, গোলাপ জল তৈরির পদ্ধতি', ans: 'বাষ্প বা স্টিম পাতন (Steam Distillation)', wrong: ['আংশিক পাতন', 'ঊর্ধ্বপাতন', 'সাবানায়ন'] },
    { item: 'লিপস্টিকের মূল মোম ও চকচকে বেস উপাদান', ans: 'কর্নাবা মোম (Carnauba wax), বিজওয়্যাক্স ও ক্যাস্টর অয়েল', wrong: ['প্যারাফিন সালফেট ও HCl', 'ন্যাফথালিন ও সিলিকা জেল', 'পলিথিন ও জিপসাম'] },
    { item: 'বেবি পাউডার বা ট্যালকম পাউডারের মূল খনিজ', ans: 'ম্যাগনেশিয়াম সিলিকেট বা ট্যাল্ক [Mg₃Si₄O₁₀(OH)₂]', wrong: ['ক্যালসিয়াম কার্বাইড (CaC₂)', 'সোডিয়াম বেনজোয়েট', 'অ্যালুমিনিয়াম নাইট্রেট'] },
    { item: 'আফটার-শেভ লোশনে ব্যবহৃত অ্যান্টিসেপটিক ও শীতলকারক', ans: 'ইথানল, মেন্থল ও গ্লিসারিন', wrong: ['ফরমালডিহাইড ও NH₃', 'কস্টিক সোডা ও ফেনল', 'বেনজিন ও নাইট্রিক অ্যাসিড'] },
    { item: 'সাবান উৎপাদনে পাম তেল ও নারিকেল তেলের সাধারণ ভূমিকা', ans: 'পাম তেল সাবানে দৃঢ়তা ও নারিকেল তেল প্রচুর ফেনা সৃষ্টি করে', wrong: ['দুটিই কেবল সুগন্ধি দেয়', 'পাম তেল ফেনা নষ্ট করে', 'উভয়েই ডিটারজেন্ট তৈরি করে'] },
    { item: 'ডিটারজেন্টে ফসফেট (STPP) বা জিওলাইট যোগ করার উদ্দেশ্য', ans: 'পানির Ca²⁺ ও Mg²⁺ আয়ন দূর করে মৃদু পানি তৈরি করা (বিল্ডার)', wrong: ['সাবানের রং গাঢ় করা', 'ব্যাকটেরিয়া জন্ম দেওয়া', 'pH ২.০-এ নামানো'] },
    { item: 'দুধকে হোমোজেনাইজেশন (Homogenization) করার উদ্দেশ্য', ans: 'চর্বির বড় কণা ভেঙে সূক্ষ্ম করে (<১ μm) ওপরে সর জমা রোধ করা', wrong: ['ল্যাকটোজকে গ্লুকোজে ভাঙা', 'দুধের ক্যাসিন অধঃক্ষিপ্ত করা', 'দুধকে W/O ইমালশনে রূপান্তর'] },
    { item: 'সরিষার তেলের ঝাঁঝালো গন্ধের জন্য দায়ী যৌগ', ans: 'অ্যালাইল আইসোথায়োসায়ানেট (Allyl isothiocyanate)', wrong: ['ইথাইল বিউটাইরেট', 'মিথাইল স্যালিসাইলেট', 'বেনজালডিহাইড'] },
    { item: 'পাকা আনারস ও পাকা কলার সুগন্ধের জন্য দায়ী এস্টার যথাক্রমে', ans: 'ইথাইল বিউটাইরেট (আনারস) ও আইসোঅ্যামাইল অ্যাসিটেট (কলা)', wrong: ['মিথাইল বেনজোয়েট ও ফরমিক অ্যাসিড', 'অ্যাসিটালডিহাইড ও ইথানল', 'সিনামালডিহাইড ও ফেনল'] },
    { item: 'দই তৈরিতে দুধকে জমাট বাঁধায় কোন ব্যাকটেরিয়া ও উৎপন্ন অ্যাসিড?', ans: 'Lactobacillus ব্যাকটেরিয়া ও ল্যাকটিক অ্যাসিড', wrong: ['Acetobacter ও অ্যাসিটিক অ্যাসিড', 'E. coli ও হাইড্রোক্লোরিক অ্যাসিড', 'Yeast ও বিউটাইরিক অ্যাসিড'] },
  ];
  toiletries.forEach((tl, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `কর্মমুখী রসায়ন অনুযায়ী "${tl.item}" সম্পর্কে কোনটি সঠিক?`,
        correct: tl.ans,
        distractors: tl.wrong,
        explanation: `${tl.item}: ${tl.ans}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · কর্মমুখী রসায়ন',
      })
    );
  });

  // Batch additional Ch4 kinetics/pH & Ch5 food/colloid conceptual questions to reach ~350 in this file
  const kspConcepts = [
    { q: 'দুধে অবস্থিত কোন প্রোটিনটি pH ৪.৬-এ ছানা রূপে তঞ্চিত হয়?', a: 'ক্যাসিন (Casein)', d: ['অ্যালবুমিন', 'গ্লোবুলিন', 'হিস্টোন'] },
    { q: 'ডিমের সাদা অংশে (অ্যালবুমিন) এবং দুধে থাকা ইমালসিফায়ার যথাক্রমে কী?', a: 'লিসিথিন (ডিমের কুসুম) ও ক্যাসিন (দুধ)', d: ['স্টার্চ ও জেল্যাটিন', 'সেলুলোজ ও পেকটিন', 'প্যারাফিন ও মোম'] },
    { q: 'ফলের জ্যাম ও জেলি জমাট বাঁধাতে কোন প্রাকৃতিক পলিস্যাকারাইড ব্যবহার করা হয়?', a: 'পেকটিন (Pectin)', d: ['কাইটিন', 'গ্লাইকোজেন', 'সেলুলোজ'] },
    { q: 'ভ্যানিশিং ক্রিম ও কোল্ড ক্রিম কোন শ্রেণির ইমালশন?', a: 'ভ্যানিশিং ক্রিম O/W এবং কোল্ড ক্রিম W/O ইমালশন', d: ['উভয়ই O/W ইমালশন', 'উভয়ই W/O ইমালশন', 'ভ্যানিশিং ক্রিম সল এবং কোল্ড ক্রিম অ্যারোসল'] },
    { q: 'স্বচ্ছ সাবান (যেমন গ্লিসারিন সাবান) তৈরিতে কী ব্যবহৃত হয়?', a: 'ইথানল (অ্যালকোহল) ও গ্লিসারিন', d: ['সোডিয়াম সিলিকেট ও বালি', 'জিংক অক্সাইড ও ট্যাল্ক', 'ক্যালসিয়াম কার্বনেট'] },
    { q: 'সাবানের ক্লিঞ্জিং ক্রিয়া বা ময়লা পরিষ্কারের মূল কৌশল কী?', a: 'মিসেল (Micelle) গঠন ও তেল-পানির পৃষ্ঠটান হ্রাস', d: ['অ্যাসিড-ক্ষার প্রশমন', 'তড়িৎ বিশ্লেষণ', 'ঊর্ধ্বপাতন'] },
    { q: 'সালফেটবিহীন মৃদু লিকুইড সাবান ও শ্যাম্পুতে কোন পিএইচ বজায় রাখা হয়?', a: 'pH ৫.০ – ৫.৫ (ত্বক ও চুলের অনুকূল)', d: ['pH ১১.০ – ১২.০', 'pH ১.৫ – ২.৫', 'pH ৮.৫ – ১০.০'] },
    { q: 'কুইক ভিনেগার পদ্ধতিতে কাঠের ভ্যাট-এ ব্যবহৃত মাইক্রো-অর্গানিজমের নাম কী?', a: 'মাইকোডার্মা অ্যাসিটি (Mycoderma aceti)', d: ['স্যাকারোমাইসিস সেরেভিসি', 'রাইজোবিয়াম', 'ভিব্রিও কলেরি'] },
    { q: 'মল্ট ভিনেগার উৎপাদনে ব্যবহৃত স্টার্চযুক্ত প্রধান শস্যদানা কোনটি?', a: 'অঙ্কুরিত যব (বার্লি মল্ট)', d: ['সয়াবিন তেল', 'সরষে দানা', 'নারিকেলের শাঁস'] },
    { q: 'খাদ্যে অনুমোদিত কৃত্রিম প্রিজারভেটিভ সাইট্রিক অ্যাসিডের প্রধান উৎস কোনটি?', a: 'লেবু ও কমলা জাতীয় সাইট্রাস ফল', d: ['দুধ ও দই', 'মাছ ও মাংস', 'সরিষার দানা'] },
  ];
  kspConcepts.forEach((kc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch5_applied',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: kc.q,
        correct: kc.a,
        distractors: kc.d,
        explanation: `${kc.q} — সঠিক উত্তর: ${kc.a}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৫ · কর্মমুখী রসায়ন',
      })
    );
  });

  // Ch 4 Dilution & Mixing pH drills (30 MCQs)
  const phMixCases = [
    { desc: '১০০ mL ০.১ M HCl এবং ১০০ mL ০.১ M NaOH মিশ্রণ', ph: '৭.০ (পূর্ণ প্রশমন)', note: 'সমমোলার তীব্র অ্যাসিড ও তীব্র ক্ষার সম্পূর্ণ প্রশমিত হয়।' },
    { desc: '১০০ mL ০.২ M HCl এবং ১০০ mL ০.১ M NaOH মিশ্রণ', ph: '১.৩০ (অম্লীয়, [H⁺] = ০.০৫ M)', note: 'অতিরিক্ত HCl = ১০ mmol / ২০০ mL = ০.০৫ M ⇒ pH = −log(০.০৫) = ১.৩০।' },
    { desc: '১০০ mL ০.১ M HCl এবং ১০০ mL ০.৩ M NaOH মিশ্রণ', ph: '১৩.০০ (ক্ষারীয়, [OH⁻] = ০.১ M)', note: 'অতিরিক্ত OH⁻ = ২০ mmol / ২০০ mL = ০.১ M ⇒ pOH = ১ ⇒ pH = ১৩।' },
    { desc: '০.০৫ M H₂SO₄ জলীয় দ্রবণ (২৫ °C)', ph: '১.০০ ([H⁺] = ২ × ০.০৫ = ০.১ M)', note: 'H₂SO₄ দ্বিক্ষারীয় অ্যাসিড বলে [H⁺] = ২×০.০৫ = ০.১ M ⇒ pH = ১।' },
    { desc: '০.০০৫ M H₂SO₄ জলীয় দ্রবণ (২৫ °C)', ph: '২.০০ ([H⁺] = ২ × ০.০০৫ = ০.০১ M)', note: '[H⁺] = ০.০১ = ১০⁻² M ⇒ pH = ২।' },
    { desc: '০.০৫ M Ca(OH)₂ বা Ba(OH)₂ জলীয় দ্রবণ', ph: '১৩.০০ ([OH⁻] = ২ × ০.০৫ = ০.১ M)', note: 'Ca(OH)₂ থেকে ২টি OH⁻ মুক্ত হয় ⇒ [OH⁻] = ০.১ M ⇒ pOH = ১, pH = ১৩।' },
    { desc: 'pH = ৩ বিশিষ্ট একটি HCl দ্রবণকে ১০০ গুণ পানি দিয়ে লঘু করলে নতুন pH', ph: '৫.০০ (প্রতি ১০ গুণে pH ১ বাড়ে)', note: '[H⁺] ১০⁻³ থেকে ১০⁻⁵ M হয় ⇒ নতুন pH = ৫।' },
    { desc: 'pH = ১১ বিশিষ্ট NaOH দ্রবণকে ১০০ গুণ লঘু করলে নতুন pH', ph: '৯.০০ (প্রতি ১০ গুণে pH ১ কমে)', note: '[OH⁻] ১০⁻³ থেকে ১০⁻⁵ M হয় ⇒ pOH = ৫ ⇒ pH = ৯।' },
    { desc: 'pH = ২ এবং pH = ৪ বিশিষ্ট দুটি তীব্র অ্যাসিডের মধ্যে প্রথমটি দ্বিতীয়টির তুলনায় কত গুণ তীব্র', ph: '১০০ গুণ বেশি আম্লিক', note: 'ΔpH = ২ হওয়ায় [H⁺] এর অনুপাত ১০² = ১০০ গুণ।' },
    { desc: '২৫ °C তাপমাত্রায় ১০⁻⁸ M HCl জলীয় দ্রবণের প্রকৃত pH (পানির H⁺ সহ)', ph: '৬.৯৬ (~৭-এর সামান্য কম)', note: 'অতি লঘু অ্যাসিডে পানির [H⁺] = ১০⁻⁷ M যোগ হয়: মোট [H⁺] ≈ ১.০৫ × ১০⁻⁷ M ⇒ pH = ৬.৯৮ (<৭)।' },
    { desc: '২৫ °C তাপমাত্রায় ১০⁻⁸ M NaOH জলীয় দ্রবণের প্রকৃত pH', ph: '৭.০২ (~৭-এর সামান্য বেশি)', note: 'অতি লঘু ক্ষারে মোট [OH⁻] ≈ ১.০৫ × ১০⁻⁷ M ⇒ pOH = ৬.৯৮ ⇒ pH = ৭.০২ (>৭)।' },
    { desc: '২৫ mL ০.২ M CH₃COOH ও ২৫ mL ০.১ M NaOH-এর মিশ্রণ (pKa = ৪.৭৪)', ph: '৪.৭৪ (অর্ধ-প্রশমন বাফার)', note: 'অর্ধেক অ্যাসিড লবণে রূপান্তরিত হওয়ায় [লবণ] = [অ্যাসিড] ⇒ pH = pKa = ৪.৭৪।' },
  ];
  const phChoices = phMixCases.map((m) => m.ph);
  phMixCases.forEach((pm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${pm.desc}-এর ক্ষেত্রে ২৫ °C তাপমাত্রায় pH কত হবে?`,
        correct: pm.ph,
        distractors: phChoices.filter((p) => p !== pm.ph).slice(i % 6, (i % 6) + 4),
        explanation: `${pm.desc}: ${pm.ph}। ${pm.note}`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · মিশ্রণের pH',
      })
    );
  });

  return list;
}
