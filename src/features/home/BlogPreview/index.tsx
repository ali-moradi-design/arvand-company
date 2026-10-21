import { SectionBackground } from "@/components/SectionBackground";
import { BlogHeader, BlogGrid } from "./components";

export default function BlogPreview() {
  return (
    <section
      className="relative overflow-hidden bg-black py-5 sm:py-20 md:py-24"
      aria-labelledby="blog-heading"
    >
      <SectionBackground redSide="end" />
      <div className="relative z-10 container mx-auto px-4">
        <BlogHeader />
        <BlogGrid />
      </div>
    </section>
  );
}
