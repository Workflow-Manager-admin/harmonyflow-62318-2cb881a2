import React, { useState } from "react";
import "./App.css";

/**
 * FlowStateInductionSystem
 *
 * UI to recommend music, optimal lighting, and mock smart device integration
 * for achieving a productive flow state.
 * Features mocked AI suggestions, device status toggling, and a modern, friendly UX.
 *
 * Routes: /flow-state-induction
 *
 * Designed for demonstration (mock data); real integrations would use APIs.
 */

// Music, lighting, and mock device suggestions
const MUSIC_RECOMMENDATIONS = [
  {
    genre: "Lo-Fi Beats",
    desc: "Calming, focus-oriented lo-fi to keep distractions away.",
    link: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
    emoji: "🎧",
  },
  {
    genre: "Binaural Focus",
    desc: "Binaural beats for enhancing deep work and concentration.",
    link: "https://www.youtube.com/watch?v=WPni755-Krg",
    emoji: "🧠",
  },
  {
    genre: "Instrumental Jazz",
    desc: "Uplifting, energizing jazz to spark creative focus.",
    link: "https://www.youtube.com/watch?v=Dx5qFachd3A",
    emoji: "🎺",
  },
];

const LIGHTING_OPTIONS = [
  {
    name: "Cool White",
    desc: "Bright white light for alertness and focus.",
    color: "#eaf9fe",
    emoji: "💡"
  },
  {
    name: "Warm Amber",
    desc: "Soothing evening lighting for calm, creative flow.",
    color: "#ffe4b0",
    emoji: "🕯️"
  },
  {
    name: "Daylight Boost",
    desc: "Full spectrum daylight for peak productivity.",
    color: "#f1fff9",
    emoji: "🌞"
  },
];

// Mock devices
const MOCK_DEVICES = [
  { name: "Smart Speaker", type: "audio", emoji: "🔊" },
  { name: "Smart Desk Lamp", type: "light", emoji: "💡" },
  { name: "Standing Desk", type: "desk", emoji: "🪑" }
];

// PUBLIC_INTERFACE
function FlowStateInductionSystem() {
  const [selectedMusic, setSelectedMusic] = useState(0);
  const [selectedLighting, setSelectedLighting] = useState(0);
  const [devices, setDevices] = useState(
    MOCK_DEVICES.map(d => ({ ...d, connected: false }))
  );

  function handleDeviceToggle(idx) {
    setDevices(devs =>
      devs.map((d, i) =>
        i === idx ? { ...d, connected: !d.connected } : d
      )
    );
  }

  return (
    <div className="container" style={{ paddingTop: 96, paddingBottom: 60, minHeight: "65vh" }}>
      <div
        style={{
          background: "#f8fbff",
          borderRadius: 16,
          padding: "36px 32px 32px 32px",
          maxWidth: 780,
          margin: "0 auto 30px auto",
          boxShadow: "0 4px 24px #00409116",
        }}
      >
        <h1 className="title" style={{ fontSize: "2.12rem", margin: "0 0 13px 0" }}>
          🌀 Flow State Induction System
        </h1>
        <div className="description" style={{ marginBottom: 20 }}>
          Discover personalized ways to get into flow—AI-recommended music, optimal lighting, and smart device integration for peak productivity.
        </div>

        {/* Music Recommendations */}
        <section style={{ marginBottom: 34 }}>
          <h2 style={{ color: "#4A90E2", fontSize: "1.38rem", margin: 0, marginBottom: 7, fontWeight: 600 }}>🎵 Music for Focus</h2>
          <div style={{ display: "flex", gap: 19, flexWrap: "wrap" }}>
            {MUSIC_RECOMMENDATIONS.map((m, idx) => (
              <div
                key={m.genre}
                style={{
                  background: idx === selectedMusic ? "var(--base-light)" : "#e5f8ff",
                  color: idx === selectedMusic ? "#003141" : "#50E3C2",
                  border: idx === selectedMusic ? "2.5px solid #4A90E2" : "1.5px solid #b0e9f8",
                  borderRadius: 11,
                  padding: "17px 14px",
                  minWidth: 170,
                  maxWidth: 240,
                  cursor: "pointer",
                  fontWeight: idx === selectedMusic ? 600 : 500,
                  flex: "1 1 200px",
                  boxShadow: idx === selectedMusic ? "0 2px 8px #4A90E220" : undefined
                }}
                onClick={() => setSelectedMusic(idx)}
                tabIndex={0}
                aria-pressed={selectedMusic === idx}
              >
                <div style={{ fontSize: "1.7em", marginBottom: 6 }}>{m.emoji}</div>
                <div style={{fontWeight: 600, marginBottom: 3}}>{m.genre}</div>
                <div style={{ fontSize: "0.99em", color: idx === selectedMusic ? "#fff" : "#3791b9" }}>{m.desc}</div>
                <div style={{ marginTop: 9 }}>
                  <a
                    href={m.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: idx === selectedMusic ? "#fff" : "#4A90E2",
                      textDecoration: "underline",
                      fontWeight: 500,
                    }}
                    onClick={e => e.stopPropagation()}
                  >
                    Listen
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lighting Recommendations */}
        <section style={{ marginBottom: 31 }}>
          <h2 style={{ color: "#50E3C2", fontSize: "1.28rem", margin: 0, marginBottom: 7, fontWeight: 600 }}>💡 Optimal Lighting</h2>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {LIGHTING_OPTIONS.map((l, idx) => (
              <div
                key={l.name}
                style={{
                  background: idx === selectedLighting ? "var(--base-light)" : "#fefae3",
                  color: idx === selectedLighting ? "#fff" : "#e7ad57",
                  border: idx === selectedLighting ? "2.5px solid #F5A623" : "1.5px solid #ffe2ae",
                  borderRadius: 11,
                  padding: "14px 12px",
                  minWidth: 155,
                  maxWidth: 210,
                  cursor: "pointer",
                  fontWeight: idx === selectedLighting ? 600 : 500,
                  flex: "1 1 140px",
                  boxShadow: idx === selectedLighting ? "0 2px 8px #F5A62333" : undefined
                }}
                onClick={() => setSelectedLighting(idx)}
                tabIndex={0}
                aria-pressed={selectedLighting === idx}
              >
                <div style={{ fontSize: "1.5em", marginBottom: 5 }}>{l.emoji}</div>
                <div style={{ fontWeight: 600, marginBottom: 3 }}>{l.name}</div>
                <div style={{ fontSize: "0.95em", color: "#c79b2b" }}>{l.desc}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 15,
            background: LIGHTING_OPTIONS[selectedLighting].color,
            borderRadius: 8,
            padding: "9px 13px",
            color: "#114",
            fontWeight: 500,
            fontSize: "1.01em",
            border: "1px solid #eaeef9"
          }}>
            Selected: <span style={{ color: "#F5A623", fontWeight: 700 }}>{LIGHTING_OPTIONS[selectedLighting].name}</span>
          </div>
        </section>

        {/* Smart Device Integration (Mock) */}
        <section>
          <h2 style={{ color: "#F5A623", fontSize: "1.19rem", margin: "0 0 8px 0", fontWeight: 600 }}>🤖 Smart Device Integration</h2>
          <div style={{ display: "flex", gap: 17, flexWrap: "wrap" }}>
            {devices.map((d, idx) => (
              <div
                key={d.name}
                style={{
                  background: "#f9fafb",
                  border: d.connected ? "2.5px solid #50E3C2" : "1.5px solid #E9E9EF",
                  borderRadius: 8,
                  padding: "12px 17px",
                  minWidth: 141,
                  marginBottom: 2,
                  textAlign: "center",
                  color: "#2473ab",
                  fontWeight: 600,
                  boxShadow: d.connected ? "0 2px 8px #50E3C233" : undefined
                }}
              >
                <div style={{ fontSize: "1.6em" }}>{d.emoji}</div>
                <div style={{ marginBottom: 2 }}>{d.name}</div>
                <button
                  className="btn"
                  style={{
                    background: d.connected ? "#4A90E2" : "var(--base-light)",
                    color: "#fff",
                    fontWeight: 500,
                    border: "none",
                    borderRadius: 4,
                    padding: "6px 14px",
                    marginTop: 7,
                    fontSize: "1em",
                    cursor: "pointer"
                  }}
                  onClick={() => handleDeviceToggle(idx)}
                  type="button"
                >
                  {d.connected ? "Disconnect" : "Connect"}
                </button>
                <div style={{ marginTop: 5, fontSize: "0.93em", color: d.connected ? "#50E3C2" : "#bbb" }}>
                  Status: {d.connected ? "Connected ✔" : "Offline"}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            fontSize: "0.99em",
            color: "#979797",
            marginTop: 13,
            textAlign: "left",
            maxWidth: 410
          }}>
            <ul style={{ marginLeft: 18, marginBottom: 0 }}>
              <li>Device integration is currently mocked for demonstration.</li>
              <li>In a real system, your app could control lighting, music, or desk position by connecting to smart home APIs.</li>
            </ul>
          </div>
        </section>
      </div>
      <div style={{ textAlign: "center", fontSize: "1em", color: "#92a9be", marginTop: 18 }}>
        * AI recommendations and device actions are demo only.
      </div>
    </div>
  );
}

export default FlowStateInductionSystem;
