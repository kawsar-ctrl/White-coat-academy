import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

interface VocabItem {
  word: string;
  bn: string;
  syn: string;
  ant: string;
  synWrongs: [string, string, string];
  antWrongs: [string, string, string];
  ctxSentence: string;
}

const VOCAB_BANK_L: VocabItem[] = [
  { word: 'Penurious', bn: 'অত্যন্ত দরিদ্র / কৃপণ', syn: 'Destitute', ant: 'Affluent', synWrongs: ['Generous', 'Wealthy', 'Lavish'], antWrongs: ['Indigent', 'Frugal', 'Stingy'], ctxSentence: 'Despite his ___ upbringing, he studied hard to win a medical scholarship.' },
  { word: 'Perfunctory', bn: 'দায়সারা / অমনোযোগী', syn: 'Cursory', ant: 'Thorough', synWrongs: ['Meticulous', 'Diligent', 'Earnest'], antWrongs: ['Hasty', 'Careless', 'Superficial'], ctxSentence: 'A ___ clinical checkup can overlook subtle signs of internal bleeding.' },
  { word: 'Pernicious', bn: 'মারাত্মক ক্ষতিকর', syn: 'Deleterious', ant: 'Salubrious', synWrongs: ['Benign', 'Harmless', 'Wholesome'], antWrongs: ['Noxious', 'Lethal', 'Destructive'], ctxSentence: 'Self-medication with unprescribed steroids has a ___ effect on immunity.' },
  { word: 'Perspicacious', bn: 'তীক্ষ্ণ বুদ্ধিসম্পন্ন / দূরদর্শী', syn: 'Astute', ant: 'Obtuse', synWrongs: ['Gullible', 'Naive', 'Dull'], antWrongs: ['Shrewd', 'Perceptive', 'Insightful'], ctxSentence: 'A ___ physician detects rare syndromes from subtle patient histories.' },
  { word: 'Pertinent', bn: 'প্রাসঙ্গিক / যথাযথ', syn: 'Relevant', ant: 'Extraneous', synWrongs: ['Irrelevant', 'Unrelated', 'Trivial'], antWrongs: ['Germane', 'Apposite', 'Applicable'], ctxSentence: 'Please ask only ___ questions during the ward round.' },
  { word: 'Phlegmatic', bn: 'উদাসীন / ধীরস্থির', syn: 'Impassive', ant: 'Excitable', synWrongs: ['Passionate', 'Hysterical', 'Volatile'], antWrongs: ['Stoic', 'Placid', 'Calm'], ctxSentence: 'In emergency surgery, a ___ temperament prevents panic.' },
  { word: 'Placid', bn: 'শান্ত / স্থির', syn: 'Serene', ant: 'Turbulent', synWrongs: ['Agitated', 'Fierce', 'Restless'], antWrongs: ['Tranquil', 'Calm', 'Peaceful'], ctxSentence: 'The ___ lakeside ward helped recovering patients sleep soundly.' },
  { word: 'Plethora', bn: 'অতিশয় আধিক্য / প্রাচুর্য', syn: 'Surfeit', ant: 'Scarcity', synWrongs: ['Dearth', 'Lack', 'Deficit'], antWrongs: ['Abundance', 'Excess', 'Glut'], ctxSentence: 'There is a ___ of online health articles, though few are peer-reviewed.' },
  { word: 'Poignant', bn: 'মর্মস্পর্শী / হৃদয়বিদারক', syn: 'Touching', ant: 'Unemotional', synWrongs: ['Cheerful', 'Apathetic', 'Humorous'], antWrongs: ['Moving', 'Pathetic', 'Heartfelt'], ctxSentence: 'The farewell speech by the retiring professor was deeply ___.' },
  { word: 'Ponderous', bn: 'ভারী / নীরস ও মন্থর', syn: 'Cumbersome', ant: 'Lighthearted', synWrongs: ['Brisk', 'Nimble', 'Breezy'], antWrongs: ['Heavy', 'Unwieldy', 'Lumbering'], ctxSentence: 'Students struggled through the ___ 1,500-page reference manual.' },
  { word: 'Precipitate', bn: 'হঠকারী / ত্বরান্বিত করা', syn: 'Rash', ant: 'Cautious', synWrongs: ['Deliberate', 'Prudent', 'Measured'], antWrongs: ['Impetuous', 'Sudden', 'Hasty'], ctxSentence: 'Stopping antibiotics early may ___ a dangerous relapse.' },
  { word: 'Preclude', bn: 'প্রতিরোধ করা / অসম্ভব করা', syn: 'Forestall', ant: 'Facilitate', synWrongs: ['Enable', 'Encourage', 'Permit'], antWrongs: ['Prevent', 'Avert', 'Obviate'], ctxSentence: 'Strict sterilization rules ___ postoperative wound infections.' },
  { word: 'Predilection', bn: 'সহজাত ঝোঁক বা পছন্দ', syn: 'Proclivity', ant: 'Aversion', synWrongs: ['Dislike', 'Antipathy', 'Repulsion'], antWrongs: ['Inclination', 'Fondness', 'Bias'], ctxSentence: 'From childhood, she showed a strong ___ for biological sciences.' },
  { word: 'Presumptuous', bn: 'ধৃষ্ট / সীমা লঙ্ঘনকারী', syn: 'Audacious', ant: 'Diffident', synWrongs: ['Humble', 'Modest', 'Deferential'], antWrongs: ['Arrogant', 'Overconfident', 'Brash'], ctxSentence: 'It would be ___ for a first-year student to challenge the chief surgeon publicly.' },
  { word: 'Prevaricate', bn: 'সত্য এড়িয়ে ঘোরাঘুরি করা', syn: 'Equivocate', ant: 'Testify candidly', synWrongs: ['Confess', 'Reveal', 'Affirm'], antWrongs: ['Evade', 'Quibble', 'Dodge'], ctxSentence: 'The witness began to ___ when asked about the missing lab records.' },
  { word: 'Prodigal', bn: 'অপব্যয়ী / বেহিসেবি', syn: 'Extravagant', ant: 'Thrifty', synWrongs: ['Frugal', 'Miserly', 'Economical'], antWrongs: ['Wasteful', 'Lavish', 'Spendthrift'], ctxSentence: '___ consumption of fossil fuels accelerates climate instability.' },
  { word: 'Prodigious', bn: 'বিস্ময়কর / বিশাল', syn: 'Colossal', ant: 'Miniscule', synWrongs: ['Trivial', 'Tiny', 'Ordinary'], antWrongs: ['Enormous', 'Stupendous', 'Immense'], ctxSentence: 'The researcher possessed a ___ memory for biochemical pathways.' },
  { word: 'Profligate', bn: 'লম্পট / অমিতব্যয়ী', syn: 'Dissolute', ant: 'Temperate', synWrongs: ['Virtuous', 'Ascetic', 'Restrained'], antWrongs: ['Reckless', 'Wasteful', 'Licentious'], ctxSentence: '___ habits drained both his health and his family fortune.' },
  { word: 'Profuse', bn: 'প্রচুর / অজস্র', syn: 'Copious', ant: 'Meager', synWrongs: ['Scant', 'Sparse', 'Deficient'], antWrongs: ['Abundant', 'Plentiful', 'Lavish'], ctxSentence: '___ sweating and chest pain require immediate cardiac evaluation.' },
  { word: 'Proliferate', bn: 'দ্রুত সংখ্যাবৃদ্ধি করা', syn: 'Multiply', ant: 'Dwindle', synWrongs: ['Shrink', 'Decrease', 'Decline'], antWrongs: ['Mushroom', 'Burgeon', 'Expand'], ctxSentence: 'Malignant cells ___ uncontrollably if checkpoints fail.' },
  { word: 'Propensity', bn: 'স্বাভাবিক প্রবণতা', syn: 'Tendency', ant: 'Disinclination', synWrongs: ['Reluctance', 'Aversion', 'Avoidance'], antWrongs: ['Predisposition', 'Aptitude', 'Leaning'], ctxSentence: 'Certain mutations create a genetic ___ toward hypertension.' },
  { word: 'Prosaic', bn: 'নীরস / গতানুগতিক', syn: 'Mundane', ant: 'Imaginative', synWrongs: ['Poetic', 'Creative', 'Inspiring'], antWrongs: ['Banal', 'Dull', 'Ordinary'], ctxSentence: 'Unlike poetic memoirs, clinical charts are written in ___ language.' },
  { word: 'Prudent', bn: 'বিচক্ষণ / দূরদর্শী', syn: 'Sagacious', ant: 'Imprudent', synWrongs: ['Reckless', 'Foolish', 'Impulsive'], antWrongs: ['Wise', 'Sensible', 'Judicious'], ctxSentence: 'It is ___ to isolate contagious patients before confirming the strain.' },
  { word: 'Pugnacious', bn: 'কলহপ্রিয় / যুদ্ধংদেহী', syn: 'Belligerent', ant: 'Conciliatory', synWrongs: ['Peaceful', 'Amiable', 'Gentle'], antWrongs: ['Combative', 'Quarrelsome', 'Aggressive'], ctxSentence: 'A ___ attitude undermines teamwork in the intensive care unit.' },
  { word: 'Quaint', bn: 'প্রাচীন ধাঁচের কিন্তু মনোরম', syn: 'Picturesque', ant: 'Modernistic', synWrongs: ['Commonplace', 'Sleek', 'Futuristic'], antWrongs: ['Charming', 'Old-fashioned', 'Curious'], ctxSentence: 'The ___ heritage dispensary still displays century-old glass apothecary jars.' },
  { word: 'Querulous', bn: 'খুঁতখুঁতে / সর্বদা অভিযোগকারী', syn: 'Cantankerous', ant: 'Complacent', synWrongs: ['Cheerful', 'Contented', 'Agreeable'], antWrongs: ['Peevish', 'Petulant', 'Fretful'], ctxSentence: 'Sleep deprivation made the recovering patient unusually ___.' },
  { word: 'Quiescent', bn: 'নিষ্ক্রিয় / সুপ্ত', syn: 'Dormant', ant: 'Active', synWrongs: ['Turbulent', 'Vigorous', 'Dynamic'], antWrongs: ['Inactive', 'Latent', 'Still'], ctxSentence: 'The virus can remain ___ inside nerve ganglia for decades.' },
  { word: 'Quixotic', bn: 'অবাস্তব আদর্শবাদী / কল্পনাবিলাসী', syn: 'Idealistic', ant: 'Pragmatic', synWrongs: ['Realistic', 'Practical', 'Sensible'], antWrongs: ['Visionary', 'Impractical', 'Utopian'], ctxSentence: 'Curing every chronic ailment without lifestyle changes is a ___ hope.' },
  { word: 'Rancor', bn: 'দীর্ঘদিনের তীব্র বিদ্বেষ', syn: 'Bitterness', ant: 'Amity', synWrongs: ['Affection', 'Harmony', 'Goodwill'], antWrongs: ['Malice', 'Animosity', 'Resentment'], ctxSentence: 'After resolving the dispute, the colleagues worked without any ___.' },
  { word: 'Rebuke', bn: 'তীব্র তিরস্কার করা', syn: 'Reprimand', ant: 'Extol', synWrongs: ['Praise', 'Commend', 'Applaud'], antWrongs: ['Chide', 'Scold', 'Censure'], ctxSentence: 'The supervisor had to ___ the trainee for skipping hand hygiene.' },
  { word: 'Recalcitrant', bn: 'অবাধ্য / জেদি', syn: 'Obstinate', ant: 'Compliant', synWrongs: ['Obedient', 'Docile', 'Amenable'], antWrongs: ['Defiant', 'Stubborn', 'Refractory'], ctxSentence: 'Antibiotic stewardship is crucial against ___ bacterial strains.' },
  { word: 'Reclusive', bn: 'নির্জনতাপ্রিয় / একাকী', syn: 'Solitary', ant: 'Gregarious', synWrongs: ['Sociable', 'Outgoing', 'Convivial'], antWrongs: ['Hermitic', 'Withdrawn', 'Secluded'], ctxSentence: 'The ___ scientist spent twenty years perfecting the staining method alone.' },
  { word: 'Reconcile', bn: 'মীমাংসা করা / সামঞ্জস্য আনা', syn: 'Harmonize', ant: 'Estrange', synWrongs: ['Alienate', 'Divide', 'Antagonize'], antWrongs: ['Settle', 'Mediate', 'Accord'], ctxSentence: 'Good evidence helps ___ conflicting clinical trial outcomes.' },
  { word: 'Redundant', bn: 'বাহুল্য / অপ্রয়োজনীয় পুনরাবৃত্ত', syn: 'Superfluous', ant: 'Essential', synWrongs: ['Indispensable', 'Concise', 'Vital'], antWrongs: ['Excessive', 'Surplus', 'Repetitious'], ctxSentence: 'Ordering ___ lab tests wastes both time and hospital resources.' },
  { word: 'Refute', bn: 'যুক্তি দিয়ে খণ্ডন করা', syn: 'Disprove', ant: 'Corroborate', synWrongs: ['Confirm', 'Validate', 'Substantiate'], antWrongs: ['Rebut', 'Confute', 'Negate'], ctxSentence: 'Controlled trials quickly ___ claims made without empirical data.' },
  { word: 'Relegate', bn: 'নিম্নস্তরে নামিয়ে দেওয়া', syn: 'Demote', ant: 'Promote', synWrongs: ['Elevate', 'Exalt', 'Upgrade'], antWrongs: ['Downgrade', 'Banish', 'Consign'], ctxSentence: 'Outdated theories were ___ to medical history textbooks.' },
  { word: 'Remorse', bn: 'গভীর অনুতাপ', syn: 'Contrition', ant: 'Callousness', synWrongs: ['Indifference', 'Pride', 'Satisfaction'], antWrongs: ['Regret', 'Penitence', 'Compunction'], ctxSentence: 'He felt genuine ___ for neglecting the warning symptoms.' },
  { word: 'Repudiate', bn: 'প্রত্যাখ্যান বা অস্বীকার করা', syn: 'Renounce', ant: 'Embrace', synWrongs: ['Accept', 'Endorse', 'Adopt'], antWrongs: ['Reject', 'Disavow', 'Spurn'], ctxSentence: 'Modern pharmacology has ___ several toxic medieval remedies.' },
  { word: 'Rescind', bn: 'বাতিল বা রদ করা', syn: 'Revoke', ant: 'Enact', synWrongs: ['Approve', 'Ratify', 'Institute'], antWrongs: ['Annul', 'Repeal', 'Cancel'], ctxSentence: 'The council decided to ___ the flawed licensing circular.' },
  { word: 'Restive', bn: 'অস্থির / অশান্ত', syn: 'Fidgety', ant: 'Serene', synWrongs: ['Calm', 'Patient', 'Composed'], antWrongs: ['Restless', 'Uneasy', 'Impatient'], ctxSentence: 'The waiting crowd grew ___ as the outpatient clinic delayed opening.' },
  { word: 'Retract', bn: 'প্রত্যাহার করে নেওয়া', syn: 'Withdraw', ant: 'Assert', synWrongs: ['Maintain', 'Proclaim', 'Reiterate'], antWrongs: ['Recant', 'Take back', 'Revoke'], ctxSentence: 'The journal had to ___ the paper after discovering fabricated data.' },
  { word: 'Reverence', bn: 'গভীর শ্রদ্ধা ও ভক্তি', syn: 'Veneration', ant: 'Scorn', synWrongs: ['Contempt', 'Disdain', 'Mockery'], antWrongs: ['Respect', 'Awe', 'Homage'], ctxSentence: 'Medical students handle cadavers with dignity and ___.' },
  { word: 'Rigorous', bn: 'কঠোর ও সূক্ষ্ম', syn: 'Stringent', ant: 'Lax', synWrongs: ['Lenient', 'Careless', 'Casual'], antWrongs: ['Strict', 'Exact', 'Thorough'], ctxSentence: 'Every new vaccine undergoes ___ phase-III clinical testing.' },
  { word: 'Robust', bn: 'সুস্থ-সবল / শক্তিশালী', syn: 'Sturdy', ant: 'Frail', synWrongs: ['Fragile', 'Feeble', 'Weak'], antWrongs: ['Vigorous', 'Resilient', 'Hardy'], ctxSentence: 'Regular aerobic exercise builds a ___ cardiovascular system.' },
  { word: 'Rudimentary', bn: 'প্রাথমিক / মৌলিক', syn: 'Elementary', ant: 'Sophisticated', synWrongs: ['Advanced', 'Complex', 'Intricate'], antWrongs: ['Basic', 'Primitive', 'Fundamental'], ctxSentence: 'Every first-responder needs ___ knowledge of CPR.' },
  { word: 'Ruthless', bn: 'নির্দয় / নিষ্ঠুর', syn: 'Merciless', ant: 'Compassionate', synWrongs: ['Humane', 'Merciful', 'Tender'], antWrongs: ['Cruel', 'Relentless', 'Brutal'], ctxSentence: 'A ___ viral outbreak spares neither the young nor the old.' },
  { word: 'Salient', bn: 'প্রধান / লক্ষণীয়', syn: 'Prominent', ant: 'Inconspicuous', synWrongs: ['Obscure', 'Minor', 'Trivial'], antWrongs: ['Notable', 'Conspicuous', 'Striking'], ctxSentence: 'Summarize the ___ diagnostic features before presenting the patient.' },
  { word: 'Sanguine', bn: 'আশাবাদী / প্রফুল্ল', syn: 'Optimistic', ant: 'Despondent', synWrongs: ['Pessimistic', 'Gloomy', 'Morose'], antWrongs: ['Hopeful', 'Buoyant', 'Confident'], ctxSentence: 'Despite the complex operation, the surgical team remained ___.' },
  { word: 'Sardonic', bn: 'বিদ্রূপাত্মক / শ্লেষপূর্ণ', syn: 'Mocking', ant: 'Sincere', synWrongs: ['Earnest', 'Warm', 'Affable'], antWrongs: ['Cynical', 'Scornful', 'Derisive'], ctxSentence: 'His ___ remark hurt the junior intern during bedside teaching.' },
  { word: 'Scrupulous', bn: 'অতিসতর্ক / নীতিপরায়ণ', syn: 'Conscientious', ant: 'Unscrupulous', synWrongs: ['Negligent', 'Careless', 'Dishonest'], antWrongs: ['Punctilious', 'Meticulous', 'Principled'], ctxSentence: 'Operating theaters require ___ adherence to aseptic technique.' },
  { word: 'Sedentary', bn: 'বসে থাকা-নির্ভর / নিষ্ক্রিয়', syn: 'Inactive', ant: 'Active', synWrongs: ['Mobile', 'Athletic', 'Energetic'], antWrongs: ['Stationary', 'Deskbound', 'Inert'], ctxSentence: 'A ___ lifestyle increases the risk of type-2 diabetes.' },
  { word: 'Soporific', bn: 'নিদ্রাকর / ঘুমপাড়ানি', syn: 'Somnolent', ant: 'Invigorating', synWrongs: ['Stimulating', 'Energizing', 'Alerting'], antWrongs: ['Sedative', 'Sleep-inducing', 'Hypnotic'], ctxSentence: 'Certain first-generation antihistamines have strong ___ side effects.' },
  { word: 'Specious', bn: 'আপাতদৃষ্টিতে সত্য মনে হলেও ভ্রান্ত', syn: 'Plausible-looking', ant: 'Valid', synWrongs: ['Genuine', 'Sound', 'Authentic'], antWrongs: ['Deceptive', 'Fallacious', 'Misleading'], ctxSentence: 'Do not fall for ___ advertisements promising overnight weight loss.' },
  { word: 'Sporadic', bn: 'বিক্ষিপ্ত / অনিয়মিত', syn: 'Intermittent', ant: 'Perpetual', synWrongs: ['Continuous', 'Constant', 'Steady'], antWrongs: ['Occasional', 'Scattered', 'Irregular'], ctxSentence: 'Only ___ cases of malaria were reported after mosquito control.' },
  { word: 'Squander', bn: 'অপচয় করা', syn: 'Dissipate', ant: 'Conserve', synWrongs: ['Save', 'Hoard', 'Preserve'], antWrongs: ['Waste', 'Fritter', 'Lavish'], ctxSentence: 'Never ___ precious preparation months right before admission exams.' },
  { word: 'Staunch', bn: 'দৃঢ়নিষ্ঠ / অবিচল সমর্থক', syn: 'Steadfast', ant: 'Fickle', synWrongs: ['Disloyal', 'Wavering', 'Halfhearted'], antWrongs: ['Loyal', 'Resolute', 'Devoted'], ctxSentence: 'She has been a ___ advocate for rural maternal healthcare.' },
  { word: 'Stolid', bn: 'ভাবলেশহীন / নিরুত্তাপ', syn: 'Impassive', ant: 'Emotional', synWrongs: ['Passionate', 'Sensitive', 'Expressive'], antWrongs: ['Unemotional', 'Phlegmatic', 'Stoical'], ctxSentence: 'The ___ paramedic stayed focused amid the chaotic accident scene.' },
  { word: 'Strident', bn: 'কর্কশ ও তীব্র', syn: 'Harsh', ant: 'Mellifluous', synWrongs: ['Soothing', 'Melodious', 'Gentle'], antWrongs: ['Shrill', 'Grating', 'Vociferous'], ctxSentence: 'A ___ alarm signaled a sudden drop in oxygen saturation.' },
  { word: 'Stymie', bn: 'বাধাগ্রস্ত বা অচল করা', syn: 'Thwart', ant: 'Assist', synWrongs: ['Facilitate', 'Promote', 'Advance'], antWrongs: ['Hinder', 'Impede', 'Obstruct'], ctxSentence: 'Lack of cold-chain trucks can ___ rural vaccination drives.' },
  { word: 'Subservient', bn: 'তাবেদার / অতিরিক্ত নত', syn: 'Servile', ant: 'Domineering', synWrongs: ['Independent', 'Assertive', 'Autonomous'], antWrongs: ['Submissive', 'Obsequious', 'Compliant'], ctxSentence: 'Science should remain objective rather than ___ to commercial bias.' },
  { word: 'Substantiate', bn: 'প্রমাণ দ্বারা সমর্থন করা', syn: 'Corroborate', ant: 'Refute', synWrongs: ['Disprove', 'Contradict', 'Falsify'], antWrongs: ['Verify', 'Validate', 'Prove'], ctxSentence: 'Biopsy findings helped ___ the initial clinical suspicion.' },
  { word: 'Supercilious', bn: 'উদ্ধত / অবজ্ঞাপূর্ণ', syn: 'Haughty', ant: 'Humble', synWrongs: ['Modest', 'Meek', 'Respectful'], antWrongs: ['Arrogant', 'Disdainful', 'Condescending'], ctxSentence: 'A ___ attitude alienates patients who need empathy.' },
  { word: 'Supplant', bn: 'স্থানচ্যুত করে দখল নেওয়া', syn: 'Supersede', ant: 'Retain', synWrongs: ['Preserve', 'Maintain', 'Keep'], antWrongs: ['Replace', 'Displace', 'Oust'], ctxSentence: 'Digital imaging has largely ___ conventional film X-rays.' },
  { word: 'Surreptitious', bn: 'গোপন / চোরাই', syn: 'Clandestine', ant: 'Overt', synWrongs: ['Open', 'Transparent', 'Candid'], antWrongs: ['Stealthy', 'Covert', 'Secretive'], ctxSentence: 'Health inspectors uncovered a ___ trade in counterfeit antibiotics.' },
  { word: 'Sycophant', bn: 'চাটুকার / তোষামোদকারী', syn: 'Flatterer', ant: 'Critic', synWrongs: ['Detractor', 'Adversary', 'Mentor'], antWrongs: ['Toady', 'Fawner', 'Yes-man'], ctxSentence: 'Wise leaders prefer honest advisors over a chorus of ___.' },
  { word: 'Taciturn', bn: 'স্বল্পভাষী / মিতবাক', syn: 'Reticent', ant: 'Garrulous', synWrongs: ['Talkative', 'Loquacious', 'Verbose'], antWrongs: ['Reserved', 'Silent', 'Uncommunicative'], ctxSentence: 'The ___ specialist spoke little, yet his diagnoses were razor-sharp.' },
  { word: 'Tantamount', bn: 'সমতুল্য / সমান', syn: 'Equivalent', ant: 'Dissimilar', synWrongs: ['Opposed', 'Inferior', 'Unrelated'], antWrongs: ['Equal', 'Identical', 'Synonymous'], ctxSentence: 'Delaying emergency triage can be ___ to endangering a patient’s life.' },
  { word: 'Temerity', bn: 'অবিবেচক দুঃসাহস / ধৃষ্টতা', syn: 'Audacity', ant: 'Timidity', synWrongs: ['Caution', 'Prudence', 'Cowardice'], antWrongs: ['Rashness', 'Boldness', 'Effrontery'], ctxSentence: 'Few juniors had the ___ to question the outdated ward schedule.' },
  { word: 'Tenacity', bn: 'দৃঢ় সংকল্প / অধ্যবসায়', syn: 'Perseverance', ant: 'Irresolution', synWrongs: ['Vacillation', 'Weakness', 'Fickleness'], antWrongs: ['Persistence', 'Determination', 'Grit'], ctxSentence: 'Cracking the medical admission merit list requires sheer ___.' },
  { word: 'Tentative', bn: 'অস্থায়ী / পরীক্ষামূলক', syn: 'Provisional', ant: 'Definitive', synWrongs: ['Permanent', 'Final', 'Certain'], antWrongs: ['Hesitant', 'Experimental', 'Uncertain'], ctxSentence: 'Doctors issued a ___ diagnosis pending the culture report.' },
  { word: 'Terse', bn: 'সংক্ষিপ্ত অথচ সুস্পষ্ট', syn: 'Concise', ant: 'Verbose', synWrongs: ['Wordy', 'Prolix', 'Rambling'], antWrongs: ['Succinct', 'Pithy', 'Brief'], ctxSentence: 'Emergency handovers must be ___ and clinically accurate.' },
  { word: 'Tirade', bn: 'দীর্ঘ তীব্র ভর্ৎসনামূলক বক্তৃতা', syn: 'Diatribe', ant: 'Eulogy', synWrongs: ['Praise', 'Compliment', 'Panegyric'], antWrongs: ['Harangue', 'Outburst', 'Rant'], ctxSentence: 'Losing one’s temper in a ___ solves nothing during a crisis.' },
  { word: 'Torpid', bn: 'নিস্তেজ / অলস ও নিষ্ক্রিয়', syn: 'Lethargic', ant: 'Energetic', synWrongs: ['Vigorous', 'Lively', 'Alert'], antWrongs: ['Sluggish', 'Dormant', 'Apathetic'], ctxSentence: 'Severe hypothyroidism often leaves patients feeling ___.' },
  { word: 'Tractable', bn: 'সহজে নিয়ন্ত্রণযোগ্য / বশংবদ', syn: 'Docile', ant: 'Intractable', synWrongs: ['Stubborn', 'Unruly', 'Obstinate'], antWrongs: ['Manageable', 'Compliant', 'Malleable'], ctxSentence: 'Early-stage hypertension is far more ___ than neglected organ damage.' },
  { word: 'Tranquil', bn: 'শান্ত / প্রশান্ত', syn: 'Serene', ant: 'Agitated', synWrongs: ['Chaotic', 'Stormy', 'Frenzied'], antWrongs: ['Calm', 'Peaceful', 'Placid'], ctxSentence: 'Patients recover faster in a ___ environment free from noise.' },
  { word: 'Transgress', bn: 'আইন বা সীমা লঙ্ঘন করা', syn: 'Violate', ant: 'Obey', synWrongs: ['Comply', 'Observe', 'Uphold'], antWrongs: ['Infringe', 'Breach', 'Trespass'], ctxSentence: 'Researchers must never ___ ethical boundaries in human trials.' },
  { word: 'Trepidation', bn: 'ভয় ও কম্পন / উদ্বেগ', syn: 'Apprehension', ant: 'Composure', synWrongs: ['Confidence', 'Calmness', 'Serenity'], antWrongs: ['Dread', 'Anxiety', 'Fear'], ctxSentence: 'Many examinees feel brief ___ before opening the question paper.' },
  { word: 'Truculent', bn: 'হিংস্র / ঝগড়াটে', syn: 'Ferocious', ant: 'Gentle', synWrongs: ['Mild', 'Amiable', 'Peaceable'], antWrongs: ['Aggressive', 'Belligerent', 'Fierce'], ctxSentence: 'A ___ tone makes patients reluctant to share sensitive symptoms.' },
  { word: 'Turgid', bn: 'ফোলা / আড়ম্বরপূর্ণ ও দুর্বোধ্য', syn: 'Swollen', ant: 'Concise', synWrongs: ['Plain', 'Simple', 'Deflated'], antWrongs: ['Pompous', 'Inflated', 'Bombastic'], ctxSentence: 'Plant cells become ___ when placed in a hypotonic solution.' },
  { word: 'Turmoil', bn: 'গোলযোগ / অস্থিরতা', syn: 'Upheaval', ant: 'Tranquility', synWrongs: ['Peace', 'Order', 'Harmony'], antWrongs: ['Chaos', 'Commotion', 'Tumult'], ctxSentence: 'Public health preparedness prevents social ___ during epidemics.' },
  { word: 'Ubiquity', bn: 'সর্বব্যাপী উপস্থিতি', syn: 'Omnipresence', ant: 'Rarity', synWrongs: ['Scarcity', 'Infrequency', 'Absence'], antWrongs: ['Universality', 'Pervasiveness', 'Prevalence'], ctxSentence: 'The ___ of smartphones has transformed telemedicine access.' },
  { word: 'Uncanny', bn: 'অদ্ভুত / রহস্যজনক', syn: 'Eerie', ant: 'Ordinary', synWrongs: ['Mundane', 'Commonplace', 'Familiar'], antWrongs: ['Mysterious', 'Weird', 'Supernatural'], ctxSentence: 'The veteran clinician had an ___ knack for spotting subtle murmurs.' },
  { word: 'Undermine', bn: 'গোপনে দুর্বল বা ক্ষতিগ্রস্ত করা', syn: 'Sabotage', ant: 'Fortify', synWrongs: ['Strengthen', 'Bolster', 'Support'], antWrongs: ['Weaken', 'Subvert', 'Erode'], ctxSentence: 'Chronic sleep loss can ___ immune defenses against infection.' },
  { word: 'Unequivocal', bn: 'সুস্পষ্ট / দ্ব্যর্থহীন', syn: 'Unambiguous', ant: 'Ambiguous', synWrongs: ['Vague', 'Doubtful', 'Equivocal'], antWrongs: ['Explicit', 'Clear', 'Categorical'], ctxSentence: 'The pathology report provided ___ proof of benign tissue.' },
  { word: 'Unscrupulous', bn: 'নীতিহীন / বিবেকবর্জিত', syn: 'Unprincipled', ant: 'Ethical', synWrongs: ['Honest', 'Virtuous', 'Scrupulous'], antWrongs: ['Corrupt', 'Dishonest', 'Deceitful'], ctxSentence: '___ vendors sell expired medicine to unsuspecting villagers.' },
  { word: 'Untenable', bn: 'অযৌক্তিক / টিকতে অক্ষম', syn: 'Indefensible', ant: 'Defensible', synWrongs: ['Logical', 'Sound', 'Sustainable'], antWrongs: ['Unsustainable', 'Flawed', 'Baseless'], ctxSentence: 'Rising antibiotic resistance renders careless prescribing ___.' },
  { word: 'Urbane', bn: 'সুশীল / মার্জিত ও ভদ্র', syn: 'Suave', ant: 'Uncouth', synWrongs: ['Rude', 'Boorish', 'Crude'], antWrongs: ['Refined', 'Polished', 'Courteous'], ctxSentence: 'His ___ demeanor put nervous first-time patients at ease.' },
  { word: 'Usurp', bn: 'অন্যায়ভাবে দখল করা', syn: 'Seize', ant: 'Relinquish', synWrongs: ['Surrender', 'Abdicate', 'Yield'], antWrongs: ['Appropriate', 'Commandeer', 'Wrest'], ctxSentence: 'Unqualified practitioners must not ___ the role of licensed doctors.' },
  { word: 'Vacuous', bn: 'শূন্যগর্ভ / বুদ্ধিহীন', syn: 'Empty-headed', ant: 'Insightful', synWrongs: ['Intelligent', 'Thoughtful', 'Meaningful'], antWrongs: ['Vapid', 'Inane', 'Hollow'], ctxSentence: 'The ___ leaflet offered slogans instead of practical first-aid steps.' },
  { word: 'Vague', bn: 'অস্পষ্ট / অনির্দিষ্ট', syn: 'Indistinct', ant: 'Explicit', synWrongs: ['Precise', 'Clear', 'Specific'], antWrongs: ['Ambiguous', 'Hazy', 'Nebulous'], ctxSentence: 'Early viral illnesses often present with ___ aches and fatigue.' },
  { word: 'Valiant', bn: 'বীরত্বপূর্ণ / নির্ভীক', syn: 'Courageous', ant: 'Cowardly', synWrongs: ['Timid', 'Craven', 'Fearful'], antWrongs: ['Brave', 'Heroic', 'Gallant'], ctxSentence: 'Frontline paramedics made a ___ effort to reach flooded villages.' },
  { word: 'Venerate', bn: 'গভীরভাবে শ্রদ্ধা করা', syn: 'Revere', ant: 'Despise', synWrongs: ['Mock', 'Disdain', 'Scorn'], antWrongs: ['Honor', 'Respect', 'Esteem'], ctxSentence: 'Generations of physicians ___ Hippocrates for medical ethics.' },
  { word: 'Veracity', bn: 'সত্যবাদিতা / সত্যতা', syn: 'Truthfulness', ant: 'Mendacity', synWrongs: ['Falsehood', 'Deceit', 'Fabrication'], antWrongs: ['Honesty', 'Accuracy', 'Candor'], ctxSentence: 'Peer reviewers verify the ___ of experimental statistics.' },
  { word: 'Verdant', bn: 'সবুজ-শ্যামল / সতেজ', syn: 'Lush', ant: 'Barren', synWrongs: ['Arid', 'Withered', 'Sterile'], antWrongs: ['Green', 'Leafy', 'Flourishing'], ctxSentence: 'Medicinal herbs flourish across the ___ slopes of Sylhet.' },
  { word: 'Vex', bn: 'বিরক্ত বা উদ্বিগ্ন করা', syn: 'Annoy', ant: 'Placate', synWrongs: ['Soothe', 'Appease', 'Comfort'], antWrongs: ['Irritate', 'Exasperate', 'Nettle'], ctxSentence: 'Unresolved billing delays often ___ hospitalized families.' },
  { word: 'Viable', bn: 'কার্যকর / টিকে থাকতে সক্ষম', syn: 'Feasible', ant: 'Unworkable', synWrongs: ['Impossible', 'Futile', 'Impractical'], antWrongs: ['Workable', 'Practicable', 'Sustainable'], ctxSentence: 'Transplanted organs remain ___ only for a limited cold-storage window.' },
  { word: 'Vicarious', bn: 'পরোক্ষ / অন্যের অভিজ্ঞতায় অনুভূত', syn: 'Indirect', ant: 'Direct', synWrongs: ['Firsthand', 'Personal', 'Primary'], antWrongs: ['Secondhand', 'Substituted', 'Empathic'], ctxSentence: 'Interns gain ___ wisdom by observing senior surgeons’ case reviews.' },
  { word: 'Vigilant', bn: 'সদা সতর্ক ও জাগ্রত', syn: 'Watchful', ant: 'Oblivious', synWrongs: ['Negligent', 'Inattentive', 'Careless'], antWrongs: ['Alert', 'Observant', 'Wary'], ctxSentence: 'ICU nurses must remain ___ against sudden drops in blood pressure.' },
  { word: 'Vilify', bn: 'কুৎসা রটানো / নিন্দা করা', syn: 'Defame', ant: 'Eulogize', synWrongs: ['Praise', 'Vindicate', 'Extol'], antWrongs: ['Malign', 'Slander', 'Disparage'], ctxSentence: 'False rumors should never ___ dedicated healthcare workers.' },
  { word: 'Virulent', bn: 'বিষাক্ত / তীব্র সংক্রামক', syn: 'Venomous', ant: 'Benign', synWrongs: ['Mild', 'Harmless', 'Innocuous'], antWrongs: ['Lethal', 'Malignant', 'Toxic'], ctxSentence: 'A ___ strain of influenza spread rapidly through overcrowded hostels.' },
  { word: 'Vitiate', bn: 'দূষিত বা অকার্যকর করা', syn: 'Corrupt', ant: 'Purify', synWrongs: ['Cleanse', 'Validate', 'Improve'], antWrongs: ['Spoil', 'Impair', 'Taint'], ctxSentence: 'Improper sample labeling can ___ the entire diagnostic study.' },
  { word: 'Vociferous', bn: 'উচ্চকণ্ঠ / কোলাহলপূর্ণ', syn: 'Clamorous', ant: 'Quiet', synWrongs: ['Reticent', 'Silent', 'Subdued'], antWrongs: ['Boisterous', 'Loud', 'Outspoken'], ctxSentence: '___ protests erupted after the sudden closure of the night clinic.' },
  { word: 'Voracious', bn: 'অতিশয় ক্ষুধার্ত / অদম্য আগ্রহী', syn: 'Insatiable', ant: 'Satiated', synWrongs: ['Abstinent', 'Indifferent', 'Full'], antWrongs: ['Ravenous', 'Gluttonous', 'Avid'], ctxSentence: 'A ___ reader of medical journals stays abreast of new therapies.' },
  { word: 'Wane', bn: 'হ্রাস পাওয়া / ক্ষয়প্রাপ্ত হওয়া', syn: 'Diminish', ant: 'Wax', synWrongs: ['Surge', 'Escalate', 'Flourish'], antWrongs: ['Decrease', 'Ebb', 'Subside'], ctxSentence: 'Vaccine-induced antibodies may slowly ___ after several months.' },
  { word: 'Whimsical', bn: 'খেয়ালি / খামখেয়ালি', syn: 'Capricious', ant: 'Predictable', synWrongs: ['Steady', 'Consistent', 'Practical'], antWrongs: ['Fanciful', 'Erratic', 'Quirky'], ctxSentence: 'Laboratory protocols cannot rely on ___ guesswork.' },
  { word: 'Wistful', bn: 'উদাস ও স্মৃতিকাতর', syn: 'Nostalgic', ant: 'Contented', synWrongs: ['Cheerful', 'Unconcerned', 'Jubilant'], antWrongs: ['Yearning', 'Melancholic', 'Pensive'], ctxSentence: 'She gave a ___ glance at her old college hostel before leaving.' },
  { word: 'Wrath', bn: 'প্রচণ্ড ক্রোধ', syn: 'Fury', ant: 'Serenity', synWrongs: ['Delight', 'Calmness', 'Affection'], antWrongs: ['Rage', 'Ire', 'Indignation'], ctxSentence: 'Neglecting safety regulations invited the ___ of the health board.' },
  { word: 'Zenith', bn: 'সর্বোচ্চ শিখর বা চূড়া', syn: 'Apex', ant: 'Nadir', synWrongs: ['Bottom', 'Base', 'Abyss'], antWrongs: ['Pinnacle', 'Summit', 'Acme'], ctxSentence: 'By age fifty, the surgeon had reached the ___ of his career.' },
  { word: 'Zephyr', bn: 'মৃদু পশ্চিমা বাতাস', syn: 'Breeze', ant: 'Gale', synWrongs: ['Hurricane', 'Tempest', 'Cyclone'], antWrongs: ['Gentle wind', 'Draft', 'Air current'], ctxSentence: 'A cool ___ blew across the river, easing the summer heat.' },
  { word: 'Acrimony', bn: 'কটুতা / তিক্ত শত্রুতা', syn: 'Bitterness', ant: 'Harmony', synWrongs: ['Goodwill', 'Kindness', 'Warmth'], antWrongs: ['Rancor', 'Animus', 'Hostility'], ctxSentence: 'Medical ethics committees mediate disputes without personal ___.' },
  { word: 'Apocryphal', bn: 'অপ্রমাণিত / সন্দেহজনক সত্যতাযুক্ত', syn: 'Dubious', ant: 'Authentic', synWrongs: ['Verified', 'Proven', 'Genuine'], antWrongs: ['Fictitious', 'Unverified', 'Spurious'], ctxSentence: 'Tales of miracle cures from single herbs are mostly ___.' },
  { word: 'Belie', bn: 'মিথ্যা প্রতিপন্ন করা / আড়াল করা', syn: 'Contradict', ant: 'Confirm', synWrongs: ['Corroborate', 'Validate', 'Prove'], antWrongs: ['Disguise', 'Misrepresent', 'Negate'], ctxSentence: 'His calm expression seemed to ___ the severe pain he was enduring.' },
  { word: 'Bombastic', bn: 'আড়ম্বরপূর্ণ কিন্তু অন্তঃসারশূন্য', syn: 'Pompous', ant: 'Unassuming', synWrongs: ['Simple', 'Modest', 'Plainspoken'], antWrongs: ['Grandiloquent', 'Pretentious', 'Inflated'], ctxSentence: 'Clear medical consent forms avoid ___ jargon.' },
  { word: 'Circumvent', bn: 'কৌশলে এড়িয়ে যাওয়া', syn: 'Bypass', ant: 'Confront', synWrongs: ['Face', 'Obey', 'Follow'], antWrongs: ['Evade', 'Sidestep', 'Elude'], ctxSentence: 'Resistant bacteria develop enzymes to ___ penicillin action.' },
  { word: 'Conundrum', bn: 'জটিল ধাঁধা বা সমস্যা', syn: 'Enigma', ant: 'Clarification', synWrongs: ['Solution', 'Certainty', 'Simplicity'], antWrongs: ['Riddle', 'Puzzle', 'Dilemma'], ctxSentence: 'Fever of unknown origin often poses a diagnostic ___.' },
  { word: 'Diaphanous', bn: 'অতি পাতলা ও স্বচ্ছ', syn: 'Translucent', ant: 'Opaque', synWrongs: ['Dense', 'Thick', 'Cloudy'], antWrongs: ['Sheer', 'Gossamer', 'Delicate'], ctxSentence: 'Under the microscope, the ___ wing membrane revealed fine veins.' },
  { word: 'Equanimity', bn: 'মানসিক ধৈর্য ও স্থিরতা', syn: 'Composure', ant: 'Agitation', synWrongs: ['Panic', 'Anxiety', 'Hysteria'], antWrongs: ['Serenity', 'Poise', 'Calmness'], ctxSentence: 'Delivering difficult news requires both empathy and ___.' },
  { word: 'Eschew', bn: 'সচেতনভাবে পরিহার করা', syn: 'Abstain from', ant: 'Indulge in', synWrongs: ['Embrace', 'Adopt', 'Pursue'], antWrongs: ['Shun', 'Avoid', 'Forgo'], ctxSentence: 'Patients with gout should ___ high-purine organ meats.' },
  { word: 'Exigency', bn: 'জরুরি অবস্থা বা প্রয়োজন', syn: 'Urgency', ant: 'Triviality', synWrongs: ['Leisure', 'Comfort', 'Luxury'], antWrongs: ['Crisis', 'Emergency', 'Necessity'], ctxSentence: 'Triage nurses allocate beds according to clinical ___.' },
  { word: 'Fastidious', bn: 'অতি খুঁতখুঁতে ও পরিচ্ছন্নতাপ্রিয়', syn: 'Meticulous', ant: 'Sloppy', synWrongs: ['Careless', 'Negligent', 'Untidy'], antWrongs: ['Fussy', 'Particular', 'Punctilious'], ctxSentence: 'Certain bacteria are ___ and require enriched culture media to grow.' },
];

interface SpellPair {
  correct: string;
  wrongs: [string, string, string];
  meaning: string;
}

const SPELLING_DRILLS_L: SpellPair[] = [
  { correct: 'Questionnaire', wrongs: ['Questionaire', 'Questionnair', 'Questioneer'], meaning: 'প্রশ্নাবলি' },
  { correct: 'Millennium', wrongs: ['Millenium', 'Milennium', 'Millenneum'], meaning: 'সহস্রাব্দ' },
  { correct: 'Bureaucracy', wrongs: ['Bureaucrasy', 'Beurocracy', 'Bureucracy'], meaning: 'আমলাতন্ত্র' },
  { correct: 'Conscientious', wrongs: ['Consciencious', 'Consientious', 'Conscientous'], meaning: 'বিবেকবান / যত্নশীল' },
  { correct: 'Maintenance', wrongs: ['Maintainance', 'Maintanance', 'Maintenence'], meaning: 'রক্ষণাবেক্ষণ' },
  { correct: 'Occurrence', wrongs: ['Occurence', 'Ocurrence', 'Occurrance'], meaning: 'ঘটনা' },
  { correct: 'Perseverance', wrongs: ['Perseverence', 'Perserverance', 'Perseveranse'], meaning: 'অধ্যবসায়' },
  { correct: 'Privilege', wrongs: ['Priviledge', 'Privilage', 'Previlage'], meaning: 'বিশেষ অধিকার' },
  { correct: 'Receive', wrongs: ['Recieve', 'Receeve', 'Recive'], meaning: 'গ্রহণ করা' },
  { correct: 'Recommend', wrongs: ['Reccommend', 'Recomend', 'Recommand'], meaning: 'সুপারিশ করা' },
  { correct: 'Restaurant', wrongs: ['Resturant', 'Restaurent', 'Restorant'], meaning: 'রেস্তোরাঁ' },
  { correct: 'Rhythm', wrongs: ['Rythm', 'Rhythem', 'Rhithm'], meaning: 'ছন্দ বা তাল' },
  { correct: 'Separate', wrongs: ['Seperate', 'Seperete', 'Separete'], meaning: 'পৃথক করা' },
  { correct: 'Supersede', wrongs: ['Supercede', 'Supersedeed', 'Superceed'], meaning: 'স্থান দখল করা' },
  { correct: 'Vacuum', wrongs: ['Vaccum', 'Vacume', 'Vacum'], meaning: 'শূন্যস্থান' },
  { correct: 'Surveillance', wrongs: ['Surveilance', 'Survellance', 'Survaillance'], meaning: 'নজরদারি' },
  { correct: 'Hemoglobin', wrongs: ['Heamoglobin', 'Hemogloben', 'Hemaglobin'], meaning: 'হিমোগ্লোবিন (US)' },
  { correct: 'Pneumonia', wrongs: ['Newmonia', 'Pnuemonia', 'Pneumonea'], meaning: 'নিউমোনিয়া' },
  { correct: 'Diarrhoea', wrongs: ['Diarhoea', 'Diarrhia', 'Diarohea'], meaning: 'ডায়রিয়া / উদরাময় (UK)' },
  { correct: 'Haemorrhage', wrongs: ['Hemorrhagee', 'Haemorhage', 'Hemorhage'], meaning: 'রক্তক্ষরণ (UK)' },
  { correct: 'Anaesthesia', wrongs: ['Anesthesiaa', 'Anaesthecia', 'Anasthesia'], meaning: 'অজ্ঞান করার প্রক্রিয়া (UK)' },
  { correct: 'Asphyxia', wrongs: ['Asphixia', 'Asphyxsia', 'Aspyxia'], meaning: 'শ্বাসরোধ' },
  { correct: 'Appendicitis', wrongs: ['Apendicitis', 'Appendisitis', 'Appendicitus'], meaning: 'অ্যাপেনডিসাইটিস' },
  { correct: 'Arrhythmia', wrongs: ['Arhythmia', 'Arrhithmia', 'Arythmia'], meaning: 'অনিয়মিত হৃৎস্পন্দন' },
  { correct: 'Asymptomatic', wrongs: ['Asymtomatic', 'Asymptometic', 'Assymptomatic'], meaning: 'উপসর্গহীন' },
  { correct: 'Bacteriophage', wrongs: ['Bacteriofage', 'Bacteriopage', 'Bactereophage'], meaning: 'ব্যাকটেরিওফাজ' },
  { correct: 'Carcinogen', wrongs: ['Carsinogen', 'Carcinogene', 'Carcenogen'], meaning: 'ক্যান্সার সৃষ্টিকারী উপাদান' },
  { correct: 'Cerebellum', wrongs: ['Cerebelum', 'Ceribellum', 'Cerebellam'], meaning: 'সেরিবেলাম (লঘু মস্তিষ্ক)' },
  { correct: 'Cholesterol', wrongs: ['Cholestrol', 'Colesterol', 'Cholesteral'], meaning: 'কোলেস্টেরল' },
  { correct: 'Chromosome', wrongs: ['Chromozome', 'Cromosome', 'Chromosom'], meaning: 'ক্রোমোজোম' },
  { correct: 'Coagulation', wrongs: ['Coagullation', 'Coaguletion', 'Cougulation'], meaning: 'রক্ত জমাট বাঁধা' },
  { correct: 'Contagious', wrongs: ['Contagous', 'Contageous', 'Contagius'], meaning: 'ছোঁয়াচে' },
  { correct: 'Dialysis', wrongs: ['Dialisis', 'Dyalysis', 'Dialysys'], meaning: 'ডায়ালাইসিস' },
  { correct: 'Duodenum', wrongs: ['Duedenum', 'Duodinum', 'Duodenam'], meaning: 'ডিওডেনাম' },
  { correct: 'Endoscope', wrongs: ['Endascope', 'Endoskope', 'Endoscop'], meaning: 'এন্ডোস্কোপ' },
  { correct: 'Epiglottis', wrongs: ['Epiglotis', 'Epiglattis', 'Eppiglottis'], meaning: 'উপজিহ্বা' },
  { correct: 'Erythropoietin', wrongs: ['Erythropoitin', 'Erythropoeitin', 'Erithropoietin'], meaning: 'এরিথ্রোপয়েটিন হরমোন' },
  { correct: 'Gallbladder', wrongs: ['Gallblader', 'Galbladder', 'Gallbladdar'], meaning: 'পিত্তথলি' },
  { correct: 'Glycogen', wrongs: ['Glycogenne', 'Glicogen', 'Glycozen'], meaning: 'গ্লাইকোজেন' },
  { correct: 'Gynaecology', wrongs: ['Gyneacology', 'Gynacology', 'Gynaecologi'], meaning: 'স্ত্রীরোগ বিদ্যা (UK)' },
  { correct: 'Hypoglycemia', wrongs: ['Hypoglicemia', 'Hypoglysemia', 'Hypoglycaema'], meaning: 'রক্তে শর্করা হ্রাস' },
  { correct: 'Immunology', wrongs: ['Imunology', 'Immunalogy', 'Immuniology'], meaning: 'ইমিউনোলজি' },
  { correct: 'Inoculation', wrongs: ['Innoculation', 'Inoculasion', 'Inoculaton'], meaning: 'টিকা প্রয়োগ' },
  { correct: 'Jaundice', wrongs: ['Jaundise', 'Jondice', 'Jawndice'], meaning: 'জন্ডিস / পাণ্ডুরোগ' },
  { correct: 'Leukaemia', wrongs: ['Leukemiaa', 'Luekaemia', 'Leukaemea'], meaning: 'লিউকেমিয়া (UK)' },
  { correct: 'Lymphocyte', wrongs: ['Limphocyte', 'Lymphocite', 'Lymphosyte'], meaning: 'লিম্ফোসাইট' },
  { correct: 'Meningitis', wrongs: ['Meningites', 'Menengitis', 'Meningitus'], meaning: 'মেনিনজাইটিস' },
  { correct: 'Metabolism', wrongs: ['Metabolizm', 'Metabolysm', 'Matabolism'], meaning: 'বিপাক ক্রিয়া' },
  { correct: 'Morphology', wrongs: ['Morfolozy', 'Morphalogy', 'Morfology'], meaning: 'অঙ্গসংস্থানবিদ্যা' },
  { correct: 'Myelinated', wrongs: ['Myelineted', 'Mielinated', 'Myelinatted'], meaning: 'মায়েলিন আবরণযুক্ত' },
  { correct: 'Oesophagus', wrongs: ['Oesofagus', 'Esophagas', 'Oesophagas'], meaning: 'অন্ননালি (UK)' },
  { correct: 'Ophthalmologist', wrongs: ['Opthalmologist', 'Ophthalmologyst', 'Ophtalmologist'], meaning: 'চক্ষু বিশেষজ্ঞ' },
  { correct: 'Paediatrician', wrongs: ['Pediatrican', 'Paediatrican', 'Paedatrician'], meaning: 'শিশু চিকিৎসক (UK)' },
  { correct: 'Paralysis', wrongs: ['Paralisis', 'Paralycis', 'Paralisys'], meaning: 'পক্ষাঘাত' },
  { correct: 'Pathogen', wrongs: ['Pathogene', 'Pathegen', 'Pathojan'], meaning: 'রোগজীবাণু' },
  { correct: 'Peristalsis', wrongs: ['Peristalcis', 'Peristalsys', 'Peristalisis'], meaning: 'পেরিস্ট্যালসিস' },
  { correct: 'Pharmacology', wrongs: ['Farmacology', 'Pharmacalogy', 'Pharmocology'], meaning: 'ওষুধ বিজ্ঞান' },
  { correct: 'Physiology', wrongs: ['Fysiology', 'Physiolgy', 'Physialogy'], meaning: 'শারীরবৃত্ত' },
  { correct: 'Platelet', wrongs: ['Platlet', 'Platelate', 'Platelette'], meaning: 'অণুচক্রিকা' },
  { correct: 'Prognosis', wrongs: ['Prognocis', 'Prognosys', 'Pragnosis'], meaning: 'রোগের পূর্বাভাস' },
  { correct: 'Psychiatrist', wrongs: ['Sychiatrist', 'Psychatrist', 'Psychiatryst'], meaning: 'মনোরোগ বিশেষজ্ঞ' },
  { correct: 'Quarantine', wrongs: ['Quarentine', 'Quaranteen', 'Quarantene'], meaning: 'সঙ্গনিরোধ' },
  { correct: 'Respiration', wrongs: ['Respiretion', 'Respirasion', 'Resperiation'], meaning: 'শ্বসন' },
  { correct: 'Rheumatism', wrongs: ['Rhematism', 'Rheumatizm', 'Reumatism'], meaning: 'বাতরোগ' },
  { correct: 'Sanatorium', wrongs: ['Sanaterium', 'Sanatoreum', 'Sannatorium'], meaning: 'স্বাস্থ্যনিবাস' },
  { correct: 'Stethoscope', wrongs: ['Stethascope', 'Stethoskope', 'Stethescope'], meaning: 'স্টেথোস্কোপ' },
  { correct: 'Susceptible', wrongs: ['Susceptable', 'Suceptible', 'Susseptible'], meaning: 'সংবেদনশীল / আক্রান্তপ্রবণ' },
  { correct: 'Symptom', wrongs: ['Symtom', 'Symptome', 'Simptom'], meaning: 'রোগের উপসর্গ' },
  { correct: 'Therapeutic', wrongs: ['Theraputic', 'Therapautic', 'Therapeautic'], meaning: 'চিকিৎসাসংক্রান্ত' },
  { correct: 'Thrombosis', wrongs: ['Thrombocis', 'Trombosis', 'Thrombosys'], meaning: 'রক্তনালিতে রক্তজমাট' },
  { correct: 'Tuberculosis', wrongs: ['Tuberkulosis', 'Tuberculocis', 'Tubercullosis'], meaning: 'যক্ষ্মা রোগ' },
  { correct: 'Vaccination', wrongs: ['Vacination', 'Vaccinasion', 'Vacsination'], meaning: 'টিকাদান' },
  { correct: 'Vertebrate', wrongs: ['Vertibrate', 'Vertebrete', 'Vertebratte'], meaning: 'মেরুদণ্ডী প্রাণী' },
  { correct: 'Embarrassment', wrongs: ['Embarassment', 'Embarrasment', 'Embarasment'], meaning: 'বিব্রতকর অবস্থা' },
  { correct: 'Accommodate', wrongs: ['Acommodate', 'Accomodate', 'Acomodate'], meaning: 'স্থান সংকুলান করা' },
  { correct: 'Possession', wrongs: ['Posession', 'Possesion', 'Posesion'], meaning: 'দখল বা মালিকানা' },
  { correct: 'Committee', wrongs: ['Comittee', 'Commitee', 'Comitee'], meaning: 'সমিতি বা পরিষদ' },
  { correct: 'Guarantee', wrongs: ['Garantee', 'Guarentee', 'Guaranty'], meaning: 'নিশ্চয়তা দেওয়া' },
  { correct: 'Lieutenant', wrongs: ['Leutenant', 'Lieutenent', 'Liutenant'], meaning: 'লেফটেন্যান্ট' },
  { correct: 'Cigarette', wrongs: ['Cigarrette', 'Cigaret', 'Cigarete'], meaning: 'সিগারেট' },
];

export function buildEngStructuredL(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `eng_l_${String(seq++).padStart(4, '0')}`;

  // 1. 120 Vocab × 3 angles = 360 MCQs
  VOCAB_BANK_L.forEach((v, idx) => {
    const diff = idx % 3 === 0 ? 'medical' : idx % 3 === 1 ? 'dental' : 'board';

    // Angle 1: Synonym
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: diff,
        question: `Choose the closest SYNONYM of the word "${v.word}" (${v.bn}):`,
        correct: v.syn,
        distractors: v.synWrongs,
        explanation: `"${v.word}" অর্থ ${v.bn}, যার নিকটতম সমার্থক শব্দ হলো "${v.syn}" (বিপরীতার্থক: "${v.ant}")।`,
        reference: 'Medical English · High-Yield Vocabulary (P–Z & A–F)',
      })
    );

    // Angle 2: Antonym
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: diff,
        question: `Select the most appropriate ANTONYM of "${v.word}":`,
        correct: v.ant,
        distractors: v.antWrongs,
        explanation: `"${v.word}" (${v.bn})-এর সঠিক বিপরীতার্থক শব্দ হলো "${v.ant}"।`,
        reference: 'Medical English · Antonym Mastery',
      })
    );

    // Angle 3: Contextual Cloze
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'medical',
        question: `Complete the sentence with the most fitting word: "${v.ctxSentence}"`,
        correct: v.word,
        distractors: [
          VOCAB_BANK_L[(idx + 7) % VOCAB_BANK_L.length].word,
          VOCAB_BANK_L[(idx + 19) % VOCAB_BANK_L.length].word,
          VOCAB_BANK_L[(idx + 37) % VOCAB_BANK_L.length].word,
        ],
        explanation: `বাক্যের প্রাসঙ্গিক অর্থ অনুযায়ী এখানে "${v.word}" (${v.bn}) শব্দটিই সর্বাপেক্ষা উপযুক্ত।`,
        reference: 'Medical English · Contextual Usage',
      })
    );
  });

  // 2. 80 Spellings × 2 angles = 160 MCQs
  SPELLING_DRILLS_L.forEach((s, idx) => {
    const diff = idx % 2 === 0 ? 'medical' : 'dental';

    // Angle 1: Find correctly spelt word
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: diff,
        question: `Identify the CORRECTLY spelt word meaning "${s.meaning}":`,
        correct: s.correct,
        distractors: s.wrongs,
        explanation: `প্রমিত ইংরেজি বানান হলো "${s.correct}" (${s.meaning})।`,
        reference: 'Medical English · Orthography & Spelling',
      })
    );

    // Angle 2: Spot misspelled word
    const correctNeighbours = [
      SPELLING_DRILLS_L[(idx + 5) % SPELLING_DRILLS_L.length].correct,
      SPELLING_DRILLS_L[(idx + 11) % SPELLING_DRILLS_L.length].correct,
      SPELLING_DRILLS_L[(idx + 23) % SPELLING_DRILLS_L.length].correct,
    ];
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_vocab_prep',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: diff,
        question: `Which of the following four words is MISSPELT (বানান ভুল)? [Hint: ${s.meaning}]`,
        correct: s.wrongs[0],
        distractors: correctNeighbours,
        explanation: `"${s.wrongs[0]}" বানানটি অশুদ্ধ; সঠিক বানান হবে "${s.correct}" (${s.meaning})। বাকি শব্দগুলোর বানান প্রমিত ও নির্ভুল।`,
        reference: 'Medical English · Error Spotting in Spelling',
      })
    );
  });

  return list;
}
