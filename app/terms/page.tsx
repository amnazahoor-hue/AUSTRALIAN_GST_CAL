import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | AusGSTPro",
  description: "Terms governing the use of AusGSTPro and its GST calculator."
};

export default function TermsPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <h1>Terms &amp; Conditions</h1>
          <p>These terms govern your use of AusGSTPro. By accessing or using the website and calculator, you agree to be bound by them in full.</p>
          <p className="page-meta">Last updated: May 2026</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container">
          <h2>1. Acceptance of Terms</h2>
          <p>These Terms form a binding agreement between you and AusGSTPro and govern your access to and use of the Service.</p>
          <h2>2. Eligibility</h2>
          <p>The Service is available to users who can legally enter into a binding agreement.</p>
          <h2>3. Description of the Service</h2>
          <p>AusGSTPro provides a free web-based GST calculator and educational information only.</p>
          <h2>4. Permitted Use</h2>
          <p>You agree not to misuse the site, violate laws, scrape content, or interfere with operations.</p>
          <h2>5. Intellectual Property</h2>
          <p>All content and branding are owned by or licensed to AusGSTPro and protected by law.</p>
          <h2>6. Accuracy of Calculations and Information</h2>
          <p>The Service is provided as-is and results should be independently verified.</p>
          <h2>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, we are not liable for indirect or consequential damages.</p>
          <h2>8. Indemnity</h2>
          <p>You agree to indemnify us against claims arising from misuse of the Service.</p>
          <h2>9. Third-Party Links and Services</h2>
          <p>We are not responsible for third-party websites linked from this site.</p>
          <h2>10. Modifications to the Service or Terms</h2>
          <p>We may update features or Terms at any time; continued use implies acceptance.</p>
          <h2>11. Termination</h2>
          <p>We may suspend access where misuse, abuse, or legal issues arise.</p>
          <h2>12. Governing Law</h2>
          <p>These Terms are governed by Australian law.</p>
          <h2>13. Severability</h2>
          <p>If any provision is invalid, remaining provisions remain in force.</p>
          <h2>14. Contact</h2>
          <p>Questions? Contact support@ausgstpro.com.</p>
        </div>
      </section>
    </main>
  );
}
