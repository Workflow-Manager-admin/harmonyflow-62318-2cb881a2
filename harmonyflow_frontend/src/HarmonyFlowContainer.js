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

/**
 * NavBar component - uses Flexbox for alignment and space.
 * List of nav links in a flex grid for even spacing.
 * Sticks to modern, light-dashboard design: accent color for logo, clean hover/active.
 */
function NavBar() {
  const route = useLocation();
  return (
    <nav
      className="navbar"
      style={{
        background: "var(--primary)",
        minHeight: "var(--navbar-height)",
        borderBottom: "1px solid var(--border-color)",
        boxShadow: "0 2px 12px 0 rgba(74,144,226,0.04)",
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 100,
        padding: 0,
        marginBottom: 0,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1100,
          width: "100%",
          margin: "0 auto",
          height: "var(--navbar-height)",
        }}
      >
        <div
          className="logo"
          style={{
            fontFamily: "inherit",
            fontSize: "1.3rem",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: "9px",
            letterSpacing: "0.5px",
            color: "var(--text-on-dark)",
            userSelect: "none",
          }}
        >
          <span
            className="logo-symbol"
            style={{
              color: "var(--accent)",
              fontSize: 26,
              marginRight: 3,
            }}
          >
            🧭
          </span>
          HarmonyFlow
        </div>
        <div
          style={{
            display: "flex",
            gap: "7px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {FEATURE_PAGES.map((tab, i) => (
            <Link
              key={tab.key}
              to={tab.path}
              style={{
                textDecoration: "none",
                color:
                  route.pathname === tab.path ||
                  (tab.path === "/" && route.pathname === "/")
                    ? "#fff"
                    : "#e6e9ee",
                background:
                  route.pathname === tab.path ||
                  (tab.path === "/" && route.pathname === "/")
                    ? "var(--secondary)"
                    : "transparent",
                padding: "8px 18px",
                margin: "0 0 0 2px",
                borderRadius: "7px",
                fontWeight: 500,
                fontSize: 16,
                transition: "background .19s,color .14s",
                outline: "none",
                border: "none",
                boxShadow:
                  route.pathname === tab.path ||
                  (tab.path === "/" && route.pathname === "/")
                    ? "0 2px 9px #50e3c216"
                    : undefined,
                letterSpacing: ".01em",
              }}
              tabIndex={0}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

/**
 * Main app container and feature router.
 * Use consistent container width, padding, and grid.
 */
export default function HarmonyFlowContainer() {
  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        minWidth: 0,
        background: "var(--background)",
        color: "var(--text-color)",
        width: "100vw",
      }}
    >
      <NavBar />
      {/* Top offset for navbar is set by --navbar-height */}
      <main
        className="container"
        style={{
          paddingTop: "calc(var(--navbar-height) + 22px)",
          paddingBottom: "41px",
          maxWidth: 1100,
          minWidth: "auto",
        }}
      >
        <Routes>
          {FEATURE_PAGES.map((page) => (
            <Route path={page.path} element={page.element} key={page.key} />
          ))}
          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div
                style={{
                  marginTop: 54,
                  color: "var(--accent)",
                  fontWeight: 500,
                  fontSize: 20,
                  padding: 22,
                  textAlign: "center",
                }}
              >
                <b>404:</b> Page not found.
              </div>
            }
          />
        </Routes>
        <footer
          style={{
            marginTop: 68,
            fontSize: 14,
            color: "var(--text-secondary)",
            textAlign: "center",
            letterSpacing: "0.01em",
            opacity: 0.87,
          }}
        >
          <span>
            Designed for modern, purpose-driven productivity &middot; HarmonyFlow &copy;{" "}
            {new Date().getFullYear()}
          </span>
        </footer>
      </main>
    </div>
  );
}
