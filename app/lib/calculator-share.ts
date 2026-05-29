export type CalculatorShareData = {
  mode: "add" | "remove";
  amount: string;
  rate: string;
  results: { gst: number; base: number; total: number };
};

export const SITE_URL = "https://ausgstpro.com";
export const SITE_NAME = "AusGSTPro";

const currency = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

function modeLabel(mode: CalculatorShareData["mode"]): string {
  return mode === "add" ? "Add GST" : "Remove GST";
}

function formatAmountInput(amount: string): string {
  const parsed = Number.parseFloat(amount);
  if (Number.isNaN(parsed)) return amount;
  return currency.format(parsed);
}

export function buildShareMessage(data: CalculatorShareData): string {
  const { mode, amount, rate, results } = data;
  const generated = new Date().toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  return [
    `*${SITE_NAME} — GST Calculation*`,
    "",
    `Mode: ${modeLabel(mode)}`,
    `Amount entered: ${formatAmountInput(amount)} AUD`,
    `GST rate: ${rate}%`,
    "",
    "*Results*",
    `• GST amount: ${currency.format(results.gst)}`,
    `• Base amount: ${currency.format(results.base)}`,
    `• Total amount: ${currency.format(results.total)}`,
    "",
    `Generated: ${generated}`,
    "",
    `Calculate your own GST at ${SITE_URL}`,
    "",
    "_ATO-compliant calculator for Australian businesses._"
  ].join("\n");
}

export function getWhatsAppShareUrl(data: CalculatorShareData): string {
  return `https://wa.me/?text=${encodeURIComponent(buildShareMessage(data))}`;
}

export function buildEmailBody(data: CalculatorShareData): string {
  const { mode, amount, rate, results } = data;
  const generated = new Date().toLocaleString("en-AU", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  return [
    `${SITE_NAME} - GST Calculation`,
    "",
    `Mode: ${modeLabel(mode)}`,
    `Amount entered: ${formatAmountInput(amount)} AUD`,
    `GST rate: ${rate}%`,
    "",
    "Results:",
    `- GST amount: ${currency.format(results.gst)}`,
    `- Base amount: ${currency.format(results.base)}`,
    `- Total amount: ${currency.format(results.total)}`,
    "",
    `Generated: ${generated}`,
    "",
    `Calculate your own GST at ${SITE_URL}`,
    "",
    "ATO-compliant calculator for Australian businesses."
  ].join("\r\n");
}

export function getEmailSubject(): string {
  return `${SITE_NAME} - GST Calculation Summary`;
}

export function getEmailShareUrl(data: CalculatorShareData): string {
  const subject = getEmailSubject();
  const body = buildEmailBody(data);
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function getGmailComposeUrl(data: CalculatorShareData): string {
  const subject = getEmailSubject();
  const body = buildEmailBody(data);
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    su: subject,
    body
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function getOutlookComposeUrl(data: CalculatorShareData): string {
  const subject = getEmailSubject();
  const body = buildEmailBody(data);
  const params = new URLSearchParams({
    subject,
    body
  });
  return `https://outlook.live.com/mail/0/deeplink/compose?${params.toString()}`;
}

export function openMailApp(data: CalculatorShareData): void {
  const url = getEmailShareUrl(data);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function openGmailCompose(data: CalculatorShareData): void {
  window.open(getGmailComposeUrl(data), "_blank", "noopener,noreferrer");
}

export function openOutlookCompose(data: CalculatorShareData): void {
  window.open(getOutlookComposeUrl(data), "_blank", "noopener,noreferrer");
}
