import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import whatsapp from "@/public/images/whatsapp.svg";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/marketingtusk",
    icon: Linkedin,
    clssname: "linkedin",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/marketingtusk",
    icon: Twitter,
    clssname: "twitter",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/marketingtusk",
    icon: Instagram,
    clssname: "instagram",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/marketingtusk",
    icon: Facebook,
    clssname: "facebook",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/917011170693",
    icon: MessageCircle,
    clssname: "whatsapp",
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group">
              <Image
                src="/images/logo-white.png"
                alt="Footer Logo"
                width={250}
                height={100}
              />
            </Link>
            <p className="text-gray-400 mb-6">
              Your go-to ecosystem growth partner for startups, SMEs, enablers,
              and investors across India.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-icon ${link.clssname} text-gray-400 hover:text-white transition-colors`}
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Pitch Deck Design
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Website Development
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Social Media Marketing
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Branding Services
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                About Us
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Case Studies
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors">
                connect@marketingtusk.com
              </li>
              <li className="hover:text-white transition-colors">
                <Image
                  src={whatsapp}
                  alt="Call Us"
                  width={20}
                  height={20}
                  className="inline-flex"
                />{" "}
                +91 70111 70693
              </li>
              <li className="hover:text-white transition-colors">
                www.marketingtusk.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Marketing Tusk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
