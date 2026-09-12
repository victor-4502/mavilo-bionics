/**
 * MAV 1 product video registry — real footage only.
 * Playback configs avoid defective end frames and hard restart loops.
 */

export type ProductVideoPlayback = {
  src: string;
  poster: string;
  /** Ping-pong within [startTime, endTime]; never native loop. */
  mode: "pingpong" | "once";
  /** Seconds from start (inclusive). */
  startTime: number;
  /**
   * Absolute end time. If omitted, uses (duration - endPad) once metadata loads.
   * Prefer endPad for clips whose duration varies slightly.
   */
  endTime?: number;
  /** Trim from absolute end to avoid defective / flash frames. */
  endPad: number;
  /** Native forward playbackRate. */
  playbackRate: number;
  /** Reverse scrub speed multiplier (1 = realtime). */
  reverseRate: number;
  /** Soft pause at each turnaround (ms). */
  pauseAtEndsMs: number;
};

export const PRODUCT_VIDEOS = {
  palmHero: {
    src: "/videos/mav1/mav1-palm-hero.mp4",
    poster: "/images/product/hero-palm.jpg",
    mode: "pingpong",
    startTime: 0.05,
    endPad: 0.12,
    playbackRate: 0.85,
    reverseRate: 0.85,
    pauseAtEndsMs: 120,
  },
  branding: {
    src: "/videos/mav1/mavilo-branding.mp4",
    poster: "/images/product/detail-brand.jpg",
    mode: "pingpong",
    startTime: 0.08,
    endPad: 0.18,
    playbackRate: 0.7,
    reverseRate: 0.7,
    pauseAtEndsMs: 220,
  },
  dorsalPush: {
    src: "/videos/mav1/mav1-dorsal-push.mp4",
    poster: "/images/product/hero-dorsal.jpg",
    mode: "pingpong",
    startTime: 0.05,
    endPad: 0.15,
    playbackRate: 0.8,
    reverseRate: 0.8,
    pauseAtEndsMs: 160,
  },
  okGesture: {
    src: "/videos/mav1/mav1-ok-gesture.mp4",
    poster: "/images/product/motion-open.jpg",
    mode: "pingpong",
    startTime: 0.06,
    endPad: 0.2,
    playbackRate: 0.75,
    reverseRate: 0.65,
    pauseAtEndsMs: 520,
  },
  /** Already trimmed — keep a conservative endPad; never show post-trim defects. */
  closeMotion: {
    src: "/videos/mav1/mav1-close-motion.mp4",
    poster: "/images/product/motion-side.jpg",
    mode: "pingpong",
    startTime: 0.04,
    endPad: 0.25,
    playbackRate: 0.8,
    reverseRate: 0.75,
    pauseAtEndsMs: 280,
  },
} as const satisfies Record<string, ProductVideoPlayback>;

export type ProductVideoKey = keyof typeof PRODUCT_VIDEOS;
