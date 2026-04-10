import type { Project } from '../components/ProjectCard'

const projects: Project[] = [
  {
    title: 'Interactive Program Synthesis for Modeling Collaborative Physical Activities from Narrated Demonstrations',
    description: 'Co-authored research on learning collaborative physical tasks from narrated mixed-reality demonstrations by representing behavior as editable programs, then enabling users to inspect and iteratively refine system logic.',
    year: '2025',
    reference: 'Edward Kim, Daniel He, Jorge Chao, Wiktor Rajca, Mohammed Amin, Nishant Malpani, Ruta Desai, Antti Oulasvirta, Bjoern Hartmann, and Sanjit Seshia',
    link: 'https://arxiv.org/abs/2509.24250',
    image: '/media/pps.png'
  },
  {
    title: 'TaleTutor',
    description: 'Built an ed-tech platform that turns teacher-uploaded PDFs into interactive themed lessons with contextual Q&A. Placed Top 10 at the UC Berkeley AI Hackathon (AI for Good track).',
    year: '2024',
    tags: ['PlayAI', 'LangChain', 'Flask', 'Next.js', 'MongoDB'],
    link: 'https://devpost.com/software/taletutor',
    image: '/media/taletutor.png'
  },
  {
    title: 'barber.ai',
    description: 'Built an AR app for virtual hairstyle try-on with real-time 3D overlays, camera toggling, and personalized recommendations from a custom hairstyle model.',
    year: '2024',
    tags: ['Swift', 'SwiftUI', 'RealityKit', 'ARKit'],
    link: 'https://github.com/Mohammed-A-Amin/barber.ai',
    image: '/media/barberai.jpg'
  },
  {
    title: 'GAME OVER',
    description: 'Built a play-to-earn game platform focused on giving underrepresented gamers visibility through skill-based progression, NFT rewards, and an in-game token economy.',
    year: '2022',
    tags: ['Solidity', 'React', 'Phaser.js', 'Web3'],
    link: 'https://gameover-official.netlify.app/',
    image: '/media/gameover.png'
  }
]

export default projects
