'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  // ✅ Update these to match your actual routes
  const navItems = [
    { href: '/', icon: '🏠', label: 'Home' },
    { href: '/movies', icon: '🎬', label: 'Movie' },      // ✅ Changed from /movie
    { href: '/tv-shows', icon: '📺', label: 'TV Show' },  // ✅ Changed from /tv
    { href: '/games', icon: '🎮', label: 'Games' },
    // { href: '/novel', icon: '📖', label: 'Novel' },     // Optional
  ]

  const extraItems = [
    // { href: '/trending', icon: '🔥', label: 'Trending' },  // Uncomment when ready
    // { href: '/favorites', icon: '⭐', label: 'Favorites' }, // Uncomment when ready
  ]

  return (
    <aside className="bg-[var(--bg-card)] backdrop-blur-[12px] rounded-card border border-[var(--border-light)] p-0 shadow-sm transition-all duration-300 hover:shadow-lg">
      <div className="py-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-2.5 text-[var(--text-secondary)] font-medium text-[0.9rem] cursor-pointer transition-all duration-300 border-l-3 border-transparent hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] hover:pl-6 ${
              pathname === item.href || pathname?.startsWith(item.href + '/') 
                ? 'border-l-[#a78bfa] bg-[var(--bg-hover)] text-[#a78bfa] font-semibold' 
                : ''
            }`}
          >
            <span className="text-xl w-6 text-center">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>
      {extraItems.length > 0 && (
        <>
          <div className="h-px bg-[var(--border-light)] my-2 mx-4"></div>
          <div className="py-2">
            {extraItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-5 py-2.5 text-[var(--text-secondary)] font-medium text-[0.9rem] cursor-pointer transition-all duration-300 border-l-3 border-transparent hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] hover:pl-6"
              >
                <span className="text-xl w-6 text-center">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </aside>
  )
}