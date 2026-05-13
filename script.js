/* ═══════════════════════════════════════
   AusGSTPro — Site Logic
   • Calculator with validation + loading state
   • FAQ accordion (single open at a time)
   • Mobile menu (auto-close on link click)
   • Smooth scroll
   • Dynamic copyright year
   • Scroll reveal animations
═══════════════════════════════════════ */

(() => {
  "use strict";

  /* ─────────────────────────────────────
     ELEMENT REFS — guarded so legal pages
     (without calculator) don't error out
  ───────────────────────────────────── */
  const $ = (id) => document.getElementById(id);

  const amountInput  = $("amountInput");
  const rateInput    = $("rateInput");
  const amountError  = $("amountError");
  const rateError    = $("rateError");
  const addModeBtn   = $("addModeBtn");
  const removeModeBtn= $("removeModeBtn");
  const resetBtn     = $("resetBtn");
  const copyBtn      = $("copyBtn");
  const copyToast    = $("copyToast");
  const gstAmountEl  = $("gstAmount");
  const baseAmountEl = $("baseAmount");
  const totalAmountEl= $("totalAmount");
  const calcForm     = $("calcForm");
  const calcSubmit   = $("calcSubmit");
  const menuToggle   = $("menuToggle");
  const mainNav      = $("mainNav");
  const siteHeader   = document.querySelector(".site-header");
  const copyYearEl   = $("copyYear");

  /* ─────────────────────────────────────
     DYNAMIC COPYRIGHT YEAR
  ───────────────────────────────────── */
  if (copyYearEl) {
    copyYearEl.textContent = new Date().getFullYear();
  }

  /* ─────────────────────────────────────
     SMOOTH SCROLL with header offset
  ───────────────────────────────────── */
  const smoothScrollTo = (target) => {
    const headerHeight = siteHeader ? siteHeader.offsetHeight + 16 : 96;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      smoothScrollTo(target);

      // Auto-close mobile nav
      if (mainNav && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ─────────────────────────────────────
     MOBILE MENU TOGGLE + close on link click
  ───────────────────────────────────── */
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("open");
    });

    // Close menu when ANY nav link is clicked (including non-anchor ones)
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!mainNav.classList.contains("open")) return;
      if (mainNav.contains(e.target) || menuToggle.contains(e.target)) return;
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ─────────────────────────────────────
     FAQ ACCORDION — only one open at a time
  ───────────────────────────────────── */
  const faqToggles = document.querySelectorAll(".faq-toggle");
  faqToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".faq-card");
      const panel = document.getElementById(btn.getAttribute("aria-controls"));
      const isOpen = card.classList.contains("open");

      // Close all
      document.querySelectorAll(".faq-card.open").forEach((openCard) => {
        openCard.classList.remove("open");
        const openBtn = openCard.querySelector(".faq-toggle");
        const openPanel = document.getElementById(openBtn.getAttribute("aria-controls"));
        if (openBtn) openBtn.setAttribute("aria-expanded", "false");
        if (openPanel) openPanel.hidden = true;
      });

      // Open this one if it wasn't already
      if (!isOpen) {
        card.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        if (panel) panel.hidden = false;
      }
    });
  });

  /* ─────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────── */
  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = Number(entry.target.dataset.delay || 0);
            setTimeout(() => entry.target.classList.add("in-view"), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );
    revealItems.forEach((item, index) => {
      item.dataset.delay = String(index * 60);
      observer.observe(item);
    });
  } else {
    // Fallback — just show them
    revealItems.forEach((i) => i.classList.add("in-view"));
  }

  /* ─────────────────────────────────────
     CALCULATOR — only runs if elements exist
  ───────────────────────────────────── */
  if (!amountInput || !rateInput) return;

  const formatCurrency = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD"
  });

  const state = {
    mode: "add",
    amount: 1000,
    rate: 10
  };

  /* INPUT SANITIZATION */
  const sanitizeNumericInput = (value) => {
    const sanitized = String(value)
      .replace(/[^\d.]/g, "")
      .replace(/^(\d*\.?\d*).*$/, "$1");
    const firstDot = sanitized.indexOf(".");
    if (firstDot === -1) return sanitized;
    return sanitized.slice(0, firstDot + 1) + sanitized.slice(firstDot + 1).replace(/\./g, "");
  };

  const limitToTwoDecimals = (value) => {
    if (!value.includes(".")) return value;
    const [whole, decimal] = value.split(".");
    return `${whole}.${(decimal || "").slice(0, 2)}`;
  };

  const toValidNumber = (raw, { min = 0, max = Number.POSITIVE_INFINITY } = {}) => {
    const parsed = Number.parseFloat(raw);
    if (Number.isNaN(parsed)) return null;
    const clamped = Math.min(max, Math.max(min, parsed));
    return Math.round(clamped * 100) / 100;
  };

  /* VALIDATION — returns true if all valid */
  const validate = ({ silent = false } = {}) => {
    let valid = true;

    const amountRaw = amountInput.value.trim();
    const rateRaw   = rateInput.value.trim();

    // Amount
    if (amountRaw === "") {
      if (!silent) showError(amountInput, amountError, "Amount is required.");
      valid = false;
    } else if (toValidNumber(amountRaw) === null || Number.parseFloat(amountRaw) <= 0) {
      if (!silent) showError(amountInput, amountError, "Enter a valid amount greater than 0.");
      valid = false;
    } else {
      clearError(amountInput, amountError);
    }

    // Rate
    if (rateRaw === "") {
      if (!silent) showError(rateInput, rateError, "GST rate is required.");
      valid = false;
    } else {
      const r = Number.parseFloat(rateRaw);
      if (Number.isNaN(r) || r < 0 || r > 100) {
        if (!silent) showError(rateInput, rateError, "Rate must be between 0 and 100.");
        valid = false;
      } else {
        clearError(rateInput, rateError);
      }
    }

    return valid;
  };

  const showError = (input, errEl, msg) => {
    if (input) input.classList.add("invalid");
    if (errEl) errEl.textContent = msg;
  };
  const clearError = (input, errEl) => {
    if (input) input.classList.remove("invalid");
    if (errEl) errEl.textContent = "";
  };

  /* CALCULATE */
  const calculate = () => {
    const amount = Math.max(0, state.amount);
    const rate   = Math.max(0, Math.min(100, state.rate));
    let gstAmount, baseAmount, totalAmount;

    if (state.mode === "add") {
      gstAmount   = amount * (rate / 100);
      baseAmount  = amount;
      totalAmount = amount + gstAmount;
    } else {
      baseAmount  = amount / (1 + rate / 100);
      gstAmount   = amount - baseAmount;
      totalAmount = amount;
    }

    gstAmountEl.textContent   = formatCurrency.format(gstAmount);
    baseAmountEl.textContent  = formatCurrency.format(baseAmount);
    totalAmountEl.textContent = formatCurrency.format(totalAmount);
  };

  /* LIVE UPDATE (silent — no error nag while typing) */
  const liveUpdate = () => {
    const aClean = limitToTwoDecimals(sanitizeNumericInput(amountInput.value));
    const rClean = limitToTwoDecimals(sanitizeNumericInput(rateInput.value));
    if (amountInput.value !== aClean) amountInput.value = aClean;
    if (rateInput.value   !== rClean) rateInput.value   = rClean;

    const a = toValidNumber(aClean, { min: 0 });
    const r = toValidNumber(rClean, { min: 0, max: 100 });
    if (a !== null) state.amount = a;
    if (r !== null) state.rate   = r;

    // Clear errors as user types
    if (aClean !== "") clearError(amountInput, amountError);
    if (rClean !== "") clearError(rateInput, rateError);

    calculate();
  };

  /* MODE SWITCH */
  const setMode = (nextMode) => {
    state.mode = nextMode;
    addModeBtn.classList.toggle("active", nextMode === "add");
    removeModeBtn.classList.toggle("active", nextMode === "remove");
    addModeBtn.setAttribute("aria-selected", String(nextMode === "add"));
    removeModeBtn.setAttribute("aria-selected", String(nextMode === "remove"));
    calculate();
  };

  /* EVENT WIRING */
  addModeBtn.addEventListener("click", () => setMode("add"));
  removeModeBtn.addEventListener("click", () => setMode("remove"));
  amountInput.addEventListener("input", liveUpdate);
  rateInput.addEventListener("input", liveUpdate);

  /* FORM SUBMIT — validation gate + loading state */
  if (calcForm && calcSubmit) {
    calcForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;

      // Loading state
      calcSubmit.classList.add("loading");
      calcSubmit.disabled = true;
      const labelEl = calcSubmit.querySelector(".btn-label");
      const originalLabel = labelEl ? labelEl.textContent : "";
      if (labelEl) labelEl.textContent = "Calculating…";

      // Brief delay so user perceives the action
      setTimeout(() => {
        calculate();
        calcSubmit.classList.remove("loading");
        calcSubmit.disabled = false;
        if (labelEl) labelEl.textContent = originalLabel;
        // Focus result for screen readers
        if (totalAmountEl) totalAmountEl.setAttribute("tabindex", "-1");
      }, 450);
    });
  }

  /* RESET */
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      state.mode   = "add";
      state.amount = 1000;
      state.rate   = 10;
      amountInput.value = "1000";
      rateInput.value   = "10";
      clearError(amountInput, amountError);
      clearError(rateInput, rateError);
      setMode("add");
    });
  }

  /* COPY */
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(gstAmountEl.textContent);
        if (copyToast) {
          copyToast.classList.add("show");
          setTimeout(() => copyToast.classList.remove("show"), 1500);
        }
      } catch (err) {
        console.error("Clipboard write failed:", err);
      }
    });
  }

  // Initial render
  calculate();

  /* ─────────────────────────────────────
     CONTACT FORM (only on contact.html)
  ───────────────────────────────────── */
  const contactForm = $("contactForm");
  if (contactForm) {
    const successEl = $("contactSuccess");
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      const honeypot = $("cfWebsite");
      if (honeypot && honeypot.value.trim() !== "") return;
      const fields = ["cfName", "cfEmail", "cfSubject", "cfMessage"];
      fields.forEach((id) => {
        const el = $(id);
        if (!el) return;
        const v = el.value.trim();
        if (!v) { el.classList.add("invalid"); ok = false; }
        else if (id === "cfEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
          el.classList.add("invalid"); ok = false;
        }
        else if (id === "cfMessage" && v.length < 20) {
          el.classList.add("invalid"); ok = false;
        }
        else el.classList.remove("invalid");
      });
      if (!ok) return;

      const btn = contactForm.querySelector("button[type=submit]");
      const labelEl = btn.querySelector(".btn-label") || btn;
      const original = labelEl.textContent;
      btn.disabled = true;
      labelEl.textContent = "Sending…";
      setTimeout(() => {
        btn.disabled = false;
        labelEl.textContent = original;
        contactForm.reset();
        if (successEl) {
          successEl.classList.add("show");
          setTimeout(() => successEl.classList.remove("show"), 4500);
        }
      }, 700);
    });
  }
})();