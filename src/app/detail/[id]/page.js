// src/app/detail/[id]/page.js
'use client'

import { useState, useEffect } from 'react'
import { fetchMovieDetail, transformSubject, transformDetailResponse } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DetailHeader from '@/components/movie/DetailHeader'
import CastList from '@/components/movie/CastList'
import SocialLinks from '@/components/ui/SocialLinks'
import FAQ from '@/components/ui/FAQ'
import Disclaimer from '@/components/ui/Disclaimer'
import NaijaPrayDownload from './NaijaPrayDownload'

export default function MovieDetailPage({ params }) {
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [detailData, setDetailData] = useState(null)
  
  useEffect(() => {
    if (params) Promise.resolve(params).then(r => { if (r?.id) setId(r.id) }).catch(() => {})
  }, [params])
  
  useEffect(() => {
    if (!id) return
    let mounted = true
    
    async function fetchData() {
      setLoading(true)
      try {
        const detailR = await fetchMovieDetail(id)
        if (!mounted) return
        setDetailData(detailR)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    fetchData()
    return () => { mounted = false }
  }, [id])
  
  if (loading) return <><Navbar /><div className="container-custom py-16 flex justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /></div><Footer /></>
  if (error || !detailData?.data?.subject) return <><Navbar /><div className="container-custom py-16 text-center"><div className="text-6xl mb-4">😕</div><h1 className="text-2xl font-bold mb-2">Movie Not Found</h1><p className="text-gray-400 mb-6">{error || 'Not found.'}</p><a href="/" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg">Back to Home</a></div><Footer /></>
  
  const subject = detailData.data.subject
  const stars = detailData.data.stars || []
  let transformed = null
  try { transformed = transformDetailResponse(detailData) } catch (e) {}
  const transformedSubject = transformSubject(subject)
  
  return (
    <>
      <Navbar />
      <div className="container-custom py-8 pb-16">
        <DetailHeader subject={transformedSubject || subject} stars={stars} detailData={detailData.data} />
        
        <NaijaPrayDownload 
          title={subject?.title}
          year={subject?.releaseDate?.split('-')[0]}
          isSeries={subject?.subjectType === 2}
          omniSaveData={detailData.data}
        />
        
        {stars.length > 0 && <CastList cast={stars} />}
      </div>
      <div className="container-custom"><SocialLinks /><FAQ /><Disclaimer /></div>
      <Footer />
    </>
  )
}