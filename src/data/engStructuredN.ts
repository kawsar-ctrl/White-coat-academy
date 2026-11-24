import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

// 1. 75 Word-Class Transformations, Foreign Plurals, Genders & Collective Nouns (× 2 = 150 MCQs)
const MORPH_DERIV_N: Array<{
  kind: 'Verb Form' | 'Noun Form' | 'Adjective Form' | 'Plural' | 'Gender' | 'Collective';
  base: string;
  target: string;
  wrongs: [string, string, string];
  note: string;
}> = [
  { kind: 'Verb Form', base: 'Beauty', target: 'Beautify', wrongs: ['Beautiful', 'Beautician', 'Beauteous'], note: 'Noun "Beauty"-এর Verb রূপ হলো "Beautify"।' },
  { kind: 'Verb Form', base: 'Brief', target: 'Abbreviate / Brief', wrongs: ['Briefness', 'Brevity', 'Briefly'], note: 'সংক্ষিপ্ত করা অর্থে Verb হলো "Brief" বা "Abbreviate"।' },
  { kind: 'Verb Form', base: 'Courage', target: 'Encourage', wrongs: ['Courageous', 'Courageously', 'Encouragement'], note: 'Prefix "en-" যোগে Noun "Courage" থেকে Verb "Encourage" হয়।' },
  { kind: 'Verb Form', base: 'Danger', target: 'Endanger', wrongs: ['Dangerous', 'Dangerously', 'Endangerment'], note: 'Prefix "en-" যোগে Verb হলো "Endanger"।' },
  { kind: 'Verb Form', base: 'Friend', target: 'Befriend', wrongs: ['Friendly', 'Friendship', 'Friendliness'], note: 'Prefix "be-" যুক্ত হয়ে Noun "Friend" থেকে Verb "Befriend" হয়।' },
  { kind: 'Verb Form', base: 'Fool', target: 'Befool', wrongs: ['Foolish', 'Foolishly', 'Foolishness'], note: 'বোকা বানানো অর্থে Verb হলো "Befool"।' },
  { kind: 'Verb Form', base: 'Glory', target: 'Glorify', wrongs: ['Glorious', 'Gloriously', 'Glorification'], note: 'Suffix "-ify" যোগে Verb "Glorify" গঠিত হয়।' },
  { kind: 'Verb Form', base: 'Horror', target: 'Horrify', wrongs: ['Horrible', 'Horrific', 'Horrifyingly'], note: 'Noun "Horror"-এর Verb রূপ হলো "Horrify"।' },
  { kind: 'Verb Form', base: 'Justice', target: 'Justify', wrongs: ['Just', 'Justly', 'Justification'], note: 'ন্যায্যতা প্রমাণ করা অর্থে Verb "Justify"।' },
  { kind: 'Verb Form', base: 'Large', target: 'Enlarge', wrongs: ['Largely', 'Largeness', 'Enlargement'], note: 'Adjective "Large"-এর Verb হলো "Enlarge"।' },
  { kind: 'Verb Form', base: 'Little', target: 'Belittle', wrongs: ['Littleness', 'Least', 'Less'], note: 'তুচ্ছ করা অর্থে Verb হলো "Belittle"।' },
  { kind: 'Verb Form', base: 'Memory', target: 'Memorize', wrongs: ['Memorable', 'Memorial', 'Memorably'], note: 'Suffix "-ize" যুক্ত হয়ে Verb "Memorize" হয়।' },
  { kind: 'Verb Form', base: 'Pure', target: 'Purify', wrongs: ['Purity', 'Purely', 'Purification'], note: 'বিশুদ্ধ করা অর্থে Verb "Purify"।' },
  { kind: 'Verb Form', base: 'Rich', target: 'Enrich', wrongs: ['Richness', 'Richly', 'Enrichment'], note: 'সমৃদ্ধ করা অর্থে Verb "Enrich"।' },
  { kind: 'Verb Form', base: 'Simple', target: 'Simplify', wrongs: ['Simplicity', 'Simply', 'Simplification'], note: 'সহজ করা অর্থে Verb "Simplify"।' },
  { kind: 'Verb Form', base: 'Sure', target: 'Ensure', wrongs: ['Surely', 'Surety', 'Assurance'], note: 'নিশ্চিত করা অর্থে Verb হলো "Ensure"।' },
  { kind: 'Verb Form', base: 'Vital', target: 'Vitalize', wrongs: ['Vitality', 'Vitally', 'Vitalness'], note: 'প্রাণবন্ত বা সজীব করা অর্থে Verb "Vitalize"।' },
  { kind: 'Verb Form', base: 'Weak', target: 'Weaken', wrongs: ['Weakness', 'Weakly', 'Weakling'], note: 'Suffix "-en" যুক্ত হয়ে Adjective "Weak" থেকে Verb "Weaken" হয়।' },
  { kind: 'Noun Form', base: 'Refuse', target: 'Refusal', wrongs: ['Refusing', 'Refutable', 'Refusely'], note: 'Verb "Refuse"-এর Noun রূপ হলো "Refusal"।' },
  { kind: 'Noun Form', base: 'Accept', target: 'Acceptance', wrongs: ['Acceptable', 'Acceptably', 'Accepting'], note: 'Verb "Accept"-এর Noun রূপ হলো "Acceptance"।' },
  { kind: 'Noun Form', base: 'Admit', target: 'Admission', wrongs: ['Admissible', 'Admittedly', 'Admissive'], note: 'ভর্তি বা স্বীকার অর্থে Noun হলো "Admission"।' },
  { kind: 'Noun Form', base: 'Compel', target: 'Compulsion', wrongs: ['Compelling', 'Compulsory', 'Compulsively'], note: 'বাধ্যবাধকতা অর্থে Noun হলো "Compulsion"।' },
  { kind: 'Noun Form', base: 'Defer', target: 'Deference', wrongs: ['Deferential', 'Deferring', 'Differently'], note: 'শ্রদ্ধা বা বশ্যতা অর্থে Noun "Deference"।' },
  { kind: 'Noun Form', base: 'Destroy', target: 'Destruction', wrongs: ['Destructive', 'Destroyed', 'Destructively'], note: 'Verb "Destroy"-এর Noun হলো "Destruction"।' },
  { kind: 'Noun Form', base: 'Endure', target: 'Endurance', wrongs: ['Endurable', 'Enduring', 'Endured'], note: 'সহনশীলতা অর্থে Noun হলো "Endurance"।' },
  { kind: 'Noun Form', base: 'Fly', target: 'Flight', wrongs: ['Flying', 'Flyer', 'Flew'], note: 'উড্ডয়ন অর্থে Verb "Fly"-এর Abstract Noun হলো "Flight"।' },
  { kind: 'Noun Form', base: 'Lose', target: 'Loss', wrongs: ['Loose', 'Loosen', 'Losing'], note: 'ক্ষতি বা হারানো অর্থে Noun হলো "Loss" (আর Loose হলো Adjective)।' },
  { kind: 'Noun Form', base: 'Maintain', target: 'Maintenance', wrongs: ['Maintainable', 'Maintaining', 'Maintained'], note: 'Verb "Maintain"-এর সঠিক বানানযুক্ত Noun হলো "Maintenance"।' },
  { kind: 'Noun Form', base: 'Please', target: 'Pleasure', wrongs: ['Pleasant', 'Pleasing', 'Pleasantly'], note: 'Verb "Please"-এর Noun হলো "Pleasure"।' },
  { kind: 'Noun Form', base: 'Repeat', target: 'Repetition', wrongs: ['Repetitive', 'Repeatedly', 'Repeatable'], note: 'পুনরাবৃত্তি অর্থে Noun হলো "Repetition"।' },
  { kind: 'Noun Form', base: 'Signify', target: 'Significance', wrongs: ['Significant', 'Significantly', 'Signifying'], note: 'তাৎপর্য অর্থে Noun হলো "Significance"।' },
  { kind: 'Noun Form', base: 'True', target: 'Truth', wrongs: ['Truly', 'Truthful', 'Truism'], note: 'Adjective "True"-এর মূল Abstract Noun হলো "Truth"।' },
  { kind: 'Noun Form', base: 'Waste', target: 'Wastage', wrongs: ['Wasteful', 'Wasting', 'Wastefully'], note: 'অপচয় অর্থে Noun "Wastage" বা "Waste"।' },
  { kind: 'Adjective Form', base: 'Heart', target: 'Hearty / Cardiac', wrongs: ['Hearten', 'Heartily', 'Heartlessness'], note: 'Heart-এর Adjective "Hearty / Heartfelt" এবং মেডিকেল Adjective হলো "Cardiac"।' },
  { kind: 'Adjective Form', base: 'Liver', target: 'Hepatic', wrongs: ['Lively', 'Livid', 'Renal'], note: 'যকৃত বা লিভার সম্পর্কিত ল্যাটিন/মেডিকেল Adjective হলো "Hepatic"।' },
  { kind: 'Adjective Form', base: 'Kidney', target: 'Renal', wrongs: ['Pulmonary', 'Gastric', 'Cerebral'], note: 'বৃক্ক বা কিডনি সম্পর্কিত মেডিকেল Adjective হলো "Renal"।' },
  { kind: 'Adjective Form', base: 'Lung', target: 'Pulmonary', wrongs: ['Cardiac', 'Hepatic', 'Ocular'], note: 'ফুসফুস সম্পর্কিত মেডিকেল Adjective হলো "Pulmonary"।' },
  { kind: 'Adjective Form', base: 'Eye', target: 'Ocular', wrongs: ['Oral', 'Aural', 'Nasal'], note: 'চোখ সম্পর্কিত মেডিকেল Adjective "Ocular" (কান = Aural, নাক = Nasal)।' },
  { kind: 'Adjective Form', base: 'Bone', target: 'Osseous', wrongs: ['Cutaneous', 'Vascular', 'Gastric'], note: 'অস্থি বা হাড় সম্পর্কিত Adjective হলো "Osseous"।' },
  { kind: 'Adjective Form', base: 'Skin', target: 'Cutaneous', wrongs: ['Osseous', 'Renal', 'Hepatic'], note: 'ত্বক বা চর্ম সম্পর্কিত Adjective হলো "Cutaneous / Dermal"।' },
  { kind: 'Adjective Form', base: 'Stomach', target: 'Gastric', wrongs: ['Hepatic', 'Cardiac', 'Dermal'], note: 'পাকস্থলী সম্পর্কিত মেডিকেল Adjective "Gastric"।' },
  { kind: 'Adjective Form', base: 'Blood', target: 'Sanguine / Hematologic', wrongs: ['Bony', 'Aural', 'Tactile'], note: 'রক্ত সম্পর্কিত বিশেষণ "Hematologic" বা "Sanguine" (সাহিত্যিক)।' },
  { kind: 'Adjective Form', base: 'Brain', target: 'Cerebral', wrongs: ['Cervical', 'Spinal', 'Vertebral'], note: 'মস্তিষ্ক সম্পর্কিত Adjective হলো "Cerebral"।' },
  { kind: 'Adjective Form', base: 'Mouth', target: 'Oral', wrongs: ['Aural', 'Ocular', 'Nasal'], note: 'মুখগহ্বর সম্পর্কিত Adjective হলো "Oral" (কান = Aural)।' },
  { kind: 'Adjective Form', base: 'Neck', target: 'Cervical', wrongs: ['Cranial', 'Lumbar', 'Thoracic'], note: 'ঘাড় বা গ্রীবা সম্পর্কিত মেডিকেল Adjective হলো "Cervical"।' },
  { kind: 'Adjective Form', base: 'Rib', target: 'Costal', wrongs: ['Renal', 'Nasal', 'Dental'], note: 'পর্শুকা বা পাঁজরের হাড় সম্পর্কিত Adjective হলো "Costal" (যেমন Intercostal)।' },
  { kind: 'Adjective Form', base: 'People', target: 'Populous', wrongs: ['Popularize', 'Population', 'Populace'], note: 'জনবহুল অর্থে "People"-এর Adjective হলো "Populous"।' },
  { kind: 'Adjective Form', base: 'Friend', target: 'Friendly', wrongs: ['Friendship', 'Befriend', 'Friendliness'], note: '"Friend" (Noun) + "-ly" = Adjective ("Friendly"), Adverb নয়!' },
  { kind: 'Adjective Form', base: 'Coward', target: 'Cowardly', wrongs: ['Cowardice', 'Cowardliness', 'Cowardness'], note: '"Coward" (Noun) + "-ly" = Adjective ("Cowardly")।' },
  { kind: 'Adjective Form', base: 'Miser', target: 'Miserly', wrongs: ['Miserliness', 'Misery', 'Miserable'], note: '"Miser" (Noun = কৃপণ ব্যক্তি) + "-ly" = Adjective ("Miserly")।' },
  { kind: 'Plural', base: 'Larva', target: 'Larvae', wrongs: ['Larvas', 'Larvum', 'Larvi'], note: 'ল্যাটিন -a শেষে থাকা জীববিজ্ঞানের শব্দে Plural -ae হয় (Larvae)।' },
  { kind: 'Plural', base: 'Alga', target: 'Algae', wrongs: ['Algas', 'Algi', 'Algaes'], note: 'শৈবাল: Alga (একবচন) → Algae (বহুবচন)।' },
  { kind: 'Plural', base: 'Pupil (eye/student)', target: 'Pupils', wrongs: ['Pupilae', 'Pupili', 'Pupiles'], note: 'Pupil-এর প্রমিত Plural হলো "Pupils"।' },
  { kind: 'Plural', base: 'Stigma', target: 'Stigmata', wrongs: ['Stigmas', 'Stigmi', 'Stigmae'], note: 'গর্ভমুণ্ড বা কলঙ্ক চিহ্ন: Stigma → Stigmata (অথবা Stigmas)।' },
  { kind: 'Plural', base: 'Stoma', target: 'Stomata', wrongs: ['Stomas', 'Stomi', 'Stomatae'], note: 'পত্ররন্ধ্র: Stoma (একবচন) → Stomata (বহুবচন)।' },
  { kind: 'Plural', base: 'Schema', target: 'Schemata', wrongs: ['Schemas', 'Schemi', 'Schemae'], note: 'গ্রিক -ma থেকে -mata হয় (Schema → Schemata)।' },
  { kind: 'Plural', base: 'Myocardium', target: 'Myocardia', wrongs: ['Myocardiums', 'Myocardii', 'Myocardiae'], note: '-um থেকে -a হয়ে Plural "Myocardia" হয়।' },
  { kind: 'Plural', base: 'Villus', target: 'Villi', wrongs: ['Villuses', 'Villa', 'Villes'], note: 'ক্ষুদ্রান্ত্রের ভিলাস: Villus (একবচন) → Villi (বহুবচন)।' },
  { kind: 'Plural', base: 'Alveolus', target: 'Alveoli', wrongs: ['Alveoluses', 'Alveola', 'Alveoles'], note: 'ফুসফুসের বায়ুথলি: Alveolus → Alveoli।' },
  { kind: 'Plural', base: 'Glomerulus', target: 'Glomeruli', wrongs: ['Glomeruluses', 'Glomerula', 'Glomerulies'], note: 'নেফ্রনের অংশ: Glomerulus → Glomeruli।' },
  { kind: 'Plural', base: 'Thrombus', target: 'Thrombi', wrongs: ['Thrombuses', 'Thromba', 'Thrombii'], note: 'রক্তজমাট: Thrombus → Thrombi।' },
  { kind: 'Plural', base: 'Embolus', target: 'Emboli', wrongs: ['Emboluses', 'Embola', 'Embolies'], note: 'ভাসমান রক্তপিন্ড: Embolus → Emboli।' },
  { kind: 'Plural', base: 'Meniscus', target: 'Menisci', wrongs: ['Meniscuses', 'Menisca', 'Menisces'], note: 'তরুণাস্থি বা তরলের বাঁকা তল: Meniscus → Menisci।' },
  { kind: 'Plural', base: 'Larynx', target: 'Larynges', wrongs: ['Larynxes', 'Laryngx', 'Larynga'], note: 'স্বরযন্ত্র: Larynx → Larynges (গ্রিক মূল)।' },
  { kind: 'Plural', base: 'Thorax', target: 'Thoraces', wrongs: ['Thoraxen', 'Thoraxi', 'Thora'], note: 'বক্ষগহ্বর: Thorax → Thoraces (বা Thoraxes)।' },
  { kind: 'Gender', base: 'Executor', target: 'Executrix', wrongs: ['Executorss', 'Executoress', 'Executress'], note: 'ল্যাটিন -tor থেকে স্ত্রীলিঙ্গে -trix হয় (Executor → Executrix)।' },
  { kind: 'Gender', base: 'Administrator', target: 'Administratrix', wrongs: ['Administress', 'Administratoress', 'Administrix'], note: 'Administrator → Administratrix।' },
  { kind: 'Gender', base: 'Wizard', target: 'Witch', wrongs: ['Wizardess', 'Sorcer', 'Magician'], note: 'পুংলিঙ্গ Wizard-এর বিপরীত স্ত্রীলিঙ্গ শব্দ হলো "Witch"।' },
  { kind: 'Gender', base: 'Monk', target: 'Nun', wrongs: ['Monkess', 'Priests', 'Abbot'], note: 'সন্ন্যাসী (Monk) → সন্ন্যাসিনী (Nun)।' },
  { kind: 'Gender', base: 'Bachelor', target: 'Spinster / Maid', wrongs: ['Bacheloress', 'Widow', 'Bride'], note: 'অবিবাহিত পুরুষ (Bachelor) → অবিবাহিত নারী (Spinster / Maid)।' },
  { kind: 'Gender', base: 'Boar', target: 'Sow', wrongs: ['Boaress', 'Mare', 'Ewe'], note: 'পুরুষ শূকর (Boar) → স্ত্রী শূকর (Sow)।' },
  { kind: 'Gender', base: 'Ram', target: 'Ewe', wrongs: ['Doe', 'Mare', 'Vixen'], note: 'পুরুষ ভেড়া (Ram) → স্ত্রী ভেড়া (Ewe)।' },
  { kind: 'Gender', base: 'Fox', target: 'Vixen', wrongs: ['Foxess', 'She-fox', 'Mare'], note: 'পুংলিঙ্গ Fox-এর স্বতন্ত্র স্ত্রীলিঙ্গ রূপ "Vixen"।' },
  { kind: 'Gender', base: 'Gander', target: 'Goose', wrongs: ['Gosling', 'Duck', 'Swan'], note: 'পুরুষ রাজহাঁস (Gander) → স্ত্রী রাজহাঁস (Goose)।' },
  { kind: 'Collective', base: 'A pack of', target: 'Wolves / Hounds', wrongs: ['Lions', 'Fish', 'Crows'], note: 'নেকড়ে বা শিকারি কুকুরের দলকে "Pack" বলে।' },
];

// 2. 65 Verbal Analogies (Medical, Science & Academic) (× 2 = 130 MCQs)
const ANALOGY_BANK_N: Array<{ a: string; b: string; c: string; d: string; wrongs: [string, string, string]; rel: string }> = [
  { a: 'Cardiology', b: 'Heart', c: 'Pulmonology', d: 'Lungs', wrongs: ['Kidneys', 'Liver', 'Brain'], rel: 'বিজ্ঞানের শাখা ও সংশ্লিষ্ট অঙ্গ' },
  { a: 'Nephritis', b: 'Kidney', c: 'Hepatitis', d: 'Liver', wrongs: ['Spleen', 'Heart', 'Pancreas'], rel: '-itis প্রদাহ ও আক্রান্ত অঙ্গ' },
  { a: 'Myopia', b: 'Near-sightedness', c: 'Hypermetropia', d: 'Far-sightedness', wrongs: ['Color blindness', 'Night blindness', 'Double vision'], rel: 'দৃষ্টিত্রুটি ও তার প্রকৃতি' },
  { a: 'Insulin', b: 'Pancreas', c: 'Thyroxine', d: 'Thyroid gland', wrongs: ['Adrenal gland', 'Pituitary gland', 'Liver'], rel: 'হরমোন ও ক্ষরণকারী গ্রন্থি' },
  { a: 'Erythrocyte', b: 'Red blood cell', c: 'Leukocyte', d: 'White blood cell', wrongs: ['Platelet', 'Plasma protein', 'Nerve cell'], rel: 'বৈজ্ঞানিক নাম ও প্রচলিত নাম' },
  { a: 'Thrombocyte', b: 'Clotting', c: 'Hemoglobin', d: 'Oxygen transport', wrongs: ['Antibody formation', 'Insulin storage', 'Bile secretion'], rel: 'রক্তের উপাদান ও প্রধান কাজ' },
  { a: 'Otoscope', b: 'Ear', c: 'Ophthalmoscope', d: 'Eye', wrongs: ['Throat', 'Stomach', 'Heart'], rel: 'রোগ নির্ণয়ের যন্ত্র ও পরীক্ষিত অঙ্গ' },
  { a: 'Sphygmomanometer', b: 'Blood pressure', c: 'Thermometer', d: 'Temperature', wrongs: ['Pulse rate', 'Respiration', 'Glucose level'], rel: 'পরিমাপক যন্ত্র ও পরিমিত রাশি' },
  { a: 'Anemia', b: 'Iron', c: 'Goiter', d: 'Iodine', wrongs: ['Calcium', 'Sodium', 'Potassium'], rel: 'রোগ ও ঘাটতিজনিত খনিজ' },
  { a: 'Beriberi', b: 'Vitamin B1', c: 'Pellagra', d: 'Vitamin B3 (Niacin)', wrongs: ['Vitamin A', 'Vitamin K', 'Vitamin E'], rel: 'অভাবজনিত রোগ ও ভিটামিন' },
  { a: 'Plasmodium', b: 'Malaria', c: 'Vibrio cholerae', d: 'Cholera', wrongs: ['Typhoid', 'Dengue', 'Tuberculosis'], rel: 'জীবাণু ও সৃষ্ট রোগ' },
  { a: 'Aedes aegypti', b: 'Dengue', c: 'Anopheles', d: 'Malaria', wrongs: ['Kala-azar', 'Plague', 'Sleeping sickness'], rel: 'বাহক মশা ও সৃষ্ট রোগ' },
  { a: 'Sandfly', b: 'Kala-azar', c: 'Tsetse fly', d: 'Sleeping sickness', wrongs: ['Yellow fever', 'Chikungunya', 'Anthrax'], rel: 'পতঙ্গ বাহক ও সৃষ্ট রোগ' },
  { a: 'Antibiotic', b: 'Bacteria', c: 'Antifungal', d: 'Fungi', wrongs: ['Viruses', 'Protozoa', 'Helminths'], rel: 'ওষুধের শ্রেণি ও লক্ষ্যবস্তু জীবাণু' },
  { a: 'Analgesic', b: 'Pain', c: 'Antipyretic', d: 'Fever', wrongs: ['Infection', 'Swelling', 'Vomiting'], rel: 'ওষুধের শ্রেণি ও প্রশমিত উপসর্গ' },
  { a: 'Antiemetic', b: 'Vomiting', c: 'Anticoagulant', d: 'Blood clotting', wrongs: ['High blood pressure', 'Allergy', 'Cough'], rel: 'ওষুধ ও প্রতিরোধকৃত প্রক্রিয়া' },
  { a: 'Tendon', b: 'Muscle to Bone', c: 'Ligament', d: 'Bone to Bone', wrongs: ['Skin to Muscle', 'Nerve to Muscle', 'Cartilage to Vein'], rel: 'যোজক টিস্যু ও সংযুক্ত কাঠামো' },
  { a: 'Xylem', b: 'Water transport', c: 'Phloem', d: 'Food transport', wrongs: ['Photosynthesis', 'Pollination', 'Respiration'], rel: 'উদ্ভিদ পরিবহন টিস্যু ও কাজ' },
  { a: 'Mitochondria', b: 'ATP synthesis', c: 'Ribosome', d: 'Protein synthesis', wrongs: ['Lipid digestion', 'Cell division', 'Osmoregulation'], rel: 'কোষীয় অঙ্গাণু ও প্রধান জৈবিক কাজ' },
  { a: 'Lysosome', b: 'Intracellular digestion', c: 'Golgi apparatus', d: 'Packaging & secretion', wrongs: ['DNA replication', 'Photosynthesis', 'Oxygen release'], rel: 'কোষ অঙ্গাণু ও ক্রিয়া' },
  { a: 'Synapse', b: 'Neurons', c: 'Alveolus', d: 'Gas exchange', wrongs: ['Hormone secretion', 'Blood filtration', 'Urine storage'], rel: 'কাঠামো ও সংযোগ/কাজ' },
  { a: 'Bile', b: 'Gallbladder', c: 'Urine', d: 'Urinary bladder', wrongs: ['Kidney cortex', 'Stomach', 'Spleen'], rel: 'তরল পদার্থ ও সঞ্চয়ী থলি' },
  { a: 'Amylase', b: 'Starch', c: 'Lipase', d: 'Lipids / Fats', wrongs: ['Proteins', 'Nucleic acids', 'Cellulose'], rel: 'পরিপাক এনজাইম ও পরিপাককৃত খাদ্য' },
  { a: 'Pepsin', b: 'Proteins', c: 'Lactase', d: 'Lactose', wrongs: ['Maltose', 'Sucrose', 'Glycogen'], rel: 'এনজাইম ও সাবস্ট্রেট' },
  { a: 'Systole', b: 'Contraction', c: 'Diastole', d: 'Relaxation', wrongs: ['Occlusion', 'Inflammation', 'Calcification'], rel: 'হৃৎচক্রের দশা ও প্রকৃতি' },
  { a: 'Apnea', b: 'Breathing stoppage', c: 'Dysphagia', d: 'Difficulty swallowing', wrongs: ['Loss of smell', 'Double vision', 'Rapid pulse'], rel: 'ক্লিনিক্যাল পদ ও অর্থ' },
  { a: 'Anosmia', b: 'Smell', c: 'Ageusia', d: 'Taste', wrongs: ['Sight', 'Hearing', 'Touch'], rel: 'সংবেদন হারানোর পরিভাষা ও ইন্দ্রিয়' },
  { a: 'Microscope', b: 'Minute organisms', c: 'Telescope', d: 'Distant stars', wrongs: ['Ocean depths', 'Internal organs', 'Sound waves'], rel: 'দৃষ্টিসহায়ক যন্ত্র ও পর্যবেক্ষণ বস্তু' },
  { a: 'Lexicographer', b: 'Dictionary', c: 'Cartographer', d: 'Map', wrongs: ['Blueprint', 'Biography', 'Calendar'], rel: 'পেশাজীবী ও নির্মিত সৃষ্টি' },
  { a: 'Numismatist', b: 'Coins', c: 'Philatelist', d: 'Postage stamps', wrongs: ['Rare books', 'Fossils', 'Paintings'], rel: 'সংগ্রাহক ও সংগ্রহের বস্তু' },
  { a: 'Ornithologist', b: 'Birds', c: 'Entomologist', d: 'Insects', wrongs: ['Reptiles', 'Fishes', 'Mammals'], rel: 'বিজ্ঞানী ও গবেষণার প্রাণীগোষ্ঠী' },
  { a: 'Ichthyologist', b: 'Fishes', c: 'Herpetologist', d: 'Reptiles & Amphibians', wrongs: ['Birds', 'Insects', 'Worms'], rel: 'প্রাণীবিজ্ঞান বিশেষজ্ঞ ও অধ্যয়ন ক্ষেত্র' },
  { a: 'Botany', b: 'Plants', c: 'Mycology', d: 'Fungi', wrongs: ['Bacteria', 'Viruses', 'Algae'], rel: 'জীববিজ্ঞানের শাখা ও অধ্যয়ন বস্তু' },
  { a: 'Geriatrics', b: 'Elderly', c: 'Obstetrics', d: 'Childbirth & Pregnancy', wrongs: ['Skin disorders', 'Mental illness', 'Eye surgery'], rel: 'চিকিৎসা শাখা ও লক্ষ্যগোষ্ঠী' },
  { a: 'Autopsy', b: 'Deceased body', c: 'Biopsy', d: 'Living tissue', wrongs: ['Dried fossil', 'X-ray plate', 'Soil sample'], rel: 'পরীক্ষা ও নমুনার উৎস' },
  { a: 'Vaccine', b: 'Prevention', c: 'Antivenom', d: 'Snakebite neutralization', wrongs: ['Bacterial fever', 'Bone fracture', 'Vitamin deficiency'], rel: 'চিকিৎসা উপায় ও উদ্দেশ্য' },
  { a: 'Incubator', b: 'Premature infant', c: 'Ventilator', d: 'Respiratory failure', wrongs: ['Kidney stone', 'Skin burn', 'Hearing loss'], rel: 'হাসপাতাল যন্ত্র ও সহায়তা' },
  { a: 'Loquacious', b: 'Talkative', c: 'Taciturn', d: 'Silent', wrongs: ['Boastful', 'Angry', 'Clumsy'], rel: 'সমার্থক শব্দজোড়ের সম্পর্ক' },
  { a: 'Ephemeral', b: 'Permanent', c: 'Mitigate', d: 'Aggravate', wrongs: ['Alleviate', 'Pacify', 'Soothe'], rel: 'বিপরীতার্থক শব্দজোড় (Antonyms)' },
  { a: 'Candid', b: 'Frank', c: 'Clandestine', d: 'Secret', wrongs: ['Open', 'Transparent', 'Public'], rel: 'সমার্থক সম্পর্ক' },
  { a: 'Cacophony', b: 'Discordant sound', c: 'Euphony', d: 'Pleasant sound', wrongs: ['Bright light', 'Sweet aroma', 'Soft texture'], rel: 'বিপরীতার্থক ধ্বনিগুণ' },
  { a: 'Obfuscate', b: 'Confuse', c: 'Elucidate', d: 'Clarify', wrongs: ['Complicate', 'Conceal', 'Distort'], rel: 'ক্রিয়া ও তার প্রত্যক্ষ ফল' },
  { a: 'Altruist', b: 'Unselfishness', c: 'Miser', d: 'Avarice', wrongs: ['Generosity', 'Charity', 'Courage'], rel: 'ব্যক্তির ধরন ও চরিত্রগত গুণ' },
  { a: 'Panacea', b: 'All diseases', c: 'Omniscient', d: 'All knowledge', wrongs: ['All wealth', 'All oceans', 'All languages'], rel: 'Pan-/Omni- সর্বব্যাপী পরিভাষা' },
  { a: 'Prodigal', b: 'Wasteful', c: 'Frugal', d: 'Economical', wrongs: ['Extravagant', 'Lavish', 'Greedy'], rel: 'সমার্থক গুণাবলি' },
  { a: 'Zenith', b: 'Nadir', c: 'Pinnacle', d: 'Abyss', wrongs: ['Summit', 'Peak', 'Crest'], rel: 'সর্বোচ্চ ও সর্বনিম্ন বিন্দু' },
  { a: 'Acumen', b: 'Sharp insight', c: 'Obtuseness', d: 'Mental dullness', wrongs: ['Wisdom', 'Wit', 'Genius'], rel: 'বুদ্ধিবৃত্তিক অবস্থা ও অর্থ' },
  { a: 'Synecdoche', b: 'Part for whole', c: 'Euphemism', d: 'Mild substitute phrase', wrongs: ['Direct insult', 'Wild exaggeration', 'Bitter sarcasm'], rel: 'সাহিত্যিক অলংকার ও সংজ্ঞা' },
  { a: 'Elegy', b: 'Lamentation', c: 'Satire', d: 'Ridicule of folly', wrongs: ['Heroic war tale', 'Romantic sonnet', 'Religious hymn'], rel: 'সাহিত্যরূপ ও মূল সুর' },
  { a: 'Sonnet', b: 'Fourteen lines', c: 'Haiku', d: 'Three lines', wrongs: ['Ten lines', 'Twenty lines', 'Twelve lines'], rel: 'কবিতার রূপ ও পঙ্‌ক্তি সংখ্যা' },
  { a: 'Protagonist', b: 'Hero / Central figure', c: 'Antagonist', d: 'Opposing force', wrongs: ['Narrator', 'Comic relief', 'Chorus'], rel: 'নাটকের চরিত্র-বৈপরীত্য' },
  { a: 'Archipelago', b: 'Islands', c: 'Constellation', d: 'Stars', wrongs: ['Mountains', 'Rivers', 'Forests'], rel: 'সমষ্টিবাচক পদ ও একক উপাদান' },
  { a: 'Apiary', b: 'Bees', c: 'Aviary', d: 'Birds', wrongs: ['Fishes', 'Lions', 'Horses'], rel: 'প্রাণী সংরক্ষণের স্থান' },
  { a: 'Aquarium', b: 'Fish', c: 'Terrarium', d: 'Land plants/reptiles', wrongs: ['Eagles', 'Whales', 'Sharks'], rel: 'কৃত্রিম আবাসস্থল ও প্রাণী/উদ্ভিদ' },
  { a: 'Chronometer', b: 'Accurate time', c: 'Barometer', d: 'Atmospheric pressure', wrongs: ['Wind speed', 'Humidity', 'Earthquake wave'], rel: 'বৈজ্ঞানিক যন্ত্র ও পরিমিত বিষয়' },
  { a: 'Anemometer', b: 'Wind velocity', c: 'Hygrometer', d: 'Humidity', wrongs: ['Rainfall', 'Altitude', 'Solar radiation'], rel: 'আবহাওয়া যন্ত্র ও পরিমাপ' },
  { a: 'Seismograph', b: 'Earthquakes', c: 'Electrocardiograph', d: 'Heart electrical activity', wrongs: ['Brain waves', 'Lung volume', 'Muscle reflex'], rel: 'লেখচিত্র যন্ত্র ও উৎস' },
  { a: 'Crescendo', b: 'Gradual increase', c: 'Diminuendo', d: 'Gradual decrease', wrongs: ['Sudden stop', 'Constant pitch', 'Chaotic noise'], rel: 'সঙ্গীত ও গতির ক্রমহ্রাস-বৃদ্ধি' },
  { a: 'Drought', b: 'Lack of rain', c: 'Famine', d: 'Lack of food', wrongs: ['Excessive flood', 'Heavy snowfall', 'Volcanic ash'], rel: 'দুর্যোগ ও তার মৌলিক অভাব' },
  { a: 'Quench', b: 'Thirst', c: 'Satiate', d: 'Hunger', wrongs: ['Fatigue', 'Anger', 'Fever'], rel: 'নিবৃত্ত করা ও মৌলিক চাহিদা' },
  { a: 'Placate', b: 'Anger', c: 'Assuage', d: 'Pain / Grief', wrongs: ['Ignorance', 'Hunger', 'Wealth'], rel: 'প্রশমিত করা ও সংশ্লিষ্ট আবেগ' },
  { a: 'Ambiguous', b: 'Clarity', c: 'Turbulent', d: 'Serenity', wrongs: ['Storm', 'Motion', 'Noise'], rel: 'বিশেষণ ও যার অভাব রয়েছে' },
  { a: 'Glutton', b: 'Food', c: 'Bibliophile', d: 'Books', wrongs: ['Weapons', 'Gems', 'Maps'], rel: 'ব্যক্তি ও তার প্রবল আসক্তির বস্তু' },
  { a: 'Nocturnal', b: 'Night', c: 'Diurnal', d: 'Day', wrongs: ['Winter', 'Autumn', 'Twilight'], rel: 'সক্রিয়তার সময় ও পরিভাষা' },
  { a: 'Herbivore', b: 'Plants', c: 'Carnivore', d: 'Flesh / Meat', wrongs: ['Insects only', 'Minerals', 'Wood'], rel: 'খাদ্যাভ্যাস ও খাদ্যদ্রব্য' },
];

// 3. 75 Literature Works/Quotes, Rhetoric & Bengali-English Translations (× 3 = 225 MCQs)
interface LitTransItem {
  kind: 'Literature' | 'Rhetoric' | 'Translation';
  q1: string;
  a1: string;
  w1: [string, string, string];
  q2: string;
  a2: string;
  w2: [string, string, string];
  q3: string;
  a3: string;
  w3: [string, string, string];
  exp: string;
}

const LIT_TRANS_BANK_N: LitTransItem[] = [
  {
    kind: 'Literature',
    q1: 'Who wrote the tragic play "Doctor Faustus"?', a1: 'Christopher Marlowe', w1: ['Ben Jonson', 'John Webster', 'Thomas Kyd'],
    q2: 'To which literary period does Christopher Marlowe belong?', a2: 'Elizabethan Renaissance', w2: ['Victorian Age', 'Romantic Period', 'Modern Age'],
    q3: 'What is the central theme of Marlowe’s "Doctor Faustus"?', a3: 'Selling one’s soul for boundless knowledge and power', w3: ['A sea voyage around Africa', 'Conflict between factory workers', 'A rural love triangle'],
    exp: 'Christopher Marlowe (1564–1593) এলিজাবেথীয় যুগের অন্যতম শ্রেষ্ঠ নাট্যকার, যাঁর "Doctor Faustus" ট্র্যাজেডিতে অসীম জ্ঞান ও ক্ষমতার লোভে আত্মা বিক্রির কাহিনি চিত্রিত হয়েছে।'
  },
  {
    kind: 'Literature',
    q1: 'Who authored the famous comedy "Volpone" and "The Alchemist"?', a1: 'Ben Jonson', w1: ['John Dryden', 'Oscar Wilde', 'William Congreve'],
    q2: 'For which dramatic style is Ben Jonson best known?', a2: 'Comedy of Humours', w2: ['Absurd Drama', 'Kitchen Sink Drama', 'Poetic Tragedy'],
    q3: 'Complete Ben Jonson’s tribute to Shakespeare: "He was not of an age, but ___."', a3: 'for all time', w3: ['for England alone', 'for royal courts', 'for one season'],
    exp: 'Ben Jonson "Comedy of Humours"-এর প্রবক্তা এবং শেক্সপিয়র সম্পর্কে তাঁর বিখ্যাত উক্তি "He was not of an age, but for all time!"।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the Metaphysical poem "The Sun Rising" and "A Valediction: Forbidding Mourning"?', a1: 'John Donne', w1: ['Andrew Marvell', 'George Herbert', 'Henry Vaughan'],
    q2: 'What poetic feature characterizes John Donne’s Metaphysical style?', a2: 'Far-fetched intellectual conceits (e.g., stiff twin compasses)', w2: ['Simple nursery rhymes', 'Blank verse pastoral dialogues', 'Epic battle catalogs'],
    q3: 'Which prose sermon of John Donne contains "No man is an island"?', a3: 'Meditation XVII', w3: ['Areopagitica', 'Of Studies', 'Utopia'],
    exp: 'John Donne Metaphysical Poetry-র পথিকৃৎ; তাঁর প্রসিদ্ধ উক্তি "No man is an island" এবং কম্পাসের উপমা (conceit) বিখ্যাত।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Songs of Innocence and of Experience" (including "The Tyger" and "The Lamb")?', a1: 'William Blake', w1: ['P. B. Shelley', 'Samuel Taylor Coleridge', 'Robert Burns'],
    q2: 'Why is William Blake considered a precursor of the Romantic Movement?', a2: 'He championed imagination, childhood wonder, and social justice', w2: ['He wrote strict heroic couplets only', 'He mocked natural scenery', 'He wrote solely in Latin'],
    q3: 'In Blake’s symbolism, "The Lamb" and "The Tyger" contrast what pair?', a3: 'Innocence/Meekness vs. Experience/Fierce Energy', w3: ['Winter vs. Summer', 'Science vs. Medicine', 'Kings vs. Soldiers'],
    exp: 'William Blake (1757–1827) ছিলেন একাধারে কবি ও চিত্রকর; "The Lamb" (Innocence) ও "The Tyger" (Experience) তাঁর কালজয়ী সৃষ্টি।'
  },
  {
    kind: 'Literature',
    q1: 'Who composed the famous dramatic monologues "My Last Duchess" and "Andrea del Sarto"?', a1: 'Robert Browning', w1: ['Alfred Tennyson', 'Matthew Arnold', 'W. H. Auden'],
    q2: 'What is the defining feature of Robert Browning’s "Dramatic Monologue"?', a2: 'A single speaker reveals character at a critical moment to a silent listener', w2: ['Two actors arguing loudly on stage', 'A fourteen-line sonnet about roses', 'A chorus singing in Latin'],
    q3: 'During which literary era did Robert Browning write?', a3: 'Victorian Period', w3: ['Anglo-Saxon Period', 'Augustan Age', 'Postmodern Era'],
    exp: 'Victorian কবি Robert Browning Dramatic Monologue-এর শ্রেষ্ঠ রূপকার।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "In Memoriam", "Ulysses", and "The Charge of the Light Brigade"?', a1: 'Alfred, Lord Tennyson', w1: ['Thomas Hardy', 'Gerard Manley Hopkins', 'John Keats'],
    q2: 'Which official title did Queen Victoria confer upon Alfred Tennyson in 1850?', a2: 'Poet Laureate', w2: ['Archbishop', 'Chancellor', 'Prime Minister'],
    q3: 'Which inspiring closing line concludes Tennyson’s poem "Ulysses"?', a3: 'To strive, to seek, to find, and not to yield.', w3: ['Beauty is truth, truth beauty.', 'Things fall apart; the centre cannot hold.', 'Water, water, every where.'],
    exp: 'Poet Laureate Alfred Tennyson-এর "Ulysses" কবিতার শেষ লাইন "To strive, to seek, to find, and not to yield" অত্যন্ত প্রেরণাদায়ক।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the tragic Victorian novel "The Mayor of Casterbridge" and "Far from the Madding Crowd"?', a1: 'Thomas Hardy', w1: ['Charles Dickens', 'George Eliot', 'William Thackeray'],
    q2: 'What fictional English region forms the backdrop of Thomas Hardy’s novels?', a2: 'Wessex', w2: ['Yoknapatawpha', 'Malgudi', 'Camelot'],
    q3: 'What philosophical outlook pervades Thomas Hardy’s tragic works?', a3: 'Fatalism / Pessimistic irony of fate', w3: ['Blind utopian optimism', 'Lighthearted farce', 'Absurd comedy'],
    exp: 'Thomas Hardy তাঁর Wessex অঞ্চলকে ঘিরে লেখা ট্র্যাজিক উপন্যাস ও অদৃষ্টবাদী (Fatalistic) দৃষ্টিভঙ্গির জন্য খ্যাত।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Importance of Being Earnest" and "The Picture of Dorian Gray"?', a1: 'Oscar Wilde', w1: ['G. B. Shaw', 'Harold Pinter', 'Samuel Beckett'],
    q2: 'Which literary movement was Oscar Wilde closely associated with?', a2: 'Aestheticism ("Art for art’s sake")', w2: ['Naturalism', 'Existentialism', 'Transcendentalism'],
    q3: 'What kind of play is "The Importance of Being Earnest"?', a3: 'Comedy of Manners / Farce', w3: ['Historical Tragedy', 'Epic Verse Drama', 'Morality Play'],
    exp: 'আইরিশ লেখক Oscar Wilde তীক্ষ্ণ রসবোধ ও "Art for art’s sake" নান্দনিকতাবাদের জন্য বিখ্যাত।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Sailing to Byzantium", "The Second Coming", and "Easter, 1916"?', a1: 'W. B. Yeats', w1: ['T. S. Eliot', 'Ezra Pound', 'Dylan Thomas'],
    q2: 'In which year did W. B. Yeats win the Nobel Prize in Literature?', a2: '1923', w2: ['1913', '1948', '1954'],
    q3: 'Which iconic line opens the crisis in Yeats’s "The Second Coming"?', a3: 'Things fall apart; the centre cannot hold.', w3: ['I am the master of my fate.', 'Do not go gentle into that good night.', 'April is the cruellest month.'],
    exp: 'আয়ারল্যান্ডের কবি W. B. Yeats ১৯২৩ সালে সাহিত্যে নোবেল পুরস্কার পান এবং গীতাঞ্জলির ইংরেজি অনুবাদের ভূমিকা লেখেন।'
  },
  {
    kind: 'Literature',
    q1: 'Who authored "Heart of Darkness" (set along the Congo River)?', a1: 'Joseph Conrad', w1: ['Rudyard Kipling', 'Graham Greene', 'D. H. Lawrence'],
    q2: 'Who is the enigmatic ivory trader at the Inner Station in "Heart of Darkness"?', a2: 'Mr. Kurtz', w2: ['Captain Ahab', 'Prospero', 'Atticus Finch'],
    q3: 'What critique lies at the heart of Joseph Conrad’s "Heart of Darkness"?', a3: 'The brutality and moral corruption of European colonialism', w3: ['Medieval feudal chivalry', 'Victorian school reform', 'Industrial steam engines'],
    exp: 'Joseph Conrad-এর "Heart of Darkness" উপনিবেশবাদের নৃশংসতা ও মানবমনের অন্ধকার দিক উন্মোচন করে।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Sons and Lovers" and "The Rainbow"?', a1: 'D. H. Lawrence', w1: ['E. M. Forster', 'Virginia Woolf', 'Aldous Huxley'],
    q2: 'Who wrote the dystopian science-fiction classic "Brave New World"?', a2: 'Aldous Huxley', w2: ['George Orwell', 'H. G. Wells', 'Ray Bradbury'],
    q3: 'Who pioneered the science-fiction genre with "The Time Machine" and "The War of the Worlds"?', a3: 'H. G. Wells', w3: ['Jules Verne', 'Arthur C. Clarke', 'Isaac Asimov'],
    exp: 'আধুনিক ইংরেজি সাহিত্যে D. H. Lawrence, Aldous Huxley (Brave New World) এবং H. G. Wells (The Time Machine) পথিকৃৎ।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the Pulitzer-winning novella "A Farewell to Arms" and "For Whom the Bell Tolls"?', a1: 'Ernest Hemingway', w1: ['F. Scott Fitzgerald', 'John Steinbeck', 'William Faulkner'],
    q2: 'Who wrote "The Great Gatsby", capturing the American Jazz Age?', a2: 'F. Scott Fitzgerald', w2: ['Mark Twain', 'Nathaniel Hawthorne', 'Edgar Allan Poe'],
    q3: 'Who wrote "The Grapes of Wrath" and won the 1962 Nobel Prize in Literature?', a3: 'John Steinbeck', w3: ['Arthur Miller', 'Toni Morrison', 'Walt Whitman'],
    exp: 'মার্কিন সাহিত্যের তিন স্তম্ভ: Ernest Hemingway, F. Scott Fitzgerald (The Great Gatsby) এবং John Steinbeck।'
  },
  {
    kind: 'Literature',
    q1: 'Who authored "The Adventures of Huckleberry Finn" and "Tom Sawyer"?', a1: 'Mark Twain', w1: ['O. Henry', 'Jack London', 'Walt Whitman'],
    q2: 'Who composed the free-verse collection "Leaves of Grass" and the elegy "O Captain! My Captain!"?', a2: 'Walt Whitman', w2: ['Robert Frost', 'Emily Dickinson', 'Langston Hughes'],
    q3: 'Who wrote "Stopping by Woods on a Snowy Evening" and "The Road Not Taken"?', a3: 'Robert Frost', w3: ['Carl Sandburg', 'Wallace Stevens', 'T. S. Eliot'],
    exp: 'Mark Twain (Huckleberry Finn), Walt Whitman (Leaves of Grass) ও Robert Frost (The Road Not Taken) মার্কিন সাহিত্যের উজ্জ্বল নক্ষত্র।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Death of a Salesman" (featuring Willy Loman)?', a1: 'Arthur Miller', w1: ['Tennessee Williams', 'Eugene O’Neill', 'Edward Albee'],
    q2: 'Who authored "A Streetcar Named Desire" and "The Glass Menagerie"?', a2: 'Tennessee Williams', w2: ['Arthur Miller', 'Samuel Beckett', 'John Osborne'],
    q3: 'Who wrote "Look Back in Anger", launching Britain’s "Angry Young Men" movement?', a3: 'John Osborne', w3: ['Harold Pinter', 'Tom Stoppard', 'Noël Coward'],
    exp: 'আধুনিক নাটকের অন্যতম প্রধান সৃষ্টি: Arthur Miller-এর "Death of a Salesman" ও John Osborne-এর "Look Back in Anger"।।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Middlemarch", considered one of the greatest Victorian novels?', a1: 'George Eliot (Mary Ann Evans)', w1: ['Charlotte Brontë', 'Elizabeth Gaskell', 'Louisa May Alcott'],
    q2: 'Who authored "Sense and Sensibility" and "Emma"?', a2: 'Jane Austen', w2: ['Mary Shelley', 'Emily Brontë', 'Virginia Woolf'],
    q3: 'Who wrote the feminist modernist essay "A Room of One’s Own" and "Mrs. Dalloway"?', a3: 'Virginia Woolf', w3: ['Katherine Mansfield', 'Sylvia Plath', 'Doris Lessing'],
    exp: 'George Eliot (Mary Ann Evans ছদ্মনামে লিখতেন), Jane Austen এবং Virginia Woolf ইংরেজি উপন্যাসকে অনন্য উচ্চতায় নিয়েছেন।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the anti-colonial epic novel "The Guide" and created the fictional town of Malgudi?', a1: 'R. K. Narayan', w1: ['Mulk Raj Anand', 'Raja Rao', 'Salman Rushdie'],
    q2: 'Who wrote "Train to Pakistan", depicting the 1947 Partition?', a2: 'Khushwant Singh', w2: ['Vikram Seth', 'Amitav Ghosh', 'Ruskin Bond'],
    q3: 'Who authored "Midnight’s Children", winner of the Booker of Bookers?', a3: 'Salman Rushdie', w3: ['Rohinton Mistry', 'Jhumpa Lahiri', 'Aravind Adiga'],
    exp: 'ভারতীয় উপমহাদেশের ইংরেজি সাহিত্যে R. K. Narayan (Malgudi), Khushwant Singh ও Salman Rushdie সুপরিচিত।'
  },
  {
    kind: 'Literature',
    q1: 'Which famous medical-turned-literary doctor created Sherlock Holmes?', a1: 'Sir Arthur Conan Doyle', w1: ['Agatha Christie', 'Anton Chekhov', 'Somerset Maugham'],
    q2: 'Which Russian physician wrote the short-story classics "Ward No. 6" and "The Cherry Orchard"?', a2: 'Anton Chekhov', w2: ['Leo Tolstoy', 'Fyodor Dostoevsky', 'Maxim Gorky'],
    q3: 'Which English poet originally trained as an apothecary-surgeon before writing "Ode to a Nightingale"?', a3: 'John Keats', w3: ['P. B. Shelley', 'William Wordsworth', 'Lord Byron'],
    exp: 'Arthur Conan Doyle, Anton Chekhov এবং কবি John Keats — তিনজনই চিকিৎসাবিদ্যায় প্রশিক্ষিত ছিলেন!'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the Greek tragedies "Oedipus Rex" and "Antigone"?', a1: 'Sophocles', w1: ['Aeschylus', 'Euripides', 'Aristophanes'],
    q2: 'Which Greek philosopher authored "Poetics", defining tragedy and catharsis?', a2: 'Aristotle', w2: ['Plato', 'Socrates', 'Herodotus'],
    q3: 'Who wrote the Renaissance political treatise "The Prince"?', a3: 'Niccolò Machiavelli', w3: ['Thomas More', 'Erasmus', 'Jean-Jacques Rousseau'],
    exp: 'Sophocles (Oedipus Rex), Aristotle (Poetics) ও Machiavelli (The Prince) বিশ্বসাহিত্য ও দর্শনের ক্লাসিক নির্মাতা।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Canterbury Tales" in Middle English?', a1: 'Geoffrey Chaucer', w1: ['John Gower', 'William Langland', 'Sir Thomas Malory'],
    q2: 'Why is Geoffrey Chaucer honored as the "Father of English Poetry"?', a2: 'He elevated the East Midland English dialect into a major literary language', w2: ['He invented the printing press', 'He wrote exclusively in French', 'He translated the Quran'],
    q3: 'Where are the pilgrims travelling in Chaucer’s "The Canterbury Tales"?', a3: 'To the shrine of Thomas Becket in Canterbury', w3: ['To Westminster Abbey', 'To Rome via Venice', 'To Jerusalem'],
    exp: 'Geoffrey Chaucer (c. 1343–1400) ইংরেজি কবিতার জনক; "The Canterbury Tales" তাঁর অমর কীর্তি।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the satirical fantasy "Animal Farm" and introduced terms like "Big Brother"?', a1: 'George Orwell', w1: ['Jonathan Swift', 'William Golding', 'Evelyn Waugh'],
    q2: 'Who wrote "Lord of the Flies", depicting stranded schoolboys descending into savagery?', a2: 'William Golding', w2: ['R. L. Stevenson', 'Daniel Defoe', 'J. M. Barrie'],
    q3: 'Who authored "Treasure Island" and "Strange Case of Dr Jekyll and Mr Hyde"?', a3: 'Robert Louis Stevenson', w3: ['Bram Stoker', 'Mary Shelley', 'Oscar Wilde'],
    exp: 'William Golding (Lord of the Flies, ১৯৮৩ নোবেলজয়ী) এবং R. L. Stevenson (Dr Jekyll and Mr Hyde) ব্রিটিশ কথাসাহিত্যে অনন্য।'
  },
  {
    kind: 'Rhetoric',
    q1: 'Identify the figure of speech: "The classroom was a zoo during recess."', a1: 'Metaphor', w1: ['Simile', 'Oxymoron', 'Alliteration'],
    q2: 'Identify the figure of speech: "His surgical precision was as sharp as a laser."', a2: 'Simile', w2: ['Metaphor', 'Personification', 'Irony'],
    q3: 'Identify the figure of speech: "The wind whispered warnings through the pine trees."', a3: 'Personification', w3: ['Hyperbole', 'Pun', 'Metonymy'],
    exp: 'Like/As ছাড়া সরাসরি তুলনা = Metaphor; Like/As সহ তুলনা = Simile; জড় বস্তুতে মানবীয় গুণ আরোপ = Personification।'
  },
  {
    kind: 'Rhetoric',
    q1: 'Identify the figure of speech: "I have told you a million times to sterilize the forceps!"', a1: 'Hyperbole', w1: ['Understatement (Litotes)', 'Euphemism', 'Onomatopoeia'],
    q2: 'Identify the figure of speech: "He passed away peacefully" (instead of "died").', a2: 'Euphemism', w2: ['Sarcasm', 'Hyperbole', 'Paradox'],
    q3: 'Identify the figure of speech: "The snake hissed, and the heart monitor beeped."', a3: 'Onomatopoeia', w3: ['Assonance', 'Metonymy', 'Allusion'],
    exp: 'অতিরঞ্জন = Hyperbole; কোমল শব্দে অপ্রিয় সত্য বলা = Euphemism; ধ্বন্যাত্মক শব্দ = Onomatopoeia।'
  },
  {
    kind: 'Rhetoric',
    q1: 'Identify the figure of speech: "This is an open secret among the ward staff."', a1: 'Oxymoron', w1: ['Simile', 'Alliteration', 'Synecdoche'],
    q2: 'Identify the figure of speech: "Less is more" or "Child is the father of the man."', a2: 'Paradox', w2: ['Climax', 'Pun', 'Apostrophe'],
    q3: 'Identify the figure of speech: "Peter Piper picked a peck of pickled peppers."', a3: 'Alliteration', w3: ['Metonymy', 'Irony', 'Litotes'],
    exp: 'পাশাপাশি দুই বিপরীত শব্দ = Oxymoron; আপাতবিরোধী গভীর সত্য বাক্য = Paradox; একই আদ্যক্ষরের পুনরাবৃত্তি = Alliteration।'
  },
  {
    kind: 'Rhetoric',
    q1: 'Identify the figure of speech: "The White House issued a statement on healthcare."', a1: 'Metonymy', w1: ['Simile', 'Oxymoron', 'Alliteration'],
    q2: 'Identify the figure of speech: "Twenty sails entered the port" (sails = entire ships).', a2: 'Synecdoche', w2: ['Hyperbole', 'Pun', 'Elegy'],
    q3: 'Identify the figure of speech: "O Death, where is thy sting?" (addressing Death directly).', a3: 'Apostrophe', w3: ['Euphemism', 'Satire', 'Assonance'],
    exp: 'সংশ্লিষ্ট অন্য নাম (White House = US Govt) = Metonymy; অংশ দিয়ে সমগ্র (Sails = Ships) = Synecdoche; অনুপস্থিত/বিমূর্তকে সম্বোধন = Apostrophe।'
  },
  {
    kind: 'Rhetoric',
    q1: 'Identify the poetic form: A 14-line lyric poem in iambic pentameter with a fixed rhyme scheme.', a1: 'Sonnet', w1: ['Ballad', 'Elegy', 'Ode'],
    q2: 'How many lines make up the Shakespearean sonnet structure?', a2: 'Three quatrains (4×3) plus a rhyming couplet (2)', w2: ['Seven couplets', 'Two septets', 'One octave and two tercets'],
    q3: 'What is "Blank Verse" in English poetry?', a3: 'Unrhymed iambic pentameter', w3: ['Poetry without any meter or rhythm', 'Humorous five-line verse', 'Acrostic stanza'],
    exp: '১৪ পঙ্‌ক্তির Sonnet-এ শেক্সপিয়ারীয় ধারায় ৩টি Quatrain + ১টি Couplet থাকে; অন্ত্যমিলহীন iambic pentameter-কে Blank Verse বলে।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "শিক্ষা জাতির মেরুদণ্ড।"', a1: 'Education is the backbone of a nation.', w1: ['Education is the head of the country.', 'Study makes backbone strong.', 'Learning builds spine for nation.'],
    q2: 'Translate into English: "পরিশ্রম সৌভাগ্যের প্রসূতি।"', a2: 'Industry is the mother of good luck.', w2: ['Hard labor gives gold.', 'Work is parent of happiness.', 'Toil brings only money.'],
    q3: 'Translate into English: "সময় ও নদীর স্রোত কারও জন্য অপেক্ষা করে না।"', a3: 'Time and tide wait for none.', w3: ['Time and river stays for nobody.', 'Clock and current stops never.', 'Time waits if tide flows.'],
    exp: 'বাংলা প্রবাদ ও চিরন্তন বাক্যের প্রমিত ইংরেজি অনুবাদ পরীক্ষায় প্রায়ই আসে।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "সে এতই দুর্বল যে হাঁটতে পারে না।"', a1: 'He is too weak to walk.', w1: ['He is very weak to walk.', 'He is so weak to walk.', 'He is weak enough not to walk.'],
    q2: 'Translate into English: "বইটি না পড়ে আমি থাকতে পারলাম না।"', a2: 'I could not help reading the book.', w2: ['I could not without reading the book.', 'I did not help to read the book.', 'I cannot but read the book yesterday.'],
    q3: 'Translate into English: "তার জ্বর হয়েছে।"', a3: 'He has caught a fever / He is running a temperature.', w3: ['He is suffering by fever.', 'A fever occurred in him.', 'He made a fever.'],
    exp: '"এতই... যে না" = too...to (অথবা so...that...cannot); "না করে পারা যায় না" (অতীত) = could not help + V-ing।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "সততা ও নৈতিকতা কোনো চিকিৎসকের শ্রেষ্ঠ অলংকার।"', a1: 'Honesty and integrity are a physician’s finest ornaments.', w1: ['Honest and moral makes good ornaments.', 'Being honesty is doctor best jewel.', 'Doctor’s ornament is truth only.'],
    q2: 'Translate into English: "ডাক্তার রোগীটিকে পরীক্ষা করে ব্যবস্থাপত্র দিলেন।"', a2: 'After examining the patient, the doctor prescribed medicine.', w2: ['The doctor looked the patient and wrote.', 'Checking patient, prescription was given by doctor.', 'Doctor saw patient for prescribing.'],
    q3: 'Translate into English: "ধূমপান স্বাস্থ্যের জন্য মারাত্মক ক্ষতিকর।"', a3: 'Smoking is fatally injurious to health.', w3: ['Smoke is harmful for healthy.', 'Smoking injures to health.', 'To smoke damages on health.'],
    exp: '"Injurious to" (Preposition "to") এবং Dangling Modifier মুক্ত "After examining..." গঠন লক্ষ্যণীয়।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "আমি গতকাল বাড়ি পৌঁছেছি।"', a1: 'I reached home yesterday.', w1: ['I have reached home yesterday.', 'I reached to home yesterday.', 'I had reach home yesterday.'],
    q2: 'Translate into English: "গত এক ঘণ্টা ধরে বিদ্যুৎ নেই।"', a2: 'There has been a power outage for the last hour.', w2: ['Electricity is absent since an hour.', 'Current went from one hour.', 'No power is here for hour.'],
    q3: 'Translate into English: "আমাদের দেশ দ্রুত এগিয়ে যাচ্ছে।"', a3: 'Our country is progressing by leaps and bounds.', w3: ['Our land walks very fastly.', 'Country goes forward hastily.', 'Bangladesh advances quickly forward.'],
    exp: '"Yesterday" থাকায় Past Indefinite (Present Perfect নয়) ও "reach"-এর পর "home"-এর আগে "to" বসে না।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "যতই পড়িবে, ততই শিখিবে।"', a1: 'The more you read, the more you learn.', w1: ['More you read, more you learn.', 'As you read much, you learn much.', 'You read more to learn more.'],
    q2: 'Translate into English: "তুমি কি তার ঠিকানা জানো?"', a2: 'Do you know where he lives / what his address is?', w2: ['Do you know where does he live?', 'Are you knowing what is his address?', 'Did you knew his living place?'],
    q3: 'Translate into English: "তাড়াতাড়ি হাঁট, পাছে তুমি ট্রেনটি হারাও।"', a3: 'Walk fast lest you should miss the train.', w3: ['Walk fast lest you will miss the train.', 'Walk fast lest you do not miss the train.', 'Hurry up so you not miss train.'],
    exp: 'Double Comparative ("The more..., the more...") এবং "lest + Sub + should + V1" গঠন পরীক্ষায় অত্যন্ত গুরুত্বপূর্ণ।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "চিকিৎসা পেশা কেবল অর্থ উপার্জনের মাধ্যম নয়, এটি মানবতার সেবা।"', a1: 'The medical profession is not merely a livelihood; it is service to humanity.', w1: ['Medicine job is only money, not help.', 'Medical is service than income.', 'Doctor work means humanitarian only.'],
    q2: 'Translate into English: "সময়মতো টিকা নিলে অনেক মরণব্যাধি এড়ানো যায়।"', a2: 'Timely vaccination can prevent many fatal diseases.', w2: ['Taking vaccine in time stops all sickness.', 'Vaccine makes death impossible.', 'If vaccinated timely, death dies.'],
    q3: 'Translate into English: "আগুনে ঘি ঢালার দরকার নেই।"', a3: 'There is no need to add fuel to the fire.', w3: ['Do not pour ghee on flame.', 'No need for ghee inside burning fire.', 'Don’t put oil on the stove.'],
    exp: 'সঠিক বাগধারা ("add fuel to the fire") ও প্রাঞ্জল বাক্যগঠন অনুবাদকে নির্ভুল করে।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "মশা ম্যালেরিয়া ও ডেঙ্গুর জীবাণু বহন করে।"', a1: 'Mosquitoes carry the pathogens of malaria and dengue.', w1: ['Mosquito brings malaria germs.', 'Mosquitoes are carrying dengue germ.', 'Malarial insects fly with dengue.'],
    q2: 'Translate into English: "রোগীটি ক্রমেই সুস্থ হয়ে উঠছে।"', a2: 'The patient is gradually recovering.', w2: ['The patient is becoming health slowly.', 'Patient recovers day by day always.', 'He is getting goodly day by day.'],
    q3: 'Translate into English: "শীতকালে বয়স্কদের নিউমোনিয়ার ঝুঁকি বাড়ে।"', a3: 'The risk of pneumonia rises among the elderly during winter.', w3: ['Winter makes old people get pneumonia risk.', 'Elders are risky of pneumonia in cold.', 'Cold brings pneumonia on olds.'],
    exp: 'সঠিক মেডিকেল শব্দের ব্যবহার: pathogen, recover, elderly, pneumonia।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into Bengali: "Prevention is better than cure, yet early diagnosis saves lives."', a1: 'প্রতিকারের চেয়ে প্রতিরোধই উত্তম, তবুও দ্রুত রোগ নির্ণয় প্রাণ বাঁচায়।', w1: ['চিকিৎসাই প্রতিরোধের চেয়ে ভালো এবং দ্রুত ওষুধ দিতে হয়।', 'রোগ নির্ণয় ছাড়া কোনো প্রতিরোধ কাজ করে না।', 'ওষুধের চেয়ে বিশ্রাম উত্তম, তাই পরীক্ষা অপ্রয়োজনীয়।'],
    q2: 'Translate into Bengali: "A stitch in time saves nine."', a2: 'সময়ের এক ফোঁড়, অসময়ের দশ ফোঁড়।', w2: ['সেলাই করতে নয়টি সুই লাগে।', 'অসময়ে কাজ করলে দ্রুত শেষ হয়।', 'সময়ের চেয়ে অর্থের মূল্য বেশি।'],
    q3: 'Translate into Bengali: "Health is not merely the absence of disease."', a3: 'স্বাস্থ্য কেবল রোগের অনুপস্থিতি নয়।', w3: ['অসুস্থতা না থাকলেই মানুষ সম্পূর্ণ সুস্থ থাকে।', 'স্বাস্থ্য বলতে শুধু শারীরিক শক্তি বোঝায়।', 'রোগ ছাড়া কোনো স্বাস্থ্য হয় না।'],
    exp: 'WHO-এর স্বাস্থ্য সংজ্ঞা ও প্রবাদবাক্যের প্রমিত বাংলা অনুবাদ।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "তুমি না আসা পর্যন্ত আমি এখানে অপেক্ষা করব।"', a1: 'I will wait here until you come back.', w1: ['I will wait here until you do not come.', 'I wait here till you will come.', 'I shall stay until you came.'],
    q2: 'Translate into English: "সে এমনভাবে কথা বলে যেন সে সব জানে।"', a2: 'He talks as if he knew everything.', w2: ['He talks as if he knows everything.', 'He spoke as if he knows all.', 'He talks like he knew everything.'],
    q3: 'Translate into English: "তিন বছর হলো আমি তাকে শেষ দেখেছি।"', a3: 'Three years have passed since I saw him last.', w3: ['Three years passed since I see him.', 'Three years have passed since I had seen him.', 'It is three years since I have seen him.'],
    exp: '"Until"-এর পর not বা will বসে না; "as if"-এর পর Past Tense (knew) বসে; "Since"-এর আগে Present Perfect হলে পরে Past Indefinite বসে।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "যদি আমি পাখি হতাম!"', a1: 'If I were a bird! / Were I a bird!', w1: ['If I was a bird!', 'If I am a bird!', 'Would I be a bird!'],
    q2: 'Translate into English: "সে অংকে কাঁচা কিন্তু জীববিজ্ঞানে দক্ষ।"', a2: 'He is weak in Mathematics but good at Biology.', w2: ['He is raw in Math but clever in Biology.', 'He is weak at Math and good in Biology.', 'He is poor of Math and skilled in Bio.'],
    q3: 'Translate into English: "আমার বন্ধু চা-এর চেয়ে কফি বেশি পছন্দ করে।"', a3: 'My friend prefers coffee to tea.', w3: ['My friend prefers coffee than tea.', 'My friend likes coffee over than tea.', 'My friend more prefers coffee than tea.'],
    exp: '"Weak in" (বিষয়ে দুর্বল), "Good at" (বিষয়ে দক্ষ), এবং "Prefer X to Y" ব্যবহারগুলো গুরুত্বপূর্ণ।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the tragic drama "Othello", featuring the villain Iago?', a1: 'William Shakespeare', w1: ['Christopher Marlowe', 'Thomas Kyd', 'John Webster'],
    q2: 'What fatal flaw ("Hamartia") leads to Othello’s downfall?', a2: 'Blind jealousy fueled by deception', w2: ['Excessive greed for gold', 'Cowardice on the battlefield', 'Refusal to marry'],
    q3: 'In Shakespearean tragedy, what does "Catharsis" mean?', a3: 'Purification or emotional release of pity and fear in the audience', w3: ['A comic wedding finale', 'Long musical intermission', 'Sudden political revolution'],
    exp: 'শেক্সপিয়রের "Othello"-তে সন্দেহ ও ঈর্ষাই (Hamartia) নায়কের পতনের মূল কারণ; দর্শকের আবেগের শোধনকে Catharsis বলে।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the novel "To the Lighthouse" using stream of consciousness?', a1: 'Virginia Woolf', w1: ['Jane Austen', 'Emily Brontë', 'Charlotte Brontë'],
    q2: 'Which modernist Irish novelist wrote "A Portrait of the Artist as a Young Man"?', a2: 'James Joyce', w2: ['W. B. Yeats', 'Samuel Beckett', 'Oscar Wilde'],
    q3: 'Which literary technique records the continuous flow of a character’s inner thoughts?', a3: 'Stream of Consciousness', w3: ['Heroic Couplet', 'Pastoral Elegy', 'Blank Verse'],
    exp: 'Virginia Woolf ও James Joyce "Stream of Consciousness" রীতিতে আধুনিক মনস্তাত্ত্বিক উপন্যাস লিখেছেন।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the dystopian novel "Fahrenheit 451" about book burning?', a1: 'Ray Bradbury', w1: ['George Orwell', 'Aldous Huxley', 'H. G. Wells'],
    q2: 'Who authored "The Catcher in the Rye" (featuring Holden Caulfield)?', a2: 'J. D. Salinger', w2: ['Ernest Hemingway', 'Jack Kerouac', 'Harper Lee'],
    q3: 'Who wrote the Pulitzer-winning novel "The Old Man and the Sea" (Santiago & the marlin)?', a3: 'Ernest Hemingway', w3: ['Herman Melville', 'John Steinbeck', 'Joseph Conrad'],
    exp: 'Ray Bradbury (Fahrenheit 451), J. D. Salinger (Catcher in the Rye) ও Hemingway বিশ্বসাহিত্যে অমর।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the Victorian novel "Oliver Twist" highlighting child labor?', a1: 'Charles Dickens', w1: ['Thomas Hardy', 'William Makepeace Thackeray', 'Anthony Trollope'],
    q2: 'Who authored "Vanity Fair", subtitled "A Novel without a Hero"?', a2: 'William Makepeace Thackeray', w2: ['Charles Dickens', 'George Eliot', 'Henry Fielding'],
    q3: 'Who wrote "Tom Jones", a cornerstone of 18th-century picaresque fiction?', a3: 'Henry Fielding', w3: ['Samuel Richardson', 'Daniel Defoe', 'Laurence Sterne'],
    exp: 'Charles Dickens (Oliver Twist), Thackeray (Vanity Fair) ও Henry Fielding (Tom Jones) ইংরেজি কথাসাহিত্যের প্রধান স্তম্ভ।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the English Romantic poem "Tintern Abbey" and "The Prelude"?', a1: 'William Wordsworth', w1: ['S. T. Coleridge', 'Lord Byron', 'John Keats'],
    q2: 'How did William Wordsworth define poetry in the Preface to "Lyrical Ballads"?', a2: 'The spontaneous overflow of powerful feelings recollected in tranquillity', w2: ['Strict logical syllogisms in Latin', 'Satirical criticism of kings', 'Cold mathematical symmetry'],
    q3: 'Who wrote the Romantic lyric "Kubla Khan" and "Christabel"?', a3: 'Samuel Taylor Coleridge', w3: ['William Blake', 'P. B. Shelley', 'John Keats'],
    exp: 'Wordsworth-কে "Poet of Nature" এবং Coleridge-কে "Poet of Supernaturalism" বলা হয়।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Adonais" (an elegy on the death of John Keats) and "Prometheus Unbound"?', a1: 'P. B. Shelley', w1: ['Lord Byron', 'William Wordsworth', 'Alfred Tennyson'],
    q2: 'Who authored the narrative poem "Don Juan" and "Childe Harold’s Pilgrimage"?', a2: 'Lord Byron', w2: ['P. B. Shelley', 'John Keats', 'Robert Southey'],
    q3: 'Which Romantic poet died of tuberculosis at age 25 in Rome, writing "La Belle Dame sans Merci"?', a3: 'John Keats', w3: ['P. B. Shelley', 'William Blake', 'Matthew Arnold'],
    exp: 'দ্বিতীয় প্রজন্মের রোমান্টিক কবিত্রয়ী: Lord Byron, P. B. Shelley ও John Keats (মাত্র ২৫ বছর বয়সে যক্ষ্মায় মারা যান)।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Rape of the Lock", a brilliant mock-heroic poem?', a1: 'Alexander Pope', w1: ['John Dryden', 'Jonathan Swift', 'Samuel Johnson'],
    q2: 'Who compiled the landmark 1755 "Dictionary of the English Language" and wrote "Rasselas"?', a2: 'Dr. Samuel Johnson', w2: ['Joseph Addison', 'Richard Steele', 'Oliver Goldsmith'],
    q3: 'Which 18th-century essayists co-founded "The Spectator" periodical?', a3: 'Joseph Addison and Richard Steele', w3: ['Francis Bacon and John Milton', 'Pope and Swift', 'Wordsworth and Coleridge'],
    exp: 'Neoclassical / Augustan Age-এ Alexander Pope, Dr. Samuel Johnson ও Addison–Steele গদ্য ও ব্যঙ্গকবিতার উৎকর্ষ সাধন করেন।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the pastoral elegy "Lycidas" and the prose defense of free speech "Areopagitica"?', a1: 'John Milton', w1: ['John Donne', 'Andrew Marvell', 'John Bunyan'],
    q2: 'Who authored the famous Christian allegory "The Pilgrim’s Progress"?', a2: 'John Bunyan', w2: ['John Milton', 'Daniel Defoe', 'Jonathan Swift'],
    q3: 'What literary age spans John Milton and John Bunyan (1649–1660 / Puritan)?', a3: 'Puritan / Commonwealth Period', w3: ['Victorian Period', 'Romantic Period', 'Modern Period'],
    exp: 'John Milton (Lycidas, Areopagitica, Paradise Lost) ও John Bunyan (The Pilgrim’s Progress) Puritan যুগের শ্রেষ্ঠ লেখক।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Pygmalion" (later adapted as "My Fair Lady") and "Saint Joan"?', a1: 'George Bernard Shaw', w1: ['Henrik Ibsen', 'Oscar Wilde', 'J. M. Synge'],
    q2: 'Who authored "A Doll’s House", pioneering modern realistic social drama?', a2: 'Henrik Ibsen', w2: ['Anton Chekhov', 'August Strindberg', 'Bertolt Brecht'],
    q3: 'Who won the 1925 Nobel Prize in Literature and championed witty "Drama of Ideas"?', a3: 'George Bernard Shaw', w3: ['John Galsworthy', 'W. B. Yeats', 'T. S. Eliot'],
    exp: 'আইরিশ নাট্যকার George Bernard Shaw (১৯২৫ নোবেল) এবং নরওয়েজিয়ান নাট্যকার Henrik Ibsen (A Doll’s House) আধুনিক নাটকের স্তম্ভ।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the Bangladeshi Liberation War classic "The Black Coat" (Eng.) / "Kalo Coat"?', a1: 'Neamat Imam', w1: ['Tahmima Anam', 'Monica Ali', 'Zia Haider Rahman'],
    q2: 'Who wrote "Brick Lane", portraying the Bangladeshi diaspora in London?', a2: 'Monica Ali', w2: ['Tahmima Anam', 'Arundhati Roy', 'Kiran Desai'],
    q3: 'Who authored "In the Light of What We Know" and won the James Tait Black Prize?', a3: 'Zia Haider Rahman', w3: ['Kaiser Haq', 'Niaz Zaman', 'Syed Manzoorul Islam'],
    exp: 'বাংলাদেশি বংশোদ্ভূত ইংরেজি ভাষার প্রখ্যাত লেখকদের মধ্যে Monica Ali (Brick Lane), Tahmima Anam ও Zia Haider Rahman উল্লেখযোগ্য।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "বিজ্ঞান আমাদের জীবনকে সহজ ও আরামদায়ক করেছে।"', a1: 'Science has made our lives easy and comfortable.', w1: ['Science makes our life comfortingly.', 'The science has done our life easy.', 'Science made our living smoothly.'],
    q2: 'Translate into English: "নিয়মিত ব্যায়াম হৃদ্‌রোগের ঝুঁকি কমায়।"', a2: 'Regular exercise reduces the risk of heart disease.', w2: ['Daily exercising falls heart disease risk.', 'Exercise regularly decreases cardiac risky.', 'Regular exercise lowers heart illness danger.'],
    q3: 'Translate into English: "পরীক্ষার হলে শান্ত থাকা অপরিহার্য।"', a3: 'Remaining calm in the exam hall is essential.', w3: ['To stay quiet inside exam is needing.', 'Calmness in exam room must.', 'Keeping silent at exam hall is vitalized.'],
    exp: 'সহজ, প্রাকৃতিক ও ব্যাকরণগতভাবে নির্ভুল ইংরেজি বাক্যগঠন অনুবাদের মূল চাবিকাঠি।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "অতিরিক্ত আত্মবিশ্বাস প্রায়ই পতনের কারণ হয়।"', a1: 'Overconfidence often leads to downfall.', w1: ['Too much confident brings falling.', 'Excessive trust causes down.', 'Overconfidence makes fall always.'],
    q2: 'Translate into English: "রোগটি দ্রুত ছড়িয়ে পড়ছে।"', a2: 'The disease is spreading rapidly.', w2: ['The illness spreads fastly now.', 'Disease is expanding quickly.', 'The sickness is breaking out fastly.'],
    q3: 'Translate into English: "স্বাস্থ্যবিধি মেনে চলাই সংক্রমণ রোধের সেরা উপায়।"', a3: 'Following hygiene rules is the best way to prevent infection.', w3: ['Obeying clean rules stops infection bestly.', 'Hygiene following is best way of stop germs.', 'To follow health rule prevent disease best.'],
    exp: '"Fast" নিজেই Adverb ("fastly" বলে কোনো শব্দ নেই); "leads to" = কারণ হওয়া।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "আমি ডাক্তার হতে চাই যাতে দরিদ্র মানুষের সেবা করতে পারি।"', a1: 'I want to become a doctor so that I can serve poor people.', w1: ['I want becoming doctor for serve poor.', 'I like to be doctor because serving poor.', 'I wish become doctor to serve poors.'],
    q2: 'Translate into English: "ধৈর্য ও অধ্যবসায় ছাড়া বড় কোনো সাফল্য আসে না।"', a2: 'No great success comes without patience and perseverance.', w2: ['Without patient and toil, no big win.', 'Success cannot come except patient.', 'Big win never comes without persevere.'],
    q3: 'Translate into English: "ভুল থেকেই মানুষ প্রকৃত শিক্ষা পায়।"', a3: 'People learn true lessons from their mistakes.', w3: ['Men get real study by wrong.', 'Mistakes teach people truly lesson.', 'From mistake man learns real learn.'],
    exp: '"Poor people" বা "the poor" বসে ("poors" অশুদ্ধ); "so that + Sub + can/may + V1" উদ্দেশ্য প্রকাশ করে।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "তুমি যত তাড়াতাড়ি চিকিৎসা নেবে, ততই ভালো।"', a1: 'The sooner you seek medical treatment, the better.', w1: ['As soon as you take medicine, it good.', 'Sooner you get doctor, better it.', 'More quickly treatment, more good.'],
    q2: 'Translate into English: "গতকাল রাতে প্রচণ্ড ঝড় বয়ে গেছে।"', a2: 'A severe storm swept through last night.', w2: ['A heavy storm blew last night ago.', 'Yesterday night big storm has passed.', 'Fierce storm occurred on last night.'],
    q3: 'Translate into English: "ডাক্তার না আসা পর্যন্ত রোগীকে সরিও না।"', a3: 'Do not move the patient until the doctor arrives.', w3: ['Don’t shift patient until doctor won’t arrive.', 'Do not move patient till doctor will come.', 'Not move patient unless doctor arrived.'],
    exp: 'প্রমিত Double Comparative ("The sooner..., the better") ও "last night" (কোনো "on" বা "ago" নয়) লক্ষ্যণীয়।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "পানি ছাড়া কোনো প্রাণী বাঁচতে পারে না।"', a1: 'No living being can survive without water.', w1: ['Without water animal cannot living.', 'No creature survive except water.', 'Any animal cannot live minus water.'],
    q2: 'Translate into English: "পরামর্শ নেওয়ার আগে ওষুধ খাওয়া উচিত নয়।"', a2: 'One should not take medicine without consulting a doctor.', w2: ['Medicine should not eat before ask doctor.', 'Don’t take drug unless doctor advised.', 'Nobody should drink pill before consult.'],
    q3: 'Translate into English: "অপরিচ্ছন্ন পরিবেশ নানা রোগের জন্ম দেয়।"', a3: 'An unhygienic environment breeds various diseases.', w3: ['Dirty surroundings born many sickness.', 'Unclean environment gives birth of illness.', 'Unhygienic place makes much diseases.'],
    exp: '"Take medicine" (ওষুধ খাওয়া অর্থে eat/drink নয়), "breed diseases" ও "various diseases" (plural) শুদ্ধ ব্যবহার।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into Bengali: "A rolling stone gathers no moss."', a1: 'অস্থির চিত্ত বা বারবার পেশা পরিবর্তনকারীর উন্নতি হয় না।', w1: ['গড়ানো পাথরে আগুন ধরে না।', 'এক জায়গায় বসে থাকলে শ্যাওলা জমে না।', 'কঠিন পাথর কখনো ভেঙে যায় না।'],
    q2: 'Translate into Bengali: "Familiarity breeds contempt."', a2: 'অতি মাখামাখিতে মান নষ্ট হয় / গেঁয়ো যোগী ভিখ পায় না।', w2: ['পরিচিত মানুষের প্রতি শ্রদ্ধা বাড়ে।', 'পরিবারেই প্রকৃত সম্মান জন্মে।', 'অচেনা মানুষ সবসময় শত্রু হয়।'],
    q3: 'Translate into Bengali: "Rome was not built in a day."', a3: 'কোনো মহৎ কাজ একদিনে সম্পন্ন হয় না।', w3: ['রোম শহর এক দিনে ধ্বংস হয়েছিল।', 'বড় শহর তৈরি করতে এক রাত লাগে।', 'ইতিহাস কখনো একদিনে লেখা যায় না।'],
    exp: 'ইংরেজি প্রবাদগুলোর প্রমিত বাংলা ভাবানুবাদ মেডিকেল ও বিশ্ববিদ্যালয় ভর্তি পরীক্ষায় নিয়মিত আসে।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into Bengali: "Look before you leap."', a1: 'ভাবিয়া করিও কাজ, করিয়া ভাবিও না।', w1: ['লাফ দেওয়ার পর নিচে তাকিও।', 'কাজ শুরু করার পর চিন্তা কর।', 'ভয় পেলে সামনে এগোবে না।'],
    q2: 'Translate into Bengali: "Where there is a will, there is a way."', a2: 'ইচ্ছা থাকলে উপায় হয়।', w2: ['উপায় থাকলে ইচ্ছা জাগে।', 'পথ ছাড়া গন্তব্যে যাওয়া যায় না।', 'অর্থ থাকলেই সব কাজ সম্ভব।'],
    q3: 'Translate into Bengali: "Slow and steady wins the race."', a3: 'ধীর ও স্থির ব্যক্তিই শেষ পর্যন্ত জয়ী হয় (অধ্যবসায়ের জয়)।', w3: ['দ্রুত দৌড়ালেই প্রতিযোগিতায় জেতা যায়।', 'ধীরে চললে সবাই পিছিয়ে পড়ে।', 'গতিহীনতা সাফল্যের মূল মন্ত্র।'],
    exp: 'প্রচলিত নীতিবাক্য ও প্রবাদের সঠিক বাংলা অনুবাদ।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into Bengali: "United we stand, divided we fall."', a1: 'একতায় উত্থান, বিভেদে পতন।', w1: ['একসাথে দাঁড়ালে সবাই পড়ে যায়।', 'আলাদা থাকলে শক্তি বাড়ে।', 'সংঘাত ছাড়া ঐক্য হয় না।'],
    q2: 'Translate into Bengali: "Make hay while the sun shines."', a2: 'সুযোগের সদ্ব্যবহার কর / ঝোপ বুঝে কোপ মার।', w2: ['রোদের মধ্যে কাজ করা উচিত নয়।', 'বর্ষাকালে খড় শুকিয়ে রাখো।', 'সূর্য ডুবলে কাজ শুরু কর।'],
    q3: 'Translate into Bengali: "Better late than never."', a3: 'একেবারে না হওয়ার চেয়ে দেরিতে হওয়াও ভালো।', w3: ['দেরি করলে কখনোই কাজ হয় না।', 'সময়ের কাজ সময়ে না করাই শ্রেয়।', 'অসময়ের চেয়ে না আসাই ভালো।'],
    exp: 'গুরুত্বপূর্ণ প্রবাদগুলোর যথাযথ বাংলা রূপান্তর।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the tragic love story "Wuthering Heights" (Heathcliff & Catherine)?', a1: 'Emily Brontë', w1: ['Charlotte Brontë', 'Anne Brontë', 'Jane Austen'],
    q2: 'Who authored "Jane Eyre", featuring the independent governess and Mr. Rochester?', a2: 'Charlotte Brontë', w2: ['Emily Brontë', 'Mary Shelley', 'George Eliot'],
    q3: 'Who wrote the modern gothic classic "Rebecca", opening with "Last night I dreamt I went to Manderley again"?', a3: 'Daphne du Maurier', w3: ['Agatha Christie', 'Virginia Woolf', 'Margaret Atwood'],
    exp: 'Brontë বোনেদের (Emily — Wuthering Heights, Charlotte — Jane Eyre) এবং Daphne du Maurier-এর উপন্যাস ইংরেজি সাহিত্যে চিরায়ত।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the classic dystopian novel "The Handmaid’s Tale"?', a1: 'Margaret Atwood', w1: ['Doris Lessing', 'Ursula K. Le Guin', 'Toni Morrison'],
    q2: 'Which African-American Nobel laureate wrote "Beloved"?', a2: 'Toni Morrison', w2: ['Maya Angelou', 'Alice Walker', 'Zora Neale Hurston'],
    q3: 'Who wrote the autobiographical poem "Still I Rise" and "I Know Why the Caged Bird Sings"?', a3: 'Maya Angelou', w3: ['Toni Morrison', 'Emily Dickinson', 'Sylvia Plath'],
    exp: 'Margaret Atwood (The Handmaid’s Tale), Toni Morrison (Beloved, ১৯৯৩ নোবেল) ও Maya Angelou সমকালীন বিশ্বসাহিত্যের উজ্জ্বল ব্যক্তিত্ব।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the epic tragedy "King Lear", with daughters Goneril, Regan, and Cordelia?', a1: 'William Shakespeare', w1: ['John Milton', 'Ben Jonson', 'John Dryden'],
    q2: 'Which Shakespearean play features Portia’s "The quality of mercy is not strain’d" speech?', a2: 'The Merchant of Venice', w2: ['Twelfth Night', 'As You Like It', 'Much Ado About Nothing'],
    q3: 'Which romantic tragedy by Shakespeare is set in Verona featuring feuding families?', a3: 'Romeo and Juliet', w3: ['Antony and Cleopatra', 'Julius Caesar', 'Coriolanus'],
    exp: 'শেক্সপিয়রের "King Lear", "The Merchant of Venice" (Portia) এবং "Romeo and Juliet" ভর্তি পরীক্ষায় সর্বাধিক আসে।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the Anglo-Saxon heroic epic poem "Beowulf"?', a1: 'Anonymous (Old English epic)', w1: ['Geoffrey Chaucer', 'Caedmon', 'King Alfred'],
    q2: 'Who is known as the "Father of English Prose" in Old English (translated Bede & Boethius)?', a2: 'King Alfred the Great', w2: ['William Tyndale', 'Francis Bacon', 'Richard Hooker'],
    q3: 'Who is recognized as the "Father of English Essays"?', a3: 'Francis Bacon', w3: ['Charles Lamb', 'William Hazlitt', 'George Orwell'],
    exp: 'Beowulf (Anonymous), King Alfred the Great (Old English Prose) ও Francis Bacon (Father of English Essays)।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Essays of Elia" (personal, nostalgic prose essays)?', a1: 'Charles Lamb', w1: ['Francis Bacon', 'Jonathan Swift', 'Samuel Johnson'],
    q2: 'Who authored "Utopia" (1516), coining the word for an ideal imaginary society?', a2: 'Sir Thomas More', w2: ['Francis Bacon', 'Thomas Hobbes', 'John Locke'],
    q3: 'Who wrote "Leviathan" (1651), famous for describing life without law as "nasty, brutish, and short"?', a3: 'Thomas Hobbes', w3: ['John Locke', 'David Hume', 'Edmund Burke'],
    exp: 'Charles Lamb (Essays of Elia), Thomas More (Utopia) ও Thomas Hobbes (Leviathan) ইংরেজি গদ্য ও রাষ্ট্রদর্শনের মাইলফলক।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the classic short story "The Necklace" (Mathilde Loisel)?', a1: 'Guy de Maupassant', w1: ['O. Henry', 'Edgar Allan Poe', 'Anton Chekhov'],
    q2: 'Who authored "The Tell-Tale Heart" and "The Raven", pioneering detective & gothic tales?', a2: 'Edgar Allan Poe', w2: ['Nathaniel Hawthorne', 'Herman Melville', 'Arthur Conan Doyle'],
    q3: 'Who wrote "The Scarlet Letter" (Hester Prynne)?', a3: 'Nathaniel Hawthorne', w3: ['Mark Twain', 'Henry James', 'Washington Irving'],
    exp: 'Maupassant (The Necklace), Edgar Allan Poe (The Raven) ও Nathaniel Hawthorne (The Scarlet Letter) ছোটগল্প ও উপন্যাসের ক্লাসিক।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Hound of the Baskervilles" and "A Study in Scarlet"?', a1: 'Sir Arthur Conan Doyle', w1: ['Agatha Christie', 'Wilkie Collins', 'G. K. Chesterton'],
    q2: 'Who is the celebrated creator of detective Hercule Poirot and "Murder on the Orient Express"?', a2: 'Agatha Christie', w2: ['Dorothy L. Sayers', 'P. D. James', 'Arthur Conan Doyle'],
    q3: 'Who wrote "The Moonstone", often called the first full-length English detective novel?', a3: 'Wilkie Collins', w3: ['Charles Dickens', 'Bram Stoker', 'Mary Shelley'],
    exp: 'গোয়েন্দা সাহিত্যে Wilkie Collins, Sir Arthur Conan Doyle (Sherlock Holmes) ও Agatha Christie (Hercule Poirot) বিশ্বখ্যাত।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Dracula" (Count Dracula in Transylvania)?', a1: 'Bram Stoker', w1: ['Mary Shelley', 'Edgar Allan Poe', 'H. P. Lovecraft'],
    q2: 'Who authored "A Clockwork Orange"?', a2: 'Anthony Burgess', w2: ['George Orwell', 'William Golding', 'Kingsley Amis'],
    q3: 'Who wrote "One Hundred Years of Solitude" (Magic Realism in Macondo)?', a3: 'Gabriel García Márquez', w3: ['Jorge Luis Borges', 'Isabel Allende', 'Mario Vargas Llosa'],
    exp: 'Bram Stoker (Dracula), Anthony Burgess ও লাতিন আমেরিকান জাদু-বাস্তবতাবাদের স্রষ্টা মার্কেজ (১৯৮২ নোবেল)।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the tragic verse play "Murder in the Cathedral" and "The Love Song of J. Alfred Prufrock"?', a1: 'T. S. Eliot', w1: ['W. B. Yeats', 'W. H. Auden', 'Ezra Pound'],
    q2: 'Which Anglo-American poet won the 1948 Nobel Prize in Literature?', a2: 'T. S. Eliot', w2: ['Ernest Hemingway', 'William Faulkner', 'Bertrand Russell'],
    q3: 'What famous opening line begins T. S. Eliot’s "The Waste Land"?', a3: 'April is the cruellest month, breeding lilacs out of the dead land.', w3: ['Let us go then, you and I.', 'The woods are lovely, dark and deep.', 'Hope is the thing with feathers.'],
    exp: 'T. S. Eliot (১৯৪৮ নোবেলজয়ী) আধুনিক ইংরেজি কবিতার সবচেয়ে প্রভাবশালী কবি ও সমালোচক।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Tempest", featuring Prospero, Miranda, Ariel, and Caliban?', a1: 'William Shakespeare', w1: ['Christopher Marlowe', 'Ben Jonson', 'John Fletcher'],
    q2: 'What famous line does Miranda utter in Act V of "The Tempest"?', a2: 'O brave new world, that has such people in’t!', w2: ['All the world’s a stage.', 'Frailty, thy name is woman!', 'Some are born great.'],
    q3: 'Which play is widely regarded as William Shakespeare’s final solo farewell drama?', a3: 'The Tempest', w3: ['Macbeth', 'Twelfth Night', 'Richard III'],
    exp: '"The Tempest" শেক্সপিয়রের শেষ একক নাটক বলে বিবেচিত; এখান থেকেই Aldous Huxley "Brave New World" নামটি নিয়েছেন।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "If—" ("If you can keep your head when all about you...") and "The Jungle Book"?', a1: 'Rudyard Kipling', w1: ['Joseph Conrad', 'E. M. Forster', 'George Orwell'],
    q2: 'In which year did Rudyard Kipling become the first English-language author to win the Nobel Prize in Literature?', a2: '1907', w2: ['1913', '1923', '1930'],
    q3: 'Which novel by E. M. Forster explores British colonial tension in Chandrapore?', a3: 'A Passage to India', w3: ['Kim', 'Burmese Days', 'Heart of Darkness'],
    exp: 'Rudyard Kipling ১৯০৭ সালে ইংরেজি সাহিত্যে প্রথম নোবেল পান; তাঁর "If—" কবিতাটি আত্মবিশ্বাস ও চরিত্র গঠনের অনন্য নিদর্শন।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Because I could not stop for Death" and "Hope is the thing with feathers"?', a1: 'Emily Dickinson', w1: ['Sylvia Plath', 'Christina Rossetti', 'Elizabeth Barrett Browning'],
    q2: 'Who composed the confessional poetry collection "Ariel" and the novel "The Bell Jar"?', a2: 'Sylvia Plath', w2: ['Emily Dickinson', 'Adrienne Rich', 'Maya Angelou'],
    q3: 'Who wrote "Sonnets from the Portuguese" ("How do I love thee? Let me count the ways")?', a3: 'Elizabeth Barrett Browning', w3: ['Christina Rossetti', 'Emily Brontë', 'Charlotte Smith'],
    exp: 'ইংরেজি ও মার্কিন কাব্যে Emily Dickinson, Elizabeth Barrett Browning ও Sylvia Plath অবিস্মরণীয়।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Faerie Queene", dedicated to Queen Elizabeth I?', a1: 'Edmund Spenser', w1: ['Sir Philip Sidney', 'Walter Raleigh', 'Michael Drayton'],
    q2: 'What unique nine-line stanza did Edmund Spenser invent in "The Faerie Queene"?', a2: 'Spenserian Stanza', w2: ['Heroic Couplet', 'Ottava Rima', 'Terza Rima'],
    q3: 'Why is Edmund Spenser often called the "Poets’ Poet"?', a3: 'His musical diction and Spenserian stanza inspired generations of later English poets', w3: ['He never published his own poems', 'He wrote only dictionaries', 'He was a medical doctor'],
    exp: 'Charles Lamb কবি Edmund Spenser-কে "The Poets’ Poet" আখ্যা দিয়েছিলেন।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the satirical essays "A Modest Proposal" and "A Tale of a Tub"?', a1: 'Jonathan Swift', w1: ['Daniel Defoe', 'Alexander Pope', 'Oliver Goldsmith'],
    q2: 'In "Gulliver’s Travels", who are the tiny six-inch people Gulliver meets first?', a2: 'Lilliputians', w2: ['Brobdingnagians', 'Yahoos', 'Houyhnhnms'],
    q3: 'In "Gulliver’s Travels", who are the wise, rational talking horses?', a3: 'Houyhnhnms', w3: ['Lilliputians', 'Laputans', 'Yahoos'],
    exp: 'Jonathan Swift-এর "Gulliver’s Travels" ইংরেজি সাহিত্যের সর্বশ্রেষ্ঠ ব্যঙ্গাত্মক (Satire) উপন্যাসগুলোর একটি।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Vicar of Wakefield" and the comedy "She Stoops to Conquer"?', a1: 'Oliver Goldsmith', w1: ['Richard Brinsley Sheridan', 'Samuel Johnson', 'Henry Fielding'],
    q2: 'Who authored the sparkling Restoration/18th-century comedy "The Rivals" (featuring Mrs. Malaprop)?', a2: 'Richard Brinsley Sheridan', w2: ['William Congreve', 'Ben Jonson', 'Oscar Wilde'],
    q3: 'What linguistic term derives from Sheridan’s comic character "Mrs. Malaprop"?', a3: 'Malapropism (humorous misuse of a similar-sounding word)', w3: ['Spoonerism', 'Oxymoron', 'Anachronism'],
    exp: 'Sheridan-এর Mrs. Malaprop চরিত্র থেকে "Malapropism" (কাছাকাছি শব্দের হাস্যকর ভুল ব্যবহার) শব্দটির উৎপত্তি।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "An Essay Concerning Human Understanding" and the "Two Treatises of Government"?', a1: 'John Locke', w1: ['Thomas Hobbes', 'Francis Bacon', 'John Stuart Mill'],
    q2: 'Who authored "On Liberty" and championed utilitarianism alongside Jeremy Bentham?', a2: 'John Stuart Mill', w2: ['Adam Smith', 'David Ricardo', 'John Locke'],
    q3: 'Who wrote "The Wealth of Nations" (1776), founding modern economics?', a3: 'Adam Smith', w3: ['John Maynard Keynes', 'Karl Marx', 'Thomas Malthus'],
    exp: 'John Locke (Tabula rasa), John Stuart Mill (On Liberty) ও Adam Smith (The Wealth of Nations) ধ্রুপদি ইংরেজি মননশীল গদ্যের নির্মাতা।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the tragic poem "The Elegy Written in a Country Churchyard"?', a1: 'Thomas Gray', w1: ['William Collins', 'Robert Burns', 'William Cowper'],
    q2: 'Complete Thomas Gray’s famous line: "Where ignorance is bliss, ___."', a2: '’tis folly to be wise', w2: ['knowledge brings wealth', 'wisdom never fades', 'truth shines brightly'],
    q3: 'Who wrote the Scottish national song "Auld Lang Syne" and "A Red, Red Rose"?', a3: 'Robert Burns', w3: ['Sir Walter Scott', 'Lord Byron', 'Robert Louis Stevenson'],
    exp: 'Transition / Pre-Romantic যুগের কবি Thomas Gray (Country Churchyard) ও স্কটল্যান্ডের জাতীয় কবি Robert Burns চিরস্মরণীয়।'
  },
  {
    kind: 'Literature',
    q1: 'Who authored the medieval knighthood romance "Le Morte d’Arthur"?', a1: 'Sir Thomas Malory', w1: ['Geoffrey Chaucer', 'Edmund Spenser', 'Sir Walter Scott'],
    q2: 'Who wrote the historical Scottish novels "Ivanhoe" and "Waverley"?', a2: 'Sir Walter Scott', w2: ['Charles Dickens', 'Thomas Hardy', 'Robert Louis Stevenson'],
    q3: 'Who wrote "The Count of Monte Cristo" and "The Three Musketeers"?', a3: 'Alexandre Dumas', w3: ['Victor Hugo', 'Honoré de Balzac', 'Gustave Flaubert'],
    exp: 'Thomas Malory (King Arthur কিংবদন্তি), Sir Walter Scott (Ivanhoe) ও Alexandre Dumas অ্যাডভেঞ্চার ও ঐতিহাসিক সাহিত্যে অমর।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the French classic "Les Misérables" (Jean Valjean)?', a1: 'Victor Hugo', w1: ['Alexandre Dumas', 'Albert Camus', 'Émile Zola'],
    q2: 'Who authored "The Stranger" (L’Étranger) and "The Plague" (La Peste)?', a2: 'Albert Camus', w2: ['Jean-Paul Sartre', 'Samuel Beckett', 'Franz Kafka'],
    q3: 'Who wrote "The Metamorphosis" (Gregor Samsa waking as a giant insect)?', a3: 'Franz Kafka', w3: ['Thomas Mann', 'Hermann Hesse', 'Fyodor Dostoevsky'],
    exp: 'বিশ্বসাহিত্যে Victor Hugo (Les Misérables), নোবেলজয়ী Albert Camus (The Plague) ও Franz Kafka (The Metamorphosis) অত্যন্ত পরিচিত।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Divine Comedy" (Inferno, Purgatorio, Paradiso)?', a1: 'Dante Alighieri', w1: ['Petrarch', 'Boccaccio', 'Virgil'],
    q2: 'Who authored the Latin epic "The Aeneid"?', a2: 'Virgil', w2: ['Homer', 'Ovid', 'Horace'],
    q3: 'Who wrote the "Decameron" and inspired Chaucer’s storytelling frame?', a3: 'Giovanni Boccaccio', w3: ['Dante Alighieri', 'Machiavelli', 'Petrarch'],
    exp: 'Dante (Divine Comedy), Virgil (Aeneid) ও Boccaccio (Decameron) ইউরোপীয় রেনেসাঁ ও ধ্রুপদি সাহিত্যের ভিত্তি।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "রোগীটি যন্ত্রণায় ছটফট করছে।"', a1: 'The patient is writhing in pain.', w1: ['The patient is jumping with hurt.', 'Patient rolls in aching.', 'He is twisting from sick.'],
    q2: 'Translate into English: "ভুল চিকিৎসা একটি গুরুতর অপরাধ।"', a2: 'Medical malpractice is a grave offense.', w2: ['Wrong medicine is heavy sin.', 'Bad treatment is big crime.', 'False doctoring is severe guilty.'],
    q3: 'Translate into English: "অতিরিক্ত অ্যান্টিবায়োটিক সেবন জীবাণুতে প্রতিরোধ গড়ে তোলে।"', a3: 'Overuse of antibiotics fosters bacterial resistance.', w3: ['Too much antibiotic makes germs strong health.', 'Excessive antibiotic builds bacteria immunity good.', 'Eating extra antibiotics makes germ resist.'],
    exp: 'চিকিৎসা বিষয়ক প্রাসঙ্গিক ইংরেজি পরিভাষা (writhing in pain, malpractice, bacterial resistance) এখানে ব্যবহৃত হয়েছে।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "কেবল পরিশ্রমের মাধ্যমেই লক্ষ্য অর্জন সম্ভব।"', a1: 'Only through hard work is achieving the goal possible.', w1: ['Through hard work only goal comes.', 'Only hard work makes goal easily.', 'Achieving target is by hard work only.'],
    q2: 'Translate into English: "খাবার আগে ও পরে সাবান দিয়ে হাত ধুয়ে নিন।"', a2: 'Wash your hands with soap before and after meals.', w2: ['Clean hands by soap before eat and after.', 'Wash hand in soap during meal.', 'Use soap to hands before eating.'],
    q3: 'Translate into English: "দূষিত পানি পান করলে পানিবাহিত রোগ হয়।"', a3: 'Drinking contaminated water causes waterborne diseases.', w3: ['To drink dirty water births water sick.', 'Polluted water drinking makes water illness.', 'Bad water drink causes disease by water.'],
    exp: '"Only through..." শুরুতে থাকলে Auxiliary ("is") Inversion হয়; contaminated water / waterborne diseases প্রমিত পরিভাষা।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "তার মেধা নিয়ে কোনো সন্দেহ নেই।"', a1: 'There is no doubt about his merit.', w1: ['No doubt stays on his brain.', 'His talent has no疑.', 'There is no question in his genius.'],
    q2: 'Translate into English: "বিষয়টি আমার কাছে স্পষ্ট নয়।"', a2: 'The matter is not clear to me.', w2: ['The topic is unclear for me.', 'Matter doesn’t clear to me.', 'The subject isn’t bright at me.'],
    q3: 'Translate into English: "তোমার উচিত আরও মনোযোগ দিয়ে পড়া।"', a3: 'You ought to study more attentively.', w3: ['You should studying carefully.', 'You must to read attentively.', 'You ought study with attention.'],
    exp: '"Clear to", "Doubt about", এবং "Ought + to + V1" ব্যবহারগুলো প্রমিত ইংরেজি অনুযায়ী শুদ্ধ।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "পরীক্ষা যতই ঘনিয়ে আসছে, আমার প্রস্তুতি ততই দৃঢ় হচ্ছে।"', a1: 'The closer the exam approaches, the stronger my preparation grows.', w1: ['As exam comes close, study becomes strong.', 'Closer exam gets, harder I ready.', 'When exam nearer, preparation strong.'],
    q2: 'Translate into English: "নিজের স্বাস্থ্যের প্রতি যত্নবান হওয়া প্রত্যেকের কর্তব্য।"', a2: 'It is everyone’s duty to take care of one’s health.', w2: ['Taking care health is duty of all.', 'Everyone must care to his health.', 'Being careful on health is every duty.'],
    q3: 'Translate into English: "জ্বর কমার পরেও দুর্বলতা কিছুদিন থাকতে পারে।"', a3: 'Weakness may persist for several days even after the fever subsides.', w3: ['After fever goes, weak stays long.', 'Even fever drops, weakness stays some days.', 'Weakness lasts after fever finishes down.'],
    exp: '"Subside" (জ্বর/ব্যথা কমে যাওয়া), "persist" (স্থায়ী থাকা) ও Double Comparative গঠন লক্ষণীয়।'
  },
  {
    kind: 'Translation',
    q1: 'Translate into English: "সে নিজের সাফল্যের জন্য তার শিক্ষকদের কাছে কৃতজ্ঞ।"', a1: 'He is indebted to his teachers for his success.', w1: ['He thanks his teachers of his win.', 'He is grateful on teachers for pass.', 'He owes his teachers about success.'],
    q2: 'Translate into English: "দুর্ঘটনার পর আহতদের দ্রুত হাসপাতালে নেওয়া হয়।"', a2: 'After the accident, the injured were rushed to hospital.', w2: ['After crash, injured was taken hospital.', 'Injured people hurried hospital after accident.', 'Wounded were carried at hospital fastly.'],
    q3: 'Translate into English: "রক্তদান একটি মহৎ মানবিক কাজ।"', a3: 'Blood donation is a noble humanitarian act.', w3: ['Giving blood is a great human work.', 'Donating bloods is noble humanity.', 'Blood donate is best social work.'],
    exp: '"The injured" (সমষ্টিবাচক Plural Noun) তাই "were" বসেছে; "indebted to ... for ..." সঠিক Preposition।'
  },
  {
    kind: 'Rhetoric',
    q1: 'What is "Irony" in literature?', a1: 'A contrast between what is said or expected and what actually occurs', w1: ['Repetition of initial consonant sounds', 'Comparing two similar animals', 'Listing historical dates chronologically'],
    q2: 'What is "Allusion"?', a2: 'An indirect reference to a well-known historical, mythological, or literary figure/event', w2: ['A musical rhyme at line endings', 'An exaggerated boast', 'A tragic death scene'],
    q3: 'What is "Pun" (Paronomasia)?', a3: 'A humorous play on words with double meanings or similar sounds', w3: ['A sad funeral poem', 'A strict fourteen-line stanza', 'Speaking alone on stage'],
    exp: 'Irony (বিদ্রূপ/বৈপরীত্য), Allusion (পরোক্ষ ঐতিহাসিক/পৌরাণিক ইঙ্গিত) ও Pun (শব্দের শ্লেষ/দ্ব্যর্থক রসিকতা)।'
  },
  {
    kind: 'Rhetoric',
    q1: 'What is "Elegy"?', a1: 'A mournful poem lamenting the death of someone or a vanished past', w1: ['A cheerful wedding song', 'A comedic farce', 'A scientific treatise'],
    q2: 'What is "Epic"?', a2: 'A long narrative poem on a grand scale celebrating heroic deeds', w2: ['A two-line witty proverb', 'A brief diary note', 'A courtroom dialogue'],
    q3: 'What is "Ballad"?', a3: 'A folk narrative poem or song telling a dramatic story in simple stanzas', w3: ['A complex philosophical essay', 'A medical textbook', 'A silent pantomime'],
    exp: 'Elegy (শোকগীতি), Epic (মহাকাব্য) ও Ballad (লোকগাথা) কবিতার প্রধান তিনটি বর্ণনামূলক ও গীতিধর্মী রূপ।'
  },
  {
    kind: 'Rhetoric',
    q1: 'What is "Satire"?', a1: 'Exposing human vices or foolishness using humor, irony, and ridicule', w1: ['Praising rulers unconditionally', 'Writing private love letters', 'Listing anatomical parts'],
    q2: 'What is "Soliloquy" in drama?', a2: 'A character speaking inner thoughts aloud while alone on stage', w2: ['Two rivals fighting with swords', 'A letter read out by a messenger', 'An orchestra prelude'],
    q3: 'What is "Climax" in plot structure?', a3: 'The turning point of highest tension and emotional intensity', w3: ['The opening introduction of setting', 'The quiet final epilogue', 'A minor footnote'],
    exp: 'Satire (ব্যঙ্গ), Soliloquy (একাকী স্বগতোক্তি) ও Climax (কাহিনির সর্বোচ্চ নাটকীয় মুহূর্ত)।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the children’s classic "Alice’s Adventures in Wonderland"?', a1: 'Lewis Carroll', w1: ['Roald Dahl', 'J. M. Barrie', 'A. A. Milne'],
    q2: 'Who authored "Charlie and the Chocolate Factory" and "Matilda"?', a2: 'Roald Dahl', w2: ['Lewis Carroll', 'Enid Blyton', 'Beatrix Potter'],
    q3: 'Who created the boy who wouldn’t grow up in "Peter Pan"?', a3: 'J. M. Barrie', w3: ['C. S. Lewis', 'J. R. R. Tolkien', 'Kenneth Grahame'],
    exp: 'শিশু-কিশোর ধ্রুপদি ইংরেজি সাহিত্যে Lewis Carroll, Roald Dahl ও J. M. Barrie বিশ্বনন্দিত।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Chronicles of Narnia" ("The Lion, the Witch and the Wardrobe")?', a1: 'C. S. Lewis', w1: ['J. R. R. Tolkien', 'Philip Pullman', 'J. K. Rowling'],
    q2: 'Who authored "The Hobbit" and "The Lord of the Rings"?', a2: 'J. R. R. Tolkien', w2: ['C. S. Lewis', 'George R. R. Martin', 'Ursula K. Le Guin'],
    q3: 'What shared Oxford literary discussion group included both Tolkien and C. S. Lewis?', a3: 'The Inklings', w3: ['The Bloomsbury Group', 'The Lake Poets', 'The Pre-Raphaelites'],
    exp: 'অক্সফোর্ডের "The Inklings" গোষ্ঠীর C. S. Lewis ও J. R. R. Tolkien আধুনিক ফ্যান্টাসি সাহিত্যের জনক।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "The Jungle" exposing unsafe conditions in Chicago meatpacking?', a1: 'Upton Sinclair', w1: ['Theodore Dreiser', 'Jack London', 'Frank Norris'],
    q2: 'Who authored "The Call of the Wild" and "White Fang"?', a2: 'Jack London', w2: ['Mark Twain', 'Ernest Hemingway', 'Herman Melville'],
    q3: 'Who wrote "Uncle Tom’s Cabin", galvanizing the anti-slavery movement?', a3: 'Harriet Beecher Stowe', w3: ['Louisa May Alcott', 'Toni Morrison', 'Frederick Douglass'],
    exp: 'আমেরিকান সমাজবাস্তববাদী সাহিত্যে Upton Sinclair, Jack London ও Harriet Beecher Stowe ঐতিহাসিক ভূমিকা রেখেছেন।'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote the tragic drama "Antony and Cleopatra" and "Julius Caesar"?', a1: 'William Shakespeare', w1: ['George Bernard Shaw', 'John Dryden', 'Christopher Marlowe'],
    q2: 'Who also wrote "Caesar and Cleopatra", a witty modern prose play?', a2: 'George Bernard Shaw', w2: ['William Shakespeare', 'Oscar Wilde', 'T. S. Eliot'],
    q3: 'Which Shakespearean tragic hero utters "Et tu, Brute? Then fall, Caesar!"?', a3: 'Julius Caesar', w3: ['Macbeth', 'Hamlet', 'King Lear'],
    exp: 'শেক্সপিয়র লিখেছেন "Julius Caesar" ও "Antony and Cleopatra", আর G. B. Shaw লিখেছেন "Caesar and Cleopatra"—এই পার্থক্য পরীক্ষায় প্রায়ই আসে!'
  },
  {
    kind: 'Literature',
    q1: 'Who wrote "Absalom and Achitophel" and "Mac Flecknoe" (Restoration satire)?', a1: 'John Dryden', w1: ['Alexander Pope', 'Jonathan Swift', 'Andrew Marvell'],
    q2: 'Who penned "To His Coy Mistress", famous for its "carpe diem" (seize the day) theme?', a2: 'Andrew Marvell', w2: ['John Donne', 'George Herbert', 'Robert Herrick'],
    q3: 'Who wrote "Gather ye rosebuds while ye may" ("To the Virgins, to Make Much of Time")?', a3: 'Robert Herrick', w3: ['John Milton', 'Ben Jonson', 'Richard Lovelace'],
    exp: 'John Dryden (Father of English Criticism), Andrew Marvell ও Cavalier কবি Robert Herrick ১৭শ শতকের উজ্জ্বল নাম।'
  },
];

export function buildEngStructuredN(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `eng_n_${String(seq++).padStart(4, '0')}`;

  // 1. 75 Morphology / Plurals / Gender / Collective × 2 = 150 MCQs
  MORPH_DERIV_N.forEach((m, idx) => {
    const diff = idx % 3 === 0 ? 'medical' : idx % 3 === 1 ? 'dental' : 'board';

    // Forward question
    const q1 =
      m.kind === 'Plural'
        ? `What is the correct PLURAL form of "${m.base}"?`
        : m.kind === 'Gender'
        ? `What is the corresponding FEMININE gender of "${m.base}"?`
        : m.kind === 'Collective'
        ? `Complete the collective noun phrase: "${m.base} ___"`
        : `Select the correct ${m.kind.toUpperCase()} derived from "${m.base}":`;

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: diff,
        question: q1,
        correct: m.target,
        distractors: m.wrongs,
        explanation: m.note,
        reference: `Medical English · ${m.kind}`,
      })
    );

    // Reverse / Conceptual angle
    const revWrongBases = [
      MORPH_DERIV_N[(idx + 7) % MORPH_DERIV_N.length].base,
      MORPH_DERIV_N[(idx + 17) % MORPH_DERIV_N.length].base,
      MORPH_DERIV_N[(idx + 29) % MORPH_DERIV_N.length].base,
    ];
    const q2 =
      m.kind === 'Plural'
        ? `Which singular noun gives the irregular plural "${m.target}"?`
        : m.kind === 'Gender'
        ? `"${m.target}" is the feminine counterpart of which masculine noun?`
        : m.kind === 'Collective'
        ? `Which collective phrase accurately refers to "${m.target}"?`
        : `"${m.target}" (${m.kind}) is formed from which base word?`;

    const ans2 = m.kind === 'Collective' ? m.base : m.base;
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'board',
        question: q2,
        correct: ans2,
        distractors: revWrongBases,
        explanation: `${m.base} ↔ ${m.target}: ${m.note}`,
        reference: `Medical English · ${m.kind} Reverse`,
      })
    );
  });

  // 2. 65 Analogies × 2 = 130 MCQs
  ANALOGY_BANK_N.forEach((an, idx) => {
    const diff = idx % 2 === 0 ? 'medical' : 'dental';

    // Forward C : ___
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: diff,
        question: `Select the word that completes the analogy: ${an.a} : ${an.b} :: ${an.c} : ___`,
        correct: an.d,
        distractors: an.wrongs,
        explanation: `সম্পর্ক (${an.rel}): যেমন ${an.a} সম্পর্কিত ${an.b}-এর সাথে, তেমনি ${an.c} সম্পর্কিত ${an.d}-এর সাথে।`,
        reference: 'Medical English · Verbal Reasoning & Analogies',
      })
    );

    // Pair selection analogy
    const wrongPairs = [
      `${ANALOGY_BANK_N[(idx + 4) % ANALOGY_BANK_N.length].b} : ${ANALOGY_BANK_N[(idx + 4) % ANALOGY_BANK_N.length].c}`,
      `${ANALOGY_BANK_N[(idx + 11) % ANALOGY_BANK_N.length].d} : ${ANALOGY_BANK_N[(idx + 11) % ANALOGY_BANK_N.length].a}`,
      `${ANALOGY_BANK_N[(idx + 23) % ANALOGY_BANK_N.length].a} : ${ANALOGY_BANK_N[(idx + 23) % ANALOGY_BANK_N.length].d}`,
    ];
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'medical',
        question: `Which pair mirrors the relationship of "${an.a} : ${an.b}" (${an.rel})?`,
        correct: `${an.c} : ${an.d}`,
        distractors: wrongPairs,
        explanation: `উভয় জোড়ায় "${an.rel}" সম্পর্ক বিদ্যমান (${an.a} : ${an.b} :: ${an.c} : ${an.d})।`,
        reference: 'Medical English · Analogy Pair Matching',
      })
    );
  });

  // 3. Literature, Rhetoric & Translations × 3 = ~210+ MCQs
  LIT_TRANS_BANK_N.forEach((lt, idx) => {
    const diff1 = idx % 2 === 0 ? 'medical' : 'board';
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: diff1,
        question: lt.q1,
        correct: lt.a1,
        distractors: lt.w1,
        explanation: lt.exp,
        reference: `Medical English · ${lt.kind}`,
      }),
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'dental',
        question: lt.q2,
        correct: lt.a2,
        distractors: lt.w2,
        explanation: lt.exp,
        reference: `Medical English · ${lt.kind}`,
      }),
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'medical',
        question: lt.q3,
        correct: lt.a3,
        distractors: lt.w3,
        explanation: lt.exp,
        reference: `Medical English · ${lt.kind}`,
      })
    );
  });

  return list;
}
