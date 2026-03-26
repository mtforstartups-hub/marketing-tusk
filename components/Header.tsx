"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
//import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Image
            src="/images/logo-white.png"
            alt="Marketing Tusk Logo"
            width={150}
            height={80}
          // className="dark:invert"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-foreground hover:text-primary-blue transition-colors relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/services"
            className="text-foreground hover:text-primary-blue transition-colors relative group"
          >
            Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/blog"
            className="text-foreground hover:text-primary-blue transition-colors relative group"
          >
            Blog
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
          </Link>
          <Link
            href="/contact"
            className="text-foreground hover:text-primary-blue transition-colors relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Theme Toggle and Mobile Menu*/} 
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <Link href="/contact">
            <Button className="hidden md:block bg-primary-blue hover:bg-primary-blue-dark transform hover:scale-105 transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-4 p-4">
            <Link
              href="/"
              className="text-foreground hover:text-primary-blue transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-foreground hover:text-primary-blue transition-colors"
            >
              Services
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary-blue transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary-blue transition-colors"
            >
              Contact
            </Link>
            <Link href="/contact">
              <Button className="bg-primary-blue hover:bg-primary-blue-dark w-full">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
