import type { ComponentProps } from "react";
import { cn } from "../lib";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container", className)} {...props} />;
}
