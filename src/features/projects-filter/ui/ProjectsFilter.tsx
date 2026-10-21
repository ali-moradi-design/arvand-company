"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { PROJECTS, ProjectCard, SECTORS, type Sector } from "@/entities/project";
import { cn } from "@/shared/lib";

export function ProjectsFilter() {
  const t = useTranslations("projects");
  const [sector, setSector] = useState<Sector | "all">("all");
  const visible = PROJECTS.filter(
    (project) => sector === "all" || project.sector === sector,
  );

  return (
    <div>
      <div role="group" aria-label={t("filterLabel")} className="flex flex-wrap gap-2">
        {(["all", ...SECTORS] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={sector === value}
            onClick={() => setSector(value)}
            className={cn(
              "h-10 rounded-full border px-4 text-sm font-medium transition-colors",
              sector === value
                ? "bg-primary text-primary-foreground border-transparent"
                : "bg-surface hover:bg-muted",
            )}
          >
            {value === "all" ? t("all") : t(`sectors.${value}`)}
          </button>
        ))}
      </div>
      <p role="status" className="text-muted-foreground mt-4 text-sm">
        {t("count", { count: visible.length })}
      </p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
