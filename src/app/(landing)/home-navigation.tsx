import { links } from "@/src/constants/navigations";
import Link from "next/link";

export const HomeNavigation = () => {
  return (
    <nav className="flex gap-2 flex-row items-center justify-center">
      {links.map((link, idx) => (
        <Link
          key={idx}
          className="text-palette-primary hover:text-palette-secondary transition "
          href={link.href}
        >
          {link.text}
        </Link>
      ))}
    </nav>
  );
};
