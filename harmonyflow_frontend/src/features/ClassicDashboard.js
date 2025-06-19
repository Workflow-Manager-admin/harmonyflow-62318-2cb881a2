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
      >
        My Life Dashboard
      </h1>
      <div
        className="feature-grid"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--gap-lg)",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Left/Primary Column */}
        <section
          style={{
            flex: "1 1 350px",
            minWidth: 320,
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            gap: "var(--gap-md)",
          }}
          aria-label="Personal Dashboard Main"
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
            flex: "1 1 310px",
            minWidth: 310,
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            gap: "var(--gap-md)",
          }}
          aria-label="AI, Social, + Habit Challenge Widgets"
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
    </div>
  );
}
