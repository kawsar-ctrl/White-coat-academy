import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

// 1. 70 Medical Roots, Prefixes, Suffixes & Clinical Specialists (× 2 = 140 MCQs)
const MED_ROOTS_BANK: Array<{ root: string; meaning: string; example: string }> = [
  { root: 'Cardi- / Cardio-', meaning: 'হৃৎপিণ্ড সম্পর্কিত (Heart)', example: 'Cardiomegaly (হৃৎপিণ্ডের স্ফীতি)' },
  { root: 'Hepato-', meaning: 'যকৃত বা লিভার সম্পর্কিত (Liver)', example: 'Hepatitis (যকৃতের প্রদাহ)' },
  { root: 'Nephr- / Reno-', meaning: 'বৃক্ক বা কিডনি সম্পর্কিত (Kidney)', example: 'Nephritis / Renal failure' },
  { root: 'Pneumo- / Pulmo-', meaning: 'ফুসফুস বা শ্বাসপ্রশ্বাস সম্পর্কিত (Lungs / Air)', example: 'Pneumothorax / Pulmonary' },
  { root: 'Osteo-', meaning: 'অস্থি বা হাড় সম্পর্কিত (Bone)', example: 'Osteomalacia (হাড় নরম হওয়া)' },
  { root: 'Myo-', meaning: 'পেশি সম্পর্কিত (Muscle)', example: 'Myocardium (হৃৎপেশি)' },
  { root: 'Neuro-', meaning: 'স্নায়ু সম্পর্কিত (Nerve)', example: 'Neuropathy (স্নায়ুজনিত ব্যাধি)' },
  { root: 'Hema- / Hemato-', meaning: 'রক্ত সম্পর্কিত (Blood)', example: 'Hematoma (রক্তজমাট ফোলা)' },
  { root: 'Gastro-', meaning: 'পাকস্থলী সম্পর্কিত (Stomach)', example: 'Gastritis (পাকস্থলীর প্রদাহ)' },
  { root: 'Entero-', meaning: 'অন্ত্র বা ক্ষুদ্রান্ত্র সম্পর্কিত (Intestine)', example: 'Gastroenteritis' },
  { root: 'Derma- / Dermato-', meaning: 'ত্বক বা চর্ম সম্পর্কিত (Skin)', example: 'Dermatitis (ত্বকের প্রদাহ)' },
  { root: 'Ophthalmo- / Oculo-', meaning: 'চোখ বা দৃষ্টি সম্পর্কিত (Eye)', example: 'Ophthalmoscope' },
  { root: 'Oto-', meaning: 'কর্ণ বা কান সম্পর্কিত (Ear)', example: 'Otitis media (মধ্যকর্ণের প্রদাহ)' },
  { root: 'Rhino-', meaning: 'নাক বা নাসিকা সম্পর্কিত (Nose)', example: 'Rhinitis / Rhinoplasty' },
  { root: 'Cephalo-', meaning: 'মস্তক বা মাথা সম্পর্কিত (Head)', example: 'Encephalitis / Cephalic' },
  { root: 'Encephalo-', meaning: 'মস্তিষ্ক সম্পর্কিত (Brain)', example: 'Electroencephalogram (EEG)' },
  { root: 'Cholecysto-', meaning: 'পিত্তথলি সম্পর্কিত (Gallbladder)', example: 'Cholecystectomy' },
  { root: 'Spleno-', meaning: 'প্লীহা সম্পর্কিত (Spleen)', example: 'Splenomegaly (প্লীহা স্ফীতি)' },
  { root: 'Thrombo-', meaning: 'রক্তজমাট বা অণুচক্রিকা সম্পর্কিত (Clot)', example: 'Thrombosis' },
  { root: 'Vas- / Angio-', meaning: 'রক্তনালি সম্পর্কিত (Blood vessel)', example: 'Angioplasty / Vasodilation' },
  { root: 'Arthro-', meaning: 'অস্থিসন্ধি বা জয়েন্ট সম্পর্কিত (Joint)', example: 'Arthritis (বাত বা সন্ধিপ্রদাহ)' },
  { root: 'Chondro-', meaning: 'তরুণাস্থি বা কার্টিলেজ সম্পর্কিত (Cartilage)', example: 'Chondrocyte' },
  { root: 'Hystero- / Utero-', meaning: 'জরায়ু সম্পর্কিত (Uterus)', example: 'Hysterectomy' },
  { root: 'Mamm- / Masto-', meaning: 'স্তন বা স্তন্যগ্রন্থি সম্পর্কিত (Breast)', example: 'Mammography / Mastitis' },
  { root: 'Orchi- / Orchido-', meaning: 'শুক্রাশয় সম্পর্কিত (Testes)', example: 'Orchitis' },
  { root: 'Oophoro-', meaning: 'ডিম্বাশয় সম্পর্কিত (Ovary)', example: 'Oophorectomy' },
  { root: 'Cysto-', meaning: 'মূত্রথলি বা থলি সম্পর্কিত (Bladder)', example: 'Cystitis (মূত্রথলির প্রদাহ)' },
  { root: 'Tracheo-', meaning: 'শ্বাসনালি সম্পর্কিত (Windpipe)', example: 'Tracheostomy' },
  { root: 'Laryngo-', meaning: 'স্বরযন্ত্র সম্পর্কিত (Voice box)', example: 'Laryngoscope' },
  { root: 'Pharyngo-', meaning: 'গলবিল সম্পর্কিত (Throat)', example: 'Pharyngitis' },
  { root: '-itis (Suffix)', meaning: 'প্রদাহ বা সংক্রমণ (Inflammation)', example: 'Appendicitis, Meningitis' },
  { root: '-ectomy (Suffix)', meaning: 'অস্ত্রোপচারে অঙ্গ কেটে বাদ দেওয়া (Surgical removal)', example: 'Tonsillectomy' },
  { root: '-otomy (Suffix)', meaning: 'অস্ত্রোপচারে ছিদ্র বা কর্তন করা (Incision)', example: 'Tracheotomy' },
  { root: '-ostomy (Suffix)', meaning: 'কৃত্রিম ছিদ্রপথ তৈরি করা (Creating an opening)', example: 'Colostomy' },
  { root: '-megaly (Suffix)', meaning: 'অস্বাভাবিক স্ফীতি বা বড় হওয়া (Enlargement)', example: 'Acromegaly, Hepatomegaly' },
  { root: '-algia (Suffix)', meaning: 'ব্যথা বা যন্ত্রণা (Pain)', example: 'Neuralgia, Myalgia' },
  { root: '-pathy (Suffix)', meaning: 'রোগ বা অসুস্থতা (Disease)', example: 'Neuropathy, Cardiomyopathy' },
  { root: '-penia (Suffix)', meaning: 'স্বাভাবিকের চেয়ে ঘাটতি বা কমে যাওয়া (Deficiency)', example: 'Leukopenia, Thrombocytopenia' },
  { root: '-cytosis / -philia (Suffix)', meaning: 'কোষের সংখ্যা অস্বাভাবিক বৃদ্ধি (Increase in cells)', example: 'Leukocytosis' },
  { root: '-lysis (Suffix)', meaning: 'ভেঙে যাওয়া বা ধ্বংস হওয়া (Breakdown)', example: 'Hemolysis, Dialysis' },
  { root: '-scopy (Suffix)', meaning: 'যন্ত্রের সাহায্যে অভ্যন্তরীণ দর্শন (Visual examination)', example: 'Endoscopy, Laparoscopy' },
  { root: '-plasty (Suffix)', meaning: 'অস্ত্রোপচারে পুনর্গঠন বা মেরামত (Surgical repair)', example: 'Angioplasty, Rhinoplasty' },
  { root: '-stasis (Suffix)', meaning: 'স্থির অবস্থা বা প্রবাহ থামানো (Stopping/Balance)', example: 'Hemostasis, Homeostasis' },
  { root: '-rrhea (Suffix)', meaning: 'অতিরিক্ত প্রবাহ বা স্রাব (Excessive flow)', example: 'Diarrhoea, Rhinorrhoea' },
  { root: '-rrhage (Suffix)', meaning: 'তীব্র রক্তপাত বা ক্ষরণ (Excessive bleeding)', example: 'Haemorrhage' },
  { root: 'Brady- (Prefix)', meaning: 'স্বাভাবিকের চেয়ে ধীর বা মন্থর (Slow)', example: 'Bradycardia, Bradypnea' },
  { root: 'Tachy- (Prefix)', meaning: 'স্বাভাবিকের চেয়ে দ্রুত (Fast / Rapid)', example: 'Tachycardia, Tachypnea' },
  { root: 'Dys- (Prefix)', meaning: 'কষ্টকর, বেদনাদায়ক বা ত্রুটিপূর্ণ (Difficult/Painful)', example: 'Dyspnea, Dysphagia' },
  { root: 'Hyper- (Prefix)', meaning: 'অতিরিক্ত বা স্বাভাবিকের বেশি (Excessive/High)', example: 'Hypertension, Hyperthyroidism' },
  { root: 'Hypo- (Prefix)', meaning: 'কম বা ঘাটতিপূর্ণ (Below normal/Low)', example: 'Hypothermia, Hypoglycemia' },
  { root: 'Poly- (Prefix)', meaning: 'অনেক বা বহু (Many/Excess)', example: 'Polyuria, Polydipsia' },
  { root: 'Oligo- (Prefix)', meaning: 'স্বল্প বা খুব কম (Few/Scanty)', example: 'Oliguria (স্বল্প মূত্রত্যাগ)' },
  { root: 'An- / A- (Prefix)', meaning: 'অনুপস্থিত বা অভাব (Absence/Without)', example: 'Anemia, Apnea, Anuria' },
  { root: 'Endo- (Prefix)', meaning: 'অভ্যন্তরে বা ভেতরে (Within/Inner)', example: 'Endocardium, Endocrine' },
  { root: 'Peri- (Prefix)', meaning: 'চারপাশে বা আবরণী (Around/Surrounding)', example: 'Pericardium, Periosteum' },
  { root: 'Sub- (Prefix)', meaning: 'নিচে বা তলদেশে (Under/Below)', example: 'Subcutaneous, Sublingual' },
  { root: 'Inter- (Prefix)', meaning: 'দুইয়ের মধ্যবর্তী (Between)', example: 'Intercostal, Intercellular' },
  { root: 'Intra- (Prefix)', meaning: 'ভেতরে বা অভ্যন্তরস্থ (Inside/Within)', example: 'Intravenous, Intramuscular' },
  { root: 'Neo- (Prefix)', meaning: 'নবীন বা নতুন (New)', example: 'Neonatal (নবজাতক সংক্রান্ত)' },
  { root: 'Oncologist', meaning: 'ক্যান্সার ও টিউমার রোগ বিশেষজ্ঞ চিকিৎসক', example: 'Chemotherapy & Radiation planning' },
  { root: 'Geriatrician', meaning: 'বয়স্ক বা প্রবীণদের রোগের বিশেষজ্ঞ চিকিৎসক', example: 'Elderly dementia & arthritis care' },
  { root: 'Pediatrician', meaning: 'শিশু ও কিশোর রোগ বিশেষজ্ঞ চিকিৎসক', example: 'Child immunization & growth' },
  { root: 'Nephrologist', meaning: 'কিডনি বা বৃক্ক রোগ বিশেষজ্ঞ চিকিৎসক', example: 'Dialysis & glomerulonephritis' },
  { root: 'Otolaryngologist (ENT)', meaning: 'নাক, কান ও গলা রোগ বিশেষজ্ঞ', example: 'Sinusitis & tonsillitis' },
  { root: 'Anesthesiologist', meaning: 'অস্ত্রোপচারে অজ্ঞান ও ব্যথানাশক বিশেষজ্ঞ', example: 'Spinal & general anesthesia' },
  { root: 'Pathologist', meaning: 'টিস্যু, রক্ত ও বায়োপসি পরীক্ষায় রোগ নির্ণয়কারী বিশেষজ্ঞ', example: 'Histopathology & cytology' },
  { root: 'Obstetrician', meaning: 'গর্ভধারণ ও প্রসবকালীন চিকিৎসা বিশেষজ্ঞ', example: 'Prenatal & delivery care' },
  { root: 'Ophthalmologist', meaning: 'চক্ষুরোগ ও চক্ষু অস্ত্রোপচার বিশেষজ্ঞ', example: 'Cataract & glaucoma surgery' },
  { root: 'Rheumatologist', meaning: 'বাত, অস্থিসন্ধি ও অটোইমিউন রোগ বিশেষজ্ঞ', example: 'Rheumatoid arthritis & lupus' },
  { root: 'Radiologist', meaning: 'এক্স-রে, সিটি স্ক্যান ও এমআরআই বিশ্লেষক বিশেষজ্ঞ', example: 'Diagnostic imaging' },
];

// 65 One-Word Substitutions, Phobias, Manias & Ologies (× 2 = 130 MCQs)
const ONE_WORD_BANK_2: Array<{ term: string; def: string; bn: string }> = [
  { term: 'Agoraphobia', def: 'Fear of open or crowded public places', bn: 'জনাকীর্ণ বা খোলা স্থানের ভীতি' },
  { term: 'Arachnophobia', def: 'Irrational fear of spiders', bn: 'মাকড়সা ভীতি' },
  { term: 'Hemophobia', def: 'Extreme fear of blood', bn: 'রক্ত ভীতি' },
  { term: 'Trypanophobia', def: 'Irrational fear of medical injections or needles', bn: 'সুই বা ইনজেকশন ভীতি' },
  { term: 'Nosocomephobia', def: 'Extreme fear of hospitals', bn: 'হাসপাতাল ভীতি' },
  { term: 'Pyrophobia', def: 'Irrational fear of fire', bn: 'অগ্নিভীতি' },
  { term: 'Bibliomania', def: 'Obsession with collecting books', bn: 'বই সংগ্রহের প্রবল বাতিক' },
  { term: 'Pyromania', def: 'Obsessive desire to set fire to things', bn: 'আগুন লাগানোর মানসিক বাতিক' },
  { term: 'Megalomania', def: 'Delusion of one’s own greatness or power', bn: 'নিজেকে সর্বশ্রেষ্ঠ ভাবার বাতিক' },
  { term: 'Dipsomania', def: 'Uncontrollable craving for alcohol', bn: 'অত্যধিক মদ্যপানের বাতিক' },
  { term: 'Cytology', def: 'The scientific study of structure and function of cells', bn: 'কোষবিদ্যা' },
  { term: 'Histology', def: 'The microscopic study of body tissues', bn: 'টিস্যুতত্ত্ব / কলাস্থান' },
  { term: 'Mycology', def: 'The branch of biology dealing with fungi', bn: 'ছত্রাকতত্ত্ব' },
  { term: 'Virology', def: 'The study of viruses and viral diseases', bn: 'ভাইরাস বিজ্ঞান' },
  { term: 'Bacteriology', def: 'The study of bacteria', bn: 'ব্যাকটেরিয়া বিজ্ঞান' },
  { term: 'Embryology', def: 'The study of embryos and their development', bn: 'ভ্রূণতত্ত্ব' },
  { term: 'Ethology', def: 'The scientific study of animal behavior', bn: 'প্রাণী আচরণ বিজ্ঞান' },
  { term: 'Ichthyology', def: 'The scientific study of fishes', bn: 'মৎস্যবিজ্ঞান' },
  { term: 'Herpetology', def: 'The study of reptiles and amphibians', bn: 'সরীসৃপ ও উভচর বিজ্ঞান' },
  { term: 'Taxonomy', def: 'The science of classification of living organisms', bn: 'শ্রেণিবিন্যাসবিদ্যা' },
  { term: 'Lexicography', def: 'The art and practice of compiling dictionaries', bn: 'অভিধান সংকলন বিদ্যা' },
  { term: 'Numismatics', def: 'The study or collection of coins and medals', bn: 'মুদ্রাতত্ত্ব' },
  { term: 'Seismology', def: 'The scientific study of earthquakes', bn: 'ভূমিকম্প বিজ্ঞান' },
  { term: 'Meteorology', def: 'The science dealing with weather and atmosphere', bn: 'আবহাওয়া বিজ্ঞান' },
  { term: 'Paleography', def: 'The study of ancient writings and inscriptions', bn: 'প্রাচীন লিপিবিদ্যা' },
  { term: 'Phonetics', def: 'The study of speech sounds', bn: 'ধ্বনিবিজ্ঞান' },
  { term: 'Semantics', def: 'The study of word and sentence meanings', bn: 'শব্দার্থতত্ত্ব' },
  { term: 'Ambidextrous', def: 'Able to use both hands equally well', bn: 'সব্যসাচী (দুই হাত সমান দক্ষ)' },
  { term: 'Agnostic', def: 'One who believes nothing can be known about God’s existence', bn: 'অজ্ঞেয়বাদী' },
  { term: 'Atheist', def: 'A person who does not believe in the existence of God', bn: 'নাস্তিক' },
  { term: 'Theist', def: 'A person who believes in the existence of God', bn: 'আস্তিক' },
  { term: 'Ascetic', def: 'A person practicing severe self-discipline without luxury', bn: 'সন্ন্যাসী / কঠোর ত্যাগী' },
  { term: 'Autocrat', def: 'A ruler with absolute unlimited power', bn: 'স্বৈরাচারী শাসক' },
  { term: 'Bureaucracy', def: 'A system of government run by state officials', bn: 'আমলাতন্ত্র' },
  { term: 'Plutocracy', def: 'Government by the wealthy class', bn: 'ধনিকতন্ত্র' },
  { term: 'Theocracy', def: 'Government ruled in the name of religion or religious leaders', bn: 'ধর্মতন্ত্র' },
  { term: 'Oligarchy', def: 'Government by a small elite group of people', bn: 'অল্পসংখ্যক শাসকের শাসন' },
  { term: 'Anarchy', def: 'Absence of government and lawlessness', bn: 'অরাজকতা' },
  { term: 'Bigamy', def: 'Marrying one person while still legally married to another', bn: 'দ্বি-বিবাহ অপরাধ' },
  { term: 'Polygamy', def: 'The custom of having more than one spouse at the same time', bn: 'বহুবিবাহ' },
  { term: 'Celibacy', def: 'The state of abstaining from marriage', bn: 'চিরকুমার ব্রত' },
  { term: 'Convalescent', def: 'A person recovering slowly from an illness', bn: 'রোগমুক্তির পর স্বাস্থ্যোদ্ধাররত ব্যক্তি' },
  { term: 'Cynic', def: 'One who believes all people are motivated by selfishness', bn: 'ছিদ্রান্বেষী / অবিশ্বাসী ব্যক্তি' },
  { term: 'Dilettante', def: 'A dabbler in arts or science without serious knowledge', bn: 'অগভীর বা শখের চর্চাকারী' },
  { term: 'Egoist', def: 'A self-centered person preoccupied with own interest', bn: 'স্বার্থপর / অহংবাদী' },
  { term: 'Egotist', def: 'One who constantly talks about oneself boastfully', bn: 'আত্মম্ভরী বা বড়াইকারী' },
  { term: 'Emigrant', def: 'A person who leaves their own country to settle abroad', bn: 'দেশত্যাগী প্রবাসী' },
  { term: 'Immigrant', def: 'A person who comes to live permanently in a foreign country', bn: 'অভিবাসী' },
  { term: 'Extempore', def: 'A speech delivered without prior preparation', bn: 'উপস্থিত বক্তৃতা' },
  { term: 'Fastidious', def: 'Very difficult to please and overly concerned with details', bn: 'অতি খুঁতখুঁতে' },
  { term: 'Fatalist', def: 'One who believes all events are predetermined by fate', bn: 'অদৃষ্টবাদী' },
  { term: 'Fugitive', def: 'A person fleeing from custody or justice', bn: 'পলাতক আসামি' },
  { term: 'Glutton', def: 'A person who eats greedily to excess', bn: 'অতিভোজী / পেটুক' },
  { term: 'Gourmet', def: 'A connoisseur of fine food and drink', bn: 'রসনাবিলাসী সমঝদার' },
  { term: 'Honorary', def: 'Holding an office or title without receiving salary', bn: 'অবৈতনিক / সম্মানসূচক' },
  { term: 'Sinecure', def: 'A paid job requiring little or no actual work', bn: 'বিনা পরিশ্রমে বেতনভুক্ত পদ' },
  { term: 'Hypocrite', def: 'One who pretends to have moral virtues one lacks', bn: 'ভণ্ড / কপটচারী' },
  { term: 'Iconoclast', def: 'One who attacks cherished traditional beliefs or institutions', bn: 'প্রথাবিরোধী সংস্কারক' },
  { term: 'Incorrigible', def: 'Incapable of being corrected or reformed', bn: 'অসংশোধনীয়' },
  { term: 'Invincible', def: 'Too powerful to be defeated or overcome', bn: 'অপরাজেয়' },
  { term: 'Vulnerable', def: 'Easily harmed or susceptible to attack/disease', bn: 'সহজে আক্রান্তপ্রবণ' },
  { term: 'Martyr', def: 'One who dies for a noble cause or country', bn: 'শহীদ' },
  { term: 'Octogenarian', def: 'A person between 80 and 89 years old', bn: 'অশীতিপর বৃদ্ধ' },
  { term: 'Parricide', def: 'The killing of one’s own parent or close relative', bn: 'পিতৃ বা মাতৃহত্যা' },
  { term: 'Regicide', def: 'The deliberate killing of a king or monarch', bn: 'রাজহত্যা' },
];

// 45 English Literature, Literary Terms & Nobel Laureates (× 2 = 90 MCQs)
const LIT_TERMS_AND_AUTHORS: Array<{ item: string; desc: string; category: string }> = [
  { item: 'Sonnet', desc: 'A 14-line lyrical poem written typically in iambic pentameter (Petrarchan or Shakespearean)', category: 'Literary Form' },
  { item: 'Elegy', desc: 'A mournful poem lamenting the death of someone (e.g., Gray’s Elegy, Lycidas, In Memoriam)', category: 'Literary Form' },
  { item: 'Epic', desc: 'A long narrative poem celebrating heroic deeds (e.g., Homer’s Iliad, Milton’s Paradise Lost)', category: 'Literary Form' },
  { item: 'Ballad', desc: 'A narrative poem or folk song telling a dramatic story in short stanzas', category: 'Literary Form' },
  { item: 'Satire', desc: 'Use of humor, irony, or exaggeration to expose human folly or vice (e.g., Gulliver’s Travels)', category: 'Literary Genre' },
  { item: 'Simile', desc: 'Explicit comparison between two unlike things using "like" or "as"', category: 'Figure of Speech' },
  { item: 'Metaphor', desc: 'Implied comparison equating one thing with another without using "like" or "as"', category: 'Figure of Speech' },
  { item: 'Personification', desc: 'Attributing human qualities or emotions to inanimate objects or abstract ideas', category: 'Figure of Speech' },
  { item: 'Oxymoron', desc: 'Combining two contradictory words side by side (e.g., "open secret", "living dead")', category: 'Figure of Speech' },
  { item: 'Hyperbole', desc: 'Deliberate extreme exaggeration for emphasis (e.g., "I have told you a million times")', category: 'Figure of Speech' },
  { item: 'Alliteration', desc: 'Repetition of the same initial consonant sound in nearby words', category: 'Figure of Speech' },
  { item: 'Onomatopoeia', desc: 'Words that imitate the natural sounds they describe (e.g., buzz, hiss, murmur)', category: 'Figure of Speech' },
  { item: 'Euphemism', desc: 'Substituting a mild, polite phrase for a harsh or blunt one (e.g., "passed away")', category: 'Figure of Speech' },
  { item: 'Irony', desc: 'Expressing meaning by saying the opposite, or a sharp contrast between expectation and reality', category: 'Figure of Speech' },
  { item: 'Paradox', desc: 'A seemingly self-contradictory statement that reveals a deeper truth ("Child is the father of the man")', category: 'Figure of Speech' },
  { item: 'Blank Verse', desc: 'Unrhymed lines of poetry written strictly in iambic pentameter (used by Milton & Shakespeare)', category: 'Poetic Meter' },
  { item: 'Protagonist', desc: 'The leading central character of a drama, novel, or story', category: 'Drama & Fiction' },
  { item: 'Antagonist', desc: 'The principal adversary opposing the hero/protagonist', category: 'Drama & Fiction' },
  { item: 'Catharsis', desc: 'Emotional purging of pity and fear experienced by an audience in tragedy (Aristotle)', category: 'Drama Theory' },
  { item: 'Hamartia', desc: 'The tragic flaw or fatal error of judgment leading to a hero’s downfall', category: 'Drama Theory' },
  { item: 'William Shakespeare (1564–1616)', desc: 'Born in Stratford-upon-Avon; known as the "Bard of Avon"; wrote 37 plays and 154 sonnets', category: 'English Author' },
  { item: 'Geoffrey Chaucer (c.1343–1400)', desc: 'Father of English Poetry & Literature; famous work "The Canterbury Tales"', category: 'English Author' },
  { item: 'Christopher Marlowe', desc: 'University Wit & Elizabethan dramatist; wrote "Doctor Faustus" and "Tamburlaine"', category: 'English Author' },
  { item: 'Francis Bacon', desc: 'Father of the English Essay; famous aphoristic essayist ("Of Studies", "Of Truth")', category: 'English Author' },
  { item: 'John Donne', desc: 'Leader of the Metaphysical Poets; famous for "The Sun Rising" and "The Canonization"', category: 'English Author' },
  { item: 'John Dryden', desc: 'Father of English Criticism; Restoration poet & author of "Absalom and Achitophel"', category: 'English Author' },
  { item: 'Alexander Pope', desc: 'Neoclassical master of heroic couplet & mock-epic ("The Rape of the Lock")', category: 'English Author' },
  { item: 'Samuel Johnson', desc: 'Compiled the landmark "A Dictionary of the English Language" (1755)', category: 'English Author' },
  { item: 'William Blake', desc: 'Pre-Romantic visionary poet of "Songs of Innocence and of Experience"', category: 'English Author' },
  { item: 'William Wordsworth', desc: 'Poet Laureate & Poet of Nature; co-authored "Lyrical Ballads" (1798) launching Romantic Age', category: 'Romantic Poet' },
  { item: 'John Keats', desc: 'Romantic Poet of Beauty & Sensuousness; died young of tuberculosis at 25 ("Ode to a Nightingale")', category: 'Romantic Poet' },
  { item: 'Lord Byron', desc: 'Romantic rebel poet; author of "Don Juan" and "Childe Harold’s Pilgrimage"', category: 'Romantic Poet' },
  { item: 'Alfred, Lord Tennyson', desc: 'Representative Victorian poet; wrote "Ulysses", "In Memoriam", and "Locksley Hall"', category: 'Victorian Poet' },
  { item: 'Robert Browning', desc: 'Master of the Victorian Dramatic Monologue ("My Last Duchess", "Andrea del Sarto")', category: 'Victorian Poet' },
  { item: 'Matthew Arnold', desc: 'Victorian poet & critic; wrote "Dover Beach" and "The Scholar Gipsy"', category: 'Victorian Poet' },
  { item: 'W. B. Yeats', desc: 'Irish modernist poet & Nobel Laureate (1923); wrote "The Second Coming" and "Sailing to Byzantium"', category: 'Modern Poet' },
  { item: 'T. S. Eliot', desc: 'Modernist poet & Nobel Laureate (1948); wrote "The Waste Land" and "The Love Song of J. Alfred Prufrock"', category: 'Modern Poet' },
  { item: 'George Bernard Shaw', desc: 'Nobel Laureate dramatist (1925); wrote "Pygmalion", "Candida", and "Saint Joan"', category: 'Modern Dramatist' },
  { item: 'Virginia Woolf', desc: 'Modernist pioneer of stream-of-consciousness ("Mrs Dalloway", "To the Lighthouse")', category: 'Modern Novelist' },
  { item: 'D. H. Lawrence', desc: 'Modern British novelist; wrote "Sons and Lovers" and "The Rainbow"', category: 'Modern Novelist' },
  { item: 'Arthur Conan Doyle', desc: 'Physician-author who created the iconic detective Sherlock Holmes', category: 'Fiction Author' },
  { item: 'Anton Chekhov', desc: 'Russian physician & master of modern short stories and drama ("The Cherry Orchard")', category: 'World Literature' },
  { item: 'Gabriel García Márquez', desc: 'Colombian Nobel Laureate (1982); pioneer of Magical Realism ("One Hundred Years of Solitude")', category: 'World Literature' },
  { item: 'Jhumpa Lahiri', desc: 'Pulitzer Prize-winning Bengali-American author ("Interpreter of Maladies", "The Namesake")', category: 'Contemporary Lit' },
  { item: 'Kazi Nazrul Islam (English Trans.)', desc: 'Rebel Poet of Bengal; iconic poem "Bidrohi" celebrates fearless human dignity', category: 'Bengali-English Lit' },
];

// 50 High-Yield Bengali <-> English Translations & Medical/Academic Analogies (× 2 = 100 MCQs)
const TRANS_AND_ANALOGY_2: Array<{
  kind: 'Translation' | 'Analogy';
  q: string;
  a: string;
  wrongs: [string, string, string];
  exp: string;
}> = [
  { kind: 'Translation', q: 'Translate into English: "রোগের চিকিৎসার চেয়ে প্রতিরোধই উত্তম।"', a: 'Prevention is better than cure.', wrongs: ['Prevention is good than cure.', 'Preventing is best than curing.', 'Cure is better than prevention.'], exp: 'প্রচলিত প্রবাদ ও চিকিৎসা নীতি: "Prevention is better than cure."' },
  { kind: 'Translation', q: 'Translate into English: "সকাল থেকে গুঁড়ি গুঁড়ি বৃষ্টি হচ্ছে।"', a: 'It has been drizzling since morning.', wrongs: ['It is drizzling from morning.', 'It drizzles since morning.', 'It has drizzled for morning.'], exp: 'গুঁড়ি গুঁড়ি বৃষ্টি = drizzle; নির্দিষ্ট সময় শুরু বোঝালে Present Perfect Continuous + since বসে।' },
  { kind: 'Translation', q: 'Translate into English: "রোগীটি ডাক্তার আসার আগেই মারা গেল।"', a: 'The patient had died before the doctor came.', wrongs: ['The patient died before the doctor had come.', 'The patient has died before the doctor came.', 'The patient was dying before the doctor came.'], exp: 'অতীতে আগে ঘটে যাওয়া কাজ Past Perfect (had died) ও পরেরটি Past Indefinite (came) হয়।' },
  { kind: 'Translation', q: 'Translate into English: "সে সাঁতার কাটতে জানে না।"', a: 'He does not know how to swim.', wrongs: ['He does not know to swim.', 'He cannot know how to swim.', 'He does not know swimming.'], exp: 'কোনো কাজের কৌশল জানা বোঝাতে "know + how to + V1" ব্যবহৃত হয়।' },
  { kind: 'Translation', q: 'Translate into English: "বিপদ কখনো একা আসে না।"', a: 'Misfortunes never come alone.', wrongs: ['Danger never comes singly.', 'Misfortune do not come one.', 'Trouble never goes alone.'], exp: 'প্রমিত ইংরেজি প্রবাদ: "Misfortunes never come alone."' },
  { kind: 'Translation', q: 'Translate into English: "চিকিৎসক রোগীর নাড়ি দেখলেন।"', a: 'The physician felt the patient’s pulse.', wrongs: ['The physician saw the patient’s pulse.', 'The physician watched the patient’s pulse.', 'The physician looked the patient’s pulse.'], exp: 'নাড়ি দেখা অর্থে ইংরেজিতে "feel the pulse" (বা check the pulse) ব্যবহৃত হয়।' },
  { kind: 'Translation', q: 'Translate into English: "সে কঠোর পরিশ্রম করছে যাতে পরীক্ষায় প্রথম হতে পারে।"', a: 'He is working hard so that he may stand first in the exam.', wrongs: ['He is working hard because he stands first.', 'He worked hard so that he can stand first.', 'He works hard in order to he stands first.'], exp: '"যাতে" বোঝাতে Present clause-এর পর "so that + Sub + may/can + V1" বসে।' },
  { kind: 'Translation', q: 'Translate into English: "মানুষ মাত্রই ভুল করে, ক্ষমা করা স্বর্গীয় গুণ।"', a: 'To err is human; to forgive, divine.', wrongs: ['Man makes error; forgiving is heavenly.', 'Humans always mistake; pardon is divine.', 'To mistake is human; to pardon is godly.'], exp: 'Alexander Pope-এর বিখ্যাত পঙ্‌ক্তি: "To err is human; to forgive, divine."' },
  { kind: 'Translation', q: 'Translate into English: "তুমি কি কখনো কক্সবাজার গিয়েছ?"', a: 'Have you ever been to Cox’s Bazar?', wrongs: ['Did you ever go to Cox’s Bazar?', 'Have you ever gone to Cox’s Bazar?', 'Are you ever going to Cox’s Bazar?'], exp: 'কোনো স্থানে ঘুরে আসার অভিজ্ঞতা বোঝাতে "Have you ever been to..." ব্যবহৃত হয়।' },
  { kind: 'Translation', q: 'Translate into English: "তিন দিন ধরে মুষলধারে বৃষ্টি হচ্ছে।"', a: 'It has been raining cats and dogs for three days.', wrongs: ['It is raining cats and dogs since three days.', 'It rained heavily for three days now.', 'It has rained cats and dogs from three days.'], exp: 'মুষলধারে = cats and dogs; Period of time ("তিন দিন ধরে") বোঝালে "for" বসে।' },
  { kind: 'Translation', q: 'Translate into English: "আমার যদি পাখির মতো ডানা থাকত!"', a: 'Had I the wings of a bird!', wrongs: ['If I have the wings of a bird!', 'Were I have the wings of a bird!', 'Should I had the wings of a bird!'], exp: 'অবাস্তব ইচ্ছা প্রকাশে Exclamatory রূপে "Had I + Noun!" ব্যবহৃত হয়।' },
  { kind: 'Translation', q: 'Translate into English: "কথাটি বলতে লজ্জা কি!"', a: 'There is no shame in speaking the truth.', wrongs: ['What is shame to tell the word!', 'It is not shy to say it.', 'No shame is for telling this.'], exp: 'সহজ ও প্রাঞ্জল অনুবাদ কাঠামো।' },
  { kind: 'Translation', q: 'Translate into English: "সত্য কথা বলতে কী, তিনি একজন অসাধারণ শল্যচিকিৎসক।"', a: 'To tell the truth, he is an extraordinary surgeon.', wrongs: ['Speaking truth, he is a great medicine man.', 'For telling true, he is an uncommon surgeon.', 'Actually speaking, he is surgical doctor.'], exp: '"সত্য কথা বলতে কী" = "To tell the truth" এবং শল্যচিকিৎসক = surgeon।' },
  { kind: 'Translation', q: 'Translate into English: "সে ইংরেজিতে কথা বলতে অভ্যস্ত।"', a: 'He is used to speaking English.', wrongs: ['He used to speak English.', 'He is used to speak English.', 'He used speaking English.'], exp: 'বর্তমানে অভ্যস্ত বোঝাতে "be used to + Verb-ing" বসে।' },
  { kind: 'Translation', q: 'Translate into English: "স্বাস্থ্যই সম্পদ।"', a: 'Health is wealth.', wrongs: ['Healthy is wealthy.', 'Health makes rich.', 'Good health brings money.'], exp: 'প্রবাদবাক্য: "Health is wealth."' },
  { kind: 'Translation', q: 'Translate into Bengali: "Charity begins at home."', a: 'আগে ঘর তবে তো পর (অন্যকে সাহায্যের আগে পরিবারকে দেখা)।', wrongs: ['দান করলে ধন বাড়ে।', 'বাড়িতেই সব দান করা উচিত।', 'ঘর ছেড়ে পরোপকার করতে হয়।'], exp: 'বিখ্যাত প্রবাদের সঠিক বাংলা ভাবানুবাদ: আগে ঘর তবে তো পর।' },
  { kind: 'Translation', q: 'Translate into Bengali: "Necessity is the mother of invention."', a: 'প্রয়োজনই আবিষ্কারের প্রসূতি।', wrongs: ['প্রয়োজন ছাড়া কিছু হয় না।', 'আবিষ্কার করাই সবচেয়ে প্রয়োজন।', 'মা সব কিছু আবিষ্কার করেন।'], exp: 'প্রচলিত প্রবাদ: "প্রয়োজনই আবিষ্কারের প্রসূতি"।' },
  { kind: 'Translation', q: 'Translate into Bengali: "Cut your coat according to your cloth."', a: 'আয় বুঝে ব্যয় কর।', wrongs: ['কাপড় মেপে কোট সেলাই কর।', 'নিজের কাজ নিজে কর।', 'অল্পে তুষ্ট থাকো।'], exp: 'প্রবাদ অর্থ: সামর্থ্য বা আয় অনুযায়ী ব্যয় করা।' },
  { kind: 'Translation', q: 'Translate into Bengali: "Empty vessels sound much."', a: 'অসারের তর্জন গর্জন সার / শূন্য কলসি বাজে বেশি।', wrongs: ['খালি পাত্রে পানি থাকে না।', 'বেশি কথা বললে পাত্র শূন্য হয়।', 'জ্ঞানীরা বেশি শব্দ করেন।'], exp: 'প্রচলিত বাংলা প্রবাদ: শূন্য কলসি বাজে বেশি।' },
  { kind: 'Translation', q: 'Translate into Bengali: "Strike the iron while it is hot."', a: 'ঝোপ বুঝে কোপ মারা (সুযোগের সদ্ব্যবহার করা)।', wrongs: ['গরম লোহায় হাত না দেওয়া।', 'রাগের মাথায় আঘাত করা।', 'কঠিন কাজ দ্রুত শেষ করা।'], exp: 'সঠিক সুযোগে তৎক্ষণাৎ পদক্ষেপ নেওয়া।' },
  // Medical & Academic Analogies
  { kind: 'Analogy', q: 'Osteology : Bones :: Myology : ___', a: 'Muscles', wrongs: ['Blood', 'Nerves', 'Cartilage'], exp: 'Osteology অস্থিবিজ্ঞান ও Myology পেশিবিজ্ঞান।' },
  { kind: 'Analogy', q: 'Pathogen : Disease :: Catalyst : ___', a: 'Reaction', wrongs: ['Symptom', 'Vaccine', 'Antidote'], exp: 'Pathogen রোগ সৃষ্টি/প্রভাবিত করে ও Catalyst রাসায়নিক বিক্রিয়ার বেগ পরিবর্তন করে।' },
  { kind: 'Analogy', q: 'Odometer : Distance :: Spirometer : ___', a: 'Lung capacity', wrongs: ['Heart rate', 'Body weight', 'Blood pressure'], exp: 'Odometer দূরত্ব মাপে ও Spirometer ফুসফুসের বায়ুধারণ ক্ষমতা মাপে।' },
  { kind: 'Analogy', q: 'Hematology : Blood :: Hepatology : ___', a: 'Liver', wrongs: ['Kidney', 'Lung', 'Spleen'], exp: 'Hematology রক্ত-বিষয়ক ও Hepatology যকৃত (লিভার)-বিষয়ক বিদ্যা।' },
  { kind: 'Analogy', q: 'Scalpel : Surgeon :: Gavel : ___', a: 'Judge', wrongs: ['Pharmacist', 'Architect', 'Teacher'], exp: 'Scalpel শল্যচিকিৎসকের যন্ত্র ও Gavel বিচারকের হাতুড়ি।' },
  { kind: 'Analogy', q: 'Alveoli : Lungs :: Nephrons : ___', a: 'Kidneys', wrongs: ['Liver', 'Heart', 'Stomach'], exp: 'Alveoli ফুসফুসের ও Nephrons বৃক্কের গাঠনিক-কার্যকরী একক।' },
  { kind: 'Analogy', q: 'Aphasia : Speech :: Amnesia : ___', a: 'Memory', wrongs: ['Vision', 'Hearing', 'Balance'], exp: 'Aphasia বাকশক্তি হারানো ও Amnesia স্মৃতিশক্তি হারানো।' },
  { kind: 'Analogy', q: 'Vitamin C : Scurvy :: Vitamin D : ___', a: 'Rickets', wrongs: ['Beriberi', 'Pellagra', 'Goiter'], exp: 'ভিটামিন C অভাবে স্কার্ভি ও ভিটামিন D অভাবে রিকেটস হয়।' },
  { kind: 'Analogy', q: 'Prologue : Epilogue :: Dawn : ___', a: 'Dusk', wrongs: ['Noon', 'Midnight', 'Sunrise'], exp: 'বইয়ের শুরু ও শেষ :: দিনের শুরু (ভোর) ও শেষ (সন্ধ্যা)।' },
  { kind: 'Analogy', q: 'Benevolent : Kind :: Malevolent : ___', a: 'Cruel', wrongs: ['Generous', 'Timid', 'Honest'], exp: 'সমার্থক জোড়া: দয়ালু : সদয় :: বিদ্বেষপরায়ণ : নিষ্ঠুর।' },
  { kind: 'Analogy', q: 'Doctor : Stethoscope :: Astronomer : ___', a: 'Telescope', wrongs: ['Microscope', 'Barometer', 'Compass'], exp: 'পেশাজীবী ও তাদের প্রধান যন্ত্র।' },
  { kind: 'Analogy', q: 'Insomnia : Sleep :: Anorexia : ___', a: 'Appetite', wrongs: ['Movement', 'Vision', 'Memory'], exp: 'Insomnia ঘুমের অভাব ও Anorexia ক্ষুধার অভাব বা অরুচি।' },
  { kind: 'Analogy', q: 'Pediatrics : Children :: Geriatrics : ___', a: 'Elderly', wrongs: ['Infants', 'Pregnant women', 'Athletes'], exp: 'শিশু চিকিৎসা বনাম প্রবীণ চিকিৎসা।' },
  { kind: 'Analogy', q: 'Antigen : Antibody :: Lock : ___', a: 'Key', wrongs: ['Door', 'Chain', 'Wall'], exp: 'অ্যান্টিজেন ও অ্যান্টিবডি সুনির্দিষ্ট Lock-and-Key পদ্ধতিতে যুক্ত হয়।' },
  { kind: 'Analogy', q: 'Tachycardia : Fast heart rate :: Bradycardia : ___', a: 'Slow heart rate', wrongs: ['High blood pressure', 'Low blood sugar', 'Rapid breathing'], exp: 'Tachy (দ্রুত) বনাম Brady (ধীর) হৃৎস্পন্দন।' },
];

// 50 Foreign Plurals, Genders, Collective Group Nouns & Animal Cries/Young Ones (× 2 = 100 MCQs)
const MORPHOLOGY_BANK_2: Array<{ kind: string; from: string; to: string; note: string }> = [
  { kind: 'Foreign Plural', from: 'Syllabus', to: 'Syllabi', note: 'ল্যাটিন -us থেকে -i (Syllabi / Syllabuses)' },
  { kind: 'Foreign Plural', from: 'Cactus', to: 'Cacti', note: 'Cactus → Cacti' },
  { kind: 'Foreign Plural', from: 'Fungus', to: 'Fungi', note: 'Fungus (ছত্রাক) → Fungi' },
  { kind: 'Foreign Plural', from: 'Bacillus', to: 'Bacilli', note: 'Bacillus (দণ্ডাকার ব্যাকটেরিয়া) → Bacilli' },
  { kind: 'Foreign Plural', from: 'Coccus', to: 'Cocci', note: 'Coccus (গোলাকার ব্যাকটেরিয়া) → Cocci' },
  { kind: 'Foreign Plural', from: 'Ovum', to: 'Ova', note: 'Ovum → Ova (আগে থাকলেও অন্য ধরন)' },
  { kind: 'Foreign Plural', from: 'Spermatozoon', to: 'Spermatozoa', note: 'গ্রিক -on থেকে -a হয় (Spermatozoa)' },
  { kind: 'Foreign Plural', from: 'Bronchus', to: 'Bronchi', note: 'Bronchus (শ্বাসনালির শাখা) → Bronchi' },
  { kind: 'Foreign Plural', from: 'Atrium', to: 'Atria', note: 'Atrium (হৃৎপিণ্ডের অলিন্দ) → Atria' },
  { kind: 'Foreign Plural', from: 'Cilium', to: 'Cilia', note: 'Cilium → Cilia' },
  { kind: 'Foreign Plural', from: 'Flagellum', to: 'Flagella', note: 'Flagellum → Flagella' },
  { kind: 'Foreign Plural', from: 'Ganglion', to: 'Ganglia', note: 'Ganglion (স্নায়ুগ্রন্থি) → Ganglia' },
  { kind: 'Foreign Plural', from: 'Pharynx', to: 'Pharynges', note: 'Pharynx → Pharynges / Pharynxes' },
  { kind: 'Foreign Plural', from: 'Apex', to: 'Apices', note: '-ex → -ices (Apices)' },
  { kind: 'Foreign Plural', from: 'Cortex', to: 'Cortices', note: 'Cortex → Cortices' },
  { kind: 'Foreign Plural', from: 'Vortex', to: 'Vortices', note: 'Vortex → Vortices' },
  { kind: 'Foreign Plural', from: 'Parenthesis', to: 'Parentheses', note: '-is → -es (Parentheses)' },
  { kind: 'Foreign Plural', from: 'Neurosis', to: 'Neuroses', note: 'Neurosis → Neuroses' },
  { kind: 'Foreign Plural', from: 'Prosthesis', to: 'Prostheses', note: 'Prosthesis (কৃত্রিম অঙ্গ) → Prostheses' },
  { kind: 'Foreign Plural', from: 'Metastasis', to: 'Metastases', note: 'Metastasis → Metastases' },
  { kind: 'Foreign Plural', from: 'Bureau', to: 'Bureaux', note: 'ফরাসি -eau → -eaux (Bureaux / Bureaus)' },
  { kind: 'Foreign Plural', from: 'Plateau', to: 'Plateaux', note: 'Plateau → Plateaux' },
  { kind: 'Foreign Plural', from: 'Genus', to: 'Genera', note: 'Genus (গণ) → Genera (গুরুত্বপূর্ণ ব্যতিক্রম!)' },
  { kind: 'Foreign Plural', from: 'Corpus', to: 'Corpora', note: 'Corpus → Corpora (যেমন Corpora quadrigemina)' },
  { kind: 'Foreign Plural', from: 'Phalanx', to: 'Phalanges', note: 'Phalanx (আঙুলের অস্থি) → Phalanges' },
  { kind: 'Gender Pair', from: 'Alumnus', to: 'Alumna', note: 'প্রাক্তন ছাত্র (Alumnus) → প্রাক্তন ছাত্রী (Alumna)' },
  { kind: 'Gender Pair', from: 'Testator', to: 'Testatrix', note: 'উইলকারী পুরুষ → স্ত্রী' },
  { kind: 'Gender Pair', from: 'Proprietor', to: 'Proprietress', note: 'মালিক → মহিলা মালিক' },
  { kind: 'Gender Pair', from: 'Duke', to: 'Duchess', note: 'Duke → Duchess' },
  { kind: 'Gender Pair', from: 'Earl', to: 'Countess', note: 'Earl (ব্রিটিশ অভিজাত) → Countess' },
  { kind: 'Gender Pair', from: 'Stallion', to: 'Mare', note: 'পুরুষ ঘোড়া (Stallion) → ঘোটকী (Mare)' },
  { kind: 'Gender Pair', from: 'Bull', to: 'Cow', note: 'Bull → Cow' },
  { kind: 'Gender Pair', from: 'Rooster', to: 'Hen', note: 'মোরগ → মুরগি' },
  { kind: 'Gender Pair', from: 'Buck', to: 'Doe', note: 'পুরুষ হরিণ/খরগোশ (Buck) → স্ত্রী (Doe)' },
  { kind: 'Gender Pair', from: 'Drone', to: 'Bee', note: 'পুরুষ মৌমাছি (Drone) → স্ত্রী/রানি মৌমাছি (Queen Bee)' },
  { kind: 'Collective Group', from: 'A pride of', to: 'Lions', note: 'সিংহের দলকে Pride বলে' },
  { kind: 'Collective Group', from: 'A school / shoal of', to: 'Fish', note: 'মাছের ঝাঁককে School বা Shoal বলে' },
  { kind: 'Collective Group', from: 'A murder of', to: 'Crows', note: 'কাকের ঝাঁককে Murder বলে' },
  { kind: 'Collective Group', from: 'A parliament of', to: 'Owls', note: 'প্যাঁচার দলকে Parliament বলে' },
  { kind: 'Collective Group', from: 'A swarm of', to: 'Bees / Insects', note: 'মৌমাছি বা পোকামাকড়ের ঝাঁক' },
  { kind: 'Collective Group', from: 'A flock of', to: 'Sheep / Birds', note: 'ভেড়া বা পাখির পাল' },
  { kind: 'Collective Group', from: 'A fleet of', to: 'Ships', note: 'জাহাজের বহর' },
  { kind: 'Collective Group', from: 'A constellation of', to: 'Stars', note: 'নক্ষত্রমণ্ডলী' },
  { kind: 'Collective Group', from: 'A board of', to: 'Directors / Examiners', note: 'পরিচালক বা পরীক্ষক পর্ষদ' },
  { kind: 'Collective Group', from: 'A panel of', to: 'Doctors / Experts', note: 'বিশেষজ্ঞ চিকিৎসক দল' },
  { kind: 'Animal Young', from: 'Deer', to: 'Fawn', note: 'হরিণের শাবককে Fawn বলে' },
  { kind: 'Animal Young', from: 'Horse', to: 'Foal / Colt', note: 'ঘোড়ার শাবককে Foal বলে' },
  { kind: 'Animal Young', from: 'Frog', to: 'Tadpole', note: 'ব্যাঙের লার্ভা/বাচ্চাকে Tadpole (ব্যাঙাচি) বলে' },
  { kind: 'Animal Young', from: 'Swan', to: 'Cygnet', note: 'রাজহাঁসের বাচ্চাকে Cygnet বলে' },
  { kind: 'Animal Young', from: 'Kangaroo', to: 'Joey', note: 'ক্যাঙ্গারুর বাচ্চাকে Joey বলে' },
];

export function buildEngStructuredI(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `esi_${String(seq++).padStart(4, '0')}`;

  // 1. 70 Medical Roots/Prefixes/Suffixes/Specialists × 2 = 140 MCQs
  MED_ROOTS_BANK.forEach((m, i) => {
    const others = MED_ROOTS_BANK.filter((x) => x.root !== m.root && x.meaning !== m.meaning);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `In medical English terminology, what does "${m.root}" denote?`,
        correct: m.meaning,
        distractors: others.slice(i % 30, (i % 30) + 7).map((x) => x.meaning),
        explanation: `"${m.root}"-এর অর্থ "${m.meaning}"। উদাহরণ: ${m.example}।`,
        reference: 'Medical Terminology · Roots & Specialists',
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
        question: `Which medical term, prefix, suffix, or specialist corresponds to "${m.meaning}"?`,
        correct: m.root,
        distractors: others.slice((i + 20) % 30, ((i + 20) % 30) + 7).map((x) => x.root),
        explanation: `"${m.meaning}" প্রকাশক মূল/পরিভাষা হলো "${m.root}" (${m.example})।`,
        reference: 'Medical Terminology · Reverse Lookup',
      })
    );
  });

  // 2. 65 One-Word Substitutions, Phobias, Manias & Ologies × 2 = 130 MCQs
  ONE_WORD_BANK_2.forEach((ow, i) => {
    const others = ONE_WORD_BANK_2.filter((x) => x.term !== ow.term);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `Give the exact single word for: "${ow.def}"`,
        correct: ow.term,
        distractors: others.slice(i % 30, (i % 30) + 7).map((x) => x.term),
        explanation: `"${ow.def}"-এর এককথায় প্রকাশ "${ow.term}" (${ow.bn})।`,
        reference: 'Medical Admission English · One-Word Substitution II',
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
        question: `What does the term "${ow.term}" (${ow.bn}) signify?`,
        correct: ow.def,
        distractors: others.slice((i + 15) % 30, ((i + 15) % 30) + 7).map((x) => x.def),
        explanation: `${ow.term} (${ow.bn}): ${ow.def}।`,
        reference: 'Medical Admission English · Term Definition II',
      })
    );
  });

  // 3. 45 Literature & Figures of Speech × 2 = 90 MCQs
  LIT_TERMS_AND_AUTHORS.forEach((lt, i) => {
    const others = LIT_TERMS_AND_AUTHORS.filter((x) => x.item !== lt.item);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `Identify the literary term or author described here: "${lt.desc}"`,
        correct: lt.item,
        distractors: others.slice(i % 20, (i % 20) + 7).map((x) => x.item),
        explanation: `${lt.item} (${lt.category}): ${lt.desc}।`,
        reference: `English Literature · ${lt.category}`,
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
        question: `Which description accurately defines "${lt.item}"?`,
        correct: lt.desc,
        distractors: others.slice((i + 10) % 20, ((i + 10) % 20) + 7).map((x) => x.desc),
        explanation: `${lt.item}: ${lt.desc}।`,
        reference: `English Literature · Literary Concepts`,
      })
    );
  });

  // 4. 35 Translation & Analogy items = 35 MCQs
  TRANS_AND_ANALOGY_2.forEach((item, i) => {
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: item.kind === 'Analogy' ? `Complete the analogy: ${item.q}` : item.q,
        correct: item.a,
        distractors: item.wrongs,
        explanation: item.exp,
        reference: `Medical Admission English · ${item.kind}`,
      })
    );
  });

  // 5. 50 Morphology (Foreign Plurals, Genders, Collective Nouns, Animal Youngs) × 2 = 100 MCQs
  MORPHOLOGY_BANK_2.forEach((mp, i) => {
    const sameKind = MORPHOLOGY_BANK_2.filter((x) => x.kind === mp.kind && x.to !== mp.to);
    const pool = sameKind.length >= 4 ? sameKind : MORPHOLOGY_BANK_2.filter((x) => x.to !== mp.to);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `[${mp.kind}] Select the correct match/form for "${mp.from}":`,
        correct: mp.to,
        distractors: pool.slice(i % Math.max(1, pool.length - 4), (i % Math.max(1, pool.length - 4)) + 5).map((x) => x.to),
        explanation: `${mp.from} → ${mp.to}। ব্যাখ্যা: ${mp.note}।`,
        reference: `Medical Admission English · ${mp.kind}`,
      })
    );

    const revPool = MORPHOLOGY_BANK_2.filter((x) => x.from !== mp.from && x.kind === mp.kind);
    const revFallback = revPool.length >= 4 ? revPool : MORPHOLOGY_BANK_2.filter((x) => x.from !== mp.from);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'eng',
        medicalGroup: 'eng',
        chapterId: 'eng_med_lit_trans',
        visualLessonId: 'english_grammar',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `[${mp.kind}] Which base word or group prefix corresponds to "${mp.to}"?`,
        correct: mp.from,
        distractors: revFallback.slice(0, 5).map((x) => x.from),
        explanation: `${mp.from} → ${mp.to} (${mp.note})।`,
        reference: `Medical Admission English · ${mp.kind} Reverse`,
      })
    );
  });

  return list;
}
