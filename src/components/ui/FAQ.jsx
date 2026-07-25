'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'How do I download movies?',
    a: 'Simply click the "Download Movie" button on any movie detail page. The file will start downloading immediately in MP4 format, ready for offline viewing.'
  },
  {
    q: 'Can I watch offline?',
    a: 'Yes! Once you\'ve downloaded a movie, you can watch it anytime, anywhere — even without an internet connection. Your downloaded content stays in your device\'s storage.'
  },
  {
    q: 'Is MOVIE HOMES free?',
    a: 'Yes! MOVIE HOMES is completely free to use. We provide high-quality content without any subscription fees.'
  },
  {
    q: 'What platforms are supported?',
    a: 'MOVIE HOMES works on all devices: Desktop, Mobile (Android & iOS), Tablet, and Smart TVs. Just open the website in your browser!'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-5 border-b border-[var(--border-light)]">
      <h2 className="text-[1.4rem] font-bold text-[var(--text-primary)] mb-4 relative">
        ❓ Frequently Asked Questions
        <span className="absolute -bottom-1 left-0 w-10 h-1 bg-gradient-to-r from-[#7c3aed] to-[#a855f7] rounded-full"></span>
      </h2>
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="p-4 bg-[var(--bg-card)] rounded-card border border-[var(--border-light)] mb-3 cursor-pointer transition-all duration-300 hover:border-[#a78bfa]"
          onClick={() => toggle(index)}
        >
          <div className="flex justify-between items-center font-semibold text-[var(--text-primary)]">
            <span>{faq.q}</span>
            <span className={`text-muted text-[1.2rem] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
          <div className={`text-[var(--text-secondary)] mt-2 text-[0.95rem] ${openIndex === index ? 'block' : 'hidden'}`}>
            {faq.a}
          </div>
        </div>
      ))}
    </div>
  )
}