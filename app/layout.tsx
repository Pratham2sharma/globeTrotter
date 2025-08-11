"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { useEffect } from "react";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}