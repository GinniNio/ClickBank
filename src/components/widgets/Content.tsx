import Image from 'next/image';
import { ContentProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';

const Content = ({ header, content, items, image, isReversed, isAfterContent }: ContentProps) => {
  return (
    <WidgetWrapper id="contentOne" hasBackground={false} containerClass="">
      {header && <Headline header={header} containerClass="max-w-4xl" titleClass="text-2xl sm:text-3xl" />}
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-8 lg:grid-cols-2 ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
          <div className={`${isReversed ? 'lg:col-start-2' : ''} space-y-8`}>
            {content && <p className="text-lg text-gray-600 dark:text-slate-400">{content}</p>}
            {items && (
              <div className="space-y-6">
                {items.map(({ title, description }, index) => (
                  <div key={`item-content-${index}`} className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white dark:bg-primary-500">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      {title && (
                        <h3 className="text-lg font-semibold leading-snug tracking-tight">
                          {title}
                        </h3>
                      )}
                      {description && (
                        <p className="mt-2 text-gray-600 dark:text-slate-400">{description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {image && (
            <div className={`${isReversed ? 'lg:col-start-1' : ''} relative m-auto flex items-center justify-center lg:max-w-none`}>
              <Image
                className="mx-auto h-auto w-full rounded-lg bg-gray-400 dark:bg-slate-700"
                src={image.src || ''}
                alt={image.alt || ''}
                width={540}
                height={405}
                sizes="(max-width: 64rem) 100vw, 540px"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default Content; 