import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image.asset->url,
  "mainImage": mainImage.asset->url,
  "categories": categories[]->title,
  tags,
  publishedAt,
  body
}`);

// Filtered + paginated query: supports optional category, free-text search,
// and server-side pagination via $start/$end (GROQ slice offsets).
// An empty string for $search / $category acts as "match all".
export const POSTS_QUERY_FILTERED = defineQuery(
  `*[_type == "post"
    && defined(slug.current)
    && ($category == "" || $category in categories[]->title)
    && ($search == "" || title match $search + "*" || pt::text(body) match $search + "*")
  ] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image.asset->url,
  "mainImage": mainImage.asset->url,
  "categories": categories[]->title,
  tags,
  publishedAt,
  body
}`
);

// Returns the total count of posts matching the current filters
// (used to compute totalPages on the server).
export const POSTS_COUNT_QUERY = defineQuery(
  `count(*[_type == "post"
    && defined(slug.current)
    && ($category == "" || $category in categories[]->title)
    && ($search == "" || title match $search + "*" || pt::text(body) match $search + "*")
  ])`
);

// Returns a deduplicated list of all category titles used across published posts.
export const CATEGORIES_QUERY = defineQuery(
  `array::unique(*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].categories[]->title) | order(@ asc)`
);

export const POST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "author": author->name,
  "authorImage": author->image.asset->url,
  "mainImage": mainImage.asset->url,
  "categories": categories[]->title,
  tags,
  publishedAt,
  body
}`);

export const RELATED_POSTS_QUERY =
  defineQuery(`*[_type == "post" && _id != $currentPostId] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    "mainImage": mainImage.asset->url,
    publishedAt,
  }`);
