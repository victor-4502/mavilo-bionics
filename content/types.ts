import type { Locale } from "@/types/hand";

export type HomeContent = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    mav1: string;
    technology: string;
    ecosystem: string;
    clinics: string;
    mavilo: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    home: string;
  };
  hero: {
    brand: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    videoLabel: string;
  };
  intro: {
    brand: string;
    title: string;
    body: string;
    videoLabel: string;
  };
  product: {
    eyebrow: string;
    title: string;
    body: string;
    traits: string[];
    palmAlt: string;
    sideAlt: string;
    dorsalAlt: string;
    detailAlt: string;
  };
  movement: {
    eyebrow: string;
    title: string;
    body: string;
    videoLabel: string;
  };
  closing: {
    eyebrow: string;
    title: string;
    body: string;
    videoLabel: string;
  };
  engineering: {
    eyebrow: string;
    title: string;
    body: string;
    videoLabel: string;
    items: { index: string; title: string; body: string }[];
  };
  signal: {
    eyebrow: string;
    title: string;
    body: string;
    steps: string[];
  };
  ecosystem: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  clinics: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  human: {
    line1: string;
    line2: string;
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
    email: string;
    imageAlt: string;
  };
  footer: {
    tagline: string;
    privacy: string;
    rights: string;
  };
  /** Kept for unused 3D scaffold components until GLB lands */
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
