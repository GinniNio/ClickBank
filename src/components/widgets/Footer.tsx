import Link from 'next/link';
import { FooterProps } from '~/shared/types';
import Logo from '../atoms/Logo';

const Footer = () => {
  const footerData: FooterProps = {
    title: 'ClickBank Marketing Secrets',
    links: [
      {
        label: 'Terms & Conditions',
        href: '/terms',
      },
      {
        label: 'Privacy Policy',
        href: '/privacy',
      },
    ],
    columns: [
      {
        title: 'Product',
        links: [
          {
            label: 'Features',
            href: '#features',
          },
          {
            label: 'Pricing',
            href: '#pricing',
          },
          {
            label: 'Testimonials',
            href: '#testimonials',
          },
          {
            label: 'FAQs',
            href: '#faqs',
          },
        ],
      },
      {
        title: 'Support',
        links: [
          {
            label: 'Contact Us',
            href: '/contact',
          },
          {
            label: 'Help Center',
            href: '/help',
          },
          {
            label: 'Community',
            href: '/community',
          },
        ],
      },
      {
        title: 'Company',
        links: [
          {
            label: 'About Us',
            href: '/about',
          },
          {
            label: 'Blog',
            href: '/blog',
          },
          {
            label: 'Careers',
            href: '/careers',
          },
        ],
      },
    ],
    footNote: '© 2024 ClickBank Marketing Secrets. All rights reserved.',
  };

  const { title, links, columns, footNote } = footerData;

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-12 md:py-16">
          <div className="xl:grid xl:grid-cols-12 xl:gap-8">
            <div className="space-y-8 xl:col-span-4">
              <div className="flex items-center">
                <Logo />
              </div>
              <p className="text-base font-medium">
                Unlock your ClickBank success with proven strategies, tools, and techniques that actually work.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-8 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                {columns &&
                  columns.map(({ title: title2, links: links2 }, index) => (
                    <div key={`item-column-${index}`} className="space-y-8 md:col-span-1">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                        {title2}
                      </h3>
                      <ul className="space-y-4">
                        {links2 &&
                          links2.map(({ label, href }, index2) => (
                            <li key={`item-link-${index2}`}>
                              <Link
                                className="text-base font-medium leading-6 text-slate-300 hover:text-white"
                                href={href || '#'}
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8">
            <p className="text-base font-medium leading-6 text-slate-400 xl:text-center">{footNote}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 