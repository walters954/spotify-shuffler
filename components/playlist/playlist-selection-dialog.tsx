"use client";

import { useState, useEffect } from "react";
import { Music, Loader2, Trash2 } from "lucide-react";
import type { SpotifyPlaylist, SpotifyTrack } from "@/lib/spotify";
import {
    getAllPlaylistTracks,
    shuffleArray,
    findShuffledPlaylist,
} from "@/lib/spotify";
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
import { DeleteConfirmationDialog } from "./delete-confirmation-dialog";
import { usePlaylistDelete } from "@/lib/hooks/use-playlist-delete";
import { toast } from "sonner";

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
    const [hasShuffledVersion, setHasShuffledVersion] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { deleteShuffledPlaylist, isDeleting } = usePlaylistDelete();

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

                // Check if a shuffled version exists
                const shuffledPlaylist = await findShuffledPlaylist(
                    session.accessToken,
                    playlist
                );
                setHasShuffledVersion(!!shuffledPlaylist);
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
            setHasShuffledVersion(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!playlist) return;
        try {
            await deleteShuffledPlaylist(playlist);
            toast.success("Success!", {
                description: `Deleted shuffled version of "${playlist.name}"`,
            });
            setHasShuffledVersion(false);
            setShowDeleteDialog(false);
            onClose();
        } catch {
            toast.error("Error", {
                description: "Failed to delete playlist",
            });
        }
    };

    if (!playlist) return null;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Shuffle Playlist</DialogTitle>
                        <DialogDescription>
                            Preview and save the shuffled version of your
                            playlist.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-start gap-3 sm:gap-4">
                        <div
                            className="w-16 h-16 sm:w-24 sm:h-24 rounded-md overflow-hidden bg-muted flex items-center justify-center flex-shrink-0"
                            aria-hidden={!playlist.images[0]?.url}
                        >
                            {playlist.images[0]?.url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={playlist.images[0].url}
                                    alt={`Cover art for ${playlist.name}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <Music
                                    className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground"
                                    aria-hidden="true"
                                />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-base sm:text-lg font-semibold truncate">
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
                        <div className="text-sm text-red-500">{error}</div>
                    ) : (
                        <TrackPreviewList
                            tracks={shuffledTracks}
                            onShuffle={handleShuffle}
                            isLoading={isLoading}
                        />
                    )}

                    <DialogFooter className="flex flex-col sm:flex-row items-center gap-2 border-t pt-4">
                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto order-1 sm:order-none">
                            <Button
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading || isDeleting}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            {hasShuffledVersion && (
                                <Button
                                    variant="destructive"
                                    onClick={() => setShowDeleteDialog(true)}
                                    disabled={isLoading || isDeleting}
                                    className="w-full sm:w-auto"
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Shuffled Version
                                </Button>
                            )}
                        </div>
                        <Button
                            onClick={handleConfirm}
                            disabled={
                                isLoading ||
                                !shuffledTracks.length ||
                                isDeleting
                            }
                            aria-busy={isLoading}
                            className="w-full sm:w-auto order-0 sm:order-none"
                        >
                            {isLoading && (
                                <Loader2
                                    className="mr-2 h-4 w-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            {isLoading ? "Saving..." : "Save to Spotify"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <DeleteConfirmationDialog
                playlist={playlist}
                isOpen={showDeleteDialog}
                isDeleting={isDeleting}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
            />
        </>
    );
}
