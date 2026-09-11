"use client";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Atmosphere } from "@/components/experience/Atmosphere";
import { ScrollDirector } from "@/components/experience/ScrollDirector";
import { StickyProductStage } from "@/components/experience/StickyProductStage";
import { HeroSection } from "@/components/sections/HeroSection";
import {
  ContactSection,
  EcosystemSection,
  EngineeringSection,
  ExploreSection,
  HandSection,
  MaviloSection,
  MovementSection,
  SignalSection,
} from "@/components/sections/Sections";
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
      <Atmosphere />
      <StickyProductStage />
      <ScrollDirector />
      <div className={styles.shell}>
        <SiteHeader />
        <main className={styles.main}>
          <HeroSection />
          <MaviloSection />
          <HandSection />
          <SignalSection />
          <ExploreSection />
          <MovementSection />
          <EngineeringSection />
          <EcosystemSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
