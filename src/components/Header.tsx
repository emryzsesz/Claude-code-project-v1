import Link from "next/link";
import Container from "./Container";
import MobileNav from "./MobileNav";
import LogoMarkAnimated from "./LogoMarkAnimated";
import Button from "./Button";
import { NAV_LINKS } from "@/lib/nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-soft bg-white/95 backdrop-blur">
      <Container className="relative flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Emryz Digital, home">
          <LogoMarkAnimated className="h-11 w-auto" />
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
              data-cursor-label="view"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" showArrow={false}>
            Contact Us
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
