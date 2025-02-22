"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PlaylistCard } from "@/components/playlist/playlist-card";
import type { SpotifyPlaylist } from "@/lib/spotify";
import { Search } from "lucide-react";

interface PlaylistGridProps {
    playlists: SpotifyPlaylist[];
    onPlaylistSelect: (playlist: SpotifyPlaylist) => void;
}

export function PlaylistGrid({
    playlists,
    onPlaylistSelect,
}: PlaylistGridProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 w-full px-4 sm:px-0">
            <div className="relative max-w-xl mx-auto w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search playlists..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {filteredPlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            onClick={() => onPlaylistSelect(playlist)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
