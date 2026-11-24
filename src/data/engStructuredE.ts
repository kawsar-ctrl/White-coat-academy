import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

interface LiteratureEntry {
  work: string;
  author: string;
  genre: string;
}

const LIT_BANK: LiteratureEntry[] = [
  { work: 'Hamlet', author: 'William Shakespeare', genre: 'Tragedy Play' },
  { work: 'Macbeth', author: 'William Shakespeare', genre: 'Tragedy Play' },
  { work: 'Othello', author: 'William Shakespeare', genre: 'Tragedy Play' },
  { work: 'King Lear', author: 'William Shakespeare', genre: 'Tragedy Play' },
  { work: 'The Tempest', author: 'William Shakespeare', genre: 'Romantic Tragicomedy' },
  { work: 'Paradise Lost', author: 'John Milton', genre: 'Epic Poem' },
  { work: 'Gulliver’s Travels', author: 'Jonathan Swift', genre: 'Satirical Novel' },
  { work: 'Robinson Crusoe', author: 'Daniel Defoe', genre: 'Adventure Novel' },
  { work: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Novel of Manners' },
  { work: 'Lyrical Ballads (Preface & Daffodils)', author: 'William Wordsworth', genre: 'Romantic Poetry' },
  { work: 'The Rime of the Ancient Mariner', author: 'S. T. Coleridge', genre: 'Romantic Ballad' },
  { work: 'Ode to the West Wind', author: 'P. B. Shelley', genre: 'Romantic Ode' },
  { work: 'Ode on a Grecian Urn', author: 'John Keats', genre: 'Romantic Ode' },
  { work: 'Great Expectations', author: 'Charles Dickens', genre: 'Victorian Novel' },
  { work: 'David Copperfield', author: 'Charles Dickens', genre: 'Autobiographical Novel' },
  { work: 'A Tale of Two Cities', author: 'Charles Dickens', genre: 'Historical Novel' },
  { work: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Gothic Novel' },
  { work: 'Jane Eyre', author: 'Charlotte Brontë', genre: 'Victorian Novel' },
  { work: 'Tess of the d’Urbervilles', author: 'Thomas Hardy', genre: 'Victorian Tragedy' },
  { work: 'The Waste Land', author: 'T. S. Eliot', genre: 'Modernist Poem' },
  { work: 'Waiting for Godot', author: 'Samuel Beckett', genre: 'Absurd Drama' },
  { work: 'Man and Superman', author: 'George Bernard Shaw', genre: 'Drama of Ideas' },
  { work: 'Arms and the Man', author: 'George Bernard Shaw', genre: 'Anti-romantic Comedy' },
  { work: 'Animal Farm', author: 'George Orwell', genre: 'Political Allegory' },
  { work: 'Nineteen Eighty-Four (1984)', author: 'George Orwell', genre: 'Dystopian Novel' },
  { work: 'The Old Man and the Sea', author: 'Ernest Hemingway', genre: 'Novella' },
  { work: 'A Passage to India', author: 'E. M. Forster', genre: 'Modern Novel' },
  { work: 'Ulysses', author: 'James Joyce', genre: 'Stream-of-Consciousness Novel' },
  { work: 'Gitanjali (Song Offerings)', author: 'Rabindranath Tagore', genre: 'Nobel-Winning Poetry (1913)' },
  { work: 'The Gift of the Magi', author: 'O. Henry', genre: 'Short Story' },
  { work: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic American Novel' },
  { work: 'Moby-Dick', author: 'Herman Melville', genre: 'Maritime Epic Novel' },
  { work: 'The Iliad & The Odyssey', author: 'Homer', genre: 'Ancient Greek Epics' },
  { work: 'War and Peace', author: 'Leo Tolstoy', genre: 'Russian Historical Novel' },
  { work: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Psychological Novel' },
  { work: 'The Alchemist', author: 'Paulo Coelho', genre: 'Philosophical Novel' },
  { work: 'The God of Small Things', author: 'Arundhati Roy', genre: 'Booker Prize Novel' },
  { work: 'A Golden Age', author: 'Tahmima Anam', genre: 'Bangladesh Liberation War Novel' },
  { work: 'Frankenstein', author: 'Mary Shelley', genre: 'Science Fiction Gothic Novel' },
  { work: 'Things Fall Apart', author: 'Chinua Achebe', genre: 'African Postcolonial Novel' },
];

interface QuoteEntry {
  quote: string;
  speaker: string;
}

const QUOTE_BANK: QuoteEntry[] = [
  { quote: 'To be, or not to be, that is the question.', speaker: 'William Shakespeare (Hamlet)' },
  { quote: 'All the world’s a stage, and all the men and women merely players.', speaker: 'William Shakespeare (As You Like It)' },
  { quote: 'Cowards die many times before their deaths; the valiant never taste of death but once.', speaker: 'William Shakespeare (Julius Caesar)' },
  { quote: 'Child is the father of the man.', speaker: 'William Wordsworth (My Heart Leaps Up)' },
  { quote: 'Water, water, every where, nor any drop to drink.', speaker: 'S. T. Coleridge (Ancient Mariner)' },
  { quote: 'If Winter comes, can Spring be far behind?', speaker: 'P. B. Shelley (Ode to the West Wind)' },
  { quote: 'Beauty is truth, truth beauty, — that is all ye know on earth.', speaker: 'John Keats (Ode on a Grecian Urn)' },
  { quote: 'Knowledge is power.', speaker: 'Francis Bacon' },
  { quote: 'Some books are to be tasted, others to be swallowed, and some few to be chewed and digested.', speaker: 'Francis Bacon (Of Studies)' },
  { quote: 'Better to reign in Hell than serve in Heaven.', speaker: 'John Milton (Paradise Lost)' },
  { quote: 'Man is by nature a political animal.', speaker: 'Aristotle' },
  { quote: 'A little learning is a dangerous thing.', speaker: 'Alexander Pope' },
  { quote: 'To err is human; to forgive, divine.', speaker: 'Alexander Pope' },
  { quote: 'I came, I saw, I conquered (Veni, vidi, vici).', speaker: 'Julius Caesar' },
  { quote: 'Give me liberty, or give me death!', speaker: 'Patrick Henry' },
  { quote: 'Government of the people, by the people, for the people, shall not perish from the earth.', speaker: 'Abraham Lincoln' },
  { quote: 'I have a dream that my four little children will one day live in a nation...', speaker: 'Martin Luther King Jr.' },
  { quote: 'Wherever the art of Medicine is loved, there is also a love of Humanity.', speaker: 'Hippocrates' },
  { quote: 'Education is the most powerful weapon which you can use to change the world.', speaker: 'Nelson Mandela' },
  { quote: 'Imagination is more important than knowledge.', speaker: 'Albert Einstein' },
];

interface TranslationProverb {
  bn: string;
  en: string;
}

const PROVERB_TRANS_BANK: TranslationProverb[] = [
  { bn: 'সময়ের এক ফোঁড়, অসময়ের দশ ফোঁড়', en: 'A stitch in time saves nine.' },
  { bn: 'চকচক করলেই সোনা হয় না', en: 'All that glitters is not gold.' },
  { bn: 'অল্পবিদ্যা ভয়ঙ্করী', en: 'A little learning is a dangerous thing.' },
  { bn: 'নাই মামার চেয়ে কানা মামা ভালো', en: 'Something is better than nothing.' },
  { bn: 'মানুষ মাত্রই ভুল করে', en: 'To err is human.' },
  { bn: 'যেখানে বাঘের ভয়, সেখানেই সন্ধ্যা হয়', en: 'Danger often comes where danger is feared.' },
  { bn: 'চোরে না শোনে ধর্মের কাহিনি', en: 'The devil would not listen to the scripture.' },
  { bn: 'দশে মিলে করি কাজ, হারি জিতি নাহি লাজ', en: 'Union is strength.' },
  { bn: 'জ্ঞানই শক্তি', en: 'Knowledge is power.' },
  { bn: 'প্রয়োজনই আবিষ্কারের প্রসূতি', en: 'Necessity is the mother of invention.' },
  { bn: 'অতি লোভে তাঁতি নষ্ট', en: 'Grasp all, lose all.' },
  { bn: 'কষ্ট ছাড়া কেষ্ট মেলে না', en: 'No pains, no gains.' },
  { bn: 'আগে ঘর তবে তো পর', en: 'Charity begins at home.' },
  { bn: 'যেমন কর্ম তেমন ফল', en: 'As you sow, so shall you reap.' },
  { bn: 'শূন্য কলসি বাজে বেশি', en: 'Empty vessels sound much.' },
  { bn: 'কয়লা ধুলে ময়লা যায় না', en: 'Black will take no other hue.' },
  { bn: 'এক হাতে তালি বাজে না', en: 'It takes two to make a quarrel.' },
  { bn: 'সততাই সর্বোৎকৃষ্ট পন্থা', en: 'Honesty is the best policy.' },
  { bn: 'বিপদ কখনো একা আসে না', en: 'Misfortunes never come alone.' },
  { bn: 'উপদেশের চেয়ে দৃষ্টান্ত শ্রেয়', en: 'Example is better than precept.' },
  { bn: 'আয় বুঝে ব্যয় কর', en: 'Cut your coat according to your cloth.' },
  { bn: 'গাইতে গাইতে গায়েন', en: 'Practice makes a man perfect.' },
  { bn: 'মৌনতাই সম্মতির লক্ষণ', en: 'Silence gives consent.' },
  { bn: 'রোগের প্রতিকারের চেয়ে প্রতিরোধই উত্তম', en: 'Prevention is better than cure.' },
  { bn: 'আগুনে ঘি ঢালা', en: 'To add fuel to the fire.' },
  { bn: 'সকাল থেকেই সারাদিনের আভাস পাওয়া যায়', en: 'Morning shows the day.' },
  { bn: 'বিনা মেঘে বজ্রপাত', en: 'A bolt from the blue.' },
  { bn: 'ঝোপ বুঝে কোপ মারা', en: 'Strike the iron while it is hot.' },
  { bn: 'আপন চরকায় তেল দাও', en: 'Oil your own machine.' },
  { bn: 'গাছে কাঁঠাল গোঁফে তেল', en: 'To count one’s chickens before they are hatched.' },
];

interface ConfusingWord {
  word: string;
  meaning: string;
  contrast: string;
}

const CONFUSING_WORDS: ConfusingWord[] = [
  { word: 'Accept vs Except', meaning: 'Accept = গ্রহণ করা; Except = ব্যতীত/ছাড়া', contrast: 'Verb vs Preposition' },
  { word: 'Adapt vs Adopt vs Adept', meaning: 'Adapt = খাপ খাওয়ানো; Adopt = দত্তক/গ্রহণ করা; Adept = দক্ষ', contrast: 'Adjustment vs Adoption vs Skill' },
  { word: 'Affect vs Effect', meaning: 'Affect = প্রভাবিত করা (Verb); Effect = ফলাফল (Noun)', contrast: 'Action vs Result' },
  { word: 'Allusion vs Illusion', meaning: 'Allusion = পরোক্ষ উল্লেখ; Illusion = দৃষ্টিভ্রম/মায়া', contrast: 'Reference vs Mirage' },
  { word: 'Beside vs Besides', meaning: 'Beside = পাশে; Besides = তাছাড়া/অধিকন্তু', contrast: 'Position vs Addition' },
  { word: 'Compliment vs Complement', meaning: 'Compliment = প্রশংসা; Complement = পরিপূরক', contrast: 'Praise vs Completion' },
  { word: 'Council vs Counsel', meaning: 'Council = পরিষদ/সভা; Counsel = পরামর্শ/উপদেশ', contrast: 'Assembly vs Advice' },
  { word: 'Elicit vs Illicit', meaning: 'Elicit = বের করে আনা (তথ্য); Illicit = অবৈধ/বেআইনি', contrast: 'Draw out vs Unlawful' },
  { word: 'Eminent vs Imminent', meaning: 'Eminent = বিখ্যাত/স্বনামধন্য; Imminent = আসন্ন', contrast: 'Famous vs Impending' },
  { word: 'Ensure vs Insure vs Assure', meaning: 'Ensure = নিশ্চিত করা; Insure = বিমা করা; Assure = আশ্বস্ত করা', contrast: 'Guarantee vs Policy vs Reassure' },
  { word: 'Lose vs Loose', meaning: 'Lose = হারানো (Verb); Loose = ঢিলেঢালা (Adj)', contrast: 'Loss vs Not tight' },
  { word: 'Principal vs Principle', meaning: 'Principal = প্রধান/অধ্যক্ষ; Principle = মূলনীতি', contrast: 'Head vs Rule' },
  { word: 'Stationary vs Stationery', meaning: 'Stationary = স্থির/অচল; Stationery = কাগজ-কলমাদি', contrast: 'Motionless vs Writing supplies' },
  { word: 'Precede vs Proceed', meaning: 'Precede = পূর্বে ঘটা; Proceed = সামনে এগিয়ে যাওয়া', contrast: 'Come before vs Go forward' },
  { word: 'Prescribe vs Proscribe', meaning: 'Prescribe = ওষুধ/বিধি নির্দেশ করা; Proscribe = নিষিদ্ধ করা', contrast: 'Recommend vs Forbid' },
  { word: 'Disinterested vs Uninterested', meaning: 'Disinterested = নিরপেক্ষ; Uninterested = অনাগ্রহী', contrast: 'Impartial vs Indifferent' },
  { word: 'Historic vs Historical', meaning: 'Historic = ইতিহাস-সৃষ্টিকারী গুরুত্বপূর্ণ; Historical = ইতিহাস-সংশ্লিষ্ট', contrast: 'Monumental vs Past-related' },
  { word: 'Continual vs Continuous', meaning: 'Continual = থেমে থেমে বারবার; Continuous = একটানা বিরামহীন', contrast: 'Repeated vs Uninterrupted' },
  { word: 'Access vs Excess', meaning: 'Access = প্রবেশাধিকার; Excess = অতিরিক্ত পরিমাণ', contrast: 'Entry vs Surplus' },
  { word: 'Advice vs Advise', meaning: 'Advice = উপদেশ (Noun); Advise = উপদেশ দেওয়া (Verb)', contrast: 'Noun vs Verb' },
];

export function buildEngStructuredE(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `ese_${String(seq++).padStart(4, '0')}`;

  // 1. Literary Works & Authors (40 × 3 = 120 MCQs)
  LIT_BANK.forEach((lt, i) => {
    const others = LIT_BANK.filter((x) => x.work !== lt.work);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `Who is the author of the celebrated literary work "${lt.work}"?`,
        correct: lt.author,
        distractors: others.slice(i % 20, (i % 20) + 10).map((x) => x.author),
        explanation: `"${lt.work}" (${lt.genre}) রচনা করেছেন ${lt.author}।`,
        reference: 'Medical Admission English · English Literature',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `Which literary form or genre best describes "${lt.work}" by ${lt.author}?`,
        correct: lt.genre,
        distractors: others.slice((i + 5) % 20, ((i + 5) % 20) + 10).map((x) => x.genre),
        explanation: `${lt.author}-এর "${lt.work}" একটি বিখ্যাত ${lt.genre}।`,
        reference: 'Medical Admission English · Literary Genres',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'dental',
        question: `Which of the following works was written by ${lt.author} (Genre: ${lt.genre})?`,
        correct: lt.work,
        distractors: others.slice((i + 12) % 20, ((i + 12) % 20) + 10).map((x) => x.work),
        explanation: `"${lt.work}" হলো ${lt.author}-এর একটি কালজয়ী সৃষ্টি।`,
        reference: 'Medical Admission English · Author-Work Matching',
      })
    );
  });

  // 2. Famous Quotes (20 × 2 = 40 MCQs)
  QUOTE_BANK.forEach((qt, i) => {
    const others = QUOTE_BANK.filter((x) => x.quote !== qt.quote);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'medical',
        question: `Who famously stated: "${qt.quote}"?`,
        correct: qt.speaker,
        distractors: others.slice(i % 10, (i % 10) + 8).map((x) => x.speaker),
        explanation: `"${qt.quote}" বিখ্যাত উক্তিটি করেছেন ${qt.speaker}।`,
        reference: 'Medical Admission English · Famous Literary Quotes',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `Which famous quotation is attributed to ${qt.speaker}?`,
        correct: qt.quote,
        distractors: others.slice((i + 3) % 10, ((i + 3) % 10) + 8).map((x) => x.quote),
        explanation: `${qt.speaker}-এর অবিস্মরণীয় উক্তি হলো: "${qt.quote}"।`,
        reference: 'Medical Admission English · Quotes Identification',
      })
    );
  });

  // 3. Proverbs & Translation (30 × 2 = 60 MCQs)
  PROVERB_TRANS_BANK.forEach((pt, i) => {
    const others = PROVERB_TRANS_BANK.filter((x) => x.bn !== pt.bn);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${pt.bn}" — বাংলা প্রবাদ বা বাক্যটির সঠিক ইংরেজি অনুবাদ কোনটি?`,
        correct: pt.en,
        distractors: others.slice(i % 15, (i % 15) + 8).map((x) => x.en),
        explanation: `"${pt.bn}"-এর প্রমিত ইংরেজি প্রবাদ হলো: "${pt.en}"।`,
        reference: 'Medical Admission English · Translation & Proverbs',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `What is the accurate Bengali translation of "${pt.en}"?`,
        correct: pt.bn,
        distractors: others.slice((i + 7) % 15, ((i + 7) % 15) + 8).map((x) => x.bn),
        explanation: `"${pt.en}"-এর যথাযথ বাংলা রূপ হলো "${pt.bn}"।`,
        reference: 'Medical Admission English · Proverb Translation',
      })
    );
  });

  // 4. Confusing Word Pairs (20 × 2 = 40 MCQs)
  CONFUSING_WORDS.forEach((cw, i) => {
    const others = CONFUSING_WORDS.filter((x) => x.word !== cw.word);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'medical',
        question: `What is the exact meaning difference between "${cw.word}"?`,
        correct: cw.meaning,
        distractors: others.slice(i % 10, (i % 10) + 8).map((x) => x.meaning),
        explanation: `${cw.word}: ${cw.meaning} (${cw.contrast})।`,
        reference: 'Medical Admission English · Confusing Word Pairs',
      })
    );
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'dental',
        question: `Which confusing word pair represents "${cw.meaning}"?`,
        correct: cw.word,
        distractors: others.slice((i + 5) % 10, ((i + 5) % 10) + 8).map((x) => x.word),
        explanation: `${cw.meaning} — এই অর্থের জোড়া হলো "${cw.word}"।`,
        reference: 'Medical Admission English · Word Choice',
      })
    );
  });

  return list;
}
