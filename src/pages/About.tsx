import { Link } from 'react-router-dom'
import TeamCard from '../components/ui/TeamCard'
import { teamMembers } from '../data/team'
import { aboutContent } from '../data/siteContent'

export default function About() {
  const story = aboutContent.story

  return (
    <main>
{/* ===== COMPANY STORY ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden group">
              <img
                src={story.imageUrl}
                alt={story.imageAlt}
                className="w-full aspect-[4/5] object-cover grayscale brightness-75 group-hover:brightness-90 group-hover:grayscale-0 transition-all duration-700"
              />

            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-6 md:pt-8">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-on-surface leading-tight">
              {story.headlinePart1}{' '}
              <span className="italic text-primary">{story.headlineItalic}</span>
            </h2>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              {story.body1}
            </p>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed">
              {story.body2}
            </p>
            <Link
              to="/work"
              className="flex items-center gap-2 text-secondary text-xs font-label tracking-widest uppercase hover:gap-4 transition-all duration-300 mt-2 w-fit"
            >
              Explore our work
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-12 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-12 md:mb-16">
            <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
              Leadership
            </p>
            <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight">
              The <span className="italic text-primary">Visionaries</span>
            </h2>
          </div>

          {/* Team grid — gap-px trick for subtle dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
