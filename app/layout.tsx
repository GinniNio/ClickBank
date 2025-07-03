import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from '~/components/atoms/Providers';
import '~/assets/styles/base.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'ClickBank Marketing Secrets - Unlock Your Digital Success',
    template: '%s | ClickBank Marketing Secrets',
  },
  description:
    'Discover proven ClickBank marketing strategies, tools, and techniques to boost your affiliate income. Join thousands of successful marketers today!',
  keywords: [
    'ClickBank',
    'affiliate marketing',
    'digital marketing',
    'online business',
    'passive income',
    'marketing strategies',
    'affiliate programs',
    'online marketing',
  ],
  authors: [
    {
      name: 'ClickBank Marketing Secrets',
    },
  ],
  creator: 'ClickBank Marketing Secrets',
  metadataBase: new URL('https://clickbankmarketingsecret.club'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://clickbankmarketingsecret.club',
    title: 'ClickBank Marketing Secrets - Unlock Your Digital Success',
    description:
      'Discover proven ClickBank marketing strategies, tools, and techniques to boost your affiliate income. Join thousands of successful marketers today!',
    siteName: 'ClickBank Marketing Secrets',
    images: [
      {
        url: '/images/product-cover.jpg',
        width: 1200,
        height: 630,
        alt: 'ClickBank Marketing Secrets',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClickBank Marketing Secrets - Unlock Your Digital Success',
    description:
      'Discover proven ClickBank marketing strategies, tools, and techniques to boost your affiliate income. Join thousands of successful marketers today!',
    images: ['/images/product-cover.jpg'],
    creator: '@clickbanksecrets',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="overflow-x-hidden bg-white font-default leading-relaxed text-slate-600 dark:bg-slate-900 dark:text-slate-400">
        <Providers>
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-tr from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
} 