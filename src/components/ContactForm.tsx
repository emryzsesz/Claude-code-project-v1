"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "emryzdigital@gmail.com";

const SERVICE_OPTIONS = [
  "Web Design or Redesign",
  "POS Solutions",
  "Author Growth",
  "Not sure yet",
];

const BUDGET_OPTIONS = [
  "Under 1000",
  "1000 to 3000",
  "3000 to 7000",
  "7000 plus",
  "Not sure yet",
];

const fieldClass =
  "mt-2 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-base text-white placeholder-white/40 outline-none focus:border-lime";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const service = String(data.get("service") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `New project inquiry from ${name || "your website"}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Budget range: ${budget}`,
      "",
      message,
    ];

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailtoUrl;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-white">
            Name
          </label>
          <input id="name" name="name" type="text" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-white">
            Email
          </label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="text-sm font-semibold text-white">
            What are you interested in
          </label>
          <select
            id="service"
            name="service"
            defaultValue={SERVICE_OPTIONS[0]}
            className={fieldClass}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option} className="text-navy">
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className="text-sm font-semibold text-white">
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue={BUDGET_OPTIONS[0]}
            className={fieldClass}
          >
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option} className="text-navy">
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-white">
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={fieldClass} />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-green px-8 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-dark cursor-pointer"
        data-cursor-label="open"
      >
        Send Message
      </button>

      {sent && (
        <p className="text-sm text-lime">
          Your email application should now be open with your message ready
          to send. If nothing opened, write to us directly at {CONTACT_EMAIL}.
        </p>
      )}
    </form>
  );
}
