import React from "react";
import "./App.css";

/**
 * LifeEventChainTracker
 *
 * Visualizes a mock chain of life events and their cascading effects.
 * Demonstrates butterfly-effect chains; mock data, interactive hover over nodes for details,
 * and a styled sequence of event "cards" with arrows showing the cascading impact.
 * 
 * Routes: /event-chain
 *
 * This component is self-contained. Designed for demo/mockups – in real use, input would be dynamic.
 */

// Example butterfly effect chain (mock data)
const mockChains = [
  {
    id: 1,
    title: "Sleep In 2 Hours Late (Monday)",
    description: "You decided to sleep in 2 hours past your usual time.",
    effect: "Reduced morning energy; late start.",
    next: {
      title: "Missed Morning Run",
      description: "Skipped your morning jog due to less time.",
      effect: "Lower endorphin levels; felt sluggish.",
      next: {
        title: "Extra Caffeine at Lunch",
        description: "Sleepy, you drink an extra coffee.",
        effect: "Short energy boost, but jittery.",
        next: {
          title: "Afternoon Dip & Irritability",
          description: "Experienced focus drop during work.",
          effect: "Snapped at a teammate; impacted mood.",
          next: {
            title: "Poor Sleep Again",
            description: "Wired at bedtime, hard to fall asleep.",
            effect: "Repeats cycle. (Cascade complete)"
          },
        },
      },
    },
  }
];

// Helper to unfold the chain into an array
function flattenChain(chainRoot) {
  const flattened = [];
  let current = chainRoot;
  while (current) {
    flattened.push(current);
    current = current.next || null;
  }
  return flattened;
}

// PUBLIC_INTERFACE
function LifeEventChainTracker() {
  const chain = flattenChain(mockChains[0]);
  return (
    <div className="container" style={{ paddingTop: 96, paddingBottom: 60, minHeight: "65vh" }}>
      <div
        style={{
          background: "#f8fbff",
          borderRadius: 14,
          padding: "35px 30px 20px 30px",
          maxWidth: 730,
          margin: "0 auto 30px auto",
          boxShadow: "0 4px 22px #0040911a"
        }}
      >
        <h1 className="title" style={{ fontSize: "2.25rem", margin: "0 0 12px 0" }}>
          🦋 Life Event Chain Tracker
        </h1>
        <div className="description" style={{ marginBottom: 22, color: "#248" }}>
          See how a single life event cascades to affect mood, energy, performance, and habits. <br />
          Demonstrates the "butterfly effect" in your routine.
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginTop: 10 }}>
          {chain.map((event, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  background: "linear-gradient(90deg, #4A90E214 0%, #f1fdff 85%)",
                  borderLeft: `7px solid ${i===0 ? "#50E3C2" : "#4A90E2"}`,
                  borderRadius: 13,
                  boxShadow: "0 2px 10px #4A90E21a",
                  minWidth: 320,
                  maxWidth: 470,
                  margin: "0 0 6px 0",
                  padding: "20px 22px 12px 30px",
                  position: "relative",
                  transition: "box-shadow 0.15s",
                  zIndex: 1,
                }}
              >
                <div style={{ fontWeight: 600, color: "#4A90E2", fontSize: "1.07em", marginBottom: 5 }}>
                  {i === 0 ? "Trigger Event:" : "Impact:"}
                </div>
                <div style={{ fontWeight: 600, fontSize: "1.13rem", color: i === 0 ? "#50E3C2" : "#2473ab" }}>
                  {event.title}
                </div>
                <div style={{ fontSize: "1.01em", color: "#444", marginTop: 6, marginBottom: 5 }}>{event.description}</div>
                <div style={{
                  color: "#F5A623",
                  fontWeight: 500,
                  fontSize: "0.98em",
                  background: "#F5A62318",
                  borderRadius: 6,
                  padding: "6px 8px 5px 8px",
                  marginBottom: 5,
                  display: "inline-block"
                }}>
                  Effect: {event.effect}
                </div>
              </div>
              {/* Draw arrow unless it's the last event */}
              {i < chain.length - 1 && (
                <div style={{margin: "10px 0"}}>
                  <svg height="36" width="16">
                    <defs>
                      <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="2.5" refY="3.5" orient="auto">
                        <polygon points="0 0, 7 3.5, 0 7" fill="#4A90E2" />
                      </marker>
                    </defs>
                    <line x1="8" y1="0" x2="8" y2="32" stroke="#4A90E2" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 33, color: "#758ba7", fontSize: "0.97rem", textAlign: "center" }}>
          * Sample chain. Experiment to see how routine decisions propagate!
        </div>
      </div>
    </div>
  );
}

export default LifeEventChainTracker;
