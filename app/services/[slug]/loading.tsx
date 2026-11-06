import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceCategoryLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton (consistent with sitewide hero) */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          {/* Badge Skeleton */}
          <div className="flex justify-center mb-6">
            <Skeleton className="h-7 w-56 rounded-full bg-primary-blue/15" />
          </div>

          {/* Title Skeleton */}
          <div className="flex justify-center mb-6">
            <Skeleton className="h-14 sm:h-16 w-3/4 max-w-xl rounded-2xl bg-foreground/10" />
          </div>

          {/* Description / Purpose Skeleton */}
          <div className="max-w-3xl mx-auto space-y-3 mb-8">
            <Skeleton className="h-5 w-full rounded-md bg-muted-foreground/15" />
            <Skeleton className="h-5 w-4/5 mx-auto rounded-md bg-muted-foreground/15" />
          </div>

          {/* CTA Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton className="h-12 w-48 rounded-md bg-primary-blue/20 mx-auto sm:mx-0" />
            <Skeleton className="h-12 w-44 rounded-md bg-foreground/10 mx-auto sm:mx-0" />
          </div>
        </div>
      </section>

      {/* Sibling Engine Switcher Bar Skeleton */}
      <section className="border-b border-border/60 bg-muted/20 py-3">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Skeleton className="h-4 w-36 rounded-md bg-muted-foreground/20" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-36 rounded-lg bg-card border border-border/60" />
            <Skeleton className="h-8 w-40 rounded-lg bg-card border border-border/60" />
            <Skeleton className="h-8 w-36 rounded-lg bg-card border border-border/60" />
          </div>
        </div>
      </section>

      {/* Subcategories Showcase Grid Skeleton */}
      <section className="py-20 md:py-24 border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-14 space-y-3">
            <Skeleton className="h-4 w-32 rounded bg-muted-foreground/20" />
            <Skeleton className="h-9 w-72 rounded-lg bg-foreground/10" />
            <Skeleton className="h-4 w-96 max-w-full rounded bg-muted-foreground/15" />
          </div>

          {/* 6 Subcategory Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-card border-2 border-foreground/10 rounded-2xl p-7 md:p-8 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Skeleton */}
                  <Skeleton className="h-9 w-9 rounded-lg bg-primary-blue/15 mb-6" />

                  {/* Title Skeleton */}
                  <Skeleton className="h-6 w-3/4 rounded-md bg-foreground/15 mb-3" />

                  {/* Description Skeletons */}
                  <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-full rounded bg-muted-foreground/15" />
                    <Skeleton className="h-4 w-5/6 rounded bg-muted-foreground/15" />
                  </div>
                </div>

                {/* Bottom CTA Skeleton */}
                <div className="pt-6 mt-6 border-t border-border/40">
                  <Skeleton className="h-11 w-full rounded-xl bg-primary-blue/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}