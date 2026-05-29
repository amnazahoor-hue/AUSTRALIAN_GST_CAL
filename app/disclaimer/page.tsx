import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | AusGSTPro",
  description: "General information disclaimer and tool usage limitations."
};

export default function DisclaimerPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <h1>Disclaimer</h1>
          <p>Please read this disclaimer carefully before using AusGSTPro. By accessing or using our website and calculator, you agree to these terms.</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container">
          <h2>1. General Disclaimer</h2>
          <p>The information provided on this website is for general informational purposes only. Any reliance you place on such information is strictly at your own risk.</p>
          <h2>2. Tool Usage Disclaimer</h2>
          <p>The GST calculator is provided as a utility tool and does not replace professional accounting, legal, or tax advice.</p>
          <h2>3. Third-Party Links Disclaimer</h2>
          <p>We may link to external websites. We are not responsible for their content, policies, or availability.</p>
          <h2>4. Professional Advice Disclaimer</h2>
          <p>Always consult a qualified professional before making business or tax decisions based on outputs from this tool.</p>
          <h2>5. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, we are not liable for indirect or consequential losses.</p>
          <h2>6. Changes to This Disclaimer</h2>
          <p>We may update this page from time to time and update the revision date accordingly.</p>
          <h2>7. Contact Us</h2>
          <p>Questions? Contact support@ausgstpro.com.</p>
        </div>
      </section>
    </main>
  );
}
