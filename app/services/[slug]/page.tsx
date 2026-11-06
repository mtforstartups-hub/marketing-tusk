import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Palette,
  PresentationIcon as Presentation,
  BookOpen,
  BarChart3,
  Video,
  TrendingUp,
  Share2,
  UserCheck,
  Target,
  Zap,
  Search,
  Mail,
  Newspaper,
  MapPin,
  Globe,
  Layout,
  Workflow,
  Database,
  Cpu,
  Eye,
  Wallpaper,
  Megaphone,
} from "lucide-react";

interface SubService {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ServiceCategory {
  number: string;
  slug: string;
  aliases: string[];
  title: string;
  titlePrefix: string;
  titleHighlight: string;
  purpose: string;
  icon: React.ComponentType<{ className?: string }>;
  subcategories: SubService[];
  nextSlug: string;
  nextTitle: string;
}

const serviceCategories: ServiceCategory[] = [
  {
    number: "01",
    slug: "design-and-branding",
    aliases: ["design", "design-branding"],
    title: "Design & Branding",
    titlePrefix: "Design &",
    titleHighlight: "Branding",
    purpose:
      "Build brands and communication that are credible, consistent and commercially strong.",
    icon: Wallpaper,
    nextSlug: "marketing-and-visibility",
    nextTitle: "Marketing & Visibility",
    subcategories: [
      {
        title: "Brand Strategy & Identity",
        description:
          "Positioning, visual identity, logo systems, guidelines and rebranding.",
        icon: Compass,
      },
      {
        title: "Creative & Graphic Design",
        description:
          "Creative direction, campaign assets, social creatives and marketing communication.",
        icon: Palette,
      },
      {
        title: "Pitch Decks & Presentations",
        description:
          "Persuasive presentations supported by strong storytelling and design.",
        icon: Presentation,
      },
      {
        title: "Corporate Collateral",
        description:
          "Corporate profiles, brochures, catalogues and business communication materials.",
        icon: BookOpen,
      },
      {
        title: "Reports & Information Design",
        description:
          "Reports, publications, infographics and data visualisation.",
        icon: BarChart3,
      },
      {
        title: "Video & Multimedia",
        description:
          "Brand videos, campaign content, multimedia and visual storytelling.",
        icon: Video,
      },
    ],
  },
  {
    number: "02",
    slug: "marketing-and-visibility",
    aliases: ["marketing", "marketing-visibility"],
    title: "Marketing & Visibility",
    titlePrefix: "Marketing &",
    titleHighlight: "Visibility",
    purpose:
      "Build awareness, authority, reach and demand across the channels that matter.",
    icon: Megaphone,
    nextSlug: "tech-and-enablement",
    nextTitle: "Tech & Enablement",
    subcategories: [
      {
        title: "Marketing & Growth Strategy",
        description:
          "Marketing strategy, GTM planning, campaign strategy and growth roadmaps.",
        icon: TrendingUp,
      },
      {
        title: "Social Media & Content",
        description:
          "Social media management, content strategy, creation and audience engagement.",
        icon: Share2,
      },
      {
        title: "Personal Branding",
        description: "Founder, leadership and professional positioning.",
        icon: UserCheck,
      },
      {
        title: "Lead Generation & Outreach",
        description:
          "Targeted prospecting, B2B campaigns, LinkedIn outreach and email outreach.",
        icon: Target,
      },
      {
        title: "Performance Marketing",
        description:
          "Google, Meta, LinkedIn and other paid acquisition campaigns.",
        icon: Zap,
      },
      {
        title: "Search & AI Visibility",
        description: "SEO, AEO, GEO and AI discoverability.",
        icon: Search,
      },
      {
        title: "Email & WhatsApp Marketing",
        description:
          "Campaigns, nurturing, follow-ups and conversion communication.",
        icon: Mail,
      },
      {
        title: "PR & Media",
        description:
          "Press communication, media outreach, reputation and authority building.",
        icon: Newspaper,
      },
      {
        title: "Events & Offline Visibility",
        description: "Event marketing, OOH, DOOH and campaign activations.",
        icon: MapPin,
      },
    ],
  },
  {
    number: "03",
    slug: "tech-and-enablement",
    aliases: ["tech", "tech-enablement"],
    title: "Tech & Enablement",
    titlePrefix: "Tech &",
    titleHighlight: "Enablement",
    purpose:
      "Build the digital infrastructure, systems and automation required to operate efficiently and scale.",
    icon: Cpu,
    nextSlug: "design-and-branding",
    nextTitle: "Design & Branding",
    subcategories: [
      {
        title: "Website Design & Development",
        description:
          "Modern, responsive and conversion-focused business websites.",
        icon: Globe,
      },
      {
        title: "UI/UX Design",
        description:
          'The description printed in the source reads: "Founder, leadership and professional positioning."',
        icon: Layout,
      },
      {
        title: "Sales & Workflow Automation",
        description:
          "Lead routing, follow-ups, sales processes and operational workflows.",
        icon: Workflow,
      },
      {
        title: "Data & Lead Intelligence",
        description:
          "Database development, enrichment, prospect research and business intelligence.",
        icon: Database,
      },
      {
        title: "Marketing Automation",
        description:
          "Automated email, WhatsApp, nurturing and campaign workflows.",
        icon: Cpu,
      },
      {
        title: "Digital Accessibility",
        description:
          "Accessibility audits, implementation and accessible digital experiences.",
        icon: Eye,
      },
    ],
  },
];

function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  const normalized = slug.toLowerCase().trim();
  return serviceCategories.find(
    (cat) => cat.slug === normalized || cat.aliases.includes(normalized),
  );
}

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  serviceCategories.forEach((cat) => {
    params.push({ slug: cat.slug });
    cat.aliases.forEach((alias) => {
      params.push({ slug: alias });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Services | Marketing Tusk",
    };
  }

  return {
    title: `${category.title} | Marketing Tusk Services`,
    description: category.purpose,
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const CategoryIcon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Engine {category.number} · Comprehensive Solutions
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {category.titlePrefix}{" "}
            <span className="text-primary-blue">{category.titleHighlight}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {category.purpose}
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
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-primary-blue-light hover:bg-primary-blue-light bg-transparent transform hover:scale-105 transition-all"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sibling Engine Switcher Bar */}
      <section className="border-b border-border/60 bg-muted/20 py-3">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link
            href="/services"
            className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>All Growth Engines</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {serviceCategories.map((cat) => {
              const isActive = cat.slug === category.slug;
              return (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}`}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-primary-blue text-white shadow-sm"
                      : "bg-card border border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  }`}
                >
                  <span className="opacity-70 mr-1.5 font-mono">
                    {cat.number}
                  </span>
                  {cat.title}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subcategories Showcase Grid */}
      <section className="py-20 md:py-24 border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
              Capabilities Roster
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Specialized Subcategories
            </h2>
            <p className="text-muted-foreground text-base">
              Distinct capabilities delivered with end-to-end strategy,
              execution, and measured business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {category.subcategories.map((sub, index) => {
              const SubIcon = sub.icon;
              return (
                <div
                  key={index}
                  className="group bg-card border-2 border-foreground/10 hover:border-foreground/30 dark:border-white/10 dark:hover:border-white/30 p-7 md:p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-primary-blue mb-6">
                      <SubIcon className="h-9 w-9 stroke-[1.75]" />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground mb-3 group-hover:text-primary-blue transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {sub.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/40">
                    <Link
                      href={`/contact?service=${encodeURIComponent(sub.title)}`}
                      className="brand-cta-button"
                    >
                      <span>Inquire now</span>
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

      {/* Next Engine Navigation Banner */}
      <section className="py-16 bg-muted/20 border-b border-border/60">
        <div className="container mx-auto px-4">
          <div className="bg-card border-2 border-foreground/10 hover:border-foreground/30 dark:border-white/10 dark:hover:border-white/30 rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 transition-all">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                Continue Exploring Capabilities
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-foreground">
                Next Engine: {category.nextTitle}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Explore our complementary solutions for full-funnel business
                momentum.
              </p>
            </div>
            <Link href={`/services/${category.nextSlug}`}>
              <Button className="bg-primary-blue hover:bg-primary-blue-dark text-white font-medium px-6 py-6 rounded-xl flex items-center gap-2">
                <span>View {category.nextTitle}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
