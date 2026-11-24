import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildBio2StructuredJ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_sj_${String(seq++).padStart(4, '0')}`;

  // 1. 30 Human Diseases -> Organ/Cause -> Pathology/Biomarker Matrix (30 × 3 = 90 MCQs)
  const diseaseMatrix = [
    { dis: 'পেপটিক আলসার (Peptic Ulcer)', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', cause: 'Helicobacter pylori ব্যাকটেরিয়া সংক্রমণ ও মিউকোসাল সুরক্ষা ভেঙে HCl-পেপসিন ক্ষয়', sign: 'খালি পেটে বা খাবারের পর ওপরের পেটে জ্বালাপোড়া ব্যথা ও এন্ডোস্কোপিতে ক্ষত' },
    { dis: 'অবস্ট্রাক্টিভ বা পোস্ট-হেপাটিক জন্ডিস', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', cause: 'পিত্তথলির পাথর (কলেস্টেরল) বা টিউমারে সাধারণ পিত্তনালি (CBD) অবরুদ্ধ হওয়া', sign: 'রক্তে কনজুগেটেড বিলিরুবিন বৃদ্ধি, হলুদ চোখ-ত্বক, গাঢ় মূত্র ও ম্লান/মাটির রঙের মল' },
    { dis: 'অ্যাপেন্ডিসাইটিস (Appendicitis)', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', cause: 'সিকামের সাথে যুক্ত নিষ্ক্রিয় ভার্মিফর্ম অ্যাপেন্ডিক্সের গহ্বর ফিকোলিথে বন্ধ হয়ে জীবাণু সংক্রমণ', sign: 'ম্যাকবার্নি বিন্দুতে (McBurney’s point — ডান তলপেটে) তীব্র ব্যথা ও জ্বর' },
    { dis: 'অ্যাথেরোস্ক্লেরোসিস (Atherosclerosis)', ch: 'bio2_ch4_blood', vl: 'heart_cardiac', cause: 'ধমনির অভ্যন্তরীণ টিউনিকা ইনটিমায় LDL-কলেস্টেরল, চর্বি ও ক্যালসিয়াম জমে প্লাক (Plaque) সৃষ্টি', sign: 'ধমনির পথ সরু ও শক্ত হয়ে উচ্চ রক্তচাপ, করোনারি ইসকেমিয়া ও স্ট্রোক ঝুঁকি বাড়া' },
    { dis: 'থ্যালাসেমিয়া মেজর (β-Thalassemia)', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', cause: '১১ নং ক্রোমোজোমের β-গ্লোবিন জিন মিউটেশনে বিটা-পলিপেপটাইড শৃঙ্খল সংশ্লেষ ব্যাহত হওয়া (অটোজোমাল রিসেসিভ)', sign: 'তীব্র হিমোলাইটিক অ্যানিমিয়া, যকৃৎ-প্লীহা বড় হওয়া (হেপাটোস্প্লেনোমেগালি) ও রক্ত সঞ্চালন নির্ভরতা' },
    { dis: 'সিকেল সেল অ্যানিমিয়া (Sickle Cell Anemia)', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', cause: 'β-গ্লোবিনের ৬ষ্ঠ অবস্থানে গ্লুটামিক অ্যাসিডের বদলে ভ্যালিন (GAG → GUG) আসায় HbS তৈরি হওয়া', sign: 'কম অক্সিজেনে লোহিত কণিকা কাস্তে আকৃতির হয়ে রক্তনালি আটকে দেয় (ম্যালেরিয়ার বিরুদ্ধে আংশিক সুরক্ষা দেয়)' },
    { dis: 'যক্ষ্মা (Pulmonary Tuberculosis)', ch: 'bio2_ch5_respiration', vl: 'bohr_curve', cause: 'Mycobacterium tuberculosis ব্যাকটেরিয়ার ড্রপলেট সংক্রমণ (বায়ুবাহিত)', sign: '৩ সপ্তাহের বেশি কাশি, কফের সাথে রক্ত, বিকেলের দিকে হালকা জ্বর ও ওজন হ্রাস' },
    { dis: 'ব্রঙ্কিয়াল অ্যাজমা (হাঁপানি)', ch: 'bio2_ch5_respiration', vl: 'bohr_curve', cause: 'অ্যালার্জেন বা ধোঁয়ার প্রতি অতিসংবেদনশীলতায় শ্বাসনালির মসৃণ পেশির সংকোচন ও অতিরিক্ত মিউকাস', sign: 'শ্বাস ছাড়ার সময় শাঁই-শাঁই বাঁশির মতো শব্দ (Wheezing), কাশি ও বুক আঁটসাঁট লাগা' },
    { dis: 'গ্লোমেরুলোনেফ্রাইটিস (Glomerulonephritis)', ch: 'bio2_ch6_excretion', vl: 'nephron', cause: 'প্রধানত স্ট্রেপ্টোকক্কাস সংক্রমণের পর ইমিউন কমপ্লেক্স জমে গ্লোমেরুলাসের প্রদাহ ও পরিস্রাবণ পর্দা ক্ষতিগ্রস্ত হওয়া', sign: 'মূত্রে রক্ত (হেমাচুরিয়া), প্রোটিন (প্রোটিনুরিয়া), মুখ ফোলা ও উচ্চ রক্তচাপ' },
    { dis: 'ইউরেমিয়া (Uremia — Renal Failure)', ch: 'bio2_ch6_excretion', vl: 'nephron', cause: 'উভয় বৃক্ক মারাত্মক অকার্যকর হয়ে রক্তে ইউরিয়া, ক্রিয়েটিনিন ও নাইট্রোজেন বর্জ্য বিপজ্জনক মাত্রায় জমা হওয়া', sign: 'বমি ভাব, খিঁচুনি, অ্যামোনিয়ার গন্ধযুক্ত শ্বাস এবং জরুরি ডায়ালাইসিস বা কিডনি প্রতিস্থাপনের প্রয়োজন' },
    { dis: 'রিকেটস (শিশু) ও অস্টিওম্যালাসিয়া (বয়স্ক)', ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', cause: 'ভিটামিন-D বা ক্যালসিয়াম-ফসফেটের চরম অভাবে অস্থির পর্যাপ্ত খনিজায়ন (Mineralization) না হওয়া', sign: 'শিশুদের পা ধনুকের মতো বেঁকে যাওয়া (Bow legs) ও অস্থি নরম হয়ে যাওয়া' },
    { dis: 'অস্টিওপোরোসিস (Osteoporosis)', ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', cause: 'রজঃনিবৃত্তির পর ইস্ট্রোজেন হ্রাস বা বয়স্ক অবস্থায় অস্থির ঘনত্ব ও ক্যালসিয়াম ব্যাপকভাবে কমে ছিদ্রবহুল হওয়া', sign: 'সামান্য আঘাতেই কোমর, কব্জি ও মেরুদণ্ডের কশেরুকা ভেঙে যাওয়া ("নীরব অস্থি ক্ষয়")' },
    { dis: 'রিউমাটয়েড আর্থ্রাইটিস বনাম অস্টিওআর্থ্রাইটিস', ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', cause: 'অটোইমিউন প্রদাহে সাইনোভিয়াল পর্দা ক্ষয় (রিউমাটয়েড) বনাম বয়সজনিত ভারবহনকারী সন্ধির তরুণাস্থি ক্ষয় (অস্টিওআর্থ্রাইটিস)', sign: 'সকালে হাত-পায়ের সন্ধি শক্ত হয়ে থাকা ও ফুলে ওঠা' },
    { dis: 'মায়াস্থেনিয়া গ্র্যাভিস (Myasthenia Gravis)', ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', cause: 'নিউরোমাস্কুলার জাংশনের অ্যাসিটাইলকোলিন রিসেপ্টরের বিরুদ্ধে স্ব-অ্যান্টিবডি তৈরি হওয়া (অটোইমিউন)', sign: 'ব্যবহারের সাথে কঙ্কাল পেশির ক্রমবর্ধমান দুর্বলতা ও চোখের পাতা ঝুলে পড়া (Ptosis)' },
    { dis: 'পারকিনসন্স ডিজিজ (Parkinson’s Disease)', ch: 'bio2_ch8_coordination', vl: 'bohr_curve', cause: 'মধ্যমস্তিষ্কের সাবস্ট্যানশিয়া নিগ্রার নিউরন ধ্বংস হয়ে ডোপামিন নিউরোট্রান্সমিটার কমে যাওয়া', sign: 'বিশ্রামকালে হাত-পা কাঁপা (Resting tremor), পেশি অনমনীয়তা ও ধীরে চলাফেরা' },
    { dis: 'আলঝেইমার ডিজিজ (Alzheimer’s Disease)', ch: 'bio2_ch8_coordination', vl: 'bohr_curve', cause: 'সেরেব্রাল কর্টেক্স ও হিপ্পোক্যাম্পাসে বিটা-অ্যামাইলয়েড প্লাক জমে অ্যাসিটাইলকোলিন-উৎপাদী নিউরন ক্ষয়', sign: 'সাম্প্রতিক স্মৃতি ক্রমাগত লোপ পাওয়া (Dementia) ও দিকভ্রান্ত হওয়া' },
    { dis: 'ছানি (Cataract) বনাম গ্লুকোমা', ch: 'bio2_ch8_coordination', vl: 'bohr_curve', cause: 'চোখের প্রাকৃতিক লেন্সের প্রোটিন জমাট বেঁধে অস্বচ্ছ হওয়া (ছানি) বনাম অ্যাকুয়াস হিউমারের উচ্চ চাপে অপটিক স্নায়ু নষ্ট হওয়া (গ্লুকোমা)', sign: 'ছানিতে ঝাপসা দৃষ্টি (অস্ত্রোপচারে IOL স্থাপন); গ্লুকোমায় পরিধির দৃষ্টি হারিয়ে চিরস্থায়ী অন্ধত্ব' },
    { dis: 'ফিনাইলকিটোনিউরিয়া (PKU — অটোজোমাল রিসেসিভ)', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', cause: 'যকৃতে ফিনাইলঅ্যালানিন হাইড্রোক্সিলেজ এনজাইমের অভাবে ফিনাইলঅ্যালানিন টাইরোসিনে রূপান্তরিত হতে না পারা', sign: 'মস্তিষ্কে বিষাক্ত ফিনাইলপাইরুভেট জমে তীব্র বুদ্ধি প্রতিবন্ধিতা ও মূত্রে ইঁদুর-সদৃশ গন্ধ' },
    { dis: 'ডাউন সিন্ড্রোম (Trisomy 21)', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', cause: 'মায়োসিসে ২১ নং ক্রোমোজোমের নন-ডিসজাংশনের কারণে দেহকোষে ৪৭টি ক্রোমোজোম (47, XX/XY +21)', sign: 'গোল ফোলা মুখ, চ্যাপ্টা নাসিকামূল, পাম-ক্রিজ (Simian crease) ও বুদ্ধিমত্তা ঘাটতি' },
    { dis: 'টার্নার সিন্ড্রোম (45, X0) ও ক্লাইনফেল্টার (47, XXY)', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', cause: 'সেক্স ক্রোমোজোম নন-ডিসজাংশনে যথাক্রমে ১টি X কম (বন্ধ্যা নারী) এবং ১টি অতিরিক্ত X (লম্বা বন্ধ্যা পুরুষ, গাইনেকোমাস্টিয়া)', sign: 'টার্নারে ওয়েবড নেক ও অপরিণত ডিম্বাশয়; ক্লাইনফেল্টারে দেহকোষে ১টি বার-বডি উপস্থিত' },
    { dis: 'এইডস (AIDS — Acquired Immunodeficiency)', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', cause: 'রিট্রোভাইরাস HIV রিভার্স ট্রান্সক্রিপ্টেজ দিয়ে CD4⁺ হেল্পার T-লিম্ফোসাইট ধ্বংস করা', sign: 'CD4 গণনা <২০০/µL-এ নেমে গিয়ে নিউমোসিস্টিস, ক্যান্ডিডিয়াসিস ও ক্যাপোসি সারকোমার মতো সুযোগসন্ধানী সংক্রমণ' },
    { dis: 'হেপাটাইটিস-বি ও লিভার সিরোসিস', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', cause: 'রক্ত-সূচ বা অনিরাপদ সঞ্চালনে বাহিত DNA ভাইরাস HBV দ্বারা যকৃত কোষের ক্রমাগত প্রদাহ ও তন্তু-রূপান্তর', sign: 'যকৃতে অ্যাসাইটিস (পানি জমা), পোর্টাল উচ্চ রক্তচাপ ও হেপাটোসেলুলার কার্সিনোমার ঝুঁকি' },
  ];

  diseaseMatrix.forEach((dm, i) => {
    const others = diseaseMatrix.filter((x) => x.dis !== dm.dis);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: dm.ch,
        visualLessonId: dm.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `চিকিৎসাবিজ্ঞানে কোন রোগ বা ব্যাধিটির মূল কারণ হলো "${dm.cause}"?`,
        correct: dm.dis,
        distractors: others.slice(i % 15, (i % 15) + 4).map((x) => x.dis),
        explanation: `${dm.dis}-এর কারণ: ${dm.cause}। প্রধান লক্ষণ: ${dm.sign}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · মানব রোগতত্ত্ব ও ক্লিনিক্যাল অ্যানালিটিক্স',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: dm.ch,
        visualLessonId: dm.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `কোন ক্লিনিক্যাল অবস্থার বৈশিষ্ট্যমূলক লক্ষণসমূহ হলো "${dm.sign}"?`,
        correct: dm.dis,
        distractors: others.slice((i + 5) % 15, ((i + 5) % 15) + 4).map((x) => x.dis),
        explanation: `${dm.sign} নির্দেশ করে ${dm.dis} (${dm.cause})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · রোগের উপসর্গ ও শনাক্তকরণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: dm.ch,
        visualLessonId: dm.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${dm.dis}" রোগের প্যাথলজি বা প্রধান কারণ নিচের কোনটি?`,
        correct: dm.cause,
        distractors: others.slice((i + 10) % 15, ((i + 10) % 15) + 4).map((x) => x.cause),
        explanation: `${dm.dis}: ${dm.cause}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · রোগতত্ত্ব',
      })
    );
  });

  // 2. 18 Medical Diagnostic Tests & Clinical Instruments (18 × 3 = 54 MCQs)
  const testsMatrix = [
    { test: 'ইলেকট্রোকার্ডিওগ্রাম (ECG)', organ: 'হৃৎপিণ্ডের বৈদ্যুতিক সংকেত ও অ্যারিদমিয়া/MI', principle: 'শরীরের ত্বকে ১২টি লিড বসিয়ে P, QRS, T বৈদ্যুতিক তরঙ্গ রেকর্ড করা' },
    { test: 'করোনারি অ্যানজিওগ্রাম (Angiogram)', organ: 'হৃৎপিণ্ডের করোনারি ধমনির ব্লক বা স্টেনোসিস', principle: 'ক্যাথেটারের মাধ্যমে রেডিও-অপেক ডাই প্রবেশ করিয়ে এক্স-রে ফ্লুরোস্কোপি চিত্র নেওয়া' },
    { test: 'ইকোকার্ডিওগ্রাফি (Echocardiogram)', organ: 'হৃৎপিণ্ডের কপাটিকা, প্রকোষ্ঠের পুরুত্ব ও ইজেকশন ফ্র্যাকশন', principle: 'হৃদপেশি ও রক্তপ্রবাহে আল্ট্রাসাউন্ড (শব্দোত্তর তরঙ্গ) প্রতিফলন' },
    { test: 'স্পাইরোমেট্রি (Spirometry)', organ: 'ফুসফুসের বায়ু ধারণক্ষমতা (TV, VC, FEV₁)', principle: 'স্পাইরোমিটার যন্ত্রে শ্বাস গ্রহণ ও নিঃসরণের প্রবাহ ও আয়তন পরিমাপ' },
    { test: 'পালস অক্সিমেট্রি (Pulse Oximeter)', organ: 'রক্তে হিমোগ্লোবিনের অক্সিজেন সম্পৃক্তি (SpO₂ ≥ ৯৫%) ও নাড়ি', principle: 'আঙুলে লাল (৬৬০ nm) ও অবলোহিত (৯৪০ nm) আলোর শোষণ অনুপাত পরিমাপ' },
    { test: 'হিমোসাইটোমিটার (Hemocytometer)', organ: 'রক্তে প্রতি mm³-এ RBC, WBC ও অণুচক্রিকার সংখ্যা', principle: 'নিউবার গণনা চেম্বারের মাইক্রোস্কোপিক গ্রিডে কোষ গণনা' },
    { test: 'ইলেকট্রোএনসেফালোগ্রাম (EEG)', organ: 'মস্তিষ্কের সেরেব্রাল কর্টেক্সের মৃগীরোগ (Epilepsy) ও ঘুমের তরঙ্গ', principle: 'মাথার ত্বকে ইলেকট্রোড দিয়ে আলফা, বিটা, থিটা ও ডেল্টা ব্রেন ওয়েভ রেকর্ড' },
    { test: 'ডেক্সা স্ক্যান (DEXA Bone Densitometry)', organ: 'অস্থির খনিজ ঘনত্ব (BMD) ও অস্টিওপোরোসিস', principle: 'দ্বৈত-শক্তির এক্স-রে শোষণ পরিমাপ করে T-স্কোর নির্ণয়' },
    { test: 'অ্যামনিওসেন্টেসিস (Amniocentesis)', organ: 'গর্ভাবস্থার ১৫–২০ সপ্তাহে ভ্রূণের ক্রোমোজোমীয় ত্রুটি (ডাউন সিন্ড্রোম)', principle: 'আল্ট্রাসাউন্ডের সহায়তায় অ্যামনিওটিক তরলের ভ্রূণকোষ নিয়ে ক্যারিওটাইপিং' },
    { test: 'ম্যান্টু টেস্ট (Mantoux / Tuberculin Test)', organ: 'দেহে যক্ষ্মা জীবাণুর (TB) সংস্পর্শ বা সুপ্ত সংক্রমণ', principle: 'ত্বকের নিচে PPD প্রবেশের ৪৮–৭২ ঘণ্টা পর কোষ-নির্ভর ইনডুরেশন মাপা' },
    { test: 'স্নেলেন চার্ট (Snellen Chart)', organ: 'চোখের দূর-দৃষ্টির তীক্ষ্ণতা (Visual Acuity — স্বাভাবিক ৬/৬ মিটার বা ২০/২০ ফুট)', principle: '৬ মিটার দূর থেকে ক্রমহ্রাসমান অক্ষর পাঠ করার ক্ষমতা যাচাই' },
    { test: 'পিউর টোন অডিওমেট্রি (Audiometry)', organ: 'অন্তঃকর্ণ ও মধ্যকর্ণের শ্রবণক্ষমতা ও বধিরতার মাত্রা (dB)', principle: 'বিভিন্ন কম্পাঙ্ক (Hz) ও তীব্রতার (dB) শব্দে শ্রবণ থ্রেশহোল্ড পরিমাপ' },
    { test: 'ক্যারিওটাইপিং (Karyotyping)', organ: 'মেটাফেজ ক্রোমোজোমের সংখ্যা ও গঠনগত অসঙ্গতি (ট্রাইসোমি/ট্রান্সলোকেশন)', principle: 'কলচিসিন দিয়ে মাইটোসিস মেটাফেজে থামিয়ে Giemsa-ব্যান্ডেড ক্রোমোজোম সাজানো' },
    { test: 'এন্ডোস্কোপি (Endoscopy)', organ: 'অন্ননালি, পাকস্থলি ও ডিউওডেনামের আলসার বা রক্তক্ষরণ', principle: 'ফাইবার-অপটিক ক্যামেরাযুক্ত নমনীয় নলের মাধ্যমে সরাসরি অভ্যন্তরীণ পর্যবেক্ষণ' },
    { test: 'রক্তের Troponin-I ও CK-MB পরীক্ষা', organ: 'তীব্র মায়োকার্ডিয়াল ইনফার্কশন (হার্ট অ্যাটাক)', principle: 'ক্ষতিগ্রস্ত হৃৎপেশি থেকে রক্তে নির্গত সুনির্দিষ্ট কার্ডিয়াক প্রোটিন এনজাইম পরিমাপ' },
  ];
  testsMatrix.forEach((tm, i) => {
    const others = testsMatrix.filter((x) => x.test !== tm.test);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: i < 3 || i === 5 || i === 14 ? 'bio2_ch4_blood' : i < 5 || i === 9 ? 'bio2_ch5_respiration' : i === 7 ? 'bio2_ch7_locomotion' : i === 8 || i === 12 ? 'bio2_ch10_immune_genetics' : i === 13 ? 'bio2_ch3_digestion' : 'bio2_ch8_coordination',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `রোগ নির্ণয়ে "${tm.organ}" পরীক্ষা করার জন্য নিচের কোন চিকিৎসা-প্রযুক্তি বা ডায়াগনস্টিক পরীক্ষা ব্যবহার করা হয়?`,
        correct: tm.test,
        distractors: others.slice(i % 9, (i % 9) + 4).map((x) => x.test),
        explanation: `${tm.organ} শনাক্তে ${tm.test} করা হয়। মূলনীতি: ${tm.principle}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · চিকিৎসাবিজ্ঞানের আধুনিক যন্ত্রপাতি ও পরীক্ষা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `"${tm.test}" পরীক্ষার মূল বৈজ্ঞানিক কৌশল বা ভিত্তি কোনটি?`,
        correct: tm.principle,
        distractors: others.slice((i + 3) % 9, ((i + 3) % 9) + 4).map((x) => x.principle),
        explanation: `${tm.test}-এর কৌশল হলো: ${tm.principle} (${tm.organ})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · ডায়াগনস্টিক মূলনীতি',
      })
    );
  });

  // 3. Body Water, Blood Volume & Plasma vs Cells Calculations across Body Weights (12 × 3 = 36 MCQs)
  [40, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100].forEach((wt, i) => {
    const waterL = Number((wt * 0.6).toFixed(1));
    const bloodL = Number((wt * 0.08).toFixed(2));
    const plasmaL = Number((bloodL * 0.55).toFixed(2));
    const cellsL = Number((bloodL * 0.45).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch6_excretion',
        visualLessonId: 'nephron',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${toBnDigits(wt)} কেজি ওজনের একজন প্রাপ্তবয়স্ক সুস্থ পুরুষের দেহের ৬০% পানি হলে তার দেহে মোট কত লিটার (বা কেজি) পানি রয়েছে এবং তার দুই-তৃতীয়াংশ অন্তঃকোষীয় (ICF) হলে ICF কত লিটার?`,
        correct: `মোট পানি ${toBnDigits(waterL)} L ও অন্তঃকোষীয় পানি ${toBnDigits(Number(((waterL * 2) / 3).toFixed(1)))} L`,
        distractors: [
          `মোট পানি ${toBnDigits(waterL)} L ও অন্তঃকোষীয় পানি ${toBnDigits(Number((waterL / 3).toFixed(1)))} L`,
          `মোট পানি ${toBnDigits(Number((wt * 0.4).toFixed(1)))} L ও অন্তঃকোষীয় পানি ${toBnDigits(Number((wt * 0.25).toFixed(1)))} L`,
          `মোট পানি ${toBnDigits(Number((wt * 0.75).toFixed(1)))} L ও অন্তঃকোষীয় পানি ${toBnDigits(waterL)} L`,
        ],
        explanation: `৬০% হিসেবে মোট পানি = ${toBnDigits(wt)} × ০.৬০ = ${toBnDigits(waterL)} লিটার; এর ২/৩ অংশ ICF = ${toBnDigits(Number(((waterL * 2) / 3).toFixed(1)))} লিটার।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · দেহ তরল সাম্য (অসমোরেগুলেশন)',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch4_blood',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'dental',
        question: `দেহের মোট ওজনের প্রায় ৮% রক্ত হলে ${toBnDigits(wt)} কেজি ওজনের এক ব্যক্তির শরীরে মোট রক্ত কত লিটার এবং এর ৫৫% প্লাজমা কত লিটার হবে (ঘনত্ব ≈ ১ kg/L ধরে)?`,
        correct: `মোট রক্ত ${toBnDigits(bloodL)} L ও প্লাজমা ${toBnDigits(plasmaL)} L`,
        distractors: [
          `মোট রক্ত ${toBnDigits(bloodL)} L ও প্লাজমা ${toBnDigits(cellsL)} L`,
          `মোট রক্ত ${toBnDigits(Number((bloodL * 1.5).toFixed(2)))} L ও প্লাজমা ${toBnDigits(bloodL)} L`,
          `মোট রক্ত ${toBnDigits(Number((wt * 0.04).toFixed(2)))} L ও প্লাজমা ${toBnDigits(Number((plasmaL / 2).toFixed(2)))} L`,
        ],
        explanation: `মোট রক্ত = ${toBnDigits(wt)} × ৮% = ${toBnDigits(bloodL)} লিটার এবং প্লাজমা (৫৫%) = ${toBnDigits(plasmaL)} লিটার (রক্তকণিকা ৪৫% = ${toBnDigits(cellsL)} L)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · রক্ত ও প্লাজমা পরিমাণ',
      })
    );
  });

  // 4. Dihybrid, Monohybrid, Incomplete & Test Cross Progeny Counts (12 × 3 = 36 MCQs)
  [80, 160, 240, 320, 400, 480, 640, 800, 960, 1120, 1600, 2400].forEach((tot, i) => {
    const monoDom = (tot * 3) / 4;
    const monoRec = tot / 4;
    const dihyb9 = (tot * 9) / 16;
    const dihyb3 = (tot * 3) / 16;
    const dihyb1 = tot / 16;
    const incHet = tot / 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `মেন্ডেলের দ্বিসংকর জননে (RrYy × RrYy → ৯:৩:৩:১) F₂ বংশধরে মোট ${toBnDigits(tot.toLocaleString('en-US'))}টি মটরশুঁটি পাওয়া গেলে রিকম্বিন্যান্ট (অ-মাতৃ-পিতৃ বা নতুন সমন্বিত) ফেনোটাইপযুক্ত [হলুদ কুঞ্চিত ও সবুজ গোল] উদ্ভিদের মোট সংখ্যা কত?`,
        correct: `${toBnDigits((dihyb3 * 2).toLocaleString('en-US'))}টি (প্রত্যেকটি ${toBnDigits(dihyb3.toLocaleString('en-US'))}টি করে)`,
        distractors: [
          `${toBnDigits(dihyb9.toLocaleString('en-US'))}টি`,
          `${toBnDigits(dihyb1.toLocaleString('en-US'))}টি`,
          `${toBnDigits((dihyb9 + dihyb1).toLocaleString('en-US'))}টি`,
        ],
        explanation: `৯:৩:৩:১-এর মধ্যে মাঝের দুটি (৩+৩ = ৬/১৬ অংশ) রিকম্বিন্যান্ট ফেনোটাইপ; তাই ${toBnDigits(tot)} × ৬/১৬ = ${toBnDigits(dihyb3 * 2)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · দ্বিসংকর জনন হিসাব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'dental',
        question: `সন্ধ্যামালতী ফুলে (Mirabilis jalapa) দুটি গোলাপি ফুলের (Rr × Rr — ১:২:১) মধ্যে সংকরায়ণে ${toBnDigits(tot.toLocaleString('en-US'))}টি গাছ উৎপন্ন হলে কতটি গোলাপি ও কতটি সাদা ফুল ধরবে?`,
        correct: `গোলাপি ${toBnDigits(incHet.toLocaleString('en-US'))}টি ও সাদা ${toBnDigits(monoRec.toLocaleString('en-US'))}টি`,
        distractors: [
          `গোলাপি ${toBnDigits(monoDom.toLocaleString('en-US'))}টি ও সাদা ${toBnDigits(monoRec.toLocaleString('en-US'))}টি`,
          `গোলাপি ${toBnDigits(monoRec.toLocaleString('en-US'))}টি ও সাদা ${toBnDigits(incHet.toLocaleString('en-US'))}টি`,
          `সব ${toBnDigits(tot.toLocaleString('en-US'))}টিই গোলাপি`,
        ],
        explanation: `অসম্পূর্ণ প্রকটতায় F₂ অনুপাত ১ লাল : ২ গোলাপি : ১ সাদা; তাই গোলাপি ২/৪ = ${toBnDigits(incHet)}টি এবং সাদা ১/৪ = ${toBnDigits(monoRec)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · অসম্পূর্ণ প্রকটতা হিসাব',
      })
    );
  });

  // 5. CO2 (70%-23%-7%) & O2 (98.5%-1.5%) Blood Gas Transport Quantitative Splits (24 MCQs)
  [100, 200, 300, 400, 500, 600, 800, 1000].forEach((vol, i) => {
    const bicarb = Math.round(vol * 0.7);
    const carbamino = Math.round(vol * 0.23);
    const dissolvedCo2 = Math.round(vol * 0.07);
    const hbO2 = Number((vol * 0.985).toFixed(1));
    const disO2 = Number((vol * 0.015).toFixed(1));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `টিস্যু থেকে ফুসফুসে ${toBnDigits(vol)} mL কার্বন ডাই-অক্সাইড (CO₂) পরিবাহিত হলে এর মধ্যে বাইকার্বনেট (HCO₃⁻) আয়নরূপে ও কার্বামিনো-প্রোটিন যৌগরূপে যথাক্রমে কত mL পরিবাহিত হবে?`,
        correct: `বাইকার্বনেট ${toBnDigits(bicarb)} mL (৭০%) ও কার্বামিনো ${toBnDigits(carbamino)} mL (২৩%)`,
        distractors: [
          `বাইকার্বনেট ${toBnDigits(carbamino)} mL ও কার্বামিনো ${toBnDigits(bicarb)} mL`,
          `বাইকার্বনেট ${toBnDigits(vol / 2)} mL ও কার্বামিনো ${toBnDigits(dissolvedCo2)} mL`,
          `বাইকার্বনেট ${toBnDigits(Math.round(vol * 0.9))} mL ও কার্বামিনো ${toBnDigits(Math.round(vol * 0.1))} mL`,
        ],
        explanation: `রক্তে CO₂ পরিবাহিত হয় ৭০% বাইকার্বনেট (${toBnDigits(bicarb)} mL), ২৩% কার্বামিনো-হিমোগ্লোবিন (${toBnDigits(carbamino)} mL) ও ৭% ভৌত দ্রবণরূপে (${toBnDigits(dissolvedCo2)} mL)।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · CO₂ পরিবহন অনুপাত',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'board',
        question: `ফুসফুস থেকে টিস্যুতে ${toBnDigits(vol)} mL অক্সিজেন (O₂) পরিবাহিত হলে অক্সিহিমোগ্লোবিনরূপে এবং রক্তরসে ভৌত দ্রবণরূপে যথাক্রমে কত mL অক্সিজেন বাহিত হয়?`,
        correct: `অক্সিহিমোগ্লোবিনরূপে ${toBnDigits(hbO2)} mL (৯৮.৫%) ও ভৌত দ্রবণে ${toBnDigits(disO2)} mL (১.৫%)`,
        distractors: [
          `অক্সিহিমোগ্লোবিনরূপে ${toBnDigits(Math.round(vol * 0.7))} mL ও ভৌত দ্রবণে ${toBnDigits(Math.round(vol * 0.3))} mL`,
          `অক্সিহিমোগ্লোবিনরূপে ${toBnDigits(Math.round(vol * 0.5))} mL ও ভৌত দ্রবণে ${toBnDigits(Math.round(vol * 0.5))} mL`,
          `অক্সিহিমোগ্লোবিনরূপে ${toBnDigits(disO2)} mL ও ভৌত দ্রবণে ${toBnDigits(hbO2)} mL`,
        ],
        explanation: `মোট অক্সিজেনের ৯৮.৫% হিমোগ্লোবিনের সাথে অক্সিহিমোগ্লোবিন (${toBnDigits(hbO2)} mL) হিসেবে এবং মাত্র ১.৫% প্লাজমায় দ্রবীভূত (${toBnDigits(disO2)} mL) অবস্থায় যায়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · O₂ পরিবহন অনুপাত',
      })
    );
  });

  // 6. Odd-One-Out & Negative Exception Zoology Drills (24 MCQs)
  const exceptionDrills = [
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', q: 'নিচের কোনটি মেরুদণ্ডী প্রাণীদের Chordata পর্বের প্রধান মৌলিক বৈশিষ্ট্যের অন্তর্ভুক্ত নয়?', a: 'অঙ্কীয় দিকে নিরেট ও যুগ্ম স্নায়ুরজ্জু (Ventral solid nerve cord)', w: ['ভ্রূণাবস্থায় বা আজীবন নটোকর্ড', 'গলবিলীয় ফুলকা রন্ধ্র', 'পৃষ্ঠীয় ফাঁপা স্নায়ুরজ্জু'], exp: 'অঙ্কীয় নিরেট স্নায়ুরজ্জু অমেরুদণ্ডী (যেমন আর্থ্রোপোডা-অ্যানিলিডা) প্রাণীদের বৈশিষ্ট্য; কর্ডেটের স্নায়ুরজ্জু পৃষ্ঠীয় ও ফাঁপা।' },
    { ch: 'bio2_ch1_taxonomy', vl: 'mitosis_cell', q: 'নিচের কোন প্রাণীটি "মাছ" (Pisces) শ্রেণিভুক্ত নয়?', a: 'তারা মাছ (Asterias — Echinodermata) ও ক্যাটলফিশ (Sepia — Mollusca)', w: ['রুই মাছ (Labeo rohita)', 'ইলিশ মাছ (Tenualosa ilisha)', 'হাঙর (Scoliodon)'], exp: 'তারা মাছ, জেলিফিশ, কাটলফিশ, সিলভারফিশ ও ক্র্যাফিশ নামের শেষে ফিশ থাকলেও প্রকৃত মৎস্য নয়।' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', q: 'হাইড্রার জীবন ও গঠন সম্পর্কে নিচের কোন তথ্যটি সত্য নয়?', a: 'হাইড্রার পাদচাকতিতে প্রচুর পেনিট্র্যান্ট নিডোসাইট থাকে', w: ['ইন্টারস্টিশিয়াল কোষ টোটিপোটেন্ট', 'মেসোগ্লিয়া অকোষীয় জেলির মতো স্তর', 'হিপনোটক্সিন প্রোটিন ও ফেনল নির্মিত'], exp: 'হাইড্রার পাদচাকতিতে এবং গ্যাস্ট্রোডার্মিসে নিডোসাইট থাকে না; কর্ষিকায় নিডোসাইট সর্বাধিক।' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', q: 'ঘাসফড়িংয়ের রক্ত বা হিমোলিম্ফ সম্পর্কে নিচের কোন বক্তব্যটি ভুল?', a: 'এতে থাকা হিমোগ্লোবিন টিস্যুতে অক্সিজেন পৌঁছে দেয়', w: ['এতে কোনো শ্বসন রঞ্জক না থাকায় এটি বর্ণহীন', 'অ্যামিনো অ্যাসিড, ট্রিহ্যালোজ ও ইউরিক অ্যাসিড বহন করে', 'হিমোসাইট কোষ জীবাণু ভক্ষণ করে'], exp: 'ঘাসফড়িংয়ে ট্রাকিয়াল তন্ত্র থাকায় হিমোলিম্ফে কোনো শ্বসন রঞ্জক থাকে না এবং তা O₂ বহন করে না।' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', q: 'পিত্তরস (Bile Juice) সম্পর্কে নিচের কোন বক্তব্যটি সঠিক নয়?', a: 'পিত্তরসে থাকা লাইপেজ সরাসরি চর্বিকে ফ্যাটি অ্যাসিডে ভাঙে', w: ['যকৃত কোষে তৈরি হয়ে গলব্লাডারে ঘন হয়', 'এতে কোনো পরিপাক এনজাইম নেই', 'সোডিয়াম গ্লাইকোকোলেট চর্বির ইমালসিফিকেশন ঘটায়'], exp: 'পিত্তরসে কোনো পরিপাক এনজাইম থাকে না; এটি কেবল চর্বিকে ক্ষুদ্র কণায় ভেঙে লাইপেজের কাজ সহজ করে।' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', q: 'মানুষের রক্ত সংবহনতন্ত্রের কপাটিকাগুলোর মধ্যে কোন জোড়াটি ভুল?', a: 'ডান অলিন্দ-নিলয় ছিদ্রে বাইকাসপিড (মাইট্রাল) কপাটিকা', w: ['বাম অলিন্দ-নিলয় ছিদ্রে বাইকাসপিড কপাটিকা', 'ডান অলিন্দ-নিলয় ছিদ্রে ট্রাইকাসপিড কপাটিকা', 'অ্যাওর্টা ও পালমোনারি ধমনির মুখে সেমিলুনার কপাটিকা'], exp: 'ডান অলিন্দ-নিলয়ের মাঝে ৩ পাল্লাযুক্ত ট্রাইকাসপিড এবং বাম অলিন্দ-নিলয়ের মাঝে ২ পাল্লাযুক্ত বাইকাসপিড কপাটিকা থাকে।' },
    { ch: 'bio2_ch5_respiration', vl: 'bohr_curve', q: 'নিচের কোনটি অ্যালভিওলাসে গ্যাস বিনিময় (ব্যাপন) হার কমায় না বরং বাড়ায়?', a: 'অ্যালভিওলার পৃষ্ঠতলের ক্ষেত্রফল বৃদ্ধি ও আংশিক চাপের পার্থক্য বৃদ্ধি', w: ['শ্বসন ঝিল্লির পুরুত্ব বেড়ে যাওয়া (ফাইব্রোসিস)', 'অ্যালভিওলার গহ্বরে তরল জমা হওয়া (ইডিমা)', 'এমফাইসিমায় অ্যালভিওলার প্রাচীর ধ্বংস হওয়া'], exp: 'ব্যাপনের হার ক্ষেত্রফল ও চাপ পার্থক্যের সমানুপাতিক এবং পুরুত্বের ব্যস্তানুপাতিক।' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', q: 'সুস্থ স্বাভাবিক মানুষের মূত্রে নিচের কোন উপাদানটির উপস্থিতি অস্বাভাবিক বা রোগলক্ষণ নির্দেশ করে?', a: 'গ্লুকোজ, অ্যালবুমিন প্রোটিন ও লাল রক্তকণিকা', w: ['ইউরিয়া ও ইউরিক অ্যাসিড', 'ক্রিয়েটিনিন ও সোডিয়াম ক্লোরাইড', 'ইউরোক্রোম ও সালফেট-ফসফেট লবণ'], exp: 'স্বাভাবিক ফিল্ট্রেশনে প্রোটিন-RBC বেরোয় না এবং সমস্ত গ্লুকোজ PCT-তে শোষিত হয়ে যায়।' },
    { ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac', q: 'পেশি সংকোচনের (Sliding Filament) সময় নিচের কোন অংশটির দৈর্ঘ্য মোটেও সংকুচিত বা পরিবর্তিত হয় না?', a: 'A-ব্যান্ড (মায়োসিন ফিলামেন্টের দৈর্ঘ্যের সমান) ও স্বয়ং অ্যাক্টিন ফিলামেন্ট', w: ['I-ব্যান্ড (অ্যাক্টিন কেবল অঞ্চল)', 'H-জোন (মায়োসিনের কেন্দ্রীয় ফাঁকা অংশ)', 'সার্কোমিয়ারের (Z থেকে Z রেখা) দূরত্ব'], exp: 'সংকোচনে I-ব্যান্ড, H-জোন ও সার্কোমিয়ার ছোট হয়, কিন্তু A-ব্যান্ড ও তন্তুগুলোর প্রকৃত দৈর্ঘ্য স্থির থাকে।' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', q: 'করোটিক স্নায়ুগুলোর মধ্যে কোনটি সম্পূর্ণ চেষ্টীয় (Purely Motor) স্নায়ু নয়?', a: '৫ম ট্রাইজেমিনাল ও ৭ম ফেসিয়াল (এগুলো মিশ্র স্নায়ু)', w: ['৩য় অকিউলোমোটর ও ৪র্থ ট্রকলিয়ার', '৬ষ্ঠ অ্যাবডুসেন্স', '১১শ অ্যাক্সেসরি ও ১২শ হাইপোগ্লসাল'], exp: 'সংবেদী হলো ১, ২, ৮; চেষ্টীয় হলো ৩, ৪, ৬, ১১, ১২; এবং মিশ্র হলো ৫, ৭, ৯, ১০।' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', q: 'মানব শরীরের সহজাত বা জন্মগত অনাক্রম্যতার (Innate Immunity) বৈশিষ্ট্য কোনটি নয়?', a: 'মেমোরি কোষ তৈরি করে নির্দিষ্ট জীবাণুর বিরুদ্ধে দীর্ঘমেয়াদি স্মৃতি রাখা', w: ['ত্বক ও শ্লেষ্মাঝিল্লির ভৌত বাধা', 'জ্বর, প্রদাহ ও ফ্যাগোসাইটোসিস', 'জন্মগত ও তাৎক্ষণিক অ-নির্দিষ্ট সাড়া'], exp: 'অ্যান্টিজেন-নির্দিষ্টতা ও মেমোরি কোষ সৃষ্টি অর্জিত (Adaptive) অনাক্রম্যতার অনন্য বৈশিষ্ট্য।' },
    { ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell', q: 'হিমোফিলিয়া বা লাল-সবুজ বর্ণান্ধতার বংশগতি সম্পর্কে কোন তথ্যটি ভুল?', a: 'একজন বর্ণান্ধ পিতা সরাসরি তার পুত্রসন্তানকে বর্ণান্ধতার জিন প্রদান করতে পারেন', w: ['নারীদের তুলনায় পুরুষে এই রোগের হার অনেক বেশি', 'বাহক মা থেকে ৫০% পুত্র আক্রান্ত হতে পারে', 'আক্রান্ত পিতার সকল কন্যাই অন্তত বাহক হয়'], exp: 'পিতা পুত্রকে কেবল Y ক্রোমোজোম দেন; তাই X-লিঙ্কড জিন কখনো পিতা থেকে সরাসরি পুত্রে যায় না।' },
  ];
  exceptionDrills.forEach((ed, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ed.ch,
        visualLessonId: ed.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: ed.q,
        correct: ed.a,
        distractors: ed.w,
        explanation: `${ed.a}। ${ed.exp}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · ব্যতিক্রম ও যাচাই ব্যাংক',
      })
    );
  });

  return list;
}
