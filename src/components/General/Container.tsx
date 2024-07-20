export const Container = (props: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const { children, className, style } = props;
  return (
    <div
      className={`max-w-6xl bg-gray w-full grow flex flex-col gap-6 pt-12 shrink-0 ${className} break-words md:pt-20`}
      style={style}
    >
      {children}
    </div>
  );
};
