import Link from "next/link";
import { getTranslations } from "next-intl/server";

type ProjectButtonsProps = {
  hasLiveLink: boolean;
  isPrivate: boolean;
  liveLink: string;
  repoLink: string;
};

export async function ProjectButtons({
  hasLiveLink,
  isPrivate,
  liveLink,
  repoLink,
}: ProjectButtonsProps) {
  const t = await getTranslations("project");

  return (
    <div className="flex flex-row gap-2">
      {hasLiveLink && (
        <Link
          className="border border-palette-primary p-2 rounded hover:bg-gray-800 transition"
          target="_blank"
          href={liveLink}
        >
          {t("view-project")}
        </Link>
      )}

      {!isPrivate && (
        <Link
          className="border border-palette-primary p-2 rounded hover:bg-gray-800 transition"
          href={repoLink}
          target="_blank"
        >
          {t("view-code")}
        </Link>
      )}
    </div>
  );
}
