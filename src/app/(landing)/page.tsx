"use client";

import { HomeNavigation } from "./home-navigation";
import localFont from "next/font/local";
import { Bounce, Zoom } from "react-awesome-reveal";
import { TypeAnimation } from "react-type-animation";

const gAseman = localFont({
  src: "../../style/fonts/g-aseman.ttf",
  display: "swap",
});

export default function Home() {
  return (
    <div className="h-[100vh] bg-gradient-to-br from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <div className="container">
        <section className="h-dvh flex items-center justify-center flex-col gap-8 md:gap-14">
          <div className="flex flex-row gap-2">
            <Bounce>
              <HomeNavigation />
            </Bounce>
          </div>
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
    </div>
  );
}
