import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/shared/i18n";
import type { Service } from "../model/services";

export function ServiceCard({ service }: { service: Service }) {
  const t = useTranslations(`services.items.${service.slug}`);
  const common = useTranslations("common");

  return (
    <article className="group bg-surface has-[a:focus-visible]:outline-ring relative flex flex-col overflow-hidden rounded-lg border has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold">{t("title")}</h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
          {t("summary")}
        </p>
        <Link
          href={`/services/${service.slug}/`}
          className="text-teal mt-4 inline-flex items-center gap-1 text-sm font-semibold after:absolute after:inset-0 focus-visible:outline-none"
        >
          {common("learnMore")}
          <span aria-hidden="true" className="rtl:rotate-180">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
