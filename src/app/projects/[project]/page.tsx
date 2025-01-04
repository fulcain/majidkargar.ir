import { Navbar } from "@/src/components/navbar";
import { Separator } from "@/src/components/seperator";
import { exo_2 } from "@/src/constants/exo-font";
import { projects, projectsName } from "@/src/constants/projects";
import { Technologies } from "./technologies";
import { ProjectButtons } from "./project-buttons";

type ProjectProps = {
  params: Promise<{
    project: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return projectsName().map((project) => ({ project }));
}

export default async function Project({ params }: ProjectProps) {
  const projectNameInPathname = (await params).project;

  const currentProject = projects.filter(
    (project) => project.urlPath === projectNameInPathname,
  )[0];

  const {
    projectName,
    liveLink,
    technologies,
    repoLink,
    description,
    isPrivate,
    hasLiveLink,
    projectType,
  } = currentProject;

  const typeOfTheProject = projectType === "work" ? "کاری" : "شخصی";

  return (
    <>
      <Navbar />
      <section className="mx-10 py-24">
        <div className="container flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-center md:justify-start">
            <h2 className={`text-3xl md:text-5xl ${exo_2.className}`}>
              {projectName}
            </h2>
            <div className="max-h-[35px] min-w-[70px] flex items-center justify-center p-2 text-palette-secondary border border-zinc-800">
              {typeOfTheProject}
            </div>
          </div>
          <Separator marginY="my-1" />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl mb-2">توضیحات</h2>
            <p className="text-palette-primary">{description}</p>
          </div>
          <Separator marginY="my-1" />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl mb-2">ابزار های استفاده شده</h2>
            <Technologies technologies={technologies} />
          </div>
          <Separator marginY="my-1" />
          <ProjectButtons
            isPrivate={isPrivate}
            hasLiveLink={hasLiveLink}
            liveLink={liveLink || ""}
            repoLink={repoLink || ""}
          />
        </div>
      </section>
    </>
  );
}
