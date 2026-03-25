"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FAQSection from "@/components/ui/faqsection";
import { Badge } from "@/components/ui/badge";

import {
  ArrowRight,
  Users,
  TrendingUp,
  Lightbulb,
  PresentationIcon as PresentationChart,
  Globe,
  Share2,
  Palette,
  Building2,
  Rocket,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const services = [
    {
      icon: PresentationChart,
      title: "Pitch Deck Design",
      description:
        "Compelling decks that drive investment and resonate with your target audience",
    },
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Modern, user-friendly designs that create captivating online presence",
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description:
        "Strategic brand engagement and audience building across platforms",
    },
    {
      icon: Palette,
      title: "Branding Services",
      description:
        "Complete brand identity solutions that establish strong market presence",
    },
    {
      icon: Users,
      title: "Investor Outreach",
      description:
        "Strategic connections with the right investors for your startup journey",
    },
    {
      icon: Network,
      title: "Ecosystem Enablement",
      description:
        "Access to accelerators, mentors, and industry experts across India",
    },
  ];

  const partners = [
    {
      name: "Aamukh Capital",
      logo: encodeURI("/images/partners/Portfolio Logo - Aamukh Capital.png"),
    },
    {
      name: "All Terra",
      logo: encodeURI("/images/partners/Portfolio Logo - All Terra.png"),
    },
    // {
    //   name: "AmeenJi",
    //   logo: encodeURI("/images/partners/Portfolio Logo - AmeenJi.png"),
    // },
    // {
    //   name: "Anawil",
    //   logo: encodeURI("/images/partners/Portfolio Logo - Anawil.png"),
    // },
    {
      name: "Append",
      logo: encodeURI("/images/partners/Portfolio Logo - Append.png"),
    },
    // {
    //   name: "ATM",
    //   logo: encodeURI("/images/partners/Portfolio Logo - ATM.png"),
    // },
    {
      name: "Bajaj VC",
      logo: encodeURI("/images/partners/Portfolio Logo - Bajaj VC.png"),
    },
    // {
    //   name: "ClassView",
    //   logo: encodeURI("/images/partners/Portfolio Logo - ClassView.png"),
    // },
    {
      name: "Decipher Investment",
      logo: encodeURI(
        "/images/partners/Portfolio Logo - Decipher Investment.png",
      ),
    },
    {
      name: "EagleEyeView",
      logo: encodeURI("/images/partners/Portfolio Logo - EagleEyeView.png"),
    },
    // {
    //   name: "Ecoline",
    //   logo: encodeURI("/images/partners/Portfolio Logo - Ecoline.png"),
    // },
    {
      name: "EUVA",
      logo: encodeURI("/images/partners/Portfolio Logo - EUVA.png"),
    },
    {
      name: "Evolvex",
      logo: encodeURI("/images/partners/Portfolio Logo - Evolvex.png"),
    },
    {
      name: "EweGo",
      logo: encodeURI("/images/partners/Portfolio Logo - EweGo.png"),
    },
    {
      name: "Focusline",
      logo: encodeURI("/images/partners/Portfolio Logo - Focusline.png"),
    },
    {
      name: "Foodelthy",
      logo: encodeURI("/images/partners/Portfolio Logo - Foodelthy.png"),
    },
    {
      name: "Green Guard Enviro",
      logo: encodeURI(
        "/images/partners/Portfolio Logo - Green Guard Enviro.png",
      ),
    },
    // {
    //   name: "Hem Securities",
    //   logo: encodeURI(
    //     "/images/partners/Portfolio Logo - Hem Securities.png",
    //   ),
    // },
    {
      name: "Innovartan",
      logo: encodeURI("/images/partners/Portfolio Logo - Innovartan.png"),
    },
    {
      name: "Lotus",
      logo: encodeURI("/images/partners/Portfolio Logo - Lotus.png"),
    },
    {
      name: "Project Zenith",
      logo: encodeURI("/images/partners/Portfolio Logo - Project Zenith.png"),
    },
    {
      name: "Rasta",
      logo: encodeURI("/images/partners/Portfolio Logo - Rasta.png"),
    },
    {
      name: "Rlogy",
      logo: encodeURI("/images/partners/Portfolio Logo - Rlogy.png"),
    },
    {
      name: "Statsh",
      logo: encodeURI("/images/partners/Portfolio Logo - Statsh.png"),
    },
    {
      name: "StudentTenant",
      logo: encodeURI("/images/partners/Portfolio Logo - StudentTenant.png"),
    },
    {
      name: "TPL",
      logo: encodeURI("/images/partners/Portfolio Logo - TPL.png"),
    },
    {
      name: "ugees",
      logo: encodeURI("/images/partners/Portfolio Logo - ugees.png"),
    },
    {
      name: "Venturizer",
      logo: encodeURI("/images/partners/Portfolio Logo - Venturizer.png"),
    },
    {
      name: "Yugartha",
      logo: encodeURI("/images/partners/Portfolio Logo - Yugartha.png"),
    },
    // {
    //   name: "Zelio",
    //   logo: encodeURI("/images/partners/Portfolio Logo - Zelio.png"),
    // },
  ];

  const [servicesPerSlide, setServicesPerSlide] = useState(3);
  const totalSlides = Math.ceil(services.length / servicesPerSlide);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setServicesPerSlide(1); // mobile
    } else if (window.innerWidth < 1024) {
      setServicesPerSlide(2); // tablet
    } else {
      setServicesPerSlide(3); // desktop
    }
  };

  handleResize(); // initial run
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

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
      <section className="py-16 bg-background border-b overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Infinite Logo Slider */}
          <div className="relative">
            <div className="flex animate-scroll space-x-16 items-center">
              {/* First set of logos */}
              <div className="flex space-x-16 items-center min-w-max">
                {partners.map((partner, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="h-12 w-auto object-contain transition-all duration-300"
                      width={120}
                      height={60}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex space-x-16 items-center min-w-max">
                {partners.map((partner, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  >
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="h-12 w-auto object-contain filter brightness-0 dark:brightness-100 hover:filter-none transition-all duration-300"
                      width={120}
                      height={60}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


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

          <div className="relative">
            {/* Services Slider */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div
  className={`grid gap-6 px-4 ${
    servicesPerSlide === 1
      ? "grid-cols-1"
      : servicesPerSlide === 2
      ? "md:grid-cols-2"
      : "lg:grid-cols-3"
  }`}
>
                      {services
                        .slice(
                          slideIndex * servicesPerSlide,
                          (slideIndex + 1) * servicesPerSlide,
                        )
                        .map((service, index) => (
                          <Card
                            key={index}
                            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-primary-blue-light"
                          >
                            <CardHeader className="text-center">
                              <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center mb-3 mx-auto transition-transform hover:scale-110">
                                <service.icon className="h-6 w-6 text-primary-blue" />
                              </div>
                              <CardTitle className="text-lg text-foreground">
                                {service.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground text-sm text-center">
                                {service.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background rounded-full p-2 shadow-lg hover:bg-primary-blue-light transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-primary-blue" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background rounded-full p-2 shadow-lg hover:bg-primary-blue-light transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-primary-blue" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide
                      ? "bg-primary-blue"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

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
