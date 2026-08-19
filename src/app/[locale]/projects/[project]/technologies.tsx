import { exo_2 } from "@/src/constants/exo-font";
import { TechnologiesType } from "@/src/constants/projects";
import { TechIcon } from "@/src/components/tech-icon";

type TechnologiesProps = {
  technologies: TechnologiesType;
};

export const Technologies = ({ technologies }: TechnologiesProps) => {
  return (
    <div className="flex flex-wrap flex-row gap-2">
      {technologies.map((tech, idx) => {
        const bgColor = tech.icon.color;

        return (
          <div
            key={idx}
            style={{ backgroundColor: bgColor }}
            className={`${exo_2.className} max-w-[max-content] h-[50px] rounded px-2 flex flex-row align-center justify-center gap-2`}
          >
            <span className="flex justify-center items-center text-xs md:text-sm text-white">
              {tech.name}
            </span>
            <TechIcon icon={tech.icon} name={tech.name} />
          </div>
        );
      })}
    </div>
  );
};
