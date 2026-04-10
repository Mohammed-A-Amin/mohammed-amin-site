import { useState } from 'react'
import Modal from './Modal'
import { toEmbedUrl } from '../utils'

export type Film = {
  title: string
  description?: string
  year?: string
  isNew?: boolean
  thumbnail?: string
  videoUrl?: string // YouTube/Vimeo URL
}

export default function FilmCard({ f }: { f: Film }) {
  const [open, setOpen] = useState(false)
  const embed = f.videoUrl ? toEmbedUrl(f.videoUrl) : null
  return (
    <>
      <button className="card grid-item six" onClick={() => setOpen(true)}>
        <div className="thumb">
          {f.thumbnail && <img src={f.thumbnail} alt="" />}
        </div>
        <div className="card-body">
          <div className="card-meta-row">
            <div className="card-meta-left">
              {f.year && <span className="eyebrow">{f.year}</span>}
              {f.isNew && <span className="new-badge">New</span>}
            </div>
            <span className="card-arrow" aria-hidden>Play</span>
          </div>
          <h3>{f.title}</h3>
          {f.description && <p>{f.description}</p>}
        </div>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {embed ? <iframe src={embed} title={f.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : <div style={{ padding: 20 }}>No video URL provided.</div>}
      </Modal>
    </>
  )
}
