"use client";

import { Accordion } from "@/components/ui/accordion";
import { useTextDirection } from "@/hooks";
import { FAQ_IDS } from "../constants";
import { FaqItem } from "./FaqItem";

export function FaqList() {
  const { direction } = useTextDirection();

  return (
    <div className="mx-auto max-w-3xl">
      <Accordion
        type="single"
        collapsible
        dir={direction}
        className="w-full space-y-3 sm:space-y-4"
      >
        {FAQ_IDS.map((id, index) => (
          <FaqItem key={id} id={id} index={index} />
        ))}
      </Accordion>
    </div>
  );
}
