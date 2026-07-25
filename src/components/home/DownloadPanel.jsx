export default function DownloadPanel() {
  return (
    <div className="bg-[var(--bg-glass)] backdrop-blur-[16px] border border-[var(--border-light)] rounded-glass p-5 my-6 flex flex-wrap items-center justify-between gap-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-3.5">
        <span className="text-[2.2rem] animate-float">📲</span>
        <div>
          <h3 className="text-[1.05rem] font-semibold text-[var(--text-primary)]">Download MOVIE HOMES</h3>
          <p className="text-muted text-[0.85rem]">Watch offline on any device</p>
        </div>
      </div>
      <div className="flex gap-2.5 flex-wrap">
        <button className="btn-primary px-7 py-2.5 text-[0.85rem]">📱 Download App</button>
        <button className="btn-glass text-[0.85rem]">🔗 Get APK</button>
      </div>
    </div>
  )
}