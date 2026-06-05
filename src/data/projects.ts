export type ProjectCategory = 'Music Videos' | 'Commercials' | 'Short Films & Micro Series'

export interface ProjectCredits {
  director?: string
  actors?: string[]
  crew?: string[]
}

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  year: string
  youtubeId?: string
  driveId?: string
  imageUrl: string
  imageAlt: string
  description?: string
  credits?: ProjectCredits
}

export const ytThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/sddefault.jpg`

export const driveThumbd = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w400`

export const getEmbedUrl = (project: Project): string => {
  if (project.youtubeId)
    return `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`
  if (project.driveId)
    return `https://drive.google.com/file/d/${project.driveId}/preview`
  return ''
}
