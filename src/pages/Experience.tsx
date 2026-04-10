import experience from '../data/experience'

export default function Experience() {
  return (
    <section className="page-shell experience-shell">
      <header className="page-header">
        <p className="page-kicker">Experience</p>
        <h1 className="page-title">Engineering, research, and product work.</h1>
        <p className="page-intro">
          A focused record of the teams, systems, and research environments where I have built production software and experimental interfaces.
        </p>
      </header>
      <div className="experience-list">
        {experience.map((item) => (
          <article key={`${item.organization}-${item.title}`} className="experience-entry">
            <div className="experience-date">
              <span>{item.period}</span>
            </div>
            <div className="experience-main">
              <div className="experience-heading">
                <img className="org-logo" src={item.logo} alt={`${item.organization} logo`} loading="lazy" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.organization}</p>
                </div>
              </div>
              {item.bullets && item.bullets.length > 0 && (
                <ul className="experience-bullets">
                  {item.bullets.map((bullet) => (
                    <li key={`${item.title}-${bullet}`}>{bullet}</li>
                  ))}
                </ul>
              )}
              {item.tags && item.tags.length > 0 && (
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={`${item.title}-${tag}`} className="badge">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
