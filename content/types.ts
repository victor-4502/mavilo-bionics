import type { Locale } from "@/types/hand";

export type HomeContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    product: string;
    technology: string;
    application: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    home: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  mavilo: {
    eyebrow: string;
    title: string;
    body: string;
  };
  hand: {
    eyebrow: string;
    title: string;
    body: string;
    specs: { label: string; value: string }[];
  };
  signal: {
    eyebrow: string;
    title: string;
    steps: { label: string; body: string }[];
  };
  explore: {
    eyebrow: string;
    title: string;
    body: string;
    hotspots: {
      palm: { title: string; body: string };
      finger: { title: string; body: string };
      linkage: { title: string; body: string };
      thumb: { title: string; body: string };
      fingerBase: { title: string; body: string };
    };
  };
  movement: {
    eyebrow: string;
    title: string;
    body: string;
    open: string;
    close: string;
    scaffoldNote: string;
    scrollCue: string;
  };
  engineering: {
    eyebrow: string;
    title: string;
    body: string;
  };
  ecosystem: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    email: string;
    cta: string;
    audiences: string[];
  };
  footer: {
    tagline: string;
    privacy: string;
    rights: string;
  };
  three: {
    placeholderLabel: string;
    placeholderHint: string;
    productAlt: string;
    productHint: string;
  };
};

export const locales: Locale[] = ["es", "en"];

export function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}
