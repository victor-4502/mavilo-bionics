"use client";

import type { HandExperienceProps } from "@/types/hand";
import { HandCanvas } from "./HandCanvas";
import styles from "./HandExperience.module.css";

/**
 * Primary API for the future 3D experience.
 * Until GLB lands, renders product photography via HandCanvas fallback.
 */
export function HandExperience({
  grip = 0,
  exploded = 0,
  handState = "hero",
  cameraPreset = "hero",
  activeHotspot = null,
  className,
  modelHero,
  modelExplore,
  modelMobile,
  fallbackImage,
  preferStill,
}: HandExperienceProps) {
  return (
    <div
      className={`${styles.root} ${className ?? ""}`}
      data-hand-state={handState}
      data-camera={cameraPreset}
      data-hotspot={activeHotspot ?? "none"}
      data-grip={grip.toFixed(2)}
      data-exploded={exploded.toFixed(2)}
    >
      <HandCanvas
        grip={grip}
        exploded={exploded}
        handState={handState}
        modelHero={modelHero}
        modelExplore={modelExplore}
        modelMobile={modelMobile}
        fallbackImage={fallbackImage}
        preferStill={preferStill}
      />
    </div>
  );
}
