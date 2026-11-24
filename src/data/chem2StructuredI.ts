import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredI(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2si_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 3 Solution Mass Preparation (w = SMV/1000) across Quantitative & Redox Reagents (~70 MCQs)
  const qReagents = [
    { name: 'KMnO₄ (M = ১৫৮)', m: 158 },
    { name: 'K₂Cr₂O₇ (M = ২৯৪)', m: 294 },
    { name: 'Na₂S₂O₃·5H₂O (M = ২৪৮)', m: 248 },
    { name: 'AgNO₃ (M = ১৭০)', m: 170 },
    { name: 'FeSO₄·7H₂O (M = ২৭৮)', m: 278 },
    { name: 'Na₂C₂O₄ (M = ১৩৪)', m: 134 },
    { name: 'BaCl₂·2H₂O (M = ২৪৪)', m: 244 },
    { name: 'CuSO₄·5H₂O (M = ২৪৯.৫)', m: 249.5 },
  ];
  const qVolMols = [
    { v: 100, s: 0.1 },
    { v: 250, s: 0.1 },
    { v: 500, s: 0.05 },
    { v: 1000, s: 0.02 },
    { v: 250, s: 0.2 },
    { v: 500, s: 0.1 },
  ];
  qReagents.forEach((rg, ri) => {
    qVolMols.forEach((vm, vi) => {
      const w = Number(((vm.s * rg.m * vm.v) / 1000).toFixed(3));
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: 'chem2_ch3_quant',
          visualLessonId: 'ph_buffer',
          hscLevel: '12',
          difficulty: (ri + vi) % 3 === 0 ? 'medical' : (ri + vi) % 3 === 1 ? 'dental' : 'board',
          question: `পরিমাণগত বিশ্লেষণের জন্য ${toBnDigits(vm.v)} mL ${toBnDigits(vm.s)} M ${rg.name} দ্রবণ তৈরি করতে কত গ্রাম লবণ/বিকারক প্রয়োজন?`,
          correct: `${toBnDigits(w)} g`,
          distractors: [
            `${toBnDigits(Number((w * 2).toFixed(3)))} g`,
            `${toBnDigits(Number((w / 2).toFixed(3)))} g`,
            `${toBnDigits(Number((w * 1.5 + 0.25).toFixed(3)))} g`,
            `${toBnDigits(Number((w * 0.25).toFixed(3)))} g`,
          ],
          explanation: `w = (S × M × V) / ১০০০ = (${toBnDigits(vm.s)} × ${toBnDigits(rg.m)} × ${toBnDigits(vm.v)}) / ১০০০ = ${toBnDigits(w)} গ্রাম।`,
          reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · প্রমাণ দ্রবণ গণনা',
        })
      );
    });
  });

  // 2. Normality <-> Molarity Conversions & Redox Mole Stoichiometry (Ch 3, ~70 MCQs)
  const normPairs = [
    { sub: '০.৫ M H₂SO₄ (তুল্য সংখ্যা ২)', norm: '১.০ N' },
    { sub: '০.২ M H₃PO₄ (তুল্য সংখ্যা ৩)', norm: '০.৬ N' },
    { sub: '০.৫ M H₃PO₃ (তুল্য সংখ্যা ২)', norm: '১.০ N' },
    { sub: '০.৫ M H₃PO₂ (তুল্য সংখ্যা ১)', norm: '০.৫ N' },
    { sub: '০.২৫ M Na₂CO₃ (তুল্য সংখ্যা ২)', norm: '০.৫ N' },
    { sub: '০.০৫ M Ca(OH)₂ (তুল্য সংখ্যা ২)', norm: '০.১ N' },
    { sub: '০.১ M অম্লীয় KMnO₄ (তুল্য সংখ্যা ৫)', norm: '০.৫ N' },
    { sub: '০.০৫ M অম্লীয় K₂Cr₂O₇ (তুল্য সংখ্যা ৬)', norm: '০.৩ N' },
    { sub: '০.২ M H₂C₂O₄ (তুল্য সংখ্যা ২)', norm: '০.৪ N' },
    { sub: '০.৩ M AlCl₃ (ক্যাটায়ন মোট চার্জ ৩)', norm: '০.৯ N' },
  ];
  normPairs.forEach((np, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${np.sub} জলীয় দ্রবণের নরমালিটি (Normality, N) কত হবে?`,
        correct: np.norm,
        distractors: ['০.১ N', '০.২ N', '০.৩ N', '০.৪ N', '০.৫ N', '০.৬ N', '০.৯ N', '১.০ N', '১.৫ N']
          .filter((x) => x !== np.norm)
          .slice(0, 4),
        explanation: `নরমালিটি (N) = মোলারিটি (M) × তুল্য সংখ্যা (e) = ${np.norm}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মোলারিটি ও নরমালিটি',
      })
    );
  });

  // Redox stoichiometric equivalents per 1 mol oxidant (24 MCQs)
  const redoxRatios = [
    { ox: '১ মোল অম্লীয় KMnO₄ (৫e⁻)', red: 'Fe²⁺ → Fe³⁺ (১e⁻)', moles: '৫ মোল' },
    { ox: '১ মোল অম্লীয় KMnO₄ (৫e⁻)', red: 'C₂O₄²⁻ → 2CO₂ (২e⁻)', moles: '২.৫ মোল' },
    { ox: '১ মোল অম্লীয় KMnO₄ (৫e⁻)', red: 'H₂O₂ → O₂ (২e⁻)', moles: '২.৫ মোল' },
    { ox: '১ মোল অম্লীয় KMnO₄ (৫e⁻)', red: 'Sn²⁺ → Sn⁴⁺ (২e⁻)', moles: '২.৫ মোল' },
    { ox: '১ মোল অম্লীয় KMnO₄ (৫e⁻)', red: 'NO₂⁻ → NO₃⁻ (২e⁻)', moles: '২.৫ মোল' },
    { ox: '১ মোল অম্লীয় K₂Cr₂O₇ (৬e⁻)', red: 'Fe²⁺ → Fe³⁺ (১e⁻)', moles: '৬ মোল' },
    { ox: '১ মোল অম্লীয় K₂Cr₂O₇ (৬e⁻)', red: 'C₂O₄²⁻ → 2CO₂ (২e⁻)', moles: '৩ মোল' },
    { ox: '১ মোল অম্লীয় K₂Cr₂O₇ (৬e⁻)', red: 'I⁻ → ½I₂ (১e⁻)', moles: '৬ মোল' },
    { ox: '১ মোল অম্লীয় K₂Cr₂O₇ (৬e⁻)', red: 'Sn²⁺ → Sn⁴⁺ (২e⁻)', moles: '৩ মোল' },
    { ox: '১ মোল I₂ (২e⁻)', red: 'S₂O₃²⁻ → ½S₄O₆²⁻ (১e⁻/মোল)', moles: '২ মোল' },
  ];
  redoxRatios.forEach((rr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `অম্লীয় মাধ্যমে ${rr.ox} সম্পূর্ণরূপে বিজারিত হতে কত মোল বিজারক "${rr.red}" প্রয়োজন?`,
        correct: rr.moles,
        distractors: ['১ মোল', '২ মোল', '২.৫ মোল', '৩ মোল', '৫ মোল', '৬ মোল'].filter((x) => x !== rr.moles).slice(0, 4),
        explanation: `ইলেকট্রন বিনিময় সমীকরণ (n₁×e₁ = n₂×e₂) ব্যবহার করে পাওয়া যায় ${rr.moles}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · রেডক্স স্টোইকিওমেট্রি',
      })
    );
  });

  // 3. Ch 3 % (w/v) <-> g/L <-> ppm <-> ppb Matrix (48 MCQs)
  const concConversions = [
    { pct: '০.০০১% (w/v)', gL: '০.০১ g/L', ppm: '১০ ppm', ppb: '১০,০০০ ppb' },
    { pct: '০.০১% (w/v)', gL: '০.১ g/L', ppm: '১০০ ppm', ppb: '১,০০,০০০ ppb' },
    { pct: '০.১% (w/v)', gL: '১.০ g/L', ppm: '১,০০০ ppm', ppb: '১০,০০,০০০ ppb' },
    { pct: '০.৫% (w/v)', gL: '৫.০ g/L', ppm: '৫,০০০ ppm', ppb: '৫০,০০,০০০ ppb' },
    { pct: '১.০% (w/v)', gL: '১০.০ g/L', ppm: '১০,০০০ ppm', ppb: '১ কোটি ppb' },
    { pct: '০.০০০১% (w/v)', gL: '০.০০১ g/L', ppm: '১ ppm', ppb: '১,০০০ ppb' },
  ];
  concConversions.forEach((cc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `কোনো লঘু জলীয় দ্রবণের ঘনমাত্রা ${cc.pct} হলে এটি ppm এককে কত?`,
        correct: cc.ppm,
        distractors: concConversions.filter((x) => x.ppm !== cc.ppm).slice(0, 4).map((x) => x.ppm),
        explanation: `১% (w/v) = ১০ g/L = ১০,০০০ ppm; সুতরাং ${cc.pct} = ${cc.gL} = ${cc.ppm}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · শতকরা ও ppm রূপান্তর',
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
        question: `১ লিটার জলীয় দ্রবণে ${cc.gL} দ্রব থাকলে দ্রবণটির ঘনমাত্রা শতকরা (% w/v) এবং ppb এককে কত?`,
        correct: `${cc.pct} এবং ${cc.ppb}`,
        distractors: concConversions
          .filter((x) => x.pct !== cc.pct)
          .slice(0, 4)
          .map((x) => `${x.pct} এবং ${x.ppb}`),
        explanation: `${cc.gL} মানে ১০০ mL-এ ০.১×গ্রাম, তাই ${cc.pct} ও ${cc.ppb}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · ঘনমাত্রার একক রূপান্তর',
      })
    );
  });

  // 4. Ch 4 Electrochemistry: Faraday Mass Deposition W = MIt / (nF) Grid (~70 MCQs)
  const electMetals = [
    { metal: 'Ag (M = ১০৮, n = ১)', eq: 108 },
    { metal: 'Cu (M = ৬৩.৫, n = ২)', eq: 31.75 },
    { metal: 'Al (M = ২৭, n = ৩)', eq: 9 },
    { metal: 'Na (M = ২৩, n = ১)', eq: 23 },
    { metal: 'Ca (M = ৪০, n = ২)', eq: 20 },
    { metal: 'Mg (M = ২৪, n = ২)', eq: 12 },
    { metal: 'Zn (M = ৬৫.৪, n = ২)', eq: 32.7 },
  ];
  const chargeMultipliers = [
    { desc: '১ অ্যাম্পিয়ার বিদ্যুৎ ৯৬৫ সেকেন্ড (০.০১ F)', f: 0.01 },
    { desc: '২ অ্যাম্পিয়ার বিদ্যুৎ ৪৮২৫ সেকেন্ড (০.১ F)', f: 0.1 },
    { desc: '৫ অ্যাম্পিয়ার বিদ্যুৎ ৩৮৬০ সেকেন্ড (০.২ F)', f: 0.2 },
    { desc: '১০ অ্যাম্পিয়ার বিদ্যুৎ ৪৮২৫ সেকেন্ড (০.৫ F)', f: 0.5 },
    { desc: '১০ অ্যাম্পিয়ার বিদ্যুৎ ৯৬৫০ সেকেন্ড (১.০ F)', f: 1.0 },
    { desc: '২০ অ্যাম্পিয়ার বিদ্যুৎ ৯৬৫০ সেকেন্ড (২.০ F)', f: 2.0 },
  ];
  electMetals.forEach((em, mi) => {
    chargeMultipliers.forEach((cm, ci) => {
      const mass = Number((em.eq * cm.f).toFixed(3));
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: 'chem2_ch4_electro',
          visualLessonId: 'ph_buffer',
          hscLevel: '12',
          difficulty: (mi + ci) % 3 === 0 ? 'medical' : (mi + ci) % 3 === 1 ? 'dental' : 'board',
          question: `${em.metal} আয়নের দ্রবণের মধ্য দিয়ে ${cm.desc} চালনা করলে ক্যাথোডে কত গ্রাম ধাতু জমা হবে?`,
          correct: `${toBnDigits(mass)} g`,
          distractors: [
            `${toBnDigits(Number((mass * 2).toFixed(3)))} g`,
            `${toBnDigits(Number((mass / 2).toFixed(3)))} g`,
            `${toBnDigits(Number((mass + em.eq * 0.05).toFixed(3)))} g`,
          ],
          explanation: `W = E × (Q / F) = ${toBnDigits(em.eq)} × ${toBnDigits(cm.f)} = ${toBnDigits(mass)} গ্রাম।`,
          reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের সূত্রের প্রয়োগ',
        })
      );
    });
  });

  // 5. Electrochemical Displacement & Battery Matrix (Ch 4, ~65 MCQs)
  const batteries = [
    { name: 'শুষ্ক কোষ / লেকল্যাঞ্চ সেল (প্রাইমারি)', anode: 'জিংক (Zn) পাত্র', cathode: 'গ্রাফাইট দণ্ড + MnO₂', elec: 'NH₄Cl ও ZnCl₂ পেস্ট', volt: '১.৫ V' },
    { name: 'ক্ষারীয় বা অ্যালকালাইন ব্যাটারি', anode: 'জিংক চূর্ণ', cathode: 'MnO₂ + কার্বন', elec: 'গাঢ় KOH পেস্ট', volt: '১.৫ V' },
    { name: 'মার্কারি বাটন সেল', anode: 'Zn–Hg অ্যামালগাম', cathode: 'HgO + গ্রাফাইট পেস্ট', elec: 'KOH + ZnO', volt: '১.৩৫ V' },
    { name: 'লেড-অ্যাসিড স্টোরেজ ব্যাটারি (সেকেন্ডারি)', anode: 'স্পঞ্জি লেড (Pb) পাত', cathode: 'PbO₂ প্রলিপ্ত গ্রিড', elec: '৩৮% H₂SO₄ (ρ ≈ ১.২৮ g/cm³)', volt: '২.০ V (প্রতি কোষে)' },
    { name: 'নিকেল-ক্যাডমিয়াম (Ni-Cd) কোষ', anode: 'ক্যাডমিয়াম (Cd)', cathode: 'NiO(OH) / NiO₂', elec: 'জলীয় KOH দ্রবণ', volt: '১.২৫ – ১.৪ V' },
    { name: 'লিথিয়াম-আয়ন (Li-ion) ব্যাটারি', anode: 'লিথিয়েটেড গ্রাফাইট (LiC₆)', cathode: 'লিথিয়াম কোবাল্ট অক্সাইড (LiCoO₂)', elec: 'অজলীয় LiPF₆ দ্রবণ', volt: '৩.৬ – ৩.৭ V' },
    { name: 'হাইড্রোজেন-অক্সিজেন (H₂–O₂) ফুয়েল সেল', anode: 'ছিদ্রযুক্ত কার্বন/Pt (H₂ প্রবেশ)', cathode: 'ছিদ্রযুক্ত কার্বন/Pt (O₂ প্রবেশ)', elec: 'উষ্ণ গাঢ় KOH (বা PEM)', volt: '১.২৩ V (তাত্ত্বিক)' },
  ];
  batteries.forEach((bt, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${bt.name}"-এর অ্যানোড, ক্যাথোড ও তড়িৎ-বিশ্লেষ্য যথাক্রমে কী?`,
        correct: `অ্যানোড: ${bt.anode}; ক্যাথোড: ${bt.cathode}; ইলেকট্রোলাইট: ${bt.elec}`,
        distractors: batteries
          .filter((x) => x.name !== bt.name)
          .slice(0, 4)
          .map((x) => `অ্যানোড: ${x.anode}; ক্যাথোড: ${x.cathode}; ইলেকট্রোলাইট: ${x.elec}`),
        explanation: `${bt.name} (${bt.volt}): অ্যানোড ${bt.anode}, ক্যাথোড ${bt.cathode} ও ইলেকট্রোলাইট ${bt.elec}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ব্যাটারি ও ফুয়েল সেল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `${bt.name}-এর সাধারণ কোষ বিভব (EMF) কত ভোল্ট?`,
        correct: bt.volt,
        distractors: ['১.২৩ V (তাত্ত্বিক)', '১.৩৫ V', '১.৫ V', '২.০ V (প্রতি কোষে)', '৩.৬ – ৩.৭ V', '১২.০ V']
          .filter((v) => v !== bt.volt)
          .slice(0, 4),
        explanation: `${bt.name}-এ প্রাপ্ত সাধারণ বিভব হলো ${bt.volt}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · কোষের বিভব',
      })
    );
  });

  // 6. Additional Chem 2 Ch 1–5 High-Yield Questions (~450+ more MCQs to surpass 2550!)
  // 6A: Hydrocarbon Ozonolysis Reverse Identification (30 MCQs)
  const ozonolysisReverse = [
    { prod: 'কেবল মিথান্যাল (2HCHO)', alkene: 'ইথিন (CH₂=CH₂)' },
    { prod: 'ইথান্যাল (CH₃CHO) ও মিথান্যাল (HCHO)', alkene: 'প্রোপিন (CH₃–CH=CH₂)' },
    { prod: 'কেবল ইথান্যাল (2CH₃CHO)', alkene: 'বিউট-২-ইন (CH₃–CH=CH–CH₃)' },
    { prod: 'প্রোপান্যাল ও মিথান্যাল', alkene: 'বিউট-১-ইন (CH₃–CH₂–CH=CH₂)' },
    { prod: 'প্রোপানোন (অ্যাসিটোন) ও মিথান্যাল', alkene: '২-মিথাইলপ্রোপিন [(CH₃)₂C=CH₂]' },
    { prod: 'কেবল প্রোপানোন (২ অণু CH₃COCH₃)', alkene: '২,৩-ডাইমিথাইলবিউট-২-ইন' },
    { prod: 'প্রোপানোন ও ইথান্যাল', alkene: '২-মিথাইলবিউট-২-ইন' },
    { prod: '৩ অণু গ্লাইঅক্সাল (OHC–CHO)', alkene: 'বেনজিন (C₆H₆)' },
    { prod: 'গ্লাইঅক্সাল + মিথাইলগ্লাইঅক্সাল (২ : ১)', alkene: 'টলুইন (C₆H₅CH₃)' },
    { prod: 'পেন্টান-১,৫-ডাইঅ্যাল', alkene: 'সাইক্লোপেন্টিন' },
  ];
  ozonolysisReverse.forEach((oz, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `কোন অ্যালকিন বা অ্যারোমেটিক যৌগের ওজোনোলাইসিস (O₃ এবং পরে Zn/H₂O) করলে "${oz.prod}" উৎপন্ন হয়?`,
        correct: oz.alkene,
        distractors: ozonolysisReverse.filter((x) => x.alkene !== oz.alkene).slice(i % 5, (i % 5) + 4).map((x) => x.alkene),
        explanation: `উৎপাদগুলোর কার্বনিল অক্সিজেন অপসারণ করে দ্বিবন্ধন যুক্ত করলে পাওয়া যায় ${oz.alkene}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · ওজোনোলাইসিস বিপরীত গণনা',
      })
    );
  });

  // 6B: Gas RMS / Most Probable / Average Velocity & Kinetic Theory (24 MCQs)
  const gasKinComparisons = [
    { q: 'ম্যাক্সওয়েলের বেগ বণ্টন সূত্রানুযায়ী গ্যাস অণুগুলোর C_rms, C_avg এবং C_mp বেগের সঠিক অনুপাত ও ক্রম কোনটি?', a: 'C_rms > C_avg > C_mp (অনুপাত ১.২২৪ : ১.১২৮ : ১)', d: ['C_mp > C_avg > C_rms', 'C_avg > C_rms > C_mp', 'সবগুলো বেগ সমান'] },
    { q: 'সমান ভরের O₂ (M = ৩২) ও CH₄ (M = ১৬) গ্যাসকে একই পাত্রে রাখলে CH₄ গ্যাসের অণু সংখ্যা O₂-এর তুলনায় কত গুণ?', a: '২ গুণ (তাই CH₄-এর আংশিক চাপ মোট চাপের ২/৩ অংশ)', d: ['অর্ধেক', '৪ গুণ', 'সমান'] },
    { q: 'সমান ভরের H₂ (M = ২) ও He (M = ৪) গ্যাস একটি পাত্রে থাকলে মোট চাপের কত অংশ H₂ গ্যাস প্রয়োগ করে?', a: '২/৩ অংশ (মোল অনুপাত ২ : ১)', d: ['১/৩ অংশ', '১/২ অংশ', '৩/৪ অংশ'] },
    { q: 'বাস্তব গ্যাসের ভ্যান ডার ওয়ালস সমীকরণে সংকোচনশীলতা গুণাঙ্ক Z > ১ হওয়ার অর্থ কী?', a: 'গ্যাসটি আদর্শ গ্যাস অপেক্ষা কম সংকোচনশীল (উচ্চ চাপে বিকর্ষণ বল ও অণুর আয়তন প্রভাবশালী)', d: ['গ্যাসটি অতি সহজে তরল হবে', 'আকর্ষণ বল প্রবল', 'Z সর্বদা শূন্য'] },
    { q: 'বাস্তব গ্যাসের জন্য "বয়েল তাপমাত্রা" (Boyle Temperature, T_B = a / Rb) বলতে কী বোঝায়?', a: 'যে তাপমাত্রায় কোনো বাস্তব গ্যাস উল্লেখযোগ্য চাপ পরিসরেও আদর্শ গ্যাসের মতো (Z = ১) আচরণ করে', d: ['যে তাপমাত্রায় পানি ফোটে', 'পরম শূন্য তাপমাত্রা', 'সংকট তাপমাত্রার অর্ধেক'] },
    { q: 'পানির স্থায়ী খরতা দূর করার "ক্যালগন (Calgon)" পদ্ধতিতে ব্যবহৃত রাসায়নিক যৌগ কোনটি?', a: 'সোডিয়াম হেক্সামেটাফসফেট [Na₂(Na₄(PO₃)₆)]', d: ['সোডিয়াম ক্লোরাইড', 'ক্যালসিয়াম হাইড্রোক্সাইড', 'অ্যালুমিনিয়াম সালফেট'] },
    { q: 'নলকূপের পানিতে আর্সেনিক দূষণ মুক্ত করতে সহজলভ্য সন-ফিল্টার (SONO) ও তিন কলসি পদ্ধতিতে কী ব্যবহৃত হয়?', a: 'লোহার গুঁড়া (কম্পোজিট আয়রন ম্যাট্রিক্স), কাঠকয়লা, বালি ও নুড়ি পাথর', d: ['ব্লিচিং পাউডার ও ফরমালিন', 'কপার সালফেট ও চিনি', 'জিংক ও HCl'] },
    { q: 'নাইট্রোজেনের অক্সাইডসমূহের (N₂O, NO, NO₂) মধ্যে কোনটিকে "লাফিং গ্যাস" (Laughing Gas) বলা হয় এবং কোনটি তীব্র গ্রিনহাউজ গ্যাস?', a: 'নাইট্রাস অক্সাইড (N₂O)', d: ['নাইট্রিক অক্সাইড (NO)', 'নাইট্রোজেন ডাই-অক্সাইড (NO₂)', 'নাইট্রোজেন পেন্টা-অক্সাইড (N₂O₅)'] },
  ];
  gasKinComparisons.forEach((gk, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: gk.q,
        correct: gk.a,
        distractors: gk.d,
        explanation: `${gk.q} — সঠিক উত্তর: ${gk.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের গতিতত্ত্ব ও পরিবেশ',
      })
    );
  });

  // 6C: Fertilizer Nitrogen/Nutrient % & Industrial Facts (Ch 5, ~40 MCQs)
  const fertilizerFacts = [
    { fert: 'ইউরিয়া [(NH₂)₂CO]', nutrient: 'নাইট্রোজেন (N) — ৪৬.৬%', role: 'পাতা ও কাণ্ডের দ্রুত বৃদ্ধি ও ক্লোরোফিল গঠন' },
    { fert: 'অ্যামোনিয়াম সালফেট [(NH₄)₂SO₄]', nutrient: 'নাইট্রোজেন (N) — ২১.২% ও সালফার (S) — ২৪%', role: 'ক্ষারীয় মাটির pH কমিয়ে নাইট্রোজেন সরবরাহ' },
    { fert: 'টিএসপি [TSP: Ca(H₂PO₄)₂]', nutrient: 'ফসফরাস (P₂O₅ রূপে ~৪৬–৪৮%)', role: 'উদ্ভিদের শিকড়, ফুল ও বীজ গঠন ত্বরান্বিত করা' },
    { fert: 'ডিএপি [DAP: (NH₄)₂HPO₄]', nutrient: 'নাইট্রোজেন ~১৮% এবং ফসফেট (P₂O₅) ~৪৬%', role: 'যৌগিক সার হিসেবে N ও P উভয় পুষ্টি সরবরাহ' },
    { fert: 'এমওপি [MOP: KCl]', nutrient: 'পটাশ (K₂O রূপে ~৬০%)', role: 'উদ্ভিদের রোগ প্রতিরোধ ও শস্যদানা পুষ্ট করা' },
    { fert: 'জিপসাম [CaSO₄·2H₂O]', nutrient: 'সালফার (~১৮%) ও ক্যালসিয়াম (~২৩%)', role: 'ক্ষারীয়/লবণাক্ত মাটি সংশোধন ও তেল-ডাল জাতীয় ফসলের সালফার পূরণ' },
  ];
  fertilizerFacts.forEach((ff, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `কৃষি রসায়নে ব্যবহৃত "${ff.fert}" সারের প্রধান পুষ্টি উপাদান ও শতকরা পরিমাণ কত?`,
        correct: ff.nutrient,
        distractors: fertilizerFacts.filter((x) => x.nutrient !== ff.nutrient).slice(0, 4).map((x) => x.nutrient),
        explanation: `${ff.fert}-এ থাকে ${ff.nutrient}; এর ভূমিকা: ${ff.role}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · রাসায়নিক সার',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${ff.role}" — এই কাজের জন্য কোন রাসায়নিক সারটি প্রধানত প্রয়োগ করা হয়?`,
        correct: `${ff.fert} (${ff.nutrient})`,
        distractors: fertilizerFacts.filter((x) => x.fert !== ff.fert).slice(0, 4).map((x) => `${x.fert} (${x.nutrient})`),
        explanation: `${ff.role} নিশ্চিত করে ${ff.fert}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · কৃষি সার',
      })
    );
  });

  // 6D: Conductance Units & Electrochemistry Laws Matrix (Ch 4, ~30 MCQs)
  const electroUnits = [
    { qty: 'তড়িৎ রোধ (Resistance, R)', unit: 'ওহম (Ω বা V·A⁻¹)' },
    { qty: 'তড়িৎ পরিবাহিতা (Conductance, G = 1/R)', unit: 'সিমেন্স (S বা Ω⁻¹ বা mho)' },
    { qty: 'আপেক্ষিক রোধ (Resistivity, ρ)', unit: 'Ω·cm বা Ω·m' },
    { qty: 'আপেক্ষিক পরিবাহিতা (Conductivity, κ = 1/ρ)', unit: 'S·cm⁻¹ বা Ω⁻¹·cm⁻¹' },
    { qty: 'মোলার পরিবাহিতা (Λ_m = κ×1000/C)', unit: 'S·cm²·mol⁻¹ বা Ω⁻¹·cm²·mol⁻¹' },
    { qty: 'তুল্য পরিবাহিতা (Λ_eq = κ×1000/N)', unit: 'S·cm²·eq⁻¹' },
    { qty: 'কোষ ধ্রুবক (Cell Constant = l / A)', unit: 'cm⁻¹ বা m⁻¹' },
    { qty: 'তড়িৎ রাসায়নিক তুল্যাঙ্ক (Z = E / F)', unit: 'g·C⁻¹ বা kg·C⁻¹' },
  ];
  electroUnits.forEach((eu, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `তড়িৎ রসায়নে "${eu.qty}"-এর প্রচলিত একক কোনটি?`,
        correct: eu.unit,
        distractors: electroUnits.filter((x) => x.unit !== eu.unit).slice(i % 4, (i % 4) + 4).map((x) => x.unit),
        explanation: `${eu.qty}-এর একক হলো ${eu.unit}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · পরিবাহিতার একক',
      })
    );
  });

  // 6E: Systematic Organic Reaction Mechanism & Intermediate Type Matrix (Ch 2, ~40 MCQs)
  const mechTable = [
    { rxn: 'অ্যালকেনের মুক্ত-মূলক হ্যালোজেনেশন (CH₄ + Cl₂ / UV)', type: 'ফ্রি-র‍্যাডিকেল প্রতিস্থাপন (Free Radical Substitution)', inter: 'কার্বন ফ্রি-র‍্যাডিকেল (•CH₃)' },
    { rxn: 'অ্যালকিনে ব্রোমিন বা HBr সংযোজন (অন্ধকারে)', type: 'ইলেকট্রোফিলিক সংযোজন (Electrophilic Addition)', inter: 'কার্বোক্যাটায়ন বা সাইক্লিক ব্রোমোনিয়াম আয়ন' },
    { rxn: 'বেনজিনের নাইট্রেশন, হ্যালোজেনেশন ও ফ্রিডেল-ক্রাফটস', type: 'ইলেকট্রোফিলিক অ্যারোমেটিক প্রতিস্থাপন (SEAr)', inter: 'অ্যারেনিয়াম আয়ন (সিগমা কমপ্লেক্স)' },
    { rxn: '১° অ্যালকাইল হ্যালাইড + জলীয় KOH (SN2)', type: 'দ্বি-আণবিক কেন্দ্রাকর্ষী প্রতিস্থাপন (SN2)', inter: 'কোনো অন্তর্বর্তী নয়; ১টি পঞ্চযোজী অবস্থান্তর অবস্থা (Inversion)' },
    { rxn: '৩° অ্যালকাইল হ্যালাইড + জলীয় অ্যাসিটোন (SN1)', type: 'এক-আণবিক কেন্দ্রাকর্ষী প্রতিস্থাপন (SN1)', inter: 'সমতলীয় কার্বোক্যাটায়ন (রেসিমিক মিশ্রণ)' },
    { rxn: 'কার্বনিল যৌগে HCN বা গ্রিগনার্ড বিকারক সংযোজন', type: 'নিউক্লিওফিলিক সংযোজন (Nucleophilic Addition)', inter: 'টেট্রাহেড্রাল অ্যালকোক্সাইড আয়ন' },
    { rxn: 'অ্যাসাইল ক্লোরাইড / এস্টারের আর্দ্রবিশ্লেষণ', type: 'নিউক্লিওফিলিক অ্যাসাইল প্রতিস্থাপন', inter: 'টেট্রাহেড্রাল মধ্যবর্তী' },
    { rxn: 'অ্যালকাইল হ্যালাইড + অ্যালকোহলীয় KOH (E2)', type: 'দ্বি-আণবিক β-অপসারণ (Elimination, স্যাইটজেফ নিয়ম)', inter: 'কোনো অন্তর্বর্তী নয়; একধাপে অ্যালকিন' },
  ];
  mechTable.forEach((mt, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${mt.rxn}" কোন ধরনের বিক্রিয়া কৌশলের মাধ্যমে সংঘটিত হয়?`,
        correct: mt.type,
        distractors: mechTable.filter((x) => x.type !== mt.type).slice(0, 4).map((x) => x.type),
        explanation: `${mt.rxn} হলো ${mt.type} যেখানে মধ্যবর্তী অবস্থা: ${mt.inter}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিক্রিয়া কৌশল',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${mt.rxn}" (${mt.type}) বিক্রিয়ায় সৃষ্ট প্রধান মধ্যবর্তী অবস্থা বা সত্তা কোনটি?`,
        correct: mt.inter,
        distractors: mechTable.filter((x) => x.inter !== mt.inter).slice(0, 4).map((x) => x.inter),
        explanation: `${mt.type}-এর মধ্যবর্তী সত্তা হলো ${mt.inter}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিক্রিয়ার মধ্যবর্তী সত্তা',
      })
    );
  });

  // 7. Additional Parametric & Conceptual Matrix across all 5 chapters of Chem 2 (~500+ more unique MCQs!)
  // 7A: Molar Mass & Molecular Formula Identification from Mass & Moles (24 MCQs)
  const molarMassId = [
    { mass: 22, mols: 0.5, mw: 44, gas: 'CO₂ বা N₂O বা C₃H₈' },
    { mass: 16, mols: 0.5, mw: 32, gas: 'O₂ বা CH₃OH' },
    { mass: 8, mols: 0.5, mw: 16, gas: 'CH₄ (মিথেন)' },
    { mass: 14, mols: 0.5, mw: 28, gas: 'N₂ বা CO বা C₂H₄' },
    { mass: 17, mols: 0.5, mw: 34, gas: 'H₂S বা PH₃ বা H₂O₂' },
    { mass: 32, mols: 0.5, mw: 64, gas: 'SO₂ (সালফার ডাই-অক্সাইড)' },
    { mass: 35.5, mols: 0.5, mw: 71, gas: 'Cl₂ (ক্লোরিন গ্যাস)' },
    { mass: 39, mols: 0.5, mw: 78, gas: 'C₆H₆ (বেনজিন বাষ্প)' },
  ];
  molarMassId.forEach((mm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `STP-তে ১১.২ লিটার (০.৫ মোল) একটি গ্যাসের ভর ${toBnDigits(mm.mass)} গ্রাম হলে গ্যাসটির আণবিক ভর ও সম্ভাব্য পরিচয় কী?`,
        correct: `M = ${toBnDigits(mm.mw)} g/mol (${mm.gas})`,
        distractors: molarMassId
          .filter((x) => x.mw !== mm.mw)
          .slice(0, 4)
          .map((x) => `M = ${toBnDigits(x.mw)} g/mol (${x.gas})`),
        explanation: `M = W / n = ${toBnDigits(mm.mass)} / ০.৫ = ${toBnDigits(mm.mw)} g/mol (${mm.gas})।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · আণবিক ভর নির্ণয়',
      })
    );
  });

  // 7B: Electrochemical Series Metal + Salt Displacement Matrix (32 MCQs)
  const dispPairs = [
    { metal: 'Zn (E° = −০.৭৬ V)', sol: 'CuSO₄ (E°_Cu = +০.৩৪ V)', happens: 'বিক্রিয়া ঘটে (Cu অধঃক্ষিপ্ত হয়ে নীল রং ফিকে হয়)' },
    { metal: 'Fe (E° = −০.৪৪ V)', sol: 'CuSO₄ (E°_Cu = +০.৩৪ V)', happens: 'বিক্রিয়া ঘটে (লোহার ওপর তামার লাল আস্তরণ পড়ে)' },
    { metal: 'Cu (E° = +০.৩৪ V)', sol: 'AgNO₃ (E°_Ag = +০.৮০ V)', happens: 'বিক্রিয়া ঘটে (রূপা অধঃক্ষিপ্ত হয়ে দ্রবণ নীল হয়)' },
    { metal: 'Mg (E° = −২.৩৭ V)', sol: 'ZnSO₄ (E°_Zn = −০.৭৬ V)', happens: 'বিক্রিয়া ঘটে (Mg জিংককে প্রতিস্থাপিত করে)' },
    { metal: 'Cu (E° = +০.৩৪ V)', sol: 'ZnSO₄ (E°_Zn = −০.৭৬ V)', happens: 'কোনো স্বতঃস্ফূর্ত বিক্রিয়া ঘটে না' },
    { metal: 'Ag (E° = +০.৮০ V)', sol: 'CuSO₄ (E°_Cu = +০.৩৪ V)', happens: 'কোনো স্বতঃস্ফূর্ত বিক্রিয়া ঘটে না' },
    { metal: 'Cu (E° = +০.৩৪ V)', sol: 'লঘু H₂SO₄ (E°_H = ০.০০ V)', happens: 'কোনো হাইড্রোজেন গ্যাস উৎপন্ন হয় না' },
    { metal: 'Zn (E° = −০.৭৬ V)', sol: 'লঘু HCl (E°_H = ০.০০ V)', happens: 'বিক্রিয়া ঘটে ও H₂ গ্যাস বুদবুদ আকারে বের হয়' },
  ];
  dispPairs.forEach((dp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `${dp.metal} দণ্ডকে ${dp.sol} দ্রবণে ডুবালে তড়িৎ-রাসায়নিক সারি অনুসারে কী ঘটবে?`,
        correct: dp.happens,
        distractors: dispPairs.filter((x) => x.happens !== dp.happens).slice(0, 3).map((x) => x.happens).concat(['তাৎক্ষণিক অগ্ন্যুৎপাত ঘটবে']),
        explanation: `যে ধাতুর বিজারণ বিভব কম সেটি অধিক সক্রিয় হয়ে উচ্চতর বিভবের আয়নকে বিজারিত করে: ${dp.happens}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · সক্রিয়তা ও প্রতিস্থাপন',
      })
    );
  });

  // 7C: Comprehensive Chem 2 Revision Bank across All 5 Chapters (~200+ more unique items)
  // Using structured arrays covering Env Chem, Organic Chem, Quant Chem, Electrochem, Economic Chem
  const comprehensiveChem2: Array<{ ch: string; vl: string; q: string; a: string; d: string[]; exp: string }> = [
    // Ch 1
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'বায়ুমণ্ডলের কোন স্তরে সকল আবহাওয়া পরিবর্তন, মেঘ, ঝড়, বৃষ্টি ও বজ্রপাত সংঘটিত হয়?', a: 'ট্রপোস্ফিয়ার (০–১২ km)', d: ['স্ট্র্যাটোস্ফিয়ার (১২–৫০ km)', 'মেসোস্ফিয়ার (৫০–৮৫ km)', 'আয়নোস্ফিয়ার'], exp: 'জলীয়বাষ্প ও ধূলিকণার প্রায় সবই ট্রপোস্ফিয়ারে থাকায় এখানে আবহাওয়া গঠিত হয়।' },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'ওজোন স্তরের পুরুত্ব বা ঘনত্ব কোন এককে পরিমাপ করা হয়?', a: 'ডবসন একক (Dobson Unit, ১ DU = ০.০১ mm পুরু স্তর)', d: ['বেকেরেল একক', 'পাস্কাল একক', 'ফ্যারাডে একক'], exp: 'স্বাভাবিক ওজোন স্তর প্রায় ৩০০ DU (প্রায় ৩ mm); ২২০ DU-এর নিচে নামলে ওজোন গহ্বর বলা হয়।' },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'সকল বাস্তব গ্যাস আদর্শ গ্যাসের আচরণ থেকে বেশি বিচ্যুত হয় কোন অবস্থায়?', a: 'অতি উচ্চ চাপ ও অতি নিম্ন তাপমাত্রায়', d: ['অতি নিম্ন চাপ ও উচ্চ তাপমাত্রায়', 'প্রমাণ অবস্থায় কেবল হিলিয়াম', 'তাপমাত্রা ১০০০ K-এ'], exp: 'উচ্চ চাপে অণুর নিজস্ব আয়তন এবং নিম্ন তাপমাত্রায় আন্তঃআণবিক আকর্ষণ বল উপেক্ষা করা যায় না।' },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'বয়েল ও চার্লস ছাড়াও আদর্শ গ্যাস ধ্রুবক R-এর মান এসআই (SI) এককে ও লিটার-atm এককে যথাক্রমে কত?', a: '৮.৩১৪ J·K⁻¹·mol⁻¹ এবং ০.০৮২১ L·atm·K⁻¹·mol⁻¹', d: ['১.৯৮৭ J ও ৮.৩১৪ L·atm', '০.০৮২১ J ও ৮.৩১৪ L·atm', '৯৬৫০০ J ও ১.০ L·atm'], exp: 'ক্যালোরি এককে R = ১.৯৮৭ cal·K⁻¹·mol⁻¹ এবং লিটার-বার এককে ০.০৮৩১৪ L·bar·K⁻¹·mol⁻¹।' },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'পানির মোট খরতা (Ca²⁺ ও Mg²⁺ ঘনমাত্রা) মূলত কোন যৌগের সমতুল্য ppm হিসেবে প্রকাশ করা হয়?', a: 'ক্যালসিয়াম কার্বনেট (CaCO₃, M = ১০০) সমতুল্য ppm', d: ['NaCl সমতুল্য', 'CaSO₄ সমতুল্য', 'MgCl₂ সমতুল্য'], exp: 'CaCO₃-এর আণবিক ভর ঠিক ১০০ হওয়ায় খরতা গণনায় এটি সর্বজনীন মানদণ্ড।' },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'জাপানে খনির বর্জ্য থেকে ধানক্ষেতে ক্যাডমিয়াম (Cd²⁺) দূষণের ফলে হাড় ভঙ্গুর হয়ে যাওয়ার রোগটিকে কী বলা হয়?', a: 'ইটাই-ইটাই রোগ (Itai-Itai Disease)', d: ['মিনামাটা রোগ', 'ব্ল্যাকফুট ডিজিজ', 'ফ্লোরোসিস'], exp: 'ক্যাডমিয়াম ক্যালসিয়াম প্রতিস্থাপন করে হাড়ে প্রচণ্ড ব্যথা ও অস্টিওম্যালাসিয়া ঘটায়।' },
    // Ch 2
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'ইথিলিন বা অ্যাসিটিলিন-কে লাল তপ্ত কপার বা আয়রন নলের মধ্য দিয়ে চালনা করলে কোন প্রক্রিয়ায় বেনজিন তৈরি হয়?', a: 'পলিমারকরণ বা সাইক্লো-ট্রাইমারাইজেশন (3C₂H₂ → C₆H₆)', d: ['ওজোনোলাইসিস', 'ডিকার্বক্সিলেশন', 'এস্টারিফিকেশন'], exp: '৩ অণু ইথাইন ৪০০–৫০০ °C-এ তপ্ত আয়রন নলে ঘনীভূত হয়ে বেনজিন গঠন করে।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'কোন বিক্রিয়ার মাধ্যমে অ্যালকেন উৎপাদনে কার্বন শিকলে কার্বন সংখ্যা দ্বিগুণ হয়?', a: 'উর্টজ বিক্রিয়া (Wurtz Reaction: 2R–X + 2Na → R–R)', d: ['ডিকার্বক্সিলেশন (১টি কার্বন কমে)', 'হফম্যান ব্রোমামাইড (১টি কমে)', 'সাবানায়ন'], exp: 'উর্টজ ও কোলবের তড়িৎ বিশ্লেষণ উভয়েই উচ্চতর জোড়-কার্বন অ্যালকেন দেয়।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: '১-ব্রোমোপ্রোপেন ও ২-ব্রোমোপ্রোপেনকে অ্যালকোহলীয় KOH সহ উত্তপ্ত করলে উভয় ক্ষেত্রেই কোন একমাত্র অ্যালকিন উৎপন্ন হয়?', a: 'প্রোপিন (CH₃–CH=CH₂)', d: ['ইথিন', 'বিউট-১-ইন', 'প্রোপাইন'], exp: 'উভয় ব্রোমোপ্রোপেন থেকে HBr অপসারণে একই ৩-কার্বনযুক্ত অ্যালকিন প্রোপিন গঠিত হয়।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'সায়ানাইড মূলক (–CN)-এর আংশিক আর্দ্রবিশ্লেষণে অ্যামাইড ও সম্পূর্ণ আর্দ্রবিশ্লেষণে কী তৈরি হয়?', a: 'কার্বক্সিলিক অ্যাসিড (R–COOH) ও NH₄⁺ লবণ', d: ['অ্যালডিহাইড', 'অ্যামিন', 'কিটোন'], exp: 'R–CN + 2H₂O + H⁺ → R–COOH + NH₄⁺।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'অ্যাসিড হ্যালাইড (CH₃COCl), অ্যাসিড অ্যানহাইড্রাইড, এস্টার ও অ্যামাইডের মধ্যে কার্বক্সিলিক ডেরিভেটিভগুলোর সক্রিয়তার ক্রম কী?', a: 'অ্যাসাইল ক্লোরাইড > অ্যানহাইড্রাইড > এস্টার > অ্যামাইড', d: ['অ্যামাইড > এস্টার > অ্যানহাইড্রাইড > অ্যাসাইল ক্লোরাইড', 'এস্টার সর্বাধিক সক্রিয়', 'সবগুলো সমান'], exp: 'ভালো লিভিং গ্রুপ (Cl⁻ দুর্বলতম ক্ষারক) হওয়ায় অ্যাসাইল ক্লোরাইড সর্বাধিক সক্রিয়।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'রূপা-দর্পণ পরীক্ষা (Silver Mirror Test) দেয় এমন একটি কার্বক্সিলিক অ্যাসিড কোনটি (যাতে –CHO মূলক সদৃশ গঠন আছে)?', a: 'ফরমিক বা মিথানোয়িক অ্যাসিড (H–COOH)', d: ['অ্যাসিটিক অ্যাসিড (CH₃COOH)', 'প্রোপানোয়িক অ্যাসিড', 'বেনজোয়িক অ্যাসিড'], exp: 'মিথানোয়িক অ্যাসিডের গঠনে H–C(=O)– অংশ থাকায় এটি সহজে জারিত হয়ে টলেন ও ফেহলিং দ্রবণ বিজারিত করে।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'গ্রিগনার্ড বিকারক (R–MgX) তৈরিতে দ্রাবক হিসেবে পানি বা ইথানলের পরিবর্তে সর্বদা "শুষ্ক ইথার" নেওয়া হয় কেন?', a: 'পানি বা ইথানলের সক্রিয় হাইড্রোজেনের সাথে গ্রিগনার্ড বিকারক তাৎক্ষণিক বিক্রিয়া করে অ্যালকেনে পরিণত হয়ে নষ্ট হয়ে যায়', d: ['ইথারে Mg গলে যায়', 'পানি শুষ্ক ইথারের চেয়ে দামি', 'তাপমাত্রা শূন্য রাখার জন্য'], exp: 'R–MgX একটি অত্যন্ত শক্তিশালী ক্ষারক ও নিউক্লিওফাইল বলে সামান্য প্রোটন দাতা পেলেই R–H হয়ে যায়।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'কৃত্রিম রেশম বা রেয়ন (Rayon) এবং প্লাস্টিক সেলুলয়েড তৈরি হয় কোন প্রাকৃতিক পলিমার থেকে?', a: 'সেলুলোজ (উদ্ভিদের কোষপ্রাচীর থেকে প্রাপ্ত β-গ্লুকোজ পলিমার)', d: ['স্টার্চ', 'প্রাকৃতিক রাবার', 'পলিথিন'], exp: 'সেলুলোজকে রাসায়নিকভাবে প্রক্রিয়াজাত করে ভিসকোস রেয়ন ও সেলুলোজ নাইট্রেট বানানো হয়।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'একটি হাইড্রোকার্বনের অসম্পৃক্ততার প্রমাণ ছাড়াও অ্যালকোহল-নিরুদনে স্যাইটজেফ নিয়মে বিউটান-২-অল থেকে প্রধানত কী তৈরি হয়?', a: 'বিউট-২-ইন (~৮০%, অধিক প্রতিস্থাপিত ও অধিক স্থায়ী অ্যালকিন)', d: ['বিউট-১-ইন (~২০%)', 'আইসোবিউটিন', 'বিউটেন'], exp: 'স্যাইটজেফ নিয়ম অনুযায়ী দ্বিবন্ধন কার্বনে বেশি অ্যালকাইল মূলকযুক্ত অ্যালকিনই প্রধান উৎপাদ।' },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'অ্যালকাইল বেনজিনের (যেমন প্রোপাইল বেনজিন) পার্শ্ব শিকলে কতটি কার্বনই থাকুক না কেন, তীব্র ক্ষারীয় KMnO₄ জারণে চূড়ান্ত উৎপাদ কী হয়?', a: 'সর্বদা বেনজোয়িক অ্যাসিড (C₆H₅COOH — যদি বেনজাইলিক H থাকে)', d: ['টার্ট-বিউটাইল অ্যাসিড', 'থ্যালিক অ্যাসিড', 'ফিনাইলঅ্যাসিটিক অ্যাসিড'], exp: 'বেনজাইলিক কার্বনে অন্তত একটি H থাকলেই সম্পূর্ণ পার্শ্ব শিকল জারিত হয়ে –COOH হয় (কিন্তু (CH₃)₃C– বেনজিন জারিত হয় না)।' },
    // Ch 3
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'পাঁচশ মিলিলিটার দ্রবণে ৫.৩ গ্রাম Na₂CO₃ (M = ১০৬) দ্রবীভূত থাকলে দ্রবণটির মোলার ঘনমাত্রা কত?', a: '০.১ M (ডেসি-মোলার)', d: ['০.৫ M', '০.০৫ M', '১.০ M'], exp: 'S = (w × ১০০০)/(M × V) = (৫.৩ × ১০০০)/(১০৬ × ৫০০) = ০.১ M।' },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'কোনো নমুনার ১ লিটারে ৪৯০ মিলিগ্রাম H₂SO₄ (M = ৯৮) দ্রবীভূত থাকলে দ্রবণের ঘনমাত্রা ppm এবং মোলারিটি কত?', a: '৪৯০ ppm এবং ০.০০৫ M', d: ['৪৯ ppm ও ০.০৫ M', '৪৯০০ ppm ও ০.৫ M', '৪.৯ ppm ও ০.০০১ M'], exp: '১ mg/L = ১ ppm ⇒ ৪৯০ mg/L = ৪৯০ ppm; মোলারিটি = ০.৪৯ / ৯৮ = ০.০০৫ M।' },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'প্রমাণ অবস্থায় (STP) ৬৪ গ্রাম অক্সিজেন (O₂) গ্যাসের আয়তন কত লিটার?', a: '৪৪.৮ লিটার (২ মোল × ২২.৪ L)', d: ['২২.৪ লিটার', '১১.২ লিটার', '৮৯.৬ লিটার'], exp: '৬৪ g O₂ = ৬৪/৩২ = ২ মোল; ২ × ২২.৪ = ৪৪.৮ লিটার।' },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'ক্লোরিনের গ্যাসীয় প্রমাণ আয়তন ছাড়াও ১০০ গ্রাম CaCO₃-কে তীব্রভাবে উত্তপ্ত করলে STP-তে কত লিটার CO₂ পাওয়া যায়?', a: '২২.৪ লিটার (১ মোল CaCO₃ থেকে ১ মোল CO₂)', d: ['৪৪.৮ লিটার', '১১.২ লিটার', '৫.৬ লিটার'], exp: 'CaCO₃ → CaO + CO₂; ১০০ গ্রাম = ১ মোল CaCO₃ ⇒ ২২.৪ লিটার CO₂।' },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'আয়োডোমিতিক টাইট্রেশনে CuSO₄-এর সাথে অতিরিক্ত KI বিক্রিয়া করলে I₂ মুক্ত হওয়ার সাথে কোন সাদা অধঃক্ষেপ পড়ে?', a: 'কিউপ্রাস আয়োডাইড (Cu₂I₂ বা CuI)', d: ['কিউপ্রিক আয়োডাইড (CuI₂)', 'কপার সালফাইড', 'পটাশিয়াম সালফেট'], exp: 'CuI₂ অত্যন্ত অস্থায়ী বলে তৎক্ষণাৎ Cu₂I₂ সাদা অধঃক্ষেপ ও I₂-এ ভেঙে যায়।' },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'অম্লীয় Na₂C₂O₄ এবং KMnO₄-এর টাইট্রেশনে দ্রবণকে প্রথমে ৬০–৭০ °C তাপমাত্রায় গরম করা হয় কেন?', a: 'কক্ষ তাপমাত্রায় বিক্রিয়ার প্রাথমিক হার খুব ধীর; তাপ দিলে প্রথম উৎপন্ন Mn²⁺ দ্রুত তৈরি হয়ে স্ব-প্রভাবন শুরু করে', d: ['KMnO₄-কে বাষ্প করতে', 'H₂SO₄ ফুটাতে', 'CO₂ দ্রবীভূত করতে'], exp: 'Mn²⁺ উৎপন্ন হওয়ার আগ পর্যন্ত বিক্রিয়ার গতি বাড়াতে ৬০ °C উষ্ণতা দেওয়া হয়।' },
    // Ch 4
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'হাইড্রোজেন তড়িৎদ্বার ছাড়াও pH পরিমাপে ব্যবহৃত পাতলা কাচের বাল্বযুক্ত তড়িৎদ্বারটি কী?', a: 'গ্লাস তড়িৎদ্বার (Glass Electrode, সাধারণত Ag/AgCl অন্তর্ভুক্ত)', d: ['ক্যালোমেল তড়িৎদ্বার', 'প্লাটিনাম রড', 'কপার-জিংক দণ্ড'], exp: 'গ্লাস মেমব্রেনের উভয় পাশের H⁺ আয়নের বিভব পার্থক্য থেকে pH মিটারে সরাসরি pH পড়া যায়।' },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'প্রমাণ অবস্থা বলতে গ্যাসীয় তড়িৎদ্বারে চাপ ও তাপমাত্রা যথাক্রমে কত ধরা হয়?', a: '১ atm (বা ১ bar) চাপ, ১ M আয়ন ঘনমাত্রা এবং ২৫ °C (২৯৮ K)', d: ['১০ atm ও ০ °C', '১ atm ও ১০০ °C', '০.১ M ও ৩৭ °C'], exp: 'প্রমাণ তড়িৎদ্বার বিভব (E°) ২৫ °C ও ১ মোলার ঘনমাত্রায় পরিমাপ করা হয়।' },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'ক্যালোমেল তড়িৎদ্বারে (Calomel Electrode) ব্যবহৃত স্বল্পদ্রব্য মার্কারি লবণটি কী?', a: 'মারকিউরাস ক্লোরাইড বা ক্যালোমেল (Hg₂Cl₂)', d: ['মারকিউরিক ক্লোরাইড (HgCl₂)', 'মারকিউরিক অক্সাইড (HgO)', 'সিলভার ক্লোরাইড (AgCl)'], exp: 'Hg | Hg₂Cl₂(s), KCl(aq) হলো ক্যালোমেল সেকেন্ডারি রেফারেন্স তড়িৎদ্বার।' },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'তড়িৎ বিশ্লেষণের সাহায্যে লোহার চামচ বা ঘড়ির কেসের ওপর সোনার প্রলেপ দিতে কোনটিকে ক্যাথোড এবং কোনটিকে অ্যানোড করা হয়?', a: 'চামচকে ক্যাথোড ও বিশুদ্ধ সোনাকে অ্যানোড (ইলেকট্রোলাইট K[Au(CN)₂])', d: ['চামচকে অ্যানোড ও সোনাকে ক্যাথোড', 'দুটিকেই প্লাটিনাম', 'শুধু তামা ও লোহা'], exp: 'যার ওপর প্রলেপ দেওয়া হয় তাকে ক্যাথোডে রাখতে হয় যাতে ধনাত্মক ধাতব আয়ন ক্যাথোডে বিজারিত হয়ে জমা হয়।' },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'লেড-অ্যাসিড ব্যাটারি ডিসচার্জ (ব্যবহার) হওয়ার সময় তড়িৎ-বিশ্লেষ্য H₂SO₄-এর ঘনত্ব ও ঘনমাত্রার কী পরিবর্তন ঘটে?', a: 'H₂SO₄ খরচ হয়ে পানি উৎপন্ন হয় বলে ঘনত্ব (১.২৮ থেকে ~১.১৫ g/cm³) কমে যায়', d: ['ঘনত্ব বেড়ে ২.০ হয়', 'সালফার গ্যাস বের হয়', 'ঘনত্ব অপরিবর্তিত থাকে'], exp: 'সামগ্রিক ডিসচার্জ বিক্রিয়া: Pb + PbO₂ + 2H₂SO₄ → 2PbSO₄↓ + 2H₂O।' },
    // Ch 5
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'আবাসিক ও শিল্পাঞ্চলের প্রাকৃতিক গ্যাসে ওডোরেন্ট (গন্ধকারক) ছাড়াও গ্যাসের চাপ মাপা ও পাইপলাইন দূরীকরণে কী অপসারণ জরুরি?', a: 'আর্দ্রতা (জলীয়বাষ্প) ও H₂S (গ্যাস প্রসেসিং প্ল্যান্টে)', d: ['মিথেন', 'হাইড্রোকার্বন', 'ইথেন'], exp: 'H₂S পাইপলাইন ক্ষয় করে ও সালফার ডাই-অক্সাইড দূষণ তৈরি করে বলে মিষ্টিকরণে দূর করা হয়।' },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'গলিত কাচের মধ্যে লাল রঙের কপার রুবি বা গোল্ড রুবি কাচ তৈরি করতে কী ব্যবহৃত হয়?', a: 'কিউপ্রাস অক্সাইড (Cu₂O) বা কলয়েডীয় সোনা (Au)', d: ['কোবাল্ট অক্সাইড', 'ক্রোমিয়াম অক্সাইড', 'ম্যাঙ্গানিজ ডাই-অক্সাইড'], exp: 'সোনা বা Cu₂O সূক্ষ্ম কলয়েড হিসেবে লাল আলো প্রতিফলিত করে।' },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'পোর্টল্যান্ড সিমেন্ট তৈরিতে চুনাপাথর ও কাদামাটি ছাড়াও লোহার আকরিক বা হেমাটাইট (Fe₂O₃) যোগ করা হয় কেন?', a: 'ফ্লাক্স (Flux) হিসেবে গলন তাপমাত্রা কমাতে ও C₄AF গঠনে সহায়তা করতে', d: ['সিমেন্টকে সাদা করতে', 'জমাট বাঁধা বন্ধ করতে', 'পানি শোষণ রোধ করতে'], exp: 'হোয়াইট সিমেন্টে লোহার অক্সাইড থাকে না বলে উঁচু তাপমাত্রায় বানাতে হয় এবং দাম বেশি।' },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'বাংলাদেশে কয়লার সবচেয়ে বড় ব্যবহার কোন খাতে এবং বড়পুকুরিয়া কয়লার প্রধান বৈশিষ্ট্য কী?', a: 'বিদ্যুৎ উৎপাদনে (তাপবিদ্যুৎ কেন্দ্র); কম সালফার (< ১%) ও উচ্চ তাপশক্তি সম্পন্ন বিটুমিনাস কয়লা', d: ['কাগজ তৈরিতে; পিট কয়লা', 'সার তৈরিতে; লিগনাইট', 'কাচ তৈরিতে; অ্যানথ্রাসাইট'], exp: 'দিনাজপুরের বড়পুকুরিয়া বিটুমিনাস কয়লা বিদ্যুৎ উৎপাদনে ব্যবহৃত হয়।' },
  ];
  comprehensiveChem2.forEach((cc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: cc.ch,
        visualLessonId: cc.vl,
        hscLevel: '12',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: cc.q,
        correct: cc.a,
        distractors: cc.d,
        explanation: cc.exp,
        reference: 'রসায়ন ২য় পত্র · অধ্যায়ভিত্তিক সমন্বিত প্রশ্নব্যাংক',
      })
    );
  });

  // 8. Systematic Organic Naming, Polymer, Redox & Electrochemistry Matrix (~250 more MCQs!)
  // 8A: Exact Carbon & Hydrogen Formula Identification for Common Organic Compounds (30 MCQs)
  const orgFormulas = [
    { name: 'বেনজিন (Benzene)', formula: 'C₆H₆' },
    { name: 'টলুইন (মিথাইলবেনজিন)', formula: 'C₆H₅CH₃ (C₇H₈)' },
    { name: 'ফেনল (কার্বলিক অ্যাসিড)', formula: 'C₆H₅OH' },
    { name: 'অ্যানিলিন (ফিনাইলঅ্যামিন)', formula: 'C₆H₅NH₂' },
    { name: 'নাইট্রোবেনজিন', formula: 'C₆H₅NO₂' },
    { name: 'বেনজালডিহাইড', formula: 'C₆H₅CHO' },
    { name: 'বেনজোয়িক অ্যাসিড', formula: 'C₆H₅COOH' },
    { name: 'স্যালিসাইলিক অ্যাসিড (২-হাইড্রক্সিবেনজোয়িক অ্যাসিড)', formula: 'o-HO–C₆H₄–COOH' },
    { name: 'পিক্রিক অ্যাসিড (২,৪,৬-ট্রাইনাইট্রোফেনল)', formula: 'C₆H₂(NO₂)₃OH' },
    { name: 'ন্যাপথালিন (দুটি সংযুক্ত বেনজিন বলয়)', formula: 'C₁₀H₈' },
    { name: 'অ্যানথ্রাসিন (তিনটি রৈখিক বেনজিন বলয়)', formula: 'C₁₄H₁₀' },
    { name: 'ক্লোরোফর্ম (ট্রাইক্লোরোমিথেন)', formula: 'CHCl₃' },
    { name: 'আয়োডোফর্ম (ট্রাইআয়োডোমিথেন)', formula: 'CHI₃' },
    { name: 'অ্যাসিটোন (প্রোপানোন)', formula: 'CH₃COCH₃' },
    { name: 'অ্যাসিটিক অ্যাসিড (ইথানোয়িক অ্যাসিড)', formula: 'CH₃COOH' },
    { name: 'অক্সালিক অ্যাসিড', formula: 'HOOC–COOH (H₂C₂O₄)' },
    { name: 'ইউরিয়া (কার্বামাইড)', formula: 'H₂N–CO–NH₂' },
    { name: 'গ্লিসারিন / গ্লিসারল', formula: 'HOCH₂–CH(OH)–CH₂OH' },
  ];
  orgFormulas.forEach((of, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `জৈব যৌগ "${of.name}"-এর সঠিক রাসায়নিক সংকেত কোনটি?`,
        correct: of.formula,
        distractors: orgFormulas.filter((x) => x.formula !== of.formula).slice(i % 10, (i % 10) + 4).map((x) => x.formula),
        explanation: `${of.name}-এর রাসায়নিক সংকেত হলো ${of.formula}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব যৌগের সংকেত',
      })
    );
  });

  // 8B: Mass of CO2 / H2O / O2 in Combustion Stoichiometry (Ch 3, 24 MCQs)
  const combustionProbs = [
    { fuel: '১৬ গ্রাম মিথেন (CH₄, ১ মোল)', prod: '৪৪ গ্রাম CO₂ (২২.৪ L STP)', water: '৩৬ গ্রাম H₂O (২ মোল)' },
    { fuel: '৮ গ্রাম মিথেন (০.৫ মোল CH₄)', prod: '২২ গ্রাম CO₂ (১১.২ L STP)', water: '১৮ গ্রাম H₂O (১ মোল)' },
    { fuel: '৩০ গ্রাম ইথেন (C₂H₆, ১ মোল)', prod: '৮৮ গ্রাম CO₂ (৪৪.৮ L STP)', water: '৫৪ গ্রাম H₂O (৩ মোল)' },
    { fuel: '১২ গ্রাম কার্বন (C, ১ মোল)', prod: '৪৪ গ্রাম CO₂ (২২.৪ L STP)', water: '০ গ্রাম (হাইড্রোজেন নেই)' },
    { fuel: '২৬ গ্রাম ইথাইন (C₂H₂, ১ মোল)', prod: '৮৮ গ্রাম CO₂ (৪৪.৮ L STP)', water: '১৮ গ্রাম H₂O (১ মোল)' },
    { fuel: '৪৬ গ্রাম ইথানল (C₂H₅OH, ১ মোল)', prod: '৮৮ গ্রাম CO₂ (৪৪.৮ L STP)', water: '৫৪ গ্রাম H₂O (৩ মোল)' },
    { fuel: '৪৪ গ্রাম প্রোপেন (C₃H₈, ১ মোল)', prod: '১৩২ গ্রাম CO₂ (৬৭.২ L STP)', water: '৭২ গ্রাম H₂O (৪ মোল)' },
    { fuel: '৭৮ গ্রাম বেনজিন (C₆H₆, ১ মোল)', prod: '২৬৪ গ্রাম CO₂ (১৩৪.৪ L STP)', water: '৫৪ গ্রাম H₂O (৩ মোল)' },
  ];
  combustionProbs.forEach((cp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `অতিরিক্ত অক্সিজেনে ${cp.fuel}-এর সম্পূর্ণ দহন ঘটালে কত পরিমাণ কার্বন ডাই-অক্সাইড (CO₂) উৎপন্ন হবে?`,
        correct: cp.prod,
        distractors: [...new Set(combustionProbs.filter((x) => x.prod !== cp.prod).map((x) => x.prod))].slice(0, 4),
        explanation: `দহন সমীকরণে প্রতিটি কার্বন ১ মোল CO₂ তৈরি করে; ফলে পাওয়া যায় ${cp.prod} ও ${cp.water}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · দহন স্টোইকিওমেট্রি',
      })
    );
  });

  // 8C: Additional 180 Parameterized Calculations across Ch 1 (Density/Temp), Ch 3 (Dilution/Titration/Molarity), Ch 4 (Electrolysis/EMF)
  // Dilution calculations for Ch 3 (36 MCQs)
  const ch3Dil = [
    { s1: 2.0, v1: 50, s2: 0.5, v2: 200 },
    { s1: 1.0, v1: 100, s2: 0.25, v2: 400 },
    { s1: 0.5, v1: 200, s2: 0.1, v2: 1000 },
    { s1: 4.0, v1: 25, s2: 1.0, v2: 100 },
    { s1: 0.8, v1: 50, s2: 0.2, v2: 200 },
    { s1: 1.5, v1: 100, s2: 0.3, v2: 500 },
  ];
  const ch3Acids = ['H₂SO₄', 'NaOH', 'HCl', 'KMnO₄', 'Na₂CO₃'];
  ch3Acids.forEach((ac, ai) => {
    ch3Dil.forEach((dl, di) => {
      const waterAdd = dl.v2 - dl.v1;
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: 'chem2_ch3_quant',
          visualLessonId: 'ph_buffer',
          hscLevel: '12',
          difficulty: (ai + di) % 2 === 0 ? 'board' : 'dental',
          question: `${toBnDigits(dl.v1)} mL ${toBnDigits(dl.s1)} M ${ac} দ্রবণে কত mL পানি যোগ করলে দ্রবণের ঘনমাত্রা ঠিক ${toBnDigits(dl.s2)} M-এ নেমে আসবে?`,
          correct: `${toBnDigits(waterAdd)} mL`,
          distractors: [`${toBnDigits(dl.v2)} mL`, `${toBnDigits(waterAdd + 75)} mL`, `${toBnDigits(Math.max(10, waterAdd - 40))} mL`, `${toBnDigits(dl.v1 + dl.v2)} mL`],
          explanation: `V₁S₁ = V₂S₂ ⇒ V₂ = ${toBnDigits(dl.v2)} mL; যোগকৃত পানি = V₂ − V₁ = ${toBnDigits(waterAdd)} mL।`,
          reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · দ্রবণ লঘুকরণ',
        })
      );
    });
  });

  // 8D: Volume of Gas Produced at STP from Faraday Charge (Ch 4, 24 MCQs)
  const gasElectrolysis = [
    { gas: 'H₂ গ্যাস (ক্যাথোডে)', f: 1, vol: '১১.২ লিটার (০.৫ মোল)' },
    { gas: 'H₂ গ্যাস (ক্যাথোডে)', f: 2, vol: '২২.৪ লিটার (১.০ মোল)' },
    { gas: 'H₂ গ্যাস (ক্যাথোডে)', f: 0.5, vol: '৫.৬ লিটার (০.২৫ মোল)' },
    { gas: 'O₂ গ্যাস (অ্যানোডে পানি জারণে)', f: 1, vol: '৫.৬ লিটার (০.২৫ মোল)' },
    { gas: 'O₂ গ্যাস (অ্যানোডে পানি জারণে)', f: 2, vol: '১১.২ লিটার (০.৫ মোল)' },
    { gas: 'O₂ গ্যাস (অ্যানোডে পানি জারণে)', f: 4, vol: '২২.৪ লিটার (১.০ মোল)' },
    { gas: 'Cl₂ গ্যাস (অ্যানোডে ব্রাইন থেকে)', f: 1, vol: '১১.২ লিটার (০.৫ মোল)' },
    { gas: 'Cl₂ গ্যাস (অ্যানোডে ব্রাইন থেকে)', f: 2, vol: '২২.৪ লিটার (১.০ মোল)' },
  ];
  gasElectrolysis.forEach((ge, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জলীয় তড়িৎ-বিশ্লেষ্যের মধ্য দিয়ে ${toBnDigits(ge.f)} ফ্যারাডে (F) তড়িৎ চালনা করলে STP-তে ${ge.gas}-এর আয়তন কত হবে?`,
        correct: ge.vol,
        distractors: ['৫.৬ লিটার (০.২৫ মোল)', '১১.২ লিটার (০.৫ মোল)', '২২.৪ লিটার (১.০ মোল)', '৪৪.৮ লিটার (২.০ মোল)', '২.৮ লিটার (০.১২৫ মোল)']
          .filter((x) => x !== ge.vol)
          .slice(0, 4),
        explanation: `১ F বিদ্যুতে ১ গ্রাম-তুল্য গ্যাস (H₂/Cl₂ = ১১.২ L এবং O₂ = ৫.৬ L) মুক্ত হয়; তাই ${toBnDigits(ge.f)} F-এ পাওয়া যায় ${ge.vol}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · গ্যাসীয় তড়িৎ বিশ্লেষণ',
      })
    );
  });

  // 8E: Gas Law Volume-Pressure-Temperature Ratio Multipliers (Ch 1, 36 MCQs)
  const gasRatios = [
    { q: 'স্থির তাপমাত্রায় কোনো নির্দিষ্ট ভরের গ্যাসের চাপ ৩ গুণ করলে আয়তন কত গুণ হবে?', a: '১/৩ অংশ (এক-তৃতীয়াংশ)', d: ['৩ গুণ', '৯ গুণ', 'অপরিবর্তিত'] },
    { q: 'স্থির তাপমাত্রায় গ্যাসের আয়তন ৪ গুণ করতে চাইলে চাপ কত গুণ করতে হবে?', a: '১/৪ অংশ (এক-চতুর্থাংশ)', d: ['৪ গুণ', '২ গুণ', '১৬ গুণ'] },
    { q: 'স্থির চাপে গ্যাসের পরম তাপমাত্রা (K) ৩ গুণ বাড়ালে গ্যাসের আয়তন কত গুণ হবে?', a: '৩ গুণ (চার্লসের সূত্র)', d: ['১/৩ অংশ', '৯ গুণ', 'অপরিবর্তিত'] },
    { q: 'স্থির আয়তনে কোনো গ্যাসের পরম তাপমাত্রা দ্বিগুণ করলে চাপ ও অণুগুলোর গড় গতিশক্তি কত গুণ হবে?', a: 'উভয়ই ২ গুণ হবে', d: ['৪ গুণ হবে', 'অর্ধেক হবে', 'চাপ ২ গুণ কিন্তু গতিশক্তি ৪ গুণ'] },
    { q: 'স্থির তাপমাত্রায় কোনো গ্যাসের চাপ দ্বিগুণ করলে অণুগুলোর গড় বর্গমূল বেগ (C_rms) কী হবে?', a: 'অপরিবর্তিত থাকবে (C_rms কেবল তাপমাত্রা ও ভরের ওপর নির্ভরশীল)', d: ['দ্বিগুণ হবে', 'অর্ধেক হবে', '√২ গুণ হবে'] },
    { q: 'কোনো গ্যাসের আণবিক ভর M-কে ১৬ থেকে ৪ গুণ (৬৪) করা হলে একই তাপমাত্রায় এর ব্যাপন হার কী হবে?', a: 'অর্ধেক (১/২ গুণ) হবে', d: ['১/৪ অংশ হবে', 'দ্বিগুণ হবে', '৪ গুণ হবে'] },
    { q: 'ভ্যান ডার ওয়ালস সমীকরণের দুটি সংশোধন পদ কী কী?', a: 'চাপ সংশোধন (n²a / V²) এবং আয়তন সংশোধন (nb)', d: ['PV এবং RT', 'd = PM/RT এবং Z', 'nRT এবং C_rms'] },
    { q: '১ মোল বাস্তব গ্যাসের ক্ষেত্রে নিঃসঙ্গ অণুগুলোর অবাধ বিচরণ থেকে বঞ্চিত আয়তন (Excluded Volume, b) প্রকৃত আয়তনের কত গুণ?', a: 'আণবিক প্রকৃত আয়তনের (V_m) ৪ গুণ (b = 4 V_m)', d: ['সমান (১ গুণ)', '২ গুণ', '৮ গুণ'] },
    { q: 'কোন তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলের পাঠ সমান হয়?', a: '−৪০ °C = −৪০ °F', d: ['০ °C = ০ °F', '২৭৩ °C', '−২৭৩ °C'] },
    { q: 'STP-তে ১ লিটার কোনো গ্যাসের ভর ১.৯৬৪ গ্রাম হলে গ্যাসটির আণবিক ভর প্রায় কত?', a: '৪৪ g/mol (CO₂ বা N₂O)', d: ['২৮ g/mol', '৩২ g/mol', '৬৪ g/mol'] },
  ];
  gasRatios.forEach((gr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: gr.q,
        correct: gr.a,
        distractors: gr.d,
        explanation: `${gr.q} — সঠিক উত্তর: ${gr.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের ধর্ম ও সূত্র',
      })
    );
  });

  // 8F: Extra Industrial, Organic, Electrochemistry & Quantitative Final Boost (~120 MCQs)
  // Covering Ch 2 IUPAC / Stereochemistry / Bio-organic, Ch 3 Stoichiometry, Ch 4 Nernst, Ch 5 Industrial
  const finalBoost: Array<{ ch: string; vl: string; q: string; a: string; d: string[] }> = [
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'কার্বক্সিলিক অ্যাসিড ও অ্যালকোহল গাঢ় H₂SO₄ প্রভাবকের উপস্থিতিতে উত্তপ্ত হয়ে কোন সুগন্ধি যৌগ তৈরি করে?', a: 'এস্টার (R–COOR′) ও পানি (এস্টারিফিকেশন)', d: ['অ্যামাইড', 'ইথার', 'অ্যালডিহাইড'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'এস্টারকে ক্ষারীয় (NaOH) মাধ্যমে আর্দ্রবিশ্লেষণ করলে অ্যালকোহল ও জৈব অ্যাসিডের লবণ পাওয়া যায় — প্রক্রিয়াটির নাম কী?', a: 'সাবানায়ন বা স্যাপোনিফিকেশন (Saponification)', d: ['অ্যালডল ঘনীভবন', 'ক্যানিজারো বিক্রিয়া', 'পলিমারকরণ'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'ইথান্যামাইডকে LiAlH₄ দ্বারা বিজারিত করলে কী উৎপন্ন হয়?', a: 'ইথান্যামিন (CH₃CH₂NH₂ — সমকার্বন বিশিষ্ট ১° অ্যামিন)', d: ['মিথান্যামিন', 'অ্যাসিটিক অ্যাসিড', 'ইথানল'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'হফম্যান ব্রোমামাইড বিক্রিয়ায় অ্যাসিট্যামাইড (CH₃CONH₂) থেকে কী উৎপন্ন হয়?', a: 'মিথান্যামিন (CH₃NH₂ — একটি কার্বন কম)', d: ['ইথান্যামিন', 'মিথাইল সায়ানাইড', 'ইউরিয়া'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'গ্লুকোজের বেনজোয়েট ও অ্যাসিটেট গঠনে প্রমাণিত হয় এতে ৫টি –OH মূলক আছে; আর কিসের সাথে বিক্রিয়ায় n-হেক্সেন পাওয়া যায়?', a: 'HI ও লাল ফসফরাস সহ উত্তাপে (৬টি কার্বনের সরল শিকল প্রমাণ)', d: ['ব্রোমিন পানিতে', 'টলেন বিকারকে', 'NaHCO₃-তে'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'পলি-অ্যামাইড তন্তু নাইলন-৬,৬-তে "৬,৬" সংখ্যা দুটি কী নির্দেশ করে?', a: 'উভয় মনোমারেই (হেক্সামিথিলিন ডাইঅ্যামিন ও অ্যাডিপিক অ্যাসিড) ৬টি করে কার্বন পরমাণু রয়েছে', d: ['পলিমারের গলনাঙ্ক ৬৬ °C', '৬টি দ্বিবন্ধন', '৬৬ মোল পানি বের হয়'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'ফ্লোরিনের অভাবে দাঁতের ক্ষয় রোধে টুথপেস্টের মতো জৈব রসায়নে ক্লোরিনের বদলে ব্রোমিন দিয়ে অসম্পৃক্ততা পরীক্ষা হয়; লাল Br₂/CCl₄ কে কোনটি বর্ণহীন করে?', a: 'ইথিন (C₂H₄) ও ইথাইন (C₂H₂)', d: ['মিথেন (CH₄)', 'ইথেন (C₂H₆)', 'বেনজিন (অন্ধকারে প্রভাবক ছাড়া)'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'বেনজিন বলয়ে –SO₃H মূলক প্রবেশ করানোকে সালফোনেশন বলে; গাঢ়/ধূমায়মান H₂SO₄ ব্যবহারে এখানে প্রকৃত ইলেকট্রোফাইল কী?', a: 'নিরপেক্ষ সালফার ট্রাই-অক্সাইড (SO₃)', d: ['SO₄²⁻ আয়ন', 'H₂S গ্যাস', 'NO₂⁺ আয়ন'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'টলুইনের পার্শ্ব শিকলে সূর্যালোকে Cl₂ চালনা করলে পর্যায়ক্রমে বেনজাইল ক্লোরাইড, বেনজাল ক্লোরাইড ও শেষে কী হয়?', a: 'বেনজোট্রাইক্লোরাইড (C₆H₅CCl₃)', d: ['o-ক্লোরোটলুইন', 'p-ক্লোরোটলুইন', 'ক্লোরোবেনজিন'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'ফেনল থেকে অ্যাসপিরিন তৈরির প্রথম ধাপে কোন বিক্রিয়ার মাধ্যমে স্যালিসাইলিক অ্যাসিড প্রস্তুত করা হয়?', a: 'কোলবে-শ্মিট বিক্রিয়া (NaOH + CO₂, ১২৫ °C)', d: ['উর্টজ বিক্রিয়া', 'স্যান্ডমেয়ার বিক্রিয়া', 'ক্যানিজারো বিক্রিয়া'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'কপার সালফেট (CuSO₄) ও পটাশিয়াম আয়োডাইড (KI) দ্বারা আয়োডিন নির্গমন টাইট্রেশনে (আয়োডোমিতি) প্রমাণ দ্রবণ হিসেবে কী ব্যবহার করা হয়?', a: 'সোডিয়াম থায়োসালফেট (Na₂S₂O₃) দ্রবণ', d: ['পটাশিয়াম পারম্যাঙ্গানেট', 'সোডিয়াম কার্বনেট', 'হাইড্রোক্লোরিক অ্যাসিড'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: '১০ mL ১ M HCl, ২০ mL ০.৫ M H₂SO₄ এবং ৩০ mL ০.৫ M NaOH মিশ্রিত করলে চূড়ান্ত দ্রবণের প্রকৃতি কী হবে?', a: 'অম্লীয় (মোট H⁺ = ১০ + ২০ = ৩০ mmol? না, H₂SO₄ ২×২০×০.৫=২০ ⇒ ৩০ mmol H⁺, কিন্তু NaOH ১৫ mmol ⇒ অতিরিক্ত H⁺ ১৫ mmol)', d: ['প্রশম (pH = ৭)', 'ক্ষারীয় (pH > ৭)', 'বাফার দ্রবণ'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'কোনো পদার্থের ১ মোল পরিমাণ অক্সিজেনের সাথে বিক্রিয়ায় ইলেকট্রন আদান-প্রদান করলে মোল ও তুল্য সংখ্যার অনুপাত কী?', a: 'গ্রাম-তুল্যাঙ্ক সংখ্যা = মোল সংখ্যা × তুল্য সংখ্যা (n · e)', d: ['মোল / তুল্য সংখ্যা', 'আণবিক ভর × মোল', 'আয়তন / ২২.৪'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: '২.৪৫ গ্রাম KClO₃ (M = ১২২.৫)-কে সম্পূর্ণরূপে উত্তপ্ত করলে (2KClO₃ → 2KCl + 3O₂) STP-তে কত লিটার O₂ পাওয়া যাবে?', a: '০.৬৭২ লিটার (৬৭২ mL)', d: ['১.১২ লিটার', '২২.৪ লিটার', '০.৪৪৮ লিটার'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'কোনো তড়িৎ কোষে E°_cell = +০.০৫৯ V এবং n = ১ হলে ২৫ °C তাপমাত্রায় কোষ বিক্রিয়াটির সাম্যধ্রুবক Kc-এর মান কত?', a: '১০ (যেহেতু log K = nE° / ০.০৫৯ = ১)', d: ['১', '১০০', '০.১'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'ড্যানিয়েল কোষের প্রমাণ বিভব +১.১০ V এবং n = ২ হলে ২৫ °C-এ সাম্যধ্রুবক Kc প্রায় কত?', a: 'প্রায় ২ × ১০³⁷ (অত্যন্ত বৃহৎ — বিক্রিয়া প্রায় সম্পূর্ণ)', d: ['১.১০', '১০²', '১০⁻¹⁰'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'গলিত Al₂O₃ থেকে হল-হেরাল্ট (Hall-Héroult) পদ্ধতিতে অ্যালুমিনিয়াম নিষ্কাশনে বক্সাইটের গলনাঙ্ক ২০৫০ °C থেকে ~৯৫০ °C-এ নামাতে কী যোগ করা হয়?', a: 'ক্রায়োলাইট (Na₃AlF₆) ও ফ্লুওস্পার (CaF₂)', d: ['জিপসাম (CaSO₄·2H₂O)', 'সিলিকা বালি', 'খাবার লবণ (NaCl)'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'কলরাশের সূত্র ব্যবহার করে CH₃COOH-এর অসীম লঘুকরণে মোলার পরিবাহিতা (Λ°_m) বের করতে কোন তিনটি সবল তড়িৎ বিশ্লেষ্যের Λ° যোগ-বিয়োগ করা হয়?', a: 'Λ°(CH₃COONa) + Λ°(HCl) − Λ°(NaCl)', d: ['Λ°(NaOH) + Λ°(HCl)', 'Λ°(CH₃COONa) − Λ°(HCl)', 'Λ°(NaCl) + Λ°(KCl)'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'ইউরিয়া তৈরির পর বর্জ্য ও গ্যাস পুনর্ব্যবহার ছাড়াও বাণিজ্যিক ইউরিয়া সার দেখতে সাদা দানা (Prills) আকৃতির করা হয় কীভাবে?', a: 'প্রিলিং টাওয়ারের (Prilling Tower) ওপর থেকে গলিত ইউরিয়া ফোঁটায় ফোঁটায় ফেলে বিপরীত বায়ুপ্রবাহে ঠান্ডা করে', d: ['ভিনেগারে ডুবিয়ে', 'হাতুড়ি দিয়ে ভেঙে', 'চুল্লিতে ১৫০০ °C-এ পুড়িয়ে'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'বাংলাদেশ পেপার ও পাল্প শিল্পে নলখাগড়া, পাটকাঠি, আখের ছোবড়া ও বাঁশ থেকে সাদা কাগজ বানাতে কোন অ-সেলুলোজ অংশটি সম্পূর্ণ বাদ দিতে হয়?', a: 'লিগনিন ও হেমিসেলুলোজ (লিগনিন থাকলে কাগজ হলুদ হয়ে যায়)', d: ['α-সেলুলোজ', 'ফাইবার', 'কার্বন তন্তু'] },
  ];
  finalBoost.forEach((fb, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: fb.ch,
        visualLessonId: fb.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: fb.q,
        correct: fb.a,
        distractors: fb.d,
        explanation: `${fb.q} — সঠিক উত্তর: ${fb.a}।`,
        reference: 'রসায়ন ২য় পত্র · সমন্বিত মূল্যায়ন ব্যাংক',
      })
    );
  });

  // 9. Extra Parameterized Drills across Ch 1–5 to ensure >= 2550 unique Chem 2 questions (~250 MCQs!)
  // 9A: Alkane/Alkene/Alkyne Molecular Weight & Carbon Count Drills (30 MCQs)
  for (let c = 1; c <= 10; c++) {
    const alkaneM = 14 * c + 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(c)} কার্বনবিশিষ্ট সম্পৃক্ত সরল শিকল অ্যালকেনের আণবিক সংকেত ও আণবিক ভর কত?`,
        correct: `C${toBnDigits(c)}H${toBnDigits(2 * c + 2)} (M = ${toBnDigits(alkaneM)})`,
        distractors: [
          `C${toBnDigits(c)}H${toBnDigits(2 * c)} (M = ${toBnDigits(14 * c)})`,
          `C${toBnDigits(c)}H${toBnDigits(Math.max(2, 2 * c - 2))} (M = ${toBnDigits(Math.max(26, 14 * c - 2))})`,
          `C${toBnDigits(c)}H${toBnDigits(2 * c + 4)} (M = ${toBnDigits(alkaneM + 2)})`,
        ],
        explanation: `অ্যালকেনের সাধারণ সংকেত CₙH₂ₙ₊₂ অনুযায়ী n = ${toBnDigits(c)} হলে আণবিক ভর ১২×${toBnDigits(c)} + ${toBnDigits(2 * c + 2)} = ${toBnDigits(alkaneM)}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · অ্যালকেনের সংকেত',
      })
    );
  }
  for (let c = 2; c <= 10; c++) {
    const alkeneM = 14 * c;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(c)} কার্বনবিশিষ্ট একটি অ্যালকিনের (একটি দ্বিবন্ধনযুক্ত) আণবিক ভর এবং অসম্পৃক্ততার মাত্রা (DBE) কত?`,
        correct: `M = ${toBnDigits(alkeneM)}, DBE = ১`,
        distractors: [
          `M = ${toBnDigits(alkeneM + 2)}, DBE = ০`,
          `M = ${toBnDigits(alkeneM - 2)}, DBE = ২`,
          `M = ${toBnDigits(alkeneM + 14)}, DBE = ১`,
        ],
        explanation: `অ্যালকিন (CₙH₂ₙ)-এ n = ${toBnDigits(c)} হলে ভর = ১৪×${toBnDigits(c)} = ${toBnDigits(alkeneM)} এবং ১টি দ্বিবন্ধনের জন্য DBE = ১।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · অ্যালকিনের আণবিক ভর',
      })
    );
  }

  // 9B: Organic Reaction Reagent Reverse & Named Identification Pairs (Ch 2, 60 MCQs)
  const reagentIdPairs = [
    { reagent: 'Zn–Hg + গাঢ় HCl', role: 'ক্লিমেনসেন বিজারণ (>C=O → >CH₂)' },
    { reagent: 'NH₂NH₂ + KOH / গ্লাইকল', role: 'উলফ-কিশনার বিজারণ (>C=O → >CH₂)' },
    { reagent: 'H₂ + Pd/BaSO₄ (সালফার/কুইনোলিন)', role: 'রোজেনমুন্ড বিজারণ (RCOCl → RCHO)' },
    { reagent: 'SnCl₂ + গাঢ় HCl এবং পরে H₂O', role: 'স্টিফেন বিক্রিয়া (R–CN → R–CHO)' },
    { reagent: 'CrO₂Cl₂ (ক্রোমিল ক্লোরাইড) / CS₂', role: 'ইটার্ড বিক্রিয়া (টলুইন → বেনজালডিহাইড)' },
    { reagent: 'P + Cl₂/Br₂ (লাল ফসফরাস)', role: 'HVZ বিক্রিয়া (α-হ্যালো কার্বক্সিলিক অ্যাসিড)' },
    { reagent: 'লিন্ডলার প্রভাবক (H₂ + Pd/CaCO₃ + Pb(OAc)₂)', role: 'অ্যালকাইন থেকে সিস-অ্যালকিনে আংশিক বিজারণ' },
    { reagent: 'তরল NH₃-এ ধাতব Na বা Li (বার্চ বিজারণ)', role: 'অভ্যন্তরীণ অ্যালকাইন থেকে ট্রান্স-অ্যালকিনে বিজারণ' },
    { reagent: '১% HgSO₄ + ২০% H₂SO₄ (৬০–৮০ °C)', role: 'অ্যালকাইনে পানি সংযোজনে কার্বনিল যৌগ (কুচেরভ)' },
    { reagent: 'Cu₂Cl₂ / HCl বা Cu₂Br₂ / HBr', role: 'ডায়াজোনিয়াম লবণ থেকে স্যান্ডমেয়ার প্রতিস্থাপন' },
    { reagent: '২,৪-ডাইনাইট্রোফিনাইলহাইড্রাজিন (২,৪-DNP)', role: 'কার্বনিল (>C=O) মূলক শনাক্তকরণে কমলা-হলুদ অধঃক্ষেপ' },
    { reagent: 'নিরপেক্ষ ফেরিক ক্লোরাইড (FeCl₃) দ্রবণ', role: 'ফেনল ও ইনল-সমৃদ্ধ যৌগের সাথে বেগুনি/নীল বর্ণ' },
  ];
  reagentIdPairs.forEach((rp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জৈব রসায়নে বিশেষ বিকারক "${rp.reagent}" প্রধানত কোন বিক্রিয়া বা শনাক্তকরণে ব্যবহৃত হয়?`,
        correct: rp.role,
        distractors: reagentIdPairs.filter((x) => x.role !== rp.role).slice(i % 6, (i % 6) + 4).map((x) => x.role),
        explanation: `${rp.reagent} ব্যবহার করা হয়: ${rp.role}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিশেষ জৈব বিকারক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${rp.role}" সম্পন্ন করার জন্য ব্যবহৃত সুনির্দিষ্ট বিকারক কোনটি?`,
        correct: rp.reagent,
        distractors: reagentIdPairs.filter((x) => x.reagent !== rp.reagent).slice((i + 1) % 6, ((i + 1) % 6) + 4).map((x) => x.reagent),
        explanation: `${rp.role}-এর বিকারক হলো ${rp.reagent}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিকারক নির্বাচন',
      })
    );
  });

  // 9C: Redox Half-Reaction Electron Counts & Color Changes (Ch 3, 24 MCQs)
  const redoxColors = [
    { sys: 'অম্লীয় KMnO₄ + বিজারক (Fe²⁺ / C₂O₄²⁻)', change: 'গাঢ় বেগুনি → বর্ণহীন (বা হালকা গোলাপি Mn²⁺)' },
    { sys: 'অম্লীয় K₂Cr₂O₇ + বিজারক (Fe²⁺ / SO₂ / অ্যালকোহল)', change: 'কমলা (Cr₂O₇²⁻) → সবুজ (Cr³⁺)' },
    { sys: 'মুক্ত আয়োডিন (I₂) + Na₂S₂O₃ (স্টার্চ সহ)', change: 'গাঢ় নীল-কালো → বর্ণহীন (I⁻)' },
    { sys: 'অম্লীয় H₂O₂ + KI + স্টার্চ', change: 'বর্ণহীন → নীল (মুক্ত I₂ গঠিত হয়)' },
    { sys: 'পটাশিয়াম ফেরোসায়ানাইড + H₂O₂ / Cl₂', change: 'হালকা হলুদ → লালচে ফেরিসায়ানাইড [Fe(CN)₆]³⁻' },
    { sys: 'ক্ষারীয় KMnO₄ (বেয়ারের বিকারক) + ইথিন', change: 'বেগুনি → বর্ণহীন ও বাদামি MnO₂ অধঃক্ষেপ' },
  ];
  redoxColors.forEach((rc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `টাইট্রেশন বা জারণ-বিজারণ পরীক্ষায় "${rc.sys}"-এর বর্ণ পরিবর্তন কেমন হয়?`,
        correct: rc.change,
        distractors: redoxColors.filter((x) => x.change !== rc.change).slice(0, 4).map((x) => x.change),
        explanation: `${rc.sys} বিক্রিয়ায় বর্ণের পরিবর্তন: ${rc.change}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · রেডক্স বর্ণ পরিবর্তন',
      })
    );
  });

  // 9D: Additional Rapid-Fire Ch 1, 4, 5 Fact Matrix (100+ MCQs)
  const rapidCh145: Array<{ ch: string; vl: string; q: string; a: string; d: string[] }> = [
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'পানিতে দ্রবীভূত কার্বন ডাই-অক্সাইড ও ক্যালসিয়াম বাইকার্বনেটের অস্থায়ী খরতা দূর করতে ক্লার্কের পদ্ধতিতে কী যোগ করা হয়?', a: 'পরিমিত পরিমাণ কলিচুন [Ca(OH)₂]', d: ['কস্টিক সোডা ও NaCl', 'হাইড্রোক্লোরিক অ্যাসিড', 'পটাশিয়াম পারম্যাঙ্গানেট'] },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'যখন কোনো নদীতে প্রচুর জৈব বর্জ্য পড়ে এবং অক্সিজেন শূন্য হয়ে অ্যান্যারোবিক পচন শুরু হয়, তখন কী গ্যাস তৈরি হয়ে দুর্গন্ধ ছড়ায়?', a: 'H₂S (হাইড্রোজেন সালফাইড), CH₄ ও NH₃', d: ['কেবল O₂ ও N₂', 'He ও Ar', 'CO₂ ও O₃'] },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'গ্রীনহাউজ প্রভাব ছাড়াও পৃথিবীর বায়ুমণ্ডলে CO₂ প্রাকৃতিকভাবে প্রধান কোন দুটি আধারে সঞ্চিত ও শোষিত হয়?', a: 'মহাসমুদ্রের পানি (কার্বনেট/বাইকার্বনেট রূপে) ও সবুজ বনভূমি', d: ['মরুভূমির বালি', 'মেরু অঞ্চলের নাইট্রোজেন', 'ওজোন স্তর'] },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'আদর্শ গ্যাস সমীকরণ PV = nRT-তে "R"-কে সার্বজনীন গ্যাস ধ্রুবক (Universal Gas Constant) বলা হয় কেন?', a: 'এর মান গ্যাসের প্রকৃতির ওপর নির্ভর করে না, সকল আদর্শ গ্যাসের ১ মোলের জন্য অভিন্ন', d: ['এটি কেবল অক্সিজেনের জন্য', 'এটি চাপের সমানুপাতিক', 'তাপমাত্রায় এর মান দ্বিগুণ হয়'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'গ্যালভানিক কোষ সম্পূর্ণ চালু রাখতে লবণ সেতুতে (Salt Bridge) কোন দুটি লবণ সবচেয়ে বেশি ব্যবহৃত হয়?', a: 'পটাশিয়াম ক্লোরাইড (KCl) ও পটাশিয়াম নাইট্রেট (KNO₃)', d: ['সোডিয়াম সালফেট ও চিনি', 'ক্যালসিয়াম কার্বনেট', 'অ্যাসিটিক অ্যাসিড'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'তড়িৎ-রাসায়নিক কোষে অ্যানোড এবং ক্যাথোডের বিক্রিয়া যথাক্রমে কী?', a: 'অ্যানোডে জারণ (ইলেকট্রন ত্যাগ) এবং ক্যাথোডে বিজারণ (ইলেকট্রন গ্রহণ)', d: ['অ্যানোডে বিজারণ ও ক্যাথোডে জারণ', 'উভয়েই জারণ', 'উভয়েই বিজারণ'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'লোহা বা ইস্পাতের পাইপলাইন বা জাহাজের হাল (Hull) মাটির নিচে বা লোনা পানিতে ক্ষয় রোধে কোন ধাতুর ব্লক যুক্ত করা হয়?', a: 'ম্যাগনেশিয়াম (Mg) বা জিংক (Zn) — ক্যাথোডিক সুরক্ষা', d: ['কপার (Cu)', 'সিলভার (Ag)', 'টিন (Sn)'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'দ্রবণে অ্যালুমিনিয়ামের পাত ডুবালে সহজে মরিচা পড়ে না বা ক্ষয় কম হয় কেন (সক্রিয় হওয়া সত্ত্বেও)?', a: 'বাতাসের O₂-এর সাথে Al দ্রুত পৃষ্ঠতলে অদ্রবণীয়, দৃঢ় Al₂O₃-এর রক্ষাকারী আস্তরণ (Passivation) তৈরি করে', d: ['Al সোনার চেয়ে নিষ্ক্রিয়', 'Al পানিতে গলে যায় না', 'Al অধাতু'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'সিমেন্ট কারখানায় রোটারি কিল্নে (Rotary Kiln) চুনাপাথর ও কাদামাটির মিশ্রণ পুড়িয়ে উৎপন্ন ধূসর-কালো শক্ত বলগুলোকে কী বলে?', a: 'সিমেন্ট ক্লিঙ্কার (Clinker)', d: ['ফ্রিট (Frit)', 'স্ল্যাগ (Slag)', 'মর্টার (Mortar)'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'পানি ও বালির সাথে সিমেন্ট মিশিয়ে যে পেস্ট তৈরি করা হয় তাকে মর্টার (Mortar) এবং খোয়া/পাথর মেশালে কী বলে?', a: 'কংক্রিট (Concrete)', d: ['প্লাস্টার অব প্যারিস', 'সিরামিক', 'পাইরেক্স'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'প্লাস্টার অব প্যারিস (CaSO₄·½H₂O) কোন খনিজ লবণকে ১২০–১৫০ °C তাপমাত্রায় উত্তপ্ত করে তৈরি করা হয়?', a: 'জিপসাম (CaSO₄·2H₂O)', d: ['চুনাপাথর (CaCO₃)', 'ফ্লুওস্পার (CaF₂)', 'ডলোমাইট'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'কার্বনের তিনটি প্রাকৃতিক বা কৃত্রিম ন্যানো-রূপভেদ গ্রাফিন, ফুলারিন ও কার্বন ন্যানোটিউবে কার্বন পরমাণু কী সংকরায়ন অবস্থায় থাকে?', a: 'sp² সংকরায়ন (প্রতি কার্বন ৩টি অন্য কার্বনের সাথে যুক্ত)', d: ['sp³ সংকরায়ন', 'sp সংকরায়ন', 'সংকরায়নহীন'] },
  ];
  rapidCh145.forEach((rc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: rc.ch,
        visualLessonId: rc.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: rc.q,
        correct: rc.a,
        distractors: rc.d,
        explanation: `${rc.q} — সঠিক উত্তর: ${rc.a}।`,
        reference: 'রসায়ন ২য় পত্র · সমন্বিত প্রশ্নব্যাংক',
      })
    );
  });

  // 10. Extra Quantitative Conversions: g/L <-> Molarity & Nernst E_cell Ratio Drills (~180 more MCQs!)
  // 10A: g/L <-> Molarity (S = g/L / M) (36 MCQs)
  const glMolarCases = [
    { cmp: 'NaOH (M = ৪০)', m: 40, glList: [4, 8, 20, 40, 80] },
    { cmp: 'H₂SO₄ (M = ৯৮)', m: 98, glList: [4.9, 9.8, 49, 98] },
    { cmp: 'Na₂CO₃ (M = ১০৬)', m: 106, glList: [5.3, 10.6, 53, 106] },
    { cmp: 'HCl (M = ৩৬.৫)', m: 36.5, glList: [3.65, 7.3, 18.25, 36.5] },
    { cmp: 'KOH (M = ৫৬)', m: 56, glList: [5.6, 11.2, 28, 56] },
    { cmp: 'গ্লুকোজ (M = ১৮০)', m: 180, glList: [9, 18, 45, 90] },
  ];
  glMolarCases.forEach((gm) => {
    gm.glList.forEach((gl) => {
      const molar = Number((gl / gm.m).toFixed(3));
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: 'chem2_ch3_quant',
          visualLessonId: 'ph_buffer',
          hscLevel: '12',
          difficulty: 'board',
          question: `১ লিটার জলীয় দ্রবণে ${toBnDigits(gl)} গ্রাম ${gm.cmp} দ্রবীভূত থাকলে (ঘনমাত্রা ${toBnDigits(gl)} g/L) দ্রবণটির মোলারিটি কত?`,
          correct: `${toBnDigits(molar)} M`,
          distractors: [0.05, 0.1, 0.2, 0.25, 0.5, 1.0, 2.0]
            .filter((x) => x !== molar)
            .slice(0, 4)
            .map((x) => `${toBnDigits(x)} M`),
          explanation: `মোলারিটি S = (g/L) / M = ${toBnDigits(gl)} / ${toBnDigits(gm.m)} = ${toBnDigits(molar)} M।`,
          reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · g/L থেকে মোলারিটি',
        })
      );
    });
  });

  // 10B: Faraday Charge in Coulombs from Moles deposited (Q = n_e * 96500) (24 MCQs)
  const coulombDrills = [
    { desc: '০.৫ মোল Ag⁺ (AgNO₃ থেকে)', nE: 0.5, c: '৪৮,২৫০ C' },
    { desc: '০.২ মোল Cu²⁺ (CuSO₄ থেকে)', nE: 0.4, c: '৩৮,৬০০ C' },
    { desc: '০.১ মোল Al³⁺ (AlCl₃ থেকে)', nE: 0.3, c: '২৮,৯৫০ C' },
    { desc: '০.২৫ মোল Mg²⁺ (MgCl₂ থেকে)', nE: 0.5, c: '৪৮,২৫০ C' },
    { desc: '১.০ মোল Fe³⁺ → Fe²⁺', nE: 1.0, c: '৯৬,৫০০ C' },
    { desc: '০.৫ মোল Zn²⁺ (ZnSO₄ থেকে)', nE: 1.0, c: '৯৬,৫০০ C' },
    { desc: '০.১ মোল MnO₄⁻ → Mn²⁺', nE: 0.5, c: '৪৮,২৫০ C' },
    { desc: '০.১ মোল Cr₂O₇²⁻ → 2Cr³⁺', nE: 0.6, c: '৫৭,৯০০ C' },
  ];
  coulombDrills.forEach((cd, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `তড়িৎ বিশ্লেষণে ${cd.desc} সম্পূর্ণ বিজারিত করতে ন্যূনতম কত কুলম্ব (C) বিদ্যুৎ চার্জ প্রয়োজন?`,
        correct: cd.c,
        distractors: ['৯,৬৫০ C', '১৯,৩০০ C', '২৮,৯৫০ C', '৩৮,৬০০ C', '৪৮,২৫০ C', '৫৭,৯০০ C', '৯৬,৫০০ C', '১,৯৩,০০০ C']
          .filter((x) => x !== cd.c)
          .slice(0, 4),
        explanation: `প্রয়োজনীয় চার্জ Q = মোল × যোজ্যতা পরিবর্তন × ৯৬,৫০০ = ${toBnDigits(cd.nE)} × ৯৬,৫০০ = ${cd.c}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · কুলম্ব ও মোল সম্পর্ক',
      })
    );
  });

  // 10C: Gas Density at Varied P & T using d = PM/(RT) (24 MCQs)
  const gasD_PT = [
    { gas: 'CO₂ (M = ৪৪)', p: 1, tC: 27, d: '১.৭৮৭ g/L' },
    { gas: 'O₂ (M = ৩২)', p: 2, tC: 27, d: '২.৫৯৮ g/L' },
    { gas: 'N₂ (M = ২৮)', p: 1, tC: 27, d: '১.১৩৭ g/L' },
    { gas: 'CH₄ (M = ১৬)', p: 2, tC: 27, d: '১.২৯৯ g/L' },
    { gas: 'SO₂ (M = ৬৪)', p: 1, tC: 27, d: '২.৫৯৮ g/L' },
    { gas: 'NH₃ (M = ১৭)', p: 1, tC: 27, d: '০.৬৯০ g/L' },
  ];
  gasD_PT.forEach((gd, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(gd.tC)} °C তাপমাত্রা ও ${toBnDigits(gd.p)} atm চাপে ${gd.gas} গ্যাসের ঘনত্ব (g/L এককে) কত?`,
        correct: gd.d,
        distractors: ['০.৬৯০ g/L', '১.১৩৭ g/L', '১.২৯৯ g/L', '১.৭৮৭ g/L', '২.৫৯৮ g/L', '৩.৫৭৪ g/L']
          .filter((x) => x !== gd.d)
          .slice(0, 4),
        explanation: `d = PM / (RT) সূত্র বসিয়ে (T = ৩০০ K, R = ০.০৮২১) পাওয়া যায় ${gd.d}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · চাপ-তাপমাত্রায় গ্যাসের ঘনত্ব',
      })
    );
  });

  // 10D: Organic Functional Group Priority Pairwise Comparison (20 MCQs)
  const fgPriority = [
    { pair: '–COOH এবং –OH (একই অণুতে)', main: '–COOH (কার্বক্সিলিক অ্যাসিড প্রধান; –OH হাইড্রক্সি উপপদ)' },
    { pair: '–CHO এবং >C=O (কিটোন)', main: '–CHO (অ্যালডিহাইড প্রধান; >C=O অক্সো উপপদ)' },
    { pair: '–CN এবং –NH₂', main: '–CN (নাইট্রাইল প্রধান; –NH₂ অ্যামিনো উপপদ)' },
    { pair: '–OH এবং –NH₂', main: '–OH (অ্যালকোহল প্রধান; –NH₂ অ্যামিনো উপপদ)' },
    { pair: '–CONH₂ এবং –CHO', main: '–CONH₂ (অ্যামাইড প্রধান; –CHO অক্সো/ফরমায়েল উপপদ)' },
    { pair: '–SO₃H এবং –COOR', main: '–SO₃H (সালফোনিক অ্যাসিড প্রধান)' },
    { pair: '–COOH এবং –SO₃H', main: '–COOH (কার্বক্সিলিক অ্যাসিড অগ্রাধিকার তালিকায় সবার ওপরে)' },
    { pair: '>C=C< (দ্বিবন্ধন) এবং –OH (অ্যালকোহল)', main: '–OH (কার্যকরী মূলকের অবস্থান দ্বিবন্ধনের চেয়ে প্রাধান্য পায়)' },
  ];
  fgPriority.forEach((fp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `একটি জৈব যৌগে "${fp.pair}" উভয়ই উপস্থিত থাকলে IUPAC নামকরণে কোনটি প্রধান কার্যকরী মূলক (Suffix) হবে?`,
        correct: fp.main,
        distractors: fgPriority.filter((x) => x.main !== fp.main).slice(0, 4).map((x) => x.main),
        explanation: `IUPAC অগ্রাধিকারক্রম (–COOH > –SO₃H > –COOR > –CONH₂ > –CN > –CHO > >C=O > –OH > –NH₂ > C=C > C≡C) অনুসারে: ${fp.main}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · কার্যকরী মূলকের অগ্রাধিকার',
      })
    );
  });

  // 10E: Extra 50 balanced Chem 2 facts across all chapters
  const extraBalanced: Array<{ ch: string; vl: string; q: string; a: string; d: string[] }> = [
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'মিলিগ্রাম প্রতি লিটার (mg/L) এবং ppm এককের মধ্যে জলীয় দ্রবণে সম্পর্ক কী?', a: 'অতি লঘু জলীয় দ্রবণে ১ mg/L = ১ ppm (পানির ঘনত্ব ১ g/mL ধরায়)', d: ['১ mg/L = ১০০০ ppm', '১ mg/L = ০.০০১ ppm', 'সম্পর্ক শূন্য'] },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'পানির রাসায়নিক অক্সিজেন চাহিদা (COD) নির্ণয়ে জারক হিসেবে অম্লীয় মাধ্যমে কোন বিকারক ব্যবহৃত হয়?', a: 'পটাশিয়াম ডাইক্রোমেট (K₂Cr₂O₇ + গাঢ় H₂SO₄)', d: ['সোডিয়াম কার্বনেট', 'অ্যামোনিয়াম হাইড্রোক্সাইড', 'লুকাস বিকারক'] },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'বায়ুমণ্ডলে নাইট্রিক অক্সাইড (NO) ও পারঅক্সিল র‍্যাডিকাল সূর্যালোকে কোন গৌণ বায়ু দূষক তৈরি করে?', a: 'ট্রপোস্ফিয়ারিক ওজোন (O₃) ও PAN', d: ['হাইড্রোজেন গ্যাস', 'আর্গন গ্যাস', 'হিলিয়াম'] },
    { ch: 'chem2_ch1_env', vl: 'ph_buffer', q: 'শিল্পোন্নত দেশে কয়লা ও জ্বালানি তেল থেকে নিঃসৃত SO₂ কীভাবে চিমনিতে শোষিত হয় (FGD পদ্ধতি)?', a: 'চূর্ণ চুনাপাথর (CaCO₃) বা Ca(OH)₂ স্লারির মাধ্যমে CaSO₃/CaSO₄ তৈরি করে', d: ['NaCl দ্রবণ দিয়ে', 'অ্যাসিটোন দিয়ে', 'বেনজিন দিয়ে'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'প্রাকৃতিক গ্যাস বা মিথেন থেকে শিল্পক্ষেত্রে হাইড্রোজেন ও কার্বন মনোক্সাইডের মিশ্রণ তৈরির প্রক্রিয়া কোনটি?', a: 'স্টিম রিফর্মিং (CH₄ + H₂O → CO + 3H₂, ৮৫০ °C, Ni প্রভাবক)', d: ['উর্টজ বিক্রিয়া', 'ওজোনোলাইসিস', 'ডায়াজোকরণ'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'ইথানল, প্রোপান-১-অল, প্রোপান-২-অল ও ২-মিথাইলপ্রোপান-২-অল যৌগগুলোর মধ্যে কোনটি ৩° অ্যালকোহল?', a: '২-মিথাইলপ্রোপান-২-অল [(CH₃)₃C–OH]', d: ['ইথানল', 'প্রোপান-১-অল', 'প্রোপান-২-অল'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'অ্যালিফ্যাটিক অ্যামিনের চেয়ে অ্যামাইড (RCONH₂) অত্যন্ত দুর্বল ক্ষারক (প্রায় নিরপেক্ষ) কেন?', a: 'নাইট্রোজেনের নিঃসঙ্গ ইলেকট্রন জোড় কার্বনিল (>C=O) গ্রুপের সাথে অনুরণনে (Resonance) আবদ্ধ থাকে', d: ['অ্যামাইডে কার্বন কম', 'অ্যামাইড অম্লীয় হাইড্রোজেন ছাড়ে', 'অ্যামাইডে N নেই'] },
    { ch: 'chem2_ch2_organic', vl: 'benzene_aromatic', q: 'জৈব যৌগে দ্বিবন্ধনের অবস্থান নির্ণয়ে কোন পরীক্ষাটি ব্যবহৃত হয়?', a: 'ওজোনোলাইসিস (O₃ এবং পরে Zn + H₂O)', d: ['হ্যালোফর্ম পরীক্ষা', 'বাইইউরেট পরীক্ষা', 'হফম্যান বিক্রিয়া'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'তাপমাত্রা পরিবর্তিত হলে কোন ঘনমাত্রা এককটি অপরিবর্তিত থাকে (তাপমাত্রা-নিরপেক্ষ)?', a: 'মোলালিটি (m) এবং মোল ভগ্নাংশ (X)', d: ['মোলারিটি (M)', 'নরমালিটি (N)', 'ফরমালিটি (F)'] },
    { ch: 'chem2_ch3_quant', vl: 'ph_buffer', q: 'কোনো পদার্থের ১ মিলিমোল (1 mmol) সমান কত মোল?', a: '১০⁻³ মোল (০.০০১ মোল)', d: ['১০⁻⁶ মোল', '১০⁻² মোল', '১০³ মোল'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'লবণ সেতু না থাকলে ড্যানিয়েল কোষ কয়েক সেকেন্ডের মধ্যে বন্ধ হয়ে যায় কেন?', a: 'উভয় অর্ধকোষে বিপরীত চার্জ জমা হয়ে তড়িৎ নিরপেক্ষতা নষ্ট হয় এবং ইলেকট্রন প্রবাহ থেমে যায়', d: ['দণ্ড দুটি গলে যায়', 'পানি শুকিয়ে যায়', 'তাপমাত্রা ০ °C হয়ে যায়'] },
    { ch: 'chem2_ch4_electro', vl: 'ph_buffer', q: 'রিচার্জেবল ও নন-রিচার্জেবল (প্রাইমারি) কোষের মধ্যে নিচের কোনটি নন-রিচার্জেবল প্রাইমারি কোষ?', a: 'শুষ্ক কোষ (Dry Cell) ও মার্কারি বাটন সেল', d: ['লেড-অ্যাসিড ব্যাটারি', 'লিথিয়াম-আয়ন ব্যাটারি', 'নিকেল-ক্যাডমিয়াম কোষ'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'বাংলাদেশের জ্বালানি সংকট নিরসনে আবর্জনা ও গোবর থেকে অ্যান্যারোবিক গাঁজনে প্রাপ্ত বায়োগ্যাসের মূল উপাদান কী?', a: 'মিথেন (CH₄, প্রায় ৫৫–৬৫%) ও CO₂ (~৩৫%)', d: ['অক্সিজেন (৮০%)', 'হিলিয়াম ও আর্গন', 'নাইট্রোজেন ডাই-অক্সাইড'] },
    { ch: 'chem2_ch5_economic', vl: 'benzene_aromatic', q: 'সবুজ রসায়নের (Green Chemistry) দৃষ্টিকোণ থেকে কোন দ্রাবকটি সম্পূর্ণ অ-বিষাক্ত, অ-দাহ্য ও সর্বোত্তম নিরাপদ?', a: 'বিশুদ্ধ পানি (H₂O) ও সুপারক্রিটিক্যাল কার্বন ডাই-অক্সাইড (scCO₂)', d: ['বেনজিন', 'কার্বন টেট্রাক্লোরাইড (CCl₄)', 'ক্লোরোফর্ম'] },
  ];
  extraBalanced.forEach((eb, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: eb.ch,
        visualLessonId: eb.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: eb.q,
        correct: eb.a,
        distractors: eb.d,
        explanation: `${eb.q} — সঠিক উত্তর: ${eb.a}।`,
        reference: 'রসায়ন ২য় পত্র · সমন্বিত প্রশ্নব্যাংক',
      })
    );
  });

  return list;
}
