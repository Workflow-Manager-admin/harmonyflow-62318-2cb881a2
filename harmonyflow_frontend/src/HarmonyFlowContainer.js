import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";

import SurpriseChallengeMode from "./features/SurpriseChallengeMode";
import LocalTribeMatching from "./features/LocalTribeMatching";
import GlobalImpactMeter from "./features/GlobalImpactMeter";
import SeasonalTournaments from "./features/SeasonalTournaments";
import AnonymousStoryCircles from "./features/AnonymousStoryCircles";
import CreativityCapsules from "./features/CreativityCapsules";
import MoodReflectorAI from "./features/MoodReflectorAI";
import EmergencyDetoxMode from "./features/EmergencyDetoxMode";
import LocalBusinessPartnerships from "./features/LocalBusinessPartnerships";
import ChallengeCapsules from "./features/ChallengeCapsules";
import ClassicDashboard from "./features/ClassicDashboard";

// Theme Colors (light palette from App.css)
const COLORS = {
  primary: "#4A90E2",
  secondary: "#50E3C2",
  accent: "#F5A623",
  text: "#222",
  background: "#F7FAFC",
  card: "#fff",
  border: "#EEF2F7",
  subtleText: "#768394",
};

// Navigation: define route meta for features
const FEATURE_PAGES = [
  {
    key: "dashboard",
    label: "🏠 Dashboard",
    path: "/",
    element: <ClassicDashboard />,
  },
  {
    key: "spin",
    label: "🎲 Spin the Compass",
    path: "/spin",
    element: <SurpriseChallengeMode />,
  },
  {
    key: "tribe",
    label: "🤝 Local Tribes",
    path: "/tribe",
    element: <LocalTribeMatching />,
  },
  {
    key: "impact",
    label: "🌎 Global Impact",
    path: "/impact",
    element: <GlobalImpactMeter />,
  },
  {
    key: "tournament",
    label: "🏅 Tournaments",
    path: "/tournaments",
    element: <SeasonalTournaments />,
  },
  {
    key: "stories",
    label: "🗣️ Story Circles",
    path: "/stories",
    element: <AnonymousStoryCircles />,
  },
  {
    key: "creativity",
    label: "🎨 Creativity Capsules",
    path: "/creativity",
    element: <CreativityCapsules />,
  },
  {
    key: "reflector",
    label: "🧑‍💻 Mood-Reflector AI",
    path: "/reflector",
    element: <MoodReflectorAI />,
  },
  {
    key: "detox",
    label: "🔕 Detox Mode",
    path: "/detox",
    element: <EmergencyDetoxMode />,
  },
  {
    key: "biz",
    label: "🏢 Biz Partners",
    path: "/biz",
    element: <LocalBusinessPartnerships />,
  },
  {
    key: "challengeCapsules",
    label: "⏳ Challenge Capsules",
    path: "/challenge-capsules",
    element: <ChallengeCapsules />,
  },
];

// Navigation component
function NavBar() {
  const route = useLocation();
  return (
    <nav className="navbar" style={{
      background: COLORS.primary,
      boxShadow: "0 2px 12px 0 rgba(74,144,226,0.04)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      marginBottom: 14
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div className="logo">
          <span className="logo-symbol" style={{ color: COLORS.accent, fontSize: 22 }}>🧭</span>
          HarmonyFlow
        </div>
        <div>
          {FEATURE_PAGES.map(tab => (
            <Link
              key={tab.key}
              to={tab.path}
              style={{
                textDecoration: "none",
                marginRight: 12,
                color: route.pathname === tab.path || (tab.path === "/" && route.pathname === "/") ? "#fff" : "#e6e9ee",
                background: route.pathname === tab.path || (tab.path === "/" && route.pathname === "/") ? COLORS.secondary : "transparent",
                padding: "7px 17px",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: 15,
                transition: "background .17s"
              }}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
export default function HarmonyFlowContainer() {
  return (
    <div className="app" style={{
      minHeight: "100vh",
      background: COLORS.background,
      color: COLORS.text
    }}>
      <NavBar />
      <main className="container" style={{ paddingTop: 86, paddingBottom: 25 }}>
        <Routes>
          {FEATURE_PAGES.map(page => (
            <Route path={page.path} element={page.element} key={page.key} />
          ))}
          {/* 404 fallback */}
          <Route path="*" element={<div style={{ marginTop: 40, color: COLORS.accent }}><b>404:</b> Page not found.</div>} />
        </Routes>
        <footer style={{ marginTop: 56, fontSize: 14, color: COLORS.subtleText, textAlign: "center" }}>
          <span>
            Designed for modern, purpose-driven productivity &middot; HarmonyFlow &copy; {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </div>
  );
}
