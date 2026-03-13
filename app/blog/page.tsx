"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight,
  Search,
  Calendar,
  Clock,
  User,
  Menu,
  X,
  Filter,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", "Fundraising", "Branding", "Marketing", "Ecosystem", "Growth", "Strategy"]

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Elements of a Winning Pitch Deck",
      excerpt:
        "Learn what investors look for in pitch decks and how to craft compelling narratives that secure funding. From problem statement to financial projections, we cover everything you need to know.",
      content: "A comprehensive guide to creating pitch decks that investors can't ignore...",
      author: "Pranav Kumar",
      date: "2025-01-15",
      readTime: "5 min read",
      category: "Fundraising",
      image: "/placeholder.svg?height=300&width=600&text=Pitch+Deck+Guide",
      featured: true,
    },
    {
      id: 2,
      title: "Building Your Startup Brand: A Complete Guide",
      excerpt:
        "From logo design to brand voice, discover how to create a memorable brand identity that resonates with your target audience and stands out in the competitive startup landscape.",
      content: "Brand identity is more than just a logo...",
      author: "Priya Sharma",
      date: "2025-01-12",
      readTime: "7 min read",
      category: "Branding",
      image: "/placeholder.svg?height=300&width=600&text=Branding+Guide",
      featured: false,
    },
    {
      id: 3,
      title: "Top 15 Accelerators in India for Early-Stage Startups",
      excerpt:
        "A comprehensive guide to the best accelerator programs in India and how to increase your chances of acceptance. Includes application tips and success stories.",
      content: "Accelerators can be game-changers for startups...",
      author: "Rahul Patel",
      date: "2025-01-10",
      readTime: "10 min read",
      category: "Ecosystem",
      image: "/placeholder.svg?height=300&width=600&text=Accelerators+Guide",
      featured: true,
    },
    {
      id: 4,
      title: "Social Media Marketing Strategies for B2B Startups",
      excerpt:
        "Discover effective social media strategies specifically tailored for B2B startups. Learn how to build thought leadership and generate quality leads through strategic content.",
      content: "B2B social media marketing requires a different approach...",
      author: "Anjali Singh",
      date: "2025-01-08",
      readTime: "6 min read",
      category: "Marketing",
      image: "/placeholder.svg?height=300&width=600&text=Social+Media+B2B",
      featured: false,
    },
    {
      id: 5,
      title: "Scaling Your Startup: From MVP to Market Leader",
      excerpt:
        "Navigate the challenges of scaling your startup from a minimum viable product to market leadership. Learn about team building, process optimization, and strategic planning.",
      content: "Scaling is one of the biggest challenges startups face...",
      author: "Vikram Gupta",
      date: "2025-01-05",
      readTime: "8 min read",
      category: "Growth",
      image: "/placeholder.svg?height=300&width=600&text=Scaling+Startup",
      featured: false,
    },
    {
      id: 6,
      title: "Understanding Investor Psychology: What VCs Really Want",
      excerpt:
        "Get inside the mind of venture capitalists and angel investors. Learn what they look for beyond numbers and how to present your startup in the most compelling way.",
      content: "Understanding investor psychology is crucial for fundraising success...",
      author: "Meera Reddy",
      date: "2025-01-03",
      readTime: "9 min read",
      category: "Fundraising",
      image: "/placeholder.svg?height=300&width=600&text=Investor+Psychology",
      featured: false,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

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
            Stay updated with the latest trends, tips, and insights from the Indian startup ecosystem. Learn from
            industry experts and successful entrepreneurs.
          </p>
        </div>
      </section>

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
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-primary-blue hover:bg-primary-blue-dark" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && selectedCategory === "All" && !searchTerm && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      width={500}
                      height={500}
                    />
                    <Badge className="absolute top-4 left-4 bg-primary-blue hover:bg-primary-blue">
                      {post.category}
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-yellow-500 hover:bg-yellow-500">Featured</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary-blue transition-colors line-clamp-2 text-foreground">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    <Button
                      variant="outline"
                      className="group-hover:bg-primary-blue group-hover:text-white transition-colors bg-transparent"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-16">
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
              {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      width={500}
                      height={500}
                    />
                    <Badge className="absolute top-4 left-4 bg-primary-blue hover:bg-primary-blue">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary-blue transition-colors line-clamp-2 text-foreground">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-primary-blue group-hover:text-white transition-colors bg-transparent"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get the latest insights, tips, and startup stories delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email" className="bg-white text-gray-900 border-0" />
            <Button className="bg-white text-primary-blue hover:bg-gray-100 font-semibold">Subscribe</Button>
          </div>
          <p className="text-sm opacity-75 mt-4">Join 5,000+ entrepreneurs who read our weekly newsletter</p>
        </div>
      </section>
    </>
  )
}
