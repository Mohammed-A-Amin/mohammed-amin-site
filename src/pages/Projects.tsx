import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

export default function Projects() {
  return (
    <section className="page-shell section-shell">
      <header className="page-header">
        <h1 className="page-kicker">Projects</h1>
        <p className="page-note">
          Over the past couple of years, my work has spanned across AR/VR, full-stack apps, mobile applications, and research.
        </p>
      </header>
      <div className="grid">
        {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
    </section>
  )
}
