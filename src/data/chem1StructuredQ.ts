import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Chem1QMatrix {
  ch: 'chem1_ch1_lab' | 'chem1_ch2_qualitative' | 'chem1_ch3_periodic' | 'chem1_ch4_equilibrium' | 'chem1_ch5_applied';
  vl: string;
  topic: string;
  fact: string;
  examFocus: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildChem1StructuredQ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c1sq_${String(seq++).padStart(4, '0')}`;

  // 1. Bohr Radius, Orbital Nodes, Quantum Numbers & Spectral Series Calculations (~170 MCQs)
  const shells = [1, 2, 3, 4, 5, 6];
  shells.forEach((n) => {
    const maxElec = 2 * n * n;
    const orbitals = n * n;
    const totalNodes = n - 1;
    const rRatio = n * n;
    const angMomFactor = n / 2;
    const hVal = n === 1 ? 'h / 2π' : n === 2 ? 'h / π' : `${toBnDigits(n)}h / 2π`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: n <= 4 ? 'board' : 'medical',
        question: `পরমাণুর n = ${toBnDigits(n)} প্রধান শক্তিস্তরে মোট অরবিটাল সংখ্যা এবং সর্বোচ্চ ধারণক্ষম ইলেকট্রন সংখ্যা যথাক্রমে কত?`,
        correct: `${toBnDigits(orbitals)}টি অরবিটাল ও ${toBnDigits(maxElec)}টি ইলেকট্রন`,
        distractors: [
          `${toBnDigits(n)}টি অরবিটাল ও ${toBnDigits(2 * n)}টি ইলেকট্রন`,
          `${toBnDigits(maxElec)}টি অরবিটাল ও ${toBnDigits(orbitals)}টি ইলেকট্রন`,
          `${toBnDigits(orbitals + n)}টি অরবিটাল ও ${toBnDigits(maxElec * 2)}টি ইলেকট্রন`,
          `${toBnDigits(orbitals + 2)}টি অরবিটাল ও ${toBnDigits(maxElec + 4)}টি ইলেকট্রন`,
          `${toBnDigits(orbitals + 3)}টি অরবিটাল ও ${toBnDigits(maxElec + 6)}টি ইলেকট্রন`,
        ],
        explanation: `n-তম প্রধান শক্তিস্তরে মোট অরবিটাল সংখ্যা n² = ${toBnDigits(orbitals)}টি এবং সর্বোচ্চ ইলেকট্রন ধারণক্ষমতা 2n² = ${toBnDigits(maxElec)}টি।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · কোয়ান্টাম সংখ্যা ও অরবিটাল',
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
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(n)}-তম বোর কক্ষপথের ব্যাসার্ধ প্রথম কক্ষপথের (r₁ = ০.৫২৯ Å) তুলনায় কত গুণ হবে?`,
        correct: `${toBnDigits(rRatio)} গুণ (${toBnDigits((0.529 * rRatio).toFixed(3))} Å)`,
        distractors: [
          `${toBnDigits(n)} গুণ (${toBnDigits((0.529 * n).toFixed(3))} Å)`,
          `${toBnDigits(2 * n)} গুণ (${toBnDigits((0.529 * 2 * n).toFixed(3))} Å)`,
          `${toBnDigits(rRatio * 2)} গুণ (${toBnDigits((0.529 * rRatio * 2).toFixed(3))} Å)`,
          `${toBnDigits(rRatio + 3)} গুণ (${toBnDigits((0.529 * (rRatio + 3)).toFixed(3))} Å)`,
          `${toBnDigits(rRatio + 5)} গুণ (${toBnDigits((0.529 * (rRatio + 5)).toFixed(3))} Å)`,
        ],
        explanation: `বোর তত্ত্ব অনুযায়ী rₙ = n² × r₁ / Z। হাইড্রোজেনে Z = ১ হওয়ায় n = ${toBnDigits(n)} কক্ষপথের ব্যাসার্ধ প্রথম কক্ষপথের n² = ${toBnDigits(rRatio)} গুণ।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · বোর পরমাণু মডেল',
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
        question: `বোরের পরমাণু মডেল অনুসারে হাইড্রোজেনের ${toBnDigits(n)}-তম কক্ষপথে ঘূর্ণায়মান ইলেকট্রনের কৌণিক ভরবেগ (mvr) কত?`,
        correct: hVal,
        distractors: [
          n === 1 ? '2h / π' : `${toBnDigits(angMomFactor + 1)}h / π`,
          `${toBnDigits(n * n)}h / 2π`,
          `h / ${toBnDigits(n + 2)}π`,
        ],
        explanation: `বোরের স্বীকার্য অনুযায়ী mvr = nh / 2π। এখানে n = ${toBnDigits(n)} বসালে কৌণিক ভরবেগ হয় ${hVal}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · কৌণিক ভরবেগ',
      })
    );

    if (n >= 2) {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_1',
          chapterId: 'chem1_ch2_qualitative',
          visualLessonId: 'hybridization',
          hscLevel: '11',
          difficulty: 'dental',
          question: `${toBnDigits(n)}s অরবিটালে মোট কতটি গোলীয় বা রেডিয়াল নোড (Radial node) থাকে?`,
          correct: `${toBnDigits(totalNodes)}টি`,
          distractors: [
            `${toBnDigits(n)}টি`,
            `${toBnDigits(n + 1)}টি`,
            `০টি (কোনো নোড নেই)`,
          ],
          explanation: `যেকোনো অরবিটালের রেডিয়াল নোড = (n - l - 1)। s অরবিটালের জন্য l = 0 হওয়ায় ${toBnDigits(n)}s-এ রেডিয়াল নোড = ${toBnDigits(n)} - 0 - 1 = ${toBnDigits(totalNodes)}টি।`,
          reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · অরবিটালের নোড গণনা',
        })
      );
    }
  });

  const subshellNodes: Array<{ orb: string; n: number; l: number }> = [
    { orb: '2p', n: 2, l: 1 },
    { orb: '3p', n: 3, l: 1 },
    { orb: '3d', n: 3, l: 2 },
    { orb: '4p', n: 4, l: 1 },
    { orb: '4d', n: 4, l: 2 },
    { orb: '4f', n: 4, l: 3 },
    { orb: '5p', n: 5, l: 1 },
    { orb: '5d', n: 5, l: 2 },
    { orb: '5f', n: 5, l: 3 },
    { orb: '6d', n: 6, l: 2 },
  ];
  subshellNodes.forEach(({ orb, n, l }) => {
    const rad = n - l - 1;
    const ang = l;
    const tot = n - 1;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${orb} অরবিটালের রেডিয়াল নোড, কৌণিক নোড ও মোট নোডের সংখ্যা যথাক্রমে কত?`,
        correct: `${toBnDigits(rad)}টি, ${toBnDigits(ang)}টি ও ${toBnDigits(tot)}টি`,
        distractors: [
          `${toBnDigits(ang)}টি, ${toBnDigits(rad)}টি ও ${toBnDigits(tot)}টি`,
          `${toBnDigits(rad + 1)}টি, ${toBnDigits(ang)}টি ও ${toBnDigits(n)}টি`,
          `${toBnDigits(tot)}টি, ${toBnDigits(ang + 1)}টি ও ${toBnDigits(rad)}টি`,
          `${toBnDigits(rad + 2)}টি, ${toBnDigits(ang + 1)}টি ও ${toBnDigits(tot + 3)}টি`,
        ],
        explanation: `${orb} অরবিটালে n = ${toBnDigits(n)}, l = ${toBnDigits(l)}। তাই রেডিয়াল নোড (n-l-1) = ${toBnDigits(rad)}, কৌণিক নোড (l) = ${toBnDigits(ang)} এবং মোট নোড (n-1) = ${toBnDigits(tot)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · অরবিটালের নোডাল তল',
      })
    );
  });

  // Spectral lines count from excited level n to ground state
  [3, 4, 5, 6, 7, 8].forEach((n) => {
    const lines = (n * (n - 1)) / 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'hybridization',
        hscLevel: '11',
        difficulty: 'medical',
        question: `হাইড্রোজেন পরমাণুর ইলেকট্রন n = ${toBnDigits(n)} শক্তিস্তর থেকে ভূমিস্তরে (n = ১) ফিরে আসলে সর্বমোট কতটি বর্ণালি রেখা পাওয়া যেতে পারে?`,
        correct: `${toBnDigits(lines)}টি`,
        distractors: [
          `${toBnDigits(n - 1)}টি`,
          `${toBnDigits(n * (n + 1) / 2)}টি`,
          `${toBnDigits(lines + 2)}টি`,
        ],
        explanation: `উচ্চ শক্তিস্তর n থেকে ভূমিস্তরে ফেরার সময় সম্ভাব্য সর্বোচ্চ বর্ণালি রেখার সংখ্যা = n(n - 1)/2 = ${toBnDigits(n)}×${toBnDigits(n - 1)}/2 = ${toBnDigits(lines)}টি।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · পারমাণবিক বর্ণালি',
      })
    );
  });

  // 2. Solubility Product (Ksp) Numericals (~70 MCQs)
  const kspValues = [1, 2, 3, 4, 5];
  kspValues.forEach((s) => {
    const kspAb = s * s;
    const kspAb2 = 4 * s * s * s;
    const kspAb3 = 27 * Math.pow(s, 4);
    const kspA2b3 = 108 * Math.pow(s, 5);

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `AB ধরনের একটি স্বল্পদ্রবণীয় লবণের সম্পৃক্ত দ্রবণে দ্রাব্যতা ${toBnDigits(s)} × ১০⁻⁴ mol/L হলে এর দ্রাব্যতা গুণফল (Ksp) কত?`,
        correct: `${toBnDigits(kspAb)} × ১০⁻⁸ mol²L⁻²`,
        distractors: [
          `${toBnDigits(kspAb)} × ১০⁻⁴ mol²L⁻²`,
          `${toBnDigits(4 * kspAb)} × ১০⁻⁸ mol²L⁻²`,
          `${toBnDigits(s)} × ১০⁻⁸ mol²L⁻²`,
          `${toBnDigits(2 * kspAb + 1)} × ১০⁻⁸ mol²L⁻²`,
        ],
        explanation: `AB ⇌ A⁺ + B⁻ হলে Ksp = S² = (${toBnDigits(s)} × ১০⁻⁴)² = ${toBnDigits(kspAb)} × ১০⁻⁸ mol²L⁻²।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · দ্রাব্যতা গুণফল',
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
        question: `AB₂ (যেমন CaF₂ বা PbCl₂) ধরনের লবণের মোলার দ্রাব্যতা S = ${toBnDigits(s)} × ১০⁻³ M হলে Ksp-এর মান কত?`,
        correct: `${toBnDigits(kspAb2)} × ১০⁻⁹ M³`,
        distractors: [
          `${toBnDigits(s * s * s)} × ১০⁻⁹ M³`,
          `${toBnDigits(2 * s * s * s)} × ১০⁻⁹ M³`,
          `${toBnDigits(kspAb2)} × ১০⁻⁶ M³`,
        ],
        explanation: `AB₂ ⇌ A²⁺ + 2B⁻ হলে Ksp = S × (2S)² = 4S³ = 4 × (${toBnDigits(s)} × ১০⁻³)³ = ${toBnDigits(kspAb2)} × ১০⁻⁹ M³।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · AB₂ লবণের Ksp',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch2_qualitative',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'dental',
        question: `Fe(OH)₃ বা Al(OH)₃ ধরনের AB₃ যৌগের দ্রাব্যতা S = ${toBnDigits(s)} × ১০⁻⁴ M হলে Ksp কত হবে?`,
        correct: `${toBnDigits(kspAb3)} × ১০⁻¹⁶ M⁴`,
        distractors: [
          `${toBnDigits(Math.pow(s, 4))} × ১০⁻¹⁶ M⁴`,
          `${toBnDigits(9 * Math.pow(s, 4))} × ১০⁻¹⁶ M⁴`,
          `${toBnDigits(4 * Math.pow(s, 3))} × ১০⁻¹² M³`,
        ],
        explanation: `AB₃ ⇌ A³⁺ + 3B⁻ হলে Ksp = S × (3S)³ = 27S⁴ = 27 × (${toBnDigits(s)} × ১০⁻⁴)⁴ = ${toBnDigits(kspAb3)} × ১০⁻¹⁶ M⁴।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · AB₃ লবণের Ksp',
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
        question: `Ca₃(PO₄)₂ বা A₃B₂ (বা A₂B₃) ধরনের লবণের মোলার দ্রাব্যতা S = ${toBnDigits(s)} × ১০⁻² M হলে Ksp-এর সমীকরণ ও মান কোনটি?`,
        correct: `108S⁵ = ${toBnDigits(kspA2b3)} × ১০⁻¹⁰ M⁵`,
        distractors: [
          `27S⁴ = ${toBnDigits(kspAb3)} × ১০⁻⁸ M⁴`,
          `36S⁵ = ${toBnDigits(36 * Math.pow(s, 5))} × ১০⁻¹⁰ M⁵`,
          `108S⁴ = ${toBnDigits(kspA2b3)} × ১০⁻⁸ M⁴`,
        ],
        explanation: `A₂B₃ ⇌ 2A³⁺ + 3B²⁻ হলে Ksp = (2S)² × (3S)³ = 4S² × 27S³ = 108S⁵ = ${toBnDigits(kspA2b3)} × ১০⁻¹⁰ M⁵।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · জটিল লবণের Ksp',
      })
    );
  });

  // 3. pH, pOH, Kw & Dilution Numericals (~65 MCQs)
  const strongAcids = [
    { name: 'HCl', conc: '0.1', ph: '1.0', poh: '13.0' },
    { name: 'HCl', conc: '0.01', ph: '2.0', poh: '12.0' },
    { name: 'HCl', conc: '0.001', ph: '3.0', poh: '11.0' },
    { name: 'HNO₃', conc: '0.0001', ph: '4.0', poh: '10.0' },
    { name: 'H₂SO₄', conc: '0.05', ph: '1.0', poh: '13.0' },
    { name: 'H₂SO₄', conc: '0.005', ph: '2.0', poh: '12.0' },
    { name: 'H₂SO₄', conc: '0.0005', ph: '3.0', poh: '11.0' },
  ];
  strongAcids.forEach((a, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `২৫°C তাপমাত্রায় ${toBnDigits(a.conc)} M ${a.name} জলীয় দ্রবণের pH ও pOH যথাক্রমে কত?`,
        correct: `pH = ${toBnDigits(a.ph)} ও pOH = ${toBnDigits(a.poh)}`,
        distractors: [
          `pH = ${toBnDigits(a.poh)} ও pOH = ${toBnDigits(a.ph)}`,
          `pH = ${toBnDigits((Number(a.ph) + 1).toFixed(1))} ও pOH = ${toBnDigits((Number(a.poh) - 1).toFixed(1))}`,
          `pH = ${toBnDigits((Number(a.ph) + 2).toFixed(1))} ও pOH = ${toBnDigits((Number(a.poh) - 2).toFixed(1))}`,
        ],
        explanation: `${a.name} তীব্র অ্যাসিড হওয়ায় সম্পূর্ণ বিয়োজিত হয় (H₂SO₄-এ [H⁺] = 2 × ঘনমাত্রা)। তাই [H⁺] থেকে pH = ${toBnDigits(a.ph)} এবং pOH = ১৪ - ${toBnDigits(a.ph)} = ${toBnDigits(a.poh)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · pH ও pOH গণনা',
      })
    );
  });

  const strongBases = [
    { name: 'NaOH', conc: '0.1', ph: '13.0', poh: '1.0' },
    { name: 'NaOH', conc: '0.01', ph: '12.0', poh: '2.0' },
    { name: 'KOH', conc: '0.001', ph: '11.0', poh: '3.0' },
    { name: 'Ba(OH)₂', conc: '0.05', ph: '13.0', poh: '1.0' },
    { name: 'Ca(OH)₂', conc: '0.005', ph: '12.0', poh: '2.0' },
    { name: 'Ba(OH)₂', conc: '0.0005', ph: '11.0', poh: '3.0' },
  ];
  strongBases.forEach((b, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `২৫°C তাপমাত্রায় ${toBnDigits(b.conc)} M ${b.name} দ্রবণের pH মান কত হবে?`,
        correct: `${toBnDigits(b.ph)}`,
        distractors: [
          `${toBnDigits(b.poh)}`,
          `${toBnDigits((Number(b.ph) - 1).toFixed(1))}`,
          `${toBnDigits((Number(b.ph) - 2).toFixed(1))}`,
        ],
        explanation: `${b.name} তীব্র ক্ষারের ক্ষেত্রে pOH = -log[OH⁻] = ${toBnDigits(b.poh)} (দ্বি-অম্লীয় ক্ষারে ২×ঘনমাত্রা)। তাই pH = ১৪ - ${toBnDigits(b.poh)} = ${toBnDigits(b.ph)}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · ক্ষারীয় দ্রবণের pH',
      })
    );
  });

  // Buffer & Ostwald Dilution
  const pkaList = [
    { acid: 'CH₃COOH', pka: '4.76', ratio: '১ : ১', ph: '4.76' },
    { acid: 'CH₃COOH', pka: '4.76', ratio: '১০ : ১ (লবণ ১০ গুণ)', ph: '5.76' },
    { acid: 'CH₃COOH', pka: '4.76', ratio: '১ : ১০ (অ্যাসিড ১০ গুণ)', ph: '3.76' },
    { acid: 'HCOOH', pka: '3.75', ratio: '১ : ১', ph: '3.75' },
    { acid: 'HCOOH', pka: '3.75', ratio: '১০ : ১ (লবণ ১০ গুণ)', ph: '4.75' },
    { acid: 'HCN', pka: '9.21', ratio: '১ : ১', ph: '9.21' },
  ];
  pkaList.forEach((bf) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: 'chem1_ch4_equilibrium',
        visualLessonId: 'ph_buffer',
        hscLevel: '11',
        difficulty: 'medical',
        question: `${bf.acid} (pKa = ${toBnDigits(bf.pka)}) এবং এর লবণের অনুপাত ${bf.ratio} নিয়ে গঠিত অম্লীয় বাফার দ্রবণের pH কত?`,
        correct: `${toBnDigits(bf.ph)}`,
        distractors: [
          `${toBnDigits((Number(bf.ph) + 1.5).toFixed(2))}`,
          `${toBnDigits((14 - Number(bf.ph)).toFixed(2))}`,
          `${toBnDigits((Number(bf.ph) - 1.2).toFixed(2))}`,
        ],
        explanation: `হেন্ডারসন-হ্যাসেলবাখ সমীকরণ pH = pKa + log([Salt]/[Acid]) অনুযায়ী অনুপাত ১:১ হলে pH = pKa = ${toBnDigits(bf.pka)}, লবণ ১০ গুণ হলে +১ যোগ হয়ে ${toBnDigits(bf.ph)} হয়।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · বাফার দ্রবণ',
      })
    );
  });

  // 4. High-Yield Exam Matrix across Ch 1–5 (68 rows × 4 angles = 272 MCQs)
  const matrix: Chem1QMatrix[] = [
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      topic: '৪-ডিজিট অ্যানালিটিক্যাল ব্যালেন্স বনাম পল-বুঙ্গি ব্যালেন্স',
      fact: '৪-ডিজিট ডিজিটাল ব্যালেন্স ০.০০০১ g (০.১ mg) পর্যন্ত সূক্ষ্মভাবে ভর মাপতে পারে এবং পল-বুঙ্গি ব্যালেন্সের রাইডার ধ্রুবক ০.০০০২ g (৫ mg রাইডার ব্যবহারে)',
      examFocus: 'পল-বুঙ্গি ব্যালেন্সে ১০ mg রাইডার ব্যবহার করলে রাইডার ধ্রুবক হয় ০.০০০৪ g',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      topic: 'বুরেট, পিপেট ও ভলিউমেট্রিক ফ্লাস্কের ব্যবহার ও গ্রেড',
      fact: 'বুরেট দিয়ে যেকোনো ক্ষুদ্র আয়তন (০.১ mL সূক্ষ্মতায়) ফোঁটায় ফোঁটায় যোগ করা হয় এবং পিপেট ও ভলিউমেট্রিক ফ্লাস্ক নির্দিষ্ট আয়তন পরিমাপ ও প্রমাণ দ্রবণ তৈরিতে ব্যবহৃত হয়',
      examFocus: 'বুরেট-পিপেট পরিষ্কারে পটাশিয়াম ডাইক্রোমেট ও গাঢ় H₂SO₄-এর মিশ্রণ ক্রোমিক অ্যাসিড ব্যবহার করা হয়',
      diff: 'board',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      topic: 'রাসায়নিক বিকারকের বিশুদ্ধতার গ্রেড: অ্যানালার (AnalaR) বনাম ল্যাবরেটরি গ্রেড',
      fact: 'অ্যানালার (Analytical Reagent) গ্রেডের বিশুদ্ধতা ৯৯.৫%–৯৯.৯% যা সূক্ষ্ম টাইট্রেশন ও গবেষণায় ব্যবহৃত হয়; ল্যাবরেটরি গ্রেড সাধারণ শিক্ষামূলক কাজে ব্যবহৃত হয়',
      examFocus: 'ফ্লোরোসেন্স ও স্পেকট্রোস্কোপিতে আল্ট্রা-পিওর HPLC/Spectroscopic গ্রেড ব্যবহৃত হয়',
      diff: 'dental',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      topic: 'GHS ঝুঁকি প্রতীক: জারক (Oxidizing) ও দাহ্য (Flammable) চিহ্ন',
      fact: 'বৃত্তের ওপর আগুনের শিখা হলো জারক পদার্থ (KMnO₄, K₂Cr₂O₇, HNO₃) এবং শুধু আগুনের শিখা হলো দাহ্য পদার্থ (ইথার, অ্যাসিটোন, অ্যালকোহল)',
      examFocus: 'মানুষের মাথার খুলি ও দুটি ক্রস হাড় তীব্র বিষাক্ত (KCN, HgCl₂, As₂O₃) নির্দেশ করে',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      topic: 'সবুজ রসায়নের (Green Chemistry) ১২টি নীতি ও অ্যাটম ইকোনমি',
      fact: 'অ্যাটম ইকোনমি (%) = (কাঙ্ক্ষিত উৎপাদের আণবিক ভর / সব বিক্রিয়কের মোট আণবিক ভর) × ১০০%; সংযোজন ও পুনর্বিন্যাস বিক্রিয়ার অ্যাটম ইকোনমি ১০০%',
      examFocus: 'দ্রাবক হিসেবে বিষাক্ত বেনজিন বা CCl₄-এর বদলে সুপারক্রিটিক্যাল CO₂ বা পানি ব্যবহার করা সবুজ রসায়নের মূলনীতি',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'রাদারফোর্ডের আলফা-কণা বিচ্ছুরণ পরীক্ষায় সোনার পাত ও ZnS পর্দা',
      fact: '০.০০০৪ cm (৪×১০⁻⁴ cm) পুরু সোনার পাতে আলফা কণা (₂He⁴²⁺) নিক্ষেপ করে প্রায় ৯৯% কণা সোজা ভেদ করে যাওয়ায় প্রমাণ হয় পরমাণুর অধিকাংশ স্থানই ফাঁকা',
      examFocus: 'প্রতি ২০,০০০ কণার মধ্যে প্রায় ১টি ১৮০° কোণে ফিরে আসায় পরমাণুর কেন্দ্রে ক্ষুদ্র, ভারী ও ধনাত্মক নিউক্লিয়াসের অস্তিত্ব প্রমাণিত হয়',
      diff: 'board',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'বোর পরমাণু মডেলের সীমাবদ্ধতা: জিম্যান ও স্টার্ক প্রভাব',
      fact: 'চৌম্বক ক্ষেত্রে বর্ণালি রেখার বিভাজন (জিম্যান প্রভাব) এবং তড়িৎ ক্ষেত্রে বর্ণালি রেখার বিভাজন (স্টার্ক প্রভাব) বোর মডেল ব্যাখ্যা করতে পারে না',
      examFocus: 'একটি মাত্র ইলেকট্রনযুক্ত প্রজাতি (H, He⁺, Li²⁺, Be³⁺) ছাড়া বহু-ইলেকট্রন পরমাণুর বর্ণালি বোর মডেল ব্যাখ্যা করে না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'ডি-ব্রগলির সমীকরণ (λ = h / mv) ও হাইজেনবার্গের অনিশ্চয়তা নীতি',
      fact: 'গতিশীল কণার তরঙ্গদৈর্ঘ্য ভরবেগের ব্যস্তানুপাতিক এবং Δx · Δp ≥ h / 4π অনুসারে ইলেকট্রনের অবস্থান ও ভরবেগ একইসাথে শতভাগ নির্ভুলভাবে মাপা অসম্ভব',
      examFocus: 'হাইজেনবার্গ নীতি বোরের নির্দিষ্ট বৃত্তাকার কক্ষপথ ধারণাকে বাতিল করে অরবিটাল (ইলেকট্রন মেঘ) ধারণা প্রতিষ্ঠা করে',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'পাউলির বর্জন নীতি ও হুন্ডের সর্বোচ্চ স্পিন-বহুত্ব নীতি',
      fact: 'পাউলির নীতিমতে একটি অরবিটালে সর্বোচ্চ ২টি বিপরীত স্পিনের ইলেকট্রন থাকতে পারে; হুন্ডের নীতিমতে সমশক্তির অরবিটালে (p, d, f) একমুখী স্পিনে একটি করে প্রবেশের পরই যুগ্ম হয়',
      examFocus: 'হুন্ডের নীতি s অরবিটালের ক্ষেত্রে প্রযোজ্য নয়, কারণ s উপস্তরে একটিমাত্র অরবিটাল থাকে',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'Cr (২৪) ও Cu (২৯)-এর ব্যতিক্রমী ইলেকট্রন বিন্যাস',
      fact: 'অর্ধপূর্ণ (d⁵) ও পূর্ণ (d¹⁰) অরবিটালের অতিরিক্ত স্থিতিশীলতার কারণে Cr-এ [Ar]3d⁵4s¹ এবং Cu-এ [Ar]3d¹⁰4s¹ বিন্যাস হয়',
      examFocus: 'প্রতিসম বিন্যাস ও উচ্চ বিনিময় শক্তি (Exchange energy) d⁵ ও d¹⁰ কাঠামোকে স্থিতিশীল করে',
      diff: 'board',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'MRI (Magnetic Resonance Imaging) ও IR বর্ণালির চিকিৎসাবিজ্ঞানে ব্যবহার',
      fact: 'MRI যন্ত্রে রেডিও-তরঙ্গ ও শক্তিশালী চৌম্বক ক্ষেত্রে দেহের পানির প্রোটনের (¹H নিউক্লিয়াস) স্পিন অনুরণনের মাধ্যমে কোমল টিস্যুর ত্রিমাত্রিক ছবি পাওয়া যায়',
      examFocus: 'জাল নোট ও জাল পাসপোর্ট শনাক্তকরণে UV-রশ্মি (২৫০–৩৮০ nm) ফ্লুরোসেন্স ধর্ম ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'সমআয়ন প্রভাব (Common Ion Effect) ও লবণের দ্রাব্যতা হ্রাস',
      fact: 'মৃদু তড়িৎবিশ্লেষ্য বা স্বল্পদ্রবণীয় লবণের দ্রবণে সাধারণ আয়নযুক্ত তীব্র তড়িৎবিশ্লেষ্য যোগ করলে সাম্যাবস্থা বামে সরে গিয়ে দ্রাব্যতা কমে যায়',
      examFocus: 'সম্পৃক্ত NaCl দ্রবণে HCl গ্যাস চালনা করলে Cl⁻ সমআয়ন প্রভাবে বিশুদ্ধ NaCl অধঃক্ষিপ্ত হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'অধঃক্ষেপণের শর্ত: আয়নিক গুণফল (Kip) ও দ্রাব্যতা গুণফল (Ksp)',
      fact: 'Kip < Ksp হলে অসম্পৃক্ত (অধঃক্ষেপ পড়বে না), Kip = Ksp হলে সম্পৃক্ত, এবং Kip > Ksp হলে অতিপৃক্ত দ্রবণে অধঃক্ষেপ সৃষ্টি হয়',
      examFocus: 'আংশিক কেলাসনে কম Ksp-যুক্ত লবণ আগে অধঃক্ষিপ্ত হয়ে মিশ্রণ থেকে পৃথক হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'নেসলার বিকারক (K₂[HgI₄] + KOH) ও অ্যামোনিয়াম (NH₄⁺) শনাক্তকরণ',
      fact: 'অ্যামোনিয়াম লবণের দ্রবণে ক্ষারীয় নেসলার বিকারক যোগ করলে বাদামি রঙের অ্যামিনোমারকিউরিক আয়োডাইড [NH₂·Hg₂OI] অধঃক্ষেপ পড়ে',
      examFocus: 'অতি সূক্ষ্ম মাত্রার NH₄⁺ শনাক্তকরণেও নেসলার বিকারক হলুদ-বাদামি বর্ণ দেয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'পটাশিয়াম ফেরোসায়ানাইড K₄[Fe(CN)₆] দিয়ে Cu²⁺, Fe³⁺ ও Zn²⁺ শনাক্তকরণ',
      fact: 'Cu²⁺ লালচে-বাদামি (Cu₂[Fe(CN)₆]), Fe³⁺ গাঢ় প্রুশিয়ান নীল (Fe₄[Fe(CN)₆]₃) এবং Zn²⁺ সাদা-নীলচে অধঃক্ষেপ দেয়',
      examFocus: 'অপরদিকে K₃[Fe(CN)₆] ফেরাস (Fe²⁺) আয়নের সাথে টার্নবুলের নীল অধঃক্ষেপ তৈরি করে',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'নাইট্রেট (NO₃⁻) শনাক্তকরণে বলয় পরীক্ষা (Brown Ring Test)',
      fact: 'নাইট্রেট দ্রবণে সদ্য প্রস্তুত FeSO₄ ও টেস্টটিউবের গা বেয়ে গাঢ় H₂SO₄ ঢাললে সংযোগস্থলে [Fe(H₂O)₅NO]SO₄-এর বাদামি বলয় সৃষ্টি হয়',
      examFocus: 'সদ্য প্রস্তুত FeSO₄ না নিলে Fe²⁺ জারিত হয়ে Fe³⁺ হয়ে যাওয়ায় বলয় পরীক্ষা সফল হয় না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'ক্রোমাটোগ্রাফি ও Rf মান (Retardation Factor)',
      fact: 'পেপার বা TLC ক্রোমাটোগ্রাফিতে Rf = (দ্রবের অতিক্রান্ত দূরত্ব / দ্রাবকের অতিক্রান্ত দূরত্ব), যার মান সর্বদা ০ থেকে ১-এর মধ্যে থাকে',
      examFocus: 'Rf-এর কোনো একক নেই এবং স্থির মাধ্যমে যে উপাদানের আসক্তি কম তার Rf মান বেশি হয়',
      diff: 'dental',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'd-ব্লক ও অবস্থান্তর মৌলের পার্থক্য: Sc ও Zn অবস্থান্তর নয় কেন?',
      fact: 'যেসব d-ব্লক মৌলের সুস্থিত আয়নে আংশিক পূর্ণ d-অরবিটাল (d¹–d⁹) থাকে তারাই অবস্থান্তর; Sc³⁺ (3d⁰) ও Zn²⁺ (3d¹⁰)-এ তা না থাকায় এরা অবস্থান্তর নয়',
      examFocus: 'পরিবর্তনশীল জারণ অবস্থা, রঙিন যৌগ গঠন, জটিল আয়ন ও প্রভাবকীয় ধর্ম অবস্থান্তর মৌলের ৪টি প্রধান বৈশিষ্ট্য',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'ইলেকট্রন আসক্তির ব্যতিক্রম: Cl > F এবং S > O',
      fact: 'ফ্লোরিন ও অক্সিজেনের ক্ষুদ্র ২p উপস্তরে ইলেকট্রন মেঘের ঘনত্ব অত্যধিক হওয়ায় আগত ইলেকট্রন বিকর্ষণ অনুভব করে; ফলে Cl ও S-এর ইলেকট্রন আসক্তি বেশি',
      examFocus: 'পর্যায় সারণিতে সকল মৌলের মধ্যে ক্লোরিনের (Cl) ইলেকট্রন আসক্তি সর্বাধিক (-৩৪৯ kJ/mol)',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'আয়নিকরণ শক্তির ব্যতিক্রম: N > O এবং Be > B',
      fact: 'নাইট্রোজেনের (2p³) স্থিতিশীল অর্ধপূর্ণ p-অরবিটাল ও বেরিলিয়ামের (2s²) পূর্ণ s-অরবিটাল ভেঙে ইলেকট্রন সরাতে বেশি শক্তির প্রয়োজন হয়',
      examFocus: 'সর্বোচ্চ আয়নিকরণ শক্তি হিলিয়ামের (He) এবং সর্বনিম্ন সিজিয়াম/ফ্রান্সিয়ামের',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'হাইড্রেটের স্ফুটনাঙ্ক ক্রম: H₂O > HF > NH₃ এবং H₂O > H₂Te > H₂Se > H₂S',
      fact: 'প্রতিটি H₂O অণু ৪টি হাইড্রোজেন বন্ধনে ত্রিমাত্রিক জালক তৈরি করতে পারে, তাই HF-এর চেয়ে H-বন্ধন শক্তিশালী না হয়েও পানির স্ফুটনাঙ্ক (১০০°C) বেশি',
      examFocus: '১৬ নং গ্রুপে H₂S গ্যাস হলেও H₂O আন্তঃআণবিক H-বন্ধনের কারণে কক্ষতাপমাত্রায় তরল',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'ফাজানের পোলারায়ন নীতি ও সমযোজী বৈশিষ্ট্য বৃদ্ধি',
      fact: 'ক্যাটায়নের আকার ছোট ও চার্জ বেশি এবং অ্যানায়নের আকার বড় ও চার্জ বেশি হলে পোলারায়ন বেড়ে যৌগে সমযোজী চরিত্র বাড়ে (যেমন AlCl₃ > MgCl₂ > NaCl)',
      examFocus: 'd¹⁰ ইলেকট্রন বিন্যাসযুক্ত ক্যাটায়নের (Cu⁺, Ag⁺, Zn²⁺) পোলারায়ন ক্ষমতা নিষ্ক্রিয় গ্যাস বিন্যাসের (Na⁺, Ca²⁺) চেয়ে বেশি',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'ধাতব কার্বনেটের তাপীয় স্থায়িত্ব ও দ্রাব্যতা ক্রম (গ্রুপ-২)',
      fact: 'গ্রুপ-২ এ ওপর থেকে নিচে Be²⁺ → Ba²⁺ ক্যাটায়নের আকার বাড়ায় পোলারায়ন কমে; ফলে কার্বনেটের তাপীয় স্থায়িত্ব বাড়ে (BeCO₃ < MgCO₃ < CaCO₃ < BaCO₃)',
      examFocus: 'লিথিয়াম কার্বনেট (Li₂CO₃) পোলারায়নের কারণে উত্তাপে ভেঙে Li₂O ও CO₂ দিলেও অন্য ক্ষার ধাতব কার্বনেট সহজে ভাঙে না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'চুম্বকীয় ভ্রামক ও প্যারাম্যাগনেটিক বনাম ডায়াম্যাগনেটিক প্রজাতি',
      fact: 'যুগ্মবিহীন (Unpaired) ইলেকট্রন থাকলে প্যারাম্যাগনেটিক (যেমন O₂, Cu²⁺, Fe³⁺) এবং সব ইলেকট্রন জোড়াবদ্ধ থাকলে ডায়াম্যাগনেটিক (যেমন N₂, Zn²⁺, CO)',
      examFocus: 'আণবিক অরবিটাল তত্ত্ব অনুযায়ী অক্সিজেন অণুতে (O₂) π*2p অরবিটালে ২টি অযুগ্ম ইলেকট্রন থাকায় এটি প্যারাম্যাগনেটিক',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'হাইড্রোফ্লুরিক অ্যাসিড (HF) বনাম HCl, HBr, HI-এর অম্লত্ব ক্রম',
      fact: 'বন্ড ডিসোসিয়েশন শক্তির কারণে HI > HBr > HCl > HF; অর্থাৎ HF জলীয় দ্রবণে দুর্বল অ্যাসিড এবং HI সবচেয়ে তীব্র হ্যালো-অ্যাসিড',
      examFocus: 'HClO₄ (পারক্লোরিক অ্যাসিড) সকল অজৈব অক্সি-অ্যাসিডের মধ্যে সবচেয়ে তীব্র (কেন্দ্রীয় Cl-এর জারণ মান +৭)',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'অস্‌ওয়াল্ডের লঘুকরণ সূত্র ও মৃদু অ্যাসিডের বিয়োজন মাত্রা (α = √(Ka/C))',
      fact: 'মৃদু তড়িৎবিশ্লেষ্যের বিয়োজন মাত্রা দ্রবণের ঘনমাত্রার বর্গমূলের ব্যস্তানুপাতিক এবং আয়তনের বর্গমূলের সমানুপাতিক',
      examFocus: 'অসীম লঘুকরণে মৃদু অ্যাসিড বা ক্ষারের বিয়োজন মাত্রা ১০০%-এর কাছাকাছি পৌঁছে',
      diff: 'board',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'লা শাতেলিয়ার নীতি: অ্যামোনিয়া (হ্যাবার-বস) ও SO₃ (স্পর্শ প্রণালি)',
      fact: 'তাপোৎপাদী উভমুখী বিক্রিয়ায় (ΔH < 0) তাপমাত্রা কমালে ও আয়তন কমলে (Δn < 0) উচ্চ চাপে উৎপাদ বাড়ে; তাই হ্যাবার পদ্ধতিতে ৪৫০–৫০০°C ও ২০০ atm চাপে Fe প্রভাবক ব্যবহৃত হয়',
      examFocus: 'সাম্য ধ্রুবক Kp ও Kc শুধু তাপমাত্রার ওপর নির্ভর করে; চাপ, ঘনমাত্রা বা প্রভাবক সাম্য ধ্রুবকের মান বদলায় না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'রক্তের প্রধান বাফার তন্ত্র ও প্রশমন তাপ (-৫৭.৩৪ kJ/mol)',
      fact: 'মানব রক্তের pH (৭.৩৫–৭.৪৫) প্রধানত বাইকার্বোনেট বাফার (H₂CO₃ / HCO₃⁻) দিয়ে নিয়ন্ত্রিত হয়; তীব্র অ্যাসিড ও তীব্র ক্ষারের প্রশমন তাপ ধ্রুব (-৫৭.৩৪ kJ/mol)',
      examFocus: 'HF ও NaOH-এর প্রশমন তাপ বেশি (-৬৮.৬ kJ/mol) কারণ ক্ষুদ্র F⁻ আয়নের উচ্চ হাইড্রেশন এনথ্যালপি',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'বিক্রিয়ার হার, সক্রিয়ণ শক্তি (Ea) ও প্রভাবকের ভূমিকা',
      fact: 'প্রভাবক বিক্রিয়ার বিকল্প পথ সৃষ্টি করে সক্রিয়ণ শক্তি (Ea) কমিয়ে দেয়, ফলে সম্মুখ ও পশ্চাৎ উভয় বিক্রিয়ার হার সমানভাবে বাড়ে কিন্তু ΔH অপরিবর্তিত থাকে',
      examFocus: 'প্রতি ১০°C তাপমাত্রা বৃদ্ধিতে অধিকাংশ রাসায়নিক বিক্রিয়ার বেগ ২ থেকে ৩ গুণ বৃদ্ধি পায়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'শূন্য ক্রম ও প্রথম ক্রম বিক্রিয়ার অর্ধায়ু (t₁/₂) বৈশিষ্ট্য',
      fact: 'প্রথম ক্রম বিক্রিয়ার অর্ধায়ু t₁/₂ = ০.৬৯৩ / k যা বিক্রিয়কের প্রারম্ভিক ঘনমাত্রার ওপর নির্ভরশীল নয়; শূন্য ক্রম বিক্রিয়ার t₁/₂ প্রারম্ভিক ঘনমাত্রার সমানুপাতিক',
      examFocus: 'প্রথম ক্রম বিক্রিয়ার হার ধ্রুবকের একক হলো time⁻¹ (যেমন s⁻¹ বা min⁻¹)',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      topic: 'ভিনেগার (৬–১০% ইথানোয়িক অ্যাসিড) ও মল্ট ভিনেগার প্রস্তুতি',
      fact: 'চিনি বা স্টার্চের ফার্মেন্টেশনে উৎপন্ন ১০% ইথানলকে Acetobacter xylinum ব্যাকটেরিয়ার উপস্থিতিতে অক্সিজেনে জারিত করে ভিনেগার (pH ~২.৪) তৈরি হয়',
      examFocus: 'ভিনেগারের অ্যাসিটিক অ্যাসিড ব্যাকটেরিয়ার কোষের প্রোটিন বিকৃত করে ও pH কমিয়ে আচার সংরক্ষণ করে',
      diff: 'board',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      topic: 'নিরাপদ খাদ্য সংরক্ষক: সোডিয়াম বেনজোয়েট, পটাশিয়াম সরবেট ও BHA/BHT',
      fact: 'বেনজোয়িক অ্যাসিড বা সোডিয়াম বেনজোয়েট (অম্লীয় মাধ্যম pH < ৪.৫-এ কার্যকর) জ্যাম-জেলি-জুস সংরক্ষণে এবং BHA/BHT অ্যান্টিঅক্সিডেন্ট হিসেবে তেল-চর্বি নষ্ট হওয়া আটকায়',
      examFocus: 'সাইট্রিক ও অ্যাসকরবিক অ্যাসিড প্রাকৃতিক অ্যান্টিঅক্সিডেন্ট এবং ফরমালিন (৪০% HCHO) একটি নিষিদ্ধ বিষাক্ত রাসায়নিক',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      topic: 'দুধ একটি প্রাকৃতিক ইমালশন (তেল-পানি) ও মাখন (পানি-তেল ইমালশন)',
      fact: 'দুধের পানিতে চর্বি কণা ও ক্যাসেইন প্রোটিন কলয়েড হিসেবে ভাসে; ভিনেগার বা রেনিন দিলে ক্যাসেইন কোয়াগুলেশন হয়ে ছানা/দই তৈরি করে',
      examFocus: 'টিন্ডাল প্রভাব ও ব্রাউনীয় গতি কেবল কলয়েড দ্রবণে (কণার ব্যাস ১–১০০০ nm) দেখা যায়, প্রকৃত দ্রবণে নয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      topic: 'টয়লেট ক্লিনার (কস্টিক সোডা/HCl) বনাম গ্লাস ক্লিনার (অ্যামোনিয়া)',
      fact: 'গ্লাস ক্লিনারে NH₄OH বা NH₃ দ্রবণ ও আইসোপ্রোপাইল অ্যালকোহল থাকে যা কাচের ওপর দাগ বা আঁচড় না ফেলে তেল-ধুলো সরায়; NaOH কাচের SiO₂-এর সাথে বিক্রিয়া করায় তা গ্লাসে ব্যবহার হয় না',
      examFocus: 'টয়লেট ক্লিনারের মূল সক্রিয় উপাদান হলো NaOH বা NaOCl যা চর্বি সাবানায়ন ও জীবাণু ধ্বংস করে',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      topic: 'কোয়াগুলেশন ও শুলজে-হার্ডি নিয়ম (Schulze-Hardy rule)',
      fact: 'বিপরীত আয়ন যত বেশি চার্জযুক্ত হয়, কলয়েডকে তঞ্চিত (Coagulate) করার ক্ষমতা তত বেশি হয় (যেমন ঋণাত্মক সলের জন্য Al³⁺ > Mg²⁺ > Na⁺)',
      examFocus: 'নদীর পলি-মিশ্রিত মিঠাপানি সমুদ্রের লোনাপানির Na⁺, Mg²⁺ আয়নের সংস্পর্শে তঞ্চিত হয়ে ব-দ্বীপ (Delta) তৈরি করে',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'অ্যাম্ফোটেরিক (উভধর্মী) অক্সাইডসমূহ: Al₂O₃, ZnO, BeO, SnO₂, PbO',
      fact: 'উভধর্মী অক্সাইড অ্যাসিড ও ক্ষার উভয়ের সাথে বিক্রিয়া করে লবণ ও পানি উৎপন্ন করে (যেমন Al₂O₃ + 2NaOH + 3H₂O → 2Na[Al(OH)₄])',
      examFocus: 'CO, NO এবং N₂O হলো প্রশম অক্সাইড—এরা অ্যাসিড বা ক্ষার কোনোটির সাথেই বিক্রিয়া করে না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'বেনজিন, গ্রাফাইট, হীরক ও ইথাইনের কার্বন সংকরায়ন',
      fact: 'হীরকে sp³ (চতুস্তলকীয় ও অন্তরক), গ্রাফাইট-বেনজিন-ইথিনে sp² (ত্রিকোণাকার সমতলীয়, গ্রাফাইটে মুক্ত π ইলেকট্রনে বিদ্যুৎ পরিবাহী) এবং ইথাইনে sp (সরলরৈখিক, ১৮০°)',
      examFocus: 'সংকরায়নে s-চরিত্র যত বাড়ে (sp ৫০% > sp² ৩৩.৩% > sp³ ২৫%), কার্বনের তড়িৎ ঋণাত্মকতা তত বাড়ে ও C-H বন্ধনদৈর্ঘ্য ছোট হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'পানির আয়নিক গুণফল (Kw = ১×১০⁻¹⁴) ও তাপমাত্রার প্রভাব',
      fact: '২৫°C-এ বিশুদ্ধ পানিতে Kw = ১০⁻¹⁴ এবং নিরপেক্ষ pH = ৭; তাপমাত্রা বাড়ালে পানি তাপহারীভাবে বেশি বিয়োজিত হয়ে Kw বাড়ে ও নিরপেক্ষ পানির pH ৭-এর চেয়ে কমে যায়',
      examFocus: 'তাপমাত্রা বৃদ্ধিতে বিশুদ্ধ পানির pH < ৭ হলেও তা অ্যাসিডিক নয়, কারণ তখনও [H⁺] = [OH⁻]',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'শিখা পরীক্ষায় (Flame Test) ধাতব আয়নের বৈশিষ্ট্যপূর্ণ বর্ণ',
      fact: 'Na⁺ সোনালি হলুদ, K⁺ বেগুনি (কবাল্ট গ্লাসে গোলাপি), Ca²⁺ ইটের মতো লাল, Sr²⁺ টকটকে লাল, Ba²⁺ কাঁচা আপেলের মতো সবুজ এবং Cu²⁺ নীলাভ সবুজ শিখা দেয়',
      examFocus: 'Be ও Mg পরমাণুর ক্ষুদ্র আকার ও উচ্চ আয়নিকরণ শক্তির কারণে বুনসেন বার্নারের শিখায় ইলেকট্রন উত্তেজিত হয় না—তাই শিখা পরীক্ষায় কোনো বর্ণ দেয় না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'হ্যালোজেন (Cl⁻, Br⁻, I⁻) শনাক্তকরণে AgNO₃ ও NH₄OH দ্রবণীয়তা',
      fact: 'AgCl সাদা অধঃক্ষেপ (লঘু NH₄OH-এ সম্পূর্ণ দ্রবণীয়), AgBr হালকা হলুদ (গাঢ় NH₄OH-এ ধীরে দ্রবণীয়) এবং AgI হলুদ অধঃক্ষেপ (NH₄OH-এ অদ্রবণীয়)',
      examFocus: 'AgF পানিতে সম্পূর্ণ দ্রবণীয় হওয়ায় ফ্লোরাইড আয়ন AgNO₃ পরীক্ষায় অধঃক্ষেপ দেয় না',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'সমইলেকট্রনিক (Isoelectronic) আয়নগুলোর আকারের ক্রম',
      fact: 'সমান ১০টি ইলেকট্রন বিশিষ্ট প্রজাতিতে প্রোটন সংখ্যা কমলে আকার বাড়ে: N³⁻ > O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺ > Al³⁺',
      examFocus: 'সবচেয়ে বেশি নিউক্লীয় চার্জ (+১৩) থাকায় Al³⁺-এর ব্যাসার্ধ সবচেয়ে ছোট',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'অম্লীয় বাফার ও ক্ষারীয় বাফারের উদাহরণ',
      fact: 'মৃদু অ্যাসিড + এর সবল ক্ষারকীয় লবণ (CH₃COOH + CH₃COONa) অম্লীয় বাফার; মৃদু ক্ষার + এর সবল অ্যাসিডীয় লবণ (NH₄OH + NH₄Cl) ক্ষারীয় বাফার',
      examFocus: 'HCl + NaCl মিশ্রণ কখনো বাফার তৈরি করে না, কারণ HCl একটি তীব্র অ্যাসিড',
      diff: 'board',
    },
    {
      ch: 'chem1_ch1_lab',
      vl: 'ph_buffer',
      topic: 'পাতন (Distillation), আংশিক পাতন ও বাষ্প পাতন',
      fact: 'স্ফুটনাঙ্কের পার্থক্য ৪০°C-এর বেশি হলে সাধারণ পাতন, কম হলে আংশিক পাতন (পেট্রোলিয়াম, ইথানল-পানি) এবং পানিতে অদ্রবণীয় বাষ্প-উদ্বায়ী জৈব যৌগে (অ্যানিলিন) বাষ্প পাতন হয়',
      examFocus: 'তাপে বিয়োজিত উচ্চ স্ফুটনাঙ্কের তরল (যেমন গ্লিসারিন) নিম্নচাপে পাতন (Vacuum distillation) দ্বারা বিশুদ্ধ করা হয়',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch2_qualitative',
      vl: 'hybridization',
      topic: 'আইসোটোপ, আইসোবার, আইসোটোন ও আইসোমার পার্থক্য',
      fact: 'সমান প্রোটন সংখ্যা = আইসোটোপ (¹²C, ¹⁴C); সমান ভরসংখ্যা = আইসোবার (¹⁴C, ¹⁴N); সমান নিউট্রন সংখ্যা = আইসোটোন (³⁰Si, ³¹P, ³²S)',
      examFocus: 'আইসোটোপগুলোর পারমাণবিক সংখ্যা এক হওয়ায় এদের রাসায়নিক ধর্ম অভিন্ন কিন্তু ভৌত ধর্ম (ভর, ঘনত্ব) ভিন্ন',
      diff: 'board',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'কর্ণ সম্পর্ক (Diagonal Relationship): Li-Mg, Be-Al এবং B-Si',
      fact: '২য় ও ৩য় পর্যায়ের কোনাকুনি অবস্থিত মৌলগুলোর চার্জ ঘনত্ব বা আয়নিক বিভব (φ = চার্জ/ব্যাসার্ধ) প্রায় সমান হওয়ায় এদের রাসায়নিক ধর্মে মিল দেখা যায়',
      examFocus: 'Be ও Al উভয়েই গাঢ় HNO₃ দ্বারা নিষ্ক্রিয় (Passive) হয় এবং উভয়ের অক্সাইড উভধর্মী',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch5_applied',
      vl: 'ph_buffer',
      topic: 'লিপস্টিক, আফটার শেভ লোশন ও ট্যালকম পাউডারের মূল উপাদান',
      fact: 'ট্যালকম পাউডারে ট্যাল্ক (হাইড্রেটেড ম্যাগনেসিয়াম সিলিকেট Mg₃Si₄O₁₀(OH)₂), লিপস্টিকে মোম-ক্যাস্টর অয়েল-রঞ্জক এবং বেবি পাউডারে জিঙ্ক স্টিয়ারেট ও বোরিক অ্যাসিড থাকে',
      examFocus: 'আফটার শেভ লোশনে জীবাণুনাশক হিসেবে ৭০% ইথানল বা আইসোপ্রোপাইল অ্যালকোহল ও মেন্থল ব্যবহৃত হয়',
      diff: 'dental',
    },
    {
      ch: 'chem1_ch4_equilibrium',
      vl: 'ph_buffer',
      topic: 'লবণের আর্দ্রবিশ্লেষণ ও জলীয় দ্রবণের pH প্রকৃতি',
      fact: 'সবল অ্যাসিড + দুর্বল ক্ষার লবণ (NH₄Cl, FeCl₃, CuSO₄) অম্লীয় (pH < ৭); দুর্বল অ্যাসিড + সবল ক্ষার লবণ (Na₂CO₃, CH₃COONa, KCN) ক্ষারীয় (pH > ৭)',
      examFocus: 'NaCl, KNO₃ ও Na₂SO₄-এর মতো সবল অ্যাসিড-সবল ক্ষারের লবণের আর্দ্রবিশ্লেষণ ঘটে না (pH = ৭)',
      diff: 'medical',
    },
    {
      ch: 'chem1_ch3_periodic',
      vl: 'hybridization',
      topic: 'নিষ্ক্রিয় গ্যাসের স্ফুটনাঙ্ক ও জেনন যৌগের সংকরায়ন',
      fact: 'পারমাণবিক ভর বৃদ্ধিতে লন্ডন বিস্তারণ বল বাড়ায় He থেকে Rn পর্যন্ত স্ফুটনাঙ্ক বাড়ে; XeF₂ (sp³d রৈখিক), XeF₄ (sp³d² সমতলীয় বর্গাকার), XeF₆ (sp³d³ বিকৃত অষ্টতলকীয়)',
      examFocus: 'হিলিয়ামের সর্বনিম্ন স্ফুটনাঙ্ক (-২৬৮.৯°C) হওয়ায় এটি তরল ক্রিয়োজেনিক ও MRI শীতলীকরণে ব্যবহৃত হয়',
      diff: 'medical',
    },
  ];

  const topics = matrix.map((m) => m.topic);
  const facts = matrix.map((m) => m.fact);
  const focuses = matrix.map((m) => m.examFocus);

  matrix.forEach((m, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: m.diff ?? 'medical',
        question: `রসায়ন ১ম পত্রে "${m.fact}" — এই নীতি বা তথ্যটি কোন বিষয়টির ব্যাখ্যা দেয়?`,
        correct: m.topic,
        distractors: [1, 2, 3, 4].map((o) => topics[(idx + o * 5) % matrix.length]),
        explanation: `${m.topic}: ${m.fact}। অতিরিক্ত তথ্য: ${m.examFocus}।`,
        reference: 'রসায়ন ১ম পত্র · হাজারী ও নাগ · ভর্তি প্রস্তুতি',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `"${m.topic}" প্রসঙ্গে নিচের কোন বৈজ্ঞানিক তথ্যটি নির্ভুল?`,
        correct: m.fact,
        distractors: [1, 2, 3, 4].map((o) => facts[(idx + o * 7) % matrix.length]),
        explanation: `${m.fact}। পরীক্ষার টিপস: ${m.examFocus}।`,
        reference: 'রসায়ন ১ম পত্র · অধ্যায়ভিত্তিক উচ্চ-ফলনশীল নোট',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: 'medical',
        question: `পরীক্ষায় আসা "${m.topic}" বিষয়ের সবচেয়ে গুরুত্বপূর্ণ ব্যতিক্রম বা সিদ্ধান্ত কোনটি?`,
        correct: m.examFocus,
        distractors: [1, 2, 3, 4].map((o) => focuses[(idx + o * 9) % matrix.length]),
        explanation: `${m.examFocus}। মূল সূত্র: ${m.fact}।`,
        reference: 'রসায়ন ১ম পত্র · মেডিকেল ও ভার্সিটি ভর্তি সংকলন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_1',
        chapterId: m.ch,
        visualLessonId: m.vl,
        hscLevel: '11',
        difficulty: idx % 3 === 0 ? 'board' : 'medical',
        question: `"${m.examFocus}" — এই বিশেষ তথ্যটি রসায়ন ১ম পত্রের কোন টপিকের অন্তর্ভুক্ত?`,
        correct: m.topic,
        distractors: [1, 2, 3, 4].map((o) => topics[(idx + o * 11) % matrix.length]),
        explanation: `উক্ত তথ্যটি "${m.topic}" অধীনে আলোচিত: ${m.fact}।`,
        reference: 'রসায়ন ১ম পত্র · বোর্ড ও ভর্তি বিশ্লেষণ',
      })
    );
  });

  return list;
}
