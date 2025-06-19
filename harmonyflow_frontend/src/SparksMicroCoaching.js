import React, { useEffect, useState, useRef } from "react";
import "./App.css";

/**
 * SparksMicroCoaching
 *
 * MindMesh Sparks: Mock AI-powered micro-coaching nudges appear in real time,
 * contextual to user activity, with a dynamic nudge feed and playful style.
 * Displays a sequence of "sparks" (short messages/tips) for demo purposes.
 *
 * Route: /sparks-micro-coaching
 */

// Demo nudge feed (AI micro-coaching suggestions)
const DEMO_SPARKS = [
  {
    text: "🌟 Start your morning strong! Take 5 deep breaths before the day begins.",
    context: "morning",
    delay: 1800,
  },
  {
    text: "💡 Need a focus boost? Try the Pomodoro Technique—set a 25min sprint.",
    context: "focus",
    delay: 3200,
  },
  {
    text: "🔄 Break time is productive too! Step up & stretch for 2 minutes.",
    context: "health",
    delay: 4500,
  },
  {
    text: "✅ Check off your mini-goal: Complete one quick win right now.",
    context: "progress",
    delay: 3200,
  },
  {
    text: "🧠 Brain fog? Ask yourself: What's the one thing that matters most this hour?",
    context: "clarity",
    delay: 3900,
  },
  {
    text: "✨ Celebrate small wins! Reflect on something you did well today.",
    context: "reflection",
    delay: 3400,
  },
  {
    text: "🔥 Power move: Silence notifications for your next focus block.",
    context: "focus",
    delay: 3300,
  },
  {
    text: "👀 Quick check: Are you seated comfortably? Good posture = better energy.",
    context: "health",
    delay: 2600,
  },
  {
    text: "🚀 Stretch goal: Can you finish a nagging task in 7 minutes?",
    context: "motivation",
    delay: 3200,
  }
];

function getRandomNudge() {
  // Shuffle to avoid repeating order
  const idx = Math.floor(Math.random() * DEMO_SPARKS.length);
  return DEMO_SPARKS[idx];
}

// PUBLIC_INTERFACE
function SparksMicroCoaching() {
  const [nudgeFeed, setNudgeFeed] = useState([]);
  const [isDemoRunning, setIsDemoRunning] = useState(true);
  const timeoutRef = useRef();

  // Effect: Push new sparks periodically (demo logic)
  useEffect(() => {
    // Demo only: Sequential demo nudges, cycling through DEMO_SPARKS
    let sparkIdx = 0;
    let isActive = true;

    function pushNextSpark() {
      if (!isActive) return;
      setNudgeFeed(feed =>
        [
          {
            ...DEMO_SPARKS[sparkIdx],
            timestamp: Date.now()
          },
          ...feed
        ].slice(0, 6)
      );
      sparkIdx = (sparkIdx + 1) % DEMO_SPARKS.length;
      timeoutRef.current = setTimeout(pushNextSpark, DEMO_SPARKS[sparkIdx].delay);
    }
    if (isDemoRunning) {
      timeoutRef.current = setTimeout(pushNextSpark, DEMO_SPARKS[0].delay);
    }
    return () => {
      isActive = false;
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [isDemoRunning]);

  // Handler: Manual spark (user click for new nudge)
  function handleManualSpark() {
    setNudgeFeed(feed => [
      { ...getRandomNudge(), timestamp: Date.now() },
      ...feed
    ].slice(0, 6));
  }

  return (
    <div className="container" style={{
      paddingTop: 100,
      paddingBottom: 55,
      minHeight: "66vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <div style={{
        background: "#f7feff",
        borderRadius: 15,
        padding: "35px 32px 26px 32px",
        maxWidth: 530,
        boxShadow: "0 4px 28px #11baf828",
        width: "100%",
        marginBottom: 28
      }}>
        <h1 className="title" style={{
          fontSize: "2.13rem",
          margin: "0 0 13px 0",
        }}>
          ✨ MindMesh Sparks – Micro-Coaching
        </h1>
        <div className="description" style={{ marginBottom: 17 }}>
          Get AI-powered nudge notifications in real time — boost your focus, reflection, and action with Sparks!
        </div>
        <button
          className="btn btn-large"
          style={{
            background: "var(--base-light)",
            color: "#fff",
            fontWeight: 700,
            margin: "6px 0 18px 0",
          }}
          onClick={handleManualSpark}
          type="button"
        >Get a Spark Now</button>
        <div style={{
          color: "#50E3C2",
          fontWeight: 500,
          marginBottom: 7,
          fontSize: "0.97em"
        }}>
          (Demo: New spark appears every few seconds. Try adding more!)
        </div>
        <section style={{
          marginTop: 14,
          minHeight: 200
        }}>
          <SparksFeed sparks={nudgeFeed} />
        </section>
      </div>
      <div style={{
        textAlign: "center",
        color: "#a3dbe7",
        fontSize: "1em",
        marginTop: 12,
      }}>
        * Sparks are for demo only – future versions personalize nudges by your in-app actions!
      </div>
    </div>
  );
}

// Subcomponent: Animated nudge/message feed (stack of bubbles/slips)
function SparksFeed({ sparks }) {
  if (!sparks.length) {
    return (
      <div style={{ textAlign: "center", color: "#b7c9e2", marginTop: 40 }}>
        (No sparks yet. Your AI micro-coaching nudges will appear here!)<br />
        🎇
      </div>
    );
  }
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 17,
      alignItems: "flex-start"
    }}>
      {sparks.map((s, idx) => (
        <div
          key={s.timestamp}
          style={{
            background: idx === 0 ? "linear-gradient(90deg,#00e3ce 0%,#4A90E2 97%)" : "#f0fbff",
            color: idx === 0 ? "#fff" : "#114",
            fontWeight: idx === 0 ? 700 : 500,
            borderLeft: idx === 0 ? "7px solid #F5A623" : "4px solid #50E3C2",
            borderRadius: 13,
            boxShadow: idx === 0 ? "0 2px 16px #00e3ce44" : "0 1px 4px #48bed877",
            padding: "17px 19px 10px 22px",
            fontSize: "1.14em",
            opacity: idx === 0 ? 1 : 0.94,
            marginLeft: idx === 0 ? 0 : 12,
            marginTop: idx === 0 ? 0 : 1,
            minWidth: 240,
            maxWidth: 410,
            transition: "background 0.21s"
          }}
        >
          <div style={{ fontSize: idx === 0 ? "1.15em" : "1em" }}>
            {s.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SparksMicroCoaching;
