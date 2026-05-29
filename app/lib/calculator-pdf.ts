import type { CalculatorShareData } from "./calculator-share";
import { SITE_NAME, SITE_URL } from "./calculator-share";

const currency = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

const BRAND = {
  blue: [37, 99, 235] as [number, number, number],
  purple: [124, 58, 237] as [number, number, number],
  text: [15, 23, 42] as [number, number, number],
  muted: [100, 116, 139] as [number, number, number],
  border: [226, 232, 240] as [number, number, number],
  panel: [248, 250, 252] as [number, number, number]
};

function modeLabel(mode: CalculatorShareData["mode"]): string {
  return mode === "add" ? "Add GST" : "Remove GST";
}

async function loadLogoDataUrl(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  try {
    const response = await fetch("/logo.svg");
    const svgText = await response.text();
    const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.crossOrigin = "anonymous";
    const dataUrl = await new Promise<string>((resolve, reject) => {
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas unavailable"));
          return;
        }
        ctx.drawImage(image, 0, 0, 128, 128);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Logo failed to load"));
      };
      image.src = objectUrl;
    });
    return dataUrl;
  } catch {
    return null;
  }
}

export async function exportCalculatorPdf(data: CalculatorShareData): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  let y = 0;

  doc.setFillColor(...BRAND.blue);
  doc.rect(0, 0, pageWidth * 0.55, 28, "F");
  doc.setFillColor(...BRAND.purple);
  doc.rect(pageWidth * 0.55, 0, pageWidth * 0.45, 28, "F");

  const logo = await loadLogoDataUrl();
  if (logo) {
    doc.addImage(logo, "PNG", margin, 8, 14, 14);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(SITE_NAME, margin + (logo ? 18 : 0), 17);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Australian GST Calculator", margin + (logo ? 18 : 0), 22);

  y = 40;
  doc.setTextColor(...BRAND.text);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("GST Calculation Summary", margin, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.muted);
  const generated = new Date().toLocaleString("en-AU", { dateStyle: "long", timeStyle: "short" });
  doc.text(`Generated on ${generated}`, margin, y);

  y += 12;
  doc.setDrawColor(...BRAND.border);
  doc.setFillColor(...BRAND.panel);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 42, 3, 3, "FD");

  const inputX = margin + 6;
  let inputY = y + 10;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.blue);
  doc.text("Calculation inputs", inputX, inputY);

  inputY += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...BRAND.text);
  const amountParsed = Number.parseFloat(data.amount);
  const amountDisplay = Number.isNaN(amountParsed) ? data.amount : currency.format(amountParsed);

  const rows: [string, string][] = [
    ["Mode", modeLabel(data.mode)],
    ["Amount", `${amountDisplay} AUD`],
    ["GST rate", `${data.rate}%`]
  ];

  rows.forEach(([label, value]) => {
    doc.setTextColor(...BRAND.muted);
    doc.setFontSize(9);
    doc.text(label, inputX, inputY);
    doc.setTextColor(...BRAND.text);
    doc.setFontSize(11);
    doc.text(value, inputX + 38, inputY);
    inputY += 9;
  });

  y += 52;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BRAND.purple);
  doc.text("Results", margin, y);

  y += 6;
  const resultBoxWidth = (pageWidth - margin * 2 - 8) / 2;
  const resultCards: [string, string][] = [
    ["GST amount", currency.format(data.results.gst)],
    ["Base amount", currency.format(data.results.base)]
  ];

  resultCards.forEach(([label, value], index) => {
    const x = margin + index * (resultBoxWidth + 8);
    doc.setDrawColor(...BRAND.border);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, y, resultBoxWidth, 24, 3, 3, "FD");
    doc.setFontSize(8);
    doc.setTextColor(...BRAND.muted);
    doc.text(label.toUpperCase(), x + 5, y + 8);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(...BRAND.text);
    doc.text(value, x + 5, y + 18);
  });

  y += 32;
  doc.setFillColor(...BRAND.blue);
  doc.roundedRect(margin, y, pageWidth - margin * 2, 28, 4, 4, "F");
  doc.setFillColor(...BRAND.purple);
  doc.triangle(pageWidth - margin - 40, y, pageWidth - margin, y, pageWidth - margin, y + 28, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL AMOUNT", margin + 8, y + 10);
  doc.setFontSize(22);
  doc.text(currency.format(data.results.total), margin + 8, y + 22);

  y += 40;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND.muted);
  doc.text(
    "This document was generated by AusGSTPro for reference only. It does not constitute tax or accounting advice.",
    margin,
    y,
    { maxWidth: pageWidth - margin * 2 }
  );

  y += 12;
  doc.setTextColor(...BRAND.blue);
  doc.textWithLink(SITE_URL, margin, y, { url: SITE_URL });

  const slug = new Date().toISOString().slice(0, 10);
  doc.save(`${SITE_NAME}-GST-Calculation-${slug}.pdf`);
}
