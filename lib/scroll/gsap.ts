/**
 * GSAP is installed for a later ScrollTrigger phase.
 * Import from here when wiring section timelines — do not scatter gsap.registerPlugin calls.
 */
import gsap from "gsap";

export { gsap };

export async function loadScrollTrigger() {
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  gsap.registerPlugin(ScrollTrigger);
  return ScrollTrigger;
}
