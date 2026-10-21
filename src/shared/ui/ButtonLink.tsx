import type { ComponentProps } from "react";
import { Link } from "../i18n";
import { cn } from "../lib";
import { buttonStyles, type ButtonStyleProps } from "./button-styles";

type ButtonLinkProps = ComponentProps<typeof Link> & ButtonStyleProps;

export function ButtonLink({ variant, size, className, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
