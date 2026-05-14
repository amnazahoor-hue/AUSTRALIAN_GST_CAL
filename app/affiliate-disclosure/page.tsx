import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | AusGSTPro",
  description: "How affiliate links may be used on AusGSTPro."
};

export default function AffiliateDisclosurePage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <h1>Affiliate Disclosure</h1>
          <p>We may receive a commission through certain partner links at no extra cost to you.</p>
          <p className="page-meta">Last updated: May 2026</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container">
          <h2>Overview</h2>
          <p>Affiliate links may appear on AusGSTPro. If you click certain links and complete a qualifying action, we may receive a commission at no additional cost to you.</p>
          <h2>Editorial Independence</h2>
          <p>Our recommendations are based on relevance and utility. Affiliate relationships do not override editorial judgement.</p>
          <h2>Third-Party Responsibility</h2>
          <p>We are not responsible for third-party pricing, service quality, data handling, or policy changes.</p>
          <h2>Contact</h2>
          <p>Questions about this disclosure can be sent to support@ausgstpro.com.</p>
        </div>
      </section>
    </main>
  );
}
