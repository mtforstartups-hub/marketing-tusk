"use client";

import Image, { ImageProps } from "next/image";
import { sanityImageLoader } from "@/sanity/lib/image";

type SanityImageProps = Omit<ImageProps, "loader">;

export default function SanityImage(props: SanityImageProps) {
  return <Image {...props} loader={sanityImageLoader} />;
}
