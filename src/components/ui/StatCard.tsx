interface StatCardProps {
  value: string
  label: string
  color?: 'primary' | 'secondary' | 'default'
}

export default function StatCard({ value, label, color = 'default' }: StatCardProps) {
  const valueColorClass =
    color === 'primary'
      ? 'text-primary'
      : color === 'secondary'
      ? 'text-secondary'
      : 'text-on-surface'

  return (
    <div className="flex flex-col gap-1 p-4">
      <span className={`font-headline text-4xl md:text-5xl font-bold ${valueColorClass}`}>
        {value}
      </span>
      <span className="text-on-surface-variant text-xs font-label tracking-widest uppercase">
        {label}
      </span>
    </div>
  )
}
