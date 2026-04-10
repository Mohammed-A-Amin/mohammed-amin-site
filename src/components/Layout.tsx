import { useEffect, useState } from 'react'
import Nav from './Nav'
import ThreeBackground from './ThreeBackground'

type Theme = 'light' | 'dark'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return (
    <div>
      <ThreeBackground theme={theme} />
      <header className="header">
        <Nav theme={theme} onToggleTheme={toggleTheme} />
      </header>
      <div className="container">
        {children}
      </div>
      <footer className="container footer">
        <div className="footer-meta">
          © {new Date().getFullYear()} Mohammed Amin
        </div>
        <div className="footer-links">
          <a className="link" href="mailto:mohammedamin@berkeley.edu">mohammedamin@berkeley.edu</a>
        </div>
      </footer>
    </div>
  )
}
