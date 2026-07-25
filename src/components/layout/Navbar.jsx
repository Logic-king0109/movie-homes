// src/components/layout/Navbar.jsx (Updated)
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/components/ThemeProvider'
import SearchSuggestions from '@/components/SearchSuggestions' // ✅ Import

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 py-3.5 bg-[var(--bg-glass)] backdrop-blur-[20px] border-b border-[var(--border-light)] transition-all duration-400 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-[1.6rem] font-extrabold no-underline text-[var(--text-primary)]">
          <img src="/logo.png" alt="MOVIE HOMES" className="h-16 w-16 object-contain" />
          <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent tracking-[-0.5px]">
            MOVIE<span className="font-light text-[var(--text-secondary)]">HOMES</span>
          </span>
        </Link>

        <ul className="hidden md:flex gap-7 list-none">
          <li><Link href="/" className="text-[var(--text-secondary)] font-medium text-[0.9rem] transition-all duration-300 hover:text-[var(--text-primary)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-gradient-to-r after:from-[#7c3aed] after:to-[#a855f7] after:transition-[width] after:duration-300 after:rounded-full hover:after:w-full">Home</Link></li>
          <li><Link href="/movies" className="text-[var(--text-secondary)] font-medium text-[0.9rem] transition-all duration-300 hover:text-[var(--text-primary)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-gradient-to-r after:from-[#7c3aed] after:to-[#a855f7] after:transition-[width] after:duration-300 after:rounded-full hover:after:w-full">Movie</Link></li>
          <li><Link href="/tv-shows" className="text-[var(--text-secondary)] font-medium text-[0.9rem] transition-all duration-300 hover:text-[var(--text-primary)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-gradient-to-r after:from-[#7c3aed] after:to-[#a855f7] after:transition-[width] after:duration-300 after:rounded-full hover:after:w-full">TV Show</Link></li>
          <li><Link href="/games" className="text-[var(--text-secondary)] font-medium text-[0.9rem] transition-all duration-300 hover:text-[var(--text-primary)] relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2.5px] after:bg-gradient-to-r after:from-[#7c3aed] after:to-[#a855f7] after:transition-[width] after:duration-300 after:rounded-full hover:after:w-full">Games</Link></li>
        </ul>

        <div className="flex items-center gap-3">
          {/* ✅ Use the new search component */}
          <div className="hidden md:block w-64">
            <SearchSuggestions />
          </div>

          <button
            onClick={toggleTheme}
            className="bg-[var(--bg-glass)] border border-[var(--border-light)] rounded-full w-10 h-10 flex items-center justify-center cursor-pointer text-[1.1rem] transition-all duration-300 backdrop-blur-[8px] hover:bg-[rgba(124,58,237,0.2)] hover:border-[#a78bfa] hover:rotate-20"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}