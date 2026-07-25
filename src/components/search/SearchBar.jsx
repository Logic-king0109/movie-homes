'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-muted">
          🔍
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV shows, anime..."
          className="w-full bg-[var(--bg-glass)] backdrop-blur-[12px] border border-[var(--border-light)] rounded-full py-4 pl-14 pr-28 text-[var(--text-primary)] text-sm font-medium placeholder:text-muted focus:outline-none transition-all duration-300 focus:border-[#a78bfa] focus:shadow-[0_0_0_4px_rgba(124,58,237,0.15)]"
        />
        <button
          type="submit"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-[0_14px_34px_rgba(0,255,157,0.22)] transition-all duration-200 hover:brightness-[1.03] hover:shadow-[0_18px_42px_rgba(0,255,157,0.28)] active:scale-[0.98]"
        >
          Search
        </button>
      </form>
    </div>
  )
}