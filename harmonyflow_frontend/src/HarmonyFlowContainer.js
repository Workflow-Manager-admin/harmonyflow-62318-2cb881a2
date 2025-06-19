import React, { useState, useEffect } from "react";

// Theme Colors (inline for demonstration; override via App.css or :root in prod)
const COLORS = {
  primary: "#4A90E2",
  secondary: "#50E3C2",
  accent: "#F5A623",
  text: "#222",
  background: "#F7FAFC",
  card: "#fff",
  border: "#EEF2F7",
  subtleText: "#768394",
};

const defaultUserData = {
  goals: [],
  habits: [],
  moodLogs: [],
  journal: [],
  kpis: {
    focus: [],
    sleep: [],
    complete: [],
  },
};

// Simulated API/AI calls
function fakeApiFetch(key) {
  return Promise.resolve(defaultUserData[key] || []);
}
function fakeSave(key, value) {
  return Promise.resolve({ status: "ok", key, value });
}
function fakeAiCoach({ journal, kpis, mood }) {
  // Simulate AI advice
  return Promise.resolve(
    "Remember to balance work and rest. Celebrate small progress. Practice gratitude daily!"
  );
}

// --- Reusable UI Components ---
function Card({ title, color, children, style }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        padding: 20,
        marginBottom: 18,
        ...style,
      }}
    >
      <div style={{ fontWeight: 600, color: color || COLORS.primary, marginBottom: 8, fontSize: "1.18rem" }}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

// ----------------- Goal Mapping & Life Dashboard -------------------
// Goal Tree Visualization Stub – replace with actual libs for complex mapping
function GoalMap({ goals, habits, onAddGoal }) {
  return (
    <Card title="Goal Mapping & Life Dashboard" color={COLORS.primary}>
      <ol>
        {goals.map((g, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            <span style={{ fontWeight: 500 }}>{g}</span>
            <ul>
              {(habits.filter(h => h.goal === g) || []).map((h, j) => (
                <li key={j} style={{ color: COLORS.secondary }}>
                  Habit: {h.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <form
        onSubmit={e => {
          e.preventDefault();
          const val = e.target.goal.value.trim();
          if (val) onAddGoal(val);
          e.target.goal.value = "";
        }}
        style={{ marginTop: 10, display: "flex", gap: 8 }}
      >
        <input name="goal" style={{ flex: 1, border: `1px solid ${COLORS.primary}`, borderRadius: 6, padding: 6 }} placeholder="New goal..." />
        <button type="submit" style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px" }}>
          + Add
        </button>
      </form>
    </Card>
  );
}

// ----------------- AI Scheduler & Time Oracle ----------------------
// Simplified scheduler: tasks and basic calendar
function Scheduler({ events, onAddEvent }) {
  const [showAdd, setShowAdd] = useState(false);
  return (
    <Card title="AI Scheduler & Time Oracle" color={COLORS.secondary}>
      <ul>
        {events.map((e, i) => (
          <li key={i} style={{ marginBottom: 6, color: COLORS.text }}>
            <span>{e.time}</span>: <b>{e.text}</b>
          </li>
        ))}
      </ul>
      {showAdd ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            onAddEvent({ time: e.target.time.value, text: e.target.text.value });
            setShowAdd(false);
          }}
          style={{ display: "flex", gap: 6, marginTop: 10 }}
        >
          <input required name="time" type="datetime-local" style={{ flex: 1, border: `1px solid ${COLORS.secondary}`, borderRadius: 6, padding: 5 }} />
          <input required name="text" placeholder="Task/Appointment" style={{ flex: 2, border: `1px solid ${COLORS.secondary}`, borderRadius: 6, padding: 5 }} />
          <button type="submit" style={{ background: COLORS.secondary, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px" }}>
            Add
          </button>
        </form>
      ) : (
        <button onClick={() => setShowAdd(true)} style={{ marginTop: 10, background: COLORS.secondary, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px" }}>
          + New event
        </button>
      )}
      <div style={{ color: COLORS.accent, fontSize: 14, marginTop: 9 }}>
        {/* Simulated Oracle Message */}
        {events.length > 3 && "⚠️ Warning: Today seems overloaded, consider rescheduling."}
      </div>
    </Card>
  );
}

// ----------------- Mood & Cognitive State Tracker -------------------
function MoodTracker({ moodLogs, onLogMood }) {
  const [mood, setMood] = useState("");
  return (
    <Card title="Mood & Cognitive State Tracker" color={COLORS.accent}>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!mood) return;
          onLogMood({ mood, time: new Date().toLocaleString() });
          setMood("");
        }}
        style={{ display: "flex", gap: 8, alignItems: "center" }}
      >
        <select value={mood} onChange={e => setMood(e.target.value)} required style={{ borderRadius: 4, border: `1px solid ${COLORS.accent}`, padding: 4 }}>
          <option value="">Log your mood</option>
          <option value="😊">😊 Happy</option>
          <option value="😕">😕 Meh</option>
          <option value="😢">😢 Sad</option>
          <option value="😤">😤 Frustrated</option>
          <option value="😌">😌 Calm</option>
          <option value="😐">😐 Neutral</option>
        </select>
        <button type="submit" style={{ background: COLORS.accent, color: "#fff", borderRadius: 6, border: "none", padding: "5px 12px" }}>
          Log
        </button>
      </form>
      <div style={{ marginTop: 14, fontSize: 14 }}>
        Recent:{' '}
        {moodLogs
          .slice(-5)
          .reverse()
          .map((m, i) => (
            <span key={i} title={m.time} style={{ marginRight: 8 }}>
              {m.mood}
            </span>
          ))}
      </div>
    </Card>
  );
}

// ----------------- Unified Journal + Reflection ----------------------
function Journal({ journal, onAddEntry }) {
  const [entry, setEntry] = useState("");
  return (
    <Card title="Unified Journal + Reflection" color={COLORS.primary}>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (entry.trim()) {
            onAddEntry({ text: entry, date: new Date().toLocaleString() });
            setEntry("");
          }
        }}
        style={{ display: "flex", flexDirection: "column", gap: 6 }}
      >
        <textarea
          placeholder="How are you feeling? Any reflections today?"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          rows={2}
          style={{ width: "100%", border: `1px solid ${COLORS.primary}`, borderRadius: 6, padding: 8, marginBottom: 4 }}
        />
        <button type="submit" style={{ alignSelf: "flex-end", background: COLORS.primary, color: "#fff", borderRadius: 6, border: "none", padding: "5px 20px" }}>
          Add Entry
        </button>
      </form>
      <div style={{ marginTop: 10 }}>
        <ol>
          {journal.slice(-3).reverse().map((j, i) => (
            <li key={i} style={{ fontSize: 14, marginBottom: 2 }}>
              <span title={j.date}>{j.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}

// ----------------- AI Life Coach ------------------------------------
function AiLifeCoach({ journal, kpis, moodLogs }) {
  const [advice, setAdvice] = useState("");
  // PUBLIC_INTERFACE
  useEffect(() => {
    let isMounted = true;
    async function getAdvice() {
      setAdvice("Loading advice...");
      const a = await fakeAiCoach({ journal, kpis, mood: moodLogs });
      if (isMounted) setAdvice(a);
    }
    getAdvice();
    return () => {
      isMounted = false;
    };
  }, [journal, kpis, moodLogs]);
  return (
    <Card title="AI Life Coach" color={COLORS.secondary}>
      <div style={{ fontSize: 16, lineHeight: 1.5 }}>{advice}</div>
    </Card>
  );
}

// ----------------- KPI & Focus Metrics -----------------------------
function KpiSection({ kpis, onUpdateKpi }) {
  // Simplified KPI chart, real app: use chart lib e.g., chart.js/recharts
  return (
    <Card title="KPI & Focus Metrics" color={COLORS.primary}>
      <div style={{ display: "flex", gap: 22 }}>
        <div>
          <div style={{ fontWeight: 500 }}>Sleep</div>
          <input
            type="number"
            min={0}
            max={24}
            value={kpis.sleep[kpis.sleep.length - 1] || ""}
            placeholder="Hrs"
            onChange={e => onUpdateKpi("sleep", e.target.value)}
            style={{ width: 55, border: `1px solid ${COLORS.primary}`, borderRadius: 4, padding: 3 }}
          />{" "}
          hrs
        </div>
        <div>
          <div style={{ fontWeight: 500 }}>Focus</div>
          <input
            type="number"
            min={0}
            max={24}
            value={kpis.focus[kpis.focus.length - 1] || ""}
            placeholder="Hrs"
            onChange={e => onUpdateKpi("focus", e.target.value)}
            style={{ width: 55, border: `1px solid ${COLORS.primary}`, borderRadius: 4, padding: 3 }}
          />{" "}
          hrs
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 13, color: COLORS.subtleText }}>
        <b>Past 7 days sleep:</b>{" "}
        {kpis.sleep.slice(-7).map((v, i) => (
          <span key={i} style={{ marginRight: 3 }}>
            {v}h
          </span>
        ))}
      </div>
    </Card>
  );
}

// ----------------- Dashboard Layout (Main Container) ----------------
const dashboardGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 30,
  alignItems: "flex-start",
  marginTop: 28,
};

const sectionTitle = {
  color: COLORS.text,
  fontWeight: 700,
  fontSize: 28,
  margin: "32px 0 18px 0",
  letterSpacing: "-1px",
};

// PUBLIC_INTERFACE
export default function HarmonyFlowContainer() {
  // All module state, could use context/reducer in larger app
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([{ name: "Morning Exercise", goal: "Health" }]);
  const [events, setEvents] = useState([
    { time: "2024-07-01T08:00", text: "Morning run" },
    { time: "2024-07-01T10:00", text: "Deep work session" },
    { time: "2024-07-01T12:30", text: "Lunch break" },
  ]);
  const [moodLogs, setMoodLogs] = useState([]);
  const [journal, setJournal] = useState([]);
  const [kpis, setKpis] = useState({ sleep: [7], focus: [6], complete: [] });

  // Data fetch on mount (simulate API)
  useEffect(() => {
    fakeApiFetch("goals").then(setGoals);
    fakeApiFetch("habits").then(setHabits);
    fakeApiFetch("moodLogs").then(setMoodLogs);
    fakeApiFetch("journal").then(setJournal);
    fakeApiFetch("kpis").then(setKpis);
  }, []);

  // Data storage simulation
  function handleAddGoal(goal) {
    setGoals(curr => {
      const updated = [...curr, goal];
      fakeSave("goals", updated);
      return updated;
    });
  }
  function handleAddEvent(event) {
    setEvents(curr => [...curr, event]);
    fakeSave("events", [...events, event]);
  }
  function handleLogMood(log) {
    setMoodLogs(curr => [ ...curr, log ]);
    fakeSave("moodLogs", [...moodLogs, log]);
  }
  function handleAddEntry(entry) {
    setJournal(curr => [ ...curr, entry ]);
    fakeSave("journal", [...journal, entry]);
  }
  function handleUpdateKpi(type, value) {
    setKpis(k =>
      ({
        ...k,
        [type]: [ ...k[type].slice(-6), parseInt(value, 10) ]
      })
    );
    fakeSave("kpis", { ...kpis, [type]: [...kpis[type].slice(-6), parseInt(value, 10)] });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.background,
        color: COLORS.text,
      }}
    >
      <nav
        style={{
          background: COLORS.primary,
          padding: "16px 0",
          boxShadow: "0 2px 12px 0 rgba(74,144,226,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontWeight: 800, fontSize: 21, color: "#fff" }}>
            <span style={{ color: COLORS.accent, marginRight: 7, fontSize: 23 }}>🧭</span>
            HarmonyFlow
          </div>
          <span style={{ color: "#fff", fontSize: 14, opacity: 0.82 }}>AI-powered personal dashboard</span>
        </div>
      </nav>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "38px 32px 24px 32px" }}>
        <div style={sectionTitle}>My Life Dashboard</div>
        <div style={dashboardGrid}>
          <div>
            <GoalMap goals={goals} habits={habits} onAddGoal={handleAddGoal} />
            <Scheduler events={events} onAddEvent={handleAddEvent} />
            <KpiSection kpis={kpis} onUpdateKpi={handleUpdateKpi} />
          </div>
          <div>
            <MoodTracker moodLogs={moodLogs} onLogMood={handleLogMood} />
            <Journal journal={journal} onAddEntry={handleAddEntry} />
            <AiLifeCoach journal={journal} kpis={kpis} moodLogs={moodLogs} />
          </div>
        </div>
        <footer style={{ marginTop: 48, fontSize: 14, color: COLORS.subtleText, textAlign: "center" }}>
          <span>
            Designed for modern, purpose-driven productivity &middot; HarmonyFlow &copy; {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </div>
  );
}
