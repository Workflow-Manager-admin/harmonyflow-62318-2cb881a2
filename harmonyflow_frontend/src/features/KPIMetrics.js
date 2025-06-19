import React from "react";

/**
 * KPIMetrics
 * Tracks demo sleep, focus hours, and more in motivational visual.
 */
// PUBLIC_INTERFACE
export default function KPIMetrics() {
  const metrics = {
    sleep: 7.2, // hours
    focusHours: 5.5,
    goalsThisWeek: 3,
    habits: 5,
    streak: 4,
  };

  return (
    <section
      className="feature-card"
      style={{
        minHeight: 110,
        background: "var(--card-bg)",
        borderRadius: "var(--radius-lg)",
        padding: "23px 24px 13px 24px",
        marginBottom: 9,
        boxShadow: "var(--shadow-md)",
        display: "flex",
        flexDirection: "column",
      }}
      aria-label="KPI and Focus Metrics"
      tabIndex={0}
    >
      <h3 className="card-title" style={{ color: "var(--primary)", marginBottom: 3 }}>
        📈 KPI & Focus Metrics
      </h3>
      <div
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 9,
        }}
      >
        <span style={{ color: "#43e8d8", fontWeight: 600, fontSize: 17 }}>
          {metrics.sleep}h Sleep
        </span>
        <span style={{ color: "#4A90E2" }}>{metrics.focusHours}h Focus</span>
        <span style={{ color: "#F5A623" }}>{metrics.goalsThisWeek} Goals</span>
        <span style={{ color: "#50E3C2" }}>{metrics.habits} Habits</span>
        <span style={{ color: "#768394" }}>🔥 {metrics.streak}d streak</span>
      </div>
      <div style={{ marginTop: 7, fontSize: 13, color: "var(--text-muted)" }}>
        <span role="img" aria-label="insight">✨</span>
        Tracking for progress and self-mastery.
      </div>
    </section>
  );
}
