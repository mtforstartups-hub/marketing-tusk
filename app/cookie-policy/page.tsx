import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Marketing Tusk",
  description: "Cookie Policy for Marketing Tusk.",
  alternates: {
    canonical: "/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Marketing Tusk",
    description: "Cookie Policy for Marketing Tusk.",
    url: "https://www.marketingtusk.com/cookie-policy",
    siteName: "Marketing Tusk",
    locale: "en_IN",
    type: "website",
  },
};

export default function CookiePolicyPage() {
  return <LegalPageLayout filename="cookie-policy.md" />;
}
