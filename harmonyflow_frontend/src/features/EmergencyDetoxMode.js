import React, { useState } from "react";

/**
 * EmergencyDetoxMode
 * Lets user toggle detox mode state; disables "feeds" (simulated), shows visual feedback.
 */
// PUBLIC_INTERFACE
export default function EmergencyDetoxMode() {
  const [active, setActive] = useState(false);

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 36,
      marginTop: 30,
      maxWidth: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#4A90E2", fontWeight: 600, margin: "0 0 9px" }}>Emergency Detox Mode</h2>
      <div style={{ fontSize: 15, marginBottom: 8 }}>
        {active
          ? "Detox Mode is ON. Digital distractions muted. Focus & breathe."
          : "Need to unplug for a moment? Activate Emergency Detox for focus."}
      </div>
      <button className="btn btn-large" style={{
        background: "#4A90E2",
        color: "#fff", borderRadius: 6, fontWeight: 500
      }} onClick={() => setActive(a => !a)}>
        {active ? "End Detox" : "Start Emergency Detox"}
      </button>
      {active && <div style={{ color: "#F5A623", fontWeight: 600, marginTop: 11, fontSize: 15 }}>
        🔕 Notifications disabled.<br />
        <span style={{
          fontSize: 19,
          display: "inline-block",
          marginTop: 2,
          animation: "blink 1.2s infinite alternate"
        }}>😌</span>
        <style>{`
          @keyframes blink { 0% { opacity: 1; } 100% { opacity: 0.45; } }
        `}</style>
      </div>}
    </div>
  );
}
