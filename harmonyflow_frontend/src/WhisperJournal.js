import React, { useState, useRef } from "react";
import "./App.css";

/**
 * WhisperJournal
 *
 * Voice journaling demo: Record, playback (local), mock AI-driven org (tags, emotion, insights),
 * and privacy-first/offline mode messaging.
 * Accessible at /whisper-journal.
 */

// Utility: Mock "AI" categorizations
function mockAnalyzeAudio(audioBlob) {
  // Return mock tags, emotional tone, and insights (pretend AI processing)
  return {
    tags: ["reflection", "wellbeing", "private"],
    emotion: "Calm & Hopeful",
    insights: [
      "You express positive intention toward personal growth.",
      "A recurring focus: mindfulness and self-care.",
      "Consider exploring what gives you joy this week."
    ]
  };
}

// PUBLIC_INTERFACE
function WhisperJournal() {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [permission, setPermission] = useState(true);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  // Handle start of recording
  const handleStart = async () => {
    setError("");
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setError("Audio recording is not supported in this browser.");
      setPermission(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setAnalyzing(true);
        // Mock AI analysis delay
        setTimeout(() => {
          setAiResult(mockAnalyzeAudio(blob));
          setAnalyzing(false);
        }, 1200);
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      setError("Microphone permission required to record.");
      setPermission(false);
    }
  };

  // Handle stop
  const handleStop = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // Reset demo state
  const handleReset = () => {
    setAudioUrl(null);
    setAudioBlob(null);
    setAiResult(null);
    setRecording(false);
    setPermission(true);
    setError("");
    setAnalyzing(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="container" style={{
      paddingTop: 98, paddingBottom: 60, minHeight: "66vh", maxWidth: 640,
      display: "flex", flexDirection: "column", alignItems: "center"
    }}>
      <div style={{
        background: "#f8fbff",
        borderRadius: 15,
        padding: "37px 33px 25px 33px",
        width: "100%",
        boxShadow: "0 4px 24px #00409114",
        marginBottom: 20
      }}>
        <h1 className="title" style={{ fontSize: "2.13rem", margin: "0 0 13px 0" }}>
          🔊 Whisper Journal: Voice & AI
        </h1>
        <div className="description" style={{ marginBottom: 19 }}>
          Capture and organize your thoughts—just by speaking. <b>Voice journaling</b> meets privacy-first, AI-powered insights. All processing is local: <b>no audio ever leaves your device.</b>
        </div>
        <div style={{ marginBottom: 18, color: "#61a7c5", fontWeight: 500, fontSize: "1.07em" }}>
          Offline mode supported – all voice and AI analysis run in your browser. <span style={{ color: "#b883e3" }}>Your privacy is protected.</span>
        </div>
        {/* Audio Recording Demo */}
        <section style={{ border: "1.5px solid #e4efff", borderRadius: 15, padding: 24, background: "#fff" }}>
          <div style={{ fontWeight: 600, color: "#4A90E2", fontSize: "1.17em", marginBottom: 13 }}>Voice Journal Entry</div>
          {/* Mic/record UI */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
            {!recording && (
              <button
                className="btn btn-large"
                onClick={handleStart}
                style={{ background: "var(--base-light)", color: "#fff", fontWeight: 700, minWidth: 99 }}
                disabled={!permission}
                type="button"
              >
                <span role="img" aria-label="microphone">🎤</span> Start Recording
              </button>
            )}
            {recording && (
              <button
                className="btn btn-large"
                onClick={handleStop}
                style={{
                  background: "#d03b3b", color: "#fff", fontWeight: 700, minWidth: 99,
                  border: "2px solid #e97676", boxShadow: "0 0 5px #ee7d7d90"
                }}
                type="button"
              >
                <span role="img" aria-label="stop">⏹️</span> Stop
              </button>
            )}
            {audioUrl && !recording && (
              <button
                className="btn"
                onClick={handleReset}
                style={{ marginLeft: 6, background: "#a4abd8", color: "#fff" }}
                type="button"
              >
                Record New
              </button>
            )}
            <span style={{
              color: recording ? "#d03b3b" : "#7da0b9",
              marginLeft: 11,
              fontWeight: 600,
              fontSize: "1.09em"
            }}>
              {recording ? "Recording..." : audioUrl ? "Entry Recorded" : ""}
            </span>
          </div>
          {error && <div style={{ color: "#d03b3b", fontWeight: 500, marginBottom: 8 }}>{error}</div>}
          {/* Audio playback */}
          {audioUrl && (
            <audio src={audioUrl} controls style={{ margin: "16px 0 8px 0", width: "97%" }} />
          )}
        </section>
        {/* AI Analysis / Organization */}
        {audioUrl && (
          <section style={{ marginTop: 27 }}>
            <div style={{ fontWeight: 600, color: "#50E3C2", fontSize: "1.13em", marginBottom: 13 }}>
              <span role="img" aria-label="insight">🤖</span> AI-Driven Organization
            </div>
            {analyzing && (
              <div style={{ color: "#4A90E2", fontWeight: 500, fontSize: "1.09em", marginBottom: 13 }}>
                Analyzing your entry...
              </div>
            )}
            {aiResult && !analyzing && (
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 8,
                background: "#eafbfe", borderRadius: 11, padding: "17px 19px"
              }}>
                <div>
                  <b style={{ color: "#4A90E2" }}>Tags:</b> {aiResult.tags.map(tag => (
                    <span key={tag} style={{
                      display: "inline-block", background: "#50E3C2", color: "#fff", borderRadius: 6,
                      padding: "3px 11px", fontWeight: 500, fontSize: "0.98em", marginRight: 7, marginBottom: 2
                    }}
                    >{tag}</span>
                  ))}
                </div>
                <div>
                  <b style={{ color: "#F5A623" }}>Emotional Tone:</b> <span style={{ color: "#b77fff" }}>{aiResult.emotion}</span>
                </div>
                <div>
                  <b style={{ color: "#50E3C2" }}>AI Insights:</b>
                  <ul style={{ marginLeft: 19 }}>
                    {aiResult.insights.map((ins, idx) => (
                      <li key={idx} style={{ color: "#2473ab", marginBottom: 2 }}>{ins}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 13, fontWeight: 500, fontSize: "0.98em", color: "#1a3952" }}>
                  <span role="img" aria-label="lock">🔒</span> All voice data and "AI" analysis are processed <b>100% offline</b> in your browser. Nothing leaves your device.
                </div>
              </div>
            )}
          </section>
        )}
      </div>
      <div style={{
        textAlign: "center", color: "#91b9d5", fontSize: "1em", marginTop: 14, maxWidth: 520
      }}>
        * Demo only – real analysis would need a local/offline Whisper AI model. Your privacy-first journaling, organized and secure!
      </div>
    </div>
  );
}

export default WhisperJournal;
