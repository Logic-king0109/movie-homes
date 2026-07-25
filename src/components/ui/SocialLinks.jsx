export default function SocialLinks() {
  const socials = [
    { href: 'https://facebook.com/moviehomes', icon: '📘', name: 'Facebook' },
    { href: 'https://instagram.com/moviehomes', icon: '📸', name: 'Instagram' },
    { href: 'https://twitter.com/moviehomes', icon: '🐦', name: 'X (Twitter)' },
    { href: 'https://t.me/moviehomes', icon: '✈️', name: 'Telegram' },
    { href: 'https://tiktok.com/@moviehomes', icon: '🎵', name: 'TikTok' },
  ]

  return (
    <div className="py-8 border-y border-[var(--border-light)]">
      <h2 className="text-[1.4rem] font-bold text-[var(--text-primary)] mb-4 relative">
        📱 Connect With Us
        <span className="absolute -bottom-1 left-0 w-10 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full"></span>
      </h2>
      <div className="flex flex-wrap gap-4">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-2.5 bg-[var(--bg-card)] border border-[var(--border-light)] rounded-full text-[var(--text-secondary)] no-underline transition-all duration-300 font-medium hover:border-[#a78bfa] hover:text-[var(--text-primary)] hover:-translate-y-1 hover:shadow-sm"
          >
            <span className="text-[1.4rem]">{social.icon}</span>
            <span className="text-[0.9rem]">{social.name}</span>
          </a>
        ))}
      </div>
    </div>
  )
}