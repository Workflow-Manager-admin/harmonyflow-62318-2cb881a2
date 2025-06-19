import React from "react";
import DashboardWidgetTile from "./DashboardWidgetTile";

// PUBLIC_INTERFACE
export default function GoalMappingDashboard() {
  return (
    <DashboardWidgetTile
      icon="🎯"
      title="Goal Mapping & Life Dashboard"
      accent="goal"
      desc={
        <>
          Visualize how your main life goals, habits, and tasks are connected.
          <br />
          <span style={{ color: "var(--text-main)", fontWeight: 600 }}>
            (Interactive diagrams and goal editor coming soon)
          </span>
        </>
      }
      style={{ minHeight: 160, marginBottom: 20 }}
      aria-label="Goal Mapping and Life Dashboard"
    >
      {/* Placeholder visual */}
      <div
        style={{
          margin: "21px 0 6px 0",
          height: 70,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
        aria-hidden
      >
        <svg viewBox="0 0 200 58" width="170" height="58" style={{ filter: "drop-shadow(0 5px 17px #b7cdfa4c)" }}>
          <g>
            <circle cx="43" cy="29" r="22" fill="#b7cdfa" />
            <text x="43" y="34" fill="#326cfb" fontSize="13" fontWeight="600" textAnchor="middle">Goal</text>
            <line x1="65" y1="29" x2="90" y2="29" stroke="#326cfb" strokeWidth="2.7" />
            <circle cx="115" cy="19" r="13.5" fill="#43e8d8" />
            <circle cx="115" cy="39" r="13.5" fill="#f7b340" opacity="0.9"/>
            <text x="115" y="25" fill="#187b6f" fontSize="9.5" fontWeight="600" textAnchor="middle">Habit</text>
            <text x="115" y="45" fill="#b17e06" fontSize="9" fontWeight="600" textAnchor="middle">Task</text>
          </g>
        </svg>
      </div>
      <div style={{ color: "var(--text-subtle)", fontSize: 13, marginTop: 9 }}>
        Connect, edit, and track your progress visually.
      </div>
    </DashboardWidgetTile>
  );
}
