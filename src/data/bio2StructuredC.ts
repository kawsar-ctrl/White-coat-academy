import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildBio2StructuredC(startSeq = 1): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = startSeq;
  const nextId = () => `bio2_sc_${String(seq++).padStart(4, '0')}`;

  // 1. Zoological Scientific Names Matrix (20 species × 2 = 40 MCQs)
  const zooSpecies = [
    { bn: 'মানুষ', sci: 'Homo sapiens', group: 'Mammalia (স্তন্যপায়ী)', trait: 'উন্নত সেরেব্রাম ও দ্বিপদ গমন' },
    { bn: 'রয়েল বেঙ্গল টাইগার', sci: 'Panthera tigris', group: 'Mammalia (জাতীয় পশু)', trait: 'মাংসাশী শ্বদন্ত ও ডোরাকাটা লোম' },
    { bn: 'দোয়েল পাখি', sci: 'Copsychus saularis', group: 'Aves (জাতীয় পাখি)', trait: 'পালক, বায়ুপূর্ণ অস্থি ও ৪-প্রকোষ্ঠ হৃৎপিণ্ড' },
    { bn: 'ইলিশ মাছ', sci: 'Tenualosa ilisha', group: 'Actinopterygii (জাতীয় মাছ)', trait: 'অ্যানাড্রোমাস স্বভাব ও সাইক্লয়েড আঁইশ' },
    { bn: 'রুই মাছ', sci: 'Labeo rohita', group: 'Actinopterygii', trait: 'মিঠাপানির অস্থিময় মাছ, ভেনাস হার্ট ও পটকা' },
    { bn: 'কাতলা মাছ', sci: 'Gibelion catla / Catla catla', group: 'Actinopterygii', trait: 'বড় মাথা ও ঊর্ধ্বমুখী মুখবিশিষ্ট কার্প মাছ' },
    { bn: 'হাঙর', sci: 'Scoliodon laticaudus', group: 'Chondrichthyes', trait: 'তরুণাস্থিময় অন্তঃকঙ্কাল ও প্ল্যাকয়েড আঁইশ' },
    { bn: 'কুনোব্যাঙ', sci: 'Duttaphrynus melanostictus', group: 'Amphibia', trait: 'প্যারোটিড গ্রন্থি ও খসখসে আঁচিলযুক্ত ত্বক' },
    { bn: 'সোনা ব্যাঙ', sci: 'Hoplobatrachus tigerinus', group: 'Amphibia', trait: '৩-প্রকোষ্ঠ হৃৎপিণ্ড ও শীতনিদ্রা প্রদর্শনকারী উভচর' },
    { bn: 'ঘড়িয়াল', sci: 'Gavialis gangeticus', group: 'Reptilia', trait: 'লম্বা সরু তুণ্ড ও সম্পূর্ণ ৪-প্রকোষ্ঠ হৃৎপিণ্ড' },
    { bn: 'হাইড্রা', sci: 'Hydra vulgaris', group: 'Cnidaria', trait: 'অরীয় প্রতিসম দ্বিস্তরী দেহ ও নিডোসাইট কোষ' },
    { bn: 'সবুজ হাইড্রা', sci: 'Chlorohydra viridissima', group: 'Cnidaria', trait: 'Zoochlorella শৈবালের সাথে মিথোজীবিতা' },
    { bn: 'ঘাসফড়িং', sci: 'Poekilocerus pictus', group: 'Arthropoda', trait: 'হিমোসিল, পুঞ্জাক্ষি ও ম্যালপিজিয়ান নালিকা' },
    { bn: 'দেশি কেঁচো', sci: 'Metaphire posthuma', group: 'Annelida', trait: 'ক্লাইটেলাম, সিটি ও নেফ্রিডিয়া' },
    { bn: 'জোঁক', sci: 'Hirudinaria granulosa', group: 'Annelida', trait: 'রক্ততঞ্চন রোধী হিরুডিন ক্ষরণকারী বহিঃপরজীবী' },
    { bn: 'আপেল শামুক', sci: 'Pila globosa', group: 'Mollusca', trait: 'ম্যান্টল, পেশিবহুল পদ ও ক্যালকেরিয়াস খোলস' },
    { bn: 'গোলকৃমি', sci: 'Ascaris lumbricoides', group: 'Nematoda', trait: 'সিউডোসিলোম ও অখণ্ডকায়িত নলাকার দেহ' },
    { bn: 'যকৃৎ কৃমি', sci: 'Fasciola hepatica', group: 'Platyhelminthes', trait: 'পাতার মতো চ্যাপ্টা দেহ ও শিখা কোষ' },
    { bn: 'ফিতাকৃমি', sci: 'Taenia solium', group: 'Platyhelminthes', trait: 'স্কোলেক্স, হুক ও প্রোগ্লটিডযুক্ত অ্যাসিলোমেট' },
    { bn: 'তারামাছ', sci: 'Asterias rubens', group: 'Echinodermata', trait: 'পঞ্চঅরীয় প্রতিসাম্য ও নালিকা-পদ (টিউব ফিট)' },
  ];

  zooSpecies.forEach((sp, i) => {
    const others = zooSpecies.filter((x) => x.bn !== sp.bn);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: `প্রাণিবিজ্ঞানে "${sp.bn}"-এর সঠিক বৈজ্ঞানিক নাম কোনটি?`,
        correct: sp.sci,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => x.sci),
        explanation: `${sp.bn}-এর দ্বিপদ বৈজ্ঞানিক নাম ${sp.sci} (${sp.group})। বিশেষ বৈশিষ্ট্য: ${sp.trait}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ১ ও ২',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${sp.trait}" — এই বৈশিষ্ট্যটি নিচের কোন প্রাণীতে দেখা যায়?`,
        correct: `${sp.bn} (${sp.sci})`,
        distractors: others.slice((i + 4) % 8, ((i + 4) % 8) + 4).map((x) => `${x.bn} (${x.sci})`),
        explanation: `${sp.bn} (${sp.sci}) হলো ${sp.group} অন্তর্ভুক্ত প্রাণী যাতে ${sp.trait} বিদ্যমান।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · শ্রেণিবিন্যাস',
      })
    );
  });

  // 2. Human Clinical Reference Values & Normal Ranges Matrix (~52 MCQs)
  const clinicalValues = [
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', item: 'প্রাপ্তবয়স্ক পুরুষ ও নারীর রক্তে স্বাভাবিক হিমোগ্লোবিনের মাত্রা', val: 'পুরুষে ১৪–১৬ g/dL ও নারীতে ১২–১৪ g/dL', note: 'হিমোগ্লোবিন কমে গেলে রক্তশূন্যতা বা অ্যানিমিয়া দেখা দেয়।' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', item: 'স্বাভাবিক মানবদেহে রক্তের pH পরিসীমা', val: '৭.৩৫ – ৭.৪৫ (গড়ে ৭.৪, সামান্য ক্ষারীয়)', note: '৭.৩৫-এর নিচে অ্যাসিডোসিস ও ৭.৪৫-এর উপরে অ্যালকালোসিস হয়।' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', item: 'পাকস্থলির গ্যাস্ট্রিক রসের স্বাভাবিক pH', val: '১.৫ – ২.৫ (তীব্র অম্লীয়, HCl-এর কারণে)', note: 'পেপসিনোজেনকে সক্রিয় পেপসিনে রূপান্তরের জন্য এই তীব্র অম্লীয় পরিবেশ জরুরি।' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', item: 'মানুষের অগ্ন্যাশয় রস ও আন্ত্রিক রসের স্বাভাবিক pH', val: '৭.৮ – ৮.৩ (ক্ষারীয়)', note: 'ডিওডেনামে বাইকার্বনেট আয়ন এসে অম্লীয় কাইমকে প্রশমিত করে।' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', item: 'প্রাপ্তবয়স্ক মানুষের যকৃতের (Liver) গড় ওজন', val: '১.৫ – ২.০ কেজি (দেহের বৃহত্তম গ্রন্থি)', note: 'যকৃৎ প্রায় ৫০০-এর বেশি জৈব-রাসায়নিক কাজ সম্পন্ন করে।' },
    { ch: 'bio2_ch4_blood', vl: 'heart_cardiac', item: 'স্বাভাবিক মানুষের হৃৎপিণ্ডের গড় ওজন', val: 'প্রায় ২৫০ – ৩০০ গ্রাম (পুরুষে ~৩০০ g, নারীতে ~২৫০ g)', note: 'হৃৎপিণ্ড ৪ প্রকোষ্ঠযুক্ত এবং বক্ষগহ্বরের মিডিয়াস্টিনামে অবস্থিত।' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', item: 'মানুষের প্রতিটি বৃক্কের গড় ওজন ও দৈর্ঘ্য', val: '১৩০ – ১৭০ গ্রাম ও দৈর্ঘ্য ১০ – ১২ সেমি', note: 'প্রতিটি বৃক্কে প্রায় ১০–১২ লাখ কার্যকরী একক নেফ্রন থাকে।' },
    { ch: 'bio2_ch6_excretion', vl: 'nephron', item: 'স্বাভাবিক মানুষের রক্তে ক্রিয়েটিনিন ও ইউরিয়ার মাত্রা', val: 'ক্রিয়েটিনিন ০.৬ – ১.২ mg/dL ও ইউরিয়া ১৫ – ৪০ mg/dL', note: 'বৃক্ক বিকল হলে রক্তে ক্রিয়েটিনিন ও ইউরিয়া দ্রুত বেড়ে যায় (ইউরেমিয়া)।' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', item: 'পূর্ণবয়স্ক মানুষের মস্তিষ্কের গড় ওজন ও নিউরনের সংখ্যা', val: 'প্রায় ১,৩৫০ – ১,৪০০ গ্রাম ও ~৮,৬০০ কোটি (৮৬ বিলিয়ন) নিউরন', note: 'সেরেব্রাম একাই মস্তিষ্কের মোট ওজনের প্রায় ৮০% অধিকার করে।' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', item: 'মানুষের সুষুম্নাকাণ্ডের দৈর্ঘ্য ও সুষুম্নাস্নায়ুর (Spinal nerves) সংখ্যা', val: 'প্রায় ৪২–৪৫ সেমি ও ৩১ জোড়া মিশ্র সুষুম্নাস্নায়ু', note: 'সুষুম্নাকাণ্ড থেকে সারভাইক্যাল ৮, থোরাসিক ১২, লাম্বার ৫, স্যাক্রাল ৫ ও কক্সিজিয়াল ১ জোড়া স্নায়ু বের হয়।' },
    { ch: 'bio2_ch8_coordination', vl: 'bohr_curve', item: 'স্নায়ুকোষের বিশ্রাম ঝিল্লি বিভব (Resting Membrane Potential)', val: '-৭০ মিলিভোল্ট (অ্যাক্সনের ভেতর ঋণাত্মক)', note: 'সোডিয়াম-পটাশিয়াম পাম্প (3 Na⁺ বাইরে, 2 K⁺ ভেতরে) ও প্রোটিন অ্যানায়ন এই বিভব বজায় রাখে।' },
    { ch: 'bio2_ch8_coordination', vl: 'mitosis_cell', item: 'মানুষের স্বাভাবিক রজঃচক্রের (Menstrual Cycle) স্থায়িত্ব ও ডিম্বপাতের দিন', val: 'গড়ে ২৮ দিন ও ১৪তম দিনে ডিম্বপাত (ওভিউলেশন)', note: '১৪তম দিনে পিটুইটারির LH সার্জের কারণে গ্রাফিয়ান ফলিকল ফেটে সেকেন্ডারি উওসাইট নির্গত হয়।' },
    { ch: 'bio2_ch8_coordination', vl: 'mitosis_cell', item: 'মানব ভ্রূণের স্বাভাবিক গর্ভকাল (Gestation Period)', val: 'প্রায় ২৮০ দিন বা ৪০ সপ্তাহ (৯ মাস ১০ দিন)', note: 'শেষ ঋতুস্রাবের প্রথম দিন থেকে হিসাব করলে ২৮০ দিন এবং নিষেক থেকে ২৬৬ দিন।' },
    { ch: 'bio2_ch3_digestion', vl: 'heart_cardiac', item: 'রক্তে গ্লুকোজের স্বাভাবিক (খালি পেটে / Fasting) মাত্রা', val: '৩.৯ – ৬.১ mmol/L (৭০ – ১১০ mg/dL)', note: 'ইনসুলিন রক্তের গ্লুকোজ কমায় ও গ্লুকাগন রক্তের গ্লুকোজ বাড়ায়।' },
  ];

  clinicalValues.forEach((cv, i) => {
    const others = clinicalValues.filter((x) => x.item !== cv.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cv.ch,
        visualLessonId: cv.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানব শারীরতত্ত্বে "${cv.item}" সাধারণত কত?`,
        correct: cv.val,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.val),
        explanation: `${cv.item} হলো ${cv.val}। ${cv.note}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · শারীরতত্ত্বীয় মানদণ্ড',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cv.ch,
        visualLessonId: cv.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `মানবদেহে "${cv.val}" — এই স্বাভাবিক শারীরবৃত্তীয় পরিমাপটি নিচের কোনটির সাথে সম্পর্কিত?`,
        correct: cv.item,
        distractors: others.slice((i + 3) % 7, ((i + 3) % 7) + 4).map((x) => x.item),
        explanation: `${cv.val} মানটি "${cv.item}" নির্দেশ করে। ${cv.note}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · ক্লিনিক্যাল রেফারেন্স',
      })
    );
  });

  // 3. Individual Human Bones Identification Matrix (15 Bones × 2 = 30 MCQs)
  const boneDetails = [
    { bone: 'ফিমার (Femur)', loc: 'উরু (Thigh)', feat: 'মানবদেহের দীর্ঘতম, ভারী ও সবচেয়ে শক্তিশালী অস্থি' },
    { bone: 'স্টেপিস (Stapes)', loc: 'মধ্যকর্ণ', feat: 'মানবদেহের ক্ষুদ্রতম (সিজময়েড/রিকাভ আকৃতির) অস্থি' },
    { bone: 'ম্যান্ডিবল (Mandible)', loc: 'নিম্নচোয়াল', feat: 'মুখমণ্ডলের একমাত্র সচল U-আকৃতির অস্থি' },
    { bone: 'ক্ল্যাভিকল (Clavicle)', loc: 'বক্ষ-অস্থিচক্রের সম্মুখভাগ', feat: 'S-আকৃতির অনুভূমিক অস্থি যাকে কলার বোন বা বিউটি বোন বলে' },
    { bone: 'স্ক্যাপুলা (Scapula)', loc: 'পৃষ্ঠীয় বক্ষ-অস্থিচক্র', feat: 'ত্রিকোণাকার চ্যাপ্টা অস্থি যার গ্লিনয়েড গহ্বরে হিউমেরাস যুক্ত হয়' },
    { bone: 'স্টার্নাম (Sternum)', loc: 'বক্ষপিঞ্জরের সম্মুখ মধ্যরেখা', feat: 'ছোরার মতো চ্যাপ্টা অস্থি (ম্যানুব্রিয়াম, দেহ ও জিফয়েড প্রসেস)' },
    { bone: 'অ্যাটলাস (১ম সারভাইক্যাল কশেরুকা)', loc: 'ঘাড়ের সর্বোচ্চ প্রান্ত', feat: 'আংটির মতো অস্থি যার দেহ বা স্পাইনাস প্রসেস নেই; অক্সিপিটাল কনডাইলে যুক্ত' },
    { bone: 'অ্যাক্সিস (২য় সারভাইক্যাল কশেরুকা)', loc: 'অ্যাটলাসের ঠিক নিচে', feat: 'ওডন্টয়েড প্রসেস (ডেন্স) ধারণ করে যার ওপর মাথা ডানে-বামে ঘোরে' },
    { bone: 'হিউমেরাস (Humerus)', loc: 'ঊর্ধ্ববাহু', feat: 'মস্তক গ্লিনয়েড গহ্বরে এবং নিম্নপ্রান্তে ট্রকলিয়া-ক্যাপিচুলাম থাকে' },
    { bone: 'প্যাটেলা (Patella)', loc: 'হাঁটুর সম্মুখভাগ', feat: 'ত্রিকোণাকার সিসাময়েড অস্থি (টেন্ডনের ভেতর গঠিত) যা হাঁটুকে রক্ষা করে' },
    { bone: 'টিবিয়া ও ফিবুলা', loc: 'নিম্নপদ (হাঁটুর নিচ থেকে গোড়ালি)', feat: 'টিবিয়া হলো ওজন বহনকারী পুরু শিন বোন এবং ফিবুলা বাইরের সরু অস্থি' },
    { bone: 'হাইঅয়েড (Hyoid)', loc: 'জিহ্বার গোড়ায় ও স্বরযন্ত্রের ওপরে', feat: 'অন্য কোনো অস্থির সাথে সন্ধি গঠন না করা একমাত্র U-আকৃতির মুক্ত অস্থি' },
    { bone: 'কক্সিক্স (Coccyx)', loc: 'মেরুদণ্ডের সর্বনিম্ন প্রান্ত', feat: '৪টি কশেরুকা একীভূত হয়ে গঠিত মানুষের নিষ্ক্রিয় পুচ্ছাস্থি' },
    { bone: 'ইলিয়াম, ইশ্চিয়াম ও পিউবিস', loc: 'শ্রোণীচক্র (Pelvic girdle)', feat: '৩টি অস্থি একত্রিত হয়ে হিপ বোন ও অ্যাসিটাবুলাম গহ্বর তৈরি করে' },
    { bone: 'ভোমার (Vomer)', loc: 'নাসিকা গহ্বর', feat: 'নাকের মাঝের অস্থিময় ব্যবধায়কের (Nasal septum) নিচের অংশ গঠনকারী অস্থি' },
  ];

  boneDetails.forEach((b, i) => {
    const others = boneDetails.filter((x) => x.bone !== b.bone);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${b.feat}" — এটি মানবদেহের কোন অস্থির বিশেষ পরিচয়?`,
        correct: `${b.bone} (অবস্থান: ${b.loc})`,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => `${x.bone} (অবস্থান: ${x.loc})`),
        explanation: `${b.bone} অস্থিটি ${b.loc}-এ অবস্থিত এবং এটি ${b.feat}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৭',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `মানব কঙ্কালে "${b.bone}" অস্থিটির অবস্থান ও প্রধান বৈশিষ্ট্য কী?`,
        correct: `${b.loc}-এ অবস্থিত; ${b.feat}`,
        distractors: others.slice((i + 4) % 8, ((i + 4) % 8) + 4).map((x) => `${x.loc}-এ অবস্থিত; ${x.feat}`),
        explanation: `${b.bone}: ${b.loc}-এ থাকে এবং এটি ${b.feat}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৭ · কঙ্কালতন্ত্র',
      })
    );
  });

  // 4. Hemoglobin O2 Capacity & Minute/Alveolar Ventilation Math (~48 MCQs)
  const hbLevels = [8, 10, 12, 14, 15, 16, 18, 20];
  hbLevels.forEach((hb) => {
    const o2Per100 = Number((hb * 1.34).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'medical',
        question: `১ গ্রাম হিমোগ্লোবিন ১.৩৪ mL অক্সিজেন বহন করতে পারলে কোনো ব্যক্তির রক্তে হিমোগ্লোবিনের মাত্রা ${toBnDigits(hb)} g/dL হলে প্রতি ১০০ mL রক্ত সর্বোচ্চ কত mL O₂ বহন করবে?`,
        correct: `${toBnDigits(o2Per100)} mL`,
        distractors: [
          `${toBnDigits(Number((hb * 1.0).toFixed(2)))} mL`,
          `${toBnDigits(Number((hb * 2.0).toFixed(2)))} mL`,
          `${toBnDigits(Number(((hb + 3) * 1.34).toFixed(2)))} mL`,
        ],
        explanation: `O₂ ধারণক্ষমতা = হিমোগ্লোবিন (g/dL) × ১.৩৪ mL = ${toBnDigits(hb)} × ১.৩৪ = ${toBnDigits(o2Per100)} mL/100 mL রক্ত।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · অক্সিজেন পরিবহন',
      })
    );
  });

  const ventCases: Array<[number, number]> = [
    [12, 500],
    [14, 500],
    [16, 500],
    [18, 450],
    [20, 500],
    [15, 600],
    [16, 400],
    [12, 550],
  ];
  ventCases.forEach(([rr, tv]) => {
    const mv = rr * tv;
    const alv = rr * (tv - 150);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'medical',
        question: `একজন মানুষের শ্বাস-প্রশ্বাসের হার মিনিটে ${toBnDigits(rr)} বার এবং টাইডাল ভলিউম ${toBnDigits(tv)} mL হলে মিনিট ভেন্টিলেশন (Minute Ventilation) কত mL/min?`,
        correct: `${toBnDigits(mv)} mL/min`,
        distractors: [
          `${toBnDigits(alv)} mL/min`,
          `${toBnDigits(mv + 1500)} mL/min`,
          `${toBnDigits(Math.round(mv / 2))} mL/min`,
        ],
        explanation: `মিনিট ভেন্টিলেশন = শ্বাসহার (RR) × টাইডাল ভলিউম (TV) = ${toBnDigits(rr)} × ${toBnDigits(tv)} = ${toBnDigits(mv)} mL/min।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · পালমোনারি ভেন্টিলেশন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'dental',
        question: `শ্বাসহার মিনিটে ${toBnDigits(rr)} বার, TV ${toBnDigits(tv)} mL এবং অ্যানাটমিক্যাল ডেড স্পেস ১৫০ mL হলে অ্যালভিওলার ভেন্টিলেশন কত mL/min?`,
        correct: `${toBnDigits(alv)} mL/min`,
        distractors: [
          `${toBnDigits(mv)} mL/min`,
          `${toBnDigits(rr * 150)} mL/min`,
          `${toBnDigits(alv + 1200)} mL/min`,
        ],
        explanation: `অ্যালভিওলার ভেন্টিলেশন = RR × (TV - ডেড স্পেস) = ${toBnDigits(rr)} × (${toBnDigits(tv)} - ১৫০) = ${toBnDigits(alv)} mL/min।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · অ্যালভিওলার ভেন্টিলেশন',
      })
    );
  });

  // 5. Endocrine Pituitary Hormones & Target Organ Matrix (~32 MCQs)
  const pituitaryHormones = [
    { h: 'TSH (থাইরয়েড স্টিমুলেটিং হরমোন)', loc: 'অগ্র পিটুইটারি', target: 'থাইরয়েড গ্রন্থি', fn: 'থাইরক্সিন (T₃/T₄) সংশ্লেষ ও ক্ষরণ উদ্দীপ্ত করা' },
    { h: 'ACTH (অ্যাড্রেনোকর্টিকোট্রপিক হরমোন)', loc: 'অগ্র পিটুইটারি', target: 'অ্যাড্রেনাল গ্রন্থির কর্টেক্স', fn: 'কর্টিসল ও গ্লুকোকর্টিকয়েড ক্ষরণ নিয়ন্ত্রণ করা' },
    { h: 'FSH (ফলিকল স্টিমুলেটিং হরমোন)', loc: 'অগ্র পিটুইটারি', target: 'ডিম্বাশয়ের ফলিকল ও শুক্রাশয়ের সার্টোলি কোষ', fn: 'নারীতে ডিম্বাণু পরিপক্বতা ও পুরুষে শুক্রাণুজনন উদ্দীপ্ত করা' },
    { h: 'LH / ICSH (লুটিনাইজিং হরমোন)', loc: 'অগ্র পিটুইটারি', target: 'ডিম্বাশয়ের কর্পাস লুটিয়াম ও শুক্রাশয়ের লেডিগ কোষ', fn: 'নারীতে ওভিউলেশন (ডিম্বপাত) ঘটানো ও পুরুষে টেস্টোস্টেরন ক্ষরণ' },
    { h: 'প্রোল্যাক্টিন (PRL / ল্যাকটোজেনিক হরমোন)', loc: 'অগ্র পিটুইটারি', target: 'স্তনগ্রন্থির অ্যালভিওলার কোষ', fn: 'প্রসবের পর মাতৃদুগ্ধ উৎপাদন (Lactogenesis) উদ্দীপ্ত করা' },
    { h: 'MSH (মেলানোসাইট স্টিমুলেটিং হরমোন)', loc: 'মধ্য পিটুইটারি', target: 'ত্বকের মেলানোসাইট কোষ', fn: 'মেলানিন রঞ্জক বণ্টন ও ত্বকের বর্ণ নিয়ন্ত্রণ করা' },
    { h: 'অক্সিটোসিন (Oxytocin)', loc: 'পশ্চাৎ পিটুইটারি (উৎপত্তি হাইপোথ্যালামাস)', target: 'জরায়ু পেশি ও স্তনগ্রন্থির মায়োএপিথেলিয়াল কোষ', fn: 'প্রসবের সময় জরায়ু সংকোচন ও দুগ্ধ নিঃসরণ ঘটানো' },
    { h: 'ADH (অ্যান্টি-ডাইইউরেটিক হরমোন)', loc: 'পশ্চাৎ পিটুইটারি (উৎপত্তি হাইপোথ্যালামাস)', target: 'বৃক্কের নেফ্রনের DCT ও সংগ্রাহী নালিকা', fn: 'পানি পুনঃশোষণ বাড়িয়ে মূত্রের ঘনত্ব ও দেহের তরল ভারসাম্য রক্ষা করা' },
  ];

  pituitaryHormones.forEach((ph, i) => {
    const others = pituitaryHormones.filter((x) => x.h !== ph.h);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `পিটুইটারি গ্রন্থির কোন হরমোনটি "${ph.target}"-এর ওপর ক্রিয়া করে "${ph.fn}"?`,
        correct: ph.h,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.h),
        explanation: `${ph.h} (${ph.loc} থেকে ক্ষরিত) সরাসরি ${ph.target}-কে উদ্দীপ্ত করে ${ph.fn}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · পিটুইটারি হরমোন',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `${ph.h} হরমোনটির মূল লক্ষ্যস্থল (Target Organ) কোনটি?`,
        correct: ph.target,
        distractors: others.slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.target),
        explanation: `${ph.h}-এর লক্ষ্যস্থল হলো ${ph.target}; এর কাজ হলো ${ph.fn}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · হরমোনের লক্ষ্যস্থল',
      })
    );
  });

  // 6. Immune Cells, Tissue Macrophages & Vaccines Matrix (~40 MCQs)
  const immuneEntities = [
    { item: 'হেল্পার T-কোষ (CD4⁺)', role: 'অ্যান্টিজেন শনাক্ত করে সাইটোকাইন ক্ষরণের মাধ্যমে B-কোষ ও সাইটোটক্সিক T-কোষকে সক্রিয় করে (HIV এই কোষ ধ্বংস করে)' },
    { item: 'সাইটোটক্সিক T-কোষ (CD8⁺)', role: 'পারফোরিন ও গ্র্যানজাইম ক্ষরণ করে ভাইরাস আক্রান্ত কোষ ও ক্যানসার কোষকে সরাসরি মেরে ফেলে' },
    { item: 'প্লাজমা B-কোষ (Plasma cell)', role: 'B-লিম্ফোসাইট থেকে রূপান্তরিত হয়ে প্রতি সেকেন্ডে হাজার হাজার সুনির্দিষ্ট অ্যান্টিবডি ক্ষরণ করে' },
    { item: 'ন্যাচারাল কিলার (NK) কোষ', role: 'সহজাত প্রতিরক্ষার বিশেষ লিম্ফোসাইট যা পূর্ব-সংবেদন ছাড়াই টিউমার ও ভাইরাস আক্রান্ত কোষ ধ্বংস করে' },
    { item: 'মাস্ট কোষ (Mast cell)', role: 'টিস্যুতে অবস্থান করে অ্যালার্জেনের সংস্পর্শে হিস্টামিন ও হেপারিন ক্ষরণ করে প্রদাহ সূচনা করে' },
    { item: 'মাইক্রোগ্লিয়া ও কাপফার কোষ', role: 'যথাক্রমে মস্তিষ্ক (CNS) ও যকৃতের সাইনুসয়েডে অবস্থানকারী নির্দিষ্ট টিস্যু ম্যাক্রোফেজ' },
    { item: 'BCG ও OPV (পোলিও মুখে খাওয়ার ড্রপ)', role: 'জীবন্ত কিন্তু দুর্বলকৃত (Live attenuated) জীবাণু থেকে প্রস্তুতকৃত টিকা' },
    { item: 'টিটেনাস (TT) ও ডিপথেরিয়া টিকা', role: 'জীবাণুর বিষকে নিষ্ক্রিয় করে প্রস্তুতকৃত টক্সয়েড (Toxoid) টিকা' },
  ];

  immuneEntities.forEach((ie, i) => {
    const others = immuneEntities.filter((x) => x.item !== ie.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ইমিউনোলজিতে "${ie.role}" — এটি কোনটির ক্ষেত্রে প্রযোজ্য?`,
        correct: ie.item,
        distractors: others.slice(i % 4, (i % 4) + 4).map((x) => x.item),
        explanation: `${ie.item}: ${ie.role}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ১০ (প্রতিরক্ষা)',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'board',
        question: `মানব প্রতিরক্ষা ব্যবস্থায় "${ie.item}"-এর প্রধান কাজ বা বৈশিষ্ট্য কী?`,
        correct: ie.role,
        distractors: others.slice((i + 2) % 4, ((i + 2) % 4) + 4).map((x) => x.role),
        explanation: `${ie.item}-এর ভূমিকা হলো: ${ie.role}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১০ · অনাক্রম্যতা',
      })
    );
  });

  // 7. Genetic Chromosomal Disorders & Mendelian Quantitative Ratios (~64 MCQs)
  const chromDisorders = [
    { dis: 'ডাউন সিন্ড্রোম (Down Syndrome)', cause: '২১ নং অটোজোমের ট্রাইসোমি (47, +21)', feat: 'মঙ্গোলয়েড মুখমণ্ডল, খাটো গড়ন ও মানসিক প্রতিবন্ধিতা' },
    { dis: 'ক্লাইনফেল্টার সিন্ড্রোম', cause: 'পুরুষের সেক্স ক্রোমোজোমে একটি অতিরিক্ত X (47, XXY)', feat: 'লম্বা গড়ন, গাইনোকোম্যাস্টিয়া (স্তন স্ফীতি) ও বন্ধ্যা পুরুষ' },
    { dis: 'টার্নার সিন্ড্রোম (Turner Syndrome)', cause: 'নারীর সেক্স ক্রোমোজোমে একটি X-এর অনুপস্থিতি (45, XO মনোসোমি)', feat: 'খাটো গড়ন, ওয়েবড ঘাড়, অপরিণত ডিম্বাশয় ও বন্ধ্যা নারী' },
    { dis: 'বিটা-থ্যালাসেমিয়া মেজর', cause: '১১ নং অটোজোমের প্রচ্ছন্ন জিন মিউটেশনে β-গ্লোবিন চেইন তৈরি ব্যাহত', feat: 'তীব্র রক্তশূন্যতা, হেপাটোস্প্লেনোমেগালি ও নিয়মিত রক্ত সঞ্চালনের প্রয়োজন' },
    { dis: 'সিকল সেল অ্যানিমিয়া', cause: 'β-গ্লোবিন জিনে ৬নং অবস্থানে গ্লুটামিক অ্যাসিডের স্থলে ভ্যালিন প্রতিস্থাপন', feat: 'RBC কাস্তের মতো বাঁকা হয়ে যাওয়া ও অক্সিজেন বহন কমে যাওয়া' },
    { dis: 'হিমোফিলিয়া-A (রয়েল ডিজিজ)', cause: 'X-ক্রোমোজোমের প্রচ্ছন্ন জিনের কারণে ক্লটিং ফ্যাক্টর VIII-এর অভাব', feat: 'ক্ষতস্থান থেকে রক্ত জমাট বাঁধতে অস্বাভাবিক বিলম্ব ও রক্তক্ষরণ' },
  ];

  chromDisorders.forEach((cd, i) => {
    const others = chromDisorders.filter((x) => x.dis !== cd.dis);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${cd.cause}" — এই জিনগত বা ক্রোমোজোমীয় ত্রুটির কারণে নিচের কোন রোগটি হয়?`,
        correct: cd.dis,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.dis),
        explanation: `${cd.dis}-এর কারণ ${cd.cause} এবং এর লক্ষণ হলো ${cd.feat}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · জিনগত রোগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${cd.dis} রোগের মূল জিনগত/ক্রোমোজোমীয় কারণ কী?`,
        correct: cd.cause,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.cause),
        explanation: `${cd.dis} ঘটে ${cd.cause}-এর ফলে; বৈশিষ্ট্য: ${cd.feat}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · ক্রোমোজোমীয় অস্বাভাবিকতা',
      })
    );
  });

  // Non-Mendelian F2 Counts (160, 320, 480, 640, 800, 960)
  [160, 320, 480, 640, 800, 960].forEach((n) => {
    const white9_7 = Math.round((n * 7) / 16);
    const purple9_7 = Math.round((n * 9) / 16);
    const white13_3 = Math.round((n * 13) / 16);
    const colored13_3 = Math.round((n * 3) / 16);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'medical',
        question: `মিষ্টি মটরের পরিপূরক জিন (৯:৭ অনুপাত) ক্রসে F₂ জনুতে মোট ${toBnDigits(n)}টি গাছ উৎপন্ন হলে কয়টি গাছে বেগুনি ফুল (৯/১৬ অংশ) ও কয়টি গাছে সাদা ফুল (৭/১৬ অংশ) ফুটবে?`,
        correct: `${toBnDigits(purple9_7)}টি বেগুনি ও ${toBnDigits(white9_7)}টি সাদা`,
        distractors: [
          `${toBnDigits(white9_7)}টি বেগুনি ও ${toBnDigits(purple9_7)}টি সাদা`,
          `${toBnDigits(Math.round((n * 3) / 4))}টি বেগুনি ও ${toBnDigits(Math.round(n / 4))}টি সাদা`,
          `${toBnDigits(white13_3)}টি বেগুনি ও ${toBnDigits(colored13_3)}টি সাদা`,
        ],
        explanation: `৯:৭ পরিপূরক জিন অনুপাতে বেগুনি = ৯/১৬ × ${toBnDigits(n)} = ${toBnDigits(purple9_7)} এবং সাদা = ৭/১৬ × ${toBnDigits(n)} = ${toBnDigits(white9_7)}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · পরিপূরক জিন',
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
        question: `প্রকট এপিস্ট্যাসিসের (১৩:৩ অনুপাত) F₂ জনুতে মোট ${toBnDigits(n)}টি মুরগির মধ্যে সাদা পালক (১৩/১৬) ও রঙিন পালকের (৩/১৬) সংখ্যা যথাক্রমে কত?`,
        correct: `${toBnDigits(white13_3)}টি সাদা ও ${toBnDigits(colored13_3)}টি রঙিন`,
        distractors: [
          `${toBnDigits(purple9_7)}টি সাদা ও ${toBnDigits(white9_7)}টি রঙিন`,
          `${toBnDigits(colored13_3)}টি সাদা ও ${toBnDigits(white13_3)}টি রঙিন`,
          `${toBnDigits(Math.round(n / 2))}টি সাদা ও ${toBnDigits(Math.round(n / 2))}টি রঙিন`,
        ],
        explanation: `১৩:৩ প্রকট এপিস্ট্যাসিসে সাদা = ১৩/১৬ × ${toBnDigits(n)} = ${toBnDigits(white13_3)} এবং রঙিন = ৩/১৬ × ${toBnDigits(n)} = ${toBnDigits(colored13_3)}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১১ · প্রকট এপিস্ট্যাসিস',
      })
    );
  });

  // 8. Hydra, Grasshopper & Rohu Detailed Cellular/Organ Anatomy Matrix (~54 MCQs)
  const animalIdDetails: Array<{ ch: string; vl: string; org: string; part: string; fn: string }> = [
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'হাইড্রা', part: 'পেশি-আবরণী কোষ (Epithelio-muscular cell)', fn: 'দেহের আবরণ গঠন ও মায়োনিম তন্তুর সংকোচনে চলনে সহায়তা করা' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'হাইড্রা', part: 'স্নায়ু কোষ (মেসোগ্লিয়া-সংলগ্ন)', fn: 'বহু-মেরুবিশিষ্ট কোষগুলো জালিকা তৈরি করে সংবেদ পরিবহন করা (মস্তিষ্ক নেই)' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'হাইড্রা', part: 'স্ট্রেপটোলিন গ্লুটিন্যান্ট (হোলোট্রাইকাস আইসোরাইজা)', fn: 'লম্বা কাঁটাযুক্ত সূত্র দিয়ে শিকার আটকানো ও চলনে পদতল আটকে ধরা' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'হাইড্রা', part: 'গ্যাস্ট্রোডার্মাল ফ্ল্যাজেলাযুক্ত পুষ্টি কোষ', fn: 'ক্ষুধা পেলে ক্ষণপদ বের করে খাদ্যকণা ফ্যাগোসাইটোসিস (অন্তঃকোষীয় পরিপাক) করা' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'ঘাসফড়িং', part: 'কর্নিয়াজেন কোষ ও ক্রিস্টালাইন কোণ কোষ', fn: 'ওমাটিডিয়ামে কর্নিয়া ও প্রতিসরণশীল ক্রিস্টালাইন কোণ তৈরি করা' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'ঘাসফড়িং', part: 'র‍্যাবডোম (Rhabdom)', fn: '৭–৮টি রেটিনুলার কোষের মধ্যবর্তী আলোক সংবেদী মাকু-আকৃতির দণ্ড যা আলো শোষণ করে' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'ঘাসফড়িং', part: 'হেপাটিক সিকা বা গ্যাস্ট্রিক সিকা (৬ জোড়া)', fn: 'মেসেন্টেরন বা মধ্যান্ত্রের সম্মুখ প্রান্তে অবস্থান করে পরিপাক এনজাইম ক্ষরণ করা' },
    { ch: 'bio2_ch2_animal_id', vl: 'mitosis_cell', org: 'ঘাসফড়িং', part: 'টিনিডিয়া ও ট্রেকিওল (Tracheole)', fn: 'ট্রাকিয়ার কাইটিনময় সর্পিল বলয় (চুপসে যাওয়া রোধ করে) ও টিস্যুরসে গ্যাসীয় বিনিময়ের সূক্ষ্ম প্রান্ত' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', org: 'রুইমাছ', part: 'সাইক্লয়েড আঁইশ (বাৎসরিক বৃদ্ধিরেখা)', fn: 'অস্থিময় মাছের ডার্মিস থেকে সৃষ্ট বৃত্তাকার আঁইশ যার রেখা গুনে বয়স ও বৃদ্ধি নির্ণয় করা যায়' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', org: 'রুইমাছ', part: 'ব্রাঙ্কিওস্টেগাল পর্দা ও অপারকুলাম', fn: 'মুখবিবর ও ফুলকা প্রকোষ্ঠে পানির একমুখী প্রবাহ এবং ফুলকা রক্ষা করা' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', org: 'রুইমাছ', part: 'রুইমাছের ৭টি পাখনা (বক্ষ, শ্রোণী, পৃষ্ঠ, পায়ু ও পুচ্ছ)', fn: 'সাঁতার কাটা, দিক পরিবর্তন, স্থিতি রক্ষা ও দ্রুত সামনে অগ্রসর হওয়া' },
    { ch: 'bio2_ch2_animal_id', vl: 'heart_cardiac', org: 'রুইমাছ', part: 'অ্যাফারেন্ট ও ইফারেন্ট ব্রাঙ্কিয়াল ধমনি', fn: 'হৃৎপিণ্ড থেকে অশুদ্ধ রক্ত ফুলকায় নেওয়া (অ্যাফারেন্ট) ও অক্সিজেনযুক্ত রক্ত ডর্সাল অ্যাওর্টায় নেওয়া (ইফারেন্ট)' },
  ];

  animalIdDetails.forEach((ad, i) => {
    const others = animalIdDetails.filter((x) => x.part !== ad.part);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ad.ch,
        visualLessonId: ad.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${ad.org}-এর কোন অঙ্গ বা কোষের কাজ হলো "${ad.fn}"?`,
        correct: ad.part,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.part),
        explanation: `${ad.org}-এ অবস্থিত ${ad.part}-এর মূল ভূমিকা হলো ${ad.fn}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ২ (প্রাণির পরিচিতি)',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: ad.ch,
        visualLessonId: ad.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `${ad.org}-এর দেহে "${ad.part}"-এর প্রধান কাজ কী?`,
        correct: ad.fn,
        distractors: others.slice((i + 3) % 7, ((i + 3) % 7) + 4).map((x) => x.fn),
        explanation: `${ad.org}-এর ${ad.part} ${ad.fn} কাজটি সম্পন্ন করে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ২',
      })
    );
  });

  // 9. True/False Statement & Incorrect Statement Pairs across Ch 3-12 (~60 MCQs)
  const bio2TrueFalse: Array<{
    ch: string;
    vl: string;
    topic: string;
    trueStmt: string;
    falseStmts: [string, string, string];
    exp: string;
  }> = [
    {
      ch: 'bio2_ch3_digestion',
      vl: 'heart_cardiac',
      topic: 'মানুষের ক্ষুদ্রান্ত্র ও বৃহদন্ত্র',
      trueStmt: 'পরিপাক ও শোষণের প্রায় ৯০% ক্ষুদ্রান্ত্রে (ডিওডেনাম, জেজুনাম, ইলিয়াম) এবং পানি-খনিজ শোষণ ও মল গঠন বৃহদন্ত্রে ঘটে',
      falseStmts: [
        'বৃহদন্ত্রে অসংখ্য ভিলাই ও পরিপাক এনজাইম ক্ষরণকারী ব্রুনার গ্রন্থি থাকে',
        'পাকস্থলিতে শ্বেতসার ও লিপিডের সম্পূর্ণ পরিপাক সমাপ্ত হয়',
        'পিত্তরসে থাকা পেপসিন ও অ্যামাইলেজ এনজাইম সরাসরি খাদ্য পরিপাক করে',
      ],
      exp: 'ক্ষুদ্রান্ত্রে ভিলাই ও এনজাইম থাকায় ৯০% পরিপাক-শোষণ সেখানেই ঘটে; বৃহদন্ত্রে ভিলাই নেই এবং ব্যাকটেরিয়া ভিটামিন K ও B₁₂ তৈরি করে।',
    },
    {
      ch: 'bio2_ch4_blood',
      vl: 'heart_cardiac',
      topic: 'লসিকা (Lymph) ও রক্তের পার্থক্য',
      trueStmt: 'লসিকায় লোহিত রক্তকণিকা ও অণুচক্রিকা অনুপস্থিত, তবে প্রচুর লিম্ফোসাইট থাকে এবং এটি একমুখীভাবে শিরায় ফিরে আসে',
      falseStmts: [
        'লসিকায় প্রচুর পরিমাণে লোহিত রক্তকণিকা থাকায় এটি গাঢ় লাল বর্ণের হয়',
        'লসিকা হৃৎপিণ্ড দ্বারা সরাসরি ধমনিতে উচ্চ চাপে পাম্প হয়',
        'লসিকায় কোনো শ্বেত রক্তকণিকা বা চর্বি কণা (কাইলোমাইক্রন) থাকে না',
      ],
      exp: 'লসিকা বর্ণহীন বা হালকা হলুদাভ তরল যাতে RBC-অণুচক্রিকা নেই কিন্তু লিম্ফোসাইট ও অন্ত্র থেকে শোষিত ফ্যাট (কাইল) থাকে।',
    },
    {
      ch: 'bio2_ch5_respiration',
      vl: 'bohr_curve',
      topic: 'বহিঃশ্বসন ও অন্তঃশ্বসন',
      trueStmt: 'বহিঃশ্বসন হলো ফুসফুসের অ্যালভিওলাস ও রক্তের মধ্যে ভৌত গ্যাস বিনিময়; অন্তঃশ্বসন হলো কোষের মাইটোকন্ড্রিয়ায় খাদ্য জারণে ATP তৈরি',
      falseStmts: [
        'বহিঃশ্বসন প্রক্রিয়ায় গ্লুকোজ জারিত হয়ে ৩৬ অণু ATP উৎপন্ন হয়',
        'অন্তঃশ্বসনে কোনো এনজাইমের প্রয়োজন হয় না',
        'প্রশ্বাসের সময় অ্যালভিওলার চাপ বায়ুমণ্ডলীয় চাপের চেয়ে বেশি থাকে',
      ],
      exp: 'বহিঃশ্বসন এনজাইমবিহীন ভৌত প্রক্রিয়া (প্রশ্বাসের সময় ফুসফুসের চাপ ৭৫৮ mmHg, যা বাইরের ৭৬০ mmHg থেকে কম); অন্তঃশ্বসন জৈব-রাসায়নিক।',
    },
    {
      ch: 'bio2_ch6_excretion',
      vl: 'nephron',
      topic: 'রেচন বর্জ্যের প্রকারভেদ',
      trueStmt: 'অস্থিময় মাছ ও ব্যাঙাচি অ্যামোনোটেলিক (অ্যামোনিয়া), মানুষ ও স্তন্যপায়ী ইউরিওটেলিক (ইউরিয়া) এবং পাখি-পতঙ্গ-সরীসৃপ ইউরিকোটেলিক (ইউরিক অ্যাসিড)',
      falseStmts: [
        'মানুষের প্রধান নাইট্রোজেনঘটিত রেচন বর্জ্য হলো সরাসরি অ্যামোনিয়া',
        'ঘাসফড়িং ও পাখি প্রচুর পানি খরচ করে ইউরিয়া আকারে বর্জ্য ত্যাগ করে',
        'ইউরিক অ্যাসিড অ্যামোনিয়ার তুলনায় বহুগুণ বেশি বিষাক্ত ও পানিতে অতিদ্রবণীয়',
      ],
      exp: 'অ্যামোনিয়া সবচেয়ে বিষাক্ত (জলজ প্রাণীতে); ইউরিয়া মাঝারি (স্তন্যপায়ী ও উভচর); ইউরিক অ্যাসিড সবচেয়ে কম বিষাক্ত ও অদ্রবণীয় (পাখি, সরীসৃপ ও কীটপতঙ্গ)।',
    },
    {
      ch: 'bio2_ch7_locomotion',
      vl: 'heart_cardiac',
      topic: 'হৃৎপেশি (Cardiac Muscle)',
      trueStmt: 'হৃৎপেশি দেখতে সরেখ (ডোরাকাটা) ও শাখান্বিত হলেও কাজে অনৈচ্ছিক, এবং কোষগুলোর মাঝে ইন্টারক্যালেটেড ডিস্ক ও গ্যাপ জাংশন থাকে',
      falseStmts: [
        'হৃৎপেশিতে কোনো ইন্টারক্যালেটেড ডিস্ক বা ডোরা দাগ থাকে না',
        'হৃৎপেশি মানুষের ইচ্ছাশক্তি অনুযায়ী সংকুচিত ও প্রসারিত হয়',
        'হৃৎপেশিতে দ্রুত ল্যাকটিক অ্যাসিড জমে ক্লান্তি (Fatigue) সৃষ্টি হয়',
      ],
      exp: 'হৃৎপেশি স্বতঃস্ফূর্ত ও ক্লান্তিহীনভাবে সারা জীবন কাজ করে; এর কোষগুলো শাখান্বিত, এক-নিউক্লিয়াসযুক্ত ও ইন্টারক্যালেটেড ডিস্ক সমৃদ্ধ।',
    },
    {
      ch: 'bio2_ch8_coordination',
      vl: 'bohr_curve',
      topic: 'সিমপ্যাথেটিক ও প্যারাসিমপ্যাথেটিক স্নায়ুতন্ত্র',
      trueStmt: 'সিমপ্যাথেটিক স্নায়ু জরুরি অবস্থায় হৃৎস্পন্দন ও পিউপিল প্রসারিত করে; প্যারাসিমপ্যাথেটিক (ভেগাস) হৃৎস্পন্দন কমায় ও পরিপাক বাড়ায়',
      falseStmts: [
        'সিমপ্যাথেটিক উদ্দীপনায় লালা ও পরিপাক রস ক্ষরণ তীব্রভাবে বৃদ্ধি পায়',
        'প্যারাসিমপ্যাথেটিক স্নায়ু হৃৎস্পন্দনের গতি ও রক্তচাপ বহুগুণ বাড়িয়ে দেয়',
        'উভয় তন্ত্রই একই সময়ে ঠিক বিপরীত নয় বরং অভিন্ন প্রভাব সৃষ্টি করে',
      ],
      exp: 'স্বয়ংক্রিয় স্নায়ুতন্ত্রের সিমপ্যাথেটিক ("Fight or Flight") ও প্যারাসিমপ্যাথেটিক ("Rest and Digest") পরস্পর বিপরীতভাবে অভ্যন্তরীণ সাম্যাবস্থা রক্ষা করে।',
    },
    {
      ch: 'bio2_ch8_coordination',
      vl: 'mitosis_cell',
      topic: 'মানুষের শুক্রাশয় স্ক্রোটামে অবস্থান',
      trueStmt: 'স্বাভাবিক শুক্রাণুজননের (Spermatogenesis) জন্য দেহ তাপমাত্রার (৩৭°C) চেয়ে ২°–৩°C কম তাপমাত্রা প্রয়োজন হওয়ায় শুক্রাশয় উদরের বাইরে স্ক্রোটামে থাকে',
      falseStmts: [
        'শুক্রাশয়ে দেহের চেয়ে ৫°C বেশি তাপমাত্রায় শুক্রাণু সবচেয়ে দ্রুত তৈরি হয়',
        'নারীর ডিম্বাশয়ও উদরের বাইরে স্ক্রোটামে অবস্থান করে',
        'লেডিগ কোষ থেকে কেবল প্রোজেস্টেরন হরমোন নিঃসৃত হয়',
      ],
      exp: '৩৪°–৩৫°C তাপমাত্রা শুক্রাণু উৎপাদনের জন্য অনুকূল বলেই পুরুষের শুক্রাশয় স্ক্রোটাল থলিতে দেহের বাইরে অবস্থান করে।',
    },
    {
      ch: 'bio2_ch10_immune_genetics',
      vl: 'mitosis_cell',
      topic: 'অ্যান্টিবডি ও অ্যান্টিজেন',
      trueStmt: 'অ্যান্টিজেন হলো বহিরাগত প্রোটিন বা পলিস্যাকারাইড যা দেহে ইমিউন সাড়া জাগায়; অ্যান্টিবডি হলো B-কোষ সৃষ্ট গামা-গ্লোবিউলিন প্রোটিন',
      falseStmts: [
        'প্রতিটি অ্যান্টিবডি অণুতে ৪টি ভারী চেইন ও কোনো হালকা চেইন থাকে না',
        'সব অ্যান্টিজেন কেবল মানবদেহের ভেতরে T-কোষ থেকে উৎপন্ন হয়',
        'IgM অ্যান্টিবডি সবচেয়ে ক্ষুদ্র হওয়ায় সহজেই প্লাসেন্টা অতিক্রম করে',
      ],
      exp: 'IgG প্লাসেন্টা অতিক্রম করে; IgM বৃহত্তম পেন্টামার; প্রতিটি অ্যান্টিবডি ২টি ভারী (H) ও ২টি হালকা (L) পলিপেপটাইড চেইন নিয়ে গঠিত।',
    },
    {
      ch: 'bio2_ch10_immune_genetics',
      vl: 'mitosis_cell',
      topic: 'বিবর্তন: ল্যামার্কবাদ বনাম ডারউইনবাদ',
      trueStmt: 'ল্যামার্ক অঙ্গের ব্যবহার-অব্যবহার ও অর্জিত বৈশিষ্ট্যের উত্তরাধিকারের কথা বলেন; ডারউইন প্রকরণ, জীবনসংগ্রাম ও প্রাকৃতিক নির্বাচনের কথা বলেন',
      falseStmts: [
        'ভাইসম্যানের ইঁদুরের লেজ কাটা পরীক্ষায় ল্যামার্কবাদ শতভাগ সত্য প্রমাণিত হয়',
        'ডারউইনের মতে জিরাফের লম্বা গলা ইচ্ছাকৃত প্রচেষ্টার সরাসরি ফল',
        'মিউটেশন বা আকস্মিক জিনগত পরিবর্তনের জনক ছিলেন জ্যাঁ ব্যাপ্টিস্ট ল্যামার্ক',
      ],
      exp: 'ভাইসম্যান জার্মপ্লাজম তত্ত্বের মাধ্যমে প্রমাণ করেন যে দেহকোষের অর্জিত বৈশিষ্ট্য বংশপরম্পরায় যায় না; হুগো দ্য ভ্রিস মিউটেশন তত্ত্ব দেন।',
    },
    {
      ch: 'bio2_ch10_immune_genetics',
      vl: 'mitosis_cell',
      topic: 'হার্ডি-ওয়াইনবার্গ সাম্যাবস্থার শর্ত',
      trueStmt: 'বড় জনসংখ্যা, অবাধ/এলোমেলো প্রজনন, মিউটেশন-মাইগ্রেশন-প্রাকৃতিক নির্বাচন অনুপস্থিত থাকলে অ্যালিল ফ্রিকোয়েন্সি প্রজন্মান্তরে স্থির থাকে',
      falseStmts: [
        'অত্যন্ত ক্ষুদ্র জনসংখ্যা ও তীব্র প্রাকৃতিক নির্বাচনে হার্ডি-ওয়াইনবার্গ সাম্যাবস্থা সবচেয়ে ভালো বজায় থাকে',
        'জেনেটিক ড্রিফট ও জিন প্রবাহ চলমান থাকলে জিন ফ্রিকোয়েন্সি কখনো বদলায় না',
        'সকল জীবের ক্ষেত্রে p + q = ২ এবং p² + 2pq + q² = ৪ হয়',
      ],
      exp: 'হার্ডি-ওয়াইনবার্গ সাম্যাবস্থায় p + q = ১ এবং p² + 2pq + q² = ১ ধ্রুব থাকে যখন বিবর্তনীয় কোনো বল (মিউটেশন, নির্বাচন, জেনেটিক ড্রিফট, মাইগ্রেশন) কাজ না করে।',
    },
  ];

  bio2TrueFalse.forEach((tf, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: tf.ch,
        visualLessonId: tf.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${tf.topic}" বিষয়ে নিচের কোন তথ্যটি সম্পূর্ণ সঠিক?`,
        correct: tf.trueStmt,
        distractors: tf.falseStmts,
        explanation: tf.exp,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · উচ্চদক্ষতা ও তুলনামূলক বিশ্লেষণ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: tf.ch,
        visualLessonId: tf.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${tf.topic}" প্রসঙ্গে নিচের কোন বক্তব্যটি ভুল বা সঠিক নয়?`,
        correct: tf.falseStmts[0],
        distractors: [
          tf.trueStmt,
          `${tf.topic} বিষয়ে পাঠ্যবইয়ে এটি স্বীকৃত বৈজ্ঞানিক তথ্য`,
          `এটি ${tf.topic}-এর স্বাভাবিক শারীরবৃত্তীয় নিয়মের সাথে সামঞ্জস্যপূর্ণ`,
        ],
        explanation: `ভুল বক্তব্য: "${tf.falseStmts[0]}"। সঠিক তথ্য: ${tf.exp}`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল',
      })
    );
  });

  return list;
}
