import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildBio2StructuredA(startSeq = 1): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = startSeq;
  const nextId = () => `bio2_sa_${String(seq++).padStart(4, '0')}`;

  // 1. Animal Phyla & Chordate Classes (~60 MCQs)
  const phylaRows = [
    { name: 'Porifera', coelom: 'অ্যাসিলোমেট (কোষীয় মাত্রা)', organ: 'কোয়ানোসাইট ও অস্টিয়া-অস্কুলাম নালিতন্ত্র', ex: 'Scypha, Spongilla' },
    { name: 'Cnidaria', coelom: 'দ্বিস্তরী ও অ্যাসিলোমেট', organ: 'নিডোসাইট (নেমাটোসিস্ট) ও সিলেন্টেরন', ex: 'Hydra vulgaris, Aurelia' },
    { name: 'Platyhelminthes', coelom: 'ত্রিস্তরী ও অ্যাসিলোমেট', organ: 'শিখা কোষ (Flame cell) ও চোষক', ex: 'Fasciola hepatica, Taenia solium' },
    { name: 'Nematoda', coelom: 'সিউডোসিলোমেট (অপ্রকৃত সিলোম)', organ: 'নলাকার অখণ্ডকায়িত দেহ ও রেনেট কোষ', ex: 'Ascaris lumbricoides, Loa loa' },
    { name: 'Mollusca', coelom: 'হিমোসিলযুক্ত ইউসিলোমেট', organ: 'ম্যান্টল পর্দা, পেশিবহুল পদ ও র‍্যাডুলা', ex: 'Pila globosa, Octopus' },
    { name: 'Annelida', coelom: 'প্রকৃত সিলোমেট (শাইজোসিল)', organ: 'প্রকৃত খণ্ডকায়ন (মেটামেরিজম) ও নেফ্রিডিয়া', ex: 'Metaphire posthuma (কেঁচো), জোঁক' },
    { name: 'Arthropoda', coelom: 'হিমোসিলযুক্ত ইউসিলোমেট', organ: 'সন্ধিযুক্ত উপাঙ্গ, কাইটিন বহিঃকঙ্কাল ও ম্যালপিজিয়ান নালিকা', ex: 'Poekilocerus (ঘাসফড়িং), চিংড়ি' },
    { name: 'Echinodermata', coelom: 'এন্টেরোসিলোমেট', organ: 'পানি সংবহনতন্ত্র (Water vascular system) ও টিউব ফিট', ex: 'Asterias (তারামাছ), সমুদ্র আর্চিন' },
    { name: 'Chordata', coelom: 'প্রকৃত ইউসিলোমেট', organ: 'নটোকর্ড, পৃষ্ঠীয় ফাঁপা স্নায়ুরজ্জু ও গলবিলীয় ফুলকা রন্ধ্র', ex: 'Ascidia, Labeo, Homo sapiens' },
  ];

  phylaRows.forEach((p, i) => {
    const others = phylaRows.filter((x) => x.name !== p.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${p.organ}" — এটি প্রাণিজগতের কোন পর্বের অনন্য শনাক্তকারী বৈশিষ্ট্য?`,
        correct: p.name,
        distractors: others.slice(i % 5, (i % 5) + 4).map((x) => x.name),
        explanation: `${p.name} পর্বের প্রাণীতে ${p.organ} থাকে এবং দেহগঠন ${p.coelom}। উদাহরণ: ${p.ex}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ১',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'board',
        question: `নিচের কোন প্রাণিগুলো ${p.name} পর্বের অন্তর্ভুক্ত?`,
        correct: p.ex,
        distractors: others.slice((i + 3) % 5, ((i + 3) % 5) + 4).map((x) => x.ex),
        explanation: `${p.ex} হলো ${p.name} পর্বের আদর্শ উদাহরণ (${p.organ})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · পর্ব পরিচিতি',
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
        question: `${p.name} পর্বের প্রাণীদের সিলোম ও ভ্রূণস্তরীয় অবস্থা নিচের কোনটি?`,
        correct: p.coelom,
        distractors: [
          'অ্যাসিলোমেট (কোষীয় মাত্রা)',
          'সিউডোসিলোমেট (অপ্রকৃত সিলোম)',
          'প্রকৃত সিলোমেট (শাইজোসিল)',
          'দ্বিস্তরী ও অ্যাসিলোমেট',
        ].filter((c) => c !== p.coelom),
        explanation: `${p.name} পর্বের সিলোম বা গঠনমাত্রা হলো "${p.coelom}"।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · সিলোম ও প্রতিসাম্যতা',
      })
    );
  });

  const vertClasses = [
    { cls: 'Myxini / Petromyzontida (চোয়ালবিহীন)', trait: 'চোয়াল ও যুগ্ম উপাঙ্গহীন ইল-সদৃশ পরজীবী মাছ; অ্যামোসিট লার্ভা', ex: 'হ্যাগফিশ ও ল্যাম্প্রে (Petromyzon)' },
    { cls: 'Chondrichthyes (তরুণাস্থিময় মাছ)', trait: 'প্ল্যাকয়েড আঁইশ, ৫–৭ জোড়া উন্মুক্ত ফুলকা রন্ধ্র ও হেটেরোসার্কাল পুচ্ছ পাখনা', ex: 'হাঙর (Scoliodon), হাতুড়ি মাছ ও শাপলাপাতা মাছ' },
    { cls: 'Actinopterygii / Osteichthyes (অস্থিময় মাছ)', trait: 'সাইক্লয়েড বা টিনয়েড আঁইশ, অপারকুলাম (কানকো) ও বায়ুথলি (পটকা)', ex: 'রুই (Labeo rohita), ইলিশ ও কাতলা' },
    { cls: 'Amphibia (উভচর)', trait: 'গ্রন্থিময় নগ্ন আর্দ্র ত্বক, ৩-প্রকোষ্ঠবিশিষ্ট হৃৎপিণ্ড ও ব্যাঙাচি লার্ভা দশা', ex: 'কুনোব্যাঙ (Duttaphrynus), সোনা ব্যাঙ ও স্যালাম্যান্ডার' },
    { cls: 'Reptilia (সরীসৃপ)', trait: 'শুষ্ক এপিডার্মাল আঁইশ ও নখরযুক্ত ৫টি আঙুল; বুকে ভর দিয়ে চলা শীতলরক্তী প্রাণী', ex: 'ঘড়িয়াল, গোখরা সাপ, কচ্ছপ ও গিরগিটি' },
    { cls: 'Aves (পাখি / পক্ষিকুল)', trait: 'পালকে আবৃত দেহ, বায়ুপূর্ণ হালকা অস্থি (Pneumatic bone), উষ্ণরক্তী ও ৪-প্রকোষ্ঠ হৃৎপিণ্ড', ex: 'দোয়েল (Copsychus saularis), কাক ও উটপাখি' },
    { cls: 'Mammalia (স্তন্যপায়ী)', trait: 'লোমশ ত্বক, দুগ্ধক্ষরণকারী স্তনগ্রন্থি, মধ্যচ্ছদা (Diaphragm) ও নিউক্লিয়াসহীন RBC', ex: 'মানুষ, রয়েল বেঙ্গল টাইগার, বাদুড় ও তিমি' },
  ];

  vertClasses.forEach((v, i) => {
    const others = vertClasses.filter((x) => x.cls !== v.cls);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${v.trait}" — এটি ভার্টিব্রাটা উপ-পর্বের কোন শ্রেণির প্রধান বৈশিষ্ট্য?`,
        correct: v.cls,
        distractors: others.slice(i % 3, (i % 3) + 4).map((x) => x.cls),
        explanation: `${v.cls}-এর বিশেষ বৈশিষ্ট্য হলো ${v.trait}। উদাহরণ: ${v.ex}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · ভার্টিব্রাটা শ্রেণিবিভাগ',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'board',
        question: `${v.ex} — প্রাণীগুলো কর্ডাটা পর্বের কোন শ্রেণির অন্তর্ভুক্ত?`,
        correct: v.cls,
        distractors: others.slice((i + 2) % 3, ((i + 2) % 3) + 4).map((x) => x.cls),
        explanation: `${v.ex} হলো ${v.cls} শ্রেণির প্রাণী (${v.trait})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১',
      })
    );
  });

  // 2. 12 Cranial Nerves (Roman Numeral, Name, Type, Function) (~48 MCQs)
  const cranialNerves = [
    { num: '১ম (I)', name: 'অলফ্যাক্টরি (Olfactory)', type: 'সংবেদী (Sensory)', fn: 'নাসিকা থেকে ঘ্রাণ অনুভূতি মস্তিষ্কে বহন করা' },
    { num: '২য় (II)', name: 'অপটিক (Optic)', type: 'সংবেদী (Sensory)', fn: 'রেটিনা থেকে দর্শন অনুভূতি মস্তিষ্কে প্রেরণ করা' },
    { num: '৩য় (III)', name: 'অকুলোমোটর (Oculomotor)', type: 'চেষ্টীয় / মোটর (Motor)', fn: 'অক্ষিগোলকের ৪টি পেশি সঞ্চালন ও পিউপিল সংকুচিত করা' },
    { num: '৪র্থ (IV)', name: 'ট্রকলিয়ার (Trochlear)', type: 'চেষ্টীয় / মোটর (Motor)', fn: 'সুপিরিয়র অব্লিক চক্ষু পেশি চালনা (ক্ষুদ্রতম করোটিক স্নায়ু)' },
    { num: '৫ম (V)', name: 'ট্রাইজেমিনাল (Trigeminal)', type: 'মিশ্র (Mixed)', fn: 'মুখমণ্ডলের স্পর্শ ও দাঁতের অনুভূতি এবং চর্বণ পেশি নিয়ন্ত্রণ (বৃহত্তম মিশ্র)' },
    { num: '৬ষ্ঠ (VI)', name: 'অ্যাবডুসেন্স (Abducens)', type: 'চেষ্টীয় / মোটর (Motor)', fn: 'চোখের ল্যাটারাল রেক্টাস পেশির মাধ্যমে অক্ষিগোলক ঘোরানো' },
    { num: '৭ম (VII)', name: 'ফেসিয়াল (Facial)', type: 'মিশ্র (Mixed)', fn: 'জিহ্বার অগ্র দুই-তৃতীয়াংশের স্বাদ ও মুখের অভিব্যক্তি প্রকাশ' },
    { num: '৮ম (VIII)', name: 'ভেস্টিবুলোককলিয়ার / অডিটরি', type: 'সংবেদী (Sensory)', fn: 'অন্তঃকর্ণ থেকে শ্রবণ ও দেহের ভারসাম্য রক্ষার সংকেত বহন' },
    { num: '৯ম (IX)', name: 'গ্লসোফ্যারিঞ্জিয়াল', type: 'মিশ্র (Mixed)', fn: 'জিহ্বার পশ্চাৎ এক-তৃতীয়াংশের স্বাদ ও গলবিলের গলধঃকরণ' },
    { num: '১০ম (X)', name: 'ভেগাস (Vagus)', type: 'মিশ্র (Mixed)', fn: 'হৃৎপিণ্ড, ফুসফুস ও পাকস্থলি পর্যন্ত বিস্তৃত (দীর্ঘতম করোটিক স্নায়ু)' },
    { num: '১১শ (XI)', name: 'স্পাইনাল অ্যাক্সেসরি', type: 'চেষ্টীয় / মোটর (Motor)', fn: 'ঘাড় ও কাঁধের (স্টার্নোক্লেইডোম্যাস্টয়েড ও ট্রাপিজিয়াস) সঞ্চালন' },
    { num: '১২শ (XII)', name: 'হাইপোগ্লোসাল (Hypoglossal)', type: 'চেষ্টীয় / মোটর (Motor)', fn: 'কথা বলা ও খাবার গেলার সময় জিহ্বার পেশি সঞ্চালন' },
  ];

  cranialNerves.forEach((cn, i) => {
    const others = cranialNerves.filter((x) => x.name !== cn.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানবদেহের ${cn.num} জোড়া করোটিক স্নায়ুটির নাম কী?`,
        correct: cn.name,
        distractors: others.slice(i % 8, (i % 8) + 4).map((x) => x.name),
        explanation: `${cn.num} করোটিক স্নায়ু হলো ${cn.name}, এটি একটি ${cn.type} স্নায়ু যার কাজ ${cn.fn}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৮ (করোটিক স্নায়ু)',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'medical',
        question: `${cn.name} (${cn.num}) করোটিক স্নায়ু প্রকৃতিগতভাবে কোন ধরনের?`,
        correct: cn.type,
        distractors: ['সংবেদী (Sensory)', 'চেষ্টীয় / মোটর (Motor)', 'মিশ্র (Mixed)', 'স্বয়ংক্রিয় সিমপ্যাথেটিক'].filter(
          (t) => t !== cn.type
        ),
        explanation: `সংবেদী (I, II, VIII), মোটর (III, IV, VI, XI, XII) এবং মিশ্র (V, VII, IX, X)। তাই ${cn.name} হলো ${cn.type}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · করোটিক স্নায়ু',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'board',
        question: `নিচের কোন করোটিক স্নায়ুটি "${cn.fn}" কাজের সাথে সরাসরি যুক্ত?`,
        correct: `${cn.name} (${cn.num})`,
        distractors: others.slice((i + 4) % 8, ((i + 4) % 8) + 4).map((x) => `${x.name} (${x.num})`),
        explanation: `${cn.name} (${cn.num}, ${cn.type})-এর প্রধান কাজ হলো ${cn.fn}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · করোটিক স্নায়ুর কাজ',
      })
    );
  });

  // 3. Human 206 Skeletal Bone Counts (~40 MCQs)
  const boneGroups = [
    { region: 'প্রাপ্তবয়স্ক মানুষের মোট অস্থি', count: '২০৬টি', note: '৮০টি অক্ষীয় ও ১২৬টি উপাঙ্গীয় অস্থি' },
    { region: 'অক্ষীয় কঙ্কালের (Axial skeleton) মোট অস্থি', count: '৮০টি', note: 'করোটি ২৯ + মেরুদণ্ড ২৬ + বক্ষপিঞ্জর ২৫' },
    { region: 'উপাঙ্গীয় কঙ্কালের (Appendicular skeleton) মোট অস্থি', count: '১২৬টি', note: 'বক্ষঅস্থিচক্র ৪ + শ্রোণীচক্র ২ + অগ্রপদ ৬০ + পশ্চাৎপদ ৬০' },
    { region: 'করোটিকা (Cranium) অংশের অস্থি', count: '৮টি', note: 'ফ্রন্টাল ১, প্যারাইটাল ২, টেম্পোরাল ২, অক্সিপিটাল ১, স্ফেনয়েড ১, ইথময়েড ১' },
    { region: 'মুখমণ্ডলীয় (Facial) অস্থি', count: '১৪টি', note: 'যার মধ্যে কেবল নিম্নচোয়াল বা ম্যান্ডিবল সচল' },
    { region: 'উভয় মধ্যকর্ণের কর্ণাস্থি (ম্যালিয়াস, ইনকাস ও স্টেপিস)', count: '৬টি (প্রতি কানে ৩টি)', note: 'স্টেপিস মানবদেহের ক্ষুদ্রতম অস্থি' },
    { region: 'প্রাপ্তবয়স্ক মানুষের মেরুদণ্ডের কশেরুকা', count: '২৬টি (ভ্রূণ/শিশুতে ৩৩টি)', note: 'C7, T12, L5, S1(5), Co1(4)' },
    { region: 'বক্ষপিঞ্জরের (Thoracic cage) পর্শুকা ও স্টার্নাম', count: '২৫টি (১২ জোড়া পর্শুকা + ১ স্টার্নাম)', note: '৭ জোড়া আসল, ৩ জোড়া নকল ও ২ জোড়া ভাসমান' },
    { region: 'মানুষের প্রতিটি হাতের কব্জির কার্পাল (Carpal) অস্থি', count: '৮টি (দুই হাতে ১৬টি)', note: '২ সারিতে ৪টি করে মোট ৮টি ছোট অস্থি' },
    { region: 'মানুষের প্রতিটি পায়ের গোড়ালির টার্সাল (Tarsal) অস্থি', count: '৭টি (দুই পায়ে ১৪টি)', note: 'সবচেয়ে বড় টার্সাল হলো ক্যালকেনিয়াস (হিল অস্থি)' },
    { region: 'প্রতিটি হাত বা পায়ের ফ্যালান্জেস (আঙুলের অস্থি)', count: '১৪টি (বৃদ্ধাঙ্গুলে ২টি, বাকি চারটিতে ৩টি করে)', note: 'চার হাত-পা মিলিয়ে ৫৬টি ফ্যালান্জেস' },
    { region: 'বক্ষ-অস্থিচক্রের (Pectoral girdle) অস্থি', count: '৪টি (২টি ক্ল্যাভিকল + ২টি স্ক্যাপুলা)', note: 'ক্ল্যাভিকলকে কলার বোন বা বিউটি বোন বলা হয়' },
  ];

  boneGroups.forEach((bg, i) => {
    const others = boneGroups.filter((x) => x.region !== bg.region);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch7_locomotion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানব কঙ্কালতন্ত্রে "${bg.region}"-এর সংখ্যা কতটি?`,
        correct: bg.count,
        distractors: others.slice(i % 7, (i % 7) + 4).map((x) => x.count),
        explanation: `${bg.region} সংখ্যায় ${bg.count}। (${bg.note})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৭',
      })
    );
  });

  // 4. Digestive Enzymes Matrix (~48 MCQs)
  const digestiveEnzymes = [
    { enz: 'টায়ালিন (লালা-অ্যামাইলেজ)', src: 'লালাগ্রন্থি (প্যারোটিড)', sub: 'সিদ্ধ শ্বেতসার (Starch)', prod: 'মল্টোজ ও ডেক্সট্রিন (মুখবিবর, pH ৬.৮)' },
    { enz: 'পেপসিন (সক্রিয়)', src: 'পাকস্থলির চিফ বা পেপটিক কোষ', sub: 'জটিল প্রোটিন', prod: 'প্রোটিওজ ও পেপটোন (পাকস্থলি, pH ১.৫–২.৫)' },
    { enz: 'রেনিন (কাইমোসিন)', src: 'শিশুর পাকস্থলির গ্যাস্ট্রিক গ্রন্থি', sub: 'দুধের দ্রবণীয় কেসিনোজেন প্রোটিন', prod: 'অদ্রবণীয় প্যারাকেসিন (দইয়ের মতো ছানা)' },
    { enz: 'ট্রিপসিন', src: 'অগ্ন্যাশয়ের অ্যাসিনাই কোষ', sub: 'প্রোটিন, প্রোটিওজ ও পেপটোন', prod: 'পলিপেপটাইড (ক্ষুদ্রান্ত্র, pH ~৮.০)' },
    { enz: 'এন্টারোকাইনেজ', src: 'ক্ষুদ্রান্ত্রের আন্ত্রিক মিউকোসা', sub: 'নিষ্ক্রিয় ট্রিপসিনোজেন', prod: 'সক্রিয় ট্রিপসিন' },
    { enz: 'প্যানক্রিয়েটিক লাইপেজ (স্টিয়াপসিন)', src: 'অগ্ন্যাশয়', sub: 'ইমালসিফাইড স্নেহ/ট্রাইগ্লিসারাইড', prod: 'মনোগ্লিসারাইড, ফ্যাটি অ্যাসিড ও গ্লিসারল' },
    { enz: 'মল্টেজ', src: 'ক্ষুদ্রান্ত্রের আন্ত্রিক রস (সাক্কাস এন্টারিকাস)', sub: 'মল্টোজ (ডাইস্যাকারাইড)', prod: '২ অণু গ্লুকোজ' },
    { enz: 'সুক্রেজ (ইনভার্টেজ)', src: 'ক্ষুদ্রান্ত্রের আন্ত্রিক রস', sub: 'সুক্রোজ (আখের চিনি)', prod: '১ অণু গ্লুকোজ + ১ অণু ফ্রুক্টোজ' },
    { enz: 'ল্যাক্টেজ', src: 'ক্ষুদ্রান্ত্রের আন্ত্রিক রস', sub: 'ল্যাকটোজ (দুধের শর্করা)', prod: '১ অণু গ্লুকোজ + ১ অণু গ্যালাকটোজ' },
    { enz: 'নিউক্লিয়েজ (DNase/RNase)', src: 'অগ্ন্যাশয়', sub: 'DNA ও RNA নিউক্লিক অ্যাসিড', prod: 'নিউক্লিওটাইডসমূহ' },
  ];

  digestiveEnzymes.forEach((de, i) => {
    const others = digestiveEnzymes.filter((x) => x.enz !== de.enz);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${de.sub}"-কে ভেঙে "${de.prod}" উৎপন্নকারী পরিপাক এনজাইম কোনটি?`,
        correct: de.enz,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.enz),
        explanation: `${de.src} থেকে নিঃসৃত ${de.enz} এনজাইমটি ${de.sub}-কে বিশ্লিষ্ট করে ${de.prod} তৈরি করে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৩',
      })
    );
    const distinctSources = Array.from(
      new Set(digestiveEnzymes.map((x) => x.src))
    ).filter((s) => {
      if (s === de.src) return false;
      if (de.src.startsWith('ক্ষুদ্রান্ত্রের আন্ত্রিক রস') && s.startsWith('ক্ষুদ্রান্ত্রের আন্ত্রিক রস')) {
        return false;
      }
      return true;
    });
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'board',
        question: `মানবদেহের পরিপাকতন্ত্রে ${de.enz} এনজাইমটি কোথা থেকে ক্ষরিত হয়?`,
        correct: de.src,
        distractors: distinctSources.slice(i % Math.max(1, distinctSources.length - 3), (i % Math.max(1, distinctSources.length - 3)) + 3).concat(distinctSources),
        explanation: `${de.enz}-এর উৎস হলো ${de.src} এবং এটি ${de.sub}-এর ওপর ক্রিয়া করে।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · পরিপাক এনজাইম',
      })
    );
  });

  // 5. Endocrine Hormones & Clinical Disorders Matrix (~50 MCQs)
  const hormoneMatrix = [
    { horm: 'গ্রোথ হরমোন (GH / সোমাটোট্রপিন)', gland: 'অগ্র পিটুইটারি', hypo: 'বামনত্ব (Dwarfism)', hyper: 'শিশুতে জাইগ্যান্টিজম ও প্রাপ্তবয়স্কে অ্যাক্রোমেগালি' },
    { horm: 'ADH (ভ্যাসোপ্রেসিন)', gland: 'হাইপোথ্যালামাস (ক্ষরণ পশ্চাৎ পিটুইটারি)', hypo: 'ডায়াবেটিস ইনসিপিডাস (অতিরিক্ত তরল মূত্রত্যাগ)', hyper: 'SIADH (অতিরিক্ত পানি ধারণ)' },
    { horm: 'থাইরক্সিন (T₃ ও T₄)', gland: 'থাইরয়েড গ্রন্থি', hypo: 'শিশুতে ক্রেটিনিজম ও বড়দের মিক্সোইডিমা/গলগণ্ড', hyper: 'গ্রেভস ডিজিজ / এক্সঅফথ্যালমিক গয়টার' },
    { horm: 'প্যারাথরমোন (PTH)', gland: 'প্যারাথাইরয়েড গ্রন্থি', hypo: 'হাইপোক্যালসেমিক টিটানি (পেশি খিঁচুনি)', hyper: 'অস্টিওপোরোসিস ও বৃক্কে পাথর' },
    { horm: 'ইনসুলিন', gland: 'অগ্ন্যাশয়ের β-কোষ', hypo: 'ডায়াবেটিস মেলিটাস (হাইপারগ্লাইসেমিয়া)', hyper: 'হাইপোগ্লাইসেমিক শক' },
    { horm: 'কর্টিসল (গ্লুকোকর্টিকয়েড)', gland: 'অ্যাড্রেনাল কর্টেক্স', hypo: 'অ্যাডিসনস ডিজিজ (ব্রোঞ্জ ত্বক ও নিম্নচাপ)', hyper: 'কুশিং সিন্ড্রোম (চাঁদমুখ ও পেটে চর্বি)' },
    { horm: 'অ্যাড্রেনালিন ও নর-অ্যাড্রেনালিন', gland: 'অ্যাড্রেনাল মেডুলা', hypo: 'মানসিক চাপে সাড়া হ্রাস', hyper: 'হৃদস্পন্দন ও রক্তচাপ তীব্র বৃদ্ধি (জরুরি অবস্থা)' },
    { horm: 'ক্যালসিটোনিন', gland: 'থাইরয়েডের প্যারাফলিকুলার কোষ', hypo: 'অস্থি থেকে ক্যালসিয়াম ক্ষয় বাড়ে', hyper: 'রক্তে ক্যালসিয়ামের মাত্রা কমে যাওয়া' },
    { horm: 'মেলাটোনিন', gland: 'পিনিয়াল গ্রন্থি', hypo: 'ঘুম ও দৈহিক জৈবিক ছন্দ (Circadian rhythm) ব্যাহত হওয়া', hyper: 'অতিরিক্ত তন্দ্রাভাব' },
    { horm: 'অক্সিটোসিন', gland: 'হাইপোথ্যালামাস (ক্ষরণ পশ্চাৎ পিটুইটারি)', hypo: 'প্রসব বেদনা দুর্বল হওয়া ও দুগ্ধ নিঃসরণে বাধা', hyper: 'জরায়ুর তীব্র সংকোচন ও মিল্ক ইজেকশন' },
  ];

  hormoneMatrix.forEach((h, i) => {
    const others = hormoneMatrix.filter((x) => x.horm !== h.horm);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `নিচের কোন হরমোনের স্বল্পতায় "${h.hypo}" এবং আধিক্যে "${h.hyper}" দেখা দেয়?`,
        correct: h.horm,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.horm),
        explanation: `${h.gland} থেকে ক্ষরিত ${h.horm}-এর স্বল্পতায় ${h.hypo} এবং আধিক্যে ${h.hyper} হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৮ (অন্তঃক্ষরা তন্ত্র)',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${h.horm}" কোন অন্তঃক্ষরা গ্রন্থি বা কোষ থেকে নিঃসৃত হয়?`,
        correct: h.gland,
        distractors: others.slice((i + 4) % 6, ((i + 4) % 6) + 4).map((x) => x.gland),
        explanation: `${h.horm}-এর উৎস হলো ${h.gland}। এর স্বল্পতায় ${h.hypo} দেখা দেয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৮ · হরমোনের উৎস',
      })
    );
  });

  return list;
}
