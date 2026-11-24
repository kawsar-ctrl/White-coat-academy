import { BoardId, McqQuestion } from '../types/learning';
import { EXTRA_PRACTICE_QUESTIONS } from './extraPracticeQuestions';
import { PAST_YEAR_QUESTIONS } from './pastYearQuestions';
import { BIO1_EXPANDED_QUESTIONS } from './bio1QuestionBank';
import { BIO2_EXPANDED_QUESTIONS } from './bio2QuestionBank';
import { CHEM1_EXPANDED_QUESTIONS } from './chem1QuestionBank';
import { CHEM2_EXPANDED_QUESTIONS } from './chem2QuestionBank';
import { PHYS1_EXPANDED_QUESTIONS } from './phys1QuestionBank';
import { PHYS2_EXPANDED_QUESTIONS } from './phys2QuestionBank';
import { ENG_EXPANDED_QUESTIONS } from './engQuestionBank';
import { GK_EXPANDED_QUESTIONS } from './gkQuestionBank';
import { NCTB_SUPPLEMENT_QUESTIONS } from './nctbSupplementQuestions';
import { normalizeQuestionToNctb } from './nctbChapterMapper';

const CORE_QUESTIONS: McqQuestion[] = [
  // =========================================================
  // BIOLOGY 1ST PAPER (উদ্ভিদবিজ্ঞান) — 16 Questions
  // =========================================================
  {
    id: 'b1_q01',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch1_cell',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'প্লাজমামেমব্রেনের ফ্লুইড-মোজাইক মডেল কত সালে এবং কোন বিজ্ঞানীগণ প্রস্তাব করেন?',
    options: [
      '১৯৭২ সালে, সিঙ্গার ও নিকলসন',
      '১৯৫৯ সালে, রবার্টসন',
      '১৯৩৫ সালে, ড্যানিয়েলি ও ডেভসন',
      '১৯৬৫ সালে, বেনসন',
    ],
    correctIndex: 0,
    explanation:
      '১৯৭২ সালে এস. জে. সিঙ্গার এবং জি. এল. নিকলসন কোষঝিল্লির সর্বজনগ্রাহ্য ফ্লুইড-মোজাইক মডেল প্রস্তাব করেন। এতে ফসফোলিপিড দ্বিস্তরের মাঝে প্রোটিন অণুগুলো মোজাইকের মতো ভাসমান থাকে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · ড. আবুল হাসান · অধ্যায় ১',
  },
  {
    id: 'b1_q02',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch1_cell',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'প্রোক্যারিওটিক বা আদিকোষের রাইবোজোমের উপ-একক দুটি কী কী?',
    options: ['60S ও 40S', '50S ও 30S', '50S ও 40S', '30S ও 20S'],
    correctIndex: 1,
    explanation:
      'আদিকোষের 70S রাইবোজোম 50S ও 30S উপ-একক নিয়ে গঠিত। প্রকৃতকোষের 80S রাইবোজোম 60S ও 40S উপ-একক নিয়ে গঠিত। মাইটোকন্ড্রিয়া ও ক্লোরোপ্লাস্টেও 70S রাইবোজোম থাকে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · ড. আবুল হাসান · অধ্যায় ১',
  },
  {
    id: 'b1_q03',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch1_cell',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'dental',
    question: 'কোন অঙ্গাণুটিকে কোষের "আত্মঘাতী থলিকা" (Suicidal bag) বলা হয়?',
    options: ['গলগি বডি', 'পারঅক্সিসোম', 'লাইসোজোম', 'সেন্ট্রিওল'],
    correctIndex: 2,
    explanation:
      'লাইসোজোমে প্রায় ৪০-৫০ ধরনের হাইড্রোলাইটিক এনজাইম থাকে। কোষ ক্ষতিগ্রস্ত হলে বা অক্সিজেনের অভাব ঘটলে এর আবরণী ফেটে সম্পূর্ণ কোষটিকেই পরিপাক করে দেয়, যাকে অটোফ্যাগি বা অটোলাইসিস বলে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · কোষ ও এর গঠন',
  },
  {
    id: 'b1_q04',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch1_cell',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'board',
    question: 'DNA-এর ডাবল হেলিক্সের প্রতিটি পূর্ণ ঘূর্ণনের দৈর্ঘ্য কত?',
    options: ['৩.৪ Å', '৩৪ Å', '২.০ nm', '০.৩৪ nm'],
    correctIndex: 1,
    explanation:
      'ওয়াটসন ও ক্রিকের মডেল অনুযায়ী DNA হেলিক্সের একটি পূর্ণ ঘূর্ণনে ১০টি বেসপেয়ার থাকে এবং এর দৈর্ঘ্য ৩৪ Å (বা ৩.৪ nm)। পাশাপাশি দুটি বেসপেয়ারের দূরত্ব ৩.৪ Å।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ১ · নিউক্লিক অ্যাসিড',
  },
  {
    id: 'b1_q05',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch2_division',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'মায়োসিস কোষ বিভাজনের প্রোফেজ-১ এর কোন উপ-পর্যায়ে "ক্রসিং ওভার" সংঘটিত হয়?',
    options: ['লেপ্টোটিন', 'জাইগোটিন', 'প্যাকাইটিন', 'ডিপ্লোটিন'],
    correctIndex: 2,
    explanation:
      'প্রোফেজ-১ এর প্যাকাইটিন উপ-পর্যায়ে হোমোলোগাস ক্রোমোজোমের নন-সিস্টার ক্রোমাটিডের মধ্যে অংশ বিনিময় বা ক্রসিং ওভার ঘটে। আর কায়াজমা স্পষ্ট দেখা যায় ডিপ্লোটিন উপ-পর্যায়ে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষ বিভাজন',
  },
  {
    id: 'b1_q06',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch2_division',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'ইন্টারফেজ দশার কোন উপ-দশায় কোষের DNA প্রতিলিপন (Replication) সম্পন্ন হয়?',
    options: ['G₁ দশা', 'S দশা', 'G₂ দশা', 'M দশা'],
    correctIndex: 1,
    explanation:
      'ইন্টারফেজের S (Synthesis) দশায় DNA প্রতিলিপন এবং হিস্টোন প্রোটিন সংশ্লেষ ঘটে, ফলে ক্রোমোজোমের DNA পরিমাণ দ্বিগুণ হয়। এতে ইন্টারফেজের প্রায় ৩০-৫০% সময় ব্যয় হয়।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · কোষ চক্র',
  },
  {
    id: 'b1_q07',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch2_division',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'board',
    question: 'মাইটোসিসের কোন পর্যায়ে ক্রোমোজোমগুলো সবচেয়ে খাটো ও মোটা হয় এবং বিষুবীয় অঞ্চলে অবস্থান করে?',
    options: ['প্রোফেজ', 'প্রো-মেটাফেজ', 'মেটাফেজ', 'অ্যানাফেজ'],
    correctIndex: 2,
    explanation:
      'মেটাফেজ পর্যায়ে সুপারকয়েলিংয়ের কারণে ক্রোমোজোম সবচেয়ে খাটো, মোটা ও স্পষ্ট হয় এবং স্পিন্ডল যন্ত্রের বিষুবীয় অঞ্চলে (Equatorial plate) অবস্থান নেয়। একে মেটাকাইনেসিস বলে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · মাইটোসিস',
  },
  {
    id: 'b1_q08',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch2_division',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'dental',
    question: 'অ্যানাফেজ পর্যায়ে V-আকৃতির ক্রোমোজোমকে কী বলা হয়?',
    options: ['মেটাসেন্ট্রিক', 'সাব-মেটাসেন্ট্রিক', 'অ্যাক্রোসেন্ট্রিক', 'টেলোসেন্ট্রিক'],
    correctIndex: 0,
    explanation:
      'সেন্ট্রোমিয়ারের অবস্থানের ভিত্তিতে অ্যানাফেজ চলনের সময় মেটাসেন্ট্রিক ক্রোমোজোম V-আকৃতি, সাব-মেটাসেন্ট্রিক L-আকৃতি, অ্যাক্রোসেন্ট্রিক J-আকৃতি এবং টেলোসেন্ট্রিক I-আকৃতি ধারণ করে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ২ · অ্যানাফেজ চলন',
  },
  {
    id: 'b1_q09',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch4_microbe',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'T₂ ব্যাকটেরিওফাজের জেনেটিক বস্তু কোন ধরনের নিউক্লিক অ্যাসিড?',
    options: ['একসূত্রক RNA', 'দ্বিসূত্রক RNA', 'একসূত্রক DNA', 'দ্বিসূত্রক DNA'],
    correctIndex: 3,
    explanation:
      'T₂ ব্যাকটেরিওফাজের মস্তকে প্রায় ১৫০টি জিনযুক্ত একটি দীর্ঘ দ্বিসূত্রক (dsDNA) অণু থাকে। অন্যদিকে TMV, ডেঙ্গু, HIV ও করোনা হলো RNA ভাইরাস।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · অণুজীব',
  },
  {
    id: 'b1_q10',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch4_microbe',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'মানবদেহে ম্যালেরিয়া পরজীবীর (Plasmodium) কোন দশাটি মশকীর লালারস থেকে প্রবেশ করে?',
    options: ['মেরোজয়েট', 'স্পোরোজয়েট', 'ট্রফোজয়েট', 'ক্রিপ্টোজয়েট'],
    correctIndex: 1,
    explanation:
      'স্ত্রী অ্যানোফিলিস মশকী কামড়ালে তার লালারসের সাথে Plasmodium-এর সংক্রমণক্ষম মাকু আকৃতির স্পোরোজয়েট দশা মানুষের রক্তে প্রবেশ করে এবং যকৃতে আশ্রয় নেয়।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ম্যালেরিয়া পরজীবী',
  },
  {
    id: 'b1_q11',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch4_microbe',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'dental',
    question: 'রোগীর রক্তে প্লেটলেট (অণুচক্রিকা) সংখ্যা মারাত্মকভাবে কমে যাওয়া কোন ভাইরাসজনিত রোগের প্রধান লক্ষণ?',
    options: ['হেপাটাইটিস বি', 'ডেঙ্গু হেমোরেজিক জ্বর', 'পোলিও', 'জলাতঙ্ক'],
    correctIndex: 1,
    explanation:
      'ফ্ল্যাভিভাইরাস গোত্রের ডেঙ্গু ভাইরাস (Aedes aegypti মশকী বাহিত) সংক্রমণে রক্তের অণুচক্রিকা ১,৫০,০০০/ঘনমিমি থেকে দ্রুত কমে ৫০,০০০-এর নিচে নেমে যেতে পারে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ডেঙ্গু জ্বর',
  },
  {
    id: 'b1_q12',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch4_microbe',
    visualLessonId: 'mitosis_cell',
    hscLevel: '11',
    difficulty: 'board',
    question: 'ব্যাকটেরিয়ার কোষপ্রাচীরের প্রধান রাসায়নিক উপাদান কী?',
    options: ['সেলুলোজ', 'কাইটিন', 'পেপটিডোগ্লাইক্যান (মিউরিন)', 'লিগনিন'],
    correctIndex: 2,
    explanation:
      'ব্যাকটেরিয়ার কোষপ্রাচীরের মূল গঠনগত উপাদান হলো পেপটিডোগ্লাইক্যান বা মিউকোপেপটাইড। গ্রাম-পজিটিভ ব্যাকটেরিয়ায় এর স্তর পুরু এবং টিকোয়িক অ্যাসিড থাকে।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৪ · ব্যাকটেরিয়া',
  },
  {
    id: 'b1_q13',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch9_physiology',
    visualLessonId: 'photosynthesis',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'C₄ উদ্ভিদে কার্বন বিজারণের প্রথম স্থায়ী পদার্থ কোনটি?',
    options: ['৩-ফসফোগ্লিসারিক অ্যাসিড (3-PGA)', 'অক্সালোঅ্যাসিটিক অ্যাসিড (OAA)', 'ম্যালিক অ্যাসিড', 'রাইবুলোজ ১,৫-বিসফসফেট'],
    correctIndex: 1,
    explanation:
      'হ্যাচ ও স্ল্যাক (C₄) চক্রে PEP কার্বোক্সিলেজ এনজাইমের সহায়তায় ৪-কার্বনবিশিষ্ট অক্সালোঅ্যাসিটিক অ্যাসিড (OAA) প্রথম স্থায়ী পদার্থ হিসেবে উৎপন্ন হয়। C₃ উদ্ভিদে প্রথম স্থায়ী পদার্থ 3-PGA।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · উদ্ভিদ শারীরতত্ত্ব',
  },
  {
    id: 'b1_q14',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch9_physiology',
    visualLessonId: 'photosynthesis',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'সবাত শ্বসনে ১ অণু গ্লুকোজ সম্পূর্ণ জারিত হলে নিট কত অণু ATP উৎপন্ন হয় (আধুনিক হিসাব অনুযায়ী)?',
    options: ['৩৮ অণু', '৩৬ অণু', '২৪ অণু', '১৮ অণু'],
    correctIndex: 1,
    explanation:
      'উচ্চতর প্রকৃতকোষে গ্লাইকোলাইসিসে উৎপন্ন ২ অণু NADH+H⁺ মাইটোকন্ড্রিয়ায় প্রবেশে ২ অণু ATP খরচ হওয়ায় নিট ৩৬ অণু ATP উৎপন্ন হয় (পুরোনো বা আদিকোষের হিসাবে ৩৮ অণু, আধুনিক বইয়ের প্রশ্নে উভয় অপশন থাকলে প্রকৃতকোষে ৩৬ এবং মোট/আদিকোষে ৩৮ ধরা হয়; আবুল হাসান স্যারের বইয়ে মোট ৩৬ অণু প্রধান)।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · শ্বসন',
  },
  {
    id: 'b1_q15',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch9_physiology',
    visualLessonId: 'photosynthesis',
    hscLevel: '11',
    difficulty: 'dental',
    question: 'ক্রেবস চক্র কোষের কোন অঙ্গাণুতে সংঘটিত হয়?',
    options: ['সাইটোপ্লাজম', 'মাইটোকন্ড্রিয়ার ম্যাট্রিক্স', 'ক্লোরোপ্লাস্টের স্ট্রোমা', 'মাইটোকন্ড্রিয়ার ক্রিস্টি'],
    correctIndex: 1,
    explanation:
      'গ্লাইকোলাইসিস সাইটোপ্লাজমে, ক্রেবস চক্র মাইটোকন্ড্রিয়ার ম্যাট্রিক্সে এবং ইলেকট্রন ট্রান্সপোর্ট চেইন (ETC) মাইটোকন্ড্রিয়ার অন্তঃঝিল্লির ক্রিস্টিতে সংঘটিত হয়।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · ক্রেবস চক্র',
  },
  {
    id: 'b1_q16',
    subjectId: 'bio_1',
    medicalGroup: 'bio',
    chapterId: 'bio1_ch9_physiology',
    visualLessonId: 'photosynthesis',
    hscLevel: '11',
    difficulty: 'board',
    question: 'পত্ররন্ধ্র খোলা ও বন্ধ হওয়ায় কোন আয়নটির ভূমিকা সবচেয়ে বেশি?',
    options: ['Na⁺ আয়ন', 'K⁺ আয়ন', 'Ca²⁺ আয়ন', 'Mg²⁺ আয়ন'],
    correctIndex: 1,
    explanation:
      'আধুনিক প্রোটন পাম্প মতবাদ অনুযায়ী রক্ষীকোষে পটাশিয়াম আয়ন (K⁺) প্রবেশ করলে অভিস্রবণিক চাপ বেড়ে কোষ স্ফীত হয় এবং পত্ররন্ধ্র খুলে যায়।',
    reference: 'জীববিজ্ঞান ১ম পত্র · অধ্যায় ৯ · প্রস্বেদন',
  },

  // =========================================================
  // BIOLOGY 2ND PAPER (প্রাণিবিজ্ঞান) — 16 Questions
  // =========================================================
  {
    id: 'b2_q01',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch3_digestion',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'পাকস্থলির কোন কোষ থেকে হাইড্রোক্লোরিক অ্যাসিড (HCl) এবং ইন্ট্রিনসিক ফ্যাক্টর ক্ষরিত হয়?',
    options: ['মিউকাস কোষ', 'জাইমোজেনিক বা পেপটিক কোষ', 'প্যারাইটাল বা অক্সিনটিক কোষ', 'G-কোষ'],
    correctIndex: 2,
    explanation:
      'পাকস্থলির প্যারাইটাল (অক্সিনটিক) কোষ HCl ও ক্যাসল ইন্ট্রিনসিক ফ্যাক্টর (ভিটামিন B₁₂ শোষণে প্রয়োজনীয়) ক্ষরণ করে। পেপটিক/চিফ কোষ ক্ষরণ করে পেপসিনোজেন।',
    reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৩',
  },
  {
    id: 'b2_q02',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch3_digestion',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'নিচের কোন এনজাইমটি নিষ্ক্রিয় ট্রিপসিনোজেনকে সক্রিয় ট্রিপসিনে পরিণত করে?',
    options: ['পেপসিন', 'এন্টারোকাইনেজ', 'অ্যামাইলেজ', 'কাইমোট্রিপসিন'],
    correctIndex: 1,
    explanation:
      'ক্ষুদ্রান্ত্রের আন্ত্রিক রস থেকে নিঃসৃত এন্টারোকাইনেজ (Enterokinase) এনজাইমটি অগ্ন্যাশয় রসের নিষ্ক্রিয় ট্রিপসিনোজেনকে সক্রিয় ট্রিপসিনে রূপান্তর করে।',
    reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৩',
  },
  {
    id: 'b2_q03',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch3_digestion',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'মানবদেহের সবচেয়ে বড় গ্রন্থি যকৃতের কোন কোষটি রোগজীবাণু ভক্ষণ (ফ্যাগোসাইটোসিস) করে?',
    options: ['হেপাটোসাইট', 'কাপফার কোষ (Kupffer cell)', 'আইলেটস অব ল্যাঙ্গারহ্যান্স', 'প্যানেথ কোষ'],
    correctIndex: 1,
    explanation:
      'যকৃতের সাইনুসয়েডে অবস্থিত কাপফার কোষ (ম্যাক্রোফেজ) রক্তের মৃত লোহিত রক্তকণিকা ও ব্যাকটেরিয়াকে ফ্যাগোসাইটোসিস প্রক্রিয়ায় ধ্বংস করে।',
    reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৩',
  },
  {
    id: 'b2_q04',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch3_digestion',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'board',
    question: 'স্বাভাবিক ওজনের একজন প্রাপ্তবয়স্ক মানুষের BMI (Body Mass Index) সীমা কত?',
    options: ['১৮.৫-এর কম', '১৮.৫ থেকে ২৪.৯ kg/m²', '২৫.০ থেকে ২৯.৯ kg/m²', '৩০.০-এর বেশি'],
    correctIndex: 1,
    explanation:
      'WHO-এর মানদণ্ড অনুযায়ী স্বাভাবিক BMI হলো ১৮.৫–২৪.৯ kg/m²। ২৫–২৯.৯ অতিরিক্ত ওজন এবং ৩০ বা তার বেশি হলে তা স্থূলতা (Obesity) নির্দেশ করে।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৩ · স্থূলতা',
  },
  {
    id: 'b2_q05',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch4_blood',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'হৃৎপিণ্ডের বাম অলিন্দ ও বাম নিলয়ের সংযোগস্থলে অবস্থিত কপাটিকার নাম কী?',
    options: ['ট্রাইকাসপিড কপাটিকা', 'বাইকাসপিড বা মাইট্রাল কপাটিকা', 'অ্যাওর্টিক সেমিলুনার কপাটিকা', 'থিবিসিয়ান কপাটিকা'],
    correctIndex: 1,
    explanation:
      'বাম অলিন্দ ও বাম নিলয়ের মাঝে ২টি কাস্পযুক্ত বাইকাসপিড (মাইট্রাল) কপাটিকা থাকে। ডান অলিন্দ ও ডান নিলয়ের মাঝে থাকে ট্রাইকাসপিড কপাটিকা।',
    reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৪',
  },
  {
    id: 'b2_q06',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch4_blood',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'মানুষের স্বাভাবিক কার্ডিয়াক চক্রের (০.৮ সেকেন্ড) মধ্যে নিলয়ের সিস্টোল (Ventricular Systole) কত সেকেন্ড স্থায়ী হয়?',
    options: ['০.১ সেকেন্ড', '০.৩ সেকেন্ড', '০.৪ সেকেন্ড', '০.৫ সেকেন্ড'],
    correctIndex: 1,
    explanation:
      '০.৮ সেকেন্ডের কার্ডিয়াক চক্রে: অলিন্দ সিস্টোল ০.১ সে., অলিন্দ ডায়াস্টোল ০.৭ সে., নিলয় সিস্টোল ০.৩ সে. এবং নিলয় ডায়াস্টোল ০.৫ সেকেন্ড।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · কার্ডিয়াক চক্র',
  },
  {
    id: 'b2_q07',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch4_blood',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'হৃৎপিণ্ডের প্রাকৃতিক পেসমেকার (Natural Pacemaker) কোনটি?',
    options: ['AV নোড', 'SA নোড (সাইনো-অ্যাট্রিয়াল নোড)', 'বান্ডেল অব হিজ', 'পার্কিনজি তন্তু'],
    correctIndex: 1,
    explanation:
      'ডান অলিন্দের প্রাচীরে সুপিরিয়র ভেনাক্যাভার ছিদ্রের নিচে অবস্থিত SA নোড স্বতঃস্ফূর্তভাবে বৈদ্যুতিক উদ্দীপনা (৭০-৮০/মিনিট) সৃষ্টি করে বলে একে প্রাকৃতিক পেসমেকার বলা হয়।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · হৃৎস্পন্দন নিয়ন্ত্রণ',
  },
  {
    id: 'b2_q08',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch4_blood',
    visualLessonId: 'heart_cardiac',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'রক্ত তঞ্চনের জন্য অপরিহার্য চারটি প্রধান ফ্যাক্টরের মধ্যে "ফ্যাক্টর IV" কোনটি?',
    options: ['ফাইব্রিনোজেন', 'প্রোথ্রম্বিন', 'থ্রম্বোপ্লাস্টিন', 'ক্যালসিয়াম আয়ন (Ca²⁺)'],
    correctIndex: 3,
    explanation:
      'রক্ত তঞ্চনের ১৩টি ফ্যাক্টরের প্রথম চারটি প্রধান: I-ফাইব্রিনোজেন, II-প্রোথ্রম্বিন, III-থ্রম্বোপ্লাস্টিন, এবং IV-ক্যালসিয়াম আয়ন (Ca²⁺)।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৪ · রক্ত তঞ্চন',
  },
  {
    id: 'b2_q09',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch5_respiration',
    visualLessonId: 'bohr_curve',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'রক্তে CO₂-এর মাত্রা বৃদ্ধি ও pH কমে গেলে হিমোগ্লোবিন থেকে অক্সিজেন দ্রুত বিযুক্ত হওয়ার ঘটনাকে কী বলে?',
    options: ['হ্যালডেন প্রভাব', 'বোর প্রভাব (Bohr Effect)', 'হ্যামবার্গার প্রক্রিয়া', 'প্যাস্টুর প্রভাব'],
    correctIndex: 1,
    explanation:
      'সক্রিয় টিস্যুতে pCO₂ বাড়লে এবং pH কমলে (অম্লীয় পরিবেশ) অক্সিজেন-হিমোগ্লোবিন বিয়োজন লেখ ডানদিকে সরে যায় এবং টিস্যুতে বেশি অক্সিজেন মুক্ত হয়—এটিই বোর প্রভাব।',
    reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৫',
  },
  {
    id: 'b2_q10',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch5_respiration',
    visualLessonId: 'bohr_curve',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'রক্তে কার্বন ডাই-অক্সাইডের (CO₂) প্রায় ৬৫% কীভাবে পরিবাহিত হয়?',
    options: [
      'ভৌত দ্রবণরূপে প্লাজমায়',
      'কার্বামিনো যৌগরূপে',
      'বাইকার্বনেট (HCO₃⁻) আয়নরূপে',
      'কার্বক্সিহিমোগ্লোবিনরূপে',
    ],
    correctIndex: 2,
    explanation:
      'CO₂-এর প্রায় ৬৫% বাইকার্বনেট (NaHCO₃ ও KHCO₃) রূপে, ২৭% কার্বামিনো যৌগরূপে এবং মাত্র ৫-৮% ভৌত দ্রবণরূপে পরিবাহিত হয়।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · গ্যাসীয় পরিবহন',
  },
  {
    id: 'b2_q11',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch5_respiration',
    visualLessonId: 'bohr_curve',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'অ্যালভিওলাসের প্রাচীরের কোন কোষটি সারফ্যাকট্যান্ট (Surfactant) ক্ষরণ করে ফুসফুসকে চুপসে যাওয়া থেকে রক্ষা করে?',
    options: ['গবলেট কোষ', 'সেপ্টাল কোষ (Type-II অ্যালভিওলার কোষ)', 'সিলিয়াযুক্ত কোষ', 'চ্যাপ্টা স্কোয়ামাস কোষ'],
    correctIndex: 1,
    explanation:
      'অ্যালভিওলার প্রাচীরের সেপ্টাল কোষ ফসফোলিপিড সমৃদ্ধ সারফ্যাকট্যান্ট ক্ষরণ করে, যা তরলের পৃষ্ঠটান কমিয়ে অ্যালভিওলাসকে খোলা রাখে। ২৩ সপ্তাহ বয়সী ভ্রূণে এটি ক্ষরণ শুরু হয়।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · অ্যালভিওলাস',
  },
  {
    id: 'b2_q12',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch5_respiration',
    visualLessonId: 'bohr_curve',
    hscLevel: '12',
    difficulty: 'board',
    question: 'মানুষের ফুসফুসের ভাইটাল ক্যাপাসিটি (Vital Capacity) সাধারণত কত মিলিলিটার?',
    options: ['৫০০ mL', '৩০০০ mL', '৪৫০০ mL', '৬০০০ mL'],
    correctIndex: 2,
    explanation:
      'টাইডাল ভলিউম (৫০০ mL) + ইনস্পাইরেটরি রিজার্ভ ভলিউম (৩০০০ mL) + এক্সপাইরেটরি রিজার্ভ ভলিউম (১০০০ mL) = প্রায় ৪৫০০ mL হলো ভাইটাল ক্যাপাসিটি।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৫ · ফুসফুসের বায়ু ধারণক্ষমতা',
  },
  {
    id: 'b2_q13',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch6_excretion',
    visualLessonId: 'nephron',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'নেফ্রনের কোন অংশে গ্লোমেরুলার পরিস্রাবণ (অতিপরিস্রাবণ) প্রক্রিয়ায় সবচেয়ে বেশি গ্লুকোজ ও অ্যামিনো অ্যাসিড পুনঃশোষিত হয়?',
    options: ['হেনলির লুপ', 'নিকটবর্তী প্যাঁচানো নালিকা (PCT)', 'দূরবর্তী প্যাঁচানো নালিকা (DCT)', 'সংগ্রাহী নালিকা'],
    correctIndex: 1,
    explanation:
      'গ্লোমেরুলাসে উৎপন্ন আল্ট্রাফিল্ট্রেটের প্রায় ১০০% গ্লুকোজ ও অ্যামিনো অ্যাসিড এবং ৬৫-৮০% পানি ও Na⁺ নিকটবর্তী প্যাঁচানো নালিকায় (PCT) সক্রিয় পরিবহনে পুনঃশোষিত হয়।',
    reference: 'জীববিজ্ঞান ২য় পত্র · গাজী আজমল · অধ্যায় ৬',
  },
  {
    id: 'b2_q14',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch6_excretion',
    visualLessonId: 'nephron',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'রক্তে পানির পরিমাণ কমে গেলে পিটুইটারি গ্রন্থি থেকে ক্ষরিত কোন হরমোন নেফ্রনের DCT ও সংগ্রাহী নালিকায় পানির পুনঃশোষণ বাড়ায়?',
    options: ['অ্যালডোস্টেরন', 'ADH (ভ্যাসোপ্রেসিন)', 'অ্যাট্রিয়াল ন্যাট্রিইউরেটিক পেপটাইড', 'রেনিন'],
    correctIndex: 1,
    explanation:
      'হাইপোথ্যালামাসে তৈরি এবং পশ্চাৎ পিটুইটারি থেকে ক্ষরিত ADH (Anti-Diuretic Hormone) নেফ্রনের দূরবর্তী প্যাঁচানো নালিকা ও সংগ্রাহী নালিকার ভেদ্যতা বাড়িয়ে পানি পুনঃশোষণ নিয়ন্ত্রণ করে।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · অসমোরেগুলেশন',
  },
  {
    id: 'b2_q15',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch6_excretion',
    visualLessonId: 'nephron',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'স্বাভাবিক মানুষের উভয় বৃক্কে প্রতি মিনিটে গ্লোমেরুলার ফিল্ট্রেশন রেট (GFR) কত?',
    options: ['১২৫ mL/min', '৫০ mL/min', '১২০০ mL/min', '১৮০ mL/min'],
    correctIndex: 0,
    explanation:
      'দুই বৃক্ক মিলিয়ে প্রতি মিনিটে ১২৫ mL (বা দিনে প্রায় ১৮০ লিটার) গ্লোমেরুলার ফিল্ট্রেট উৎপন্ন হয়। এর ৯৯% পুনঃশোষিত হয়ে দিনে ১.৫ লিটার মূত্র তৈরি হয়।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · মূত্র সৃষ্টি',
  },
  {
    id: 'b2_q16',
    subjectId: 'bio_2',
    medicalGroup: 'bio',
    chapterId: 'bio2_ch6_excretion',
    visualLessonId: 'nephron',
    hscLevel: '12',
    difficulty: 'board',
    question: 'মানবদেহের ইউরিয়া চক্র (অরনিথিন চক্র) কোথায় সংঘটিত হয়?',
    options: ['বৃক্কে', 'যকৃতে', 'প্লীহায়', 'অগ্ন্যাশয়ে'],
    correctIndex: 1,
    explanation:
      'অতিরিক্ত অ্যামিনো অ্যাসিডের ডিঅ্যামিনেশনের ফলে সৃষ্ট বিষাক্ত অ্যামোনিয়া যকৃতের কোষে ক্রেবস-হেনসেলিট (অরনিথিন) চক্রের মাধ্যমে অপেক্ষাকৃত কম বিষাক্ত ইউরিয়ায় পরিণত হয়।',
    reference: 'জীববিজ্ঞান ২য় পত্র · অধ্যায় ৬ · ইউরিয়া সংশ্লেষ',
  },

  // =========================================================
  // CHEMISTRY 1ST PAPER (রসায়ন ১ম পত্র) — 13 Questions
  // =========================================================
  {
    id: 'c1_q01',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch2_qualitative',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'একটি ইলেকট্রনের জন্য n = 3 এবং l = 2 হলে অরবিটালটি কোনটি এবং এতে সর্বোচ্চ কতটি ইলেকট্রন থাকতে পারে?',
    options: ['3p অরবিটাল, ৬টি', '3d অরবিটাল, ১০টি', '3s অরবিটাল, ২টি', '4d অরবিটাল, ১০টি'],
    correctIndex: 1,
    explanation:
      'l = 2 মানে d উপশক্তিস্তর। তাই n = 3, l = 2 হলো 3d উপশক্তিস্তর, যেখানে m = -2,-1,0,+1,+2 অর্থাৎ ৫টি অরবিটালে সর্বোচ্চ ২ × ৫ = ১০টি ইলেকট্রন থাকতে পারে।',
    reference: 'রসায়ন ১ম পত্র · হাজারী-নাগ · অধ্যায় ২',
  },
  {
    id: 'c1_q02',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch2_qualitative',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'হাইড্রোজেনের পারমাণবিক বর্ণালির কোন সিরিজটি দৃশ্যমান অঞ্চলে (৩৮০-৭৮০ nm) পাওয়া যায়?',
    options: ['লাইম্যান সিরিজ', 'বামার সিরিজ', 'প্যাশ্চেন সিরিজ', 'ব্র্যাকেট সিরিজ'],
    correctIndex: 1,
    explanation:
      'ইলেকট্রন উচ্চতর স্তর থেকে n₁ = 2 স্তরে ফিরে এলে বামার সিরিজ সৃষ্টি হয়, যা দৃশ্যমান অঞ্চলে পড়ে। লাইম্যান (n₁=1) অতিবেগুনি এবং প্যাশ্চেন/ব্র্যাকেট অবলোহিত অঞ্চলে।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · পারমাণবিক বর্ণালি',
  },
  {
    id: 'c1_q03',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch2_qualitative',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'dental',
    question: 'শিখা পরীক্ষায় (Flame Test) ক্যালসিয়াম (Ca²⁺) আয়ন কী বর্ণ সৃষ্টি করে?',
    options: ['সোনালি হলুদ', 'ইটের মতো লাল', 'বেগুনি', 'নীলাভ সবুজ'],
    correctIndex: 1,
    explanation:
      'শিখা পরীক্ষায় Ca²⁺ ইটের মতো লাল, Na⁺ সোনালি হলুদ, K⁺ বেগুনি এবং Cu²⁺ নীলাভ সবুজ বর্ণ তৈরি করে। মেডিকেল পরীক্ষায় এটি অত্যন্ত কমন প্রশ্ন।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · আয়ন শনাক্তকরণ',
  },
  {
    id: 'c1_q04',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch2_qualitative',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'board',
    question: 'কোনটি Fe²⁺ (Z = 26) আয়নের সঠিক ইলেকট্রন বিন্যাস?',
    options: ['[Ar] 3d⁴ 4s²', '[Ar] 3d⁶ 4s⁰', '[Ar] 3d⁵ 4s¹', '[Ar] 3d⁶ 4s²'],
    correctIndex: 1,
    explanation:
      'Fe (26)-এর বিন্যাস [Ar] 3d⁶ 4s²। আয়নিত হওয়ার সময় সর্ববহিঃস্থ 4s অরবিটাল থেকে ২টি ইলেকট্রন অপসারিত হয়ে Fe²⁺-এর বিন্যাস হয় [Ar] 3d⁶ 4s⁰।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ২ · ইলেকট্রন বিন্যাস',
  },
  {
    id: 'c1_q05',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch3_periodic',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'H₂O অণুতে অক্সিজেন পরমাণুর সংকরায়ন এবং বন্ধন কোণ কত?',
    options: ['sp², ১২০°', 'sp³, ১০৯.৫°', 'sp³, ১০৪.৫°', 'sp, ১৮০°'],
    correctIndex: 2,
    explanation:
      'H₂O-তে অক্সিজেন sp³ সংকরিত হলেও ২টি নিঃসঙ্গ ইলেকট্রন জোড় (Lone pair) থাকায় lone pair–bond pair বিকর্ষণে বন্ধন কোণ ১০৯.৫° থেকে কমে ১০৪.৫° হয়।',
    reference: 'রসায়ন ১ম পত্র · হাজারী-নাগ · অধ্যায় ৩',
  },
  {
    id: 'c1_q06',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch3_periodic',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'নিচের কোন মৌলটির প্রথম আয়নিকরণ শক্তি (Ionization Energy) সবচেয়ে বেশি?',
    options: ['বোরন (B)', 'নাইট্রোজেন (N)', 'অক্সিজেন (O)', 'কার্বন (C)'],
    correctIndex: 1,
    explanation:
      'নাইট্রোজেনের (1s² 2s² 2p³) 2p অরবিটাল অর্ধপূর্ণ থাকায় এটি অত্যন্ত স্থিতিশীল। ফলে এর প্রথম আয়নিকরণ শক্তি অক্সিজেনের (2p⁴) চেয়েও বেশি।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · পর্যায়বৃত্ত ধর্ম',
  },
  {
    id: 'c1_q07',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch3_periodic',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'dental',
    question: 'ফাজানের নীতি অনুযায়ী নিচের কোন যৌগটিতে সমযোজী বৈশিষ্ট্য (পোলারায়ন) সবচেয়ে বেশি?',
    options: ['NaCl', 'MgCl₂', 'AlCl₃', 'BeCl₂'],
    correctIndex: 2,
    explanation:
      'ক্যাটায়নের চার্জ বেশি এবং আকার ছোট হলে পোলারায়ন ক্ষমতা বাড়ে। Al³⁺-এর চার্জ (+3) সর্বাধিক ও আকার ক্ষুদ্রতম হওয়ায় AlCl₃-এর সমযোজী বৈশিষ্ট্য সবচেয়ে বেশি।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · ফাজানের নীতি',
  },
  {
    id: 'c1_q08',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch3_periodic',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'board',
    question: 'ইথাইন (HC≡CH) অণুতে কার্বন পরমাণুগুলো কোন ধরনের সংকরায়ন প্রদর্শন করে?',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctIndex: 0,
    explanation:
      'ত্রি-বন্ধনযুক্ত কার্বন (HC≡CH) ২টি সিগমা ও ২টি পাই বন্ধন গঠন করে। এর সংকরায়ন sp, আকৃতি সরলরৈখিক এবং বন্ধন কোণ ১৮০°।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · সংকরায়ন',
  },
  {
    id: 'c1_q09',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch3_periodic',
    visualLessonId: 'hybridization',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'কোন যৌগটিতে আন্তঃআণবিক হাইড্রোজেন বন্ধন থাকায় এটি সাধারণ তাপমাত্রায় তরল?',
    options: ['H₂S', 'H₂O', 'HCl', 'CH₄'],
    correctIndex: 1,
    explanation:
      'অক্সিজেনের উচ্চ তড়িৎ ঋণাত্মকতা (৩.৫) ও ক্ষুদ্র আকারের কারণে H₂O অণুগুলোর মধ্যে শক্তিশালী আন্তঃআণবিক H-বন্ধন তৈরি হয়, ফলে এটি তরল; অথচ H₂S গ্যাস।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ৩ · হাইড্রোজেন বন্ধন',
  },
  {
    id: 'c1_q10',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch4_equilibrium',
    visualLessonId: 'ph_buffer',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'মানুষের রক্তের স্বাভাবিক pH কত এবং রক্তের প্রধান বাফার তন্ত্র কোনটি?',
    options: [
      'pH 7.35–7.45, H₂CO₃ / HCO₃⁻ বাফার',
      'pH 6.80–7.00, CH₃COOH / CH₃COONa বাফার',
      'pH 7.80–8.10, NH₄OH / NH₄Cl বাফার',
      'pH 7.00–7.15, ফসফেট বাফার',
    ],
    correctIndex: 0,
    explanation:
      'মানুষের রক্তের pH অত্যন্ত সূক্ষ্মভাবে ৭.৩৫–৭.৪৫ (গড় ৭.৪) সীমায় রক্ষিত হয়, যার প্রধান কারিগর বাইকার্বনেট বাফার তন্ত্র (H₂CO₃ + NaHCO₃)।',
    reference: 'রসায়ন ১ম পত্র · হাজারী-নাগ · অধ্যায় ৪',
  },
  {
    id: 'c1_q11',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch4_equilibrium',
    visualLessonId: 'ph_buffer',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ) বিক্রিয়ায় কোন অবস্থায় অ্যামোনিয়ার উৎপাদন সর্বোচ্চ হবে?',
    options: [
      'উচ্চ তাপমাত্রা ও নিম্ন চাপ',
      'নিম্ন তাপমাত্রা ও উচ্চ চাপ',
      'উচ্চ তাপমাত্রা ও উচ্চ চাপ',
      'শুধুমাত্র নিম্ন চাপ',
    ],
    correctIndex: 1,
    explanation:
      'লা শাতেলিয়ার নীতি অনুযায়ী তাপোৎপাদী বিক্রিয়ায় তাপমাত্রা কমালে সাম্যাবস্থা ডানে সরে এবং বিক্রিয়কে ৪ মোল থেকে উৎপাদে ২ মোল হওয়ায় চাপ বাড়ালে উৎপাদ বাড়ে।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · রাসায়নিক সাম্যাবস্থা',
  },
  {
    id: 'c1_q12',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch4_equilibrium',
    visualLessonId: 'ph_buffer',
    hscLevel: '11',
    difficulty: 'dental',
    question: '0.005 M H₂SO₄ দ্রবণের pH মান কত?',
    options: ['2.0', '2.3', '1.7', '3.0'],
    correctIndex: 0,
    explanation:
      'H₂SO₄ দ্বি-ক্ষারকীয় সবল অ্যাসিড। তাই [H⁺] = 2 × 0.005 = 0.01 M = 10⁻² M। সুতরাং pH = -log(10⁻²) = 2.0।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · pH গণনা',
  },
  {
    id: 'c1_q13',
    subjectId: 'chem_1',
    medicalGroup: 'chem',
    chapterId: 'chem1_ch4_equilibrium',
    visualLessonId: 'ph_buffer',
    hscLevel: '11',
    difficulty: 'board',
    question: 'কোন ক্ষেত্রে Kp এবং Kc-এর মান সমান হবে?',
    options: [
      'PCl₅(g) ⇌ PCl₃(g) + Cl₂(g)',
      'H₂(g) + I₂(g) ⇌ 2HI(g)',
      '2SO₂(g) + O₂(g) ⇌ 2SO₃(g)',
      'N₂O₄(g) ⇌ 2NO₂(g)',
    ],
    correctIndex: 1,
    explanation:
      'Kp = Kc(RT)^Δn। H₂ + I₂ ⇌ 2HI বিক্রিয়ায় Δn = 2 - (1+1) = 0, তাই (RT)⁰ = 1 এবং Kp = Kc।',
    reference: 'রসায়ন ১ম পত্র · অধ্যায় ৪ · Kp ও Kc সম্পর্ক',
  },

  // =========================================================
  // CHEMISTRY 2ND PAPER (রসায়ন ২য় পত্র) — 13 Questions
  // =========================================================
  {
    id: 'c2_q01',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch1_env',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'SATP (Standard Ambient Temperature and Pressure) অবস্থায় ১ মোল আদর্শ গ্যাসের আয়তন কত?',
    options: ['22.4 L', '24.789 L', '22.71 L', '24.0 L'],
    correctIndex: 1,
    explanation:
      'SATP (25°C বা 298 K ও 100 kPa চাপে) ১ মোল আদর্শ গ্যাসের আয়তন 24.789 L। আর STP (0°C ও 1 atm)-তে মোলার আয়তন 22.4 L।',
    reference: 'রসায়ন ২য় পত্র · হাজারী-নাগ · অধ্যায় ১',
  },
  {
    id: 'c2_q02',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch1_env',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'নিচের কোনটি একটি লুইস ক্ষার (Lewis Base)?',
    options: ['BF₃', 'AlCl₃', 'NH₃', 'H⁺'],
    correctIndex: 2,
    explanation:
      'লুইস মতবাদ অনুসারে যে অণু বা আয়ন নিঃসঙ্গ ইলেকট্রন জোড় দান করতে পারে তা লুইস ক্ষার। NH₃-তে নাইট্রোজেনের ওপর একটি নিঃসঙ্গ ইলেকট্রন জোড় রয়েছে। BF₃ ও AlCl₃ হলো লুইস অ্যাসিড।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · অ্যাসিড-ক্ষার মতবাদ',
  },
  {
    id: 'c2_q03',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch1_env',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'WHO-এর মানদণ্ড অনুযায়ী বাংলাদেশের পানীয় জলে আর্সেনিকের সর্বোচ্চ গ্রহণযোগ্য মাত্রা কত?',
    options: ['0.01 mg/L', '0.05 mg/L', '0.10 mg/L', '1.0 mg/L'],
    correctIndex: 1,
    explanation:
      'WHO-এর বৈশ্বিক মানদণ্ড 0.01 ppm (mg/L) হলেও বাংলাদেশের জন্য সর্বোচ্চ গ্রহণযোগ্য মাত্রা 0.05 mg/L বা 0.05 ppm নির্ধারিত। (প্রশ্নে বাংলাদেশের মানদণ্ড চাইলে 0.05 mg/L)।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · পরিবেশ রসায়ন',
  },
  {
    id: 'c2_q04',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch1_env',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'board',
    question: 'একই তাপমাত্রা ও চাপে কোন গ্যাসটির ব্যাপন হার (Diffusion Rate) সবচেয়ে বেশি?',
    options: ['CO₂', 'NH₃', 'HCl', 'CH₄'],
    correctIndex: 3,
    explanation:
      'গ্রাহামের ব্যাপন সূত্র r ∝ 1/√M। আণবিক ভর সবচেয়ে কম CH₄ (M = 16)-এর, তাই এর ব্যাপন হার সবচেয়ে বেশি (NH₃ = 17, HCl = 36.5, CO₂ = 44)।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ১ · গ্রাহামের ব্যাপন সূত্র',
  },
  {
    id: 'c2_q05',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch2_organic',
    visualLessonId: 'benzene_aromatic',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'নিচের কোন মূলকটি বেনজিন বলয়ে "মেটা-নির্দেশক" (Meta-directing) এবং বলয় নিষ্ক্রিয়কারী?',
    options: ['-OH', '-NH₂', '-NO₂', '-CH₃'],
    correctIndex: 2,
    explanation:
      '-NO₂, -CHO, -COOH, -CN, -SO₃H হলো ইলেকট্রন আকর্ষী বা বলয় নিষ্ক্রিয়কারী মেটা-নির্দেশক। অন্যদিকে -OH, -NH₂, -CH₃ হলো অর্থো-প্যারা নির্দেশক।',
    reference: 'রসায়ন ২য় পত্র · হাজারী-নাগ · অধ্যায় ২',
  },
  {
    id: 'c2_q06',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch2_organic',
    visualLessonId: 'benzene_aromatic',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'SN1 বিক্রিয়ার ক্ষেত্রে অ্যালকাইল হ্যালাইডের সক্রিয়তার সঠিক ক্রম কোনটি?',
    options: [
      '1° > 2° > 3° > CH₃X',
      '3° > 2° > 1° > CH₃X',
      'CH₃X > 1° > 2° > 3°',
      '2° > 3° > 1° > CH₃X',
    ],
    correctIndex: 1,
    explanation:
      'SN1 বিক্রিয়ায় কার্বোক্যাটায়ন অন্তর্বর্তী যৌগ তৈরি হয়। 3° কার্বোক্যাটায়ন সবচেয়ে স্থায়ী হওয়ায় SN1-এ সক্রিয়তা ক্রম 3° > 2° > 1° > CH₃X। SN2-তে এর ঠিক বিপরীত।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · জৈব বিক্রিয়ার কৌশল',
  },
  {
    id: 'c2_q07',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch2_organic',
    visualLessonId: 'benzene_aromatic',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'অ্যালডিহাইড ও কিটোনের মধ্যে পার্থক্য নির্ণয়ে কোন বিকারকটি সিলভার দর্পণ (Silver mirror) সৃষ্টি করে?',
    options: ['লুকাস বিকারক', 'টলেন বিকারক ([Ag(NH₃)₂]OH)', 'গ্রিগনার্ড বিকারক', 'নেসলার বিকারক'],
    correctIndex: 1,
    explanation:
      'অ্যামোনিয়াক্যাল সিলভার নাইট্রেট বা টলেন বিকারকের সাথে অ্যালডিহাইড বিক্রিয়া করে টেস্টটিউবের গায়ে উজ্জ্বল সিলভার দর্পণ সৃষ্টি করে, কিন্তু কিটোন এ বিক্রিয়া দেয় না।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · কার্বনিল যৌগ',
  },
  {
    id: 'c2_q08',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch2_organic',
    visualLessonId: 'benzene_aromatic',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'ইথানল ও ইথানয়িক অ্যাসিডের মধ্যে পার্থক্য করতে কোন বিকারক ব্যবহার করলে বুদবুদসহ CO₂ গ্যাস নির্গত হয়?',
    options: ['Na ধাতু', 'NaHCO₃ দ্রবণ', 'PCl₅', 'টলেন বিকারক'],
    correctIndex: 1,
    explanation:
      'জৈব অ্যাসিড (CH₃COOH) সোডিয়াম বাইকার্বনেট (NaHCO₃)-এর সাথে বিক্রিয়া করে CO₂ গ্যাসের বুদবুদ উৎপন্ন করে, যা অ্যালকোহল করে না।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · কার্যকরী মূলক শনাক্তকরণ',
  },
  {
    id: 'c2_q09',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch2_organic',
    visualLessonId: 'benzene_aromatic',
    hscLevel: '12',
    difficulty: 'board',
    question: 'হাকেল নীতি (4n + 2) অনুসারে বেনজিনে মোট কয়টি সঞ্চরণশীল পাই (π) ইলেকট্রন থাকে?',
    options: ['২টি', '৪টি', '৬টি', '১০টি'],
    correctIndex: 2,
    explanation:
      'বেনজিনে n = 1 বসলে (4×1 + 2) = ৬টি সঞ্চরণশীল π-ইলেকট্রন পাওয়া যায়, যা এর অ্যারোমেটিকত্বের প্রধান শর্ত পূরণ করে।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ২ · অ্যারোমেটিক যৌগ',
  },
  {
    id: 'c2_q10',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch3_quant',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'মৃদু অ্যাসিড (CH₃COOH) ও সবল ক্ষারের (NaOH) টাইট্রেশনে কোন নির্দেশকটি সবচেয়ে উপযুক্ত?',
    options: ['মিথাইল অরেঞ্জ', 'মিথাইল রেড', 'ফেনলফথ্যালিন', 'লিটমাস'],
    correctIndex: 2,
    explanation:
      'মৃদু অ্যাসিড ও সবল ক্ষারের প্রশমন বিন্দুতে দ্রবণ সামান্য ক্ষারীয় থাকে (pH > 7, পরিসর ৮–১০)। তাই ফেনলফথ্যালিন (বর্ণ পরিবর্তনের পরিসর ৮.৩–১০.০) সবচেয়ে উপযুক্ত।',
    reference: 'রসায়ন ২য় পত্র · হাজারী-নাগ · অধ্যায় ৩',
  },
  {
    id: 'c2_q11',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch3_quant',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'অম্লীয় মাধ্যমে KMnO₄ কর্তৃক জারণ-বিজারণ বিক্রিয়ায় ম্যাঙ্গানিজের জারণ মানের পরিবর্তন কত থেকে কত হয়?',
    options: ['+7 থেকে +4', '+7 থেকে +2', '+6 থেকে +3', '+7 থেকে +6'],
    correctIndex: 1,
    explanation:
      'অম্লীয় মাধ্যমে MnO₄⁻ (+7) আয়নের ৫টি ইলেকট্রন গ্রহণ করে বর্ণহীন Mn²⁺ (+2) আয়নে পরিণত হয়। তাই KMnO₄-এর তুল্য সংখ্যা ৫।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · জারণ-বিজারণ টাইট্রেশন',
  },
  {
    id: 'c2_q12',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch3_quant',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'নিচের কোনটি একটি প্রাইমারি স্ট্যান্ডার্ড পদার্থ?',
    options: ['NaOH', 'HCl', 'KMnO₄', 'অনার্দ্র Na₂CO₃'],
    correctIndex: 3,
    explanation:
      'অনার্দ্র সোডিয়াম কার্বনেট (Na₂CO₃), অক্সালিক অ্যাসিড (H₂C₂O₄·2H₂O) এবং K₂Cr₂O₇ হলো প্রাইমারি স্ট্যান্ডার্ড পদার্থ। NaOH, HCl, KMnO₄ হলো সেকেন্ডারি স্ট্যান্ডার্ড।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · প্রমাণ দ্রবণ',
  },
  {
    id: 'c2_q13',
    subjectId: 'chem_2',
    medicalGroup: 'chem',
    chapterId: 'chem2_ch3_quant',
    visualLessonId: 'ph_buffer',
    hscLevel: '12',
    difficulty: 'board',
    question: '5% NaOH জলীয় দ্রবণের মোলার ঘনমাত্রা (Molarity) কত?',
    options: ['0.5 M', '1.0 M', '1.25 M', '2.5 M'],
    correctIndex: 2,
    explanation:
      'S = (10 × x) / M = (10 × 5) / 40 = 50 / 40 = 1.25 M। এটি মেডিকেল ও HSC-এর জন্য অতি জরুরি শর্টকাট সূত্র।',
    reference: 'রসায়ন ২য় পত্র · অধ্যায় ৩ · মোলারিটি',
  },

  // =========================================================
  // PHYSICS (পদার্থবিজ্ঞান ১ম ও ২য় পত্র) — 20 Questions
  // =========================================================
  {
    id: 'p_q01',
    subjectId: 'phys_1',
    medicalGroup: 'phys',
    chapterId: 'phys1_ch2_vector',
    visualLessonId: 'circuits_optics',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'দুটি ভেক্টরের স্কেলার গুণফল (A·B = 0) শূন্য হলে তাদের মধ্যবর্তী কোণ কত?',
    options: ['0°', '45°', '90°', '180°'],
    correctIndex: 2,
    explanation:
      'A·B = AB cosθ। cosθ = 0 হলে θ = 90°, অর্থাৎ ভেক্টর দুটি পরস্পর লম্ব। আর ক্রস গুণফল A×B = 0 হলে তারা পরস্পর সমান্তরাল (θ = 0° বা 180°)।',
    reference: 'পদার্থবিজ্ঞান ১ম পত্র · ড. শাহজাহান তপন · অধ্যায় ২',
  },
  {
    id: 'p_q02',
    subjectId: 'phys_1',
    medicalGroup: 'phys',
    chapterId: 'phys1_ch3_dynamics',
    visualLessonId: 'circuits_optics',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'একটি প্রাসকে (Projectile) কত কোণে নিক্ষেপ করলে এর আনুভূমিক পাল্লা (Range) সর্বাধিক হবে?',
    options: ['30°', '45°', '60°', '90°'],
    correctIndex: 1,
    explanation:
      'পাল্লা R = (v₀² sin2θ) / g। sin2θ-এর সর্বোচ্চ মান ১ যখন 2θ = 90° অর্থাৎ θ = 45°। আর সর্বোচ্চ উচ্চতায় পৌঁছাতে θ = 90°।',
    reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৩ · প্রাসের গতি',
  },
  {
    id: 'p_q03',
    subjectId: 'phys_1',
    medicalGroup: 'phys',
    chapterId: 'phys1_ch4_newtonian',
    visualLessonId: 'circuits_optics',
    hscLevel: '11',
    difficulty: 'dental',
    question: 'টর্কের (Torque) মাত্রা সমীকরণ কোনটি?',
    options: ['[MLT⁻²]', '[ML²T⁻²]', '[ML²T⁻¹]', '[ML⁻¹T⁻²]'],
    correctIndex: 1,
    explanation:
      'টর্ক τ = r × F। বল [MLT⁻²] এবং দূরত্ব [L]-এর গুণফল [ML²T⁻²], যা কাজ বা শক্তির মাত্রার সমান।',
    reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৪ · নিউটনীয় বলবিদ্যা',
  },
  {
    id: 'p_q04',
    subjectId: 'phys_1',
    medicalGroup: 'phys',
    chapterId: 'phys1_ch5_work_energy',
    visualLessonId: 'circuits_optics',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'কোনো বস্তুর গতিশক্তি ৪ গুণ করা হলে তার রৈখিক ভরবেগ কত গুণ হবে?',
    options: ['২ গুণ', '৪ গুণ', '৮ গুণ', '১৬ গুণ'],
    correctIndex: 0,
    explanation:
      'গতিশক্তি E_k = p² / (2m), অর্থাৎ p = √(2m E_k)। গতিশক্তি ৪ গুণ হলে ভরবেগ p ∝ √4 = ২ গুণ হবে।',
    reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · কাজ, শক্তি ও ক্ষমতা',
  },
  {
    id: 'p_q05',
    subjectId: 'phys_1',
    medicalGroup: 'phys',
    chapterId: 'phys1_ch5_work_energy',
    visualLessonId: 'circuits_optics',
    hscLevel: '11',
    difficulty: 'board',
    question: '১ অশ্বক্ষমতা (1 Horsepower) সমান কত ওয়াট?',
    options: ['546 W', '746 W', '1000 W', '4186 W'],
    correctIndex: 1,
    explanation:
      'যান্ত্রিক ক্ষমতার ব্যবহারিক একক অশ্বক্ষমতা বা HP, যেখানে 1 HP = 746 Watt (J/s)।',
    reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৫ · ক্ষমতা',
  },
  {
    id: 'p_q06',
    subjectId: 'phys_1',
    medicalGroup: 'phys',
    chapterId: 'phys1_ch6_gravitation',
    visualLessonId: 'circuits_optics',
    hscLevel: '11',
    difficulty: 'medical',
    question: 'পৃথিবী পৃষ্ঠে মুক্তি বেগের (Escape Velocity) মান প্রায় কত?',
    options: ['7.9 km/s', '11.2 km/s', '9.8 km/s', '14.5 km/s'],
    correctIndex: 1,
    explanation:
      'মুক্তি বেগ v_e = √(2gR) = √(2 × 9.8 × 6.4×10⁶) ≈ 11.2 km/s। এই বেগে কোনো বস্তু নিক্ষেপ করলে তা আর পৃথিবীতে ফিরে আসে না।',
    reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৬ · মহাকর্ষ ও অভিকর্ষ',
  },
  {
    id: 'p_q07',
    subjectId: 'phys_1',
    medicalGroup: 'phys',
    chapterId: 'phys1_ch8_periodic_motion',
    visualLessonId: 'circuits_optics',
    hscLevel: '11',
    difficulty: 'board',
    question: 'একটি সেকেন্ড দোলকের কার্যকর দৈর্ঘ্য পৃথিবীতে প্রায় কত মিটার এবং এর দোলনকাল কত?',
    options: ['০.৫ মিটার, ১ সেকেন্ড', '১.০ মিটার, ২ সেকেন্ড', '২.০ মিটার, ৪ সেকেন্ড', '১.৫ মিটার, ২ সেকেন্ড'],
    correctIndex: 1,
    explanation:
      'যে দোলকের দোলনকাল ২ সেকেন্ড (অর্ধদোলন ১ সেকেন্ড) তাকে সেকেন্ড দোলক বলে। T = 2π√(L/g) সূত্র থেকে L = g/π² ≈ 0.993 m ≈ 1.0 m।',
    reference: 'পদার্থবিজ্ঞান ১ম পত্র · অধ্যায় ৮ · পর্যাবৃত্ত গতি',
  },
  {
    id: 'p_q08',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_thermo',
    visualLessonId: 'thermodynamics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'একটি রুদ্ধতাপীয় প্রক্রিয়ায় (Adiabatic Process) নিচের কোন ভৌত রাশিটি ধ্রুব থাকে?',
    options: ['তাপমাত্রা (T)', 'চাপ (P)', 'এনট্রপি (S)', 'আয়তন (V)'],
    correctIndex: 2,
    explanation:
      'রুদ্ধতাপীয় প্রক্রিয়ায় বাইরে থেকে তাপ গৃহীত বা বর্জিত হয় না (dQ = 0)। তাই এনট্রপির পরিবর্তন dS = dQ/T = 0, অর্থাৎ এনট্রপি ধ্রুব থাকে। এজন্য একে সমএনট্রপি প্রক্রিয়াও বলে।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · তপন স্যার · অধ্যায় ১',
  },
  {
    id: 'p_q09',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_thermo',
    visualLessonId: 'thermodynamics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'একটি কার্নো ইঞ্জিন 400 K ও 300 K তাপমাত্রার মধ্যে কাজ করলে এর কর্মদক্ষতা (Efficiency) কত?',
    options: ['20%', '25%', '33.3%', '75%'],
    correctIndex: 1,
    explanation:
      'কর্মদক্ষতা η = (1 - T₂/T₁) × 100% = (1 - 300/400) × 100% = (100/400) × 100% = 25%।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · কার্নো ইঞ্জিন',
  },
  {
    id: 'p_q10',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_thermo',
    visualLessonId: 'thermodynamics',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'সমোষ্ণ প্রক্রিয়ায় (Isothermal Process) কোনটি শূন্য হয়?',
    options: ['কৃতকাজ (dW)', 'অভ্যন্তরীণ শক্তির পরিবর্তন (dU)', 'তাপের পরিবর্তন (dQ)', 'চাপের পরিবর্তন (dP)'],
    correctIndex: 1,
    explanation:
      'সমোষ্ণ প্রক্রিয়ায় তাপমাত্রা স্থির থাকে (dT = 0)। আদর্শ গ্যাসের অভ্যন্তরীণ শক্তি শুধুমাত্র তাপমাত্রার ওপর নির্ভরশীল বলে dU = 0 হয়। তখন dQ = dW।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপগতিবিদ্যার ১ম সূত্র',
  },
  {
    id: 'p_q11',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_thermo',
    visualLessonId: 'thermodynamics',
    hscLevel: '12',
    difficulty: 'board',
    question: 'কোন তাপমাত্রায় সেলসিয়াস ও ফারেনহাইট স্কেলের পাঠ সমান হয়?',
    options: ['0°', '-32°', '-40°', '+40°'],
    correctIndex: 2,
    explanation:
      'C/5 = (F-32)/9 সূত্রে C = F = x বসালে 9x = 5x - 160 => 4x = -160 => x = -40°।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপমাত্রা স্কেল',
  },
  {
    id: 'p_q12',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_thermo',
    visualLessonId: 'thermodynamics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'যদি সমআয়তন প্রক্রিয়ায় কোনো সিস্টেমে তাপ সরবরাহ করা হয়, তবে সমস্ত তাপশক্তি ব্যয় হয়—',
    options: ['বাহ্যিক কাজ সম্পাদনে', 'অভ্যন্তরীণ শক্তি বৃদ্ধিতে', 'চাপ হ্রাস করতে', 'এনট্রপি শূন্য রাখতে'],
    correctIndex: 1,
    explanation:
      'সমআয়তন প্রক্রিয়ায় dV = 0, তাই কৃতকাজ dW = P dV = 0। ফলে তাপগতিবিদ্যার ১ম সূত্র অনুযায়ী dQ = dU + 0 = dU (সম্পূর্ণ তাপ অভ্যন্তরীণ শক্তি বাড়ায়)।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১ · তাপগতীয় প্রক্রিয়া',
  },
  {
    id: 'p_q13',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch3_current_elec',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'একটি হুইটস্টোন ব্রিজের চারটি বাহুর রোধ যথাক্রমে P = 10 Ω, Q = 20 Ω, R = 15 Ω হলে সাম্যাবস্থার জন্য S-এর মান কত হতে হবে?',
    options: ['25 Ω', '30 Ω', '40 Ω', '7.5 Ω'],
    correctIndex: 1,
    explanation:
      'হুইটস্টোন ব্রিজের সাম্যাবস্থার শর্ত P/Q = R/S। সুতরাং S = (Q × R) / P = (20 × 15) / 10 = 30 Ω।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · তপন স্যার · অধ্যায় ৩',
  },
  {
    id: 'p_q14',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch3_current_elec',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'তারের দৈর্ঘ্য টেনে দ্বিগুণ করা হলে (আয়তন অপরিবর্তিত রেখে) রোধ পূর্বের কত গুণ হবে?',
    options: ['২ গুণ', '৪ গুণ', 'অর্ধেক', 'এক-চতুর্থাংশ'],
    correctIndex: 1,
    explanation:
      'আয়তন স্থির রেখে দৈর্ঘ্য n গুণ টেনে বাড়ালে নতুন রোধ R′ = n² R। এখানে n = 2, তাই রোধ 2² = ৪ গুণ হবে।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৩ · চল তড়িৎ',
  },
  {
    id: 'p_q15',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch2_static_elec',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'একটি সমান্তরাল পাত ধারকের পাতগুলোর মধ্যবর্তী দূরত্ব অর্ধেক করা হলে এর ধারকত্ব কত গুণ হবে?',
    options: ['অর্ধেক', 'দ্বিগুণ', 'চারগুণ', 'অপরিবর্তিত'],
    correctIndex: 1,
    explanation:
      'সমান্তরাল পাত ধারকের ধারকত্ব C = ε₀A / d, অর্থাৎ C ∝ 1/d। দূরত্ব অর্ধেক (d/2) করলে ধারকত্ব দ্বিগুণ (2C) হয়।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ২ · স্থির তড়িৎ',
  },
  {
    id: 'p_q16',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch7_physical_optics',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'আলোক তরঙ্গের কোন ধর্মটি প্রমাণ করে যে আলো একটি আড় বা অনুপ্রস্থ তরঙ্গ (Transverse Wave)?',
    options: ['প্রতিফলন', 'ব্যতিচার', 'অপবর্তন', 'সমবর্তন (Polarization)'],
    correctIndex: 3,
    explanation:
      'ব্যতিচার ও অপবর্তন অনুদৈর্ঘ্য ও অনুপ্রস্থ উভয় তরঙ্গে ঘটে, কিন্তু একমাত্র অনুপ্রস্থ (আড়) তরঙ্গই সমবর্তন (Polarization) প্রদর্শন করে।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · ভৌত আলোকবিজ্ঞান',
  },
  {
    id: 'p_q17',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch8_modern_phys',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'আইনস্টাইনের আলোক-তড়িৎ ক্রিয়া (Photoelectric Effect) আলোর কোন প্রকৃতি প্রমাণ করে?',
    options: ['তরঙ্গ প্রকৃতি', 'কণা প্রকৃতি (ফোটন)', 'দৈর্ঘ্য সংকোচন', 'চৌম্বক ধর্ম'],
    correctIndex: 1,
    explanation:
      'ম্যাক্স প্ল্যাঙ্কের কোয়ান্টাম তত্ত্বের ভিত্তিতে আইনস্টাইন প্রমাণ করেন আলো E = hν শক্তির ক্ষুদ্র কণা বা ফোটনের মাধ্যমে তড়িৎ প্রবাহ সৃষ্টি করে।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৮ · আধুনিক পদার্থবিজ্ঞান',
  },
  {
    id: 'p_q18',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch9_atomic_nuclear',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'dental',
    question: 'একটি তেজস্ক্রিয় মৌলের অর্ধায়ু (Half-life) ১০ দিন হলে কত দিনে এর ৭৫% ক্ষয়প্রাপ্ত হবে?',
    options: ['১৫ দিন', '২০ দিন', '২৫ দিন', '৩০ দিন'],
    correctIndex: 1,
    explanation:
      '১ম অর্ধায়ু (১০ দিনে) ক্ষয় হয় ৫০% (অবশিষ্ট ৫০%)। ২য় অর্ধায়ুতে (আরো ১০ দিনে) অবশিষ্ট ৫০%-এর অর্ধেক অর্থাৎ ২৫% ক্ষয় হয়। মোট ক্ষয় = ৫০% + ২৫% = ৭৫%, সময় = ২০ দিন।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৯ · পরমাণুর মডেল ও নিউক্লিয়ার পদার্থবিজ্ঞান',
  },
  {
    id: 'p_q19',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch7_physical_optics',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'board',
    question: 'তড়িৎ চৌম্বকীয় তরঙ্গের মধ্যে কোনটির তরঙ্গদৈর্ঘ্য সবচেয়ে কম কিন্তু ভেদন ক্ষমতা সবচেয়ে বেশি?',
    options: ['অবলোহিত রশ্মি', 'অতিবেগুনি রশ্মি', 'এক্স-রে', 'গামা (γ) রশ্মি'],
    correctIndex: 3,
    explanation:
      'গামা রশ্মির কম্পাঙ্ক ও শক্তি সর্বাধিক এবং তরঙ্গদৈর্ঘ্য সর্বনিম্ন, ফলে এর ভেদন ক্ষমতা সবচেয়ে বেশি।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ৭ · তড়িৎ চৌম্বক বর্ণালি',
  },
  {
    id: 'p_q20',
    subjectId: 'phys_2',
    medicalGroup: 'phys',
    chapterId: 'phys2_ch10_semiconductor',
    visualLessonId: 'circuits_optics',
    hscLevel: '12',
    difficulty: 'medical',
    question: 'একটি p-n জংশন ডায়োডকে সম্মুখী ঝোঁকে (Forward Bias) সংযুক্ত করলে নিঃশেষিত স্তরের (Depletion Layer) কী পরিবর্তন হয়?',
    options: ['প্রশস্ত হয়', 'সংকুচিত বা হ্রাস পায়', 'অপরিবর্তিত থাকে', 'অসীম হয়'],
    correctIndex: 1,
    explanation:
      'সম্মুখী ঝোঁকে বিভব প্রাচীর ও নিঃশেষিত স্তরের প্রস্থ হ্রাস পায়, ফলে সহজে তড়িৎ প্রবাহিত হয়। বিমুখী ঝোঁকে নিঃশেষিত স্তর প্রশস্ত হয়।',
    reference: 'পদার্থবিজ্ঞান ২য় পত্র · অধ্যায় ১০ · সেমিকন্ডাক্টর ও ইলেকট্রনিক্স',
  },

  // =========================================================
  // MEDICAL ENGLISH (১৫টি প্রশ্ন) — 15 Questions
  // =========================================================
  {
    id: 'e_q01',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'Choose the correct sentence regarding Subject-Verb Agreement:',
    options: [
      'Neither the doctor nor the nurses was present.',
      'Neither the doctor nor the nurses were present.',
      'Neither the doctor nor the nurses has been present.',
      'Neither the doctor or the nurses were present.',
    ],
    correctIndex: 1,
    explanation:
      '"Neither ... nor" দ্বারা দুটি subject যুক্ত হলে verb নিকটবর্তী subject (এখানে plural "the nurses") অনুযায়ী বসে। তাই "were present" সঠিক।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Subject-Verb Agreement',
  },
  {
    id: 'e_q02',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'He died ___ cholera, whereas his friend died ___ overeating.',
    options: ['from, of', 'of, from', 'by, of', 'for, from'],
    correctIndex: 1,
    explanation:
      'কোনো রোগে মারা গেলে "die of" বসে (die of cholera), আর অতিরিক্ত খাওয়া বা আঘাতের মতো কারণে মারা গেলে "die from" বসে (die from overeating)।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Appropriate Preposition',
  },
  {
    id: 'e_q03',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'What is the synonym of the word "Benevolent"?',
    options: ['Hostile', 'Altruistic', 'Malicious', 'Indifferent'],
    correctIndex: 1,
    explanation:
      '"Benevolent" অর্থ পরোপকারী বা দয়ালু, যার সমার্থক শব্দ "Altruistic" বা "Kind"। বিপরীতার্থক শব্দ হলো Hostile বা Malicious।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Vocabulary',
  },
  {
    id: 'e_q04',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'dental',
    question: 'Identify the parts of speech of the underlined word: "The patient looks ___pale___ today."',
    options: ['Adverb', 'Adjective', 'Noun', 'Verb'],
    correctIndex: 1,
    explanation:
      '"Look", "seem", "appear", "feel" যখন linking verb হিসেবে ব্যবহৃত হয়, তখন তাদের পর Adverb নয়, Adjective বসে। তাই "pale" একটি Adjective।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Linking Verb & Parts of Speech',
  },
  {
    id: 'e_q05',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'Which one is the correct passive form of "Who taught you anatomy?"',
    options: [
      'By whom were you taught anatomy?',
      'By whom was you taught anatomy?',
      'Who were you taught anatomy by?',
      'By whom you were taught anatomy?',
    ],
    correctIndex: 0,
    explanation:
      '"Who" থাকলে Passive-এ শুরুতে "By whom" বসে এবং Past Indefinite Tense-এ "you"-এর আগে auxiliary verb "were" বসে।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Voice Change',
  },
  {
    id: 'e_q06',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'It is high time we ___ our preparation for the medical admission test.',
    options: ['start', 'started', 'have started', 'will start'],
    correctIndex: 1,
    explanation:
      '"It is time" বা "It is high time"-এর পর subject থাকলে পরবর্তী verb-টি Past Indefinite form (V₂) হয়। তাই "started" সঠিক।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Right Form of Verbs',
  },
  {
    id: 'e_q07',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'dental',
    question: 'Select the correctly spelt word:',
    options: ['Diarrhoea', 'Diarrheoa', 'Diarhea', 'Diarhoea'],
    correctIndex: 0,
    explanation:
      'British English এবং মেডিকেল ডিকশনারি অনুযায়ী সঠিক বানান হলো D-i-a-r-r-h-o-e-a (আমেরিকান বানান Diarrhea)।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Medical Spelling',
  },
  {
    id: 'e_q08',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'The doctor insisted ___ taking the medicine on time.',
    options: ['to', 'for', 'on', 'with'],
    correctIndex: 2,
    explanation:
      '"Insist" verb-এর পর সর্বদা appropriate preposition "on" বসে এবং তারপর verb+ing (gerund) ব্যবহৃত হয়।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Appropriate Preposition',
  },
  {
    id: 'e_q09',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'What is the antonym of "Ephemeral"?',
    options: ['Transient', 'Fleeting', 'Perpetual', 'Momentary'],
    correctIndex: 2,
    explanation:
      '"Ephemeral" অর্থ ক্ষণস্থায়ী। এর বিপরীতার্থক শব্দ হলো "Perpetual" বা চিরস্থায়ী। Transient, Fleeting ও Momentary হলো সমার্থক।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Antonyms',
  },
  {
    id: 'e_q10',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'board',
    question: 'No sooner had the surgeon arrived ___ the operation began.',
    options: ['when', 'then', 'than', 'before'],
    correctIndex: 2,
    explanation:
      '"No sooner had ... than" একটি correlative conjunction; "Hardly/Scarcely had"-এর সাথে "when/before" বসে, কিন্তু "No sooner"-এর সাথে সর্বদা "than" বসে।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Conjunctions',
  },
  {
    id: 'e_q11',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: '"A blessing in disguise" means:',
    options: [
      'A curse from a friend',
      'An apparent misfortune that eventually results in good',
      'A hidden danger in treatment',
      'A sudden medical miracle',
    ],
    correctIndex: 1,
    explanation:
      '"A blessing in disguise" বাগধারাটির অর্থ হলো আপাতদৃষ্টিতে খারাপ মনে হলেও যার পরিণতি কল্যাণকর (শাপে বর)।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Idioms & Phrases',
  },
  {
    id: 'e_q12',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'dental',
    question: 'I look forward to ___ you at Dhaka Medical College.',
    options: ['meet', 'meeting', 'met', 'have met'],
    correctIndex: 1,
    explanation:
      '"look forward to", "with a view to", "be used to", "addicted to" ইত্যাদি phrase-এর "to"-এর পর verb-এর সাথে ing যুক্ত হয় (Gerund)।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Gerund vs Infinitive',
  },
  {
    id: 'e_q13',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'If I ___ a cardiologist, I would establish a rural heart clinic.',
    options: ['am', 'was', 'were', 'had been'],
    correctIndex: 2,
    explanation:
      'Second Conditional-এ অবাস্তব কল্পনা বোঝাতে "If + subject + were" বসে এবং principal clause-এ "would + V₁" ব্যবহৃত হয়।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Conditionals',
  },
  {
    id: 'e_q14',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'The word "Cardiology" is a study of:',
    options: ['Kidney diseases', 'Heart and blood vessels', 'Nervous system', 'Dental anatomy'],
    correctIndex: 1,
    explanation:
      'Cardio অর্থ হৃৎপিণ্ড; Nephrology মানে বৃক্ক, Neurology মানে স্নায়ুতন্ত্র এবং Dentistry/Odontology মানে দন্তবিজ্ঞান।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Medical Terminology',
  },
  {
    id: 'e_q15',
    subjectId: 'eng',
    medicalGroup: 'eng',
    chapterId: 'eng_medical',
    visualLessonId: 'english_grammar',
    hscLevel: 'admission',
    difficulty: 'board',
    question: 'What kind of noun is "Compassion"?',
    options: ['Common Noun', 'Collective Noun', 'Abstract Noun', 'Material Noun'],
    correctIndex: 2,
    explanation:
      '"Compassion" (সহানুভূতি) একটি গুণ বা অনুভূতির নাম যা দেখা বা ছোঁয়া যায় না, তাই এটি Abstract Noun।',
    reference: 'মেডিকেল অ্যাডমিশন ইংরেজি · Noun Classification',
  },

  // =========================================================
  // BANGLADESH & MEDICAL GK (১০টি প্রশ্ন) — 10 Questions
  // =========================================================
  {
    id: 'g_q01',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: '১৯৭১ সালের মহান মুক্তিযুদ্ধে বাংলাদেশকে কয়টি সেক্টরে বিভক্ত করা হয়েছিল?',
    options: ['৭টি', '৯টি', '১১টি', '১২টি'],
    correctIndex: 2,
    explanation:
      'মুক্তিযুদ্ধ পরিচালনার সুবিধার্থে ১৯৭১ সালের ১০-১৭ জুলাই কলকাতার ৮ নম্বর থিয়েটার রোডে অনুষ্ঠিত সেক্টর কমান্ডারদের সম্মেলনে সমগ্র বাংলাদেশকে ১১টি সেক্টরে ভাগ করা হয়।',
    reference: 'সাধারণ জ্ঞান · বাংলাদেশের মুক্তিযুদ্ধ',
  },
  {
    id: 'g_q02',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'মুজিবনগর সরকার কত তারিখে শপথ গ্রহণ করে?',
    options: ['১০ এপ্রিল ১৯৭১', '১৭ এপ্রিল ১৯৭১', '২৬ মার্চ ১৯৭১', '১৬ ডিসেম্বর ১৯৭১'],
    correctIndex: 1,
    explanation:
      '১৯৭১ সালের ১০ এপ্রিল মুজিবনগর সরকার গঠিত হয় এবং ১৭ এপ্রিল মেহেরপুরের বৈদ্যনাথতলায় (মুজিবনগর) আনুষ্ঠানিকভাবে শপথ গ্রহণ করে।',
    reference: 'সাধারণ জ্ঞান · মুক্তিযুদ্ধের ইতিহাস',
  },
  {
    id: 'g_q03',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'বাংলাদেশের প্রথম মেডিকেল কলেজ "ঢাকা মেডিকেল কলেজ" কত সালে প্রতিষ্ঠিত হয়?',
    options: ['১৯৪৬ সালে', '১৯৪৭ সালে', '১৯৫২ সালে', '১৯৭২ সালে'],
    correctIndex: 0,
    explanation:
      '১০ জুলাই ১৯৪৬ সালে ঢাকা মেডিকেল কলেজ (DMC) প্রতিষ্ঠিত হয়, যা বাংলাদেশের প্রাচীনতম ও শীর্ষস্থানীয় সরকারি মেডিকেল কলেজ।',
    reference: 'সাধারণ জ্ঞান · বাংলাদেশের স্বাস্থ্য ও চিকিৎসা খাত',
  },
  {
    id: 'g_q04',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'dental',
    question: 'বাংলাদেশের একমাত্র পূর্ণাঙ্গ সরকারি ডেন্টাল কলেজ "ঢাকা ডেন্টাল কলেজ" কত সালে প্রতিষ্ঠিত হয়?',
    options: ['১৯৫৬ সালে', '১৯৬১ সালে', '১৯৭১ সালে', '১৯৮০ সালে'],
    correctIndex: 1,
    explanation:
      '১৯৬১ সালে ঢাকা ডেন্টাল কলেজ প্রতিষ্ঠিত হয়, যা দেশের দন্ত চিকিৎসাবিজ্ঞানের সর্ববৃহৎ প্রতিষ্ঠান।',
    reference: 'সাধারণ জ্ঞান · ডেন্টাল শিক্ষা',
  },
  {
    id: 'g_q05',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'বাংলাদেশের সংবিধান কত তারিখ থেকে কার্যকর (Effective) হয়?',
    options: ['৪ নভেম্বর ১৯৭২', '১৬ ডিসেম্বর ১৯৭২', '২৬ মার্চ ১৯৭৩', '১০ জানুয়ারি ১৯৭২'],
    correctIndex: 1,
    explanation:
      '৪ নভেম্বর ১৯৭২ গণপরিষদে সংবিধান গৃহীত হয় এবং ১৯৭২ সালের ১৬ ডিসেম্বর প্রথম বিজয় দিবসে তা কার্যকর হয়।',
    reference: 'সাধারণ জ্ঞান · বাংলাদেশের সংবিধান',
  },
  {
    id: 'g_q06',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'ভাষা আন্দোলনের প্রথম শহীদ রফিকউদ্দিন আহমদ কত তারিখে পুলিশের গুলিতে শহীদ হন?',
    options: ['২১ ফেব্রুয়ারি ১৯৫২', '২২ ফেব্রুয়ারি ১৯৫২', '২৬ জানুয়ারি ১৯৫২', '১১ মার্চ ১৯৪৮'],
    correctIndex: 0,
    explanation:
      '১৯৫২ সালের ২১ ফেব্রুয়ারি ঢাকা মেডিকেল কলেজ হোস্টেল প্রাঙ্গণে ১৪৪ ধারা ভঙ্গের মিছিলে পুলিশের গুলিতে রফিক, সালাম, বরকত, জব্বার শহীদ হন।',
    reference: 'সাধারণ জ্ঞান · ভাষা আন্দোলন ১৯৫২',
  },
  {
    id: 'g_q07',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'dental',
    question: 'আন্তর্জাতিক উদরাময় গবেষণা কেন্দ্র বাংলাদেশ (icddr,b)-এর প্রধান অবদান কোনটি?',
    options: [
      'পোলিও ভ্যাকসিন আবিষ্কার',
      'খাবার স্যালাইন (ORS) উদ্ভাবন ও উন্নয়ন',
      'পেনিসিলিন আবিষ্কার',
      'ইনসুলিন আবিষ্কার',
    ],
    correctIndex: 1,
    explanation:
      'ঢাকার মহাখালীতে অবস্থিত icddr,b ডায়রিয়া ও কলেরা চিকিৎসায় যুগান্তকারী খাবার স্যালাইন (ORS) উদ্ভাবন ও বিশ্বব্যাপী বিস্তারে ঐতিহাসিক ভূমিকা রাখে।',
    reference: 'সাধারণ জ্ঞান · বাংলাদেশের চিকিৎসাবিজ্ঞান',
  },
  {
    id: 'g_q08',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'মুক্তিযুদ্ধে অবদানের জন্য সর্বোচ্চ রাষ্ট্রীয় খেতাব "বীরশ্রেষ্ঠ" কতজনকে প্রদান করা হয়?',
    options: ['৭ জন', '৬৮ জন', '১৭৫ জন', '৪২৬ জন'],
    correctIndex: 0,
    explanation:
      'মুক্তিযুদ্ধে অসীম বীরত্বের জন্য ৭ জনকে বীরশ্রেষ্ঠ, ৬৮ জনকে বীর উত্তম, ১৭৫ জনকে বীর বিক্রম এবং ৪২৬ জনকে বীর প্রতীক খেতাব দেওয়া হয়।',
    reference: 'সাধারণ জ্ঞান · মুক্তিযুদ্ধের খেতাব',
  },
  {
    id: 'g_q09',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'board',
    question: 'বিশ্ব স্বাস্থ্য সংস্থা (WHO)-এর সদর দপ্তর কোথায় অবস্থিত?',
    options: ['নিউইয়র্ক, যুক্তরাষ্ট্র', 'জেনেভা, সুইজারল্যান্ড', 'প্যারিস, ফ্রান্স', 'ভিয়েনা, অস্ট্রিয়া'],
    correctIndex: 1,
    explanation:
      '৭ এপ্রিল ১৯৪৮ সালে প্রতিষ্ঠিত বিশ্ব স্বাস্থ্য সংস্থার (WHO) সদর দপ্তর সুইজারল্যান্ডের জেনেভায়। প্রতি বছর ৭ এপ্রিল বিশ্ব স্বাস্থ্য দিবস পালিত হয়।',
    reference: 'সাধারণ জ্ঞান · আন্তর্জাতিক সংস্থা',
  },
  {
    id: 'g_q10',
    subjectId: 'gk',
    medicalGroup: 'gk',
    chapterId: 'gk_bangladesh',
    visualLessonId: 'gk_timeline',
    hscLevel: 'admission',
    difficulty: 'medical',
    question: 'প্রাকৃতিক পরিবেশ সংরক্ষণ ও সুন্দরবনের মোট আয়তনের কত শতাংশ বাংলাদেশে অবস্থিত?',
    options: ['প্রায় ৪০%', 'প্রায় ৫০%', 'প্রায় ৬০%', 'প্রায় ৭৫%'],
    correctIndex: 2,
    explanation:
      'বিশ্বের বৃহত্তম ম্যানগ্রোভ বন সুন্দরবনের মোট ১০,০০০ বর্গকিলোমিটারের মধ্যে প্রায় ৬,০১৭ বর্গকিলোমিটার (প্রায় ৬০%) বাংলাদেশে অবস্থিত।',
    reference: 'সাধারণ জ্ঞান · বাংলাদেশের ভূগোল',
  },
];

export {
  BIO1_EXPANDED_QUESTIONS,
  BIO2_EXPANDED_QUESTIONS,
  CHEM1_EXPANDED_QUESTIONS,
  CHEM2_EXPANDED_QUESTIONS,
  PHYS1_EXPANDED_QUESTIONS,
  PHYS2_EXPANDED_QUESTIONS,
  ENG_EXPANDED_QUESTIONS,
  GK_EXPANDED_QUESTIONS,
};

export const BOARD_NAMES: readonly BoardId[] = [
  'dhaka',
  'rajshahi',
  'chittagong',
  'comilla',
  'jessore',
  'sylhet',
  'barisal',
  'dinajpur',
  'mymensingh',
] as const;

export const BOARD_LABELS: Record<BoardId, string> = {
  dhaka: 'ঢাকা বোর্ড',
  rajshahi: 'রাজশাহী বোর্ড',
  chittagong: 'চট্টগ্রাম বোর্ড',
  comilla: 'কুমিল্লা বোর্ড',
  jessore: 'যশোর বোর্ড',
  sylhet: 'সিলেট বোর্ড',
  barisal: 'বরিশাল বোর্ড',
  dinajpur: 'দিনাজপুর বোর্ড',
  mymensingh: 'ময়মনসিংহ বোর্ড',
};

export const BOARD_EXAM_YEARS = [
  '2024',
  '2023',
  '2022',
  '2021',
  '2019',
  '2018',
  '2017',
] as const;

export const BOARD_YEAR_LABELS: Record<string, string> = {
  '2024': '২০২৪',
  '2023': '২০২৩',
  '2022': '২০২২',
  '2021': '২০২১',
  '2019': '২০১৯',
  '2018': '২০১৮',
  '2017': '২০১৭',
};

const RAW_COMBINED_QUESTIONS: McqQuestion[] = [
  ...CORE_QUESTIONS,
  ...PAST_YEAR_QUESTIONS,
  ...EXTRA_PRACTICE_QUESTIONS,
  ...BIO1_EXPANDED_QUESTIONS,
  ...BIO2_EXPANDED_QUESTIONS,
  ...CHEM1_EXPANDED_QUESTIONS,
  ...CHEM2_EXPANDED_QUESTIONS,
  ...PHYS1_EXPANDED_QUESTIONS,
  ...PHYS2_EXPANDED_QUESTIONS,
  ...ENG_EXPANDED_QUESTIONS,
  ...GK_EXPANDED_QUESTIONS,
  ...NCTB_SUPPLEMENT_QUESTIONS,
].map(normalizeQuestionToNctb);

const subjectBoardCounters: Record<string, number> = {};

export const QUESTION_BANK: McqQuestion[] = RAW_COMBINED_QUESTIONS.map((q) => {
  if (q.difficulty !== 'board' || q.pastExam || q.boardExam) {
    return q;
  }
  const idx = subjectBoardCounters[q.subjectId] ?? 0;
  subjectBoardCounters[q.subjectId] = idx + 1;
  const board = BOARD_NAMES[idx % BOARD_NAMES.length];
  const year = BOARD_EXAM_YEARS[Math.floor(idx / BOARD_NAMES.length) % BOARD_EXAM_YEARS.length];
  return {
    ...q,
    boardExam: { board, year },
  };
});

export const PAST_EXAM_SESSIONS = [
  '2023-24',
  '2022-23',
  '2021-22',
  '2020-21',
  '2019-20',
  '2018-19',
  '2017-18',
] as const;

export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getQuestionsBySubject(subjectId: string): McqQuestion[] {
  return QUESTION_BANK.filter((q) => q.subjectId === subjectId);
}

export function getQuestionsByChapter(chapterId: string): McqQuestion[] {
  return QUESTION_BANK.filter((q) => q.chapterId === chapterId);
}

export function getPastYearQuestions(filters?: {
  exam?: 'MBBS' | 'BDS' | 'all';
  session?: string;
  subjectId?: string;
}): McqQuestion[] {
  return QUESTION_BANK.filter((q) => {
    if (!q.pastExam) return false;
    if (filters?.exam && filters.exam !== 'all' && q.pastExam.exam !== filters.exam) return false;
    if (filters?.session && filters.session !== 'all' && q.pastExam.session !== filters.session) {
      return false;
    }
    if (filters?.subjectId && filters.subjectId !== 'all' && q.subjectId !== filters.subjectId) {
      return false;
    }
    return true;
  });
}

export function buildMedicalModelQuestions(options?: {
  onlyPastYear?: boolean;
  randomize?: boolean;
  extraQuestions?: McqQuestion[];
}): McqQuestion[] {
  const shouldRandomize = options?.randomize ?? true;
  const fullPool = options?.extraQuestions?.length
    ? [...options.extraQuestions, ...QUESTION_BANK]
    : QUESTION_BANK;

  const pickByFilter = (
    predicate: (q: McqQuestion) => boolean,
    count: number
  ): McqQuestion[] => {
    const primaryPool = fullPool.filter(
      (q) => predicate(q) && (!options?.onlyPastYear || Boolean(q.pastExam))
    );
    const orderedPrimary = shouldRandomize ? shuffleArray(primaryPool) : primaryPool;
    if (orderedPrimary.length >= count) {
      return orderedPrimary.slice(0, count);
    }
    const usedIds = new Set(orderedPrimary.map((q) => q.id));
    const fallbackPool = fullPool.filter((q) => predicate(q) && !usedIds.has(q.id));
    const orderedFallback = shouldRandomize ? shuffleArray(fallbackPool) : fallbackPool;
    return [...orderedPrimary, ...orderedFallback].slice(0, count);
  };

  return [
    ...pickByFilter((q) => q.medicalGroup === 'bio', 30),
    ...pickByFilter((q) => q.medicalGroup === 'chem', 25),
    ...pickByFilter((q) => q.subjectId === 'phys_1', 10),
    ...pickByFilter((q) => q.subjectId === 'phys_2', 10),
    ...pickByFilter((q) => q.medicalGroup === 'eng', 15),
    ...pickByFilter((q) => q.medicalGroup === 'gk', 10),
  ];
}

export function buildSprintModelQuestions(extraQuestions?: McqQuestion[]): McqQuestion[] {
  const fullPool = extraQuestions?.length
    ? [...extraQuestions, ...QUESTION_BANK]
    : QUESTION_BANK;

  const pickByFilter = (
    predicate: (q: McqQuestion) => boolean,
    count: number
  ): McqQuestion[] => {
    const pool = shuffleArray(fullPool.filter(predicate));
    return pool.slice(0, Math.min(count, pool.length));
  };

  return [
    ...pickByFilter((q) => q.medicalGroup === 'bio', 15),
    ...pickByFilter((q) => q.medicalGroup === 'chem', 13),
    ...pickByFilter((q) => q.subjectId === 'phys_1', 5),
    ...pickByFilter((q) => q.subjectId === 'phys_2', 5),
    ...pickByFilter((q) => q.medicalGroup === 'eng', 7),
    ...pickByFilter((q) => q.medicalGroup === 'gk', 5),
  ];
}

