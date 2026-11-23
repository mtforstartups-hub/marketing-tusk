import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServicesCTA from "@/components/ServicesCTA";
import { serviceCores, getCoreBySlug } from "@/lib/services-data";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Layers,
} from "lucide-react";

export function generateStaticParams() {
  const params: { slug: string }[] = [];
  serviceCores.forEach((core) => {
    params.push({ slug: core.slug });
    core.aliases.forEach((alias) => {
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
  const core = getCoreBySlug(slug);

  if (!core) {
    return {
      title: "Services | Marketing Tusk",
    };
  }

  return {
    title: `${core.title} | Marketing Tusk Services`,
    description: core.description,
  };
}

export default async function CoreServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentCore = getCoreBySlug(slug);

  if (!currentCore) {
    notFound();
  }

  const CoreIcon = currentCore.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Banner */}
      <section className="py-16 md:py-20 bg-gradient-primary-light border-b border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary-blue transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Core Services</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
                  {currentCore.badge}
                </Badge>
                <span className="text-xs font-mono text-muted-foreground font-semibold">
                  {currentCore.services.length} Specialized Capabilities
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {currentCore.titlePrefix}{" "}
                <span className="text-primary-blue">
                  {currentCore.titleHighlight}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mt-3 max-w-3xl leading-relaxed">
                {currentCore.tagline}
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary-blue hover:bg-primary-blue-dark text-base px-6 py-3 transform hover:scale-105 transition-all"
                >
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout: Left Side Main Core List | Right Side Services with Description */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Side: List of Main Cores */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/60">
                  <Layers className="h-4 w-4 text-primary-blue" />
                  <h3 className="font-bold text-sm uppercase tracking-wider text-foreground">
                    Core Capabilities
                  </h3>
                </div>

                <div className="space-y-3">
                  {serviceCores.map((core) => {
                    const isActive =
                      core.slug.toLowerCase() === currentCore.slug.toLowerCase();
                    const SidebarIcon = core.icon;

                    return (
                      <Link
                        key={core.slug}
                        href={`/services/${core.slug}`}
                        className={`block rounded-xl p-4 transition-all duration-200 border ${
                          isActive
                            ? "bg-primary-blue-light/70 border-primary-blue text-primary-blue shadow-sm"
                            : "bg-background/60 hover:bg-muted/60 border-border/70 text-foreground hover:border-primary-blue/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                isActive
                                  ? "bg-primary-blue text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              <SidebarIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="text-[11px] font-mono text-muted-foreground block">
                                {core.badge}
                              </span>
                              <span
                                className={`text-sm font-bold block ${
                                  isActive ? "text-primary-blue" : "text-foreground"
                                }`}
                              >
                                {core.title}
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            className={`h-4 w-4 ${
                              isActive
                                ? "text-primary-blue"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                          {core.services.length} capabilities included
                        </p>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-border/60">
                  <p className="text-xs text-muted-foreground mb-3">
                    Need a cross-engine strategy tailored for your venture?
                  </p>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full text-xs font-semibold border-primary-blue-light hover:bg-primary-blue-light text-foreground"
                    >
                      Book Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Side: List of Services with Description */}
            <main className="lg:col-span-8 space-y-6">
              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-primary-blue uppercase tracking-wider block mb-1">
                  Capability Roster
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  {currentCore.title} Services
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed breakdown of capabilities delivered with end-to-end
                  execution and measured outcomes.
                </p>
              </div>

              <div className="space-y-6">
                {currentCore.services.map((service, index) => {
                  const ServiceIcon = service.icon;
                  return (
                    <Card
                      key={index}
                      className="border-primary-blue-light hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary-blue-light rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                              <ServiceIcon className="h-6 w-6 text-primary-blue" />
                            </div>
                            <div>
                              <CardTitle className="text-xl text-foreground group-hover:text-primary-blue transition-colors">
                                {service.title}
                              </CardTitle>
                              <span className="text-[11px] font-mono text-muted-foreground">
                                {currentCore.number}.{index + 1 < 10 ? `0${index + 1}` : index + 1}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-2.5 pt-2 border-t border-border/40">
                          {service.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="h-4 w-4 text-primary-blue flex-shrink-0" />
                              <span className="text-xs text-muted-foreground">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <ServicesCTA />
    </div>
  );
}
