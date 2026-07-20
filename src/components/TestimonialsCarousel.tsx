import { StarIcon } from "./icons";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

/**
 * Placeholder entries. Replace each quote, name, and role with a real
 * client testimonial once one is ready to publish. The Placeholder tag
 * on each card makes that obvious to visitors as well, not just here.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Replace this with a real quote from a client about their experience working with us.",
    name: "Client Name",
    role: "Add their role or business",
    rating: 5,
  },
  {
    quote:
      "Replace this with a real quote about the website, POS setup, or promotion campaign we built.",
    name: "Client Name",
    role: "Add their role or business",
    rating: 5,
  },
  {
    quote:
      "Replace this with a real quote describing the result the client saw after working with us.",
    name: "Client Name",
    role: "Add their role or business",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[85vw] shrink-0 rounded-2xl border-l-4 border-green bg-[#0f1b2c] p-8 sm:w-[420px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 text-lime" aria-hidden="true">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <StarIcon key={i} className="h-4 w-4" />
          ))}
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/60">
          Placeholder
        </span>
      </div>
      <p className="mt-6 text-base leading-7 text-white/85">
        {testimonial.quote}
      </p>
      <div className="mt-8">
        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
        <p className="text-sm text-white/50">{testimonial.role}</p>
      </div>
    </div>
  );
}

/**
 * Horizontal auto scrolling testimonial strip, pausing on hover via a
 * plain CSS animation, the same duplicate the content once technique
 * used by MarqueeStrip so the loop point at fifty percent is seamless.
 */
export default function TestimonialsCarousel() {
  const cards = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="testimonial-group overflow-hidden">
      <div className="testimonial-track flex w-max gap-6 px-6 sm:px-8">
        {cards.map((testimonial, i) => (
          <TestimonialCard key={i} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
