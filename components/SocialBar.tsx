"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SocialBar() {
    const pathname = usePathname();

    if (pathname?.startsWith("/studio")) {
        return null;
    }

    return (
        <div className="fixed right-4 bottom-6 z-50 flex flex-col items-center gap-3">
            <a
                href="https://wa.me/917011170693"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            >
                {/* Pulse animation ring */}
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

                {/* WhatsApp SVG icon */}
                <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-7 h-7 relative z-10"
                >
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.052 9.38L1.056 31.2l6.06-1.94A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0Zm9.31 22.602c-.392 1.104-1.942 2.02-3.196 2.288-.86.18-1.98.324-5.754-1.238-4.832-1.998-7.94-6.9-8.18-7.222-.232-.32-1.942-2.588-1.942-4.936s1.23-3.5 1.666-3.98c.436-.48.952-.6 1.268-.6.316 0 .63.002.906.016.29.014.68-.11 1.064.812.392.94 1.334 3.256 1.45 3.492.118.236.196.512.04.828-.156.316-.236.512-.47.792-.236.28-.496.624-.708.836-.236.236-.482.492-.208.966.276.472 1.226 2.022 2.632 3.276 1.81 1.614 3.336 2.114 3.81 2.35.476.236.752.196 1.03-.118.276-.316 1.188-1.384 1.504-1.86.316-.476.632-.396 1.068-.236.436.156 2.75 1.298 3.226 1.534.476.236.792.354.91.55.118.196.118 1.13-.274 2.234Z" />
                </svg>

                {/* Tooltip */}
                <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
                    Chat with us
                    <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </span>
            </a>
        </div>
    );
}
