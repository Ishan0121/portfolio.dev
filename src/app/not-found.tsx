import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4 relative overflow-hidden">
      {/* Background glow for aesthetics */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted/20 select-none">
        404
      </h1>
      <h2 className="text-3xl font-bold tracking-tight mt-[-2rem] z-10">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md text-balance z-10">
        The digital universe you are looking for does not exist or has been moved to another dimension.
      </p>
      <div className="mt-4 z-10">
        <Link href="/">
          <Button size="lg" variant="default" className="gap-2 shadow-lg shadow-primary/20">
            <Icon icon="lucide:rocket" /> Return to Base
          </Button>
        </Link>
      </div>
    </div>
  );
}
