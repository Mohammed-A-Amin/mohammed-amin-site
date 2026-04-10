import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { ArtworkItem } from '../data/artworks'

type ArtworkCarouselProps = {
  items: ArtworkItem[]
}

export default function ArtworkCarousel({ items }: ArtworkCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const hasItems = items.length > 0

  const safeIndex = useMemo(() => {
    if (!hasItems) return 0
    return ((activeIndex % items.length) + items.length) % items.length
  }, [activeIndex, hasItems, items.length])

  useEffect(() => {
    if (!hasItems || isPaused) return
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 3800)

    return () => window.clearInterval(intervalId)
  }, [hasItems, isPaused, items.length])

  if (!hasItems) return null

  const goPrev = () => setActiveIndex((current) => (current - 1 + items.length) % items.length)
  const goNext = () => setActiveIndex((current) => (current + 1) % items.length)

  return (
    <section className="artwork-section">
      <div
        className="artwork-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="artwork-track"
          animate={{ x: `-${safeIndex * 100}%` }}
          transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 0.65 }}
        >
          {items.map((item) => (
            <figure key={`${item.title}-${item.image}`} className="artwork-slide">
              <img src={item.image} alt={item.title} loading="lazy" />
              <figcaption className="artwork-caption">
                <span>{item.title}</span>
                {item.year && <span>{item.year}</span>}
              </figcaption>
              {item.caption && <p className="artwork-note">{item.caption}</p>}
            </figure>
          ))}
        </motion.div>

        <div className="artwork-controls">
          <button type="button" onClick={goPrev} aria-label="Previous artwork">‹</button>
          <button type="button" onClick={goNext} aria-label="Next artwork">›</button>
        </div>
      </div>

      <div className="artwork-dots" aria-label="Artwork slide indicators">
        {items.map((item, index) => (
          <button
            key={`${item.title}-dot`}
            type="button"
            className={safeIndex === index ? 'active' : undefined}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to ${item.title}`}
          />
        ))}
      </div>
    </section>
  )
}
