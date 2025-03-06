import Link from "next/link";
import { Github, Linkedin, Music } from "lucide-react";
import { SITE_NAME, siteConfig } from "@/lib/constants";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t bg-background py-8 md:py-12">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col items-center gap-4 md:items-start">
                    <div className="flex items-center gap-2 text-foreground">
                        <Music className="h-5 w-5" />
                        <span className="font-medium">{SITE_NAME}</span>
                    </div>
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                        Fix Spotify shuffle with true randomization. Create
                        better playlists.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4 md:items-end">
                    <div className="flex items-center gap-4">
                        <Link
                            href={siteConfig.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/walters954"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        © {currentYear} {SITE_NAME}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
