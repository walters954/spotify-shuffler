"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Custom event tracking for Google Analytics
declare global {
    interface Window {
        gtag?: (
            command: string,
            targetId: string,
            params?: Record<string, unknown>
        ) => void;
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

function AnalyticsContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window.gtag !== "undefined") {
            const url = pathname + searchParams.toString();
            window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
                page_path: url,
            });
        }
    }, [pathname, searchParams]);

    return (
        <>
            <VercelAnalytics />
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        </>
    );
}

export function Analytics() {
    return (
        <Suspense fallback={null}>
            <AnalyticsContent />
        </Suspense>
    );
}
