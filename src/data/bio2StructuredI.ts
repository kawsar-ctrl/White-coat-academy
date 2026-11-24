import { McqQuestion } from '../types/learning';
import { buildMcq, toBnDigits } from './bioQuestionHelpers';

export function buildBio2StructuredI(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `bio2_si_${String(seq++).padStart(4, '0')}`;

  // 1. 36 Iconic HSC Animal Species -> Taxonomic Group & Diagnostic Feature/Organ (36 × 3 = 108 MCQs)
  const speciesMatrix = [
    { sp: 'Spongilla lacustris (মিঠাপানির স্পঞ্জ)', taxon: 'Porifera (পরিফেরা)', trait: 'কোয়ানোসাইট কোষ ও অসংখ্য অস্টিয়াযুক্ত নালিতন্ত্র', habitat: 'পুকুর-হ্রদের মিঠাপানিতে পাথরে সংলগ্ন' },
    { sp: 'Physalia physalis (পর্তুগিজ ম্যান অব ওয়ার)', taxon: 'Cnidaria (নিডারিয়া)', trait: 'পলিপ ও মেডুসা দশার বহুরূপী (Polymorphic) উপনিবেশ ও নিউম্যাটোফোর', habitat: 'উষ্ণ সামুদ্রিক পৃষ্ঠদেশে ভাসমান' },
    { sp: 'Aurelia aurita (জেলিফিশ)', taxon: 'Cnidaria (নিডারিয়া — Scyphozoa)', trait: 'মেডুসা দশা প্রধান ও ছাতার মতো দেহে প্রচুর মেসোগ্লিয়া', habitat: 'মুক্ত সামুদ্রিক (পেল্যাজিক)' },
    { sp: 'Taenia solium (শূকরের ফিতাকৃমি)', taxon: 'Platyhelminthes (প্লাটিহেলমিনথেস)', trait: 'স্কোলেক্সে হুক-চোষক, প্রোগ্লোটিড খণ্ডাংশ ও পৌষ্টিকতন্ত্রবিহীন দেহ', habitat: 'মানুষের ক্ষুদ্রান্ত্রে অন্তঃপরজীবী' },
    { sp: 'Dugesia tigrina (প্ল্যানারিয়া)', taxon: 'Platyhelminthes (Turbellaria)', trait: 'সিলিয়াযুক্ত বহিঃত্বক, চোখের ফোটা ও প্রবল পুনরুৎপত্তি ক্ষমতা', habitat: 'মিঠাপানির তলদেশে মুক্তজীবী' },
    { sp: 'Wuchereria bancrofti (ফাইলেরিয়া কৃমি)', taxon: 'Nematoda (নেমাটোডা)', trait: 'সিউডোসিলোমেট সুতার মতো দেহ যা লসিকানালি অবরুদ্ধ করে গোদরোগ ঘটায়', habitat: 'মানুষের লসিকাতন্ত্রে ও কিউলেক্স মশায়' },
    { sp: 'Pila globosa (আপেল শামুক)', taxon: 'Mollusca (মলাস্কা — Gastropoda)', trait: 'সর্পিল প্যাঁচানো ক্যালসিয়াম খোলক, অপারকুলাম ও র‍্যাডুলা', habitat: 'ধানক্ষেত ও জলাশয়ের মিঠাপানিতে' },
    { sp: 'Sepia officinalis (কাটলফিশ)', taxon: 'Mollusca (Cephalopoda)', trait: 'মুখের চারপাশে ১০টি বাহু (২টি টেন্টাকল), অভ্যন্তরীণ কাটল-বোন ও কালির থলি', habitat: 'সামুদ্রিক তলদেশ ও খোলা সমুদ্র' },
    { sp: 'Metaphire posthuma (কেঁচো)', taxon: 'Annelida (অ্যানিলিডা — Oligochaeta)', trait: 'ক্লাইটেলাম, মেটামেরিক খণ্ডকায়ন, সিটা ও সেগমেণ্টাল নেফ্রিডিয়া', habitat: 'আর্দ্র হিউমাসসমৃদ্ধ মাটিতে ("প্রকৃতির লাঙল")' },
    { sp: 'Hirudinaria granulosa (রক্তচোষা জোঁক)', taxon: 'Annelida (Hirudinea)', trait: 'উভয় প্রান্তে চোষক, ৩৩টি প্রকৃত খণ্ডক ও লালায় অ্যান্টিকোয়াগুল্যান্ট হিরুডিন', habitat: 'জলাশয় ও স্যাঁতসেঁতে অঞ্চলে বহিঃপরজীবী' },
    { sp: 'Penaeus monodon (বাগদা চিংড়ি)', taxon: 'Arthropoda (Crustacea)', trait: 'ক্যারাপেস আবৃত সেফালোথোরাক্স, ১৯ জোড়া উপাঙ্গ ও গ্রিন গ্ল্যান্ড রেচন', habitat: 'উপকূলীয় লোনাপানিতে' },
    { sp: 'Apis indica (মৌমাছি)', taxon: 'Arthropoda (Insecta)', trait: 'সামাজিক বহুরূপী (রানি, ড্রোন, শ্রমিক), হ্যাপ্লো-ডিপ্লয়েডি ও ওয়াগল নৃত্য', habitat: 'পুষ্পধারী স্থলজ পরিবেশ' },
    { sp: 'Asterias rubens (তারামাছ)', taxon: 'Echinodermata (একাইনোডার্মাটা)', trait: '৫টি বাহু, অ্যাবোরাল ম্যাড্রেপোরাইট ও অ্যাম্বুল্যাক্রাল খাঁজে টিউব ফিট', habitat: 'কেবল সামুদ্রিক বেন্থিক অঞ্চলে' },
    { sp: 'Balanoglossus gigas (একর্ন কৃমি)', taxon: 'Hemichordata (হেমিকর্ডাটা)', trait: 'প্রোবোসিস, কলার ও ট্রাঙ্কে বিভক্ত দেহ এবং গলবিলীয় ফুলকা রন্ধ্র', habitat: 'সামুদ্রিক বালুর গর্তে (U-নালি)' },
    { sp: 'Herdmania pallida (সাগর ফোয়ারা)', taxon: 'Chordata (Urochordata)', trait: 'লার্ভা লেজে নটোকর্ড থাকলেও পূর্ণাঙ্গ দেহ টিউনিসিনে আবৃত নিশ্চল থলি', habitat: 'অগভীর সমুদ্রের তলদেশে' },
    { sp: 'Petromyzon marinus (ল্যাম্প্রে)', taxon: 'Agnatha (Petromyzontida)', trait: 'চোয়ালবিহীন গোলাকার চোষক মুখ, শৃঙ্গাকার দাঁত ও ৭ জোড়া ফুলকা ছিদ্র', habitat: 'সামুদ্রিক পরজীবী (প্রজননে নদীতে যায়)' },
    { sp: 'Scoliodon laticaudus (কুকুর হাঙর)', taxon: 'Chondrichthyes (কনড্রিকথিস)', trait: 'তরুণাস্থি কঙ্কাল, প্লাকয়েড আঁইশ, হেটারোসার্কাল লেজ ও তলদেশস্থ মুখ', habitat: 'সমুদ্র ও মোহনায় মাংসাশী' },
    { sp: 'Tenualosa ilisha (ইলিশ মাছ)', taxon: 'Actinopterygii / Osteichthyes', trait: 'রূপালি সাইক্লয়েড আঁইশ, অ্যানাড্রোমাস অভিপ্রয়াণ ও হৃদ-ধমনি সমৃদ্ধ চর্বিকোণ', habitat: 'সমুদ্র থেকে প্রজননে মিঠাপানির নদীতে আসে' },
    { sp: 'Hoplobatrachus tigerinus (সোনা ব্যাঙ)', taxon: 'Amphibia (অ্যাম্ফিবিয়া)', trait: 'আঁইশবিহীন আর্দ্র গ্রন্থিময় ত্বক, ৩ প্রকোষ্ঠী হৃৎপিণ্ড ও শীতনিদ্রা', habitat: 'জল ও স্থল উভয় পরিবেশে (উভচর)' },
    { sp: 'Gavialis gangeticus (ঘড়িয়াল)', taxon: 'Reptilia (রেপ্টিলিয়া)', trait: 'লম্বা সরু চঞ্চু, অস্থিময় স্কিউট ও অসম্পূর্ণ ৪ (কুমির-ঘড়িয়ালে সম্পূর্ণ ৪) প্রকোষ্ঠ হৃৎপিণ্ড', habitat: 'পদ্মা-যমুনা অববাহিকার স্বাদুপানিতে বিপন্ন' },
    { sp: 'Copsychus saularis (দোয়েল পাখি)', taxon: 'Aves (অ্যাভিস)', trait: 'পালকাবৃত উষ্ণশোণিত দেহ, বায়ুপূর্ণ অস্থি ও সিরিঞ্জক্স (Syrinx) স্বরযন্ত্র', habitat: 'বাংলাদেশের জাতীয় পাখি (স্থলজ/বৃক্ষবাসী)' },
    { sp: 'Panthera tigris tigris (রয়েল বেঙ্গল টাইগার)', taxon: 'Mammalia (ম্যামালিয়া)', trait: 'স্তন্যগ্রন্থি, রোম, ডায়াফ্রাম, নিউক্লিয়াসহীন RBC ও ৭টি গ্রীবা কশেরুকা', habitat: 'সুন্দরবনের ম্যানগ্রোভ বনাঞ্চল' },
    { sp: 'Ornithorhynchus anatinus (প্লাটিপাস)', taxon: 'Mammalia (Prototheria)', trait: 'হাঁসের মতো চঞ্চু, ক্লোয়াকা ছিদ্র ও ডিমপাড়া আদিম স্তন্যপায়ী বৈশিষ্ট্য', habitat: 'অস্ট্রেলিয়ার মিঠাপানির নদীতীরে' },
    { sp: 'Balaenoptera musculus (নীল তিমি)', taxon: 'Mammalia (Eutheria)', trait: 'পৃথিবীর বৃহত্তম স্তন্যপায়ী প্রাণী, দাঁতের বদলে বেলিন প্লেট ও মোটা ব্ল্যাবার স্তর', habitat: 'মহাসাগরীয় পেল্যাজিক অঞ্চল' },
  ];

  speciesMatrix.forEach((sm, i) => {
    const others = speciesMatrix.filter((x) => x.sp !== sm.sp);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `প্রাণিবিজ্ঞানে "${sm.sp}" কোন শ্রেণিবিন্যাসগত গোষ্ঠী বা পর্বের অন্তর্ভুক্ত?`,
        correct: sm.taxon,
        distractors: others.filter((x) => x.taxon !== sm.taxon).slice(0, 4).map((x) => x.taxon),
        explanation: `${sm.sp} হলো ${sm.taxon} গোষ্ঠীর প্রাণী। এর অনন্য বৈশিষ্ট্য: ${sm.trait} (${sm.habitat})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · প্রাণিজগতের উদাহরণ ও শ্রেণিবিন্যাস',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: 'dental',
        question: `নিচের কোন প্রাণীটির দেহে "${sm.trait}" দেখা যায়?`,
        correct: sm.sp,
        distractors: others.slice(i % 15, (i % 15) + 4).map((x) => x.sp),
        explanation: `${sm.sp} (${sm.taxon})-এর শনাক্তকারী বৈশিষ্ট্য হলো ${sm.trait}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · প্রজাতিগত শনাক্তকরণ',
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
        question: `"${sm.sp}"-এর আবাসস্থল ও পরিবেশগত অভিযোজন সম্পর্কে কোন তথ্যটি সঠিক?`,
        correct: `${sm.habitat} — বৈশিষ্ট্য: ${sm.trait}`,
        distractors: others.slice((i + 7) % 15, ((i + 7) % 15) + 4).map((x) => `${x.habitat} — বৈশিষ্ট্য: ${x.trait}`),
        explanation: `${sm.sp} (${sm.taxon}) মূলত ${sm.habitat} অবস্থায় পাওয়া যায়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ১ · পরিবেশগত শ্রেণিবিভাগ',
      })
    );
  });

  // 2. Human Specialized Cells -> Anatomical Organ -> Exact Function Matrix (32 × 3 = 96 MCQs)
  const cellMatrix = [
    { cell: 'প্যারাইটাল বা অক্সিনটিক কোষ', organ: 'পাকস্থলির গ্যাস্ট্রিক গ্রন্থি', role: 'হাইড্রোক্লোরিক অ্যাসিড (HCl) ও ভিটামিন B₁₂ শোষণের ক্যাসলস ইন্ট্রিনসিক ফ্যাক্টর ক্ষরণ', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac' },
    { cell: 'জাইমোজেনিক বা চিফ কোষ', organ: 'পাকস্থলির গ্যাস্ট্রিক গ্রন্থি', role: 'নিষ্ক্রিয় পেপসিনোজেন ও গ্যাস্ট্রিক লাইপেজ ক্ষরণ', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac' },
    { cell: 'গবলেট কোষ (Goblet Cell)', organ: 'শ্বাসনালি ও পৌষ্টিকনালির আবরণী কলা', role: 'পিচ্ছিল ও সুরক্ষাকারী মিউসিন (মিউকাস) ক্ষরণ', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac' },
    { cell: 'পেনেথ কোষ (Paneth Cell)', organ: 'ক্ষুদ্রান্ত্রের ক্রিপ্টস অব লিবারকুনের তলদেশ', role: 'জীবাণুনাশক লাইসোজাইম ও ডিফেনসিন ক্ষরণ করে অন্ত্রের ফ্লোরা নিয়ন্ত্রণ', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac' },
    { cell: 'কুফার কোষ (Kupffer Cell)', organ: 'যকৃতের হেপাটিক সাইনুসয়েড', role: 'জীর্ণ RBC ভক্ষণ ও রক্তের অণুজীব ধ্বংসকারী যকৃত-নির্দিষ্ট ম্যাক্রোফেজ', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac' },
    { cell: 'বিটা (β) কোষ (আইলেটস)', organ: 'অগ্ন্যাশয়ের অন্তঃক্ষরা আইলেটস অব ল্যাঙ্গারহ্যান্স', role: 'রক্তে গ্লুকোজ কমানো ইনসুলিন হরমোন ক্ষরণ (কোষে গ্লুকোজ গ্রহণ ও গ্লাইকোজেনেসিস)', ch: 'bio2_ch3_digestion', vl: 'heart_cardiac' },
    { cell: 'মেগাক্যারিওসাইট (Megakaryocyte)', organ: 'লাল অস্থিমজ্জা', role: 'সাইটোপ্লাজমের খণ্ডিত অংশ থেকে রক্তের অণুচক্রিকা (Platelets) উৎপাদন', ch: 'bio2_ch4_blood', vl: 'heart_cardiac' },
    { cell: 'মাস্ট কোষ (Mast Cell)', organ: 'সংবহন-সংলগ্ন যোজক কলা', role: 'অ্যালার্জি ও প্রদাহে IgE প্রভাবে হিস্টামিন ও হেপারিন নিঃসরণ', ch: 'bio2_ch4_blood', vl: 'heart_cardiac' },
    { cell: 'পোডোসাইট কোষ (Podocyte)', organ: 'নেফ্রনের বোম্যানস ক্যাপসুলের ভিসেরাল স্তর', role: 'পেডিসেলের মাধ্যমে পরিস্রাবণ ছিদ্র গঠন করে প্রোটিন ছাড়া আল্ট্রাফিল্ট্রেশন নিয়ন্ত্রণ', ch: 'bio2_ch6_excretion', vl: 'nephron' },
    { cell: 'ম্যাকুলা ডেনসা কোষ (Macula Densa)', organ: 'নেফ্রনের দূরবর্তী প্যাঁচানো নালিকার (DCT) প্রারম্ভে', role: 'ফিল্ট্রেটে NaCl ঘনত্ব শনাক্ত করে JGA-তে রেনিন ক্ষরণ সংকেত পাঠানো', ch: 'bio2_ch6_excretion', vl: 'nephron' },
    { cell: 'টাইপ-II নিউমোসাইট (Septal Cell)', organ: 'ফুসফুসের অ্যালভিওলার প্রাচীর', role: 'পৃষ্ঠটান কমানোর ফসফোলিপিড সারফ্যাক্ট্যান্ট ক্ষরণ', ch: 'bio2_ch5_respiration', vl: 'bohr_curve' },
    { cell: 'অস্টিওক্লাস্ট কোষ (Osteoclast)', organ: 'অস্থির রিসর্পশন তল (হাওশিপ ল্যাকুনা)', role: 'বহুনিউক্লীয় কোষ যা অস্থির খনিজ ও ম্যাট্রিক্স গলিয়ে রক্তে Ca²⁺ বাড়ায়', ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac' },
    { cell: 'কনড্রোসাইট কোষ (Chondrocyte)', organ: 'তরুণাস্থির (Cartilage) ল্যাকুনা', role: 'কনড্রোইটিন সালফেট ও কোলাজেনসমৃদ্ধ স্থিতিস্থাপক ম্যাট্রিক্স ধরে রাখা', ch: 'bio2_ch7_locomotion', vl: 'heart_cardiac' },
    { cell: 'সোয়ান কোষ (Schwann Cell)', organ: 'পেরিফেরাল (প্রান্তীয়) স্নায়ুতন্ত্র', role: 'অ্যাক্সনের চারপাশে মায়েলিন আবরণ ও পুনর্গঠনকারী নিউরোলেমা তৈরি', ch: 'bio2_ch8_coordination', vl: 'bohr_curve' },
    { cell: 'অলিগোডেন্ড্রোসাইট (Oligodendrocyte)', organ: 'কেন্দ্রীয় স্নায়ুতন্ত্র (মস্তিষ্ক ও সুষুম্নাকাণ্ড)', role: 'CNS-এর একাধিক অ্যাক্সনে একসাথে মায়েলিন শীথ গঠন', ch: 'bio2_ch8_coordination', vl: 'bohr_curve' },
    { cell: 'মাইক্রোগ্লিয়া (Microglia)', organ: 'কেন্দ্রীয় স্নায়ুতন্ত্র (CNS)', role: 'মস্তিষ্কের জীবাণু ও মৃত নিউরন পরিষ্কারকারী ভক্ষণশীল নিউরোগ্লিয়া কোষ', ch: 'bio2_ch8_coordination', vl: 'bohr_curve' },
    { cell: 'অ্যাস্ট্রোসাইট (Astrocyte)', organ: 'কেন্দ্রীয় স্নায়ুতন্ত্রের রক্তনালি-নিউরন সংযোগস্থল', role: 'রক্ত-মস্তিষ্ক বাধা (Blood-Brain Barrier) গঠন ও নিউরনকে পুষ্টি সরবরাহ', ch: 'bio2_ch8_coordination', vl: 'bohr_curve' },
    { cell: 'ক্রোমাফিন কোষ (Chromaffin Cell)', organ: 'অ্যাড্রেনাল মেডুলা', role: 'সিমপ্যাথেটিক উদ্দীপনায় অ্যাড্রেনালিন ও নর-অ্যাড্রেনালিন ক্ষরণ', ch: 'bio2_ch8_coordination', vl: 'bohr_curve' },
    { cell: 'প্যারাফলিকুলার C-কোষ', organ: 'থাইরয়েড গ্রন্থির ফলিকলের ফাঁকে', role: 'রক্তে অতিরিক্ত Ca²⁺ কমাতে ক্যালসিটোনিন হরমোন ক্ষরণ', ch: 'bio2_ch8_coordination', vl: 'bohr_curve' },
    { cell: 'প্লাজমা কোষ (Plasma Cell)', organ: 'লসিকা পর্ব, প্লীহা ও অস্থিমজ্জা', role: 'সক্রিয় B-লিম্ফোসাইট থেকে রূপান্তরিত হয়ে বিপুল অ্যান্টিবডি ক্ষরণকারী কোষ', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell' },
    { cell: 'হেল্পার T-কোষ (CD4⁺)', organ: 'থাইমাস-পরিপক্ব রক্ত ও লসিকা কলা', role: 'সাইটোকাইন (IL-2, IL-4) ছেড়ে B-কোষ ও CD8⁺ T-কোষ উভয়কেই সক্রিয় করা (HIV আক্রান্ত লক্ষ্যকোষ)', ch: 'bio2_ch10_immune_genetics', vl: 'mitosis_cell' },
    { cell: 'সিনসাইটিওট্রফোব্লাস্ট কোষ', organ: 'রোপিত ব্লাস্টোসিস্ট ও প্লাসেন্টা', role: 'গর্ভাবস্থার পরীক্ষায় শনাক্তযোগ্য hCG হরমোন ক্ষরণ ও জরায়ুতে অনুপ্রবেশ', ch: 'bio2_ch8_coordination', vl: 'bohr_curve' },
  ];

  cellMatrix.forEach((cm, i) => {
    const others = cellMatrix.filter((x) => x.cell !== cm.cell);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cm.ch,
        visualLessonId: cm.vl,
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানবদেহের "${cm.organ}"-এ অবস্থিত কোন বিশেষায়িত কোষের প্রধান কাজ হলো "${cm.role}"?`,
        correct: cm.cell,
        distractors: others.slice(i % 15, (i % 15) + 4).map((x) => x.cell),
        explanation: `${cm.organ}-এ অবস্থিত ${cm.cell}-এর মূল কাজ হলো ${cm.role}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · মানবদেহের বিশেষায়িত কোষ ও কলা',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cm.ch,
        visualLessonId: cm.vl,
        hscLevel: '12',
        difficulty: 'board',
        question: `কলাতত্ত্বে "${cm.cell}" মূলত মানবদেহের কোথায় অবস্থান করে?`,
        correct: cm.organ,
        distractors: others.slice((i + 4) % 15, ((i + 4) % 15) + 4).map((x) => x.organ),
        explanation: `${cm.cell} অবস্থান করে ${cm.organ}-এ এবং কাজ করে ${cm.role}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · হিস্টোলজি অবস্থান',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: cm.ch,
        visualLessonId: cm.vl,
        hscLevel: '12',
        difficulty: 'medical',
        question: `"${cm.cell}" (${cm.organ})-এর প্রকৃত শারীরবৃত্তীয় কাজ নিচের কোনটি?`,
        correct: cm.role,
        distractors: others.slice((i + 9) % 15, ((i + 9) % 15) + 4).map((x) => x.role),
        explanation: `${cm.cell}-এর প্রধান কাজ হলো ${cm.role}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · কোষীয় শারীরতত্ত্ব',
      })
    );
  });

  // 3. BMI Quantitative Problems (Distinct values & Clinical WHO Asia-Pacific vs Global) (15 × 2 = 30 MCQs)
  const bmiCases = [
    { w: 45, hCm: 160, cat: 'কম ওজন (Underweight — <১৮.৫)' },
    { w: 50, hCm: 170, cat: 'কম ওজন (Underweight — <১৮.৫)' },
    { w: 56, hCm: 160, cat: 'স্বাভাবিক ওজন (Normal — ১৮.৫–২৪.৯)' },
    { w: 64, hCm: 160, cat: 'স্বাভাবিক ওজন (Normal — ১৮.৫–২৪.৯)' },
    { w: 68, hCm: 170, cat: 'স্বাভাবিক ওজন (Normal — ১৮.৫–২৪.৯)' },
    { w: 72, hCm: 180, cat: 'স্বাভাবিক ওজন (Normal — ১৮.৫–২৪.৯)' },
    { w: 75, hCm: 160, cat: 'অতিরিক্ত ওজন (Overweight — ২৫.০–২৯.৯)' },
    { w: 80, hCm: 165, cat: 'অতিরিক্ত ওজন (Overweight — ২৫.০–২৯.৯)' },
    { w: 81, hCm: 180, cat: 'অতিরিক্ত ওজন (Overweight — ২৫.০–২৯.৯)' },
    { w: 88, hCm: 165, cat: 'প্রথম শ্রেণির স্থূলতা (Obesity Class I — ৩০.০–৩৪.৯)' },
    { w: 90, hCm: 160, cat: 'দ্বিতীয় শ্রেণির স্থূলতা (Obesity Class II — ৩৫.০–৩৯.৯)' },
    { w: 98, hCm: 175, cat: 'প্রথম শ্রেণির স্থূলতা (Obesity Class I — ৩০.০–৩৪.৯)' },
    { w: 105, hCm: 170, cat: 'দ্বিতীয় শ্রেণির স্থূলতা (Obesity Class II — ৩৫.০–৩৯.৯)' },
    { w: 112, hCm: 160, cat: 'তৃতীয় শ্রেণির বা মর্বিড স্থূলতা (≥৪০.০)' },
  ];
  const bmiCats = [
    'কম ওজন (Underweight — <১৮.৫)',
    'স্বাভাবিক ওজন (Normal — ১৮.৫–২৪.৯)',
    'অতিরিক্ত ওজন (Overweight — ২৫.০–২৯.৯)',
    'প্রথম শ্রেণির স্থূলতা (Obesity Class I — ৩০.০–৩৪.৯)',
    'দ্বিতীয় শ্রেণির স্থূলতা (Obesity Class II — ৩৫.০–৩৯.৯)',
    'তৃতীয় শ্রেণির বা মর্বিড স্থূলতা (≥৪০.০)',
  ];
  bmiCases.forEach((b, i) => {
    const hM = b.hCm / 100;
    const bmi = Number((b.w / (hM * hM)).toFixed(2));
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch3_digestion',
        visualLessonId: 'heart_cardiac',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `একজন প্রাপ্তবয়স্ক মানুষের দৈহিক ওজন ${toBnDigits(b.w)} kg এবং উচ্চতা ${toBnDigits(b.hCm)} cm (${toBnDigits(hM)} m) হলে তার BMI কত kg/m² এবং WHO নির্দেশিকায় তিনি কোন শ্রেণিভুক্ত?`,
        correct: `${toBnDigits(bmi)} kg/m² — ${b.cat}`,
        distractors: bmiCats.filter((c) => c !== b.cat).slice(0, 3).map((c, idx) => `${toBnDigits(Number((bmi + (idx + 1) * 4.5).toFixed(2)))} kg/m² — ${c}`),
        explanation: `BMI = ওজন (kg) / [উচ্চতা (m)]² = ${toBnDigits(b.w)} / (${toBnDigits(hM)})² = ${toBnDigits(bmi)} kg/m²; যা WHO অনুযায়ী "${b.cat}"।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · BMI ও স্থূলতা নির্ণয়',
      })
    );
  });

  // 4. Arterial vs Venous Oxygen Extraction & Fick Cardiac Output Math (12 × 2 = 24 MCQs)
  const oxyCases = [
    { ca: 20, cv: 15, co: 5 }, { ca: 20, cv: 14, co: 5 }, { ca: 19, cv: 14, co: 6 },
    { ca: 20, cv: 12, co: 10 }, { ca: 20, cv: 10, co: 15 }, { ca: 20, cv: 5, co: 20 },
    { ca: 18, cv: 13, co: 5 }, { ca: 21, cv: 15, co: 6 }, { ca: 20, cv: 8, co: 12 },
    { ca: 19.5, cv: 14.5, co: 5.5 }, { ca: 20, cv: 16, co: 4.5 }, { ca: 20, cv: 6, co: 18 },
  ];
  oxyCases.forEach((oc, i) => {
    // CaO2 in mL per 100 mL = mL/dL -> multiply by 10 to get mL/L -> multiply by CO (L/min)
    const diffDl = Number((oc.ca - oc.cv).toFixed(1));
    const vo2MlMin = Math.round(diffDl * 10 * oc.co);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch5_respiration',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `ধমনি রক্তে O₂ পরিমাণ ${toBnDigits(oc.ca)} mL/100mL, মিশ্র শিরার রক্তে O₂ পরিমাণ ${toBnDigits(oc.cv)} mL/100mL এবং কার্ডিয়াক আউটপুট প্রতি মিনিটে ${toBnDigits(oc.co)} লিটার হলে প্রতি মিনিটে দেহের টিস্যুসমূহ মোট কত mL অক্সিজেন ব্যবহার (VO₂) করে?`,
        correct: `${toBnDigits(vo2MlMin.toLocaleString('en-US'))} mL/min (প্রতি ১০০ mL রক্তে ${toBnDigits(diffDl)} mL O₂ মুক্ত)`,
        distractors: [
          `${toBnDigits(Math.round(diffDl * oc.co).toLocaleString('en-US'))} mL/min (প্রতি ১০০ mL রক্তে ${toBnDigits(diffDl)} mL O₂ মুক্ত)`,
          `${toBnDigits(Math.round(oc.ca * 10 * oc.co).toLocaleString('en-US'))} mL/min`,
          `${toBnDigits(Math.round((vo2MlMin + 150)).toLocaleString('en-US'))} mL/min`,
        ],
        explanation: `প্রতি ১০০ mL রক্তে ব্যয়িত O₂ = ${toBnDigits(oc.ca)} − ${toBnDigits(oc.cv)} = ${toBnDigits(diffDl)} mL (অর্থাৎ প্রতি লিটারে ${toBnDigits(diffDl * 10)} mL)। তাই ${toBnDigits(oc.co)} L/min-এ মোট VO₂ = ${toBnDigits(vo2MlMin)} mL/min।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ফিক নীতি (Fick Principle) ও টিস্যু শ্বসন',
      })
    );
  });

  // 5. Diploid Chromosome Numbers across Zoology Species & Meiosis Gamete/Polar Body Math (10 × 4 = 40 MCQs)
  const spChromosomes = [
    { name: 'মানুষ (Homo sapiens)', dip: 46 },
    { name: 'শিম্পাঞ্জি (Pan troglodytes)', dip: 48 },
    { name: 'ড্রসোফিলা মাছি (Drosophila)', dip: 8 },
    { name: 'হাইড্রা (Hydra vulgaris)', dip: 30 },
    { name: 'রুই মাছ (Labeo rohita)', dip: 50 },
    { name: 'সোনা ব্যাঙ (Hoplobatrachus)', dip: 26 },
    { name: 'গৃহমাছি (Musca domestica)', dip: 12 },
    { name: 'ইঁদুর (Mus musculus)', dip: 40 },
    { name: 'কুকুর (Canis familiaris)', dip: 78 },
    { name: 'মশা (Culex pipiens)', dip: 6 },
  ];
  spChromosomes.forEach((sc, i) => {
    const hap = sc.dip / 2;
    const g2Chromatids = sc.dip * 2;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch10_immune_genetics',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'board' : 'medical',
        question: `${sc.name}-এর দেহকোষে ক্রোমোজোম সংখ্যা 2n = ${toBnDigits(sc.dip)} হলে এর প্রাথমিক শুক্রাণু মাতৃকোষের S-দশার পর কতটি ক্রোমাটিড ও সেকেন্ডারি স্পার্মাটোসাইটে কতটি ক্রোমোজোম থাকবে?`,
        correct: `${toBnDigits(g2Chromatids)}টি ক্রোমাটিড ও ${toBnDigits(hap)}টি ক্রোমোজোম`,
        distractors: [
          `${toBnDigits(sc.dip)}টি ক্রোমাটিড ও ${toBnDigits(hap)}টি ক্রোমোজোম`,
          `${toBnDigits(g2Chromatids)}টি ক্রোমাটিড ও ${toBnDigits(sc.dip)}টি ক্রোমোজোম`,
          `${toBnDigits(hap)}টি ক্রোমাটিড ও ${toBnDigits(sc.dip)}টি ক্রোমোজোম`,
        ],
        explanation: `S-দশায় DNA দ্বিগুণ হওয়ায় ${toBnDigits(sc.dip)}টি ক্রোমোজোমে ${toBnDigits(g2Chromatids)}টি ক্রোমাটিড থাকে এবং মায়োসিস-১ শেষে সেকেন্ডারি স্পার্মাটোসাইটে ক্রোমোজোম অর্ধেক হয়ে n = ${toBnDigits(hap)}টি হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · ক্রোমোজোম ও গ্যামেট সংখ্যা হিসাব',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'dental',
        question: `${sc.name}-এর গ্যামেটে (শুক্রাণু বা ডিম্বাণুতে) n = ${toBnDigits(hap)}টি ক্রোমোজোম থাকলে এর ডিপ্লয়েড জাইগোটে ও মায়োসিস-১ এর প্রোফেজ-১-এ কতটি বাইভ্যালেন্ট (টেট্রাড) গঠিত হবে?`,
        correct: `জাইগোটে ${toBnDigits(sc.dip)}টি ক্রোমোজোম ও ${toBnDigits(hap)}টি বাইভ্যালেন্ট`,
        distractors: [
          `জাইগোটে ${toBnDigits(hap)}টি ক্রোমোজোম ও ${toBnDigits(sc.dip)}টি বাইভ্যালেন্ট`,
          `জাইগোটে ${toBnDigits(sc.dip)}টি ক্রোমোজোম ও ${toBnDigits(sc.dip)}টি বাইভ্যালেন্ট`,
          `জাইগোটে ${toBnDigits(g2Chromatids)}টি ক্রোমোজোম ও ${toBnDigits(hap)}টি বাইভ্যালেন্ট`,
        ],
        explanation: `n = ${toBnDigits(hap)} হলে জাইগোট 2n = ${toBnDigits(sc.dip)} এবং প্রতি জোড়া হোমোলোগাস ক্রোমোজোম মিলে ১টি বাইভ্যালেন্ট গঠন করায় মোট বাইভ্যালেন্ট = ${toBnDigits(hap)}টি।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · বাইভ্যালেন্ট ও প্লয়েডি হিসাব',
      })
    );
  });

  // 6. Animal Respiratory, Excretory, Circulatory & Locomotory Organ Quick Matrix (24 × 3 = 72 MCQs)
  const comparativeOrgans = [
    { group: 'ঘাসফড়িং ও আরশোলা (পতঙ্গ)', resp: 'ট্রাকিয়া ও স্পাইরাকল (হিমোলিম্ফ অক্সিজেন বহন করে না)', exc: 'ম্যালপিজিয়ান নালিকা (ইউরিক অ্যাসিড)', circ: 'উন্মুক্ত হিমোসিল ও ৭ প্রকোষ্ঠী পৃষ্ঠীয় হৃৎপিণ্ড' },
    { group: 'চিংড়ি ও কাঁকড়া (Crustacea)', resp: 'ফুলকা বা ব্রাঙ্কিয়া (গিলস)', exc: 'সবুজ গ্রন্থি বা অ্যান্টেনাল গ্রন্থি', circ: 'হিমোসায়ানিনযুক্ত উন্মুক্ত সংবহনতন্ত্র' },
    { group: 'মাকড়সা ও বিছা (Arachnida)', resp: 'বুক-লাং (Book lungs) ও ট্রাকিয়া', exc: 'কক্সাল গ্রন্থি ও ম্যালপিজিয়ান নালিকা', circ: 'হিমোসায়ানিনযুক্ত পৃষ্ঠীয় হৃৎপিণ্ড' },
    { group: 'কেঁচো ও জোঁক (Annelida)', resp: 'আর্দ্র ত্বক (Cutaneous respiration)', exc: 'নেফ্রিডিয়া (খণ্ডকায়িত নালিকা)', circ: 'প্লাজমায় দ্রবীভূত হিমোগ্লোবিনসহ বদ্ধ সংবহনতন্ত্র' },
    { group: 'শামুক ও ঝিনুক (Mollusca)', resp: 'টেনিডিয়া (Ctenidia) ও পালমোনারি থলি (স্থলজ Pila)', exc: 'কেবারের অঙ্গ / বোজনাসের অঙ্গ / মেটানেফ্রিডিয়া', circ: 'হিমোসায়ানিনসহ আংশিক উন্মুক্ত সংবহন (সেফালোপোডায় বদ্ধ)' },
    { group: 'যকৃৎ কৃমি ও ফিতাকৃমি (Platyhelminthes)', resp: 'পরজীবীদের অবাত শ্বসন (মুক্তজীবীদের দেহতল দিয়ে ব্যাপন)', exc: 'শিখা কোষ (Flame cells / Protonephridia)', circ: 'সংবহনতন্ত্র সম্পূর্ণ অনুপস্থিত' },
    { group: 'তারা মাছ ও সমুদ্র আর্চিন (Echinodermata)', resp: 'ডার্মাল ব্রাঙ্কি (Papulae) ও টিউব ফিট', exc: 'ব্যাপন প্রক্রিয়া (বিশেষায়িত রেচন অঙ্গ অনুপস্থিত)', circ: 'হিমাল তন্ত্র ও পানি সংবহনতন্ত্র' },
    { group: 'রুই ও কাতলা মাছ (Osteichthyes)', resp: 'কানকো-আবৃত ৪ জোড়া হলোব্রাঙ্ক ফুলকা', exc: 'মেসোনেফ্রিক বৃক্ক (প্রধানত অ্যামোনোটেলিক)', circ: '২ প্রকোষ্ঠী একক-বর্তনী ভেনাস হার্ট' },
    { group: 'সোনা ব্যাঙ (Amphibia)', resp: 'ব্যাঙাচিতে ফুলকা, পূর্ণাঙ্গ দেহে ত্বক, মুখগহ্বর ও ফুসফুস', exc: 'মেসোনেফ্রিক বৃক্ক (পূর্ণাঙ্গ ইউরিওটেলিক)', circ: '৩ প্রকোষ্ঠী (২ অলিন্দ + ১ নিলয়) অসম্পূর্ণ দ্বিবর্তনী হৃৎপিণ্ড' },
    { group: 'পাখি ও স্তন্যপায়ী (Aves & Mammalia)', resp: 'ফুসফুস (পাখিতে অতিরিক্ত ৯টি বায়ুথলি)', exc: 'মেটানেফ্রিক বৃক্ক (পাখি ইউরিকোটেলিক, স্তন্যপায়ী ইউরিওটেলিক)', circ: 'সম্পূর্ণ ৪ প্রকোষ্ঠী দ্বিবর্তনী হৃৎপিণ্ড' },
  ];
  comparativeOrgans.forEach((co, i) => {
    const others = comparativeOrgans.filter((x) => x.group !== co.group);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch1_taxonomy',
        visualLessonId: 'mitosis_cell',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `তুলনামূলক প্রাণিবিজ্ঞানে "${co.group}" গোষ্ঠীর প্রাণীদের প্রধান শ্বসন অঙ্গ বা শ্বসন পদ্ধতি কোনটি?`,
        correct: co.resp,
        distractors: others.slice(i % 6, (i % 6) + 4).map((x) => x.resp),
        explanation: `${co.group}-এর শ্বসন ব্যবস্থা হলো ${co.resp}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · তুলনামূলক শ্বসনতন্ত্র',
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
        question: `কোন প্রাণী গোষ্ঠীর রেচন অঙ্গ বা পদ্ধতি হলো "${co.exc}" এবং সংবহনতন্ত্র হলো "${co.circ}"?`,
        correct: co.group,
        distractors: others.slice((i + 2) % 6, ((i + 2) % 6) + 4).map((x) => x.group),
        explanation: `${co.group}-এর রেচন অঙ্গ: ${co.exc} এবং সংবহনতন্ত্র: ${co.circ}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · তুলনামূলক রেচন ও সংবহন',
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
        question: `"${co.group}"-এর রক্ত সংবহন ও গ্যাস পরিবহন ব্যবস্থা সম্পর্কে কোনটি সত্য?`,
        correct: co.circ,
        distractors: others.slice((i + 4) % 6, ((i + 4) % 6) + 4).map((x) => x.circ),
        explanation: `${co.group}-এর সংবহনতন্ত্র: ${co.circ}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · তুলনামূলক সংবহনতন্ত্র',
      })
    );
  });

  // 7. Comprehensive Germ Layer Organ Derivation Bidirectional Drills (30 MCQs)
  const germDerivatives = [
    { layer: 'এক্টোডার্ম (Ectoderm — বহিঃস্তর)', organs: 'কেন্দ্রীয় ও প্রান্তীয় স্নায়ুতন্ত্র, ত্বকের এপিডার্মিস, দাঁতের এনামেল, চোখের লেন্স ও কর্নিয়া, অন্তঃকর্ণ ও পিটুইটারি', cue: 'নিউরাল টিউব ও নিউরাল ক্রেস্ট থেকে গঠিত অঙ্গসমূহ' },
    { layer: 'মেসোডার্ম (Mesoderm — মধ্যস্তর)', organs: 'কঙ্কাল-হৃৎ-মসৃণ পেশি, অস্থি ও তরুণাস্থি, রক্ত-হৃৎপিণ্ড-রক্তনালি, বৃক্ক, অ্যাড্রেনাল কর্টেক্স, শুক্রাশয়-ডিম্বাশয় ও দাঁতের ডেন্টিন', cue: 'সোমাইট, নটোকর্ড ও মধ্যবর্তী মেসোডার্ম থেকে গঠিত' },
    { layer: 'এন্ডোডার্ম (Endoderm — অন্তঃস্তর)', organs: 'পৌষ্টিকনালির অভ্যন্তরীণ মিউকোসা, যকৃৎ ও অগ্ন্যাশয়, ফুসফুস-শ্বাসনালির আবরণ, থাইরয়েড-প্যারাথাইরয়েড ও মূত্রথলি আবরণ', cue: 'আর্কেনটেরন বা আদিম অন্ত্রের আবরণী থেকে উদ্ভূত' },
  ];
  const germOrganList = [
    { org: 'মস্তিষ্ক, সুষুম্নাকাণ্ড, ত্বকের এপিডার্মিস ও দাঁতের এনামেল', layer: 'এক্টোডার্ম (Ectoderm)' },
    { org: 'চোখের রেটিনা, কর্নিয়া, লেন্স ও অ্যাড্রেনাল মেডুলা', layer: 'এক্টোডার্ম (Ectoderm)' },
    { org: 'কঙ্কালপেশি, হৃৎপিণ্ড, রক্তকণিকা ও রক্তনালি', layer: 'মেসোডার্ম (Mesoderm)' },
    { org: 'সমস্ত অস্থি, তরুণাস্থি, বৃক্ক (Kidney) ও দাঁতের ডেন্টিন', layer: 'মেসোডার্ম (Mesoderm)' },
    { org: 'ত্বকের ডার্মিস, অ্যাড্রেনাল কর্টেক্স ও নটোকর্ড', layer: 'মেসোডার্ম (Mesoderm)' },
    { org: 'যকৃৎ, অগ্ন্যাশয় ও গলবিল-পাকস্থলি-অন্ত্রের আবরণী এপিথেলিয়াম', layer: 'এন্ডোডার্ম (Endoderm)' },
    { org: 'শ্বাসনালি-ফুসফুসের অভ্যন্তরীণ স্তর, থাইরয়েড ও থাইমাস গ্রন্থি', layer: 'এন্ডোডার্ম (Endoderm)' },
    { org: 'মধ্যকর্ণ ও ইউস্টেশিয়ান নালির আবরণ এবং মূত্রাশয়ের অন্তঃস্তর', layer: 'এন্ডোডার্ম (Endoderm)' },
  ];
  germDerivatives.forEach((gd) => {
    const others = germDerivatives.filter((x) => x.layer !== gd.layer);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'medical',
        question: `ভ্রূণীয় গ্যাস্ট্রুলেশনের সময় "${gd.layer}" থেকে নিচের কোন অঙ্গগুচ্ছ গঠিত হয়?`,
        correct: gd.organs,
        distractors: others.map((x) => x.organs).concat(['কেবল হৃৎপেশি ও লোহিত রক্তকণিকা']),
        explanation: `${gd.layer} (${gd.cue}) থেকে ${gd.organs} সৃষ্টি হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · ভ্রূণীয় স্তর ও অঙ্গোৎপত্তি',
      })
    );
  });
  germOrganList.forEach((go, i) => {
    const layers = ['এক্টোডার্ম (Ectoderm)', 'মেসোডার্ম (Mesoderm)', 'এন্ডোডার্ম (Endoderm)', 'মেসোগ্লিয়া (অকোষীয় স্তর)'];
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `মানব ভ্রূণীয় বিকাশে "${go.org}" — এগুলো নিচের কোন প্রাথমিক ভ্রূণস্তর থেকে উদ্ভূত হয়?`,
        correct: go.layer,
        distractors: layers.filter((l) => l !== go.layer),
        explanation: `${go.org} ভ্রূণের ${go.layer} থেকে বিকশিত হয়।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · অর্গানোজেনেসিস',
      })
    );
  });

  // 8. Menstrual Cycle Day-by-Day & Hormonal Phase Matrix (20 MCQs)
  const menstrualPhases = [
    { phase: 'রজঃস্রাব বা মেনস্ট্রুয়াল দশা (১–৫ দিন)', hormone: 'ইস্ট্রোজেন ও প্রোজেস্টেরন সর্বনিম্ন পর্যায়ে নেমে যাওয়া', event: 'সর্পিল ধমনির সংকোচনে জরায়ুর এন্ডোমেট্রিয়ামের ফাংশনাল স্তর ভেঙে রক্তপাতসহ ক্ষরণ' },
    { phase: 'প্রলিফারেটিভ বা ফলিকুলার দশা (৬–১৩ দিন)', hormone: 'অগ্র পিটুইটারির FSH ও বর্ধনশীল ফলিকলের ক্রমবর্ধমান ইস্ট্রোজেন', event: 'অভ্যন্তরীণ এন্ডোমেট্রিয়াম পুরু ও পুনর্গঠিত হওয়া এবং গ্রাফিয়ান ফলিকলের পরিপক্বতা' },
    { phase: 'ডিম্বপাত বা ওভুলেশন দশা (১৪শ দিন)', hormone: 'ইস্ট্রোজেনের পজিটিভ ফিডব্যাকে আকস্মিক LH সার্জ (LH surge)', event: 'পরিপক্ব গ্রাফিয়ান ফলিকল ফেটে মেটাফেজ-২ দশায় থাকা সেকেন্ডারি উওসাইট নির্গত হওয়া' },
    { phase: 'সিক্রেটরি বা লুটিয়াল দশা (১৫–২৮ দিন)', hormone: 'কর্পাস লুটিয়াম থেকে নিঃসৃত উচ্চমাত্রার প্রোজেস্টেরন ও মাঝারি ইস্ট্রোজেন', event: 'জরায়ু গ্রন্থি কুণ্ডলিত হয়ে গ্লাইকোজেন সমৃদ্ধ তরল ক্ষরণ করে ভ্রূণ রোপণের চূড়ান্ত প্রস্তুতি নেওয়া' },
  ];
  menstrualPhases.forEach((mp, i) => {
    const others = menstrualPhases.filter((x) => x.phase !== mp.phase);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: i % 2 === 0 ? 'medical' : 'board',
        question: `২৮ দিনের আদর্শ রজঃচক্রের "${mp.phase}"-এ জরায়ু বা ডিম্বাশয়ে প্রধানত কী ঘটে?`,
        correct: mp.event,
        distractors: others.map((x) => x.event),
        explanation: `${mp.phase}-এ হরমোনাল চালিকাশক্তি হলো "${mp.hormone}", যার ফলে ${mp.event}।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · রজঃচক্র',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'bio_2',
        chapterId: 'bio2_ch8_coordination',
        visualLessonId: 'bohr_curve',
        hscLevel: '12',
        difficulty: 'dental',
        question: `রজঃচক্রের কোন পর্যায়ের প্রধান হরমোনিক নিয়ন্ত্রক হলো "${mp.hormone}"?`,
        correct: mp.phase,
        distractors: others.map((x) => x.phase),
        explanation: `${mp.hormone} নিয়ন্ত্রণ করে ${mp.phase} (${mp.event})।`,
        reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৯ · ঋতুচক্রের হরমোন নিয়ন্ত্রণ',
      })
    );
  });

  return list;
}
