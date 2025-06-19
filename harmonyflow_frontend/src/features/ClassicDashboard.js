import React, { useState } from "react";
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

// PUBLIC_INTERFACE
/**
 * ClassicDashboard -- Retrieves the "classic" dashboard layout for HarmonyFlow.
 * Lightweight state for demo; in a real app, use context/api for shared data.
 */
export default function ClassicDashboard() {
  // Demo state for "goal map", "events", etc. (minimal for static display)
  return (
    <div>
      <h1 style={{ color: "#4A90E2", fontWeight: 800, fontSize: "2.15rem", margin: "17px 0 17px 3px" }}>
        My Life Dashboard
      </h1>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 34, alignItems: "flex-start"
      }}>
        <div style={{ flex: "1 1 370px", minWidth: 320 }}>
          <SurpriseChallengeMode />
          <LocalTribeMatching />
          <CreativityCapsules />
          <EmergencyDetoxMode />
          <ChallengeCapsules />
        </div>
        <div style={{ flex: "1 1 370px", minWidth: 320 }}>
          <GlobalImpactMeter />
          <SeasonalTournaments />
          <AnonymousStoryCircles />
          <MoodReflectorAI />
          <LocalBusinessPartnerships />
        </div>
      </div>
    </div>
  );
}
