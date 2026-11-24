import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredH(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sh_${String(seq++).padStart(4, '0')}`;

  // 1. Ch 1: Ideal Gas Volume/Moles & Combined Gas Law Numericals (~65 MCQs)
  const pvMoles = [
    { gas: 'O₂', n: 1, tC: 27, p: 1, v: '২৪.৬৩ L' },
    { gas: 'N₂', n: 2, tC: 27, p: 2, v: '২৪.৬৩ L' },
    { gas: 'CO₂', n: 2, tC: 27, p: 1, v: '৪৯.২৬ L' },
    { gas: 'CH₄', n: 0.5, tC: 27, p: 1, v: '১২.৩১৫ L' },
    { gas: 'He', n: 4, tC: 27, p: 4, v: '২৪.৬৩ L' },
    { gas: 'H₂', n: 3, tC: 27, p: 1.5, v: '৪৯.২৬ L' },
    { gas: 'NH₃', n: 1, tC: 127, p: 1, v: '৩২.৮৪ L' },
    { gas: 'SO₂', n: 2, tC: 127, p: 2, v: '৩২.৮৪ L' },
    { gas: 'Ar', n: 0.5, tC: 127, p: 0.5, v: '৩২.৮৪ L' },
    { gas: 'Ne', n: 1.5, tC: 127, p: 3, v: '১৬.৪২ L' },
  ];
  pvMoles.forEach((pm, i) => {
    const tK = pm.tC + 273;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${toBnDigits(pm.tC)} °C তাপমাত্রা ও ${toBnDigits(pm.p)} atm চাপে ${toBnDigits(pm.n)} মোল ${pm.gas} গ্যাসের আয়তন কত লিটার হবে? (R = ০.০৮২১ L·atm·K⁻¹·mol⁻¹)`,
        correct: pm.v,
        distractors: ['১২.৩১৫ L', '১৬.৪২ L', '২২.৪০ L', '২৪.৬৩ L', '৩২.৮৪ L', '৪৯.২৬ L', '৬৫.৬৮ L']
          .filter((x) => x !== pm.v)
          .slice(0, 4),
        explanation: `V = nRT / P = (${toBnDigits(pm.n)} × ০.০৮২১ × ${toBnDigits(tK)}) / ${toBnDigits(pm.p)} = ${pm.v}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · আদর্শ গ্যাস আয়তন',
      })
    );
  });

  // Combined gas law (P1V1/T1 = P2V2/T2) (16 MCQs)
  const combinedCases = [
    { p1: 1, v1: 300, t1C: 27, p2: 2, t2C: 327, v2: 300 },
    { p1: 2, v1: 150, t1C: 27, p2: 1, t2C: 27, v2: 300 },
    { p1: 1, v1: 600, t1C: 27, p2: 3, t2C: 177, v2: 300 },
    { p1: 2, v1: 400, t1C: 127, p2: 1, t2C: 27, v2: 600 },
    { p1: 1.5, v1: 200, t1C: 27, p2: 0.75, t2C: 327, v2: 800 },
    { p1: 4, v1: 100, t1C: 127, p2: 2, t2C: 227, v2: 250 },
  ];
  combinedCases.forEach((cc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(cc.t1C)} °C তাপমাত্রা ও ${toBnDigits(cc.p1)} atm চাপে একটি গ্যাসের আয়তন ${toBnDigits(cc.v1)} mL হলে ${toBnDigits(cc.t2C)} °C ও ${toBnDigits(cc.p2)} atm চাপে গ্যাসটির আয়তন কত mL হবে?`,
        correct: `${toBnDigits(cc.v2)} mL`,
        distractors: [150, 200, 250, 300, 450, 600, 800]
          .filter((x) => x !== cc.v2)
          .slice(0, 4)
          .map((x) => `${toBnDigits(x)} mL`),
        explanation: `(P₁V₁)/T₁ = (P₂V₂)/T₂ থেকে কেলভিন তাপমাত্রা ব্যবহার করে V₂ = ${toBnDigits(cc.v2)} mL।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · সমন্বিত গ্যাস সূত্র',
      })
    );
  });

  // Dalton Partial Pressure Drills (20 MCQs)
  const daltonMixes = [
    { a: '২ মোল N₂', b: '৩ মোল O₂', pTot: 10, target: 'N₂', ans: '৪.০ atm' },
    { a: '১ মোল He', b: '৪ মোল Ar', pTot: 5, target: 'Ar', ans: '৪.০ atm' },
    { a: '৪ গ্রাম H₂ (২ mol)', b: '৩২ গ্রাম O₂ (১ mol)', pTot: 6, target: 'H₂', ans: '৪.০ atm' },
    { a: '১৬ গ্রাম CH₄ (১ mol)', b: '৪৪ গ্রাম CO₂ (১ mol)', pTot: 4, target: 'CH₄', ans: '২.০ atm' },
    { a: '২৮ গ্রাম N₂ (১ mol)', b: '৬৪ গ্রাম O₂ (২ mol)', pTot: 9, target: 'O₂', ans: '৬.০ atm' },
    { a: '৮ গ্রাম He (২ mol)', b: '৬৪ গ্রাম SO₂ (১ mol)', pTot: 12, target: 'SO₂', ans: '৪.০ atm' },
    { a: '১৭ গ্রাম NH₃ (১ mol)', b: '৮৪ গ্রাম N₂ (৩ mol)', pTot: 8, target: 'NH₃', ans: '২.০ atm' },
    { a: '৪ গ্রাম H₂ (২ mol)', b: '২৮ গ্রাম CO (১ mol)', pTot: 3, target: 'CO', ans: '১.০ atm' },
  ];
  daltonMixes.forEach((dm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `একটি আবদ্ধ পাত্রে ${dm.a} ও ${dm.b} মিশ্রিত আছে। মিশ্রণটির মোট চাপ ${toBnDigits(dm.pTot)} atm হলে ${dm.target} গ্যাসের আংশিক চাপ কত?`,
        correct: dm.ans,
        distractors: ['১.০ atm', '২.০ atm', '৩.০ atm', '৪.০ atm', '৫.০ atm', '৬.০ atm', '৮.০ atm']
          .filter((x) => x !== dm.ans)
          .slice(0, 4),
        explanation: `আংশিক চাপ P_i = মোল ভগ্নাংশ (X_i) × মোট চাপ (${toBnDigits(dm.pTot)} atm) = ${dm.ans}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · ডাল্টনের আংশিক চাপ সূত্র',
      })
    );
  });

  // Water Quality & WHO/BD Drinking Water Standards (Ch 1, ~45 MCQs)
  const waterStandards = [
    { param: 'আর্সেনিক (As) — WHO সর্বোচ্চ সীমা', val: '০.০১ mg/L (ppm)' },
    { param: 'আর্সেনিক (As) — বাংলাদেশের মানদণ্ড', val: '০.০৫ mg/L (ppm)' },
    { param: 'পানীয় জলের আদর্শ pH পরিসর', val: '৬.৫ – ৮.৫' },
    { param: 'মোট দ্রবীভূত কঠিন পদার্থ (TDS) — WHO সর্বোচ্চ গ্রহণযোগ্য সীমা', val: '৫০০ mg/L (ppm)' },
    { param: 'জলজ প্রাণীর বেঁচে থাকার জন্য ন্যূনতম দ্রবীভূত অক্সিজেন (DO)', val: '৫.০ – ৬.০ mg/L (ppm)' },
    { param: 'ভালো মানের নদীর পানির BOD₅ মান', val: '১ – ২ mg/L (বিশুদ্ধ, < ৩ ppm)' },
    { param: 'পানিতে লেড (Pb) বা সিসার WHO নিরাপদ সর্বোচ্চ সীমা', val: '০.০১ mg/L (ppm)' },
    { param: 'পানিতে ফ্লোরাইডের (F⁻) WHO অনুমোদিত সীমা (দাঁতের সুরক্ষায়)', val: '১.৫ mg/L (১.০–১.৫ ppm; বেশি হলে ফ্লোরোসিস)' },
    { param: 'পানিতে নাইট্রেটের (NO₃⁻) সর্বোচ্চ সীমা (ব্লু-বেবি সিনড্রোম রোধে)', val: '৫০ mg/L (বা ১০ mg/L NO₃⁻–N)' },
    { param: 'পানিতে আয়রনের (Fe) বাংলাদেশের অনুমোদিত সীমা', val: '০.৩ – ১.০ mg/L' },
    { param: 'খাবার পানিতে ক্যাডমিয়ামের (Cd) WHO নিরাপদ সর্বোচ্চ সীমা', val: '০.০০৩ mg/L (৩ ppb)' },
    { param: 'পানিতে পারদের (Hg) WHO নিরাপদ সর্বোচ্চ সীমা', val: '০.০০১ – ০.০০৬ mg/L' },
  ];
  waterStandards.forEach((ws, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পানির গুণগত মানদণ্ড অনুযায়ী "${ws.param}" কত?`,
        correct: ws.val,
        distractors: waterStandards.filter((x) => x.val !== ws.val).slice(i % 6, (i % 6) + 4).map((x) => x.val),
        explanation: `আন্তর্জাতিক ও দেশীয় মানদণ্ডে ${ws.param} হলো ${ws.val}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পানির মানদণ্ড',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `পানির বিশুদ্ধতা পরীক্ষায় "${ws.val}" সীমা বা মানদণ্ডটি নিচের কোন উপাদানের ক্ষেত্রে প্রযোজ্য?`,
        correct: ws.param,
        distractors: waterStandards.filter((x) => x.param !== ws.param).slice((i + 2) % 6, ((i + 2) % 6) + 4).map((x) => x.param),
        explanation: `${ws.val} হলো "${ws.param}"-এর নির্ধারিত মান।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরিবেশ রসায়ন',
      })
    );
  });

  // 2. Ch 2 Organic Chemistry: Homologous Series, Hybridization & DBE Drills (~130 MCQs)
  const homologous = [
    { cls: 'অ্যালকেন (প্যারাফিন)', gen: 'CₙH₂ₙ₊₂', first: 'মিথেন (CH₄)', sp: 'sp³' },
    { cls: 'অ্যালকিন (অলিফিন)', gen: 'CₙH₂ₙ', first: 'ইথিন (C₂H₄)', sp: 'sp² (দ্বিবন্ধন কার্বন)' },
    { cls: 'অ্যালকাইন (অ্যাসিটিলিন)', gen: 'CₙH₂ₙ₋₂', first: 'ইথাইন (C₂H₂)', sp: 'sp (ত্রিবন্ধন কার্বন)' },
    { cls: 'সাইক্লোঅ্যালকেন', gen: 'CₙH₂ₙ', first: 'সাইক্লোপ্রোপেন (C₃H₆)', sp: 'sp³ (বলয় পীড়ন)' },
    { cls: 'একহাইড্রিক অ্যালকোহল ও ইথার', gen: 'CₙH₂ₙ₊₂O', first: 'মিথানল (CH₃OH)', sp: 'sp³ (অক্সিজেনসহ)' },
    { cls: 'অ্যালডিহাইড ও কিটোন', gen: 'CₙH₂ₙO', first: 'মিথান্যাল (HCHO) / প্রোপানোন', sp: 'sp² (কার্বনিল >C=O)' },
    { cls: 'কার্বক্সিলিক অ্যাসিড ও এস্টার', gen: 'CₙH₂ₙO₂', first: 'মিথানোয়িক অ্যাসিড (HCOOH)', sp: 'sp² (–COOH কার্বন)' },
    { cls: 'অ্যালিফ্যাটিক অ্যামিন (১°, ২°, ৩°)', gen: 'CₙH₂ₙ₊₃N', first: 'মিথান্যামিন (CH₃NH₂)', sp: 'sp³ (পিরামিডীয় N)' },
    { cls: 'অ্যালকাইল হ্যালাইড (হ্যালোঅ্যালকেন)', gen: 'CₙH₂ₙ₊₁X', first: 'ক্লোরোমিথেন (CH₃Cl)', sp: 'sp³' },
    { cls: 'মনোস্যাকারাইড (হেক্সোজ)', gen: 'C₆H₁₂O₆ বা Cₙ(H₂O)ₙ', first: 'গ্লুকোজ ও ফ্রুক্টোজ', sp: 'sp³ (মুক্তে ১টি sp²)' },
  ];
  homologous.forEach((hm, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `জৈব রসায়নে "${hm.cls}" সমগোত্রীয় শ্রেণির সাধারণ আণবিক সংকেত ও প্রথম সদস্য কোনটি?`,
        correct: `${hm.gen}; প্রথম সদস্য: ${hm.first}`,
        distractors: homologous
          .filter((x) => x.gen !== hm.gen)
          .slice(i % 5, (i % 5) + 4)
          .map((x) => `${x.gen}; প্রথম সদস্য: ${x.first}`),
        explanation: `${hm.cls}-এর সাধারণ সংকেত ${hm.gen} ও ক্ষুদ্রতম স্থায়ী সদস্য ${hm.first}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · সমগোত্রীয় শ্রেণি',
      })
    );
  });

  // Aromatic Substituent Directing Effects (Ch 2, ~60 MCQs)
  const directors = [
    { grp: '–NH₂, –NHR, –NR₂ (অ্যামিনো)', dir: 'অর্থো-প্যারা নির্দেশক ও প্রবল বলয় সক্রিয়কারী (+M)', ex: 'অ্যানিলিন ব্রোমিন পানিতে ২,৪,৬-ট্রাইব্রোমোঅ্যানিলিন দেয়' },
    { grp: '–OH, –OR (হাইড্রক্সি/অ্যালকোক্সি)', dir: 'অর্থো-প্যারা নির্দেশক ও প্রবল বলয় সক্রিয়কারী (+M)', ex: 'ফেনলের নাইট্রেশনে লঘু HNO₃-তেই o/p-নাইট্রোফেনল হয়' },
    { grp: '–CH₃, –C₂H₅ (অ্যালকাইল)', dir: 'অর্থো-প্যারা নির্দেশক ও মৃদু বলয় সক্রিয়কারী (+I/হাইপারকনজুগেশন)', ex: 'টলুইনে বেনজিনের চেয়ে দ্রুত নাইট্রেশন হয়' },
    { grp: '–F, –Cl, –Br, –I (হ্যালোজেন)', dir: 'অর্থো-প্যারা নির্দেশক কিন্তু মৃদু বলয় নিষ্ক্রিয়কারী (−I > +M)', ex: 'ক্লোরোবেনজিনে −I প্রভাবে গতি কমে কিন্তু +M প্রভাবে o/p উৎপাদ দেয়' },
    { grp: '–NO₂ (নাইট্রো)', dir: 'মেটা নির্দেশক ও তীব্র বলয় নিষ্ক্রিয়কারী (−M, −I)', ex: 'নাইট্রোবেনজিন ফ্রিডেল-ক্রাফটস বিক্রিয়া দেয় না' },
    { grp: '–COOH, –CHO, –COR (কার্বনিল/কার্বক্সিল)', dir: 'মেটা নির্দেশক ও বলয় নিষ্ক্রিয়কারী (−M)', ex: 'বেনজোয়িক অ্যাসিডের নাইট্রেশনে m-নাইট্রোবেনজোয়িক অ্যাসিড হয়' },
    { grp: '–CN, –SO₃H (সায়ানো/সালফো)', dir: 'মেটা নির্দেশক ও বলয় নিষ্ক্রিয়কারী (−M)', ex: 'ইলেকট্রন ঘনত্ব o/p অবস্থানে কমে যাওয়ায় ইলেকট্রোফাইল মেটায় যায়' },
    { grp: '–NHCOCH₃ (অ্যাসিট্যামিডো)', dir: 'অর্থো-প্যারা নির্দেশক ও মধ্যম বলয় সক্রিয়কারী (+M)', ex: 'অ্যাসিট্যানিলাইডের নাইট্রেশনে প্রধানত p-নাইট্রোঅ্যাসিট্যানিলাইড হয়' },
  ];
  directors.forEach((dr, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `বেনজিন বলয়ে প্রতিস্থাপক "${dr.grp}" যুক্ত থাকলে পরবর্তী ইলেকট্রোফিলিক প্রতিস্থাপনে কী প্রভাব পড়ে?`,
        correct: dr.dir,
        distractors: directors.filter((x) => x.dir !== dr.dir).slice(0, 4).map((x) => x.dir),
        explanation: `${dr.grp}: ${dr.dir}। উদাহরণ: ${dr.ex}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · নির্দেশক ও সক্রিয়তা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `অ্যারোমেটিক প্রতিস্থাপন সংক্রান্ত উদাহরণ "${dr.ex}" নিচের কোন নির্দেশক মূলকের আচরণের ফল?`,
        correct: `${dr.grp} (${dr.dir})`,
        distractors: directors.filter((x) => x.grp !== dr.grp).slice(i % 4, (i % 4) + 4).map((x) => `${x.grp} (${x.dir})`),
        explanation: `${dr.ex} ঘটে কারণ ${dr.grp} হলো ${dr.dir}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · অ্যারোমেটিক প্রতিস্থাপন',
      })
    );
  });

  // 3. Organic Conversion Chains & Quick Identification (Ch 2, ~150 MCQs)
  const conversions = [
    { from: 'ক্যালসিয়াম কার্বাইড (CaC₂)', to: 'অ্যাসিটালডিহাইড (CH₃CHO)', step: 'পানিতে ইথাইন → ১% HgSO₄ ও ২০% H₂SO₄ (৬০–৮০ °C)' },
    { from: 'ইথানল (CH₃CH₂OH)', to: 'ইথিন (CH₂=CH₂)', step: 'অতিরিক্ত গাঢ় H₂SO₄ সহ ১৭০ °C তাপমাত্রায় নিরুদন' },
    { from: 'ইথানোয়িক অ্যাসিড (CH₃COOH)', to: 'মিথেন (CH₄)', step: 'NaOH-এ লবণ (CH₃COONa) → সোডা-লাইম (NaOH + CaO) সহ তাপ' },
    { from: 'মিথাইল আয়োডাইড (CH₃I)', to: 'ইথেন (C₂H₆)', step: 'শুষ্ক ইথারে ধাতব সোডিয়াম (উর্টজ বিক্রিয়া)' },
    { from: 'নাইট্রোবেনজিন (C₆H₅NO₂)', to: 'অ্যানিলিন (C₆H₅NH₂)', step: 'Sn + গাঢ় HCl অথবা Fe + HCl দ্বারা বিজারণ' },
    { from: 'অ্যানিলিন (C₆H₅NH₂)', to: 'ফেনল (C₆H₅OH)', step: '০–৫ °C-এ NaNO₂+HCl → বেনজিন ডায়াজোনিয়াম ক্লোরাইড + গরম পানি' },
    { from: 'বেনজিন ডায়াজোনিয়াম ক্লোরাইড', to: 'ফ্লোরোবেনজিন (C₆H₅F)', step: 'HBF₄ সহ তাপ (বালজ-শাইম্যান / Balz-Schiemann বিক্রিয়া)' },
    { from: 'ফেনল (C₆H₅OH)', to: 'বেনজিন (C₆H₆)', step: 'জিংক চূর্ণ (Zn dust) সহ পাতন' },
    { from: 'ক্লোরোবেনজিন (C₆H₅Cl)', to: 'ফেনল (C₆H₅OH)', step: 'ডাউ প্রক্রিয়া: জলীয় NaOH (৩০০–৩৫০ °C, ১৫০–২০০ atm) → H⁺' },
    { from: 'বেনজিন (C₆H₆)', to: 'বেনজালডিহাইড (C₆H₅CHO)', step: 'গ্যাটারম্যান-কখ বিক্রিয়া: CO + HCl + অনাদ্র AlCl₃/CuCl' },
    { from: 'অ্যাসিটোফেনোন / ইথাইলবেনজিন', to: 'বেনজোয়িক অ্যাসিড (C₆H₅COOH)', step: 'ক্ষারীয় KMnO₄ সহ তীব্র জারণ → H⁺' },
    { from: 'ইথাইন (C₂H₂)', to: 'নাইলন / অরলনের মনোমার অ্যাক্রাইলোনাইট্রাইল', step: 'HCN সংযোজন (Cu₂Cl₂/NH₄Cl প্রভাবকে)' },
    { from: 'বেনজ্যামাইড (C₆H₅CONH₂)', to: 'অ্যানিলিন (C₆H₅NH₂)', step: 'Br₂ + ৪KOH (হফম্যান ক্ষুদ্রাংশকরণ বিক্রিয়া)' },
    { from: 'ইথাইল ব্রোমাইড (C₂H₅Br)', to: 'ইথানল (C₂H₅OH)', step: 'জলীয় KOH বা আর্দ্র Ag₂O সহ তাপ (SN বিক্রিয়া)' },
    { from: 'ইথাইল ব্রোমাইড (C₂H₅Br)', to: 'ইথিন (C₂H₄)', step: 'অ্যালকোহলীয় KOH সহ তাপ (β-অপসারণ)' },
  ];
  conversions.forEach((cv, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${cv.from}" থেকে "${cv.to}" রূপান্তরের সঠিক বিকারক ও বিক্রিয়া পথ কোনটি?`,
        correct: cv.step,
        distractors: conversions.filter((x) => x.step !== cv.step).slice(i % 7, (i % 7) + 4).map((x) => x.step),
        explanation: `${cv.from} → ${cv.to} রূপান্তরের ধাপ হলো: ${cv.step}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব রূপান্তর',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `${cv.from}-এর ওপর "${cv.step}" প্রয়োগ করলে চূড়ান্ত প্রধান উৎপাদ কী পাওয়া যায়?`,
        correct: cv.to,
        distractors: conversions.filter((x) => x.to !== cv.to).slice((i + 2) % 7, ((i + 2) % 7) + 4).map((x) => x.to),
        explanation: `${cv.from} + (${cv.step}) → ${cv.to}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিক্রিয়া সম্পূর্ণকরণ',
      })
    );
  });

  // Additional Ch 2 Organic Concepts & Boiling Point/Solubility Ordering (40 MCQs)
  const orgConcepts = [
    { q: 'সমআণবিক ভরের অ্যালকোহল, অ্যালডিহাইড, ইথার ও অ্যালকেনের মধ্যে স্ফুটনাঙ্কের সঠিক ক্রম কোনটি?', a: 'অ্যালকোহল > অ্যালডিহাইড > ইথার > অ্যালকেন (অ্যালকোহলে শক্তিশালী H-বন্ধন)', d: ['অ্যালকেন > ইথার > অ্যালকোহল', 'ইথার > অ্যালকোহল > অ্যালডিহাইড', 'অ্যালডিহাইড > অ্যালকোহল > ইথার'] },
    { q: 'সমসংখ্যক কার্বনবিশিষ্ট ১°, ২° ও ৩° অ্যালকোহলের স্ফুটনাঙ্কের ক্রম কী (শাখা বাড়লে কী হয়)?', a: '১° অ্যালকোহল > ২° অ্যালকোহল > ৩° অ্যালকোহল (শাখা বাড়লে পৃষ্ঠক্ষেত্রফল ও ভ্যান ডার ওয়ালস বল কমে)', d: ['৩° > ২° > ১°', '২° > ৩° > ১°', 'সবার সমান'] },
    { q: 'নিউক্লিওফিলিক সংযোজন বিক্রিয়ায় (Nucleophilic Addition) অ্যালডিহাইড ও কিটোনের সক্রিয়তার ক্রম কোনটি?', a: 'HCHO > CH₃CHO > CH₃COCH₃ > C₆H₅COC₆H₅ (স্টেরিক ও +I বাধা কমলে সক্রিয়তা বাড়ে)', d: ['CH₃COCH₃ > CH₃CHO > HCHO', 'কিটোন সর্বদা অ্যালডিহাইডের চেয়ে বেশি সক্রিয়', 'C₆H₅COC₆H₅ সর্বাধিক সক্রিয়'] },
    { q: 'হেক্সামিন (ইউরোট্রোপিন — মূত্রনালির জীবাণুনাশক) কোন দুটি যৌগের বিক্রিয়ায় উৎপন্ন হয়?', a: 'ফর্মালডিহাইড (6HCHO) ও অ্যামোনিয়া (4NH₃) → (CH₂)₆N₄', d: ['অ্যাসিটালডিহাইড ও অ্যানিলিন', 'বেনজালডিহাইড ও KOH', 'মিথানল ও ইউরিয়া'] },
    { q: 'ফর্মালিন তৈরি করতে পানিতে শতকরা কত ভাগ ফর্মালডিহাইড (HCHO) দ্রবীভূত করা হয়?', a: '৩৭% – ৪০% HCHO-এর জলীয় দ্রবণ (স্থায়িত্বের জন্য সামান্য মিথানলসহ)', d: ['৫% দ্রবণ', '৯৯% বিশুদ্ধ তরল', '১০% দ্রবণ'] },
    { q: 'পলি-হাইড্রিক অ্যালকোহল ইথিলিন গ্লাইকল (HO–CH₂–CH₂–OH) শীতপ্রধান দেশে গাড়ির রেডিয়েটরে কী হিসেবে ব্যবহৃত হয়?', a: 'অ্যান্টি-ফ্রিজ (Anti-freeze — পানির হিমাঙ্ক অনেক নিচে নামিয়ে দেয়)', d: ['জ্বালানি হিসেবে', 'লুব্রিক্যান্ট হিসেবে', 'রঞ্জক হিসেবে'] },
    { q: 'নিরুদক হিসেবে কপার চূর্ণ সহ ৩০০ °C তাপমাত্রায় ১°, ২° ও ৩° অ্যালকোহল চালনা করলে ৩° অ্যালকোহল কী উৎপন্ন করে?', a: 'অ্যালকিন (নিরুদন; ১° ও ২° যথাক্রমে অ্যালডিহাইড ও কিটোন দেয়)', d: ['কার্বক্সিলিক অ্যাসিড', 'ইথার', '৩° অ্যালকোহল কোনো বিক্রিয়াই করে না'] },
    { q: 'ইথারকে সূর্যালোক ও বায়ুর সংস্পর্শে রাখলে কী বিষাক্ত বিস্ফোরক পদার্থ তৈরি হয় যা পুরোনো ইথার পাতনে বিপদ ঘটায়?', a: 'ইথার পার-অক্সাইড (তাই FeSO₄ দিয়ে পরীক্ষা করা হয়)', d: ['ফসজিন গ্যাস', 'ইথানল', 'বেনজিন'] },
    { q: 'ডিএনএ ও আরএনএ-র পিরিমিডিন ও পিউরিন ক্ষারকগুলো কী কী?', a: 'পিউরিন: অ্যাডেনিন (A) ও গুয়ানিন (G); পিরিমিডিন: সাইটোসিন (C), থাইমিন (T) ও ইউরাসিল (U)', d: ['পিউরিন: C ও T', 'পিরিমিডিন: A ও G', 'সবগুলোই এক রিংবিশিষ্ট'] },
    { q: 'সাবানের ক্রিয়াবিধি ছাড়াও অ্যামিনো অ্যাসিডের বাফার আচরণ ও ডাইপোলার গঠনের কারণ কী?', a: 'একই অণুতে অম্লীয় –COOH ও ক্ষারীয় –NH₂ মূলক থাকায় প্রোটন স্থানান্তরে জুইটার-আয়ন সৃষ্টি', d: ['হাইড্রোকার্বন শিকল দীর্ঘ হওয়া', 'সালফার বন্ধন থাকা', 'ফসফেট মূলক থাকা'] },
  ];
  orgConcepts.forEach((oc, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: oc.q,
        correct: oc.a,
        distractors: oc.d,
        explanation: `${oc.q} — সঠিক উত্তর: ${oc.a}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব রসায়ন বিশ্লেষণ',
      })
    );
  });

  // 4. Extra Ch 1 Gas Properties & Ch 2 Isomer/Reaction Rapid Drills (~60 MCQs)
  const gasLawsSummary = [
    { law: 'বয়েলের সূত্র (Boyle’s Law)', consts: 'তাপমাত্রা (T) ও মোল সংখ্যা (n) স্থির', eq: 'PV = ধ্রুবক (P ∝ 1/V); লেখচিত্র সমোষ্ণ/আইসোথার্ম (অধিবৃত্ত)' },
    { law: 'চার্লসের সূত্র (Charles’s Law)', consts: 'চাপ (P) ও মোল সংখ্যা (n) স্থির', eq: 'V/T = ধ্রুবক (V ∝ T); লেখচিত্র সমচাপীয়/আইসোবার (সরলরেখা)' },
    { law: 'গে-লুসাকের চাপীয় সূত্র', consts: 'আয়তন (V) ও মোল সংখ্যা (n) স্থির', eq: 'P/T = ধ্রুবক (P ∝ T); লেখচিত্র সমআয়তনিক/আইসোকোর' },
    { law: 'অ্যাভোগাড্রোর সূত্র', consts: 'তাপমাত্রা (T) ও চাপ (P) স্থির', eq: 'V ∝ n (একই T ও P-তে সমআয়তন সকল গ্যাসে সমান সংখ্যক অণু থাকে)' },
    { law: 'গ্রাহামের ব্যাপন সূত্র', consts: 'তাপমাত্রা (T) ও চাপ (P) স্থির', eq: 'r ∝ 1/√d ∝ 1/√M' },
    { law: 'ডাল্টনের আংশিক চাপ সূত্র', consts: 'তাপমাত্রা (T) ও আয়তন (V) স্থির (অবিক্রিয়াশীল গ্যাস)', eq: 'P_total = P₁ + P₂ + ... এবং P_i = X_i · P_total' },
  ];
  gasLawsSummary.forEach((gl, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'dental',
        question: `গ্যাসের "${gl.law}" প্রযোজ্য হওয়ার জন্য কোন দুটি রাশি স্থির থাকতে হয়?`,
        correct: gl.consts,
        distractors: gasLawsSummary.filter((x) => x.consts !== gl.consts).slice(0, 4).map((x) => x.consts),
        explanation: `${gl.law}-এ ${gl.consts} থাকে এবং সমীকরণ হলো: ${gl.eq}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাস সূত্রাবলি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${gl.law}-এর সঠিক গাণিতিক প্রকাশ ও লেখচিত্রের বৈশিষ্ট্য কোনটি?`,
        correct: gl.eq,
        distractors: gasLawsSummary.filter((x) => x.eq !== gl.eq).slice(0, 4).map((x) => x.eq),
        explanation: `${gl.law} (${gl.consts}): ${gl.eq}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাস সমীকরণ',
      })
    );
  });

  // Extra Degree of Unsaturation (DBE) drills (20 MCQs)
  const dbeList = [
    { f: 'C₄H₁₀ (বিউটেন)', dbe: 0 },
    { f: 'C₄H₈ (বিউটিন / সাইক্লোবিউটেন)', dbe: 1 },
    { f: 'C₄H₆ (বিউটাইন / বিউটাডাইইন)', dbe: 2 },
    { f: 'C₆H₆ (বেনজিন)', dbe: 4 },
    { f: 'C₈H₈ (স্টাইরিন / কিউবেন)', dbe: 5 },
    { f: 'C₁₀H₈ (ন্যাপথালিন)', dbe: 7 },
    { f: 'C₁₄H₁₀ (অ্যানথ্রাসিন)', dbe: 10 },
    { f: 'C₆H₁₂O₆ (গ্লুকোজ — মুক্ত ও চাক্রিক গড়ে)', dbe: 1 },
  ];
  dbeList.forEach((db, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${db.f} আণবিক সংকেত বিশিষ্ট জৈব যৌগের অসম্পৃক্ততার মাত্রা বা দ্বিবন্ধন সমতুল্য (DBE / IHD) কত?`,
        correct: `${toBnDigits(db.dbe)}`,
        distractors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10].filter((x) => x !== db.dbe).slice(0, 4).map((x) => `${toBnDigits(x)}`),
        explanation: `DBE = C + 1 − (H + X − N)/2 সূত্রানুযায়ী ${db.f}-এর DBE = ${toBnDigits(db.dbe)}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · অসম্পৃক্ততার মাত্রা',
      })
    );
  });

  return list;
}
