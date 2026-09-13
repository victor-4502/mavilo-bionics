/**
 * MAV 1 product video registry — real footage only.
 * Forward playback only within [cleanStart, cleanEnd]. No reverse. No loop.
 */

export type ProductVideoPlayback = {
  src: string;
  poster: string;
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
};

export const PRODUCT_VIDEOS = {
  palmHero: {
    src: "/videos/mav1/mav1-palm-hero.mp4",
    poster: "/images/product/hero-palm.jpg",
    cleanStart: 0.06,
    endPad: 0.12,
    playbackRate: 0.9,
  },
  branding: {
    src: "/videos/mav1/mavilo-branding.mp4",
    poster: "/images/product/detail-brand.jpg",
    cleanStart: 0.1,
    endPad: 0.18,
    playbackRate: 0.85,
  },
  dorsalPush: {
    src: "/videos/mav1/mav1-dorsal-push.mp4",
    poster: "/images/product/hero-dorsal.jpg",
    cleanStart: 0.06,
    endPad: 0.16,
    playbackRate: 0.88,
  },
  okGesture: {
    src: "/videos/mav1/mav1-ok-gesture.mp4",
    /** Poster only for reduced-motion / preload — not a section hero. */
    poster: "/images/product/hero-side.jpg",
    cleanStart: 0.08,
    endPad: 0.22,
    playbackRate: 0.85,
  },
  /** Hard cut before index/thumb defect. Never play past cleanEnd. */
  closeMotion: {
    src: "/videos/mav1/mav1-close-motion.mp4",
    poster: "/images/product/hero-side.jpg",
    cleanStart: 0.05,
    cleanEnd: 1.15,
    endPad: 0.9,
    playbackRate: 0.88,
  },
} as const satisfies Record<string, ProductVideoPlayback>;

export type ProductVideoKey = keyof typeof PRODUCT_VIDEOS;
