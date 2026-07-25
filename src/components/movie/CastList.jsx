export default function CastList({ cast }) {
  if (!cast || cast.length === 0) return null

  // Deduplicate by staffId + character combination
  const uniqueCast = []
  const seen = new Set()
  cast.forEach(person => {
    const key = `${person.staffId}-${person.character}`
    if (!seen.has(key)) {
      seen.add(key)
      uniqueCast.push(person)
    }
  })

  return (
    <div className="mb-10">
      <h2 className="text-[1.4rem] font-bold text-[var(--text-primary)] mb-4 relative">
        ⭐ Top Cast
        <span className="absolute -bottom-1 left-0 w-10 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full"></span>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        {uniqueCast.map((person, index) => (
          <div key={`cast-${person.staffId}-${index}`} className="bg-[var(--bg-card)] rounded-card p-4 text-center border border-[var(--border-light)] transition-all duration-300 hover:border-[#a78bfa] hover:-translate-y-1 hover:shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gradient-soft mx-auto mb-2.5 flex items-center justify-center text-[1.8rem]">
              {person.avatarUrl ? (
                <img src={person.avatarUrl} alt={person.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                '🎭'
              )}
            </div>
            <div className="font-semibold text-[var(--text-primary)] text-[0.9rem]">{person.name}</div>
            <div className="text-[0.8rem] text-muted">{person.character || (person.staffType === 2 ? 'Director' : person.staffType === 3 ? 'Writer' : 'Actor')}</div>
          </div>
        ))}
      </div>
    </div>
  )
}