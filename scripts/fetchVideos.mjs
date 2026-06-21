import { writeFileSync, existsSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT = join(__dirname, '../src/data/videoData.json')

const PLAYLISTS = [
  { id: 'PLTPg_kv3Bv_TLvdeEJh4EmFqMQiOtVu1j', category: 'Music Videos' },
  { id: 'PLTPg_kv3Bv_Q8KUMafPxj634luBXAjBbD', category: 'Short Films & Micro Series' },
  { id: 'PLTPg_kv3Bv_TTaWjcv8jHgPmxbeflcsYR', category: 'Commercials' },
]

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyF1-rvJJqVluhaCN6suL6w3nGSF0KgN9BIR6xJWUBAb7BRsMS6hS35s2huO4LGgzTxdA/exec?token=triv2025secret'

async function fetchWithTimeout(url, ms = 25000) {
  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(), ms)
  try {
    return await fetch(url, { signal: ac.signal })
  } finally {
    clearTimeout(t)
  }
}

function parseXML(xml, category) {
  const videos = []
  for (const entry of (xml.match(/<entry>([\s\S]*?)<\/entry>/g) || [])) {
    const idM = entry.match(/<id>yt:video:([^<]+)<\/id>/)
    if (!idM) continue
    const titleM = entry.match(/<title>([^<]+)<\/title>/)
    const pubM = entry.match(/<published>([^<]+)<\/published>/)
    const year = pubM ? new Date(pubM[1]).getFullYear().toString() : '2025'
    const title = titleM ? titleM[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim() : ''
    videos.push({ videoId: idM[1].trim(), title, category, year })
  }
  return videos
}

async function fetchPlaylist({ id, category }) {
  try {
    const res = await fetchWithTimeout(
      `https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`
    )
    if (!res.ok) { console.warn(`  [YT] ${category} → HTTP ${res.status}`); return [] }
    const xml = await res.text()
    const vids = parseXML(xml, category)
    console.log(`  [YT] ${category}: ${vids.length} videos`)
    return vids
  } catch (e) {
    console.warn(`  [YT] ${category} failed: ${e.message}`)
    return []
  }
}

async function fetchDriveFiles() {
  try {
    const res = await fetchWithTimeout(APPS_SCRIPT_URL)
    if (!res.ok) { console.warn(`  [Drive] HTTP ${res.status}`); return [] }
    const { files } = await res.json()
    const list = Array.isArray(files) ? files : []
    console.log(`  [Drive] ${list.length} files`)
    return list
  } catch (e) {
    console.warn(`  [Drive] failed: ${e.message}`)
    return []
  }
}

function loadExisting() {
  if (!existsSync(OUTPUT)) return { ytVideos: [], driveFiles: [] }
  try { return JSON.parse(readFileSync(OUTPUT, 'utf8')) } catch { return { ytVideos: [], driveFiles: [] } }
}

async function main() {
  console.log('fetchVideos: fetching data for build...')

  const [ytVideos, driveFiles] = await Promise.all([
    Promise.all(PLAYLISTS.map(fetchPlaylist)).then(r => r.flat()),
    fetchDriveFiles(),
  ])

  const existing = loadExisting()
  const data = {
    ytVideos: ytVideos.length ? ytVideos : existing.ytVideos,
    driveFiles: driveFiles.length ? driveFiles : existing.driveFiles,
    updatedAt: new Date().toISOString(),
  }

  writeFileSync(OUTPUT, JSON.stringify(data, null, 2))
  console.log(`fetchVideos: saved ${data.ytVideos.length} YT + ${data.driveFiles.length} Drive items → src/data/videoData.json`)
}

main().catch(e => {
  console.error('fetchVideos error (non-fatal):', e.message)
})
