"use client";

import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <FileQuestion
                            className="h-24 w-24 text-muted-foreground"
                            aria-hidden="true"
                        />
                    </div>
                    <h1 className="text-4xl font-bold">Page Not Found</h1>
                    <p className="text-muted-foreground">
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for. It might have been moved or deleted.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/">Return Home</Link>
                </Button>
            </div>
        </main>
    );
}
