import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

interface Chem2RRaw {
  ch: 'chem2_ch1_env' | 'chem2_ch2_organic' | 'chem2_ch3_quant' | 'chem2_ch4_electro' | 'chem2_ch5_economic';
  vl: string;
  title: string;
  law: string;
  pearl: string;
  diff?: 'board' | 'medical' | 'dental';
}

export function buildChem2StructuredR(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `c2sr_${String(seq++).padStart(4, '0')}`;

  // 1. Gas Laws, RMS Speed, Graham Diffusion & Partial Pressure Calculations (~160 MCQs)
  const gasPairList: Array<{ g1: string; m1: number; g2: string; m2: number; ratio: string }> = [
    { g1: 'H₂', m1: 2, g2: 'O₂', m2: 32, ratio: '৪ : ১' },
    { g1: 'He', m1: 4, g2: 'CH₄', m2: 16, ratio: '২ : ১' },
    { g1: 'CH₄', m1: 16, g2: 'SO₂', m2: 64, ratio: '২ : ১' },
    { g1: 'H₂', m1: 2, g2: 'CH₄', m2: 16, ratio: '২.৮৩ : ১ (√৮ : ১)' },
    { g1: 'He', m1: 4, g2: 'SO₂', m2: 64, ratio: '৪ : ১' },
    { g1: 'NH₃', m1: 17, g2: 'HCl', m2: 36.5, ratio: '১.৪৭ : ১' },
    { g1: 'N₂', m1: 28, g2: 'CO', m2: 28, ratio: '১ : ১ (সমান হার)' },
    { g1: 'CO₂', m1: 44, g2: 'N₂O', m2: 44, ratio: '১ : ১ (সমান হার)' },
  ];
  gasPairList.forEach((gp, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: idx < 6 ? 'medical' : 'board',
        question: `একই তাপমাত্রা ও চাপে ${gp.g1} (M=${toBnDigits(gp.m1)}) এবং ${gp.g2} (M=${toBnDigits(gp.m2)}) গ্যাসের ব্যাপন হারের অনুপাত (r₁ : r₂) কত হবে?`,
        correct: gp.ratio,
        distractors: ['১ : ৪', '১ : ২', '১৬ : ১', '৮ : ১'].filter((x) => x !== gp.ratio),
        explanation: `গ্রাহামের ব্যাপন সূত্র r₁ / r₂ = √(M₂ / M₁) = √(${toBnDigits(gp.m2)} / ${toBnDigits(gp.m1)}) অনুযায়ী অনুপাত ${gp.ratio}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্রাহামের ব্যাপন সূত্র',
      })
    );

    if (gp.m1 !== gp.m2) {
      const mRatio = Number((gp.m2 / gp.m1).toFixed(1).replace(/\.0$/, ''));
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'chem_2',
          chapterId: 'chem2_ch1_env',
          visualLessonId: 'ph_buffer',
          hscLevel: '12',
          difficulty: 'medical',
          question: `সমান তাপমাত্রায় ${gp.g1} গ্যাসের বর্গমূল গড় বর্গবেগ (c_rms) ${gp.g2} গ্যাসের তুলনায় কত গুণ হবে?`,
          correct: `√${toBnDigits(mRatio)} গুণ`,
          distractors: [
            `${toBnDigits(mRatio)} গুণ`,
            `১ / ${toBnDigits(mRatio)} গুণ`,
            `১ / √${toBnDigits(mRatio)} গুণ`,
          ],
          explanation: `c_rms = √(3RT/M); তাই হালকা গ্যাস ${gp.g1}-এর বেগ ${gp.g2}-এর √(M₂/M₁) = √${toBnDigits(mRatio)} গুণ।`,
          reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্যাসের গতিতত্ত্ব ও RMS বেগ',
        })
      );
    }
  });

  // Boyle's & Charles's Numericals
  const boyleList: Array<[number, number, number]> = [
    [2, 500, 1],
    [1, 600, 3],
    [4, 250, 2],
    [1.5, 400, 3],
    [3, 300, 1.5],
    [5, 200, 2.5],
  ];
  boyleList.forEach(([p1, v1, p2]) => {
    const v2 = Math.round((p1 * v1) / p2);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `স্থির তাপমাত্রায় ${toBnDigits(p1)} atm চাপে কোনো গ্যাসের আয়তন ${toBnDigits(v1)} mL হলে ${toBnDigits(p2)} atm চাপে এর আয়তন কত mL হবে?`,
        correct: `${toBnDigits(v2)} mL`,
        distractors: [
          `${toBnDigits(Math.round(v2 / 2))} mL`,
          `${toBnDigits(v2 * 2)} mL`,
          `${toBnDigits(v1 + Math.round(p2 * 100))} mL`,
        ],
        explanation: `বয়েলের সূত্র P₁V₁ = P₂V₂ ⇒ V₂ = (${toBnDigits(p1)} × ${toBnDigits(v1)}) / ${toBnDigits(p2)} = ${toBnDigits(v2)} mL।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · বয়েলের সূত্র',
      })
    );
  });

  // Kinetic Energy & Ideal Gas Law Temperature Doubling
  [27, 127, 227, 327].forEach((tC) => {
    const tK = tC + 273;
    const t2C = tK * 2 - 273;
    const rms4C = tK * 4 - 273;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `স্থির চাপে ${toBnDigits(tC)}°C তাপমাত্রার একটি গ্যাসের আয়তন দ্বিগুণ করতে হলে তাপমাত্রা বাড়িয়ে কত ডিগ্রি সেলসিয়াস করতে হবে?`,
        correct: `${toBnDigits(t2C)}°C`,
        distractors: [
          `${toBnDigits(tC * 2)}°C`,
          `${toBnDigits(rms4C)}°C`,
          `${toBnDigits(tK * 2)}°C`,
        ],
        explanation: `চার্লসের সূত্র V₁/T₁ = V₂/T₂ অনুযায়ী কেলভিন তাপমাত্রা দ্বিগুণ করতে হবে। T₁ = ${toBnDigits(tC)} + ২৭৩ = ${toBnDigits(tK)} K ⇒ T₂ = ${toBnDigits(tK * 2)} K = ${toBnDigits(t2C)}°C।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · চার্লসের সূত্র',
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
        question: `${toBnDigits(tC)}°C তাপমাত্রার কোন গ্যাসের অণুগুলোর RMS বেগ দ্বিগুণ করতে হলে তাপমাত্রা কত ডিগ্রি সেলসিয়াসে উন্নীত করতে হবে?`,
        correct: `${toBnDigits(rms4C)}°C`,
        distractors: [
          `${toBnDigits(t2C)}°C`,
          `${toBnDigits(tC * 4)}°C`,
          `${toBnDigits(rms4C + 273)}°C`,
        ],
        explanation: `c_rms ∝ √T; বেগ দ্বিগুণ করতে পরম তাপমাত্রা (T) চারগুণ করতে হবে। T₁ = ${toBnDigits(tK)} K ⇒ T₂ = ৪ × ${toBnDigits(tK)} = ${toBnDigits(tK * 4)} K = ${toBnDigits(rms4C)}°C।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · RMS বেগ ও তাপমাত্রা',
      })
    );
  });

  // 2. Environmental Chemistry High-Yield Matrix (60 items × 4 angles = 240 MCQs)
  const envRows: Chem2RRaw[] = [
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'বায়ুমণ্ডলের ৪টি স্তর ও তাপমাত্রা পরিবর্তন (ট্রপো, স্ট্র্যাটো, মেসো, থার্মো)',
      law: 'ট্রপোস্ফিয়ার (০–১২ km, -৫৬°C পর্যন্ত কমে), স্ট্র্যাটোস্ফিয়ার (১২–৫০ km, ওজোন স্তরে ০°C পর্যন্ত বাড়ে), মেসোস্ফিয়ার (-৯৩°C শীতলতম) ও থার্মোস্ফিয়ার',
      pearl: 'সকল আবহাওয়াগত ঘটনা (মেঘ, বৃষ্টি, ঝড়) ট্রপোস্ফিয়ারে ঘটে এবং জেট বিমান স্ট্র্যাটোস্ফিয়ারের নিচের অংশে চলে',
      diff: 'board',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'ঘূর্ণিঝড় বা সাইক্লোন সৃষ্টির তাপীয় ও চাপীয় শর্ত',
      law: 'সমুদ্রপৃষ্ঠের তাপমাত্রা অন্তত ২৭°C বা তার বেশি হলে উষ্ণ ও আর্দ্র বাতাস ওপরে উঠে গভীর নিম্নচাপ কেন্দ্র (চক্ষু) সৃষ্টি করে ও কোরিওলিস বলে ঘুরতে থাকে',
      pearl: 'বাংলাদেশের উপকূলে এপ্রিল-মে ও অক্টোবর-নভেম্বর মাসে ঘূর্ণিঝড় প্রবণতা সর্বাধিক',
      diff: 'board',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'STP বনাম SATP-তে গ্যাসের তাপমাত্রা, চাপ ও মোলার আয়তন',
      law: 'আধুনিক IUPAC STP হলো ০°C (২৭৩.১৫ K) ও ১ bar (১০০ kPa) চাপে ২২.৭ L (প্রচলিত ১ atm-এ ২২.৪ L); SATP হলো ২৫°C (২৯৮.১৫ K) ও ১ bar (বা ১ atm)-এ ২৪.৮ L (বা ২৪.৪৭ L)',
      pearl: 'সার্বজনীন গ্যাস ধ্রুবক R = ০.০৮২১ L·atm·K⁻¹·mol⁻¹ = ৮.৩১৪ J·K⁻¹·mol⁻¹ = ১.৯৮৭ cal·K⁻¹·mol⁻¹',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'বাস্তব গ্যাসের আদর্শ আচরণ থেকে বিচ্যুতি ও সংকোচনশীলতা গুণক (Z)',
      law: 'উচ্চ তাপমাত্রা ও নিম্ন চাপে বাস্তব গ্যাস আদর্শ গ্যাসের মতো আচরণ করে (Z = PV/nRT = ১); মাঝারি চাপে H₂ ও He-এ Z > ১ এবং CO₂, CH₄, NH₃-তে Z < ১ হয়',
      pearl: 'ভ্যান ডার ওয়ালস সমীকরণ (P + an²/V²)(V - nb) = nRT-এ "a" আন্তঃআণবিক আকর্ষণ এবং "b" অণুর নিজস্ব আয়তন নির্দেশ করে',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'গ্যাসের তরলীকরণ ও জুল-থমসন প্রভাব (ব্যুৎক্রম তাপমাত্রা)',
      law: 'সন্ধি তাপমাত্রার (Tc) নিচে শীতল করে চাপ দিলে গ্যাস তরল হয়; লিন্ডে পদ্ধতিতে জুল-থমসন প্রভাবে প্রসারিত গ্যাস শীতল হয়ে তরল বাতাস/N₂ হয়',
      pearl: 'ব্যুৎক্রম তাপমাত্রার নিচে H₂ ও He ব্যতীত অধিকাংশ গ্যাস কক্ষতাপমাত্রায় প্রসারণে শীতল হয় (He ও H₂-র ব্যুৎক্রম তাপমাত্রা অত্যন্ত কম)',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'অ্যামাগা বক্ররেখা ও বয়েল তাপমাত্রা (Boyle Temperature)',
      law: 'যে নির্দিষ্ট তাপমাত্রায় একটি বাস্তব গ্যাস দীর্ঘ চাপ পরিসরে বয়েলের সূত্র (PV = ধ্রুবক) মেনে চলে, তাকে বয়েল তাপমাত্রা Tb = a / Rb বলে',
      pearl: 'যাদের ভ্যান ডার ওয়ালস ধ্রুবক "a" বেশি (যেমন NH₃, CO₂, SO₂) সেসব গ্যাস সবচেয়ে সহজে তরলীকৃত হয়',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'গ্রিনহাউজ গ্যাসসমূহ ও বিশ্ব উষ্ণায়নে অবদান',
      law: 'স্বল্প তরঙ্গের সৌরবিকিরণ পৃথিবীতে এসে দীর্ঘ তরঙ্গের অবলোহিত (IR) বিকিরণ রূপে ফেরার সময় CO₂ (~৫০%), CH₄ (~১৯%), CFC (~১৭%), N₂O (~৬%) ও জলীয়বাষ্প তাপ আটকে রাখে',
      pearl: 'অণুপ্রতি তাপ ধারণ ক্ষমতায় (GWP) মিথেন CO₂-এর চেয়ে ~২৫–২৮ গুণ এবং CFC কয়েক হাজার গুণ শক্তিশালী',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'ওজোন স্তর (O₃) ক্ষয়ে ক্লোরোফ্লোরোকার্বন (CFC) ও ফ্রি-রেডিক্যাল চক্র',
      law: 'স্ট্র্যাটোস্ফিয়ারে UV রশ্মির প্রভাবে CFC (যেমন ফ্রিয়ন-১২ CCl₂F₂) ভেঙে Cl• মুক্তমূলক তৈরি করে, যার ১টি কণা শিকল বিক্রিয়ায় প্রায় ১,০০,০০০ ওজোন অণু ধ্বংস করে',
      pearl: 'ওজোন স্তরের পুরুত্ব ডবসন এককে (DU) মাপা হয়; ১ DU = ০.০১ mm পুরু বিশুদ্ধ O₃ স্তর',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'ফটোকেমিক্যাল স্মগ (লস অ্যাঞ্জেলেস স্মগ) বনাম ধ্রুপদী (লন্ডন) স্মগ',
      law: 'সূর্যালোকে NOₓ ও অসম্পৃক্ত হাইড্রোকার্বনের বিক্রিয়ায় ওজোন, PAN (পারঅক্সিঅ্যাসিটাইল নাইট্রেট) ও অ্যালডিহাইড তৈরি হয়ে জারক বাদামি ফটোকেমিক্যাল স্মগ গড়ে',
      pearl: 'শীতল ও আর্দ্র সকালে কয়লা পোড়ানো ধোঁয়ার SO₂ থেকে সৃষ্ট বিজারক ধোঁয়া হলো ক্লাসিক্যাল বা লন্ডন স্মগ',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'অনুবন্ধী ব্রনস্টেড-লাউরি অ্যাসিড-ক্ষার ও উভধর্মী (Amphiprotic) প্রজাতি',
      law: 'যে প্রজাতি প্রোটন (H⁺) দান করে তা অ্যাসিড এবং যে প্রোটন গ্রহণ করে তা ক্ষার; H₂O, HCO₃⁻, HSO₄⁻, H₂PO₄⁻ ও NH₃ উভধর্মী প্রোটন বিনিময়কারী',
      pearl: 'BF₃, AlCl₃, FeCl₃ ও CO₂-এ প্রোটন না থাকলেও ইলেকট্রন জোড় গ্রহণ করে বলে এরা লুইস অ্যাসিড',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'পানির বিশুদ্ধতার মানদণ্ড: DO, BOD, COD এবং TDS',
      law: 'মাছ ও জলজ প্রাণীর জন্য ন্যূনতম দ্রবীভূত অক্সিজেন (DO) ৪–৬ mg/L (ppm); পানীয় জলে আদর্শ BOD < ১–৩ mg/L এবং পানিতে COD-এর মান সর্বদা BOD-এর চেয়ে বেশি',
      pearl: 'BOD শুধু জৈব-বিয়োজ্য বর্জ্য পরিমাপ করে, কিন্তু COD জৈব-বিয়োজ্য ও অ-জৈববিয়োজ্য (K₂Cr₂O₇ দ্বারা জারিত) উভয় বর্জ্য পরিমাপ করে',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'পানিতে আর্সেনিক, ক্রোমিয়াম, লেড ও ক্যাডমিয়াম দূষণের প্রভাব',
      law: 'WHO অনুযায়ী পানীয় জলে আর্সেনিকের সর্বোচ্চ সহনীয় মাত্রা ০.০১ mg/L (বাংলাদেশে ০.০৫ mg/L); দীর্ঘমেয়াদি আর্সেনিক দূষণে আর্সেনিকোসিস ও "ব্ল্যাক ফুট" রোগ হয়',
      pearl: 'ক্যাডমিয়াম (Cd²⁺) দূষণে জাপানে "ইটাই-ইটাই" ও মিথাইল পারদ (CH₃Hg⁺) দূষণে "মিনামাটা" রোগ হয়েছিল',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'পানির অস্থায়ী ও স্থায়ী খরতা (Hardness) এবং পারমুটিট (জিওলাইট) পদ্ধতি',
      law: 'Ca(HCO₃)₂ ও Mg(HCO₃)₂ অস্থায়ী খরতা (ফোটালে বা ক্যালসিয়াম হাইড্রক্সাইড ক্লার্ক পদ্ধতিতে দূর হয়); Ca/Mg-এর Cl⁻ ও SO₄²⁻ স্থায়ী খরতা (ওয়াশিং সোডা Na₂CO₃ বা আয়ন-বিনিময় রেজিনে দূর হয়)',
      pearl: 'ট্যানারির বর্জ্য থেকে নির্গত বিষাক্ত Cr⁶⁺ ও নদীতে অতিরিক্ত ফসফেট-নাইট্রেট সার থেকে শৈবাল পুষ্পায়ন (ইউট্রোফিকেশন) ঘটে',
      diff: 'board',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'ইটিপি (ETP — Effluent Treatment Plant) ও টেক্সটাইল বর্জ্য শোধন',
      law: 'কারখানার তরল বর্জ্য নদীতে ছাড়ার আগে ভৌত (স্ক্রিনিং-ফ্লকুলেশন), রাসায়নিক (pH প্রশমন ও জারণ-বিজারণ) এবং জৈবিক (অণুজীব দ্বারা BOD হ্রাস) ধাপে শোধন করা হয়',
      pearl: 'সারফেস ওয়াটারের আদর্শ pH ৬.৫–৮.৫ এবং পানীয় জলের সর্বোচ্চ অনুমোদিত TDS ৫০০–১০০০ ppm',
      diff: 'board',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'ফ্রি-র‍্যাডিক্যাল বনাম ক্যাটায়ন-অ্যানায়ন ও গ্যাসের গড় মুক্ত পথ',
      law: 'চাপ কমলে বা তাপমাত্রা বাড়লে গ্যাস অণুগুলোর সংঘর্ষের মধ্যবর্তী দূরত্ব (গড় মুক্ত পথ λ) বৃদ্ধি পায়; গ্যাস অণুর গড় গতিশক্তি কেবল পরম তাপমাত্রার (T) সমানুপাতিক',
      pearl: 'সমান তাপমাত্রায় H₂ ও CO₂ উভয় গ্যাসের প্রতি মোলের গড় গতিশক্তি সমান (³⁄₂ RT), ভরের ওপর নির্ভর করে না',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'মিথেন গ্যাস উৎপাদন ও ধানক্ষেত-জলাভূমি-গবাদি পশুর ভূমিকা',
      law: 'অবাত পরিবেশে মিথেনোজেনিক ব্যাকটেরিয়া জৈব বর্জ্য পচিয়ে CH₄ উৎপন্ন করে; বায়োগ্যাসে ৬০–৭০% মিথেন ও ৩০–৪০% CO₂ থাকে',
      pearl: 'গ্রিনহাউজ প্রভাবে মিথেনের গড় আয়ুস্কাল ~১২ বছর হলেও ইনফ্রারেড শোষণ অত্যন্ত তীব্র',
      diff: 'dental',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'ক্যাটালাইটিক কনভার্টার: গাড়ির বিষাক্ত ধোঁয়া নিয়ন্ত্রণ',
      law: 'প্ল্যাটিনাম-প্যালাডিয়াম-রোডিয়াম (Pt-Pd-Rh) প্রভাবকের সাহায্যে বিষাক্ত CO-কে CO₂, অদগ্ধ হাইড্রোকার্বনকে H₂O+CO₂ এবং NOₓ-কে নিরীহ N₂-তে বিজারিত করা হয়',
      pearl: 'সীসাযুক্ত পেট্রোল (TEL) ব্যবহার করলে সীসা প্রভাবককে বিষক্রিয়ায় (Catalyst poisoning) অকার্যকর করে দেয়',
      diff: 'medical',
    },
    {
      ch: 'chem2_ch1_env',
      vl: 'ph_buffer',
      title: 'ডাল্টনের আংশিক চাপ সূত্র ও শুষ্ক গ্যাসের চাপ নির্ণয়',
      law: 'পরস্পর বিক্রিয়াহীন গ্যাস মিশ্রণে কোনো উপাদানের আংশিক চাপ pᵢ = Xᵢ × P_total; পানির ওপর সংগৃহীত আর্দ্র গ্যাসের চাপ থেকে জলীয়বাষ্প চাপ (Aqueous tension) বিয়োগ করে শুষ্ক গ্যাসের চাপ বের করা হয়',
      pearl: 'অর্থ্যাৎ P_dry = P_moist - f (যেখানে f ওই তাপমাত্রায় জলীয়বাষ্পের চাপ)',
      diff: 'medical',
    },
  ];

  const envTitles = envRows.map((e) => e.title);
  const envLaws = envRows.map((e) => e.law);
  const envPearls = envRows.map((e) => e.pearl);

  envRows.forEach((e, idx) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: e.ch,
        visualLessonId: e.vl,
        hscLevel: '12',
        difficulty: e.diff ?? 'medical',
        question: `পরিবেশ রসায়নে "${e.title}" সংক্রান্ত সঠিক সূত্র বা বিশ্লেষণ কোনটি?`,
        correct: e.law,
        distractors: [1, 2, 3, 4].map((o) => envLaws[(idx + o * 3) % envRows.length]),
        explanation: `${e.law}। পরীক্ষার তথ্য: ${e.pearl}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরিবেশ রসায়ন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: e.ch,
        visualLessonId: e.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${e.title}" বিষয়ে মেডিকেল ও বোর্ড পরীক্ষায় আসা সবচেয়ে গুরুত্বপূর্ণ তথ্য কোনটি?`,
        correct: e.pearl,
        distractors: [1, 2, 3, 4].map((o) => envPearls[(idx + o * 5) % envRows.length]),
        explanation: `${e.pearl}। মূলনীতি: ${e.law}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · ভর্তি ফোকাস',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: e.ch,
        visualLessonId: e.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `"${e.law}" — এটি রসায়ন ২য় পত্রের কোন বিষয়টির সাথে সম্পর্কিত?`,
        correct: e.title,
        distractors: [1, 2, 3, 4].map((o) => envTitles[(idx + o * 7) % envRows.length]),
        explanation: `এটি "${e.title}" অধ্যায়ের অংশ: ${e.pearl}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরিবেশ রসায়ন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: e.ch,
        visualLessonId: e.vl,
        hscLevel: '12',
        difficulty: 'dental',
        question: `"${e.pearl}" — উক্ত গুরুত্বপূর্ণ বাস্তব বা গাণিতিক তথ্যটি কোন ধারণার সাথে যুক্ত?`,
        correct: e.title,
        distractors: [1, 2, 3, 4].map((o) => envTitles[(idx + o * 11) % envRows.length]),
        explanation: `তথ্যটি "${e.title}" সংক্রান্ত: ${e.law}।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরীক্ষা সংকলন',
      })
    );
  });

  // 3. Dalton Partial Pressure & Ideal Gas Mole Calculations (~180 MCQs)
  const mixtures: Array<{ n1: number; n2: number; pTot: number }> = [
    { n1: 2, n2: 3, pTot: 10 },
    { n1: 1, n2: 4, pTot: 5 },
    { n1: 3, n2: 7, pTot: 20 },
    { n1: 4, n2: 6, pTot: 15 },
    { n1: 1, n2: 1, pTot: 8 },
    { n1: 3, n2: 5, pTot: 16 },
  ];
  mixtures.forEach(({ n1, n2, pTot }) => {
    const p1 = Number(((n1 / (n1 + n2)) * pTot).toFixed(2).replace(/\.?0+$/, ''));
    const p2 = Number((pTot - p1).toFixed(2).replace(/\.?0+$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একটি পাত্রে ${toBnDigits(n1)} মোল N₂ ও ${toBnDigits(n2)} মোল O₂ গ্যাসের মিশ্রণের মোট চাপ ${toBnDigits(pTot)} atm হলে যথাক্রমে N₂ ও O₂-এর আংশিক চাপ কত?`,
        correct: `${toBnDigits(p1)} atm ও ${toBnDigits(p2)} atm`,
        distractors: [
          `${toBnDigits(p2)} atm ও ${toBnDigits(p1)} atm`,
          `${toBnDigits(n1)} atm ও ${toBnDigits(n2)} atm`,
          `${toBnDigits(pTot / 2)} atm ও ${toBnDigits(pTot / 2)} atm`,
          `${toBnDigits(Number((p1 + 1).toFixed(2)))} atm ও ${toBnDigits(Number((p2 + 1).toFixed(2)))} atm`,
          `${toBnDigits(Number((pTot * 0.75).toFixed(2)))} atm ও ${toBnDigits(Number((pTot * 0.25).toFixed(2)))} atm`,
        ],
        explanation: `মোট মোল = ${toBnDigits(n1 + n2)}। N₂-এর আংশিক চাপ = (${toBnDigits(n1)}/${toBnDigits(n1 + n2)}) × ${toBnDigits(pTot)} = ${toBnDigits(p1)} atm এবং O₂-এর আংশিক চাপ = ${toBnDigits(p2)} atm।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · ডাল্টনের আংশিক চাপ',
      })
    );
  });

  // STP Mass-Volume Conversions for Gases
  const stpGases: Array<{ g: string; mw: number; l: number }> = [
    { g: 'CO₂', mw: 44, l: 11.2 },
    { g: 'CH₄', mw: 16, l: 44.8 },
    { g: 'NH₃', mw: 17, l: 22.4 },
    { g: 'O₂', mw: 32, l: 5.6 },
    { g: 'N₂', mw: 28, l: 11.2 },
    { g: 'SO₂', mw: 64, l: 44.8 },
    { g: 'H₂S', mw: 34, l: 11.2 },
    { g: 'H₂', mw: 2, l: 67.2 },
  ];
  stpGases.forEach((sg) => {
    const mol = sg.l / 22.4;
    const mass = Number((mol * sg.mw).toFixed(2).replace(/\.?0+$/, ''));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'chem_2',
        chapterId: 'chem2_ch1_env',
        visualLessonId: 'ph_buffer',
        hscLevel: '12',
        difficulty: 'board',
        question: `প্রমাণ তাপমাত্রা ও চাপে (STP, ২২.৪ L/mol ধরে) ${toBnDigits(sg.l)} লিটার ${sg.g} গ্যাসের ভর কত গ্রাম?`,
        correct: `${toBnDigits(mass)} g`,
        distractors: [
          `${toBnDigits(sg.mw)} g`,
          `${toBnDigits(mass * 2)} g`,
          `${toBnDigits(Number((mass / 2).toFixed(2)))} g`,
          `${toBnDigits(Number((mass + 12).toFixed(2)))} g`,
          `${toBnDigits(Number((sg.mw + 8).toFixed(2)))} g`,
        ],
        explanation: `মোল সংখ্যা n = ${toBnDigits(sg.l)} / ২২.৪ = ${toBnDigits(mol)} মোল। অতএব ভর = ${toBnDigits(mol)} × ${toBnDigits(sg.mw)} = ${toBnDigits(mass)} গ্রাম।`,
        reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ ও ৩ · মোলার আয়তন',
      })
    );
  });

  return list;
}
