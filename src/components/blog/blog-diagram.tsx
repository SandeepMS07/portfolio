"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type BlogDiagramProps = {
  src: string;
  alt: string;
  caption?: string;
  /** width:height aspect ratio (e.g. "16/9") */
  aspect?: string;
};

export function BlogDiagram({
  src,
  alt,
  caption,
  aspect = "16/9",
}: BlogDiagramProps) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="my-10"
    >
      <div
        className="glass relative overflow-hidden rounded-2xl p-3 sm:p-5"
        style={{ aspectRatio: aspect }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 800px, 100vw"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-xs text-fg-faint">
          {caption}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
