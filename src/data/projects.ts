export type ProjectCategory = 'Music Videos' | 'Commercials'

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
  youtubeId: string
  imageUrl: string
  imageAlt: string
  description?: string
  credits?: ProjectCredits
}

export const ytThumb = (id: string) =>
  `https://img.youtube.com/vi/${id}/sddefault.jpg`

export const getEmbedUrl = (project: Project): string =>
  `https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0`

// ── Playlist: Trivenzaa Music Videos ─────────────────────────────────────────
// ── Playlist: Trivenzaa Commercials ──────────────────────────────────────────

export const projects: Project[] = [
  // Music Videos
  {
    id: 'mv-1',
    title: 'First Love',
    category: 'Music Videos',
    year: '2025',
    youtubeId: 'hNGRpAN_jco',
    imageUrl: ytThumb('hNGRpAN_jco'),
    imageAlt: 'First Love',
  },
  {
    id: 'mv-2',
    title: 'Fitness Music Video',
    category: 'Music Videos',
    year: '2025',
    youtubeId: 'Z5JpXGDOKZ0',
    imageUrl: ytThumb('Z5JpXGDOKZ0'),
    imageAlt: 'Fitness Music Video',
  },
  {
    id: 'mv-3',
    title: 'Awari Reimagined',
    category: 'Music Videos',
    year: '2025',
    youtubeId: '01CXAVTPDdo',
    imageUrl: ytThumb('01CXAVTPDdo'),
    imageAlt: 'Awari Reimagined',
  },
  {
    id: 'mv-4',
    title: 'Chandu Champion Reimagined',
    category: 'Music Videos',
    year: '2025',
    youtubeId: 'hyOStGSNKBw',
    imageUrl: ytThumb('hyOStGSNKBw'),
    imageAlt: 'Chandu Champion Reimagined',
  },
  {
    id: 'mv-5',
    title: 'Tumhi Dekho Na – Whispers of Love',
    category: 'Music Videos',
    year: '2025',
    youtubeId: '3E7VpLIfvoE',
    imageUrl: ytThumb('3E7VpLIfvoE'),
    imageAlt: 'Tumhi Dekho Na – Whispers of Love',
  },
  {
    id: 'mv-6',
    title: 'Pardesiya Reimagined',
    category: 'Music Videos',
    year: '2025',
    youtubeId: 'CGrnN0uRZv0',
    imageUrl: ytThumb('CGrnN0uRZv0'),
    imageAlt: 'Pardesiya Reimagined — Chapter 1 of the Tara & Raghav Universe',
  },
  {
    id: 'mv-7',
    title: 'New Year 2025',
    category: 'Music Videos',
    year: '2025',
    youtubeId: 'dBPvrqSx1Bo',
    imageUrl: ytThumb('dBPvrqSx1Bo'),
    imageAlt: 'New Year 2025',
  },
  {
    id: 'mv-8',
    title: 'Jee Karda Reimagined',
    category: 'Music Videos',
    year: '2025',
    youtubeId: 'mH99_reQy6I',
    imageUrl: ytThumb('mH99_reQy6I'),
    imageAlt: 'Jee Karda Reimagined',
  },
  // Commercials
  {
    id: 'cm-1',
    title: 'Lamborghini Huracan',
    category: 'Commercials',
    year: '2025',
    youtubeId: 'm8kuc5Mzkj4',
    imageUrl: ytThumb('m8kuc5Mzkj4'),
    imageAlt: 'Lamborghini Huracan',
  },
  {
    id: 'cm-2',
    title: 'The Dude Brand Skin Care',
    category: 'Commercials',
    year: '2025',
    youtubeId: 'j4bo2ZiD8kk',
    imageUrl: ytThumb('j4bo2ZiD8kk'),
    imageAlt: 'The Dude Brand Skin Care',
  },
  {
    id: 'cm-3',
    title: 'Sunglasses Brand Promo Cliqlens',
    category: 'Commercials',
    year: '2025',
    youtubeId: 'E1Jb0lr2GPc',
    imageUrl: ytThumb('E1Jb0lr2GPc'),
    imageAlt: 'Sunglasses Brand Promo Cliqlens',
  },
  {
    id: 'cm-4',
    title: 'Beard Growth Oil & Beard Serum from The Dude',
    category: 'Commercials',
    year: '2025',
    youtubeId: 'A9p5NKb2k3M',
    imageUrl: ytThumb('A9p5NKb2k3M'),
    imageAlt: 'Beard Growth Oil & Beard Serum from The Dude',
  },
]
