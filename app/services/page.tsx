"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight,
  Users,
  PresentationIcon as PresentationChart,
  Globe,
  Share2,
  Palette,
  User,
  Mail,
  FileText,
  BarChart,
  Mic,
  MapPin,
  Newspaper,
  Megaphone,
  Network,
  Menu,
  X,
  CheckCircle,
  Star,
  Clock,
  Target,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const services = [
    {
      icon: PresentationChart,
      title: "Pitch Deck Design",
      description:
        "Professional, investor-ready pitch decks and business presentations designed to communicate your story clearly, persuasively, and visually",
      features: [
        "Investor pitch decks",
        "Sales presentations",
        "Storytelling & content structuring",
        "Visual design & branding alignment",
      ],
      duration: "3-7 days",
      category: "Design",
    },
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Modern, fast, and conversion-optimized websites built to enhance your digital presence and drive business growth.",
      features: [
        "UI/UX design",
        "Responsive development",
        "Landing pages",
        "Speed optimization",
        "Conversion-focused structure",
      ],
      duration: "10-20 Days",
      category: "Development",
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description:
        "Strategic social media campaigns and creative content that build brand awareness, engagement, and audience growth.",
      features: [
        "Content calendar planning",
        "Creative post design",
        "Platform management",
        "Engagement strategy",
        "Performance tracking",
      ],
      duration: "Monthly Retainer",
      category: "Marketing",
    },
    {
      icon: Palette,
      title: "Branding Services",
      description:
        "Complete brand identity systems that help your business stand out and create a lasting impression in the market.",
      features: [
        "Logo design",
        "Brand guidelines",
        "Color & typography system",
        "Visual identity creation",
        "Brand positioning",
      ],
      duration: "7-14 Days",
      category: "Design",
    },
    {
      icon: User,
      title: "Personal Branding",
      description:
        "Position founders and professionals as industry leaders through strategic content, visibility, and authority building.",
      features: [
        "LinkedIn growth strategy",
        "Content creation",
        "Thought leadership positioning",
        "Profile optimization",
        "Audience building",
      ],
      duration: "Monthly Retainer",
      category: "Marketing",
    },
    {
      icon: Mail,
      title: "Email & WhatsApp Marketing",
      description:
        "Targeted campaigns that nurture leads, improve retention, and drive conversions through direct communication channels.",
      features: [
        "Campaign strategy",
        "Automation setup",
        "Funnel creation",
        "Broadcast campaigns",
        "Conversion tracking",
      ],
      duration: "5-10 Days Setup + Monthly",
      category: "Marketing",
    },
    {
      icon: FileText,
      title: "Content Marketing",
      description:
        "High-quality, SEO-driven content that builds authority, attracts the right audience, and supports long-term growth.",
      features: [
        "Blog writing",
        "SEO content strategy",
        "Website content",
        "Copywriting",
        "Content distribution",
      ],
      duration: "Monthly Retainer",
      category: "Marketing",
    },
    {
      icon: BarChart,
      title: "Reports Designing",
      description:
        "Visually engaging and professional reports for data presentation, insights, and corporate communication.",
      features: [
        "Business reports",
        "Annual reports",
        "Data visualization",
        "Infographics",
        "Clean layouts",
      ],
      duration: "3-6 Days",
      category: "Design",
    },
    {
      icon: Mic,
      title: "Event Marketing",
      description:
        "End-to-end marketing and branding support for webinars, conferences, and events to maximize reach and engagement.",
      features: [
        "Event promotion strategy",
        "Landing pages",
        "Social campaigns",
        "Branding assets",
        "Audience engagement",
      ],
      duration: "Campaign-Based",
      category: "Marketing",
    },
    {
      icon: MapPin,
      title: "OOH & DOOH Campaigns",
      description:
        "Outdoor and digital advertising campaigns designed to boost large-scale visibility and brand recall.",
      features: [
        "Billboard advertising",
        "Digital screens (DOOH)",
        "Location targeting",
        "Creative design",
        "Campaign execution",
      ],
      duration: "Campaign-Based",
      category: "Advertising",
    },
    {
      icon: Newspaper,
      title: "Media & Press Release",
      description:
        "PR and media outreach services that enhance brand credibility and secure high-impact media coverage.",
      features: [
        "Press release writing",
        "Media outreach",
        "Publication placements",
        "Brand storytelling",
        "PR strategy",
      ],
      duration: "5-10 Days",
      category: "Advertising",
    },
    {
      icon: Megaphone,
      title: "Digital Advertising",
      description:
        "ROI-driven digital advertising campaigns across Google, Meta, and LinkedIn to generate leads and drive sales.",
      features: [
        "Google Ads",
        "Meta Ads (Facebook/Instagram)",
        "LinkedIn Ads",
        "Funnel optimization",
        "Performance tracking",
      ],
      duration: "Monthly Retainer",
      category: "Advertising",
    },

    // existing networking services
    {
      icon: Users,
      title: "Investor Outreach",
      description:
        "Strategic connections with the right investors for your startup journey",
      features: [
        "Investor database access",
        "Personalized outreach",
        "Meeting coordination",
        "Follow-up management",
      ],
      duration: "4-6 weeks",
      category: "Networking",
    },
    {
      icon: Network,
      title: "Ecosystem Enablement",
      description:
        "Access to accelerators, mentors, and industry experts across India",
      features: [
        "Accelerator applications",
        "Mentor connections",
        "Industry introductions",
        "Program recommendations",
      ],
      duration: "3-4 weeks",
      category: "Networking",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      company: "TechStart Solutions",
      role: "Founder & CEO",
      content:
        "Marketing Tusk helped us secure our Series A funding with an outstanding pitch deck. Their understanding of the Indian startup ecosystem is unmatched.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      company: "EcoGreen Innovations",
      role: "Co-founder",
      content:
        "The branding and website development services exceeded our expectations. We saw a 300% increase in leads within the first month.",
      rating: 5,
    },
    {
      name: "Amit Kumar",
      company: "FinTech Pro",
      role: "Founder",
      content:
        "Their investor outreach program connected us with the right VCs. We closed our funding round 2 months ahead of schedule.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}


      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Comprehensive Solutions
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Our <span className="text-primary-blue">Marketing Services</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            From pitch decks to investor connections, we provide end-to-end marketing and ecosystem enablement services
            tailored for Indian startups, SMEs, and ecosystem players.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue-dark text-lg px-8 py-3 transform hover:scale-105 transition-all"
              >
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-primary-blue-light hover:bg-primary-blue-light bg-transparent transform hover:scale-105 transition-all"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Complete Marketing Solutions for Your Growth</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our comprehensive range of services designed to accelerate your startup journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-primary-blue-light group"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary-blue-light rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110">
                    <service.icon className="h-8 w-8 text-primary-blue" />
                  </div>
                  <Badge variant="secondary" className="mb-2 w-fit mx-auto">
                    {service.category}
                  </Badge>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary-blue transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary-blue flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {/*} <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-primary-blue" />
                        <span className="text-sm font-medium text-foreground">Price</span>
                      </div>
                      <span className="text-sm font-semibold text-primary-blue">{service.price}</span>
                    </div>*/}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary-blue" />
                        <span className="text-sm m-3 font-medium text-foreground">Timeline</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{service.duration}</span>
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button className="w-full bg-primary-blue hover:bg-primary-blue-dark transform hover:scale-105 transition-all">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach that ensures quality delivery and measurable results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                description:
                  "We understand your goals, target audience, and market positioning to create a tailored strategy.",
              },
              {
                step: "02",
                title: "Design & Development",
                description: "Our expert team creates compelling designs and content that resonate with your audience.",
              },
              {
                step: "03",
                title: "Review & Refinement",
                description:
                  "We collaborate with you to refine and perfect every detail until it meets your expectations.",
              },
              {
                step: "04",
                title: "Launch & Support",
                description: "We ensure smooth delivery and provide ongoing support to maximize your success.",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-blue text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section 
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it - hear from startups who have transformed their growth with our services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-blue-light rounded-full flex items-center justify-center">
                      <span className="text-primary-blue font-semibold text-sm">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* CTA Section */ }
      < section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Growth?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join hundreds of successful startups who have transformed their journey with our comprehensive marketing
            services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary-blue hover:bg-gray-100 text-lg px-8 py-3 transform hover:scale-105 transition-all"
              >
                Start Your Project Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary-blue text-lg px-8 py-3 transform hover:scale-105 transition-all bg-transparent"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>


    </div >
  )
}
