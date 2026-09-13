"use client";

import Image from "next/image";
import { ProductVideoLoop } from "@/components/media/ProductVideoLoop";
import { useLocale } from "@/lib/locale";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { PRODUCT_VIDEOS } from "@/lib/product-videos";
import styles from "./HomeSections.module.css";

/** 02 — MAVILO / identity. Sole home use of branding video. */
export function IntroSection() {
  const { t } = useLocale();

  return (
    <section id="mavilo" className={styles.identity} aria-labelledby="intro-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copyBlock}>
          <p className="eyebrow">{t.intro.brand}</p>
          <h2 id="intro-title" className={styles.h2}>
            {t.intro.title}
          </h2>
          <p className={styles.body}>{t.intro.body}</p>
        </div>
        <div className={styles.mediaPanel}>
          <ProductVideoLoop
            config={PRODUCT_VIDEOS.branding}
            ariaLabel={t.intro.videoLabel}
            objectPosition="50% 40%"
            endStill={PRODUCT_IMAGES.detailBrand}
          />
        </div>
      </div>
    </section>
  );
}

/** 04 — Movement. Single cinematic gesture moment. */
export function MovementSection() {
  const { t } = useLocale();

  return (
    <section id="movimiento" className={styles.sectionBleed} aria-labelledby="movement-title">
      <div className={styles.fullMedia}>
        <ProductVideoLoop
          config={PRODUCT_VIDEOS.okGesture}
          ariaLabel={t.movement.videoLabel}
          objectPosition="50% 45%"
          endStill={PRODUCT_IMAGES.motionSide}
        />
        <div className={styles.bleedVeil} aria-hidden />
      </div>
      <div className={`container ${styles.overlayCopy}`}>
        <p className="eyebrow">{t.movement.eyebrow}</p>
        <h2 id="movement-title" className={styles.h2}>
          {t.movement.title}
        </h2>
        <p className={styles.body}>{t.movement.body}</p>
      </div>
    </section>
  );
}

/** 05 — Engineering. Dorsal architecture + real assembly reading. */
export function EngineeringSection() {
  const { t } = useLocale();

  return (
    <section id="tecnologia" className={styles.engineering} aria-labelledby="eng-title">
      <div className="container">
        <div className={styles.lead}>
          <p className="eyebrow">{t.engineering.eyebrow}</p>
          <h2 id="eng-title" className={styles.h2}>
            {t.engineering.title}
          </h2>
          <p className={styles.bodyNarrow}>{t.engineering.body}</p>
        </div>

        <div className={styles.mediaWide}>
          <ProductVideoLoop
            config={PRODUCT_VIDEOS.dorsalPush}
            ariaLabel={t.engineering.videoLabel}
            objectPosition="50% 40%"
            endStill={PRODUCT_IMAGES.heroDorsal}
          />
        </div>

        <ol className={styles.engList}>
          {t.engineering.items.map((item) => (
            <li key={item.index} className={styles.engItem}>
              <span className={styles.engIndex}>{item.index}</span>
              <div>
                <h3 className={styles.engTitle}>{item.title}</h3>
                <p className={styles.engBody}>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * 06 — System. Compact signal → ecosystem → clinics narrative.
 * No invented app UI — product photo only if it adds a new angle.
 */
export function SystemSection() {
  const { t } = useLocale();

  return (
    <section id="ecosistema" className={styles.system} aria-labelledby="system-title">
      <div className="container">
        <div className={styles.systemLead}>
          <p className="eyebrow">{t.signal.eyebrow}</p>
          <h2 id="system-title" className={styles.h2}>
            {t.signal.title}
          </h2>
          <p className={styles.bodyNarrow}>{t.signal.body}</p>
        </div>

        <ol className={styles.signalRow} aria-label={t.signal.title}>
          {t.signal.steps.map((step, index) => (
            <li key={step} className={styles.signalChip}>
              <span className={styles.signalLabel}>{step}</span>
              {index < t.signal.steps.length - 1 ? (
                <span className={styles.signalSep} aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className={styles.systemGrid}>
          <div className={styles.systemCopy}>
            <p className="eyebrow">{t.ecosystem.eyebrow}</p>
            <h3 className={styles.h3}>{t.ecosystem.title}</h3>
            <p className={styles.body}>{t.ecosystem.body}</p>
            <ul className={styles.plainList}>
              {t.ecosystem.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <figure className={styles.stillPanel}>
            <Image
              src={PRODUCT_IMAGES.heroSideProfile}
              alt={t.product.sideAlt}
              width={1200}
              height={900}
              sizes="(max-width: 900px) 100vw, 36rem"
            />
          </figure>
        </div>

        <div className={styles.clinicsBlock} id="clinicas">
          <p className="eyebrow">{t.clinics.eyebrow}</p>
          <h3 className={styles.h3}>{t.clinics.title}</h3>
          <p className={styles.bodyNarrow}>{t.clinics.body}</p>
          <ul className={styles.clinicRow}>
            {t.clinics.points.map((point, index) => (
              <li key={point}>
                <span className={styles.clinicIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** 07 — Purpose + contact. Brand close, not corporate form. */
export function PurposeCtaSection() {
  const { t } = useLocale();

  return (
    <section id="contacto" className={styles.purpose} aria-labelledby="cta-title">
      <div className={`container ${styles.purposeInner}`}>
        <div className={styles.purposeBrand} id="empresa">
          <p className={styles.humanLine}>{t.human.line1}</p>
          <p className={styles.humanLineMuted}>{t.human.line2}</p>
          <p className={styles.aboutMark}>{t.about.title}</p>
          <p className={styles.bodyNarrow}>{t.about.body}</p>
        </div>

        <div className={styles.purposeCta}>
          <h2 id="cta-title" className={styles.finalTitle}>
            {t.cta.title}
          </h2>
          <p className={styles.finalBody}>{t.cta.body}</p>
          <div className={styles.actions}>
            <a className="btn btn-primary" href={`mailto:${t.cta.email}`}>
              {t.cta.primary}
            </a>
            <a className="btn btn-ghost" href="#mav1">
              {t.cta.secondary}
            </a>
          </div>
          <a className={styles.email} href={`mailto:${t.cta.email}`}>
            {t.cta.email}
          </a>
        </div>
      </div>
    </section>
  );
}
