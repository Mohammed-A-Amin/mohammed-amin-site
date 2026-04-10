import FilmCard from '../components/FilmCard'
import ArtworkCarousel from '../components/ArtworkCarousel'
import films from '../data/films'
import artworks from '../data/artworks'

export default function Media() {
  return (
    <section className="page-shell section-shell">
      <header className="page-header">
        <p className="page-kicker">Media</p>
        <h1 className="page-title">Films, visual work, and photography.</h1>
        <p className="page-intro">
          Creative work from short films to visual art and photography, shaped by the same interest in interaction and storytelling.
        </p>
      </header>
      <div className="grid">
        {films.map((f) => <FilmCard key={f.title} f={f} />)}
      </div>
      <ArtworkCarousel items={artworks} />
    </section>
  )
}
