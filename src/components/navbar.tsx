"use client";
import { links } from "@/src/constants/navigations";
import Link from "next/link";
import { Home, ArrowBack, ArrowForward } from "@mui/icons-material";
import { useTranslations, useLocale } from "next-intl";

import { RevealOnScroll } from "./reveal-on-scroll";
import SetLanguage from "./set-language";

export const Navbar = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const isFa = locale === "fa";

  return (
    <>
      <nav className="fixed inset-x-0 p-5 backdrop-blur z-50 mb-52">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 flex-row items-center">
            <Link href="/">
              <Home
                sx={{ height: "24px", width: "24px" }}
                className="text-palette-primary"
              />
            </Link>
            {links.map((link, idx) => (
              <Link
                key={idx}
                className="text-xl text-palette-primary hover:text-palette-secondary transition"
                href={link.href}
              >
                {t(link.text)}
              </Link>
            ))}
            <SetLanguage />
          </div>
          <div className="cursor-pointer" onClick={() => window.history.back()}>
            {isFa ? (
              <ArrowForward
                sx={{ height: "24px", width: "24px" }}
                className="text-xl text-palette-primary hover:text-palette-secondary transition"
              />
            ) : (
              <ArrowBack
                sx={{ height: "24px", width: "24px" }}
                className="text-xl text-palette-primary hover:text-palette-secondary transition"
              />
            )}
          </div>
        </div>
        <RevealOnScroll>
          <div className="absolute bottom-0 inset-x-0 separator-border" />
        </RevealOnScroll>
      </nav>
    </>
  );
};
