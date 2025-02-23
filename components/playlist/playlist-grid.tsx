"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify";
import { Input } from "@/components/ui/input";
import { PlaylistCard } from "./playlist-card";

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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search playlists..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
