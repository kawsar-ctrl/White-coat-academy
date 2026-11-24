import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildBio2StructuredB(startSeq = 1): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = startSeq;
  const nextId = () => `bio2_sb_${String(seq++).padStart(4, '0')}`;

  // 1. Cardiac Output, Stroke Volume, Pulse Pressure & MAP Quantitative Problems (~44 MCQs)
  const cardiacCases: Array<[number, number]> = [
    [72, 70],
    [75, 70],
    [80, 65],
    [70, 75],
    [60, 80],
    [80, 75],
    [90, 60],
    [100, 55],
    [65, 80],
    [75, 80],
    [85, 70],
    [70, 70],
  ];
  cardiacCases.forEach(([hr, sv], i) => {
    const coMl = hr * sv;
    const coL = (coMl / 1000).toFixed(2).replace(/\.?0+$/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একজন ব্যক্তির হৃৎস্পন্দন (HR) প্রতি মিনিটে ${toBnDigits(hr)} বার এবং স্ট্রোক ভলিউম (SV) ${toBnDigits(sv)} mL হলে তাঁর কার্ডিয়াক আউটপুট (CO) কত?`,
        correct: `${toBnDigits(coMl)} mL/min (বা ${toBnDigits(coL)} লিটার/মিনিট)`,
        distractors: [
          `${toBnDigits(coMl + 800)} mL/min`,
          `${toBnDigits(Math.max(2000, coMl - 900))} mL/min`,
          `${toBnDigits(Math.round(coMl / 2))} mL/min`,
        ],
        explanation: `কার্ডিয়াক আউটপুট (CO) = HR × SV = ${toBnDigits(hr)} × ${toBnDigits(sv)} = ${toBnDigits(coMl)} mL/min (${toBnDigits(coL)} L/min)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · কার্ডিয়াক আউটপুট',
      })
    );
  });

  const bpCases: Array<[number, number]> = [
    [120, 80],
    [110, 70],
    [130, 85],
    [140, 90],
    [150, 90],
    [135, 75],
    [105, 65],
    [160, 100],
    [125, 80],
    [145, 85],
  ];
  bpCases.forEach(([sbp, dbp]) => {
    const pp = sbp - dbp;
    const map = Math.round(dbp + pp / 3);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `কোনো ব্যক্তির রক্তচাপ ${toBnDigits(sbp)}/${toBnDigits(dbp)} mmHg হলে তাঁর পালস প্রেশার (Pulse Pressure) কত mmHg?`,
        correct: `${toBnDigits(pp)} mmHg`,
        distractors: [
          `${toBnDigits(sbp + dbp)} mmHg`,
          `${toBnDigits(map)} mmHg`,
          `${toBnDigits(pp + 15)} mmHg`,
        ],
        explanation: `পালস প্রেশার = সিস্টোলিক রক্তচাপ - ডায়াস্টোলিক রক্তচাপ = ${toBnDigits(sbp)} - ${toBnDigits(dbp)} = ${toBnDigits(pp)} mmHg।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · রক্তচাপ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একজন মানুষের রক্তচাপ ${toBnDigits(sbp)}/${toBnDigits(dbp)} mmHg হলে গড় ধমনি চাপ (MAP = DBP + PP/3) প্রায় কত mmHg?`,
        correct: `${toBnDigits(map)} mmHg`,
        distractors: [
          `${toBnDigits(pp)} mmHg`,
          `${toBnDigits(Math.round((sbp + dbp) / 2) + 8)} mmHg`,
          `${toBnDigits(dbp - 10)} mmHg`,
        ],
        explanation: `গড় ধমনি চাপ (MAP) = DBP + ১/৩ (SBP - DBP) = ${toBnDigits(dbp)} + (${toBnDigits(pp)} / ৩) ≈ ${toBnDigits(map)} mmHg।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · রক্তচাপ হিসাব',
      })
    );
  });

  // 2. BMI Calculations & WHO Classifications (~24 MCQs)
  const bmiCases: Array<{ wt: number; ht: number; cat: string }> = [
    { wt: 50, ht: 1.7, cat: 'কম ওজন (Underweight)' },
    { wt: 45, ht: 1.65, cat: 'কম ওজন (Underweight)' },
    { wt: 64, ht: 1.75, cat: 'স্বাভাবিক ওজন (Normal)' },
    { wt: 68, ht: 1.7, cat: 'স্বাভাবিক ওজন (Normal)' },
    { wt: 75, ht: 1.8, cat: 'স্বাভাবিক ওজন (Normal)' },
    { wt: 78, ht: 1.7, cat: 'অতিরিক্ত ওজন (Overweight)' },
    { wt: 85, ht: 1.75, cat: 'অতিরিক্ত ওজন (Overweight)' },
    { wt: 92, ht: 1.65, cat: 'স্থূলতা (Obesity)' },
    { wt: 98, ht: 1.7, cat: 'স্থূলতা (Obesity)' },
    { wt: 58, ht: 1.6, cat: 'স্বাভাবিক ওজন (Normal)' },
  ];
  bmiCases.forEach((c) => {
    const bmi = Number((c.wt / (c.ht * c.ht)).toFixed(1));
    const wrongBmi = [bmi + 4.5, Math.max(12, bmi - 4.2), Number((c.wt / c.ht).toFixed(1))].map(
      (v) => `${toBnDigits(v)} kg/m²`
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `একজন প্রাপ্তবয়স্ক মানুষের ওজন ${toBnDigits(c.wt)} kg এবং উচ্চতা ${toBnDigits(c.ht)} মিটার হলে তাঁর BMI এবং WHO শ্রেণি কোনটি?`,
        correct: `${toBnDigits(bmi)} kg/m² — ${c.cat}`,
        distractors: wrongBmi,
        explanation: `BMI = ওজন (kg) / [উচ্চতা (m)]² = ${toBnDigits(c.wt)} / (${toBnDigits(c.ht)})² ≈ ${toBnDigits(bmi)} kg/m², যা "${c.cat}" নির্দেশ করে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · স্থূলতা ও BMI',
      })
    );
  });

  // 3. Respiratory Volumes & Capacities Math (~24 MCQs)
  const respCases: Array<{ tv: number; irv: number; erv: number; rv: number }> = [
    { tv: 500, irv: 3000, erv: 1000, rv: 1200 },
    { tv: 500, irv: 2800, erv: 1100, rv: 1200 },
    { tv: 450, irv: 2600, erv: 950, rv: 1100 },
    { tv: 550, irv: 3100, erv: 1150, rv: 1300 },
    { tv: 500, irv: 2500, erv: 1000, rv: 1100 },
    { tv: 600, irv: 3000, erv: 1200, rv: 1200 },
  ];
  respCases.forEach((r) => {
    const vc = r.tv + r.irv + r.erv;
    const tlc = vc + r.rv;
    const frc = r.erv + r.rv;
    const ic = r.tv + r.irv;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একজন মানুষের টাইডাল ভলিউম (TV) ${toBnDigits(r.tv)} mL, IRV ${toBnDigits(r.irv)} mL এবং ERV ${toBnDigits(r.erv)} mL হলে ফুসফুসের ভাইটাল ক্যাপাসিটি (VC) কত?`,
        correct: `${toBnDigits(vc)} mL`,
        distractors: [`${toBnDigits(ic)} mL`, `${toBnDigits(frc)} mL`, `${toBnDigits(vc + 1200)} mL`],
        explanation: `Vital Capacity (VC) = TV + IRV + ERV = ${toBnDigits(r.tv)} + ${toBnDigits(r.irv)} + ${toBnDigits(r.erv)} = ${toBnDigits(vc)} mL।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ফুসফুসের বায়ু ধারণক্ষমতা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'dental',
        question: `যদি ফুসফুসের ভাইটাল ক্যাপাসিটি (VC) ${toBnDigits(vc)} mL এবং রেসিডুয়াল ভলিউম (RV) ${toBnDigits(r.rv)} mL হয়, তবে টোটাল লাং ক্যাপাসিটি (TLC) কত?`,
        correct: `${toBnDigits(tlc)} mL`,
        distractors: [
          `${toBnDigits(vc - r.rv)} mL`,
          `${toBnDigits(frc)} mL`,
          `${toBnDigits(ic)} mL`,
          `${toBnDigits(tlc + 600)} mL`,
          `${toBnDigits(tlc - 600)} mL`,
        ],
        explanation: `Total Lung Capacity (TLC) = VC + RV = ${toBnDigits(vc)} + ${toBnDigits(r.rv)} = ${toBnDigits(tlc)} mL।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · শ্বসন আয়তন',
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
        question: `শ্বসন প্রক্রিয়ায় ERV = ${toBnDigits(r.erv)} mL এবং RV = ${toBnDigits(r.rv)} mL হলে ফাংশনাল রেসিডুয়াল ক্যাপাসিটি (FRC) কত?`,
        correct: `${toBnDigits(frc)} mL`,
        distractors: [`${toBnDigits(ic)} mL`, `${toBnDigits(vc)} mL`, `${toBnDigits(r.erv + r.tv)} mL`],
        explanation: `Functional Residual Capacity (FRC) = ERV + RV = ${toBnDigits(r.erv)} + ${toBnDigits(r.rv)} = ${toBnDigits(frc)} mL।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · শ্বসন ক্ষমতা',
      })
    );
  });

  // 4. Renal GFR & Reabsorption Math (~20 MCQs)
  const gfrMinutes = [10, 20, 30, 40, 60, 120, 240, 480];
  gfrMinutes.forEach((mins) => {
    const filtrateMl = mins * 125;
    const filtrateL = (filtrateMl / 1000).toFixed(2).replace(/\.?0+$/, '');
    const urineMl = Math.round(filtrateMl * 0.01);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch6_excretion',
        visualLessonId: 'nephron',
        hscLevel: '12',
        difficulty: 'medical',
        question: `স্বাভাবিক GFR ১২৫ mL/min ধরলে একজন সুস্থ মানুষের বৃক্কে ${toBnDigits(mins)} মিনিটে মোট কত লিটার গ্লোমেরুলার ফিল্ট্রেট উৎপন্ন হয়?`,
        correct: `${toBnDigits(filtrateL)} লিটার`,
        distractors: [
          `${toBnDigits((filtrateMl / 2000).toFixed(2).replace(/\.?0+$/, ''))} লিটার`,
          `${toBnDigits((filtrateMl / 500).toFixed(2).replace(/\.?0+$/, ''))} লিটার`,
          `${toBnDigits((urineMl / 1000).toFixed(2).replace(/\.?0+$/, ''))} লিটার`,
        ],
        explanation: `মোট ফিল্ট্রেট = ১২৫ mL/min × ${toBnDigits(mins)} min = ${toBnDigits(filtrateMl)} mL = ${toBnDigits(filtrateL)} লিটার।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · GFR হিসাব',
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
        question: `যদি গ্লোমেরুলাসে ${toBnDigits(filtrateMl)} mL ফিল্ট্রেট উৎপন্ন হয় এবং ৯৯% বৃক্কীয় নালিকায় পুনঃশোষিত হয়, তবে কত mL মূত্র তৈরি হবে?`,
        correct: `${toBnDigits(urineMl)} mL`,
        distractors: [
          `${toBnDigits(urineMl * 5)} mL`,
          `${toBnDigits(filtrateMl - urineMl)} mL`,
          `${toBnDigits(urineMl * 10)} mL`,
        ],
        explanation: `৯৯% পুনঃশোষিত হলে মাত্র ১% মূত্ররূপে নিষ্কাশিত হয়; তাই ${toBnDigits(filtrateMl)}-এর ১% = ${toBnDigits(urineMl)} mL।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · মূত্র সৃষ্টি',
      })
    );
  });

  // 5. Blood Clotting Factors (I to XIII) & ABO Blood Group Matrix (~44 MCQs)
  const clottingFactors = [
    { num: 'ফ্যাক্টর I', name: 'ফাইব্রিনোজেন', role: 'থ্রম্বিনের ক্রিয়ায় অদ্রবণীয় ফাইব্রিন জালক তৈরি করে' },
    { num: 'ফ্যাক্টর II', name: 'প্রোথ্রম্বিন', role: 'থ্রম্বোকাইনেজ ও Ca²⁺-এর উপস্থিতিতে সক্রিয় থ্রম্বিনে পরিণত হয়' },
    { num: 'ফ্যাক্টর III', name: 'টিস্যু থ্রম্বোপ্লাস্টিন', role: 'ক্ষতস্থানের টিস্যু ও অণুচক্রিকা থেকে মুক্ত হয়ে তঞ্চন শুরু করে' },
    { num: 'ফ্যাক্টর IV', name: 'ক্যালসিয়াম আয়ন (Ca²⁺)', role: 'রক্ত তঞ্চনের একাধিক ধাপে অপরিহার্য অজৈব কো-ফ্যাক্টর' },
    { num: 'ফ্যাক্টর V', name: 'প্রো-অ্যাকসেলারিন (ল্যাবাইল ফ্যাক্টর)', role: 'প্রোথ্রম্বিনেজ কমপ্লেক্সকে ত্বরান্বিত করে' },
    { num: 'ফ্যাক্টর VII', name: 'প্রোকনভার্টিন (স্টেবল ফ্যাক্টর)', role: 'বহিঃস্থ (Extrinsic) তঞ্চন পথে ফ্যাক্টর X সক্রিয় করে' },
    { num: 'ফ্যাক্টর VIII', name: 'অ্যান্টি-হিমোফিলিক ফ্যাক্টর (AHF)', role: 'এর অভাবে হিমোফিলিয়া-A (রাজকীয় রোগ) সৃষ্টি হয়' },
    { num: 'ফ্যাক্টর IX', name: 'ক্রিসমাস ফ্যাক্টর (প্লাজমা থ্রম্বোপ্লাস্টিন উপাদান)', role: 'এর অভাবে হিমোফিলিয়া-B সৃষ্টি হয়' },
    { num: 'ফ্যাক্টর X', name: 'স্টুয়ার্ট-পাওয়ার ফ্যাক্টর', role: 'অন্তঃস্থ ও বহিঃস্থ পথের মিলনস্থলে প্রোথ্রম্বিনকে সক্রিয় করে' },
    { num: 'ফ্যাক্টর XIII', name: 'ফাইব্রিন-স্ট্যাবিলাইজিং ফ্যাক্টর', role: 'ফাইব্রিন সূত্রগুলোর মধ্যে সমযোজী ক্রস-লিঙ্ক তৈরি করে জমাট দৃঢ় করে' },
  ];
  clottingFactors.forEach((cf, i) => {
    const others = clottingFactors.filter((x) => x.num !== cf.num);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `রক্ত তঞ্চনের কোন ফ্যাক্টরটির নাম "${cf.name}"?`,
        correct: cf.num,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.num),
        explanation: `${cf.num} হলো ${cf.name}, যা ${cf.role}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৪ (রক্ত তঞ্চন)',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `রক্ত জমাট বাঁধার ক্ষেত্রে ${cf.num} (${cf.name})-এর প্রধান ভূমিকা কী?`,
        correct: cf.role,
        distractors: others.slice((i + 3) % 6, ((i + 3) % 6) + 4).map((x) => x.role),
        explanation: `${cf.num} (${cf.name}) ${cf.role}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · তঞ্চন ফ্যাক্টর',
      })
    );
  });

  const bloodGroups = [
    { grp: 'A', ag: 'RBC-তে অ্যান্টিজেন A', ab: 'প্লাজমায় অ্যান্টিবডি b (β)', give: 'A ও AB', take: 'A ও O' },
    { grp: 'B', ag: 'RBC-তে অ্যান্টিজেন B', ab: 'প্লাজমায় অ্যান্টিবডি a (α)', give: 'B ও AB', take: 'B ও O' },
    { grp: 'AB', ag: 'RBC-তে অ্যান্টিজেন A ও B উভয়ই', ab: 'প্লাজমায় কোনো অ্যান্টিবডি (a/b) নেই', give: 'কেবল AB', take: 'A, B, AB, O (সর্বজনীন গ্রহীতা)' },
    { grp: 'O', ag: 'RBC-তে কোনো অ্যান্টিজেন (A/B) নেই', ab: 'প্লাজমায় অ্যান্টিবডি a ও b উভয়ই', give: 'A, B, AB, O (সর্বজনীন দাতা)', take: 'কেবল O' },
  ];
  bloodGroups.forEach((bg, i) => {
    const others = bloodGroups.filter((x) => x.grp !== bg.grp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `ABO রক্তের গ্রুপ পদ্ধতিতে "${bg.grp}" গ্রুপের ব্যক্তির লোহিত রক্তকণিকা ও প্লাজমায় কী কী থাকে?`,
        correct: `${bg.ag} এবং ${bg.ab}`,
        distractors: others.map((x) => `${x.ag} এবং ${x.ab}`),
        explanation: `${bg.grp} গ্রুপের রক্তে ${bg.ag} ও ${bg.ab} থাকায় এরা ${bg.give}-কে রক্ত দিতে ও ${bg.take} থেকে রক্ত নিতে পারে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · রক্তের গ্রুপ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `"${bg.grp}" রক্তগ্রুপধারী ব্যক্তি কোন কোন রক্তগ্রুপের ব্যক্তি থেকে নিরাপদে রক্ত গ্রহণ করতে পারেন (Rh মিল সাপেক্ষে)?`,
        correct: bg.take,
        distractors: others.map((x) => x.take),
        explanation: `${bg.grp} রক্তগ্রুপের প্লাজমায় ${bg.ab} থাকায় এটি কেবল ${bg.take} গ্রুপের রক্ত নিরাপদে গ্রহণ করতে পারে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · রক্ত পরিসঞ্চালন',
      })
    );
  });

  // 6. Genetics Ratios, Crosses & Hardy-Weinberg Quantitative Math (~56 MCQs)
  const geneticRatios = [
    { type: 'মেন্ডেলের প্রথম সূত্র (মনোহাইব্রিড ক্রস F₂ ফেনোটাইপ)', ratio: '৩ : ১', ex: 'মটরশুঁটির লম্বা ও খাটো উদ্ভিদ' },
    { type: 'মেন্ডেলের দ্বিতীয় সূত্র (ডাইহাইব্রিড ক্রস F₂ ফেনোটাইপ)', ratio: '৯ : ৩ : ৩ : ১', ex: 'হলুদ-গোল বনাম সবুজ-কুঞ্চিত মটর বীজ' },
    { type: 'অসম্পূর্ণ প্রকটতা ও সমপ্রকটতা (F₂ ফেনোটাইপ)', ratio: '১ : ২ : ১', ex: 'সন্ধ্যামালতী ফুল (লাল : গোলাপি : সাদা) ও আন্দালুসিয়ান মুরগি' },
    { type: 'লিথাল জিন (মারণ জিন) প্রভাবিত মনোহাইব্রিড অনুপাত', ratio: '২ : ১', ex: 'হলুদ বনাম মেটে ইঁদুর, ক্রিপার মুরগি ও থ্যালাসেমিয়া মেজর' },
    { type: 'দ্বৈত প্রচ্ছন্ন এপিস্ট্যাসিস বা পরিপূরক জিন (Complementary gene)', ratio: '৯ : ৭', ex: 'মিষ্টি মটরের সাদা ও বেগুনি ফুল' },
    { type: 'প্রকট এপিস্ট্যাসিস বা ইনহিবিটরি জিন (Dominant Epistasis)', ratio: '১৩ : ৩', ex: 'সাদা লেগহর্ন ও সাদা ওয়াইয়ানডট মুরগির পালকের বর্ণ' },
    { type: 'সাপ্লিমেন্টারি বা প্রচ্ছন্ন এপিস্ট্যাসিস (Recessive Epistasis)', ratio: '৯ : ৩ : ৪', ex: 'ইঁদুরের কালো-অ্যাগুটি-অ্যালবিনো লোম' },
    { type: 'ডুপ্লিকেট প্রকট এপিস্ট্যাসিস', ratio: '১৫ : ১', ex: 'ক্যাপসেলা (Shepherd’s purse) উদ্ভিদের ফল ও ধানের শস্য' },
  ];
  geneticRatios.forEach((gr, i) => {
    const others = geneticRatios.filter((x) => x.type !== gr.type);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${gr.type}"-এর ক্ষেত্রে F₂ জনুতে ফিনোটাইপিক অনুপাত কত পাওয়া যায়?`,
        correct: gr.ratio,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.ratio),
        explanation: `${gr.type}-এর ফিনোটাইপিক অনুপাত ${gr.ratio}। আদর্শ উদাহরণ: ${gr.ex}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ১১',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `F₂ জনুতে ${gr.ratio} অনুপাত দেখা যায় নিচের কোন জিনতাত্ত্বিক উদাহরণে?`,
        correct: gr.ex,
        distractors: others.slice((i + 3) % 4, ((i + 3) % 4) + 4).map((x) => x.ex),
        explanation: `${gr.ex}-এ ${gr.type} সংঘটিত হওয়ায় ${gr.ratio} অনুপাত পাওয়া যায়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · মেন্ডেলের ব্যতিক্রম',
      })
    );
  });

  // Hardy-Weinberg calculations
  const hwQs = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
  hwQs.forEach((qVal) => {
    const pVal = Number((1 - qVal).toFixed(1));
    const q2Pct = Math.round(qVal * qVal * 100);
    const hetPct = Math.round(2 * pVal * qVal * 100);
    const domPct = Math.round(pVal * pVal * 100);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `হার্ডি-ওয়াইনবার্গ সাম্যাবস্থায় থাকা একটি জনসংখ্যায় প্রচ্ছন্ন অ্যালিলের ফ্রিকোয়েন্সি q = ${toBnDigits(qVal)} হলে হেটেরোজাইগাস বাহকের (2pq) শতকরা হার কত?`,
        correct: `${toBnDigits(hetPct)}%`,
        distractors: [
          `${toBnDigits(q2Pct)}%`,
          `${toBnDigits(domPct)}%`,
          `${toBnDigits(Math.round(qVal * 100))}%`,
          `${toBnDigits(hetPct + 15)}%`,
          `${toBnDigits(Math.max(5, hetPct - 15))}%`,
        ],
        explanation: `p + q = ১ হতে p = ১ - ${toBnDigits(qVal)} = ${toBnDigits(pVal)}। হেটেরোজাইগাস (2pq) = ২ × ${toBnDigits(pVal)} × ${toBnDigits(qVal)} = ${toBnDigits((2 * pVal * qVal).toFixed(2))} অর্থাৎ ${toBnDigits(hetPct)}%।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২ · হার্ডি-ওয়াইনবার্গ নীতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'dental',
        question: `কোনো পপুলেশনে অটোজোমাল প্রচ্ছন্ন রোগে আক্রান্ত (q²) ব্যক্তির হার ${toBnDigits(q2Pct)}% হলে স্বাভাবিক প্রকট অ্যালিল p-এর মান কত?`,
        correct: `${toBnDigits(pVal)}`,
        distractors: [
          `${toBnDigits(qVal)}`,
          `${toBnDigits(Number((domPct / 100).toFixed(2)))}`,
          `${toBnDigits(Number((hetPct / 100).toFixed(2)))}`,
          `${toBnDigits(Number(Math.min(0.95, pVal + 0.15).toFixed(2)))}`,
          `${toBnDigits(Number(Math.max(0.05, pVal - 0.15).toFixed(2)))}`,
        ],
        explanation: `q² = ${toBnDigits(q2Pct / 100)} হলে q = √(${toBnDigits(q2Pct / 100)}) = ${toBnDigits(qVal)}; তাই প্রকট অ্যালিল p = ১ - ${toBnDigits(qVal)} = ${toBnDigits(pVal)}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২ · জিন ফ্রিকোয়েন্সি',
      })
    );
  });

  // Sex-linked & ABO Parental Cross scenarios
  const geneticCrosses: Array<{ q: string; a: string; d: [string, string, string]; exp: string }> = [
    {
      q: 'একজন লাল-সবুজ বর্ণান্ধ পিতা (XᶜY) ও স্বাভাবিক বাহক মাতার (X⁺Xᶜ) পুত্রসন্তানদের মধ্যে কত শতাংশ বর্ণান্ধ হবে?',
      a: '৫০% পুত্র বর্ণান্ধ ও ৫০% পুত্র স্বাভাবিক',
      d: ['১০০% পুত্র বর্ণান্ধ', '০% পুত্র বর্ণান্ধ', '২৫% পুত্র বর্ণান্ধ'],
      exp: 'পুত্রসন্তান মায়ের কাছ থেকে X ক্রোমোজোম ও পিতার থেকে Y পায়। মাতা X⁺Xᶜ হওয়ায় অর্ধেক পুত্র XᶜY (বর্ণান্ধ) ও অর্ধেক X⁺Y (স্বাভাবিক) হবে।',
    },
    {
      q: 'স্বাভাবিক দৃষ্টিসম্পন্ন পিতা (X⁺Y) ও বর্ণান্ধ মাতার (XᶜXᶜ) সকল পুত্র ও কন্যাসন্তানের অবস্থা কী হবে?',
      a: 'সকল পুত্র বর্ণান্ধ এবং সকল কন্যা বাহক হবে',
      d: ['সকল পুত্র ও কন্যা বর্ণান্ধ', '৫০% পুত্র ও ৫০% কন্যা বর্ণান্ধ', 'সকল সন্তান স্বাভাবিক'],
      exp: 'বর্ণান্ধ মাতার একমাত্র Xᶜ পুত্রের কাছে যায় (১০০% পুত্র বর্ণান্ধ), আর পিতার X⁺ পায় বলে কন্যারা X⁺Xᶜ (১০০% বাহক) হয়।',
    },
    {
      q: 'পিতার রক্তের গ্রুপ AB (IᴬIᴮ) এবং মাতার রক্তের গ্রুপ O (ii) হলে সন্তানের কোন রক্তের গ্রুপগুলো হতে পারে?',
      a: 'কেবল A অথবা B (কখনোই AB বা O নয়)',
      d: ['কেবল AB অথবা O', 'A, B, AB ও O সবগুলোই', 'কেবল O'],
      exp: 'IᴬIᴮ × ii ক্রসে সন্তানের জেনোটাইপ কেবল Iᴬi (গ্রুপ A) এবং Iᴮi (গ্রুপ B) হতে পারে।',
    },
    {
      q: 'উভয় পিতা-মাতার রক্তের গ্রুপ হেটেরোজাইগাস A (Iᴬi) ও হেটেরোজাইগাস B (Iᴮi) হলে সন্তানের সম্ভাব্য রক্তের গ্রুপ কয় ধরনের হতে পারে?',
      a: '৪ ধরনেরই (A, B, AB এবং O)',
      d: ['কেবল ২ ধরনের (A ও B)', 'কেবল ১ ধরনের (AB)', 'কেবল ৩ ধরনের (A, B, AB)'],
      exp: 'Iᴬi × Iᴮi ক্রসে IᴬIᴮ (AB), Iᴬi (A), Iᴮi (B) এবং ii (O) চার ধরনের রক্তগ্রুপই ২৫% করে সম্ভাব্য।',
    },
    {
      q: 'হিমোফিলিয়া আক্রান্ত পিতা (XʰY) ও সম্পূর্ণ স্বাভাবিক মাতার (XᴴXᴴ) কোন সন্তানেরা হিমোফিলিয়া বাহক হবে?',
      a: 'সকল কন্যাসন্তান বাহক (XᴴXʰ) এবং সকল পুত্র স্বাভাবিক (XᴴY)',
      d: ['সকল পুত্র রোগী ও কন্যা স্বাভাবিক', '৫০% পুত্র বাহক', 'কেউই বাহক নয়'],
      exp: 'পিতার ত্রুটিপূর্ণ Xʰ কন্যাদের কাছে যায় বলে সব কন্যা বাহক হয়, আর পুত্ররা পিতার Y ও মাতার সুস্থ Xᴴ পায় বলে ১০০% সুস্থ হয়।',
    },
  ];
  geneticCrosses.forEach((gc) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: gc.q,
        correct: gc.a,
        distractors: gc.d,
        explanation: gc.exp,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · মানব বংশগতি',
      })
    );
  });

  // 7. Antibody & Immunity Matrix + Odd-One-Out Sets (~70 MCQs)
  const immunologyMatrix = [
    { ig: 'IgG', struct: 'মনোমার (মোট অ্যান্টিবডির ৭৫–৮০%)', feat: 'একমাত্র অ্যান্টিবডি যা গর্ভবতী মায়ের প্লাসেন্টা অতিক্রম করে ভ্রূণকে সুরক্ষা দেয়' },
    { ig: 'IgA', struct: 'ডাইমার (নিঃসরণশীল)', feat: 'মাতৃদুগ্ধ (শালদুধ/কলস্ট্রাম), অশ্রু, লালা ও শ্বাস-পৌষ্টিকনালির মিউকাসে থাকে' },
    { ig: 'IgM', struct: 'পেন্টামার (বৃহত্তম অ্যান্টিবডি, ৫টি একক)', feat: 'জীবাণু সংক্রমণের বিরুদ্ধে শরীরে প্রথম উৎপন্ন হয় এবং রক্তগ্রুপের (α/β) অ্যান্টিবডি' },
    { ig: 'IgE', struct: 'মনোমার (সবচেয়ে কম ঘনত্ব)', feat: 'মাস্ট কোষ ও বেসোফিলের সাথে যুক্ত হয়ে হিস্টামিন ক্ষরণ ও অ্যালার্জি-অ্যাজমা সৃষ্টি করে' },
    { ig: 'IgD', struct: 'মনোমার', feat: 'অপরিণত B-লিম্ফোসাইটের পৃষ্ঠে অ্যান্টিজেন রিসেপ্টর হিসেবে সক্রিয়করণে ভূমিকা রাখে' },
  ];
  immunologyMatrix.forEach((im, i) => {
    const others = immunologyMatrix.filter((x) => x.ig !== im.ig);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ইমিউনোগ্লোবিউলিনের কোন শ্রেণিটি "${im.feat}"?`,
        correct: `${im.ig} (${im.struct})`,
        distractors: others.map((x) => `${x.ig} (${x.struct})`),
        explanation: `${im.ig} হলো ${im.struct}, যা ${im.feat}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০ · অ্যান্টিবডি শ্রেণিবিভাগ',
      })
    );
  });

  // 8. Comprehensive Zoology High-Yield Concept & Exception Bank across all 9 chapters (~260+ MCQs)
  const zoologyDrills: Array<[string, string, string, string, [string, string, string], string, string]> = [
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'হাইড্রার মতো অরীয় প্রতিসাম্যতা (Radial symmetry) এবং সিলেন্টেরন কোন পর্বে দেখা যায়?', 'Cnidaria (নিডারিয়া)', ['Platyhelminthes', 'Arthropoda', 'Annelida'], 'Cnidaria পর্বের প্রাণীরা দ্বিস্তরী, অরীয় প্রতিসম এবং এদের দেহগহ্বরকে সিলেন্টেরন বলে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'মানবদেহের ক্ষতিকর পরজীবী "ফাইলেরিয়া কৃমি" (Wuchereria bancrofti) কোন পর্বের প্রাণী?', 'Nematoda (নেমাটোডা)', ['Platyhelminthes', 'Annelida', 'Mollusca'], 'গোদ রোগ (Elephantiasis) সৃষ্টিকারী Wuchereria bancrofti নেমাটোডা পর্বের সিউডোসিলোমেট গোলকৃমি।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'প্রাণিজগতের একমাত্র পর্ব যেখানে মিঠাপানির বা স্থলজ কোনো সদস্য নেই (শতভাগ সামুদ্রিক)—তা কোনটি?', 'Echinodermata', ['Mollusca', 'Porifera', 'Annelida'], 'তারামাছ ও সমুদ্র আর্চিনযুক্ত Echinodermata পর্বের সব প্রজাতিই সামুদ্রিক।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'কোন শ্রেণির সরীসৃপে ব্যতিক্রমীভাবে হৃৎপিণ্ড সম্পূর্ণ ৪-প্রকোষ্ঠবিশিষ্ট?', 'কুমির ও ঘড়িয়াল (Crocodilia বর্গ)', ['গোখরা ও অজগর সাপ', 'গিরগিটি ও কচ্ছপ', 'কুনোব্যাঙ ও স্যালাম্যান্ডার'], 'অধিকাংশ সরীসৃপে নিলয় আংশিক বিভক্ত (অসম্পূর্ণ ৪-প্রকোষ্ঠ), কেবল কুমির-ঘড়িয়ালে হৃৎপিণ্ড সম্পূর্ণ ৪-প্রকোষ্ঠ।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'রয়েল বেঙ্গল টাইগার (Panthera tigris) ও মানুষের (Homo sapiens) মতো স্তন্যপায়ীদের রক্তের লোহিত কণিকা কেমন?', 'দ্বি-অবতল, বৃত্তাকার ও নিউক্লিয়াসবিহীন (উট ও লামা ব্যতীত)', ['ডিম্বাকার ও নিউক্লিয়াসযুক্ত', 'গোলাকার ও বহুনিউক্লীয়', 'হিমোসায়ানিনযুক্ত'], 'স্তন্যপায়ী প্রাণীর RBC পরিণত অবস্থায় নিউক্লিয়াসবিহীন (ব্যতিক্রম উট ও লামা, যাদের RBC ডিম্বাকার ও নিউক্লিয়াসযুক্ত থাকে)।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ ও ৪'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'হাইড্রার কোন কোষের সাহায্যে সে শিকারকে অবশ করার জন্য বিষাক্ত হিপনোটক্সিন নিক্ষেপ করে?', 'পেনিট্র্যান্ট (স্টিনোটিল) নেমাটোসিস্ট', ['ভলভেন্ট নেমাটোসিস্ট', 'ইন্টারস্টিশিয়াল কোষ', 'সংবেদী কোষ'], '৪ ধরনের নেমাটোসিস্টের মধ্যে পেনিট্র্যান্ট সবচেয়ে বড় ও বিষাক্ত হিপনোটক্সিন-বাহী; ভলভেন্ট প্যাঁচিয়ে ধরে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'হাইড্রার যে চলন প্রক্রিয়ায় সে জোঁকের মতো কুঁজো হয়ে দ্রুত ও সাধারণভাবে চলাফেরা করে তাকে কী বলে?', 'হামাগুড়ি বা লুপিং (Looping)', ['সমারসল্টিং (ডিগবাজি)', 'সাঁতার কাটা', 'গ্লাইডিং'], 'লুপিং-এ কর্ষিকার সাহায্যে বাঁকা হয়ে লুপ তৈরি করে এগোয়; আর সমারসল্টিংয়ে বারবার পদতল ও কর্ষিকার ওপর ভর দিয়ে দ্রুত দীর্ঘ পথ চলে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'হাইড্রার গ্যাস্ট্রোডার্মিসে (অন্তঃত্বক) কোন কোষটি অনুপস্থিত থাকে?', 'নিডোসাইট কোষ', ['পুষ্টি কোষ', 'গ্রন্থি কোষ', 'ইন্টারস্টিশিয়াল কোষ'], 'নিডোসাইট কেবল হাইড্রার এপিডার্মিসে (বহিঃত্বক) থাকে; গ্যাস্ট্রোডার্মিসে থাকে না।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'ঘাসফড়িংয়ের কোন অঙ্গটি চর্বণ-পেষণে অংশ নেয় অর্থাৎ শক্ত ও দাঁতযুক্ত চোয়াল হিসেবে কাজ করে?', 'ম্যান্ডিবল (Mandible)', ['ল্যাব্রাম', 'ল্যাবিয়াম', 'ম্যাক্সিলা'], 'ঘাসফড়িংয়ের ম্যান্ডিবুলেট বা চর্বণ উপযোগী মুখোপাঙ্গে একজোড়া শক্ত কাইটিনময় ম্যান্ডিবল খাদ্য চিবোয়।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'ঘাসফড়িংয়ের মস্তিষ্কে অবস্থিত সরল চোখ (Ocelli) কয়টি এবং পুঞ্জাক্ষিতে ওমাটিডিয়াম কয়টি?', '৩টি সরল অসেলি ও প্রতিটি পুঞ্জাক্ষিতে প্রায় ২,০০০টি ওমাটিডিয়াম', ['২টি অসেলি ও ৫০০টি ওমাটিডিয়াম', '১টি অসেলি ও ১০০টি ওমাটিডিয়াম', '৬টি অসেলি ও ৫,০০০টি ওমাটিডিয়াম'], 'ঘাসফড়িংয়ের মাথায় ২টি যৌগিক পুঞ্জাক্ষি (প্রতিটিতে ~২,০০০ ওমাটিডিয়াম) ও মাঝখানে ৩টি সরল অসেলি থাকে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'ঘাসফড়িংয়ের অন্ননালি ও গিজার্ডের কাজ যথাক্রমে কী?', 'ক্রপ সাময়িকভাবে খাদ্য জমা রাখে এবং গিজার্ড (প্রোভেন্ট্রিকুলাস) কাইটিন দাঁত দিয়ে খাদ্য চূর্ণ করে', ['ক্রপ খাদ্য শোষণ ও গিজার্ড রেচন ঘটায়', 'উভয়ই হিমোলিম্ফ পাম্প করে', 'ক্রপ শ্বসনে ও গিজার্ড দৃষ্টিতে কাজ করে'], 'অগ্রান্ত্রের ক্রপ খাদ্য সঞ্চয় এবং গিজার্ডের ৬টি কাইটিনময় প্লেট খাদ্য পেষণ ও ছাঁকনে ভূমিকা রাখে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'heart_cardiac', 'রুইমাছের (Labeo rohita) প্রতিটি ফুলকায় কয়টি ফুলকা আর্চ এবং পর্দার মতো কয় সারি ফিলামেন্ট (হোলোব্রাঙ্ক) থাকে?', 'প্রতি পাশে ৪ জোড়া ফুলকা (মোট ৮টি); প্রতিটি ফুলকায় ২ সারি ফিলামেন্ট', ['প্রতি পাশে ৫ জোড়া ফুলকা', 'প্রতি পাশে ২ জোড়া ফুলকা', 'প্রতি পাশে ৭ জোড়া ফুলকা'], 'অস্থিময় মাছ রুইয়ে অপারকুলাম দ্বারা ঢাকা ৪ জোড়া প্রকৃত ফুলকা থাকে এবং শ্বসনতন্ত্রে কাউন্টারকারেন্ট প্রবাহ ঘটে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'heart_cardiac', 'রুইমাছের পার্শ্বরেখা তন্ত্রের (Lateral line system) প্রধান কাজ কী?', 'পানির স্রোত, কম্পন ও চাপের পরিবর্তন শনাক্ত করা (রিওরিসেপ্টর)', ['পানিতে ভেসে থাকা', 'শর্করা পরিপাক করা', 'শুক্রাণু উৎপাদন'], 'দেহের দুপাশে সারিবদ্ধ ছিদ্রযুক্ত পার্শ্বরেখা নালিতে থাকা নিউরোমাস্ট কোষ পানির তরঙ্গ ও চাপ শনাক্ত করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'heart_cardiac', 'রুইমাছের প্রজনন ও ডিম পাড়ার অনুকূল পরিবেশ কোনটি?', 'বর্ষাকালে (জুন–জুলাই) ২৪°–২৮°C তাপমাত্রা ও প্রবল স্রোতযুক্ত অগভীর হালদা বা প্লাবনভূমির নদী', ['শীতকালে গভীর সমুদ্রে', 'বদ্ধ ডোবায় ডিসেম্বরে', 'লবণাক্ত মোহনায়'], 'বাংলাদেশের চট্টগ্রামের হালদা নদী রুই, কাতলা ও মৃগেলের প্রাকৃতিক প্রজননের জন্য বিখ্যাত।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'মানুষের ক্ষুদ্রান্ত্রের তিনটি অংশের দৈর্ঘ্যের ক্রম (সংক্ষিপ্ত থেকে দীর্ঘতম) কোনটি?', 'ডিওডেনাম (~২৫–৩০ cm) < জেজুনাম (~২.৫ m) < ইলিয়াম (~৩.৫ m)', ['ইলিয়াম < জেজুনাম < ডিওডেনাম', 'জেজুনাম < ডিওডেনাম < ইলিয়াম', 'ডিওডেনাম < ইলিয়াম < জেজুনাম'], 'ক্ষুদ্রান্ত্র প্রায় ৬–৭ মিটার লম্বা, যার C-আকৃতির প্রথম অংশ ডিওডেনাম সবচেয়ে ছোট এবং শেষ অংশ ইলিয়াম সবচেয়ে লম্বা।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'পিত্তরসে থাকা পিত্তলবণ (সোডিয়াম গ্লাইকোকোলেট ও টরোকোলেট)-এর কাজ কী?', 'স্নেহ বা চর্বির বড় কণাকে ক্ষুদ্র বিন্দুতে ভেঙে ইমালসিফিকেশন করা', ['প্রোটিনকে অ্যামিনো অ্যাসিডে ভাঙা', 'শ্বেতসারকে গ্লুকোজে পরিণত করা', 'রক্ত জমাট বাঁধানো'], 'পিত্তরসে কোনো পরিপাক এনজাইম নেই; এতে থাকা পিত্তলবণ ফ্যাটের পৃষ্ঠটান কমিয়ে লাইপেজ ক্রিয়ার জন্য উপযোগী করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'মানবদেহের বৃহদন্ত্রের মলাশয়ের পূর্বে অবস্থিত সিকাম-সংলগ্ন নিষ্ক্রিয় অঙ্গটির নাম কী?', 'ভার্মিফর্ম অ্যাপেন্ডিক্স', ['পিত্তথলি', 'গবলেট কোষ', 'অডির স্ফিংকটার'], 'সিকামের সাথে যুক্ত অ্যাপেন্ডিক্স প্রদাহজনিত রোগে অ্যাপেন্ডিসাইটিস হয়।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'অগ্ন্যাশয় নালি (ডাক্ট অব উইরসাং) এবং সাধারণ পিত্তনালি মিলিত হয়ে অ্যাম্পুলা অব ভ্যাটার-এর মাধ্যমে কোথায় উন্মুক্ত হয়?', 'ডিওডেনামে (স্ফিঙ্কটার অব অডির নিয়ন্ত্রণে)', ['পাকস্থলির ফান্ডাসে', 'জেজুনামে', 'সিকামে'], 'হিপ্যাটোপ্যানক্রিয়েটিক অ্যাম্পুলা ডিওডেনামের দ্বিতীয় অংশে পিত্ত ও অগ্ন্যাশয় রস পৌঁছে দেয়।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩'],
    ['bio2_ch4_blood', 'heart_cardiac', 'রক্তের প্লাজমা প্রোটিনগুলোর মধ্যে রক্তের কলয়েডাল অভিস্রবণিক চাপ (Oncotic pressure) বজায় রাখে কোনটি?', 'অ্যালবুমিন (Albumin, ~৫৫%)', ['ফাইব্রিনোজেন', 'গামা গ্লোবিউলিন', 'হিমোগ্লোবিন'], 'যকৃতে তৈরি অ্যালবুমিন রক্তনালিতে পানি ধরে রেখে ইডিমা (শোথ) প্রতিরোধ করে; এর ঘাটতিতে শরীরে পানি জমে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch4_blood', 'heart_cardiac', 'কোন শ্বেত রক্তকণিকা অ্যালার্জিক বিক্রিয়া ও পরজীবী কৃমির সংক্রমণে সংখ্যায় দ্রুত বেড়ে যায়?', 'ইওসিনোফিল (Eosinophil)', ['নিউট্রোফিল', 'বেসোফিল', 'মনোসাইট'], 'দ্বিখণ্ডিত নিউক্লিয়াসযুক্ত ও অম্লীয় রঞ্জকে লাল হওয়া ইওসিনোফিল অ্যালার্জি প্রশমনে ও কৃমি ধ্বংসে কাজ করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch4_blood', 'heart_cardiac', 'ফুসফুসীয় সংবহনের (Pulmonary circulation) ক্ষেত্রে নিচের কোনটি একমাত্র ব্যতিক্রম?', 'ফুসফুসীয় ধমনি CO₂-যুক্ত অশুদ্ধ রক্ত ও ফুসফুসীয় শিরা O₂-যুক্ত বিশুদ্ধ রক্ত বহন করে', ['পালমোনারি ধমনি O₂-যুক্ত রক্ত বহন করে', 'উভয়েই মিশ্র রক্ত বহন করে', 'ডান নিলয় থেকে শুদ্ধ রক্ত ফুসফুসে যায়'], 'সাধারণত ধমনি অক্সিজেনযুক্ত ও শিরা কার্বন ডাই-অক্সাইডযুক্ত রক্ত বহন করলেও পালমোনারি (ফুসফুসীয়) ক্ষেত্রে ঠিক উল্টো ঘটে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch4_blood', 'heart_cardiac', 'করোনারি ধমনির আংশিক ব্লকের কারণে বুক চেপে ধরার যে তীব্র ব্যথা বাম হাত ও চোয়ালে ছড়িয়ে পড়ে তাকে কী বলে?', 'অ্যানজাইনা পেকটোরিস (Angina pectoris)', ['হার্ট ফেইলিউর', 'ব্রেডিকার্ডিয়া', 'ট্যাকিকার্ডিয়া'], 'মায়োকার্ডিয়ামে অস্থায়ী অক্সিজেন ঘাটতিতে অ্যানজাইনা হয়; আর ধমনি সম্পূর্ণ বন্ধ হয়ে পেশি মারা গেলে মায়োকার্ডিয়াল ইনফার্কশন (হার্ট অ্যাটাক) হয়।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch4_blood', 'heart_cardiac', 'বন্ধ হয়ে যাওয়া করোনারি ধমনিকে প্রসারিত রাখতে ছোট তারের জালি বসানোর চিকিৎসা পদ্ধতির নাম কী?', 'এনজিওপ্লাস্টি ও স্টেন্টিং (Stenting)', ['বাইপাস সার্জারি (CABG)', 'কৃত্রিম পেসমেকার', 'ডায়ালাইসিস'], 'বেলুন ক্যাথেটার দিয়ে ব্লক খুলে স্টেন্ট বসানোকে করোনারি এনজিওপ্লাস্টি বলে; আর শরীরের অন্য শিরা-ধমনি জুড়ে বিকল্প পথ করা হলো বাইপাস সার্জারি।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch5_respiration', 'bohr_curve', 'প্লুরাল গহ্বরে থাকা সিরাস তরলের মূল কাজ কী?', 'শ্বাসক্রিয়ায় ফুসফুস ও বক্ষপ্রাচীরের মধ্যকার ঘর্ষণ কমানো', ['অক্সিজেন সংরক্ষণ করা', 'CO₂ শোষণ করা', 'রক্ত জমাট বাঁধানো'], 'ভিসেরাল ও প্যারাইটাল প্লুরার মাঝের প্লুরাল ফ্লুইড ফুসফুসের প্রসারণ ও সংকোচনকে ঘর্ষণহীন রাখে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫'],
    ['bio2_ch5_respiration', 'bohr_curve', 'প্রশ্বাসের (Inspiration) সময় মধ্যচ্ছদা (Diaphragm) ও বহিঃস্থ ইন্টারকস্টাল পেশির অবস্থা কেমন হয়?', 'উভয়েই সংকুচিত হয় (মধ্যচ্ছদা নিচে নেমে সমতল হয় ও বক্ষগহ্বরের আয়তন বাড়ে)', ['উভয়েই শিথিল হয়ে ওপরে ওঠে', 'মধ্যচ্ছদা শিথিল ও ইন্টারকস্টাল সংকুচিত হয়', 'বক্ষগহ্বরের চাপ বেড়ে যায়'], 'প্রশ্বাস একটি সক্রিয় প্রক্রিয়া: পেশি সংকুচিত হয়ে বক্ষগহ্বর প্রসারিত হলে বায়ুচাপ কমে বাতাস ফুসফুসে প্রবেশ করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫'],
    ['bio2_ch5_respiration', 'bohr_curve', 'ধূমপানের ফলে অ্যালভিওলাসের প্রাচীর ফেটে বড় বায়ুথলি তৈরি হওয়াকে কোন দীর্ঘমেয়াদি ফুসফুসীয় রোগ বলে?', 'এমফাইসিমা (Emphysema)', ['ব্রংকাইটিস', 'নিউমোনিয়া', 'প্লুরিসি'], 'ধূমপানের নিকোটিন ও টার অ্যালভিওলার প্রাচীরের স্থিতিস্থাপকতা নষ্ট করে এমফাইসিমা সৃষ্টি করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫'],
    ['bio2_ch5_respiration', 'bohr_curve', 'হৃৎপিণ্ডের রক্তে অক্সিজেন-হিমোগ্লোবিন বিয়োজন লেখ (Dissociation curve)-এর স্বাভাবিক আকৃতি কেমন?', 'সিগময়েড বা S-আকৃতির (Sigmoid)', ['সরলরৈখিক', 'হাইপারবোলিক (মায়োগ্লোবিন)', 'বৃত্তাকার'], 'হিমোগ্লোবিনের ৪টি সাবইউনিটের কো-অপারেটিভ বাইন্ডিংয়ের কারণে O₂-হিমোগ্লোবিন কার্ভ S-আকৃতির (মায়োগ্লোবিনেরটি হাইপারবোলিক)।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫'],
    ['bio2_ch6_excretion', 'nephron', 'মানবদেহের ডান বৃক্ক বাম বৃক্কের তুলনায় কিছুটা নিচে অবস্থান করার প্রধান কারণ কী?', 'ডান দিকে বৃহদাকার যকৃতের (Liver) অবস্থান', ['পাকস্থলির চাপ', 'হৃৎপিণ্ডের অবস্থান', 'প্লীহার চাপ'], 'ডান হাইপোকন্ড্রিয়াক অঞ্চলে বড় যকৃতের ডান লোব থাকায় ডান বৃক্কটি বাম বৃক্ক থেকে প্রায় ১.৫–২ cm নিচে থাকে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬'],
    ['bio2_ch6_excretion', 'nephron', 'নেফ্রনের হেনলির লুপের (Loop of Henle) নিম্নগামী ও ঊর্ধ্বগামী বাহু যথাক্রমে কিসের প্রতি ভেদ্য?', 'নিম্নগামী বাহু কেবল পানির প্রতি ভেদ্য, কিন্তু ঊর্ধ্বগামী পুরু বাহু পানির প্রতি অভেদ্য ও NaCl পাম্প করে', ['উভয় বাহু পানির প্রতি ভেদ্য', 'নিম্নগামী বাহু কেবল ইউরিয়া ভেদ্য', 'ঊর্ধ্বগামী বাহু কেবল পানি শোষণ করে'], 'হেনলির লুপের এই বৈষম্যমূলক ভেদ্যতাই বৃক্কীয় মেডুলায় অসমোলারিটি গ্রেডিয়েন্ট (কাউন্টারকারেন্ট গুণক) তৈরি করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬'],
    ['bio2_ch6_excretion', 'nephron', 'ডায়াবেটিস মেলিটাস রোগীর মূত্রে গ্লুকোজ নির্গত হওয়ার (গ্লাইকোসুরিয়া) কারণ কী?', 'রক্তে গ্লুকোজ রেনাল থ্রেশহোল্ড (~১৮০ mg/dL) ছাড়িয়ে গেলে PCT সব গ্লুকোজ পুনঃশোষণ করতে না পারা', ['গ্লোমেরুলাস ফেটে যাওয়া', 'ADH হরমোন বন্ধ হওয়া', 'ইউরিয়া চক্র নষ্ট হওয়া'], 'PCT-তে গ্লুকোজ পরিবাহকের সর্বোচ্চ পরিবহন ক্ষমতা (TmG) অতিক্রম করলে বাড়তি গ্লুকোজ মূত্রের সাথে বেরিয়ে আসে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'পেশি কোষের সংকোচনশীল প্রোটিনগুলোর মধ্যে কোন দুটি সরাসরি ক্রস-ব্রিজ তৈরি করে ATP ভেঙ্গে শক্তি পায়?', 'অ্যাক্টিন (পাতলা ফিলামেন্ট) ও মায়োসিন (পুরু ফিলামেন্ট)', ['ট্রপোনিন ও টিউবিউলিন', 'কোলাজেন ও ইলাস্টিন', 'কেরাটিন ও হিস্টোন'], 'মায়োসিনের মস্তকে ATPase এনজাইম থাকে যা ATP ভেঙে অ্যাক্টিনের সাথে যুক্ত হয়ে সার্কোমিয়ার সংকুচিত করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'মেরুদণ্ডহীন কোন প্রাণির নয়, বরং মানুষের প্রথম শ্রেণির লিভার (Fulcrum মাঝে) এবং তৃতীয় শ্রেণির লিভারের উদাহরণ কোনগুলো?', '১ম শ্রেণি: মাথা-অ্যাটলাস সন্ধি; ৩য় শ্রেণি: কনুই ভাঁজ (বাইসেপস পেশি)', ['১ম শ্রেণি: পায়ের আঙুলে ভর; ৩য় শ্রেণি: চোয়াল', 'সব সন্ধি কেবল ২য় শ্রেণির লিভার', '১ম শ্রেণি: হাঁটু; ৩য় শ্রেণি: ঘাড়'], 'মানবদেহে বেশিরভাগ চলন (বাইসেপস দ্বারা হাত তোলা) তৃতীয় শ্রেণির লিভার, যেখানে প্রচেষ্টা ভার ও ফালক্রামের মাঝে থাকে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'অস্থির বাইরের আবরণকে পেরিঅস্টিয়াম এবং তরুণাস্থির বাইরের আবরণকে কী বলে? তরুণাস্থিতে কোন কোষ ও ম্যাট্রিক্স থাকে?', 'পেরিকন্ড্রিয়াম; কনড্রোসাইট ও কনড্রিন প্রোটিন', ['এন্ডোমিউসিয়াম ও অস্টিওসাইট', 'পেরিকার্ডিয়াম ও সার্কোলেমা', 'প্লুরা ও হায়ালিন'], 'তরুণাস্থির কোষ কনড্রোসাইট ল্যাকুনাতে অবস্থান করে এবং এতে কোনো রক্তনালি বা স্নায়ু থাকে না।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'অস্থিসন্ধিতে হাড় নিজ স্থান থেকে সরে গেলে তাকে ডিসলোকেশন বলে; আর লিগামেন্ট ছিঁড়ে বা টান খেয়ে মচকে গেলে তাকে কী বলে?', 'স্প্রেইন বা মচকানো (Sprain)', ['স্ট্রেইন (পেশি টান)', 'গ্রিনস্টিক ফ্র্যাকচার', 'অস্টিওআর্থ্রাইটিস'], 'লিগামেন্ট আঘাতকে স্প্রেইন (Sprain) ও পেশি-টেন্ডন আঘাতকে স্ট্রেইন (Strain) এবং অস্থির বিচ্যুতিকে ডিসলোকেশন বলে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch8_coordination', 'bohr_curve', 'অপটিক স্নায়ু ও রেটিনার সংযোগস্থলে কোনো ফটোরিসেপ্টর না থাকায় সেখানে কোনো প্রতিবিম্ব তৈরি হয় না; ঐ বিন্দুকে কী বলে?', 'অন্ধবিন্দু (Blind spot / Optic disc)', ['পীতবিন্দু (Macula lutea)', 'ফোভিয়া সেন্ট্রালিস', 'পিউপিল'], 'ফোভিয়া সেন্ট্রালিস সবচেয়ে স্পষ্ট ও রঙিন দর্শনের স্থান; অন্ধবিন্দুতে কোনো রড বা কোণ কোষ নেই।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮'],
    ['bio2_ch8_coordination', 'bohr_curve', 'চোখের কোন রোগে কর্নিয়া বা লেন্সের বক্রতা অসম হওয়ায় একই তলে আনুভূমিক ও উল্লম্ব রেখা একসাথে স্পষ্ট দেখা যায় না?', 'অ্যাস্টিগমাটিজম বা বিষমদৃষ্টি (নলাকার/সিলিন্ড্রিকাল লেন্সে সমাধান)', ['মায়োপিয়া (অবতল লেন্স)', 'হাইপারমেট্রোপিয়া (উত্তল লেন্স)', 'প্রেসবায়োপিয়া'], 'মায়োপিয়ায় অবতল, হাইপারমেট্রোপিয়ায় উত্তল, প্রেসবায়োপিয়ায় বাইফোকাল এবং অ্যাস্টিগমাটিজমে সিলিন্ড্রিকাল লেন্স ব্যবহার করা হয়।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮'],
    ['bio2_ch8_coordination', 'bohr_curve', 'অন্তঃকর্ণের পেরিলিম্ফ ও এন্ডোলিম্ফের মধ্যে কোন তরল অর্গান অব কর্টিকে সরাসরি প্লাবিত করে এবং K⁺-সমৃদ্ধ?', 'এন্ডোলিম্ফ (ককলিয়ার স্ক্যালা মিডিয়ায় থাকে)', ['পেরিলিম্ফ', 'সেরিব্রোস্পাইনাল ফ্লুইড', 'সাইনোভিয়াল ফ্লুইড'], 'স্ক্যালা ভেস্টিবুলি ও স্ক্যালা টিমপ্যানিতে পেরিলিম্ফ এবং মাঝের স্ক্যালা মিডিয়ায় (ককলিয়ার নালি) K⁺-সমৃদ্ধ এন্ডোলিম্ফ থাকে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮'],
    ['bio2_ch8_coordination', 'mitosis_cell', 'শুক্রাণুর অ্যাক্রোজোমটি শুক্রাণুজননের (স্পার্মিওজেনেসিস) সময় কোন কোষীয় অঙ্গাণু থেকে গঠিত হয়?', 'গলগি বডি', ['মাইটোকন্ড্রিয়া (মধ্যখণ্ড গঠন করে)', 'সেন্ট্রিওল (অক্ষীয় তন্তু গঠন করে)', 'লাইসোজোম'], 'শুক্রাণুর মস্তকের টুপি বা অ্যাক্রোজোম গলগি বডি থেকে তৈরি হয় এবং এতে ডিম্বাণুর ঝিল্লি ভেদকারী হায়ালুরোনিডেজ এনজাইম থাকে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯'],
    ['bio2_ch8_coordination', 'mitosis_cell', 'নারীর ডিম্বাণুর ওপর ঘেরা জোনা পেলুসিডা ভেদ করার পর দ্বিতীয় শুক্রাণুর প্রবেশ রোধকারী পরিবর্তনকে কী বলে?', 'কর্টিকাল বিক্রিয়া ও জোনা বিক্রিয়া (পলিস্পার্মি রোধ)', ['ক্যাপাসিটেশন', 'ইমপ্ল্যান্টেশন', 'ওভিউলেশন'], 'একটি শুক্রাণু ডিম্বাণুতে প্রবেশ করলে কর্টিকাল দানা জোনা পেলুসিডাকে শক্ত করে অন্য শুক্রাণুর প্রবেশ বন্ধ করে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'কোন ধরনের অনাক্রম্যতায় (Immunity) দেহ নিজেই অ্যান্টিবডি তৈরি করে ও দীর্ঘস্থায়ী মেমোরি সেল সৃষ্টি হয়?', 'সক্রিয় অর্জিত প্রতিরক্ষা (Active Immunity — রোগ সংক্রমণ বা টিকা)', ['নিষ্ক্রিয় বা প্যাসিভ প্রতিরক্ষা (কলস্ট্রাম / অ্যান্টিভেনম)', 'প্রথম স্তরের ভৌত প্রতিরক্ষা', 'সহজাত প্রদাহ'], 'টিকা (Vaccine) দেহে সক্রিয় কৃত্রিম অর্জিত প্রতিরক্ষা গড়ে তোলে; অন্যদিকে টিটেনাস অ্যান্টিটক্সিন বা মায়ের IgA হলো প্যাসিভ ইমিউনিটি।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'কোন বিজ্ঞানী "ইমিউনোলজির জনক" এবং প্রথম গুটিবসন্তের টিকা আবিষ্কার করেন?', 'এডওয়ার্ড জেনার (১৭৯৬)', ['লুই পাস্তুর', 'পল এরলিখ', 'কার্ল ল্যান্ডস্টেইনার'], 'জেনার গো-বসন্তের (Cowpox) জীবাণু থেকে নিরাপদ গুটিবসন্ত টিকা উদ্ভাবন করে আধুনিক ইমিউনোলজির ভিত্তি স্থাপন করেন।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'বিবর্তনের প্রমাণ হিসেবে মানুষের কানের পিনার পেশি, পুচ্ছাস্থি (কক্সিক্স) ও অ্যাপেন্ডিক্সকে কী ধরনের অঙ্গ বলা হয়?', 'নিষ্ক্রিয় বা লুপ্তপ্রায় অঙ্গ (Vestigial organs)', ['সমসংস্থ অঙ্গ', 'সমবৃত্তি অঙ্গ', 'সংযোগকারী জীব'], 'পূর্বপুরুষে কার্যকর থাকলেও বিবর্তনের ধারায় বর্তমানে গুরুত্বহীন হয়ে পড়া অঙ্গ হলো নিষ্ক্রিয় অঙ্গ (প্রায় ১০০টি মানুষের দেহে আছে)।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২'],
  ];

  zoologyDrills.forEach(([ch, vl, q, a, d, exp, ref]) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: q,
        correct: a,
        distractors: d,
        explanation: exp,
        reference: ref,
      })
    );
  });

  // 9. Odd-One-Out & Exception Zoology Bank (~60 MCQs)
  const bio2OddSets: Array<[string, string, string, string, [string, string, string], string, string]> = [
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'নিচের কোন প্রাণীটি অ্যাসিলোমেট নয় বরং প্রকৃত সিলোমেট?', 'কেঁচো (Annelida)', ['স্পঞ্জ (Porifera)', 'হাইড্রা (Cnidaria)', 'ফিতাকৃমি (Platyhelminthes)'], 'কেঁচো প্রকৃত সিলোমযুক্ত (ইউসিলোমেট) প্রাণী; স্পঞ্জ, হাইড্রা ও ফিতাকৃমি অ্যাসিলোমেট।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'নিচের কোনটি মৎস্য শ্রেণির অন্তর্ভুক্ত প্রকৃত মাছ নয়?', 'তারা মাছ (Asterias — একাইনোডার্মাটা) ও তিমি (স্তন্যপায়ী)', ['ইলিশ', 'রুই', 'হাঙর'], 'তারামাছ Echinodermata পর্বের অমেরুদণ্ডী এবং তিমি বা ডলফিন হলো স্তন্যপায়ী প্রাণী।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'নিচের কোনটি ঘাসফড়িংয়ের মুখোপাঙ্গের অংশ নয়?', 'নেমাটোসিস্ট (হাইড্রার কোষ)', ['ম্যান্ডিবল', 'ম্যাক্সিলা', 'হাইপোফ্যারিংক্স'], 'ঘাসফড়িংয়ের মুখোপাঙ্গে ল্যাব্রাম, ম্যান্ডিবল, ম্যাক্সিলা, ল্যাবিয়াম ও হাইপোফ্যারিংক্স থাকে; নেমাটোসিস্ট হাইড্রার বৈশিষ্ট্য।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'নিচের কোনটি প্রোটিন পরিপাককারী এনজাইম নয়?', 'অ্যামাইলেজ (শর্করা পরিপাককারী)', ['পেপসিন', 'ট্রিপসিন', 'কাইমোট্রিপসিন'], 'পেপসিন, ট্রিপসিন ও কাইমোট্রিপসিন প্রোটিওলাইটিক এনজাইম; অ্যামাইলেজ বা টায়ালিন স্টার্চ ভাঙে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩'],
    ['bio2_ch4_blood', 'heart_cardiac', 'নিচের কোনটি শ্বেত রক্তকণিকার গ্র্যানুলোসাইট (দানাদার) শ্রেণির নয়?', 'লিম্ফোসাইট ও মনোসাইট (অ্যাগ্র্যানুলোসাইট)', ['নিউট্রোফিল', 'ইওসিনোফিল', 'বেসোফিল'], 'নিউট্রোফিল, ইওসিনোফিল ও বেসোফিল দানাদার (গ্র্যানুলোসাইট); মনোসাইট ও লিম্ফোসাইট দানাবিহীন (অ্যাগ্র্যানুলোসাইট)।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch4_blood', 'heart_cardiac', 'নিচের কোন রক্তনালিটি অক্সিজেনযুক্ত রক্ত পরিবহন করে না?', 'পালমোনারি ধমনি ও আম্বিলিক্যাল ধমনি', ['অ্যাওর্টা', 'পালমোনারি শিরা', 'করোনারি ধমনি'], 'পালমোনারি ধমনি ডান নিলয় থেকে অশুদ্ধ রক্ত ফুসফুসে নেয়; পালমোনারি শিরা শুদ্ধ রক্ত আনে।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch5_respiration', 'bohr_curve', 'নিচের কোনটি স্বরযন্ত্রের (Larynx) জোড় তরুণাস্থি নয়?', 'এপিগ্লটিস, থাইরয়েড ও ক্রিকয়েড (বিজোড়)', ['অ্যারিটিনয়েড', 'কর্নিকুলেট', 'কিউনিফর্ম'], 'স্বরযন্ত্রের থাইরয়েড, ক্রিকয়েড ও এপিগ্লটিস বিজোড়; অ্যারিটিনয়েড, কর্নিকুলেট ও কিউনিফর্ম জোড় (৩ জোড়া)।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫'],
    ['bio2_ch6_excretion', 'nephron', 'মানুষের স্বাভাবিক মূত্রে নিচের কোন উপাদানটি থাকার কথা নয়?', 'গ্লুকোজ ও অ্যালবুমিন প্রোটিন', ['ইউরিয়া', 'ক্রিয়েটিনিন', 'ইউরিক অ্যাসিড'], 'সুস্থ মানুষের নেফ্রনে গ্লুকোজ শতভাগ পুনঃশোষিত হয় এবং অ্যালবুমিন পরিস্রাবণ পর্দা ভেদ করতে পারে না।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'নিচের কোনটি অক্ষীয় কঙ্কালের অস্থি নয় বরং উপাঙ্গীয় কঙ্কালের অস্থি?', 'স্ক্যাপুলা, ক্ল্যাভিকল ও ফিমার', ['স্টার্নাম', 'পর্শুকা', 'কশেরুকা'], 'স্টার্নাম, পর্শুকা ও কশেরুকা ৮০টি অক্ষীয় অস্থির অংশ; স্ক্যাপুলা, ক্ল্যাভিকল ও ফিমার উপাঙ্গীয় কঙ্কালের অংশ।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'নিচের কোন অস্থিটি হাতের (অগ্রপদ) অস্থি নয় বরং পায়ের (পশ্চাৎপদ) অস্থি?', 'ফিবুলা ও প্যাটেলা', ['রেডিয়াস', 'আলনা', 'হিউমেরাস'], 'হিউমেরাস, রেডিয়াস ও আলনা হাতের অস্থি; ফিমার, প্যাটেলা, টিবিয়া ও ফিবুলা পায়ের অস্থি।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch8_coordination', 'bohr_curve', 'নিচের কোনটি মিশ্র করোটিক স্নায়ু নয় বরং বিশুদ্ধ সংবেদী স্নায়ু?', 'অপটিক (II) ও অডিটরি (VIII)', ['ট্রাইজেমিনাল (V)', 'ফেসিয়াল (VII)', 'ভেগাস (X)'], 'সংবেদী স্নায়ুগুলো হলো I, II ও VIII; মিশ্রগুলো হলো V, VII, IX ও X।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮'],
    ['bio2_ch8_coordination', 'bohr_curve', 'নিচের কোনটি মধ্যকর্ণের অস্থি (Ossicle) নয়?', 'ককলিয়া (অন্তঃকর্ণের অংশ)', ['ম্যালিয়াস', 'ইনকাস', 'স্টেপিস'], 'ম্যালিয়াস, ইনকাস ও স্টেপিস মধ্যকর্ণের ৩টি অস্থি; ককলিয়া অন্তঃকর্ণের শ্রবণ অঙ্গ।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮'],
    ['bio2_ch8_coordination', 'heart_cardiac', 'নিচের কোনটি অগ্ন্যাশয়ের অন্তঃক্ষরা হরমোন নয় বরং পরিপাক গ্রন্থির হরমোন?', 'সিক্রেটিন ও গ্যাস্ট্রিন (পৌষ্টিক নালির)', ['ইনসুলিন', 'গ্লুকাগন', 'সোমাটোস্ট্যাটিন'], 'ইনসুলিন, গ্লুকাগন ও সোমাটোস্ট্যাটিন অগ্ন্যাশয়ের আইলেটস থেকে আসে; গ্যাস্ট্রিন ও সিক্রেটিন GI ট্র্যাক্ট থেকে ক্ষরিত হয়।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ ও ৮'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'নিচের কোনটি সেক্স-লিঙ্কড (X-বাহিত) রোগ নয় বরং অটোজোমাল জিনঘটিত রোগ?', 'থ্যালাসেমিয়া ও সিকল সেল অ্যানিমিয়া', ['হিমোফিলিয়া', 'লাল-সবুজ বর্ণান্ধতা', 'ডুশেন মাসকুলার ডিস্ট্রফি'], 'থ্যালাসেমিয়া ১১ ও ১৬ নং অটোজোমাল জিনগত রোগ; হিমোফিলিয়া ও বর্ণান্ধতা X-ক্রোমোজোম বাহিত।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'নিচের কোনটি সহজাত প্রতিরক্ষার অংশ নয় বরং অর্জিত সুনির্দিষ্ট প্রতিরক্ষা?', 'মেমোরি B-লিম্ফোসাইট কর্তৃক অ্যান্টিবডি তৈরি', ['ত্বকের কেরাটিন স্তর', 'পাকস্থলির HCl', 'ম্যাক্রোফেজ ও জ্বর'], 'ত্বক, HCl, ম্যাক্রোফেজ ও জ্বর অ-নির্দিষ্ট সহজাত প্রতিরক্ষা (১ম ও ২য় স্তর); B ও T কোষ অর্জিত প্রতিরক্ষা (৩য় স্তর)।', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০'],
  ];

  bio2OddSets.forEach(([ch, vl, q, a, d, exp, ref]) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: q,
        correct: a,
        distractors: d,
        explanation: exp,
        reference: ref,
      })
    );
  });

  // 10. Zoology Glossary & Key Terms Bidirectional Pairs (~120 MCQs)
  const zooTerms: Array<[string, string, string, string, string]> = [
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'নটোকর্ড', 'কর্ডাটা পর্বের প্রাণীর পৃষ্ঠদেশ বরাবর বিস্তৃত নমনীয় দণ্ডাকার অস্থিস্থাপক গঠন যা মেরুদণ্ডীতে ভার্টিব্রাল কলামে রূপান্তরিত হয়', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch1_taxonomy', 'mitosis_cell', 'ট্যাগমাটাইজেশন', 'আর্থ্রোপোডা পর্বের প্রাণীতে দেহখণ্ডকগুলো একত্রিত হয়ে মস্তক, বক্ষ ও উদরের মতো বিশেষ কার্যকর অঞ্চল (Tagmata) গঠন', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'নিডোসিল (Cnidocil)', 'হাইড্রার নিডোসাইটের মুক্ত প্রান্তে অবস্থিত সূক্ষ্ম সংবেদী ট্রিগার কাঁটা যা স্পর্শ পেলে নেমাটোসিস্ট নিক্ষেপ করে', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'mitosis_cell', 'হিমোলিম্ফ (Hemolymph)', 'ঘাসফড়িংয়ের মুক্ত সংবহনতন্ত্রে প্রবাহিত হিমোগ্লোবিনবিহীন বর্ণহীন রক্তরস ও হিমোসাইট কণিকা', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch2_animal_id', 'heart_cardiac', 'হোমোসার্কাল পুচ্ছ পাখনা', 'রুইমাছের লেজের সমান দুই খণ্ডবিশিষ্ট পুচ্ছ পাখনা যাতে মেরুদণ্ডের শেষাংশ ভেতরে প্রসারিত থাকে না', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'কাইম (Chyme)', 'পাকস্থলিতে যান্ত্রিক মন্থন ও গ্যাস্ট্রিক রসের HCl-এনজাইমের ক্রিয়ায় সৃষ্ট অর্ধতরল অম্লীয় মণ্ড', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩'],
    ['bio2_ch3_digestion', 'heart_cardiac', 'গ্লাইকোজেনেসিস ও গ্লাইকোজেনোলাইসিস', 'যকৃৎ ও পেশিতে অতিরিক্ত গ্লুকোজ থেকে গ্লাইকোজেন সঞ্চয় (ইনসুলিন) এবং প্রয়োজনে গ্লাইকোজেন ভেঙে গ্লুকোজ মুক্তি (গ্লুকাগন)', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩'],
    ['bio2_ch4_blood', 'heart_cardiac', 'ডায়াপেডেসিস', 'অণুবীক্ষণিক শ্বেত রক্তকণিকার (বিশেষত নিউট্রোফিল) অ্যামিবয়েড চলনে কৈশিকনালির প্রাচীর ভেদ করে আক্রান্ত টিস্যুতে প্রবেশ', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch4_blood', 'heart_cardiac', 'এরিথ্রোব্লাস্টোসিস ফিটালিস', 'Rh⁻ মা ও Rh⁺ পিতার দ্বিতীয় Rh⁺ গর্ভস্থ শিশুর RBC-কে মায়ের Anti-D অ্যান্টিবডি ধ্বংস করায় সৃষ্ট মারাত্মক রক্তশূন্যতা ও জন্ডিস', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch4_blood', 'heart_cardiac', 'বাইপাস সার্জারি (CABG)', 'পায়ের স্যাফেনাস শিরা বা বুকের ধমনি ব্যবহার করে অবরুদ্ধ করোনারি ধমনির বিকল্প রক্ত সরবরাহ পথ তৈরি করা', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪'],
    ['bio2_ch5_respiration', 'bohr_curve', 'অক্সিজেন-হিমোগ্লোবিন বিয়োজন লেখ', 'রক্তে অক্সিজেনের আংশিক চাপের (pO₂) বিপরীতে হিমোগ্লোবিনের শতকরা O₂ সম্পৃক্তির সিগময়েড বক্ররেখা', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫'],
    ['bio2_ch5_respiration', 'bohr_curve', 'সাইটোক্সিক ও অ্যানিমিক হাইপোক্সিয়া', 'সায়ানাইড বিষক্রিয়ায় কোষ অক্সিজেন ব্যবহারে অক্ষম (হিস্টোটক্সিক) বনাম হিমোগ্লোবিন বা RBC কমে অক্সিজেন বহন হ্রাস (অ্যানিমিক)', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫'],
    ['bio2_ch6_excretion', 'nephron', 'জাক্সটাগ্লোমেরুলার অ্যাপারেটাস (JGA)', 'অ্যাফারেন্ট আর্টারিওল ও DCT-এর ম্যাকুলা ডেন্সার সংযোগস্থলে অবস্থিত রেনিন ক্ষরণকারী চাপ-সংবেদী গঠন', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬'],
    ['bio2_ch6_excretion', 'nephron', 'মিশ্চুরিশন (Micturition)', 'মূত্রথলি পূর্ণ হলে স্ট্রেচ রিসেপ্টরের মাধ্যমে স্নায়বিক প্রতিবর্তী ক্রিয়ায় মূত্রনালি দিয়ে মূত্রত্যাগের প্রক্রিয়া', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'হ্যাভারসিয়ান তন্ত্র (Osteon)', 'স্তন্যপায়ী নিরেট অস্থির গাঠনিক একক যেখানে কেন্দ্রীয় নালিকে ঘিরে কনসেন্ট্রিক ল্যামেলা ও অস্টিওসাইট বিন্যস্ত থাকে', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch7_locomotion', 'heart_cardiac', 'অক্সিজেন ঋণ (Oxygen Debt)', 'অতিরিক্ত দৌড় বা ব্যায়ামে পেশিতে সৃষ্ট ল্যাকটিক অ্যাসিডকে যকৃতে পুনরায় গ্লাইকোজেনে রূপান্তরে প্রয়োজনীয় অতিরিক্ত O₂', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭'],
    ['bio2_ch8_coordination', 'bohr_curve', 'প্রতিবর্তী ক্রিয়া (Reflex Action)', 'মস্তিষ্কের সচেতন নিয়ন্ত্রণ ছাড়াই সুষুম্নাকাণ্ডের মাধ্যমে তাৎক্ষণিক অনৈচ্ছিক ও দ্রুত সাড়া প্রদানের স্বয়ংক্রিয় পথ', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮'],
    ['bio2_ch8_coordination', 'bohr_curve', 'র‍্যানভিয়ারের পর্ব (Node of Ranvier)', 'অ্যাক্সনের মায়েলিন আবরণীর মধ্যবর্তী ক্ষুদ্র অনাবৃত ফাঁকা স্থান যেখানে আয়ন চ্যানেল ঘনত্ব বেশি থাকায় সল্টেটরি চলন ঘটে', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮'],
    ['bio2_ch8_coordination', 'mitosis_cell', 'টেস্ট-টিউব বেবি (IVF)', 'দেহের বাইরে ল্যাবরেটরিতে ডিম্বাণু ও শুক্রাণুর নিষেক ঘটিয়ে সৃষ্ট ব্লাস্টোসিস্টকে মায়ের জরায়ুতে প্রতিস্থাপনের প্রযুক্তি', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'এপিটোপ ও প্যারাটোপ', 'অ্যান্টিজেনের যে অংশের সাথে অ্যান্টিবডি যুক্ত হয় (এপিটোপ) এবং অ্যান্টিবডির পরিবর্তনশীল প্রান্তীয় বন্ধন অঞ্চল (প্যারাটোপ)', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'প্লাইওট্রপি (Pleiotropy)', 'একটি মাত্র জিন যখন জীবদেহে একাধিক আপাত-সম্পর্কহীন ফিনোটাইপিক বৈশিষ্ট্য নিয়ন্ত্রণ করে (যেমন সিকল সেল অ্যানিমিয়া)', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'পলিজেনিক ইনহেরিট্যান্স', 'একাধিক নন-অ্যালিলিক জিন মিলে যখন কোনো একটি অবিচ্ছিন্ন বৈশিষ্ট্য (যেমন মানুষের গায়ের বর্ণ ও উচ্চতা) নিয়ন্ত্রণ করে', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১'],
    ['bio2_ch10_immune_genetics', 'mitosis_cell', 'আর্কিওপ্টেরিক্স (Archaeopteryx)', 'চঞ্চুতে দাঁত-লম্বা লেজ (সরীসৃপ) এবং ডানা-পালক (পাখি) উভয় বৈশিষ্ট্য বহনকারী মিসিং লিংক জীবাশ্ম', 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২'],
  ];

  zooTerms.forEach(([ch, vl, term, def, ref], i) => {
    const others = zooTerms.filter((t) => t[2] !== term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `প্রাণিবিজ্ঞানে "${def}" — এটি নিচের কোন পরিভাষাটির সঠিক সংজ্ঞা?`,
        correct: term,
        distractors: [
          others[(i + 1) % others.length][2],
          others[(i + 6) % others.length][2],
          others[(i + 13) % others.length][2],
        ],
        explanation: `${term}: ${def}।`,
        reference: ref,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ch,
        visualLessonId: vl,
        hscLevel: '12',
        difficulty: 'dental',
        question: `প্রাণিবিজ্ঞানে "${term}" বলতে কী বোঝায়?`,
        correct: def,
        distractors: [
          others[(i + 2) % others.length][3],
          others[(i + 7) % others.length][3],
          others[(i + 14) % others.length][3],
        ],
        explanation: `${term}-এর সংজ্ঞা হলো: ${def}।`,
        reference: ref,
      })
    );
  });

  // 11. Additional Zoology Comparative & Scientist Discoveries Matrix (~80+ MCQs)
  const zoologists: Array<{ ch: string; vl: string; person: string; feat: string; ref: string }> = [
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', person: 'অ্যারিস্টটল', feat: 'প্রাণিবিজ্ঞানের জনক ও লাল রক্তের ভিত্তিতে এনায়মা-অ্যানায়মা বিভাজন করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', person: 'অ্যাব্রাহাম ট্রেম্বলে (১৭৪৪)', feat: 'হাইড্রার পুনরুৎপত্তি (Regeneration) ক্ষমতা প্রথম আবিষ্কার করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', person: 'উইলিয়াম হার্ভে (১৬২৮)', feat: 'মানবদেহে বদ্ধ রক্ত সংবহন ও হৃৎপিণ্ডের পাম্পিং ক্রিয়া আবিষ্কার করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', person: 'মার্সেলো মালপিজি (১৬৬১)', feat: 'ধমনি ও শিরার সংযোগস্থলে কৈশিকনালি (Capillaries) আবিষ্কার করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', person: 'ক্রিশ্চিয়ান বোর (১৯০৪)', feat: 'উচ্চ pCO₂ ও নিম্ন pH-এ হিমোগ্লোবিন থেকে O₂ বিয়োজনের "বোর প্রভাব" আবিষ্কার করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', person: 'উইলিয়াম বোম্যান (১৮৪২)', feat: 'নেফ্রনের বোম্যানস ক্যাপসুল ও আল্ট্রাফিল্ট্রেশন তত্ত্ব ব্যাখ্যা করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', person: 'আইভ্যান প্যাভলভ', feat: 'কুকুরের ওপর পরীক্ষার মাধ্যমে সাপেক্ষ প্রতিবর্তী ক্রিয়া (Conditioned reflex) প্রতিষ্ঠা করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', person: 'জ্যাঁ ব্যাপ্টিস্ট ল্যামার্ক (১৮০৯)', feat: 'Philosophie Zoologique গ্রন্থে ব্যবহার-অব্যবহার ও অর্জিত বৈশিষ্ট্যের উত্তরাধিকার সূত্র দেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', person: 'চার্লস ডারউইন (১৮৫৯)', feat: 'On the Origin of Species গ্রন্থে প্রাকৃতিক নির্বাচন মতবাদ প্রকাশ করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', person: 'হুগো দ্য ভ্রিস (১৯০১)', feat: 'Oenothera lamarckiana উদ্ভিদে মিউটেশন তত্ত্ব প্রদান করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', person: 'রবার্ট এডওয়ার্ডস ও প্যাট্রিক স্টেপ্টো (১৯৭৮)', feat: 'বিশ্বের প্রথম টেস্ট-টিউব বেবি লুইস ব্রাউন জন্মদানে IVF সফল করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', person: 'আগস্ট ভাইসম্যান', feat: 'ইঁদুরের লেজ কেটে পরীক্ষা করে জার্মপ্লাজম মতবাদ প্রমাণ ও ল্যামার্কবাদ খণ্ডন করেন', ref: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১২' },
  ];

  zoologists.forEach((z, i) => {
    const others = zoologists.filter((x) => x.person !== z.person);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: z.ch,
        visualLessonId: z.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `প্রাণিবিজ্ঞানে কে "${z.feat}"?`,
        correct: z.person,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.person),
        explanation: `${z.person} ${z.feat}।`,
        reference: z.ref,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: z.ch,
        visualLessonId: z.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `বিজ্ঞানী ${z.person} নিচের কোন ঐতিহাসিক কাজের সাথে সম্পর্কিত?`,
        correct: z.feat,
        distractors: others.slice((i + 4) % 7, ((i + 4) % 7) + 4).map((x) => x.feat),
        explanation: `${z.person}-এর অবদান: ${z.feat}।`,
        reference: z.ref,
      })
    );
  });

  // 12. Cardiac Cycle Phases, Embryonic Germ Layers & Joint Classification Matrix (~50 MCQs)
  const germLayers = [
    { layer: 'এক্টোডার্ম (Ectoderm)', organs: 'মস্তিষ্ক, সুষুম্নাকাণ্ড, স্নায়ুতন্ত্র, ত্বকের এপিডার্মিস, চোখের লেন্স ও দাঁতের এনামেল' },
    { layer: 'মেসোডার্ম (Mesoderm)', organs: 'হৃৎপিণ্ড, রক্ত-রক্তনালি, কঙ্কাল-অস্থি, পেশি, বৃক্ক ও ডার্মিস' },
    { layer: 'এন্ডোডার্ম (Endoderm)', organs: 'পৌষ্টিকনালির আবরণী, যকৃৎ, অগ্ন্যাশয়, ফুসফুস, থাইরয়েড ও মূত্রথলির অন্তঃআবরণী' },
  ];
  germLayers.forEach((gl) => {
    const others = germLayers.filter((x) => x.layer !== gl.layer);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `মানব ভ্রূণের কোন প্রাথমিক ভ্রূণস্তর থেকে "${gl.organs}" গঠিত হয়?`,
        correct: gl.layer,
        distractors: [...others.map((x) => x.layer), 'ট্রোফোব্লাস্ট কোষস্তর'],
        explanation: `${gl.layer} ভ্রূণস্তর থেকে ${gl.organs} উৎপন্ন হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · অর্গানোজেনেসিস',
      })
    );
  });

  const joints = [
    { type: 'বল ও কোটর সন্ধি (Ball & Socket)', move: 'সর্বদিকে (৩৬০°) অবাধ সঞ্চালন ক্ষমতা', ex: 'কাঁধের (স্ক্যাপুলা-হিউমেরাস) ও নিতম্বের (অ্যাসিটাবুলাম-ফিমার) সন্ধি' },
    { type: 'কবজা সন্ধি (Hinge joint)', move: 'দরজার কবজার মতো কেবল এক তলে (১৮০°) ভাঁজ ও সোজা হওয়া', ex: 'কনুই, হাঁটু ও আঙুলের ফ্যালান্জেস সন্ধি' },
    { type: 'পিভট বা কীলক সন্ধি (Pivot joint)', move: 'একটি অক্ষের চারপাশে আবর্তন বা ঘূর্ণন চলন', ex: 'গলার অ্যাটলাস ও অ্যাক্সিস কশেরুকার মধ্যকার সন্ধি' },
    { type: 'স্যাডল সন্ধি (Saddle joint)', move: 'উভয় অক্ষে বিপরীতমুখী নড়াচড়া', ex: 'হাতের বৃদ্ধাঙ্গুলের কার্পো-মেটাকার্পাল সন্ধি' },
    { type: 'গ্লাইডিং বা সমতল সন্ধি (Gliding)', move: 'একটি অস্থি আরেকটির ওপর পিছলে যাওয়া', ex: 'কব্জির কার্পাল ও গোড়ালির টার্সাল অস্থিসন্ধি' },
    { type: 'নিশ্চল বা তন্তুময় সন্ধি (Sutures)', move: 'কোনো নড়াচড়া ঘটে না (অস্থাবর)', ex: 'করোটির অস্থিগুলোর মধ্যকার সূচার ও চোয়ালে দাঁতের গোড়া' },
  ];
  joints.forEach((j, i) => {
    const others = joints.filter((x) => x.type !== j.type);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${j.ex}" — এটি কোন ধরনের অস্থিসন্ধির আদর্শ উদাহরণ?`,
        correct: j.type,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.type),
        explanation: `${j.type}-তে ${j.move} দেখা যায়; উদাহরণ: ${j.ex}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · অস্থিসন্ধি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `মানবদেহের কোন স্থানে "${j.type}" অবস্থান করে যেখানে "${j.move}" ঘটে?`,
        correct: j.ex,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.ex),
        explanation: `${j.ex} হলো ${j.type}-এর উদাহরণ (${j.move})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · সচল অস্থিসন্ধি',
      })
    );
  });

  // 13. Extra Quantitative & Physiological Scenarios (Cardiac Cycle, Respiratory Rate, Eye/Ear, Mendel Counts) (~120 MCQs)
  const hrValues = [60, 65, 70, 72, 75, 80, 90, 100];
  hrValues.forEach((hr) => {
    const cycleSec = (60 / hr).toFixed(2).replace(/\.?0+$/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একজন মানুষের হৃৎস্পন্দনের হার প্রতি মিনিটে ${toBnDigits(hr)} বার হলে প্রতিটি কার্ডিয়াক চক্রের (Cardiac cycle) স্থায়িত্বকাল কত সেকেন্ড?`,
        correct: `${toBnDigits(cycleSec)} সেকেন্ড`,
        distractors: [
          `${toBnDigits((Number(cycleSec) * 1.5).toFixed(2).replace(/\.?0+$/, ''))} সেকেন্ড`,
          `${toBnDigits((Number(cycleSec) * 0.5).toFixed(2).replace(/\.?0+$/, ''))} সেকেন্ড`,
          `${toBnDigits((Number(cycleSec) + 0.4).toFixed(2).replace(/\.?0+$/, ''))} সেকেন্ড`,
          `${toBnDigits((Number(cycleSec) + 0.25).toFixed(2).replace(/\.?0+$/, ''))} সেকেন্ড`,
          `${toBnDigits((Number(cycleSec) * 2).toFixed(2).replace(/\.?0+$/, ''))} সেকেন্ড`,
        ],
        explanation: `কার্ডিয়াক চক্রের সময় = ৬০ সেকেন্ড / হৃৎস্পন্দন হার = ৬০ / ${toBnDigits(hr)} = ${toBnDigits(cycleSec)} সেকেন্ড।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · কার্ডিয়াক চক্র',
      })
    );
  });

  const f2Totals = [160, 320, 480, 640, 800, 960, 1280, 1600];
  f2Totals.forEach((tot) => {
    const domBoth = Math.round((tot * 9) / 16);
    const recBoth = Math.round(tot / 16);
    const monoRec = Math.round(tot / 4);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `মেন্ডেলের ডাইহাইব্রিড ক্রসে (৯:৩:৩:১) F₂ জনুতে মোট ${toBnDigits(tot)}টি অপত্য জন্মালে তার মধ্যে কতটি উভয় প্রকট বৈশিষ্ট্যধারী (৯/১৬ অংশ) হবে?`,
        correct: `${toBnDigits(domBoth)}টি`,
        distractors: [`${toBnDigits(recBoth)}টি`, `${toBnDigits(monoRec)}টি`, `${toBnDigits(Math.round(tot / 2))}টি`],
        explanation: `৯:৩:৩:১ অনুপাতে উভয় প্রকট বৈশিষ্ট্যধারী অংশ হলো ৯/১৬। তাই ${toBnDigits(tot)} × (৯/১৬) = ${toBnDigits(domBoth)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ডাইহাইব্রিড ক্রস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'dental',
        question: `মেন্ডেলের দ্বিতীয় সূত্রের F₂ জনুতে মোট ${toBnDigits(tot)}টি উদ্ভিদ জন্মালে কতটি উভয় প্রচ্ছন্ন বৈশিষ্ট্যযুক্ত (১/১৬ অংশ) হবে?`,
        correct: `${toBnDigits(recBoth)}টি`,
        distractors: [`${toBnDigits(domBoth)}টি`, `${toBnDigits(monoRec)}টি`, `${toBnDigits(recBoth * 3)}টি`],
        explanation: `৯:৩:৩:১ অনুপাতে উভয় প্রচ্ছন্ন (যেমন সবুজ-কুঞ্চিত) অংশ ১/১৬। তাই ${toBnDigits(tot)} / ১৬ = ${toBnDigits(recBoth)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ডাইহাইব্রিড ক্রস',
      })
    );
  });

  return list;
}
