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

export const metadata: Metadata = {
  title: "Afrolive — Discover Live Music & Events",
  description:
    "Discover and book tickets for the best concerts, festivals and live music events across Nigeria.",

  openGraph: {
    title: "Afrolive — Discover Live Music & Events",
    description:
      "Discover and book tickets for the best concerts, festivals and live music events across Nigeria.",
    url: "https://afro-live-fest.vercel.app/",
    siteName: "Afrolive",
    images: [
      {
        url: "/afrolive-image.png",
        width: 1200,
        height: 630,
        alt: "Afrolive App Preview",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Afrolive — Discover Live Music & Events",
    description:
      "Discover and book tickets for the best concerts, festivals and live music events across Nigeria.",
    images: ["/afrolive-image.png"],
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