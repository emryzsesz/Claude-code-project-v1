import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import MobileNav from "./MobileNav";
import { NAV_LINKS } from "@/lib/nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-white/95 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Emryz Digital, home">
          <Image
            src="/brand/emryz-digital-icon-mark.webp"
            alt="Emryz Digital icon mark"
            width={1536}
            height={1024}
            priority
            className="h-14 w-auto"
          />
          <span className="hidden text-lg font-semibold text-navy sm:block">
            Emryz Digital
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy/80 transition-colors duration-200 hover:text-green"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-green px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-dark cursor-pointer"
          >
            Contact Us
          </Link>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
