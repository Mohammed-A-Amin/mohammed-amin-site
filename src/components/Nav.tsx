import { NavLink } from 'react-router-dom'
import SearchDialog from './SearchDialog'

export default function Nav() {
  return (
    <div className="nav-wrap">
      <NavLink to="/" className="brand">Mohammed Amin</NavLink>
      <div className="nav-right">
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/experience" className={({ isActive }) => isActive ? 'active' : undefined}>Experience</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : undefined}>Projects</NavLink>
          <NavLink to="/media" className={({ isActive }) => isActive ? 'active' : undefined}>Media</NavLink>
          <NavLink to="/tabla" className={({ isActive }) => isActive ? 'active' : undefined}>Tabla</NavLink>
          <NavLink to="/now" className={({ isActive }) => isActive ? 'active' : undefined}>Now</NavLink>
        </nav>
        <SearchDialog />
      </div>
    </div>
  )
}
