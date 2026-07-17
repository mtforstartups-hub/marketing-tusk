import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, ArrowRight } from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | Marketing Tusk",
  description:
    "The page you're looking for doesn't exist. Let's get you back on track.",
};

export default function NotFound() {
  return (
    <main className="max-h-fit flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center max-w-2xl">
        <Badge className="mb-6 bg-primary-blue-light text-primary-blue hover:bg-primary-blue-light">
          404 Error
        </Badge>

        <h1 className="text-8xl font-black text-primary-blue mb-6 leading-none tracking-tight animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-150">
          Page Not Found
        </h2>

        <p className="text-lg text-muted-foreground mb-10 max-w-md leading-relaxed animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-300">
          The page you're looking for has either moved or doesn't exist. Head
          back and explore what we offer.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <Link href="/">
            <Button
              size="lg"
              className="bg-primary-blue hover:bg-primary-blue-dark text-white font-semibold px-8"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-blue-light hover:bg-primary-blue-light text-foreground font-semibold px-8 bg-transparent"
            >
              Browse Insights
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
