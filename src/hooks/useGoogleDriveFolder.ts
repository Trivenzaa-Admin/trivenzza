import { useState, useEffect } from 'react'
import type { Project, ProjectCategory } from '../data/projects'
import { driveThumbd } from '../data/projects'

const FOLDER_ID = '1suxPpKr4oqrALu5-asOB1ejJX_qhaC8X'
// Read-only API key restricted to Google Drive API + trivenzaa.com domain
const API_KEY = 'AIzaSyDWfSteRAyIhaDUYxH_UzxrxzoHmJx_B7k'

function normalizeCategory(raw: string): ProjectCategory | null {
  const lower = raw.toLowerCase()
  if (lower.includes('music')) return 'Music Videos'
  if (lower.includes('commercial')) return 'Commercials'
  if (lower.includes('short') || lower.includes('micro') || lower.includes('series')) return 'Short Films & Micro Series'
  return null
}

function parseFilename(filename: string): { category: ProjectCategory; title: string } | null {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '').trim()
  const colonIdx = nameWithoutExt.indexOf(':')
  if (colonIdx === -1) return null

  const rawCategory = nameWithoutExt.slice(0, colonIdx).trim()
  const rawTitle = nameWithoutExt.slice(colonIdx + 1).trim()
  if (!rawTitle) return null

  const category = normalizeCategory(rawCategory)
  if (!category) return null

  return { category, title: rawTitle }
}

interface DriveFile {
  id: string
  name: string
  createdTime?: string
}

let cache: Project[] | null = null

export async function fetchDriveVideos(): Promise<Project[]> {
  if (cache !== null) return cache

  const params = new URLSearchParams({
    q: `'${FOLDER_ID}' in parents and trashed=false and mimeType contains 'video'`,
    key: API_KEY,
    fields: 'files(id,name,createdTime)',
    orderBy: 'createdTime desc',
  })

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`)
  if (!res.ok) return []

  const { files } = await res.json()
  if (!Array.isArray(files)) return []

  const projects: Project[] = files.flatMap((file: DriveFile) => {
    const parsed = parseFilename(file.name)
    if (!parsed) return []
    const year = file.createdTime
      ? new Date(file.createdTime).getFullYear().toString()
      : '2025'
    return [{
      id: `drive-${file.id}`,
      title: parsed.title,
      category: parsed.category,
      year,
      driveId: file.id,
      imageUrl: driveThumbd(file.id),
      imageAlt: parsed.title,
    }]
  })

  cache = projects
  return projects
}

export function useGoogleDriveFolder() {
  const [projects, setProjects] = useState<Project[]>(cache ?? [])
  const [loading, setLoading] = useState(cache === null)

  useEffect(() => {
    if (cache !== null) return
    let cancelled = false
    fetchDriveVideos()
      .then(videos => {
        if (!cancelled) {
          setProjects(videos)
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
