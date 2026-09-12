"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductVideoPlayback } from "@/lib/product-videos";
import styles from "./ProductVideoLoop.module.css";

type ProductVideoLoopProps = {
  config: ProductVideoPlayback;
  ariaLabel: string;
  className?: string;
  /** Eager load / start near first paint */
  priority?: boolean;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
};

/**
 * Cinematic ping-pong player (forward → reverse → forward).
 * Uses native forward playback + rAF scrub reverse (Safari-safe; no negative playbackRate).
 */
export function ProductVideoLoop({
  config,
  ariaLabel,
  className,
  priority = false,
  objectPosition = "center",
  objectFit = "cover",
}: ProductVideoLoopProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const directionRef = useRef<"forward" | "reverse">("forward");
  const runningRef = useRef(false);
  const endTimeRef = useRef<number | null>(config.endTime ?? null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [armed, setArmed] = useState(priority);
  const [inView, setInView] = useState(priority);
  const [reduceMotion, setReduceMotion] = useState(false);

  const clearRaf = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  };

  const clearPause = () => {
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  };

  const resolveEnd = useCallback(
    (video: HTMLVideoElement) => {
      if (typeof config.endTime === "number") {
        endTimeRef.current = config.endTime;
        return config.endTime;
      }
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const end = Math.max(config.startTime + 0.2, duration - config.endPad);
      endTimeRef.current = end;
      return end;
    },
    [config.endPad, config.endTime, config.startTime],
  );

  const waitPause = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      clearPause();
      if (ms <= 0) {
        resolve();
        return;
      }
      pauseTimerRef.current = setTimeout(() => resolve(), ms);
    });
  }, []);

  const playForward = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !runningRef.current || reduceMotion) return;
    clearRaf();
    directionRef.current = "forward";
    const end = resolveEnd(video);
    if (video.currentTime < config.startTime || video.currentTime > end) {
      video.currentTime = config.startTime;
    }
    video.playbackRate = config.playbackRate;
    try {
      await video.play();
    } catch {
      /* autoplay blocked — stay on poster frame */
    }
  }, [config.playbackRate, config.startTime, reduceMotion, resolveEnd]);

  const scrubReverse = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !runningRef.current || reduceMotion) return;
    clearRaf();
    directionRef.current = "reverse";
    video.pause();

    await waitPause(config.pauseAtEndsMs);

    let last = performance.now();
    const tick = (now: number) => {
      if (!runningRef.current || directionRef.current !== "reverse") return;
      const node = videoRef.current;
      if (!node) return;

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const next = node.currentTime - dt * config.playbackRate * config.reverseRate;

      if (next <= config.startTime + 0.001) {
        node.currentTime = config.startTime;
        void (async () => {
          await waitPause(config.pauseAtEndsMs);
          if (runningRef.current) void playForward();
        })();
        return;
      }

      try {
        node.currentTime = next;
      } catch {
        /* seek abort mid-load */
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [
    config.pauseAtEndsMs,
    config.playbackRate,
    config.reverseRate,
    config.startTime,
    playForward,
    reduceMotion,
    waitPause,
  ]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        setInView(visible);
        if (visible) setArmed(true);
      },
      { rootMargin: "180px 0px", threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    const onLoaded = () => {
      resolveEnd(video);
      video.currentTime = config.startTime;
    };

    const onTimeUpdate = () => {
      if (!runningRef.current || directionRef.current !== "forward") return;
      const end = endTimeRef.current ?? resolveEnd(video);
      if (video.currentTime >= end - 0.04) {
        video.pause();
        if (config.mode === "once") {
          runningRef.current = false;
          return;
        }
        void scrubReverse();
      }
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTimeUpdate);
    if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [armed, config.mode, config.startTime, resolveEnd, scrubReverse]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    if (reduceMotion || !inView) {
      runningRef.current = false;
      clearRaf();
      clearPause();
      video.pause();
      return;
    }

    runningRef.current = true;
    directionRef.current = "forward";
    void playForward();

    return () => {
      runningRef.current = false;
      clearRaf();
      clearPause();
      video.pause();
    };
  }, [armed, inView, playForward, reduceMotion, config.src]);

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <video
        ref={videoRef}
        className={styles.video}
        style={{ objectPosition, objectFit }}
        poster={config.poster}
        muted
        playsInline
        autoPlay={false}
        loop={false}
        preload={priority ? "auto" : armed ? "metadata" : "none"}
        controls={false}
        disablePictureInPicture
        aria-label={ariaLabel}
      >
        {armed ? <source src={config.src} type="video/mp4" /> : null}
      </video>
      {reduceMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={styles.fallback}
          src={config.poster}
          alt=""
          aria-hidden
        />
      ) : null}
    </div>
  );
}
