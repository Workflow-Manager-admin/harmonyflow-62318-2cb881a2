import React from "react";
import "./App.css";

/**
 * EventLife
 *
 * Distinctive "Event Life" page: presents a personal timeline/gallery of user milestones,
 * achievements, and meaningful events—NOT a chain or causality tracker.
 * Features visual timeline with icons, images, event cards, calendar highlights, and milestone dots.
 * Provides an at-a-glance, scrollable history—distinct from cascading chains.
 *
 * Route: /event-life
 */

// --- Mock milestone/event data for the timeline ---
const TIMELINE_EVENTS = [
  {
    date: "2024-06-09",
    type: "milestone",
    title: "Completed '30 Days of Meditation'",
    description: "Celebrated finishing a month-long mindfulness streak.",
    icon: "🧘‍♂️",
    color: "#50E3C2"
  },
  {
    date: "2024-05-23",
    type: "achievement",
    title: "Ran First 10K",
    description: "Achieved your first-ever 10km run. Fitness milestone unlocked!",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=600&q=80", // public
    color: "#4A90E2"
  },
  {
    date: "2024-04-14",
    type: "highlight",
    title: "Birthday Celebration 🎂",
    description: "Shared a joyful day with family and friends.",
    color: "#F5A623"
  },
  {
    date: "2024-03-30",
    type: "goal",
    title: "Read 12 Books in 3 Months",
    description: "Finished your reading challenge ahead of schedule.",
    icon: "📚",
    color: "#50E3C2"
  },
  {
    date: "2024-02-11",
    type: "personal",
    title: "Started a New Job",
    description: "Began a new role as Product Designer at MindfulTech.",
    color: "#4A90E2"
  },
  {
    date: "2024-01-01",
    type: "calendar",
    title: "New Year Resolutions Set",
    description: "Outlined goals: wellness, learning, non-negotiables for the year ahead.",
    icon: "🎉",
    color: "#B77FFF"
  }
];

// Helper: sort events by descending date
const eventsSorted = [...TIMELINE_EVENTS].sort((a, b) => new Date(b.date) - new Date(a.date));

// PUBLIC_INTERFACE
function EventLife() {
  return (
    <div className="container" style={{ paddingTop: 98, paddingBottom: 68, minHeight: "74vh", maxWidth: 900 }}>
      <section
        style={{
          background: "#f9fbfc",
          borderRadius: 18,
          padding: "36px 31px 32px 31px",
          margin: "0 auto",
          maxWidth: 730,
          boxShadow: "0 4px 21px #2278e213",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        aria-label="Event Life Timeline"
      >
        <h1 className="title" style={{ fontSize: "2.18rem", margin: "0 0 16px 0" }}>
          🗓️ Event Life: Timeline & Milestones
        </h1>
        <div className="description" style={{ marginBottom: 22, fontSize: "1.11em" }}>
          A personal timeline gallery of your key events, accomplishments, and calendar moments—distinct from a causality chain.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            position: "relative",
            margin: "30px 0"
          }}
        >
          <Timeline events={eventsSorted} />
        </div>
      </section>
      <div style={{ textAlign: "center", color: "#92a9be", fontSize: "1em", marginTop: 18 }}>
        * Demo data shown. Connect your calendar for more personalized milestones!
      </div>
    </div>
  );
}

// Timeline visualization: vertical, with dots, connecting line, playful event cards
function Timeline({ events }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 620,
        margin: "0 auto",
        padding: "0 0 18px 0",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 38,
          top: 0,
          bottom: 0,
          width: 5,
          background: "linear-gradient(180deg,#4A90E2 40%,#50E3C2 80%,#F5A623 100%)",
          borderRadius: 9,
          zIndex: 0,
        }}
      ></div>
      {events.map((ev, idx) => (
        <div
          key={ev.date}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-start",
            marginBottom: idx === events.length - 1 ? 0 : 49,
            zIndex: 2,
          }}
        >
          {/* Dot */}
          <div
            style={{
              background: ev.color,
              border: "3.5px solid #fff",
              boxShadow: "0 2px 7px #4A90E248",
              borderRadius: "50%",
              width: 28,
              height: 28,
              marginLeft: 27,
              position: "relative",
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.22em",
              color: "#fff"
            }}
            aria-hidden="true"
          >
            {/* Only show icon/emoji if present */}
            {ev.icon ? ev.icon : (ev.image ? "🏆" : "●")}
          </div>
          {/* Card */}
          <div
            style={{
              marginLeft: 28,
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 2px 17px #4A90E209",
              padding: "18px 21px 16px 24px",
              minWidth: 180,
              maxWidth: 460,
              flex: "1 1 280px",
              position: "relative",
              top: -8,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 24,
              borderLeft: `5px solid ${ev.color}`
            }}
            tabIndex={0}
            aria-label={`${ev.title}, ${ev.description}`}
          >
            {/* Optional image (e.g., a milestone photo) */}
            {ev.image && (
              <img
                src={ev.image}
                alt="Milestone"
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "cover",
                  borderRadius: 9,
                  marginRight: 10,
                  boxShadow: "0 2px 9px #b3dafa77"
                }}
              />
            )}
            <div style={{flex: "1 1 auto"}} >
              <div style={{fontWeight: 700, color: ev.color, fontSize: "1.1em"}}>{ev.title}</div>
              <div style={{ color: "#A1A9B7", fontSize: "0.98em", marginBottom: 4 }}>
                <b>{formatTimelineDate(ev.date)}</b>
              </div>
              <div style={{fontSize: "1.05em", color: "#333", marginBottom: 3}}>{ev.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function formatTimelineDate(dateString) {
  const opts = { year: "numeric", month: "short", day: "numeric" };
  const dt = new Date(dateString);
  if (String(dt) === "Invalid Date") return dateString;
  return dt.toLocaleDateString(undefined, opts);
}

export default EventLife;
