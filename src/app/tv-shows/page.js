// src/app/tv-shows/page.js
import { fetchHomeData, getMovieSections, transformSubject } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TVShowsClient from './TVShowsClient'

export const viewport = { width: 'device-width', initialScale: 1 }
export const metadata = {
  title: 'TV Shows – MOVIE HOMES',
  description: 'Browse all TV shows on MOVIE HOMES. Watch and download in HD quality.',
}

export default async function TVShowsPage() {
  const homeData = await fetchHomeData()
  const allSections = getMovieSections(homeData)
  
  const allSeries = allSections.flatMap(section => 
    section.subjects
      ?.filter(subject => subject.subjectType === 2)
      ?.map(transformSubject) || []
  )

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-white mb-6">TV Shows</h1>
        <TVShowsClient initialShows={allSeries} />
      </div>
      <Footer />
    </>
  )
}