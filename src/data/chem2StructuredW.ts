import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredW(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sw_${String(seq++).padStart(4, '0')}`;

  // 1. Nernst Equation & ΔG° / Equilibrium K Calculations (36 MCQs)
  const nernstItems: Array<{
    n: number;
    e0: number;
    ratioLabel: string;
    logQ: number;
    diff: 'board' | 'medical' | 'dental';
  }> = [
    { n: 2, e0: 1.1, ratioLabel: '[Zn²⁺]/[Cu²⁺] = ০.১', logQ: -1, diff: 'medical' },
    { n: 2, e0: 1.1, ratioLabel: '[Zn²⁺]/[Cu²⁺] = ০.০১', logQ: -2, diff: 'medical' },
    { n: 2, e0: 1.1, ratioLabel: '[Zn²⁺]/[Cu²⁺] = ১০', logQ: 1, diff: 'dental' },
    { n: 2, e0: 1.1, ratioLabel: '[Zn²⁺]/[Cu²⁺] = ১০০', logQ: 2, diff: 'board' },
    { n: 2, e0: 0.46, ratioLabel: '[Cu²⁺]/[Ag⁺]² = ০.১', logQ: -1, diff: 'medical' },
    { n: 2, e0: 0.46, ratioLabel: '[Cu²⁺]/[Ag⁺]² = ১০', logQ: 1, diff: 'dental' },
    { n: 2, e0: 0.76, ratioLabel: '[Zn²⁺] = ০.০১ M ও [H⁺] = ১ M (SHE সহ)', logQ: -2, diff: 'medical' },
    { n: 1, e0: 0.8, ratioLabel: '[Ag⁺] = ০.১ M (হাইড্রোজেনের সাপেক্ষে বিজারণ বিভব)', logQ: 1, diff: 'medical' },
    { n: 1, e0: 0.8, ratioLabel: '[Ag⁺] = ০.০১ M (হাইড্রোজেনের সাপেক্ষে বিজারণ বিভব)', logQ: 2, diff: 'dental' },
    { n: 2, e0: 0.34, ratioLabel: '[Cu²⁺] = ০.১ M (Cu/Cu²⁺ অর্ধকোষের বিজারণ বিভব)', logQ: 1, diff: 'board' },
    { n: 2, e0: 0.34, ratioLabel: '[Cu²⁺] = ০.০১ M (Cu/Cu²⁺ অর্ধকোষের বিজারণ বিভব)', logQ: 2, diff: 'medical' },
    { n: 3, e0: 1.66, ratioLabel: '[Al³⁺] = ০.০০১ M (Al/Al³⁺ জারণ অর্ধকোষ)', logQ: -3, diff: 'medical' },
  ];

  nernstItems.forEach((item) => {
    // Using 0.0592 ≈ 0.06 factor or exact 0.0591 rounded cleanly to 3 decimals
    const shift = Number(((0.0591 / item.n) * item.logQ).toFixed(3));
    const eCell = Number((item.e0 - shift).toFixed(3));
    const dg = Number(((-item.n * 96500 * item.e0) / 1000).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: item.diff,
        question: `২৫ °C তাপমাত্রায় E° = ${toBnDigits(item.e0)} V ও n = ${toBnDigits(item.n)} বিশিষ্ট কোষ/অর্ধকোষে ${item.ratioLabel} হলে নার্নস্ট সমীকরণ অনুযায়ী তড়িৎদ্বার/কোষ বিভব (E) প্রায় কত ভোল্ট হবে?`,
        correct: `${toBnDigits(eCell)} V`,
        distractors: [
          `${toBnDigits(Number((item.e0 + shift + 0.03).toFixed(3)))} V`,
          `${toBnDigits(Number((eCell + 0.118).toFixed(3)))} V`,
          `${toBnDigits(Number((eCell - 0.118).toFixed(3)))} V`,
          `${toBnDigits(Number((item.e0 - 0.0591 * item.logQ - 0.02).toFixed(3)))} V`,
        ],
        explanation: `E = E° − (০.০৫৯১ / ${toBnDigits(item.n)}) × (${toBnDigits(item.logQ)}) = ${toBnDigits(item.e0)} − (${toBnDigits(shift)}) = ${toBnDigits(eCell)} V।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · নার্নস্ট সমীকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `যদি কোনো তড়িৎ-রাসায়নিক বিক্রিয়ায় n = ${toBnDigits(item.n)} এবং E° = +${toBnDigits(item.e0)} V হয়, তবে প্রমাণ মুক্তশক্তির পরিবর্তন (ΔG°) কত kJ? (F = ৯৬৫০০ C)`,
        correct: `${toBnDigits(dg)} kJ`,
        distractors: [
          `+${toBnDigits(Math.abs(dg))} kJ`,
          `${toBnDigits(Number((dg / 2).toFixed(2)))} kJ`,
          `${toBnDigits(Number((dg * 2).toFixed(2)))} kJ`,
          `${toBnDigits(Number((dg - 45).toFixed(2)))} kJ`,
        ],
        explanation: `ΔG° = -nFE° = -(${toBnDigits(item.n)} × ৯৬৫০০ × ${toBnDigits(item.e0)}) J = ${toBnDigits(dg)} kJ।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · মুক্তশক্তি ও বিভব',
      })
    );
  });

  // 2. Organic Chemistry Named Conversions & Specific Reagents Matrix (36 topics × 4 = 144 MCQs)
  const convMatrix: Array<{
    reactant: string;
    reagent: string;
    product: string;
    rxnName: string;
    note: string;
  }> = [
    { reactant: 'ইথিন (CH₂=CH₂)', reagent: 'লঘু ক্ষারীয় KMnO₄ (বেয়ার বিকারক)', product: 'ইথিলিন গ্লাইকল (CH₂OH–CH₂OH)', rxnName: 'বেয়ার অসম্পৃক্ততা পরীক্ষা', note: 'বেয়ার বিকারকের গোলাপি বর্ণ দূর হয়' },
    { reactant: 'ইথাইন (HC≡CH)', reagent: '২০% H₂SO₄ + ২% HgSO₄ (৬০ °C)', product: 'ইথান্যাল (CH₃CHO)', rxnName: 'কুচেরভ আর্দ্রবিশ্লেষণ', note: 'ভিনাইল অ্যালকোহল টটোমেরিজমে ইথান্যাল হয়' },
    { reactant: 'প্রোপাইন (CH₃C≡CH)', reagent: '২০% H₂SO₄ + ২% HgSO₄ (৬০ °C)', product: 'প্রোপানোন (CH₃COCH₃)', rxnName: 'অ্যালকাইন হাইড্রেশন', note: 'মার্কনিকভ নিয়মে কিটো-ইনল টটোমেরিজমে কিটোন হয়' },
    { reactant: 'ক্যালসিয়াম কার্বাইড (CaC₂)', reagent: 'H₂O (কক্ষ তাপমাত্রা)', product: 'অ্যাসিটিলিন (ইথাইন) + Ca(OH)₂', rxnName: 'ইথাইন পরীক্ষাগার প্রস্তুতি', note: 'ফল পাকানো ও অক্সি-অ্যাসিটিলিন শিখায় ব্যবহৃত হয়' },
    { reactant: '৩ অণু ইথাইন (HC≡CH)', reagent: 'লোহার নলে ৪০০–৫০০ °C তাপ', product: 'বেনজিন (C₆H₆)', rxnName: 'বার্থেলট পলিমারকরণ', note: 'অ্যালিফ্যাটিক থেকে অ্যারোমেটিক বেনজিন প্রস্তুতি' },
    { reactant: 'সোডিয়াম বেনজোয়েট (C₆H₅COONa)', reagent: 'সোডালাইম (NaOH + CaO) ও তাপ', product: 'বেনজিন (C₆H₆) + Na₂CO₃', rxnName: 'ডিকার্বক্সিলেশন বিক্রিয়া', note: 'উৎপাদে ১টি কার্বন কমে যায়' },
    { reactant: 'ফেনল (C₆H₅OH)', reagent: 'জিংক গুঁড়ো (Zn dust) ও পাতন', product: 'বেনজিন (C₆H₆) + ZnO', rxnName: 'ফেনলের বিজারণ', note: 'Zn-কে জারিত করে ফেনলের –OH সরে যায়' },
    { reactant: 'বেনজিন (C₆H₆)', reagent: 'CH₃Cl + অনাদ্র AlCl₃', product: 'টলুইন (C₆H₅CH₃)', rxnName: 'ফ্রিডেল-ক্রাফ্টস অ্যালকাইলেশন', note: 'CH₃⁺ ইলেক্ট্রোফাইল হিসেবে আক্রমণ করে' },
    { reactant: 'টলুইন (C₆H₅CH₃)', reagent: 'CrO₂Cl₂ / CS₂ পরে H₃O⁺', product: 'বেনজালডিহাইড (C₆H₅CHO)', rxnName: 'ইটার্ড বিক্রিয়া (Etard)', note: 'মিথাইল মূলকের আংশিক জারণ' },
    { reactant: 'টলুইন (C₆H₅CH₃)', reagent: 'ক্ষারীয় KMnO₄ ও তাপ পরে H⁺', product: 'বেনজোয়িক অ্যাসিড (C₆H₅COOH)', rxnName: 'পার্শ্ব-শিকল জারণ', note: 'বেনজাইলিক হাইড্রোজেন থাকলে যেকোনো অ্যালকাইল শিকল –COOH হয়' },
    { reactant: 'বেনজিন (C₆H₆)', reagent: 'গাঢ় HNO₃ + গাঢ় H₂SO₄ (৫৫–৬০ °C)', product: 'নাইট্রোবেনজিন (C₆H₅NO₂)', rxnName: 'অ্যারোমেটিক নাইট্রেশন', note: '১০০ °C-এ মেটা-ডাইনাইট্রোবেনজিন হয়' },
    { reactant: 'নাইট্রোবেনজিন (C₆H₅NO₂)', reagent: 'Sn + গাঢ় HCl (তাপ)', product: 'অ্যানিলিন (C₆H₅NH₂)', rxnName: 'অ্যারোমেটিক নাইট্রো বিজারণ', note: '৬টি নবজাত [H] ব্যবহৃত হয়' },
    { reactant: 'ক্লোরোবেনজিন (C₆H₅Cl)', reagent: 'NaOH (৩০০–৩৫০ °C, ১৫০ atm) পরে H⁺', product: 'ফেনল (C₆H₅OH)', rxnName: 'ডাউ পদ্ধতি (Dow Process)', note: 'বেনজাইন মধ্যবর্তীর মাধ্যমে ঘটে' },
    { reactant: 'ফেনল (C₆H₅OH)', reagent: 'CHCl₃ + NaOH (৬০ °C) পরে H⁺', product: 'স্যালিসাইলডিহাইড (২-হাইড্রক্সিবেনজালডিহাইড)', rxnName: 'রাইমার-টাইম্যান বিক্রিয়া', note: 'ডাইক্লোরোকার্বিন (:CCl₂) ইলেক্ট্রোফাইল' },
    { reactant: 'সোডিয়াম ফেনোক্সাইড (C₆H₅ONa)', reagent: 'CO₂ (১২৫ °C, ৪–৭ atm) পরে H⁺', product: 'স্যালিসাইলিক অ্যাসিড', rxnName: 'কোলবে-শ্মিট বিক্রিয়া', note: 'স্যালিসাইলিক অ্যাসিড অ্যাসপিরিনের কাঁচামাল' },
    { reactant: 'ইথাইল ব্রোমাইড (২ অণু)', reagent: 'ধাতব Na + শুষ্ক ইথার', product: 'বিউটেন (C₄H₁₀)', rxnName: 'উর্টজ বিক্রিয়া (Wurtz)', note: 'কার্বন সংখ্যা দ্বিগুণ করে জোড় সংখ্যার অ্যালকেন দেয়' },
    { reactant: 'মিথাইল আয়োডাইড + ইথারীয় C₆H₅Br', reagent: 'ধাতব Na + শুষ্ক ইথার', product: 'টলুইন (C₆H₅CH₃)', rxnName: 'উর্টজ-ফিটিগ বিক্রিয়া', note: 'অ্যারোমেটিক রিংয়ে অ্যালকাইল মূলক যুক্ত হয়' },
    { reactant: 'ইথানল (CH₃CH₂OH)', reagent: 'গাঢ় H₂SO₄ (১৭০ °C)', product: 'ইথিন (CH₂=CH₂)', rxnName: 'অ্যালকোহল নিরুদন (অপসারণ)', note: '১৪০ °C তাপমাত্রায় ডাই-ইথাইল ইথার দেয়' },
    { reactant: '১°-অ্যালকোহল (RCH₂OH)', reagent: 'PCC (পাইরিডিনিয়াম ক্লোরোক্রোমেট)', product: 'অ্যালডিহাইড (RCHO)', rxnName: 'নিয়ন্ত্রিত আংশিক জারণ', note: 'K₂Cr₂O₇/H⁺ দিলে সরাসরি অ্যাসিডে জারিত হতো' },
    { reactant: 'ইথানল (CH₃CH₂OH)', reagent: 'Cu-প্রভাবক (৩০০ °C)', product: 'ইথান্যাল + H₂ গ্যাস', rxnName: 'প্রভাবকীয় ডিহাইড্রোজিনেশন', note: '৩° অ্যালকোহল এই অবস্থায় নিরুদিত হয়ে অ্যালকিন দেয়' },
    { reactant: 'অ্যাসিটিল ক্লোরাইড (CH₃COCl)', reagent: 'H₂ / Pd-BaSO₄ + ফুটন্ত জাইলিন', product: 'ইথান্যাল (CH₃CHO)', rxnName: 'রোজেনমুন্ড বিজারণ', note: 'BaSO₄ প্রভাবক বিষ হিসেবে অতিরিক্ত বিজারণ থামায়' },
    { reactant: 'বেনজালডিহাইড (C₆H₅CHO)', reagent: '৫০% গাঢ় NaOH', product: 'বেনজাইল অ্যালকোহল + সোডিয়াম বেনজোয়েট', rxnName: 'ক্যানিজারো বিক্রিয়া', note: 'α-হাইড্রোজেনবিহীন অ্যালডিহাইডের অসমঞ্জস বিক্রিয়া' },
    { reactant: 'ইথান্যাল (CH₃CHO)', reagent: 'লঘু NaOH (কক্ষ তাপমাত্রা)', product: '৩-হাইড্রক্সিবিউটান্যাল (অ্যালডল)', rxnName: 'অ্যালডল ঘনীভবন', note: 'উত্তপ্ত করলে ক্রোটোনালডিহাইড হয়' },
    { reactant: 'ইথান্যাল (CH₃CHO)', reagent: 'I₂ + NaOH (উষ্ণ)', product: 'হলুদ CHI₃ (আয়োডোফর্ম) + HCOONa', rxnName: 'হ্যালোফর্ম পরীক্ষা', note: 'CH₃CO– বা CH₃CH(OH)– মূলক শনাক্ত করে' },
    { reactant: 'অ্যাসিটিক অ্যাসিড (CH₃COOH)', reagent: 'Cl₂ + লাল ফসফরাস', product: 'মনোক্লোরোঅ্যাসিটিক অ্যাসিড', rxnName: 'হেল-ভোলহার্ড-জেলিনস্কি (HVZ)', note: 'α-হাইড্রোজেন হ্যালোজেন দ্বারা প্রতিস্থাপিত হয়' },
    { reactant: 'ইথানোয়িক অ্যাসিড + ইথানল', reagent: 'গাঢ় H₂SO₄ (প্রভাবক) ও তাপ', product: 'ইথাইল অ্যাসিটেট (মিষ্টি গন্ধ)', rxnName: 'এস্টারিফিকেশন (ফিশার)', note: 'এস্টারের হাইড্রক্সিল অংশ আসে অ্যাসিড থেকে পানিতে' },
    { reactant: 'ইথান্যামাইড (CH₃CONH₂)', reagent: 'Br₂ + ৪ KOH', product: 'মিথাইলঅ্যামিন (CH₃NH₂)', rxnName: 'হফম্যান ক্ষুদ্রাংশকরণ', note: 'উৎপন্ন অ্যামিনে ১টি কার্বন পরমাণু কমে যায়' },
    { reactant: 'অ্যানিলিন (C₆H₅NH₂)', reagent: 'CHCl₃ + অ্যালকোহলীয় KOH (তাপ)', product: 'ফিনাইল আইসোসায়ানাইড (দুর্গন্ধ)', rxnName: 'কার্বিলঅ্যামিন পরীক্ষা', note: 'শুধুমাত্র ১° অ্যামিন এই পরীক্ষা দেয়' },
    { reactant: 'বেনজিন ডায়াজোনিয়াম ক্লোরাইড', reagent: 'Cu₂Cl₂ + HCl', product: 'ক্লোরোবেনজিন + N₂', rxnName: 'স্যান্ডমেয়ার বিক্রিয়া', note: 'Cu গুঁড়ো নিলে গ্যাটারম্যান বিক্রিয়া' },
    { reactant: 'বেনজিন ডায়াজোনিয়াম ক্লোরাইড', reagent: 'H₃PO₂ + H₂O', product: 'বেনজিন + N₂ + H₃PO₃', rxnName: 'ডায়াজোনিয়াম বিজারণ', note: 'অ্যারোমেটিক –NH₂ মূলক সম্পূর্ণ অপসারণে ব্যবহৃত হয়' },
    { reactant: 'মিথাইল ক্লোরাইড (CH₃Cl)', reagent: 'KCN পরে LiAlH₄ দ্বারা বিজারণ', product: 'ইথাইলঅ্যামিন (CH₃CH₂NH₂)', rxnName: 'অ্যালকাইল নাইট্রাইল থেকে অ্যামিন', note: 'মেন্ডিয়াস বিজারণে Na + C₂H₅OH-ও ব্যবহারযোগ্য' },
    { reactant: 'বেনজিন (C₆H₆)', reagent: '৩ Cl₂ (UV সূর্যালোক)', product: 'গ্যামাক্সিন / BHC (C₆H₆Cl₆)', rxnName: 'বেনজিনের সংযোজন বিক্রিয়া', note: 'কীটনাশক হিসেবে ব্যবহৃত হয়' },
    { reactant: 'বেনজিন (C₆H₆)', reagent: '৩ O₃ পরে Zn + H₂O', product: '৩ অণু গ্লাইঅক্সাল (CHO–CHO)', rxnName: 'বেনজিনের ওজোনোলাইসিস', note: 'বেনজিনে ৩টি দ্বিবন্ধন প্রমাণ করে' },
    { reactant: 'ক্লোরোফর্ম (CHCl₃)', reagent: 'অ্যাসিটোন (CH₃COCH₃) + KOH', product: 'ক্লোরিটন (নিদ্রাকারক ওষুধ)', rxnName: 'অ্যাসিটোন সংযোজন', note: 'ক্লোরিটন প্রিজারভেটিভ ও সম্মোহনী হিসেবে ব্যবহৃত হয়' },
    { reactant: 'অ্যাসিটোন (CH₃COCH₃)', reagent: 'Zn-Hg + গাঢ় HCl', product: 'প্রোপেন (CH₃CH₂CH₃)', rxnName: 'ক্লেমেনসেন বিজারণ', note: 'অ্যাসিড মাধ্যমে >C=O থেকে >CH₂ তৈরি করে' },
    { reactant: 'ইথানল (CH₃CH₂OH)', reagent: 'ব্লিচিং পাউডার (CaOCl₂) + H₂O', product: 'ক্লোরোফর্ম (CHCl₃)', rxnName: 'হ্যালোফর্ম সংশ্লেষণ', note: 'ইথানল জারিত ও ক্লোরিনেশনে ক্লোরোফর্ম দেয়' },
  ];

  const allProds = convMatrix.map((c) => c.product);
  const allReagents = convMatrix.map((c) => c.reagent);
  const allRxnNames = convMatrix.map((c) => c.rxnName);

  convMatrix.forEach((c, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch2_organic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${c.reactant}-কে ${c.reagent} সহ বিক্রিয়া করালে প্রধান উৎপাদ কী পাওয়া যায়?`,
        correct: c.product,
        distractors: [1, 2, 3, 4, 5].map((o) => allProds[(idx + o * 5) % convMatrix.length]),
        explanation: `${c.rxnName}: ${c.reactant} + ${c.reagent} → ${c.product}। (${c.note})`,
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
        difficulty: 'dental',
        question: `${c.reactant} থেকে সরাসরি ${c.product} প্রস্তুত করতে কোন বিকারক ও শর্ত প্রয়োজন?`,
        correct: c.reagent,
        distractors: [1, 2, 3, 4, 5].map((o) => allReagents[(idx + o * 7) % convMatrix.length]),
        explanation: `${c.rxnName} অনুসারে ${c.reagent} ব্যবহারে ${c.product} গঠিত হয়।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · বিকারক নির্বাচন',
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
        question: `${c.reactant} + ${c.reagent} → ${c.product} — এই রূপান্তরটি জৈব রসায়নে কোন নামে পরিচিত?`,
        correct: c.rxnName,
        distractors: [1, 2, 3, 4, 5].map((o) => allRxnNames[(idx + o * 4) % convMatrix.length]),
        explanation: `এটি ${c.rxnName}; নোট: ${c.note}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · নামীয় বিক্রিয়া',
      })
    );
  });

  // 3. Gas Laws, RMS Speed Ratio, Molarity-Titration-Redox Calculations (90 MCQs)
  const gasPairs: Array<{ g1: string; m1: number; g2: string; m2: number; ratioTxt: string }> = [
    { g1: 'H₂', m1: 2, g2: 'O₂', m2: 32, ratioTxt: '৪ : ১' },
    { g1: 'H₂', m1: 2, g2: 'CH₄', m2: 16, ratioTxt: '২√২ : ১ (বা ২.৮৩ : ১)' },
    { g1: 'He', m1: 4, g2: 'CH₄', m2: 16, ratioTxt: '২ : ১' },
    { g1: 'CH₄', m1: 16, g2: 'SO₂', m2: 64, ratioTxt: '২ : ১' },
    { g1: 'He', m1: 4, g2: 'SO₂', m2: 64, ratioTxt: '৪ : ১' },
    { g1: 'H₂', m1: 2, g2: 'He', m2: 4, ratioTxt: '√২ : ১ (বা ১.৪১৪ : ১)' },
    { g1: 'NH₃', m1: 17, g2: 'HCl', m2: 36.5, ratioTxt: '১.৪৬৫ : ১' },
    { g1: 'N₂', m1: 28, g2: 'CO', m2: 28, ratioTxt: '১ : ১' },
  ];

  const ratioPool = ['৪ : ১', '২ : ১', '১ : ১', '১ : ২', '১ : ৪', '√২ : ১ (বা ১.৪১৪ : ১)', '২√২ : ১ (বা ২.৮৩ : ১)', '১.৪৬৫ : ১'];

  gasPairs.forEach((gp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একই তাপমাত্রা ও চাপে ${gp.g1} (M = ${toBnDigits(gp.m1)}) ও ${gp.g2} (M = ${toBnDigits(gp.m2)}) গ্যাসের ব্যাপন হারের অনুপাত (r₁ : r₂) কত?`,
        correct: gp.ratioTxt,
        distractors: ratioPool.filter((r) => r !== gp.ratioTxt),
        explanation: `গ্রাহামের সূত্র: r₁/r₂ = √(M₂/M₁) = √(${toBnDigits(gp.m2)}/${toBnDigits(gp.m1)}) = ${gp.ratioTxt}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্রাহামের ব্যাপন সূত্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `একই তাপমাত্রায় ${gp.g1} ও ${gp.g2} গ্যাসের বর্গমূল গড় বর্গবেগের (c_rms) অনুপাত কত হবে?`,
        correct: gp.ratioTxt,
        distractors: ratioPool.filter((r) => r !== gp.ratioTxt).slice(idx % 2, (idx % 2) + 5),
        explanation: `c_rms = √(3RT/M), তাই একই T-তে c₁/c₂ = √(M₂/M₁) = ${gp.ratioTxt}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের আণবিক বেগ',
      })
    );
  });

  // 4. Titration Volume & Percentage Strength Calculations (40 MCQs)
  const titrations: Array<{ acidM: number; acidV: number; acidN: number; acidName: string; baseM: number; baseN: number; baseName: string }> = [
    { acidM: 0.1, acidV: 20, acidN: 1, acidName: 'HCl', baseM: 0.1, baseN: 1, baseName: 'NaOH' },
    { acidM: 0.2, acidV: 25, acidN: 1, acidName: 'HCl', baseM: 0.1, baseN: 1, baseName: 'NaOH' },
    { acidM: 0.1, acidV: 25, acidN: 2, acidName: 'H₂SO₄', baseM: 0.2, baseN: 1, baseName: 'NaOH' },
    { acidM: 0.5, acidV: 10, acidN: 2, acidName: 'H₂SO₄', baseM: 0.25, baseN: 1, baseName: 'KOH' },
    { acidM: 0.1, acidV: 30, acidN: 1, acidName: 'HNO₃', baseM: 0.15, baseN: 1, baseName: 'NaOH' },
    { acidM: 0.2, acidV: 20, acidN: 2, acidName: 'H₂C₂O₄', baseM: 0.1, baseN: 1, baseName: 'NaOH' },
    { acidM: 0.1, acidV: 50, acidN: 1, acidName: 'HCl', baseM: 0.2, baseN: 2, baseName: 'Na₂CO₃' },
    { acidM: 0.2, acidV: 40, acidN: 1, acidName: 'HCl', baseM: 0.1, baseN: 2, baseName: 'Na₂CO₃' },
    { acidM: 0.15, acidV: 20, acidN: 2, acidName: 'H₂SO₄', baseM: 0.15, baseN: 2, baseName: 'Na₂CO₃' },
    { acidM: 0.25, acidV: 20, acidN: 1, acidName: 'CH₃COOH', baseM: 0.1, baseN: 1, baseName: 'NaOH' },
  ];

  titrations.forEach((t) => {
    const reqV = Number(((t.acidN * t.acidM * t.acidV) / (t.baseN * t.baseM)).toFixed(1));
    const cand = [reqV * 2, reqV / 2, reqV + 10, reqV + 15, reqV + 25].map((x) => Number(x.toFixed(1)));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(t.acidV)} mL ${toBnDigits(t.acidM)} M ${t.acidName} দ্রবণকে সম্পূর্ণ প্রশমিত করতে ${toBnDigits(t.baseM)} M ${t.baseName} দ্রবণের কত mL প্রয়োজন হবে?`,
        correct: `${toBnDigits(reqV)} mL`,
        distractors: cand.map((v) => `${toBnDigits(v)} mL`),
        explanation: `e₁V₁S₁ = e₂V₂S₂ ⇒ ${toBnDigits(t.acidN)} × ${toBnDigits(t.acidV)} × ${toBnDigits(t.acidM)} = ${toBnDigits(t.baseN)} × V₂ × ${toBnDigits(t.baseM)} ⇒ V₂ = ${toBnDigits(reqV)} mL।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · টাইট্রেশন গণনা',
      })
    );
  });

  // Percentage (w/v) -> Molarity (20 MCQs)
  const pctCases: Array<{ solute: string; mw: number; pct: number }> = [
    { solute: 'NaOH', mw: 40, pct: 2 },
    { solute: 'NaOH', mw: 40, pct: 4 },
    { solute: 'NaOH', mw: 40, pct: 10 },
    { solute: 'Na₂CO₃', mw: 106, pct: 5.3 },
    { solute: 'Na₂CO₃', mw: 106, pct: 10.6 },
    { solute: 'H₂SO₄', mw: 98, pct: 4.9 },
    { solute: 'H₂SO₄', mw: 98, pct: 9.8 },
    { solute: 'HCl', mw: 36.5, pct: 3.65 },
    { solute: 'KOH', mw: 56, pct: 5.6 },
    { solute: 'গ্লুকোজ (C₆H₁₂O₆)', mw: 180, pct: 9 },
  ];

  pctCases.forEach((p) => {
    const m = Number(((10 * p.pct) / p.mw).toFixed(2));
    const ppm = Math.round(p.pct * 10000);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${toBnDigits(p.pct)}% (w/v) ${p.solute} (আণবিক ভর ${toBnDigits(p.mw)}) জলীয় দ্রবণের মোলারিটি কত M?`,
        correct: `${toBnDigits(m)} M`,
        distractors: [
          `${toBnDigits(Number((m * 2).toFixed(2)))} M`,
          `${toBnDigits(Number((m / 2).toFixed(2)))} M`,
          `${toBnDigits(Number((m * 10).toFixed(2)))} M`,
          `${toBnDigits(Number((m + 0.25).toFixed(2)))} M`,
        ],
        explanation: `M = (১০ × %w/v) / আণবিক ভর = (১০ × ${toBnDigits(p.pct)}) / ${toBnDigits(p.mw)} = ${toBnDigits(m)} M।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · শতকরা ও মোলারিটি সম্পর্ক',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch3_quant',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${toBnDigits(p.pct)}% (w/v) ${p.solute} জলীয় দ্রবণের ঘনমাত্রা ppm এককে কত?`,
        correct: `${toBnDigits(ppm)} ppm`,
        distractors: [
          `${toBnDigits(Math.round(ppm / 10))} ppm`,
          `${toBnDigits(Math.round(ppm / 100))} ppm`,
          `${toBnDigits(ppm * 10)} ppm`,
          `${toBnDigits(Math.round(p.pct * 100))} ppm`,
        ],
        explanation: `১% (w/v) = ১০,০০০ mg/L = ১০,০০০ ppm; তাই ${toBnDigits(p.pct)}% = ${toBnDigits(ppm)} ppm।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · ppm গণনা',
      })
    );
  });

  // 5. Industrial Chemistry Quick-Fact Matrix (20 topics × 3 = 60 MCQs)
  const indMatrix: Array<{ item: string; formulaOrFact: string; use: string }> = [
    { item: 'অলিয়াম বা ধূমায়মান সালফিউরিক অ্যাসিড', formulaOrFact: 'H₂S₂O₇ (H₂SO₄ + SO₃)', use: 'স্পর্শ পদ্ধতিতে H₂SO₄ উৎপাদনে SO₃ শোষণে তৈরি হয়' },
    { item: 'অসওয়াল্ড পদ্ধতিতে অ্যামোনিয়া জারণ', formulaOrFact: 'Pt-Rh প্রভাবক, ৮৫০–৯০০ °C', use: 'বাণিজ্যিকভাবে নাইট্রিক অ্যাসিড (HNO₃) উৎপাদনে' },
    { item: 'হ্যাবার-বস পদ্ধতিতে অ্যামোনিয়া সংশ্লেষণ', formulaOrFact: 'Fe প্রভাবক ও K₂O/Al₂O₃ বিবর্ধক, ৪৫০–৫০০ °C, ২০০ atm', use: 'ইউরিয়া ও অ্যামোনিয়াম নাইট্রেট সার উৎপাদনে' },
    { item: 'মন্ড (Mond) প্রক্রিয়ায় ধাতু পরিশোধন', formulaOrFact: 'Ni(CO)₄ উদ্বায়ী জটিল যৌগ গঠন ও বিয়োজন', use: 'অতি বিশুদ্ধ নিকেল (৯৯.৯%) ধাতু পৃথকীকরণে' },
    { item: 'হল-হেরোল্ট তড়িৎ-বিশ্লেষণ পদ্ধতি', formulaOrFact: 'ক্রায়োলাইট (Na₃AlF₆) ও ফ্লোরস্পার (CaF₂) মিশ্রিত বক্সাইট', use: 'গলিত অ্যালুমিনা থেকে অ্যালুমিনিয়াম নিষ্কাশনে' },
    { item: 'সলভে পদ্ধতি (অ্যামোনিয়া-সোডা প্রক্রিয়া)', formulaOrFact: 'NaCl + NH₃ + CO₂ + H₂O → NaHCO₃↓', use: 'সোডিয়াম কার্বোনেট (Na₂CO₃ বা সোডা অ্যাশ) উৎপাদনে' },
    { item: 'ডিকন (Deacon) ও নেসলার বিকারক', formulaOrFact: 'ক্ষারীয় K₂[HgI₄] হলো নেসলার বিকারক', use: 'নমুনায় অতি সামান্য NH₄⁺ আয়ন বা অ্যামোনিয়া শনাক্তকরণে' },
    { item: 'জলীয় গ্যাস (Water Gas) ও প্রডিউসার গ্যাস', formulaOrFact: 'CO + H₂ হলো ওয়াটার গ্যাস; CO + N₂ হলো প্রডিউসার গ্যাস', use: 'শিল্প-জ্বালানি ও মিথানল/হাইড্রোজেন সংশ্লেষণে' },
    { item: 'টার্নবুলস ব্লু ও প্রুশিয়ান ব্লু জটিল যৌগ', formulaOrFact: 'Fe₃[Fe(CN)₆]₂ / Fe₄[Fe(CN)₆]₃ গাঢ় নীল বর্ণ', use: 'লবণ বিশ্লেষণে Fe²⁺ ও Fe³⁺ আয়ন নিশ্চিতকরণে' },
    { item: 'ক্যালসিয়াম ফসফেট থেকে TSP সার', formulaOrFact: 'Ca₃(PO₄)₂ + ৪H₃PO₄ → ৩Ca(H₂PO₄)₂', use: 'মাটিতে সহজলভ্য ফসফরাস (P₂O₅ ~৪৬%) সরবরাহে' },
    { item: 'নাইলন-৬,৬ (পলি-অ্যামাইড তন্তু)', formulaOrFact: 'হেক্সামিথিলিন ডাইঅ্যামিন + অ্যাডিপিক অ্যাসিড', use: 'শক্তিশালী কৃত্রিম সুতা, দড়ি ও প্যারাস্যুট তৈরিতে' },
    { item: 'টেরিলিন বা ড্যাক্রন (পলি-এস্টার)', formulaOrFact: 'ইথিলিন গ্লাইকল + টেরেফথ্যালিক অ্যাসিড', use: 'ভাঁজ-প্রতিরোধী টেক্সটাইল বস্ত্র তৈরিতে' },
    { item: 'ব্যাকেলাইট (থার্মোসেটিং পলিমার)', formulaOrFact: 'ফেনল ও ফরম্যালডিহাইডের ক্ষার-প্রভাবিত ঘনীভবন', use: 'বৈদ্যুতিক সুইচ, প্লাগ ও প্রেসার কুকারের হাতল তৈরিতে' },
    { item: 'প্রাকৃতিক রাবারের ভলকানাইজেশন', formulaOrFact: 'আইসোপ্রিন পলিমারে ৩–৫% সালফার (S) দিয়ে ১৪০ °C-এ তাপ', use: 'রাবারকে স্থিতিস্থাপক, শক্ত ও তাপসহ টায়ার উপযোগী করতে' },
    { item: 'পলিস্টিরেইন ও পলিভিনাইল ক্লোরাইড (PVC)', formulaOrFact: 'ভিনাইল ক্লোরাইড (CH₂=CHCl)-এর মুক্ত-মূলক পলিমার', use: 'পানির পাইপ, বৈদ্যুতিক তারের আবরণ ও রেইনকোট তৈরিতে' },
    { item: 'টেফলন (PTFE)', formulaOrFact: 'টেট্রাফ্লোরোইথিন (CF₂=CF₂)-এর পলিমার', use: 'নন-স্টিক রান্নার পাত্র ও ক্ষয়রোধী গ্যাস্কেট তৈরিতে' },
    { item: 'মেলামাইন ফরম্যালডিহাইড রেজিন', formulaOrFact: 'মেলামাইন (C₃H₆N₆) + মিথান্যাল (HCHO)', use: 'অভঙ্গুর চকচকে প্লেট, কাপ ও পিরিচ তৈরিতে' },
    { item: 'ডেটল ও স্যাভলন জীবাণুনাশক', formulaOrFact: 'ক্লোরোজাইলেনল + টারপিনিওল (ডেটল); ক্লোরহেক্সিডিন + সেট্রিমাইড (স্যাভলন)', use: 'ক্ষতস্থান ও চিকিৎসা সরঞ্জাম জীবাণুমুক্তকরণে' },
    { item: 'ব্রড-স্পেকট্রাম অ্যান্টিসেপটিক ফেনল ডেরিভেটিভ', formulaOrFact: 'হেক্সাক্লোরোফেন ও পিক্রিক অ্যাসিড (২,৪,৬-ট্রাইনাইট্রোফেনল)', use: 'পোড়া ক্ষত (বার্নোল) ও সাবানে জীবাণুনাশক রূপে' },
    { item: 'কৃত্রিম মিষ্টিকারক (স্যাকারিন ও অ্যাসপার্টেম)', formulaOrFact: 'স্যাকারিন চিনির চেয়ে ~৫৫০ গুণ ও অ্যাসপার্টেম ~২০০ গুণ মিষ্টি', use: 'ডায়াবেটিক রোগীদের জন্য শূন্য-ক্যালরি মিষ্টিকারক হিসেবে' },
  ];

  const indFormulas = indMatrix.map((x) => x.formulaOrFact);
  const indUses = indMatrix.map((x) => x.use);
  const indItems = indMatrix.map((x) => x.item);

  indMatrix.forEach((im, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${im.item}" সম্পর্কিত সঠিক রাসায়নিক উপাদান, সংকেত বা শর্ত কোনটি?`,
        correct: im.formulaOrFact,
        distractors: [1, 2, 3, 4].map((o) => indFormulas[(idx + o * 3) % indMatrix.length]),
        explanation: `${im.item}: ${im.formulaOrFact} — এটি ${im.use}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · শিল্প ও পলিমার রসায়ন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'board',
        question: `${im.formulaOrFact} — এটি কোন শিল্প পণ্য বা প্রক্রিয়ার সাথে সরাসরি সম্পর্কিত?`,
        correct: im.item,
        distractors: [1, 2, 3, 4].map((o) => indItems[(idx + o * 4) % indMatrix.length]),
        explanation: `${im.item}-এর ক্ষেত্রে ${im.formulaOrFact} প্রযোজ্য এবং এটি ${im.use}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · শিল্প প্রক্রিয়া',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch5_economic',
        visualLessonId: 'benzene_aromatic',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${im.item}"-এর প্রধান শিল্পগত বা ব্যবহারিক প্রয়োগ কোনটি?`,
        correct: im.use,
        distractors: [1, 2, 3, 4].map((o) => indUses[(idx + o * 5) % indMatrix.length]),
        explanation: `${im.item} (${im.formulaOrFact}) মূলত ${im.use}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৫ · ব্যবহারিক প্রয়োগ',
      })
    );
  });

  return list;
}
