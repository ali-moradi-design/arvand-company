import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/features/contact-form";
import { PageHero } from "@/widgets/page-hero";
import { CONTACT } from "@/shared/config";
import { Section, SectionHeading } from "@/shared/ui";

export function ContactPage() {
  const t = useTranslations("contact");
  const faq = t.raw("faq.items") as { question: string; answer: string }[];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">{t("form.title")}</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
          <aside className="bg-surface h-fit rounded-lg border p-6">
            <h2 className="text-xl font-bold">{t("info.title")}</h2>
            <ul className="mt-5 grid gap-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="text-teal mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <span>{t("info.offices")}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-teal mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  dir="ltr"
                  className="underline-offset-4 hover:underline"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="text-teal mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  dir="ltr"
                  className="underline-offset-4 hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
            <p className="text-muted-foreground mt-5 text-sm">{t("info.hours")}</p>
          </aside>
        </div>
      </Section>
      <Section tone="muted">
        <SectionHeading title={t("faq.title")} />
        <div className="mt-8 grid max-w-3xl gap-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="bg-surface group rounded-lg border p-5"
            >
              <summary className="cursor-pointer font-semibold">{item.question}</summary>
              <p className="text-muted-foreground mt-3 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
