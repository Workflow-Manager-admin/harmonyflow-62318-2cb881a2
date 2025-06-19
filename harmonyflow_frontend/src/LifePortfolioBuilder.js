import React from "react";
import "./App.css";

/**
 * LifePortfolioBuilder
 *
 * A page/component to visualize an auto-generated monthly report,
 * including demo/mock sections for Wins & Challenges Summary, a Mental Health graph,
 * Skill Growth, and Milestone Progress. Visually styled with brand consistency.
 *
 * Route: /life-portfolio
 */

// PUBLIC_INTERFACE
function LifePortfolioBuilder() {
  // Mock data
  const wins = [
    "Completed a 30-day meditation streak",
    "Published 3 blog posts on productivity",
    "Ran 65 miles in June",
    "Helped mentor a friend with job prep"
  ];

  const challenges = [
    "Struggled with consistent sleep schedule",
    "Missed 4 workout sessions",
    "Experienced work burnout mid-month"
  ];

  // Mental health ratings, one per week (1=low, 5=high)
  const mentalHealth = [4, 3, 5, 4];

  // Skill growth mockup (skills and percentage)
  const skills = [
    { name: "Mindfulness", growth: 21 },
    { name: "Writing", growth: 12 },
    { name: "Fitness", growth: 33 },
    { name: "Mentorship", growth: 8 }
  ];

  // Milestone progress
  const milestones = [
    { label: "Reading Challenge (12/12)", status: "Completed", percent: 100 },
    { label: "Fitness Goal (65/100 miles)", status: "In Progress", percent: 65 },
    { label: "Consistent Wake-Up (22/30 days)", status: "In Progress", percent: 73 }
  ];

  return (
    <div className="container" style={{ paddingTop: 98, paddingBottom: 70, minHeight: "74vh", maxWidth: 850 }}>
      <div
        style={{
          background: "#fbfcfe",
          borderRadius: 18,
          padding: "37px 32px 34px 32px",
          boxShadow: "0 4px 23px #00409113",
        }}
      >
        <h1 className="title" style={{ fontSize: "2.21rem", margin: "0 0 10px 0" }}>
          🗂️ Life Portfolio Builder
        </h1>
        <div className="description" style={{ marginBottom: 19 }}>
          Your AI-generated monthly snapshot synthesizing wins, growth, well-being, and milestone tracking.<br />
          <span style={{ color: "#4A90E2", fontWeight: 500, fontSize: "1.01em" }}>* Demo – uses mock data.</span>
        </div>
        {/* Wins & Challenges */}
        <section style={{ marginBottom: 32, display: "flex", gap: 28, flexWrap: "wrap" }}>
          {/* Wins */}
          <div style={{
            flex: "1 1 280px",
            minWidth: 230,
            background: "#e2fcec",
            borderRadius: 13,
            padding: "19px 19px",
            boxShadow: "0 2px 9px #50e3c216"
          }}>
            <div style={{fontWeight: 700, color: "#37bb88", marginBottom: 8, fontSize: "1.14em"}}>
              🌟 Wins This Month
            </div>
            <ul style={{margin: 0, paddingLeft: 18, color: "#2473ab"}}>
              {wins.map((w, idx) => <li key={idx}>{w}</li>)}
            </ul>
          </div>
          {/* Challenges */}
          <div style={{
            flex: "1 1 280px",
            minWidth: 230,
            background: "#ffe2e2",
            borderRadius: 13,
            padding: "19px 19px",
            boxShadow: "0 2px 9px #f5a62321"
          }}>
            <div style={{fontWeight: 700, color: "#d95c5c", marginBottom: 8, fontSize: "1.14em"}}>
              ⚡ Challenges
            </div>
            <ul style={{margin: 0, paddingLeft: 18, color: "#443149"}}>
              {challenges.map((c, idx) => <li key={idx}>{c}</li>)}
            </ul>
          </div>
        </section>
        {/* Mental Health Graph (Week over week) */}
        <section style={{ marginBottom: 36 }}>
          <div style={{ fontWeight: 700, color: "#4A90E2", marginBottom: 12, fontSize: "1.13em" }}>
            💖 Mental Health (Weekly Average)
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 19, marginBottom: 8 }}>
            {mentalHealth.map((mh, idx) => (
              <div key={idx} style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: mh * 18 + 10,
                    width: 33,
                    background: "linear-gradient(180deg,#ffe3ff,#5ce2fb)",
                    borderRadius: 9,
                    marginBottom: 2,
                    boxShadow: mh === 5 ? "0 2px 15px #93fbe726" : undefined,
                    border: mh === 5 ? "2px solid #50E3C2" : "1.2px solid #e6e6ef"
                  }}
                  title={`Week ${idx + 1}: ${mh}/5`}
                ></div>
                <div style={{ fontWeight: 500, color: "#50E3C2", marginBottom: 1 }}>
                  {mh}/5
                </div>
                <div style={{ fontSize: "0.94em", color: "#999" }}>Wk {idx + 1}</div>
              </div>
            ))}
          </div>
          <div style={{ color: "#b77fff", fontWeight: 500, fontSize: "0.99em" }}>
            Balanced mood with brief dips – great consistency!
          </div>
        </section>
        {/* Skill Growth */}
        <section style={{ marginBottom: 33 }}>
          <div style={{ fontWeight: 700, color: "#F5A623", marginBottom: 13, fontSize: "1.11em" }}>
            🚀 Skill Growth
          </div>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {skills.map(s => (
              <div key={s.name} style={{
                background: "#f3f8fe",
                borderRadius: 13,
                padding: "13px 15px 9px 15px",
                minWidth: 130,
                flex: "1 1 115px"
              }}>
                <div style={{ fontWeight: 600, color: "#4A90E2", marginBottom: 4 }}>{s.name}</div>
                <div style={{ height: 7, background: "#eaf9fc", borderRadius: 5, marginBottom: 6 }}>
                  <div style={{
                    width: `${s.growth}%`,
                    background: "linear-gradient(90deg, #F5A623, #4A90E2 87%)",
                    height: "100%",
                    borderRadius: 5
                  }} />
                </div>
                <div style={{ color: "#F5A623", fontWeight: 600 }}>{s.growth}% ↑</div>
              </div>
            ))}
          </div>
        </section>
        {/* Milestone Progress */}
        <section>
          <div style={{ fontWeight: 700, color: "#50E3C2", marginBottom: 14, fontSize: "1.13em" }}>
            🎯 Milestone Progress
          </div>
          <div style={{ display: "flex", gap: 25, flexWrap: "wrap" }}>
            {milestones.map((m, idx) => (
              <div key={idx} style={{
                background: "#e3fcfa",
                borderRadius: 13,
                padding: "15px 15px",
                minWidth: 170,
                flex: "1 1 170px",
                marginBottom: 6,
                position: "relative"
              }}>
                <div style={{
                  fontWeight: 600,
                  color: "#2473ab",
                  marginBottom: 6,
                  fontSize: "1.02em"
                }}>
                  {m.label}
                </div>
                <div style={{
                  height: 7,
                  background: "#eaf7f3",
                  borderRadius: 4,
                  marginBottom: 7
                }}>
                  <div style={{
                    width: `${m.percent}%`,
                    background: "linear-gradient(90deg, #50E3C2, #4A90E2)",
                    height: "100%",
                    borderRadius: 4
                  }} />
                </div>
                <div style={{
                  color: m.percent === 100 ? "#37bb88" : "#F5A623",
                  fontWeight: 600
                }}>
                  {m.status}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div style={{ textAlign: "center", color: "#93aac3", fontSize: "0.98em", marginTop: 22 }}>
        * For demo only. Future versions will use your real progress and insights!
      </div>
    </div>
  );
}

export default LifePortfolioBuilder;
