import { useEffect, useState } from 'react'

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
      <span className="decrypt-text-layout" aria-hidden>{text}</span>
      <span className="decrypt-text-display" aria-hidden>{displayText}</span>
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

const funPhotos = [
  '/media/zion.png',
  '/media/pp.png',
  '/media/snow.png',
  '/media/sun.JPG',
  '/media/rainier.png'
]

export default function Home() {
  const heading = "Hi, I'm Mohammed."
  const firstParagraph = "I'm a software engineer, filmmaker, and first-gen Bangladeshi-American."
  const secondParagraph = "I'm currently a junior studying EECS at UC Berkeley and an intern at OpenAI. I focus on building innovative solutions at the intersection of human-computer interaction and AI. Previously, I interned at AWS on the EC2 Private Pricing team."
  const thirdParagraph = 'Outside of work, I like creating short films, playing tabla, video games, weightlifting, and hiking (check out the latest hikes below!)'

  return (
    <section id="home" className="home-shell scroll-section">
      <div className="home-intro">
        <div className="about-layout">
          <div className="portrait">
            <img src="/media/headsh.jpg" alt="Mohammed" />
          </div>
          <div className="about-content">
            <h1 className="about-title">
              {heading}
            </h1>
            <div className="about-rule" />
            <div className="about-short">
              <p>
                <ScrambleText text={firstParagraph} delay={520} duration={1300} />
              </p>
              <p>
                <ScrambleText text={secondParagraph} delay={820} duration={1600} />
              </p>
              <p>
                <ScrambleText text={thirdParagraph} delay={1120} duration={1500} />
              </p>
            </div>
            <div className="about-carousel-wrap" aria-label="Personal photo carousel">
              <div className="about-carousel-track">
                {[...funPhotos, ...funPhotos].map((photo, index) => (
                  <div key={`${photo}-${index}`} className="about-carousel-item">
                    <img src={photo} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="carousel-scroll-cue" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
