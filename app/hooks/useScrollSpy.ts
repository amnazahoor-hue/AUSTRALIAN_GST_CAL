"use client";

import { useEffect, useState } from "react";

const HOME_SECTIONS = ["hero", "how-it-works", "features", "faq"] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number];

function getHeaderOffset(): number {
  const header = document.querySelector(".site-header") as HTMLElement | null;
  return (header?.offsetHeight ?? 80) + 32;
}

function getActiveSection(): HomeSectionId {
  const offset = getHeaderOffset();
  let active: HomeSectionId = "hero";

  for (const id of HOME_SECTIONS) {
    const element = document.getElementById(id);
    if (!element) continue;
    if (element.getBoundingClientRect().top - offset <= 0) {
      active = id;
    }
  }

  return active;
}

export function useScrollSpy(enabled: boolean): HomeSectionId | null {
  const [activeSection, setActiveSection] = useState<HomeSectionId | null>(enabled ? "hero" : null);

  useEffect(() => {
    if (!enabled) {
      setActiveSection(null);
      return;
    }

    const update = () => setActiveSection(getActiveSection());
    update();

    const afterHash = window.setTimeout(update, 350);

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);

    return () => {
      window.clearTimeout(afterHash);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [enabled]);

  return activeSection;
}

export function navHrefMatchesSection(href: string, section: HomeSectionId | null): boolean {
  if (!section) return false;
  if (href === "/" || href === "/#hero") return section === "hero";
  if (href.startsWith("/#")) return href.slice(2) === section;
  return false;
}
