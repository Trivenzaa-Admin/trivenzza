import { Link } from 'react-router-dom'
import type { Service } from '../../data/services'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const iconColorClass =
    service.iconColor === 'primary' ? 'text-primary' : 'text-secondary'
  const badgeColorClass =
    service.badgeColor === 'primary'
      ? 'text-primary border-primary/30'
      : 'text-secondary border-secondary/30'

  return (
    <div className="group bg-surface-container-low hover:bg-surface-container transition-colors duration-300 p-10 flex flex-col gap-6 border border-outline-variant/20 hover:border-primary/30">
      {/* Top content */}
      <div className="flex flex-col gap-5">
        {/* Header row: icon + badge */}
        <div className="flex items-start justify-between">
          <span className={`material-symbols-outlined text-3xl ${iconColorClass}`}>
            {service.icon}
          </span>
          <span className={`text-xs font-label tracking-widest uppercase border px-2 py-0.5 ${badgeColorClass}`}>
            {service.badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline text-on-surface text-2xl md:text-3xl leading-tight">
          {service.title}
        </h3>

        {/* Tagline */}
        <p className="text-primary text-sm font-headline italic">
          {service.tagline}
        </p>

        {/* Description + feature list */}
        <div>
          <p className="text-on-surface-variant text-sm font-body mb-3">
            {service.description}
          </p>
          <ul className="flex flex-col gap-2.5">
            {service.features.map((feature) => (
              <li key={feature.label} className="flex items-center gap-3">
                <span className="w-5 h-px bg-primary/40 flex-shrink-0" />
                <span className="text-on-surface-variant text-sm font-body">
                  {feature.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA button */}
        <div className="pt-2">
          <Link
            to={service.ctaLink}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-container text-on-primary-container text-xs font-label font-semibold tracking-widest uppercase transition-all duration-300 hover:bg-inverse-primary active:scale-95"
          >
            {service.ctaLabel}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </div>

    </div>
  )
}
