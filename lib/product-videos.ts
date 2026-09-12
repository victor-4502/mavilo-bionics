/**
 * MAV 1 product video registry — real footage only.
 * Paths match /public/videos/mav1/
 */

export const PRODUCT_VIDEOS = {
  palmHero: {
    src: "/videos/mav1/mav1-palm-hero.mp4",
    poster: "/images/product/hero-palm.jpg",
    /** Hero may loop; clip is short and continuous */
    loop: true,
  },
  branding: {
    src: "/videos/mav1/mavilo-branding.mp4",
    poster: "/images/product/detail-brand.jpg",
    loop: true,
  },
  dorsalPush: {
    src: "/videos/mav1/mav1-dorsal-push.mp4",
    poster: "/images/product/hero-dorsal.jpg",
    loop: true,
  },
  okGesture: {
    src: "/videos/mav1/mav1-ok-gesture.mp4",
    poster: "/images/product/motion-open.jpg",
    loop: true,
  },
  /** Trimmed clip — play once, hold last frame; do not reverse/extend */
  closeMotion: {
    src: "/videos/mav1/mav1-close-motion.mp4",
    poster: "/images/product/motion-side.jpg",
    loop: false,
  },
} as const;

export type ProductVideoKey = keyof typeof PRODUCT_VIDEOS;
