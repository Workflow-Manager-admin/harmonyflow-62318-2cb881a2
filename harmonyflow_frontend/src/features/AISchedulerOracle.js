import React, { useState } from "react";

/**
 * AISchedulerOracle
 * Simulates an AI-powered schedule summary and burnout prediction.
 */
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
    <section
      className="feature-card"
      style={{
        minHeight: 160,
        background: "var(--card-bg)",
        borderRadius: "var(--radius-lg)",
        padding: "26px 28px 17px 28px",
        marginBottom: 20,
        boxShadow: "var(--shadow-md)",
      }}
      aria-label="AI Scheduler & Time Oracle"
      tabIndex={0}
    >
      <h3 className="card-title" style={{ color: "var(--secondary)" }}>
        ⏱️ AI Scheduler & Time Oracle
      </h3>
      <div className="card-desc" style={{ color: "var(--text-muted)", marginBottom: 13 }}>
        Your day, intelligently organized. <b>AI will reschedule</b> and warn when burnout is predicted.
      </div>
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
    </section>
  );
}
