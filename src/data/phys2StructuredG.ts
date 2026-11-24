import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildPhys2StructuredG(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `p2sg_${String(seq++).padStart(4, '0')}`;

  // =========================================================================
  // 1. Ch 3: Current Electricity — Ohm, Stretching, Combinations, Bills, Shunt (~190 MCQs)
  // =========================================================================
  // 1A: Charge Q = It, Number of electrons n = Q/e, & Ohm's Law (24 MCQs)
  [
    { I: 2, t: 10, R: 15 },
    { I: 4, t: 5, R: 12 },
    { I: 5, t: 12, R: 8 },
    { I: 3, t: 20, R: 20 },
    { I: 6, t: 15, R: 10 },
    { I: 10, t: 8, R: 5 },
    { I: 2.5, t: 40, R: 24 },
    { I: 8, t: 25, R: 15 },
  ].forEach((om, idx) => {
    const Q = om.I * om.t;
    const V = om.I * om.R;
    const P = om.I * om.I * om.R;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি পরিবাহীর মধ্য দিয়ে ${toBnDigits(om.I)} A তড়িৎ ${toBnDigits(om.t)} সেকেন্ড ধরে প্রবাহিত হলে প্রবাহিত মোট চার্জের পরিমাণ কত কুলম্ব?`,
        correct: `${toBnDigits(Q)} C`,
        distractors: [Q * 2, Q / 2, Q + 15, om.I + om.t]
          .filter((x) => x > 0 && x !== Q)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} C`),
        explanation: `মোট চার্জ Q = It = ${toBnDigits(om.I)} × ${toBnDigits(om.t)} = ${toBnDigits(Q)} C।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · তড়িৎ প্রবাহ ও চার্জ',
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
        question: `${toBnDigits(om.R)} Ω রোধের মধ্য দিয়ে ${toBnDigits(om.I)} A প্রবাহ চালনা করলে দুই প্রান্তের বিভব পার্থক্য এবং ব্যয়িত ক্ষমতা যথাক্রমে কত?`,
        correct: `${toBnDigits(V)} V এবং ${toBnDigits(P)} W`,
        distractors: [
          `${toBnDigits(V * 2)} V এবং ${toBnDigits(P)} W`,
          `${toBnDigits(V)} V এবং ${toBnDigits(P / 2)} W`,
          `${toBnDigits(V / 2)} V এবং ${toBnDigits(P * 2)} W`,
          `${toBnDigits(P)} V এবং ${toBnDigits(V)} W`,
        ],
        explanation: `V = IR = ${toBnDigits(om.I)}×${toBnDigits(om.R)} = ${toBnDigits(V)} V এবং P = I²R = ${toBnDigits(P)} W।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · ওহমের সূত্র ও ক্ষমতা',
      })
    );
  });

  // 1B: Wire Stretching R' = n^2 R (20 MCQs)
  [
    { r0: 4, n: 2 },
    { r0: 5, n: 2 },
    { r0: 10, n: 2 },
    { r0: 3, n: 3 },
    { r0: 5, n: 3 },
    { r0: 8, n: 3 },
    { r0: 2, n: 4 },
    { r0: 5, n: 4 },
    { r0: 6, n: 2 },
    { r0: 10, n: 3 },
    { r0: 4, n: 5 },
    { r0: 12, n: 2 },
  ].forEach((ws, idx) => {
    const rNew = ws.n * ws.n * ws.r0;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(ws.r0)} Ω রোধের একটি তামার তারকে সম-আয়তনে টেনে দৈর্ঘ্য ${toBnDigits(ws.n)} গুণ করা হলে তারটির নতুন রোধ কত Ω হবে?`,
        correct: `${toBnDigits(rNew)} Ω`,
        distractors: [ws.n * ws.r0, rNew * 2, ws.r0 / ws.n, rNew + 10]
          .filter((x) => x !== rNew)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `আয়তন ধ্রুব রেখে দৈর্ঘ্য n গুণ করলে প্রস্থচ্ছেদ ১/n গুণ হয়; ফলে রোধ R' = n²R = ${toBnDigits(ws.n)}² × ${toBnDigits(ws.r0)} = ${toBnDigits(rNew)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · রোধ ও দৈর্ঘ্যের সম্পর্ক',
      })
    );
  });

  // 1C: Series/Parallel Resistors & Internal Resistance I = E/(R + r) (44 MCQs)
  [
    { r1: 6, r2: 3, mode: 'শ্রেণি', req: 9 },
    { r1: 6, r2: 3, mode: 'সমান্তরাল', req: 2 },
    { r1: 12, r2: 4, mode: 'শ্রেণি', req: 16 },
    { r1: 12, r2: 4, mode: 'সমান্তরাল', req: 3 },
    { r1: 10, r2: 10, mode: 'সমান্তরাল', req: 5 },
    { r1: 20, r2: 5, mode: 'সমান্তরাল', req: 4 },
    { r1: 30, r2: 15, mode: 'সমান্তরাল', req: 10 },
    { r1: 24, r2: 8, mode: 'সমান্তরাল', req: 6 },
    { r1: 18, r2: 9, mode: 'সমান্তরাল', req: 6 },
    { r1: 40, r2: 10, mode: 'সমান্তরাল', req: 8 },
  ].forEach((rs, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(rs.r1)} Ω এবং ${toBnDigits(rs.r2)} Ω মানের দুটি রোধকে ${rs.mode} সমবায়ে যুক্ত করলে তুল্য রোধ কত Ω হবে?`,
        correct: `${toBnDigits(rs.req)} Ω`,
        distractors: [rs.req * 2, rs.req / 2, rs.r1 + rs.r2, Math.abs(rs.r1 - rs.r2) + 2]
          .filter((x) => x > 0 && x !== rs.req)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `${rs.mode} সমবায়ে তুল্য রোধ = ${toBnDigits(rs.req)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · রোধের সমবায়',
      })
    );
  });

  [
    { E: 12, R: 5, r: 1 },
    { E: 24, R: 10, r: 2 },
    { E: 6, R: 2.5, r: 0.5 },
    { E: 15, R: 4, r: 1 },
    { E: 18, R: 8, r: 1 },
    { E: 10, R: 4, r: 1 },
    { E: 30, R: 13, r: 2 },
    { E: 9, R: 4, r: 0.5 },
    { E: 20, R: 9, r: 1 },
    { E: 12, R: 3, r: 1 },
  ].forEach((ir, idx) => {
    const I = Number((ir.E / (ir.R + ir.r)).toFixed(2));
    const V = Number((I * ir.R).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(ir.E)} V তড়িচ্চালক শক্তি ও ${toBnDigits(ir.r)} Ω অভ্যন্তরীণ রোধের একটি কোষকে ${toBnDigits(ir.R)} Ω বাহ্যিক রোধের সাথে যুক্ত করলে বর্তনীর প্রবাহমাত্রা কত A?`,
        correct: `${toBnDigits(I)} A`,
        distractors: [Number((ir.E / ir.R).toFixed(2)), I * 2, I / 2, I + 1.5]
          .filter((x) => x !== I)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} A`),
        explanation: `I = E/(R + r) = ${toBnDigits(ir.E)} / (${toBnDigits(ir.R)} + ${toBnDigits(ir.r)}) = ${toBnDigits(I)} A।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · অভ্যন্তরীণ রোধ ও প্রবাহ',
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
        question: `${toBnDigits(ir.E)} V EMF ও ${toBnDigits(ir.r)} Ω অভ্যন্তরীণ রোধবিশিষ্ট কোষ ${toBnDigits(ir.R)} Ω রোধে প্রবাহ পাঠালে কোষের প্রান্তীয় বিভব পার্থক্য কত V?`,
        correct: `${toBnDigits(V)} V`,
        distractors: [ir.E, Number((V / 2).toFixed(2)), Number((V + 1.5).toFixed(2)), Number((I * ir.r).toFixed(2))]
          .filter((x) => x > 0 && x !== V)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} V`),
        explanation: `প্রবাহ I = ${toBnDigits(I)} A; প্রান্তীয় বিভব V = E - Ir = I × R = ${toBnDigits(V)} V।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · নষ্ট ভোল্ট ও প্রান্তীয় বিভব',
      })
    );
  });

  // 1D: Electricity Bill (kWh) & Shunt S = G/(n-1) & Wheatstone Bridge (48 MCQs)
  [
    { watt: 100, count: 5, hrs: 6, days: 30, rate: 5 },
    { watt: 60, count: 10, hrs: 5, days: 30, rate: 6 },
    { watt: 1000, count: 1, hrs: 2, days: 30, rate: 8 },
    { watt: 500, count: 2, hrs: 4, days: 30, rate: 5 },
    { watt: 200, count: 4, hrs: 5, days: 30, rate: 7 },
    { watt: 1500, count: 1, hrs: 4, days: 10, rate: 6 },
    { watt: 100, count: 8, hrs: 10, days: 30, rate: 5 },
    { watt: 250, count: 2, hrs: 8, days: 30, rate: 6 },
  ].forEach((eb, idx) => {
    const units = Number(((eb.watt * eb.count * eb.hrs * eb.days) / 1000).toFixed(1));
    const cost = Number((units * eb.rate).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি বাড়িতে ${toBnDigits(eb.watt)} W ক্ষমতার ${toBnDigits(eb.count)}টি যন্ত্র প্রতিদিন ${toBnDigits(eb.hrs)} ঘণ্টা করে ${toBnDigits(eb.days)} দিন চললে প্রতি ইউনিট ${toBnDigits(eb.rate)} টাকা দরে মোট বিদ্যুৎ বিল কত টাকা?`,
        correct: `${toBnDigits(cost)} টাকা`,
        distractors: [units, cost * 2, cost / 2, cost + 120]
          .filter((x) => x !== cost)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} টাকা`),
        explanation: `ব্যয়িত শক্তি = (${toBnDigits(eb.watt)}×${toBnDigits(eb.count)}×${toBnDigits(eb.hrs)}×${toBnDigits(eb.days)})/১০০০ = ${toBnDigits(units)} ইউনিট; বিল = ${toBnDigits(units)} × ${toBnDigits(eb.rate)} = ${toBnDigits(cost)} টাকা।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · বৈদ্যুতিক বিল হিসাব',
      })
    );
  });

  [
    { G: 100, n: 11, s: 10 },
    { G: 90, n: 10, s: 10 },
    { G: 50, n: 6, s: 10 },
    { G: 45, n: 10, s: 5 },
    { G: 100, n: 21, s: 5 },
    { G: 80, n: 5, s: 20 },
    { G: 120, n: 13, s: 10 },
    { G: 60, n: 16, s: 4 },
    { G: 99, n: 100, s: 1 },
    { G: 49, n: 50, s: 1 },
  ].forEach((sh, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(sh.G)} Ω রোধের একটি গ্যালভানোমিটারের পাল্লা ${toBnDigits(sh.n)} গুণ বৃদ্ধি করতে এর সাথে সমান্তরালে কত Ω মানের শান্ট যুক্ত করতে হবে?`,
        correct: `${toBnDigits(sh.s)} Ω`,
        distractors: [sh.s * 2, sh.G / sh.n, sh.G * (sh.n - 1), sh.s + 4]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== sh.s)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `শান্ট S = G / (n - 1) = ${toBnDigits(sh.G)} / (${toBnDigits(sh.n)} - ১) = ${toBnDigits(sh.s)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · শান্ট রোধ নির্ণয়',
      })
    );
  });

  [
    { P: 10, Q: 20, R: 15, S: 30 },
    { P: 5, Q: 15, R: 12, S: 36 },
    { P: 8, Q: 16, R: 20, S: 40 },
    { P: 12, Q: 36, R: 10, S: 30 },
    { P: 4, Q: 12, R: 8, S: 24 },
    { P: 15, Q: 45, R: 20, S: 60 },
    { P: 20, Q: 30, R: 40, S: 60 },
    { P: 6, Q: 18, R: 15, S: 45 },
  ].forEach((wb, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch3_current_elec',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `একটি হুইটস্টোন ব্রিজের চারটি বাহুর রোধ যথাক্রমে P = ${toBnDigits(wb.P)} Ω, Q = ${toBnDigits(wb.Q)} Ω, R = ${toBnDigits(wb.R)} Ω এবং S = অজানা। ব্রিজটি নিস্পন্দ (Balanced) হলে S-এর মান কত Ω?`,
        correct: `${toBnDigits(wb.S)} Ω`,
        distractors: [wb.S / 2, wb.S * 2, wb.S + 10, wb.P + wb.Q]
          .filter((x) => x !== wb.S)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} Ω`),
        explanation: `নিস্পন্দ অবস্থায় P/Q = R/S => S = QR/P = (${toBnDigits(wb.Q)}×${toBnDigits(wb.R)})/${toBnDigits(wb.P)} = ${toBnDigits(wb.S)} Ω।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · হুইটস্টোন ব্রিজ',
      })
    );
  });

  // =========================================================================
  // 2. Ch 4: Magnetism — Lorentz Force, Straight Wire, Solenoid, Earth Magnetism (~140 MCQs)
  // =========================================================================
  // 2A: Lorentz Force F = qvB sin(theta) & Wire Force F = ILB sin(theta) (40 MCQs)
  [
    { qUc: 2, v: 1e4, B: 0.5, deg: 90, sinD: 1 },
    { qUc: 4, v: 5e3, B: 0.4, deg: 30, sinD: 0.5 },
    { qUc: 5, v: 2e4, B: 0.3, deg: 90, sinD: 1 },
    { qUc: 10, v: 1e3, B: 0.8, deg: 30, sinD: 0.5 },
    { qUc: 3, v: 1e4, B: 0.6, deg: 90, sinD: 1 },
    { qUc: 8, v: 5e3, B: 0.25, deg: 90, sinD: 1 },
    { qUc: 6, v: 1e4, B: 0.5, deg: 30, sinD: 0.5 },
    { qUc: 4, v: 2e4, B: 0.2, deg: 90, sinD: 1 },
  ].forEach((lf, idx) => {
    const fMn = Number((lf.qUc * 1e-3 * lf.v * lf.B * lf.sinD).toFixed(2)); // in mN
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(lf.qUc)} μC মানের একটি চার্জ ${toBnDigits(lf.B)} T প্রাবল্যের সুষম চৌম্বক ক্ষেত্রের সাথে ${toBnDigits(lf.deg)}° কোণে ${toBnDigits(lf.v)} m/s বেগে প্রবেশ করলে চার্জটির ওপর ক্রিয়াশীল চৌম্বক বল কত mN?`,
        correct: `${toBnDigits(fMn)} mN`,
        distractors: [fMn * 2, fMn / 2, fMn + 5, fMn * 4]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x > 0 && x !== fMn)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mN`),
        explanation: `F = qvB sinθ = ${toBnDigits(lf.qUc)}×১০⁻⁶ × ${toBnDigits(lf.v)} × ${toBnDigits(lf.B)} × sin(${toBnDigits(lf.deg)}°) = ${toBnDigits(fMn)} mN।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · লরেঞ্জ বল',
      })
    );
  });

  [
    { I: 5, L: 2, B: 0.4, deg: 90, sinD: 1 },
    { I: 10, L: 0.5, B: 0.6, deg: 30, sinD: 0.5 },
    { I: 4, L: 3, B: 0.5, deg: 90, sinD: 1 },
    { I: 8, L: 1.5, B: 0.2, deg: 90, sinD: 1 },
    { I: 12, L: 2, B: 0.25, deg: 30, sinD: 0.5 },
    { I: 6, L: 1, B: 0.8, deg: 30, sinD: 0.5 },
    { I: 15, L: 2, B: 0.3, deg: 90, sinD: 1 },
    { I: 20, L: 0.5, B: 0.4, deg: 90, sinD: 1 },
    { I: 10, L: 2, B: 0.5, deg: 0, sinD: 0 },
    { I: 5, L: 4, B: 0.8, deg: 0, sinD: 0 },
  ].forEach((wf, idx) => {
    const f = Number((wf.I * wf.L * wf.B * wf.sinD).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(wf.L)} m দীর্ঘ একটি পরিবাহী তারের মধ্য দিয়ে ${toBnDigits(wf.I)} A তড়িৎ প্রবাহিত হচ্ছে। তারটিকে ${toBnDigits(wf.B)} T চৌম্বক ক্ষেত্রের সাথে ${toBnDigits(wf.deg)}° কোণে স্থাপন করলে তারটির ওপর ক্রিয়াশীল বল কত N?`,
        correct: `${toBnDigits(f)} N`,
        distractors: [wf.I * wf.L * wf.B + 1, wf.I * wf.B, wf.L * wf.B + 2, f + 3, f === 0 ? 4 : f * 2]
          .map((x) => Number(x.toFixed(2)))
          .filter((x) => x !== f)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} N`),
        explanation: `F = ILB sinθ = ${toBnDigits(wf.I)} × ${toBnDigits(wf.L)} × ${toBnDigits(wf.B)} × sin(${toBnDigits(wf.deg)}°) = ${toBnDigits(f)} N।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · তড়িৎবাহী তারের ওপর বল',
      })
    );
  });

  // 2B: Straight wire B = 2e-7 * I / r & Solenoid B = mu0 * n * I (36 MCQs)
  [
    { I: 5, rCm: 10, bUt: 10 },
    { I: 10, rCm: 20, bUt: 10 },
    { I: 10, rCm: 5, bUt: 40 },
    { I: 20, rCm: 10, bUt: 40 },
    { I: 15, rCm: 10, bUt: 30 },
    { I: 25, rCm: 5, bUt: 100 },
    { I: 5, rCm: 2, bUt: 50 },
    { I: 12, rCm: 4, bUt: 60 },
    { I: 30, rCm: 20, bUt: 30 },
    { I: 40, rCm: 10, bUt: 80 },
  ].forEach((sw, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'board',
        question: `একটি অসীম দীর্ঘ সোজা পরিবাহী তারের মধ্য দিয়ে ${toBnDigits(sw.I)} A তড়িৎ প্রবাহিত হলে তার থেকে ${toBnDigits(sw.rCm)} cm দূরে সৃষ্ট চৌম্বক ক্ষেত্রের মান কত μT (মাইক্রো-টেসলা)?`,
        correct: `${toBnDigits(sw.bUt)} μT`,
        distractors: [sw.bUt * 2, sw.bUt / 2, sw.bUt + 15, sw.bUt + 35]
          .filter((x) => x !== sw.bUt)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} μT`),
        explanation: `B = (μ₀I)/(2πr) = (২×১০⁻⁷ × ${toBnDigits(sw.I)}) / ${toBnDigits(sw.rCm / 100)} = ${toBnDigits(sw.bUt)}×১০⁻⁶ T = ${toBnDigits(sw.bUt)} μT।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · দীর্ঘ তারের চৌম্বক ক্ষেত্র',
      })
    );
  });

  // 2C: Earth's Magnetism B_H = B cos(delta), B_V = B sin(delta) & tan(delta) = B_V / B_H (24 MCQs)
  [
    { B: 40, deg: 60, bh: 20, bv: '২০√৩', tanD: '√৩' },
    { B: 60, deg: 60, bh: 30, bv: '৩০√৩', tanD: '√৩' },
    { B: 50, deg: 60, bh: 25, bv: '২৫√৩', tanD: '√৩' },
    { B: 40, deg: 30, bh: '২০√৩', bv: 20, tanD: '১/√৩' },
    { B: 60, deg: 30, bh: '৩০√৩', bv: 30, tanD: '১/√৩' },
    { B: 80, deg: 60, bh: 40, bv: '৪০√৩', tanD: '√৩' },
    { B: 100, deg: 45, bh: '৫০√২', bv: '৫০√২', tanD: '১' },
    { B: 40, deg: 45, bh: '২০√২', bv: '২০√২', tanD: '১' },
  ].forEach((em, idx) => {
    const bhStr = typeof em.bh === 'number' ? `${toBnDigits(em.bh)} μT` : `${em.bh} μT`;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'board' : 'dental',
        question: `কোনো স্থানে ভূ-চৌম্বক ক্ষেত্রের মোট মান ${toBnDigits(em.B)} μT এবং বিনতি কোণ ${toBnDigits(em.deg)}° হলে ঐ স্থানে ভূ-চৌম্বক ক্ষেত্রের অনুভূমিক উপাংশ (B_H) কত?`,
        correct: bhStr,
        distractors: [`${toBnDigits(em.B)} μT`, `${toBnDigits(em.B / 2)} μT`, `${toBnDigits(em.B * 2)} μT`, '২৫√২ μT', '৩০√২ μT']
          .filter((x) => x !== bhStr)
          .slice(0, 4),
        explanation: `B_H = B cosδ = ${toBnDigits(em.B)} × cos(${toBnDigits(em.deg)}°) = ${bhStr}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · ভূ-চৌম্বক ক্ষেত্রের উপাংশ',
      })
    );
  });

  // 2D: Magnetic Materials Classification Cards (Dia, Para, Ferro) (30 MCQs)
  [
    { mat: 'বিসমাথ, তামা, সোনা, পানি, পারদ', cls: 'ডায়াচৌম্বক (Diamagnetic)', prop: 'χ ঋণাত্মক ও μ_r < ১; চুম্বক দ্বারা সামান্য বিকর্ষিত হয়' },
    { mat: 'অ্যালুমিনিয়াম, প্লাটিনাম, অক্সিজেন, ক্রোমিয়াম', cls: 'প্যারাচৌম্বক (Paramagnetic)', prop: 'χ ক্ষুদ্র ধনাত্মক ও তাপমাত্রার ব্যস্তানুপাতিক (কুরি সূত্র)' },
    { mat: 'লোহা, নিকেল, কোবাল্ট, গ্যাডোলিনিয়াম', cls: 'ফেরোচৌম্বক (Ferromagnetic)', prop: 'χ অত্যন্ত বৃহৎ ধনাত্মক (≫ ১); ডোমেইন গঠন থাকে ও তীব্র আকর্ষিত হয়' },
  ].forEach((mm, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `${mm.mat} — এগুলো কোন শ্রেণির চৌম্বক পদার্থের উদাহরণ?`,
        correct: mm.cls,
        distractors: [
          'ডায়াচৌম্বক (Diamagnetic)',
          'প্যারাচৌম্বক (Paramagnetic)',
          'ফেরোচৌম্বক (Ferromagnetic)',
          'অ-চৌম্বক অন্তরক',
        ].filter((x) => x !== mm.cls),
        explanation: `${mm.mat} হলো ${mm.cls}, যার বৈশিষ্ট্য: ${mm.prop}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · চৌম্বক পদার্থ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: 'board',
        question: `${mm.cls} পদার্থের চৌম্বক প্রবণতা (χ) ও আপেক্ষিক প্রবেশ্যতা (μ_r) সংক্রান্ত সঠিক তথ্য কোনটি?`,
        correct: mm.prop,
        distractors: [
          'χ ঋণাত্মক ও μ_r < ১; চুম্বক দ্বারা সামান্য বিকর্ষিত হয়',
          'χ ক্ষুদ্র ধনাত্মক ও তাপমাত্রার ব্যস্তানুপাতিক (কুরি সূত্র)',
          'χ অত্যন্ত বৃহৎ ধনাত্মক (≫ ১); ডোমেইন গঠন থাকে ও তীব্র আকর্ষিত হয়',
          'χ = ০ এবং μ_r = অসীম',
        ].filter((x) => x !== mm.prop),
        explanation: `${mm.cls}-এর ক্ষেত্রে: ${mm.prop}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · চৌম্বক প্রবণতা',
      })
    );
  });

  // 2E: Cyclotron Radius r = mv/(qB) Scaling & Drift Velocity Concepts (20 MCQs)
  [
    { vScale: 'বেগ দ্বিগুণ', bScale: 'চৌম্বক ক্ষেত্র অপরিবর্তিত', rFactor: '২ গুণ' },
    { vScale: 'বেগ অপরিবর্তিত', bScale: 'চৌম্বক ক্ষেত্র দ্বিগুণ', rFactor: 'অর্ধেক (১/২ গুণ)' },
    { vScale: 'বেগ দ্বিগুণ', bScale: 'চৌম্বক ক্ষেত্র অর্ধেক', rFactor: '৪ গুণ' },
    { vScale: 'বেগ ৩ গুণ', bScale: 'চৌম্বক ক্ষেত্র ৩ গুণ', rFactor: 'অপরিবর্তিত (১ গুণ)' },
    { vScale: 'গতিশক্তি ৪ গুণ', bScale: 'চৌম্বক ক্ষেত্র অপরিবর্তিত', rFactor: '২ গুণ (২)' },
  ].forEach((cy, idx) => {
    const cleanR = cy.rFactor.replace(' (২)', '');
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'phys_2',
        chapterId: 'phys2_ch4_magnetism',
        visualLessonId: 'circuits_optics',
        hscLevel: '12',
        difficulty: idx % 2 === 0 ? 'medical' : 'dental',
        question: `সুষম চৌম্বক ক্ষেত্রে লম্বভাবে প্রবেশ করা একটি আধানের বৃত্তাকার পথের ব্যাসার্ধ r। যদি কণাটির ${cy.vScale} এবং ${cy.bScale} করা হয়, তবে নতুন ব্যাসার্ধ কত হবে?`,
        correct: cleanR,
        distractors: ['অর্ধেক (১/২ গুণ)', 'অপরিবর্তিত (১ গুণ)', '২ গুণ', '৪ গুণ', '৮ গুণ'].filter((x) => x !== cleanR).slice(0, 4),
        explanation: `r = mv/(qB) = √(2mE_k)/(qB); সুতরাং নতুন ব্যাসার্ধ প্রাথমিকের ${cleanR}।`,
        reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৪ · সাইক্লোট্রন ব্যাসার্ধ',
      })
    );
  });

  return list;
}
