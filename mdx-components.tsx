import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/shared/ui/mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components };
}
