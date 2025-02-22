"use client";

import { useCallback } from "react";
import { trackEvent } from "@/components/analytics";

export function useAnalytics() {
    const trackPlaylistShuffle = useCallback(
        (playlistName: string, trackCount: number) => {
            trackEvent(
                "shuffle_playlist",
                "Playlist",
                playlistName,
                trackCount
            );
        },
        []
    );

    const trackPlaylistPreview = useCallback((playlistName: string) => {
        trackEvent("preview_playlist", "Playlist", playlistName);
    }, []);

    const trackLogin = useCallback(() => {
        trackEvent("login", "Authentication", "Spotify Login");
    }, []);

    const trackLogout = useCallback(() => {
        trackEvent("logout", "Authentication", "Spotify Logout");
    }, []);

    const trackError = useCallback(
        (errorType: string, errorMessage: string) => {
            trackEvent("error", errorType, errorMessage);
        },
        []
    );

    return {
        trackPlaylistShuffle,
        trackPlaylistPreview,
        trackLogin,
        trackLogout,
        trackError,
    };
}
