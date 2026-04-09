import { Skeleton } from "@/components/ui/skeleton";

function BlogCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border/50 bg-white overflow-hidden h-full">
      {/* Image placeholder */}
      <Skeleton className="w-full h-56 rounded-none" />

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Badge + title */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Meta: author / date / read time */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-3.5 w-16" />
        </div>

        {/* Excerpt lines */}
        <div className="space-y-2 mt-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* CTA button */}
        <Skeleton className="h-9 w-36 rounded-md mt-2" />
      </div>
    </div>
  );
}

const SKELETON_COUNT = 6;

export default function BlogListSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}
