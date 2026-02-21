import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shaurya SSB Stay | Affordable One-Night Stay for Students",
  description:
    "Clean, safe, and budget-friendly accommodation near exam centers and SSB centers. Specializing in comfortable one-night stays for students and defence aspirants.",
  keywords: [
    "Shaurya SSB Stay",
    "SSB stay for students",
    "one night stay near SSB centers",
    "cheap one night stay for students",
    "budget accommodation near exam center",
    "low cost hostel for interview candidates",
  ],
  icons: {
    icon: "/icon.png",
  },
};

import { Providers } from "@/components/Providers";

import JsonLd, { FaqJsonLd } from "@/components/shared/SEO";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        <FaqJsonLd />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
