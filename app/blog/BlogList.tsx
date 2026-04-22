import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY_FILTERED } from "@/sanity/lib/queries";
import { ArrowRight, Calendar, Clock, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const POSTS_PER_PAGE = 6;

type Post = {
  _id: string;
  title: string;
  slug: string;
  author: string | null;
  authorImage: any | null;
  mainImage: string | null;
  categories: string[] | null;
  tags: string[] | null;
  publishedAt: string | null;
  body: any | null;
};

const getAllText = (blocks: any[]) => {
  if (!blocks) return "";
  return blocks
    .filter((block) => block._type === "block" && block.children)
    .map((block) => block.children.map((child: any) => child.text).join(""))
    .join(" ");
};

export const getExcerpt = (blocks: any[]) => {
  const text = getAllText(blocks);
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
};

export const getReadTime = (blocks: any[]) => {
  const text = getAllText(blocks);
  const words = text.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / 200) || 1;
  return `${minutes} min read`;
};

export default async function BlogList({
  category,
  search,
  currentPage,
}: {
  category: string;
  search: string;
  currentPage: number;
}) {
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  const { data: posts } = await sanityFetch({
    query: POSTS_QUERY_FILTERED,
    params: { category, search, start, end },
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="rounded-full bg-primary-blue/10 p-6 mb-6">
          <Search className="h-10 w-10 text-primary-blue" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-2">
          No articles found
        </h3>
        <p className="text-muted-foreground max-w-sm">
          {search && category
            ? `No posts match "${search}" in the "${category}" category.`
            : search
              ? `No posts match "${search}". Try a different keyword.`
              : category
                ? `No posts found in the "${category}" category yet.`
                : "No posts available yet. Check back soon!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {posts.map((post: Post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug}`}
          className="block h-full"
        >
          <Card className="hover:shadow-2xl hover:shadow-primary-blue/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-full flex flex-col border-border/50 bg-white">
            <div className="relative overflow-hidden rounded-t-xl">
              <Image
                src={post.mainImage || "/placeholder.svg?height=200&width=400"}
                alt={post.title || "Blog post"}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              {post.categories?.[0] && (
                <Badge className="absolute top-4 left-4 bg-primary-blue/90 backdrop-blur-sm text-white hover:bg-primary-blue border-none shadow-sm">
                  {post.categories[0]}
                </Badge>
              )}
            </div>
            <CardHeader className="flex-1 pb-2">
              <CardTitle className="text-xl group-hover:text-primary-blue transition-colors line-clamp-2 text-foreground leading-snug">
                {post.title}
              </CardTitle>
              <div className="flex items-center text-xs text-muted-foreground mt-3 flex-wrap gap-x-3 gap-y-2">
                {post.author && (
                  <div className="flex items-center gap-1 font-medium">
                    <User className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate max-w-[120px]">
                      {post.author}
                    </span>
                  </div>
                )}
                {post.publishedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{getReadTime(post.body)}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-auto pt-4">
              <p className="text-muted-foreground line-clamp-3 mb-6 text-sm/relaxed">
                {getExcerpt(post.body)}
              </p>
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border h-9 px-4 py-2 bg-transparent border-primary-blue text-primary-blue group-hover:bg-primary-blue group-hover:text-white">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
