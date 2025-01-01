import { Navbar } from "@/src/components/navbar";
import { projectsName } from "@/src/constants/projects";

type ProjectProps = {
  params: Promise<{
    project: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  console.log(projectsName);
  return projectsName().map((project) => ({ project }));
}

export default async function Project({ params }: ProjectProps) {
  const project = (await params).project;
  console.log(project);

  return (
    <>
      <Navbar />
      <section className="mx-10 py-24">
        <div className="container">
          <h2 className="text-3xl">توضیحات</h2>
          {/* <p>{project.description}</p> */}
        </div>
      </section>
    </>
  );
}
