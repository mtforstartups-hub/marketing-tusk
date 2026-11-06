import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Megaphone, Wallpaper, Cpu } from "lucide-react";
import Link from "next/link";

const growthEngines = [
  {
    icon: Wallpaper,
    title: "Design & Branding",
    description: "Build stronger brands and communication.",
    link: "/design",
  },
  {
    icon: Megaphone,
    title: "Marketing & Visibility",
    description: "Get discovered, build authority and generate demand.",
    link: "/marketing",
  },
  {
    icon: Cpu,
    title: "Tech & Enablement",
    description:
      "Create the digital infrastructure and systems needed to scale.",
    link: "/tech",
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

      {/* Featured Service Card Concepts Section */}
      <section className="py-20 bg-muted/15 border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Capabilities. Three Growth Engines.
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Marketing Tusk brings together three complementary capability
              areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
            {growthEngines.map((engine, index) => (
              <Link
                key={index}
                href={engine.link}
                className="group bg-card border-2 border-foreground/10 hover:border-foreground/30 dark:border-white/10 dark:hover:border-white/30 p-8 md:p-10 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="text-primary-blue mb-8">
                    <engine.icon className="size-10 stroke-[1.75]" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                    {engine.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {engine.description}
                  </p>
                </div>
                <div className="pt-8 mt-8 border-t border-border/40">
                  <Link href="/contact" className="brand-cta-button">
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
              </Link>
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
