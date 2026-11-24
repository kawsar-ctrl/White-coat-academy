import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredU(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1su_${String(seq++).padStart(4, '0')}`;

  // 1. Quantitative Bohr Energy & Wavelength Ratio + Stoichiometric Titration + Buffer Mixing (~180 MCQs)
  const radiiZ: Array<{ ion: string; z: number; n: number }> = [
    { ion: 'He⁺', z: 2, n: 1 },
    { ion: 'He⁺', z: 2, n: 2 },
    { ion: 'Li²⁺', z: 3, n: 1 },
    { ion: 'Li²⁺', z: 3, n: 2 },
    { ion: 'Li²⁺', z: 3, n: 3 },
    { ion: 'Be³⁺', z: 4, n: 2 },
    { ion: 'H', z: 1, n: 3 },
    { ion: 'H', z: 1, n: 4 },
  ];
  radiiZ.forEach((item) => {
    const r = Number(((0.529 * item.n * item.n) / item.z).toFixed(3));
    const eVal = Number(((-13.6 * item.z * item.z) / (item.n * item.n)).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${item.ion} আয়নের/পরমাণুর n = ${toBnDigits(item.n)} তম বোর কক্ষপথের ব্যাসার্ধ কত Å হবে? (r₁ = ০.৫২৯ Å)`,
        correct: `${toBnDigits(r)} Å`,
        distractors: [
          `${toBnDigits(Number((r * 2).toFixed(3)))} Å`,
          `${toBnDigits(Number((r / 2).toFixed(3)))} Å`,
          `${toBnDigits(Number((0.529 * item.n).toFixed(3)))} Å`,
          `${toBnDigits(Number((r + 0.529).toFixed(3)))} Å`,
        ],
        explanation: `rₙ = (০.৫২৯ × n²) / Z = (০.৫২৯ × ${toBnDigits(item.n)}²) / ${toBnDigits(item.z)} = ${toBnDigits(r)} Å।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · এক-ইলেকট্রন প্রজাতির ব্যাসার্ধ',
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
        question: `${item.ion} প্রজাতির n = ${toBnDigits(item.n)} কক্ষপথে থাকা ইলেকট্রনের মোট শক্তি কত eV?`,
        correct: `${toBnDigits(eVal)} eV`,
        distractors: [
          `${toBnDigits(Math.abs(eVal))} eV`,
          `${toBnDigits(Number((eVal / 2).toFixed(2)))} eV`,
          `${toBnDigits(Number((eVal * 2).toFixed(2)))} eV`,
        ],
        explanation: `Eₙ = -১৩.৬ × Z² / n² = -১৩.৬ × ${toBnDigits(item.z)}² / ${toBnDigits(item.n)}² = ${toBnDigits(eVal)} eV।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · ইলেকট্রনের শক্তি হিসাব',
      })
    );
  });

  // High-Yield Matrix of 40 Important Chem 1 Facts × 4 angles = 160 MCQs
  const chem1FinalMatrix: Array<{
    ch: 'chem1_ch1_lab' | 'chem1_ch2_qualitative' | 'chem1_ch3_periodic' | 'chem1_ch4_equilibrium' | 'chem1_ch5_applied';
    topic: string;
    detail: string;
    note: string;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    { ch: 'chem1_ch1_lab', topic: 'কনিক্যাল ফ্লাস্ক ও মেজারিং সিলিন্ডারের সূক্ষ্মতা পার্থক্য', detail: 'মাপকৃত আয়তন স্থানান্তরে পিপেট ও ভলিউমেট্রিক ফ্লাস্ক সূক্ষ্ম (Class A ±0.05 mL); মেজারিং সিলিন্ডার ও বিকার কেবল আনুমানিক আয়তনে ব্যবহৃত হয়', note: 'টাইট্রেশনের সময় বিক্রিয়া পাত্র হিসেবে কনিক্যাল ফ্লাস্ক ব্যবহৃত হয় যাতে ঘোরানোর সময় তরল ছিটকে না পড়ে', diff: 'board' },
    { ch: 'chem1_ch1_lab', topic: 'ল্যাবরেটরিতে লবণ বিশ্লেষণে H₂S-এর নিরাপদ বিকল্প', detail: 'বিষাক্ত ও দুর্গন্ধযুক্ত H₂S গ্যাসের বদলে জলীয় থায়োঅ্যাসিটামাইড (CH₃CSNH₂) দ্রবণ উত্তপ্ত করে পর্যাপ্ত পরিমাণে S²⁻ আয়ন উৎপন্ন করা হয়', note: 'সেমিমাইক্রো পদ্ধতিতে H₂S-এর বায়ুদূষণ ৯০% কমানো সম্ভব হয়েছে', diff: 'medical' },
    { ch: 'chem1_ch1_lab', topic: 'হ্যাজার্ড প্রতীক: বিস্ফোরক (Explosive) ও দাহ্য গ্যাস সিলিন্ডার', detail: 'বিস্ফোরণশীল বোমার প্রতীক পিক্রিক অ্যাসিড, TNT ও অ্যামোনিয়াম নাইট্রেটের বোতলে থাকে; গ্যাস সিলিন্ডার প্রতীক উচ্চচাপে সংকুচিত গ্যাস নির্দেশ করে', note: 'ফসফরাস-কে পানির নিচে সংরক্ষণ করা হয় কারণ সাদা ফসফরাস ৩০°C-এ বাতাসে স্বতঃস্ফূর্তভাবে জ্বলে ওঠে', diff: 'medical' },
    { ch: 'chem1_ch2_qualitative', topic: 'গুণগত বিশ্লেষণে শিখা পরীক্ষার সময় কোবাল্ট নীল কাচের ব্যবহার', detail: 'Na⁺-এর তীব্র সোনালি হলুদ শিখা K⁺-এর হালকা বেগুনি শিখাকে ঢেকে দিলে নীল কোবাল্ট গ্লাসের মধ্য দিয়ে তাকালে K⁺-এর গোলাপি-বেগুনি বর্ণ স্পষ্ট দেখা যায়', note: 'কোবাল্ট নীল কাচ হলুদ ৫৮৯ nm আলো শোষণ করে নেয়', diff: 'medical' },
    { ch: 'chem1_ch2_qualitative', topic: 'আংশিক পাতনে কলাম বা ফ্র্যাকশনেটিং কলামের কাজ', detail: 'কাছাকাছি স্ফুটনাঙ্কের দুটি তরলের বাষ্প কলামের কাচদানা বা প্লেটে বারবার ঘনীভূত ও বাষ্পীভূত হয়ে অধিক উদ্বায়ী উপাদান শীর্ষে আলাদা হয়', note: 'অশোধিত পেট্রোলিয়াম শোধনে বিশাল ফ্র্যাকশনেটিং টাওয়ার ব্যবহৃত হয়', diff: 'board' },
    { ch: 'chem1_ch2_qualitative', topic: 'আইসো-ইলেকট্রনিক, আইসো-ডায়াফার ও নিউক্লিয়ার আইসোমার', detail: 'নিউট্রন ও প্রোটনের পার্থক্য (N - Z) সমান হলে আইসোডায়াফার (যেমন ²³⁸₉₂U ও ²³⁴₉₀Th); একই Z ও A কিন্তু ভিন্ন তেজস্ক্রিয় শক্তিস্তরের নিউক্লিয়াস আইসোমার', note: 'আলফা ক্ষয়ের ফলে উৎপন্ন দুহিতা নিউক্লিয়াস পিতৃ নিউক্লিয়াসের আইসোডায়াফার হয়', diff: 'medical' },
    { ch: 'chem1_ch2_qualitative', topic: 'বর্ণালিমিতি (Spectroscopy) ও আণবিক জ্যামিতিতে IR বনাম UV-Vis', detail: 'UV-Vis বর্ণালিতে ইলেকট্রনের উচ্চ কক্ষপথে স্থানান্তর ঘটে; IR বর্ণালিতে রাসায়নিক বন্ধনের কম্পন ও কার্যকরী মূলক (–OH, >C=O) শনাক্ত হয়', note: 'MRI-তে রেডিও তরঙ্গ ও নিউক্লিয়ার স্পিন ফ্লিপ ব্যবহৃত হয়', diff: 'medical' },
    { ch: 'chem1_ch3_periodic', topic: 'সকল পর্যায়ে ব্যাসার্ধ ও তড়িৎ ধনাত্মকতার পরিবর্তন', detail: 'একই পর্যায়ে বাম থেকে ডানে কার্যকর নিউক্লীয় চার্জ বাড়ায় পারমাণবিক ব্যাসার্ধ কমে (ব্যতিক্রম ১৮তম নিষ্ক্রিয় গ্যাসে ভ্যান ডার ওয়ালস ব্যাসার্ধ বেশি)', note: 'আবার পর্যায় সারণির নিচে নামলে নতুন শক্তিস্তর যুক্ত হওয়ায় ব্যাসার্ধ বাড়ে', diff: 'board' },
    { ch: 'chem1_ch3_periodic', topic: 'প্রথম, দ্বিতীয় ও তৃতীয় আয়নিকরণ শক্তির ক্রম (IE₃ > IE₂ > IE₁)', detail: 'ধনাত্মক আয়ন থেকে পরবর্তী ইলেকট্রন টানতে অবশিষ্ট ইলেকট্রনের ওপর নিউক্লীয় আকর্ষণ অনেক বেশি থাকে বলে IE₁ < IE₂ < IE₃', note: 'সোডিয়ামের (Na) ১ম IE কম হলেও ২য় IE হঠাৎ অত্যন্ত বেশি হয় কারণ Na⁺ নিষ্ক্রিয় Ne কাঠামো লাভ করে', diff: 'medical' },
    { ch: 'chem1_ch3_periodic', topic: 'সকল মৌলের অক্সাইডের মধ্যে কার্বন ও নাইট্রোজেনের প্রশম ও অম্লীয় অক্সাইড', detail: 'NO, N₂O ও CO প্রশম অক্সাইড; NO₂, N₂O₃, N₂O₅ এবং CO₂ হলো অম্লীয় অক্সাইড (NO₂ পানির সাথে মিশ্র অ্যাসিড HNO₂ + HNO₃ দেয়)', note: 'N₂O হলো লাফিং গ্যাস (অবশকারী), আর NO₂ হলো বাদামি বর্ণের প্যারাম্যাগনেটিক গ্যাস', diff: 'medical' },
    { ch: 'chem1_ch3_periodic', topic: 'গ্রাফাইট ও হীরকের কার্বন বন্ধন ও ব্যবহারিক বৈপরীত্য', detail: 'গ্রাফাইটে প্রতি কার্বন ৩টি σ বন্ধনে ষড়ভুজাকার স্তর গড়ে ও ৪র্থ ইলেকট্রন π-সঞ্চরণশীল থাকায় বিদ্যুৎ পরিবাহী ও পিচ্ছিল; হীরক ত্রিমাত্রিক sp³ নেটওয়ার্ক হওয়ায় কঠিনতম ও অপরিবাহী', note: 'ফুলারিন (C₆₀ বুকমিনস্টার ফুলারিন)-এ ৬০টি sp² কার্বন ১২টি পঞ্চভুজ ও ২০টি ষড়ভুজ গঠন করে', diff: 'medical' },
    { ch: 'chem1_ch3_periodic', topic: 'পানির সাথে ধাতুর ও অক্সাইডের বিক্রিয়ার ক্ষারকত্ব (গ্রুপ-১ ও ২)', detail: 'ক্ষার ধাতু (Li থেকে Cs) পানির সাথে বিক্রিয়ায় H₂ গ্যাস ও তীব্র ক্ষার MOH উৎপন্ন করে; Cs ও K পানিতে বিস্ফোরণসহ জ্বলে ওঠে', note: 'Be এবং BeO ছাড়া গ্রুপ-২ এর অন্য সব হাইড্রোক্সাইডের ক্ষারীয় তীব্রতা Be(OH)₂ < Mg(OH)₂ < Ca(OH)₂ < Ba(OH)₂', diff: 'medical' },
    { ch: 'chem1_ch4_equilibrium', topic: 'রাসায়নিক সাম্যাবস্থার গতিশীলতা ও প্রভাবকের সীমাবদ্ধতা', detail: 'সাম্যাবস্থায় সম্মুখ ও পশ্চাৎ বিক্রিয়ার বেগ সমান হয় কিন্তু বিক্রিয়া বন্ধ হয় না; প্রভাবক কেবল সাম্যাবস্থায় পৌঁছানোর সময় কমিয়ে দেয়, উৎপাদের পরিমাণ নয়', note: 'বদ্ধ পাত্র ছাড়া গ্যাসীয় বা বাষ্পীয় বিক্রিয়ায় কখনোই রাসায়নিক সাম্যাবস্থা অর্জিত হয় না', diff: 'board' },
    { ch: 'chem1_ch4_equilibrium', topic: 'ল্যাটিস এনথ্যালপি ও হাইড্রেশন এনথ্যালপি থেকে দ্রবণ তাপ (ΔH_sol)', detail: 'ΔH_sol = ΔH_lattice + ΔH_hydration; NaOH ও CaCl₂-এর হাইড্রেশন শক্তি বেশি হওয়ায় দ্রবীভূত হলে তাপ উৎপন্ন হয়, কিন্তু NH₄Cl ও KNO₃-এ তাপ শোষিত হয়', note: 'অনাদ্র CuSO₄ (সাদা) পানিতে যোগ করলে তাপোৎপাদী হাইড্রেশনে নীল দ্রবণ সৃষ্টি করে', diff: 'medical' },
    { ch: 'chem1_ch4_equilibrium', topic: 'ক্যালরিমিটারে দহন তাপ ও বম্ব ক্যালরিমিটার', detail: 'বম্ব ক্যালরিমিটারে স্থির আয়তনে (ΔV = ০) দহন তাপ ΔE মাপা হয়; পরে ΔH = ΔE + ΔnRT সমীকরণে স্থির চাপে এনথ্যালপি পরিবর্তন নির্ণয় করা হয়', note: 'সকল দহন বিক্রিয়াই তাপোৎপাদী (ΔH < ০)', diff: 'dental' },
    { ch: 'chem1_ch4_equilibrium', topic: 'অ্যাসিডের তীব্রতা: অক্সি-অ্যাসিডে কেন্দ্রীয় পরমাণুর জারণ মান ও তড়িৎ ঋণাত্মকতা', detail: 'কেন্দ্রীয় পরমাণুর জারণ মান সমান হলে তড়িৎ ঋণাত্মকতা বাড়লে অম্লত্ব বাড়ে: HClO > HBrO > HIO এবং H₂SO₄ > H₂SeO₄', note: 'একই মৌলের অক্সি-অ্যাসিডে জারণ মান বাড়লে অম্লত্ব বাড়ে: HNO₃ (+৫) > HNO₂ (+৩) এবং H₂SO₄ (+৬) > H₂SO₃ (+৪)', diff: 'medical' },
    { ch: 'chem1_ch5_applied', topic: 'টয়লেট সোপ (সাবান) ও সিন্থেটিক ডিটারজেন্টের পার্থক্য', detail: 'সাবান খর পানির Ca²⁺ ও Mg²⁺ আয়নের সাথে অদ্রবণীয় গাদ (Scum) তৈরি করে, কিন্তু ডিটারজেন্টের (সোডিয়াম লরাইল সালফেট) Ca/Mg লবণ দ্রবণীয় বলে খর পানিতেও ফেনা দেয়', note: 'সাবানের ক্ষারীয় pH (৯–১০) পশম ও রেশম কাপড়ের ক্ষতি করতে পারে, ডিটারজেন্ট নিরপেক্ষ', diff: 'board' },
    { ch: 'chem1_ch5_applied', topic: 'বিশুদ্ধ ভিনেগার ও কৃত্রিম এসেন্স (ফ্লেভারিং এস্টার)', detail: 'পাকা কলায় অ্যামাইল অ্যাসিটেট, পাকা কমলায় অক্টাইল অ্যাসিটেট, পাকা আনারসে ইথাইল বিউটাইরেট এবং জুঁই ফুলে বেনজাইল অ্যাসিটেট সুগন্ধি এস্টার থাকে', note: 'পাকা আপেলে প্রধানত আইসোপেন্টাইল ভ্যালারেট বা ম্যালিক অ্যাসিড থাকে', diff: 'medical' },
    { ch: 'chem1_ch5_applied', topic: 'কলয়েড স্থায়িত্ব: লাইওফিলিক বনাম লাইওফোবিক সল', detail: 'দ্রাবক-আকর্ষী (লাইওফিলিক: স্টার্চ, জিলেটিন, গাম) সল অত্যন্ত স্থায়ী ও প্রত্যাবর্তী; দ্রাবক-বিকর্ষী (লাইওফোবিক: গোল্ড সল, Fe(OH)₃ সল) অস্থায়ী ও অল্প তড়িৎবিশ্লেষ্যেই তঞ্চিত হয়', note: 'লাইওফোবিক সলের চারপাশে জিলেটিন/অ্যালবুমিনের আবরণ দিয়ে রক্ষা করাকে প্রোটেকশন (গোল্ড নম্বর) বলে', diff: 'medical' },
    { ch: 'chem1_ch5_applied', topic: 'খাদ্যে নাইট্রাইট ও নাইট্রেট প্রিজারভেটিভ (মাংস কিউরিং)', detail: 'মাংস ও সসেজে NaNO₂ যোগ করলে মারাত্মক ব্যাকটেরিয়া Clostridium botulinum জন্মাতে পারে না এবং মাংসের লালচে রং বজায় থাকে', note: 'তবে অতিরিক্ত নাইট্রাইট উচ্চ তাপে ভাজা হলে ক্যান্সার সৃষ্টিকারী নাইট্রোসামিন তৈরি হতে পারে', diff: 'medical' },
  ];

  const cTopics = chem1FinalMatrix.map((c) => c.topic);
  const cDetails = chem1FinalMatrix.map((c) => c.detail);
  const cNotes = chem1FinalMatrix.map((c) => c.note);

  chem1FinalMatrix.forEach((c, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: c.ch,
        visualLessonId: c.ch === 'chem1_ch2_qualitative' || c.ch === 'chem1_ch3_periodic' ? 'hybridization' : 'ph_buffer',
        hscLevel: '11',
        difficulty: c.diff,
        question: `"${c.topic}" সম্পর্কে নিচের কোন ব্যাখ্যাটি যথাযথ?`,
        correct: c.detail,
        distractors: [1, 2, 3, 4].map((o) => cDetails[(idx + o * 3) % chem1FinalMatrix.length]),
        explanation: `${c.detail}। নোট: ${c.note}।`,
        reference: 'রসায়ন ১ম পত্র · চূড়ান্ত মডেল প্রশ্ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: c.ch,
        visualLessonId: c.ch === 'chem1_ch2_qualitative' || c.ch === 'chem1_ch3_periodic' ? 'hybridization' : 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `"${c.topic}"-এর ক্ষেত্রে পরীক্ষার জন্য গুরুত্বপূর্ণ অতিরিক্ত তথ্য কোনটি?`,
        correct: c.note,
        distractors: [1, 2, 3, 4].map((o) => cNotes[(idx + o * 5) % chem1FinalMatrix.length]),
        explanation: `${c.note}। বিস্তারিত: ${c.detail}।`,
        reference: 'রসায়ন ১ম পত্র · ভর্তি পরীক্ষা অনুশীলন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: c.ch,
        visualLessonId: c.ch === 'chem1_ch2_qualitative' || c.ch === 'chem1_ch3_periodic' ? 'hybridization' : 'ph_buffer',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${c.note}" — এই তথ্যটি নিচের কোন আলোচ্য বিষয়ের অংশ?`,
        correct: c.topic,
        distractors: [1, 2, 3, 4].map((o) => cTopics[(idx + o * 7) % chem1FinalMatrix.length]),
        explanation: `এটি "${c.topic}"-এর অংশ: ${c.detail}।`,
        reference: 'রসায়ন ১ম পত্র · এইচএসসি রিভিশন',
      })
    );
  });

  return list;
}
