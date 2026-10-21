import Image from "next/image";
import { Link, formatDate } from "@/shared/i18n";
import type { PostEntry, PostMeta } from "../model/posts";

type PostCardProps = {
  entry: PostEntry;
  meta: PostMeta;
  locale: string;
  readLabel: string;
};

export function PostCard({ entry, meta, locale, readLabel }: PostCardProps) {
  return (
    <article className="group bg-surface relative flex flex-col overflow-hidden rounded-lg border">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={entry.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={entry.date} className="text-muted-foreground text-xs">
          {formatDate(locale, entry.date)}
        </time>
        <h3 className="mt-2 text-lg font-semibold">
          <Link
            href={`/blog/${entry.slug}/`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {meta.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
          {meta.description}
        </p>
        <span className="text-teal mt-4 text-sm font-semibold">{readLabel}</span>
      </div>
    </article>
  );
}
