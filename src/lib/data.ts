export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  role: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  highlight?: boolean;
};

export const projectFilters = [
  "All",
  "AI/Voice",
  "Mobile",
  "SaaS/Auth",
  "Real-time",
] as const;

export const projects: Project[] = [
  {
    title: "KAI – AI Chat & Voice Bot Platform",
    role: "Platform Engineer",
    description:
      "Multi-tenant AI chat and voice platform with FastAPI, MongoDB, SSO/RBAC, observability, and Next.js frontend surfaces.",
    tags: ["AI", "Voice", "FastAPI", "Next.js", "SSO", "RBAC"],
    links: [
      { label: "Demo", href: "https://yourbuddy.gusindia.global/login" },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.gus.yourbuddy",
      },
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/your-buddy/id6751635057",
      },
    ],
    highlight: true,
  },
  {
    title: "KAI Insights – DIY Bot Demo Generator",
    role: "Tech Lead",
    description:
      "Instant white-labeled bot demo instances—no DevOps—enabling GTM and sales teams to craft tailored AI demos quickly.",
    tags: ["AI", "Next.js", "Automation", "Product"],
    links: [
      { label: "Website", href: "https://kai-insights.thekenverse.com/" },
    ],
    highlight: true,
  },
  {
    title: "Cloudverse",
    role: "FinOps Engineer (Chargeback)",
    description:
      "Built FinOps modules for chargeback to enable cloud cost attribution, real-time analytics, and profitability insights across teams.",
    tags: [
      "FinOps",
      "Chargeback",
      "NestJS",
      "GraphQL",
      "ClickHouse",
      "PostgreSQL",
      "Prisma",
      "Next.js",
      "Ant Design",
      "Multi-tenant",
      "Analytics",
    ],
    links: [{ label: "Website", href: "https://cloudverse.ai/" }],
    highlight: true,
  },
  {
    title: "Luna – AI Voice Agent (Inbound & Outbound)",
    role: "Full Stack",
    description:
      "Low-latency voice agent combining Ultravox + Plivo + FastAPI + Gemini for natural conversations with streaming.",
    tags: ["AI", "Voice", "FastAPI", "Plivo", "Gemini"],
    links: [{ label: "Website", href: "https://pichainlabs.com/" }],
  },
  {
    title: "AuraML – Authentication, Billing & ECDSA Licensing",
    role: "Platform Engineer",
    description:
      "Central auth and licensing fabric with multi-realm SSO, Razorpay billing, ECDSA licensing, and RBAC controls.",
    tags: ["SaaS/Auth", "SSO", "RBAC", "Billing"],
    links: [{ label: "Website", href: "https://auraml.com/" }],
    highlight: true,
  },
  {
    title: "MyFLAME — Salesforce Student Portal Mobile App",
    role: "Mobile / Full-Stack Engineer",
    description:
      "White-label React Native app for FLAME University that wraps a Salesforce Experience Cloud (LWR) community in a native shell — OAuth 2.0 + PKCE, Google SSO, secure token storage, and frontdoor.jsp session bridging. Templatized so a new university client is a config-driven rebrand (~2–4 days), not a ground-up build.",
    tags: [
      "Mobile",
      "React Native",
      "Salesforce",
      "SaaS/Auth",
      "OAuth",
      "TypeScript",
      "iOS",
      "Android",
    ],
    links: [
      {
        label: "iOS",
        href: "https://apps.apple.com/in/app/myflame/id1587700223",
      },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.myflame&hl=en_IN",
      },
    ],
    highlight: true,
  },
  {
    title: "T20 Mumbai Ecosystem (Website, Mobile Apps, Auction Tool)",
    role: "Lead Engineer",
    description:
      "Full ecosystem for T20 Mumbai with live auction tooling (Socket.IO) and fan experiences across web, Android, and iOS.",
    tags: ["Real-time", "Mobile", "Next.js", "Socket.IO"],
    links: [
      { label: "Website", href: "https://www.t20mumbai.com/" },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.mca.t20mumbai",
      },
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/t20-mumbai/id6746642031",
      },
    ],
    highlight: true,
  },
  {
    title: "MCA Fantasy League — Real-Time T20 Cricket Fantasy Platform",
    role: "System Architect & Lead Engineer",
    description:
      "Architected the official fantasy platform for the Mumbai Cricket Association's T20 Mumbai League — full-stack ownership across 3 frontends (web, admin, mobile) on a single Fastify/Postgres/Redis backend serving 540K+ users across MCA's fan-platform surfaces (fan polls, viewers-choice, fantasy). Built a real-time scoring engine ingesting live iSportz feeds, JWT auth with rotating refresh tokens + multi-tab grace window, BullMQ worker fleet for scoring/ingest/SMS, BRD-driven team-composition validator with Impact-Player mechanic, idempotent admin operations, DLT/TRAI-compliant SMS, and DPDP-ready PII-at-rest design. Shipped to production for MCA's first official fantasy tournament.",
    tags: [
      "Real-time",
      "WebSockets",
      "System Architecture",
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Next.js",
      "Capacitor",
      "Mobile",
      "JWT",
      "SSO",
      "SaaS/Auth",
    ],
    links: [
      { label: "Website", href: "https://www.t20mumbai.com/" },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.mca.t20mumbai",
      },
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/t20-mumbai/id6746642031",
      },
    ],
    highlight: true,
  },
  {
    title: "TS Investor Portal (Web + Mobile)",
    role: "Full Stack",
    description:
      "Investor lifecycle experience across web and mobile with Salesforce + Razorpay integrations and secure document flows.",
    tags: ["SaaS/Auth", "Mobile", "Next.js", "Payments"],
    links: [
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/ts-investor-portal/id6736825302",
      },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.turbostart.tsinvestor",
      },
    ],
  },
  {
    title: "Realm Wealth – Luxury Real Estate App",
    role: "Mobile & Backend",
    description:
      "Luxury real estate mobile app with personalized inventory and secure backend services.",
    tags: ["Mobile", "Ionic", "Capacitor"],
    links: [
      { label: "Website", href: "https://lighthouseluxury.in/" },
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/realm-wealth/id6743388410",
      },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.ken42.realm",
      },
    ],
  },
  {
    title: "Turbostart Jury App (First TS Mobile App)",
    role: "Product Engineer",
    description:
      "Jury decision-support PWA/mobile app with offline-first scoring and synchronized results.",
    tags: ["Mobile", "PWA", "SaaS/Auth"],
    links: [
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/turbostart-jury/id6578451796",
      },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=app.turbostart.jury",
      },
    ],
  },
  {
    title: "TS Bridge — Angel Investment Platform (Web + Mobile)",
    role: "Lead Developer | Ionic • React • Node.js • Salesforce • Razorpay",
    description:
      "TS Bridge is Turbostart’s angel investment platform designed to democratize startup investing. It helps users explore curated, VC-vetted startups, track investments in real time, and get personalized investment recommendations.",
    tags: ["Ionic", "React", "Node.js", "Salesforce", "Razorpay"],
    links: [
      {
        label: "Website",
        href: "https://tsbridge.com/",
      },
      {
        label: "iOS",
        href: "https://apps.apple.com/us/app/ts-bridge/id6736746954",
      },
      {
        label: "Android",
        href: "https://play.google.com/store/apps/details?id=com.turbostart.tsbridge",
      },
    ],
  },
  {
    title: "Ideabaaz – ZeeTV Startup Show Portal",
    role: "Full Stack",
    description:
      "Audience engagement portal and startup discovery workflows powering the ZeeTV Ideabaaz show.",
    tags: ["Web", "Next.js", "SaaS/Auth"],
    links: [{ label: "Website", href: "https://www.ideabaaz.co.in/" }],
  },
  {
    title: "Scout by TS / Alumni Portal / Startup Portal",
    role: "Full Stack",
    description:
      "Connected portals for scouts, alumni, and startups with role-aware dashboards and workflows.",
    tags: ["SaaS/Auth", "RBAC", "Next.js"],
    links: [{ label: "Website", href: "https://scoutbyts.com/" }],
  },
  {
    title: "PB Manager — Grain-Trading ERP (MB Groups)",
    role: "Sole Developer",
    description:
      "Full-stack ERP that digitizes a grain-trading firm end-to-end — purchases, transport consignments (bilty), sales, billing, company-branded invoices, expenses, and payment tracking — replacing manual Excel bookkeeping. Idempotent bill generation, concurrency-safe per-company invoice numbering via atomic Postgres functions, allocation-based payments, JWT/RBAC auth, and Excel import/export.",
    tags: [
      "ERP",
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Zod",
      "JWT",
      "SaaS/Auth",
    ],
    links: [{ label: "Website", href: "https://www.mbgroups.online/" }],
    highlight: true,
  },
];

export type SkillCategory = {
  title: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    title: "Backend & APIs",
    items: [
      "FastAPI",
      "Fastify",
      "NestJS",
      "Python",
      "Node.js",
      "Express",
      "Django",
      "REST",
      "GraphQL",
      "SQLAlchemy",
      "Prisma",
      "System Design",
      "Architectural Design",
      "Microservices",
      "Event-Driven Architecture",
      "Real-Time Systems",
      "Idempotency Patterns",
      "Database Modeling",
      "WebSockets",
      "Socket.IO",
      "BullMQ",
      "Redis",
      "MongoDB",
      "PostgreSQL",
      "ClickHouse",
      "SQL",
    ],
  },
  {
    title: "Frontend & Web",
    items: [
      "JavaScript",
      "React",
      "React Hook Form",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
      "MDX",
      "HTML",
      "CSS",
      "MUI",
      "Ant Design",
      "Bootstrap",
      "Atomic Design",
      "Redux Toolkit",
      "Zustand",
      "Redux",
      "Cross-browser Compatibility",
    ],
  },
  {
    title: "Mobile",
    items: [
      "Ionic React",
      "Capacitor",
      "Electron",
      "App Store & Play Store deployment",
    ],
  },
  {
    title: "AI & Voice",
    items: [
      "AI Chatbots",
      "Voice Bots",
      "Ultravox",
      "Plivo",
      "Gemini",
      "Vertex AI",
      "OpenAI APIs",
      "LLM Integrations",
      "Streaming Responses",
      "Agentic Workflows",
    ],
  },
  {
    title: "Auth & Security",
    items: [
      "Azure SSO",
      "Google SSO",
      "GitHub SSO",
      "OAuth2",
      "OpenID Connect",
      "SAML 2.0",
      "LDAP",
      "Keycloak",
      "JWT",
      "Refresh Token Rotation",
      "RBAC",
      "Multi-Tenant Auth",
      "AES-256-GCM",
      "ECDSA Licensing",
      "PII Encryption at Rest",
      "Audit Logging",
    ],
  },
  {
    title: "Compliance & Standards",
    items: [
      "DPDP Act (India)",
      "DLT / TRAI Compliance",
      "Data Residency",
      "PII Minimization",
      "Privacy by Design",
    ],
  },
  {
    title: "Integrations",
    items: [
      "Razorpay",
      "Salesforce",
      "Gupshup (SMS)",
      "iSportz (Sports Data)",
      "Plivo",
      "Firebase",
    ],
  },
  {
    title: "DevOps & Infra",
    items: ["Docker", "Kubernetes", "Nginx"],
  },
  {
    title: "Product & Collaboration",
    items: [
      "Product Management",
      "System Architecture",
      "Agile Development",
      "Jira",
      "Workload Prioritization",
      "Problem Solving",
      "Troubleshooting",
      "Debugging",
      "Communication",
      "Analytical Skills",
      "Deadline Oriented",
      "Front-End Development",
      "Web Development",
      "Object-Oriented Programming",
      "Git",
      "Microsoft Visual Studio Code",
      "Java",
      "C",
    ],
  },
];

export type ExperienceItem = {
  company: string;
  title: string;
  period: string;
  location: string;
  highlights: string[];
  stack?: string[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "Turbostart",
    title: "Product Engineer",
    period: "Apr 2025 – Present",
    location: "Bengaluru, India",
    highlights: [
      "Architected & shipped the MCA Fantasy League — official T20 Mumbai fantasy platform — full-stack ownership (Fastify, Postgres, Redis, BullMQ, Next.js, Capacitor) across 3 frontends on one backend; real-time scoring from live iSportz feeds, rotating JWT auth, Impact-Player mechanic, DLT-compliant SMS, and DPDP-ready PII design. Serving 540K+ users on MCA's broader fan platform.",
      "Built KAI multi-tenant AI Chat & Voice Bot platform (FastAPI, MongoDB, SSO, RBAC, Next.js).",
      "Created KAI Insights DIY bot demo generator delivering instant, white-labeled instances with zero DevOps.",
      "Developed Luna AI Voice Agent using Ultravox + Plivo + FastAPI + Gemini for low-latency conversations.",
      "Led key modules in AuraML (multi-realm SSO, Razorpay billing, ECDSA licensing).",
    ],
    stack: [
      "Fastify",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "WebSockets",
      "Next.js",
      "Capacitor",
      "FastAPI",
      "MongoDB",
      "Ultravox",
      "Gemini",
      "SSO/RBAC",
    ],
  },
  {
    company: "Turbostart",
    title: "Software Engineer",
    period: "Aug 2023 – Mar 2025",
    location: "Bengaluru, India",
    highlights: [
      "Delivered the full T20 Mumbai ecosystem: website, Android/iOS apps, and real-time auction tool (Socket.IO) broadcasted on Jio Hotstar.",
      "Built the Turbostart Investor Portal (Web + Mobile) with Salesforce + Razorpay integrations.",
      "Developed Realm Wealth mobile app for luxury real estate experiences.",
      "Shipped portals for Ideabaaz (ZeeTV), Scout by TS, Alumni Management, Startup Portal, and more.",
    ],
    stack: ["Next.js", "Socket.IO", "Mobile", "Salesforce", "Razorpay"],
  },
  {
    company: "LearnCab (Nulurn Edutech Private Limited)",
    title: "Software Engineer",
    period: "May 2022 – Aug 2023",
    location: "Bengaluru, India",
    highlights: [
      "Built and maintained learner-facing React/Node services with performant UI and robust APIs.",
      "Improved reliability and observability across web surfaces while shipping new content features.",
      "Collaborated with product/design to streamline onboarding and engagement funnels.",
    ],
    stack: ["React", "Node.js", "REST APIs"],
  },
  {
    company: "LearnCab (Nulurn Edutech Private Limited)",
    title: "Software Engineer Intern",
    period: "Mar 2022 – May 2022",
    location: "Bengaluru, India",
    highlights: [
      "Contributed to React UI components and internal tooling with clean, reusable patterns.",
      "Implemented QA fixes and performance tweaks across web flows.",
    ],
    stack: ["React", "QA", "UI"],
  },
  {
    company: "Gofo Technologies",
    title: "Intern",
    period: "Jun 2019 – Aug 2019",
    location: "Bengaluru North, India",
    highlights: [
      "Supported web feature delivery and testing, gaining hands-on experience with production codebases.",
      "Assisted in debugging, documentation, and small UI enhancements.",
    ],
    stack: ["Web", "Testing", "Debugging"],
  },
];

export const heroHighlights = [
  "Multi-tenant AI chat & voice (KAI)",
  "DIY white-labeled bot demos (KAI Insights)",
  "Low-latency AI voice agent (Luna)",
];

export const heroContent = {
  badge: "AI Engineer",
  heading: "Sandeep M S — AI Engineer & Full Stack Developer",
  subheading:
    "AI Engineer building LLM & voice agents, chat platforms, and multi-tenant SaaS · FastAPI • Next.js • Ultravox • Gemini",
  ctaProjects: "/projects",
  ctaResume: "/sandeep-m-s-resume.pdf",
};

export const heroProfile = {
  name: "Sandeep M S",
  title: "AI Engineer & Full Stack Developer",
  role: "Product Engineer @ Turbostart",
  period: "2025 – Present",
  tag: "AI Engineer",
  avatar: "/profile.jpeg",
  stats: [
    { label: "Software Engineer", value: "2022 – 2025" },
    { label: "Experience", value: "4+ years" },
  ],
};

export const homeSnapshot = {
  label: "Snapshot",
  title: "AI Engineer & Full Stack Developer",
  description:
    "Building LLM & voice agents, AI chat platforms, and multi-tenant SaaS with a production-first mindset.",
  tags: ["4+ years", "Turbostart", "Bengaluru"],
};

export const homeFocusAreas = {
  label: "Focus Areas",
  items: [
    "AI voice/chat agents (Ultravox, Plivo, Gemini)",
    "LLM orchestration, RAG & structured extraction",
    "Multi-tenant SaaS with auth, billing, licensing",
  ],
};

export const homeAvailability = {
  label: "Let’s work",
  title: "Available for AI engineering / full-stack roles",
  description:
    "Quick turnarounds on proof-of-concepts and production rollouts.",
};

export type Recommendation = {
  name: string;
  title: string;
  relation: string;
  quote: string;
  avatar?: string;
};

export const recommendations: Recommendation[] = [
  {
    name: "Gokul Sundar",
    title:
      "Solutions Architect / Builder specialized in building user-centric applications leveraging AI to solve real-world problems.",
    relation: "Senior to Sandeep · May 2026",
    avatar: "/gokulsundar.jpeg",
    quote:
      "Got the opportunity to work with Sandeep while delivering highly mission-critical projects like TS Bridge and T20 Mumbai (MCA). He took up the responsibility of lead engineer to not only implement complex features like payment gateways, caching and authentication but also played a key role to get the apps published in Play/App Store — handling complex Ionic/Appflow builds for over-the-air updates. He has a good sense about product development and contributed greatly to discussions around user experience and data security. He has always been a good team player, mentoring junior developers and guiding them towards the product goals.",
  },
  {
    name: "Sahil Choudhary",
    title:
      "AI Engineer | Founder @ NativeBridge | Ex-Postman | LLM Agent Workflows & Infra",
    relation: "Sandeep’s client · Jan 2026",
    avatar: "/sahilchowdary.png",
    quote:
      "I had the pleasure of working with Sandeep on NativeBridge, where he consistently proved to be a strong and dependable engineer. He has a solid grasp of fundamentals, writes clean and thoughtful code, and takes ownership of the problems he works on. Beyond technical skills, he is proactive, collaborative, and easy to work with. I’d happily recommend Sandeep to any team looking for a reliable and capable engineer.",
  },
  {
    name: "Gowtham Kumar B V",
    title: "Software Development Consultant at Deloitte",
    relation: "Senior to Sandeep · June 2026",
    avatar: "/gowthamkumar.jpeg",
    quote:
      "I had the chance to work with Sandeep during his time at LearnCab, where he was part of the team building learner-facing web applications. He brought a strong sense of ownership to his work, consistently focused on improving performance, reliability, and the overall user experience for learners using the platform. Sandeep is the kind of engineer who digs into problems rather than settling for surface-level fixes. He wrote clean, maintainable code, picked up context quickly, and was always willing to help out wherever the team needed him. Even early in his career, he showed the kind of initiative and technical curiosity that’s hard to teach. I’d happily recommend him for any role that needs a dependable, full stack engineer who genuinely cares about the product he’s building.",
  },
];
