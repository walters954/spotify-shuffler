"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
    deletePlaylist,
    findShuffledPlaylist,
    type SpotifyPlaylist,
} from "@/lib/spotify";

interface UsePlaylistDeleteReturn {
    deleteShuffledPlaylist: (playlist: SpotifyPlaylist) => Promise<void>;
    isDeleting: boolean;
    error: string | null;
}

export function usePlaylistDelete(): UsePlaylistDeleteReturn {
    const { data: session } = useSession();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteShuffledPlaylist = async (playlist: SpotifyPlaylist) => {
        if (!session?.accessToken) {
            setError("Not authenticated");
            return;
        }

        setIsDeleting(true);
        setError(null);

        try {
            // Find the shuffled version of the playlist
            const shuffledPlaylist = await findShuffledPlaylist(
                session.accessToken,
                playlist
            );

            if (!shuffledPlaylist) {
                throw new Error("No shuffled playlist found");
            }

            // Delete the shuffled playlist
            await deletePlaylist(session.accessToken, shuffledPlaylist.id);
        } catch (err) {
            console.error("Error deleting playlist:", err);
            setError(
                err instanceof Error ? err.message : "Failed to delete playlist"
            );
            throw err;
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        deleteShuffledPlaylist,
        isDeleting,
        error,
    };
}
