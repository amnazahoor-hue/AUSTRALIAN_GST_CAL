export const MAX_AMOUNT = 99_999_999.99;
export const MIN_AMOUNT = 0.01;
export const MAX_RATE = 100;

export function sanitizeNumeric(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot === -1) return cleaned;
  return cleaned.slice(0, dot + 1) + cleaned.slice(dot + 1).replace(/\./g, "");
}

export function toNumber(value: string): number | null {
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

export function sanitizeAmount(value: string): string {
  let cleaned = sanitizeNumeric(value);
  const dot = cleaned.indexOf(".");

  if (dot !== -1) {
    const whole = cleaned.slice(0, dot).slice(0, 8);
    const fraction = cleaned.slice(dot + 1, dot + 3);
    cleaned = fraction.length > 0 ? `${whole}.${fraction}` : whole;
  } else if (cleaned.length > 8) {
    cleaned = cleaned.slice(0, 8);
  }

  const num = toNumber(cleaned);
  if (num !== null && num > MAX_AMOUNT) {
    return "99999999.99";
  }

  return cleaned;
}

export function sanitizeRate(value: string): string {
  let cleaned = sanitizeNumeric(value);
  const dot = cleaned.indexOf(".");

  if (dot !== -1) {
    const whole = cleaned.slice(0, dot).slice(0, 3);
    const fraction = cleaned.slice(dot + 1, dot + 3);
    cleaned = fraction.length > 0 ? `${whole}.${fraction}` : whole;
  } else if (cleaned.length > 3) {
    cleaned = cleaned.slice(0, 3);
  }

  const num = toNumber(cleaned);
  if (num !== null && num > MAX_RATE) {
    return String(MAX_RATE);
  }

  return cleaned;
}

export function formatAmountValue(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  if (rounded % 1 === 0) return String(Math.round(rounded));
  return rounded.toFixed(2).replace(/\.?0+$/, "");
}

export function getAmountStep(value: number): number {
  if (value < 100) return 1;
  if (value < 10_000) return 10;
  if (value < 1_000_000) return 100;
  return 1_000;
}

export function moneyLengthClass(formatted: string): string {
  if (formatted.length > 18) return "money-xs";
  if (formatted.length > 14) return "money-sm";
  return "";
}
