import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title:
    "Shaurya SSB Stay | One-Night Dormitory Stay for SSB, Defence & Army Aspirants in Lalghati Bhopal",
  description:
    "Shaurya SSB Stay offers clean, safe, and budget-friendly dormitory and one-night accommodation for SSB students, defence and army aspirants. Located in Lalghati, Bhopal near SSB centers and Gufa Mandir, ideal for stress-free SSB interview and exam stays.",
  keywords: [
    "Shaurya SSB Stay",

    "SSB stay",
    "SSB stay for students",
    "SSB accommodation",
    "SSB interview stay",
    "SSB candidate stay",

    "SSB dormitory stay",
    "one night stay for SSB students",
    "one day stay for SSB candidates",
    "dormitory near SSB center",
    "budget dormitory for SSB students",

    "defence aspirant accommodation",
    "army aspirant stay near SSB",
    "army SSB interview stay",
    "hostel for defence interview candidates",
    "one night dormitory for army candidates",
    "budget stay for defence and army aspirants",

    "SSB stay in Bhopal",
    "SSB accommodation in Bhopal",
    "SSB stay in Lalghati",
    "one night stay in Lalghati Bhopal",
    "dormitory near SSB center Bhopal",
    "stay near SSB center Bhopal",
    "SSB stay near Gufa Mandir",
    "hostel near Gufa Mandir Bhopal",
    "student accommodation in Lalghati Bhopal",

    "SSB stay at 349",
    "SSB dormitory price 349",
    "cheap SSB stay in Bhopal",
    "low cost hostel for SSB students",
    "low cost hostel in Lalghati Bhopal",
    "budget hostel near SSB center",
    "low cost hotel near SSB center Bhopal",
    "cheap hotel for SSB interview candidates",
    "budget hotel alternative for SSB students",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
        <FaqJsonLd />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <Analytics />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
