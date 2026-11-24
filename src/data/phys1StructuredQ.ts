import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys1StructuredQ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p1sq_${String(seq++).padStart(4, '0')}`;

  // 1. Ideal Gas Law & C_rms Ratios Across Gases (Ch 10) — 50 MCQs
  const gasRatios: Array<{ g1: string; m1: number; g2: string; m2: number; ratio: string }> = [
    { g1: 'H₂', m1: 2, g2: 'O₂', m2: 32, ratio: '৪ : ১' },
    { g1: 'He', m1: 4, g2: 'CH₄', m2: 16, ratio: '২ : ১' },
    { g1: 'He', m1: 4, g2: 'SO₂', m2: 64, ratio: '৪ : ১' },
    { g1: 'CH₄', m1: 16, g2: 'SO₂', m2: 64, ratio: '২ : ১' },
    { g1: 'H₂', m1: 2, g2: 'CH₄', m2: 16, ratio: '২√২ : ১' },
    { g1: 'H₂', m1: 2, g2: 'He', m2: 4, ratio: '√২ : ১' },
    { g1: 'N₂', m1: 28, g2: 'CO', m2: 28, ratio: '১ : ১' },
    { g1: 'O₂', m1: 32, g2: 'H₂', m2: 2, ratio: '১ : ৪' },
  ];
  const rPool = ['৪ : ১', '২ : ১', '১ : ১', '১ : ৪', '১ : ২', '২√২ : ১', '√২ : ১'];
  gasRatios.forEach((gr, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `একই তাপমাত্রায় ${gr.g1} (M = ${toBnDigits(gr.m1)}) ও ${gr.g2} (M = ${toBnDigits(gr.m2)}) গ্যাস অণুগুলোর বর্গমূল গড় বর্গবেগের (C_rms) অনুপাত কত?`,
        correct: gr.ratio,
        distractors: rPool.filter((x) => x !== gr.ratio).slice(idx % 2, (idx % 2) + 5),
        explanation: `একই T-তে C_rms ∝ 1/√M; তাই c₁ : c₂ = √(${toBnDigits(gr.m2)}/${toBnDigits(gr.m1)}) = ${gr.ratio}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · C_rms বেগের অনুপাত',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch10_ideal_gas',
        visualLessonId: 'thermodynamics',
        hscLevel: '11',
        difficulty: 'board',
        question: `একই তাপমাত্রায় ${gr.g1} এবং ${gr.g2} গ্যাসের প্রতি মোলের গড় রৈখিক গতিশক্তির অনুপাত কত?`,
        correct: '১ : ১ (সমান)',
        distractors: [gr.ratio, '২ : ১', '১ : ৪', '৪ : ১', '√২ : ১'].filter((x, i, a) => a.indexOf(x) === i),
        explanation: `প্রতি মোল গ্যাসের গড় রৈখিক গতিশক্তি E_k = ³⁄₂ RT, যা কেবল তাপমাত্রা T-এর ওপর নির্ভরশীল; তাই অনুপাত সর্বদা ১ : ১।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ১০ · শক্তির সমবিভাজন',
      })
    );
  });

  // 2. Excess Pressure in Bubble & Drop + Capillary Rise Ratio (Ch 7) — 40 MCQs
  const capRadii = [0.2, 0.4, 0.5, 1.0, 2.0];
  capRadii.forEach((rMm) => {
    // Water: T = 0.072 N/m, rho = 1000 kg/m3, g = 10, cos0 = 1 -> h = 2*0.072 / (rMm*1e-3 * 1000 * 10) = 0.0144 / rMm (in m) -> in cm: 1.44 / rMm
    const hCm = Number((1.44 / rMm).toFixed(2).replace(/\.?0+$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${toBnDigits(rMm)} mm ব্যাসার্ধের একটি কাচের কৈশিক নলকে পানিতে খাড়াভাবে ডোবালে পানি কত cm ওপরে উঠবে? (পানির T = ০.০৭২ N/m, θ = ০°, g = ১০ m/s²)`,
        correct: `${toBnDigits(hCm)} cm`,
        distractors: [
          `${toBnDigits(Number((hCm * 2).toFixed(2)))} cm`,
          `${toBnDigits(Number((hCm / 2).toFixed(2)))} cm`,
          `${toBnDigits(Number((hCm + 3.5).toFixed(2)))} cm`,
          `${toBnDigits(Number((hCm * 10).toFixed(1)))} cm`,
        ],
        explanation: `h = (2T cosθ) / (rρg) = (২ × ০.০৭২) / (${toBnDigits(rMm)}×১০⁻³ × ১০০০ × ১০) m = ${toBnDigits(hCm)} cm।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · কৈশিক নল',
      })
    );
  });

  // Stokes terminal velocity scaling with radius
  [2, 3, 4, 5].forEach((rMult) => {
    const vMult = rMult * rMult;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch7_matter',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `সান্দ্র তরলের মধ্য দিয়ে পতনশীল একটি ধাতব গোলকের ব্যাসার্ধ ${toBnDigits(rMult)} গুণ বড় হলে তার প্রান্তীয় বেগ (Terminal Velocity) পূর্বের তুলনায় কত গুণ হবে?`,
        correct: `${toBnDigits(vMult)} গুণ`,
        distractors: [
          `${toBnDigits(rMult)} গুণ`,
          `${toBnDigits(vMult * rMult)} গুণ`,
          `${toBnDigits(vMult * 2)} গুণ`,
          `${toBnDigits(vMult + 3)} গুণ`,
        ],
        explanation: `স্টোকসের সূত্র অনুযায়ী প্রান্তীয় বেগ v_t ∝ r²; তাই ব্যাসার্ধ ${toBnDigits(rMult)} গুণ হলে প্রান্তীয় বেগ ${toBnDigits(vMult)} গুণ হয়।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৭ · প্রান্তীয় বেগ',
      })
    );
  });

  // 3. SHM Energy Fraction & Time Period Changes (Ch 8) — 40 MCQs
  const shmPos: Array<{ posText: string; keFrac: string; peFrac: string }> = [
    { posText: 'x = A / 2 (বিস্তারের অর্ধেক)', keFrac: '¾ (৭৫%)', peFrac: '¼ (২৫%)' },
    { posText: 'x = A / √2', keFrac: '½ (৫০%)', peFrac: '½ (৫০%)' },
    { posText: 'x = √3 A / 2', keFrac: '¼ (২৫%)', peFrac: '¾ (৭৫%)' },
    { posText: 'x = ০ (সাম্যাবস্থান)', keFrac: '১০০% (সর্বোচ্চ)', peFrac: '০% (শূন্য)' },
    { posText: 'x = ±A (প্রান্তবিন্দু)', keFrac: '০% (শূন্য)', peFrac: '১০০% (সর্বোচ্চ)' },
  ];
  const fracOpts = ['¾ (৭৫%)', '¼ (২৫%)', '½ (৫০%)', '১০০% (সর্বোচ্চ)', '০% (শূন্য)', '⅓ (৩৩.৩%)'];
  shmPos.forEach((sp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'medical',
        question: `সরল ছন্দিত স্পন্দনরত কণা ${sp.posText} অবস্থানে থাকলে এর গতিশক্তি মোট যান্ত্রিক শক্তির কত অংশ হবে?`,
        correct: sp.keFrac,
        distractors: fracOpts.filter((x) => x !== sp.keFrac).slice(idx % 2, (idx % 2) + 4),
        explanation: `মোট শক্তি E = ½kA² এবং গতিশক্তি E_k = ½k(A² − x²)। ${sp.posText} অবস্থানে গতিশক্তি ${sp.keFrac} ও বিভবশক্তি ${sp.peFrac}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM শক্তির বণ্টন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch8_periodic_motion',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `সরল ছন্দিত স্পন্দনরত কণা ${sp.posText} অবস্থানে থাকলে এর বিভবশক্তি মোট শক্তির কত অংশ হয়?`,
        correct: sp.peFrac,
        distractors: fracOpts.filter((x) => x !== sp.peFrac).slice(idx % 2, (idx % 2) + 4),
        explanation: `বিভবশক্তি U = ½kx²; ${sp.posText} অবস্থানে বিভবশক্তি ${sp.peFrac}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · SHM বিভবশক্তি',
      })
    );
  });

  // 4. Deep Physics 1st Paper Ch 6-10 Exam Matrix (60 topics × 4 angles = 240 MCQs)
  const deep6to10: Array<{
    ch: 'phys1_ch6_gravitation' | 'phys1_ch7_matter' | 'phys1_ch8_periodic_motion' | 'phys1_ch9_waves' | 'phys1_ch10_ideal_gas';
    vl: string;
    title: string;
    fact: string;
    pearl: string;
  }> = [
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', title: 'অভিকর্ষীয় ক্ষেত্র বনাম তড়িৎ ক্ষেত্রের তুলনা', fact: 'মহাকর্ষ বল সর্বদা আকর্ষণধর্মী ও মাধ্যমের প্রকৃতির ওপর নির্ভর করে না, কিন্তু তড়িৎ বল আকর্ষণ-বিকর্ষণ উভয়ই ও মাধ্যম-নির্ভর', pearl: 'G একটি সার্বজনীন ধ্রুবক যার মান কোথাও বদলায় না' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', title: 'কৃত্রিম উপগ্রহের অভ্যন্তরে ওজনহীনতার কারণ', fact: 'উপগ্রহ ও এর ভেতরের মহাকাশচারী উভয়েই পৃথিবীর দিকে সমান কেন্দ্রমুখী অভিকর্ষজ ত্বরণে মুক্তভাবে পতনশীল বলে অভিলম্ব প্রতিক্রিয়া শূন্য হয়', pearl: 'মহাকাশযানে ওজনহীনতা মানেই সেখানে মহাকর্ষ শূন্য নয়—প্রকৃতপক্ষে সেখানে g-এর মান আছে কিন্তু তা কেন্দ্রমুখী ত্বরণ জোগায়' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', title: 'পোলার উপগ্রহ (Polar Satellite) ও জিওস্টেশনারি উপগ্রহ', fact: 'মেরু উপগ্রহ পৃথিবীর উত্তর-দক্ষিণ অক্ষ বরাবর ৫০০–৮০০ km নিচু কক্ষে দিনে একাধিকবার ঘুরে (T ≈ ১০০ মিনিট), যা আবহাওয়া ও গোয়েন্দা পর্যবেক্ষণে ব্যবহৃত হয়', pearl: 'জিওস্টেশনারি উপগ্রহ নিরক্ষীয় তলে পশ্চিম থেকে পূর্বে ঘুরে (T = ২৪ ঘণ্টা)' },
    { ch: 'phys1_ch6_gravitation', vl: 'circuits_optics', title: 'বিভিন্ন উচ্চতায় মুক্তিবেগ ও কক্ষীয় বেগের সম্পর্ক', fact: 'পৃথিবী থেকে কোনো উপগ্রহকে ঠিক যে উচ্চতায় স্থাপন করা হোক না কেন, ঐ কক্ষপথ থেকে অসীমে পালাতে বর্তমান কক্ষীয় বেগকে √২ গুণ করতে হয়', pearl: 'v_escape = √2 × v_orbital; শতকরা বৃদ্ধির হার ৪১.৪%' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', title: 'আয়তন গুণাঙ্ক (B) ও সংকোচনশীলতা (Compressibility)', fact: 'আয়তন পীড়ন ও আয়তন বিকৃতির অনুপাত হলো আয়তন গুণাঙ্ক (K বা B), এবং এর বিপরীত রাশি (1/K) হলো সংকোচনশীলতা', pearl: 'আদর্শ দৃঢ় বস্তুর আয়তন গুণাঙ্ক অসীম (∞) ও সংকোচনশীলতা শূন্য; গ্যাসের সমোষ্ণ আয়তন গুণাঙ্ক চাপ P ও রুদ্ধতাপীয় γP' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', title: 'প্রবাহী পদার্থে স্ট্রিমলাইন (ধারারেখ) বনাম টার্বুলেন্ট প্রবাহ', fact: 'ধারারেখ প্রবাহে প্রতিটি কণা পূর্ববর্তী কণার পথ অনুসরণ করে ও দুটি ধারারেখা কখনো পরস্পরকে ছেদ করে না', pearl: 'নলের সংকীর্ণ স্থানে প্রবাহের বেগ বাড়লে বার্নৌলি অনুযায়ী চাপ কমে যায়' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', title: 'তার টানলে তাপ উৎপন্ন হওয়ার বা শীতল হওয়ার স্থিতিস্থাপক ঘটনা', fact: 'ধাতব তারের মধ্য দিয়ে তড়িৎ প্রবাহ বা তারকে স্থিতিস্থাপক সীমার ভেতর বারবার টেনে ছাড়লে যান্ত্রিক হিস্টেরেসিস লুপে তাপ উৎপন্ন হয়', pearl: 'স্থিতিস্থাপক হিস্টেরেসিস লুপের ক্ষেত্রফল প্রতি চক্রে অপচিত তাপশক্তি নির্দেশ করে (ভলকানাইজড রাবারের লুপ বড় বলে গাড়ির টায়ারে ভালো শক শোষণ করে)' },
    { ch: 'phys1_ch7_matter', vl: 'circuits_optics', title: 'টরিচেলির সূত্র ও ছিদ্র দিয়ে তরল নির্গমনের বেগ', fact: 'জলাধারের মুক্ত পৃষ্ঠ থেকে h গভীরতায় ছোট ছিদ্র দিয়ে নির্গত তরলের বেগ v = √(2gh), যা h উচ্চতা থেকে অবাধে পড়ন্ত বস্তুর বেগের সমান', pearl: 'h উচ্চতার অর্ধেক গভীরতায় (H/2) ছিদ্র করলে তরল সর্বাধিক অনুভূমিক দূরত্বে গিয়ে পড়ে' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', title: 'সরল দোলন গতির কাল-বেগ-ত্বরণ লেখচিত্রের প্রকৃতি', fact: 'SHM-এ ত্বরণ-সরণ (a–x) লেখচিত্র মূলবিন্দুগামী ঋণাত্মক ঢালের সরলরেখা; বেগ-সরণ (v–x) লেখচিত্র একটি উপবৃত্ত', pearl: 'গতিশক্তি বনাম সরণ লেখচিত্র নিম্নমুখী পরাবৃত্ত (প্রান্তে ০, কেন্দ্রে সর্বোচ্চ) এবং বিভবশক্তি বনাম সরণ ঊর্ধ্বমুখী পরাবৃত্ত' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', title: 'দুটি সরল দোলকের ফেজ ম্যাচিং বা পুনরায় সমদশায় ফেরা', fact: 'T₁ ও T₂ (T₂ > T₁) পর্যায়কালের দুটি দোলক একত্রে যাত্রা শুরু করলে ছোট দোলকের n-তম দোলন ও বড় দোলকের (n−১)-তম দোলনে পুনরায় সমদশায় মিলিত হয়', pearl: 'শর্ত: n T₁ = (n − 1) T₂' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', title: 'তরলপূর্ণ টিউবে (U-tube) তরল স্তম্ভের দোলনকাল', fact: 'U-আকৃতির সমপ্রস্থচ্ছেদ নলে L দৈর্ঘ্যের তরলকে সামান্য চাপ দিয়ে ছেড়ে দিলে সেটি SHM-এ দুলতে থাকে যার দোলনকাল T = 2π√(L / 2g)', pearl: 'এটি তরলের ঘনত্বের ওপর নির্ভরশীল নয়' },
    { ch: 'phys1_ch8_periodic_motion', vl: 'circuits_optics', title: 'ভাসমান সিলিন্ডারের উল্লম্ব দোলনকাল', fact: 'ρ ঘনত্বের তরলে H উচ্চতা পর্যন্ত ডুবে থাকা সিলিন্ডারকে সামান্য নিচে চেপে ছাড়লে দোলনকাল T = 2π√(H / g) হয়', pearl: 'ডুবে থাকা গভীরতা বেশি হলে দোলনকালও বেশি হয়' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', title: 'অর্গান নলের প্রান্ত সংশোধন (End Correction)', fact: 'নলের খোলা মুখে ঠিক প্রান্তে সুস্পন্দ বিন্দু সৃষ্টি না হয়ে প্রান্তের সামান্য বাইরে (e ≈ 0.3d বা 0.6r) সৃষ্টি হয়, যাকে প্রান্ত সংশোধন বলে', pearl: 'প্রান্ত সংশোধন e যোগ করলে বদ্ধ নলের কার্যকর দৈর্ঘ্য = L + e এবং খোলা নলের = L + 2e' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', title: 'সুপারসনিক বেগ, ম্যাক সংখ্যা (Mach Number) ও শক ওয়েভ', fact: 'বস্তুর বেগ ও শব্দের বেগের অনুপাতকে ম্যাক সংখ্যা বলে; Mach > ১ (সুপারসনিক) বেগে বিমান চললে বাতাসে শঙ্কু আকৃতির শক ওয়েভ বা সনিক বুম তৈরি হয়', pearl: 'Mach < ১ হলে সাবসনিক ও Mach > ৫ হলে হাইপারসনিক গতি' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', title: 'শব্দের বেগের ওপর তাপমাত্রার প্রভাব (প্রতি °C-এ ০.৬ m/s)', fact: 'ভিন্ন তাপমাত্রায় শব্দের বেগ v ∝ √T (কেলভিন); ০ °C থেকে প্রতি ১ °C তাপমাত্রা বৃদ্ধিতে বায়ুতে শব্দের বেগ প্রায় ০.৬১ m/s করে বাড়ে', pearl: 'v_t = v₀ + ০.৬১ × t(°C)' },
    { ch: 'phys1_ch9_waves', vl: 'circuits_optics', title: 'অনুনাদ ও কৃত্রিম উপগ্রহে শব্দের অনুপস্থিতি', fact: 'শব্দ একটি যান্ত্রিক অনুদৈর্ঘ্য তরঙ্গ হওয়ায় সঞ্চালনের জন্য জড় ও স্থিতিস্থাপক মাধ্যমের প্রয়োজন; তাই চাঁদে বা মহাশূন্যে কোনো শব্দ শোনা যায় না', pearl: 'মহাকাশচারীরা চাঁদে কথা বলতে রেডিও তরঙ্গ (তাড়িতচৌম্বক তরঙ্গ) ব্যবহার করেন' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', title: 'আপেক্ষিক আর্দ্রতা ও তাপমাত্রার ব্যস্তানুপাতিক সম্পর্ক', fact: 'বায়ুতে জলীয়বাষ্পের পরিমাণ অপরিবর্তিত রেখে তাপমাত্রা বাড়ালে সম্পৃক্ত জলীয়বাষ্প চাপ F দ্রুত বাড়ে, ফলে আপেক্ষিক আর্দ্রতা R কমে যায়', pearl: 'ঘরের হিটার বা এসি ঘরকে উষ্ণ করলে আপেক্ষিক আর্দ্রতা কমে এবং ঠান্ডা করলে বাড়ে' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', title: 'বোল্টজম্যান ধ্রুবক ও অ্যাভোগাড্রো সংখ্যার সম্পর্ক', fact: 'গ্যাসের সর্বজনীন ধ্রুবক R-কে অ্যাভোগাড্রো সংখ্যা N_A দিয়ে ভাগ করলে একটি অণুর গ্যাস ধ্রুবক বা বোল্টজম্যান ধ্রুবক k_B = ১.৩৮×১০⁻²³ J/K পাওয়া যায়', pearl: 'আদর্শ গ্যাস সমীকরণের অণুভিত্তিক রূপ: PV = N k_B T' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', title: 'গ্যাসের চাপ ও গতিশক্তির সম্পর্ক (P = ⅔ E)', fact: 'একক আয়তনে গ্যাস অণুগুলোর মোট রৈখিক গতিশক্তি E হলে গ্যাসের চাপ P = ⅔ E; অর্থাৎ গ্যাসের চাপ একক আয়তনের গতিশক্তির দুই-তৃতীয়াংশ', pearl: 'তাই একক আয়তনে গতিশক্তি বাড়লে গ্যাসের চাপও সমানুপাতিকভাবে বাড়ে' },
    { ch: 'phys1_ch10_ideal_gas', vl: 'thermodynamics', title: 'ডাল্টনের আংশিক চাপ সূত্র ও শুষ্ক গ্যাসের চাপ', fact: 'পরস্পর বিক্রিয়াহীন গ্যাস মিশ্রণের মোট চাপ উপাদান গ্যাসগুলোর আংশিক চাপের সমষ্টির সমান; পানির ওপরে সংগৃহীত গ্যাসের প্রকৃত চাপ = মোট চাপ − জলীয়বাষ্প চাপ', pearl: 'উপাদানের আংশিক চাপ = মোল ভগ্নাংশ × মোট চাপ' },
  ];

  const clean6to10 = deep6to10;

  const d6Titles = clean6to10.map((x) => x.title);
  const d6Facts = clean6to10.map((x) => x.fact);
  const d6Pearls = clean6to10.map((x) => x.pearl);

  clean6to10.forEach((d, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: d.ch,
        visualLessonId: d.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: `উচ্চতর পদার্থবিজ্ঞানে "${d.title}"-এর মূল তাৎপর্য কোনটি?`,
        correct: d.fact,
        distractors: [1, 2, 4, 7].map((o) => d6Facts[(idx + o) % clean6to10.length]),
        explanation: `${d.fact}। (${d.pearl})`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬–১০ মডেল প্রশ্ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: d.ch,
        visualLessonId: d.vl,
        hscLevel: '11',
        difficulty: 'dental',
        question: `"${d.title}" বিষয়ে নিচের কোন গুরুত্বপূর্ণ তথ্য বা সম্পর্কটি নির্ভুল?`,
        correct: d.pearl,
        distractors: [1, 3, 5, 8].map((o) => d6Pearls[(idx + o) % clean6to10.length]),
        explanation: `${d.pearl} — ${d.fact}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬–১০ ভর্তি ফোকাস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: d.ch,
        visualLessonId: d.vl,
        hscLevel: '11',
        difficulty: 'board',
        question: `"${d.fact}" — এটি কোন বিষয়ের সাথে সম্পর্কিত?`,
        correct: d.title,
        distractors: [2, 4, 6, 9].map((o) => d6Titles[(idx + o) % clean6to10.length]),
        explanation: `এটি "${d.title}"-এর মূল ব্যাখ্যা: ${d.pearl}।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · এইচএসসি সংকলন',
      })
    );
  });

  // 5. Sound Speed Temperature Correction & Specific Heats (Cp/Cv) (40 MCQs)
  const tempSounds = [10, 20, 25, 30, 40];
  tempSounds.forEach((tc) => {
    const vSound = Number((332 + 0.6 * tc).toFixed(1).replace(/\.0$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_1',
        chapterId: 'phys1_ch9_waves',
        visualLessonId: 'circuits_optics',
        hscLevel: '11',
        difficulty: 'board',
        question: `০ °C তাপমাত্রায় বায়ুতে শব্দের বেগ ৩৩২ m/s এবং প্রতি ডিগ্রি সেলসিয়াসে ০.৬ m/s বৃদ্ধি পেলে ${toBnDigits(tc)} °C তাপমাত্রায় বায়ুতে শব্দের বেগ কত m/s হবে?`,
        correct: `${toBnDigits(vSound)} m/s`,
        distractors: [
          `${toBnDigits(Number((vSound + 12).toFixed(1)))} m/s`,
          `${toBnDigits(Number((vSound - 12).toFixed(1)))} m/s`,
          `${toBnDigits(Number((332 + tc).toFixed(1)))} m/s`,
          `${toBnDigits(Number((vSound + 25).toFixed(1)))} m/s`,
        ],
        explanation: `v = v₀ + ০.৬ × Δθ = ৩৩২ + (০.৬ × ${toBnDigits(tc)}) = ${toBnDigits(vSound)} m/s।`,
        reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৯ · তাপমাত্রায় শব্দের বেগ',
      })
    );
  });

  return list;
}
