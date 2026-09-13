"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductJourney } from "@/components/sections/ProductJourney";
import {
  EngineeringSection,
  IntroSection,
  MovementSection,
  PurposeCtaSection,
  SystemSection,
} from "@/components/sections/HomeSections";
import { useLocale } from "@/lib/locale";
import { useEffect } from "react";
import styles from "./page.module.css";

function DocumentMeta() {
  const { t, locale } = useLocale();

  useEffect(() => {
    document.title = t.meta.title;
    document.documentElement.lang = locale;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", t.meta.description);
    }
  }, [t, locale]);

  return null;
}

/**
 * Home narrative — 7 acts:
 * 01 WOW → 02 Identity → 03 Discover MAV 1 → 04 Movement
 * → 05 Engineering → 06 System → 07 Purpose + Contact
 */
export default function HomePage() {
  return (
    <>
      <DocumentMeta />
      <div className={styles.shell}>
        <SiteHeader />
        <main className={styles.main}>
          {/* 01 — WOW */}
          <HeroSection />
          {/* 02 — MAVILO / identity */}
          <IntroSection />
          {/* 03 — Discover MAV 1 */}
          <ProductJourney />
          {/* 04 — Movement */}
          <MovementSection />
          {/* 05 — Engineering */}
          <EngineeringSection />
          {/* 06 — System (signal + ecosystem + clinics) */}
          <SystemSection />
          {/* 07 — Purpose + contact */}
          <PurposeCtaSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
