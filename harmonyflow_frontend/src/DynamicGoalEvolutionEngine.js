import React, { useState } from "react";
import "./App.css";

/**
 * DynamicGoalEvolutionEngine
 * 
 * Demo page/component for AI-driven suggestions on goal progression and next steps.
 * Uses mock suggestions and progress, styled consistently with HarmonyFlow.
 */

// PUBLIC_INTERFACE
function DynamicGoalEvolutionEngine() {
  const [goalProgress] = useState([
    {
      goal: "Fitness Goal",
      progress: 0.9,
      suggestion:
        "You've completed 90% of your fitness goal. Want to aim for a marathon plan next?",
      ai: "AI recommends: Try a couch-to-marathon training schedule.",
    },
    {
      goal: "Read 12 Books",
      progress: 1.0,
      suggestion:
        "Fantastic! You've finished your reading goal. Interested in starting a book blog?",
      ai: "AI suggests: Start a blog to share your book insights.",
    },
    {
      goal: "Meditate Daily",
      progress: 0.7,
      suggestion: "Keep it up! Consider extending your session to 20 minutes.",
      ai: "AI tip: Increasing meditation length boosts benefits.",
    },
  ]);
  return (
    <div className="container" style={{paddingTop: 96, paddingBottom: 40, minHeight: "70vh"}}>
      <h1 className="title" style={{marginBottom: 12, fontSize: "2.3rem"}}>🚀 Dynamic Goal Evolution Engine</h1>
      <div className="description" style={{marginBottom: 32, fontSize: "1.13rem"}}>
        Harness AI to evolve your goals in real-time. Get smart, personalized next steps as you grow.
      </div>
      <div style={{display: "flex", gap: 38, flexWrap: "wrap"}}>
        {goalProgress.map((g, idx) => (
          <div key={g.goal}
            style={{
              background: "#f1fdff",
              borderRadius: 16,
              boxShadow: "0 4px 19px #4a90e220",
              padding: "24px 24px 15px 24px",
              minWidth: 250,
              marginBottom: 12,
              flex: "1 1 310px" }}>
            <div style={{fontWeight: 600, fontSize: "1.07rem", color: "#4A90E2"}}>
              {g.goal}
            </div>
            <div style={{height: 7, background: "#e0f7fa", borderRadius: 4, margin: "14px 0 10px 0"}}>
              <div style={{
                width: `${Math.floor(g.progress * 100)}%`,
                background: "linear-gradient(90deg, #4A90E2, #F5A623)",
                height: "100%",
                borderRadius: 4
              }}/>
            </div>
            <div style={{fontSize: "0.97em", color: "#50E3C2", fontWeight: 500, marginBottom: 7}}>
              {Math.floor(g.progress * 100)}% complete
            </div>
            <div style={{fontWeight: 500, marginBottom: 8}}>
              {g.suggestion}
            </div>
            <div style={{
              color: "#F5A623",
              background: "#F5A62318",
              borderRadius: 6,
              fontWeight: 500,
              fontSize: "0.98em",
              padding: "7px 8px"
            }}>
              <span>🧠</span> {g.ai}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop: 40, color:"#999", fontSize:"0.97rem"}}>
        * This is a demo. AI-powered evolution will personalize goal suggestions as you progress.
      </div>
    </div>
  );
}

export default DynamicGoalEvolutionEngine;
