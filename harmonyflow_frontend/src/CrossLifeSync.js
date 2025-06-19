import React, { useState } from "react";
import "./App.css";

/**
 * CrossLifeSync
 *
 * Simulates integrations for Email, Social Media, and Fitness apps.
 * Interactive cards demonstrate mock features such as converting meeting requests to tasks,
 * limiting social media exposure when stressed, and correlating fitness with energy/mood.
 *
 * Accessible at /cross-life-sync
 */

// --- Mock states for interactive demo controls ---

// PUBLIC_INTERFACE
function CrossLifeSync() {
  // Email Integration - simulate toggling meeting import and mock conversion
  const [emailConnected, setEmailConnected] = useState(false);
  const [meetingsConverted, setMeetingsConverted] = useState(false);

  // Social Media - simulate toggling stress-based exposure limit
  const [socialConnected, setSocialConnected] = useState(false);
  const [limitExposure, setLimitExposure] = useState(false);

  // Fitness App - mock connection and correlate data
  const [fitnessConnected, setFitnessConnected] = useState(false);
  const [correlationVisible, setCorrelationVisible] = useState(false);
  const [mockData] = useState({
    steps: [8000, 6000, 11000, 9000, 7400, 12000, 5600],
    mood: [3, 2, 4, 3, 2, 5, 1], // scale 1-5
    days: ["M", "T", "W", "T", "F", "S", "S"],
  });

  // --- Card-based layout ---
  return (
    <div className="container" style={{ paddingTop: 94, paddingBottom: 58, minHeight: "66vh" }}>
      <h1 className="title" style={{ fontSize: "2.18rem", marginBottom: 9 }}>
        🔗 Cross-Life Synchronization
      </h1>
      <div className="description" style={{ marginBottom: 33, fontSize: "1.15rem" }}>
        Seamlessly connect your Email, Social Media, and Fitness apps to enable a holistic, AI-enhanced productivity experience.<br />
        <span style={{ fontSize: "1.04rem", color: "#4A90E2" }}>* All integrations below are for demonstration purposes.</span>
      </div>
      <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
        {/* Email Integration Card */}
        <section style={{
          background: "#e9f7ff",
          borderRadius: 15,
          padding: "28px 22px 22px 22px",
          minWidth: 270,
          maxWidth: 360,
          flex: "1 1 320px",
          boxShadow: "0 3px 16px #4A90E215",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "2.1em", marginBottom: 4, color: "#4A90E2" }}>📧</div>
          <div style={{ fontWeight: 600, fontSize: "1.15rem", color: "#4A90E2" }}>Email Integration</div>
          {!emailConnected ? (
            <>
              <div style={{ margin: "11px 0 18px 0", textAlign: "center" }}>
                Connect your email to automatically convert meeting invites into actionable tasks.
              </div>
              <button
                className="btn btn-large"
                style={{ background: "var(--base-light)", color: "#fff" }}
                onClick={() => setEmailConnected(true)}
              >
                Connect Email
              </button>
            </>
          ) : (
            <>
              <div style={{
                margin: "13px 0 16px 0",
                background: "#fff",
                color: "#1978ad",
                padding: "8px 10px",
                borderRadius: 7,
                fontWeight: 500,
                fontSize: "1.04em"
              }}>
                Email connected! <span role="img" aria-label="check">✅</span>
              </div>
              <div style={{ marginBottom: 13 }}>
                <input
                  type="checkbox"
                  id="meetingAutoConvert"
                  checked={meetingsConverted}
                  onChange={e => setMeetingsConverted(e.target.checked)}
                />
                <label htmlFor="meetingAutoConvert" style={{ marginLeft: 7, fontSize: "1.03em" }}>
                  Auto-convert meeting requests to tasks
                </label>
              </div>
              {meetingsConverted && (
                <div style={{
                  color: "#50E3C2",
                  background: "#d9fcf1",
                  borderRadius: 8,
                  padding: "7px 10px",
                  fontWeight: 500,
                  fontSize: "0.97em",
                  marginBottom: 8
                }}>
                  Sample: "Team Sync at 2PM" added to your To-Do list.
                </div>
              )}
              <button
                className="btn"
                style={{ background: "#e17c5f", color: "#fff", marginTop: 6 }}
                onClick={() => { setEmailConnected(false); setMeetingsConverted(false); }}
              >
                Disconnect
              </button>
            </>
          )}
        </section>
        {/* Social Media Integration Card */}
        <section style={{
          background: "#f2fcf7",
          borderRadius: 15,
          padding: "28px 22px 22px 22px",
          minWidth: 270,
          maxWidth: 360,
          flex: "1 1 320px",
          boxShadow: "0 3px 16px #22e2c215",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "2.1em", marginBottom: 3, color: "#50E3C2" }}>📱</div>
          <div style={{ fontWeight: 600, fontSize: "1.15rem", color: "#50E3C2" }}>Social Media Integration</div>
          {!socialConnected ? (
            <>
              <div style={{ margin: "11px 0 18px 0", textAlign: "center" }}>
                Link your social accounts to <b>limit exposure</b> when your stress is detected as high.
              </div>
              <button
                className="btn btn-large"
                style={{ background: "#50E3C2", color: "#fff" }}
                onClick={() => setSocialConnected(true)}
              >
                Connect Social Media
              </button>
            </>
          ) : (
            <>
              <div style={{
                margin: "13px 0 16px 0",
                background: "#fff",
                color: "#23ba96",
                padding: "8px 10px",
                borderRadius: 7,
                fontWeight: 500,
                fontSize: "1.04em"
              }}>
                Social media linked! <span role="img" aria-label="check">🔒</span>
              </div>
              <div style={{ marginBottom: 13 }}>
                <input
                  type="checkbox"
                  id="limitExposure"
                  checked={limitExposure}
                  onChange={e => setLimitExposure(e.target.checked)}
                />
                <label htmlFor="limitExposure" style={{ marginLeft: 7, fontSize: "1.03em" }}>
                  Limit social media when stress detected
                </label>
              </div>
              {limitExposure && (
                <div style={{
                  color: "#fff",
                  background: "#f5a623",
                  borderRadius: 7,
                  padding: "8px 10px",
                  fontWeight: 600,
                  fontSize: "0.98em",
                  marginBottom: 8
                }}>
                  Example: TikTok and Instagram will be auto-muted if high stress is sensed.
                </div>
              )}
              <button
                className="btn"
                style={{ background: "#ff7777", color: "#fff", marginTop: 6 }}
                onClick={() => { setSocialConnected(false); setLimitExposure(false); }}
              >
                Disconnect
              </button>
            </>
          )}
        </section>
        {/* Fitness Apps Integration Card */}
        <section style={{
          background: "#f9fafe",
          borderRadius: 15,
          padding: "28px 22px 22px 22px",
          minWidth: 270,
          maxWidth: 360,
          flex: "1 1 320px",
          boxShadow: "0 3px 16px #4a90e220",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{ fontSize: "2.1em", marginBottom: 3, color: "#F5A623" }}>🏃‍♂️</div>
          <div style={{ fontWeight: 600, fontSize: "1.15rem", color: "#F5A623" }}>Fitness Apps</div>
          {!fitnessConnected ? (
            <>
              <div style={{ margin: "11px 0 18px 0", textAlign: "center" }}>
                Connect fitness trackers to <b>correlate activity</b> with energy and mood.
              </div>
              <button
                className="btn btn-large"
                style={{ background: "#F5A623", color: "#fff" }}
                onClick={() => setFitnessConnected(true)}
              >
                Connect Fitness App
              </button>
            </>
          ) : (
            <>
              <div style={{
                margin: "13px 0 16px 0",
                background: "#fff",
                color: "#e7a721",
                padding: "8px 10px",
                borderRadius: 7,
                fontWeight: 500,
                fontSize: "1.04em"
              }}>
                Fitness app connected! <span role="img" aria-label="run">✔️</span>
              </div>
              <button
                className="btn"
                style={{
                  background: "#F5A623",
                  color: "#fff",
                  marginBottom: 8,
                  fontWeight: 500
                }}
                onClick={() => setCorrelationVisible(v => !v)}
              >
                {correlationVisible ? "Hide Correlation" : "Show Sample Correlation"}
              </button>
              {correlationVisible && (
                <div style={{
                  marginTop: 13,
                  width: "100%",
                  background: "#fffbe6",
                  borderRadius: 9,
                  padding: "11px 9px 4px 9px"
                }}>
                  <div style={{ color: "#F5A623", fontWeight: 600, marginBottom: 7 }}>
                    Steps vs. Mood Chart
                  </div>
                  {/* Mock chart: steps and mood per day */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 6, marginBottom: 9 }}>
                    {mockData.days.map((day, idx) => (
                      <div key={day} style={{ textAlign: "center" }}>
                        <div
                          style={{
                            height: (mockData.steps[idx] / 200), // simple normalization for demo
                            width: 13,
                            background: "#50E3C2",
                            borderRadius: 4,
                            marginBottom: 2
                          }}
                          title={`Steps: ${mockData.steps[idx]}`}
                        />
                        <div
                          style={{
                            height: (mockData.mood[idx] * 7),
                            width: 7,
                            background: "#f5a623",
                            borderRadius: 3,
                            marginBottom: 1,
                            marginLeft: "auto",
                            marginRight: "auto"
                          }}
                          title={`Mood: ${mockData.mood[idx]}/5`}
                        />
                        <div style={{ fontSize: "0.93em", color: "#A3A3A3" }}>{day}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "0.98em", color: "#114" }}>
                    <span style={{ color: "#50E3C2" }}>↑ Steps</span> &mdash; 
                    <span style={{ color: "#F5A623", marginLeft: 11 }}>Mood</span>
                    <br />
                    <span style={{ color: "#999", fontSize: "0.91em" }}>
                      "Higher activity often links to higher mood."
                    </span>
                  </div>
                </div>
              )}
              <button
                className="btn"
                style={{ background: "#F5A623", color: "#fff", marginTop: 10 }}
                onClick={() => { setFitnessConnected(false); setCorrelationVisible(false); }}
              >
                Disconnect
              </button>
            </>
          )}
        </section>
      </div>
      <div style={{ marginTop: 43, color: "#8fa2b7", fontSize: "1em", textAlign: "center" }}>
        These integration features are illustrative only. Future versions will connect to real-life APIs for even smarter productivity!
      </div>
    </div>
  );
}

export default CrossLifeSync;
