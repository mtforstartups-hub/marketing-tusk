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
import CurrentYear from "./CurrentYear";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 group" aria-label="Marketing Tusk Home">
              <Image
                src="/images/logo-white.png"
                alt="Marketing Tusk"
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
              <a
                href="https://linkedin.com/company/marketingtusk"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/marketingtusk"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon twitter text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/marketingtusk"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon instagram text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/marketingtusk"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon facebook text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/917011170693"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon whatsapp text-gray-400 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
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

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p className="mb-4 md:mb-0">
            &copy; <CurrentYear /> Marketing Tusk. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
            <Link href="/refund-and-cancellation-policy" className="hover:text-white transition-colors">Refund & Cancellation Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
