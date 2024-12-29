import { Separator } from "@/components/seperator";
import { Navbar } from "@/components/navbar";
import { Title } from "./title";
import { normalProjects, specialProjects } from "@/constants/projects";
import { ProjectCard } from "./projectCard";

const Projects = () => {
  return (
    <>
      <Navbar />
      <section className="mx-10 py-24">
        <div className="container">
          <Title
            title="پروژه ها"
            subtitle="مجموعه از پروژه های تمرینی و نمونه کار های مربوط به کارفرما."
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
