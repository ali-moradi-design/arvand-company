import type { MDXComponents } from "mdx/types";

// Styles for blog posts written in MDX. Logical spacing keeps RTL correct.
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 mb-3 text-2xl font-bold text-balance" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-2 text-xl font-semibold" {...props} />,
  p: (props) => <p className="my-4 text-lg leading-8" {...props} />,
  ul: (props) => (
    <ul className="my-4 list-disc space-y-2 ps-6 text-lg leading-8" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 list-decimal space-y-2 ps-6 text-lg leading-8" {...props} />
  ),
  a: (props) => <a className="text-teal underline underline-offset-4" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-copper text-muted-foreground my-6 border-s-4 ps-5 italic"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold" {...props} />,
};
