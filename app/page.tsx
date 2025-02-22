"use client";

import { useSession } from "next-auth/react";
import { LoginButton } from "@/components/auth/login-button";
import { PlaylistGrid } from "@/components/playlist/playlist-grid";
import { PlaylistSelectionDialog } from "@/components/playlist/playlist-selection-dialog";
import { getUserPlaylists } from "@/lib/spotify";
import { usePlaylistShuffle } from "@/lib/hooks/use-playlist-shuffle";
import { useEffect, useState } from "react";
import type { SpotifyPlaylist, SpotifyTrack } from "@/lib/spotify";
import { toast } from "sonner";
import { Shuffle, ListMusic, RefreshCw } from "lucide-react";

export default function Home() {
    const { data: session } = useSession();
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlaylist, setSelectedPlaylist] =
        useState<SpotifyPlaylist | null>(null);
    const { shufflePlaylist, error: shuffleError } = usePlaylistShuffle();

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
                } catch (error) {
                    setError("Failed to fetch playlists. Please try again.");
                    console.error("Error fetching playlists:", error);
                } finally {
                    setLoading(false);
                }
            }
        }

        fetchPlaylists();
    }, [session?.accessToken]);

    const handlePlaylistSelect = (playlist: SpotifyPlaylist) => {
        setSelectedPlaylist(playlist);
    };

    const handlePlaylistConfirm = async (
        playlist: SpotifyPlaylist,
        tracks: SpotifyTrack[]
    ) => {
        try {
            await shufflePlaylist(playlist, tracks);
            toast.success("Success!", {
                description: `Created shuffled version of "${playlist.name}"`,
            });
        } catch (error) {
            toast.error("Error", {
                description: shuffleError || "Failed to shuffle playlist",
            });
            console.error("Error shuffling playlist:", error);
        }
    };

    return (
        <main className="min-h-screen p-6 md:p-24">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Fix Spotify Shuffle Not Working
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-[600px]">
                        Create truly random shuffled playlists that actually
                        work, unlike Spotify&apos;s built-in shuffle.
                    </p>
                    <LoginButton />
                </div>

                {!session && (
                    <div className="space-y-16">
                        <section className="space-y-8">
                            <h2 className="text-3xl font-semibold text-center">
                                Why Use Our Spotify Playlist Shuffler?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card">
                                    <Shuffle className="h-12 w-12 text-primary" />
                                    <h3 className="text-xl font-semibold">
                                        True Random Shuffle
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Unlike Spotify&apos;s shuffle which
                                        tends to play the same songs, we use a
                                        true random algorithm for better
                                        variety.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card">
                                    <ListMusic className="h-12 w-12 text-primary" />
                                    <h3 className="text-xl font-semibold">
                                        Keep Original Playlists
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Creates a new shuffled playlist while
                                        keeping your original playlist intact
                                        and organized.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg border bg-card">
                                    <RefreshCw className="h-12 w-12 text-primary" />
                                    <h3 className="text-xl font-semibold">
                                        Reshuffle Anytime
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Preview and reshuffle until you&apos;re
                                        happy with the order before saving to
                                        Spotify.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-3xl font-semibold text-center">
                                How It Works
                            </h2>
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">
                                        1. Login with Spotify
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Securely connect your Spotify account
                                        with one click. We don&apos;t store any
                                        of your data.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">
                                        2. Select a Playlist
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Choose any of your playlists that needs
                                        a better shuffle.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">
                                        3. Preview & Shuffle
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Preview the shuffled order and reshuffle
                                        as many times as you want until
                                        it&apos;s perfect.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">
                                        4. Save to Spotify
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Create a new shuffled playlist or update
                                        an existing one with your perfect
                                        shuffle.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-8">
                            <h2 className="text-3xl font-semibold text-center">
                                Common Questions
                            </h2>
                            <div className="space-y-6 max-w-2xl mx-auto">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">
                                        Why isn&apos;t Spotify shuffle random?
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Spotify&apos;s shuffle algorithm uses
                                        &quot;weighted randomness&quot; which
                                        can make some songs play more often than
                                        others. Our shuffler uses true
                                        randomization for better variety.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">
                                        How to fix Spotify shuffle not working?
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Instead of clearing cache or
                                        reinstalling Spotify, use our shuffler
                                        to create a truly randomized version of
                                        your playlist that actually works.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

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

            <PlaylistSelectionDialog
                playlist={selectedPlaylist}
                isOpen={selectedPlaylist !== null}
                onClose={() => setSelectedPlaylist(null)}
                onConfirm={handlePlaylistConfirm}
            />
        </main>
    );
}
