"use client";

import * as React from "react";
import Image from "next/image";
import { Music } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

interface PlaylistCardProps {
    playlist: SpotifyPlaylist;
    onClick: () => void;
}

export function PlaylistCard({ playlist, onClick }: PlaylistCardProps) {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onClick();
        }
    };

    return (
        <Card
            className="hover:bg-accent active:scale-[0.98] transition-all cursor-pointer touch-manipulation"
            onClick={onClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Select ${playlist.name} playlist with ${playlist.tracks.total} tracks by ${playlist.owner.display_name}`}
        >
            <CardHeader className="p-4 sm:p-6">
                <div className="w-full aspect-square bg-muted rounded-md flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                    {playlist.images[0]?.url ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={playlist.images[0].url}
                                alt={`Cover art for ${playlist.name}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover rounded-md"
                                priority={false}
                            />
                        </div>
                    ) : (
                        <Music
                            className="h-12 w-12 text-muted-foreground"
                            aria-hidden="true"
                        />
                    )}
                </div>
                <CardTitle className="text-base sm:text-lg truncate">
                    {playlist.name}
                </CardTitle>
                <CardDescription className="text-sm truncate">
                    {playlist.tracks.total} tracks • By{" "}
                    {playlist.owner.display_name}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
