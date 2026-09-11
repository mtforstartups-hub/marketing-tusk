"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        setPreferences(JSON.parse(consent));
      } catch (e) {
        // invalid JSON
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPrefs = { necessary: true, analytics: true, advertising: true };
    setPreferences(newPrefs);
    localStorage.setItem("cookie-consent", JSON.stringify(newPrefs));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleRejectNonEssential = () => {
    const newPrefs = { necessary: true, analytics: false, advertising: false };
    setPreferences(newPrefs);
    localStorage.setItem("cookie-consent", JSON.stringify(newPrefs));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify(preferences));
    setShowBanner(false);
    setShowPreferences(false);
  };

  return (
    <>
      {showBanner && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100%-2rem)] sm:w-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4 animate-in slide-in-from-bottom-8 fade-in duration-500">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-blue"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M16 15.5v.01" />
                <path d="M12 12v.01" />
                <path d="M11 17v.01" />
                <path d="M7 14v.01" />
              </svg>
              Your Privacy Choices
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              We use necessary technologies to operate and secure
              marketingtusk.com. With your permission, we also use analytics
              technologies, including Google Analytics and Microsoft Clarity, to
              understand website usage, and advertising technologies, including
              Google Ads, Meta Pixel and LinkedIn Insight Tag, to measure
              campaigns and support advertising.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              You can accept all non-essential technologies, reject them, or
              choose your preferences. You can change your choice at any time.
            </p>
            <div className="flex gap-4 text-xs font-medium">
              <Link
                href="/cookie-policy"
                className="text-primary-blue hover:underline"
              >
                Cookie Policy
              </Link>
              <Link
                href="/privacy-policy"
                className="text-primary-blue hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full mt-1">
            <Button
              onClick={handleAcceptAll}
              className="w-full bg-primary-blue hover:bg-primary-blue-dark text-white transition-colors"
            >
              Accept All
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleRejectNonEssential}
                className="w-full text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Reject Non-Essential
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowPreferences(true)}
                className="w-full text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Manage Preferences
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              You can choose which optional technologies Marketing Tusk may use.
              Necessary technologies cannot be switched off where they are
              genuinely required to operate, secure or provide requested
              functionality on the website.
              <br />
              <br />
              You can change these preferences at any time.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-start justify-between space-x-4">
              <div>
                <h4 className="font-semibold text-sm">Necessary</h4>
                <p className="text-sm text-gray-500 mt-1">
                  These technologies are required for essential website
                  operation, security or functionality requested by you. They
                  are not used for optional advertising or analytics purposes.
                </p>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="text-sm font-medium text-gray-400">
                  Always Active
                </span>
                <Switch checked={true} disabled />
              </div>
            </div>

            <div className="flex items-start justify-between space-x-4">
              <div>
                <h4 className="font-semibold text-sm">Analytics</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Analytics technologies help us understand how visitors use
                  marketingtusk.com, including website traffic, page
                  interactions and site performance. Current technologies
                  include Google Analytics / GA4 and Microsoft Clarity.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            <div className="flex items-start justify-between space-x-4">
              <div>
                <h4 className="font-semibold text-sm">
                  Advertising & Targeting
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  These technologies help us measure advertising campaigns,
                  understand conversions and support advertising or remarketing
                  activities. Current technologies include Google Ads, Meta
                  Pixel, and LinkedIn Insight Tag.
                </p>
              </div>
              <Switch
                checked={preferences.advertising}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, advertising: checked }))
                }
              />
            </div>

            <div className="text-xs text-gray-500 pt-2">
              For more information, see our{" "}
              <Link
                href="/cookie-policy"
                className="text-primary-blue hover:underline"
              >
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-primary-blue hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-4 sm:space-x-0">
            <Button
              variant="outline"
              onClick={handleRejectNonEssential}
              className="w-full sm:w-auto"
            >
              Reject Non-Essential
            </Button>
            <Button
              variant="outline"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto"
            >
              Accept All
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto bg-primary-blue hover:bg-primary-blue-dark text-white"
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Temporary Dev Button */}
      {!showBanner && (
        <button 
          onClick={() => setShowBanner(true)}
          className="fixed bottom-4 left-4 z-50 bg-primary-blue text-white p-3 rounded-full shadow-lg hover:bg-primary-blue-dark transition-transform hover:scale-105"
          title="Show Cookie Banner (Temp)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>
        </button>
      )}
    </>
  );
}
