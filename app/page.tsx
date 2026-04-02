import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FAQSection from "@/components/ui/faqsection";
import { Badge } from "@/components/ui/badge";

import {
  ArrowRight,
  Users,
  TrendingUp,
  Lightbulb,
  Building2,
  Rocket,
  Network,
} from "lucide-react";

import Partners from "@/components/homepage/Partners";
import Services from "@/components/homepage/Services";

export default function HomePage() {
  return (
    <>
      {/* Header */}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Launch. Market. Grow.
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Maximize the Impact of your{" "}
            <span className="text-primary-blue">Venture</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Marketing Tusk helps early-stage startups, SMEs, enablers, and
            investors across India grow smarter and faster with strategic
            marketing and ecosystem enablement services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue-dark text-lg px-8 py-3 transform hover:scale-105 transition-all"
              >
                Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Logo Slider */}
      <Partners />

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              Your Go-To Ecosystem Growth Partner
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-150">
              We bridge the gap between founders, investors, and enablers by
              offering curated marketing services, program visibility, and
              community access.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Rocket,
                title: "For Startups",
                description:
                  "End-to-end support in branding, pitch decks, investor outreach, and accelerator applications so you can focus on building your product.",
                delay: "delay-0",
              },
              {
                icon: Building2,
                title: "For Enablers",
                description:
                  "Increase program visibility, attract quality applicants, and enhance your ecosystem presence with our targeted marketing strategies.",
                delay: "delay-150",
              },
              {
                icon: TrendingUp,
                title: "For Investors",
                description:
                  "Better pipeline visibility and access to vetted startups through our extensive network and ecosystem connections.",
                delay: "delay-300",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`text-center border-primary-blue-light hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-in fade-in-50 slide-in-from-bottom-6 ${item.delay}`}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary-blue-light rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110">
                    <item.icon className="h-8 w-8 text-primary-blue" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sliding Services Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              Our Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-150">
              From pitch decks to digital marketing, we provide all the tools
              your startup needs to succeed.
            </p>
          </div>

          <Services />

          <div className="text-center mt-12 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-500">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue-dark transform hover:scale-105 transition-all"
              >
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              Latest Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-150">
              Stay updated with the latest trends, tips, and insights from the
              Indian startup ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "10 Essential Elements of a Winning Pitch Deck",
                excerpt:
                  "Learn what investors look for in pitch decks and how to craft compelling narratives that secure funding.",
                date: "Jan 15, 2025",
                readTime: "5 min read",
                category: "Fundraising",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Building Your Startup Brand: A Complete Guide",
                excerpt:
                  "From logo design to brand voice, discover how to create a memorable brand identity that resonates with your audience.",
                date: "Jan 12, 2025",
                readTime: "7 min read",
                category: "Branding",
                image: "/placeholder.svg?height=200&width=400",
              },
              {
                title: "Top 15 Accelerators in India for Early-Stage Startups",
                excerpt:
                  "A comprehensive guide to the best accelerator programs in India and how to increase your chances of acceptance.",
                date: "Jan 10, 2025",
                readTime: "10 min read",
                category: "Ecosystem",
                image: "/placeholder.svg?height=200&width=400",
              },
            ].map((post, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-in fade-in-50 slide-in-from-bottom-6 delay-${index * 150}`}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    width={500}
                    height={500}
                  />
                  <Badge className="absolute top-4 left-4 bg-primary-blue hover:bg-primary-blue">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg hover:text-primary-blue transition-colors line-clamp-2 text-foreground">
                    {post.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground space-x-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-500">
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-blue-light hover:bg-primary-blue-light transform hover:scale-105 transition-all bg-transparent"
              >
                View All Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Network Section */}
      <section id="network" className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              Our Extensive Network
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-5 duration-700 delay-150">
              With a strong network of enablers, angel investors, VCs, and
              ecosystem experts, we help position your startup or program for
              maximum visibility and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Network,
                title: "Enablers",
                description:
                  "Connected with top enablers across India to help startups get accepted into prestigious programs.",
                delay: "delay-0",
              },
              {
                icon: Users,
                title: "Angel Investors",
                description:
                  "Direct access to angel investors looking for promising early-stage startups to fund.",
                delay: "delay-150",
              },
              {
                icon: TrendingUp,
                title: "Venture Capitalists",
                description:
                  "Relationships with VCs for Series A and beyond funding opportunities.",
                delay: "delay-300",
              },
              {
                icon: Lightbulb,
                title: "Ecosystem Experts",
                description:
                  "Mentors, advisors, and industry experts to guide your startup journey.",
                delay: "delay-450",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center animate-in fade-in-50 slide-in-from-bottom-6 duration-700 ${item.delay}`}
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110">
                  <item.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />

      {/* Call-to-Action Banner */}
      <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to <span className="text-yellow-300">Transform</span> Your
              Startup Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Join hundreds of successful startups who have accelerated their
              growth with Marketing Tusk. From pitch decks to investor
              connections, we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-primary-blue hover:bg-gray-100 text-lg px-8 py-4 transform hover:scale-105 transition-all font-semibold"
                >
                  Start Your Journey Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
