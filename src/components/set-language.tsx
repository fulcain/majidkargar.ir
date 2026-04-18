"use client";

import { GTranslate } from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
	import { routing } from "@/src/i18n/routing";

const SetLanguage = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const setAppLanguage = (language: "fa" | "en") => {
    const segments = pathname.split("/");
    segments[1] = language;
    router.push(segments.join("/"));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <GTranslate sx={{ height: "18px", width: "18px" }} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border border-zinc-700 bg-zinc-900 shadow-lg z-50">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => setAppLanguage(locale as "fa" | "en")}
              disabled={locale === currentLocale}
              className="block w-full px-4 py-2 text-sm text-left text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-colors first:rounded-t-md last:rounded-b-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {locale === "fa" ? "Persian" : "English"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SetLanguage;
