export interface ServiceFeature {
  label: string
}

export interface Service {
  id: string
  icon: string
  iconColor: 'primary' | 'secondary'
  badge: string
  badgeColor: 'primary' | 'secondary'
  title: string
  tagline: string
  description: string
  features: ServiceFeature[]
  ctaLabel: string
  ctaLink: string
  imageUrl: string
  imageAlt: string
}

export const services: Service[] = [
  {
    id: 'music-videos',
    icon: 'music_note',
    iconColor: 'primary',
    badge: 'PERSONAL',
    badgeColor: 'secondary',
    title: 'Personal Music Videos & Short Films',
    tagline: 'Want to feel like a star?',
    description: 'We create personalized music videos and short films for:',
    features: [
      { label: 'Pre-wedding shoots' },
      { label: 'Passion projects' },
      { label: 'Personal storytelling' },
    ],
    ctaLabel: 'Start Your Project',
    ctaLink: '/contact',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdiGuViRRGgb9sj--RrKtY94Bgfh_ovIyel-DTiCtGP6OKKe3Dz1DrZjkXZIblBe2WOmL37s6O12iv3uFzom10eG8bDlXgaWFsLVQ01Jkr68E7uP0oAEhZgxFQvcBQO50twiJIQQtRbktekHBWvgkd24zTejdIaQhFSBJK72Ma1cz_N7utvNRr98IU1F6fPyAOUY9x9AZdemcRu6uHh4yO4CGb8N2QI4FecUCfv1dcd38b9EtsXR5gPzeH0_k3WqnaaU3lYIBcLhQP',
    imageAlt: 'Music video production shoot',
  },
  {
    id: 'commercial',
    icon: 'campaign',
    iconColor: 'secondary',
    badge: 'BRANDS',
    badgeColor: 'primary',
    title: 'Commercial Content',
    tagline: 'Bring your brand to life.',
    description: 'We create:',
    features: [
      { label: 'Product ads' },
      { label: 'Social media content' },
      { label: 'Brand storytelling videos' },
    ],
    ctaLabel: 'Get a Quote',
    ctaLink: '/contact',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7eWRQmmd2Py7uwf3HYfmu50h9eypuj7cpfiCPDLl6PeUCTUrHagspI7PkAGaSxe0T0mP2hNzNXzbzxRy1oPR0Wuzd7HseDLy1S-NTLJ73o0sltL5yDGoESCwRvDKlMTbAFYo0OcydMLJrOWCOrZIIfd8ABq8cY--KIsRHvohOHWVeHYklqNnM8H2pz79hiIMoELlzBdq-ozpxPs3JcFik4Hnbp9-yupo4UODDEuE4IlOgrQPTPYchS_Tl2nusihic0rsyAcJPjur',
    imageAlt: 'Commercial brand production shoot',
  },
  {
    id: 'enterprise',
    icon: 'business',
    iconColor: 'primary',
    badge: 'ENTERPRISE',
    badgeColor: 'secondary',
    title: 'Enterprise Solutions',
    tagline: 'Professional production for businesses.',
    description: 'We help with:',
    features: [
      { label: 'Event coverage' },
      { label: 'Corporate storytelling' },
      { label: 'Campaign videos' },
    ],
    ctaLabel: 'Work With Us',
    ctaLink: '/contact',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmixm3A2zt5tkB1BEhd_TN8SrPdKyBXUYyCVO26ZspmKBiZKow3qTpkUjguhywFoRNmxNW5PE1dVJpTZvQkXf6TOwj0e119rYznPEuWMDVyDAzKFNG1MzxlxtcJcuWDokePGsiJO5vQkI5VbJHBG1a4RlFDoujvog3_1DuWOx4g15uXXiPUh87IdDGWaQDcOn16g7i-3cRIkPjCDaq0VMi_grsoYWXeptaxwN16uMJAgb62RFugD-NAH3LZL__KdkOLgvVGF266lI',
    imageAlt: 'Corporate enterprise video production',
  },
  {
    id: 'events',
    icon: 'celebration',
    iconColor: 'secondary',
    badge: 'EVENTS',
    badgeColor: 'primary',
    title: 'Event Planning',
    tagline: 'Comprehensive management for high-impact events.',
    description: 'We help with:',
    features: [
      { label: 'Party & Fashion Show Production' },
      { label: 'Artist & Talent Supply' },
      { label: 'End-to-End Event Planning' },
      { label: 'Integrated Photo & Video' },
    ],
    ctaLabel: 'Work With Us',
    ctaLink: '/contact',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeNsOngxjeLJqzOBg2SlXFBnNQ3QsMtf71T0wjHN3ffGWaJq0Bwdp8LUNtBLdNfU9uMhZbk8V0Q_szNOF8SzTPdUiyjZeEafCEaT1Wqk7qsoYbGFAzMIdcGP1wSwHFrZwnY-bBaXhKfcgezRFQMl7V2OFF03Uwz_JZHb9HAOnIFeQ86z_ccA1lDEM2PeO7lCUWBY66Z6u12T7hLX-pUvBNr90InYmOzdMJQ6-fBsJEAmtSxwz2_F9U1rhn7IKbd9Ej72fUvNERKQQ',
    imageAlt: 'Event planning and production',
  },
]
