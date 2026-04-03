import type { Service } from "@/data/servicesData";

const unique = (items: Array<string | undefined | null>) =>
  Array.from(new Set(items.filter(Boolean) as string[]));

const collapseRepeatedWords = (value: string) => {
  const words = value.split(" ").filter(Boolean);
  return words.filter((word, index) => index === 0 || word !== words[index - 1]).join(" ");
};

const normalizeKeyword = (value: string) =>
  collapseRepeatedWords(
    value
      .replace(/[\/]/g, " ")
      .replace(/\s*&\s*/g, " and ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
  );

const hasWord = (value: string, word: string) => new RegExp(`\b${word}\b`, "i").test(value);

const stripTrailingWords = (value: string, words: string[]) => {
  let output = value.trim();
  let changed = true;

  while (changed) {
    changed = false;
    for (const word of words) {
      const regex = new RegExp(`\s*\b${word}\b\s*$`, "i");
      if (regex.test(output)) {
        output = output.replace(regex, "").trim();
        changed = true;
      }
    }
  }

  return output.trim();
};

const addKeyword = (bucket: Set<string>, phrase?: string) => {
  if (!phrase) return;
  const normalized = normalizeKeyword(phrase);
  if (!normalized || normalized.length < 3) return;
  if (/(service\s+service)|(help\s+help)|(writing\s+writing)/.test(normalized)) return;
  bucket.add(normalized);
};

const categoryIntent: Record<string, string[]> = {
  "Academic Writing": [
    "assignment help",
    "coursework support",
    "university writing help",
    "student writing service",
    "academic formatting support",
  ],
  "Business Writing": [
    "business writing service",
    "professional document writing",
    "business communication support",
    "custom business content",
  ],
  "Career Writing": ["resume help", "cover letter support", "linkedin profile help", "job application writing"],
  "Editing & Proofreading": ["editing service", "proofreading help", "grammar and clarity review", "document polishing"],
  "Translation & Communication": ["translation service", "professional translation", "clear communication support", "language accuracy"],
  "Admissions": ["admission essay help", "personal statement help", "application writing support", "student admission support"],
  "Research & Analysis": ["research support", "data analysis help", "report writing support", "methodology guidance"],
  "Creative & Content Writing": ["content writing service", "blog writing help", "website content writing", "brand storytelling"],
};

const serviceKeywordClusters: Record<string, string[]> = {
  "assignment-writing": [
    "assignment writing service",
    "assignment help",
    "online assignment help",
    "assignment writer",
    "college assignment help",
    "university assignment help",
    "coursework help",
    "coursework writing service",
    "custom assignment writing",
    "urgent assignment help",
    "academic assignment writers",
    "assignment writing online",
  ],
  "essay-writing": [
    "essay writing service",
    "essay help",
    "essay writer",
    "custom essay writing",
    "college essay help",
    "essay writing online",
    "academic essay writing",
  ],
  "research-paper": [
    "research paper writing",
    "research paper help",
    "custom research paper",
    "research paper writer",
    "research writing service",
    "academic research paper help",
  ],
  "thesis-writing": [
    "thesis writing service",
    "thesis help",
    "thesis writer",
    "masters thesis help",
    "thesis proposal help",
  ],
  "dissertation-writing": [
    "dissertation writing service",
    "dissertation help",
    "dissertation writer",
    "doctoral dissertation help",
    "dissertation proposal help",
  ],
  "report-writing": [
    "report writing service",
    "academic report writing",
    "report writing help",
    "university report help",
    "business report writing",
  ],
  proofreading: [
    "proofreading service",
    "proofreading help",
    "academic proofreading",
    "professional proofreading service",
    "editing and proofreading",
  ],
};

export const getServiceKeywords = (service: Service) => {
  const keywords = new Set<string>();
  const title = normalizeKeyword(service.title);
  const titleCore = stripTrailingWords(title, ["service", "services", "help"]);

  addKeyword(keywords, title);
  addKeyword(keywords, titleCore);
  addKeyword(keywords, service.category);

  if (!hasWord(title, "service")) addKeyword(keywords, `${titleCore} service`);
  if (!hasWord(title, "help")) addKeyword(keywords, `${titleCore} help`);
  addKeyword(keywords, `online ${titleCore}`);
  addKeyword(keywords, `professional ${titleCore}`);
  addKeyword(keywords, `custom ${titleCore}`);

  if (service.category === "Academic Writing") {
    addKeyword(keywords, `student ${titleCore}`);
    addKeyword(keywords, `college ${titleCore}`);
    addKeyword(keywords, `university ${titleCore}`);
  }

  if (service.category === "Business Writing") {
    addKeyword(keywords, `business ${titleCore}`);
    addKeyword(keywords, `professional ${titleCore} service`);
  }

  if (service.category === "Editing & Proofreading") {
    addKeyword(keywords, `${titleCore} for students`);
    addKeyword(keywords, `${titleCore} for professionals`);
  }

  [
    ...(service.seoTags || []),
    ...(service.variations || []),
    ...(service.attributes || []),
    ...(categoryIntent[service.category] || []),
    ...(serviceKeywordClusters[service.id] || []),
  ].forEach((item) => addKeyword(keywords, item));

  return Array.from(keywords);
};

const longDescriptionOverrides: Record<string, string> = {
  "assignment-writing": `Our assignment writing service is designed for students who need reliable help with coursework, university assignments, reports, short questions, presentations, and subject-specific tasks. We work from your instructions, grading rubric, module brief, and deadline so the final draft feels organised, relevant, and easy to review before submission. Whether you need support with a one-off task or ongoing assignment help during a busy semester, the goal is to deliver clear academic writing that follows your required structure, citation style, and word count.

Clients usually choose this service when they need assignment help that is fast, properly formatted, and tailored to their academic level. We can support research-based tasks, analytical writing, descriptive work, reflective pieces, and coursework that requires references or step-by-step explanations. Every project is handled with attention to clarity, originality, and revision support so you can submit work that is cleaner, stronger, and more confident.` ,
  "essay-writing": `Our essay writing service is built for students who need structured, well-argued, and source-based essays across school, college, and university levels. The writing process starts with your instructions, topic, preferred citation style, and deadline. From there, we focus on building a clear thesis, strong paragraph flow, and evidence-based support so the final essay feels polished instead of generic.

This service works well for argumentative essays, reflective essays, compare and contrast essays, admission essays, and subject-specific assignments that need a strong academic voice. If you need essay help with research, editing, structure, or revision support, the service is designed to keep the process simple while delivering professional, readable work.` ,
  "research-paper": `Our research paper writing service supports students and researchers who need original, organised, and evidence-led academic work. We help with topic refinement, source selection, literature integration, methodology sections, findings discussion, and final formatting so the completed paper matches the academic purpose of your project.

This service is useful when you need research paper help for a deadline-driven submission, a difficult topic, or a paper that requires stronger academic structure. We focus on credible references, logical flow, clean analysis, and practical revision support so the final document is easier to present, submit, and defend.` ,
  "thesis-writing": `Our thesis writing service is intended for master's and postgraduate students who need focused support with proposals, chapters, literature reviews, methodology, and academic editing. Instead of using broad filler language, we work around the specific brief, research aim, and university expectations for your subject area.

This service is especially helpful when a thesis becomes difficult to organise, when chapter deadlines start overlapping, or when the writing needs a stronger academic structure. The aim is to provide thesis help that feels practical, professional, and aligned with your supervisor's expectations.` ,
  "dissertation-writing": `Our dissertation writing service is designed for advanced academic projects that require depth, structure, and consistency from introduction to conclusion. We support proposal development, chapter planning, literature reviews, methodology, analysis, discussion, editing, and final presentation so the document reads like a coherent academic project rather than disconnected sections.

Students usually choose this service when they need dissertation help with time management, chapter drafting, source handling, or improving the academic quality of an existing draft. The work is guided by your research objectives, citation requirements, and feedback so the final dissertation is stronger, clearer, and better prepared for review.` ,
  "report-writing": `Our academic report writing service helps students and professionals who need formal reports with a clear purpose, strong structure, and professional presentation. We can assist with business reports, technical reports, analytical reports, project reports, and coursework reports that need headings, evidence, recommendations, and concise writing.

This service is a good fit when you need report writing help for university submissions, workplace documents, or assessments that require a formal tone and structured layout. We focus on accuracy, readability, and logical organisation so the final report is easy to follow and suitable for submission or review.` ,
  proofreading: `Our proofreading service is for clients who already have a draft but want the final version to read more clearly and professionally. We review grammar, punctuation, spelling, sentence flow, tone consistency, and small formatting issues so the document feels polished without losing your original meaning.

This service works well for essays, assignments, research papers, resumes, website copy, business documents, and admission materials. If your writing is almost ready but still needs a careful final check, proofreading helps remove distractions and improves overall readability before submission.`
};

export const getServiceLongDescription = (service: Service) => {
  if (longDescriptionOverrides[service.id]) return longDescriptionOverrides[service.id];
  if (service.explainedDescription) return service.explainedDescription;

  const variationsText = service.variations?.length
    ? `Common requests include ${service.variations.slice(0, 4).join(", ")}.`
    : "We can adapt the work to your exact brief, subject, format, and academic or professional level.";

  const attributesText = service.attributes?.length
    ? `Typical priorities include ${service.attributes.slice(0, 4).join(", ").toLowerCase()}.`
    : "Every order is tailored to your instructions, formatting style, and deadline.";

  return `${service.title} at WritingEra is designed for clients who need clear, original, and deadline-focused support. We work from your instructions, reference material, and expected format so the final draft feels organised, relevant, and ready for review before submission. ${variationsText} ${attributesText} This service is built to give you dependable writing support, practical revisions, and a smoother order process from start to finish.`;
};

export const getServiceUses = (service: Service) => {
  if (service.uses?.length) return service.uses;

  return unique([
    ...(service.variations || []),
    `Urgent ${service.title.toLowerCase()} requests`,
    `${service.category.toLowerCase()} projects with custom instructions`,
    `Revisions based on tutor or client feedback`,
  ]).slice(0, 6);
};

export const getServiceBenefits = (service: Service) => {
  if (service.benefits?.length) return service.benefits;

  return unique([
    "Aligned with your brief and deadline",
    "Clear structure and readable flow",
    "Original writing with source-based support",
    ...(service.attributes || []).map((item) => `${item} focus`),
  ]).slice(0, 6);
};

export const getServiceFaqs = (service: Service) => {
  const title = service.title;

  if (service.id === "assignment-writing") {
    return [
      {
        question: "What can I order under assignment writing service?",
        answer: "You can request coursework, university assignments, reports, short answer tasks, lab work, presentations, and subject-specific academic writing based on your brief and deadline.",
      },
      {
        question: "Can you follow my university guidelines and referencing style?",
        answer: "Yes. You can share your rubric, sample file, citation style, and any lecturer instructions so the work follows the required structure and formatting standard.",
      },
      {
        question: "Is assignment help available for urgent deadlines?",
        answer: "Yes. Turnaround depends on length and complexity, but urgent assignment help can be discussed before the order is confirmed.",
      },
      {
        question: "Can I ask for edits after I review the draft?",
        answer: "Yes. Revision support is available so reasonable changes can be made after you review the first version.",
      },
    ];
  }

  return [
    {
      question: `What is included in the ${title}?`,
      answer:
        service.attributes?.join(", ") ||
        "The service includes research-based drafting, formatting support, and revisions based on the selected scope.",
    },
    {
      question: `Can I request ${title.toLowerCase()} for a specific subject or format?`,
      answer:
        "Yes. You can share your rubric, subject area, citation style, and deadline so the work is matched to your exact requirements.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Delivery depends on length, complexity, and urgency. Standard timelines are available, and rush options can be discussed before you place the order.",
    },
    {
      question: "Do you provide revisions?",
      answer:
        "Yes. Revision support is available so requested changes can be handled after you review the first draft.",
    },
  ];
};
