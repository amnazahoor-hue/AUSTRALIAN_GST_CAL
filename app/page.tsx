import Script from "next/script";
import Link from "next/link";
import { CalculatorSection } from "./components/home/CalculatorSection";
import { HeroStats } from "./components/home/HeroStats";
import { Faq } from "./components/home/Faq";
import { ScrollEffects } from "./components/effects/ScrollEffects";
import { faqItems } from "./data/faq";

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a }
      }))
    ]
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>

      <main id="main">
        <section className="hero" id="hero" aria-labelledby="heroHeading">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-content">
                <span className="hero-badge">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.7 5.5 6 0.9-4.4 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.3 8.4l6-0.9z" /></svg>
                  AUSTRALIA&apos;S #1 GST TOOL
                </span>
                <h1 id="heroHeading">
                  Australia&apos;s Most<br />
                  Accurate <span className="grad-blue">GST</span><br />
                  <span className="grad-purple">Calculator</span>
                </h1>
                <p className="hero-sub">Built for the modern Australian economy - fast, precise, and ATO compliant.</p>
                <p className="hero-desc">Calculate GST instantly with advanced precision and zero confusion. Whether you&apos;re a business owner, tradie, or contractor, AusGSTPro gives you the right answer every time.</p>
                <div className="hero-actions">
                  <a href="#calculator" className="btn btn-primary">Calculate GST Now</a>
                  <a href="#formula" className="btn btn-secondary">Learn the Formula</a>
                </div>
                <HeroStats />
              </div>
              <CalculatorSection />
            </div>
          </div>
        </section>

        <section className="how-steps" id="how-it-works" aria-labelledby="howHeading">
          <div className="container">
            <div className="section-head center">
              <h2 id="howHeading">How It <span className="grad-blue">Works</span></h2>
              <p>Get accurate GST results in four simple steps. No tax knowledge required.</p>
            </div>
            <ol className="steps-grid">
              <li className="step-card reveal"><div className="step-number">01</div><span className="step-icon yellow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 9h8v6H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2z"/><path d="M6 12h2M7 11v2"/><path d="M12 9h8v6h-6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2z"/><path d="M15 12h4"/></svg></span><h3>Choose Mode</h3><p>Select <strong>Add GST</strong> if your amount excludes GST, or <strong>Remove GST</strong> if it already includes it.</p></li>
              <li className="step-card reveal"><div className="step-number">02</div><span className="step-icon green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2v20M17 6H9.5a3.5 3.5 0 0 0 0 7h3a3.5 3.5 0 0 1 0 7H7"/></svg></span><h3>Enter Amount</h3><p>Type the dollar amount you want to calculate. Validation prevents empty or invalid inputs.</p></li>
              <li className="step-card reveal"><div className="step-number">03</div><span className="step-icon blue" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="7" cy="7" r="3.5"/><circle cx="17" cy="17" r="3.5"/><path d="M19 5L5 19"/></svg></span><h3>Set GST Rate</h3><p>Default is 10% - the Australian standard. You can adjust it for special cases or international scenarios.</p></li>
              <li className="step-card reveal"><div className="step-number">04</div><span className="step-icon purple" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 20V10M9 20V4M14 20v-6M20 20V8"/></svg></span><h3>Get Results</h3><p>See the GST amount, base price, and total instantly. Copy any value with one click.</p></li>
            </ol>
          </div>
        </section>

        <section className="features" id="features" aria-labelledby="featHeading">
          <div className="container">
            <div className="section-head center">
              <h2 id="featHeading">Built For <span className="grad-blue">Speed</span> &amp; <span className="grad-purple">Precision</span></h2>
              <p>Engineered for daily tax calculations with the polish Australian businesses expect.</p>
            </div>
            <div className="feature-grid">
              <article className="feature-card reveal"><h3>Instant Calculation</h3><p>Real-time results as you type - no waiting, no loading screens, no friction.</p></article>
              <article className="feature-card reveal"><h3>Accurate Results</h3><p>Mathematically precise calculations following Australian Taxation Office guidelines.</p></article>
              <article className="feature-card reveal"><h3>Business Ready</h3><p>Designed for Australian businesses, contractors, sole traders, and tradies.</p></article>
              <article className="feature-card reveal"><h3>Mobile Optimized</h3><p>PWA-ready design that works smoothly on phone, tablet, and desktop.</p></article>
              <article className="feature-card reveal"><h3>Zero Confusion</h3><p>Clear Add/Remove GST modes eliminate guesswork and second-guessing.</p></article>
              <article className="feature-card reveal"><h3>100% Free</h3><p>No subscription, no hidden costs, no account required.</p></article>
            </div>
          </div>
        </section>

        <section className="formula-section" id="formula" aria-labelledby="formulaHeading">
          <div className="container">
            <div className="section-head center">
              <h2 id="formulaHeading">
                Understanding GST In <span className="grad-blue">Australia</span>
              </h2>
              <p>
                GST is a broad-based 10% tax on most goods and services sold or consumed in Australia.
                Use the right formula depending on whether your amount already includes GST.
              </p>
            </div>

            <div className="formula-grid">
              <article className="formula-block formula-block-add reveal">
                <span className="formula-badge">Add GST</span>
                <h3>Price excludes GST</h3>
                <p>Use this when you have a pre-tax amount and need the GST-inclusive total.</p>
                <div className="formula-equation">
                  <span className="tiny-label">Formula (10%)</span>
                  <p className="code blue-code">Total = Amount × 1.1</p>
                </div>
                <p className="formula-example">Example: $1,000 → $1,100 total ($100 GST)</p>
              </article>

              <article className="formula-block formula-block-remove reveal">
                <span className="formula-badge">Remove GST</span>
                <h3>Price includes GST</h3>
                <p>Use this when the amount already includes GST and you need the base figure.</p>
                <div className="formula-equation">
                  <span className="tiny-label">Formula (10%)</span>
                  <p className="code purple-code">Base = Amount ÷ 1.1</p>
                  <p className="meta">GST portion = Amount ÷ 11</p>
                </div>
                <p className="formula-example">Example: $1,100 → $1,000 base ($100 GST)</p>
              </article>
            </div>

            <article className="register-card reveal">
              <div className="register-card-copy">
                <h3>Who needs to register for GST?</h3>
                <p>
                  Registration is required once your GST turnover reaches the ATO threshold.
                  Plan ahead if you are close to the limit.
                </p>
              </div>
              <div className="threshold-row">
                <div className="threshold-pill">
                  <strong>$75,000</strong>
                  <span>Annual turnover — businesses</span>
                </div>
                <div className="threshold-pill">
                  <strong>$150,000</strong>
                  <span>Annual turnover — non-profits</span>
                </div>
              </div>
              <a href="#calculator" className="btn btn-primary register-cta">
                Calculate GST Now
              </a>
            </article>
          </div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faqHeading">
          <div className="container">
            <div className="section-head center">
              <h2 id="faqHeading">Frequently Asked <span className="grad-purple">Questions</span></h2>
              <p>Quick answers to the most common GST questions for Australian businesses.</p>
            </div>
            <Faq />
          </div>
        </section>

        <section className="gst-vat-section" aria-labelledby="vatHeading">
          <div className="container">
            <div className="section-head center">
              <h2 id="vatHeading">
                GST vs <span className="grad-purple">VAT</span>
              </h2>
              <p>
                Selling in Australia? You are dealing with GST. Selling abroad? It is usually called VAT.
                Same idea — different name and local rules.
              </p>
            </div>

            <div className="tax-compare-shell reveal">
              <p className="tax-compare-lead">
                Both taxes apply at each step of the supply chain. Businesses claim credits on inputs,
                then pass the tax to the end customer.
              </p>

              <div className="tax-compare-grid">
                <article className="tax-pillar tax-pillar-gst">
                  <header className="tax-pillar-head">
                    <span className="tax-pillar-mark gst">AU</span>
                    <div>
                      <h3>GST in Australia</h3>
                      <p>Goods &amp; Services Tax</p>
                    </div>
                  </header>
                  <dl className="tax-facts">
                    <div className="tax-fact">
                      <dt>Typical rate</dt>
                      <dd><strong>10%</strong> on most taxable sales</dd>
                    </div>
                    <div className="tax-fact">
                      <dt>Register when</dt>
                      <dd>Turnover reaches <strong>$75,000</strong> (or <strong>$150,000</strong> for non-profits)</dd>
                    </div>
                    <div className="tax-fact">
                      <dt>Your tool</dt>
                      <dd>This calculator is built for Australian GST</dd>
                    </div>
                  </dl>
                  <a href="#calculator" className="tax-pillar-action gst">
                    Calculate Australian GST
                  </a>
                </article>

                <div className="tax-compare-bridge" aria-hidden="true">
                  <span className="tax-compare-bridge-line" />
                  <span className="tax-compare-bridge-label">Same tax model</span>
                  <span className="tax-compare-bridge-line" />
                </div>

                <article className="tax-pillar tax-pillar-vat">
                  <header className="tax-pillar-head">
                    <span className="tax-pillar-mark vat">INTL</span>
                    <div>
                      <h3>VAT overseas</h3>
                      <p>Value Added Tax</p>
                    </div>
                  </header>
                  <dl className="tax-facts">
                    <div className="tax-fact">
                      <dt>Typical rate</dt>
                      <dd>Often <strong>15%–25%</strong>, depending on the country</dd>
                    </div>
                    <div className="tax-fact">
                      <dt>Register when</dt>
                      <dd>Each country sets its own threshold and rules</dd>
                    </div>
                    <div className="tax-fact">
                      <dt>Your next step</dt>
                      <dd>Check the local rate before you invoice or import</dd>
                    </div>
                  </dl>
                  <p className="tax-pillar-note">Common in the UK, EU, Canada, New Zealand, and more.</p>
                </article>
              </div>
            </div>

            <article className="contact-cta-card reveal">
              <span className="cta-ornament" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h0"/></svg>
              </span>
              <div className="contact-cta-inner">
                <h3>Questions about your numbers?</h3>
                <p>
                  Cross-border invoices, mixed pricing, or unsure which rate to use? Message our team
                  and we will help you work out the next step.
                </p>
                <Link href="/contact" className="cta-btn">Contact Support</Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <ScrollEffects />
    </>
  );
}
