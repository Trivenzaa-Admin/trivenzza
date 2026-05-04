// ============================================================
// SITE CONTENT — all editable text & media references in one place
// To swap real content: update imageUrl/videoUrl fields and drop
// files into public/media/[section]/
// ============================================================
import { asset } from '../utils/asset'

export const heroContent = {
  home: {
    // Replace with '/media/hero/home-bg.jpg' when real content arrives
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9A1U978ITDwi_QxPRTLSz9xAyJG1_VarJv3avzrruJ7t4c0AdAQ9g_i_ZuhjpRPib0dmPynTHCBSzcIArC1W9AFEFkai9IT7XZa_Tb_YmiXXKit3m87BTr_ASdvCYV2rZgLjGKdlSXD2j235dlha4A2EY2YNofKK4RP9euCWM1Tp6ZJvO5BiEkbCKb5wkSNS1JfkT8Ncbfs_pYsNYheXT7g4t6xg9CpsD-SQHbLvrtPqOl9jidJLny_KYo0pAvXeMbjutwQMveBof',
    headlinePart1: 'Where Stories Begin.',
    headlineItalic: 'Where Talent Shines.',
    label: 'Independent Film House',
    body: 'Trivenzaa is a Bay Area–based production company creating a platform for aspiring actors, filmmakers, and creators to showcase their talent through impactful storytelling.',
  },
  about: {
    // Replace with '/media/hero/about-bg.jpg' when real content arrives
    backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7eWRQmmd2Py7uwf3HYfmu50h9eypuj7cpfiCPDLl6PeUCTUrHagspI7PkAGaSxe0T0mP2hNzNXzbzxRy1oPR0Wuzd7HseDLy1S-NTLJ73o0sltL5yDGoESCwRvDKlMTbAFYo0OcydMLJrOWCOrZIIfd8ABq8cY--KIsRHvohOHWVeHYklqNnM8H2pz79hiIMoELlzBdq-ozpxPs3JcFik4Hnbp9-yupo4UODDEuE4IlOgrQPTPYchS_Tl2nusihic0rsyAcJPjur',
    label: 'Our Narrative',
    headlinePart1: 'Crafting Untold',
    headlineItalic: 'Stories.',
    subtitle: 'We are a high-end film production house dedicated to meticulous refinement of the moving image.',
  },
}

export const aboutContent = {
  story: {
    // Replace with '/media/team/studio-portrait.jpg' when real content arrives
    imageUrl: asset('/media/sumeet_about.jpeg'),
    imageAlt: 'Sumeet Agrawal — Founder & Creative Director of Trivenzaa',
    badgeText: '12 Years of Excellence',
    headlinePart1: 'The Art of the',
    headlineItalic: 'Atmosphere.',
    body1: 'Born from a shared obsession with light and shadow, we built Trivenzaa to be the bridge between artistic vision and commercial impact. Every production begins with a question: what emotion should the audience carry with them long after the screen goes dark?',
    body2: 'Our methodology is rooted in the belief that constraints breed creativity. We work in the space between the possible and the extraordinary, pushing technical and narrative boundaries to deliver work that resonates on a human level.',
  },
  clients: [
    'VALKYRIE', 'OBSIDIAN', 'ECHO.', 'MONOLITH',
    'ZEPHYR', 'SOLA', 'KINETIC', 'PRISM',
  ],
}

export const statsContent = {
  metrics: [
    { value: '120+', label: 'Global Campaigns', color: 'primary' as const },
    { value: '15', label: 'Film Awards', color: 'secondary' as const },
    { value: '40M+', label: 'Digital Views', color: 'default' as const },
    { value: '08', label: 'Countries Filmed', color: 'default' as const },
  ],
  // logoUrl optional — shows text if not provided. Replace with '/media/home-stats/brand.png'
  clientLogos: [
    { name: 'KINETIC' },
    { name: 'OBSIDIAN' },
    { name: 'VALKYRIE' },
    { name: 'PRISM' },
    { name: 'MONOLITH' },
    { name: 'ZEPHYR' },
  ],
}

export const servicesContent = {
  heroHeadlinePart1: 'CRAFTING THE',
  heroHeadlineItalic: 'NARRATIVE',
  heroHeadlinePart2: 'OF LUXURY.',
  heroSubtitle: 'We bridge the gap between fashion editorial and commercial impact, delivering work that commands attention and drives desire.',
  processSteps: [
    {
      number: '01',
      title: 'Discovery',
      description: 'We immerse ourselves in your brand DNA, objectives, and competitive landscape to uncover the story only you can tell.',
    },
    {
      number: '02',
      title: 'Crafting',
      description: 'Pre-production mastery — storyboarding, talent selection, location scouting, and production design aligned to the vision.',
    },
    {
      number: '03',
      title: 'Execution',
      description: 'High-fidelity capture with the precision of a feature film. Every frame composed with intention, every moment owned.',
    },
    {
      number: '04',
      title: 'Refinement',
      description: 'Post-production excellence — color grading, sound design, and final delivery that exceeds the original vision.',
    },
  ],
  processQuote: 'Execution is the only thing that matters between a dream and a result.',
}

export const contactContent = {
  address: '6 Balsam Ln\nSan Ramon, CA',
  email: 'trivenzaa@gmail.com',
  phone: '(913) 293-7197',
  socials: [
    { label: 'Instagram', url: 'https://www.instagram.com/trivenzaa_inc?igsh=NTc4MTIwNjQ2YQ==' },
    { label: 'YouTube', url: 'https://www.youtube.com/@sumeetagrawal21' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/trivenzaa-inc-2814b3369/' },
  ],
  // Replace with '/media/hero/map.jpg' when real content arrives
  mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo28sIzdok2TowOTOdcIGNpmR-RywaiJH-0zFEseK0O4907-CbotEhjdSaLekJSEC1VVYfBAyjIYsUv0BURtIickt8SbC8FaMRbEzT3DnHGi99qqiy_RfzkQ81QmQJcUiKsPPbdC8SYPwp_mUgzTbSXmVebxVCAn5dNN13HnUTPbG4ENwtjhM9WKNEF3vaPheXMeEohzi-PI2cQKfdWPoCo_F5qjg3brjBe2QMuEk8xV6hl7UV2zxbqaMDHRcdgzkLON83-Xb4RpFr',
  serviceTypes: ['Commercial', 'Music Video', 'Editorial', 'Feature Film'],
}
