"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(".reveal");
    if (!revealItems.length) return;
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return null;
}
