import { useState, useEffect } from 'react'
import type { Project, ProjectCategory } from '../data/projects'
import { driveThumbd } from '../data/projects'

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyF1-rvJJqVluhaCN6suL6w3nGSF0KgN9BIR6xJWUBAb7BRsMS6hS35s2huO4LGgzTxdA/exec?token=triv2025secret'

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

function fetchViaJSONP(url: string): Promise<{ files: DriveFile[] }> {
  return new Promise((resolve, reject) => {
    const cbName = `_driveCallback_${Date.now()}`
    const script = document.createElement('script')
    ;(window as Record<string, unknown>)[cbName] = (data: { files: DriveFile[] }) => {
      delete (window as Record<string, unknown>)[cbName]
      document.head.removeChild(script)
      resolve(data)
    }
    script.src = `${url}&callback=${cbName}`
    script.onerror = () => {
      delete (window as Record<string, unknown>)[cbName]
      document.head.removeChild(script)
      reject(new Error('JSONP failed'))
    }
    document.head.appendChild(script)
  })
}

let cache: Project[] | null = null

export async function fetchDriveVideos(): Promise<Project[]> {
  if (cache !== null) return cache

  const { files } = await fetchViaJSONP(APPS_SCRIPT_URL)
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
