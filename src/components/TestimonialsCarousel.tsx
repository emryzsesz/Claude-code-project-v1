import { StarIcon } from "./icons";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Brilliant. Went above and beyond. Will definitely be working on future projects again.",
    name: "Tom",
    role: "Rental Software Setup Client",
    rating: 5,
  },
  {
    quote: "Very knowledgeable, friendly, have great understanding and very patient.",
    name: "Cedric",
    role: "Square POS Client",
    rating: 5,
  },
  {
    quote: "This guy knows his stuff. I will be using him for all my POS problems.",
    name: "Corey",
    role: "Square and WordPress Client",
    rating: 5,
  },
  {
    quote: "I have enjoyed working with Emmanuel.",
    name: "Michael",
    role: "Book Promotion Client",
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-[85vw] shrink-0 rounded-2xl border-l-4 border-green bg-[#0f1b2c] p-8 sm:w-[420px]">
      <div className="flex gap-1 text-lime" aria-hidden="true">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <StarIcon key={i} className="h-4 w-4" />
        ))}
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
