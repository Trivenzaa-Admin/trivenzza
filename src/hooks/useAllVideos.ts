import { useState, useEffect } from 'react'
import type { Project } from '../data/projects'
import { useYouTubePlaylists } from './useYouTubePlaylists'
import { fetchDriveVideos } from './useGoogleDriveFolder'

export function useAllVideos() {
  const { projects: ytProjects, loading: ytLoading } = useYouTubePlaylists()
  const [driveProjects, setDriveProjects] = useState<Project[]>([])
  const [driveLoading, setDriveLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchDriveVideos()
      .then(videos => {
        if (!cancelled) {
          setDriveProjects(videos)
          setDriveLoading(false)
        }
      })
      .catch(() => {
        if (!cancelled) setDriveLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  return {
    projects: [...ytProjects, ...driveProjects],
    loading: ytLoading || driveLoading,
  }
}
