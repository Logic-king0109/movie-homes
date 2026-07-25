// src/app/games/page.js
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: 'Games – MOVIE HOMES',
  description: 'Play games on MOVIE HOMES.',
}

export default function GamesPage() {
  return (
    <>
      <Navbar />
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">🎮 Games</h1>
        <p className="text-gray-400">Coming soon!</p>
      </div>
      <Footer />
    </>
  )
}