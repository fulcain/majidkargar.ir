import { Code, GitHub, LaptopMac, Preview } from "@mui/icons-material";
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
          <div className="flex flex-row gap-2 items-center justify-center">
            <span>مشاهده پروژه</span>
            <LaptopMac />
          </div>
        </Link>
      )}

      {!isPrivate && (
        <Link
          className="border border-palette-primary p-2 rounded hover:bg-gray-800 transition"
          href={repoLink}
          target="_blank"
        >
          <div className="flex flex-row gap-2 items-center justify-center">
            <span> مشاهده کد</span>
            <Code />
          </div>
        </Link>
      )}
    </div>
  );
};
