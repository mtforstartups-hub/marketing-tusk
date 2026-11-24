import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ServicesNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary-blue mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">
          Service Core Not Found
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          The requested service category could not be found. Please explore our
          main services directory.
        </p>
        <Link href="/services">
          <Button className="bg-primary-blue hover:bg-primary-blue-dark">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Services
          </Button>
        </Link>
      </div>
    </div>
  );
}
