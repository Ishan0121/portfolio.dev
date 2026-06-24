"use client";

import { Navigation } from "./Navigation";
import Footer from "./Footer";
import { GridBackground } from "./GridBackground";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="transition-opacity duration-1000 opacity-100 relative z-10">
        <GridBackground />
        <Navigation />
        <main className="pt-24 min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
