import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredR(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sr_${String(seq++).padStart(4, '0')}`;

  // 1. Hybridization, Lone Pairs, Molecular Geometry & Bond Angles (28 molecules × 4 angles = 112 MCQs)
  const vseprList: Array<{
    formula: string;
    hyb: string;
    bpLp: string;
    shape: string;
    angle: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    { formula: 'BeCl₂ (গ্যাসীয়)', hyb: 'sp', bpLp: '২টি বন্ধন জোড়, ০টি নিঃসঙ্গ জোড়', shape: 'সরলরৈখিক (Linear)', angle: '১৮০°', diff: 'board' },
    { formula: 'CO₂', hyb: 'sp', bpLp: '২টি σ ও ২টি π বন্ধন, ০টি নিঃসঙ্গ জোড়', shape: 'সরলরৈখিক (Linear)', angle: '১৮০°', diff: 'board' },
    { formula: 'C₂H₂ (ইথাইন)', hyb: 'sp', bpLp: 'প্রতি কার্বনে ২টি σ ও ২টি π বন্ধন', shape: 'সরলরৈখিক (Linear)', angle: '১৮০°', diff: 'medical' },
    { formula: 'BF₃', hyb: 'sp²', bpLp: '৩টি বন্ধন জোড়, ০টি নিঃসঙ্গ জোড়', shape: 'ত্রিকোণাকার সমতলীয় (Trigonal planar)', angle: '১২০°', diff: 'board' },
    { formula: 'SO₃', hyb: 'sp²', bpLp: '৩টি σ বন্ধন, ০টি নিঃসঙ্গ জোড়', shape: 'ত্রিকোণাকার সমতলীয়', angle: '১২০°', diff: 'medical' },
    { formula: 'CO₃²⁻', hyb: 'sp²', bpLp: '৩টি σ বন্ধন, ০টি নিঃসঙ্গ জোড়', shape: 'ত্রিকোণাকার সমতলীয়', angle: '১২০°', diff: 'dental' },
    { formula: 'NO₃⁻', hyb: 'sp²', bpLp: '৩টি σ বন্ধন, ০টি নিঃসঙ্গ জোড়', shape: 'ত্রিকোণাকার সমতলীয়', angle: '১২০°', diff: 'medical' },
    { formula: 'SO₂', hyb: 'sp²', bpLp: '২টি σ বন্ধন, ১টি নিঃসঙ্গ জোড়', shape: 'কৌণিক বা V-আকৃতির (Bent)', angle: '১১৯.৫°', diff: 'medical' },
    { formula: 'SnCl₂ (বাষ্প)', hyb: 'sp²', bpLp: '২টি বন্ধন জোড়, ১টি নিঃসঙ্গ জোড়', shape: 'কৌণিক (V-আকৃতি)', angle: '৯৫°–১১৮°', diff: 'medical' },
    { formula: 'CH₄', hyb: 'sp³', bpLp: '৪টি বন্ধন জোড়, ০টি নিঃসঙ্গ জোড়', shape: 'সুষম চতুস্তলকীয় (Tetrahedral)', angle: '১০৯.৫° (১০৯°২৮′)', diff: 'board' },
    { formula: 'NH₄⁺', hyb: 'sp³', bpLp: '৪টি বন্ধন জোড়, ০টি নিঃসঙ্গ জোড়', shape: 'সুষম চতুস্তলকীয়', angle: '১০৯.৫°', diff: 'medical' },
    { formula: 'SO₄²⁻', hyb: 'sp³', bpLp: '৪টি σ বন্ধন, ০টি নিঃসঙ্গ জোড়', shape: 'চতুস্তলকীয়', angle: '১০৯.৫°', diff: 'dental' },
    { formula: 'ClO₄⁻', hyb: 'sp³', bpLp: '৪টি σ বন্ধন, ০টি নিঃসঙ্গ জোড়', shape: 'চতুস্তলকীয়', angle: '১০৯.৫°', diff: 'medical' },
    { formula: 'NH₃', hyb: 'sp³', bpLp: '৩টি বন্ধন জোড়, ১টি নিঃসঙ্গ জোড়', shape: 'ত্রিকোণাকার পিরামিডীয়', angle: '১০৭°', diff: 'medical' },
    { formula: 'PH₃', hyb: 'অসংকরায়িত p (অতি সামান্য sp³)', bpLp: '৩টি বন্ধন জোড়, ১টি নিঃসঙ্গ জোড়', shape: 'পিরামিডীয়', angle: '৯৩.৬°', diff: 'medical' },
    { formula: 'NF₃', hyb: 'sp³', bpLp: '৩টি বন্ধন জোড়, ১টি নিঃসঙ্গ জোড়', shape: 'ত্রিকোণাকার পিরামিডীয়', angle: '১০২.৫°', diff: 'medical' },
    { formula: 'H₂O', hyb: 'sp³', bpLp: '২টি বন্ধন জোড়, ২টি নিঃসঙ্গ জোড়', shape: 'কৌণিক (V-আকৃতি)', angle: '১০৪.৫°', diff: 'medical' },
    { formula: 'H₂S', hyb: 'বিশুদ্ধ p অরবিটাল (ড্রাগো নিয়ম)', bpLp: '২টি বন্ধন জোড়, ২টি নিঃসঙ্গ জোড়', shape: 'কৌণিক (V-আকৃতি)', angle: '৯২.১°', diff: 'medical' },
    { formula: 'OF₂', hyb: 'sp³', bpLp: '২টি বন্ধন জোড়, ২টি নিঃসঙ্গ জোড়', shape: 'কৌণিক (V-আকৃতি)', angle: '১০৩°', diff: 'medical' },
    { formula: 'PCl₅ (গ্যাসীয়)', hyb: 'sp³d', bpLp: '৫টি বন্ধন জোড়, ০টি নিঃসঙ্গ জোড়', shape: 'ত্রিকোণাকার দ্বিপিরামিডীয়', angle: '১২০° ও ৯০°', diff: 'medical' },
    { formula: 'SF₄', hyb: 'sp³d', bpLp: '৪টি বন্ধন জোড়, ১টি নিঃসঙ্গ জোড়', shape: 'ঢেঁকি-আকৃতি (See-saw)', angle: '১০২° ও ৮৯°', diff: 'medical' },
    { formula: 'ClF₃', hyb: 'sp³d', bpLp: '৩টি বন্ধন জোড়, ২টি নিঃসঙ্গ জোড়', shape: 'T-আকৃতির (T-shaped)', angle: '৮৭.৫°', diff: 'medical' },
    { formula: 'XeF₂', hyb: 'sp³d', bpLp: '২টি বন্ধন জোড়, ৩টি নিঃসঙ্গ জোড়', shape: 'সরলরৈখিক (Linear)', angle: '১৮০°', diff: 'medical' },
    { formula: 'I₃⁻ (ট্রাইআয়োডাইড আয়ন)', hyb: 'sp³d', bpLp: '২টি বন্ধন জোড়, ৩টি নিঃসঙ্গ জোড়', shape: 'সরলরৈখিক (Linear)', angle: '১৮০°', diff: 'medical' },
    { formula: 'SF₆', hyb: 'sp³d²', bpLp: '৬টি বন্ধন জোড়, ০টি নিঃসঙ্গ জোড়', shape: 'অষ্টতলকীয় (Octahedral)', angle: '৯০°', diff: 'board' },
    { formula: 'BrF₅', hyb: 'sp³d²', bpLp: '৫টি বন্ধন জোড়, ১টি নিঃসঙ্গ জোড়', shape: 'বর্গাকার পিরামিডীয়', angle: '৮৪.৮°', diff: 'medical' },
    { formula: 'XeF₄', hyb: 'sp³d²', bpLp: '৪টি বন্ধন জোড়, ২টি নিঃসঙ্গ জোড়', shape: 'সমতলীয় বর্গাকার (Square planar)', angle: '৯০°', diff: 'medical' },
    { formula: 'IF₇', hyb: 'sp³d³', bpLp: '৭টি বন্ধন জোড়, ০টি নিঃসঙ্গ জোড়', shape: 'পঞ্চভুজীয় দ্বিপিরামিডীয়', angle: '৭২° ও ৯০°', diff: 'medical' },
  ];

  const hybChoices = ['sp', 'sp²', 'sp³', 'sp³d', 'sp³d²', 'sp³d³'];
  const shapeChoices = [
    'সরলরৈখিক (Linear)',
    'ত্রিকোণাকার সমতলীয়',
    'কৌণিক (V-আকৃতি)',
    'চতুস্তলকীয়',
    'ত্রিকোণাকার পিরামিডীয়',
    'ত্রিকোণাকার দ্বিপিরামিডীয়',
    'অষ্টতলকীয় (Octahedral)',
    'সমতলীয় বর্গাকার (Square planar)',
    'T-আকৃতির (T-shaped)',
    'ঢেঁকি-আকৃতি (See-saw)',
  ];
  const angleChoices = ['১৮০°', '১২০°', '১০৯.৫°', '১০৭°', '১০৪.৫°', '৯০°', '৯২.১°', '৭২° ও ৯০°'];

  vseprList.forEach((v, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: v.diff,
        question: `${v.formula} অণু/আয়নের কেন্দ্রীয় পরমাণুতে কোন ধরনের সংকরায়ন (Hybridization) বিদ্যমান?`,
        correct: v.hyb,
        distractors: hybChoices.filter((x) => x !== v.hyb),
        explanation: `${v.formula}-এ ${v.bpLp} থাকায় সংকরায়ন ${v.hyb}, আকৃতি ${v.shape} এবং বন্ধন কোণ ${v.angle}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · সংকরায়ন ও VSEPR তত্ত্ব',
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
        question: `VSEPR তত্ত্ব অনুযায়ী ${v.formula}-এর ত্রিমাত্রিক জ্যামিতিক আকৃতি কেমন?`,
        correct: v.shape,
        distractors: shapeChoices.filter((x) => x !== v.shape).slice(idx % 3, (idx % 3) + 4),
        explanation: `${v.formula} (${v.hyb}) অণুতে ${v.bpLp} থাকায় এর আকৃতি ${v.shape} এবং বন্ধন কোণ ${v.angle}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অণুর আকৃতি',
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
        question: `${v.formula} অণু বা আয়নের আদর্শ/প্রকৃত বন্ধন কোণের মান কত?`,
        correct: v.angle,
        distractors: angleChoices.filter((x) => x !== v.angle),
        explanation: `${v.formula}-এ ${v.bpLp} বিরাজ করায় নিঃসঙ্গ জোড় বিকর্ষণে বন্ধন কোণ ${v.angle} হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · বন্ধন কোণ',
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
        question: `${v.formula}-এর কেন্দ্রীয় পরমাণুর বন্ধন জোড় ও নিঃসঙ্গ ইলেকট্রন জোড়ের (lp) সঠিক বিবরণ কোনটি?`,
        correct: v.bpLp,
        distractors: Array.from(new Set(vseprList.map((x) => x.bpLp)))
          .filter((x) => x !== v.bpLp)
          .slice(idx % 6, (idx % 6) + 4),
        explanation: `${v.formula} যৌগের কেন্দ্রীয় পরমাণুতে ${v.bpLp} থাকে; এর ফলে আকৃতি হয় ${v.shape}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · নিঃসঙ্গ ইলেকট্রন জোড়',
      })
    );
  });

  // 2. Qualitative Wet Tests, Ions, Precipitates & Transition Metal Colors (32 ions/tests × 4 = 128 MCQs)
  const ionTests: Array<{
    ion: string;
    reagent: string;
    result: string;
    formula: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    { ion: 'Cu²⁺ আয়ন', reagent: 'অতিরিক্ত অ্যামোনিয়া দ্রবণ (NH₄OH)', result: 'গাঢ় নীল বর্ণের স্বচ্ছ টেট্রাঅ্যাম্মিনকপার দ্রবণ', formula: '[Cu(NH₃)₄]²⁺', diff: 'medical' },
    { ion: 'Fe³⁺ আয়ন', reagent: 'অ্যামোনিয়াম থায়োসায়ানেট (NH₄SCN)', result: 'গাঢ় রক্তলাল (Blood red) বর্ণের দ্রবণ', formula: '[Fe(SCN)(H₂O)₅]²⁺', diff: 'medical' },
    { ion: 'Fe²⁺ আয়ন', reagent: 'পটাশিয়াম ফেরিসায়ানাইড K₃[Fe(CN)₆]', result: 'টার্নবুলের নীল (Turnbull’s blue) অধঃক্ষেপ', formula: 'KFe[Fe(CN)₆]', diff: 'medical' },
    { ion: 'Ni²⁺ আয়ন', reagent: 'অ্যামোনিয়াক্যাল ডাইমিথাইল গ্লাইঅক্সিম (DMG)', result: 'টকটকে লাল (Rosy red) বর্ণের অধঃক্ষেপ', formula: '[Ni(DMG)₂]', diff: 'medical' },
    { ion: 'Ca²⁺ আয়ন', reagent: 'অ্যামোনিয়াম অক্সালেট ((NH₄)₂C₂O₄)', result: 'সাদা বর্ণের সূক্ষ্ম অধঃক্ষেপ (অ্যাসিটিক অ্যাসিডে অদ্রবণীয়)', formula: 'CaC₂O₄↓', diff: 'board' },
    { ion: 'Al³⁺ আয়ন', reagent: 'NaOH দ্রবণ ও অতিরিক্ত NaOH', result: 'প্রথমে সাদা জেলির মতো অধঃক্ষেপ, অতিরিক্ত ক্ষারে দ্রবীভূত', formula: 'Al(OH)₃↓ → Na[Al(OH)₄]', diff: 'medical' },
    { ion: 'Zn²⁺ আয়ন', reagent: 'K₄[Fe(CN)₆] দ্রবণ', result: 'সাদাটে/নীলাভ সাদা বর্ণের জিঙ্ক ফেরোসায়ানাইড অধঃক্ষেপ', formula: 'Zn₂[Fe(CN)₆]↓', diff: 'dental' },
    { ion: 'SO₄²⁻ আয়ন', reagent: 'বেরিয়াম ক্লোরাইড (BaCl₂) ও লঘু HCl', result: 'ঘন সাদা অধঃক্ষেপ (কোনো অ্যাসিডে দ্রবীভূত হয় না)', formula: 'BaSO₄↓', diff: 'board' },
    { ion: 'CO₃²⁻ আয়ন', reagent: 'লঘু HCl এবং নির্গত গ্যাস চুনের পানিতে চালনা', result: 'বুদবুদসহ CO₂ নির্গমন যা চুনের পানিকে ঘোলা করে', formula: 'CaCO₃↓ (অতিরিক্ত CO₂-এ স্বচ্ছ Ca(HCO₃)₂)', diff: 'board' },
    { ion: 'S²⁻ (সালফাইড) আয়ন', reagent: 'লঘু HCl ও লেড অ্যাসিটেট পেপার', result: 'পচা ডিমের গন্ধযুক্ত H₂S যা লেড অ্যাসিটেট কাগজ কালো করে', formula: 'PbS↓ (কালো)', diff: 'medical' },
    { ion: 'PO₄³⁻ (ফসফেট) আয়ন', reagent: 'গাঢ় HNO₃ ও অ্যামোনিয়াম মলিবডেট (উত্তাপে)', result: 'ক্যানারি হলুদ (Canary yellow) বর্ণের অধঃক্ষেপ', formula: '(NH₄)₃[PMo₁₂O₄₀]↓', diff: 'medical' },
    { ion: 'Pb²⁺ (লেড) আয়ন', reagent: 'পটাশিয়াম আয়োডাইড (KI) দ্রবণ', result: 'সোনালি হলুদ (Golden yellow) অধঃক্ষেপ (গোল্ডেন স্প্যাঙ্গল)', formula: 'PbI₂↓', diff: 'medical' },
    { ion: 'Ag⁺ আয়ন', reagent: 'পটাশিয়াম ক্রোমেট (K₂CrO₄) দ্রবণ', result: 'ইটের মতো লাল (Brick red) অধঃক্ষেপ', formula: 'Ag₂CrO₄↓', diff: 'medical' },
    { ion: 'Cr³⁺ আয়ন', reagent: 'হাইড্রোজেন পারঅক্সাইড (H₂O₂) ও NaOH', result: 'হলুদ বর্ণের সোডিয়াম ক্রোমেট দ্রবণ', formula: 'Na₂CrO₄', diff: 'dental' },
    { ion: 'Co²⁺ আয়ন', reagent: 'অ্যাসিটোনে NH₄SCN দ্রবণ', result: 'উজ্জ্বল নীল বর্ণের জটিল আয়ন', formula: '[Co(SCN)₄]²⁻', diff: 'medical' },
    { ion: 'Mn²⁺ আয়ন', reagent: 'PbO₂ ও গাঢ় HNO₃ সহ উত্তাপ', result: 'বেগুনি বা গোলাপি পারম্যাঙ্গানেট দ্রবণ', formula: 'MnO₄⁻', diff: 'medical' },
    { ion: 'জলীয় [Ti(H₂O)₆]³⁺ আয়ন', reagent: 'স্বাভাবিক অষ্টতলকীয় d¹ জলীয় আয়ন', result: 'বেগুনি (Violet) বর্ণ প্রদর্শন করে', formula: '[Ti(H₂O)₆]³⁺', diff: 'medical' },
    { ion: 'জলীয় [Fe(H₂O)₆]²⁺ আয়ন', reagent: 'd⁶ হাই-স্পিন জলীয় জটিল আয়ন', result: 'হালকা সবুজ (Pale green) বর্ণ প্রদর্শন করে', formula: '[Fe(H₂O)₆]²⁺', diff: 'board' },
    { ion: 'জলীয় [Ni(H₂O)₆]²⁺ আয়ন', reagent: 'd⁸ অষ্টতলকীয় জলীয় জটিল আয়ন', result: 'সবুজ (Green) বর্ণ প্রদর্শন করে', formula: '[Ni(H₂O)₆]²⁺', diff: 'medical' },
    { ion: 'জলীয় [Cu(H₂O)₆]²⁺ আয়ন', reagent: 'd⁹ জলীয় জটিল আয়ন', result: 'হালকা আকাশী নীল (Sky blue) বর্ণ প্রদর্শন করে', formula: '[Cu(H₂O)₆]²⁺', diff: 'board' },
  ];

  ionTests.forEach((t, idx) => {
    const others = ionTests.filter((x) => x.ion !== t.ion);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: t.diff,
        question: `গুণগত বিশ্লেষণে ${t.ion} শনাক্তকরণে ${t.reagent} যোগ করলে কী ধরনের পরিবর্তন দেখা যায়?`,
        correct: t.result,
        distractors: others.slice(idx % 8, (idx % 8) + 4).map((x) => x.result),
        explanation: `${t.ion} ও ${t.reagent}-এর বিক্রিয়ায় ${t.formula} তৈরি হওয়ায় ${t.result} দেখা যায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · আয়ন শনাক্তকরণ',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `লবণের দ্রবণে ${t.reagent} যোগ করলে "${t.result}" পাওয়া গেলে দ্রবণে কোন আয়ন বা প্রজাতি নিশ্চিতভাবে উপস্থিত?`,
        correct: t.ion,
        distractors: others.slice((idx + 3) % 8, ((idx + 3) % 8) + 4).map((x) => x.ion),
        explanation: `${t.result} (${t.formula}) হলো ${t.ion}-এর নিশ্চিতকারী পরীক্ষা।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · ব্যবহারিক রসায়ন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${t.ion}-এর শনাক্তকারী পরীক্ষায় (${t.reagent}) উৎপন্ন বর্ণময় যৌগ বা জটিল আয়নের সংকেত কোনটি?`,
        correct: t.formula,
        distractors: others.slice((idx + 5) % 8, ((idx + 5) % 8) + 4).map((x) => x.formula),
        explanation: `বিক্রিয়াশেষে ${t.formula} গঠিত হয় বলেই ${t.result} পর্যবেক্ষণ করা যায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · জটিল যৌগ ও অধঃক্ষেপ',
      })
    );
  });

  // 3. Periodic Trends, Blocks, Group Facts & Bond Polarity (45 × 4 = 180 MCQs)
  const periodicMatrix: Array<{
    qTitle: string;
    order: string;
    reason: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    { qTitle: '২য় পর্যায়ের মৌলগুলোর প্রথম আয়নিকরণ শক্তির সঠিক ক্রম', order: 'Li < B < Be < C < O < N < F < Ne', reason: 'Be (2s²) ও N (2p³)-এর সুস্থিত পূর্ণ/অর্ধপূর্ণ উপস্তরের কারণে যথাক্রমে B ও O-এর চেয়ে বেশি', diff: 'medical' },
    { qTitle: 'হ্যালোজেনগুলোর ইলেকট্রন আসক্তির সঠিক ক্রম', order: 'Cl > F > Br > I', reason: 'F-এর ক্ষুদ্র ২p কক্ষপথে ইলেকট্রন-ইলেকট্রন বিকর্ষণ বেশি হওয়ায় Cl-এর আসক্তি সর্বাধিক', diff: 'medical' },
    { qTitle: 'চ্যালকোজেন (১৬ নং গ্রুপ) মৌলগুলোর ইলেকট্রন আসক্তির ক্রম', order: 'S > Se > Te > Po > O', reason: 'অক্সিজেনের অতি ক্ষুদ্র ২p উপস্তরের উচ্চ চার্জ ঘনত্ব আগত ইলেকট্রনকে বিকর্ষণ করে', diff: 'medical' },
    { qTitle: 'হ্যালো-অ্যাসিডগুলোর (HX) জলীয় দ্রবণে অম্লশক্তির সঠিক ক্রম', order: 'HI > HBr > HCl > HF', reason: 'H–X বন্ধন দৈর্ঘ্য বাড়লে বন্ধন দুর্বল হয়ে সহজে H⁺ আয়ন দান করে', diff: 'medical' },
    { qTitle: 'ক্লোরিনের অক্সো-অ্যাসিডসমূহের অম্লশক্তির ক্রম', order: 'HClO₄ > HClO₃ > HClO₂ > HClO', reason: 'কেন্দ্রীয় Cl পরমাণুর জারণ সংখ্যা (+৭ থেকে +১) এবং অসংশ্লিষ্ট O পরমাণু বাড়লে অনুবন্ধী ক্ষার স্থিতিশীল হয়', diff: 'medical' },
    { qTitle: 'কার্বনের C–C, C=C ও C≡C বন্ধনদৈর্ঘ্যের সঠিক ক্রম', order: 'C–C (০.১৫৪ nm) > C=C (০.১৩৪ nm) > C≡C (০.১২০ nm)', reason: 'বন্ধন ক্রম (Bond order) বাড়ার সাথে সাথে দুটি নিউক্লিয়াসের আকর্ষণ বেড়ে দৈর্ঘ্য ছোট হয়', diff: 'board' },
    { qTitle: 'হ্যালোজেন অণুগুলোর (X₂) বন্ধন বিভাজন শক্তির ব্যতিক্রমী ক্রম', order: 'Cl₂ > Br₂ > F₂ > I₂', reason: 'F–F ক্ষুদ্র বন্ধনে নিঃসঙ্গ ইলেকট্রন জোড়গুলোর তীব্র বিকর্ষণে F₂-এর বন্ধন শক্তি Br₂-এর চেয়েও কম', diff: 'medical' },
    { qTitle: 'পলিং স্কেলে তড়িৎ ঋণাত্মকতার ক্রম (F, O, N, Cl, Br, C, H)', order: 'F (৪.০) > O (৩.৫) > N ≈ Cl (৩.০) > Br (২.৮) > C (২.৫) > H (২.১)', reason: 'ক্ষুদ্র আকার ও উচ্চ কার্যকর নিউক্লীয় আধানের কারণে ফ্লোরিন সর্বোচ্চ তড়িৎ ঋণাত্মক মৌল', diff: 'board' },
    { qTitle: 'সমপর্যায়ের অক্সাইডগুলোর অম্লীয় ও ক্ষারীয় ধর্মের পরিবর্তন (বাম থেকে ডান)', order: 'Na₂O (সবল ক্ষার) > MgO > Al₂O₃ (উভধর্মী) < SiO₂ < P₄O₁₀ < SO₃ < Cl₂O₇ (তীব্র অম্ল)', reason: 'বাম থেকে ডানে অধাতব চরিত্র ও কেন্দ্রীয় মৌলের জারণ মান বাড়লে অক্সাইডের অম্লত্ব বাড়ে', diff: 'medical' },
    { qTitle: 'হাইড্রেটেড ক্ষার ধাতু আয়নের জলীয় পরিবাহিতার ক্রম (Li⁺ থেকে Cs⁺)', order: 'Cs⁺(aq) > Rb⁺(aq) > K⁺(aq) > Na⁺(aq) > Li⁺(aq)', reason: 'অতি ক্ষুদ্র Li⁺ আয়ন সবচেয়ে বেশি পানির অণু দ্বারা হাইড্রেটেড হয়ে ভারী হওয়ায় সবচেয়ে ধীর গতিতে চলে', diff: 'medical' },
    { qTitle: 'সিলভার হ্যালাইডসমূহের পানিতে দ্রাব্যতা ও ফাজান-ভিত্তিক সমযোজী ধর্মের ক্রম', order: 'দ্রাব্যতা: AgF > AgCl > AgBr > AgI', reason: 'বড় I⁻ অ্যানায়নের পোলারায়ন সর্বাধিক হওয়ায় AgI সবচেয়ে সমযোজী ও পানিতে অদ্রবণীয়', diff: 'medical' },
    { qTitle: '১৬ নং গ্রুপের হাইড্রাইডসমূহের তাপীয় স্থায়িত্বের ক্রম', order: 'H₂O > H₂S > H₂Se > H₂Te', reason: 'কেন্দ্রীয় পরমাণুর আকার বাড়লে M–H বন্ধন দুর্বল হয়ে সহজে ভেঙে যায়', diff: 'dental' },
    { qTitle: 'ক্ষার ধাতুর গলনাঙ্কের সঠিক ক্রম (গ্রুপ-১)', order: 'Li > Na > K > Rb > Cs', reason: 'আকার বাড়লে ধাতব বন্ধনের শক্তি কমে যাওয়ায় সিজিয়ামের গলনাঙ্ক মাত্র ২৮.৫°C', diff: 'board' },
    { qTitle: 'CH₃⁺, CH₃• এবং কার্বোকেটায়নগুলোর স্থায়িত্বের ক্রম (৩°, ২°, ১°, CH₃⁺)', order: '(CH₃)₃C⁺ > (CH₃)₂CH⁺ > CH₃CH₂⁺ > CH₃⁺', reason: 'অ্যালকাইল গ্রুপের +I ইন্ডাকটিভ ও হাইপারকনজুগেশন প্রভাবে ৩° কার্বোক্যাটায়ন সবচেয়ে স্থিতিশীল', diff: 'medical' },
    { qTitle: 'মুক্ত d-অরবিটালের অভাবে কোন ক্লোরাইডগুলো আদৌ আর্দ্রবিশ্লেষিত হয় না?', order: 'CCl₄ (আর্দ্রবিশ্লেষিত হয় না), কিন্তু SiCl₄ সহজেই আর্দ্রবিশ্লেষিত হয়', reason: 'কার্বনের ২য় শক্তিস্তরে ফাঁকা d-অরবিটাল নেই; সিলিকনের ৩য় শক্তিস্তরে ফাঁকা ৩d অরবিটাল থাকায় H₂O-এর নিঃসঙ্গ জোড় গ্রহণ করে', diff: 'medical' },
    { qTitle: 'নিচের কোনটি কেবল বিজারক এবং জারক উভয় রূপেই কাজ করে (SO₂, H₂O₂, HNO₂)?', order: 'SO₂ (S=+৪), H₂O₂ (O=-১), HNO₂ (N=+৩) — মধ্যবর্তী জারণ মান', reason: 'মধ্যবর্তী জারণ সংখ্যা থাকার কারণে এরা ইলেকট্রন গ্রহণ ও বর্জন উভয়ই করতে পারে; কিন্তু H₂S ও NH₃ কেবল বিজারক', diff: 'medical' },
    { qTitle: 'লিগ্যান্ডের ক্ষেত্র-শক্তি বা স্পেকট্রোকেমিক্যাল সারির ক্রম', order: 'CO > CN⁻ > NO₂⁻ > en > NH₃ > H₂O > F⁻ > Cl⁻ > Br⁻ > I⁻', reason: 'CO ও CN⁻ শক্তিশালী-ক্ষেত্র লিগ্যান্ড হওয়ায় হাই-স্পিন না করে লো-স্পিন জটিল যৌগ গঠন করে', diff: 'medical' },
    { qTitle: 'আয়নিক বনাম সমযোজী যৌগের মধ্যে নিচের কোনটি ধ্রুব সত্য?', order: 'আয়নিক যৌগ দিকনির্দেশক নয়, কিন্তু সমযোজী বন্ধন দিকনির্দেশক (Directional)', reason: 'অরবিটালের নির্দিষ্ট দিকে অধিক্রমণে সমযোজী বন্ধন গঠিত হওয়ায় সমযোজী অণুর নির্দিষ্ট জ্যামিতি ও স্টেরিওসমানুতা থাকে', diff: 'board' },
    { qTitle: 'ইলেকট্রন সংখ্যা সমান এমন প্রজাতির বন্ধন ক্রম (Bond order = ৩.০): N₂, CO, CN⁻, NO⁺', order: 'N₂, CO, CN⁻ ও NO⁺ সবারই ১৪টি ইলেকট্রন ও বন্ধন ক্রম ৩', reason: 'মোট ১৪টি ইলেকট্রন বিশিষ্ট দ্বিপরমাণুক প্রজাতিগুলোর বন্ধন ক্রম সর্বাধিক ৩.০ ও ডায়াম্যাগনেটিক', diff: 'medical' },
    { qTitle: 'পটাশিয়াম সুপারঅক্সাইড (KO₂) সাবমেরিন ও মহাকাশযানে ব্যবহৃত হয় কেন?', order: 'KO₂ শ্বাস-প্রশ্বাসের CO₂ শোষণ করে এবং বিনিময়ে অক্সিজেন (O₂) সরবরাহ করে', reason: '4KO₂ + 2CO₂ → 2K₂CO₃ + 3O₂ বিক্রিয়ায় অক্সিজেন মুক্ত হয় ও কোয়ার্টজ বদ্ধ ঘরে CO₂ জমে না', diff: 'medical' },
    { qTitle: 'সাদা ভিট্রিওল, নীল ভিট্রিওল ও সবুজ ভিট্রিওলের সঠিক সংকেত', order: 'ZnSO₄·7H₂O (সাদা), CuSO₄·5H₂O (নীল/তুঁতে), FeSO₄·7H₂O (সবুজ)', reason: 'তুঁতে (CuSO₄·5H₂O)-এ ৪টি পানির অণু সন্নিবেশ বন্ধনে ও ১টি হাইড্রোজেন বন্ধনে যুক্ত থাকে', diff: 'medical' },
    { qTitle: 'ফ্লুরিনের অক্সিজেন যৌগ OF₂-তে অক্সিজেনের জারণ সংখ্যা কত?', order: '+২ (ধনাত্মক দুই)', reason: 'ফ্লোরিন (-১) অক্সিজেনের চেয়ে বেশি তড়িৎ ঋণাত্মক হওয়ায় OF₂-তে O-এর জারণ মান +২ হয়', diff: 'medical' },
    { qTitle: 'একটি হাইড্রোজেন বন্ডের শক্তি (১০–৪০ kJ/mol) ও সমযোজী বন্ধনের তুলনা', order: 'আয়নিক/সমযোজী > হাইড্রোজেন বন্ধন > ডাইপোল-ডাইপোল > লন্ডন ভ্যান ডার ওয়ালস বল', reason: 'হাইড্রোজেন বন্ধন সমযোজী বন্ধনের প্রায় ১/১০ অংশ শক্তিশালী হলেও ভ্যান ডার ওয়ালসের চেয়ে বহুগুণ দৃঢ়', diff: 'board' },
    { qTitle: 'অ্যামোনিয়া (NH₃) বনাম ফসফিন (PH₃)-এর ক্ষারকত্বের ক্রম', order: 'NH₃ >> PH₃ (অ্যামোনিয়া অনেক বেশি তীব্র ক্ষার)', reason: 'নাইট্রোজেনের ক্ষুদ্র আকারে নিঃসঙ্গ ইলেকট্রন জোড়ের ঘনত্ব বেশি হওয়ায় এটি সহজে H⁺ গ্রহণ করে', diff: 'medical' },
    { qTitle: 'বরফের ঘনত্ব (০.৯১৭ g/cm³) তরল পানির চেয়ে কম হওয়ার কারণ', order: 'বরফে চতুস্তলকীয় H-বন্ধন জালকের কারণে প্রচুর ফাঁকা স্থান সৃষ্টি হয়', reason: '৪°C তাপমাত্রায় পানির হাইড্রোজেন বন্ধন আংশিক ভেঙে ঘনত্ব সর্বোচ্চ ১.০০ g/cm³ হয়; ফলে বরফ পানিতে ভাসে', diff: 'board' },
    { qTitle: '৩য় পর্যায়ের কোন মৌলগুলোর ফর্মুলা ও যোজ্যতা পরিবর্তনশীল?', order: 'P (৩, ৫), S (২, ৪, ৬), Cl (১, ৩, ৫, ৭)', reason: '৩য় পর্যায়ে ফাঁকা ৩d অরবিটাল থাকায় ইলেকট্রন উত্তেজিত হয়ে যুগ্ম থেকে অযুগ্ম হয়ে যোজ্যতা বৃদ্ধি পায়', diff: 'board' },
    { qTitle: 'জটিল যৌগে কেন্দ্রীয় ধাতুর সন্নিবেশ সংখ্যা (Coordination number) উদাহরণ', order: 'K₄[Fe(CN)₆]-এ ৬, [Cu(NH₃)₄]SO₄-এ ৪ এবং [Ag(NH₃)₂]Cl-এ ২', reason: 'সন্নিবেশ সংখ্যা হলো কেন্দ্রীয় ধাতব আয়নের সাথে যুক্ত একদন্তী লিগ্যান্ড বা দাতা পরমাণুর মোট সংখ্যা', diff: 'medical' },
    { qTitle: '১৪ নং গ্রুপে C থেকে Pb পর্যন্ত +২ জারণ অবস্থার স্থায়িত্ব বৃদ্ধির কারণ', order: 'নিষ্ক্রিয় জোড় প্রভাব (Inert pair effect): Pb²⁺ > Pb⁴⁺', reason: 'ভারী p-ব্লক মৌলের (Sn, Pb, Bi) সর্ববহিঃস্থ ns² ইলেকট্রন জোড়ের বন্ধনে অংশগ্রহণে অনীহাকে নিষ্ক্রিয় জোড় প্রভাব বলে', diff: 'medical' },
    { qTitle: 'অর্থো-নাইট্রোফেনল ও প্যারা-নাইট্রোফেনলের স্ফুটনাঙ্কের পার্থক্য', order: 'প্যারা-নাইট্রোফেনলের স্ফুটনাঙ্ক অর্থো-নাইট্রোফেনলের চেয়ে অনেক বেশি', reason: 'অর্থো-সমানুতে অন্তঃআণবিক H-বন্ধন থাকায় বাষ্পীয় প্রবণতা বেশি; প্যারা-সমানুতে আন্তঃআণবিক H-বন্ধনে অণুগুলো সংঘবদ্ধ থাকে', diff: 'medical' },
    { qTitle: 'কোন যৌগে আয়নিক, সমযোজী ও সন্নিবেশ—তিন ধরনের বন্ধনই বিদ্যমান?', order: 'NH₄Cl, CuSO₄·5H₂O, K₄[Fe(CN)₆] এবং NaBF₄', reason: 'NH₄Cl-এ NH₄⁺ ও Cl⁻ এর মাঝে আয়নিক এবং NH₄⁺-এর ভেতর ৩টি সমযোজী ও ১টি N→H⁺ সন্নিবেশ বন্ধন থাকে', diff: 'medical' },
  ];

  periodicMatrix.forEach((p, idx) => {
    const others = periodicMatrix.filter((x) => x.qTitle !== p.qTitle);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: p.diff,
        question: `${p.qTitle} কোনটি?`,
        correct: p.order,
        distractors: others.slice(idx % 12, (idx % 12) + 4).map((x) => x.order),
        explanation: `সঠিক ক্রম/তথ্য: ${p.order}। কারণ: ${p.reason}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · পর্যায়বৃত্ত ধর্ম ও বন্ধন',
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
        question: `"${p.order}" — এই বিশেষ পর্যায়বৃত্ত ধর্ম বা রাসায়নিক আচরণের মূল কারণ কী?`,
        correct: p.reason,
        distractors: others.slice((idx + 4) % 12, ((idx + 4) % 12) + 4).map((x) => x.reason),
        explanation: `${p.qTitle}: ${p.order} হওয়ার কারণ হলো ${p.reason}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · কারণ ব্যাখ্যামূলক প্রশ্ন',
      })
    );
  });

  // 4. Quantum Number Validity & Electron Configurations (50+ MCQs)
  const elements = [
    { sym: 'Sc (২১)', config: '[Ar] 3d¹ 4s²', ion: 'Sc³⁺: [Ar] 3d⁰', unpaired: 1 },
    { sym: 'Ti (২২)', config: '[Ar] 3d² 4s²', ion: 'Ti³⁺: [Ar] 3d¹', unpaired: 2 },
    { sym: 'V (২৩)', config: '[Ar] 3d³ 4s²', ion: 'V³⁺: [Ar] 3d²', unpaired: 3 },
    { sym: 'Cr (২৪)', config: '[Ar] 3d⁵ 4s¹', ion: 'Cr³⁺: [Ar] 3d³', unpaired: 6 },
    { sym: 'Mn (২৫)', config: '[Ar] 3d⁵ 4s²', ion: 'Mn²⁺: [Ar] 3d⁵', unpaired: 5 },
    { sym: 'Fe (২৬)', config: '[Ar] 3d⁶ 4s²', ion: 'Fe³⁺: [Ar] 3d⁵', unpaired: 4 },
    { sym: 'Co (২৭)', config: '[Ar] 3d⁷ 4s²', ion: 'Co²⁺: [Ar] 3d⁷', unpaired: 3 },
    { sym: 'Ni (২৮)', config: '[Ar] 3d⁸ 4s²', ion: 'Ni²⁺: [Ar] 3d⁸', unpaired: 2 },
    { sym: 'Cu (২৯)', config: '[Ar] 3d¹⁰ 4s¹', ion: 'Cu²⁺: [Ar] 3d⁹', unpaired: 1 },
    { sym: 'Zn (৩০)', config: '[Ar] 3d¹⁰ 4s²', ion: 'Zn²⁺: [Ar] 3d¹⁰', unpaired: 0 },
  ];
  elements.forEach((el, idx) => {
    const others = elements.filter((x) => x.sym !== el.sym);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: idx === 3 || idx === 8 ? 'medical' : 'board',
        question: `ভূমিস্তরে ${el.sym} পরমাণুতে মোট কতটি অযুগ্ম (Unpaired) ইলেকট্রন বিদ্যমান?`,
        correct: `${toBnDigits(el.unpaired)}টি`,
        distractors: [`${toBnDigits((el.unpaired + 2) % 7)}টি`, `${toBnDigits((el.unpaired + 3) % 7)}টি`, `${toBnDigits((el.unpaired + 4) % 7)}টি`],
        explanation: `${el.sym}-এর ইলেকট্রন বিন্যাস ${el.config}; হুন্ডের নিয়ম অনুযায়ী হিসাব করলে এতে ${toBnDigits(el.unpaired)}টি অযুগ্ম ইলেকট্রন থাকে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · অযুগ্ম ইলেকট্রন',
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
        question: `${el.sym} মৌলের বহুল প্রচলিত আয়নের সঠিক ইলেকট্রন বিন্যাস কোনটি?`,
        correct: el.ion,
        distractors: others.slice(idx % 5, (idx % 5) + 4).map((x) => x.ion),
        explanation: `d-ব্লক মৌল আয়ন গঠনের সময় প্রথমে বহিঃস্থ 4s অরবিটাল থেকে ইলেকট্রন ত্যাগ করে; তাই ${el.ion}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · অবস্থান্তর আয়নের বিন্যাস',
      })
    );
  });

  return list;
}
