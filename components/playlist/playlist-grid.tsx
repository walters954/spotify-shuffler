"use client";

import { useCallback, useState } from "react";
import { Music, Search } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 20;

interface PlaylistGridProps {
    playlists: SpotifyPlaylist[];
    onPlaylistSelect: (playlist: SpotifyPlaylist) => void;
}

export function PlaylistGrid({
    playlists,
    onPlaylistSelect,
}: PlaylistGridProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

    // Filter playlists based on search query
    const filteredPlaylists = playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const { ref: loadMoreRef } = useInView({
        threshold: 0.5,
        onChange: (inView: boolean) => {
            if (inView && displayCount < filteredPlaylists.length) {
                setDisplayCount((prev) =>
                    Math.min(prev + ITEMS_PER_PAGE, filteredPlaylists.length)
                );
            }
        },
    });

    // Reset display count when search query changes
    useCallback(() => {
        setDisplayCount(ITEMS_PER_PAGE);
    }, []);

    const displayedPlaylists = filteredPlaylists.slice(0, displayCount);

    return (
        <div className="space-y-6 w-full">
            <div className="relative max-w-xl mx-auto w-full">
                <Search
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                />
                <Input
                    placeholder="Search playlists..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    aria-label="Search playlists"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedPlaylists.map((playlist) => (
                    <button
                        key={playlist.id}
                        onClick={() => onPlaylistSelect(playlist)}
                        className="group relative flex flex-col items-center bg-card rounded-lg border p-4 hover:border-primary transition-colors"
                    >
                        <div className="w-full aspect-square rounded-md overflow-hidden bg-muted mb-4">
                            {playlist.images[0]?.url ? (
                                <Image
                                    src={playlist.images[0].url}
                                    alt={`Cover art for ${playlist.name}`}
                                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                                    width={300}
                                    height={300}
                                    loading="lazy"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Music
                                        className="h-12 w-12 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="w-full space-y-1 text-left">
                            <h3 className="font-semibold truncate">
                                {playlist.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                                {playlist.tracks.total} tracks
                            </p>
                        </div>
                    </button>
                ))}
                {displayCount < filteredPlaylists.length && (
                    <div
                        ref={loadMoreRef}
                        className="col-span-full h-20 flex items-center justify-center"
                    >
                        <div className="text-muted-foreground">
                            Loading more playlists...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
