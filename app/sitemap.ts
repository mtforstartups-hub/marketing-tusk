import { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

const ALL_POSTS_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current)] { "slug": slug.current, _updatedAt }`,
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.marketingtusk.com";

  // Fetch all post slugs from Sanity
  const { data: posts } = await sanityFetch({
    query: ALL_POSTS_SLUGS_QUERY,
  });

  const blogPosts = posts.map((post: any) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Static routes
  const routes = ["", "/blog", "/services", "/contact"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...blogPosts];
}
