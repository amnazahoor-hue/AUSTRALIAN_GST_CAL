"use client";

import { useEffect, useRef, useState } from "react";
import type { CalculatorShareData } from "../../lib/calculator-share";
import { exportCalculatorPdf } from "../../lib/calculator-pdf";
import Image from "next/image";
import {
  buildEmailBody,
  getWhatsAppShareUrl,
  openGmailCompose,
  openMailApp,
  openOutlookCompose
} from "../../lib/calculator-share";

type Props = {
  data: CalculatorShareData;
};

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 2h8l4 4v14H4V2z" />
      <path d="M16 2v4h4" />
      <path d="M8 12h8M8 16h6" />
    </svg>
  );
}

export function CalculatorShareActions({ data }: Props) {
  const [exporting, setExporting] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailNotice, setEmailNotice] = useState("");
  const emailWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emailOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!emailWrapRef.current?.contains(event.target as Node)) {
        setEmailOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEmailOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [emailOpen]);

  const showNotice = (message: string) => {
    setEmailNotice(message);
    window.setTimeout(() => setEmailNotice(""), 2800);
  };

  const onWhatsApp = () => {
    setEmailOpen(false);
    window.open(getWhatsAppShareUrl(data), "_blank", "noopener,noreferrer");
  };

  const onMailApp = () => {
    setEmailOpen(false);
    openMailApp(data);
    showNotice("Opening your default mail app...");
  };

  const onGmail = () => {
    setEmailOpen(false);
    openGmailCompose(data);
    showNotice("Opening Gmail in a new tab...");
  };

  const onOutlook = () => {
    setEmailOpen(false);
    openOutlookCompose(data);
    showNotice("Opening Outlook in a new tab...");
  };

  const onCopyEmail = async () => {
    setEmailOpen(false);
    try {
      await navigator.clipboard.writeText(buildEmailBody(data));
      showNotice("Email text copied. Paste into any mail app.");
    } catch {
      showNotice("Could not copy. Try Gmail or Outlook above.");
    }
  };

  const onPdf = async () => {
    if (exporting) return;
    setEmailOpen(false);
    setExporting(true);
    try {
      await exportCalculatorPdf(data);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="calc-share" role="region" aria-label="Share calculation results">
      <p className="calc-share-title">Share as</p>
      <div className="calc-share-actions">
        <button type="button" className="share-btn share-btn-whatsapp" onClick={onWhatsApp}>
          <span className="share-btn-icon whatsapp" aria-hidden="true">
            <Image
              src="/whatsapp-official.svg"
              alt=""
              width={36}
              height={36}
              className="whatsapp-official-img"
              unoptimized
            />
          </span>
          <span className="share-btn-label">WhatsApp</span>
        </button>

        <div className="share-email-wrap" ref={emailWrapRef}>
          <button
            type="button"
            className={`share-btn share-btn-email ${emailOpen ? "active" : ""}`}
            onClick={() => setEmailOpen((open) => !open)}
            aria-expanded={emailOpen}
            aria-haspopup="menu"
          >
            <span className="share-btn-icon email" aria-hidden="true">
              <EmailIcon />
            </span>
            <span className="share-btn-label">Email</span>
          </button>

          {emailOpen && (
            <div className="email-share-menu" role="menu" aria-label="Email options">
              <button type="button" role="menuitem" className="email-share-option" onClick={onMailApp}>
                Mail app
              </button>
              <button type="button" role="menuitem" className="email-share-option" onClick={onGmail}>
                Gmail
              </button>
              <button type="button" role="menuitem" className="email-share-option" onClick={onOutlook}>
                Outlook
              </button>
              <button type="button" role="menuitem" className="email-share-option" onClick={onCopyEmail}>
                Copy text
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={`share-btn share-btn-pdf ${exporting ? "loading" : ""}`}
          onClick={onPdf}
          disabled={exporting}
        >
          <span className="share-btn-icon pdf" aria-hidden="true">
            <PdfIcon />
          </span>
          <span className="share-btn-label">{exporting ? "PDF…" : "PDF"}</span>
        </button>
      </div>

      {emailNotice && (
        <p className="calc-share-notice" role="status" aria-live="polite">
          {emailNotice}
        </p>
      )}
    </div>
  );
}
