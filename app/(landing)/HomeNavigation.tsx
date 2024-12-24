import { links } from "@/constants/navigations";
import Link from "next/link";

const HomeNavigation = () => {
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

export default HomeNavigation;
