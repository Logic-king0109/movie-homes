// src/components/movie/DownloadButton.jsx
'use client'

import { useState } from 'react'

export default function DownloadButton({ 
  title, 
  downloads = [], 
  loading = false 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const hasLinks = downloads.length > 0

  const handleDownload = (url) => {
    if (!url) return
    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <button disabled className="bg-gray-700 text-gray-400 px-5 py-2.5 rounded-full cursor-not-allowed flex items-center gap-2">
        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading...
      </button>
    )
  }

  if (!hasLinks) {
    return (
      <button disabled className="bg-gray-700 text-gray-400 px-5 py-2.5 rounded-full cursor-not-allowed opacity-50 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Unavailable
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] text-white px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-800 bg-gray-800/50">
            <h4 className="text-white font-medium text-sm">Download Options</h4>
            <p className="text-gray-400 text-xs mt-1">{downloads.length} options</p>
          </div>
          
          <div className="max-h-64 overflow-y-auto">
            {downloads.map((item, index) => (
              <button
                key={item.id || index}
                onClick={() => handleDownload(item.url)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-600/20 rounded px-2 py-1">
                    <span className="text-purple-400 font-mono text-sm font-bold">
                      {item.quality || 'Download'}
                    </span>
                  </div>
                  <span className="text-gray-300 text-sm">MP4</span>
                </div>
                <span className="text-gray-400 text-xs">{item.size || '↓'}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}