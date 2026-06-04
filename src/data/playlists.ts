import type { ProjectCategory } from './projects'

// Add new playlists here — category name is derived from the YouTube playlist name
// (strip "Trivenzaa " prefix). Order here controls the filter tab order on the Work page.
export const PLAYLISTS: { id: string; category: ProjectCategory }[] = [
  { id: 'PLTPg_kv3Bv_TLvdeEJh4EmFqMQiOtVu1j', category: 'Music Videos' },
  { id: 'PLTPg_kv3Bv_Q8KUMafPxj634luBXAjBbD', category: 'Short Films & Micro Series' },
  { id: 'PLTPg_kv3Bv_TTaWjcv8jHgPmxbeflcsYR', category: 'Commercials' },
]
