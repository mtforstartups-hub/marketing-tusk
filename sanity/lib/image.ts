import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

export const sanityImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  if (!src.includes("cdn.sanity.io")) return src;
  const url = new URL(src);
  url.searchParams.set("w", width.toString());
  url.searchParams.set("q", (quality || 85).toString());
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.href;
};
