import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

// 80 More High-Yield Barron's / Medical Admission Vocabulary Words × 3 = 240 MCQs
const VOCAB_BANK_3: Array<{ word: string; bn: string; syn: string; ant: string }> = [
  { word: 'Garrulity', bn: 'বাচালতা / অনর্গল কথা বলা', syn: 'Loquacity / Talkativeness', ant: 'Taciturnity / Reticence' },
  { word: 'Genial', bn: 'সহৃদয় ও প্রফুল্ল', syn: 'Cordial / Cheerful', ant: 'Morose / Sullen' },
  { word: 'Gratuitous', bn: 'অকারণ / অযাচিত বা বিনামূল্যের', syn: 'Unwarranted / Complimentary', ant: 'Justified / Paid' },
  { word: 'Gregariousness', bn: 'দলবদ্ধ প্রবণতা / মিশুক স্বভাব', syn: 'Sociability / Conviviality', ant: 'Solitude / Reclusiveness' },
  { word: 'Guile', bn: 'ছলনা / শঠতা', syn: 'Deceit / Cunning', ant: 'Candor / Sincerity' },
  { word: 'Hapless', bn: 'হতভাগ্য / দুর্ভাগা', syn: 'Unfortunate / Unlucky', ant: 'Fortunate / Lucky' },
  { word: 'Harbinger', bn: 'অগ্রদূত / পূর্বাভাসদাতা', syn: 'Forerunner / Herald', ant: 'Follower / Descendant' },
  { word: 'Heresy', bn: 'প্রচলিত মতবিরোধী বিশ্বাস', syn: 'Unorthodoxy / Dissent', ant: 'Orthodoxy / Conformity' },
  { word: 'Hiatus', bn: 'বিরতি / ফাঁক', syn: 'Pause / Interruption', ant: 'Continuity / Resumption' },
  { word: 'Homogeneous', bn: 'সমজাতীয় / অভিন্ন প্রকৃতির', syn: 'Uniform / Identical', ant: 'Heterogeneous / Diverse' },
  { word: 'Hubris', bn: 'অতিরিক্ত অহংকার বা দম্ভ', syn: 'Arrogance / Conceit', ant: 'Humility / Modesty' },
  { word: 'Hypothetical', bn: 'অনুমাননির্ভর / কল্পিত', syn: 'Theoretical / Supposed', ant: 'Empirical / Actual' },
  { word: 'Ignominious', bn: 'অপমানজনক / কলঙ্কজনক', syn: 'Shameful / Disgraceful', ant: 'Honorable / Glorious' },
  { word: 'Immaculate', bn: 'নিখুঁত / নিষ্কলঙ্ক', syn: 'Spotless / Flawless', ant: 'Tarnished / Defiled' },
  { word: 'Imminentness', bn: 'আসন্নতা / নিকটবর্তিতা', syn: 'Impending / Proximity', ant: 'Remoteness / Distance' },
  { word: 'Immune', bn: 'অনাক্রম্য / রোগমুক্ত বা দায়মুক্ত', syn: 'Resistant / Exempt', ant: 'Susceptible / Vulnerable' },
  { word: 'Impassive', bn: 'আবেগহীন / নির্বিকার', syn: 'Stoic / Unemotional', ant: 'Emotional / Expressive' },
  { word: 'Impecunious', bn: 'অত্যন্ত দরিদ্র / নিঃস্ব', syn: 'Penniless / Destitute', ant: 'Affluent / Wealthy' },
  { word: 'Impervious', bn: 'অভেদ্য / প্রভাবহীন', syn: 'Impenetrable / Resistant', ant: 'Permeable / Susceptible' },
  { word: 'Implacable', bn: 'অদম্য / যাকে শান্ত করা যায় না', syn: 'Unappeasable / Relentless', ant: 'Placable / Appeasable' },
  { word: 'Implicit', bn: 'অন্তর্নিহিত / ইঙ্গিতপূর্ণ', syn: 'Implied / Unspoken', ant: 'Explicit / Stated' },
  { word: 'Impromptu', bn: 'পূর্বপ্রস্তুতিহীন / উপস্থিত', syn: 'Improvised / Extempore', ant: 'Rehearsed / Premeditated' },
  { word: 'Inadvertent', bn: 'অনিচ্ছাকৃত / অসাবধানতাবশত', syn: 'Unintentional / Accidental', ant: 'Deliberate / Intentional' },
  { word: 'Incipient', bn: 'প্রাথমিক / অঙ্কুরিত পর্যায়ের', syn: 'Nascent / Emerging', ant: 'Mature / Advanced' },
  { word: 'Incongruous', bn: 'অসামঞ্জস্যপূর্ণ / বেমানান', syn: 'Inconsistent / Discordant', ant: 'Harmonious / Compatible' },
  { word: 'Indefatigable', bn: 'অক্লান্ত / ক্লান্তিহীন', syn: 'Tireless / Unflagging', ant: 'Fatigued / Weary' },
  { word: 'Indigenous', bn: 'দেশীয় / স্থানীয়', syn: 'Native / Endemic', ant: 'Exotic / Foreign' },
  { word: 'Indigent', bn: 'অভাবগ্রস্ত / দরিদ্র', syn: 'Impoverished / Needy', ant: 'Opulent / Prosperous' },
  { word: 'Indignation', bn: 'অন্যায়ের বিরুদ্ধে ন্যায্য ক্ষোভ', syn: 'Resentment / Wrath', ant: 'Delight / Complacency' },
  { word: 'Inexorable', bn: 'অপ্রতিরোধ্য / অটল', syn: 'Relentless / Unyielding', ant: 'Flexible / Yielding' },
  { word: 'Infallible', bn: 'ভুলত্রুটিহীন / অভ্রান্ত', syn: 'Unerring / Foolproof', ant: 'Fallible / Imperfect' },
  { word: 'Infamous', bn: 'কুখ্যাত / নিন্দিত', syn: 'Notorious / Disreputable', ant: 'Illustrious / Reputable' },
  { word: 'Ingenuous', bn: 'সরল ও নিষ্পাপ / অকপট', syn: 'Naive / Candid', ant: 'Devious / Cunning' },
  { word: 'Inimical', bn: 'ক্ষতিকর / শত্রুভাবাপন্ন', syn: 'Hostile / Adverse', ant: 'Friendly / Beneficial' },
  { word: 'Innate', bn: 'সহজাত / জন্মগত', syn: 'Congenital / Inborn', ant: 'Acquired / Learned' },
  { word: 'Insatiable', bn: 'অতৃপ্ত / যা পরিতৃপ্ত করা যায় না', syn: 'Unquenchable / Voracious', ant: 'Satisfied / Satiated' },
  { word: 'Insidiousness', bn: 'গোপন ক্ষতিসাধনকারী প্রবৃত্তি', syn: 'Treachery / Stealth', ant: 'Candor / Openness' },
  { word: 'Insipid', bn: 'নীরস / স্বাদহীন', syn: 'Bland / Vapid', ant: 'Zesty / Flavorful' },
  { word: 'Insolvent', bn: 'দেউলিয়া / ঋণ পরিশোধে অক্ষম', syn: 'Bankrupt / Ruined', ant: 'Solvent / Wealthy' },
  { word: 'Intractable', bn: 'অবাধ্য / নিরাময় বা নিয়ন্ত্রণ অসাধ্য', syn: 'Stubborn / Unmanageable', ant: 'Docile / Tractable' },
  { word: 'Inundate', bn: 'প্লাবিত করা / ভাসিয়ে দেওয়া', syn: 'Flood / Overwhelm', ant: 'Drain / Empty' },
  { word: 'Inveterate', bn: 'দীর্ঘদিনের বদ্ধমূল (অভ্যাস)', syn: 'Habitual / Chronic', ant: 'Occasional / Novice' },
  { word: 'Irrefutable', bn: 'অকাট্য / খণ্ডনাতীত', syn: 'Indisputable / Undeniable', ant: 'Debatable / Refutable' },
  { word: 'Juxtapose', bn: 'তুলনার জন্য পাশাপাশি স্থাপন করা', syn: 'Place side by side / Compare', ant: 'Separate / Isolate' },
  { word: 'Laconic', bn: 'অল্প কথায় ভাব প্রকাশক / স্বল্পভাষী', syn: 'Terse / Pithy', ant: 'Verbose / Garrulous' },
  { word: 'Lament', bn: 'শোক প্রকাশ বা বিলাপ করা', syn: 'Mourn / Grieve', ant: 'Rejoice / Celebrate' },
  { word: 'Latent', bn: 'সুপ্ত / প্রচ্ছন্ন', syn: 'Dormant / Hidden', ant: 'Manifest / Active' },
  { word: 'Laudatory', bn: 'প্রশংসামূলক', syn: 'Commendatory / Praising', ant: 'Disparaging / Critical' },
  { word: 'Lethal', bn: 'প্রাণঘাতী / মারাত্মক', syn: 'Fatal / Deadly', ant: 'Benign / Harmless' },
  { word: 'Loquacious', bn: 'অতি বাচাল', syn: 'Talkative / Garrulous', ant: 'Taciturn / Silent' },
  { word: 'Lucid', bn: 'প্রাঞ্জল / স্বচ্ছ ও সহজবোধ্য', syn: 'Clear / Intelligible', ant: 'Obscure / Ambiguous' },
  { word: 'Lurid', bn: 'ভয়াবহ / বীভৎস বা চটকদার', syn: 'Gruesome / Sensational', ant: 'Mild / Subdued' },
  { word: 'Malady', bn: 'রোগ / ব্যাধি বা সমস্যা', syn: 'Ailment / Illness', ant: 'Wellness / Health' },
  { word: 'Malevolent', bn: 'বিদ্বেষপরায়ণ / ক্ষতিকামী', syn: 'Malicious / Spiteful', ant: 'Benevolent / Kind' },
  { word: 'Malleable', bn: 'নমনীয় / সহজে আকার দেওয়া যায় এমন', syn: 'Pliable / Adaptable', ant: 'Rigid / Unyielding' },
  { word: 'Mendacious', bn: 'মিথ্যাবাদী / অসত্য', syn: 'Deceitful / Untruthful', ant: 'Veracious / Honest' },
  { word: 'Mercurial', bn: 'চঞ্চল / দ্রুত মেজাজ পরিবর্তনশীল', syn: 'Volatile / Fickle', ant: 'Steadfast / Constant' },
  { word: 'Misanthropy', bn: 'মানবজাতির প্রতি ঘৃণা বা বিদ্বেষ', syn: 'Cynicism / Hatred of mankind', ant: 'Philanthropy / Humanism' },
  { word: 'Mollify', bn: 'রাগ বা উত্তেজনা প্রশমিত করা', syn: 'Appease / Pacify', ant: 'Aggravate / Enrage' },
  { word: 'Morbid', bn: 'অসুস্থ / রোগসংক্রান্ত বা বিষণ্ণ', syn: 'Unhealthy / Ghastly', ant: 'Wholesome / Cheerful' },
  { word: 'Morose', bn: 'গোমড়ামুখো / বিষণ্ণ', syn: 'Sullen / Gloomy', ant: 'Jovial / Cheerful' },
  { word: 'Munificent', bn: 'অতিশয় উদার ও দানশীল', syn: 'Generous / Lavish', ant: 'Stingy / Parsimonious' },
  { word: 'Myriad', bn: 'অগণিত / অসংখ্য', syn: 'Countless / Innumerable', ant: 'Few / Scarce' },
  { word: 'Nascent', bn: 'নবোদ্ভূত / প্রারম্ভিক', syn: 'Emerging / Budding', ant: 'Waning / Mature' },
  { word: 'Negligent', bn: 'অমনোযোগী / দায়িত্বহীন', syn: 'Careless / Remiss', ant: 'Conscientious / Diligent' },
  { word: 'Nefariousness', bn: 'দুষ্টামি / জঘন্যতা', syn: 'Wickedness / Villainy', ant: 'Virtue / Righteousness' },
  { word: 'Novelty', bn: 'নতুনত্ব / অভিনবত্ব', syn: 'Originality / Freshness', ant: 'Banality / Staleness' },
  { word: 'Obdurate', bn: 'একগুঁয়ে / হৃদয়হীন ও অনমনীয়', syn: 'Stubborn / Callous', ant: 'Compliant / Tender' },
  { word: 'Oblivion', bn: 'বিস্মৃতি / ভুলে যাওয়া অবস্থা', syn: 'Forgetfulness / Unawareness', ant: 'Remembrance / Awareness' },
  { word: 'Obscure', bn: 'অস্পষ্ট / অখ্যাত', syn: 'Vague / Unknown', ant: 'Explicit / Prominent' },
  { word: 'Obsequious', bn: 'তোষামুদে / অতিরিক্ত আজ্ঞাবহ', syn: 'Servile / Sycophantic', ant: 'Domineering / Assertive' },
  { word: 'Onerous', bn: 'শ্রমসাধ্য / গুরুভার', syn: 'Burdensome / Arduous', ant: 'Effortless / Easy' },
  { word: 'Opaque', bn: 'অস্বচ্ছ / দুর্বোধ্য', syn: 'Cloudy / Impenetrable', ant: 'Transparent / Lucid' },
  { word: 'Opulent', bn: 'বিপুল ঐশ্বর্যশালী / বিলাসবহুল', syn: 'Lavish / Affluent', ant: 'Indigent / Spartan' },
  { word: 'Ostentation', bn: 'লোকদেখানো আড়ম্বর', syn: 'Showiness / Pomp', ant: 'Modesty / Simplicity' },
  { word: 'Panegyric', bn: 'উচ্চ প্রশস্তি / গুণকীর্তন', syn: 'Eulogy / Encomium', ant: 'Diatribe / Tirade' },
  { word: 'Paragon', bn: 'আদর্শ বা উৎকর্ষের মূর্ত প্রতীক', syn: 'Epitome / Model', ant: 'Flaw / Counterexample' },
  { word: 'Pathological', bn: 'রোগসংক্রান্ত বা অস্বাভাবিক', syn: 'Diseased / Morbid', ant: 'Healthy / Normal' },
  { word: 'Paucity', bn: 'স্বল্পতা / অভাব', syn: 'Scarcity / Dearth', ant: 'Abundance / Plethora' },
  { word: 'Pedantic', bn: 'পুস্তকসর্বস্ব পাণ্ডিত্যপ্রদর্শনকারী', syn: 'Dogmatic / Over-exact', ant: 'Pragmatic / Casual' },
];

// 50 HSC Textbook & High-Yield Sentence Completion / Pinpoint Drills
const HSC_AND_MIXED_ENG_DRILLS: Array<{ topic: string; q: string; a: string; wrongs: [string, string, string]; exp: string; ch: 'eng_medical' | 'eng_med_lit_trans' }> = [
  { topic: 'HSC Text & Nelson Mandela', ch: 'eng_med_lit_trans', q: 'In Nelson Mandela’s speech ("I have cherished the ideal of a democratic..."), what does "apartheid" refer to?', a: 'Institutionalized racial segregation in South Africa', wrongs: ['A peace treaty in Europe', 'Economic liberalization policy', 'Agricultural land reform'], exp: 'দক্ষিণ আফ্রিকায় বর্ণবৈষম্যমূলক শাসনব্যবস্থাকে Apartheid বলা হতো (১৯৯৪ সালে এর অবসান ঘটে)।' },
  { topic: 'HSC Text & Bangabandhu', ch: 'eng_med_lit_trans', q: 'In the English translation of Bangabandhu’s 7 March Speech, "The struggle this time is a struggle for ___" completes with:', a: 'our emancipation; the struggle this time is a struggle for independence', wrongs: ['economic dominance only', 'territorial expansion abroad', 'regional trade treaties'], exp: '"এবারের সংগ্রাম আমাদের মুক্তির সংগ্রাম, এবারের সংগ্রাম স্বাধীনতার সংগ্রাম" — HSC English First Paper।।' },
  { topic: 'HSC Text & Poems', ch: 'eng_med_lit_trans', q: 'Who wrote the poem "Dreams" ("Hold fast to dreams / For if dreams die...") included in HSC English?', a: 'Langston Hughes', wrongs: ['D. H. Lawrence', 'W. B. Yeats', 'Robert Frost'], exp: 'হার্লেম রেনেসাঁর কবি Langston Hughes "Dreams" কবিতাটি রচনা করেন।' },
  { topic: 'HSC Text & Poems', ch: 'eng_med_lit_trans', q: 'Who authored the poem "The Lake Isle of Innisfree" featured in HSC English 1st Paper?', a: 'W. B. Yeats', wrongs: ['William Wordsworth', 'John Keats', 'Dylan Thomas'], exp: 'আইরিশ কবি W. B. Yeats "The Lake Isle of Innisfree" রচনা করেন।' },
  { topic: 'HSC Text & Poems', ch: 'eng_med_lit_trans', q: 'In Shelley’s "Ozymandias", what message does the shattered statue in the desert convey?', a: 'The transience of worldly power and arrogance', wrongs: ['Eternal glory of military emperors', 'Superiority of desert architecture', 'Immortal rule of ancient kings'], exp: 'ক্ষমতা ও অহংকার ক্ষণস্থায়ী — শিল্পকর্ম টিকে থাকলেও সাম্রাজ্য ধ্বংস হয়।' },
  { topic: 'HSC Text & Kalpana Chawla', ch: 'eng_med_lit_trans', q: 'Valentina Tereshkova and Kalpana Chawla are studied in HSC English as pioneers of:', a: 'Women in space exploration', wrongs: ['Marine biology', 'Nuclear physics', 'Alpine mountaineering'], exp: 'ভ্যালেন্তিনা তেরেসকোভা প্রথম নারী মহাকাশচারী (১৯৬৩) ও কল্পনা চাওলা ভারতীয় বংশোদ্ভূত মহাকাশচারী।' },
  { topic: 'HSC Text & Hakaluki Haor', ch: 'eng_med_lit_trans', q: 'Hakaluki Haor, featured in HSC English environmental lessons, is located in which two districts?', a: 'Sylhet and Moulvibazar', wrongs: ['Sunamganj and Netrokona', 'Kishoreganj and Habiganj', 'Rangpur and Kurigram'], exp: 'হাকালুকি হাওর সিলেট ও মৌলভীবাজার জেলাজুড়ে বিস্তৃত বাংলাদেশের বৃহত্তম হাওর।' },
  { topic: 'HSC Text & Kuakata', ch: 'eng_med_lit_trans', q: 'Why is Kuakata known as "Sagar Kannya" (Daughter of the Sea) in the HSC textbook?', a: 'Both sunrise and sunset can be seen from its sandy beach', wrongs: ['It is the deepest seaport of Asia', 'Coral reefs encircle the entire coast', 'It lies at the mouth of the Padma'], exp: 'কুয়াকাটা সমুদ্রসৈকত থেকে সূর্যোদয় ও সূর্যাস্ত উভয়ই স্পষ্ট দেখা যায়।' },
  { topic: 'HSC Text & Craft', ch: 'eng_med_lit_trans', q: 'In the HSC lesson on "Folk Music", which genres are uniquely identified with Bangladesh?', a: 'Baul, Bhatiyali, Bhawaiya, and Lalon Geeti', wrongs: ['Opera, Waltz, and Polka', 'Fado, Flamenco, and Tango', 'Haiku, Noh, and Kabuki'], exp: 'বাউল, ভাটিয়ালি, ভাওয়াইয়া ও লালনগীতি বাংলাদেশের লোকসংগীতের ঐতিহ্য।' },
  { topic: 'HSC Text & Adolescence', ch: 'eng_med_lit_trans', q: 'According to WHO definitions cited in HSC English, "Adolescence" spans which age bracket?', a: '10 to 19 years', wrongs: ['5 to 12 years', '18 to 25 years', '21 to 30 years'], exp: 'WHO অনুযায়ী ১০ থেকে ১৯ বছর বয়সকালকে কৈশোর বা Adolescence বলা হয়।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the correct sentence regarding "lest":', a: 'He walked briskly lest he should miss the morning ward round.', wrongs: ['He walked briskly lest he should not miss the ward round.', 'He walked briskly lest he will miss the ward round.', 'He walked briskly lest he missed the ward round.'], exp: 'Lest-এর পর should/might + V1 বসে এবং কখনো "not" বসে না।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Select the error-free sentence using "hardly":', a: 'Hardly had the surgery begun when the backup generator kicked in.', wrongs: ['Hardly the surgery had begun when the generator kicked in.', 'Hardly had the surgery begun than the generator kicked in.', 'Hardly had the surgery began when the generator kicked in.'], exp: 'Hardly had + Sub + V3 ... when হলো নির্ভুল গঠন।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the correct Conditional sentence:', a: 'Had the paramedics arrived earlier, the patient might have survived.', wrongs: ['Had the paramedics arrived earlier, the patient might survive.', 'If the paramedics arrived earlier, the patient might have survived.', 'Would the paramedics arrived earlier, the patient survived.'], exp: '3rd Conditional Inversion: Had + Sub + V3, Sub + would/might have + V3।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the correct use of "no sooner":', a: 'No sooner had the test ended than students rushed out.', wrongs: ['No sooner had the test ended when students rushed out.', 'No sooner did the test ended than students rushed out.', 'No sooner the test had ended than students rushed out.'], exp: 'No sooner had + Sub + V3 + than বসে।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Which sentence correctly uses "prefer"?', a: 'Most interns prefer clinical practice to administrative paperwork.', wrongs: ['Most interns prefer clinical practice than administrative paperwork.', 'Most interns prefer clinical practice more than paperwork.', 'Most interns prefer to clinical practice over paperwork.'], exp: 'Prefer + Noun/Gerund + to + Noun/Gerund সঠিক গঠন।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Identify the correct sentence with "despite":', a: 'Despite being exhausted, the resident monitored the ICU all night.', wrongs: ['Despite of being exhausted, the resident monitored the ICU.', 'Despite she was exhausted, the resident monitored the ICU.', 'In spite being exhausted, the resident monitored the ICU.'], exp: 'Despite + V-ing/Noun (of ছাড়া); In spite of + V-ing/Noun।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Which sentence correctly uses "neither ... nor"?', a: 'Neither the chief doctor nor the nurses were informed about the shift change.', wrongs: ['Neither the chief doctor nor the nurses was informed.', 'Neither the chief doctor or the nurses were informed.', 'Neither the chief doctor nor the nurses wasn’t informed.'], exp: 'Neither ... nor-এ নিকটতম Subject "nurses" (Plural) অনুযায়ী "were" বসবে।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Which sentence correctly handles Uncountable Nouns?', a: 'The laboratory purchased several pieces of modern equipment.', wrongs: ['The laboratory purchased several modern equipments.', 'The laboratory purchased many equipment.', 'The laboratory purchased a modern equipment.'], exp: 'Equipment Uncountable; সংখ্যা বোঝাতে "pieces of equipment" ব্যবহৃত হয়।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the grammatically sound sentence:', a: 'The doctor insisted that the patient undergo an immediate CT scan.', wrongs: ['The doctor insisted that the patient undergoes an immediate CT scan.', 'The doctor insisted that the patient underwent an immediate CT scan.', 'The doctor insisted the patient to undergo an immediate CT scan.'], exp: 'Mandative Subjunctive: insist that + Subject + Base Verb (undergo)।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the correct sentence using "as well as":', a: 'Vitamin D, as well as calcium, is essential for bone mineralization.', wrongs: ['Vitamin D, as well as calcium, are essential for bone mineralization.', 'Vitamin D, as well as calcium, were essential for bone mineralization.', 'Vitamin D, as well as calcium, have been essential for bone mineralization.'], exp: 'As well as থাকলে প্রথম Subject (Vitamin D — Singular) অনুযায়ী "is" বসে।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Identify the correct sentence with "one of the":', a: 'Dhaka Medical College is one of the finest medical institutions in South Asia.', wrongs: ['Dhaka Medical College is one of the finest medical institution in South Asia.', 'Dhaka Medical College are one of the finest medical institutions.', 'Dhaka Medical College is one of finest medical institutions.'], exp: '"One of the + Superlative + Plural Noun" এবং মূল Verb Singular (is) হয়।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Select the accurate sentence with "used to":', a: 'Medical interns are used to working under strict time constraints.', wrongs: ['Medical interns are used to work under strict time constraints.', 'Medical interns used to working under strict time constraints.', 'Medical interns are use to working under strict time constraints.'], exp: '"Be used to + Verb-ing" অর্থ অভ্যস্ত থাকা।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Select the accurate sentence with "worth":', a: 'Every diagram in the anatomy textbook is worth memorizing.', wrongs: ['Every diagram in the anatomy textbook is worth to memorize.', 'Every diagram in the anatomy textbook is worth memorized.', 'Every diagram in the anatomy textbook is worthy memorize.'], exp: '"Be worth + Verb-ing" হলো নির্ভুল গঠন।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the accurate comparative structure:', a: 'The climate of Chittagong is milder than that of Rajshahi.', wrongs: ['The climate of Chittagong is milder than Rajshahi.', 'The climate of Chittagong is milder than those of Rajshahi.', 'The climate of Chittagong is more milder than Rajshahi.'], exp: 'তুলনীয় জিনিস একই (climate vs climate) রাখতে "than that of" ব্যবহৃত হয়।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Identify the sentence free from redundancy:', a: 'Please repeat the instructions slowly for the elderly patient.', wrongs: ['Please repeat the instructions again slowly.', 'Please return back the prescription pad.', 'Please enter into the consultation room.'], exp: '"Repeat again", "return back", "enter into (room)" বাহুল্যদোষে দুষ্ট (Redundant)।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Which sentence correctly uses "between" vs "among"?', a: 'The research grant was shared among the five microbiology labs.', wrongs: ['The research grant was shared between the five microbiology labs.', 'The two surgeons argued among themselves.', 'Between the four candidates, one was selected.'], exp: 'অনির্দিষ্ট দুইয়ের অধিকের মধ্যে বণ্টনে "among" বসে (দুয়ের মধ্যে হলে "between")।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the right passive of "Did the technician calibrate the centrifuge?":', a: 'Was the centrifuge calibrated by the technician?', wrongs: ['Did the centrifuge calibrated by the technician?', 'Is the centrifuge calibrated by the technician?', 'Were the centrifuge calibrated by the technician?'], exp: 'Past Indefinite Yes/No প্রশ্নের Passive: Was/Were + Object + V3 + by + Subject?' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the right passive of "Whom did you invite to the symposium?":', a: 'Who was invited by you to the symposium?', wrongs: ['Whom was invited by you to the symposium?', 'By whom were you invited to the symposium?', 'Who were invited by you to the symposium?'], exp: 'Whom → Passive-এ Who হয়।' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the right indirect speech of: He said, "What a brilliant discovery!"', a: 'He exclaimed with wonder that it was a very brilliant discovery.', wrongs: ['He asked what a brilliant discovery was.', 'He exclaimed that what a brilliant discovery it was.', 'He told with joy that it is a brilliant discovery.'], exp: 'Exclamatory → Assertive-এ exclaimed with wonder/joy + that + it was...' },
  { topic: 'Grammar Precision', ch: 'eng_medical', q: 'Choose the correct embedded question:', a: 'Do you know how many bones the human cranium has?', wrongs: ['Do you know how many bones does the human cranium have?', 'Do you know how many bones has the human cranium?', 'Do you know did the human cranium has bones?'], exp: 'Embedded clause-এ "how many bones"-এর পর Subject + Verb (Assertive ক্রম) বসে।' },
];

export function buildEngStructuredJ(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `esj_${String(seq++).padStart(4, '0')}`;

  // 1. 80 Vocabulary Words × 3 = 240 MCQs
  VOCAB_BANK_3.forEach((v, i) => {
    const others = VOCAB_BANK_3.filter((x) => x.word !== v.word);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board',
        question: `Find the closest synonym of "${v.word}":`,
        correct: v.syn,
        distractors: [v.ant, ...others.slice(i % 40, (i % 40) + 5).map((x) => x.syn)],
        explanation: `${v.word} (${v.bn})-এর সমার্থক: ${v.syn}। বিপরীত: ${v.ant}।`,
        reference: 'Medical Admission English · High-Yield Synonym III',
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
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `Find the exact antonym of "${v.word}":`,
        correct: v.ant,
        distractors: [v.syn, ...others.slice((i + 20) % 40, ((i + 20) % 40) + 5).map((x) => x.ant)],
        explanation: `${v.word} (${v.bn})-এর বিপরীত শব্দ: ${v.ant}। সমার্থক: ${v.syn}।`,
        reference: 'Medical Admission English · High-Yield Antonym III',
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
        difficulty: 'board',
        question: `"${v.word}" শব্দটির প্রমিত বাংলা অর্থ কোনটি?`,
        correct: v.bn,
        distractors: others.slice((i + 30) % 40, ((i + 30) % 40) + 5).map((x) => x.bn),
        explanation: `${v.word} অর্থ "${v.bn}" (${v.syn})।`,
        reference: 'Medical Admission English · Vocabulary Meaning III',
      })
    );
  });

  // 2. 30 HSC Text & High-Yield Grammar Precision MCQs
  HSC_AND_MIXED_ENG_DRILLS.forEach((d, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: d.ch,
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: d.q,
        correct: d.a,
        distractors: d.wrongs,
        explanation: d.exp,
        reference: `Medical English · ${d.topic}`,
      })
    );
  });

  return list;
}
