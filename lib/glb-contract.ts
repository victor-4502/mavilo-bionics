/**
 * GLB node contract — single source of truth for future model wiring.
 * Update this file when the real Blender export lands; do not hardcode
 * node names across components.
 */

export const MODEL_PATHS = {
  hero: "/models/hand-hero.glb",
  explore: "/models/hand-explore.glb",
  mobile: "/models/hand-mobile.glb",
} as const;

/**
 * Logical slots → expected GLB node names (Asset Gate / Fase 1.5).
 * Values may be adjusted when the final GLB arrives.
 */
export const GLB_NODE_MAP = {
  root: "MAVILO_HAND",

  palmBody: "PALM_BODY",
  /** eli → tapa / cubierta */
  palmShell: "PALM_SHELL",

  fingerIndexPivot: "FINGER_INDEX_PIVOT",
  fingerMiddlePivot: "FINGER_MIDDLE_PIVOT",
  fingerRingPivot: "FINGER_RING_PIVOT",
  fingerPinkyPivot: "FINGER_PINKY_PIVOT",

  fingerIndexBase: "FINGER_INDEX_BASE",
  fingerMiddleBase: "FINGER_MIDDLE_BASE",
  fingerRingBase: "FINGER_RING_BASE",
  fingerPinkyBase: "FINGER_PINKY_BASE",

  thumbPivotA: "THUMB_PIVOT_A",
  thumbPivotB: "THUMB_PIVOT_B",
  thumbBase: "THUMB_BASE",
  thumbBody: "THUMB_BODY",

  explodePalm: "EXPLODE_GROUP_PALM",
  explodeFingerIndex: "EXPLODE_GROUP_FINGER_INDEX",
  explodeFingerMiddle: "EXPLODE_GROUP_FINGER_MIDDLE",
  explodeFingerRing: "EXPLODE_GROUP_FINGER_RING",
  explodeFingerPinky: "EXPLODE_GROUP_FINGER_PINKY",
  explodeThumb: "EXPLODE_GROUP_THUMB",

  hotspotPalm: "HOTSPOT_PALM",
  hotspotFinger: "HOTSPOT_FINGER",
  hotspotLinkage: "HOTSPOT_LINKAGE",
  hotspotThumb: "HOTSPOT_THUMB",
  hotspotFingerBase: "HOTSPOT_FINGER_BASE",
} as const;

export type GlbNodeKey = keyof typeof GLB_NODE_MAP;

/** Approved v1 hotspots — never include GearL. */
export const HOTSPOT_DEFINITIONS = [
  {
    id: "palm" as const,
    nodeKey: "hotspotPalm" as const,
    glbHint: "PALM_SHELL / PALM_BODY",
  },
  {
    id: "finger" as const,
    nodeKey: "hotspotFinger" as const,
    glbHint: "FINGER_* group",
  },
  {
    id: "linkage" as const,
    nodeKey: "hotspotLinkage" as const,
    glbHint: "FINGER_*_LINK_*",
  },
  {
    id: "thumb" as const,
    nodeKey: "hotspotThumb" as const,
    glbHint: "THUMB_*",
  },
  {
    id: "fingerBase" as const,
    nodeKey: "hotspotFingerBase" as const,
    glbHint: "FINGER_*_BASE",
  },
] as const;

export function resolveGlbNode(key: GlbNodeKey): string {
  return GLB_NODE_MAP[key];
}
