import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

const uniqueDists = (correct: string, candidates: string[]): string[] =>
  Array.from(new Set(candidates)).filter((c) => c !== correct).slice(0, 4);

export function buildPhys2StructuredR(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sr_${String(seq++).padStart(4, '0')}`;

  // 1. Geo Optics: Lens Power, Combination & Critical Angle (Ch 6) — 42 MCQs
  const focalLengthsCm = [10, 20, 25, 40, 50, -10, -20, -25, -50, 100];
  focalLengthsCm.forEach((fCm) => {
    const p = Number((100 / fCm).toFixed(2));
    const pSign = p > 0 ? `+${toBnDigits(p)} D` : `${toBnDigits(p)} D`;
    const typeText = fCm > 0 ? 'উত্তল (অভিসারী)' : 'অবতল (অপসারী)';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি ${typeText} লেন্সের ফোকাস দূরত্ব ${toBnDigits(Math.abs(fCm))} cm হলে লেন্সটির ক্ষমতা কত ডায়াপ্টার (D)?`,
        correct: pSign,
        distractors: uniqueDists(pSign, [
          `${p > 0 ? '' : '+'}${toBnDigits(-p)} D`,
          `${p > 0 ? '+' : ''}${toBnDigits(Number((p * 2).toFixed(2)))} D`,
          `${p > 0 ? '+' : ''}${toBnDigits(Number((p / 2).toFixed(2)))} D`,
          `${toBnDigits(Number((Math.abs(p) + 1.5).toFixed(2)))} D`,
          `${toBnDigits(Number((Math.abs(p) + 3).toFixed(2)))} D`,
        ]),
        explanation: `লেন্সের ক্ষমতা P = ১/f(m) = ১০০/${toBnDigits(fCm)} = ${pSign} (${typeText} লেন্স)।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · লেন্সের ক্ষমতা',
      })
    );
  });

  const lensCombos: Array<{ p1: number; p2: number }> = [
    { p1: 4, p2: -2 },
    { p1: 5, p2: -3 },
    { p1: 6, p2: -4 },
    { p1: 3.5, p2: -1.5 },
    { p1: 2.5, p2: 2.5 },
    { p1: -2, p2: -3 },
    { p1: 8, p2: -3 },
    { p1: 4.5, p2: -2.5 },
    { p1: 10, p2: -6 },
    { p1: 2, p2: -4 },
  ];
  lensCombos.forEach(({ p1, p2 }) => {
    const pEq = Number((p1 + p2).toFixed(2));
    const fEqCm = Number((100 / pEq).toFixed(1));
    const pEqAns = `${pEq > 0 ? '+' : ''}${toBnDigits(pEq)} D`;
    const fEqAns = `${toBnDigits(fEqCm)} cm`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${p1 > 0 ? '+' : ''}${toBnDigits(p1)} D এবং ${p2 > 0 ? '+' : ''}${toBnDigits(p2)} D ক্ষমতার দুটি পাতলা লেন্স পরস্পরের সংস্পর্শে রাখলে সমবায়টির তুল্য ক্ষমতা কত হবে?`,
        correct: pEqAns,
        distractors: uniqueDists(pEqAns, [
          `${toBnDigits(Number((p1 - p2).toFixed(2)))} D`,
          `${toBnDigits(Number((pEq * 2).toFixed(2)))} D`,
          `${toBnDigits(Number((pEq + 2.5).toFixed(2)))} D`,
          `${toBnDigits(Number((pEq - 2.5).toFixed(2)))} D`,
          `${toBnDigits(Number(((p1 * p2) / (p1 + p2 + 0.1)).toFixed(2)))} D`,
        ]),
        explanation: `সংস্পর্শে থাকা লেন্সের তুল্য ক্ষমতা P = P₁ + P₂ = ${pEqAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · লেন্সের সমবায়',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `পরস্পর সংস্পর্শে থাকা ${p1 > 0 ? '+' : ''}${toBnDigits(p1)} D ও ${p2 > 0 ? '+' : ''}${toBnDigits(p2)} D লেন্স দুটির তুল্য ফোকাস দূরত্ব কত সেন্টিমিটার?`,
        correct: fEqAns,
        distractors: uniqueDists(fEqAns, [
          `${toBnDigits(Number((fEqCm * 2).toFixed(1)))} cm`,
          `${toBnDigits(Number((fEqCm / 2).toFixed(1)))} cm`,
          `${toBnDigits(Number((-fEqCm).toFixed(1)))} cm`,
          `${toBnDigits(Number((fEqCm + 15).toFixed(1)))} cm`,
          `${toBnDigits(Number((fEqCm + 30).toFixed(1)))} cm`,
        ]),
        explanation: `তুল্য ফোকাস দূরত্ব F = ১০০ / P_eq = ১০০ / (${toBnDigits(pEq)}) = ${fEqAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · তুল্য ফোকাস দূরত্ব',
      })
    );
  });

  const mediaRefractive: Array<{ name: string; mu: number }> = [
    { name: 'পানি', mu: 1.33 },
    { name: 'অ্যালকোহল', mu: 1.36 },
    { name: 'ক্রাউন কাচ', mu: 1.5 },
    { name: 'ফ্লিন্ট কাচ', mu: 1.62 },
    { name: 'কার্বন ডাই-সালফাইড', mu: 1.63 },
    { name: 'হীরা (Diamond)', mu: 2.42 },
  ];
  mediaRefractive.forEach(({ name, mu }) => {
    const critDeg = Number(((Math.asin(1 / mu) * 180) / Math.PI).toFixed(1));
    const speed = Number((3 / mu).toFixed(2));
    const cAns = `${toBnDigits(critDeg)}°`;
    const vAns = `${toBnDigits(speed)}×১০⁸ m/s`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${name}-এর পরম প্রতিসরাঙ্ক ${toBnDigits(mu)} হলে বায়ু মাধ্যমের সাপেক্ষে এর সংকট কোণ (Critical Angle) প্রায় কত ডিগ্রি?`,
        correct: cAns,
        distractors: uniqueDists(cAns, [
          `${toBnDigits(Number((90 - critDeg).toFixed(1)))}°`,
          `${toBnDigits(Number((critDeg / 2).toFixed(1)))}°`,
          `${toBnDigits(Number(Math.min(85, critDeg + 14).toFixed(1)))}°`,
          `${toBnDigits(Number(Math.max(10, critDeg - 11).toFixed(1)))}°`,
          `${toBnDigits(Number(Math.min(88, critDeg + 22).toFixed(1)))}°`,
        ]),
        explanation: `sin θ_c = ১/μ = ১/${toBnDigits(mu)} ⇒ θ_c ≈ ${cAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · সংকট কোণ',
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
        question: `${name}-এর প্রতিসরাঙ্ক ${toBnDigits(mu)} হলে ওই মাধ্যমে আলোর বেগ প্রায় কত m/s? (c = ৩×১০⁸ m/s)`,
        correct: vAns,
        distractors: uniqueDists(vAns, [
          `${toBnDigits(Number((3 * mu).toFixed(2)))}×১০⁸ m/s`,
          `${toBnDigits(Number((speed / 2).toFixed(2)))}×১০⁸ m/s`,
          `${toBnDigits(Number((speed + 0.5).toFixed(2)))}×১০⁸ m/s`,
          `${toBnDigits(Number((speed + 0.9).toFixed(2)))}×১০⁸ m/s`,
          '৩.০০×১০⁸ m/s',
        ]),
        explanation: `মাধ্যমে আলোর বেগ v = c / μ = ৩×১০⁸ / ${toBnDigits(mu)} ≈ ${vAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · মাধ্যমে আলোর বেগ',
      })
    );
  });

  // 2. Physical Optics: YDSE Fringe Width, Brewster & Malus (Ch 7) — 30 MCQs
  const ydseCases: Array<{ lambdaNm: number; dMm: number; D_m: number }> = [
    { lambdaNm: 500, dMm: 0.5, D_m: 1 },
    { lambdaNm: 600, dMm: 0.4, D_m: 1 },
    { lambdaNm: 500, dMm: 0.25, D_m: 1.5 },
    { lambdaNm: 600, dMm: 0.3, D_m: 2 },
    { lambdaNm: 450, dMm: 0.5, D_m: 2 },
    { lambdaNm: 650, dMm: 0.5, D_m: 1 },
    { lambdaNm: 550, dMm: 0.2, D_m: 1 },
    { lambdaNm: 400, dMm: 0.4, D_m: 2 },
    { lambdaNm: 700, dMm: 0.35, D_m: 1 },
    { lambdaNm: 589, dMm: 0.5, D_m: 1.5 },
  ];
  ydseCases.forEach(({ lambdaNm, dMm, D_m }) => {
    const betaMm = Number((((lambdaNm * 1e-9 * D_m) / (dMm * 1e-3)) * 1000).toFixed(2));
    const ans = `${toBnDigits(betaMm)} mm`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `ইয়ং-এর দ্বি-চির পরীক্ষায় ${toBnDigits(lambdaNm)} nm তরঙ্গদৈর্ঘ্যের আলো ব্যবহার করা হলো। চির দুটির মধ্যবর্তী দূরত্ব ${toBnDigits(dMm)} mm এবং পর্দার দূরত্ব ${toBnDigits(D_m)} m হলে পরপর দুটি উজ্জ্বল ডোরার ব্যবধান (ঝালর প্রস্থ) কত mm?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((betaMm * 2).toFixed(2)))} mm`,
          `${toBnDigits(Number((betaMm / 2).toFixed(2)))} mm`,
          `${toBnDigits(Number((betaMm + 0.75).toFixed(2)))} mm`,
          `${toBnDigits(Number((betaMm + 1.5).toFixed(2)))} mm`,
          `${toBnDigits(Number((betaMm * 3).toFixed(2)))} mm`,
        ]),
        explanation: `ঝালর প্রস্থ β = λD/d = (${toBnDigits(lambdaNm)}×১০⁻⁹ × ${toBnDigits(D_m)}) / (${toBnDigits(dMm)}×১০⁻³) = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ইয়ং-এর দ্বি-চির ব্যতিচার',
      })
    );
  });

  const malusAngles: Array<{ deg: number; fracText: string }> = [
    { deg: 0, fracText: 'I₀ (১০০%)' },
    { deg: 30, fracText: '¾ I₀ (৭৫%)' },
    { deg: 45, fracText: '½ I₀ (৫০%)' },
    { deg: 60, fracText: '¼ I₀ (২৫%)' },
    { deg: 90, fracText: '০ (০%)' },
  ];
  const malusPool = ['I₀ (১০০%)', '¾ I₀ (৭৫%)', '½ I₀ (৫০%)', '¼ I₀ (২৫%)', '০ (০%)', '⅓ I₀ (৩৩.৩%)'];
  malusAngles.forEach(({ deg, fracText }) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `ম্যালাসের সূত্রানুযায়ী I₀ তীব্রতার সমবর্তিত আলো বিশ্লেষকের সমবর্তন তলের সাথে ${toBnDigits(deg)}° কোণে আপতিত হলে নির্গত আলোর তীব্রতা কত হবে?`,
        correct: fracText,
        distractors: uniqueDists(fracText, malusPool),
        explanation: `ম্যালাসের সূত্র I = I₀ cos²(${toBnDigits(deg)}°) = ${fracText}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ম্যালাসের সূত্র',
      })
    );
  });

  const brewsterMedia: Array<{ mat: string; muText: string; deg: string }> = [
    { mat: 'পানি (μ ≈ ১.৩৩)', muText: '1.33', deg: '৫৩.১°' },
    { mat: 'কাচ (μ ≈ ১.৫০)', muText: '1.50', deg: '৫৬.৩°' },
    { mat: 'হীরা (μ ≈ ২.৪২)', muText: '2.42', deg: '৬৭.৫°' },
    { mat: '√৩ প্রতিসরাঙ্কের মাধ্যম', muText: '√3', deg: '৬০°' },
    { mat: '১ প্রতিসরাঙ্কের মাধ্যম', muText: '1.0', deg: '৪৫°' },
  ];
  const brewDegPool = ['৫৩.১°', '৫৬.৩°', '৬৭.৫°', '৬০°', '৪৫°', '৩০°'];
  brewsterMedia.forEach((bm) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch7_physical_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `বায়ু থেকে ${bm.mat}-এ আলোর পূর্ণ সমবর্তন ঘটলে ব্রুস্টার কোণ (θ_p) কত হবে?`,
        correct: bm.deg,
        distractors: uniqueDists(bm.deg, brewDegPool),
        explanation: `tan θ_p = μ = ${bm.muText} ⇒ θ_p = ${bm.deg}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ব্রুস্টারের সূত্র',
      })
    );
  });

  // 3. Modern Physics: Relativity, Photon Energy & Photoelectric (Ch 8) — 36 MCQs
  const relSpeeds: Array<{ vFrac: string; v: number; gammaText: string; invGammaText: string }> = [
    { vFrac: '0.6c', v: 0.6, gammaText: '১.২৫ গুণ', invGammaText: '৮০%' },
    { vFrac: '0.8c', v: 0.8, gammaText: '১.৬৭ গুণ (৫/৩)', invGammaText: '৬০%' },
    { vFrac: '0.866c (√3/2 c)', v: 0.866, gammaText: '২.০০ গুণ', invGammaText: '৫০%' },
    { vFrac: '0.9c', v: 0.9, gammaText: '২.২৯ গুণ', invGammaText: '৪৩.৬%' },
    { vFrac: '0.98c', v: 0.98, gammaText: '৫.০৩ গুণ', invGammaText: '১৯.৯%' },
    { vFrac: '0.5c', v: 0.5, gammaText: '১.১৫৫ গুণ', invGammaText: '৮৬.৬%' },
  ];
  const gPool = ['১.২৫ গুণ', '১.৬৭ গুণ (৫/৩)', '২.০০ গুণ', '২.২৯ গুণ', '৫.০৩ গুণ', '১.১৫৫ গুণ'];
  const invGPool = ['৮০%', '৬০%', '৫০%', '৪৩.৬%', '১৯.৯%', '৮৬.৬%'];
  relSpeeds.forEach((rs) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `কোনো রকেট ${rs.vFrac} বেগে গতিশীল হলে স্থির পর্যবেক্ষকের সাপেক্ষে রকেটটির আপেক্ষিক ভর স্থির ভরের (m₀) কত গুণ হবে?`,
        correct: rs.gammaText,
        distractors: uniqueDists(rs.gammaText, gPool),
        explanation: `আপেক্ষিক ভর m = γ m₀ = m₀ / √(1 − (${toBnDigits(rs.v)})²) = ${rs.gammaText}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · আপেক্ষিক ভর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${rs.vFrac} বেগে গতিশীল একটি মিটার স্কেলের দৈর্ঘ্য স্থির কাঠামো থেকে পরিমাপ করলে মূল দৈর্ঘ্যের প্রায় কত শতাংশ দেখাবে?`,
        correct: rs.invGammaText,
        distractors: uniqueDists(rs.invGammaText, invGPool),
        explanation: `দৈর্ঘ্য সংকোচন L = L₀ √(1 − v²/c²) ≈ ${rs.invGammaText}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · দৈর্ঘ্য সংকোচন',
      })
    );
  });

  const photonWavesNm = [200, 248, 310, 400, 496, 620, 800, 1240];
  photonWavesNm.forEach((nm) => {
    const eV = Number((1240 / nm).toFixed(2));
    const ans = `${toBnDigits(eV)} eV`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(nm)} nm তরঙ্গদৈর্ঘ্যের একটি ফোটনের শক্তি প্রায় কত ইলেকট্রন-ভোল্ট (eV)? (hc ≈ ১২৪০ eV·nm)`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((eV * 2).toFixed(2)))} eV`,
          `${toBnDigits(Number((eV / 2).toFixed(2)))} eV`,
          `${toBnDigits(Number((eV + 1.5).toFixed(2)))} eV`,
          `${toBnDigits(Number((eV + 3.1).toFixed(2)))} eV`,
          `${toBnDigits(Number((eV + 0.85).toFixed(2)))} eV`,
        ]),
        explanation: `ফোটনের শক্তি E = hc/λ ≈ ১২৪০ / ${toBnDigits(nm)} = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ফোটনের শক্তি',
      })
    );
  });

  const photoCases: Array<{ ePhotonEv: number; workFnEv: number }> = [
    { ePhotonEv: 5.0, workFnEv: 2.1 },
    { ePhotonEv: 4.5, workFnEv: 2.3 },
    { ePhotonEv: 6.2, workFnEv: 4.2 },
    { ePhotonEv: 3.8, workFnEv: 2.0 },
    { ePhotonEv: 4.0, workFnEv: 1.8 },
    { ePhotonEv: 5.5, workFnEv: 3.1 },
    { ePhotonEv: 7.0, workFnEv: 4.5 },
    { ePhotonEv: 3.1, workFnEv: 2.1 },
  ];
  photoCases.forEach(({ ePhotonEv, workFnEv }) => {
    const kMax = Number((ePhotonEv - workFnEv).toFixed(1));
    const ans = `${toBnDigits(kMax)} eV`;
    const stopV = `${toBnDigits(kMax)} V`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch8_modern_phys',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${toBnDigits(workFnEv)} eV কার্য অপেক্ষকের একটি ধাতব পাতে ${toBnDigits(ePhotonEv)} eV শক্তির ফোটন আপতিত হলে নির্গত ফটোইলেকট্রনের সর্বোচ্চ গতিশক্তি কত eV?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `${toBnDigits(Number((ePhotonEv + workFnEv).toFixed(1)))} eV`,
          `${toBnDigits(ePhotonEv)} eV`,
          `${toBnDigits(workFnEv)} eV`,
          `${toBnDigits(Number((kMax + 1.4).toFixed(1)))} eV`,
          `${toBnDigits(Number((kMax * 2).toFixed(1)))} eV`,
        ]),
        explanation: `আইনস্টাইনের সমীকরণ K_max = E − Φ₀ = ${toBnDigits(ePhotonEv)} − ${toBnDigits(workFnEv)} = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · ফটোইলেকট্রনের গতিশক্তি',
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
        question: `${toBnDigits(workFnEv)} eV কার্য অপেক্ষকের পাত থেকে ${toBnDigits(ePhotonEv)} eV শক্তির আলো দিয়ে ফটোইলেকট্রন নিঃসরণ থামাতে নিবৃত্তি বিভব (Stopping Potential) কত ভোল্ট হবে?`,
        correct: stopV,
        distractors: uniqueDists(stopV, [
          `${toBnDigits(Number((ePhotonEv + workFnEv).toFixed(1)))} V`,
          `${toBnDigits(ePhotonEv)} V`,
          `${toBnDigits(workFnEv)} V`,
          `${toBnDigits(Number((kMax + 1.8).toFixed(1)))} V`,
          `${toBnDigits(Number((kMax / 2).toFixed(1)))} V`,
        ]),
        explanation: `eV₀ = K_max = ${ans} ⇒ নিবৃত্তি বিভব V₀ = ${stopV}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · নিবৃত্তি বিভব',
      })
    );
  });

  // 4. Atomic & Nuclear: Bohr Energy & Half-Life Decay (Ch 9) — 36 MCQs
  const bohrOrbits = [1, 2, 3, 4, 5];
  bohrOrbits.forEach((n) => {
    const energy = Number((-13.6 / (n * n)).toFixed(2));
    const radius = Number((0.529 * n * n).toFixed(2));
    const eAns = `${toBnDigits(energy)} eV`;
    const rAns = `${toBnDigits(radius)} Å`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(n)}-তম বোর কক্ষপথে আবর্তনশীল ইলেকট্রনের মোট শক্তি কত ইলেকট্রন-ভোল্ট?`,
        correct: eAns,
        distractors: uniqueDists(eAns, [
          `${toBnDigits(Number((-13.6 / n).toFixed(2)))} eV`,
          `${toBnDigits(Number(Math.abs(energy).toFixed(2)))} eV`,
          `${toBnDigits(Number((energy * 2).toFixed(2)))} eV`,
          `${toBnDigits(Number((energy - 1.5).toFixed(2)))} eV`,
          `${toBnDigits(Number((energy / 2).toFixed(2)))} eV`,
        ]),
        explanation: `হাইড্রোজেনের n-তম কক্ষপথে শক্তি E_n = −১৩.৬ / n² = −১৩.৬ / ${toBnDigits(n * n)} = ${eAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · বোর কক্ষপথের শক্তি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `হাইড্রোজেন পরমাণুর ${toBnDigits(n)}-তম বোর কক্ষপথের ব্যাসার্ধ কত অ্যাংস্ট্রম (Å)? (r₁ ≈ ০.৫২৯ Å)`,
        correct: rAns,
        distractors: uniqueDists(rAns, [
          `${toBnDigits(Number((0.529 * n).toFixed(2)))} Å`,
          `${toBnDigits(Number((radius * 2).toFixed(2)))} Å`,
          `${toBnDigits(Number((radius + 1.25).toFixed(2)))} Å`,
          `${toBnDigits(Number((radius + 3.5).toFixed(2)))} Å`,
          `${toBnDigits(Number((0.529 / n).toFixed(2)))} Å`,
        ]),
        explanation: `কক্ষপথের ব্যাসার্ধ r_n = r₁ × n² = ০.৫২৯ × ${toBnDigits(n * n)} = ${rAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · বোর কক্ষপথের ব্যাসার্ধ',
      })
    );
  });

  const halfLives: Array<{ tHalf: number; unit: string; mult: number }> = [
    { tHalf: 5, unit: 'দিন', mult: 3 },
    { tHalf: 8, unit: 'দিন', mult: 4 },
    { tHalf: 10, unit: 'বছর', mult: 3 },
    { tHalf: 12, unit: 'ঘণ্টা', mult: 4 },
    { tHalf: 20, unit: 'মিনিট', mult: 5 },
    { tHalf: 15, unit: 'দিন', mult: 2 },
    { tHalf: 4, unit: 'ঘণ্টা', mult: 5 },
    { tHalf: 6, unit: 'দিন', mult: 3 },
    { tHalf: 30, unit: 'বছর', mult: 2 },
    { tHalf: 100, unit: 'বছর', mult: 4 },
  ];
  halfLives.forEach(({ tHalf, unit, mult }) => {
    const elapsed = tHalf * mult;
    const remFrac = Number((100 / Math.pow(2, mult)).toFixed(2));
    const decFrac = Number((100 - remFrac).toFixed(2));
    const remAns = `${toBnDigits(remFrac)}% (১/${toBnDigits(Math.pow(2, mult))} অংশ)`;
    const decAns = `${toBnDigits(decFrac)}%`;
    const meanLife = Number((1.443 * tHalf).toFixed(2));
    const mlAns = `${toBnDigits(meanLife)} ${unit}`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি তেজস্ক্রিয় মৌলের অর্ধায়ু ${toBnDigits(tHalf)} ${unit}। ${toBnDigits(elapsed)} ${unit} পর প্রারম্ভিক পরমাণুর কত শতাংশ অবশিষ্ট থাকবে?`,
        correct: remAns,
        distractors: uniqueDists(remAns, [
          decAns,
          `${toBnDigits(Number((100 / mult).toFixed(2)))}% (১/${toBnDigits(mult)} অংশ)`,
          `${toBnDigits(Number((remFrac * 2).toFixed(2)))}%`,
          `${toBnDigits(Number((remFrac / 2).toFixed(2)))}%`,
          '১২.৫% (১/৮ অংশ)',
        ]),
        explanation: `অর্ধায়ু সংখ্যা n = ${toBnDigits(elapsed)}/${toBnDigits(tHalf)} = ${toBnDigits(mult)}; অবশিষ্ট N/N₀ = (১/২)^${toBnDigits(mult)} = ${remAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · তেজস্ক্রিয় ক্ষয় হিসাব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch9_atomic_nuclear',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `কোনো তেজস্ক্রিয় নমুনার অর্ধায়ু ${toBnDigits(tHalf)} ${unit} হলে এর গড় আয়ু (Mean Life) প্রায় কত?`,
        correct: mlAns,
        distractors: uniqueDists(mlAns, [
          `${toBnDigits(Number((0.693 * tHalf).toFixed(2)))} ${unit}`,
          `${toBnDigits(tHalf * 2)} ${unit}`,
          `${toBnDigits(Number((tHalf / 2).toFixed(2)))} ${unit}`,
          `${toBnDigits(Number((meanLife + 5).toFixed(2)))} ${unit}`,
          `${toBnDigits(Number((meanLife + 12).toFixed(2)))} ${unit}`,
        ]),
        explanation: `গড় আয়ু τ = T_½ / ০.৬৯৩ = ১.৪৪৩ × ${toBnDigits(tHalf)} ≈ ${mlAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · গড় আয়ু ও অর্ধায়ু',
      })
    );
  });

  // 5. Semiconductor & Astronomy: Transistor α/β, Binary & Hubble/Schwarzschild (Ch 10 & 11) — 36 MCQs
  const alphaVals = [0.9, 0.95, 0.96, 0.98, 0.99, 0.8];
  alphaVals.forEach((alpha) => {
    const beta = Number((alpha / (1 - alpha)).toFixed(1));
    const bAns = `${toBnDigits(beta)}`;
    const aAns = `${toBnDigits(alpha)}`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `একটি ট্রানজিস্টরের সাধারণ পীঠ প্রবাহ বিবর্ধন গুণাঙ্ক α = ${toBnDigits(alpha)} হলে এর সাধারণ নিঃসারক প্রবাহ লাভ β কত হবে?`,
        correct: bAns,
        distractors: uniqueDists(bAns, [
          `${toBnDigits(Number((beta * 2).toFixed(1)))}`,
          `${toBnDigits(Number((beta + 10).toFixed(1)))}`,
          `${toBnDigits(Number(Math.max(1, beta - 5).toFixed(1)))}`,
          `${toBnDigits(Number((1 / (1 - alpha)).toFixed(1)))}`,
          `${toBnDigits(Number((beta + 25).toFixed(1)))}`,
        ]),
        explanation: `β = α / (1 − α) = ${toBnDigits(alpha)} / (1 − ${toBnDigits(alpha)}) = ${bAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · ট্রানজিস্টর লাভ α ও β',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি ট্রানজিস্টরের কমন-এমিটার প্রবাহ লাভ β = ${toBnDigits(beta)} হলে এর α-এর মান কত?`,
        correct: aAns,
        distractors: uniqueDists(aAns, [
          `${toBnDigits(Number((1 - alpha).toFixed(2)))}`,
          '০.৭৫',
          '০.৮৫',
          '০.৯২',
          '১.০০',
        ]),
        explanation: `α = β / (1 + β) = ${toBnDigits(beta)} / (1 + ${toBnDigits(beta)}) = ${aAns}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · ট্রানজিস্টর α নির্ণয়',
      })
    );
  });

  const decToBin = [13, 19, 25, 37, 45, 53, 62, 75];
  decToBin.forEach((n) => {
    const bin = n.toString(2);
    const ans = `(${bin})₂`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch10_semiconductor',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `দশমিক সংখ্যা (${toBnDigits(n)})₁₀-কে বাইনারি পদ্ধতিতে প্রকাশ করলে নিচের কোনটি সঠিক হবে?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `(${(n + 1).toString(2)})₂`,
          `(${(n - 1).toString(2)})₂`,
          `(${(n + 2).toString(2)})₂`,
          `(${(n ^ 4).toString(2)})₂`,
          `(${(n ^ 2).toString(2)})₂`,
        ]),
        explanation: `২ দিয়ে ক্রমান্বয়ে ভাগ করে ভাগশেষ উল্টো দিক থেকে সাজালে (${toBnDigits(n)})₁₀ = (${bin})₂ হয়।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · সংখ্যা পদ্ধতি',
      })
    );
  });

  const astroMasses: Array<{ name: string; solarMass: number; rsKm: number }> = [
    { name: '১ সৌরভরের (সূর্যের ভরের) নক্ষত্র', solarMass: 1, rsKm: 3 },
    { name: '৫ সৌরভরের কৃষ্ণগহ্বর', solarMass: 5, rsKm: 15 },
    { name: '১০ সৌরভরের কৃষ্ণগহ্বর', solarMass: 10, rsKm: 30 },
    { name: '২০ সৌরভরের নাক্ষত্রিক কৃষ্ণগহ্বর', solarMass: 20, rsKm: 60 },
    { name: '১০০ সৌরভরের মধ্যবর্তী কৃষ্ণগহ্বর', solarMass: 100, rsKm: 300 },
  ];
  astroMasses.forEach((am) => {
    const ans = `প্রায় ${toBnDigits(am.rsKm)} km`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch11_astronomy',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${am.name}-এর শোয়ার্জশিল্ড ব্যাসার্ধ (Schwarzschild Radius) প্রায় কত কিলোমিটার?`,
        correct: ans,
        distractors: uniqueDists(ans, [
          `প্রায় ${toBnDigits(am.rsKm * 2)} km`,
          `প্রায় ${toBnDigits(am.rsKm * 10)} km`,
          `প্রায় ${toBnDigits(Number((am.rsKm / 2).toFixed(1)))} km`,
          `প্রায় ${toBnDigits(am.rsKm + 12)} km`,
          `প্রায় ${toBnDigits(am.rsKm + 45)} km`,
        ]),
        explanation: `R_s = 2GM/c² ≈ ৩ × (M / M_☉) km = ${ans}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১১ · শোয়ার্জশিল্ড ব্যাসার্ধ',
      })
    );
  });

  // 6. High-Yield Physics 2nd Paper Ch 6–11 Exam Trap Matrix (55 entries × 4 angles = 220 MCQs)
  const matrix6to11: Array<{
    ch:
      | 'phys2_ch6_geo_optics'
      | 'phys2_ch7_physical_optics'
      | 'phys2_ch8_modern_phys'
      | 'phys2_ch9_atomic_nuclear'
      | 'phys2_ch10_semiconductor'
      | 'phys2_ch11_astronomy';
    topic: string;
    principle: string;
    trap: string;
    valueNote: string;
  }> = [
    { ch: 'phys2_ch6_geo_optics', topic: 'প্রকৃত ও আপাত গভীরতার পরিবর্তন (জলাধারে মাছ)', principle: 'ঘন মাধ্যমের বস্তুকে হালকা মাধ্যম (বায়ু) থেকে খাড়াভাবে দেখলে বস্তুটি ওপরে উঠে এসেছে বলে মনে হয়', trap: 'পানির নিচের মাছ যদি ওপরে আকাশের পাখিকে দেখে তবে পাখিটিকে প্রকৃত উচ্চতার চেয়ে বেশি (μ গুণ) উঁচুতে দেখবে', valueNote: 'উত্থান বা বিচ্যুতি Δh = t (1 − 1/μ)' },
    { ch: 'phys2_ch6_geo_optics', topic: 'উত্তল ও অবতল লেন্সের প্রতিবিম্বের প্রকৃতি', principle: 'অবতল লেন্স সর্বদা বস্তুর যেকোনো অবস্থানের জন্য অবাস্তব, সোজা ও খর্বিত (ছোট) প্রতিবিম্ব গঠন করে', trap: 'উত্তল লেন্স ফোকাস ও আলোককেন্দ্রের মাঝে বস্তু থাকলে অবাস্তব ও বিবর্ধিত প্রতিবিম্ব তৈরি করে (বিবর্ধক কাচ)', valueNote: 'প্রতিবিম্ব পর্দায় ফেলা গেলে সেটি বাস্তব ও উল্টো' },
    { ch: 'phys2_ch6_geo_optics', topic: 'রৈখিক বিবর্ধন (m) ও ক্ষেত্র বিবর্ধন', principle: 'রৈখিক বিবর্ধন m = −v/u = f/(f − u); বাস্তব ও উল্টো প্রতিবিম্বের জন্য m ঋণাত্মক, অবাস্তব ও সোজার জন্য ধনাত্মক', trap: 'বিবর্ধনের পরম মান |m| = ১ হলে প্রতিবিম্ব বস্তুর সমান আকারের (উত্তল লেন্সে u = 2f অবস্থানে)', valueNote: 'সমান আকারের বাস্তব প্রতিবিম্ব পেতে বস্তু ও পর্দার ন্যূনতম দূরত্ব হতে হবে 4f' },
    { ch: 'phys2_ch6_geo_optics', topic: 'দর্পণের সমবায় ও দুটি সমতল দর্পণে প্রতিবিম্ব সংখ্যা', principle: 'θ কোণে আনত দুটি সমতল দর্পণের মাঝে বস্তু রাখলে মোট প্রতিবিম্ব সংখ্যা n = (৩৬০°/θ) − ১ (যদি ৩৬০°/θ জোড় সংখ্যা হয়)', trap: 'দর্পণ দুটি সমান্তরালে (θ = ০°) থাকলে অসীম সংখ্যক প্রতিবিম্ব এবং লম্বভাবে (θ = ৯০°) থাকলে ৩টি প্রতিবিম্ব গঠিত হয়', valueNote: 'পূর্ণ প্রতিবিম্ব দেখতে ব্যক্তির উচ্চতার অর্ধেক (H/2) দৈর্ঘ্যের সমতল দর্পণ যথেষ্ট' },
    { ch: 'phys2_ch6_geo_optics', topic: 'গোলীয় দর্পণের মাধ্যম নির্ভরতা বনাম লেন্স', principle: 'দর্পণের ফোকাস দূরত্ব (f = R/2) কেবল বক্রতার ব্যাসার্ধের ওপর নির্ভর করে, তাই পানিতে ডোবালে দর্পণের ফোকাস দূরত্ব বদলায় না', trap: 'কিন্তু লেন্স প্রতিসরণের ওপর নির্ভরশীল বলে পানিতে ডোবালে লেন্সের ফোকাস দূরত্ব বৃদ্ধি পায়', valueNote: 'সমতল দর্পণের বক্রতার ব্যাসার্ধ ও ফোকাস দূরত্ব অসীম এবং ক্ষমতা শূন্য' },
    { ch: 'phys2_ch6_geo_optics', topic: 'প্রিজম কোণ ও পূর্ণ অভ্যন্তরীণ প্রতিফলনের সীমা', principle: 'কোনো প্রিজম দিয়ে আলো যেন অপর তল থেকে নির্গতই না হতে পারে (সর্বদা TIR) তার শর্ত হলো প্রিজম কোণ A > 2θ_c', trap: '৪৫°–৯০°–৪৫° সমকোণী সমদ্বিবাহু কাচ প্রিজমকে পেরিস্কোপ ও বাইনোকুলারে রশ্মিকে ৯০° বা ১৮০° বাঁকাতে ব্যবহার করা হয়', valueNote: 'এতে সাধারণ রৌপ্য প্রলিপ্ত দর্পণের তুলনায় প্রায় ১০০% আলো প্রতিফলিত হয়' },
    { ch: 'phys2_ch6_geo_optics', topic: 'আলো-ঘটিত মরীচিকা (Mirage) ও মরুভূমি', principle: 'মরুভূমির উত্তপ্ত বালুর কাছের বায়ু হালকা ও ওপরের বায়ু ঘন বলে নিচের দিকে যাওয়া রশ্মি পূর্ণ অভ্যন্তরীণ প্রতিফলিত হয়ে চোখে পৌঁছায়', trap: 'শীতপ্রধান দেশে (Looming) ঠিক বিপরীত কারণে ওপরে শীতল স্তর ও নিচে উষ্ণ নয় বরং নিচে ঘন ও ওপরে হালকা স্তর থাকায় জাহাজ আকাশে ভাসমান দেখায়', valueNote: 'উভয় ঘটনাতেই প্রতিসরণ ও পূর্ণ অভ্যন্তরীণ প্রতিফলন যুক্ত থাকে' },
    { ch: 'phys2_ch6_geo_optics', topic: 'রংধনু বা রামধনুর প্রকারভেদ (প্রাথমিক ও গৌণ)', principle: 'প্রাথমিক রংধনুতে পানির কণায় ২ বার প্রতিসরণ ও ১ বার পূর্ণ অভ্যন্তরীণ প্রতিফলন হয় (বাইরে লাল, ভেতরে বেগুনি)', trap: 'গৌণ রংধনুতে ২ বার প্রতিসরণ ও ২ বার অভ্যন্তরীণ প্রতিফলন ঘটে বলে রঙের ক্রম উল্টে যায় (বাইরে বেগুনি, ভেতরে লাল)', valueNote: 'গৌণ রংধনু প্রাথমিক রংধনুর চেয়ে ম্লান ও ওপরে প্রায় ৫০°–৫৩° কোণে দেখা যায়' },
    { ch: 'phys2_ch6_geo_optics', topic: 'বিস্তার (Aperture) ছোট করলে ও দূরবীক্ষণ নলে ডোবালে', principle: 'যৌগিক অণুবীক্ষণ যন্ত্রে প্রথম প্রতিবিম্ব বাস্তব, উল্টো ও বিবর্ধিত এবং চূড়ান্ত প্রতিবিম্ব অবাস্তব, উল্টো ও অতি-বিবর্ধিত হয়', trap: 'টেলিস্কোপের অভিলক্ষ্যের ফোকাস দূরত্ব বড় রাখলে কৌণিক বিবর্ধন ও আলোক সংগ্রহ ক্ষমতা উভয়ই বাড়ে', valueNote: 'সমান বিবর্ধন পেতে লেন্স দুটির মধ্যবর্তী দূরত্ব পরিবর্তিত হয়' },

    { ch: 'phys2_ch7_physical_optics', topic: 'হাইগেনসের তরঙ্গমুখ (Wavefront) নীতি', principle: 'একই দশায় কম্পনশীল কণাগুলোর সঞ্চারপথকে তরঙ্গমুখ বলে; বিন্দু উৎস থেকে গোলীয় এবং অসীম দূরবর্তী উৎস থেকে সমতল তরঙ্গমুখ পাওয়া যায়', trap: 'তরঙ্গ সঞ্চালনের দিক বা আলোক রশ্মি সর্বদা তরঙ্গমুখের সাথে লম্ব (৯০°) অবস্থানে থাকে', valueNote: 'হাইগেনসের নীতি প্রতিফলন, প্রতিসরণ ও অপবর্তন ব্যাখ্যা করতে পারলেও আলোকতড়িৎ ক্রিয়া ব্যাখ্যা করতে পারে না' },
    { ch: 'phys2_ch7_physical_optics', topic: 'সুসঙ্গত উৎস (Coherent Sources) ও ব্যতিচার শর্ত', principle: 'দুটি উৎসকে সুসঙ্গত হতে হলে তাদের কম্পাঙ্ক ও তরঙ্গদৈর্ঘ্য ঠিক সমান এবং দশা পার্থক্য সময়ের সাথে স্থির থাকতে হবে', trap: 'দুটি আলাদা সাধারণ লাইট বাল্ব বা মোমবাতি কখনো সুসঙ্গত উৎস হিসেবে কাজ করে না কারণ পরমাণুতে আলো নিঃসরণ অনিয়মিত', valueNote: 'ইয়ং-এর পরীক্ষা ও ফ্রেসনেল বাইপ্রিজমে একটি মূল উৎস থেকেই দুটি কাল্পনিক সুসঙ্গত উৎস তৈরি করা হয়' },
    { ch: 'phys2_ch7_physical_optics', topic: 'সাবানের বুদবুদের পাতলা ফিল্মে উজ্জ্বল রঙ', principle: 'পাতলা ফিল্মের ওপরের তল থেকে প্রতিফলিত আলো ও নিচের তল থেকে প্রতিফলিত আলোর মধ্যে ব্যতিচার ঘটে', trap: 'ঘন মাধ্যম (পৃষ্ঠ) থেকে প্রতিফলনের সময় আলোর দশা π (১৮০°) বা পথ পার্থক্য λ/2 উল্টে যায়', valueNote: 'ফলে অতি পাতলা (t → 0) সাবান ফিল্ম প্রতিফলিত আলোয় অন্ধকার দেখায়' },
    { ch: 'phys2_ch7_physical_optics', topic: 'দ্বি-চির পরীক্ষায় স্ল্যাবের প্রভাব ও ঝালর স্থানান্তর', principle: 'একটি চিরের সামনে t পুরুত্ব ও μ প্রতিসরাঙ্কের স্বচ্ছ কাচের পাত বসালে কেন্দ্রীয় উজ্জ্বল ডোরা ঐ চিরের দিকে সরে যায়', trap: 'সরণের পরিমাণ Δx = (μ − 1) t D / d, তবে সকল ডোরার ঝালর প্রস্থ β অপরিবর্তিত থাকে', valueNote: 'পথ পার্থক্যের অতিরিক্ত মান (μ − 1)t' },
    { ch: 'phys2_ch7_physical_optics', topic: 'ফ্রনহফার অপবর্তন বনাম ফ্রেনেল অপবর্তন', principle: 'ফ্রনহফার অপবর্তনে উৎস ও পর্দা চির থেকে অসীম দূরত্বে থাকে (উত্তল লেন্স ব্যবহৃত হয় ও সমতল তরঙ্গমুখ পড়ে)', trap: 'ফ্রেনেল অপবর্তনে উৎস বা পর্দা সসীম দূরত্বে থাকে এবং কোনো লেন্সের প্রয়োজন হয় না', valueNote: 'গ্রেটিং ও একক চির পরীক্ষাগুলো প্রধানত ফ্রনহফার অপবর্তন' },
    { ch: 'phys2_ch7_physical_optics', topic: 'বিকিরণের আলোক-চাপ ও ম্যাক্সওয়েলের বিকিরণ বেগ', principle: 'তাড়িতচৌম্বক তরঙ্গ ভরবেগ p = E/c বহন করে বলে কোনো পৃষ্ঠে আপতিত হলে বিকিরণ চাপ (Radiation Pressure) প্রয়োগ করে', trap: 'পূর্ণ প্রতিফলক পৃষ্ঠে বিকিরণ চাপ 2I/c, যা পূর্ণ শোষক পৃষ্ঠের (I/c) চেয়ে দ্বিগুণ', valueNote: 'সূর্য থেকে পৃথিবীতে তাপ বিকিরণ কেবল তাড়িতচৌম্বক তরঙ্গের মাধ্যমে আসে' },
    { ch: 'phys2_ch7_physical_optics', topic: 'তাড়িতচৌম্বক বর্ণালীর ক্রম (তরঙ্গদৈর্ঘ্য ও কম্পাঙ্ক)', principle: 'তরঙ্গদৈর্ঘ্যের বড় থেকে ছোট ক্রম: বেতার তরঙ্গ > মাইক্রোওয়েভ > অবলোহিত (IR) > দৃশ্যমান > অতিবেগুনি (UV) > এক্স-রে > গামা রশ্মি', trap: 'কম্পাঙ্ক ও শক্তির ক্রম ঠিক এর বিপরীত—অর্থাৎ গামা রশ্মির কম্পাঙ্ক ও ভেদন ক্ষমতা সর্বাধিক', valueNote: 'দৃশ্যমান আলোতে লালের তরঙ্গদৈর্ঘ্য (~৭০০ nm) সবচেয়ে বড় ও বেগুনির (~৪০০ nm) সবচেয়ে ছোট' },
    { ch: 'phys2_ch7_physical_optics', topic: 'পোলারয়েড চশমা ও রাস্তার ঝলকানি (Glare) নিয়ন্ত্রণ', principle: 'অনুভূমিক রাস্তা বা পানির তল থেকে প্রতিফলিত আলো অনুভূমিক তলে আংশিক সমবর্তিত হয়', trap: 'তাই ঝলকানি দূর করতে পোলারয়েড সানগ্লাসের সঞ্চালন অক্ষ উল্লম্ব (Vertical) রাখা হয়', valueNote: 'দুটি পোলারয়েডের সঞ্চালন অক্ষ পরস্পর ৯০° কোণে থাকলে কোনো আলোই বাইরে বের হয় না' },
    { ch: 'phys2_ch7_physical_optics', topic: 'নিউটনের রিং (Newton’s Rings) পরীক্ষায় কেন্দ্রীয় বিন্দু', principle: 'সমতলোত্তল লেন্স ও সমতল কাচ পাতের মধ্যবর্তী বায়ু স্তরের পুরুত্ব কেন্দ্রবিন্দুতে শূন্য হওয়ায় প্রতিফলিত আলোয় কেন্দ্রটি কালো (অন্ধকার) দেখায়', trap: 'প্রতিসৃত আলোয় দেখলে কেন্দ্রীয় বিন্দুটি উজ্জ্বল (সাদা) দেখা যায়', valueNote: 'অন্ধকার বৃত্তগুলোর ব্যাসার্ধ r_n ∝ √n' },

    { ch: 'phys2_ch8_modern_phys', topic: 'মাইকেলসন-মোরলের পরীক্ষা ও ইথারের অস্তিত্বহীনতা', principle: '১৮৮৭ সালের মাইকেলসন-মোরলে পরীক্ষা প্রমাণ করে যে মহাশূন্যে কোনো কাল্পনিক স্থির "ইথার" মাধ্যম নেই এবং আলোর বেগ সর্বদিকে ধ্রুবক', trap: 'এই পরীক্ষার নেতিবাচক (Null) ফলাফলই আইনস্টাইনের বিশেষ আপেক্ষিক তত্ত্বের পথ প্রশস্ত করে', valueNote: 'আপেক্ষিকতায় জড় প্রসঙ্গ কাঠামো হলো যে কাঠামোতে নিউটনের প্রথম সূত্র প্রযোজ্য' },
    { ch: 'phys2_ch8_modern_phys', topic: 'দুটি ফোটন বা রকেটের আপেক্ষিক বেগ সংযোজন', principle: 'আইনস্টাইনের বেগ সংযোজন সূত্র u = (u′ + v) / (1 + u′v/c²); কোনো বস্তুর বেগ কখনো শূন্যে আলোর বেগ c-কে অতিক্রম করতে পারে না', trap: 'মুখোমুখি ০.৮c ও ০.৮c বেগে দুটি রকেট এগোলেও তাদের আপেক্ষিক বেগ ১.৬c নয় বরং ≈ ০.৯৭৬c হয়', valueNote: 'একটি ফোটনের সাপেক্ষে অপর ফোটনের আপেক্ষিক বেগ সর্বদা c' },
    { ch: 'phys2_ch8_modern_phys', topic: 'মুক্ত ইলেকট্রন ফোটন সম্পূর্ণ শোষণ করতে পারে না কেন', principle: 'একটি মুক্ত ও স্থির ইলেকট্রন সম্পূর্ণ ফোটন শোষণ করলে একই সাথে রৈখিক ভরবেগ ও মোট আপেক্ষিক শক্তি সংরক্ষিত থাকতে পারে না', trap: 'তাই ফটোইলেকট্রিক ক্রিয়া কেবল পরমাণুর সাথে আবদ্ধ ইলেকট্রনের ক্ষেত্রে ঘটে, আর মুক্ত ইলেকট্রনে কম্পটন ক্রিয়া ঘটে', valueNote: 'অন্যদিকে ভারী নিউক্লিয়াসের পাশে উচ্চ শক্তির গামা ফোটন (>১.০২ MeV) ইলেকট্রন-পজিট্রন জোড়া সৃষ্টি করে' },
    { ch: 'phys2_ch8_modern_phys', topic: 'এক্স-রের ধর্ম ও শ্রেণিবিভাগ (কঠিন ও কোমল এক্স-রে)', principle: 'উচ্চ অ্যানোড ভোল্টেজে সৃষ্ট ক্ষুদ্র তরঙ্গদৈর্ঘ্য ও অধিক ভেদন ক্ষমতাসম্পন্ন রশ্মি হলো কঠিন (Hard) এক্স-রে', trap: 'এক্স-রে তাড়িতচৌম্বক তরঙ্গ হওয়ায় তড়িৎ বা চৌম্বক ক্ষেত্র দ্বারা বিচ্যুত হয় না', valueNote: 'এক্স-রে ব্র্যাগ সমীকরণ (2d sinθ = nλ) অনুযায়ী কেলাসের গঠন নির্ণয়ে ব্যবহৃত হয়' },
    { ch: 'phys2_ch8_modern_phys', topic: 'কণা-তরঙ্গ দ্বৈততা ও ম্যাক্রোস্কোপিক বস্তুতে তরঙ্গ', principle: 'চলাচলরত ক্রিকেট বল বা গাড়ির ভর অনেক বেশি বলে এর ডি-ব্রগলি তরঙ্গদৈর্ঘ্য (~১০⁻³⁴ m) এত ক্ষুদ্র যে অপবর্তন পর্যবেক্ষণযোগ্য নয়', trap: 'কিন্তু ইলেকট্রন বা নিউট্রনের ভর অতি নগণ্য বলে এদের তরঙ্গদৈর্ঘ্য কেলাসের পারমাণবিক দূরত্বের সমতুল্য (~১ Å) হয়', valueNote: 'সমান ভোল্টেজ V-তে ত্বরান্বিত হলে λ ∝ 1/√(mq)' },
    { ch: 'phys2_ch8_modern_phys', topic: 'আলোকতড়িৎ ক্রিয়ায় তীব্রতা ও কম্পাঙ্কের পৃথক প্রভাব', principle: 'আলোর তীব্রতা (Intensity) বাড়ালে প্রতি সেকেন্ডে আপতিত ফোটন সংখ্যা বাড়ে, ফলে ফটোতড়িৎ প্রবাহ বাড়ে কিন্তু গতিশক্তি K_max অপরিবর্তিত থাকে', trap: 'কেবল কম্পাঙ্ক f বাড়ালে (f > f₀) নির্গত ইলেকট্রনের সর্বোচ্চ গতিশক্তি ও নিবৃত্তি বিভব বৃদ্ধি পায়', valueNote: 'আলো পড়া ও ইলেকট্রন বের হওয়ার মধ্যে কোনো সময়-বিলম্ব (~১০⁻⁹ s-এর কম) থাকে না' },
    { ch: 'phys2_ch8_modern_phys', topic: 'যুগল উৎপাদন (Pair Production) ও যুগল বিনাশ', principle: 'কমপক্ষে ১.০২২ MeV শক্তির একটি গামা ফোটন নিউক্লিয়াসের প্রভাবে একটি ইলেকট্রন (e⁻) ও একটি পজিট্রন (e⁺) সৃষ্টি করে', trap: 'এ প্রক্রিয়ায় শক্তি পদার্থে (m_e c² = ০.৫১১ MeV × ২) রূপান্তরিত হয়; বিপরীত প্রক্রিয়ায় e⁻ ও e⁺ মিলিত হয়ে দুটি গামা ফোটন তৈরি করে', valueNote: 'এটি চার্জ সংরক্ষণ ও ভর-শক্তি সমতা E = mc² উভয়ই মেনে চলে' },
    { ch: 'phys2_ch8_modern_phys', topic: 'কৃষ্ণবস্তুর বিকিরণ ও প্ল্যাঙ্কের সমাধান', principle: 'চিরায়ত র‍্যালে-জিনস সূত্র ক্ষুদ্র তরঙ্গদৈর্ঘ্যে অসীম শক্তির ভুল পূর্বাভাস (Ultraviolet Catastrophe) দিয়েছিল যা প্ল্যাঙ্কের কোয়ান্টা সমাধান করে', trap: 'আদর্শ কৃষ্ণবস্তু সকল তরঙ্গদৈর্ঘ্যের বিকিরণ ১০০% শোষণ করে এবং উত্তপ্ত হলে সর্বাধিক বিকিরণ ঘটায় (যেমন কার্বন ব্ল্যাক ~৯৯%)', valueNote: 'ফেরির কৃষ্ণবস্তু (Féry’s Blackbody) হলো একটি ছোট ছিদ্রযুক্ত দ্বি-দেয়াল ফাঁপা গোলক' },
    { ch: 'phys2_ch8_modern_phys', topic: 'থার্মিওনিক নিঃসরণ বনাম ফটোইলেকট্রিক নিঃসরণ', principle: 'ধাতুকে উত্তপ্ত করে ইলেকট্রন বের করাকে থার্মিওনিক নিঃসরণ এবং উপযুক্ত কম্পাঙ্কের আলো ফেলে বের করাকে আলোকতড়িৎ নিঃসরণ বলে', trap: 'তীব্র তড়িৎ ক্ষেত্র প্রয়োগে ধাতু থেকে ইলেকট্রন টেনে বের করাকে ফিল্ড এমিশন (Field Emission) বলে', valueNote: 'সমস্ত নিঃসরণ প্রক্রিয়াতেই কার্য অপেক্ষক Φ₀ অতিক্রম করতে হয়' },

    { ch: 'phys2_ch9_atomic_nuclear', topic: 'থমসনের প্লাম-পুডিং মডেল ও রাদারফোর্ডের ব্যর্থতা', principle: 'রাদারফোর্ডের মডেল পারমাণবিক স্থায়িত্ব (ম্যাক্সওয়েলের তত্ত্বানুসারে ঘূর্ণায়মান চার্জ বিকিরণ হারিয়ে কেন্দ্রে পড়ে যাওয়ার কথা) ও বিচ্ছিন্ন রেখা বর্ণালী ব্যাখ্যা করতে পারেনি', trap: 'সোনার পাতের পরীক্ষায় প্রায় ২০,০০০-এর মধ্যে মাত্র ১টি আলফা কণা ১৮০° কোণে ফিরে আসায় ক্ষুদ্র, অতি ভারী ও ধনাত্মক নিউক্লিয়াসের প্রমাণ মেলে', valueNote: 'সর্বনিম্ন অভিগমন দূরত্ব (Distance of Closest Approach) থেকে নিউক্লিয়াসের ব্যাসার্ধ (~১০⁻¹⁴ m) মাপা যায়' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'বোরের কক্ষপথে ইলেকট্রনের বেগ ও শক্তি অনুপাত', principle: 'হাইড্রোজেনের n-তম কক্ষপথে ইলেকট্রনের বেগ v_n ∝ 1/n (১ম কক্ষপথে c/137 ≈ ২.১৮×১০⁶ m/s) এবং কক্ষীয় কম্পাঙ্ক f_n ∝ 1/n³', trap: 'বোর কক্ষপথে ইলেকট্রনের গতিশক্তি (K), বিভবশক্তি (U) ও মোট শক্তির (E) সম্পর্ক: K = −E এবং U = 2E', valueNote: 'অর্থাৎ ১ম কক্ষপথে K = +১৩.৬ eV ও U = −২৭.২ eV' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'হাইড্রোজেন আয়ন (He⁺, Li²⁺)-এর জন্য বোর সূত্র', principle: 'Z পারমাণবিক সংখ্যার এক-ইলেকট্রন বিশিষ্ট আয়নের ক্ষেত্রে শক্তি E_n = −১৩.৬ Z² / n² eV এবং ব্যাসার্ধ r_n = ০.৫২৯ n² / Z Å', trap: 'তাই হিলিয়াম আয়ন He⁺ (Z = ২)-এর ভূমি স্তরের শক্তি −৫৪.৪ eV এবং ব্যাসার্ধ হাইড্রোজেনের অর্ধেক', valueNote: 'হিলিয়ামের দ্বিতীয় আয়নীকরণ বিভব +৫৪.৪ V' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'আইসোটোপ, আইসোবার, আইসোটোন ও আইসোমার', principle: 'আইসোটোপে প্রোটন সংখ্যা (Z) সমান; আইসোবারে ভরসংখ্যা (A) সমান; আইসোটোনে নিউট্রন সংখ্যা (A − Z) সমান', trap: 'একই Z ও একই A হওয়া সত্ত্বেও কেবল নিউক্লীয় শক্তির অবস্থা ভিন্ন হলে তাদের নিউক্লীয় আইসোমার বলে', valueNote: 'আইসোটোপের রাসায়নিক ধর্ম অভিন্ন কিন্তু ভৌত ও নিউক্লীয় ধর্ম ভিন্ন' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'তেজস্ক্রিয় ক্ষয় প্রক্রিয়ায় নিউট্রিনো ও অ্যান্টি-নিউট্রিনো', principle: 'β⁻ ক্ষয়ে একটি নিউট্রন প্রোটনে রূপান্তরিত হয়ে ইলেকট্রন ও অ্যান্টি-নিউট্রিনো নির্গত করে; β⁺ ক্ষয়ে প্রোটন নিউট্রনে রূপান্তরিত হয়ে পজিট্রন ও নিউট্রিনো দেয়', trap: 'পউলি (Pauli) শক্তি ও কৌণিক ভরবেগের সংরক্ষণ ব্যাখ্যা করতে নিউট্রিনো কণার অস্তিত্ব প্রস্তাব করেন যা দুর্বল নিউক্লীয় বলে সাড়া দেয়', valueNote: 'বিটা কণার শক্তি বর্ণালী অবিচ্ছিন্ন (Continuous), কিন্তু আলফা ও গামার বিচ্ছিন্ন (Discrete)' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'নিউক্লীয় ফিশন বিক্রিয়ার গড় শক্তি ও নিউট্রন সংখ্যা', principle: 'প্রতিটি ²³⁵U ফিশনে গড়ে প্রায় ২০০ MeV শক্তি এবং ২.৫ থেকে ৩টি দ্রুতগতির গৌণ নিউট্রন উৎপন্ন হয়', trap: 'বিশুদ্ধ ²³⁵U সমৃদ্ধ (Enriched) করা হয় কারণ প্রাকৃতিক ইউরেনিয়ামে ৯৯.৩% থাকে ²³⁸U এবং মাত্র ০.৭% থাকে ²³⁵U', valueNote: 'পারমাণবিক চুল্লিতে সোডিয়াম ধাতু বা পানি শীতক (Coolant) হিসেবে ব্যবহৃত হয়' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'সূর্যের প্রোটন-প্রোটন ফিউশন চক্র ও CNO চক্র', principle: 'সূর্যের অভ্যন্তরে প্রায় ১.৫×১০⁷ K তাপমাত্রায় প্রোটন-প্রোটন চক্রে ৪টি প্রোটন মিলে ১টি ⁴He নিউক্লিয়াস, ২টি পজিট্রন ও প্রায় ২৬.৭ MeV শক্তি সৃষ্টি করে', trap: 'সূর্যের চেয়ে অনেক ভারী ও উষ্ণ নক্ষত্রে প্রধানত কার্বন-নাইট্রোজেন-অক্সিজেন (CNO) চক্রের মাধ্যমে ফিউশন ঘটে', valueNote: 'পৃথিবীতে ফিউশন বিদ্যুৎ উৎপাদনের জন্য ডিউটেরিয়াম ও ট্রিটিয়াম ব্যবহৃত হয় (টোকাম্যাক)' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'বোর কক্ষপথ ও ডি-ব্রগলি স্থির তরঙ্গ শর্ত', principle: 'ইলেকট্রনের n-তম কক্ষপথের পরিধি 2πr_n অবশ্যই nটি পূর্ণ ডি-ব্রগলি তরঙ্গদৈর্ঘ্যের সমান হতে হবে (2πr_n = nλ)', trap: 'এ থেকেই বোরের কৌণিক ভরবেগ কোয়ান্টায়ন (mvr = nh/2π) তাত্ত্বিকভাবে প্রমাণিত হয়', valueNote: 'কোনো কক্ষপথে পূর্ণ তরঙ্গ তৈরি না হলে ব্যতিচারে ধ্বংস হয়ে অস্তিত্ব টিকত না' },
    { ch: 'phys2_ch9_atomic_nuclear', topic: 'তেজস্ক্রিয় সক্রিয়তা (Activity A = λN)', principle: 'সময়ের সাথে তেজস্ক্রিয় নমুনার সক্রিয়তা সূচকীয়ভাবে কমে: A = A₀ e^(−λt) এবং ১টি অর্ধায়ু পর সক্রিয়তা অর্ধেক হয়', trap: 'অর্ধায়ু যত কম হবে ক্ষয় ধ্রুবক λ তত বড় এবং নমুনাটি তত বেশি সক্রিয় (তেজস্ক্রিয়) হবে', valueNote: '৫০% ক্ষয় হতে ১টি অর্ধায়ু লাগে, কিন্তু পরবর্তী বাকি ৫০%-এর অর্ধেক (মোট ৭৫%) ক্ষয় হতে আরেকটি অর্ধায়ু লাগে' },

    { ch: 'phys2_ch10_semiconductor', topic: 'n-টাইপ ও p-টাইপ অর্ধপরিবাহীতে ডোপিং স্তরের শক্তি অবস্থান', principle: 'n-টাইপে দাতা শক্তির স্তর (Donor Level) পরিবহন ব্যান্ডের ঠিক নিচে থাকে, আর p-টাইপে গ্রহীতা শক্তির স্তর (Acceptor Level) যোজন ব্যান্ডের ঠিক ওপরে থাকে', trap: 'ফলে সামান্য তাপীয় শক্তিতেই প্রচুর মুক্ত ইলেকট্রন বা হোল তৈরি হয়ে পরিবাহিতা বহুগুণ বাড়িয়ে দেয়', valueNote: 'জার্মেনিয়ামে দাতা/গ্রহীতা আয়নীকরণ শক্তি ≈ ০.০১ eV এবং সিলিকনে ≈ ০.০৫ eV' },
    { ch: 'phys2_ch10_semiconductor', topic: 'LED (Light Emitting Diode) ও ফটোডায়োডের বায়াসিং', principle: 'LED সর্বদা সম্মুখ বায়াসে (Forward Bias) কাজ করে যেখানে ইলেকট্রন-হোল পুনর্মিলনের সময় ফোটন রূপে আলো নির্গত হয়', trap: 'অন্যদিকে ফটোডায়োড ও জেনার ডায়োড সর্বদা বিমুখ বায়াসে (Reverse Bias) কাজ করে', valueNote: 'সৌরকোষে (Solar Cell) কোনো বাহ্যিক বায়াস ভোল্টেজ দিতে হয় না—আলোক ফোটনই বিভব সৃষ্টি করে' },
    { ch: 'phys2_ch10_semiconductor', topic: 'ট্রানজিস্টরের তিনটি সংযোগ মোড (CB, CE, CC)', principle: 'কমন-এমিটার (CE) মোডে ভোল্টেজ লাভ, প্রবাহ লাভ ও ক্ষমতা লাভ সবগুলোই উচ্চ এবং ইনপুট ও আউটপুটের দশা পার্থক্য ১৮০° (বিপরীতমুখী)', trap: 'কমন-বেস (CB) মোডে প্রবাহ লাভ α < ১ (তাই ইনপুট ও আউটপুট সমদশায় থাকে)', valueNote: 'কমন-কালেক্টর (Emitter Follower) মোড ইম্পিড্যান্স ম্যাচিং-এ ব্যবহৃত হয়' },
    { ch: 'phys2_ch10_semiconductor', topic: 'রিপল ফ্যাক্টর ও ফিল্টার সার্কিটের কাজ', principle: 'রেক্টিফায়ার থেকে পাওয়া একমুখী প্রবাহে AC স্পন্দন (Ripple) দূর করে মসৃণ DC পেতে ধারক বা আবেশক ফিল্টার ব্যবহৃত হয়', trap: 'পূর্ণ-তরঙ্গ রেক্টিফায়ারের দক্ষতা (~৮১.২%) অর্ধ-তরঙ্গ রেক্টিফায়ারের (~৪০.৬%) ঠিক দ্বিগুণ', valueNote: 'ধারক AC উপাদানকে বাইপাস করে লোডে বিশুদ্ধ DC পৌঁছে দেয়' },
    { ch: 'phys2_ch10_semiconductor', topic: 'সকল মৌলিক গেট (AND, OR, NOT) বনাম বিশেষ গেট', principle: 'কোনো লজিক গেটে ১টি ইনপুট দিলেই কাজ করতে পারে কেবল NOT গেট (ইনভার্টার); বাকি সব গেটে ন্যূনতম ২টি ইনপুট থাকে', trap: 'সমান দুটি ইনপুট (A ও A) দিয়ে NAND বা NOR গেট যুক্ত করলে সেটি NOT গেট হিসেবে কাজ করে', valueNote: 'AND গেট সিরিজ সুইচ এবং OR গেট প্যারালাল সুইচের অনুরূপ' },
    { ch: 'phys2_ch10_semiconductor', topic: 'বুলিয়ান বীজগণিতের মৌলিক স্বতঃসিদ্ধ', principle: 'বুলিয়ান যোগে ১ + ১ = ১, A + ১ = ১ এবং A + A′ = ১; বুলিয়ান গুণে A · ০ = ০ এবং A · A′ = ০', trap: 'সাধারণ বীজগণিত থেকে ভিন্নভাবে বুলিয়ানে A + A = A এবং A · A = A লেখা হয়', valueNote: 'শোষণ সূত্র (Absorption Law): A + A·B = A' },
    { ch: 'phys2_ch10_semiconductor', topic: 'অর্ধপরিবাহীর বিভব প্রাচীরের পুরুত্ব ও তাপমাত্রার প্রভাব', principle: 'নিঃশেষিত স্তরের (Depletion Region) প্রশস্ততা ডোপিং ঘনত্ব বেশি হলে সরু হয় এবং বিমুখ ভোল্টেজ বাড়ালে প্রশস্ত হয়', trap: 'বিমুখ ভোল্টেজ অত্যন্ত বেশি হয়ে গেলে অ্যাভালাঞ্চ (Avalanche) বা জেনার ব্রেকডাউন ঘটে বিপুল প্রবাহ প্রবাহিত হয়', valueNote: 'নিঃশেষিত স্তরে কোনো মুক্ত চার্জ বাহক থাকে না, কেবল স্থির আয়ন থাকে' },
    { ch: 'phys2_ch10_semiconductor', topic: 'NPN বনাম PNP ট্রানজিস্টরের তীর চিহ্ন (Arrow)', principle: 'প্রতীকী চিহ্নে তীর চিহ্ন সর্বদা নিঃসারক (Emitter) প্রান্তে থাকে এবং তা P থেকে N অঞ্চলের দিকে প্রচলিত প্রবাহ নির্দেশ করে', trap: 'NPN ট্রানজিস্টরে তীর চিহ্ন বাইরের দিকে এবং PNP ট্রানজিস্টরে তীর চিহ্ন ভেতরের দিকে নির্দেশ করে', valueNote: 'NPN ট্রানজিস্টরে ইলেকট্রন মুখ্য বাহক হওয়ায় PNP অপেক্ষা দ্রুতগতির ও বহুল ব্যবহৃত' },
    { ch: 'phys2_ch10_semiconductor', topic: 'দশমিক, বাইনারি, অক্টাল ও হেক্সাডেসিমেল ভিত্তি', principle: 'বাইনারির ভিত্তি ২, অক্টালের ভিত্তি ৮, দশমিকের ১০ এবং হেক্সাডেসিমেলের ভিত্তি ১৬ (০–৯ ও A–F)', trap: '১টি হেক্সাডেসিমেল অঙ্ক = ৪ বিট (Nibble) এবং ১টি অক্টাল অঙ্ক = ৩ বিট বাইনারির সমান', valueNote: '১ বাইট = ৮ বিট = ২টি হেক্সাডেসিমেল অঙ্ক (F = ১৫)' },

    { ch: 'phys2_ch11_astronomy', topic: 'হাবল নীতি ও মহাবিশ্বের প্রসারণের অর্থ', principle: 'ছায়াপথগুলো স্থানের মধ্য দিয়ে দৌড়াচ্ছে না, বরং দুটি ছায়াপথের মধ্যবর্তী স্থান (Space-time) নিজেই প্রসারিত হচ্ছে', trap: 'মহাবিশ্বের প্রসারণ ধীর না হয়ে ত্বরান্বিত হচ্ছে (১৯৯৮ সালে সুপারনোভা পর্যবেক্ষণে প্রমাণিত) যার কারণ অদৃশ্য ডার্ক এনার্জি', valueNote: 'মহাবিশ্বে দৃশ্যমান সাধারণ পদার্থ মাত্র ~৫%, ডার্ক ম্যাটার ~২৭% ও ডার্ক এনার্জি ~৬৮%' },
    { ch: 'phys2_ch11_astronomy', topic: 'তারকার বর্ণ ও পৃষ্ঠ তাপমাত্রা (O B A F G K M)', principle: 'নক্ষত্রের সবচেয়ে উষ্ণ থেকে শীতল শ্রেণিবিন্যাস ক্রম: O (নীল, >৩০,০০০ K) → B → A → F → G (হলুদ সূর্য, ~৫,৮০০ K) → K → M (লাল, <৩,৫০০ K)', trap: 'অর্থাৎ নীল তারা লাল তারার তুলনায় অনেক বেশি উত্তপ্ত (ভিনের সূত্র অনুসারে λ_m কম মানে T বেশি)', valueNote: 'সূর্য একটি মাঝারি হলুদ G2V নক্ষত্র যার আনুমানিক আয়ুষ্কাল প্রায় ১০ বিলিয়ন বছর (বর্তমান ৪.৬ বিলিয়ন)' },
    { ch: 'phys2_ch11_astronomy', topic: 'শ্বেত বামন, লাল দানব ও গ্রহের নীহারিকা (Planetary Nebula)', principle: 'সূর্যের মতো নিম্ন/মধ্যম ভরের নক্ষত্রের কেন্দ্রের হাইড্রোজেন ফুরিয়ে গেলে বাইরের স্তর প্রসারিত হয়ে লোহিত দানব (Red Giant) ও পরে কেন্দ্রে শ্বেত বামন তৈরি হয়', trap: 'সূর্যের মতো তারাগুলো কখনোই সুপারনোভা বিস্ফোরণ বা কৃষ্ণগহ্বরে পরিণত হয় না (ভর < ১.৪ M_☉ বলে)', valueNote: 'শ্বেত বামনের আকার পৃথিবীর প্রায় সমান হলেও ঘনত্ব অত্যন্ত বেশি (~১০⁹ kg/m³)' },
    { ch: 'phys2_ch11_astronomy', topic: 'সুপারনোভা ও ভারী মৌলের সৃষ্টি (Nucleosynthesis)', principle: 'মহাবিশ্বের শুরুর দিকে বিগ ব্যাং-এ কেবল H ও He তৈরি হয়েছিল; লোহা ও তার চেয়ে ভারী সোনা-ইউরেনিয়ামের মতো মৌলগুলো সুপারনোভা ও নিউট্রন তারা সংঘর্ষে তৈরি হয়', trap: 'সুপারনোভা বিস্ফোরণ একটি পুরো ছায়াপথের সমান উজ্জ্বল হতে পারে', valueNote: '১৫৭২ ও ১৬০৪ সালের সুপারনোভা যথাক্রমে টাইকো ব্রাহে ও কেপলার খালি চোখে পর্যবেক্ষণ করেছিলেন' },
    { ch: 'phys2_ch11_astronomy', topic: 'বিগ ব্যাং তত্ত্ব বনাম স্থিরাবস্থা তত্ত্ব (Steady State)', principle: 'জর্জ লেমিত্রে ও জর্জ গ্যামো প্রদত্ত বিগ ব্যাং তত্ত্ব অনুসারে প্রায় ১৩.৮ বিলিয়ন বছর আগে এক অতি-ঘন ও উত্তপ্ত সিঙ্গুলারিটি থেকে মহাবিশ্বের সূচনা হয়', trap: '১৯৬৫ সালে পেনজিয়াস ও উইলসন ২.৭৩ K কসমিক মাইক্রোওয়েভ ব্যাকগ্রাউন্ড (CMB) আবিষ্কার করে স্থিরাবস্থা তত্ত্ব ভুল প্রমাণ করেন', valueNote: 'মহাবিশ্বে হাইড্রোজেন (~৭৫%) ও হিলিয়াম (~২৫%) অনুপাত বিগ ব্যাং নিউক্লিওসিন্থেসিস সমর্থন করে' },
    { ch: 'phys2_ch11_astronomy', topic: 'সৌর ধ্রুবক (Solar Constant) ও সূর্যের শক্তি উৎপাদন', principle: 'পৃথিবীর বায়ুমণ্ডলের বাইরে সূর্যের সাথে লম্ব একক ক্ষেত্রফলে প্রতি সেকেন্ডে প্রাপ্ত সৌরশক্তিকে সৌর ধ্রুবক বলে (~১,৩৬১ বা ~১,৪০০ W/m²)', trap: 'প্রতি সেকেন্ডে সূর্যে প্রায় ৬০০ মিলিয়ন টন হাইড্রোজেন ফিউশন হয়ে হিলিয়ামে পরিণত হয় এবং প্রায় ৪ মিলিয়ন টন ভর শক্তিতে রূপান্তরিত হয়', valueNote: 'পৃথিবী থেকে সূর্যে আলো পৌঁছাতে প্রায় ৮ মিনিট ২০ সেকেন্ড (৫০০ সেকেন্ড) সময় লাগে' },
    { ch: 'phys2_ch11_astronomy', topic: 'কৃষ্ণগহ্বরের শনাক্তকরণ ও ইভেন্ট হরাইজন টেলিস্কোপ', principle: 'কৃষ্ণগহ্বর সরাসরি আলো ছড়ায় না বলে এর চারপাশের অ্যাক্রিশন ডিস্ক (Accretion Disk) থেকে নির্গত এক্স-রে ও নিকটবর্তী নক্ষত্রের কক্ষপথ দেখে একে শনাক্ত করা হয়', trap: '২০১৯ সালে ইভেন্ট হরাইজন টেলিস্কোপ (EHT) সর্বপ্রথম M87 ছায়াপথের কেন্দ্রে অতি-ভরের কৃষ্ণগহ্বরের ছায়ার ছবি প্রকাশ করে', valueNote: 'আমাদের মিল্কিওয়ে ছায়াপথের কেন্দ্রের কৃষ্ণগহ্বরটির নাম স্যাজিটেরিয়াস এ* (Sagittarius A*)' },
    { ch: 'phys2_ch11_astronomy', topic: 'কোয়াসার (Quasar) ও সক্রিয় ছায়াপথ', principle: 'দূরবর্তী অতি উজ্জ্বল ছায়াপথের কেন্দ্রকে কোয়াসার (Quasi-stellar Radio Source) বলে যার শক্তি আসে কেন্দ্রীয় অতি-ভারী কৃষ্ণগহ্বরে পদার্থ পতনের ফলে', trap: 'কোয়াসারের বর্ণালিতে প্রচণ্ড লাল অপসারণ দেখা যায়—অর্থাৎ এগুলো অত্যন্ত দূরবর্তী ও প্রাচীনতম মহাজাগতিক বস্তু', valueNote: 'সর্পিল ছায়াপথ (Spiral Galaxy) হলো মিল্কিওয়ে ও অ্যান্ড্রোমিডার শ্রেণি' },
    { ch: 'phys2_ch11_astronomy', topic: 'অণুতরঙ্গ পটভূমি (CMB) ও মহাকর্ষীয় তরঙ্গ (Gravitational Waves)', principle: 'দুটি কৃষ্ণগহ্বর বা নিউট্রন তারার সংঘর্ষে স্থান-কালের বুননে সৃষ্ট ঢেউ হলো মহাকর্ষীয় তরঙ্গ, যা ২০১৫ সালে LIGO প্রথম শনাক্ত করে', trap: 'আইনস্টাইনের সাধারণ আপেক্ষিক তত্ত্ব প্রায় ১০০ বছর আগেই আলোর বেগে চলমান এ মহাকর্ষীয় তরঙ্গের ভবিষ্যদ্বাণী করেছিল', valueNote: 'LIGO-তে লেজার ইন্টারফেরোমিটারের সাহায্যে প্রোটনের ব্যাসের চেয়ে ক্ষুদ্র (~১০⁻¹⁹ m) সরণ মাপা হয়' },
    { ch: 'phys2_ch11_astronomy', topic: 'গ্রহীয় গতি ও ধূমকেতুর লেজের দিক', principle: 'সৌরজগতের ধূমকেতু সূর্যের নিকটবর্তী হলে সূর্যের বিকিরণ চাপ ও সৌরবায়ুর প্রভাবে ধূমকেতুর লেজ সর্বদা সূর্যের বিপরীত দিকে থাকে', trap: 'হ্যালির ধূমকেতু প্রায় ৭৬ বছর পরপর পৃথিবীর আকাশে ফিরে আসে (সর্বশেষ ১৯৮৬, পরবর্তী ২০৬১)', valueNote: 'সূর্যের সবচেয়ে কাছের নক্ষত্র প্রক্সিমা সেন্টাউরি (দূরত্ব প্রায় ৪.২৪ আলোকবর্ষ)' },
  ];

  const tPool = matrix6to11.map((m) => m.topic);
  const pPool = matrix6to11.map((m) => m.principle);
  const trapPool = matrix6to11.map((m) => m.trap);
  const valPool = matrix6to11.map((m) => m.valueNote);

  matrix6to11.forEach((m, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${m.topic}" সম্পর্কে পদার্থবিজ্ঞানের সঠিক মূলনীতি কোনটি?`,
        correct: m.principle,
        distractors: uniqueDists(
          m.principle,
          [1, 3, 7, 11, 17].map((o) => pPool[(idx + o) % matrix6to11.length])
        ),
        explanation: `${m.principle}। (${m.trap})`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬–১১ মূলনীতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${m.topic}" বিষয়ে পরীক্ষায় আসা গুরুত্বপূর্ণ ব্যতিক্রম বা সিদ্ধান্ত কোনটি?`,
        correct: m.trap,
        distractors: uniqueDists(
          m.trap,
          [2, 5, 9, 13, 19].map((o) => trapPool[(idx + o) % matrix6to11.length])
        ),
        explanation: `${m.trap}। (${m.valueNote})`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · মেডিকেল ও ভার্সিটি ট্রিকস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${m.topic}"-এর গুরুত্বপূর্ণ গাণিতিক সম্পর্ক বা সংখ্যাত্মক তথ্য কোনটি?`,
        correct: m.valueNote,
        distractors: uniqueDists(
          m.valueNote,
          [1, 4, 8, 12, 16].map((o) => valPool[(idx + o) % matrix6to11.length])
        ),
        explanation: `${m.valueNote} — ${m.principle}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · গাণিতিক সারসংক্ষেপ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: m.ch,
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${m.trap}" — এ গুরুত্বপূর্ণ বক্তব্যটি কোন বিষয়ের সাথে সম্পর্কিত?`,
        correct: m.topic,
        distractors: uniqueDists(
          m.topic,
          [2, 6, 10, 14, 18].map((o) => tPool[(idx + o) % matrix6to11.length])
        ),
        explanation: `এটি "${m.topic}"-এর উচ্চতর ব্যাখ্যা।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · চূড়ান্ত রিভিশন',
      })
    );
  });

  return list;
}
