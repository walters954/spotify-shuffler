import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Fix Spotify Shuffle Not Working | True Random Playlist Shuffler",
    description:
        "Tired of Spotify's shuffle not being random? Create truly randomized playlists with our Spotify Playlist Shuffler. Better than clearing cache or reinstalling Spotify.",
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
    openGraph: {
        title: "Fix Spotify Shuffle Not Working | True Random Playlist Shuffler",
        description:
            "Create truly random shuffled playlists that actually work, unlike Spotify's built-in shuffle. Better than clearing cache or reinstalling.",
        type: "website",
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
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="fixed top-4 right-4 z-50">
                        <ThemeToggle />
                    </div>
                    <Providers>{children}</Providers>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
