// src/components/SearchSuggestions.jsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchSuggestions() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
        placeholder="Search movies, TV shows, anime by title..."
        className="w-full bg-[var(--bg-card)] border border-[var(--border-light)] rounded-full px-4 py-2 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[#a78bfa] transition-all"
      />
    </div>
  )
}