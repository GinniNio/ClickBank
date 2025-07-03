import Image from 'next/image';
import { TestimonialsProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';

const Testimonials = ({ header, testimonials, id, hasBackground = false }: TestimonialsProps) => {
  return (
    <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
      {header && <Headline header={header} containerClass="max-w-4xl" titleClass="text-2xl sm:text-3xl" />}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials &&
          testimonials.map(({ name, job, testimonial, image, href }, index) => (
            <div key={`item-testimonial-${index}`} className="card">
              {testimonial && (
                <div className="mb-6">
                  <p className="text-lg font-medium leading-relaxed text-gray-600 dark:text-slate-400">
                    "{testimonial}"
                  </p>
                </div>
              )}
              <div className="flex items-center">
                {image && (
                  <Image
                    src={image.src || ''}
                    alt={image.alt || ''}
                    width={48}
                    height={48}
                    className="mr-4 h-12 w-12 rounded-full"
                  />
                )}
                <div className="flex-1">
                  {name && (
                    <h3 className="text-lg font-semibold leading-snug tracking-tight">
                      {name}
                    </h3>
                  )}
                  {job && (
                    <p className="text-gray-600 dark:text-slate-400">{job}</p>
                  )}
                </div>
                {href && (
                  <a
                    href={href}
                    className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>
    </WidgetWrapper>
  );
};

export default Testimonials; 