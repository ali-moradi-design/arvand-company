import { getTranslations } from "next-intl/server";
import { POSTS, PostCard, loadPost } from "@/entities/post";
import { PageHero } from "@/widgets/page-hero";
import { Section } from "@/shared/ui";

export async function BlogPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = await Promise.all(POSTS.map((entry) => loadPost(locale, entry)));

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <Section>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard
                entry={post}
                meta={post.meta}
                locale={locale}
                readLabel={t("read")}
              />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
