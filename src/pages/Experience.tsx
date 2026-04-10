import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import experience from '../data/experience'

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.2', 'end 0.85']
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.28
  })

  return (
    <section id="experience" className="experience-shell scroll-section">
      <h2 className="section-title experience-section-title">Experience</h2>
      <div ref={timelineRef} className="timeline">
        <div className="timeline-rail" aria-hidden>
          <div className="timeline-rail-bg" />
          <motion.div className="timeline-rail-fill" style={{ scaleY: progress }} />
        </div>

        {experience.map((item, index) => {
          const isRight = index % 2 === 1

          return (
            <motion.article
              key={`${item.organization}-${item.title}`}
              className={`timeline-item ${isRight ? 'right' : 'left'}`}
              initial={{ opacity: 0, y: 36, x: isRight ? 24 : -24 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            >
              <div className="timeline-dot" aria-hidden />
              <div className="timeline-card">
                <p className="timeline-period">{item.period}</p>
                <h2>{item.title}</h2>
                <div className="timeline-org-row">
                  <img className="org-logo" src={item.logo} alt={`${item.organization} logo`} loading="lazy" />
                  <p className="timeline-org">{item.organization}</p>
                </div>
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="timeline-bullets">
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
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
