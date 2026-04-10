import { cache } from "react";
import { sanityFetch } from "./live";
import { POST_BY_SLUG_QUERY, RELATED_POSTS_QUERY, POSTS_COUNT_QUERY } from "./queries";

export const getPost = cache(async (slug: string) => {
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });

  return post;
});

export const getRelatedPosts = cache(async (currentPostId: string) => {
  if (!currentPostId) return [];

  const { data: relatedPosts } = await sanityFetch({
    query: RELATED_POSTS_QUERY,
    params: { currentPostId },
  });
  return relatedPosts || [];
});

export const getPostsCount = cache(
  async (category: string, search: string) => {
    const { data: totalCount } = await sanityFetch({
      query: POSTS_COUNT_QUERY,
      params: { category, search },
    });
    return totalCount ?? 0;
  }
);
