import React, { useRef, useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * ResponsiveNav
 *
 * Displays navigation links in a horizontally scrollable container; if there are too many links
 * for the visible width, overflows are collected into a "More" dropdown.
 * Adjusts responsively and keeps navbar visually coherent at any desktop width.
 */

// Navigation configuration: label, path, link styles
const NAV_LINKS = [
  {
    label: "Dashboard",
    to: "/",
    className: "btn btn-outline",
    style: { fontWeight: 600, borderRadius: 13 }
  },
  {
    label: "Dynamic Goal Evolution",
    to: "/goal-evolution",
    className: "btn btn-accent",
    style: { fontWeight: 600, borderRadius: 15 }
  },
  {
    label: "Attention Heatmap",
    to: "/attention-heatmap",
    className: "btn btn-outline",
    style: { color: "var(--primary-light)", borderRadius: 15 }
  },
  {
    label: "Archetype Quiz",
    to: "/archetype-quiz",
    className: "btn btn-outline",
    style: { color: "var(--primary-light)", borderRadius: 15 }
  },
  {
    label: "Event Chain Tracker",
    to: "/event-chain",
    className: "btn btn-large",
    style: { background: "var(--primary-light)", color: "#fff", borderRadius: 15 }
  },
  {
    label: "Life Event Chain Tracker",
    to: "/life-event-chain",
    className: "btn btn-large",
    style: { background: "var(--base-light)", color: "#fff", borderRadius: 15 }
  },
  {
    label: "Sparks Micro-Coaching",
    to: "/sparks-micro-coaching",
    className: "btn btn-accent",
    style: { fontWeight: 700, borderRadius: 15 }
  },
  {
    label: "Flow State Induction",
    to: "/flow-state-induction",
    className: "btn btn-large",
    style: { background: "linear-gradient(98deg,#437AFF 21%,#50E3C2 100%)", color: "#fff", borderRadius: 15 }
  },
  {
    label: "Cross-Life Sync",
    to: "/cross-life-sync",
    className: "btn btn-large",
    style: { background: "linear-gradient(98deg,#50E3C2 10%,#4A90E2 94%)", color: "#fff", borderRadius: 15 }
  },
  {
    label: "Task Prioritization",
    to: "/emotion-task-prioritization",
    className: "btn btn-large",
    style: { background: "linear-gradient(98deg,#b77fff 10%,#50E3C2 94%)", color: "#fff", borderRadius: 15 }
  },
  {
    label: "Whisper Journal",
    to: "/whisper-journal",
    className: "btn btn-accent",
    style: { background: "linear-gradient(96deg,#4A90E2 60%,#50E3C2 100%)", color: "#fff", borderRadius: 15 }
  },
  {
    label: "Life Portfolio",
    to: "/life-portfolio",
    className: "btn btn-large",
    style: { background: "linear-gradient(95deg,#F5A623 5%,#4A90E2 100%)", color: "#fff", fontWeight: 700, borderRadius: 15 }
  }
];

// PUBLIC_INTERFACE
function ResponsiveNav() {
  const containerRef = useRef();
  const [overflowed, setOverflowed] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [visible, setVisible] = useState(NAV_LINKS.map((_, i) => i));
  const location = useLocation();

  // Determine which links fit and which must go to "More"
  useLayoutEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current) return;

      // Get link nodes & container width
      const children = Array.from(containerRef.current.children).filter(n => n.dataset && n.dataset.index);
      const containerWidth = containerRef.current.offsetWidth;
      let used = 0, fit = [], extra = [];

      // Fit links until we overflow (reserve space for "More" button if needed)
      for (let i = 0; i < NAV_LINKS.length; i++) {
        // For measurement, forcibly show all links, hide More
        if (children[i]) children[i].style.display = "";
      }
      const moreBtnWidth = containerRef.current.querySelector(".nav-more-btn")?.offsetWidth || 60;

      for (let i = 0; i < NAV_LINKS.length; i++) {
        const node = children[i];
        if (!node) continue;
        let nodeWidth = node.offsetWidth;

        // Add node, see if still fits in container (minus More dropdown if needed)
        if (used + nodeWidth + moreBtnWidth > containerWidth) {
          extra.push(i);
        } else {
          fit.push(i);
          used += nodeWidth;
        }
      }
      setVisible(fit);
      setOverflowed(extra);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  // Hide More menu on navigation
  useLayoutEffect(() => {
    setShowMore(false);
  }, [location.pathname]);

  return (
    <div className="nav-scroll-container">
      <div className="nav-inner" ref={containerRef}>
        {NAV_LINKS.map((nav, idx) => (
          <Link
            key={nav.to}
            to={nav.to}
            className={nav.className + (location.pathname === nav.to ? " nav-active" : "")}
            style={{
              ...nav.style,
              marginRight: 8,
              display: visible.includes(idx) ? "" : "none",
              whiteSpace: "nowrap",
              maxWidth: 210,
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
            tabIndex={0}
            aria-current={location.pathname === nav.to ? "page" : undefined}
            data-index={idx}
          >
            {nav.label}
          </Link>
        ))}
        {overflowed.length > 0 && (
          <div className="nav-more-btn" tabIndex={0} onClick={() => setShowMore((v) => !v)} onBlur={() => setTimeout(() => setShowMore(false), 180)}
            style={{
              marginLeft: 6,
              display: "inline-flex",
              alignItems: "center",
              background: "linear-gradient(96deg,#4A90E2 70%,#50E3C2 100%)",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 600,
              fontSize: "1.07em",
              minWidth: 68,
              padding: "11px 17px",
              cursor: "pointer",
              position: "relative",
              border: "none",
              boxShadow: "0 2px 13px #437aff18"
            }}
          >
            More ▼
            {showMore &&
              <div className="nav-more-menu" style={{
                position: "absolute",
                top: "120%",
                right: 0,
                zIndex: 999,
                background: "#fff",
                boxShadow: "0 8px 32px #4A90E244",
                borderRadius: 12,
                minWidth: 190,
                border: "1.2px solid #e0eafe",
                padding: "9px 0",
                marginTop: 5
              }}>
                {overflowed.map(idx => {
                  const nav = NAV_LINKS[idx];
                  return (
                    <Link
                      key={nav.to}
                      to={nav.to}
                      className={"btn btn-outline" + (location.pathname === nav.to ? " nav-active" : "")}
                      style={{
                        ...nav.style,
                        background: "none",
                        color: "var(--primary-light)",
                        display: "block",
                        width: "100%",
                        textAlign: "left",
                        boxShadow: "none",
                        border: "none",
                        borderRadius: 0,
                        padding: "11px 20px",
                        margin: 0,
                        fontWeight: 600,
                        minWidth: "unset"
                      }}
                      tabIndex={0}
                      aria-current={location.pathname === nav.to ? "page" : undefined}
                    >
                      {nav.label}
                    </Link>
                  );
                })}
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponsiveNav;
