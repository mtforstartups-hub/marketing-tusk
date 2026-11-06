"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const menuItems = [
  { title: "Home", href: "/", subItems: [] },
  {
    title: "Services",
    href: "/services",
    subItems: [
      {
        number: "01",
        title: "Design & Branding",
        description: "Brand strategy, pitch decks & corporate collateral.",
        href: "/services/design-and-branding",
      },
      {
        number: "02",
        title: "Marketing & Visibility",
        description: "Performance ads, outreach, PR & demand generation.",
        href: "/services/marketing-and-visibility",
      },
      {
        number: "03",
        title: "Tech & Enablement",
        description: "Web development, automation & scalable digital systems.",
        href: "/services/tech-and-enablement",
      },
    ],
  },
  { title: "Blog", href: "/blog", subItems: [] },
  { title: "Contact", href: "/contact", subItems: [] },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(
    "Services"
  );

  const toggleMobileSubmenu = (title: string) => {
    setActiveMobileSubmenu((prev) => (prev === title ? null : title));
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/images/logo-white.png"
            alt="Marketing Tusk Logo"
            width={150}
            height={80}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={item.href}
                className="flex items-center gap-1.5 text-foreground hover:text-primary-blue transition-colors py-2 font-medium"
              >
                <span>{item.title}</span>
                {item.subItems.length > 0 && (
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180 text-muted-foreground group-hover:text-primary-blue" />
                )}
                {/* Custom Underline Effect */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
              </Link>

              {/* Desktop Submenu Dropdown */}
              {item.subItems.length > 0 && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform translate-y-1 group-hover:translate-y-0 z-50">
                  <div className="bg-card rounded-2xl shadow-xl border-2 border-border/80 p-3 flex flex-col w-80">
                    <div className="px-3 py-2 border-b border-border/50 mb-1">
                      <Link
                        href="/services"
                        className="text-xs font-semibold uppercase tracking-wider text-primary-blue hover:underline flex items-center justify-between"
                      >
                        <span>Capabilities Overview</span>
                        <span className="text-[10px] bg-primary-blue-light px-2 py-0.5 rounded-full font-mono font-semibold">
                          3 Engines
                        </span>
                      </Link>
                    </div>
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="p-3 rounded-xl hover:bg-muted/60 transition-colors group/sub"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-mono text-primary-blue font-semibold">
                            {subItem.number}
                          </span>
                          <span className="text-sm font-bold text-foreground group-hover/sub:text-primary-blue transition-colors">
                            {subItem.title}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed pl-5">
                          {subItem.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <Link href="/contact" className="hidden md:block">
            <Button className="bg-primary-blue hover:bg-primary-blue-dark transform hover:scale-105 transition-all shadow-md">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary-blue transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top-2 duration-300 ease-out shadow-lg">
          <nav className="flex flex-col px-4 pt-2 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <Link
                    href={item.href}
                    className="text-foreground hover:text-primary-blue transition-colors font-medium text-lg flex-1"
                    onClick={() => {
                      if (item.subItems.length === 0) setMobileMenuOpen(false);
                    }}
                  >
                    {item.title}
                  </Link>

                  {/* Toggle button for mobile submenu (keeps the main link clickable) */}
                  {item.subItems.length > 0 && (
                    <button
                      onClick={() => toggleMobileSubmenu(item.title)}
                      className="p-2 ml-2 bg-muted/50 rounded-md text-foreground hover:text-primary-blue transition-colors"
                      aria-label={`Toggle ${item.title} submenu`}
                    >
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          activeMobileSubmenu === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Submenu Accordion */}
                {item.subItems.length > 0 && (
                  <div
                    className={`flex flex-col space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      activeMobileSubmenu === item.title
                        ? "max-h-96 opacity-100 pt-2 pb-3"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <Link
                      href="/services"
                      className="pl-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary-blue hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Services Overview →
                    </Link>
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="pl-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg border-l-2 border-transparent hover:border-primary-blue transition-all"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                          <span className="text-xs font-mono text-primary-blue">
                            {subItem.number}
                          </span>
                          <span>{subItem.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 pl-5">
                          {subItem.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-6">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-primary-blue hover:bg-primary-blue-dark w-full py-6 text-md shadow-md">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
