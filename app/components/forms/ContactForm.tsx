"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const message = String(form.get("message") || "").trim();
    const trap = String(form.get("website") || "").trim();
    if (trap) return;

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = "Name is required.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Valid email is required.";
    if (!subject) nextErrors.subject = "Subject is required.";
    if (!message || message.length < 20) nextErrors.message = "Message must be at least 20 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      (event.currentTarget as HTMLFormElement).reset();
      window.setTimeout(() => setSuccess(false), 4500);
    }, 700);
  };

  return (
    <form className="contact-form" noValidate onSubmit={onSubmit}>
      <h2 className="contact-form-title">Send Us a Message</h2>
      <p className="contact-form-intro">Fill in the form and we&apos;ll get back to you within 24-48 hours.</p>
      <label className="hp-field" htmlFor="cfWebsite" aria-hidden="true">
        <span>Website</span>
        <input id="cfWebsite" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="field">
        <span>NAME</span>
        <input name="name" type="text" autoComplete="name" required placeholder="Your full name" className={errors.name ? "invalid" : ""} />
      </label>
      <label className="field">
        <span>EMAIL</span>
        <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={errors.email ? "invalid" : ""} />
      </label>
      <label className="field">
        <span>SUBJECT</span>
        <input name="subject" type="text" required placeholder="What's it about?" className={errors.subject ? "invalid" : ""} />
      </label>
      <label className="field">
        <span>MESSAGE</span>
        <textarea name="message" required minLength={20} placeholder="Tell us how we can help..." className={errors.message ? "invalid" : ""}></textarea>
      </label>
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        <span className="btn-label">{submitting ? "Sending..." : "Send Message"}</span>
      </button>
      <div className={`form-success ${success ? "show" : ""}`} role="status" aria-live="polite">
        Thanks for your message! We&apos;ll get back to you within 24-48 hours.
      </div>
    </form>
  );
}
