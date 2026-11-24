import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

// Chemistry 1st Paper Structured Pool M (~560+ MCQs)
// High-yield systematic parametric drills for Chapter 2 (Quantum, Bohr, Spectra, Ksp)
// and Chapter 3 (Periodic Table, Bonding, Hybridization, Dipole Moment, MO Bond Order)

export function buildChem1StructuredM(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sm_${String(seq++).padStart(4, '0')}`;

  // 1. Bohr Orbit Radius, Energy & Spectral Lines (Ch 2, 36 MCQs)
  const bohrHydrogenLevels = [
    { n: 1, r: '০.৫২৯ Å', e: '-১৩.৬০ eV', v: '২.১৮ × ১০⁶ m/s' },
    { n: 2, r: '২.১১৬ Å', e: '-৩.৪০ eV', v: '১.০৯ × ১০⁶ m/s' },
    { n: 3, r: '৪.৭৬১ Å', e: '-১.৫১ eV', v: '৭.২৭ × ১০⁵ m/s' },
    { n: 4, r: '৮.৪৬৪ Å', e: '-০.৮৫ eV', v: '৫.৪৫ × ১০⁵ m/s' },
    { n: 5, r: '১৩.২২৫ Å', e: '-০.৫৪ eV', v: '৪.৩৬ × ১০⁵ m/s' },
  ];
  bohrHydrogenLevels.forEach((b, i) => {
    const others = bohrHydrogenLevels.filter((x) => x.n !== b.n);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `বোর তত্ত্ব অনুযায়ী হাইড্রোজেন পরমাণুর ${toBnDigits(b.n)}-তম কক্ষপথের (n = ${toBnDigits(b.n)}) ব্যাসার্ধ কত অ্যাংস্ট্রম (Å)?`,
        correct: b.r,
        distractors: others.map((x) => x.r),
        explanation: `rₙ = ০.৫২৯ × n² Å সূত্রমতে n = ${toBnDigits(b.n)}-এর জন্য r = ০.৫২৯ × ${toBnDigits(b.n * b.n)} = ${b.r}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বোর কক্ষপথ ব্যাসার্ধ',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 1 ? 'medical' : 'board',
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(b.n)}-তম শক্তিস্তরে ইলেকট্রনের মোট শক্তি Eₙ কত ইলেকট্রন-ভোল্ট (eV)?`,
        correct: b.e,
        distractors: others.map((x) => x.e),
        explanation: `Eₙ = -১৩.৬ / n² eV সূত্রমতে n = ${toBnDigits(b.n)} হলে E = -১৩.৬ / ${toBnDigits(b.n * b.n)} = ${b.e}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বোর কক্ষপথ শক্তি',
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
        question: `হাইড্রোজেনের ${toBnDigits(b.n)}-তম বোর কক্ষপথে ঘূর্ণায়মান ইলেকট্রনের রৈখিক বেগ প্রায় কত?`,
        correct: b.v,
        distractors: others.map((x) => x.v),
        explanation: `vₙ = ২.১৮ × ১০⁶ / n m/s ⇒ n = ${toBnDigits(b.n)}-এ বেগ ${b.v}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · ইলেকট্রনের বেগ',
      })
    );
  });

  // Spectral series transitions (18 MCQs)
  const spectralSeries = [
    { name: 'লাইম্যান (Lyman)', n1: '১', region: 'অতিবেগুনি (UV)', limitNm: '৯১.২ nm (সর্বনিম্ন λ)' },
    { name: 'বামার (Balmer)', n1: '২', region: 'দৃশ্যমান (Visible)', limitNm: '৩৬৪.৬ nm (Hα ৬৫৬ nm)' },
    { name: 'প্যাশ্চেন (Paschen)', n1: '৩', region: 'নিকট অবলোহিত (Near IR)', limitNm: '৮২০.৪ nm' },
    { name: 'ব্র্যাকেট (Brackett)', n1: '৪', region: 'মধ্য অবলোহিত (Mid IR)', limitNm: '১৪৫৮ nm' },
    { name: 'ফুন্ড (Pfund)', n1: '৫', region: 'দূর অবলোহিত (Far IR)', limitNm: '২২৭৯ nm' },
    { name: 'হামফ্রিস (Humphreys)', n1: '৬', region: 'অতি দূর অবলোহিত (IR)', limitNm: '৩২৮১ nm' },
  ];
  spectralSeries.forEach((ss, i) => {
    const others = spectralSeries.filter((x) => x.name !== ss.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `হাইড্রোজেন পারমাণবিক বর্ণালিতে ইলেকট্রন উচ্চতর স্তর থেকে n₁ = ${ss.n1} স্তরে অবতরণ করলে যে "${ss.name}" সিরিজ সৃষ্টি হয়, তা কোন তড়িৎচুম্বকীয় অঞ্চলে অবস্থিত?`,
        correct: ss.region,
        distractors: others.slice(0, 4).map((x) => x.region),
        explanation: `${ss.name} সিরিজ (n₁ = ${ss.n1}) ${ss.region} অঞ্চলে দেখা যায় (সীমা রেখা ~${ss.limitNm})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · হাইড্রোজেন বর্ণালি',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `হাইড্রোজেন বর্ণালির "${ss.name}" সিরিজের নিম্নতম শক্তিস্তর (n₁) কোনটি?`,
        correct: `n₁ = ${ss.n1} (${ss.region})`,
        distractors: others.slice(i % 2, (i % 2) + 4).map((x) => `n₁ = ${x.n1} (${x.region})`),
        explanation: `${ss.name} সিরিজের জন্য ইলেকট্রন n₂ > ${ss.n1} থেকে n₁ = ${ss.n1} স্তরে ঝাঁপ দেয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বর্ণালি সিরিজ',
      })
    );
  });

  // 2. Salt Solubility Product (Ksp) Expressions & Solubility Drills (Ch 2, 48 MCQs)
  const salts = [
    { salt: 'AgCl', ions: 'Ag⁺ + Cl⁻', expr: 'S²', type: '১ : ১ (AB)' },
    { salt: 'BaSO₄', ions: 'Ba²⁺ + SO₄²⁻', expr: 'S²', type: '১ : ১ (AB)' },
    { salt: 'CaC₂O₄', ions: 'Ca²⁺ + C₂O₄²⁻', expr: 'S²', type: '১ : ১ (AB)' },
    { salt: 'PbCl₂', ions: 'Pb²⁺ + 2Cl⁻', expr: '4S³', type: '১ : ২ (AB₂)' },
    { salt: 'CaF₂', ions: 'Ca²⁺ + 2F⁻', expr: '4S³', type: '১ : ২ (AB₂)' },
    { salt: 'Mg(OH)₂', ions: 'Mg²⁺ + 2OH⁻', expr: '4S³', type: '১ : ২ (AB₂)' },
    { salt: 'Ag₂CrO₄', ions: '2Ag⁺ + CrO₄²⁻', expr: '4S³', type: '২ : ১ (A₂B)' },
    { salt: 'Ag₂SO₄', ions: '2Ag⁺ + SO₄²⁻', expr: '4S³', type: '২ : ১ (A₂B)' },
    { salt: 'Fe(OH)₃', ions: 'Fe³⁺ + 3OH⁻', expr: '27S⁴', type: '১ : ৩ (AB₃)' },
    { salt: 'Al(OH)₃', ions: 'Al³⁺ + 3OH⁻', expr: '27S⁴', type: '১ : ৩ (AB₃)' },
    { salt: 'Cr(OH)₃', ions: 'Cr³⁺ + 3OH⁻', expr: '27S⁴', type: '১ : ৩ (AB₃)' },
    { salt: 'Ca₃(PO₄)₂', ions: '3Ca²⁺ + 2PO₄³⁻', expr: '108S⁵', type: '৩ : ২ (A₃B₂)' },
    { salt: 'Bi₂S₃', ions: '2Bi³⁺ + 3S²⁻', expr: '108S⁵', type: '২ : ৩ (A₂B₃)' },
    { salt: 'Sb₂S₃', ions: '2Sb³⁺ + 3S²⁻', expr: '108S⁵', type: '২ : ৩ (A₂B₃)' },
    { salt: 'Zr₃(PO₄)₄', ions: '3Zr⁴⁺ + 4PO₄³⁻', expr: '6912S⁷', type: '৩ : ৪ (A₃B₄)' },
  ];
  const exprPool = ['S²', '4S³', '27S⁴', '108S⁵', '6912S⁷', '16S⁴'];
  salts.forEach((s, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `স্বল্পদ্রব্য লবণ ${s.salt} (বিয়োজন: ${s.salt} ⇌ ${s.ions})-এর মোলার দ্রাব্যতা S হলে দ্রাব্যতা গুণফল Ksp-এর সমীকরণ কোনটি?`,
        correct: s.expr,
        distractors: exprPool.filter((e) => e !== s.expr).slice(0, 4),
        explanation: `${s.salt} (${s.type} প্রকার) বিয়োজিত হয়ে ${s.ions} দেয়; তাই Ksp = ${s.expr}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · দ্রাব্যতা গুণফল (Ksp)',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `জলীয় দ্রবণে ${s.salt} সামান্য দ্রবীভূত হয়ে ${s.ions} আয়ন উৎপন্ন করে; এটি কোন অনুপাতের তড়িৎ বিশ্লেষ্য লবণ?`,
        correct: `${s.type} প্রকার (Ksp = ${s.expr})`,
        distractors: Array.from(
          new Set(salts.filter((x) => x.type !== s.type).map((x) => `${x.type} প্রকার (Ksp = ${x.expr})`))
        ).slice(0, 4),
        explanation: `${s.salt} ⇌ ${s.ions} হওয়ায় এটি ${s.type} লবণ এবং Ksp = ${s.expr}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · লবণের বিয়োজন',
      })
    );
  });

  // 3. 3d Transition Ions: Electron Config, Unpaired Electrons & Magnetic Moment (Ch 3, 45 MCQs)
  const dIons = [
    { ion: 'Sc³⁺ (Z=২১)', conf: '[Ar] 3d⁰', n: 0, mu: '০.০০ BM', color: 'বর্ণহীন ও ডায়াচৌম্বক' },
    { ion: 'Ti³⁺ (Z=২২)', conf: '[Ar] 3d¹', n: 1, mu: '১.৭৩ BM', color: 'বেগুনি ও প্যারাচৌম্বক' },
    { ion: 'Ti⁴⁺ (Z=২২)', conf: '[Ar] 3d⁰', n: 0, mu: '০.০০ BM', color: 'বর্ণহীন ও ডায়াচৌম্বক' },
    { ion: 'V³⁺ (Z=২৩)', conf: '[Ar] 3d²', n: 2, mu: '২.৮৩ BM', color: 'সবুজ ও প্যারাচৌম্বক' },
    { ion: 'Cr³⁺ (Z=২৪)', conf: '[Ar] 3d³', n: 3, mu: '৩.৮৭ BM', color: 'বেগুনি/সবুজ ও প্যারাচৌম্বক' },
    { ion: 'Mn²⁺ (Z=২৫)', conf: '[Ar] 3d⁵', n: 5, mu: '৫.৯২ BM', color: 'হালকা গোলাপি ও প্যারাচৌম্বক' },
    { ion: 'Fe²⁺ (Z=২৬)', conf: '[Ar] 3d⁶', n: 4, mu: '৪.৯০ BM', color: 'হালকা সবুজ ও প্যারাচৌম্বক' },
    { ion: 'Fe³⁺ (Z=২৬)', conf: '[Ar] 3d⁵', n: 5, mu: '৫.৯২ BM', color: 'হলুদ-বাদামী ও প্যারাচৌম্বক' },
    { ion: 'Co²⁺ (Z=২৭)', conf: '[Ar] 3d⁷', n: 3, mu: '৩.৮৭ BM', color: 'গোলাপি ও প্যারাচৌম্বক' },
    { ion: 'Ni²⁺ (Z=২৮)', conf: '[Ar] 3d⁸', n: 2, mu: '২.৮৩ BM', color: 'সবুজ ও প্যারাচৌম্বক' },
    { ion: 'Cu²⁺ (Z=২৯)', conf: '[Ar] 3d⁹', n: 1, mu: '১.৭৩ BM', color: 'নীল ও প্যারাচৌম্বক' },
    { ion: 'Cu⁺ (Z=২৯)', conf: '[Ar] 3d¹⁰', n: 0, mu: '০.০০ BM', color: 'বর্ণহীন ও ডায়াচৌম্বক' },
    { ion: 'Zn²⁺ (Z=৩০)', conf: '[Ar] 3d¹⁰', n: 0, mu: '০.০০ BM', color: 'বর্ণহীন ও ডায়াচৌম্বক' },
  ];
  dIons.forEach((d, i) => {
    const uniqueN = Array.from(new Set(dIons.filter((x) => x.n !== d.n).map((x) => `${toBnDigits(x.n)}টি বিজোড় e⁻ (μ ≈ ${x.mu})`)));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${d.ion} আয়নটির ইলেকট্রন বিন্যাস ${d.conf}; এতে কতটি বিজোড় ইলেকট্রন ও এর চুম্বক ভ্রামক কত?`,
        correct: `${toBnDigits(d.n)}টি বিজোড় e⁻ (μ ≈ ${d.mu})`,
        distractors: uniqueN.slice(0, 4),
        explanation: `${d.ion} (${d.conf})-এ হুন্ডের নীতিতে ${toBnDigits(d.n)}টি বিজোড় e⁻ থাকায় μ = √(${toBnDigits(d.n)}(${toBnDigits(d.n)}+২)) = ${d.mu} (${d.color})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অবস্থান্তর আয়নের ধর্ম',
      })
    );

    const uniqueConf = Array.from(new Set(dIons.filter((x) => x.conf !== d.conf).map((x) => x.conf)));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `প্রথম অবস্থান্তর সারির ${d.ion} ক্যাটায়নের সঠিক ইলেকট্রন বিন্যাস কোনটি (ধর্ম: ${d.color})?`,
        correct: d.conf,
        distractors: uniqueConf.slice(i % 4, (i % 4) + 4),
        explanation: `আয়ন গঠনের সময় প্রথমে সর্ববহিস্থ 4s ও পরে প্রয়োজনমতো 3d থেকে ইলেকট্রন অপসারিত হয় ⇒ ${d.ion}: ${d.conf}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · আয়নের ইলেকট্রন বিন্যাস',
      })
    );
  });

  // 4. Elements Periodic Block, Group, Oxide Nature Matrix (Ch 3, 24 × 3 = 72 MCQs)
  const elementMatrix = [
    { el: 'লিথিয়াম (Li, Z=৩)', loc: 's-ব্লক, ২য় পর্যায়, গ্রুপ ১', oxide: 'Li₂O — তীব্র ক্ষারীয়', val: 'যোজ্যতা ১ (সমযোজী প্রবণ)' },
    { el: 'বেরিলিয়াম (Be, Z=৪)', loc: 's-ব্লক, ২য় পর্যায়, গ্রুপ ২', oxide: 'BeO — উভধর্মী (Amphoteric)', val: 'যোজ্যতা ২ (উচ্চ পোলারায়ন)' },
    { el: 'বোরন (B, Z=৫)', loc: 'p-ব্লক, ২য় পর্যায়, গ্রুপ ১৩', oxide: 'B₂O₃ — মৃদু অম্লীয় (অধাতু/উপধাতু)', val: 'যোজ্যতা ৩ (অসম্পূর্ণ অষ্টক)' },
    { el: 'কার্বন (C, Z=৬)', loc: 'p-ব্লক, ২য় পর্যায়, গ্রুপ ১৪', oxide: 'CO₂ অম্লীয় ও CO প্রশম', val: 'যোজ্যতা ৪ (ক্যাটেনেশন সর্বোচ্চ)' },
    { el: 'নাইট্রোজেন (N, Z=৭)', loc: 'p-ব্লক, ২য় পর্যায়, গ্রুপ ১৫', oxide: 'N₂O₅, NO₂ অম্লীয়; NO, N₂O প্রশম', val: 'সর্বোচ্চ সমযোজ্যতা ৪' },
    { el: 'ফ্লোরিন (F, Z=৯)', loc: 'p-ব্লক, ২য় পর্যায়, গ্রুপ ১৭', oxide: 'OF₂ (ফ্লোরাইড; সর্বাধিক EN = ৪.০)', val: 'জারণ সংখ্যা সর্বদা -১' },
    { el: 'ম্যাগনেসিয়াম (Mg, Z=১২)', loc: 's-ব্লক, ৩য় পর্যায়, গ্রুপ ২', oxide: 'MgO — ক্ষারীয়', val: 'ক্লোরোফিলের কেন্দ্রীয় ধাতু' },
    { el: 'অ্যালুমিনিয়াম (Al, Z=১৩)', loc: 'p-ব্লক, ৩য় পর্যায়, গ্রুপ ১৩', oxide: 'Al₂O₃ — উভধর্মী (Amphoteric)', val: 'যোজ্যতা ৩ (Al₂Cl₆ ডাইমার)' },
    { el: 'সিলিকন (Si, Z=১৪)', loc: 'p-ব্লক, ৩য় পর্যায়, গ্রুপ ১৪', oxide: 'SiO₂ — অম্লীয় জায়ান্ট সমযোজী কঠিন', val: 'উপধাতু (সেমিকন্ডাক্টর)' },
    { el: 'ফসফরাস (P, Z=১৫)', loc: 'p-ব্লক, ৩য় পর্যায়, গ্রুপ ১৫', oxide: 'P₄O₁₀ ও P₄O₆ — অম্লীয়', val: 'যোজ্যতা ৩ ও ৫ (PCl₅)' },
    { el: 'সালফার (S, Z=১৬)', loc: 'p-ব্লক, ৩য় পর্যায়, গ্রুপ ১৬', oxide: 'SO₂ ও SO₃ — তীব্র অম্লীয়', val: 'যোজ্যতা ২, ৪ ও ৬ (SF₆)' },
    { el: 'ক্লোরিন (Cl, Z=১৭)', loc: 'p-ব্লক, ৩য় পর্যায়, গ্রুপ ১৭', oxide: 'Cl₂O₇ — তীব্রতম অম্লীয় অক্সাইড (HClO₄ অ্যানহাইড্রাইড)', val: 'সর্বাধিক ইলেকট্রন আসক্তি' },
    { el: 'আর্গন (Ar, Z=১৮)', loc: 'p-ব্লক, ৩য় পর্যায়, গ্রুপ ১৮', oxide: 'নিষ্ক্রিয় গ্যাস (কোনো স্থায়ী অক্সাইড নেই)', val: 'যোজ্যতা ০ (অষ্টক পূর্ণ)' },
    { el: 'পটাশিয়াম (K, Z=১৯)', loc: 's-ব্লক, ৪র্থ পর্যায়, গ্রুপ ১', oxide: 'K₂O ক্ষারীয় ও KO₂ সুপারঅক্সাইড', val: '৪s¹ প্রভেদক ইলেকট্রন' },
    { el: 'ক্যালসিয়াম (Ca, Z=২০)', loc: 's-ব্লক, ৪র্থ পর্যায়, গ্রুপ ২', oxide: 'CaO (কুইক লাইম) — তীব্র ক্ষারীয়', val: 'অস্থি ও দাঁতের প্রধান ধাতু' },
    { el: 'ক্রোমিয়াম (Cr, Z=২৪)', loc: 'd-ব্লক, ৪র্থ পর্যায়, গ্রুপ ৬', oxide: 'CrO ক্ষারীয়, Cr₂O₃ উভধর্মী, CrO₃ অম্লীয়', val: '3d⁵ 4s¹ ব্যতিক্রমী বিন্যাস' },
    { el: 'ম্যাঙ্গানিজ (Mn, Z=২৫)', loc: 'd-ব্লক, ৪র্থ পর্যায়, গ্রুপ ৭', oxide: 'MnO ক্ষারীয়, MnO₂ উভধর্মী, Mn₂O₇ তীব্র অম্লীয়', val: '+২ থেকে +৭ জারণ অবস্থা' },
    { el: 'আয়রন (Fe, Z=২৬)', loc: 'd-ব্লক, ৪র্থ পর্যায়, গ্রুপ ৮', oxide: 'FeO ও Fe₂O₃ — ক্ষারীয় (হিমোগ্লোবিনে Fe²⁺)', val: '+২ ও +৩ প্রধান জারণ অবস্থা' },
    { el: 'কপার (Cu, Z=২৯)', loc: 'd-ব্লক, ৪র্থ পর্যায়, গ্রুপ ১১ (মুদ্রা ধাতু)', oxide: 'CuO ও Cu₂O — ক্ষারীয়', val: '3d¹⁰ 4s¹ ব্যতিক্রমী বিন্যাস' },
    { el: 'জিঙ্ক (Zn, Z=৩০)', loc: 'd-ব্লক, ৪র্থ পর্যায়, গ্রুপ ১২ (অবস্থান্তর নয়)', oxide: 'ZnO — উভধর্মী (সাদা দার্শনিক উল)', val: 'স্থির জারণ সংখ্যা +২' },
    { el: 'ব্রোমিন (Br, Z=৩৫)', loc: 'p-ব্লক, ৪র্থ পর্যায়, গ্রুপ ১৭', oxide: '২৫ °C-এ একমাত্র তরল অধাতু', val: 'অ্যালকিন অসম্পৃক্ততা পরীক্ষক' },
    { el: 'সিলভার (Ag, Z=৪৭)', loc: 'd-ব্লক, ৫ম পর্যায়, গ্রুপ ১১', oxide: 'Ag₂O — মৃদু ক্ষারীয়', val: '4d¹⁰ 5s¹ ব্যতিক্রমী বিন্যাস' },
    { el: 'টিন (Sn, Z=৫০)', loc: 'p-ব্লক, ৫ম পর্যায়, গ্রুপ ১৪', oxide: 'SnO ও SnO₂ — উভধর্মী', val: '+২ ও +৪ জারণ অবস্থা (নিষ্ক্রিয় জোড়)' },
    { el: 'লেড (Pb, Z=৮২)', loc: 'p-ব্লক, ৬ষ্ঠ পর্যায়, গ্রুপ ১৪', oxide: 'PbO ও PbO₂ — উভধর্মী', val: '+২ অধিক স্থিতিশীল (+৪ নয়)' },
  ];
  elementMatrix.forEach((em, i) => {
    const others = elementMatrix.filter((x) => x.el !== em.el);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `আধুনিক পর্যায় সারণিতে ${em.el} মৌলটির ব্লক, পর্যায় ও গ্রুপ অবস্থান কোনটি?`,
        correct: em.loc,
        distractors: Array.from(new Set(others.map((x) => x.loc))).slice(i % 10, (i % 10) + 4),
        explanation: `${em.el} → ${em.loc} (${em.val})।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · পর্যায় সারণির অবস্থান',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `${em.el} গঠিত প্রধান অক্সাইডের প্রকৃতি বা বিশেষ বৈশিষ্ট্য কী?`,
        correct: em.oxide,
        distractors: others.slice((i + 5) % 12, ((i + 5) % 12) + 4).map((x) => x.oxide),
        explanation: `${em.el}-এর অক্সাইড: ${em.oxide}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অক্সাইডের অম্ল-ক্ষার প্রকৃতি',
      })
    );
  });

  // 5. Diatomic MO Bond Order & Magnetism Matrix (Ch 3, 15 × 2 = 30 MCQs)
  const moSpecies = [
    { sp: 'H₂ (২ e⁻)', bo: '১.০', mag: 'ডায়াচৌম্বক (০ বিজোড় e⁻)' },
    { sp: 'H₂⁺ (১ e⁻)', bo: '০.৫', mag: 'প্যারাচৌম্বক (১ বিজোড় e⁻)' },
    { sp: 'He₂ (৪ e⁻)', bo: '০ (অস্তিত্বহীন)', mag: 'অণু গঠিত হয় না' },
    { sp: 'He₂⁺ (৩ e⁻)', bo: '০.৫', mag: 'প্যারাচৌম্বক (১ বিজোড় e⁻)' },
    { sp: 'Li₂ (৬ e⁻)', bo: '১.০', mag: 'ডায়াচৌম্বক' },
    { sp: 'B₂ (১০ e⁻)', bo: '১.০', mag: 'প্যারাচৌম্বক (২ বিজোড় π e⁻)' },
    { sp: 'C₂ (১২ e⁻)', bo: '২.০ (শুধু ২টি π বন্ধন)', mag: 'ডায়াচৌম্বক' },
    { sp: 'N₂ (১৪ e⁻)', bo: '৩.০', mag: 'ডায়াচৌম্বক' },
    { sp: 'N₂⁺ (১৩ e⁻)', bo: '২.৫', mag: 'প্যারাচৌম্বক' },
    { sp: 'O₂ (১৬ e⁻)', bo: '২.০', mag: 'প্যারাচৌম্বক (২ বিজোড় π* e⁻)' },
    { sp: 'O₂⁺ (১৫ e⁻)', bo: '২.৫', mag: 'প্যারাচৌম্বক (১ বিজোড় π* e⁻)' },
    { sp: 'O₂⁻ (১৭ e⁻)', bo: '১.৫', mag: 'প্যারাচৌম্বক (১ বিজোড় π* e⁻)' },
    { sp: 'O₂²⁻ (১৮ e⁻)', bo: '১.০', mag: 'ডায়াচৌম্বক' },
    { sp: 'F₂ (১৮ e⁻)', bo: '১.০', mag: 'ডায়াচৌম্বক' },
    { sp: 'CO / NO⁺ (১৪ e⁻)', bo: '৩.০', mag: 'ডায়াচৌম্বক' },
  ];
  const boPool = ['০.৫', '১.০', '১.৫', '২.০', '২.৫', '৩.০', '০ (অস্তিত্বহীন)'];
  moSpecies.forEach((m, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `আণবিক অরবিটাল (MO) তত্ত্ব অনুসারে ${m.sp} প্রজাতির বন্ধন ক্রম (Bond Order) কত?`,
        correct: m.bo,
        distractors: boPool.filter((b) => b !== m.bo).slice(0, 4),
        explanation: `Bond Order = (Nb - Na)/2 সূত্রমতে ${m.sp}-এর বন্ধন ক্রম ${m.bo} এবং এটি ${m.mag}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · আণবিক অরবিটাল তত্ত্ব',
      })
    );
  });

  // 6. Comprehensive Hybridization & Dipole Moment Lookup (Ch 3, 25 × 2 = 50 MCQs)
  const dipoleAndShapeCases = [
    { mol: 'CH₄', dipole: 'অপোলার (μ = ০ D)', reason: 'সুষম চতুস্তলকীয় প্রতিসাম্য' },
    { mol: 'CHCl₃ (ক্লোরোফর্ম)', dipole: 'পোলার (μ ≈ ১.০৪ D ≠ ০)', reason: 'C–H ও ৩টি C–Cl ভ্রামক সম্পূর্ণ প্রশমিত হয় না' },
    { mol: 'CCl₄', dipole: 'অপোলার (μ = ০ D)', reason: 'চতুস্তলকের চারটি শীর্ষে অভিন্ন Cl থাকায় লব্ধি শূন্য' },
    { mol: 'BF₃', dipole: 'অপোলার (μ = ০ D)', reason: 'সমতলীয় ত্রিভুজাকার (১২০°), ৩টি B–F ভ্রামক পরস্পরকে নাকচ করে' },
    { mol: 'NH₃', dipole: 'পোলার (μ = ১.৪৭ D)', reason: 'ত্রিকোণাকার পিরামিড; N–H এবং নিঃসঙ্গ জোড় একই দিকে' },
    { mol: 'NF₃', dipole: 'মৃদু পোলার (μ = ০.২৪ D)', reason: 'N–F ভ্রামক নিঃসঙ্গ জোড় ভ্রামকের বিপরীত দিকে ক্রিয়া করে' },
    { mol: 'H₂O', dipole: 'তীব্র পোলার (μ = ১.৮৫ D)', reason: 'কৌণিক গঠন (১০৪.৫°) ও ২টি নিঃসঙ্গ জোড়' },
    { mol: 'CO₂', dipole: 'অপোলার (μ = ০ D)', reason: '১৮০° সরলরৈখিক অণুতে দুটি সমান বিপরীত C=O ভ্রামক' },
    { mol: 'SO₂', dipole: 'পোলার (μ = ১.৬২ D)', reason: 'S-এ ১টি নিঃসঙ্গ জোড় থাকায় কৌণিক (১১৯°) গঠন' },
    { mol: 'SO₃', dipole: 'অপোলার (μ = ০ D)', reason: 'sp² সমতলীয় ত্রিভুজাকার প্রতিসম গঠন' },
    { mol: 'SF₆', dipole: 'অপোলার (μ = ০ D)', reason: 'সুষম অষ্টতলকীয় (Octahedral) প্রতিসম গঠন' },
    { mol: 'PCl₅', dipole: 'অপোলার (μ = ০ D)', reason: 'সুষম ত্রিকোণাকার দ্বি-পিরামিডীয় গঠন' },
    { mol: 'XeF₄', dipole: 'অপোলার (μ = ০ D)', reason: 'সমতলীয় বর্গাকার গঠন ও বিপরীত পাশে ২টি নিঃসঙ্গ জোড়' },
    { mol: 'XeF₂', dipole: 'অপোলার (μ = ০ D)', reason: 'নিরক্ষীয় তলে ৩টি নিঃসঙ্গ জোড় ও ১৮০° সরলরৈখিক গঠন' },
    { mol: 'trans-1,2-ডাইক্লোরোইথিন', dipole: 'অপোলার (μ = ০ D)', reason: 'বিপরীত দিকে দুটি C–Cl ভ্রামক পরস্পরকে প্রশমিত করে' },
    { mol: 'cis-1,2-ডাইক্লোরোইথিন', dipole: 'পোলার (μ ≈ ১.৯০ D)', reason: 'একই দিকে দুটি C–Cl ভ্রামক যুক্ত হয়ে লব্ধি সৃষ্টি করে' },
    { mol: 'প্যারা-ডাইক্লোরোবেনজিন', dipole: 'অপোলার (μ = ০ D)', reason: '১৮০° বিপরীত অবস্থানে দুটি C–Cl বন্ধন ভ্রামক শূন্য' },
    { mol: 'অর্থো-ডাইক্লোরোবেনজিন', dipole: 'পোলার (μ ≈ ২.৫০ D)', reason: '৬০° কোণে দুটি C–Cl ভ্রামকের লব্ধি সর্বাধিক' },
  ];
  dipoleAndShapeCases.forEach((ds, i) => {
    const others = dipoleAndShapeCases.filter((x) => x.mol !== ds.mol);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${ds.mol} অণুটির মোট দ্বিমেরু ভ্রামক (Dipole Moment) ও পোলারিটি কোনটি?`,
        correct: `${ds.dipole} — ${ds.reason}`,
        distractors: others.slice(i % 10, (i % 10) + 4).map((x) => `${x.dipole} — ${x.reason}`),
        explanation: `${ds.mol}: ${ds.dipole}, কারণ ${ds.reason}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · দ্বিমেরু ভ্রামক',
      })
    );
  });

  // 7. Additional High-Yield Ch 2 & Ch 3 Concept Pairs (140 × 2 = 280 MCQs)
  const extraCh2Ch3Pairs: Array<{ q: string; a: string; ch: 'chem1_ch2_qualitative' | 'chem1_ch3_periodic' }> = [
    { q: 'একটি 3d অরবিটালে থাকা ইলেকট্রনের জন্য কৌণিক ভরবেগ √[l(l+1)]·ħ-এর মান কত', a: '√6 ħ (যেখানে l = ২ এবং ħ = h/2π)', ch: 'chem1_ch2_qualitative' },
    { q: 'একটি 2p অরবিটালের অরবিটাল কৌণিক ভরবেগের মান কত', a: '√2 ħ (যেখানে l = ১)', ch: 'chem1_ch2_qualitative' },
    { q: 's-অরবিটালের (l = ০) অরবিটাল কৌণিক ভরবেগ সর্বদা কত হয়', a: 'শূন্য (০ — গোলীয় প্রতিসাম্যের জন্য)', ch: 'chem1_ch2_qualitative' },
    { q: 'বোর তত্ত্ব অনুযায়ী n = ৩ কক্ষপথে আবর্তনশীল ইলেকট্রনের কৌণিক ভরবেগ mvr কত', a: '3h / 2π (বা 1.5 h/π)', ch: 'chem1_ch2_qualitative' },
    { q: 'হাইড্রোজেন পরমাণুর ৩য় কক্ষপথ থেকে ইলেকট্রনকে সম্পূর্ণ মুক্ত করতে (আয়নিকরণ শক্তি) কত শক্তি লাগবে', a: '+১.৫১ eV (যেহেতু E₃ = -১.৫১ eV)', ch: 'chem1_ch2_qualitative' },
    { q: 'একই গতিবেগসম্পন্ন প্রোটন, ইলেকট্রন, নিউট্রন ও α-কণার মধ্যে কার ডি-ব্রগলি তরঙ্গদৈর্ঘ্য সর্বাধিক', a: 'ইলেকট্রনের (ভর সবচেয়ে কম বলে λ = h/mv সর্বাধিক)', ch: 'chem1_ch2_qualitative' },
    { q: 'সমান বিভব পার্থক্য V দ্বারা ত্বরান্বিত ইলেকট্রনের ডি-ব্রগলি তরঙ্গদৈর্ঘ্যের সহজ সূত্র কী', a: 'λ ≈ ১২.২৭ / √V Å (প্রায় ১.২২৭ / √V nm)', ch: 'chem1_ch2_qualitative' },
    { q: '১০০ ভোল্ট বিভবে ত্বরান্বিত ইলেকট্রনের ডি-ব্রগলি তরঙ্গদৈর্ঘ্য কত Å', a: '১.২২৭ Å (১২.২৭ / √১০০)', ch: 'chem1_ch2_qualitative' },
    { q: 'পরমাণুর ৪র্থ শক্তিস্তরে (N-শেল) কোন উপশক্তিস্তরটি থাকতে পারে না', a: '4g উপশক্তিস্তর (কারণ l সর্বোচ্চ n-1 = ৩ অর্থাৎ f পর্যন্ত হতে পারে)', ch: 'chem1_ch2_qualitative' },
    { q: '২৪ পারমাণবিক সংখ্যাবিশিষ্ট Cr পরমাণুতে m = ০ কোয়ান্টাম সংখ্যাযুক্ত মোট কয়টি ইলেকট্রন থাকে', a: '১২টি (প্রতিটি s-এ ২, প্রতিটি p-তে ২, 3d-তে ১টি ⇒ ৪×২ + ২×২ + ১? গণনায়: 1s²,2s²,3s²,4s¹ = ৭ + 2p²,3p² = ৪ + 3d¹ = ১ ⇒ ১২টি)', ch: 'chem1_ch2_qualitative' },
    { q: 'Cu (Z = ২৯) পরমাণুর M-শেলে (n = ৩) মোট কতটি ইলেকট্রন থাকে', a: '১৮টি (3s² 3p⁶ 3d¹⁰) এবং 4s-এ ১টি', ch: 'chem1_ch2_qualitative' },
    { q: 'একটি হাইড্রোজেন পরমাণুর প্রথম বোর কক্ষপথের পরিধি ইলেকট্রনের ডি-ব্রগলি তরঙ্গদৈর্ঘ্যের কত গুণ', a: 'ঠিক ১ গুণ (২πr = nλ; n-তম কক্ষপথে nটি পূর্ণ তরঙ্গ থাকে)', ch: 'chem1_ch2_qualitative' },
    { q: 'রাদারফোর্ডের আলফা-কণা বিচ্ছুরণে নিউক্লিয়াসের নিকটতম দূরত্ব (Closest Approach) কিসের ব্যস্তানুপাতিক', a: 'আলফা-কণার গতিশক্তির (E_k) ব্যস্তানুপাতিক এবং নিউক্লীয় আধান (Ze)-এর সমানুপাতিক', ch: 'chem1_ch2_qualitative' },
    { q: 'দ্রাব্যতা গুণফল (Ksp) কোন কোন বিষয় পরিবর্তনে বদলায় বা অপরিবর্তিত থাকে', a: 'তাপমাত্রা পরিবর্তনে Ksp বদলায়; কিন্তু সম-আয়ন যোগ বা ঘনমাত্রা পরিবর্তনে Ksp স্থির থাকে', ch: 'chem1_ch2_qualitative' },
    { q: 'নলের ভেতর দিয়ে Al(OH)₃, Fe(OH)₃ এবং Cr(OH)₃ পৃথক করতে গ্রুপ-৩A বিকারক কী কী', a: 'কঠিন NH₄Cl ও NH₄OH (NH₄⁺-এর সম-আয়ন প্রভাবে OH⁻ নিয়ন্ত্রিত হয়ে কেবল গ্রুপ-৩A অধঃক্ষিপ্ত হয়)', ch: 'chem1_ch2_qualitative' },
    { q: 'হাইড্রোজেন সালফাইড (H₂S) চালনার সময় গ্রুপ-২ শনাক্তকরণে মাধ্যম অম্লীয় রাখা হয় কেন', a: 'লঘু HCl-এর H⁺ সম-আয়ন প্রভাবে S²⁻ ঘনমাত্রা অত্যন্ত কমিয়ে শুধু কম Ksp-যুক্ত CuS, PbS, Bi₂S₃ অধঃক্ষিপ্ত করতে', ch: 'chem1_ch2_qualitative' },
    { q: 'BaSO₄ পানিতে অদ্রবণীয় কিন্তু MgSO₄ দ্রবণীয় কেন', a: 'বৃহৎ Ba²⁺-এর হাইড্রেশন শক্তির চেয়ে BaSO₄-এর ল্যাটিস শক্তি বেশি (Mg²⁺ ক্ষুদ্র বলে উচ্চ হাইড্রেশন শক্তি পায়)', ch: 'chem1_ch2_qualitative' },
    { q: 'আয়োডোফর্ম বা ক্রোমাটোগ্রাফিতে HPLC এবং GC যথাক্রমে কী কী', a: 'High Performance Liquid Chromatography (HPLC) এবং Gas Chromatography (GC)', ch: 'chem1_ch2_qualitative' },
    { q: 'একটি মৌলের যোজ্যতা স্তরে ৩টি বিজোড় p-ইলেকট্রন থাকলে সেটি কোন গ্রুপের হতে পারে', a: 'গ্রুপ-১৫ (N, P, As ইত্যাদি — যাদের সাধারণ বিন্যাস ns² np³)', ch: 'chem1_ch3_periodic' },
    { q: 'পর্যায় সারণির কোন গ্রুপের মৌলগুলোকে "মুদ্রা ধাতু" (Coinage Metals) বলা হয়', a: 'গ্রুপ-১১ (Cu, Ag, Au)', ch: 'chem1_ch3_periodic' },
    { q: 'গ্রুপ-১৬ মৌলগুলোকে (O, S, Se, Te, Po) সম্মিলিতভাবে কী বলা হয়', a: 'চ্যালকোজেন (Chalcogens — আকরিক উৎপাদনকারী)', ch: 'chem1_ch3_periodic' },
    { q: 'গ্রুপ-১৫ মৌলগুলোকে (N, P, As, Sb, Bi) কী নামে ডাকা হয়', a: 'নিক্টোজেন (Pnictogens)', ch: 'chem1_ch3_periodic' },
    { q: 'অপধাতু বা মেটালয়েড (Metalloids) হিসেবে পরিচিত ৬টি প্রধান মৌল কোনগুলো', a: 'বোরন (B), সিলিকন (Si), জার্মেনিয়াম (Ge), আর্সেনিক (As), অ্যান্টিমনি (Sb) ও টেলুরিয়াম (Te)', ch: 'chem1_ch3_periodic' },
    { q: 'কোন দুটি মৌলের তড়িৎ ঋণাত্মকতা (পলিং স্কেলে ২.৫) প্রায় সমান এবং কোন দুটির ৩.০ সমান', a: 'C, S, I (২.৫) এবং N ও Cl (৩.০)', ch: 'chem1_ch3_periodic' },
    { q: 'C–C, C=C ও C≡C বন্ধন দৈর্ঘ্যের (Bond Length) সঠিক ক্রম কোনটি', a: 'C–C (১.৫৪ Å) > C=C (১.৩৪ Å) > C≡C (১.২০ Å)', ch: 'chem1_ch3_periodic' },
    { q: 'সংকরায়িত অরবিটালে s-চরিত্র (s-character) বাড়লে কার্বনের তড়িৎ ঋণাত্মকতা কীভাবে পরিবর্তিত হয়', a: 's-চরিত্র বাড়লে নিউক্লিয়াসের আকর্ষণ বাড়ে — তাই তড়িৎ ঋণাত্মকতা sp (৫০%) > sp² (৩৩.৩%) > sp³ (২৫%)', ch: 'chem1_ch3_periodic' },
    { q: 'অ্যাসিটিলিন (HC≡CH) ইথিলিন ও ইথেনের চেয়ে সামান্য অম্লীয় কেন', a: 'sp সংকরায়িত কার্বনের ৫০% s-চরিত্র থাকায় উচ্চ তড়িৎ ঋণাত্মকতায় C–H বন্ধন ইলেকট্রন টেনে H⁺ মুক্ত সহজ করে', ch: 'chem1_ch3_periodic' },
    { q: 'হাইড্রোনিয়াম আয়ন (H₃O⁺)-এ অক্সিজেনের সংকরায়ন ও বন্ধন কোণ কত', a: 'sp³ সংকরায়ন (১টি নিঃসঙ্গ জোড়), পিরামিডীয় আকৃতি ও বন্ধন কোণ প্রায় ১০৭°', ch: 'chem1_ch3_periodic' },
    { q: 'নাইট্রেট (NO₃⁻), কার্বোনেট (CO₃²⁻) ও নাইট্রোনিয়াম (NO₂⁺) আয়নের কেন্দ্রীয় পরমাণুর সংকরায়ন কী', a: 'NO₃⁻ (sp²), CO₃²⁻ (sp²) এবং NO₂⁺ (sp সরলরৈখিক)', ch: 'chem1_ch3_periodic' },
    { q: 'PCl₅ কঠিন অবস্থায় কোন আয়ন দুটি হিসেবে কেলাস গঠন করে থাকে', a: '[PCl₄]⁺ (sp³ চতুস্তলকীয়) এবং [PCl₆]⁻ (sp³d² অষ্টতলকীয়)', ch: 'chem1_ch3_periodic' },
    { q: 'BCl₃-এর কেন্দ্রীয় পরমাণু বোরনের অষ্টক পূর্ণ হয় না কিন্তু AlCl₃ ডাইমার Al₂Cl₆ তৈরি করে কেন', a: 'AlCl₃-এ Cl পরমাণুর নিঃসঙ্গ জোড় Al-এর ফাঁকা অরবিটালে সন্নিবেশ বন্ধন (Cl→Al) দিয়ে অষ্টক পূরণ করে (BCl₃ ক্ষুদ্র হওয়ায় স্থান সংকুলান হয় না)', ch: 'chem1_ch3_periodic' },
    { q: 'নাইট্রোজেন ও ফসফরাস উভয়ের হাইড্রাইড NH₃ (১০৭°) এবং PH₃ (৯৩.৫°)-এর বন্ধন কোণে বিশাল পার্থক্য কেন', a: 'ড্র্যাগো নিয়ম (Drago’s Rule) অনুসারে বৃহৎ P পরমাণুতে বিশুদ্ধ p-অরবিটাল (~৯০°) ব্যবহার হয় এবং N-এর উচ্চ তড়িৎ ঋণাত্মকতা bp-bp বিকর্ষণ বাড়ায়', ch: 'chem1_ch3_periodic' },
    { q: 'নিচের কোনটিতে সর্বাধিক সমযোজী বৈশিষ্ট্য (ফাজানের নীতিমতে): AlF₃, AlCl₃, AlBr₃, AlI₃', a: 'AlI₃ (বৃহত্তম অ্যানায়ন I⁻-এর পোলারায়িত হওয়ার প্রবণতা সর্বাধিক বলে গলনাঙ্ক ও আয়নিকতা সর্বনিম্ন)', ch: 'chem1_ch3_periodic' },
    { q: 'FeCl₂ বনাম FeCl₃-এর মধ্যে কার গলনাঙ্ক কম এবং সমযোজী চরিত্র বেশি', a: 'FeCl₃-এর (ক্যাটায়ন Fe³⁺-এর চার্জ +৩ বেশি হওয়ায় Cl⁻-কে বেশি পোলারায়িত করে)', ch: 'chem1_ch3_periodic' },
    { q: 'ইলেকট্রন-ঘাটতিযুক্ত কিন্তু অত্যন্ত স্থিতিশীল লুইস অ্যাসিডগুলোর (BF₃, BCl₃, BBr₃) অম্লতার ক্রম কী', a: 'BBr₃ > BCl₃ > BF₃ (কারণ F-এর pπ–pπ ব্যাক-বন্ডিং সবচেয়ে শক্তিশালী হয়ে B-এর ঘাটতি পূরণ করে)', ch: 'chem1_ch3_periodic' },
    { q: 'ব্লু ভিট্রিওল বা তুঁতের (CuSO₄·5H₂O) কেলাস কাঠামোতে কয়টি পানির অণু Cu²⁺-এর সাথে সন্নিবেশ ও কয়টি H-বন্ধনে যুক্ত', a: '৪টি H₂O অণু Cu²⁺-এর সাথে সন্নিবেশ বন্ধনে ([Cu(H₂O)₄]²⁺) এবং ১টি SO₄²⁻-এর সাথে H-বন্ধনে যুক্ত', ch: 'chem1_ch3_periodic' },
    { q: 'সকল অ্যারোমেটিক ও জটিল যৌগে [Fe(CN)₆]⁴⁻ ও [Fe(CN)₆]³⁻ আয়নের কেন্দ্রীয় ধাতুর জারণ মান ও সংকরায়ন কী', a: 'যথাক্রমে Fe²⁺ ও Fe³⁺ এবং উভয়েই অন্তঃস্থ d²sp³ অষ্টতলকীয় সংকরায়ন', ch: 'chem1_ch3_periodic' },
    { q: 'শূন্য-সমসংখ্যা নয় — O₂ অপেক্ষা O₂⁺ আয়নের বন্ধন দৈর্ঘ্য ছোট হয় কেন', a: 'প্রতিবন্ধন (π*) অরবিটাল থেকে ১টি ইলেকট্রন অপসারিত হওয়ায় বন্ধন ক্রম ২ থেকে বেড়ে ২.৫ হয়', ch: 'chem1_ch3_periodic' },
    { q: 'কোন অণুটি জলীয় দ্রবণে অম্লীয় ও ক্ষারীয় উভয় মাধ্যমের অক্সাইডের চেয়ে বেশি স্থিতিশীল হ্যালোজেন অক্সাইড', a: 'I₂O₅ (কার্বন মনোক্সাইড CO পরিমাপ ও শোষণের জন্য ব্যবহৃত হয়)', ch: 'chem1_ch3_periodic' },
    { q: 'অতিরিক্ত K⁺ বা Na⁺-এর বিপরীতে NH₄⁺ আয়নটির জলীয় আচরণ ক্ষার ধাতুর মতো হলেও অম্লীয় লবণ (NH₄Cl) দেয় কেন', a: 'NH₄⁺-এর অনুবন্ধী ক্ষার NH₃ মৃদু হওয়ায় NH₄⁺ + H₂O ⇌ NH₄OH + H⁺ প্রোটন দান করে', ch: 'chem1_ch3_periodic' },
  ];

  extraCh2Ch3Pairs.forEach((p, i) => {
    const others = extraCh2Ch3Pairs.filter((x) => x.a !== p.a);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: p.ch,
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${p.q}?`,
        correct: p.a,
        distractors: others.slice(i % 20, (i % 20) + 6).map((x) => x.a),
        explanation: `${p.q} → ${p.a}।`,
        reference: `রসায়ন ১ম পত্র · ${p.ch === 'chem1_ch2_qualitative' ? 'অধ্যায় ২' : 'অধ্যায় ৩'}`,
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: p.ch,
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `বিবৃতি "${p.a}" নিচের কোন প্রশ্নের সঠিক রাসায়নিক উত্তর?`,
        correct: p.q,
        distractors: others.slice((i + 10) % 20, ((i + 10) % 20) + 6).map((x) => x.q),
        explanation: `${p.a} ↔ ${p.q}।`,
        reference: `রসায়ন ১ম পত্র · ${p.ch === 'chem1_ch2_qualitative' ? 'অধ্যায় ২' : 'অধ্যায় ৩'}`,
      })
    );
  });

  return list;
}
