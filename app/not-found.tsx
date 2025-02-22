"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Page Not Found</h1>
                    <p className="mt-2 text-muted-foreground">
                        The page you&apos;re looking for doesn&apos;t exist or
                        has been moved.
                    </p>
                </div>
                <div className="mt-6 flex justify-center">
                    <Link href="/">
                        <Button>Return Home</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
