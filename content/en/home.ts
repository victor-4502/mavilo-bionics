import type { HomeContent } from "../types";

const en: HomeContent = {
  meta: {
    title: "Mavilo Bionics — Bionic engineering",
    description:
      "Mavilo Bionics builds Mav 1, a precision bionic hand. Mexican engineering applied to human mobility.",
  },
  nav: {
    product: "Product",
    technology: "Technology",
    application: "Application",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Home",
  },
  hero: {
    eyebrow: "Mav 1",
    title: "Motion with precision.",
    subtitle:
      "Mexican bionic engineering. A hand designed to feel like a product — not a clinical template.",
    ctaPrimary: "Discover Mav 1",
    ctaSecondary: "Talk to us",
  },
  mavilo: {
    eyebrow: "MAVILO",
    title: "Mexican engineering applied to human mobility.",
    body: "We design and build bionic systems with mechanical rigor, myoelectric control, and a clear user experience. The product comes first: tangible precision, not abstract promises.",
  },
  hand: {
    eyebrow: "The hand",
    title: "Architecture built for the gesture.",
    body: "Silhouette, scale, and mechanisms aligned in one assembly. Technical polymers, precise geometry, and a construction meant for coordinated open and close motion.",
    specs: [
      { label: "Material", value: "Technical polymer · carbon fiber" },
      { label: "Gesture", value: "Coordinated open / close" },
      { label: "Detail", value: "Textured pads · mechanical pivots" },
    ],
  },
  signal: {
    eyebrow: "System",
    title: "From signal to motion.",
    steps: [
      {
        label: "Signal",
        body: "Muscle activity is captured and filtered to guide control.",
      },
      {
        label: "Processing",
        body: "The system interprets the user’s calibrated threshold.",
      },
      {
        label: "Control",
        body: "Prosthesis logic decides when to open or close.",
      },
      {
        label: "Motion",
        body: "The fingers respond in a coordinated, predictable gesture.",
      },
    ],
  },
  explore: {
    eyebrow: "Explore",
    title: "Physical architecture.",
    body: "Walk through the shell, fingers, linkage, thumb, and base — only real assembly components.",
    hotspots: {
      palm: {
        title: "Structure",
        body: "Shell and cover that define the protective volume of the hand.",
      },
      finger: {
        title: "Fingers",
        body: "Four fingers sharing a common mechanism for coordinated closing.",
      },
      linkage: {
        title: "Mechanism",
        body: "Finger links that transmit the flexion gesture.",
      },
      thumb: {
        title: "Thumb",
        body: "Thumb subassembly integrated into open and close motion.",
      },
      fingerBase: {
        title: "Base",
        body: "Interface between each finger and the palm structure.",
      },
    },
  },
  movement: {
    eyebrow: "Motion",
    title: "Open and close.",
    body: "The product gesture is coordinated: four fingers open and close together. No invented grasp patterns.",
    open: "Open",
    close: "Close",
    scaffoldNote: "Scaffold — controls will activate with the 3D model.",
    scrollCue: "Scroll — the image shifts from open to profile.",
  },
  engineering: {
    eyebrow: "Engineering",
    title: "Inside, by groups.",
    body: "A technical reading of the architecture: palm and cover, each finger, thumb, and linkages — without exploding what the model does not contain.",
  },
  ecosystem: {
    eyebrow: "Ecosystem",
    title: "Calibration, app, and support.",
    body: "Mav 1 pairs with a mobile app for safe, clear myoelectric threshold calibration — built for daily use and clinical workflow.",
    points: [
      "Live muscle signal during calibration",
      "Calibration mode that keeps the hand locked",
      "Threshold retained on the prosthesis",
      "Accounts and devices designed for clinical teams",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let’s build the next movement.",
    body: "Whether you are a user, clinic, or collaborator — write to us. We want precise conversations about Mav 1 and what comes next.",
    email: "contacto@mavilobionics.com",
    cta: "Send email",
    audiences: ["Users", "Clinics", "Collaborators", "General inquiry"],
  },
  footer: {
    tagline: "Bionics with human purpose.",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
  },
  three: {
    placeholderLabel: "Mav 1",
    placeholderHint: "Scene ready for hand-hero.glb",
    productAlt: "Mavilo Mav 1 bionic hand",
    productHint: "Product photography · 3D model will live here",
  },
};

export default en;
