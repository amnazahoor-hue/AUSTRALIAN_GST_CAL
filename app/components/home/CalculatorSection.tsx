"use client";



import { FormEvent, useRef, useState } from "react";

import { CalculatorShareActions } from "./CalculatorShareActions";

import {

  formatAmountValue,

  getAmountStep,

  MAX_AMOUNT,

  MAX_RATE,

  moneyLengthClass,

  sanitizeAmount,

  sanitizeRate,

  toNumber

} from "../../lib/calculator-input";



type Mode = "add" | "remove";



type Results = { gst: number; base: number; total: number };



function compute(mode: Mode, amount: string, rate: string): Results {

  const a = Math.max(0, toNumber(amount) ?? 0);

  const r = Math.max(0, Math.min(MAX_RATE, toNumber(rate) ?? 0));

  if (mode === "add") {

    const gst = a * (r / 100);

    return { gst, base: a, total: a + gst };

  }

  const base = a / (1 + r / 100);

  return { gst: a - base, base, total: a };

}



const currency = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });



const INITIAL_MODE: Mode = "add";

const INITIAL_RATE = "10";



function formatMoney(value: number, hasResults: boolean): string {

  return hasResults ? currency.format(value) : "—";

}



export function CalculatorSection() {

  const calcTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mode, setMode] = useState<Mode>(INITIAL_MODE);

  const [amount, setAmount] = useState("");

  const [rate, setRate] = useState(INITIAL_RATE);

  const [amountError, setAmountError] = useState("");

  const [rateError, setRateError] = useState("");

  const [loading, setLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  const [results, setResults] = useState<Results | null>(null);



  const validate = (): boolean => {

    let ok = true;

    const a = toNumber(amount);

    const r = toNumber(rate);



    if (amount.trim() === "" || a === null || a <= 0) {

      setAmountError("Enter a valid amount greater than 0.");

      ok = false;

    } else if (a > MAX_AMOUNT) {

      setAmountError(`Maximum amount is ${currency.format(MAX_AMOUNT)}.`);

      ok = false;

    } else {

      setAmountError("");

    }



    if (rate.trim() === "" || r === null || r < 0 || r > MAX_RATE) {

      setRateError(`Rate must be between 0 and ${MAX_RATE}.`);

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

    if (calcTimeoutRef.current) clearTimeout(calcTimeoutRef.current);

    calcTimeoutRef.current = setTimeout(() => {

      setResults(compute(mode, amount, rate));

      setLoading(false);

      calcTimeoutRef.current = null;

    }, 450);

  };



  const onReset = () => {

    if (calcTimeoutRef.current) {

      clearTimeout(calcTimeoutRef.current);

      calcTimeoutRef.current = null;

    }

    setMode(INITIAL_MODE);

    setAmount("");

    setRate(INITIAL_RATE);

    setAmountError("");

    setRateError("");

    setResults(null);

    setLoading(false);

    setCopied(false);

  };



  const adjustAmount = (direction: 1 | -1) => {

    const current = toNumber(amount) ?? 0;

    const step = getAmountStep(Math.max(current, 1));

    let next = current + direction * step;



    if (next <= 0) {

      setAmount("");

      setAmountError("");

      return;

    }



    if (next > MAX_AMOUNT) next = MAX_AMOUNT;

    setAmount(formatAmountValue(next));

    setAmountError("");

  };



  const hasResults = results !== null;

  const display = results ?? { gst: 0, base: 0, total: 0 };



  const gstFormatted = formatMoney(display.gst, hasResults);

  const baseFormatted = formatMoney(display.base, hasResults);

  const totalFormatted = formatMoney(display.total, hasResults);



  const copy = async () => {

    if (!results) return;

    try {

      await navigator.clipboard.writeText(currency.format(results.gst));

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

          <div className="input-wrap input-wrap-amount">
            <input
              id="amountInput"
              inputMode="decimal"
              autoComplete="off"
              value={amount}
              onChange={(e) => {
                setAmount(sanitizeAmount(e.target.value));
                if (amountError) setAmountError("");
              }}
              placeholder="1000"
              aria-describedby="amountHint amountError"
              required
            />
            <div className="amount-spin">
              <button
                type="button"
                className="amount-spin-btn"
                aria-label="Increase amount"
                onClick={() => adjustAmount(1)}
              >
                <svg className="spin-icon" viewBox="0 0 12 8" aria-hidden="true">
                  <path d="M2 6l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="amount-spin-btn"
                aria-label="Decrease amount"
                onClick={() => adjustAmount(-1)}
              >
                <svg className="spin-icon" viewBox="0 0 12 8" aria-hidden="true">
                  <path d="M2 2l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <span className="amount-currency">AUD</span>
          </div>

          <span className="field-hint" id="amountHint">Max {currency.format(MAX_AMOUNT)}</span>

          <span className="field-error" id="amountError" role="alert">{amountError}</span>

        </label>



        <label className="field" htmlFor="rateInput">

          <span>GST RATE (%)</span>

          <div className="input-wrap">

            <input

              id="rateInput"

              inputMode="decimal"

              autoComplete="off"

              value={rate}

              onChange={(e) => {

                setRate(sanitizeRate(e.target.value));

                if (rateError) setRateError("");

              }}

              placeholder="10"

              aria-describedby="rateError"

              required

            />

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

            <strong className={moneyLengthClass(gstFormatted)}>{gstFormatted}</strong>

            <button className="icon-btn small" aria-label="Copy GST amount" type="button" onClick={copy} disabled={!hasResults}>

              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 9h11v11H9zM4 4h11v11H4z" /></svg>

            </button>

          </div>

        </article>

        <article className="result-card">

          <span>BASE AMOUNT</span>

          <strong className={moneyLengthClass(baseFormatted)}>{baseFormatted}</strong>

        </article>

      </div>



      <article className="total-card">

        <span>TOTAL AMOUNT</span>

        <strong className={moneyLengthClass(totalFormatted)}>{totalFormatted}</strong>

      </article>



      {hasResults && results && (

        <CalculatorShareActions

          data={{

            mode,

            amount,

            rate,

            results

          }}

        />

      )}



      <div className={`copy-toast ${copied ? "show" : ""}`} role="status" aria-live="polite">Copied!</div>

    </aside>

  );

}

