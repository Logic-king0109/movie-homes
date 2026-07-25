// src/components/home/MovieGrid.server.jsx
import MovieCard from '@/components/movie/MovieCard'

export default async function MovieGrid({ 
  type = 'movie', 
  limit = 8,
  items = [] 
}) {
  // ✅ Items are already passed from server
  const displayItems = items.slice(0, limit)

  if (displayItems.length === 0) {
    return (
      <div className="col-span-full text-center py-8 text-muted">
        No {type === 'series' ? 'series' : 'movies'} found.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {displayItems.map((item, index) => (
        <MovieCard
          key={item.id || item.subjectId || index}
          data={item}
          index={index}
        />
      ))}
    </div>
  )
}