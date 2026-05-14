"use client";

import { useState } from "react";
import { faqItems } from "../../data/faq";

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const onToggle = (index: number) => {
    setOpen((current) => (current === index ? null : index));
  };

  return (
    <div className="faq-list">
      {faqItems.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <article key={item.q} className={`faq-card ${isOpen ? "open" : ""}`}>
            <button
              className="faq-toggle"
              id={`faq-btn-${idx + 1}`}
              aria-expanded={isOpen}
              aria-controls={`faq-${idx + 1}`}
              onClick={() => onToggle(idx)}
              type="button"
            >
              <span className="faq-q"><span className="faq-mark">Q.</span> {item.q}</span>
              <span className="faq-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></span>
            </button>
            {isOpen ? (
              <div
                className="faq-panel is-open"
                id={`faq-${idx + 1}`}
                role="region"
                aria-labelledby={`faq-btn-${idx + 1}`}
              >
                <div className="faq-panel-inner">
                  <p>{item.a}</p>
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
