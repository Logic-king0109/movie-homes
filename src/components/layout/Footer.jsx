export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] py-6 px-4">
      <div className="container-custom flex flex-wrap justify-between gap-4">
        <div className="text-muted text-[0.8rem]">
          © {new Date().getFullYear()} MOVIE HOMES. All rights reserved.
        </div>
        <div className="flex gap-5 flex-wrap">
          <a href="/privacy" className="text-[var(--text-secondary)] no-underline text-[0.8rem] transition-all duration-300 hover:text-[#a78bfa]">Privacy</a>
          <a href="/terms" className="text-[var(--text-secondary)] no-underline text-[0.8rem] transition-all duration-300 hover:text-[#a78bfa]">Terms</a>
          <a href="/contac" className="text-[var(--text-secondary)] no-underline text-[0.8rem] transition-all duration-300 hover:text-[#a78bfa]">Contact</a>
          <a href="/dmca" className="text-[var(--text-secondary)] no-underline text-[0.8rem] transition-all duration-300 hover:text-[#a78bfa]">DMCA</a>
        </div>
      </div>
    </footer>
  )
}

