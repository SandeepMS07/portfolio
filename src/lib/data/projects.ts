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

export const projectFilters = ["All", "AI/Voice", "Mobile", "SaaS/Auth", "Real-time"] as const;

export const projects: Project[] = [
  {
    title: "KAI – AI Chat & Voice Bot Platform",
    role: "Platform Engineer",
    description:
      "Multi-tenant AI chat and voice platform with FastAPI, MongoDB, SSO/RBAC, observability, and Next.js frontend surfaces.",
    tags: ["AI", "Voice", "FastAPI", "Next.js", "SSO", "RBAC"],
    links: [{ label: "Demo", href: "#" }],
    highlight: true,
  },
  {
    title: "KAI Insights – DIY Bot Demo Generator",
    role: "Tech Lead",
    description:
      "Instant white-labeled bot demo instances—no DevOps—enabling GTM and sales teams to craft tailored AI demos quickly.",
    tags: ["AI", "Next.js", "Automation", "Product"],
    links: [{ label: "Website", href: "#" }],
    highlight: true,
  },
  {
    title: "Luna – AI Voice Agent (Inbound & Outbound)",
    role: "Full Stack",
    description:
      "Low-latency voice agent combining Ultravox + Plivo + FastAPI + Gemini for natural conversations with streaming.",
    tags: ["AI", "Voice", "FastAPI", "Plivo", "Gemini"],
    links: [{ label: "Website", href: "#" }],
  },
  {
    title: "AuraML – Authentication, Billing & ECDSA Licensing",
    role: "Platform Engineer",
    description:
      "Central auth and licensing fabric with multi-realm SSO, Razorpay billing, ECDSA licensing, and RBAC controls.",
    tags: ["SaaS/Auth", "SSO", "RBAC", "Billing"],
    links: [{ label: "Website", href: "#" }],
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
      { label: "Android", href: "https://play.google.com/store/apps/details?id=com.ken42.realm" },
    ],
  },
  {
    title: "Turbostart Jury App (First TS Mobile App)",
    role: "Product Engineer",
    description:
      "Jury decision-support PWA/mobile app with offline-first scoring and synchronized results.",
    tags: ["Mobile", "PWA", "SaaS/Auth"],
    links: [
      { label: "iOS", href: "https://apps.apple.com/us/app/turbostart-jury/id6578451796" },
      { label: "Android", href: "https://play.google.com/store/apps/details?id=app.turbostart.jury" },
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
    links: [{ label: "Website", href: "#" }],
  },
];
