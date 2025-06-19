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

  return (
    <section
      className="feature-card dashboard-widget"
      tabIndex={0}
      aria-label={ariaLabel || title}
      style={{
        background: "var(--card-bg)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        padding: "28px 26px 18px 26px",
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
      }}
      {...props}
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
      <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 2 }}>
        {icon && (
          <span
            style={{
              fontSize: 26,
              color: accentColor,
              filter: "drop-shadow(0 2.5px 0 #fff5) drop-shadow(0 1.5px 0 #b7cdfa17)",
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
          }}
        >
          {title}
        </span>
      </header>
      {desc && (
        <div
          className="card-desc"
          style={{
            color: "var(--text-muted)",
            margin: "4px 0 9px 0",
            fontSize: 14.7,
          }}
        >
          {desc}
        </div>
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}
