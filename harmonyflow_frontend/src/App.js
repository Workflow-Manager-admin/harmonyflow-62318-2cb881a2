import React from 'react';
import './App.css';
import './HarmonyFlowContainer.css';
import HarmonyFlowContainer from './HarmonyFlowContainer';

/**
 * App - Root component.
 * For HarmonyFlow, this renders the main container (HarmonyFlowContainer).
 */

function App() {
  return (
    <div className="app">
      <HarmonyFlowContainer />
    </div>
  );
}

export default App;