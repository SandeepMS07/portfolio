import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog-format";

export function BlogPostFooter({
  prev,
  next,
}: {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
}) {
  if (!prev && !next) return null;
  return (
    <div className="mt-16 grid gap-3 border-t border-line pt-10 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="glass card-glow group flex flex-col gap-2 rounded-2xl p-5"
        >
          <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-fg-faint">
            <ArrowLeft className="h-3 w-3" />
            Older
          </span>
          <span className="font-medium text-fg group-hover:text-accent">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="glass card-glow group flex flex-col gap-2 rounded-2xl p-5 sm:items-end sm:text-right"
        >
          <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-fg-faint">
            Newer
            <ArrowRight className="h-3 w-3" />
          </span>
          <span className="font-medium text-fg group-hover:text-accent">
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}
    </div>
  );
}
