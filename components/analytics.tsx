"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";

// Custom event tracking for Google Analytics
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

export function trackEvent(
    action: string,
    category: string,
    label: string,
    value?: number
) {
    if (typeof window.gtag !== "undefined") {
        window.gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
}

export function Analytics() {
    useEffect(() => {
        // Track page views
        const handleRouteChange = (url: string) => {
            if (typeof window.gtag !== "undefined") {
                window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
                    page_path: url,
                });
            }
        };

        document.addEventListener(
            "routeChangeComplete",
            handleRouteChange as any
        );
        return () => {
            document.removeEventListener(
                "routeChangeComplete",
                handleRouteChange as any
            );
        };
    }, []);

    return (
        <>
            <VercelAnalytics />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </>
    );
}
