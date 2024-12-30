import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css"
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Roboto } from "next/font/google";

const mikhak = localFont({
  src: "../style/fonts/Mikhak-VF.ttf",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "مجید کارگر | برنامه نویس فرانت اند",
  description: "برنامه نویس فرانت اند",
  openGraph: {
    title: "مجید کارگر | برنامه نویس فرانت اند",
    description: "برنامه نویس فرانت اند",
    url: "https://majidkargar.ir",
    siteName: "مجید کارگر | برنامه نویس فرانت اند",
    images: [
      // TODO: change this
      {
        url: "https://chronark.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "fa-IR",
    type: "website",
  },

  twitter: {
    title: "Majid Kargar",
    card: "summary_large_image",
  },

  icons: {
    shortcut: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa-IR"
      dir="rtl"
      className={` ${mikhak.className} ${roboto.variable}`}
    >
      <body className="bg-black">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
