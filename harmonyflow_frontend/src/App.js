import React from 'react';
import './App.css';
import './HarmonyFlowContainer.css';
import HarmonyFlowContainer from './HarmonyFlowContainer';
import DynamicGoalEvolutionEngine from './DynamicGoalEvolutionEngine';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LifePortfolioBuilder from "./LifePortfolioBuilder";

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
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <Link to="/" className="btn btn-outline" style={{ fontWeight: 600, borderRadius: 13 }}>
              Dashboard
            </Link>
            <Link to="/goal-evolution" className="btn btn-accent" style={{ fontWeight: 600, borderRadius: 15 }}>
              Dynamic Goal Evolution
            </Link>
            <Link to="/attention-heatmap" className="btn btn-outline" style={{ color: "var(--primary-light)", borderRadius: 15 }}>
              Attention Heatmap
            </Link>
            <Link to="/archetype-quiz" className="btn btn-outline" style={{ color: "var(--primary-light)", borderRadius: 15 }}>
              Archetype Quiz
            </Link>
            <Link to="/event-chain" className="btn btn-large" style={{ background: "var(--primary-light)", color: "#fff", borderRadius: 15 }}>
              Event Chain Tracker
            </Link>
            <Link to="/life-event-chain" className="btn btn-large" style={{ background: "var(--base-light)", color: "#fff", borderRadius: 15 }}>
              Life Event Chain Tracker
            </Link>
            <Link to="/sparks-micro-coaching" className="btn btn-accent" style={{ fontWeight: 700, borderRadius: 15 }}>
              Sparks Micro-Coaching
            </Link>
            <Link to="/flow-state-induction" className="btn btn-large" style={{ background: "linear-gradient(98deg,#437AFF 21%,#50E3C2 100%)", color: "#fff", borderRadius: 15 }}>
              Flow State Induction
            </Link>
            <Link to="/cross-life-sync" className="btn btn-large" style={{ background: "linear-gradient(98deg,#50E3C2 10%,#4A90E2 94%)", color: "#fff", borderRadius: 15 }}>
              Cross-Life Sync
            </Link>
            <Link to="/emotion-task-prioritization" className="btn btn-large" style={{ background: "linear-gradient(98deg,#b77fff 10%,#50E3C2 94%)", color: "#fff", borderRadius: 15 }}>
              Task Prioritization
            </Link>
            <Link to="/whisper-journal" className="btn btn-accent" style={{ background: "linear-gradient(96deg,#4A90E2 60%,#50E3C2 100%)", color: "#fff", borderRadius: 15 }}>
              Whisper Journal
            </Link>
            <Link to="/life-portfolio" className="btn btn-large" style={{ background: "linear-gradient(95deg,#F5A623 5%,#4A90E2 100%)", color: "#fff", fontWeight: 700, borderRadius: 15 }}>
              Life Portfolio
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
            <Route
              path="/emotion-task-prioritization"
              element={React.createElement(require("./EmotionTaskPrioritization").default)}
            />
            {/* Whisper Journal integration */}
            <Route
              path="/whisper-journal"
              element={React.createElement(require("./WhisperJournal").default)}
            />
            {/* Life Portfolio Builder integration */}
            <Route
              path="/life-portfolio"
              element={React.createElement(require("./LifePortfolioBuilder").default)}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
