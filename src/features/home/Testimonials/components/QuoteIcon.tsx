import { Quote } from "lucide-react";

export function QuoteIcon() {
  return (
    <>
      <div
        className="absolute -start-12 -top-12 hidden text-red-500/20 sm:block rtl:-scale-x-100"
        aria-hidden="true"
      >
        <Quote size={80} />
      </div>

      <div className="mb-4 flex justify-center sm:hidden" aria-hidden="true">
        <Quote className="h-10 w-10 text-red-500/20" />
      </div>
    </>
  );
}
