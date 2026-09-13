"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProductVideoLoop } from "@/components/media/ProductVideoLoop";
import { useLocale } from "@/lib/locale";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { PRODUCT_VIDEOS } from "@/lib/product-videos";
import { gsap, loadScrollTrigger } from "@/lib/scroll/gsap";
import styles from "./ProductJourney.module.css";

type ActiveLayer = "full" | "fingers" | "thumb" | "detail";

/**
 * Editorial scroll journey through real MAV 1 views.
 * Crops / scale / crossfades only — never fake 360 orbit.
 * Does not use motion-open.jpg (pose may contradict real coordinated motion).
 */
export function ProductJourney() {
  const { t } = useLocale();
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<ActiveLayer>("full");

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const first = stage.querySelector<HTMLElement>('[data-layer="full"]');
      const firstCaption = stage.querySelector<HTMLElement>('[data-caption="full"]');
      if (first) first.style.opacity = "1";
      if (firstCaption) firstCaption.style.opacity = "1";
      return;
    }

    let ctx: gsap.Context | null = null;
    let killed = false;

    void (async () => {
      await loadScrollTrigger();
      if (killed) return;

      ctx = gsap.context(() => {
        const layerFull = stage.querySelector<HTMLElement>('[data-layer="full"]');
        const layerFingers = stage.querySelector<HTMLElement>('[data-layer="fingers"]');
        const layerThumb = stage.querySelector<HTMLElement>('[data-layer="thumb"]');
        const layerDetail = stage.querySelector<HTMLElement>('[data-layer="detail"]');
        const media = stage.querySelector<HTMLElement>("[data-media]");
        const cFull = stage.querySelector<HTMLElement>('[data-caption="full"]');
        const cPalm = stage.querySelector<HTMLElement>('[data-caption="palm"]');
        const cFingers = stage.querySelector<HTMLElement>('[data-caption="fingers"]');
        const cThumb = stage.querySelector<HTMLElement>('[data-caption="thumb"]');
        const cDetail = stage.querySelector<HTMLElement>('[data-caption="detail"]');

        const layers = [layerFull, layerFingers, layerThumb, layerDetail].filter(
          Boolean,
        ) as HTMLElement[];
        const captions = [cFull, cPalm, cFingers, cThumb, cDetail].filter(
          Boolean,
        ) as HTMLElement[];

        gsap.set(layers, { opacity: 0 });
        gsap.set(layerFull, { opacity: 1 });
        gsap.set(captions, { opacity: 0, y: 12 });
        gsap.set(cFull, { opacity: 1, y: 0 });
        if (media) gsap.set(media, { scale: 1, transformOrigin: "50% 42%" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.75,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (p < 0.28) setActiveLayer("full");
              else if (p < 0.52) setActiveLayer("fingers");
              else if (p < 0.76) setActiveLayer("thumb");
              else setActiveLayer("detail");
            },
          },
        });

        // Full product → palm emphasis (same real video, slower crop via scale)
        tl.to(media, { scale: 1.08, duration: 1, ease: "none" }, 0)
          .to(cFull, { opacity: 0, y: -8, duration: 0.35, ease: "none" }, 0.2)
          .to(cPalm, { opacity: 1, y: 0, duration: 0.35, ease: "none" }, 0.3);

        // Crossfade to side crop — fingers
        tl.to(layerFull, { opacity: 0, duration: 0.55, ease: "none" }, 1)
          .to(layerFingers, { opacity: 1, duration: 0.55, ease: "none" }, 1)
          .to(media, { scale: 1.14, duration: 1, ease: "none" }, 1)
          .to(cPalm, { opacity: 0, y: -8, duration: 0.3, ease: "none" }, 1.15)
          .to(cFingers, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 1.25);

        // Crossfade to side-profile crop — thumb / mechanism zone
        tl.to(layerFingers, { opacity: 0, duration: 0.5, ease: "none" }, 2)
          .to(layerThumb, { opacity: 1, duration: 0.5, ease: "none" }, 2)
          .to(media, { scale: 1.18, duration: 1, ease: "none" }, 2)
          .to(cFingers, { opacity: 0, y: -8, duration: 0.3, ease: "none" }, 2.15)
          .to(cThumb, { opacity: 1, y: 0, duration: 0.3, ease: "none" }, 2.25);

        // Crossfade to branding detail video
        tl.to(layerThumb, { opacity: 0, duration: 0.55, ease: "none" }, 3)
          .to(layerDetail, { opacity: 1, duration: 0.55, ease: "none" }, 3)
          .to(media, { scale: 1.05, duration: 1, ease: "none" }, 3)
          .to(cThumb, { opacity: 0, y: -8, duration: 0.3, ease: "none" }, 3.15)
          .to(cDetail, { opacity: 1, y: 0, duration: 0.35, ease: "none" }, 3.25);
      }, root);
    })();

    return () => {
      killed = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="mav1"
      ref={rootRef}
      className={styles.journey}
      aria-labelledby="product-title"
    >
      <div className={styles.pinWrap}>
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.media} data-media>
            <div className={styles.layer} data-layer="full">
              <ProductVideoLoop
                config={PRODUCT_VIDEOS.palmHero}
                ariaLabel={t.hero.videoLabel}
                objectPosition="50% 45%"
                enabled={activeLayer === "full"}
              />
            </div>
            <div className={`${styles.layer} ${styles.layerStill}`} data-layer="fingers">
              <Image
                src={PRODUCT_IMAGES.heroSide}
                alt={t.product.sideAlt}
                fill
                sizes="100vw"
                className={styles.stillFingers}
              />
            </div>
            <div className={`${styles.layer} ${styles.layerStill}`} data-layer="thumb">
              <Image
                src={PRODUCT_IMAGES.heroSideProfile}
                alt={t.product.sideAlt}
                fill
                sizes="100vw"
                className={styles.stillThumb}
              />
            </div>
            <div className={styles.layer} data-layer="detail">
              <ProductVideoLoop
                config={PRODUCT_VIDEOS.branding}
                ariaLabel={t.intro.videoLabel}
                objectPosition="50% 38%"
                enabled={activeLayer === "detail"}
              />
            </div>
          </div>

          <div className={`container ${styles.copy}`}>
            <p className="eyebrow">{t.product.eyebrow}</p>
            <h2 id="product-title" className={styles.title}>
              {t.product.title}
            </h2>
            <div className={styles.captions} aria-live="polite">
              <p className={styles.caption} data-caption="full">
                {t.journey.full}
              </p>
              <p className={styles.caption} data-caption="palm">
                {t.journey.palm}
              </p>
              <p className={styles.caption} data-caption="fingers">
                {t.journey.fingers}
              </p>
              <p className={styles.caption} data-caption="thumb">
                {t.journey.thumb}
              </p>
              <p className={styles.caption} data-caption="detail">
                {t.journey.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
