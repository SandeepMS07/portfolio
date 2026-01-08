import { NextResponse } from "next/server";
import { readVisits, writeVisits, type VisitType } from "@/lib/visit-store";

const detectDevice = (ua?: string | null) => {
  const value = (ua || "").toLowerCase();
  if (value.includes("ipad") || value.includes("tablet")) return "tablet";
  if (
    value.includes("mobile") ||
    value.includes("iphone") ||
    value.includes("android")
  ) {
    return "mobile";
  }
  return "desktop";
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, path, referrer } = body ?? {};

    if (type !== "visit" && type !== "daily") {
      return NextResponse.json({ error: "Invalid visit type." }, { status: 400 });
    }

    const ua = request.headers.get("user-agent");
    const timestamp = new Date().toISOString();
    const country = request.headers.get("x-vercel-ip-country");
    const region = request.headers.get("x-vercel-ip-country-region");
    const city = request.headers.get("x-vercel-ip-city");

    const visits = await readVisits();
    visits.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      path: typeof path === "string" ? path : null,
      referrer: typeof referrer === "string" ? referrer : null,
      userAgent: ua,
      country,
      region,
      city,
      device: detectDevice(ua),
      createdAt: timestamp,
    });
    await writeVisits(visits);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error recording visit:", error);
    return NextResponse.json(
      { error: "Unable to record visit." },
      { status: 500 }
    );
  }
}
