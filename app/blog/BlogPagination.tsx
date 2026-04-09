"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

interface BlogPaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function BlogPagination({
  totalPages,
  currentPage,
}: BlogPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  }

  // Build a windowed list of pages to show (always show first, last, and
  // neighbours of the current page; collapse the rest to ellipsis).
  function getPageRange(): (number | "ellipsis")[] {
    const delta = 1; // pages to show on each side of current
    const range: (number | "ellipsis")[] = [];
    const left = currentPage - delta;
    const right = currentPage + delta;

    let prev: number | null = null;
    for (let p = 1; p <= totalPages; p++) {
      if (p === 1 || p === totalPages || (p >= left && p <= right)) {
        if (prev !== null && p - prev > 1) range.push("ellipsis");
        range.push(p);
        prev = p;
      }
    }
    return range;
  }

  const pages = getPageRange();

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? buildHref(currentPage - 1) : undefined}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "hover:text-primary-blue hover:border-primary-blue transition-colors"
            }
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildHref(page)}
                isActive={page === currentPage}
                className={
                  page === currentPage
                    ? "bg-primary-blue text-white border-primary-blue hover:bg-primary-blue hover:text-white"
                    : "hover:text-primary-blue hover:border-primary-blue transition-colors"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? buildHref(currentPage + 1)
                : undefined
            }
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "hover:text-primary-blue hover:border-primary-blue transition-colors"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
