import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-soft bg-navy-tint">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Image
            src="/brand/emryz-digital-logo-lockup.webp"
            alt="Emryz Digital, websites, POS solutions, growth"
            width={1536}
            height={1024}
            className="h-20 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-navy/70">
            Emryz Digital helps small businesses and independent authors grow
            online. We build websites on Wix and Squarespace, set up POS
            solutions on Toast and Square, and run promotion campaigns for
            authors who want more readers.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-navy">
            Services
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-navy/70">
            <li>
              <Link href="/services/web-design" className="hover:text-green">
                Web Design and Redesign
              </Link>
            </li>
            <li>
              <Link href="/services/pos-solutions" className="hover:text-green">
                POS Solutions
              </Link>
            </li>
            <li>
              <Link href="/services/author-growth" className="hover:text-green">
                Author Growth
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-navy">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-navy/70">
            <li>
              <Link href="/about" className="hover:text-green">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green">
                Contact
              </Link>
            </li>
            <li>
              <a href="mailto:hello@emryzdigital.com" className="hover:text-green">
                hello@emryzdigital.com
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border-soft py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-navy/60 sm:flex-row">
          <p>Copyright {year} Emryz Digital. All rights reserved.</p>
          <p>Websites. POS Solutions. Growth.</p>
        </Container>
      </div>
    </footer>
  );
}
