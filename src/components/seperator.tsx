type SeparatorProps = {
  className?: string;
  marginY?: string;
};

export const Separator = ({ className, marginY = "my-12" }: SeparatorProps) => {
  return <div className={`separator-border ${marginY} ${className}`}></div>;
};
