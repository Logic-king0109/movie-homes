// src/components/home/HeroSlider.jsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { fetchHomeData, getBannerItems } from '@/lib/api'

export default function HeroSlider() {
  const [slides, setSlides] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    async function loadBanners() {
      try {
        const data = await fetchHomeData()
        const banners = getBannerItems(data) || []
        
        const formatted = banners.slice(0, 8).map((item, i) => ({
          id: item.subjectId || `banner-${i}`,
          title: item.title || item.subject?.title || 'Featured',
          year: item.subject?.releaseDate?.split('-')[0] || '',
          genre: item.subject?.genre?.split(',')[0] || 'Featured',
          rating: item.subject?.imdbRatingValue || 'N/A',
          platform: item.subject?.countryName || '',
          badge: i === 0 ? 'TRENDING' : 'FEATURED',
          desc: item.subject?.description?.slice(0, 100) || '',
          poster: item.image?.url || item.subject?.cover?.url || '',
          slug: item.subjectId || '',
          isSeries: item.subject?.subjectType === 2,
        }))
        
        if (formatted.length > 0) {
          setSlides(formatted)
        }
      } catch (error) {
        console.error('Failed to load banners:', error)
      }
    }
    loadBanners()
  }, [])

  const goToSlide = (index) => {
    if (slides.length === 0) return
    if (index < 0) index = slides.length - 1
    if (index >= slides.length) index = 0
    setCurrentIndex(index)
  }

  const nextSlide = () => goToSlide(currentIndex + 1)
  const prevSlide = () => goToSlide(currentIndex - 1)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (!isPaused && slides.length > 1) {
      intervalRef.current = setInterval(nextSlide, 5000)
    }
    return () => clearInterval(intervalRef.current)
  }, [isPaused, currentIndex, slides.length])

  if (slides.length === 0) {
    return (
      <div className="py-10 px-0">
        <div className="container-custom">
          <div className="rounded-card bg-[var(--bg-card)] min-h-[220px] flex items-center justify-center border border-[var(--border-light)]">
            <div className="animate-pulse flex items-center gap-2 text-gray-400">
              <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              Loading featured content...
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentSlide = slides[currentIndex]

  return (
    <div className="relative w-full overflow-hidden rounded-card" style={{ minHeight: '380px' }}>
      {/* Background Image */}
      {currentSlide.poster && (
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.poster}
            alt={currentSlide.title}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.3)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 flex items-center min-h-[380px] px-8 py-12">
        <div className="max-w-2xl">
          <span className="inline-block bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-3">
            🔥 {currentSlide.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            {currentSlide.isSeries ? '📺 ' : '🎬 '}{currentSlide.title}
          </h2>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300 mb-3">
            {currentSlide.year && <span>{currentSlide.year}</span>}
            {currentSlide.genre && <><span>•</span><span>{currentSlide.genre}</span></>}
            <span>•</span>
            <span className="text-yellow-400">★ {currentSlide.rating}</span>
            {currentSlide.platform && <span className="text-purple-400">{currentSlide.platform}</span>}
          </div>
          {currentSlide.desc && (
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">{currentSlide.desc}...</p>
          )}
          <div className="flex gap-3">
            <Link href={`/detail/${currentSlide.slug}`} className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity">
              ▶ Watch Now
            </Link>
            <Link href={`/detail/${currentSlide.slug}`} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-white/20 transition-all">
              ⬇ Download
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all"
            aria-label="Previous">‹</button>
          <button onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all"
            aria-label="Next">›</button>
          
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}