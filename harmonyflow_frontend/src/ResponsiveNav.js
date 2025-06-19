// PUBLIC_INTERFACE
import React, { useState, useRef, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * ResponsiveNav (Premium Dropdown UX)
 * 
 * - Groups feature pages into categorized dropdowns (Productivity, Self-Insight, Integrations, Reports)
 * - Enhanced accessible dropdowns: fully keyboard navigable, touch-optimized
 * - Responsive for desktop/mobile, premium styled, clear focus indicators
 * - Desktop: Hover/tap/click. Keyboard arrow/Esc navigation.
 * - Mobile: Drawer menu, expandable categories, touch-friendly
 */
// --- Category/feature link mapping from task context ---
const NAV_CATEGORIES = [
  {
    label: "Productivity",
    emoji: "🚀",
    items: [
      {
        label: "Dynamic Goal Evolution Engine",
        to: "/goal-evolution",
        desc: "AI-driven goal suggestions & evolution",
      },
      {
        label: "AI Scheduler & Time Oracle",
        to: "/", // Root dashboard for now, could deep-link in future
        desc: "Intelligent schedule & burnout prediction",
      },
      {
        label: "Personality-Based Productivity Archetype",
        to: "/archetype-quiz",
        desc: "Quiz for your productivity persona",
      },
      {
        label: "Flow State Induction System",
        to: "/flow-state-induction",
        desc: "Music, lighting, and flow hacks",
      },
      {
        label: "Emotion-Aware Task Prioritization",
        to: "/emotion-task-prioritization",
        desc: "Prioritize tasks by mood/emotion",
      },
    ],
  },
  {
    label: "Self-Insight",
    emoji: "🧠",
    items: [
      {
        label: "Mood & Cognitive State Tracker",
        to: "/", // Root dashboard, can go to a dedicated page in future
        desc: "Log and visualize emotional trends",
      },
      {
        label: "Attention Span Heatmap",
        to: "/attention-heatmap",
        desc: "Visualize attention/focus hotspots",
      },
      {
        label: "Whisper Journal",
        to: "/whisper-journal",
        desc: "Voice & AI-powered journaling",
      },
      {
        label: "AI Life Coach",
        to: "/", // Root dashboard (contains Coach), could deep-link later
        desc: "AI advice, progress, self-care",
      },
      {
        label: "MindMesh Sparks – AI Micro-Coaching",
        to: "/sparks-micro-coaching",
        desc: "Real-time AI productivity nudges",
      },
    ],
  },
  {
    label: "Integrations",
    emoji: "🔗",
    items: [
      {
        label: "Cross-Life Synchronization",
        to: "/cross-life-sync",
        desc: "Connect Email, Social, Fitness",
      },
      {
        label: "AI Model Integration",
        to: "/", // Not a page, but promote in dashboard
        desc: "AI everywhere in your workflow",
      },
      {
        label: "API for frontend and integrations",
        to: "/", // Not a navigable page; relevant for docs/backend
        desc: "Easily connect 3rd-party tools",
      },
    ],
  },
  {
    label: "Reports & Portfolio",
    emoji: "📊",
    items: [
      {
        label: "KPI & Focus Metrics",
        to: "/", // Root dashboard (KPIs), no separate route
        desc: "Track sleep, focus, habits, goals",
      },
      {
        label: "Life Portfolio Builder",
        to: "/life-portfolio",
        desc: "Auto-generated month summary",
      },
      {
        label: "Event Life",
        to: "/event-life",
        desc: "Gallery of milestones and history",
      },
    ],
  },
];

const GENERAL_LINKS = [
  {
    label: "Dashboard",
    emoji: "🏠",
    to: "/",
    className: "btn btn-outline",
    desc: "Main hub, quick overview",
  },
];

// --- Utility to determine if nav is visible route (used for nav-active highlight) ---
function isCurrentRoute(location, to) {
  if (!to || to === "/") return location.pathname === "/" || location.pathname === "";
  return location.pathname === to;
}

// --- Desktop Dropdown Nav ---
function DesktopNav({ location }) {
  // Dropdown control state: which (if any) dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navBarRef = useRef();

  // a11y: close dropdowns on route change or blur
  useLayoutEffect(() => {
    setDropdownOpen(null);
  }, [location.pathname]);

  // Accessible dropdown menu navigation
  function handleDropdownKey(e, idx) {
    if (e.key === "Enter" || e.key === " ") {
      setDropdownOpen(dropdownOpen === idx ? null : idx);
      e.preventDefault();
    }
    if (e.key === "ArrowDown" && navBarRef.current) {
      // Focus first dropdown link
      setDropdownOpen(idx);
      setTimeout(() => {
        const dropdown = navBarRef.current.querySelectorAll('.nav-dropdown')[idx];
        if (dropdown) {
          const link = dropdown.querySelector('a,button');
          if (link) link.focus();
        }
      }, 16);
      e.preventDefault();
    }
    if (e.key === "ArrowUp") {
      setDropdownOpen(null);
      e.preventDefault();
    }
    if (e.key === "Tab") setDropdownOpen(null);
    if (e.key === "Escape") setDropdownOpen(null);
  }

  return (
    <div className="nav-scroll-container" style={{ position: "relative", flex: 1 }}>
      <div
        className="nav-inner"
        ref={navBarRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          width: "100%",
        }}
      >
        {/* Dashboard & always-visible general links */}
        {GENERAL_LINKS.map((lnk) => (
          <Link
            key={lnk.to}
            to={lnk.to}
            className={lnk.className + (isCurrentRoute(location, lnk.to) ? " nav-active" : "")}
            style={{
              fontWeight: 700,
              fontSize: "1.083em",
              borderRadius: 13,
              minWidth: 128,
            }}
            tabIndex={0}
            aria-current={isCurrentRoute(location, lnk.to) ? "page" : undefined}
            aria-label={lnk.label + " navigation"}
            title={lnk.desc}
          >
            <span style={{ marginRight: 6 }}>{lnk.emoji}</span>
            {lnk.label}
          </Link>
        ))}
        {/* Categorized Premium Dropdowns */}
        {NAV_CATEGORIES.map((cat, idx) => (
          <div
            key={cat.label}
            style={{
              position: "relative",
              minWidth: 140,
              display: "flex",
              alignItems: "center",
              zIndex: dropdownOpen === idx ? 1021 : 10,
            }}
            onMouseLeave={() => setDropdownOpen(dropdownOpen === idx ? null : dropdownOpen)}
            onTouchStart={() => setDropdownOpen(idx)}
          >
            <button
              className="btn btn-large"
              aria-haspopup="true"
              aria-expanded={dropdownOpen === idx}
              aria-controls={`nav-dropdown-${idx}`}
              aria-label={`Show features under ${cat.label}`}
              style={{
                background: dropdownOpen === idx
                  ? "linear-gradient(99deg,#437AFF 30%,#50E3C2 100%)"
                  : "linear-gradient(97deg,#e6f0ff 20%,#edfff8 100%)",
                color: dropdownOpen === idx ? "#fff" : "#4A90E2",
                borderRadius: 16,
                fontWeight: 700,
                minWidth: 136,
                fontSize: "1.09em",
                boxShadow: dropdownOpen === idx ? "0 2px 25px #4775f511" : undefined,
                outline: dropdownOpen === idx ? "2.5px solid var(--accent)" : undefined,
                letterSpacing: 0.011,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                border: "none",
                marginRight: 2
              }}
              onClick={() => setDropdownOpen(dropdownOpen === idx ? null : idx)}
              onKeyDown={e => handleDropdownKey(e, idx)}
              onBlur={e => setTimeout(() => { if (!e.currentTarget.contains(document.activeElement)) setDropdownOpen(null); }, 120)}
              type="button"
              tabIndex={0}
            >
              <span style={{ marginRight: 8 }}>{cat.emoji}</span>
              {cat.label}
              <span style={{ marginLeft: 8, fontSize: "0.97em" }} aria-hidden="true">▼</span>
            </button>
            {/* Dropdown menu */}
            {dropdownOpen === idx && (
              <div
                id={`nav-dropdown-${idx}`}
                className="nav-dropdown"
                style={{
                  position: "absolute",
                  top: "120%",
                  left: 0,
                  minWidth: 244,
                  maxWidth: 340,
                  background: "#fff",
                  boxShadow: "0 8px 37px #4A90E244",
                  borderRadius: 13,
                  border: "1.4px solid #e0eafe",
                  marginTop: 5,
                  zIndex: 1022,
                  animation: "nav-dropdown .21s cubic-bezier(.44,.13,.23,1.04)",
                }}
                onMouseLeave={() => setDropdownOpen(null)}
                onBlur={e => setTimeout(() => { if (!e.currentTarget.contains(document.activeElement)) setDropdownOpen(null); }, 80)}
                tabIndex={-1}
                role="menu"
              >
                {cat.items.map((item, itemIdx) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className={
                      "btn btn-outline" +
                      (isCurrentRoute(location, item.to) ? " nav-active" : "")
                    }
                    style={{
                      background: "none",
                      color: "var(--primary-light)",
                      textAlign: "left",
                      border: "none",
                      borderRadius: 0,
                      boxShadow: "none",
                      padding: "14px 19px 11px 17px",
                      width: "100%",
                      margin: 0,
                      fontSize: "1.085em",
                      fontWeight: 600,
                      minWidth: "unset",
                      display: "flex",
                      alignItems: "baseline",
                      outline: "none",
                      borderLeft: isCurrentRoute(location, item.to)
                        ? "4px solid var(--primary-light)"
                        : "4px solid transparent"
                    }}
                    role="menuitem"
                    aria-current={isCurrentRoute(location, item.to) ? "page" : undefined}
                    aria-label={item.label}
                    title={item.desc}
                    tabIndex={0}
                    onClick={() => setDropdownOpen(null)}
                    onKeyDown={e => {
                      if (e.key === "ArrowDown" && itemIdx < cat.items.length - 1) {
                        e.preventDefault();
                        e.target.parentNode.children[itemIdx + 1].focus();
                      } else if (e.key === "ArrowUp" && itemIdx > 0) {
                        e.preventDefault();
                        e.target.parentNode.children[itemIdx - 1].focus();
                      } else if (e.key === "Escape" || e.key === "Tab") {
                        setDropdownOpen(null);
                      }
                    }}
                  >
                    <span style={{ flex: "none", minWidth: 7 }}>&nbsp;</span>
                    <span style={{
                      flex: "1 1 75%",
                      fontWeight: 700,
                      color: isCurrentRoute(location, item.to) ? "var(--primary-light)" : "#1976cf",
                      letterSpacing: 0.01
                    }}>{item.label}</span>
                    <span
                      style={{
                        flex: "0 0 30%",
                        color: "#7d8bb1",
                        marginLeft: 13,
                        fontWeight: 400,
                        fontSize: "0.97em",
                        whiteSpace: "nowrap",
                      }}
                    >{item.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Mobile Nav: Drawer with expanded categorized sections ---
function MobileNav({ location }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: 12 }}>
      {/* Hamburger Button */}
      <button
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="btn"
        style={{
          background: "linear-gradient(96deg,#4A90E2 78%,#50E3C2 100%)",
          color: "#fff",
          borderRadius: 12,
          fontWeight: 800,
          fontSize: "1.19em",
          minWidth: 52,
          padding: "11px 17px",
          cursor: "pointer",
          border: "none",
          boxShadow: "0 2px 16px #437aff20",
        }}
        onClick={() => setOpen(v => !v)}
        tabIndex={0}
        type="button"
      >
        <span style={{ marginRight: 7 }}>{open ? "✕" : "☰"}</span>
      </button>
      {/* Mobile Drawer Menu */}
      {open && (
        <>
          <div
            className="nav-mobile-drawer"
            style={{
              position: "fixed",
              top: 0, left: 0,
              width: "90vw", maxWidth: 390,
              height: "100vh",
              background: "#fff",
              boxShadow: "2px 0 44px #26418332",
              zIndex: 2110,
              borderTopRightRadius: 23,
              borderBottomRightRadius: 21,
              overflowY: "auto",
              padding: "27px 12px 29px 15px",
              animation: "navMobileIn .22s cubic-bezier(.48,.15,.19,1) forwards",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
            tabIndex={-1}
          >
            <div style={{
              fontSize: "1.29em",
              fontWeight: 750,
              color: "var(--primary-light)",
              letterSpacing: ".035em",
              margin: "0 0 11px 7px",
              fontFamily: "var(--display-font)",
            }}>
              Navigation
            </div>
            {/* General Links */}
            <div style={{ marginBottom: 17 }}>
              {GENERAL_LINKS.map(lnk => (
                <Link
                  key={lnk.to}
                  to={lnk.to}
                  className={"btn btn-outline" + (isCurrentRoute(location, lnk.to) ? " nav-active" : "")}
                  style={{
                    display: "block",
                    background: isCurrentRoute(location, lnk.to)
                      ? "linear-gradient(96deg,#437AFF 83%,#50E3C2 100%)"
                      : "none",
                    color: isCurrentRoute(location, lnk.to) ? "#fff" : "#4A90E2",
                    fontWeight: 700,
                    borderRadius: 13,
                    marginBottom: 5,
                    padding: "13px 15px",
                    border: "none"
                  }}
                  aria-current={isCurrentRoute(location, lnk.to) ? "page" : undefined}
                  aria-label={lnk.label}
                  title={lnk.desc}
                  onClick={() => setOpen(false)}
                >
                  <span style={{ marginRight: 6 }}>{lnk.emoji}</span>
                  {lnk.label}
                </Link>
              ))}
            </div>
            {/* Categorized Sections */}
            {NAV_CATEGORIES.map((cat, idx) => (
              <details key={cat.label} open>
                <summary
                  style={{
                    fontWeight: 800,
                    color: "#1976cf",
                    fontSize: "1.12em",
                    marginBottom: 3,
                    cursor: "pointer",
                    letterSpacing: ".015em",
                    outline: "none",
                  }}
                  aria-label={`Expand ${cat.label} features`}
                >
                  <span style={{ marginRight: 7 }}>{cat.emoji}</span>
                  {cat.label}
                </summary>
                <nav>
                  {cat.items.map(item => (
                    <Link
                      key={item.label}
                      to={item.to}
                      className={"btn btn-outline" + (isCurrentRoute(location, item.to) ? " nav-active" : "")}
                      style={{
                        display: "block",
                        background: isCurrentRoute(location, item.to)
                          ? "linear-gradient(98deg,#437AFF 60%,#50E3C2 94%)"
                          : "none",
                        color: isCurrentRoute(location, item.to) ? "#fff" : "#327",
                        fontWeight: isCurrentRoute(location, item.to) ? 700 : 600,
                        borderRadius: 13,
                        marginBottom: 3,
                        padding: "12px 16px",
                        fontSize: "1em",
                        border: "none",
                        textAlign: "left"
                      }}
                      aria-current={isCurrentRoute(location, item.to) ? "page" : undefined}
                      aria-label={item.label}
                      tabIndex={0}
                      title={item.desc}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                      <span style={{
                        color: "#94aac5",
                        fontWeight: 400,
                        fontSize: "0.96em",
                        marginLeft: 10,
                        whiteSpace: "nowrap"
                      }}>
                        {item.desc}
                      </span>
                    </Link>
                  ))}
                </nav>
              </details>
            ))}
            <div style={{ marginTop: 32, color: "#C7C7E7", fontSize: ".96em", paddingLeft: 3 }}>
              <span style={{ color: "#F5A623" }}>●</span>
              &nbsp; HarmonyFlow Navigation
            </div>
          </div>
          <div
            tabIndex={-1}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              width: "100vw", height: "100vh",
              background: "rgba(60, 70, 100, 0.19)",
              zIndex: 2100,
            }}
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
          />
          <style>{`
            @keyframes navMobileIn {
              from { transform: translateX(-66px) scale(.94); opacity:0.16;}
              to { transform: translateX(0) scale(1); opacity:1;}
            }
          `}</style>
        </>
      )}
    </div>
  );
}

// --- Responsive Controller: chooses desktop or mobile nav ---
function ResponsiveNav() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useLayoutEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 700);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile
    ? <MobileNav location={location} />
    : <DesktopNav location={location} />;
}

export default ResponsiveNav;
