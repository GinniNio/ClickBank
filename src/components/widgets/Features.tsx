import { FeaturesProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';

const Features = ({ header, items, id, hasBackground = false }: FeaturesProps) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
    {header && <Headline header={header} containerClass="max-w-3xl" titleClass="text-2xl sm:text-3xl" />}
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items &&
        items.map(({ title, description, icon: Icon, callToAction }, index) => (
          <div key={`item-feature-${index}`} className="relative">
            {Icon && (
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white dark:bg-primary-500">
                <Icon className="h-6 w-6" />
              </div>
            )}
            {title && (
              <h3 className="mb-3 text-xl font-bold leading-snug tracking-tight">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-muted mb-6 font-medium leading-relaxed">{description}</p>
            )}
            {callToAction && (
              <a
                className="btn btn-primary btn-sm"
                href={callToAction.href}
                target={callToAction.targetBlank ? '_blank' : undefined}
                rel={callToAction.targetBlank ? 'noopener' : undefined}
              >
                {callToAction.text}
              </a>
            )}
          </div>
        ))}
    </div>
  </WidgetWrapper>
);

export default Features; 