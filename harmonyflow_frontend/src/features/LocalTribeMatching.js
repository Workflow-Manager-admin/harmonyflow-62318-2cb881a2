import React, { useState } from "react";

/**
 * LocalTribeMatching
 * Interactive matching of users with shared nearby interests/goals.
 * Demo: Allows you to filter by interest, and simulates "match".
 */
// PUBLIC_INTERFACE
const TRIBE_DATA = [
  { name: "Maya", goal: "Running", nearby: true },
  { name: "Leo", goal: "Journaling", nearby: false },
  { name: "Priya", goal: "Healthy Cooking", nearby: true },
  { name: "Ellie", goal: "Drawing", nearby: true },
  { name: "Tom", goal: "Running", nearby: false },
];

export default function LocalTribeMatching() {
  const [filter, setFilter] = useState("");
  const [matchedIdx, setMatchedIdx] = useState(null);

  function doMatch(idx) {
    setMatchedIdx(idx);
    setTimeout(() => setMatchedIdx(null), 1400);
  }

  const result = filter
    ? TRIBE_DATA.filter(u => u.goal.toLowerCase().includes(filter.toLowerCase()))
    : TRIBE_DATA;

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 32,
      marginTop: 32,
      maxWidth: 410,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#50E3C2", fontWeight: 600, margin: "0 0 13px" }}>Local Tribe Matching</h2>
      <div style={{ fontSize: 15, marginBottom: 9 }}>
        Find people nearby who share your goals, and "match" with them for accountability.
      </div>
      <input
        placeholder="Filter by interest (ex: Running, Journaling)..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{
          padding: 8,
          width: "100%",
          marginBottom: 10,
          border: "1px solid #50E3C2",
          borderRadius: 6
        }}
      />
      <ul style={{ marginTop: 10, minHeight: 120 }}>
        {result.length === 0 && (
          <li style={{ color: "#aaa", fontStyle: "italic" }}>No matches found.</li>
        )}
        {result.map((u, idx) => (
          <li key={u.name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
              color: u.nearby ? "#4A90E2" : "#768394",
              opacity: matchedIdx === idx ? 0.5 : 1
            }}>
            <span style={{ fontWeight: 500 }}>{u.name}</span>
            <span style={{ fontSize: 13, marginLeft: 6 }}>({u.goal})</span>
            {u.nearby && <span style={{ marginLeft: 8, fontSize: 14 }}>• Nearby</span>}
            <button
              className="btn"
              style={{
                background: "#4A90E2",
                color: "#fff",
                borderRadius: 5,
                marginLeft: "auto",
                fontSize: 13,
                padding: "4px 12px"
              }}
              disabled={matchedIdx !== null}
              onClick={() => doMatch(idx)}
            >
              {matchedIdx === idx ? "Matched!" : "Match"}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ color: "#768394", fontSize: 13, marginTop: 15 }}>* Demo: Replace with real location matching.</div>
    </div>
  );
}
