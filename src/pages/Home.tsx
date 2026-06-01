import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { asset } from '../utils/asset'
import VideoModal from '../components/ui/VideoModal'
import HomeCarousel from '../components/ui/HomeCarousel'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { heroContent } from '../data/siteContent'

export default function Home() {
  const hero = heroContent.home
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const awardPhotos = [
    { src: asset('/media/awards/img_1845.png'),     alt: 'Trivenzaa award moment',                                label: null },
    { src: asset('/media/awards/img_1848.png'),     alt: 'Trivenzaa award moment',                                label: null },
    { src: asset('/media/awards/award_1.png'),      alt: 'Trivenzaa award',                                       label: null },
    { src: asset('/media/awards/baca_award_1.png'), alt: 'Bollywood America Cine Awards — BACA',                  label: 'BACA Awards' },
    { src: asset('/media/awards/baca_award_2.jpg'), alt: 'Trivenzaa team receiving BACA Best Music Video award',  label: 'BACA Awards — Best Music Video' },
  ]

  const AWARD_CARD_W = 400
  const AWARD_CARD_GAP = 16
  const AWARD_CARD_SLOT = AWARD_CARD_W + AWARD_CARD_GAP
  const awardsItems = [...awardPhotos, ...awardPhotos, ...awardPhotos]
  const awardsOneSet = AWARD_CARD_SLOT * awardPhotos.length

  const awardsStripRef = useRef<HTMLDivElement>(null)
  const awardsXRef = useRef(0)
  const awardsPausedRef = useRef(false)
  const awardsRafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    function animate() {
      if (!awardsPausedRef.current) {
        awardsXRef.current += 0.6
        if (awardsXRef.current >= awardsOneSet) awardsXRef.current -= awardsOneSet
      }
      if (awardsStripRef.current) {
        awardsStripRef.current.style.transform = `translateX(-${awardsXRef.current}px)`
      }
      awardsRafRef.current = requestAnimationFrame(animate)
    }
    awardsRafRef.current = requestAnimationFrame(animate)
    return () => { if (awardsRafRef.current) cancelAnimationFrame(awardsRafRef.current) }
  }, [awardsOneSet])

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={hero.backgroundImage}
            alt="Cinematic hero background"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 noir-gradient-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 pb-14 md:pb-20 w-full">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-secondary" />
            <span className="text-secondary text-xs font-label tracking-[0.3em] uppercase">
              {hero.label}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-semibold text-on-surface leading-[1.05] max-w-3xl mb-6">
            {hero.headlinePart1}{' '}
            <span className="italic text-primary">{hero.headlineItalic}</span>
          </h1>

          {/* Body */}
          <p className="text-on-surface-variant text-sm md:text-base font-body leading-relaxed max-w-md mb-10">
            {hero.body}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/work"
              className="px-8 py-3 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-inverse-primary active:scale-95"
            >
              View Our Work
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 border border-on-surface/30 text-on-surface text-xs font-label font-semibold tracking-widest uppercase transition-all duration-300 hover:border-primary hover:text-primary active:scale-95"
            >
              The Studio
            </Link>
          </div>

          {/* Page indicator */}
          <div className="absolute bottom-8 right-12 hidden md:flex items-center gap-3">
            <span className="font-headline text-5xl text-on-surface/10 italic font-bold">01</span>
            <span className="w-px h-12 bg-outline-variant/40" />
          </div>
        </div>
      </section>

      {/* ===== FEATURED NARRATIVE ===== */}
      <section className="py-10 md:py-14 px-6 md:px-12 bg-background">
        {/* Section header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
              Featured Narrative
            </p>
            <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight">
              Visual texture. Emotional resonance.
            </h2>
          </div>
          <Link
            to="/work"
            className="hidden md:flex items-center gap-2 text-secondary text-xs font-label tracking-widest uppercase hover:gap-4 transition-all duration-300"
          >
            All Projects
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

        {/* Infinite carousel — all 10 videos */}
        <HomeCarousel
          projects={projects}
          onVideoOpen={(project) => setActiveProject(project)}
        />

        {/* Mobile "all projects" link */}
        <div className="mt-10 flex md:hidden">
          <Link
            to="/work"
            className="flex items-center gap-2 text-secondary text-xs font-label tracking-widest uppercase"
          >
            All Projects
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-surface-container-lowest">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
            Our Services
          </p>
          <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight">
            What We <span className="italic text-primary">Do</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-outline-variant/10">

          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-8 flex flex-col gap-4 group hover:bg-surface-container-low transition-colors duration-300">
            <span className="text-2xl">🎵</span>
            <h3 className="font-headline text-lg text-on-surface leading-snug group-hover:text-primary transition-colors duration-300">
              Personal Music Videos &amp; Short Films
            </h3>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed">
              Be the star of your own story. From concept to final cut — we handle everything.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-8 flex flex-col gap-4 group hover:bg-surface-container-low transition-colors duration-300">
            <span className="text-2xl">📢</span>
            <h3 className="font-headline text-lg text-on-surface leading-snug group-hover:text-primary transition-colors duration-300">
              Commercial Content
            </h3>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed">
              Creative, high-impact content for brands — built for social, digital, and campaigns.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-8 flex flex-col gap-4 group hover:bg-surface-container-low transition-colors duration-300">
            <span className="text-2xl">🏢</span>
            <h3 className="font-headline text-lg text-on-surface leading-snug group-hover:text-primary transition-colors duration-300">
              Enterprise Productions
            </h3>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed">
              Professional video production for corporate events, storytelling, and campaigns.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-inverse-primary active:scale-95"
          >
            Work With Us
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ===== AWARDS ===== */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
            Recognition
          </p>
          <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight mb-10">
            Recognized. Celebrated. <span className="italic text-primary">Trusted.</span>
          </h2>

          {/* Auto-scrolling image strip — pauses on hover */}
          <div
            className="relative overflow-hidden mb-8"
            onMouseEnter={() => { awardsPausedRef.current = true }}
            onMouseLeave={() => { awardsPausedRef.current = false }}
          >
            <div
              ref={awardsStripRef}
              className="flex will-change-transform"
              style={{ gap: AWARD_CARD_GAP, width: `${AWARD_CARD_SLOT * awardsItems.length}px` }}
            >
              {awardsItems.map((photo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 relative overflow-hidden bg-surface-container-low h-64 md:h-[420px]"
                  style={{ width: AWARD_CARD_W }}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-contain brightness-90 hover:brightness-100 transition-brightness duration-500"
                    draggable={false}
                  />
                  {photo.label && (
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-primary text-[10px] font-label tracking-[0.3em] uppercase">
                        {photo.label}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Edge fades */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-16 md:w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-16 md:w-24 bg-gradient-to-l from-background to-transparent z-10" />
          </div>

          {/* Award cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-outline-variant/10">
            <div className="bg-surface-container-lowest p-6 flex items-center gap-4 group hover:bg-surface-container-low transition-colors duration-300">
              <span className="text-2xl shrink-0">🏆</span>
              <div>
                <p className="text-on-surface font-headline text-sm leading-snug group-hover:text-primary transition-colors duration-300">
                  Best Music Video
                </p>
                <p className="text-on-surface-variant text-[10px] font-label tracking-widest uppercase mt-1">
                  BACA Awards
                </p>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 flex items-center gap-4 group hover:bg-surface-container-low transition-colors duration-300">
              <span className="text-2xl shrink-0">🏆</span>
              <div>
                <p className="text-on-surface font-headline text-sm leading-snug group-hover:text-primary transition-colors duration-300">
                  Best Film Script Writer
                </p>
                <p className="text-on-surface-variant text-[10px] font-label tracking-widest uppercase mt-1">
                  LA Film Festival
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== JOIN THE TEAM ===== */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
              We're Hiring
            </p>
            <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight mb-6">
              Join the <span className="italic text-primary">Movement</span>
            </h2>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-4">
              At Trivenzaa, we're building a community of creators — actors, filmmakers, cinematographers, and storytellers.
            </p>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-4">
              We believe in bold ideas, first-principle thinking, and people who are willing to challenge the norm.
            </p>
            <p className="text-on-surface-variant text-sm font-body leading-relaxed mb-8">
              Whether you want to act, direct, shoot, or contribute — this is your stage.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center gap-3 px-8 py-3 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-inverse-primary active:scale-95"
            >
              Join the Team
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          {/* Right — role tags */}
          <div className="flex flex-col gap-px bg-outline-variant/10">
            {['Actors', 'Filmmakers', 'Cinematographers', 'Volunteers'].map((role, i) => (
              <Link
                key={role}
                to={`/join?role=${role}`}
                className="bg-surface-container-lowest px-6 py-5 flex items-center justify-between group hover:bg-surface-container-low transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-primary/40 text-xs font-label tracking-widest">0{i + 1}</span>
                  <span className="font-headline text-lg text-on-surface group-hover:text-primary transition-colors duration-300">
                    {role}
                  </span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 text-base">
                  arrow_forward
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>



      {/* ===== CTA BANNER ===== */}
      <section className="py-14 md:py-20 px-6 md:px-12 bg-background text-center">
        <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-4">
          Let's Create Together
        </p>
        <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl text-on-surface leading-tight mb-8 max-w-2xl mx-auto">
          Ready to{' '}
          <span className="italic text-primary">Capture</span>?
        </h2>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 px-10 py-4 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-[0.3em] uppercase transition-all duration-300 hover:bg-inverse-primary shadow-primary-glow hover:shadow-lg active:scale-95"
        >
          Hire Us
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Link>
      </section>
      {activeProject && (
        <VideoModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </main>
  )
}
