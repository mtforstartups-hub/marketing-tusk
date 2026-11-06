import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wallpaper, Megaphone, Cpu, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Service Not Found | Marketing Tusk",
  description:
    "The requested service category could not be found. Explore our three core growth engines.",
};

const engines = [
  {
    number: "01",
    title: "Design & Branding",
    description:
      "Build brands and communication that are credible, consistent and commercially strong.",
    slug: "design-and-branding",
    icon: Wallpaper,
  },
  {
    number: "02",
    title: "Marketing & Visibility",
    description:
      "Build awareness, authority, reach and demand across the channels that matter.",
    slug: "marketing-and-visibility",
    icon: Megaphone,
  },
  {
    number: "03",
    title: "Tech & Enablement",
    description:
      "Build the digital infrastructure, systems and automation required to scale.",
    slug: "tech-and-enablement",
    icon: Cpu,
  },
];

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            <HelpCircle className="mr-1.5 h-3.5 w-3.5" />
            Service Engine Not Found
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Capability <span className="text-primary-blue">Unavailable</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The service category you requested does not exist or may have been
            reorganized. Explore our three verified growth engines below.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button
                size="lg"
                className="bg-primary-blue hover:bg-primary-blue-dark text-white text-lg px-8 py-3 transform hover:scale-105 transition-all"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                View All Capabilities
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-primary-blue-light hover:bg-primary-blue-light bg-transparent transform hover:scale-105 transition-all"
              >
                Get Custom Scope
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Available Engines Grid */}
      <section className="py-20 border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
              Available Destinations
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Select a Growth Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {engines.map((engine) => {
              const Icon = engine.icon;
              return (
                <div
                  key={engine.slug}
                  className="group bg-card border-2 border-foreground/10 hover:border-foreground/30 dark:border-white/10 dark:hover:border-white/30 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-primary-blue">
                        <Icon className="h-8 w-8 stroke-[1.75]" />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/80 uppercase">
                        Engine {engine.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary-blue transition-colors">
                      {engine.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {engine.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/40">
                    <Link
                      href={`/services/${engine.slug}`}
                      className="brand-cta-button"
                    >
                      <span>Explore engine</span>
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
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
