import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HarmonyFlowContainer from "./HarmonyFlowContainer";

// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <HarmonyFlowContainer />
    </Router>
  );
}

export default App;