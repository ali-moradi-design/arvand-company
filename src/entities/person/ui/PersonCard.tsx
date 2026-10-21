import { useTranslations } from "next-intl";
import { cn } from "@/shared/lib";
import type { Person } from "../model/people";

// People are fictional, so the avatar is a generated monogram, not a photo.
export function PersonCard({ person }: { person: Person }) {
  const t = useTranslations(`team.members.${person.id}`);

  return (
    <article className="bg-surface rounded-lg border p-6">
      <div
        aria-hidden="true"
        className={cn(
          "flex size-16 items-center justify-center rounded-full text-xl font-bold",
          person.tone,
        )}
      >
        {t("initials")}
      </div>
      <h3 className="mt-4 text-lg font-semibold">{t("name")}</h3>
      <p className="text-teal text-sm font-medium">{t("role")}</p>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t("bio")}</p>
    </article>
  );
}
