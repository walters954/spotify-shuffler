"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify";
import { Input } from "@/components/ui/input";
import { PlaylistCard } from "./playlist-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface PlaylistGridProps {
    playlists: SpotifyPlaylist[];
    onPlaylistSelect: (playlist: SpotifyPlaylist) => void;
}

type SortOption = "name-asc" | "name-desc" | "tracks-asc" | "tracks-desc";

export function PlaylistGrid({
    playlists,
    onPlaylistSelect,
}: PlaylistGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("name-asc");

    const sortedAndFilteredPlaylists = playlists
        .filter((playlist) =>
            playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                case "tracks-asc":
                    return a.tracks.total - b.tracks.total;
                case "tracks-desc":
                    return b.tracks.total - a.tracks.total;
                default:
                    return 0;
            }
        });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search playlists..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <Select
                    value={sortBy}
                    onValueChange={(value: string) =>
                        setSortBy(value as SortOption)
                    }
                >
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        <SelectItem value="tracks-asc">
                            Tracks (Low to High)
                        </SelectItem>
                        <SelectItem value="tracks-desc">
                            Tracks (High to Low)
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedAndFilteredPlaylists.map((playlist) => (
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
