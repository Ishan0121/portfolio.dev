"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4">
      <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4 border border-destructive/20 shadow-lg">
        <Icon icon="lucide:alert-triangle" className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">Something went wrong!</h2>
      <p className="text-muted-foreground max-w-md text-balance">
        An unexpected error has occurred. We apologize for the inconvenience. 
        Please try again or return home.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button onClick={() => reset()} size="lg" variant="default" className="gap-2">
          <Icon icon="lucide:refresh-cw" /> Try again
        </Button>
        <Link href="/">
          <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
            <Icon icon="lucide:home" /> Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
