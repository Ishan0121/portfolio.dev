import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import { Toaster } from "sonner";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import { ThemeProvider } from "@/components/ThemeProvider";

const nerdFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-nerd",
  display: "swap",
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
            <AppLayout>{children}</AppLayout>
            <Toaster theme="dark" position="bottom-right" />
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
