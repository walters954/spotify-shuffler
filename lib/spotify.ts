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
            throw new Error(
                `Failed to fetch playlists: ${response.statusText}`
            );
        }

        const data: SpotifyPaginatedResponse<SpotifyPlaylist> =
            await response.json();
        return data.items;
    } catch (error) {
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
                throw new Error(
                    `Failed to fetch playlist tracks: ${response.statusText}`
                );
            }

            const data: SpotifyPaginatedResponse<{ track: SpotifyTrack }> =
                await response.json();
            tracks.push(...data.items.map((item) => item.track));
            next = data.next;
        } catch (error) {
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
    const shuffledName = `Shuffled ${originalPlaylist.name}`;
    const response = await fetch(`${SPOTIFY_API_BASE}/me/playlists`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch playlists");
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
}

export async function createPlaylist(
    accessToken: string,
    userId: string,
    name: string,
    description: string
): Promise<SpotifyPlaylist> {
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
        throw new Error("Failed to create playlist");
    }

    return response.json();
}

export async function replacePlaylistTracks(
    accessToken: string,
    playlistId: string,
    trackUris: string[]
): Promise<void> {
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
        throw new Error("Failed to replace playlist tracks");
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
            throw new Error("Failed to add tracks to playlist");
        }
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
