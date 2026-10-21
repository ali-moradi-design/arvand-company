import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { POSTS, loadPost, type PostSlug } from "@/entities/post";
import { CtaBand } from "@/widgets/cta-band";
import { Link, formatDate, formatNumber } from "@/shared/i18n";
import { Container } from "@/shared/ui";

export async function PostPage({ locale, slug }: { locale: string; slug: PostSlug }) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const entry = POSTS.find((post) => post.slug === slug)!;
  const { meta, Content } = await loadPost(locale, entry);

  return (
    <>
      <article>
        <header className="bg-sand border-b">
          <Container className="max-w-3xl py-14 sm:py-20">
            <time dateTime={entry.date} className="text-muted-foreground text-sm">
              {formatDate(locale, entry.date)} ·{" "}
              {t("readingTime", { minutes: formatNumber(locale, meta.readingMinutes) })}
            </time>
            <h1 className="mt-3 text-3xl leading-tight font-bold text-balance sm:text-5xl">
              {meta.title}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">{meta.description}</p>
          </Container>
        </header>
        <Container className="max-w-3xl py-12">
          <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-lg border">
            <Image
              src={entry.image}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          <Content />
          <p className="mt-12">
            <Link href="/blog/" className="text-teal font-semibold">
              <span
                aria-hidden="true"
                className="inline-block ltr:me-1 rtl:ms-1 rtl:rotate-180"
              >
                ←
              </span>
              {t("back")}
            </Link>
          </p>
        </Container>
      </article>
      <CtaBand />
    </>
  );
}
