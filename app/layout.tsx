import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialBar from "@/components/SocialBar";
import CookieConsent from "@/components/CookieConsent";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://www.marketingtusk.com";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marketing Tusk - Launch. Market. Grow.",
    template: "%s | Marketing Tusk",
  },
  description:
    "Your go-to ecosystem growth partner for startups, SMEs, enablers, and investors across India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Marketing Tusk - Launch. Market. Grow.",
    description:
      "Your go-to ecosystem growth partner for startups, SMEs, enablers, and investors across India.",
    url: siteUrl,
    siteName: "Marketing Tusk",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Marketing Tusk - Launch. Market. Grow.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@marketingtusk",
    creator: "@marketingtusk",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Marketing Tusk",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.svg`,
  image: `${siteUrl}/images/og-image.jpg`,
  description:
    "Your go-to ecosystem growth partner for startups, SMEs, enablers, and investors across India.",
  email: "connect@marketingtusk.com",
  telephone: "+91-7011170693",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://linkedin.com/company/marketingtusk",
    "https://twitter.com/marketingtusk",
    "https://instagram.com/marketingtusk",
    "https://facebook.com/marketingtusk",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Marketing Tusk",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <GoogleTagManager gtmId="GTM-WKFMFWW8" />
      <GoogleTagManager gtmId="GTM-WC5R7X2P" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <Header />
            {children}
            <Footer />
            <SocialBar />
            <CookieConsent />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
