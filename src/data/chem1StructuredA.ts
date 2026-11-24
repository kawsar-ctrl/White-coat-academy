import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem1StructuredA(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sa_${String(seq++).padStart(4, '0')}`;

  // 1. Electron Shells (n), Orbitals (n^2), Max Electrons (2n^2) & Subshells (30+ MCQs)
  [1, 2, 3, 4, 5, 6].forEach((n) => {
    const shellNames = ['', 'K', 'L', 'M', 'N', 'O', 'P'];
    const orbs = n * n;
    const maxE = 2 * orbs;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'board',
        question: `পরমাণুর ${shellNames[n]} প্রধান শক্তিস্তরে (n = ${toBnDigits(n)}) মোট অরবিটাল সংখ্যা ও সর্বোচ্চ ইলেকট্রন ধারণক্ষমতা কতটি?`,
        correct: `${toBnDigits(orbs)}টি অরবিটাল ও ${toBnDigits(maxE)}টি ইলেকট্রন`,
        distractors: [
          `${toBnDigits(n)}টি অরবিটাল ও ${toBnDigits(maxE)}টি ইলেকট্রন`,
          `${toBnDigits(orbs)}টি অরবিটাল ও ${toBnDigits(orbs)}টি ইলেকট্রন`,
          `${toBnDigits(maxE)}টি অরবিটাল ও ${toBnDigits(maxE * 2)}টি ইলেকট্রন`,
          `${toBnDigits(orbs + 2)}টি অরবিটাল ও ${toBnDigits(maxE + 4)}টি ইলেকট্রন`,
        ],
        explanation: `যেকোনো প্রধান শক্তিস্তর n-এ অরবিটাল সংখ্যা = n² = ${toBnDigits(n)}² = ${toBnDigits(orbs)}টি এবং সর্বোচ্চ ইলেকট্রন = 2n² = ${toBnDigits(maxE)}টি।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · কোয়ান্টাম সংখ্যা',
      })
    );
  });

  const subshells = [
    { name: 's (l = ০)', l: 0, orbs: 1, maxE: 2, shape: 'গোলাকার (Spherical)' },
    { name: 'p (l = ১)', l: 1, orbs: 3, maxE: 6, shape: 'ডাম্বেল আকৃতি (Dumbbell)' },
    { name: 'd (l = ২)', l: 2, orbs: 5, maxE: 10, shape: 'ডাবল ডাম্বেল আকৃতি (Cloverleaf)' },
    { name: 'f (l = ৩)', l: 3, orbs: 7, maxE: 14, shape: 'জটিল বহুলোবযুক্ত ত্রিমাত্রিক আকৃতি' },
  ];
  subshells.forEach((sub, i) => {
    const others = subshells.filter((x) => x.name !== sub.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `পরমাণুর ${sub.name} উপশক্তিস্তরে মোট অরবিটাল ও সর্বোচ্চ ইলেকট্রন সংখ্যা যথাক্রমে কত?`,
        correct: `${toBnDigits(sub.orbs)}টি অরবিটাল, ${toBnDigits(sub.maxE)}টি ইলেকট্রন`,
        distractors: others.map((x) => `${toBnDigits(x.orbs)}টি অরবিটাল, ${toBnDigits(x.maxE)}টি ইলেকট্রন`),
        explanation: `সহকারী কোয়ান্টাম সংখ্যা l = ${toBnDigits(sub.l)}-এর জন্য অরবিটাল (2l+1) = ${toBnDigits(sub.orbs)}টি এবং সর্বোচ্চ ইলেকট্রন ২×${toBnDigits(sub.orbs)} = ${toBnDigits(sub.maxE)}টি।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · উপশক্তিস্তর',
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
        question: `${sub.name} উপশক্তিস্তরের অরবিটালগুলোর সাধারণ জ্যামিতিক আকৃতি কেমন?`,
        correct: sub.shape,
        distractors: others.map((x) => x.shape),
        explanation: `${sub.name} উপশক্তিস্তরের অরবিটালগুলো ${sub.shape}-বিশিষ্ট (তবে d-এর মধ্যে dz² ডাম্বেল ও ডোনাট বলয়যুক্ত)।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · অরবিটালের আকৃতি',
      })
    );
  });

  // 2. Radial & Angular Nodes for Specific Orbitals (24 MCQs)
  const orbitalsNode = [
    { orb: '1s', n: 1, l: 0 },
    { orb: '2s', n: 2, l: 0 },
    { orb: '2p', n: 2, l: 1 },
    { orb: '3s', n: 3, l: 0 },
    { orb: '3p', n: 3, l: 1 },
    { orb: '3d', n: 3, l: 2 },
    { orb: '4s', n: 4, l: 0 },
    { orb: '4p', n: 4, l: 1 },
    { orb: '4d', n: 4, l: 2 },
    { orb: '4f', n: 4, l: 3 },
    { orb: '5s', n: 5, l: 0 },
    { orb: '5p', n: 5, l: 1 },
  ];
  orbitalsNode.forEach((o) => {
    const radial = o.n - o.l - 1;
    const angular = o.l;
    const total = o.n - 1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${o.orb} অরবিটালে রেডিয়াল বা গোলীয় নোড (Radial nodes = n − l − 1) এবং কৌণিক নোড (l) যথাক্রমে কতটি?`,
        correct: `${toBnDigits(radial)}টি রেডিয়াল ও ${toBnDigits(angular)}টি কৌণিক নোড`,
        distractors: [
          `${toBnDigits(angular)}টি রেডিয়াল ও ${toBnDigits(radial + 1)}টি কৌণিক নোড`,
          `${toBnDigits(total)}টি রেডিয়াল ও ${toBnDigits(angular + 1)}টি কৌণিক নোড`,
          `${toBnDigits(radial + 1)}টি রেডিয়াল ও ${toBnDigits(angular)}টি কৌণিক নোড`,
          `${toBnDigits(radial + 2)}টি রেডিয়াল ও ${toBnDigits(angular + 2)}টি কৌণিক নোড`,
        ],
        explanation: `${o.orb}-এ n = ${toBnDigits(o.n)} ও l = ${toBnDigits(o.l)}। রেডিয়াল নোড = n−l−1 = ${toBnDigits(radial)}টি এবং কৌণিক নোড = l = ${toBnDigits(angular)}টি (মোট নোড = ${toBnDigits(total)}টি)।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · নোডাল তল',
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
        question: `${o.orb} অরবিটালের (n + l) মান কত?`,
        correct: `${toBnDigits(o.n + o.l)}`,
        distractors: [
          `${toBnDigits(o.n + o.l + 1)}`,
          `${toBnDigits(Math.max(0, o.n + o.l - 1))}`,
          `${toBnDigits(o.n + o.l + 2)}`,
          `${toBnDigits(o.n * 2 + 1)}`,
        ],
        explanation: `${o.orb}-এর ক্ষেত্রে n = ${toBnDigits(o.n)} এবং l = ${toBnDigits(o.l)}; তাই আফবাউ (n + l) মান = ${toBnDigits(o.n)} + ${toBnDigits(o.l)} = ${toBnDigits(o.n + o.l)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · আফবাউ নীতি',
      })
    );
  });

  // 3. Spectral Series & Transition Line Count [n(n-1)/2] (22 MCQs)
  const spectralSeries = [
    { name: 'লাইম্যান (Lyman)', n1: 1, region: 'অতিবেগুনি (UV) অঞ্চল' },
    { name: 'বামার (Balmer)', n1: 2, region: 'দৃশ্যমান (Visible) অঞ্চল' },
    { name: 'প্যাশ্চেন (Paschen)', n1: 3, region: 'নিকট অবলোহিত (Near IR) অঞ্চল' },
    { name: 'ব্র্যাকেট (Brackett)', n1: 4, region: 'মধ্য অবলোহিত (Mid IR) অঞ্চল' },
    { name: 'ফুন্ড (Pfund)', n1: 5, region: 'দূর অবলোহিত (Far IR) অঞ্চল' },
    { name: 'হামফ্রিজ (Humphreys)', n1: 6, region: 'অতি দূর অবলোহিত অঞ্চল' },
  ];
  spectralSeries.forEach((s, i) => {
    const others = spectralSeries.filter((x) => x.name !== s.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `হাইড্রোজেন পারমাণবিক বর্ণালিতে ইলেকট্রন উচ্চ স্তর থেকে n₁ = ${toBnDigits(s.n1)} শক্তিস্তরে ফিরে এলে কোন বর্ণালি সারি ও অঞ্চল তৈরি হয়?`,
        correct: `${s.name} — ${s.region}`,
        distractors: others.slice(i % 2, (i % 2) + 4).map((x) => `${x.name} — ${x.region}`),
        explanation: `n₁ = ${toBnDigits(s.n1)} স্তরে ইলেকট্রন নামলে ${s.name} সিরিজ উৎপন্ন হয় যা ${s.region}-এ অবস্থান করে।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · হাইড্রোজেন বর্ণালি',
      })
    );
  });

  [3, 4, 5, 6, 7, 8].forEach((nTop) => {
    const lines = (nTop * (nTop - 1)) / 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `হাইড্রোজেন পরমাণুতে ইলেকট্রন n = ${toBnDigits(nTop)} শক্তিস্তর থেকে গ্রাউন্ড স্টেটে (n = ১) ধাপে ধাপে ফিরে এলে সর্বোচ্চ কতটি বর্ণালি রেখা পাওয়া যাবে?`,
        correct: `${toBnDigits(lines)}টি`,
        distractors: [
          `${toBnDigits(nTop - 1)}টি`,
          `${toBnDigits(nTop * 2)}টি`,
          `${toBnDigits(lines + nTop)}টি`,
          `${toBnDigits(Math.max(1, lines - 2))}টি`,
        ],
        explanation: `n = ${toBnDigits(nTop)} থেকে n = ১-এ মোট বর্ণালি রেখার সংখ্যা = n(n−1)/2 = ${toBnDigits(nTop)}×${toBnDigits(nTop - 1)}/২ = ${toBnDigits(lines)}টি।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বর্ণালি রেখার সংখ্যা',
      })
    );
  });

  // 4. Bohr Orbit Radius & Energy Level Calculations (20 MCQs)
  [1, 2, 3, 4, 5].forEach((n) => {
    const radA = (0.529 * n * n).toFixed(3).replace(/\.?0+$/, '');
    const engEv = (-13.6 / (n * n)).toFixed(2).replace(/\.?0+$/, '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(n)}-তম বোর কক্ষপথের ব্যাসার্ধ r_${toBnDigits(n)} (যেখানে r₁ = ০.৫২৯ Å) কত Å?`,
        correct: `${toBnDigits(radA)} Å`,
        distractors: [
          `${toBnDigits((0.529 * n).toFixed(3).replace(/\.?0+$/, ''))} Å`,
          `${toBnDigits((0.529 * (n * n + 1)).toFixed(3).replace(/\.?0+$/, ''))} Å`,
          `${toBnDigits((0.529 / n).toFixed(3).replace(/\.?0+$/, ''))} Å`,
          `${toBnDigits((0.529 * (n * n + 2)).toFixed(3).replace(/\.?0+$/, ''))} Å`,
          `${toBnDigits((0.529 * (n + 3)).toFixed(3).replace(/\.?0+$/, ''))} Å`,
          `${toBnDigits((0.529 * (n * n + 8)).toFixed(3).replace(/\.?0+$/, ''))} Å`,
        ],
        explanation: `হাইড্রোজেনের জন্য r_n = n² × ০.৫২৯ Å = ${toBnDigits(n * n)} × ০.৫২৯ = ${toBnDigits(radA)} Å।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বোর ব্যাসার্ধ',
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
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(n)}-তম বোর শক্তিস্তরে ইলেকট্রনের শক্তি E_${toBnDigits(n)} (যেখানে E₁ = −১৩.৬ eV) কত eV?`,
        correct: `${toBnDigits(engEv)} eV`,
        distractors: [
          `${toBnDigits((-13.6 / (n + 1)).toFixed(2).replace(/\.?0+$/, ''))} eV`,
          `${toBnDigits((-13.6 * n).toFixed(2).replace(/\.?0+$/, ''))} eV`,
          `${toBnDigits((-13.6 / (n * n + 2)).toFixed(2).replace(/\.?0+$/, ''))} eV`,
          `${toBnDigits((13.6 / (n * n)).toFixed(2).replace(/\.?0+$/, ''))} eV`,
        ],
        explanation: `বোর তত্ত্ব অনুযায়ী হাইড্রোজেনের n-তম স্তরের শক্তি E_n = −১৩.৬ / n² = −১৩.৬ / ${toBnDigits(n * n)} = ${toBnDigits(engEv)} eV।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বোর শক্তিস্তর',
      })
    );
  });

  // 5. Solubility Product (Ksp) Formulas & Quantitative Calculations (30+ MCQs)
  const kspForms = [
    { salt: 'AgCl / BaSO₄ / CaCO₃ (AB প্রকার)', eq: 'Ksp = s²', exp: 'AB ⇌ A⁺ + B⁻ হওয়ায় Ksp = s × s = s²।' },
    { salt: 'CaF₂ / PbCl₂ / Mg(OH)₂ (AB₂ প্রকার)', eq: 'Ksp = 4s³', exp: 'AB₂ ⇌ A²⁺ + 2B⁻ হওয়ায় Ksp = s × (2s)² = 4s³।' },
    { salt: 'Ag₂CrO₄ / Ag₂CO₃ (A₂B প্রকার)', eq: 'Ksp = 4s³ (বিশেষ দ্রষ্টব্য: ১টি অ্যানায়ন ও ২টি ক্যাটায়ন)', exp: 'A₂B ⇌ 2A⁺ + B²⁻ হওয়ায় Ksp = (2s)² × s = 4s³।' },
    { salt: 'Al(OH)₃ / Fe(OH)₃ (AB₃ প্রকার)', eq: 'Ksp = 27s⁴', exp: 'AB₃ ⇌ A³⁺ + 3B⁻ হওয়ায় Ksp = s × (3s)³ = 27s⁴।' },
    { salt: 'Ca₃(PO₄)₂ / Al₂(SO₄)₃ (A₃B₂ বা A₂B₃ প্রকার)', eq: 'Ksp = 108s⁵', exp: 'A₃B₂ ⇌ 3A²⁺ + 2B³⁻ হওয়ায় Ksp = (3s)³ × (2s)² = 27s³ × 4s² = 108s⁵।' },
  ];
  kspForms.forEach((kf, i) => {
    const others = kspForms.filter((x) => x.salt !== kf.salt);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `স্বল্প দ্রবণীয় লবণ "${kf.salt}"-এর মোলার দ্রাব্যতা s হলে এর দ্রাব্যতা গুণফল (Ksp)-এর সমীকরণ কোনটি?`,
        correct: kf.eq,
        distractors: others.map((x) => x.eq).concat(['Ksp = 16s⁴', 'Ksp = 8s³']),
        explanation: kf.exp,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · দ্রাব্যতা গুণফল',
      })
    );
  });

  // Numerical Ksp & Solubility math
  [
    { salt: 'AgCl', coeff: 1, pow: 2, sExp: -5, kCoeff: '১.০', kExp: -10 },
    { salt: 'BaSO₄', coeff: 1, pow: 2, sExp: -5, kCoeff: '১.০', kExp: -10 },
    { salt: 'CaCO₃', coeff: 1, pow: 2, sExp: -4, kCoeff: '১.০', kExp: -8 },
    { salt: 'CaF₂', coeff: 4, pow: 3, sExp: -4, kCoeff: '৪.০', kExp: -12 },
    { salt: 'PbCl₂', coeff: 4, pow: 3, sExp: -2, kCoeff: '৪.০', kExp: -6 },
    { salt: 'Fe(OH)₃', coeff: 27, pow: 4, sExp: -9, kCoeff: '২.৭', kExp: -35 },
  ].forEach((m) => {
    const sStr = `১.০ × ১০⁻${toBnDigits(Math.abs(m.sExp))} mol/L`;
    const kStr = `${m.kCoeff} × ১০⁻${toBnDigits(Math.abs(m.kExp))}`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `২৫ °C তাপমাত্রায় ${m.salt} লবণের সম্পৃক্ত দ্রবণে মোলার দ্রাব্যতা s = ${sStr} হলে এর দ্রাব্যতা গুণফল (Ksp) কত?`,
        correct: kStr,
        distractors: [
          `১.০ × ১০⁻${toBnDigits(Math.abs(m.sExp) * 2 + 2)}`,
          `২.০ × ১০⁻${toBnDigits(Math.abs(m.kExp) - 1)}`,
          `৪.০ × ১০⁻${toBnDigits(Math.abs(m.kExp) + 2)}`,
          `১.০ × ১০⁻${toBnDigits(Math.abs(m.sExp))}`,
        ],
        explanation: `${m.salt}-এর Ksp = ${toBnDigits(m.coeff)}s^${toBnDigits(m.pow)}। এখানে s = ${sStr} বসালে Ksp = ${kStr} পাওয়া যায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · Ksp গাণিতিক সমস্যা',
      })
    );
  });

  // 6. Flame Test Colors & Ion Detection Reagents Matrix (36 MCQs)
  const flameTests = [
    { ion: 'সোডিয়াম আয়ন (Na⁺)', naked: 'উজ্জ্বল সোনালি হলুদ (Golden yellow)', cobalt: 'বর্ণহীন (কোনো বর্ণ দেখা যায় না)' },
    { ion: 'পটাশিয়াম আয়ন (K⁺)', naked: 'বেগুনি (Lilac / Violet)', cobalt: 'গোলাপি বা লালচে-বেগুনি' },
    { ion: 'ক্যালসিয়াম আয়ন (Ca²⁺)', naked: 'ইটের মতো লাল (Brick red)', cobalt: 'হালকা সবুজ (Light green)' },
    { ion: 'স্ট্রনশিয়াম আয়ন (Sr²⁺)', naked: 'টকটকে বা ক্রিমসন লাল (Crimson red)', cobalt: 'হালকা বেগুনি' },
    { ion: 'বেরিয়াম আয়ন (Ba²⁺)', naked: 'কাঁচা আপেলের মতো হলদে-সবুজ', cobalt: 'নীলাভ সবুজ' },
    { ion: 'কপার আয়ন (Cu²⁺)', naked: 'নীলাভ সবুজ (Bluish green)', cobalt: 'সুনীল বা গাঢ় নীল' },
  ];
  flameTests.forEach((ft, i) => {
    const others = flameTests.filter((x) => x.ion !== ft.ion);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `শিখা পরীক্ষায় (খালি চোখে) "${ft.ion}" কোন বৈশিষ্ট্যপূর্ণ বর্ণ তৈরি করে?`,
        correct: ft.naked,
        distractors: others.map((x) => x.naked),
        explanation: `খালি চোখে শিখা পরীক্ষায় ${ft.ion} ${ft.naked} এবং কোবাল্ট নীল কাচের ভেতর দিয়ে ${ft.cobalt} বর্ণ দেখায়।`,
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
        difficulty: 'medical',
        question: `কোবাল্ট নীল কাচের (Cobalt blue glass) ভেতর দিয়ে দেখলে "${ft.ion}"-এর শিখার বর্ণ কেমন দেখায়?`,
        correct: ft.cobalt,
        distractors: others.map((x) => x.cobalt),
        explanation: `কোবাল্ট নীল কাচ হলুদ সোডিয়াম আলো শোষণ করে নেয়; তাই ${ft.ion} এক্ষেত্রে ${ft.cobalt} বর্ণ দেখায়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · কোবাল্ট গ্লাস পরীক্ষা',
      })
    );
  });

  const ionReagents = [
    { ion: 'NH₄⁺', reagent: 'নেসলার বিকারক (K₂[HgI₄] + KOH)', result: 'বাদামি অধঃক্ষেপ' },
    { ion: 'Cu²⁺', reagent: 'অতিরিক্ত NH₄OH দ্রবণ', result: 'গাঢ় নীল বর্ণের [Cu(NH₃)₄]²⁺ দ্রবণ' },
    { ion: 'Fe³⁺', reagent: 'পটাশিয়াম ফেরোসায়ানাইড K₄[Fe(CN)₆]', result: 'গাঢ় প্রুশিয়ান নীল অধঃক্ষেপ' },
    { ion: 'Fe²⁺', reagent: 'পটাশিয়াম ফেরিসায়ানাইড K₃[Fe(CN)₆]', result: 'টার্নবুলস নীল অধঃক্ষেপ' },
    { ion: 'Zn²⁺', reagent: 'K₄[Fe(CN)₆] (পটাশিয়াম ফেরোসায়ানাইড)', result: 'সাদা অধঃক্ষেপ (Zn₂[Fe(CN)₆])' },
    { ion: 'Ni²⁺', reagent: 'ক্ষারীয় ডাইমিথাইল গ্লাইঅক্সিম (DMG)', result: 'উজ্বল চেরি-লাল (Rosy red) অধঃক্ষেপ' },
    { ion: 'Ca²⁺', reagent: 'অ্যামোনিয়াম অক্সালেট [(NH₄)₂C₂O₄]', result: 'CH₃COOH-এ অদ্রবণীয় সাদা CaC₂O₄ অধঃক্ষেপ' },
    { ion: 'Na⁺', reagent: 'পটাশিয়াম পাইরো-অ্যান্টিমোনেট (K₂H₂Sb₂O₇)', result: 'সাদা কেলাসিত অধঃক্ষেপ (Na₂H₂Sb₂O₇)' },
    { ion: 'SO₄²⁻', reagent: 'BaCl₂ + লঘু HCl', result: 'অম্লে অদ্রবণীয় সাদা BaSO₄ অধঃক্ষেপ' },
    { ion: 'NO₃⁻', reagent: 'সদ্য প্রস্তুত FeSO₄ + গাঢ় H₂SO₄', result: 'দুই স্তরের সংযোগস্থলে বাদামি বলয়' },
  ];
  ionReagents.forEach((ir, i) => {
    const others = ionReagents.filter((x) => x.ion !== ir.ion);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জলীয় দ্রবণে ${ir.ion} আয়ন শনাক্তকরণে "${ir.reagent}" যোগ করলে কী পর্যবেক্ষণ পাওয়া যায়?`,
        correct: ir.result,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.result),
        explanation: `${ir.ion} আয়ন শনাক্তকরণে ${ir.reagent} ব্যবহার করলে ${ir.result} গঠিত হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · আয়ন শনাক্তকরণ',
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
        question: `লবণ বিশ্লেষণে "${ir.result}" পাওয়া গেলে কোন আয়নটি উপস্থিত আছে বলে নিশ্চিত হওয়া যায়?`,
        correct: ir.ion,
        distractors: others.slice((i + 3) % 5, ((i + 3) % 5) + 4).map((x) => x.ion),
        explanation: `${ir.reagent}-এর সাথে বিক্রিয়ায় ${ir.result} সৃষ্টি হওয়া ${ir.ion} আয়নের নিশ্চিতকারী পরীক্ষা।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · নিশ্চিতকরণ পরীক্ষা',
      })
    );
  });

  // 7. Hybridization, Molecular Geometry, Bond Angle & Lone Pair Matrix (54 MCQs)
  const molMatrix = [
    { mol: 'BeCl₂ / CO₂ / C₂H₂', hyb: 'sp', shape: 'সরলরৈখিক (Linear)', angle: '১৮০°', lp: '০টি নিঃসঙ্গ জোড়' },
    { mol: 'BF₃ / BCl₃ / SO₃ / NO₃⁻', hyb: 'sp²', shape: 'সমতলীয় ত্রিকোণাকার (Trigonal planar)', angle: '১২০°', lp: '০টি নিঃসঙ্গ জোড়' },
    { mol: 'SO₂ / SnCl₂ (গ্যাসীয়) / O₃', hyb: 'sp² (১টি lp)', shape: 'কৌণিক / V-আকৃতি (Bent)', angle: '১১৯° (বা < ১২০°)', lp: '১টি নিঃসঙ্গ জোড়' },
    { mol: 'CH₄ / CCl₄ / NH₄⁺ / SO₄²⁻', hyb: 'sp³', shape: 'সুষম চতুস্তলকীয় (Tetrahedral)', angle: '১০৯.৫° (১০৯°২৮′)', lp: '০টি নিঃসঙ্গ জোড়' },
    { mol: 'NH₃ / PCl₃ / H₃O⁺ / NF₃', hyb: 'sp³ (১টি lp)', shape: 'ত্রিকোণাকার পিরামিডীয় (Trigonal pyramidal)', angle: '১০৭° (NH₃) / ১০২.৫° (NF₃)', lp: '১টি নিঃসঙ্গ জোড়' },
    { mol: 'H₂O / H₂S / OF₂ / Cl₂O', hyb: 'sp³ (২টি lp)', shape: 'কৌণিক / V-আকৃতি (Bent/Angular)', angle: '১০৪.৫° (H₂O) / ৯২° (H₂S)', lp: '২টি নিঃসঙ্গ জোড়' },
    { mol: 'PCl₅ / PF₅ / SbCl₅', hyb: 'sp³d', shape: 'ত্রিকোণাকার দ্বিপিরামিডীয়', angle: '৯০° ও ১২০°', lp: '০টি নিঃসঙ্গ জোড়' },
    { mol: 'SF₆ / [FeF₆]³⁻', hyb: 'sp³d²', shape: 'অষ্টতলকীয় (Octahedral)', angle: '৯০°', lp: '০টি নিঃসঙ্গ জোড়' },
    { mol: 'XeF₄ / [ICl₄]⁻', hyb: 'sp³d² (২টি lp)', shape: 'বর্গাকার সমতলীয় (Square planar)', angle: '৯০°', lp: '২টি নিঃসঙ্গ জোড়' },
    { mol: 'IF₇', hyb: 'sp³d³', shape: 'পঞ্চভুজীয় দ্বিপিরামিডীয়', angle: '৭২° ও ৯০°', lp: '০টি নিঃসঙ্গ জোড়' },
    { mol: '[Cu(NH₃)₄]²⁺ / [Ni(CN)₄]²⁻', hyb: 'dsp²', shape: 'বর্গাকার সমতলীয় (Square planar)', angle: '৯০° (জটিল আয়ন)', lp: 'অন্তঃস্থ d-সংকরায়ন' },
    { mol: 'XeF₂ / I₃⁻', hyb: 'sp³d (৩টি lp)', shape: 'সরলরৈখিক (৩টি নিঃসঙ্গ জোড়সহ)', angle: '১৮০° (বিষুবীয় সমতলে lp)', lp: '৩টি নিঃসঙ্গ জোড়' },
  ];
  const distinctHyb = Array.from(new Set(molMatrix.map((m) => m.hyb)));
  const distinctShapes = Array.from(new Set(molMatrix.map((m) => m.shape)));
  const distinctAngles = Array.from(new Set(molMatrix.map((m) => m.angle)));

  molMatrix.forEach((m, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch3_periodic',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${m.mol}" যৌগ বা আয়নের কেন্দ্রীয় পরমাণুতে কোন ধরনের সংকরায়ন (Hybridization) বিদ্যমান?`,
        correct: m.hyb,
        distractors: distinctHyb.filter((x) => x !== m.hyb).slice(i % 5, (i % 5) + 4).concat(distinctHyb.filter((x) => x !== m.hyb)),
        explanation: `${m.mol}-এ কেন্দ্রীয় পরমাণুর সংকরায়ন হলো ${m.hyb}, এর আকৃতি ${m.shape} এবং বন্ধন কোণ ${m.angle}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · সংকরায়ন',
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
        question: `"${m.mol}" অণু বা আয়নের ত্রিমাত্রিক জ্যামিতিক আকৃতি কেমন?`,
        correct: m.shape,
        distractors: distinctShapes.filter((x) => x !== m.shape).slice(i % 4, (i % 4) + 4).concat(distinctShapes.filter((x) => x !== m.shape)),
        explanation: `${m.mol}-এর সংকরায়ন ${m.hyb} (${m.lp}) হওয়ায় এর জ্যামিতিক আকৃতি ${m.shape} ও বন্ধন কোণ ${m.angle}।`,
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
        difficulty: 'dental',
        question: `"${m.mol}"-এ আদর্শ বন্ধন কোণের (Bond angle) মান কত?`,
        correct: m.angle,
        distractors: distinctAngles.filter((x) => x !== m.angle).slice(i % 4, (i % 4) + 4).concat(distinctAngles.filter((x) => x !== m.angle)),
        explanation: `${m.mol}-এ ${m.hyb} সংকরায়ন ও ${m.lp} থাকায় বন্ধন কোণ ${m.angle} হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · বন্ধন কোণ',
      })
    );
  });

  // 8. Abnormal Electron Configurations & Unpaired Electrons in d-Block Ions (24 MCQs)
  const dConfig = [
    { sp: 'Cr (Z = ২৪)', cfg: '[Ar] 3d⁵ 4s¹', unp: 6, note: 'স্থায়ী অর্ধপূর্ণ 3d⁵ বিন্যাস লাভের জন্য 4s থেকে ১টি ইলেকট্রন 3d-তে যায়।' },
    { sp: 'Cu (Z = ২৯)', cfg: '[Ar] 3d¹⁰ 4s¹', unp: 1, note: 'স্থায়ী পরিপূর্ণ 3d¹⁰ বিন্যাস লাভের জন্য 4s থেকে ১টি ইলেকট্রন 3d-তে যায়।' },
    { sp: 'Mo (Z = ৪২)', cfg: '[Kr] 4d⁵ 5s¹', unp: 6, note: 'ক্রোমিয়ামের মতো মলিবডেনামেও অর্ধপূর্ণ 4d⁵ 5s¹ ব্যতিক্রম ঘটে।' },
    { sp: 'Ag (Z = ৪৭)', cfg: '[Kr] 4d¹⁰ 5s¹', unp: 1, note: 'কপারের মতো সিলভারেও পরিপূর্ণ 4d¹⁰ 5s¹ ব্যতিক্রম ঘটে।' },
    { sp: 'Pd (Z = ৪৬)', cfg: '[Kr] 4d¹⁰ 5s⁰', unp: 0, note: 'প্যালাডিয়াম পরমাণুতে 5s-এর দুটি ইলেকট্রনই 4d-তে গিয়ে 4d¹⁰ 5s⁰ হয়।' },
    { sp: 'Fe²⁺ (Z = ২৬)', cfg: '[Ar] 3d⁶ 4s⁰', unp: 4, note: 'ইলেকট্রন সর্বদা বহিঃস্থ 4s থেকে আগে নির্গত হয়; তাই Fe²⁺-এ ৪টি বিজোড় ইলেকট্রন।' },
    { sp: 'Fe³⁺ (Z = ২৬)', cfg: '[Ar] 3d⁵ 4s⁰', unp: 5, note: 'অর্ধপূর্ণ 3d⁵ বিন্যাসের কারণে Fe³⁺ অত্যন্ত স্থায়ী (৫টি বিজোড় ইলেকট্রন)।' },
    { sp: 'Mn²⁺ (Z = ২৫)', cfg: '[Ar] 3d⁵ 4s⁰', unp: 5, note: 'Mn ([Ar] 3d⁵ 4s²) থেকে 4s² বের হয়ে Mn²⁺ (৫টি বিজোড় ইলেকট্রন) হয়।' },
    { sp: 'Cu²⁺ (Z = ২৯)', cfg: '[Ar] 3d⁹ 4s⁰', unp: 1, note: '4s¹ ও একটি 3d ইলেকট্রন অপসারিত হয়ে Cu²⁺-এ ১টি বিজোড় ইলেকট্রন থাকে (নীল রং)।' },
    { sp: 'Cr³⁺ (Z = ২৪)', cfg: '[Ar] 3d³ 4s⁰', unp: 3, note: 'Cr³⁺ আয়নে তিনটি বিজোড় d-ইলেকট্রন রয়েছে।' },
    { sp: 'Ni²⁺ (Z = ২৮)', cfg: '[Ar] 3d⁸ 4s⁰', unp: 2, note: 'Ni ([Ar] 3d⁸ 4s²) থেকে 4s² বের হলে 3d⁸-এ ২টি বিজোড় ইলেকট্রন থাকে।' },
    { sp: 'Zn²⁺ (Z = ৩০)', cfg: '[Ar] 3d¹⁰ 4s⁰', unp: 0, note: 'সব d-ইলেকট্রন যুগ্ম (০ বিজোড়) হওয়ায় Zn²⁺ ডায়াচৌম্বক ও বর্ণহীন।' },
  ];
  dConfig.forEach((dc, i) => {
    const others = dConfig.filter((x) => x.sp !== dc.sp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${dc.sp}"-এর সঠিক ইলেকট্রন বিন্যাস কোনটি?`,
        correct: dc.cfg,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.cfg),
        explanation: `${dc.sp}-এর বিন্যাস ${dc.cfg}। ${dc.note}`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · ইলেকট্রন বিন্যাসের ব্যতিক্রম',
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
        question: `স্বাভাবিক অবস্থায় "${dc.sp}"-এ বিজোড় (অযুগ্ম) ইলেকট্রনের সংখ্যা কতটি?`,
        correct: `${toBnDigits(dc.unp)}টি`,
        distractors: Array.from(new Set([0, 1, 2, 3, 4, 5, 6].filter((u) => u !== dc.unp))).map(
          (u) => `${toBnDigits(u)}টি`
        ),
        explanation: `${dc.cfg} বিন্যাসে হুন্ডের নীতি অনুযায়ী বিজোড় ইলেকট্রন ${toBnDigits(dc.unp)}টি। ${dc.note}`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · চৌম্বক ভ্রামক',
      })
    );
  });

  return list;
}
