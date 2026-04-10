import { motion } from 'framer-motion'

export type Project = {
  title: string
  description: string
  reference?: string
  year?: string
  tags?: string[]
  link?: string
  image?: string
}

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.a
      href={p.link || '#'} target={p.link ? '_blank' : undefined} rel={p.link ? 'noreferrer' : undefined}
      className="card grid-item six"
      whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
    >
      <div className="thumb" style={{ marginBottom: 12 }}>
        {p.image && <img src={p.image} alt="" />}
      </div>
      <h3>{p.title}</h3>
      {p.year && <div className="badge" style={{ margin: '8px 0 10px' }}>Year: {p.year}</div>}
      <p className="project-description">{p.description}</p>
      {p.reference && <p className="project-reference">{p.reference}</p>}
      {p.tags && (
        <div className="tags" style={{ marginTop: 12 }}>
          {p.tags.map((t) => <span key={t} className="badge">{t}</span>)}
        </div>
      )}
    </motion.a>
  )
}
