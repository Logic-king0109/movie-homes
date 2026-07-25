// src/app/page.js
import { fetchHomeData, getMovieSections, transformSubject, getBannerItems } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'
import HeroSlider from '@/components/home/HeroSlider'
import DownloadPanel from '@/components/home/DownloadPanel'
import SocialLinks from '@/components/ui/SocialLinks'
import FAQ from '@/components/ui/FAQ'
import Disclaimer from '@/components/ui/Disclaimer'
import HomeClient from './HomeClient'

export const metadata = {
  title: 'MOVIE HOMES – Stream & Download Movies, TV Shows, Anime',
  description: 'Watch and download the latest movies, TV series, and anime in HD quality. Free streaming with offline download support.',
}

export default async function HomePage() {
  let homeData = null
  let allSections = []
  let bannerItems = []
  
  try {
    homeData = await fetchHomeData()
    allSections = getMovieSections(homeData)
    bannerItems = getBannerItems(homeData)
    console.log(`✅ Found ${allSections.length} sections`)
  } catch (error) {
    console.error('Failed to fetch home data:', error)
  }

  return (
    <>
      <Navbar />
      <div className="container-custom py-5">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
          <Sidebar />
          <div className="flex flex-col gap-6">
            <HeroSlider bannerItems={bannerItems} />

            <HomeClient allSections={allSections} />

            <DownloadPanel />
          </div>
        </div>
      </div>
      <div className="container-custom">
        <SocialLinks />
        <FAQ />
        <Disclaimer />
      </div>
      <Footer />
    </>
  )
}