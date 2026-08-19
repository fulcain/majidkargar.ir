import Image from "next/image";

type TechIconProps = {
  icon: { className?: string; svgLink?: string; color?: string };
  name: string;
  size?: number;
};

export const TechIcon = ({ icon, name, size = 24 }: TechIconProps) => {
  const { className, svgLink } = icon;

  if (!className && !svgLink) return null;

  return (
    <span className="flex items-center justify-center rounded-full">
      {svgLink && <Image alt={name} src={svgLink} width={size} height={size} />}
      {className && (
        <i className={className} style={{ fontSize: size }}></i>
      )}
    </span>
  );
};
