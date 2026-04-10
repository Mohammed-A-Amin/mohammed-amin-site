import { Suspense, lazy, useEffect } from 'react'
import { Github, GraduationCap, Instagram, Linkedin } from 'lucide-react'
import Nav from './Nav'

const CanvasBackground = lazy(() => import('./CanvasBackground'))

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

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.removeItem('theme')
    localStorage.removeItem('theme-v2')
  }, [])

  return (
    <div className="app-shell">
      <Suspense fallback={null}>
        <CanvasBackground theme="dark" />
      </Suspense>
      <header className="header">
        <Nav />
      </header>
      <div className="container">
        {children}
      </div>
      <footer className="container footer">
        <div className="footer-meta">
          © 2026 Mohammed Amin
        </div>
        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
              <Icon size={18} strokeWidth={1.8} aria-hidden />
            </a>
          ))}
        </div>
        <div className="footer-links">
          <a className="link" href="mailto:mohammedamin@berkeley.edu">mohammedamin@berkeley.edu</a>
        </div>
      </footer>
    </div>
  )
}
