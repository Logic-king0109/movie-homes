/**
 * MOVIE HOMES - Complete Unified API Library
 * OmniSave APIs for Home/Detail + NaijaPray for Search/Download
 */

const API_CONFIG = {
  BFF_BASE: 'https://h5-api.aoneroom.com/wefeed-h5api-bff',
  LEGACY_BASE: 'https://h5.aoneroom.com/api/v1',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  revalidate: 60,
}

const NAIJAPRAY_WP_API = 'https://www.naijaprey.tv/wp-json/wp/v2/posts'
const NAIJAPRAY_DOWNLOAD_BASE = 'https://vdl.np-downloader.com/sdm_downloads/download'

// ============================================================
// CORE API FETCHER
// ============================================================

export async function fetchAPI(url, options = {}) {
  const headers = { ...API_CONFIG.headers, ...options.headers }
  try {
    const response = await fetch(url, { ...options, headers, next: { revalidate: API_CONFIG.revalidate } })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`❌ API Error [${url}]:`, error)
    throw error
  }
}

// ============================================================
// OMNISAVE - HOME
// ============================================================

export async function fetchHomeData() {
  return fetchAPI(`${API_CONFIG.BFF_BASE}/home`)
}

// ============================================================
// OMNISAVE - SEARCH
// ============================================================

export async function searchContent(query, page = 1, type = 'all') {
  const q = query?.trim() || 'action'
  const params = new URLSearchParams({ q, page: page.toString(), ...(type !== 'all' && { type }) })
  return fetchAPI(`${API_CONFIG.BFF_BASE}/search?${params}`)
}

export async function searchContentItems(query, page = 1, type = 'all') {
  const q = query?.trim() || 'action'
  const params = new URLSearchParams({ q, page: page.toString(), ...(type !== 'all' && { type }) })
  return fetchAPI(`${API_CONFIG.BFF_BASE}/search?${params}`)
}

export function getSearchItems(searchData) {
  return searchData?.data?.items || searchData?.data?.subjectList || []
}

export function getSearchPager(searchData) {
  return searchData?.data?.pager || { hasMore: false, nextPage: null, page: 0, perPage: 15, totalCount: 0 }
}

// ============================================================
// OMNISAVE - DETAIL
// ============================================================

export async function fetchMovieDetail(subjectId) {
  return fetchAPI(`${API_CONFIG.BFF_BASE}/detail?subjectId=${subjectId}`)
}

// ============================================================
// NAIJAPRAY - SEARCH
// ============================================================

export async function searchNaijaPrayMovies(query, page = 1) {
  try {
    const perPage = 20
    const url = `${NAIJAPRAY_WP_API}?search=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&_embed`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    
    const posts = await response.json()
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
    
    const items = posts.map(post => {
      const title = post.title.rendered
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null
      const year = post.date?.split('-')[0] || ''
      const rating = extractRating(title)
      const isSeries = /season/i.test(title)
      const cleanName = extractCleanName(title)
      const cleanSlug = slugify(cleanName)
      
      return {
        id: post.slug,
        subjectId: post.slug,
        title: cleanName,
        fullTitle: title,
        poster: featuredImage || '',
        cover: featuredImage ? { url: featuredImage } : null,
        year,
        rating,
        imdbRatingValue: rating,
        type: isSeries ? 'series' : 'movie',
        genre: isSeries ? 'TV Series' : 'Movie',
        releaseDate: post.date,
        isNaijaPray: true,
        naijaSlug: post.slug,
        naijaLink: post.link,
        naijaCleanSlug: cleanSlug,
        naijaYear: year,
        naijaIsSeries: isSeries,
      }
    })
    
    return { items, hasMore: page < totalPages, page, totalPages }
  } catch (error) {
    console.error('NaijaPray search failed:', error)
    return { items: [], hasMore: false, page: 1, totalPages: 0 }
  }
}

export function buildNaijaPrayDownloadUrl({ cleanSlug, year, season, episode, isSeries }) {
  if (isSeries && season && episode) {
    return `${NAIJAPRAY_DOWNLOAD_BASE}-${cleanSlug}-${year}-season-${season}-episode-${episode}/`
  }
  return `${NAIJAPRAY_DOWNLOAD_BASE}-${cleanSlug}/`
}

export async function getNaijaPrayPostBySlug(slug) {
  try {
    const url = `${NAIJAPRAY_WP_API}?slug=${encodeURIComponent(slug)}&_embed`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const posts = await response.json()
    
    if (posts && posts.length > 0) {
      const post = posts[0]
      const title = post.title.rendered
      return {
        title: extractCleanName(title),
        fullTitle: title,
        cleanSlug: slugify(extractCleanName(title)),
        year: post.date?.split('-')[0] || '',
        isSeries: /season/i.test(title),
        slug: post.slug,
        link: post.link,
        content: post.content?.rendered || '',
        featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      }
    }
    return null
  } catch (error) {
    console.error('Get NaijaPray post failed:', error)
    return null
  }
}

// ============================================================
// HELPERS
// ============================================================

function extractCleanName(title) {
  return title.replace(/\s*\(?\d{4}\)?\s*/g, '').replace(/\s*Season\s*\d+.*$/i, '').replace(/\s*\[.*?\]/g, '').replace(/\s*–.*$/, '').trim()
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function extractRating(title) {
  const match = title.match(/(\d+\.?\d*)\/10/)
  return match ? match[1] : 'N/A'
}

// ============================================================
// TRANSFORMERS
// ============================================================

export function transformSubject(subject) {
  if (!subject) return null
  return {
    id: subject.subjectId,
    subjectId: subject.subjectId,
    title: subject.title || 'Untitled',
    type: subject.subjectType === 1 ? 'movie' : 'series',
    poster: subject.cover?.url || '',
    backdrop: subject.cover?.url || '',
    description: subject.description || '',
    genres: subject.genre?.split(',').map(g => g.trim()) || [],
    rating: parseFloat(subject.imdbRatingValue) || 0,
    year: subject.releaseDate?.split('-')[0] || '',
    country: subject.countryName || '',
    duration: subject.duration || 0,
    hasResource: subject.hasResource || false,
    cover: subject.cover || null,
    imdbRatingValue: subject.imdbRatingValue || 'N/A',
    genre: subject.genre || '',
    releaseDate: subject.releaseDate || '',
    detailPath: subject.detailPath || '',
    trailer: subject.trailer || null,
    dubs: subject.dubs || [],
    subtitleLanguages: subject.subtitles?.split(',').map(s => s.trim()) || [],
  }
}

export function transformDetailResponse(data) {
  if (!data?.data) return null
  const subject = data.data.subject
  const stars = data.data.stars || []
  const resource = data.data.resource || {}
  
  return {
    ...transformSubject(subject),
    cast: stars.filter(s => s.staffType === 1).map(s => ({
      id: s.staffId, name: s.name, character: s.character,
      avatar: s.avatarUrl || '',
    })),
    crew: stars.filter(s => s.staffType === 2 || s.staffType === 3).map(s => ({
      id: s.staffId, name: s.name,
      role: s.character || (s.staffType === 2 ? 'Director' : 'Writer'),
      avatar: s.avatarUrl || '',
    })),
    source: resource.source || '',
    uploadedBy: resource.uploadBy || '',
    seasons: resource.seasons || [],
    audioDubs: (subject.dubs || []).filter(d => d.type === 0),
    subtitleDubs: (subject.dubs || []).filter(d => d.type === 1),
    metadata: data.data.metadata || {},
  }
}

// ============================================================
// UTILITIES
// ============================================================

export function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return 'N/A'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function formatDuration(seconds) {
  if (!seconds) return 'N/A'
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  if (hours > 0) return `${hours}h ${minutes}m`
  return `${minutes}m`
}

export function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function getMovieSections(homeData) {
  return (homeData?.data?.operatingList?.filter(op => op.type === 'SUBJECTS_MOVIE') || [])
    .map(s => ({ id: s.opId, title: s.title, subjects: s.subjects || [] }))
}

export function getBannerItems(homeData) {
  return homeData?.data?.operatingList?.find(op => op.type === 'BANNER')?.banner?.items || []
}

export function getSearchResults(searchData) {
  return searchData?.data?.subjectList || []
}

export function getPagination(searchData) {
  return searchData?.data?.pager || { hasMore: false, nextPage: null, page: 0, perPage: 18 }
}

export function getDetailUrl(subject) {
  if (subject.detailPath) return `/detail/${subject.detailPath}`
  if (subject.id || subject.subjectId) return `/detail/${subject.id || subject.subjectId}`
  return '/'
}