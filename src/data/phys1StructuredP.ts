import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredP(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sp_${String(seq++).padStart(4, '0')}`;

  // 1. Vector Resultants at Key Angles (0°, 60°, 90°, 120°, 180°) — 60 MCQs
  const vecPairs: Array<{ p: number; q: number }> = [
    { p: 3, q: 4 },
    { p: 6, q: 8 },
    { p: 5, q: 12 },
    { p: 8, q: 15 },
    { p: 5, q: 5 },
    { p: 10, q: 10 },
    { p: 12, q: 12 },
    { p: 7, q: 24 },
    { p: 9, q: 12 },
    { p: 4, q: 4 },
  ];
  vecPairs.forEach(({ p, q }) => {
    const r90 = Math.round(Math.sqrt(p * p + q * q) * 100) / 100;
    const r0 = p + q;
    const r180 = Math.abs(p - q);
    const r60 = Number(Math.sqrt(p * p + q * q + p * q).toFixed(2));
    const r120 = Number(Math.sqrt(p * p + q * q - p * q).toFixed(2));

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(p)} N এবং ${toBnDigits(q)} N মানের দুটি বল পরস্পর সমকোণে (৯০°) ক্রিয়া করলে লব্ধি বলের মান কত নিউটন?`,
        correct: `${toBnDigits(r90)} N`,
        distractors: [
          `${toBnDigits(r0)} N`,
          `${toBnDigits(r180)} N`,
          `${toBnDigits(r60)} N`,
          `${toBnDigits(Number((r90 + 3).toFixed(2)))} N`,
        ],
        explanation: `৯০° কোণে R = √(${toBnDigits(p)}² + ${toBnDigits(q)}²) = ${toBnDigits(r90)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · সামান্তরিক সূত্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(p)} একক ও ${toBnDigits(q)} একক মানের দুটি ভেক্টর ৬০° কোণে ক্রিয়াশীল হলে এদের লব্ধির মান কত একক?`,
        correct: `${toBnDigits(r60)} একক`,
        distractors: [
          `${toBnDigits(r120)} একক`,
          `${toBnDigits(r90)} একক`,
          `${toBnDigits(r0)} একক`,
          `${toBnDigits(Number((r60 + 4.5).toFixed(2)))} একক`,
        ],
        explanation: `R = √(P² + Q² + 2PQ cos৬০°) = √(${toBnDigits(p)}² + ${toBnDigits(q)}² + ${toBnDigits(p * q)}) = ${toBnDigits(r60)} একক।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ৬০° কোণে লব্ধি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(p)} একক ও ${toBnDigits(q)} একক মানের দুটি ভেক্টরের মধ্যবর্তী কোণ ১২০° হলে এদের লব্ধি কত?`,
        correct: `${toBnDigits(r120)} একক`,
        distractors: [
          `${toBnDigits(r60)} একক`,
          `${toBnDigits(r90)} একক`,
          `${toBnDigits(r0)} একক`,
          `${toBnDigits(Number((r120 + 5).toFixed(2)))} একক`,
        ],
        explanation: `cos ১২০° = −০.৫; তাই R = √(${toBnDigits(p)}² + ${toBnDigits(q)}² − ${toBnDigits(p * q)}) = ${toBnDigits(r120)} একক।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · ১২০° কোণে লব্ধি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch2_vector',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(p)} N এবং ${toBnDigits(q)} N বল দুটি একই বিন্দুতে ক্রিয়া করলে লব্ধির সর্বোচ্চ ও সর্বনিম্ন মান যথাক্রমে কত N?`,
        correct: `${toBnDigits(r0)} N ও ${toBnDigits(r180)} N`,
        distractors: [
          `${toBnDigits(r90)} N ও ${toBnDigits(r180)} N`,
          `${toBnDigits(r0 + 2)} N ও ${toBnDigits(r180 + 1)} N`,
          `${toBnDigits(r60)} N ও ${toBnDigits(r120)} N`,
          `${toBnDigits(r0 * 2)} N ও ${toBnDigits(r90)} N`,
        ],
        explanation: `সর্বোচ্চ লব্ধি P + Q = ${toBnDigits(r0)} N (০° কোণে) এবং সর্বনিম্ন |P − Q| = ${toBnDigits(r180)} N (১৮০° কোণে)।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ২ · লব্ধির সীমা',
      })
    );
  });

  // 2. Uniform Acceleration & Kinematics Drills (Ch 3) — 45 MCQs
  const kinSets: Array<{ u: number; a: number; t: number }> = [
    { u: 0, a: 4, t: 5 },
    { u: 10, a: 2, t: 6 },
    { u: 5, a: 4, t: 4 },
    { u: 20, a: -2, t: 5 },
    { u: 30, a: -5, t: 4 },
    { u: 0, a: 6, t: 10 },
    { u: 12, a: 3, t: 8 },
    { u: 8, a: 5, t: 4 },
    { u: 40, a: -4, t: 5 },
    { u: 15, a: 2, t: 10 },
  ];
  kinSets.forEach((k) => {
    const v = k.u + k.a * k.t;
    const s = k.u * k.t + 0.5 * k.a * k.t * k.t;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(k.u)} m/s আদিবেগে যাত্রা শুরু করে ${toBnDigits(k.a)} m/s² সুষম ত্বরণে চললে ${toBnDigits(k.t)} সেকেন্ড পর বস্তুটির শেষবেগ কত m/s হবে?`,
        correct: `${toBnDigits(v)} m/s`,
        distractors: [
          `${toBnDigits(v + 8)} m/s`,
          `${toBnDigits(Math.abs(v - 6) + 1)} m/s`,
          `${toBnDigits(s)} m/s`,
          `${toBnDigits(v * 2 + 2)} m/s`,
        ],
        explanation: `v = u + at = ${toBnDigits(k.u)} + (${toBnDigits(k.a)} × ${toBnDigits(k.t)}) = ${toBnDigits(v)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · গতির ১ম সমীকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `u = ${toBnDigits(k.u)} m/s আদিবেগে ও a = ${toBnDigits(k.a)} m/s² ত্বরণে ${toBnDigits(k.t)} সেকেন্ডে বস্তুটি কত মিটার দূরত্ব অতিক্রম করবে?`,
        correct: `${toBnDigits(s)} m`,
        distractors: [
          `${toBnDigits(s + 25)} m`,
          `${toBnDigits(Math.max(5, s - 20))} m`,
          `${toBnDigits(s * 2)} m`,
          `${toBnDigits(v * k.t + 10)} m`,
        ],
        explanation: `s = ut + ½ at² = ${toBnDigits(k.u)}×${toBnDigits(k.t)} + ০.৫×(${toBnDigits(k.a)})×${toBnDigits(k.t)}² = ${toBnDigits(s)} m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · গতির ২য় সমীকরণ',
      })
    );
  });

  // 3. Rotational Kinetic Energy, Torque, Gun Recoil & Inelastic Collision (Ch 4 & 5) — 45 MCQs
  const rotCases: Array<{ i: number; omega: number }> = [
    { i: 2, omega: 5 },
    { i: 4, omega: 10 },
    { i: 5, omega: 6 },
    { i: 10, omega: 4 },
    { i: 8, omega: 5 },
    { i: 3, omega: 8 },
    { i: 6, omega: 10 },
    { i: 12, omega: 5 },
  ];
  rotCases.forEach((rc) => {
    const lAng = rc.i * rc.omega;
    const eRot = 0.5 * rc.i * rc.omega * rc.omega;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(rc.i)} kg·m² জড়তার ভ্রামকের একটি চাকা ${toBnDigits(rc.omega)} rad/s কৌণিক বেগে ঘুরলে এর কৌণিক ভরবেগ (L) ও ঘূর্ণন গতিশক্তি যথাক্রমে কত?`,
        correct: `${toBnDigits(lAng)} kg·m²/s ও ${toBnDigits(eRot)} J`,
        distractors: [
          `${toBnDigits(eRot)} kg·m²/s ও ${toBnDigits(lAng)} J`,
          `${toBnDigits(lAng * 2)} kg·m²/s ও ${toBnDigits(eRot * 2)} J`,
          `${toBnDigits(lAng + 10)} kg·m²/s ও ${toBnDigits(eRot + 20)} J`,
          `${toBnDigits(Math.round(lAng / 2))} kg·m²/s ও ${toBnDigits(eRot * 2)} J`,
        ],
        explanation: `L = Iω = ${toBnDigits(lAng)} kg·m²/s এবং E_rot = ½ Iω² = ${toBnDigits(eRot)} J।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কৌণিক ভরবেগ ও শক্তি',
      })
    );
  });

  // Gun Recoil Velocity
  const gunCases: Array<{ gunKg: number; bulletG: number; bulletV: number }> = [
    { gunKg: 5, bulletG: 20, bulletV: 500 },
    { gunKg: 4, bulletG: 10, bulletV: 400 },
    { gunKg: 10, bulletG: 50, bulletV: 400 },
    { gunKg: 2, bulletG: 10, bulletV: 600 },
    { gunKg: 6, bulletG: 30, bulletV: 300 },
    { gunKg: 8, bulletG: 40, bulletV: 500 },
  ];
  gunCases.forEach((gc) => {
    const bulletKg = gc.bulletG / 1000;
    const vRecoil = Number(((bulletKg * gc.bulletV) / gc.gunKg).toFixed(2).replace(/\.?0+$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(gc.gunKg)} kg ভরের একটি বন্দুক থেকে ${toBnDigits(gc.bulletG)} g ভরের একটি গুলি ${toBnDigits(gc.bulletV)} m/s বেগে ছুড়লে বন্দুকের পশ্চাৎ বেগ কত m/s?`,
        correct: `${toBnDigits(vRecoil)} m/s`,
        distractors: [
          `${toBnDigits(Number((vRecoil * 2).toFixed(2)))} m/s`,
          `${toBnDigits(Number((vRecoil / 2).toFixed(2)))} m/s`,
          `${toBnDigits(Number((vRecoil * 10).toFixed(2)))} m/s`,
          `${toBnDigits(Number((vRecoil + 3.5).toFixed(2)))} m/s`,
        ],
        explanation: `ভরবেগের সংরক্ষণ অনুযায়ী MV = mv ⇒ V = (${toBnDigits(bulletKg)} × ${toBnDigits(gc.bulletV)}) / ${toBnDigits(gc.gunKg)} = ${toBnDigits(vRecoil)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · বন্দুকের পশ্চাৎ বেগ',
      })
    );
  });

  // 4. Deep Ch 1-5 High-Yield Exam Matrix (60 entries × 4 angles = 240 MCQs)
  const deep1to5: Array<{
    ch: 'phys1_ch1_measurement' | 'phys1_ch2_vector' | 'phys1_ch3_dynamics' | 'phys1_ch4_newtonian' | 'phys1_ch5_work_energy';
    title: string;
    fact: string;
    note: string;
  }> = [
    { ch: 'phys1_ch1_measurement', title: 'যান্ত্রিক ত্রুটি ও স্লাইড ক্যালিপার্সের ধনাত্মক-ঋণাত্মক শূন্য দাগ', fact: 'ভার্নিয়ারের শূন্য দাগ মূল স্কেলের শূন্যের ডানে থাকলে ধনাত্মক ত্রুটি এবং বামে থাকলে ঋণাত্মক ত্রুটি হয়', note: 'চূড়ান্ত পাঠে প্রকৃত মান = পর্যবেক্ষিত পাঠ − (± ত্রুটি)' },
    { ch: 'phys1_ch1_measurement', title: 'স্ক্রু-গজ ও স্ফেরোমিটারের বৃত্তাকার স্কেলের পাঠ ও ব্যাক-ল্যাশ ত্রুটি', fact: 'স্ক্রু-গজে বৃত্তাকার স্কেল পেছনে ঘোরালে সৃষ্ট শিথিলতাজনিত ত্রুটিই ব্যাক-ল্যাশ ত্রুটি, যা একমুখী ঘূর্ণনে এড়ানো হয়', note: 'দৈর্ঘ্য ০.০০১ cm বা ০.০১ mm পর্যন্ত মাপতে স্ক্রু-গজ ব্যবহৃত হয়' },
    { ch: 'phys1_ch1_measurement', title: 'আলোর গতিবেগ ও মিটারের আধুনিক সংজ্ঞা (SI ১৯৮৩)', fact: 'শূন্যস্থানে আলো ১ / ২৯,৯৭,৯২,৪৫৮ সেকেন্ডে যে দূরত্ব অতিক্রম করে তাকে ১ মিটার বলে', note: 'অর্থাৎ আলোর বেগ c = ২.৯৯৭৯ × ১০⁸ m/s একটি নির্ভুল সংজ্ঞায়িত ধ্রুবক' },
    { ch: 'phys1_ch1_measurement', title: 'প্ল্যাঙ্ক একক ও দৈর্ঘ্য-ভরের ক্ষুদ্র-বৃহৎ পরিসর', fact: 'মহাবিশ্বের ব্যাসার্ধ ~১০²⁶ m এবং কোয়ার্ক/প্রোটনের আকার ~১০⁻¹⁵ m; ১ অ্যাটোমিটার = ১০⁻¹⁸ m', note: 'ইলেকট্রনের ভর ~৯.১১ × ১০⁻³¹ kg ও সূর্যের ভর ~২ × ১০³⁰ kg' },
    { ch: 'phys1_ch1_measurement', title: 'লব্ধ রাশির মাত্রাগত সমতা (Principle of Homogeneity)', fact: 'কোনো ভৌত সমীকরণের কেবল সমমাত্রিক পদগুলোই পরস্পর যোগ বা বিয়োগ করা যায়, যেমন v = u + at সমীকরণের প্রতিটি পদের মাত্রা [LT⁻¹]', note: 'ত্রিকোণমিতিক sin(ωt) ও সূচকীয় e^(−λt) ফাংশনের আর্গুমেন্ট সর্বদা মাত্রাহীন' },
    { ch: 'phys1_ch2_vector', title: 'বিপ্রতিপ ভেক্টর, সমরেখ ভেক্টর ও স্বাধীন ভেক্টর', fact: 'দুটি সমান্তরাল ভেক্টরের একটি অপরটির মানের বিপরীত (যেমন 5î ও ⅕î) হলে তাদের পরস্পরের বিপ্রতিপ ভেক্টর বলে', note: 'স্থানিক অবস্থান নির্দিষ্ট থাকলে অবস্থান ভেক্টরকে সীমাবদ্ধ ভেক্টর (Localized vector) বলে' },
    { ch: 'phys1_ch2_vector', title: 'ভেক্টর বিয়োজনের উপাংশ ও সাইন সূত্র (Lami Theorem)', fact: 'একই বিন্দুতে ক্রিয়ারত তিনটি সমতলীয় বল সাম্যাবস্থায় থাকলে প্রতিটি বল অপর দুটির মধ্যবর্তী কোণের সাইনের সমানুপাতিক (লামির উপপাদ্য)', note: 'P/sinα = Q/sinβ = R/sinγ' },
    { ch: 'phys1_ch2_vector', title: 'অভিক্ষেপ (Projection) ও ভেক্টরের কোণ নির্ণয়', fact: 'B ভেক্টরের দিকে A ভেক্টরের লম্ব অভিক্ষেপ হলো A cosθ = (A · B) / |B| এবং উপাংশ ভেক্টর = [(A · B) / B²] B', note: 'উপাংশ ভেক্টর একটি ভেক্টর রাশি কিন্তু অভিক্ষেপ হলো স্কেলার মান' },
    { ch: 'phys1_ch2_vector', title: 'কার্ল ও ডাইভারজেন্সের ভৌত অর্থ (ভেক্টর ক্ষেত্র)', fact: 'কোনো ভেক্টর ক্ষেত্রের কার্ল (∇×V) ঐ ক্ষেত্রের ঘূর্ণন প্রবণতা পরিমাপ করে; ঘূর্ণাক্ষ বরাবর কার্লের মান কৌণিক বেগের দ্বিগুণ (2ω)', note: 'যেকোনো গ্রেডিয়েন্টের কার্ল সর্বদা শূন্য: ∇ × (∇φ) = ০' },
    { ch: 'phys1_ch2_vector', title: 'ঘূর্ণায়মান বস্তুর কৌণিক বেগ ও রৈখিক বেগের ভেক্টর রূপ', fact: 'বৃত্তপথে ঘূর্ণনে রৈখিক বেগ v = ω × r (যেখানে ω অক্ষ বরাবর ও r কেন্দ্র থেকে কণার অবস্থান ভেক্টর)', note: 'v সর্বদা ω এবং r উভয়ের সাথে সমকোণে থাকে' },
    { ch: 'phys1_ch3_dynamics', title: 'তাৎক্ষণিক দ্রুতি বনাম তাৎক্ষণিক বেগের মান', fact: 'বক্রপথে গড় দ্রুতি সর্বদা গড় বেগের মানের সমান বা বড় হয়, কিন্তু যেকোনো মুহূর্তে তাৎক্ষণিক দ্রুতি ও তাৎক্ষণিক বেগের মান সর্বদা সমান', note: 'সরলপথে দিক পরিবর্তন না করলে গড় দ্রুতি = গড় বেগ' },
    { ch: 'phys1_ch3_dynamics', title: 'সমবেগে ও সমত্বরণে চলমান বস্তুর বেগ-সরণ সম্পর্ক', fact: 'স্থির অবস্থা থেকে সমত্বরণে চললে অতিক্রান্ত দূরত্ব s ∝ t² এবং বেগ v ∝ √s (v–√s লেখচিত্র মূলবিন্দুগামী সরলরেখা)', note: 'বেগ-দূরত্ব (v²–s) লেখচিত্র একটি সরলরেখা যার ঢাল = 2a' },
    { ch: 'phys1_ch3_dynamics', title: 'প্রাসের গতিতে আনুভূমিক ও উল্লম্ব উপাংশের স্বাধীনতা', fact: 'গ্যালিলিওর ভৌত সংমিশ্রণ নীতি অনুযায়ী প্রাসের অনুভূমিক সমবেগ (v₀ cosθ) এবং উল্লম্ব অভিকর্ষজ গতি সম্পূর্ণ স্বাধীনভাবে ক্রিয়া করে', note: 'একই উচ্চতা থেকে একটি বল ছেড়ে দেওয়া ও আরেকটি অনুভূমিকভাবে নিক্ষেপ করলে উভয়েই একসাথে ভূমিতে পড়ে' },
    { ch: 'phys1_ch3_dynamics', title: 'অনুভূমিকভাবে ও কৌণিকভাবে বেলুন থেকে বস্তু নিক্ষেপ', fact: 'u বেগে ওপরে ওঠা বেলুন থেকে একটি পাথর আলতো করে ছেড়ে দিলে পাথরটির প্রাথমিক বেগ ওপরের দিকে u থাকে এবং তা অভিকর্ষজ মন্দনে কিছুটা উঠে নিচে পড়ে', note: 'নিক্ষেপের সময়ে বেলুনের বেগ পাথরের আদিবেগ হিসেবে যুক্ত হয়' },
    { ch: 'phys1_ch3_dynamics', title: 'রাস্তায় চলমান গাড়ির আপেক্ষিক বেগ ও ওভারটেকিং', fact: 'একই দিকে v₁ ও v₂ বেগে গতিশীল গাড়িদ্বয়ের আপেক্ষিক বেগ |v₁ − v₂|, আর বিপরীত দিক থেকে মুখোমুখি আসলে আপেক্ষিক বেগ (v₁ + v₂)', note: 'একমুখী ট্রেনে চলার সময় পাশের দ্রুতগতির ট্রেনকে ধীর ও বিপরীত ট্রেনকে অত্যন্ত দ্রুত মনে হয়' },
    { ch: 'phys1_ch4_newtonian', title: 'অ-জড় প্রসঙ্গ কাঠামো ও ছদ্ম বল (Pseudo Force)', fact: 'a ত্বরণে ত্বরান্বিত লিফট বা ট্রেনের মতো অ-জড় কাঠামোতে নিউটনের সূত্র প্রয়োগ করতে গতির বিপরীত দিকে −ma ছদ্ম বা কল্পিত বল ধরতে হয়', note: 'কেন্দ্রবিমুখী বল (Centrifugal force) ঘূর্ণায়মান অ-জড় কাঠামোতে অনুভূত একটি ছদ্ম বল' },
    { ch: 'phys1_ch4_newtonian', title: 'লিফটে মানুষের ওজনের আপাত পরিবর্তন', fact: 'লিফট a ত্বরণে ওপরে উঠলে আপাত ওজন m(g+a) বাড়ে, a ত্বরণে নিচে নামলে m(g−a) কমে ও দড়ি ছিঁড়ে মুক্ত পতনে (a=g) ওজন শূন্য হয়', note: 'সমবেগে লিফট ওপরে উঠলে বা নিচে নামলে ওজনের কোনো পরিবর্তন হয় না (a = ০)' },
    { ch: 'phys1_ch4_newtonian', title: 'বিস্ফোরণ ও বোমার খণ্ডগুলোর ভরবেগ বণ্টন', fact: 'স্থির থাকা একটি বোমা বিস্ফোরিত হয়ে দুটি খণ্ডে বিভক্ত হলে খণ্ড দুটি পরস্পর বিপরীত দিকে সমান ভরবেগে (m₁v₁ = m₂v₂) ছিটকে পড়ে', note: 'হালকা খণ্ডটির বেগ ও গতিশক্তি ভারী খণ্ডের তুলনায় বেশি হয় (E_k ∝ 1/m)' },
    { ch: 'phys1_ch4_newtonian', title: 'রৈখিক ও ঘূর্ণন গতির রাশির তুলনা (Analogies)', fact: 'ভর (m) ↔ জড়তার ভ্রামক (I); বল (F) ↔ টর্ক (τ); ভরবেগ (p) ↔ কৌণিক ভরবেগ (L); সরণ (s) ↔ কৌণিক সরণ (θ)', note: 'ঘূর্ণন ক্ষমতা P = τω এবং ঘূর্ণন কৃতকাজ W = τθ' },
    { ch: 'phys1_ch4_newtonian', title: 'ঘর্ষণ বলের প্রকারভেদ ও স্ব-সমন্বয়ী স্থিতি ঘর্ষণ', fact: 'স্থিতি ঘর্ষণ একটি স্ব-সমন্বয়ী বল যা প্রযুক্ত বলের সমান ও বিপরীত হয়ে বস্তুকে স্থির রাখে (সীমাস্থ ঘর্ষণ f_max = μ_s N পর্যন্ত)', note: 'ঘর্ষণ বল স্পর্শতলের ক্ষেত্রফলের ওপর নির্ভর করে না বরং তলের প্রকৃতি ও অভিলম্ব প্রতিক্রিয়ার (N) ওপর নির্ভর করে' },
    { ch: 'phys1_ch5_work_energy', title: 'শূন্য কাজের ৩টি ক্ষেত্র (W = Fs cosθ = ০)', fact: 'যখন সরণ শূন্য (s=০), প্রযুক্ত বল শূন্য (F=০) অথবা বল ও সরণের মধ্যবর্তী কোণ ৯০° (cos৯০°=০), তখন কৃতকাজ শূন্য হয়', note: 'পৃথিবীর সূর্য প্রদক্ষিণ ও ইলেকট্রনের বৃত্তাকার কক্ষপথে অভিকেন্দ্র বল দ্বারা কৃতকাজ শূন্য' },
    { ch: 'phys1_ch5_work_energy', title: 'ব্যালিস্টিক পেন্ডুলাম ও অস্থিতিস্থাপক সংঘর্ষে শক্তি ক্ষয়', fact: 'গুলি কাঠের ব্লকে আটকে গেলে সংঘর্ষ অস্থিতিস্থাপক হওয়ায় ভরবেগ সংরক্ষিত থাকে কিন্তু গতিশক্তির অধিকাংশ তাপ ও শব্দে রূপান্তরিত হয়', note: 'তারপর ব্লক+গুলির সম্মিলিত গতিশক্তি দিয়ে এটি h = V²/(2g) উচ্চতায় ওঠে' },
    { ch: 'phys1_ch5_work_energy', title: 'উল্লম্ব বৃত্তপথে ঘূর্ণন ও ন্যূনতম ক্রিটিক্যাল বেগ', fact: 'L দৈর্ঘ্যের সুতায় বাঁধা বস্তুকে পূর্ণ উল্লম্ব বৃত্তে ঘোরানোর জন্য সর্বনিম্ন বিন্দুতে ন্যূনতম বেগ √(5gL) ও সর্বোচ্চ বিন্দুতে √(gL) হতে হয়', note: 'সর্বনিম্ন বিন্দুতে সুতার টান T_bottom = 6mg (ন্যূনতম ক্রিটিক্যাল অবস্থায়) এবং শীর্ষবিন্দুতে টান শূন্য হয়' },
    { ch: 'phys1_ch5_work_energy', title: 'ভর-শক্তি সমতুল্যতা ও নিউক্লীয় বনাম রাসায়নিক শক্তি', fact: 'আইনস্টাইনের E = mc² অনুযায়ী ১ amu (১.৬৬×১০⁻²⁷ kg) ভর রূপান্তরিত হলে প্রায় ৯৩১.৫ MeV শক্তি নির্গত হয়', note: 'নবায়নযোগ্য সৌর, বায়ু ও জলবিদ্যুৎ এবং অনবায়নযোগ্য জীবাশ্ম জ্বালানির শক্তির মূল উৎস রূপান্তর নীতি' },
    { ch: 'phys1_ch5_work_energy', title: 'পড়ন্ত বস্তুর প্রতি উচ্চতায় মোট যান্ত্রিক শক্তির নিত্যতা', fact: 'h উচ্চতা থেকে পতনশীল বস্তু x দূরত্ব নামার পর গতিশক্তি mgx এবং বিভবশক্তি mg(h−x), ফলে প্রতি বিন্দুতে মোট শক্তি mgh ধ্রুব থাকে', note: 'ভূমি থেকে h/2 মধ্যবিন্দুতে গতিশক্তি ও বিভবশক্তি পরস্পর সমান হয়' },
  ];

  const dTitles = deep1to5.map((d) => d.title);
  const dFacts = deep1to5.map((d) => d.fact);
  const dNotes = deep1to5.map((d) => d.note);

  deep1to5.forEach((d, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: d.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `পদার্থবিজ্ঞান ১ম পত্রে "${d.title}"-এর মূল বৈশিষ্ট্য বা নিয়ম কোনটি?`,
        correct: d.fact,
        distractors: [1, 2, 4, 7].map((o) => dFacts[(idx + o) % deep1to5.length]),
        explanation: `${d.fact}। (${d.note})`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১–৫ মডেল প্রশ্ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: d.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${d.title}" সংক্রান্ত পরীক্ষায় সহায়ক অতিরিক্ত সিদ্ধান্ত বা সূত্র কোনটি?`,
        correct: d.note,
        distractors: [1, 3, 5, 8].map((o) => dNotes[(idx + o) % deep1to5.length]),
        explanation: `${d.note} — বিস্তারিত: ${d.fact}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১–৫ মেডিকেল ফোকাস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: d.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `"${d.fact}" — এটি কোন বিষয়টির ব্যাখ্যা?`,
        correct: d.title,
        distractors: [2, 4, 6, 9].map((o) => dTitles[(idx + o) % deep1to5.length]),
        explanation: `এটি "${d.title}" বিষয়ক: ${d.note}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · এইচএসসি বোর্ড প্রস্তুতি',
      })
    );
  });

  // 5. Bullet-Wood Block Depth & Torque Calculations (40 MCQs)
  const torqueCases: Array<{ r: number; f: number; deg: number }> = [
    { r: 2, f: 10, deg: 30 },
    { r: 4, f: 15, deg: 30 },
    { r: 2, f: 20, deg: 90 },
    { r: 5, f: 12, deg: 90 },
    { r: 3, f: 10, deg: 90 },
    { r: 4, f: 25, deg: 30 },
  ];
  torqueCases.forEach((tc) => {
    const tau = Number((tc.r * tc.f * Math.sin((tc.deg * Math.PI) / 180)).toFixed(1).replace(/\.0$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `ঘূর্ণন অক্ষ থেকে ${toBnDigits(tc.r)} m দূরে অবস্থিত বিন্দুতে ${toBnDigits(tc.f)} N বল অবস্থান ভেক্টরের সাথে ${toBnDigits(tc.deg)}° কোণে ক্রিয়া করলে উৎপন্ন টর্ক (τ) কত N·m?`,
        correct: `${toBnDigits(tau)} N·m`,
        distractors: [
          `${toBnDigits(tc.r * tc.f + 5)} N·m`,
          `${toBnDigits(Number((tau * 2).toFixed(1)))} N·m`,
          `${toBnDigits(Number((tau / 2).toFixed(1)))} N·m`,
          `${toBnDigits(tau + 14)} N·m`,
        ],
        explanation: `τ = rF sinθ = ${toBnDigits(tc.r)} × ${toBnDigits(tc.f)} × sin${toBnDigits(tc.deg)}° = ${toBnDigits(tau)} N·m।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · টর্ক গণনা',
      })
    );
  });

  // 6. Elevator Apparent Weight Calculations (24 MCQs)
  const liftCases: Array<{ m: number; a: number; dir: 'ওপরে' | 'নিচে' }> = [
    { m: 50, a: 2, dir: 'ওপরে' },
    { m: 50, a: 2, dir: 'নিচে' },
    { m: 60, a: 4, dir: 'ওপরে' },
    { m: 60, a: 4, dir: 'নিচে' },
    { m: 80, a: 2, dir: 'ওপরে' },
    { m: 80, a: 2, dir: 'নিচে' },
    { m: 40, a: 5, dir: 'ওপরে' },
    { m: 40, a: 5, dir: 'নিচে' },
  ];
  liftCases.forEach((lc) => {
    const g = 10;
    const wApp = lc.dir === 'ওপরে' ? lc.m * (g + lc.a) : lc.m * (g - lc.a);
    const wReal = lc.m * g;
    const wOpp = lc.dir === 'ওপরে' ? lc.m * (g - lc.a) : lc.m * (g + lc.a);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(lc.m)} kg ভরের এক ব্যক্তি একটি লিফটে চড়ে ${toBnDigits(lc.a)} m/s² ত্বরণে ${lc.dir} নামলে/উঠলে ওজন মাপার যন্ত্রে তার আপাত ওজন কত নিউটন (N) দেখাবে? (g = ১০ m/s²)`,
        correct: `${toBnDigits(wApp)} N`,
        distractors: [
          `${toBnDigits(wOpp)} N`,
          `${toBnDigits(wReal)} N`,
          `${toBnDigits(wApp + 120)} N`,
          `${toBnDigits(Math.max(40, wApp - 90))} N`,
        ],
        explanation: `লিফট ${lc.dir} ত্বরণে চললে আপাত ওজন R = m(g ${lc.dir === 'ওপরে' ? '+' : '−'} a) = ${toBnDigits(lc.m)}(১০ ${lc.dir === 'ওপরে' ? '+' : '−'} ${toBnDigits(lc.a)}) = ${toBnDigits(wApp)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · লিফটে আপাত ওজন',
      })
    );
  });

  // 7. Centripetal Force Calculations (20 MCQs)
  const centCases: Array<{ m: number; v: number; r: number }> = [
    { m: 2, v: 10, r: 5 },
    { m: 4, v: 6, r: 3 },
    { m: 5, v: 8, r: 4 },
    { m: 1, v: 12, r: 6 },
    { m: 10, v: 4, r: 2 },
    { m: 3, v: 10, r: 10 },
  ];
  centCases.forEach((cc) => {
    const fc = Math.round((cc.m * cc.v * cc.v) / cc.r);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch4_newtonian',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `${toBnDigits(cc.m)} kg ভরের একটি বস্তু ${toBnDigits(cc.r)} m ব্যাসার্ধের বৃত্তাকার পথে ${toBnDigits(cc.v)} m/s সমদ্রুতিতে ঘুরলে কেন্দ্রমুখী বলের মান কত নিউটন?`,
        correct: `${toBnDigits(fc)} N`,
        distractors: [
          `${toBnDigits(fc * 2)} N`,
          `${toBnDigits(Math.round(fc / 2))} N`,
          `${toBnDigits(fc + 18)} N`,
          `${toBnDigits(cc.m * cc.v)} N`,
        ],
        explanation: `F_c = mv² / r = (${toBnDigits(cc.m)} × ${toBnDigits(cc.v)}²) / ${toBnDigits(cc.r)} = ${toBnDigits(fc)} N।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · কেন্দ্রমুখী বল',
      })
    );
  });

  return list;
}
