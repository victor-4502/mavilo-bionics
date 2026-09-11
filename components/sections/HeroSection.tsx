"use client";

import Image from "next/image";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { useLocale } from "@/lib/locale";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy} data-hero-copy data-reveal>
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {t.hero.title}
          </h1>
          <p className={styles.subtitle}>{t.hero.subtitle}</p>
          <div className={styles.actions}>
            <a className="btn btn-primary" href="#mano">
              {t.hero.ctaPrimary}
            </a>
            <a className="btn btn-ghost" href="#contacto">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Mobile / tablet: full product shot (desktop uses sticky stage) */}
        <div className={styles.mobileStage}>
          <Image
            src={PRODUCT_IMAGES.heroPalm}
            alt={t.three.productAlt}
            fill
            priority
            sizes="100vw"
            className={styles.mobileImage}
          />
          <div className={styles.mobileFade} />
        </div>
      </div>
      <div className={styles.scrollHint} aria-hidden>
        <span />
      </div>
    </section>
  );
}
