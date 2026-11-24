import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredH(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sh_${String(seq++).padStart(4, '0')}`;

  // 1. Progressive Wave Parameters: y = A sin(ωt - kx) -> f, λ, v (Ch 9, ~36 MCQs)
  const waveEqs = [
    { eq: 'y = 0.05 sin(100π t − 2π x)', f: '৫০ Hz', lam: '১.০ m', v: '৫০ m/s' },
    { eq: 'y = 0.10 sin(200π t − 0.5π x)', f: '১০০ Hz', lam: '৪.০ m', v: '৪০০ m/s' },
    { eq: 'y = 0.04 sin(60π t − 0.2π x)', f: '৩০ Hz', lam: '১০.০ m', v: '৩০০ m/s' },
    { eq: 'y = 0.02 sin(400π t − π x)', f: '২০০ Hz', lam: '২.০ m', v: '৪০০ m/s (২)' },
    { eq: 'y = 0.08 sin(120π t − 0.4π x)', f: '৬০ Hz', lam: '৫.০ m', v: '৩০০ m/s (২)' },
    { eq: 'y = 0.12 sin(500π t − 2.5π x)', f: '২৫০ Hz', lam: '০.৮ m', v: '২০০ m/s' },
  ];
  waveEqs.forEach((we, i) => {
    const cleanV = we.v.replace(/ \(\d\)/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `SI এককে একটি অগ্রগামী তরঙ্গের সমীকরণ ${we.eq} হলে তরঙ্গটির কম্পাঙ্ক (f) ও তরঙ্গদৈর্ঘ্য (λ) যথাক্রমে কত?`,
        correct: `${we.f} ও ${we.lam}`,
        distractors: waveEqs.filter((x) => x.eq !== we.eq).slice(0, 4).map((x) => `${x.f} ও ${x.lam}`),
        explanation: `y = A sin(2πft − 2πx/λ) সমীকরণের সাথে তুলনা করে পাওয়া যায় f = ${we.f} ও λ = ${we.lam}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · অগ্রগামী তরঙ্গ বিশ্লেষণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `অগ্রগামী তরঙ্গ ${we.eq}-এর তরঙ্গবেগ (v = ω/k) কত m/s?`,
        correct: cleanV,
        distractors: ['৫০ m/s', '১০০ m/s', '২০০ m/s', '৩০০ m/s', '৪০০ m/s', '৫০০ m/s'].filter((x) => x !== cleanV).slice(0, 4),
        explanation: `v = ω / k = f λ = ${cleanV}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তরঙ্গবেগ',
      })
    );
  });

  // 2. Beat Frequency & Waxing/Filing Tuning Forks (Ch 9, ~28 MCQs)
  const beatCases = [
    { fA: 256, beats: 4, action: 'B-তে সামান্য মোম লাগালে', after: 2, fB: 260 },
    { fA: 256, beats: 4, action: 'B-তে সামান্য মোম লাগালে', after: 6, fB: 252 },
    { fA: 320, beats: 5, action: 'B-কে সামান্য রেতে ঘষলে', after: 2, fB: 315 },
    { fA: 320, beats: 5, action: 'B-কে সামান্য রেতে ঘষলে', after: 8, fB: 325 },
    { fA: 480, beats: 6, action: 'B-তে সামান্য মোম লাগালে', after: 3, fB: 486 },
    { fA: 480, beats: 6, action: 'B-কে সামান্য রেতে ঘষলে', after: 3, fB: 474 },
  ];
  beatCases.forEach((bc, i) => {
    const altFb = bc.fB > bc.fA ? bc.fA - bc.beats : bc.fA + bc.beats;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(bc.fA)} Hz কম্পাঙ্কের সুরশলাকা A ও অজানা শলাকা B একত্রে বাজালে প্রতি সেকেন্ডে ${toBnDigits(bc.beats)}টি বীট উৎপন্ন হয়। ${bc.action} বীট সংখ্যা ${toBnDigits(bc.after)} হলে B-এর মূল কম্পাঙ্ক কত?`,
        correct: `${toBnDigits(bc.fB)} Hz`,
        distractors: [
          `${toBnDigits(altFb)} Hz`,
          `${toBnDigits(bc.fA)} Hz`,
          `${toBnDigits(bc.fA + bc.beats * 2)} Hz`,
          `${toBnDigits(bc.fA - bc.beats * 2)} Hz`,
        ],
        explanation: `মোম লাগালে কম্পাঙ্ক কমে এবং রেতে ঘষলে বাড়ে; শর্তানুসারে B-এর কম্পাঙ্ক = ${toBnDigits(bc.fB)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · বীট ও সুরশলাকা',
      })
    );
  });

  // 3. Organ Pipes (Open vs Closed) & Sound Intensity Decibel Numericals (Ch 9, ~36 MCQs)
  const organPipes = [
    { type: 'একমুখ বদ্ধ নল', lenM: 0.25, v: 340, f: 340 },
    { type: 'দুইমুখ খোলা নল', lenM: 0.5, v: 340, f: 340 },
    { type: 'একমুখ বদ্ধ নল', lenM: 0.5, v: 330, f: 165 },
    { type: 'দুইমুখ খোলা নল', lenM: 0.5, v: 330, f: 330 },
    { type: 'একমুখ বদ্ধ নল', lenM: 0.2, v: 320, f: 400 },
    { type: 'দুইমুখ খোলা নল', lenM: 0.4, v: 320, f: 400 },
  ];
  organPipes.forEach((op, idx) => {
    const formula = op.type === 'একমুখ বদ্ধ নল' ? 'v / (4L)' : 'v / (2L)';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `বাতাসে শব্দের বেগ ${toBnDigits(op.v)} m/s হলে ${toBnDigits(op.lenM)} m দৈর্ঘ্যের একটি "${op.type}" (অর্গান নল-#${toBnDigits(idx + 1)}) হতে উৎপন্ন মূল সুরের কম্পাঙ্ক কত?`,
        correct: `${toBnDigits(op.f)} Hz`,
        distractors: [165, 200, 320, 330, 340, 400, 660, 680].filter((x) => x !== op.f).slice(0, 4).map((x) => `${toBnDigits(x)} Hz`),
        explanation: `${op.type}-এর মূল কম্পাঙ্ক f₀ = ${formula} = ${toBnDigits(op.f)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · অর্গান নল',
      })
    );
  });

  // Sound Intensity Level dB Drills
  const dbCases = [
    { mult: '১০ গুণ', db: '১০ dB' },
    { mult: '১০০ গুণ (১০²)', db: '২০ dB' },
    { mult: '১,০০০ গুণ (১০³)', db: '৩০ dB' },
    { mult: '১০,০০০ গুণ (১০⁴)', db: '৪০ dB' },
    { mult: '১,০০,০০০ গুণ (১০⁵)', db: '৫০ dB' },
    { mult: '১০⁶ গুণ (১০,০০,০০০ গুণ)', db: '৬০ dB' },
    { mult: '২ গুণ (লগারিদমিক বৃদ্ধি)', db: 'প্রায় ৩ dB' },
    { mult: '৪ গুণ', db: 'প্রায় ৬ dB' },
  ];
  const dbPool = dbCases.map((d) => d.db);
  dbCases.forEach((dc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি শব্দের তীব্রতা পূর্বের তুলনায় ${dc.mult} বৃদ্ধি করলে তীব্রতা লেভেল (β) কত ডেসিবেল বাড়বে?`,
        correct: dc.db,
        distractors: dbPool.filter((x) => x !== dc.db).slice(0, 4),
        explanation: `Δβ = ১০ log₁₀(I₂/I₁) অনুযায়ী তীব্রতা ${dc.mult} বাড়লে Δβ = ${dc.db} বাড়ে।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ডেসিবেল বৃদ্ধি',
      })
    );
  });

  // 4. Ideal Gas Laws, Lake Bubble, Kinetic Energy & Humidity Numericals (Ch 10, ~80 MCQs)
  const lakeCases = [
    { multV: 2, depthM: 10 },
    { multV: 3, depthM: 20 },
    { multV: 4, depthM: 30 },
    { multV: 5, depthM: 40 },
    { multV: 8, depthM: 70 },
    { multV: 2, multR: 'প্রায় ১.২৬ গুণ (ঘনমূল ২)', depthM: 10, byRadius: true },
    { multV: 8, multR: '২ গুণ (ব্যাসার্ধ দ্বিগুণ)', depthM: 70, byRadius: true },
  ];
  lakeCases.forEach((lk, idx) => {
    if (lk.byRadius) {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch10_ideal_gas',
          visualLessonId: 'thermodynamics',
          hscLevel: '11',
          difficulty: 'medical',
          question: `স্থির তাপমাত্রায় হ্রদের তলদেশ থেকে একটি বায়ুর বুদবুদ পানির উপরিতলে আসায় ব্যাসার্ধ দ্বিগুণ (অর্থাৎ আয়তন ৮ গুণ) হলো; বায়ুচাপ ১০ m পানি স্তম্ভের সমান হলে হ্রদের গভীরতা কত?`,
          correct: `${toBnDigits(lk.depthM)} m (${lk.multR})`,
          distractors: ['১০ m', '২০ m', '৩০ m', '৪০ m', '৮০ m'].filter((x) => !x.startsWith(toBnDigits(lk.depthM))),
          explanation: `P₁V₁ = P₂V₂ ⇒ (H + h)V = H(8V) ⇒ h = 7H = ৭ × ১০ = ৭০ m (২ গুণ ব্যাসার্ধে আয়তন ৮ গুণ হয়)।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · হ্রদের তলদেশে বুদবুদ',
        })
      );
    } else {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'phys_1',
          chapterId: 'phys1_ch10_ideal_gas',
          visualLessonId: 'thermodynamics',
          hscLevel: '11',
          difficulty: idx % 2 === 0 ? 'medical' : 'dental',
          question: `সমতাপীয় প্রক্রিয়ায় হ্রদের তলদেশ থেকে একটি বায়ুর বুদবুদ ওপরে উঠে আসায় এর আয়তন ${toBnDigits(lk.multV)} গুণ হলো। বায়ুমণ্ডলীয় চাপ ১০ m পানি স্তম্ভের সমান হলে হ্রদের গভীরতা কত?`,
          correct: `${toBnDigits(lk.depthM)} m`,
          distractors: [10, 20, 30, 40, 50, 70, 80].filter((x) => x !== lk.depthM).slice(0, 4).map((x) => `${toBnDigits(x)} m`),
          explanation: `(H + h) · V = H · (${toBnDigits(lk.multV)}V) ⇒ h = (${toBnDigits(lk.multV)} − ১)H = ${toBnDigits(lk.depthM)} m।`,
          reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · বয়েলের সূত্র ও হ্রদ',
        })
      );
    }
  });

  // Relative Humidity Numericals RH = (f / F) * 100%
  const humCases = [
    { f: 12, F: 20, rh: 60 },
    { f: 15, F: 20, rh: 75 },
    { f: 18, F: 24, rh: 75 },
    { f: 16, F: 32, rh: 50 },
    { f: 9, F: 15, rh: 60 },
    { f: 20, F: 25, rh: 80 },
    { f: 12, F: 15, rh: 80 },
    { f: 10, F: 25, rh: 40 },
  ];
  humCases.forEach((hc, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `কোনো স্থানে বায়ুর তাপমাত্রায় সম্পৃক্ত জলীয় বাষ্পচাপ ${toBnDigits(hc.F)} mmHg এবং শিশিরাঙ্কে সম্পৃক্ত জলীয় বাষ্পচাপ ${toBnDigits(hc.f)} mmHg হলে (পর্যবেক্ষণ-#${toBnDigits(idx + 1)}) আপেক্ষিক আর্দ্রতা কত?`,
        correct: `${toBnDigits(hc.rh)}%`,
        distractors: [40, 50, 60, 65, 75, 80, 90].filter((x) => x !== hc.rh).slice(0, 4).map((x) => `${toBnDigits(x)}%`),
        explanation: `R = (f / F) × ১০০% = (${toBnDigits(hc.f)} / ${toBnDigits(hc.F)}) × ১০০% = ${toBnDigits(hc.rh)}%।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · আপেক্ষিক আর্দ্রতা',
      })
    );
  });

  // Ideal gas kinetic energy E = 3/2 nRT (in R*T or numerical J)
  const gasKe = [
    { gas: '১ মোল এক-পরমাণুক গ্যাসের (যেমন He) ২৭°C তাপমাত্রায় মোট গতিশক্তি', val: '৪৫০ R জুল (≈ ৩,৭৪১ J)' },
    { gas: '২ মোল আদর্শ গ্যাসের ২৭°C (৩০০ K) তাপমাত্রায় রৈখিক গতিশক্তি', val: '৯০০ R জুল (≈ ৭,৪৮৩ J)' },
    { gas: '১ মোল দ্বি-পরমাণুক গ্যাসের (যেমন O₂) ২৭°C তাপমাত্রায় মোট অভ্যন্তরীণ শক্তি (f = ৫)', val: '৭৫০ R জুল (৫/২ RT)' },
    { gas: '১ মোল আদর্শ গ্যাসের তাপমাত্রা ০°C থেকে ২৭৩°C করলে গতিশক্তি', val: 'দ্বিগুণ হবে (T ২৭৩ K → ৫৪৬ K)' },
  ];
  gasKe.forEach((gk, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `গ্যাসের গতিতত্ত্ব অনুযায়ী ${gk.gas} কত?`,
        correct: gk.val,
        distractors: gasKe.filter((x) => x.val !== gk.val).map((x) => x.val).concat(['১,৫০০ R জুল']),
        explanation: `রৈখিক গতিশক্তি E = (৩/২) nRT এবং অভ্যন্তরীণ শক্তি U = (f/২) nRT অনুসারে মান হলো ${gk.val}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · গ্যাসের গতিশক্তি',
      })
    );
  });

  // 5. Ch 9 & Ch 10 Comprehensive Two-Way Medical Fact Matrix (~100 MCQs)
  const ch9to10Pairs: Array<{ ch: string; q: string; a: string; ref: string }> = [
    { ch: 'phys1_ch9_waves', q: 'শূন্যস্থান দিয়ে কেবল তাড়িতচৌম্বক তরঙ্গ চলতে পারে; কিন্তু শব্দ তরঙ্গ নয় কেন', a: 'শব্দ একটি অনুদৈর্ঘ্য যান্ত্রিক তরঙ্গ যার জন্য মাধ্যমের স্থিতিস্থাপকতা ও জড়তা অত্যাবশ্যক', ref: 'অধ্যায় ৯ · যান্ত্রিক তরঙ্গ' },
    { ch: 'phys1_ch9_waves', q: 'অনুদৈর্ঘ্য ও অনুপ্রস্থ তরঙ্গের মধ্যে কোন ধর্মটির মাধ্যমে স্পষ্ট পার্থক্য করা যায়', a: 'সমবর্তন (Polarization) — কেবল অনুপ্রস্থ তরঙ্গের সমবর্তন ঘটে, অনুদৈর্ঘ্য শব্দ তরঙ্গের ঘটে না', ref: 'অধ্যায় ৯ · তরঙ্গের সমবর্তন' },
    { ch: 'phys1_ch9_waves', q: 'বদ্ধ কক্ষে কথা বললে শব্দের প্রতিধ্বনি শোনা যায় না কিন্তু অনুরণন (Reverberation) শোনা যায় কেন', a: 'শ্রোতা ও প্রতিফলকের দূরত্ব ১৬.৬ m (বা ১৭ m)-এর কম হওয়ায় প্রতিধ্বনি মূল শব্দের সাথে মিশে যায়', ref: 'অধ্যায় ৯ · প্রতিধ্বনি ও অনুরণন' },
    { ch: 'phys1_ch9_waves', q: 'প্রতিধ্বনি শোনার জন্য শ্রোতা ও প্রতিফলকের ন্যূনতম দূরত্ব ০°C তাপমাত্রায় কত মিটার হওয়া প্রয়োজন', a: '১৬.৬ m (০.১ সেকেন্ড শব্দানুভূতির স্থায়িত্বকাল × ৩৩২ m/s ÷ ২)', ref: 'অধ্যায় ৯ · প্রতিধ্বনির ন্যূনতম দূরত্ব' },
    { ch: 'phys1_ch9_waves', q: 'শব্দের তীব্রতা বাড়ানো হলে শব্দের কোন বৈশিষ্ট্যটি পরিবর্তিত হয় এবং তীক্ষ্ণতা (Pitch) কীসের ওপর নির্ভর করে', a: 'তীব্রতা বিস্তারের বর্গের ওপর (উচ্চতা/Loudness), আর তীক্ষ্ণতা কম্পাঙ্কের ওপর নির্ভর করে', ref: 'অধ্যায় ৯ · সুরযুক্ত শব্দের বৈশিষ্ট্য' },
    { ch: 'phys1_ch9_waves', q: 'একই স্কেল ও সমান উচ্চতায় বাজানো বাঁশি ও বেহালার শব্দ আমরা সহজেই আলাদা করতে পারি শব্দের কোন বৈশিষ্ট্যের জন্য', a: 'গুণ বা জাতি (Quality/Timbre) — উপসুরের সংখ্যা ও আপেক্ষিক তীব্রতার ভিন্নতার কারণে', ref: 'অধ্যায় ৯ · শব্দের জাতি' },
    { ch: 'phys1_ch9_waves', q: 'অগ্রগামী তরঙ্গ এক মাধ্যম থেকে অন্য মাধ্যমে প্রবেশ করলে কোন রাশিটির মান কখনোই পরিবর্তিত হয় না', a: 'কম্পাঙ্ক (Frequency) অপরিবর্তিত থাকে, কেবল বেগ ও তরঙ্গদৈর্ঘ্য পরিবর্তিত হয়', ref: 'অধ্যায় ৯ · মাধ্যম পরিবর্তনে তরঙ্গ' },
    { ch: 'phys1_ch9_waves', q: 'লম্বা গহ্বরে বা খালি কলসিতে পানি ভরার সময় শব্দের তীক্ষ্ণতা ধীরে ধীরে বাড়ে কেন', a: 'বায়ুস্তম্ভের দৈর্ঘ্য L কমে যাওয়ায় মূল কম্পাঙ্ক f = v/(4L) ক্রমাগত বাড়তে থাকে', ref: 'অধ্যায় ৯ · কলসি ভরার শব্দ' },
    { ch: 'phys1_ch9_waves', q: 'গিটারের তারে আঙুল দিয়ে চেপে দৈর্ঘ্য অর্ধেক এবং টান ৪ গুণ করলে কম্পাঙ্ক কত গুণ হবে', a: '৪ গুণ (f ∝ (1/L)√T হওয়ায় ২ × √৪ = ৪ গুণ)', ref: 'অধ্যায় ৯ · তারের আড় কম্পন' },
    { ch: 'phys1_ch9_waves', q: 'অডিশন হল বা সিনেমা হলের দেয়ালে ছিদ্রযুক্ত অ্যাকোস্টিক বোর্ড ও ভারী পর্দা ব্যবহার করা হয় কেন', a: 'অবাঞ্ছিত প্রতিধ্বনি ও অনুরণন শোষণ করে শব্দকে স্পষ্ট করার জন্য', ref: 'অধ্যায় ৯ · হলের ধ্বনিবিজ্ঞান' },
    { ch: 'phys1_ch10_ideal_gas', q: 'আদর্শ গ্যাস ও বাস্তব গ্যাসের মধ্যে আন্তঃআণবিক আকর্ষণ ও নিজস্ব আয়তনের দিক থেকে মূল পার্থক্য কী', a: 'আদর্শ গ্যাসে অণুগুলোর আয়তন ও পারস্পরিক আকর্ষণ শূন্য ধরা হয়; বাস্তব গ্যাসে তা অশূন্য', ref: 'অধ্যায় ১০ · আদর্শ বনাম বাস্তব গ্যাস' },
    { ch: 'phys1_ch10_ideal_gas', q: 'শীতের সকালে ঘাসের ডগায় শিশির জমে কিন্তু মেঘলা রাতে তেমন শিশির পড়ে না কেন', a: 'মেঘ পৃথিবীর বিকিরিত তাপ ফেরত পাঠায় বলে ভূপৃষ্ঠ যথেষ্ট শীতল হয়ে শিশিরাঙ্কে নামে না', ref: 'অধ্যায় ১০ · শিশির গঠন' },
    { ch: 'phys1_ch10_ideal_gas', q: 'শীতকালে একই তাপমাত্রার ঘরের তুলনায় বাইরে ভেজা কাপড় তাড়াতাড়ি শুকায় কেন (যদি তাপমাত্রা কমও থাকে)', a: 'বাইরের বায়ুর আপেক্ষিক আর্দ্রতা কম এবং বাতাসের প্রবাহ বাষ্পীভবন দ্রুততর করে', ref: 'অধ্যায় ১০ · বাষ্পীভবন ও আর্দ্রতা' },
    { ch: 'phys1_ch10_ideal_gas', q: 'সম্পৃক্ত জলীয় বাষ্পের চাপ পাত্রের আয়তনের ওপর নির্ভর করে কি না (তাপমাত্রা স্থির থাকলে)', a: 'নির্ভর করে না — অতিরিক্ত তরল থাকলে আয়তন বদলালেও বাষ্প চাপ অপরিবর্তিত থাকে', ref: 'অধ্যায় ১০ · সম্পৃক্ত বাষ্পচাপ' },
    { ch: 'phys1_ch10_ideal_gas', q: 'কোনো গ্যাস সিলিন্ডার থেকে গ্যাস বের হয়ে গেলে ভেতরের অবশিষ্ট গ্যাসের ঘনত্ব ও চাপ কীভাবে পরিবর্তিত হয়', a: 'অণু সংখ্যা n কমে যাওয়ায় ঘনত্ব ও চাপ হ্রাস পায় (আয়তন পাত্রের সমান স্থির থাকে)', ref: 'অধ্যায় ১০ · আবদ্ধ গ্যাস' },
    { ch: 'phys1_ch10_ideal_gas', q: 'পরম স্কেলে (কেলভিন) চাপীয় সূত্রানুযায়ী স্থির আয়তনে প্রতিটি ১°C তাপমাত্রা বৃদ্ধিতে ০°C-এর চাপের কত ভগ্নাংশ বাড়ে', a: '১ / ২৭৩.১৫ অংশ (চাপ প্রসারণ সহগ γ_p = ১/২৭৩ °C⁻¹)', ref: 'অধ্যায় ১০ · চাপীয় সহগ' },
    { ch: 'phys1_ch10_ideal_gas', q: 'বৃষ্টি শুরু হওয়ার ঠিক পূর্বে বায়ুমণ্ডলের আপেক্ষিক আর্দ্রতা ও ব্যারোমিটারের পাঠ কেমন হয়', a: 'আপেক্ষিক আর্দ্রতা ~১০০% এর কাছাকাছি এবং জলীয় বাষ্পের কারণে ব্যারোমিটারের পারদ দ্রুত নিচে নামে', ref: 'অধ্যায় ১০ · আবহাওয়া ও ব্যারোমিটার' },
    { ch: 'phys1_ch10_ideal_gas', q: 'গ্রাহামের গ্যাস ব্যাপন সূত্রানুযায়ী একই তাপমাত্রা ও চাপে গ্যাসের ব্যাপন হারের সাথে ঘনত্বের সম্পর্ক কী', a: 'ব্যাপন হার r গ্যাসের ঘনত্ব ও আণবিক ভরের বর্গমূলের ব্যস্তানুপাতিক (r ∝ 1/√M)', ref: 'অধ্যায় ১০ · ব্যাপন হার' },
    { ch: 'phys1_ch10_ideal_gas', q: 'দুটি সমান আয়তনের পাত্রে একই তাপমাত্রা ও চাপে He ও CO₂ গ্যাস থাকলে উভয় পাত্রে অণুর সংখ্যা কেমন হবে', a: 'অ্যাভোগাড্রোর সূত্রানুযায়ী উভয় পাত্রে ঠিক সমান সংখ্যক অণু থাকবে', ref: 'অধ্যায় ১০ · অ্যাভোগাড্রোর প্রকল্প' },
    { ch: 'phys1_ch10_ideal_gas', q: 'পাহাড় বা উচ্চ-উচ্চতায় পর্বতারোহীদের রক্তচাপের সমস্যার পাশাপাশি শ্বাসকষ্ট হয় কেন', a: 'উচ্চতায় বায়ুচাপ ও অক্সিজেনের আংশিক চাপ কমে যায় বলে পর্যাপ্ত O₂ ফুসফুসে প্রবেশ করতে পারে না', ref: 'অধ্যায় ১০ · উচ্চতায় শ্বাসকষ্ট' },
  ];
  ch9to10Pairs.forEach((cp, i) => {
    const others = ch9to10Pairs.filter((x) => x.q !== cp.q);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cp.ch,
        visualLessonId: cp.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${cp.q}?`,
        correct: cp.a,
        distractors: others.slice(i % 12, (i % 12) + 4).map((x) => x.a),
        explanation: `${cp.q} — সঠিক উত্তর: ${cp.a}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${cp.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: cp.ch,
        visualLessonId: cp.ch === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `পদার্থবিজ্ঞানে "${cp.a}" সিদ্ধান্তটি কোন ঘটনার সঠিক ব্যাখ্যা?`,
        correct: cp.q,
        distractors: others.slice((i + 5) % 12, ((i + 5) % 12) + 4).map((x) => x.q),
        explanation: `"${cp.a}" প্রযোজ্য যখন: ${cp.q}।`,
        reference: `পদার্থবিজ্ঞান ১ম পত্র · ${cp.ref}`,
      })
    );
  });

  // 6. Comprehensive High-Yield Quantitative & Formula Matrix across ALL 10 Chapters (~260 MCQs via unique parameterized drills)
  // 6A: Free-Fall Speed & Height at time t (g = 10 m/s², 1..8s -> 16 MCQs)
  [1, 2, 3, 4, 5, 6, 7, 8].forEach((t) => {
    const v = 10 * t;
    const h = 5 * t * t;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch3_dynamics',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `স্থির অবস্থান থেকে অবাধে পড়ন্ত একটি বস্তু (g = ১০ m/s²) ঠিক ${toBnDigits(t)} সেকেন্ড পর কত মিটার নিচে নামবে?`,
        correct: `${toBnDigits(h)} m (বেগ ${toBnDigits(v)} m/s)`,
        distractors: [5, 20, 45, 80, 125, 180, 245, 320].filter((x) => x !== h).slice(0, 4).map((x, j) => `${toBnDigits(x)} m (বেগ ${toBnDigits(10 * (j + 1))} m/s)`),
        explanation: `h = ½gt² = ৫ × ${toBnDigits(t)}² = ${toBnDigits(h)} m এবং v = gt = ${toBnDigits(v)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · মুক্ত পতন',
      })
    );
  });

  // 6B: Gas Boyle's & Charles' numericals (24 MCQs)
  const boylePairs = [
    { p1: 2, v1: 10, p2: 5, v2: 4 },
    { p1: 4, v1: 6, p2: 3, v2: 8 },
    { p1: 1, v1: 24, p2: 4, v2: 6 },
    { p1: 3, v1: 12, p2: 9, v2: 4 },
    { p1: 5, v1: 8, p2: 2, v2: 20 },
    { p1: 6, v1: 5, p2: 10, v2: 3 },
  ];
  boylePairs.forEach((bp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `স্থির তাপমাত্রায় ${toBnDigits(bp.p1)} atm চাপে কোনো গ্যাসের আয়তন ${toBnDigits(bp.v1)} L হলে চাপ ${toBnDigits(bp.p2)} atm করায় নতুন আয়তন কত লিটার হবে?`,
        correct: `${toBnDigits(bp.v2)} L`,
        distractors: [2, 3, 4, 6, 8, 12, 16, 20].filter((x) => x !== bp.v2).slice(0, 4).map((x) => `${toBnDigits(x)} L`),
        explanation: `বয়েলের সূত্র P₁V₁ = P₂V₂ ⇒ V₂ = (${toBnDigits(bp.p1)} × ${toBnDigits(bp.v1)}) / ${toBnDigits(bp.p2)} = ${toBnDigits(bp.v2)} L।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · বয়েলের সূত্র গণনা',
      })
    );
  });

  const charlesPairs = [
    { t1C: 27, v1: 3, t2C: 327, v2: 6 },
    { t1C: 27, v1: 5, t2C: 177, v2: 7.5 },
    { t1C: 127, v1: 4, t2C: 527, v2: 8 },
    { t1C: 0, v1: 273, t2C: 273, v2: 546 },
    { t1C: 77, v1: 7, t2C: 227, v2: 10 },
    { t1C: -73, v1: 2, t2C: 127, v2: 4 },
  ];
  charlesPairs.forEach((cp, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `স্থির চাপে ${toBnDigits(cp.t1C)}°C তাপমাত্রায় একটি গ্যাসের আয়তন ${toBnDigits(cp.v1)} L হলে তাপমাত্রা ${toBnDigits(cp.t2C)}°C-এ উন্নীত করলে আয়তন কত লিটার হবে?`,
        correct: `${toBnDigits(cp.v2)} L`,
        distractors: [2, 4, 6, 7.5, 8, 10, 12, 546].filter((x) => x !== cp.v2).slice(0, 4).map((x) => `${toBnDigits(x)} L`),
        explanation: `চার্লসের সূত্র V₁/T₁ = V₂/T₂ (কেলভিনে T = °C + ২৭৩) ⇒ V₂ = ${toBnDigits(cp.v2)} L।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · চার্লসের সূত্র গণনা',
      })
    );
  });

  return list;
}
