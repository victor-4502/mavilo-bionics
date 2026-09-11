"use client";

import { useEffect } from "react";
import { gsap, loadScrollTrigger } from "@/lib/scroll/gsap";

const SECTION_VISUAL: Record<string, string> = {
  hero: "hero",
  mavilo: "mavilo",
  mano: "mano",
  senal: "senal",
  explora: "explora",
  movimiento: "movimiento",
  ingenieria: "ingenieria",
  ecosistema: "ecosistema",
  contacto: "contacto",
};

const WASH: Record<string, string> = {
  hero: "radial-gradient(ellipse 80% 60% at 18% 18%, rgba(11,31,58,.6), transparent 55%), radial-gradient(ellipse 60% 45% at 80% 70%, rgba(43,184,232,.08), transparent 50%), linear-gradient(180deg,#000,#050b14 50%,#000)",
  mavilo: "radial-gradient(ellipse 70% 55% at 30% 40%, rgba(8,24,48,.7), transparent 55%), linear-gradient(180deg,#000,#07101c 55%,#000)",
  mano: "radial-gradient(ellipse 75% 55% at 25% 30%, rgba(15,35,60,.55), transparent 55%), linear-gradient(180deg,#000,#050b14 50%,#000)",
  senal: "radial-gradient(ellipse 70% 50% at 20% 50%, rgba(43,184,232,.12), transparent 50%), linear-gradient(180deg,#000,#061522 50%,#000)",
  explora: "radial-gradient(ellipse 65% 50% at 25% 35%, rgba(61,126,255,.1), transparent 50%), linear-gradient(180deg,#000,#050b14 55%,#000)",
  movimiento: "radial-gradient(ellipse 70% 55% at 22% 40%, rgba(43,184,232,.14), transparent 52%), linear-gradient(180deg,#000,#071628 50%,#000)",
  ingenieria: "radial-gradient(ellipse 70% 50% at 28% 45%, rgba(11,31,58,.65), transparent 55%), linear-gradient(180deg,#000,#040910 55%,#000)",
  ecosistema: "radial-gradient(ellipse 65% 50% at 20% 35%, rgba(11,31,58,.5), transparent 55%), linear-gradient(180deg,#000,#050b14 50%,#000)",
  contacto: "radial-gradient(ellipse 80% 60% at 25% 30%, rgba(43,184,232,.1), transparent 50%), linear-gradient(180deg,#000,#0b1f3a 60%,#000)",
};

function setActiveVisual(id: string) {
  const slides = document.querySelectorAll<HTMLElement>("[data-visual]");
  slides.forEach((slide) => {
    const active = slide.dataset.visual === id;
    slide.dataset.active = active ? "true" : "false";
    gsap.to(slide, {
      opacity: active ? 1 : 0,
      scale: active ? 1 : 1.05,
      duration: 0.75,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
}

export function ScrollDirector() {
  useEffect(() => {
    let ctx: gsap.Context | null = null;
    let cancelled = false;

    async function boot() {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const ScrollTrigger = await loadScrollTrigger();
      if (cancelled) return;

      ctx = gsap.context(() => {
        const wash = document.querySelector<HTMLElement>("[data-atmosphere-wash]");
        const orbA = document.querySelector<HTMLElement>('[data-orb="a"]');
        const orbB = document.querySelector<HTMLElement>('[data-orb="b"]');
        const glow = document.querySelector<HTMLElement>("[data-stage-glow]");

        // Initial visual state
        setActiveVisual("hero");
        if (wash) wash.style.background = WASH.hero;

        Object.entries(SECTION_VISUAL).forEach(([sectionId, visualId]) => {
          const section = document.getElementById(sectionId);
          if (!section) return;

          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 45%",
            onEnter: () => {
              setActiveVisual(visualId);
              if (wash) wash.style.background = WASH[sectionId] ?? WASH.hero;
              gsap.to(orbA, { x: sectionId === "movimiento" ? 40 : 0, opacity: 0.4, duration: 1 });
              gsap.to(orbB, {
                y: sectionId === "contacto" ? -30 : 0,
                opacity: sectionId === "senal" || sectionId === "movimiento" ? 0.45 : 0.28,
                duration: 1,
              });
              gsap.to(glow, {
                opacity: sectionId === "hero" || sectionId === "movimiento" ? 0.7 : 0.35,
                duration: 0.8,
              });
            },
            onEnterBack: () => {
              setActiveVisual(visualId);
              if (wash) wash.style.background = WASH[sectionId] ?? WASH.hero;
            },
          });
        });

        const motion = document.getElementById("movimiento");
        if (motion) {
          ScrollTrigger.create({
            trigger: motion,
            start: "top 40%",
            end: "bottom 40%",
            scrub: 0.6,
            onUpdate: (self) => {
              setActiveVisual(self.progress > 0.45 ? "movimiento-close" : "movimiento");
            },
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        const heroCopy = document.querySelector("[data-hero-copy]");
        if (heroCopy) {
          gsap.fromTo(
            heroCopy.children,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: "power2.out",
              delay: 0.1,
            },
          );
        }
      });
    }

    boot();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
