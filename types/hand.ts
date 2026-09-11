/** Centralized 3D experience state types — do not scatter string literals. */

export type HandState = "hero" | "explore" | "open" | "close" | "exploded";

export type CameraPreset =
  | "hero"
  | "heroSoft"
  | "product"
  | "signal"
  | "explore"
  | "motion"
  | "engineering"
  | "parked"
  | "outro";

export type HotspotId =
  | "palm"
  | "finger"
  | "linkage"
  | "thumb"
  | "fingerBase";

/** Continuous parameters driven later by GSAP / UI. */
export type GripValue = number; // 0 = open … 1 = closed
export type ExplodedValue = number; // 0 = assembled … 1 = exploded

export type PerformanceTier = "high" | "medium" | "low";

export type HandExperienceProps = {
  grip?: GripValue;
  exploded?: ExplodedValue;
  handState?: HandState;
  cameraPreset?: CameraPreset;
  activeHotspot?: HotspotId | null;
  className?: string;
  /** Override model paths when GLBs are ready */
  modelHero?: string;
  modelExplore?: string;
  modelMobile?: string;
  /** Product photo path used when WebGL/GLB unavailable or preferStill */
  fallbackImage?: string;
  /**
   * Prefer photography over WebGL stage.
   * Default true until GLB_READY flips in lib/product-images.ts
   */
  preferStill?: boolean;
};

export type Locale = "es" | "en";
