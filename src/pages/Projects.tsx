import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'

export default function Projects() {
  return (
    <section id="projects" className="section-shell scroll-section">
      <h2 className="section-title">Projects</h2>
      <div className="grid">
        {projects.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
    </section>
  )
}
