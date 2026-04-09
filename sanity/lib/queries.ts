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
