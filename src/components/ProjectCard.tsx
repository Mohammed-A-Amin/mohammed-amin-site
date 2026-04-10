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
    <a
      href={p.link || '#'} target={p.link ? '_blank' : undefined} rel={p.link ? 'noreferrer' : undefined}
      className="card grid-item six"
    >
      <div className="thumb">
        {p.image && <img src={p.image} alt="" />}
      </div>
      <div className="card-body">
        <div className="card-meta-row">
          {p.year && <span className="eyebrow">{p.year}</span>}
          {p.link && <span className="card-arrow" aria-hidden>↗</span>}
        </div>
        <h3>{p.title}</h3>
        <p className="project-description">{p.description}</p>
        {p.reference && <p className="project-reference">{p.reference}</p>}
        {p.tags && (
          <div className="tags">
            {p.tags.map((t) => <span key={t} className="badge">{t}</span>)}
          </div>
        )}
      </div>
    </a>
  )
}
