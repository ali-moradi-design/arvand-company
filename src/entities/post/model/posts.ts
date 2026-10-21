export const POSTS = [
  {
    slug: "project-delays-start-early",
    date: "2026-09-18",
    image: "/images/blog/delays.webp",
  },
  {
    slug: "before-a-feasibility-study",
    date: "2026-08-04",
    image: "/images/blog/feasibility.webp",
  },
  {
    slug: "planning-cross-border-freight",
    date: "2026-06-23",
    image: "/images/blog/office.webp",
  },
] as const;

export type PostEntry = (typeof POSTS)[number];
export type PostSlug = PostEntry["slug"];

export type PostMeta = {
  title: string;
  description: string;
  readingMinutes: number;
};
