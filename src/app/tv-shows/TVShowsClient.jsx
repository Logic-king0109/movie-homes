'use client'

import { useState, useEffect, useCallback } from 'react'
import { searchContentItems, getSearchItems, getSearchPager, transformSubject } from '@/lib/api'
import MovieCard from '@/components/movie/MovieCard'

export default function TVShowsClient({ initialShows }) {
  const [shows, setShows] = useState(initialShows || [])
  const [page, setPage] = useState(2)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const data = await searchContentItems('series', page, 'tv')
      const items = getSearchItems(data)
      const pager = getSearchPager(data)
      
      if (items.length > 0) {
        const transformed = items.map(transformSubject)
        setShows(prev => [...prev, ...transformed])
      }
      setHasMore(pager.hasMore)
      if (pager.nextPage) setPage(parseInt(pager.nextPage))
    } catch (err) {
      console.error('Load more error:', err)
    } finally {
      setLoading(false)
    }
  }, [page, loading, hasMore])

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return
      const scrollPos = window.innerHeight + window.scrollY
      const threshold = document.documentElement.scrollHeight - 600
      if (scrollPos >= threshold) loadMore()
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore, loading, hasMore])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {shows.map((item, index) => (
         <MovieCard key={`show-${item.subjectId || item.id}-${index}`} data={item} index={index} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
      {!hasMore && shows.length > 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">No more shows to load</div>
      )}
    </>
  )
}