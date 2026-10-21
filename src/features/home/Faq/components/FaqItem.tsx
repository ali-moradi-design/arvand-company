import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItemProps {
  id: string;
  index: number;
}

export function FaqItem({ id, index }: FaqItemProps) {
  const t = useTranslations("faq.items");

  return (
    <Reveal inView duration={0.3} delay={index * 0.1}>
      <AccordionItem
        value={id}
        className="overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-xs"
      >
        <AccordionTrigger className="px-4 py-3 text-start text-sm font-medium hover:bg-white/5 hover:no-underline sm:px-6 sm:py-4 sm:text-lg">
          {t(`${id}.question`)}
        </AccordionTrigger>
        <AccordionContent className="px-4 py-3 text-sm text-white/70 sm:px-6 sm:py-4 sm:text-base">
          {t(`${id}.answer`)}
        </AccordionContent>
      </AccordionItem>
    </Reveal>
  );
}
