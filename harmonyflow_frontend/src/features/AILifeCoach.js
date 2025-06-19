import React, { useState } from "react";

/**
 * AILifeCoach
 * Simulates AI coaching feedback with session history.
 */
// PUBLIC_INTERFACE
const ADVICE = [
  "Prioritize self-care: Add a 10-minute recharge each afternoon.",
  "Celebrate small wins – they're the road to progress.",
  "Limit multitasking to stay present and improve focus.",
  "Reflect on setbacks as learning opportunities.",
  "Add restful time before sleep for brain recovery.",
  "Focus on one new habit at a time for better results.",
];

export default function AILifeCoach() {
  const [tip, setTip] = useState(ADVICE[0]);
  const [history, setHistory] = useState([ADVICE[2], ADVICE[4]]);

  function nextTip() {
    const newTip = ADVICE[Math.floor(Math.random() * ADVICE.length)];
    setTip(newTip);
    setHistory(h => [newTip, ...h.slice(0, 5)]);
  }

  return (
    <section
      className="feature-card"
      style={{
        minHeight: 120,
        background: "var(--card-bg)",
        borderRadius: "var(--radius-lg)",
        padding: "23px 24px 14px 24px",
        marginBottom: 13,
        boxShadow: "var(--shadow-md)",
      }}
      aria-label="AI Life Coach"
      tabIndex={0}
    >
      <h3 className="card-title" style={{ color: "var(--secondary)", marginBottom: 5 }}>
        🤖 AI Life Coach
      </h3>
      <div className="card-desc" style={{ color: "var(--text-muted)", fontSize: 15 }}>
        Personalized advice to level up well-being and performance. <br />
        <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>More detailed reports soon!</span>
      </div>
      <div style={{
        marginTop: 12,
        marginBottom: 8,
        fontSize: 15.7,
        color: "var(--primary-dark)",
        fontWeight: 500,
        letterSpacing: "-0.01em",
      }}>
        {tip}
      </div>
      <button
        className="btn"
        onClick={nextTip}
        style={{ background: "var(--primary)", color: "#fff", borderRadius: 7, fontWeight: 600, fontSize: 14, minWidth: 96 }}
      >
        New Advice
      </button>
      <div style={{ marginTop: 9, fontSize: 13, color: "#afbad0" }}>
        Prior tips: {history.length > 1 ? history.slice(1).join(" | ") : "—"}
      </div>
    </section>
  );
}
