import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Turbopack requires plugins as ["package-name", options] tuples so it
// can serialize them across worker boundaries. Direct function imports
// (the classic webpack pattern) fail with a "serializable options"
// error in Next 16.
const rehypePrettyCodeOptions = {
  theme: { dark: "github-dark", light: "github-light" },
  defaultLang: "plaintext",
  keepBackground: false,
};

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    // remark-frontmatter strips the leading --- YAML block so it isn't
    // rendered as body text. gray-matter (in lib/blog.ts) still owns
    // PARSING the frontmatter for metadata server-side.
    remarkPlugins: [["remark-frontmatter", ["yaml"]], ["remark-gfm", {}]],
    rehypePlugins: [["rehype-pretty-code", rehypePrettyCodeOptions]],
  },
});

export default withMDX(nextConfig);
