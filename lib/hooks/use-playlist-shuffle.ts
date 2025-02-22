"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
    getAllPlaylistTracks,
    findShuffledPlaylist,
    createPlaylist,
    replacePlaylistTracks,
    shuffleArray,
    type SpotifyPlaylist,
    type SpotifyTrack,
} from "@/lib/spotify";

interface UsePlaylistShuffleReturn {
    shufflePlaylist: (
        playlist: SpotifyPlaylist,
        tracks?: SpotifyTrack[]
    ) => Promise<void>;
    isShuffling: boolean;
    error: string | null;
}

export function usePlaylistShuffle(): UsePlaylistShuffleReturn {
    const { data: session } = useSession();
    const [isShuffling, setIsShuffling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const shufflePlaylist = async (
        playlist: SpotifyPlaylist,
        preShuffledTracks?: SpotifyTrack[]
    ) => {
        if (!session?.accessToken) {
            setError("Not authenticated");
            return;
        }

        setIsShuffling(true);
        setError(null);

        try {
            let trackUris: string[];

            if (preShuffledTracks) {
                // Use the pre-shuffled tracks if provided
                trackUris = preShuffledTracks.map((track) => track.uri);
            } else {
                // Otherwise, fetch and shuffle the tracks
                const tracks = await getAllPlaylistTracks(
                    session.accessToken,
                    playlist.id
                );
                const shuffledTracks = shuffleArray(tracks);
                trackUris = shuffledTracks.map((track) => track.uri);
            }

            // Find existing shuffled playlist or create a new one
            const shuffledName = `Shuffled ${playlist.name}`;
            let shuffledPlaylist = await findShuffledPlaylist(
                session.accessToken,
                playlist
            );

            if (!shuffledPlaylist) {
                shuffledPlaylist = await createPlaylist(
                    session.accessToken,
                    playlist.owner.id,
                    shuffledName,
                    `Shuffled version of ${playlist.name}`
                );
            }

            // Replace all tracks in the shuffled playlist
            await replacePlaylistTracks(
                session.accessToken,
                shuffledPlaylist.id,
                trackUris
            );
        } catch (err) {
            console.error("Error shuffling playlist:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to shuffle playlist"
            );
        } finally {
            setIsShuffling(false);
        }
    };

    return {
        shufflePlaylist,
        isShuffling,
        error,
    };
}
