import Navbar from "@/components/navbar/Navbar";
import Separator from "@/components/seperator/Seperator";
import Title from "./title";

const Projects = () => {
  return (
    <>
      <Navbar />
      <section className="mt-10">
        <div className="container">
          <Title
            title="پروژه ها"
            subtitle="مجموعه از پروژه های تمرینی و نمونه کار های مربوط به کارفرما."
          />
          <Separator />
        </div>
      </section>
    </>
  );
};

export default Projects;
