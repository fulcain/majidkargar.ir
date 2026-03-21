import { Navbar } from "@/src/components/navbar";
import { Separator } from "@/src/components/seperator";
import { projects } from "@/src/constants/projects";
import { Technologies } from "./technologies";
import { ProjectButtons } from "./project-buttons";
import { ProjectTitle } from "./project-title";
import { getTranslations } from "next-intl/server";

type ProjectProps = {
  params: Promise<{
    locale: string;
    project: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return projects.map((project) => ({ project: project.urlPath }));
}

export default async function Project({ params }: ProjectProps) {
  const { project: projectNameInPathname, locale } = await params;
  const t = await getTranslations("projects");

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
          <ProjectTitle
            projectName={projectName[locale as "en" | "fa"]}
            projectType={t(projectType as "work" | "personal")}
          />
          <Separator marginY="my-1" />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl mb-2">{t("description-text")}</h2>
            <p className="text-palette-primary">
              {description[locale as "en" | "fa"]}
            </p>
          </div>
          <Separator marginY="my-1" />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl mb-2">{t("tools")}</h2>
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
