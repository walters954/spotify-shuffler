"use client";

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
    return (
        <Card
            className="hover:bg-accent cursor-pointer transition-colors"
            onClick={onClick}
        >
            <CardHeader>
                <div className="w-full aspect-square bg-muted rounded-md flex items-center justify-center mb-4">
                    {playlist.images[0]?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={playlist.images[0].url}
                            alt={playlist.name}
                            className="w-full h-full object-cover rounded-md"
                        />
                    ) : (
                        <Music className="h-12 w-12 text-muted-foreground" />
                    )}
                </div>
                <CardTitle className="truncate">{playlist.name}</CardTitle>
                <CardDescription>
                    {playlist.tracks.total} tracks • By{" "}
                    {playlist.owner.display_name}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}
