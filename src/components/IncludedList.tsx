import { CheckIcon } from "./icons";

export default function IncludedList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green/10 text-green">
            <CheckIcon className="h-4 w-4" />
          </span>
          <span className="text-base leading-7 text-navy/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}
