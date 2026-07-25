// src/app/detail/[id]/NaijaPrayDownload.jsx
'use client'

import { useState, useEffect } from 'react'
import { searchNaijaPrayMovies } from '@/lib/api'

export default function NaijaPrayDownload({ title, year, isSeries, omniSaveData }) {
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [loading, setLoading] = useState(isSeries ? false : true)
  const [error, setError] = useState(null)
  const [downloading, setDownloading] = useState(false)
  
  const [seasons, setSeasons] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [selectedEpisode, setSelectedEpisode] = useState(null)
  const [maxEpisodes, setMaxEpisodes] = useState(0)

  useEffect(() => {
    if (isSeries && omniSaveData?.resource?.seasons) {
      const seasonData = omniSaveData.resource.seasons.map(s => ({
        seasonNum: s.se,
        maxEp: s.maxEp || 0,
      }))
      setSeasons(seasonData)
      if (seasonData.length > 0) {
        setSelectedSeason(seasonData[0].seasonNum)
        setMaxEpisodes(seasonData[0].maxEp)
      }
    }
  }, [isSeries, omniSaveData])

  useEffect(() => {
    if (!isSeries && title) searchForMovie()
  }, [title, year, isSeries])

  useEffect(() => {
    if (isSeries && selectedSeason && selectedEpisode) searchForEpisode()
  }, [selectedSeason, selectedEpisode])

  const searchForMovie = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await searchNaijaPrayMovies(title, 1)
      if (result.items.length > 0) {
        setDownloadUrl(`https://vdl.np-downloader.com/sdm_downloads/download-${result.items[0].naijaSlug}/`)
      } else {
        const clean = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        setDownloadUrl(`https://vdl.np-downloader.com/sdm_downloads/download-${clean}-${year}/`)
      }
    } catch (err) {
      setError('Download not available')
    } finally {
      setLoading(false)
    }
  }

  const searchForEpisode = async () => {
    setLoading(true)
    setError(null)
    try {
      const q = `${title} Season ${selectedSeason} Episode ${selectedEpisode}`
      const result = await searchNaijaPrayMovies(q, 1)
      if (result.items.length > 0) {
        setDownloadUrl(`https://vdl.np-downloader.com/sdm_downloads/download-${result.items[0].naijaSlug}/`)
      } else {
        const clean = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        setDownloadUrl(`https://vdl.np-downloader.com/sdm_downloads/download-${clean}-${year}-season-${selectedSeason}-episode-${selectedEpisode}/`)
      }
    } catch (err) {
      setError('Episode not found')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!downloadUrl || downloading) return
    setDownloading(true)
    
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = downloadUrl
    document.body.appendChild(iframe)
    setTimeout(() => {
      document.body.removeChild(iframe)
      setDownloading(false)
    }, 5000)
  }

  const handleSeasonChange = (sn) => {
    setSelectedSeason(sn)
    setSelectedEpisode(null)
    setDownloadUrl(null)
    const s = seasons.find(x => x.seasonNum === sn)
    if (s) setMaxEpisodes(s.maxEp)
  }

  return (
    <div className="detail-section mt-8 space-y-4">
      <h2 className="text-xl font-bold text-white">⬇ Download</h2>

      {isSeries && seasons.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Season</h3>
            <div className="flex flex-wrap gap-2">
              {seasons.map(s => (
                <button key={s.seasonNum} onClick={() => handleSeasonChange(s.seasonNum)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedSeason === s.seasonNum ? 'bg-purple-600 text-white' : 'bg-[var(--bg-card)] text-gray-300 hover:bg-gray-700 border border-[var(--border-light)]'}`}>
                  Season {s.seasonNum}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Episodes</h3>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {Array.from({ length: maxEpisodes }, (_, i) => i + 1).map(ep => (
                <button key={ep} onClick={() => { setSelectedEpisode(ep); setDownloadUrl(null) }}
                  className={`aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all ${selectedEpisode === ep ? 'bg-purple-600 text-white ring-2 ring-purple-400' : 'bg-[var(--bg-card)] text-gray-300 hover:bg-gray-700 border border-[var(--border-light)]'}`}>
                  {ep}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="pt-2">
        {loading ? (
          <button disabled className="w-full py-3 rounded-lg font-medium bg-gray-600 text-white cursor-wait flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            Searching...
          </button>
        ) : downloadUrl ? (
          <button onClick={handleDownload} disabled={downloading}
            className="w-full py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center justify-center gap-2">
            {downloading ? 'Downloading...' : 'Download Now'}
          </button>
        ) : (
          <button disabled className="w-full py-3 rounded-lg font-medium bg-gray-700 text-gray-400 cursor-not-allowed">
            {isSeries ? 'Select season & episode' : 'Searching...'}
          </button>
        )}
        {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}
      </div>
    </div>
  )
}