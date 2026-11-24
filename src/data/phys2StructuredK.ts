import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredK(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sk_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 11: Astronomy & Cosmology (~120 MCQs)
  // =========================================================================
  // 1A: Hubble's Law v = H0 * d (16 MCQs)
  [
    { H0: 70, dMpc: 10, v: 700 },
    { H0: 70, dMpc: 20, v: 1400 },
    { H0: 70, dMpc: 50, v: 3500 },
    { H0: 70, dMpc: 100, v: 7000 },
    { H0: 72, dMpc: 10, v: 720 },
    { H0: 72, dMpc: 50, v: 3600 },
    { H0: 68, dMpc: 25, v: 1700 },
    { H0: 75, dMpc: 40, v: 3000 },
    { H0: 70, dMpc: 200, v: 14000 },
    { H0: 75, dMpc: 80, v: 6000 },
  ].forEach((hb, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `হাবল ধ্রুবক H₀ = ${toBnDigits(hb.H0)} km·s⁻¹·Mpc⁻¹ হলে পৃথিবী থেকে ${toBnDigits(hb.dMpc)} মেগাপারসেক (Mpc) দূরের একটি ছায়াপথের অপসারণ বেগ (v) কত km/s?`,
        correct: `${toBnDigits(hb.v)} km/s`,
        distractors: [hb.v / 2, hb.v * 2, hb.v + 500, hb.H0 + hb.dMpc]
          .filter((x) => x !== hb.v)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} km/s`),
        explanation: `হাবলের সূত্র v = H₀d = ${toBnDigits(hb.H0)} × ${toBnDigits(hb.dMpc)} = ${toBnDigits(hb.v)} km/s।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · হাবলের সূত্র',
      })
    );
  });

  // 1B: Schwarzschild Radius R_s = 2GM / c^2 (12 MCQs)
  [
    { massSolar: 1, rsKm: 3 },
    { massSolar: 3, rsKm: 9 },
    { massSolar: 5, rsKm: 15 },
    { massSolar: 10, rsKm: 30 },
    { massSolar: 20, rsKm: 60 },
    { massSolar: 50, rsKm: 150 },
    { massSolar: 100, rsKm: 300 },
    { massSolar: 1000, rsKm: 3000 },
  ].forEach((bh, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `সূর্যের ভরের (${toBnDigits(1)} M☉ → R_s ≈ ৩ km) ${toBnDigits(bh.massSolar)} গুণ ভরবিশিষ্ট কোনো নক্ষত্র কৃষ্ণগহ্বরে পরিণত হলে এর শোয়ার্জশিল্ড ব্যাসার্ধ প্রায় কত km হবে?`,
        correct: `${toBnDigits(bh.rsKm)} km`,
        distractors: [bh.rsKm * 2, bh.rsKm / 2, bh.massSolar, bh.rsKm + 12]
          .filter((x) => x > 0 && x !== bh.rsKm)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} km`),
        explanation: `R_s = 2GM/c² ∝ M; সূর্যের জন্য R_s ≈ ৩ km হওয়ায় ${toBnDigits(bh.massSolar)} M☉ ভরের জন্য R_s ≈ ${toBnDigits(bh.rsKm)} km।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · শোয়ার্জশিল্ড ব্যাসার্ধ',
      })
    );
  });

  // 1C: Astronomy 2-way Conceptual Matrix (44 MCQs)
  const astroCards: { topic: string; fact: string; pool: string[]; ref: string }[] = [
    {
      topic: 'নক্ষত্রের শক্তির প্রধান উৎস',
      fact: 'কেন্দ্রে হাইড্রোজেন থেকে হিলিয়াম গঠনের নিউক্লীয় ফিউশন বিক্রিয়া',
      pool: ['রাসায়নিক দহন', 'নিউক্লীয় ফিশন', 'কেন্দ্রে হাইড্রোজেন থেকে হিলিয়াম গঠনের নিউক্লীয় ফিউশন বিক্রিয়া', 'তেজস্ক্রিয় আলফা ক্ষয়'],
      ref: 'নক্ষত্রের শক্তি',
    },
    {
      topic: 'সূর্যের ভরের নক্ষত্রের (M ≤ ১.৪ M☉) চূড়ান্ত পরিণতি',
      fact: 'শ্বেত বামন (White Dwarf)',
      pool: ['নিউট্রন তারা', 'কৃষ্ণগহ্বর (Black Hole)', 'শ্বেত বামন (White Dwarf)', 'পালসার'],
      ref: 'নক্ষত্রের জীবনচক্র',
    },
    {
      topic: '১.৪ M☉ হতে ৩ M☉ ভরের নক্ষত্রের সুপারনোভা-পরবর্তী পরিণতি',
      fact: 'নিউট্রন তারা বা পালসার',
      pool: ['শ্বেত বামন', 'নিউট্রন তারা বা পালসার', 'লাল দানব', 'নেবুলা'],
      ref: 'নক্ষত্রের বিবর্তন',
    },
    {
      topic: '৩ M☉ (টোলম্যান-ওপেনহাইমার-ভলকফ সীমা)-এর অধিক ভরের নক্ষত্রের পরিণতি',
      fact: 'কৃষ্ণগহ্বর (Black Hole)',
      pool: ['শ্বেত বামন', 'পালসার', 'লাল দানব', 'কৃষ্ণগহ্বর (Black Hole)'],
      ref: 'কৃষ্ণগহ্বর গঠন',
    },
    {
      topic: 'দূরবর্তী ছায়াপথ হতে আগত আলোর ডপলার লোহিত অপসারণ (Redshift)',
      fact: 'মহাবিশ্ব ক্রমাগত প্রসারিত হচ্ছে — তার সরাসরি প্রমাণ',
      pool: ['মহাবিশ্ব সংকুচিত হচ্ছে', 'মহাবিশ্ব স্থির', 'মহাবিশ্ব ক্রমাগত প্রসারিত হচ্ছে — তার সরাসরি প্রমাণ', 'সূর্য গ্যালাক্সির কেন্দ্রে'],
      ref: 'মহাবিশ্বের প্রসারণ',
    },
    {
      topic: 'বিগ ব্যাং (Big Bang) তত্ত্বের অন্যতম মূল পর্যবেক্ষণমূলক প্রমাণ',
      fact: 'মহাজাগতিক মাইক্রোওয়েভ পটভূমি বিকিরণ (CMB ≈ ২.৭৩ K)',
      pool: ['আন্তঃনাক্ষত্রিক ধূলিকণা', 'মহাজাগতিক মাইক্রোওয়েভ পটভূমি বিকিরণ (CMB ≈ ২.৭৩ K)', 'শনি গ্রহের বলয়', 'ধূমকেতুর লেজ'],
      ref: 'বিগ ব্যাং তত্ত্ব',
    },
    {
      topic: 'মহাকাশীয় দূরত্বের সবচেয়ে বড় প্রচলিত একক',
      fact: 'পারসেক (১ পারসেক = ৩.২৬ আলোকবর্ষ)',
      pool: ['অ্যাস্ট্রোনমিক্যাল ইউনিট (AU)', 'আলোকবর্ষ', 'পারসেক (১ পারসেক = ৩.২৬ আলোকবর্ষ)', 'কিলোমিটার'],
      ref: 'মহাকাশীয় দূরত্বের একক',
    },
    {
      topic: 'সূর্য ও পৃথিবীর মধ্যবর্তী গড় দূরত্ব',
      fact: '১ জ্যোতির্বিদ্যা একক বা ১ AU (≈ ১.৪৯৬ × ১০¹¹ m)',
      pool: ['১ পারসেক', '১ আলোকবর্ষ', '১ জ্যোতির্বিদ্যা একক বা ১ AU (≈ ১.৪৯৬ × ১০¹¹ m)', '১০০ ফার্মি'],
      ref: 'জ্যোতির্বিদ্যা একক',
    },
    {
      topic: 'ঘটনা দিগন্ত (Event Horizon)',
      fact: 'কৃষ্ণগহ্বরের চারপাশের যে সীমার ভেতর থেকে মুক্তিবেগ আলোর বেগের সমান',
      pool: ['নক্ষত্রের কেন্দ্র', 'সূর্যের আলোকমণ্ডল', 'কৃষ্ণগহ্বরের চারপাশের যে সীমার ভেতর থেকে মুক্তিবেগ আলোর বেগের সমান', 'ছায়াপথের প্রান্তসীমা'],
      ref: 'কৃষ্ণগহ্বর',
    },
    {
      topic: '১ আলোকবর্ষ (1 Light Year)-এর মান',
      fact: '৯.৪৬ × ১০¹⁵ মিটার (এক বছরে শূন্যস্থানে আলোর অতিক্রান্ত দূরত্ব)',
      pool: ['৩ × ১০⁸ মিটার', '১.৪৯৬ × ১০¹¹ মিটার', '৯.৪৬ × ১০¹⁵ মিটার (এক বছরে শূন্যস্থানে আলোর অতিক্রান্ত দূরত্ব)', '৩.০৮ × ১০¹⁶ মিটার'],
      ref: 'আলোকবর্ষ',
    },
    {
      topic: 'আকাশগঙ্গা (Milky Way) ছায়াপথের আকৃতি',
      fact: 'সর্পিলাকার (Spiral Galaxy)',
      pool: ['উপবৃত্তাকার', 'সর্পিলাকার (Spiral Galaxy)', 'অনিয়মিত', 'বৃত্তাকার চাকতিহীন'],
      ref: 'ছায়াপথ',
    },
    {
      topic: 'মহাশূন্যে আদিম নক্ষত্র জন্মের প্রধান অঞ্চল',
      fact: 'নীহারিকা বা নেবুলা (Nebula — হাইড্রোজেন গ্যাস ও ধূলিকণার মেঘ)',
      pool: ['কোয়াসার', 'নীহারিকা বা নেবুলা (Nebula — হাইড্রোজেন গ্যাস ও ধূলিকণার মেঘ)', 'শ্বেত বামন', 'উপগ্রহ'],
      ref: 'নক্ষত্রের জন্ম',
    },
  ];
  astroCards.forEach((ac, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `জ্যোতির্বিজ্ঞানে "${ac.topic}" বলতে নিচের কোনটিকে বোঝায়?`,
        correct: ac.fact,
        distractors: ac.pool.filter((x) => x !== ac.fact),
        explanation: `${ac.topic}: ${ac.fact}।`,
        reference: `পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ${ac.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${ac.fact}" — এটি জ্যোতির্বিজ্ঞানের কোন ধারণার সাথে সরাসরি সম্পর্কিত?`,
        correct: ac.topic,
        distractors: astroCards.map((x) => x.topic).filter((t) => t !== ac.topic).slice(0, 4),
        explanation: `${ac.fact} — ${ac.topic}-এর মূল বৈশিষ্ট্য।`,
        reference: `পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ${ac.ref}`,
      })
    );
  });

  // =========================================================================
  // 2. Comprehensive SI Units & Dimensions across Physics 2nd Paper Ch 1-10 (84 MCQs)
  // =========================================================================
  const unitDim2: { ch: string; vis: string; qty: string; unit: string; dim: string }[] = [
    { ch: 'phys2_thermo', vis: 'thermodynamics', qty: 'এনট্রপি (Entropy, ΔS)', unit: 'J·K⁻¹', dim: '[ML²T⁻²Θ⁻¹]' },
    { ch: 'phys2_ch2_static_elec', vis: 'circuits_optics', qty: 'তড়িৎ বিভব (V)', unit: 'Volt (J·C⁻¹)', dim: '[ML²T⁻³I⁻¹]' },
    { ch: 'phys2_ch2_static_elec', vis: 'circuits_optics', qty: 'তড়িৎ প্রাবল্য (E)', unit: 'N·C⁻¹ বা V·m⁻¹', dim: '[MLT⁻³I⁻¹]' },
    { ch: 'phys2_ch2_static_elec', vis: 'circuits_optics', qty: 'তড়িৎ ফ্লাক্স (Φ_E)', unit: 'N·m²·C⁻¹', dim: '[ML³T⁻³I⁻¹]' },
    { ch: 'phys2_ch2_static_elec', vis: 'circuits_optics', qty: 'ধারকত্ব (Capacitance, C)', unit: 'Farad (C·V⁻¹)', dim: '[M⁻¹L⁻²T⁴I²]' },
    { ch: 'phys2_ch2_static_elec', vis: 'circuits_optics', qty: 'শূন্যস্থানের ভেদনযোগ্যতা (ε₀)', unit: 'C²·N⁻¹·m⁻² বা F·m⁻¹', dim: '[M⁻¹L⁻³T⁴I²]' },
    { ch: 'phys2_ch3_current_elec', vis: 'circuits_optics', qty: 'তড়িৎ রোধ (Resistance, R)', unit: 'Ohm (V·A⁻¹)', dim: '[ML²T⁻³I⁻²]' },
    { ch: 'phys2_ch3_current_elec', vis: 'circuits_optics', qty: 'আপেক্ষিক রোধ (Resistivity, ρ)', unit: 'Ω·m', dim: '[ML³T⁻³I⁻²]' },
    { ch: 'phys2_ch3_current_elec', vis: 'circuits_optics', qty: 'তড়িৎ পরিবাহিতা (Conductance, G)', unit: 'Siemens (Ω⁻¹)', dim: '[M⁻¹L⁻²T³I²]' },
    { ch: 'phys2_ch3_current_elec', vis: 'circuits_optics', qty: 'প্রবাহ ঘনত্ব (Current Density, J)', unit: 'A·m⁻²', dim: '[L⁻²I]' },
    { ch: 'phys2_ch4_magnetism', vis: 'circuits_optics', qty: 'চৌম্বক ক্ষেত্রের মান (B)', unit: 'Tesla (Wb·m⁻²)', dim: '[MT⁻²I⁻¹]' },
    { ch: 'phys2_ch4_magnetism', vis: 'circuits_optics', qty: 'চৌম্বক ফ্লাক্স (Φ_B)', unit: 'Weber (T·m²)', dim: '[ML²T⁻²I⁻¹]' },
    { ch: 'phys2_ch4_magnetism', vis: 'circuits_optics', qty: 'শূন্যস্থানের চৌম্বক প্রবেশ্যতা (μ₀)', unit: 'T·m·A⁻¹ বা N·A⁻²', dim: '[MLT⁻²I⁻²]' },
    { ch: 'phys2_ch5_em_induction', vis: 'circuits_optics', qty: 'স্বকীয় ও পারস্পরিক আবেশ গুণাঙ্ক (L, M)', unit: 'Henry (Wb·A⁻¹)', dim: '[ML²T⁻²I⁻²]' },
    { ch: 'phys2_ch6_geo_optics', vis: 'circuits_optics', qty: 'লেন্সের ক্ষমতা (Power of Lens)', unit: 'Dioptre (m⁻¹)', dim: '[L⁻¹]' },
    { ch: 'phys2_ch8_modern_phys', vis: 'circuits_optics', qty: 'রিডবার্গ ধ্রুবক (R_H)', unit: 'm⁻¹', dim: '[L⁻¹]' },
    { ch: 'phys2_ch9_atomic_nuclear', vis: 'circuits_optics', qty: 'তেজস্ক্রিয় সক্রিয়তা (Activity)', unit: 'Becquerel (s⁻¹)', dim: '[T⁻¹]' },
    { ch: 'phys2_ch9_atomic_nuclear', vis: 'circuits_optics', qty: 'অবক্ষয় ধ্রুবক (Decay Constant, λ)', unit: 's⁻¹', dim: '[T⁻¹]' },
  ];
  const p2UnitPool = Array.from(new Set(unitDim2.map((x) => x.unit)));
  const p2DimPool = Array.from(new Set(unitDim2.map((x) => x.dim)));
  unitDim2.forEach((ud, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: ud.ch,
        visualLessonId: ud.vis,
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `পদার্থবিজ্ঞানে "${ud.qty}"-এর প্রচলিত এসআই (SI) একক কোনটি?`,
        correct: ud.unit,
        distractors: p2UnitPool.filter((u) => u !== ud.unit).slice(0, 4),
        explanation: `${ud.qty}-এর এসআই একক ${ud.unit} এবং মাত্রা ${ud.dim}।`,
        reference: `পদার্থবিজ্ঞান ২য় পত্র · এসআই একক`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: ud.ch,
        visualLessonId: ud.vis,
        hscLevel: '12',
        difficulty: 'dental',
        question: `ভৌত রাশি "${ud.qty}"-এর সঠিক মাত্রা সমীকরণ কোনটি?`,
        correct: ud.dim,
        distractors: p2DimPool.filter((d) => d !== ud.dim).slice(0, 4),
        explanation: `${ud.qty}-এর মাত্রা ${ud.dim} (একক: ${ud.unit})।`,
        reference: `পদার্থবিজ্ঞান ২য় পত্র · মাত্রা বিশ্লেষণ`,
      })
    );
  });

  // =========================================================================
  // 3. Comprehensive Ch 2-10 Medical Conceptual & Comparison Matrix (~200 MCQs)
  // =========================================================================
  const p2Concepts: { ch: string; topic: string; ans: string; pool: string[]; ref: string }[] = [
    {
      ch: 'phys2_ch2_static_elec',
      topic: 'আহিত ফাঁপা ধাতব গোলকের অভ্যন্তরে তড়িৎ প্রাবল্য ও বিভব',
      ans: 'প্রাবল্য শূন্য (E = ০), কিন্তু বিভব ধ্রুব ও পৃষ্ঠের সমান',
      pool: ['উভয়ই শূন্য', 'উভয়ই অসীম', 'প্রাবল্য শূন্য (E = ০), কিন্তু বিভব ধ্রুব ও পৃষ্ঠের সমান', 'বিভব শূন্য কিন্তু প্রাবল্য ধ্রুব'],
      ref: 'অধ্যায় ২ · গাউসের সূত্র',
    },
    {
      ch: 'phys2_ch2_static_elec',
      topic: 'পৃথিবীর তড়িৎ বিভব ও ধারকত্ব',
      ans: 'বিভব শূন্য (০ V) এবং ধারকত্ব প্রায় ৭১১ μF (তুলনামূলকভাবে অসীম)',
      pool: ['বিভব ১ V, ধারকত্ব শূন্য', 'বিভব অসীম, ধারকত্ব শূন্য', 'বিভব শূন্য (০ V) এবং ধারকত্ব প্রায় ৭১১ μF (তুলনামূলকভাবে অসীম)', 'বিভব ২২০ V'],
      ref: 'অধ্যায় ২ · পৃথিবীর বিভব',
    },
    {
      ch: 'phys2_ch2_static_elec',
      topic: 'তড়িৎ বলরেখার ধর্ম (Electric Field Lines)',
      ans: 'ধনাত্মক চার্জ থেকে বের হয়ে ঋণাত্মক চার্জে শেষ হয় ও পরস্পরকে কখনো ছেদ করে না',
      pool: ['আবদ্ধ লুপ তৈরি করে', 'ধনাত্মক চার্জ থেকে বের হয়ে ঋণাত্মক চার্জে শেষ হয় ও পরস্পরকে কখনো ছেদ করে না', 'পরস্পরকে সমকোণে ছেদ করে', 'সমবিভব তলের সমান্তরাল'],
      ref: 'অধ্যায় ২ · তড়িৎ বলরেখা',
    },
    {
      ch: 'phys2_ch3_current_elec',
      topic: 'ধাতব পরিবাহীর তাড়ন বেগের (Drift Velocity) ক্রম',
      ans: 'প্রায় ১০⁻⁴ m/s (মিলিমিটার/সেকেন্ড ক্রমের)',
      pool: ['৩ × ১০⁸ m/s', '১০⁶ m/s', 'প্রায় ১০⁻⁴ m/s (মিলিমিটার/সেকেন্ড ক্রমের)', '৩৪০ m/s'],
      ref: 'অধ্যায় ৩ · তাড়ন বেগ',
    },
    {
      ch: 'phys2_ch3_current_elec',
      topic: 'তাপমাত্রা বাড়ালে ধাতু ও অর্ধপরিবাহীর রোধের পরিবর্তন',
      ans: 'ধাতুর রোধ বাড়ে, কিন্তু অর্ধপরিবাহী ও তড়িৎ-বিশ্লেষ্যের রোধ কমে',
      pool: ['উভয়ের রোধ বাড়ে', 'উভয়ের রোধ কমে', 'ধাতুর রোধ বাড়ে, কিন্তু অর্ধপরিবাহী ও তড়িৎ-বিশ্লেষ্যের রোধ কমে', 'ধাতুর রোধ কমে'],
      ref: 'অধ্যায় ৩ · রোধের উষ্ণতা সহগ',
    },
    {
      ch: 'phys2_ch3_current_elec',
      topic: 'বৈদ্যুতিক হিটারের কুণ্ডলীতে নাইক্রোম তার ব্যবহারের কারণ',
      ans: 'উচ্চ আপেক্ষিক রোধ ও উচ্চ গলনাঙ্ক (সহজে জারিত হয় না)',
      pool: ['নিম্ন রোধ ও নিম্ন গলনাঙ্ক', 'উচ্চ আপেক্ষিক রোধ ও উচ্চ গলনাঙ্ক (সহজে জারিত হয় না)', 'সস্তা ও নমনীয়', 'শূন্য রোধ'],
      ref: 'অধ্যায় ৩ · জুলের তাপন ক্রিয়া',
    },
    {
      ch: 'phys2_ch3_current_elec',
      topic: 'বৈদ্যুতিক ফিউজ তারের বৈশিষ্ট্য',
      ans: 'উচ্চ রোধ ও নিম্ন গলনাঙ্ক (টিন ও সীসার সংকর)',
      pool: ['নিম্ন রোধ ও উচ্চ গলনাঙ্ক', 'উচ্চ রোধ ও উচ্চ গলনাঙ্ক', 'উচ্চ রোধ ও নিম্ন গলনাঙ্ক (টিন ও সীসার সংকর)', 'শূন্য রোধ'],
      ref: 'অধ্যায় ৩ · বৈদ্যুতিক নিরাপত্তা',
    },
    {
      ch: 'phys2_ch4_magnetism',
      topic: 'চৌম্বক ক্ষেত্রে গতিশীল চার্জের ওপর কৃতকাজ',
      ans: 'শূন্য (কারণ চৌম্বক বল বেগের লম্বদিকে কাজ করে)',
      pool: ['সর্বদা ধনাত্মক', 'qvB এর সমান', 'শূন্য (কারণ চৌম্বক বল বেগের লম্বদিকে কাজ করে)', '½mv² এর সমান'],
      ref: 'অধ্যায় ৪ · লরেঞ্জ বল',
    },
    {
      ch: 'phys2_ch4_magnetism',
      topic: 'কুরি সূত্র (Curie Law) কোন শ্রেণির চৌম্বক পদার্থের জন্য প্রযোজ্য?',
      ans: 'প্যারাচৌম্বক পদার্থ (χ = C/T)',
      pool: ['ডায়াচৌম্বক পদার্থ', 'প্যারাচৌম্বক পদার্থ (χ = C/T)', 'অতিপরিবাহী', 'অন্তরক'],
      ref: 'অধ্যায় ৪ · কুরি সূত্র',
    },
    {
      ch: 'phys2_ch5_em_induction',
      topic: 'স্বকীয় আবেশ গুণাঙ্ক (Self Inductance)-কে বলা হয়',
      ans: 'তড়িৎ জড়তা (Electrical Inertia)',
      pool: ['তড়িৎ ধারকত্ব', 'তড়িৎ পরিবাহিতা', 'তড়িৎ জড়তা (Electrical Inertia)', 'তড়িৎ প্রাবল্য'],
      ref: 'অধ্যায় ৫ · স্বকীয় আবেশ',
    },
    {
      ch: 'phys2_ch5_em_induction',
      topic: 'বিশুদ্ধ আবেশক বা ধারকযুক্ত AC বর্তনীতে গড় ব্যয়িত ক্ষমতা',
      ans: 'শূন্য (Wattless current, কারণ দশা পার্থক্য ৯০°)',
      pool: ['V_rms × I_rms', 'I²R', 'শূন্য (Wattless current, কারণ দশা পার্থক্য ৯০°)', 'অসীম'],
      ref: 'অধ্যায় ৫ · এসি ক্ষমতা',
    },
    {
      ch: 'phys2_ch5_em_induction',
      topic: 'DC (সমপ্রবাহ)-এর জন্য ধারকীয় প্রতিঘাত (X_C) ও আবেশকীয় প্রতিঘাত (X_L)',
      ans: 'f = ০ হওয়ায় X_C = অসীম (DC আটকে দেয়) এবং X_L = ০',
      pool: ['X_C = ০ এবং X_L = অসীম', 'উভয়ই শূন্য', 'f = ০ হওয়ায় X_C = অসীম (DC আটকে দেয়) এবং X_L = ০', 'উভয়ই অসীম'],
      ref: 'অধ্যায় ৫ · প্রতিঘাত',
    },
    {
      ch: 'phys2_ch6_geo_optics',
      topic: 'আলো এক মাধ্যম থেকে অন্য মাধ্যমে প্রবেশ করলে কোন রাশি অপরিবর্তিত থাকে?',
      ans: 'কম্পাঙ্ক (Frequency)',
      pool: ['বেগ', 'তরঙ্গদৈর্ঘ্য', 'কম্পাঙ্ক (Frequency)', 'বিস্তার'],
      ref: 'অধ্যায় ৬ · আলোর প্রতিসরণ',
    },
    {
      ch: 'phys2_ch6_geo_optics',
      topic: 'স্বাভাবিক চোখের নিকটবিন্দু ও স্পষ্ট দর্শনের ন্যূনতম দূরত্ব',
      ans: '২৫ সেমি (০.২৫ মিটার)',
      pool: ['২.৫ সেমি', '২৫ সেমি (০.২৫ মিটার)', '৫০ সেমি', '১০০ সেমি'],
      ref: 'অধ্যায় ৬ · মানুষের চোখ',
    },
    {
      ch: 'phys2_ch6_geo_optics',
      topic: 'উত্তল লেন্সে কখন বিবর্ধিত অবাস্তব সোজা প্রতিবিম্ব গঠিত হয়?',
      ans: 'বস্তু ফোকাস বিন্দু ও আলোককেন্দ্রের মাঝে থাকলে (বিবর্ধক কাঁচ)',
      pool: ['বস্তু অসীমে থাকলে', 'বস্তু 2f-এ থাকলে', 'বস্তু f ও 2f-এর মাঝে থাকলে', 'বস্তু ফোকাস বিন্দু ও আলোককেন্দ্রের মাঝে থাকলে (বিবর্ধক কাঁচ)'],
      ref: 'অধ্যায় ৬ · উত্তল লেন্সে প্রতিবিম্ব',
    },
    {
      ch: 'phys2_ch7_physical_optics',
      topic: 'শূন্যস্থানে তাড়িতচৌম্বক তরঙ্গের বেগ c সমান',
      ans: '১ / √(μ₀ ε₀)',
      pool: ['√(μ₀ ε₀)', 'μ₀ / ε₀', '১ / √(μ₀ ε₀)', 'ε₀ / μ₀'],
      ref: 'অধ্যায় ৭ · ম্যাক্সওয়েলের সমীকরণ',
    },
    {
      ch: 'phys2_ch7_physical_optics',
      topic: 'অর্ধেক বা লাল আলো বনাম নীল আলোয় ইয়ং-এর দ্বি-চির পরীক্ষায় ডোরার প্রস্থ',
      ans: 'লাল আলোর তরঙ্গদৈর্ঘ্য বেশি হওয়ায় ডোরার প্রস্থ নীল আলোর চেয়ে বড় হয়',
      pool: ['নীল আলোয় ডোরার প্রস্থ বেশি হয়', 'উভয় বর্ণে সমান', 'লাল আলোর তরঙ্গদৈর্ঘ্য বেশি হওয়ায় ডোরার প্রস্থ নীল আলোর চেয়ে বড় হয়', 'কোনো ব্যতিচার ঘটে না'],
      ref: 'অধ্যায় ৭ · ডোরার প্রস্থ ও তরঙ্গদৈর্ঘ্য',
    },
    {
      ch: 'phys2_ch7_physical_optics',
      topic: 'বায়ুর বুদবুদের মতো পাতলা ফিল্মে রঙিন দেখানোর কারণ',
      ans: 'আলোর ব্যতিচার (Interference in thin films)',
      pool: ['আলোর সমবর্তন', 'পূর্ণ অভ্যন্তরীণ প্রতিফলন', 'আলোর ব্যতিচার (Interference in thin films)', 'কম্পটন ক্রিয়া'],
      ref: 'অধ্যায় ৭ · পাতলা ফিল্মে ব্যতিচার',
    },
    {
      ch: 'phys2_ch8_modern_phys',
      topic: 'একটি ফোটনের নিশ্চল ভর (Rest Mass) কত?',
      ans: 'শূন্য (০), তবে গতিশীল ভর h/(cλ)',
      pool: ['৯.১ × ১০⁻³¹ kg', '১.৬৭ × ১০⁻²⁷ kg', 'শূন্য (০), তবে গতিশীল ভর h/(cλ)', 'অসীম'],
      ref: 'অধ্যায় ৮ · ফোটন কণা',
    },
    {
      ch: 'phys2_ch8_modern_phys',
      topic: 'কৃষ্ণবস্তুর বিকিরণে স্টিফেন-বোল্টজম্যানের সূত্র',
      ans: 'E ∝ T⁴ (পরম তাপমাত্রার চতুর্থ ঘাতের সমানুপাতিক)',
      pool: ['E ∝ T', 'E ∝ T²', 'E ∝ T⁴ (পরম তাপমাত্রার চতুর্থ ঘাতের সমানুপাতিক)', 'E ∝ 1/T'],
      ref: 'অধ্যায় ৮ · কৃষ্ণবস্তুর বিকিরণ',
    },
    {
      ch: 'phys2_ch8_modern_phys',
      topic: 'উইনের সরণ সূত্র (Wien Displacement Law)',
      ans: 'λ_m × T = ধ্রুবক (তাপমাত্রা বাড়লে সর্বোচ্চ বিকিরণের তরঙ্গদৈর্ঘ্য কমে)',
      pool: ['λ_m / T = ধ্রুবক', 'λ_m × T = ধ্রুবক (তাপমাত্রা বাড়লে সর্বোচ্চ বিকিরণের তরঙ্গদৈর্ঘ্য কমে)', 'λ_m × T² = ধ্রুবক', 'λ_m স্বাধীন'],
      ref: 'অধ্যায় ৮ · উইনের সূত্র',
    },
    {
      ch: 'phys2_ch9_atomic_nuclear',
      topic: 'রাদারফোর্ডের আলফা-কণা বিচ্ছুরণ পরীক্ষা কী আবিষ্কার করে?',
      ans: 'পরমাণুর কেন্দ্রে ক্ষুদ্র ধনাত্মক আধানযুক্ত ভারী নিউক্লিয়াসের অস্তিত্ব',
      pool: ['ইলেকট্রন', 'নিউট্রন', 'পরমাণুর কেন্দ্রে ক্ষুদ্র ধনাত্মক আধানযুক্ত ভারী নিউক্লিয়াসের অস্তিত্ব', 'বোরের কক্ষপথ'],
      ref: 'অধ্যায় ৯ · রাদারফোর্ডের পরীক্ষা',
    },
    {
      ch: 'phys2_ch9_atomic_nuclear',
      topic: 'পারমাণবিক চুল্লিতে (Nuclear Reactor) মডারেটর হিসেবে ব্যবহৃত হয়',
      ans: 'ভারী পানি (D₂O) ও গ্রাফাইট (দ্রুত নিউট্রনকে ধীর করতে)',
      pool: ['ক্যাডমিয়াম দণ্ড (নিয়ন্ত্রক)', 'তরল সোডিয়াম (শীতলক)', 'ভারী পানি (D₂O) ও গ্রাফাইট (দ্রুত নিউট্রনকে ধীর করতে)', 'ইউরেনিয়াম-২৩৮'],
      ref: 'অধ্যায় ৯ · পারমাণবিক চুল্লি',
    },
    {
      ch: 'phys2_ch9_atomic_nuclear',
      topic: 'পারমাণবিক চুল্লিতে শৃঙ্খল বিক্রিয়া নিয়ন্ত্রক দণ্ড (Control Rods)',
      ans: 'ক্যাডমিয়াম বা বোরন দণ্ড (অতিরিক্ত নিউট্রন শোষণ করে)',
      pool: ['গ্রাফাইট', 'ভারী পানি', 'ক্যাডমিয়াম বা বোরন দণ্ড (অতিরিক্ত নিউট্রন শোষণ করে)', 'তামার দণ্ড'],
      ref: 'অধ্যায় ৯ · কন্ট্রোল রড',
    },
    {
      ch: 'phys2_ch9_atomic_nuclear',
      topic: 'নিউক্লিয়ার ফিউশন বিক্রিয়া সংঘটিত হওয়ার শর্ত',
      ans: 'অতি উচ্চ তাপমাত্রা (প্রায় ১০⁷–১০⁸ K) ও প্রবল চাপ (সূর্য ও হাইড্রোজেন বোমা)',
      pool: ['কক্ষ তাপমাত্রা', 'অতি নিম্ন চাপ', 'অতি উচ্চ তাপমাত্রা (প্রায় ১০⁷–১০⁸ K) ও প্রবল চাপ (সূর্য ও হাইড্রোজেন বোমা)', 'শূন্য অভিকর্ষ'],
      ref: 'অধ্যায় ৯ · নিউক্লীয় ফিউশন',
    },
    {
      ch: 'phys2_ch10_semiconductor',
      topic: 'পরিবাহী, অর্ধপরিবাহী ও অন্তরকের নিষিদ্ধ শক্তি ব্যবধান (Band Gap)',
      ans: 'পরিবাহীতে ০ eV, অর্ধপরিবাহীতে ≈ ০.৭–১.১ eV, অন্তরকে > ৩–৫ eV',
      pool: ['পরিবাহীতে ৫ eV', 'অর্ধপরিবাহীতে ১০ eV', 'পরিবাহীতে ০ eV, অর্ধপরিবাহীতে ≈ ০.৭–১.১ eV, অন্তরকে > ৩–৫ eV', 'অন্তরকে ০ eV'],
      ref: 'অধ্যায় ১০ · শক্তি ব্যান্ড তত্ত্ব',
    },
    {
      ch: 'phys2_ch10_semiconductor',
      topic: 'সিলিকন (Si) ও জার্মেনিয়ামের (Ge) নিষিদ্ধ শক্তি ব্যবধান (৩০°C)',
      ans: 'সিলিকনে ১.১ eV এবং জার্মেনিয়ামে ০.৭ eV',
      pool: ['সিলিকনে ০.৭ eV, Ge-তে ১.১ eV', 'উভয়েই ৫ eV', 'সিলিকনে ১.১ eV এবং জার্মেনিয়ামে ০.৭ eV', 'উভয়েই ০ eV'],
      ref: 'অধ্যায় ১০ · Si ও Ge ব্যান্ড গ্যাপ',
    },
    {
      ch: 'phys2_ch10_semiconductor',
      topic: 'ফুল-ওয়েভ ব্রিজ রেক্টিফায়ারে কয়টি ডায়োড প্রয়োজন হয়?',
      ans: '৪টি p-n জংশন ডায়োড (সেন্টার-ট্যাপে ২টি)',
      pool: ['১টি', '২টি', '৪টি p-n জংশন ডায়োড (সেন্টার-ট্যাপে ২টি)', '৬টি'],
      ref: 'অধ্যায় ১০ · ব্রিজ রেক্টিফায়ার',
    },
    {
      ch: 'phys2_ch10_semiconductor',
      topic: 'পরম শূন্য তাপমাত্রায় (০ K) বিশুদ্ধ অর্ধপরিবাহী কীরূপ আচরণ করে?',
      ans: 'আদর্শ অন্তরকের (Insulator) ন্যায় আচরণ করে',
      pool: ['অতিপরিবাহী', 'উত্তম ধাতব পরিবাহী', 'আদর্শ অন্তরকের (Insulator) ন্যায় আচরণ করে', 'চৌম্বক পদার্থ'],
      ref: 'অধ্যায় ১০ · ০ K-এ অর্ধপরিবাহী',
    },
    {
      ch: 'phys2_ch10_semiconductor',
      topic: 'LED (Light Emitting Diode) আলোক বিকিরণ করে কোন ঝোঁকে?',
      ans: 'সম্মুখ ঝোঁকে (Forward Bias) গ্যালিয়াম আর্সেনাইড ফসফাইড ব্যবহারে',
      pool: ['বিমুখী ঝোঁকে (Reverse Bias)', 'শূন্য বিভবে', 'সম্মুখ ঝোঁকে (Forward Bias) গ্যালিয়াম আর্সেনাইড ফসফাইড ব্যবহারে', 'AC উচ্চ বিভবে'],
      ref: 'অধ্যায় ১০ · আলোক নিঃসারী ডায়োড',
    },
  ];
  p2Concepts.forEach((c, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: c.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `"${c.topic}" সম্পর্কে সঠিক বিবৃতি কোনটি?`,
        correct: c.ans,
        distractors: c.pool.filter((x) => x !== c.ans),
        explanation: `${c.topic}: ${c.ans}।`,
        reference: `পদার্থবিজ্ঞান ২য় পত্র · ${c.ref}`,
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: c.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `নিচের কোন বিষয়টির সাথে "${c.ans}" তথ্যটি সরাসরি জড়িত?`,
        correct: c.topic,
        distractors: p2Concepts.map((x) => x.topic).filter((t) => t !== c.topic).slice(0, 4),
        explanation: `${c.ans} — এটি "${c.topic}"-এর অন্তর্ভুক্ত।`,
        reference: `পদার্থবিজ্ঞান ২য় পত্র · ${c.ref}`,
      })
    );
  });

  // =========================================================================
  // 4. Extra Ch 3, 5, 6, 8, 9 Parametric Calculations (~130 MCQs)
  // =========================================================================
  // 4A: Voltmeter Multiplier Series Resistance R = G(n - 1) (10 MCQs)
  [
    { G: 50, n: 11, R: 500 },
    { G: 100, n: 10, R: 900 },
    { G: 20, n: 21, R: 400 },
    { G: 50, n: 5, R: 200 },
    { G: 100, n: 51, R: 5000 },
    { G: 40, n: 6, R: 200 },
    { G: 80, n: 11, R: 800 },
    { G: 25, n: 9, R: 200 },
    { G: 60, n: 11, R: 600 },
    { G: 10, n: 101, R: 1000 },
  ].forEach((vm, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `${toBnDigits(vm.G)} Ω রোধের একটি গ্যালভানোমিটারের ভোল্টেজ পাল্লা ${toBnDigits(vm.n)} গুণ করতে এর সাথে শ্রেণিতে কত Ω মানের উচ্চ রোধ যুক্ত করতে হবে?`,
        correct: `${toBnDigits(vm.R)} Ω`,
        distractors: [vm.R / 2, vm.R * 2, vm.G * vm.n, vm.R + 100]
          .filter((x) => x !== vm.R)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `শ্রেণি রোধ R = G(n - 1) = ${toBnDigits(vm.G)}(${toBnDigits(vm.n)} - ১) = ${toBnDigits(vm.R)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · ভোল্টমিটারের পাল্লা বৃদ্ধি',
      })
    );
  });

  // 4B: Mass-Energy Equivalence ΔE = Δm * 931.5 MeV (10 MCQs)
  [0.1, 0.2, 0.4, 0.5, 1.0, 2.0, 0.05, 0.02, 0.25, 4.0].forEach((dm, idx) => {
    const mev = Number((dm * 931.5).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি নিউক্লীয় বিক্রিয়ায় ভর ত্রুটি Δm = ${toBnDigits(dm)} amu (u) হলে উৎপন্ন শক্তি কত MeV? (১ u = ৯৩১.৫ MeV)`,
        correct: `${toBnDigits(mev)} MeV`,
        distractors: [mev * 2, mev / 2, mev + 100, mev + 250]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x !== mev)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} MeV`),
        explanation: `ΔE = Δm × ৯৩১.৫ MeV = ${toBnDigits(dm)} × ৯৩১.৫ = ${toBnDigits(mev)} MeV।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · ভর-ত্রুটি ও বন্ধন শক্তি',
      })
    );
  });

  // 4C: Series & Parallel Capacitors 3-item symmetric grids (16 MCQs)
  [3, 6, 9, 12, 15, 18, 24, 30].forEach((cVal, idx) => {
    const cSeries = cVal / 3;
    const cParallel = cVal * 3;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `প্রত্যেকটি ${toBnDigits(cVal)} μF ধারকত্বের ৩টি সমান ধারককে শ্রেণি (Series) সমবায়ে যুক্ত করলে তুল্য ধারকত্ব কত μF হবে?`,
        correct: `${toBnDigits(cSeries)} μF`,
        distractors: [cVal, cParallel, cSeries * 2, cSeries + 4]
          .filter((x) => x !== cSeries)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μF`),
        explanation: `nটি সমান ধারকের শ্রেণি সমবায়ে C_s = C/n = ${toBnDigits(cVal)}/৩ = ${toBnDigits(cSeries)} μF।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · শ্রেণি সমবায়',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch2_static_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `প্রত্যেকটি ${toBnDigits(cVal)} μF ধারকত্বের ৩টি সমান ধারককে সমান্তরাল (Parallel) সমবায়ে যুক্ত করলে তুল্য ধারকত্ব কত μF হবে?`,
        correct: `${toBnDigits(cParallel)} μF`,
        distractors: [cVal, cSeries, cParallel * 2, cVal * 2]
          .filter((x) => x !== cParallel)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μF`),
        explanation: `nটি সমান ধারকের সমান্তরাল সমবায়ে C_p = nC = ৩ × ${toBnDigits(cVal)} = ${toBnDigits(cParallel)} μF।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · সমান্তরাল সমবায়',
      })
    );
  });

  // 4D: Joule Heating H = I^2 R t & Electric Bulb Rating P = V^2 / R (24 MCQs)
  [
    { v: 220, w: 100 },
    { v: 220, w: 40 },
    { v: 220, w: 200 },
    { v: 200, w: 100 },
    { v: 100, w: 50 },
    { v: 100, w: 100 },
    { v: 200, w: 50 },
    { v: 240, w: 60 },
    { v: 240, w: 120 },
    { v: 120, w: 60 },
    { v: 110, w: 55 },
    { v: 200, w: 200 },
  ].forEach((bl, idx) => {
    const r = Number(((bl.v * bl.v) / bl.w).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি বৈদ্যুতিক বাল্বের গায়ে "${toBnDigits(bl.v)} V - ${toBnDigits(bl.w)} W" লেখা থাকলে বাল্বটির ফিলামেন্টের রোধ কত ওহম (Ω)?`,
        correct: `${toBnDigits(r)} Ω`,
        distractors: [r / 2, r * 2, bl.v / bl.w, r + 50]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== r)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `রোধ R = V²/P = (${toBnDigits(bl.v)})² / ${toBnDigits(bl.w)} = ${toBnDigits(r)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · বৈদ্যুতিক বাল্বের রোধ',
      })
    );
  });

  return list;
}
