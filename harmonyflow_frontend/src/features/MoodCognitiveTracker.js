import React, { useState } from "react";
import DashboardWidgetTile from "./DashboardWidgetTile";

// PUBLIC_INTERFACE
export default function MoodCognitiveTracker() {
  const [trend] = useState([
    { day: "Mon", mood: 4, note: "Focused" },
    { day: "Tue", mood: 2, note: "Distracted" },
    { day: "Wed", mood: 5, note: "Energized" },
    { day: "Thu", mood: 3, note: "Tired" },
    { day: "Fri", mood: 4, note: "Optimistic" },
    { day: "Sat", mood: 5, note: "Confident" },
    { day: "Sun", mood: 3, note: "Relaxed" },
  ]);
  return (
    <DashboardWidgetTile
      icon="🧠"
      title="Mood & Cognitive State Tracker"
      accent="mood"
      desc="Track your mood and mental focus over time."
      style={{ minHeight: 155, marginBottom: 18 }}
      aria-label="Mood and Cognitive State Tracker"
    >
      {/* Mood chart placeholder */}
      <div
        style={{
          margin: "18px 0 6px 0",
          height: 39,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        aria-hidden={true}
      >
        <svg width="160" height="39" viewBox="0 0 164 39" style={{ width: "100%", maxWidth: 178 }}>
          <polyline
            fill="none"
            stroke="#43e8d8"
            strokeWidth="3.2"
            points={trend.map((d, i) =>
              [10 + i * 22, 31 - 5 * d.mood].join(",")
            ).join(" ")}
            style={{ filter: "drop-shadow(0 2px 6px #43e8d826)" }}
          />
          {trend.map((d, i) => (
            <circle
              key={d.day}
              cx={10 + i * 22}
              cy={31 - 5 * d.mood}
              r="3.2"
              fill="#b7cdfa"
              opacity="0.76"
            />
          ))}
        </svg>
      </div>
      <div style={{ fontSize: 13.5, color: "var(--text-muted)", display: "flex", gap: 15 }}>
        {trend.map(d => <span key={d.day}>{d.day}</span>)}
      </div>
      <div style={{ marginTop: 4, fontSize: 13, color: "#768394" }}>
        Recent cognitive note: <b>{trend[trend.length - 1].note}</b>
      </div>
    </DashboardWidgetTile>
  );
}
