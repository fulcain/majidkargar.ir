"use client";
import { links } from "@/src/constants/navigations";
import Link from "next/link";
import { Home, ArrowBack } from "@mui/icons-material";

import { RevealOnScroll } from "./reveal-on-scroll";

export const Navbar = () => {
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
                {link.text}
              </Link>
            ))}
          </div>
          <div className="cursor-pointer" onClick={() => window.history.back()}>
            <ArrowBack
              sx={{ height: "24px", width: "24px" }}
              className="text-xl text-palette-primary hover:text-palette-secondary transition"
            />
          </div>
        </div>
        {/* border bottom */}
        <RevealOnScroll>
          <div className="absolute bottom-0 inset-x-0 separator-border" />
        </RevealOnScroll>
      </nav>
    </>
  );
};
