"use client";

import Image from "next/image";
import { ProductVideoLoop } from "@/components/media/ProductVideoLoop";
import { useLocale } from "@/lib/locale";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { PRODUCT_VIDEOS } from "@/lib/product-videos";
import styles from "./HomeSections.module.css";

export function IntroSection() {
  const { t } = useLocale();

  return (
    <section id="mavilo" className={styles.section} aria-labelledby="intro-title">
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
          />
        </div>
      </div>
    </section>
  );
}

export function ProductSection() {
  // Replaced by ProductJourney in page.tsx — keep export for compatibility.
  return null;
}

export function MovementSection() {
  const { t } = useLocale();

  return (
    <section id="movimiento" className={styles.sectionBleed} aria-labelledby="movement-title">
      <div className={styles.fullMedia}>
        <ProductVideoLoop
          config={PRODUCT_VIDEOS.okGesture}
          ariaLabel={t.movement.videoLabel}
          objectPosition="50% 45%"
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

export function ClosingSection() {
  const { t } = useLocale();

  return (
    <section id="cierre" className={styles.section} aria-labelledby="closing-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copyBlock}>
          <p className="eyebrow">{t.closing.eyebrow}</p>
          <h2 id="closing-title" className={styles.h2}>
            {t.closing.title}
          </h2>
          <p className={styles.body}>{t.closing.body}</p>
        </div>
        <div className={styles.mediaPanel}>
          <ProductVideoLoop
            config={PRODUCT_VIDEOS.closeMotion}
            ariaLabel={t.closing.videoLabel}
            objectPosition="50% 45%"
          />
        </div>
      </div>
    </section>
  );
}

export function EngineeringSection() {
  const { t } = useLocale();

  return (
    <section id="tecnologia" className={styles.section} aria-labelledby="eng-title">
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

export function SignalSection() {
  const { t } = useLocale();

  return (
    <section id="senal" className={styles.section} aria-labelledby="signal-title">
      <div className={`container ${styles.signalWrap}`}>
        <div className={styles.leadCenter}>
          <p className="eyebrow">{t.signal.eyebrow}</p>
          <h2 id="signal-title" className={styles.h2}>
            {t.signal.title}
          </h2>
          <p className={styles.bodyNarrow}>{t.signal.body}</p>
        </div>
        <ol className={styles.signalChain}>
          {t.signal.steps.map((step, index) => (
            <li key={step} className={styles.signalStep}>
              <span className={styles.signalLabel}>{step}</span>
              {index < t.signal.steps.length - 1 ? (
                <span className={styles.signalArrow} aria-hidden>
                  ↓
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function EcosystemSection() {
  const { t } = useLocale();

  return (
    <section id="ecosistema" className={styles.section} aria-labelledby="eco-title">
      <div className={`container ${styles.split}`}>
        <div className={styles.copyBlock}>
          <p className="eyebrow">{t.ecosystem.eyebrow}</p>
          <h2 id="eco-title" className={styles.h2}>
            {t.ecosystem.title}
          </h2>
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
            sizes="(max-width: 900px) 100vw, 40rem"
          />
        </figure>
      </div>
    </section>
  );
}

export function ClinicsSection() {
  const { t } = useLocale();

  return (
    <section id="clinicas" className={styles.section} aria-labelledby="clinics-title">
      <div className="container">
        <div className={styles.lead}>
          <p className="eyebrow">{t.clinics.eyebrow}</p>
          <h2 id="clinics-title" className={styles.h2}>
            {t.clinics.title}
          </h2>
          <p className={styles.bodyNarrow}>{t.clinics.body}</p>
        </div>
        <ul className={styles.clinicGrid}>
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
    </section>
  );
}

export function HumanSection() {
  const { t } = useLocale();

  return (
    <section className={styles.human} aria-label={t.human.line1}>
      <div className="container">
        <p className={styles.humanLine}>{t.human.line1}</p>
        <p className={styles.humanLine}>{t.human.line2}</p>
      </div>
    </section>
  );
}

export function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="empresa" className={styles.section} aria-labelledby="about-title">
      <div className={`container ${styles.about}`}>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2 id="about-title" className={styles.h2}>
          {t.about.title}
        </h2>
        <p className={styles.bodyNarrow}>{t.about.body}</p>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  const { t } = useLocale();

  return (
    <section id="contacto" className={styles.final} aria-labelledby="cta-title">
      <div className={styles.finalMedia}>
        <Image
          src={PRODUCT_IMAGES.heroPalm}
          alt={t.cta.imageAlt}
          fill
          sizes="100vw"
          className={styles.finalImage}
        />
        <div className={styles.finalVeil} aria-hidden />
      </div>
      <div className={`container ${styles.finalCopy}`}>
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
    </section>
  );
}
