"use client";
import { links } from "@/constants/navigations";
import Link from "next/link";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import RevealOnScroll from "./RevealOnScroll";

const Navbar = () => {
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
          <Link href="/">
            <FaArrowLeft className="text-xl text-palette-primary hover:text-palette-secondary transition" />
          </Link>
        </div>
        {/* border bottom */}
        <RevealOnScroll>
          <div className="absolute bottom-0 inset-x-0 separator-border" />
        </RevealOnScroll>
      </nav>
      {/* extra space since the navbar is sticky to top */}
      <div className="pb-20" />
    </>
  );
};

export default Navbar;