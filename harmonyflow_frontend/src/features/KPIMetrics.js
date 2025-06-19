import React from "react";
import DashboardWidgetTile from "./DashboardWidgetTile";

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
    <DashboardWidgetTile
      icon="📈"
      title="KPI & Focus Metrics"
      accent="kpi"
      desc={
        <>
          <span role="img" aria-label="insight">✨</span>
          {" "}Tracking for progress and self-mastery.
        </>
      }
      style={{ minHeight: 110, marginBottom: 9 }}
      aria-label="KPI and Focus Metrics"
    >
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
    </DashboardWidgetTile>
  );
}
