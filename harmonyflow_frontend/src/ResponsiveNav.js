import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * ResponsiveNav (Modern horizontal scroll + accessible More dropdown for overflow)
 *
 * Renders all navigation links as a scrollable horizontal bar; automatically moves links that don't fit into
 * an accessible "More" dropdown. Implements full keyboard and touch accessibility with a premium theme look.
 */

// Navigation links (adjust/add here for more links)
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
  const location = useLocation();

  // Overflow calculation: decide which links fit
  const checkOverflow = useCallback(() => {
    if (!containerRef.current) return;
    const children = Array.from(containerRef.current.children).filter(n => n.dataset && n.dataset.index);
    const containerWidth = containerRef.current.offsetWidth;
    let used = 0, fit = [], extra = [];
    for (let i = 0; i < NAV_LINKS.length; i++) {
      if (children[i]) children[i].style.display = "";
    }
    const moreBtnWidth = containerRef.current.querySelector(".nav-more-btn")?.offsetWidth || 82;
    for (let i = 0; i < NAV_LINKS.length; i++) {
      const node = children[i];
      if (!node) continue;
      let nodeWidth = node.offsetWidth, margin = 8;
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

  // Setup re-checks on resize/orientation/font changes
  useLayoutEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    window.addEventListener("orientationchange", checkOverflow);
    const interval = setInterval(checkOverflow, 1000);
    setTimeout(() => clearInterval(interval), 2000);
    return () => {
      window.removeEventListener("resize", checkOverflow);
      window.removeEventListener("orientationchange", checkOverflow);
      clearInterval(interval);
    };
  }, [checkOverflow]);

  // Hide More menu after navigation
  useLayoutEffect(() => { setShowMore(false); }, [location.pathname]);

  // More dropdown accessibility
  function handleMoreKey(e) {
    if (e.key === "Enter" || e.key === " ") setShowMore(v => !v);
    else if (e.key === "ArrowDown" && showMore && moreMenuRef.current) {
      const links = moreMenuRef.current.querySelectorAll("a,button");
      if (links[0]) links[0].focus();
    } else if (e.key === "Escape") {
      setShowMore(false);
      if (moreBtnRef.current) moreBtnRef.current.focus();
    } else if (e.key === "Tab" && showMore && moreMenuRef.current) {
      // Trap tab inside dropdown
      const links = moreMenuRef.current.querySelectorAll("a,button");
      if (!links.length) return;
      if (!e.shiftKey && document.activeElement === links[links.length-1]) { e.preventDefault(); links[0].focus(); }
      if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); links[links.length-1].focus(); }
    }
  }

  // Handle navigation (keyboard) between visible links
  function handleNavKey(e, idx) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const links = containerRef.current.querySelectorAll('a[data-index]:not([style*="display: none"])');
    let found = -1;
    for (let i = 0; i < links.length; i++) {
      if (parseInt(links[i].dataset.index) === idx) { found = i; break; }
    }
    if (found < 0) return;
    let next;
    if (e.key === "ArrowLeft") next = (found - 1 + links.length) % links.length;
    if (e.key === "ArrowRight") next = (found + 1) % links.length;
    if (links[next]) links[next].focus();
  }

  // Touch/blur: close dropdown after focus leaves nav
  function handleBlur() {
    setTimeout(() => {
      if (
        !containerRef.current.contains(document.activeElement) &&
        (!moreMenuRef.current || !moreMenuRef.current.contains(document.activeElement))
      ) {
        setShowMore(false);
      }
    }, 120);
  }

  // Allow scrolling x-axis with mouse wheel
  function handleScrollWheel(e) {
    if (e.deltaY && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  }

  return (
    <div
      className="nav-scroll-container"
      style={{ position: "relative", WebkitOverflowScrolling: "touch" }}
      onWheel={handleScrollWheel}
    >
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
            onKeyDown={e => handleNavKey(e, idx)}
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
            aria-label="Show more navigation items"
            role="button"
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
                      onKeyDown={e=>{
                        if (e.key==="Escape" || e.key==="Tab") setShowMore(false);
                      }}
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
