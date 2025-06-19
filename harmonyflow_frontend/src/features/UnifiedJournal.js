import React, { useState } from "react";
import DashboardWidgetTile from "./DashboardWidgetTile";

// PUBLIC_INTERFACE
export default function UnifiedJournal() {
  const [entry, setEntry] = useState("");
  const [history, setHistory] = useState([
    { text: "Reflected on weekly wins. Felt proud of progress.", ts: "Yesterday" },
    { text: "Struggled with focus but meditated 12 min.", ts: "3 days ago" },
  ]);
  function addEntry(e) {
    e.preventDefault();
    if (!entry.trim()) return;
    setHistory(h => [{ text: entry.trim(), ts: "now" }, ...h]);
    setEntry("");
  }
  return (
    <DashboardWidgetTile
      icon="📓"
      title="Unified Journal + Reflection"
      accent="journal"
      desc={
        <>
          Jot growth moments, ideas, or reflect.<br />
          <span style={{ color: "var(--text-subtle)", fontSize: 13 }}>Daily summaries and suggestions soon!</span>
        </>
      }
      style={{ minHeight: 140, marginBottom: 14 }}
      aria-label="Unified Journal and Reflection"
    >
      <form onSubmit={addEntry} style={{ margin: "13px 0 8px 0" }}>
        <textarea
          aria-label="New journal entry"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="What's on your mind?"
          rows={2}
          style={{
            width: "100%",
            borderRadius: 6,
            border: "1.5px solid var(--border-light)",
            padding: 8,
            fontSize: 15,
            marginBottom: 5,
          }}
        />
        <button
          className="btn"
          style={{ background: "var(--secondary)", color: "#fff", fontWeight: 600, borderRadius: 7, minWidth: 99 }}
          type="submit"
          disabled={!entry.trim()}
        >
          Add Entry
        </button>
      </form>
      <div style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 500, marginBottom: 3 }}>
        Recent Entries:
      </div>
      <ul style={{ maxHeight: 78, overflowY: "auto", fontSize: 13.5, paddingLeft: 13 }}>
        {history.map((h, i) => (
          <li key={i} style={{ marginBottom: 6, color: "var(--text-main)" }}>
            {h.text} <span style={{ color: "var(--text-muted)", marginLeft: 6 }}>({h.ts})</span>
          </li>
        ))}
        {history.length === 0 && <li>No entries yet.</li>}
      </ul>
    </DashboardWidgetTile>
  );
}
