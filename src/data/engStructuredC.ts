import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

interface MedTermEntry {
  term: string;
  def: string;
  bn: string;
}

const MED_ONE_WORD_BANK: MedTermEntry[] = [
  { term: 'Nephrology', def: 'The branch of medicine dealing with kidneys', bn: 'বৃক্ক বা কিডনি বিজ্ঞান' },
  { term: 'Neurology', def: 'The medical study of the nervous system', bn: 'স্নায়ুতন্ত্রের রোগ বিজ্ঞান' },
  { term: 'Oncology', def: 'The study and treatment of cancer and tumors', bn: 'ক্যান্সার ও টিউমার বিজ্ঞান' },
  { term: 'Hematology', def: 'The study of blood and blood-forming organs', bn: 'রক্ততত্ত্ব' },
  { term: 'Dermatology', def: 'The branch of medicine concerned with skin diseases', bn: 'চর্মরোগ বিজ্ঞান' },
  { term: 'Ophthalmology', def: 'The medical study of the eye and vision', bn: 'চক্ষু বিজ্ঞান' },
  { term: 'Orthopedics', def: 'Medicine dealing with bones, joints, and muscles', bn: 'অস্থি ও হাড় চিকিৎসা বিজ্ঞান' },
  { term: 'Pediatrics', def: 'The branch of medicine dealing with children’s health', bn: 'শিশু চিকিৎসা বিজ্ঞান' },
  { term: 'Geriatrics', def: 'Medical care of elderly people', bn: 'বার্ধক্যজনিত রোগ চিকিৎসা' },
  { term: 'Obstetrics', def: 'Medical branch dealing with pregnancy and childbirth', bn: 'প্রসূতিবিদ্যা' },
  { term: 'Pulmonology', def: 'The study of lungs and respiratory tract diseases', bn: 'ফুসফুস ও শ্বাসতন্ত্র বিজ্ঞান' },
  { term: 'Endocrinology', def: 'The study of hormones and endocrine glands', bn: 'অন্তঃক্ষরা গ্রন্থি ও হরমোন বিজ্ঞান' },
  { term: 'Gastroenterology', def: 'The study of the stomach and digestive system', bn: 'পরিপাকতন্ত্র রোগ বিজ্ঞান' },
  { term: 'Immunology', def: 'The study of the body’s immune defense system', bn: 'রোগপ্রতিরোধ বিজ্ঞান' },
  { term: 'Pathology', def: 'The scientific study of the nature and causes of disease', bn: 'রোগতত্ত্ব' },
  { term: 'Epidemiology', def: 'The study of disease spread and control in populations', bn: 'মহামারি তত্ত্ব' },
  { term: 'Pharmacology', def: 'The study of drugs and their action on the body', bn: 'ওষুধ বিজ্ঞান' },
  { term: 'Toxicology', def: 'The study of poisons and their antidotes', bn: 'বিষবিদ্যা' },
  { term: 'Autopsy', def: 'Post-mortem examination of a corpse to find cause of death', bn: 'ময়নাতদন্ত' },
  { term: 'Biopsy', def: 'Removal and examination of tissue from a living body', bn: 'জীবন্ত দেহের টিস্যু পরীক্ষা' },
  { term: 'Euthanasia', def: 'Painless mercy killing of an incurably ill patient', bn: 'ইচ্ছামৃত্যু / যন্ত্রণাহীন মৃত্যু' },
  { term: 'Insomnia', def: 'Chronic inability to fall asleep', bn: 'অনিদ্রা রোগ' },
  { term: 'Amnesia', def: 'Partial or total loss of memory', bn: 'স্মৃতিভ্রংশ' },
  { term: 'Anemia', def: 'Deficiency of red blood cells or hemoglobin', bn: 'রক্তস্বল্পতা' },
  { term: 'Hypertension', def: 'Abnormally high arterial blood pressure', bn: 'উচ্চ রক্তচাপ' },
  { term: 'Hypoglycemia', def: 'Abnormally low level of glucose in the blood', bn: 'রক্তে শর্করার ঘাটতি' },
  { term: 'Cyanosis', def: 'Bluish discoloration of skin due to oxygen lack', bn: 'অক্সিজেন অভাবে ত্বক নীলাভ হওয়া' },
  { term: 'Bradycardia', def: 'Abnormally slow heart rate (below 60 bpm)', bn: 'হৃৎস্পন্দন স্বাভাবিকের চেয়ে ধীর হওয়া' },
  { term: 'Tachycardia', def: 'Abnormally rapid resting heart rate', bn: 'দ্রুত হৃৎস্পন্দন' },
  { term: 'Apnea', def: 'Temporary cessation of breathing', bn: 'শ্বাসপ্রশ্বাস সাময়িক বন্ধ থাকা' },
  { term: 'Edema', def: 'Swelling caused by excess fluid trapped in body tissues', bn: 'টিস্যুতে পানি জমে ফুলে যাওয়া (শোথ)' },
  { term: 'Prophylaxis', def: 'Preventive measure taken against disease', bn: 'রোগ প্রতিরোধমূলক ব্যবস্থা' },
  { term: 'Panacea', def: 'A universal cure for all diseases or troubles', bn: 'সর্বরোগের মহৌষধ' },
  { term: 'Placebo', def: 'A harmless inactive substance given as medicine for psychological effect', bn: 'ওষুধহীন সান্ত্বনা ট্যাবলেট' },
  { term: 'Pandemic', def: 'An infectious disease outbreak spreading across continents', bn: 'বৈশ্বিক মহামারি' },
  { term: 'Endemic', def: 'A disease regularly found in a specific geographic region', bn: 'আঞ্চলিক বা স্থানিক রোগ' },
  { term: 'Congenital', def: 'A disease or trait present from birth', bn: 'জন্মগত' },
  { term: 'Benign', def: 'Non-cancerous and non-life-threatening growth', bn: 'নির্দোষ বা ক্ষতিকর নয় এমন টিউমার' },
  { term: 'Asymptomatic', def: 'Showing no noticeable clinical symptoms', bn: 'উপসর্গহীন' },
  { term: 'Prognosis', def: 'A doctor’s forecast of the likely course of a disease', bn: 'রোগের সম্ভাব্য পরিণতি পূর্বাভাস' },
  { term: 'Philanthropist', def: 'A person who generously helps humanity', bn: 'মানবহিতৈষী ব্যক্তি' },
  { term: 'Misogynist', def: 'A person who hates women', bn: 'নারীবিদ্বেষী' },
  { term: 'Misanthrope', def: 'A person who dislikes humankind', bn: 'মানববিদ্বেষী' },
  { term: 'Polyglot', def: 'A person who knows and uses several languages', bn: 'বহুভাষাবিদ' },
  { term: 'Omniscient', def: 'Knowing everything', bn: 'সর্বজ্ঞ' },
  { term: 'Omnipotent', def: 'Having unlimited power', bn: 'সর্বশক্তিমান' },
  { term: 'Altruist', def: 'One who unselfishly works for the welfare of others', bn: 'পরার্থপর ব্যক্তি' },
  { term: 'Stoic', def: 'A person who endures pain without showing emotion or complaint', bn: 'সুখ-দুঃখে নির্বিকার ব্যক্তি' },
  { term: 'Somnambulist', def: 'One who walks in sleep', bn: 'নিদ্রাচারী / ঘুমের মধ্যে হাঁটে এমন' },
  { term: 'Kleptomaniac', def: 'A person with an irresistible urge to steal', bn: 'চুরি করার মানসিক বাতিকগ্রস্ত' },
  { term: 'Claustrophobia', def: 'Extreme irrational fear of confined closed spaces', bn: 'আবদ্ধ স্থানের ভীতি' },
  { term: 'Acrophobia', def: 'Extreme fear of heights', bn: 'উচ্চতা ভীতি' },
  { term: 'Hydrophobia', def: 'Irrational fear of water (also a symptom of rabies)', bn: 'জলাতঙ্ক / পানিভীতি' },
  { term: 'Xenophobia', def: 'Fear or hatred of foreigners and strangers', bn: 'বিদেশি-ভীতি' },
  { term: 'Cartography', def: 'The science and art of drawing maps', bn: 'মানচিত্র অঙ্কন বিদ্যা' },
  { term: 'Demography', def: 'Statistical study of human populations', bn: 'জনসংখ্যা বিজ্ঞান' },
  { term: 'Entomology', def: 'The scientific study of insects', bn: 'কীটতত্ত্ব' },
  { term: 'Etymology', def: 'The study of the origin and history of words', bn: 'শব্দের ব্যুৎপত্তি বিজ্ঞান' },
  { term: 'Ornithology', def: 'The scientific study of birds', bn: 'পক্ষীবিজ্ঞান' },
  { term: 'Paleontology', def: 'The study of fossils and ancient life', bn: 'জীবাশ্ম বিজ্ঞান' },
  { term: 'Philately', def: 'The collection and study of postage stamps', bn: 'ডাকটিকিট সংগ্রহ ও চর্চা' },
  { term: 'Calligraphy', def: 'The art of decorative handwriting', bn: 'সুন্দর হস্তাক্ষর বিদ্যা' },
  { term: 'Anthology', def: 'A published collection of poems or writings', bn: 'সাহিত্য সংকলন' },
  { term: 'Soliloquy', def: 'Speaking one’s thoughts aloud while alone on stage', bn: 'স্বগতোক্তি' },
  { term: 'Epitaph', def: 'Words inscribed on a tombstone in memory of the deceased', bn: 'সমাধিলিপি' },
  { term: 'Posthumous', def: 'Occurring, awarded, or published after death', bn: 'মরণোত্তর' },
  { term: 'Veteran', def: 'A person with long experience in a profession', bn: 'দীর্ঘ অভিজ্ঞতাসম্পন্ন ব্যক্তি' },
  { term: 'Contemporary', def: 'Living or occurring at the same time', bn: 'সমসাময়িক' },
  { term: 'Anonymous', def: 'Written or done by someone whose name is unknown', bn: 'বেনামী / অজ্ঞাতনামা' },
  { term: 'Infallible', def: 'Incapable of making mistakes or failing', bn: 'অভ্রান্ত / ভুলত্রুটিহীন' },
  { term: 'Illegible', def: 'Handwriting so bad that it cannot be read', bn: 'অস্পষ্ট ও পাঠ-অযোগ্য হস্তাক্ষর' },
  { term: 'Inaudible', def: 'Too faint to be heard', bn: 'শ্রবণাতীত' },
  { term: 'Indefatigable', def: 'Persisting tirelessly without giving up', bn: 'অক্লান্ত পরিশ্রমী' },
  { term: 'Inevitable', def: 'Certain to happen and impossible to avoid', bn: 'অবশ্যম্ভাবী' },
  { term: 'Mercenary', def: 'A soldier or worker motivated solely by money', bn: 'ভাড়াটে বা অর্থলোভী' },
  { term: 'Nepotism', def: 'Favoritism shown to relatives in jobs or power', bn: 'স্বজনপ্রীতি' },
  { term: 'Plagiarism', def: 'Passing off someone else’s writing or ideas as one’s own', bn: 'সাহিত্যচুরি / কুম্ভীলকবৃত্তি' },
  { term: 'Teetotaler', def: 'A person who completely abstains from alcoholic drinks', bn: 'মদ্যপান বর্জনকারী' },
  { term: 'Utopia', def: 'An imagined ideal society with perfect laws', bn: 'কল্পরাজ্য / আদর্শ রাষ্ট্র' },
  { term: 'Verbatim', def: 'In exactly the same words as originally used', bn: 'শব্দশঃ / অবিকল ভাষায়' },
];

const PLURAL_GENDER_BANK: Array<{ kind: 'Plural' | 'Gender'; from: string; to: string; note: string }> = [
  { kind: 'Plural', from: 'Criterion', to: 'Criteria', note: 'গ্রিক মূল -on শেষে থাকলে Plural-এ -a হয়' },
  { kind: 'Plural', from: 'Phenomenon', to: 'Phenomena', note: '-on থেকে -a হয় (Phenomena)' },
  { kind: 'Plural', from: 'Datum', to: 'Data', note: 'ল্যাটিন -um থেকে -a হয়' },
  { kind: 'Plural', from: 'Bacterium', to: 'Bacteria', note: 'Bacterium একবচন, Bacteria বহুবচন' },
  { kind: 'Plural', from: 'Ovum', to: 'Ova', note: 'Ovum (ডিম্বাণু) → Ova' },
  { kind: 'Plural', from: 'Medium', to: 'Media', note: 'Medium → Media / Mediums' },
  { kind: 'Plural', from: 'Alumnus', to: 'Alumni', note: 'পুংলিঙ্গ -us → -i হয়' },
  { kind: 'Plural', from: 'Alumna', to: 'Alumnae', note: 'স্ত্রীলিঙ্গ -a → -ae হয়' },
  { kind: 'Plural', from: 'Radius', to: 'Radii', note: 'Radius → Radii' },
  { kind: 'Plural', from: 'Stimulus', to: 'Stimuli', note: 'Stimulus → Stimuli' },
  { kind: 'Plural', from: 'Focus', to: 'Foci', note: 'Focus → Foci' },
  { kind: 'Plural', from: 'Nucleus', to: 'Nuclei', note: 'Nucleus → Nuclei' },
  { kind: 'Plural', from: 'Diagnosis', to: 'Diagnoses', note: 'গ্রিক -is → -es হয়' },
  { kind: 'Plural', from: 'Thesis', to: 'Theses', note: 'Thesis → Theses' },
  { kind: 'Plural', from: 'Crisis', to: 'Crises', note: 'Crisis → Crises' },
  { kind: 'Plural', from: 'Hypothesis', to: 'Hypotheses', note: 'Hypothesis → Hypotheses' },
  { kind: 'Plural', from: 'Analysis', to: 'Analyses', note: 'Analysis → Analyses' },
  { kind: 'Plural', from: 'Basis', to: 'Bases', note: 'Basis → Bases' },
  { kind: 'Plural', from: 'Vertebra', to: 'Vertebrae', note: 'Vertebra (কশেরুকা) → Vertebrae' },
  { kind: 'Plural', from: 'Formula', to: 'Formulae', note: 'Formula → Formulae (বৈজ্ঞানিক ক্ষেত্রে)' },
  { kind: 'Plural', from: 'Appendix', to: 'Appendices', note: '-ix / -ex → -ices হয়' },
  { kind: 'Plural', from: 'Index', to: 'Indices', note: 'Index (সূচক) → Indices' },
  { kind: 'Plural', from: 'Matrix', to: 'Matrices', note: 'Matrix → Matrices' },
  { kind: 'Plural', from: 'Mouse', to: 'Mice', note: 'অনিয়মিত বহুবচন Mouse → Mice' },
  { kind: 'Plural', from: 'Louse', to: 'Lice', note: 'Louse → Lice' },
  { kind: 'Plural', from: 'Ox', to: 'Oxen', note: 'Ox → Oxen' },
  { kind: 'Plural', from: 'Brother-in-law', to: 'Brothers-in-law', note: 'Compound noun-এ মূল শব্দে s যুক্ত হয়' },
  { kind: 'Plural', from: 'Passer-by', to: 'Passers-by', note: 'Passer-by → Passers-by' },
  { kind: 'Gender', from: 'Administrator', to: 'Administratrix', note: '-tor থেকে -trix হয় (স্ত্রীলিঙ্গ)' },
  { kind: 'Gender', from: 'Executor', to: 'Executrix', note: 'Executor → Executrix' },
  { kind: 'Gender', from: 'Hero', to: 'Heroine', note: 'Hero → Heroine' },
  { kind: 'Gender', from: 'Bachelor', to: 'Spinster / Maid', note: 'অবিবাহিত পুরুষ বনাম অবিবাহিত নারী' },
  { kind: 'Gender', from: 'Monk', to: 'Nun', note: 'Monk (সন্ন্যাসী) → Nun (সন্ন্যাসিনী)' },
  { kind: 'Gender', from: 'Wizard', to: 'Witch', note: 'Wizard → Witch' },
  { kind: 'Gender', from: 'Stag', to: 'Hind', note: 'পুরুষ হরিণ (Stag) → স্ত্রী হরিণ (Hind)' },
  { kind: 'Gender', from: 'Drake', to: 'Duck', note: 'পুরুষ হাঁস (Drake) → স্ত্রী হাঁস (Duck)' },
  { kind: 'Gender', from: 'Gander', to: 'Goose', note: 'রাজহাঁস (Gander) → রাজহংসী (Goose)' },
  { kind: 'Gender', from: 'Ram', to: 'Ewe', note: 'পুরুষ ভেড়া (Ram) → স্ত্রী ভেড়া (Ewe)' },
  { kind: 'Gender', from: 'Boar', to: 'Sow', note: 'পুরুষ শূকর (Boar) → স্ত্রী শূকর (Sow)' },
  { kind: 'Gender', from: 'Fox', to: 'Vixen', note: 'Fox → Vixen' },
];

const ANALOGY_BANK: Array<{ prompt: string; ans: string; wrongs: [string, string, string]; exp: string }> = [
  { prompt: 'Cardiologist : Heart :: Nephrologist : ___', ans: 'Kidney', wrongs: ['Liver', 'Brain', 'Lung'], exp: 'Cardiologist হৃৎপিণ্ডের ও Nephrologist কিডনির চিকিৎসা করেন।' },
  { prompt: 'Stethoscope : Heartbeat :: Sphygmomanometer : ___', ans: 'Blood pressure', wrongs: ['Temperature', 'Blood sugar', 'Hearing'], exp: 'Stethoscope হৃদস্পন্দন ও Sphygmomanometer রক্তচাপ মাপে।' },
  { prompt: 'Anemia : Red blood cells :: Osteoporosis : ___', ans: 'Bone density', wrongs: ['Insulin', 'Melanin', 'Thyroid'], exp: 'Anemia লোহিত রক্তকণিকার ঘাটতি ও Osteoporosis হাড়ের ঘনত্ব কমে যাওয়ার রোগ।' },
  { prompt: 'Vaccine : Prevention :: Antibiotic : ___', ans: 'Bacterial cure', wrongs: ['Surgery', 'Anesthesia', 'X-ray'], exp: 'টিকা রোগ প্রতিরোধ করে এবং অ্যান্টিবায়োটিক ব্যাকটেরিয়াজনিত রোগ নিরাময় করে।' },
  { prompt: 'Retina : Eye :: Cochlea : ___', ans: 'Ear', wrongs: ['Nose', 'Tongue', 'Skin'], exp: 'Retina চোখের ও Cochlea অন্তঃকর্ণের সংবেদী অংশ।' },
  { prompt: 'Insulin : Pancreas :: Thyroxine : ___', ans: 'Thyroid gland', wrongs: ['Pituitary', 'Adrenal', 'Liver'], exp: 'অগ্ন্যাশয় থেকে ইনসুলিন ও থাইরয়েড থেকে থাইরক্সিন নিঃসৃত হয়।' },
  { prompt: 'Neuron : Brain :: Nephron : ___', ans: 'Kidney', wrongs: ['Heart', 'Stomach', 'Spleen'], exp: 'মস্তিষ্কের গাঠনিক একক নিউরন ও বৃক্কের একক নেফ্রন।' },
  { prompt: 'Botany : Plants :: Entomology : ___', ans: 'Insects', wrongs: ['Birds', 'Fossils', 'Fungi'], exp: 'উদ্ভিদবিজ্ঞানে উদ্ভিদ ও কীটতত্ত্বে কীটপতঙ্গ নিয়ে আলোচনা করা হয়।' },
  { prompt: 'Ornithologist : Birds :: Ichthyologist : ___', ans: 'Fishes', wrongs: ['Reptiles', 'Mammals', 'Amphibians'], exp: 'পক্ষীবিজ্ঞানী পাখি ও মৎস্যবিজ্ঞানী মাছ নিয়ে গবেষণা করেন।' },
  { prompt: 'Thermometer : Temperature :: Barometer : ___', ans: 'Atmospheric pressure', wrongs: ['Humidity', 'Wind speed', 'Earthquake'], exp: 'থার্মোমিটার তাপমাত্রা ও ব্যারোমিটার বায়ুচাপ পরিমাপ করে।' },
  { prompt: 'Author : Novel :: Sculptor : ___', ans: 'Statue', wrongs: ['Poem', 'Symphony', 'Painting'], exp: 'লেখক উপন্যাস রচনা করেন ও ভাস্কর মূর্তি গড়েন।' },
  { prompt: 'Architect : Blueprint :: Surgeon : ___', ans: 'Incision plan', wrongs: ['Chisel', 'Stanza', 'Verdict'], exp: 'স্থপতি নকশা অনুযায়ী নির্মাণ করেন।' },
  { prompt: 'Epilogue : Book :: Postscript : ___', ans: 'Letter', wrongs: ['Drama', 'Speech', 'Invoice'], exp: 'বইয়ের শেষে Epilogue এবং চিঠির শেষে Postscript (P.S.) থাকে।' },
  { prompt: 'Eloquent : Speech :: Legible : ___', ans: 'Handwriting', wrongs: ['Music', 'Vision', 'Posture'], exp: 'বক্তৃতা সুস্পষ্ট হলে Eloquent এবং হাতের লেখা পঠনযোগ্য হলে Legible বলে।' },
  { prompt: 'Frugal : Miserly :: Confident : ___', ans: 'Arrogant', wrongs: ['Timid', 'Generous', 'Honest'], exp: 'সদর্থক গুণের অতিরিক্ত রূপ নেতিবাচক (মিতব্যয়ী → কৃপণ; আত্মবিশ্বাসী → অহংকারী)।' },
  { prompt: 'Antiseptic : Germs :: Antidote : ___', ans: 'Poison', wrongs: ['Fever', 'Fracture', 'Allergy'], exp: 'Antiseptic জীবাণু ধ্বংস করে ও Antidote বিষের ক্রিয়া নষ্ট করে।' },
  { prompt: 'Acute : Chronic :: Benign : ___', ans: 'Malignant', wrongs: ['Fatal', 'Infectious', 'Congenital'], exp: 'তীব্র/স্বল্পস্থায়ী বনাম দীর্ঘস্থায়ী; নির্দোষ টিউমার বনাম মারাত্মক টিউমার।' },
  { prompt: 'Prologue : Play :: Overture : ___', ans: 'Opera', wrongs: ['Poem', 'Essay', 'Dictionary'], exp: 'নাটকের প্রারম্ভিক অংশ Prologue ও অপেরার প্রারম্ভিক অংশ Overture।' },
  { prompt: 'Herbivore : Plants :: Carnivore : ___', ans: 'Meat', wrongs: ['Insects', 'Seeds', 'Nectar'], exp: 'তৃণভোজী উদ্ভিদ খায় ও মাংসাশী মাংস খায়।' },
  { prompt: 'Microscope : Tiny objects :: Telescope : ___', ans: 'Distant stars', wrongs: ['Sound waves', 'Blood cells', 'Minerals'], exp: 'অণুবীক্ষণে ক্ষুদ্র বস্তু ও দূরবীক্ষণে দূরবর্তী নক্ষত্র দেখা হয়।' },
];

export function buildEngStructuredC(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `esc_${String(seq++).padStart(4, '0')}`;

  // 1. Medical Terminology & One-Word Substitutions (3 angles × 80 = 240 MCQs)
  MED_ONE_WORD_BANK.forEach((mt, i) => {
    const others = MED_ONE_WORD_BANK.filter((x) => x.term !== mt.term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `One-word substitution for "${mt.def}":`,
        correct: mt.term,
        distractors: others.slice(i % 40, (i % 40) + 8).map((x) => x.term),
        explanation: `"${mt.def}"-এর এককথায় প্রকাশ হলো "${mt.term}" (${mt.bn})।`,
        reference: 'Medical Admission English · One-Word Substitution',
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
        difficulty: 'medical',
        question: `What does the term "${mt.term}" refer to?`,
        correct: mt.def,
        distractors: others.slice((i + 15) % 40, ((i + 15) % 40) + 8).map((x) => x.def),
        explanation: `"${mt.term}" অর্থ "${mt.bn}" (${mt.def})।`,
        reference: 'Medical Admission English · Medical Terminology',
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
        question: `"${mt.term}" শব্দটির সঠিক বাংলা পরিভাষা কোনটি?`,
        correct: mt.bn,
        distractors: others.slice((i + 25) % 40, ((i + 25) % 40) + 8).map((x) => x.bn),
        explanation: `${mt.term} = ${mt.bn} (${mt.def})।`,
        reference: 'Medical Admission English · পরিভাষা',
      })
    );
  });

  // 2. Foreign Plurals & Gender (40 × 2 = 80 MCQs)
  PLURAL_GENDER_BANK.forEach((pg, i) => {
    const sameKind = PLURAL_GENDER_BANK.filter((x) => x.kind === pg.kind && x.from !== pg.from);
    if (pg.kind === 'Plural') {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'eng',
          medicalGroup: 'eng',
          chapterId: 'eng_med_lit_trans',
          visualLessonId: 'english_grammar',
          hscLevel: 'admission',
          difficulty: 'medical',
          question: `What is the correct PLURAL form of "${pg.from}"?`,
          correct: pg.to,
          distractors: sameKind.slice(i % 15, (i % 15) + 8).map((x) => x.to),
          explanation: `"${pg.from}"-এর Plural হলো "${pg.to}"। (${pg.note})`,
          reference: 'Medical Admission English · Number (Singular-Plural)',
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
          question: `"${pg.to}" is the plural form of which singular noun?`,
          correct: pg.from,
          distractors: sameKind.slice((i + 5) % 15, ((i + 5) % 15) + 8).map((x) => x.from),
          explanation: `"${pg.from}"-এর বহুবচন রূপ "${pg.to}"।`,
          reference: 'Medical Admission English · Singular Identification',
        })
      );
    } else {
      list.push(
        buildMcq({
          id: nextId(),
          subjectId: 'eng',
          medicalGroup: 'eng',
          chapterId: 'eng_med_lit_trans',
          visualLessonId: 'english_grammar',
          hscLevel: 'admission',
          difficulty: 'board',
          question: `What is the FEMININE gender of "${pg.from}"?`,
          correct: pg.to,
          distractors: sameKind.slice(0, 8).map((x) => x.to),
          explanation: `"${pg.from}"-এর স্ত্রীলিঙ্গ হলো "${pg.to}"। (${pg.note})`,
          reference: 'Medical Admission English · Gender',
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
          question: `What is the MASCULINE gender corresponding to "${pg.to}"?`,
          correct: pg.from,
          distractors: sameKind.slice(0, 8).map((x) => x.from),
          explanation: `"${pg.to}"-এর পুংলিঙ্গ হলো "${pg.from}"।`,
          reference: 'Medical Admission English · Masculine Gender',
        })
      );
    }
  });

  // 3. Analogies (20 × 2 = 40 MCQs)
  ANALOGY_BANK.forEach((an, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `Complete the analogy: ${an.prompt}`,
        correct: an.ans,
        distractors: [...an.wrongs],
        explanation: an.exp,
        reference: 'Medical Admission English · Analogy',
      })
    );
  });

  return list;
}
