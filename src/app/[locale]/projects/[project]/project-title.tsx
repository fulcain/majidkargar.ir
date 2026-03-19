type ProjectTitleProps = {
  projectName: string;
  projectType: "work" | "personal";
};

export const ProjectTitle = ({
  projectType,
  projectName,
}: ProjectTitleProps) => {
  const typeOfTheProject = projectType === "work" ? "پروژه کاری" : "پروژه شخصی";

  return (
    <div className="flex flex-col md:flex-row gap-x-5 gap-y-2 items-start md:items-center justify-center md:justify-start">
      <h2 className={"text-3xl md:text-5xl"}>{projectName}</h2>
      <div className="min-w-[70px] mt-[10px] flex items-center justify-center py-1 px-2 text-palette-secondary rounded border border-zinc-800">
        {typeOfTheProject}
      </div>
    </div>
  );
};
