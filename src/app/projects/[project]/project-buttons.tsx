import Link from "next/link";

type ProjectButtonsProps = {
  hasLiveLink: boolean;
  isPrivate: boolean;
  projectLiveLink: string;
  projectRepoLink: string;
};

export const ProjectButtons = ({
  hasLiveLink,
  isPrivate,
  projectLiveLink,
  projectRepoLink,
}: ProjectButtonsProps) => {
  return (
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
  );
};
