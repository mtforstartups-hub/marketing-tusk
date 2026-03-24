import { sanityFetch } from "@/sanity/lib/live"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import { BlogList } from "./BlogList"

export const revalidate = 60 // Revalidate the page every 60 seconds

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return <BlogList posts={posts} />
}

