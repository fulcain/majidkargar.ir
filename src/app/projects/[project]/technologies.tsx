import { exo_2 } from "@/src/constants/exo-font";
import { TechnologiesType } from "@/src/constants/projects";
import Image from "next/image";

type TechnologiesProps = {
  technologies: TechnologiesType;
};

export const Technologies = ({ technologies }: TechnologiesProps) => {
  return (
    <div className="flex flex-wrap flex-row gap-2">
      {technologies.map((tech, idx) => (
        // TODO: change style
        <div
          key={idx}
          className={`${exo_2.className} border border-zinc-800  max-w-[max-content] rounded p-2 flex flex-row align-center justify-center gap-2`}
        >
          <span className="flex justify-center items-center text-xs md:text-sm text-white">
            {tech.name}
          </span>
          <div className="rounded-full p-1.5">
            <Image alt={tech.name} src={tech.icon} width={24} height={24} />
          </div>
        </div>
      ))}
    </div>
  );
};
