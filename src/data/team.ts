import { asset } from '../utils/asset'

export interface TeamMember {
  id: string
  name: string
  title: string
  bio: string
  // Replace with '/media/team/firstname-lastname.jpg' when real content arrives
  imageUrl: string
  sketchImageUrl?: string  // shown by default; imageUrl revealed on hover
  imageAlt: string
  instagramUrl?: string
}

export const teamMembers: TeamMember[] = [
  {
    id: 'elias-vance',
    name: 'SUMEET AGRAWAL',
    title: 'Founder / Executive Director',
    bio: 'Sumeet Agrawal is a San Francisco Bay Area–based actor, creative director, and storyteller. He gained wide recognition for "Jee Karda Reimagined"—a music video he both produced and starred in—which won Best Music Video at the Bay Area Cine Awards (BACA) 2025. Beyond acting, Sumeet is deeply passionate about visual storytelling, modeling, and dance—art forms that expand his expressive range across both screen and stage.\n\nBy day, Sumeet is a Product Management executive at Salesforce, where he leads innovation at the intersection of data, AI, and enterprise technology. This dual identity—creative storyteller and technology leader—brings a rare combination of structured thinking and artistic vision to every project he undertakes.\n\nAs a co-creator of Trivenzaa, Sumeet is committed to building a platform that empowers emerging talent and brings meaningful, thought-provoking stories to life—driven by the belief that storytelling has the power to connect people, challenge perspectives, and create lasting impact.',
    imageUrl: asset('/media/sumeet_about.jpeg'),
    sketchImageUrl: asset('/media/sumeet_sketch.png'),
    imageAlt: 'Sumeet Agrawal — Founder & Creative Director of Trivenzaa',
    instagramUrl: 'https://www.instagram.com/sumeet_ag/',
  },
  {
    id: 'akshata-brahmavar',
    name: 'AKSHATA BRAHMAVAR',
    title: 'Actor, Screenwriter & Filmmaker',
    bio: "Akshata Brahmavar is an Indian actor, screenwriter, singer, and emerging filmmaker based in the San Francisco Bay Area. She began performing in theatre at the age of twelve, where she first discovered her deep passion for storytelling, character, and the transformative power of performance.\n\nHer screenplay, Silent Screens, was selected as a finalist at the Los Angeles International Screenplay Awards and is also a nominee for the International Indies Screenplay Awards in Italy for December 2026—a recognition that reflects her ability to craft emotionally resonant narratives.\n\nAkshata's creative work spans acting, writing, music, and filmmaking, with a strong focus on emotionally engaging narratives and character-driven storytelling. Her artistic voice is shaped by a deep interest in human emotion, relationships, identity, and the subtle complexities of everyday life.\n\nThrough her work with Trivenzaa and beyond, she is committed to creating meaningful stories that resonate with audiences across cultures, backgrounds, and shared human experiences.",
    imageUrl: asset('/media/akshata_about.jpeg'),
    sketchImageUrl: asset('/media/akshata_sketch.png'),
    imageAlt: 'Portrait of Akshata Brahmavar, Actor, Screenwriter & Filmmaker',
  },
  {
    id: 'ashish',
    name: 'ASHISH',
    title: 'Technology Leader & Actor',
    bio: "Ashish is a San Francisco Bay Area–based actor and model whose creative work is rooted in empathy, authenticity, and a love for meaningful storytelling. Trained in the Meisner technique, he expresses himself across screen and stage, and was recently crowned Mr. Bharat California 2026—a milestone that reflects his commitment to representation and purposeful artistry. He is a passionate advocate for kindness, empathy, and peace toward all living beings.\n\nBy day, Ashish is a technology leader with over 16 years of experience building and scaling consumer products for millions of users, with pivotal roles at Amazon Web Services, Cisco, 1 Mainstream, and McAfee. He holds a Master's in Computer Science from USC and brings deep expertise in distributed systems, AI/ML, and mobile platforms.\n\nAs the technology leader at Trivenzaa, Ashish blends creativity and engineering to build a platform that uplifts emerging talent and delivers content rooted in positivity, purpose, and human connection.",
    imageUrl: asset('/media/ashish_about.jpeg'),
    sketchImageUrl: asset('/media/ashish_sketch.png'),
    imageAlt: 'Portrait of Ashish, Technology Leader & Actor',
  },
]
