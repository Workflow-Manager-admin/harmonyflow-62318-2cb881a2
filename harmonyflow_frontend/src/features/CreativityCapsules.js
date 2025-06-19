import React, { useState } from "react";

/**
 * CreativityCapsules
 * Pushes a random creative challenge/prompt, lets user "save" and accumulate responses.
 */
// PUBLIC_INTERFACE
const CAPSULES = [
  "Draw your day as a landscape 🌄",
  "Write a 3-line poem about hope 🌱",
  "Record 10s of sounds around you 🎤",
  "Invent a new recipe using only 5 ingredients 🍲",
  "Snap a picture of something that surprises you 📸"
];

export default function CreativityCapsules() {
  const [prompt, setPrompt] = useState(null);
  const [responses, setResponses] = useState([]);
  const [input, setInput] = useState("");

  function openCapsule() {
    setPrompt(CAPSULES[Math.floor(Math.random() * CAPSULES.length)]);
    setInput("");
  }

  function submitResponse(e) {
    e.preventDefault();
    if (!input.trim() || !prompt) return;
    setResponses(r => [...r, { prompt, response: input.trim() }]);
    setInput("");
    setPrompt(null);
  }

  return (
    <section
      className="feature-card"
      style={{
        marginTop: 33,
        maxWidth: 420,
        marginLeft: "auto",
        marginRight: "auto"
      }}
      aria-label="Creativity Capsules"
      tabIndex={0}
    >
      <h2 style={{ color: "var(--primary)", fontWeight: 700, margin: "0 0 8px" }}>Creativity Capsules</h2>
      <div style={{ fontSize: 15, marginBottom: 8 }}>
        Unleash your creativity! Open a capsule for an artsy quest.
      </div>
      <div style={{ margin: "11px 0", fontWeight: 500, minHeight: 24 }}>
        {prompt
          ? <div>
              <div>Prompt:</div>
              <div style={{ fontSize: 19, margin: "6px 0 9px" }}>{prompt}</div>
              <form onSubmit={submitResponse}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Your poetic, visual or musical response..."
                  style={{
                    width: "100%",
                    border: "1.5px solid var(--primary)",
                    borderRadius: "var(--radius-sm)",
                    padding: 10,
                    fontSize: 15,
                    background: "#f7fafd",
                    color: "var(--primary-dark)",
                    marginBottom: 11,
                    transition: "border var(--tr-fast), box-shadow var(--tr-fast)"
                  }}
                  required
                />
                <button type="submit" className="btn" style={{
                  background: "var(--primary)",
                  color: "#fff",
                  borderRadius: "var(--radius-sm)",
                  fontWeight: 700,
                  fontSize: 15
                }}>Save Response</button>
              </form>
            </div>
          : <button className="btn btn-large"
              style={{ background: "#4A90E2", color: "#fff", borderRadius: 5 }}
              onClick={openCapsule}
            >Open Capsule</button>}
      </div>
      <div style={{ marginTop: 24 }}>
        <h4 style={{ color: "#768394", fontSize: 16 }}>My Past Capsules</h4>
        {responses.length === 0 && <div style={{ color: "#aaa" }}>No responses saved yet.</div>}
        <ul style={{ marginTop: 6, paddingLeft: 15 }}>
          {responses.map((r, i) => (
            <li key={i} style={{
              marginBottom: 10,
              color: "var(--text-main)",
              padding: "8px 0"
            }}>
              <b style={{ color: "var(--primary)", fontWeight: 600 }}>{r.prompt}</b><br />
              <span style={{ color: "var(--text-subtle)" }}>{r.response}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
