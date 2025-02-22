"use client";

import { useState } from "react";
import { Music, Loader2 } from "lucide-react";
import type { SpotifyPlaylist } from "@/lib/spotify";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PlaylistSelectionDialogProps {
    playlist: SpotifyPlaylist | null;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (playlist: SpotifyPlaylist) => Promise<void>;
}

export function PlaylistSelectionDialog({
    playlist,
    isOpen,
    onClose,
    onConfirm,
}: PlaylistSelectionDialogProps) {
    const [isShuffling, setIsShuffling] = useState(false);

    if (!playlist) return null;

    const handleConfirm = async () => {
        try {
            setIsShuffling(true);
            await onConfirm(playlist);
        } finally {
            setIsShuffling(false);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Shuffle Playlist</DialogTitle>
                    <DialogDescription>
                        A new shuffled playlist will be created or updated with
                        the name "Shuffled {playlist.name}"
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-start space-x-4 pt-4">
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
                <DialogFooter className="flex space-x-2 sm:space-x-0">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} disabled={isShuffling}>
                        {isShuffling && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isShuffling ? "Shuffling..." : "Shuffle Playlist"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
