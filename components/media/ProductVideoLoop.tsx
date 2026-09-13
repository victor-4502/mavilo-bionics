"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { ProductVideoPlayback } from "@/lib/product-videos";
import {
  claimPlayback,
  getActivePlaybackId,
  releasePlayback,
  subscribePlayback,
} from "@/lib/video-playback";
import styles from "./ProductVideoLoop.module.css";

type ProductVideoLoopProps = {
  config: ProductVideoPlayback;
  ariaLabel: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  /**
   * When false, this instance never plays (used by scroll journey layers).
   * Still shows the current frame / poster.
   */
  enabled?: boolean;
};

/**
 * Cinematic product player: cleanStart→cleanEnd with optional ping-pong.
 * Forward = native play. Reverse = rAF scrub (Safari-safe).
 * Never uses HTML loop. Hard-clamps to cleanEnd.
 */
export function ProductVideoLoop({
  config,
  ariaLabel,
  className,
  priority = false,
  objectPosition = "center",
  objectFit = "cover",
  enabled = true,
}: ProductVideoLoopProps) {
  const reactId = useId();
  const instanceId = `pvl-${reactId}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const directionRef = useRef<"forward" | "reverse">("forward");
  const runningRef = useRef(false);
  const endTimeRef = useRef<number | null>(config.cleanEnd ?? null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [armed, setArmed] = useState(priority);
  const [inView, setInView] = useState(priority);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isActiveSolo, setIsActiveSolo] = useState(false);

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
      if (typeof config.cleanEnd === "number") {
        endTimeRef.current = config.cleanEnd;
        return config.cleanEnd;
      }
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const end = Math.max(config.cleanStart + 0.25, duration - config.endPad);
      endTimeRef.current = end;
      return end;
    },
    [config.cleanEnd, config.cleanStart, config.endPad],
  );

  const clampTime = useCallback(
    (video: HTMLVideoElement, time: number) => {
      const end = endTimeRef.current ?? resolveEnd(video);
      return Math.min(end, Math.max(config.cleanStart, time));
    },
    [config.cleanStart, resolveEnd],
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

  const stopHard = useCallback(() => {
    runningRef.current = false;
    clearRaf();
    clearPause();
    const video = videoRef.current;
    if (video) video.pause();
  }, []);

  const playForward = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !runningRef.current || reduceMotion) return;
    clearRaf();
    directionRef.current = "forward";
    const end = resolveEnd(video);
    video.currentTime = clampTime(video, video.currentTime);
    if (video.currentTime >= end - 0.02) {
      video.currentTime = config.cleanStart;
    }
    video.playbackRate = config.playbackRate;
    try {
      await video.play();
    } catch {
      /* autoplay blocked */
    }
  }, [
    clampTime,
    config.cleanStart,
    config.playbackRate,
    reduceMotion,
    resolveEnd,
  ]);

  const scrubReverse = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !runningRef.current || reduceMotion) return;
    clearRaf();
    directionRef.current = "reverse";
    video.pause();
    // Snap to cleanEnd so reverse never starts past the defect window.
    video.currentTime = clampTime(video, endTimeRef.current ?? resolveEnd(video));

    await waitPause(config.pauseAtEndsMs);
    if (!runningRef.current) return;

    let last = performance.now();
    const tick = (now: number) => {
      if (!runningRef.current || directionRef.current !== "reverse") return;
      const node = videoRef.current;
      if (!node) return;

      const dt = Math.min(0.048, (now - last) / 1000);
      last = now;
      const next =
        node.currentTime - dt * config.playbackRate * config.reverseRate;

      if (next <= config.cleanStart + 0.001) {
        node.currentTime = config.cleanStart;
        void (async () => {
          await waitPause(config.pauseAtEndsMs);
          if (runningRef.current) void playForward();
        })();
        return;
      }

      try {
        node.currentTime = clampTime(node, next);
      } catch {
        /* seek abort */
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [
    clampTime,
    config.cleanStart,
    config.pauseAtEndsMs,
    config.playbackRate,
    config.reverseRate,
    playForward,
    reduceMotion,
    resolveEnd,
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
    return subscribePlayback(() => {
      setIsActiveSolo(getActivePlaybackId() === instanceId);
    });
  }, [instanceId]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          Boolean(entry?.isIntersecting) && (entry?.intersectionRatio ?? 0) >= 0.28;
        setInView(visible);
        if (visible) setArmed(true);
      },
      { rootMargin: "40px 0px", threshold: [0, 0.28, 0.55, 0.8] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    const onLoaded = () => {
      resolveEnd(video);
      video.currentTime = config.cleanStart;
    };

    const onTimeUpdate = () => {
      if (!runningRef.current || directionRef.current !== "forward") return;
      const end = endTimeRef.current ?? resolveEnd(video);
      // Hard stop before cleanEnd — never overshoot into defect frames.
      if (video.currentTime >= end - 0.05) {
        video.pause();
        video.currentTime = end;
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
  }, [armed, config.cleanStart, config.mode, resolveEnd, scrubReverse]);

  const shouldPlay = enabled && inView && !reduceMotion && armed;

  useEffect(() => {
    if (shouldPlay) {
      claimPlayback(instanceId);
      setIsActiveSolo(getActivePlaybackId() === instanceId);
    } else {
      releasePlayback(instanceId);
      setIsActiveSolo(false);
    }
    return () => releasePlayback(instanceId);
  }, [instanceId, shouldPlay]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    const allowed = shouldPlay && isActiveSolo;
    if (!allowed) {
      stopHard();
      return;
    }

    runningRef.current = true;
    directionRef.current = "forward";
    void playForward();

    return () => {
      stopHard();
    };
  }, [armed, isActiveSolo, playForward, shouldPlay, stopHard, config.src]);

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
