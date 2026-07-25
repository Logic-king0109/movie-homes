// src/components/movie/MovieCard.jsx
'use client'

import Link from 'next/link'

export default function MovieCard({ data, index = 0 }) {
  const {
    subjectId,
    title,
    releaseDate,
    genre,
    imdbRatingValue,
    cover,
    corner,
    poster,
    // NaijaPray fields
    isNaijaPray,
    naijaSlug,
  } = data

  const year = data.year || (releaseDate ? releaseDate.split('-')[0] : 'N/A')
  const rating = imdbRatingValue || data.rating || 'N/A'
  const posterUrl = cover?.url || poster || null
  const emoji = posterUrl ? null : '🎬'
  const genreDisplay = typeof genre === 'string' ? genre : (Array.isArray(genre) ? genre.join(', ') : 'Movie')

  // ✅ Link based on source
  const href = isNaijaPray
    ? `/detail/naija/${naijaSlug || subjectId}`
    : `/detail/${subjectId}`

  return (
    <Link href={href} className="movie-card block">
      <div className="poster relative">
        {posterUrl ? (
          <img src={posterUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <span className="text-4xl">{emoji}</span>
        )}
        <span className="badge">{rating}</span>
        {corner && <span className="tag">{corner}</span>}
      </div>
      <div className="info">
        <h3>{title}</h3>
        <div className="meta">
          <span>{year}</span>
          <span className="rating">★ {rating}</span>
          <span className="platform">
            {typeof genreDisplay === 'string' ? genreDisplay.split(',')[0]?.trim() : 'Movie'}
          </span>
        </div>
        <div className="desc">{genreDisplay}</div>
      </div>
    </Link>
  )
}