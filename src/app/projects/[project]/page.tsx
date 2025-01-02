import { Navbar } from "@/src/components/navbar";
import { exo_2 } from "@/src/constants/exo-font";
import { projects, projectsName } from "@/src/constants/projects";
import Image from "next/image";
import Link from "next/link";

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
    (project) => project.projectPath === projectNameInPathname,
  )[0];

  const {
    projectName,
    projectLiveLink,
    technologies,
    projectRepoLink,
    description,
    isPrivate,
    hasLiveLink,
  } = currentProject;

  return (
    <>
      <Navbar />
      <section className="mx-10 py-24">
        <div className="container flex flex-col gap-10">
          <h2 className={`text-3xl md:text-5xl ${exo_2.className}`}>
            {projectName}
          </h2>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl mb-10">توضیحات</h2>
            <p className="text-palette-primary">{description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl mb-10">ابزار های استفاده شده</h2>
            <div className="flex flex-wrap flex-row gap-2">
              {technologies.map((tech, idx) => (
                // TODO: change style
                <div
                  key={idx}
                  className={`${exo_2.className} bg-palette-secondary border border-palette-primary max-w-[max-content] rounded p-2 flex flex-row align-center justify-between gap-2`}
                >
                  <span className="text-xs md:text-sm text-black">
                    {tech.name}
                  </span>
                  <Image
                    alt={tech.name}
                    src={tech.icon}
                    width={24}
                    height={24}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            {hasLiveLink && (
              <Link
                className="border border-palette-primary p-2 rounded hover:bg-gray-800 transition"
                target="_blank"
                href={projectLiveLink}
              >
                مشاهده پروژه
              </Link>
            )}

            {/* // TODO: dont show karfama related */}
            {!isPrivate && (
              <Link
                className="border border-palette-primary p-2 rounded hover:bg-gray-800 transition"
                href={projectRepoLink}
                target="_blank"
              >
                مشاهده کد
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
