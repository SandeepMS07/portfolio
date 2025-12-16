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
      "Python",
      "Node.js",
      "Express",
      "Django",
      "REST",
      "SQLAlchemy",
      "System Design",
      "Architectural Design",
      "Microservices",
      "WebSockets",
      "Socket.IO",
      "MongoDB",
      "PostgreSQL",
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
      "HTML",
      "CSS",
      "MUI",
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
      "LLM Integrations",
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
      "RBAC",
      "Multi-Tenant Auth",
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
};

export const experiences: ExperienceItem[] = [
  {
    company: "Turbostart",
    title: "Product Engineer",
    period: "Apr 2025 – Present",
    location: "Bengaluru, India",
    highlights: [
      "Built KAI multi-tenant AI Chat & Voice Bot platform (FastAPI, MongoDB, SSO, RBAC, Next.js).",
      "Created KAI Insights DIY bot demo generator delivering instant, white-labeled instances with zero DevOps.",
      "Developed Luna AI Voice Agent using Ultravox + Plivo + FastAPI + Gemini for low-latency conversations.",
      "Led key modules in AuraML (multi-realm SSO, Razorpay billing, ECDSA licensing).",
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
  },
];

export const heroHighlights = [
  "Multi-tenant AI chat & voice platforms (KAI)",
  "Real-time sports tech (T20 Mumbai)",
  "Enterprise auth, billing & licensing (AuraML)",
];

export const heroContent = {
  badge: "Full Stack · AI Platforms",
  heading: "Sandeep M S — Full Stack & AI Platform Engineer",
  subheading:
    "FastAPI • Next.js • Ionic • Multi-Tenant SaaS • AI Voice & Chat Bots • Real-Time Systems",
  ctaProjects: "/projects",
  ctaResume: "/sandeep-m-s-resume.pdf",
};

export const heroProfile = {
  name: "Sandeep M S",
  title: "Full Stack & AI Platform Engineer",
  role: "Product Engineer @ Turbostart",
  period: "2025 – Present",
  tag: "AI Platforms",
  avatar: "/profile.jpeg",
  stats: [
    { label: "Software Engineer", value: "2022 – 2025" },
    { label: "Experience", value: "3+ years" },
  ],
};

export const homeSnapshot = {
  label: "Snapshot",
  title: "Full Stack & AI Platform Engineer",
  description:
    "Building multi-tenant SaaS, AI voice/chat systems, and mobile experiences with a production-first mindset.",
  tags: ["3+ years", "Turbostart", "Bengaluru"],
};

export const homeFocusAreas = {
  label: "Focus Areas",
  items: [
    "AI voice/chat agents (Ultravox, Plivo, Gemini)",
    "Multi-tenant SaaS with auth, billing, licensing",
    "Real-time systems & mobile apps (Ionic)",
  ],
};

export const homeAvailability = {
  label: "Let’s work",
  title: "Available for backend / full-stack / AI platform roles",
  description:
    "Quick turnarounds on proof-of-concepts and production rollouts.",
};
