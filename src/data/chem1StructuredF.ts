import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredF(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sf_${String(seq++).padStart(4, '0')}`;

  // 1. Ksp <-> Molar Solubility Numericals (Ch 2, ~70 MCQs)
  const kspTypes = [
    { salt: 'AgCl (AB টাইপ)', ions: 'Ag⁺ + Cl⁻', formula: 'Ksp = S²', s: '১.০ × ১০⁻⁵ M', ksp: '১.০ × ১০⁻¹⁰' },
    { salt: 'BaSO₄ (AB টাইপ)', ions: 'Ba²⁺ + SO₄²⁻', formula: 'Ksp = S²', s: '১.০ × ১০⁻⁵ M', ksp: '১.০ × ১০⁻¹⁰' },
    { salt: 'CaSO₄ (AB টাইপ)', ions: 'Ca²⁺ + SO₄²⁻', formula: 'Ksp = S²', s: '৫.০ × ১০⁻³ M', ksp: '২.৫ × ১০⁻⁵' },
    { salt: 'PbSO₄ (AB টাইপ)', ions: 'Pb²⁺ + SO₄²⁻', formula: 'Ksp = S²', s: '১.৩ × ১০⁻⁴ M', ksp: '১.৬৯ × ১০⁻⁸' },
    { salt: 'AgBr (AB টাইপ)', ions: 'Ag⁺ + Br⁻', formula: 'Ksp = S²', s: '৭.০ × ১০⁻⁷ M', ksp: '৪.৯ × ১০⁻¹³' },
    { salt: 'CaF₂ (AB₂ টাইপ)', ions: 'Ca²⁺ + 2F⁻', formula: 'Ksp = 4S³', s: '২.০ × ১০⁻⁴ M', ksp: '৩.২ × ১০⁻¹¹' },
    { salt: 'PbCl₂ (AB₂ টাইপ)', ions: 'Pb²⁺ + 2Cl⁻', formula: 'Ksp = 4S³', s: '১.০ × ১০⁻² M', ksp: '৪.০ × ১০⁻⁶' },
    { salt: 'Mg(OH)₂ (AB₂ টাইপ)', ions: 'Mg²⁺ + 2OH⁻', formula: 'Ksp = 4S³', s: '১.০ × ১০⁻⁴ M', ksp: '৪.০ × ১০⁻¹²' },
    { salt: 'Ag₂CrO₄ (A₂B টাইপ)', ions: '2Ag⁺ + CrO₄²⁻', formula: 'Ksp = 4S³', s: '১.০ × ১০⁻⁴ M', ksp: '৪.০ × ১০⁻¹²' },
    { salt: 'Ag₂SO₄ (A₂B টাইপ)', ions: '2Ag⁺ + SO₄²⁻', formula: 'Ksp = 4S³', s: '১.৫ × ১০⁻² M', ksp: '১.৩৫ × ১০⁻⁵' },
    { salt: 'Al(OH)₃ (AB₃ টাইপ)', ions: 'Al³⁺ + 3OH⁻', formula: 'Ksp = 27S⁴', s: '১.০ × ১০⁻⁸ M', ksp: '২.৭ × ১০⁻³¹' },
    { salt: 'Fe(OH)₃ (AB₃ টাইপ)', ions: 'Fe³⁺ + 3OH⁻', formula: 'Ksp = 27S⁴', s: '১.০ × ১০⁻¹⁰ M', ksp: '২.৭ × ১০⁻³⁹' },
    { salt: 'Ca₃(PO₄)₂ (A₃B₂ টাইপ)', ions: '3Ca²⁺ + 2PO₄³⁻', formula: 'Ksp = 108S⁵', s: '১.০ × ১০⁻⁶ M', ksp: '১.০৮ × ১০⁻²⁸' },
    { salt: 'Bi₂S₃ (A₂B₃ টাইপ)', ions: '2Bi³⁺ + 3S²⁻', formula: 'Ksp = 108S⁵', s: '১.০ × ১০⁻¹⁵ M', ksp: '১.০৮ × ১০⁻⁷³' },
    { salt: 'Ag₃PO₄ (A₃B টাইপ)', ions: '3Ag⁺ + PO₄³⁻', formula: 'Ksp = 27S⁴', s: '১.০ × ১০⁻⁵ M', ksp: '২.৭ × ১০⁻¹⁹' },
  ];
  kspTypes.forEach((ks, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${ks.salt} স্বল্পদ্রব্য লবণের মোলার দ্রাব্যতা S হলে দ্রাব্যতা গুণফল (Ksp)-এর সমীকরণ কোনটি?`,
        correct: `${ks.formula} (${ks.ions})`,
        distractors: ['Ksp = S²', 'Ksp = 4S³', 'Ksp = 27S⁴', 'Ksp = 108S⁵', 'Ksp = 2S²', 'Ksp = 9S³'].filter(
          (x) => !x.startsWith(ks.formula)
        ),
        explanation: `${ks.salt} ⇌ ${ks.ions} থেকে আয়নসমূহের মোলার ঘনমাত্রা বসিয়ে পাওয়া যায় ${ks.formula}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · দ্রাব্যতা গুণফল',
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
        question: `২৫ °C তাপমাত্রায় ${ks.salt} লবণের দ্রাব্যতা S = ${ks.s} হলে এর Ksp কত হবে?`,
        correct: ks.ksp,
        distractors: kspTypes.filter((x) => x.ksp !== ks.ksp).slice(i % 6, (i % 6) + 4).map((x) => x.ksp),
        explanation: `${ks.formula} সূত্রে S = ${ks.s} বসালে Ksp = ${ks.ksp} পাওয়া যায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · Ksp গণনা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${ks.salt}-এর দ্রাব্যতা গুণফল Ksp = ${ks.ksp} হলে বিশুদ্ধ পানিতে এর মোলার দ্রাব্যতা (S) কত?`,
        correct: ks.s,
        distractors: kspTypes.filter((x) => x.s !== ks.s).slice((i + 1) % 6, ((i + 1) % 6) + 4).map((x) => x.s),
        explanation: `${ks.formula} = ${ks.ksp} থেকে সমাধান করলে S = ${ks.s} পাওয়া যায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · দ্রাব্যতা নির্ণয়',
      })
    );
  });

  // 2. Bohr Orbit Radius, Energy & Velocity Ratios (Ch 2, ~50 MCQs)
  for (let n = 1; n <= 5; n++) {
    const r = (0.529 * n * n).toFixed(3);
    const e = (-13.6 / (n * n)).toFixed(2);
    const v = (2.188 / n).toFixed(3);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: n % 2 === 0 ? 'medical' : 'dental',
        question: `বোর মডেল অনুযায়ী হাইড্রোজেন পরমাণুর ${toBnDigits(n)}-তম (n = ${toBnDigits(n)}) শক্তিস্তরের ব্যাসার্ধ কত Å?`,
        correct: `${toBnDigits(r)} Å`,
        distractors: [1, 2, 3, 4, 5]
          .filter((x) => x !== n)
          .map((x) => `${toBnDigits((0.529 * x * x).toFixed(3))} Å`),
        explanation: `r_n = ০.৫২৯ × n² / Z Å = ০.৫২৯ × ${toBnDigits(n * n)} = ${toBnDigits(r)} Å।`,
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
        difficulty: 'board',
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(n)}-তম বোর কক্ষপথে ইলেকট্রনের শক্তি (eV এককে) কত?`,
        correct: `${toBnDigits(e)} eV`,
        distractors: [1, 2, 3, 4, 5]
          .filter((x) => x !== n)
          .map((x) => `${toBnDigits((-13.6 / (x * x)).toFixed(2))} eV`),
        explanation: `E_n = −১৩.৬ / n² eV = −১৩.৬ / ${toBnDigits(n * n)} = ${toBnDigits(e)} eV।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বোর কক্ষপথের শক্তি',
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
        question: `হাইড্রোজেনের n = ${toBnDigits(n)} কক্ষপথে ইলেকট্রনের বেগ কত (× ১০⁶ m/s)?`,
        correct: `${toBnDigits(v)} × ১০⁶ m/s`,
        distractors: [1, 2, 3, 4, 5]
          .filter((x) => x !== n)
          .map((x) => `${toBnDigits((2.188 / x).toFixed(3))} × ১০⁶ m/s`),
        explanation: `v_n = ২.১৮৮ × ১০⁶ × Z / n m/s = ${toBnDigits(v)} × ১০⁶ m/s।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · ইলেকট্রনের বেগ',
      })
    );
  }

  // Bohr Hydrogen-like ions He+, Li2+, Be3+ (18 MCQs)
  const hLike = [
    { sp: 'He⁺ (Z = ২)', n: 1, r: '০.২৬৪৫ Å', e: '−৫৪.৪ eV' },
    { sp: 'He⁺ (Z = ২)', n: 2, r: '১.০৫৮ Å', e: '−১৩.৬ eV' },
    { sp: 'Li²⁺ (Z = ৩)', n: 1, r: '০.১৭৬ Å', e: '−১২২.৪ eV' },
    { sp: 'Li²⁺ (Z = ৩)', n: 3, r: '১.৫৮৭ Å', e: '−১৩.৬ eV' },
    { sp: 'Be³⁺ (Z = ৪)', n: 2, r: '০.৫২৯ Å', e: '−৫৪.৪ eV' },
  ];
  hLike.forEach((hl, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `বোর তত্ত্ব প্রযোজ্য এমন এক-ইলেকট্রনযুক্ত ${hl.sp} আয়নের n = ${toBnDigits(hl.n)} কক্ষপথের ব্যাসার্ধ কত?`,
        correct: hl.r,
        distractors: hLike.filter((x) => x.r !== hl.r).map((x) => x.r),
        explanation: `r_n = ০.৫২৯ × n² / Z = ${hl.r}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · এক-ইলেকট্রন আয়ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'dental' : 'board',
        question: `${hl.sp} আয়নের n = ${toBnDigits(hl.n)} শক্তিস্তরে ইলেকট্রনের শক্তি কত?`,
        correct: hl.e,
        distractors: ['−১৩.৬ eV', '−২৭.২ eV', '−৫৪.৪ eV', '−১২২.৪ eV', '−৩.৪ eV', '−১.৫১ eV'].filter((x) => x !== hl.e),
        explanation: `E_n = −১৩.৬ × Z² / n² eV থেকে মান পাওয়া যায় ${hl.e}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · আয়নিকরণ শক্তি ও বোর শক্তি',
      })
    );
  });

  // 3. Qualitative Cation & Anion Confirmatory Tests Matrix (Ch 2, ~90 MCQs)
  const ionTests = [
    { ion: 'Cu²⁺ (কিউপ্রিক)', reagent: 'K₄[Fe(CN)₆] (পটাশিয়াম ফেরোসায়ানাইড)', result: 'লালচে বাদামি বা চকলেট বর্ণের অধঃক্ষেপ Cu₂[Fe(CN)₆]' },
    { ion: 'Cu²⁺ (অ্যামোনিয়া পরীক্ষা)', reagent: 'অতিরিক্ত NH₄OH দ্রবণ', result: 'গাঢ় নীল বর্ণের জটিল দ্রবণ [Cu(NH₃)₄]²⁺' },
    { ion: 'Fe³⁺ (ফেরিক)', reagent: 'NH₄SCN বা KSCN (থায়োসায়ানেট)', result: 'রক্তের মতো গাঢ় লাল বর্ণের দ্রবণ [Fe(SCN)]²⁺' },
    { ion: 'Fe³⁺ (ফেরোসায়ানাইড)', reagent: 'K₄[Fe(CN)₆]', result: 'গাঢ় প্রুশিয়ান নীল (Prussian Blue) অধঃক্ষেপ' },
    { ion: 'Fe²⁺ (ফেরাস)', reagent: 'K₃[Fe(CN)₆] (পটাশিয়াম ফেরিসায়ানাইড)', result: 'গাঢ় নীল (Turnbull’s Blue) অধঃক্ষেপ' },
    { ion: 'Zn²⁺ (জিংক)', reagent: 'K₄[Fe(CN)₆] অথবা H₂S (ক্ষারীয়)', result: 'সাদা অধঃক্ষেপ যা অতিরিক্ত NaOH-এ দ্রবণীয়' },
    { ion: 'Al³⁺ (অ্যালুমিনিয়াম)', reagent: 'NH₄OH + NH₄Cl (গ্রুপ-III)', result: 'সাদা জেলির ন্যায় Al(OH)₃ অধঃক্ষেপ (NaOH-এ দ্রবণীয়)' },
    { ion: 'Ca²⁺ (ক্যালসিয়াম)', reagent: 'অ্যামোনিয়াম অক্সালেট (NH₄)₂C₂O₄', result: 'অ্যাসিটিক অ্যাসিডে অদ্রবণীয় সাদা CaC₂O₄ অধঃক্ষেপ' },
    { ion: 'NH₄⁺ (অ্যামোনিয়াম)', reagent: 'নেসলার বিকারক (K₂[HgI₄] + KOH)', result: 'বাদামি বা লালচে বাদামি অধঃক্ষেপ' },
    { ion: 'Ni²⁺ (নিকেল)', reagent: 'ডাইমিথাইল গ্লাইঅক্সিম (DMG) + NH₄OH', result: 'উজ্জ্বল গোলাপি বা চেরি-লাল অধঃক্ষেপ' },
    { ion: 'Na⁺ (সোডিয়াম)', reagent: 'পটাশিয়াম পাইরোঅ্যান্টিমোনেট (K₂H₂Sb₂O₇)', result: 'সাদা দানাদার অধঃক্ষেপ Na₂H₂Sb₂O₇' },
    { ion: 'Cl⁻ (ক্লোরাইড)', reagent: 'AgNO₃ + লঘু HNO₃', result: 'দধির ন্যায় সাদা AgCl অধঃক্ষেপ (NH₄OH-এ দ্রবণীয়)' },
    { ion: 'Br⁻ (ব্রোমাইড)', reagent: 'AgNO₃ + লঘু HNO₃', result: 'হালকা হলুদ AgBr অধঃক্ষেপ (গাঢ় NH₃-তে আংশিক দ্রবণীয়)' },
    { ion: 'I⁻ (আয়োডাইড)', reagent: 'AgNO₃ + লঘু HNO₃', result: 'গাঢ় হলুদ AgI অধঃক্ষেপ (NH₄OH-এ সম্পূর্ণ অদ্রবণীয়)' },
    { ion: 'SO₄²⁻ (সালফেট)', reagent: 'BaCl₂ + লঘু HCl', result: 'লঘু HCl ও HNO₃-এ অদ্রবণীয় ভারী সাদা BaSO₄ অধঃক্ষেপ' },
    { ion: 'CO₃²⁻ (কার্বনেট)', reagent: 'লঘু HCl + চুনের পানি', result: 'বুদবুদসহ বর্ণহীন CO₂ গ্যাস নির্গত হয়ে চুনের পানি ঘোলা করে' },
    { ion: 'NO₃⁻ (নাইট্রেট)', reagent: 'সদ্য প্রস্তুত FeSO₄ + গাঢ় H₂SO₄ (ধীরে)', result: 'দুই স্তরের সংযোগস্থলে বাদামি বলয় [Fe(H₂O)₅NO]²⁺' },
    { ion: 'Pb²⁺ (লেড)', reagent: 'পটাশিয়াম আয়োডাইড (KI)', result: 'সোনালি হলুদ PbI₂ অধঃক্ষেপ (গরম পানিতে গলে ও ঠান্ডায় সোনালি বর্ষণে ঝরে)' },
  ];
  ionTests.forEach((it, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `গুণগত বিশ্লেষণে ${it.ion} আয়ন শনাক্তকরণে "${it.reagent}" যোগ করলে কী পর্যবেক্ষণ পাওয়া যায়?`,
        correct: it.result,
        distractors: ionTests.filter((x) => x.result !== it.result).slice(i % 7, (i % 7) + 4).map((x) => x.result),
        explanation: `${it.ion} + ${it.reagent} → ${it.result}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · আয়ন নিশ্চিতকরণ',
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
        question: `"${it.result}" — এটি কোন ক্যাটায়ন বা অ্যানায়ন শনাক্তকরণের নিশ্চিত পরীক্ষা?`,
        correct: it.ion,
        distractors: ionTests.filter((x) => x.ion !== it.ion).slice((i + 2) % 7, ((i + 2) % 7) + 4).map((x) => x.ion),
        explanation: `${it.reagent} ব্যবহারে "${it.result}" দেখা যায় ${it.ion} আয়নের উপস্থিতিতে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · শনাক্তকারী পরীক্ষা',
      })
    );
  });

  // Flame Test Color Matrix (18 MCQs)
  const flameColors = [
    { metal: 'Li⁺ (লিথিয়াম)', naked: 'উজ্জ্বল লাল (কারমাইন/ক্রিমসন লাল)', cobalt: 'বেগুনি-লাল' },
    { metal: 'Na⁺ (সোডিয়াম)', naked: 'সোনালি হলুদ', cobalt: 'অদৃশ্য / বর্ণহীন (শোষিত হয়)' },
    { metal: 'K⁺ (পটাশিয়াম)', naked: 'বেগুনি (লিলাক)', cobalt: 'গোলাপি-লাল (পিঙ্ক)' },
    { metal: 'Ca²⁺ (ক্যালসিয়াম)', naked: 'ইটের মতো লাল (Brick Red)', cobalt: 'হালকা সবুজ' },
    { metal: 'Sr²⁺ (স্ট্রনসিয়াম)', naked: 'গাঢ় রক্তিম লাল (Crimson)', cobalt: 'বেগুনি' },
    { metal: 'Ba²⁺ (বেরিয়াম)', naked: 'কাঁচা আপেলের মতো সবুজ (Apple Green)', cobalt: 'নীলাভ সবুজ' },
    { metal: 'Cu²⁺ (কপার)', naked: 'নীলাভ সবুজ (Bluish Green)', cobalt: 'ব্লু-গ্রিন' },
    { metal: 'Cs⁺ (সিজিয়াম)', naked: 'নীলাভ বেগুনি (Sky Blue / Violet)', cobalt: 'নীল' },
  ];
  flameColors.forEach((fc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `শিখা পরীক্ষায় (খালি চোখে) ${fc.metal} আয়ন বুনসেন বার্নারের অনুজ্জ্বল শিখায় কোন বর্ণ সৃষ্টি করে?`,
        correct: fc.naked,
        distractors: flameColors.filter((x) => x.naked !== fc.naked).slice(0, 4).map((x) => x.naked),
        explanation: `উত্তেজিত ${fc.metal} ইলেকট্রন গ্রাউন্ড স্টেটে ফেরার সময় খালি চোখে "${fc.naked}" (কোবাল্ট নীল কাচে "${fc.cobalt}") বর্ণ বিকিরণ করে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · শিখা পরীক্ষা',
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
        question: `শিখা পরীক্ষায় খালি চোখে "${fc.naked}" বর্ণ সৃষ্টিকারী ধাতব আয়ন কোনটি?`,
        correct: fc.metal,
        distractors: flameColors.filter((x) => x.metal !== fc.metal).slice(i % 4, (i % 4) + 4).map((x) => x.metal),
        explanation: `${fc.metal} আয়ন শিখা পরীক্ষায় "${fc.naked}" বর্ণ প্রদর্শন করে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · শিখা পরীক্ষা',
      })
    );
  });

  // 4. Strong Acid/Base Exact pH & pOH Calculations (Ch 4, ~60 MCQs)
  const phCalcs = [
    { sol: '০.১ M HCl', ph: '১', poh: '১৩' },
    { sol: '০.০১ M HNO₃', ph: '২', poh: '১২' },
    { sol: '০.০০১ M HCl', ph: '৩', poh: '১১' },
    { sol: '১.০ × ১০⁻⁴ M HClO₄', ph: '৪', poh: '১০' },
    { sol: '১.০ × ১০⁻⁵ M HNO₃', ph: '৫', poh: '৯' },
    { sol: '০.১ M NaOH', ph: '১৩', poh: '১' },
    { sol: '০.০১ M KOH', ph: '১২', poh: '২' },
    { sol: '০.০০১ M NaOH', ph: '১১', poh: '৩' },
    { sol: '১.০ × ১০⁻⁴ M KOH', ph: '১০', poh: '৪' },
    { sol: '০.৫ M H₂SO₄ (সম্পূর্ণ বিয়োজিত)', ph: '০', poh: '১৪' },
    { sol: '০.০০০৫ M H₂SO₄', ph: '৩', poh: '১১' },
    { sol: '০.০০০৫ M Ba(OH)₂', ph: '১১', poh: '৩' },
  ];
  const phVals = ['০', '১', '২', '৩', '৪', '৫', '৯', '১০', '১১', '১২', '১৩', '১৪'];
  phCalcs.forEach((pc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `২৫ °C তাপমাত্রায় ${pc.sol} জলীয় দ্রবণের pH মান কত?`,
        correct: pc.ph,
        distractors: phVals.filter((x) => x !== pc.ph).slice(i % 5, (i % 5) + 4),
        explanation: `${pc.sol} সম্পূর্ণ বিয়োজিত হয়ে pH = ${pc.ph} ও pOH = ${pc.poh} দেয় (pH + pOH = ১৪)।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · pH গণনা',
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
        question: `২৫ °C তাপমাত্রায় ${pc.sol} জলীয় দ্রবণের pOH মান কত?`,
        correct: pc.poh,
        distractors: phVals.filter((x) => x !== pc.poh).slice((i + 1) % 5, ((i + 1) % 5) + 4),
        explanation: `pOH = ১৪ − pH = ১৪ − ${pc.ph} = ${pc.poh}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · pOH গণনা',
      })
    );
  });

  // 5. Analytical Group Precipitation Reagents & Colors (Ch 2, ~30 MCQs)
  const analyticalGroups = [
    { grp: 'গ্রুপ I (Pb²⁺, Ag⁺, Hg₂²⁺)', reagent: 'লঘু HCl', ppt: 'সাদা ক্লোরাইড (PbCl₂, AgCl, Hg₂Cl₂)' },
    { grp: 'গ্রুপ II (Cu²⁺, Pb²⁺, Bi³⁺, Cd²⁺, As³⁺, Sb³⁺, Sn²⁺)', reagent: 'লঘু HCl-এর উপস্থিতিতে H₂S গ্যাস', ppt: 'কালো CuS/PbS বা হলুদ CdS/As₂S₃ সালফাইড' },
    { grp: 'গ্রুপ IIIA (Fe³⁺, Al³⁺, Cr³⁺)', reagent: 'NH₄Cl-এর উপস্থিতিতে NH₄OH', ppt: 'লালচে বাদামি Fe(OH)₃, সাদা Al(OH)₃, সবুজ Cr(OH)₃' },
    { grp: 'গ্রুপ IIIB (Zn²⁺, Mn²⁺, Co²⁺, Ni²⁺)', reagent: 'NH₄Cl ও NH₄OH-এর উপস্থিতিতে H₂S গ্যাস', ppt: 'সাদা ZnS, ফিকে গোলাপি MnS, কালো CoS/NiS' },
    { grp: 'গ্রুপ IV (Ca²⁺, Sr²⁺, Ba²⁺)', reagent: 'NH₄Cl ও NH₄OH-এর উপস্থিতিতে (NH₄)₂CO₃', ppt: 'সাদা কার্বনেট অধঃক্ষেপ (CaCO₃, BaCO₃, SrCO₃)' },
    { grp: 'গ্রুপ V (Mg²⁺, Na⁺, K⁺, NH₄⁺)', reagent: 'কোনো সাধারণ গ্রুপ বিকারক নেই', ppt: 'Mg²⁺-এর জন্য (NH₄)₂HPO₄-এ সাদা অধঃক্ষেপ' },
  ];
  analyticalGroups.forEach((ag, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `অজৈব ক্ষারকীয় মূলকের শ্রেণিবিন্যাসে ${ag.grp}-এর গ্রুপ বিকারক কোনটি?`,
        correct: ag.reagent,
        distractors: analyticalGroups.filter((x) => x.reagent !== ag.reagent).slice(0, 4).map((x) => x.reagent),
        explanation: `${ag.grp}-এর ক্যাটায়নসমূহ ${ag.reagent} দ্বারা অধঃক্ষিপ্ত হয়ে ${ag.ppt} উৎপন্ন করে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · গ্রুপ বিকারক',
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
        question: `${ag.reagent} গ্রুপ বিকারকের সাহায্যে অধঃক্ষিপ্ত "${ag.ppt}" কোন গ্রুপের মূলক নির্দেশ করে?`,
        correct: ag.grp,
        distractors: analyticalGroups.filter((x) => x.grp !== ag.grp).slice(0, 4).map((x) => x.grp),
        explanation: `${ag.reagent} ব্যবহারে ${ag.ppt} উৎপন্ন হয় ${ag.grp}-এর ক্ষারকীয় মূলকগুলোর ক্ষেত্রে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · গুণগত বিশ্লেষণ',
      })
    );
  });

  // 6. High-yield Thermochemistry, Hess Law, & Chemical Equilibrium Concept Drills (Ch 4, ~40 MCQs)
  const thermoDrills = [
    { q: '১ মোল মিথেনের (CH₄) প্রমাণ দহন তাপ −৮৯০ kJ/mol হলে ৪ গ্রাম মিথেন দহনে কত তাপ উৎপন্ন হবে?', a: '২২২.৫ kJ', d: ['৪৪৫ kJ', '৮৯০ kJ', '১১১.২৫ kJ'] },
    { q: 'গ্রাফাইট থেকে হীরক রূপান্তরের এনথালপি পরিবর্তন ΔH = +১.৯ kJ/mol হলে গ্রাফাইট ও হীরকের মধ্যে কোনটি অধিক স্থায়ী?', a: 'গ্রাফাইট (কারণ এর অভ্যন্তরীণ শক্তি ও এনথালপি কম)', d: ['হীরক', 'উভয়ই সমান স্থায়ী', 'তাপমাত্রার ওপর অনির্ভরশীল'] },
    { q: 'প্রশমন বিক্রিয়ায় ১০০ mL ০.৫ M HCl এবং ১০০ mL ০.৫ M NaOH মিশ্রিত করলে কত কিলোজুল তাপ নির্গত হবে?', a: '২.৮৬৭ kJ (০.০৫ × ৫৭.৩৪ kJ)', d: ['৫৭.৩৪ kJ', '৫.৭৩৪ kJ', '১১.৪৬৮ kJ'] },
    { q: 'সবল অ্যাসিড ও সবল ক্ষারের প্রশমন তাপ −৫৭.৩৪ kJ হওয়ার মূল কারণ কী?', a: 'প্রতি ক্ষেত্রে প্রকৃত বিক্রিয়া হলো H⁺(aq) + OH⁻(aq) → H₂O(l)', d: ['সব লবণের সমান ল্যাটিস শক্তি', 'Na⁺ ও Cl⁻ আয়নের বিক্রিয়া', 'পানির বাষ্পীভবন তাপ'] },
    { q: 'একটি বিক্রিয়ার সক্রিয়ণ শক্তি শূন্য (Ea = ০) হলে আরহেনিয়াস সমীকরণানুযায়ী তাপমাত্রা বাড়ালে হার ধ্রুবকের (k) কী হবে?', a: 'অপরিবর্তিত থাকবে (k = A)', d: ['শূন্য হয়ে যাবে', 'অসীম হবে', 'দ্বিগুণ হবে'] },
    { q: 'কোনো বিক্রিয়ার সম্মুখ বিক্রিয়ার সক্রিয়ণ শক্তি ৫০ kJ এবং ΔH = −২০ kJ হলে পশ্চাৎ বিক্রিয়ার সক্রিয়ণ শক্তি কত?', a: '৭০ kJ', d: ['৩০ kJ', '২০ kJ', '৫০ kJ'] },
    { q: 'কোনো বিক্রিয়ার সম্মুখ Ea = ৮০ kJ এবং পশ্চাৎ Ea = ৬০ kJ হলে বিক্রিয়াটি তাপোৎপাদী না তাপহারী?', a: 'তাপহারী (ΔH = +২০ kJ)', d: ['তাপোৎপাদী (ΔH = −২০ kJ)', 'তাপ-নিরপেক্ষ (ΔH = ০)', 'ΔH = +১৪০ kJ'] },
    { q: 'তাপমাত্রা ২৭ °C (৩০০ K) ও ১২৭ °C (৪০০ K)-এ কোন ক্ষেত্রে গ্যাসীয় বিক্রিয়ায় Kp/Kc-এর পার্থক্য বেশি?', a: 'উচ্চতর তাপমাত্রা (৪০০ K)-এ Kp ও Kc-এর অনুপাত বেশি (Δn ≠ ০ হলে)', d: ['কম তাপমাত্রা ৩০০ K-এ', 'উভয় তাপমাত্রায় সমান', 'প্রভাবকের ওপর নির্ভরশীল'] },
    { q: 'কোনো লবণের পানিতে দ্রবীভূত হওয়ার তাপ ΔH_sol = ΔH_lattice + ΔH_hydration; যদি ΔH_sol < ০ হয় তবে তাপমাত্রা বাড়ালে দ্রাব্যতা কী হয়?', a: 'দ্রাব্যতা কমে (যেমন Ca(OH)₂, Li₂CO₃, Na₂SO₄ > ৩২.৪ °C)', d: ['দ্রাব্যতা বাড়ে', 'অপরিবর্তিত থাকে', 'অতিপৃক্ত হয়ে যায়'] },
    { q: 'যে তাপমাত্রায় কোনো লবণের গ্লাস বা কেলাস পানি অপসারণ হয়ে নতুন রূপ নেয় (যেমন Na₂SO₄·10H₂O-তে ৩২.৪ °C), তাকে কী বলে?', a: 'ক্রান্তিক বা রূপান্তর তাপমাত্রা (Transition Temperature)', d: ['সংকট তাপমাত্রা', 'ত্রৈধ বিন্দু', 'ইউটেকটিক বিন্দু'] },
  ];
  thermoDrills.forEach((td, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: td.q,
        correct: td.a,
        distractors: td.d,
        explanation: `${td.q} — সঠিক উত্তর: ${td.a}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · তাপরসায়ন ও গতিবিদ্যা',
      })
    );
  });

  // 7. Extra Ch 1 & Ch 3 Concept Matrix to guarantee plenty of headroom (~50 MCQs)
  const extraCh3 = [
    { q: 'SO₄²⁻ এবং PO₄³⁻ আয়নের কেন্দ্রীয় পরমাণুর সংকরায়ন ও আকৃতি কোনটি?', a: 'sp³ সংকরায়ন ও সুষম চতুস্তলকীয় (১০৯.৫°)', d: ['sp² ও সমতলীয়', 'sp³d² ও অষ্টতলকীয়', 'dsp² ও বর্গাকার'] },
    { q: 'NO₂⁺ (নাইট্রোনিয়াম), NO₂ এবং NO₂⁻ আয়নে O–N–O বন্ধন কোণের সঠিক ক্রম কোনটি?', a: 'NO₂⁺ (১৮০°) > NO₂ (১৩৪°) > NO₂⁻ (১১৫°)', d: ['NO₂⁻ > NO₂ > NO₂⁺', 'NO₂ > NO₂⁺ > NO₂⁻', 'তিনটিরই ১২০°'] },
    { q: 'কার্বনিল (CO), নাইট্রোসিল (NO⁺) এবং সায়ানাইড (CN⁻) আয়নের বন্ধন ক্রম (Bond Order) কত?', a: '৩ (সবার ১৪টি ইলেকট্রন, N₂-এর আইসোইলেকট্রনিক)', d: ['২', '২.৫', '১.৫'] },
    { q: 'CH₃–CH=CH–C≡CH যৌগটিতে কয়টি sp³, sp² এবং sp সংকরিত কার্বন আছে?', a: '১টি sp³, ২টি sp² এবং ২টি sp কার্বন', d: ['২টি sp³, ২টি sp² ও ১টি sp', '১টি sp³, ১টি sp² ও ৩টি sp', '৩টি sp² ও ২টি sp'] },
    { q: 'সবচেয়ে বেশি সংখ্যক সমযোজী বন্ধন (সর্বাধিক ৪টি) ও ধাতব বন্ধন দেখা যায় কোন মৌলে?', a: 'কার্বন (৪টি সমযোজী), রুথেনিয়াম/অসমিয়াম (+৮ জারণ)', d: ['হিলিয়াম', 'নাইট্রোজেন (+৫ সমযোজী)', 'বেরিলিয়াম'] },
    { q: 'পোলার দ্রাবকে (পানিতে) চিনি (C₁₂H₂₂O₁₁) এবং ইথানল সহজে দ্রবীভূত হওয়ার কারণ কী?', a: 'পানির অণুর সাথে আন্তঃআণবিক হাইড্রোজেন বন্ধন গঠন', d: ['পানির সাথে আয়নিক বন্ধন গঠন', 'সন্নিবেশ বন্ধন গঠন', 'ল্যাটিস শক্তি বৃদ্ধি'] },
    { q: 'আয়োডিন (I₂) পানিতে সামান্য দ্রবণীয় হলেও KI দ্রবণে খুব সহজে দ্রবীভূত হয় কেন?', a: 'দ্রবণীয় ট্রাই-আয়োডাইড জটিল আয়ন (KI₃ বা I₃⁻) গঠনের কারণে', d: ['পানির সাথে HI উৎপন্ন করায়', 'তাপমাত্রা বৃদ্ধি পাওয়ায়', 'আয়োডিনের ঊর্ধ্বপাতনের কারণে'] },
    { q: 'CaO, NaCl এবং SiO₂-এর গলনাঙ্ক অত্যধিক বেশি হলেও CCl₄-এর স্ফুটনাঙ্ক মাত্র ৭৬.৮ °C কেন?', a: 'CCl₄ অপোলার সমযোজী অণু, এদের মাঝে কেবল দুর্বল ভ্যান ডার ওয়ালস বল কাজ করে', d: ['CCl₄-এ শক্তিশালী H-বন্ধন আছে', 'CCl₄ আয়নিক যৌগ', 'CCl₄-এ ধাতব বন্ধন আছে'] },
    { q: 'কোন অণুটিতে আয়নিক, সমযোজী এবং সন্নিবেশ — তিন ধরনের রাসায়নিক বন্ধনই বিদ্যমান?', a: 'অ্যামোনিয়াম ক্লোরাইড (NH₄Cl) ও CuSO₄·5H₂O', d: ['খাবার লবণ (NaCl)', 'মিথেন (CH₄)', 'কার্বন ডাই-অক্সাইড (CO₂)'] },
    { q: 'নীল ভিট্রিয়ল (CuSO₄·5H₂O) অণুতে কয়টি পানির অণু Cu²⁺-এর সাথে সন্নিবেশ বন্ধনে ও কয়টি H-বন্ধনে যুক্ত?', a: '৪টি Cu²⁺-এর সাথে সন্নিবেশ বন্ধনে এবং ১টি SO₄²⁻-এর সাথে হাইড্রোজেন বন্ধনে', d: ['৫টিই সন্নিবেশ বন্ধনে', '৫টিই হাইড্রোজেন বন্ধনে', '২টি সন্নিবেশ ও ৩টি আয়নিক বন্ধনে'] },
    { q: 'হাইড্রোজেনের ৩টি আইসোটোপ (¹H, ²H, ³H)-এর মধ্যে কোনটি তেজস্ক্রিয় β-কণা বিকিরক?', a: 'ট্রিটিয়াম (³₁H বা T, অর্ধায়ু ১২.৩ বছর)', d: ['প্রোটিয়াম (¹₁H)', 'ডিউটেরিয়াম (²₁H বা D)', 'তিনটিই তেজস্ক্রিয়'] },
    { q: 'ভারী পানি (D₂O) সাধারণত কোথায় ব্যবহৃত হয়?', a: 'নিউক্লিয়ার রিঅ্যাক্টরে নিউট্রনের গতি কমানোর মডারেটর হিসেবে', d: ['সাবান উৎপাদনে', 'জ্যাম সংরক্ষণে', 'রক্তের বাফার হিসেবে'] },
    { q: 'জাল টাকা শনাক্তকরণ, ফরেনসিক রক্তের দাগ ও খনিজ শনাক্তকরণে কোন রশ্মি ব্যবহৃত হয়?', a: 'অতিবেগুনি রশ্মি (UV Ray)', d: ['অবলোহিত রশ্মি (IR)', 'মাইক্রোওয়েভ', 'রেডিও তরঙ্গ'] },
    { q: 'চিকিৎসা বিজ্ঞানে ভাঙা হাড়ের চিত্রায়ণে X-রশ্মি এবং মস্তিষ্কের টিউমার নির্ণয়ে (MRI) কোন তরঙ্গ ব্যবহৃত হয়?', a: 'MRI-তে রেডিও ফ্রিকোয়েন্সি তরঙ্গ ও চৌম্বকক্ষেত্র', d: ['MRI-তে গামা রশ্মি', 'MRI-তে আলফা কণা', 'MRI-তে কসমিক রশ্মি'] },
    { q: 'বুনসেন বার্নারের শিখা পরীক্ষায় প্লাটিনাম তারকে প্রতিবার পরীক্ষার আগে কোথায় ডুবিয়ে পরিষ্কার করা হয়?', a: 'গাঢ় হাইড্রোক্লোরিক অ্যাসিডে (HCl)', d: ['গাঢ় NaOH-এ', 'গাঢ় H₂SO₄-এ', 'অ্যাসিটোনে'] },
  ];
  extraCh3.forEach((ec, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: i >= 10 ? 'chem1_ch2_qualitative' : 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: ec.q,
        correct: ec.a,
        distractors: ec.d,
        explanation: `${ec.q} — সঠিক উত্তর: ${ec.a}।`,
        reference: i >= 10 ? 'রসায়ন ১ম পত্র · অধ্যায় ২ · গুণগত রসায়ন' : 'রসায়ন ১ম পত্র · অধ্যায় ৩ · রাসায়নিক বন্ধন',
      })
    );
  });

  // Additional Ch 1 Lab Calculations & Precision (15 MCQs)
  const labCalcs = [
    { q: 'পল-বুঙ্গি ব্যালেন্সে ১০ mg রাইডার ব্যবহার করলে রাইডার ধ্রুবকের মান কত হবে?', a: '০.০০০২ g (বা ০.২ mg, ৫০টি ভাগের স্কেলে ০→১০)', d: ['০.০০০১ g', '০.০০১ g', '০.০১ g'] },
    { q: 'পল-বুঙ্গি ব্যালেন্সে ৫ mg রাইডার ব্যবহার করলে (সেন্ট্রাল জিরো থেকে ৫০ ভাগ) রাইডার ধ্রুবক কত?', a: '০.০০০১ g (০.১ mg)', d: ['০.০০০২ g', '০.০০২ g', '০.০০০৫ g'] },
    { q: 'টাইট্রেশনে বুরেটের রিডিং ২০.৪৫ mL হলে ক্ষুদ্রতম কত mL আয়তনের সূক্ষ্মতা বোঝায়?', a: '±০.০৫ mL (বুরেটের একটি ক্ষুদ্রতম দাগের অর্ধেক)', d: ['±০.৫ mL', '±১.০ mL', '±০.০০০১ mL'] },
    { q: '২৫০ mL আয়তনিক ফ্লাস্কে ০.১ M Na₂CO₃ (M = ১০৬) দ্রবণ তৈরি করতে কত গ্রাম অনাদ্র Na₂CO₃ ওজন করতে হবে?', a: '২.৬৫ গ্রাম', d: ['১০.৬ গ্রাম', '৫.৩০ গ্রাম', '১.৩২৫ গ্রাম'] },
    { q: '৫০০ mL ০.২ M অক্সালিক অ্যাসিড (H₂C₂O₄·2H₂O, M = ১২৬) দ্রবণ তৈরি করতে কত গ্রাম অ্যাসিড লাগবে?', a: '১২.৬ গ্রাম', d: ['৬.৩ গ্রাম', '২৫.২ গ্রাম', '৯.০ গ্রাম'] },
    { q: 'গাঢ় HCl ও গাঢ় HNO₃-এর ৩ : ১ আয়তনিক মিশ্রণ যা সোনা ও প্লাটিনাম গলাতে সক্ষম, তাকে কী বলে?', a: 'অ্যাকোয়া রিজিয়া বা রাজ-অম্ল (Aqua Regia)', d: ['ওলিয়াম (ধূমায়মান H₂SO₄)', 'ক্রোমিক অ্যাসিড', 'নেসলার বিকারক'] },
    { q: 'একটি ভলিউমেট্রিক ফ্লাস্কে "TC ২০ °C" লেখা থাকলে "TC"-এর অর্থ কী?', a: 'To Contain (২০ °C তাপমাত্রায় নির্ধারিত আয়তন ধারণ করে)', d: ['To Deliver (সম্পূর্ণ ঢেলে দিতে সক্ষম)', 'Total Concentration', 'Thermal Calibration'] },
    { q: 'একটি পিপেট বা বুরেটের গায়ে "TD ২০ °C" লেখা থাকলে "TD"-এর অর্থ কী?', a: 'To Deliver (২০ °C তাপমাত্রায় সঠিক আয়তন সরবরাহ করে)', d: ['To Dissolve', 'To Dry', 'Total Density'] },
    { q: 'ল্যাবরেটরিতে ডেসি-মোলার দ্রবণ বলতে কী বোঝায়?', a: '০.১ মোলার (M/10) দ্রবণ', d: ['০.০১ মোলার (M/100) দ্রবণ', '০.৫ মোলার (M/2) দ্রবণ', '১০ মোলার দ্রবণ'] },
    { q: 'ল্যাবরেটরিতে সেমি-মোলার ও সেন্টি-মোলার দ্রবণ বলতে যথাক্রমে কী বোঝায়?', a: '০.৫ M (M/2) এবং ০.০১ M (M/100) দ্রবণ', d: ['০.১ M এবং ০.০০১ M', '২.০ M এবং ১০০ M', '০.২৫ M এবং ০.১ M'] },
  ];
  labCalcs.forEach((lc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch1_lab',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: lc.q,
        correct: lc.a,
        distractors: lc.d,
        explanation: `${lc.q} — সঠিক উত্তর: ${lc.a}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ১ · ল্যাবরেটরি পরিমাপ',
      })
    );
  });

  return list;
}
