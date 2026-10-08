import type { Metadata, Viewport } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://azhar-portfolio.vercel.app'),
  title: 'Azhar — Product Designer & Creative Technologist',
  description: 'A sleek, modern portfolio engineered with Next.js, TypeScript, Framer Motion, and GSAP micro-animations. Fully customizable and responsive.',
  keywords: ['Product Designer', 'UI/UX Designer', 'Portfolio', 'Figma', 'Framer', 'Next.js', 'React', 'TypeScript'],
  authors: [{ name: 'Azhar' }],
  creator: 'Azhar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sawad.framer.website',
    title: 'Azhar — Software Engineer',
    description: 'A sleek and modern portfolio engineered for creative technologist and software engineers.',
    siteName: 'Azhar Portfolio',
    images: [
      {
        url: '/assets/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Azhar Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azhar — Software Engineer',
    description: 'A sleek and modern portfolio engineered with Next.js, Framer Motion, and GSAP.',
    images: ['/assets/og_image.png'],
  },
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#131211',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-[#131211] text-[#ffffff] min-h-screen selection:bg-[#1d6de3] selection:text-white">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
