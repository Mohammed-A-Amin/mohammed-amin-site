import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from './Modal'
import { toEmbedUrl } from '../utils'

export type Film = {
  title: string
  description?: string
  year?: string
  thumbnail?: string
  videoUrl?: string // YouTube/Vimeo URL
}

export default function FilmCard({ f }: { f: Film }) {
  const [open, setOpen] = useState(false)
  const embed = f.videoUrl ? toEmbedUrl(f.videoUrl) : null
  return (
    <>
      <motion.button className="card grid-item six" onClick={() => setOpen(true)} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
        <div className="thumb" style={{ marginBottom: 12 }}>
          {f.thumbnail && <img src={f.thumbnail} alt="" />}
        </div>
        <h3>{f.title}</h3>
        {f.year && <div className="badge" style={{ margin: '8px 0 10px' }}>Year: {f.year}</div>}
        {f.description && <p>{f.description}</p>}
      </motion.button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {embed ? <iframe src={embed} title={f.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen /> : <div style={{ padding: 20 }}>No video URL provided.</div>}
      </Modal>
    </>
  )
}
