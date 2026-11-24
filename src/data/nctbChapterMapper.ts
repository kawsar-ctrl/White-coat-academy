import { McqQuestion } from '../types/learning';

function mapBio1Chapter(q: McqQuestion): string {
  const ref = q.reference;
  const text = `${q.reference} ${q.question} ${q.explanation}`;

  if (q.chapterId === 'bio1_ch5_lower_plants') {
    if (
      /অধ্যায় ৬/.test(ref) ||
      /Riccia|Funaria|Pteris|ব্রায়োফাইটা|টেরিডোফাইটা|মস|ফার্ন|প্রোথ্যালাস|সোরাস|সারসিনেট|র‍্যামেন্টা|রাইজয়েড|আর্কিগোনিয়াম|অ্যান্থেরিডিয়াম|ক্যাপসুল/i.test(
        text
      )
    ) {
      return 'bio1_ch6_bryo_pterido';
    }
    return 'bio1_ch5_algae_fungi';
  }

  if (q.chapterId === 'bio1_ch10_repro_biotech') {
    if (/ইন-সিটু|এক্স-সিটু|ক্রায়োপ্রিজারভেশন/.test(text)) {
      return 'bio1_ch12_environment';
    }
    if (
      /অধ্যায় ১১/.test(ref) ||
      (!/অধ্যায় ১০/.test(ref) &&
        /টিস্যু কালচার|অ্যান্থার কালচার|মাইক্রোপ্রোপাগেশন|সাইব্রিড|Cybrid|প্রোটোপ্লাস্ট|প্লাজমিড|রেস্ট্রিকশন|রিকম্বিন্যান্ট|জিন ক্লোনিং|জিন গান|বায়োলিস্টিক|PCR|ফিঙ্গারপ্রিন্টিং|অ্যালেক জেফ্রিজ|জিনোম|GMO|গোল্ডেন রাইস|ইনসুলিন|ইন্টারফেরন|Pseudomonas|জৈবপ্রযুক্তি|জীবপ্রযুক্তি|Bt বেগুন/i.test(
          text
        ))
    ) {
      return 'bio1_ch11_biotech';
    }
    return 'bio1_ch10_reproduction';
  }

  return q.chapterId;
}

function mapBio2Chapter(q: McqQuestion): string {
  const ref = q.reference;
  const text = `${q.reference} ${q.question} ${q.explanation}`;

  if (q.chapterId === 'bio2_ch8_coordination') {
    if (/প্যাভলভ|Pavlov|সাপেক্ষ প্রতিবর্ত|ইমপ্রিন্টিং|ওয়াগল|মেনোট্যাক্সিস/i.test(text)) {
      return 'bio2_ch12_behavior';
    }
    if (/অধ্যায় .*৯/.test(ref) && !/অধ্যায় [৭৮]/.test(ref)) {
      return 'bio2_ch9_reproduction';
    }
    if (
      /শুক্রাণু|ডিম্বাণু|স্পার্মাটোজেনেসিস|উওজেনেসিস|সেমিনিফেরাস|সার্টলি|লেডিগ|রজঃচক্র|ঋতুচক্র|মেনস্ট্রুয়াল|ওভিউলেশন|গ্রাফিয়ান|কর্পাস লুটিয়াম|প্লাসেন্টা|ইমপ্লান্টেশন|ক্লিভেজ|ব্লাস্টোসিস্ট|গ্যাস্ট্রুলেশন|অর্গানোজেনেসিস|ভ্রূণীয়|এক্টোডার্ম|মেসোডার্ম|এন্ডোডার্ম|টেস্ট-টিউব|IVF|বয়ঃসন্ধি|শুক্রাশয়|স্ক্রোটাম|জরায়ু|অ্যান্ড্রোজেন-বাইন্ডিং|ইনহিবিন|গ্যামেটে|অ্যাক্রোসোম|জোনা পেলুসিডা/i.test(
        text
      )
    ) {
      return 'bio2_ch9_reproduction';
    }
    return 'bio2_ch8_coordination';
  }

  if (q.chapterId === 'bio2_ch10_immune_genetics') {
    if ((/অধ্যায় ৯/.test(ref) && !/অধ্যায় ৯–১২/.test(ref)) || /টেস্ট-টিউব বেবি|রবার্ট এডওয়ার্ডস/.test(text)) {
      return 'bio2_ch9_reproduction';
    }
    if (
      /অধ্যায় ১১/.test(ref) ||
      /অধ্যায় ১২/.test(ref) ||
      /মেন্ডেল|জিনতত্ত্ব|বংশগতি|ক্রোমোজোম|গ্যামেট|প্লয়েডি|সেক্স-লিঙ্কড|হিমোফিলিয়া|বর্ণান্ধতা|থ্যালাসেমিয়া|লিথাল|এপিস্ট্যাসিস|পরিপূরক জিন|হার্ডি-ওয়াইনবার্গ|জিন ফ্রিকোয়েন্সি|পপুলেশন জেনেটিক্স|বিবর্তন|ল্যামার্ক|ডারউইন|মেসোজোয়িক|সিনোজোয়িক|প্যালিওজোয়িক|জীবাশ্ম|হোমোলোগাস|Rh ফ্যাক্টর|CRISPR|DNA Profiling|জিনগত প্রকৌশল/i.test(
        text
      )
    ) {
      return 'bio2_ch11_genetics';
    }
    return 'bio2_ch10_immunity';
  }

  return q.chapterId;
}

function mapPhys1Chapter(q: McqQuestion): string {
  const ref = q.reference;
  const text = `${q.question} ${q.explanation}`;

  // Hooke's law & intermolecular/elasticity topics belong to Ch 7 (পদার্থের গাঠনিক ধর্ম)
  if (
    /হুকের সূত্র|ইয়ং-এর গুণাঙ্ক|পীড়ন|বিকৃতি|পয়সনের অনুপাত|সান্দ্রতা|স্টোকস|পৃষ্ঠটান|কৈশিক নল|আন্তঃআণবিক|স্থিতিস্থাপক|দৃঢ়তার গুণাঙ্ক|আয়তন গুণাঙ্ক/.test(
      text
    )
  ) {
    return 'phys1_ch7_matter';
  }

  if (/অধ্যায় ১০/.test(ref)) return 'phys1_ch10_ideal_gas';
  if (/অধ্যায় ৯/.test(ref)) return 'phys1_ch9_waves';
  if (/অধ্যায় ৮/.test(ref)) return 'phys1_ch8_periodic_motion';
  if (/অধ্যায় ৭/.test(ref)) return 'phys1_ch7_matter';
  if (/অধ্যায় ৬/.test(ref)) return 'phys1_ch6_gravitation';
  if (/অধ্যায় ৫/.test(ref)) return 'phys1_ch5_work_energy';
  if (/অধ্যায় ৪/.test(ref)) return 'phys1_ch4_newtonian';
  if (/অধ্যায় ৩/.test(ref)) return 'phys1_ch3_dynamics';
  if (/অধ্যায় ২/.test(ref)) return 'phys1_ch2_vector';
  if (/অধ্যায় ১/.test(ref)) return 'phys1_ch1_measurement';

  // Keyword matching for questions without explicit chapter number in reference
  if (/আদর্শ গ্যাস|বয়েল|চার্লস|রেনো|C_rms|শিশিরাঙ্ক|বাষ্পচাপ|আপেক্ষিক আর্দ্রতা|স্বাধীনতার মাত্রা|গড় মুক্ত পথ|বোল্টজম্যান/.test(text)) {
    return 'phys1_ch10_ideal_gas';
  }
  if (/ভার্নিয়ার|স্ক্রু-গজ|স্ক্রু গজ|স্ফেরোমিটার|লঘিষ্ঠ গণন|শতকরা ত্রুটি|পারসেক|আলোকবর্ষ|মাত্রা সমীকরণ|এসআই \(SI\) একক/.test(text)) {
    return 'phys1_ch1_measurement';
  }
  if (/ভেক্টর|স্কেলার গুণ|ডট গুণ|ক্রস গুণ|সামান্তরিক সূত্র|লব্ধি|নৌকা|স্রোত|গ্রেডিয়েন্ট|ডাইভারজেন্স|কার্ল|পোলার ভেক্টর/.test(text)) {
    return 'phys1_ch2_vector';
  }
  if (/প্রাস|নিক্ষিপ্ত|নিক্ষেপ|পাল্লা|পড়ন্ত বস্তু|গ্যালিলিও|বেগ-সময়|সরণ|ত্বরণ-সময়|সর্বোচ্চ উচ্চতা|উড্ডয়নকাল/.test(text)) {
    return 'phys1_ch3_dynamics';
  }
  if (/নিউটন|ভরবেগ|বলের ঘাত|জড়তার ভ্রামক|টর্ক|কৌণিক|রকেট|ব্যাংকিং|সংঘর্ষ|ঘর্ষণ|লিফট|কেন্দ্রমুখী|চক্রগতির ব্যাসার্ধ/.test(text)) {
    return 'phys1_ch4_newtonian';
  }
  if (/মহাকর্ষ|অভিকর্ষ|মুক্তিবেগ|কেপলার|কৃত্রিম উপগ্রহ|ভূ-স্থির|অক্ষাংশ|মহাকর্ষীয় বিভব|মহাকর্ষীয় প্রাবল্য/.test(text)) {
    return 'phys1_ch6_gravitation';
  }
  if (/পর্যাবৃত্ত|সরল ছন্দিত|SHM|দোলক|সেকেন্ড দোলক|দোলনকাল|স্পন্দন/.test(text)) {
    return 'phys1_ch8_periodic_motion';
  }
  if (/তরঙ্গ|শব্দ|ডেসিবেল|তীব্রতা|বীট|স্বরকম্প|ডপলার|স্থির তরঙ্গ|অর্গান নল|সুস্পন্দ|নিস্পন্দ|ল্যাপ্লাস/.test(text)) {
    return 'phys1_ch9_waves';
  }
  if (/কাজ|শক্তি|ক্ষমতা|অশ্বক্ষমতা|কর্মদক্ষতা|সংরক্ষণশীল|স্প্রিং ধ্রুবক/.test(text)) {
    return 'phys1_ch5_work_energy';
  }

  // Legacy chapterId fallback
  switch (q.chapterId) {
    case 'phys1_ch1_units_vectors':
      return 'phys1_ch1_measurement';
    case 'phys1_mechanics':
      return 'phys1_ch4_newtonian';
    case 'phys1_ch6_7_grav_matter':
      return 'phys1_ch6_gravitation';
    case 'phys1_ch8_9_shm_waves':
      return 'phys1_ch8_periodic_motion';
    case 'phys1_ch10_ideal_gas':
      return 'phys1_ch10_ideal_gas';
    default:
      return q.chapterId;
  }
}

function mapPhys2Chapter(q: McqQuestion): string {
  const ref = q.reference;
  const text = `${q.reference} ${q.question} ${q.explanation}`;

  if (/অধ্যায় ১১/.test(ref) || /জ্যোতির্বিজ্ঞান/.test(ref)) return 'phys2_ch11_astronomy';
  if (/অধ্যায় ১০/.test(ref)) return 'phys2_ch10_semiconductor';
  if (/অধ্যায় ৯/.test(ref)) return 'phys2_ch9_atomic_nuclear';
  if (/অধ্যায় ৮/.test(ref)) return 'phys2_ch8_modern_phys';
  if (/অধ্যায় ৭/.test(ref)) return 'phys2_ch7_physical_optics';
  if (/অধ্যায় ৬/.test(ref)) return 'phys2_ch6_geo_optics';
  if (/অধ্যায় ৫/.test(ref)) return 'phys2_ch5_em_induction';
  if (/অধ্যায় ৪/.test(ref)) return 'phys2_ch4_magnetism';
  if (/অধ্যায় ৩/.test(ref)) return 'phys2_ch3_current_elec';
  if (/অধ্যায় ২/.test(ref)) return 'phys2_ch2_static_elec';
  if (/অধ্যায় ১/.test(ref)) return 'phys2_thermo';

  // Keyword matching when reference lacks অধ্যায় N
  if (/কৃষ্ণগহ্বর|চন্দ্রশেখর|শ্বেত বামন|লাল দানব|সুপারনোভা|পালসার|হাবল|বিগ ব্যাং|শোয়ার্জশিল্ড/.test(text)) {
    return 'phys2_ch11_astronomy';
  }
  if (/সেমিকন্ডাক্টর|অর্ধপরিবাহী|ডায়োড|p-n|সম্মুখ ঝোঁক|বিমুখী ঝোঁক|ডিপ্লেশন|রেক্টিফায়ার|ট্রানজিস্টর|লজিক গেট|বুলিয়ান|বাইনারি|অক্টাল|হেক্সাডেসিমেল|NAND|NOR|XOR/i.test(text)) {
    return 'phys2_ch10_semiconductor';
  }
  if (/বোর|হাইড্রোজেন বর্ণালি|রিডবার্গ|তেজস্ক্রিয়|অর্ধায়ু|গড় আয়ু|ক্ষয় ধ্রুবক|আলফা|বিটা|গামা|ভর-ত্রুটি|বন্ধন শক্তি|ফিশন|ফিউশন|নিউক্লিয়াস/.test(text)) {
    return 'phys2_ch9_atomic_nuclear';
  }
  if (/আপেক্ষিক|লরেঞ্জ রূপান্তর|কাল দীর্ঘায়ন|দৈর্ঘ্য সংকোচন|আলোকতড়িৎ|ফটোইলেকট্রিক|ফোটন|কম্পটন|এক্স-রে|রন্টজেন|ডি-ব্রগলি|প্ল্যাঙ্ক/.test(text)) {
    return 'phys2_ch8_modern_phys';
  }
  if (/ভৌত আলোক|ব্যতিচার|ইয়ং|দ্বি-চির|অপবর্তন|গ্রেটিং|সমবর্তন|পোলারাইজেশন|ব্রুস্টার|ম্যালুস|হাইগেনস|তাড়িতচৌম্বক তরঙ্গ|পয়েন্টিং/.test(text)) {
    return 'phys2_ch7_physical_optics';
  }
  if (/জ্যামিতিক আলোক|প্রতিসরণ|স্নেল|সংকট কোণ|পূর্ণ অভ্যন্তরীণ|প্রিজম|লেন্স|ডায়াপ্টার|অণুবীক্ষণ|দূরবীক্ষণ|মায়োপিয়া|হ্রস্বদৃষ্টি|দীর্ঘদৃষ্টি/.test(text)) {
    return 'phys2_ch6_geo_optics';
  }
  if (/তাড়িতচৌম্বক আবেশ|ফ্যারাডে|লেঞ্জ|চৌম্বক ফ্লাক্স|স্বকীয় আবেশ|পারস্পরিক আবেশ|ট্রান্সফরমার|পরিবর্তী প্রবাহ|জেনারেটর|প্রতিঘাত|ইম্পিডেন্স|অনুনাদ|LCR|I_rms/i.test(text)) {
    return 'phys2_ch5_em_induction';
  }
  if (/চৌম্বক ক্ষেত্র|বায়ো-স্যাভার্ট|অ্যাম্পিয়ারের সূত্র|লরেঞ্জ বল|হল ক্রিয়া|হল বিভব|বিনতি|বিচ্যুতি|ডায়াচৌম্বক|প্যারাচৌম্বক|ফেরোচৌম্বক|কুরি|MRI/i.test(text)) {
    return 'phys2_ch4_magnetism';
  }
  if (/চল তড়িৎ|ওহম|তাড়ন বেগ|রোধ|আপেক্ষিক রোধ|কার্শফ|কিরশফ|হুইটস্টোন|মিটার ব্রিজ|পোটেনশিওমিটার|শান্ট|অ্যামিটার|ভোল্টমিটার|বৈদ্যুতিক ক্ষমতা|কিলোওয়াট-ঘণ্টা|জুলের তাপন/.test(text)) {
    return 'phys2_ch3_current_elec';
  }
  if (/স্থির তড়িৎ|কুলম্ব|গাউস|তড়িৎ ফ্লাক্স|তড়িৎ দ্বিমেরু|ধারক|ধারকত্ব|সমবিভব|তড়িৎ বিভব|তড়িৎ প্রাবল্য|তড়িৎ আধান/.test(text)) {
    return 'phys2_ch2_static_elec';
  }
  if (/তাপগতি|কার্নো|এনট্রপি|সমোষ্ণ|রুদ্ধতাপ|তাপমাত্রা|সেলসিয়াস|ফারেনহাইট|কেলভিন|ক্লসিয়াস|রেফ্রিজারেটর|অভ্যন্তরীণ শক্তি/.test(text)) {
    return 'phys2_thermo';
  }

  switch (q.chapterId) {
    case 'phys2_thermo':
      return 'phys2_thermo';
    case 'phys2_ch2_static_elec':
      return 'phys2_ch2_static_elec';
    case 'phys2_ch4_5_magnetism':
      return 'phys2_ch4_magnetism';
    case 'phys2_ch6_geo_optics':
      return 'phys2_ch6_geo_optics';
    case 'phys2_ch9_10_nuclear_semi':
      return 'phys2_ch9_atomic_nuclear';
    case 'phys2_elec_optics':
      return 'phys2_ch3_current_elec';
    default:
      return q.chapterId;
  }
}

export function normalizeQuestionToNctb(q: McqQuestion): McqQuestion {
  if (q.subjectId === 'bio_1') {
    const chapterId = mapBio1Chapter(q);
    return chapterId === q.chapterId ? q : { ...q, chapterId };
  }
  if (q.subjectId === 'bio_2') {
    const chapterId = mapBio2Chapter(q);
    return chapterId === q.chapterId ? q : { ...q, chapterId };
  }
  if (q.subjectId === 'phys_1') {
    const chapterId = mapPhys1Chapter(q);
    const visualLessonId = chapterId === 'phys1_ch10_ideal_gas' ? 'thermodynamics' : 'circuits_optics';
    return chapterId === q.chapterId && visualLessonId === q.visualLessonId
      ? q
      : { ...q, chapterId, visualLessonId };
  }
  if (q.subjectId === 'phys_2') {
    const chapterId = mapPhys2Chapter(q);
    const visualLessonId = chapterId === 'phys2_thermo' ? 'thermodynamics' : 'circuits_optics';
    return chapterId === q.chapterId && visualLessonId === q.visualLessonId
      ? q
      : { ...q, chapterId, visualLessonId };
  }
  return q;
}
