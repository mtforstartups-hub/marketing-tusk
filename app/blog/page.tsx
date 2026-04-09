import { Badge } from "@/components/ui/badge";
import BlogPostSearch from "./BlogPostSearch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import BlogList from "./BlogList";
import BlogListSkeleton from "./BlogListSkeleton";
import CategorySelect from "./CategorySelect";
import { sanityFetch } from "@/sanity/lib/live";
import { CATEGORIES_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export const revalidate = 60;

export default async function BlogPage(props: {
  searchParams?: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category || "";
  const query = searchParams?.search || "";
  const rawPage = Number.parseInt(searchParams?.page ?? "1", 10);
  const currentPage = rawPage > 0 ? rawPage : 1;

  const { data: categories } = await sanityFetch({ query: CATEGORIES_QUERY });
  const categoryList: string[] = categories ?? [];

  const hasFilters = !!(query || category);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Knowledge Hub
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Latest <span className="text-primary-blue">Insights</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tips, and insights from the
            Indian startup ecosystem. Learn from industry experts and successful
            entrepreneurs.
          </p>
        </div>
      </section>

      {/* Search + Filter bar */}
      <section className="sticky top-0 z-20 py-4 sm:py-5 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search takes up remaining space */}
            <div className="flex-1 min-w-0">
              <BlogPostSearch />
            </div>

            {/* Category dropdown — fixed width on desktop */}
            <div className="sm:w-auto">
              <CategorySelect categories={categoryList} />
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-12 sm:py-16 bg-muted/30 min-h-[60vh]">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section heading + clear filters */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {query
                ? `Results for "${query}"`
                : category
                  ? `Category: ${category}`
                  : "All Articles"}
            </h2>

            {hasFilters && (
              <Link href="/blog" className="shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground gap-1"
                >
                  Clear filters
                  <span aria-hidden>✕</span>
                </Button>
              </Link>
            )}
          </div>

          {/* Suspense streams the blog list while sanity fetches */}
          <Suspense
            key={`${category}-${query}-${currentPage}`}
            fallback={<BlogListSkeleton />}
          >
            <BlogList
              category={category}
              search={query}
              currentPage={currentPage}
            />
          </Suspense>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 sm:py-20 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-blue/10" />
        <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get the latest insights, tips, and startup stories delivered
            directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/95 text-gray-900 border-0 focus-visible:ring-2 focus-visible:ring-white"
            />
            <Button className="bg-white text-primary-blue hover:bg-gray-100 font-semibold shadow-lg hover:shadow-xl transition-all shrink-0">
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
