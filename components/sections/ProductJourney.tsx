"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import styles from "./ProductJourney.module.css";

/**
 * 03 — Discover MAV 1.
 * Single editorial product reading (profile) — not a gallery.
 */
export function ProductJourney() {
  const { t } = useLocale();

  return (
    <section id="mav1" className={styles.journey} aria-labelledby="product-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copyBlock}>
          <p className="eyebrow">{t.product.eyebrow}</p>
          <h2 id="product-title" className={styles.title}>
            {t.product.title}
          </h2>
          <p className={styles.body}>{t.product.body}</p>
          <p className={styles.line}>{t.journey.profile}</p>
        </div>
        <figure className={styles.media}>
          <Image
            src={PRODUCT_IMAGES.heroSide}
            alt={t.product.sideAlt}
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            className={styles.still}
          />
        </figure>
      </div>
    </section>
  );
}
