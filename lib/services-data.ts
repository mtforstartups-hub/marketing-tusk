import React from "react";
import {
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
  Wallpaper,
  Megaphone,
} from "lucide-react";

export interface SubService {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

export interface ServiceCore {
  number: string;
  slug: string;
  aliases: string[];
  badge: string;
  title: string;
  titlePrefix: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  services: SubService[];
}

export const serviceCores: ServiceCore[] = [
  {
    number: "01",
    slug: "design-and-branding",
    aliases: ["design", "design-branding"],
    badge: "Core 01",
    title: "Design & Branding",
    titlePrefix: "Design &",
    titleHighlight: "Branding",
    tagline: "Build brands and communication that are credible, consistent and commercially strong.",
    description:
      "Crafting investor-ready pitch decks, distinctive visual identities, and corporate collateral that establish immediate category authority and market trust.",
    icon: Wallpaper,
    services: [
      {
        title: "Brand Strategy & Identity",
        description:
          "Positioning, visual identity, logo systems, guidelines and rebranding.",
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
          "Creative direction, campaign assets, social creatives and marketing communication.",
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
          "Persuasive presentations supported by strong storytelling and design.",
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
          "Corporate profiles, brochures, catalogues and business communication materials.",
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
          "Reports, publications, infographics and data visualisation.",
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
          "Brand videos, campaign content, multimedia and visual storytelling.",
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
    slug: "marketing-and-visibility",
    aliases: ["marketing", "marketing-visibility"],
    badge: "Core 02",
    title: "Marketing & Visibility",
    titlePrefix: "Marketing &",
    titleHighlight: "Visibility",
    tagline: "Build awareness, authority, reach and demand across the channels that matter.",
    description:
      "Data-backed acquisition campaigns, founder personal branding, and high-impact PR outreach that turn obscurity into market presence and sustained pipeline.",
    icon: Megaphone,
    services: [
      {
        title: "Marketing & Growth Strategy",
        description:
          "Marketing strategy, GTM planning, campaign strategy and growth roadmaps.",
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
          "Social media management, content strategy, creation and audience engagement.",
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
          "Founder, leadership and professional positioning.",
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
          "Targeted prospecting, B2B campaigns, LinkedIn outreach and email outreach.",
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
          "Google, Meta, LinkedIn and other paid acquisition campaigns.",
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
          "SEO, AEO, GEO and AI discoverability.",
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
          "Campaigns, nurturing, follow-ups and conversion communication.",
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
          "Press communication, media outreach, reputation and authority building.",
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
          "Event marketing, OOH, DOOH and campaign activations.",
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
    slug: "tech-and-enablement",
    aliases: ["tech", "tech-enablement"],
    badge: "Core 03",
    title: "Tech & Enablement",
    titlePrefix: "Tech &",
    titleHighlight: "Enablement",
    tagline: "Build the digital infrastructure, systems and automation required to operate efficiently and scale.",
    description:
      "Modern conversion-focused web engineering, marketing automation funnels, and data intelligence architecture engineered for sustainable velocity.",
    icon: Cpu,
    services: [
      {
        title: "Website Design & Development",
        description:
          "Modern, responsive and conversion-focused business websites.",
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
          "User journey mapping, wireframing, interactive prototyping and design systems.",
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
          "Lead routing, follow-ups, sales processes and operational workflows.",
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
          "Database development, enrichment, prospect research and business intelligence.",
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
          "Automated email, WhatsApp, nurturing and campaign workflows.",
        icon: Cpu,
        features: [
          "Trigger-based workflow creation",
          "Multi-channel campaign sync",
          "Behavioral lead scoring systems",
          "Analytics & event tracking setup",
        ],
      },
      {
        title: "Digital Accessibility",
        description:
          "Accessibility audits, implementation & accessible digital experiences.",
        icon: Eye,
        features: [
          "WCAG 2.1 compliance audits",
          "Core Web Vitals speed optimization",
          "Assistive technology compatibility",
          "Accessible digital experience design",
        ],
      },
    ],
  },
];

export function getCoreBySlug(slug: string): ServiceCore | undefined {
  const normalized = slug.toLowerCase().trim();
  return serviceCores.find(
    (core) =>
      core.slug.toLowerCase() === normalized ||
      core.aliases.some((alias) => alias.toLowerCase() === normalized)
  );
}
