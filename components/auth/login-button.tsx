"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export function LoginButton() {
    const { data: session } = useSession();

    if (session) {
        return (
            <Button variant="outline" onClick={() => signOut()}>
                Sign Out
            </Button>
        );
    }

    return (
        <Button onClick={() => signIn("spotify")}>Sign in with Spotify</Button>
    );
}
