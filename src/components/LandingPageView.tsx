import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Menu,
  Moon,
  Stethoscope,
  Sun,
  X,
} from 'lucide-react';
import { User } from 'firebase/auth';
import heroDreamImg from '../assets/images/hero_white_coat_dream_1795542509912.jpg';
import farhanaStoryImg from '../assets/images/story_mbbs_farhana_1795542509763.jpg';
import tanvirStoryImg from '../assets/images/story_mbbs_tanvir_1795542510452.jpg';
import nusratStoryImg from '../assets/images/story_mbbs_nusrat_1795542511441.jpg';
import { BRAND_NAME, BrandLogo } from './BrandLogo';
import { AppTab } from '../types/learning';
import { ThemeMode } from '../hooks/useTheme';
import { QUESTION_BANK } from '../data/questions';
import { toBnDigits } from '../data/bioQuestionHelpers';

interface LandingPageViewProps {
  user: User | null;
  authLoading: boolean;
  authError?: string | null;
  onDismissAuthError?: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onSignIn: () => void;
  onEnterApp: (targetTab?: AppTab) => void;
}

interface SuccessStory {
  id: string;
  name: string;
  college: string;
  meritRank: string;
  batch: string;
  attemptNote: string;
  image: string;
  imageAlt: string;
  beforeScore: string;
  finalScore: string;
  dailyHours: string;
  headline: string;
  story: string;
  routineSteps: string[];
  advice: string;
}

const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'farhana',
    name: 'ফারহানা তাবাসসুম',
    college: 'ঢাকা মেডিকেল কলেজ (DMC)',
    meritRank: 'জাতীয় মেধাক্রম ১৮',
    batch: 'ব্যাচ K-80',
    attemptNote: 'প্রথমবারেই সুযোগপ্রাপ্ত',
    image: farhanaStoryImg,
    imageAlt: 'ঢাকা মেডিকেল কলেজের করিডোরে সাদা অ্যাপ্রোন ও বই হাতে ফারহানা তাবাসসুম',
    beforeScore: 'শুরুর মক স্কোর: ৫৮.৫',
    finalScore: 'চূড়ান্ত নেট স্কোর: ৮৬.৫',
    dailyHours: 'দৈনিক ৯ ঘণ্টা',
    headline: 'মূল পাঠ্যবই আর ভুলের ভান্ডারই বদলে দিয়েছিল আমার স্কোরকার্ড',
    story:
      'শুরুতে বায়োলজিতে অনেক পড়ার পরও সূক্ষ্ম ছকের প্রশ্নে ভুল হতো আর নেগেটিভ মার্কিংয়ে ৬–৭ নম্বর কমে যেত। শেষ তিন মাস আমি নতুন নোট না বাড়িয়ে প্রতিটি ভুল প্রশ্নের ব্যাখ্যা নোট করেছি এবং সপ্তাহে তিনটি করে ১০০ নম্বরের টাইমড মডেল টেস্ট দিয়েছি।',
    routineSteps: [
      'সকাল ৬:৩০ – ১০:৩০: জীববিজ্ঞান ১ম ও ২য় পত্র (গাজী আজমল ও আবুল হাসান স্যারের বইয়ের প্রতিটি ছক)।',
      'দুপুর ২:০০ – ৫:০০: রসায়নের জৈব বিক্রিয়া ও গাণিতিক অনুশীলন।',
      'রাত ৮:৩০ – ১০:৩০: ভুলের ভান্ডারের পুনরাবৃত্তি এবং ইংরেজি ও সাধারণ জ্ঞান অনুশীলন।',
    ],
    advice:
      'কত ঘণ্টা পড়ছ তার চেয়ে বড় বিষয় হলো—যে প্রশ্নটি আজ ভুল হলো, সেটি যেন পরীক্ষার হলে আর কখনো ভুল না হয়।',
  },
  {
    id: 'tanvir',
    name: 'তানভীর আহমেদ চৌধুরী',
    college: 'স্যার সলিমুল্লাহ মেডিকেল কলেজ (SSMC)',
    meritRank: 'জাতীয় মেধাক্রম ১১৪',
    batch: 'ব্যাচ SM-51',
    attemptNote: 'প্রথমবারেই সুযোগপ্রাপ্ত',
    image: tanvirStoryImg,
    imageAlt: 'মেডিকেল কলেজের পাঠাগারে পড়াশোনায় মনোযোগী তানভীর আহমেদ চৌধুরী',
    beforeScore: 'শুরুর মক স্কোর: ৬১.০',
    finalScore: 'চূড়ান্ত নেট স্কোর: ৮২.৭৫',
    dailyHours: 'দৈনিক ৮.৫ ঘণ্টা',
    headline: 'টাইম ম্যানেজমেন্ট ও ইংরেজি-জিকের ২৫ নম্বরই ছিল আমার আসল তুরুপের তাস',
    story:
      'বিজ্ঞান বিষয়ে বেশিরভাগ শিক্ষার্থীই কাছাকাছি নম্বর পায়, কিন্তু মেডিকেল ভর্তি পরীক্ষায় পার্থক্য গড়ে দেয় ইংরেজি ও সাধারণ জ্ঞানের ২৫ নম্বর। আমি প্রতিদিন সকালের ৩০ মিনিট শুধু ইংরেজি প্রিপজিশন, ভোকাবুলারি এবং বাংলাদেশের ইতিহাস অনুশীলন করেছি।',
    routineSteps: [
      'প্রতিদিন প্রথম ৪৫ মিনিট: ইংরেজি গ্রামার-ভোকাবুলারি ও সাধারণ জ্ঞানের দ্রুতগতির ড্রিল।',
      'বিকাল: পদার্থবিজ্ঞানের একক, মাত্রা ও শর্ট-ক্যালকুলেশন (ক্যালকুলেটর ছাড়া দ্রুত ভাগ-গুণ)।',
      'প্রতি শুক্রবার: ঘড়ি ধরে ৬০ মিনিটে ১০০ নম্বরের পূর্ণাঙ্গ মডেল টেস্ট।',
    ],
    advice:
      'ক্যালকুলেটর ছাড়া দশমিকের হিসাব আর ইংরেজি-জিকে নিয়মিত অনুশীলন করলে পরীক্ষার হলে অন্যদের চেয়ে ১৫ মিনিট এগিয়ে থাকা যায়।',
  },
  {
    id: 'nusrat',
    name: 'নুসরাত জাহান সুলতানা',
    college: 'চট্টগ্রাম মেডিকেল কলেজ (CMC)',
    meritRank: 'জাতীয় মেধাক্রম ১৬৭',
    batch: 'ব্যাচ CMC-66',
    attemptNote: 'দ্বিতীয়বার চেষ্টায় সফল',
    image: nusratStoryImg,
    imageAlt: 'মেডিকেল কলেজ হাসপাতালের সামনে সাদা অ্যাপ্রোনে নুসরাত জাহান সুলতানা',
    beforeScore: '১ম বারের স্কোর: ৬৯.২৫',
    finalScore: '২য় বার নেট স্কোর: ৮১.৫',
    dailyHours: 'দৈনিক ১০ ঘণ্টা',
    headline: 'প্রথমবারের ব্যর্থতা আমাকে ভেঙে দেয়নি, বরং আমাকে নিখুঁত পরিকল্পনা শিখিয়েছে',
    story:
      'প্রথমবার মাত্র ৩.৫ নম্বরের জন্য সরকারি মেডিকেলে সুযোগ হারিয়ে কয়েক সপ্তাহ ভীষণ ভেঙে পড়েছিলাম। পরে নিজের উত্তরপত্র বিশ্লেষণ করে বুঝলাম—সিলেবাস অজানা ছিল না, বরং অনুমাননির্ভর ১৬টি ভুল দাগানোই আমার স্বপ্ন আটকে দিয়েছিল।',
    routineSteps: [
      'অনিশ্চিত প্রশ্নে অনুমান না করে শুধু ৫০-৫০ এলিমিনেশনে উত্তর করার অভ্যাস গড়ে তোলা।',
      'কঠিন অধ্যায়ের ত্রিমাত্রিক ধারণা ও ভিজ্যুয়াল ইনফোগ্রাফিক দেখে দ্রুত রিভিশন।',
      'প্রতি সপ্তাহে দুর্বলতম ৩টি অধ্যায় চিহ্নিত করে আলাদা মিনি-টেস্ট দেওয়া।',
    ],
    advice:
      'একবার সুযোগ না পেলেই সব শেষ হয়ে যায় না। ধৈর্য ধরে নিজের ভুলগুলোকে শক্তিতে রূপান্তর করলে সাদা অ্যাপ্রোন ঠিকই তোমার হবে।',
  },
];

interface GuidanceTab {
  id: 'routine' | 'subjects' | 'negative' | 'final30';
  label: string;
  headline: string;
  summary: string;
  rules: { index: string; title: string; detail: string }[];
}

const GUIDANCE_TABS: GuidanceTab[] = [
  {
    id: 'routine',
    label: '০১. দৈনিক রুটিন',
    headline: 'সকাল থেকে রাত—চিকিৎসা ভর্তি পরীক্ষার আদর্শ ৮.৫ ঘণ্টার ব্লক রুটিন',
    summary:
      'দিনে ১৪ ঘণ্টা এলোমেলো পড়ার চেয়ে ফোকাসড ৪টি স্লটে ভাগ করে পড়া ও রাতে ভুলের ভান্ডার রিভিশন দেওয়া অনেক বেশি কার্যকর।',
    rules: [
      {
        index: '০১.',
        title: 'সকাল: বায়োলজি ডিপ রিডিং (৩ ঘণ্টা)',
        detail:
          'মস্তিষ্ক সবচেয়ে সতেজ থাকার সময় জীববিজ্ঞান ১ম ও ২য় পত্রের মূল বইয়ের বোল্ড লাইন, ছক এবং বৈজ্ঞানিক নাম অনুশীলন করুন।',
      },
      {
        index: '০২.',
        title: 'দুপুর: রসায়ন ও পদার্থবিজ্ঞান (৩ ঘণ্টা)',
        detail:
          'রসায়নের বিক্রিয়া-শর্ত ও সংকেতের পাশাপাশি ক্যালকুলেটর ছাড়া পদার্থবিজ্ঞানের একক-মাত্রা ও সরল গাণিতিক সমস্যা সমাধান করুন।',
      },
      {
        index: '০৩.',
        title: 'সন্ধ্যা: ইংরেজি ও সাধারণ জ্ঞান (১.৫ ঘণ্টা)',
        detail:
          'এই ২৫ নম্বর অবহেলা করবেন না। প্রতিদিন ২৫টি ইংরেজি গ্রামার-ভোকাবুলারি এবং বাংলাদেশের সংবিধান, মুক্তিযুদ্ধ ও সাম্প্রতিক তথ্য পড়ুন।',
      },
      {
        index: '০৪.',
        title: 'রাত: ভুলের ভান্ডার ও ৫ মিনিট রিকল (১ ঘণ্টা)',
        detail:
          'সারাদিন অনুশীলন করা প্রশ্নের মধ্যে যেগুলো ভুল হয়েছে, ঘুমানোর আগে শুধু সেগুলোর ব্যাখ্যা আরেকবার ঝালাই করুন।',
      },
    ],
  },
  {
    id: 'subjects',
    label: '০২. বিষয়ভিত্তিক কৌশল',
    headline: '১০০ নম্বরের মানবণ্টন অনুযায়ী পাঁচ বিষয়ে পূর্ণাঙ্গ দখল নেওয়ার কৌশল',
    summary:
      'মেডিকেল ভর্তি পরীক্ষায় জীববিজ্ঞান ৩০, রসায়ন ২৫, পদার্থবিজ্ঞান ২০, ইংরেজি ১৫ ও সাধারণ জ্ঞান ১০—মোট ১০০ নম্বরের ভারসাম্যপূর্ণ প্রস্তুতি দরকার।',
    rules: [
      {
        index: '০১.',
        title: 'জীববিজ্ঞান (৩০) ও রসায়ন (২৫) — মূল ভরকেন্দ্র',
        detail:
          'মোট ৫৫ নম্বরের এই দুটি বিষয়ে অন্তত ৪৮+ তুলতে পাঠ্যবইয়ের তুলনামূলক ছক, এনজাইম-হরমোন তালিকা ও ব্যতিক্রমধর্মী তথ্য মুখস্থের বদলে বুঝে আয়ত্ত করুন।',
      },
      {
        index: '০২.',
        title: 'পদার্থবিজ্ঞান (২০) — তত্ত্ব ও একক-ভিত্তিক প্রশ্ন',
        detail:
          'মেডিকেল পদার্থবিজ্ঞানে জটিল অঙ্কের চেয়ে সংজ্ঞা, সূত্রের আনুপাতিক সম্পর্ক, যন্ত্রের ব্যবহার ও মৌলিক তত্ত্ব থেকে প্রায় ৭৫% প্রশ্ন আসে।',
      },
      {
        index: '০৩.',
        title: 'ইংরেজি (১৫) — গ্রামার, প্রিপজিশন ও মেডিকেল পরিভাষা',
        detail:
          'রাইট ফর্ম অব ভার্বস, ক্লজ, ভয়েস-ন্যারেশনের সাথে গ্রিক-ল্যাটিন মূল শব্দ (Cardio, Hepato, Nephro) ও প্রিপজিশন নিয়মিত অনুশীলন করুন।',
      },
      {
        index: '০৪.',
        title: 'সাধারণ জ্ঞান (১০) — নির্ভুল ও যাচাইকৃত তথ্য',
        detail:
          'বাংলাদেশের অভ্যুদয়, মুক্তিযুদ্ধ, ভৌগোলিক অবস্থান, জাতীয় প্রতিষ্ঠান এবং স্বাস্থ্য-বিজ্ঞান বিষয়ক সাম্প্রতিক তথ্য আলাদাভাবে চর্চা করুন।',
      },
    ],
  },
  {
    id: 'negative',
    label: '০৩. নেগেটিভ মার্কিং নিয়ন্ত্রণ',
    headline: 'প্রতি ৪টি ভুলে কাটা যায় ১টি সঠিক উত্তর—পরীক্ষার হলে ঝুঁকি নেওয়ার সঠিক হিসাব',
    summary:
      'প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর কাটা যাওয়ায় অনেক মেধাবী পরীক্ষার্থী অতিরিক্ত দাগিয়ে মেধাতালিকা থেকে ছিটকে পড়েন।',
    rules: [
      {
        index: '০১.',
        title: '৩-রাউন্ড ওএমআর সমাধান কৌশল',
        detail:
          'প্রথম ২৫ মিনিটে শতভাগ নিশ্চিত ৭০–৭৫টি প্রশ্ন দাগান। দ্বিতীয় রাউন্ডে ৫০-৫০ এলিমিনেশন করা প্রশ্নগুলো ভেবে দাগান।',
      },
      {
        index: '০২.',
        title: 'কখন প্রশ্ন ছেড়ে দেওয়া বুদ্ধিমানের কাজ?',
        detail:
          'যদি চারটি বিকল্পের মধ্যে অন্তত দুটি নিশ্চিতভাবে বাদ দিতে না পারেন, তবে অনুমানে দাগাবেন না—০ পাওয়া -০.২৫ পাওয়ার চেয়ে অনেক নিরাপদ।',
      },
      {
        index: '০৩.',
        title: 'প্রশ্নপত্রে "নয় / ব্যতিক্রম / অসত্য" শব্দ চিহ্নিত করা',
        detail:
          'তাড়াহুড়োয় সহজ প্রশ্নে ভুল করার প্রধান কারণ হলো "কোনটি সঠিক নয়" অংশটি চোখ এড়িয়ে যাওয়া। প্রশ্নের নেতিবাচক শব্দ পেন্সিলে আন্ডারলাইন করুন।',
      },
      {
        index: '০৪.',
        title: 'অপশন এলিমিনেশন মেথড অনুশীলন',
        detail:
          'আমাদের মক টেস্ট ও প্র্যাকটিস সেশনে সময় ধরে বিকল্প বাদ দেওয়ার কৌশল চর্চা করলে পরীক্ষার হলে চাপের মধ্যেও নির্ভুল সিদ্ধান্ত নেওয়া যায়।',
      },
    ],
  },
  {
    id: 'final30',
    label: '০৪. শেষ ৩০ দিন',
    headline: 'ভর্তি পরীক্ষার শেষ ১ মাসে রিভিশন এবং মানসিক দৃঢ়তা বজায় রাখার পরিকল্পনা',
    summary:
      'শেষ ৩০ দিন নতুন কোনো গাইড বা অজানা বই খোলার সময় নয়; এটি হলো জানা তথ্যগুলোকে পরীক্ষার হলে নির্ভুলভাবে মনে রাখার সময়।',
    rules: [
      {
        index: '০১.',
        title: 'বিগত ১০ বছরের মেডিকেল ও ডেন্টাল প্রশ্ন সমাধান',
        detail:
          'গত এক দশকের মূল প্রশ্নপত্র থেকে প্রশ্নের ধরন, পুনরাবৃত্ত অধ্যায় এবং কঠিন অপশনের প্রবণতা নিজের চোখের সামনে পরিষ্কার রাখুন।',
      },
      {
        index: '০২.',
        title: 'সাপ্তাহিক ৩টি পূর্ণাঙ্গ ১০০ নম্বরের মডেল টেস্ট',
        detail:
          'ঠিক সকাল ১০টায় (মূল পরীক্ষার সময়ে) বসে ৬০ মিনিটে ১০০টি প্রশ্নের পূর্ণাঙ্গ পরীক্ষা দিন যাতে শরীর ও মন ওই সময়ের সাথে অভ্যস্ত হয়।',
      },
      {
        index: '০৩.',
        title: 'ভুলের ভান্ডার শূন্যের কোঠায় নামানো',
        detail:
          'আপনার সংরক্ষিত ভুল প্রশ্নগুলো পুনরায় সমাধান করে সঠিক করুন—এতে চূড়ান্ত পরীক্ষায় পুরোনো ভুল পুনরাবৃত্তির ঝুঁকি দূর হবে।',
      },
      {
        index: '০৪.',
        title: 'পর্যাপ্ত ঘুম ও সুস্থ রুটিন',
        detail:
          'পরীক্ষার আগের সপ্তাহে অন্তত ৬.৫–৭ ঘণ্টা ঘুম নিশ্চিত করুন; ক্লান্ত মস্তিষ্ক চেনা উত্তরও পরীক্ষার হলে গুলিয়ে ফেলে।',
      },
    ],
  },
];

const INSPIRATION_PILLARS = [
  {
    number: '০১.',
    title: 'রাতের নিস্তব্ধ পরিশ্রমই আগামীর সাদা অ্যাপ্রোন',
    quote:
      'যখন সবাই ঘুমায় আর তুমি টেবিলে বসে হৃদপিণ্ডের কপাটিকা বা জৈব যৌগের বিক্রিয়া মেলাও—সেই নীরব অধ্যবসায়ই একদিন তোমাকে স্টেথোস্কোপের অধিকারী করবে।',
  },
  {
    number: '০২.',
    title: 'তুলনা শুধু গতকালের নিজের সাথে',
    quote:
      'অন্য কে কত ঘণ্টা পড়ছে তা নিয়ে উদ্বিগ্ন না হয়ে দেখো—গত সপ্তাহের মক টেস্টের চেয়ে আজ তোমার নেট স্কোর ২ নম্বর বেশি হয়েছে কি না।',
  },
  {
    number: '০৩.',
    title: 'চিকিৎসা কেবল পেশা নয়, একটি পবিত্র দায়িত্ব',
    quote:
      'একজন রোগীর আর্তনাদ থামাতে যে জ্ঞান ও মানবিকতার প্রয়োজন, তার প্রথম ভিত্তিপ্রস্তর গাঁথা হয় আজকের সৎ ও নিষ্ঠাবান প্রস্তুতির মাধ্যমেই।',
  },
];

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  user,
  authLoading,
  authError,
  onDismissAuthError,
  theme,
  onToggleTheme,
  onSignIn,
  onEnterApp,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState<string>(SUCCESS_STORIES[0].id);
  const [activeGuidanceId, setActiveGuidanceId] = useState<GuidanceTab['id']>('routine');
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [failedPortraits, setFailedPortraits] = useState<Record<string, boolean>>({});

  const selectedStory =
    SUCCESS_STORIES.find((item) => item.id === selectedStoryId) ?? SUCCESS_STORIES[0];
  const activeGuidance =
    GUIDANCE_TABS.find((tab) => tab.id === activeGuidanceId) ?? GUIDANCE_TABS[0];

  const totalQuestionsBn = toBnDigits(QUESTION_BANK.length.toLocaleString('en-US'));
  const isDark = theme === 'dark';

  const scrollToSection = (sectionId: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bio-canvas-bg text-[#1D1336] dark:text-[#F2EDFF] overflow-x-clip transition-colors duration-200">
      {/* Subtle Ambient Volumetric Backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="glass-orb-slow absolute -top-28 -left-24 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-[#8B5CF6]/25 via-[#6D4ACF]/16 to-transparent dark:from-[#8B5CF6]/20 dark:via-[#6D4ACF]/12 blur-3xl" />
        <div className="glass-orb-slow-reverse absolute top-20 -right-28 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-sky-400/20 via-indigo-400/14 to-transparent dark:from-sky-500/14 dark:via-indigo-500/10 blur-3xl" />
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/75 dark:bg-[#100B20]/84 backdrop-blur-2xl border-b border-white/85 dark:border-white/10 shadow-[0_10px_28px_-14px_rgba(31,18,68,0.16)] dark:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.65)] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single Line, Zero Subtitle Clutter) */}
          <a
            href="#dream"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold tracking-tight text-[#1D1336] dark:text-[#F4F0FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#6D4ACF] rounded-lg"
          >
            <BrandLogo size="md" />
            <span>{BRAND_NAME}</span>
          </a>

          {/* Zone 2: 4 Concise Single-Line Section Links */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#554578] dark:text-[#B6ABD6]"
            aria-label="ল্যান্ডিং পেজ নেভিগেশন"
          >
            <a
              href="#dream"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('dream');
              }}
              className="hover:text-[#1D1336] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              স্বপ্ন ও লক্ষ্য
            </a>
            <a
              href="#stories"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('stories');
              }}
              className="hover:text-[#1D1336] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              সফলতার গল্প
            </a>
            <a
              href="#guidance"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('guidance');
              }}
              className="hover:text-[#1D1336] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              প্রস্তুতি নির্দেশনা
            </a>
            <a
              href="#inspiration"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('inspiration');
              }}
              className="hover:text-[#1D1336] dark:hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              অনুপ্রেরণা
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA Action (+ mobile menu toggle on small screens) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onEnterApp('dashboard')}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold glass-btn-primary rounded-xl whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D4ACF]"
            >
              <span>{user ? 'ড্যাশবোর্ডে প্রবেশ করুন' : 'প্রস্তুতি শুরু করুন'}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={mobileNavOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl glass-btn-secondary text-[#1D1336] dark:text-[#EDE8FF]"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-white/80 dark:border-white/10 bg-white/90 dark:bg-[#120D24]/95 backdrop-blur-2xl px-4 py-3 space-y-1">
            <button
              type="button"
              onClick={() => scrollToSection('dream')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#1D1336] dark:text-[#F4F0FF] hover:bg-white/70 dark:hover:bg-white/10"
            >
              স্বপ্ন ও লক্ষ্য
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('stories')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#1D1336] dark:text-[#F4F0FF] hover:bg-white/70 dark:hover:bg-white/10"
            >
              সফলতার গল্প
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('guidance')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#1D1336] dark:text-[#F4F0FF] hover:bg-white/70 dark:hover:bg-white/10"
            >
              প্রস্তুতি নির্দেশনা
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('inspiration')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#1D1336] dark:text-[#F4F0FF] hover:bg-white/70 dark:hover:bg-white/10"
            >
              অনুপ্রেরণা
            </button>
          </div>
        )}
      </header>

      {authError && (
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4">
          <div className="bg-rose-50/85 dark:bg-rose-950/85 backdrop-blur-xl border border-rose-200/90 dark:border-rose-400/30 text-rose-900 dark:text-rose-200 text-xs font-medium px-4 py-3 rounded-2xl flex items-center justify-between gap-4">
            <span>{authError}</span>
            {onDismissAuthError && (
              <button
                type="button"
                onClick={onDismissAuthError}
                className="text-rose-700 dark:text-rose-300 font-semibold underline shrink-0"
              >
                বন্ধ করুন
              </button>
            )}
          </div>
        </div>
      )}

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-24">
        {/* ============================================================
            SECTION 1: HERO — DOCTOR DREAM & VALUE PROPOSITION
            ============================================================ */}
        <section id="dream" className="scroll-mt-24 space-y-8">
          <div className="glass-hero-card rounded-3xl p-6 sm:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Vision Headline, Concrete Value Prop & Primary CTA */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <p className="text-xs sm:text-sm font-medium text-[#554578] dark:text-[#B6ABD6]">
                    মেডিকেল ও ডেন্টাল ভর্তি প্রস্তুতি · একাদশ–দ্বাদশ বিজ্ঞান বিভাগ
                  </p>

                  <h1
                    className="font-bold tracking-tight text-[#1D1336] dark:text-[#F7F4FF] leading-[1.16] max-w-2xl"
                    style={{ fontSize: 'clamp(2.1rem, 3.8vw, 3.4rem)' }}
                  >
                    সাদা অ্যাপ্রোন আর স্টেথোস্কোপের স্বপ্ন এখন আরও কাছাকাছি
                  </h1>

                  <p className="text-base sm:text-[17px] text-[#4B3B6E] dark:text-[#C5BCE2] leading-relaxed max-w-xl">
                    একজন দক্ষ চিকিৎসক হওয়ার দীর্ঘ যাত্রা শুরু হয় সঠিক দিকনির্দেশনা ও
                    নিয়মিত অনুশীলনের মাধ্যমে। জীববিজ্ঞান, রসায়ন, পদার্থবিজ্ঞান, ইংরেজি ও
                    সাধারণ জ্ঞানের {totalQuestionsBn}+ যাচাইকৃত প্রশ্ন এবং পূর্ণাঙ্গ
                    মডেল টেস্টের মাধ্যমে নিজেকে গড়ে তুলুন।
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => onEnterApp('dashboard')}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold glass-btn-primary rounded-2xl whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D4ACF]"
                    >
                      <span>
                        {user ? 'আমার ড্যাশবোর্ডে যান' : 'বিনামূল্যে প্রস্তুতি শুরু করুন'}
                      </span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    {user ? (
                      <button
                        type="button"
                        onClick={() => onEnterApp('medical_model')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary rounded-2xl whitespace-nowrap shrink-0"
                      >
                        <span>১০০ নম্বরের মডেল টেস্ট</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled={authLoading}
                        onClick={onSignIn}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF] glass-btn-secondary disabled:opacity-60 rounded-2xl whitespace-nowrap shrink-0"
                      >
                        <span>{authLoading ? 'যুক্ত হচ্ছে...' : 'গুগল দিয়ে সাইন-ইন'}</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-[#554578] dark:text-[#AEA2D2]">
                    {user
                      ? `স্বাগতম, ${user.displayName || 'শিক্ষার্থী'} · আপনার প্রগ্রেস ও ভুলের ভান্ডার ক্লাউডে সংরক্ষিত আছে`
                      : 'অ্যাকাউন্ট ছাড়াই প্রশ্ন সমাধান শুরু করা যায় · গুগলে লগইন করলে ৭ দিনের ফ্রি প্রো ট্রায়াল'}
                  </p>
                </div>
              </div>

              {/* Right Column: Dominant 16:9 Editorial Visual Carrier */}
              <div className="lg:col-span-6 flex">
                <div className="relative w-full min-h-[260px] sm:min-h-[340px] lg:min-h-full rounded-2xl overflow-hidden border border-white/85 dark:border-white/15 bg-[#1D1336]">
                  {heroImgFailed ? (
                    <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center gap-3 p-8 bg-gradient-to-br from-[#2B1C54] via-[#1C123A] to-[#110B24] text-white text-center">
                      <Stethoscope className="w-12 h-12 text-violet-300" />
                      <p className="text-base font-semibold">সাদা অ্যাপ্রোন ও মেডিকেল লাইব্রেরি প্রস্তুতি</p>
                    </div>
                  ) : (
                    <img
                      src={heroDreamImg}
                      alt="মেডিকেল কলেজের পাঠাগারে সাদা অ্যাপ্রোন ও স্টেথোস্কোপ পরে অধ্যয়নরত শিক্ষার্থী"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgFailed(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-5 sm:p-6">
                    <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed max-w-md">
                      প্রতিটি অধ্যায়ের গভীর ধারণা, সময়নিষ্ঠ অনুশীলন এবং নিয়মিত আত্মমূল্যায়নই গড়ে তোলে আগামীর দক্ষ চিকিৎসক।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative Strip Below Hero Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <div className="bio-card rounded-2xl p-5 space-y-1.5">
              <div className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF] font-mono-tabular tabular-nums">
                {totalQuestionsBn}+
              </div>
              <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                যাচাইকৃত ও ব্যাখ্যাসহ MCQ
              </div>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                জীববিজ্ঞান, রসায়ন, পদার্থবিজ্ঞান, ইংরেজি ও সাধারণ জ্ঞানের পূর্ণাঙ্গ সংগ্রহ
              </p>
            </div>

            <div className="bio-card rounded-2xl p-5 space-y-1.5">
              <div className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF] font-mono-tabular tabular-nums">
                ১০০ নম্বর · ৬০ মিনিট
              </div>
              <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                মেডিকেল মডেল টেস্ট
              </div>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                ভর্তি পরীক্ষার অনুরূপ মানবণ্টন ও -০.২৫ নেগেটিভ মার্কিং বিশ্লেষণ
              </p>
            </div>

            <div className="bio-card rounded-2xl p-5 space-y-1.5">
              <div className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF] font-mono-tabular tabular-nums">
                অধ্যায়ভিত্তিক ভুল ব্যাংক
              </div>
              <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                দুর্বলতা চিহ্নিতকরণ
              </div>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                প্রতিটি ভুল উত্তর স্বয়ংক্রিয়ভাবে সংরক্ষিত হয় দ্রুত পুনরাবৃত্তির জন্য
              </p>
            </div>

            <div className="bio-card rounded-2xl p-5 space-y-1.5">
              <div className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF] font-mono-tabular tabular-nums">
                ১০+ বছরের প্রশ্ন
              </div>
              <div className="text-sm font-semibold text-[#1D1336] dark:text-[#F4F0FF]">
                বিগত প্রশ্ন ও ভিজ্যুয়াল লেসন
              </div>
              <p className="text-xs text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                বিগত মেডিকেল-ডেন্টাল প্রশ্নের পাশাপাশি ইনফোগ্রাফিক ও অনুশীলন ওয়ার্কশীট
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: MBBS SUCCESS STORIES (PROOF & TESTIMONIALS)
            ============================================================ */}
        <section id="stories" className="scroll-mt-24 space-y-8">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
              ০১. বাস্তব অভিজ্ঞতা ও সাফল্য
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1D1336] dark:text-[#F4F0FF]">
              এমবিবিএস পড়ুয়াদের সাদা অ্যাপ্রোন অর্জনের গল্প
            </h2>
            <p className="text-sm sm:text-base text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
              দেশের সরকারি মেডিকেল কলেজের শিক্ষার্থীরা কীভাবে শুরুর জড়তা কাটিয়ে, ভুল বিশ্লেষণ ও
              সময়নিষ্ঠ পরীক্ষার মাধ্যমে কাঙ্ক্ষিত মেধাতালিকায় জায়গা করে নিয়েছেন—তাঁদের গল্প ও কৌশল জানুন।
            </p>
          </div>

          {/* 3 Attributable Story Cards (Interactive Selector Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SUCCESS_STORIES.map((story) => {
              const isSelected = story.id === selectedStory.id;
              const imgFailed = Boolean(failedPortraits[story.id]);
              return (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setSelectedStoryId(story.id)}
                  className={`text-left rounded-2xl overflow-hidden transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#6D4ACF] ${
                    isSelected
                      ? 'bio-card ring-2 ring-[#6D4ACF] dark:ring-[#A78BFA]'
                      : 'bio-card opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#221742]">
                    {imgFailed ? (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#342168] to-[#1A1038] text-violet-200">
                        <Stethoscope className="w-10 h-10" />
                      </div>
                    ) : (
                      <img
                        src={story.image}
                        alt={story.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedPortraits((prev) => ({ ...prev, [story.id]: true }))
                        }
                        className="w-full h-full object-cover object-top"
                      />
                    )}
                  </div>
                  <div className="p-5 space-y-2.5">
                    <div className="text-xs text-[#554578] dark:text-[#B6ABD6] font-mono-tabular tabular-nums">
                      {story.meritRank} · {story.batch} · {story.attemptNote}
                    </div>
                    <h3 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                      {story.name}
                    </h3>
                    <p className="text-xs font-medium text-[#6D4ACF] dark:text-[#C4B5FD]">
                      {story.college}
                    </p>
                    <p className="text-sm text-[#4B3B6E] dark:text-[#C5BCE2] leading-relaxed line-clamp-2">
                      {story.headline}
                    </p>
                    <div className="pt-2 border-t border-[#1D1336]/10 dark:border-white/10 text-xs font-medium text-[#554578] dark:text-[#B6ABD6] font-mono-tabular tabular-nums">
                      {story.beforeScore} → {story.finalScore}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Story & Preparation Breakdown Panel */}
          <div className="bio-card rounded-3xl p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-medium text-[#554578] dark:text-[#B6ABD6] font-mono-tabular tabular-nums">
                  {selectedStory.name} · {selectedStory.college} · {selectedStory.dailyHours}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  “{selectedStory.headline}”
                </h3>
                <p className="text-sm sm:text-base text-[#3D2E5C] dark:text-[#D5CDF0] leading-relaxed">
                  {selectedStory.story}
                </p>
                <div className="pt-2 text-sm text-[#1D1336] dark:text-[#F4F0FF]">
                  <span className="font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                    নতুনদের জন্য পরামর্শ:
                  </span>{' '}
                  {selectedStory.advice}
                </div>
              </div>

              <div className="lg:col-span-5 bio-subpanel rounded-2xl p-5 sm:p-6 space-y-4">
                <h4 className="text-sm font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  তাঁর অনুসৃত দৈনিক অনুশীলন ধাপ
                </h4>
                <ul className="space-y-3">
                  {selectedStory.routineSteps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4B3B6E] dark:text-[#C5BCE2] leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#6D4ACF] dark:text-[#A78BFA] shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: ACTIONABLE PREPARATION GUIDELINES
            ============================================================ */}
        <section id="guidance" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <p className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                ০২. প্রস্তুতি নির্দেশনা ও কৌশল
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1D1336] dark:text-[#F4F0FF]">
                চিকিৎসক হওয়ার লক্ষ্যে গোছানো দিকনির্দেশনা
              </h2>
              <p className="text-sm sm:text-base text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                কেবল বেশি সময় পড়লেই নয়, সঠিক কৌশলে পড়লে অল্প সময়েও আত্মবিশ্বাসের সাথে
                সিলেবাস আয়ত্ত করা সম্ভব। নিচের ধাপগুলো থেকে প্রয়োজনীয় নির্দেশনা বেছে নিন।
              </p>
            </div>

            <button
              type="button"
              onClick={() => onEnterApp('practice')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF] rounded-xl whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              <BookOpen className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0" />
              <span>অধ্যায়ভিত্তিক প্র্যাকটিস খুলুন</span>
            </button>
          </div>

          {/* Interactive Filter Tabs */}
          <div
            role="tablist"
            aria-label="প্রস্তুতি নির্দেশনার বিষয়সমূহ"
            className="inline-flex flex-wrap gap-1.5 p-1.5 glass-segment-track rounded-2xl"
          >
            {GUIDANCE_TABS.map((tab) => {
              const active = tab.id === activeGuidanceId;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setActiveGuidanceId(tab.id)}
                  className={`px-4 py-2 text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap shrink-0 ${
                    active
                      ? 'glass-segment-active'
                      : 'text-[#554578] dark:text-[#B6ABD6] hover:text-[#1D1336] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Guideline Details */}
          <div className="bio-card rounded-3xl p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="space-y-2 max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                {activeGuidance.headline}
              </h3>
              <p className="text-sm sm:text-base text-[#554578] dark:text-[#B6ABD6] leading-relaxed">
                {activeGuidance.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {activeGuidance.rules.map((rule) => (
                <div
                  key={rule.index}
                  className="bio-subpanel rounded-2xl p-5 sm:p-6 space-y-2"
                >
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-sm font-bold text-[#6D4ACF] dark:text-[#C4B5FD] font-mono-tabular tabular-nums">
                      {rule.index}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                      {rule.title}
                    </h4>
                  </div>
                  <p className="text-sm text-[#4B3B6E] dark:text-[#C5BCE2] leading-relaxed">
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 4: INSPIRATION & WHITE COAT CONVERSION BANNER
            ============================================================ */}
        <section id="inspiration" className="scroll-mt-24 space-y-10">
          <div className="max-w-2xl space-y-2.5">
            <p className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
              ০৩. অনুপ্রেরণা ও অঙ্গীকার
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1D1336] dark:text-[#F4F0FF]">
              হতাশ না হয়ে এগিয়ে চলার তিনটি মূলমন্ত্র
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {INSPIRATION_PILLARS.map((item) => (
              <div key={item.number} className="bio-card rounded-2xl p-6 space-y-3">
                <div className="text-sm font-bold text-[#6D4ACF] dark:text-[#C4B5FD] font-mono-tabular tabular-nums">
                  {item.number}
                </div>
                <h3 className="text-lg font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4B3B6E] dark:text-[#C5BCE2] leading-relaxed">
                  {item.quote}
                </p>
              </div>
            ))}
          </div>

          {/* Focused Conversion Banner */}
          <div className="glass-hero-card rounded-3xl p-7 sm:p-10 lg:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold text-[#6D4ACF] dark:text-[#C4B5FD]">
                  আজকের অনুশীলনই আগামীর সাফল্য
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1D1336] dark:text-[#F4F0FF]">
                  তোমার সাদা অ্যাপ্রোনের প্রস্তুতি শুরু করো এখনই
                </h3>
                <p className="text-sm sm:text-base text-[#4B3B6E] dark:text-[#C5BCE2] leading-relaxed">
                  অধ্যায়ভিত্তিক {totalQuestionsBn}+ প্রশ্ন সমাধান, তাৎক্ষণিক ব্যাখ্যা ও পূর্ণাঙ্গ
                  ১০০ নম্বরের মেডিকেল মডেল টেস্টের মাধ্যমে নিজের বর্তমান অবস্থান যাচাই করো।
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onEnterApp('dashboard')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold glass-btn-primary rounded-2xl whitespace-nowrap shrink-0"
                >
                  <span>ড্যাশবোর্ডে প্রবেশ করুন</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <button
                  type="button"
                  onClick={() => onEnterApp('medical_model')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold glass-btn-secondary text-[#1D1336] dark:text-[#F4F0FF] rounded-2xl whitespace-nowrap shrink-0"
                >
                  <Compass className="w-4 h-4 text-[#6D4ACF] dark:text-[#C4B5FD] shrink-0" />
                  <span>মডেল টেস্ট দেখুন</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-10 border-t border-white/80 dark:border-white/10 bg-white/55 dark:bg-[#100B20]/75 backdrop-blur-xl mt-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#554578] dark:text-[#B6ABD6]">
          <span className="inline-flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <span>
              <strong className="font-bold text-[#1D1336] dark:text-[#F4F0FF]">{BRAND_NAME}</strong>
              {' · '}বাংলাদেশের মেডিকেল ও ডেন্টাল ভর্তি প্রস্তুতি প্ল্যাটফর্ম
            </span>
          </span>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#stories"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('stories');
              }}
              className="hover:text-[#1D1336] dark:hover:text-white transition-colors"
            >
              সফলতার গল্প
            </a>
            <a
              href="#guidance"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('guidance');
              }}
              className="hover:text-[#1D1336] dark:hover:text-white transition-colors"
            >
              প্রস্তুতি নির্দেশনা
            </a>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D1336] dark:text-[#EDE8FF] hover:underline"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-[#6D4ACF]" />}
              <span>{isDark ? 'লাইট মোড' : 'ডার্ক মোড'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
