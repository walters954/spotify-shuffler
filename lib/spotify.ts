import { signIn } from "next-auth/react";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

export interface SpotifyPlaylist {
    id: string;
    name: string;
    images: { url: string }[];
    tracks: {
        total: number;
        href: string;
    };
    owner: {
        display_name: string;
        id: string;
    };
}

export interface SpotifyTrack {
    uri: string;
    name: string;
    artists: { name: string }[];
}

export interface SpotifyPaginatedResponse<T> {
    items: T[];
    total: number;
    limit: number;
    offset: number;
    next: string | null;
    previous: string | null;
}

async function handleSpotifyError(response: Response) {
    if (response.status === 401) {
        // Token expired or invalid
        signIn("spotify", { callbackUrl: "/" });
        throw new Error("UNAUTHORIZED");
    }

    let errorMessage = `Failed to fetch data: ${response.statusText}`;
    try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message ?? errorMessage;
    } catch {
        // If we can't parse the error JSON, use the default message
    }
    throw new Error(errorMessage);
}

export async function getUserPlaylists(
    accessToken: string
): Promise<SpotifyPlaylist[]> {
    try {
        const response = await fetch(
            `${SPOTIFY_API_BASE}/me/playlists?limit=50`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            await handleSpotifyError(response);
        }

        const data: SpotifyPaginatedResponse<SpotifyPlaylist> =
            await response.json();

        // Filter out playlists that start with "Shuffled "
        return data.items.filter(
            (playlist) => !playlist.name.startsWith("Shuffled ")
        );
    } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
            return [];
        }
        console.error("Error fetching playlists:", error);
        throw error;
    }
}

export async function getAllPlaylistTracks(
    accessToken: string,
    playlistId: string
): Promise<SpotifyTrack[]> {
    const tracks: SpotifyTrack[] = [];
    let next:
        | string
        | null = `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`;

    while (next) {
        try {
            const response = await fetch(next, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                await handleSpotifyError(response);
            }

            const data: SpotifyPaginatedResponse<{ track: SpotifyTrack }> =
                await response.json();
            tracks.push(...data.items.map((item) => item.track));
            next = data.next;
        } catch (error) {
            if (error instanceof Error && error.message === "UNAUTHORIZED") {
                return [];
            }
            console.error("Error fetching playlist tracks:", error);
            throw error;
        }
    }

    return tracks;
}

export async function findShuffledPlaylist(
    accessToken: string,
    originalPlaylist: SpotifyPlaylist
): Promise<SpotifyPlaylist | null> {
    try {
        const shuffledName = `Shuffled ${originalPlaylist.name}`;
        const response = await fetch(`${SPOTIFY_API_BASE}/me/playlists`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            await handleSpotifyError(response);
        }

        const data: SpotifyPaginatedResponse<SpotifyPlaylist> =
            await response.json();
        return (
            data.items.find(
                (playlist) =>
                    playlist.name === shuffledName &&
                    playlist.owner.id === originalPlaylist.owner.id
            ) || null
        );
    } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
            return null;
        }
        console.error("Error finding shuffled playlist:", error);
        throw error;
    }
}

export async function createPlaylist(
    accessToken: string,
    userId: string,
    name: string,
    description: string
): Promise<SpotifyPlaylist> {
    try {
        const response = await fetch(
            `${SPOTIFY_API_BASE}/users/${userId}/playlists`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    description,
                    public: false,
                }),
            }
        );

        if (!response.ok) {
            await handleSpotifyError(response);
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
            throw new Error("Session expired. Please sign in again.");
        }
        console.error("Error creating playlist:", error);
        throw error;
    }
}

export async function replacePlaylistTracks(
    accessToken: string,
    playlistId: string,
    trackUris: string[]
): Promise<void> {
    try {
        // Spotify API has a limit of 100 tracks per request
        const chunkSize = 100;
        const chunks = [];

        for (let i = 0; i < trackUris.length; i += chunkSize) {
            chunks.push(trackUris.slice(i, i + chunkSize));
        }

        // Replace with first chunk
        const firstChunk = chunks.shift();
        if (!firstChunk) return;

        const replaceResponse = await fetch(
            `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ uris: firstChunk }),
            }
        );

        if (!replaceResponse.ok) {
            await handleSpotifyError(replaceResponse);
        }

        // Add remaining chunks
        for (const chunk of chunks) {
            const addResponse = await fetch(
                `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ uris: chunk }),
                }
            );

            if (!addResponse.ok) {
                await handleSpotifyError(addResponse);
            }
        }
    } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
            throw new Error("Session expired. Please sign in again.");
        }
        console.error("Error replacing playlist tracks:", error);
        throw error;
    }
}

// Fisher-Yates shuffle algorithm
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export async function deletePlaylist(
    accessToken: string,
    playlistId: string
): Promise<void> {
    try {
        const response = await fetch(
            `${SPOTIFY_API_BASE}/playlists/${playlistId}/followers`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            await handleSpotifyError(response);
        }
    } catch (error) {
        if (error instanceof Error && error.message === "UNAUTHORIZED") {
            throw new Error("Session expired. Please sign in again.");
        }
        console.error("Error deleting playlist:", error);
        throw error;
    }
}
