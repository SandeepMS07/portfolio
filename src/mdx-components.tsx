// Required by @next/mdx for App Router. Maps MDX nodes to your styled
// renderers. Individual components live in src/components/blog/mdx-elements.tsx
// — this file is just the bridge so MDX can find them.
import type { MDXComponents } from "mdx/types";
import { mdxElements } from "@/components/blog/mdx-elements";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxElements, ...components };
}
