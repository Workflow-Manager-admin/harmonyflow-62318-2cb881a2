import React, { useState } from "react";

/**
 * AnonymousStoryCircles
 * Users can post short anonymous "story"/reflection, see messages in real time.
 * Demo: local-only message storage.
 */
// PUBLIC_INTERFACE
export default function AnonymousStoryCircles() {
  const [stories, setStories] = useState([
    { text: "I finally did my first 10k run! Even though I was slow, I finished! 🏃‍♂️", ts: "9 min ago" },
    { text: "Sometimes I just feel lost. But journaling helps me see progress. 💡", ts: "22 min ago" },
    { text: "Struggling to meditate daily—tips?", ts: "55 min ago" }
  ]);
  const [story, setStory] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function addStory(e) {
    e.preventDefault();
    if (!story.trim() || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      setStories(prev => [
        { text: story.trim(), ts: "now" },
        ...prev
      ]);
      setStory("");
      setSubmitting(false);
    }, 600);
  }

  return (
    <section
      className="feature-card"
      style={{
        marginTop: 33,
        maxWidth: 430,
        marginLeft: "auto",
        marginRight: "auto"
      }}
      aria-label="Anonymous Story Circles"
      tabIndex={0}
    >
      <h2 style={{ color: "var(--secondary)", fontWeight: 700, margin: "0 0 10px" }}>Anonymous Story Circles</h2>
      <div style={{ fontSize: 15, marginBottom: 10 }}>
        Share anonymously, read others' journeys, and feel less alone.
      </div>
      <form onSubmit={addStory} style={{ marginBottom: 12 }}>
        <textarea
          value={story}
          onChange={e => setStory(e.target.value)}
          placeholder="Your story (max 120 chars)..."
          maxLength={120}
          required
          style={{
            width: "100%",
            border: "1.5px solid var(--secondary)",
            borderRadius: "var(--radius-sm)",
            padding: 11,
            minHeight: 40,
            fontSize: 15,
            color: "var(--primary-dark)",
            background: "#f5f7fa",
            boxShadow: "none",
            transition: "border var(--tr-fast), box-shadow var(--tr-fast)",
            outline: "none"
          }}
        />
        <div style={{ display: "flex", marginTop: 7, gap: 8, alignItems: "center" }}>
          <button type="submit" className="btn" style={{
            background: "var(--secondary)",
            color: "#fff",
            borderRadius: "var(--radius-sm)",
            padding: "9px 19px",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: ".01em",
            boxShadow: "var(--shadow-xs)",
            border: "none",
            transition: "box-shadow var(--tr-fast), background var(--tr-fancy), color var(--tr-fast), transform var(--tr-fancy)"
          }}
          disabled={submitting || !story.trim()}
          >
            {submitting ? "Posting..." : "Share"}
          </button>
          <span style={{ color: "var(--text-muted)", marginLeft: 7, fontSize: 13 }}>
            Your story stays anonymous.
          </span>
        </div>
      </form>
      <ul style={{
        listStyle: "circle",
        paddingLeft: 19,
        maxHeight: 230,
        overflowY: "auto",
        marginTop: 7
      }}>
        {stories.map((s, i) => (
          <li key={i} style={{
            marginBottom: 7,
            background: "rgba(67,232,216,0.055)",
            borderRadius: "var(--radius-xs)",
            padding: "7px 12px",
            fontSize: 15,
            fontWeight: 500,
            color: "var(--text-main)",
            boxShadow: "0 1px 6px #50e3c20b"
          }}>
            <span>{s.text}</span>
            <span style={{ color: "var(--text-subtle)", marginLeft: 7, fontSize: 13 }}>({s.ts})</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
