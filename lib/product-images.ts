/**
 * Product photography registry for hero, fallbacks, and sections.
 * Replace paths only here when assets change.
 */

export const PRODUCT_IMAGES = {
  /** Palm-facing open hand — primary hero / OG */
  heroPalm: "/images/product/hero-palm.jpg",
  /** Dorsal view with embossed branding */
  heroDorsal: "/images/product/hero-dorsal.jpg",
  /** Side profile, fingers extended */
  heroSide: "/images/product/hero-side.jpg",
  /** Side profile, carbon shell emphasis */
  heroSideProfile: "/images/product/hero-side-profile.jpg",
  /** Macro embossed Mavilo Bionics mark */
  detailBrand: "/images/product/detail-brand.jpg",
  /** Open pose reference for motion storytelling */
  motionOpen: "/images/product/motion-open.jpg",
  /** Side pose reference for motion storytelling */
  motionSide: "/images/product/motion-side.jpg",
  /** Open Graph / social share */
  og: "/images/og/og-default.jpg",
} as const;

export type ProductImageKey = keyof typeof PRODUCT_IMAGES;

/** Still used until GLB Asset Gate delivers hand-*.glb */
export const GLB_READY = false;

export function fallbackForHandState(
  handState: "hero" | "explore" | "open" | "close" | "exploded" = "hero",
): string {
  switch (handState) {
    case "open":
      return PRODUCT_IMAGES.motionOpen;
    case "close":
      return PRODUCT_IMAGES.motionSide;
    case "explore":
    case "exploded":
      return PRODUCT_IMAGES.heroSide;
    case "hero":
    default:
      return PRODUCT_IMAGES.heroPalm;
  }
}
