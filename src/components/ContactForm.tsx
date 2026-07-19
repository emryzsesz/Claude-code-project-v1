"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "emryzdigital@gmail.com";

const SERVICE_OPTIONS = [
  "Web Design or Redesign",
  "POS Solutions",
  "Author Growth",
  "Not sure yet",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const business = String(data.get("business") ?? "");
    const service = String(data.get("service") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `New project inquiry from ${name || "your website"}`;
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Business: ${business}`,
      `Service: ${service}`,
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
          <label htmlFor="name" className="text-sm font-semibold text-navy">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-border-soft bg-white px-4 py-3 text-base text-navy outline-none focus:border-green"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-navy">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-lg border border-border-soft bg-white px-4 py-3 text-base text-navy outline-none focus:border-green"
          />
        </div>
      </div>

      <div>
        <label htmlFor="business" className="text-sm font-semibold text-navy">
          Business or author name
        </label>
        <input
          id="business"
          name="business"
          type="text"
          className="mt-2 w-full rounded-lg border border-border-soft bg-white px-4 py-3 text-base text-navy outline-none focus:border-green"
        />
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-semibold text-navy">
          What are you interested in
        </label>
        <select
          id="service"
          name="service"
          defaultValue={SERVICE_OPTIONS[0]}
          className="mt-2 w-full rounded-lg border border-border-soft bg-white px-4 py-3 text-base text-navy outline-none focus:border-green"
        >
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full rounded-lg border border-border-soft bg-white px-4 py-3 text-base text-navy outline-none focus:border-green"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-green px-8 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-dark cursor-pointer"
      >
        Send Message
      </button>

      {sent && (
        <p className="text-sm text-green">
          Your email application should now be open with your message ready
          to send. If nothing opened, write to us directly at {CONTACT_EMAIL}.
        </p>
      )}
    </form>
  );
}
