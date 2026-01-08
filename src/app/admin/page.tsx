"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type StatItem = { label: string; count: number };
type StatsResponse = {
  total: number;
  visitsPerDay: StatItem[];
  topPages: StatItem[];
  topReferrers: StatItem[];
  countries: StatItem[];
  devices: StatItem[];
  lastVisit: {
    path: string | null;
    referrer: string | null;
    country: string | null;
    device: string | null;
    createdAt: string;
  } | null;
};

const fetchStats = async () => {
  const response = await fetch("/api/admin/stats");
  if (!response.ok) {
    throw new Error("unauthorized");
  }
  return (await response.json()) as StatsResponse;
};

export default function AdminPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchStats()
      .then((data) => setStats(data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setError("Invalid login. Try again.");
      return;
    }

    const data = await fetchStats();
    setStats(data);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setStats(null);
    setUsername("");
    setPassword("");
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-slate-100">
        Loading analytics…
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-slate-100">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-2xl">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-400">
            Enter your admin credentials to view analytics.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">
                Username
              </label>
              <input
                className="mt-2 w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-100 focus:border-sky-500 focus:outline-none"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">
                Password
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 focus-within:border-sky-500">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent text-slate-100 focus:outline-none"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-200"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            <button className="w-full rounded-lg bg-sky-500 py-2 font-medium text-slate-950 hover:bg-sky-400">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 text-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Portfolio Analytics</h1>
          <p className="mt-1 text-sm text-slate-400">
            File-based analytics from visitor tracking.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
        >
          Log out
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Total visits
          </div>
          <div className="mt-2 text-3xl font-semibold">{stats.total}</div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Last visit
          </div>
          <div className="mt-2 text-sm text-slate-200">
            {stats.lastVisit?.createdAt ?? "No data yet"}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {stats.lastVisit?.path ?? "Unknown path"}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Top device
          </div>
          <div className="mt-2 text-lg font-semibold">
            {stats.devices[0]?.label ?? "Unknown"}
          </div>
          <div className="text-xs text-slate-500">
            {stats.devices[0]?.count ?? 0} visits
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Top country
          </div>
          <div className="mt-2 text-lg font-semibold">
            {stats.countries[0]?.label ?? "Unknown"}
          </div>
          <div className="text-xs text-slate-500">
            {stats.countries[0]?.count ?? 0} visits
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnalyticsTable title="Visits per day" rows={stats.visitsPerDay} />
        <AnalyticsTable title="Top pages" rows={stats.topPages} />
        <AnalyticsTable title="Top referrers" rows={stats.topReferrers} />
        <AnalyticsTable title="Countries" rows={stats.countries} />
        <AnalyticsTable title="Devices" rows={stats.devices} />
      </div>
    </div>
  );
}

function AnalyticsTable({
  title,
  rows,
}: {
  title: string;
  rows: StatItem[];
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-3 space-y-2 text-sm text-slate-200">
        {rows.length ? (
          rows.slice(0, 8).map((row) => (
            <div
              key={`${title}-${row.label}`}
              className="flex items-center justify-between gap-4 rounded-lg bg-slate-900/60 px-3 py-2"
            >
              <span className="truncate">{row.label}</span>
              <span className="text-slate-400">{row.count}</span>
            </div>
          ))
        ) : (
          <div className="text-sm text-slate-500">No data yet.</div>
        )}
      </div>
    </div>
  );
}
