"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <Button
                variant="outline"
                onClick={() => signOut()}
                aria-label="Sign out of your Spotify account"
            >
                Sign Out
            </Button>
        );
    }

    return (
        <Button
            onClick={() =>
                signIn("spotify", {
                    callbackUrl:
                        process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL ||
                        `${window.location.origin}`,
                })
            }
            aria-label="Sign in with your Spotify account"
        >
            Sign in with Spotify
        </Button>
    );
}
