"use client";

import { useEffect } from "react";
import fireflyParticles from "./FireflyParticles";
import HomeNavigation from "./HomeNavigation";
import localFont from "next/font/local";

const gAseman = localFont({
  src: "../../style/fonts/g-aseman.ttf",
  display: "swap",
});

export default function Home() {
  useEffect(() => {
    // fireflyParticles();
  }, []);

  return (
    <div className="container">
      <section className="h-dvh flex items-center justify-center flex-col gap-8 md:gap-14">
        <HomeNavigation />
        <h1 className={`${gAseman.className} text-[80px] md:text-[100px]`}>
          مجید کارگر
        </h1>
        <div className="flex flex-row gap-1 text-palette-primary">
          <span>برنامه نویس فرانت اند از پاییز</span>
          <span className="underline">۱۴۰۲</span>
        </div>
      </section>
    </div>
  );
}
