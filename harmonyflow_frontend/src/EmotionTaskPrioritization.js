import React, { useState } from "react";
import "./App.css";

/**
 * EmotionTaskPrioritization
 *
 * Interactive page for entering/viewing tasks, capturing current mood,
 * categorizing tasks (creative, analytical, social), and showing AI/mock
 * prioritization suggestions based on mood/emotion.
 *
 * Feature: Emotion-Aware Task Prioritization
 * Route: /emotion-task-prioritization
 */

// Mock AI suggestion logic
function prioritizeTasks(tasks, mood) {
  if (tasks.length === 0) return [];
  // Simple AI: boosts priority of task categories most suitable for mood
  const moodToCategory = {
    "😄 Happy": ["creative", "analytical", "social"],
    "🙂 Calm": ["analytical", "creative", "social"],
    "😐 Neutral": ["analytical", "social", "creative"],
    "😟 Stressed": ["social", "analytical", "creative"],
    "😭 Overwhelmed": ["analytical", "social", "creative"],
  };
  const preferredOrder = moodToCategory[mood] || ["creative", "analytical", "social"];
  // Sort: tasks of preferred categories up, then incomplete, then by input order
  return tasks
    .map((t, idx) => ({ ...t, idx }))
    .sort((a, b) => {
      const aCat = preferredOrder.indexOf(a.category);
      const bCat = preferredOrder.indexOf(b.category);
      if (aCat !== bCat) return aCat - bCat;
      if (!a.completed && b.completed) return -1;
      if (a.completed && !b.completed) return 1;
      return a.idx - b.idx;
    });
}

// PUBLIC_INTERFACE
function EmotionTaskPrioritization() {
  const [tasks, setTasks] = useState([
    { text: "Write creative blog post", category: "creative", completed: false },
    { text: "Analyze budget spreadsheet", category: "analytical", completed: false },
    { text: "Schedule lunch with team", category: "social", completed: false }
  ]);
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("creative");
  const [mood, setMood] = useState("🙂 Calm");

  // Handle Adding Task
  function handleAddTask(e) {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([
      ...tasks,
      { text: newTask.trim(), category, completed: false }
    ]);
    setNewTask("");
  }

  // Handle Toggle Task Complete
  function toggleTask(idx) {
    setTasks(tasks =>
      tasks.map((t, i) => i === idx ? { ...t, completed: !t.completed } : t)
    );
  }

  // Handle Mood Selection
  const moods = [
    "😄 Happy",
    "🙂 Calm",
    "😐 Neutral",
    "😟 Stressed",
    "😭 Overwhelmed"
  ];

  // Categories:
  const categories = [
    { key: "creative", label: "Creative 🎨", color: "#50E3C2" },
    { key: "analytical", label: "Analytical 🔬", color: "#4A90E2" },
    { key: "social", label: "Social 🗣️", color: "#F5A623" }
  ];

  // Prioritized task suggestion
  const prioritized = prioritizeTasks(tasks, mood);

  return (
    <div className="container" style={{ paddingTop: 95, paddingBottom: 60, minHeight: "67vh" }}>
      <div
        style={{
          background: "#f8fbff",
          borderRadius: 14,
          padding: "34px 28px 26px 28px",
          maxWidth: 630,
          margin: "0 auto 30px auto",
          boxShadow: "0 4px 23px #00409114"
        }}
      >
        <h1 className="title" style={{ fontSize: "2.18rem", margin: "0 0 12px 0" }}>
          🧠 Emotion-Aware Task Prioritization
        </h1>
        <div className="description" style={{ marginBottom: 18 }}>
          Enter your tasks, set your current mood, and get AI-powered suggestions for what to tackle <b>now</b>.
        </div>
        {/* Mood Selector */}
        <section style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, color: "#50E3C2", fontSize: "1.05rem", marginBottom: 6 }}>
            What's your current mood?
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {moods.map((m) => (
              <button
                key={m}
                className="btn"
                style={{
                  background: mood === m ? "var(--base-light)" : "#e7f6fd",
                  color: mood === m ? "#fff" : "#2473ab",
                  border: mood === m ? "2.2px solid #4A90E2" : "1.2px solid #bbe9fd",
                  fontWeight: mood === m ? 600 : 500,
                  minWidth: 52,
                  fontSize: "1.19em",
                  borderRadius: 8,
                  marginRight: 0
                }}
                onClick={() => setMood(m)}
                type="button"
              >
                {m}
              </button>
            ))}
          </div>
        </section>
        {/* Add Task */}
        <form onSubmit={handleAddTask} style={{ marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="New Task"
            required
            style={{
              flex: "1 1 180px",
              minWidth: 120,
              fontSize: "1em",
              borderRadius: 6,
              padding: "9px 10px",
              border: "1.3px solid #d6e7f8",
              marginBottom: 0
            }}
          />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{
            padding: "7px 8px",
            borderRadius: 6,
            border: "1.1px solid #d6e7f8",
            fontSize: "1.06em",
            color: "#49a",
            fontWeight: 500
          }}>
            {categories.map(c => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
          <button type="submit" className="btn" style={{ background: "var(--base-light)", color: "#fff", fontWeight: 600 }}>
            Add Task
          </button>
        </form>
        {/* Task List & Mock AI Suggestion */}
        <section>
          <div style={{ fontWeight: 600, color: "#4A90E2", fontSize: "1.08rem", marginBottom: 8 }}>
            Your Tasks & AI Prioritization
          </div>
          {prioritized.length === 0 ? (
            <div style={{ color: "#a8b9cb", fontStyle: "italic", marginBottom: 9 }}>
              No tasks yet. Add a task above to see prioritization!
            </div>
          ) : (
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {prioritized.map((t, idx) => {
                const catMeta = categories.find(c => c.key === t.category);
                return (
                  <li
                    key={t.text + t.idx + t.category}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 10,
                      background: idx === 0 ? "linear-gradient(90deg, #50E3C212 0%, #f8fbff 85%)" : "#f3f7fa",
                      borderLeft: `6px solid ${catMeta?.color || "#4A90E2"}`,
                      borderRadius: 9,
                      padding: "8px 11px",
                      fontWeight: t.completed ? 400 : 600,
                      color: t.completed ? "#999" : "#235",
                      opacity: t.completed ? 0.57 : idx === 0 ? 1 : 0.88,
                      boxShadow: idx === 0 ? "0 2px 8px #50E3C240" : undefined
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={!!t.completed}
                      onChange={() => toggleTask(t.idx)}
                      style={{ marginRight: 12 }}
                      aria-label="Complete"
                    />
                    <span style={{
                      textDecoration: t.completed ? 'line-through' : "none",
                      flex: "1 1 160px", fontSize: "1.07em"
                    }}>
                      {t.text}
                      <span style={{
                        fontSize: "0.91em",
                        padding: "2px 8px",
                        marginLeft: 9,
                        background: catMeta?.color || "#4A90E2",
                        color: "#fff",
                        borderRadius: 11
                      }}>{catMeta?.label}</span>
                    </span>
                    {idx === 0 && (
                      <span style={{ marginLeft: 10, color: "#50E3C2", fontWeight: 700 }}>← Do This Next!</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          <div
            style={{
              background: "#eafdfe",
              borderRadius: 8,
              marginTop: 19,
              padding: "11px 13px",
              color: "#4A90E2",
              fontWeight: 500,
              fontSize: "1em"
            }}
          >
            <span role="img" aria-label="ai">🤖</span>&nbsp;
            <b>
              AI Suggestion:
            </b>
            &nbsp;
            {(prioritized[0] ?
              <>
                {mood.startsWith("😟") || mood.startsWith("😭")
                  ? "Since you're feeling " + mood.split(" ")[1] + ", try a small/winnable " + categories.find(c => c.key === prioritized[0].category)?.label.split(" ")[0]?.toLowerCase() + " task first."
                  : "Your current mood is great for " + categories.find(c => c.key === prioritized[0].category)?.label.toLowerCase() + " – start with " + prioritized[0].text + "."}
              </>
              : "Add some tasks and select your mood to get personalized prioritization!")}
          </div>
        </section>
      </div>
      <div style={{ textAlign: "center", fontSize: "1em", color: "#92a9be", marginTop: 18 }}>
        * AI suggestions are for demo only. In future, recommendations will dynamically adapt to real emotions & cognitive state.
      </div>
    </div>
  );
}
export default EmotionTaskPrioritization;
