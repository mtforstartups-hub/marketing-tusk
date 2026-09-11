import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Marketing Tusk",
  description: "Cookie Policy for Marketing Tusk.",
};

export default function CookiePolicyPage() {
  return <LegalPageLayout filename="cookie-policy.md" />;
}
