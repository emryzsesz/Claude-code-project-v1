"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/nav";
import { MenuIcon, CloseIcon } from "./icons";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer p-2 text-navy"
      >
        {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-t border-border-soft bg-white shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base font-medium text-navy border-b border-border-soft last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-green px-6 py-3 text-sm font-semibold text-white"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
