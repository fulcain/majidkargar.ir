import { Card } from "@/src/components/card";
import { ProjectType } from "@/src/constants/projects";
import Link from "next/link";

type ProjectCardType = {
  project: ProjectType;
};

export const ProjectCard = ({ project }: ProjectCardType) => {
  const { projectName, description, urlPath } = project;

  return (
    <Card>
      <Link
        href={`/projects/${urlPath}`}
        className="flex flex-col relative w-full h-full p-4 md:p-8"
      >
        <span
          className={"mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"}
        >
          {projectName}
        </span>
        <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
          {description}
        </p>
      </Link>
    </Card>
  );
};
