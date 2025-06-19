import React from "react";

/**
 * DashboardWidgetTile
 * Consistent card/tile component for use on dashboard widgets.
 * Handles premium visual, accessible structure, visual distinction by type, and basic responsive polish.
 */
// PUBLIC_INTERFACE
export default function DashboardWidgetTile({
  icon,
  title,
  accent = "primary",
  children,
  desc,
  style = {},
  "aria-label": ariaLabel,
  ...props
}) {
  // Accent color mapping aligned with design system
  const ACCENTS = {
    primary: "var(--primary)",
    secondary: "var(--secondary)",
    accent: "var(--accent)",
    focus: "#43e8d8",
    gold: "#f7b340",
    warning: "var(--danger)",
    kpi: "#5d66d8",
    mood: "#f7b340",
    coach: "#43e8d8",
    journal: "#326cfb",
    schedule: "#326cfb",
    goal: "#43e8d8",
    kpi2: "#afbad0",
    // Add more as needed
  };
  const accentColor = ACCENTS[accent] || "var(--primary)";

  // Accessibility: focus indicator + keyboard navigation
  const sectionRef = React.useRef(null);

  // Handle keyboard interaction: move focus to next/previous tile (left/right arrow), simulate "button" on Enter for header
  function onKeyDown(e) {
    // Trap arrow navigation between dashboard tiles
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      let dir = ["ArrowLeft", "ArrowUp"].includes(e.key) ? -1 : 1;
      let cards = Array.from(document.querySelectorAll(".dashboard-widget"));
      let idx = cards.findIndex((el) => el === sectionRef.current);
      if (idx !== -1) {
        let next = cards[(idx + dir + cards.length) % cards.length];
        if (next) next.focus();
      }
    }
    // Focus header/title with Home/End
    if (e.key === "Home") {
      e.preventDefault();
      let cards = Array.from(document.querySelectorAll(".dashboard-widget"));
      if (cards.length > 0 && cards[0]) cards[0].focus();
    }
    if (e.key === "End") {
      e.preventDefault();
      let cards = Array.from(document.querySelectorAll(".dashboard-widget"));
      if (cards.length > 0 && cards[cards.length - 1])
        cards[cards.length - 1].focus();
    }
  }

  // Provide high-contrast border for focus (if not overridden by stylesheet)
  const focusStyles = {
    boxShadow:
      "0 0 0 3px var(--secondary), 0 2.5px 18px #43e8d822 !important",
    borderColor: "var(--accent) !important",
  };

  // Responsive + touch target size (minHeight, padding adapted with media queries)
  return (
    <section
      ref={sectionRef}
      className="feature-card dashboard-widget"
      tabIndex={0}
      aria-label={ariaLabel || title}
      aria-roledescription="Dashboard widget"
      role="region"
      style={{
        background: "var(--card-bg)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: "min(6vw,32px) min(5vw,26px) min(3vw,18px) min(5vw,26px)",
        marginBottom: 18,
        position: "relative",
        minWidth: 0,
        minHeight: 110,
        ...style,
        borderLeft: `7px solid ${accentColor}`,
        outline: "none",
        transition: "border-color var(--tr-fast), box-shadow var(--tr-fancy)",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        touchAction: "manipulation",
      }}
      onKeyDown={onKeyDown}
      onFocus={(e) => {
        // High-contrast ring on keyboard focus
        e.target.style.boxShadow =
          focusStyles.boxShadow;
        e.target.style.borderColor =
          accentColor;
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = "";
        e.target.style.borderColor = "";
      }}
      {...props}
      data-dashboard-widget // For testability/access
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 18,
          right: 30,
          fontSize: 38,
          opacity: 0.14,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {icon}
      </div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 2,
          minHeight: 38, // Ensures tap target is large
        }}
        role="heading"
        aria-level={2}
        tabIndex={-1}
      >
        {icon && (
          <span
            style={{
              fontSize: 26,
              color: accentColor,
              filter:
                "drop-shadow(0 2.5px 0 #fff5) drop-shadow(0 1.5px 0 #b7cdfa17)",
              marginTop: -2,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span
          className="card-title"
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            color: accentColor,
            zIndex: 1,
            letterSpacing: "-0.01em",
            position: "relative",
            // High-contrast fallback
            textShadow: "0 1px 0 #fff5, 0 2.2px 5px #1a1d2e14",
          }}
        >
          {title}
        </span>
      </header>
      {desc && (
        <div
          className="card-desc"
          style={{
            color: "var(--text-main)", // Use high-contrast text for accessibility
            margin: "4px 0 9px 0",
            fontSize: 15.5,
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {desc}
        </div>
      )}
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </section>
  );
}
