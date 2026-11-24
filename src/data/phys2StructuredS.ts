import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

const uniqueDists = (correct: string, candidates: string[]): string[] =>
  Array.from(new Set(candidates)).filter((c) => c !== correct).slice(0, 4);

export function buildPhys2StructuredS(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2ss_${String(seq++).padStart(4, '0')}`;

  // 1. Entropy & Refrigerator COP Numericals (Ch 1) — 30 MCQs
  const iceMassesKg = [1, 2, 3, 4, 5, 0.5, 1.5, 2.5, 6, 10];
  iceMassesKg.forEach((m) => {
    // L_f = 3.36e5 J/kg, T = 273 K
    const dS = Number(((m * 3.36e5) / 273).toFixed(1));
    const ans = `${toBnDigits(dS)} J/K`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `০ °C (২৭৩ K) তাপমাত্রার ${toBnDigits(m)} kg বরফকে সম্পূর্ণরূপে ০ °C তাপমাত্রার পানিতে পরিণত করলে এনট্রপির পরিবর্তন কত হবে? (L_f = ৩.৩৬×১০⁵ J/kg)`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((dS * 2).toFixed(1)))} J/K`,
          `${toBnDigits(Number((dS / 2).toFixed(1)))} J/K`,
          `${toBnDigits(Number((dS + 420).toFixed(1)))} J/K`,
          `${toBnDigits(Number((dS + 980).toFixed(1)))} J/K`,
          `${toBnDigits(Number((m * 336).toFixed(1)))} J/K`,
        ]),
        explanation: `এনট্রপি পরিবর্তন ΔS = (m L_f)/T = (${toBnDigits(m)} × ৩.৩৬×১০⁵) / ২৭৩ ≈ ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · এনট্রপি হিসাব',
      })
    );
  });

  const copTemps: Array<{ t2C: number; t1C: number; w: number }> = [
    { t2C: -3, t1C: 27, w: 100 },
    { t2C: -13, t1C: 27, w: 200 },
    { t2C: 7, t1C: 47, w: 150 },
    { t2C: -23, t1C: 27, w: 300 },
    { t2C: 0, t1C: 27, w: 270 },
    { t2C: -10, t1C: 30, w: 400 },
    { t2C: -18, t1C: 37, w: 220 },
    { t2C: 2, t1C: 27, w: 250 },
    { t2C: -8, t1C: 32, w: 160 },
    { t2C: 12, t1C: 42, w: 300 },
  ];
  copTemps.forEach(({ t2C, t1C, w }) => {
    const t2 = t2C + 273;
    const t1 = t1C + 273;
    const cop = Number((t2 / (t1 - t2)).toFixed(2));
    const q2 = Number((cop * w).toFixed(0));
    const copAns = `${toBnDigits(cop)}`;
    const q2Ans = `${toBnDigits(q2)} J`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি রেফ্রিজারেটর ${toBnDigits(t2C)} °C তাপমাত্রার হিমায়ক প্রকোষ্ঠ থেকে তাপ নিয়ে ${toBnDigits(t1C)} °C তাপমাত্রার পরিবেশে ছেড়ে দিলে এর কার্যসম্পাদন গুণাঙ্ক (COP) কত?`,
        correct: copAns,
        distractors: uniqueDists(copAns, [
          `${toBnDigits(Number((cop + 1).toFixed(2)))}`,
          `${toBnDigits(Number((cop / 2).toFixed(2)))}`,
          `${toBnDigits(Number((cop * 2).toFixed(2)))}`,
          `${toBnDigits(Number((1 / cop).toFixed(2)))}`,
          `${toBnDigits(Number((cop + 2.5).toFixed(2)))}`,
        ]),
        explanation: `COP = T₂ / (T₁ − T₂) = ${toBnDigits(t2)} / (${toBnDigits(t1)} − ${toBnDigits(t2)}) = ${copAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · রেফ্রিজারেটরের COP',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_thermo',
        visualLessonId: 'thermodynamics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `উপরোক্ত ${toBnDigits(t2C)} °C থেকে ${toBnDigits(t1C)} °C রেঞ্জের রেফ্রিজারেটরে মোটর দ্বারা ${toBnDigits(w)} J কাজ করা হলে শীতল প্রকোষ্ঠ থেকে কত জুল তাপ অপসারিত হবে?`,
        correct: q2Ans,
        distractors: uniqueDists(q2Ans, [
          `${toBnDigits(q2 + w)} J`,
          `${toBnDigits(Math.round(q2 / 2))} J`,
          `${toBnDigits(q2 * 2)} J`,
          `${toBnDigits(q2 + 350)} J`,
          `${toBnDigits(w)} J`,
        ]),
        explanation: `অপসারিত তাপ Q₂ = COP × W = ${toBnDigits(cop)} × ${toBnDigits(w)} = ${q2Ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · অপসারিত তাপ',
      })
    );
  });

  // 2. Wire Stretching, Power Ratings & Electric Bills (Ch 3) — 42 MCQs
  const stretchCases: Array<{ r0: number; n: number }> = [
    { r0: 4, n: 2 },
    { r0: 5, n: 3 },
    { r0: 10, n: 2 },
    { r0: 6, n: 4 },
    { r0: 8, n: 3 },
    { r0: 12, n: 2 },
    { r0: 2, n: 5 },
    { r0: 3, n: 4 },
    { r0: 15, n: 2 },
    { r0: 10, n: 4 },
  ];
  stretchCases.forEach(({ r0, n }) => {
    const rNew = r0 * n * n;
    const ans = `${toBnDigits(rNew)} Ω`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(r0)} Ω রোধের একটি সমসত্ত্ব তারকে আয়তন অপরিবর্তিত রেখে টেনে দৈর্ঘ্য ${toBnDigits(n)} গুণ লম্বা করলে তারটির নতুন রোধ কত ওহম হবে?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(r0 * n)} Ω`,
          `${toBnDigits(rNew * 2)} Ω`,
          `${toBnDigits(Math.round(rNew / 2))} Ω`,
          `${toBnDigits(r0 + n)} Ω`,
          `${toBnDigits(rNew + 12)} Ω`,
        ]),
        explanation: `আয়তন ধ্রুব থাকলে R′ = n² R₀ = (${toBnDigits(n)})² × ${toBnDigits(r0)} = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · তার টেনে রোধ পরিবর্তন',
      })
    );
  });

  const billAppliances: Array<{ name: string; watt: number; count: number; hours: number; days: number }> = [
    { name: 'বৈদ্যুতিক বাতি', watt: 60, count: 5, hours: 6, days: 30 },
    { name: 'সিলিং ফ্যান', watt: 80, count: 4, hours: 10, days: 30 },
    { name: 'বৈদ্যুতিক হিটার', watt: 1000, count: 1, hours: 2, days: 30 },
    { name: 'ইস্ত্রি', watt: 1200, count: 1, hours: 1, days: 30 },
    { name: 'টেলিভিশন', watt: 150, count: 2, hours: 5, days: 30 },
    { name: 'এয়ার কন্ডিশনার', watt: 1500, count: 1, hours: 4, days: 30 },
    { name: 'পানির পাম্প', watt: 750, count: 1, hours: 2, days: 30 },
    { name: 'কম্পিউটার', watt: 250, count: 2, hours: 8, days: 30 },
  ];
  billAppliances.forEach((ap) => {
    const kwh = Number(((ap.watt * ap.count * ap.hours * ap.days) / 1000).toFixed(1));
    const ans = `${toBnDigits(kwh)} ইউনিট (kWh)`;
    const bulbRes = Number(((220 * 220) / ap.watt).toFixed(1));
    const rAns = `${toBnDigits(bulbRes)} Ω`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি বাসায় ${toBnDigits(ap.watt)} W ক্ষমতার ${toBnDigits(ap.count)}টি ${ap.name} প্রতিদিন ${toBnDigits(ap.hours)} ঘণ্টা করে ${toBnDigits(ap.days)} দিন চললে মোট কত ইউনিট (kWh) বিদ্যুৎ শক্তি ব্যয় হবে?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((kwh * 2).toFixed(1)))} ইউনিট (kWh)`,
          `${toBnDigits(Number((kwh / 2).toFixed(1)))} ইউনিট (kWh)`,
          `${toBnDigits(Number((kwh + 15).toFixed(1)))} ইউনিট (kWh)`,
          `${toBnDigits(Number((kwh + 36).toFixed(1)))} ইউনিট (kWh)`,
          `${toBnDigits(Number((kwh / ap.days).toFixed(1)))} ইউনিট (kWh)`,
        ]),
        explanation: `ব্যয়িত শক্তি W = (n P t)/১০০০ = (${toBnDigits(ap.count)} × ${toBnDigits(ap.watt)} × ${toBnDigits(ap.hours * ap.days)}) / ১০০০ = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · বৈদ্যুতিক ইউনিট হিসাব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি ${ap.name}-এর গায়ে ২২০ V – ${toBnDigits(ap.watt)} W লেখা থাকলে স্বাভাবিক তাপমাত্রায় কার্যরত অবস্থায় যন্ত্রটির রোধ কত ওহম?`,
        correct: rAns,
        distractors: uniqueDists(rAns, [
          `${toBnDigits(Number((bulbRes * 2).toFixed(1)))} Ω`,
          `${toBnDigits(Number((bulbRes / 2).toFixed(1)))} Ω`,
          `${toBnDigits(Number((220 / ap.watt).toFixed(2)))} Ω`,
          `${toBnDigits(Number((bulbRes + 40).toFixed(1)))} Ω`,
          `${toBnDigits(Number((bulbRes + 95).toFixed(1)))} Ω`,
        ]),
        explanation: `রোধ R = V² / P = ২২০² / ${toBnDigits(ap.watt)} ≈ ${rAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · বৈদ্যুতিক যন্ত্রের রোধ',
      })
    );
  });

  const jouleCases: Array<{ i: number; r: number; t: number }> = [
    { i: 2, r: 5, t: 10 },
    { i: 3, r: 4, t: 5 },
    { i: 4, r: 5, t: 10 },
    { i: 5, r: 2, t: 20 },
    { i: 1, r: 10, t: 60 },
    { i: 2, r: 15, t: 20 },
    { i: 3, r: 10, t: 10 },
    { i: 6, r: 5, t: 5 },
  ];
  jouleCases.forEach(({ i, r, t }) => {
    const heatJ = i * i * r * t;
    const heatCal = Number((heatJ / 4.2).toFixed(1));
    const jAns = `${toBnDigits(heatJ)} J`;
    const cAns = `${toBnDigits(heatCal)} cal`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(r)} Ω রোধের মধ্য দিয়ে ${toBnDigits(i)} A তড়িৎ প্রবাহ ${toBnDigits(t)} সেকেন্ড ধরে চললে উৎপন্ন তাপশক্তি কত জুল?`,
        correct: jAns,
        distractors: uniqueDists(jAns, [
          `${toBnDigits(i * r * t)} J`,
          `${toBnDigits(heatJ * 2)} J`,
          `${toBnDigits(Math.round(heatJ / 2))} J`,
          `${toBnDigits(heatJ + 120)} J`,
          `${toBnDigits(heatJ + 240)} J`,
        ]),
        explanation: `উৎপন্ন তাপ H = I²Rt = ${toBnDigits(i)}² × ${toBnDigits(r)} × ${toBnDigits(t)} = ${jAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · জুলের সূত্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(r)} Ω রোধে ${toBnDigits(i)} A প্রবাহ ${toBnDigits(t)} সেকেন্ড চালালে প্রায় কত ক্যালরি তাপ উৎপন্ন হবে? (J = ৪.২ J/cal)`,
        correct: cAns,
        distractors: uniqueDists(cAns, [
          `${toBnDigits(heatJ)} cal`,
          `${toBnDigits(Number((heatCal * 2).toFixed(1)))} cal`,
          `${toBnDigits(Number((heatCal / 2).toFixed(1)))} cal`,
          `${toBnDigits(Number((heatCal + 35).toFixed(1)))} cal`,
          `${toBnDigits(Number((heatCal + 70).toFixed(1)))} cal`,
        ]),
        explanation: `তাপ H(cal) = (I²Rt) / ৪.২ = ${toBnDigits(heatJ)} / ৪.২ ≈ ${cAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · ক্যালরিতে তাপ',
      })
    );
  });

  // 3. Magnetism, Motional EMF & LCR Resonance (Ch 4 & 5) — 36 MCQs
  const coilFields: Array<{ n: number; i: number; rCm: number }> = [
    { n: 100, i: 2, rCm: 10 },
    { n: 50, i: 4, rCm: 20 },
    { n: 200, i: 1, rCm: 10 },
    { n: 100, i: 5, rCm: 25 },
    { n: 500, i: 2, rCm: 50 },
    { n: 40, i: 5, rCm: 10 },
  ];
  coilFields.forEach(({ n, i, rCm }) => {
    const rM = rCm / 100;
    const bTesla = (4 * Math.PI * 1e-7 * n * i) / (2 * rM);
    const bMt = Number((bTesla * 1000).toFixed(2));
    const ans = `${toBnDigits(bMt)} mT`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(rCm)} cm ব্যাসার্ধ ও ${toBnDigits(n)} পাকের একটি বৃত্তাকার কুণ্ডলীতে ${toBnDigits(i)} A তড়িৎ প্রবাহ চললে এর কেন্দ্রে সৃষ্ট চৌম্বক ক্ষেত্রের মান প্রায় কত মিলিটেসলা (mT)?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((bMt * 2).toFixed(2)))} mT`,
          `${toBnDigits(Number((bMt / 2).toFixed(2)))} mT`,
          `${toBnDigits(Number((bMt + 1.2).toFixed(2)))} mT`,
          `${toBnDigits(Number((bMt + 2.5).toFixed(2)))} mT`,
          `${toBnDigits(Number((bMt * 3.14).toFixed(2)))} mT`,
        ]),
        explanation: `কেন্দ্রে B = (μ₀ N I)/(2r) = (4π×10⁻⁷ × ${toBnDigits(n)} × ${toBnDigits(i)}) / (2 × ${toBnDigits(rM)}) ≈ ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · বৃত্তাকার কুণ্ডলীতে চৌম্বক ক্ষেত্র',
      })
    );
  });

  const motionalEmfs: Array<{ b: number; l: number; v: number }> = [
    { b: 0.5, l: 2, v: 10 },
    { b: 0.2, l: 5, v: 4 },
    { b: 1.5, l: 1, v: 8 },
    { b: 0.4, l: 2.5, v: 12 },
    { b: 0.8, l: 1.5, v: 5 },
    { b: 2.0, l: 0.5, v: 20 },
    { b: 0.1, l: 10, v: 15 },
    { b: 1.2, l: 2, v: 10 },
  ];
  motionalEmfs.forEach(({ b, l, v }) => {
    const emf = Number((b * l * v).toFixed(1));
    const ans = `${toBnDigits(emf)} V`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(l)} m দৈর্ঘ্যের একটি পরিবাহী দণ্ড ${toBnDigits(b)} T সুষম চৌম্বক ক্ষেত্রের সাথে সমকোণে ${toBnDigits(v)} m/s বেগে গতিশীল হলে এর দুই প্রান্তে আবিষ্ট তড়িচ্চালক শক্তি কত ভোল্ট?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((emf * 2).toFixed(1)))} V`,
          `${toBnDigits(Number((emf / 2).toFixed(1)))} V`,
          `${toBnDigits(Number((emf + 5).toFixed(1)))} V`,
          `${toBnDigits(Number((emf + 11).toFixed(1)))} V`,
          '০ V',
        ]),
        explanation: `গতিজনিত তড়িচ্চালক শক্তি ε = B L v = ${toBnDigits(b)} × ${toBnDigits(l)} × ${toBnDigits(v)} = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · গতিজনিত তড়িচ্চালক শক্তি',
      })
    );
  });

  const lcrCases: Array<{ lMh: number; cUf: number }> = [
    { lMh: 10, cUf: 10 },
    { lMh: 25, cUf: 4 },
    { lMh: 40, cUf: 10 },
    { lMh: 100, cUf: 1 },
    { lMh: 20, cUf: 5 },
    { lMh: 50, cUf: 2 },
    { lMh: 16, cUf: 4 },
    { lMh: 64, cUf: 4 },
    { lMh: 9, cUf: 4 },
    { lMh: 81, cUf: 1 },
  ];
  lcrCases.forEach(({ lMh, cUf }) => {
    const f0 = Number((1 / (2 * Math.PI * Math.sqrt(lMh * 1e-3 * cUf * 1e-6))).toFixed(1));
    const ans = `${toBnDigits(f0)} Hz`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(lMh)} mH স্বকীয় আবেশ ও ${toBnDigits(cUf)} μF ধারকত্ববিশিষ্ট একটি শ্রেণি LCR বর্তনীর অনুনাদ কম্পাঙ্ক (Resonant Frequency) প্রায় কত Hz?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((f0 * 2).toFixed(1)))} Hz`,
          `${toBnDigits(Number((f0 / 2).toFixed(1)))} Hz`,
          `${toBnDigits(Number((f0 + 120).toFixed(1)))} Hz`,
          `${toBnDigits(Number((f0 + 250).toFixed(1)))} Hz`,
          `${toBnDigits(Number((f0 * 3.14).toFixed(1)))} Hz`,
        ]),
        explanation: `অনুনাদ কম্পাঙ্ক f₀ = ১/(২π√(LC)) = ১/(২π√(${toBnDigits(lMh)}×১০⁻³ × ${toBnDigits(cUf)}×১০⁻⁶)) ≈ ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · LCR অনুনাদ',
      })
    );
  });

  const fluxCases: Array<{ b: number; areaCm2: number; deg: number }> = [
    { b: 0.5, areaCm2: 200, deg: 0 },
    { b: 0.8, areaCm2: 500, deg: 60 },
    { b: 1.2, areaCm2: 250, deg: 0 },
    { b: 2.0, areaCm2: 100, deg: 60 },
    { b: 0.4, areaCm2: 400, deg: 0 },
    { b: 1.5, areaCm2: 200, deg: 60 },
    { b: 0.6, areaCm2: 500, deg: 0 },
    { b: 1.0, areaCm2: 300, deg: 60 },
    { b: 2.5, areaCm2: 200, deg: 0 },
    { b: 0.9, areaCm2: 400, deg: 60 },
  ];
  fluxCases.forEach(({ b, areaCm2, deg }) => {
    const areaM2 = areaCm2 * 1e-4;
    const cosVal = deg === 0 ? 1 : 0.5;
    const phiMwb = Number((b * areaM2 * cosVal * 1000).toFixed(1));
    const ans = `${toBnDigits(phiMwb)} mWb`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(areaCm2)} cm² ক্ষেত্রফলের একটি কুণ্ডলীর অভিলম্ব ${toBnDigits(b)} T চৌম্বক ক্ষেত্রের সাথে ${toBnDigits(deg)}° কোণে থাকলে কুণ্ডলীর মধ্য দিয়ে অতিক্রান্ত চৌম্বক ফ্লাক্স কত মিলিওয়েবার (mWb)?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((phiMwb * 2).toFixed(1)))} mWb`,
          `${toBnDigits(Number((phiMwb / 2).toFixed(1)))} mWb`,
          `${toBnDigits(Number((phiMwb + 5).toFixed(1)))} mWb`,
          `${toBnDigits(Number((phiMwb + 12).toFixed(1)))} mWb`,
          '০ mWb',
        ]),
        explanation: `চৌম্বক ফ্লাক্স Φ = B A cosθ = ${toBnDigits(b)} × ${toBnDigits(areaM2)} × cos(${toBnDigits(deg)}°) = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · চৌম্বক ফ্লাক্স',
      })
    );
  });

  // 4. Geo & Physical Optics: Prism Deviation, Telescope & Diffraction Grating (Ch 6 & 7) — 36 MCQs
  const prismCases: Array<{ aDeg: number; mu: number }> = [
    { aDeg: 4, mu: 1.5 },
    { aDeg: 6, mu: 1.5 },
    { aDeg: 8, mu: 1.5 },
    { aDeg: 5, mu: 1.6 },
    { aDeg: 10, mu: 1.5 },
    { aDeg: 6, mu: 1.6 },
    { aDeg: 4, mu: 1.6 },
    { aDeg: 8, mu: 1.65 },
  ];
  prismCases.forEach(({ aDeg, mu }) => {
    const dev = Number(((mu - 1) * aDeg).toFixed(2));
    const ans = `${toBnDigits(dev)}°`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(mu)} প্রতিসরাঙ্কের উপাদান দ্বারা তৈরি ${toBnDigits(aDeg)}° প্রিজম কোণের একটি সরু প্রিজমের ন্যূনতম বিচ্যুতি কোণ প্রায় কত ডিগ্রি?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((mu * aDeg).toFixed(2)))}°`,
          `${toBnDigits(Number((dev * 2).toFixed(2)))}°`,
          `${toBnDigits(Number((dev / 2).toFixed(2)))}°`,
          `${toBnDigits(Number((dev + 2.5).toFixed(2)))}°`,
          `${toBnDigits(aDeg)}°`,
        ]),
        explanation: `সরু প্রিজমের বিচ্যুতি δ = (μ − 1)A = (${toBnDigits(mu)} − 1) × ${toBnDigits(aDeg)}° = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · পাতলা প্রিজমের বিচ্যুতি',
      })
    );
  });

  const telescopes: Array<{ foCm: number; feCm: number }> = [
    { foCm: 100, feCm: 5 },
    { foCm: 120, feCm: 4 },
    { foCm: 80, feCm: 2 },
    { foCm: 150, feCm: 5 },
    { foCm: 200, feCm: 4 },
    { foCm: 90, feCm: 3 },
    { foCm: 160, feCm: 8 },
    { foCm: 75, feCm: 2.5 },
  ];
  telescopes.forEach(({ foCm, feCm }) => {
    const mag = Number((foCm / feCm).toFixed(1));
    const len = foCm + feCm;
    const mAns = `${toBnDigits(mag)} গুণ`;
    const lAns = `${toBnDigits(len)} cm`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `অসীম ফোকাসিং-এর জন্য একটি নভোদূরবীক্ষণ যন্ত্রের অভিলক্ষ্যের ফোকাস দূরত্ব ${toBnDigits(foCm)} cm ও অভিনেত্রের ফোকাস দূরত্ব ${toBnDigits(feCm)} cm হলে বিবর্ধন ক্ষমতা কত?`,
        correct: mAns,
        distractors: uniqueDists(mAns, [
          `${toBnDigits(Number((mag + 5).toFixed(1)))} গুণ`,
          `${toBnDigits(Number((mag * 2).toFixed(1)))} গুণ`,
          `${toBnDigits(Number((mag / 2).toFixed(1)))} গুণ`,
          `${toBnDigits(len)} গুণ`,
          `${toBnDigits(Number((mag + 10).toFixed(1)))} গুণ`,
        ]),
        explanation: `অসীম ফোকাসিং-এ বিবর্ধন M = f_o / f_e = ${toBnDigits(foCm)} / ${toBnDigits(feCm)} = ${mAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · নভোদূরবীক্ষণ যন্ত্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(foCm)} cm ও ${toBnDigits(feCm)} cm ফোকাস দূরত্বের লেন্সযুক্ত একটি নভোদূরবীক্ষণ যন্ত্রের অসীম ফোকাসিং-এ নলের দৈর্ঘ্য কত হবে?`,
        correct: lAns,
        distractors: uniqueDists(lAns, [
          `${toBnDigits(foCm - feCm)} cm`,
          `${toBnDigits(foCm)} cm`,
          `${toBnDigits(len + 10)} cm`,
          `${toBnDigits(len * 2)} cm`,
          `${toBnDigits(mag)} cm`,
        ]),
        explanation: `নলের দৈর্ঘ্য L = f_o + f_e = ${toBnDigits(foCm)} + ${toBnDigits(feCm)} = ${lAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · দূরবীক্ষণ নলের দৈর্ঘ্য',
      })
    );
  });

  // 5. Modern Physics & Nuclear: de Broglie Wavelength, X-ray Cutoff & Decay Constant (Ch 8 & 9) — 32 MCQs
  const accVolts = [100, 400, 900, 1600, 2500, 10000, 40000, 100000];
  accVolts.forEach((v) => {
    const dbAng = Number((12.27 / Math.sqrt(v)).toFixed(3));
    const xrayAng = Number((12400 / v).toFixed(3));
    const dbAns = `${toBnDigits(dbAng)} Å`;
    const xAns = `${toBnDigits(xrayAng)} Å`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(v)} V বিভব পার্থক্যে ত্বরান্বিত একটি ইলেকট্রনের ডি-ব্রগলি তরঙ্গদৈর্ঘ্য প্রায় কত অ্যাংস্ট্রম (Å)?`,
        correct: dbAns,
        distractors: uniqueDists(dbAns, [
          `${toBnDigits(Number((dbAng * 2).toFixed(3)))} Å`,
          `${toBnDigits(Number((dbAng / 2).toFixed(3)))} Å`,
          `${toBnDigits(Number((dbAng * 10).toFixed(3)))} Å`,
          `${toBnDigits(Number((dbAng + 0.5).toFixed(3)))} Å`,
          `${toBnDigits(Number((dbAng + 1.2).toFixed(3)))} Å`,
        ]),
        explanation: `λ = ১২.২৭ / √V Å = ১২.২৭ / √${toBnDigits(v)} ≈ ${dbAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ডি-ব্রগলি তরঙ্গদৈর্ঘ্য',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি এক্স-রে নলে ${toBnDigits(v)} V বিভব প্রয়োগ করলে উৎপন্ন এক্স-রের ন্যূনতম তরঙ্গদৈর্ঘ্য প্রায় কত Å?`,
        correct: xAns,
        distractors: uniqueDists(xAns, [
          dbAns,
          `${toBnDigits(Number((xrayAng * 2).toFixed(3)))} Å`,
          `${toBnDigits(Number((xrayAng / 2).toFixed(3)))} Å`,
          `${toBnDigits(Number((xrayAng + 0.4).toFixed(3)))} Å`,
          `${toBnDigits(Number((xrayAng + 1.1).toFixed(3)))} Å`,
        ]),
        explanation: `ন্যূনতম তরঙ্গদৈর্ঘ্য λ_min = hc/(eV) ≈ ১২,৪০০ / ${toBnDigits(v)} = ${xAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · এক্স-রে ন্যূনতম তরঙ্গদৈর্ঘ্য',
      })
    );
  });

  // 6. Digital Logic Gates Truth Evaluations & Binary Arithmetic (Ch 10) — 32 MCQs
  const logicEvaluations: Array<{ expr: string; inputs: string; out: string; reason: string }> = [
    { expr: 'Y = (A · B)′ (NAND গেট)', inputs: 'A = ১, B = ১', out: '০', reason: 'AND-এর মান ১·১ = ১, এর পূরক ০' },
    { expr: 'Y = (A · B)′ (NAND গেট)', inputs: 'A = ১, B = ০', out: '১', reason: 'AND-এর মান ১·০ = ০, এর পূরক ১' },
    { expr: 'Y = (A + B)′ (NOR গেট)', inputs: 'A = ০, B = ০', out: '১', reason: 'OR-এর মান ০+০ = ০, এর পূরক ১' },
    { expr: 'Y = (A + B)′ (NOR গেট)', inputs: 'A = ১, B = ০', out: '০', reason: 'OR-এর মান ১+০ = ১, এর পূরক ০' },
    { expr: 'Y = A ⊕ B (XOR গেট)', inputs: 'A = ১, B = ১', out: '০', reason: 'সমান ইনপুটে XOR গেটের আউটপুট ০' },
    { expr: 'Y = A ⊕ B (XOR গেট)', inputs: 'A = ১, B = ০', out: '১', reason: 'ভিন্ন ইনপুটে XOR গেটের আউটপুট ১' },
    { expr: 'Y = (A ⊕ B)′ (XNOR গেট)', inputs: 'A = ১, B = ১', out: '১', reason: 'সমান ইনপুটে XNOR গেটের আউটপুট ১' },
    { expr: 'Y = (A ⊕ B)′ (XNOR গেট)', inputs: 'A = ০, B = ১', out: '০', reason: 'ভিন্ন ইনপুটে XNOR গেটের আউটপুট ০' },
    { expr: 'Y = A′ · B + A', inputs: 'A = ১, B = ০', out: '১', reason: '০·০ + ১ = ১' },
    { expr: 'Y = (A + B′) · C', inputs: 'A = ০, B = ১, C = ১', out: '০', reason: '(০ + ০) · ১ = ০' },
    { expr: 'Y = A′ · B′', inputs: 'A = ০, B = ০', out: '১', reason: '১ · ১ = ১' },
    { expr: 'Y = (A + B) · (A′ + B)', inputs: 'A = ১, B = ০', out: '০', reason: '(১+০)·(০+০) = ০' },
  ];
  const binOutputs = ['০', '১', '১ ও ০ উভয়ই', 'অনির্ণেয় (Undefined)', 'হাই ইম্পিড্যান্স (Z)'];
  logicEvaluations.forEach((lg) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `লজিক ফাংশন ${lg.expr}-এর ক্ষেত্রে ইনপুট ${lg.inputs} হলে আউটপুট Y কত হবে?`,
        correct: lg.out,
        distractors: uniqueDists(lg.out, binOutputs),
        explanation: `${lg.inputs} বসিয়ে পাই: ${lg.reason}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · লজিক গেট বিশ্লেষণ',
      })
    );
  });

  const binAdditions: Array<[string, string]> = [
    ['1011', '0101'],
    ['1101', '1010'],
    ['1001', '0110'],
    ['1110', '0011'],
    ['10101', '01011'],
    ['1100', '1100'],
    ['10110', '1001'],
    ['1111', '0001'],
  ];
  binAdditions.forEach(([aStr, bStr]) => {
    const sum = parseInt(aStr, 2) + parseInt(bStr, 2);
    const sumBin = sum.toString(2);
    const ans = `(${sumBin})₂`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `বাইনারি যোগ (${aStr})₂ + (${bStr})₂-এর সঠিক ফলাফল কোনটি?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `(${(sum + 1).toString(2)})₂`,
          `(${(sum - 1).toString(2)})₂`,
          `(${(sum + 2).toString(2)})₂`,
          `(${(sum ^ 4).toString(2)})₂`,
          `(${(sum ^ 2).toString(2)})₂`,
        ]),
        explanation: `বাইনারি (${aStr})₂ = ${toBnDigits(parseInt(aStr, 2))} এবং (${bStr})₂ = ${toBnDigits(parseInt(bStr, 2))}; যোগফল = ${toBnDigits(sum)} = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · বাইনারি যোগ',
      })
    );
  });

  // 7. Astronomy Numericals: Hubble Law & Distance Units (Ch 11) — 20 MCQs
  const hubbleCases: Array<{ h0: number; dMpc: number }> = [
    { h0: 70, dMpc: 10 },
    { h0: 70, dMpc: 50 },
    { h0: 70, dMpc: 100 },
    { h0: 72, dMpc: 25 },
    { h0: 72, dMpc: 50 },
    { h0: 68, dMpc: 100 },
    { h0: 75, dMpc: 40 },
    { h0: 70, dMpc: 200 },
  ];
  hubbleCases.forEach(({ h0, dMpc }) => {
    const v = h0 * dMpc;
    const ans = `${toBnDigits(v)} km/s`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `হাবল ধ্রুবক H₀ = ${toBnDigits(h0)} km·s⁻¹·Mpc⁻¹ হলে পৃথিবী থেকে ${toBnDigits(dMpc)} Mpc দূরত্বে অবস্থিত একটি ছায়াপথের অপসারণ বেগ কত?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(v * 2)} km/s`,
          `${toBnDigits(Math.round(v / 2))} km/s`,
          `${toBnDigits(v + 350)} km/s`,
          `${toBnDigits(v + 700)} km/s`,
          `${toBnDigits(Math.round(h0 / dMpc) + 10)} km/s`,
        ]),
        explanation: `হাবলের সূত্র v = H₀ d = ${toBnDigits(h0)} × ${toBnDigits(dMpc)} = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · হাবলের সূত্র',
      })
    );
  });

  // 8. Complete Physics 2nd Paper Constants, Laws, Units & Scientists Matrix (50 × 4 = 200 MCQs)
  const phys2Laws: Array<{
    ch:
      | 'phys2_thermo'
      | 'phys2_ch2_static_elec'
      | 'phys2_ch3_current_elec'
      | 'phys2_ch4_magnetism'
      | 'phys2_ch5_em_induction'
      | 'phys2_ch6_geo_optics'
      | 'phys2_ch7_physical_optics'
      | 'phys2_ch8_modern_phys'
      | 'phys2_ch9_atomic_nuclear'
      | 'phys2_ch10_semiconductor'
      | 'phys2_ch11_astronomy';
    vl: 'thermodynamics' | 'circuits_optics';
    qty: string;
    unit: string;
    formula: string;
    scientist: string;
  }> = [
    { ch: 'phys2_thermo', vl: 'thermodynamics', qty: 'এনট্রপি (Entropy)', unit: 'J/K (জুল/কেলভিন)', formula: 'ΔS = ∫(dQ/T)', scientist: 'রুডলফ ক্লসিয়াস (১৮৬৫)' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', qty: 'মোলার আপেক্ষিক তাপ (Molar Heat Capacity)', unit: 'J/(mol·K)', formula: 'C = dQ/(n dT)', scientist: 'জুলিয়াস রবার্ট মেয়ার' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', qty: 'তাপের যান্ত্রিক তুল্যাঙ্ক (J)', unit: 'J/cal (~৪.২ J/cal)', formula: 'W = J H', scientist: 'জেমস প্রেসকট জুল' },
    { ch: 'phys2_thermo', vl: 'thermodynamics', qty: 'কার্নো ইঞ্জিনের আদর্শ কর্মদক্ষতা', unit: 'এককবিহীন / শতাংশ (%)', formula: 'η = 1 − T₂/T₁', scientist: 'সাদি কার্নো (১৮২৪)' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', qty: 'তড়িৎ ফ্লাক্স (Electric Flux Φ_E)', unit: 'N·m²/C বা V·m', formula: 'Φ_E = Q_in / ε₀', scientist: 'কার্ল ফ্রিডরিখ গাউস' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', qty: 'শূন্য মাধ্যমের তড়িৎ ভেদ্যতা (ε₀)', unit: 'C²/(N·m²) বা F/m', formula: 'ε₀ = ৮.৮৫৪×১০⁻¹² SI', scientist: 'চার্লস অগাস্টিন ডি কুলম্ব' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', qty: 'তড়িৎ দ্বিমেরু ভ্রামক (Electric Dipole Moment)', unit: 'C·m (কুলম্ব-মিটার)', formula: 'p = q × 2l', scientist: 'পিটার ডিবাই (Debye)' },
    { ch: 'phys2_ch2_static_elec', vl: 'circuits_optics', qty: 'তড়িৎ ধারকত্ব (Capacitance)', unit: 'ফ্যারাড (F = C/V)', formula: 'C = ε₀ A / d', scientist: 'মাইকেল ফ্যারাডে (ধারকত্ব নামকরণ)' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', qty: 'আপেক্ষিক রোধ বা রোধাঙ্ক (ρ)', unit: 'ওহম-মিটার (Ω·m)', formula: 'ρ = RA / L', scientist: 'জর্জ সাইমন ওহম' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', qty: 'তড়িৎ প্রবাহ ঘনত্ব (Current Density J)', unit: 'A/m²', formula: 'J = I/A = n e v_d', scientist: 'পল ড্রুড (Drude মডেল)' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', qty: 'বিদ্যুৎ পরিবাহিতা (Conductivity σ)', unit: 'সিমেন্স/মিটার (S/m বা Ω⁻¹m⁻¹)', formula: 'σ = 1 / ρ', scientist: 'ওয়ার্নার ভন সিমেন্স' },
    { ch: 'phys2_ch3_current_elec', vl: 'circuits_optics', qty: 'হুইটস্টোন ব্রিজের ভারসাম্য শর্ত', unit: 'অনুপাত (মাত্রাবিহীন)', formula: 'P/Q = R/S', scientist: 'স্যার চার্লস হুইটস্টোন (১৮৪৩)' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', qty: 'চৌম্বক ফ্লাক্স ঘনত্ব (B)', unit: 'টেসলা (T = Wb/m²)', formula: 'dB = (μ₀/4π)(I dl sinθ)/r²', scientist: 'নিকোলা টেসলা / বায়ো-স্যাভার্ট' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', qty: 'শূন্য মাধ্যমের চৌম্বক প্রবেশ্যতা (μ₀)', unit: 'T·m/A বা H/m', formula: 'μ₀ = ৪π×১০⁻⁷ SI', scientist: 'আন্দ্রে-মারি অ্যাম্পিয়ার' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', qty: 'চৌম্বক ভ্রামক (Magnetic Moment)', unit: 'A·m² বা J/T', formula: 'M = N I A', scientist: 'উইলহেল্ম ওয়েবার' },
    { ch: 'phys2_ch4_magnetism', vl: 'circuits_optics', qty: 'হল বিভব (Hall Voltage)', unit: 'ভোল্ট (V)', formula: 'V_H = BI / (n t q)', scientist: 'এডউইন হল (১৮৭৯)' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', qty: 'চৌম্বক ফ্লাক্স (Magnetic Flux Φ_B)', unit: 'ওয়েবার (Wb = T·m²)', formula: 'Φ_B = B A cosθ', scientist: 'মাইকেল ফ্যারাডে (১৮৩১)' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', qty: 'স্বকীয় ও পারস্পরিক আবেশ গুণাঙ্ক (L, M)', unit: 'হেনরি (H = Wb/A = Ω·s)', formula: 'e = −L (dI/dt)', scientist: 'জোসেফ হেনরি (১৮৩২)' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', qty: 'আবিষ্ট প্রবাহের দিক নির্ণায়ক নিয়ম', unit: 'শক্তি সংরক্ষণভিত্তিক বিধি', formula: 'e = −N dΦ/dt (ঋণাত্মক চিহ্ন)', scientist: 'হাইনরিখ লেঞ্জ (১৮৩৪)' },
    { ch: 'phys2_ch5_em_induction', vl: 'circuits_optics', qty: 'LCR শ্রেণি অনুনাদ কম্পাঙ্ক', unit: 'হার্জ (Hz)', formula: 'f₀ = ১/(২π√(LC))', scientist: 'হাইনরিখ হার্জ' },
    { ch: 'phys2_ch6_geo_optics', vl: 'circuits_optics', qty: 'লেন্সের ক্ষমতা (Power of Lens)', unit: 'ডায়াপ্টার (D = m⁻¹)', formula: 'P = 1 / f(m)', scientist: 'উইলিব্রর্ড স্নেল' },
    { ch: 'phys2_ch6_geo_optics', vl: 'circuits_optics', qty: 'প্রতিসরণের স্নেলের সূত্র ও প্রতিসরাঙ্ক', unit: 'মাত্রাবিহীন সংখ্যা (μ)', formula: 'n₁ sinθ₁ = n₂ sinθ₂', scientist: 'ইবন সাহল / স্নেল' },
    { ch: 'phys2_ch6_geo_optics', vl: 'circuits_optics', qty: 'লেন্স নির্মাতার সূত্র', unit: 'মিটারের বিপরীত (m⁻¹)', formula: '1/f = (μ − 1)(1/R₁ − 1/R₂)', scientist: 'অগাস্টিন ফ্রেনেল (বিশ্লষক)' },
    { ch: 'phys2_ch6_geo_optics', vl: 'circuits_optics', qty: 'সংকট কোণ (Critical Angle)', unit: 'ডিগ্রি বা রেডিয়ান', formula: 'sinθ_c = 1/μ', scientist: 'জোহানেস কেপলার (TIR বর্ণনা)' },
    { ch: 'phys2_ch7_physical_optics', vl: 'circuits_optics', qty: 'দ্বি-চির ব্যতিচার ঝালর প্রস্থ (Fringe Width)', unit: 'মিটার বা মিলিমিটার', formula: 'β = λD / d', scientist: 'থমাস ইয়ং (১৮০১)' },
    { ch: 'phys2_ch7_physical_optics', vl: 'circuits_optics', qty: 'গ্রেটিং ধ্রুবক (Grating Element d)', unit: 'মিটার / সেন্টিমিটার', formula: 'd sinθ = n λ', scientist: 'জোসেফ ভন ফ্রনহফার' },
    { ch: 'phys2_ch7_physical_optics', vl: 'circuits_optics', qty: 'সমবর্তন কোণ ও প্রতিসরাঙ্কের সম্পর্ক', unit: 'ডিগ্রি (°)', formula: 'tanθ_p = μ', scientist: 'স্যার ডেভিড ব্রুস্টার (১৮১৫)' },
    { ch: 'phys2_ch7_physical_optics', vl: 'circuits_optics', qty: 'সমবর্তিত আলোর নির্গত তীব্রতা সূত্র', unit: 'W/m²', formula: 'I = I₀ cos²θ', scientist: 'এতিয়েন-লুই ম্যালাস (১৮০৯)' },
    { ch: 'phys2_ch7_physical_optics', vl: 'circuits_optics', qty: 'তাড়িতচৌম্বক তরঙ্গের পয়েন্টিং ভেক্টর', unit: 'W/m²', formula: 'S = (E × B) / μ₀', scientist: 'জন হেনরি পয়েন্টিং' },
    { ch: 'phys2_ch8_modern_phys', vl: 'circuits_optics', qty: 'প্ল্যাঙ্কের ধ্রুবক (Planck’s Constant h)', unit: 'জুল-সেকেন্ড (J·s)', formula: 'h = ৬.৬২৬×১০⁻³⁴ J·s', scientist: 'ম্যাক্স প্ল্যাঙ্ক (১৯০০)' },
    { ch: 'phys2_ch8_modern_phys', vl: 'circuits_optics', qty: 'কৃষ্ণবস্তুর বিকিরণ ক্ষমতা ও তাপমাত্রা', unit: 'W/m²', formula: 'E = σ T⁴', scientist: 'জোসেফ স্টিফান ও বোল্টজম্যান' },
    { ch: 'phys2_ch8_modern_phys', vl: 'circuits_optics', qty: 'ভিনের সরণ ধ্রুবক (λ_m T)', unit: 'মিটার-কেলভিন (m·K)', formula: 'λ_m T = ২.৮৯৮×১০⁻³ m·K', scientist: 'উইলহেল্ম ভিন (১৮৯৩)' },
    { ch: 'phys2_ch8_modern_phys', vl: 'circuits_optics', qty: 'আলোকতড়িৎ সমীকরণ ও নিবৃত্তি বিভব', unit: 'জুল বা eV', formula: 'hf = Φ₀ + eV₀', scientist: 'আলবার্ট আইনস্টাইন (১৯০৫)' },
    { ch: 'phys2_ch8_modern_phys', vl: 'circuits_optics', qty: 'কম্পটন তরঙ্গদৈর্ঘ্য (h / m_e c)', unit: 'মিটার বা Å (০.০২৪৩ Å)', formula: 'Δλ = λ_c (1 − cosφ)', scientist: 'আর্থার হলি কম্পটন (১৯২৩)' },
    { ch: 'phys2_ch8_modern_phys', vl: 'circuits_optics', qty: 'ডি-ব্রগলি পদার্থ তরঙ্গদৈর্ঘ্য', unit: 'মিটার (m)', formula: 'λ = h / (mv)', scientist: 'লুই ডি-ব্রগলি (১৯২৪)' },
    { ch: 'phys2_ch8_modern_phys', vl: 'circuits_optics', qty: 'কণার অবস্থান ও ভরবেগের অনিশ্চয়তা', unit: 'J·s', formula: 'Δx Δp ≥ h / (4π)', scientist: 'ওয়ার্নার হাইজেনবার্গ (১৯২৭)' },
    { ch: 'phys2_ch9_atomic_nuclear', vl: 'circuits_optics', qty: 'রিডবার্গ ধ্রুবক (Rydberg Constant R_H)', unit: 'm⁻¹ (১.০৯৭×১০⁷ m⁻¹)', formula: '1/λ = R_H(1/n₁² − 1/n₂²)', scientist: 'জোহানেস রিডবার্গ (১৮৮৮)' },
    { ch: 'phys2_ch9_atomic_nuclear', vl: 'circuits_optics', qty: 'বোরের কৌণিক ভরবেগ কোয়ান্টায়ন', unit: 'kg·m²/s বা J·s', formula: 'mvr = nh / (2π)', scientist: 'নিলস বোর (১৯১৩)' },
    { ch: 'phys2_ch9_atomic_nuclear', vl: 'circuits_optics', qty: 'তেজস্ক্রিয় ক্ষয় সক্রিয়তা (Activity)', unit: 'বেকেরেল (Bq = ১ ক্ষয়/সে.)', formula: 'A = λ N = A₀ e^(−λt)', scientist: 'হেনরি বেকেরেল (১৮৯৬)' },
    { ch: 'phys2_ch9_atomic_nuclear', vl: 'circuits_optics', qty: 'পারমাণবিক ভর একক ও বন্ধন শক্তি সমতা', unit: 'MeV (~৯৩১.৫ MeV/u)', formula: 'E_b = Δm c²', scientist: 'আর্নেস্ট রাদারফোর্ড (নিউক্লিয়াস)' },
    { ch: 'phys2_ch9_atomic_nuclear', vl: 'circuits_optics', qty: 'নিউক্লীয় ফিশন আবিষ্কার', unit: 'প্রতি ফিশনে ~২০০ MeV', formula: '²³⁵U + ¹n → ¹⁴¹Ba + ⁹²Kr + 3¹n', scientist: 'অটো হান ও ফ্রিৎজ স্ট্রাসম্যান (১৯৩৮)' },
    { ch: 'phys2_ch10_semiconductor', vl: 'circuits_optics', qty: 'নিষিদ্ধ শক্তি ব্যবধান (Energy Band Gap)', unit: 'ইলেকট্রন-ভোল্ট (eV)', formula: 'E_g = E_C − E_V', scientist: 'ফেলিক্স ব্লখ (ব্যান্ড তত্ত্ব)' },
    { ch: 'phys2_ch10_semiconductor', vl: 'circuits_optics', qty: 'ট্রানজিস্টর আবিষ্কার ও প্রবাহ লাভ β', unit: 'মাত্রাবিহীন অনুপাত', formula: 'β = I_C / I_B = α/(1−α)', scientist: 'জন বার্ডিন, ব্র্যাটেইন ও শকলি (১৯৪৭)' },
    { ch: 'phys2_ch10_semiconductor', vl: 'circuits_optics', qty: 'ডি-মরগানের লজিক সূত্র', unit: 'বুলিয়ান অভেদ', formula: '(A+B)′ = A′·B′ ও (A·B)′ = A′+B′', scientist: 'অগাস্টাস ডি মরগান / জর্জ বুল' },
    { ch: 'phys2_ch11_astronomy', vl: 'circuits_optics', qty: 'শ্বেত বামনের ভর সীমা (চন্দ্রশেখর সীমা)', unit: 'সৌরভর (১.৪ M_☉)', formula: 'M_Ch ≈ ১.৪ M_☉', scientist: 'সুব্রহ্মণ্যন চন্দ্রশেখর (১৯৩০)' },
    { ch: 'phys2_ch11_astronomy', vl: 'circuits_optics', qty: 'কৃষ্ণগহ্বরের ঘটনা দিগন্ত ব্যাসার্ধ', unit: 'মিটার / কিলোমিটার', formula: 'R_s = 2GM / c²', scientist: 'কার্ল শোয়ার্জশিল্ড (১৯১৬)' },
    { ch: 'phys2_ch11_astronomy', vl: 'circuits_optics', qty: 'ছায়াপথের অপসারণ ও হাবল ধ্রুবক (H₀)', unit: 'km·s⁻¹·Mpc⁻¹', formula: 'v = H₀ d', scientist: 'এডউইন হাবল (১৯২৯)' },
    { ch: 'phys2_ch11_astronomy', vl: 'circuits_optics', qty: 'মহাবিশ্বের ক্ষুদ্রতম মাইক্রোওয়েভ পটভূমি বিকিরণ', unit: 'কেলভিন (~২.৭৩ K)', formula: 'T_CMB = ২.৭২৫ K', scientist: 'আর্নো পেনজিয়াস ও রবার্ট উইলসন (১৯৬৫)' },
  ];

  const qtyPool = phys2Laws.map((l) => l.qty);
  const unitPool = phys2Laws.map((l) => l.unit);
  const formPool = phys2Laws.map((l) => l.formula);
  const sciPool = phys2Laws.map((l) => l.scientist);

  phys2Laws.forEach((l, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: l.ch,
        visualLessonId: l.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `পদার্থবিজ্ঞান ২য় পত্রে "${l.qty}"-এর প্রচলিত একক বা পরিমাপ কী?`,
        correct: l.unit,
        distractors: uniqueDists(
          l.unit,
          [1, 4, 9, 13, 19].map((o) => unitPool[(idx + o) % phys2Laws.length])
        ),
        explanation: `${l.qty}-এর একক/মান ${l.unit} (সম্পর্ক: ${l.formula})।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · রাশি ও একক নির্দেশিকা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: l.ch,
        visualLessonId: l.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${l.qty}" নির্দেশকারী সঠিক গাণিতিক সমীকরণ বা ধ্রুব মান কোনটি?`,
        correct: l.formula,
        distractors: uniqueDists(
          l.formula,
          [2, 5, 11, 15, 21].map((o) => formPool[(idx + o) % phys2Laws.length])
        ),
        explanation: `${l.qty} প্রকাশ করা হয় ${l.formula} দ্বারা (${l.scientist})।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · গুরুত্বপূর্ণ সূত্রাবলি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: l.ch,
        visualLessonId: l.vl,
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${l.qty}" (${l.formula}) কোন বিজ্ঞানীর অবদানের সাথে প্রধানত সম্পর্কিত?`,
        correct: l.scientist,
        distractors: uniqueDists(
          l.scientist,
          [1, 3, 7, 12, 17].map((o) => sciPool[(idx + o) % phys2Laws.length])
        ),
        explanation: `${l.qty} (${l.formula}) সূত্রটি ${l.scientist}-এর অবদান।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · বিজ্ঞানী ও আবিষ্কার',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: l.ch,
        visualLessonId: l.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `গাণিতিক সম্পর্ক "${l.formula}" পদার্থবিজ্ঞানের কোন ধারণা বা রাশিকে প্রকাশ করে?`,
        correct: l.qty,
        distractors: uniqueDists(
          l.qty,
          [2, 6, 10, 14, 18].map((o) => qtyPool[(idx + o) % phys2Laws.length])
        ),
        explanation: `${l.formula} সমীকরণটি "${l.qty}" নির্ণয়ে ব্যবহৃত হয় (একক: ${l.unit})।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · সূত্র শনাক্তকরণ',
      })
    );
  });

  return list;
}
