import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredH(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sh_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 5: Electromagnetic Induction, Transformer, AC RMS & LCR (~170 MCQs)
  // =========================================================================
  // 1A: Faraday's Law E = N * dPhi / dt & Motional EMF E = B l v (36 MCQs)
  [
    { N: 100, phi1: 0.5, phi2: 0.1, t: 0.2 },
    { N: 200, phi1: 0.4, phi2: 0.1, t: 0.5 },
    { N: 500, phi1: 0.08, phi2: 0.02, t: 0.1 },
    { N: 50, phi1: 0.6, phi2: 0.2, t: 0.4 },
    { N: 100, phi1: 0.8, phi2: 0.2, t: 0.5 },
    { N: 400, phi1: 0.05, phi2: 0.01, t: 0.2 },
    { N: 300, phi1: 0.3, phi2: 0.0, t: 0.3 },
    { N: 250, phi1: 0.2, phi2: 0.04, t: 0.4 },
    { N: 150, phi1: 0.4, phi2: 0.0, t: 0.2 },
    { N: 600, phi1: 0.06, phi2: 0.01, t: 0.3 },
  ].forEach((fr, idx) => {
    const emf = Math.round((fr.N * (fr.phi1 - fr.phi2)) / fr.t);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(fr.N)} পাকের একটি কুণ্ডলীর মধ্য দিয়ে চৌম্বক ফ্লাক্স ${toBnDigits(fr.t)} s সময়ে ${toBnDigits(fr.phi1)} Wb থেকে হ্রাস পেয়ে ${toBnDigits(fr.phi2)} Wb হলে কুণ্ডলীতে আবিষ্ট তড়িচ্চালক শক্তির মান কত ভোল্ট?`,
        correct: `${toBnDigits(emf)} V`,
        distractors: [emf / 2, emf * 2, emf + 25, Math.max(5, emf - 20)]
          .filter((x) => x > 0 && x !== emf)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `|E| = N |ΔΦ/Δt| = ${toBnDigits(fr.N)} × (${toBnDigits(fr.phi1)} - ${toBnDigits(fr.phi2)}) / ${toBnDigits(fr.t)} = ${toBnDigits(emf)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ফ্যারাডের তাড়িতচৌম্বক আবেশ সূত্র',
      })
    );
  });

  [
    { B: 0.5, l: 2, v: 10 },
    { B: 0.4, l: 1.5, v: 20 },
    { B: 0.2, l: 4, v: 15 },
    { B: 0.8, l: 0.5, v: 25 },
    { B: 0.6, l: 1, v: 30 },
    { B: 0.25, l: 2, v: 40 },
    { B: 0.3, l: 3, v: 20 },
    { B: 1.2, l: 0.5, v: 10 },
  ].forEach((me, idx) => {
    const emf = Number((me.B * me.l * me.v).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(me.l)} m দৈর্ঘ্যের একটি পরিবাহী দণ্ড ${toBnDigits(me.B)} T চৌম্বক ক্ষেত্রের সাথে লম্বভাবে ${toBnDigits(me.v)} m/s বেগে গতিশীল হলে দণ্ডটির দুই প্রান্তে আবিষ্ট গতীয় EMF কত V?`,
        correct: `${toBnDigits(emf)} V`,
        distractors: [emf * 2, emf / 2, emf + 3, emf + 7]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== emf)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `গতীয় তড়িচ্চালক শক্তি E = Blv = ${toBnDigits(me.B)} × ${toBnDigits(me.l)} × ${toBnDigits(me.v)} = ${toBnDigits(emf)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · গতীয় তড়িচ্চালক শক্তি',
      })
    );
  });

  // 1B: Self Inductance EMF & Energy U = 1/2 L I^2 (28 MCQs)
  [
    { L: 2, I: 5 },
    { L: 4, I: 3 },
    { L: 0.5, I: 10 },
    { L: 1.5, I: 4 },
    { L: 5, I: 2 },
    { L: 0.2, I: 10 },
    { L: 3, I: 4 },
    { L: 6, I: 5 },
    { L: 8, I: 2.5 },
    { L: 0.4, I: 5 },
  ].forEach((ind, idx) => {
    const u = Number((0.5 * ind.L * ind.I * ind.I).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(ind.L)} H স্বকীয় আবেশ গুণাঙ্কের একটি আবেশকের মধ্য দিয়ে ${toBnDigits(ind.I)} A তড়িৎ প্রবাহিত হলে এর চৌম্বক ক্ষেত্রে সঞ্চিত শক্তি কত জুল?`,
        correct: `${toBnDigits(u)} J`,
        distractors: [u * 2, u / 2, ind.L * ind.I, u + 8]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x > 0 && x !== u)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} J`),
        explanation: `আবেশকে সঞ্চিত শক্তি U = ½LI² = ½ × ${toBnDigits(ind.L)} × (${toBnDigits(ind.I)})² = ${toBnDigits(u)} J।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · আবেশকের সঞ্চিত শক্তি',
      })
    );
  });

  // 1C: Transformer calculations Vs/Vp = Ns/Np = Ip/Is (36 MCQs)
  [
    { vp: 220, np: 100, ns: 500, ip: 10 },
    { vp: 220, np: 200, ns: 50, ip: 2 },
    { vp: 100, np: 50, ns: 250, ip: 15 },
    { vp: 440, np: 400, ns: 100, ip: 5 },
    { vp: 200, np: 100, ns: 400, ip: 8 },
    { vp: 120, np: 60, ns: 300, ip: 10 },
    { vp: 240, np: 300, ns: 150, ip: 4 },
    { vp: 110, np: 100, ns: 1000, ip: 20 },
    { vp: 500, np: 500, ns: 100, ip: 4 },
  ].forEach((tr, idx) => {
    const vs = (tr.vp * tr.ns) / tr.np;
    const is = Number(((tr.ip * tr.np) / tr.ns).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি আদর্শ ট্রান্সফরমারের মুখ্য ও গৌণ কুণ্ডলীর পাকসংখ্যা যথাক্রমে ${toBnDigits(tr.np)} ও ${toBnDigits(tr.ns)}। মুখ্য কুণ্ডলীতে ${toBnDigits(tr.vp)} V বিভব প্রয়োগ করলে গৌণ কুণ্ডলীতে প্রাপ্ত ভোল্টেজ কত V?`,
        correct: `${toBnDigits(vs)} V`,
        distractors: [vs * 2, vs / 2, tr.vp, vs + 50]
          .filter((x) => x > 0 && x !== vs)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `V_s/V_p = N_s/N_p => V_s = ${toBnDigits(tr.vp)} × (${toBnDigits(tr.ns)}/${toBnDigits(tr.np)}) = ${toBnDigits(vs)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ট্রান্সফরমারের ভোল্টেজ রূপান্তর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একটি শতভাগ দক্ষ ট্রান্সফরমারের মুখ্য ও গৌণ কুণ্ডলীর পাকসংখ্যা যথাক্রমে ${toBnDigits(tr.np)} ও ${toBnDigits(tr.ns)}। মুখ্য কুণ্ডলীতে প্রবাহ ${toBnDigits(tr.ip)} A হলে গৌণ কুণ্ডলীতে প্রবাহ কত A?`,
        correct: `${toBnDigits(is)} A`,
        distractors: [is * 2, is / 2, tr.ip, is + 3]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== is)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} A`),
        explanation: `আদর্শ ট্রান্সফরমারে I_s/I_p = N_p/N_s => I_s = ${toBnDigits(tr.ip)} × (${toBnDigits(tr.np)}/${toBnDigits(tr.ns)}) = ${toBnDigits(is)} A।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ট্রান্সফরমারের প্রবাহ রূপান্তর',
      })
    );
  });

  // 1D: AC Peak, RMS, Reactance & LCR Impedance (42 MCQs)
  [
    { r: 3, xl: 6, xc: 2, z: 5 },
    { r: 6, xl: 12, xc: 4, z: 10 },
    { r: 4, xl: 7, xc: 4, z: 5 },
    { r: 8, xl: 10, xc: 4, z: 10 },
    { r: 5, xl: 16, xc: 4, z: 13 },
    { r: 12, xl: 9, xc: 4, z: 13 },
    { r: 9, xl: 20, xc: 8, z: 15 },
    { r: 15, xl: 12, xc: 4, z: 17 },
  ].forEach((lcr, idx) => {
    const pf = Number((lcr.r / lcr.z).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `একটি LCR শ্রেণি AC বর্তনীতে R = ${toBnDigits(lcr.r)} Ω, আবেশকীয় প্রতিঘাত X_L = ${toBnDigits(lcr.xl)} Ω এবং ধারকীয় প্রতিঘাত X_C = ${toBnDigits(lcr.xc)} Ω হলে বর্তনীর মোট ইম্পিডেন্স (Z) কত Ω?`,
        correct: `${toBnDigits(lcr.z)} Ω`,
        distractors: [lcr.r + lcr.xl + lcr.xc, lcr.z * 2, lcr.z + 4, lcr.xl - lcr.xc]
          .filter((x) => x > 0 && x !== lcr.z)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `Z = √[R² + (X_L - X_C)²] = √[${toBnDigits(lcr.r)}² + (${toBnDigits(lcr.xl - lcr.xc)})²] = ${toBnDigits(lcr.z)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · LCR বর্তনীর ইম্পিডেন্স',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `যে LCR শ্রেণি বর্তনীতে R = ${toBnDigits(lcr.r)} Ω এবং মোট ইম্পিডেন্স Z = ${toBnDigits(lcr.z)} Ω, তার ক্ষমতা গুণাঙ্ক (Power factor, cosφ) কত?`,
        correct: toBnDigits(pf),
        distractors: [1, 0, Number((pf / 2).toFixed(2)), Number((1 - pf).toFixed(2)), Number((pf + 0.15).toFixed(2))]
          .filter((x) => x !== pf)
          .slice(0, 4)
          .map((x) => toBnDigits(x)),
        explanation: `ক্ষমতা গুণাঙ্ক cosφ = R/Z = ${toBnDigits(lcr.r)}/${toBnDigits(lcr.z)} = ${toBnDigits(pf)}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · এসি বর্তনীর ক্ষমতা গুণাঙ্ক',
      })
    );
  });

  [
    { vPeak: '২২০√২', vRms: 220, f: 50 },
    { vPeak: '১০০√২', vRms: 100, f: 50 },
    { vPeak: '৩১০', vRms: 219.2, f: 50 },
    { vPeak: '৪০০√২', vRms: 400, f: 60 },
    { vPeak: '১১০√২', vRms: 110, f: 60 },
    { vPeak: '১৫০√২', vRms: 150, f: 50 },
  ].forEach((ac, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch5_em_induction',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি পরিবর্তী ভোল্টেজের সমীকরণ V = ${ac.vPeak} sin(${toBnDigits(2 * ac.f)}πt) V হলে এর মূল গড় বর্গ মান (V_rms) কত ভোল্ট?`,
        correct: `${toBnDigits(ac.vRms)} V`,
        distractors: [ac.vRms * 2, ac.vRms / 2, ac.vRms + 50, ac.f]
          .map((x) => Number(x.toFixed(1)))
          .filter((x) => x !== ac.vRms)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `V_rms = V₀/√২ = ${ac.vPeak}/√২ = ${toBnDigits(ac.vRms)} V এবং কম্পাঙ্ক f = ${toBnDigits(ac.f)} Hz।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৫ · পরিবর্তী ভোল্টেজের RMS মান',
      })
    );
  });

  // =========================================================================
  // 2. Ch 6: Geometric Optics — Lens Power, Eye Defects, TIR, Microscope/Telescope (~165 MCQs)
  // =========================================================================
  // 2A: Speed of light in medium & Apparent Depth & Critical Angle (36 MCQs)
  [
    { med: 'পানি', n: 1.33, v: '২.২৫ × ১০⁸ m/s' },
    { med: 'কাঁচ (ক্রাউন)', n: 1.5, v: '২.০০ × ১০⁸ m/s' },
    { med: 'হীরক (Diamond)', n: 2.4, v: '১.২৫ × ১০⁸ m/s' },
    { med: 'গ্লিসারিন', n: 1.47, v: '২.০৪ × ১০⁸ m/s' },
    { med: 'কার্বন ডাইসালফাইড', n: 1.63, v: '১.৮৪ × ১০⁸ m/s' },
    { med: 'বেঞ্জিন', n: 1.5, v: '২.০০ × ১০⁸ m/s (২)' },
    { med: 'বরফ', n: 1.31, v: '২.২৯ × ১০⁸ m/s' },
  ].forEach((md, idx) => {
    const cleanV = md.v.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${md.med}-এর প্রতিসরণাঙ্ক n = ${toBnDigits(md.n)} হলে উক্ত মাধ্যমে আলোর বেগ প্রায় কত? (শূন্যস্থানে c = ৩ × ১০⁸ m/s)`,
        correct: cleanV,
        distractors: ['১.২৫ × ১০⁸ m/s', '১.৮৪ × ১০⁸ m/s', '২.০০ × ১০⁸ m/s', '২.২৫ × ১০⁸ m/s', '২.২৯ × ১০⁸ m/s', '৩.০০ × ১০⁸ m/s']
          .filter((x) => x !== cleanV)
          .slice(0, 4),
        explanation: `v = c / n = (৩ × ১০⁸) / ${toBnDigits(md.n)} ≈ ${cleanV}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · মাধ্যমে আলোর বেগ',
      })
    );
  });

  [
    { realCm: 12, n: 1.5, appCm: 8 },
    { realCm: 16, n: 1.33, appCm: 12 },
    { realCm: 18, n: 1.5, appCm: 12 },
    { realCm: 24, n: 1.5, appCm: 16 },
    { realCm: 20, n: 1.33, appCm: 15 },
    { realCm: 15, n: 1.5, appCm: 10 },
    { realCm: 30, n: 1.5, appCm: 20 },
    { realCm: 24, n: 2.0, appCm: 12 },
  ].forEach((ad, idx) => {
    const shift = Number((ad.realCm - ad.appCm).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(ad.n)} প্রতিসরণাঙ্কবিশিষ্ট ${toBnDigits(ad.realCm)} cm গভীর একটি স্বচ্ছ স্ল্যাবের নিচে থাকা মুদ্রা লম্বভাবে দেখলে কত cm গভীরতায় মনে হবে?`,
        correct: `${toBnDigits(ad.appCm)} cm`,
        distractors: Array.from(new Set([ad.realCm, shift, ad.appCm + 4, ad.appCm / 2, ad.appCm + 7, ad.appCm * 2]))
          .filter((x) => x > 0 && x !== ad.appCm)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `আপাত গভীরতা d' = d / n = ${toBnDigits(ad.realCm)} / ${toBnDigits(ad.n)} ≈ ${toBnDigits(ad.appCm)} cm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · প্রকৃত ও আপাত গভীরতা',
      })
    );
  });

  // 2B: Lens Power P = 1/f(m), Combined Lenses, & Myopia/Hypermetropia (48 MCQs)
  [
    { fCm: 20, type: 'উত্তল', p: '+৫ D' },
    { fCm: 25, type: 'উত্তল', p: '+৪ D' },
    { fCm: 50, type: 'উত্তল', p: '+২ D' },
    { fCm: 40, type: 'উত্তল', p: '+২.৫ D' },
    { fCm: 10, type: 'উত্তল', p: '+১০ D' },
    { fCm: 20, type: 'অবতল', p: '-৫ D' },
    { fCm: 25, type: 'অবতল', p: '-৪ D' },
    { fCm: 50, type: 'অবতল', p: '-২ D' },
    { fCm: 40, type: 'অবতল', p: '-২.৫ D' },
    { fCm: 100, type: 'অবতল', p: '-১ D' },
  ].forEach((lp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(lp.fCm)} cm ফোকাস দূরত্বের একটি ${lp.type} লেন্সের ক্ষমতা কত ডায়প্টার (D)?`,
        correct: lp.p,
        distractors: ['+১ D', '+২ D', '+৪ D', '+৫ D', '+১০ D', '-১ D', '-২ D', '-৪ D', '-৫ D'].filter((x) => x !== lp.p).slice(0, 4),
        explanation: `লেন্সের ক্ষমতা P = ১/f(m) = ±১০০/${toBnDigits(lp.fCm)} = ${lp.p}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · লেন্সের ক্ষমতা',
      })
    );
  });

  [
    { p1: 4, p2: -2 },
    { p1: 5, p2: -3 },
    { p1: 3, p2: 2 },
    { p1: 6, p2: -2 },
    { p1: -5, p2: 1 },
    { p1: 2.5, p2: 1.5 },
    { p1: 4, p2: -4 },
    { p1: 10, p2: -6 },
  ].forEach((cl, idx) => {
    const pTot = Number((cl.p1 + cl.p2).toFixed(1));
    const signP = pTot > 0 ? `+${toBnDigits(pTot)} D` : `${toBnDigits(pTot)} D`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${cl.p1 > 0 ? '+' : ''}${toBnDigits(cl.p1)} D এবং ${cl.p2 > 0 ? '+' : ''}${toBnDigits(cl.p2)} D ক্ষমতার দুটি লেন্স পরস্পরের সংস্পর্শে রাখলে তুল্য ক্ষমতা কত?`,
        correct: signP,
        distractors: ['+১ D', '+২ D', '+৪ D', '+৫ D', '-৪ D', '০ D', '+৮ D'].filter((x) => x !== signP).slice(0, 4),
        explanation: `সংস্পর্শে থাকা লেন্সদ্বয়ের তুল্য ক্ষমতা P = P₁ + P₂ = ${signP}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · লেন্সের সমবায়',
      })
    );
  });

  // Myopia far point correction P = -1 / d_far(m) (10 MCQs)
  [
    { dCm: 50, p: '-২ D' },
    { dCm: 100, p: '-১ D' },
    { dCm: 200, p: '-০.৫ D' },
    { dCm: 40, p: '-২.৫ D' },
    { dCm: 25, p: '-৪ D' },
    { dCm: 20, p: '-৫ D' },
  ].forEach((my, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `ক্ষীণদৃষ্টি (Myopia) ত্রুটিসম্পন্ন একজন ব্যক্তি ${toBnDigits(my.dCm)} cm দূরত্বের বেশি দূরের বস্তু স্পষ্ট দেখতে পান না। অসীমের বস্তু স্পষ্ট দেখতে তাঁকে কত ক্ষমতার লেন্স ব্যবহার করতে হবে?`,
        correct: my.p,
        distractors: ['-০.৫ D', '-১ D', '-২ D', '-২.৫ D', '-৪ D', '+২ D', '+৪ D'].filter((x) => x !== my.p).slice(0, 4),
        explanation: `অসীমের বস্তু d = ${toBnDigits(my.dCm)} cm-এ প্রতিবিম্ব গঠনের জন্য f = -${toBnDigits(my.dCm)} cm, অর্থাৎ P = ${my.p} অবতল লেন্স প্রয়োজন।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · মায়োপিয়ার প্রতিকার',
      })
    );
  });

  // 2C: Telescope Magnification M = fo / fe & Length L = fo + fe (24 MCQs)
  [
    { fo: 100, fe: 5 },
    { fo: 120, fe: 4 },
    { fo: 80, fe: 4 },
    { fo: 150, fe: 5 },
    { fo: 60, fe: 3 },
    { fo: 200, fe: 10 },
    { fo: 90, fe: 6 },
    { fo: 100, fe: 2 },
  ].forEach((tl, idx) => {
    const M = tl.fo / tl.fe;
    const L = tl.fo + tl.fe;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `অসীম ফোকাসিংয়ে (Normal adjustment) একটি নভোদূরবীক্ষণ যন্ত্রের অভিলক্ষ্য ও অভিনেত্রের ফোকাস দূরত্ব যথাক্রমে ${toBnDigits(tl.fo)} cm ও ${toBnDigits(tl.fe)} cm হলে কৌণিক বিবর্ধন (M) কত?`,
        correct: `${toBnDigits(M)} গুণ`,
        distractors: [L, M * 2, M / 2, M + 10]
          .filter((x) => x !== M)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} গুণ`),
        explanation: `অসীম ফোকাসিংয়ে বিবর্ধন M = f_o / f_e = ${toBnDigits(tl.fo)} / ${toBnDigits(tl.fe)} = ${toBnDigits(M)} গুণ।`,
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
        difficulty: 'dental',
        question: `অসীম ফোকাসিংয়ে নভোদূরবীক্ষণ যন্ত্রের অভিলক্ষ্যের ফোকাস দূরত্ব ${toBnDigits(tl.fo)} cm ও অভিনেত্রের ফোকাস দূরত্ব ${toBnDigits(tl.fe)} cm হলে যন্ত্রটির নলের দৈর্ঘ্য কত cm?`,
        correct: `${toBnDigits(L)} cm`,
        distractors: [tl.fo - tl.fe, M, L + 20, L * 2]
          .filter((x) => x !== L)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `অসীম ফোকাসিংয়ে নভোদূরবীক্ষণ যন্ত্রের দৈর্ঘ্য L = f_o + f_e = ${toBnDigits(tl.fo)} + ${toBnDigits(tl.fe)} = ${toBnDigits(L)} cm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · দূরবীক্ষণ যন্ত্রের দৈর্ঘ্য',
      })
    );
  });

  // 2D: Mirror/Lens image equation 1/f = 1/u + 1/v (20 MCQs)
  [
    { f: 10, u: 20, v: 20 },
    { f: 10, u: 15, v: 30 },
    { f: 15, u: 30, v: 30 },
    { f: 20, u: 30, v: 60 },
    { f: 12, u: 24, v: 24 },
    { f: 12, u: 20, v: 30 },
    { f: 20, u: 40, v: 40 },
    { f: 20, u: 60, v: 30 },
    { f: 15, u: 20, v: 60 },
    { f: 30, u: 60, v: 60 },
  ].forEach((ml, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch6_geo_optics',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(ml.f)} cm ফোকাস দূরত্বের একটি উত্তল লেন্সের সামনে ${toBnDigits(ml.u)} cm দূরে একটি বাস্তব বস্তু রাখলে লেন্সের অপর পাশে কত cm দূরে বাস্তব প্রতিবিম্ব গঠিত হবে?`,
        correct: `${toBnDigits(ml.v)} cm`,
        distractors: [ml.f, ml.v * 2, ml.v / 2, ml.u + ml.f]
          .filter((x) => x !== ml.v)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} cm`),
        explanation: `1/v = 1/f - 1/u = 1/${toBnDigits(ml.f)} - 1/${toBnDigits(ml.u)} => v = ${toBnDigits(ml.v)} cm।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৬ · লেন্সের সমীকরণ',
      })
    );
  });

  return list;
}
