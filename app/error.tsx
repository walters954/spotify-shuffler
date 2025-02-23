"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error);
    }, [error]);

    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <AlertCircle
                            className="h-24 w-24 text-destructive"
                            aria-hidden="true"
                        />
                    </div>
                    <h1 className="text-4xl font-bold">
                        Something went wrong!
                    </h1>
                    <p className="text-muted-foreground">
                        An unexpected error occurred. We&apos;ve been notified
                        and are working to fix the issue.
                    </p>
                    {process.env.NODE_ENV === "development" && (
                        <div className="text-left p-4 bg-muted rounded-lg overflow-auto">
                            <pre className="text-sm text-muted-foreground whitespace-pre-wrap break-words">
                                {error.message}
                            </pre>
                        </div>
                    )}
                </div>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => reset()}>Try again</Button>
                    <Button
                        variant="outline"
                        onClick={() => (window.location.href = "/")}
                    >
                        Return Home
                    </Button>
                </div>
            </div>
        </main>
    );
}
