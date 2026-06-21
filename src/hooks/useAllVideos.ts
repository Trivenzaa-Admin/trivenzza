import type { Project, ProjectCategory } from '../data/projects'
import { ytThumb, driveThumbd } from '../data/projects'
import videoData from '../data/videoData.json'

interface RawYT {
  videoId: string
  title: string
  category: string
  year: string
}

interface RawDrive {
  id: string
  name: string
  createdTime?: string
}

function normalizeCategory(raw: string): ProjectCategory | null {
  const lower = raw.toLowerCase()
  if (lower.includes('music')) return 'Music Videos'
  if (lower.includes('commercial')) return 'Commercials'
  if (lower.includes('short') || lower.includes('micro') || lower.includes('series')) return 'Short Films & Micro Series'
  return null
}

function buildProjects(): Project[] {
  const ytProjects: Project[] = (videoData.ytVideos as RawYT[]).map((v, i) => ({
    id: `yt-${v.videoId}-${i}`,
    title: v.title,
    category: v.category as ProjectCategory,
    year: v.year,
    youtubeId: v.videoId,
    imageUrl: ytThumb(v.videoId),
    imageAlt: v.title,
  }))

  const driveProjects: Project[] = (videoData.driveFiles as RawDrive[]).flatMap(file => {
    // Skip non-video files (Google Vids, Docs etc. — they have no video extension)
    if (!/\.(mp4|mov|avi|mkv|webm|wmv|flv|m4v)$/i.test(file.name)) return []
    const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '').trim()
    const colonIdx = nameWithoutExt.indexOf(':')
    if (colonIdx === -1) return []
    const rawCategory = nameWithoutExt.slice(0, colonIdx).trim()
    const rawTitle = nameWithoutExt.slice(colonIdx + 1).trim()
    if (!rawTitle) return []
    const category = normalizeCategory(rawCategory)
    if (!category) return []
    const year = file.createdTime
      ? new Date(file.createdTime).getFullYear().toString()
      : '2025'
    return [{
      id: `drive-${file.id}`,
      title: rawTitle,
      category,
      year,
      driveId: file.id,
      imageUrl: driveThumbd(file.id),
      imageAlt: rawTitle,
    }]
  })

  return [...ytProjects, ...driveProjects]
}

const allProjects = buildProjects()

export function useAllVideos() {
  return { projects: allProjects, loading: false }
}
