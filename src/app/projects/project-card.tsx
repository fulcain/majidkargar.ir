import { Card } from "@/src/components/card";
import { ProjectType } from "@/src/constants/projects";
import Link from "next/link";
import { Exo_2 } from "next/font/google";

type ProjectCardType = {
  project: ProjectType;
};

const exo_2 = Exo_2({ subsets: ["latin"], weight: "700" });

export const ProjectCard = ({ project }: ProjectCardType) => {
  return (
    <Card>
      <Link
        href={project.projectLiveLink}
        className="flex flex-col relative w-full h-full p-4 md:p-8"
        target="_blank"
      >
        <span
          className={`${exo_2.className} mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display`}
        >
          {project.projectName}
        </span>
        <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
          {project.description}
        </p>
        {/* TODO: Add a condition to show for open sources */}
        {/* <Button */}
        {/*   className="mt-5 max-w-[max-content]" */}
        {/*   variant="outlined" */}
        {/*   href={project.projectRepoLink} */}
        {/* > */}
        {/*   مشاهده کد */}
        {/* </Button> */}
      </Link>
    </Card>
  );
};
