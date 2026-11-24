import { McqQuestion } from '../types/learning';
import { buildMcq } from './bioQuestionHelpers';

// General Knowledge Structured Pool P (~480+ high-yield admission MCQs)
// Covers: UN SDGs (17 goals), Major Disease Pathogens & Vaccines, Important National & International Days,
// World Treaties & Summits, Famous Monuments/Museums/Wonders, Airlines/Intelligence/Defense, Bangladesh Awards & Culture

interface SdgEntry {
  goalNo: string;
  focus: string;
  targetNote: string;
}

const UN_SDG_GOALS: SdgEntry[] = [
  { goalNo: 'SDG-1 (প্রথম লক্ষ্য)', focus: 'দারিদ্র্য বিলোপ (No Poverty — সর্বত্র সব ধরনের দারিদ্র্যের অবসান)', targetNote: '২০৩০ সালের মধ্যে চরম দারিদ্র্য নির্মূল' },
  { goalNo: 'SDG-2 (দ্বিতীয় লক্ষ্য)', focus: 'ক্ষুধা মুক্তি (Zero Hunger — খাদ্য নিরাপত্তা ও টেকসই কৃষি)', targetNote: 'অপুষ্টি দূর ও নিরাপদ পুষ্টিকর খাদ্য নিশ্চিতকরণ' },
  { goalNo: 'SDG-3 (তৃতীয় লক্ষ্য)', focus: 'সুস্বাস্থ্য ও কল্যাণ (Good Health and Well-being — সব বয়সী মানুষের সুস্থ জীবন)', targetNote: 'মাতৃ ও শিশুমৃত্যু হ্রাস এবং সর্বজনীন স্বাস্থ্যসেবা' },
  { goalNo: 'SDG-4 (চতুর্থ লক্ষ্য)', focus: 'গুণগত শিক্ষা (Quality Education — অন্তর্ভুক্তিমূলক ও সমতাভিত্তিক মানসম্মত শিক্ষা)', targetNote: 'সবার জন্য আজীবন শিক্ষার সুযোগ সৃষ্টি' },
  { goalNo: 'SDG-5 (পঞ্চম লক্ষ্য)', focus: 'জেন্ডার সমতা (Gender Equality — নারী ও কন্যাশিশুর ক্ষমতায়ন)', targetNote: 'নারীর প্রতি সকল বৈষম্য ও সহিংসতা বিলোপ' },
  { goalNo: 'SDG-6 (ষষ্ঠ লক্ষ্য)', focus: 'নিরাপদ পানি ও পয়ঃনিষ্কাশন (Clean Water and Sanitation)', targetNote: 'সবার জন্য বিশুদ্ধ খাবার পানি ও স্যানিটেশন ব্যবস্থা' },
  { goalNo: 'SDG-7 (সপ্তম লক্ষ্য)', focus: 'সাশ্রয়ী ও দূষণমুক্ত জ্বালানি (Affordable and Clean Energy)', targetNote: 'নবায়নযোগ্য জ্বালানির অংশীদারিত্ব বৃদ্ধি' },
  { goalNo: 'SDG-8 (অষ্টম লক্ষ্য)', focus: 'শোভন কাজ ও অর্থনৈতিক প্রবৃদ্ধি (Decent Work and Economic Growth)', targetNote: 'টেকসই প্রবৃদ্ধি ও পূর্ণ কর্মসংস্থান' },
  { goalNo: 'SDG-9 (নবম লক্ষ্য)', focus: 'শিল্প, উদ্ভাবন ও অবকাঠামো (Industry, Innovation and Infrastructure)', targetNote: 'সহনশীল অবকাঠামো ও টেকসই শিল্পায়ন' },
  { goalNo: 'SDG-10 (দশম লক্ষ্য)', focus: 'অসমতা হ্রাস (Reduced Inequalities — দেশের অভ্যন্তরে ও দেশগুলোর মধ্যে)', targetNote: 'আয়বৈষম্য ও সামাজিক বৈষম্য কমানো' },
  { goalNo: 'SDG-11 (একাদশ লক্ষ্য)', focus: 'টেকসই নগর ও জনপদ (Sustainable Cities and Communities)', targetNote: 'নিরাপদ আবাসন ও নগর পরিবহন ব্যবস্থা' },
  { goalNo: 'SDG-12 (দ্বাদশ লক্ষ্য)', focus: 'পরিমিত ভোগ ও উৎপাদন (Responsible Consumption and Production)', targetNote: 'খাদ্য অপচয় ও বর্জ্য হ্রাস' },
  { goalNo: 'SDG-13 (ত্রয়োদশ লক্ষ্য)', focus: 'জলবায়ু কার্যক্রম (Climate Action — জলবায়ু পরিবর্তন মোকাবিলায় জরুরি পদক্ষেপ)', targetNote: 'প্যারিস জলবায়ু চুক্তি ও গ্রিনহাউস গ্যাস নিয়ন্ত্রণ' },
  { goalNo: 'SDG-14 (চতুর্দশ লক্ষ্য)', focus: 'জলজ জীবন (Life Below Water — মহাসাগর, সাগর ও সামুদ্রিক সম্পদ সংরক্ষণ)', targetNote: 'সুনীল অর্থনীতি (Blue Economy) ও সামুদ্রিক বাস্তুতন্ত্র সুরক্ষা' },
  { goalNo: 'SDG-15 (পঞ্চদশ লক্ষ্য)', focus: 'স্থলজ জীবন (Life on Land — বনাঞ্চল রক্ষা, মরুকরণ রোধ ও জীববৈচিত্র্য)', targetNote: 'বন উজাড় ও প্রজাতি বিলুপ্তি প্রতিরোধ' },
  { goalNo: 'SDG-16 (ষোড়শ লক্ষ্য)', focus: 'শান্তি, ন্যায়বিচার ও কার্যকর প্রতিষ্ঠান (Peace, Justice and Strong Institutions)', targetNote: 'আইনের শাসন, মানবাধিকার ও দুর্নীতি দমন' },
  { goalNo: 'SDG-17 (সপ্তদশ লক্ষ্য)', focus: 'লক্ষ্যমাত্রা অর্জনে অংশীদারিত্ব (Partnerships for the Goals)', targetNote: 'বৈশ্বিক উন্নয়ন সহযোগিতা ও প্রযুক্তি হস্তান্তর' },
];

interface PathogenVaccineEntry {
  disease: string;
  agentOrVaccine: string;
  detail: string;
}

const DISEASE_VACCINE_MATRIX: PathogenVaccineEntry[] = [
  { disease: 'ডিপথেরিয়া (Diphtheria)', agentOrVaccine: 'Corynebacterium diphtheriae ব্যাকটেরিয়া (টিকা: DPT / Pentavalent)', detail: 'গলায় ছদ্ম-ঝিল্লি সৃষ্টি করে শ্বাসরোধ ঘটায়' },
  { disease: 'টিটেনাস বা ধনুষ্টংকার (Tetanus)', agentOrVaccine: 'Clostridium tetani ব্যাকটেরিয়া (টিকা: TT / DPT)', detail: 'মাংসপেশিতে তীব্র খিঁচুনি (Lockjaw) সৃষ্টি করে' },
  { disease: 'হুপিং কাশি (Pertussis)', agentOrVaccine: 'Bordetella pertussis ব্যাকটেরিয়া (টিকা: DPT)', detail: 'শিশুদের তীব্র ও দীর্ঘস্থায়ী দমকা কাশি ঘটায়' },
  { disease: 'পোলিও (Poliomyelitis)', agentOrVaccine: 'পোলিওভাইরাস (টিকা: OPV মুখে খাওয়ার ও IPV ইনজেকশন)', detail: 'স্নায়ুতন্ত্রে আক্রমণ করে পক্ষাঘাত (Paralysis) ঘটায়' },
  { disease: 'হাম (Measles)', agentOrVaccine: 'মরবিলিভাইরাস / Paramyxovirus (টিকা: MR / MMR)', detail: 'জ্বর, কাশি ও সারা শরীরে লাল র‍্যাশ দেখা দেয়' },
  { disease: 'রুবেলা বা জার্মান হাম (Rubella)', agentOrVaccine: 'রুবেলা ভাইরাস (টিকা: MR / MMR)', detail: 'গর্ভাবস্থায় ভ্রূণের জন্মগত ত্রুটি (CRS) ঘটাতে পারে' },
  { disease: 'মাম্পস (Mumps)', agentOrVaccine: 'মাম্পস ভাইরাস (টিকা: MMR)', detail: 'প্যারোটিড লালাগ্রন্থি (Parotid gland) ফুলে প্রদাহ হয়' },
  { disease: 'জলাতঙ্ক (Rabies)', agentOrVaccine: 'র‍্যাবিস ভাইরাস / Lyssavirus (আবিষ্কারক: লুই পাস্তুর)', detail: 'পাগলা কুকুর/বিড়ালের কামড়ে ছড়ায় ও হাইড্রোফোবিয়া হয়' },
  { disease: 'কলেরা (Cholera)', agentOrVaccine: 'Vibrio cholerae ব্যাকটেরিয়া (জীবাণুর আকৃতি কমা-সদৃশ)', detail: 'দূষিত পানি ও খাদ্যে ছড়িয়ে চাল-ধোয়া পানির মতো ডায়রিয়া ঘটায়' },
  { disease: 'টাইফয়েড জ্বর (Typhoid Fever)', agentOrVaccine: 'Salmonella enterica serovar Typhi ব্যাকটেরিয়া', detail: 'রোগ নির্ণয়ে Widal test ও রক্ত কালচার করা হয়' },
  { disease: 'প্লেগ বা ব্ল্যাক ডেথ (Plague)', agentOrVaccine: 'Yersinia pestis ব্যাকটেরিয়া (বাহক: ইঁদুরের গায়ে থাকা ফ্লি পোকা)', detail: 'মধ্যযুগে ইউরোপে "Black Death" নামে মহামারি ঘটিয়েছিল' },
  { disease: 'কুষ্ঠরোগ বা হ্যানসেন রোগ (Leprosy)', agentOrVaccine: 'Mycobacterium leprae ব্যাকটেরিয়া (আবিষ্কারক: জি এ হ্যানসেন)', detail: 'চামড়া ও প্রান্তীয় স্নায়ুতে অনুভূতি লোপ পায়; চিকিৎসা MDT' },
  { disease: 'অ্যানথ্রাক্স বা তড়কা (Anthrax)', agentOrVaccine: 'Bacillus anthracis ব্যাকটেরিয়া (টিকা: লুই পাস্তুর)', detail: 'গবাদিপশু থেকে মানুষের ত্বক বা ফুসফুসে সংক্রমিত হয়' },
  { disease: 'গুটিবসন্ত (Smallpox)', agentOrVaccine: 'Variola virus (বিশ্ব থেকে প্রথম নির্মূল হওয়া মানব রোগ, ১৯৮০)', detail: 'এডওয়ার্ড জেনার ১৭৯৬ সালে এর টিকা আবিষ্কার করেন' },
  { disease: 'জলবসন্ত (Chickenpox)', agentOrVaccine: 'Varicella-Zoster virus (VZV)', detail: 'ত্বকে তরলপূর্ণ ফোসকা হয়; পরবর্তীতে শিংগলস হতে পারে' },
  { disease: 'হেপাটাইটিস-বি (Hepatitis B)', agentOrVaccine: 'HBV ভাইরাস (যকৃত/লিভার সিরোসিস ও ক্যান্সারের ঝুঁকি)', detail: 'রক্ত, সুই ও মাতৃগর্ভ থেকে ছড়ায়; EPI সূচিতে টিকা রয়েছে' },
  { disease: 'সার্ভিকাল ক্যান্সার (জরায়ুমুখের ক্যান্সার)', agentOrVaccine: 'Human Papillomavirus (HPV টিকা)', detail: 'বাংলাদেশে কিশোরীদের জন্য বিনামূল্যে HPV টিকাদান চালু হয়েছে' },
  { disease: 'সিফিলিস (Syphilis)', agentOrVaccine: 'Treponema pallidum স্পাইরোকেট ব্যাকটেরিয়া', detail: 'যৌনবাহিত রোগ (STD); শনাক্তকরণে VDRL ও TPHA টেস্ট হয়' },
  { disease: 'গনোরিয়া (Gonorrhoea)', agentOrVaccine: 'Neisseria gonorrhoeae ব্যাকটেরিয়া', detail: 'যৌনবাহিত ব্যাকটেরিয়াল সংক্রমণ; মূত্রনালিতে প্রদাহ ঘটায়' },
  { disease: 'ম্যালেরিয়া (Malaria)', agentOrVaccine: 'Plasmodium প্রোটোজোয়া (P. falciparum সর্বাধিক মারাত্মক)', detail: 'স্ত্রী অ্যানোফিলিস মশা বাহক; কুইনাইন/আর্টেমিসিনিন ওষুধ' },
  { disease: 'অ্যামিবিয়াসিস / রক্ত আমাশয়', agentOrVaccine: 'Entamoeba histolytica প্রোটোজোয়া', detail: 'বৃহদন্ত্রে ক্ষত সৃষ্টি করে; ওষুধ মেট্রোনিডাজল' },
  { disease: 'চিকুনগুনিয়া ও ডেঙ্গু', agentOrVaccine: 'Chikungunya virus (Alphavirus) ও Dengue virus (Flavivirus)', detail: 'উভয়ের প্রধান বাহক Aedes aegypti মশা (দিনের বেলায় কামড়ায়)' },
  { disease: 'জিকা ভাইরাস (Zika Virus)', agentOrVaccine: 'Flavivirus (নবজাতকের Microcephaly ঘটাতে পারে)', detail: 'এডিস মশা বাহিত; গর্ভবতীদের জন্য বিশেষ ঝুঁকিপূর্ণ' },
  { disease: 'ইনফ্লুয়েঞ্জা ও বার্ড ফ্লু', agentOrVaccine: 'Influenza A ভাইরাস (বার্ড ফ্লু: H5N1, সোয়াইন ফ্লু: H1N1)', detail: 'শ্বাসতন্ত্রের তীব্র ভাইরাসজনিত সংক্রমণ' },
  { disease: 'হামের মতো শ্বাসরোগ RSV', agentOrVaccine: 'Respiratory Syncytial Virus', detail: 'নবজাতক ও শিশুদের ব্রঙ্কিওলাইটিস ও নিউমোনিয়ার প্রধান কারণ' },
  { disease: 'কালাজ্বর (Visceral Leishmaniasis)', agentOrVaccine: 'Leishmania donovani (বাংলাদেশ বিশ্বে প্রথম নির্মূলের স্বীকৃতি পায় ২০২৩)', detail: 'বেলেমাছি (Phlebotomus) দ্বারা ছড়ায়; প্লীহা ও যকৃত বড় হয়' },
  { disease: 'গোদ রোগ / লিম্ফ্যাটিক ফাইলেরিয়াসিস', agentOrVaccine: 'Wuchereria bancrofti কৃমি (বাহক: কিউলেক্স মশা)', detail: 'লসিকা নালি বন্ধ হয়ে পা বা অঙ্গ অস্বাভাবিক ফুলে যায়' },
  { disease: 'রিউম্যাটিক ফিভার (বাতজ্বর)', agentOrVaccine: 'Group A Beta-hemolytic Streptococcus ব্যাকটেরিয়া', detail: 'চিকিৎসাবিহীন গলাব্যথা থেকে হৃৎপিণ্ডের ভালভ ক্ষতিগ্রস্ত হতে পারে' },
  { disease: 'পেপটিক আলসার ও গ্যাস্ট্রাইটিস', agentOrVaccine: 'Helicobacter pylori ব্যাকটেরিয়া (আবিষ্কারক: মার্শাল ও ওয়ারেন)', detail: 'পাকস্থলী ও ডিওডেনামে ক্ষত সৃষ্টি করে (২০০৫ নোবেল পুরস্কার)' },
  { disease: 'ইবোলা ভাইরাস রোগ (EVD)', agentOrVaccine: 'Ebolavirus (অত্যন্ত উচ্চ মৃত্যুহারের রক্তক্ষরণজনিত জ্বর)', detail: 'আফ্রিকায় প্রথম শনাক্ত (১৯৭৬); দেহরসের সংস্পর্শে ছড়ায়' },
];

interface MonumentMuseumEntry {
  name: string;
  placeAndFact: string;
  chapter: 'gk_bangladesh' | 'gk_bd_geo_economy' | 'gk_health_intl';
}

const FAMOUS_PLACES_AND_DAYS: MonumentMuseumEntry[] = [
  // World wonders, museums, monuments & treaties
  { name: 'ল্যুভর জাদুঘর (Louvre Museum)', placeAndFact: 'প্যারিস, ফ্রান্স (বিশ্বের সর্বাধিক দর্শনার্থীসমৃদ্ধ জাদুঘর; মোনালিসা সংরক্ষিত)', chapter: 'gk_health_intl' },
  { name: 'ব্রিটিশ মিউজিয়াম (British Museum)', placeAndFact: 'লন্ডন, যুক্তরাজ্য (রোজ়েটা স্টোন ও মিসরীয় মমি সংরক্ষিত)', chapter: 'gk_health_intl' },
  { name: 'হার্মিটেজ জাদুঘর (State Hermitage Museum)', placeAndFact: 'সেন্ট পিটার্সবার্গ, রাশিয়া (বিশ্বের বৃহত্তম শিল্প জাদুঘরগুলোর একটি)', chapter: 'gk_health_intl' },
  { name: 'মেট্রোপলিটন মিউজিয়াম অব আর্ট (The Met)', placeAndFact: 'নিউইয়র্ক, যুক্তরাষ্ট্র', chapter: 'gk_health_intl' },
  { name: 'মাচু পিচু (Machu Picchu)', placeAndFact: 'পেরু (ইনকা সভ্যতার ধ্বংসাবশেষ, আন্দিজ পর্বতমালা)', chapter: 'gk_health_intl' },
  { name: 'চিচেন ইৎজা (Chichen Itza)', placeAndFact: 'মেক্সিকো (মায়া সভ্যতার বিখ্যাত ধাপ-পিরামিড)', chapter: 'gk_health_intl' },
  { name: 'পেত্রা (Petra — Rose City)', placeAndFact: 'জর্ডান (নাবাতিয়ানদের পাহাড় কেটে তৈরি প্রাচীন নগরী)', chapter: 'gk_health_intl' },
  { name: 'কলোসিয়াম (Colosseum)', placeAndFact: 'রোম, ইতালি (প্রাচীন রোমান অ্যাম্ফিথিয়েটার)', chapter: 'gk_health_intl' },
  { name: 'ক্রাইস্ট দ্য রিডিমার (Christ the Redeemer)', placeAndFact: 'রিও ডি জেনিরো, ব্রাজিল (আধুনিক সপ্তাশ্চর্যের একটি)', chapter: 'gk_health_intl' },
  { name: 'গিজার মহাপিরামিড (Great Pyramid of Giza)', placeAndFact: 'মিশর (প্রাচীন সপ্তাশ্চর্যের একমাত্র টিকে থাকা স্থাপনা)', chapter: 'gk_health_intl' },
  { name: 'আংকোর ওয়াট (Angkor Wat)', placeAndFact: 'কম্বোডিয়া (বিশ্বের বৃহত্তম ধর্মীয় মন্দির কমপ্লেক্স)', chapter: 'gk_health_intl' },
  { name: 'হাজিয়া সোফিয়া (Hagia Sophia)', placeAndFact: 'ইস্তানবুল, তুরস্ক (বসফরাস প্রণালীর তীরে ঐতিহাসিক স্থাপনা)', chapter: 'gk_health_intl' },
  { name: 'স্ট্যাচু অব লিবার্টি (Statue of Liberty)', placeAndFact: 'নিউইয়র্ক হারবার, যুক্তরাষ্ট্র (১৮৮৬ সালে ফ্রান্স উপহার দেয়)', chapter: 'gk_health_intl' },
  { name: 'তাজমহল (Taj Mahal)', placeAndFact: 'আগ্রা, ভারত (যমুনা নদীর তীরে; স্থপতি ওস্তাদ আহমাদ লাহোরি)', chapter: 'gk_health_intl' },
  { name: 'চীনের মহাপ্রাচীর (Great Wall of China)', placeAndFact: 'উত্তর চীন (বিশ্বের দীর্ঘতম প্রাচীর ও আধুনিক সপ্তাশ্চর্য)', chapter: 'gk_health_intl' },
  { name: 'আল-আকসা মসজিদ ও ডোম অব দ্য রক', placeAndFact: 'জেরুজালেম, ফিলিস্তিন', chapter: 'gk_health_intl' },
  { name: 'ব্যাংকক ঘোষণা (Bangkok Declaration — ১৯৬৭)', placeAndFact: 'যার মাধ্যমে ASEAN (দক্ষিণ-পূর্ব এশীয় জাতিসংঘ) প্রতিষ্ঠিত হয়', chapter: 'gk_health_intl' },
  { name: 'ম্যাস্ট্রিক্ট চুক্তি (Maastricht Treaty — ১৯৯২)', placeAndFact: 'যার মাধ্যমে ইউরোপীয় ইউনিয়ন (EU) আনুষ্ঠানিকভাবে গঠিত ও ইউরো মুদ্রার ভিত্তি রচিত হয়', chapter: 'gk_health_intl' },
  { name: 'ওয়েস্টফালিয়া শান্তি চুক্তি (Peace of Westphalia — ১৬৪৮)', placeAndFact: 'আধুনিক সার্বভৌম জাতি-রাষ্ট্র ব্যবস্থার (Nation-State) সূচনা করে', chapter: 'gk_health_intl' },
  { name: 'ম্যাগনা কার্টা (Magna Carta — ১৫ জুন ১২১৫)', placeAndFact: 'ইংল্যান্ডের রাজা জন কর্তৃক স্বাক্ষরিত ব্যক্তিস্বাধীনতা ও আইনের শাসনের প্রথম মহাসনদ', chapter: 'gk_health_intl' },
  { name: 'ভার্সাই চুক্তি (Treaty of Versailles — ১৯১৯)', placeAndFact: 'প্রথম বিশ্বযুদ্ধের আনুষ্ঠানিক সমাপ্তি ও লিগ অব নেশনস গঠনের ভিত্তি', chapter: 'gk_health_intl' },
  { name: 'ইয়াল্টা সম্মেলন (Yalta Conference — ১৯৪৫)', placeAndFact: 'রুজভেল্ট, চার্চিল ও স্তালিনের মধ্যে দ্বিতীয় বিশ্বযুদ্ধ-উত্তর বিশ্বব্যবস্থা ও UN গঠনের চুক্তি', chapter: 'gk_health_intl' },
  { name: 'ব্রেটন উডস সম্মেলন (Bretton Woods — ১৯৪৪)', placeAndFact: 'IMF এবং বিশ্বব্যাংক (IBRD) প্রতিষ্ঠার ভিত্তি সম্মেলন', chapter: 'gk_health_intl' },
  { name: 'জেনেভা কনভেনশন (Geneva Conventions — ১৯৪৯)', placeAndFact: 'যুদ্ধক্ষেত্রে আহত সৈনিক, যুদ্ধবন্দি ও বেসামরিক নাগরিকদের মানবিক সুরক্ষার আন্তর্জাতিক আইন', chapter: 'gk_health_intl' },
  { name: 'মন্ট্রিল প্রোটোকল (Montreal Protocol — ১৯৮৭)', placeAndFact: 'ওজোন স্তর ক্ষয়কারী CFC ও হ্যালন গ্যাস নিষিদ্ধ করার সফল পরিবেশ চুক্তি', chapter: 'gk_health_intl' },
  { name: 'কিয়োটো প্রোটোকল (Kyoto Protocol — ১৯৯৭)', placeAndFact: 'জাপানের কিয়োটোতে গৃহীত গ্রিনহাউস গ্যাস নিঃসরণ কমানোর বাধ্যতামূলক চুক্তি', chapter: 'gk_health_intl' },
  { name: 'প্যারিস জলবায়ু চুক্তি (Paris Agreement — ২০১৫)', placeAndFact: 'বৈশ্বিক উষ্ণতা প্রাক-শিল্প স্তরের তুলনায় ১.৫°C–২°C-এর নিচে রাখার চুক্তি (COP-21)', chapter: 'gk_health_intl' },
  { name: 'বান্দুং সম্মেলন (Bandung Conference — ১৯৫৫)', placeAndFact: 'জোট-নিরপেক্ষ আন্দোলন (NAM)-এর ভিত্তি রচনাকারী এশীয়-আফ্রিকান সম্মেলন', chapter: 'gk_health_intl' },
  { name: 'ক্যাম্প ডেভিড চুক্তি (Camp David Accords — ১৯৭৮)', placeAndFact: 'মিশর (আনোয়ার সাদাত) ও ইসরায়েল (মেনাহেম বেগিন)-এর শান্তি চুক্তি', chapter: 'gk_health_intl' },
  { name: 'ডেটন শান্তি চুক্তি (Dayton Agreement — ১৯৯৫)', placeAndFact: 'বসনিয়া যুদ্ধের অবসান ঘটানো চুক্তি (যুক্তরাষ্ট্রের ওহাইওতে স্বাক্ষরিত)', chapter: 'gk_health_intl' },
  { name: 'গুড ফ্রাইডে চুক্তি (Good Friday Agreement — ১৯৯৮)', placeAndFact: 'উত্তর আয়ারল্যান্ডের দীর্ঘ সংঘাতের অবসান ঘটায়', chapter: 'gk_health_intl' },
  { name: 'তাসখন্দ চুক্তি (Tashkent Declaration — ১৯৬৬)', placeAndFact: '১৯৬৫ সালের ভারত-পাকিস্তান যুদ্ধের পর লাল বাহাদুর শাস্ত্রী ও আইয়ুব খানের মধ্যে স্বাক্ষরিত', chapter: 'gk_health_intl' },
  { name: 'শিমলা চুক্তি (Simla Agreement — ১৯৭২)', placeAndFact: '১৯৭১-এর যুদ্ধ পরবর্তী ভারতের ইন্দিরা গান্ধী ও পাকিস্তানের জুলফিকার আলী ভুট্টোর চুক্তি', chapter: 'gk_health_intl' },
  // Important Days & Observances (BD & World)
  { name: '১০ই জানুয়ারি (স্বদেশ প্রত্যাবর্তন দিবস)', placeAndFact: '১৯৭২ সালের ১০ জানুয়ারি জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমান পাকিস্তানের কারাগার থেকে মুক্ত হয়ে দেশে ফেরেন', chapter: 'gk_bangladesh' },
  { name: '১৪ই ফেব্রুয়ারি (সুন্দরবন দিবস)', placeAndFact: 'বাংলাদেশে সুন্দরবনের জীববৈচিত্র্য ও পরিবেশ রক্ষায় প্রতি বছর ১৪ ফেব্রুয়ারি পালিত হয়', chapter: 'gk_bd_geo_economy' },
  { name: '২রা মার্চ (জাতীয় পতাকা উত্তোলন দিবস)', placeAndFact: '১৯৭১ সালের ২ মার্চ ঢাকা বিশ্ববিদ্যালয়ের বটতলায় প্রথম বাংলাদেশের পতাকা উত্তোলন (আ স ম আবদুর রব)', chapter: 'gk_bangladesh' },
  { name: '৩রা মার্চ (স্বাধীনতার ইশতেহার পাঠ দিবস)', placeAndFact: '১৯৭১ সালের ৩ মার্চ পল্টন ময়দানে ছাত্রলীগ নেতা শাজাহান সিরাজ স্বাধীনতার ইশতেহার পাঠ করেন', chapter: 'gk_bangladesh' },
  { name: '১৭ই মার্চ (জাতীয় শিশু দিবস)', placeAndFact: 'বাংলাদেশে প্রতি বছর ১৭ মার্চ জাতীয় শিশু দিবস হিসেবে পালিত হয়', chapter: 'gk_bangladesh' },
  { name: '২৫শে মার্চ (জাতীয় গণহত্যা দিবস)', placeAndFact: '১৯৭১ সালের ২৫ মার্চ রাতে অপারেশন সার্চলাইটের বর্বর গণহত্যার স্মরণে বাংলাদেশে জাতীয় গণহত্যা দিবস', chapter: 'gk_bangladesh' },
  { name: '১৭ই এপ্রিল (মুজিবনগর দিবস)', placeAndFact: '১৯৭১ সালের ১৭ এপ্রিল কুষ্টিয়ার মেহেরপুরের বৈদ্যনাথতলায় মুজিবনগর সরকারের শপথ গ্রহণ', chapter: 'gk_bangladesh' },
  { name: '১২ই মে (আন্তর্জাতিক নার্স দিবস)', placeAndFact: 'আধুনিক নার্সিংয়ের অগ্রদূত ফ্লোরেন্স নাইটিঙ্গেলের জন্মদিনে ১২ মে বিশ্বব্যাপী পালিত হয়', chapter: 'gk_health_intl' },
  { name: '৫ই জুন (বিশ্ব পরিবেশ দিবস)', placeAndFact: '১৯৭২ সালের স্টকহোম সম্মেলন স্মরণে ১৯৭৪ সাল থেকে ৫ জুন UNEP-এর নেতৃত্বে পালিত', chapter: 'gk_health_intl' },
  { name: '১৬ই সেপ্টেম্বর (বিশ্ব ওজোন দিবস)', placeAndFact: '১৯৮৭ সালের ১৬ সেপ্টেম্বর মন্ট্রিল প্রোটোকল স্বাক্ষর স্মরণে পালিত হয়', chapter: 'gk_health_intl' },
  { name: '২৪শে অক্টোবর (জাতিসংঘ দিবস)', placeAndFact: '১৯৪৫ সালের ২৪ অক্টোবর জাতিসংঘ সনদ কার্যকর হওয়ার স্মরণে পালিত হয়', chapter: 'gk_health_intl' },
  { name: '৪ঠা নভেম্বর (জাতীয় সংবিধান দিবস)', placeAndFact: '১৯৭২ সালের ৪ নভেম্বর গণপরিষদে বাংলাদেশের সংবিধান গৃহীত হওয়ার স্মরণে পালিত হয়', chapter: 'gk_bangladesh' },
  { name: '২১শে নভেম্বর (সশস্ত্র বাহিনী দিবস)', placeAndFact: '১৯৭১ সালের ২১ নভেম্বর মুক্তিযুদ্ধে সেনা, নৌ ও বিমান বাহিনীর সম্মিলিত আক্রমণ স্মরণে পালিত হয়', chapter: 'gk_bangladesh' },
  { name: '৬ই ডিসেম্বর (সংবিধান সংরক্ষণ/স্বৈরাচার পতন দিবস)', placeAndFact: '১৯৯০ সালের ৬ ডিসেম্বর বাংলাদেশের গণ-আন্দোলনে স্বৈরশাসনের অবসান ঘটে', chapter: 'gk_bangladesh' },
  { name: '১০ই ডিসেম্বর (বিশ্ব মানবাধিকার দিবস)', placeAndFact: '১৯৪৮ সালের ১০ ডিসেম্বর জাতিসংঘে সর্বজনীন মানবাধিকার ঘোষণাপত্র (UDHR) গৃহীত হয়', chapter: 'gk_health_intl' },
  // Airlines, News Agencies, Intelligence & Defense
  { name: 'ইতিহাদ ও এমিরেটস এয়ারলাইন্স', placeAndFact: 'সংযুক্ত আরব আমিরাতের প্রধান দুই আন্তর্জাতিক বিমান সংস্থা (আবুধাবি ও দুবাই)', chapter: 'gk_health_intl' },
  { name: 'লুফথানসা (Lufthansa) ও কেএলএম (KLM)', placeAndFact: 'যথাক্রমে জার্মানি ও নেদারল্যান্ডসের জাতীয় বিমান সংস্থা (KLM বিশ্বের প্রাচীনতম)', chapter: 'gk_health_intl' },
  { name: 'কোয়ান্টাস (Qantas) ও এয়ার ফ্লোয়াট (Aeroflot)', placeAndFact: 'যথাক্রমে অস্ট্রেলিয়া ও রাশিয়ার জাতীয় বিমান সংস্থা', chapter: 'gk_health_intl' },
  { name: 'গারুদা (Garuda) ও ক্যাথে প্যাসিফিক (Cathay Pacific)', placeAndFact: 'যথাক্রমে ইন্দোনেশিয়া ও হংকং-এর আন্তর্জাতিক বিমান সংস্থা', chapter: 'gk_health_intl' },
  { name: 'তাস (TASS) ও সিনহুয়া (Xinhua)', placeAndFact: 'যথাক্রমে রাশিয়া ও চীনের সরকারি সংবাদ সংস্থা', chapter: 'gk_health_intl' },
  { name: 'রয়টার্স (Reuters) ও এএফপি (AFP)', placeAndFact: 'যথাক্রমে যুক্তরাজ্য (লন্ডন) ও ফ্রান্স (প্যারিস)-এর আন্তর্জাতিক সংবাদ সংস্থা', chapter: 'gk_health_intl' },
  { name: 'এপি (AP) ও ইউএনবি / বাসস (BSS)', placeAndFact: 'AP হলো যুক্তরাষ্ট্রের এবং BSS (বাংলাদেশ সংবাদ সংস্থা) বাংলাদেশের সরকারি সংবাদ সংস্থা', chapter: 'gk_health_intl' },
  { name: 'আনাদোলু (Anadolu) ও কিয়োডো (Kyodo)', placeAndFact: 'যথাক্রমে তুরস্ক ও জাপানের প্রধান সংবাদ সংস্থা', chapter: 'gk_health_intl' },
  { name: 'সিআইএ (CIA) ও এফবিআই (FBI)', placeAndFact: 'যুক্তরাষ্ট্রের বৈদেশিক গোয়েন্দা (CIA) ও অভ্যন্তরীণ ফেডারেল তদন্ত সংস্থা (FBI)', chapter: 'gk_health_intl' },
  { name: 'মোসাদ (Mossad) ও শিন বেত', placeAndFact: 'ইসরায়েলের বৈদেশিক ও অভ্যন্তরীণ গোয়েন্দা সংস্থা', chapter: 'gk_health_intl' },
  { name: 'এমআই-৬ (MI6 / SIS) ও এফএসবি (FSB)', placeAndFact: 'যথাক্রমে যুক্তরাজ্যের বৈদেশিক গোয়েন্দা সংস্থা ও রাশিয়ার নিরাপত্তা সংস্থা', chapter: 'gk_health_intl' },
  { name: 'র (RAW) ও আইবি (IB)', placeAndFact: 'ভারতের বৈদেশিক (Research and Analysis Wing) ও অভ্যন্তরীণ গোয়েন্দা সংস্থা', chapter: 'gk_health_intl' },
  { name: 'এনএসআই (NSI) ও ডিজিএফআই (DGFI)', placeAndFact: 'বাংলাদেশের জাতীয় নিরাপত্তা গোয়েন্দা সংস্থা ও প্রতিরক্ষা গোয়েন্দা মহাপরিদপ্তর', chapter: 'gk_bangladesh' },
  // Bangladesh Cultural, Literary & Geographical Extra High-Yield
  { name: 'বাংলাদেশের প্রথম জাতীয় অধ্যাপক', placeAndFact: 'শিল্পাচার্য জয়নুল আবেদিন, অধ্যাপক আবদুর রাজ্জাক ও কাজী মোতাহার হোসেন (১৯৭৫ সালে প্রথম মনোনীত)', chapter: 'gk_bangladesh' },
  { name: 'বাংলার প্রথম মহিলা কবি ও প্রথম সনেট রচয়িতা', placeAndFact: 'যথাক্রমে চন্দ্রাবতী (১৬শ শতক, মৈমনসিংহ গীতিকা) ও মাইকেল মধুসূদন দত্ত (চতুর্দশপদী কবিতাবলী)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলা ভাষায় প্রথম মুদ্রিত বই ও প্রথম সংবাদপত্র', placeAndFact: 'প্রথম বাংলা ব্যাকরণ হ্যালহেডের "A Grammar of the Bengal Language" (১৭৭৮) ও প্রথম বাংলা পত্রিকা "সমাচার দর্পণ" (১৮১৮)', chapter: 'gk_bd_geo_economy' },
  { name: 'সাপ্তাহিক "বেগম" পত্রিকার প্রতিষ্ঠাতা সম্পাদক কে ছিলেন', placeAndFact: 'নূরজাহান বেগম (১৯৪৭ সালে কলকাতায় সূচনা, প্রতিষ্ঠাতা মোহাম্মদ নাসিরউদ্দীন)', chapter: 'gk_bangladesh' },
  { name: 'বাংলাদেশের একমাত্র পাথরের জাদুঘর (Rocks Museum)', placeAndFact: 'পঞ্চগড় সরকারি মহিলা কলেজ প্রাঙ্গণে অবস্থিত (উদ্ভাবক ড. নাজমুল হক)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের একমাত্র লোকশিল্প জাদুঘর ও প্রথম ডিজিটাল জেলা', placeAndFact: 'সোনারগাঁও (নারায়ণগঞ্জ) লোকশিল্প জাদুঘর এবং যশোর বাংলাদেশের প্রথম ডিজিটাল জেলা', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের সবচেয়ে উঁচু বৃক্ষ বৈলাম ও দীর্ঘতম সমুদ্রসৈকত', placeAndFact: 'বৈলাম গাছ (বান্দরবান/রাঙামাটি) ও কক্সবাজার (১২০ কিমি বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্রসৈকত)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের সর্ববৃহৎ তাপবিদ্যুৎ কেন্দ্র ও বৃহত্তম সার কারখানা', placeAndFact: 'পায়রা তাপবিদ্যুৎ কেন্দ্র (পটুয়াখালী, ১৩২০ মেগাওয়াট) ও যমুনা সার কারখানা (জামালপুর)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের সর্ববৃহৎ রপ্তানি প্রক্রিয়াকরণ অঞ্চল (EPZ) কোনটি', placeAndFact: 'চট্টগ্রাম ইপিজেড (১৯৮৩ সালে দেশের প্রথম এবং আয়তন-রপ্তানিতে বৃহত্তম ইপিজেড)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের প্রথম বেসরকারি ইপিজেড (KEPZ)', placeAndFact: 'কোরিয়ান ইপিজেড (আনোয়ারা, চট্টগ্রাম — ইয়াংওয়ান কর্পোরেশন প্রতিষ্ঠিত)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের প্রথম সিলিকন সিটি / হাই-টেক পার্ক', placeAndFact: 'কালিয়াকৈর হাই-টেক পার্ক (গাজীপুর) ও যশোর শেখ হাসিনা সফটওয়্যার টেকনোলজি পার্ক', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের জাতীয় চিড়িয়াখানা ও বোটানিক্যাল গার্ডেন কোথায় অবস্থিত', placeAndFact: 'মিরপুর, ঢাকা (১৯৭৪ সালে জাতীয় চিড়িয়াখানা জনসাধারণের জন্য উন্মুক্ত হয়)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের একমাত্র প্রাকৃতিক মৎস্য প্রজনন ক্ষেত্র', placeAndFact: 'হালদা নদী (চট্টগ্রাম — রুই-কাতলা-মৃগেল-কালবাউশের প্রাকৃতিক ডিম ছাড়ার একমাত্র নদী)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের একমাত্র জলবিদ্যুৎ কেন্দ্র (কাপ্তাই বাঁধ)', placeAndFact: 'রাঙামাটির কাপ্তাইয়ে কর্ণফুলী নদীর ওপর ১৯৬২ সালে নির্মিত (২৩০ মেগাওয়াট)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের প্রথম গ্যাসক্ষেত্র (আবিষ্কৃত ১৯৫৫)', placeAndFact: 'হরিপুর গ্যাসক্ষেত্র, সিলেট (বৃহত্তম গ্যাসক্ষেত্র ব্রাহ্মণবাড়িয়ার তিতাস)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের বৃহত্তম কয়লা খনি (বর্তমানে উত্তোলনযোগ্য)', placeAndFact: 'বড়পুকুরিয়া কয়লা খনি (দিনাজপুর; বৃহত্তম মজুদ জামালগঞ্জ, জয়পুরহাট)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের একমাত্র কঠিন শিলা (Hard Rock) খনি কোথায় অবস্থিত', placeAndFact: 'মধ্যপাড়া কঠিন শিলা খনি (পার্বতীপুর, দিনাজপুর)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের প্রথম সাদা মাটির খনি (চিনামাটি) কোথায় অবস্থিত', placeAndFact: 'বিজয়পুর, দুর্গাপুর (নেত্রকোণা জেলা)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের বৃহত্তম সেচ প্রকল্প ও বৃহত্তম নদীবন্দর', placeAndFact: 'তিস্তা ব্যারাজ প্রকল্প (লালমনিরহাট/নীলফামারী) ও নারায়ণগঞ্জ নদীবন্দর', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের একমাত্র মেরিন একাডেমি (প্রথম প্রতিষ্ঠিত ১৯৬২)', placeAndFact: 'বাংলাদেশ মেরিন একাডেমি, জুলদিয়া, চট্টগ্রাম', chapter: 'gk_bangladesh' },
  { name: 'বাংলাদেশ পুলিশ একাডেমি ও বিকেএসপি কোথায় অবস্থিত', placeAndFact: 'যথাক্রমে সারদা (রাজশাহী, ১৯১২) ও জিরানী (সাভার, ঢাকা — ১৯৮৬)', chapter: 'gk_bangladesh' },
  { name: 'বাংলাদেশ মিলিটারি একাডেমি (BMA) ও নেভাল একাডেমি কোথায় অবস্থিত', placeAndFact: 'যথাক্রমে ভাটিয়ারী (চট্টগ্রাম) ও পতেঙ্গা (চট্টগ্রাম)', chapter: 'gk_bangladesh' },
  { name: 'বাংলাদেশ পরমাণু শক্তি গবেষণা প্রতিষ্ঠান ও বিসিএসআইআর কোথায় অবস্থিত', placeAndFact: 'AERE সাভারে (ঢাকা) ও BCSIR (সাইন্স ল্যাবরেটরি) ধানমন্ডি, ঢাকায় অবস্থিত', chapter: 'gk_bangladesh' },
  { name: 'বাংলাদেশের পাট ও ইলিশ মাছের জীবনরহস্য (Genome Sequence) উন্মোচন করেন কে', placeAndFact: 'বিজ্ঞানী ড. মাকসুদুল আলম (পাট ২০১০; ইলিশ গবেষণায় বাংলাদেশ কৃষি বিশ্ববিদ্যালয়)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের প্রথম ঔষধ শিল্প পার্ক (API Park) কোথায় স্থাপিত হয়েছে', placeAndFact: 'গজারিয়া, মুন্সীগঞ্জ (Active Pharmaceutical Ingredient Park)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের প্রথম মেট্রোরেল (MRT Line-6) কোথা থেকে কোথা পর্যন্ত চালু হয়েছে', placeAndFact: 'উত্তরা উত্তর (দিয়াবাড়ী) থেকে মতিঝিল (২০.১ কিমি; উদ্বোধন ২৮ ডিসেম্বর ২০২২)', chapter: 'gk_bd_geo_economy' },
  { name: 'কর্ণফুলী নদীর তলদেশে নির্মিত বাংলাদেশের প্রথম সড়ক টানেলের দৈর্ঘ্য কত', placeAndFact: 'মূল টানেল ৩.৩২ কিমি (মোট প্রকল্প ৯.৩৯ কিমি; চট্টগ্রাম পতেঙ্গা-আনোয়ারা)', chapter: 'gk_bd_geo_economy' },
  { name: 'হযরত শাহজালাল আন্তর্জাতিক বিমানবন্দরের তৃতীয় টার্মিনালের স্থপতি কে', placeAndFact: 'রোহানি বাহারিন (সিঙ্গাপুরভিত্তিক CPG Corporation)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের প্রথম গভীর সমুদ্রবন্দর (মাতারবাড়ী) কোন জেলায় নির্মিত হচ্ছে', placeAndFact: 'মহেশখালী, কক্সবাজার (জাইকা/জাপানের সহায়তায়)', chapter: 'gk_bd_geo_economy' },
  { name: 'বাংলাদেশের কোন প্রতিষ্ঠান ২০২১ সালে মর্যাদাপূর্ণ "স্বাধীনতা পুরস্কার" ও রামন ম্যাগসেসে লাভ করেন কোন বিজ্ঞানী', placeAndFact: 'আইসিডিডিআর,বি (স্বাধীনতা পুরস্কার ২০২১) এবং ড. ফিরদৌসী কাদরী (রামন ম্যাগসেসে ২০২১ — কলেরা টিকা গবেষণা)', chapter: 'gk_health_intl' },
  { name: 'বিশ্ববিখ্যাত চিকিৎসা গবেষণা পত্রিকা (Medical Journals) কোন দুটি', placeAndFact: 'The Lancet (যুক্তরাজ্য) ও New England Journal of Medicine — NEJM (যুক্তরাষ্ট্র)', chapter: 'gk_health_intl' },
  { name: 'বিশ্বের প্রথম টেস্ট-টিউব বেবি ও প্রথম ক্লোন স্তন্যপায়ী প্রাণী যথাক্রমে কারা', placeAndFact: 'লুইস ব্রাউন (১৯৭৮, যুক্তরাজ্য) ও ভেড়া "ডলি" (১৯৯৬, ইয়ান উইলমুট, স্কটল্যান্ড)', chapter: 'gk_health_intl' },
  { name: 'চিকিৎসাবিজ্ঞানে প্রথম হৃৎপিণ্ড প্রতিস্থাপন (Heart Transplant) করেন কে (১৯৬৭)', placeAndFact: 'ডা. ক্রিশ্চিয়ান বার্নার্ড (দক্ষিণ আফ্রিকা)', chapter: 'gk_health_intl' },
  { name: 'পেনিসিলিন (১৯২৮), ইনসুলিন (১৯২১) ও এক্স-রে (১৮৯৫)-এর আবিষ্কারক যথাক্রমে কে', placeAndFact: 'আলেকজান্ডার ফ্লেমিং, ফ্রেডরিক ব্যান্টিং-চার্লস বেস্ট ও উইলহেম কনরাড রন্টজেন', chapter: 'gk_health_intl' },
  { name: 'রক্তের গ্রুপ (ABO system) ও রক্ত সংবহনতন্ত্রের আবিষ্কারক যথাক্রমে কে', placeAndFact: 'কার্ল ল্যান্ডস্টেইনার (১৯০১) ও উইলিয়াম হার্ভে (১৬২৮)', chapter: 'gk_health_intl' },
  { name: 'বিশ্বের দীর্ঘতম পর্বতশ্রেণি (পৃষ্ঠের ওপর) ও সর্বোচ্চ মালভূমি যথাক্রমে কোন দুটি', placeAndFact: 'আন্দিজ পর্বতমালা (দক্ষিণ আমেরিকা, ~৭০০০ কিমি) ও পামির মালভূমি ("পৃথিবীর ছাদ")', chapter: 'gk_health_intl' },
  { name: 'বিশ্বের বৃহত্তম মরুভূমি (উষ্ণ) ও গভীরতম মহাসাগরীয় খাত কোনটি', placeAndFact: 'সাহারা মরুভূমি (আফ্রিকা) ও মারিয়ানা ট্রেঞ্চ (প্রশান্ত মহাসাগর, ~১১,০৩৪ মিটার)', chapter: 'gk_health_intl' },
  { name: 'বিশ্বের ক্ষুদ্রতম মহাদেশ, বৃহত্তম বদ্বীপ ও বৃহত্তম দ্বীপ যথাক্রমে কোনগুলো', placeAndFact: 'ওশেনিয়া/অস্ট্রেলিয়া, বাংলাদেশ (সুন্দরবন-গঙ্গা-ব্রহ্মপুত্র বদ্বীপ) ও গ্রিনল্যান্ড', chapter: 'gk_health_intl' },
  { name: 'বিশ্বের প্রশস্ততম জলপ্রপাত, উচ্চতম জলপ্রপাত ও বৃহত্তম মিঠা পানির হ্রদ', placeAndFact: 'খোন জলপ্রপাত (লাওস), অ্যাঞ্জেল ফলস (ভেনেজুয়েলা) ও লেক সুপিরিয়র (উত্তর আমেরিকা)', chapter: 'gk_health_intl' },
  { name: 'কোন দেশে কখনো কোনো সূর্যোদয়/সূর্যাস্ত স্থায়ী ৬ মাস দিন ও ৬ মাস রাতের প্রভাব দেখা যায়', placeAndFact: 'নরওয়ে ("নিশীথ সূর্যের দেশ" — Land of the Midnight Sun, উত্তর মেরুবৃত্ত অঞ্চল)', chapter: 'gk_health_intl' },
  { name: 'আন্তর্জাতিক তারিখ রেখা (International Date Line) কত ডিগ্রি দ্রাঘিমাংশ বরাবর কল্পিত', placeAndFact: '১৮০° দ্রাঘিমা রেখা (প্রশান্ত মহাসাগরের ওপর দিয়ে)', chapter: 'gk_health_intl' },
  { name: 'পৃথিবীর নিরক্ষরেখা (০°), কর্কটক্রান্তি (২৩.৫° উত্তর) ও মূল মধ্যরেখা (০°) সম্পর্কে বাংলাদেশের অবস্থান', placeAndFact: 'কর্কটক্রান্তি রেখা (Tropic of Cancer) ও ৯০° পূর্ব দ্রাঘিমা বাংলাদেশের মধ্যভাগ দিয়ে অতিক্রম করেছে', chapter: 'gk_bd_geo_economy' },
  { name: 'বিশ্বের সবচেয়ে বেশি ভাষার দেশ ও সর্বাধিক সীমান্তবর্তী দেশ কোনটি', placeAndFact: 'পাপুয়া নিউগিনি (~৮৪০টি ভাষা) এবং চীন (১৪টি দেশের সাথে স্থলসীমান্ত)', chapter: 'gk_health_intl' },
  { name: 'বাফার রাষ্ট্র (Buffer State) ও স্থলবেষ্টিত (Landlocked) রাষ্ট্রের পরিচিত উদাহরণ কোনগুলো', placeAndFact: 'নেপাল-ভুটান (ভারত ও চীনের মধ্যবর্তী বাফার ও স্থলবেষ্টিত রাষ্ট্র; বৃহত্তম স্থলবেষ্টিত কাজাখস্তান)', chapter: 'gk_health_intl' },
];

interface InternationalBodyExtra {
  org: string;
  hqAndYear: string;
  fact: string;
}

const INTERNATIONAL_ORGS_EXTRA: InternationalBodyExtra[] = [
  { org: 'জাতিসংঘ মানবাধিকার পরিষদ (UNHRC)', hqAndYear: 'জেনেভা, সুইজারল্যান্ড (প্রতিষ্ঠিত ২০০৬; ৪৭ সদস্য)', fact: 'বিশ্বে মানবাধিকার সুরক্ষা ও পর্যালোচনাকারী প্রধান আন্তঃসরকারি সংস্থা' },
  { org: 'জাতিসংঘ পরিবেশ কর্মসূচি (UNEP)', hqAndYear: 'নাইরোবি, কেনিয়া (প্রতিষ্ঠিত ১৯৭২)', fact: 'বিশ্ব পরিবেশ দিবস ও বৈশ্বিক জলবায়ু-পরিবেশ নীতি সমন্বয় করে' },
  { org: 'ইউএন-হ্যাবিট্যাট (UN-Habitat)', hqAndYear: 'নাইরোবি, কেনিয়া (প্রতিষ্ঠিত ১৯৭৮)', fact: 'টেকসই নগর উন্নয়ন ও মানববসতি নিয়ে কাজ করে' },
  { org: 'আন্তর্জাতিক শ্রম সংস্থা (ILO)', hqAndYear: 'জেনেভা, সুইজারল্যান্ড (প্রতিষ্ঠিত ১৯১৯; ভার্সাই চুক্তিতে)', fact: 'শ্রমিক অধিকার ও আন্তর্জাতিক শ্রম মানদণ্ড নির্ধারণ (১৯৬৯ সালে শান্তিতে নোবেল)' },
  { org: 'বিশ্ব আবহাওয়া সংস্থা (WMO)', hqAndYear: 'জেনেভা, সুইজারল্যান্ড (প্রতিষ্ঠিত ১৯৫০)', fact: 'আবহাওয়া, জলবায়ু ও জলবিজ্ঞানবিষয়ক বৈশ্বিক তথ্য বিনিময়' },
  { org: 'বিশ্ব মেধাস্বত্ব সংস্থা (WIPO)', hqAndYear: 'জেনেভা, সুইজারল্যান্ড (প্রতিষ্ঠিত ১৯৬৭)', fact: 'পেটেন্ট, কপিরাইট, ট্রেডমার্ক ও GI পণ্যের আন্তর্জাতিক সুরক্ষা' },
  { org: 'আন্তর্জাতিক টেলিযোগাযোগ ইউনিয়ন (ITU)', hqAndYear: 'জেনেভা, সুইজারল্যান্ড (প্রতিষ্ঠিত ১৮৬৫ — প্রাচীনতম সংস্থাগুলোর একটি)', fact: 'বৈশ্বিক রেডিও স্পেকট্রাম ও উপগ্রহ কক্ষপথ বরাদ্দ' },
  { org: 'আন্তর্জাতিক বেসামরিক বিমান চলাচল সংস্থা (ICAO)', hqAndYear: 'মন্ট্রিল, কানাডা (প্রতিষ্ঠিত ১৯৪৪/১৯৪৭)', fact: 'আন্তর্জাতিক আকাশপথ নিরাপত্তা ও বিমান চলাচলের নিয়মাবলি প্রণয়ন' },
  { org: 'আন্তর্জাতিক সমুদ্র চলাচল সংস্থা (IMO)', hqAndYear: 'লন্ডন, যুক্তরাজ্য (প্রতিষ্ঠিত ১৯৪৮/১৯৫৮)', fact: 'আন্তর্জাতিক নৌপরিবহন নিরাপত্তা ও সামুদ্রিক দূষণ প্রতিরোধ' },
  { org: 'বিশ্ব পর্যটন সংস্থা (UN Tourism / UNWTO)', hqAndYear: 'মাদ্রিদ, স্পেন (প্রতিষ্ঠিত ১৯৭৫)', fact: 'দায়িত্বশীল ও টেকসই বিশ্ব পর্যটন উন্নয়ন' },
  { org: 'আন্তর্জাতিক পরমাণু শক্তি সংস্থা (IAEA)', hqAndYear: 'ভিয়েনা, অস্ট্রিয়া (প্রতিষ্ঠিত ১৯৫৭)', fact: 'পারমাণবিক শক্তির শান্তিপূর্ণ ব্যবহার তদারকি ("Atoms for Peace"; ২০০৫ শান্তি নোবেল)' },
  { org: 'পেট্রোলিয়াম রপ্তানিকারক দেশগুলোর সংস্থা (OPEC)', hqAndYear: 'ভিয়েনা, অস্ট্রিয়া (প্রতিষ্ঠিত ১৯৬০, বাগদাদে)', fact: 'বিশ্ব তেল বাজার ও অপরিশোধিত জ্বালানি তেলের সরবরাহ সমন্বয়' },
  { org: 'জাতিসংঘ শিল্প উন্নয়ন সংস্থা (UNIDO)', hqAndYear: 'ভিয়েনা, অস্ট্রিয়া (প্রতিষ্ঠিত ১৯৬৬)', fact: 'উন্নয়নশীল দেশগুলোতে অন্তর্ভুক্তিমূলক ও টেকসই শিল্পায়ন' },
  { org: 'আন্তর্জাতিক অভিবাসন সংস্থা (IOM)', hqAndYear: 'জেনেভা, সুইজারল্যান্ড (প্রতিষ্ঠিত ১৯৫১)', fact: 'নিরাপদ ও সুশৃঙ্খল আন্তর্জাতিক অভিবাসন ও রোহিঙ্গা মানবিক সহায়তা' },
  { org: 'জাতিসংঘের কৃষি ও উন্নয়নবিষয়ক IFAD', hqAndYear: 'রোম, ইতালি (প্রতিষ্ঠিত ১৯৭৭)', fact: 'গ্রামীণ দারিদ্র্য বিমোচন ও ক্ষুদ্র কৃষকদের অর্থায়ন' },
  { org: 'বিশ্ব খাদ্য কর্মসূচি (WFP)', hqAndYear: 'রোম, ইতালি (প্রতিষ্ঠিত ১৯৬১)', fact: 'দুর্যোগ ও সংঘাতকবলিত অঞ্চলে জরুরি খাদ্য সহায়তা (২০২০ সালে শান্তিতে নোবেল)' },
  { org: 'এশীয় অবকাঠামো বিনিয়োগ ব্যাংক (AIIB)', hqAndYear: 'বেইজিং, চীন (কার্যক্রম শুরু ২০১৬)', fact: 'এশিয়ার অবকাঠামো ও জ্বালানি খাতে বহুপাক্ষিক উন্নয়ন ব্যাংক (বাংলাদেশ প্রতিষ্ঠাতা সদস্য)' },
  { org: 'নিউ ডেভেলপমেন্ট ব্যাংক (NDB — BRICS Bank)', hqAndYear: 'সাংহাই, চীন (প্রতিষ্ঠিত ২০১৪/২০১৫)', fact: 'উদীয়মান অর্থনীতির দেশগুলোর অবকাঠামো উন্নয়ন ব্যাংক (বাংলাদেশ ২০২১ সালে সদস্য হয়)' },
  { org: 'ইসলামী উন্নয়ন ব্যাংক (IsDB)', hqAndYear: 'জেদ্দা, সৌদি আরব (প্রতিষ্ঠিত ১৯৭৩/১৯৭৫)', fact: 'OIC সদস্য দেশগুলোর শরিয়াহ-ভিত্তিক আর্থসামাজিক উন্নয়নে অর্থায়ন' },
  { org: 'বিশ্ব অর্থনৈতিক ফোরাম (WEF)', hqAndYear: 'কলোগনি/জেনেভা, সুইজারল্যান্ড (বার্ষিক সম্মেলন দাভোসে; প্রতিষ্ঠিত ১৯৭১)', fact: 'প্রতি বছর সুইজারল্যান্ডের দাভোসে বিশ্বনেতা ও অর্থনীতিবিদদের শীর্ষ বৈঠক' },
  { org: 'ট্রান্সপারেন্সি ইন্টারন্যাশনাল (TI)', hqAndYear: 'বার্লিন, জার্মানি (প্রতিষ্ঠিত ১৯৯৩)', fact: 'দুর্নীতি ধারণা সূচক (CPI — Corruption Perceptions Index) প্রকাশ করে' },
  { org: 'অ্যামনেস্টি ইন্টারন্যাশনাল', hqAndYear: 'লন্ডন, যুক্তরাজ্য (প্রতিষ্ঠিত ১৯৬১, পিটার বেনেনসন)', fact: 'আন্তর্জাতিক মানবাধিকার সংগঠন (১৯৭৭ সালে শান্তিতে নোবেল)' },
  { org: 'হিউম্যান রাইটস ওয়াচ (HRW)', hqAndYear: 'নিউইয়র্ক, যুক্তরাষ্ট্র (প্রতিষ্ঠিত ১৯৭৮)', fact: 'বিশ্বব্যাপী মানবাধিকার লঙ্ঘন পর্যবেক্ষণ ও প্রতিবেদন প্রকাশ' },
  { org: 'ইন্টারন্যাশনাল ক্রিমিনাল কোর্ট (ICC)', hqAndYear: 'দ্য হেগ, নেদারল্যান্ডস (রোম সংবিধি ১৯৯৮; কার্যকর ২০০২)', fact: 'গণহত্যা, যুদ্ধাপরাধ ও মানবতাবিরোধী অপরাধের জন্য ব্যক্তিবিশেষের বিচার করে' },
  { org: 'আন্তর্জাতিক বিচার আদালত (ICJ)', hqAndYear: 'পিস প্যালেস, দ্য হেগ, নেদারল্যান্ডস (১৯৪৫; ১৫ বিচারক, মেয়াদ ৯ বছর)', fact: 'জাতিসংঘের প্রধান বিচারিক অঙ্গ; রাষ্ট্রসমূহের মধ্যকার বিরোধ নিষ্পত্তি করে' },
  { org: 'গ্রিনপিস (Greenpeace)', hqAndYear: 'আমস্টারডাম, নেদারল্যান্ডস (প্রতিষ্ঠিত ১৯৭১, কানাডায়)', fact: 'পরিবেশ সুরক্ষা, জলবায়ু ও পরমাণু নিরস্ত্রীকরণ নিয়ে কাজ করা আন্তর্জাতিক এনজিও' },
  { org: 'ডক্টরস উইদাউট বর্ডার্স (MSF)', hqAndYear: 'জেনেভা, সুইজারল্যান্ড (প্রতিষ্ঠিত ১৯৭১, প্যারিসে)', fact: 'যুদ্ধ ও মহামারিতে জরুরি চিকিৎসাসেবা প্রদানকারী সংস্থা (১৯৯৯ সালে শান্তিতে নোবেল)' },
  { org: 'সার্ক কৃষি কেন্দ্র (SAC) ও সিরডাপ (CIRDAP)', hqAndYear: 'উভয়ের সদর দপ্তর ঢাকা, বাংলাদেশ', fact: 'আঞ্চলিক কৃষি ও গ্রামীণ উন্নয়ন গবেষণা প্রতিষ্ঠান ঢাকায় অবস্থিত' },
  { org: 'বিমসটেক (BIMSTEC) সচিবালয়', hqAndYear: 'গুলশান, ঢাকা, বাংলাদেশ (প্রতিষ্ঠিত ১৯৯৭; সদস্য ৭টি দেশ)', fact: 'বঙ্গোপসাগর অঞ্চলের ৭ দেশ: বাংলাদেশ, ভারত, ভুটান, নেপাল, শ্রীলঙ্কা, মিয়ানমার, থাইল্যান্ড' },
  { org: 'ডি-৮ (D-8 Organization for Economic Cooperation)', hqAndYear: 'ইস্তানবুল, তুরস্ক (প্রতিষ্ঠিত ১৯৯৭; সদস্য ৮টি উন্নয়নশীল দেশ)', fact: 'বাংলাদেশ, ইন্দোনেশিয়া, ইরান, মিশর, মালয়েশিয়া, নাইজেরিয়া, পাকিস্তান, তুরস্ক (নবম আজারবাইজান ২০২৪)' },
];

export function buildGkStructuredP(): McqQuestion[] {
  const list: McqQuestion[] = [];
  let seq = 1;
  const nextId = () => `gksp_${String(seq++).padStart(4, '0')}`;

  // 1. UN SDGs (17 × 2 = 34 MCQs)
  UN_SDG_GOALS.forEach((s, i) => {
    const others = UN_SDG_GOALS.filter((x) => x.goalNo !== s.goalNo);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_world_org',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রার (SDG 2030) কোন লক্ষ্যটি "${s.focus}" নিয়ে কাজ করে?`,
        correct: s.goalNo,
        distractors: others.slice(i % 10, (i % 10) + 6).map((x) => x.goalNo),
        explanation: `${s.goalNo}: ${s.focus} (${s.targetNote})।`,
        reference: 'সাধারণ জ্ঞান · জাতিসংঘ SDG (২০১৫–২০৩০)',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_world_org',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `জাতিসংঘের টেকসই উন্নয়ন লক্ষ্যমাত্রা "${s.goalNo}"-এর মূল প্রতিপাদ্য কী?`,
        correct: s.focus,
        distractors: others.slice((i + 5) % 10, ((i + 5) % 10) + 6).map((x) => x.focus),
        explanation: `${s.goalNo} → ${s.focus}। লক্ষ্য: ${s.targetNote}।`,
        reference: 'সাধারণ জ্ঞান · টেকসই উন্নয়ন লক্ষ্যমাত্রা',
      })
    );
  });

  // 2. Disease Pathogens & Vaccines Matrix (30 × 2 = 60 MCQs)
  DISEASE_VACCINE_MATRIX.forEach((d, i) => {
    const others = DISEASE_VACCINE_MATRIX.filter((x) => x.disease !== d.disease);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_health_awards',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${d.disease}" রোগটির প্রধান জীবাণু বা প্রতিরোধক টিকা কোনটি?`,
        correct: d.agentOrVaccine,
        distractors: others.slice(i % 18, (i % 18) + 6).map((x) => x.agentOrVaccine),
        explanation: `${d.disease}: ${d.agentOrVaccine}। (${d.detail})।`,
        reference: 'সাধারণ জ্ঞান · রোগ-জীবাণু ও টিকাদান (EPI ও জনস্বাস্থ্য)',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_health_awards',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `"${d.agentOrVaccine}" নিচের কোন রোগের সাথে সরাসরি সম্পর্কিত?`,
        correct: d.disease,
        distractors: others.slice((i + 9) % 18, ((i + 9) % 18) + 6).map((x) => x.disease),
        explanation: `${d.agentOrVaccine} ↔ ${d.disease} (${d.detail})।`,
        reference: 'সাধারণ জ্ঞান · চিকিৎসা ও জনস্বাস্থ্য',
      })
    );
  });

  // 3. Famous Wonders, Treaties, Days, Airlines, Agencies & BD Extra (112 × 2 = 224 MCQs)
  FAMOUS_PLACES_AND_DAYS.forEach((item, i) => {
    const others = FAMOUS_PLACES_AND_DAYS.filter((x) => x.name !== item.name);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: item.chapter,
        visualLessonId: item.chapter === 'gk_bangladesh' ? 'gk_timeline' : item.chapter === 'gk_bd_geo_economy' ? 'gk_bd_map' : 'gk_world_org',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `"${item.name}" সম্পর্কিত সঠিক তথ্য বা অবস্থান কোনটি?`,
        correct: item.placeAndFact,
        distractors: others.slice(i % 60, (i % 60) + 6).map((x) => x.placeAndFact),
        explanation: `${item.name}: ${item.placeAndFact}।`,
        reference: 'সাধারণ জ্ঞান · সাম্প্রতিক ও স্থায়ী বিষয়াবলি',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: item.chapter,
        visualLessonId: item.chapter === 'gk_bangladesh' ? 'gk_timeline' : item.chapter === 'gk_bd_geo_economy' ? 'gk_bd_map' : 'gk_world_org',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `সাধারণ জ্ঞানের তথ্যানুসারে "${item.placeAndFact}" নিচের কোনটির ক্ষেত্রে প্রযোজ্য?`,
        correct: item.name,
        distractors: others.slice((i + 25) % 60, ((i + 25) % 60) + 6).map((x) => x.name),
        explanation: `${item.name} ↔ ${item.placeAndFact}।`,
        reference: 'সাধারণ জ্ঞান · প্রশ্নব্যাংক সংস্করণ',
      })
    );
  });

  // 4. International Organizations Headquarters & Mandates (30 × 3 = 90 MCQs)
  INTERNATIONAL_ORGS_EXTRA.forEach((o, i) => {
    const others = INTERNATIONAL_ORGS_EXTRA.filter((x) => x.org !== o.org);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_world_org',
        hscLevel: 'admission',
        difficulty: 'medical',
        question: `"${o.org}"-এর সদর দপ্তর ও প্রতিষ্ঠাকাল সম্পর্কিত সঠিক তথ্য কোনটি?`,
        correct: o.hqAndYear,
        distractors: others.slice(i % 15, (i % 15) + 6).map((x) => x.hqAndYear),
        explanation: `${o.org}: ${o.hqAndYear}। কাজ: ${o.fact}।`,
        reference: 'সাধারণ জ্ঞান · আন্তর্জাতিক সংস্থা ও সদর দপ্তর',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_world_org',
        hscLevel: 'admission',
        difficulty: 'dental',
        question: `নিচের কোন সংস্থাটির সদর দপ্তর ও প্রতিষ্ঠা তথ্য "${o.hqAndYear}"?`,
        correct: o.org,
        distractors: others.slice((i + 6) % 15, ((i + 6) % 15) + 6).map((x) => x.org),
        explanation: `${o.hqAndYear} → ${o.org}।`,
        reference: 'সাধারণ জ্ঞান · আন্তর্জাতিক সংগঠন',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: 'gk_health_intl',
        visualLessonId: 'gk_world_org',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `"${o.fact}" — এটি কোন আন্তর্জাতিক বা আঞ্চলিক সংস্থার প্রধান বৈশিষ্ট্য?`,
        correct: o.org,
        distractors: others.slice((i + 11) % 15, ((i + 11) % 15) + 6).map((x) => x.org),
        explanation: `${o.org} (${o.hqAndYear}): ${o.fact}।`,
        reference: 'সাধারণ জ্ঞান · আন্তর্জাতিক কার্যপরিধি',
      })
    );
  });

  // 5. High-Yield One-Liner Rapid Questions across BD & World GK (45 × 2 = 90 MCQs)
  const rapidFacts: Array<{ q: string; a: string; ch: 'gk_bangladesh' | 'gk_bd_geo_economy' | 'gk_health_intl' }> = [
    { q: '১৯৭১ সালে বাংলাদেশকে স্বীকৃতিদানকারী প্রথম আরব/মুসলিম দেশ (অনারব ইন্দোনেশিয়া-মালয়েশিয়া ও আরব ইরাক)', a: 'আরব দেশ ইরাক (৮ জুলাই ১৯৭২) এবং অনারব মুসলিম দেশ সেনেগাল (১ ফেব্রুয়ারি ১৯৭২)', ch: 'gk_bangladesh' },
    { q: 'জাতিসংঘে বাংলাদেশের সদস্যপদ লাভ কত তারিখে ও কততম সদস্য হিসেবে', a: '১৭ সেপ্টেম্বর ১৯৭৪ (১৩৬তম সদস্য হিসেবে, ২৯তম অধিবেশনে)', ch: 'gk_bangladesh' },
    { q: 'বঙ্গবন্ধু শেখ মুজিবুর রহমান জাতিসংঘের সাধারণ পরিষদে প্রথম বাংলায় ভাষণ দেন কবে', a: '২৫ সেপ্টেম্বর ১৯৭৪', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশ কবে কমনওয়েলথ ও OIC-এর সদস্যপদ লাভ করে', a: 'কমনওয়েলথ ১৮ এপ্রিল ১৯৭২ (৩২তম) এবং OIC ফেব্রুয়ারি ১৯৭৪ (লাহোর সম্মেলনে)', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশ কোন সালে প্রথম জাতিসংঘ শান্তিরক্ষা মিশনে অংশগ্রহণ শুরু করে (নামিবিয়া ও ইরাক-ইরান)', a: '১৯৮৮ সালে (UNIIMOG, ইরাক-ইরান পর্যবেক্ষক মিশনে)', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশ জাতিসংঘ নিরাপত্তা পরিষদের (UNSC) অস্থায়ী সদস্য নির্বাচিত হয়েছে মোট কতবার', a: '২ বার (১৯৭৯–৮০ এবং ২০০০–০১ মেয়াদে)', ch: 'gk_bangladesh' },
    { q: 'ঢাকা কতবার বাংলার রাজধানী হয়েছিল (ঐতিহাসিক গণনা অনুসারে)', a: '৫ বার (১৬১০, ১৬৬০, ১৯০৫, ১৯৪৭ ও ১৯৭১)', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশের জাতীয় সংসদের প্রথম স্পিকার ও বর্তমান সংবিধানের অভিভাবক কে', a: 'প্রথম স্পিকার শাহ আবদুল হামিদ (বিকল্পে মুহম্মদউল্লাহ); সংবিধানের অভিভাবক বাংলাদেশ সুপ্রিম কোর্ট', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশের প্রথম অ্যাটর্নি জেনারেল ও প্রথম প্রধান বিচারপতি যথাক্রমে কে ছিলেন', a: 'প্রথম অ্যাটর্নি জেনারেল এম এইচ খন্দকার ও প্রথম প্রধান বিচারপতি আবু সাদাত মোহাম্মদ সায়েম', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশের প্রথম নারী স্পিকার ও প্রথম নারী প্রধানমন্ত্রী যথাক্রমে কে', a: 'ড. শিরীন শারমিন চৌধুরী ও বেগম খালেদা জিয়া (১৯৯১)', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশের প্রথম নারী মেজর জেনারেল ও প্রথম নারী বৈমানিক (বিমান বাহিনী) কে', a: 'ডা. সুসানে গীতি (প্রথম নারী মেজর জেনারেল) ও নাঈমা হক-তামান্না-ই-লুৎফী (প্রথম বৈমানিক)', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশের প্রথম নারী প্যারাট্রুপার ও প্রথম নারী এভারেস্ট জয়ী কে', a: 'জান্নাতুল ফেরদৌস (প্রথম প্যারাট্রুপার) ও নিশাত মজুমদার (প্রথম নারী এভারেস্ট জয়ী)', ch: 'gk_bangladesh' },
    { q: 'বাংলার বিখ্যাত চরের মধ্যে "নিঝুম দ্বীপ" কোন জেলায় এবং "ছেঁড়া দ্বীপ" কোথায় অবস্থিত', a: 'নিঝুম দ্বীপ হাতিয়া (নোয়াখালী) এবং ছেঁড়া দ্বীপ সেন্টমার্টিন (টেকনাফ, কক্সবাজার)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশের একমাত্র পাহাড়ি দ্বীপ ও বৃহত্তম বদ্বীপ জেলা যথাক্রমে কোন দুটি', a: 'মহেশখালী (একমাত্র পাহাড়ি দ্বীপ, কক্সবাজার) ও ভোলা (বৃহত্তম দ্বীপ জেলা)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশের সর্ববৃহৎ বিল (চলন বিল) কোন জেলাগুলোর মধ্যে বিস্তৃত', a: 'নাটোর, সিরাজগঞ্জ ও পাবনা (প্রধানত নাটোর-সিরাজগঞ্জ অঞ্চলে)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশের বৃহত্তম হাওর (হাকালুকি হাওর) কোন কোন জেলায় বিস্তৃত', a: 'মৌলভীবাজার ও সিলেট (টাঙ্গুয়ার হাওর সুনামগঞ্জে)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশের কোন জেলার ওপর দিয়ে সবথেকে বেশি নদী প্রবাহিত হয়েছে ও একমাত্র নদীহীন/কম নদী জেলা', a: 'সুনামগঞ্জ/সিলেট/বরিশালে অসংখ্য নদী ও হ্রদ; রাঙামাটি পাহাড়ি অঞ্চলে কাপ্তাই হ্রদ প্রধান', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশ ও মিয়ানমারকে বিভক্তকারী নদী কোনটি (দৈর্ঘ্য ~৬৩ কিমি)', a: 'নাফ নদী (টেকনাফ হয়ে বঙ্গোপসাগরে পতিত)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশ ও ভারতকে বিভক্তকারী সীমান্তবর্তী নদী "হাড়িয়াভাঙ্গা" কোথায় অবস্থিত', a: 'সাতক্ষীরা ও পশ্চিমবঙ্গের দক্ষিণ ২৪ পরগনা সীমান্তে (দক্ষিণ তালপট্টি দ্বীপ মোহনায়)', ch: 'gk_bd_geo_economy' },
    { q: 'চট্টগ্রাম পাহাড়ি অঞ্চলের তিনটি প্রধান পার্বত্য জেলার সম্মিলিত ক্ষুদ্র নৃগোষ্ঠীর উৎসব কী নামে পরিচিত', a: 'বৈসাবি (ত্রিপুরাদের বৈসু, মারমাদের সাংগ্রাই ও চাকমাদের বিজু)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশের উপজাতীয়/ক্ষুদ্র নৃগোষ্ঠীসমূহের মধ্যে জনসংখ্যায় বৃহত্তম ও দ্বিতীয় বৃহত্তম কোন দুটি', a: 'চাকমা (বৃহত্তম) ও মারমা (দ্বিতীয় বৃহত্তম; সাঁওতাল উত্তরাঞ্চলে প্রধান)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশের প্রথম পূর্ণাঙ্গ কৃষি বিশ্ববিদ্যালয় (BAU) কোথায় ও কত সালে প্রতিষ্ঠিত হয়', a: 'ময়মনসিংহে (১৯৬১ সালে; ব্রহ্মপুত্র নদের তীরে)', ch: 'gk_bd_geo_economy' },
    { q: 'জাতীয় কবি কাজী নজরুল ইসলামের প্রথম প্রকাশিত কবিতা ও প্রথম কাব্যগ্রন্থ কোন দুটি', a: 'প্রথম কবিতা "মুক্তি" (১৯১৯) ও প্রথম কাব্যগ্রন্থ "অগ্নিবীণা" (১৯২২)', ch: 'gk_bd_geo_economy' },
    { q: 'বাংলাদেশের জাতীয় সংগীত "আমার সোনার বাংলা"-র সুরকার ও কবে এটি রাষ্ট্রীয়ভাবে গৃহীত হয়', a: 'বাউল গায়ক গগন হরকরার সুরের আদলে রবীন্দ্রনাথ ঠাকুরের সুর; গৃহীত ৩ মার্চ ১৯৭১ (মন্ত্রিসভা ১৩ জানুয়ারি ১৯৭২)', ch: 'gk_bangladesh' },
    { q: 'বাংলাদেশের রণসংগীত "চল্ চল্ চল্"-এর রচয়িতা ও কত স্তবক বাজানো হয়', a: 'কাজী নজরুল ইসলাম (প্রথম ২১ লাইন রণসংগীত হিসেবে গৃহীত, ১৯২৮ সালে শিখায় প্রকাশিত)', ch: 'gk_bangladesh' },
    { q: 'বিশ্বে সর্বপ্রথম কাগজের প্রচলন ও মুদ্রণযন্ত্র আবিষ্কার হয় কোন দেশে ও কার দ্বারা', a: 'চীনে কাগজ (সাই লুন, ১০৫ খ্রি.) ও জার্মানিতে মুদ্রণযন্ত্র (জোহানেস গুটেনবার্গ, ১৪৪০)', ch: 'gk_health_intl' },
    { q: 'বিশ্বের প্রাচীনতম বিশ্ববিদ্যালয় (ইউনেস্কো স্বীকৃত আল-কারাওইন) এবং ইউরোপের প্রাচীনতম (বোলোগনা) কোথায়', a: 'আল-কারাওইন (ফেজ, মরক্কো — ৮৫৯ খ্রি.) ও বোলোগনা বিশ্ববিদ্যালয় (ইতালি — ১০৮৮ খ্রি.)', ch: 'gk_health_intl' },
    { q: 'বিশ্বের প্রথম নারী প্রধানমন্ত্রী ও প্রথম নারী রাষ্ট্রপতি যথাক্রমে কে ছিলেন', a: 'শ্রীমাভো বন্দরনায়েকে (শ্রীলঙ্কা, ১৯৬০) ও ইসাবেল পেরন (আর্জেন্টিনা, ১৯৭৪)', ch: 'gk_health_intl' },
    { q: 'বিশ্বে প্রথম মহাকাশে যাওয়া মানুষ ও প্রথম চাঁদে অবতরণকারী মানুষ কারা', a: 'ইউরি গ্যাগারিন (সোভিয়েত ইউনিয়ন, ১২ এপ্রিল ১৯৬১) ও নীল আর্মস্ট্রং (যুক্তরাষ্ট্র, ২০ জুলাই ১৯৬৯)', ch: 'gk_health_intl' },
    { q: 'বিশ্বে প্রথম নারী মহাকাশচারী ও প্রথম কৃত্রিম উপগ্রহের নাম কী', a: 'ভ্যালেন্তিনা তেরেসকোভা (১৯৬৩) ও স্পুটনিক-১ (৪ অক্টোবর ১৯৫৭, সোভিয়েত ইউনিয়ন)', ch: 'gk_health_intl' },
    { q: 'সৌরজগতের ক্ষুদ্রতম, দ্রুততম, উজ্জ্বলতম ও বৃহত্তম গ্রহ যথাক্রমে কোনগুলো', a: 'বুধ (ক্ষুদ্রতম/দ্রুততম), শুক্র (উজ্জ্বলতম/উষ্ণতম) ও বৃহস্পতি (বৃহত্তম)', ch: 'gk_health_intl' },
    { q: 'কিসের প্রভাবে সমুদ্রে জোয়ার-ভাটা হয় ও সূর্য থেকে পৃথিবীতে আলো আসতে কত সময় লাগে', a: 'প্রধানত চাঁদ ও সূর্যের মহাকর্ষ আকর্ষণে জোয়ার-ভাটা; সূর্যের আলো আসতে ~৮ মিনিট ১৯ সেকেন্ড লাগে', ch: 'gk_health_intl' },
    { q: 'বায়ুমণ্ডলের কোন স্তরে ওজোন গ্যাস (O₃) থাকে এবং কোন স্তরে আবহাওয়ার ঘটনা (বৃষ্টি-ঝড়) ঘটে', a: 'স্ট্র্যাটোস্ফিয়ারে ওজোন স্তর (অতিবেগুনি রশ্মি শোষণ) এবং ট্রপোস্ফিয়ারে ঝড়-বৃষ্টি ঘটে', ch: 'gk_health_intl' },
    { q: 'কম্পিউটারের জনক, ওয়ার্ল্ড ওয়াইড ওয়েব (WWW)-এর জনক ও ই-মেইলের জনক যথাক্রমে কে', a: 'চার্লস ব্যাবেজ, টিম বার্নার্স-লি (১৯৮৯) এবং রে টমলিনসন (১৯৭১)', ch: 'gk_health_intl' },
    { q: 'বাংলাদেশ ও ভারতের মধ্যে ছিটমহল বিনিময় (স্থলসীমান্ত চুক্তি) কবে কার্যকর হয়', a: '১ আগস্ট ১৯৭৪ সালের মুজিব-ইন্দিরা চুক্তির আলোকে ৩১ জুলাই মধ্যরাত / ১ আগস্ট ২০১৫ কার্যকর হয়', ch: 'gk_bangladesh' },
    { q: 'আধুনিক অলিম্পিক গেমস কবে ও কোথায় শুরু হয় এবং ২০২৪ ও ২০২৮ অলিম্পিকের আয়োজক শহর', a: '১৮৯৬ এথেন্সে (গ্রিস); ২০২৪ প্যারিস (ফ্রান্স) ও ২০২৮ লস অ্যাঞ্জেলেস (যুক্তরাষ্ট্র)', ch: 'gk_health_intl' },
    { q: 'প্রথম বিশ্বকাপ ফুটবল ও প্রথম বিশ্বকাপ ক্রিকেট কবে, কোথায় অনুষ্ঠিত হয় ও বিজয়ী কারা', a: 'ফুটবল ১৯৩০ উরুগুয়ে (বিজয়ী উরুগুয়ে) এবং ক্রিকেট ১৯৭৫ ইংল্যান্ড (বিজয়ী ওয়েস্ট ইন্ডিজ)', ch: 'gk_health_intl' },
    { q: 'বাংলাদেশ ক্রিকেট দল কবে ওয়ানডে স্ট্যাটাস, টেস্ট স্ট্যাটাস ও প্রথম টেস্ট জয় লাভ করে', a: 'ওয়ানডে স্ট্যাটাস ১৯৯৭, টেস্ট স্ট্যাটাস ২৬ জুন ২০০০ (অভিষেক ১০ নভেম্বর) এবং প্রথম টেস্ট জয় ২০০৫ (জিম্বাবুয়ে)', ch: 'gk_bangladesh' },
    { q: 'মেডিকেল বা চিকিৎসাবিজ্ঞানের জনক ও আধুনিক এনাটমির (শারীরস্থান) জনক কাকে বলা হয়', a: 'হিপোক্রেটিস (চিকিৎসাবিজ্ঞানের জনক — হিপোক্রেটিক শপথ) ও আন্দ্রেয়াস ভেসালিয়াস (আধুনিক এনাটমি)', ch: 'gk_health_intl' },
    { q: 'জীববিজ্ঞানে শ্রেণিবিন্যাসবিদ্যার জনক (Taxonomy) ও বংশগতিবিদ্যার জনক (Genetics) কে', a: 'ক্যারোলাস লিনিয়াস (দ্বিপদ নামকরণ) ও গ্রেগর জোহান মেন্ডেল', ch: 'gk_health_intl' },
    { q: 'অনুজীববিজ্ঞানের জনক (অণুবীক্ষণ যন্ত্রে প্রথম ব্যাকটেরিয়া দেখা) ও জীবাণুতত্ত্বের জনক কে', a: 'অ্যান্টনি ভন লিউয়েনহুক ও লুই পাস্তুর / রবার্ট কখ', ch: 'gk_health_intl' },
    { q: 'ক্যান্সার চিকিৎসায় কেমোথেরাপি, রেডিওথেরাপি ও ইমিউনোথেরাপি কীসের সমন্বয়', a: 'ওষুধ (Chemotherapy), তেজস্ক্রিয় বিকিরণ (Radiotherapy) ও রোগপ্রতিরোধী টি-সেল সক্রিয়করণ (Immunotherapy)', ch: 'gk_health_intl' },
    { q: 'মানবদেহের রক্তচাপ মাপার যন্ত্র ও হৃৎস্পন্দন শোনার যন্ত্র যথাক্রমে কোন দুটি', a: 'স্ফিগমোম্যানোমিটার (রক্তচাপ — স্বাভাবিক ১২০/৮০ mmHg) ও স্টেথোস্কোপ (আবিষ্কারক রেনে লেনেক)', ch: 'gk_health_intl' },
    { q: 'বিশ্বের বৃহত্তম মানবিক ও স্বাস্থ্যসেবা ভিত্তিক মেডিকেল জার্নাল ও WHO-এর ৬টি দাপ্তরিক ভাষা', a: 'ইংরেজি, ফরাসি, স্প্যানিশ, রুশ, চীনা ও আরবি (জাতিসংঘ ও WHO-এর ৬ দাপ্তরিক ভাষা)', ch: 'gk_health_intl' },
    { q: 'বাংলাদেশ বর্তমানে জাতিসংঘ শান্তিরক্ষা মিশনে শান্তিরক্ষী প্রেরণকারী দেশগুলোর মধ্যে কী অবস্থানে রয়েছে', a: 'শীর্ষতম/অন্যতম শীর্ষ শান্তিরক্ষী প্রেরণকারী দেশ (১৯৮৮ থেকে প্রায় ৬৩+ মিশনে অংশগ্রহণ)', ch: 'gk_bangladesh' },
  ];

  rapidFacts.forEach((rf, i) => {
    const others = rapidFacts.filter((x) => x.a !== rf.a);
    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: rf.ch,
        visualLessonId: rf.ch === 'gk_bangladesh' ? 'gk_timeline' : rf.ch === 'gk_bd_geo_economy' ? 'gk_bd_map' : 'gk_world_org',
        hscLevel: 'admission',
        difficulty: i % 2 === 0 ? 'medical' : 'dental',
        question: `${rf.q}?`,
        correct: rf.a,
        distractors: others.slice(i % 25, (i % 25) + 6).map((x) => x.a),
        explanation: `${rf.q} → ${rf.a}।`,
        reference: 'সাধারণ জ্ঞান · চূড়ান্ত রিভিশন প্রশ্নব্যাংক',
      })
    );

    list.push(
      buildMcq({
        id: nextId(),
        subjectId: 'gk',
        medicalGroup: 'gk',
        chapterId: rf.ch,
        visualLessonId: rf.ch === 'gk_bangladesh' ? 'gk_timeline' : rf.ch === 'gk_bd_geo_economy' ? 'gk_bd_map' : 'gk_world_org',
        hscLevel: 'admission',
        difficulty: 'board',
        question: `তথ্যসূত্র "${rf.a}" নিচের কোন সাধারণ জ্ঞান প্রশ্নের সঠিক উত্তর?`,
        correct: rf.q,
        distractors: others.slice((i + 12) % 25, ((i + 12) % 25) + 6).map((x) => x.q),
        explanation: `${rf.a} ↔ ${rf.q}।`,
        reference: 'সাধারণ জ্ঞান · গুরুত্বপূর্ণ একনজর তথ্য',
      })
    );
  });

  return list;
}
