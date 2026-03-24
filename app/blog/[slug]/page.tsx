import { sanityFetch } from "@/sanity/lib/live"
import { POST_BY_SLUG_QUERY } from "@/sanity/lib/queries"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User, Clock } from "lucide-react"

export const revalidate = 60 // Revalidate the page every 60 seconds

// Custom portable text components to match the site's styling
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 text-foreground pt-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-4 text-foreground pt-3">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground pt-2">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg text-muted-foreground leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-blue pl-6 italic my-8 text-xl text-foreground bg-muted/30 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-8 mb-6 space-y-2 text-lg text-muted-foreground">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-8 mb-6 space-y-2 text-lg text-muted-foreground">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className="text-primary-blue hover:text-primary-blue-dark hover:underline transition-colors font-medium">
          {children}
        </a>
      )
    },
  },
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug }
  })

  if (!post) {
    notFound()
  }

  // Calculate read time
  let readTime = "5 min read"
  if (post.body) {
    const text = post.body
      .filter((block: any) => block._type === "block" && block.children)
      .map((block: any) => block.children.map((child: any) => child.text).join(""))
      .join(" ")
    const words = text.split(/\s+/).length
    const minutes = Math.ceil(words / 200) || 1
    readTime = `${minutes} min read`
  }

  return (
    <article className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-primary-light pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-primary-blue hover:text-primary-blue-dark mb-8 transition-colors font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all articles
            </Link>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories?.map((category: string) => (
                <Badge key={category} className="bg-primary-blue text-white hover:bg-primary-blue-dark">
                  {category}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground pb-8 border-b border-border/50">
              {post.author && (
                <div className="flex items-center">
                  {post.authorImage ? (
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={40}
                      height={40}
                      className="rounded-full mr-3 object-cover h-10 w-10 border-2 border-primary-blue/20"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center mr-3 border-2 border-primary-blue/20">
                      <User className="h-5 w-5 text-primary-blue" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{post.author}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 mt-2 sm:mt-0">
                {post.publishedAt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          {post.mainImage && (
            <div className="rounded-xl overflow-hidden shadow-2xl mb-12 bg-white ring-1 ring-border/50">
              <Image
                src={post.mainImage}
                alt={post.title || "Blog post featured image"}
                className="w-full h-auto max-h-[600px] object-cover"
                width={1200}
                height={800}
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none pt-4 bg-background">
            {post.body ? (
              <PortableText value={post.body} components={portableTextComponents} />
            ) : (
              <p className="text-xl text-muted-foreground italic">This post has no content yet.</p>
            )}
          </div>

          {/* Post Footer / Share (Optional UI addition) */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Share this article</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="sm" className="hover:text-primary-blue hover:border-primary-blue">
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="hover:text-primary-blue hover:border-primary-blue">
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
