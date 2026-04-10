import FilmCard from '../components/FilmCard'
import ArtworkCarousel from '../components/ArtworkCarousel'
import films from '../data/films'
import artworks from '../data/artworks'

export default function Media() {
  return (
    <section className="page-shell section-shell">
      <header className="page-header">
        <p className="page-kicker">Media</p>
        <p className="page-note">
          Ever since middle school, I've enjoyed creating visual media, ranging from film to art. I still carry that
          passion with me throughout my studies at Berkeley.
        </p>
      </header>
      <div className="grid">
        {films.map((f) => <FilmCard key={f.title} f={f} />)}
      </div>
      <ArtworkCarousel items={artworks} />
    </section>
  )
}
