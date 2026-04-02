"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Users,
  PresentationIcon as PresentationChart,
  Globe,
  Share2,
  Palette,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const services = [
    {
      icon: PresentationChart,
      title: "Pitch Deck Design",
      description:
        "Compelling decks that drive investment and resonate with your target audience",
    },
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Modern, user-friendly designs that create captivating online presence",
    },
    {
      icon: Share2,
      title: "Social Media Marketing",
      description:
        "Strategic brand engagement and audience building across platforms",
    },
    {
      icon: Palette,
      title: "Branding Services",
      description:
        "Complete brand identity solutions that establish strong market presence",
    },
    {
      icon: Users,
      title: "Investor Outreach",
      description:
        "Strategic connections with the right investors for your startup journey",
    },
    {
      icon: Network,
      title: "Ecosystem Enablement",
      description:
        "Access to accelerators, mentors, and industry experts across India",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Check if we've reached the end (with a 10px buffer for sub-pixel rendering)
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const itemWidth = scrollRef.current.children[0].clientWidth;
          scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
        }
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Update active dot based on scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.children[0].clientWidth;
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const nextSlide = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  };

  const prevSlide = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollBy({ left: -itemWidth, behavior: "smooth" });
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full mx-auto py-8">
      {/* Slider Container with Padding for Buttons */}
      <div className="relative px-12 md:px-16">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-muted hover:bg-primary-blue-light transition-colors group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 text-primary-blue group-hover:scale-110 transition-transform" />
        </button>

        {/* Scroll Track */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory py-4 -mx-3 scroll-smooth [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 snap-start px-3"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-primary-blue-light flex flex-col">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary-blue-light rounded-lg flex items-center justify-center mb-3 mx-auto transition-transform hover:scale-110">
                    <service.icon className="h-6 w-6 text-primary-blue" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex items-center justify-center">
                  <p className="text-muted-foreground text-sm text-center">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-muted hover:bg-primary-blue-light transition-colors group"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 text-primary-blue group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {services.map((_, index) => {
          // Dynamically hide excessive dots based on screen width
          const hideOnDesktop =
            services.length > 3 && index > services.length - 3
              ? "lg:hidden"
              : "";
          const hideOnTablet =
            services.length > 2 && index > services.length - 2
              ? "md:hidden"
              : "";

          return (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary-blue w-8" // Elongated pill for active state
                  : "bg-muted-foreground/30 w-3 hover:bg-muted-foreground/50"
              } ${hideOnDesktop} ${hideOnTablet}`}
            />
          );
        })}
      </div>
    </div>
  );
}
