export default function LoadingSkeleton({ count = 4, type = 'grid' }) {
  if (type === 'detail') {
    return (
      <div className="animate-pulse">
        <div className="grid grid-cols-[280px_1fr] gap-10 mb-10">
          <div className="bg-[var(--bg-card)] rounded-card aspect-[2/3]"></div>
          <div className="space-y-4">
            <div className="h-8 bg-[var(--bg-card)] rounded w-3/4"></div>
            <div className="h-4 bg-[var(--bg-card)] rounded w-1/2"></div>
            <div className="h-24 bg-[var(--bg-card)] rounded"></div>
          </div>
        </div>
        <div className="h-12 bg-[var(--bg-card)] rounded my-8"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-[var(--bg-card)] rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="skeleton min-h-[280px]" />
      ))}
    </div>
  )
}