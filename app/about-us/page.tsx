import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | AusGSTPro",
  description: "Learn about AusGSTPro and our mission."
};

export default function AboutPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>AusGSTPro is built to make GST calculations fast, clear, and dependable.</p>
          <p className="page-meta">Last updated: May 2026</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container">
          <h2>Our Mission</h2>
          <p>We build practical tax tools focused on speed, usability, and confidence for Australian users.</p>
          <h2>Why We Built AusGSTPro</h2>
          <p>Many online calculators are cluttered, ad-heavy, or difficult to use on mobile. We built AusGSTPro to provide clear workflows and fast, accurate outputs.</p>
          <h2>Who We Build For</h2>
          <p>Our users include sole traders, small businesses, contractors, and bookkeepers who need reliable GST calculations day to day.</p>
          <h2>Our Product Principles</h2>
          <ul>
            <li>Accuracy first</li>
            <li>Clear user experience</li>
            <li>Fast mobile-first performance</li>
            <li>Privacy-conscious defaults</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
