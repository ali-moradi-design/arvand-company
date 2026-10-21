import { TESTIMONIALS, TestimonialCard } from "@/entities/testimonial";

export function TestimonialsList() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {TESTIMONIALS.map((id) => (
        <li key={id}>
          <TestimonialCard id={id} />
        </li>
      ))}
    </ul>
  );
}
