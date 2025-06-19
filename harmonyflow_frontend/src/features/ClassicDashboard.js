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
    <div
      style={{
        padding: "0 0 0 0",
      }}
    >
      <h1
        style={{
          color: "var(--primary)",
          fontWeight: 800,
          fontSize: "2.2rem",
          margin: "13px 0 25px 3px",
          lineHeight: 1.16,
          letterSpacing: "-0.01em",
        }}
      >
        My Life Dashboard
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--gap-lg)",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            flex: "1 1 395px",
            minWidth: 310,
            maxWidth: 499,
            display: "flex",
            flexDirection: "column",
            gap: "var(--gap-md)",
          }}
        >
          <SurpriseChallengeMode />
          <LocalTribeMatching />
          <CreativityCapsules />
          <EmergencyDetoxMode />
          <ChallengeCapsules />
        </div>
        <div
          style={{
            flex: "1 1 395px",
            minWidth: 310,
            maxWidth: 499,
            display: "flex",
            flexDirection: "column",
            gap: "var(--gap-md)",
          }}
        >
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
