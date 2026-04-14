import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./customComponents/Header";
import { Footer } from "./customComponents/Footer";
import { CartProvider } from "./context/CartContext";
import Script from 'next/script'
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL("https://afro-live-fest.vercel.app"),

  title:
    "Afrolive — Discover Live Music, Concerts & Events in Nigeria",
  description:
    "Discover and book tickets for the best concerts, festivals and live music events across Nigeria. Experience Afrobeats, culture, and live entertainment like never before.",

  keywords: [
    "Afrolive",
    "Live Events Nigeria",
    "Concert Tickets Nigeria",
    "Afrobeats Events",
    "Music Festivals Nigeria",
    "Event Booking Platform",
    "Lagos Concerts",
    "Live Music Africa",
    "Entertainment Platform Nigeria",
  ],

  authors: [{ name: "Afrolive Team" }],
  creator: "Afrolive",
  publisher: "Afrolive",
  category: "Entertainment",

  openGraph: {
    title:
      "Afrolive — Discover Live Music, Concerts & Events in Nigeria",
    description:
      "Book tickets to the hottest concerts, festivals, and live events across Nigeria. Your gateway to unforgettable live experiences.",
    url: "https://afro-live-fest.vercel.app",
    siteName: "Afrolive",
    images: [
      {
        url: "https://afro-live-fest.vercel.app/thumb-img.png",
        width: 1200,
        height: 630,
        alt: "Afrolive — Live Events & Concerts Platform",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Afrolive — Discover Live Music & Events in Nigeria",
    description:
      "Find and book tickets to the best concerts, festivals, and live experiences across Nigeria.",
    images: [
      "https://afro-live-fest.vercel.app/thumb-img.png",
    ],
    // creator: "@afrolive", 
  },

  alternates: {
    canonical: "https://afro-live-fest.vercel.app",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="beforeInteractive"
        />

        <CartProvider>
          <Header />

          {children}

          <Footer />
        </CartProvider>

        <Analytics />
      </body>
    </html>
  );
}