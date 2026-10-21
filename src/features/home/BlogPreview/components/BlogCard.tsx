import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import type { Article } from "../types";
import { BlogCardImage } from "./BlogCardImage";
import { BlogCardMeta } from "./BlogCardMeta";

interface BlogCardProps {
  article: Article;
  index: number;
}

export function BlogCard({ article, index }: BlogCardProps) {
  const t = useTranslations("blog");
  const title = t(`articles.${article.id}.title`);

  return (
    <Reveal inView delay={index * 0.1} className="group">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xs transition-all hover:border-white/20">
        <BlogCardImage
          image={article.image}
          title={title}
          category={t(`categories.${article.category}`)}
        />
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <BlogCardMeta
            publishedAt={article.publishedAt}
            readMinutes={article.readMinutes}
          />

          <h3 className="mb-2 line-clamp-2 text-lg font-bold sm:mb-3 sm:text-xl">
            {title}
          </h3>
          <p className="mb-4 line-clamp-3 flex-1 text-sm text-white/70 sm:text-base">
            {t(`articles.${article.id}.excerpt`)}
          </p>

          <Button
            variant="link"
            className="justify-start p-0 text-sm text-amber-400 hover:text-amber-300 focus:ring-2 focus:ring-amber-400 focus:outline-hidden sm:text-base"
            aria-label={t("readMoreLabel", { title })}
          >
            {t("readMore")}
            <ArrowRight
              className="ms-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 rtl:rotate-180"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
