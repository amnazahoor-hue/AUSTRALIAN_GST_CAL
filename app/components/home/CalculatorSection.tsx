"use client";

import { FormEvent, useMemo, useState } from "react";

type Mode = "add" | "remove";

function sanitize(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot === -1) return cleaned;
  return cleaned.slice(0, dot + 1) + cleaned.slice(dot + 1).replace(/\./g, "");
}

function toNumber(value: string): number | null {
  const parsed = Number.parseFloat(value);
  return Number.isNaN(parsed) ? null : parsed;
}

const currency = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

export function CalculatorSection() {
  const [mode, setMode] = useState<Mode>("add");
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("10");
  const [amountError, setAmountError] = useState("");
  const [rateError, setRateError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const values = useMemo(() => {
    const a = Math.max(0, toNumber(amount) ?? 0);
    const r = Math.max(0, Math.min(100, toNumber(rate) ?? 0));
    if (mode === "add") {
      const gst = a * (r / 100);
      return { gst, base: a, total: a + gst };
    }
    const base = a / (1 + r / 100);
    return { gst: a - base, base, total: a };
  }, [amount, rate, mode]);

  const validate = (): boolean => {
    let ok = true;
    const a = toNumber(amount);
    const r = toNumber(rate);
    if (amount.trim() === "" || a === null || a <= 0) {
      setAmountError("Enter a valid amount greater than 0.");
      ok = false;
    } else {
      setAmountError("");
    }
    if (rate.trim() === "" || r === null || r < 0 || r > 100) {
      setRateError("Rate must be between 0 and 100.");
      ok = false;
    } else {
      setRateError("");
    }
    return ok;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    window.setTimeout(() => setLoading(false), 450);
  };

  const onReset = () => {
    setMode("add");
    setAmount("1000");
    setRate("10");
    setAmountError("");
    setRateError("");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(currency.format(values.gst));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside className="calc-card" id="calculator" aria-labelledby="calcHeading">
      <div className="calc-head">
        <h2 id="calcHeading"><span aria-hidden="true">#</span> GST Calculator</h2>
        <button className="icon-btn" aria-label="Reset calculator" type="button" onClick={onReset}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg>
        </button>
      </div>

      <div className="mode-toggle" role="tablist" aria-label="Calculation mode">
        <button className={`mode-btn ${mode === "add" ? "active" : ""}`} type="button" role="tab" aria-selected={mode === "add"} onClick={() => setMode("add")}>+ Add GST</button>
        <button className={`mode-btn ${mode === "remove" ? "active" : ""}`} type="button" role="tab" aria-selected={mode === "remove"} onClick={() => setMode("remove")}>- Remove GST</button>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <label className="field" htmlFor="amountInput">
          <span>AMOUNT ($)</span>
          <div className="input-wrap">
            <input id="amountInput" inputMode="decimal" autoComplete="off" value={amount} onChange={(e) => setAmount(sanitize(e.target.value))} placeholder="1000" aria-describedby="amountError" required />
            <small>AUD</small>
          </div>
          <span className="field-error" id="amountError" role="alert">{amountError}</span>
        </label>

        <label className="field" htmlFor="rateInput">
          <span>GST RATE (%)</span>
          <div className="input-wrap">
            <input id="rateInput" inputMode="decimal" autoComplete="off" value={rate} onChange={(e) => setRate(sanitize(e.target.value))} placeholder="10" aria-describedby="rateError" required />
            <small>%</small>
          </div>
          <span className="field-error" id="rateError" role="alert">{rateError}</span>
        </label>

        <button type="submit" className={`btn btn-calc ${loading ? "loading" : ""}`} disabled={loading}>
          <span className="btn-label">{loading ? "Calculating..." : "Calculate"}</span>
          <span className="btn-spinner" aria-hidden="true"></span>
        </button>
      </form>

      <div className="result-row" aria-live="polite">
        <article className="result-card">
          <span>GST AMOUNT</span>
          <div className="result-value-wrap">
            <strong>{currency.format(values.gst)}</strong>
            <button className="icon-btn small" aria-label="Copy GST amount" type="button" onClick={copy}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h11v11H9zM4 4h11v11H4z" /></svg>
            </button>
          </div>
        </article>
        <article className="result-card">
          <span>BASE AMOUNT</span>
          <strong>{currency.format(values.base)}</strong>
        </article>
      </div>

      <article className="total-card">
        <span>TOTAL AMOUNT</span>
        <strong>{currency.format(values.total)}</strong>
      </article>

      <div className={`copy-toast ${copied ? "show" : ""}`} role="status" aria-live="polite">Copied!</div>
    </aside>
  );
}
