"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Search,
  Calendar,
  Clock,
  User,
  Filter,
} from "lucide-react";

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

const getExcerpt = (blocks: any[]) => {
  if (!blocks) return "";
  const text = blocks
    .filter((block) => block._type === "block" && block.children)
    .map((block) => block.children.map((child: any) => child.text).join(""))
    .join(" ");
  return text.length > 150 ? text.substring(0, 150) + "..." : text;
};

const getReadTime = (blocks: any[]) => {
  const text = getExcerpt(blocks);
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200) || 1;
  return `${minutes} min read`;
};

export function BlogList({ posts }: { posts: Post[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allCategories = Array.from(
    new Set(
      (posts || []).flatMap((post) => post.categories || []).filter(Boolean),
    ),
  );
  const categories = ["All", ...allCategories];

  const filteredPosts = (posts || []).filter((post) => {
    const titleMatch = post.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const excerptMatch = getExcerpt(post.body || [])
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || excerptMatch;

    const postCats = post.categories || [];
    const matchesCategory =
      selectedCategory === "All" || postCats.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Knowledge Hub
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Latest <span className="text-primary-blue">Insights</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tips, and insights from the
            Indian startup ecosystem. Learn from industry experts and successful
            entrepreneurs.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      {!posts || posts.length === 0 ? (
        <section className="py-24 bg-background text-center">
          <div className="container mx-auto px-4">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              No articles published yet
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We&apos;re currently working on creating insightful content for
              you. Please check back later!
            </p>
          </div>
        </section>
      ) : (
        <>
          {/* Search and Filter Section */}
          <section className="py-12 bg-background border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 focus-visible:ring-primary-blue"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedCategory(category as string)}
                        className={
                          selectedCategory === category
                            ? "bg-primary-blue text-white hover:bg-primary-blue-dark"
                            : "hover:text-primary-blue hover:border-primary-blue"
                        }
                      >
                        {category as string}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* All Posts */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                  {searchTerm
                    ? `Search Results (${filteredPosts.length})`
                    : selectedCategory === "All"
                      ? "All Articles"
                      : `${selectedCategory} Articles`}
                </h2>
                <p className="text-muted-foreground">
                  {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-border/50">
                  <div className="w-20 h-20 bg-primary-blue-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-primary-blue" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    No matching articles
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or browse a different
                    category.
                  </p>
                  <Button
                    className="bg-primary-blue text-white hover:bg-primary-blue-dark"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post) => (
                    <Link
                      key={post._id}
                      href={`/blog/${post.slug}`}
                      className="block h-full"
                    >
                      <Card className="hover:shadow-2xl hover:shadow-primary-blue/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer group h-full flex flex-col border-border/50 bg-white">
                        <div className="relative overflow-hidden rounded-t-xl">
                          <Image
                            src={
                              post.mainImage ||
                              "/placeholder.svg?height=200&width=400"
                            }
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
                          <div className="flex items-center text-xs text-muted-foreground space-x-3 mt-3 flex-wrap gap-y-2">
                            {post.author && (
                              <div className="flex items-center space-x-1 font-medium pb-1 border-b border-transparent group-hover:border-primary-blue/30 transition-colors">
                                <User className="h-3.5 w-3.5" />
                                <span>{post.author}</span>
                              </div>
                            )}
                            {post.publishedAt && (
                              <div className="flex items-center space-x-1 pb-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>
                                  {new Date(
                                    post.publishedAt,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1 pb-1">
                              <Clock className="h-3.5 w-3.5" />
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
              )}
            </div>
          </section>
        </>
      )}

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-blue/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get the latest insights, tips, and startup stories delivered
            directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/95 text-gray-900 border-0 focus-visible:ring-2 focus-visible:ring-white"
            />
            <Button className="bg-white text-primary-blue hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all">
              Subscribe
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-5">
            Join 5,000+ entrepreneurs who read our weekly newsletter
          </p>
        </div>
      </section>
    </>
  );
}
