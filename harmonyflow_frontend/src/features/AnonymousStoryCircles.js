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
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 36,
      marginTop: 33,
      maxWidth: 430,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#50E3C2", fontWeight: 600, margin: "0 0 12px" }}>Anonymous Story Circles</h2>
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
            border: "1px solid #50E3C2",
            borderRadius: 6,
            padding: 8,
            minHeight: 40
          }}
        />
        <div style={{ display: "flex", marginTop: 5, gap: 6 }}>
          <button type="submit" className="btn" style={{
            background: "#50E3C2", color: "#fff", borderRadius: 5,
            padding: "6px 16px"
          }} disabled={submitting || !story.trim()}>
            {submitting ? "Posting..." : "Share"}
          </button>
          <span style={{ color: "#768394", marginLeft: 7, fontSize: 13 }}>
            Your story stays anonymous.
          </span>
        </div>
      </form>
      <ul style={{ listStyle: "circle", paddingLeft: 20, maxHeight: 230, overflowY: "auto" }}>
        {stories.map((s, i) => (
          <li key={i} style={{ marginBottom: 7 }}>
            <span style={{ color: "#222" }}>{s.text}</span>
            <span style={{ color: "#768394", marginLeft: 7, fontSize: 13 }}>({s.ts})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
