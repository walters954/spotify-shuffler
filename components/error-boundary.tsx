"use client";

import { useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface ErrorBoundaryProps {
    error: Error;
    onReset: () => void;
}

export function ErrorBoundary({ error, onReset }: ErrorBoundaryProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("API Error:", error);
    }, [error]);

    const errorMessage = getErrorMessage(error);

    return (
        <AlertDialog defaultOpen>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Error</AlertDialogTitle>
                    <AlertDialogDescription>
                        {errorMessage}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onReset}>
                        Try Again
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

// Helper function to get user-friendly error messages
function getErrorMessage(error: Error): string {
    if (error.message.includes("401")) {
        return "Your session has expired. Please sign in again.";
    }
    if (error.message.includes("403")) {
        return "You don't have permission to perform this action.";
    }
    if (error.message.includes("429")) {
        return "Too many requests. Please try again later.";
    }
    if (error.message.includes("500")) {
        return "Something went wrong on our end. Please try again later.";
    }
    if (
        error.message.includes("Network Error") ||
        error.message.includes("Failed to fetch")
    ) {
        return "Unable to connect to Spotify. Please check your internet connection.";
    }
    return "An unexpected error occurred. Please try again.";
}

// Helper function to show toast notifications for API errors
export function showErrorToast(error: Error) {
    const message = getErrorMessage(error);
    toast.error("Error", {
        description: message,
    });
}
