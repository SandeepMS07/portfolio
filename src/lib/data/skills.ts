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
      "WebSockets",
      "Socket.IO",
      "Microservices",
      "MongoDB",
      "PostgreSQL",
    ],
  },
  {
    title: "Frontend & Web",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "MUI",
      "Redux Toolkit",
      "Zustand",
    ],
  },
  {
    title: "Mobile",
    items: ["Ionic React", "Capacitor", "App Store & Play Store deployment"],
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
    items: ["Azure SSO", "Google SSO", "GitHub SSO", "OAuth2", "JWT", "RBAC", "Multi-Tenant Auth"],
  },
  {
    title: "DevOps & Infra",
    items: ["Docker", "Kubernetes", "Nginx"],
  },
];
