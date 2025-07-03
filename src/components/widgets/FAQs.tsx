'use client';

import { useState } from 'react';
import { FAQsProps } from '~/shared/types';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';
import { IconChevronDown } from '@tabler/icons-react';

const FAQs = ({ header, items, id, hasBackground = false }: FAQsProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
      {header && <Headline header={header} containerClass="max-w-4xl" titleClass="text-2xl sm:text-3xl" />}
      <div className="mx-auto max-w-4xl">
        {items &&
          items.map(({ title, description }, index) => (
            <div key={`item-faq-${index}`} className="mb-4 border-b border-gray-200 dark:border-slate-700">
              <button
                className="flex w-full items-center justify-between py-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold leading-snug tracking-tight">
                  {title}
                </h3>
                <IconChevronDown
                  className={`h-5 w-5 transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-6">
                  <p className="text-gray-600 dark:text-slate-400">{description}</p>
                </div>
              )}
            </div>
          ))}
      </div>
    </WidgetWrapper>
  );
};

export default FAQs; 