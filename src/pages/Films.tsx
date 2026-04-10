import FilmCard from '../components/FilmCard'
import ArtworkCarousel from '../components/ArtworkCarousel'
import films from '../data/films'
import artworks from '../data/artworks'

export default function Media() {
  return (
    <section id="media" className="section-shell scroll-section">
      <h2 className="section-title media-title">Media</h2>
      <p className="media-intro">
        Ever since high school, I&apos;ve loved creating interactive media, including films, visual art, and photography.
      </p>
      <div className="grid">
        {films.map((f) => <FilmCard key={f.title} f={f} />)}
      </div>
      <ArtworkCarousel items={artworks} />
    </section>
  )
}
