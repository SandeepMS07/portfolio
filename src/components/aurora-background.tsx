export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* pure black base */}
      <div className="absolute inset-0 bg-[#070504]" />

      {/* cosmic-orange glow — left */}
      <div
        className="absolute left-[-8%] top-[16%] h-[70vh] w-[42vw] rounded-full bg-[radial-gradient(circle,rgba(255,94,44,0.22),transparent_68%)] blur-[120px]"
        style={{ animation: "blob-drift 28s ease-in-out infinite" }}
      />

      {/* warm amber glow — right */}
      <div
        className="absolute right-[-10%] top-[28%] h-[62vh] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(255,147,71,0.14),transparent_70%)] blur-[130px]"
        style={{ animation: "blob-drift 34s ease-in-out infinite reverse" }}
      />

      {/* faint orange bloom behind the hero */}
      <div
        className="absolute left-1/2 top-[-10%] h-[42vh] w-[58vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,44,0.1),transparent_72%)] blur-[120px]"
        style={{ animation: "blob-drift 24s ease-in-out infinite" }}
      />

      {/* vignette to keep edges deep black */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_35%,transparent_42%,rgba(0,0,0,0.6))]" />

      {/* faint grain for premium texture */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%223%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}
