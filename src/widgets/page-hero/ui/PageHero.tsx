import { Container, SectionHeading } from "@/shared/ui";

type PageHeroProps = { eyebrow?: string; title: string; description?: string };

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <div className="bg-sand border-b">
      <Container className="py-14 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Container>
    </div>
  );
}
