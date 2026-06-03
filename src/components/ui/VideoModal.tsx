import { useEffect } from 'react'
import type { Project } from '../../data/projects'
import { getEmbedUrl } from '../../data/projects'

interface VideoModalProps {
  project: Project
  onClose: () => void
}

export default function VideoModal({ project, onClose }: VideoModalProps) {
  const embedUrl = getEmbedUrl(project)


  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[300] overflow-y-auto"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="fixed top-5 right-5 w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors duration-200 z-10 bg-black/60 backdrop-blur-sm"
        aria-label="Close"
      >
        <span className="material-symbols-outlined text-2xl">close</span>
      </button>

      {/* Content — stop propagation so clicking inside doesn't close */}
      <div
        className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-16"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Video Player */}
        <div className="w-full bg-black mb-8 aspect-video">
          <iframe
            src={embedUrl}
            title={project.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            className="w-full h-full"
            style={{ overflow: 'hidden' }}
          />
        </div>

        {/* Category + Year */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary text-[10px] font-label tracking-[0.35em] uppercase">
            {project.category}
          </span>
          <span className="w-4 h-px bg-outline-variant/40" />
          <span className="text-on-surface-variant text-[10px] font-label tracking-widest">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight mb-6">
          {project.title}
        </h2>

        <div className="w-full h-px bg-outline-variant/20 mb-6" />

        {/* Description */}
        {project.description && (
          <div className="mb-8">
            <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
              About this Project
            </p>
            <p className="text-on-surface text-sm md:text-base font-body leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {/* Credits */}
        {project.credits && (
          <div>
            <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-4">
              Credits
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-outline-variant/10">

              {project.credits.director && (
                <div className="bg-surface-container-lowest px-5 py-4">
                  <p className="text-on-surface-variant text-[10px] font-label tracking-widest uppercase mb-2">
                    Director
                  </p>
                  <p className="text-on-surface text-sm font-headline">
                    {project.credits.director}
                  </p>
                </div>
              )}

              {project.credits.actors && project.credits.actors.length > 0 && (
                <div className="bg-surface-container-lowest px-5 py-4">
                  <p className="text-on-surface-variant text-[10px] font-label tracking-widest uppercase mb-2">
                    Actors
                  </p>
                  <div className="flex flex-col gap-1">
                    {project.credits.actors.map((actor) => (
                      <p key={actor} className="text-on-surface text-sm font-body">{actor}</p>
                    ))}
                  </div>
                </div>
              )}

              {project.credits.crew && project.credits.crew.length > 0 && (
                <div className="bg-surface-container-lowest px-5 py-4">
                  <p className="text-on-surface-variant text-[10px] font-label tracking-widest uppercase mb-2">
                    Crew
                  </p>
                  <div className="flex flex-col gap-1">
                    {project.credits.crew.map((member) => (
                      <p key={member} className="text-on-surface text-sm font-body">{member}</p>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  )
}
