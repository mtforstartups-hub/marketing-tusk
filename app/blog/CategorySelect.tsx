"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategorySelectProps {
  categories: string[];
}

export default function CategorySelect({ categories }: CategorySelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const activeCategory = searchParams.get("category") || "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams);

    // Preserve active search query
    if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    // Reset to page 1 when filter changes
    params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
      <Select value={activeCategory || "all"} onValueChange={handleChange}>
        <SelectTrigger
          className="w-full sm:w-52 focus:ring-primary-blue"
          id="category-filter"
        >
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
