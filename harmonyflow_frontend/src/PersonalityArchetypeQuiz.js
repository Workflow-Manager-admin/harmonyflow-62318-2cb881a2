import React, { useState } from "react";
import "./App.css";

/**
 * PersonalityArchetypeQuiz
 * 
 * A self-contained quiz interface that prompts users with productivity/personality questions,
 * computes a (mocked AI) archetype, and displays personalized productivity method recommendations.
 * Designed to fit visually with the rest of HarmonyFlow.
 * 
 * Routes: /archetype-quiz
 * 
 * - Quiz: multiple choice, radio-style
 * - Result: Shows "Archetype" and tailored tips on Pomodoro, Time Blocking, etc.
 * - All logic is local/mocked -- in real use, would connect to backend or AI API
 */

// Possible archetypes and their recommendations
const ARCHETYPES = {
  "The Focused Finisher": {
    desc: "You thrive on deep work and seeing tasks through to completion—minimizing distractions is your key to success.",
    tips: [
      { method: "Pomodoro Technique", desc: "Use 25/5 work/rest cycles to break down big tasks and stay focused." },
      { method: "Single-Tasking", desc: "Prioritize one goal at a time to enhance completion and reduce overwhelm." }
    ],
    emoji: "🎯"
  },
  "The Adaptive Multitasker": {
    desc: "You excel at juggling many priorities and adapting to change quickly. Variety ignites your motivation.",
    tips: [
      { method: "Time Blocking", desc: "Divide your day into themed time blocks to keep priorities balanced." },
      { method: "Task Batching", desc: "Group similar tasks to stay in flow while embracing variety." }
    ],
    emoji: "🤹"
  },
  "The Structured Strategist": {
    desc: "You perform best with clear plans, routines, and well-defined goals. Structure is your superpower.",
    tips: [
      { method: "Eisenhower Matrix", desc: "Prioritize by urgency/importance to clarify your strategy." },
      { method: "Habit Stacking", desc: "Build routines by linking new habits to existing ones." }
    ],
    emoji: "📅"
  },
  "The Inspired Visionary": {
    desc: "You’re driven by inspiration and big-picture thinking. Motivation comes from purpose and new ideas.",
    tips: [
      { method: "Mind Mapping", desc: "Visualize your ideas to spark creativity and goal alignment." },
      { method: "Theming Days", desc: "Assign themes (e.g., ‘Idea Day’) to channel inspiration properly." }
    ],
    emoji: "🌟"
  },
};

// Quiz questions and answers (a simple 5-question quiz)
const QUIZ_QUESTIONS = [
  {
    text: "How do you prefer to start your workday?",
    options: [
      { text: "Jump right into my main task with no distractions", archetype: "The Focused Finisher" },
      { text: "Tidy my workspace and plan all the day's details", archetype: "The Structured Strategist" },
      { text: "Skim through various messages/socials to wake up", archetype: "The Adaptive Multitasker" },
      { text: "Brainstorm creative ideas for new projects", archetype: "The Inspired Visionary" }
    ]
  },
  {
    text: "When you feel overwhelmed, what helps most?",
    options: [
      { text: "Writing to-do lists and structuring my next actions", archetype: "The Structured Strategist" },
      { text: "Tackling one big task with intense focus", archetype: "The Focused Finisher" },
      { text: "Switching between tasks to keep momentum", archetype: "The Adaptive Multitasker" },
      { text: "Stepping back to find new inspiration or meaning", archetype: "The Inspired Visionary" }
    ]
  },
  {
    text: "What best motivates you to be productive?",
    options: [
      { text: "A creative vision or big purpose", archetype: "The Inspired Visionary" },
      { text: "Crossing items off a checklist", archetype: "The Focused Finisher" },
      { text: "A well-organized plan and structure", archetype: "The Structured Strategist" },
      { text: "Excitement from a fast-paced, dynamic day", archetype: "The Adaptive Multitasker" }
    ]
  },
  {
    text: "Choose your ideal workflow:",
    options: [
      { text: "Working in long, deep-focused stretches", archetype: "The Focused Finisher" },
      { text: "Having blocks of time for varied activities", archetype: "The Adaptive Multitasker" },
      { text: "Clear routines with set habits and schedules", archetype: "The Structured Strategist" },
      { text: "Free-flowing sessions for idea generation", archetype: "The Inspired Visionary" }
    ]
  },
  {
    text: "Which does your workspace reflect?",
    options: [
      { text: "Neatly planned, tools and tasks arranged", archetype: "The Structured Strategist" },
      { text: "Minimal, distraction-free, focused", archetype: "The Focused Finisher" },
      { text: "Dynamic, many workspaces/contexts throughout the day", archetype: "The Adaptive Multitasker" },
      { text: "Creative clutter: materials, art, notes", archetype: "The Inspired Visionary" }
    ]
  }
];

// PUBLIC_INTERFACE
function PersonalityArchetypeQuiz() {
  const [answers, setAnswers] = useState(Array(QUIZ_QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  // Event: Answer a quiz question
  function handleAnswer(qidx, oidx) {
    const newAnswers = [...answers];
    newAnswers[qidx] = oidx;
    setAnswers(newAnswers);
  }

  // Determine result archetype (most commonly selected)
  function computeResult() {
    const archScores = {};
    for (let i = 0; i < answers.length; i++) {
      const oidx = answers[i];
      if (oidx != null) {
        const archetype = QUIZ_QUESTIONS[i].options[oidx].archetype;
        archScores[archetype] = (archScores[archetype] || 0) + 1;
      }
    }
    let topArch = null, topScore = -1;
    Object.entries(archScores).forEach(([arch, score]) => {
      if (score > topScore) {
        topScore = score;
        topArch = arch;
      }
    });
    // If tie or nothing selected, pick pseudo-randomly
    if (!topArch || Object.values(archScores).filter(s => s === topScore).length > 1)
      topArch = Object.keys(ARCHETYPES)[Math.floor(Math.random() * Object.keys(ARCHETYPES).length)];
    return topArch;
  }

  // Handle quiz submission
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo(0, 0);
  }

  // Handle restart
  function handleRestart() {
    setAnswers(Array(QUIZ_QUESTIONS.length).fill(null));
    setSubmitted(false);
  }

  // Result data
  const resultArch = submitted ? computeResult() : null;

  // Layout: Centered, card-like UI matching brand style
  return (
    <div className="container" style={{paddingTop: 96, paddingBottom: 60, minHeight: "65vh"}}>
      <div
        style={{
          background: "#f8fbff",
          borderRadius: 14,
          padding: "35px 30px 30px 30px",
          maxWidth: 580,
          margin: "0 auto 30px auto",
          boxShadow: "0 4px 24px #00409112",
        }}
      >
        <h1 className="title" style={{ fontSize: "2.2rem", margin: "0 0 12px 0" }}>
          🧬 Productivity Archetype Quiz
        </h1>
        <div className="description" style={{ marginBottom: 18 }}>Find your productivity personality & unlock tailored strategies.</div>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <ol style={{paddingLeft: 23, marginBottom: 0}}>
              {QUIZ_QUESTIONS.map((q, qidx) => (
                <li key={qidx} style={{ marginBottom: 23 }}>
                  <div style={{ fontWeight: 600, color: "#4A90E2", marginBottom: 4 }}>{q.text}</div>
                  <div>
                    {q.options.map((opt, oidx) => (
                      <label
                        key={oidx}
                        style={{
                          display: "block",
                          background: answers[qidx] === oidx ? "var(--base-light)" : "#e7f8fd",
                          color: answers[qidx] === oidx ? "#001045" : "#246",
                          borderRadius: 6,
                          marginBottom: 8,
                          padding: "7px 13px",
                          cursor: "pointer",
                          fontWeight: answers[qidx] === oidx ? 600 : 400,
                          border: answers[qidx] === oidx ? "2px solid #50E3C2" : "1px solid #c3e2ee",
                          transition: "background 0.17s, border 0.15s"
                        }}
                      >
                        <input
                          type="radio"
                          name={`q${qidx}`}
                          checked={answers[qidx] === oidx}
                          onChange={() => handleAnswer(qidx, oidx)}
                          style={{ marginRight: 8 }}
                        />
                        {opt.text}
                      </label>
                    ))}
                  </div>
                </li>
              ))}
            </ol>
            <button
              className="btn btn-large"
              type="submit"
              style={{
                marginTop: 18,
                width: 180,
                fontSize: "1.08rem",
                background: "var(--base-light)",
                color: "#fff",
              }}
              disabled={answers.some(a => a === null)}
            >
              See My Archetype →
            </button>
          </form>
        ) : (
          <div style={{textAlign: "center"}}>
            <div style={{fontSize: "2.3rem", marginBottom: 6}}>
              {ARCHETYPES[resultArch].emoji} Your Archetype:
            </div>
            <div style={{fontSize: "1.3rem", fontWeight: 600, color: "#4A90E2", marginBottom: 12}}>
              {resultArch}
            </div>
            <div style={{
              color: "#333",
              background: "#e3f7fd",
              padding: "14px 19px",
              borderRadius: 10,
              marginBottom: 20,
              fontSize: "1.08em"
            }}>
              {ARCHETYPES[resultArch].desc}
            </div>
            <h3 style={{color: "#50E3C2", fontWeight: 600, marginBottom: 9, marginTop: 0}}>Top Productivity Strategies for You:</h3>
            <ul style={{textAlign: "left", maxWidth: 385, margin: "0 auto", color: "#114"}}>
              {ARCHETYPES[resultArch].tips.map((tip, idx) => (
                <li key={tip.method} style={{marginBottom: 13}}>
                  <span style={{fontWeight: 600}}>{tip.method}:</span>
                  <span> {tip.desc}</span>
                </li>
              ))}
            </ul>
            <button onClick={handleRestart} className="btn btn-large" style={{marginTop: 26}}>
              Retake Quiz
            </button>
          </div>
        )}
      </div>
      <div style={{textAlign: "center", fontSize: "1em", color: "#92a9be", marginTop: 18}}>
        * Powered by AI-insights (demo). Try your result in the real world!
      </div>
    </div>
  );
}

export default PersonalityArchetypeQuiz;
