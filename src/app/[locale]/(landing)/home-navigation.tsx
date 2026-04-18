import { links } from "@/src/constants/navigations";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const HomeNavigation = () => {
  const t = useTranslations("nav");

  return (
    <nav className="flex gap-2 flex-row items-center justify-center">
      {links.map((link, idx) => (
        <Link
          key={idx}
          className="text-palette-primary hover:text-palette-secondary transition"
          href={link.href}
        >
          {t(link.text)}
        </Link>
      ))}
    </nav>
  );
};
