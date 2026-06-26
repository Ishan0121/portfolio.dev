import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from '@/components/layout/AppLayout';
import { Toaster } from "sonner";
import { SmoothScrolling } from '@/components/layout/SmoothScrolling';
import { ThemeProvider } from '@/components/core/ThemeProvider';
import { SystemMonitor } from '@/components/core/SystemMonitor';

const nerdFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-nerd",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://chakra-the-portfolio.vercel.app'), // Placeholder domain, ideally from env
  title: {
    template: "%s | Specter's Portfolio",
    default: "Identity Website | Specter",
  },
  description: "A digital universe showcasing my work and experience.",
  openGraph: {
    title: "Identity Website | Specter",
    description: "A digital universe showcasing my work and experience.",
    url: "/",
    siteName: "Specter's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Identity Website | Specter",
    description: "A digital universe showcasing my work and experience.",
  },
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
