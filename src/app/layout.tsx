import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from '@/components/layout/AppLayout';
import { ToasterProvider } from '@/components/core/ToasterProvider';
import { SmoothScrolling } from '@/components/layout/SmoothScrolling';
import { ThemeProvider } from '@/components/core/ThemeProvider';
import { SystemMonitor } from '@/components/core/SystemMonitor';

const nerdFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-nerd",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://chakra-the-portfolio.vercel.app'),
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
    images: [{ url: '/preview.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Identity Website | Specter",
    description: "A digital universe showcasing my work and experience.",
    images: ['/preview.png'],
  },
  alternates: {
    canonical: '/',
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
            <ToasterProvider />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
