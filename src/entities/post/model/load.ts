import type { ComponentType } from "react";
import type { PostEntry, PostMeta } from "./posts";

type PostModule = { default: ComponentType; meta: PostMeta };

// Posts are MDX files: content/blog/<locale>/<slug>.mdx, each exporting `meta`.
export async function loadPost(locale: string, entry: PostEntry) {
  const mod: PostModule = await import(
    `../../../../content/blog/${locale}/${entry.slug}.mdx`
  );
  return { ...entry, meta: mod.meta, Content: mod.default };
}
