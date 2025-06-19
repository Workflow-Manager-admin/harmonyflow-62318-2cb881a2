import React from 'react';
import './App.css';
import './HarmonyFlowContainer.css';
import HarmonyFlowContainer from './HarmonyFlowContainer';
import DynamicGoalEvolutionEngine from './DynamicGoalEvolutionEngine';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LifePortfolioBuilder from "./LifePortfolioBuilder";
import ResponsiveNav from './ResponsiveNav';

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
          <ResponsiveNav />
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
