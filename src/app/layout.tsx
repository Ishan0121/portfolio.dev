import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import { Toaster } from "sonner";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SystemMonitor } from "@/components/SystemMonitor";

const nerdFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-nerd",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Identity Website",
  description: "A digital universe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nerdFont.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SmoothScrolling>
            <SystemMonitor />
            <AppLayout>{children}</AppLayout>
            <Toaster 
              theme="dark" 
              position="bottom-right" 
              closeButton
              toastOptions={{
                className: "glass border-primary/20 shadow-2xl backdrop-blur-md rounded-xl"
              }}
            />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
