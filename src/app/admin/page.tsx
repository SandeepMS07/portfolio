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
    return <div className="py-16 text-sm text-fg-dim">Loading analytics…</div>;
  }

  if (!stats) {
    return (
      <div className="mx-auto max-w-md py-16">
        <div className="glass rounded-2xl p-6">
          <span className="eyebrow">// Restricted</span>
          <h1 className="mt-2 text-2xl font-semibold text-aurora">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-fg-dim">
            Enter your admin credentials to view analytics.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-fg-faint">
                Username
              </label>
              <input
                className="mt-2 w-full rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 text-sm text-fg outline-none transition-colors focus:border-violet/60"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-medium uppercase tracking-[0.12em] text-fg-faint">
                Password
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl border border-line bg-white/[0.03] px-3.5 py-2.5 focus-within:border-violet/60">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent text-sm text-fg outline-none"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  type="button"
                  className="text-fg-faint transition-colors hover:text-fg"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
            <button className="w-full rounded-full bg-gradient-to-r from-violet to-cyan py-2.5 text-sm font-medium text-white shadow-[0_8px_24px_-10px_rgba(255,94,44,0.5)] transition-transform hover:-translate-y-0.5">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 py-2">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">// Internal</span>
          <h1 className="mt-2 text-3xl font-semibold text-aurora">
            Portfolio Analytics
          </h1>
          <p className="mt-1 text-sm text-fg-dim">
            File-based analytics from visitor tracking.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-line px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-fg-dim transition-colors hover:border-violet/60 hover:text-fg"
        >
          Log out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Total visits" value={stats.total} />
        <StatTile
          label="Last visit"
          value={stats.lastVisit?.createdAt ?? "No data yet"}
          sub={stats.lastVisit?.path ?? "Unknown path"}
          small
        />
        <StatTile
          label="Top device"
          value={stats.devices[0]?.label ?? "Unknown"}
          sub={`${stats.devices[0]?.count ?? 0} visits`}
        />
        <StatTile
          label="Top country"
          value={stats.countries[0]?.label ?? "Unknown"}
          sub={`${stats.countries[0]?.count ?? 0} visits`}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AnalyticsTable title="Visits per day" rows={stats.visitsPerDay} />
        <AnalyticsTable title="Top pages" rows={stats.topPages} />
        <AnalyticsTable title="Top referrers" rows={stats.topReferrers} />
        <AnalyticsTable title="Countries" rows={stats.countries} />
        <AnalyticsTable title="Devices" rows={stats.devices} />
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  sub,
  small,
}: {
  label: string;
  value: string | number;
  sub?: string;
  small?: boolean;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="eyebrow">{label}</div>
      <div
        className={`mt-2 font-semibold text-fg ${small ? "text-sm" : "text-2xl"}`}
      >
        {value}
      </div>
      {sub ? <div className="mt-1 text-xs text-fg-faint">{sub}</div> : null}
    </div>
  );
}

function AnalyticsTable({ title, rows }: { title: string; rows: StatItem[] }) {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="border-b border-line px-4 py-3 text-sm font-semibold text-fg">
        {title}
      </div>
      <div className="divide-y divide-line">
        {rows.length ? (
          rows.slice(0, 8).map((row) => (
            <div
              key={`${title}-${row.label}`}
              className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
            >
              <span className="truncate text-fg-dim">{row.label}</span>
              <span className="font-mono text-cyan">{row.count}</span>
            </div>
          ))
        ) : (
          <div className="px-4 py-3 text-xs text-fg-faint">No data yet.</div>
        )}
      </div>
    </div>
  );
}
