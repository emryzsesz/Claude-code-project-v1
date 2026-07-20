import Link from "next/link";
import Container from "./Container";
import FooterLogo from "./FooterLogo";
import Reveal from "./motion/Reveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy">
      <Container className="pb-16 pt-20 text-center">
        <Reveal>
          <FooterLogo />
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-lime">
            Websites. POS Solutions. Growth.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
            Emryz Digital helps small businesses and independent authors grow
            online. We build websites on Wix and Squarespace, set up POS
            solutions on Toast and Square, and run promotion campaigns for
            authors who want more readers.
          </p>
        </Reveal>
      </Container>

      <Container className="grid gap-10 border-t border-white/10 py-14 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Services
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <Link
                href="/services/web-design"
                className="hover:text-lime"
                data-cursor-label="view"
              >
                Web Design and Redesign
              </Link>
            </li>
            <li>
              <Link
                href="/services/pos-solutions"
                className="hover:text-lime"
                data-cursor-label="view"
              >
                POS Solutions
              </Link>
            </li>
            <li>
              <Link
                href="/services/author-growth"
                className="hover:text-lime"
                data-cursor-label="view"
              >
                Author Growth
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Company
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <Link href="/about" className="hover:text-lime" data-cursor-label="view">
                About
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-lime" data-cursor-label="view">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-lime" data-cursor-label="view">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            <li>
              <a
                href="mailto:emryzdigital@gmail.com"
                className="hover:text-lime"
                data-cursor-label="open"
              >
                emryzdigital@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+2348165993286"
                className="hover:text-lime"
                data-cursor-label="open"
              >
                +234 816 599 3286
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="text-center text-xs text-white/50">
          <p>Copyright {year} Emryz Digital. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
