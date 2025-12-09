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
];
