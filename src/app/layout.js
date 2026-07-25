import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MOVIE HOMES – Premium Streaming 2026',
  description: 'Stream and download the latest movies, TV shows, and anime in HD quality. Free, fast, and beautiful.',
  keywords: 'movie streaming, download movies, watch TV shows online, free movies, HD streaming',
  authors: [{ name: 'MOVIE HOMES' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'MOVIE HOMES – Premium Streaming 2026',
    description: 'Stream and download the latest movies, TV shows, and anime in HD quality.',
    url: 'https://moviehomes.com',
    siteName: 'MOVIE HOMES',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://moviehomes.com/logo.png',
        width: 512,
        height: 512,
        alt: 'MOVIE HOMES',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOVIE HOMES – Premium Streaming 2026',
    description: 'Stream and download the latest movies, TV shows, and anime in HD quality.',
    images: ['https://moviehomes.com/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#7c3aed',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}