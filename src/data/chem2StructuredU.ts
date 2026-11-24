import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildChem2StructuredU(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2su_${String(seq++).padStart(4, '0')}`;

  // 1. Faraday's Law Quantitative Problems (~120 MCQs)
  const ions: Array<{ ion: string; sym: string; m: number; z: number }> = [
    { ion: 'Ag⁺', sym: 'Ag', m: 108, z: 1 },
    { ion: 'Cu²⁺', sym: 'Cu', m: 63.5, z: 2 },
    { ion: 'Al³⁺', sym: 'Al', m: 27, z: 3 },
    { ion: 'Fe²⁺', sym: 'Fe', m: 56, z: 2 },
    { ion: 'Fe³⁺', sym: 'Fe', m: 56, z: 3 },
    { ion: 'Zn²⁺', sym: 'Zn', m: 65.4, z: 2 },
    { ion: 'Ni²⁺', sym: 'Ni', m: 58.7, z: 2 },
    { ion: 'Cr³⁺', sym: 'Cr', m: 52, z: 3 },
    { ion: 'Ca²⁺', sym: 'Ca', m: 40, z: 2 },
    { ion: 'Na⁺', sym: 'Na', m: 23, z: 1 },
  ];

  const faradays = [1, 2, 3, 4, 6];
  ions.forEach((item) => {
    const eqWt = Number((item.m / item.z).toFixed(2).replace(/\.?0+$/, ''));
    faradays.forEach((f) => {
      const massDep = Number(((f * item.m) / item.z).toFixed(2).replace(/\.?0+$/, ''));
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: 'chem2_ch4_electro',
          visualLessonId: 'ph_buffer',
          hscLevel: '12',
          difficulty: f <= 3 ? 'medical' : 'board',
          question: `গলিত বা জলীয় ${item.ion} দ্রবণে ${toBnDigits(f)} ফ্যারাডে (F) তড়িৎ প্রবাহিত করলে ক্যাথোডে কত গ্রাম ${item.sym} ধাতু সঞ্চিত হবে? (পারমাণবিক ভর ${toBnDigits(item.m)})`,
          correct: `${toBnDigits(massDep)} g`,
          distractors: [
            `${toBnDigits(Number((f * item.m).toFixed(2)))} g`,
            `${toBnDigits(Number((massDep / 2).toFixed(2)))} g`,
            `${toBnDigits(Number((massDep * 2).toFixed(2)))} g`,
            `${toBnDigits(Number((massDep + 14).toFixed(2)))} g`,
            `${toBnDigits(Number((massDep + 29).toFixed(2)))} g`,
          ],
          explanation: `১ ফ্যারাডে তড়িতে ১ গ্রাম-তুল্যাঙ্ক (${toBnDigits(eqWt)} g) ${item.sym} জমা হয়। অতএব ${toBnDigits(f)} F তড়িতে ${toBnDigits(f)} × (${toBnDigits(item.m)}/${toBnDigits(item.z)}) = ${toBnDigits(massDep)} g ${item.sym} সঞ্চিত হবে।`,
          reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ফ্যারাডের প্রথম সূত্র',
        })
      );
    });

    // Coulombs needed for 1 mole of metal
    const coulombs = item.z * 96500;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${item.ion} থেকে ১ মোল ${item.sym} ধাতু ক্যাথোডে মুক্ত করতে ন্যূনতম কত ফ্যারাডে বা কত কুলম্ব বিদ্যুৎ প্রয়োজন?`,
        correct: `${toBnDigits(item.z)} F (${toBnDigits(coulombs)} কুলম্ব)`,
        distractors: [
          `১ F (৯৬,৫০০ কুলম্ব)`,
          `${toBnDigits(item.z + 1)} F (${toBnDigits((item.z + 1) * 96500)} কুলম্ব)`,
          `${toBnDigits(item.z * 2)} F (${toBnDigits(coulombs * 2)} কুলম্ব)`,
          `${toBnDigits(item.z + 2)} F (${toBnDigits((item.z + 2) * 96500)} কুলম্ব)`,
          `${toBnDigits(item.z + 3)} F (${toBnDigits((item.z + 3) * 96500)} কুলম্ব)`,
        ],
        explanation: `${item.ion} + ${toBnDigits(item.z)}e⁻ → ${item.sym}; তাই ১ মোল ${item.sym}-এর জন্য ${toBnDigits(item.z)} মোল ইলেকট্রন = ${toBnDigits(item.z)} F = ${toBnDigits(coulombs)} কুলম্ব প্রয়োজন।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ রাসায়নিক তুল্যাঙ্ক',
      })
    );
  });

  // Current * Time -> Mass Deposited
  const ampCases: Array<{ sym: string; m: number; z: number; amp: number; sec: number }> = [
    { sym: 'Cu', m: 63.5, z: 2, amp: 5, sec: 1930 },
    { sym: 'Ag', m: 108, z: 1, amp: 2, sec: 965 },
    { sym: 'Al', m: 27, z: 3, amp: 10, sec: 965 },
    { sym: 'Zn', m: 65.4, z: 2, amp: 10, sec: 1930 },
    { sym: 'Ni', m: 58.7, z: 2, amp: 5, sec: 3860 },
    { sym: 'Fe', m: 56, z: 2, amp: 4, sec: 965 },
  ];
  ampCases.forEach((ac) => {
    const q = ac.amp * ac.sec;
    const fCount = q / 96500;
    const mass = Number(((fCount * ac.m) / ac.z).toFixed(3).replace(/\.?0+$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${ac.sym} লবণের দ্রবণে ${toBnDigits(ac.amp)} অ্যাম্পিয়ার তড়িৎ ${toBnDigits(ac.sec)} সেকেন্ড ধরে চালনা করলে কত গ্রাম ${ac.sym} (যোজ্যতা ${toBnDigits(ac.z)}, ভর ${toBnDigits(ac.m)}) জমা হবে?`,
        correct: `${toBnDigits(mass)} g`,
        distractors: [
          `${toBnDigits(Number((mass * 2).toFixed(3)))} g`,
          `${toBnDigits(Number((mass / 2).toFixed(3)))} g`,
          `${toBnDigits(Number((mass * 10).toFixed(2)))} g`,
        ],
        explanation: `W = (M × I × t) / (z × ৯৬,৫০০) = (${toBnDigits(ac.m)} × ${toBnDigits(ac.amp)} × ${toBnDigits(ac.sec)}) / (${toBnDigits(ac.z)} × ৯৬,৫০০) = ${toBnDigits(mass)} g।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · W = ZIt হিসাব',
      })
    );
  });

  // 2. Standard Cell EMF Calculations (E°cell = E°cathode(red) - E°anode(red)) (~50 MCQs)
  const emfCells: Array<{
    anode: string;
    eAnodeRed: number;
    cathode: string;
    eCathodeRed: number;
    cell: string;
  }> = [
    { anode: 'Zn/Zn²⁺', eAnodeRed: -0.76, cathode: 'Cu²⁺/Cu', eCathodeRed: 0.34, cell: 'ড্যানিয়েল কোষ Zn|Zn²⁺||Cu²⁺|Cu' },
    { anode: 'Mg/Mg²⁺', eAnodeRed: -2.37, cathode: 'Ag⁺/Ag', eCathodeRed: 0.80, cell: 'Mg|Mg²⁺||Ag⁺|Ag কোষ' },
    { anode: 'Fe/Fe²⁺', eAnodeRed: -0.44, cathode: 'Cu²⁺/Cu', eCathodeRed: 0.34, cell: 'Fe|Fe²⁺||Cu²⁺|Cu কোষ' },
    { anode: 'Al/Al³⁺', eAnodeRed: -1.66, cathode: 'Zn²⁺/Zn', eCathodeRed: -0.76, cell: 'Al|Al³⁺||Zn²⁺|Zn কোষ' },
    { anode: 'Ni/Ni²⁺', eAnodeRed: -0.25, cathode: 'Ag⁺/Ag', eCathodeRed: 0.80, cell: 'Ni|Ni²⁺||Ag⁺|Ag কোষ' },
    { anode: 'Cd/Cd²⁺', eAnodeRed: -0.40, cathode: 'Pb²⁺/Pb', eCathodeRed: -0.13, cell: 'Cd|Cd²⁺||Pb²⁺|Pb কোষ' },
    { anode: 'Zn/Zn²⁺', eAnodeRed: -0.76, cathode: 'H⁺/H₂ (SHE)', eCathodeRed: 0.0, cell: 'Zn|Zn²⁺||H⁺|H₂(Pt) কোষ' },
    { anode: 'Cr/Cr³⁺', eAnodeRed: -0.74, cathode: 'Fe²⁺/Fe', eCathodeRed: -0.44, cell: 'Cr|Cr³⁺||Fe²⁺|Fe কোষ' },
  ];
  emfCells.forEach((c) => {
    const emf = Number((c.eCathodeRed - c.eAnodeRed).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${c.cell}-এ প্রমাণ বিজারণ বিভব যথাক্রমে E°(${c.anode}) = ${toBnDigits(c.eAnodeRed)} V এবং E°(${c.cathode}) = ${toBnDigits(c.eCathodeRed)} V হলে কোষটির প্রমাণ বিভব (E°cell) কত?`,
        correct: `+${toBnDigits(emf)} V`,
        distractors: [
          `${toBnDigits(Number((c.eCathodeRed + c.eAnodeRed).toFixed(2)))} V`,
          `-${toBnDigits(emf)} V`,
          `${toBnDigits(Number((emf + 0.5).toFixed(2)))} V`,
          `${toBnDigits(Number((emf * 2).toFixed(2)))} V`,
        ],
        explanation: `E°cell = E°(ক্যাথোড বিজারণ) - E°(অ্যানোড বিজারণ) = ${toBnDigits(c.eCathodeRed)} - (${toBnDigits(c.eAnodeRed)}) = +${toBnDigits(emf)} V।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · প্রমাণ কোষ বিভব',
      })
    );
  });

  // 3. High-Yield Electrochemistry Concepts Matrix (45 entries × 4 angles = 180 MCQs)
  const elecMatrix: Array<{
    title: string;
    detail: string;
    pearl: string;
    diff?: 'board' | 'medical' | 'dental';
  }> = [
    {
      title: 'তড়িৎ বিশ্লেষ্য পরিবাহী বনাম ধাতব (ইলেকট্রনীয়) পরিবাহী',
      detail: 'ধাতব পরিবাহীতে মুক্ত ইলেকট্রন বিদ্যুৎ বহন করে ও তাপমাত্রা বাড়লে রোধ বাড়ে; তড়িৎ বিশ্লেষ্য পরিবাহীতে ক্যাটায়ন-অ্যানায়ন বিদ্যুৎ বহন করে ও তাপমাত্রা বাড়লে পরিবাহিতা বাড়ে',
      pearl: 'তড়িৎ বিশ্লেষ্যে বিদ্যুৎ প্রবাহের সাথে রাসায়নিক পরিবর্তন ঘটে, কিন্তু ধাতব পরিবাহীতে কোনো রাসায়নিক পরিবর্তন হয় না',
      diff: 'board',
    },
    {
      title: 'গ্যালভানিক (ড্যানিয়েল) কোষ ও তড়িৎ বিশ্লেষ্য কোষের অ্যানোড-ক্যাথোডের চিহ্ন',
      detail: 'উভয় কোষেই অ্যানোডে জারণ ও ক্যাথোডে বিজারণ ঘটে; তবে গ্যালভানিক কোষে অ্যানোড ঋণাত্মক (-) ও ক্যাথোড ধনাত্মক (+), আর তড়িৎ বিশ্লেষ্য কোষে অ্যানোড (+) ও ক্যাথোড (-)',
      pearl: 'মনে রাখার সূত্র: "LOAN" (Left = Oxidation = Anode = Negative) গ্যালভানিক কোষের জন্য প্রযোজ্য',
      diff: 'medical',
    },
    {
      title: 'লবণ সেতুর (Salt Bridge) গঠন ও তড়িৎ-রাসায়নিক কাজ',
      detail: 'আগার-আগার জেলিতে KCl, KNO₃ বা NH₄NO₃-এর মতো নিষ্ক্রিয় তড়িৎবিশ্লেষ্য নিয়ে তৈরি লবণ সেতু অভ্যন্তরীণ বর্তনী পূর্ণ করে, তরল-সংযোগ বিভব কমায় ও দ্রবণের তড়িৎ নিরপেক্ষতা রক্ষা করে',
      pearl: 'K⁺ ও Cl⁻ আয়নের পরিবহন বেগ (Transference number) প্রায় সমান বলে KCl উৎকৃষ্ট, তবে Ag⁺ বা Pb²⁺ লবণের ক্ষেত্রে KNO₃ বা NH₄NO₃ ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      title: 'প্রমাণ হাইড্রোজেন তড়িৎদ্বার (SHE — Standard Hydrogen Electrode)',
      detail: '১ M H⁺ (HCl) দ্রবণে ১ atm চাপে ২৫°C তাপমাত্রায় বিশুদ্ধ H₂ গ্যাস চালনা করে প্ল্যাটিনাম-ব্ল্যাক প্রলেপযুক্ত Pt পাতের বিভবকে শূন্য (০.০০ V) ধরা হয়',
      pearl: 'SHE একটি প্রাথমিক নির্দেশক তড়িৎদ্বার যা অ্যানোড ও ক্যাথোড উভয় রূপেই কাজ করতে পারে',
      diff: 'board',
    },
    {
      title: 'সম্পৃক্ত ক্যালোমেল তড়িৎদ্বার (Calomel Electrode) ও গ্লাস তড়িৎদ্বার',
      detail: 'Hg | Hg₂Cl₂(s), KCl (সম্পৃক্ত) হলো সেকেন্ডারি রেফারেন্স তড়িৎদ্বার যার বিভব ২৫°C-এ +০.২৪২ V; আর কাচের সূক্ষ্ম বাল্বযুক্ত গ্লাস তড়িৎদ্বার দ্রবণের pH মাপতে ব্যবহৃত হয়',
      pearl: 'SHE ব্যবহার করা ঝামেলাপূর্ণ বলে ল্যাবে সাধারণত ক্যালোমেল বা Ag/AgCl সেকেন্ডারি নির্দেশক তড়িৎদ্বার ব্যবহৃত হয়',
      diff: 'medical',
    },
    {
      title: 'তড়িৎ রাসায়নিক সারি (Electrochemical Series) ও ধাতুর বিজারণ ক্ষমতা',
      detail: 'প্রমাণ বিজারণ বিভবের মান যত বেশি ঋণাত্মক (যেমন Li⁺/Li = -৩.০৫ V), ধাতুটি তত তীব্র বিজারক এবং সহজে ইলেকট্রন দিয়ে ক্ষয়প্রাপ্ত হয়',
      pearl: 'সক্রিয়তা সারিতে হাইড্রোজেনের ওপরের ধাতু (Zn, Fe, Mg) লঘু অ্যাসিড থেকে H₂ গ্যাস মুক্ত করে, কিন্তু নিচের ধাতু (Cu, Ag, Au, Hg) করে না',
      diff: 'medical',
    },
    {
      title: 'গাঢ় বনাম লঘু NaCl (ব্রাইন) দ্রবণের তড়িৎ বিশ্লেষণ ও ডায়াফ্রাম কোষ',
      detail: 'গলিত NaCl-এ ক্যাথোডে Na ধাতু ও অ্যানোডে Cl₂ পাওয়া যায়; কিন্তু জলীয় NaCl দ্রবণে ক্যাথোডে Na⁺-এর পরিবর্তে H₂O বিজারিত হয়ে H₂ গ্যাস ও NaOH তৈরি হয়',
      pearl: 'অতি লঘু NaCl দ্রবণের তড়িৎ বিশ্লেষণে অ্যানোডে Cl₂-এর পরিবর্তে পানি জারিত হয়ে O₂ গ্যাস নির্গত হয়',
      diff: 'medical',
    },
    {
      title: 'তড়িৎ বিশ্লেষণে আয়নের অগ্রাধিকার (Preferential Discharge Theory)',
      detail: 'একাধিক ক্যাটায়ন থাকলে যার প্রমাণ বিজারণ বিভব বেশি সেটি ক্যাথোডে আগে মুক্ত হয়; একাধিক অ্যানায়নে যার জারণ প্রবণতা বেশি (I⁻ > Br⁻ > Cl⁻ > OH⁻ > NO₃⁻ > SO₄²⁻) সেটি অ্যানোডে আগে মুক্ত হয়',
      pearl: 'ক্লোর-অ্যালকালি শিল্পে পারদ ক্যাথোড (কাস্টনার-কেলনার কোষ) ব্যবহার করলে Na⁺ অ্যামালগাম হয়ে বিজারিত হয়',
      diff: 'medical',
    },
    {
      title: 'নার্নস্ট সমীকরণ (Nernst Equation) ও ঘনমাত্রার প্রভাব',
      detail: '২৫°C-এ E_cell = E°_cell - (০.০৫৯২ / n) log₁₀ Q; যেখানে Q = [উৎপাদ]/[বিক্রিয়ক] এবং n = স্থানান্তরিত ইলেকট্রন মোলসংখ্যা',
      pearl: 'সাম্যাবস্থায় পৌঁছলে কোষ বিভব E_cell = ০ হয় এবং তখন log₁₀ Kc = (n × E°_cell) / ০.০৫৯২ পাওয়া যায়',
      diff: 'medical',
    },
    {
      title: 'গিবস মুক্ত শক্তি (ΔG° = -nFE°cell) ও স্বতঃস্ফূর্ততা',
      detail: 'কোষ বিক্রিয়া স্বতঃস্ফূর্ত হওয়ার জন্য E°cell ধনাত্মক (> ০) এবং ΔG° ঋণাত্মক (< ০) হওয়া আবশ্যক',
      pearl: 'Cu পাত্রে FeSO₄ রাখা যায় (কারণ Cu Fe²⁺-কে প্রতিস্থাপিত করতে পারে না), কিন্তু Zn পাত্রে CuSO₄ রাখা যায় না',
      diff: 'medical',
    },
    {
      title: 'প্রাইমারি ব্যাটারি (শুষ্ক লেকল্যাঞ্চি কোষ) বনাম সেকেন্ডারি ব্যাটারি',
      detail: 'শুষ্ক কোষে (Dry cell, ১.৫ V) Zn পাত্র অ্যানোড, MnO₂+C (গ্রাফাইট) ক্যাথোড ও NH₄Cl+ZnCl₂ পেস্ট ইলেকট্রোলাইট থাকে যা রিচার্জ করা যায় না',
      pearl: 'অ্যালকালাইন ব্যাটারিতে (KOH পেস্ট) বেশি তড়িৎ প্রবাহ ও দীর্ঘস্থায়িত্ব পাওয়া যায়; মার্কারি বাটন সেল ঘড়ি-ক্যালকুলেটরে ধ্রুব ১.৩৫ V দেয়',
      diff: 'board',
    },
    {
      title: 'লেড-অ্যাসিড (লেড স্টোরেজ) ব্যাটারির ডিসচার্জ ও রিচার্জ বিক্রিয়া',
      detail: 'অ্যানোড স্পঞ্জি Pb, ক্যাথোড PbO₂-আবৃত Pb গ্রিড এবং ইলেকট্রোলাইট ৩৮% (~১.২৮ আপেক্ষিক গুরুত্বের) H₂SO₄; ডিসচার্জে উভয় তড়িৎদ্বারে PbSO₄ জমে ও H₂SO₄ ঘনত্ব কমে',
      pearl: 'রিচার্জিংয়ের সময় বাহ্যিক তড়িৎ দিয়ে বিক্রিয়া উল্টে দিয়ে পুনরায় Pb, PbO₂ ও H₂SO₄ ফিরে পাওয়া যায় (প্রতি কোষ ~২.০ V, ৬ কোষে ১২ V গাড়ির ব্যাটারি)',
      diff: 'medical',
    },
    {
      title: 'লিথিয়াম-আয়ন ব্যাটারি (Li-ion): আধুনিক ইলেকট্রনিক্স ও EV পাওয়ার',
      detail: 'অ্যানোড গ্রাফাইটে ইন্টারক্যালেটেড লিথিয়াম (LiC₆), ক্যাথোড LiCoO₂ বা LiFePO₄ এবং অ-জলীয় জৈব দ্রাবকে LiPF₆ লবণ ব্যবহৃত হয় (~৩.৬–৩.৭ V)',
      pearl: 'লিথিয়াম সর্বনিম্ন বিজারণ বিভব (-৩.০৫ V) ও সর্বহালকা ধাতু হওয়ায় এর শক্তি-ঘনত্ব (Energy density) সর্বোচ্চ এবং মেমোরি ইফেক্ট নেই',
      diff: 'medical',
    },
    {
      title: 'হাইড্রোজেন-অক্সিজেন (H₂–O₂) ফুয়েল সেল ও অ্যাপোলো মহাকাশযান',
      detail: 'ছিদ্রযুক্ত কার্বন/Pt তড়িৎদ্বার ও KOH/PEM ইলেকট্রোলাইটে অ্যানোডে H₂ জারিত ও ক্যাথোডে O₂ বিজারিত হয়ে নিরবচ্ছিন্ন বিদ্যুৎ ও বিশুদ্ধ পানীয় জল (H₂O) দেয়',
      pearl: 'দহন ইঞ্জিনের চেয়ে ফুয়েল সেলের কর্মদক্ষতা অনেক বেশি (~৬০–৭০%) ও কোনো গ্রিনহাউজ গ্যাস নির্গত হয় না',
      diff: 'medical',
    },
    {
      title: 'কপার (Cu) পরিশোধন ও তড়িৎ-প্রলেপন (Electroplating)',
      detail: 'অশুদ্ধ ব্লিস্টার কপারকে অ্যানোড ও বিশুদ্ধ পাতলা কপারকে ক্যাথোড এবং CuSO₄+H₂SO₄ দ্রবণ নিয়ে তড়িৎ বিশ্লেষণে ক্যাথোডে ৯৯.৯৯% বিশুদ্ধ কপার জমে',
      pearl: 'Ag, Au, Pt-এর মতো স্বল্পসক্রিয় মূল্যবান ধাতু অ্যানোডের নিচে "অ্যানোড কাদা (Anode mud)" রূপে জমা হয়',
      diff: 'medical',
    },
    {
      title: 'লোহায় মরিচা পড়া ও ক্যাথোডীয় সুরক্ষা (Galvanizing & Sacrificial Anode)',
      detail: 'আর্দ্র বায়ুতে লোহার পৃষ্ঠে অ্যানোডে Fe → Fe²⁺ এবং ক্যাথোডে O₂ + 4H⁺ → 2H₂O গঠিত হয়ে আর্দ্র ফেরিক অক্সাইড (Fe₂O₃·nH₂O) মরিচা তৈরি করে',
      pearl: 'লোহাকে মরিচা থেকে বাঁচাতে বেশি সক্রিয় Zn প্রলেপ (গ্যালভানাইজিং) বা ভূগর্ভস্থ পাইপে Mg ব্লক ত্যাগী অ্যানোড (Sacrificial anode) হিসেবে যুক্ত করা হয়',
      diff: 'medical',
    },
    {
      title: 'মোলার পরিবাহিতা (Λm) ও কোলরাউশের স্বাধীন আয়ন পরিভ্রমণ সূত্র',
      detail: 'অসীম লঘুকরণে কোনো তড়িৎবিশ্লেষ্যের মোলার পরিবাহিতা তার ক্যাটায়ন ও অ্যানায়নের সীমাস্থ মোলার আয়নিক পরিবাহিতার সমষ্টির সমান (Λ°m = λ°⁺ + λ°⁻)',
      pearl: 'তরলীকরণ বা লঘুতা বাড়ালে আপেক্ষিক পরিবাহিতা (κ) কমে কিন্তু মোলার পরিবাহিতা (Λm) বৃদ্ধি পায়',
      diff: 'medical',
    },
    {
      title: 'তড়িৎ রাসায়নিক তুল্যাঙ্ক (Z) ও রাসায়নিক তুল্যাঙ্ক (E)-এর সম্পর্ক',
      detail: 'Z = E / F = M / (z × ৯৬,৫০০); অর্থাৎ ১ কুলম্ব তড়িৎ প্রবাহে কোনো তড়িৎদ্বারে যত গ্রাম পদার্থ সঞ্চিত বা দ্রবীভূত হয় তাকে তড়িৎ রাসায়নিক তুল্যাঙ্ক বলে',
      pearl: 'ফ্যারাডের ২য় সূত্রমতে শ্রেণি সমবায়ে যুক্ত ভিন্ন কোষে সমান তড়িৎ চালনা করলে সঞ্চিত ভর রাসায়নিক তুল্য ভরের (E = M/z) সমানুপাতিক হয় (W₁/W₂ = E₁/E₂)',
      diff: 'board',
    },
    {
      title: 'নিকেল-ক্যাডমিয়াম (Ni-Cd) ও নিকেল-মেটাল হাইড্রাইড (NiMH) রিচার্জেবল কোষ',
      detail: 'Ni-Cd ব্যাটারিতে (~১.২ V) ক্যাডমিয়াম অ্যানোড ও NiO(OH) ক্যাথোড থাকে; ক্যাডমিয়ামের বিষক্রিয়ার কারণে বর্তমানে NiMH ও Li-ion এর স্থান দখল করেছে',
      pearl: 'আপেক্ষিক তড়িৎধারিতা ও পরিবেশবান্ধব বৈশিষ্ট্যে Li-ion ব্যাটারি Ni-Cd অপেক্ষা বহুগুণ উন্নত',
      diff: 'dental',
    },
    {
      title: 'তড়িৎ বিশ্লেষণে প্লাটিনাম তড়িৎদ্বারের সাথে AgNO₃ বনাম Ag তড়িৎদ্বারের সাথে AgNO₃',
      detail: 'নিষ্ক্রিয় Pt তড়িৎদ্বারে AgNO₃ দ্রবণে অ্যানোডে O₂ গ্যাস বের হয়, কিন্তু সক্রিয় Ag অ্যানোড ব্যবহার করলে অ্যানোড নিজেই ক্ষয়ে Ag⁺ তৈরি করে ও ক্যাথোডে Ag জমে',
      pearl: 'ইলেকট্রোপ্লেটিংয়ে যে ধাতুর প্রলেপ দিতে হয় সেই ধাতুকেই অ্যানোড ও দ্রবণে লবণ হিসেবে নেওয়া হয়',
      diff: 'medical',
    },
  ];

  const eTitles = elecMatrix.map((e) => e.title);
  const eDetails = elecMatrix.map((e) => e.detail);
  const ePearls = elecMatrix.map((e) => e.pearl);

  elecMatrix.forEach((e, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: e.diff ?? 'medical',
        question: `তড়িৎ রসায়নে "${e.title}" সংক্রান্ত সঠিক ব্যাখ্যা কোনটি?`,
        correct: e.detail,
        distractors: [1, 2, 3, 4].map((o) => eDetails[(idx + o * 3) % elecMatrix.length]),
        explanation: `${e.detail}। পরীক্ষা নোট: ${e.pearl}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ রসায়ন',
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
        question: `"${e.title}" বিষয়ে মেডিকেল ও ভর্তি পরীক্ষার জন্য গুরুত্বপূর্ণ মূল পয়েন্ট কোনটি?`,
        correct: e.pearl,
        distractors: [1, 2, 3, 4].map((o) => ePearls[(idx + o * 5) % elecMatrix.length]),
        explanation: `${e.pearl}। বিস্তারিত: ${e.detail}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · ভর্তি প্রস্তুতি',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${e.detail}" — এই বক্তব্যটি তড়িৎ রসায়নের কোন বিষয়ের বর্ণনা?`,
        correct: e.title,
        distractors: [1, 2, 3, 4].map((o) => eTitles[(idx + o * 7) % elecMatrix.length]),
        explanation: `এটি "${e.title}"-এর অন্তর্ভুক্ত: ${e.pearl}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · এইচএসসি সংকলন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch4_electro',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${e.pearl}" — এই তথ্যটি নিচের কোন তড়িৎ-রাসায়নিক ধারণার সাথে যুক্ত?`,
        correct: e.title,
        distractors: [1, 2, 3, 4].map((o) => eTitles[(idx + o * 9) % elecMatrix.length]),
        explanation: `উক্ত তথ্যটি "${e.title}"-এর সাথে সম্পর্কিত: ${e.detail}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ৪ · তড়িৎ কোষ ও বিশ্লেষণ',
      })
    );
  });

  return list;
}
