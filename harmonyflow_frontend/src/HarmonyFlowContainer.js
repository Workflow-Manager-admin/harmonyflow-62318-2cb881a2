// Main HarmonyFlow container - now extended with 10 new features:
// Each feature module is separately documented and modular for future extensibility.

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

/**
 * COMPONENT: SurpriseChallengeMode ("Spin the Compass")
 * Provides a randomized wellness or creativity challenge.
 * Extensible: hook up to API or challenge logic later.
 */
function SurpriseChallengeMode({ onSpin }) {
  const [challenge, setChallenge] = useState(null);
  // Example challenge pool
  const POOL = [
    "Try a 5-min mindfulness exercise 🌱",
    "Compliment a stranger today 🤝",
    "Sketch something that reflects your mood 🎨",
    "Organize your desk or digital space 🧹",
    "Write a 3-sentence story 📝",
    "Step outside and notice 3 new things 🚶‍♂️",
    "Message someone you haven't talked to lately 📱"
  ];
  function handleSpin() {
    const idx = Math.floor(Math.random() * POOL.length);
    setChallenge(POOL[idx]);
    if (onSpin) onSpin(POOL[idx]);
  }

  // PUBLIC_INTERFACE
  return (
    <Card title="Spin the Compass" color={COLORS.accent} style={{ minHeight: 110 }}>
      <div style={{ fontSize: 16, marginBottom: 9 }}>
        {challenge
          ? <>🎲 <b>Surprise Challenge:</b> <br />{challenge}</>
          : <>Feeling lucky? Spice up your day with a challenge!</>
        }
      </div>
      <button className="btn" style={{
        background: COLORS.accent,
        marginTop: 6, color: "#fff", borderRadius: 5
      }} onClick={handleSpin}>
        Spin the Compass
      </button>
    </Card>
  );
}

/**
 * COMPONENT: LocalTribeMatching
 * Connects users with others in their vicinity with overlapping goals/habits.
 * Future: Replace static list with integration (e.g. WebSocket or API, proximity services).
 */
function LocalTribeMatching({}) {
  // Demo: hardcoded user list
  const sampleTribe = [
    { name: "Maya", goal: "Running", nearby: true },
    { name: "Leo", goal: "Journaling", nearby: false },
    { name: "Priya", goal: "Healthy Cooking", nearby: true },
  ];
  // PUBLIC_INTERFACE
  return (
    <Card title="Local Tribe Matching" color={COLORS.secondary}>
      <div style={{ fontSize: 15, marginBottom: 9 }}>
        Find people nearby who share your goals—build good habits together.
      </div>
      <ul>
        {sampleTribe.map((u, idx) => (
          <li key={idx} style={{ marginBottom: 5, color: u.nearby ? COLORS.primary : COLORS.subtleText }}>
            <span style={{ fontWeight: 500 }}>{u.name}</span> ({u.goal}) {u.nearby && "• Nearby"}
          </li>
        ))}
      </ul>
      <div style={{ color: COLORS.subtleText, fontSize: 13 }}>* Demo: Replace with real location matching.</div>
    </Card>
  );
}

/**
 * COMPONENT: GlobalImpactMeter
 * Shows progress metrics aggregated across users. For demo, uses random progress.
 * Extend by connecting to backend/global stats API.
 */
function GlobalImpactMeter() {
  const [globalStats, setGlobalStats] = useState({
    challengesComplete: 3829,
    hoursMeditated: 912,
    businessPartners: 32,
    ecoActions: 502,
    progress: Math.floor(Math.random() * 100)
  });

  // PUBLIC_INTERFACE
  return (
    <Card title="Global Impact Meter" color={COLORS.primary} style={{ minHeight: 110 }}>
      <div style={{ marginBottom: 6 }}>
        <b>🌎 Collective progress</b>
      </div>
      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 8 }}>
        <div><b>{globalStats.challengesComplete}</b> Challenges</div>
        <div><b>{globalStats.hoursMeditated}</b> Hours Meditated</div>
        <div><b>{globalStats.ecoActions}</b> Eco Actions</div>
        <div><b>{globalStats.businessPartners}</b> Biz Partners</div>
      </div>
      <div style={{ width: "100%", background: COLORS.border, borderRadius: 8, height: 10, marginBottom: 4 }}>
        <div style={{
          width: globalStats.progress + "%",
          background: COLORS.secondary,
          height: "100%",
          borderRadius: 8,
          transition: "width 400ms"
        }} />
      </div>
      <span style={{ color: COLORS.subtleText, fontSize: 13 }}>{globalStats.progress}% to next global milestone!</span>
    </Card>
  );
}

/**
 * COMPONENT: SeasonalTournaments
 * Shows leaderboard and seasonal challenge structure.
 * Can be extended with real-time scores and tournaments integration.
 */
function SeasonalTournaments() {
  // Demo leaderboard scores
  const leaderboard = [
    { name: "You", points: 120 },
    { name: "Ava", points: 140 },
    { name: "Jamal", points: 118 },
    { name: "Sasha", points: 155 }
  ];
  // PUBLIC_INTERFACE
  return (
    <Card title="Seasonal Tournaments" color={COLORS.accent}>
      <div style={{ fontSize: 15, marginBottom: 7 }}>
        Compete in seasonal quests—climb the leaderboard with positive actions!
      </div>
      <ol>
        {leaderboard.sort((a,b) => b.points - a.points).map((u,i) => (
          <li key={i} style={{ color: i===0 ? COLORS.primary : COLORS.text }}>
            <b>{u.name}</b>: {u.points} pts
          </li>
        ))}
      </ol>
      <div style={{ color: COLORS.subtleText, fontSize: 13 }}>Real-time and global scores coming soon.</div>
    </Card>
  );
}

/**
 * COMPONENT: AnonymousStoryCircles
 * Lets users share and view anonymous inspirational/struggle stories.
 * Add backend or moderation for extensibility.
 */
function AnonymousStoryCircles() {
  const demoStories = [
    { text: "I finally did my first 10k run! Even though I was slow, I finished! 🏃‍♂️", ts: "9 min ago" },
    { text: "Sometimes I just feel lost. But journaling helps me see progress. 💡", ts: "22 min ago" },
    { text: "Struggling to meditate daily—tips?", ts: "55 min ago" },
  ];
  // PUBLIC_INTERFACE
  return (
    <Card title="Anonymous Story Circles" color={COLORS.secondary}>
      <div style={{ fontSize: 15, marginBottom: 9 }}>
        Share anonymously, read others' journeys, feel less alone.
      </div>
      <ul style={{ listStyle: "circle", paddingLeft: 20 }}>
        {demoStories.map((s, i) => (
          <li key={i} style={{ marginBottom: 7 }}>
            <span style={{ color: COLORS.text }}>{s.text}</span>
            <span style={{ color: COLORS.subtleText, marginLeft: 7, fontSize: 13 }}>({s.ts})</span>
          </li>
        ))}
      </ul>
      <div style={{ color: COLORS.subtleText, fontSize: 13 }}>Your story stays anonymous. Next: submit form & moderation.</div>
    </Card>
  );
}

/**
 * COMPONENT: CreativityCapsules
 * Pushes creative prompts (art/music/writing). Demo: Random capsule prompt.
 * Next: timed capsules, save responses, share in community.
 */
function CreativityCapsules() {
  const capsules = [
    "Draw your day as a landscape 🌄",
    "Write a 3-line poem about hope 🌱",
    "Record 10s of sounds around you 🎤",
    "Invent a new recipe using only 5 ingredients 🍲"
  ];
  const [prompt, setPrompt] = useState(null);
  function openCapsule() {
    setPrompt(capsules[Math.floor(Math.random() * capsules.length)]);
  }
  // PUBLIC_INTERFACE
  return (
    <Card title="Creativity Capsules" color={COLORS.primary}>
      <div style={{ fontSize: 15, marginBottom: 8 }}>
        Time-unlock a creative challenge—draw, write, make something new!
      </div>
      <div style={{ margin: "12px 0", fontWeight: 500 }}>{prompt ? prompt : "Ready for a creative mission?"}</div>
      <button className="btn" style={{
        background: COLORS.primary, color: "#fff", borderRadius: 5
      }} onClick={openCapsule}>
        Open Capsule
      </button>
    </Card>
  );
}

/**
 * COMPONENT: MoodReflectorAI
 * An AI companion that reflects user's mood and gives feedback.
 * Extensible: connect to chat/AI API for realtime responses.
 */
function MoodReflectorAI({ userMood }) {
  // Simulated mood reflection logic
  const response =
    userMood && userMood.mood
      ? ({
        "😊": "I see you're full of joy! 🌞 Keep shining.",
        "😕": "It's okay to feel uncertain. A short walk might help.",
        "😢": "You seem down. Remember: clouds pass. Reach out if needed.",
        "😌": "You look serene today. Embrace it.",
        "😐": "Neutral is a valid feeling! Check in with yourself later.",
        "😤": "Sounds like stress. Deep breath. Want to journal your thoughts?"
      }[userMood.mood]) || "How are you feeling today?"
      : "How are you feeling today?";
  // PUBLIC_INTERFACE
  return (
    <Card title="Mood-Reflector AI Companion" color={COLORS.accent}>
      <div style={{ fontSize: 15, marginBottom: 3 }}>
        {response}
      </div>
    </Card>
  );
}

/**
 * COMPONENT: EmergencyDetoxMode
 * Triggers a minimalist "detox" - disables social feeds, recommends self-care.
 * Extensible: Add notification integration, darker theme, or strict modes.
 */
function EmergencyDetoxMode() {
  const [active, setActive] = useState(false);
  // PUBLIC_INTERFACE
  return (
    <Card title="Emergency Detox Mode" color={COLORS.primary}>
      <div style={{ fontSize: 15, marginBottom: 8 }}>
        {active
          ? "Detox Mode is ON. Digital distractions muted. Focus & breathe."
          : "Need to unplug for a moment? Activate Emergency Detox for focus."}
      </div>
      <button className="btn" style={{
        background: COLORS.primary,
        color: "#fff", borderRadius: 5
      }} onClick={() => setActive(a => !a)}>
        {active ? "End Detox" : "Start Emergency Detox"}
      </button>
      {active && <div style={{ color: COLORS.accent, fontWeight: 500, marginTop: 3, fontSize: 13 }}>🔕 Notifications disabled.</div>}
    </Card>
  );
}

/**
 * COMPONENT: LocalBusinessPartnerships
 * Highlights nearby business offers/integration for positive user actions.
 * Future: Geo-location integration & dynamic offers.
 */
function LocalBusinessPartnerships() {
  const partners = [
    { name: "Harmony Yoga Studio", offer: "20% off a wellness class" },
    { name: "GreenBites Cafe", offer: "Free herbal tea with healthy meal" }
  ];
  // PUBLIC_INTERFACE
  return (
    <Card title="Local Business Partnerships" color={COLORS.secondary}>
      <div style={{ marginBottom: 10, fontSize: 15 }}>Unlock offers for positive habits in your area!</div>
      <ul>
        {partners.map((b, i) => (
          <li key={i} style={{
            marginBottom: 7, color: COLORS.primary
          }}>
            <b>{b.name}</b>: <span style={{ color: COLORS.text }}>{b.offer}</span>
          </li>
        ))}
      </ul>
      <div style={{ color: COLORS.subtleText, fontSize: 13 }}>
        Geo-matched offers coming soon.
      </div>
    </Card>
  );
}

/**
 * COMPONENT: ChallengeCapsules
 * Provides time-release "quests" that unlock after set intervals.
 * Extensible: connect to server for dynamic quests, progress sync.
 */
function ChallengeCapsules() {
  const capsules = [
    { title: "Hydration Quest", unlockIn: "00:00:10", desc: "Drink a glass of water" },
    { title: "Gratitude Quest", unlockIn: "00:03:00", desc: "List 3 things you're grateful for" }
  ];
  const [unlocked, setUnlocked] = useState(false);
  // Simulate capsule unlock after timeout for demo
  useEffect(() => {
    if (!unlocked) {
      const t = setTimeout(() => setUnlocked(true), 8000);
      return () => clearTimeout(t);
    }
  }, [unlocked]);
  // PUBLIC_INTERFACE
  return (
    <Card title="Challenge Capsules" color={COLORS.accent}>
      <div style={{ fontSize: 15, marginBottom: 7 }}>Unlock surprise time-based quests throughout the day.</div>
      {!unlocked ? (
        <div>
          <div style={{ color: COLORS.primary, marginBottom: 5 }}>Next Capsule: unlocks soon…</div>
          <button className="btn" disabled style={{ background: COLORS.border, color: COLORS.primary }}>Locked</button>
        </div>
      ) : (
        <div>
          <div style={{ fontWeight: 500 }}>{capsules[0].title}</div>
          <div style={{ marginBottom: 7 }}>{capsules[0].desc}</div>
          <button className="btn" style={{ background: COLORS.accent, color: "#fff" }}>Mark Complete</button>
        </div>
      )}
    </Card>
  );
}


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

/**
 * Dashboard tab definitions for navigation 
 * and layout arrangements. All 10 new feature modules are linked.
 */
const FEATURE_TABS = [
  {
    key: "classic",
    label: "Classic Dashboard"
  },
  {
    key: "spin",
    label: "Spin the Compass"
  },
  {
    key: "tribe",
    label: "Local Tribes"
  },
  {
    key: "impact",
    label: "Global Impact"
  },
  {
    key: "tournament",
    label: "Tournaments"
  },
  {
    key: "stories",
    label: "Story Circles"
  },
  {
    key: "creativity",
    label: "Creativity Capsules"
  },
  {
    key: "reflector",
    label: "Mood-Reflector AI"
  },
  {
    key: "detox",
    label: "Detox Mode"
  },
  {
    key: "biz",
    label: "Biz Partners"
  },
  {
    key: "challengeCapsules",
    label: "Challenge Capsules"
  }
];

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
  // Feature tab state (for navigation)
  const [activeTab, setActiveTab] = useState("classic");

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

  // Build navigation tabs for feature discoverability
  function renderTabs() {
    return (
      <div style={{
        display: "flex",
        gap: 10,
        margin: "0 0 18px 0",
        overflowX: "auto",
        flexWrap: "wrap",
        justifyContent: "center"
      }}>
        {FEATURE_TABS.map(tab =>
          <button
            key={tab.key}
            style={{
              background: activeTab === tab.key ? COLORS.primary : COLORS.border,
              color: activeTab === tab.key ? "#fff" : COLORS.text,
              border: "none",
              borderRadius: 7,
              padding: "7px 18px",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: activeTab === tab.key ? "0 2px 8px #4a90e21d" : undefined,
              transition: "background 0.16s"
            }}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        )}
      </div>
    );
  }

  // Main layout: Use a grid for "classic" mode, single-column for feature modules
  function renderDashboardContent() {
    if (activeTab === "classic") {
      return (
        <div style={dashboardGrid}>
          <div>
            <GoalMap goals={goals} habits={habits} onAddGoal={handleAddGoal} />
            <Scheduler events={events} onAddEvent={handleAddEvent} />
            <KpiSection kpis={kpis} onUpdateKpi={handleUpdateKpi} />
            <SurpriseChallengeMode />
          </div>
          <div>
            <MoodTracker moodLogs={moodLogs} onLogMood={handleLogMood} />
            <Journal journal={journal} onAddEntry={handleAddEntry} />
            <AiLifeCoach journal={journal} kpis={kpis} moodLogs={moodLogs} />
            <MoodReflectorAI userMood={moodLogs.slice(-1)[0]}/>
          </div>
        </div>
      );
    }

    // Switch for each feature tab, show single feature in large card
    return (
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        {activeTab === "spin" && <SurpriseChallengeMode />}
        {activeTab === "tribe" && <LocalTribeMatching />}
        {activeTab === "impact" && <GlobalImpactMeter />}
        {activeTab === "tournament" && <SeasonalTournaments />}
        {activeTab === "stories" && <AnonymousStoryCircles />}
        {activeTab === "creativity" && <CreativityCapsules />}
        {activeTab === "reflector" && <MoodReflectorAI userMood={moodLogs.slice(-1)[0]}/>}
        {activeTab === "detox" && <EmergencyDetoxMode />}
        {activeTab === "biz" && <LocalBusinessPartnerships />}
        {activeTab === "challengeCapsules" && <ChallengeCapsules />}
      </div>
    );
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
        {renderTabs()}
        {renderDashboardContent()}
        {/* Special grid for business partners, global meter, story circle, tournaments, challenge capsules etc in Classic mode */}
        {activeTab === "classic" && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 30,
            marginTop: 25
          }}>
            <LocalTribeMatching />
            <GlobalImpactMeter />
            <SeasonalTournaments />
            <AnonymousStoryCircles />
            <CreativityCapsules />
            <EmergencyDetoxMode />
            <LocalBusinessPartnerships />
            <ChallengeCapsules />
          </div>
        )}
        <footer style={{ marginTop: 48, fontSize: 14, color: COLORS.subtleText, textAlign: "center" }}>
          <span>
            Designed for modern, purpose-driven productivity &middot; HarmonyFlow &copy; {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </div>
  );
}
