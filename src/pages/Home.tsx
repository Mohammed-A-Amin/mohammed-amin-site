import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Github, GraduationCap, Instagram, Linkedin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const funPhotos = [
  '/media/zion.png',
  '/media/pp.png',
  '/media/snow.png',
  '/media/sun.JPG',
  '/media/rainier.png'
]

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
  const headingText = "Hi, I'm Mohammed."
  const sectionRef = useRef<HTMLElement | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [typedHeading, setTypedHeading] = useState('')
  const [showParagraph, setShowParagraph] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  })

  const yTarget = useTransform(scrollYProgress, [0, 0.7, 1], [0, -72, -122])
  const introY = useSpring(yTarget, { stiffness: 120, damping: 24, mass: 0.32 })
  const introScale = useTransform(scrollYProgress, [0, 0.7, 1], [1.02, 1, 0.985])
  const introOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.16, 0.26], [0.96, 0.96, 0])
  const cueY = useTransform(scrollYProgress, [0, 0.26], [0, -10])
  const headingComplete = typedHeading.length === headingText.length
  const renderedPhotos = isMobile ? funPhotos : [...funPhotos, ...funPhotos]

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 900)
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
    return () => window.removeEventListener('resize', updateIsMobile)
  }, [])

  useEffect(() => {
    let charIndex = 0
    const timer = window.setInterval(() => {
      charIndex += 1
      setTypedHeading(headingText.slice(0, charIndex))

      if (charIndex >= headingText.length) {
        window.clearInterval(timer)
      }
    }, 82)

    return () => window.clearInterval(timer)
  }, [headingText])

  useEffect(() => {
    if (!headingComplete) return

    const paragraphTimer = window.setTimeout(() => setShowParagraph(true), 180)
    const carouselTimer = window.setTimeout(() => setShowCarousel(true), 860)
    const linksTimer = window.setTimeout(() => setShowLinks(true), 1700)

    return () => {
      window.clearTimeout(paragraphTimer)
      window.clearTimeout(carouselTimer)
      window.clearTimeout(linksTimer)
    }
  }, [headingComplete])

  const scrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" ref={sectionRef} className="home-shell scroll-section">
      <motion.div className="home-intro" style={{ y: isMobile ? 0 : introY, scale: isMobile ? 1 : introScale, opacity: introOpacity }}>
        <div className="about-layout">
          <div
            className="portrait"
          >
            <img src="/media/mmdsmile.png" alt="Portrait of Mohammed Amin" />
          </div>
          <div className="about-content">
            <h1 className="about-title">
              {typedHeading}
              {!headingComplete && <span className="type-cursor" aria-hidden>|</span>}
            </h1>
            {showParagraph && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.62, ease: 'easeOut' }}
              >
                <div className="about-rule" />
                <div className="about-short">
                  <p>I'm a software engineer, filmmaker, and first-gen Bangladeshi-American.</p>
                  <p>I&apos;m currently a junior studying EECS at UC Berkeley focused on building innovative solutions at the intersection of human-computer interaction and AI.</p>
                  <p>Outside of work, I like hiking, creating short films, playing tabla, video games, and weightlifting.</p>

                </div>
              </motion.div>
            )}
            {showCarousel && (
              <motion.div
                className="about-carousel-wrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.74, ease: 'easeOut' }}
              >
                <div className={`about-carousel-track${isMobile ? ' mobile' : ''}`}>
                  {renderedPhotos.map((photo, index) => (
                    <div key={`${photo}-${index}`} className="about-carousel-item">
                      <img src={photo} alt="Fun memory" loading="lazy" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {showLinks && (
              <motion.div
                className="about-socials"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, ease: 'easeOut' }}
              >
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="about-social-link"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={isMobile ? 28 : 32} strokeWidth={2.1} />
                  </a>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
      <motion.button
        type="button"
        className="scroll-cue"
        aria-label="Scroll to experience"
        onClick={scrollToExperience}
        style={{ opacity: cueOpacity, y: cueY }}
      >
        <span className="scroll-cue-arrow" aria-hidden>↓</span>
      </motion.button>
    </section>
  )
}
