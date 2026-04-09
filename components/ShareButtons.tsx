"use client";

import { Button } from "@/components/ui/button";
import {
  Linkedin,
  Twitter,
  Facebook,
  Link as LinkIcon,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

interface ShareButtonsProps {
  title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
  const [url, setUrl] = useState("");
  const [isShareSupported, setIsShareSupported] = useState(false);
  const isReady = url.length > 0;

  useEffect(() => {
    setUrl(window.location.href);
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      setIsShareSupported(true);
    }
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: `Check out this article: ${title}`,
        url: url,
      });
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error("Native share error:", err);
        // Fallback to clipboard if share fails for non-abort reasons
        copyToClipboard();
      }
    }
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    if (!isReady) return;
    window.open(shareLinks[platform], "_blank", "noopener,noreferrer");
  };

  const copyToClipboard = async () => {
    if (!isReady) return;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
      console.error("Clipboard error:", err);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {isShareSupported && (
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors"
          onClick={handleNativeShare}
          aria-label="Share article"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}

      <div className="flex gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-colors"
          onClick={() => handleSocialShare("linkedin")}
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
          disabled={!isReady}
        >
          <Linkedin className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-sky-50 hover:text-sky-500 hover:border-sky-500 transition-colors"
          onClick={() => handleSocialShare("twitter")}
          aria-label="Share on Twitter"
          title="Share on Twitter"
          disabled={!isReady}
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 transition-colors"
          onClick={() => handleSocialShare("facebook")}
          aria-label="Share on Facebook"
          title="Share on Facebook"
          disabled={!isReady}
        >
          <Facebook className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-gray-100 hover:text-foreground hover:border-foreground transition-colors"
          onClick={copyToClipboard}
          aria-label="Copy link to clipboard"
          title="Copy link"
          disabled={!isReady}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
