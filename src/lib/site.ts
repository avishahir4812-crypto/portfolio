/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH
 *  Every piece of content on the site lives here. Update once, the whole
 *  portfolio updates everywhere.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Avish Boricha",
  firstName: "AVISH",
  lastName: "BORICHA",
  role: "Python Full Stack Developer",
  email: "avishahir4812@gmail.com",
  phone: "+91 94296 80396",
  phoneHref: "+919429680396",
  location: "Ahmedabad, Gujarat, India",
  coordinates: "23.0225° N / 72.5714° E",
  timezone: "GMT +5:30",
  availability: "Open to work — 2026",
  github: "https://github.com/avishahir4812-crypto",
  linkedin: "https://www.linkedin.com/in/boricha-avish-9bb899308/",
  intro:
    "I build products the way senior teams do — pixel-perfect React interfaces on battle-tested Django & FastAPI backends, with databases engineered to stay fast under load. Five projects live in production right now.",
  about: [
    "I'm Avish — a Python Full Stack Developer from Ahmedabad who builds products, not pages. My day-to-day spans Python, Django and FastAPI on the backend; React.js and Next.js on the frontend; and MySQL/PostgreSQL schemas designed to stay fast as the data grows. Clean architecture, readable code and ruthless attention to detail are my defaults — never an afterthought.",
    "And the experience is already real: at Quantum Technology (Gandhinagar) I shipped production systems used in live workflows — an AQI computation engine, a geo map-clustering system and a complete food-ordering platform — while collaborating daily over Git in an agile team. Alongside that, I'm finishing my BCA (8.95/10 CGPA) and pushing five of my own products to production, including an AI-powered SaaS. Quick to learn, quicker to ship — comfortable owning a feature from database to deploy.",
  ],
};

export const roles = [
  "Python Full Stack Developer",
  "Django & FastAPI Engineer",
  "React.js UI Craftsman",
  "REST API Architect",
  "AI Integration Specialist",
];

export const stats = [
  { value: 5, suffix: "+", label: "Live projects shipped" },
  { value: 32, suffix: "", label: "Technologies in production" },
  { value: 8.95, suffix: "", label: "BCA CGPA / 10", decimals: 2 },
  { value: 24, suffix: "h", label: "Avg. response time" },
];

export const marqueeItems = [
  "Python",
  "Django",
  "FastAPI",
  "React.js",
  "Next.js",
  "TypeScript",
  "MySQL",
  "PostgreSQL",
  "AI Integration",
  "REST APIs",
  "System Design",
  "UI / UX",
];

/* ─────────────────────────── Skills ─────────────────────────── */

export type Skill = {
  name: string;
  /** skillicons.dev icon id — official brand logo */
  icon?: string;
  category: "Languages" | "Frontend" | "Backend" | "Database" | "Tools & DevOps";
};

export const skillFilters = [
  "All",
  "Languages",
  "Frontend",
  "Backend",
  "Database",
  "Tools & DevOps",
] as const;

export const skills: Skill[] = [
  { name: "Python", icon: "py", category: "Languages" },
  { name: "JavaScript", icon: "js", category: "Languages" },
  { name: "TypeScript", icon: "ts", category: "Languages" },
  { name: "PHP", icon: "php", category: "Languages" },
  { name: "SQL", icon: "sqlite", category: "Languages" },
  { name: "React.js", icon: "react", category: "Frontend" },
  { name: "Next.js", icon: "nextjs", category: "Frontend" },
  { name: "HTML5", icon: "html", category: "Frontend" },
  { name: "CSS3", icon: "css", category: "Frontend" },
  { name: "Tailwind CSS", icon: "tailwind", category: "Frontend" },
  { name: "Bootstrap", icon: "bootstrap", category: "Frontend" },
  { name: "Vite", icon: "vite", category: "Frontend" },
  { name: "Django", icon: "django", category: "Backend" },
  { name: "Django REST Framework", category: "Backend" },
  { name: "FastAPI", icon: "fastapi", category: "Backend" },
  { name: "Node.js", icon: "nodejs", category: "Backend" },
  { name: "Express.js", icon: "express", category: "Backend" },
  { name: "REST APIs", category: "Backend" },
  { name: "JWT & OAuth", category: "Backend" },
  { name: "MySQL", icon: "mysql", category: "Database" },
  { name: "PostgreSQL", icon: "postgres", category: "Database" },
  { name: "MongoDB", icon: "mongodb", category: "Database" },
  { name: "SQLAlchemy", category: "Database" },
  { name: "Git", icon: "git", category: "Tools & DevOps" },
  { name: "GitHub", icon: "github", category: "Tools & DevOps" },
  { name: "Docker", icon: "docker", category: "Tools & DevOps" },
  { name: "Postman", icon: "postman", category: "Tools & DevOps" },
  { name: "Vercel", icon: "vercel", category: "Tools & DevOps" },
  { name: "Figma", icon: "figma", category: "Tools & DevOps" },
  { name: "VS Code", icon: "vscode", category: "Tools & DevOps" },
  { name: "Linux", icon: "linux", category: "Tools & DevOps" },
  { name: "Nginx", icon: "nginx", category: "Tools & DevOps" },
];

/* ─────────────────────────── Services ─────────────────────────── */

export const services = [
  {
    index: "01",
    title: "Full Stack Product Engineering",
    description:
      "End-to-end product builds — database schema, REST APIs, authentication and a polished React frontend, shipped as one coherent system.",
    tags: ["Django / FastAPI", "React & Next.js", "Auth & RBAC"],
  },
  {
    index: "02",
    title: "Backend & API Architecture",
    description:
      "Clean, documentated REST architectures with JWT/OAuth security, optimized queries, proper error handling and Swagger docs your team will love.",
    tags: ["REST Design", "Query Optimization", "Swagger"],
  },
  {
    index: "03",
    title: "AI-Powered Features",
    description:
      "Practical AI integration — NLP pipelines, resume parsing, semantic matching with sentence transformers, and LLM-assisted workflows.",
    tags: ["spaCy", "NLP Pipelines", "Embeddings"],
  },
  {
    index: "04",
    title: "UI Engineering & Motion",
    description:
      "Interfaces that feel expensive — responsive layouts, design systems, micro-interactions and scroll choreography that convert visitors into clients.",
    tags: ["Tailwind", "Framer Motion", "Design Systems"],
  },
] as const;

/* ─────────────────────────── Projects ─────────────────────────── */

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  image: string;
  live: string;
  accent: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "ElectroHub Catalog",
    category: "Product Catalog · Frontend",
    year: "2025",
    description:
      "A premium electronics catalog — rich product discovery, spec sheets, category browsing and a checkout-ready flow with a visual language closer to a brand film than a store.",
    stack: ["React.js", "JavaScript", "CSS3", "Responsive Design"],
    image: "/images/project-electro.jpg",
    live: "https://premium-electronic-catalog-website.vercel.app/",
    accent: "#ff4d00",
  },
  {
    index: "02",
    title: "DeltaDesk",
    category: "SaaS Dashboard · Web App",
    year: "2025",
    description:
      "A modern workspace dashboard experience — real-time panels, kanban-style workflows, analytics surfaces and a component system engineered for speed and clarity.",
    stack: ["React.js", "Vite", "Tailwind CSS", "REST API"],
    image: "/images/project-deltadesk.jpg",
    live: "https://deltadesk-eta.vercel.app/",
    accent: "#ff4d00",
  },
  {
    index: "03",
    title: "Lumière Salon",
    category: "Brand Website · Frontend",
    year: "2024",
    description:
      "A salon brand site with a booking-first journey — service menus, stylist showcases and appointment flows, dressed in warm editorial typography.",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    image: "/images/project-salon.jpg",
    live: "https://demo-salon-website-frontend.vercel.app/",
    accent: "#ff4d00",
  },
  {
    index: "04",
    title: "StyleSphere",
    category: "E-Commerce Platform · Full Stack",
    year: "2025",
    description:
      "A fully dynamic clothing e-commerce platform — authentication, wishlists, cart flow, category filtering, an admin panel and an order-management pipeline, all wrapped in a storefront that feels like a fashion editorial.",
    stack: ["React.js", "JavaScript", "MySQL", "Tailwind CSS", "Bootstrap"],
    image: "/images/project-stylesphere.jpg",
    live: "https://fashionstoree.rf.gd/",
    accent: "#ff4d00",
  },
  {
    index: "05",
    title: "AI ATS Resume Analyzer",
    category: "AI SaaS · NLP",
    year: "2025",
    description:
      "An industry-grade SaaS that scores resumes against job descriptions using NLP — PDF parsing, skills extraction, missing-skill detection and AI-written improvement reports, secured with JWT.",
    stack: ["React.js", "FastAPI", "spaCy", "Sentence Transformers", "MySQL", "JWT"],
    image: "/images/project-ats.jpg",
    live: "https://ats-resume-analyzer-eight-sigma.vercel.app/",
    accent: "#ff4d00",
  },
];

/* ─────────────────────────── Experience ─────────────────────────── */

export const experience = {
  role: "Python Full Stack Developer",
  company: "Quantum Technology",
  place: "Gandhinagar, Gujarat",
  type: "Industry Internship",
  summary:
    "Built and shipped production-grade features across the stack — React interfaces used in real workflows, Django REST modules, third-party integrations and query-level performance work — collaborating daily over Git & GitHub inside an agile delivery pipeline.",
  bullets: [
    "Engineered & documented JWT-secured REST APIs in Python / Django (DRF) — clean error handling, logging and query optimization as standard.",
    "Crafted responsive, cross-browser React interfaces that shipped to production without design revisions.",
    "Modeled and optimized MySQL schemas — indexing, query tuning and third-party API integrations.",
    "Debugged, profiled and deployed production fixes inside an agile team; owned features end-to-end.",
  ],
  shipped: [
    { name: "AQI Calculator", detail: "Live air-quality index computation & advisory" },
    { name: "Map Clustering", detail: "Geo-clustering engine for dense map datasets" },
    { name: "Food Web App", detail: "Full ordering flow — menus, cart, checkout" },
  ],
  tools: ["git", "github", "vscode", "postman", "mysql", "django", "react", "py"],
};

/* ─────────────────────────── Education ─────────────────────────── */

export const education = [
  {
    title: "Bachelor of Computer Applications",
    school: "BPCCS College of Computer Studies · Kadi University",
    period: "2023 — 2026",
    score: "CGPA 8.95 / 10",
    scoreLabel: "Current standing",
  },
  {
    title: "Python Full Stack Development",
    school: "TOPS Technologies · Ahmedabad",
    period: "2024 — Present",
    score: "Pursuing",
    scoreLabel: "Professional certification",
  },
  {
    title: "Higher Secondary Certificate (XII)",
    school: "GSEB Board · Gujarat",
    period: "2021 — 2023",
    score: "96%",
    scoreLabel: "Board examination",
  },
];

/* ─────────────────────────── Socials & misc ─────────────────────────── */

export const socials = [
  { label: "GitHub", handle: "@avishahir4812-crypto", href: "https://github.com/avishahir4812-crypto" },
  { label: "LinkedIn", handle: "in/boricha-avish", href: "https://www.linkedin.com/in/boricha-avish-9bb899308/" },
  { label: "Email", handle: "avishahir4812@gmail.com", href: "mailto:avishahir4812@gmail.com" },
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Hindi", level: "Native" },
  { name: "Gujarati", level: "Professional" },
];

export const softSkills = [
  "Problem Solving",
  "Quick Learner",
  "Communication",
  "Team Collaboration",
];

export const projectTypes = [
  "Full Stack Web App",
  "Backend / API Development",
  "AI-Powered Feature",
  "Frontend / UI Engineering",
  "Internship / Full-time Role",
  "Something else",
];

export const budgetRanges = [
  "Under ₹25k",
  "₹25k — ₹75k",
  "₹75k — ₹2L",
  "₹2L+",
  "Not sure yet",
];
