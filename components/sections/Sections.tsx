"use client";

import Image from "next/image";
import { PRODUCT_IMAGES } from "@/lib/product-images";
import { useLocale } from "@/lib/locale";
import styles from "./SectionShell.module.css";

export function MaviloSection() {
  const { t } = useLocale();
  return (
    <section id="mavilo" className={`section ${styles.block}`} aria-labelledby="mavilo-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{t.mavilo.eyebrow}</p>
          <h2 id="mavilo-title" className="section-title">
            {t.mavilo.title}
          </h2>
          <p className="section-body">{t.mavilo.body}</p>
        </div>
        <figure className={styles.mobileOnlyMedia}>
          <Image
            src={PRODUCT_IMAGES.detailBrand}
            alt={t.three.productAlt}
            width={960}
            height={720}
            className={styles.bleedImage}
            sizes="100vw"
          />
        </figure>
      </div>
    </section>
  );
}

export function HandSection() {
  const { t } = useLocale();
  return (
    <section id="mano" className={`section ${styles.block}`} aria-labelledby="hand-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{t.hand.eyebrow}</p>
          <h2 id="hand-title" className="section-title">
            {t.hand.title}
          </h2>
          <p className="section-body">{t.hand.body}</p>
          <dl className={styles.specs}>
            {t.hand.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className={styles.mobileOnlyMedia}>
          <Image
            src={PRODUCT_IMAGES.heroDorsal}
            alt={t.three.productAlt}
            width={800}
            height={1000}
            className={styles.bleedImage}
            sizes="100vw"
          />
        </figure>
      </div>
    </section>
  );
}

export function SignalSection() {
  const { t } = useLocale();
  return (
    <section id="senal" className={`section ${styles.block}`} aria-labelledby="signal-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{t.signal.eyebrow}</p>
          <h2 id="signal-title" className="section-title">
            {t.signal.title}
          </h2>
          <ol className={styles.timeline}>
            {t.signal.steps.map((step, index) => (
              <li key={step.label}>
                <span className={styles.timelineNum}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.label}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function ExploreSection() {
  const { t } = useLocale();
  const items = [
    t.explore.hotspots.palm,
    t.explore.hotspots.finger,
    t.explore.hotspots.linkage,
    t.explore.hotspots.thumb,
    t.explore.hotspots.fingerBase,
  ];

  return (
    <section id="explora" className={`section ${styles.block}`} aria-labelledby="explore-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{t.explore.eyebrow}</p>
          <h2 id="explore-title" className="section-title">
            {t.explore.title}
          </h2>
          <p className="section-body">{t.explore.body}</p>
          <ul className={styles.indexList}>
            {items.map((item, i) => (
              <li key={item.title}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function MovementSection() {
  const { t } = useLocale();
  return (
    <section id="movimiento" className={`section ${styles.blockTall}`} aria-labelledby="motion-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{t.movement.eyebrow}</p>
          <h2 id="motion-title" className="section-title">
            {t.movement.title}
          </h2>
          <p className="section-body">{t.movement.body}</p>
          <p className={styles.scrollCue}>{t.movement.scrollCue}</p>
          <div className={styles.gripControls} role="group" aria-label={t.movement.title}>
            <button type="button" className="btn btn-ghost" disabled>
              {t.movement.open}
            </button>
            <button type="button" className="btn btn-ghost" disabled>
              {t.movement.close}
            </button>
          </div>
        </div>
        <div className={styles.mobileMotion}>
          <Image
            src={PRODUCT_IMAGES.motionOpen}
            alt={t.three.productAlt}
            width={720}
            height={900}
            className={styles.bleedImage}
            sizes="(max-width: 960px) 50vw, 0px"
          />
          <Image
            src={PRODUCT_IMAGES.motionSide}
            alt={t.three.productAlt}
            width={720}
            height={900}
            className={styles.bleedImage}
            sizes="(max-width: 960px) 50vw, 0px"
          />
        </div>
      </div>
    </section>
  );
}

export function EngineeringSection() {
  const { t } = useLocale();
  return (
    <section id="ingenieria" className={`section ${styles.block}`} aria-labelledby="eng-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{t.engineering.eyebrow}</p>
          <h2 id="eng-title" className="section-title">
            {t.engineering.title}
          </h2>
          <p className="section-body">{t.engineering.body}</p>
        </div>
      </div>
    </section>
  );
}

export function EcosystemSection() {
  const { t } = useLocale();
  return (
    <section id="ecosistema" className={`section ${styles.block}`} aria-labelledby="eco-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.copy} data-reveal>
          <p className="eyebrow">{t.ecosystem.eyebrow}</p>
          <h2 id="eco-title" className="section-title">
            {t.ecosystem.title}
          </h2>
          <p className="section-body">{t.ecosystem.body}</p>
          <ul className={styles.bareList}>
            {t.ecosystem.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  const { t } = useLocale();
  return (
    <section id="contacto" className={`section ${styles.contact}`} aria-labelledby="contact-title">
      <div className={`container ${styles.rail}`}>
        <div className={styles.contactInner} data-reveal>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 id="contact-title" className="section-title">
            {t.contact.title}
          </h2>
          <p className="section-body">{t.contact.body}</p>
          <ul className={styles.audiences}>
            {t.contact.audiences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className={styles.contactActions}>
            <a className="btn btn-primary" href={`mailto:${t.contact.email}`}>
              {t.contact.email}
            </a>
            <a className="btn btn-ghost" href={`mailto:${t.contact.email}`}>
              {t.contact.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
