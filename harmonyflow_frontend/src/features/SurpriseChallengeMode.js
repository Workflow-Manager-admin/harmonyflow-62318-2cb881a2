import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * SurpriseChallengeMode ("Spin the Compass")
 * Randomizes and displays a daily challenge, with a spinning animation.
 */
export default function SurpriseChallengeMode() {
  const [challenge, setChallenge] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const POOL = [
    "Try a 5-min mindfulness exercise 🌱",
    "Compliment a stranger today 🤝",
    "Sketch something that reflects your mood 🎨",
    "Organize your desk or digital space 🧹",
    "Write a 3-sentence story 📝",
    "Step outside and notice 3 new things 🚶‍♂️",
    "Message someone you haven't talked to lately 📱"
  ];

  function handleSpin() {
    setSpinning(true);
    setTimeout(() => {
      const idx = Math.floor(Math.random() * POOL.length);
      setChallenge(POOL[idx]);
      setSpinning(false);
    }, 900);
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      padding: 36,
      marginTop: 35,
      textAlign: "center",
      maxWidth: 420,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#F5A623", fontWeight: 600, margin: "0 0 11px" }}>Spin the Compass</h2>
      <div style={{ fontSize: 17, minHeight: 40, margin: "18px 0" }}>
        {spinning ? (
          <span style={{
            display: "inline-block",
            animation: "spincompass 0.9s linear",
            fontSize: 40
          }}>
            🧭
            <style>{`
              @keyframes spincompass { 
                0% {transform: rotate(0deg)} 
                100% {transform: rotate(1080deg)}
              }
            `}</style>
          </span>
        ) : challenge ? (
          <>
            <b>Surprise Challenge:</b><br />
            <span style={{ fontSize: 24 }}>{challenge}</span>
          </>
        ) : (
          <>Feeling lucky? Spice up your day with a challenge!</>
        )}
      </div>
      <button className="btn btn-large"
        style={{ background: "#F5A623", color: "#fff", borderRadius: 6 }}
        onClick={handleSpin}
        disabled={spinning}
      >
        Spin the Compass
      </button>
    </div>
  );
}
