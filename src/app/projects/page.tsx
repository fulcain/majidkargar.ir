import { Separator } from "@/src/components/seperator";
import { Navbar } from "@/src/components/navbar";
import { Title } from "./title";
import { ProjectCard } from "./project-card";
import { projects } from "@/src/constants/projects";

const Projects = () => {
  const normalProjects = projects.filter((project) => !project.isSpecial);
  const specialProjects = projects.filter((project) => project.isSpecial);

  return (
    <>
      <Navbar />
      <section className="mx-10 py-24">
        <div className="container">
          <Title
            title="پروژه ها"
            subtitle="مجموعه از پروژه های تمرینی و نمونه کار ها."
          />
          <Separator />
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            {specialProjects.map((project, idx) => (
              <ProjectCard project={project} key={idx} />
            ))}
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            {normalProjects.map((project, idx) => (
              <ProjectCard project={project} key={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
