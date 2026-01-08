import { NextResponse, type NextRequest } from "next/server";

export const ADMIN_COOKIE = "portfolio_admin_session";
export const ADMIN_USERNAME = "sandeepms.work@gmail.com";
export const ADMIN_PASSWORD = "Sandy@12345";

export const isAuthed = (request: NextRequest) =>
  request.cookies.get(ADMIN_COOKIE)?.value === "ok";

export const setAuthCookie = (response: NextResponse) => {
  response.cookies.set(ADMIN_COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

export const clearAuthCookie = (response: NextResponse) => {
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
};
