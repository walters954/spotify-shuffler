"use client";

import { useState, useEffect } from "react";
import { Music, Loader2 } from "lucide-react";
import type { SpotifyPlaylist, SpotifyTrack } from "@/lib/spotify";
import { getAllPlaylistTracks, shuffleArray } from "@/lib/spotify";
import { useSession } from "next-auth/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrackPreviewList } from "./track-preview-list";

interface PlaylistSelectionDialogProps {
    playlist: SpotifyPlaylist | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (
        playlist: SpotifyPlaylist,
        tracks: SpotifyTrack[]
    ) => Promise<void>;
}

export function PlaylistSelectionDialog({
    playlist,
    isOpen,
    onClose,
    onConfirm,
}: PlaylistSelectionDialogProps) {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [shuffledTracks, setShuffledTracks] = useState<SpotifyTrack[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchTracks() {
            if (!playlist || !session?.accessToken) return;

            setIsLoading(true);
            setError(null);
            try {
                const fetchedTracks = await getAllPlaylistTracks(
                    session.accessToken,
                    playlist.id
                );
                setShuffledTracks(shuffleArray(fetchedTracks));
            } catch (err) {
                setError("Failed to fetch tracks. Please try again.");
                console.error("Error fetching tracks:", err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTracks();
    }, [playlist, session?.accessToken]);

    const handleShuffle = () => {
        setShuffledTracks(shuffleArray([...shuffledTracks]));
    };

    const handleConfirm = async () => {
        if (!playlist) return;
        setIsLoading(true);
        try {
            await onConfirm(playlist, shuffledTracks);
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    if (!playlist) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader className="space-y-3">
                    <DialogTitle>Shuffle Playlist</DialogTitle>
                    <DialogDescription className="text-sm">
                        Preview and adjust the shuffled order before saving. A
                        new shuffled playlist will be created or updated with
                        the name &quot;Shuffled {playlist.name}&quot;.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-hidden space-y-6 py-4">
                    <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                            {playlist.images[0]?.url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={playlist.images[0].url}
                                    alt={playlist.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Music className="h-12 w-12 text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-semibold truncate">
                                {playlist.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                {playlist.tracks.total} tracks
                            </p>
                            <p className="text-sm text-muted-foreground">
                                By {playlist.owner.display_name}
                            </p>
                        </div>
                    </div>

                    {error ? (
                        <div className="text-red-500 text-center">{error}</div>
                    ) : isLoading && !shuffledTracks.length ? (
                        <div className="text-center text-muted-foreground">
                            Loading tracks...
                        </div>
                    ) : (
                        <div className="overflow-auto">
                            <TrackPreviewList
                                tracks={shuffledTracks}
                                onShuffle={handleShuffle}
                                isLoading={isLoading}
                            />
                        </div>
                    )}
                </div>

                <DialogFooter className="flex space-x-2 sm:space-x-0 border-t pt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading || !shuffledTracks.length}
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading ? "Saving..." : "Save to Spotify"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
