export interface TemplateMeta {
  id: string;
  name: string;
  thumbnailUrl: string;

  photoSupport: 'required' | 'optional' | 'none'; // was: supportsPhoto: boolean
  layout: 'single-column' | 'two-column' | 'sidebar';
  isAtsSafe: boolean;                               // flag #6 explicitly for marketing/filtering
  supportedSections: (
    | 'summary'
    | 'languages'
    | 'hobbies'
    | 'skills'
    | 'education'
    | 'experience'
  )[];
  tags?: string[];
  description?: string // optional: e.g. ['corporate', 'tech', 'creative'] — for future filtering/search
}


export const TEMPLATES: TemplateMeta[] = [
  {
    id: 'classic-01',
    name: 'Classic',
    thumbnailUrl: '/images/classic.jpg',
    photoSupport: 'none',
    layout: 'single-column',
    isAtsSafe: true,
    supportedSections: ['summary', 'skills', 'education', 'experience'],
    tags: ['corporate', 'finance'],
    description: "Corporate, finance, accounting — the Sebastian Bennett style you already have"
  },
  {
    id: 'modern-02',
    name: 'Modern Sidebar',
    thumbnailUrl: '/images/modern-sidebar.jpg',
    photoSupport: 'required',
    layout: 'sidebar',
    isAtsSafe: false,
    supportedSections: ['languages', 'hobbies', 'skills', 'education', 'experience'],
    tags: ['creative', 'marketing'],
    description: "Creative/marketing roles — the Larry Tibbetts style, gold accents"
  },
  {
    id: 'minimal-03',
    name: 'Minimal Grid',
    thumbnailUrl: '/images/minimal-grid.jpg',
    photoSupport: 'none',
    layout: 'two-column',
    isAtsSafe: true,
    supportedSections: ['summary', 'languages', 'hobbies', 'skills', 'education', 'experience'],
    tags: ['marketing', 'ops'],
    description: "Marketing/ops — the Olivia Wilson style, lots of whitespace"
  },
  {
    id: 'executive-04',
    name: 'Executive',
    thumbnailUrl: '/images/executive.jpg',
    photoSupport: 'none',
    layout: 'single-column',
    isAtsSafe: true,
    supportedSections: ['summary', 'skills', 'education', 'experience'],
    tags: ['executive', 'leadership'],
    description: "Senior/leadership roles — conveys gravitas, low visual noise"
  },
  {
    id: 'tech-05',
    name: 'Tech/Dev',
    thumbnailUrl: '/images/tech-dev.jpg',
    photoSupport: 'optional',
    layout: 'single-column',
    isAtsSafe: false,
    supportedSections: ['summary', 'skills', 'education', 'experience'],
    tags: ['tech', 'engineering'],
    description: "Software engineers — the \"Your Name / Software Engineer\" style from your 4th screenshot"
  },
  {
    id: 'compact-06',
    name: 'Compact/ATS-safe',
    thumbnailUrl: '/images/compact-ats-safe.jpg',
    photoSupport: 'none',
    layout: 'single-column',
    isAtsSafe: true,
    supportedSections: ['summary', 'skills', 'education', 'experience'],
    tags: ['ats-safe', 'universal'],
    description: "Explicitly built to maximize ATS parsing — market this one as \"safest for applicant tracking systems\""
  },
  {
    id: 'bold-07',
    name: 'Bold Header',
    thumbnailUrl: '/images/bold-header.png',
    photoSupport: 'optional',
    layout: 'single-column',
    isAtsSafe: false,
    supportedSections: ['summary', 'skills', 'education', 'experience'],
    tags: ['sales', 'customer-facing'],
    description: "Sales, customer-facing roles — more visual punch than Classic"
  },
  {
    id: 'timeline-08',
    name: 'Timeline',
    thumbnailUrl: '/images/timeline.jpg',
    photoSupport: 'none',
    layout: 'single-column',
    isAtsSafe: false,
    supportedSections: ['summary', 'skills', 'education', 'experience'],
    tags: ['career-change'],
    description: "Career-changers — visually emphasizes progression/growth"
  },
  {
    id: 'two-col-09',
    name: 'Two-Column Balanced',
    thumbnailUrl: '/images/two-columns-balanced.png',
    photoSupport: 'optional',
    layout: 'two-column',
    isAtsSafe: false,
    supportedSections: ['summary', 'languages', 'hobbies', 'skills', 'education', 'experience'],
    tags: ['general-purpose', 'default'],
    description: "General-purpose \"safe but modern\" — likely your most-used default"
  },
  {
    id: 'creative-10',
    name: 'Creative/Portfolio',
    thumbnailUrl: '/images/creative-resume-portfolio.jpg',
    photoSupport: 'required',
    layout: 'sidebar',
    isAtsSafe: false,
    supportedSections: ['summary', 'languages', 'hobbies', 'skills', 'education', 'experience'],
    tags: ['design', 'ux', 'creative'],
    description: "Design, UX, creative fields — where visual flair is actually an asset, not a risk"
  },
];