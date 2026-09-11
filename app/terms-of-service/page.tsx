import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Marketing Tusk",
  description: "Terms of Service for Marketing Tusk.",
};

export default function TermsOfServicePage() {
  return <LegalPageLayout filename="terms-of-service.md" />;
}
