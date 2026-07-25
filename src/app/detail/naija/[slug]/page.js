// src/app/detail/naija/[slug]/page.js
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getNaijaPrayPostBySlug, buildNaijaPrayDownloadUrl } from '@/lib/api'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function NaijaDetailPage() {
  const params = useParams()
  const slug = params?.slug
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      getNaijaPrayPostBySlug(slug).then(data => {
        setPost(data)
        setLoading(false)
      })
    }
  }, [slug])

  if (loading) return <><Navbar /><div className="container-custom py-16 flex justify-center"><div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div></div><Footer /></>
  if (!post) return <><Navbar /><div className="container-custom py-16 text-center"><h1 className="text-2xl font-bold text-white">Not Found</h1></div><Footer /></>

  const downloadUrl = buildNaijaPrayDownloadUrl({
    cleanSlug: post.cleanSlug,
    year: post.year,
    isSeries: post.isSeries,
  })

  return (
    <>
      <Navbar />
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
        <p className="text-gray-400 mb-2">{post.year}</p>
        
        {post.isSeries ? (
          <p className="text-yellow-400 mb-4">📺 Series - Select episode on NaijaPray</p>
        ) : (
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
          >
            ⬇ Download Now
          </a>
        )}
      </div>
      <Footer />
    </>
  )
}