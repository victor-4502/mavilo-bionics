"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import {
  AboutSection,
  ClinicsSection,
  ClosingSection,
  EcosystemSection,
  EngineeringSection,
  FinalCtaSection,
  HumanSection,
  IntroSection,
  MovementSection,
  ProductSection,
  SignalSection,
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

export default function HomePage() {
  return (
    <>
      <DocumentMeta />
      <div className={styles.shell}>
        <SiteHeader />
        <main className={styles.main}>
          <HeroSection />
          <IntroSection />
          <ProductSection />
          <MovementSection />
          <ClosingSection />
          <EngineeringSection />
          <SignalSection />
          <EcosystemSection />
          <ClinicsSection />
          <HumanSection />
          <AboutSection />
          <FinalCtaSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
