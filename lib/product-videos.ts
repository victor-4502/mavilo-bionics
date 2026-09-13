/**
 * MAV 1 product video registry — real footage only.
 *
 * cleanStart / cleanEnd define the ONLY playable window.
 * Never play past cleanEnd (especially close-motion defect frames).
 */

export type ProductVideoPlayback = {
  src: string;
  poster: string;
  /** Ping-pong within clean window, or play once then hold. */
  mode: "pingpong" | "once";
  /** Inclusive start of the clean segment (seconds). */
  cleanStart: number;
  /**
   * Exclusive end of the clean segment (seconds).
   * If omitted, resolved as duration - endPad after metadata.
   */
  cleanEnd?: number;
  /** Fallback trim from absolute duration when cleanEnd is omitted. */
  endPad: number;
  playbackRate: number;
  reverseRate: number;
  pauseAtEndsMs: number;
};

export const PRODUCT_VIDEOS = {
  palmHero: {
    src: "/videos/mav1/mav1-palm-hero.mp4",
    poster: "/images/product/hero-palm.jpg",
    mode: "pingpong",
    cleanStart: 0.06,
    endPad: 0.18,
    playbackRate: 0.82,
    reverseRate: 0.82,
    pauseAtEndsMs: 140,
  },
  branding: {
    src: "/videos/mav1/mavilo-branding.mp4",
    poster: "/images/product/detail-brand.jpg",
    mode: "pingpong",
    cleanStart: 0.1,
    endPad: 0.22,
    playbackRate: 0.68,
    reverseRate: 0.68,
    pauseAtEndsMs: 240,
  },
  dorsalPush: {
    src: "/videos/mav1/mav1-dorsal-push.mp4",
    poster: "/images/product/hero-dorsal.jpg",
    mode: "pingpong",
    cleanStart: 0.06,
    endPad: 0.2,
    playbackRate: 0.78,
    reverseRate: 0.78,
    pauseAtEndsMs: 180,
  },
  okGesture: {
    src: "/videos/mav1/mav1-ok-gesture.mp4",
    poster: "/images/product/hero-palm.jpg",
    mode: "pingpong",
    cleanStart: 0.08,
    endPad: 0.28,
    playbackRate: 0.72,
    reverseRate: 0.62,
    pauseAtEndsMs: 560,
  },
  /**
   * ABSOLUTE RULE: never play past cleanEnd.
   * Clip ~2s; hard-cut early so index/thumb defect never appears.
   * Prefer absolute cleanEnd over endPad for this asset.
   */
  closeMotion: {
    src: "/videos/mav1/mav1-close-motion.mp4",
    poster: "/images/product/motion-side.jpg",
    mode: "pingpong",
    cleanStart: 0.05,
    cleanEnd: 1.15,
    endPad: 0.9,
    playbackRate: 0.78,
    reverseRate: 0.72,
    pauseAtEndsMs: 320,
  },
} as const satisfies Record<string, ProductVideoPlayback>;

export type ProductVideoKey = keyof typeof PRODUCT_VIDEOS;
