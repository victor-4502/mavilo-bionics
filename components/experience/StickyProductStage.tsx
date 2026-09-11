"use client";

import Image from "next/image";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { useLocale } from "@/lib/locale";
import styles from "./StickyProductStage.module.css";

export const SCROLL_VISUALS = [
  { id: "hero", src: PRODUCT_IMAGES.heroPalm },
  { id: "mavilo", src: PRODUCT_IMAGES.detailBrand },
  { id: "mano", src: PRODUCT_IMAGES.heroDorsal },
  { id: "senal", src: PRODUCT_IMAGES.heroSide },
  { id: "explora", src: PRODUCT_IMAGES.heroSideProfile },
  { id: "movimiento", src: PRODUCT_IMAGES.motionOpen },
  { id: "movimiento-close", src: PRODUCT_IMAGES.motionSide },
  { id: "ingenieria", src: PRODUCT_IMAGES.heroDorsal },
  { id: "ecosistema", src: PRODUCT_IMAGES.heroPalm },
  { id: "contacto", src: PRODUCT_IMAGES.heroSide },
] as const;

export function StickyProductStage() {
  const { t } = useLocale();

  return (
    <aside className={styles.stage} aria-hidden="true">
      <div className={styles.frame} data-product-stage>
        {SCROLL_VISUALS.map((visual, index) => (
          <div
            key={visual.id}
            className={styles.slide}
            data-visual={visual.id}
            data-active={index === 0 ? "true" : "false"}
          >
            <Image
              src={visual.src}
              alt=""
              fill
              priority={index < 2}
              sizes="(max-width: 960px) 100vw, 52vw"
              className={styles.image}
            />
          </div>
        ))}
        <div className={styles.vignette} />
        <div className={styles.glow} data-stage-glow />
        <p className={styles.caption} data-stage-caption>
          {t.three.placeholderLabel}
        </p>
      </div>
    </aside>
  );
}
