"use client";

import { useEffect } from "react";

const DAILY_KEY = "portfolio_daily_visit";

const sendVisit = async (type: "visit" | "daily") => {
  try {
    await fetch("/api/track-visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        path: window.location.pathname,
        referrer: document.referrer || null,
      }),
    });
  } catch {
    // Best-effort only; avoid blocking the page.
  }
};

export function VisitTracker() {
  useEffect(() => {
    sendVisit("visit");

    const today = new Date().toISOString().slice(0, 10);
    const lastDaily = window.localStorage.getItem(DAILY_KEY);
    if (lastDaily !== today) {
      sendVisit("daily");
      window.localStorage.setItem(DAILY_KEY, today);
    }
  }, []);

  return null;
}
