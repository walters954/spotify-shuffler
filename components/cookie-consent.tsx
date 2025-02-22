"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const hasConsented = localStorage.getItem("cookieConsent");
        if (!hasConsented) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookieConsent", "true");
        setShowBanner(false);
        toast.success("Preferences saved", {
            description: "Your cookie preferences have been saved.",
        });
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", "false");
        setShowBanner(false);
        toast.success("Preferences saved", {
            description: "You've opted out of optional cookies.",
        });
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                    <p>
                        We use cookies to enhance your experience. We only use
                        essential cookies for authentication and session
                        management. No tracking or marketing cookies are used.{" "}
                    </p>
                </div>
                <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={handleDecline}>
                        Decline Optional
                    </Button>
                    <Button size="sm" onClick={handleAccept}>
                        Accept All
                    </Button>
                </div>
            </div>
        </div>
    );
}
