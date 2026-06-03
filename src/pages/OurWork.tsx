import { useState } from 'react'
import VideoModal from '../components/ui/VideoModal'
import { projects, getEmbedUrl } from '../data/projects'
import type { Project, ProjectCategory } from '../data/projects'

type FilterTab = 'All Projects' | ProjectCategory

const filterTabs: FilterTab[] = ['All Projects', 'Music Videos', 'Commercials']

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All Projects')
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const filteredProjects =
    activeFilter === 'All Projects'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="pt-28 md:pt-36 pb-8 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-secondary" />
            <span className="text-secondary text-xs font-label tracking-[0.3em] uppercase">
              Portfolio
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-7xl lg:text-8xl font-bold text-on-surface leading-[1.05] mb-4">
            Our Stories{' '}
            <span className="italic text-primary">in Motion</span>
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base font-body leading-relaxed max-w-xl mb-10">
            From award-winning music videos to socially driven short films and micro-series, we create stories that inspire, connect, and entertain.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-2 pb-8 border-b border-outline-variant/20">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 text-xs font-label tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === tab
                    ? 'bg-surface-container-highest text-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/10">
              {filteredProjects.map((project) => {
                const embedUrl = getEmbedUrl(project)
                return (
                  <div
                    key={project.id}
                    className="bg-background group cursor-pointer"
                    onClick={() => { if (embedUrl) setActiveProject(project) }}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden aspect-video bg-surface-container-low">
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-95 transition-all duration-500 group-hover:scale-105"
                      />
                      {/* Overlay + play button */}
                      <div className="absolute inset-0 video-card-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
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
                    </div>

                    {/* Info */}
                    <div className="px-5 py-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-on-surface font-headline text-sm leading-snug group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </p>
                        <p className="text-on-surface-variant text-[10px] font-label tracking-widest uppercase mt-1">
                          {project.category}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300 text-base flex-shrink-0">
                        arrow_outward
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-on-surface-variant font-body text-sm">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {activeProject && (
        <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </main>
  )
}
