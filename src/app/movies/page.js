// src/app/movies/page.js
import { fetchHomeData, getMovieSections, transformSubject } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MoviesClient from './MoviesClient'

export const viewport = { width: 'device-width', initialScale: 1 }
export const metadata = {
  title: 'Movies – MOVIE HOMES',
  description: 'Browse all movies on MOVIE HOMES. Watch and download in HD quality.',
}

export default async function MoviesPage() {
  const homeData = await fetchHomeData()
  const allSections = getMovieSections(homeData)
  
  const allMovies = allSections.flatMap(section => 
    section.subjects?.map(transformSubject) || []
  )

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-white mb-6">All Movies</h1>
        <MoviesClient initialMovies={allMovies} />
      </div>
      <Footer />
    </>
  )
}