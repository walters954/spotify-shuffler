"use client";

import { Music, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SpotifyTrack } from "@/lib/spotify";

interface TrackPreviewListProps {
    tracks: SpotifyTrack[];
    onShuffle: () => void;
    isLoading?: boolean;
}

export function TrackPreviewList({
    tracks,
    onShuffle,
    isLoading,
}: TrackPreviewListProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                    Preview Shuffled Order
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onShuffle}
                    disabled={isLoading}
                >
                    <Shuffle className="h-4 w-4 mr-2" />
                    Shuffle Again
                </Button>
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                {tracks.map((track, index) => (
                    <div
                        key={`${track.uri}-${index}`}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-accent"
                    >
                        <div className="flex-shrink-0 w-8 text-muted-foreground text-sm">
                            {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium">{track.name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                                {track.artists.map((a) => a.name).join(", ")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
