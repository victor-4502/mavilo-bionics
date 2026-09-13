"use client";

import Image from "next/image";
import { ProductVideoLoop } from "@/components/media/ProductVideoLoop";
import { useLocale } from "@/lib/locale";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { PRODUCT_VIDEOS } from "@/lib/product-videos";
import styles from "./ProductJourney.module.css";

/**
 * Explicit visual states — no tall sticky pin, no empty scroll space.
 * Each panel is ~one viewport with real product media + short copy.
 */
export function ProductJourney() {
  const { t } = useLocale();

  return (
    <section id="mav1" className={styles.journey} aria-labelledby="product-title">
      <div className={styles.state}>
        <div className={styles.media}>
          <ProductVideoLoop
            config={PRODUCT_VIDEOS.palmHero}
            ariaLabel={t.hero.videoLabel}
            objectPosition="50% 45%"
            endStill={PRODUCT_IMAGES.heroPalm}
          />
        </div>
        <div className={`container ${styles.copy}`}>
          <p className="eyebrow">{t.product.eyebrow}</p>
          <h2 id="product-title" className={styles.title}>
            {t.product.title}
          </h2>
          <p className={styles.line}>{t.journey.full}</p>
        </div>
      </div>

      <div className={styles.state}>
        <div className={styles.media}>
          <Image
            src={PRODUCT_IMAGES.heroPalm}
            alt={t.product.palmAlt}
            fill
            sizes="100vw"
            className={styles.stillPalm}
          />
        </div>
        <div className={`container ${styles.copy}`}>
          <p className={styles.line}>{t.journey.palm}</p>
        </div>
      </div>

      <div className={styles.state}>
        <div className={styles.media}>
          <Image
            src={PRODUCT_IMAGES.heroSide}
            alt={t.product.sideAlt}
            fill
            sizes="100vw"
            className={styles.stillFingers}
          />
        </div>
        <div className={`container ${styles.copy}`}>
          <p className={styles.line}>{t.journey.fingers}</p>
        </div>
      </div>

      <div className={styles.state}>
        <div className={styles.media}>
          <Image
            src={PRODUCT_IMAGES.heroSideProfile}
            alt={t.product.sideAlt}
            fill
            sizes="100vw"
            className={styles.stillThumb}
          />
        </div>
        <div className={`container ${styles.copy}`}>
          <p className={styles.line}>{t.journey.thumb}</p>
        </div>
      </div>

      <div className={styles.state}>
        <div className={styles.media}>
          <ProductVideoLoop
            config={PRODUCT_VIDEOS.branding}
            ariaLabel={t.intro.videoLabel}
            objectPosition="50% 38%"
            endStill={PRODUCT_IMAGES.detailBrand}
          />
        </div>
        <div className={`container ${styles.copy}`}>
          <p className={styles.line}>{t.journey.detail}</p>
        </div>
      </div>
    </section>
  );
}
