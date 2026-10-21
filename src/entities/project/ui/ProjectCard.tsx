import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link, formatNumber } from "@/shared/i18n";
import type { Project } from "../model/projects";

export function ProjectCard({ project }: { project: Project }) {
  const locale = useLocale();
  const t = useTranslations(`projects.items.${project.slug}`);
  const sectors = useTranslations("projects.sectors");

  return (
    <article className="group bg-surface relative flex flex-col overflow-hidden rounded-lg border">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-teal text-xs font-semibold tracking-wide uppercase">
          {sectors(project.sector)} · {formatNumber(locale, project.year)}
        </p>
        <h3 className="mt-2 text-lg font-semibold">
          <Link
            href={`/projects/${project.slug}/`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {t("title")}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-2 text-sm">{t("location")}</p>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
          {t("summary")}
        </p>
      </div>
    </article>
  );
}
