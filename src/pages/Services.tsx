import { Link } from 'react-router-dom'
import ServiceCard from '../components/ui/ServiceCard'
import { services } from '../data/services'
import { servicesContent } from '../data/siteContent'

export default function Services() {
  const content = servicesContent

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 bg-background">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-secondary" />
            <span className="text-secondary text-xs font-label tracking-[0.3em] uppercase">
              What We Do
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface leading-[1.05] max-w-4xl mb-6">
            {content.heroHeadlinePart1}{' '}
            <span className="italic text-primary">{content.heroHeadlineItalic}</span>{' '}
            {content.heroHeadlinePart2}
          </h1>
          <p className="text-on-surface-variant text-sm md:text-base font-body leading-relaxed max-w-xl">
            {content.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ===== SERVICES GRID ===== */}
      <section className="px-6 md:px-12 bg-background pb-16 md:pb-24">
        <div className="max-w-screen-2xl mx-auto">
          {/* gap-px with bg-outline-variant/10 creates subtle dividers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>


    </main>
  )
}
