interface HeadlineProps {
  header: {
    title?: string | React.ReactNode;
    subtitle?: string;
    tagline?: string;
  };
  containerClass?: string;
  titleClass?: string;
}

const Headline = ({ header, containerClass, titleClass }: HeadlineProps) => {
  const { title, subtitle, tagline } = header;

  return (
    <div className={`mb-16 ${containerClass}`}>
      {tagline && (
        <p className="text-base font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-200">
          {tagline}
        </p>
      )}
      {title && (
        <h2 className={`font-heading mb-4 font-bold tracking-tight ${titleClass}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Headline; 