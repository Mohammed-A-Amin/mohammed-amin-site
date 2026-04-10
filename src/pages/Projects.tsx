import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

export default function Projects() {
  return (
    <section className="page-shell section-shell">
      <header className="page-header">
        <p className="page-kicker">Projects</p>
        <h1 className="page-title">Selected systems, prototypes, and research.</h1>
        <p className="page-intro">
          Work across AI, HCI, mixed reality, education, and creative tools, with an emphasis on shipping usable systems.
        </p>
      </header>
      <div className="grid">
        {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
    </section>
  )
}
