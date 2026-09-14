"use client";

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
          holdLastFrame
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
          objectPosition="50% 38%"
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
 * Phase 2 second half — editorial system / ecosystem / clinics.
 * Typography + negative space. No product image reuse. No SaaS cards.
 */
export function SystemSection() {
  const { t } = useLocale();

  return (
    <>
      {/* Breath: engineering → signal */}
      <section className={styles.bridge} aria-label={t.signal.bridge}>
        <div className="container">
          <p className={styles.bridgeLine}>{t.signal.bridge}</p>
        </div>
      </section>

      {/* 06 — System: engineering diagram */}
      <section id="senal" className={styles.system} aria-labelledby="system-title">
        <div className={`container ${styles.systemInner}`}>
          <p className="eyebrow">{t.signal.eyebrow}</p>
          <h2 id="system-title" className={styles.systemTitle}>
            {t.signal.title}
          </h2>
          <p className={styles.systemBody}>{t.signal.body}</p>

          <ol className={styles.signalDiagram} aria-label={t.signal.title}>
            {t.signal.steps.map((step, index) => (
              <li key={step} className={styles.signalNode}>
                <span className={styles.signalMark}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.signalLabel}>{step}</span>
                {index < t.signal.steps.length - 1 ? (
                  <span className={styles.signalArrow} aria-hidden>
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 07 — Ecosystem: product chain */}
      <section id="ecosistema" className={styles.ecosystem} aria-labelledby="eco-title">
        <div className="container">
          <header className={styles.ecoLead}>
            <p className="eyebrow">{t.ecosystem.eyebrow}</p>
            <h2 id="eco-title" className={styles.h2}>
              {t.ecosystem.title}
            </h2>
            <p className={styles.ecoBody}>{t.ecosystem.body}</p>
          </header>

          <ol className={styles.ecoChain}>
            {t.ecosystem.pillars.map((pillar, index) => (
              <li key={pillar.index} className={styles.ecoPillar}>
                <span className={styles.ecoIndex}>{pillar.index}</span>
                <h3 className={styles.ecoTitle}>{pillar.title}</h3>
                <p className={styles.ecoPhrase}>{pillar.body}</p>
                {index < t.ecosystem.pillars.length - 1 ? (
                  <span className={styles.ecoFlow} aria-hidden />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 08 — Clinics: typography only */}
      <section id="clinicas" className={styles.clinics} aria-labelledby="clinics-title">
        <div className={`container ${styles.clinicsInner}`}>
          <p className="eyebrow">{t.clinics.eyebrow}</p>
          <h2 id="clinics-title" className={styles.h2}>
            {t.clinics.title}
          </h2>
          <p className={styles.clinicsBody}>{t.clinics.body}</p>

          <ol className={styles.clinicProcess}>
            {t.clinics.steps.map((step) => (
              <li key={step.index} className={styles.clinicStep}>
                <span className={styles.clinicIndex}>{step.index}</span>
                <span className={styles.clinicLabel}>{step.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

/** 09 — Purpose + contact. Film-credit close, not corporate footer. */
export function PurposeCtaSection() {
  const { t } = useLocale();

  return (
    <section id="contacto" className={styles.purpose} aria-labelledby="cta-title">
      <div className={`container ${styles.purposeInner}`}>
        <div className={styles.purposeBrand} id="empresa">
          <p className={styles.humanLine}>{t.human.line1}</p>
          <p className={styles.humanLineMuted}>{t.human.line2}</p>
          <p className={styles.aboutMark}>{t.about.title}</p>
        </div>

        <div className={styles.purposeCta}>
          <h2 id="cta-title" className={styles.finalTitle}>
            {t.cta.title}
          </h2>
          <p className={styles.finalBody}>{t.cta.body}</p>
          <a className={`btn btn-primary ${styles.ctaOnly}`} href={`mailto:${t.cta.email}`}>
            {t.cta.primary}
          </a>
          <a className={styles.email} href={`mailto:${t.cta.email}`}>
            {t.cta.email}
          </a>
        </div>
      </div>
    </section>
  );
}
