// src/components/movie/DetailHeader.jsx
'use client'

import { useState } from 'react'
import { formatDuration, formatDate } from '@/lib/api'

export default function DetailHeader({ subject, stars, detailData }) {
  const [showFull, setShowFull] = useState(false)

  // Extract data from subject
  const {
    id: subjectId,
    title,
    releaseDate,
    genres,
    imdbRatingValue,
    cover,
    countryName,
    description,
    duration,
    rating,
    year,
    type,
    hasResource,
    trailer,
    dubs,
    cast,
    crew,
    source,
    uploadedBy,
    seasons,
    subtitleLanguages,
    audioDubs,
    subtitleDubs,
  } = subject || {}

  // Get poster URL
  const posterUrl = cover?.url || subject?.poster
  const emoji = posterUrl ? null : '🎬'
  
  // Format duration
  const durationMinutes = duration ? Math.floor(duration / 60) : 'N/A'
  const durationFormatted = duration ? formatDuration(duration) : 'N/A'
  
  // Get release year
  const releaseYear = year || (releaseDate ? releaseDate.split('-')[0] : 'N/A')
  
  // Get rating
  const displayRating = rating || imdbRatingValue || 'N/A'
  
  // Get director
  const director = crew?.find(c => c.role === 'Director')?.name || 
                   stars?.find(s => s.staffType === 2)?.name || 
                   'N/A'
  
  // Get cast list
  const displayCast = cast || stars?.filter(s => s.staffType === 1) || []
  const topCast = displayCast.slice(0, 5)
  
  // Get genre display
  const genreDisplay = genres?.join(' · ') || 'Action · Thriller'
  const primaryGenre = genres?.[0] || 'Movie'

  return (
    <div className="grid grid-cols-[280px_1fr] gap-10 mb-10">
      {/* Poster Section */}
      <div className="rounded-card overflow-hidden aspect-[2/3] bg-gradient-soft flex items-center justify-center text-6xl border border-[var(--border-light)] shadow-lg relative">
        {posterUrl ? (
          <img src={posterUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-6xl">{emoji}</span>
        )}
        
        <span className="absolute top-4 left-4 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] text-white text-[0.7rem] font-bold px-3.5 py-1 rounded-full tracking-[0.5px]">
          ★ {displayRating}
        </span>
        
        <span className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-[4px] text-white text-[0.7rem] px-3.5 py-1 rounded-full">
          {releaseYear}
        </span>

        <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-[4px] text-white text-[0.7rem] px-3.5 py-1 rounded-full">
          {type === 'series' ? '📺 Series' : '🎬 Movie'}
        </span>

        {subject?.corner && (
          <span className="absolute bottom-4 right-4 bg-red-600 text-white text-[0.7rem] font-bold px-3.5 py-1 rounded-full">
            {subject.corner}
          </span>
        )}
      </div>

      {/* Info Section */}
      <div className="detail-info">
        <h1 className="text-[2.8rem] font-extrabold text-[var(--text-primary)] mb-2">{title}</h1>
        
        <div className="flex flex-wrap gap-4 text-[0.95rem] text-[var(--text-secondary)] mb-3">
          <span>{releaseYear}</span>
          <span className="bg-[var(--border-light)] px-2.5 rounded-[4px] font-bold">
            {type === 'series' ? 'TV' : 'R'}
          </span>
          <span>{countryName || 'United States'}</span>
          <span>{genreDisplay}</span>
          <span className="text-[#fbbf24] font-bold">★ {displayRating}</span>
          <span className="text-[#a78bfa] font-semibold">{primaryGenre}</span>
        </div>

        <div className="text-[1.05rem] text-[var(--text-secondary)] max-w-[600px] mb-4 leading-[1.8]">
          {showFull ? description || 'No description available.' : (description || '').slice(0, 280)}
          {description && description.length > 280 && (
            <span
              className="text-[#a78bfa] cursor-pointer font-medium transition-colors duration-300 hover:text-[#7c3aed]"
              onClick={() => setShowFull(!showFull)}
            >
              {showFull ? ' Show less' : ' More'}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-2">
          {hasResource && (
            <button
              className="btn-primary"
              onClick={() => window.open(`https://watch.moviehomes.com/${subject?.detailPath || subjectId}`, '_blank')}
            >
              ▶ Watch Online
            </button>
          )}

          {trailer?.videoAddress?.url && (
            <button 
              className="btn-glass"
              onClick={() => window.open(trailer.videoAddress.url, '_blank')}
            >
              ▶ Trailer
            </button>
          )}
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap gap-8 py-5 border-y border-[var(--border-light)] mb-8 mt-4">
          <div className="flex flex-col items-center">
            <span className="text-[1.4rem] font-bold text-[var(--text-primary)]">{displayRating}</span>
            <span className="text-[0.8rem] text-muted">IMDb Rating</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[1.4rem] font-bold text-[var(--text-primary)]">{durationMinutes}min</span>
            <span className="text-[0.8rem] text-muted">Duration</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[1.4rem] font-bold text-[var(--text-primary)]">{displayCast.length}</span>
            <span className="text-[0.8rem] text-muted">Cast</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-[1.4rem] font-bold text-[var(--text-primary)]">{releaseYear}</span>
            <span className="text-[0.8rem] text-muted">Released</span>
          </div>
          
          {director !== 'N/A' && (
            <div className="flex flex-col items-center">
              <span className="text-[1.4rem] font-bold text-[var(--text-primary)] text-xs truncate max-w-[120px]">{director}</span>
              <span className="text-[0.8rem] text-muted text-xs">Directed by</span>
            </div>
          )}

          {source && (
            <div className="flex flex-col items-center">
              <span className="text-[1.4rem] font-bold text-[var(--text-primary)] text-sm truncate max-w-[120px]">{source}</span>
              <span className="text-[0.8rem] text-muted text-xs">Source</span>
            </div>
          )}
        </div>

        {/* Dubs/Subtitles */}
        {(audioDubs?.length > 0 || subtitleDubs?.length > 0) && (
          <div className="flex flex-wrap gap-4 mt-2 p-3 bg-gray-800/30 rounded-lg">
            {audioDubs?.length > 0 && (
              <div>
                <span className="text-xs text-muted">🎧 Audio: </span>
                <span className="text-sm text-white">
                  {audioDubs.map(d => d.lanName).join(', ')}
                </span>
              </div>
            )}
            {subtitleDubs?.length > 0 && (
              <div>
                <span className="text-xs text-muted">📝 Subtitles: </span>
                <span className="text-sm text-white">
                  {subtitleDubs.map(d => d.lanName).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Season Info */}
        {seasons?.length > 0 && seasons[0]?.se > 0 && (
          <div className="mt-2">
            <span className="text-xs text-muted">📺 Seasons: </span>
            <span className="text-sm text-white">
              {seasons.map(s => `Season ${s.se}`).join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}