"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  id: string;
  label: string;
  kind: "percent" | "seconds" | "text";
  text?: string;
};

const STATS: StatItem[] = [
  { id: "compliant", label: "ATO COMPLIANT", kind: "percent" },
  { id: "instant", label: "INSTANT RESULTS", kind: "seconds" },
  { id: "available", label: "AVAILABLE", kind: "text", text: "24/7" }
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function StatIcon({ id }: { id: string }) {
  if (id === "compliant") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l7 3v6c0 4.2-2.9 7.4-7 9-4.1-1.6-7-4.8-7-9V6l7-3z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (id === "instant") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function HeroStats() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [percent, setPercent] = useState(0);
  const [seconds, setSeconds] = useState(2);

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(true);
      setPercent(100);
      setSeconds(0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPercent(100);
      setSeconds(0);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(progress);
      setPercent(Math.round(eased * 100));
      setSeconds(Math.max(0, +(2 - eased * 2).toFixed(1)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setPercent(100);
        setSeconds(0);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const displayValue = (item: StatItem) => {
    if (item.kind === "percent") return `${percent}%`;
    if (item.kind === "seconds") return `${seconds.toFixed(1)}s`;
    return item.text ?? "";
  };

  return (
    <div ref={rowRef} className={`stats-row ${active ? "is-active" : ""}`} role="list">
      {STATS.map((item, index) => (
        <div
          key={item.id}
          className={`stat ${active ? "is-visible" : ""}`}
          role="listitem"
          style={{ animationDelay: active ? `${80 + index * 100}ms` : undefined }}
        >
          <span className="stat-icon" aria-hidden="true">
            <StatIcon id={item.id} />
          </span>
          <strong className="stat-value">{displayValue(item)}</strong>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
