import React, { useState } from "react";

/**
 * SeasonalTournaments
 * Interactive leaderboard - allows users to submit an action, updates their score.
 */
// PUBLIC_INTERFACE
const INIT_LEADERBOARD = [
  { name: "You", points: 120, self: true },
  { name: "Ava", points: 140 },
  { name: "Jamal", points: 118 },
  { name: "Sasha", points: 155 }
];

export default function SeasonalTournaments() {
  const [leaderboard, setLeaderboard] = useState(INIT_LEADERBOARD);
  const [action, setAction] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!action.trim()) return;
    setLeaderboard(lb =>
      lb.map(u =>
        u.self ? { ...u, points: u.points + Math.floor(Math.random() * 16 + 5) } : u
      )
    );
    setAction("");
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.025)",
      padding: 34,
      marginTop: 32,
      maxWidth: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#F5A623", fontWeight: 600, margin: "0 0 12px" }}>Seasonal Tournaments</h2>
      <div style={{ fontSize: 15, marginBottom: 8 }}>
        Compete in seasonal quests. Log an action to climb the leaderboard!
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 6, marginBottom: 15 }}>
        <input
          value={action}
          onChange={e => setAction(e.target.value)}
          placeholder="Ex: Completed a task"
          style={{ border: "1px solid #F5A623", borderRadius: 6, padding: 6, flex: 1 }}
        />
        <button type="submit" className="btn" style={{
          background: "#F5A623", color: "#fff", borderRadius: 6, fontSize: 15
        }}>Submit</button>
      </form>
      <ol>
        {leaderboard
          .slice()
          .sort((a, b) => b.points - a.points)
          .map((u, i) => (
            <li key={u.name} style={{
              color: u.self ? "#4A90E2" : "#222",
              fontWeight: u.self ? 700 : 400,
              marginBottom: 7
            }}>
              {u.name} <b style={{ marginLeft: 5 }}>{u.points}</b> pts
            </li>
          ))}
      </ol>
      <div style={{ color: "#768394", fontSize: 13 }}>Leaderboard updates in real-time soon.</div>
    </div>
  );
}
