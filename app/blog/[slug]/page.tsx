import { sanityFetch } from "@/sanity/lib/live"
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/sanity/lib/queries"
import { PortableText } from "@portabletext/react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar, User, Clock, Linkedin, Twitter, Facebook, Link as LinkIcon, Mail } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

export const revalidate = 60

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-10 mx-auto rounded-xl overflow-hidden shadow-sm border border-border/60 bg-white">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog content image"}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
          {value.caption && (
            <figcaption className="p-3 bg-muted/30 text-center border-t border-border/30">
              <span className="text-sm text-muted-foreground italic font-medium">{value.caption}</span>
            </figcaption>
          )}
        </figure>
      )
    }
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-6 text-foreground tracking-tight">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-5 text-foreground tracking-tight">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h3>,
    normal: ({ children }: any) => <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 font-light">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary-blue bg-primary-blue/5 pl-6 py-5 pr-5 my-10 mx-0 italic text-xl md:text-2xl text-foreground font-medium rounded-r-xl shadow-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-8 mb-8 space-y-3 text-lg md:text-xl text-muted-foreground">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-8 mb-8 space-y-3 text-lg md:text-xl text-muted-foreground">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noindex nofollow' : ''} className="text-primary-blue hover:text-primary-blue-dark hover:underline underline-offset-4 transition-colors font-medium">
          {children}
        </a>
      )
    },
  },
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params

  // Fetch current post
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug }
  })

  // Fetch recent posts for the related section
  const { data: allPosts } = await sanityFetch({ query: POSTS_QUERY })
  const relatedPosts = allPosts?.filter((p: any) => p._id !== post?._id).slice(0, 3) || []

  if (!post) {
    notFound()
  }

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

  // Fallback to placeholder if no image so the hero doesn't look completely empty
  const heroImage = post.mainImage || "/placeholder.svg?height=1080&width=1920"

  return (
    <article className="min-h-screen bg-background pb-24 font-sans">
      {/* Immersive Hero Section */}
      <section className="relative w-full h-[65vh] min-h-[500px] max-h-[800px] flex flex-col justify-end">
        <Image
          src={heroImage}
          alt={post.title || "Blog post featured image"}
          fill
          className="object-cover absolute inset-0 z-0"
          priority
        />
        {/* Elegant layered gradient overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/70 to-black/20 z-10" />

        <div className="container mx-auto px-4 relative z-20 pb-16">
          <div className="max-w-5xl">
            <Link href="/blog" className="inline-flex items-center text-white/70 hover:text-white mb-8 transition-colors font-medium text-sm tracking-wide uppercase">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Insights
            </Link>

            <div className="flex flex-wrap gap-3 mb-6">
              {post.categories?.map((category: string) => (
                <Badge key={category} className="bg-primary-blue hover:bg-primary-blue-dark text-white border-transparent px-3 py-1 shadow-md">
                  {category}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-[1.1] tracking-tight drop-shadow-lg">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-medium">
              {post.author && (
                <div className="flex items-center">
                  {post.authorImage ? (
                    <Image
                      src={post.authorImage}
                      alt={post.author}
                      width={48}
                      height={48}
                      className="rounded-full mr-3 object-cover h-12 w-12 border-2 border-white/20 shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 border-2 border-white/20 shadow-md backdrop-blur-sm">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <span>{post.author}</span>
                </div>
              )}

              <div className="flex items-center gap-6">
                {post.publishedAt && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 opacity-80" />
                    <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 opacity-80" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          
          {/* Main Article Body */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg md:prose-xl max-w-none text-muted-foreground">
              {post.body ? (
                <PortableText value={post.body} components={portableTextComponents} />
              ) : (
                <p className="text-xl italic pt-8">This post has no content yet.</p>
              )}
            </div>

            {/* Bottom Article Tags */}
            <div className="mt-16 pt-8 border-t border-border/60">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-foreground">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {post.categories?.map((cat: string) => (
                    <Badge variant="secondary" key={cat} className="bg-muted hover:bg-muted text-muted-foreground">
                      {cat}
                    </Badge>
                  ))}
                  {(!post.categories || post.categories.length === 0) && (
                    <span className="text-muted-foreground text-sm">No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Author Bio Card */}
            {post.author && (
              <Card className="border-border/60 shadow-lg shadow-primary-blue/5 overflow-hidden">
                <div className="h-16 bg-gradient-primary-light w-full" />
                <CardContent className="px-6 pb-6 pt-0 relative">
                  <div className="flex flex-col items-center -mt-8 text-center">
                    {post.authorImage ? (
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        width={80}
                        height={80}
                        className="rounded-full object-cover h-20 w-20 border-4 border-background shadow-md mb-4"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-md mb-4">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-1">{post.author}</h3>
                    <p className="text-sm text-primary-blue font-medium mb-4">Content Contributor</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Bringing you the latest insights, strategies, and deep-dives into the startup ecosystem.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Share Widget */}
            <div className="bg-background border border-border/60 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Share this article</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-sky-50 hover:text-sky-500 hover:border-sky-500 transition-colors">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 transition-colors">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full hover:bg-gray-100 hover:text-foreground hover:border-foreground transition-colors">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-primary text-white p-8 rounded-xl shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-16 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110" />
              <div className="relative z-10">
                <Mail className="h-8 w-8 text-white/80 mb-4" />
                <h3 className="text-xl font-bold mb-2">Weekly Insights</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">
                  Join 5,000+ founders receiving our best strategies and market analysis every week.
                </p>
                <div className="space-y-3">
                  <Input 
                    placeholder="Work email address" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-white h-11" 
                  />
                  <Button className="w-full bg-white text-primary-blue hover:bg-gray-50 h-11 font-semibold">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="pt-6">
                <h3 className="text-lg font-bold text-foreground mb-6 uppercase tracking-wide border-b border-border/60 pb-3">Related Reading</h3>
                <div className="space-y-6">
                  {relatedPosts.map((relPost: any) => (
                    <Link key={relPost._id} href={`/blog/${relPost.slug}`} className="group flex gap-4 items-start">
                      <div className="relative w-24 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={relPost.mainImage || "/placeholder.svg?height=80&width=96"}
                          alt={relPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary-blue transition-colors line-clamp-2 mb-1">
                          {relPost.title}
                        </h4>
                        <span className="text-xs text-muted-foreground font-medium">
                          {new Date(relPost.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </article>
  )
}
