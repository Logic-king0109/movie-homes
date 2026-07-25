// src/app/api/download/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')
  const year = searchParams.get('year')
  const season = searchParams.get('season')
  const episode = searchParams.get('episode')

  if (!title) {
    return Response.json({ error: 'Title is required' }, { status: 400 })
  }

  try {
    // Clean the title for URL
    const cleanName = title
      .replace(/\s*\[.*?\]/g, '')  // Remove [English] etc
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')

    let downloadUrl

    if (season && episode) {
      // Series episode
      downloadUrl = `https://vdl.np-downloader.com/sdm_downloads/download-${cleanName}-${year}-season-${season}-episode-${episode}/`
    } else {
      // First try to find the movie on NaijaPray
      try {
        const wpUrl = `https://www.naijaprey.tv/wp-json/wp/v2/posts?search=${encodeURIComponent(title)}&per_page=1`
        const wpResponse = await fetch(wpUrl, { 
          headers: { 'Accept': 'application/json' },
          signal: AbortSignal.timeout(5000)
        })
        
        if (wpResponse.ok) {
          const posts = await wpResponse.json()
          if (posts && posts.length > 0) {
            downloadUrl = `https://vdl.np-downloader.com/sdm_downloads/download-${posts[0].slug}/`
          }
        }
      } catch (e) {
        // NaijaPray search failed, build URL from title
      }
      
      // Fallback: build URL from title
      if (!downloadUrl) {
        downloadUrl = `https://vdl.np-downloader.com/sdm_downloads/download-${cleanName}-${year}/`
      }
    }

    // Redirect to the download gateway
    return Response.redirect(downloadUrl)

  } catch (error) {
    console.error('Download error:', error)
    return Response.json({ error: 'Download failed' }, { status: 500 })
  }
}