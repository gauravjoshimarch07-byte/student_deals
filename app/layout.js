import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  metadataBase: new URL('https://studentdeals.in'),
  title: {
    default: 'StudentDeals — Best Budget Products for Students in India',
    template: '%s | StudentDeals',
  },
  description: 'Discover the best budget products for students in India. Top picks under ₹500, ₹1000, ₹2000 across tech, study essentials, and lifestyle.',
  keywords: ['budget products for students', 'best products under 1000', 'student deals India', 'cheap tech for students'],
  authors: [{ name: 'StudentDeals Team' }],
  creator: 'StudentDeals',

  // ✅ ADD THIS PART
  verification: {
    google: "pHhQekovvxCwJyPFTBg6wIV-OCrci1ddcHeiT7cqsFs",
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://studentdeals.in',
    siteName: 'StudentDeals',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'StudentDeals' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@studentdeals',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://studentdeals.in" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

