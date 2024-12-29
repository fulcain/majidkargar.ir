import { Card } from "@/components/card";
import { ContactMeType } from "@/constants/contactMe";
import { Exo_2 } from "next/font/google";
import Link from "next/link";

type ContactCardType = {
  item: ContactMeType;
};

const exo_2 = Exo_2({ subsets: ["latin"], weight: "700" });

const ContactCard = ({ item }: ContactCardType) => {
  return (
    <Card>
      <Link
        href={item.href}
        target="_blank"
        className=" p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48"
      >
        <div className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
          <div>{item.icon}</div>
        </div>
        <h3
          className={`${exo_2.className} lg:text-xl font-medium duration-150 xl:text-2xl text-zinc-200 group-hover:text-white font-display`}
        >
          {item.text}
        </h3>
        <span className="text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
          {item.name}
        </span>
        <span className="absolute -z-[1] w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"></span>
      </Link>
    </Card>
  );
};

export default ContactCard;
