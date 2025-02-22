"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PlaylistCard } from "./playlist-card";
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
        <div className="space-y-6">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    placeholder="Search playlists..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredPlaylists.map((playlist) => (
                    <PlaylistCard
                        key={playlist.id}
                        playlist={playlist}
                        onClick={() => onPlaylistSelect(playlist)}
                    />
                ))}
            </div>
        </div>
    );
}
