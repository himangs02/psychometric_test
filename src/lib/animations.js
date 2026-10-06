import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger safely on browser side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Checks if the user prefers reduced motion
 */
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Reusable Hero entrance timeline with fromTo & clearProps
 */
export const animateHero = (containerRef, onComplete) => {
  if (typeof window === "undefined" || prefersReducedMotion() || !containerRef.current) {
    if (onComplete) onComplete();
    return null;
  }

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.set(
          ".hero-badge, .hero-title-line, .hero-subtitle, .hero-cta-group, .hero-visual-container",
          { clearProps: "opacity,transform" }
        );
        if (onComplete) onComplete();
      },
    });

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6 }
    )
      .fromTo(
        ".hero-title-line",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        ".hero-cta-group",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(
        ".hero-floating-card",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, stagger: 0.08, duration: 0.7, ease: "back.out(1.7)" },
        "-=0.3"
      )
      .fromTo(
        ".hero-visual-container",
        { opacity: 0, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.8"
      );
  }, containerRef);

  return ctx;
};

/**
 * ScrollTrigger Section Reveal with fromTo
 */
export const animateSection = (sectionRef, elements = ".reveal-element") => {
  if (typeof window === "undefined" || prefersReducedMotion() || !sectionRef.current) return null;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elements,
      { opacity: 0, y: 25 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, sectionRef);

  return ctx;
};

/**
 * Staggered Card Reveal with ScrollTrigger
 */
export const animateCards = (gridRef, cardSelector = ".test-card-item") => {
  if (typeof window === "undefined" || prefersReducedMotion() || !gridRef.current) return null;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      cardSelector,
      { opacity: 0, y: 30, scale: 0.96 },
      {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "opacity,transform",
      }
    );
  }, gridRef);

  return ctx;
};

/**
 * Continuous subtle floating animation for badges / cards
 */
export const animateFloating = (elements, intensity = 6, duration = 3.5) => {
  if (typeof window === "undefined" || prefersReducedMotion()) return null;

  return gsap.to(elements, {
    y: `+=${intensity}`,
    duration,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.3,
      from: "random",
    },
  });
};
