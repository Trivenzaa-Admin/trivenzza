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
    bio: 'Sumeet Agrawal is a San Francisco Bay Area–based actor, creative director, and storyteller whose work bridges emotion, narrative, and cinematic expression. With a growing body of work across music videos, short films, and theatre, he brings a distinctive blend of authenticity and intensity to every performance.\n\nHe gained wide recognition for "Jee Karda Reimagined," a music video he both produced and starred in, which went on to win Best Music Video at the Bay Area Cine Awards (BACA) 2025. The project marked a defining moment in his creative journey, establishing him as a compelling voice in the independent film space.\n\nBeyond acting, Sumeet is deeply passionate about visual storytelling, modeling, and dance—art forms that enhance his expressive range and on-screen presence.\n\nBy day, Sumeet is a Product Management executive at Salesforce, where he leads innovation at the intersection of data, AI, and enterprise technology. This dual identity—creative storyteller and technology leader—allows him to bring a rare combination of structured thinking and artistic vision to his work.\n\nAs a co-creator of Trivenzaa, Sumeet is committed to building a platform that empowers emerging talent and brings meaningful, thought-provoking stories to life. His work is driven by a simple belief: storytelling has the power to connect, challenge perspectives, and create lasting impact.\n\n"For me, acting isn\'t about performing—it\'s about experiencing every moment truthfully and making someone, somewhere, feel seen."',
    imageUrl: '/media/sumeet_about.jpeg',
    sketchImageUrl: '/media/sumeet_sketch.png',
    imageAlt: 'Sumeet Agrawal — Founder & Creative Director of Trivenzaa',
    instagramUrl: 'https://www.instagram.com/sumeet_ag/',
  },
  {
    id: 'mara-solov',
    name: 'MARA SOLOV',
    title: 'Head of Cinematography',
    bio: "Mara's eye for lighting geometry has redefined the look of modern editorial film, earning her two Cannes Gold Lions and a decade of industry recognition.",
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBwyD2aYtSFnFVPsw0bxJ_btAN7gcBosNjTWnDAWUGa8a5j-6_RQ6UT_WG4sV5gpU1d_X4Ww6RvMn0QwbpVWbZBYCCyWJHxdtzfaaZLh8998iMTktUn916RCzTZYuWCUI6FeqOT2tjHrIsNAuOiCvBd7UKG05yJS_4WLUItptV93aMlIo07AWmALS35Lo6w93oUhPGL28Co-8jfxBZke_wYoSwWKWcovIvqEbzcjQT40jBl51MSZK4pd7Pkcoyp7PxHQmT9wH16qK7',
    imageAlt: 'Black and white portrait of Mara Solov, Head of Cinematography',
  },
  {
    id: 'julian-thorn',
    name: 'JULIAN THORN',
    title: 'Master Colorist',
    bio: 'Julian treats color as a narrative tool, sculpting palettes that evoke deep psychological responses in every frame and final grade.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo28sIzdok2TowOTOdcIGNpmR-RywaiJH-0zFEseK0O4907-CbotEhjdSaLekJSEC1VVYfBAyjIYsUv0BURtIickt8SbC8FaMRbEzT3DnHGi99qqiy_RfzkQ81QmQJcUiKsPPbdC8SYPwp_mUgzTbSXmVebxVCAn5dNN13HnUTPbG4ENwtjhM9WKNEF3vaPheXMeEohzi-PI2cQKfdWPoCo_F5qjg3brjBe2QMuEk8xV6hl7UV2zxbqaMDHRcdgzkLON83-Xb4RpFr',
    imageAlt: 'Black and white profile portrait of Julian Thorn, Master Colorist',
  },
]
