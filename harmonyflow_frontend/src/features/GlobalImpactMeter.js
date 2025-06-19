import React, { useState, useEffect } from "react";

/**
 * GlobalImpactMeter
 * Visual, live counter of global progress, with bar animation.
 * Demo: numbers increment on load.
 */
// PUBLIC_INTERFACE
export default function GlobalImpactMeter() {
  const [stats, setStats] = useState({
    challengesComplete: 3829,
    hoursMeditated: 912,
    businessPartners: 32,
    ecoActions: 502,
    progress: 6
  });

  useEffect(() => {
    // Animate bar for demo - progress counts up to random target
    const target = Math.floor(Math.random() * 24) + 68;
    let p = stats.progress;
    const interval = setInterval(() => {
      p += 1;
      setStats(s => ({ ...s, progress: Math.min(p, target) }));
      if (p >= target) clearInterval(interval);
    }, 32);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return (
    <section
      className="feature-card"
      style={{
        marginTop: 32,
        maxWidth: 430,
        marginLeft: "auto",
        marginRight: "auto"
      }}
      aria-label="Global Impact Meter"
      tabIndex={0}
    >
      <h2 style={{ color: "var(--primary)", fontWeight: 700, margin: "0 0 10px" }}>Global Impact Meter</h2>
      <div style={{ marginBottom: 6 }}>
        <b>🌎 Collective progress</b>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 9 }}>
        <div><b>{stats.challengesComplete}</b> Challenges</div>
        <div><b>{stats.hoursMeditated}</b> Hours Meditated</div>
        <div><b>{stats.ecoActions}</b> Eco Actions</div>
        <div><b>{stats.businessPartners}</b> Biz Partners</div>
      </div>
      <div style={{
        width: "100%",
        background: "var(--border-light)",
        borderRadius: "var(--radius)",
        height: 13,
        marginBottom: 7,
        overflow: "hidden"
      }}>
        <div style={{
          width: stats.progress + "%",
          background: "linear-gradient(90deg, var(--secondary) 50%, var(--primary) 100%)",
          height: "100%",
          borderRadius: "var(--radius)",
          transition: "width 500ms var(--tr-fast)"
        }} />
      </div>
      <span style={{ color: "var(--text-muted)", fontSize: 13 }}>{stats.progress}% to next global milestone!</span>
    </section>
  );
}
