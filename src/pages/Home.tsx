import { Github, GraduationCap, Instagram, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%#&*<>/[]{}'

function ScrambleText({
  text,
  delay = 0,
  duration = 900
}: {
  text: string
  delay?: number
  duration?: number
}) {
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayText(text)
      return
    }

    let animationFrame = 0
    let startTime = 0
    let hasStarted = false

    const scramble = (timestamp: number) => {
      if (!hasStarted) {
        hasStarted = true
        startTime = timestamp
      }

      const elapsed = Math.max(0, timestamp - startTime - delay)
      const progress = Math.min(elapsed / duration, 1)
      const revealedCount = Math.floor(progress * text.length)

      if (elapsed < 0) {
        setDisplayText(createScramble(text, 0))
        animationFrame = window.requestAnimationFrame(scramble)
        return
      }

      setDisplayText(createScramble(text, revealedCount))

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(scramble)
      } else {
        setDisplayText(text)
      }
    }

    setDisplayText(createScramble(text, 0))
    animationFrame = window.requestAnimationFrame(scramble)

    return () => window.cancelAnimationFrame(animationFrame)
  }, [delay, duration, text])

  return (
    <span className="decrypt-text" aria-label={text}>
      <span aria-hidden>{displayText}</span>
    </span>
  )
}

function createScramble(text: string, revealedCount: number) {
  return Array.from(text, (char, index) => {
    if (char.trim() === '' || index < revealedCount) return char
    if (/[.,'’\-]/.test(char)) return char
    return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
  }).join('')
}

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/mohammed-a-amin/',
    label: 'LinkedIn',
    icon: Linkedin
  },
  {
    href: 'https://github.com/Mohammed-A-Amin',
    label: 'GitHub',
    icon: Github
  },
  {
    href: 'https://scholar.google.com/citations?hl=en&user=M8vdbgEAAAAJ',
    label: 'Google Scholar',
    icon: GraduationCap
  },
  {
    href: 'https://www.instagram.com/moh4mm3dd',
    label: 'Instagram',
    icon: Instagram
  }
]

export default function Home() {
  const intro = 'Software engineer, researcher, and filmmaker'
  const heading = "Hi, I'm Mohammed Amin."
  const firstParagraph = "I'm a junior studying EECS at UC Berkeley, building at the intersection of human-computer interaction, AI systems, and mixed reality."
  const secondParagraph = 'My work spans research prototypes, production engineering, and creative media, with recent experience across OpenAI, AWS, Netflix, Monad, and Berkeley AI Research.'
  const thirdParagraph = 'Outside the lab and editor, I make short films, play tabla, hike, lift, and look for ways to turn technical ideas into human experiences.'

  return (
    <section id="home" className="home-shell scroll-section">
      <div className="home-intro">
        <div className="about-layout">
          <div className="portrait">
            <img src="/media/mmdsmile.png" alt="Mohammed Amin" />
          </div>
          <div className="about-content">
            <p className="hero-kicker"><ScrambleText text={intro} duration={720} /></p>
            <h1 className="about-title">
              <ScrambleText text={heading} delay={120} duration={840} />
            </h1>
            <div className="about-rule" />
            <div className="about-short">
              <p>
                <ScrambleText text={firstParagraph} delay={420} duration={980} />
              </p>
              <p>
                <ScrambleText text={secondParagraph} delay={640} duration={1080} />
              </p>
              <p>
                <ScrambleText text={thirdParagraph} delay={860} duration={1080} />
              </p>
            </div>
            <div className="about-actions">
              <Link className="button primary" to="/projects">Selected work</Link>
              <a className="button secondary" href="mailto:mohammedamin@berkeley.edu">
                <Mail size={16} aria-hidden />
                Contact
              </a>
            </div>
            <div className="about-socials">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="about-social-link"
                >
                  <Icon size={17} strokeWidth={1.9} aria-hidden />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
