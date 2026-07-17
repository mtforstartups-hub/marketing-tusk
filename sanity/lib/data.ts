import { cache } from "react";
import { sanityFetch } from "./live";
import {
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  POSTS_COUNT_QUERY,
  POSTS_SLUGS_QUERY,
} from "./queries";

export const getPost = cache(async (slug: string) => {
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  });

  return post;
});

export const getRelatedPosts = cache(
  async (currentPostId: string, categories: string[] = []) => {
    if (!currentPostId) return [];

    const { data: relatedPosts } = await sanityFetch({
      query: RELATED_POSTS_QUERY,
      params: { currentPostId, categoryTitles: categories },
    });

    // console.log('[related-posts] for categories:', categories, '→ results:',
    //   (relatedPosts || []).map((p: any) => `${p.slug} (relevance: ${p.relevance})`));

    return relatedPosts || [];
  },
);

export const getPostsCount = cache(async (category: string, search: string) => {
  const { data: totalCount } = await sanityFetch({
    query: POSTS_COUNT_QUERY,
    params: { category, search },
  });
  return totalCount ?? 0;
});

export const getAllPostSlugs = cache(async () => {
  const { data: slugs } = await sanityFetch({
    query: POSTS_SLUGS_QUERY,
  });
  return slugs || [];
});
