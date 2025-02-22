"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-red-600">
                    Authentication Error
                </h1>
                <p className="mt-2 text-gray-600">
                    {error === "Configuration" &&
                        "There is a problem with the server configuration."}
                    {error === "AccessDenied" &&
                        "You denied access to your Spotify account."}
                    {error === "InvalidClient" &&
                        "Invalid client credentials. Please check the Spotify app configuration."}
                    {!error &&
                        "An unknown error occurred during authentication."}
                </p>
                <p className="mt-4 text-sm text-gray-500">
                    Error code: {error || "unknown"}
                </p>
            </div>
            <div className="mt-6 flex justify-center">
                <Link href="/">
                    <Button>Return Home</Button>
                </Link>
            </div>
        </div>
    );
}

export default function AuthError() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <Suspense
                fallback={
                    <div className="text-center text-muted-foreground">
                        Loading...
                    </div>
                }
            >
                <ErrorContent />
            </Suspense>
        </div>
    );
}
