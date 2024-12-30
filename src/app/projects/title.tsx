type TitleProps = {
  title: string;
  subtitle: string;
};

export const Title = ({ title, subtitle }: TitleProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl text-palette-secondary">{title}</h2>
      <p className="text-xl text-palette-primary">{subtitle}</p>
    </div>
  );
};
