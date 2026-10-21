import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { POSTS, loadPost, type PostSlug } from "@/entities/post";
import { PostPage } from "@/pages/post";
import { routing } from "@/shared/i18n";
import { pageMetadata } from "@/shared/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => POSTS.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const entry = POSTS.find((post) => post.slug === slug);
  if (!entry) return {};
  const { meta } = await loadPost(locale, entry);
  return pageMetadata({
    locale,
    path: `/blog/${slug}/`,
    title: meta.title,
    description: meta.description,
    image: entry.image,
    type: "article",
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!POSTS.some((post) => post.slug === slug)) notFound();
  setRequestLocale(locale);
  return <PostPage locale={locale} slug={slug as PostSlug} />;
}
