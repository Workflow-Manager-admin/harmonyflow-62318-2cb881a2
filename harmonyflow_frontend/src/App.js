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
          </div>
        </nav>
        <div style={{ paddingTop: 80, minHeight: '100vh', background: "var(--base-dark)" }}>
          <Routes>
            <Route path="/" element={<HarmonyFlowContainer />} />
            <Route path="/goal-evolution" element={<DynamicGoalEvolutionEngine />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;