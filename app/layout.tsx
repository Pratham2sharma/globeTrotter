"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type SmoothScroll from "smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    let scroll: SmoothScroll | undefined;
    import("smooth-scroll").then(({ default: SmoothScroll }) => {
      scroll = new SmoothScroll('a[href*="#"]', {
        speed: 600,
        speedAsDuration: true,
        easing: "easeInOutCubic",
        updateURL: false,
      });
    });
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A192F" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-teal-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>
        <main id="main-content" role="main">
          {children}
        </main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}