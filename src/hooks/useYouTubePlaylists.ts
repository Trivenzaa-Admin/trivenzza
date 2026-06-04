import { useState, useEffect } from 'react'
import type { Project, ProjectCategory } from '../data/projects'
import { ytThumb } from '../data/projects'
import { PLAYLISTS } from '../data/playlists'

// In-memory cache so navigating away and back doesn't re-fetch
let cache: Project[] | null = null

async function fetchXML(url: string): Promise<string> {
  // Try direct fetch first (works if YouTube sends CORS headers)
  try {
    const res = await fetch(url)
    if (res.ok) return await res.text()
  } catch {}
  // Fall back to CORS proxy
  const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
  if (!res.ok) throw new Error('proxy fetch failed')
  const { contents } = await res.json()
  return contents ?? ''
}

async function fetchPlaylist(playlistId: string, category: ProjectCategory): Promise<Project[]> {
  const xml = await fetchXML(
    `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`
  )
  if (!xml) return []

  const doc = new DOMParser().parseFromString(xml, 'text/xml')

  return Array.from(doc.querySelectorAll('entry')).flatMap((entry, i) => {
    // <id>yt:video:VIDEO_ID</id>
    const rawId = entry.querySelector('id')?.textContent ?? ''
    const videoId = rawId.replace('yt:video:', '').trim()
    if (!videoId) return []

    const title = entry.querySelector('title')?.textContent?.trim() ?? `Video ${i + 1}`
    const published = entry.querySelector('published')?.textContent ?? ''
    const year = published ? new Date(published).getFullYear().toString() : '2025'

    return [{
      id: `${playlistId}-${i}`,
      title,
      category,
      year,
      youtubeId: videoId,
      imageUrl: ytThumb(videoId),
      imageAlt: title,
    }]
  })
}

export function useYouTubePlaylists() {
  const [projects, setProjects] = useState<Project[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache !== null) return
    let cancelled = false

    Promise.all(PLAYLISTS.map(p => fetchPlaylist(p.id, p.category)))
      .then(results => {
        if (!cancelled) {
          cache = results.flat()
          setProjects(cache)
          setLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return { projects, loading }
}
