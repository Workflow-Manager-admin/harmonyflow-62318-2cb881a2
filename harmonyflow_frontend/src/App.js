import React from 'react';
import './App.css';
import './HarmonyFlowContainer.css';
import HarmonyFlowContainer from './HarmonyFlowContainer';
import DynamicGoalEvolutionEngine from './DynamicGoalEvolutionEngine';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/**
 * App - Root component.
 * Top-level navigation and route-based rendering; adapts for feature pages.
 */

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="logo">
            <span className="logo-symbol">●</span>
            HarmonyFlow
          </div>
          <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: 'none', fontWeight: 500 }}>
              Dashboard
            </Link>
            <Link
              to="/goal-evolution"
              style={{
                color: "#fff",
                background: "var(--base-light)",
                padding: "6px 12px",
                borderRadius: "7px",
                textDecoration: "none",
                fontWeight: 500,
                transition: "background 0.19s"
              }}>
              Dynamic Goal Evolution
            </Link>
            <Link
              to="/attention-heatmap"
              style={{
                color: "#2473ab",
                background: "#e3f8fd",
                padding: "6px 13px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                border: "2px solid var(--base-light)"
              }}>
              Attention Heatmap
            </Link>
            <Link
              to="/archetype-quiz"
              style={{
                color: "#4A90E2",
                background: "#fff",
                padding: "6px 13px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                border: "2px solid var(--base-light)"
              }}>
              Archetype Quiz
            </Link>
            <Link
              to="/event-chain"
              style={{
                color: "#fff",
                background: "#50E3C2",
                padding: "6px 15px",
                borderRadius: "7px",
                textDecoration: "none",
                fontWeight: 500,
                border: "2px solid #4A90E2"
              }}
            >
              Event Chain Tracker
            </Link>
            <Link
              to="/life-event-chain"
              style={{
                color: "#50E3C2",
                background: "#fff",
                padding: "6px 14px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 500,
                border: "2px solid #4A90E2"
              }}
            >
              Life Event Chain Tracker
            </Link>
            <Link
              to="/sparks-micro-coaching"
              style={{
                color: "#fff",
                background: "#ffbb37",
                padding: "7px 14px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: 600,
                border: "2px solid #F5A623",
                margin: "0 0 0 0",
                boxShadow: "0 1px 7px #fae0b5cc"
              }}
            >
              Sparks Micro-Coaching
            </Link>
            <Link
              to="/flow-state-induction"
              style={{
                color: "#fff",
                background: "#4A90E2",
                padding: "8px 16px",
                borderRadius: "9px",
                textDecoration: "none",
                fontWeight: 600,
                border: "2px solid #50E3C2",
                marginLeft: "8px"
              }}
            >
              Flow State Induction
            </Link>
            <Link
              to="/cross-life-sync"
              style={{
                color: "#fff",
                background: "#6ad8dd",
                padding: "8px 13px",
                borderRadius: "9px",
                textDecoration: "none",
                fontWeight: 600,
                border: "2px solid #50E3C2",
                marginLeft: "8px"
              }}
            >
              Cross-Life Sync
            </Link>
          </div>
        </nav>
        <div style={{ paddingTop: 80, minHeight: '100vh', background: "var(--base-dark)" }}>
          <Routes>
            <Route path="/" element={<HarmonyFlowContainer />} />
            <Route path="/goal-evolution" element={<DynamicGoalEvolutionEngine />} />
            <Route
              path="/attention-heatmap"
              element={React.createElement(require("./AttentionSpanHeatmap").default)}
            />
            <Route path="/archetype-quiz" element={React.createElement(require("./PersonalityArchetypeQuiz").default)} />
            <Route
              path="/event-chain"
              element={React.createElement(require("./LifeEventChainTracker").default)}
            />
            <Route
              path="/life-event-chain"
              element={React.createElement(require("./LifeEventChainTracker").default)}
            />
            <Route
              path="/sparks-micro-coaching"
              element={React.createElement(require("./SparksMicroCoaching").default)}
            />
            <Route
              path="/flow-state-induction"
              element={React.createElement(require("./FlowStateInductionSystem").default)}
            />
            <Route
              path="/cross-life-sync"
              element={React.createElement(require("./CrossLifeSync").default)}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
