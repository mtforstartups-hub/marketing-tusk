import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Megaphone, Wallpaper, Cpu } from "lucide-react";
import Link from "next/link";

const growthEngines = [
  {
    number: "01",
    icon: Wallpaper,
    title: "Design & Branding",
    tagline: "Build stronger brands and communication.",
    description:
      "Crafting investor-ready pitch decks, distinctive visual identities, and corporate collateral that establish immediate category authority.",
    capabilities: [
      "Pitch Decks",
      "Brand Guidelines",
      "Visual Identity",
      "Report Design",
    ],
    link: "/services/design-and-branding",
  },
  {
    number: "02",
    icon: Megaphone,
    title: "Marketing & Visibility",
    tagline: "Get discovered, build authority and generate demand.",
    description:
      "Data-backed acquisition campaigns, founder personal branding, and high-impact PR outreach that turn obscurity into market presence.",
    capabilities: [
      "Performance Ads",
      "Personal Branding",
      "PR & Media",
      "Content Strategy",
    ],
    link: "/services/marketing-and-visibility",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Tech & Enablement",
    tagline: "Create the digital infrastructure and systems needed to scale.",
    description:
      "Modern conversion-focused web engineering, marketing automation funnels, and analytics architecture engineered for sustainable growth.",
    capabilities: [
      "Web Development",
      "Landing Pages",
      "Automation Funnels",
      "Analytics Setup",
    ],
    link: "/services/tech-and-enablement",
  },
];

export default function ServicesPage() {
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
            The Growth Partner
            <br /> Behind Bold <span className="text-primary-blue">Brands</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            From strategy to execution, we help businesses strengthen their
            brand, increase visibility, generate opportunities and build the
            systems required to grow.
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

      {/* Three Growth Engines Section - Asymmetric Editorial Architecture */}
      <section className="py-24 border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Thesis & Manifesto */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-primary-blue bg-primary-blue-light px-3 py-1 rounded-full inline-block font-semibold">
                Capability Architecture
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                Our Capabilities.
                <br />
                <span className="text-muted-foreground font-normal">
                  Three Growth Engines.
                </span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Rather than managing disconnected agencies for design,
                performance, and tech, Marketing Tusk unifies all three
                disciplines under one cohesive execution loop.
              </p>

              <div className="pt-4 border-t border-border/60">
                <div className="text-xs text-muted-foreground mb-3 font-medium">
                  Need a customized growth roadmap?
                </div>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-primary-blue-light hover:bg-primary-blue-light hover:border-primary-blue text-foreground font-medium"
                  >
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4 text-primary-blue" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column: Three Stacked High-Impact Engine Rows */}
            <div className="lg:col-span-8 space-y-6">
              {growthEngines.map((engine, index) => (
                <div
                  key={index}
                  className="group relative bg-card border-2 border-foreground/10 hover:border-foreground/30 dark:border-white/10 dark:hover:border-white/30 rounded-2xl p-7 md:p-9 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border/40">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-muted/60 dark:bg-muted/30 border border-border/60 flex items-center justify-center text-primary-blue transition-colors group-hover:bg-primary-blue-light flex-shrink-0">
                        <engine.icon className="h-7 w-7 stroke-[1.75]" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-widest block">
                          Engine {engine.number}
                        </span>
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">
                          {engine.title}
                        </h3>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto sm:min-w-[190px]">
                      <Link href={engine.link} className="brand-cta-button">
                        <span>Get started</span>
                        <div className="btn-icon">
                          <svg
                            height="24"
                            width="24"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="pt-6 space-y-3">
                    <p className="text-base text-foreground font-semibold leading-relaxed">
                      {engine.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {engine.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {engine.capabilities.map((cap, capIdx) => (
                        <span
                          key={capIdx}
                          className="text-xs px-3 py-1 rounded-md bg-muted/70 text-muted-foreground font-medium border border-border/40"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A systematic approach that ensures quality delivery and measurable
              results
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
                description:
                  "Our expert team creates compelling designs and content that resonate with your audience.",
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
                description:
                  "We ensure smooth delivery and provide ongoing support to maximize your success.",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-blue text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {process.title}
                </h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Accelerate Your Growth?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join hundreds of successful startups who have transformed their
            journey with our comprehensive marketing services.
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
    </div>
  );
}
