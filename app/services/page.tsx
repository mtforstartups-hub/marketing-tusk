"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ServicesCTA from "@/components/ServicesCTA";
import { serviceCores } from "@/lib/services-data";
import { ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary-light">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
            Our Services Are Made To Make Your Venture Grow
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            The Growth Partner Behind Bold{" "}
            <span className="text-primary-blue">Brands</span>
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

      {/* Three Core Growth Engines Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-3">
              Our Capabilities
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Three Growth Engines
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Marketing Tusk brings together three complementary capability
              areas engineered for measurable, full-funnel business momentum.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {serviceCores.map((core) => {
              const CoreIcon = core.icon;
              return (
                <Card
                  key={core.slug}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-primary-blue-light group flex flex-col justify-between"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-primary-blue-light rounded-xl flex items-center justify-center mb-4 mx-auto transition-transform group-hover:scale-110">
                      <CoreIcon className="h-8 w-8 text-primary-blue" />
                    </div>
                    <Badge variant="secondary" className="mb-2 w-fit mx-auto">
                      {core.badge}
                    </Badge>
                    <CardTitle className="text-2xl text-foreground group-hover:text-primary-blue transition-colors">
                      {core.title}
                    </CardTitle>
                    <p className="text-sm font-semibold text-foreground/90 mt-2">
                      {core.tagline}
                    </p>
                    <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                      {core.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6 flex flex-col justify-between flex-grow">
                    {/* Capability previews */}
                    <div className="border-t pt-5 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
                        Included Services ({core.services.length})
                      </p>
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {core.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-md bg-muted/70 text-muted-foreground font-medium border border-border/50"
                          >
                            {service.title}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Learn More Button */}
                    <div className="pt-2">
                      <Link href={`/services/${core.slug}`}>
                        <Button className="w-full bg-primary-blue hover:bg-primary-blue-dark transform hover:scale-[1.02] transition-all py-5 text-base font-semibold">
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ServicesCTA />
    </div>
  );
}
