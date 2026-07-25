// src/app/search/page.js
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchNaijaPrayMovies } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MovieCard from '@/components/movie/MovieCard'

export const viewport = { width: 'device-width', initialScale: 1 }

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [error, setError] = useState(null)

  const performSearch = useCallback(async (searchQuery, pageNum = 1, append = false) => {
    if (!searchQuery.trim()) return
    try {
      setLoading(true)
      setError(null)
      const data = await searchNaijaPrayMovies(searchQuery, pageNum)
      const items = (data.items || []).filter(item => item != null)
      
      if (append) {
        setResults(prev => [...prev, ...items])
      } else {
        setResults(items)
      }
      setHasMore(data.hasMore)
      setPage(pageNum)
    } catch (err) {
      setError('Failed to search. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery)
      performSearch(initialQuery, 1, false)
    }
  }, [initialQuery, performSearch])

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return
      const scrollPos = window.innerHeight + window.scrollY
      const threshold = document.documentElement.scrollHeight - 500
      if (scrollPos >= threshold) performSearch(query, page + 1, true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore, page, query, performSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      window.history.pushState({}, '', `/search?q=${encodeURIComponent(query.trim())}`)
      performSearch(query, 1, false)
    }
  }

  const safeResults = results.filter(item => item != null)

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies, TV shows, anime by title..."
                className="w-full bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl px-6 py-4 text-[var(--text-primary)] text-lg focus:outline-none focus:border-[#a78bfa] transition-all"
                autoFocus
              />
              <button type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white px-6 py-2 rounded-lg font-medium hover:from-[#6d28d9] hover:to-[#9333ea] transition-all">
                Search
              </button>
            </div>
          </form>
        </div>

        {loading && safeResults.length === 0 ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">{error}</div>
        ) : safeResults.length === 0 && query ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        ) : safeResults.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">Search by title</h2>
            <p className="text-gray-400">Type a movie or TV show title above</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">
                Results for "{query}"
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {safeResults.map((item, index) => {
                if (!item || !item.id) return null
                return (
                  <MovieCard key={item.id || index} data={item} index={index} />
                )
              })}
            </div>
            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            )}
            {!hasMore && safeResults.length > 0 && (
              <div className="text-center py-8 text-gray-400 text-sm">No more results</div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
}