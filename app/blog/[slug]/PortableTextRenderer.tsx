"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor, sanityImageLoader } from "@/sanity/lib/image";

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-10 mx-auto rounded-xl overflow-hidden shadow-sm border border-border/60 bg-white">
          <Image
            loader={sanityImageLoader}
            src={urlFor(value).url()}
            alt={value.alt || "Blog content image"}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
          {value.caption && (
            <figcaption className="p-3 bg-muted/30 text-center border-t border-border/30">
              <span className="text-sm text-muted-foreground italic font-medium">
                {value.caption}
              </span>
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 text-foreground tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-5 text-foreground tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 font-light">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-blue bg-primary-blue/5 pl-6 py-5 pr-5 my-10 mx-0 italic text-xl md:text-2xl text-foreground font-medium rounded-r-xl shadow-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-8 mb-8 space-y-3 text-lg md:text-xl text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-8 mb-8 space-y-3 text-lg md:text-xl text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer nofollow" : undefined}
          className="text-primary-blue hover:text-primary-blue-dark hover:underline underline-offset-4 transition-colors font-medium"
        >
          {children}
        </a>
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={portableTextComponents} />;
}
