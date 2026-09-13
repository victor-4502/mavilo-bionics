"use client";

import Image from "next/image";
import { useLocale } from "@/lib/locale";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import styles from "./ProductJourney.module.css";

/**
 * Compact product discovery — 3 visual states, native scroll only.
 * No palm-hero video, no branding video, no sticky/pin.
 */
export function ProductJourney() {
  const { t } = useLocale();

  return (
    <section id="mav1" className={styles.journey} aria-labelledby="product-title">
      <header className={`container ${styles.lead}`}>
        <p className="eyebrow">{t.product.eyebrow}</p>
        <h2 id="product-title" className={styles.title}>
          {t.product.title}
        </h2>
        <p className={styles.body}>{t.product.body}</p>
      </header>

      <div className={styles.states}>
        <article className={styles.state}>
          <div className={styles.media}>
            <Image
              src={PRODUCT_IMAGES.motionOpen}
              alt={t.product.palmAlt}
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              className={styles.stillPalm}
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.line}>{t.journey.palm}</p>
          </div>
        </article>

        <article className={styles.state}>
          <div className={styles.media}>
            <Image
              src={PRODUCT_IMAGES.heroSide}
              alt={t.product.sideAlt}
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              className={styles.stillSide}
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.line}>{t.journey.profile}</p>
          </div>
        </article>

        <article className={styles.state}>
          <div className={styles.media}>
            <Image
              src={PRODUCT_IMAGES.heroDorsal}
              alt={t.product.dorsalAlt}
              fill
              sizes="(max-width: 720px) 100vw, 50vw"
              className={styles.stillDorsal}
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.line}>{t.journey.dorsal}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
