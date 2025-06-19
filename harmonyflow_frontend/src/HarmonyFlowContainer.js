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
/**
 * NavBar component - Categorized drop-down navigation for major features.
 */
function NavBar() {
  const route = useLocation();

  // Define nav categories: Each has a label, icon, and array of items.
  const NAV_CATEGORIES = [
    {
      label: "Core",
      icon: "🏠",
      items: [
        FEATURE_PAGES[0], // Dashboard 
      ],
    },
    {
      label: "Personal Growth",
      icon: "🌿",
      items: [
        FEATURE_PAGES[1], // Spin the Compass
        FEATURE_PAGES[6], // Creativity Capsules
        FEATURE_PAGES[10], // Challenge Capsules
        FEATURE_PAGES[8], // Emergency Detox
        FEATURE_PAGES[3], // Global Impact
      ],
    },
    {
      label: "Community & Social",
      icon: "🤝",
      items: [
        FEATURE_PAGES[2], // Local Tribes
        FEATURE_PAGES[9], // Biz Partners
        FEATURE_PAGES[4], // Tournaments
        FEATURE_PAGES[5], // Story Circles
      ],
    },
    {
      label: "Wellness & Self",
      icon: "🧘",
      items: [
        FEATURE_PAGES[7], // Mood-Reflector AI
      ],
    }
  ];

  // Navbar styling + drop-down logic
  const [openCat, setOpenCat] = React.useState(null);

  // Handle click outside for dropdown close
  React.useEffect(() => {
    function handler(e) {
      if (!e.target.closest(".nav-dropdown")) setOpenCat(null);
    }
    if (openCat !== null)
      document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openCat]);

  // Determines if a navitem should appear active.
  function isItemActive(item) {
    return (
      route.pathname === item.path ||
      (item.path === "/" && route.pathname === "/")
    );
  }

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
        {/* Logo */}
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
        {/* CATEGORIES - Drop-down Menus */}
        <div
          style={{
            display: "flex",
            gap: "7px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {NAV_CATEGORIES.map((cat, i) => {
            // Single-item category (Dashboard): no dropdown
            if (cat.items.length === 1) {
              const item = cat.items[0];
              return (
                <Link
                  key={cat.label}
                  to={item.path}
                  style={{
                    textDecoration: "none",
                    color: isItemActive(item) ? "#fff" : "#e6e9ee",
                    background: isItemActive(item) ? "var(--secondary)" : "transparent",
                    padding: "8px 18px",
                    margin: "0 0 0 2px",
                    borderRadius: "7px",
                    fontWeight: 600,
                    fontSize: 17,
                    transition: "background .19s,color .14s",
                    outline: "none",
                    border: "none",
                    boxShadow: isItemActive(item)
                      ? "0 2px 9px #50e3c216"
                      : undefined,
                    letterSpacing: ".01em",
                    display: "flex",
                    alignItems: "center",
                    minWidth: 110,
                  }}
                >
                  {cat.icon} <span style={{ marginLeft: 8 }}>{item.label.replace("🏠 ", "")}</span>
                </Link>
              );
            }
            // Group (with dropdown)
            return (
              <div
                className="nav-dropdown"
                style={{
                  position: "relative",
                  marginLeft: 2,
                  userSelect: "none",
                  zIndex: 12,
                  minWidth: 0,
                  fontWeight: 500
                }}
                key={cat.label}
                tabIndex={0}
                onFocus={() => setOpenCat(i)}
                onBlur={e => {
                  // Only close dropdown if focus moves outside both button and dropdown menu
                  // Use relatedTarget to detect focus moving to child
                  const current = e.currentTarget;
                  if (!current.contains(e.relatedTarget)) setOpenCat(openCat === i ? null : openCat);
                }}
                onKeyDown={e => {
                  // Allow keyboard open, ESC, arrow key navigation
                  if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpenCat(i);
                    // Focus first link in dropdown after opening
                    setTimeout(() => {
                      const menu = e.currentTarget.querySelector('[role="listbox"]');
                      if (menu) {
                        const firstLink = menu.querySelector('a, [tabindex="0"]');
                        if (firstLink) firstLink.focus();
                      }
                    }, 0);
                  } else if (e.key === "Escape") {
                    setOpenCat(null);
                    e.currentTarget.querySelector("button").focus();
                  } else if (e.key === "Tab" && openCat === i) {
                    setOpenCat(null);
                  }
                }}
              >
                <button
                  style={{
                    background: "transparent",
                    color:
                      cat.items.some(isItemActive) ? "#fff" : "#e6e9ee",
                    borderRadius: "7px",
                    border: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    padding: "8px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    cursor: "pointer",
                    minWidth: 120,
                    transition: "background .12s,color .16s",
                    boxShadow:
                      cat.items.some(isItemActive)
                        ? "0 2px 9px #50e3c216"
                        : undefined,
                    outline: "none",
                    position: "relative"
                  }}
                  onClick={() => setOpenCat(openCat === i ? null : i)}
                  aria-haspopup="listbox"
                  aria-expanded={openCat === i}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span style={{
                    marginLeft: 6,
                    display: "inline-block",
                    transition: "transform 0.13s",
                    transform: openCat === i ? "rotate(180deg)" : "rotate(0deg)"
                  }}>▼</span>
                </button>
                {/* Drop-down */}
                <div
                  style={{
                    display: openCat === i ? "block" : "none",
                    background: "#fff",
                    minWidth: 178,
                    borderRadius: 10,
                    boxShadow: "0 6px 30px 0 #4445a220, 0 1.5px 3px #76839419",
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    marginTop: 8,
                    overflow: "hidden"
                  }}
                  role="listbox"
                  tabIndex={-1}
                >
                  {/* Drop-down items */}
                  {cat.items.map(item => (
                    <Link
                      key={item.path}
                      to={item.path}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "11px 21px 10px 24px",
                        textDecoration: "none",
                        color: isItemActive(item)
                          ? "var(--primary)"
                          : "#344557",
                        background: isItemActive(item)
                          ? "#eaf6fc"
                          : "transparent",
                        fontWeight: isItemActive(item) ? 700 : 500,
                        fontSize: 15.5,
                        lineHeight: 1.16,
                        transition: "background .12s,color .13s",
                        border: "none",
                        borderLeft: isItemActive(item)
                          ? "4px solid var(--accent)"
                          : "4px solid transparent",
                      }}
                      tabIndex={0}
                      onClick={() => setOpenCat(null)}
                    >
                      <span style={{ opacity: .82, minWidth: 27, fontSize: 17 }}>{item.label.match(/^.\s/) ? item.label.slice(0,2) : ""}</span>
                      <span>{item.label.replace(/^.\s/, "")}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
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
