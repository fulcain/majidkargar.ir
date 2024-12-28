"use client";

import { useEffect } from "react";
import fireflyParticles from "./FireflyParticles";
import HomeNavigation from "./HomeNavigation";
import localFont from "next/font/local";
import { JackInTheBox, Bounce, Zoom } from "react-awesome-reveal";
import { TypeAnimation } from "react-type-animation";

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
        <Bounce>
          <HomeNavigation />
        </Bounce>
        <Zoom>
          <h1 className={`${gAseman.className} text-[80px] md:text-[100px]`}>
            مجید کارگر
          </h1>
        </Zoom>
        <div className="flex flex-row gap-1 text-palette-primary">
          <TypeAnimation
            sequence={["برنامه نویس فرانت اند از پاییز ۱۴۰۲"]}
            wrapper="span"
            speed={50}
            cursor={false}
          />
        </div>
      </section>
    </div>
  );
}
