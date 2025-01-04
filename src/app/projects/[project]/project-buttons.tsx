import Link from "next/link";

type ProjectButtonsProps = {
  hasLiveLink: boolean;
  isPrivate: boolean;
  liveLink: string;
  repoLink: string;
};

export const ProjectButtons = ({
  hasLiveLink,
  isPrivate,
  liveLink,
  repoLink,
}: ProjectButtonsProps) => {
  return (
    <div className="flex flex-row gap-2">
      {hasLiveLink && (
        <Link
          className="border border-palette-primary p-2 rounded hover:bg-gray-800 transition"
          target="_blank"
          href={liveLink}
        >
          مشاهده پروژه
        </Link>
      )}

      {!isPrivate && (
        <Link
          className="border border-palette-primary p-2 rounded hover:bg-gray-800 transition"
          href={repoLink}
          target="_blank"
        >
          مشاهده کد
        </Link>
      )}
    </div>
  );
};
