import React, { useState } from "react";
import DashboardWidgetTile from "./DashboardWidgetTile";

// PUBLIC_INTERFACE
export default function AISchedulerOracle() {
  const [state] = useState({
    today: [
      { time: "08:00", task: "Meditation", status: "✓" },
      { time: "09:30", task: "Team meeting", status: "" },
      { time: "12:00", task: "Lunch break", status: "" },
      { time: "15:00", task: "Goal review", status: "" },
      { time: "17:00", task: "Jogging", status: "" },
      { time: "19:00", task: "Reflection journal", status: "" },
    ],
    burnoutRisk: "Low",
    aiAdvice: "Maintain consistent breaks after deep work to minimize fatigue.",
  });

  return (
    <DashboardWidgetTile
      icon="⏱️"
      title="AI Scheduler & Time Oracle"
      accent="schedule"
      desc={
        <>
          Your day, intelligently organized. <b>AI will reschedule</b> and warn when burnout is predicted.
        </>
      }
      style={{ minHeight: 160, marginBottom: 20 }}
      aria-label="AI Scheduler & Time Oracle"
    >
      <div role="table" aria-label="Today's Schedule" style={{ marginBottom: 12 }}>
        {state.today.map((ev, i) => (
          <div key={i} role="row" style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 5 }}>
            <span style={{ fontWeight: 600, minWidth: 48, color: "#1a1d2e" }}>{ev.time}</span>
            <span style={{ color: "#326cfb" }}>{ev.task}</span>
            <span aria-label={ev.status === "✓" ? "Done" : ""} style={{ color: "#43e8d8", marginLeft: "auto", fontWeight: 700 }}>{ev.status}</span>
          </div>
        ))}
      </div>
      <div aria-live="polite" style={{ fontSize: 14.5, color: "var(--accent)", marginBottom: 3 }}>
        Burnout Risk: <b style={{ color: state.burnoutRisk === "Low" ? "#43e8d8" : "#ff5656" }}>{state.burnoutRisk}</b>
      </div>
      <div className="card-desc" style={{ color: "var(--text-muted)", fontStyle: "italic", fontSize: 13.5 }}>
        {state.aiAdvice}
      </div>
    </DashboardWidgetTile>
  );
}
