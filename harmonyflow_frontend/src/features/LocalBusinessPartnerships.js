import React, { useState } from "react";

/**
 * LocalBusinessPartnerships
 * Interactive: allows marking offers as redeemed.
 */
// PUBLIC_INTERFACE
const partners = [
  { name: "Harmony Yoga Studio", offer: "20% off a wellness class" },
  { name: "GreenBites Cafe", offer: "Free herbal tea with healthy meal" }
];

export default function LocalBusinessPartnerships() {
  const [redeemed, setRedeemed] = useState([false, false]);
  function handleRedeem(idx) {
    setRedeemed(arr => arr.map((r, i) => i === idx ? true : r));
  }
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
      padding: 36,
      marginTop: 30,
      maxWidth: 420,
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ color: "#50E3C2", fontWeight: 600, margin: "0 0 12px" }}>Local Business Partnerships</h2>
      <div style={{ marginBottom: 10, fontSize: 15 }}>Unlock and redeem offers for positive habits in your area!</div>
      <ul>
        {partners.map((b, i) => (
          <li key={i} style={{ marginBottom: 14, color: "#4A90E2" }}>
            <b>{b.name}</b>: <span style={{ color: "#222" }}>{b.offer}</span>
            <button className="btn"
              style={{
                background: redeemed[i] ? "#eee" : "#50E3C2",
                color: redeemed[i] ? "#aaa" : "#fff",
                borderRadius: 5,
                marginLeft: 14,
                padding: "5px 12px",
                fontSize: 14
              }}
              disabled={redeemed[i]}
              onClick={() => handleRedeem(i)}
            >
              {redeemed[i] ? "Redeemed" : "Redeem"}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ color: "#768394", fontSize: 13, marginTop: 13 }}>
        Geo-matched offers coming soon.
      </div>
    </div>
  );
}
