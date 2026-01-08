import { promises as fs } from "node:fs";
import path from "node:path";

export type VisitType = "visit" | "daily";

export type VisitEvent = {
  id: string;
  type: VisitType;
  path: string | null;
  referrer: string | null;
  userAgent: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  device: "mobile" | "tablet" | "desktop";
  createdAt: string;
};

const getVisitsFilePath = () =>
  path.join(process.cwd(), "data", "visits.json");

export const readVisits = async (): Promise<VisitEvent[]> => {
  try {
    const data = await fs.readFile(getVisitsFilePath(), "utf8");
    const parsed = JSON.parse(data) as { visits?: VisitEvent[] };
    return Array.isArray(parsed?.visits) ? parsed.visits : [];
  } catch {
    return [];
  }
};

export const writeVisits = async (visits: VisitEvent[]) => {
  const dir = path.join(process.cwd(), "data");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    getVisitsFilePath(),
    JSON.stringify({ visits }, null, 2),
    "utf8"
  );
};
