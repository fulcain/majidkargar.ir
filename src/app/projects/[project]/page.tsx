import { Navbar } from "@/src/components/navbar";
import { Separator } from "@/src/components/seperator";
import { projects } from "@/src/constants/projects";
import { Technologies } from "./technologies";
import { ProjectButtons } from "./project-buttons";
import { ProjectTitle } from "./project-title";

type ProjectProps = {
  params: Promise<{
    project: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({ project: project.urlPath }));
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

  return (
    <>
      <Navbar />
      <section className="mx-10 py-24">
        <div className="container flex flex-col gap-10">
          <ProjectTitle projectName={projectName} projectType={projectType} />
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
