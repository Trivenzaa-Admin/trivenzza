import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const colSpanClass = `col-span-12 md:col-span-${project.colSpan}`

  return (
    <div
      className={`${colSpanClass} ${project.offsetClass ?? ''} group cursor-pointer`}
      onClick={onClick}
    >
      {/* Image wrapper */}
      <div className={`relative overflow-hidden bg-surface-container-low ${project.aspectClass}`}>
        <img
          src={project.imageUrl}
          alt={project.imageAlt}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-90 transition-all duration-700 group-hover:scale-105"
        />

        {/* Hover play button overlay */}
        <div className="absolute inset-0 video-card-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
          <div className="w-14 h-14 rounded-full bg-secondary/90 flex items-center justify-center shadow-lg">
            <span
              className="material-symbols-outlined text-on-secondary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-on-surface-variant text-xs font-label tracking-widest uppercase">
            {project.category}
          </span>
        </div>
      </div>

      {/* Card content */}
      <div className="pt-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          {/* Metadata row */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-on-surface-variant text-xs font-label tracking-widest uppercase">
              {project.category}
            </span>
            <span className="w-6 h-px bg-outline-variant/40" />
            <span className="text-on-surface-variant text-xs font-label tracking-widest">
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-headline text-on-surface group-hover:text-primary transition-colors duration-300 leading-tight ${
              project.colSpan === 12 ? 'text-2xl md:text-3xl' :
              project.colSpan === 8 ? 'text-xl md:text-2xl' :
              'text-lg md:text-xl'
            }`}
          >
            {project.title}
          </h3>

          {/* Description for wide cards */}
          {project.description && (
            <p className="mt-2 text-on-surface-variant text-sm font-body leading-relaxed max-w-xl hidden md:block">
              {project.description}
            </p>
          )}
        </div>

        {/* Arrow icon */}
        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0">
          arrow_outward
        </span>
      </div>
    </div>
  )
}
