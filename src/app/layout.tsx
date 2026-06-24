import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import AppLayout from "@/components/AppLayout";
import { CommandMenu } from "@/components/CommandMenu";
import { Toaster } from "sonner";
import { SmoothScrolling } from "@/components/SmoothScrolling";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
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
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${montserrat.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <SmoothScrolling>
          <AppLayout>{children}</AppLayout>
          <CommandMenu />
          <Toaster theme="dark" position="bottom-right" />
        </SmoothScrolling>
      </body>
    </html>
  );
}
