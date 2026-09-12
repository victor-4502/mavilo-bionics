"use client";

import Image from "next/image";
import { ProductVideoLoop } from "@/components/media/ProductVideoLoop";
import { useLocale } from "@/lib/locale";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { PRODUCT_VIDEOS } from "@/lib/product-videos";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  const { t } = useLocale();

  return (
    <section id="hero" className={styles.hero} aria-label={t.hero.brand}>
      <div className={styles.media}>
        <ProductVideoLoop
          config={PRODUCT_VIDEOS.palmHero}
          priority
          ariaLabel={t.hero.videoLabel}
          objectPosition="52% 42%"
        />
        <div className={styles.veil} aria-hidden />
      </div>

      <div className={`container ${styles.copy}`}>
        <p className={styles.brand}>{t.hero.brand}</p>
        <h1 className={styles.title}>{t.hero.title}</h1>
        <p className={styles.subtitle}>{t.hero.subtitle}</p>
        <div className={styles.actions}>
          <a className="btn btn-primary" href="#mav1">
            {t.hero.ctaPrimary}
          </a>
          <a className="btn btn-ghost" href="#contacto">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <Image
        src={PRODUCT_IMAGES.heroPalm}
        alt=""
        width={16}
        height={9}
        priority
        className={styles.preload}
        aria-hidden
      />
    </section>
  );
}
