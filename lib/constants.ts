export const SITE_URL = "https://www.spotifyshufflesucks.com";
export const SITE_NAME = "Spotify Playlist Shuffler";
export const SITE_DESCRIPTION =
    "Create truly random shuffled playlists that actually work, unlike Spotify's built-in shuffle.";
export const TWITTER_HANDLE = "@spotifyshuffler";

export const siteConfig = {
    name: SITE_NAME,
    shortName: "Spotify Shuffler",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    ogImage: "/android-chrome-512x512.png",
    links: {
        github: "https://github.com/walters954/spotify-shuffler",
    },
} as const;
