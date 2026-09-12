"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductVideo.module.css";

type ProductVideoProps = {
  src: string;
  poster: string;
  /** Prefer false for trimmed close-motion */
  loop?: boolean;
  className?: string;
  /** Eager for hero; lazy otherwise */
  priority?: boolean;
  ariaLabel: string;
};

export function ProductVideo({
  src,
  poster,
  loop = true,
  className,
  priority = false,
  ariaLabel,
}: ProductVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(priority);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (priority) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !active || reduceMotion) return;
    const play = () => {
      void node.play().catch(() => undefined);
    };
    play();
  }, [active, reduceMotion, src]);

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <video
        ref={ref}
        className={styles.video}
        poster={poster}
        muted
        playsInline
        autoPlay={!reduceMotion && priority}
        loop={loop && !reduceMotion}
        preload={priority ? "auto" : "none"}
        controls={false}
        aria-label={ariaLabel}
      >
        {active ? <source src={src} type="video/mp4" /> : null}
      </video>
    </div>
  );
}
