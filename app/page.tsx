"use client";

import { useSession } from "next-auth/react";
import { LoginButton } from "@/components/auth/login-button";
import { PlaylistGrid } from "@/components/playlist/playlist-grid";
import { getUserPlaylists } from "@/lib/spotify";
import { useEffect, useState } from "react";
import type { SpotifyPlaylist } from "@/lib/spotify";

export default function Home() {
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlaylists() {
            if (session?.accessToken) {
                setLoading(true);
                setError(null);
                try {
                    const userPlaylists = await getUserPlaylists(
                        session.accessToken
                    );
                    setPlaylists(userPlaylists);
                } catch (err) {
                    setError("Failed to fetch playlists. Please try again.");
                    console.error("Error fetching playlists:", err);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchPlaylists();
    }, [session?.accessToken]);

    const handlePlaylistSelect = (playlist: SpotifyPlaylist) => {
        // We'll implement this in the next step
        console.log("Selected playlist:", playlist);
    };

    return (
        <main className="min-h-screen p-6 md:p-24">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col items-center text-center space-y-4">
                    <h1 className="text-4xl font-bold">
                        Spotify Playlist Shuffler
                    </h1>
                    <p className="text-muted-foreground max-w-[600px]">
                        Select a playlist to shuffle, and we'll create a new
                        shuffled version while keeping your original intact.
                    </p>
                    <LoginButton />
                </div>

                {session && (
                    <div className="mt-8">
                        {loading && (
                            <div className="text-center text-muted-foreground">
                                Loading your playlists...
                            </div>
                        )}
                        {error && (
                            <div className="text-center text-red-500">
                                {error}
                            </div>
                        )}
                        {!loading && !error && (
                            <PlaylistGrid
                                playlists={playlists}
                                onPlaylistSelect={handlePlaylistSelect}
                            />
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
