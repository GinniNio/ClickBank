import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'react-hot-toast';
import Analytics from '@/components/analytics';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Digital Marketing Secrets - ClickBank Success Blueprint',
    template: '%s | Digital Marketing Secrets'
  },
  description: 'Discover proven ClickBank marketing strategies that generate $10K+ monthly income. Learn content marketing, viral marketing, and video marketing secrets from top earners.',
  keywords: [
    'ClickBank marketing',
    'affiliate marketing',
    'digital marketing',
    'content marketing',
    'viral marketing',
    'video marketing',
    'online income',
    'passive income',
    'marketing strategies',
    'clickbank success'
  ],
  authors: [{ name: 'Digital Marketing Experts' }],
  creator: 'Digital Marketing Platform',
  publisher: 'Digital Marketing Secrets',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://digitalmarketingsecrets.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://digitalmarketingsecrets.com',
    title: 'Digital Marketing Secrets - ClickBank Success Blueprint',
    description: 'Discover proven ClickBank marketing strategies that generate $10K+ monthly income.',
    siteName: 'Digital Marketing Secrets',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Marketing Secrets - ClickBank Success Blueprint',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Secrets - ClickBank Success Blueprint',
    description: 'Discover proven ClickBank marketing strategies that generate $10K+ monthly income.',
    images: ['/og-image.jpg'],
    creator: '@digitalmarketing',
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          defaultTheme="light"
          storageKey="ui-theme"
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
} 