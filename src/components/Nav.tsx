import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { Moon, Sun } from 'lucide-react'

const sections = ['home', 'experience', 'projects', 'media'] as const

type NavProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]>('home')

  const handleNavClick = (sectionId: (typeof sections)[number]) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const targetSection = document.getElementById(sectionId)
    if (!targetSection) return

    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${sectionId}`)
    setActiveSection(sectionId)
  }

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '')
      if (sections.includes(hash as (typeof sections)[number])) {
        setActiveSection(hash as (typeof sections)[number])
      }
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    const observedSections = sections
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))

    const observer = new IntersectionObserver(
      (entries) => {
        const topEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0]

        if (topEntry?.target?.id) {
          setActiveSection(topEntry.target.id as (typeof sections)[number])
        }
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: '-20% 0px -60% 0px' }
    )

    observedSections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener('hashchange', syncHash)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="nav-wrap">
      <a href="#home" className="brand" onClick={handleNavClick('home')}>Mohammed Amin</a>
      <div className="nav-right">
        <nav className="nav" aria-label="Primary">
          <a href="#home" onClick={handleNavClick('home')} className={activeSection === 'home' ? 'active' : undefined}>Home</a>
          <a href="#experience" onClick={handleNavClick('experience')} className={activeSection === 'experience' ? 'active' : undefined}>Experience</a>
          <a href="#projects" onClick={handleNavClick('projects')} className={activeSection === 'projects' ? 'active' : undefined}>Projects</a>
          <a href="#media" onClick={handleNavClick('media')} className={activeSection === 'media' ? 'active' : undefined}>Media</a>
        </nav>
        <button
          type="button"
          className="theme-switch"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  )
}
