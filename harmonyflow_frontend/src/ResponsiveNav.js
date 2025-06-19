import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * ResponsiveNav
 *
 * Displays navigation links in a horizontally scrollable container.
 * If there are too many to fit, overflows are collected into a modern, accessible "More" dropdown.
 * Handles horizontal scroll and dropdown overflow responsively with premium style and full keyboard accessibility.
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
  const moreBtnRef = useRef();
  const moreMenuRef = useRef();
  const [overflowed, setOverflowed] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [visible, setVisible] = useState(NAV_LINKS.map((_, i) => i));
  const [lastResize, setLastResize] = useState(Date.now());
  const location = useLocation();

  // Overflow logic, recomputed on size/zoom changes
  const checkOverflow = useCallback(() => {
    if (!containerRef.current) return;

    // Get link nodes & container width
    const children = Array.from(containerRef.current.children).filter(n => n.dataset && n.dataset.index);
    const containerWidth = containerRef.current.offsetWidth;
    let used = 0, fit = [], extra = [];

    // Reset display for measurement: show all links
    for (let i = 0; i < NAV_LINKS.length; i++) {
      if (children[i]) children[i].style.display = "";
    }

    // Always reserve space for 'More' button if some links could overflow
    const moreBtnWidth =
      containerRef.current.querySelector(".nav-more-btn")?.offsetWidth
      || 82; // assume generous width

    for (let i = 0; i < NAV_LINKS.length; i++) {
      const node = children[i];
      if (!node) continue;
      let nodeWidth = node.offsetWidth;

      // Account for margin
      let margin = 8;
      if (used + nodeWidth + (extra.length === 0 ? 0 : moreBtnWidth) + margin > containerWidth) {
        extra.push(i);
      } else {
        fit.push(i);
        used += nodeWidth + margin;
      }
    }
    setVisible(fit);
    setOverflowed(extra);
  }, []);

  // Run overflow computation on layout and window/zoom/orientation changes
  useLayoutEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    window.addEventListener("orientationchange", checkOverflow);

    // To robustly detect zoom/font size changes, also re-run periodically for a bit after mount
    const interval = setInterval(() => {
      setLastResize(Date.now());
      checkOverflow();
    }, 1100);
    setTimeout(() => clearInterval(interval), 3500);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      window.removeEventListener("orientationchange", checkOverflow);
      clearInterval(interval);
    };
  }, [checkOverflow]);

  // Hide More dropdown when navigating
  useLayoutEffect(() => {
    setShowMore(false);
  }, [location.pathname]);

  // Keyboard accessibility for the More button/menu
  function handleMoreKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      setShowMore(v => !v);
    } else if (e.key === "ArrowDown" && showMore && moreMenuRef.current) {
      // Focus first menu item
      const links = moreMenuRef.current.querySelectorAll("a,button");
      if (links[0]) links[0].focus();
    } else if (e.key === "Escape") {
      setShowMore(false);
      if (moreBtnRef.current) moreBtnRef.current.focus();
    }
  }

  function handleBlur(e) {
    // Only close if focus moves outside the dropdown and button
    setTimeout(() => {
      if (
        !containerRef.current.contains(document.activeElement) &&
        (!moreMenuRef.current || !moreMenuRef.current.contains(document.activeElement))
      ) {
        setShowMore(false);
      }
    }, 130);
  }

  return (
    <div className="nav-scroll-container" style={{ position: "relative" }}>
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
            aria-label={nav.label}
            data-index={idx}
          >
            {nav.label}
          </Link>
        ))}
        {overflowed.length > 0 && (
          <div
            className="nav-more-btn"
            ref={moreBtnRef}
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={showMore}
            aria-controls="nav-more-menu"
            onKeyDown={handleMoreKey}
            onClick={() => setShowMore((v) => !v)}
            onBlur={handleBlur}
            style={{
              marginLeft: 6,
              display: "inline-flex",
              alignItems: "center",
              background: "linear-gradient(96deg,#4A90E2 70%,#50E3C2 100%)",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: "1.09em",
              minWidth: 72,
              padding: "12px 20px",
              cursor: "pointer",
              position: "relative",
              border: "none",
              boxShadow: "0 2px 13px #437aff18",
              outline: showMore ? "2.5px solid var(--accent)" : undefined,
              transition: "box-shadow 0.16s, outline 0.16s"
            }}
          >
            <span style={{ marginRight: 6 }}>More</span>
            <span aria-hidden="true">▼</span>
            {showMore &&
              <div
                ref={moreMenuRef}
                id="nav-more-menu"
                className="nav-more-menu"
                role="menu"
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  zIndex: 999,
                  background: "#fff",
                  boxShadow: "0 8px 37px #4A90E244",
                  borderRadius: 14,
                  minWidth: 196,
                  maxWidth: 244,
                  border: "1.4px solid #e0eafe",
                  padding: "9px 0",
                  marginTop: 6,
                  outline: "none"
                }}
              >
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
                        padding: "12px 18px",
                        margin: 0,
                        fontWeight: 600,
                        fontSize: "1.07em",
                        minWidth: "unset",
                        outline: "none"
                      }}
                      tabIndex={0}
                      role="menuitem"
                      aria-current={location.pathname === nav.to ? "page" : undefined}
                      aria-label={nav.label}
                      onClick={() => setShowMore(false)}
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
