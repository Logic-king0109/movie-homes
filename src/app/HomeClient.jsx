'use client'

import MovieCard from '@/components/movie/MovieCard'

export default function HomeClient({ allSections }) {
  const sections = allSections || []

  return (
    <>
      {sections.map((section) => (
        <div key={section.id}>
          <div className="section-header">
            <h2>🔥 {section.title}</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {(section.subjects || []).slice(0, 30).map((item, index) => {
              if (!item) return null
              return (
                <MovieCard 
                  key={`home-${section.id}-${item.id || item.subjectId || index}`} 
                  data={item} 
                  index={index} 
                />
              )
            })}
          </div>
        </div>
      ))}
    </>
  )
}