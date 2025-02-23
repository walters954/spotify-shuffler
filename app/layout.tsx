import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { CookieConsent } from "@/components/cookie-consent";
import { Analytics } from "@/components/analytics";
import {
    SITE_URL,
    SITE_NAME,
    SITE_DESCRIPTION,
    TWITTER_HANDLE,
    siteConfig,
} from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Fix Spotify Shuffle Not Working | True Random Playlist Shuffler",
    description: SITE_DESCRIPTION,
    keywords: [
        "spotify shuffle not working",
        "spotify shuffle not random",
        "spotify shuffle fix",
        "how to fix spotify shuffle",
        "spotify shuffle problem",
        "spotify random playlist",
        "spotify playlist randomizer",
        "spotify true random",
    ],
    metadataBase: new URL(SITE_URL),
    openGraph: {
        title: "Fix Spotify Shuffle Not Working | True Random Playlist Shuffler",
        description: SITE_DESCRIPTION,
        type: "website",
        url: SITE_URL,
        siteName: SITE_NAME,
        locale: "en_US",
        images: [
            {
                url: siteConfig.ogImage,
                width: 512,
                height: 512,
                alt: SITE_NAME,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Fix Spotify Shuffle Not Working | True Random Playlist Shuffler",
        description: SITE_DESCRIPTION,
        images: [siteConfig.ogImage],
        creator: TWITTER_HANDLE,
        site: TWITTER_HANDLE,
    },
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png" }],
        other: [
            {
                rel: "mask-icon",
                url: "/android-chrome-512x512.png",
            },
        ],
    },
    manifest: "/manifest.json",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: "your-google-site-verification",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                suppressHydrationWarning
            >
                <Providers>
                    <ThemeProvider>
                        <div className="fixed top-4 right-4 z-50">
                            <ThemeToggle />
                        </div>
                        {children}
                        <Toaster />
                        <CookieConsent />
                        <Analytics />
                    </ThemeProvider>
                </Providers>
            </body>
        </html>
    );
}
