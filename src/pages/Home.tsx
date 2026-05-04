import { useState } from 'react'
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
  const [awardsIndex, setAwardsIndex] = useState(0)

  const awardPhotos = [
    { src: asset('/media/awards/img_1845.png'),     alt: 'Trivenzaa award moment',                                label: null },
    { src: asset('/media/awards/img_1848.png'),     alt: 'Trivenzaa award moment',                                label: null },
    { src: asset('/media/awards/baca_award_1.png'), alt: 'Bollywood America Cine Awards — BACA',                  label: 'BACA Awards' },
    { src: asset('/media/awards/baca_award_2.jpg'), alt: 'Trivenzaa team receiving BACA Best Music Video award',  label: 'BACA Awards — Best Music Video' },
  ]
  const awardsTotal = awardPhotos.length
  const awardsRight = (awardsIndex + 1) % awardsTotal

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

          {/* 2-up photo carousel — moves 1 image at a time */}
          <div className="mb-8">
            {/* On mobile: single image. On desktop: two images side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {/* Left image — prev arrow always, next arrow on mobile only */}
              <div className="relative overflow-hidden">
                <img
                  key={awardsIndex}
                  src={awardPhotos[awardsIndex].src}
                  alt={awardPhotos[awardsIndex].alt}
                  className="w-full h-auto object-contain brightness-90 hover:brightness-100 transition-all duration-500"
                />
                {awardPhotos[awardsIndex].label && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-primary text-[10px] font-label tracking-[0.3em] uppercase">
                      {awardPhotos[awardsIndex].label}
                    </span>
                  </div>
                )}
                {/* Prev arrow */}
                <button
                  onClick={() => setAwardsIndex((i) => (i - 1 + awardsTotal) % awardsTotal)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-primary-container flex items-center justify-center text-white hover:text-on-primary-container transition-all duration-300"
                  aria-label="Previous"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
                {/* Next arrow — mobile only (desktop next arrow lives on the right image) */}
                <button
                  onClick={() => setAwardsIndex((i) => (i + 1) % awardsTotal)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-primary-container flex items-center justify-center text-white hover:text-on-primary-container transition-all duration-300 lg:hidden"
                  aria-label="Next"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              </div>

              {/* Right image — next arrow. Hidden on mobile so only 1 image shows */}
              <div className="relative overflow-hidden hidden lg:block">
                <img
                  key={awardsRight}
                  src={awardPhotos[awardsRight].src}
                  alt={awardPhotos[awardsRight].alt}
                  className="w-full h-auto object-contain brightness-90 hover:brightness-100 transition-all duration-500"
                />
                {awardPhotos[awardsRight].label && (
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/70 backdrop-blur-sm text-primary text-[10px] font-label tracking-[0.3em] uppercase">
                      {awardPhotos[awardsRight].label}
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setAwardsIndex((i) => (i + 1) % awardsTotal)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 hover:bg-primary-container flex items-center justify-center text-white hover:text-on-primary-container transition-all duration-300"
                  aria-label="Next"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              </div>

            </div>

            {/* Dot indicators + counter */}
            <div className="flex items-center justify-center gap-3 mt-5">
              {awardPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setAwardsIndex(i)}
                  className={`transition-all duration-300 h-1 ${i === awardsIndex ? 'w-8 bg-primary' : 'w-3 bg-outline-variant hover:bg-on-surface-variant'}`}
                  aria-label={`Go to photo ${i + 1}`}
                />
              ))}
              <span className="text-on-surface-variant text-[10px] font-label tracking-widest ml-2">
                {awardsIndex + 1} / {awardsTotal}
              </span>
            </div>
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
              <div
                key={role}
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
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
            Testimonials
          </p>
          <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight mb-10">
            What People Say <span className="italic text-primary">About Us</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/10">

            {[
              {
                name: 'Anika Sharma',
                role: 'Actor',
                rating: 5,
                review: 'Working with Trivenzaa felt like being part of something bigger than just a shoot. The team understood my vision and brought it to life in ways I never imagined.',
              },
              {
                name: 'Rohan Mehta',
                role: 'Music Artist',
                rating: 5,
                review: 'They don\'t just create videos — they create experiences. My music video exceeded every expectation. The attention to detail was extraordinary.',
              },
              {
                name: 'Priya Nair',
                role: 'Brand Manager',
                rating: 5,
                review: 'Our commercial campaign performed 3x better than previous productions. Trivenzaa delivered cinematic quality on a tight deadline without compromising creativity.',
              },
              {
                name: 'Karan Verma',
                role: 'Filmmaker',
                rating: 5,
                review: 'As a fellow filmmaker, I was blown away by their process. Collaborative, professional, and deeply passionate about storytelling. A rare find.',
              },
              {
                name: 'Simran Kaur',
                role: 'Actress & Model',
                rating: 5,
                review: 'Trivenzaa gave me my first real platform to showcase my talent. The short film we did together opened so many doors. I\'m forever grateful.',
              },
              {
                name: 'Dev Anand',
                role: 'Corporate Client',
                rating: 4,
                review: 'Professional, creative, and reliable. Our enterprise video production was handled flawlessly from concept to delivery. Highly recommend for any corporate production.',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-background p-8 flex flex-col gap-5 hover:bg-surface-container-low transition-colors duration-300 group"
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-base ${i < t.rating ? 'text-primary' : 'text-outline-variant/40'}`}
                      style={{ fontVariationSettings: i < t.rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-on-surface-variant text-sm font-body leading-relaxed flex-1">
                  "{t.review}"
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-primary/40 group-hover:w-16 transition-all duration-500" />

                {/* Author */}
                <div>
                  <p className="text-on-surface font-headline text-sm">{t.name}</p>
                  <p className="text-on-surface-variant/60 text-[10px] font-label tracking-widest uppercase mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-on-surface-variant text-xs font-label tracking-[0.3em] uppercase mb-3">
                Upcoming Events
              </p>
              <h2 className="font-headline text-2xl md:text-4xl text-on-surface leading-tight">
                What's <span className="italic text-primary">Next</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-outline-variant/10">

            {[
              {
                type: 'Audition',
                typeColor: 'text-primary',
                typeBg: 'bg-primary/10 border-primary/30',
                title: 'Open Auditions — Short Film',
                date: 'May 15, 2026',
                location: 'San Ramon, CA',
                detail: 'Looking for lead & supporting actors for an upcoming emotional drama short film. All experience levels welcome.',
                status: 'Open',
                statusColor: 'text-primary bg-primary/10',
                icon: 'mic',
              },
              {
                type: 'Shoot',
                typeColor: 'text-secondary',
                typeBg: 'bg-secondary/10 border-secondary/30',
                title: 'Music Video Production',
                date: 'May 28, 2026',
                location: 'Bay Area, CA',
                detail: 'Principal photography for a new Bollywood-fusion music video. Crew & background talent positions available.',
                status: 'Upcoming',
                statusColor: 'text-on-surface-variant bg-surface-container-high',
                icon: 'videocam',
              },
              {
                type: 'Release',
                typeColor: 'text-tertiary',
                typeBg: 'bg-tertiary/10 border-tertiary/30',
                title: 'Short Film Premiere — "Roots"',
                date: 'June 7, 2026',
                location: 'Online & Select Venues',
                detail: 'The premiere of our award-circuit short film exploring identity, belonging, and the immigrant experience.',
                status: 'Coming Soon',
                statusColor: 'text-on-surface-variant bg-surface-container-high',
                icon: 'movie',
              },
              {
                type: 'Audition',
                typeColor: 'text-primary',
                typeBg: 'bg-primary/10 border-primary/30',
                title: 'Cinematographer Call',
                date: 'June 12, 2026',
                location: 'Remote & On-Site',
                detail: 'Seeking a skilled cinematographer for a 3-day commercial shoot. Experience with Sony FX3 or BMPCC preferred.',
                status: 'Open',
                statusColor: 'text-primary bg-primary/10',
                icon: 'photo_camera',
              },
              {
                type: 'Shoot',
                typeColor: 'text-secondary',
                typeBg: 'bg-secondary/10 border-secondary/30',
                title: 'Brand Commercial — TBA',
                date: 'June 20, 2026',
                location: 'San Francisco, CA',
                detail: 'High-energy commercial shoot for a Bay Area lifestyle brand. Talent and crew positions to be announced.',
                status: 'Upcoming',
                statusColor: 'text-on-surface-variant bg-surface-container-high',
                icon: 'campaign',
              },
              {
                type: 'Release',
                typeColor: 'text-tertiary',
                typeBg: 'bg-tertiary/10 border-tertiary/30',
                title: 'Music Video Drop — "Ishq"',
                date: 'July 1, 2026',
                location: 'YouTube & Instagram',
                detail: 'Our latest music video collaboration releases across all platforms. Subscribe and follow for the exclusive premiere.',
                status: 'Coming Soon',
                statusColor: 'text-on-surface-variant bg-surface-container-high',
                icon: 'music_note',
              },
            ].map((event) => (
              <div
                key={event.title}
                className="bg-surface-container-lowest p-8 flex flex-col gap-4 group hover:bg-surface-container-low transition-colors duration-300"
              >
                {/* Type badge + status */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-[10px] font-label tracking-widest uppercase ${event.typeBg} ${event.typeColor}`}>
                    <span className="material-symbols-outlined text-[12px]">{event.icon}</span>
                    {event.type}
                  </span>
                  <span className={`px-2.5 py-1 text-[10px] font-label tracking-widest uppercase ${event.statusColor}`}>
                    {event.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline text-base text-on-surface leading-snug group-hover:text-primary transition-colors duration-300">
                  {event.title}
                </h3>

                {/* Detail */}
                <p className="text-on-surface-variant text-xs font-body leading-relaxed flex-1">
                  {event.detail}
                </p>

                {/* Divider */}
                <div className="w-full h-px bg-outline-variant/15" />

                {/* Date + location */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-on-surface-variant/70">
                    <span className="material-symbols-outlined text-[13px]">calendar_today</span>
                    <span className="text-xs font-label">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-on-surface-variant/70">
                    <span className="material-symbols-outlined text-[13px]">location_on</span>
                    <span className="text-xs font-label">{event.location}</span>
                  </div>
                </div>
              </div>
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
