import Script from "next/script";
import Link from "next/link";
import { CalculatorSection } from "./components/home/CalculatorSection";
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
          <div className="container hero-grid">
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
              <div className="stats-row" role="list">
                <div className="stat" role="listitem"><strong>100%</strong><span>ATO COMPLIANT</span></div>
                <div className="stat" role="listitem"><strong>0.0s</strong><span>INSTANT RESULTS</span></div>
                <div className="stat" role="listitem"><strong>24/7</strong><span>AVAILABLE</span></div>
              </div>
            </div>
            <CalculatorSection />
          </div>
        </section>

        <section className="how-steps" id="how-it-works" aria-labelledby="howHeading">
          <div className="container">
            <div className="section-head center">
              <h2 id="howHeading">How It <span className="grad-blue">Works</span></h2>
              <p>Get accurate GST results in four simple steps. No tax knowledge required.</p>
            </div>
            <ol className="steps-grid">
              <li className="step-card reveal"><div className="step-number">01</div><span className="step-icon yellow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h7"/></svg></span><h3>Choose Mode</h3><p>Select <strong>Add GST</strong> if your amount excludes GST, or <strong>Remove GST</strong> if it already includes it.</p></li>
              <li className="step-card reveal"><div className="step-number">02</div><span className="step-icon green" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v18M3 12h18"/></svg></span><h3>Enter Amount</h3><p>Type the dollar amount you want to calculate. Validation prevents empty or invalid inputs.</p></li>
              <li className="step-card reveal"><div className="step-number">03</div><span className="step-icon blue" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M3 12h4M17 12h4"/></svg></span><h3>Set GST Rate</h3><p>Default is 10% - the Australian standard. You can adjust it for special cases or international scenarios.</p></li>
              <li className="step-card reveal"><div className="step-number">04</div><span className="step-icon purple" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg></span><h3>Get Results</h3><p>See the GST amount, base price, and total instantly. Copy any value with one click.</p></li>
            </ol>
          </div>
        </section>

        <section className="features" id="features" aria-labelledby="featHeading">
          <div className="container">
            <div className="section-head center">
              <h2 id="featHeading">Built for <span className="grad-blue">Speed</span> &amp; <span className="grad-purple">Precision</span></h2>
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

        <section className="how-it-works" id="formula" aria-labelledby="formulaHeading">
          <div className="container split-grid">
            <div>
              <div className="section-icon-title">
                <h2 id="formulaHeading">Understanding GST in Australia</h2>
              </div>
              <p className="lead">The Goods and Services Tax (GST) is a broad-based 10% tax on most goods, services, and items sold or consumed in Australia.</p>
              <article className="formula-card">
                <h3>The Formula</h3>
                <div>
                  <span className="tiny-label">TO ADD GST (10%):</span>
                  <p className="code blue-code">Total = Amount x 1.1</p>
                </div>
                <hr />
                <div>
                  <span className="tiny-label">TO REMOVE GST (INCLUSIVE):</span>
                  <p className="code purple-code">Base = Amount / 1.1</p>
                  <p className="meta">GST Part = Amount / 11</p>
                </div>
              </article>
              <h3 className="subhead">Who Needs to Register for GST?</h3>
              <p className="lead">You must register for GST if your business has a GST turnover of $75,000 or more ($150,000 for non-profit organisations).</p>
            </div>
            <div id="faq" aria-labelledby="faqHeading">
              <div className="section-icon-title"><h2 id="faqHeading">Frequently Asked Questions</h2></div>
              <Faq />
            </div>
          </div>
        </section>

        <section className="vat-cta" aria-labelledby="vatHeading">
          <div className="container split-grid">
            <div>
              <h2 id="vatHeading">GST vs VAT</h2>
              <p className="lead">While Australia uses the term GST, many other countries call it Value Added Tax (VAT). Conceptually they are almost identical.</p>
            </div>
            <article className="cta-card">
              <span className="cta-ornament" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h0"/></svg>
              </span>
              <h3>Need a Custom Quote?</h3>
              <p>For complex tax scenarios, always consult with a certified Australian accountant.</p>
              <Link href="/contact" className="cta-btn">Contact Support</Link>
            </article>
          </div>
        </section>
      </main>
      <ScrollEffects />
    </>
  );
}
