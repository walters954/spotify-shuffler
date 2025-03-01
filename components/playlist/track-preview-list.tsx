"use client";

import { Shuffle } from "lucide-react";
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
    const previewTracks = tracks.slice(0, 15);
    const remainingCount = tracks.length - 15;

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold">
                    Preview Shuffled Order
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onShuffle}
                    disabled={isLoading}
                    aria-label="Shuffle tracks again"
                    className="w-full sm:w-auto"
                >
                    <Shuffle className="h-4 w-4 mr-2" aria-hidden="true" />
                    Shuffle Again
                </Button>
            </div>
            <div
                className="max-h-[300px] overflow-y-auto space-y-2 pr-2 -mr-2"
                role="list"
                aria-label="Preview of shuffled tracks"
            >
                {previewTracks.map((track, index) => (
                    <div
                        key={`${track.uri}-${index}`}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-accent active:bg-accent/80 touch-manipulation"
                        role="listitem"
                    >
                        <div
                            className="flex-shrink-0 w-6 sm:w-8 text-muted-foreground text-sm"
                            aria-hidden="true"
                        >
                            {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-sm sm:text-base">
                                {track.name}
                                <span className="sr-only">
                                    , Track {index + 1} of{" "}
                                    {previewTracks.length}
                                </span>
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                {track.artists.map((a) => a.name).join(", ")}
                            </p>
                        </div>
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div
                        className="text-xs sm:text-sm text-muted-foreground text-center pt-2 border-t"
                        aria-label={`${remainingCount} more tracks not shown in preview`}
                    >
                        And {remainingCount} more tracks...
                    </div>
                )}
            </div>
        </div>
    );
}
