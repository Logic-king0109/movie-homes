// src/components/home/MovieGrid.jsx
'use client'

import { useEffect, useState } from 'react'
import { fetchHomeData } from '@/lib/api'
import MovieCard from '@/components/movie/MovieCard'

export default function MovieGrid({ 
  type = 'movie', 
  limit = 8,
  items: initialItems = null // ✅ Accept data from server
}) {
  const [items, setItems] = useState(initialItems || [])
  const [loading, setLoading] = useState(!initialItems) // ✅ Only loading if no initial data
  const [error, setError] = useState(null)

  useEffect(() => {
    // ✅ Only fetch if no data was passed from server
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems.slice(0, limit))
      setLoading(false)
      return
    }

    // Fallback: fetch on client if no server data
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await fetchHomeData()
        const operatingList = data?.data?.operatingList || []
        
        const section = operatingList.find(
          (section) => 
            section.type === 'SUBJECTS_MOVIE' && 
            section.title?.toLowerCase().includes(type === 'movie' ? 'movie' : 'series')
        )
        
        const items = section?.subjects || []
        setItems(items.slice(0, limit))
      } catch (err) {
        console.error(`Failed to fetch ${type}:`, err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type, limit, initialItems])

  // ✅ If we have items from server, skip loading
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {[...Array(limit)].map((_, i) => (
          <div key={i} className="skeleton min-h-[280px]" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-8 text-muted">
        Failed to load {type === 'series' ? 'series' : 'movies'}. Please try again later.
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-muted">
        No {type === 'series' ? 'series' : 'movies'} found.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {items.slice(0, limit).map((item, index) => (
        <MovieCard
          key={item.id || item.subjectId || index}
          data={item}
          index={index}
        />
      ))}
    </div>
  )
}