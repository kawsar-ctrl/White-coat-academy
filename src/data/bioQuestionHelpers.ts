import { HscLevel, McqQuestion, MedicalSubjectGroup, SubjectId } from '../types/learning';

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'] as const;

export function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
}

function stableHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function inferMedicalGroup(subjectId: SubjectId): MedicalSubjectGroup {
  if (subjectId === 'chem_1' || subjectId === 'chem_2') return 'chem';
  if (subjectId === 'phys_1' || subjectId === 'phys_2') return 'phys';
  if (subjectId === 'eng') return 'eng';
  if (subjectId === 'gk') return 'gk';
  return 'bio';
}

export function buildMcq(params: {
  id: string;
  subjectId: SubjectId;
  medicalGroup?: MedicalSubjectGroup;
  chapterId: string;
  visualLessonId: string;
  hscLevel: HscLevel;
  difficulty: 'board' | 'medical' | 'dental';
  question: string;
  correct: string;
  distractors: string[];
  explanation: string;
  reference: string;
}): McqQuestion {
  const uniqueWrong: string[] = [];
  for (const d of params.distractors) {
    const trimmed = d.trim();
    if (trimmed && trimmed !== params.correct.trim() && !uniqueWrong.includes(trimmed)) {
      uniqueWrong.push(trimmed);
    }
    if (uniqueWrong.length === 3) break;
  }

  while (uniqueWrong.length < 3) {
    uniqueWrong.push(`বিকল্প-${toBnDigits(uniqueWrong.length + 1)}`);
  }

  const slot = stableHash(params.id) % 4;
  const arr: [string, string, string, string] = [
    uniqueWrong[0],
    uniqueWrong[1],
    uniqueWrong[2],
    params.correct.trim(),
  ];

  // Rotate so correct sits at `slot`
  if (slot !== 3) {
    const tmp = arr[slot];
    arr[slot] = arr[3];
    arr[3] = tmp;
  }

  return {
    id: params.id,
    subjectId: params.subjectId,
    medicalGroup: params.medicalGroup ?? inferMedicalGroup(params.subjectId),
    chapterId: params.chapterId,
    visualLessonId: params.visualLessonId,
    hscLevel: params.hscLevel,
    difficulty: params.difficulty,
    question: params.question,
    options: arr,
    correctIndex: slot as 0 | 1 | 2 | 3,
    explanation: params.explanation,
    reference: params.reference,
  };
}

export interface BioFactEntry {
  chapterId: string;
  visualLessonId: string;
  entity: string;
  category: string;
  reference: string;
  difficulty?: 'board' | 'medical' | 'dental';
  /** Direct functional definition / hallmark */
  hallmark?: string;
  /** Scientist / discoverer + year */
  discoverer?: string;
  /** Quantitative number / size / count */
  metric?: string;
  metricPrompt?: string;
  /** Location / site / organ / phase */
  site?: string;
  sitePrompt?: string;
  /** Primary example / causal agent / disease / plant */
  example?: string;
  examplePrompt?: string;
  /** Detailed textbook note used in explanation */
  note: string;
}

export function synthesizeFromFacts(params: {
  prefix: string;
  subjectId: SubjectId;
  medicalGroup?: MedicalSubjectGroup;
  hscLevel: HscLevel;
  facts: BioFactEntry[];
  categoryPools: Record<string, string[]>;
  hallmarkPool: string[];
  discovererPool: string[];
  sitePool: string[];
  metricPool: string[];
  examplePool: string[];
}): McqQuestion[] {
  const out: McqQuestion[] = [];
  const seenQuestions = new Set<string>();
  let seq = 1;

  const pushUnique = (q: McqQuestion) => {
    const norm = q.question.trim();
    if (seenQuestions.has(norm)) return;
    seenQuestions.add(norm);
    out.push(q);
  };

  // Precompute sibling pools per chapter & category
  const entityByCat: Record<string, string[]> = { ...params.categoryPools };
  for (const f of params.facts) {
    if (!entityByCat[f.category]) entityByCat[f.category] = [];
    if (!entityByCat[f.category].includes(f.entity)) {
      entityByCat[f.category].push(f.entity);
    }
  }

  const pickSiblings = (
    primaryPool: string[],
    exclude: string,
    seed: string,
    fallbackPool?: string[]
  ): string[] => {
    const merged = Array.from(new Set([...primaryPool, ...(fallbackPool || [])]));
    const candidates = merged.filter((x) => x && x.trim() !== exclude.trim());
    if (candidates.length === 0) return [];
    const h = stableHash(seed);
    const rotated: string[] = [];
    for (let i = 0; i < candidates.length; i += 1) {
      rotated.push(candidates[(h + i * 7) % candidates.length]);
    }
    return Array.from(new Set(rotated)).slice(0, 5);
  };

  const allEntities = params.facts.map((x) => x.entity);
  const diffFor = (i: number, explicit?: 'board' | 'medical' | 'dental') =>
    explicit ?? (i % 3 === 0 ? 'medical' : i % 3 === 1 ? 'dental' : 'board');

  params.facts.forEach((f, idx) => {
    const siblingEntities = pickSiblings(
      entityByCat[f.category] || allEntities,
      f.entity,
      `${params.prefix}_ent_${idx}`,
      allEntities
    );

    // Angle 1: Given hallmark -> identify entity
    if (f.hallmark && siblingEntities.length >= 3) {
      const id = `${params.prefix}_${String(seq++).padStart(4, '0')}`;
      pushUnique(
        buildMcq({
          id,
          subjectId: params.subjectId,
          medicalGroup: params.medicalGroup,
          chapterId: f.chapterId,
          visualLessonId: f.visualLessonId,
          hscLevel: params.hscLevel,
          difficulty: diffFor(idx, f.difficulty),
          question: `${f.hallmark} — এটি নিচের কোনটির ক্ষেত্রে প্রযোজ্য?`,
          correct: f.entity,
          distractors: siblingEntities,
          explanation: `${f.entity}: ${f.hallmark}। ${f.note}`,
          reference: f.reference,
        })
      );
    }

    // Angle 2: Given entity -> identify primary hallmark/function
    if (f.hallmark) {
      const sameCatHallmarks = params.facts
        .filter((x) => x.entity !== f.entity && x.hallmark && x.category === f.category)
        .map((x) => x.hallmark as string);
      const distractors = pickSiblings(
        sameCatHallmarks,
        f.hallmark,
        `${params.prefix}_hm_${idx}`,
        params.hallmarkPool
      );
      if (distractors.length >= 3) {
        const id = `${params.prefix}_${String(seq++).padStart(4, '0')}`;
        pushUnique(
          buildMcq({
            id,
            subjectId: params.subjectId,
            chapterId: f.chapterId,
            visualLessonId: f.visualLessonId,
            hscLevel: params.hscLevel,
            difficulty: diffFor(idx + 1, f.difficulty),
            question: `"${f.entity}"-এর প্রধান বৈশিষ্ট্য বা ভূমিকা কোনটি?`,
            correct: f.hallmark,
            distractors,
            explanation: `${f.entity}-এর মূল বৈশিষ্ট্য হলো ${f.hallmark}। ${f.note}`,
            reference: f.reference,
          })
        );
      }
    }

    // Angle 3: Discoverer / Scientist
    if (f.discoverer) {
      const distractors = pickSiblings(
        params.discovererPool,
        f.discoverer,
        `${params.prefix}_disc_${idx}`
      );
      if (distractors.length >= 3) {
        const id = `${params.prefix}_${String(seq++).padStart(4, '0')}`;
        pushUnique(
          buildMcq({
            id,
            subjectId: params.subjectId,
            chapterId: f.chapterId,
            visualLessonId: f.visualLessonId,
            hscLevel: params.hscLevel,
            difficulty: diffFor(idx + 2, f.difficulty),
            question: `"${f.entity}" সম্পর্কিত তত্ত্ব, আবিষ্কার বা নামকরণের সাথে কোন বিজ্ঞানী যুক্ত?`,
            correct: f.discoverer,
            distractors,
            explanation: `${f.entity} সম্পর্কিত মূল আবিষ্কার/নামকরণ করেন ${f.discoverer}। ${f.note}`,
            reference: f.reference,
          })
        );
      }
    }

    // Angle 4: Quantitative metric
    if (f.metric) {
      const catMetrics = params.facts
        .filter((x) => x.entity !== f.entity && x.metric && x.category === f.category)
        .map((x) => x.metric as string);
      const distractors = pickSiblings(
        catMetrics,
        f.metric,
        `${params.prefix}_met_${idx}`,
        params.metricPool
      );
      if (distractors.length >= 3) {
        const id = `${params.prefix}_${String(seq++).padStart(4, '0')}`;
        pushUnique(
          buildMcq({
            id,
            subjectId: params.subjectId,
            chapterId: f.chapterId,
            visualLessonId: f.visualLessonId,
            hscLevel: params.hscLevel,
            difficulty: diffFor(idx, f.difficulty),
            question: f.metricPrompt || `"${f.entity}"-এর ক্ষেত্রে সঠিক সংখ্যাগত মান বা পরিমাপ কোনটি?`,
            correct: f.metric,
            distractors,
            explanation: `${f.entity}-এর নির্ধারিত মান ${f.metric}। ${f.note}`,
            reference: f.reference,
          })
        );
      }
    }

    // Angle 5: Anatomical / physiological site
    if (f.site) {
      const catSites = params.facts
        .filter((x) => x.entity !== f.entity && x.site && x.category === f.category)
        .map((x) => x.site as string);
      const distractors = pickSiblings(
        catSites,
        f.site,
        `${params.prefix}_site_${idx}`,
        params.sitePool
      );
      if (distractors.length >= 3) {
        const id = `${params.prefix}_${String(seq++).padStart(4, '0')}`;
        pushUnique(
          buildMcq({
            id,
            subjectId: params.subjectId,
            chapterId: f.chapterId,
            visualLessonId: f.visualLessonId,
            hscLevel: params.hscLevel,
            difficulty: diffFor(idx + 1, f.difficulty),
            question: f.sitePrompt || `"${f.entity}" কোথায় অবস্থান করে বা সংঘটিত হয়?`,
            correct: f.site,
            distractors,
            explanation: `${f.entity}-এর অবস্থান/ক্ষেত্র হলো ${f.site}। ${f.note}`,
            reference: f.reference,
          })
        );
      }
    }

    // Angle 6: Example / Disease / Organism
    if (f.example) {
      const catExamples = params.facts
        .filter((x) => x.entity !== f.entity && x.example && x.category === f.category)
        .map((x) => x.example as string);
      const distractors = pickSiblings(
        catExamples,
        f.example,
        `${params.prefix}_ex_${idx}`,
        params.examplePool
      );
      if (distractors.length >= 3) {
        const id = `${params.prefix}_${String(seq++).padStart(4, '0')}`;
        pushUnique(
          buildMcq({
            id,
            subjectId: params.subjectId,
            chapterId: f.chapterId,
            visualLessonId: f.visualLessonId,
            hscLevel: params.hscLevel,
            difficulty: diffFor(idx + 2, f.difficulty),
            question: f.examplePrompt || `"${f.entity}"-এর সাথে সরাসরি সম্পর্কিত উদাহরণ, উদ্ভিদ বা রোগ কোনটি?`,
            correct: f.example,
            distractors,
            explanation: `${f.entity}-এর উল্লেখযোগ্য উদাহরণ/সংশ্লিষ্টতা: ${f.example}। ${f.note}`,
            reference: f.reference,
          })
        );
      }
    }
  });

  return out;
}
