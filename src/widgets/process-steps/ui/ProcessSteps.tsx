import { useLocale } from "next-intl";
import { formatNumber } from "@/shared/i18n";

type Step = { title: string; text: string };

export function ProcessSteps({ steps }: { steps: Step[] }) {
  const locale = useLocale();

  return (
    <ol className="grid gap-6 md:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="bg-surface rounded-lg border p-6">
          <span className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full font-bold">
            {formatNumber(locale, index + 1)}
          </span>
          <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            {step.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
