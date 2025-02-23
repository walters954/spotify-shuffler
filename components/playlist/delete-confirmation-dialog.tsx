"use client";

import { Loader2 } from "lucide-react";
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

interface DeleteConfirmationDialogProps {
    playlist: SpotifyPlaylist | null;
    isOpen: boolean;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export function DeleteConfirmationDialog({
    playlist,
    isOpen,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteConfirmationDialogProps) {
    if (!playlist) return null;

    const handleConfirm = async () => {
        try {
            await onConfirm();
            onClose();
        } catch {
            // Error handling is done in the parent component
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Shuffled Playlist</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the shuffled version of
                        &quot;{playlist.name}&quot;? This action cannot be
                        undone.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={isDeleting}
                        aria-busy={isDeleting}
                        className="w-full sm:w-auto"
                    >
                        {isDeleting && (
                            <Loader2
                                className="mr-2 h-4 w-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        {isDeleting ? "Deleting..." : "Delete Playlist"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
