import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | AusGSTPro",
  description: "Contact AusGSTPro for support, feedback, partnerships, and media requests."
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We&apos;d love to hear from you. Whether it&apos;s a question about GST, a feature request, or feedback on the calculator, our team is here to help.</p>
          <p className="page-meta">Last updated: May 2026</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="container contact-grid">
          <div>
            <h2>Get in Touch</h2>
            <p>AusGSTPro is a small, independent project built by Australians for Australians. We read every message that comes through and aim to reply within 24 to 48 hours during business days.</p>
            <p>Before you reach out, you may want to check our <Link href="/#faq">FAQ section</Link> - it answers the most common questions about GST rates, how to add or remove GST, and who needs to register.</p>

            <div className="contact-info-card spaced-lg">
              <h3>Email Support</h3>
              <p>The fastest way to reach us is by email. Whether you have a bug to report, a suggestion, or a general question about Australian GST, drop us a line and we&apos;ll take care of it.</p>
              <p><a href="mailto:support@ausgstpro.com">support@ausgstpro.com</a></p>
            </div>

            <div className="contact-info-card spaced-md">
              <h3>Business &amp; Partnerships</h3>
              <p>For business enquiries, integrations, white-label opportunities, or media requests, please include &quot;Partnerships&quot; in the subject line so we can route your message quickly.</p>
              <p><a href="mailto:support@ausgstpro.com?subject=Partnerships">support@ausgstpro.com</a></p>
            </div>

            <div className="contact-info-card spaced-md">
              <h3>Response Times</h3>
              <p>We aim to respond within 24 to 48 hours during Australian business days (Monday-Friday, 9am-5pm AEST).</p>
            </div>

            <h2 className="contact-section-top-gap">What to Include</h2>
            <p>To help us help you faster, please include:</p>
            <ul>
              <li>A clear description of the issue, question, or feedback.</li>
              <li>The device and browser you were using.</li>
              <li>Any error messages, screenshots, or recordings.</li>
              <li>The steps taken before the issue occurred.</li>
            </ul>

            <h2>Frequently Asked Questions</h2>
            <p>Many enquiries are already answered on our home page. For more, see our <Link href="/#faq">full FAQ section</Link>.</p>

            <h2>A Note on Professional Advice</h2>
            <p>AusGSTPro is a free utility and educational resource. We cannot provide personalised tax, accounting, or legal advice.</p>

            <h2>Feedback &amp; Feature Requests</h2>
            <p>We are constantly improving based on user feedback. Tell us what features would help your workflow.</p>

            <h2>Reporting a Bug</h2>
            <p>If something is not working as expected, share exact inputs, expected result, and device/browser details.</p>

            <h2>Privacy of Your Enquiry</h2>
            <p>Any information you send is handled according to our <Link href="/privacy">Privacy Policy</Link>.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
