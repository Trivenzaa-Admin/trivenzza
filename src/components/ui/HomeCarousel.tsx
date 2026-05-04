import { useEffect, useRef } from 'react'
import type { Project } from '../../data/projects'
import { getEmbedUrl } from '../../data/projects'

interface HomeCarouselProps {
  projects: Project[]
  onVideoOpen: (project: Project) => void
}

const CARD_WIDTH = 320  // px — w-80
const CARD_GAP = 20     // px — gap-5
const CARD_SLOT = CARD_WIDTH + CARD_GAP
const SPEED = 0.7       // px per animation frame

export default function HomeCarousel({ projects, onVideoOpen }: HomeCarouselProps) {
  // Triple the array so the seam is never visible
  const items = [...projects, ...projects, ...projects]
  const ONE_SET = CARD_SLOT * projects.length

  const stripRef = useRef<HTMLDivElement>(null)
  const xRef = useRef(0)
  const isPausedRef = useRef(false)
  const rafRef = useRef<number | undefined>(undefined)
  const touchStartXRef = useRef(0)
  const touchLastXRef = useRef(0)

  // RAF animation loop
  useEffect(() => {
    function animate() {
      if (!isPausedRef.current) {
        xRef.current += SPEED
        if (xRef.current >= ONE_SET) xRef.current -= ONE_SET
      }
      if (stripRef.current) {
        stripRef.current.style.transform = `translateX(-${xRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [ONE_SET])

  function shiftByCard(dir: 'left' | 'right') {
    xRef.current += dir === 'right' ? CARD_SLOT : -CARD_SLOT
    if (xRef.current < 0) xRef.current += ONE_SET
    if (xRef.current >= ONE_SET) xRef.current -= ONE_SET
  }

  // Touch handlers for mobile swipe
  function handleTouchStart(e: React.TouchEvent) {
    touchStartXRef.current = e.touches[0].clientX
    touchLastXRef.current = e.touches[0].clientX
    isPausedRef.current = true
  }

  function handleTouchMove(e: React.TouchEvent) {
    const currentX = e.touches[0].clientX
    const delta = touchLastXRef.current - currentX
    xRef.current += delta
    if (xRef.current < 0) xRef.current += ONE_SET
    if (xRef.current >= ONE_SET) xRef.current -= ONE_SET
    touchLastXRef.current = currentX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const totalDelta = Math.abs(touchStartXRef.current - e.changedTouches[0].clientX)
    // If swipe distance was tiny, treat as a tap
    if (totalDelta < 8) {
      // Let onClick on the card handle it
    }
    isPausedRef.current = false
  }

  return (
    <div className="relative">
      {/* Outer clip container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => { isPausedRef.current = true }}
        onMouseLeave={() => { isPausedRef.current = false }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Scrolling strip — absolute so it can extend beyond container */}
        <div
          ref={stripRef}
          className="flex gap-5 will-change-transform"
          style={{ width: `${CARD_SLOT * items.length}px` }}
        >
          {items.map((project, i) => {
            const embedUrl = getEmbedUrl(project)
            return (
              <div
                key={`${project.id}-${i}`}
                className="flex-shrink-0 group cursor-pointer"
                style={{ width: CARD_WIDTH }}
                onClick={() => { if (embedUrl) onVideoOpen(project) }}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-surface-container-low aspect-video">
                  <img
                    src={project.imageUrl}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-95 transition-all duration-500 group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 video-card-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 scale-90 group-hover:scale-100">
                    <div className="w-12 h-12 rounded-full bg-secondary/90 flex items-center justify-center shadow-lg">
                      <span
                        className="material-symbols-outlined text-on-secondary text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-on-surface-variant text-xs font-label tracking-widest uppercase">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card footer */}
                <div className="pt-3 flex items-start justify-between gap-2">
                  <div>
                    <p className="text-on-surface font-headline text-sm leading-tight group-hover:text-primary transition-colors duration-300 truncate">
                      {project.title}
                    </p>
                    <p className="text-on-surface-variant text-xs font-label tracking-widest uppercase mt-1">
                      {project.year}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 text-base flex-shrink-0 mt-0.5">
                    arrow_outward
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Left fade gradient */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-10 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
        {/* Right fade gradient */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />
      </div>

      {/* Arrow buttons */}
      <button
        type="button"
        onClick={() => shiftByCard('left')}
        className="absolute left-3 top-[calc(50%-24px)] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant/30 text-on-surface hover:text-primary hover:border-primary transition-all duration-300"
        aria-label="Previous"
      >
        <span className="material-symbols-outlined text-xl">chevron_left</span>
      </button>
      <button
        type="button"
        onClick={() => shiftByCard('right')}
        className="absolute right-3 top-[calc(50%-24px)] -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-surface-container-lowest/80 backdrop-blur-sm border border-outline-variant/30 text-on-surface hover:text-primary hover:border-primary transition-all duration-300"
        aria-label="Next"
      >
        <span className="material-symbols-outlined text-xl">chevron_right</span>
      </button>
    </div>
  )
}
