import React, { useState, useEffect } from "react";

/**
 * ChallengeCapsules
 * Time-release quest that unlocks after a demo interval, with "Mark Complete".
 */
// PUBLIC_INTERFACE
const DEMO_CAPSULES = [
  { title: "Hydration Quest", intervalSec: 12, desc: "Drink a glass of water" },
  { title: "Gratitude Quest", intervalSec: 22, desc: "List 3 things you're grateful for" }
];

export default function ChallengeCapsules() {
  const [unlocked, setUnlocked] = useState(false);
  const [timer, setTimer] = useState(DEMO_CAPSULES[0].intervalSec);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (!unlocked && timer > 0) {
      const t = setTimeout(() => setTimer(tm => tm - 1), 1000);
      return () => clearTimeout(t);
    }
    if (timer === 0 && !unlocked) setUnlocked(true);
  }, [timer, unlocked]);

  function handleComplete() {
    setComplete(true);
    setTimeout(() => setUnlocked(false), 1200);
  }

  function format(sec) {
    let m = Math.floor(sec / 60);
    let s = sec % 60;
    return [m, s].map(n => n.toString().padStart(2, '0')).join(":");
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 34,
      marginTop: 33,
      maxWidth: 430,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#F5A623", fontWeight: 600, margin: "0 0 12px" }}>Challenge Capsules</h2>
      <div style={{ fontSize: 15, marginBottom: 7 }}>Unlock surprise time-based quests. Capsules reset after completing.</div>
      {!unlocked ? (
        <div>
          <div style={{ color: "#4A90E2", marginBottom: 5, fontWeight: 500, fontSize: 18 }}>
            Next Capsule: <span style={{ fontVariantNumeric: "tabular-nums" }}>{format(timer)}</span>
          </div>
          <button className="btn btn-large" disabled style={{ background: "#EEF2F7", color: "#4A90E2" }}>Locked</button>
        </div>
      ) : (
        <div>
          <div style={{ fontWeight: 500, fontSize: 17 }}>{DEMO_CAPSULES[0].title}</div>
          <div style={{ marginBottom: 10, fontSize: 15 }}>{DEMO_CAPSULES[0].desc}</div>
          <button className="btn btn-large"
            style={{
              background: complete ? "#50E3C2" : "#F5A623",
              color: "#fff"
            }}
            onClick={handleComplete}
            disabled={complete}
          >
            {complete ? "Completed!" : "Mark Complete"}
          </button>
        </div>
      )}
      <div style={{ color: "#768394", fontSize: 13, marginTop: 10 }}>
        Time-release quest logic for demo; connect real logic for dynamic quests.
      </div>
    </div>
  );
}
