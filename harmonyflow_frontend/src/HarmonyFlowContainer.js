import React, { useState } from "react";
import "./App.css";
import "./HarmonyFlowContainer.css";

/**
 * HarmonyFlowContainer - Main HarmonyFlow dashboard. Composes all major modules/features as sections.
 * Demo/mock data is used for functional logic, state, and interactions.
 */

// --- GOAL MAPPING & LIFE DASHBOARD ---
function GoalDashboard() {
  // Sample goals and connections
  const [goals] = useState([
    {
      id: 1,
      title: "Run a Marathon",
      habits: ["Daily Run", "Meal Prep"],
      tasks: ["Register event", "Buy shoes"],
      emotion: "Motivated",
      progress: 0.67,
    },
    {
      id: 2,
      title: "Read 12 Books",
      habits: ["Read 20min"],
      tasks: ["Choose books", "Join club"],
      emotion: "Curious",
      progress: 0.33,
    },
  ]);

  return (
    <div>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {goals.map((g) => (
          <div
            key={g.id}
            style={{
              background: "#f3f8fe",
              borderRadius: 14,
              padding: "22px 21px",
              marginRight: 12,
              minWidth: 230,
              boxShadow: "0 2px 7px #4a90e210",
              flex: "1 1 260px",
              marginBottom: 12,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: "1.15rem", color: "#4A90E2" }}>
              {g.title}
            </div>
            <div style={{ margin: "10px 0 0 0", fontSize: "0.98rem", color: "#6a7077" }}>
              <b>Habits:</b> {g.habits.join(", ")}
              <br />
              <b>Tasks:</b> {g.tasks.join(", ")}
            </div>
            <div style={{ margin: "6px 0 9px 0", color: "#F5A623", fontSize: "1.08em" }}>
              {g.emotion}
            </div>
            <div style={{ height: 6, background: "#e0e7ee", borderRadius: 4, marginBottom: 5 }}>
              <div
                style={{
                  width: `${Math.floor(g.progress * 100)}%`,
                  background: "linear-gradient(90deg, #4A90E2, #50E3C2)",
                  height: "100%",
                  borderRadius: 4,
                }}
              />
            </div>
            <div style={{ fontSize: "0.91em", color: "#4A90E2" }}>
              {Math.floor(g.progress * 100)}% complete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- AI SCHEDULER & TIME ORACLE ---
function Scheduler() {
  // Sample scheduled events and AI message
  const [schedule] = useState([
    { time: "08:00", event: "Morning Run", type: "habit", status: "upcoming" },
    { time: "10:00", event: "Team Meeting", type: "work", status: "upcoming" },
    { time: "12:30", event: "Lunch", type: "personal", status: "upcoming" },
    { time: "17:30", event: "Read 20min", type: "habit", status: "suggested" },
  ]);
  const [oraclePrediction] = useState({
    message:
      "⚠️ You may approach burnout by Friday; consider rescheduling 'Deep Work Block' to next week and add a hobby hour.",
  });

  return (
    <div>
      <div style={{ fontWeight: 500, color: "#4A90E2", marginBottom: 10 }}>Today's Schedule</div>
      <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
        {schedule.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#f0fcf8",
              border: `2.4px solid ${item.type === "habit" ? "#50E3C2" : "#E0E0E0"}`,
              borderRadius: 9,
              padding: "12px 18px",
              color: "#233",
              minWidth: 150,
              marginBottom: 7,
              position: "relative",
              opacity: item.status === "suggested" ? 0.77 : 1,
            }}
          >
            <span style={{ fontWeight: 600 }}>{item.time}</span> &nbsp; <span>{item.event}</span>
            {item.status === "suggested" && (
              <span
                style={{
                  fontSize: "0.82em",
                  color: "#F5A623",
                  position: "absolute",
                  top: 4,
                  right: 11,
                }}
              >
                AI
              </span>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          background: "#F5A62318",
          padding: "13px 14px",
          borderRadius: 7,
          color: "#F5A623",
          fontWeight: 500,
        }}
      >
        <span>Time Oracle:</span> {oraclePrediction.message}
      </div>
    </div>
  );
}

// --- MOOD & COGNITIVE STATE TRACKER ---
function MoodTracker() {
  // Simple mood log for the week
  const moods = [
    { day: "Mon", mood: "🙂", score: 3 },
    { day: "Tue", mood: "😐", score: 2 },
    { day: "Wed", mood: "😊", score: 4 },
    { day: "Thu", mood: "😟", score: 1 },
    { day: "Fri", mood: "😄", score: 5 },
    { day: "Sat", mood: "🙂", score: 3 },
    { day: "Sun", mood: "😌", score: 4 },
  ];

  // For interaction: allow user to log today's mood (mock logic)
  const [todayMood, setTodayMood] = useState("");
  const [logStatus, setLogStatus] = useState(null);

  // PUBLIC_INTERFACE
  function logMood(mood) {
    setTodayMood(mood);
    setLogStatus("Saved! (mock)");
    setTimeout(() => setLogStatus(null), 1300);
  }

  // Chart (bar) with moods
  return (
    <div>
      <div style={{ display: "flex", gap: "11px", alignItems: "flex-end", marginBottom: 15 }}>
        {moods.map((m, idx) => (
          <div key={m.day} style={{ textAlign: "center", minWidth: 30 }}>
            <div
              style={{
                height: m.score * 15 + 15,
                background: "linear-gradient(180deg,#50E3C2,#4A90E2)",
                borderRadius: 6,
                margin: "0 0 4px 0",
                width: 16 + m.score * 2,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              title={m.mood}
            ></div>
            <div style={{ fontSize: "1.16em" }}>{m.mood}</div>
            <div style={{ fontSize: "0.87em", color: "#888" }}>{m.day}</div>
          </div>
        ))}
      </div>
      <div>
        <span style={{ fontWeight: 500, color: "#50E3C2" }}>Log your mood for today: </span>
        {["😄", "🙂", "😐", "😟", "😭"].map((m) => (
          <button
            key={m}
            className="btn"
            style={{
              background: todayMood === m ? "#4A90E2" : "#e7f6fd",
              color: todayMood === m ? "white" : "#4A90E2",
              border: "none",
              margin: "0 2px",
              fontSize: "1.29em",
              minWidth: 36,
              cursor: "pointer",
              outline: "none",
            }}
            onClick={() => logMood(m)}
          >
            {m}
          </button>
        ))}
        {logStatus && <span style={{ color: "#4A90E2", marginLeft: 13 }}>{logStatus}</span>}
      </div>
    </div>
  );
}

// --- JOURNAL + REFLECTION ---
function Journal() {
  // Demo journal entries (last 3), journal entry input
  const [entries, setEntries] = useState([
    {
      date: "2024-06-01",
      text: "Started the day with a refreshing run. Felt energetic!",
      summary: "High energy. Good start.",
      ai: "Keep up the morning exercise routine.",
    },
    {
      date: "2024-05-31",
      text: "Struggled to focus after lunch. Got distracted by social media.",
      summary: "Afternoon distraction affected productivity.",
      ai: "Try a post-lunch walk to reset focus.",
    },
    {
      date: "2024-05-30",
      text: "Read for 30 minutes before bed. Slept well.",
      summary: "Evening reading improved sleep.",
      ai: "Continue bedtime reading for better rest.",
    },
  ]);
  const [draft, setDraft] = useState("");

  // PUBLIC_INTERFACE
  function handleSave() {
    if (draft.trim()) {
      setEntries([
        {
          date: new Date().toISOString().split("T")[0],
          text: draft,
          summary: "Summary (AI): " + draft.slice(0, 18) + "...",
          ai: "AI: Great to note your reflections.",
        },
        ...entries.slice(0, 2),
      ]);
      setDraft("");
    }
  }

  return (
    <div>
      <div>
        <textarea
          value={draft}
          placeholder="Today's thoughts, wins, challenges..."
          onChange={(e) => setDraft(e.target.value)}
          style={{
            width: "98%",
            minHeight: 54,
            resize: "vertical",
            borderRadius: 9,
            border: "1.3px solid #e7e7e7",
            marginBottom: 7,
            padding: 7,
            color: "#333",
          }}
        />
        <button className="btn" onClick={handleSave} style={{ marginLeft: 7 }}>
          Save
        </button>
      </div>
      <div style={{ marginTop: 11 }}>
        <div style={{ fontWeight: 500, color: "#4A90E2" }}>Recent Entries</div>
        {entries.map((e, idx) => (
          <div
            key={idx}
            style={{
              marginBottom: 10,
              padding: "7px 12px",
              background: "#f3f4fa",
              borderRadius: 8,
            }}
          >
            <div style={{ fontSize: "0.98em", color: "#A1A1A1" }}>{e.date}</div>
            <div>{e.text}</div>
            <div style={{ fontSize: "0.91em", color: "#4A90E2", marginTop: 2 }}>
              <b>Summary:</b> {e.summary}
            </div>
            <div style={{ fontSize: "0.91em", color: "#50E3C2", marginTop: 1 }}>
              <b>AI:</b> {e.ai}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- AI LIFE COACH ---
function Coach() {
  // Demo AI feedback (would be via API in the future)
  const feedbacks = [
    {
      type: "progress",
      icon: "📈",
      text:
        "Progress: Your goal momentum is strong this week—3 habits logged daily. Keep up the consistent routine!",
    },
    {
      type: "advice",
      icon: "💡",
      text: "Advice: Remember to incorporate wind-down activities. Schedule 30min before bed for 'no screens.'",
    },
    {
      type: "care",
      icon: "🧘‍♂️",
      text: "Self-care: Try a 15-minute mindfulness session tonight. Mindfulness boosts mood and sleep.",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
        {feedbacks.map((f, idx) => (
          <div
            key={idx}
            style={{
              flex: "1 1 250px",
              background: "#f3fffa",
              borderLeft: `5.5px solid ${
                f.type === "progress" ? "#4A90E2" : f.type === "advice" ? "#F5A623" : "#50E3C2"
              }`,
              borderRadius: 9,
              padding: "16px 17px",
              fontSize: "1.02em",
              marginBottom: 7,
              boxShadow: "0 2px 11px #4A90E210",
            }}
          >
            <span style={{ fontSize: "1.32em", marginRight: 6 }}>{f.icon}</span>
            <span>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- KPI & FOCUS METRICS ---
function KPIMetrics() {
  // Demo data (from sensors/APIs in future)
  const [metrics] = useState([
    {
      label: "Sleep",
      value: 7.1,
      unit: "hrs",
      streak: 4,
      icon: "🛌",
      color: "#50E3C2",
    },
    {
      label: "Focus",
      value: 5.3,
      unit: "hrs",
      streak: 3,
      icon: "🎯",
      color: "#4A90E2",
    },
    {
      label: "Habits",
      value: 4,
      unit: "/5",
      streak: 5,
      icon: "🔁",
      color: "#F5A623",
    },
    {
      label: "Goals",
      value: 2,
      unit: "/6",
      streak: 2,
      icon: "🏁",
      color: "#4A90E2",
    },
  ]);

  return (
    <div>
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
        {metrics.map((m, idx) => (
          <div
            key={idx}
            style={{
              flex: "1 1 120px",
              minWidth: 120,
              background: "#f2f8fd",
              borderRadius: 13,
              padding: "14px 12px",
              marginBottom: 7,
              borderTop: `4.5px solid ${m.color}`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "1.8em" }}>{m.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "1.11em", color: m.color }}>
              {m.label}
            </div>
            <div style={{ fontSize: "1.3em", color: "#333" }}>
              {m.value}
              <span style={{ fontSize: "0.7em", marginLeft: 2 }}>{m.unit}</span>
            </div>
            <div style={{ color: "#A3A3A3", fontSize: "0.93em" }}>
              <span role="img" aria-label="fire">
                🔥
              </span>{" "}
              Streak: {m.streak}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function HarmonyFlowContainer() {
  return (
    <div className="hf-container">
      <header className="hf-header">
        <div className="hf-logo" style={{ fontWeight: 700, fontSize: "1.7rem" }}>
          <span style={{ color: "#4A90E2" }}>●</span> HarmonyFlow
        </div>
        <nav className="hf-nav">{/* Reserved for navigation links in the future */}</nav>
      </header>

      <main className="hf-main">
        <section className="hf-section hf-section-goal">
          <h2>🎯 Goal Mapping & Life Dashboard</h2>
          <div className="hf-section-description">
            Visualize your goals, connect habits, tasks, and emotions.
          </div>
          <GoalDashboard />
        </section>

        <section className="hf-section hf-section-scheduler">
          <h2>🗓️ AI Scheduler & Time Oracle</h2>
          <div className="hf-section-description">
            Calendar syncing, intelligent scheduling, predictive analytics.
          </div>
          <Scheduler />
        </section>

        <section className="hf-section hf-section-mood">
          <h2>😊 Mood & Cognitive State Tracker</h2>
          <div className="hf-section-description">
            Log moods, track emotional trends, adapt routines.
          </div>
          <MoodTracker />
        </section>

        <section className="hf-section hf-section-journal">
          <h2>📔 Unified Journal & Reflection</h2>
          <div className="hf-section-description">
            Journaling, thoughts, summaries, growth suggestions.
          </div>
          <Journal />
        </section>

        <section className="hf-section hf-section-coach">
          <h2>🧭 AI Life Coach</h2>
          <div className="hf-section-description">
            Personalized advice, progress, self-care tips.
          </div>
          <Coach />
        </section>

        <section className="hf-section hf-section-metrics">
          <h2>📊 KPI & Focus Metrics</h2>
          <div className="hf-section-description">
            Sleep, focus hours, habits, goal completion.
          </div>
          <KPIMetrics />
        </section>
      </main>

      <footer className="hf-footer">
        <span>
          HarmonyFlow &copy; {new Date().getFullYear()} | AI Productivity & Wellbeing
        </span>
      </footer>
    </div>
  );
}

export default HarmonyFlowContainer;
