import { Moon, Sun } from 'lucide-react'
import { NavLink } from 'react-router-dom'

type NavProps = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Nav({ theme, onToggleTheme }: NavProps) {
  return (
    <div className="nav-wrap">
      <NavLink to="/" className="brand">Mohammed Amin</NavLink>
      <div className="nav-right">
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : undefined}>Experience</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : undefined}>Projects</NavLink>
          <NavLink to="/media" className={({ isActive }) => isActive ? 'active' : undefined}>Media</NavLink>
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
