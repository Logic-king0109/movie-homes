// src/app/search/page.js
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const viewport = { width: 'device-width', initialScale: 1 }

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || ''
  let results = []
  
  if (query) {
    try {
      const url = `https://www.naijaprey.tv/wp-json/wp/v2/posts?search=${encodeURIComponent(query)}&per_page=20&_embed`
      const response = await fetch(url, { next: { revalidate: 60 } })
      if (response.ok) {
        const posts = await response.json()
        results = posts.map(post => {
          const title = post.title.rendered
          const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
          const year = post.date?.split('-')[0] || ''
          const cleanName = title.replace(/\s*\(?\d{4}\)?\s*/g, '').replace(/\s*Season\s*\d+.*$/i, '').trim()
          
          return {
            id: post.slug,
            title: cleanName,
            fullTitle: title,
            poster: image,
            year,
            isSeries: /season/i.test(title),
          }
        })
      }
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        {/* Search Form */}
        <form action="/search" method="GET" className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input 
              type="text" 
              name="q" 
              defaultValue={query}
              placeholder="Search movies, TV shows, anime by title..."
              className="w-full bg-[var(--bg-card)] border border-[var(--border-light)] rounded-xl px-6 py-4 text-[var(--text-primary)] text-lg focus:outline-none focus:border-[#a78bfa] transition-all" 
              autoFocus 
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white px-6 py-2 rounded-lg font-medium">
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        {!query ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">Search by title</h2>
            <p className="text-gray-400">Type a movie or TV show title above</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
            <p className="text-gray-400">Try searching for something else</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold text-white mb-6">Results for "{query}"</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {results.map((item, i) => (
                <Link key={item.id || i} href={`/detail/${item.id}`} className="block bg-[var(--bg-card)] rounded-lg overflow-hidden border border-[var(--border-light)] hover:border-purple-500 transition-all group">
                  <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                    {item.poster ? (
                      <img src={item.poster} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="text-4xl">🎬</span>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-white truncate">{item.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-400">{item.year}</span>
                      <span className="text-xs text-purple-400">{item.isSeries ? 'Series' : 'Movie'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  )
}
