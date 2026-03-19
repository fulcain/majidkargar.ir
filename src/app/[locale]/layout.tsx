import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import "../../style/devicons.min.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/src/i18n/routing";
import { notFound } from "next/navigation";

const mikhak = localFont({
  src: "../../style/fonts/Mikhak-VF.ttf",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFa = locale === "fa";

  return {
    title: isFa ? "مجید کارگر | برنامه نویس فرانت اند" : "Majid Kargar | Front End Developer",
    description: isFa ? "برنامه نویس فرانت اند" : "Front End Developer",
    openGraph: {
      title: isFa ? "مجید کارگر | برنامه نویس فرانت اند" : "Majid Kargar | Front End Developer",
      description: isFa ? "برنامه نویس فرانت اند" : "Front End Developer",
      url: "https://majidkargar.ir",
      siteName: isFa ? "مجید کارگر | برنامه نویس فرانت اند" : "Majid Kargar | Front End Developer",
      locale: isFa ? "fa-IR" : "en-US",
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
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isFa = locale === "fa";

  return (
    <html
      lang={isFa ? "fa-IR" : "en-US"}
      dir={isFa ? "rtl" : "ltr"}
      className={`${mikhak.className} ${roboto.variable}`}
    >
      <body className="bg-black">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
