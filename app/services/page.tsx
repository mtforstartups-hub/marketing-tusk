"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServicesCTA from "@/components/ServicesCTA";
import {
  ArrowRight,
  CheckCircle,
  Compass,
  Palette,
  PresentationIcon as PresentationChart,
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
} from "lucide-react";

interface SubService {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

interface ServiceGroup {
  number: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  services: SubService[];
}

const serviceGroups: ServiceGroup[] = [
  {
    number: "01",
    badge: "Engine 01",
    title: "Design & Branding",
    tagline: "Build brands and communication that are credible, consistent and commercially strong.",
    description:
      "Crafting investor-ready pitch decks, distinctive visual identities, and corporate collateral that establish immediate category authority and market trust.",
    services: [
      {
        title: "Brand Strategy & Identity",
        description:
          "Positioning, visual identity, logo systems, guidelines, and comprehensive rebranding architecture.",
        icon: Compass,
        features: [
          "Brand positioning & architecture",
          "Visual identity & logo systems",
          "Comprehensive brand guidelines",
          "Rebranding & market repositioning",
        ],
      },
      {
        title: "Creative & Graphic Design",
        description:
          "Creative direction, campaign visual assets, high-impact social creatives, and multi-channel marketing collateral.",
        icon: Palette,
        features: [
          "Creative direction & art leadership",
          "Multi-channel campaign assets",
          "High-converting social creatives",
          "Marketing collateral & digital banners",
        ],
      },
      {
        title: "Pitch Decks & Presentations",
        description:
          "Persuasive, investor-ready pitch decks and executive business presentations supported by sharp storytelling and design.",
        icon: PresentationChart,
        features: [
          "Investor pitch decks & storytelling",
          "Sales & partnership decks",
          "Visual design & narrative flow",
          "Financial data visualization",
        ],
      },
      {
        title: "Corporate Collateral",
        description:
          "Corporate profiles, product brochures, sales catalogues, and polished business communication materials.",
        icon: BookOpen,
        features: [
          "Corporate company profiles",
          "Product brochures & catalogues",
          "One-pagers & executive factsheets",
          "Conference & event collateral",
        ],
      },
      {
        title: "Reports & Information Design",
        description:
          "Impactful corporate reports, research publications, executive infographics, and complex data visualisation.",
        icon: BarChart3,
        features: [
          "Annual & financial reports",
          "Research whitepapers & publications",
          "Custom infographics & diagrams",
          "Clean visual data representation",
        ],
      },
      {
        title: "Video & Multimedia",
        description:
          "Brand videos, high-converting motion graphics, product walkthroughs, and immersive visual storytelling.",
        icon: Video,
        features: [
          "High-impact brand & explainer videos",
          "Dynamic motion graphics",
          "Product walkthroughs & demos",
          "Campaign video ads & reels",
        ],
      },
    ],
  },
  {
    number: "02",
    badge: "Engine 02",
    title: "Marketing & Visibility",
    tagline: "Build awareness, authority, reach and demand across the channels that matter.",
    description:
      "Data-backed acquisition campaigns, founder personal branding, and high-impact PR outreach that turn obscurity into market presence and sustained pipeline.",
    services: [
      {
        title: "Marketing & Growth Strategy",
        description:
          "Comprehensive marketing strategy, go-to-market (GTM) planning, campaign frameworks, and milestone-driven growth roadmaps.",
        icon: TrendingUp,
        features: [
          "Go-to-market (GTM) roadmap",
          "Multi-channel acquisition strategy",
          "Audience research & segmentation",
          "Milestone-based growth planning",
        ],
      },
      {
        title: "Social Media & Content",
        description:
          "Strategic social media management, organic content calendars, creative production, and active community engagement.",
        icon: Share2,
        features: [
          "Organic content strategy & calendars",
          "High-engagement post design & copy",
          "Multi-platform channel management",
          "Community engagement & growth",
        ],
      },
      {
        title: "Personal Branding",
        description:
          "Founder, leadership, and professional positioning to establish industry authority, investor trust, and executive presence.",
        icon: UserCheck,
        features: [
          "Founder & executive positioning",
          "LinkedIn thought leadership strategy",
          "Ghostwriting & storytelling",
          "Network & authority building",
        ],
      },
      {
        title: "Lead Generation & Outreach",
        description:
          "Targeted B2B prospecting, customized account-based campaigns, multi-touch LinkedIn outreach, and cold email workflows.",
        icon: Target,
        features: [
          "Account-based prospecting (ABM)",
          "Multi-touch LinkedIn outreach",
          "Cold email campaign workflows",
          "Targeted prospect research",
        ],
      },
      {
        title: "Performance Marketing",
        description:
          "ROI-driven digital acquisition campaigns across Google Ads, Meta (IG & FB), LinkedIn, and programmatic channels.",
        icon: Zap,
        features: [
          "Google Search & Performance Max ads",
          "Meta Ads (Instagram & Facebook)",
          "LinkedIn B2B ad campaigns",
          "Funnel & ROAS optimization",
        ],
      },
      {
        title: "Search & AI Visibility",
        description:
          "SEO, Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), and modern AI discoverability.",
        icon: Search,
        features: [
          "Technical & on-page SEO",
          "Generative Engine Optimization (GEO)",
          "Answer Engine Optimization (AEO)",
          "High-authority backlink strategy",
        ],
      },
      {
        title: "Email & WhatsApp Marketing",
        description:
          "Targeted drip campaigns, customer lifecycle nurturing, broadcast sequences, and conversational conversion communication.",
        icon: Mail,
        features: [
          "Automated email drip sequences",
          "WhatsApp broadcast campaigns",
          "Lead nurturing & retention funnels",
          "Conversion-focused copywriting",
        ],
      },
      {
        title: "PR & Media",
        description:
          "Strategic press communication, Tier-1 media outreach, reputation management, and high-credibility editorial placements.",
        icon: Newspaper,
        features: [
          "Press release writing & distribution",
          "Tier-1 media outreach & pitching",
          "Editorial & publication placements",
          "Brand credibility & reputation management",
        ],
      },
      {
        title: "Events & Offline Visibility",
        description:
          "End-to-end event marketing, trade show activations, Out-Of-Home (OOH) billboards, and Digital OOH (DOOH) campaigns.",
        icon: MapPin,
        features: [
          "Event promotion & landing pages",
          "Exhibition & conference booth branding",
          "Billboard advertising (OOH)",
          "Digital display screens (DOOH)",
        ],
      },
    ],
  },
  {
    number: "03",
    badge: "Engine 03",
    title: "Tech & Enablement",
    tagline: "Build the digital infrastructure, systems and automation required to operate efficiently and scale.",
    description:
      "Modern conversion-focused web engineering, marketing automation funnels, and data intelligence architecture engineered for sustainable velocity.",
    services: [
      {
        title: "Website Design & Development",
        description:
          "Modern, high-speed, and conversion-focused business websites and landing pages engineered with modern stacks.",
        icon: Globe,
        features: [
          "Modern Next.js & React architecture",
          "Responsive mobile-first layouts",
          "Speed & Core Web Vitals optimization",
          "Conversion-optimized landing pages",
        ],
      },
      {
        title: "UI/UX Design",
        description:
          "Intuitive digital product design, interactive wireframes, user journeys, and cohesive scalable design systems.",
        icon: Layout,
        features: [
          "Intuitive UI/UX wireframes & flows",
          "Interactive Figma prototypes",
          "Comprehensive design systems",
          "User journey & conversion mapping",
        ],
      },
      {
        title: "Sales & Workflow Automation",
        description:
          "Automated lead routing, instant CRM syncing, sales pipeline workflows, and friction-free operational automations.",
        icon: Workflow,
        features: [
          "Automated CRM pipeline setup",
          "Intelligent lead routing & notifications",
          "Multi-tool integrations (Zapier/Make)",
          "Sales follow-up automations",
        ],
      },
      {
        title: "Data & Lead Intelligence",
        description:
          "Custom B2B database development, prospect enrichment, verified decision-maker research, and actionable intelligence.",
        icon: Database,
        features: [
          "Custom B2B database building",
          "Contact & company enrichment",
          "Decision-maker verification",
          "TAM & market intelligence mapping",
        ],
      },
      {
        title: "Marketing Automation",
        description:
          "Automated multi-channel workflows, webhook-driven triggers, lead scoring, and full-funnel tracking architecture.",
        icon: Cpu,
        features: [
          "Trigger-based workflow creation",
          "Multi-channel campaign sync",
          "Behavioral lead scoring systems",
          "Analytics & event tracking setup",
        ],
      },
      {
        title: "Digital Accessibility & Performance",
        description:
          "Accessibility audits, WCAG compliance implementation, Core Web Vitals optimization, and universal usability.",
        icon: Eye,
        features: [
          "WCAG 2.1 compliance audits",
          "Core Web Vitals speed optimization",
          "Assistive technology compatibility",
          "Cross-device performance tuning",
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
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
            From brand strategy to execution, we help businesses strengthen
            their brand, increase visibility, generate opportunities, and build
            the systems required to scale.
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
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-primary-blue-light hover:bg-primary-blue-light bg-transparent transform hover:scale-105 transition-all"
              >
                Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services List Grouped By Category */}
      {serviceGroups.map((group, groupIndex) => (
        <section
          key={groupIndex}
          className={`py-20 ${groupIndex % 2 === 1 ? "bg-muted/40" : ""}`}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-3">
                {group.badge}
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {group.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {group.tagline}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {group.services.map((service, serviceIndex) => (
                <Card
                  key={serviceIndex}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-primary-blue-light group"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary-blue-light rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110">
                      <service.icon className="h-8 w-8 text-primary-blue" />
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-primary-blue transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4 text-primary-blue flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <ServicesCTA />
    </div>
  );
}
