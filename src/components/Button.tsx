import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRightIcon } from "./icons";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "ghost-light";
  className?: string;
  showArrow?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green";

const variants = {
  primary: { base: "bg-green text-white", wipe: "bg-green-dark" },
  secondary: { base: "bg-navy text-white", wipe: "bg-navy-dark" },
  ghost: {
    base: "border border-navy/20 text-navy",
    wipe: "bg-navy-tint",
  },
  "ghost-light": {
    base: "border border-white/30 text-white",
    wipe: "bg-white/15",
  },
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  showArrow = true,
}: ButtonProps) {
  const v = variants[variant];

  return (
    <Link href={href} className={`${base} ${v.base} ${className}`}>
      <span
        aria-hidden="true"
        className={`absolute inset-0 -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 ${v.wipe}`}
      />
      <span className="relative">{children}</span>
      {showArrow && (
        <ArrowRightIcon className="relative h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      )}
    </Link>
  );
}
