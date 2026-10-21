import Image from "next/image";
import { useTranslations } from "next-intl";

interface BlogCardImageProps {
  image: string;
  title: string;
  category: string;
}

export function BlogCardImage({ image, title, category }: BlogCardImageProps) {
  const t = useTranslations("blog");

  return (
    <div className="relative h-44 overflow-hidden sm:h-48">
      <Image
        src={image}
        alt={t("imageAlt", { title })}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="absolute start-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md"
        aria-label={t("categoryLabel", { category })}
      >
        {category}
      </div>
    </div>
  );
}
