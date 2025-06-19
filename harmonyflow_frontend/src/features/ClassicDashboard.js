import React from "react";
import SurpriseChallengeMode from "./SurpriseChallengeMode";
import LocalTribeMatching from "./LocalTribeMatching";
import GlobalImpactMeter from "./GlobalImpactMeter";
import SeasonalTournaments from "./SeasonalTournaments";
import AnonymousStoryCircles from "./AnonymousStoryCircles";
import CreativityCapsules from "./CreativityCapsules";
import MoodReflectorAI from "./MoodReflectorAI";
import EmergencyDetoxMode from "./EmergencyDetoxMode";
import LocalBusinessPartnerships from "./LocalBusinessPartnerships";
import ChallengeCapsules from "./ChallengeCapsules";

// New core modules
import GoalMappingDashboard from "./GoalMappingDashboard";
import AISchedulerOracle from "./AISchedulerOracle";
import MoodCognitiveTracker from "./MoodCognitiveTracker";
import UnifiedJournal from "./UnifiedJournal";
import AILifeCoach from "./AILifeCoach";
import KPIMetrics from "./KPIMetrics";

// PUBLIC_INTERFACE
/**
 * ClassicDashboard -- Main premium dashboard with all primary HarmonyFlow modules as stylized widgets.
 */
export default function ClassicDashboard() {
  // Responsive two-column dashboard using CSS grid and ARIA/roles
  return (
    <div style={{ padding: 0, width: "100%" }}>
      <h1
        style={{
          color: "var(--primary)",
          fontWeight: 800,
          fontSize: "2.2rem",
          margin: "13px 0 23px 4px",
          lineHeight: 1.13,
          letterSpacing: "-0.01em",
        }}
        tabIndex={0}
        role="heading"
        aria-level={1}
        aria-label="Main Dashboard"
      >
        My Life Dashboard
      </h1>
      <div
        className="feature-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--gap-lg)",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          maxWidth: "1100px",
        }}
        role="main"
        aria-label="Dashboard Main Area"
      >
        {/* Left/Primary Column */}
        <section
          style={{
            minWidth: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "var(--gap-md)",
          }}
          aria-label="Personal Dashboard Main"
          role="region"
        >
          <GoalMappingDashboard />
          <AISchedulerOracle />
          <MoodCognitiveTracker />
          <UnifiedJournal />
          <KPIMetrics />
        </section>
        {/* Right/Secondary Column */}
        <section
          style={{
            minWidth: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "var(--gap-md)",
          }}
          aria-label="AI, Social, + Habit Challenge Widgets"
          role="complementary"
        >
          <AILifeCoach />
          <SurpriseChallengeMode />
          <ChallengeCapsules />
          <CreativityCapsules />
          <MoodReflectorAI />
          <GlobalImpactMeter />
          <SeasonalTournaments />
          <EmergencyDetoxMode />
          <LocalTribeMatching />
          <AnonymousStoryCircles />
          <LocalBusinessPartnerships />
        </section>
      </div>
      {/* Responsive grid override for mobile/tablet */}
      <style>{`
        @media (max-width: 980px) {
          .feature-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .feature-grid {
            gap: var(--gap-md) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .feature-card,
          .dashboard-widget {
            padding-left: 7px !important;
            padding-right: 7px !important;
          }
        }
      `}</style>
    </div>
  );
}
