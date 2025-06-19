import React from "react";
import "./App.css";

/**
 * AttentionSpanHeatmap
 *
 * A mockup page to visualize the user's attention span over the week.
 * Demonstrates an attention heatmap using a simple grid (pseudo-chart).
 * Offers usage guidance and UI consistent with the HarmonyFlow brand.
 *
 * Routes: /attention-heatmap
 */

// Sample heatmap data for 7 days (rows) x 8 hours (cols)
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const HOURS = ["8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"];
// Randomly generated: high = high focus, low = distraction
const HEATMAP = [
  [1, 2, 3, 4, 3, 2, 1, 0],
  [0, 1, 2, 4, 4, 2, 1, 0],
  [2, 3, 4, 4, 2, 1, 0, 0],
  [1, 2, 3, 4, 3, 1, 0, 0],
  [0, 1, 1, 3, 2, 1, 0, 0],
  [0, 1, 2, 2, 1, 1, 0, 0],
  [0, 0, 1, 2, 1, 0, 0, 0]
];
// Color palette based on focus level (0 = low, 4 = high)
const COLORS = [
  "#e3f4fd", // 0: lowest focus/distraction
  "#a5d7f2",
  "#66badf",
  "#359ad7",
  "#2473ab" // 4: highest focus
];

// PUBLIC_INTERFACE
function AttentionSpanHeatmap() {
  return (
    <div className="container" style={{ paddingTop: 96, paddingBottom: 60, minHeight: "65vh" }}>
      <div
        style={{
          background: "#f8fbff",
          borderRadius: 14,
          padding: "35px 30px 30px 30px",
          maxWidth: 650,
          margin: "0 auto 30px auto",
          boxShadow: "0 4px 22px #0040911a"
        }}
      >
        <h1 className="title" style={{ fontSize: "2.18rem", margin: "0 0 12px 0" }}>
          🔥 Attention Span Heatmap
        </h1>
        <div className="description" style={{ marginBottom: 18 }}>
          Visualize your attention and focus patterns. Use your heatmap to spot distraction zones and optimize your productive hours.
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{
            borderCollapse: "collapse",
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 2px 8px #4A90E220",
            width: "100%",
            minWidth: 440,
            margin: "0 auto"
          }}>
            <thead>
              <tr>
                <th style={{ padding: "7px 3px", textAlign: "center", background: "#e3f4fd", borderRadius: "9px 0 0 0" }}></th>
                {HOURS.map(h => (
                  <th key={h} style={{ padding: "7px 7px", fontWeight: 600, color: "#4A90E2", background: "#e3f4fd" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DAYS.map((d, ridx) => (
                <tr key={d}>
                  <td style={{ fontWeight: 500, background: "#f8fbff", color: "#2473ab", letterSpacing: "1px", padding: "8px 8px", textAlign: "center" }}>{d}</td>
                  {HEATMAP[ridx].map((val, cidx) => (
                    <td
                      key={cidx}
                      title={`Focus: ${val}/4`}
                      style={{
                        background: COLORS[val],
                        width: 40,
                        height: 32,
                        borderRadius: 7,
                        textAlign: "center",
                        color: val >= 3 ? "#fff" : "#005085",
                        fontWeight: val === 4 ? 700 : 500,
                        boxShadow: val === 4 ? "0 1px 7px #1260a8aa" : undefined
                      }}
                    >
                      {val >= 3 ? "●" : ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ color: "#114", fontSize: "1.06em", marginTop: 23, marginBottom: 10, textAlign: "left" }}>
          <b>How to use:</b>
          <ul style={{ marginTop: 8, color: "#378ad0" }}>
            <li>
              <b>Darkest cells</b> = Highest focus hours.
            </li>
            <li>
              <b>Lightest cells</b> = Low focus (possible distractions or breaks).
            </li>
          </ul>
          <span style={{ color: "#888", fontSize: "0.97em" }}>
            Try scheduling your toughest work during your personal "hot zones".
          </span>
        </div>
      </div>
      <div style={{ textAlign: "center", fontSize: "1em", color: "#92a9be", marginTop: 18 }}>
        * Sample data. Future versions will use real attention/focus tracking.
      </div>
    </div>
  );
}

export default AttentionSpanHeatmap;
