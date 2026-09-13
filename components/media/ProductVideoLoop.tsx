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
  /** When false, never plays (inactive layers). */
  enabled?: boolean;
  /**
   * Still shown under the video; crossfades in when playback reaches cleanEnd.
   * Defaults to config.poster.
   */
  endStill?: string;
};

/**
 * Forward-only cinematic product video.
 * Plays cleanStart→cleanEnd once, then crossfades to a still (no reverse, no loop, no freeze).
 */
export function ProductVideoLoop({
  config,
  ariaLabel,
  className,
  priority = false,
  objectPosition = "center",
  objectFit = "cover",
  enabled = true,
  endStill,
}: ProductVideoLoopProps) {
  const reactId = useId();
  const instanceId = `pvl-${reactId}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const endTimeRef = useRef<number | null>(config.cleanEnd ?? null);
  const stillSrc = endStill ?? config.poster;

  const [armed, setArmed] = useState(priority);
  const [inView, setInView] = useState(priority);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isActiveSolo, setIsActiveSolo] = useState(false);
  const [finished, setFinished] = useState(false);

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
          Boolean(entry?.isIntersecting) && (entry?.intersectionRatio ?? 0) >= 0.3;
        setInView(visible);
        if (visible) setArmed(true);
      },
      { rootMargin: "60px 0px", threshold: [0, 0.3, 0.6] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    const onLoaded = () => {
      resolveEnd(video);
      if (!finished) video.currentTime = config.cleanStart;
    };

    const onTimeUpdate = () => {
      if (finished) return;
      const end = endTimeRef.current ?? resolveEnd(video);
      if (video.currentTime >= end - 0.04) {
        video.pause();
        video.currentTime = end;
        setFinished(true);
      }
    };

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTimeUpdate);
    if (video.readyState >= 1) onLoaded();

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [armed, config.cleanStart, finished, resolveEnd]);

  useEffect(() => {
    if (enabled && inView && !reduceMotion && armed && !finished) {
      claimPlayback(instanceId);
      setIsActiveSolo(getActivePlaybackId() === instanceId);
    } else {
      releasePlayback(instanceId);
      setIsActiveSolo(false);
    }
    return () => releasePlayback(instanceId);
  }, [armed, enabled, finished, inView, instanceId, reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !armed) return;

    const allowed = enabled && inView && !reduceMotion && isActiveSolo && !finished;
    if (!allowed) {
      video.pause();
      return;
    }

    video.playbackRate = config.playbackRate;
    if (video.currentTime < config.cleanStart) {
      video.currentTime = config.cleanStart;
    }
    void video.play().catch(() => undefined);

    return () => {
      video.pause();
    };
  }, [
    armed,
    config.cleanStart,
    config.playbackRate,
    config.src,
    enabled,
    finished,
    inView,
    isActiveSolo,
    reduceMotion,
  ]);

  const showStill = reduceMotion || finished;

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`${styles.still} ${showStill ? styles.stillVisible : ""}`}
        src={stillSrc}
        alt=""
        aria-hidden
        style={{ objectPosition, objectFit }}
      />
      {!reduceMotion ? (
        <video
          ref={videoRef}
          className={`${styles.video} ${finished ? styles.videoFaded : ""}`}
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
      ) : null}
    </div>
  );
}
