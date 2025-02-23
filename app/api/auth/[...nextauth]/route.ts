import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "playlist-modify-private",
].join(" ");

const handler = NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: {
                url: "https://accounts.spotify.com/authorize",
                params: {
                    scope: scopes,
                },
            },
        }),
    ],
    pages: {
        signIn: "/", // Prevent automatic redirect to sign-in page
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
        csrfToken: {
            name: `next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account.expires_at! * 1000; // Convert to milliseconds
            }
            // Don't attempt to refresh token automatically
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
            session.expiresAt = token.expiresAt;
            return session;
        },
    },
    debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
