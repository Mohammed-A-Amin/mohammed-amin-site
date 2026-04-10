import { Search, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import artworks from '../data/artworks'
import experience from '../data/experience'
import films from '../data/films'
import projects from '../data/projects'

type SearchItem = {
  title: string
  type: string
  description: string
  path: string
  keywords: string
}

const staticItems: SearchItem[] = [
  {
    title: 'Home',
    type: 'Page',
    description: 'About Mohammed, contact links, and personal background.',
    path: '/',
    keywords: 'home about mohammed berkeley eecs openai filmmaker bangladeshi'
  },
  {
    title: 'Experience',
    type: 'Page',
    description: 'Internships, research, and engineering roles.',
    path: '/experience',
    keywords: 'experience openai aws netflix monad berkeley bair meta'
  },
  {
    title: 'Projects',
    type: 'Page',
    description: 'AR, full-stack, mobile applications, and research projects.',
    path: '/projects',
    keywords: 'projects ar full stack mobile applications research ai'
  },
  {
    title: 'Media',
    type: 'Page',
    description: 'Films, visual media, artwork, and photography.',
    path: '/media',
    keywords: 'media films visual art photography'
  },
  {
    title: 'Now',
    type: 'Page',
    description: 'What Mohammed is focused on right now.',
    path: '/now',
    keywords: 'now current focus priorities openai berkeley eecs projects film'
  },
  {
    title: 'Tabla',
    type: 'Page',
    description: 'Tabla page, coming soon.',
    path: '/tabla',
    keywords: 'tabla music percussion coming soon'
  }
]

export default function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const items = useMemo<SearchItem[]>(() => {
    const projectItems = projects.map((project) => ({
      title: project.title,
      type: 'Project',
      description: project.description,
      path: '/projects',
      keywords: [
        project.title,
        project.description,
        project.reference,
        project.year,
        ...(project.tags ?? [])
      ].filter(Boolean).join(' ')
    }))

    const experienceItems = experience.map((item) => ({
      title: `${item.title} at ${item.organization}`,
      type: 'Experience',
      description: item.period,
      path: '/experience',
      keywords: [
        item.title,
        item.organization,
        item.period,
        ...(item.bullets ?? []),
        ...(item.tags ?? [])
      ].join(' ')
    }))

    const filmItems = films.map((film) => ({
      title: film.title,
      type: 'Film',
      description: film.description ?? 'Film project',
      path: '/media',
      keywords: [film.title, film.description, film.year].filter(Boolean).join(' ')
    }))

    const artworkItems = artworks.map((artwork) => ({
      title: artwork.title,
      type: 'Artwork',
      description: artwork.caption || 'Visual media',
      path: '/media',
      keywords: [artwork.title, artwork.caption, artwork.year].filter(Boolean).join(' ')
    }))

    return [...staticItems, ...projectItems, ...experienceItems, ...filmItems, ...artworkItems]
  }, [])

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return items.slice(0, 6)

    return items
      .map((item) => {
        const haystack = `${item.title} ${item.type} ${item.description} ${item.keywords}`.toLowerCase()
        const title = item.title.toLowerCase()
        const score =
          (title.includes(normalizedQuery) ? 3 : 0) +
          (haystack.includes(normalizedQuery) ? 1 : 0)

        return { item, score }
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 8)
      .map(({ item }) => item)
  }, [items, query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }

      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(timer)
  }, [open])

  const goTo = (path: string) => {
    navigate(path)
    setOpen(false)
    setQuery('')
  }

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && results[0]) {
      event.preventDefault()
      goTo(results[0].path)
    }
  }

  return (
    <>
      <button type="button" className="search-trigger" onClick={() => setOpen(true)}>
        <Search size={15} aria-hidden />
        <span>Search</span>
        <kbd>⌘K</kbd>
      </button>

      {open && (
        <div className="search-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div
            className="search-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search site"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="search-field">
              <Search size={17} aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search projects, roles, films..."
              />
              <button type="button" className="search-close" onClick={() => setOpen(false)} aria-label="Close search">
                <X size={16} aria-hidden />
              </button>
            </div>

            <div className="search-results">
              {results.length > 0 ? (
                results.map((result) => (
                  <button key={`${result.type}-${result.title}`} type="button" onClick={() => goTo(result.path)}>
                    <span className="search-result-meta">{result.type}</span>
                    <span className="search-result-title">{result.title}</span>
                    <span className="search-result-description">{result.description}</span>
                  </button>
                ))
              ) : (
                <p className="search-empty">No results found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
