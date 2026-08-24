import type { Metadata, Viewport } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://idx.zone'),
  title: {
    default: 'IDX.ZONE — Simple, Fast, Free Tools',
    template: '%s | IDX.ZONE',
  },
  description:
    'Production-ready browser-based tools for images, PDF, text, code, SEO, and more. Fast, private, and free.',
  applicationName: 'IDX.ZONE',
  authors: [{ name: 'IDX.ZONE' }],
  icons: {
    icon: [
      { url: '/uploads/transparent-logo.png' },
    ],
    apple: [
      { url: '/uploads/transparent-logo.png' }
    ]
  },
  keywords: [
    'IDX.ZONE',
    'free online tools',
    'image compressor',
    'pdf tools',
    'developer utilities',
    'json formatter',
    'text counter',
    'seo tools',
    'client side tools',
    'privacy online tools',
  ],
  alternates: {
    canonical: 'https://idx.zone',
  },
  openGraph: {
    title: 'IDX.ZONE — Simple, Fast, Free Tools',
    description:
      'Production-ready browser-based tools for images, PDF, text, code, SEO, and more. Fast, private, and free.',
    url: 'https://idx.zone',
    siteName: 'IDX.ZONE',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/uploads/orginal-image.png',
        width: 1536,
        height: 1024,
        alt: 'IDX.ZONE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IDX.ZONE — Simple, Fast, Free Tools',
    description:
      'Production-ready browser-based tools for images, PDF, text, code, SEO, and more. Fast, private, and free.',
    images: ['/uploads/orginal-image.png'],
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col bg-white text-black antialiased selection:bg-black selection:text-white" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

