import { useTranslations } from "next-intl";
import type { TestimonialId } from "../model/testimonials";

export function TestimonialCard({ id }: { id: TestimonialId }) {
  const t = useTranslations(`testimonials.items.${id}`);

  return (
    <figure className="bg-surface flex h-full flex-col rounded-lg border p-6">
      <blockquote className="flex-1 leading-relaxed">“{t("quote")}”</blockquote>
      <figcaption className="mt-5 text-sm">
        <span className="block font-semibold">{t("name")}</span>
        <span className="text-muted-foreground">{t("role")}</span>
      </figcaption>
    </figure>
  );
}
