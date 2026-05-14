import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AusGSTPro",
  description: "How AusGSTPro collects, uses, and protects user information."
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy matters. This policy explains what information we collect, how we use it, and the choices you have when using AusGSTPro.</p>
          <p className="page-meta">Last updated: May 2026</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container">
          <h2>1. Introduction</h2>
          <p>AusGSTPro ("we", "us", or "our") is committed to respecting and protecting the privacy of every person who visits our website. This Privacy Policy explains how we handle personal information in compliance with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).</p>
          <p>By using AusGSTPro, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with any part of it, you should not use our website.</p>

          <h2>2. What Information We Collect</h2>
          <p>AusGSTPro is designed to be privacy-friendly. The GST calculator runs entirely in your browser - the amounts and rates you enter into the calculator are never sent to our servers, never logged, and never stored on our systems.</p>
          <h3>2.1 Information You Provide Voluntarily</h3>
          <p>When you contact us through our contact form or by email, you may provide your name, email address, and message details.</p>
          <h3>2.2 Information Collected Automatically</h3>
          <p>Like most websites, our hosting provider and analytics tools may collect technical information about your browser, device, and visit timing.</p>

          <h2>3. Cookies and Tracking Technologies</h2>
          <p>AusGSTPro uses a minimal set of cookies necessary for website operation and aggregate usage analysis.</p>

          <h2>4. How We Use Your Information</h2>
          <p>We use information to respond to enquiries, improve the product, diagnose issues, and comply with legal obligations.</p>

          <h2>5. Disclosure of Information</h2>
          <p>We may share limited information with trusted service providers or where required by law.</p>

          <h2>6. Data Security</h2>
          <p>We use commercially reasonable safeguards including HTTPS and access controls.</p>

          <h2>7. Data Retention</h2>
          <p>We retain personal data only as long as necessary for support and legal compliance.</p>

          <h2>8. Your Rights</h2>
          <p>You may request access, correction, or deletion of your personal data by contacting us.</p>

          <h2>9. Children's Privacy</h2>
          <p>AusGSTPro is not directed to children under 16 and we do not knowingly collect data from children.</p>

          <h2>10. Changes to This Policy</h2>
          <p>We may update this policy and will revise the date shown at the top of the page.</p>

          <h2>11. Contact Us</h2>
          <p>Questions? Contact us at support@ausgstpro.com.</p>
        </div>
      </section>
    </main>
  );
}
