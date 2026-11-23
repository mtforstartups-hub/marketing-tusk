"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServicesCTA from "@/components/ServicesCTA";
import {
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
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

interface SubService {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
}

interface ServiceGroup {
  number: string;
  id: string;
  title: string;
  titlePrefix: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  accentColor: string;
  services: SubService[];
}

const serviceGroups: ServiceGroup[] = [
  {
    number: "01",
    id: "design-and-branding",
    title: "Design & Branding",
    titlePrefix: "Design &",
    titleHighlight: "Branding",
    tagline: "Build brands and communication that are credible, consistent and commercially strong.",
    description:
      "Crafting investor-ready pitch decks, distinctive visual identities, and corporate collateral that establish immediate category authority and market trust.",
    accentColor: "from-blue-500/20 to-sky-500/20",
    services: [
      {
        title: "Brand Strategy & Identity",
        description:
          "Positioning, visual identity, logo systems, guidelines, and comprehensive rebranding architecture.",
        icon: Compass,
        deliverables: ["Brand Positioning", "Visual Identity Systems", "Logo Guidelines", "Rebranding Strategy"],
      },
      {
        title: "Creative & Graphic Design",
        description:
          "Creative direction, campaign visual assets, high-impact social creatives, and multi-channel marketing collateral.",
        icon: Palette,
        deliverables: ["Creative Direction", "Campaign Assets", "Social Media Creatives", "Marketing Collateral"],
      },
      {
        title: "Pitch Decks & Presentations",
        description:
          "Persuasive, investor-ready pitch decks and executive business presentations supported by sharp storytelling and design.",
        icon: Presentation,
        deliverables: ["Investor Pitch Decks", "Sales Presentations", "Narrative Structuring", "Data Visualization"],
      },
      {
        title: "Corporate Collateral",
        description:
          "Corporate profiles, product brochures, sales catalogues, and polished business communication materials.",
        icon: BookOpen,
        deliverables: ["Company Profiles", "Brochures & Catalogs", "One-Pagers", "Event Collateral"],
      },
      {
        title: "Reports & Information Design",
        description:
          "Impactful corporate reports, research publications, executive infographics, and complex data visualisation.",
        icon: BarChart3,
        deliverables: ["Annual Reports", "Whitepapers", "Executive Infographics", "Data Visualisation"],
      },
      {
        title: "Video & Multimedia",
        description:
          "Brand videos, high-converting motion graphics, product walkthroughs, and immersive visual storytelling.",
        icon: Video,
        deliverables: ["Brand Videos", "Motion Graphics", "Product Demos", "Visual Storytelling"],
      },
    ],
  },
  {
    number: "02",
    id: "marketing-and-visibility",
    title: "Marketing & Visibility",
    titlePrefix: "Marketing &",
    titleHighlight: "Visibility",
    tagline: "Build awareness, authority, reach and demand across the channels that matter.",
    description:
      "Data-backed acquisition campaigns, founder personal branding, and high-impact PR outreach that turn obscurity into market presence and sustained pipeline.",
    accentColor: "from-indigo-500/20 to-primary-blue/20",
    services: [
      {
        title: "Marketing & Growth Strategy",
        description:
          "Comprehensive marketing strategy, go-to-market (GTM) planning, campaign frameworks, and milestone-driven growth roadmaps.",
        icon: TrendingUp,
        deliverables: ["GTM Roadmaps", "Growth Strategy", "Channel Optimization", "Audience Research"],
      },
      {
        title: "Social Media & Content",
        description:
          "Strategic social media management, organic content calendars, creative production, and active community engagement.",
        icon: Share2,
        deliverables: ["Content Strategy", "Channel Management", "Creative Assets", "Community Growth"],
      },
      {
        title: "Personal Branding",
        description:
          "Founder, leadership, and professional positioning to establish industry authority, investor trust, and executive presence.",
        icon: UserCheck,
        deliverables: ["Founder Positioning", "LinkedIn Growth", "Thought Leadership", "Network Expansion"],
      },
      {
        title: "Lead Generation & Outreach",
        description:
          "Targeted B2B prospecting, customized account-based campaigns, multi-touch LinkedIn outreach, and cold email workflows.",
        icon: Target,
        deliverables: ["Targeted Prospecting", "B2B Campaigns", "LinkedIn Sequences", "Email Outreach"],
      },
      {
        title: "Performance Marketing",
        description:
          "ROI-driven digital acquisition campaigns across Google Ads, Meta (IG & FB), LinkedIn, and programmatic channels.",
        icon: Zap,
        deliverables: ["Google Search & PMax", "Meta Ads", "LinkedIn Ads", "ROAS & Funnel Scaling"],
      },
      {
        title: "Search & AI Visibility",
        description:
          "SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and modern AI discoverability.",
        icon: Search,
        deliverables: ["Technical SEO", "AI Search (GEO/AEO)", "Content Optimization", "Authority Building"],
      },
      {
        title: "Email & WhatsApp Marketing",
        description:
          "Targeted drip campaigns, customer lifecycle nurturing, broadcast sequences, and conversational conversion communication.",
        icon: Mail,
        deliverables: ["Drip Sequences", "WhatsApp Broadcasts", "Retention Funnels", "Copy & Automations"],
      },
      {
        title: "PR & Media",
        description:
          "Press communication, Tier-1 media outreach, strategic reputation management, and high-credibility editorial placements.",
        icon: Newspaper,
        deliverables: ["Press Releases", "Media Outreach", "Publication Placements", "Brand Authority"],
      },
      {
        title: "Events & Offline Visibility",
        description:
          "End-to-end event marketing, trade show activations, Out-Of-Home (OOH) billboards, and Digital OOH (DOOH) campaigns.",
        icon: MapPin,
        deliverables: ["Event Marketing", "Booth Branding", "OOH Billboards", "DOOH Digital Screens"],
      },
    ],
  },
  {
    number: "03",
    id: "tech-and-enablement",
    title: "Tech & Enablement",
    titlePrefix: "Tech &",
    titleHighlight: "Enablement",
    tagline: "Build the digital infrastructure, systems and automation required to operate efficiently and scale.",
    description:
      "Modern conversion-focused web engineering, marketing automation funnels, and data intelligence architecture engineered for sustainable velocity.",
    accentColor: "from-cyan-500/20 to-blue-600/20",
    services: [
      {
        title: "Website Design & Development",
        description:
          "Modern, high-speed, and conversion-focused business websites and landing pages engineered with modern stacks.",
        icon: Globe,
        deliverables: ["Next.js & React Sites", "High Speed Performance", "Conversion Layouts", "CMS Integration"],
      },
      {
        title: "UI/UX Design",
        description:
          "Intuitive digital product design, interactive wireframes, user journeys, and cohesive scalable design systems.",
        icon: Layout,
        deliverables: ["UI/UX Systems", "Interactive Wireframes", "User Flow Mapping", "Figma Components"],
      },
      {
        title: "Sales & Workflow Automation",
        description:
          "Automated lead routing, instant CRM syncing, sales pipeline workflows, and friction-free operational automations.",
        icon: Workflow,
        deliverables: ["CRM Workflows", "Lead Routing", "Pipeline Automation", "Tool Integrations"],
      },
      {
        title: "Data & Lead Intelligence",
        description:
          "Custom B2B database development, prospect enrichment, verified decision-maker research, and actionable intelligence.",
        icon: Database,
        deliverables: ["Database Enrichment", "Verified Lead Lists", "Competitive Insights", "TAM Mapping"],
      },
      {
        title: "Marketing Automation",
        description:
          "Automated multi-channel workflows, webhook-driven triggers, lead scoring, and full-funnel tracking architecture.",
        icon: Cpu,
        deliverables: ["Multi-Step Automations", "Triggered Campaigns", "Lead Scoring Systems", "Analytics Architecture"],
      },
      {
        title: "Digital Accessibility & Performance",
        description:
          "Accessibility audits, WCAG compliance implementation, Core Web Vitals optimization, and universal usability.",
        icon: Eye,
        deliverables: ["WCAG 2.1 Audits", "Core Web Vitals", "Accessibility Fixes", "Speed Tuning"],
      },
    ],
  },
];

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredGroups =
    activeFilter === "all"
      ? serviceGroups
      : serviceGroups.filter((g) => g.id === activeFilter);

  const scrollToGroup = (id: string) => {
    setActiveFilter("all");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -90;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary-blue-light selection:text-primary-blue">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden border-b border-border/40">
        {/* Ambient background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[400px] bg-primary-blue/10 rounded-full blur-[120px] dark:bg-primary-blue/15" />
          <div className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-indigo-500/10 rounded-full blur-[130px] dark:bg-indigo-500/15" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-blue-light text-primary-blue text-xs font-semibold uppercase tracking-wider mb-8 border border-primary-blue/20 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Solutions & Capabilities</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.12] mb-6">
            The Growth Partner Behind{" "}
            <span className="bg-gradient-to-r from-primary-blue via-blue-600 to-indigo-600 dark:from-blue-400 dark:via-primary-blue dark:to-indigo-400 bg-clip-text text-transparent">
              Bold Brands.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            From brand identity and investor decks to performance marketing and
            scalable digital systems, we execute across three interconnected
            engines to build category leaders.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue-dark text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-primary-blue/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>Get Custom Quote</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToGroup("design-and-branding")}
              className="w-full sm:w-auto border-border hover:border-primary-blue/40 bg-background/60 hover:bg-muted/60 text-foreground font-medium text-base px-8 py-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Explore All Services</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Quick-Jump Engine Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            {serviceGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => scrollToGroup(group.id)}
                className="group p-4 md:p-5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary-blue/50 transition-all duration-300 hover:shadow-md text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-primary-blue uppercase tracking-wider">
                      Engine {group.number}
                    </span>
                    <ArrowDownRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-blue group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-bold text-foreground text-base group-hover:text-primary-blue transition-colors">
                    {group.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {group.tagline}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground font-medium">
                  <span>{group.services.length} Capabilities</span>
                  <span className="text-primary-blue group-hover:underline font-semibold">
                    Jump to section →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          GROUPED SERVICES SECTION
          ========================================================================= */}
      <section id="services-catalog" className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 pb-8 border-b border-border/60">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary-blue font-semibold block mb-1">
                Capabilities Directory
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                Explore Services by Engine
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-muted/50 border border-border/70 backdrop-blur-sm">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === "all"
                    ? "bg-primary-blue text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                All Engines (21)
              </button>
              {serviceGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveFilter(group.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeFilter === group.id
                      ? "bg-primary-blue text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {group.title} ({group.services.length})
                </button>
              ))}
            </div>
          </div>

          {/* Service Groups List */}
          <div className="space-y-24 md:space-y-32">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                id={group.id}
                className="scroll-mt-28 relative group/section"
              >
                {/* Engine Group Header Banner */}
                <div className="mb-10 md:mb-12 p-8 md:p-10 rounded-3xl border border-border/70 bg-gradient-to-br from-card via-card/90 to-muted/30 relative overflow-hidden shadow-sm">
                  <div
                    className={`absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-br ${group.accentColor} blur-3xl pointer-events-none -z-10`}
                  />

                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-3xl space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-primary-blue-light text-primary-blue text-xs font-mono font-bold tracking-wider uppercase border border-primary-blue/20">
                          Engine {group.number}
                        </span>
                        <span className="text-xs font-medium text-muted-foreground">
                          {group.services.length} Specialized Capabilities
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        {group.titlePrefix}{" "}
                        <span className="text-primary-blue">
                          {group.titleHighlight}
                        </span>
                      </h3>

                      <p className="text-base sm:text-lg font-medium text-foreground/90">
                        {group.tagline}
                      </p>

                      <p className="text-sm text-muted-foreground leading-relaxed pt-1 max-w-2xl">
                        {group.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0">
                      <Link
                        href={`/contact?service=${encodeURIComponent(group.title)}`}
                      >
                        <Button
                          variant="outline"
                          className="border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue-light text-foreground font-semibold px-5 py-5 rounded-xl transition-all flex items-center gap-2 group-hover:shadow-md"
                        >
                          <span>Consult on {group.title}</span>
                          <ArrowRight className="w-4 h-4 text-primary-blue" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Grid of Subservices in this Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 items-stretch">
                  {group.services.map((service, serviceIndex) => {
                    const ServiceIcon = service.icon;
                    return (
                      <div
                        key={serviceIndex}
                        className="group/card relative rounded-2xl border border-border/80 bg-card p-6 md:p-7 flex flex-col justify-between transition-all duration-300 hover:border-primary-blue/40 hover:shadow-xl hover:-translate-y-1"
                      >
                        <div>
                          {/* Card Top: Icon & Counter */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-12 h-12 rounded-xl bg-primary-blue-light text-primary-blue flex items-center justify-center border border-primary-blue/20 transition-transform duration-300 group-hover/card:scale-110">
                              <ServiceIcon className="w-6 h-6 stroke-[1.8]" />
                            </div>
                            <span className="text-[11px] font-mono font-medium text-muted-foreground/70 uppercase tracking-widest px-2.5 py-1 rounded-md bg-muted/60">
                              {group.number}.{serviceIndex + 1 < 10 ? `0${serviceIndex + 1}` : serviceIndex + 1}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="text-xl font-bold tracking-tight text-foreground mb-2.5 group-hover/card:text-primary-blue transition-colors">
                            {service.title}
                          </h4>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                            {service.description}
                          </p>

                          {/* Deliverables / Capabilities Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {service.deliverables.map((item, itemIdx) => (
                              <span
                                key={itemIdx}
                                className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-lg bg-muted/70 text-muted-foreground border border-border/50 group-hover/card:border-border transition-colors"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Bottom CTA Link */}
                        <div className="mt-6 pt-5 border-t border-border/60">
                          <Link
                            href={`/contact?service=${encodeURIComponent(service.title)}`}
                            className="inline-flex items-center justify-between w-full text-xs font-semibold text-foreground group-hover/card:text-primary-blue transition-colors py-1"
                          >
                            <span className="flex items-center gap-1.5">
                              <span>Inquire for this service</span>
                            </span>
                            <div className="w-7 h-7 rounded-lg bg-muted/80 group-hover/card:bg-primary-blue group-hover/card:text-white flex items-center justify-center transition-all duration-300">
                              <ArrowUpRight className="w-4 h-4 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 transition-transform" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CTA COMPONENT SECTION
          ========================================================================= */}
      <ServicesCTA
        badge="Ready to Scale?"
        title="Ready to Accelerate Your Business Growth?"
        description="Whether you need a dedicated growth engine or an end-to-end partner across design, marketing, and engineering, our multidisciplinary team is ready to deliver measurable results."
        primaryButtonText="Start Your Project Today"
        primaryButtonLink="/contact"
        secondaryButtonText="Schedule a Consultation"
        secondaryButtonLink="/contact?service=Consultation"
      />
    </div>
  );
}

// Helper icon component for downward arrow
function ArrowDownRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m7 7 10 10" />
      <path d="M17 7v10H7" />
    </svg>
  );
}
