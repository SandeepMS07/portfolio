import { NextResponse, type NextRequest } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { readVisits } from "@/lib/visit-store";

const toLabel = (value: string | null | undefined, fallback: string) =>
  value?.trim() ? value : fallback;

const toSortedArray = (counts: Record<string, number>) =>
  Object.entries(counts)
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const visits = await readVisits();

  const visitsPerDay: Record<string, number> = {};
  const topPages: Record<string, number> = {};
  const topReferrers: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const devices: Record<string, number> = {};

  for (const visit of visits) {
    const date = visit.createdAt.slice(0, 10);
    visitsPerDay[date] = (visitsPerDay[date] || 0) + 1;

    const pageLabel = toLabel(visit.path, "Unknown");
    topPages[pageLabel] = (topPages[pageLabel] || 0) + 1;

    const referrerLabel = toLabel(visit.referrer, "Direct / None");
    topReferrers[referrerLabel] = (topReferrers[referrerLabel] || 0) + 1;

    const countryLabel = toLabel(visit.country, "Unknown");
    countries[countryLabel] = (countries[countryLabel] || 0) + 1;

    const deviceLabel = visit.device || "Unknown";
    devices[deviceLabel] = (devices[deviceLabel] || 0) + 1;
  }

  return NextResponse.json({
    total: visits.length,
    visitsPerDay: toSortedArray(visitsPerDay),
    topPages: toSortedArray(topPages),
    topReferrers: toSortedArray(topReferrers),
    countries: toSortedArray(countries),
    devices: toSortedArray(devices),
    lastVisit: visits.at(-1) ?? null,
  });
}
