import Link from "next/link";
import { ComponentType, SVGProps } from "react";
import { ArrowRightIcon } from "./icons";

type ServiceCardProps = {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  linkLabel?: string;
};

export default function ServiceCard({
  href,
  icon: Icon,
  title,
  description,
  linkLabel = "See how it works",
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-border-soft bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:border-green/40 hover:shadow-lg"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-tint text-navy group-hover:bg-green/10 group-hover:text-green">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-navy">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-navy/70">
        {description}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green">
        {linkLabel}
        <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
