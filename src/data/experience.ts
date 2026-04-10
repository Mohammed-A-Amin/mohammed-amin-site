export type ExperienceItem = {
  period: string
  title: string
  organization: string
  bullets?: string[]
  tags?: string[]
  logo: string
}

const experience: ExperienceItem[] = [
  {
    period: 'Summer 2026',
    title: 'Member of Technical Staff Intern',
    organization: 'OpenAI',
    tags: [],
    logo: '/logos/openailogo.png'
  },
  {
    period: 'May 2025 - Aug 2025',
    title: 'Software Engineer Intern',
    organization: 'Amazon Web Services (EC2 Private Pricing Org)',
    bullets: [
      'Built middle-of-month support in the EC2 PRC Console, enabling late enterprise contract onboarding and reducing on-call load by 16%.',
      'Implemented subscription time tracking across EC2 pricing models with Java and DynamoDB, cutting escalations across 86+ support tickets.',
      'Engineered async purchase analysis and refund ticketing with EventBridge, Lambda, Athena, S3, and Step Functions.',
      'Added real-time telemetry in the PRC Console with React and Redux, reducing late-contract ingestion errors by 20%.'
    ],
    tags: ['Java', 'AWS', 'DynamoDB', 'React', 'Redux'],
    logo: '/logos/awslogo.png'
  },
  {
    period: 'Jan 2025 - May 2025',
    title: 'Contract Software Engineer',
    organization: 'Monad',
    bullets: [
      'Developed 10 Go connectors for a security ingestion pipeline across AWS, GCP, and Azure, increasing supported sources by 30%.',
      'Integrated OCSF transformations using Go and GraphQL for normalized cross-cloud security data.',
      'Built schema mapping UI flows in Svelte and supported deployments with Kubernetes, k9s, and Docker.'
    ],
    tags: ['Go', 'GraphQL', 'Kubernetes', 'Docker', 'Svelte'],
    logo: '/logos/monad.jpeg'
  },
  {
    period: 'Aug 2024 - Dec 2024',
    title: 'Contract Software Engineer',
    organization: 'Netflix',
    bullets: [
      'Designed a Flask backend for Netflix Interactive Titles, converting unstructured narrative data in Firebase into branching story nodes.',
      'Integrated Llama 3.2 into the narrative engine to generate dynamic worlds, storylines, and player decision trees.',
      'Used Stable Diffusion models on LAION data to generate high-quality 2D assets from text prompts.'
    ],
    tags: ['Flask', 'Llama', 'Firebase', 'Stable Diffusion', 'PyTorch'],
    logo: '/logos/netflix.png'
  },
  {
    period: 'Jan 2024 - Dec 2025',
    title: 'Undergraduate Researcher',
    organization: 'Berkeley AI Research (BAIR) & Meta',
    bullets: [
      'Developed ScenicSynth for learning coordinated physical tasks, improving code synthesis efficiency by 45% over traditional PbD methods.',
      'Engineered an AR interface in Scenic for spatio-temporal and verbal data collection using C# and OpenAI Whisper.',
      'Synchronized AR trajectory streams with verbal data across Firebase and Firestore for real-time execution in 3.8s.'
    ],
    tags: ['Scenic', 'UnityXR', 'C#', 'Firebase', 'Typesense', 'Web Sockets', 'Meta Quest SDK'],
    logo: '/logos/bair.jpg'
  },
  {
    period: '2023 - Present',
    title: 'Lead Instructor',
    organization: 'UC Berkeley Extended Reality Development DeCal',
    bullets: [
      'Lead and teach Berkeley\'s largest student-run XR development course, mentoring students from first exposure to shipping AR/VR applications.'
    ],
    tags: ['UnityXR', 'C#'],
    logo: '/logos/xr.jpeg'
  }
]

export default experience
