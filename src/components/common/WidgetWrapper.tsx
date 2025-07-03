interface WidgetWrapperProps {
  id?: string;
  hasBackground?: boolean;
  containerClass?: string;
  children: React.ReactNode;
}

const WidgetWrapper = ({ id, hasBackground = false, containerClass, children }: WidgetWrapperProps) => {
  return (
    <section id={id} className={`py-16 lg:py-20 ${hasBackground ? 'bg-slate-50 dark:bg-slate-800' : ''}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
};

export default WidgetWrapper; 