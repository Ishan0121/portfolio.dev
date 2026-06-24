"use client";

import Navigation from "./Navigation";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="transition-opacity duration-1000 opacity-100">
        <Navigation />
        <main className="pt-24 min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
