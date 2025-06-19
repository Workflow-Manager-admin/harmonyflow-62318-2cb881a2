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
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 38,
      marginTop: 32,
      maxWidth: 430,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#4A90E2", fontWeight: 600, margin: "0 0 10px" }}>Global Impact Meter</h2>
      <div style={{ marginBottom: 6 }}>
        <b>🌎 Collective progress</b>
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 9 }}>
        <div><b>{stats.challengesComplete}</b> Challenges</div>
        <div><b>{stats.hoursMeditated}</b> Hours Meditated</div>
        <div><b>{stats.ecoActions}</b> Eco Actions</div>
        <div><b>{stats.businessPartners}</b> Biz Partners</div>
      </div>
      <div style={{ width: "100%", background: "#EEF2F7", borderRadius: 8, height: 14, marginBottom: 7 }}>
        <div style={{
          width: stats.progress + "%",
          background: "#50E3C2",
          height: "100%",
          borderRadius: 8,
          transition: "width 500ms"
        }} />
      </div>
      <span style={{ color: "#768394", fontSize: 13 }}>{stats.progress}% to next global milestone!</span>
    </div>
  );
}
