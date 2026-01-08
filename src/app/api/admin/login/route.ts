import { NextResponse } from "next/server";
import { ADMIN_PASSWORD, ADMIN_USERNAME, setAuthCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body ?? {};

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    setAuthCookie(response);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Unable to login." }, { status: 500 });
  }
}
