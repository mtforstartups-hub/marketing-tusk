import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Marketing Tusk",
  description: "Privacy Policy for Marketing Tusk.",
};

export default function PrivacyPolicyPage() {
  return <LegalPageLayout filename="privacy-policy.md" />;
}
