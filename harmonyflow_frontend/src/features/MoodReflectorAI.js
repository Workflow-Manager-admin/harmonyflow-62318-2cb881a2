import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * MoodReflectorAI
 * Lets user select mood emoji, AI companion reflects back.
 */
const RESPONSE_MAP = {
  "😊": "I see you're full of joy! 🌞 Keep shining.",
  "😕": "It's okay to feel uncertain. A short walk might help.",
  "😢": "You seem down. Remember: clouds pass. Reach out if needed.",
  "😌": "You look serene today. Embrace it.",
  "😐": "Neutral is a valid feeling! Check in with yourself later.",
  "😤": "Sounds like stress. Deep breath. Want to journal your thoughts?"
};
const MOODS = ["😊", "😕", "😢", "😌", "😐", "😤"];

export default function MoodReflectorAI() {
  const [mood, setMood] = useState("");
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 38,
      marginTop: 33,
      maxWidth: 420,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#F5A623", fontWeight: 600, margin: "0 0 10px" }}>Mood-Reflector AI Companion</h2>
      <div style={{ fontSize: 15, marginBottom: 10 }}>
        How are you feeling today? Select below:
      </div>
      <div style={{ display: "flex", gap: 13, margin: "12px 0 15px" }}>
        {MOODS.map(m => (
          <button
            key={m}
            className="btn"
            style={{
              background: mood === m ? "#F5A623" : "#fff",
              color: mood === m ? "#fff" : "#222",
              border: `1px solid #F5A623`,
              borderRadius: 7,
              fontSize: 23,
              cursor: "pointer",
              transition: ".14s",
              boxShadow: mood === m ? "0 2px 6px #f5a62314" : undefined
            }}
            onClick={() => setMood(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <div style={{ fontWeight: 500, fontSize: 17, minHeight: 32 }}>
        {mood ? RESPONSE_MAP[mood] : "Select a mood emoji above!"}
      </div>
    </div>
  );
}
