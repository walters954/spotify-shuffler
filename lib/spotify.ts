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
    };
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

export async function getPlaylistTracks(
    accessToken: string,
    playlistId: string
) {
    try {
        const response = await fetch(
            `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch playlist tracks: ${response.statusText}`
            );
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error fetching playlist tracks:", error);
        throw error;
    }
}
