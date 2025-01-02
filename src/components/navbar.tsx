"use client";
import { links } from "@/src/constants/navigations";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { RevealOnScroll } from "./reveal-on-scroll";

export const Navbar = () => {
  return (
    <>
      <nav className="fixed inset-x-0 p-5 backdrop-blur z-50 mb-52">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4 flex-row items-center">
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
          {/* TODO: change to home icon */}
          <Link href="/">
            <ArrowBackIcon
              sx={{ height: "24px", width: "24px" }}
              className="text-xl text-palette-primary hover:text-palette-secondary transition"
            />
          </Link>
        </div>
        {/* border bottom */}
        <RevealOnScroll>
          <div className="absolute bottom-0 inset-x-0 separator-border" />
        </RevealOnScroll>
      </nav>
    </>
  );
};
