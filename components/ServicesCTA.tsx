import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Users2,
  ShieldCheck,
} from "lucide-react";

interface ServicesCTAProps {
  badge?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function ServicesCTA({
  badge = "Partner With Us",
  title = "Ready to Accelerate Your Business Growth?",
  description = "Whether you need a full-funnel partner or a specialized sprint team across design, marketing, and technology, Marketing Tusk delivers end-to-end execution that produces measurable category leadership.",
  primaryButtonText = "Start Your Project Today",
  primaryButtonLink = "/contact",
  secondaryButtonText = "Schedule a Consultation",
  secondaryButtonLink = "/contact?service=Consultation",
}: ServicesCTAProps) {
  const highlights = [
    {
      icon: Zap,
      label: "Fast Sprints",
      detail: "Agile, milestone-based execution",
    },
    {
      icon: Target,
      label: "Outcome Driven",
      detail: "Focused on high ROI & commercial impact",
    },
    {
      icon: Users2,
      label: "Dedicated Team",
      detail: "Senior designers, marketers & engineers",
    },
    {
      icon: ShieldCheck,
      label: "Transparent Process",
      detail: "Clear scopes with zero agency fluff",
    },
  ];

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background ambient decorative glows */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[500px] h-[350px] bg-primary-blue/15 rounded-full blur-[100px] dark:bg-primary-blue/20" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative rounded-3xl border border-border/80 bg-gradient-to-b from-card/95 via-card/80 to-background/90 dark:from-card dark:via-muted/20 dark:to-background p-8 md:p-14 lg:p-16 shadow-2xl backdrop-blur-sm overflow-hidden text-center">
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-blue to-transparent" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-blue-light text-primary-blue text-xs font-semibold uppercase tracking-wider mb-6 border border-primary-blue/20">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{badge}</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground max-w-3xl mx-auto leading-tight md:leading-snug">
            {title}
          </h2>

          {/* Description */}
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={primaryButtonLink} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue-dark text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-primary-blue/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>{primaryButtonText}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Link href={secondaryButtonLink} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-border hover:border-primary-blue/50 bg-background/50 hover:bg-muted/70 text-foreground font-medium text-base px-8 py-6 rounded-xl transition-all"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          </div>

          {/* Trust Highlights Grid */}
          <div className="mt-14 pt-10 border-t border-border/60 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary-blue-light text-primary-blue flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
