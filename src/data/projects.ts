export type ProjectCategory = 'Music Videos' | 'Short Films' | 'Micro Series' | 'Commercials'

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
  youtubeId?: string      // YouTube video ID
  instagramId?: string    // Instagram Reel ID — embed: instagram.com/reel/[ID]/embed/
  imageUrl: string        // Thumbnail image URL
  imageAlt: string
  colSpan: 4 | 6 | 8 | 12
  offsetClass?: string
  aspectClass: string
  description?: string
  credits?: ProjectCredits
}

// Helpers — build embed and thumbnail URLs
export const ytThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/sddefault.jpg`

// Dark placeholder for Instagram (no public thumbnail API)
export const igPlaceholder = '/media/ig-placeholder.svg'

// Returns the iframe embed URL for a project
export const getEmbedUrl = (project: Project): string | undefined => {
  if (project.youtubeId)
    return `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`
  if (project.instagramId)
    return `https://www.instagram.com/reel/${project.instagramId}/embed/`
  return undefined
}

// ── REAL VIDEOS ─────────────────────────────────────────────────────────────
// Titles are placeholders — update when real titles are provided
// YouTube IDs: qDH3o4qQ3Bo | L3yb7QUJkwo | _vY4h25Vo1c | wzD0vJm2vV4
// ─────────────────────────────────────────────────────────────────────────────

// Used on the Home page "Featured Narrative" section — all 4 real videos
export const homeFeaturedProjects: Project[] = [
  {
    id: 'video-1',
    title: 'MIDNIGHT OBSIDIAN',          // placeholder — replace with real title
    category: 'Music Videos',
    year: '2024',
    youtubeId: 'qDH3o4qQ3Bo',
    imageUrl: ytThumb('qDH3o4qQ3Bo'),
    imageAlt: 'Trivenzaa production video 1',
    colSpan: 8,
    aspectClass: 'aspect-video',
  },
  {
    id: 'video-2',
    title: 'CHROME VAPOR',               // placeholder — replace with real title
    category: 'Short Films',
    year: '2024',
    youtubeId: 'L3yb7QUJkwo',
    imageUrl: ytThumb('L3yb7QUJkwo'),
    imageAlt: 'Trivenzaa production video 2',
    colSpan: 4,
    offsetClass: 'md:mt-24',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'video-3',
    title: 'NEON LATITUDE',              // placeholder — replace with real title
    category: 'Micro Series',
    year: '2024',
    youtubeId: '_vY4h25Vo1c',
    imageUrl: ytThumb('_vY4h25Vo1c'),
    imageAlt: 'Trivenzaa production video 3',
    colSpan: 4,
    offsetClass: 'md:-mt-12',
    aspectClass: 'aspect-square',
  },
  {
    id: 'video-4',
    title: 'SOVEREIGN LENS',             // placeholder — replace with real title
    category: 'Music Videos',
    year: '2024',
    youtubeId: 'wzD0vJm2vV4',
    imageUrl: ytThumb('wzD0vJm2vV4'),
    imageAlt: 'Trivenzaa production video 4',
    colSpan: 8,
    aspectClass: 'aspect-[21/9]',
  },
]

// Used on the Our Work page — all 10 videos
export const projects: Project[] = [
  {
    id: 'video-1',
    title: 'MIDNIGHT OBSIDIAN',
    category: 'Music Videos',
    year: '2024',
    youtubeId: 'qDH3o4qQ3Bo',
    imageUrl: ytThumb('qDH3o4qQ3Bo'),
    imageAlt: 'Trivenzaa production video 1',
    colSpan: 8,
    aspectClass: 'aspect-video',
    description: 'A high-energy music video exploring the raw emotions of longing and identity, shot across the Bay Area with a cinematic noir palette.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Lead Actor TBD', 'Supporting Cast TBD'],
      crew: ['Director of Photography', 'Sound Design', 'Color Grading'],
    },
  },
  {
    id: 'video-2',
    title: 'CHROME VAPOR',
    category: 'Short Films',
    year: '2024',
    youtubeId: 'L3yb7QUJkwo',
    imageUrl: ytThumb('L3yb7QUJkwo'),
    imageAlt: 'Trivenzaa production video 2',
    colSpan: 4,
    offsetClass: 'md:mt-24',
    aspectClass: 'aspect-[3/4]',
    description: 'A short film about a dancer\'s journey through self-discovery, blending contemporary movement with emotional storytelling.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Lead Actor TBD'],
      crew: ['Cinematographer', 'Editor', 'Sound Mix'],
    },
  },
  {
    id: 'video-3',
    title: 'NEON LATITUDE',
    category: 'Micro Series',
    year: '2024',
    youtubeId: '_vY4h25Vo1c',
    imageUrl: ytThumb('_vY4h25Vo1c'),
    imageAlt: 'Trivenzaa production video 3',
    colSpan: 12,
    aspectClass: 'aspect-[21/9]',
    description: 'Episode one of a micro-series following three immigrants navigating the American dream — bold, real, and unapologetically human.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Lead Actor TBD', 'Supporting Cast TBD'],
      crew: ['Director of Photography', 'Production Designer', 'Editor'],
    },
  },
  {
    id: 'video-4',
    title: 'SOVEREIGN LENS',
    category: 'Commercials',
    year: '2024',
    youtubeId: 'wzD0vJm2vV4',
    imageUrl: ytThumb('wzD0vJm2vV4'),
    imageAlt: 'Trivenzaa production video 4',
    colSpan: 12,
    aspectClass: 'aspect-video',
    description: 'A brand commercial built around the power of presence — shot in one location with dramatic lighting and minimal dialogue to let the product speak.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Brand Talent TBD'],
      crew: ['Director of Photography', 'Gaffer', 'Color Grade'],
    },
  },
  {
    id: 'ig-1',
    title: 'REEL — DWAjVMbCPAA',
    category: 'Music Videos',
    year: '2025',
    instagramId: 'DWAjVMbCPAA',
    imageUrl: igPlaceholder,
    imageAlt: 'Trivenzaa Instagram Reel',
    colSpan: 6,
    aspectClass: 'aspect-video',
    description: 'A Trivenzaa original reel showcasing cinematic storytelling through the art of movement and emotion.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Cast TBD'],
      crew: ['Director of Photography', 'Editor'],
    },
  },
  {
    id: 'ig-2',
    title: 'REEL — DVpwyXzEwJb',
    category: 'Short Films',
    year: '2025',
    instagramId: 'DVpwyXzEwJb',
    imageUrl: igPlaceholder,
    imageAlt: 'Trivenzaa Instagram Reel',
    colSpan: 6,
    aspectClass: 'aspect-video',
    description: 'A Trivenzaa short film reel — raw, real, and visually driven.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Cast TBD'],
      crew: ['Cinematographer', 'Editor'],
    },
  },
  {
    id: 'ig-3',
    title: 'REEL — DUvku9Mk39n',
    category: 'Commercials',
    year: '2025',
    instagramId: 'DUvku9Mk39n',
    imageUrl: igPlaceholder,
    imageAlt: 'Trivenzaa Instagram Reel',
    colSpan: 8,
    aspectClass: 'aspect-video',
    description: 'A high-impact commercial reel capturing brand essence through cinematic visuals.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Talent TBD'],
      crew: ['Director of Photography', 'Color Grade'],
    },
  },
  {
    id: 'ig-4',
    title: 'REEL — DTLzZxyk_9F',
    category: 'Micro Series',
    year: '2025',
    instagramId: 'DTLzZxyk_9F',
    imageUrl: igPlaceholder,
    imageAlt: 'Trivenzaa Instagram Reel',
    colSpan: 4,
    aspectClass: 'aspect-video',
    description: 'A micro-series episode exploring everyday stories through an intimate cinematic lens.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Cast TBD'],
      crew: ['Cinematographer', 'Editor'],
    },
  },
  {
    id: 'ig-5',
    title: 'REEL — DQwu1KwE6U2',
    category: 'Short Films',
    year: '2025',
    instagramId: 'DQwu1KwE6U2',
    imageUrl: igPlaceholder,
    imageAlt: 'Trivenzaa Instagram Reel',
    colSpan: 4,
    aspectClass: 'aspect-video',
    description: 'A short film reel that blends personal narrative with striking visual composition.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Cast TBD'],
      crew: ['Director of Photography', 'Sound', 'Editor'],
    },
  },
  {
    id: 'ig-6',
    title: 'REEL — DK3WUiRRZkc',
    category: 'Music Videos',
    year: '2025',
    instagramId: 'DK3WUiRRZkc',
    imageUrl: igPlaceholder,
    imageAlt: 'Trivenzaa Instagram Reel',
    colSpan: 8,
    aspectClass: 'aspect-video',
    description: 'A music video reel that combines bold choreography with cinematic production design.',
    credits: {
      director: 'Sumeet Agrawal',
      actors: ['Performer TBD'],
      crew: ['Director of Photography', 'Sound Design', 'Color Grading'],
    },
  },
]
