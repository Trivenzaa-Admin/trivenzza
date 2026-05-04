import type { TeamMember } from '../../data/team'

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="group bg-surface hover:bg-surface-container-high transition-colors duration-300 p-6 flex flex-col gap-4">
      {/* Portrait */}
      <div className="relative overflow-hidden aspect-square">
        {/* Color photo — hidden by default, revealed on hover */}
        <img
          src={member.imageUrl}
          alt={member.imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-110 scale-100"
        />
        {/* Sketch / default image */}
        <img
          src={member.sketchImageUrl ?? member.imageUrl}
          alt={member.imageAlt}
          className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:opacity-0 group-hover:scale-110${!member.sketchImageUrl ? ' grayscale brightness-75' : ''}`}
        />
      </div>

      {/* Info */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-headline text-on-surface text-lg tracking-tight">
            {member.name}
          </h3>
          <p className="text-secondary text-xs font-label tracking-widest uppercase">
            {member.title}
          </p>
        </div>
        {member.instagramUrl ? (
          <a
            href={member.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-on-surface-variant group-hover:text-primary transition-colors duration-300 flex-shrink-0 mt-0.5"
            aria-label={`${member.name} on Instagram`}
          >
            <span className="material-symbols-outlined text-xl">share</span>
          </a>
        ) : (
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors duration-300 text-xl flex-shrink-0 mt-0.5">
            share
          </span>
        )}
      </div>

      {/* Bio */}
      <div className="text-on-surface-variant text-sm font-body leading-relaxed flex flex-col gap-3">
        {member.bio.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  )
}
