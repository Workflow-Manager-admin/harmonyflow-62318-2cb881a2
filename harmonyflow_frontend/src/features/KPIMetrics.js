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
          <span role="img" aria-label="insight">
            ✨
          </span>
          {" "}
          Tracking for progress and self-mastery.
        </>
      }
      style={{ minHeight: 110, marginBottom: 9 }}
      aria-label="KPI and Focus Metrics"
    >
      <div
        role="list"
        aria-label="Latest KPI metrics"
        style={{
          display: "flex",
          gap: 18,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: 9,
        }}
      >
        <span
          role="listitem"
          style={{
            color: "#11131c",
            background: "#43e8d81c",
            fontWeight: 700,
            fontSize: 17,
            borderRadius: "7px",
            padding: "5px 10px",
            minWidth: 60,
            display: "inline-block",
            boxShadow: "0 1px 6px #43e8d80b",
            marginBottom: 2,
          }}
          aria-label={`${metrics.sleep} hours of sleep`}
        >
          {metrics.sleep}h <span style={{ color: "#43e8d8" }}>Sleep</span>
        </span>
        <span
          role="listitem"
          style={{
            color: "#fff",
            background: "#4A90E2",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: "7px",
            padding: "5px 10px",
            boxShadow: "0 1px 6px #4a90e218",
            marginBottom: 2,
            minWidth: 60,
            display: "inline-block",
            letterSpacing: ".01em",
          }}
          aria-label={`${metrics.focusHours} hours of focus`}
        >
          {metrics.focusHours}h Focus
        </span>
        <span
          role="listitem"
          style={{
            color: "#fff",
            background: "#F5A623",
            fontWeight: 700,
            fontSize: 16,
            borderRadius: "7px",
            padding: "5px 10px",
            boxShadow: "0 1px 6px #f5a6230c",
            marginBottom: 2,
            minWidth: 48,
            display: "inline-block",
            letterSpacing: ".01em",
          }}
          aria-label={`${metrics.goalsThisWeek} goals this week`}
        >
          {metrics.goalsThisWeek} Goals
        </span>
        <span
          role="listitem"
          style={{
            color: "#fff",
            background: "#50E3C2",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: "7px",
            padding: "5px 10px",
            boxShadow: "0 1px 6px #50e3c213",
            marginBottom: 2,
            minWidth: 48,
            display: "inline-block",
            letterSpacing: ".01em",
          }}
          aria-label={`${metrics.habits} habits`}
        >
          {metrics.habits} Habits
        </span>
        <span
          role="listitem"
          style={{
            color: "#fff",
            background: "#768394",
            fontWeight: 500,
            fontSize: 15,
            borderRadius: "7px",
            padding: "5px 10px",
            marginBottom: 2,
            minWidth: 48,
            display: "inline-block",
            letterSpacing: ".01em",
          }}
          aria-label={`${metrics.streak} day streak`}
        >
          🔥 {metrics.streak}d streak
        </span>
      </div>
    </DashboardWidgetTile>
  );
}
