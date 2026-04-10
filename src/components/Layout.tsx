import { useEffect, useState } from 'react'
import Nav from './Nav'

type Theme = 'light' | 'dark'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('theme-v2')
    if (saved === 'light' || saved === 'dark') return saved
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme-v2', theme)
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return (
    <div className="app-shell">
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
